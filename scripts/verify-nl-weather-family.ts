import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getNlWeatherGuide } from '../data/weather/nl';
import { parseCsvLine, SEO_ROOT } from './seo-utils';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const concurrency = Math.max(1, Number(process.env.SITE_VERIFY_CONCURRENCY || 3));
const weatherCitySlugs = new Set(['bangkok', 'chiang-mai', 'koh-samui', 'krabi', 'phuket']);

interface KeywordRow {
  primary_keyword: string;
  route: string;
  status: string;
  notes: string;
}

interface WeatherRoute {
  route: string;
  citySlug?: string;
  destinationNeedle: string;
  researchNote: string;
  legacyRoutes: string[];
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

function decodeHtml(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function normalizedPath(value: string): string {
  const url = new URL(decodeHtml(value), publicOrigin);
  return url.pathname === '/' ? '/' : `${url.pathname.replace(/\/+$/, '')}/`;
}

function readRoutes(): WeatherRoute[] {
  const rows = readKeywordRows().filter((row) => row.route === '/nl/weather/' || /^\/nl\/city\/[^/]+\/weather\/$/.test(row.route));
  const routes = rows.filter((row) => {
    if (row.route === '/nl/weather/') return true;
    const citySlug = row.route.split('/').filter(Boolean)[2] || '';
    return weatherCitySlugs.has(citySlug);
  }).map((row) => {
    if (row.status !== 'implemented') {
      throw new Error(`${row.route} heeft ContentOps-status ${row.status || 'leeg'} in plaats van implemented.`);
    }
    const citySlug = row.route === '/nl/weather/' ? undefined : row.route.split('/').filter(Boolean)[2];
    return {
      route: normalizedPath(row.route),
      citySlug,
      destinationNeedle: citySlug ? citySlug.replace(/-/g, ' ') : 'thailand',
      researchNote: row.notes,
      legacyRoutes: citySlug
        ? [`/nl/city/${citySlug}/best-time-to-visit/`]
        : ['/nl/travel-guides/thailand-weather/', '/nl/thailand-index/best-time/', '/nl/best-time-to-visit/'],
    };
  }).sort((a, b) => a.route.localeCompare(b.route));
  if (routes.length !== 6) throw new Error(`Verwacht 6 NL weatherowners, gevonden ${routes.length}.`);
  return routes;
}

function getAttribute(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3];
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

async function inspectRedirect(legacyRoute: string, ownerRoute: string, errors: string[]): Promise<void> {
  const response = await fetch(new URL(legacyRoute, baseUrl), { redirect: 'manual' });
  const location = response.headers.get('location');
  if (![301, 308].includes(response.status)) errors.push(`${legacyRoute} geeft HTTP ${response.status} in plaats van permanent redirect`);
  if (!location || normalizedPath(location) !== ownerRoute) errors.push(`${legacyRoute} wijst naar ${location || 'nergens'}`);
}

async function inspectRoute(config: WeatherRoute): Promise<RouteResult> {
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
  if (!title.toLocaleLowerCase('nl-NL').includes(config.destinationNeedle)) errors.push(`title mist bestemming: ${title || 'ontbreekt'}`);
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
  if (sectionCount < 9) errors.push(`slechts ${sectionCount} inhoudssecties`);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < 1000) errors.push(`slechts ${wordCount} zichtbare woorden`);
  for (const marker of ['Veelgestelde vragen', 'Klimaat', 'Amazon']) if (!text.includes(marker)) errors.push(`inhoudslaag mist marker: ${marker}`);
  if (config.citySlug && !text.includes('Wat neem je mee?')) errors.push('city-owner mist visuele paklijstsectie');
  if (!config.citySlug && !text.includes('Andaman en de Golf')) errors.push('landelijke owner mist kustwisselbeslissing');

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonical = linkTags.find((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'));
  const canonicalHref = getAttribute(canonical || '', 'href');
  if (!canonicalHref || normalizedPath(canonicalHref) !== config.route) errors.push(`self-canonical ontbreekt of is onjuist: ${canonicalHref || 'ontbreekt'}`);
  const hreflangs = linkTags.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('alternate')).map((tag) => getAttribute(tag, 'hreflang'));
  for (const required of ['en', 'nl', 'x-default']) if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);

  const schemas = collectSchemas(html, errors);
  const schemaTypes = new Set(schemas.map((schema) => String(schema['@type'] || '')));
  for (const required of ['Organization', 'FAQPage', 'BreadcrumbList', 'WebPage', 'Dataset']) {
    if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  }
  const webPage = schemas.find((schema) => schema['@type'] === 'WebPage');
  if (webPage?.inLanguage !== 'nl-NL') errors.push('WebPage.inLanguage is niet nl-NL');
  if (normalizedPath(String(webPage?.url || '')) !== config.route) errors.push('WebPage.url ontbreekt of is onjuist');
  if (String(webPage?.dateModified || '') !== '2026-07-26') errors.push(`WebPage.dateModified is ${String(webPage?.dateModified || 'ontbreekt')}`);
  const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
  const faqCount = Array.isArray(faq?.mainEntity) ? faq.mainEntity.length : 0;
  if (faqCount < 4) errors.push(`FAQPage heeft slechts ${faqCount} vragen`);
  const dataset = schemas.find((schema) => schema['@type'] === 'Dataset');
  if (!String(dataset?.temporalCoverage || '').includes('1991')) errors.push('Dataset mist klimaatperiode 1991-2020');

  const anchorTags = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const amazon = anchorTags.filter((tag) => /\/go\//.test(getAttribute(tag, 'href') || ''));
  if (amazon.length < 3) errors.push(`slechts ${amazon.length} contextuele Amazon-links`);
  const sponsored = anchorTags.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (sponsored.length < 5) errors.push(`slechts ${sponsored.length} affiliate-uitgangen`);
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
  if (config.citySlug) {
    const destinationOwner = `/nl/city/${config.citySlug}/`;
    if (!internal.some((link) => link.path === destinationOwner)) errors.push('natuurlijke teruglink naar destination-owner ontbreekt');
    const monthly = new Set(internal.filter((link) => link.path.startsWith(`/nl/city/${config.citySlug}/weather/`) && link.path !== config.route).map((link) => link.path));
    const monthDetailRoutesEnabled = getNlWeatherGuide(config.citySlug)?.monthDetailRoutes !== false;
    if (monthDetailRoutesEnabled && monthly.size < 12) errors.push(`slechts ${monthly.size} maandspokes`);
    if (!monthDetailRoutesEnabled && monthly.size > 0) errors.push(`onbedoelde maandspokes gevonden terwijl monthDetailRoutes is uitgeschakeld: ${monthly.size}`);
  } else {
    for (const slug of weatherCitySlugs) {
      if (!internal.some((link) => link.path === `/nl/city/${slug}/weather/`)) errors.push(`landelijke hub mist directe link naar ${slug}`);
    }
    const monthly = new Set(internal.filter((link) => /^\/nl\/thailand-in\/[^/]+\/$/.test(link.path)).map((link) => link.path));
    if (monthly.size < 12) errors.push(`landelijke hub linkt slechts ${monthly.size} maandgidsen`);
  }
  for (const legacyRoute of config.legacyRoutes) {
    if (internal.some((link) => link.path === legacyRoute)) errors.push(`owner linkt nog intern naar legacyroute ${legacyRoute}`);
  }
  const descriptive = internal.filter((link) => link.path !== config.route && link.label.length >= 6 && !/^(lees meer|klik hier)$/i.test(link.label));
  if (descriptive.length < 10) errors.push(`slechts ${descriptive.length} beschrijvende interne links`);

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
  if (![...sourceHosts].some((host) => host.endsWith('tmd.go.th'))) errors.push('officiële TMD-bron ontbreekt');

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (imageTags.length < 6) errors.push(`slechts ${imageTags.length} visuele instanties`);
  const imagesWithoutAlt = imageTags.filter((tag) => getAttribute(tag, 'alt') === undefined).length;
  if (imagesWithoutAlt) errors.push(`${imagesWithoutAlt} afbeelding(en) zonder alt-attribuut`);
  const localAssets = [...new Set(imageTags.flatMap((tag) => {
    const candidates = [getAttribute(tag, 'src') || '', getAttribute(tag, 'srcset') || ''];
    return candidates.flatMap((candidate) => [...decodeURIComponent(decodeHtml(candidate)).matchAll(/\/images\/[A-Za-z0-9_./%()-]+\.(?:webp|avif|png|jpe?g)/gi)].map((match) => match[0]));
  }))].filter((asset) => !asset.includes('..'));
  for (const asset of localAssets) if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);

  if (!/DFS/i.test(config.researchNote) || !/PAA/i.test(config.researchNote)) errors.push('ContentOps-note mist DFS- of PAA-bewijs');
  for (const legacyRoute of config.legacyRoutes) {
    try {
      await inspectRedirect(legacyRoute, config.route, errors);
    } catch (error) {
      errors.push(`${legacyRoute} niet controleerbaar: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return { route: config.route, status: response.status, errors };
}

async function main(): Promise<void> {
  const routes = readRoutes();
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
  console.log(`NL weather-family verification: ${results.length - failed.length}/${results.length} routes groen op ${baseUrl}.`);
  console.log('PAA, TMD-data, maandspokes, kustkeuze, redirects, metadata, landmarks, schema, Amazon OneLink, bronnen, visuals en natuurlijke links gecontroleerd.');
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
