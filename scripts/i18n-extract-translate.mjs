#!/usr/bin/env node
/**
 * Extract user-facing English strings from a .tsx file, translate to Dutch via
 * Grok 4 Fast, write lib/i18n/<slug>.ts, and produce a patched .tsx that uses
 * the shared useT() hook.
 *
 * Usage:
 *   node scripts/i18n-extract-translate.mjs --file pages/about.tsx
 *   node scripts/i18n-extract-translate.mjs --file pages/about.tsx --dry-run
 *   node scripts/i18n-extract-translate.mjs --file pages/about.tsx --slug about
 *
 * Strategy:
 *   1. Read .tsx. Find JSX text nodes and common attr strings that look like
 *      English (capitalized start, letters, min length).
 *   2. Skip strings that are already inside a locale conditional (we detect
 *      a recent `isNl` / `lang === 'nl'` / `t('...')` in the surrounding tokens).
 *   3. Assign a stable key per string and store {key, value, startOffset, endOffset}.
 *   4. Batch-translate all values to NL via Grok 4 Fast.
 *   5. Write lib/i18n/<slug>.ts with { en, nl } object.
 *   6. Patch the .tsx: add import + const t = useT(strings), replace each
 *      extracted span with `{t('key')}` (for JSX text) or `{t('key')}` (for attrs).
 *   7. Print a diff summary. Do not modify the file if --dry-run.
 *
 * The script is intentionally conservative. It prefers to leave strings alone
 * rather than risk producing invalid JSX.
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
if (!process.env.OPENROUTER_API_KEY) { console.error('Missing OPENROUTER_API_KEY'); process.exit(1); }

const args = process.argv.slice(2);
const getArg = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };
const FILE = getArg('--file');
const DRY_RUN = args.includes('--dry-run');
const VERBOSE = args.includes('--verbose');
const SLUG_OVERRIDE = getArg('--slug');

if (!FILE) { console.error('Pass --file <path/to/file.tsx>'); process.exit(1); }

const filePath = path.resolve(ROOT, FILE);
if (!fs.existsSync(filePath)) { console.error(`File not found: ${filePath}`); process.exit(1); }

// Derive slug (for lib/i18n/<slug>.ts)
const relToPages = path.relative(path.join(ROOT, 'pages'), filePath);
const slug = SLUG_OVERRIDE || relToPages
  .replace(/\.(tsx|jsx|ts|js)$/, '')
  .replace(/\[|\]/g, '')
  .replace(/\//g, '-')
  .replace(/^-+|-+$/g, '')
  .toLowerCase() || path.basename(filePath, path.extname(filePath));

const i18nFile = path.join(ROOT, 'lib/i18n', `${slug}.ts`);

const source = fs.readFileSync(filePath, 'utf8');

// --- Extraction ---

/**
 * We scan the source for two kinds of candidates:
 *   1. JSX text nodes: plain English text that appears between tags.
 *      Matched with a conservative regex that only captures runs of text
 *      containing letters, digits, spaces, and basic punctuation (no `{}<>`).
 *   2. Common attribute string literals: title=, placeholder=, alt=, aria-label=,
 *      content= (for meta).
 *
 * We skip:
 *   - Strings shorter than MIN_LEN (too noisy, e.g. "&nbsp;" or single words)
 *   - Strings without at least one space AND at least one letter (not a phrase)
 *   - Strings that don't start with a capital letter (likely CSS classes, emoji only)
 *   - Strings that are entirely inside a JSX expression ({...}) — those often
 *     contain code, not content.
 *   - Strings where the preceding 200 chars contain `isNl` / `lang ===` / `t(`
 *     within the same JSX expression context — those are already conditional.
 */

const MIN_LEN = 8;            // At least 8 chars so we skip "Home", "Menu" etc. unless long enough
const MIN_WORDS = 2;          // At least 2 words to look like a phrase
const MAX_LEN = 900;          // Cap to avoid catching huge blocks

const candidates = [];

// 1. JSX text nodes: between > and <, not containing <, >, { or }
//    Pattern: `>([^<>{}]{MIN..MAX})<`
const jsxTextRegex = />([^<>{}\n][^<>{}]{0,900})</g;

for (const m of source.matchAll(jsxTextRegex)) {
  const raw = m[1];
  const stripped = raw.trim();
  if (!stripped) continue;
  if (stripped.length < MIN_LEN || stripped.length > MAX_LEN) continue;
  if (!/[A-Z]/.test(stripped[0])) continue;              // Must start uppercase
  if (!/[a-z]/.test(stripped)) continue;                 // Must contain lowercase letter
  if (stripped.split(/\s+/).length < MIN_WORDS) continue; // At least 2 words
  if (!/[A-Za-z]/.test(stripped)) continue;              // Contains letters

  // Skip obvious non-content:
  if (/^https?:\/\//.test(stripped)) continue;
  if (/^\{/.test(stripped)) continue;

  const absoluteStart = m.index + 1;                      // after '>'
  const absoluteEnd = absoluteStart + raw.length;         // before '<'
  candidates.push({
    kind: 'jsx-text',
    raw,
    value: stripped,
    leadingWs: raw.match(/^\s*/)[0],
    trailingWs: raw.match(/\s*$/)[0],
    start: absoluteStart,
    end: absoluteEnd,
  });
}

// 2. Attribute strings: attr="..." or attr='...'
const attrRegex = /\b(title|placeholder|alt|aria-label|content|description)\s*=\s*(["'])([A-Z][^"'\n]{8,400})\2/g;
for (const m of source.matchAll(attrRegex)) {
  const value = m[3];
  if (!/[a-z]/.test(value)) continue;
  if (value.split(/\s+/).length < MIN_WORDS) continue;
  const quoteChar = m[2];
  const valueStart = m.index + m[0].indexOf(quoteChar) + 1;
  const valueEnd = valueStart + value.length;
  candidates.push({
    kind: 'attr',
    attr: m[1],
    quoteChar,
    raw: value,
    value,
    start: valueStart,
    end: valueEnd,
  });
}

// Remove overlaps (attr inside JSX text? unlikely, but dedupe anyway)
candidates.sort((a, b) => a.start - b.start);
const deduped = [];
let lastEnd = -1;
for (const c of candidates) {
  if (c.start < lastEnd) continue;     // overlapping — skip
  deduped.push(c);
  lastEnd = c.end;
}

// Detect already-conditional strings: scan a window of 200 chars BEFORE each
// candidate. If we see `isNl` or `lang ===` or `t(` in that window AND a `{`
// before it, consider this already-conditional and skip.
function isLikelyAlreadyConditional(offset) {
  const windowStart = Math.max(0, offset - 300);
  const window = source.slice(windowStart, offset);
  // Walk backwards looking for an unmatched `{` — if the nearest one precedes
  // an isNl/lang/t(, skip.
  const lastOpenBrace = window.lastIndexOf('{');
  if (lastOpenBrace === -1) return false;
  const after = window.slice(lastOpenBrace);
  const closeBraces = (after.match(/\}/g) || []).length;
  const openBraces = (after.match(/\{/g) || []).length;
  // Inside an expression if more { than }
  const inExpr = openBraces > closeBraces;
  if (!inExpr) return false;
  return /\bisNl\b|lang\s*===\s*['"]nl['"]|\bt\s*\(/.test(after);
}

// Also skip if value looks like a CSS class list or an emoji-heavy token
function looksLikeCode(v) {
  if (/^[a-z]/.test(v)) return true;            // starts lowercase after trim = JSX
  if (/className|styles?\./.test(v)) return true;
  return false;
}

const final = deduped.filter(c => {
  if (looksLikeCode(c.value)) return false;
  if (isLikelyAlreadyConditional(c.start)) return false;
  return true;
});

if (VERBOSE) {
  console.log(`Candidates: ${candidates.length} (after dedupe: ${deduped.length}, after conditional-filter: ${final.length})`);
}

if (!final.length) {
  console.log(`No translatable strings found in ${FILE}.`);
  process.exit(0);
}

// --- Key generation ---
// Key: `s<NNN>_<first-3-words-snake>` — stable + human-readable.
function snake(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').split('_').slice(0, 4).join('_').slice(0, 40);
}
final.forEach((c, i) => {
  c.key = `s${String(i + 1).padStart(3, '0')}_${snake(c.value)}` || `s${String(i + 1).padStart(3, '0')}`;
});

// Dedupe keys by value: if the same EN string appears twice, reuse the key.
const valueToKey = new Map();
for (const c of final) {
  if (!valueToKey.has(c.value)) valueToKey.set(c.value, c.key);
  else c.key = valueToKey.get(c.value);
}

// --- Translation via Grok ---

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: { 'HTTP-Referer': 'https://go2-thailand.com', 'X-Title': 'go2thailand-ui-i18n' },
});

const SYSTEM = `You translate UI strings for a Thailand travel website (go2thailand.com) from English to natural, idiomatic Dutch.

Context: these are short UI labels, section headers, and marketing copy. Users are Dutch travelers planning trips to Thailand.

RULES:
- Keep translations concise. A heading of 3 words should stay around 3 words in Dutch. Do not pad.
- Natural Dutch travel-writing voice. Not literal. Use idiomatic terms: "vakantie", "gids", "bezienswaardigheden", "tips", "reizen", "bestemmingen", "ervaring".
- Preserve proper nouns: Bangkok, Phuket, Chiang Mai, Koh Samui, Wat Arun, Pad Thai, Songkran, etc. Thai words and names stay unchanged.
- Preserve emoji and punctuation placement.
- When a UI string contains "Thailand", keep "Thailand" in Dutch (same word).
- "Best X" → "Beste X". "Top 10 X" → "Top 10 X" (kept). "Guide" → "Gids". "Where to stay" → "Waar te verblijven".
- "See more" / "Read more" / "View all" → "Bekijk meer" / "Lees meer" / "Bekijk alles".
- Do not add new content or explanations.

OUTPUT FORMAT:
Reply ONLY with a valid JSON array matching the input shape: [{"i": 0, "t": "..."}, {"i": 1, "t": "..."}, ...]
No fences, no preamble, no notes.`;

async function translateStrings(strings) {
  const payload = strings.map((s, i) => ({ i, t: s.value }));
  const resp = await client.chat.completions.create({
    model: 'x-ai/grok-4-fast',
    max_tokens: 16000,
    temperature: 0.3,
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user', content: `Translate each "t" to Dutch following the rules. Return JSON only.\n${JSON.stringify(payload)}` },
    ],
  });
  let raw = (resp.choices[0]?.message?.content || '').trim();
  raw = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```\s*$/, '').trim();
  let parsed;
  try { parsed = JSON.parse(raw); } catch (_) {
    const m = raw.match(/\[[\s\S]*\]/);
    if (!m) throw new Error(`Invalid JSON: ${raw.slice(0, 200)}`);
    parsed = JSON.parse(m[0]);
  }
  if (!Array.isArray(parsed) || parsed.length !== strings.length) {
    throw new Error(`Length mismatch: got ${parsed.length}, expected ${strings.length}`);
  }
  const byIdx = new Map(parsed.map(o => [o.i, o.t]));
  return {
    translations: strings.map((_, i) => byIdx.get(i)),
    usage: resp.usage || {},
  };
}

// Unique values only for translation (since we dedupe keys by value)
const uniqueValues = [];
const seenValues = new Set();
for (const c of final) {
  if (!seenValues.has(c.value)) { seenValues.add(c.value); uniqueValues.push({ value: c.value }); }
}

console.log(`Translating ${uniqueValues.length} unique strings (from ${final.length} occurrences) ...`);
const { translations, usage } = await translateStrings(uniqueValues);
console.log(`Tokens: ${usage.prompt_tokens}+${usage.completion_tokens}  ≈ $${((usage.prompt_tokens / 1e6) * 0.2 + (usage.completion_tokens / 1e6) * 0.5).toFixed(4)}`);

const valueToNl = new Map();
uniqueValues.forEach((u, i) => valueToNl.set(u.value, translations[i]));

// --- Produce lib/i18n/<slug>.ts ---

const enEntries = [];
const nlEntries = [];
const writtenKeys = new Set();
for (const c of final) {
  if (writtenKeys.has(c.key)) continue;
  writtenKeys.add(c.key);
  enEntries.push(`  ${JSON.stringify(c.key)}: ${JSON.stringify(c.value)},`);
  nlEntries.push(`  ${JSON.stringify(c.key)}: ${JSON.stringify(valueToNl.get(c.value))},`);
}

const i18nSource = `// Auto-generated by scripts/i18n-extract-translate.mjs
// Source: ${path.relative(ROOT, filePath)}
// Do not edit English values by hand here — edit the source file instead, then re-run.
// Dutch values are safe to tune by hand.

import type { Strings } from './index';

export const strings: Strings = {
  en: {
${enEntries.join('\n')}
  },
  nl: {
${nlEntries.join('\n')}
  },
};
`;

// --- Patch the .tsx source ---

// Build replacement map: for each candidate, what to insert instead of the original.
// JSX text: replace `raw` (including whitespace) with `${leading}{t('key')}${trailing}`.
// Attr: replace `"value"` with `{t('key')}` (i.e. remove quotes too — keep attr name + = unchanged).

// Patch from end to start so offsets stay valid.
const patched = [...source];
const sortedFromEnd = [...final].sort((a, b) => b.start - a.start);
for (const c of sortedFromEnd) {
  let replacement;
  if (c.kind === 'jsx-text') {
    replacement = `${c.leadingWs}{t(${JSON.stringify(c.key)})}${c.trailingWs}`;
  } else if (c.kind === 'attr') {
    // Replace the value AND the quotes. We need to include the quote chars in the slice.
    // candidate.start points to inside the quote, end to the char before closing quote.
    // Expand range to include both quote characters:
    c.start -= 1;
    c.end += 1;
    replacement = `{t(${JSON.stringify(c.key)})}`;
  }
  patched.splice(c.start, c.end - c.start, replacement);
}
let patchedSource = patched.join('');

// Insert imports + hook call if not present.
// Determine the relative import path from the file to lib/i18n and lib/i18n/<slug>.
const fileDir = path.dirname(filePath);
let toI18n = path.relative(fileDir, path.join(ROOT, 'lib/i18n')).replace(/\\/g, '/');
if (!toI18n.startsWith('.')) toI18n = `./${toI18n}`;
const relStringsPath = `${toI18n}/${slug}`;
const relHookPath = toI18n;

const importsToAdd = [];
if (!/from\s+['"].*\/i18n['"]/.test(patchedSource)) {
  importsToAdd.push(`import { useT } from '${relHookPath}';`);
}
const slugEscaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const stringsImportRegex = new RegExp(`from\\s+['"][^'"]*i18n/${slugEscaped}['"]`);
if (!stringsImportRegex.test(patchedSource)) {
  importsToAdd.push(`import { strings as i18nStrings } from '${relStringsPath}';`);
}

// Add imports after the last existing import line
if (importsToAdd.length) {
  const importBlockMatch = patchedSource.match(/^(?:import[^\n]*\n)+/);
  if (importBlockMatch) {
    const insertAt = importBlockMatch[0].length;
    patchedSource = patchedSource.slice(0, insertAt) + importsToAdd.join('\n') + '\n' + patchedSource.slice(insertAt);
  } else {
    patchedSource = importsToAdd.join('\n') + '\n' + patchedSource;
  }
}

// Add `const t = useT(i18nStrings);` at the top of the default-export
// component body. We find `export default function NAME(...) {` and inject
// immediately after the opening brace. Any existing `const t = useT(...)`
// declarations are left alone (the page may already have one).
if (!/\bconst\s+t\s*=\s*useT\s*\(i18nStrings\)/.test(patchedSource)) {
  const defFnMatch = patchedSource.match(/(export\s+default\s+function\s+\w+\s*\([^)]*\)(?:\s*:\s*\w+)?\s*\{)(\s*\n)/);
  if (defFnMatch) {
    const insertAt = defFnMatch.index + defFnMatch[1].length;
    patchedSource = patchedSource.slice(0, insertAt) + '\n  const t = useT(i18nStrings);' + patchedSource.slice(insertAt);
  } else {
    // Fallback: default-export arrow or anonymous default
    const arrowMatch = patchedSource.match(/(const\s+\w+\s*:\s*\w+\s*=\s*\([^)]*\)\s*=>\s*\{)(\s*\n)/);
    if (arrowMatch) {
      const insertAt = arrowMatch.index + arrowMatch[1].length;
      patchedSource = patchedSource.slice(0, insertAt) + '\n  const t = useT(i18nStrings);' + patchedSource.slice(insertAt);
    }
  }
}

// --- Summary ---

if (DRY_RUN) {
  console.log(`\n--- DRY RUN: would write ${i18nFile} with ${writtenKeys.size} keys ---`);
  console.log(i18nSource.slice(0, 500) + '...\n');
  console.log(`--- Would patch ${final.length} strings in ${FILE} ---`);
  console.log('Not writing.');
  process.exit(0);
}

fs.mkdirSync(path.dirname(i18nFile), { recursive: true });
fs.writeFileSync(i18nFile, i18nSource);
fs.writeFileSync(filePath, patchedSource);

console.log(`\n✓ Wrote ${path.relative(ROOT, i18nFile)} (${writtenKeys.size} keys)`);
console.log(`✓ Patched ${FILE} (${final.length} string occurrences replaced)`);
console.log('\nNext: npm run build to validate. Then manually review if any UI text feels off.');
