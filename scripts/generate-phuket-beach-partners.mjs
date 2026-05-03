#!/usr/bin/env node
/**
 * Generate TPO partner URLs for the Phuket BEACH AREA sub-clusters
 * (Kata, Kamala, Bang Tao, Surin).
 *
 * Outputs:
 *   - data/pseo/areas/kata-partners.json
 *   - data/pseo/areas/kamala-partners.json
 *   - data/pseo/areas/bang-tao-partners.json
 *   - data/pseo/areas/surin-partners.json
 *
 * Brands: Trip.com (primary hotels), Klook (activities + surf lessons),
 * GetYourGuide (activities), Viator (activities).
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const TOKEN = process.env.TRAVELPAYOUTS_API;
if (!TOKEN) {
  console.error('Missing TRAVELPAYOUTS_API in .env.local');
  process.exit(1);
}

const TRS = 421888;
const MARKER = 602467;

// Per-cluster source links. Each placement gets its own short link.
const CLUSTERS = {
  kata: [
    { key: 'trip_pillar',           url: 'https://www.trip.com/hotels/kata-beach-hotels/?city=1462',                               sub_id: 'pseo-phuket-kata-pillar-trip',           label: 'Trip.com — Kata Beach hotels' },
    { key: 'trip_hotels',           url: 'https://www.trip.com/hotels/kata-beach-hotels/?city=1462',                               sub_id: 'pseo-phuket-kata-hotels-trip',           label: 'Trip.com — Kata Beach hotels hub' },
    { key: 'klook_pillar',          url: 'https://www.klook.com/en-US/search/result/?keyword=kata+beach+phuket',                   sub_id: 'pseo-phuket-kata-pillar-klook',          label: 'Klook — Kata activities' },
    { key: 'gyg_pillar',            url: 'https://www.getyourguide.com/phuket-l1136/?q=kata+beach',                                sub_id: 'pseo-phuket-kata-pillar-gyg',            label: 'GetYourGuide — Kata' },
    { key: 'viator_pillar',         url: 'https://www.viator.com/Phuket/d348-ttd?text=kata+beach',                                 sub_id: 'pseo-phuket-kata-pillar-viator',         label: 'Viator — Kata' },
    { key: 'klook_surfing',         url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+surfing+lesson',               sub_id: 'pseo-phuket-kata-surfing-klook',         label: 'Klook — Phuket surfing lessons' },
    { key: 'gyg_surfing',           url: 'https://www.getyourguide.com/phuket-l1136/?q=surfing+lesson',                            sub_id: 'pseo-phuket-kata-surfing-gyg',           label: 'GetYourGuide — Phuket surfing' },
    { key: 'trip_kata_noi',         url: 'https://www.trip.com/hotels/kata-noi-beach-hotels/?city=1462',                           sub_id: 'pseo-phuket-kata-noi-trip',              label: 'Trip.com — Kata Noi hotels' },
    { key: 'klook_kata_noi',        url: 'https://www.klook.com/en-US/search/result/?keyword=kata+noi+beach',                      sub_id: 'pseo-phuket-kata-noi-klook',             label: 'Klook — Kata Noi' },
  ],
  kamala: [
    { key: 'trip_pillar',           url: 'https://www.trip.com/hotels/kamala-beach-hotels/?city=1462',                             sub_id: 'pseo-phuket-kamala-pillar-trip',         label: 'Trip.com — Kamala Beach hotels' },
    { key: 'trip_hotels',           url: 'https://www.trip.com/hotels/kamala-beach-hotels/?city=1462',                             sub_id: 'pseo-phuket-kamala-hotels-trip',         label: 'Trip.com — Kamala hotels hub' },
    { key: 'klook_pillar',          url: 'https://www.klook.com/en-US/search/result/?keyword=kamala+beach+phuket',                 sub_id: 'pseo-phuket-kamala-pillar-klook',        label: 'Klook — Kamala activities' },
    { key: 'gyg_pillar',            url: 'https://www.getyourguide.com/phuket-l1136/?q=kamala+beach',                              sub_id: 'pseo-phuket-kamala-pillar-gyg',          label: 'GetYourGuide — Kamala' },
    { key: 'viator_pillar',         url: 'https://www.viator.com/Phuket/d348-ttd?text=kamala',                                     sub_id: 'pseo-phuket-kamala-pillar-viator',       label: 'Viator — Kamala' },
    { key: 'trip_novotel',          url: 'https://www.trip.com/hotels/detail/?hotelid=1402717',                                    sub_id: 'pseo-phuket-kamala-novotel-trip',        label: 'Trip.com — Novotel Phuket Kamala Beach' },
    { key: 'trip_sunwing',          url: 'https://www.trip.com/hotels/list?city=1462&checkin=&checkout=&keyword=Sunwing+Kamala',   sub_id: 'pseo-phuket-kamala-sunwing-trip',        label: 'Trip.com — Sunwing Kamala' },
    { key: 'trip_sunprime',         url: 'https://www.trip.com/hotels/list?city=1462&checkin=&checkout=&keyword=Sunprime+Kamala',  sub_id: 'pseo-phuket-kamala-sunprime-trip',       label: 'Trip.com — Sunprime Kamala' },
  ],
  'bang-tao': [
    { key: 'trip_pillar',           url: 'https://www.trip.com/hotels/bang-tao-beach-hotels/?city=1462',                           sub_id: 'pseo-phuket-bang-tao-pillar-trip',       label: 'Trip.com — Bang Tao hotels' },
    { key: 'trip_hotels',           url: 'https://www.trip.com/hotels/bang-tao-beach-hotels/?city=1462',                           sub_id: 'pseo-phuket-bang-tao-hotels-trip',       label: 'Trip.com — Bang Tao hotels hub' },
    { key: 'klook_pillar',          url: 'https://www.klook.com/en-US/search/result/?keyword=bang+tao+beach+phuket',               sub_id: 'pseo-phuket-bang-tao-pillar-klook',      label: 'Klook — Bang Tao activities' },
    { key: 'gyg_pillar',            url: 'https://www.getyourguide.com/phuket-l1136/?q=bang+tao',                                  sub_id: 'pseo-phuket-bang-tao-pillar-gyg',        label: 'GetYourGuide — Bang Tao' },
    { key: 'viator_pillar',         url: 'https://www.viator.com/Phuket/d348-ttd?text=bang+tao',                                   sub_id: 'pseo-phuket-bang-tao-pillar-viator',     label: 'Viator — Bang Tao' },
    { key: 'trip_hilton_garden',    url: 'https://www.trip.com/hotels/list?city=1462&checkin=&checkout=&keyword=Hilton+Garden+Inn+Bang+Tao', sub_id: 'pseo-phuket-bang-tao-hilton-trip', label: 'Trip.com — Hilton Garden Inn Bang Tao' },
  ],
  surin: [
    { key: 'trip_pillar',           url: 'https://www.trip.com/hotels/surin-beach-hotels/?city=1462',                              sub_id: 'pseo-phuket-surin-pillar-trip',          label: 'Trip.com — Surin Beach hotels' },
    { key: 'klook_pillar',          url: 'https://www.klook.com/en-US/search/result/?keyword=surin+beach+phuket',                  sub_id: 'pseo-phuket-surin-pillar-klook',         label: 'Klook — Surin activities' },
    { key: 'gyg_pillar',            url: 'https://www.getyourguide.com/phuket-l1136/?q=surin+beach',                               sub_id: 'pseo-phuket-surin-pillar-gyg',           label: 'GetYourGuide — Surin' },
    { key: 'viator_pillar',         url: 'https://www.viator.com/Phuket/d348-ttd?text=surin+beach',                                sub_id: 'pseo-phuket-surin-pillar-viator',        label: 'Viator — Surin' },
  ],
};

async function createBatch(batch) {
  const res = await fetch('https://api.travelpayouts.com/links/v1/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Access-Token': TOKEN },
    body: JSON.stringify({
      trs: TRS,
      marker: MARKER,
      shorten: true,
      links: batch.map(b => ({ url: b.url, sub_id: b.sub_id })),
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('TPO API error', res.status, JSON.stringify(data));
    process.exit(1);
  }
  return data;
}

async function processCluster(name, sources) {
  console.log(`\n--- Cluster: ${name} (${sources.length} links) ---`);
  const partners = {};
  for (let i = 0; i < sources.length; i += 10) {
    const batch = sources.slice(i, i + 10);
    const data = await createBatch(batch);
    const links = data?.result?.links || [];
    links.forEach((l, idx) => {
      const src = batch[idx];
      if (l.code !== 'success') {
        console.warn(`  ! ${src.key} failed: ${l.message || JSON.stringify(l)}`);
        partners[src.key] = { partnerUrl: src.url, label: src.label, status: 'fallback-direct' };
      } else {
        partners[src.key] = { partnerUrl: l.partner_url, label: src.label };
        console.log(`  ✔ ${src.key} → ${l.partner_url}`);
      }
    });
  }
  const outDir = path.join(__dirname, '..', 'data', 'pseo', 'areas');
  fs.mkdirSync(outDir, { recursive: true });
  const out = {
    lastUpdated: new Date().toISOString().slice(0, 10),
    cluster: `phuket-beach-${name}`,
    partners,
  };
  const file = path.join(outDir, `${name}-partners.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 2));
  console.log('Wrote', file);
}

async function main() {
  for (const [name, sources] of Object.entries(CLUSTERS)) {
    await processCluster(name, sources);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
