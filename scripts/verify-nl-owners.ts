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

interface LedgerRoute {
  locale?: string;
  path?: string;
  decisionStatus?: string;
  httpStatus?: number;
  designCoverage?: string;
  exactOwner?: boolean;
  proofState?: string;
}

function getAttribute(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function hasAttribute(tag: string, name: string): boolean {
  return new RegExp(`\\b${name}(?:\\s*=|\\s|/?>)`, 'i').test(tag);
}

function acceptedLedgerRoutes(): Set<string> {
  const ledgerPath = resolve(PROJECT_ROOT, 'seo', 'audits', 'goal-completion-ledger.json');
  if (!existsSync(ledgerPath)) return new Set();
  const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8')) as { routes?: LedgerRoute[] };
  return new Set((ledger.routes || [])
    .filter(route => route.locale === 'nl'
      && route.path
      && route.decisionStatus === 'final'
      && route.httpStatus === 200
      && route.designCoverage === 'premium-signature'
      && route.exactOwner === true
      && route.proofState === 'exact-owner')
    .map(route => route.path!));
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

async function inspectRoute(route: string, keywords: string[], auditText: string, ledgerRoutes: Set<string>): Promise<RouteResult> {
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
  const imagesWithoutAlt = imageTags.filter(tag => !hasAttribute(tag, 'alt')).length;
  if (imagesWithoutAlt) errors.push(`${imagesWithoutAlt} afbeelding(en) zonder alt-attribuut`);

  if (!auditText.includes(`\`${route}\``) && !ledgerRoutes.has(route)) {
    errors.push('route ontbreekt in acceptance-audit en mist exact-ownerbewijs in de completion-ledger');
  }

  return { route, keywords, errors, status: response.status };
}

async function main(): Promise<void> {
  const { rows } = readKeywordCsv('nl');
  const requestedRoutes = new Set((process.env.SITE_VERIFY_ROUTES || '')
    .split(',')
    .map(route => route.trim())
    .filter(Boolean));
  const owners = new Map<string, string[]>();
  for (const row of rows) {
    if (!row.route.startsWith('/nl/')) throw new Error(`NL-owner heeft ongeldige route: ${row.route}`);
    if (requestedRoutes.size && !requestedRoutes.has(row.route)) continue;
    owners.set(row.route, [...(owners.get(row.route) || []), row.primary_keyword]);
  }
  if (requestedRoutes.size && owners.size !== requestedRoutes.size) {
    const missing = [...requestedRoutes].filter(route => !owners.has(route));
    throw new Error(`Gevraagde NL-ownerroute(s) ontbreken in ContentOps: ${missing.join(', ')}`);
  }

  const auditText = collectMarkdown(resolve(PROJECT_ROOT, 'seo', 'audits'));
  const ledgerRoutes = acceptedLedgerRoutes();
  const queue = [...owners.entries()];
  const results: RouteResult[] = [];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const [route, keywords] = queue.shift()!;
      results.push(await inspectRoute(route, keywords, auditText, ledgerRoutes));
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
