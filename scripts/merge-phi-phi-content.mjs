#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const b1 = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp-phi-phi-batch1.json'), 'utf8'));
const b2 = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp-phi-phi-batch2.json'), 'utf8'));
const b3 = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp-phi-phi-batch3.json'), 'utf8'));
const merged = { ...b1, ...b2, ...b3 };

const SLUGS = ['phi-phi-day-trip','maya-bay','phi-phi-snorkeling','phi-phi-sunset','phi-phi-speedboat','khai-islands','bamboo-island'];
const missing = SLUGS.filter(s => !merged[s]);
if (missing.length) {
  console.error('Missing spokes:', missing);
  process.exit(1);
}

// Validate critical SEO constraints
const issues = [];
for (const slug of SLUGS) {
  const c = merged[slug];
  if (c.seoTitle.length > 60) issues.push(`${slug}: seoTitle ${c.seoTitle.length}>60: ${c.seoTitle}`);
  if (c.seoTitleNl.length > 60) issues.push(`${slug}: seoTitleNl ${c.seoTitleNl.length}>60: ${c.seoTitleNl}`);
  if (c.descEn.length > 155) issues.push(`${slug}: descEn ${c.descEn.length}>155`);
  if (c.descNl.length > 155) issues.push(`${slug}: descNl ${c.descNl.length}>155`);
}
if (issues.length) {
  console.warn('SEO constraint warnings:');
  for (const i of issues) console.warn(`  ⚠ ${i}`);
}

const outFile = path.join(ROOT, 'data/pseo/tours/phi-phi-content.json');
fs.writeFileSync(outFile, JSON.stringify(merged, null, 2) + '\n');
console.log(`✓ Wrote ${outFile} with ${Object.keys(merged).length} spokes`);
