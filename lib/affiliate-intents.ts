// lib/affiliate-intents.ts
// Structured affiliate intent per cluster page type

export type AffiliateIntent = 'hotels' | 'tours' | 'activities' | 'insurance' | 'esim' | 'transport';

export interface PageAffiliateConfig {
  primary: AffiliateIntent;
  secondary: AffiliateIntent;
  support: AffiliateIntent;
}

export const clusterAffiliateIntents: Record<string, PageAffiliateConfig> = {
  'destination-hub': {
    primary: 'tours',
    secondary: 'hotels',
    support: 'insurance',
  },
  'things-to-do': {
    primary: 'tours',
    secondary: 'insurance',
    support: 'esim',
  },
  'hotels': {
    primary: 'hotels',
    secondary: 'insurance',
    support: 'transport',
  },
  'where-to-stay': {
    primary: 'hotels',
    secondary: 'tours',
    support: 'insurance',
  },
  'travel-guide': {
    primary: 'insurance',
    secondary: 'tours',
    support: 'esim',
  },
};

// Affiliate link configs for non-city-specific products
export const globalAffiliates = {
  insurance: {
    safetywing: {
      name: 'SafetyWing',
      url: 'https://safetywing.com/?referenceID=go2thailand',
      cta: 'Compare travel insurance on SafetyWing',
    },
  },
  esim: {
    saily: {
      name: 'Saily',
      url: 'https://go.nordvpn.net/aff_c?offer_id=959&aff_id=102798',
      cta: 'Get a Thailand eSIM with Saily',
    },
  },
  transport: {
    twelveGo: {
      name: '12Go',
      url: 'https://12go.co/en?z=4136498',
      cta: 'Book transport on 12Go',
    },
  },
};

export function getPageAffiliateConfig(pageType: string): PageAffiliateConfig {
  return clusterAffiliateIntents[pageType] || clusterAffiliateIntents['destination-hub'];
}
