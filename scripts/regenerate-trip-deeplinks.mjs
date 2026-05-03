#!/usr/bin/env node
// Regenerate Trip.com TPO partner links so they deeplink to the actual
// hotel-detail page (not a search results page). Lookups Trip.com hotel-detail
// URLs via DuckDuckGo (site:trip.com), then calls TPO links/v1/create with the
// real URL so the redirect chain ends on the hotel page.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
loadEnv({ path: path.join(ROOT, '.env.local') });

const TOKEN = process.env.TRAVELPAYOUTS_API;
const MARKER = 602467;
const TRS = 421888;
const TPO_ENDPOINT = 'https://api.travelpayouts.com/links/v1/create';

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const PILOT = args.includes('--pilot');
const ONLY = (args.find(a => a.startsWith('--only=')) || '').slice(7) || null;

if (!TOKEN) {
  console.error('Missing TRAVELPAYOUTS_API in .env.local');
  process.exit(1);
}

// Hotel inventory: {file, kind, key|slug, hotelName, subId}
// kind=array means update hotels[].tripPartnerUrl by slug
// kind=partner means update partners[key].partnerUrl
const INVENTORY = [
  // Patong (in hotels[] array)
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'grand-mercure-phuket-patong', name: 'Grand Mercure Phuket Patong' },
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'four-points-by-sheraton-phuket-patong-beach-resort', name: 'Four Points by Sheraton Phuket Patong Beach Resort' },
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'hotel-indigo-phuket-patong', name: 'Hotel Indigo Phuket Patong' },
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'hotel-clover-patong-phuket', name: 'Hotel Clover Patong Phuket' },
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'movenpick-myth-hotel-patong-phuket', name: 'Mövenpick Myth Hotel Patong Phuket' },
  // Karon (partners.trip_*)
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_pullman', name: 'Pullman Phuket Karon Beach Resort' },
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_centara', name: 'Centara Grand Beach Resort Phuket' },
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_mandarava', name: 'Mandarava Resort and Spa Karon Beach' },
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_beyond', name: 'Beyond Resort Karon' },
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_avista', name: 'Avista Hideaway Phuket Patong' },
  // Kamala
  { file: 'data/pseo/areas/kamala-partners.json', kind: 'partner', key: 'trip_novotel', name: 'Novotel Phuket Kamala Beach' },
  { file: 'data/pseo/areas/kamala-partners.json', kind: 'partner', key: 'trip_sunwing', name: 'Sunwing Resort Kamala Beach' },
  { file: 'data/pseo/areas/kamala-partners.json', kind: 'partner', key: 'trip_sunprime', name: 'Sunprime Kamala Beach' },
  // Bang Tao
  { file: 'data/pseo/areas/bang-tao-partners.json', kind: 'partner', key: 'trip_hilton_garden', name: 'Hilton Garden Inn Phuket Bang Tao' },
  // Nai Harn
  { file: 'data/pseo/areas/nai-harn-partners.json', kind: 'partner', key: 'trip_the_nai_harn', name: 'The Nai Harn Phuket' },
  { file: 'data/pseo/areas/nai-harn-partners.json', kind: 'partner', key: 'trip_wyndham', name: 'Wyndham Grand Nai Harn Beach Phuket' },
  // Rawai
  { file: 'data/pseo/areas/rawai-partners.json', kind: 'partner', key: 'trip_selina', name: 'Selina Serenity Rawai Phuket' },
];

const PILOT_FIRST_N = 5;

async function ddgSearch(query) {
  // Returns first matching trip.com hotel-detail URL, or null
  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const r = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
  });
  const html = await r.text();
  // Match plain-text URL first (less escape noise)
  const re = /https:\/\/(?:www\.)?trip\.com\/hotels\/[a-z]+-hotel-detail-\d+\/[a-z0-9-]+\/?/gi;
  const matches = html.match(re);
  if (matches && matches.length) return matches[0];
  // Fallback: percent-encoded form
  const re2 = /trip\.com%2Fhotels%2F[a-z]+%2Dhotel%2Ddetail%2D\d+%2F[a-z0-9%-]+%2F?/gi;
  const m2 = html.match(re2);
  if (m2 && m2.length) {
    const decoded = decodeURIComponent(m2[0]).replace(/^trip\.com/, 'https://www.trip.com');
    return decoded;
  }
  return null;
}

async function tpoCreate(url, subId) {
  const body = { trs: TRS, marker: MARKER, shorten: true, links: [{ url, sub_id: subId }] };
  const r = await fetch(TPO_ENDPOINT, {
    method: 'POST',
    headers: { 'X-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await r.json();
  if (json.code !== 'success') throw new Error(`TPO API: ${JSON.stringify(json)}`);
  return json.result.links[0].partner_url;
}

async function processItem(item) {
  const query = `site:trip.com "${item.name}"`;
  const detailUrl = await ddgSearch(query);
  if (!detailUrl) {
    return { ...item, status: 'no-result', error: 'no trip.com detail URL found' };
  }
  const subId = `${item.kind === 'array' ? item.slug : item.key}-deeplink`;
  const partnerUrl = await tpoCreate(detailUrl, subId);
  return { ...item, status: 'ok', detailUrl, partnerUrl };
}

function applyResult(item, partnerUrl) {
  const filePath = path.join(ROOT, item.file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (item.kind === 'array') {
    const h = (data.hotels || []).find(x => x.slug === item.slug);
    if (h) h.tripPartnerUrl = partnerUrl;
  } else if (item.kind === 'partner') {
    if (data.partners && data.partners[item.key]) {
      data.partners[item.key].partnerUrl = partnerUrl;
    }
  }
  data.lastUpdated = new Date().toISOString().slice(0, 10);
  if (!DRY) fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

async function main() {
  let work = INVENTORY;
  if (ONLY) work = work.filter(x => x.file.includes(ONLY) || (x.slug || '').includes(ONLY) || (x.key || '').includes(ONLY));
  if (PILOT) work = work.slice(0, PILOT_FIRST_N);

  console.log(`Processing ${work.length} hotels${DRY ? ' (DRY RUN)' : ''}${PILOT ? ' (PILOT)' : ''}`);
  const results = [];
  for (const item of work) {
    process.stdout.write(`  ${item.name}... `);
    try {
      const r = await processItem(item);
      if (r.status === 'ok') {
        applyResult(item, r.partnerUrl);
        console.log(`✓ ${r.partnerUrl}`);
        console.log(`     → ${r.detailUrl}`);
      } else {
        console.log(`✗ ${r.error}`);
      }
      results.push(r);
    } catch (err) {
      console.log(`✗ ERROR: ${err.message}`);
      results.push({ ...item, status: 'error', error: err.message });
    }
    // Rate-limit: 1.2s between DDG + TPO calls
    await new Promise(res => setTimeout(res, 1200));
  }

  const ok = results.filter(r => r.status === 'ok').length;
  console.log(`\nDone: ${ok}/${results.length} successful`);
  if (results.some(r => r.status !== 'ok')) {
    console.log('Failures:', results.filter(r => r.status !== 'ok').map(r => r.name));
  }
}

main().catch(err => { console.error(err); process.exit(1); });
