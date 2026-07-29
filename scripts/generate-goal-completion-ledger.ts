import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
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

const inventory = readCsv<InventoryRoute>(resolve(PROJECT_ROOT, 'seo', 'inventory', 'routes.csv'));
const routeRows: any[] = [];
const localeSummary: Record<string, any> = {};
const activeQueues: Record<string, any> = {};

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
  const provisional = inventoryRows.filter(row => row.decision_status === 'provisional');

  for (const row of inventoryRows) {
    const rendered = coverageByPath.get(row.path);
    routeRows.push({
      locale,
      path: row.path,
      pageType: row.page_type,
      templateOwner: row.template_owner,
      recommendedAction: row.recommended_action,
      decisionStatus: row.decision_status,
      httpStatus: rendered?.status ?? null,
      designCoverage: rendered?.coverage ?? 'missing-report-row',
      exactOwner: keywordSet.has(row.path) || Boolean(rendered?.trackedOwner),
      amazonLinks: rendered?.amazonLinks || 0,
      proofState: keywordSet.has(row.path) || rendered?.trackedOwner ? 'exact-owner' : rendered?.coverage === 'premium-signature' || rendered?.coverage === 'hybrid-signature' ? 'shared-template-only' : 'unproven',
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

  if (locale === 'en') {
    const cityFoodExpected = inventoryRows.filter(row => /^\/city\/[^/]+\/food\/$/.test(row.path));
    const cityFoodMissing = cityFoodExpected.filter(row => !keywordSet.has(row.path) && !coverageByPath.get(row.path)?.trackedOwner).map(row => row.path);
    activeQueues['en-city-food'] = {
      definition: 'Every English sitemap city-food route requires an exact owner before this active family is closed.',
      expected: cityFoodExpected.length,
      complete: cityFoodExpected.length - cityFoodMissing.length,
      remaining: cityFoodMissing,
      closed: cityFoodMissing.length === 0,
    };
  }
}

const globalGates = {
  noDuplicateExactOwnerRoutes: Object.values(localeSummary).every((summary: any) => summary.duplicateExactOwnerRoutes.length === 0),
  allRoutesHttp200: Object.values(localeSummary).every((summary: any) => summary.http200 === summary.sitemapRoutes),
  noMissingDesignSignature: Object.values(localeSummary).every((summary: any) => summary.noSignature === 0),
  sitewideHardErrorsZero: Object.values(localeSummary).every((summary: any) => summary.sitewide.failedRoutes === 0),
  allInventoryDecisionsFinal: Object.values(localeSummary).every((summary: any) => summary.provisionalInventoryDecisions === 0),
  allActiveQueuesClosed: Object.values(activeQueues).every((queue: any) => queue.closed),
  deploymentReadinessSignedOff: false,
};

const ledger = {
  generatedAt: new Date().toISOString(),
  objectiveState: Object.values(globalGates).every(Boolean) ? 'ready-for-final-deployment-audit' : 'in-progress',
  completionRule: 'The goal may end only when every global gate is true and the final deployment-readiness audit is explicitly signed off.',
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
    `- Complete: **${queue.complete}/${queue.expected}**`,
    `- Closed: **${queue.closed ? 'yes' : 'no'}**`,
    `- Remaining: ${queue.remaining.length ? queue.remaining.map((path: string) => `\`${path}\``).join(', ') : 'none'}`,
    '',
  ]),
  '## Hard completion gates',
  '',
  ...Object.entries(globalGates).map(([gate, passed]) => `- [${passed ? 'x' : ' '}] ${gate}`),
  '',
  '## Interpretation',
  '',
  '- `exact-owner` means the route is registered in the locale keyword owner file or tracked by the rendered owner audit.',
  '- `shared-template-only` proves rendered design reuse, not unique editorial review. Inventory decisions remain provisional until their family evidence is explicitly resolved.',
  '- A repeated route in a keyword owner file fails the duplicate gate immediately.',
  '- `deploymentReadinessSignedOff` stays false until both locale completion audits and the production handoff are deliberately verified.',
];
writeFileSync(resolve(auditDir, 'goal-completion-ledger.md'), `${lines.join('\n')}\n`);

console.log(`Goal ledger: ${ledger.objectiveState}`);
console.log(`NL ${localeSummary.nl.exactOwners}/${localeSummary.nl.sitemapRoutes} exact owners; EN ${localeSummary.en.exactOwners}/${localeSummary.en.sitemapRoutes}.`);
for (const [name, queue] of Object.entries(activeQueues) as Array<[string, any]>) console.log(`${name}: ${queue.complete}/${queue.expected}; remaining ${queue.remaining.length}.`);
