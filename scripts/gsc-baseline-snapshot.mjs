#!/usr/bin/env node

/**
 * GSC baseline snapshot for go2-thailand.com.
 *
 * 1. Lists all submitted sitemaps + their status
 * 2. Submits sitemap.xml + sitemap-nl.xml if missing
 * 3. Prints last-7d totals (clicks/impressions) per page-type
 *
 * Used to capture "before" state so we can compare in 1 week.
 *
 * Run: node scripts/gsc-baseline-snapshot.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf-8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(?:"(.+?)"|(.+))$/s);
    if (m) process.env[m[1]] = (m[2] ?? m[3] ?? '').replace(/\\n/g, '\n');
  }
}

const SITE = 'sc-domain:go2-thailand.com';
const SITE_HTTP = 'https://go2-thailand.com/';
const GSC_API = 'https://searchconsole.googleapis.com/webmasters/v3';
const SITEMAPS_TO_ENSURE = [
  'https://go2-thailand.com/sitemap.xml',
  'https://go2-thailand.com/sitemap-nl.xml',
  'https://go2-thailand.com/sitemap-index.xml',
];

async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!email || !key) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_* env vars');

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const claims = Buffer.from(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url');

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(key, 'base64url');
  const jwt = `${header}.${claims}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  const { access_token } = await res.json();
  return access_token;
}

async function listSites(token, headerOnly = false) {
  const res = await fetch(`${GSC_API}/sites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`sites.list: ${res.status} ${await res.text()}`);
  const { siteEntry = [] } = await res.json();
  if (!headerOnly) {
    console.log(`\nProperties accessible to service account: ${siteEntry.length}`);
    for (const s of siteEntry) console.log(`  ${s.permissionLevel.padEnd(15)} ${s.siteUrl}`);
  }
  return siteEntry;
}

async function listSitemaps(token, siteUrl) {
  const res = await fetch(`${GSC_API}/sites/${encodeURIComponent(siteUrl)}/sitemaps`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.log(`  sitemaps list failed for ${siteUrl}: ${res.status}`);
    return [];
  }
  const { sitemap = [] } = await res.json();
  return sitemap;
}

async function submitSitemap(token, siteUrl, feedpath) {
  const res = await fetch(
    `${GSC_API}/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedpath)}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  return res.ok;
}

async function querySearchAnalytics(token, siteUrl, body) {
  const res = await fetch(
    `${GSC_API}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    console.log(`  searchAnalytics failed: ${res.status} ${await res.text()}`);
    return [];
  }
  const data = await res.json();
  return data.rows || [];
}

function dateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function pageBucket(url) {
  if (url.includes('/where-to-stay/')) return 'where-to-stay';
  if (url.includes('/best-hotels/')) return 'best-hotels';
  if (url.includes('/areas/')) return 'areas';
  if (url.includes('/hotel/')) return 'hotel';
  if (url.includes('/blog/')) return 'blog';
  if (url.includes('/guide/')) return 'guide';
  return 'other';
}

async function main() {
  console.log('=== GSC Baseline Snapshot — go2-thailand.com ===');
  const token = await getAccessToken();
  console.log('Auth OK.');

  // Discover the right property identifier
  const sites = await listSites(token);
  const candidates = sites.filter(s =>
    s.siteUrl === SITE || s.siteUrl === SITE_HTTP || s.siteUrl.includes('go2-thailand.com')
  );
  if (candidates.length === 0) {
    console.log('\nNo go2-thailand.com property found for this service account.');
    console.log('Add this email as a USER in GSC property settings:');
    console.log('  ' + process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    process.exit(1);
  }

  const targetSite = candidates[0].siteUrl;
  console.log(`\nUsing property: ${targetSite}`);

  // Sitemaps
  console.log('\n--- Sitemaps ---');
  const existing = await listSitemaps(token, targetSite);
  if (existing.length === 0) {
    console.log('  (none submitted yet)');
  } else {
    for (const s of existing) {
      const errors = s.errors || 0;
      const warnings = s.warnings || 0;
      const lastSubmitted = s.lastSubmitted || 'unknown';
      console.log(`  ${s.path}`);
      console.log(`    submitted: ${lastSubmitted} | errors: ${errors} | warnings: ${warnings}`);
    }
  }

  // Submit missing
  for (const url of SITEMAPS_TO_ENSURE) {
    if (!existing.some(s => s.path === url)) {
      const ok = await submitSitemap(token, targetSite, url);
      console.log(`  ${ok ? '+' : '!'} submitted: ${url}`);
    }
  }

  // Search analytics — 7d totals overall
  console.log('\n--- Last 7 days (totals) ---');
  const totalRows = await querySearchAnalytics(token, targetSite, {
    startDate: dateStr(9),
    endDate: dateStr(2),
    dimensions: [],
    rowLimit: 1,
  });
  if (totalRows[0]) {
    const r = totalRows[0];
    console.log(`  clicks:      ${r.clicks}`);
    console.log(`  impressions: ${r.impressions}`);
    console.log(`  CTR:         ${(r.ctr * 100).toFixed(2)}%`);
    console.log(`  avg pos:     ${r.position.toFixed(1)}`);
  } else {
    console.log('  (no data yet)');
  }

  // Per-page-type breakdown
  console.log('\n--- Last 7 days by page-type ---');
  const pageRows = await querySearchAnalytics(token, targetSite, {
    startDate: dateStr(9),
    endDate: dateStr(2),
    dimensions: ['page'],
    rowLimit: 5000,
  });
  const buckets = new Map();
  for (const r of pageRows) {
    const b = pageBucket(r.keys[0]);
    const cur = buckets.get(b) || { clicks: 0, impressions: 0, pages: 0 };
    cur.clicks += r.clicks;
    cur.impressions += r.impressions;
    cur.pages += 1;
    buckets.set(b, cur);
  }
  const order = ['where-to-stay', 'best-hotels', 'areas', 'hotel', 'blog', 'guide', 'other'];
  console.log(`  ${'bucket'.padEnd(15)} ${'pages'.padStart(6)} ${'clicks'.padStart(8)} ${'impr'.padStart(10)}`);
  for (const k of order) {
    const v = buckets.get(k);
    if (!v) continue;
    console.log(`  ${k.padEnd(15)} ${String(v.pages).padStart(6)} ${String(v.clicks).padStart(8)} ${String(v.impressions).padStart(10)}`);
  }

  // Save baseline
  const snapshotDir = path.join(__dirname, '..', 'data', 'gsc-snapshots');
  fs.mkdirSync(snapshotDir, { recursive: true });
  const fn = path.join(snapshotDir, `baseline-${dateStr(0)}.json`);
  fs.writeFileSync(fn, JSON.stringify({
    capturedAt: new Date().toISOString(),
    site: targetSite,
    range: { start: dateStr(9), end: dateStr(2) },
    totals: totalRows[0] || null,
    byBucket: Object.fromEntries(buckets),
    sitemaps: existing.map(s => ({ path: s.path, errors: s.errors, warnings: s.warnings, lastSubmitted: s.lastSubmitted })),
  }, null, 2));
  console.log(`\nSnapshot saved: ${fn}`);
  console.log('Run again in 7 days and diff to see PSEO ranking impact.');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
