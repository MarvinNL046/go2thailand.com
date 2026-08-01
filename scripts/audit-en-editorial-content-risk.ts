export {};

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

interface LedgerRoute {
  locale: string;
  path: string;
  familyKey: string;
}

interface RiskRow {
  route: string;
  slug: string;
  category: string;
  date: string;
  lastUpdated: string;
  wordCount: number;
  sourceCount: number;
  riskScore: number;
  flags: string[];
}

const projectRoot = resolve(__dirname, '..');
const ledgerPath = resolve(projectRoot, 'seo', 'audits', 'goal-completion-ledger.json');
const runtimeDir = resolve(projectRoot, 'seo', 'audits', 'runtime');
const outputPath = resolve(runtimeDir, 'en-editorial-content-risk.json');
const now = new Date('2026-08-01T00:00:00Z');

function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#*_>`|~-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function textDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === 'string' ? value : '';
}

function riskFor(route: string): RiskRow {
  const slug = route.replace(/^\/blog\//, '').replace(/\/$/, '');
  const markdownPath = resolve(projectRoot, 'content', 'blog', 'en', `${slug}.md`);
  if (!existsSync(markdownPath)) {
    return { route, slug, category: '', date: '', lastUpdated: '', wordCount: 0, sourceCount: 0, riskScore: 100, flags: ['markdown-missing'] };
  }

  const raw = readFileSync(markdownPath, 'utf8');
  const parsed = matter(raw);
  const body = parsed.content;
  const data = parsed.data as Record<string, unknown>;
  const category = typeof data.category === 'string' ? data.category : '';
  const published = textDate(data.date);
  const lastUpdated = textDate(data.lastUpdated);
  const sources = Array.isArray(data.sources) ? data.sources : [];
  const words = countWords(body);
  const flags: string[] = [];

  if (!category) flags.push('category-missing');
  if (!data.description) flags.push('description-missing');
  if (!data.image) flags.push('image-missing');
  if (!lastUpdated) flags.push('last-updated-missing');
  if (sources.length < 2) flags.push('fewer-than-two-sources');
  if (words < 500) flags.push('fewer-than-500-words');
  else if (words < 800) flags.push('fewer-than-800-words');
  if (/\b(?:I visited|I stayed|I lived|we visited|we stayed|we lived|our years|my years|firsthand|from personal experience|during our three years|countless trips)\b/i.test(body)) flags.push('personal-experience-claim');
  if (/(?:\bTHB\b|\bbaht\b|\bUSD\b|[$€£]\s?\d|\d[.,]?\d*\s?(?:THB|baht|euros?|EUR|USD))/i.test(body)) flags.push('fixed-price-claim');
  if (/\b(?:always|guaranteed|without doubt|the best|the biggest|the cheapest|must-see|must visit|never fails)\b/i.test(body)) flags.push('absolute-or-superlative-claim');
  if (/\b(?:opening hours?|open daily|departs every|every \d+ minutes?|\d{1,2}:\d{2}\s?(?:am|pm)?)\b/i.test(body)) flags.push('hours-or-schedule-claim');
  if (/<script\b|\bonclick\s*=|\bonerror\s*=/i.test(body)) flags.push('unsafe-inline-html');
  if (/data-widget=|tpembd\.com\/content/i.test(body)) flags.push('legacy-widget-html');
  // Keep this case-sensitive: with /i, the mojibake marker `Â` also matches a
  // legitimate lowercase `â`, as in the French name "Relais & Châteaux".
  if (/â€”|â€“|â€™|â€œ|â€|Â|ðŸ|â‚¬|â€¦|Ã/.test(raw)) flags.push('encoding-corruption');

  const date = published ? new Date(`${published}T00:00:00Z`) : null;
  const eventLike = /event|festival|concert|songkran|pride|tourism-news|news|seasonal/i.test(category)
    || /(?:festival|concert|songkran|world-tour|ceremony|earth-hour|tomorrowland|hyrox|open-2026)/i.test(slug);
  if (eventLike) flags.push('time-sensitive-event-or-update');
  if (eventLike && date && date < now && /\b(?:will take place|will be held|is scheduled|is set to|will return|coming in|you can attend)\b/i.test(body)) {
    flags.push('possibly-expired-future-language');
  }

  const weights: Record<string, number> = {
    'markdown-missing': 100,
    'unsafe-inline-html': 25,
    'possibly-expired-future-language': 22,
    'fewer-than-two-sources': 18,
    'legacy-widget-html': 15,
    'personal-experience-claim': 14,
    'encoding-corruption': 14,
    'fixed-price-claim': 12,
    'absolute-or-superlative-claim': 10,
    'hours-or-schedule-claim': 9,
    'fewer-than-500-words': 8,
    'fewer-than-800-words': 4,
    'category-missing': 5,
    'description-missing': 5,
    'image-missing': 5,
    'last-updated-missing': 4,
    'time-sensitive-event-or-update': 3,
  };
  const riskScore = Math.min(100, flags.reduce((sum, flag) => sum + (weights[flag] || 0), 0));

  return { route, slug, category, date: published, lastUpdated, wordCount: words, sourceCount: sources.length, riskScore, flags };
}

function main(): void {
  const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8')) as { routes: LedgerRoute[] };
  const routes = ledger.routes
    .filter((route) => route.locale === 'en' && route.familyKey === 'en:editorial' && route.path !== '/blog/')
    .map((route) => route.path);
  const rows = routes.map(riskFor).sort((a, b) => b.riskScore - a.riskScore || a.route.localeCompare(b.route));
  const flagCounts = Object.fromEntries(
    [...new Set(rows.flatMap((row) => row.flags))]
      .sort()
      .map((flag) => [flag, rows.filter((row) => row.flags.includes(flag)).length]),
  );
  const report = {
    generatedAt: new Date().toISOString(),
    sourceLedger: 'seo/audits/goal-completion-ledger.json',
    routeCount: rows.length,
    highRisk: rows.filter((row) => row.riskScore >= 35).length,
    mediumRisk: rows.filter((row) => row.riskScore >= 18 && row.riskScore < 35).length,
    lowerRisk: rows.filter((row) => row.riskScore < 18).length,
    hardBlockerRoutes: rows.filter((row) => row.flags.some((flag) => [
      'markdown-missing',
      'category-missing',
      'description-missing',
      'image-missing',
      'last-updated-missing',
      'fewer-than-two-sources',
      'personal-experience-claim',
      'unsafe-inline-html',
      'legacy-widget-html',
      'encoding-corruption',
    ].includes(flag))).map((row) => row.route),
    flagCounts,
    routes: rows,
  };
  mkdirSync(runtimeDir, { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`EN editorial content-risk: ${rows.length} articles; ${report.highRisk} high, ${report.mediumRisk} medium, ${report.lowerRisk} lower.`);
  console.log(`Hard blockers: ${report.hardBlockerRoutes.length}. Price, schedule, length and superlative flags remain editorial advisories when the rendered current-information boundary is present.`);
  for (const row of rows.slice(0, 20)) console.log(`${row.riskScore}\t${row.route}\t${row.flags.join(', ')}`);
}

main();
