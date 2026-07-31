export {};

const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';

const routes = [
  '/nl/thailand-street-food/',
  '/nl/esim/',
  '/nl/social/',
  '/nl/weather/',
  '/nl/travel-gear/',
  '/nl/best-beaches-in-thailand/',
  '/nl/best-cooking-classes-in-thailand/',
  '/nl/best-muay-thai-in-thailand/',
  '/nl/best-elephant-sanctuaries-in-thailand/',
  '/nl/best-diving-snorkeling-in-thailand/',
  '/nl/grand-palace-tickets/',
  '/nl/phi-phi-island-tour/',
  '/nl/chiang-mai-elephant-sanctuary/',
  '/nl/best-places-to-visit-thailand/',
  '/nl/nightlife/',
  '/nl/nightlife/bangkok/',
  '/nl/nightlife/chiang-mai/',
  '/nl/nightlife/pattaya/',
  '/nl/nightlife/phuket/',
  ...[
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ].map((month) => `/nl/thailand-in/${month}/`),
];

const redirects: Record<string, string> = {
  '/nl/thailand-street-food/': '/nl/food/',
  '/nl/esim/': '/nl/travel-guides/sim-card-thailand/',
  '/nl/best-diving-snorkeling-in-thailand/': '/nl/travel-guides/diving-snorkeling-thailand/',
  '/nl/phi-phi-island-tour/': '/nl/phuket-tours/phi-phi-day-trip/',
  '/nl/best-places-to-visit-thailand/': '/nl/city/',
};

function decodeHtml(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function attribute(tag: string, name: string): string {
  return decodeHtml(tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] || '');
}

function hasPremiumSignature(html: string): boolean {
  const canvas = /\bbg-canvas\b/.test(html);
  const container = /\bcontainer-custom\b/.test(html);
  const display = /\bheading-redesign\b|\bfont-display\b/.test(html);
  const section = /\bsection-divider(?:-bottom)?\b|\bbg-tonal\b/.test(html);
  return canvas && container && display && section;
}

async function verify(route: string): Promise<string[]> {
  const errors: string[] = [];
  if (redirects[route]) {
    const response = await fetch(new URL(route, baseUrl), { redirect: 'manual' });
    const location = response.headers.get('location') || '';
    const pathname = location.startsWith('http') ? new URL(location).pathname : location;
    if (![301, 308].includes(response.status)) errors.push(`verwacht permanente redirect, kreeg HTTP ${response.status}`);
    if (pathname !== redirects[route]) errors.push(`redirect naar ${pathname || 'leeg'}, verwacht ${redirects[route]}`);
    return errors;
  }
  const response = await fetch(new URL(route, baseUrl));
  const html = await response.text();
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push('niet exact één H1');
  if (!/<html[^>]+lang=["']nl["']/i.test(html)) errors.push('html-lang is niet nl');

  const canonical = decodeHtml(html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] || '');
  const expectedCanonical = `https://go2-thailand.com${route}`;
  if (canonical !== expectedCanonical) errors.push(`canonical is ${canonical || 'leeg'}`);

  const alternates = [...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]*>/gi)].map((match) => match[0]);
  for (const locale of ['nl', 'en', 'x-default']) {
    if (!alternates.some((tag) => attribute(tag, 'hreflang') === locale)) errors.push(`hreflang ${locale} ontbreekt`);
  }

  if ((html.match(/application\/ld\+json/gi) || []).length < 2) errors.push('onvoldoende schema-opmaak');
  if (!hasPremiumSignature(html)) errors.push('premium designsignatuur ontbreekt');
  if (/Internal Server Error|Application error: a client-side exception/i.test(html)) errors.push('zichtbare runtimefout');

  const sponsored = [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => attribute(tag, 'rel').split(/\s+/).includes('sponsored'));
  for (const tag of sponsored) {
    const rel = attribute(tag, 'rel').split(/\s+/);
    if (!['noopener', 'noreferrer', 'nofollow', 'sponsored'].every((token) => rel.includes(token))) errors.push('affiliate-rel is onvolledig');
    if (attribute(tag, 'target') !== '_blank') errors.push('affiliate-uitgang opent niet extern');
  }
  return [...new Set(errors)];
}

async function main(): Promise<void> {
  const results = await Promise.all(routes.map(async (route) => ({ route, errors: await verify(route) })));
  const failures = results.filter((result) => result.errors.length);
  console.log(`NL manual-review: ${results.length - failures.length}/${results.length} technisch groen op ${baseUrl}.`);
  for (const result of failures) {
    console.error(`\n${result.route}`);
    for (const error of result.errors) console.error(`  - ${error}`);
  }
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
