#!/usr/bin/env node
/**
 * PSEO Fase 3: deep per-hotel pages.
 *
 * Generates one /hotel/<slug>/ page per hotel in data/clusters/<city>/hotels.json.
 * These are the deepest buyer-intent pages — someone searching for a hotel
 * name is at transaction stage. Pure BOFU.
 *
 * Slug strategy: bare hotel-name slug, with `-<city>` suffix only when the
 * bare slug would collide across cities (2 cases out of 424).
 *
 * Budget: ~424 hotels × ~$0.002 ≈ $0.85 full site. Use --only=<city> for
 * narrow runs (e.g. 5 PSEO cities = ~60 pages, $0.12).
 *
 * Output: data/pseo/hotels/<slug>.json
 * Consumed by pages/hotel/[slug].tsx at build/ISR time.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_KEY;
if (!OPENROUTER_KEY) { console.error('Missing OPENROUTER_API_KEY'); process.exit(1); }

const grok = new OpenAI({
  apiKey: OPENROUTER_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: { 'HTTP-Referer': 'https://go2-thailand.com', 'X-Title': 'go2thailand-hotels' },
});

const onlyArg = process.argv.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.slice(7) : null;

const slugify = s => (s || '')
  .toLowerCase()
  .replace(/[&/]/g, ' ')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');

// -------------------------------------------------------------------
// Step 1: build a global collision map so we know which hotels need
// a `-<city>` suffix to stay globally unique.
// -------------------------------------------------------------------
function buildGlobalSlugMap() {
  const clustersDir = path.join(ROOT, 'data/clusters');
  const bySlug = new Map();
  for (const city of fs.readdirSync(clustersDir)) {
    const file = path.join(clustersDir, city, 'hotels.json');
    if (!fs.existsSync(file)) continue;
    try {
      const d = JSON.parse(fs.readFileSync(file, 'utf8'));
      for (const h of d.hotels || []) {
        const s = slugify(h.name);
        if (!bySlug.has(s)) bySlug.set(s, []);
        bySlug.get(s).push({ city, name: h.name });
      }
    } catch {}
  }
  // Resolve each hotel to its final unique URL slug.
  const resolved = new Map(); // key: `${city}|${name}` → final slug
  for (const [baseSlug, entries] of bySlug) {
    if (entries.length === 1) {
      const e = entries[0];
      resolved.set(`${e.city}|${e.name}`, baseSlug);
    } else {
      // Collision — suffix each with city slug.
      for (const e of entries) {
        resolved.set(`${e.city}|${e.name}`, `${baseSlug}-${e.city}`);
      }
    }
  }
  return resolved;
}

// -------------------------------------------------------------------
// SerpAPI PAA
// -------------------------------------------------------------------
// PAA helper — BrightData-first (17× cheaper), SerpAPI fallback.
async function getPAA(query) {
  const BRD = process.env.BRIGHTDATA_API_KEY;
  if (BRD) {
    try {
      const params = new URLSearchParams({ q: query, hl: 'en', gl: 'us' });
      const res = await fetch('https://api.brightdata.com/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${BRD}` },
        body: JSON.stringify({ zone: process.env.BRIGHTDATA_SERP_ZONE || 'go2_projects_serp', url: `https://www.google.com/search?${params}`, format: 'raw' }),
      });
      if (res.ok) {
        const data = JSON.parse(await res.text());
        return (data.people_also_ask || []).map(q => q.question).filter(Boolean).slice(0, 5);
      }
    } catch {}
  }
  if (!SERPAPI_KEY) return [];
  try {
    const params = new URLSearchParams({ engine: 'google', q: query, hl: 'en', gl: 'us', api_key: SERPAPI_KEY });
    const res = await fetch(`https://serpapi.com/search.json?${params}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.related_questions || []).slice(0, 5).map(q => q.question).filter(Boolean);
  } catch { return []; }
}

// -------------------------------------------------------------------
// Prompt
// -------------------------------------------------------------------
function buildPrompt(hotel, cityName, similarHotels, paa) {
  const simLines = similarHotels.map((h, i) => `${i + 1}. ${h.name} (${h.priceRange || 'n/a'}) — ${h.description.slice(0, 140)}`).join('\n');
  return `You write programmatic-SEO travel content for go2-thailand.com — deep per-hotel review pages.

HOTEL DATA (use verbatim — do not rename, do not invent specs):
Name: ${hotel.name}
Category: ${hotel.category || 'hotel'}
Area: ${hotel.area || 'unknown'} in ${cityName}
Price range: ${hotel.priceRange || 'varies'}
Description: ${hotel.description}
Highlights: ${(hotel.highlights || []).join(' | ')}
Best for: ${(hotel.bestFor || []).join(', ')}
Review score: ${hotel.reviewScore || 'n/a'}

SIMILAR HOTELS IN ${cityName.toUpperCase()} (reference list — use these verbatim if mentioned):
${simLines || '(none available)'}

People Also Ask (answer relevant ones in FAQ):
${paa.length ? paa.map(q => '- ' + q).join('\n') : '(none)'}

OUTPUT — strict JSON, no markdown fences, no preamble:
{
  "hookIntro": "1 sentence problem-opener. Pattern: 'Booking ${hotel.name} without knowing [one specific gotcha] can [bad outcome].' Be concrete to this hotel.",
  "intro": "2 sentences. What ${hotel.name} actually delivers + who it's for.",
  "quickStats": {
    "priceBand": "€ | €€ | €€€ — map from the priceRange field",
    "bestFor": "3-5 word traveler segment",
    "standout": "one clear differentiator: pool, spa, rooftop, location, beach access, breakfast, design, service",
    "noGoFor": "3-5 word segment that will be disappointed"
  },
  "whyBook": ["3-5 specific reasons to book this hotel — each max 12 words, concrete not generic"],
  "whyNotBook": ["MANDATORY 3-5 honest reasons to skip. Specific to THIS hotel (not 'pricey' if €€€). Examples: 'Pool area gets crowded 10am-3pm', 'Breakfast repeats heavily over multi-night stay', 'Rooms facing main road hear traffic until 10pm'"],
  "skipIf": "1 sentence starting with 'Skip if' — the specific traveller type or situation.",
  "detailedReview": "150-250 words. What it's actually like to stay here. Cover: check-in feel, room vibe, standout amenity, food quality, service style, typical guest profile. Specific details from the hotel data. No generic 'luxurious' / 'stunning' adjectives without backing.",
  "locationReality": "2-3 sentences. The real location situation: distance to main attraction/beach/BTS in walking minutes or typical Grab cost, what's within 5-min walk, what requires transport. Use known ${cityName} geography.",
  "localSignals": [
    "EXACTLY 5 concrete facts someone booking would Google: specific distance to main beach/landmark in minutes, nearest BTS/MRT or airport transfer cost, on-property amenity count (pools/restaurants), WiFi/breakfast-included status if evident from data, nearby convenience (7-Eleven / restaurant strip)."
  ],
  "travellerNote": "1-2 sentences aggregating what guests commonly praise AND commonly complain about in public reviews. Phrase as 'Guests often praise X but note Y'. No direct quotes, no fake reviewer names, no invented review counts.",
  "bookingTips": [
    "3-5 concrete booking tips for ${hotel.name}: which room type to request, which platform tends cheapest (Booking vs Agoda for Thailand), when prices spike (specific months/events), what to verify before booking (shuttle, breakfast policy, construction notices)."
  ],
  "similarHotels": [
    { "name": "<name from reference list verbatim>", "howDifferent": "1 short sentence on how it differs from ${hotel.name}" }
    // 2-3 entries from the reference list only; skip entire field if list empty
  ],
  "faq": [
    { "q": "<prefer PAA-like question>", "a": "1-2 sentences, direct answer." }
    // 4-6 entries
  ],
  "urgencyLine": "1 sentence urgency. Example: 'Rooms at ${hotel.name} with [best feature] book out 1-2 months ahead for high season — check today.'",
  "methodology": "2-3 sentences. 'We rated ${hotel.name} based on [factors]. We weighted [X] highest because [reason]. Prices and availability change — always verify before booking.' End with: 'Last updated: ${new Date().toISOString().slice(0, 7)}.'",
  "metaTitle": "Format: '${hotel.name} Review (2026)' or '${hotel.name}, ${cityName} — Review' — under 60 chars, trim.",
  "metaDescription": "HARD LIMIT: between 140 and 155 characters (count them — Google truncates past 155). Include: hotel name + city + 1 standout + 1 honest caveat + soft CTA. No clickbait. If you exceed 155, shorten the caveat, not the standout."
}

ANTI-HALLUCINATION:
- NEVER invent specific amenity counts, room numbers, prices, review scores, or years not in the hotel data.
- If data doesn't contain a specific fact, write "varies" or omit the field.
- Never reference hotels not on the reference list.
- Use only widely-known ${cityName} geography (BTS/MRT stations, famous beaches, main streets).`;
}

async function callGrokJson(prompt) {
  const resp = await grok.chat.completions.create({
    model: 'x-ai/grok-4-fast',
    max_tokens: 6000,
    temperature: 0.35,
    messages: [
      { role: 'system', content: `You output ONLY valid JSON matching the requested schema. No markdown fences. No preamble.

The goal is not to describe hotels, but to help the user decide quickly.
Always include:
- trade-offs (not only praise)
- specific details from the data
- honest drawbacks per hotel` },
      { role: 'user', content: prompt },
    ],
  });
  let raw = (resp.choices[0]?.message?.content || '').trim();
  raw = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```\s*$/, '').trim();
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch {
    const m = raw.match(/\{[\s\S]*\}$/);
    if (!m) throw new Error(`Bad JSON: ${raw.slice(0, 200)}`);
    parsed = JSON.parse(m[0]);
  }
  return { data: parsed, usage: resp.usage };
}

// -------------------------------------------------------------------
// Per-hotel builder
// -------------------------------------------------------------------
async function buildHotelPage(city, cityName, hotel, slug, allHotelsInCity) {
  const outFile = path.join(ROOT, 'data/pseo/hotels', `${slug}.json`);
  if (fs.existsSync(outFile)) { console.log(`· skip ${slug} (exists)`); return { skipped: true }; }

  // Similar hotels: same category, same city, max 3, exclude self.
  const similar = allHotelsInCity
    .filter(h => h.name !== hotel.name && (h.category === hotel.category || (h.area && h.area === hotel.area)))
    .slice(0, 3);

  const paa = await getPAA(`${hotel.name} ${cityName} review`);

  let res;
  try {
    res = await callGrokJson(buildPrompt(hotel, cityName, similar, paa));
  } catch (e) {
    console.error(`✗ ${slug}:`, e.message);
    return { failed: true };
  }

  const out = {
    template: 'hotel-deep',
    citySlug: city,
    cityName,
    hotelSlug: slug,
    hotel,
    similarHotels: similar,
    paaQuestions: paa,
    aiContent: res.data,
    lastUpdated: new Date().toISOString().slice(0, 10),
    generatedAt: new Date().toISOString(),
  };
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  console.log(`✓ ${slug}: ${similar.length} similar, ${paa.length} PAA, ${res.usage?.prompt_tokens}+${res.usage?.completion_tokens} tok`);
  return { built: true, tokensIn: res.usage?.prompt_tokens || 0, tokensOut: res.usage?.completion_tokens || 0 };
}

// -------------------------------------------------------------------
// Driver
// -------------------------------------------------------------------
async function main() {
  const slugMap = buildGlobalSlugMap();
  const totals = { built: 0, skipped: 0, failed: 0, tokensIn: 0, tokensOut: 0 };

  const clustersDir = path.join(ROOT, 'data/clusters');
  let cities = fs.readdirSync(clustersDir);

  // --only filter can be a single city or a specific slug
  let singleSlug = null;
  if (ONLY) {
    if (fs.existsSync(path.join(clustersDir, ONLY))) {
      cities = [ONLY];
    } else {
      singleSlug = ONLY;
      cities = [...slugMap.entries()].filter(([_, s]) => s === ONLY).map(([k]) => k.split('|')[0]);
      cities = Array.from(new Set(cities));
    }
  }

  for (const city of cities) {
    const file = path.join(clustersDir, city, 'hotels.json');
    if (!fs.existsSync(file)) continue;
    const d = JSON.parse(fs.readFileSync(file, 'utf8'));
    const cityName = d.cityName || city;
    const hotels = d.hotels || [];
    console.log(`\n--- ${city} (${hotels.length} hotels) ---`);
    for (const h of hotels) {
      const slug = slugMap.get(`${city}|${h.name}`);
      if (!slug) continue;
      if (singleSlug && slug !== singleSlug) continue;
      const r = await buildHotelPage(city, cityName, h, slug, hotels);
      if (r.built) { totals.built++; totals.tokensIn += r.tokensIn; totals.tokensOut += r.tokensOut; }
      if (r.skipped) totals.skipped++;
      if (r.failed) totals.failed++;
    }
  }

  const cost = (totals.tokensIn / 1e6) * 0.2 + (totals.tokensOut / 1e6) * 0.5;
  console.log(`\n=== DONE ===`);
  console.log(`Built: ${totals.built}  Skipped: ${totals.skipped}  Failed: ${totals.failed}`);
  console.log(`Tokens: ${totals.tokensIn}+${totals.tokensOut} ≈ $${cost.toFixed(3)}`);
}

main().catch(e => { console.error(e); process.exit(1); });
