import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCsvLine, SEO_ROOT } from './seo-utils';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const researchDate = '2026-07-26';

interface KeywordRow { route: string; status: string; notes: string }
interface Config {
  route: string;
  place: string;
  minWords: number;
  rankingKeyword: string;
  rankingPosition: string;
  banner: string;
  requiredLinks: string[];
  markers: string[];
}
interface Result { route: string; status?: number; errors: string[] }

const configs: Config[] = [
  {
    route: '/nl/city/koh-samui/attractions/wat-plai-laem/', place: 'Wat Plai Laem', minWords: 1300,
    rankingKeyword: 'koh samui wat plai laem', rankingPosition: '31', banner: 'wat-plai-laem-reflection-banner.webp',
    requiredLinks: ['/nl/city/koh-samui/', '/nl/city/koh-samui/attractions/', '/nl/best-hotels/koh-samui/'],
    markers: ['Wat zie je bij Wat Plai Laem?', 'Zie Guanyin als betekenis', 'Bouw een noordoostelijke halve dag', 'Respect is onderdeel van de ervaring'],
  },
  {
    route: '/nl/city/chiang-rai/attractions/blue-temple/', place: 'Blue Temple', minWords: 1300,
    rankingKeyword: 'chiang rai blue temple', rankingPosition: '76', banner: 'blue-temple-rain-banner.webp',
    requiredLinks: ['/nl/city/chiang-rai/', '/nl/city/chiang-rai/attractions/', '/nl/region/northern/'],
    markers: ['Waarom ziet Wat Rong Suea Ten er zo anders uit?', 'Blauw is de ingang', 'Een logische kunst- en tempeldag', 'Je bezoekt een tempel, geen decorstuk'],
  },
];

function decodeHtml(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function normalizedPath(value: string): string {
  const pathname = new URL(decodeHtml(value), publicOrigin).pathname;
  return pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
}

function attr(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function visibleText(html: string): string {
  return decodeHtml(html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function parseSchemas(html: string, errors: string[]): Array<Record<string, unknown>> {
  const values: Array<Record<string, unknown>> = [];
  for (const [, raw] of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decodeHtml(raw));
      if (Array.isArray(parsed)) values.push(...parsed);
      else if (parsed && typeof parsed === 'object') values.push(parsed);
    } catch { errors.push('ongeldige JSON-LD'); }
  }
  return values;
}

function rows(): KeywordRow[] {
  const lines = readFileSync(resolve(SEO_ROOT, 'keywords-nl.csv'), 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] || ''])) as unknown as KeywordRow;
  });
}

function researchStem(route: string): string {
  return `${researchDate}-go2-thailand-com-${route.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-')}`;
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
  if (!/DFS/i.test(row.notes) || !/PAA/i.test(row.notes) || !new RegExp(`positie ${config.rankingPosition}`).test(row.notes)) errors.push('ContentOps-note mist DFS/PAA- of rankingbehoud');

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (attr(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');
  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!title.toLowerCase().includes(config.place.toLowerCase())) errors.push(`title mist ${config.place}: ${title}`);
  if (title.length < 40 || title.length > 70) errors.push(`titlelengte ${title.length} valt buiten 40-70`);
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((tag) => attr(tag, 'name')?.toLowerCase() === 'description');
  const metaLength = decodeHtml(attr(meta || '', 'content') || '').length;
  if (metaLength < 115 || metaLength > 180) errors.push(`meta descriptionlengte ${metaLength} valt buiten 115-180`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push('pagina heeft niet exact één H1');
  if ((html.match(/<main\b/gi) || []).length !== 1) errors.push('pagina heeft niet exact één main-landmark');
  if ((html.match(/<section\b/gi) || []).length < 14) errors.push('pagina heeft minder dan veertien inhoudssecties');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < config.minWords) errors.push(`slechts ${wordCount} zichtbare woorden`);
  for (const marker of config.markers) if (!text.includes(marker)) errors.push(`inhoudsmarker ontbreekt: ${marker}`);

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonical = linkTags.find((tag) => attr(tag, 'rel')?.split(/\s+/).includes('canonical'));
  if (normalizedPath(attr(canonical || '', 'href') || '/') !== config.route) errors.push('self-canonical ontbreekt of is onjuist');
  const hreflangs = linkTags.filter((tag) => attr(tag, 'rel')?.split(/\s+/).includes('alternate')).map((tag) => attr(tag, 'hreflang'));
  for (const required of ['en', 'nl', 'x-default']) if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);

  const schemaValues = parseSchemas(html, errors);
  const schemaTypes = new Set(schemaValues.map((schema) => String(schema['@type'] || '')));
  for (const required of ['Organization', 'TouristAttraction', 'FAQPage', 'BreadcrumbList', 'WebPage']) if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  const webPage = schemaValues.find((schema) => schema['@type'] === 'WebPage');
  if (webPage?.inLanguage !== 'nl-NL') errors.push('WebPage.inLanguage is niet nl-NL');
  if (normalizedPath(String(webPage?.url || '/')) !== config.route) errors.push('WebPage.url is onjuist');
  if (String(webPage?.dateModified || '') !== researchDate) errors.push(`dateModified is ${String(webPage?.dateModified || 'leeg')}`);
  const attraction = schemaValues.find((schema) => schema['@type'] === 'TouristAttraction');
  if (!attraction?.geo || !attraction?.containedInPlace) errors.push('TouristAttraction mist geo of containedInPlace');

  const anchors = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const sponsored = anchors.filter((tag) => attr(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (sponsored.length < 3) errors.push(`slechts ${sponsored.length} sponsored Klook-uitgangen`);
  for (const tag of sponsored) {
    const href = decodeHtml(attr(tag, 'href') || '');
    const rel = attr(tag, 'rel')?.split(/\s+/) || [];
    if (!/klook\.com|klook\.tpo\.lv/.test(href)) errors.push('attractie-affiliatelink is niet van Klook of het ingestelde Klook-redirectdomein');
    if (!['nofollow', 'noopener', 'noreferrer', 'sponsored'].every((value) => rel.includes(value))) errors.push('affiliatelink mist vereist rel-attribuut');
  }
  if (!text.toLowerCase().includes('affiliatelink')) errors.push('affiliate-uitleg ontbreekt');
  if (anchors.some((tag) => /\/go\//.test(attr(tag, 'href') || ''))) errors.push('tempelintentie is verwaterd met Amazon-productlinks');

  const internal = anchors.flatMap((tag) => {
    const href = attr(tag, 'href');
    if (!href || href.startsWith('#')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      return url.hostname === new URL(publicOrigin).hostname ? [{ path: normalizedPath(url.toString()), label: visibleText(tag) }] : [];
    } catch { return []; }
  });
  for (const required of config.requiredLinks) if (!internal.some((link) => link.path === required)) errors.push(`clusterlink naar ${required} ontbreekt`);
  const descriptive = internal.filter((link) => link.path !== config.route && link.label.length >= 6 && !/^(lees meer|klik hier)$/i.test(link.label));
  if (descriptive.length < 7) errors.push(`slechts ${descriptive.length} beschrijvende interne links`);
  for (const path of [...new Set(internal.map((link) => link.path))].filter((path) => path.startsWith('/nl/') && !path.includes('/go/'))) {
    const linked = await fetch(new URL(path, baseUrl), { redirect: 'follow' });
    if (linked.status >= 400) errors.push(`interne link ${path} geeft HTTP ${linked.status}`);
  }

  const sourceLinks = anchors.filter((tag) => /^https?:\/\//.test(decodeHtml(attr(tag, 'href') || '')) && !attr(tag, 'rel')?.includes('sponsored') && !/go2-thailand|googleapis|gstatic|instagram/.test(attr(tag, 'href') || ''));
  if (sourceLinks.length < 3) errors.push(`slechts ${sourceLinks.length} redactionele bronlinks`);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (images.length < 7) errors.push(`slechts ${images.length} visuele instanties`);
  if (images.some((tag) => attr(tag, 'alt') === undefined)) errors.push('afbeelding zonder alt-attribuut');
  const localAssets = [...new Set(images.flatMap((tag) => [attr(tag, 'src') || '', attr(tag, 'srcset') || '']).flatMap((candidate) => [...decodeURIComponent(decodeHtml(candidate)).matchAll(/\/images\/[A-Za-z0-9_./%()-]+\.(?:webp|avif|png|jpe?g)/gi)].map((match) => match[0])))];
  for (const asset of localAssets) if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);
  const bannerPath = resolve(projectRoot, 'public', 'images', 'redesign', config.banner);
  if (!existsSync(bannerPath)) errors.push(`featurebanner ontbreekt: ${config.banner}`);
  else if (statSync(bannerPath).size > 300_000) errors.push(`featurebanner ${config.banner} is onvoldoende geoptimaliseerd`);

  const stem = researchStem(config.route);
  for (const family of ['rankings', 'backlinks']) for (const extension of ['json', 'md']) {
    if (!existsSync(resolve(SEO_ROOT, 'research', 'nl', family, `${stem}.${extension}`))) errors.push(`${family}-bewijs ontbreekt`);
  }
  const rankingMd = resolve(SEO_ROOT, 'research', 'nl', 'rankings', `${stem}.md`);
  if (existsSync(rankingMd)) {
    const evidence = readFileSync(rankingMd, 'utf8').toLowerCase();
    if (!evidence.includes(config.rankingKeyword) || !evidence.includes(`| ${config.rankingPosition} |`)) errors.push('rankingbewijs mist actief keyword of positie');
  }
  return { route: config.route, status: response.status, errors };
}

async function main(): Promise<void> {
  const rowMap = new Map(rows().map((row) => [normalizedPath(row.route), row]));
  const results = await Promise.all(configs.map((config) => inspect(config, rowMap.get(config.route) || { route: config.route, status: '', notes: '' })));
  const failures = results.filter((result) => result.errors.length);
  console.log(`NL attraction-detail verification: ${configs.length - failures.length}/${configs.length} owners groen op ${baseUrl}.`);
  console.log('DFS/PAA, rankingbehoud, metadata, landmarks, schema, Klook, bronnen, clusterlinks en featurebeelden gecontroleerd.');
  for (const result of failures) {
    console.error(`\n${result.route}${result.status ? ` (HTTP ${result.status})` : ''}`);
    for (const error of result.errors) console.error(`  - ${error}`);
  }
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
