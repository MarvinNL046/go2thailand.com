#!/usr/bin/env node
/**
 * Generate TPO partner URLs for the Phuket Old Town / Nai Harn / Rawai
 * sub-area clusters. One JSON output file per cluster.
 *
 * Outputs:
 *  - data/pseo/areas/old-town-partners.json
 *  - data/pseo/areas/nai-harn-partners.json
 *  - data/pseo/areas/rawai-partners.json
 *
 * Brands: Trip.com (hotels primary), Klook + Tiqets + GetYourGuide (activities).
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

// ---- OLD TOWN cluster (cultural, no hotels — Klook/GYG/Tiqets only) ----
const OLD_TOWN_LINKS = [
  // Pillar
  { key: 'klook_pillar',     url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+old+town', sub_id: 'pseo-phuket-old-town-pillar-primary',    label: 'Klook — Phuket Old Town' },
  { key: 'gyg_pillar',       url: 'https://www.getyourguide.com/phuket-l1136/?q=old+town',             sub_id: 'pseo-phuket-old-town-pillar-secondary',  label: 'GetYourGuide — Phuket Old Town' },
  { key: 'tiqets_pillar',    url: 'https://www.tiqets.com/en/phuket-attractions-c126175/',             sub_id: 'pseo-phuket-old-town-pillar-tiqets',     label: 'Tiqets — Phuket attractions' },
  // Things to do
  { key: 'klook_things',     url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+old+town+walking+tour', sub_id: 'pseo-phuket-old-town-things-to-do-primary',   label: 'Klook — Old Town walking tour' },
  { key: 'gyg_things',       url: 'https://www.getyourguide.com/phuket-l1136/?q=old+town+walking+tour',             sub_id: 'pseo-phuket-old-town-things-to-do-secondary', label: 'GetYourGuide — Old Town walking tour' },
  { key: 'tiqets_things',    url: 'https://www.tiqets.com/en/phuket-attractions-c126175/',                          sub_id: 'pseo-phuket-old-town-things-to-do-tiqets',    label: 'Tiqets — Phuket attractions' },
  // Night market / food tour
  { key: 'klook_market',     url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+night+market+food+tour', sub_id: 'pseo-phuket-old-town-night-market-primary',   label: 'Klook — Phuket night market food tour' },
  { key: 'gyg_market',       url: 'https://www.getyourguide.com/phuket-l1136/?q=night+market',                        sub_id: 'pseo-phuket-old-town-night-market-secondary', label: 'GetYourGuide — Phuket night market' },
  { key: 'viator_market',    url: 'https://www.viator.com/Phuket/d348-ttd?text=night+market',                          sub_id: 'pseo-phuket-old-town-night-market-viator',    label: 'Viator — Phuket night market' },
];

// ---- NAI HARN cluster (hotel-focused) ----
const NAI_HARN_LINKS = [
  // Pillar
  { key: 'trip_pillar',       url: 'https://www.trip.com/hotels/list?city=683&keyword=Nai%20Harn',                  sub_id: 'pseo-phuket-nai-harn-pillar-primary',     label: 'Trip.com — Nai Harn hotels' },
  { key: 'klook_pillar',      url: 'https://www.klook.com/en-US/search/result/?keyword=nai+harn+phuket',           sub_id: 'pseo-phuket-nai-harn-pillar-secondary',   label: 'Klook — Nai Harn activities' },
  // Hotels hub
  { key: 'trip_hotels',       url: 'https://www.trip.com/hotels/list?city=683&keyword=Nai%20Harn%20Beach',          sub_id: 'pseo-phuket-nai-harn-hotels-primary',     label: 'Trip.com — Nai Harn beach hotels' },
  // Hotel review primary CTAs (one per branded review page)
  { key: 'trip_the_nai_harn', url: 'https://www.trip.com/hotels/list?city=683&keyword=The%20Nai%20Harn',            sub_id: 'pseo-phuket-nai-harn-hotel-the-nai-harn-primary', label: 'Trip.com — The Nai Harn hotel' },
  { key: 'trip_wyndham',      url: 'https://www.trip.com/hotels/list?city=683&keyword=Wyndham%20Grand%20Nai%20Harn', sub_id: 'pseo-phuket-nai-harn-hotel-wyndham-primary',     label: 'Trip.com — Wyndham Grand Nai Harn' },
  // Activities CTAs (Promthep Cape, beach-area)
  { key: 'klook_activities',  url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+south+activities',    sub_id: 'pseo-phuket-nai-harn-activities-primary', label: 'Klook — South Phuket activities' },
  { key: 'gyg_activities',    url: 'https://www.getyourguide.com/phuket-l1136/?q=promthep+cape',                    sub_id: 'pseo-phuket-nai-harn-activities-secondary', label: 'GetYourGuide — Promthep Cape' },
];

// ---- RAWAI cluster (small) ----
const RAWAI_LINKS = [
  // Pillar
  { key: 'trip_pillar',     url: 'https://www.trip.com/hotels/list?city=683&keyword=Rawai',           sub_id: 'pseo-phuket-rawai-pillar-primary',    label: 'Trip.com — Rawai hotels' },
  { key: 'klook_pillar',    url: 'https://www.klook.com/en-US/search/result/?keyword=rawai+phuket',  sub_id: 'pseo-phuket-rawai-pillar-secondary',  label: 'Klook — Rawai activities' },
  { key: 'gyg_pillar',      url: 'https://www.getyourguide.com/phuket-l1136/?q=rawai',                sub_id: 'pseo-phuket-rawai-pillar-tertiary',   label: 'GetYourGuide — Rawai' },
  // Hotel review (Selina Serenity)
  { key: 'trip_selina',     url: 'https://www.trip.com/hotels/list?city=683&keyword=Selina%20Serenity%20Rawai', sub_id: 'pseo-phuket-rawai-hotel-selina-primary', label: 'Trip.com — Selina Serenity Rawai' },
];

async function createBatch(batch) {
  const res = await fetch('https://api.travelpayouts.com/links/v1/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Access-Token': TOKEN },
    body: JSON.stringify({
      trs: TRS, marker: MARKER, shorten: true,
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

async function generateCluster(name, links, outFile) {
  console.log(`\nGenerating ${name} (${links.length} links)...`);
  const partners = {};
  for (let i = 0; i < links.length; i += 10) {
    const batch = links.slice(i, i + 10);
    const data = await createBatch(batch);
    const result = data?.result?.links || [];
    result.forEach((l, idx) => {
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
    cluster: name,
    partners,
  };
  const filePath = path.join(outDir, outFile);
  fs.writeFileSync(filePath, JSON.stringify(out, null, 2));
  console.log(`  Wrote ${filePath}`);
}

async function main() {
  await generateCluster('phuket-old-town', OLD_TOWN_LINKS, 'old-town-partners.json');
  await generateCluster('phuket-nai-harn', NAI_HARN_LINKS, 'nai-harn-partners.json');
  await generateCluster('phuket-rawai',    RAWAI_LINKS,    'rawai-partners.json');
  console.log('\nAll clusters done.');
}

main().catch(e => { console.error(e); process.exit(1); });
