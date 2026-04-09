// lib/affiliates.ts

export interface CityAffiliates {
  booking: string;   // Booking.com search URL with affiliate tag
  klook: string;     // Klook search URL with affiliate tag
  getyourguide: string; // GetYourGuide search URL
  twelveGo: string;  // 12Go transport URL with affiliate tag
}

// Travelpayouts affiliate links (marker: 602467, trs: 421888)
// Generic fallback links (used by blog pipeline + non-city pages)
export const BOOKING_GENERIC = 'https://booking.tpo.lv/2PT1kR82';
export const TRIP_GENERIC = 'https://trip.tpo.lv/TmObooZ5';
export const KLOOK_GENERIC = 'https://klook.tpo.lv/7Dt6WApj';
export const GYG_GENERIC = 'https://getyourguide.tpo.lv/GuAFfGGK';
export const TWELVEGO_GENERIC = 'https://12go.tpo.lv/tNA80urD';
export const SAILY_GENERIC = 'https://saily.tpo.lv/rf9lidnE';
export const NORDVPN_GENERIC = 'https://nordvpn.tpo.lv/ekHF1i55';
export const NORDPASS_GENERIC = 'https://nordvpn.tpo.lv/tp12zNjC';

// Append subid tracking parameter to affiliate URLs
export function withSubId(url: string, subId: string): string {
  if (!subId) return url;
  if (/[?&]subid=/.test(url)) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}subid=${encodeURIComponent(subId)}`;
}

export function withPlacementSubId(url: string, subId: string, placement?: string): string {
  const trackingSubId = [subId, placement].filter(Boolean).join('-');
  return withSubId(url, trackingSubId);
}

// Per-city deep links — generated via scripts/generate-affiliate-deeplinks.js
// Each link points to the city-specific search/results page on the partner site
export const cityAffiliates: Record<string, CityAffiliates> = {
  'ayutthaya': {
    booking: 'https://booking.tpo.lv/MD886MY6',
    klook: 'https://klook.tpo.lv/0JiXp35B',
    getyourguide: 'https://getyourguide.tpo.lv/hIPviHze',
    twelveGo: 'https://12go.tpo.lv/EwNEvn9M',
  },
  'bangkok': {
    booking: 'https://booking.tpo.lv/pOLaXoYB',
    klook: 'https://klook.tpo.lv/5BHQ40Kc',
    getyourguide: 'https://getyourguide.tpo.lv/b1gRUEN7',
    twelveGo: 'https://12go.tpo.lv/anImtKDC',
  },
  'bueng-kan': {
    booking: 'https://booking.tpo.lv/50C2YcSj',
    klook: 'https://klook.tpo.lv/BvCHy5aW',
    getyourguide: 'https://getyourguide.tpo.lv/QXh2IATK',
    twelveGo: 'https://12go.tpo.lv/4QgR8pId',
  },
  'chanthaburi': {
    booking: 'https://booking.tpo.lv/v6bN8wKW',
    klook: 'https://klook.tpo.lv/gRmSKp8z',
    getyourguide: 'https://getyourguide.tpo.lv/5nm6pPnW',
    twelveGo: 'https://12go.tpo.lv/nuPCwjyc',
  },
  'chiang-khan': {
    booking: 'https://booking.tpo.lv/yqqWtRj7',
    klook: 'https://klook.tpo.lv/5Ph923AB',
    getyourguide: 'https://getyourguide.tpo.lv/NWicCBqR',
    twelveGo: 'https://12go.tpo.lv/mXk14RMk',
  },
  'chiang-mai': {
    booking: 'https://booking.tpo.lv/lEUwZewc',
    klook: 'https://klook.tpo.lv/NZ1L0Po1',
    getyourguide: 'https://getyourguide.tpo.lv/36XcnVLp',
    twelveGo: 'https://12go.tpo.lv/XIuLL5yr',
  },
  'chiang-rai': {
    booking: 'https://booking.tpo.lv/e9hAbOBT',
    klook: 'https://klook.tpo.lv/oOVsFeR4',
    getyourguide: 'https://getyourguide.tpo.lv/wVXeTIQ3',
    twelveGo: 'https://12go.tpo.lv/Dq1aejpj',
  },
  'chumphon': {
    booking: 'https://booking.tpo.lv/urCRQ5mN',
    klook: 'https://klook.tpo.lv/pY1qP5lB',
    getyourguide: 'https://getyourguide.tpo.lv/mzSwE50c',
    twelveGo: 'https://12go.tpo.lv/pt9EXYO1',
  },
  'hat-yai': {
    booking: 'https://booking.tpo.lv/dKR7gtx9',
    klook: 'https://klook.tpo.lv/Mil13dSW',
    getyourguide: 'https://getyourguide.tpo.lv/opNPUU5J',
    twelveGo: 'https://12go.tpo.lv/oeISS6oE',
  },
  'hua-hin': {
    booking: 'https://booking.tpo.lv/NWxB9M36',
    klook: 'https://klook.tpo.lv/ZemI4PYw',
    getyourguide: 'https://getyourguide.tpo.lv/1K9quyiv',
    twelveGo: 'https://12go.tpo.lv/wz578hZX',
  },
  'kanchanaburi': {
    booking: 'https://booking.tpo.lv/OP1cX4mm',
    klook: 'https://klook.tpo.lv/3mKC3t4y',
    getyourguide: 'https://getyourguide.tpo.lv/TWXnINyY',
    twelveGo: 'https://12go.tpo.lv/ZwQ3ra7B',
  },
  'khon-kaen': {
    booking: 'https://booking.tpo.lv/dWfms0T5',
    klook: 'https://klook.tpo.lv/NPZ2UEUs',
    getyourguide: 'https://getyourguide.tpo.lv/z12711hg',
    twelveGo: 'https://12go.tpo.lv/ECeWXkxD',
  },
  'koh-samui': {
    booking: 'https://booking.tpo.lv/StgpQBTS',
    klook: 'https://klook.tpo.lv/cwdNfqYE',
    getyourguide: 'https://getyourguide.tpo.lv/Bx77lu7F',
    twelveGo: 'https://12go.tpo.lv/F8rI7W3h',
  },
  'krabi': {
    booking: 'https://booking.tpo.lv/12BVB5Lw',
    klook: 'https://klook.tpo.lv/ArQ0pxNB',
    getyourguide: 'https://getyourguide.tpo.lv/C9aDici6',
    twelveGo: 'https://12go.tpo.lv/jc2Pwqef',
  },
  'lampang': {
    booking: 'https://booking.tpo.lv/Hs9lLgzx',
    klook: 'https://klook.tpo.lv/dsdzjsVq',
    getyourguide: 'https://getyourguide.tpo.lv/9DkR9RJ1',
    twelveGo: 'https://12go.tpo.lv/JtWo8MaA',
  },
  'lopburi': {
    booking: 'https://booking.tpo.lv/LxuKNeEt',
    klook: 'https://klook.tpo.lv/8c2tr3Hh',
    getyourguide: 'https://getyourguide.tpo.lv/OJ8epAtG',
    twelveGo: 'https://12go.tpo.lv/kFXwoqFR',
  },
  'mae-hong-son': {
    booking: 'https://booking.tpo.lv/7NQYYJFw',
    klook: 'https://klook.tpo.lv/P5TbKddI',
    getyourguide: 'https://getyourguide.tpo.lv/VVAnTGa7',
    twelveGo: 'https://12go.tpo.lv/aodmUWwp',
  },
  'mukdahan': {
    booking: 'https://booking.tpo.lv/mI7CUGIt',
    klook: 'https://klook.tpo.lv/fQwV1ci7',
    getyourguide: 'https://getyourguide.tpo.lv/u4Dx2393',
    twelveGo: 'https://12go.tpo.lv/OiGsq4O8',
  },
  'nakhon-phanom': {
    booking: 'https://booking.tpo.lv/yt2X1DS5',
    klook: 'https://klook.tpo.lv/R0eYb9bu',
    getyourguide: 'https://getyourguide.tpo.lv/rXTjpqOd',
    twelveGo: 'https://12go.tpo.lv/DWBTVfwf',
  },
  'nakhon-ratchasima': {
    booking: 'https://booking.tpo.lv/kh9LqlWa',
    klook: 'https://klook.tpo.lv/KIhgN2xc',
    getyourguide: 'https://getyourguide.tpo.lv/QWIR4T3z',
    twelveGo: 'https://12go.tpo.lv/xPM49Ooq',
  },
  'nakhon-si-thammarat': {
    booking: 'https://booking.tpo.lv/m3XBxH9C',
    klook: 'https://klook.tpo.lv/BEialfKW',
    getyourguide: 'https://getyourguide.tpo.lv/UpQ2chhp',
    twelveGo: 'https://12go.tpo.lv/ymIPrGau',
  },
  'nong-khai': {
    booking: 'https://booking.tpo.lv/IzcbqdCa',
    klook: 'https://klook.tpo.lv/q7dOrnvU',
    getyourguide: 'https://getyourguide.tpo.lv/tWW5P5XX',
    twelveGo: 'https://12go.tpo.lv/qm6KEer9',
  },
  'pai': {
    booking: 'https://booking.tpo.lv/sKi8tHi6',
    klook: 'https://klook.tpo.lv/1Zz3pt0C',
    getyourguide: 'https://getyourguide.tpo.lv/QskRawmx',
    twelveGo: 'https://12go.tpo.lv/0pqtDbf7',
  },
  'pattaya': {
    booking: 'https://booking.tpo.lv/voAcZRL7',
    klook: 'https://klook.tpo.lv/0776PKKV',
    getyourguide: 'https://getyourguide.tpo.lv/XL3S0p0C',
    twelveGo: 'https://12go.tpo.lv/DS7mYOSq',
  },
  'phitsanulok': {
    booking: 'https://booking.tpo.lv/3l8hQ7tP',
    klook: 'https://klook.tpo.lv/4w7Dr9Mf',
    getyourguide: 'https://getyourguide.tpo.lv/oTUhnky5',
    twelveGo: 'https://12go.tpo.lv/bLAYax7f',
  },
  'phuket': {
    booking: 'https://booking.tpo.lv/dv8EjjhA',
    klook: 'https://klook.tpo.lv/pCBTi39H',
    getyourguide: 'https://getyourguide.tpo.lv/Snn7mt1S',
    twelveGo: 'https://12go.tpo.lv/BZUyZO8W',
  },
  'rayong': {
    booking: 'https://booking.tpo.lv/F3e22RXU',
    klook: 'https://klook.tpo.lv/x9mKLbXv',
    getyourguide: 'https://getyourguide.tpo.lv/G3bkWWac',
    twelveGo: 'https://12go.tpo.lv/LjskTUyY',
  },
  'sukhothai': {
    booking: 'https://booking.tpo.lv/XHQFvKr3',
    klook: 'https://klook.tpo.lv/EkHyhagm',
    getyourguide: 'https://getyourguide.tpo.lv/l6C6jID1',
    twelveGo: 'https://12go.tpo.lv/0y2fX7wu',
  },
  'surat-thani': {
    booking: 'https://booking.tpo.lv/3Co1acGT',
    klook: 'https://klook.tpo.lv/ctDeKOrW',
    getyourguide: 'https://getyourguide.tpo.lv/m2wO7IHb',
    twelveGo: 'https://12go.tpo.lv/AFzHUsWs',
  },
  'trang': {
    booking: 'https://booking.tpo.lv/80R3iFUA',
    klook: 'https://klook.tpo.lv/HBhmrpYV',
    getyourguide: 'https://getyourguide.tpo.lv/y8GU73g7',
    twelveGo: 'https://12go.tpo.lv/LRYTN4Ic',
  },
  'trat': {
    booking: 'https://booking.tpo.lv/1SLuOlSz',
    klook: 'https://klook.tpo.lv/KeQQg5hQ',
    getyourguide: 'https://getyourguide.tpo.lv/RA9pHvqo',
    twelveGo: 'https://12go.tpo.lv/qBcxUD3Z',
  },
  'ubon-ratchathani': {
    booking: 'https://booking.tpo.lv/mMA4AHza',
    klook: 'https://klook.tpo.lv/926ivW2P',
    getyourguide: 'https://getyourguide.tpo.lv/TX0vzDki',
    twelveGo: 'https://12go.tpo.lv/JiwYAWZg',
  },
  'udon-thani': {
    booking: 'https://booking.tpo.lv/m8kCILfs',
    klook: 'https://klook.tpo.lv/sfAs3edK',
    getyourguide: 'https://getyourguide.tpo.lv/KrUTmlf4',
    twelveGo: 'https://12go.tpo.lv/7YWnkawm',
  },
};

// Cities with affiliate links configured
export const affiliateCities = Object.keys(cityAffiliates);

export function getAffiliates(citySlug: string): CityAffiliates | null {
  return cityAffiliates[citySlug] ?? null;
}

// Island → nearest city mapping for affiliate lookups
export const islandAffiliateMap: Record<string, string> = {
  'koh-samui': 'koh-samui',
  'koh-phangan': 'koh-samui',
  'koh-tao': 'koh-samui',
  'koh-lanta': 'krabi',
  'koh-phi-phi': 'krabi',
  'koh-chang': 'pattaya',
  'koh-samet': 'pattaya',
  'koh-lipe': 'hat-yai',
  'koh-yao-noi': 'phuket',
  'koh-mak': 'pattaya',
  'phuket': 'phuket',
};

// Region → featured cities for affiliate display
export const regionFeaturedCities: Record<string, string[]> = {
  northern: ['chiang-mai', 'chiang-rai'],
  central: ['bangkok', 'ayutthaya'],
  southern: ['phuket', 'krabi'],
  isaan: ['khon-kaen', 'udon-thani'],
};

// Get affiliates for an island (resolves to nearest city)
export function getIslandAffiliates(islandSlug: string): CityAffiliates | null {
  const citySlug = islandAffiliateMap[islandSlug];
  if (!citySlug) return null;
  return getAffiliates(citySlug);
}
