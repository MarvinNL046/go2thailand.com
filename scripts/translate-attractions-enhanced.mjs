#!/usr/bin/env node
/**
 * Translate data/enhanced/attractions/<city>/<slug>.json to Dutch.
 * Output: data/enhanced/attractions/nl/<city>/<slug>.json
 *
 * Reuses the walking + batching logic from translate-city-enhanced.mjs,
 * adapted for the nested directory structure.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'data/enhanced/attractions');
const OUT_ROOT = path.join(ROOT, 'data/enhanced/attractions/nl');

const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
if (!process.env.OPENROUTER_API_KEY) { console.error('Missing OPENROUTER_API_KEY'); process.exit(1); }

const args = process.argv.slice(2);
const getArg = (flag, def) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : def; };
const concurrency = parseInt(getArg('--concurrency', '5'), 10);
const model = getArg('--model', 'x-ai/grok-4-fast');
const maxStringsPerBatch = parseInt(getArg('--batch-size', '150'), 10);
const limit = getArg('--limit') ? parseInt(getArg('--limit'), 10) : Infinity;

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://go2-thailand.com',
    'X-Title': 'go2thailand-attraction-translation',
  },
});

const SKIP_KEYS = new Set([
  'id', 'slug', 'image', 'images', 'url', 'href', 'link',
  'coordinates', 'lat', 'lng', 'latitude', 'longitude',
  'population', 'date', 'created_at', 'updated_at',
  'enriched_at', 'enrichedAt', 'reviewed_at', 'factchecked_at', 'enhanced_at',
  'last_updated', 'lastUpdated', 'currency', 'timezone', 'country_code', 'iso_code',
  'city_slug', 'city', 'province_slug',
]);
const PRESERVE_NAME_KEYS = new Set(['name', 'venue', 'hotel', 'restaurant', 'brand', 'chain', 'author']);

function isLikelyUrl(s) { return /^(https?:\/\/|mailto:|tel:|\/images|\/_next|\/static)/i.test(s); }
function isLikelyCoords(s) { return /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/.test(s); }
function isLikelyDate(s) { return /^\d{4}-\d{2}-\d{2}(T|$)/.test(s); }
function isNumericString(s) { return /^[\d.,\-\s+xXkKmM€$%THB]+$/.test(s) && s.length < 40; }

function collectStrings(node, pathArr = [], out = []) {
  if (typeof node === 'string') {
    const lastKey = pathArr[pathArr.length - 1];
    const parentKey = pathArr[pathArr.length - 2];
    if (SKIP_KEYS.has(lastKey)) return out;
    if (isLikelyUrl(node) || isLikelyCoords(node) || isLikelyDate(node) || isNumericString(node)) return out;
    if (node.length < 2) return out;
    if (PRESERVE_NAME_KEYS.has(lastKey) && typeof parentKey === 'number') return out;
    out.push({ path: [...pathArr], value: node });
  } else if (Array.isArray(node)) {
    node.forEach((item, i) => collectStrings(item, [...pathArr, i], out));
  } else if (node && typeof node === 'object') {
    if ('en' in node && typeof node.en === 'string') {
      const parentKey = pathArr[pathArr.length - 1];
      if (!SKIP_KEYS.has(parentKey)) {
        if (!('nl' in node) || !node.nl || typeof node.nl !== 'string') {
          if (!PRESERVE_NAME_KEYS.has(parentKey) || typeof pathArr[pathArr.length - 2] !== 'number') {
            out.push({ path: [...pathArr, 'nl'], value: node.en });
          }
        }
      }
      return out;
    }
    for (const key of Object.keys(node)) collectStrings(node[key], [...pathArr, key], out);
  }
  return out;
}

function setByPath(obj, p, value) {
  let cur = obj;
  for (let i = 0; i < p.length - 1; i++) cur = cur[p[i]];
  cur[p[p.length - 1]] = value;
}

const SYSTEM_PROMPT = `You translate Thailand-travel website attraction descriptions from English to natural, idiomatic Dutch.

You will receive a JSON array of strings with indices. Return the same array with each string translated.

DUTCH SEO RULES:
- Natural Dutch travel-writer voice. Not literal. Use "vakantie", "bezienswaardigheden", "gids", "tips", "ervaring", "beleef".
- Convert USD prices to € equivalent. Keep THB. Use NL number format (€1.500 not $1,500).

PRESERVE EXACTLY:
- Proper nouns: attraction names, temple names, neighborhood names, dish names (Pad Thai, Som Tum), place names (Bangkok, Chiang Mai, Sukhumvit, Wat Phra Kaew).
- Thai words (soi, wat, khao, ao, koh).
- URLs, image paths, numbers, dates, coordinates.

Output ONLY a valid JSON array: [{"i": 0, "t": "..."}, ...]. No preamble, no code fences.`;

async function translateBatch(strings) {
  const payload = strings.map((s, i) => ({ i, t: s.value }));
  const resp = await client.chat.completions.create({
    model, max_tokens: 32000, temperature: 0.3,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Translate the "t" field of each item from English to Dutch. Return valid JSON only.\n\n${JSON.stringify(payload)}` },
    ],
  });
  let raw = resp.choices?.[0]?.message?.content || '';
  raw = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```\s*$/, '').trim();
  let parsed;
  try { parsed = JSON.parse(raw); } catch {
    const m = raw.match(/\[[\s\S]*\]/);
    if (!m) throw new Error(`Invalid JSON (${raw.slice(0,200)})`);
    parsed = JSON.parse(m[0]);
  }
  if (!Array.isArray(parsed) || parsed.length !== strings.length) {
    throw new Error(`Length mismatch: got ${parsed.length}, expected ${strings.length}`);
  }
  const byIdx = new Map(parsed.map(o => [o.i, o.t]));
  return {
    translations: strings.map((_, i) => { const t = byIdx.get(i); if (typeof t !== 'string') throw new Error(`Missing ${i}`); return t; }),
    inputTokens: resp.usage?.prompt_tokens || 0,
    outputTokens: resp.usage?.completion_tokens || 0,
  };
}

function chunk(arr, size) { const out = []; for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size)); return out; }

function findAttractionFiles() {
  const files = [];
  for (const cityDir of fs.readdirSync(SRC_DIR)) {
    if (cityDir === 'nl') continue;
    const full = path.join(SRC_DIR, cityDir);
    if (!fs.statSync(full).isDirectory()) continue;
    for (const f of fs.readdirSync(full)) {
      if (!f.endsWith('.json')) continue;
      if (f === 'index.json') continue;
      files.push({ city: cityDir, slug: f.replace('.json', ''), srcPath: path.join(full, f) });
    }
  }
  return files;
}

async function translateFile(file) {
  const outPath = path.join(OUT_ROOT, file.city, `${file.slug}.json`);
  if (fs.existsSync(outPath)) return { ...file, status: 'skipped' };
  const src = JSON.parse(fs.readFileSync(file.srcPath, 'utf8'));
  const clone = JSON.parse(JSON.stringify(src));
  const strings = collectStrings(clone);
  if (!strings.length) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(clone, null, 2) + '\n');
    return { ...file, status: 'done', stringsTranslated: 0, inputTokens: 0, outputTokens: 0 };
  }
  const batches = chunk(strings, maxStringsPerBatch);
  let inTok = 0, outTok = 0;
  for (const batch of batches) {
    const { translations, inputTokens, outputTokens } = await translateBatch(batch);
    batch.forEach((s, i) => setByPath(clone, s.path, translations[i]));
    inTok += inputTokens; outTok += outputTokens;
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(clone, null, 2) + '\n');
  return { ...file, status: 'done', stringsTranslated: strings.length, inputTokens: inTok, outputTokens: outTok };
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
        if (idx % 10 === 0 || r.status === 'error') {
          console.log(`[${idx + 1}/${items.length}] ${r.city}/${r.slug} ${r.status} strings=${r.stringsTranslated || 0}`);
        }
      } catch (e) {
        results[idx] = { ...items[idx], status: 'error', error: e.message };
        console.error(`✗ [${idx + 1}/${items.length}] ${items[idx].city}/${items[idx].slug}: ${e.message}`);
      }
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  fs.mkdirSync(OUT_ROOT, { recursive: true });
  const allFiles = findAttractionFiles();
  const files = allFiles.slice(0, limit);
  console.log(`Translating ${files.length}/${allFiles.length} attractions with ${model} (concurrency ${concurrency})\n`);
  const start = Date.now();
  const results = await pool(files, concurrency, translateFile);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const done = results.filter(r => r?.status === 'done');
  const skipped = results.filter(r => r?.status === 'skipped');
  const errors = results.filter(r => r?.status === 'error');
  const inTok = done.reduce((s, r) => s + (r.inputTokens || 0), 0);
  const outTok = done.reduce((s, r) => s + (r.outputTokens || 0), 0);
  const cost = (inTok / 1e6) * 0.2 + (outTok / 1e6) * 0.5;
  console.log(`\nDone: ${done.length}  Skipped: ${skipped.length}  Errors: ${errors.length}  Time: ${elapsed}s`);
  console.log(`Tokens: ${inTok.toLocaleString()} in / ${outTok.toLocaleString()} out  ≈ $${cost.toFixed(3)}`);
  if (errors.length) for (const e of errors) console.log(`  - ${e.city}/${e.slug}: ${e.error}`);
}

main().catch(e => { console.error(e); process.exit(1); });
