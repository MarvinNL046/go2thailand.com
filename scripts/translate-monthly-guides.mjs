#!/usr/bin/env node
// Translate data/monthly-guides.json to NL. Writes a parallel file
// data/monthly-guides.nl.json with the same structure but every translatable
// string replaced by its Dutch equivalent. Proper nouns, slugs, image paths,
// URLs, and numeric/date fields are preserved.
//
// The page loader (pages/thailand-in/[month].tsx) will be updated to read
// the locale-specific file when locale === 'nl'.

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
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: { 'HTTP-Referer': 'https://go2-thailand.com', 'X-Title': 'go2thailand-monthly-guides' },
});

const SKIP_KEYS = new Set(['slug','id','month','image','images','url','href','date','lat','lng','coordinates']);

const srcFile = path.join(ROOT, 'data/monthly-guides.json');
const outFile = path.join(ROOT, 'data/monthly-guides.nl.json');
const data = JSON.parse(fs.readFileSync(srcFile, 'utf8'));

function collect(o, p=[], out=[]) {
  if (typeof o === 'string') {
    const k = p[p.length-1];
    if (SKIP_KEYS.has(k)) return out;
    if (o.length < 2) return out;
    if (/^(https?:|mailto:|tel:|\/)/i.test(o)) return out;
    if (/^\d{4}-\d{2}-\d{2}/.test(o)) return out;
    out.push({ path: [...p], value: o });
  } else if (Array.isArray(o)) o.forEach((v,i)=>collect(v,[...p,i],out));
  else if (o && typeof o === 'object') {
    for (const k of Object.keys(o)) collect(o[k], [...p,k], out);
  }
  return out;
}

function setByPath(obj, p, value) {
  let cur = obj;
  for (let i = 0; i < p.length - 1; i++) cur = cur[p[i]];
  cur[p[p.length - 1]] = value;
}

const clone = JSON.parse(JSON.stringify(data));
const leaves = collect(clone);
console.log(`Collected ${leaves.length} translatable strings`);

const SYSTEM = `You translate Thailand travel monthly-guide content strings from English to natural, idiomatic Dutch. Keep proper nouns (Bangkok, Songkran, Thailand, etc.) unchanged. Convert USD to € equivalent when present (keep THB). Output ONLY a valid JSON array: [{"i":0,"t":"..."}, ...]. No fences, no preamble.`;

async function translateBatch(strings) {
  const payload = strings.map((s,i)=>({i, t:s.value}));
  const resp = await client.chat.completions.create({
    model: 'x-ai/grok-4-fast', max_tokens: 16000, temperature: 0.3,
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user', content: `Translate each "t" to Dutch. Return JSON only.\n${JSON.stringify(payload)}` },
    ],
  });
  let raw = resp.choices[0].message.content.replace(/^```(?:json)?\n?/, '').replace(/\n?```\s*$/, '').trim();
  let parsed;
  try { parsed = JSON.parse(raw); } catch {
    const m = raw.match(/\[[\s\S]*\]/); parsed = JSON.parse(m[0]);
  }
  if (!Array.isArray(parsed) || parsed.length !== strings.length) {
    throw new Error(`Length mismatch: ${parsed.length} vs ${strings.length}`);
  }
  const byIdx = new Map(parsed.map(o=>[o.i, o.t]));
  return {translations: strings.map((_,i)=>byIdx.get(i)), usage: resp.usage};
}

const BATCH = 100;
let totIn=0, totOut=0;
for (let i=0; i<leaves.length; i+=BATCH) {
  const batch = leaves.slice(i, i+BATCH);
  const {translations, usage} = await translateBatch(batch);
  batch.forEach((leaf, j) => setByPath(clone, leaf.path, translations[j]));
  totIn += usage.prompt_tokens; totOut += usage.completion_tokens;
  console.log(`batch ${Math.ceil((i+BATCH)/BATCH)}: ${batch.length} strings`);
}

fs.writeFileSync(outFile, JSON.stringify(clone, null, 2) + '\n');
const cost = (totIn/1e6)*0.2 + (totOut/1e6)*0.5;
console.log(`Wrote ${path.relative(ROOT, outFile)}`);
console.log(`Tokens ${totIn}+${totOut} ≈ $${cost.toFixed(4)}`);
