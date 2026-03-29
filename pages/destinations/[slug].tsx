import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClusterNav from '../../components/ClusterNav';
import AffiliateBox from '../../components/AffiliateBox';
import type { DestinationHub } from '../../lib/cluster-types';
import { getClusterLinks } from '../../lib/cluster-types';
import { getAffiliates, CityAffiliates } from '../../lib/affiliates';
import { normalizeDestinationHub } from '../../lib/normalize-cluster';

interface Props {
  data: DestinationHub;
  affiliates: CityAffiliates | null;
}

export default function DestinationHubPage({ data, affiliates }: Props) {
  const links = getClusterLinks(data.citySlug, data.cityName);
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations/' },
    { name: data.cityName, href: `/destinations/${data.citySlug}/` },
  ];

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">

        {/* Hero / Editorial intro */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-10">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
              {data.cityName}: Complete Destination Guide (2026)
            </h1>
            <div className="max-w-3xl">
              <p className="text-xl text-gray-700 leading-relaxed mb-4">{data.overview}</p>
              <p className="text-base text-gray-500 italic">
                Last updated: {new Date(data.lastUpdated).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}
                {data.sources && data.sources.length > 0 && ` · ${data.sources.length} verified sources`}
              </p>
            </div>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hub" />

          {/* Why Visit section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Visit {data.cityName}?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Here is what makes {data.cityName} worth putting on your Thailand itinerary — the experiences and qualities that set it apart from other destinations in the country.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {data.highlights.map((h, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-3">
                  <span className="text-thailand-blue font-bold text-lg shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Best Time to Visit — editorial */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Best Time to Visit {data.cityName}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Thailand has three distinct seasons and the right timing can transform your trip. Here is how {data.cityName} behaves through the year and when we recommend visiting.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="border-l-4 border-green-400 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-green-600 mb-1">Peak Season</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{data.bestTimeToVisit.peak}</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-yellow-600 mb-1">Shoulder Season</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{data.bestTimeToVisit.shoulder}</p>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-1">Low Season</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{data.bestTimeToVisit.lowSeason}</p>
                </div>
              </div>
              <div className="bg-thailand-blue/5 rounded-xl p-4 border border-thailand-blue/10">
                <p className="text-sm font-semibold text-thailand-blue mb-1">Our recommendation</p>
                <p className="text-gray-700">{data.bestTimeToVisit.recommendation}</p>
              </div>
              <Link href={`/city/${data.citySlug}/weather/`} className="text-thailand-blue hover:underline text-sm mt-4 inline-block font-medium">
                See detailed monthly weather for {data.cityName} →
              </Link>
            </div>
          </section>

          {/* Planning context: Getting There & Around */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Planning Your Trip to {data.cityName}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Practical logistics sorted before you arrive. How to get there from Bangkok and around the city once you are on the ground.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">✈️</span>
                  <h3 className="font-bold text-gray-900 text-lg">Getting There</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{data.gettingThere}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🚌</span>
                  <h3 className="font-bold text-gray-900 text-lg">Getting Around</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{data.gettingAround}</p>
              </div>
            </div>
          </section>

          {/* Top Attractions — editorial intro + cards */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Attractions in {data.cityName}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">
              These are the experiences and landmarks that define a trip to {data.cityName}. Each entry includes real entrance fees and practical tips so you can plan without surprises.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {data.topAttractions.slice(0, 6).map((a, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{a.name}</h3>
                    <span className="shrink-0 text-xs text-thailand-blue bg-thailand-blue/10 px-2 py-0.5 rounded-full whitespace-nowrap">{a.type}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">{a.description}</p>
                  {a.entranceFee && (
                    <p className="text-sm text-gray-500 bg-gray-50 rounded px-3 py-1.5 inline-block">
                      <span className="font-medium">Entrance:</span> {a.entranceFee}
                    </p>
                  )}
                  {a.tips && a.tips.length > 0 && (
                    <p className="text-xs text-gray-400 mt-2 italic">{a.tips[0]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link href={`/things-to-do/${data.citySlug}/`} className="inline-block text-thailand-blue font-semibold hover:underline">
                See all things to do in {data.cityName} →
              </Link>
              <Link href={`/city/${data.citySlug}/top-10-attractions/`} className="inline-block text-thailand-blue font-semibold hover:underline">
                Top 10 must-see attractions →
              </Link>
            </div>
          </section>

          {/* Affiliate box — tours, moved below content */}
          {affiliates && (
            <div className="mb-12">
              <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="tours" />
            </div>
          )}

          {/* Travel Tips — editorial prose treatment */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Essential Travel Tips for {data.cityName}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">
              These are the things experienced travellers wish they had known before arriving. Read these before your trip and you will avoid the most common mistakes.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <ul className="space-y-4">
                {data.travelTips.map((tip, i) => (
                  <li key={i} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <span className="text-thailand-gold font-bold text-lg shrink-0 mt-0.5">{i + 1}.</span>
                    <span className="text-gray-700 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Affiliate box — hotels */}
          {affiliates && (
            <div className="mb-12">
              <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="hotels" />
            </div>
          )}

          {/* Explore more in this destination */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore More of {data.cityName}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href={`/best-hotels/${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <div className="text-2xl mb-2">🏨</div>
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">Best Hotels</h3>
                <p className="text-sm text-gray-500">Budget to luxury — our top picks with honest reviews.</p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">See hotels →</span>
              </Link>
              <Link
                href={`/things-to-do/${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">Things To Do</h3>
                <p className="text-sm text-gray-500">Activities, tours and experiences — all price ranges.</p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">See activities →</span>
              </Link>
              <Link
                href={`/guides/travel-guide/${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <div className="text-2xl mb-2">📋</div>
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">Travel Guide</h3>
                <p className="text-sm text-gray-500">Itineraries, food, budget planning and local etiquette.</p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">Read guide →</span>
              </Link>
              <Link
                href={`/guides/where-to-stay/${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <div className="text-2xl mb-2">📍</div>
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">Where to Stay</h3>
                <p className="text-sm text-gray-500">Neighborhood guide — find the right area for your style.</p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">Choose area →</span>
              </Link>
              <Link
                href={`/city/${data.citySlug}/weather/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <div className="text-2xl mb-2">🌤</div>
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">Weather</h3>
                <p className="text-sm text-gray-500">Month-by-month breakdown with temperature and rainfall.</p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">See weather →</span>
              </Link>
              <Link
                href={`/city/${data.citySlug}/budget/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">Budget Guide</h3>
                <p className="text-sm text-gray-500">Daily costs for budget, mid-range and luxury travel.</p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">See costs →</span>
              </Link>
            </div>
          </section>

          {/* Source attribution */}
          {data.sources && data.sources.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-gray-700 mb-3">Sources & Verification</h2>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-3">
                  Information on this page has been compiled and verified from the following sources. Entrance fees and transport details are verified periodically; always confirm locally before your visit.
                </p>
                <ul className="space-y-1.5">
                  {data.sources.map((s, i) => (
                    <li key={i} className="text-sm text-gray-500 flex gap-2">
                      <span className="shrink-0">·</span>
                      <span>
                        <a
                          href={s.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-thailand-blue hover:underline"
                        >
                          {s.sourceName}
                        </a>
                        {s.lastVerified && (
                          <span className="text-gray-400 ml-1">
                            (verified {new Date(s.lastVerified).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })})
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hub" />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getClusterCities } = await import('../../lib/clusters');
  const cities = getClusterCities();
  return {
    paths: cities.map(slug => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getDestinationHub } = await import('../../lib/clusters');
  const slug = params?.slug as string;
  const raw = getDestinationHub(slug);
  if (!raw) return { notFound: true };
  const data = normalizeDestinationHub(raw);
  return {
    props: { data, affiliates: getAffiliates(slug) },
    revalidate: 604800,
  };
};
