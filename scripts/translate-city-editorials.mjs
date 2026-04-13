#!/usr/bin/env node
// Translate data/city-editorials.json: add {nl: ...} next to each city.en
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
  defaultHeaders: { 'HTTP-Referer': 'https://go2-thailand.com', 'X-Title': 'go2thailand-editorials' },
});

const file = path.join(ROOT, 'data/city-editorials.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const entries = Object.entries(data).filter(([slug, v]) => v?.en && !v?.nl);
console.log(`${entries.length} city editorials need NL translation`);

const payload = entries.map(([slug, v], i) => ({ i, slug, t: v.en }));
const system = `You translate short city editorial blurbs (1-3 sentences) from English to natural, idiomatic Dutch for a Thailand travel website. Preserve place names. Output ONLY a JSON array: [{"i":0,"t":"..."}], no fences no preamble.`;
const resp = await client.chat.completions.create({
  model: 'x-ai/grok-4-fast', max_tokens: 16000, temperature: 0.3,
  messages: [
    { role: 'system', content: system },
    { role: 'user', content: `Translate each "t" field to Dutch. Return same JSON shape.\n${JSON.stringify(payload)}` },
  ],
});
let raw = resp.choices[0].message.content.replace(/^```(?:json)?\n?/, '').replace(/\n?```\s*$/, '').trim();
const parsed = JSON.parse(raw);
for (const p of parsed) {
  const [slug] = entries[p.i];
  data[slug].nl = p.t;
}
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log(`Done. Tokens: ${resp.usage.prompt_tokens}+${resp.usage.completion_tokens}`);
