import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { readKeywordCsv, SeoLocale, SEO_ROOT, usedKeywordFile } from './seo-utils';

function countPublished(locale: SeoLocale): number {
  return readFileSync(usedKeywordFile(locale), 'utf8').split(/\r?\n/)
    .filter(line => line.startsWith('|') && !line.includes('primary keyword') && !line.includes('---')).length;
}

function countResearch(locale: SeoLocale): number {
  const directory = resolve(SEO_ROOT, 'research', locale);
  return existsSync(directory) ? readdirSync(directory).filter(file => file.endsWith('.md') && file !== 'README.md').length : 0;
}

for (const locale of ['nl', 'en'] as SeoLocale[]) {
  const { rows } = readKeywordCsv(locale);
  const byStatus = new Map<string, number>();
  const byPillar = new Map<string, number>();
  for (const row of rows) {
    byStatus.set(row.status || 'unset', (byStatus.get(row.status || 'unset') || 0) + 1);
    byPillar.set(row.pillar || 'unassigned', (byPillar.get(row.pillar || 'unassigned') || 0) + 1);
  }
  console.log(`\n${locale.toUpperCase()} ContentOps`);
  console.log(`  backlog: ${rows.length} | published log: ${countPublished(locale)} | SERP briefs: ${countResearch(locale)}`);
  console.log(`  status: ${[...byStatus].map(([status, count]) => `${status}=${count}`).join(', ') || 'empty'}`);
  console.log(`  pillars: ${[...byPillar].map(([pillar, count]) => `${pillar}(${count})`).join(', ') || 'empty'}`);
  const missingResearch = rows.filter(row => !['published', 'done'].includes(row.status) && row.status !== 'researching');
  if (missingResearch.length) console.log(`  next research: ${missingResearch.slice(0, 5).map(row => row.primary_keyword).join(' | ')}`);
}

