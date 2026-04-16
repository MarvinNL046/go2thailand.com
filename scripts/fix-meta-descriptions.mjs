#!/usr/bin/env node
/**
 * Truncate overly-long metaDescriptions across all PSEO JSON files.
 *
 * Google snips meta descriptions beyond ~155 chars. Grok often ignores the
 * soft 140-155 instruction. This is a cheap post-process that caps at 155,
 * cleanly at a word boundary, and adds an ellipsis if we had to cut.
 *
 * Run after any PSEO build. Idempotent.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MAX = 155;

function smartTruncate(s, limit) {
  if (s.length <= limit) return s;
  // Leave 1 char budget for the ellipsis.
  const target = limit - 1;
  const slice = s.slice(0, target);
  // Cut at last word boundary before target, but not if that throws away
  // too much (>20% of the quota).
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = (lastSpace > target * 0.8 ? slice.slice(0, lastSpace) : slice)
    .replace(/[,;:.\-\s]+$/, '');
  return trimmed + '…';
}

const dirs = ['where-to-stay', 'best-hotels', 'areas', 'hotels'];
let fixed = 0, kept = 0, total = 0;
for (const d of dirs) {
  const dir = path.join(ROOT, 'data/pseo', d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.json'))) {
    const p = path.join(dir, f);
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    const md = j.aiContent?.metaDescription;
    if (!md) continue;
    total++;
    if (md.length <= MAX) { kept++; continue; }
    j.aiContent.metaDescription = smartTruncate(md, MAX);
    fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
    fixed++;
  }
}
console.log(`checked: ${total}  kept: ${kept}  truncated: ${fixed}`);
