import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { nlTopicalManualGuides } from "../data/editorial/nl-topical-manual";

const baseUrl = process.env.SITE_VERIFY_BASE_URL || "http://localhost:3000";
const projectRoot = resolve(__dirname, "..");

const redirects: Record<string, string> = {
  "/nl/thailand-street-food/": "/nl/food/",
  "/nl/esim/": "/nl/travel-guides/sim-card-thailand/",
  "/nl/best-diving-snorkeling-in-thailand/": "/nl/travel-guides/diving-snorkeling-thailand/",
  "/nl/phi-phi-island-tour/": "/nl/phuket-tours/phi-phi-day-trip/",
  "/nl/best-places-to-visit-thailand/": "/nl/city/",
};

const owners = [
  { route: "/nl/social/", marker: "nl-social-hub", phrase: "Geen engagement als bewijs", minSchemas: 2, maxSponsored: 0 },
  { route: "/nl/weather/", phrase: "Beste reistijd Thailand", minSchemas: 3, maxSponsored: 8 },
  { route: "/nl/travel-gear/", phrase: "Paklijst Thailand", minSchemas: 3, maxSponsored: 8 },
  { route: "/nl/best-beaches-in-thailand/", marker: "nl-topical-best-beaches-in-thailand", phrase: "Kies eerst de kust", minSchemas: 2, maxSponsored: 12 },
  ...Object.values(nlTopicalManualGuides).map((guide) => ({
    route: new URL(guide.pageUrl).pathname,
    marker: `nl-topical-${guide.slug}`,
    phrase: guide.decisionTitle,
    minSchemas: 3,
    maxSponsored: guide.amazon?.length ? 3 : 1,
  })),
];

function decodeHtml(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function textOf(html: string): string {
  return decodeHtml(html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function attribute(tag: string, name: string): string {
  return decodeHtml(tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1] || "");
}

async function verifyRedirect(route: string, expected: string): Promise<string[]> {
  const response = await fetch(new URL(route, baseUrl), { redirect: "manual" });
  const location = response.headers.get("location") || "";
  const normalized = location.startsWith("http") ? new URL(location).pathname : location;
  const errors: string[] = [];
  if (![301, 308].includes(response.status)) errors.push(`verwacht permanente redirect, kreeg HTTP ${response.status}`);
  if (normalized !== expected) errors.push(`redirect naar ${normalized || "leeg"}, verwacht ${expected}`);
  return errors;
}

async function verifyOwner(owner: typeof owners[number]): Promise<string[]> {
  const response = await fetch(new URL(owner.route, baseUrl));
  const html = await response.text();
  const text = textOf(html);
  const errors: string[] = [];
  const canonical = decodeHtml(html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] || "");
  const expectedCanonical = `https://go2-thailand.com${owner.route}`;
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (canonical !== expectedCanonical) errors.push(`canonical is ${canonical || "leeg"}`);
  if (!html.includes('<html lang="nl"')) errors.push("html-lang is niet nl");
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push("niet exact één H1");
  if ((html.match(/application\/ld\+json/gi) || []).length < owner.minSchemas) errors.push("te weinig schemaregistraties");
  for (const alternate of ["nl", "en", "x-default"]) if (!html.includes(`hreflang="${alternate}"`)) errors.push(`hreflang ${alternate} ontbreekt`);
  if (owner.marker && !html.includes(`data-premium-template="${owner.marker}"`)) errors.push(`premium marker ${owner.marker} ontbreekt`);
  if (!text.toLowerCase().includes(owner.phrase.toLowerCase())) errors.push(`zichtbare kerntekst ontbreekt: ${owner.phrase}`);
  if (/Internal Server Error|Application error|real prices|best ethical options|sample data/i.test(text)) errors.push("oude of fouttekst zichtbaar");

  const sponsored = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]).filter((tag) => attribute(tag, "rel").split(/\s+/).includes("sponsored"));
  if (sponsored.length > owner.maxSponsored) errors.push(`${sponsored.length} affiliate-uitgangen; maximum ${owner.maxSponsored}`);
  if (sponsored.some((tag) => !["noopener", "noreferrer", "nofollow", "sponsored"].every((token) => attribute(tag, "rel").split(/\s+/).includes(token)))) errors.push("affiliate-rel is onvolledig");
  return errors;
}

async function main(): Promise<void> {
  const source = readFileSync(resolve(projectRoot, "next.config.js"), "utf8");
  const results: Array<{ route: string; errors: string[] }> = [];
  for (const [route, destination] of Object.entries(redirects)) {
    const errors: string[] = [];
    if (!source.includes(`source: "${route}"`) || !source.includes(`destination: "${destination}"`)) errors.push("redirect ontbreekt in next.config.js");
    errors.push(...await verifyRedirect(route, destination));
    results.push({ route, errors });
  }

  for (const guide of Object.values(nlTopicalManualGuides)) {
    if (!existsSync(resolve(projectRoot, "public", guide.heroImage.replace(/^\//, "")))) {
      results.push({ route: new URL(guide.pageUrl).pathname, errors: [`heroasset ontbreekt: ${guide.heroImage}`] });
    }
    if (guide.sources.length < 2 || guide.sources.some((item) => !item.url.startsWith("https://"))) {
      results.push({ route: new URL(guide.pageUrl).pathname, errors: ["controleerbare bronregistratie ontbreekt"] });
    }
    if (guide.faqs.length < 4) results.push({ route: new URL(guide.pageUrl).pathname, errors: ["te weinig FAQ-antwoorden"] });
  }

  for (const owner of owners) results.push({ route: owner.route, errors: await verifyOwner(owner) });
  const merged = new Map<string, string[]>();
  for (const result of results) merged.set(result.route, [...(merged.get(result.route) || []), ...result.errors]);
  const failures = [...merged.entries()].filter(([, errors]) => errors.length);
  console.log(`NL topical/manual-familie: ${14 - failures.length}/14 groen op ${baseUrl}.`);
  for (const [route, errors] of failures) {
    console.error(`\n${route}`);
    for (const error of errors) console.error(`  - ${error}`);
  }
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
