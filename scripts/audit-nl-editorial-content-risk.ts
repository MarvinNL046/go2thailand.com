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
const outputPath = resolve(runtimeDir, 'nl-editorial-content-risk.json');
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
  const slug = route.replace(/^\/nl\/blog\//, '').replace(/\/$/, '');
  const markdownPath = resolve(projectRoot, 'content', 'blog', 'nl', `${slug}.md`);
  if (!existsSync(markdownPath)) {
    return { route, slug, category: '', date: '', lastUpdated: '', wordCount: 0, sourceCount: 0, riskScore: 100, flags: ['markdown-ontbreekt'] };
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

  if (!category) flags.push('categorie-ontbreekt');
  if (!data.description) flags.push('description-ontbreekt');
  if (!data.image) flags.push('image-ontbreekt');
  if (!lastUpdated) flags.push('last-updated-ontbreekt');
  if (sources.length < 2) flags.push('minder-dan-twee-bronnen');
  if (words < 500) flags.push('minder-dan-500-woorden');
  else if (words < 800) flags.push('minder-dan-800-woorden');
  if (/\b(?:ik bezocht|ik verbleef|wij bezochten|uit eigen ervaring|in mijn jaren)\b/i.test(body)) flags.push('persoonlijke-ervaringsclaim');
  if (/(?:\bTHB\b|\bbaht\b|\bUSD\b|[$€£]\s?\d|\d[.,]?\d*\s?(?:THB|baht|euro|EUR|USD))/i.test(body)) flags.push('vaste-prijsclaim');
  if (/\b(?:altijd|gegarandeerd|zonder twijfel|de beste|de grootste|de goedkoopste|must-see|must visit)\b/i.test(body)) flags.push('absolute-of-superlatieve-claim');
  if (/\b(?:openingstijden?|dagelijks geopend|vertrekt elke|iedere \d+ minuten|\d{1,2}:\d{2})\b/i.test(body)) flags.push('tijd-of-dienstregelingsclaim');
  if (/https?:\/\/go2-thailand\.com\/(?!nl\/)/i.test(body)) flags.push('absolute-interne-link-zonder-nl');
  if (/<script\b|\bonclick\s*=|\bonerror\s*=/i.test(body)) flags.push('onveilige-inline-html');
  if (/data-widget=|tpembd\.com\/content/i.test(body)) flags.push('legacy-widget-html');

  const date = published ? new Date(`${published}T00:00:00Z`) : null;
  const eventLike = /event|festival|concert|songkran|pride|tourism-news|news|nieuws|seasonal|seizoen/i.test(category)
    || /(?:festival|concert|songkran|world-tour|ceremony|earth-hour|tomorrowland|hyrox|open-2026)/i.test(slug);
  if (eventLike) flags.push('tijdgevoelige-event-of-update');
  if (eventLike && date && date < now && /\b(?:komt|vindt plaats|zal|wordt gehouden|staat gepland|kun je bezoeken)\b/i.test(body)) {
    flags.push('mogelijk-verlopen-toekomsttaal');
  }

  const weights: Record<string, number> = {
    'markdown-ontbreekt': 100,
    'onveilige-inline-html': 25,
    'mogelijk-verlopen-toekomsttaal': 22,
    'minder-dan-twee-bronnen': 18,
    'legacy-widget-html': 15,
    'persoonlijke-ervaringsclaim': 14,
    'vaste-prijsclaim': 12,
    'absolute-of-superlatieve-claim': 10,
    'tijd-of-dienstregelingsclaim': 9,
    'absolute-interne-link-zonder-nl': 8,
    'minder-dan-500-woorden': 8,
    'minder-dan-800-woorden': 4,
    'categorie-ontbreekt': 5,
    'description-ontbreekt': 5,
    'image-ontbreekt': 5,
    'last-updated-ontbreekt': 4,
    'tijdgevoelige-event-of-update': 3,
  };
  const riskScore = Math.min(100, flags.reduce((sum, flag) => sum + (weights[flag] || 0), 0));

  return { route, slug, category, date: published, lastUpdated, wordCount: words, sourceCount: sources.length, riskScore, flags };
}

function main(): void {
  const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8')) as { routes: LedgerRoute[] };
  const routes = ledger.routes
    .filter((route) => route.locale === 'nl' && route.familyKey === 'nl:editorial' && route.path !== '/nl/blog/')
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
    flagCounts,
    routes: rows,
  };
  mkdirSync(runtimeDir, { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`NL editorial content-risk: ${rows.length} articles; ${report.highRisk} high, ${report.mediumRisk} medium, ${report.lowerRisk} lower.`);
  for (const row of rows.slice(0, 12)) console.log(`${row.riskScore}\t${row.route}\t${row.flags.join(', ')}`);
}

main();
