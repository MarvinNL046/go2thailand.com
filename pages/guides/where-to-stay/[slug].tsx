import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ClusterNav from '../../../components/ClusterNav';
import AffiliateBox from '../../../components/AffiliateBox';
import type { WhereToStayPage, ClusterNeighborhood } from '../../../lib/cluster-types';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';
import { normalizeWhereToStay } from '../../../lib/normalize-cluster';
// NOTE: clusters.ts imported dynamically in getStaticPaths/Props to avoid bundling 'fs' client-side

// --- Price level badge colors ---
const priceLevelColors: Record<string, string> = {
  budget: 'bg-green-100 text-green-800',
  'mid-range': 'bg-yellow-100 text-yellow-800',
  luxury: 'bg-purple-100 text-purple-800',
};

function getPriceLevelColor(priceLevel: string): string {
  const key = priceLevel.toLowerCase().replace(/\s+/g, '-');
  return priceLevelColors[key] ?? 'bg-gray-100 text-gray-700';
}

// --- Neighborhood Card ---
function NeighborhoodCard({ neighborhood }: { neighborhood: ClusterNeighborhood }) {
  const { locale } = useRouter();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <h3 className="text-xl font-bold text-gray-900">{neighborhood.name}</h3>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-thailand-blue/10 text-thailand-blue">
            {neighborhood.bestFor}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getPriceLevelColor(neighborhood.priceLevel)}`}>
            {neighborhood.priceLevel}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{neighborhood.description}</p>
      {neighborhood.highlights.length > 0 && (
        <ul className="space-y-1 mb-4">
          {neighborhood.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700">
              <span className="text-thailand-gold mt-0.5">•</span>
              {h}
            </li>
          ))}
        </ul>
      )}
      {neighborhood.recommendedHotels && neighborhood.recommendedHotels.length > 0 && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{locale === 'nl' ? 'Aanbevolen Hotels' : 'Recommended Hotels'}</p>
          <div className="flex flex-wrap gap-2">
            {neighborhood.recommendedHotels.map((hotel, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
                {hotel}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  data: WhereToStayPage;
  affiliates: CityAffiliates | null;
}

export default function WhereToStayPage({ data, affiliates }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Gidsen' : 'Guides', href: '/guides/' },
    { name: isNl ? `Waar Verblijven in ${data.cityName}` : `Where To Stay in ${data.cityName}`, href: `/guides/where-to-stay/${data.citySlug}/` },
  ];

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              {isNl ? `Waar Verblijven in ${data.cityName}: Beste Wijken & Hotels (2026)` : `Where To Stay in ${data.cityName}: Best Areas & Hotels (2026)`}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">{data.intro}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="where-to-stay" />

          {/* Neighborhood cards */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isNl ? `Beste Wijken om te Verblijven in ${data.cityName}` : `Best Neighborhoods to Stay in ${data.cityName}`}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.neighborhoods.map((neighborhood, i) => (
                <NeighborhoodCard key={i} neighborhood={neighborhood} />
              ))}
            </div>
          </section>

          {/* Affiliate box: hotels */}
          {affiliates && (
            <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="hotels" />
          )}

          {/* General tips */}
          {data.generalTips && data.generalTips.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isNl ? `Tips voor het Boeken van Hotels in ${data.cityName}` : `Tips for Booking Hotels in ${data.cityName}`}
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <ul className="space-y-3">
                  {data.generalTips.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="text-thailand-blue font-bold shrink-0">{i + 1}.</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Cross-links */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Meer Hotelbronnen' : 'More Hotel Resources'}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href={`/best-hotels/${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  {isNl ? `Beste Hotels in ${data.cityName}` : `Best Hotels in ${data.cityName}`}
                </h3>
                <p className="text-sm text-gray-500">{isNl ? 'Samengestelde selectie voor alle budgetten →' : 'Curated picks across all budgets →'}</p>
              </Link>
              <Link
                href={`/city/${data.citySlug}/top-10-hotels/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  Top 10 Hotels in {data.cityName}
                </h3>
                <p className="text-sm text-gray-500">{isNl ? 'Door de community gerangschikte favorieten →' : 'Community-ranked favourites →'}</p>
              </Link>
            </div>
          </section>

          {/* Explore More */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Ontdek Meer' : 'Explore More'}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/food/"
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  {isNl ? 'Thais Eten Gids' : 'Thai Food Guide'}
                </h3>
                <p className="text-sm text-gray-500">{isNl ? 'Ontdek de beste gerechten & waar te eten →' : 'Discover the best dishes & where to eat →'}</p>
              </Link>
              <Link
                href="/city/"
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  {isNl ? 'Stadsgidsen' : 'City Guides'}
                </h3>
                <p className="text-sm text-gray-500">{isNl ? 'Bekijk alle 33 Thailand bestemmingen →' : 'Browse all 33 Thailand destinations →'}</p>
              </Link>
              <Link
                href="/travel-insurance-thailand/"
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  {isNl ? 'Reisverzekering' : 'Travel Insurance'}
                </h3>
                <p className="text-sm text-gray-500">{isNl ? 'Blijf beschermd op je reis →' : 'Stay protected on your trip →'}</p>
              </Link>
              <Link
                href="/thailand-for-first-timers/"
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  {isNl ? 'Gids voor Beginners' : 'First Timer\'s Guide'}
                </h3>
                <p className="text-sm text-gray-500">{isNl ? 'Alles wat je moet weten voor je gaat →' : 'Everything you need before you go →'}</p>
              </Link>
            </div>
          </section>

          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="where-to-stay" />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getWhereToStay } = await import('../../../lib/clusters');
  const slug = params?.slug as string;
  const raw = getWhereToStay(slug);
  if (!raw) return { notFound: true };
  const data = normalizeWhereToStay(raw);
  return {
    props: { data, affiliates: getAffiliates(slug) },
    revalidate: 604800,
  };
};
