/**
 * Blog funnel-intent classifier.
 *
 * Extends `blog-buyer-intent.ts` from hotel-only CTAs into a full
 * trip-funnel framework. Classifies each blog into a blog *type*
 * (destination, things-to-do, transport, hotel, travel-prep, generic)
 * and decides which monetization layers to surface based on that type.
 *
 * Principle: never force all layers on every post. A street-food post
 * shouldn't surface insurance CTAs; a travel-prep post shouldn't push
 * hotels. The type determines the "must-have" vs "suggested" layers.
 *
 * Supports ALL 40 cities with cluster data, not just the 5 PSEO ones —
 * even for cities without PSEO pages, we still have /best-hotels/<city>/
 * (cluster page) and per-city affiliate deeplinks from `lib/affiliates.ts`.
 */

import { cityAffiliates, BOOKING_GENERIC, KLOOK_GENERIC, GYG_GENERIC, TWELVEGO_GENERIC, SAILY_GENERIC } from './affiliates';

export type BlogType = 'destination' | 'things-to-do' | 'transport' | 'hotel' | 'travel-prep' | 'generic';

export type MonetizationLayer =
  | 'stay'          // where-to-stay / best-hotels
  | 'specific-hotel' // individual /hotel/[slug]/ page if matched
  | 'transport'     // 12Go
  | 'activity'      // Klook / GYG tours
  | 'esim'          // Saily
  | 'insurance';    // SafetyWing (we don't have a direct affiliate tag here, but link to /travel-insurance/)

export interface BlogFunnelInput {
  slug: string;
  title?: string;
  tags?: string[];
  contentHtml?: string;
}

export interface FunnelCta {
  layer: MonetizationLayer;
  label: string;
  href: string;
  external: boolean;
  sub?: string;
}

export interface BlogFunnelContext {
  blogType: BlogType;
  citySlug: string | null;
  cityName: string | null;
  originCitySlug?: string | null; // for transport-type blogs: "bangkok to ayutthaya" → origin=bangkok, dest=ayutthaya
  originCityName?: string | null;
  mustCtas: FunnelCta[];       // render prominently
  suggestedCtas: FunnelCta[];  // render below, smaller
}

// -------------------------------------------------------------------
// City detection — all 40 affiliate cities, not just the 5 PSEO ones.
// -------------------------------------------------------------------
const CITY_DISPLAY_NAMES: Record<string, string> = {
  'ayutthaya': 'Ayutthaya',
  'bangkok': 'Bangkok',
  'bueng-kan': 'Bueng Kan',
  'chanthaburi': 'Chanthaburi',
  'chiang-khan': 'Chiang Khan',
  'chiang-mai': 'Chiang Mai',
  'chiang-rai': 'Chiang Rai',
  'chumphon': 'Chumphon',
  'hat-yai': 'Hat Yai',
  'hua-hin': 'Hua Hin',
  'kanchanaburi': 'Kanchanaburi',
  'khon-kaen': 'Khon Kaen',
  'koh-samui': 'Koh Samui',
  'krabi': 'Krabi',
  'lampang': 'Lampang',
  'lopburi': 'Lopburi',
  'mae-hong-son': 'Mae Hong Son',
  'mukdahan': 'Mukdahan',
  'nakhon-phanom': 'Nakhon Phanom',
  'nakhon-ratchasima': 'Nakhon Ratchasima',
  'nakhon-si-thammarat': 'Nakhon Si Thammarat',
  'nong-khai': 'Nong Khai',
  'pai': 'Pai',
  'pattaya': 'Pattaya',
  'phitsanulok': 'Phitsanulok',
  'phuket': 'Phuket',
  'rayong': 'Rayong',
  'sukhothai': 'Sukhothai',
  'surat-thani': 'Surat Thani',
  'trang': 'Trang',
  'trat': 'Trat',
  'ubon-ratchathani': 'Ubon Ratchathani',
  'udon-thani': 'Udon Thani',
};

function citySlugPattern(slug: string): RegExp[] {
  const words = slug.split('-');
  const loose = words.join('[\\s-]?');
  return [new RegExp(`\\b${loose}\\b`, 'g')];
}

function normText(input: BlogFunnelInput): string {
  const tags = Array.isArray(input.tags) ? input.tags : [];
  const content = (input.contentHtml || '').replace(/<[^>]+>/g, ' ').slice(0, 5000); // cap to avoid regex explosions
  return `${input.slug} ${input.title || ''} ${tags.join(' ')} ${content}`.toLowerCase();
}

function detectCityAll(text: string): { slug: string; name: string } | null {
  const hits: Array<{ slug: string; name: string; count: number }> = [];
  for (const slug of Object.keys(CITY_DISPLAY_NAMES)) {
    const patterns = citySlugPattern(slug);
    let total = 0;
    for (const p of patterns) {
      const m = text.match(p);
      if (m) total += m.length;
    }
    if (total > 0) hits.push({ slug, name: CITY_DISPLAY_NAMES[slug], count: total });
  }
  hits.sort((a, b) => b.count - a.count);
  if (hits.length === 0) return null;
  return { slug: hits[0].slug, name: hits[0].name };
}

// -------------------------------------------------------------------
// Blog type classification
// -------------------------------------------------------------------
export function detectBlogType(input: BlogFunnelInput): BlogType {
  const text = normText(input);
  const slug = (input.slug || '').toLowerCase();

  // Order matters — destination itineraries often mention transport/activity
  // keywords in the body, so we match their dominant framing FIRST and treat
  // transport/activity as secondary layers (recipe handles that).
  //
  // 1. Transport as PRIMARY intent: only when slug is a route "bangkok-to-X"
  //    or the SLUG/TITLE itself is transport-framed. Body content doesn't count.
  const slugOrTitle = `${slug} ${(input.title || '').toLowerCase()}`;
  if (extractRoute(slug) || /\b(how to get to|how to get from|getting from|train from|bus from|ferry from|airport transfer|shuttle to|fly from)\b/.test(slugOrTitle)) {
    return 'transport';
  }
  // 2. Travel-prep: slug/title frames prep explicitly (eSIM / insurance / visa / packing).
  if (/\b(esim|sim card|travel insurance|what to pack|packing list|visa requirements|travel adapter|thai baht|best bank card|best currency)\b/.test(slugOrTitle)) {
    return 'travel-prep';
  }
  // 3. Hotel: review / where to stay / best hotels (slug/title)
  if (/\b(hotel review|where to stay|best hotels|best resort|best hostel|hotels in|resort review)\b/.test(slugOrTitle)) {
    return 'hotel';
  }
  // 4. Destination/itinerary: trip, days in, weekend, itinerary (slug/title)
  if (/\b(itinerary|weekend|\d+ days? in|days in|trip to|trip from|trip in|visit|guide to|travel guide|first time in|honeymoon in)\b/.test(slugOrTitle)) {
    return 'destination';
  }
  // 5. Things-to-do: tours, temples, beaches, activities (slug/title)
  if (/\b(things to do|what to do|best temples|best beaches|best tours|attractions|activities in|top \d+|best \d+|top things|best things)\b/.test(slugOrTitle)) {
    return 'things-to-do';
  }
  return 'generic';
}

// Transport-type slugs may encode origin-to-dest. Extract both.
function extractRoute(slug: string): { origin: string; dest: string } | null {
  const m = slug.match(/^([a-z-]+?)-to-([a-z-]+)$/);
  if (!m) return null;
  // Heuristic: both halves must be known cities.
  const candidates = Object.keys(CITY_DISPLAY_NAMES);
  const fit = (s: string) => candidates.find(c => s === c || s.endsWith(c) || s.startsWith(c));
  const origin = fit(m[1]);
  const dest = fit(m[2]);
  if (!origin || !dest) return null;
  return { origin, dest };
}

// -------------------------------------------------------------------
// Monetization recipe per blog type
// -------------------------------------------------------------------
const RECIPE: Record<BlogType, { must: MonetizationLayer[]; suggested: MonetizationLayer[] }> = {
  destination:   { must: ['stay', 'transport'],              suggested: ['activity'] },
  'things-to-do':{ must: ['activity', 'stay'],               suggested: [] },
  transport:     { must: ['transport', 'stay'],              suggested: [] },
  hotel:         { must: ['stay', 'specific-hotel'],         suggested: ['activity'] },
  'travel-prep': { must: ['esim', 'insurance'],              suggested: ['stay'] },
  generic:       { must: ['stay'],                            suggested: [] },
};

// -------------------------------------------------------------------
// CTA builders per layer
// -------------------------------------------------------------------
function ctaStay(citySlug: string, cityName: string): FunnelCta {
  return {
    layer: 'stay',
    label: `Where to stay in ${cityName}`,
    href: `/guides/where-to-stay/${citySlug}/`,
    external: false,
    sub: 'Compare neighbourhoods, see top hotels.',
  };
}

function ctaTransport(origin: string | null, dest: string | null, originName: string | null, destName: string | null): FunnelCta {
  // Prefer origin-city's per-city 12Go link (destination search is pre-filled on partner side).
  const citySlug = origin || dest;
  const cityName = originName || destName;
  const aff = citySlug ? cityAffiliates[citySlug] : undefined;
  const href = aff?.twelveGo ?? TWELVEGO_GENERIC;
  const label = origin && dest
    ? `Compare ${originName} → ${destName} transport`
    : cityName
      ? `Compare transport in ${cityName}`
      : 'Compare transport in Thailand';
  return { layer: 'transport', label, href, external: true, sub: 'Trains, vans, ferries via 12Go Asia.' };
}

function ctaActivity(citySlug: string | null, cityName: string | null): FunnelCta {
  const aff = citySlug ? cityAffiliates[citySlug] : undefined;
  const href = aff?.klook ?? KLOOK_GENERIC;
  return {
    layer: 'activity',
    label: cityName ? `Book tours in ${cityName}` : 'Book tours in Thailand',
    href,
    external: true,
    sub: 'Klook & GetYourGuide experiences.',
  };
}

function ctaEsim(): FunnelCta {
  return {
    layer: 'esim',
    label: 'Thailand eSIM (Saily)',
    href: SAILY_GENERIC,
    external: true,
    sub: 'Skip airport SIM queues.',
  };
}

function ctaInsurance(): FunnelCta {
  return {
    layer: 'insurance',
    label: 'Travel insurance',
    href: '/travel-insurance/',
    external: false,
    sub: 'SafetyWing & Ekta compared.',
  };
}

function ctaSpecificHotel(hotelSlug: string, hotelName: string): FunnelCta {
  return {
    layer: 'specific-hotel',
    label: `Read ${hotelName} review`,
    href: `/hotel/${hotelSlug}/`,
    external: false,
    sub: 'Full review + rates.',
  };
}

// -------------------------------------------------------------------
// Main entry
// -------------------------------------------------------------------
export function getBlogFunnelContext(input: BlogFunnelInput): BlogFunnelContext {
  const text = normText(input);
  const blogType = detectBlogType(input);
  const primaryCity = detectCityAll(text);

  // Transport: try to extract origin-to-dest from slug for both-city CTAs.
  let origin: string | null = null;
  let dest: string | null = null;
  let originName: string | null = null;
  let destName: string | null = null;
  if (blogType === 'transport') {
    const r = extractRoute((input.slug || '').toLowerCase());
    if (r) {
      origin = r.origin;
      dest = r.dest;
      originName = CITY_DISPLAY_NAMES[r.origin];
      destName = CITY_DISPLAY_NAMES[r.dest];
    }
  }

  const resolvedCitySlug = primaryCity?.slug ?? dest ?? origin ?? null;
  const resolvedCityName = primaryCity?.name ?? destName ?? originName ?? null;

  const recipe = RECIPE[blogType];

  const layerToCta = (layer: MonetizationLayer): FunnelCta | null => {
    switch (layer) {
      case 'stay':
        return resolvedCitySlug && resolvedCityName ? ctaStay(resolvedCitySlug, resolvedCityName) : null;
      case 'transport':
        return ctaTransport(origin, dest ?? resolvedCitySlug, originName, destName ?? resolvedCityName);
      case 'activity':
        return ctaActivity(resolvedCitySlug, resolvedCityName);
      case 'esim': return ctaEsim();
      case 'insurance': return ctaInsurance();
      case 'specific-hotel': return null; // needs hotel detection — caller can fill in
      default: return null;
    }
  };

  const mustCtas = recipe.must.map(layerToCta).filter((x): x is FunnelCta => x !== null);
  const suggestedCtas = recipe.suggested.map(layerToCta).filter((x): x is FunnelCta => x !== null);

  return {
    blogType,
    citySlug: resolvedCitySlug,
    cityName: resolvedCityName,
    originCitySlug: origin,
    originCityName: originName,
    mustCtas,
    suggestedCtas,
  };
}

/** Backwards-compatible helper — some callers only care about Sail/SWB/booking. */
export function bookingGeneric(): string {
  return BOOKING_GENERIC;
}
