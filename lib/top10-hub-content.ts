export type Top10HubSlug = 'root' | 'attractions' | 'restaurants' | 'hotels';

export const approvedCitySlugs = [
  'bangkok',
  'chiang-mai',
  'phuket',
  'pattaya',
  'ayutthaya',
  'krabi',
  'chiang-rai',
  'hat-yai',
  'sukhothai',
  'surat-thani',
  'pai',
  'mae-hong-son',
  'lampang',
  'khon-kaen',
  'udon-thani',
  'nakhon-ratchasima',
  'ubon-ratchathani',
  'kanchanaburi',
  'hua-hin',
  'lopburi',
  'phitsanulok',
  'trat',
  'rayong',
  'koh-samui',
  'nakhon-si-thammarat',
  'trang',
  'chumphon',
  'chanthaburi',
  'chiang-khan',
  'nong-khai',
  'bueng-kan',
  'nakhon-phanom',
  'mukdahan'
] as const;

export type CitySlug = (typeof approvedCitySlugs)[number];
type Top10Category = Exclude<Top10HubSlug, 'root'>;
type CityPageHref = `/city/${CitySlug}/`;
type Top10PageHref = `/city/${CitySlug}/top-10-${Top10Category}/`;

export interface HubSourceLink {
  label: string;
  url: string;
  note: string;
}

export interface HubFeaturedCity {
  slug: CitySlug;
  kicker: string;
  summary: string;
  primaryHref: Top10PageHref;
  secondaryHref?: CityPageHref;
}

export interface HubEditorialSection {
  title: string;
  description: string;
  citySlugs: CitySlug[];
  inlineSources?: HubSourceLink[];
}

export interface HubPageContent {
  title: string;
  description: string;
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  whyThisPageTitle: string;
  whyThisPageBody: string;
  featuredCities: HubFeaturedCity[];
  sections: HubEditorialSection[];
  sourceLinks: HubSourceLink[];
}

const tourismAuthoritySource: HubSourceLink = {
  label: 'Tourism Authority of Thailand',
  url: 'https://www.tourismthailand.org/',
  note: 'Official destination framework for city and region references.'
};

const unescoSource: HubSourceLink = {
  label: 'UNESCO World Heritage Centre',
  url: 'https://whc.unesco.org/en/statesparties/th',
  note: 'Used for heritage context across temple and historic-city coverage.'
};

const fineArtsSource: HubSourceLink = {
  label: 'Fine Arts Department of Thailand',
  url: 'https://www.finearts.go.th/',
  note: 'Used for historic-site and monument context.'
};

const michelinSource: HubSourceLink = {
  label: 'MICHELIN Guide Thailand',
  url: 'https://guide.michelin.com/th/en',
  note: 'Used for city dining context and chef-led restaurant framing.'
};

const thaiSelectSource: HubSourceLink = {
  label: 'Thai SELECT',
  url: 'https://www.thaiselect.com/',
  note: 'Used for Thai dining and restaurant identity context.'
};

const hotelsAssociationSource: HubSourceLink = {
  label: 'Thailand Hotels Association',
  url: 'https://www.thaihotels.org/',
  note: 'Used for lodging and hotel-sector context.'
};

const tcebSource: HubSourceLink = {
  label: 'Thailand Convention and Exhibition Bureau',
  url: 'https://www.tceb.or.th/en/',
  note: 'Used for city-basis and business-travel context.'
};

function featuredCity(
  slug: CitySlug,
  kicker: string,
  summary: string,
  category: Top10Category,
  secondaryHref?: CityPageHref
): HubFeaturedCity {
  return { slug, kicker, summary, primaryHref: top10Href(slug, category), secondaryHref };
}

function top10Href(slug: CitySlug, category: Top10Category): Top10PageHref {
  return `/city/${slug}/top-10-${category}/`;
}

function cityHref(slug: CitySlug): CityPageHref {
  return `/city/${slug}/`;
}

export const rootHubContent: HubPageContent = {
  title: 'Thailand Top-10 Guides 2026 | Editorial Hub',
  description:
    'Use our Thailand top-10 hubs to choose the right city guides for attractions, restaurants, and hotels with clear editorial structure and source-backed context.',
  heroEyebrow: 'Editorial Hub',
  heroTitle: 'Thailand Top-10 Guides',
  heroIntro:
    'These hubs are built to help you choose the right city-level guide rather than forcing the whole country into one nationwide top-10 list.',
  whyThisPageTitle: 'How To Use These Guides',
  whyThisPageBody:
    'Start with the category that matches the decision you are making, then open the strongest city cluster for the actual shortlist and source-backed planning detail.',
  featuredCities: [
    featuredCity(
      'bangkok',
      'Best for depth',
      'Bangkok is the broadest starting point when you want dense attraction coverage, strong food options, and hotel choices across several trip styles.',
      'attractions',
      cityHref('bangkok')
    ),
    featuredCity(
      'chiang-mai',
      'Best for easy pacing',
      'Chiang Mai works well when you want a compact city base with heritage temples, a clear food scene, and strong short-stay logic.',
      'attractions',
      cityHref('chiang-mai')
    ),
    featuredCity(
      'phuket',
      'Best for resort planning',
      'Phuket is the clearest beach-and-island hub when the hotel base and coastal day shape matter as much as the sightseeing list.',
      'hotels',
      cityHref('phuket')
    ),
    featuredCity(
      'pattaya',
      'Best for quick breaks',
      'Pattaya is useful for short, practical trip planning when you want a close-to-Bangkok coastal base with plenty of activity choices.',
      'hotels',
      cityHref('pattaya')
    ),
    featuredCity(
      'ayutthaya',
      'Best for heritage focus',
      'Ayutthaya is the cleanest entry point for historic-site planning when the trip is centered on temples, ruins, and a slower day rhythm.',
      'attractions',
      cityHref('ayutthaya')
    ),
    featuredCity(
      'krabi',
      'Best for coastal balance',
      'Krabi is a strong fit when you want a beach base that still supports a useful set of sightseeing and hotel decisions.',
      'hotels',
      cityHref('krabi')
    ),
    featuredCity(
      'hua-hin',
      'Best for easy stays',
      'Hua Hin is one of the simplest city-level hotel bases for travelers who want a calmer coastal stay with straightforward logistics.',
      'hotels',
      cityHref('hua-hin')
    ),
    featuredCity(
      'chiang-rai',
      'Best for temple routes',
      'Chiang Rai gives the clearest northern temple-and-landmark route when the trip is about distinctive sights rather than urban scale.',
      'attractions',
      cityHref('chiang-rai')
    ),
    featuredCity(
      'koh-samui',
      'Best for island stays',
      'Koh Samui is the strongest island-style lodging hub when the stay itself drives the shape of the trip.',
      'hotels',
      cityHref('koh-samui')
    ),
    featuredCity(
      'sukhothai',
      'Best for slow heritage trips',
      'Sukhothai is the most focused historic-city option when you want temples, open space, and a measured sightseeing day.',
      'attractions',
      cityHref('sukhothai')
    )
  ],
  sections: [
    {
      title: 'Major city bases first',
      description:
        'Use the biggest travel bases when you need broad choice, transit access, and flexible onward planning.',
      citySlugs: ['bangkok', 'chiang-mai', 'phuket', 'pattaya', 'krabi', 'hua-hin'],
      inlineSources: [tourismAuthoritySource, tcebSource]
    },
    {
      title: 'Heritage cities and temple routes',
      description:
        'Historic places work best when the guide is anchored around one clear reason to visit, not a broad country-wide list.',
      citySlugs: ['ayutthaya', 'sukhothai', 'lopburi', 'phitsanulok', 'kanchanaburi', 'chiang-rai'],
      inlineSources: [unescoSource, fineArtsSource]
    },
    {
      title: 'Coastal, island, and border gateways',
      description:
        'Coastal hubs and regional gateways need different page logic because the stay shape, day-trip shape, and transit shape all change.',
      citySlugs: [
        'koh-samui',
        'surat-thani',
        'hat-yai',
        'trang',
        'chumphon',
        'trat',
        'rayong',
        'chanthaburi',
        'nakhon-si-thammarat'
      ],
      inlineSources: [tourismAuthoritySource]
    },
    {
      title: 'Northern hill and river routes',
      description:
        'Smaller northern cities are useful when the trip is about atmosphere, slower pacing, and focused sightseeing rather than dense city scale.',
      citySlugs: ['pai', 'mae-hong-son', 'lampang', 'chiang-khan'],
      inlineSources: [tourismAuthoritySource, fineArtsSource]
    },
    {
      title: 'Isaan and Mekong city guides',
      description:
        'The northeastern city set is strongest when the hub directs readers into a tighter regional shortlist instead of a broad generic ranking.',
      citySlugs: ['khon-kaen', 'udon-thani', 'nakhon-ratchasima', 'ubon-ratchathani', 'nong-khai', 'bueng-kan', 'nakhon-phanom', 'mukdahan'],
      inlineSources: [tourismAuthoritySource, michelinSource]
    }
  ],
  sourceLinks: [
    tourismAuthoritySource,
    unescoSource,
    fineArtsSource,
    tcebSource
  ]
};

export const attractionsHubContent: HubPageContent = {
  title: 'Thailand Attraction Guides 2026 | Editorial Hub',
  description:
    'Editorial hub for Thailand attraction guides, with featured cities, strong internal linking, and visible source-backed references.',
  heroEyebrow: 'Editorial Hub',
  heroTitle: 'Thailand Attraction Guides',
  heroIntro:
    'Use this hub to choose the right city attraction guide by trip shape, not by generic nationwide hype.',
  whyThisPageTitle: 'How To Choose The Right City',
  whyThisPageBody:
    'Heritage cities, beach destinations, city-core temple breaks, and long day-trip bases all work differently, so the hub should route users into the right city cluster first.',
  featuredCities: [
    featuredCity(
      'bangkok',
      'Best for dense sightseeing',
      'Bangkok is the clearest all-purpose attraction base when you want a long list of temples, museums, and neighborhood-level stops.',
      'attractions',
      cityHref('bangkok')
    ),
    featuredCity(
      'ayutthaya',
      'Best for temple ruins',
      'Ayutthaya is the strongest heritage-city attraction entry when historic sites are the main reason for the stop.',
      'attractions',
      cityHref('ayutthaya')
    ),
    featuredCity(
      'chiang-mai',
      'Best for city-and-park balance',
      'Chiang Mai works well for readers who want temples, old-city lanes, and easy day-trip structure from one hub.',
      'attractions',
      cityHref('chiang-mai')
    ),
    featuredCity(
      'chiang-rai',
      'Best for landmark stops',
      'Chiang Rai gives a tighter landmark shortlist and a cleaner route into the city’s signature temple stops.',
      'attractions',
      cityHref('chiang-rai')
    ),
    featuredCity(
      'sukhothai',
      'Best for historic-park focus',
      'Sukhothai is the best fit when the attraction guide should stay centered on one major historic landscape.',
      'attractions',
      cityHref('sukhothai')
    ),
    featuredCity(
      'krabi',
      'Best for coastal scenery',
      'Krabi is a useful attraction base when beaches, cliffs, and day-trip variety matter more than urban sightseeing.',
      'attractions',
      cityHref('krabi')
    ),
    featuredCity(
      'phuket',
      'Best for mixed sightseeing',
      'Phuket supports a fuller attraction mix because old-town walking, viewpoints, and coastal sightseeing all fit the same trip.',
      'attractions',
      cityHref('phuket')
    ),
    featuredCity(
      'kanchanaburi',
      'Best for day-trip history',
      'Kanchanaburi is a strong fit when the attraction guide should balance history, river scenery, and outdoor stops.',
      'attractions',
      cityHref('kanchanaburi')
    )
  ],
  sections: [
    {
      title: 'Temple and heritage city routes',
      description:
        'These cities work best when the guide foregrounds monuments, ruins, and a compact set of historic landmarks.',
      citySlugs: ['bangkok', 'ayutthaya', 'sukhothai', 'lopburi', 'phitsanulok'],
      inlineSources: [unescoSource, fineArtsSource]
    },
    {
      title: 'Northern landmark and mountain stops',
      description:
        'The northern cluster is strongest when the guide separates old-town landmarks from mountain and river trips.',
      citySlugs: ['chiang-mai', 'chiang-rai', 'pai', 'mae-hong-son', 'lampang', 'chiang-khan'],
      inlineSources: [tourismAuthoritySource, unescoSource]
    },
    {
      title: 'Coastal viewpoints and island sightseeing',
      description:
        'Coastal cities need a sightseeing shortlist that matches beaches, islands, viewpoints, and easy day-trip logic.',
      citySlugs: [
        'phuket',
        'krabi',
        'koh-samui',
        'surat-thani',
        'trat',
        'rayong',
        'chanthaburi',
        'chumphon',
        'hat-yai',
        'nakhon-si-thammarat'
      ],
      inlineSources: [tourismAuthoritySource]
    },
    {
      title: 'Central day-trip bases',
      description:
        'These cities are useful when the guide should prioritize a practical base plus a short list of standout places to see.',
      citySlugs: ['pattaya', 'hua-hin', 'kanchanaburi', 'nakhon-ratchasima'],
      inlineSources: [tourismAuthoritySource, fineArtsSource]
    },
    {
      title: 'Regional city anchors',
      description:
        'The regional shortlists work best when the guide makes the city’s main landmark logic clear up front.',
      citySlugs: ['khon-kaen', 'udon-thani', 'ubon-ratchathani', 'nong-khai', 'bueng-kan', 'nakhon-phanom', 'mukdahan'],
      inlineSources: [tourismAuthoritySource]
    }
  ],
  sourceLinks: [
    tourismAuthoritySource,
    unescoSource,
    fineArtsSource,
    michelinSource
  ]
};

export const restaurantsHubContent: HubPageContent = {
  title: 'Thailand Restaurant Guides 2026 | Editorial Hub',
  description:
    'Editorial hub for Thailand restaurant guides, with featured food cities, strong internal linking, and visible source-backed references.',
  heroEyebrow: 'Editorial Hub',
  heroTitle: 'Thailand Restaurant Guides',
  heroIntro:
    'Use this hub to choose the city food guide that fits your trip, from MICHELIN-heavy dining cities to market-led and coastal seafood bases.',
  whyThisPageTitle: 'How To Choose The Right Food City',
  whyThisPageBody:
    'This page should route users by dining style and trip shape rather than relying on a single nationwide restaurant ranking.',
  featuredCities: [
    featuredCity(
      'bangkok',
      'Best for range',
      'Bangkok has the broadest dining range, so it is the strongest starting point when the food guide needs real depth.',
      'restaurants',
      cityHref('bangkok')
    ),
    featuredCity(
      'chiang-mai',
      'Best for easy food exploration',
      'Chiang Mai works well for a food-focused trip because the city is compact and the dining map is easy to read.',
      'restaurants',
      cityHref('chiang-mai')
    ),
    featuredCity(
      'phuket',
      'Best for mixed dining',
      'Phuket supports a broad restaurant shortlist because beach zones, Old Town, and resort areas each offer different meals.',
      'restaurants',
      cityHref('phuket')
    ),
    featuredCity(
      'hat-yai',
      'Best for market meals',
      'Hat Yai is a useful food hub when the guide should lean on local markets, easy dinners, and southern regional flavor.',
      'restaurants',
      cityHref('hat-yai')
    ),
    featuredCity(
      'khon-kaen',
      'Best for regional dining',
      'Khon Kaen gives the clearest Isaan dining anchor when regional dishes and local restaurants matter most.',
      'restaurants',
      cityHref('khon-kaen')
    ),
    featuredCity(
      'udon-thani',
      'Best for relaxed food trips',
      'Udon Thani is a strong food city when the trip should be built around straightforward regional meals and easy planning.',
      'restaurants',
      cityHref('udon-thani')
    ),
    featuredCity(
      'chiang-rai',
      'Best for compact dining',
      'Chiang Rai works well when the restaurant guide should stay focused on a smaller city core and a manageable shortlist.',
      'restaurants',
      cityHref('chiang-rai')
    ),
    featuredCity(
      'koh-samui',
      'Best for resort dining',
      'Koh Samui is the clearest island choice when hotel areas, beach dining, and the food plan all interact.',
      'restaurants',
      cityHref('koh-samui')
    )
  ],
  sections: [
    {
      title: 'Bangkok and the major dining capitals',
      description:
        'These hubs belong at the top when the food guide needs strong range, chef-led dining, and flexible neighborhood options.',
      citySlugs: ['bangkok', 'chiang-mai', 'phuket', 'pattaya'],
      inlineSources: [michelinSource, thaiSelectSource]
    },
    {
      title: 'Northern food cities',
      description:
        'Northern cities are best handled as compact, walkable food guides with clear local specialties and a strong place sense.',
      citySlugs: ['chiang-mai', 'chiang-rai', 'pai', 'mae-hong-son', 'lampang', 'chiang-khan'],
      inlineSources: [michelinSource, tourismAuthoritySource]
    },
    {
      title: 'Coastal seafood and island tables',
      description:
        'Coastal and island cities work best when the guide distinguishes seafood, resort dining, market meals, and beach-zone logistics.',
      citySlugs: [
        'phuket',
        'krabi',
        'koh-samui',
        'rayong',
        'trat',
        'chanthaburi',
        'surat-thani',
        'chumphon',
        'trang',
        'nakhon-si-thammarat'
      ],
      inlineSources: [tourismAuthoritySource, thaiSelectSource]
    },
    {
      title: 'Isaan and border-city dining',
      description:
        'Regional food stories are strongest when the guide routes readers into local kitchens, roadside spots, and border-city specialties.',
      citySlugs: ['khon-kaen', 'udon-thani', 'ubon-ratchathani', 'nong-khai', 'bueng-kan', 'nakhon-phanom', 'mukdahan'],
      inlineSources: [tourismAuthoritySource, michelinSource]
    },
    {
      title: 'Short-stay cities with reliable local meals',
      description:
        'These cities are useful when the dining guide should support a short stay, a transit stop, or a broader sightseeing trip.',
      citySlugs: ['pattaya', 'ayutthaya', 'kanchanaburi', 'lopburi', 'phitsanulok', 'hat-yai', 'nakhon-ratchasima', 'hua-hin'],
      inlineSources: [tourismAuthoritySource]
    }
  ],
  sourceLinks: [
    michelinSource,
    thaiSelectSource,
    tourismAuthoritySource
  ]
};

export const hotelsHubContent: HubPageContent = {
  title: 'Thailand Hotel Guides 2026 | Editorial Hub',
  description:
    'Editorial hub for Thailand hotel guides, with featured stay bases, strong internal linking, and visible source-backed references.',
  heroEyebrow: 'Editorial Hub',
  heroTitle: 'Thailand Hotel Guides',
  heroIntro:
    'Use this hub to find the right city hotel guide by stay shape: city base, beach resort, heritage stay, or practical short stop.',
  whyThisPageTitle: 'How To Choose The Right Stay Base',
  whyThisPageBody:
    'The goal is to help users move into the right city-level hotel guide, rather than presenting a single nationwide best-hotels leaderboard.',
  featuredCities: [
    featuredCity(
      'bangkok',
      'Best for city-base planning',
      'Bangkok is the clearest first stop when the hotel choice needs transit access, district choice, and a broad range of stay styles.',
      'hotels',
      cityHref('bangkok')
    ),
    featuredCity(
      'phuket',
      'Best for resort logic',
      'Phuket is the most flexible beach base when the hotel guide needs to separate resort areas, town stays, and island access.',
      'hotels',
      cityHref('phuket')
    ),
    featuredCity(
      'koh-samui',
      'Best for island stays',
      'Koh Samui is the clearest island hotel hub when the stay itself defines the structure of the trip.',
      'hotels',
      cityHref('koh-samui')
    ),
    featuredCity(
      'chiang-mai',
      'Best for city comfort',
      'Chiang Mai is a strong hotel base when the trip needs a compact center, easy movement, and a slower city pace.',
      'hotels',
      cityHref('chiang-mai')
    ),
    featuredCity(
      'hua-hin',
      'Best for calm coastal stays',
      'Hua Hin is a useful answer when the hotel guide should favor a relaxed coastal break over dense urban intensity.',
      'hotels',
      cityHref('hua-hin')
    ),
    featuredCity(
      'krabi',
      'Best for beach access',
      'Krabi works well when the hotel decision depends on beaches, island access, and a clear coastal trip shape.',
      'hotels',
      cityHref('krabi')
    ),
    featuredCity(
      'pattaya',
      'Best for quick stayovers',
      'Pattaya is practical when the hotel guide should support a short leisure break or an easy Bangkok escape.',
      'hotels',
      cityHref('pattaya')
    ),
    featuredCity(
      'ayutthaya',
      'Best for heritage nights',
      'Ayutthaya makes sense when the stay is really about a slower historic-city visit and a close-in base.',
      'hotels',
      cityHref('ayutthaya')
    ),
    featuredCity(
      'kanchanaburi',
      'Best for river stays',
      'Kanchanaburi is a good fit when the hotel guide should support riverside scenery and an easy out-of-city rhythm.',
      'hotels',
      cityHref('kanchanaburi')
    )
  ],
  sections: [
    {
      title: 'Big-city and transit-friendly stays',
      description:
        'The biggest bases need hotel guidance that makes district choice and transport convenience obvious right away.',
      citySlugs: ['bangkok', 'pattaya', 'chiang-mai', 'khon-kaen', 'udon-thani', 'nakhon-ratchasima'],
      inlineSources: [tourismAuthoritySource, tcebSource]
    },
    {
      title: 'Beach and island resort bases',
      description:
        'Beach guides work best when the hotel shortlist is grouped by coast, island access, and trip pace instead of by generic status.',
      citySlugs: ['phuket', 'koh-samui', 'krabi', 'hua-hin', 'rayong', 'trat', 'surat-thani', 'chumphon', 'nakhon-si-thammarat'],
      inlineSources: [tourismAuthoritySource, hotelsAssociationSource]
    },
    {
      title: 'Heritage and slower city stays',
      description:
        'Historic cities should get hotel guidance that favors walkability, atmosphere, and a clear relationship to the old-town core.',
      citySlugs: ['ayutthaya', 'sukhothai', 'lopburi', 'phitsanulok', 'kanchanaburi'],
      inlineSources: [unescoSource, fineArtsSource]
    },
    {
      title: 'Northern retreat and mountain stays',
      description:
        'Northern hotel choices work best when the guide distinguishes city-center convenience from slower retreat-oriented stays.',
      citySlugs: ['chiang-mai', 'chiang-rai', 'pai', 'mae-hong-son', 'lampang', 'chiang-khan'],
      inlineSources: [tourismAuthoritySource]
    },
    {
      title: 'Regional gateway and stopover hotels',
      description:
        'Gateway cities need a hotel guide that helps the reader choose an efficient base for onward travel or a short regional stop.',
      citySlugs: ['hat-yai', 'nong-khai', 'bueng-kan', 'nakhon-phanom', 'mukdahan', 'ubon-ratchathani', 'chanthaburi'],
      inlineSources: [tourismAuthoritySource, tcebSource]
    }
  ],
  sourceLinks: [
    tourismAuthoritySource,
    hotelsAssociationSource,
    tcebSource,
    unescoSource,
    fineArtsSource
  ]
};

export const top10HubContentBySlug: Record<Top10HubSlug, HubPageContent> = {
  root: rootHubContent,
  attractions: attractionsHubContent,
  restaurants: restaurantsHubContent,
  hotels: hotelsHubContent
};
