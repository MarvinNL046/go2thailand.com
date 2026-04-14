import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import { getCookingClassesByCity, getAllCookingClassCities } from '../../../lib/cooking-classes';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
import CitySupportSources from '../../../components/CitySupportSources';
import { useT } from '../../../lib/i18n';
import { strings as i18nStrings } from '../../../lib/i18n/city-slug-cooking-classes';

interface CookingClass {
  name: string;
  slug: string;
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
  classes: CookingClass[];
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
  cookingData: CityData | null;
}

export default function CookingClassesPage({ city, cookingData }: Props) {
  const t = useT(i18nStrings);
  if (!city) return <div>{t("s001_not_found")}</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Cooking Classes', href: `/city/${city.slug}/cooking-classes/` }
  ];

  const cookingClasses = cookingData?.classes || [];
  const hasLocalOptions = cookingClasses.length > 0;
  const introText = cookingData?.intro?.en || `Cooking classes are limited in ${city.name.en}, so this page focuses on honest planning context rather than pretending there is a deep local class market.`;
  const editorialPositioning = (city.editorialPositioning || `${city.name.en} is not a core cooking-class destination; the stronger draw here is city-specific sightseeing, food, and place-led planning.`).trim();
  const recommendedAlternatives = city.recommendedAlternatives && city.recommendedAlternatives.length > 0
    ? city.recommendedAlternatives
    : [
        { label: 'Bangkok cooking classes', href: '/city/bangkok/cooking-classes/', note: 'Much deeper class inventory' },
        { label: 'Chiang Mai cooking classes', href: '/city/chiang-mai/cooking-classes/', note: 'Thailand’s strongest cooking-class market' },
        { label: 'Phuket cooking classes', href: '/city/phuket/cooking-classes/', note: 'More tour-driven options' },
      ];

  const title = `Cooking Classes in ${city.name.en} 2026 — Practical Overview`;
  const description = hasLocalOptions
    ? `Use this overview to compare cooking class formats, typical pricing, and what to expect in ${city.name.en}.`
    : `Cooking classes are limited in ${city.name.en}, so this page explains the local fit honestly and points you toward stronger nearby options.`;

  const faqItems = hasLocalOptions
    ? [
        {
          q: `What kind of cooking classes does ${city.name.en} have?`,
          a: `Bangkok has a broad mix of market-led classes, polished cooking schools, and beginner-friendly group formats, so it is one of Thailand's strongest places to compare styles rather than chase a single price point.`
        },
        {
          q: `How long is a typical cooking class in ${city.name.en}?`,
          a: `Most cooking classes in ${city.name.en} last between 3 to 5 hours. Half-day classes are the most popular option, usually including a market visit and cooking 4-6 dishes.`
        },
        {
          q: `Do I need cooking experience to join a class in ${city.name.en}?`,
          a: `Many cooking classes in ${city.name.en} are designed to work for first-time participants. Formats and pace vary, so it is worth checking the class description if you want a slower introduction or specific dietary support.`
        },
        {
          q: `What dishes will I learn to cook?`,
          a: `Most classes teach classic Thai dishes like Pad Thai, Green Curry, Tom Yum soup, Spring Rolls, and Mango Sticky Rice. Some classes specialize in regional dishes or street food.`
        }
      ]
    : [
        {
          q: `Is ${city.name.en} a strong cooking-class destination?`,
          a: editorialPositioning,
        },
        {
          q: `What should I do instead in ${city.name.en}?`,
          a: `${city.name.en} is stronger for city-specific sightseeing, food stops, and place-led planning than for hands-on cooking-class tours.`,
        },
        {
          q: `Where are the better cooking-class markets in Thailand?`,
          a: `Bangkok and Chiang Mai generally have the deepest cooking-class inventories, while Phuket and Krabi tend to have more tour-oriented options.`,
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

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to Choose a Thai Cooking Class in ${city.name.en}`,
    'description': `Step-by-step guide to comparing cooking class formats in ${city.name.en}, Thailand, including typical pricing and class structure.`,
    'totalTime': 'PT10M',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Compare available classes',
        'text': hasLocalOptions
          ? `Review the ${cookingClasses.length} cooking classes available in ${city.name.en}. Compare format, duration, and what is included such as market tours and recipe booklets.`
          : `There are no strong local cooking-class listings in ${city.name.en}, so treat this page as a fit check rather than a booking list.`,
        'position': 1
      },
      {
        '@type': 'HowToStep',
        'name': 'Compare format and fit',
        'text': hasLocalOptions
          ? `Use the class description, lesson style, and market or kitchen setup to decide what fits your trip best.`
          : `With no meaningful local inventory, compare the idea of a class against stronger destinations instead of forcing a booking decision here.`,
        'position': 2
      },
      {
        '@type': 'HowToStep',
        'name': 'Choose your preferred class type',
        'text': 'Decide between half-day and full-day classes. Most classes last 3-5 hours and teach you to cook 4-6 dishes. Some include market visits and organic farm tours.',
        'position': 3
      },
      {
        '@type': 'HowToStep',
        'name': 'Confirm availability',
        'text': 'Use the planning links on this page if you want to check current availability. Popular classes can fill up a few days ahead, and peak-season dates may need more lead time.',
        'position': 4
      },
      {
        '@type': 'HowToStep',
        'name': 'Prepare for your class',
        'text': 'Mention any dietary requirements when booking. Wear comfortable clothes. Ingredients and equipment are often included, but it is worth confirming the setup and any extras before you go.',
        'position': 5
      }
    ]
  };

  return (
    <>
      <SEOHead title={title} description={description}>
        <meta name="robots" content="noindex, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                Best Cooking Classes in {city.name.en}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <div className="text-3xl font-bold text-thailand-blue">{cookingClasses.length}</div>
                <div className="text-sm text-gray-600">{t("s002_classes_available")}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">{new Set(cookingClasses.map(c => c.duration)).size}</div>
                <div className="text-sm text-gray-600">{t("s003_duration_formats")}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">{new Set(cookingClasses.map(c => c.groupSize)).size}</div>
                <div className="text-sm text-gray-600">{t("s004_group_styles")}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">{hasLocalOptions ? 'Strong' : 'Limited'}</div>
                <div className="text-sm text-gray-600">{t("s005_local_fit")}</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Thai Cooking Classes in {city.name.en}
              </h2>
              <p className="text-gray-700 leading-relaxed">{introText}</p>
              {!hasLocalOptions && (
                <div className="mt-6 rounded-2xl bg-amber-50 p-5 text-amber-900">
                  <h3 className="text-lg font-bold font-heading mb-2">{t("s006_limited_local_fit")}</h3>
                  <p className="text-sm leading-6">{editorialPositioning}</p>
                </div>
              )}
            </div>

            {hasLocalOptions ? (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
                  Top {cookingClasses.length} Cooking Classes in {city.name.en}
                </h2>

                <div className="space-y-6 mb-12">
                  {cookingClasses.map((cls, index) => (
                    <div key={cls.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-bold text-thailand-blue bg-blue-50 px-2 py-1 rounded">
                                #{index + 1}
                              </span>
                              {cls.priceTier && (
                                <span className="text-xs font-semibold text-white bg-slate-600 px-2 py-1 rounded">
                                  {cls.priceTier}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{cls.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span>{cls.duration}</span>
                              <span className="capitalize">{cls.groupSize}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                            {cls.includes.map((item, i) => (
                              <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">{t("s007_planning_fit")}</div>
                            <div className="text-lg font-bold text-gray-900">{cls.priceTier || 'General'}</div>
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
                  Cooking classes are limited in {city.name.en}
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
                Tips for Cooking Classes in {city.name.en}
              </h2>
              <ul className="space-y-3">
                {(cookingData?.tips?.en?.length ? cookingData.tips.en : [
                  `Use this page as a fit check, not a booking list, if ${city.name.en} is only one stop in a broader Thailand trip.`,
                  'Prioritize temple clusters and river dining first; add a cooking class only if the city has a clearly reviewed option.',
                  'If you want a stronger class inventory, compare Bangkok or Chiang Mai instead.',
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
              <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  Planning Links
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Use the internal guides below if you want to compare Bangkok trip components before you decide whether a cooking class belongs in your itinerary.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href={`/city/${city.slug}/food/`} className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 mb-1">{t("s008_food_dining")}</h3>
                    <p className="text-sm text-gray-600">{t("s009_pair_a_class_with")}</p>
                  </Link>
                  <Link href={`/city/${city.slug}/hotels/`} className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 mb-1">Hotels</h3>
                    <p className="text-sm text-gray-600">{t("s010_choose_a_base_that")}</p>
                  </Link>
                  <Link href={`/city/${city.slug}/attractions/`} className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 mb-1">Attractions</h3>
                    <p className="text-sm text-gray-600">{t("s011_round_out_the_day")}</p>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  Better planning alternatives
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If cooking classes are a priority in your trip planning, use {city.name.en} for its strongest local draw and compare deeper class markets elsewhere.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href={`/city/${city.slug}/food/`} className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 mb-1">Food & Dining in {city.name.en}</h3>
                    <p className="text-sm text-gray-600">{t("s012_stronger_local_fit_than")}</p>
                  </Link>
                  <Link href={`/city/${city.slug}/attractions/`} className="rounded-2xl border border-gray-100 bg-surface-cream p-4 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 mb-1">Attractions in {city.name.en}</h3>
                    <p className="text-sm text-gray-600">{t("s013_heritage_planning_with_the")}</p>
                  </Link>
                </div>
              </div>
            )}

            {/* Dishes You'll Learn to Cook */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Dishes You&apos;ll Learn to Cook in {city.name.en}
              </h2>
              <p className="text-gray-700 mb-6">
                Cooking classes in {city.name.en} typically teach these classic Thai dishes. Learn about each one:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { slug: 'pad-thai', name: 'Pad Thai' },
                  { slug: 'green-curry', name: 'Green Curry' },
                  { slug: 'tom-yum-goong', name: 'Tom Yum Goong' },
                  { slug: 'pad-krapow', name: 'Pad Krapow' },
                  { slug: 'som-tam', name: 'Som Tam' },
                  { slug: 'massaman-curry', name: 'Massaman Curry' },
                  { slug: 'pad-see-ew', name: 'Pad See Ew' },
                  { slug: 'thai-fried-rice', name: 'Thai Fried Rice' },
                ].map((dish) => (
                  <Link
                    key={dish.slug}
                    href={`/food/${dish.slug}/`}
                    className="flex items-center gap-2 p-3 bg-surface-cream rounded-xl hover:bg-orange-50 hover:shadow-sm transition-all text-sm font-medium text-gray-800"
                  >
                    <svg className="w-4 h-4 text-thailand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {dish.name}
                  </Link>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Explore our <Link href="/food/" className="text-thailand-blue hover:underline">complete Thai food guide</Link> to discover all dishes,
                or pair your meal with <Link href="/drinks/" className="text-thailand-blue hover:underline">traditional Thai drinks</Link>.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <Link href="/best-cooking-classes-in-thailand/" className="text-thailand-blue hover:underline font-medium">
                  Compare cooking classes across all 5 cities →
                </Link>
              </p>
            </div>

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
                    <p className="text-gray-600 text-sm">{t("s014_top_things_to_see")}</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/food/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-semibold text-gray-900">{t("s008_food_dining")}</h4>
                    <p className="text-gray-600 text-sm">{t("s016_local_cuisine_guide")}</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-semibold text-gray-900">Hotels</h4>
                    <p className="text-gray-600 text-sm">{t("s017_where_to_stay")}</p>
                  </div>
                </Link>
              </div>
            <CityExploreMore citySlug={city.slug} cityName={city.name.en} currentPage="cooking-classes" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citySlugs = getAllCookingClassCities();
  const paths: { params: { slug: string }; locale?: string }[] = [];

  const locales = ['en', 'nl'];
  citySlugs.forEach(slug => {
    // Only generate for cities that exist in the cities index (not islands like koh-samui)
    const city = getCityBySlug(slug);
    if (!city) return;
    locales.forEach(locale => {
      paths.push({ params: { slug }, locale });
    });
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug, locale);
  if (!city) return { notFound: true };
  const rawCity = city as any;

  const cookingData = getCookingClassesByCity(slug);
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

  const sanitizedCookingData = cookingData
    ? {
        ...cookingData,
        tips: {
          ...cookingData.tips,
          en: (cookingData.tips?.en || []).filter((tip) => !/GetYourGuide|price|rating|review/i.test(tip)),
          nl: (cookingData.tips?.nl || []).filter((tip) => !/GetYourGuide|price|rating|review/i.test(tip)),
        },
        classes: cookingData.classes.map(({ priceFrom, rating, reviews, badge, gygPath, provider, currency, ...cls }) => ({
          ...cls,
          priceTier: typeof priceFrom === 'number'
            ? (priceFrom <= 30 ? 'Entry-level' : priceFrom <= 60 ? 'Mid-range' : 'Premium')
            : undefined,
        })),
      }
    : null;

  return { props: { city: sanitizedCity, cookingData: sanitizedCookingData }, revalidate: 604800 };
};
