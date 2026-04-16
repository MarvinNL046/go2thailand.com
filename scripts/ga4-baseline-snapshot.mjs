#!/usr/bin/env node

/**
 * GA4 baseline snapshot for go2-thailand.com.
 *
 * Captures last-7d traffic + engagement broken down by PSEO page-type
 * so we can compare in 1 week and prove (or disprove) PSEO ROI.
 *
 * Run: node scripts/ga4-baseline-snapshot.mjs
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
    const m = line.match(/^([A-Z_0-9]+)=(?:"(.+?)"|(.+))$/s);
    if (m) process.env[m[1]] = (m[2] ?? m[3] ?? '').replace(/\\n/g, '\n');
  }
}

const GA4_API = 'https://analyticsdata.googleapis.com/v1beta';
const GA4_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!email || !key) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_* env vars');

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const claims = Buffer.from(JSON.stringify({
    iss: email,
    scope: GA4_SCOPE,
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
  if (!res.ok) throw new Error(`Token exchange: ${res.status} ${await res.text()}`);
  const { access_token } = await res.json();
  return access_token;
}

async function runReport(token, propertyId, body) {
  const res = await fetch(`${GA4_API}/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`runReport: ${res.status} ${await res.text()}`);
  return res.json();
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
  if (url === '/' || url === '') return 'home';
  return 'other';
}

async function main() {
  console.log('=== GA4 Baseline Snapshot — go2-thailand.com ===');
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error('GA4_PROPERTY_ID missing');
  console.log(`Property: ${propertyId}`);

  const token = await getAccessToken();
  console.log('Auth OK.');

  const range = { startDate: dateStr(8), endDate: dateStr(1) };
  console.log(`Range: ${range.startDate} → ${range.endDate}\n`);

  // 1. Overall totals
  const totals = await runReport(token, propertyId, {
    dateRanges: [range],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'screenPageViews' },
      { name: 'engagementRate' },
      { name: 'userEngagementDuration' },
    ],
  });

  console.log('--- Last 7 days (totals) ---');
  if (totals.rows?.[0]) {
    const v = totals.rows[0].metricValues;
    const sessions = +v[0].value;
    const users = +v[1].value;
    const pv = +v[2].value;
    const er = +v[3].value;
    const eng = +v[4].value;
    console.log(`  sessions:        ${sessions}`);
    console.log(`  users:           ${users}`);
    console.log(`  pageviews:       ${pv}`);
    console.log(`  engagement rate: ${(er * 100).toFixed(1)}%`);
    console.log(`  avg session eng: ${sessions > 0 ? (eng / sessions).toFixed(1) : 0}s`);
  } else {
    console.log('  (no data)');
  }

  // 2. By page-type
  const byPage = await runReport(token, propertyId, {
    dateRanges: [range],
    dimensions: [{ name: 'pagePath' }],
    metrics: [
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'userEngagementDuration' },
    ],
    limit: '10000',
  });

  const buckets = new Map();
  for (const row of byPage.rows || []) {
    const url = row.dimensionValues[0].value;
    const b = pageBucket(url);
    const sessions = +row.metricValues[0].value;
    const pv = +row.metricValues[1].value;
    const eng = +row.metricValues[2].value;
    const cur = buckets.get(b) || { pages: 0, sessions: 0, pageviews: 0, engagement: 0 };
    cur.pages += 1;
    cur.sessions += sessions;
    cur.pageviews += pv;
    cur.engagement += eng;
    buckets.set(b, cur);
  }

  console.log('\n--- Last 7 days by page-type ---');
  console.log(
    `  ${'bucket'.padEnd(15)} ${'pages'.padStart(6)} ${'sess'.padStart(7)} ${'views'.padStart(7)} ${'avg eng'.padStart(8)}`
  );
  const order = ['where-to-stay', 'best-hotels', 'areas', 'hotel', 'blog', 'guide', 'home', 'other'];
  for (const k of order) {
    const v = buckets.get(k);
    if (!v) continue;
    const avgEng = v.sessions > 0 ? (v.engagement / v.sessions).toFixed(0) : '0';
    console.log(
      `  ${k.padEnd(15)} ${String(v.pages).padStart(6)} ${String(v.sessions).padStart(7)} ${String(v.pageviews).padStart(7)} ${avgEng.padStart(7)}s`
    );
  }

  // 3. Traffic sources
  const bySource = await runReport(token, propertyId, {
    dateRanges: [range],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });
  console.log('\n--- Traffic sources (last 7d) ---');
  for (const r of bySource.rows || []) {
    console.log(`  ${r.dimensionValues[0].value.padEnd(20)} ${String(r.metricValues[0].value).padStart(6)} sessions`);
  }

  // Save
  const snapshotDir = path.join(__dirname, '..', 'data', 'ga4-snapshots');
  fs.mkdirSync(snapshotDir, { recursive: true });
  const fn = path.join(snapshotDir, `baseline-${dateStr(0)}.json`);
  fs.writeFileSync(fn, JSON.stringify({
    capturedAt: new Date().toISOString(),
    propertyId,
    range,
    totals: totals.rows?.[0] || null,
    byBucket: Object.fromEntries(buckets),
    bySource: (bySource.rows || []).map(r => ({
      channel: r.dimensionValues[0].value,
      sessions: +r.metricValues[0].value,
    })),
  }, null, 2));
  console.log(`\nSnapshot saved: ${fn}`);
  console.log('Re-run in 7 days and diff to see PSEO traffic impact.');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
