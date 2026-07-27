type RouteResult = {
  route: string;
  segment: string;
  status: number;
  premium: boolean;
  schema: boolean;
  sponsored: boolean;
  title: string;
  h1: string;
  attempts: number;
  error: string;
};

const baseUrl = process.env.SITE_AUDIT_BASE_URL || "http://localhost:3000";
// Keep the default gentle enough for a long-running Next.js dev server. Higher
// values can be supplied explicitly when auditing a production build.
const concurrency = Number(process.env.SITE_AUDIT_CONCURRENCY || 2);
const sampleLimit = Number(process.env.SITE_AUDIT_SAMPLE_LIMIT || 30);
const routeOffset = Number(process.env.SITE_AUDIT_OFFSET || 0);
const routeLimit = Number(process.env.SITE_AUDIT_LIMIT || 0);
const requestTimeoutMs = Number(process.env.SITE_AUDIT_TIMEOUT_MS || 45_000);
const maxAttempts = Number(process.env.SITE_AUDIT_ATTEMPTS || 3);
const throttleMs = Number(process.env.SITE_AUDIT_THROTTLE_MS || 125);

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function text(value: string) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function routeSegment(route: string) {
  return route.split("/").filter(Boolean)[0] || "home";
}

async function inspect(route: string): Promise<RouteResult> {
  let response: Response | null = null;
  let html = "";
  let lastError = "";
  let attempts = 0;

  for (attempts = 1; attempts <= maxAttempts; attempts += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
    try {
      response = await fetch(`${baseUrl}${route}`, { redirect: "follow", signal: controller.signal });
      html = await response.text();
      if (response.status < 500) break;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      response = null;
      html = "";
    } finally {
      clearTimeout(timeout);
    }
    if (attempts < maxAttempts) await wait(500 * attempts);
  }

  const status = response?.status || 0;
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
  const h1 = text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const premium = /shadow-editorial-lift|section-divider-bottom|data-premium-template/i.test(html);
  return {
    route,
    segment: routeSegment(route),
    status,
    premium,
    schema: /application\/ld\+json/i.test(html),
    sponsored: /rel=["'][^"']*sponsored/i.test(html),
    title,
    h1,
    attempts: Math.min(attempts, maxAttempts),
    error: status === 200 ? "" : lastError || `HTTP ${status}`,
  };
}

async function main() {
  const sitemap = await fetch(`${baseUrl}/sitemap.xml`).then((response) => response.text());
  const allRoutes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
    .map((match) => match[1] || "/")
    .filter((route) => !route.startsWith("/nl/"));
  const routes = allRoutes.slice(routeOffset, routeLimit > 0 ? routeOffset + routeLimit : undefined);
  const results: RouteResult[] = [];
  let cursor = 0;

  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      try {
        results.push(await inspect(route));
      } catch (error) {
        results.push({ route, segment: routeSegment(route), status: 0, premium: false, schema: false, sponsored: false, title: "", h1: "", attempts: 0, error: error instanceof Error ? error.message : String(error) });
      }
      if (throttleMs > 0) await wait(throttleMs);
      if (results.length % 100 === 0 || results.length === routes.length) {
        process.stderr.write(`premium coverage ${results.length}/${routes.length}\n`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  const successful = results.filter((item) => item.status === 200);
  const families = [...new Set(successful.map((item) => item.segment))].map((segment) => {
    const family = successful.filter((item) => item.segment === segment);
    return {
      segment,
      routes: family.length,
      premium: family.filter((item) => item.premium).length,
      legacy: family.filter((item) => !item.premium).length,
      withoutSchema: family.filter((item) => !item.schema).length,
      withoutSponsoredLink: family.filter((item) => !item.sponsored).length,
    };
  }).sort((a, b) => b.legacy - a.legacy || b.routes - a.routes);

  const payload = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    totalSitemapRoutes: allRoutes.length,
    routeOffset,
    requestedRoutes: routes.length,
    routes: results.length,
    successful: successful.length,
    premium: successful.filter((item) => item.premium).length,
    legacy: successful.filter((item) => !item.premium).length,
    failed: results.filter((item) => item.status !== 200).length,
    families,
    failedSamples: results.filter((item) => item.status !== 200).slice(0, sampleLimit),
    legacySamples: successful.filter((item) => !item.premium).slice(0, sampleLimit),
  };
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
