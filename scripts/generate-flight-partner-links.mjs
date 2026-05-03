#!/usr/bin/env node
// Generate tracked Trip.com Flight partner links via TPO API for every
// transport route that has duration.flight set. Stores `flightPartnerUrl`
// per route in data/transport-routes.json.
//
// Usage: node scripts/generate-flight-partner-links.mjs [--dry-run]

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
const ROUTES_FILE = path.join(ROOT, 'data', 'transport-routes.json');
const DRY = process.argv.includes('--dry-run');

if (!TOKEN) { console.error('Missing TRAVELPAYOUTS_API'); process.exit(1); }

// City slug → IATA airport code. Cities NOT here have no nearby flightable
// airport (e.g. Pai, Mae Hong Son, Pak Chong) — flightless routes get skipped.
const IATA = {
  'bangkok': 'BKK',
  'chiang-mai': 'CNX',
  'chiang-rai': 'CEI',
  'phuket': 'HKT',
  'koh-samui': 'USM',
  'krabi': 'KBV',
  'hat-yai': 'HDY',
  'hua-hin': 'HHQ',
  'pattaya': 'UTP',
  'nakhon-si-thammarat': 'NST',
  'surat-thani': 'URT',
  'chumphon': 'CJM',
  'trang': 'TST',
  'udon-thani': 'UTH',
  'khon-kaen': 'KKC',
  'ubon-ratchathani': 'UBP',
  'lampang': 'LPT',
  'mae-hong-son': 'HGN',
  'pai': 'PYY',
  'mukdahan': null,
  'nakhon-phanom': 'KOP',
  'nakhon-ratchasima': null,
  'phitsanulok': 'PHS',
  'sukhothai': 'THS',
  'rayong': 'UTP',
  'trat': 'TDX',
  'kanchanaburi': null,
  'ayutthaya': null,
  'lopburi': null,
  'nong-khai': null,
  'chiang-khan': null,
  'bueng-kan': null,
};

function tripFlightUrl(fromIata, toIata) {
  return `https://www.trip.com/flights/booking?dcity=${fromIata}&acity=${toIata}`;
}

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
  const data = JSON.parse(fs.readFileSync(ROUTES_FILE, 'utf8'));
  const routes = data.routes;

  // Build queue: routes with flight duration AND known IATA for both ends AND no existing flightPartnerUrl
  const queue = [];
  for (const route of routes) {
    if (!route.duration?.flight) continue;
    if (route.flightPartnerUrl?.includes('tpo.lv')) continue;
    const fromIata = IATA[route.from];
    const toIata = IATA[route.to];
    if (!fromIata || !toIata) continue;
    queue.push({
      url: tripFlightUrl(fromIata, toIata),
      sub_id: `transport-${route.slug}-flight`,
      _route: route,
      _fromIata: fromIata,
      _toIata: toIata,
    });
  }

  console.log(`Queue: ${queue.length} routes to process${DRY ? ' (DRY)' : ''}`);

  if (DRY) {
    queue.forEach(q => console.log(' -', q._route.slug, q._fromIata, '→', q._toIata));
    return;
  }

  let processed = 0;
  for (let i = 0; i < queue.length; i += 10) {
    const batch = queue.slice(i, i + 10);
    try {
      const result = await batchCreate(batch);
      for (let j = 0; j < batch.length; j++) {
        const r = result[j];
        if (r.code === 'success') {
          batch[j]._route.flightPartnerUrl = r.partner_url;
          batch[j]._route.fromIata = batch[j]._fromIata;
          batch[j]._route.toIata = batch[j]._toIata;
          processed++;
        } else {
          console.warn('  ⚠️ ', batch[j]._route.slug, r.message || r.code);
        }
      }
    } catch (e) {
      console.error('  ✗', e.message);
    }
    if (i + 10 < queue.length) await new Promise(r => setTimeout(r, 1200));
  }

  fs.writeFileSync(ROUTES_FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`\n${processed} routes enriched with flightPartnerUrl. Written to ${path.relative(ROOT, ROUTES_FILE)}`);
})();
