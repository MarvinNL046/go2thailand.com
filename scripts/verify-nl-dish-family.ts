import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { dutchDishProfiles, ingredientTranslations } from '../lib/nl-dish-profiles';
import unpairedRoutes from '../seo/inventory/unpaired-routes.json';

const projectRoot = resolve(__dirname, '..');
const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const concurrency = Math.max(1, Number(process.env.SITE_VERIFY_CONCURRENCY || 8));
const faqOwners = new Set(['pad-thai', 'som-tam', 'tom-yum-goong', 'khao-soi']);

interface DishRecord {
  slug: string;
  name: { en: string; nl?: string; thai?: string };
  category: string;
  image: string;
  ingredients?: string[];
}

interface RouteResult {
  slug: string;
  route: string;
  status?: number;
  errors: string[];
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

function canonicalUrl(route: string): string {
  return `${publicOrigin}${route}`;
}

function displayName(dish: DishRecord): string {
  return dish.name.nl || dish.name.en;
}

async function inspectDish(dish: DishRecord): Promise<RouteResult> {
  const route = `/nl/food/${dish.slug}/`;
  const errors: string[] = [];
  let response: Response;

  try {
    response = await fetch(new URL(route, baseUrl), { redirect: 'follow' });
  } catch (error) {
    return { slug: dish.slug, route, errors: [`fetch mislukt: ${error instanceof Error ? error.message : String(error)}`] };
  }

  const html = await response.text();
  const finalPath = new URL(response.url).pathname;
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (finalPath !== route) errors.push(`onverwachte redirect naar ${finalPath}`);

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (getAttribute(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');

  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
  if (!title.includes(displayName(dish))) errors.push(`title bevat de gerechtnaam niet: ${title || 'ontbreekt'}`);
  if (/\brecipe\b|\brecept\b/i.test(title)) errors.push(`title claimt receptintentie: ${title}`);
  if (title.length < 35 || title.length > 65) errors.push(`titlelengte ${title.length} valt buiten 35-65`);

  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
  const description = metaTags
    .map(tag => ({ name: getAttribute(tag, 'name')?.toLowerCase(), content: getAttribute(tag, 'content') }))
    .find(meta => meta.name === 'description')?.content;
  if (!description || decodeHtml(description).length < 100) errors.push('meta description ontbreekt of is te kort');

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const mainCount = (html.match(/<main\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`verwacht 1 H1, gevonden ${h1Count}`);
  if (mainCount !== 1) errors.push(`verwacht 1 main-landmark, gevonden ${mainCount}`);

  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => match[0]);
  const canonical = links.find(tag => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'));
  if (getAttribute(canonical || '', 'href') !== canonicalUrl(route)) errors.push('self-canonical ontbreekt of is onjuist');
  const hreflangs = links
    .filter(tag => getAttribute(tag, 'rel')?.split(/\s+/).includes('alternate'))
    .map(tag => getAttribute(tag, 'hreflang'))
    .filter((value): value is string => Boolean(value));
  const localeNeutralRoute = `/food/${dish.slug}/`;
  const isNlOnlyOwner = unpairedRoutes.nlOnly.includes(localeNeutralRoute);
  const requiredHreflangs = isNlOnlyOwner ? ['nl', 'x-default'] : ['en', 'nl', 'x-default'];
  for (const required of requiredHreflangs) {
    if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);
  }
  if (isNlOnlyOwner && hreflangs.includes('en')) {
    errors.push('hreflang en verwijst ten onrechte naar een niet-equivalente Engelse owner');
  }

  const schemas: Array<Record<string, unknown>> = [];
  const jsonScripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, rawJson] of jsonScripts) {
    try {
      const value = JSON.parse(decodeHtml(rawJson));
      if (Array.isArray(value)) schemas.push(...value);
      else schemas.push(value);
    } catch {
      errors.push('ongeldige JSON-LD');
    }
  }
  const schemaTypes = new Set(schemas.map(schema => String(schema['@type'] || '')));
  for (const required of ['Organization', 'Article', 'BreadcrumbList', 'ItemList']) {
    if (!schemaTypes.has(required)) errors.push(`${required}-schema ontbreekt`);
  }
  if (schemaTypes.has('Recipe')) errors.push('Recipe-schema mag niet zonder verifieerbaar recept');
  const hasFaq = schemaTypes.has('FAQPage');
  if (hasFaq !== faqOwners.has(dish.slug)) errors.push(`FAQ-schema komt niet overeen met echte PAA-status (${hasFaq})`);

  const article = schemas.find(schema => schema['@type'] === 'Article');
  if (article?.dateModified !== '2026-07-26') errors.push('Article.dateModified is niet 2026-07-26');
  if (article?.inLanguage !== 'nl-NL') errors.push('Article.inLanguage is niet nl-NL');

  const anchorTags = [...html.matchAll(/<a\b[^>]*>/gi)].map(match => match[0]);
  const sponsored = anchorTags.filter(tag => getAttribute(tag, 'rel')?.split(/\s+/).includes('sponsored'));
  if (sponsored.length !== 3) errors.push(`verwacht 3 transparante affiliate-uitgangen, gevonden ${sponsored.length}`);
  for (const tag of sponsored) {
    const rel = getAttribute(tag, 'rel')?.split(/\s+/) || [];
    if (!rel.includes('nofollow') || !rel.includes('noopener') || !rel.includes('noreferrer')) errors.push('affiliate-link mist rel-attribuut');
  }
  if (!html.includes('/go/simple-thai-food-cookbook/')) errors.push('Amazon-kookboekroute ontbreekt');
  const expectedTool = dish.category === 'dessert'
    ? '/go/zojirushi-six-cup-rice-cooker/'
    : '/go/thai-granite-mortar-eight-inch/';
  if (!html.includes(expectedTool)) errors.push(`contextuele Amazon-route ontbreekt: ${expectedTool}`);
  if (!html.includes('klook.tpo.lv') || !html.includes(`subid=dish-${dish.slug}-nl-cooking`)) errors.push('Klook-kooklesroute of dish-subid ontbreekt');

  const oldHeadings = ['Ingredients', 'Preparation', 'How to Enjoy', 'Where to Find'];
  for (const heading of oldHeadings) {
    if (new RegExp(`<h[1-6][^>]*>\\s*${heading}\\s*</h[1-6]>`, 'i').test(html)) errors.push(`oude Engelse sectie lekt: ${heading}`);
  }
  if (/<(?:h2|h3|p)[^>]*>[^<]*(?:฿|€)\s*\d+/i.test(html)) errors.push('ongedateerde vaste prijs gevonden');
  if (dish.name.thai && !html.includes('lang="th"')) errors.push('Thaise naam mist lang="th"');

  for (const ingredient of dish.ingredients || []) {
    const translation = ingredientTranslations[ingredient.toLowerCase()];
    if (!translation) errors.push(`ingrediëntvertaling ontbreekt: ${ingredient}`);
    else if (!decodeHtml(html).toLowerCase().includes(translation.toLowerCase())) errors.push(`vertaald ingrediënt ontbreekt in HTML: ${translation}`);
  }

  const imagePath = resolve(projectRoot, 'public', dish.image.replace(/^\//, ''));
  if (!existsSync(imagePath)) errors.push(`bronafbeelding ontbreekt: ${dish.image}`);
  if (!html.includes('alt=')) errors.push('afbeelding-alt ontbreekt');

  return { slug: dish.slug, route, status: response.status, errors };
}

async function main(): Promise<void> {
  const dishes = JSON.parse(readFileSync(resolve(projectRoot, 'data', 'food', 'index.json'), 'utf8')) as DishRecord[];
  const dataSlugs = new Set(dishes.map(dish => dish.slug));
  const profileSlugs = new Set(Object.keys(dutchDishProfiles));
  const setupErrors: string[] = [];
  for (const slug of dataSlugs) if (!profileSlugs.has(slug)) setupErrors.push(`profiel ontbreekt: ${slug}`);
  for (const slug of profileSlugs) if (!dataSlugs.has(slug)) setupErrors.push(`weesprofiel zonder gerecht: ${slug}`);
  if (setupErrors.length) throw new Error(setupErrors.join('\n'));

  const queue = [...dishes];
  const results: RouteResult[] = [];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const dish = queue.shift();
      if (dish) results.push(await inspectDish(dish));
    }
  });
  await Promise.all(workers);
  results.sort((a, b) => a.route.localeCompare(b.route));

  const failed = results.filter(result => result.errors.length);
  console.log(`NL dish-family verification: ${results.length - failed.length}/${results.length} routes groen op ${baseUrl}.`);
  console.log(`Profielen ${profileSlugs.size}/${dishes.length}; echte-PAA owners ${faqOwners.size}; overige routes zonder verzonnen FAQ ${dishes.length - faqOwners.size}.`);
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
