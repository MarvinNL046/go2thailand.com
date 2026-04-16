#!/usr/bin/env node
/**
 * Neighborhood cluster enrichment.
 *
 * For each city, asks Grok 4 Fast to list the *additional* popular
 * neighborhoods we are currently missing from data/clusters/<city>/where-to-stay.json.
 * This fixes the PSEO scaling blind-spot: our hand-curated clusters stop at 6
 * areas per city, but a real nightlife/family/budget page needs 10-15 areas
 * (e.g. Bangkok is missing Thonglor, Ekkamai, Ari — all major hotspots).
 *
 * Anti-hallucination safeguards:
 *  - Grok must output a `sources` array per neighborhood (Wikipedia, official
 *    tourism site, TripAdvisor, Reddit travel thread) so we can audit claims.
 *  - `bestFor` must include ≥1 of our audience keywords so filter hits work.
 *  - We never overwrite existing neighborhoods, only append new ones, deduped
 *    by normalised name.
 *
 * Output: merges into the existing cluster file, bumps `lastUpdated`.
 *
 * Cost: ~2000 in + ~3000 out per city = $0.002 × 5 cities = $0.01 one-off.
 * Re-run monthly or when expanding to a new city.
 *
 * Usage:
 *   node scripts/enrich-neighborhoods.mjs                    # all cities
 *   node scripts/enrich-neighborhoods.mjs --only=bangkok     # single city
 *   node scripts/enrich-neighborhoods.mjs --dry-run          # don't write
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Load .env.local (same pattern as other pipeline scripts).
const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_KEY) { console.error('Missing OPENROUTER_API_KEY'); process.exit(1); }

const grok = new OpenAI({
  apiKey: OPENROUTER_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: { 'HTTP-Referer': 'https://go2-thailand.com', 'X-Title': 'go2thailand-enrich' },
});

const CITIES = ['bangkok', 'chiang-mai', 'phuket', 'krabi', 'koh-samui'];
const onlyArg = process.argv.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.slice(7) : null;
const DRY_RUN = process.argv.includes('--dry-run');

const norm = s => (s || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

function buildPrompt(cityName, existing) {
  return `You are enriching a travel-site neighborhood dataset for ${cityName}, Thailand.

We already have these ${existing.length} neighborhoods:
${existing.map((n, i) => `${i + 1}. ${n.name} — bestFor: ${n.bestFor}`).join('\n')}

TASK: List 4 to 8 ADDITIONAL popular neighborhoods/areas of ${cityName} that are well-known to travellers but are MISSING from our list. Prioritise:
- trendy nightlife/dining districts (e.g. in Bangkok: Thonglor, Ekkamai, Ari)
- family-friendly residential-but-visitable areas
- iconic budget/backpacker areas we may have mis-tagged
- any famous named streets/zones tourists ask for by name

Do NOT suggest areas we already have. Do NOT invent fictional names.

OUTPUT — strict JSON, no markdown fences:
{
  "added": [
    {
      "name": "<neighborhood/area name as tourists know it>",
      "description": "2-3 sentences, factual, what makes this area distinctive. No superlatives without justification.",
      "bestFor": "comma-separated traveller types. MUST include at least one of: first-time visitors, families, kids, nightlife, party, bars, rooftop bars, budget, backpackers, couples, honeymoon, foodies, digital nomads. Use verbatim these phrasings where applicable so our audience filter matches.",
      "priceLevel": "€ | €€ | €€€ | €–€€€ (mixed)",
      "highlights": ["3 to 5 concrete named landmarks, streets, or venues travellers would recognise"],
      "walkingScore": "Low | Medium | High",
      "transportNotes": ["1 to 3 short lines, e.g. BTS/MRT station names, taxi info"],
      "recommendedHotels": [],
      "sources": [
        { "sourceName": "Wikipedia | TAT Thailand | TripAdvisor | Travelfish | Reddit r/Thailand", "sourceUrl": "https://..." }
      ]
    }
  ]
}

ANTI-HALLUCINATION RULES:
- Each neighborhood MUST have at least one verifiable source URL (Wikipedia article, official tourism page, or well-known travel guide).
- Do not invent street names that don't exist.
- If you are not sure an area exists or is tourist-relevant, omit it.
- Keep descriptions factual — no marketing copy, no "vibrant" or "exotic".`;
}

async function callGrokJson(prompt) {
  const resp = await grok.chat.completions.create({
    model: 'x-ai/grok-4-fast',
    max_tokens: 4000,
    temperature: 0.3,
    messages: [
      { role: 'system', content: 'You output ONLY valid JSON matching the requested schema. No markdown fences. No preamble.' },
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

async function enrichCity(city) {
  const file = path.join(ROOT, 'data/clusters', city, 'where-to-stay.json');
  if (!fs.existsSync(file)) { console.log(`· skip ${city} (no cluster file)`); return; }

  const cluster = JSON.parse(fs.readFileSync(file, 'utf8'));
  const existing = cluster.neighborhoods || [];
  const existingSlugs = new Set(existing.map(n => norm(n.name)));

  console.log(`\n--- ${city} (${existing.length} existing) ---`);

  const { data, usage } = await callGrokJson(buildPrompt(cluster.cityName, existing));
  const proposed = Array.isArray(data.added) ? data.added : [];

  // Dedupe against existing + validate each has at least one source URL.
  const accepted = [];
  const rejected = [];
  for (const n of proposed) {
    const slug = norm(n.name);
    if (!n.name || !n.description || !n.bestFor) { rejected.push([n.name || '(unnamed)', 'missing required fields']); continue; }
    if (existingSlugs.has(slug)) { rejected.push([n.name, 'duplicate of existing']); continue; }
    const hasSource = Array.isArray(n.sources) && n.sources.some(s => s?.sourceUrl && /^https?:\/\//.test(s.sourceUrl));
    if (!hasSource) { rejected.push([n.name, 'no verifiable source URL']); continue; }
    existingSlugs.add(slug);
    accepted.push(n);
  }

  console.log(`  proposed: ${proposed.length} · accepted: ${accepted.length} · rejected: ${rejected.length}`);
  for (const [name, reason] of rejected) console.log(`    ✗ ${name} — ${reason}`);
  for (const n of accepted) console.log(`    ✓ ${n.name} — ${n.bestFor.slice(0, 70)}${n.bestFor.length > 70 ? '…' : ''}`);

  if (!DRY_RUN && accepted.length) {
    cluster.neighborhoods = [...existing, ...accepted];
    cluster.lastUpdated = new Date().toISOString().slice(0, 10);
    cluster.enrichmentLog = cluster.enrichmentLog || [];
    cluster.enrichmentLog.push({
      date: new Date().toISOString(),
      added: accepted.map(n => n.name),
      tokensIn: usage?.prompt_tokens, tokensOut: usage?.completion_tokens,
    });
    fs.writeFileSync(file, JSON.stringify(cluster, null, 2) + '\n');
    console.log(`  💾 wrote ${file} (now ${cluster.neighborhoods.length} neighborhoods)`);
  }

  return { accepted: accepted.length, tokensIn: usage?.prompt_tokens || 0, tokensOut: usage?.completion_tokens || 0 };
}

async function main() {
  const targets = ONLY ? [ONLY] : CITIES;
  const stats = { cities: 0, added: 0, tokIn: 0, tokOut: 0 };
  for (const city of targets) {
    try {
      const r = await enrichCity(city);
      if (r) { stats.cities++; stats.added += r.accepted; stats.tokIn += r.tokensIn; stats.tokOut += r.tokensOut; }
    } catch (e) {
      console.error(`✗ ${city}:`, e.message);
    }
  }
  const cost = (stats.tokIn / 1e6) * 0.2 + (stats.tokOut / 1e6) * 0.5;
  console.log(`\n=== DONE ===`);
  console.log(`Cities enriched: ${stats.cities} · Neighborhoods added: ${stats.added}`);
  console.log(`Tokens: ${stats.tokIn}+${stats.tokOut} ≈ $${cost.toFixed(4)}`);
  if (DRY_RUN) console.log(`(dry-run — no files written)`);
}

main().catch(e => { console.error(e); process.exit(1); });
