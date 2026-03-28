import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCityBySlug, generateBreadcrumbs } from '../../../lib/cities';
import { getDivingSnorkelingByCity, getAllDivingSnorkelingCities } from '../../../lib/diving-snorkeling';
import { formatPrice } from '../../../lib/price';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
import CitySupportSources from '../../../components/CitySupportSources';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';

interface Activity {
  name: string;
  slug: string;
  provider: string;
  type: 'diving' | 'snorkeling';
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
  classes: Activity[];
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
  divingData: CityData | null;
  affiliates: CityAffiliates | null;
}

function TypeBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; color: string }> = {
    diving: { label: 'Scuba Diving', color: 'bg-blue-100 text-blue-700' },
    snorkeling: { label: 'Snorkeling', color: 'bg-cyan-100 text-cyan-700' },
  };
  const { label, color } = config[type] || config.snorkeling;
  return <span className={`text-xs font-semibold px-2 py-1 rounded ${color}`}>{label}</span>;
}

export default function DivingSnorkelingPage({ city, divingData, affiliates }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  if (!city) return <div>Not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Diving & Snorkeling', href: `/city/${city.slug}/diving-snorkeling/` }
  ];

  const divingActivities = divingData?.classes?.filter(c => c.type === 'diving') || [];
  const snorkelingActivities = divingData?.classes?.filter(c => c.type === 'snorkeling') || [];
  const activityCount = divingData?.classes?.length || 0;
  const hasLocalOptions = activityCount > 0;
  const priceValues = divingData?.classes?.map(c => c.priceFrom).filter((price): price is number => typeof price === 'number' && Number.isFinite(price)) || [];
  const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : null;
  const maxPrice = priceValues.length > 0 ? Math.max(...priceValues) : null;
  const introText = divingData?.intro?.en || `Diving and snorkeling are not a core local fit in ${city.name.en}, so this page keeps the focus on honest planning context and stronger alternatives.`;
  const editorialPositioning = (city.editorialPositioning || `Ayutthaya is inland and not a diving/snorkeling base. The stronger sea-based options in Thailand are on the coast and islands.`).trim();
  const recommendedAlternatives = city.recommendedAlternatives && city.recommendedAlternatives.length > 0
    ? city.recommendedAlternatives
    : [
        { label: 'Phuket diving & snorkeling', href: '/city/phuket/diving-snorkeling/', note: 'Biggest marine-tour inventory' },
        { label: 'Krabi diving & snorkeling', href: '/city/krabi/diving-snorkeling/', note: 'Strong island-hopping trips' },
        { label: 'Attractions in Ayutthaya', href: `/city/${city.slug}/attractions/`, note: 'Better local fit' },
      ];

  const title = `Diving & Snorkeling in ${city.name.en} 2026 — Practical Overview`;
  const description = hasLocalOptions
    ? `Use this overview to compare diving and snorkeling trip types, general price ranges, and seasonal planning notes in ${city.name.en}.`
    : `Diving and snorkeling are limited in ${city.name.en}, so this page explains the local fit honestly and points you toward stronger coastal alternatives.`;

  const faqItems = hasLocalOptions
    ? [
        {
          q: `How much does diving or snorkeling cost in ${city.name.en}?`,
          a: `Diving and snorkeling tours in ${city.name.en} range from ${minPrice !== null ? formatPrice(minPrice, loc) : 'unknown'} to ${maxPrice !== null ? formatPrice(maxPrice, loc) : 'unknown'} per person. Snorkeling tours are typically more affordable, while scuba diving experiences cost more due to equipment and instruction.`
        },
        {
          q: `Do I need certification to go scuba diving in ${city.name.en}?`,
          a: `Certification requirements depend on the activity. Many introductory or "try dive" programs in ${city.name.en} are set up for first-time participants, while certified dives and multi-day courses have stricter requirements. Check the operator details before booking.`
        },
        {
          q: `When is the best time for diving and snorkeling in ${city.name.en}?`,
          a: `Conditions vary by coast, island group, and operator in ${city.name.en}. Check the local season, marine-park access windows, and expected sea conditions for your specific trip dates before booking.`
        },
        {
          q: `What should I bring on a diving or snorkeling trip?`,
          a: `Bring sunscreen (reef-safe preferred), a towel, swimwear, a waterproof phone case for photos, and motion sickness medication if needed. Equipment is often included, but the exact setup varies by operator, so check the inclusions before you go.`
        }
      ]
    : [
        {
          q: `Is ${city.name.en} a diving base?`,
          a: editorialPositioning,
        },
        {
          q: `Where should I go instead for diving or snorkeling?`,
          a: `Phuket and Krabi are much stronger matches for sea-based trips and marine activities.`,
        },
        {
          q: `What should I do in ${city.name.en} instead?`,
          a: `Ayutthaya is better suited to temples, museums, food stops, and river planning than to marine tours.`,
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

  const renderActivitySection = (activities: Activity[], sectionTitle: string) => (
    activities.length > 0 && (
      <div className="mb-12">
        <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{sectionTitle}</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-white bg-blue-600 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <TypeBadge type={activity.type} />
                      {activity.badge && (
                        <span className="text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded">
                          {activity.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{activity.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>{activity.duration}</span>
                      <span className="capitalize">{activity.groupSize}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.includes.map((item, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">From</div>
                      <div className="text-2xl font-bold text-gray-900">{formatPrice(activity.priceFrom, loc)}</div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );

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
                Diving & Snorkeling in {city.name.en}
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
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
                <div className="text-3xl font-bold text-thailand-blue">{activityCount}</div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {minPrice !== null ? formatPrice(minPrice, loc) : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Starting From</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {new Set((divingData?.classes || []).map(c => c.duration)).size}
                </div>
                <div className="text-sm text-gray-600">Trip Formats</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {new Set((divingData?.classes || []).map(c => c.groupSize)).size}
                </div>
                <div className="text-sm text-gray-600">Group Styles</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Diving & Snorkeling in {city.name.en}
              </h2>
              <p className="text-gray-700 leading-relaxed">{introText}</p>
              {!hasLocalOptions && (
                <div className="mt-6 rounded-2xl bg-amber-50 p-5 text-amber-900">
                  <h3 className="text-lg font-bold font-heading mb-2">Limited local fit</h3>
                  <p className="text-sm leading-6">{editorialPositioning}</p>
                </div>
              )}
            </div>

            {/* Activities by type */}
            {hasLocalOptions ? (
              divingActivities.length > 0 && snorkelingActivities.length > 0 ? (
                <>
                  {renderActivitySection(divingActivities, `Scuba Diving in ${city.name.en}`)}
                  {renderActivitySection(snorkelingActivities, `Snorkeling Tours in ${city.name.en}`)}
                </>
              ) : (
                renderActivitySection(divingData?.classes || [], `Top ${activityCount} Activities in ${city.name.en}`)
              )
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  No local diving or snorkeling inventory
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
                Tips for Diving & Snorkeling in {city.name.en}
              </h2>
              <ul className="space-y-3">
                {(divingData?.tips?.en?.length ? divingData.tips.en : [
                  'Use this page as a fit check rather than a booking list when the city is inland.',
                  'Phuket and Krabi are much stronger matches for marine tours and snorkeling.',
                  'If you stay in Ayutthaya, use the time for temples, food, and river planning instead.',
                ]).map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1 flex-shrink-0">
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
                  Use these links only if you want to check live availability after narrowing down the trip style that fits your trip.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {affiliates?.getyourguide && (
                    <a href={affiliates.getyourguide} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center justify-center px-8 py-3 bg-white text-thailand-blue font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                      View GetYourGuide options
                    </a>
                  )}
                  {affiliates?.klook && (
                    <a href={affiliates.klook} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors border border-white/40">
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
                  Better coastal alternatives
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If diving or snorkeling is a priority, Ayutthaya is not the right base.
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
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Frequently Asked Questions</h2>
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
                <Link href={`/city/${city.slug}/elephant-sanctuaries/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-semibold text-gray-900">Elephant Sanctuaries</h4>
                    <p className="text-gray-600 text-sm">Ethical elephant experiences</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-semibold text-gray-900">Hotels</h4>
                    <p className="text-gray-600 text-sm">Where to stay</p>
                  </div>
                </Link>
              </div>
            <CityExploreMore citySlug={city.slug} cityName={city.name.en} currentPage="diving-snorkeling" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citySlugs = getAllDivingSnorkelingCities();
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

  const divingData = getDivingSnorkelingByCity(slug);

  const affiliates = getAffiliates(params.slug as string);

  const sanitizedDivingData = divingData
    ? {
        ...divingData,
        classes: divingData.classes.map(({ gygPath, ...activity }) => activity),
      }
    : null;

  return { props: { city, divingData: sanitizedDivingData, affiliates }, revalidate: 86400 };
};
