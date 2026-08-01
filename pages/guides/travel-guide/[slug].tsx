import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ClusterNav from '../../../components/ClusterNav';
import AffiliateBox from '../../../components/AffiliateBox';
import type { TravelGuidePage } from '../../../lib/cluster-types';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';
import { normalizeEnInternalHref } from '../../../lib/en-route-owners';
import { normalizeTravelGuide } from '../../../lib/normalize-cluster';
import { nlCityOwner, normalizeNlInternalHref } from '../../../lib/nl-route-owners';
import { AffiliateDisclosure } from '../../../components/design/AffiliateDisclosure';
import { SourceMethodSection } from '../../../components/design/SourceMethodSection';
// NOTE: clusters.ts imported dynamically in getStaticPaths/Props to avoid bundling 'fs' client-side

interface Props {
  data: TravelGuidePage;
  affiliates: CityAffiliates | null;
}

export default function TravelGuidePage({ data, affiliates }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Reisgidsen' : 'Travel guides', href: '/travel-guides/' },
    { name: isNl ? `${data.cityName} Reisgids` : `${data.cityName} Travel Guide`, href: `/guides/travel-guide/${data.citySlug}/` },
  ];
  const pageUrl = `https://go2-thailand.com/guides/travel-guide/${data.citySlug}/`;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${data.cityName} travel guide`,
      description: data.seo.metaDescription,
      url: pageUrl,
      inLanguage: 'en-GB',
      dateModified: data.lastUpdated,
      author: { '@type': 'Organization', name: 'Go2Thailand' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: index === breadcrumbs.length - 1 ? pageUrl : `https://go2-thailand.com${item.href}`,
      })),
    },
  ];

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription}>
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>
      <div className="bg-surface-cream min-h-screen" data-premium-template="city-travel-guide-en">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              {isNl ? `${data.cityName} Reisgids: Alles Wat Je Moet Weten (2026)` : `${data.cityName} Travel Guide`}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">{data.intro}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="travel-guide" />

          {!isNl && (
            <div className="mb-10 rounded-2xl border border-saffron/25 bg-saffron-pale p-5 text-sm leading-6 text-jade">
              <strong>Plan with live details.</strong> Itineraries are editorial suggestions, while fares, opening times, departure points and service patterns can change. Verify each bookable leg and venue on the date you travel.
            </div>
          )}

          {/* Itinerary */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.itinerary.title}</h2>
            <p className="text-gray-500 mb-6 text-sm">{isNl ? `Dag-voor-dag plan voor ${data.cityName}` : `Day-by-day plan for ${data.cityName}`}</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? `Vervoer naar & in ${data.cityName}` : `Getting to & Around ${data.cityName}`}</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{isNl ? 'Vanuit Bangkok' : 'From Bangkok'}</h3>
                <p className="text-gray-600">{data.transport.fromBangkok}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{isNl ? 'Lokaal Vervoer' : 'Local Transport'}</h3>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? `Eten & Drinken in ${data.cityName}` : `Food & Dining in ${data.cityName}`}</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">{isNl ? 'Must-Try Gerechten' : 'Must-Try Dishes'}</h3>
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
                <h3 className="font-bold text-gray-900 mb-3">{isNl ? 'Beste Eetgebieden' : 'Best Food Areas'}</h3>
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
                <h3 className="font-bold text-gray-900 mb-3">{isNl ? 'Eettips' : 'Food Tips'}</h3>
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
              href={isNl ? normalizeNlInternalHref(`/city/${data.citySlug}/food/`) : normalizeEnInternalHref(`/city/${data.citySlug}/food/`)}
              className="inline-block text-thailand-blue font-semibold hover:underline"
            >
              {isNl ? `Volledige ${data.cityName} Eetgids →` : `Full ${data.cityName} Food Guide →`}
            </Link>
          </section>

          {/* Etiquette */}
          {data.etiquette.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Culturele Etiquette & Tips' : 'Cultural Etiquette & Tips'}</h2>
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
              {isNl ? `${data.cityName} Budgetgids` : `${data.cityName} Budget Guide`}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                  <h3 className="font-bold text-gray-900">{isNl ? 'Budgetreiziger' : 'Budget Traveller'}</h3>
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
            {!isNl && <p className="mt-4 text-xs font-medium leading-6 text-charcoal/60">Budget figures are orientation ranges from the underlying editorial research, not quotes. Check current accommodation, transport and activity totals for your dates.</p>}
          </section>

          {/* Affiliate box: tours */}
          {affiliates && (
            <><AffiliateBox affiliates={affiliates} cityName={data.cityName} type="tours" /><AffiliateDisclosure className="mb-10">Sponsored booking links may earn us a commission at no extra cost to you. Compare the live price, provider, inclusions, meeting point and cancellation terms before paying.</AffiliateDisclosure></>
          )}

          {/* Explore More */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Ontdek Meer' : 'Explore More'}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
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
                href="/food/"
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  {isNl ? 'Thais Eten Gids' : 'Thai Food Guide'}
                </h3>
                <p className="text-sm text-gray-500">{isNl ? 'Gerechten, street food & eettips →' : 'Dishes, street food & dining tips →'}</p>
              </Link>
              <Link
                href="/travel-insurance/"
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

          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="travel-guide" />
          {!isNl && data.sources.length > 0 && (
            <SourceMethodSection
              eyebrow="Sources & method"
              title="A route framework, not a live booking feed"
              description="The guide combines destination research with practical trip sequencing. Time-sensitive fares, schedules and availability must be checked again with the named venue or operator."
              sources={data.sources.map((source) => ({ title: source.sourceName, creator: source.sourceName, url: source.sourceUrl, note: `Editorial source last recorded as checked on ${source.lastVerified}. Recheck volatile details before travel.` }))}
            />
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { getTravelGuide } = await import('../../../lib/clusters');
  const slug = params?.slug as string;
  if (locale === 'nl') {
    return {
      redirect: {
        destination: `/nl${nlCityOwner(slug)}`,
        permanent: true,
      },
    };
  }
  const raw = getTravelGuide(slug);
  if (!raw) return { notFound: true };
  const data = normalizeTravelGuide(raw);
  if (locale === 'en') {
    data.seo = {
      ...data.seo,
      title: String(data.seo.title).replace(/\s*\(2026\)/g, '').replace(/\b2026\b/g, '').replace(/\s{2,}/g, ' ').trim(),
      metaDescription: String(data.seo.metaDescription).replace(/\bfor 2026\b/gi, '').replace(/\b2026\b/g, '').replace(/\s{2,}/g, ' ').trim(),
    };
  }
  return {
    props: { data, affiliates: getAffiliates(slug) },
    revalidate: 604800,
  };
};
