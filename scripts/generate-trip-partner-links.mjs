#!/usr/bin/env node
// Generate tracked Trip.com partner links via Travelpayouts links/v1/create API
// for every hotel in data/pseo/best-hotels/*.json (EN + NL variants).
//
// Writes partner_url back into each hotel object as `tripPartnerUrl` field.
// Templates use `tripPartnerUrl` (when present) over the legacy `bookingUrl`.
//
// Usage: node scripts/generate-trip-partner-links.mjs [--dry-run] [--only=phuket-family]

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
const TARGETS = [
  path.join(ROOT, 'data/pseo/best-hotels'),
  path.join(ROOT, 'data/pseo/best-hotels/nl'),
];

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const onlyArg = args.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.slice(7) : null;

if (!TOKEN) {
  console.error('Missing TRAVELPAYOUTS_API in .env.local');
  process.exit(1);
}

function tripKeywordUrl(hotelName) {
  return `https://www.trip.com/hotels/list?keyword=${encodeURIComponent(hotelName)}`;
}

async function batchCreateLinks(items) {
  // items: [{url, sub_id, _hotelRef}]
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

function listJsonFiles() {
  const files = [];
  for (const dir of TARGETS) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.json')) continue;
      const filePath = path.join(dir, f);
      if (ONLY && !f.includes(ONLY)) continue;
      files.push(filePath);
    }
  }
  return files;
}

async function processFile(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(data.hotels)) return { file: filePath, processed: 0 };
  const isNl = filePath.includes('/nl/');
  const cityCategory = `${data.citySlug}-${data.category}${isNl ? '-nl' : ''}`;

  // Build batch — skip hotels that already have tripPartnerUrl
  const items = [];
  for (const h of data.hotels) {
    if (h.tripPartnerUrl && h.tripPartnerUrl.includes('tpo.lv')) continue;
    items.push({
      url: tripKeywordUrl(h.name),
      sub_id: `pseo-best-hotels-${cityCategory}-${h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`,
      _ref: h,
    });
  }
  if (items.length === 0) return { file: path.relative(ROOT, filePath), processed: 0, skipped: data.hotels.length };

  // API limit: max 10 links per request
  let processed = 0;
  for (let i = 0; i < items.length; i += 10) {
    const batch = items.slice(i, i + 10);
    if (DRY) {
      console.log(`  [DRY] would request ${batch.length} links for ${path.basename(filePath)}`);
      processed += batch.length;
      continue;
    }
    try {
      const result = await batchCreateLinks(batch);
      for (let j = 0; j < batch.length; j++) {
        const r = result[j];
        if (r.code === 'success' && r.partner_url) {
          batch[j]._ref.tripPartnerUrl = r.partner_url;
          processed++;
        } else {
          console.warn(`  ⚠️  ${batch[j]._ref.name}: ${r.message || r.code}`);
        }
      }
    } catch (e) {
      console.error(`  ✗ Batch failed: ${e.message}`);
    }
    // Rate limit safety: 100/min, sleep 600ms between batches
    if (i + 10 < items.length) await new Promise(r => setTimeout(r, 600));
  }

  if (!DRY && processed > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  }
  return { file: path.relative(ROOT, filePath), processed, total: data.hotels.length };
}

(async () => {
  const files = listJsonFiles();
  console.log(`Found ${files.length} JSON files to process${DRY ? ' (DRY RUN)' : ''}`);
  if (ONLY) console.log(`  filter: --only=${ONLY}`);
  console.log('');

  let totalProcessed = 0;
  for (const file of files) {
    const result = await processFile(file);
    console.log(`✓ ${result.file}: ${result.processed} new, ${result.total || 0} total hotels`);
    totalProcessed += result.processed;
  }
  console.log(`\nDone. ${totalProcessed} new partner_url entries written.`);
})().catch(e => { console.error(e); process.exit(1); });
