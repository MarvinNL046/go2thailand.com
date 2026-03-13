import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClusterNav from '../../components/ClusterNav';
import AffiliateBox from '../../components/AffiliateBox';
import {
  getWhereToStay,
  getTravelGuide,
  getClusterCities,
  WhereToStayPage,
  TravelGuidePage,
  ClusterNeighborhood,
} from '../../lib/clusters';
import { getAffiliates, CityAffiliates } from '../../lib/affiliates';

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
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Recommended Hotels</p>
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

// --- Where To Stay Section ---
function WhereToStaySection({
  data,
  affiliates,
}: {
  data: WhereToStayPage;
  affiliates: CityAffiliates | null;
}) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides/' },
    { name: `Where To Stay in ${data.cityName}`, href: `/guides/where-to-stay-${data.citySlug}/` },
  ];

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              Where To Stay in {data.cityName}: Best Areas &amp; Hotels (2026)
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">{data.intro}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="where-to-stay" />

          {/* Neighborhood cards */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Best Neighborhoods to Stay in {data.cityName}
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
          {data.generalTips.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tips for Booking Hotels in {data.cityName}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">More Hotel Resources</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href={`/best/hotels-${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  Best Hotels in {data.cityName}
                </h3>
                <p className="text-sm text-gray-500">Curated picks across all budgets →</p>
              </Link>
              <Link
                href={`/city/${data.citySlug}/top-10-hotels/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  Top 10 Hotels in {data.cityName}
                </h3>
                <p className="text-sm text-gray-500">Community-ranked favourites →</p>
              </Link>
            </div>
          </section>

          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="where-to-stay" />
        </div>
      </div>
    </>
  );
}

// --- Travel Guide Section ---
function TravelGuideSection({
  data,
  affiliates,
}: {
  data: TravelGuidePage;
  affiliates: CityAffiliates | null;
}) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides/' },
    { name: `${data.cityName} Travel Guide`, href: `/guides/${data.citySlug}-travel-guide/` },
  ];

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              {data.cityName} Travel Guide: Everything You Need to Know (2026)
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">{data.intro}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="travel-guide" />

          {/* Itinerary */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.itinerary.title}</h2>
            <p className="text-gray-500 mb-6 text-sm">Day-by-day plan for {data.cityName}</p>
            <div className="space-y-4">
              {data.itinerary.days.map((d) => (
                <div key={d.day} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-thailand-blue flex items-center justify-center text-white font-bold text-lg">
                    {d.day}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{d.title}</h3>
                    <ul className="space-y-1">
                      {d.activities.map((activity, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-thailand-gold mt-0.5">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Transport */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting to &amp; Around {data.cityName}</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">From Bangkok</h3>
                <p className="text-gray-600">{data.transport.fromBangkok}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Local Transport</h3>
                <ul className="space-y-1">
                  {data.transport.localTransport.map((t, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-thailand-blue">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Food guide */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Food &amp; Dining in {data.cityName}</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Must-Try Dishes</h3>
                <ul className="space-y-1">
                  {data.food.mustTry.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-thailand-gold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Best Food Areas</h3>
                <ul className="space-y-1">
                  {data.food.foodAreas.map((area, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-thailand-blue">•</span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Food Tips</h3>
                <ul className="space-y-1">
                  {data.food.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-green-600">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href={`/city/${data.citySlug}/food/`}
              className="inline-block text-thailand-blue font-semibold hover:underline"
            >
              Full {data.cityName} Food Guide →
            </Link>
          </section>

          {/* Etiquette */}
          {data.etiquette.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cultural Etiquette &amp; Tips</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <ul className="space-y-3">
                  {data.etiquette.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="text-thailand-blue font-bold shrink-0">{i + 1}.</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Budget breakdown */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {data.cityName} Budget Guide
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                  <h3 className="font-bold text-gray-900">Budget Traveller</h3>
                </div>
                <p className="text-gray-600 text-sm">{data.budget.budget}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-yellow-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 shrink-0"></span>
                  <h3 className="font-bold text-gray-900">Mid-Range</h3>
                </div>
                <p className="text-gray-600 text-sm">{data.budget.midRange}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0"></span>
                  <h3 className="font-bold text-gray-900">Luxury</h3>
                </div>
                <p className="text-gray-600 text-sm">{data.budget.luxury}</p>
              </div>
            </div>
          </section>

          {/* Affiliate box: tours */}
          {affiliates && (
            <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="tours" />
          )}

          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="travel-guide" />
        </div>
      </div>
    </>
  );
}

// --- Page props ---

interface Props {
  pageType: 'where-to-stay' | 'travel-guide';
  whereToStayData: WhereToStayPage | null;
  travelGuideData: TravelGuidePage | null;
  affiliates: CityAffiliates | null;
}

export default function GuidesPage({ pageType, whereToStayData, travelGuideData, affiliates }: Props) {
  if (pageType === 'where-to-stay' && whereToStayData) {
    return <WhereToStaySection data={whereToStayData} affiliates={affiliates} />;
  }
  if (pageType === 'travel-guide' && travelGuideData) {
    return <TravelGuideSection data={travelGuideData} affiliates={affiliates} />;
  }
  return null;
}

// --- Static generation ---

export const getStaticPaths: GetStaticPaths = async () => {
  const cities = getClusterCities();
  const paths = cities.flatMap((city) => [
    { params: { slug: `where-to-stay-${city}` } },
    { params: { slug: `${city}-travel-guide` } },
  ]);
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  let pageType: 'where-to-stay' | 'travel-guide';
  let citySlug: string;

  if (slug.startsWith('where-to-stay-')) {
    pageType = 'where-to-stay';
    citySlug = slug.replace(/^where-to-stay-/, '');
  } else if (slug.endsWith('-travel-guide')) {
    pageType = 'travel-guide';
    citySlug = slug.replace(/-travel-guide$/, '');
  } else {
    return { notFound: true };
  }

  const whereToStayData = pageType === 'where-to-stay' ? getWhereToStay(citySlug) : null;
  const travelGuideData = pageType === 'travel-guide' ? getTravelGuide(citySlug) : null;

  // Return 404 if the specific data file doesn't exist
  if (pageType === 'where-to-stay' && !whereToStayData) return { notFound: true };
  if (pageType === 'travel-guide' && !travelGuideData) return { notFound: true };

  return {
    props: {
      pageType,
      whereToStayData,
      travelGuideData,
      affiliates: getAffiliates(citySlug),
    },
    revalidate: 86400,
  };
};
