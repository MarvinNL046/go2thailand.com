import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EmailCapture from '../components/EmailCapture';

interface City {
  slug: string;
  name: string;
  nameNl: string;
  region: string;
  description: string;
  descriptionNl: string;
}

interface PageProps {
  cities: City[];
}

// `getAllCities()` stores the canonical short region keys. Keep the display
// labels separate so the directory does not silently render an empty state
// when the data uses `Central` instead of `Central Thailand`.
const regionOrder = ['Central', 'Northern', 'Southern', 'Isaan', 'Eastern', 'Western', 'Other'];

const regionNl: Record<string, string> = {
  Central: 'Centraal Thailand',
  Northern: 'Noord-Thailand',
  Southern: 'Zuid-Thailand',
  Isaan: 'Isaan',
  Eastern: 'Oost-Thailand',
  Western: 'West-Thailand',
  'Other': 'Overig',
};

const regionEn: Record<string, string> = {
  Central: 'Central Thailand',
  Northern: 'Northern Thailand',
  Southern: 'Southern Thailand',
  Isaan: 'Isaan',
  Eastern: 'Eastern Thailand',
  Western: 'Western Thailand',
  Other: 'Other',
};

const regionIntro: Record<string, { en: string; nl: string }> = {
  Central: { en: 'Big-city energy, royal history and easy first stops from Bangkok.', nl: 'Grote stadsenergie, koninklijke geschiedenis en makkelijk te combineren vanuit Bangkok.' },
  Northern: { en: 'Mountain air, temple towns and a slower rhythm in the north.', nl: 'Berglucht, tempelsteden en een rustiger reisritme in het noorden.' },
  Southern: { en: 'Limestone coastlines, tropical islands and unforgettable water days.', nl: 'Kalkstenen kusten, tropische eilanden en dagen op of aan het water.' },
  Isaan: { en: 'Local food, wide-open landscapes and Thailand beyond the usual route.', nl: 'Lokale smaken, weidse landschappen en Thailand buiten de bekende route.' },
  Eastern: { en: 'Fruit orchards, beaches and characterful coastal towns near the capital.', nl: 'Fruitboomgaarden, stranden en karaktervolle kustplaatsen dicht bij Bangkok.' },
  Western: { en: 'Rivers, national parks and memorable escapes west of Bangkok.', nl: 'Rivieren, nationale parken en bijzondere uitstapjes ten westen van Bangkok.' },
  Other: { en: 'Places that deserve a spot when you want to travel a little differently.', nl: 'Plekken voor wie Thailand eens net even anders wil beleven.' },
};

export default function BestPlacesPage({ cities }: PageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Beste Plekken om te Bezoeken in Thailand' : 'Best Places to Visit Thailand', href: '/best-places-to-visit-thailand/' },
  ];

  const byRegion: Record<string, City[]> = {};
  for (const city of cities) {
    const r = city.region || 'Other';
    if (!byRegion[r]) byRegion[r] = [];
    byRegion[r].push(city);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isNl ? 'Beste Plekken om te Bezoeken in Thailand' : 'Best Places to Visit in Thailand',
    numberOfItems: cities.length,
    itemListElement: cities.slice(0, 10).map((city, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: city.name,
      url: `https://go2-thailand.com/city/${city.slug}/`,
    })),
  };

  return (
    <>
      <SEOHead
        title={isNl
          ? `Beste Plekken om te Bezoeken in Thailand 2026 | Go2 Thailand`
          : `Best Places to Visit in Thailand | Go2Thailand`}
        description={isNl
          ? `Ontdek de ${cities.length} beste plekken om te bezoeken in Thailand in 2026. Van Bangkok en Chiang Mai tot Phuket, Krabi en verborgen parels — vind jouw perfecte Thaise bestemming.`
          : `Compare ${cities.length} places to visit in Thailand by region and travel style, from Bangkok and Chiang Mai to Phuket, Krabi and quieter alternatives.`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen" data-premium-template="best-places-thailand-directory">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mx-auto max-w-4xl py-8 text-center lg:py-12">
              <p className="eyebrow mb-4">{isNl ? 'Vind jouw plek' : 'Find your place'}</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Beste Plekken om te Bezoeken in Thailand' : 'Best Places to Visit in Thailand'}
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600 lg:text-xl">
                {isNl
                  ? `${cities.length} bestemmingen — van iconische steden tot verborgen parels, gesorteerd per regio.`
                  : `${cities.length} destinations covered — from iconic cities to hidden gems, sorted by region.`}
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-jade/10 bg-tonal py-8">
            <div className="container-custom grid gap-4 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
              <p className="eyebrow">{isNl ? 'Zo gebruik je deze gids' : 'How to use this guide'}</p>
              <p className="text-sm font-medium leading-7 text-charcoal/70">
                {isNl
                  ? 'Niet elke bestemming past bij elke reiziger. Open een stads- of eilandgids om sfeer, reistijd, beste reistijd en praktische keuzes te vergelijken voordat je jouw route vastlegt.'
                  : 'Not every destination suits every traveller. Open a city or island guide to compare atmosphere, travel time, seasons and practical trade-offs before you set your route.'}
              </p>
            </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {regionOrder.filter(r => byRegion[r]).map(region => (
              <div key={region} className="mb-12">
                <div className="mb-6 max-w-2xl">
                  <h2 className="text-2xl font-bold font-heading text-gray-900">{isNl ? regionNl[region] || region : regionEn[region] || region}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{regionIntro[region]?.[isNl ? 'nl' : 'en']}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {byRegion[region].map(city => (
                    <Link
                      key={city.slug}
                      href={`/city/${city.slug}/`}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">{isNl ? regionNl[region] || region : regionEn[region] || region}</p>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{isNl ? city.nameNl : city.name}</h3>
                      <p className="text-gray-600 text-sm leading-6">{isNl ? city.descriptionNl : city.description}</p>
                      <span className="text-thailand-blue text-sm font-semibold mt-3 inline-block">
                        {isNl ? `Bekijk ${city.nameNl} →` : `Explore ${city.name} →`}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Email Capture */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <EmailCapture
            heading={isNl ? 'Meer bestemmingstips?' : 'Want more destination tips?'}
            subtext={isNl
              ? 'Ontvang onze wekelijkse nieuwsbrief met verborgen parels, budget hacks en insider gidsen voor Thailand.'
              : 'Get our weekly newsletter with hidden gems, budget hacks, and insider guides for Thailand.'}
          />
        </div>
        {/* Explore More */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">
              {isNl ? 'Plan Je Thailand Reis' : 'Plan Your Thailand Trip'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/thailand-travel-guide/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Reisgids' : 'Travel Guide'}</div>
                <div className="text-xs text-gray-600">{isNl ? 'Alles wat je nodig hebt' : 'Everything you need'}</div>
              </Link>
              <Link href={isNl ? '/itineraries/' : '/thailand-itinerary/'} className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Routes' : 'Itineraries'}</div>
                <div className="text-xs text-gray-600">{isNl ? 'Kant-en-klare routes' : 'Ready-made routes'}</div>
              </Link>
              <Link href="/islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Thaise Eilanden' : 'Thai Islands'}</div>
                <div className="text-xs text-gray-600">{isNl ? 'Strandparadijs' : 'Beach paradise'}</div>
              </Link>
              <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Thais Eten' : 'Thai Food'}</div>
                <div className="text-xs text-gray-600">{isNl ? 'Keuken gids' : 'Cuisine guide'}</div>
              </Link>
              <Link href="/region/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Regio\'s' : 'Regions'}</div>
                <div className="text-xs text-gray-600">{isNl ? 'Noord, Zuid, Centraal' : 'North, South, Central'}</div>
              </Link>
              <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Vervoer' : 'Transport'}</div>
                <div className="text-xs text-gray-600">{isNl ? 'Bussen, treinen, vluchten' : 'Buses, trains, flights'}</div>
              </Link>
              <Link href="/best-cooking-classes-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Kooklessen' : 'Cooking Classes'}</div>
                <div className="text-xs text-gray-600">{isNl ? 'Leer Thais koken' : 'Learn Thai cooking'}</div>
              </Link>
              <Link href="/is-thailand-safe/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Veiligheidsgids' : 'Safety Guide'}</div>
                <div className="text-xs text-gray-600">{isNl ? 'Veilig reizen in Thailand' : 'Stay safe in Thailand'}</div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { getAllCities } = require('../lib/cities');
  const allCities = getAllCities();
  const cities: City[] = allCities.map((c: any) => {
    // The compact index intentionally contains only routing fields. Read the
    // canonical city record here so every directory card has useful copy.
    let source: any = {};
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      source = require(`../data/cities/${c.slug}.json`);
    } catch (_) {
      source = c;
    }
    const name = source.name || c.name || {};
    const description = source.description || source.categories?.overview || {};
    return {
      slug: c.slug,
      name: name.en || c.slug,
      nameNl: name.nl || name.en || c.slug,
      region: c.region || source.region || 'Other',
      description: description.en || `Plan your ${name.en || c.slug} trip with practical ideas, highlights and local tips.`,
      descriptionNl: description.nl || `Plan je reis naar ${name.nl || name.en || c.slug} met praktische tips, highlights en inspiratie.`,
    };
  });

  return {
    props: { cities },
    revalidate: 604800,
  };
};
