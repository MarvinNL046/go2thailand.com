#!/usr/bin/env node
/**
 * Generate TPO partner URLs for the Phuket Tours cluster (cluster 7).
 *
 * Output: data/pseo/tours/phuket-partners.json
 *
 * Brands covered: Klook, GetYourGuide, Viator, Tiqets.
 * Per the affiliate playbook, each placement gets its own deeplink so we can
 * attribute clicks per pillar/spoke + placement.
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local explicitly (TRAVELPAYOUTS_API lives there)
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const TOKEN = process.env.TRAVELPAYOUTS_API;
if (!TOKEN) {
  console.error('Missing TRAVELPAYOUTS_API in .env.local');
  process.exit(1);
}

const TRS = 421888;
const MARKER = 602467;

// Each entry → one shortened deeplink with a sub_id we can track.
const SOURCE_LINKS = [
  // Pillar (broad Phuket tours discovery)
  { key: 'klook_pillar',          url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+tours',                         sub_id: 'pseo-phuket-tours-pillar-primary',     label: 'Klook — Phuket tours' },
  { key: 'gyg_pillar',             url: 'https://www.getyourguide.com/phuket-l1136/?q=tours',                                       sub_id: 'pseo-phuket-tours-pillar-secondary',   label: 'GetYourGuide — Phuket tours' },
  { key: 'viator_pillar',          url: 'https://www.viator.com/Phuket-tours/d348',                                                 sub_id: 'pseo-phuket-tours-pillar-viator',      label: 'Viator — Phuket tours' },
  { key: 'tiqets_pillar',          url: 'https://www.tiqets.com/en/phuket-attractions-c126175/',                                    sub_id: 'pseo-phuket-tours-pillar-tiqets',      label: 'Tiqets — Phuket attractions' },

  // Big Buddha + Wat Chalong + viewpoints
  { key: 'klook_big_buddha',       url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+big+buddha',                    sub_id: 'pseo-phuket-tours-big-buddha-primary', label: 'Klook — Phuket Big Buddha' },
  { key: 'gyg_big_buddha',         url: 'https://www.getyourguide.com/phuket-l1136/?q=big+buddha',                                 sub_id: 'pseo-phuket-tours-big-buddha-secondary', label: 'GetYourGuide — Phuket Big Buddha' },
  { key: 'viator_big_buddha',      url: 'https://www.viator.com/Phuket/d348-ttd?text=big+buddha',                                  sub_id: 'pseo-phuket-tours-big-buddha-viator',  label: 'Viator — Big Buddha' },

  // Elephant sanctuary (Phuket-specific)
  { key: 'klook_elephant',         url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+elephant+sanctuary',            sub_id: 'pseo-phuket-tours-elephant-sanctuary-primary',   label: 'Klook — Phuket elephants' },
  { key: 'gyg_elephant',           url: 'https://www.getyourguide.com/phuket-l1136/?q=elephant+sanctuary',                          sub_id: 'pseo-phuket-tours-elephant-sanctuary-secondary', label: 'GetYourGuide — Phuket elephants' },
  { key: 'viator_elephant',        url: 'https://www.viator.com/Phuket/d348-ttd?text=elephant+sanctuary',                           sub_id: 'pseo-phuket-tours-elephant-sanctuary-viator',    label: 'Viator — Phuket elephants' },

  // Cooking class
  { key: 'klook_cooking',          url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+cooking+class',                 sub_id: 'pseo-phuket-tours-cooking-class-primary',     label: 'Klook — Phuket cooking class' },
  { key: 'gyg_cooking',            url: 'https://www.getyourguide.com/phuket-l1136/?q=cooking+class',                              sub_id: 'pseo-phuket-tours-cooking-class-secondary',   label: 'GetYourGuide — Phuket cooking' },
  { key: 'viator_cooking',         url: 'https://www.viator.com/Phuket/d348-ttd?text=cooking+class',                               sub_id: 'pseo-phuket-tours-cooking-class-viator',      label: 'Viator — Phuket cooking' },

  // Snorkeling day trips
  { key: 'klook_snorkeling',       url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+snorkeling',                    sub_id: 'pseo-phuket-tours-snorkeling-primary',        label: 'Klook — Phuket snorkeling' },
  { key: 'gyg_snorkeling',         url: 'https://www.getyourguide.com/phuket-l1136/?q=snorkeling',                                 sub_id: 'pseo-phuket-tours-snorkeling-secondary',      label: 'GetYourGuide — Phuket snorkeling' },
  { key: 'viator_snorkeling',      url: 'https://www.viator.com/Phuket/d348-ttd?text=snorkeling',                                  sub_id: 'pseo-phuket-tours-snorkeling-viator',         label: 'Viator — Phuket snorkeling' },

  // Old Town walking + cultural tour
  { key: 'klook_old_town',         url: 'https://www.klook.com/en-US/search/result/?keyword=phuket+old+town',                      sub_id: 'pseo-phuket-tours-old-town-primary',          label: 'Klook — Phuket Old Town' },
  { key: 'gyg_old_town',           url: 'https://www.getyourguide.com/phuket-l1136/?q=old+town',                                   sub_id: 'pseo-phuket-tours-old-town-secondary',        label: 'GetYourGuide — Phuket Old Town' },
  { key: 'viator_old_town',        url: 'https://www.viator.com/Phuket/d348-ttd?text=old+town+walking',                            sub_id: 'pseo-phuket-tours-old-town-viator',           label: 'Viator — Phuket Old Town' },
];

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

async function main() {
  const partners = {};
  for (let i = 0; i < SOURCE_LINKS.length; i += 10) {
    const batch = SOURCE_LINKS.slice(i, i + 10);
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

  const outDir = path.join(__dirname, '..', 'data', 'pseo', 'tours');
  fs.mkdirSync(outDir, { recursive: true });
  const out = {
    lastUpdated: new Date().toISOString().slice(0, 10),
    cluster: 'cluster-7-phuket-tours',
    partners,
  };
  const file = path.join(outDir, 'phuket-partners.json');
  fs.writeFileSync(file, JSON.stringify(out, null, 2));
  console.log('Wrote', file);
}

main().catch(e => { console.error(e); process.exit(1); });
