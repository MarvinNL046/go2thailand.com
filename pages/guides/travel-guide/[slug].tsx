import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ClusterNav from '../../../components/ClusterNav';
import AffiliateBox from '../../../components/AffiliateBox';
import {
  getTravelGuide,
  getClusterCities,
  TravelGuidePage,
} from '../../../lib/clusters';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';

interface Props {
  data: TravelGuidePage;
  affiliates: CityAffiliates | null;
}

export default function TravelGuidePage({ data, affiliates }: Props) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides/' },
    { name: `${data.cityName} Travel Guide`, href: `/guides/travel-guide/${data.citySlug}/` },
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

export const getStaticPaths: GetStaticPaths = async () => {
  const cities = getClusterCities();
  return {
    paths: cities.map((city) => ({ params: { slug: city } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const data = getTravelGuide(slug);
  if (!data) return { notFound: true };
  return {
    props: { data, affiliates: getAffiliates(slug) },
    revalidate: 86400,
  };
};
