#!/usr/bin/env node
/**
 * PSEO Phase 1 page builder.
 *
 * Generates the data behind 35 new programmatic pages for go2-thailand.com:
 *  - /where-to-stay/[city]/[audience]   5 cities × 4 audiences = 20
 *  - /best-hotels/[city]/[category]     5 cities × 3 categories = 15
 *
 * Per page:
 *  1. Read the cluster source (data/clusters/<city>/where-to-stay.json or hotels.json)
 *  2. Filter neighborhoods/hotels matching the audience or category
 *  3. Ask SerpAPI Google for People Also Ask questions (1 SerpAPI call per page)
 *  4. Ask Grok 4.1 Fast to write a unique intro + decision support + FAQ
 *  5. Save the resulting JSON to data/pseo/<template>/<city>-<facet>.json
 *
 * The Next.js page templates read these JSON files at build/ISR time, so
 * the runtime cost stays at zero.
 *
 * Budget: 35 SerpAPI calls (well under monthly 250 limit when topic-discovery
 * is also running) + 35 Grok calls (~$0.20 total).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Load .env.local
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
  defaultHeaders: { 'HTTP-Referer': 'https://go2-thailand.com', 'X-Title': 'go2thailand-pseo' },
});

// -------------------------------------------------------------------
// Configuration — fase 1 cities × facets
// -------------------------------------------------------------------

const CITIES = ['bangkok', 'chiang-mai', 'phuket', 'krabi', 'koh-samui'];

// Audience → keywords used to match each neighborhood's bestFor text.
const AUDIENCES = {
  'first-time': ['first-time', 'first timer', 'first time', 'first-timers', 'tourist hub', 'central', 'easy to navigate', 'beginner'],
  family: ['family', 'families', 'kids', 'children', 'playground', 'kid-friendly'],
  nightlife: ['nightlife', 'night life', 'party', 'bars', 'bar', 'clubs', 'rooftop bar', 'live music', 'pub', 'khao san', 'patpong', 'bangla', 'walking street'],
  budget: ['budget', 'backpacker', 'backpackers', 'cheap', 'affordable', 'hostel', 'low-cost'],
  couples: ['couples', 'couple', 'romantic', 'honeymoon', 'honeymoons', 'honeymooners', 'anniversary', 'intimate', 'adults-only', 'boutique'],
};

// Category → keywords applied to hotel.category and (for niche ones)
// to highlights/area text. "budget" / "luxury" are direct category matches.
// "beachfront" only makes sense for coastal cities.
const CATEGORIES = {
  budget: { type: 'category', value: 'budget' },
  luxury: { type: 'category', value: 'luxury' },
  beachfront: { type: 'keyword', cities: ['phuket', 'krabi', 'koh-samui'], keywords: ['beach', 'beachfront', 'sea view', 'seafront'] },
};

// -------------------------------------------------------------------
// SerpAPI — People Also Ask helper
// -------------------------------------------------------------------

// PAA helper — prefers BrightData SERP zone (17× cheaper), falls back to SerpAPI.com.
async function getPeopleAlsoAsk(query) {
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
        return (data.people_also_ask || []).map(q => q.question).filter(Boolean).slice(0, 6);
      }
    } catch (e) { console.warn(`[pseo] BrightData PAA failed for "${query}":`, e.message); }
  }
  if (!SERPAPI_KEY) return [];
  try {
    const params = new URLSearchParams({ engine: 'google', q: query, hl: 'en', gl: 'us', api_key: SERPAPI_KEY });
    const res = await fetch(`https://serpapi.com/search.json?${params}`);
    if (!res.ok) throw new Error(`SerpAPI ${res.status}`);
    const data = await res.json();
    return (data.related_questions || []).slice(0, 6).map(q => q.question).filter(Boolean);
  } catch (e) {
    console.warn(`[pseo] PAA fetch failed for "${query}":`, e.message);
    return [];
  }
}

// -------------------------------------------------------------------
// Filtering helpers
// -------------------------------------------------------------------

function matchesAudience(neighborhood, audienceKeywords) {
  // Match across every free-text field, not just bestFor — editorial tags
  // often miss obvious intents (e.g. Khao San = budget only in tags, but
  // its description mentions bars, live music, Khao San Road = nightlife).
  const haystack = [
    neighborhood.name,
    neighborhood.bestFor,
    neighborhood.description,
    (neighborhood.highlights || []).join(' '),
    (neighborhood.transportNotes || []).join(' '),
  ].filter(Boolean).join(' ').toLowerCase();
  return audienceKeywords.some(k => haystack.includes(k));
}

function matchesCategory(hotel, def) {
  if (def.type === 'category') return (hotel.category || '').toLowerCase() === def.value;
  if (def.type === 'keyword') {
    const hay = (
      (hotel.area || '') + ' ' +
      (hotel.description || '') + ' ' +
      (hotel.highlights || []).join(' ') + ' ' +
      (hotel.name || '')
    ).toLowerCase();
    return def.keywords.some(k => hay.includes(k));
  }
  return false;
}

// -------------------------------------------------------------------
// Grok prompts
// -------------------------------------------------------------------

function buildAudiencePrompt(city, cityName, audience, neighborhoods, paaQuestions) {
  const audienceLabel = audience.replace(/-/g, ' ');
  const month = new Date().toISOString().slice(0,7);
  return `You write programmatic-SEO travel content for go2-thailand.com.

TASK: Write the unique-angle text for a page titled "Where to stay in ${cityName} for ${audienceLabel} travellers (2026)".

Reference data — these neighborhoods all rate well for this audience (use their names verbatim):
${neighborhoods.map((n, i) => `${i + 1}. ${n.name}: ${n.description.slice(0, 220)} | bestFor: ${n.bestFor} | priceLevel: ${n.priceLevel}`).join('\n')}

People Also Ask (real Google PAA — answer the closest 4 in the FAQ):
${paaQuestions.length ? paaQuestions.map(q => '- ' + q).join('\n') : '(none returned)'}

CONSTRAINT DEFINITIONS — apply consistently:
- walkability: "High" = most attractions, food, transport within 10–15 min walk. "Medium" = mix of walking + short taxi/tuk-tuk rides. "Low" = requires frequent transport.
- priceBand: "€" = budget / hostels / cheap hotels (<€40 dbl). "€€" = mid-range (€40–€110 dbl). "€€€" = luxury / high-end (>€110 dbl).
- vibe: pick from {lively, buzzing, laid-back, quiet, traditional, modern, touristy, local} — max 2 words.

OUTPUT — strict JSON with these fields, no markdown fences, no preamble:
{
  "hookIntro": "1 sentence problem-opener. Pattern: 'Picking the wrong ${cityName} neighbourhood as a ${audienceLabel} traveller can [bad outcome] — most travellers [common pitfall].' Concrete.",
  "intro": "2 sentences. The single most important factor for ${audienceLabel} when picking a ${cityName} area + what we ranked on.",
  "quickAnswers": [
    { "label": "Best overall", "name": "<from list>", "why": "max 8 words" },
    { "label": "Best value", "name": "<from list>", "why": "max 8 words" },
    { "label": "<3rd angle SPECIFIC to ${audienceLabel} — NEVER 'Best for couples' on a family/nightlife/budget page. For nightlife: 'Best for rooftop bars' or 'Best for late-night eats'. For family: 'Best for young kids' or 'Best for families with teens'. For budget: 'Best for solo travellers' or 'Best for backpackers'. For first-time: 'Most central' or 'Best for sightseeing'. Pick whatever genuinely fits ${audienceLabel}.>", "name": "<from list>", "why": "max 8 words" }
  ],
  "urgencyLine": "1 sentence urgency hook. Example: 'Hotel prices in central ${cityName} spike during festivals — book popular areas 2–3 months ahead.' Specific to ${cityName} + ${audienceLabel}.",
  "comparisonTable": [
    { "name": "<neighborhood name verbatim>", "bestFor": "<3-5 word phrase>", "priceBand": "€ | €€ | €€€", "walkability": "Low | Medium | High", "vibe": "<2 words>", "drawback": "<honest negative, max 8 words>" }
  ],
  "decisionGuide": [
    "4-6 'If X → choose Y' shortcuts that map a traveller's main need to one of the listed neighborhoods.",
    "Example phrasing: 'If you want nightlife and easy transport, choose Sukhumvit.'",
    "'If you are on a tight budget, avoid central X and consider Y.'",
    "Each line must reference a neighborhood from the reference data verbatim."
  ],
  "ranking": [
    {
      "rank": 1,
      "name": "<verbatim>",
      "why": "1-2 sentences. Imply the trade-off vs the runners-up — why this beats #2 for ${audienceLabel}.",
      "drawback": "1 sentence honest negative",
      "skipIf": "1 sentence starting with 'Skip if' — the specific traveller type or situation that should NOT book here.",
      "localSignals": ["EXACTLY 3 concrete locator facts a traveller would Google: nearest BTS/MRT station + walking minutes, typical Grab taxi cost from Suvarnabhumi/airport, distance to the area's main attraction or street. Use real station/street names from the reference data."],
      "travellerNote": "1-2 sentences aggregating what travellers commonly praise AND commonly complain about this area. Phrase as 'Travellers often praise X but note Y'. No direct quote marks, no fake user names, no invented specifics. Base on widely-known discourse only."
    },
    { "rank": 2, "name": "<verbatim>", "why": "...", "drawback": "...", "skipIf": "...", "localSignals": ["...", "...", "..."], "travellerNote": "..." },
    { "rank": 3, "name": "<verbatim>", "why": "...", "drawback": "...", "skipIf": "...", "localSignals": ["...", "...", "..."], "travellerNote": "..." }
  ],
  "topPick": "The single neighborhood name from rank 1.",
  "topPickReason": "1 sentence why.",
  "bookingTips": [
    "4 to 6 actionable, ${cityName}-specific tips. Cover: ideal lead time, transport from airport to this area (BTS/Grab/taxi), what to avoid (overpriced streets, scam zones, noisy blocks), seasonal warnings, room-type advice. Concrete and specific — no generic travel platitudes."
  ],
  "methodology": "2-3 sentences. Use phrasing like: 'We compared ${cityName} neighbourhoods based on walkability, price level, transport access, and suitability for ${audienceLabel}. We weighted [factor] highest because [reason]. Rankings reflect cluster data plus typical ${audienceLabel} priorities.' End with: 'Last updated: ${month}.'",
  "internalLinks": [
    "/best-hotels/${city}/",
    "/areas/${city}/<top-pick-slug>/",
    "/where-to-stay/${city}/",
    "/city/${city}/"
  ],
  "ctaPlacements": [
    "after-intro: 'Compare hotels in ${cityName}'",
    "after-comparison-table: 'See hotels in these areas'",
    "after-top-pick: 'View hotels in <topPick>'"
  ],
  "faq": [
    {"q": "<prefer a PAA question>", "a": "1-2 sentences max. Include a clear recommendation when possible. Reflect ${audienceLabel} intent. No generic travel phrasing ('Thailand is amazing'). 4-6 entries total."}
  ],
  "metaTitle": "Format: 'Where to Stay in ${cityName} for ${audienceLabel.charAt(0).toUpperCase() + audienceLabel.slice(1)} (2026)' — keep under 60 chars, shorten if needed.",
  "metaDescription": "140-155 chars. Include: city + audience + 1 concrete benefit + 1 soft CTA ('compare areas', 'see picks'). No clickbait."
}

ANTI-HALLUCINATION:
- Never invent hotel names, restaurant names, venue names, prices, or statistics not present in the reference data.
- Use general well-known ${cityName} facts only — when unsure, write "varies" or omit.
- If reference data is weak: stay at area-level insight, generalise carefully using known ${cityName} patterns, do NOT fill gaps with invented detail.
- All neighborhood names must come verbatim from the reference data.`;
}

function buildCategoryPrompt(city, cityName, category, hotels, paaQuestions) {
  const month = new Date().toISOString().slice(0,7);
  const Cat = category.charAt(0).toUpperCase() + category.slice(1);
  return `You write programmatic-SEO travel content for go2-thailand.com.

TASK: Write the unique-angle text for a page titled "Best ${category} hotels in ${cityName} (2026)".

Reference data — these are the ${category} hotels we have:
${hotels.map((h, i) => `${i + 1}. ${h.name} (${h.area || 'unknown area'}) — ${h.priceRange || 'price n/a'} — ${h.description.slice(0, 220)}`).join('\n')}

People Also Ask:
${paaQuestions.length ? paaQuestions.map(q => '- ' + q).join('\n') : '(none returned)'}

CONSTRAINT DEFINITIONS — apply consistently:
- priceBand: "€" = budget (<€40 dbl). "€€" = mid-range (€40–€110 dbl). "€€€" = luxury (>€110 dbl). Map from the priceRange field above.
- standout: ONE clear differentiator: pool / spa / rooftop bar / beach access / location / breakfast / service / design.
- bestFor: 3-5 word traveler segment ('Couples seeking quiet', 'Families with kids', 'Solo digital nomads').

OUTPUT — strict JSON, no markdown fences:
{
  "hookIntro": "1 sentence problem-opener. Pattern: 'Choosing the wrong ${category} hotel in ${cityName} can [bad outcome] — many \"${category}\" hotels [common pitfall].' Concrete, not generic.",
  "intro": "2 sentences. The single biggest mistake travellers make booking ${category} in ${cityName} + what we ranked these on.",
  "quickAnswers": [
    { "label": "Best overall", "name": "<from list>", "why": "max 8 words" },
    { "label": "Best value", "name": "<from list>", "why": "max 8 words" },
    { "label": "<angle 1 SPECIFIC to ${category} — e.g. 'Best pool' for luxury, 'Best for solo' for budget, 'Best for couples' for beachfront. Do NOT use 'Best luxury' on a luxury page (circular) or 'Best for families' on a budget page unless you actually have a family-friendly budget option.>", "name": "<from list>", "why": "max 8 words" },
    { "label": "<angle 2 SPECIFIC to ${category}>", "name": "<from list>", "why": "max 8 words (omit row if no good fit)" }
  ],
  "urgencyLine": "1 sentence urgency hook. Example: 'Prices for ${category} hotels in ${cityName} can double during high season (Nov–Feb) — check availability early.' Be specific to ${cityName}.",
  "comparisonTable": [
    { "name": "<hotel name verbatim>", "area": "<area>", "priceBand": "€ | €€ | €€€", "bestFor": "<3-5 word phrase>", "standout": "<one clear differentiator>", "drawback": "<honest negative, max 8 words>" }
  ],
  "decisionGuide": [
    "4-6 'If X → choose Y' shortcuts. Example: 'If you want a beachfront pool with kids, choose <hotel>.' / 'If you want quiet luxury away from the crowds, choose <hotel>.' / 'If you are travelling on a tight budget but want central location, consider <hotel>.'",
    "Each line must reference a hotel from the reference data verbatim."
  ],
  "ranking": [
    {
      "rank": 1,
      "name": "<verbatim>",
      "why": "1-2 sentences. Imply the trade-off vs runners-up — why this beats #2 for ${category} travellers.",
      "drawback": "1 sentence honest negative",
      "skipIf": "1 sentence starting with 'Skip if' — the specific traveller type or situation that should NOT book this hotel.",
      "localSignals": ["EXACTLY 3 concrete facts a traveller would Google about THIS hotel: distance + walking minutes to the main beach/area, airport transfer time (or mention if free transfer is included), one concrete on-property detail (room types, pool count, notable restaurant). Use hotel-specific facts from the reference data, never invent."],
      "travellerNote": "1-2 sentences aggregating what guests commonly praise AND commonly complain about in public reviews (Booking/Agoda/TripAdvisor general sentiment). Phrase as 'Guests often praise X but note Y'. No direct quote marks, no fake reviewer names, no invented review scores."
    },
    { "rank": 2, "name": "<verbatim>", "why": "...", "drawback": "...", "skipIf": "...", "localSignals": ["...", "...", "..."], "travellerNote": "..." },
    { "rank": 3, "name": "<verbatim>", "why": "...", "drawback": "...", "skipIf": "...", "localSignals": ["...", "...", "..."], "travellerNote": "..." }
  ],
  "topPick": "The single hotel name from rank 1.",
  "topPickReason": "1 sentence why.",
  "bookingTips": [
    "4 to 6 actionable, ${cityName}-specific tips for booking ${category} hotels: ideal lead time, which platform tends to be cheapest (Booking vs Agoda for Thailand), when prices spike (Songkran, Chinese New Year, high season), red flags (no review history, unrealistic discounts), room-type advice (sea view vs garden view trade-off)."
  ],
  "methodology": "2-3 sentences. Use phrasing like: 'We compared ${category} hotels in ${cityName} based on guest reviews, location quality, value at this price band, and what ${category} travellers typically prioritise. We weighted [factor] highest because [reason]. Prices and availability change — always verify current rates before booking.' End with: 'Last updated: ${month}.'",
  "internalLinks": [
    "/best-hotels/${city}/",
    "/where-to-stay/${city}/",
    "/city/${city}/"
  ],
  "ctaPlacements": [
    "after-intro: 'Check ${category} hotel rates'",
    "after-comparison-table: 'Compare these hotels'",
    "after-top-pick: 'View <topPick>'"
  ],
  "faq": [
    {"q": "<prefer a PAA question>", "a": "1-2 sentences max. Include a clear recommendation when possible. Reflect ${category}-traveller intent. No generic phrasing. 4-6 entries total."}
  ],
  "metaTitle": "Format: 'Best ${Cat} Hotels in ${cityName} (2026)' — under 60 chars, shorten if needed.",
  "metaDescription": "140-155 chars. Include: city + ${category} + 1 concrete benefit + 1 soft CTA ('compare picks', 'see rates'). No clickbait."
}

ANTI-HALLUCINATION:
- Never invent hotels not in the reference list, never invent specific prices not in the data, no fake reviews/quotes/star ratings.
- All hotel names must come verbatim from the reference data.
- If reference data is weak: stay at category-level insight, do NOT fill gaps with invented hotel details.`;
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
- trade-offs (why one option over another)
- clear recommendations (no fence-sitting)
- decision shortcuts (if X then Y)` },
      { role: 'user', content: prompt },
    ],
  });
  let raw = (resp.choices[0]?.message?.content || '').trim();
  raw = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```\s*$/, '').trim();
  // Some models still wrap in code fences inside the body — try to extract
  // the first {...} block as a fallback.
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch (_) {
    const m = raw.match(/\{[\s\S]*\}$/);
    if (!m) throw new Error(`Bad JSON from Grok: ${raw.slice(0, 200)}`);
    parsed = JSON.parse(m[0]);
  }
  return { data: parsed, usage: resp.usage };
}

// -------------------------------------------------------------------
// Per-page builders
// -------------------------------------------------------------------

const stats = { built: 0, skipped: 0, failed: 0, tokensIn: 0, tokensOut: 0, serpCalls: 0 };

async function buildAudiencePage(city, audienceKey) {
  const slug = `${city}-${audienceKey}`;
  const outFile = path.join(ROOT, 'data/pseo/where-to-stay', `${slug}.json`);
  if (fs.existsSync(outFile)) { console.log(`· skip ${slug} (exists)`); stats.skipped++; return; }

  const cluster = JSON.parse(fs.readFileSync(path.join(ROOT, `data/clusters/${city}/where-to-stay.json`), 'utf8'));
  const cityName = cluster.cityName;

  const matched = cluster.neighborhoods.filter(n => matchesAudience(n, AUDIENCES[audienceKey]));
  if (matched.length < 2) {
    console.log(`✗ skip ${slug} — only ${matched.length} matching neighborhoods (need ≥2)`);
    stats.skipped++;
    return;
  }

  const paa = await getPeopleAlsoAsk(`where to stay in ${cityName} for ${audienceKey.replace('-', ' ')} travellers`);
  if (paa.length) stats.serpCalls++;

  const prompt = buildAudiencePrompt(city, cityName, audienceKey, matched, paa);
  let res;
  try { res = await callGrokJson(prompt); }
  catch (e) { console.error(`✗ ${slug} grok failed:`, e.message); stats.failed++; return; }

  stats.tokensIn += res.usage?.prompt_tokens || 0;
  stats.tokensOut += res.usage?.completion_tokens || 0;

  const out = {
    template: 'where-to-stay-audience',
    citySlug: city,
    cityName,
    audience: audienceKey,
    neighborhoods: matched,
    paaQuestions: paa,
    aiContent: res.data,
    lastUpdated: cluster.lastUpdated || new Date().toISOString().slice(0, 10),
    generatedAt: new Date().toISOString(),
  };
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  console.log(`✓ ${slug}: ${matched.length} neighborhoods, ${paa.length} PAA, ${res.usage?.prompt_tokens}+${res.usage?.completion_tokens} tok`);
  stats.built++;
}

async function buildCategoryPage(city, categoryKey) {
  const def = CATEGORIES[categoryKey];
  if (def.cities && !def.cities.includes(city)) {
    // e.g. beachfront is skipped for Bangkok / Chiang Mai
    return;
  }
  const slug = `${city}-${categoryKey}`;
  const outFile = path.join(ROOT, 'data/pseo/best-hotels', `${slug}.json`);
  if (fs.existsSync(outFile)) { console.log(`· skip ${slug} (exists)`); stats.skipped++; return; }

  const cluster = JSON.parse(fs.readFileSync(path.join(ROOT, `data/clusters/${city}/hotels.json`), 'utf8'));
  const cityName = cluster.cityName;

  const matched = cluster.hotels.filter(h => matchesCategory(h, def));
  if (matched.length < 2) {
    console.log(`✗ skip ${slug} — only ${matched.length} matching hotels (need ≥2)`);
    stats.skipped++;
    return;
  }

  const paa = await getPeopleAlsoAsk(`best ${categoryKey} hotels in ${cityName}`);
  if (paa.length) stats.serpCalls++;

  const prompt = buildCategoryPrompt(city, cityName, categoryKey, matched, paa);
  let res;
  try { res = await callGrokJson(prompt); }
  catch (e) { console.error(`✗ ${slug} grok failed:`, e.message); stats.failed++; return; }

  stats.tokensIn += res.usage?.prompt_tokens || 0;
  stats.tokensOut += res.usage?.completion_tokens || 0;

  const out = {
    template: 'best-hotels-category',
    citySlug: city,
    cityName,
    category: categoryKey,
    hotels: matched,
    paaQuestions: paa,
    aiContent: res.data,
    lastUpdated: cluster.lastUpdated || new Date().toISOString().slice(0, 10),
    generatedAt: new Date().toISOString(),
  };
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  console.log(`✓ ${slug}: ${matched.length} hotels, ${paa.length} PAA, ${res.usage?.prompt_tokens}+${res.usage?.completion_tokens} tok`);
  stats.built++;
}

// -------------------------------------------------------------------
// Driver
// -------------------------------------------------------------------

async function main() {
  // Optional: --only=<city>-<facet> to build a single page for testing.
  const onlyArg = process.argv.find(a => a.startsWith('--only='));
  const only = onlyArg ? onlyArg.slice('--only='.length) : null;

  console.log(`PSEO build fase 1 — ${CITIES.length} cities × (${Object.keys(AUDIENCES).length} audiences + ${Object.keys(CATEGORIES).length} categories)${only ? ` [filter: ${only}]` : ''}\n`);

  for (const city of CITIES) {
    console.log(`\n--- ${city} (where-to-stay) ---`);
    for (const aud of Object.keys(AUDIENCES)) {
      if (only && only !== `${city}-${aud}`) continue;
      await buildAudiencePage(city, aud);
    }
    console.log(`\n--- ${city} (best-hotels) ---`);
    for (const cat of Object.keys(CATEGORIES)) {
      if (only && only !== `${city}-${cat}`) continue;
      await buildCategoryPage(city, cat);
    }
  }

  const cost = (stats.tokensIn / 1e6) * 0.2 + (stats.tokensOut / 1e6) * 0.5;
  console.log(`\n=== DONE ===`);
  console.log(`Built: ${stats.built}  Skipped: ${stats.skipped}  Failed: ${stats.failed}`);
  console.log(`Tokens: ${stats.tokensIn}+${stats.tokensOut}  ≈ $${cost.toFixed(3)}`);
  console.log(`SerpAPI calls: ${stats.serpCalls} (free-tier budget: 250/month)`);
}

main().catch(e => { console.error(e); process.exit(1); });
