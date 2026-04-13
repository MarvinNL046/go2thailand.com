#!/usr/bin/env node
/**
 * Compare 4 LLMs on the same 5 untranslated blog posts via OpenRouter.
 * Output goes to content/blog/_nl-test/<model-slug>/<filename> for side-by-side review.
 *
 * Usage: node scripts/compare-translation-models.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EN_DIR = path.join(ROOT, 'content/blog/en');
const NL_DIR = path.join(ROOT, 'content/blog/nl');
const TEST_ROOT = path.join(ROOT, 'content/blog/_nl-test');

// Load .env.local
const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

if (!process.env.OPENROUTER_API_KEY) {
  console.error('Missing OPENROUTER_API_KEY in env or .env.local');
  process.exit(1);
}

const MODELS = [
  { id: 'openai/gpt-4.1-mini',         slug: 'gpt-4.1-mini' },
  { id: 'x-ai/grok-4-fast',            slug: 'grok-4-fast' },
  { id: 'google/gemini-2.5-flash-lite', slug: 'gemini-2.5-flash-lite' },
  { id: 'x-ai/grok-4.1-fast',          slug: 'grok-4.1-fast' },
];

const SYSTEM_PROMPT = `You translate English Thailand-travel blog posts to natural, idiomatic Dutch (NL) for go2thailand.com.

Output ONLY the translated markdown file content. No explanations, no code fences, no preamble, no notes.

DUTCH SEO RULES:
- Translate \`title\` (~60 chars) using keywords NL travelers actually search: "Bangkok streetfood", "beste tijd Thailand", "Thailand vakantie", "tips Bangkok", "{stad} bezienswaardigheden". Primary keyword early.
- Translate \`description\` (140-155 chars), action-oriented, with primary NL keyword.
- Translate \`tags\` and ADD 2-3 extra NL search keywords.
- Convert USD prices to € equivalent (keep THB intact). Use NL number format (€1.500 not $1,500).
- Use Dutch travel terms: "vakantie", "reisgids", "bezienswaardigheden", "gids", "tips", "ervaring", "review".
- Where natural, mention NL context: "vanuit Nederland", "directe vlucht vanaf Schiphol", KLM.
- Address NL traveler concerns: regenseizoen, beste reistijd, veiligheid.

PRESERVE EXACTLY (do NOT translate or modify):
- YAML keys: slug, date, lastUpdated, author name, category, image, featured, readingTime, sources URLs
- All URLs (affiliate links, image paths, source URLs)
- Markdown formatting: headers, bold, italics, lists, tables, code blocks, link syntax
- Only translate the visible link text, never the URL

Sound like a Dutch travel writer, not a translation tool. Natural idiom over literal accuracy.`;

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://go2-thailand.com',
    'X-Title': 'go2thailand-translation-bench',
  },
});

async function translateWith(model, source, filename) {
  const start = Date.now();
  const resp = await client.chat.completions.create({
    model: model.id,
    max_tokens: 16000,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Translate this blog post to Dutch:\n\n${source}` },
    ],
  });
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  let text = resp.choices?.[0]?.message?.content || '';
  text = text.replace(/^```(?:markdown|md|yaml)?\n?/, '').replace(/\n?```\s*$/, '').trim();
  const usage = resp.usage || {};
  return {
    text,
    elapsed,
    inputTokens: usage.prompt_tokens || 0,
    outputTokens: usage.completion_tokens || 0,
    valid: text.startsWith('---'),
  };
}

function pickFiles(n) {
  const enFiles = fs.readdirSync(EN_DIR).filter(f => f.endsWith('.md')).sort();
  const nlFiles = new Set(fs.readdirSync(NL_DIR).filter(f => f.endsWith('.md')));
  return enFiles.filter(f => !nlFiles.has(f)).slice(0, n);
}

async function main() {
  const files = pickFiles(5);
  console.log(`Comparing ${MODELS.length} models on ${files.length} posts:\n  ${files.join('\n  ')}\n`);

  for (const m of MODELS) {
    fs.mkdirSync(path.join(TEST_ROOT, m.slug), { recursive: true });
  }

  const summary = [];

  // Run model x file in parallel (20 requests total)
  const tasks = [];
  for (const m of MODELS) {
    for (const f of files) {
      tasks.push({ model: m, file: f });
    }
  }

  const results = await Promise.all(tasks.map(async ({ model, file }) => {
    const source = fs.readFileSync(path.join(EN_DIR, file), 'utf8');
    try {
      const r = await translateWith(model, source, file);
      const outPath = path.join(TEST_ROOT, model.slug, file);
      fs.writeFileSync(outPath, r.text + '\n');
      console.log(`✓ ${model.slug.padEnd(28)} ${file}  (${r.elapsed}s, ${r.inputTokens}+${r.outputTokens} tok, valid=${r.valid})`);
      return { model: model.slug, file, ...r, ok: true };
    } catch (e) {
      console.error(`✗ ${model.slug.padEnd(28)} ${file}  ${e.message}`);
      return { model: model.slug, file, ok: false, error: e.message };
    }
  }));

  console.log('\n=== Summary per model ===');
  for (const m of MODELS) {
    const rs = results.filter(r => r.model === m.slug && r.ok);
    const errs = results.filter(r => r.model === m.slug && !r.ok);
    const inTok = rs.reduce((s, r) => s + r.inputTokens, 0);
    const outTok = rs.reduce((s, r) => s + r.outputTokens, 0);
    const valid = rs.filter(r => r.valid).length;
    console.log(`${m.slug.padEnd(28)} ok=${rs.length}/5  valid-frontmatter=${valid}/5  tokens=${inTok}+${outTok}  errors=${errs.length}`);
  }
  console.log(`\nOutput written to: ${TEST_ROOT}/<model>/<file>.md`);
}

main().catch(e => { console.error(e); process.exit(1); });
