#!/usr/bin/env node
// Generate Patong cluster partner URLs via Travelpayouts links/v1/create API.
// Writes data/pseo/areas/patong-partners.json with shared partner links and
// individual hotel partner URLs for the 5 priority hotel reviews.
//
// Usage: node scripts/generate-patong-partner-links.mjs

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
const ENDPOINT = 'https://api.travelpayouts.com/links/v1/create';

if (!TOKEN) {
  console.error('Missing TRAVELPAYOUTS_API in .env.local');
  process.exit(1);
}

const TRIP_HOTELS_PATONG = 'https://www.trip.com/hotels/list?city=Patong&keyword=Patong%20Phuket';
const TRIP_PATONG_NIGHTLIFE = 'https://www.trip.com/things-to-do/list?keyword=Patong%20Phuket%20Nightlife';
const TRIP_PATONG_RESTAURANTS = 'https://www.trip.com/things-to-do/list?keyword=Patong%20Phuket%20Restaurants';

const HOTELS = [
  { slug: 'grand-mercure-phuket-patong', name: 'Grand Mercure Phuket Patong' },
  { slug: 'four-points-by-sheraton-phuket-patong-beach-resort', name: 'Four Points by Sheraton Phuket Patong Beach Resort' },
  { slug: 'hotel-indigo-phuket-patong', name: 'Hotel Indigo Phuket Patong' },
  { slug: 'hotel-clover-patong-phuket', name: 'Hotel Clover Patong Phuket' },
  { slug: 'movenpick-myth-hotel-patong-phuket', name: 'Mövenpick Myth Hotel Patong Phuket' },
];

function tripKeywordUrl(keyword) {
  return `https://www.trip.com/hotels/list?keyword=${encodeURIComponent(keyword)}`;
}

async function batchCreate(items) {
  const links = items.map(({ url, sub_id }) => ({ url, sub_id }));
  const body = { trs: TRS, marker: MARKER, shorten: true, links };
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'X-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await r.json();
  if (json.code !== 'success') throw new Error(`API error: ${JSON.stringify(json)}`);
  return json.result.links;
}

(async () => {
  // Build batches
  const items = [
    { key: 'trip_patong_pillar', url: TRIP_HOTELS_PATONG, sub_id: 'pseo-phuket-patong-pillar' },
    { key: 'trip_patong_hotels_hub', url: tripKeywordUrl('Patong Beach Phuket Hotel'), sub_id: 'pseo-phuket-patong-hotels-hub' },
    { key: 'trip_patong_nightlife', url: TRIP_PATONG_NIGHTLIFE, sub_id: 'pseo-phuket-patong-nightlife' },
    { key: 'trip_patong_restaurants', url: TRIP_PATONG_RESTAURANTS, sub_id: 'pseo-phuket-patong-restaurants' },
  ];
  for (const h of HOTELS) {
    items.push({
      key: `trip_${h.slug.replace(/-/g, '_')}`,
      url: tripKeywordUrl(h.name),
      sub_id: `pseo-phuket-patong-hotel-${h.slug}`,
    });
  }

  console.log(`Requesting ${items.length} partner links from TPO…`);

  const results = {};
  for (let i = 0; i < items.length; i += 10) {
    const batch = items.slice(i, i + 10);
    const apiResult = await batchCreate(batch);
    for (let j = 0; j < batch.length; j++) {
      const r = apiResult[j];
      if (r.code === 'success' && r.partner_url) {
        results[batch[j].key] = r.partner_url;
      } else {
        console.warn(`  ⚠️  ${batch[j].key}: ${r.message || r.code}`);
      }
    }
    if (i + 10 < items.length) await new Promise(r => setTimeout(r, 1200));
  }

  const out = {
    lastUpdated: new Date().toISOString().slice(0, 10),
    partners: {
      trip_patong_pillar: { partnerUrl: results.trip_patong_pillar, label: 'Trip.com — Patong city hotels' },
      trip_patong_hotels_hub: { partnerUrl: results.trip_patong_hotels_hub, label: 'Trip.com — Patong hotels search' },
      trip_patong_nightlife: { partnerUrl: results.trip_patong_nightlife, label: 'Trip.com — Patong nightlife activities' },
      trip_patong_restaurants: { partnerUrl: results.trip_patong_restaurants, label: 'Trip.com — Patong restaurants' },
    },
    hotels: HOTELS.map(h => ({
      slug: h.slug,
      name: h.name,
      tripPartnerUrl: results[`trip_${h.slug.replace(/-/g, '_')}`],
    })),
  };

  const outPath = path.join(ROOT, 'data/pseo/areas/patong-partners.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  console.log(`✓ wrote ${path.relative(ROOT, outPath)} (${Object.keys(results).length}/${items.length} successful)`);
})().catch(e => { console.error(e); process.exit(1); });
