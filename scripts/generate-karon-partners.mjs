#!/usr/bin/env node
// One-shot: generate Trip.com partner URLs for the Karon Beach cluster
// (pillar, hotels hub, 5 hotel reviews) via Travelpayouts links/v1/create.
// Output: data/pseo/areas/karon-partners.json
import { config as loadEnv } from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
loadEnv({ path: path.join(ROOT, '.env.local') });

const TOKEN = process.env.TRAVELPAYOUTS_API;
const ENDPOINT = 'https://api.travelpayouts.com/links/v1/create';
if (!TOKEN) { console.error('Missing TRAVELPAYOUTS_API in .env.local'); process.exit(1); }

const links = [
  { key: 'trip_karon_city', url: 'https://www.trip.com/hotels/list?keyword=Karon%20Beach%20Phuket', sub_id: 'pseo-karon-pillar' },
  { key: 'trip_karon_hotel_search', url: 'https://www.trip.com/hotels/list?keyword=Karon%20Beach%20Hotels%20Phuket', sub_id: 'pseo-karon-hotels-hub' },
  { key: 'trip_pullman', url: 'https://www.trip.com/hotels/list?keyword=Pullman%20Phuket%20Arcadia%20Karon%20Beach%20Resort', sub_id: 'pseo-karon-hotel-pullman' },
  { key: 'trip_centara', url: 'https://www.trip.com/hotels/list?keyword=Centara%20Grand%20Beach%20Resort%20Phuket', sub_id: 'pseo-karon-hotel-centara' },
  { key: 'trip_mandarava', url: 'https://www.trip.com/hotels/list?keyword=Mandarava%20Resort%20and%20Spa%20Karon%20Beach', sub_id: 'pseo-karon-hotel-mandarava' },
  { key: 'trip_beyond', url: 'https://www.trip.com/hotels/list?keyword=Beyond%20Resort%20Karon', sub_id: 'pseo-karon-hotel-beyond' },
  { key: 'trip_avista', url: 'https://www.trip.com/hotels/list?keyword=Avista%20Grande%20Phuket%20Karon%20MGallery', sub_id: 'pseo-karon-hotel-avista' },
];

const r = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'X-Access-Token': TOKEN, 'Content-Type': 'application/json' },
  body: JSON.stringify({ trs: 421888, marker: 602467, shorten: true, links: links.map(({url, sub_id}) => ({url, sub_id})) }),
});
const json = await r.json();
if (json.code !== 'success') { console.error(JSON.stringify(json, null, 2)); process.exit(1); }

const partners = {};
json.result.links.forEach((l, i) => {
  partners[links[i].key] = { partnerUrl: l.partner_url, label: links[i].sub_id };
});

const out = { lastUpdated: new Date().toISOString().slice(0, 10), partners };
const outFile = path.join(ROOT, 'data/pseo/areas/karon-partners.json');
fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
console.log('Wrote', outFile);
console.log(JSON.stringify(out, null, 2));
