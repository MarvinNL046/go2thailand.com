import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import { getElephantSanctuariesByCity, getAllElephantSanctuaryCities } from '../../../lib/elephant-sanctuaries';
import { formatPrice } from '../../../lib/price';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
import CitySupportSources from '../../../components/CitySupportSources';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';

interface Sanctuary {
  name: string;
  slug: string;
  provider: string;
  priceFrom: number;
  currency: string;
  duration: string;
  groupSize: string;
  includes: string[];
  badge: string;
}

interface CityData {
  city: string;
  cityName: { en: string; nl: string };
  intro: { en: string; nl: string };
  tips: { en: string[]; nl: string[] };
  classes: Sanctuary[];
}

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  contentSources?: any[];
  reviewed_by?: string;
  reviewed_at?: string;
  enhanced_at?: string;
  editorialPositioning?: string;
  sourceSummary?: string;
  recommendedAlternatives?: { label: string; href: string; note?: string }[];
}

interface Props {
  city: City;
  sanctuaryData: CityData | null;
  affiliates: CityAffiliates | null;
}

export default function ElephantSanctuariesPage({ city, sanctuaryData, affiliates }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  if (!city) return <div>Not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Elephant Sanctuaries', href: `/city/${city.slug}/elephant-sanctuaries/` }
  ];

  const sanctuaryClasses = sanctuaryData?.classes || [];
  const hasLocalOptions = sanctuaryClasses.length > 0;
  const priceValues = sanctuaryClasses.map(c => c.priceFrom).filter((price): price is number => typeof price === 'number' && Number.isFinite(price));
  const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : null;
  const maxPrice = priceValues.length > 0 ? Math.max(...priceValues) : null;
  const introText = sanctuaryData?.intro?.en || `Elephant sanctuaries are not a core local draw in ${city.name.en}, so this page keeps the focus on honest fit and better alternatives instead of forcing fake listings.`;
  const editorialPositioning = (city.editorialPositioning || `Ayutthaya is not a core elephant-sanctuary base. The strongest ethical sanctuary options in Thailand are usually concentrated around Chiang Mai, Phuket, and Krabi.`).trim();
  const recommendedAlternatives = city.recommendedAlternatives && city.recommendedAlternatives.length > 0
    ? city.recommendedAlternatives
    : [
        { label: 'Chiang Mai sanctuaries', href: '/city/chiang-mai/elephant-sanctuaries/', note: 'Deepest sanctuary market' },
        { label: 'Phuket sanctuaries', href: '/city/phuket/elephant-sanctuaries/', note: 'Good tour variety' },
        { label: 'Krabi sanctuaries', href: '/city/krabi/elephant-sanctuaries/', note: 'Smaller-group options' },
      ];

  const title = `Elephant Sanctuaries in ${city.name.en} 2026 — Practical Overview`;
  const description = hasLocalOptions
    ? `Use this page to compare sanctuary formats, general price ranges, and planning considerations for elephant visits in ${city.name.en}.`
    : `Elephant sanctuaries are limited in ${city.name.en}, so this page explains the local fit honestly and points you toward stronger alternatives.`;

  const faqItems = hasLocalOptions
    ? [
        {
          q: `How much does an elephant sanctuary visit in ${city.name.en} cost?`,
          a: `Elephant sanctuary experiences in ${city.name.en} range from ${minPrice !== null ? formatPrice(minPrice, loc) : 'unknown'} to ${maxPrice !== null ? formatPrice(maxPrice, loc) : 'unknown'} per person, depending on the program duration and inclusions like meals and hotel transfers.`
        },
        {
          q: `Are elephant sanctuaries in ${city.name.en} ethical?`,
          a: `Standards vary by operator, so review each program carefully before booking. For a stronger fit, prioritize operators that clearly explain their no-riding approach, visitor interaction limits, and welfare policies.`
        },
        {
          q: `Do I need to book an elephant sanctuary in advance?`,
          a: `Booking needs vary by sanctuary, season, and trip style in ${city.name.en}. If you are traveling during busier periods or want a smaller-group visit, it is sensible to check availability ahead rather than assume last-minute space.`
        },
        {
          q: `What should I wear to an elephant sanctuary?`,
          a: `Wear comfortable clothes you do not mind getting dusty or wet, and choose practical footwear for outdoor walking. Bring sunscreen, insect repellent, and a waterproof phone case if needed, and check the operator notes in case they suggest specific clothing or provide optional extras.`
        }
      ]
    : [
        {
          q: `Is ${city.name.en} a strong elephant-sanctuary base?`,
          a: editorialPositioning,
        },
        {
          q: `Where are the stronger elephant sanctuary options?`,
          a: `Chiang Mai, Phuket, and Krabi generally have stronger sanctuary inventories and more clearly defined visitor programs.`,
        },
        {
          q: `What should I do in ${city.name.en} instead?`,
          a: `Ayutthaya is a better fit for historical parks, temples, and river dining than for elephant-specific day trips.`,
        },
      ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <>
      <SEOHead title={title} description={description}>
        <meta name="robots" content="noindex, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-4">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                Elephant Sanctuaries in {city.name.en}
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                {introText.split('.').slice(0, 2).join('.') + '.'}
              </p>
            </div>
          </div>
        </section>

        {(city.contentSources?.length || city.reviewed_by || city.reviewed_at || city.enhanced_at || city.editorialPositioning || city.sourceSummary) && (
          <section className="section-padding pt-8">
            <div className="container-custom">
              <CitySupportSources
                cityName={city.name.en}
                contentSources={city.contentSources}
                reviewedBy={city.reviewed_by}
                reviewedAt={city.reviewed_at}
                enhancedAt={city.enhanced_at}
                editorialPositioning={city.editorialPositioning}
                sourceSummary={city.sourceSummary}
              />
            </div>
          </section>
        )}

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">{sanctuaryClasses.length}</div>
                <div className="text-sm text-gray-600">Sanctuaries</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {minPrice !== null ? formatPrice(minPrice, loc) : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Starting From</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {new Set(sanctuaryClasses.map(c => c.duration)).size}
                </div>
                <div className="text-sm text-gray-600">Visit Formats</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {new Set(sanctuaryClasses.map(c => c.groupSize)).size}
                </div>
                <div className="text-sm text-gray-600">Group Styles</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Elephant Sanctuaries in {city.name.en}
              </h2>
              <p className="text-gray-700 leading-relaxed">{introText}</p>
              {!hasLocalOptions && (
                <div className="mt-6 rounded-2xl bg-amber-50 p-5 text-amber-900">
                  <h3 className="text-lg font-bold font-heading mb-2">Limited local fit</h3>
                  <p className="text-sm leading-6">{editorialPositioning}</p>
                </div>
              )}
            </div>

            {hasLocalOptions ? (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
                  Top {sanctuaryClasses.length} Elephant Sanctuaries in {city.name.en}
                </h2>

                <div className="space-y-6 mb-12">
                  {sanctuaryClasses.map((sanctuary, index) => (
                    <div key={sanctuary.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-bold text-white bg-green-600 px-2 py-1 rounded">
                                #{index + 1}
                              </span>
                              {sanctuary.badge && (
                                <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded">
                                  {sanctuary.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{sanctuary.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span>{sanctuary.duration}</span>
                              <span className="capitalize">{sanctuary.groupSize}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {sanctuary.includes.map((item, i) => (
                                <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-right">
                              <div className="text-sm text-gray-500">From</div>
                              <div className="text-2xl font-bold text-gray-900">{formatPrice(sanctuary.priceFrom, loc)}</div>
                              <div className="text-xs text-gray-500">per person</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  No dedicated elephant-sanctuary listings
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {editorialPositioning}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedAlternatives.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                      <p className="text-sm text-gray-600">{item.note || 'A stronger planning fit.'}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                Tips for Visiting Elephant Sanctuaries in {city.name.en}
              </h2>
              <ul className="space-y-3">
                {(sanctuaryData?.tips?.en?.length ? sanctuaryData.tips.en : [
                  'Use this page as a fit check, not a booking list, when the city is not a sanctuary base.',
                  'Chiang Mai, Phuket, and Krabi generally offer the strongest sanctuary inventories in Thailand.',
                  'Prioritize ethical programs that explain no-riding policies and visitor interaction limits clearly.',
                ]).map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {hasLocalOptions ? (
              <div className="bg-surface-dark rounded-2xl p-8 mb-12 text-center text-white">
                <h2 className="text-3xl font-bold font-heading mb-4">
                  Optional Planning Links for {city.name.en}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Use these links only if you want to check live availability after reviewing the sanctuary formats and ethics notes above.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {affiliates?.getyourguide && (
                    <a
                      href={affiliates.getyourguide}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center px-8 py-3 bg-white text-thailand-blue font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      View GetYourGuide options
                    </a>
                  )}
                  {affiliates?.klook && (
                    <a
                      href={affiliates.klook}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors border border-white/40"
                    >
                      View Klook options
                    </a>
                  )}
                </div>
                <p className="text-xs text-white/70 mt-4">
                  External booking links are optional planning tools. We may earn a commission at no extra cost to you.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  Better sanctuary planning alternatives
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If elephant sanctuaries are a priority, Ayutthaya is not the place to anchor that part of the trip.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedAlternatives.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                      <p className="text-sm text-gray-600">{item.note || 'A stronger planning fit.'}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore More */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
                Explore More of {city.name.en}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={`/city/${city.slug}/attractions/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-semibold text-gray-900">Attractions</h4>
                    <p className="text-gray-600 text-sm">Top things to see</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/cooking-classes/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-semibold text-gray-900">Cooking Classes</h4>
                    <p className="text-gray-600 text-sm">Learn Thai cooking</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-semibold text-gray-900">Hotels</h4>
                    <p className="text-gray-600 text-sm">Where to stay</p>
                  </div>
                </Link>
              </div>
            <CityExploreMore citySlug={city.slug} cityName={city.name.en} currentPage="elephant-sanctuaries" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citySlugs = getAllElephantSanctuaryCities();
  const paths: { params: { slug: string }; locale?: string }[] = [];

  const locales = ['en', 'nl', 'zh', 'de', 'fr', 'ru', 'ja', 'ko', 'th'];
  citySlugs.forEach(slug => {
    const city = getCityBySlug(slug);
    if (!city) return;
    locales.forEach(locale => {
      paths.push({ params: { slug }, locale });
    });
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  if (!city) return { notFound: true };

  const sanctuaryData = getElephantSanctuariesByCity(slug);

  const affiliates = getAffiliates(params.slug as string);

  const sanitizedSanctuaryData = sanctuaryData
    ? {
        ...sanctuaryData,
        classes: sanctuaryData.classes.map(({ gygPath, ...sanctuary }) => sanctuary),
      }
    : null;

  return { props: { city, sanctuaryData: sanitizedSanctuaryData, affiliates }, revalidate: 86400 };
};
