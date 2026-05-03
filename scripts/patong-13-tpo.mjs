#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
loadEnv({ path: path.join(ROOT, '.env.local') });
const TOKEN = process.env.TRAVELPAYOUTS_API;

const ITEMS = [
  { slug: 'best-western-patong-beach', url: 'https://www.trip.com/hotels/phuket-hotel-detail-1500751/best-western-patong-beach/' },
  { slug: 'mt-hotel-patong', url: 'https://www.trip.com/hotels/phuket-hotel-detail-703240/mt-hotel-patong/' },
  { slug: 'lub-d-phuket-patong', url: 'https://www.trip.com/hotels/phuket-hotel-detail-4980489/lub-d-phuket-patong/' },
  { slug: 'ramada-by-wyndham-phuket-deevana-patong', url: 'https://www.trip.com/hotels/phuket-hotel-detail-2569711/ramada-by-wyndham-phuket-deevana/' },
  { slug: '7q-patong-beach-hotel', url: 'https://www.trip.com/hotels/phuket-hotel-detail-701333/7q-patong-beach-hotel/' },
  { slug: 'holiday-inn-express-phuket-patong-beach-central', url: 'https://www.trip.com/hotels/phuket-hotel-detail-1574450/holiday-inn-express-phuket-patong-beach-central/' },
  { slug: 'la-flora-resort-patong', url: 'https://www.trip.com/hotels/phuket-hotel-detail-998357/la-flora-resort-patong/' },
  { slug: 'patong-signature-boutique-hotel', url: 'https://www.trip.com/hotels/phuket-hotel-detail-1530608/patong-signature-boutique-hotel/' },
  { slug: 'deevana-patong-resort-and-spa', url: 'https://www.trip.com/hotels/phuket-hotel-detail-756648/deevana-patong-resort-and-spa/' },
  { slug: 'deevana-plaza-phuket-patong', url: 'https://www.trip.com/hotels/phuket-hotel-detail-1983097/deevana-plaza-phuket/' },
  { slug: 'icheck-inn-residences-patong', url: 'https://www.trip.com/hotels/phuket-hotel-detail-4969621/icheck-inn-residences-patong/' },
  { slug: 'woovo-phuket-patong', url: 'https://www.trip.com/hotels/phuket-hotel-detail-26595493/woovo-phuket-patong/' },
  { slug: 'andaman-embrace-patong', url: 'https://www.trip.com/hotels/phuket-hotel-detail-1457251/andaman-embrace-patong/' },
];

async function tpoBatch(items) {
  const links = items.map(i => ({ url: i.url, sub_id: `${i.slug}-deeplink` }));
  const r = await fetch('https://api.travelpayouts.com/links/v1/create', {
    method: 'POST',
    headers: { 'X-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ trs: 421888, marker: 602467, shorten: true, links }),
  });
  const j = await r.json();
  if (j.code !== 'success') throw new Error(JSON.stringify(j));
  return j.result.links;
}

const all = [];
for (let i = 0; i < ITEMS.length; i += 10) {
  const r = await tpoBatch(ITEMS.slice(i, i + 10));
  all.push(...r);
}
console.log(JSON.stringify(ITEMS.map((it, i) => ({ slug: it.slug, partnerUrl: all[i].partner_url })), null, 2));
