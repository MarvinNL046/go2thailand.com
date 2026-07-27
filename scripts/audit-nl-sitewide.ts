import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { PROJECT_ROOT } from './seo-utils';

const baseUrl = process.env.SITE_AUDIT_BASE_URL || 'http://localhost:3000';
const publicOrigin = 'https://go2-thailand.com';
const locale = process.env.SITE_AUDIT_LOCALE === 'en' ? 'en' : 'nl';
const sitemapFile = locale === 'nl' ? 'sitemap-nl.xml' : 'sitemap.xml';
const concurrency = Math.max(1, Number(process.env.SITE_AUDIT_CONCURRENCY || 3));
const targetConcurrency = Math.max(1, Number(process.env.SITE_AUDIT_TARGET_CONCURRENCY || concurrency));
const routeLimit = Math.max(0, Number(process.env.SITE_AUDIT_LIMIT || 0));
const recheckReport = process.env.SITE_AUDIT_RECHECK_REPORT;
const reusePageReport = process.env.SITE_AUDIT_REUSE_PAGE_REPORT;
const reuseTargetReport = process.env.SITE_AUDIT_REUSE_TARGET_REPORT;
const reusePageReports = (process.env.SITE_AUDIT_REUSE_PAGE_REPORTS || reusePageReport || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean);
const reuseTargetReports = (process.env.SITE_AUDIT_REUSE_TARGET_REPORTS || reuseTargetReport || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean);
const refreshPrefixes = (process.env.SITE_AUDIT_REFRESH_PREFIXES || '')
  .split(',')
  .map(value => normalizedPath(value.trim()))
  .filter(value => value !== '/');
const refreshRoutes = new Set((process.env.SITE_AUDIT_REFRESH_ROUTES || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean)
  .map(normalizedPath));
const partialAudit = Boolean(recheckReport) || routeLimit > 0;
const requestTimeout = Math.max(5_000, Number(process.env.SITE_AUDIT_TIMEOUT_MS || 30_000));
const reportPath = process.env.SITE_AUDIT_REPORT
  ? resolve(PROJECT_ROOT, process.env.SITE_AUDIT_REPORT)
  : undefined;

interface Finding {
  code: string;
  message: string;
}

interface LinkRecord {
  href: string;
  text: string;
  rel: string[];
  target?: string;
  accessibleName: string;
  inMain: boolean;
  inline: boolean;
  affiliate: boolean;
}

interface RouteAudit {
  route: string;
  status?: number;
  responseMs?: number;
  title?: string;
  description?: string;
  canonical?: string;
  h1Count?: number;
  mainCount?: number;
  schemaTypes: string[];
  links: LinkRecord[];
  imageSources: string[];
  errors: Finding[];
  warnings: Finding[];
}

interface TargetAudit {
  target: string;
  status?: number;
  location?: string;
  error?: string;
}

function getAttribute(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return decodeEntities(match?.[1] ?? match?.[2] ?? match?.[3] ?? '') || undefined;
}

function hasAttribute(tag: string, name: string): boolean {
  return new RegExp(`\\b${name}(?:\\s*=|\\s|/?>)`, 'i').test(tag);
}

function decodeEntities(value: string): string {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)));
}

function textContent(value: string): string {
  return decodeEntities(value.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizedPath(value: string): string {
  const parsed = new URL(value, publicOrigin);
  const path = parsed.pathname === '/' ? '/' : `${parsed.pathname.replace(/\/+$/, '')}/`;
  return path;
}

function publicUrl(path: string): string {
  return `${publicOrigin}${normalizedPath(path)}`;
}

function localUrl(path: string): string {
  const parsedBase = new URL(baseUrl);
  const parsed = new URL(path, parsedBase);
  parsed.protocol = parsedBase.protocol;
  parsed.host = parsedBase.host;
  return parsed.toString();
}

function parseSitemap(): string[] {
  const source = readFileSync(resolve(PROJECT_ROOT, 'public', sitemapFile), 'utf8');
  const routes = [...source.matchAll(/<loc>([^<]+)<\/loc>/gi)]
    .map(match => normalizedPath(match[1]))
    .filter(route => locale === 'nl' ? route.startsWith('/nl/') : !route.startsWith('/nl/'));
  const unique = [...new Set(routes)];
  let selected = unique;
  if (recheckReport) {
    const previous = JSON.parse(readFileSync(resolve(PROJECT_ROOT, recheckReport), 'utf8')) as {
      routes?: Array<{ route?: string; errors?: Finding[] }>;
    };
    const failedRoutes = new Set(
      (previous.routes || [])
        .filter(route => route.route && (route.errors?.length || 0) > 0)
        .map(route => normalizedPath(route.route!)),
    );
    selected = unique.filter(route => failedRoutes.has(route));
  }
  return routeLimit ? selected.slice(0, routeLimit) : selected;
}

function loadLocaleOnlyRoutes(): Set<string> {
  const path = resolve(PROJECT_ROOT, 'seo', 'inventory', 'unpaired-routes.json');
  const data = JSON.parse(readFileSync(path, 'utf8')) as { nlOnly?: string[]; enOnly?: string[] };
  const routes = locale === 'nl' ? data.nlOnly : data.enOnly;
  return new Set((routes || []).map(normalizedPath));
}

function loadReusedPageResults(routes: string[]): { reused: RouteAudit[]; pending: string[] } | undefined {
  if (!reusePageReports.length) return undefined;
  const byRoute = new Map<string, RouteAudit>();
  for (const report of reusePageReports) {
    const previous = JSON.parse(readFileSync(resolve(PROJECT_ROOT, report), 'utf8')) as { routes?: RouteAudit[] };
    for (const route of previous.routes || []) byRoute.set(normalizedPath(route.route), route);
  }
  const derivedErrorCodes = new Set([
    'broken_internal_link',
    'redirecting_internal_link',
    'broken_local_image',
    'duplicate_title',
    'duplicate_canonical',
  ]);
  const reused: RouteAudit[] = [];
  const pending: string[] = [];
  for (const route of routes) {
    if (refreshRoutes.has(route) || refreshPrefixes.some(prefix => route.startsWith(prefix))) {
      pending.push(route);
      continue;
    }
    const previousRoute = byRoute.get(route);
    if (!previousRoute) throw new Error(`Herbruikbaar auditrapport mist route ${route}`);
    reused.push({
      ...previousRoute,
      route,
      errors: previousRoute.errors.filter(finding => !derivedErrorCodes.has(finding.code)),
      warnings: previousRoute.warnings.filter(finding => finding.code !== 'no_main_incoming_link'),
    });
  }
  console.log(`  hergebruik ${reused.length} paginaresultaten en ververs ${pending.length} route(s) uit ${reusePageReports.join(' + ')}`);
  return { reused, pending };
}

function loadReusedTargetResults(targets: string[], kind: 'link' | 'asset'): { reused: TargetAudit[]; pending: string[] } {
  if (!reuseTargetReports.length) return { reused: [], pending: targets };
  const byTarget = new Map<string, TargetAudit>();
  for (const report of reuseTargetReports) {
    const previous = JSON.parse(readFileSync(resolve(PROJECT_ROOT, report), 'utf8')) as {
      targetAudits?: TargetAudit[];
      assetAudits?: TargetAudit[];
    };
    const prior = kind === 'asset' ? previous.assetAudits || [] : previous.targetAudits || [];
    for (const result of prior) byTarget.set(result.target, result);
  }
  const reused: TargetAudit[] = [];
  const pending: string[] = [];
  for (const target of targets) {
    const result = byTarget.get(target);
    if (result && !result.error && result.status && result.status < 500) reused.push(result);
    else pending.push(target);
  }
  console.log(`  hergebruik ${reused.length}/${targets.length} recente ${kind === 'asset' ? 'asset' : 'doel'}-statussen uit ${reuseTargetReports.join(' + ')}`);
  return { reused, pending };
}

function parseSchemaTypes(value: unknown, result: Set<string>): void {
  if (Array.isArray(value)) {
    for (const item of value) parseSchemaTypes(item, result);
    return;
  }
  if (!value || typeof value !== 'object') return;
  const record = value as Record<string, unknown>;
  const type = record['@type'];
  if (typeof type === 'string') result.add(type);
  if (Array.isArray(type)) for (const item of type) if (typeof item === 'string') result.add(item);
  if (record['@graph']) parseSchemaTypes(record['@graph'], result);
}

function parseAnchors(html: string, mainHtml: string): LinkRecord[] {
  const mainAnchorTags = new Set([...mainHtml.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map(match => match[0]));
  const inlineAnchorTags = new Set<string>();
  for (const paragraph of mainHtml.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gi)) {
    for (const anchor of paragraph[0].matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)) inlineAnchorTags.add(anchor[0]);
  }

  return [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].flatMap(match => {
    const tag = match[0];
    const href = getAttribute(tag, 'href');
    if (!href) return [];
    const text = textContent(tag);
    const rel = (getAttribute(tag, 'rel') || '').toLowerCase().split(/\s+/).filter(Boolean);
    const target = getAttribute(tag, 'target');
    const nestedImage = tag.match(/<img\b[^>]*>/i)?.[0] || '';
    return [{
      href,
      text,
      rel,
      target,
      accessibleName: text || getAttribute(tag, 'aria-label') || getAttribute(nestedImage, 'alt') || getAttribute(tag, 'title') || '',
      inMain: mainAnchorTags.has(tag),
      inline: inlineAnchorTags.has(tag),
      affiliate: isAffiliateHref(href),
    }];
  });
}

function isAffiliateHref(href: string): boolean {
  if (/^\/go\//i.test(href)) return true;
  try {
    const url = new URL(href, publicOrigin);
    const host = url.hostname.toLowerCase();
    const affiliateHosts = [
      'amzn.to', 'tp.media', 'tp.st', 'gyg.me',
      'trip.tpo.lv', 'booking.tpo.lv', 'klook.tpo.lv', 'getyourguide.tpo.lv',
      '12go.tpo.lv', 'saily.tpo.lv', 'airalo.tpo.lv', 'yesim.tpo.lv',
      'nordvpn.tpo.lv', 'safetywing.tpo.lv',
    ];
    if (affiliateHosts.some(candidate => host === candidate || host.endsWith(`.${candidate}`))) return true;
    if (host === 'www.travelpayouts.com' || host === 'travelpayouts.com') return url.searchParams.has('marker');
    if (host.includes('amazon.')) return url.searchParams.has('tag');

    return ['aid', 'affiliate', 'aff_id', 'partner', 'ref', 'subid', 'marker']
      .some(param => url.searchParams.has(param));
  } catch {
    return false;
  }
}

function internalTarget(href: string): string | undefined {
  if (/^(?:mailto:|tel:|javascript:|data:)/i.test(href) || href.startsWith('#')) return undefined;
  try {
    const parsed = new URL(href, publicOrigin);
    if (parsed.origin !== publicOrigin || parsed.pathname.startsWith('/go/')) return undefined;
    return normalizedPath(parsed.pathname);
  } catch {
    return undefined;
  }
}

function parseImageSources(html: string): string[] {
  const values: string[] = [];
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = getAttribute(tag, 'src');
    if (src) values.push(src);
    const srcset = getAttribute(tag, 'srcset');
    if (srcset) {
      for (const candidate of srcset.split(',')) {
        const value = candidate.trim().split(/\s+/)[0];
        if (value) values.push(value);
      }
    }
  }
  const normalized = values.flatMap(value => {
    try {
      const parsed = new URL(value, publicOrigin);
      if (parsed.origin !== publicOrigin) return [];
      if (parsed.pathname === '/_next/image' || parsed.pathname === '/_next/image/') {
        const original = parsed.searchParams.get('url');
        if (!original) return [];
        const originalUrl = new URL(original, publicOrigin);
        return originalUrl.origin === publicOrigin ? [originalUrl.pathname] : [];
      }
      return [`${parsed.pathname}${parsed.search}`];
    } catch {
      return [];
    }
  });
  return [...new Set(normalized)];
}

async function fetchWithTimeout(url: string, redirect: RequestRedirect = 'manual'): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeout);
  try {
    return await fetch(url, {
      redirect,
      signal: controller.signal,
      headers: { 'user-agent': 'Go2ThailandLocalSeoAudit/1.0' },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function auditRoute(route: string, localeOnlyRoutes: Set<string>): Promise<RouteAudit> {
  const result: RouteAudit = {
    route,
    schemaTypes: [],
    links: [],
    imageSources: [],
    errors: [],
    warnings: [],
  };
  const startedAt = Date.now();
  let response: Response;
  try {
    response = await fetchWithTimeout(localUrl(route));
    for (let attempt = 1; response.status === 500 && attempt <= 2; attempt++) {
      await response.body?.cancel();
      await new Promise(resolveDelay => setTimeout(resolveDelay, attempt * 300));
      response = await fetchWithTimeout(localUrl(route));
    }
  } catch (error) {
    result.errors.push({ code: 'fetch_failed', message: error instanceof Error ? error.message : String(error) });
    return result;
  }
  result.responseMs = Date.now() - startedAt;
  result.status = response.status;
  if (response.status >= 300 && response.status < 400) {
    result.errors.push({ code: 'sitemap_redirect', message: `HTTP ${response.status} naar ${response.headers.get('location') || 'onbekend'}` });
    return result;
  }
  if (response.status !== 200) {
    result.errors.push({ code: 'http_status', message: `HTTP ${response.status}` });
    return result;
  }

  const html = await response.text();
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
  const mainMatches = [...html.matchAll(/<main\b[^>]*>/gi)];
  const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
  result.mainCount = mainMatches.length;
  if (result.mainCount !== 1) result.errors.push({ code: 'main_count', message: `${result.mainCount} main-elementen` });

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (getAttribute(htmlTag, 'lang') !== locale) {
    result.errors.push({ code: 'html_lang', message: `html[lang] is niet ${locale}` });
  }

  result.title = textContent(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  if (!result.title) result.errors.push({ code: 'missing_title', message: 'title ontbreekt' });
  else {
    if (result.title.length < 25) result.warnings.push({ code: 'short_title', message: `${result.title.length} tekens` });
    if (result.title.length > 65) result.warnings.push({ code: 'long_title', message: `${result.title.length} tekens` });
  }

  const metaTags = [...head.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
  const descriptionTag = metaTags.find(tag => getAttribute(tag, 'name')?.toLowerCase() === 'description');
  result.description = getAttribute(descriptionTag || '', 'content') || '';
  if (!result.description) result.errors.push({ code: 'missing_description', message: 'meta description ontbreekt' });
  else {
    if (result.description.length < 70) result.warnings.push({ code: 'short_description', message: `${result.description.length} tekens` });
    if (result.description.length > 170) result.warnings.push({ code: 'long_description', message: `${result.description.length} tekens` });
  }
  const robots = metaTags.find(tag => getAttribute(tag, 'name')?.toLowerCase() === 'robots');
  if (/\bnoindex\b/i.test(getAttribute(robots || '', 'content') || '')) {
    result.errors.push({ code: 'sitemap_noindex', message: 'indexeerbare sitemap-URL bevat noindex' });
  }

  result.h1Count = (html.match(/<h1\b/gi) || []).length;
  if (result.h1Count !== 1) result.errors.push({ code: 'h1_count', message: `${result.h1Count} H1-elementen` });

  const linkTags = [...head.matchAll(/<link\b[^>]*>/gi)].map(match => match[0]);
  const canonicalTag = linkTags.find(tag => (getAttribute(tag, 'rel') || '').toLowerCase().split(/\s+/).includes('canonical'));
  result.canonical = getAttribute(canonicalTag || '', 'href');
  if (!result.canonical) result.errors.push({ code: 'missing_canonical', message: 'canonical ontbreekt' });
  else if (publicUrl(result.canonical) !== publicUrl(route)) {
    result.errors.push({ code: 'canonical_mismatch', message: `${result.canonical} in plaats van ${publicUrl(route)}` });
  }

  const alternates = new Map<string, string>();
  for (const tag of linkTags) {
    const rel = (getAttribute(tag, 'rel') || '').toLowerCase().split(/\s+/);
    const hreflang = getAttribute(tag, 'hreflang')?.toLowerCase();
    const href = getAttribute(tag, 'href');
    if (rel.includes('alternate') && hreflang && href) alternates.set(hreflang, href);
  }
  const suffix = normalizedPath(route.replace(/^\/nl(?=\/)/, '') || '/');
  const isLocaleOnly = localeOnlyRoutes.has(suffix);
  const expectedNl = publicUrl(suffix === '/' ? '/nl/' : `/nl${suffix}`);
  const expectedEn = publicUrl(suffix);
  const expectedSelf = locale === 'nl' ? expectedNl : expectedEn;
  const pairedLocale = locale === 'nl' ? 'en' : 'nl';
  const expectedPaired = locale === 'nl' ? expectedEn : expectedNl;
  if (!alternates.has(locale)) {
    result.errors.push({ code: `missing_hreflang_${locale}`, message: `hreflang ${locale} ontbreekt` });
  } else if (publicUrl(alternates.get(locale)!) !== expectedSelf) {
    result.errors.push({ code: `hreflang_${locale}_mismatch`, message: `${alternates.get(locale)} in plaats van ${expectedSelf}` });
  }
  if (!alternates.has('x-default')) result.errors.push({ code: 'missing_hreflang_default', message: 'hreflang x-default ontbreekt' });
  if (isLocaleOnly) {
    if (alternates.has(pairedLocale)) {
      result.errors.push({ code: `${locale}_only_has_${pairedLocale}_hreflang`, message: alternates.get(pairedLocale)! });
    }
    if (alternates.has('x-default') && publicUrl(alternates.get('x-default')!) !== expectedSelf) {
      result.errors.push({ code: 'hreflang_default_mismatch', message: `${alternates.get('x-default')} in plaats van ${locale.toUpperCase()} self` });
    }
  } else {
    if (!alternates.has(pairedLocale)) {
      result.errors.push({ code: `missing_hreflang_${pairedLocale}`, message: `hreflang ${pairedLocale} ontbreekt` });
    } else if (publicUrl(alternates.get(pairedLocale)!) !== expectedPaired) {
      result.errors.push({ code: `hreflang_${pairedLocale}_mismatch`, message: `${alternates.get(pairedLocale)} in plaats van ${expectedPaired}` });
    }
    if (alternates.has('x-default') && publicUrl(alternates.get('x-default')!) !== expectedEn) {
      result.errors.push({ code: 'hreflang_default_mismatch', message: `${alternates.get('x-default')} in plaats van ${expectedEn}` });
    }
  }

  const schemaTypes = new Set<string>();
  const jsonScripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!jsonScripts.length) result.errors.push({ code: 'missing_jsonld', message: 'JSON-LD ontbreekt' });
  for (const [, rawJson] of jsonScripts) {
    try {
      parseSchemaTypes(JSON.parse(decodeEntities(rawJson)), schemaTypes);
    } catch (error) {
      result.errors.push({ code: 'invalid_jsonld', message: error instanceof Error ? error.message : 'ongeldige JSON-LD' });
    }
  }
  result.schemaTypes = [...schemaTypes].sort();

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
  const missingAlt = imageTags.filter(tag => !hasAttribute(tag, 'alt')).length;
  if (missingAlt) result.errors.push({ code: 'images_without_alt', message: `${missingAlt} afbeelding(en)` });
  result.imageSources = parseImageSources(html);

  result.links = parseAnchors(html, mainHtml);
  const unnamedLinks = result.links.filter(link => !link.accessibleName).length;
  if (unnamedLinks) result.warnings.push({ code: 'unnamed_links', message: `${unnamedLinks} mogelijk naamloze link(s)` });
  const mainInternal = result.links.filter(link => link.inMain && internalTarget(link.href));
  if (!mainInternal.length) result.warnings.push({ code: 'no_main_internal_links', message: 'geen interne link in main-content' });
  const inlineInternal = result.links.filter(link => link.inline && internalTarget(link.href));
  const mainWords = textContent(mainHtml).split(/\s+/).filter(Boolean).length;
  if (mainWords >= 250 && !inlineInternal.length) {
    result.warnings.push({ code: 'no_natural_inline_links', message: `${mainWords} woorden maar geen interne link in lopende paragraaf` });
  }
  const localeEscapes = mainInternal.filter(link => {
    const target = internalTarget(link.href);
    return target && (locale === 'nl' ? !target.startsWith('/nl/') : target.startsWith('/nl/'));
  });
  if (localeEscapes.length) {
    result.errors.push({
      code: `${locale}_link_to_${locale === 'nl' ? 'en' : 'nl'}`,
      message: `${localeEscapes.length} main-link(s) verlaten onbedoeld de ${locale.toUpperCase()}-locale`,
    });
  }

  const affiliateLinks = result.links.filter(link => link.affiliate);
  for (const link of affiliateLinks) {
    if (!link.rel.includes('sponsored')) result.errors.push({ code: 'affiliate_missing_sponsored', message: link.href });
    if (link.target === '_blank' && (!link.rel.includes('noopener') || !link.rel.includes('noreferrer'))) {
      result.errors.push({ code: 'affiliate_unsafe_blank', message: link.href });
    }
  }
  if (affiliateLinks.length && !/affiliate|affiliatelink|commissie|commission/i.test(textContent(mainHtml))) {
    result.warnings.push({ code: 'affiliate_disclosure_not_in_main', message: `${affiliateLinks.length} affiliatelink(s)` });
  }

  return result;
}

async function auditTargets(targets: string[], kind: 'link' | 'asset'): Promise<TargetAudit[]> {
  const queue = [...targets];
  const results: TargetAudit[] = [];
  let completed = 0;
  const workers = Array.from({ length: Math.min(targetConcurrency, queue.length) }, async () => {
    while (queue.length) {
      const target = queue.shift()!;
      const url = kind === 'asset' ? localUrl(target) : localUrl(normalizedPath(target));
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await fetchWithTimeout(url);
          const status = response.status;
          const location = response.headers.get('location') || undefined;
          await response.body?.cancel();
          if (status >= 500 && attempt < 3) {
            await new Promise(resolveDelay => setTimeout(resolveDelay, attempt * 250));
            continue;
          }
          results.push({ target, status, location });
          break;
        } catch (error) {
          if (attempt < 3) {
            await new Promise(resolveDelay => setTimeout(resolveDelay, attempt * 250));
            continue;
          }
          results.push({ target, error: error instanceof Error ? error.message : String(error) });
        }
      }
      completed += 1;
      if (completed % 250 === 0 || completed === targets.length) {
        console.log(`  ${kind === 'asset' ? 'assets' : 'doelen'} ${completed}/${targets.length}`);
      }
    }
  });
  await Promise.all(workers);
  return results.sort((a, b) => a.target.localeCompare(b.target));
}

function countFindings(routes: RouteAudit[], kind: 'errors' | 'warnings'): Map<string, number> {
  const counts = new Map<string, number>();
  for (const route of routes) {
    for (const finding of route[kind]) counts.set(finding.code, (counts.get(finding.code) || 0) + 1);
  }
  return new Map([...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

async function main(): Promise<void> {
  const routes = parseSitemap();
  const localeOnlyRoutes = loadLocaleOnlyRoutes();
  const reuse = loadReusedPageResults(routes);
  const queue = reuse ? [...reuse.pending] : [...routes];
  const routeWorkCount = queue.length;
  const results: RouteAudit[] = reuse ? [...reuse.reused] : [];
  let completed = 0;
  console.log(`${locale.toUpperCase()} sitewide audit: ${routes.length} sitemap-routes op ${baseUrl} (pagina’s ${concurrency}, doelen ${targetConcurrency}).`);
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const route = queue.shift()!;
      results.push(await auditRoute(route, localeOnlyRoutes));
      completed++;
      if (completed % 50 === 0 || completed === routeWorkCount) console.log(`  routes ${completed}/${routeWorkCount}`);
    }
  });
  await Promise.all(workers);
  results.sort((a, b) => a.route.localeCompare(b.route));

  const sitemapSet = new Set(routes);
  const internalTargetSources = new Map<string, Set<string>>();
  const assetSources = new Map<string, Set<string>>();
  const incomingMain = new Map<string, Set<string>>();
  for (const page of results) {
    for (const link of page.links) {
      const target = internalTarget(link.href);
      if (!target) continue;
      if (!internalTargetSources.has(target)) internalTargetSources.set(target, new Set());
      internalTargetSources.get(target)!.add(page.route);
      if (link.inMain && sitemapSet.has(target) && target !== page.route) {
        if (!incomingMain.has(target)) incomingMain.set(target, new Set());
        incomingMain.get(target)!.add(page.route);
      }
    }
    for (const source of page.imageSources) {
      if (!assetSources.has(source)) assetSources.set(source, new Set());
      assetSources.get(source)!.add(page.route);
    }
  }

  const extraTargets = [...internalTargetSources.keys()].filter(target => !sitemapSet.has(target));
  console.log(`  controleer ${extraTargets.length} unieke interne doelen buiten de sitemap`);
  const targetReuse = loadReusedTargetResults(extraTargets, 'link');
  const targetAudits = [...targetReuse.reused, ...await auditTargets(targetReuse.pending, 'link')]
    .sort((a, b) => a.target.localeCompare(b.target));
  for (const target of targetAudits) {
    const sources = internalTargetSources.get(target.target) || new Set<string>();
    const broken = target.error || !target.status || target.status >= 400;
    const redirects = target.status && target.status >= 300 && target.status < 400;
    if (!broken && !redirects) continue;
    for (const source of sources) {
      const page = results.find(result => result.route === source);
      if (!page) continue;
      page.errors.push({
        code: broken ? 'broken_internal_link' : 'redirecting_internal_link',
        message: `${target.target} (${target.error || `HTTP ${target.status}${target.location ? ` → ${target.location}` : ''}`})`,
      });
    }
  }

  const assetTargets = [...assetSources.keys()];
  console.log(`  controleer ${assetTargets.length} unieke lokale afbeeldingsbronnen`);
  const assetReuse = loadReusedTargetResults(assetTargets, 'asset');
  const assetAudits = [...assetReuse.reused, ...await auditTargets(assetReuse.pending, 'asset')]
    .sort((a, b) => a.target.localeCompare(b.target));
  for (const target of assetAudits) {
    if (!target.error && target.status && target.status < 400) continue;
    for (const source of assetSources.get(target.target) || []) {
      results.find(result => result.route === source)?.errors.push({
        code: 'broken_local_image',
        message: `${target.target} (${target.error || `HTTP ${target.status}`})`,
      });
    }
  }

  if (!partialAudit) {
    for (const route of routes) {
      if (route === (locale === 'nl' ? '/nl/' : '/')) continue;
      if (!incomingMain.has(route)) {
        results.find(result => result.route === route)?.warnings.push({
          code: 'no_main_incoming_link',
          message: 'geen inkomende link vanuit main-content van een andere sitemap-pagina',
        });
      }
    }
  }

  const titleOwners = new Map<string, string[]>();
  const canonicalOwners = new Map<string, string[]>();
  for (const page of results) {
    if (page.title) titleOwners.set(page.title.toLowerCase(), [...(titleOwners.get(page.title.toLowerCase()) || []), page.route]);
    if (page.canonical) canonicalOwners.set(publicUrl(page.canonical), [...(canonicalOwners.get(publicUrl(page.canonical)) || []), page.route]);
  }
  for (const owners of titleOwners.values()) {
    if (owners.length < 2) continue;
    for (const route of owners) results.find(result => result.route === route)?.errors.push({ code: 'duplicate_title', message: owners.join(', ') });
  }
  for (const owners of canonicalOwners.values()) {
    if (owners.length < 2) continue;
    for (const route of owners) results.find(result => result.route === route)?.errors.push({ code: 'duplicate_canonical', message: owners.join(', ') });
  }

  const errorCounts = countFindings(results, 'errors');
  const warningCounts = countFindings(results, 'warnings');
  const failed = results.filter(result => result.errors.length);
  const warned = results.filter(result => result.warnings.length);
  const responseTimes = results.map(result => result.responseMs || 0).filter(Boolean).sort((a, b) => a - b);
  const p95 = responseTimes[Math.min(responseTimes.length - 1, Math.floor(responseTimes.length * 0.95))] || 0;

  console.log(`\nResultaat: ${routes.length - failed.length}/${routes.length} routes zonder harde fouten; ${warned.length} route(s) met waarschuwingen; p95 ${p95} ms.`);
  console.log('\nHarde bevindingen per code:');
  if (!errorCounts.size) console.log('  geen');
  for (const [code, count] of errorCounts) console.log(`  ${code}: ${count}`);
  console.log('\nWaarschuwingen per code:');
  if (!warningCounts.size) console.log('  geen');
  for (const [code, count] of warningCounts) console.log(`  ${code}: ${count}`);

  const examples = failed.slice(0, 80);
  if (examples.length) {
    console.log(`\nEerste ${examples.length} routes met harde fouten:`);
    for (const page of examples) {
      console.log(`\n${page.route}`);
      for (const finding of page.errors) console.log(`  [${finding.code}] ${finding.message}`);
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    locale,
    sitemap: `public/${sitemapFile}`,
    routeCount: routes.length,
    passedRoutes: routes.length - failed.length,
    failedRoutes: failed.length,
    warnedRoutes: warned.length,
    p95ResponseMs: p95,
    errorCounts: Object.fromEntries(errorCounts),
    warningCounts: Object.fromEntries(warningCounts),
    targetAudits,
    assetAudits,
    routes: results,
  };
  if (reportPath) {
    mkdirSync(dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`\nVolledig rapport: ${reportPath}`);
  }
  if (failed.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
