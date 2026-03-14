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
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              {data.cityName}: Complete Destination Guide (2026)
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">{data.overview}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hub" />

          {/* Highlights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Highlights</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {data.highlights.map((h, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <span className="text-thailand-blue font-semibold mr-2">✓</span>{h}
                </div>
              ))}
            </div>
          </section>

          {/* Best Time to Visit */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Time to Visit {data.cityName}</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div><strong className="text-green-600">Peak Season:</strong> {data.bestTimeToVisit.peak}</div>
                <div><strong className="text-yellow-600">Shoulder:</strong> {data.bestTimeToVisit.shoulder}</div>
                <div><strong className="text-orange-600">Low Season:</strong> {data.bestTimeToVisit.lowSeason}</div>
              </div>
              <p className="text-gray-700">{data.bestTimeToVisit.recommendation}</p>
              <Link href={`/city/${data.citySlug}/weather/`} className="text-thailand-blue hover:underline text-sm mt-2 inline-block">
                See detailed monthly weather →
              </Link>
            </div>
          </section>

          {/* Main Attractions preview */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Attractions in {data.cityName}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.topAttractions.slice(0, 6).map((a, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-1">{a.name}</h3>
                  <span className="text-xs text-thailand-blue bg-thailand-blue/10 px-2 py-0.5 rounded-full">{a.type}</span>
                  <p className="text-gray-600 text-sm mt-2">{a.description}</p>
                  {a.entranceFee && <p className="text-sm text-gray-500 mt-1">Entrance: {a.entranceFee}</p>}
                </div>
              ))}
            </div>
            <Link href={`/things-to-do/${data.citySlug}/`} className="inline-block mt-4 text-thailand-blue font-semibold hover:underline">
              See all things to do in {data.cityName} →
            </Link>
          </section>

          {affiliates && <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="tours" />}

          {/* Travel Tips */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel Tips</h2>
            <ul className="space-y-2">
              {data.travelTips.map((tip, i) => (
                <li key={i} className="flex gap-2"><span className="text-thailand-gold">•</span><span className="text-gray-700">{tip}</span></li>
              ))}
            </ul>
          </section>

          {/* Getting There & Around */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting There & Around</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm grid md:grid-cols-2 gap-6">
              <div><h3 className="font-bold mb-2">Getting There</h3><p className="text-gray-600">{data.gettingThere}</p></div>
              <div><h3 className="font-bold mb-2">Getting Around</h3><p className="text-gray-600">{data.gettingAround}</p></div>
            </div>
          </section>

          {affiliates && <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="hotels" />}

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
    revalidate: 86400,
  };
};
