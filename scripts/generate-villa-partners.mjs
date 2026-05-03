// One-off script: generate Trip.com TPO partner URLs for cluster 6 (villas)
// Outputs to data/pseo/villas/phuket-partners.json
import 'dotenv/config';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config({ path: '.env.local' });

const TOKEN = process.env.TRAVELPAYOUTS_API;
if (!TOKEN) {
  console.error('Missing TRAVELPAYOUTS_API in env (check .env.local)');
  process.exit(1);
}

const links = [
  { key: 'trip_luxury',         url: 'https://www.trip.com/hotels/list?keyword=Phuket+luxury+villa',          sub_id: 'pseo-phuket-luxury-villas-trip-luxury',         label: 'Trip.com — Phuket luxury villas' },
  { key: 'trip_private_pool',   url: 'https://www.trip.com/hotels/list?keyword=Phuket+private+pool+villa',     sub_id: 'pseo-private-pool-villa-phuket-trip',           label: 'Trip.com — Phuket private pool villa' },
  { key: 'trip_oceanfront',     url: 'https://www.trip.com/hotels/list?keyword=Phuket+oceanfront+villa',       sub_id: 'pseo-phuket-luxury-villas-oceanfront-trip',     label: 'Trip.com — Phuket oceanfront villa' },
  { key: 'trip_family',         url: 'https://www.trip.com/hotels/list?keyword=Phuket+family+villa',           sub_id: 'pseo-phuket-luxury-villas-family-trip',         label: 'Trip.com — Phuket family villa' },
  { key: 'trip_villa_search',   url: 'https://www.trip.com/hotels/list?keyword=Phuket+villa',                  sub_id: 'pseo-phuket-luxury-villas-trip-search',         label: 'Trip.com — Phuket villa search' },
];

const body = {
  trs: 421888,
  marker: 602467,
  shorten: true,
  links: links.map(l => ({ url: l.url, sub_id: l.sub_id })),
};

const res = await fetch('https://api.travelpayouts.com/links/v1/create', {
  method: 'POST',
  headers: {
    'X-Access-Token': TOKEN,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const json = await res.json();
if (json.status !== 200 || json.code !== 'success') {
  console.error('TPO API failed:', JSON.stringify(json, null, 2));
  process.exit(1);
}

const result = json.result.links;
const partners = {};
links.forEach((l, i) => {
  const r = result[i];
  if (r.code !== 'success') {
    console.error(`Link ${l.key} failed:`, r);
    return;
  }
  partners[l.key] = { partnerUrl: r.partner_url, label: l.label };
});

const outDir = path.join(process.cwd(), 'data', 'pseo', 'villas');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'phuket-partners.json');
const out = { lastUpdated: new Date().toISOString().slice(0, 10), partners };
fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
console.log('Wrote', outFile);
console.log(JSON.stringify(out, null, 2));
