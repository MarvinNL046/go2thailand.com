const nlCitiesWithoutOwner = new Set([
  'buriram',
  'chiang-khong',
  'kamphaeng-phet',
  'nan',
  'phetchaburi',
  'prachinburi',
  'satun',
]);

const localizedPhuketHotelCategories = new Set(['all-inclusive', 'family', 'resorts']);
const nlWeatherOwners = new Set(['bangkok', 'chiang-mai', 'koh-samui', 'krabi', 'phuket']);
const nlCitiesWithoutHotelOwner = new Set(['ban-krut']);
const nlAttractionDetailOwners = new Set([
  '/city/chiang-rai/attractions/blue-temple/',
  '/city/koh-samui/attractions/wat-plai-laem/',
]);

export function nlCityOwner(citySlug: string): string {
  if (citySlug === 'koh-tao') return '/islands/koh-tao/';
  return nlCitiesWithoutOwner.has(citySlug) ? '/city/' : `/city/${citySlug}/`;
}

export function nlAttractionsOwner(citySlug: string): string {
  if (citySlug === 'koh-tao') return '/islands/koh-tao/attractions/';
  return nlCitiesWithoutOwner.has(citySlug) ? '/activities/' : `/city/${citySlug}/attractions/`;
}

export function nlFoodOwner(citySlug: string): string {
  if (citySlug === 'koh-tao') return '/food/';
  return nlCitiesWithoutOwner.has(citySlug) ? '/food/' : `/city/${citySlug}/food/`;
}

export function nlHotelOwner(citySlug: string): string {
  return nlCitiesWithoutHotelOwner.has(citySlug) ? '/where-to-stay/' : `/best-hotels/${citySlug}/`;
}

export function normalizeNlInternalHref(href: string): string {
  if (!href.startsWith('/')) return href;

  const parsed = new URL(href, 'https://go2-thailand.com');
  let pathname = parsed.pathname.replace(/^\/nl(?=\/)/, '');
  if (!pathname.endsWith('/')) pathname += '/';

  const exactOwners: Record<string, string> = {
    '/travel-guides/first-time-thailand/': '/thailand-for-first-timers/',
    '/travel-guides/thai-cuisine-food-guide/': '/food/',
    '/travel-guides/thai-etiquette-dos-donts/': '/practical-info/etiquette-culture/',
    '/travel-guides/thailand-weather/': '/weather/',
    '/travel-guides/vaccinations-travel-health-thailand/': '/practical-info/health-vaccinations/',
    '/travel-insurance-thailand/': '/travel-insurance/',
    '/thailand-index/best-time/': '/weather/',
    '/thailand-index/safety/': '/is-thailand-safe/',
    '/digital-nomad/': '/thailand-index/digital-nomad/',
    '/islands/phuket/': '/city/phuket/',
    '/islands/koh-samui/': '/city/koh-samui/',
    '/islands/phi-phi/': '/islands/koh-phi-phi/',
    '/blog/best-beaches-in-thailand/': '/best-beaches-in-thailand/',
    '/blog/thailand-islands/': '/thailand-islands/',
    '/transport/bangkok-to-koh-samui/': '/transport/bangkok-to-surat-thani/',
  };
  pathname = exactOwners[pathname] || pathname;

  let match = pathname.match(/^\/where-to-stay\/([^/]+)(?:\/[^/]+)?\/$/);
  if (match) pathname = `/best-hotels/${match[1]}/`;

  match = pathname.match(/^\/guides\/where-to-stay\/([^/]+)\/$/);
  if (match) pathname = `/best-hotels/${match[1]}/`;

  match = pathname.match(/^\/areas\/([^/]+)\/[^/]+\/$/);
  if (match) pathname = `/best-hotels/${match[1]}/`;

  match = pathname.match(/^\/best-hotels\/([^/]+)\/([^/]+)\/$/);
  if (match && (match[1] !== 'phuket' || !localizedPhuketHotelCategories.has(match[2]))) {
    pathname = nlHotelOwner(match[1]);
  }

  match = pathname.match(/^\/best-hotels\/([^/]+)\/$/);
  if (match) pathname = nlHotelOwner(match[1]);

  match = pathname.match(/^\/destinations\/([^/]+)\/$/);
  if (match) pathname = nlCityOwner(match[1]);

  match = pathname.match(/^\/things-to-do\/([^/]+)\/$/);
  if (match) pathname = nlAttractionsOwner(match[1]);

  match = pathname.match(/^\/city\/([^/]+)\/(?:hotels|top-10-hotels)\/$/);
  if (match) pathname = nlHotelOwner(match[1]);

  match = pathname.match(/^\/city\/([^/]+)\/top-10-attractions\/$/);
  if (match) pathname = nlAttractionsOwner(match[1]);

  match = pathname.match(/^\/city\/([^/]+)\/top-10-restaurants\/$/);
  if (match) pathname = nlFoodOwner(match[1]);

  match = pathname.match(/^\/city\/([^/]+)\/food\/$/);
  if (match) pathname = nlFoodOwner(match[1]);

  match = pathname.match(/^\/city\/([^/]+)\/best-time-to-visit\/$/);
  if (match) pathname = `/city/${match[1]}/weather/`;

  match = pathname.match(/^\/city\/([^/]+)\/weather\/$/);
  if (match && !nlWeatherOwners.has(match[1])) pathname = '/weather/';

  match = pathname.match(/^\/city\/([^/]+)\/attractions\/[^/]+\/$/);
  if (match && !nlAttractionDetailOwners.has(pathname)) pathname = nlAttractionsOwner(match[1]);

  match = pathname.match(/^\/guides\/travel-guide\/([^/]+)\/$/);
  if (match) pathname = nlCityOwner(match[1]);

  match = pathname.match(/^\/city\/([^/]+)\/$/);
  if (match) pathname = nlCityOwner(match[1]);

  return `${pathname}${parsed.search}${parsed.hash}`;
}
