import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCsvLine, PROJECT_ROOT, type SeoLocale } from './seo-utils';

/* External audit JSON intentionally has several historical shapes. */
/* eslint-disable @typescript-eslint/no-explicit-any */

type InventoryRoute = {
  locale: SeoLocale;
  path: string;
  page_type: string;
  template_owner: string;
  recommended_action: string;
  decision_status: string;
};

type CoverageRoute = {
  locale: SeoLocale;
  path: string;
  status: number | null;
  coverage: 'premium-signature' | 'hybrid-signature' | 'no-signature';
  trackedOwner: boolean;
  amazonLinks: number;
};

type FamilyCompletion = {
  key: string;
  status: 'complete' | 'pending';
  evidence: string[];
  note: string;
  acceptedRoutes?: string[];
};

const auditDir = resolve(PROJECT_ROOT, 'seo', 'audits');
const runtimeDir = resolve(auditDir, 'runtime');

function readCsv<T extends Record<string, string>>(path: string): T[] {
  const lines = readFileSync(path, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines.shift() || '');
  return lines.map(line => Object.fromEntries(headers.map((header, index) => [header, parseCsvLine(line)[index] || ''])) as T);
}

function latestDesignReport(locale: SeoLocale): { path: string; data: any } {
  const candidates = readdirSync(runtimeDir)
    .filter(name => name.startsWith(`design-coverage-${locale}-`) && name.endsWith('.json'))
    .map(name => resolve(runtimeDir, name))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
  if (!candidates[0]) throw new Error(`No design coverage report for ${locale}`);
  return { path: candidates[0], data: JSON.parse(readFileSync(candidates[0], 'utf8')) };
}

function latestSitewideReport(locale: SeoLocale, expectedRoutes: number): { path: string; summary: any } {
  const candidates = readdirSync(runtimeDir)
    .filter(name => name.startsWith(`${locale}-`) && name.endsWith('.json'))
    .map(name => resolve(runtimeDir, name))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
  for (const path of candidates) {
    const parsed = JSON.parse(readFileSync(path, 'utf8'));
    if (parsed.locale === locale && parsed.routeCount === expectedRoutes && typeof parsed.failedRoutes === 'number') {
      return {
        path,
        summary: {
          generatedAt: parsed.generatedAt,
          routeCount: parsed.routeCount,
          passedRoutes: parsed.passedRoutes,
          failedRoutes: parsed.failedRoutes,
          warnedRoutes: parsed.warnedRoutes,
          errorCounts: parsed.errorCounts,
          warningCounts: parsed.warningCounts,
        },
      };
    }
  }
  throw new Error(`No complete sitewide report for ${locale}`);
}

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicate = new Set<string>();
  for (const value of values) (seen.has(value) ? duplicate : seen).add(value);
  return [...duplicate].sort();
}

const nlKohTaoFamily = new Set([
  '/nl/islands/koh-tao/',
  '/nl/islands/koh-tao/attractions/',
  '/nl/islands/koh-tao/diving/',
  '/nl/islands/koh-tao/snorkeling/',
]);
const nlFinalOwnerBatch = new Set([
  '/nl/is-thailand-safe/',
  '/nl/compare/phuket-vs-krabi/',
  '/nl/blog/el-nino-2026-thailand-weather-heatwave-travel-tips/',
]);

function routeFamilyKey(row: InventoryRoute): string {
  if (nlFinalOwnerBatch.has(row.path)) return 'nl:final-owner-batch';
  if (nlKohTaoFamily.has(row.path)) return 'nl:island:koh-tao';
  if (row.path === '/nl/travel-guides/vpn-thailand/') return 'nl:digital-safety-guide';
  if (row.locale === 'nl' && row.template_owner === 'practical' && row.path.startsWith('/nl/visa/')) return 'nl:practical:visa';
  if (row.template_owner === 'destination-subpillar') {
    const suffix = row.path.split('/').filter(Boolean).at(-1) || 'unknown';
    return `${row.locale}:${row.template_owner}:${suffix}`;
  }
  return `${row.locale}:${row.template_owner}`;
}

const inventory = readCsv<InventoryRoute>(resolve(PROJECT_ROOT, 'seo', 'inventory', 'routes.csv'));
const familyCompletionPath = resolve(PROJECT_ROOT, 'seo', 'inventory', 'family-completion.json');
const familyCompletion = JSON.parse(readFileSync(familyCompletionPath, 'utf8')) as { completionRule: string; families: FamilyCompletion[] };
const duplicateFamilyKeys = duplicates(familyCompletion.families.map(family => family.key));
if (duplicateFamilyKeys.length) throw new Error(`Duplicate family completion keys: ${duplicateFamilyKeys.join(', ')}`);
const familyDecisionByKey = new Map(familyCompletion.families.map(family => [family.key, family]));
const acceptedRoutesByFamily = new Map<string, Set<string>>();
const inventoryByFamily = new Map<string, InventoryRoute[]>();
for (const row of inventory) {
  const key = routeFamilyKey(row);
  const rows = inventoryByFamily.get(key) || [];
  rows.push(row);
  inventoryByFamily.set(key, rows);
}
for (const family of familyCompletion.families) {
  const familyRows = inventoryByFamily.get(family.key);
  if (!familyRows) throw new Error(`Family completion entry does not match inventory: ${family.key}`);
  const acceptedRoutes = family.acceptedRoutes || [];
  const duplicateAcceptedRoutes = duplicates(acceptedRoutes);
  if (duplicateAcceptedRoutes.length) throw new Error(`Duplicate accepted routes for ${family.key}: ${duplicateAcceptedRoutes.join(', ')}`);
  const familyRouteSet = new Set(familyRows.map(row => row.path));
  const unknownAcceptedRoutes = acceptedRoutes.filter(route => !familyRouteSet.has(route));
  if (unknownAcceptedRoutes.length) throw new Error(`Accepted routes do not belong to ${family.key}: ${unknownAcceptedRoutes.join(', ')}`);
  if ((family.status === 'complete' || acceptedRoutes.length) && !family.evidence.length) throw new Error(`Accepted family work lacks evidence: ${family.key}`);
  if (family.status === 'complete' && acceptedRoutes.length && acceptedRoutes.length !== familyRows.length) {
    throw new Error(`Complete family has a partial acceptedRoutes list: ${family.key}`);
  }
  acceptedRoutesByFamily.set(family.key, new Set(family.status === 'complete' ? familyRows.map(row => row.path) : acceptedRoutes));
  for (const evidence of family.evidence) {
    if (!existsSync(resolve(PROJECT_ROOT, evidence))) throw new Error(`Family evidence does not exist for ${family.key}: ${evidence}`);
  }
}
const routeRows: any[] = [];
const localeSummary: Record<string, any> = {};
const activeQueues: Record<string, any> = {};
const exactOwnerByRoute = new Map<string, boolean>();

for (const locale of ['nl', 'en'] as SeoLocale[]) {
  const inventoryRows = inventory.filter(row => row.locale === locale);
  const keywordRows = readCsv<Record<string, string>>(resolve(PROJECT_ROOT, 'seo', `keywords-${locale}.csv`));
  const keywordRoutes = keywordRows.map(row => row.route).filter(Boolean);
  const keywordSet = new Set(keywordRoutes);
  const design = latestDesignReport(locale);
  const coverageRows = design.data.routes as CoverageRoute[];
  const coverageByPath = new Map(coverageRows.map(row => [row.path, row]));
  const sitewide = latestSitewideReport(locale, inventoryRows.length);
  const duplicateOwners = duplicates(keywordRoutes);
  const provisional = inventoryRows.filter(row => !acceptedRoutesByFamily.get(routeFamilyKey(row))?.has(row.path));

  for (const row of inventoryRows) {
    const rendered = coverageByPath.get(row.path);
    const exactOwner = keywordSet.has(row.path) || Boolean(rendered?.trackedOwner);
    const familyKey = routeFamilyKey(row);
    const accepted = acceptedRoutesByFamily.get(familyKey)?.has(row.path) || false;
    exactOwnerByRoute.set(`${locale}:${row.path}`, exactOwner);
    routeRows.push({
      locale,
      path: row.path,
      pageType: row.page_type,
      templateOwner: row.template_owner,
      recommendedAction: row.recommended_action,
      familyKey,
      decisionStatus: accepted ? 'final' : 'provisional',
      httpStatus: rendered?.status ?? null,
      designCoverage: rendered?.coverage ?? 'missing-report-row',
      exactOwner,
      amazonLinks: rendered?.amazonLinks || 0,
      proofState: exactOwner ? 'exact-owner' : accepted ? 'family-accepted' : rendered?.coverage === 'premium-signature' || rendered?.coverage === 'hybrid-signature' ? 'shared-template-only' : 'unproven',
    });
  }

  const summary = design.data.summaries[locale];
  localeSummary[locale] = {
    sitemapRoutes: inventoryRows.length,
    http200: summary.httpOk,
    premium: summary.byCoverage['premium-signature'] || 0,
    hybrid: summary.byCoverage['hybrid-signature'] || 0,
    noSignature: summary.byCoverage['no-signature'] || 0,
    exactOwners: keywordSet.size,
    duplicateExactOwnerRoutes: duplicateOwners,
    contextualAmazonRoutes: typeof summary.amazonRoutes === 'number' ? summary.amazonRoutes : null,
    amazonLinks: typeof summary.amazonLinks === 'number' ? summary.amazonLinks : null,
    provisionalInventoryDecisions: provisional.length,
    designReport: design.path.replace(`${PROJECT_ROOT}\\`, '').replaceAll('\\', '/'),
    sitewideReport: sitewide.path.replace(`${PROJECT_ROOT}\\`, '').replaceAll('\\', '/'),
    sitewide: sitewide.summary,
  };
}

for (const [key, rows] of [...inventoryByFamily.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const decision = familyDecisionByKey.get(key);
  const closed = decision?.status === 'complete';
  const exactOwners = rows.filter(row => exactOwnerByRoute.get(`${row.locale}:${row.path}`)).length;
  const acceptedRoutes = acceptedRoutesByFamily.get(key) || new Set<string>();
  const unresolved = rows.filter(row => !acceptedRoutes.has(row.path)).map(row => row.path);
  activeQueues[key] = {
    definition: decision?.note || `Pending explicit family-level research, design and technical acceptance for ${key}.`,
    expected: rows.length,
    complete: acceptedRoutes.size,
    exactOwners,
    remainingCount: unresolved.length,
    remaining: unresolved.slice(0, 12),
    remainingTruncated: unresolved.length > 12,
    evidence: decision?.evidence || [],
    closed,
  };
}

const deploymentSignoffPath = resolve(auditDir, 'final-deployment-readiness-2026-08-01.md');
const deploymentSignoff = existsSync(deploymentSignoffPath)
  ? readFileSync(deploymentSignoffPath, 'utf8')
  : '';
const deploymentReadinessSignedOff = [
  '**Status:** signed-off',
  '**Production build:** passed',
  '**Sitewide routes:** 2,181/2,181 hard-error free',
  '**Responsive browser QA:** passed',
].every(proof => deploymentSignoff.includes(proof));

const globalGates = {
  noDuplicateExactOwnerRoutes: Object.values(localeSummary).every((summary: any) => summary.duplicateExactOwnerRoutes.length === 0),
  allRoutesHttp200: Object.values(localeSummary).every((summary: any) => summary.http200 === summary.sitemapRoutes),
  noMissingDesignSignature: Object.values(localeSummary).every((summary: any) => summary.noSignature === 0),
  sitewideHardErrorsZero: Object.values(localeSummary).every((summary: any) => summary.sitewide.failedRoutes === 0),
  allInventoryDecisionsFinal: Object.values(localeSummary).every((summary: any) => summary.provisionalInventoryDecisions === 0),
  allActiveQueuesClosed: Object.values(activeQueues).every((queue: any) => queue.closed),
  deploymentReadinessSignedOff,
};

const ledger = {
  generatedAt: new Date().toISOString(),
  objectiveState: Object.values(globalGates).every(Boolean) ? 'ready-for-final-deployment-audit' : 'in-progress',
  completionRule: `${familyCompletion.completionRule} The goal may end only when every global gate is true and the final deployment-readiness audit is explicitly signed off.`,
  localeSummary,
  activeQueues,
  globalGates,
  routes: routeRows,
};

writeFileSync(resolve(auditDir, 'goal-completion-ledger.json'), `${JSON.stringify(ledger, null, 2)}\n`);

const lines = [
  '# Goal completion ledger',
  '',
  `**Generated:** ${ledger.generatedAt}`,
  `**Objective state:** ${ledger.objectiveState}`,
  '',
  'This file is generated from the route inventory, locale keyword-owner registers, rendered design reports and complete sitewide audits. It prevents elapsed time or chat memory from being treated as completion proof.',
  '',
  '## Locale evidence',
  '',
  '| Locale | Sitemap | HTTP 200 | Premium | Hybrid | Exact owners | Amazon routes | Amazon links | Provisional decisions |',
  '|---|---:|---:|---:|---:|---:|---:|---:|---:|',
  ...(['nl', 'en'] as SeoLocale[]).map(locale => {
    const s = localeSummary[locale];
    return `| ${locale.toUpperCase()} | ${s.sitemapRoutes} | ${s.http200} | ${s.premium} | ${s.hybrid} | ${s.exactOwners} | ${s.contextualAmazonRoutes ?? 'unknown'} | ${s.amazonLinks ?? 'unknown'} | ${s.provisionalInventoryDecisions} |`;
  }),
  '',
  '## Active owner queues',
  '',
  ...Object.entries(activeQueues).flatMap(([name, queue]: [string, any]) => [
    `### ${name}`,
    '',
    `- Family accepted: **${queue.complete}/${queue.expected}**`,
    `- Exact owners registered: **${queue.exactOwners}/${queue.expected}**`,
    `- Closed: **${queue.closed ? 'yes' : 'no'}**`,
    `- Remaining routes: **${queue.remainingCount}**${queue.remainingTruncated ? ' (first 12 shown)' : ''}`,
    `- Sample: ${queue.remaining.length ? queue.remaining.map((path: string) => `\`${path}\``).join(', ') : 'none'}`,
    `- Evidence: ${queue.evidence.length ? queue.evidence.map((path: string) => `\`${path}\``).join(', ') : 'not signed off'}`,
    '',
  ]),
  '## Hard completion gates',
  '',
  ...Object.entries(globalGates).map(([gate, passed]) => `- [${passed ? 'x' : ' '}] ${gate}`),
  '',
  '## Interpretation',
  '',
  '- `exact-owner` means the route is registered in the locale keyword owner file or tracked by the rendered owner audit.',
  '- `family-accepted` means the route is covered by explicit family-level research, premium-design and technical-QA evidence without requiring duplicated per-route copy.',
  '- `shared-template-only` proves rendered design reuse, not editorial family acceptance. Its inventory decision remains provisional.',
  '- A repeated route in a keyword owner file fails the duplicate gate immediately.',
  '- `deploymentReadinessSignedOff` stays false until both locale completion audits and the production handoff are deliberately verified.',
];
writeFileSync(resolve(auditDir, 'goal-completion-ledger.md'), `${lines.join('\n')}\n`);

console.log(`Goal ledger: ${ledger.objectiveState}`);
console.log(`NL ${localeSummary.nl.exactOwners}/${localeSummary.nl.sitemapRoutes} exact owners; EN ${localeSummary.en.exactOwners}/${localeSummary.en.sitemapRoutes}.`);
for (const [name, queue] of Object.entries(activeQueues) as Array<[string, any]>) console.log(`${name}: ${queue.complete}/${queue.expected}; remaining ${queue.remainingCount}.`);
