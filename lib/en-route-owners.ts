/** Normalize legacy English internal URLs to the canonical route owners. */
export function normalizeEnInternalHref(href: string): string {
  if (!href.startsWith('/')) return href;

  const parsed = new URL(href, 'https://go2-thailand.com');
  let pathname = parsed.pathname;
  if (!pathname.endsWith('/')) pathname += '/';

  const exactOwners: Record<string, string> = {
    '/islands/phuket/': '/city/phuket/',
    '/transport/bangkok-to-bangkok/': '/transport/',
    '/transport/bangkok-to-koh-samui/': '/blog/bangkok-to-koh-samui-guide/',
    '/travel-insurance-thailand/': '/travel-insurance/',
    '/best-hotels/khao-sok/': '/top-10/hotels/',
    '/best-hotels/ban-krut/': '/city/ban-krut/#zones',
    '/city/koh-tao/': '/islands/koh-tao/',
    '/city/koh-tao/attractions/': '/islands/koh-tao/attractions/',
    '/city/koh-tao/diving/': '/islands/koh-tao/diving/',
    '/city/koh-tao/snorkeling/': '/islands/koh-tao/snorkeling/',
    '/city/ban-krut/best-time-to-visit/': '/city/ban-krut/#praktisch',
    '/city/ban-krut/weather/': '/city/ban-krut/#praktisch',
    '/region/northeastern/': '/region/isaan/',
    '/region/East/': '/region/',
    '/digital-nomad/': '/thailand-index/digital-nomad/',
  };
  pathname = exactOwners[pathname] || pathname;

  let match = pathname.match(/^\/destinations\/([^/]+)\/$/);
  if (match) pathname = `/city/${match[1]}/`;

  match = pathname.match(/^\/things-to-do\/([^/]+)\/$/);
  if (match) pathname = `/city/${match[1]}/attractions/`;

  match = pathname.match(/^\/city\/([^/]+)\/(?:hotels|top-10-hotels)\/$/);
  if (match) pathname = `/best-hotels/${match[1]}/`;

  match = pathname.match(/^\/guides\/where-to-stay\/([^/]+)\/$/);
  if (match) pathname = `/where-to-stay/${match[1]}/`;

  if (pathname === '/guides/where-to-stay/') pathname = '/where-to-stay/';

  // A pattern rewrite above can produce another known legacy owner (for
  // example city/khao-sok/top-10-hotels -> best-hotels/khao-sok). Resolve
  // that second hop here so rendered links always point at the final owner.
  pathname = exactOwners[pathname] || pathname;

  const missingCityOwners = new Set([
    'buriram',
    'chiang-khong',
    'kamphaeng-phet',
    'nan',
    'phetchaburi',
    'prachinburi',
    'prachuap-khiri-khan',
    'satun',
  ]);
  match = pathname.match(/^\/city\/([^/]+)(?:\/.*)?\/$/);
  if (match && missingCityOwners.has(match[1])) pathname = '/city/';

  return `${pathname}${parsed.search}${parsed.hash}`;
}
