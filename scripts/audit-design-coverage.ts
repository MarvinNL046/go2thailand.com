import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  PROJECT_ROOT,
  parseCsvLine,
  readKeywordCsv,
  type SeoLocale,
} from "./seo-utils";

type InventoryRow = {
  locale: SeoLocale;
  path: string;
  page_type: string;
  template_owner: string;
};

type Coverage = "premium-signature" | "hybrid-signature" | "no-signature";

type RouteResult = InventoryRow & {
  status: number | null;
  coverage: Coverage;
  markerCount: number;
  markers: string[];
  trackedOwner: boolean;
  amazonLinks: number;
  amazonSlugs: string[];
  error?: string;
};

const baseUrl = process.env.DESIGN_AUDIT_BASE_URL || "http://localhost:3000";
const requestedLocale = process.env.DESIGN_AUDIT_LOCALE;
const locales: SeoLocale[] =
  requestedLocale === "nl" || requestedLocale === "en"
    ? [requestedLocale]
    : ["nl", "en"];
const concurrency = Math.max(
  1,
  Number(process.env.DESIGN_AUDIT_CONCURRENCY || 8),
);
const requestTimeout = Math.max(
  5_000,
  Number(process.env.DESIGN_AUDIT_TIMEOUT_MS || 30_000),
);
const reuseReport = process.env.DESIGN_AUDIT_REUSE_REPORT;
const refreshRoutes = new Set(
  (process.env.DESIGN_AUDIT_REFRESH_ROUTES || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map(normalisePath),
);

const markerTests: Array<[string, RegExp]> = [
  ["canvas", /\bbg-canvas\b/],
  ["container", /\bcontainer-custom\b/],
  ["display-heading", /\bheading-redesign\b|\bfont-display\b/],
  ["section-divider", /\bsection-divider(?:-bottom)?\b/],
  ["tonal-surface", /\bbg-tonal\b/],
  ["editorial-bridge", /sitewide-editorial-bridge-title/],
];

function readInventory(): InventoryRow[] {
  const file = resolve(PROJECT_ROOT, "seo", "inventory", "routes.csv");
  const lines = readFileSync(file, "utf8").split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0] || "");
  return lines
    .slice(1)
    .map((line) => {
      const values = parseCsvLine(line);
      const row = Object.fromEntries(
        header.map((key, index) => [key, values[index] || ""]),
      );
      return row as InventoryRow;
    })
    .filter((row) => locales.includes(row.locale));
}

function normalisePath(value: string): string {
  const path = value.startsWith("/") ? value : `/${value}`;
  return path === "/" || path.endsWith("/") ? path : `${path}/`;
}

function trackedOwners(): Map<SeoLocale, Set<string>> {
  return new Map(
    locales.map((locale) => [
      locale,
      new Set(
        readKeywordCsv(locale)
          .rows.filter((row) => row.status === "implemented")
          .map((row) => normalisePath(row.route)),
      ),
    ]),
  );
}

function classify(html: string): { coverage: Coverage; markers: string[] } {
  const markers = markerTests
    .filter(([, pattern]) => pattern.test(html))
    .map(([name]) => name);
  const markerSet = new Set(markers);
  const premium =
    markerSet.has("canvas") &&
    markerSet.has("container") &&
    markerSet.has("display-heading") &&
    (markerSet.has("section-divider") || markerSet.has("tonal-surface"));
  return {
    coverage: premium
      ? "premium-signature"
      : markers.length >= 2
        ? "hybrid-signature"
        : "no-signature",
    markers,
  };
}

function findAmazonSlugs(html: string): string[] {
  return [...html.matchAll(/href=["']\/go\/([a-z0-9-]+)\/?["']/gi)].map((match) => match[1]);
}

async function inspectRoute(
  row: InventoryRow,
  owners: Map<SeoLocale, Set<string>>,
): Promise<RouteResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeout);
  try {
    const response = await fetch(new URL(row.path, baseUrl), {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "Go2Thailand-DesignCoverageAudit/1.0" },
    });
    const html = await response.text();
    const classified = classify(html);
    const amazonSlugs = findAmazonSlugs(html);
    return {
      ...row,
      status: response.status,
      coverage: classified.coverage,
      markerCount: classified.markers.length,
      markers: classified.markers,
      trackedOwner:
        owners.get(row.locale)?.has(normalisePath(row.path)) || false,
      amazonLinks: amazonSlugs.length,
      amazonSlugs: [...new Set(amazonSlugs)],
    };
  } catch (error) {
    return {
      ...row,
      status: null,
      coverage: "no-signature",
      markerCount: 0,
      markers: [],
      trackedOwner:
        owners.get(row.locale)?.has(normalisePath(row.path)) || false,
      amazonLinks: 0,
      amazonSlugs: [],
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function runPool<T, R>(
  values: T[],
  worker: (value: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(values.length);
  let cursor = 0;
  let completed = 0;
  const runners = Array.from(
    { length: Math.min(concurrency, values.length) },
    async () => {
      while (cursor < values.length) {
        const index = cursor++;
        results[index] = await worker(values[index]);
        completed++;
        if (completed % 100 === 0 || completed === values.length) {
          console.log(`  routes ${completed}/${values.length}`);
        }
      }
    },
  );
  await Promise.all(runners);
  return results;
}

function countBy<T>(
  values: T[],
  key: (value: T) => string,
): Record<string, number> {
  return Object.fromEntries(
    [
      ...values.reduce((map, value) => {
        const name = key(value);
        map.set(name, (map.get(name) || 0) + 1);
        return map;
      }, new Map<string, number>()),
    ].sort((a, b) => b[1] - a[1]),
  );
}

async function main(): Promise<void> {
  const inventory = readInventory();
  const owners = trackedOwners();
  console.log(
    `Rendered design coverage: ${inventory.length} route(s) on ${baseUrl} (${locales.join(", ")}, concurrency ${concurrency}).`,
  );
  const reused: RouteResult[] = [];
  let pending = inventory;
  if (reuseReport) {
    const previous = JSON.parse(
      readFileSync(resolve(PROJECT_ROOT, reuseReport), "utf8"),
    ) as { routes?: RouteResult[] };
    const previousByRoute = new Map(
      (previous.routes || []).map((row) => [
        `${row.locale}:${normalisePath(row.path)}`,
        row,
      ]),
    );
    pending = [];
    for (const row of inventory) {
      const key = `${row.locale}:${normalisePath(row.path)}`;
      const previousRow = previousByRoute.get(key);
      if (!previousRow || refreshRoutes.has(normalisePath(row.path))) {
        pending.push(row);
        continue;
      }
      reused.push({
        ...previousRow,
        ...row,
        trackedOwner:
          owners.get(row.locale)?.has(normalisePath(row.path)) || false,
        amazonLinks: previousRow.amazonLinks || 0,
        amazonSlugs: previousRow.amazonSlugs || [],
      });
    }
    console.log(
      `  reuse ${reused.length} route result(s); refresh ${pending.length} from ${reuseReport}.`,
    );
  }
  const inspected = await runPool(pending, (row) => inspectRoute(row, owners));
  const resultByRoute = new Map(
    [...reused, ...inspected].map((row) => [
      `${row.locale}:${normalisePath(row.path)}`,
      row,
    ]),
  );
  const results = inventory.map((row) => {
    const result = resultByRoute.get(`${row.locale}:${normalisePath(row.path)}`);
    if (!result) throw new Error(`Missing design audit result for ${row.locale}:${row.path}`);
    return result;
  });
  const capturedAt = new Date().toISOString();
  const date = capturedAt.slice(0, 10);
  const localeKey = locales.length === 2 ? "all" : locales[0];
  const outputDir = resolve(PROJECT_ROOT, "seo", "audits", "runtime");
  mkdirSync(outputDir, { recursive: true });
  const jsonPath = resolve(
    outputDir,
    `design-coverage-${localeKey}-${date}.json`,
  );

  const summaries = Object.fromEntries(
    locales.map((locale) => {
      const localeRows = results.filter((row) => row.locale === locale);
      return [
        locale,
        {
          total: localeRows.length,
          httpOk: localeRows.filter((row) => row.status === 200).length,
          trackedOwners: localeRows.filter((row) => row.trackedOwner).length,
          amazonRoutes: localeRows.filter((row) => row.amazonLinks > 0).length,
          amazonLinks: localeRows.reduce((sum, row) => sum + row.amazonLinks, 0),
          amazonSlugs: [...new Set(localeRows.flatMap((row) => row.amazonSlugs))].sort(),
          byCoverage: countBy(localeRows, (row) => row.coverage),
          byTemplateOwner: Object.fromEntries(
            Object.entries(
              localeRows.reduce(
                (accumulator, row) => {
                  const entry = (accumulator[row.template_owner] ||= {
                    total: 0,
                    premium: 0,
                    hybrid: 0,
                    none: 0,
                    trackedOwners: 0,
                    amazonRoutes: 0,
                    amazonLinks: 0,
                  });
                  entry.total++;
                  if (row.coverage === "premium-signature") entry.premium++;
                  else if (row.coverage === "hybrid-signature") entry.hybrid++;
                  else entry.none++;
                  if (row.trackedOwner) entry.trackedOwners++;
                  if (row.amazonLinks > 0) entry.amazonRoutes++;
                  entry.amazonLinks += row.amazonLinks;
                  return accumulator;
                },
                {} as Record<
                  string,
                  {
                    total: number;
                    premium: number;
                    hybrid: number;
                    none: number;
                    trackedOwners: number;
                    amazonRoutes: number;
                    amazonLinks: number;
                  }
                >,
              ),
            ).sort(([, a], [, b]) => b.total - a.total),
          ),
        },
      ];
    }),
  );

  writeFileSync(
    jsonPath,
    JSON.stringify(
      { capturedAt, baseUrl, locales, summaries, routes: results },
      null,
      2,
    ),
  );

  const markdownPath = resolve(
    PROJECT_ROOT,
    "seo",
    "audits",
    `design-coverage-${localeKey}-${date}.md`,
  );
  const markdown: string[] = [
    "# Rendered design coverage",
    "",
    `**Captured:** ${capturedAt}`,
    `**Base URL:** ${baseUrl}`,
    "",
    "This report separates sitemap routes, rendered design signatures and exact implemented ContentOps owner routes. A premium signature proves that the current HTML uses the shared redesign primitives; it does not by itself prove unique copy or page-level editorial quality.",
    "",
  ];
  for (const locale of locales) {
    const summary = summaries[locale] as {
      total: number;
      httpOk: number;
      trackedOwners: number;
      amazonRoutes: number;
      amazonLinks: number;
      amazonSlugs: string[];
      byCoverage: Record<string, number>;
      byTemplateOwner: Record<
        string,
        {
          total: number;
          premium: number;
          hybrid: number;
          none: number;
          trackedOwners: number;
          amazonRoutes: number;
          amazonLinks: number;
        }
      >;
    };
    markdown.push(
      `## ${locale.toUpperCase()}`,
      "",
      `- Sitemap routes inspected: **${summary.total}**`,
      `- HTTP 200: **${summary.httpOk}/${summary.total}**`,
      `- Premium rendered signature: **${summary.byCoverage["premium-signature"] || 0}/${summary.total}**`,
      `- Hybrid rendered signature: **${summary.byCoverage["hybrid-signature"] || 0}/${summary.total}**`,
      `- No redesign signature: **${summary.byCoverage["no-signature"] || 0}/${summary.total}**`,
      `- Exact implemented ContentOps owners: **${summary.trackedOwners}**`,
      `- Routes with contextual Amazon links: **${summary.amazonRoutes}/${summary.total}**`,
      `- Rendered Amazon links: **${summary.amazonLinks}** across **${summary.amazonSlugs.length}** registered product slugs`,
      "",
      "| Template owner | Routes | Premium | Hybrid | No signature | Exact SEO owners | Amazon routes | Amazon links |",
      "|---|---:|---:|---:|---:|---:|---:|---:|",
      ...Object.entries(summary.byTemplateOwner).map(
        ([owner, row]) =>
          `| ${owner} | ${row.total} | ${row.premium} | ${row.hybrid} | ${row.none} | ${row.trackedOwners} | ${row.amazonRoutes} | ${row.amazonLinks} |`,
      ),
      "",
    );
  }
  writeFileSync(markdownPath, `${markdown.join("\n")}\n`);

  console.log(`JSON: ${jsonPath}`);
  console.log(`Summary: ${markdownPath}`);
  for (const locale of locales) {
    const summary = summaries[locale] as {
      total: number;
      trackedOwners: number;
      byCoverage: Record<string, number>;
    };
    console.log(
      `${locale.toUpperCase()}: ${summary.byCoverage["premium-signature"] || 0}/${summary.total} premium signature; ${summary.byCoverage["hybrid-signature"] || 0} hybrid; ${summary.trackedOwners} exact owners.`,
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
