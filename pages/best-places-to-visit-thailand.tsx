import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';

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

export default function BestPlacesPage({ cities }: PageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Places to Visit Thailand', href: '/best-places-to-visit-thailand/' },
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
    name: 'Best Places to Visit in Thailand',
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
        title={`Best Places to Visit in Thailand 2026 | Go2 Thailand`}
        description={`Discover the ${cities.length} best places to visit in Thailand in 2026. From Bangkok and Chiang Mai to Phuket, Krabi, and hidden gems — find your perfect Thai destination.`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                Best Places to Visit in Thailand
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {cities.length} destinations covered — from iconic cities to hidden gems, sorted by region.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {regionOrder.filter(r => byRegion[r]).map(region => (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{region}</h2>
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
                        Explore {city.name} →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
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
    revalidate: 86400,
  };
};
