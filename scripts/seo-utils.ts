import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type SeoLocale = 'nl' | 'en';

export interface KeywordRow {
  primary_keyword: string;
  secondary_keywords: string;
  page_type: string;
  pillar: string;
  cluster: string;
  route: string;
  translation_key: string;
  volume: string;
  kd: string;
  intent: string;
  status: string;
  notes: string;
}

// `tsx` can transpile this utility through CommonJS, where `import.meta.dirname`
// is not guaranteed. npm exposes the invocation root through INIT_CWD; direct
// `npx tsx` use falls back to the current project directory.
export const PROJECT_ROOT = resolve(process.env.INIT_CWD || process.cwd());
export const SEO_ROOT = resolve(PROJECT_ROOT, 'seo');

export function assertLocale(value: string | undefined): SeoLocale {
  if (value !== 'nl' && value !== 'en') {
    throw new Error('Locale is required and must be "nl" or "en".');
  }
  return value;
}

export function keywordFile(locale: SeoLocale): string {
  return resolve(SEO_ROOT, `keywords-${locale}.csv`);
}

export function usedKeywordFile(locale: SeoLocale): string {
  return resolve(SEO_ROOT, `used-keywords-${locale}.md`);
}

export function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = '';
  let quoted = false;
  for (let index = 0; index < line.length; index++) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index++;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      cells.push(current);
      current = '';
    } else {
      current += character;
    }
  }
  cells.push(current);
  return cells;
}

export function serializeCsvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function readKeywordCsv(locale: SeoLocale): { header: string[]; rows: KeywordRow[] } {
  const lines = readFileSync(keywordFile(locale), 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0] || '');
  const rows = lines.slice(1).map(line => {
    const values = parseCsvLine(line);
    const record = Object.fromEntries(header.map((key, index) => [key, values[index] || '']));
    return record as unknown as KeywordRow;
  }).filter(row => row.primary_keyword);
  return { header, rows };
}

export function loadEnvLocal(): void {
  const path = resolve(PROJECT_ROOT, '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !(match[1] in process.env)) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  }
}

export function slugify(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
