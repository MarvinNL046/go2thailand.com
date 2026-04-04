import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import AffiliateBox from '../../components/AffiliateBox';
import type { ProvinceData } from '../../lib/province-types';
import { getAffiliates, CityAffiliates } from '../../lib/affiliates';
// NOTE: provinces.ts imported dynamically in getStaticPaths/Props to avoid bundling 'fs' client-side

interface Props {
  data: ProvinceData;
  affiliates: CityAffiliates | null;
}

const regionLabels: Record<string, { en: string; nl: string }> = {
  northern: { en: 'Northern Thailand', nl: 'Noord-Thailand' },
  central: { en: 'Central Thailand', nl: 'Centraal-Thailand' },
  southern: { en: 'Southern Thailand', nl: 'Zuid-Thailand' },
  isaan: { en: 'Isaan (Northeast)', nl: 'Isaan (Noordoost)' },
  eastern: { en: 'Eastern Thailand', nl: 'Oost-Thailand' },
  western: { en: 'Western Thailand', nl: 'West-Thailand' },
};

export default function ProvincePage({ data, affiliates }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Provincies' : 'Provinces', href: '/province/' },
    { name: data.provinceName, href: `/province/${data.provinceSlug}/` },
  ];

  const regionLabel = regionLabels[data.region]?.[lang] || regionLabels[data.region]?.en || data.region;

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-3">
              {data.provinceName} Province ({data.provinceNameThai})
            </h1>
            <div className="flex flex-wrap gap-3 mb-4">
              <Link
                href={`/region/${data.region}/`}
                className="text-sm bg-thailand-blue/10 text-thailand-blue px-3 py-1 rounded-full hover:bg-thailand-blue/20 transition-colors"
              >
                {regionLabel}
              </Link>
              <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {isNl ? 'Hoofdstad' : 'Capital'}: {data.capital}
              </span>
              <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {data.area.toLocaleString()} km²
              </span>
              <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                Pop. {data.population.toLocaleString()} ({data.populationYear})
              </span>
              <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {data.districts} {isNl ? 'districten' : 'districts'}
              </span>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl">{data.overview}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          {/* Highlights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? `Waarom ${data.provinceName} Bezoeken?` : `Why Visit ${data.provinceName}?`}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {data.highlights.map((h, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <span className="text-thailand-blue font-semibold mr-2">✓</span>{h}
                </div>
              ))}
            </div>
          </section>

          {/* Geography */}
          {data.geography && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Geografie & Landschap' : 'Geography & Landscape'}</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-gray-700">{data.geography}</p>
              </div>
            </section>
          )}

          {/* Best Time to Visit */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? `Beste Tijd om ${data.provinceName} te Bezoeken` : `Best Time to Visit ${data.provinceName}`}</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div><strong className="text-green-600">{isNl ? 'Hoogseizoen:' : 'Peak Season:'}</strong> {data.bestTimeToVisit.peak}</div>
                <div><strong className="text-yellow-600">{isNl ? 'Tussenseizoen:' : 'Shoulder:'}</strong> {data.bestTimeToVisit.shoulder}</div>
                <div><strong className="text-orange-600">{isNl ? 'Laagseizoen:' : 'Low Season:'}</strong> {data.bestTimeToVisit.lowSeason}</div>
              </div>
              <p className="text-gray-700">{data.bestTimeToVisit.recommendation}</p>
            </div>
          </section>

          {/* Top Attractions */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? `Top Attracties in ${data.provinceName}` : `Top Attractions in ${data.provinceName}`}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.topAttractions.map((a, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-1">{a.name}</h3>
                  <span className="text-xs text-thailand-blue bg-thailand-blue/10 px-2 py-0.5 rounded-full">{a.type}</span>
                  <p className="text-gray-600 text-sm mt-2">{a.description}</p>
                  {a.entranceFee && <p className="text-sm text-gray-500 mt-1">{isNl ? 'Toegang' : 'Entrance'}: {a.entranceFee}</p>}
                  {a.googleMapsUrl && (
                    <a href={a.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-thailand-blue hover:underline mt-1 inline-block">
                      View on Google Maps →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {affiliates && <AffiliateBox affiliates={affiliates} cityName={data.capital} type="tours" />}

          {/* Cities in this province */}
          {data.cities.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? `Bestemmingen in ${data.provinceName}` : `Destinations in ${data.provinceName}`}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.cities.map((city, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-2">{city.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {city.hasCityPage && (
                        <Link href={`/city/${city.slug}/`} className="text-sm text-thailand-blue hover:underline">
                          {isNl ? 'Stadsgids' : 'City Guide'} &rarr;
                        </Link>
                      )}
                      {city.hasCluster && (
                        <Link href={`/destinations/${city.slug}/`} className="text-sm text-thailand-blue hover:underline">
                          {isNl ? 'Bestemmingshub' : 'Destination Hub'} &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Local Food */}
          {data.localFood.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Lokaal Eten & Keuken' : 'Local Food & Cuisine'}</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <ul className="grid md:grid-cols-2 gap-2">
                  {data.localFood.map((food, i) => (
                    <li key={i} className="flex gap-2 text-gray-700">
                      <span className="text-thailand-gold shrink-0">•</span>
                      {food}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Culture */}
          {data.culture && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Cultuur & Tradities' : 'Culture & Traditions'}</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-gray-700">{data.culture}</p>
              </div>
            </section>
          )}

          {/* Getting There & Around */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Bereikbaarheid & Vervoer' : 'Getting There & Around'}</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm grid md:grid-cols-2 gap-6">
              <div><h3 className="font-bold mb-2">{isNl ? 'Bereikbaarheid' : 'Getting There'}</h3><p className="text-gray-600">{data.gettingThere}</p></div>
              <div><h3 className="font-bold mb-2">{isNl ? 'Rondreizen' : 'Getting Around'}</h3><p className="text-gray-600">{data.gettingAround}</p></div>
            </div>
          </section>

          {/* Travel Tips */}
          {data.travelTips.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? `Reistips voor ${data.provinceName}` : `Travel Tips for ${data.provinceName}`}</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <ul className="space-y-3">
                  {data.travelTips.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-thailand-gold shrink-0">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {affiliates && <AffiliateBox affiliates={affiliates} cityName={data.capital} type="hotels" />}

          {/* Neighboring Provinces */}
          {data.neighboringProvinces.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Aangrenzende Provincies' : 'Neighboring Provinces'}</h2>
              <div className="flex flex-wrap gap-3">
                {data.neighboringProvinces.map((np, i) => (
                  <Link
                    key={i}
                    href={`/province/${np.slug}/`}
                    className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all text-gray-900 font-medium"
                  >
                    {np.name} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to region */}
          <div className="mb-8">
            <Link
              href={`/region/${data.region}/`}
              className="text-thailand-blue hover:underline font-medium"
            >
              &larr; {isNl ? `Terug naar ${regionLabel}` : `Back to ${regionLabel}`}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getPublishedProvinces } = await import('../../lib/provinces');
  const provinces = getPublishedProvinces();
  return {
    paths: provinces.map(slug => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getProvince } = await import('../../lib/provinces');
  const slug = params?.slug as string;
  const data = getProvince(slug);
  if (!data) return { notFound: true };

  // Try to get affiliates for the capital city
  const capitalSlug = data.cities.find(c => c.name === data.capital)?.slug || slug;
  const affiliates = getAffiliates(capitalSlug);

  return {
    props: { data, affiliates },
    revalidate: 604800,
  };
};
