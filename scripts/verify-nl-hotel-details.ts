import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCsvLine, SEO_ROOT } from './seo-utils';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const researchDate = '2026-07-26';

interface KeywordRow { route: string; status: string; notes: string }
interface Config {
  route: string;
  hotel: string;
  minWords: number;
  rankingCount: number;
  destinationHref: string;
  hotelGuideHref: string;
  markers: string[];
}
interface Result { route: string; status?: number; errors: string[] }

const configs: Config[] = [
  {
    route: '/nl/hotel/mandarin-oriental-bangkok/', hotel: 'Mandarin Oriental Bangkok', minWords: 900, rankingCount: 5,
    destinationHref: '/nl/city/bangkok/', hotelGuideHref: '/nl/best-hotels/bangkok/',
    markers: ['Geen betaalde positie', 'Eerlijke trade-offs', 'Actuele beschikbaarheid', 'Veelgestelde vragen over Mandarin Oriental Bangkok'],
  },
  {
    route: '/nl/hotel/tonsai-bay-resort/', hotel: 'Tonsai Bay Resort', minWords: 900, rankingCount: 2,
    destinationHref: '/nl/city/krabi/', hotelGuideHref: '/nl/best-hotels/krabi/',
    markers: ['Geen betaalde positie', 'Eerlijke trade-offs', 'Actuele beschikbaarheid', 'Veelgestelde vragen over Tonsai Bay Resort'],
  },
  {
    route: '/nl/hotel/centara-grand-beach-resort-villas-krabi/', hotel: 'Centara Reserve Krabi', minWords: 950, rankingCount: 4,
    destinationHref: '/nl/city/krabi/', hotelGuideHref: '/nl/best-hotels/krabi/',
    markers: ['Geen betaalde positie', 'Eerlijke trade-offs', 'Actuele beschikbaarheid', 'Veelgestelde vragen over Centara Reserve Krabi'],
  },
  {
    route: '/nl/hotel/oasis-koh-chang/', hotel: 'Oasis Koh Chang', minWords: 900, rankingCount: 3,
    destinationHref: '/nl/islands/koh-chang/', hotelGuideHref: '/nl/best-hotels/trat/',
    markers: ['Geen betaalde positie', 'Eerlijke trade-offs', 'Actuele beschikbaarheid', 'Veelgestelde vragen over Oasis Koh Chang'],
  },
];

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
  const pathname = new URL(decodeHtml(value), publicOrigin).pathname;
  return pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
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
  for (const [, raw] of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decodeHtml(raw));
      if (Array.isArray(parsed)) schemas.push(...parsed);
      else if (parsed && typeof parsed === 'object') schemas.push(parsed);
    } catch { errors.push('ongeldige JSON-LD'); }
  }
  return schemas;
}

function researchStem(route: string): string {
  return `${researchDate}-go2-thailand-com-${route.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-')}`;
}

async function checkInternalLinks(paths: string[], errors: string[]): Promise<void> {
  for (const path of [...new Set(paths)].filter((value) => value.startsWith('/nl/') && !value.includes('/go/'))) {
    try {
      const response = await fetch(new URL(path, baseUrl), { redirect: 'follow' });
      if (response.status >= 400) errors.push(`interne link ${path} geeft HTTP ${response.status}`);
    } catch (error) { errors.push(`interne link ${path} niet controleerbaar: ${String(error)}`); }
  }
}

async function inspect(config: Config, row: KeywordRow): Promise<Result> {
  const errors: string[] = [];
  let response: Response;
  try { response = await fetch(new URL(config.route, baseUrl), { redirect: 'follow' }); }
  catch (error) { return { route: config.route, errors: [`fetch mislukt: ${String(error)}`] }; }
  const html = await response.text();
  const text = visibleText(html);
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (normalizedPath(response.url) !== config.route) errors.push(`onverwachte redirect naar ${normalizedPath(response.url)}`);
  if (row.status !== 'implemented') errors.push(`ContentOps-status is ${row.status || 'leeg'}`);
  if (!/DFS/i.test(row.notes) || !/PAA/i.test(row.notes)) errors.push('ContentOps-note mist DFS/PAA-bewijs');

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (getAttribute(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');
  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!title.toLocaleLowerCase('nl-NL').includes(config.hotel.toLocaleLowerCase('nl-NL').split(' ')[0])) errors.push(`title mist hotelnaam: ${title}`);
  if (title.length < 35 || title.length > 70) errors.push(`titlelengte ${title.length} valt buiten 35-70`);
  const metaTag = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((tag) => getAttribute(tag, 'name')?.toLowerCase() === 'description');
  const metaLength = decodeHtml(getAttribute(metaTag || '', 'content') || '').length;
  if (metaLength < 105 || metaLength > 180) errors.push(`meta descriptionlengte ${metaLength} valt buiten 105-180`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push('pagina heeft niet exact één H1');
  if ((html.match(/<main\b/gi) || []).length !== 1) errors.push('pagina heeft niet exact één main-landmark');
  if ((html.match(/<section\b/gi) || []).length < 10) errors.push('pagina heeft minder dan tien inhoudssecties');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < config.minWords) errors.push(`slechts ${wordCount} zichtbare woorden`);
  for (const marker of config.markers) if (!text.includes(marker)) errors.push(`inhoudsmarker ontbreekt: ${marker}`);

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonical = linkTags.find((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'));
  if (normalizedPath(getAttribute(canonical || '', 'href') || '/') !== config.route) errors.push('self-canonical ontbreekt of is onjuist');
  const hreflangs = linkTags.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('alternate')).map((tag) => getAttribute(tag, 'hreflang'));
  for (const required of ['en', 'nl', 'x-default']) if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);

  const schemas = collectSchemas(html, errors);
  const types = new Set(schemas.map((schema) => String(schema['@type'] || '')));
  for (const required of ['Organization', 'FAQPage', 'BreadcrumbList', 'Hotel', 'WebPage']) if (!types.has(required)) errors.push(`${required}-schema ontbreekt`);
  const webPage = schemas.find((schema) => schema['@type'] === 'WebPage');
  if (webPage?.inLanguage !== 'nl-NL') errors.push('WebPage.inLanguage is niet nl-NL');
  if (normalizedPath(String(webPage?.url || '/')) !== config.route) errors.push('WebPage.url is onjuist');
  if (String(webPage?.dateModified || '') !== researchDate) errors.push(`dateModified is ${String(webPage?.dateModified || 'leeg')}`);
  const breadcrumbs = schemas.find((schema) => schema['@type'] === 'BreadcrumbList');
  const breadcrumbItems = Array.isArray(breadcrumbs?.itemListElement) ? breadcrumbs.itemListElement as Array<Record<string, unknown>> : [];
  if (normalizedPath(String(breadcrumbItems[1]?.item || '/')) !== config.destinationHref) errors.push('bestemmingsbreadcrumb is onjuist');
  if (normalizedPath(String(breadcrumbItems[2]?.item || '/')) !== config.hotelGuideHref) errors.push('hoteloverzicht-breadcrumb is onjuist');

  const anchors = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const sponsored = anchors.filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (sponsored.length < 3) errors.push(`slechts ${sponsored.length} sponsored Trip.com-uitgangen`);
  for (const tag of sponsored) {
    const href = decodeHtml(getAttribute(tag, 'href') || '');
    const rel = getAttribute(tag, 'rel')?.split(/\s+/) || [];
    if (!href.includes('trip.tpo.lv')) errors.push('hotel-affiliatelink is niet van Trip.com');
    if (!['nofollow', 'noopener', 'noreferrer', 'sponsored'].every((value) => rel.includes(value))) errors.push('affiliatelink mist vereist rel-attribuut');
  }
  if (!text.toLowerCase().includes('affiliatelink')) errors.push('affiliate-uitleg ontbreekt');
  if (anchors.some((tag) => /\/go\//.test(getAttribute(tag, 'href') || ''))) errors.push('hotelintentie is verwaterd met Amazon-link');

  const internal = anchors.flatMap((tag) => {
    const href = getAttribute(tag, 'href');
    if (!href || href.startsWith('#')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      return url.hostname === new URL(publicOrigin).hostname ? [{ path: normalizedPath(url.toString()), label: visibleText(tag) }] : [];
    } catch { return []; }
  });
  for (const required of [config.destinationHref, config.hotelGuideHref]) if (!internal.some((link) => link.path === required)) errors.push(`clusterlink naar ${required} ontbreekt`);
  const descriptive = internal.filter((link) => link.path !== config.route && link.label.length >= 6 && !/^(lees meer|klik hier)$/i.test(link.label));
  if (descriptive.length < 6) errors.push(`slechts ${descriptive.length} beschrijvende interne links`);
  await checkInternalLinks(internal.map((link) => link.path), errors);

  const sourceLinks = anchors.filter((tag) => {
    const href = getAttribute(tag, 'href') || '';
    return /^https?:\/\//.test(decodeHtml(href)) && !getAttribute(tag, 'rel')?.includes('sponsored') && !/go2-thailand|googleapis|gstatic|instagram/.test(href);
  });
  if (sourceLinks.length < 2) errors.push(`slechts ${sourceLinks.length} primaire bronlinks`);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (images.length < 6) errors.push(`slechts ${images.length} visuele instanties`);
  if (images.some((tag) => getAttribute(tag, 'alt') === undefined)) errors.push('afbeelding zonder alt-attribuut');
  const localAssets = [...new Set(images.flatMap((tag) => [getAttribute(tag, 'src') || '', getAttribute(tag, 'srcset') || '']).flatMap((candidate) => [...decodeURIComponent(decodeHtml(candidate)).matchAll(/\/images\/[A-Za-z0-9_./%()-]+\.(?:webp|avif|png|jpe?g)/gi)].map((match) => match[0])))];
  for (const asset of localAssets) if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);

  const stem = researchStem(config.route);
  for (const family of ['rankings', 'backlinks']) for (const extension of ['json', 'md']) {
    if (!existsSync(resolve(SEO_ROOT, 'research', 'nl', family, `${stem}.${extension}`))) errors.push(`${family}-bewijs ontbreekt`);
  }
  const rankingJson = resolve(SEO_ROOT, 'research', 'nl', 'rankings', `${stem}.json`);
  if (existsSync(rankingJson)) {
    const raw = readFileSync(rankingJson, 'utf8');
    if (!raw.includes(`"cost"`) || !raw.includes(config.route)) errors.push('rankingbewijs mist kosten of exacte owner-URL');
    const keywordMatches = raw.match(/"keyword"\s*:/g)?.length || 0;
    if (keywordMatches < config.rankingCount) errors.push(`rankingbewijs bevat slechts ${keywordMatches} keywords`);
  }
  return { route: config.route, status: response.status, errors };
}

async function main(): Promise<void> {
  const rows = new Map(keywordRows().map((row) => [normalizedPath(row.route), row]));
  const results = await Promise.all(configs.map((config) => inspect(config, rows.get(config.route) || { route: config.route, status: '', notes: '' })));
  const failures = results.filter((result) => result.errors.length);
  console.log(`NL hotel-detail verification: ${configs.length - failures.length}/${configs.length} owners groen op ${baseUrl}.`);
  console.log('DFS/PAA, rankingbehoud, metadata, landmarks, schema, Trip.com, bronnen, interne links en visuals gecontroleerd.');
  for (const result of failures) {
    console.error(`\n${result.route}${result.status ? ` (HTTP ${result.status})` : ''}`);
    for (const error of result.errors) console.error(`  - ${error}`);
  }
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
