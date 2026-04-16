#!/usr/bin/env node
/**
 * Add Travelpayouts deep links to every hotel in every cluster.
 *
 * Reads data/clusters/<city>/hotels.json, writes a Booking.com search
 * deep-link to each hotel's `bookingUrl` field. The PSEO templates
 * already prefer `hotel.bookingUrl` over the city-level fallback —
 * so filling this field converts every "Search on Booking →" CTA into
 * a hotel-specific "Check rates →" CTA automatically.
 *
 * Link pattern mirrors scripts/add-hotel-affiliate-urls.ts (which operates
 * on data/top10 instead of clusters). Travelpayouts redirects to Booking's
 * search with the hotel name + city, which in practice lands on the
 * hotel's detail page when the name is distinctive.
 *
 * Usage:
 *   node scripts/add-cluster-affiliate-urls.mjs                # all cities
 *   node scripts/add-cluster-affiliate-urls.mjs --only=phuket  # one city
 *
 * Idempotent: re-running on an already-processed cluster is a no-op
 * (every URL will already be tp.media/tpo.lv wrapped).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const MARKER = '602467';
const TRS = '421888';
const BOOKING_PROGRAM = '4114';

const onlyArg = process.argv.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.slice(7) : null;

function wrapTravelpayouts(targetUrl) {
  return `https://tp.media/r?marker=${MARKER}&trs=${TRS}&p=${BOOKING_PROGRAM}&u=${encodeURIComponent(targetUrl)}`;
}

function makeBookingSearchLink(hotelName, cityName) {
  const query = `${hotelName}, ${cityName}, Thailand`;
  return wrapTravelpayouts(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(query)}`);
}

/**
 * Smart merge: decide what to do with a hotel's existing bookingUrl.
 *
 *  - already-wrapped tp.media / tpo.lv   → keep (already tracked)
 *  - raw booking.com/hotel/<slug>.html   → wrap so we land precisely AND track
 *  - raw booking.com/searchresults.html  → wrap to add tracking
 *  - anything else (klook, hotel-own site, missing) → overwrite with Booking search
 *
 * Returns {url, action} so the caller can report what happened.
 */
function resolveBookingUrl(existing, hotelName, cityName) {
  if (!existing) return { url: makeBookingSearchLink(hotelName, cityName), action: 'new' };
  if (/tp\.media\/r|tpo\.lv/.test(existing)) return { url: existing, action: 'keep-tracked' };
  if (/^https?:\/\/(www\.)?booking\.com\//.test(existing)) {
    // Wrap native Booking URL — keeps precise landing AND adds Travelpayouts tracking.
    return { url: wrapTravelpayouts(existing), action: 'wrap-booking' };
  }
  // klook.com, hotel's own site, etc. — can't track those, fall back to Booking search.
  return { url: makeBookingSearchLink(hotelName, cityName), action: 'overwrite' };
}

function processCity(city) {
  const file = path.join(ROOT, 'data/clusters', city, 'hotels.json');
  if (!fs.existsSync(file)) { console.log(`· skip ${city} (no hotels.json)`); return { added: 0, skipped: 0 }; }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const cityName = data.cityName || city;

  const tally = { new: 0, 'keep-tracked': 0, 'wrap-booking': 0, overwrite: 0 };
  for (const h of data.hotels || []) {
    const { url, action } = resolveBookingUrl(h.bookingUrl, h.name, cityName);
    h.bookingUrl = url;
    tally[action]++;
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  const parts = Object.entries(tally).filter(([_,n]) => n > 0).map(([k,n]) => `${k}:${n}`).join(' ');
  console.log(`✓ ${city}: ${parts} (total ${data.hotels.length})`);
  return tally;
}

function main() {
  const clustersDir = path.join(ROOT, 'data/clusters');
  const cities = ONLY ? [ONLY] : fs.readdirSync(clustersDir).filter(c => fs.statSync(path.join(clustersDir, c)).isDirectory());
  const totals = { new: 0, 'keep-tracked': 0, 'wrap-booking': 0, overwrite: 0 };
  for (const city of cities) {
    const r = processCity(city);
    for (const k of Object.keys(totals)) totals[k] += r[k] || 0;
  }
  console.log(`\n=== DONE ===`);
  console.log(`  new              : ${totals.new}              (no prior bookingUrl)`);
  console.log(`  wrap-booking     : ${totals['wrap-booking']}  (had raw booking.com link — now tracked + precise landing)`);
  console.log(`  overwrite        : ${totals.overwrite}        (had klook/hotel-direct — replaced with tracked Booking search)`);
  console.log(`  keep-tracked     : ${totals['keep-tracked']}  (already tp.media/tpo.lv)`);
}

main();
