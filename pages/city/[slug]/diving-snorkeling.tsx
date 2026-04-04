import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, generateBreadcrumbs } from '../../../lib/cities';
import { getDivingSnorkelingByCity, getAllDivingSnorkelingCities } from '../../../lib/diving-snorkeling';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
import CitySupportSources from '../../../components/CitySupportSources';

interface Activity {
  name: string;
  slug: string;
  type: 'diving' | 'snorkeling';
  duration: string;
  groupSize: string;
  includes: string[];
  priceTier?: string;
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
}

function TypeBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; color: string }> = {
    diving: { label: 'Scuba Diving', color: 'bg-blue-100 text-blue-700' },
    snorkeling: { label: 'Snorkeling', color: 'bg-cyan-100 text-cyan-700' },
  };
  const { label, color } = config[type] || config.snorkeling;
  return <span className={`text-xs font-semibold px-2 py-1 rounded ${color}`}>{label}</span>;
}

export default function DivingSnorkelingPage({ city, divingData }: Props) {
  if (!city) return <div>Not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Diving & Snorkeling', href: `/city/${city.slug}/diving-snorkeling/` }
  ];

  const divingActivities = divingData?.classes?.filter(c => c.type === 'diving') || [];
  const snorkelingActivities = divingData?.classes?.filter(c => c.type === 'snorkeling') || [];
  const activityCount = divingData?.classes?.length || 0;
  const hasLocalOptions = activityCount > 0;
  const introText = divingData?.intro?.en || `Diving and snorkeling are not a core local fit in ${city.name.en}, so this page keeps the focus on honest planning context and stronger alternatives.`;
  const editorialPositioning = (city.editorialPositioning || `${city.name.en} is not a core diving or snorkeling base. The stronger sea-based options in Thailand are on the coast and islands.`).trim();
  const recommendedAlternatives = city.recommendedAlternatives && city.recommendedAlternatives.length > 0
    ? city.recommendedAlternatives
    : [
        { label: 'Phuket diving & snorkeling', href: '/city/phuket/diving-snorkeling/', note: 'Biggest marine-tour inventory' },
        { label: 'Krabi diving & snorkeling', href: '/city/krabi/diving-snorkeling/', note: 'Strong island-hopping trips' },
        { label: `Attractions in ${city.name.en}`, href: `/city/${city.slug}/attractions/`, note: 'Better local fit' },
      ];

  const title = `Diving & Snorkeling in ${city.name.en} 2026 — Practical Overview`;
  const description = hasLocalOptions
    ? `Use this overview to compare diving and snorkeling trip types, general price ranges, and seasonal planning notes in ${city.name.en}.`
    : `Diving and snorkeling are limited in ${city.name.en}, so this page explains the local fit honestly and points you toward stronger coastal alternatives.`;

  const faqItems = hasLocalOptions
    ? [
        {
          q: `What type of marine trip is best in ${city.name.en}?`,
          a: `The best option depends on whether you want a longer dive day, a lighter snorkeling trip, or a scenic island-hopping format.`
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
          a: `${city.name.en} is better suited to its strongest local sights, food stops, and place-led planning than to marine tours.`,
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
                      {activity.priceTier && (
                        <span className="text-xs font-semibold text-white bg-slate-600 px-2 py-1 rounded">
                          {activity.priceTier}
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
                    <div className="text-sm text-gray-500">Planning fit</div>
                    <div className="text-lg font-bold text-gray-900">{activity.priceTier || 'General'}</div>
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
                <div className="text-3xl font-bold text-thailand-blue">{new Set((divingData?.classes || []).map(c => c.type)).size}</div>
                <div className="text-sm text-gray-600">Experience Types</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">{new Set((divingData?.classes || []).map(c => c.duration)).size}</div>
                <div className="text-sm text-gray-600">Trip Formats</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">{hasLocalOptions ? 'Strong' : 'Limited'}</div>
                <div className="text-sm text-gray-600">Local Fit</div>
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
                  `If you stay in ${city.name.en}, use the time for the city's strongest local experiences instead.`,
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
              <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
                  Planning Links for {city.name.en}
                </h2>
                <p className="text-gray-700 text-center mb-6">
                  Use the internal guides below to compare the city before deciding whether marine activities belong in your route.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href={`/city/${city.slug}/attractions/`} className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 mb-1">Attractions</h3>
                    <p className="text-sm text-gray-600">Better context for an inland city.</p>
                  </Link>
                  <Link href="/city/phuket/diving-snorkeling/" className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 mb-1">Phuket marine trips</h3>
                    <p className="text-sm text-gray-600">A much stronger water-activity base.</p>
                  </Link>
                  <Link href="/city/krabi/diving-snorkeling/" className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 mb-1">Krabi marine trips</h3>
                    <p className="text-sm text-gray-600">Another strong coastal alternative.</p>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  Better coastal alternatives
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If diving or snorkeling is a priority, {city.name.en} is not the right base.
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

  const locales = ['en', 'nl'];
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
  const rawCity = city as any;

  const divingData = getDivingSnorkelingByCity(slug);
  const sanitizedCity = {
    id: city.id,
    slug: city.slug,
    name: city.name,
    region: city.region,
    province: city.province,
    image: city.image,
    contentSources: rawCity.contentSources || rawCity.content_sources || [],
    reviewed_by: rawCity.reviewed_by ?? null,
    reviewed_at: rawCity.reviewed_at ?? null,
    enhanced_at: rawCity.enhanced_at ?? null,
    editorialPositioning: rawCity.editorialPositioning ?? null,
    sourceSummary: rawCity.sourceSummary ?? null,
    recommendedAlternatives: rawCity.recommendedAlternatives ?? null,
  };

  const sanitizedDivingData = divingData
    ? {
        ...divingData,
        tips: {
          ...divingData.tips,
          en: (divingData.tips?.en || []).filter((tip) => !/GetYourGuide|price|rating|review/i.test(tip)),
          nl: (divingData.tips?.nl || []).filter((tip) => !/GetYourGuide|price|rating|review/i.test(tip)),
        },
        classes: divingData.classes.map(({ priceFrom: _priceFrom, rating, reviews, badge, gygPath, provider, currency, ...activity }) => ({
          ...activity,
          priceTier: typeof _priceFrom === 'number'
            ? (_priceFrom <= 25 ? 'Entry-level' : _priceFrom <= 50 ? 'Mid-range' : 'Premium')
            : undefined,
        })),
      }
    : null;

  return { props: { city: sanitizedCity, divingData: sanitizedDivingData }, revalidate: 604800 };
};
