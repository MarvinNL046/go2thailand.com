import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EmailCapture from '../components/EmailCapture';

interface City {
  slug: string;
  name: string;
  region: string;
  description: string | null;
}

interface PageProps {
  cities: City[];
}

const regionOrder = ['Central Thailand', 'Northern Thailand', 'Southern Thailand', 'Eastern Thailand', 'Western Thailand', 'Other'];

const regionNl: Record<string, string> = {
  'Central Thailand': 'Centraal Thailand',
  'Northern Thailand': 'Noord-Thailand',
  'Southern Thailand': 'Zuid-Thailand',
  'Eastern Thailand': 'Oost-Thailand',
  'Western Thailand': 'West-Thailand',
  'Other': 'Overig',
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
          : `Best Places to Visit in Thailand 2026 | Go2 Thailand`}
        description={isNl
          ? `Ontdek de ${cities.length} beste plekken om te bezoeken in Thailand in 2026. Van Bangkok en Chiang Mai tot Phuket, Krabi en verborgen parels — vind jouw perfecte Thaise bestemming.`
          : `Discover the ${cities.length} best places to visit in Thailand in 2026. From Bangkok and Chiang Mai to Phuket, Krabi, and hidden gems — find your perfect Thai destination.`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Beste Plekken om te Bezoeken in Thailand' : 'Best Places to Visit in Thailand'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isNl
                  ? `${cities.length} bestemmingen — van iconische steden tot verborgen parels, gesorteerd per regio.`
                  : `${cities.length} destinations covered — from iconic cities to hidden gems, sorted by region.`}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {regionOrder.filter(r => byRegion[r]).map(region => (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{isNl ? regionNl[region] || region : region}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {byRegion[region].map(city => (
                    <Link
                      key={city.slug}
                      href={`/city/${city.slug}/`}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{city.name}</h3>
                      {city.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">{city.description}</p>
                      )}
                      <span className="text-thailand-blue text-sm font-semibold mt-3 inline-block">
                        {isNl ? `Ontdek ${city.name} →` : `Explore ${city.name} →`}
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
              <Link href="/thailand-itinerary/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
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
  const cities: City[] = allCities.map((c: any) => ({
    slug: c.slug,
    name: c.name?.en || c.name || c.slug,
    region: c.region || 'Other',
    description: c.categories?.overview?.en || c.description?.en || null,
  }));

  return {
    props: { cities },
    revalidate: 604800,
  };
};
