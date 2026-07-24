import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROJECT_ROOT, readKeywordCsv } from './seo-utils';

const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const concurrency = Math.max(1, Number(process.env.SITE_VERIFY_CONCURRENCY || 6));

interface RouteResult {
  route: string;
  keywords: string[];
  errors: string[];
  status?: number;
}

function getAttribute(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function normalizedPathUrl(value: string): string {
  const parsed = new URL(value, publicOrigin);
  const pathname = parsed.pathname === '/' ? '/' : `${parsed.pathname.replace(/\/+$/, '')}/`;
  return `${parsed.origin}${pathname}`;
}

function collectMarkdown(directory: string): string {
  if (!existsSync(directory)) return '';
  return readdirSync(directory).flatMap(entry => {
    const path = resolve(directory, entry);
    if (statSync(path).isDirectory()) return [collectMarkdown(path)];
    return entry.endsWith('.md') ? [readFileSync(path, 'utf8')] : [];
  }).join('\n');
}

function decodeJsonScript(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function inspectRoute(route: string, keywords: string[], auditText: string): Promise<RouteResult> {
  const errors: string[] = [];
  let response: Response;
  try {
    response = await fetch(new URL(route, baseUrl), { redirect: 'follow' });
  } catch (error) {
    return { route, keywords, errors: [`fetch mislukt: ${error instanceof Error ? error.message : String(error)}`] };
  }

  const html = await response.text();
  const finalPath = new URL(response.url).pathname;
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (finalPath !== route) errors.push(`onverwachte redirect naar ${finalPath}`);

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (getAttribute(htmlTag, 'lang') !== 'nl') errors.push('html[lang] is niet nl');

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) errors.push('title ontbreekt');

  const descriptionTag = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map(match => match[0])
    .find(tag => getAttribute(tag, 'name')?.toLowerCase() === 'description');
  if (!descriptionTag || !getAttribute(descriptionTag, 'content')?.trim()) errors.push('meta description ontbreekt');

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`verwacht 1 H1, gevonden ${h1Count}`);

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => match[0]);
  const canonicalTag = linkTags.find(tag => getAttribute(tag, 'rel')?.toLowerCase().split(/\s+/).includes('canonical'));
  const canonical = canonicalTag && getAttribute(canonicalTag, 'href');
  const expectedCanonical = normalizedPathUrl(new URL(route, publicOrigin).toString());
  if (!canonical) errors.push('canonical ontbreekt');
  else if (normalizedPathUrl(canonical) !== expectedCanonical) errors.push(`canonical wijst naar ${canonical}`);

  const hreflangs = linkTags
    .filter(tag => getAttribute(tag, 'rel')?.toLowerCase().split(/\s+/).includes('alternate'))
    .map(tag => getAttribute(tag, 'hreflang'))
    .filter((value): value is string => Boolean(value));
  for (const required of ['nl', 'x-default']) {
    if (!hreflangs.includes(required)) errors.push(`hreflang ${required} ontbreekt`);
  }

  const jsonScripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!jsonScripts.length) errors.push('JSON-LD ontbreekt');
  for (const [, json] of jsonScripts) {
    try {
      JSON.parse(decodeJsonScript(json));
    } catch {
      errors.push('ongeldige JSON-LD');
      break;
    }
  }

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
  const imagesWithoutAlt = imageTags.filter(tag => getAttribute(tag, 'alt') === undefined).length;
  if (imagesWithoutAlt) errors.push(`${imagesWithoutAlt} afbeelding(en) zonder alt-attribuut`);

  if (!auditText.includes(`\`${route}\``)) errors.push('route ontbreekt in acceptance-audit');

  return { route, keywords, errors, status: response.status };
}

async function main(): Promise<void> {
  const { rows } = readKeywordCsv('nl');
  const owners = new Map<string, string[]>();
  for (const row of rows) {
    if (!row.route.startsWith('/nl/')) throw new Error(`NL-owner heeft ongeldige route: ${row.route}`);
    owners.set(row.route, [...(owners.get(row.route) || []), row.primary_keyword]);
  }

  const auditText = collectMarkdown(resolve(PROJECT_ROOT, 'seo', 'audits'));
  const queue = [...owners.entries()];
  const results: RouteResult[] = [];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const [route, keywords] = queue.shift()!;
      results.push(await inspectRoute(route, keywords, auditText));
    }
  });
  await Promise.all(workers);

  results.sort((a, b) => a.route.localeCompare(b.route));
  const failed = results.filter(result => result.errors.length);
  console.log(`NL owner runtime verification: ${results.length - failed.length}/${results.length} routes groen op ${baseUrl}.`);
  for (const result of failed) {
    console.error(`\n${result.route} (${result.keywords.join(' | ')})`);
    for (const error of result.errors) console.error(`  - ${error}`);
  }
  if (failed.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
