#!/usr/bin/env node
// Generate Travelpayouts partner short-links for the Phuket wedding + honeymoon
// cluster (cluster 5). Saves them to data/pseo/wedding-honeymoon/phuket-partners.json.
//
// Usage: node scripts/generate-wedding-honeymoon-partners.mjs

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
const OUT_FILE = path.join(ROOT, 'data', 'pseo', 'wedding-honeymoon', 'phuket-partners.json');

if (!TOKEN) { console.error('Missing TRAVELPAYOUTS_API'); process.exit(1); }

// Test URL list — we test each one. If TPO returns code:'success' we keep the
// short link, otherwise we skip (per playbook).
const CANDIDATES = [
  // Trip.com hotel searches — luxury / honeymoon / wedding focus
  { key: 'trip_luxury_honeymoon', url: 'https://www.trip.com/hotels/list?keyword=Phuket+luxury+honeymoon', sub_id: 'pseo-phuket-honeymoon-trip-luxury', label: 'Trip.com — Phuket luxury honeymoon hotels' },
  { key: 'trip_wedding_venue',    url: 'https://www.trip.com/hotels/list?keyword=Phuket+wedding+venue',     sub_id: 'pseo-phuket-wedding-trip-venue',      label: 'Trip.com — Phuket wedding venue search' },
  { key: 'trip_honeymoon_resort', url: 'https://www.trip.com/hotels/list?keyword=Phuket+honeymoon+resort',  sub_id: 'pseo-phuket-honeymoon-trip-resort',   label: 'Trip.com — Phuket honeymoon resort' },
  { key: 'trip_pool_villa',       url: 'https://www.trip.com/hotels/list?keyword=Phuket+pool+villa',         sub_id: 'pseo-phuket-honeymoon-trip-pool-villa', label: 'Trip.com — Phuket pool villas' },
  { key: 'trip_all_inclusive',    url: 'https://www.trip.com/hotels/list?keyword=Phuket+all+inclusive+resort', sub_id: 'pseo-phuket-honeymoon-trip-all-inclusive', label: 'Trip.com — Phuket all-inclusive' },
  { key: 'trip_beach_resort',     url: 'https://www.trip.com/hotels/list?keyword=Phuket+beach+resort',       sub_id: 'pseo-phuket-wedding-trip-beach',      label: 'Trip.com — Phuket beach resort' },

  // Klook experiences
  { key: 'klook_honeymoon',       url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+honeymoon', sub_id: 'pseo-phuket-honeymoon-klook',       label: 'Klook — Phuket honeymoon' },
  { key: 'klook_sunset_couples',  url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+sunset+cruise+couples', sub_id: 'pseo-phuket-honeymoon-klook-sunset', label: 'Klook — Phuket sunset cruise couples' },
  { key: 'klook_couples_spa',     url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+couples+spa', sub_id: 'pseo-phuket-honeymoon-klook-spa',   label: 'Klook — Phuket couples spa' },
  { key: 'klook_phi_phi_private', url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+phi+phi+private+tour', sub_id: 'pseo-phuket-honeymoon-klook-private-tour', label: 'Klook — Phuket Phi Phi private tour' },

  // GetYourGuide categories
  { key: 'gyg_phuket_couples',    url: 'https://www.getyourguide.com/s/?q=phuket+couples',                  sub_id: 'pseo-phuket-honeymoon-gyg-couples',   label: 'GetYourGuide — Phuket couples' },
  { key: 'gyg_phuket_romantic',   url: 'https://www.getyourguide.com/s/?q=phuket+romantic',                 sub_id: 'pseo-phuket-honeymoon-gyg-romantic',  label: 'GetYourGuide — Phuket romantic' },

  // Viator
  { key: 'viator_honeymoon',      url: 'https://www.viator.com/searchResults/all?text=phuket+honeymoon',    sub_id: 'pseo-phuket-honeymoon-viator',        label: 'Viator — Phuket honeymoon' },
  { key: 'viator_private_tour',   url: 'https://www.viator.com/searchResults/all?text=phuket+private+tour', sub_id: 'pseo-phuket-honeymoon-viator-private', label: 'Viator — Phuket private tour' },
];

async function batchCreate(items) {
  const body = { trs: TRS, marker: MARKER, shorten: true, links: items.map(({ url, sub_id }) => ({ url, sub_id })) };
  const r = await fetch(ENDPOINT, {
    method: 'POST', headers: { 'X-Access-Token': TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const j = await r.json();
  if (j.code !== 'success') throw new Error(JSON.stringify(j));
  return j.result.links;
}

(async () => {
  console.log(`Generating ${CANDIDATES.length} TPO partner links for cluster 5 (wedding + honeymoon Phuket)...`);

  const partners = {};
  let ok = 0, fail = 0;

  for (let i = 0; i < CANDIDATES.length; i += 10) {
    const batch = CANDIDATES.slice(i, i + 10);
    try {
      const result = await batchCreate(batch);
      for (let j = 0; j < batch.length; j++) {
        const cand = batch[j];
        const r = result[j];
        if (r.code === 'success' && r.partner_url) {
          partners[cand.key] = { partnerUrl: r.partner_url, label: cand.label };
          console.log(`  ✓ ${cand.key} → ${r.partner_url}`);
          ok++;
        } else {
          console.warn(`  ✗ ${cand.key} — ${r.message || r.code}`);
          fail++;
        }
      }
    } catch (e) {
      console.error('  ✗ batch error:', e.message);
      fail += batch.length;
    }
    if (i + 10 < CANDIDATES.length) await new Promise(r => setTimeout(r, 1200));
  }

  // Reuse a couple of existing partner URLs from the yacht-charter cluster.
  // Sunset cruise CTA on the honeymoon page should pull the existing GYG yacht
  // category link rather than create a duplicate. Same for the Klook luxury
  // yacht link (couples sunset/private charter).
  try {
    const yachtFile = path.join(ROOT, 'data', 'pseo', 'yacht-charter', 'phuket-partners.json');
    const yacht = JSON.parse(fs.readFileSync(yachtFile, 'utf8')).partners;
    if (yacht.gyg_phuket_yacht) partners.gyg_yacht_sunset = { partnerUrl: yacht.gyg_phuket_yacht.partnerUrl, label: 'GetYourGuide — Phuket yacht/sunset cruise (reuse)' };
    if (yacht.klook_luxury) partners.klook_luxury_yacht = { partnerUrl: yacht.klook_luxury.partnerUrl, label: 'Klook — Phuket luxury yacht (reuse)' };
  } catch (e) { console.warn('  ⚠️  could not reuse yacht-charter partners:', e.message); }

  const out = {
    lastUpdated: new Date().toISOString().slice(0, 10),
    partners,
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
  console.log(`\n${ok} partner links generated, ${fail} failed. Total saved (incl. reuse): ${Object.keys(partners).length}`);
  console.log(`Written to ${path.relative(ROOT, OUT_FILE)}`);
})();
