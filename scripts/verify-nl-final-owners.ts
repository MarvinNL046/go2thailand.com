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
  titleNeedle: string;
  schemas: string[];
  ownerSchema: 'WebPage' | 'Article';
  minWords: number;
  minSections: number;
  minImages: number;
  minSponsored: number;
  amazonLinks: number;
  affiliateKinds: Array<'amazon' | 'trip' | '12go' | 'klook'>;
  minSources: number;
  requiredLinks: string[];
  markers: string[];
}

const configs: Config[] = [
  {
    route: '/nl/is-thailand-safe/', titleNeedle: 'is thailand veilig', schemas: ['Organization', 'WebPage', 'FAQPage', 'BreadcrumbList'], ownerSchema: 'WebPage',
    minWords: 1250, minSections: 13, minImages: 8, minSponsored: 3, amazonLinks: 0, affiliateKinds: ['trip', '12go', 'klook'], minSources: 4,
    requiredLinks: ['/nl/practical-info/scams-safety/', '/nl/transport/', '/nl/weather/'],
    markers: ['Go2Thailand vervangt het reisadvies niet.', 'Prioriteer wat je werkelijk kunt beïnvloeden.', 'Maak je veiligheidsplan af in tien minuten.', 'Veelgestelde vragen over veilig reizen'],
  },
  {
    route: '/nl/compare/phuket-vs-krabi/', titleNeedle: 'phuket of krabi', schemas: ['Organization', 'WebPage', 'ItemList', 'FAQPage', 'BreadcrumbList'], ownerSchema: 'WebPage',
    minWords: 1600, minSections: 13, minImages: 8, minSponsored: 6, amazonLinks: 0, affiliateKinds: ['trip', '12go', 'klook'], minSources: 4,
    requiredLinks: ['/nl/city/phuket/', '/nl/city/krabi/', '/nl/best-hotels/krabi/', '/nl/transport/'],
    markers: ['De beste keuze in één minuut', 'Phuket vs Krabi', 'Voor wie wint welke bestemming?', 'Veelgestelde vragen over Phuket of Krabi'],
  },
  {
    route: '/nl/blog/el-nino-2026-thailand-weather-heatwave-travel-tips/', titleNeedle: 'el niño 2026', schemas: ['Organization', 'Article', 'WebPage', 'FAQPage', 'BreadcrumbList'], ownerSchema: 'Article',
    minWords: 1450, minSections: 14, minImages: 8, minSponsored: 4, amazonLinks: 4, affiliateKinds: ['amazon'], minSources: 4,
    requiredLinks: ['/nl/weather/', '/nl/thailand-in/july/', '/nl/travel-gear/'],
    markers: ['Je reis hoeft niet van tafel', 'Klimaat geeft de kans. Lokaal weer bepaalt de dag.', 'Drie dagplannen, één flexibele reis', 'Veelgestelde vragen over El Niño en Thailand in 2026'],
  },
];

const aliases = [
  { source: '/nl/thailand-index/safety/', destination: '/nl/is-thailand-safe/' },
  { source: '/nl/blog/is-thailand-safe-tourists-2026/', destination: '/nl/is-thailand-safe/' },
];

function decodeHtml(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&ntilde;/g, 'ñ').replace(/&eacute;/g, 'é').replace(/&oacute;/g, 'ó');
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

function affiliateKind(href: string, kind: Config['affiliateKinds'][number]): boolean {
  if (kind === 'amazon') return /\/go\//.test(href);
  if (kind === 'trip') return /trip\.tpo\.lv|trip\.com/.test(href);
  if (kind === '12go') return /12go\.tpo\.lv|12go\.asia/.test(href);
  return /klook\.tpo\.lv|klook\.com/.test(href);
}

async function checkInternalLinks(paths: string[], errors: string[]): Promise<void> {
  const queue = [...new Set(paths)].filter((path) => path.startsWith('/nl/') && !path.includes('/go/'));
  const workers = Array.from({ length: Math.min(6, queue.length) }, async () => {
    while (queue.length) {
      const path = queue.shift();
      if (!path) continue;
      try {
        const response = await fetch(new URL(path, baseUrl), { redirect: 'follow' });
        if (response.status >= 400) errors.push(`interne link ${path} geeft HTTP ${response.status}`);
      } catch (error) { errors.push(`interne link ${path} niet controleerbaar: ${String(error)}`); }
    }
  });
  await Promise.all(workers);
}

async function inspect(config: Config, row: KeywordRow): Promise<{ route: string; errors: string[] }> {
  const errors: string[] = [];
  const response = await fetch(new URL(config.route, baseUrl), { redirect: 'follow' });
  const html = await response.text();
  const text = visibleText(html);
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (normalizedPath(response.url) !== config.route) errors.push(`onverwachte redirect naar ${normalizedPath(response.url)}`);
  if (row.status !== 'implemented') errors.push(`ContentOps-status is ${row.status || 'leeg'}`);
  if (!/DFS/i.test(row.notes) || !/PAA/i.test(row.notes) || !/2026-07-26/.test(row.notes)) errors.push('ContentOps-note mist DFS/PAA of verse owneraudit');

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (attr(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');
  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!title.toLowerCase().includes(config.titleNeedle)) errors.push(`title mist ${config.titleNeedle}: ${title}`);
  if (title.length < 38 || title.length > 70) errors.push(`titlelengte ${title.length} valt buiten 38-70`);
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((tag) => attr(tag, 'name')?.toLowerCase() === 'description');
  const metaLength = decodeHtml(attr(meta || '', 'content') || '').length;
  if (metaLength < 115 || metaLength > 180) errors.push(`meta descriptionlengte ${metaLength} valt buiten 115-180`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push('pagina heeft niet exact één H1');
  if ((html.match(/<main\b/gi) || []).length !== 1) errors.push('pagina heeft niet exact één main-landmark');
  if ((html.match(/<section\b/gi) || []).length < config.minSections) errors.push(`pagina heeft minder dan ${config.minSections} inhoudssecties`);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < config.minWords) errors.push(`slechts ${wordCount} zichtbare woorden`);
  for (const marker of config.markers) if (!text.includes(marker)) errors.push(`inhoudsmarker ontbreekt: ${marker}`);

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonical = linkTags.find((tag) => attr(tag, 'rel')?.split(/\s+/).includes('canonical'));
  if (normalizedPath(attr(canonical || '', 'href') || '/') !== config.route) errors.push('self-canonical ontbreekt of is onjuist');
  const hreflangs = linkTags.filter((tag) => attr(tag, 'rel')?.split(/\s+/).includes('alternate')).map((tag) => attr(tag, 'hreflang'));
  for (const required of ['en', 'nl', 'x-default']) if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);
  const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((tag) => attr(tag, 'name')?.toLowerCase() === 'robots');
  if (/noindex/i.test(attr(robots || '', 'content') || '')) errors.push('owner staat ten onrechte op noindex');

  const schemaValues = parseSchemas(html, errors);
  const schemaTypes = new Set(schemaValues.map((schema) => String(schema['@type'] || '')));
  for (const required of config.schemas) if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  const ownerSchema = schemaValues.find((schema) => schema['@type'] === config.ownerSchema);
  if (ownerSchema?.inLanguage !== 'nl-NL') errors.push(`${config.ownerSchema}.inLanguage is niet nl-NL`);
  const schemaUrl = String(ownerSchema?.url || ownerSchema?.mainEntityOfPage || '/');
  if (normalizedPath(schemaUrl) !== config.route) errors.push(`${config.ownerSchema}.url is onjuist`);
  const modifiedAt = Date.parse(String(ownerSchema?.dateModified || ''));
  const minimumModifiedAt = Date.parse(`${researchDate}T00:00:00Z`);
  if (!Number.isFinite(modifiedAt) || modifiedAt < minimumModifiedAt) errors.push(`dateModified is ${String(ownerSchema?.dateModified || 'leeg')}`);

  const anchors = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const sponsored = anchors.filter((tag) => attr(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (sponsored.length < config.minSponsored) errors.push(`slechts ${sponsored.length} sponsored uitgangen`);
  const sponsoredHrefs = sponsored.map((tag) => decodeHtml(attr(tag, 'href') || ''));
  for (const tag of sponsored) {
    const rel = attr(tag, 'rel')?.split(/\s+/) || [];
    if (!['nofollow', 'noopener', 'noreferrer', 'sponsored'].every((value) => rel.includes(value))) errors.push('affiliatelink mist vereist rel-attribuut');
  }
  for (const kind of config.affiliateKinds) if (!sponsoredHrefs.some((href) => affiliateKind(href, kind))) errors.push(`${kind}-affiliate-uitgang ontbreekt`);
  const amazonCount = sponsoredHrefs.filter((href) => /\/go\//.test(href)).length;
  if (amazonCount !== config.amazonLinks) errors.push(`verwacht ${config.amazonLinks} Amazon-uitgangen, vond ${amazonCount}`);
  if (!text.toLowerCase().includes('affiliate')) errors.push('affiliate-uitleg ontbreekt');

  const internal = anchors.flatMap((tag) => {
    const href = attr(tag, 'href');
    if (!href || href.startsWith('#')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      return url.hostname === new URL(publicOrigin).hostname ? [{ path: normalizedPath(url.toString()), label: visibleText(tag) }] : [];
    } catch { return []; }
  });
  for (const required of config.requiredLinks) if (!internal.some((link) => link.path === required)) errors.push(`clusterlink naar ${required} ontbreekt`);
  const descriptive = internal.filter((link) => link.path !== config.route && !link.path.includes('/go/') && link.label.length >= 6 && !/^(lees meer|klik hier)$/i.test(link.label));
  if (descriptive.length < 8) errors.push(`slechts ${descriptive.length} beschrijvende interne links`);
  await checkInternalLinks(internal.map((link) => link.path), errors);

  const sourceLinks = anchors.filter((tag) => /^https?:\/\//.test(decodeHtml(attr(tag, 'href') || '')) && !attr(tag, 'rel')?.includes('sponsored') && !/go2-thailand|googleapis|gstatic|instagram/.test(attr(tag, 'href') || ''));
  if (sourceLinks.length < config.minSources) errors.push(`slechts ${sourceLinks.length} redactionele bronlinks`);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (images.length < config.minImages) errors.push(`slechts ${images.length} visuele instanties`);
  if (images.some((tag) => attr(tag, 'alt') === undefined)) errors.push('afbeelding zonder alt-attribuut');
  const localAssets = [...new Set(images.flatMap((tag) => [attr(tag, 'src') || '', attr(tag, 'srcset') || '']).flatMap((candidate) => [...decodeURIComponent(decodeHtml(candidate)).matchAll(/\/images\/[A-Za-z0-9_./%() -]+\.(?:webp|avif|png|jpe?g)/gi)].map((match) => match[0])))];
  for (const asset of localAssets) if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);

  const stem = researchStem(config.route);
  for (const family of ['rankings', 'backlinks']) for (const extension of ['json', 'md']) {
    if (!existsSync(resolve(SEO_ROOT, 'research', 'nl', family, `${stem}.${extension}`))) errors.push(`${family}-bewijs ontbreekt`);
  }
  if (config.route === '/nl/is-thailand-safe/') {
    const ranking = readFileSync(resolve(SEO_ROOT, 'research', 'nl', 'rankings', `${stem}.md`), 'utf8').toLowerCase();
    for (const signal of ['| is thailand veilig | 70 |', '| veiligheid thailand | 62 |', '| thailand veiligheid | 71 |']) if (!ranking.includes(signal)) errors.push(`rankingbehoud mist ${signal}`);
  }
  if (config.route.includes('/el-nino-') && !readFileSync(resolve(projectRoot, 'data', 'ga4-reports', 'latest.json'), 'utf8').includes('/nl/blog/el-nino-2026-thailand-weather-heatwave-travel-tips/')) errors.push('GA4-retentiesignaal ontbreekt');
  return { route: config.route, errors };
}

async function main(): Promise<void> {
  const rowMap = new Map(rows().map((row) => [normalizedPath(row.route), row]));
  const results = await Promise.all(configs.map((config) => inspect(config, rowMap.get(config.route) || { route: config.route, status: '', notes: '' })));
  for (const alias of aliases) {
    const response = await fetch(new URL(alias.source, baseUrl), { redirect: 'manual' });
    const location = response.headers.get('location') || '';
    if (![301, 308].includes(response.status) || normalizedPath(location) !== alias.destination) results.push({ route: alias.source, errors: [`verwacht permanente redirect naar ${alias.destination}, kreeg HTTP ${response.status} ${location}`] });
  }
  const retired = await fetch(new URL('/nl/compare/bangkok-vs-chiang-mai/', baseUrl));
  const retiredHtml = await retired.text();
  if (retired.status !== 200 || !/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(retiredHtml)) results.push({ route: '/nl/compare/bangkok-vs-chiang-mai/', errors: ['retired vergelijking is niet bereikbaar met noindex'] });

  const failures = results.filter((result) => result.errors.length);
  console.log(`NL final-owner verification: ${configs.length - results.slice(0, configs.length).filter((result) => result.errors.length).length}/${configs.length} owners groen op ${baseUrl}.`);
  console.log('DFS/PAA, rankingbehoud, GA4-retentie, metadata, schema, affiliates, bronnen, links, assets, consolidaties en comparison-noindex gecontroleerd.');
  for (const result of failures) {
    console.error(`\n${result.route}`);
    for (const error of result.errors) console.error(`  - ${error}`);
  }
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
