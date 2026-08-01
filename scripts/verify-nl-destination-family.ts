import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCsvLine, SEO_ROOT } from './seo-utils';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const concurrency = Math.max(1, Number(process.env.SITE_VERIFY_CONCURRENCY || 4));

interface InventoryRow {
  locale: string;
  page_type: string;
  path: string;
  url: string;
}

interface KeywordRow {
  primary_keyword: string;
  pillar: string;
  route: string;
  status: string;
  notes: string;
}

interface DestinationRoute {
  route: string;
  citySlug: string;
  titleNeedle: string;
  researchNote: string;
  researchEvidence: boolean;
  siblingRoutes: string[];
}

interface RouteResult {
  route: string;
  status?: number;
  errors: string[];
}

function readCsv(file: string): Array<Record<string, string>> {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] || '']));
  });
}

function readDestinationRoutes(): DestinationRoute[] {
  const inventory = readCsv(resolve(SEO_ROOT, 'inventory', 'routes.csv')) as unknown as InventoryRow[];
  const keywords = readCsv(resolve(SEO_ROOT, 'keywords-nl.csv')) as unknown as KeywordRow[];
  const keywordByRoute = new Map(keywords.map((row) => [row.route, row]));
  const auditDirectory = resolve(SEO_ROOT, 'audits');
  const researchDirectory = resolve(SEO_ROOT, 'research', 'nl');
  const auditFiles = readdirSync(auditDirectory).filter((file) => file.endsWith('.md'));
  const researchFiles = readdirSync(researchDirectory).filter((file) => file.endsWith('.md'));
  return inventory
    .filter((row) => row.locale === 'nl' && row.page_type === 'destination-pillar')
    .map((row) => {
      const keyword = keywordByRoute.get(row.path);
      const citySlug = row.path.split('/').filter(Boolean)[2] || '';
      const titleNeedle = keyword?.primary_keyword.split(/\s+/)[0] || citySlug.split('-')[0];
      const matchingAudit = auditFiles.find((file) => file.includes(`nl-${citySlug}-destination`));
      const auditText = matchingAudit ? readFileSync(resolve(auditDirectory, matchingAudit), 'utf8') : '';
      const matchingResearchText = researchFiles
        .filter((file) => file.includes(citySlug))
        .map((file) => readFileSync(resolve(researchDirectory, file), 'utf8'))
        .join('\n');
      const evidenceText = `${auditText}\n${matchingResearchText}`;
      const researchEvidence = /(?:DFS|DataForSEO)/i.test(evidenceText) && /(?:PAA|People Also Ask)/i.test(evidenceText);
      const siblingRoutes = keyword
        ? keywords.filter((candidate) => candidate.pillar === keyword.pillar && candidate.route !== row.path).map((candidate) => normalizedPath(candidate.route))
        : [];
      return { route: normalizedPath(row.path), citySlug, titleNeedle, researchNote: keyword?.notes || '', researchEvidence, siblingRoutes };
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

function normalizedPath(value: string): string {
  const url = new URL(decodeHtml(value), publicOrigin);
  return url.pathname === '/' ? '/' : `${url.pathname.replace(/\/+$/, '')}/`;
}

function textContent(html: string): string {
  return decodeHtml(html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function collectSchemas(html: string, errors: string[]): Array<Record<string, unknown>> {
  const schemas: Array<Record<string, unknown>> = [];
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, rawJson] of scripts) {
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

function internalPaths(anchorTags: string[]): Array<{ path: string; label: string }> {
  return anchorTags.flatMap((tag) => {
    const href = getAttribute(tag, 'href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      if (url.hostname !== new URL(publicOrigin).hostname) return [];
      return [{ path: normalizedPath(url.toString()), label: textContent(tag) }];
    } catch {
      return [];
    }
  });
}

async function inspectRoute(config: DestinationRoute): Promise<RouteResult> {
  const errors: string[] = [];
  let response: Response;
  try {
    response = await fetch(new URL(config.route, baseUrl), { redirect: 'follow' });
  } catch (error) {
    return { route: config.route, errors: [`fetch mislukt: ${error instanceof Error ? error.message : String(error)}`] };
  }

  const html = await response.text();
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (normalizedPath(response.url) !== config.route) errors.push(`onverwachte redirect naar ${normalizedPath(response.url)}`);

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (getAttribute(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');

  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!title.toLocaleLowerCase('nl-NL').includes(config.titleNeedle.toLocaleLowerCase('nl-NL'))) errors.push(`title mist hoofdintentie: ${title || 'ontbreekt'}`);
  if (title.length < 35 || title.length > 70) errors.push(`titlelengte ${title.length} valt buiten 35-70`);

  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const description = metaTags
    .map((tag) => ({ name: getAttribute(tag, 'name')?.toLowerCase(), content: getAttribute(tag, 'content') }))
    .find((meta) => meta.name === 'description')?.content;
  const descriptionLength = decodeHtml(description || '').length;
  if (descriptionLength < 105 || descriptionLength > 180) errors.push(`meta descriptionlengte ${descriptionLength} valt buiten 105-180`);

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const mainCount = (html.match(/<main\b/gi) || []).length;
  const sectionCount = (html.match(/<section\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`verwacht 1 H1, gevonden ${h1Count}`);
  if (mainCount !== 1) errors.push(`verwacht 1 main-landmark, gevonden ${mainCount}`);
  if (sectionCount < 8) errors.push(`slechts ${sectionCount} inhoudssecties`);

  const bodyText = textContent(html);
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
  if (wordCount < 900) errors.push(`slechts ${wordCount} zichtbare woorden`);
  if (!bodyText.includes('Veelgestelde vragen')) errors.push('onderste contentlaag mist marker: Veelgestelde vragen');
  if (!bodyText.includes('Hoe is deze') && !bodyText.includes('Bronnen & redactie')) errors.push('onderste contentlaag mist bron- en redactiemethodiek');

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonical = linkTags.find((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'));
  const canonicalHref = getAttribute(canonical || '', 'href');
  if (!canonicalHref || normalizedPath(canonicalHref) !== config.route) errors.push(`self-canonical ontbreekt of is onjuist: ${canonicalHref || 'ontbreekt'}`);
  const hreflangs = linkTags
    .filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('alternate'))
    .map((tag) => getAttribute(tag, 'hreflang'))
    .filter((value): value is string => Boolean(value));
  for (const required of ['en', 'nl', 'x-default']) {
    if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);
  }

  const schemas = collectSchemas(html, errors);
  const schemaTypes = new Set(schemas.map((schema) => String(schema['@type'] || '')));
  for (const required of ['Organization', 'TouristDestination', 'WebPage', 'BreadcrumbList', 'FAQPage']) {
    if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  }
  const webPage = schemas.find((schema) => schema['@type'] === 'WebPage');
  if (webPage?.inLanguage !== 'nl-NL') errors.push('WebPage.inLanguage is niet nl-NL');
  if (normalizedPath(String(webPage?.url || '')) !== config.route) errors.push('WebPage.url ontbreekt of is onjuist');
  const modifiedAt = Date.parse(String(webPage?.dateModified || ''));
  const minimumModifiedAt = Date.parse('2026-07-23T00:00:00Z');
  if (!Number.isFinite(modifiedAt) || modifiedAt < minimumModifiedAt) errors.push(`WebPage.dateModified ontbreekt of is verouderd: ${String(webPage?.dateModified || 'ontbreekt')}`);
  const destination = schemas.find((schema) => schema['@type'] === 'TouristDestination');
  if (normalizedPath(String(destination?.url || '')) !== config.route) errors.push('TouristDestination.url ontbreekt of is onjuist');
  const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
  const faqCount = Array.isArray(faq?.mainEntity) ? faq.mainEntity.length : 0;
  if (faqCount < 4) errors.push(`FAQPage heeft slechts ${faqCount} vragen`);

  const anchorTags = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const sponsored = anchorTags.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (sponsored.length < 2) errors.push(`slechts ${sponsored.length} affiliate-uitgang(en)`);
  for (const tag of sponsored) {
    const rel = getAttribute(tag, 'rel')?.split(/\s+/) || [];
    if (!rel.includes('nofollow') || !rel.includes('noopener') || !rel.includes('noreferrer')) errors.push('affiliate-link mist vereist rel-attribuut');
  }
  if (!bodyText.toLowerCase().includes('affiliate')) errors.push('affiliate-uitleg ontbreekt');

  const internal = internalPaths(anchorTags);
  const childPrefix = `${config.route}`;
  const childLinks = new Set(internal.map((link) => link.path).filter((path) => (path.startsWith(childPrefix) && path !== config.route) || config.siblingRoutes.includes(path)));
  if (childLinks.size < 2) errors.push(`slechts ${childLinks.size} links naar eigen bestemmingsspokes`);
  const editorialLinks = internal.filter((link) => link.path !== config.route && link.label.length >= 6 && !/^(lees meer|klik hier)$/i.test(link.label));
  if (editorialLinks.length < 8) errors.push(`slechts ${editorialLinks.length} beschrijvende interne links`);

  const sourceHosts = new Set(anchorTags.flatMap((tag) => {
    const href = getAttribute(tag, 'href');
    if (!href) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      if (url.hostname === new URL(publicOrigin).hostname || getAttribute(tag, 'rel')?.includes('sponsored')) return [];
      return [url.hostname];
    } catch {
      return [];
    }
  }));
  if (sourceHosts.size < 2) errors.push(`slechts ${sourceHosts.size} externe bronhosts`);

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (imageTags.length < 8) errors.push(`slechts ${imageTags.length} visuele assets`);
  const imagesWithoutAlt = imageTags.filter((tag) => getAttribute(tag, 'alt') === undefined).length;
  if (imagesWithoutAlt) errors.push(`${imagesWithoutAlt} afbeelding(en) zonder alt-attribuut`);
  const localAssets = [...new Set(imageTags.flatMap((tag) => {
    const candidates = [getAttribute(tag, 'src') || '', getAttribute(tag, 'srcset') || ''];
    return candidates.flatMap((candidate) => {
      const decoded = decodeURIComponent(decodeHtml(candidate));
      return [...decoded.matchAll(/\/images\/[A-Za-z0-9_./%()-]+\.(?:webp|avif|png|jpe?g)/gi)].map((match) => match[0]);
    });
  }))].filter((asset) => !asset.includes('..'));
  for (const asset of localAssets) {
    if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);
  }

  if ((!/DFS/i.test(config.researchNote) || !/PAA/i.test(config.researchNote)) && !config.researchEvidence) errors.push('vastgelegd DFS- of PAA-bewijs ontbreekt');

  return { route: config.route, status: response.status, errors };
}

async function main(): Promise<void> {
  const routes = readDestinationRoutes();
  if (routes.length !== 35) throw new Error(`Verwacht 35 NL destination-pillars, gevonden ${routes.length}.`);
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
  console.log(`NL destination-family verification: ${results.length - failed.length}/${results.length} routes groen op ${baseUrl}.`);
  console.log(`Metadata, landmarks, onderkant, schema, hreflang, bronnen, affiliates, visuals en natuurlijke interne links gecontroleerd voor ${results.length} owners.`);
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
