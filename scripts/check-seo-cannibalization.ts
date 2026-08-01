import { readFileSync } from 'node:fs';
import { readKeywordCsv, SeoLocale, usedKeywordFile } from './seo-utils';

const STRICT = process.argv.includes('--strict');
const locales: SeoLocale[] = ['nl', 'en'];

const stopwords: Record<SeoLocale, Set<string>> = {
  en: new Set(['a', 'an', 'the', 'to', 'of', 'for', 'with', 'and', 'in', 'on', 'at', 'is', 'are', 'how', 'what', 'when', 'vs', 'versus', 'or', 'best', 'top', 'guide', 'complete', 'travel', 'visit']),
  nl: new Set(['de', 'het', 'een', 'naar', 'van', 'voor', 'met', 'en', 'in', 'op', 'bij', 'is', 'zijn', 'hoe', 'wat', 'wanneer', 'vs', 'of', 'beste', 'top', 'gids', 'reisgids', 'vakantie']),
};

function singular(word: string, locale: SeoLocale): string {
  if (word.length <= 4) return word;
  if (locale === 'en' && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (locale === 'en' && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  if (locale === 'nl' && word.endsWith('en')) return word.slice(0, -2);
  return word;
}

function tokens(keyword: string, locale: SeoLocale): Set<string> {
  return new Set(keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/).filter(Boolean).map(word => singular(word, locale))
    .filter(word => !stopwords[locale].has(word)));
}

function setKey(values: Set<string>): string {
  return [...values].sort().join(' ');
}

function jaccard(left: Set<string>, right: Set<string>): number {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection++;
  return intersection / (left.size + right.size - intersection);
}

function publishedKeywords(locale: SeoLocale): string[] {
  return readFileSync(usedKeywordFile(locale), 'utf8').split(/\r?\n/)
    .filter(line => line.startsWith('|') && !line.includes('primary keyword') && !/^\|[-|]+\|$/.test(line.replace(/\s/g, '')))
    .map(line => line.split('|')[1]?.trim().toLowerCase()).filter(Boolean) as string[];
}

let hardCount = 0;
let warningCount = 0;

for (const locale of locales) {
  const { rows } = readKeywordCsv(locale);
  const primaries = rows.map(row => row.primary_keyword.toLowerCase());
  const published = publishedKeywords(locale);
  const seen = new Map<string, string>();
  const secondaryOwner = new Map<string, string>();

  for (const row of rows) {
    for (const secondary of row.secondary_keywords.split(',').map(value => value.trim().toLowerCase()).filter(Boolean)) {
      if (!secondaryOwner.has(secondary)) secondaryOwner.set(secondary, row.primary_keyword);
    }
  }

  for (const primary of primaries) {
    const key = setKey(tokens(primary, locale));
    if (seen.has(key)) {
      console.error(`[${locale}] HARD: "${primary}" overlaps "${seen.get(key)}" after normalisation.`);
      hardCount++;
    } else seen.set(key, primary);
    const owner = secondaryOwner.get(primary);
    if (owner && owner.toLowerCase() !== primary) {
      console.error(`[${locale}] HARD: primary "${primary}" is already a secondary of "${owner}".`);
      hardCount++;
    }
  }

  for (let left = 0; left < rows.length; left++) {
    for (let right = left + 1; right < rows.length; right++) {
      const score = jaccard(tokens(rows[left].primary_keyword, locale), tokens(rows[right].primary_keyword, locale));
      if (score >= 0.8 && setKey(tokens(rows[left].primary_keyword, locale)) !== setKey(tokens(rows[right].primary_keyword, locale))) {
        console.warn(`[${locale}] WARN: ${Math.round(score * 100)}% overlap between "${rows[left].primary_keyword}" and "${rows[right].primary_keyword}".`);
        warningCount++;
      }
    }
  }

  const duplicatePublished = published.filter((keyword, index) => published.indexOf(keyword) !== index);
  for (const keyword of new Set(duplicatePublished)) {
    console.error(`[${locale}] HARD: published keyword "${keyword}" occurs more than once.`);
    hardCount++;
  }
}

console.log(`SEO cannibalisation: ${hardCount} hard collision(s), ${warningCount} warning(s).`);
if (hardCount > 0 || (STRICT && warningCount > 0)) process.exit(1);

