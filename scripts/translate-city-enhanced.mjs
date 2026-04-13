#!/usr/bin/env node
/**
 * Translate data/enhanced/<city>.json to Dutch and write to
 * data/enhanced/nl/<city>.json. Preserves full structure.
 *
 * Approach: collect all translatable string leaves with their paths, batch
 * them in a single Grok call, map translations back onto a cloned tree.
 *
 * Usage:
 *   node scripts/translate-city-enhanced.mjs --city bangkok
 *   node scripts/translate-city-enhanced.mjs --all
 *   node scripts/translate-city-enhanced.mjs --all --concurrency 3
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const argsPre = process.argv.slice(2);
const getPre = (f, d) => { const i = argsPre.indexOf(f); return i >= 0 ? argsPre[i + 1] : d; };
const SRC_DIR = path.join(ROOT, getPre('--src-dir', 'data/enhanced'));
const OUT_DIR = path.join(ROOT, getPre('--out-dir', 'data/enhanced/nl'));

// Load .env.local
const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

if (!process.env.OPENROUTER_API_KEY) {
  console.error('Missing OPENROUTER_API_KEY');
  process.exit(1);
}

const args = process.argv.slice(2);
const getArg = (flag, def) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : def; };
const all = args.includes('--all');
const cityArg = getArg('--city', null);
const concurrency = parseInt(getArg('--concurrency', '3'), 10);
const model = getArg('--model', 'x-ai/grok-4-fast');
const maxStringsPerBatch = parseInt(getArg('--batch-size', '150'), 10);

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://go2-thailand.com',
    'X-Title': 'go2thailand-city-translation',
  },
});

// Keys whose values should NEVER be translated (IDs, URLs, paths, timestamps, numbers)
const SKIP_KEYS = new Set([
  'id', 'slug', 'image', 'images', 'url', 'href', 'link',
  'coordinates', 'lat', 'lng', 'latitude', 'longitude',
  'population', 'date', 'created_at', 'updated_at',
  'enriched_at', 'enrichedAt', 'reviewed_at', 'factchecked_at', 'enhanced_at',
  'last_updated', 'lastUpdated',
  // Slug-like fields in top attractions etc
  'currency', 'timezone', 'country_code', 'iso_code',
]);

// Keys whose values are proper nouns that should be preserved (place names, hotel names)
// We still translate 'name' in bilingual mode but keep it identical for proper nouns.
// For plain-string 'name' in lists (e.g. hotel names), keep as-is.
const PRESERVE_NAME_KEYS = new Set(['name', 'venue', 'hotel', 'restaurant', 'brand', 'chain', 'author']);

function isLikelyUrl(s) {
  return /^(https?:\/\/|mailto:|tel:|\/images|\/_next|\/static)/i.test(s);
}
function isLikelyCoords(s) {
  return /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/.test(s);
}
function isLikelyDate(s) {
  return /^\d{4}-\d{2}-\d{2}(T|$)/.test(s);
}
function isNumericString(s) {
  return /^[\d.,\-\s+xXkKmM€$%THB]+$/.test(s) && s.length < 40;
}

/**
 * Walk tree, collect translatable strings.
 * Returns array of { path: string[], value: string }.
 * Path is an array of keys/indices so we can set back.
 */
function collectStrings(node, path = [], out = []) {
  if (typeof node === 'string') {
    const lastKey = path[path.length - 1];
    const parentKey = path[path.length - 2];
    if (SKIP_KEYS.has(lastKey)) return out;
    if (isLikelyUrl(node) || isLikelyCoords(node) || isLikelyDate(node) || isNumericString(node)) return out;
    if (node.length < 2) return out;
    // Preserve proper names in list items (e.g. hidden_gems[].name, top_hotels[].name)
    if (PRESERVE_NAME_KEYS.has(lastKey) && typeof parentKey === 'number') return out;
    out.push({ path: [...path], value: node });
  } else if (Array.isArray(node)) {
    node.forEach((item, i) => collectStrings(item, [...path, i], out));
  } else if (node && typeof node === 'object') {
    // Bilingual shortcut: {en: "...", nl: "..."}
    if ('en' in node && typeof node.en === 'string') {
      const parentKey = path[path.length - 1];
      // Still skip if parent key is in SKIP_KEYS
      if (!SKIP_KEYS.has(parentKey)) {
        if (!('nl' in node) || !node.nl || typeof node.nl !== 'string') {
          // Need to translate .en → .nl
          if (!PRESERVE_NAME_KEYS.has(parentKey) || typeof path[path.length - 2] !== 'number') {
            out.push({ path: [...path, 'nl'], value: node.en });
          }
        }
        // If nl already exists and is non-empty, keep it as-is
      }
      // Do NOT recurse into other locale keys (ja, ko, etc)
      return out;
    }
    for (const key of Object.keys(node)) {
      collectStrings(node[key], [...path, key], out);
    }
  }
  return out;
}

function setByPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
  cur[path[path.length - 1]] = value;
}

function getByPath(obj, path) {
  let cur = obj;
  for (const k of path) cur = cur?.[k];
  return cur;
}

const SYSTEM_PROMPT = `You translate Thailand-travel website content strings from English to natural, idiomatic Dutch.

You will receive a JSON array of strings with indices. Return the same array with each string translated.

DUTCH SEO RULES:
- Natural Dutch travel-writer voice. Not literal. Use "vakantie", "bezienswaardigheden", "gids", "tips", "reizen", "ervaring".
- Convert USD prices to € equivalent. Keep THB. Use NL number format (€1.500 not $1,500).
- Where relevant, mention "vanuit Nederland", Schiphol, KLM.

PRESERVE EXACTLY (in translation, do NOT modify):
- Proper nouns: hotel names, restaurant names, temple names, neighborhood names, dish names (Pad Thai, Som Tum, Tom Yum), place names (Bangkok, Chiang Mai, Sukhumvit, Lumpini, etc.)
- URLs, image paths, email addresses, phone numbers
- Thai words (e.g. soi, wat, khao, ao, koh)
- Numbers, dates, currency amounts (convert USD→€ only)

Output ONLY a valid JSON array in the same format: [{"i": 0, "t": "..."}, {"i": 1, "t": "..."}, ...].
No preamble, no code fences, no commentary.`;

async function translateBatch(strings) {
  const payload = strings.map((s, i) => ({ i, t: s.value }));
  const userMsg = `Translate the "t" field of each item from English to Dutch. Return valid JSON only.\n\n${JSON.stringify(payload)}`;

  const resp = await client.chat.completions.create({
    model,
    max_tokens: 32000,
    temperature: 0.3,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMsg },
    ],
  });
  let raw = resp.choices?.[0]?.message?.content || '';
  raw = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```\s*$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    const m = raw.match(/\[[\s\S]*\]/);
    if (!m) throw new Error(`Invalid JSON output (${raw.slice(0, 200)}...)`);
    parsed = JSON.parse(m[0]);
  }
  if (!Array.isArray(parsed)) throw new Error('Response is not an array');
  if (parsed.length !== strings.length) {
    throw new Error(`Length mismatch: got ${parsed.length}, expected ${strings.length}`);
  }
  // Map by index for safety
  const byIdx = new Map(parsed.map(o => [o.i, o.t]));
  return {
    translations: strings.map((_, i) => {
      const t = byIdx.get(i);
      if (typeof t !== 'string') throw new Error(`Missing translation for idx ${i}`);
      return t;
    }),
    inputTokens: resp.usage?.prompt_tokens || 0,
    outputTokens: resp.usage?.completion_tokens || 0,
  };
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function translateCity(slug) {
  const srcPath = path.join(SRC_DIR, `${slug}.json`);
  const outPath = path.join(OUT_DIR, `${slug}.json`);
  if (!fs.existsSync(srcPath)) throw new Error(`No source for ${slug}`);
  if (fs.existsSync(outPath)) return { slug, status: 'skipped' };

  const src = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
  const clone = JSON.parse(JSON.stringify(src));
  const strings = collectStrings(clone);

  if (!strings.length) {
    fs.writeFileSync(outPath, JSON.stringify(clone, null, 2) + '\n');
    return { slug, status: 'done', stringsTranslated: 0, inputTokens: 0, outputTokens: 0 };
  }

  const batches = chunk(strings, maxStringsPerBatch);
  let inTok = 0, outTok = 0;
  for (const batch of batches) {
    const { translations, inputTokens, outputTokens } = await translateBatch(batch);
    batch.forEach((s, i) => setByPath(clone, s.path, translations[i]));
    inTok += inputTokens;
    outTok += outputTokens;
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(clone, null, 2) + '\n');
  return { slug, status: 'done', stringsTranslated: strings.length, batches: batches.length, inputTokens: inTok, outputTokens: outTok };
}

async function pool(items, size, worker) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: size }, async () => {
    while (i < items.length) {
      const idx = i++;
      try {
        const r = await worker(items[idx]);
        results[idx] = r;
        console.log(`✓ [${idx + 1}/${items.length}] ${items[idx]} (strings=${r.stringsTranslated || 0}, batches=${r.batches || 0})`);
      } catch (e) {
        results[idx] = { slug: items[idx], status: 'error', error: e.message };
        console.error(`✗ [${idx + 1}/${items.length}] ${items[idx]}: ${e.message}`);
      }
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  let cities;
  if (cityArg) cities = [cityArg];
  else if (all) cities = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
  else { console.error('Pass --city <slug> or --all'); process.exit(1); }

  console.log(`Translating ${cities.length} cities with ${model} (concurrency ${concurrency})\n`);
  const start = Date.now();
  const results = await pool(cities, concurrency, translateCity);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  const done = results.filter(r => r?.status === 'done');
  const errors = results.filter(r => r?.status === 'error');
  const inTok = done.reduce((s, r) => s + (r.inputTokens || 0), 0);
  const outTok = done.reduce((s, r) => s + (r.outputTokens || 0), 0);
  const cost = (inTok / 1e6) * 0.2 + (outTok / 1e6) * 0.5;

  console.log(`\nDone: ${done.length}  Errors: ${errors.length}  Time: ${elapsed}s`);
  console.log(`Tokens: ${inTok.toLocaleString()} in / ${outTok.toLocaleString()} out  ≈ $${cost.toFixed(3)}`);
  if (errors.length) for (const e of errors) console.log(`  - ${e.slug}: ${e.error}`);
}

main().catch(e => { console.error(e); process.exit(1); });
