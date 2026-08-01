import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const concurrency = Math.max(1, Number(process.env.SITE_VERIFY_CONCURRENCY || 4));

interface VisaRoute {
  route: string;
  titleNeedle: string;
  officialHosts: string[];
  assets: string[];
}

interface RouteResult {
  route: string;
  status?: number;
  errors: string[];
}

const visaRoutes: VisaRoute[] = [
  {
    route: '/nl/visa/',
    titleNeedle: 'Visum Thailand',
    officialHosts: ['www.nederlandwereldwijd.nl', 'www.mfa.go.th', 'tdac.immigration.go.th'],
    assets: ['/images/redesign/thailand-visa-hero.webp', '/images/redesign/thailand-visa-rule-watch.webp', '/images/redesign/thailand-entry-documents.webp'],
  },
  {
    route: '/nl/visa/digital-arrival-card/',
    titleNeedle: 'TDAC Thailand',
    officialHosts: ['tdac.immigration.go.th', 'www.nederlandwereldwijd.nl'],
    assets: ['/images/redesign/thailand-tdac-hero.webp', '/images/redesign/thailand-tdac-form-flow.webp'],
  },
  {
    route: '/nl/visa/digital-nomad-visa/',
    titleNeedle: 'DTV visa Thailand',
    officialHosts: ['hague.thaiembassy.org', 'image.mfa.go.th'],
    assets: ['/images/redesign/thailand-dtv-hero.webp', '/images/redesign/thailand-dtv-proof-routes.webp'],
  },
  {
    route: '/nl/visa/retirement-visa/',
    titleNeedle: 'Pensioenvisum Thailand',
    officialHosts: ['hague.thaiembassy.org', 'www.immigration.go.th'],
    assets: ['/images/redesign/thailand-retirement-visa-hero.webp', '/images/redesign/thailand-retirement-visa-routes.webp', '/images/redesign/thailand-retirement-after-arrival.webp'],
  },
  {
    route: '/nl/visa/tourist-visa/',
    titleNeedle: 'Toeristenvisum Thailand',
    officialHosts: ['hague.thaiembassy.org', 'www.nederlandwereldwijd.nl'],
    assets: ['/images/redesign/thailand-tourist-visa-hero.webp', '/images/redesign/thailand-tourist-visa-routes.webp'],
  },
  {
    route: '/nl/visa/visa-extension/',
    titleNeedle: 'Visum Thailand verlengen',
    officialHosts: ['www.immigration.go.th'],
    assets: ['/images/redesign/thailand-visa-extension-hero.webp', '/images/redesign/thailand-visa-extension-documents.webp'],
  },
  {
    route: '/nl/visa/education-visa/',
    titleNeedle: 'Studievisum Thailand',
    officialHosts: ['hague.thaiembassy.org', 'uttaradit.immigration.go.th'],
    assets: ['/images/redesign/thailand-education-visa-hero.webp', '/images/redesign/thailand-education-visa-routes.webp'],
  },
  {
    route: '/nl/visa/ltr-visa/',
    titleNeedle: 'Thailand LTR Visa',
    officialHosts: ['ltr.boi.go.th', 'hague.thaiembassy.org'],
    assets: ['/images/redesign/thailand-ltr-visa-hero.webp', '/images/redesign/thailand-ltr-visa-routes.webp'],
  },
  {
    route: '/nl/visa/thailand-elite-visa/',
    titleNeedle: 'Thailand Elite Visa',
    officialHosts: ['www.thailandprivilege.co.th', 'cms.thailandprivilege.co.th'],
    assets: ['/images/redesign/thailand-privilege-hero.webp', '/images/redesign/thailand-privilege-tiers.webp'],
  },
];

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

async function inspectRoute(config: VisaRoute): Promise<RouteResult> {
  const errors: string[] = [];
  let response: Response;
  try {
    response = await fetch(new URL(config.route, baseUrl), { redirect: 'follow' });
  } catch (error) {
    return { route: config.route, errors: [`fetch mislukt: ${error instanceof Error ? error.message : String(error)}`] };
  }

  const html = await response.text();
  const finalPath = normalizedPath(response.url);
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (finalPath !== config.route) errors.push(`onverwachte redirect naar ${finalPath}`);

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (getAttribute(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');

  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!title.toLocaleLowerCase('nl-NL').includes(config.titleNeedle.toLocaleLowerCase('nl-NL'))) errors.push(`title mist hoofdintentie: ${title || 'ontbreekt'}`);
  if (title.length < 35 || title.length > 68) errors.push(`titlelengte ${title.length} valt buiten 35-68`);

  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
  const description = metaTags
    .map(tag => ({ name: getAttribute(tag, 'name')?.toLowerCase(), content: getAttribute(tag, 'content') }))
    .find(meta => meta.name === 'description')?.content;
  const descriptionLength = decodeHtml(description || '').length;
  if (descriptionLength < 100 || descriptionLength > 175) errors.push(`meta descriptionlengte ${descriptionLength} valt buiten 100-175`);

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const mainCount = (html.match(/<main\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`verwacht 1 H1, gevonden ${h1Count}`);
  if (mainCount !== 1) errors.push(`verwacht 1 main-landmark, gevonden ${mainCount}`);

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => match[0]);
  const canonical = linkTags.find(tag => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'));
  const canonicalHref = getAttribute(canonical || '', 'href');
  if (!canonicalHref || normalizedPath(canonicalHref) !== config.route) errors.push(`self-canonical ontbreekt of is onjuist: ${canonicalHref || 'ontbreekt'}`);
  const hreflangs = linkTags
    .filter(tag => getAttribute(tag, 'rel')?.split(/\s+/).includes('alternate'))
    .map(tag => getAttribute(tag, 'hreflang'))
    .filter((value): value is string => Boolean(value));
  for (const required of ['en', 'nl', 'x-default']) {
    if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);
  }

  const schemas = collectSchemas(html, errors);
  const schemaTypes = new Set(schemas.map(schema => String(schema['@type'] || '')));
  for (const required of ['Organization', 'WebPage', 'BreadcrumbList', 'FAQPage']) {
    if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  }
  const webPage = schemas.find(schema => schema['@type'] === 'WebPage');
  if (webPage?.dateModified !== '2026-07-26') errors.push('WebPage.dateModified is niet 2026-07-26');
  if (webPage?.inLanguage !== 'nl-NL') errors.push('WebPage.inLanguage is niet nl-NL');
  if (normalizedPath(String(webPage?.url || '')) !== config.route) errors.push('WebPage.url ontbreekt of is onjuist');
  const faq = schemas.find(schema => schema['@type'] === 'FAQPage');
  const faqCount = Array.isArray(faq?.mainEntity) ? faq.mainEntity.length : 0;
  if (faqCount < 5) errors.push(`FAQPage heeft slechts ${faqCount} vragen`);

  const anchorTags = [...html.matchAll(/<a\b[^>]*>/gi)].map(match => match[0]);
  const sponsored = anchorTags.filter(tag => getAttribute(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (!sponsored.length) errors.push('transparante affiliate-uitgang ontbreekt');
  for (const tag of sponsored) {
    const rel = getAttribute(tag, 'rel')?.split(/\s+/) || [];
    if (!rel.includes('nofollow') || !rel.includes('noopener') || !rel.includes('noreferrer')) errors.push('affiliate-link mist vereist rel-attribuut');
  }

  const hrefs = anchorTags.map(tag => getAttribute(tag, 'href')).filter((value): value is string => Boolean(value));
  const siblingRoutes = new Set(hrefs
    .map(href => {
      try { return normalizedPath(href); } catch { return ''; }
    })
    .filter(path => path.startsWith('/nl/visa/') && path !== config.route));
  if (siblingRoutes.size < 2) errors.push(`slechts ${siblingRoutes.size} natuurlijke links naar andere visumowners`);

  for (const host of config.officialHosts) {
    const hasOfficialLink = hrefs.some(href => {
      try { return new URL(decodeHtml(href), publicOrigin).hostname === host; } catch { return false; }
    });
    if (!hasOfficialLink) errors.push(`officiële bronlink ontbreekt: ${host}`);
  }

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
  const imagesWithoutAlt = imageTags.filter(tag => getAttribute(tag, 'alt') === undefined).length;
  if (imagesWithoutAlt) errors.push(`${imagesWithoutAlt} afbeelding(en) zonder alt-attribuut`);
  for (const asset of config.assets) {
    if (!existsSync(resolve(projectRoot, 'public', asset.replace(/^\//, '')))) errors.push(`asset ontbreekt: ${asset}`);
    if (!html.includes(asset) && !html.includes(encodeURIComponent(asset))) errors.push(`asset wordt niet gerenderd: ${asset}`);
  }

  if (html.includes('Broncontrole · 24 juli 2026') || html.includes('Actuele status · 24 juli 2026')) errors.push('verouderde zichtbare broncontroledatum');
  if (!html.toLowerCase().includes('affiliate')) errors.push('affiliate-uitleg ontbreekt');

  return { route: config.route, status: response.status, errors };
}

async function main(): Promise<void> {
  const queue = [...visaRoutes];
  const results: RouteResult[] = [];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const route = queue.shift();
      if (route) results.push(await inspectRoute(route));
    }
  });
  await Promise.all(workers);
  results.sort((a, b) => a.route.localeCompare(b.route));

  const failed = results.filter(result => result.errors.length);
  console.log(`NL visa-family verification: ${results.length - failed.length}/${results.length} routes groen op ${baseUrl}.`);
  console.log(`Officiële-bron-, PAA-, schema-, affiliate-, asset- en interne-linkdekking gecontroleerd voor ${results.length} owners.`);
  for (const result of failed) {
    console.error(`\n${result.route}`);
    for (const error of result.errors) console.error(`  - ${error}`);
  }
  if (failed.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
