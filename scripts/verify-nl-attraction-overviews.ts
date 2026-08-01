import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCsvLine, SEO_ROOT } from './seo-utils';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const concurrency = Math.max(1, Number(process.env.SITE_VERIFY_CONCURRENCY || 3));
const attractionOwnerSlugs = new Set(['bangkok', 'chiang-mai', 'khao-sok', 'koh-samui', 'krabi', 'phuket']);

interface KeywordRow {
  primary_keyword: string;
  route: string;
  status: string;
  notes: string;
}

interface AttractionRoute {
  route: string;
  citySlug: string;
  cityNeedle: string;
  researchNote: string;
}

interface RouteResult {
  route: string;
  status?: number;
  errors: string[];
}

function readKeywordRows(): KeywordRow[] {
  const lines = readFileSync(resolve(SEO_ROOT, 'keywords-nl.csv'), 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] || ''])) as unknown as KeywordRow;
  });
}

function normalizedPath(value: string): string {
  const url = new URL(decodeHtml(value), publicOrigin);
  return url.pathname === '/' ? '/' : `${url.pathname.replace(/\/+$/, '')}/`;
}

function readRoutes(): AttractionRoute[] {
  return readKeywordRows()
    .filter((row) => {
      if (!/^\/nl\/city\/[^/]+\/attractions\/$/.test(row.route)) return false;
      const citySlug = row.route.split('/').filter(Boolean)[2] || '';
      return attractionOwnerSlugs.has(citySlug);
    })
    .map((row) => {
      const citySlug = row.route.split('/').filter(Boolean)[2] || '';
      if (row.status !== 'implemented') {
        throw new Error(`${row.route} heeft ContentOps-status ${row.status || 'leeg'} in plaats van implemented.`);
      }
      return {
        route: normalizedPath(row.route),
        citySlug,
        cityNeedle: citySlug.replace(/-/g, ' '),
        researchNote: row.notes,
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));
}

function getAttribute(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function decodeHtml(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function visibleText(html: string): string {
  return decodeHtml(html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function collectSchemas(html: string, errors: string[]): Array<Record<string, unknown>> {
  const schemas: Array<Record<string, unknown>> = [];
  for (const [, rawJson] of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decodeHtml(rawJson));
      if (Array.isArray(parsed)) schemas.push(...parsed);
      else if (parsed && typeof parsed === 'object') schemas.push(parsed);
    } catch {
      errors.push('ongeldige JSON-LD');
    }
  }
  return schemas;
}

async function inspectLegacyRedirect(config: AttractionRoute, errors: string[]): Promise<void> {
  const legacyRoute = `/nl/city/${config.citySlug}/top-10-attractions/`;
  const response = await fetch(new URL(legacyRoute, baseUrl), { redirect: 'manual' });
  const location = response.headers.get('location');
  if (![301, 308].includes(response.status)) errors.push(`legacyroute geeft HTTP ${response.status} in plaats van permanent redirect`);
  if (!location || normalizedPath(location) !== config.route) errors.push(`legacyroute wijst naar ${location || 'nergens'}`);
}

async function inspectRoute(config: AttractionRoute): Promise<RouteResult> {
  const errors: string[] = [];
  let response: Response;
  try {
    response = await fetch(new URL(config.route, baseUrl), { redirect: 'follow' });
  } catch (error) {
    return { route: config.route, errors: [`fetch mislukt: ${error instanceof Error ? error.message : String(error)}`] };
  }
  const html = await response.text();
  const text = visibleText(html);
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (normalizedPath(response.url) !== config.route) errors.push(`onverwachte redirect naar ${normalizedPath(response.url)}`);

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (getAttribute(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');
  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!title.toLocaleLowerCase('nl-NL').includes(config.cityNeedle)) errors.push(`title mist bestemming: ${title || 'ontbreekt'}`);
  if (title.length < 35 || title.length > 70) errors.push(`titlelengte ${title.length} valt buiten 35-70`);
  const descriptionTag = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => getAttribute(tag, 'name')?.toLowerCase() === 'description');
  const descriptionLength = decodeHtml(getAttribute(descriptionTag || '', 'content') || '').length;
  if (descriptionLength < 105 || descriptionLength > 180) errors.push(`meta descriptionlengte ${descriptionLength} valt buiten 105-180`);

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const mainCount = (html.match(/<main\b/gi) || []).length;
  const sectionCount = (html.match(/<section\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`verwacht 1 H1, gevonden ${h1Count}`);
  if (mainCount !== 1) errors.push(`verwacht 1 main-landmark, gevonden ${mainCount}`);
  if (sectionCount < 10) errors.push(`slechts ${sectionCount} inhoudssecties`);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < 1000) errors.push(`slechts ${wordCount} zichtbare woorden`);
  for (const marker of ['Veelgestelde vragen', 'Hoe is deze']) {
    if (!text.includes(marker) && !(marker === 'Hoe is deze' && text.includes('Bronnen & redactie'))) errors.push(`onderste contentlaag mist marker: ${marker}`);
  }

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonical = linkTags.find((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'));
  const canonicalHref = getAttribute(canonical || '', 'href');
  if (!canonicalHref || normalizedPath(canonicalHref) !== config.route) errors.push(`self-canonical ontbreekt of is onjuist: ${canonicalHref || 'ontbreekt'}`);
  const hreflangs = linkTags.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('alternate')).map((tag) => getAttribute(tag, 'hreflang'));
  for (const required of ['en', 'nl', 'x-default']) if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);

  const schemas = collectSchemas(html, errors);
  const schemaTypes = new Set(schemas.map((schema) => String(schema['@type'] || '')));
  for (const required of ['Organization', 'ItemList', 'FAQPage', 'BreadcrumbList', 'WebPage']) {
    if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  }
  const webPage = schemas.find((schema) => schema['@type'] === 'WebPage');
  if (webPage?.inLanguage !== 'nl-NL') errors.push('WebPage.inLanguage is niet nl-NL');
  if (normalizedPath(String(webPage?.url || '')) !== config.route) errors.push('WebPage.url ontbreekt of is onjuist');
  if (!/^2026-07-(2[3-6])$/.test(String(webPage?.dateModified || ''))) errors.push(`WebPage.dateModified ontbreekt of is verouderd: ${String(webPage?.dateModified || 'ontbreekt')}`);
  const itemList = schemas.find((schema) => schema['@type'] === 'ItemList');
  const itemCount = Array.isArray(itemList?.itemListElement) ? itemList.itemListElement.length : 0;
  if (itemCount < 8) errors.push(`ItemList heeft slechts ${itemCount} keuzes`);
  const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
  const faqCount = Array.isArray(faq?.mainEntity) ? faq.mainEntity.length : 0;
  if (faqCount < 5) errors.push(`FAQPage heeft slechts ${faqCount} vragen`);

  const anchorTags = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const sponsored = anchorTags.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (!sponsored.length) errors.push('Klook-affiliate-uitgang ontbreekt');
  for (const tag of sponsored) {
    const rel = getAttribute(tag, 'rel')?.split(/\s+/) || [];
    if (!rel.includes('nofollow') || !rel.includes('noopener') || !rel.includes('noreferrer')) errors.push('affiliate-link mist vereist rel-attribuut');
  }
  if (!text.toLowerCase().includes('affiliate')) errors.push('affiliate-uitleg ontbreekt');

  const internal = anchorTags.flatMap((tag) => {
    const href = getAttribute(tag, 'href');
    if (!href || href.startsWith('#')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      if (url.hostname !== new URL(publicOrigin).hostname) return [];
      return [{ path: normalizedPath(url.toString()), label: visibleText(tag) }];
    } catch {
      return [];
    }
  });
  const ownerRoute = `/nl/city/${config.citySlug}/`;
  if (!internal.some((link) => link.path === ownerRoute)) errors.push('natuurlijke teruglink naar destination-owner ontbreekt');
  const descriptive = internal.filter((link) => link.path !== config.route && link.label.length >= 6 && !/^(lees meer|klik hier)$/i.test(link.label));
  if (descriptive.length < 8) errors.push(`slechts ${descriptive.length} beschrijvende interne links`);

  const sourceHosts = new Set(anchorTags.flatMap((tag) => {
    const href = getAttribute(tag, 'href');
    if (!href || getAttribute(tag, 'rel')?.includes('sponsored')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      return url.hostname === new URL(publicOrigin).hostname ? [] : [url.hostname];
    } catch {
      return [];
    }
  }));
  if (sourceHosts.size < 2) errors.push(`slechts ${sourceHosts.size} externe bronhosts`);

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (imageTags.length < 10) errors.push(`slechts ${imageTags.length} visuele instanties`);
  const imagesWithoutAlt = imageTags.filter((tag) => getAttribute(tag, 'alt') === undefined).length;
  if (imagesWithoutAlt) errors.push(`${imagesWithoutAlt} afbeelding(en) zonder alt-attribuut`);
  const localAssets = [...new Set(imageTags.flatMap((tag) => {
    const candidates = [getAttribute(tag, 'src') || '', getAttribute(tag, 'srcset') || ''];
    return candidates.flatMap((candidate) => [...decodeURIComponent(decodeHtml(candidate)).matchAll(/\/images\/[A-Za-z0-9_./%()-]+\.(?:webp|avif|png|jpe?g)/gi)].map((match) => match[0]));
  }))].filter((asset) => !asset.includes('..'));
  for (const asset of localAssets) if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);

  if (!/DFS/i.test(config.researchNote) || !/PAA/i.test(config.researchNote)) errors.push('ContentOps-note mist DFS- of PAA-bewijs');
  try {
    await inspectLegacyRedirect(config, errors);
  } catch (error) {
    errors.push(`legacyredirect niet controleerbaar: ${error instanceof Error ? error.message : String(error)}`);
  }
  return { route: config.route, status: response.status, errors };
}

async function main(): Promise<void> {
  const routes = readRoutes();
  if (routes.length !== attractionOwnerSlugs.size) {
    throw new Error(`Verwacht ${attractionOwnerSlugs.size} NL attraction-overviewowners, gevonden ${routes.length}.`);
  }
  const queue = [...routes];
  const results: RouteResult[] = [];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const route = queue.shift();
      if (route) results.push(await inspectRoute(route));
    }
  });
  await Promise.all(workers);
  results.sort((a, b) => a.route.localeCompare(b.route));
  const failed = results.filter((result) => result.errors.length);
  console.log(`NL attraction-overview verification: ${results.length - failed.length}/${results.length} routes groen op ${baseUrl}.`);
  console.log('PAA, keuzes, redirects, metadata, landmarks, onderkant, schema, bronnen, Klook, visuals en natuurlijke interne links gecontroleerd.');
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
