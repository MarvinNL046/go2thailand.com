#!/usr/bin/env node
// Generate tracked Trip.com flight partner links via Travelpayouts links/v1/create API
// for routes in data/pseo/flights/{bangkok,chiang-mai}-routes.json
//
// Writes partner_url back into each route object as `partnerUrl` field.
//
// Usage: node scripts/generate-flights-partner-links.mjs [--dry-run] [--only=bangkok|chiang-mai]

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

const FILES = [
  { destSlug: 'bangkok', destIata: 'BKK', file: path.join(ROOT, 'data/pseo/flights/bangkok-routes.json') },
  { destSlug: 'chiang-mai', destIata: 'CNX', file: path.join(ROOT, 'data/pseo/flights/chiang-mai-routes.json') },
];

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const onlyArg = args.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.slice(7) : null;

if (!TOKEN) {
  console.error('Missing TRAVELPAYOUTS_API in .env.local');
  process.exit(1);
}

function tripFlightUrl(fromIata, toIata) {
  return `https://www.trip.com/flights/booking?dcity=${fromIata}&acity=${toIata}`;
}
function tripSearchGenericUrl(toIata) {
  return `https://www.trip.com/flights/showfaresearch?acity=${toIata}`;
}

async function batchCreateLinks(items) {
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

async function processFile({ destSlug, destIata, file }) {
  if (ONLY && destSlug !== ONLY) return { file, processed: 0, skipped: true };
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const items = [];
  for (const r of data.routes) {
    if (r.partnerUrl && r.partnerUrl.includes('tpo.lv')) continue;
    const url = r.tier === 'search'
      ? tripSearchGenericUrl(destIata)
      : tripFlightUrl(r.from, destIata);
    items.push({
      url,
      sub_id: `flights-to-${destSlug}-${r.code}`,
      _ref: r,
    });
  }
  if (items.length === 0) return { file: path.relative(ROOT, file), processed: 0, total: data.routes.length };

  let processed = 0;
  for (let i = 0; i < items.length; i += 10) {
    const batch = items.slice(i, i + 10);
    if (DRY) {
      console.log(`  [DRY] would request ${batch.length} links for ${path.basename(file)}`);
      for (const b of batch) console.log(`    ${b.sub_id} -> ${b.url}`);
      processed += batch.length;
      continue;
    }
    try {
      const result = await batchCreateLinks(batch);
      for (let j = 0; j < batch.length; j++) {
        const r = result[j];
        if (r.code === 'success' && r.partner_url) {
          batch[j]._ref.partnerUrl = r.partner_url;
          processed++;
        } else {
          console.warn(`  [warn] ${batch[j]._ref.code}: ${r.message || r.code}`);
        }
      }
    } catch (e) {
      console.error(`  [err] Batch failed: ${e.message}`);
    }
    if (i + 10 < items.length) await new Promise(r => setTimeout(r, 1200));
  }

  if (!DRY && processed > 0) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  }
  return { file: path.relative(ROOT, file), processed, total: data.routes.length };
}

(async () => {
  console.log(`Generating flight partner links${DRY ? ' (DRY RUN)' : ''}`);
  if (ONLY) console.log(`  filter: --only=${ONLY}`);
  console.log('');
  let totalProcessed = 0;
  for (const target of FILES) {
    const result = await processFile(target);
    if (result.skipped) continue;
    console.log(`OK ${result.file}: ${result.processed} new, ${result.total} routes total`);
    totalProcessed += result.processed;
    await new Promise(r => setTimeout(r, 500));
  }
  console.log(`\nDone. ${totalProcessed} new partner_url entries written.`);
})().catch(e => { console.error(e); process.exit(1); });
