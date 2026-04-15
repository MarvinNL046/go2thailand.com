#!/usr/bin/env node
/**
 * PSEO Fase 2: deep per-neighborhood pages.
 *
 * For each neighborhood in data/clusters/<city>/where-to-stay.json, generates
 * one /areas/<city>/<area-slug>/ page. This is the deepest long-tail PSEO layer
 * — matches buyer queries like "is Thonglor good for couples", "where is
 * Sukhumvit in Bangkok", "Patong Beach hotels".
 *
 * Funnel role: bridges blogs (/blog/...) with decision pages (/where-to-stay/,
 * /best-hotels/). Blog → Area → Where-to-stay or Best-hotels.
 *
 * Budget: ~60 areas across 5 cities × $0.002 ≈ $0.12 total.
 *
 * Output: data/pseo/areas/<city>-<area-slug>.json
 * Consumed by pages/areas/[city]/[area].tsx at build/ISR time.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Load .env.local (same pattern as other pipeline scripts)
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
  defaultHeaders: { 'HTTP-Referer': 'https://go2-thailand.com', 'X-Title': 'go2thailand-areas' },
});

const CITIES = ['bangkok', 'chiang-mai', 'phuket', 'krabi', 'koh-samui'];
const onlyArg = process.argv.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.slice(7) : null;

const slugify = s => (s || '')
  .toLowerCase()
  .replace(/[&/]/g, ' ')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');

const normName = s => (s || '').trim().toLowerCase();

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

function buildPrompt(cityName, neighborhood, hotels, nearbyAreas, paa) {
  const hotelLines = hotels.map((h, i) => `${i + 1}. ${h.name} (${h.category || 'hotel'}, ${h.priceRange || 'n/a'}) — ${h.description.slice(0, 160)}`).join('\n');
  return `You write programmatic-SEO travel content for go2-thailand.com.

TASK: Write the unique-angle content for a page titled "Staying in ${neighborhood.name}, ${cityName} (2026)".

NEIGHBORHOOD DATA (use verbatim — do not rename or invent):
Name: ${neighborhood.name}
Description: ${neighborhood.description}
Best for: ${neighborhood.bestFor}
Price level: ${neighborhood.priceLevel || 'mixed'}
Walking score: ${neighborhood.walkingScore || 'varies'}
Highlights: ${(neighborhood.highlights || []).join(' | ')}
Transport notes: ${(neighborhood.transportNotes || []).join(' | ')}

HOTELS THAT SIT IN OR NEAR THIS AREA (reference list — do not add others):
${hotelLines || '(none in our data — keep hotel suggestions generic, do not invent names)'}

NEARBY AREAS in ${cityName} (for comparison — use verbatim):
${nearbyAreas.join(', ')}

People Also Ask (answer what fits in FAQ):
${paa.length ? paa.map(q => '- ' + q).join('\n') : '(none)'}

OUTPUT — strict JSON, no markdown fences, no preamble:
{
  "hookIntro": "1 sentence problem-opener. Pattern: 'Picking the wrong part of ${neighborhood.name} can [bad outcome] — most first-timers [common pitfall].' Be concrete to this area.",
  "intro": "2 sentences. What makes ${neighborhood.name} distinctive, and what we ranked on.",
  "vibe": "2-3 word area vibe tag, e.g. 'Buzzing + central', 'Laid-back + beachy', 'Traditional + walkable'.",
  "quickStats": {
    "priceBand": "€ | €€ | €€€ | €-€€€",
    "walkability": "Low | Medium | High",
    "bestFor": "3-5 word phrase matching the neighborhood's bestFor field",
    "safetyNote": "1 short phrase: area safety general level (e.g. 'Safe, watch bags at night markets')."
  },
  "detailedDescription": "150-250 words. What travellers actually experience here. Cover: street-level atmosphere, who lives/works here, day vs night, noise level, food scene, practical getting-around. No generic travel cliches, no 'vibrant colors' or 'exotic charm'. Be specific to ${neighborhood.name}.",
  "localSignals": [
    "EXACTLY 5 concrete locator facts a traveller would Google: nearest BTS/MRT station + walking minutes, typical Grab/taxi cost from the city's main airport, distance to the area's iconic landmark/beach/street, noise level at night (quiet/moderate/loud), nearest convenience (7-Eleven / supermarket / pharmacy cluster). Use real station and street names where possible."
  ],
  "pros": ["3-5 bullets of what actually works in this area, each max 10 words"],
  "cons": ["MANDATORY 3-5 honest cons. Specific, not generic. Examples: 'Traffic noise until 11pm on main road', 'Beach sand gets rocky at low tide', '7-Eleven closes earlier than other areas'"],
  "skipIf": "1 sentence starting with 'Skip if' — the specific traveller type or situation that should NOT stay here.",
  "stayRecommendations": [
    { "name": "<hotel name from reference list verbatim>", "why": "1 sentence why this hotel fits ${neighborhood.name} specifically" }
    // 2-4 entries, only from the reference hotel list; skip this whole field if the list is empty
  ],
  "compareTo": [
    { "areaName": "<from nearby list>", "shortPitch": "1 sentence on how this area differs from ${neighborhood.name}", "recommendFor": "3-5 words: who should choose it instead" }
    // 2-3 entries, only from the nearby areas list
  ],
  "travellerNote": "1-2 sentences aggregating what travellers commonly praise AND commonly complain about this area. Phrase as 'Travellers often praise X but note Y'. No direct quotes, no fake names.",
  "faq": [
    { "q": "<prefer a PAA question>", "a": "1-2 sentences, include a recommendation when possible." }
    // 4-6 entries
  ],
  "urgencyLine": "1 sentence urgency tied to this area specifically. Example: 'Rooms along the main strip of ${neighborhood.name} go first during high season — check availability 2-3 months out.'",
  "methodology": "2-3 sentences. 'We compared ${neighborhood.name} to [nearby area] and [nearby area] based on walkability, price level, noise, and suitability for its typical travellers. We weighted [factor] highest because [reason].' End with: 'Last updated: ${new Date().toISOString().slice(0, 7)}.'",
  "metaTitle": "Format: 'Staying in ${neighborhood.name}, ${cityName} (2026)' — under 60 chars, trim if needed.",
  "metaDescription": "140-155 chars. Include: area name + city + 1 concrete benefit + 1 soft CTA ('see hotels', 'compare areas'). No clickbait."
}

ANTI-HALLUCINATION:
- Never invent hotel names not on the reference list — if it's empty, omit stayRecommendations entirely.
- Never invent statistics, review counts, or prices not in the neighborhood/hotel data.
- Use only widely-known ${cityName} facts (transit lines, main streets, famous landmarks).
- When unsure, write "varies" or omit.`;
}

async function callGrokJson(prompt) {
  const resp = await grok.chat.completions.create({
    model: 'x-ai/grok-4-fast',
    max_tokens: 6000,
    temperature: 0.35,
    messages: [
      { role: 'system', content: `You output ONLY valid JSON matching the requested schema. No markdown fences. No preamble.

The goal is not to describe options, but to help the user choose quickly.
Always include:
- trade-offs (why this area over another)
- clear recommendations (no fence-sitting)
- decision shortcuts (if X then Y)` },
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

function matchHotelsToArea(neighborhood, allHotels) {
  const nName = normName(neighborhood.name);
  const recommendedNames = new Set((neighborhood.recommendedHotels || []).map(normName));
  const byName = new Map(allHotels.map(h => [normName(h.name), h]));
  const results = [];

  // 1. Any hotel listed in recommendedHotels → include.
  for (const rn of recommendedNames) {
    const h = byName.get(rn);
    if (h && !results.includes(h)) results.push(h);
  }
  // 2. Any hotel whose `area` field fuzzy-matches the neighborhood name.
  for (const h of allHotels) {
    if (results.includes(h)) continue;
    const hArea = normName(h.area);
    if (!hArea) continue;
    if (hArea === nName || hArea.includes(nName) || nName.includes(hArea)) {
      results.push(h);
    }
  }
  return results;
}

async function buildAreaPage(city, cityName, neighborhood, allHotels, allNeighborhoods) {
  const areaSlug = slugify(neighborhood.name);
  const slug = `${city}-${areaSlug}`;
  const outFile = path.join(ROOT, 'data/pseo/areas', `${slug}.json`);
  if (fs.existsSync(outFile)) { console.log(`· skip ${slug} (exists)`); return { skipped: true }; }

  const hotels = matchHotelsToArea(neighborhood, allHotels);
  const nearbyAreas = allNeighborhoods
    .filter(n => normName(n.name) !== normName(neighborhood.name))
    .map(n => n.name)
    .slice(0, 5);

  const paa = await getPAA(`staying in ${neighborhood.name} ${cityName}`);

  let res;
  try {
    res = await callGrokJson(buildPrompt(cityName, neighborhood, hotels, nearbyAreas, paa));
  } catch (e) {
    console.error(`✗ ${slug}:`, e.message);
    return { failed: true };
  }

  const out = {
    template: 'area-deep',
    citySlug: city,
    cityName,
    areaSlug,
    areaName: neighborhood.name,
    neighborhood,
    hotels,
    nearbyAreas,
    paaQuestions: paa,
    aiContent: res.data,
    lastUpdated: new Date().toISOString().slice(0, 10),
    generatedAt: new Date().toISOString(),
  };
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  console.log(`✓ ${slug}: ${hotels.length} hotels, ${paa.length} PAA, ${res.usage?.prompt_tokens}+${res.usage?.completion_tokens} tok`);
  return { built: true, tokensIn: res.usage?.prompt_tokens || 0, tokensOut: res.usage?.completion_tokens || 0 };
}

async function main() {
  const totals = { built: 0, skipped: 0, failed: 0, tokensIn: 0, tokensOut: 0 };
  const targets = ONLY ? CITIES.filter(c => c === ONLY || (ONLY.startsWith(c + '-'))) : CITIES;

  for (const city of targets) {
    const wts = JSON.parse(fs.readFileSync(path.join(ROOT, `data/clusters/${city}/where-to-stay.json`), 'utf8'));
    const hot = JSON.parse(fs.readFileSync(path.join(ROOT, `data/clusters/${city}/hotels.json`), 'utf8'));
    const cityName = wts.cityName;
    const neighborhoods = wts.neighborhoods || [];
    console.log(`\n--- ${city} (${neighborhoods.length} areas) ---`);

    for (const n of neighborhoods) {
      if (ONLY && ONLY.startsWith(city + '-') && slugify(n.name) !== ONLY.slice(city.length + 1)) continue;
      const r = await buildAreaPage(city, cityName, n, hot.hotels || [], neighborhoods);
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
