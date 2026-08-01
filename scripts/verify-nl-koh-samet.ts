import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCsvLine, SEO_ROOT } from './seo-utils';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const owner = '/nl/islands/koh-samet/';
const legacy = '/nl/city/rayong/attractions/koh-samet/';
const researchDate = '2026-07-26';

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

function schemas(html: string, errors: string[]): Array<Record<string, unknown>> {
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

function researchStem(route: string): string {
  return `${researchDate}-go2-thailand-com-${route.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-')}`;
}

async function main(): Promise<void> {
  const errors: string[] = [];
  const response = await fetch(new URL(owner, baseUrl), { redirect: 'follow' });
  const html = await response.text();
  const text = visibleText(html);
  if (response.status !== 200) errors.push(`owner geeft HTTP ${response.status}`);
  if (normalizedPath(response.url) !== owner) errors.push(`owner redirect onverwacht naar ${normalizedPath(response.url)}`);

  const csvLines = readFileSync(resolve(SEO_ROOT, 'keywords-nl.csv'), 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(csvLines[0]);
  const rows = csvLines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] || '']));
  });
  const row = rows.find((item) => normalizedPath(item.route) === owner);
  if (!row) errors.push('ContentOps-row ontbreekt');
  else {
    if (row.status !== 'implemented') errors.push(`ContentOps-status is ${row.status}`);
    if (!/DFS/i.test(row.notes) || !/PAA/i.test(row.notes) || !/twee actieve rankings/i.test(row.notes)) errors.push('ContentOps-note mist DFS/PAA- of legacy-rankingbesluit');
  }

  const legacyResponse = await fetch(new URL(legacy, baseUrl), { redirect: 'manual' });
  if (![301, 308].includes(legacyResponse.status)) errors.push(`legacy geeft HTTP ${legacyResponse.status} in plaats van permanente redirect`);
  if (normalizedPath(legacyResponse.headers.get('location') || '/') !== owner) errors.push('legacyredirect wijst niet naar de eilandowner');

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (attr(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');
  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!/koh samet/i.test(title)) errors.push(`title mist Koh Samet: ${title}`);
  if (title.length < 40 || title.length > 70) errors.push(`titlelengte ${title.length} valt buiten 40-70`);
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((tag) => attr(tag, 'name')?.toLowerCase() === 'description');
  const metaLength = decodeHtml(attr(meta || '', 'content') || '').length;
  if (metaLength < 120 || metaLength > 180) errors.push(`meta descriptionlengte ${metaLength} valt buiten 120-180`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push('pagina heeft niet exact één H1');
  if ((html.match(/<main\b/gi) || []).length !== 1) errors.push('pagina heeft niet exact één main-landmark');
  if ((html.match(/<section\b/gi) || []).length < 13) errors.push('pagina heeft minder dan dertien inhoudssecties');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < 1800) errors.push(`slechts ${wordCount} zichtbare woorden`);
  for (const marker of ['Is Koh Samet de moeite waard voor jouw reis?', 'Een eerste Koh Samet-route met ruimte om niets te doen', 'Plan het weekend bewust', 'Veelgestelde vragen over Koh Samet']) {
    if (!text.includes(marker)) errors.push(`inhoudsmarker ontbreekt: ${marker}`);
  }

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonical = linkTags.find((tag) => attr(tag, 'rel')?.split(/\s+/).includes('canonical'));
  if (normalizedPath(attr(canonical || '', 'href') || '/') !== owner) errors.push('self-canonical ontbreekt of is onjuist');
  const hreflangs = linkTags.filter((tag) => attr(tag, 'rel')?.split(/\s+/).includes('alternate')).map((tag) => attr(tag, 'hreflang'));
  for (const required of ['en', 'nl', 'x-default']) if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);

  const schemaValues = schemas(html, errors);
  const schemaTypes = new Set(schemaValues.map((schema) => String(schema['@type'] || '')));
  for (const required of ['Organization', 'TouristDestination', 'ItemList', 'FAQPage', 'BreadcrumbList', 'WebPage']) if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  const webPage = schemaValues.find((schema) => schema['@type'] === 'WebPage');
  if (webPage?.inLanguage !== 'nl-NL') errors.push('WebPage.inLanguage is niet nl-NL');
  if (normalizedPath(String(webPage?.url || '/')) !== owner) errors.push('WebPage.url is onjuist');
  if (String(webPage?.dateModified || '') !== researchDate) errors.push(`dateModified is ${String(webPage?.dateModified || 'leeg')}`);
  const breadcrumb = schemaValues.find((schema) => schema['@type'] === 'BreadcrumbList');
  const breadcrumbItems = Array.isArray(breadcrumb?.itemListElement) ? breadcrumb.itemListElement as Array<Record<string, unknown>> : [];
  if (breadcrumbItems[1]?.name !== 'Eilanden' || normalizedPath(String(breadcrumbItems[1]?.item || '/')) !== '/nl/islands/') errors.push('breadcrumbschema wijst niet naar Eilanden');

  const anchors = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const sponsored = anchors.filter((tag) => attr(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (sponsored.length < 5) errors.push(`slechts ${sponsored.length} sponsored uitgangen`);
  for (const tag of sponsored) {
    const rel = attr(tag, 'rel')?.split(/\s+/) || [];
    if (!['nofollow', 'noopener', 'noreferrer', 'sponsored'].every((value) => rel.includes(value))) errors.push('affiliatelink mist vereist rel-attribuut');
  }
  if (!text.toLowerCase().includes('affiliate')) errors.push('affiliate-uitleg ontbreekt');
  if (anchors.some((tag) => /\/go\//.test(attr(tag, 'href') || ''))) errors.push('brede eilandowner is onnodig verwaterd met Amazon-productlinks');

  const internal = anchors.flatMap((tag) => {
    const href = attr(tag, 'href');
    if (!href || href.startsWith('#')) return [];
    try {
      const url = new URL(decodeHtml(href), publicOrigin);
      return url.hostname === new URL(publicOrigin).hostname ? [{ path: normalizedPath(url.toString()), label: visibleText(tag) }] : [];
    } catch { return []; }
  });
  for (const required of ['/nl/city/rayong/', '/nl/transport/', '/nl/weather/']) if (!internal.some((link) => link.path === required)) errors.push(`clusterlink naar ${required} ontbreekt`);
  if (internal.some((link) => link.path === '/nl/city/koh-samet/food/')) errors.push('pagina linkt naar niet-bestaande Koh Samet-foodroute');
  const descriptive = internal.filter((link) => link.path !== owner && link.label.length >= 6 && !/^(lees meer|klik hier)$/i.test(link.label));
  if (descriptive.length < 8) errors.push(`slechts ${descriptive.length} beschrijvende interne links`);
  for (const path of [...new Set(internal.map((link) => link.path))].filter((path) => path.startsWith('/nl/') && !path.includes('/go/'))) {
    const linked = await fetch(new URL(path, baseUrl), { redirect: 'follow' });
    if (linked.status >= 400) errors.push(`interne link ${path} geeft HTTP ${linked.status}`);
  }

  const sourceLinks = anchors.filter((tag) => /^https?:\/\//.test(decodeHtml(attr(tag, 'href') || '')) && /tourismthailand\.org/.test(attr(tag, 'href') || ''));
  if (sourceLinks.length < 3) errors.push(`slechts ${sourceLinks.length} officiële TAT-bronlinks`);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (images.length < 17) errors.push(`slechts ${images.length} visuele instanties`);
  if (images.some((tag) => attr(tag, 'alt') === undefined)) errors.push('afbeelding zonder alt-attribuut');
  const localAssets = [...new Set(images.flatMap((tag) => [attr(tag, 'src') || '', attr(tag, 'srcset') || '']).flatMap((candidate) => [...decodeURIComponent(decodeHtml(candidate)).matchAll(/\/images\/[A-Za-z0-9_./%()-]+\.(?:webp|avif|png|jpe?g)/gi)].map((match) => match[0])))];
  if (localAssets.length < 7) errors.push(`slechts ${localAssets.length} unieke beeldassets`);
  for (const asset of localAssets) if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);
  for (const generated of ['koh-samet-ao-phai-morning.webp', 'koh-samet-weekday-banner.webp', 'koh-samet-sea-conditions.webp']) {
    const file = resolve(projectRoot, 'public', 'images', 'redesign', generated);
    if (!existsSync(file)) errors.push(`nieuw beeld ontbreekt: ${generated}`);
    else if (statSync(file).size > 300_000) errors.push(`nieuw beeld ${generated} is onvoldoende geoptimaliseerd`);
  }

  for (const route of [owner, legacy]) {
    const stem = researchStem(route);
    for (const family of ['rankings', 'backlinks']) for (const extension of ['json', 'md']) {
      if (!existsSync(resolve(SEO_ROOT, 'research', 'nl', family, `${stem}.${extension}`))) errors.push(`${family}-bewijs voor ${route} ontbreekt`);
    }
  }
  const legacyRanking = resolve(SEO_ROOT, 'research', 'nl', 'rankings', `${researchStem(legacy)}.json`);
  if (!readFileSync(legacyRanking, 'utf8').includes('ko samet')) errors.push('legacy-rankingbewijs bevat het actieve zoekwoord niet');

  if (errors.length) {
    console.error(`NL Koh Samet verification: 0/1 owner groen op ${baseUrl}.`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`NL Koh Samet verification: 1/1 owner groen op ${baseUrl}.`);
    console.log('DFS/PAA, legacy-rankingoverdracht, redirect, metadata, schema, affiliates, links, bronnen en zeven unieke assets gecontroleerd.');
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
