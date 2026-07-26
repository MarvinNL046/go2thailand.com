import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCsvLine, SEO_ROOT } from './seo-utils';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const concurrency = Math.max(1, Number(process.env.SITE_VERIFY_CONCURRENCY || 2));
const researchDate = '2026-07-26';

interface KeywordRow { route: string; status: string; notes: string }
interface RouteConfig {
  route: string;
  kind: 'overview' | 'attractions' | 'diving' | 'snorkeling';
  minSections: number;
  minWords: number;
  minImages: number;
  minSponsored: number;
  requiredSchemas: string[];
  markers: string[];
  requiredLinks: string[];
}
interface RouteResult { route: string; status?: number; errors: string[] }

const configs: RouteConfig[] = [
  {
    route: '/nl/islands/koh-tao/', kind: 'overview', minSections: 10, minWords: 1200, minImages: 10, minSponsored: 3,
    requiredSchemas: ['Organization', 'TouristDestination', 'ItemList', 'FAQPage', 'BreadcrumbList', 'WebPage'],
    markers: ['Is Koh Tao de moeite waard voor jouw reis?', 'Een eerste Koh Tao-route met ademruimte', 'Veelgestelde vragen over Koh Tao'],
    requiredLinks: ['/nl/islands/koh-tao/attractions/', '/nl/islands/koh-tao/diving/', '/nl/islands/koh-tao/snorkeling/', '/nl/best-hotels/koh-tao/'],
  },
  {
    route: '/nl/islands/koh-tao/attractions/', kind: 'attractions', minSections: 9, minWords: 1200, minImages: 10, minSponsored: 2,
    requiredSchemas: ['Organization', 'ItemList', 'FAQPage', 'BreadcrumbList', 'WebPage'],
    markers: ['Acht sterke activiteiten op Koh Tao', 'Plan één bootdag, één actieve ochtend en één vrije baaidag', 'Veelgestelde vragen over Koh Tao'],
    requiredLinks: ['/nl/islands/koh-tao/', '/nl/islands/koh-tao/diving/', '/nl/islands/koh-tao/snorkeling/', '/nl/best-hotels/koh-tao/'],
  },
  {
    route: '/nl/islands/koh-tao/diving/', kind: 'diving', minSections: 9, minWords: 1100, minImages: 8, minSponsored: 2,
    requiredSchemas: ['Organization', 'ItemList', 'FAQPage', 'BreadcrumbList', 'WebPage'],
    markers: ['Welke duikroute past bij jou?', 'Zes vragen vóór je een aanbetaling doet', 'Veelgestelde vragen over duiken op Koh Tao'],
    requiredLinks: ['/nl/islands/koh-tao/', '/nl/islands/koh-tao/attractions/', '/nl/islands/koh-tao/snorkeling/', '/nl/best-hotels/koh-tao/'],
  },
  {
    route: '/nl/islands/koh-tao/snorkeling/', kind: 'snorkeling', minSections: 9, minWords: 1050, minImages: 8, minSponsored: 2,
    requiredSchemas: ['Organization', 'ItemList', 'FAQPage', 'BreadcrumbList', 'WebPage'],
    markers: ['Vier signalen vóór je een baai kiest', 'Wat neem je mee voor een snorkeldag?', 'Veelgestelde vragen over snorkelen op Koh Tao'],
    requiredLinks: ['/nl/islands/koh-tao/', '/nl/islands/koh-tao/attractions/', '/nl/islands/koh-tao/diving/', '/nl/best-hotels/koh-tao/'],
  },
];

const redirectPairs = [
  ['/nl/city/koh-tao/', '/nl/islands/koh-tao/'],
  ['/nl/travel-guides/koh-tao/', '/nl/islands/koh-tao/'],
  ['/nl/city/koh-tao/attractions/', '/nl/islands/koh-tao/attractions/'],
  ['/nl/city/koh-tao/top-10-attractions/', '/nl/islands/koh-tao/attractions/'],
  ['/nl/city/koh-tao/diving/', '/nl/islands/koh-tao/diving/'],
  ['/nl/city/koh-tao/snorkeling/', '/nl/islands/koh-tao/snorkeling/'],
] as const;

function keywordRows(): KeywordRow[] {
  const lines = readFileSync(resolve(SEO_ROOT, 'keywords-nl.csv'), 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] || ''])) as unknown as KeywordRow;
  });
}

function decodeHtml(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function normalizedPath(value: string): string {
  const url = new URL(decodeHtml(value), publicOrigin);
  return url.pathname === '/' ? '/' : `${url.pathname.replace(/\/+$/, '')}/`;
}

function getAttribute(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function visibleText(html: string): string {
  return decodeHtml(html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function collectSchemas(html: string, errors: string[]): Array<Record<string, unknown>> {
  const schemas: Array<Record<string, unknown>> = [];
  for (const [, rawJson] of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decodeHtml(rawJson));
      if (Array.isArray(parsed)) schemas.push(...parsed);
      else if (parsed && typeof parsed === 'object') schemas.push(parsed);
    } catch { errors.push('ongeldige JSON-LD'); }
  }
  return schemas;
}

function researchStem(route: string): string {
  return `${researchDate}-go2-thailand-com-${route.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-')}`;
}

async function inspectRedirect(from: string, to: string, errors: string[]): Promise<void> {
  const response = await fetch(new URL(from, baseUrl), { redirect: 'manual' });
  const location = response.headers.get('location');
  if (![301, 308].includes(response.status)) errors.push(`${from} geeft HTTP ${response.status} in plaats van permanent redirect`);
  if (!location || normalizedPath(location) !== to) errors.push(`${from} wijst naar ${location || 'nergens'} in plaats van ${to}`);
}

async function inspectInternalLinks(paths: string[], errors: string[]): Promise<void> {
  const uniquePaths = [...new Set(paths)].filter((path) => path.startsWith('/nl/') && !path.includes('/go/'));
  const queue = [...uniquePaths];
  const workers = Array.from({ length: Math.min(3, queue.length) }, async () => {
    while (queue.length) {
      const path = queue.shift();
      if (!path) continue;
      try {
        const response = await fetch(new URL(path, baseUrl), { redirect: 'follow' });
        if (response.status >= 400) errors.push(`interne link ${path} geeft HTTP ${response.status}`);
      } catch (error) {
        errors.push(`interne link ${path} niet controleerbaar: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  });
  await Promise.all(workers);
}

async function inspectRoute(config: RouteConfig, row: KeywordRow): Promise<RouteResult> {
  const errors: string[] = [];
  let response: Response;
  try { response = await fetch(new URL(config.route, baseUrl), { redirect: 'follow' }); }
  catch (error) { return { route: config.route, errors: [`fetch mislukt: ${error instanceof Error ? error.message : String(error)}`] }; }
  const html = await response.text();
  const text = visibleText(html);
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (normalizedPath(response.url) !== config.route) errors.push(`onverwachte redirect naar ${normalizedPath(response.url)}`);
  if (row.status !== 'implemented') errors.push(`ContentOps-status is ${row.status || 'leeg'}`);
  if (!/DFS/i.test(row.notes) || !/PAA/i.test(row.notes)) errors.push('ContentOps-note mist DFS- of PAA-bewijs');

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (getAttribute(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');
  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!title.toLocaleLowerCase('nl-NL').includes('koh tao')) errors.push(`title mist Koh Tao: ${title || 'ontbreekt'}`);
  if (title.length < 35 || title.length > 70) errors.push(`titlelengte ${title.length} valt buiten 35-70`);
  const descriptionTag = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((tag) => getAttribute(tag, 'name')?.toLowerCase() === 'description');
  const descriptionLength = decodeHtml(getAttribute(descriptionTag || '', 'content') || '').length;
  if (descriptionLength < 105 || descriptionLength > 180) errors.push(`meta descriptionlengte ${descriptionLength} valt buiten 105-180`);

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const mainCount = (html.match(/<main\b/gi) || []).length;
  const sectionCount = (html.match(/<section\b/gi) || []).length;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (h1Count !== 1) errors.push(`verwacht 1 H1, gevonden ${h1Count}`);
  if (mainCount !== 1) errors.push(`verwacht 1 main-landmark, gevonden ${mainCount}`);
  if (sectionCount < config.minSections) errors.push(`slechts ${sectionCount} inhoudssecties`);
  if (wordCount < config.minWords) errors.push(`slechts ${wordCount} zichtbare woorden`);
  for (const marker of config.markers) if (!text.includes(marker)) errors.push(`inhoudslaag mist marker: ${marker}`);

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonical = linkTags.find((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'));
  const canonicalHref = getAttribute(canonical || '', 'href');
  if (!canonicalHref || normalizedPath(canonicalHref) !== config.route) errors.push(`self-canonical ontbreekt of is onjuist: ${canonicalHref || 'ontbreekt'}`);
  const hreflangs = linkTags.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('alternate')).map((tag) => getAttribute(tag, 'hreflang'));
  for (const required of ['en', 'nl', 'x-default']) if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);

  const schemas = collectSchemas(html, errors);
  const schemaTypes = new Set(schemas.map((schema) => String(schema['@type'] || '')));
  for (const required of config.requiredSchemas) if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  const webPage = schemas.find((schema) => schema['@type'] === 'WebPage');
  if (webPage?.inLanguage !== 'nl-NL') errors.push('WebPage.inLanguage is niet nl-NL');
  if (normalizedPath(String(webPage?.url || '')) !== config.route) errors.push('WebPage.url ontbreekt of is onjuist');
  if (String(webPage?.dateModified || '') !== researchDate) errors.push(`WebPage.dateModified is ${String(webPage?.dateModified || 'ontbreekt')}`);
  if (config.kind === 'overview') {
    const breadcrumbs = schemas.find((schema) => schema['@type'] === 'BreadcrumbList');
    const items = Array.isArray(breadcrumbs?.itemListElement) ? breadcrumbs.itemListElement as Array<Record<string, unknown>> : [];
    if (items[1]?.name !== 'Eilanden' || normalizedPath(String(items[1]?.item || '')) !== '/nl/islands/') errors.push('overview-breadcrumbschema wijst niet naar de eilandhub');
  }

  const anchorTags = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const sponsored = anchorTags.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (sponsored.length < config.minSponsored) errors.push(`slechts ${sponsored.length} sponsored affiliate-uitgangen`);
  for (const tag of sponsored) {
    const rel = getAttribute(tag, 'rel')?.split(/\s+/) || [];
    if (!['nofollow', 'noopener', 'noreferrer', 'sponsored'].every((value) => rel.includes(value))) errors.push('affiliate-link mist vereist rel-attribuut');
  }
  if (!text.toLowerCase().includes('affiliate')) errors.push('affiliate-uitleg ontbreekt');
  const amazonLinks = anchorTags.filter((tag) => /\/go\//.test(getAttribute(tag, 'href') || ''));
  if (config.kind === 'snorkeling' && amazonLinks.length < 3) errors.push(`snorkelowner heeft slechts ${amazonLinks.length} contextuele Amazon-OneLink-uitgangen`);
  if (config.kind !== 'snorkeling' && amazonLinks.length) errors.push(`${config.kind} verwatert intentie met ${amazonLinks.length} Amazon-link(s)`);

  const internal = anchorTags.flatMap((tag) => {
    const href = getAttribute(tag, 'href');
    if (!href || href.startsWith('#')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      return url.hostname === new URL(publicOrigin).hostname ? [{ path: normalizedPath(url.toString()), label: visibleText(tag) }] : [];
    } catch { return []; }
  });
  for (const required of config.requiredLinks) if (!internal.some((link) => link.path === required)) errors.push(`natuurlijke clusterlink naar ${required} ontbreekt`);
  if (internal.some((link) => link.path.startsWith('/nl/city/koh-tao/'))) errors.push('owner linkt nog intern naar de oude city-familie');
  const descriptive = internal.filter((link) => link.path !== config.route && link.label.length >= 6 && !/^(lees meer|klik hier)$/i.test(link.label));
  if (descriptive.length < 7) errors.push(`slechts ${descriptive.length} beschrijvende interne links`);
  await inspectInternalLinks(internal.map((link) => link.path), errors);

  const sourceHosts = new Set(anchorTags.flatMap((tag) => {
    const href = getAttribute(tag, 'href');
    if (!href || getAttribute(tag, 'rel')?.includes('sponsored')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      return url.hostname === new URL(publicOrigin).hostname ? [] : [url.hostname];
    } catch { return []; }
  }));
  if (sourceHosts.size < 2) errors.push(`slechts ${sourceHosts.size} externe bronhosts`);

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (imageTags.length < config.minImages) errors.push(`slechts ${imageTags.length} visuele instanties`);
  const imagesWithoutAlt = imageTags.filter((tag) => getAttribute(tag, 'alt') === undefined).length;
  if (imagesWithoutAlt) errors.push(`${imagesWithoutAlt} afbeelding(en) zonder alt-attribuut`);
  const localAssets = [...new Set(imageTags.flatMap((tag) => {
    const candidates = [getAttribute(tag, 'src') || '', getAttribute(tag, 'srcset') || ''];
    return candidates.flatMap((candidate) => [...decodeURIComponent(decodeHtml(candidate)).matchAll(/\/images\/[A-Za-z0-9_./%()-]+\.(?:webp|avif|png|jpe?g)/gi)].map((match) => match[0]));
  }))].filter((asset) => !asset.includes('..'));
  for (const asset of localAssets) if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);

  const stem = researchStem(config.route);
  for (const family of ['rankings', 'backlinks']) for (const extension of ['json', 'md']) {
    if (!existsSync(resolve(SEO_ROOT, 'research', 'nl', family, `${stem}.${extension}`))) errors.push(`${family}-bewijs ${stem}.${extension} ontbreekt`);
  }
  return { route: config.route, status: response.status, errors };
}

async function main(): Promise<void> {
  const rows = keywordRows();
  const routeRows = new Map(rows.map((row) => [normalizedPath(row.route), row]));
  const missingRows = configs.filter((config) => !routeRows.has(config.route));
  if (missingRows.length) throw new Error(`ContentOps-rows ontbreken: ${missingRows.map((config) => config.route).join(', ')}`);

  const queue = [...configs];
  const results: RouteResult[] = [];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const config = queue.shift();
      if (config) results.push(await inspectRoute(config, routeRows.get(config.route)!));
    }
  });
  await Promise.all(workers);
  const redirectErrors: string[] = [];
  for (const [from, to] of redirectPairs) await inspectRedirect(from, to, redirectErrors);
  const legacyStem = researchStem('/nl/city/koh-tao/');
  for (const family of ['rankings', 'backlinks']) for (const extension of ['json', 'md']) {
    if (!existsSync(resolve(SEO_ROOT, 'research', 'nl', family, `${legacyStem}.${extension}`))) redirectErrors.push(`${family}-bewijs voor citylegacy ontbreekt`);
  }
  if (redirectErrors.length) results.push({ route: 'Koh Tao legacyredirects', errors: redirectErrors });

  results.sort((a, b) => a.route.localeCompare(b.route));
  const failed = results.filter((result) => result.errors.length);
  console.log(`NL Koh Tao-family verification: ${configs.length - results.filter((result) => result.route !== 'Koh Tao legacyredirects' && result.errors.length).length}/${configs.length} owners groen op ${baseUrl}.`);
  console.log('DFS/PAA, intenties, clusterlinks, redirects, metadata, landmarks, schema, affiliates, bronnen en visuals gecontroleerd.');
  for (const result of failed) {
    console.error(`\n${result.route}`);
    for (const error of result.errors) console.error(`  - ${error}`);
  }
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
