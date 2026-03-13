import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClusterNav from '../../components/ClusterNav';
import AffiliateBox from '../../components/AffiliateBox';
import { getHotelsPage, getClusterCities, ClusterHotel, type HotelsPage } from '../../lib/clusters';
import { getAffiliates, CityAffiliates } from '../../lib/affiliates';

interface Props {
  data: HotelsPage;
  affiliates: CityAffiliates | null;
}

const categoryConfig = {
  budget: {
    label: 'Budget Hotels',
    accent: 'text-green-700',
    badgeBg: 'bg-green-100 text-green-700',
    borderTop: 'border-t-4 border-green-500',
    heading: 'green-700',
  },
  'mid-range': {
    label: 'Mid-Range Hotels',
    accent: 'text-blue-700',
    badgeBg: 'bg-blue-100 text-blue-700',
    borderTop: 'border-t-4 border-blue-500',
    heading: 'blue-700',
  },
  luxury: {
    label: 'Luxury Hotels',
    accent: 'text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-700',
    borderTop: 'border-t-4 border-amber-500',
    heading: 'amber-700',
  },
};

const categoryOrder: Array<'budget' | 'mid-range' | 'luxury'> = ['budget', 'mid-range', 'luxury'];

function HotelCard({ hotel }: { hotel: ClusterHotel }) {
  const conf = categoryConfig[hotel.category];
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${conf.borderTop}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-bold text-gray-900 text-lg leading-tight">{hotel.name}</h3>
        <span className={`shrink-0 text-sm font-semibold px-3 py-1 rounded-full ${conf.badgeBg}`}>
          {hotel.priceRange}
        </span>
      </div>
      <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-3">
        {hotel.area}
      </span>
      <p className="text-gray-600 text-sm leading-relaxed">{hotel.description}</p>
      {hotel.highlights && hotel.highlights.length > 0 && (
        <ul className="mt-3 space-y-1">
          {hotel.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-600">
              <span className={`${conf.accent} font-bold shrink-0`}>✓</span>
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function BestHotelsPage({ data, affiliates }: Props) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Hotels', href: '/best/' },
    { name: `Hotels in ${data.cityName}`, href: `/best/hotels-${data.citySlug}/` },
  ];

  const grouped = categoryOrder.reduce<Record<string, ClusterHotel[]>>((acc, cat) => {
    acc[cat] = data.hotels.filter(h => h.category === cat);
    return acc;
  }, {} as Record<string, ClusterHotel[]>);

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              Best Hotels in {data.cityName} (2026)
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">{data.intro}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hotels" />

          {/* Hotel categories */}
          {categoryOrder.map(cat => {
            const hotels = grouped[cat];
            if (!hotels || hotels.length === 0) return null;
            const conf = categoryConfig[cat];

            return (
              <section key={cat} className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${conf.accent}`}>
                  {conf.label} in {data.cityName}
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {hotels.map((hotel, i) => (
                    <HotelCard key={i} hotel={hotel} />
                  ))}
                </div>
                {affiliates && (
                  <div className="mt-6">
                    <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="hotels" />
                  </div>
                )}
              </section>
            );
          })}

          {/* Booking Tips */}
          {data.bookingTips && data.bookingTips.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Tips for {data.cityName}</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <ul className="space-y-3">
                  {data.bookingTips.map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-thailand-gold font-bold shrink-0">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Cross-links */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">More {data.cityName} Hotel Guides</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href={`/guides/where-to-stay-${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">
                  Where to Stay in {data.cityName}
                </h3>
                <p className="text-sm text-gray-500">
                  Neighborhood guide — find the best area for your trip style.
                </p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">
                  Read guide →
                </span>
              </Link>
              <Link
                href={`/city/${data.citySlug}/top-10-hotels/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">
                  Top 10 Hotels in {data.cityName}
                </h3>
                <p className="text-sm text-gray-500">
                  Our curated top 10 list with ratings and reviews.
                </p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">
                  See top 10 →
                </span>
              </Link>
            </div>
          </section>

          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hotels" />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cities = getClusterCities();
  return {
    paths: cities.map(city => ({ params: { slug: `hotels-${city}` } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = (params?.slug as string).replace(/^hotels-/, '');
  const data = getHotelsPage(citySlug);
  if (!data) return { notFound: true };
  return {
    props: { data, affiliates: getAffiliates(citySlug) },
    revalidate: 86400,
  };
};
