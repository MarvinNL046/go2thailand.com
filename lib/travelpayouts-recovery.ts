export type RecoveryPageType =
  | 'blog'
  | 'visa'
  | 'transport'
  | 'home'
  | 'guide'
  | 'compare'
  | 'city'
  | 'practical'
  | 'itinerary';

export type RecoveryIntent =
  | 'hotels'
  | 'transport'
  | 'food'
  | 'visa'
  | 'beach'
  | 'default';

export type RecoveryButtonId =
  | 'trip_hotels'
  | 'booking_hotels'
  | 'klook_tours'
  | 'gyg_tours'
  | 'twelvego_transport'
  | 'nordvpn'
  | 'nordpass'
  | 'saily_esim';

export interface TravelpayoutsRecoveryContext {
  pageType: RecoveryPageType;
  slug?: string;
  category?: string;
  tags?: string[];
  citySlug?: string;
}

export interface LocalizedCopy {
  en: string;
  nl: string;
}

export interface TravelpayoutsRecoveryConfig {
  intent: RecoveryIntent;
  title: LocalizedCopy;
  description: LocalizedCopy;
  buttonIds: RecoveryButtonId[];
}

export function detectRecoveryIntent({
  pageType,
  slug = '',
  category = '',
  tags = [],
}: TravelpayoutsRecoveryContext): RecoveryIntent {
  if (pageType === 'transport') return 'transport';
  if (pageType === 'visa') return 'visa';
  if (pageType === 'home') return 'default';
  if (pageType === 'city') return 'hotels';
  if (pageType === 'compare') return 'default';
  if (pageType === 'practical') return 'default';
  if (pageType === 'itinerary') return 'default';

  const text = `${slug} ${category} ${tags.join(' ')}`.toLowerCase();

  if (/where-to-stay|hotel|neighborhood|accommodation|resort|hostel/.test(text)) return 'hotels';
  if (/to-[a-z]|transport|flight|train|airport|bus-|ferry/.test(text)) return 'transport';
  if (/visa|safe|insurance|digital-nomad|arrival-card|permit|tdac|expat/.test(text)) return 'visa';
  if (/beach|island|diving|snorkel|koh-|surf/.test(text)) return 'beach';
  if (/market|food|restaurant|cooking|tour|night-market|street-food|curry|dish/.test(text)) return 'food';

  return 'default';
}

export function getTravelpayoutsRecoveryConfig(
  context: TravelpayoutsRecoveryContext,
): TravelpayoutsRecoveryConfig {
  const intent = detectRecoveryIntent(context);

  if (context.pageType === 'home') {
    return {
      intent,
      title: {
        en: 'Book Thailand Essentials',
        nl: 'Boek Thailand Essentials',
      },
      description: {
        en: 'Quick exits for hotels, tours, transport, eSIM, and travel security.',
        nl: 'Snelle exits voor hotels, tours, transport, eSIM en reisveiligheid.',
      },
      buttonIds: ['trip_hotels', 'booking_hotels', 'klook_tours', 'twelvego_transport', 'nordvpn', 'saily_esim'],
    };
  }

  if (context.pageType === 'city') {
    return {
      intent,
      title: {
        en: 'Book Your Stay In This City',
        nl: 'Boek Je Verblijf In Deze Stad',
      },
      description: {
        en: 'Surface the fastest hotel, activities, and transport exits before readers scroll deep into the guide.',
        nl: 'Toon de snelste exits voor hotels, activiteiten en transport voordat lezers diep in de gids scrollen.',
      },
      buttonIds: ['trip_hotels', 'booking_hotels', 'klook_tours', 'twelvego_transport', 'saily_esim'],
    };
  }

  if (context.pageType === 'practical') {
    return {
      intent,
      title: {
        en: 'Book The Essentials Before You Go',
        nl: 'Boek De Essentials Voor Vertrek',
      },
      description: {
        en: 'Practical planning pages should still drive quick clicks into hotels, transport, eSIM, and travel security.',
        nl: 'Praktische pagina’s moeten nog steeds snelle clicks sturen naar hotels, transport, eSIM en reisveiligheid.',
      },
      buttonIds: ['trip_hotels', 'booking_hotels', 'twelvego_transport', 'saily_esim', 'nordvpn', 'nordpass'],
    };
  }

  if (context.pageType === 'compare') {
    return {
      intent,
      title: {
        en: 'Compare, Then Book',
        nl: 'Vergelijk, En Boek Daarna',
      },
      description: {
        en: 'Once readers choose a destination, give them a direct path to hotels, transport, and tours.',
        nl: 'Zodra lezers een bestemming kiezen, geef ze een directe route naar hotels, transport en tours.',
      },
      buttonIds: ['trip_hotels', 'booking_hotels', 'twelvego_transport', 'klook_tours', 'nordvpn'],
    };
  }

  if (context.pageType === 'itinerary') {
    return {
      intent,
      title: {
        en: 'Book This Route Step By Step',
        nl: 'Boek Deze Route Stap Voor Stap',
      },
      description: {
        en: 'Itinerary readers already have a route. Convert that planning intent into hotels, transport, tours, and connectivity.',
        nl: 'Reisroutelezers hebben hun route al. Zet die planning-intent om in hotels, transport, tours en connectiviteit.',
      },
      buttonIds: ['trip_hotels', 'booking_hotels', 'twelvego_transport', 'klook_tours', 'saily_esim', 'nordvpn'],
    };
  }

  if (context.pageType === 'guide') {
    return {
      intent,
      title: {
        en: 'Turn This Guide Into A Trip',
        nl: 'Maak Van Deze Gids Een Reis',
      },
      description: {
        en: 'Practical guides should still lead into hotels, tours, and connected travel tools.',
        nl: 'Praktische gidsen moeten nog steeds doorleiden naar hotels, tours en verbonden reishulpmiddelen.',
      },
      buttonIds: ['trip_hotels', 'booking_hotels', 'klook_tours', 'saily_esim', 'nordvpn'],
    };
  }

  if (context.pageType === 'visa') {
    return {
      intent,
      title: {
        en: 'Plan The Rest Of Your Trip',
        nl: 'Plan De Rest Van Je Reis',
      },
      description: {
        en: 'Visa sorted. Keep your hotels, transport, and online security in one place.',
        nl: 'Visum geregeld. Houd je hotels, transport en online veiligheid bij elkaar.',
      },
      buttonIds: ['trip_hotels', 'booking_hotels', 'twelvego_transport', 'nordvpn', 'nordpass', 'klook_tours'],
    };
  }

  if (context.pageType === 'transport') {
    return {
      intent,
      title: {
        en: 'Book Transport And Your Stay',
        nl: 'Boek Transport En Je Verblijf',
      },
      description: {
        en: 'Capture the route click, then line up hotels and activities at your destination.',
        nl: 'Pak de routeklik mee en regel daarna hotels en activiteiten op je bestemming.',
      },
      buttonIds: ['twelvego_transport', 'trip_hotels', 'booking_hotels', 'klook_tours'],
    };
  }

  switch (intent) {
    case 'visa':
      return {
        intent,
        title: {
          en: 'Travel Security And Planning',
          nl: 'Reisveiligheid En Planning',
        },
        description: {
          en: 'Protect your trip, then line up hotels and transport before you go.',
          nl: 'Bescherm je reis en regel daarna je hotels en transport voor vertrek.',
        },
        buttonIds: ['nordvpn', 'nordpass', 'trip_hotels', 'booking_hotels', 'twelvego_transport'],
      };
    case 'transport':
      return {
        intent,
        title: {
          en: 'Book The Route Now',
          nl: 'Boek Deze Route Nu',
        },
        description: {
          en: 'Start with transport, then compare hotels nearby for the arrival city.',
          nl: 'Begin met transport en vergelijk daarna hotels in de aankomststad.',
        },
        buttonIds: ['twelvego_transport', 'trip_hotels', 'booking_hotels', 'klook_tours'],
      };
    case 'food':
    case 'beach':
      return {
        intent,
        title: {
          en: 'Turn This Guide Into A Booking',
          nl: 'Maak Van Deze Gids Een Boeking',
        },
        description: {
          en: 'Keep tours first, then support them with hotels and onward transport.',
          nl: 'Zet tours voorop en ondersteun die daarna met hotels en vervolgtransport.',
        },
        buttonIds: ['klook_tours', 'gyg_tours', 'trip_hotels', 'booking_hotels', 'twelvego_transport'],
      };
    case 'hotels':
      return {
        intent,
        title: {
          en: 'Compare Hotel Booking Options',
          nl: 'Vergelijk Hotel Boekopties',
        },
        description: {
          en: 'Keep the hotel decision fast, then offer tours and transport as follow-on clicks.',
          nl: 'Houd de hotelkeuze snel en bied daarna tours en transport aan als vervolgklik.',
        },
        buttonIds: ['trip_hotels', 'booking_hotels', 'klook_tours', 'twelvego_transport', 'nordvpn'],
      };
    default:
      return {
        intent,
        title: {
          en: 'Book The Practical Next Step',
          nl: 'Boek De Praktische Volgende Stap',
        },
        description: {
          en: 'Give readers a fast path to hotels, tours, transport, and travel security.',
          nl: 'Geef lezers een snelle route naar hotels, tours, transport en reisveiligheid.',
        },
        buttonIds: ['trip_hotels', 'booking_hotels', 'klook_tours', 'twelvego_transport', 'nordvpn'],
      };
  }
}
