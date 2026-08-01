export type BlogOwnerLocale = 'en' | 'nl';

export type BlogOwnerRenderer =
  | 'climate-update'
  | 'thai-curry-nl'
  | 'thai-curry-en'
  | 'durian-nl'
  | 'durian-en'
  | 'lumpini-hawker-nl'
  | 'lumpini-hawker-en'
  | 'bangkok-coffee-nl'
  | 'bangkok-coffee-en'
  | 'cave-fantasy-nl'
  | 'cave-fantasy-en'
  | 'new-luxury-resorts-nl'
  | 'new-luxury-resorts-en'
  | 'jodd-fairs-nl'
  | 'jodd-fairs-en'
  | 'chatuchak-food-nl'
  | 'chatuchak-food-en'
  | 'bangkok-street-food-markets-en'
  | 'bangkok-first-time-en'
  | 'thai-massage-nl'
  | 'thai-massage-en'
  | 'muay-thai-beginner-nl'
  | 'muay-thai-beginner-en'
  | 'harbor-island-nl'
  | 'harbor-island-en'
  | 'phuket-samui-comparison-en'
  | 'thailand-philippines-comparison-en'
  | 'thailand-bali-comparison-en'
  | 'thailand-vietnam-comparison-en'
  | 'bangkok-koh-samui-en'
  | 'bangkok-chiang-mai-sleeper-en'
  | 'thailand-island-hopping-en'
  | 'how-long-thailand-en'
  | 'best-time-thailand-en'
  | 'bts-bangkok-concert-en'
  | 'chiang-mai-chiang-rai-comparison-en'
  | 'khao-soi-en'
  | 'phuket-airport-en';

export interface BlogOwnerPostOverride {
  title: string;
  description: string;
  image: string;
  lastUpdated: string;
  stripLegacyContent?: boolean;
}

export interface BlogOwnerRegistration {
  renderer: BlogOwnerRenderer;
  postOverride?: BlogOwnerPostOverride;
}

type LocaleRegistrations = Partial<Record<BlogOwnerLocale, BlogOwnerRegistration>>;

const registration = (
  renderer: BlogOwnerRenderer,
  postOverride?: BlogOwnerPostOverride,
): BlogOwnerRegistration => ({ renderer, ...(postOverride ? { postOverride } : {}) });

const paired = (
  nl: BlogOwnerRenderer,
  en: BlogOwnerRenderer,
): LocaleRegistrations => ({
  nl: registration(nl),
  en: registration(en),
});

const BLOG_OWNER_REGISTRY: Readonly<Record<string, LocaleRegistrations>> = {
  'el-nino-2026-thailand-weather-heatwave-travel-tips': {
    nl: registration('climate-update'),
    en: registration('climate-update'),
  },
  'thai-curry-guide-green-red-yellow-massaman-panang': paired('thai-curry-nl', 'thai-curry-en'),
  'durian-season-thailand-2026-where-to-eat-buy-guide': paired('durian-nl', 'durian-en'),
  'bangkok-lumpini-hawker-centre-street-food-2026': paired('lumpini-hawker-nl', 'lumpini-hawker-en'),
  'bangkok-specialty-coffee-cafe-guide-2026': paired('bangkok-coffee-nl', 'bangkok-coffee-en'),
  'cave-fantasy-mbk-center-bangkok-immersive-art-2026': paired('cave-fantasy-nl', 'cave-fantasy-en'),
  'new-luxury-resorts-thailand-2026-marriott-hilton-mercure': paired('new-luxury-resorts-nl', 'new-luxury-resorts-en'),
  'jodd-fairs-bangkok-night-market-guide': paired('jodd-fairs-nl', 'jodd-fairs-en'),
  'chatuchak-weekend-market-food-guide': paired('chatuchak-food-nl', 'chatuchak-food-en'),
  'thai-massage-guide-types-prices': paired('thai-massage-nl', 'thai-massage-en'),
  'muay-thai-training-camps-thailand-beginners-guide-2026': paired('muay-thai-beginner-nl', 'muay-thai-beginner-en'),
  'harbor-island-bangkok-rooftop-waterpark-2026': paired('harbor-island-nl', 'harbor-island-en'),
  'best-street-food-markets-bangkok': {
    en: registration('bangkok-street-food-markets-en'),
  },
  'bangkok-travel-tips-reddit': {
    en: registration('bangkok-first-time-en'),
  },
  'phuket-vs-koh-samui-for-tourists': {
    en: registration('phuket-samui-comparison-en'),
  },
  'thailand-vs-philippines-which-southeast-asian-paradise-to-choose': {
    en: registration('thailand-philippines-comparison-en'),
  },
  'thailand-vs-bali-2026-which-is-better': {
    en: registration('thailand-bali-comparison-en'),
  },
  'thailand-vs-vietnam-which-country-visit-2026': {
    en: registration('thailand-vietnam-comparison-en'),
  },
  'bangkok-to-koh-samui-guide': {
    en: registration('bangkok-koh-samui-en', {
      title: 'Bangkok to Koh Samui: Flight, Train or Bus + Ferry?',
      description: 'Compare Bangkok to Koh Samui by direct flight, mainland flight, sleeper train or bus plus ferry. Choose by total journey, connections, luggage and live tickets.',
      image: '/images/redesign/bangkok-koh-samui-route-hero-v2.webp',
      lastUpdated: '2026-07-27',
      stripLegacyContent: true,
    }),
  },
  'bangkok-chiang-mai-sleeper-train-guide-2026': {
    en: registration('bangkok-chiang-mai-sleeper-en', {
      title: 'Bangkok to Chiang Mai Sleeper Train: Berths & Booking',
      description: 'Plan the Bangkok to Chiang Mai sleeper train by berth, station, luggage and arrival. Compare first and second class, then check current SRT or 12Go tickets.',
      image: '/images/redesign/bangkok-chiang-mai-sleeper-train-hero-v2.webp',
      lastUpdated: '2026-07-27',
      stripLegacyContent: true,
    }),
  },
  'thailand-island-hopping-guide': {
    en: registration('thailand-island-hopping-en', {
      title: 'Thailand Island Hopping: Routes, Coasts & Trip Planner',
      description: 'Plan a Thailand island-hopping route by coast, pace and ferry handoffs. Compare Gulf and Andaman chains, then check current tickets and island stays.',
      image: '/images/redesign/thailand-island-hopping-hero-v2.webp',
      lastUpdated: '2026-07-27',
      stripLegacyContent: true,
    }),
  },
  'how-long-spend-thailand': {
    en: registration('how-long-thailand-en', {
      title: 'How Many Days in Thailand? Choose Your Ideal Trip Length',
      description: 'Choose how many days to spend in Thailand by nights, hotel moves and travel style. Compare 5, 7, 10, 14 and 21-day route shapes without rushing.',
      image: '/images/redesign/how-long-thailand-trip-planner-hero-v2.webp',
      lastUpdated: '2026-07-27',
      stripLegacyContent: true,
    }),
  },
  'best-time-to-visit-thailand': {
    en: registration('best-time-thailand-en'),
  },
  'bts-world-tour-bangkok-december-2026-tickets-guide': {
    en: registration('bts-bangkok-concert-en'),
  },
  'chiang-rai-vs-chiang-mai-for-tourists': {
    en: registration('chiang-mai-chiang-rai-comparison-en'),
  },
  'khao-soi-chiang-mai-guide': {
    en: registration('khao-soi-en'),
  },
  'phuket-airport': {
    en: registration('phuket-airport-en'),
  },
};

export function getBlogOwnerRegistration(
  locale: BlogOwnerLocale,
  slug: string,
): BlogOwnerRegistration | null {
  return BLOG_OWNER_REGISTRY[slug]?.[locale] ?? null;
}

export function hasBlogOwnerRegistration(locale: BlogOwnerLocale, slug: string): boolean {
  return getBlogOwnerRegistration(locale, slug) !== null;
}

export function listBlogOwnerSlugs(locale?: BlogOwnerLocale): string[] {
  return Object.entries(BLOG_OWNER_REGISTRY)
    .filter(([, locales]) => !locale || Boolean(locales[locale]))
    .map(([slug]) => slug);
}
