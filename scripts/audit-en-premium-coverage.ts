type RouteResult = {
  route: string;
  segment: string;
  status: number;
  premium: boolean;
  schema: boolean;
  sponsored: boolean;
  title: string;
  h1: string;
};

const baseUrl = process.env.SITE_AUDIT_BASE_URL || "http://localhost:3000";
// Keep the default gentle enough for a long-running Next.js dev server. Higher
// values can be supplied explicitly when auditing a production build.
const concurrency = Number(process.env.SITE_AUDIT_CONCURRENCY || 6);
const sampleLimit = Number(process.env.SITE_AUDIT_SAMPLE_LIMIT || 30);

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
  const response = await fetch(`${baseUrl}${route}`, { redirect: "follow" });
  const html = await response.text();
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
  const h1 = text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const premium = /shadow-editorial-lift|section-divider-bottom|data-premium-template/i.test(html);
  return {
    route,
    segment: routeSegment(route),
    status: response.status,
    premium,
    schema: /application\/ld\+json/i.test(html),
    sponsored: /rel=["'][^"']*sponsored/i.test(html),
    title,
    h1,
  };
}

async function main() {
  const sitemap = await fetch(`${baseUrl}/sitemap.xml`).then((response) => response.text());
  const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
    .map((match) => match[1] || "/")
    .filter((route) => !route.startsWith("/nl/"));
  const results: RouteResult[] = [];
  let cursor = 0;

  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      try {
        results.push(await inspect(route));
      } catch {
        results.push({ route, segment: routeSegment(route), status: 0, premium: false, schema: false, sponsored: false, title: "", h1: "" });
      }
      if (results.length % 100 === 0 || results.length === routes.length) {
        process.stderr.write(`premium coverage ${results.length}/${routes.length}\n`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  const families = [...new Set(results.map((item) => item.segment))].map((segment) => {
    const family = results.filter((item) => item.segment === segment);
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
    routes: results.length,
    premium: results.filter((item) => item.premium).length,
    legacy: results.filter((item) => !item.premium).length,
    failed: results.filter((item) => item.status !== 200).length,
    families,
    legacySamples: results.filter((item) => !item.premium).slice(0, sampleLimit),
  };
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
