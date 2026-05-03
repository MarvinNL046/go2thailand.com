#!/usr/bin/env node
// Merge 13 new Patong hotels into data/pseo/areas/patong-hotels.json
// + their TPO partner URLs into patong-partners.json hotels[]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Map of slug → tripPartnerUrl (from earlier generated batch)
const PARTNER_URLS = {
  'best-western-patong-beach': 'https://trip.tpo.lv/6jsAjrlS',
  'mt-hotel-patong': 'https://trip.tpo.lv/YMNj7Pbj',
  'lub-d-phuket-patong': 'https://trip.tpo.lv/JIGAbKDo',
  'ramada-by-wyndham-phuket-deevana-patong': 'https://trip.tpo.lv/g3BeY44L',
  '7q-patong-beach-hotel': 'https://trip.tpo.lv/NZ1MhgS5',
  'holiday-inn-express-phuket-patong-beach-central': 'https://trip.tpo.lv/oTnmzdb6',
  'la-flora-resort-patong': 'https://trip.tpo.lv/UWnJ65bE',
  'patong-signature-boutique-hotel': 'https://trip.tpo.lv/1DWDvpb2',
  'deevana-patong-resort-and-spa': 'https://trip.tpo.lv/bLPz3t8i',
  'deevana-plaza-phuket-patong': 'https://trip.tpo.lv/bTJrmB26',
  'icheck-inn-residences-patong': 'https://trip.tpo.lv/ZYfuzJMP',
  'woovo-phuket-patong': 'https://trip.tpo.lv/WHpnB7r7',
  'andaman-embrace-patong': 'https://trip.tpo.lv/DnSsIIgB',
};

// 13 hotel content entries (cleaned: &amp; → &)
const NEW_HOTELS = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp-patong-13.json'), 'utf8').replace(/&amp;/g, '&'));

const hotelsFile = path.join(ROOT, 'data/pseo/areas/patong-hotels.json');
const partnersFile = path.join(ROOT, 'data/pseo/areas/patong-partners.json');

const hotelsData = JSON.parse(fs.readFileSync(hotelsFile, 'utf8'));
const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));

const existingSlugs = new Set(hotelsData.hotels.map(h => h.slug));
let added = 0;
for (const h of NEW_HOTELS) {
  if (existingSlugs.has(h.slug)) {
    console.log(`  skip (exists): ${h.slug}`);
    continue;
  }
  // Strip subZone helper field if present (not in schema) — store in `area` if missing
  const cleaned = { ...h };
  if (cleaned.subZone && !cleaned.area) cleaned.area = cleaned.subZone;
  delete cleaned.subZone;
  hotelsData.hotels.push(cleaned);
  added++;

  // Add to partners.hotels[] array
  const exists = (partnersData.hotels || []).some(x => x.slug === h.slug);
  if (!exists) {
    if (!partnersData.hotels) partnersData.hotels = [];
    partnersData.hotels.push({
      slug: h.slug,
      name: h.name,
      tripPartnerUrl: PARTNER_URLS[h.slug],
    });
  }
}

hotelsData.lastUpdated = new Date().toISOString().slice(0, 10);
partnersData.lastUpdated = new Date().toISOString().slice(0, 10);

fs.writeFileSync(hotelsFile, JSON.stringify(hotelsData, null, 2) + '\n');
fs.writeFileSync(partnersFile, JSON.stringify(partnersData, null, 2) + '\n');

console.log(`\n✓ Added ${added} hotels to ${path.relative(ROOT, hotelsFile)}`);
console.log(`✓ patong-hotels.json now has ${hotelsData.hotels.length} hotels`);
console.log(`✓ patong-partners.json hotels[] now has ${partnersData.hotels.length} entries`);
