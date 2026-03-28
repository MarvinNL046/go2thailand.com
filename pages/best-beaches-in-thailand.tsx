import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';

interface BeachData {
  rank: number;
  name: string;
  island_slug: string;
  island_name: { en: string; nl: string };
  region: string;
  province: string;
  description: { en: string; nl: string };
  best_for: string[];
  vibe: string;
  crowd_level: string;
  best_months: string;
  budget_level: string;
  highlights: { en: string[]; nl: string[] };
  tip: { en: string; nl: string };
}

interface FaqItem {
  question: { en: string; nl: string };
  answer: { en: string; nl: string };
}

interface PageData {
  title: { en: string; nl: string };
  intro: { en: string; nl: string };
  last_updated: string;
  beaches: BeachData[];
  faq: FaqItem[];
}

interface BestBeachesProps {
  data: PageData;
}

type Lang = 'en' | 'nl';
type FilterCategory = 'all' | 'families' | 'snorkeling' | 'party' | 'relaxation' | 'budget';

const SOURCE_LINKS = [
  {
    label: 'Tourism Authority of Thailand: Krabi province (Railay Beach, Ao Nang)',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Krabi/344'
  },
  {
    label: 'Tourism Authority of Thailand: Railay Beach attraction page',
    href: 'https://www.tourismthailand.org/Attraction/railay-beach'
  },
  {
    label: 'Tourism Authority of Thailand: Ao Nang attraction page',
    href: 'https://www.tourismthailand.org/Attraction/ao-nang'
  },
  {
    label: 'Tourism Authority of Thailand: Phuket province',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Samui (Lamai Beach)',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Samui/360'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Phi Phi (Maya Bay)',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Phi-Phi/359'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Chang (White Sand Beach)',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko%20Chang/467'
  },
  {
    label: 'Tourism Authority of Thailand: Tarutao National Park (Koh Lipe, Sunrise Beach)',
    href: 'https://www.tourismthailand.org/Attraction/tarutao-national-park'
  },
  {
    label: 'Thailand Department of National Parks: Maya Bay closure and reopening',
    href: 'https://thailand.prd.go.th/en/content/category/detail/id/2078/iid/220232'
  }
];

const PLANNING_NOTES: Record<Lang, Array<{ title: string; body: string }>> = {
  en: [
    {
      title: 'Start with the right coast',
      body: 'The Andaman side is the classic choice for limestone scenery, famous bays, and easy beach-hopping from Phuket or Krabi. The Gulf side works better when you want calmer water, diving-focused trips, or a shoulder-season backup while the west coast is rougher.'
    },
    {
      title: 'Treat this as a shortlist, not a claim to every beach in Thailand',
      body: 'We kept the list limited to beaches that are defensible for first-trip planning: places with a clear identity, repeat-value, and enough practical context to help you choose between them.'
    },
    {
      title: 'Choose the island before you choose the sand',
      body: 'A beach can look perfect in photos but still be the wrong base if boat access, crowd levels, or island size do not match your trip. Use the island links below before you lock in an itinerary.'
    }
  ],
  nl: [
    {
      title: 'Begin met de juiste kust',
      body: 'De Andamankust is de klassieke keuze voor kalkstenen kliffen, iconische baaien en makkelijk beach-hoppen vanaf Phuket of Krabi. De Golfkant werkt beter voor rustiger water, duikreizen of een alternatief in het schouderseizoen wanneer de westkust ruwer is.'
    },
    {
      title: 'Zie dit als een shortlist, niet als een claim op elk strand in Thailand',
      body: 'We houden de lijst bewust beperkt tot stranden die verdedigbaar zijn voor echte reisplanning: plekken met een duidelijk karakter, herhaalwaarde en genoeg context om er een keuze op te baseren.'
    },
    {
      title: 'Kies eerst het eiland, daarna het strand',
      body: 'Een strand kan er perfect uitzien op foto\'s maar alsnog de verkeerde uitvalsbasis zijn als boottoegang, drukte of eilandgrootte niet bij je reis passen. Gebruik daarom eerst de eilandlinks hieronder.'
    }
  ]
};

const COAST_GUIDE: Record<Lang, Array<{ coast: string; body: string; routes: Array<{ href: string; label: string }> }>> = {
  en: [
    {
      coast: 'Andaman Sea',
      body: 'Best for iconic scenery, headline beaches, and multi-stop island trips. TAT\'s Phuket and Phi Phi pages support the basic pattern here: headline beaches are easier to reach, but crowd pressure is highest on the best-known stretches.',
      routes: [
        { href: '/islands/phuket/', label: 'Phuket guide' },
        { href: '/islands/koh-phi-phi/', label: 'Koh Phi Phi guide' },
        { href: '/islands/koh-lanta/', label: 'Koh Lanta guide' }
      ]
    },
    {
      coast: 'Gulf of Thailand',
      body: 'Better for travelers choosing between Samui comfort, Phangan variety, Tao diving, or the quieter Trat islands. The Gulf is often the more practical answer when you want one island base instead of a fast-moving hop.',
      routes: [
        { href: '/islands/koh-samui/', label: 'Koh Samui guide' },
        { href: '/islands/koh-tao/', label: 'Koh Tao guide' },
        { href: '/islands/koh-chang/', label: 'Koh Chang guide' }
      ]
    }
  ],
  nl: [
    {
      coast: 'Andamanzee',
      body: 'Het sterkst voor iconische landschappen, bekende stranden en eilandroutes met meerdere stops. De officiële TAT-pagina\'s voor Phuket en Phi Phi ondersteunen hetzelfde patroon: de bekendste stranden zijn het makkelijkst bereikbaar, maar ook het drukst.',
      routes: [
        { href: '/islands/phuket/', label: 'Phuket-gids' },
        { href: '/islands/koh-phi-phi/', label: 'Koh Phi Phi-gids' },
        { href: '/islands/koh-lanta/', label: 'Koh Lanta-gids' }
      ]
    },
    {
      coast: 'Golf van Thailand',
      body: 'Sterker voor reizigers die kiezen tussen het comfort van Samui, de variatie van Phangan, het duiken van Tao of de rustigere eilanden bij Trat. De Golf is vaak de praktischere keuze als je een vaste uitvalsbasis wilt in plaats van snel doorhoppen.',
      routes: [
        { href: '/islands/koh-samui/', label: 'Koh Samui-gids' },
        { href: '/islands/koh-tao/', label: 'Koh Tao-gids' },
        { href: '/islands/koh-chang/', label: 'Koh Chang-gids' }
      ]
    }
  ]
};

const NEXT_STEPS: Record<Lang, Array<{ href: string; title: string; body: string }>> = {
  en: [
    {
      href: '/thailand-islands/',
      title: 'Use the island pillar next',
      body: 'Move from beach dreaming to island selection, with notes on who each island suits and how to narrow the shortlist.'
    },
    {
      href: '/islands/',
      title: 'Browse every island guide',
      body: 'Use the discovery hub if you already know you need a deeper island-by-island read before choosing beaches.'
    },
    {
      href: '/compare/',
      title: 'Compare likely contenders',
      body: 'Useful when your shortlist is down to two islands and the real question is pace, logistics, and beach style.'
    }
  ],
  nl: [
    {
      href: '/thailand-islands/',
      title: 'Ga daarna naar de eilandengids',
      body: 'Van strandinspiratie naar eilandkeuze, met uitleg voor welk type reiziger elk eiland het beste werkt.'
    },
    {
      href: '/islands/',
      title: 'Bekijk alle eilandengidsen',
      body: 'Gebruik de hub als je eerst per eiland dieper wilt lezen voordat je stranden kiest.'
    },
    {
      href: '/compare/',
      title: 'Vergelijk je laatste kanshebbers',
      body: 'Handig wanneer je shortlist nog uit twee eilanden bestaat en het draait om tempo, logistiek en strandtype.'
    }
  ]
};

function getSelectionReason(beach: BeachData, lang: Lang): string {
  const tags = beach.best_for.map(item => item.toLowerCase());

  if (tags.some(tag => ['snorkeling', 'diving'].includes(tag))) {
    return lang === 'nl'
      ? 'Sterke keuze als je strandtijd wilt combineren met snorkelen of duiken.'
      : 'Strong pick if you want beach time to overlap with snorkeling or diving access.';
  }

  if (tags.some(tag => ['families', 'swimming'].includes(tag)) || beach.crowd_level === 'low') {
    return lang === 'nl'
      ? 'Verdedigbaar voor rustigere stranddagen of reizen met kinderen.'
      : 'Defensible for calmer beach days or trips with children.';
  }

  if (tags.some(tag => ['nightlife', 'party', 'fire shows', 'full moon party'].includes(tag))) {
    return lang === 'nl'
      ? 'Meer geschikt als je sfeer en avondleven belangrijker vindt dan stilte.'
      : 'Better suited when atmosphere and evening energy matter more than isolation.';
  }

  return lang === 'nl'
    ? 'Een allround keuze met een duidelijk eigen karakter binnen deze shortlist.'
    : 'An all-rounder with a clear identity inside this shortlist.';
}

export default function BestBeachesInThailand({ data }: BestBeachesProps) {
  const { locale } = useRouter();
  const lang: Lang = locale === 'nl' ? 'nl' : 'en';
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    {
      name: lang === 'nl' ? 'Beste Stranden in Thailand' : 'Best Beaches in Thailand',
      href: '/best-beaches-in-thailand/'
    }
  ];

  const filterLabels: Record<FilterCategory, { en: string; nl: string }> = {
    all: { en: 'All Beaches', nl: 'Alle stranden' },
    families: { en: 'Families', nl: 'Gezinnen' },
    snorkeling: { en: 'Snorkeling & Diving', nl: 'Snorkelen & duiken' },
    party: { en: 'Party & Nightlife', nl: 'Party & nachtleven' },
    relaxation: { en: 'Relaxation', nl: 'Rust' },
    budget: { en: 'Budget', nl: 'Budget' }
  };

  const filteredBeaches = data.beaches.filter(beach => {
    switch (activeFilter) {
      case 'families':
        return beach.best_for.some(item => ['families', 'swimming'].includes(item.toLowerCase())) || beach.crowd_level === 'low';
      case 'snorkeling':
        return beach.best_for.some(item => ['snorkeling', 'diving'].includes(item.toLowerCase()));
      case 'party':
        return beach.best_for.some(item => ['nightlife', 'party', 'fire shows', 'full moon party'].includes(item.toLowerCase()));
      case 'relaxation':
        return beach.best_for.some(item => ['relaxation', 'seclusion', 'romance'].includes(item.toLowerCase()));
      case 'budget':
        return beach.budget_level === 'budget';
      default:
        return true;
    }
  });

  const gulfBeaches = data.beaches.filter(beach => beach.region === 'Gulf of Thailand').slice(0, 5);
  const andamanBeaches = data.beaches.filter(beach => beach.region === 'Andaman Sea').slice(0, 5);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title[lang],
    author: { '@type': 'Organization', name: 'Go2Thailand' },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      logo: {
        '@type': 'ImageObject',
        url: 'https://go2-thailand.com/logo.png'
      }
    },
    dateModified: data.last_updated,
    url: 'https://go2-thailand.com/best-beaches-in-thailand/'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://go2-thailand.com${item.href}`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map(item => ({
      '@type': 'Question',
      name: item.question[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang]
      }
    }))
  };

  const combinedSchema = [articleSchema, breadcrumbSchema, faqSchema];

  const pageTitle =
    lang === 'nl'
      ? 'Beste Stranden in Thailand | Redactionele gids voor strandkeuze'
      : 'Best Beaches in Thailand | Editorial guide to choosing the right coast';

  const pageDescription =
    lang === 'nl'
      ? 'Gebruik deze redactionele gids om tussen Thailandse stranden en eilanden te kiezen, met duidelijke kustlogica, shortlist-keuzes en zichtbare bronnen.'
      : 'Use this editorial guide to choose between Thailand beaches and islands, with clear coast logic, shortlist framing, and visible source signals.';

  return (
    <>
      <SEOHead title={pageTitle} description={pageDescription}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="bg-surface-dark text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl">
              <p className="font-script text-thailand-gold text-lg mb-3">
                {lang === 'nl' ? 'Redactionele strandgids' : 'Editorial beach planning guide'}
              </p>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
                {lang === 'nl' ? 'De stranden die echt helpen bij je keuze' : 'The beaches that actually help you choose'}
              </h1>
              <p className="text-lg lg:text-2xl opacity-90 max-w-3xl">
                {lang === 'nl'
                  ? 'Niet elk mooi strand is de juiste uitvalsbasis. Deze gids helpt je kiezen tussen Thailand\'s bekendste strandgebieden door kust, eilandtype, drukte en gebruikswaarde naast elkaar te zetten.'
                  : 'Not every beautiful beach makes sense as a trip base. This guide helps you choose between Thailand\'s headline beach zones by putting coast, island style, crowd pressure, and planning value side by side.'}
              </p>
              <div className="flex flex-wrap gap-3 mt-8 text-sm">
                <span className="bg-white/15 rounded-full px-4 py-2">25 beaches</span>
                <span className="bg-white/15 rounded-full px-4 py-2">2 coastlines</span>
                <span className="bg-white/15 rounded-full px-4 py-2">Sources: TAT, Thailand DNP</span>
                <span className="bg-white/15 rounded-full px-4 py-2">Updated March 28, 2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-5">
            <p className="text-lg text-gray-700 leading-relaxed">{data.intro[lang]}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {PLANNING_NOTES[lang].map(note => (
                <div key={note.title} className="rounded-2xl bg-surface-cream p-5">
                  <h2 className="text-lg font-heading font-bold text-gray-900 mb-2">{note.title}</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-b sticky top-0 z-30 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {(Object.keys(filterLabels) as FilterCategory[]).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterLabels[category][lang]}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="section-label text-thailand-gold">
                  {lang === 'nl' ? 'Shortlist' : 'Shortlist'}
                </p>
                <h2 className="text-3xl font-heading font-bold text-gray-900">
                  {lang === 'nl'
                    ? 'Welke stranden horen op je eerste shortlist?'
                    : 'Which beaches deserve a first-pass shortlist?'}
                </h2>
              </div>
              <Link href="/thailand-islands/" className="text-sm font-semibold text-thailand-blue hover:underline">
                {lang === 'nl' ? 'Ga door naar de eilandengids' : 'Continue to the island pillar'}
              </Link>
            </div>

            <div className="space-y-6">
              {filteredBeaches.map(beach => (
                <article key={beach.rank} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-thailand-blue text-white font-bold">
                          {beach.rank}
                        </span>
                        <div>
                          <h3 className="text-2xl font-heading font-bold text-gray-900">{beach.name}</h3>
                          <p className="text-sm text-gray-500">
                            {beach.island_name[lang]} · {beach.region} · {beach.province}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{beach.description[lang]}</p>
                      <p className="text-sm font-medium text-thailand-blue mb-4">{getSelectionReason(beach, lang)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:w-64 text-sm">
                      <div className="rounded-2xl bg-surface-cream p-3">
                        <div className="text-gray-500 mb-1">{lang === 'nl' ? 'Beste maanden' : 'Best months'}</div>
                        <div className="font-semibold text-gray-900">{beach.best_months}</div>
                      </div>
                      <div className="rounded-2xl bg-surface-cream p-3">
                        <div className="text-gray-500 mb-1">{lang === 'nl' ? 'Drukte' : 'Crowd level'}</div>
                        <div className="font-semibold text-gray-900 capitalize">{beach.crowd_level}</div>
                      </div>
                      <div className="rounded-2xl bg-surface-cream p-3 col-span-2">
                        <div className="text-gray-500 mb-1">{lang === 'nl' ? 'Strand werkt goed voor' : 'Works best for'}</div>
                        <div className="font-semibold text-gray-900">{beach.best_for.slice(0, 3).join(', ')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {beach.highlights[lang].slice(0, 4).map(highlight => (
                      <span key={highlight} className="rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-medium text-thailand-blue">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-amber-50 p-4 border border-amber-100">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">{lang === 'nl' ? 'Planningstip:' : 'Planning note:'}</span> {beach.tip[lang]}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/islands/${beach.island_slug}/`}
                      className="inline-flex items-center rounded-full bg-thailand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-thailand-red transition-colors"
                    >
                      {lang === 'nl' ? `Lees over ${beach.island_name[lang]}` : `Read the ${beach.island_name[lang]} guide`}
                    </Link>
                    <Link
                      href="/islands/"
                      className="inline-flex items-center rounded-full bg-surface-cream px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      {lang === 'nl' ? 'Bekijk alle eilanden' : 'Browse all island guides'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">
              {lang === 'nl' ? 'Kustlogica' : 'Coast logic'}
            </p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
              {lang === 'nl' ? 'Kies eerst de kust, daarna het strand' : 'Pick the coast first, then the beach'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {COAST_GUIDE[lang].map(item => (
                <div key={item.coast} className="rounded-3xl bg-surface-cream p-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{item.coast}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{item.body}</p>
                  <ul className="space-y-2 text-sm">
                    {(item.coast.includes('Andaman') ? andamanBeaches : gulfBeaches).map(beach => (
                      <li key={beach.name} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                        <span className="font-medium text-gray-900">{beach.name}</span>
                        <span className="text-gray-500">{beach.island_name[lang]}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.routes.map(route => (
                      <Link key={route.href} href={route.href} className="text-sm font-semibold text-thailand-blue hover:underline">
                        {route.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-surface-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">
              {lang === 'nl' ? 'Bronnen en review' : 'Sources and review'}
            </p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-6">
              {lang === 'nl' ? 'Waarom je deze shortlist kunt vertrouwen' : 'Why this shortlist is defensible'}
            </h2>
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-5">
                {lang === 'nl'
                  ? 'Deze pagina is op 28 maart 2026 handmatig gecontroleerd en herschreven aan de hand van officiële TAT-bestemmingspagina\'s (Krabi, Phuket, Ko Samui, Ko Phi Phi, Ko Chang), de officiële TAT-attractiepagina\'s voor Railay Beach en Ao Nang, de TAT Tarutao National Park-pagina en de aankondiging van Thailand\'s Department of National Parks over de heropening van Maya Bay. Maya Bay-bezoekersslimieten en tarieven zijn bevestigd via de aankondiging van het Thaise Government Public Relations Department (1 oktober 2022 heropening). Seizoensgebonden en transportdetails zijn bewust duurzaam gehouden voor claims die snel veranderen.'
                  : 'This page was manually reviewed and rewritten on March 28, 2026 against official TAT destination pages for Krabi, Phuket, Ko Samui, Ko Phi Phi, and Ko Chang; TAT attraction pages for Railay Beach and Ao Nang; the TAT Tarutao National Park page; and Thailand\'s Department of National Parks announcement on Maya Bay\'s reopening. Maya Bay visitor management rules and fees are confirmed via the Thailand Government Public Relations Department announcement (1 October 2022 reopening). Seasonality and transport notes are intentionally stable where operational details change quickly.'}
              </p>
              <ul className="space-y-3">
                {SOURCE_LINKS.map(source => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">
              {lang === 'nl' ? 'Volgende stap' : 'Next step'}
            </p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
              {lang === 'nl' ? 'Gebruik de sterkere interne routes' : 'Use the stronger internal routes'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {NEXT_STEPS[lang].map(item => (
                <Link key={item.href} href={item.href} className="rounded-3xl bg-surface-cream p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">FAQ</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
              {lang === 'nl' ? 'Veelgestelde vragen' : 'Frequently asked questions'}
            </h2>
            <div className="space-y-4">
              {data.faq.map((item, index) => (
                <details key={index} className="rounded-2xl bg-surface-cream p-5">
                  <summary className="cursor-pointer list-none font-semibold text-gray-900">
                    {item.question[lang]}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{item.answer[lang]}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const fs = require('fs');
  const path = require('path');
  const lang = locale || 'en';
  const localePath = path.join(process.cwd(), 'data', 'beaches', `best-beaches.${lang}.json`);
  const defaultPath = path.join(process.cwd(), 'data', 'beaches', 'best-beaches.json');
  const dataPath = lang !== 'en' && fs.existsSync(localePath) ? localePath : defaultPath;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  return {
    props: { data },
    revalidate: 86400
  };
};
