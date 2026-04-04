import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import { getMuayThaiByCity, getAllMuayThaiCities } from '../../../lib/muay-thai';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
import CitySupportSources from '../../../components/CitySupportSources';

interface MuayThaiActivity {
  name: string;
  slug: string;
  type: 'watch' | 'train' | 'combo';
  duration: string;
  groupSize: string;
  includes: string[];
  priceTier?: string;
}

interface TrainingGym {
  name: string;
  slug: string;
  location: { en: string; nl: string };
  highlight: { en: string; nl: string };
  features: string[];
  dtvVisa: boolean;
}

interface CityData {
  city: string;
  cityName: { en: string; nl: string };
  intro: { en: string; nl: string };
  tips: { en: string[]; nl: string[] };
  classes: MuayThaiActivity[];
  trainingGyms?: TrainingGym[];
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
  muayThaiData: CityData | null;
}

function TypeBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; color: string }> = {
    watch: { label: 'Watch Fights', color: 'bg-red-100 text-red-700' },
    train: { label: 'Training', color: 'bg-blue-100 text-blue-700' },
    combo: { label: 'Train + Watch', color: 'bg-purple-100 text-purple-700' },
  };
  const { label, color } = config[type] || config.watch;
  return <span className={`text-xs font-semibold px-2 py-1 rounded ${color}`}>{label}</span>;
}

export default function MuayThaiPage({ city, muayThaiData }: Props) {
  if (!city) return <div>Not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Muay Thai', href: `/city/${city.slug}/muay-thai/` }
  ];

  const muayThaiActivities = muayThaiData?.classes || [];
  const hasLocalOptions = muayThaiActivities.length > 0;
  const watchActivities = muayThaiActivities.filter(c => c.type === 'watch');
  const trainActivities = muayThaiActivities.filter(c => c.type === 'train');
  const comboActivities = muayThaiActivities.filter(c => c.type === 'combo');
  const introText = muayThaiData?.intro?.en || `Muay Thai is not a core local draw in ${city.name.en}, so this route focuses on fit, context, and better alternatives rather than pretending the city has a deep fight scene.`;
  const editorialPositioning = (city.editorialPositioning || `${city.name.en} is not a core Muay Thai destination; Bangkok, Chiang Mai, and Phuket usually offer much stronger fight-night and training inventories.`).trim();
  const recommendedAlternatives = city.recommendedAlternatives && city.recommendedAlternatives.length > 0
    ? city.recommendedAlternatives
    : [
        { label: 'Bangkok Muay Thai', href: '/city/bangkok/muay-thai/', note: 'Largest city fight scene' },
        { label: 'Chiang Mai Muay Thai', href: '/city/chiang-mai/muay-thai/', note: 'Good mix of gyms and stadiums' },
        { label: 'Phuket Muay Thai', href: '/city/phuket/muay-thai/', note: 'Tourist-friendly training hub' },
      ];

  const title = `Muay Thai in ${city.name.en} 2026 — Fights, Gyms & Practical Notes`;
  const description = hasLocalOptions
    ? `Use this overview to compare Muay Thai fight nights, training options, and general price ranges in ${city.name.en}.`
    : `Muay Thai is a limited local fit in ${city.name.en}, so this overview points you toward stronger alternatives and avoids fake local listings.`;

  const faqItems = hasLocalOptions
    ? [
        {
          q: `Where can I watch Muay Thai fights in ${city.name.en}?`,
          a: `${city.name.en} has a strong mix of fight-night options and training venues, with enough variety to compare venue style, atmosphere, and schedule rather than chase one exact price point.`
        },
        {
          q: `Can beginners try Muay Thai training in ${city.name.en}?`,
          a: `Many Muay Thai sessions in ${city.name.en} can work for beginners, but the pace and coaching style vary by gym. Introductory classes usually cover basic technique, and equipment is often available to borrow or rent, though you should confirm that with the venue first.`
        },
        {
          q: `How much does a Muay Thai experience cost in ${city.name.en}?`,
          a: `Cost varies by venue, session type, and whether you want watching, training, or a combination of both. The better question is which experience fits your trip rhythm and comfort level.`
        },
        {
          q: `What should I wear to a Muay Thai fight or training session?`,
          a: `For watching fights, casual clothes are fine. For training, wear comfortable sportswear such as shorts and a t-shirt. Some gyms provide gloves or pads, while others expect you to bring or rent gear, so confirm the setup in advance and bring your own water bottle and towel.`
        }
      ]
    : [
        {
          q: `Is ${city.name.en} a strong Muay Thai base?`,
          a: editorialPositioning,
        },
        {
          q: `Where should I go instead for Muay Thai?`,
          a: `Bangkok, Chiang Mai, and Phuket generally have much stronger fight-night and training inventories.`,
        },
        {
          q: `What should I do in ${city.name.en} instead?`,
          a: `Use ${city.name.en} for its strongest local draw rather than forcing a combat-sport itinerary where the city is only a limited fit.`,
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
                Muay Thai in {city.name.en}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                <div className="text-3xl font-bold text-thailand-red">{muayThaiActivities.length}</div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-red">{new Set(muayThaiActivities.map(c => c.type)).size}</div>
                <div className="text-sm text-gray-600">Experience Types</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-red">{watchActivities.length}</div>
                <div className="text-sm text-gray-600">Fight Venues</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-red">{trainActivities.length}</div>
                <div className="text-sm text-gray-600">Training Gyms</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Muay Thai Experience in {city.name.en}
              </h2>
              <p className="text-gray-700 leading-relaxed">{introText}</p>
              {!hasLocalOptions && (
                <div className="mt-6 rounded-2xl bg-amber-50 p-5 text-amber-900">
                  <h3 className="text-lg font-bold font-heading mb-2">Limited local fit</h3>
                  <p className="text-sm leading-6">{editorialPositioning}</p>
                </div>
              )}
            </div>

            {/* Watch Fights Section */}
            {watchActivities.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                  Watch Live Muay Thai Fights
                </h2>
                <div className="space-y-6 mb-12">
                  {watchActivities.map((cls) => (
                    <div key={cls.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <TypeBadge type={cls.type} />
                              {cls.priceTier && (
                                <span className="text-xs font-semibold text-white bg-slate-600 px-2 py-1 rounded">
                                  {cls.priceTier}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{cls.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span>{cls.duration}</span>
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
                            <div className="text-sm text-gray-500">Planning fit</div>
                            <div className="text-lg font-bold text-gray-900">{cls.priceTier || 'General'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : hasLocalOptions ? null : (
              <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  No dedicated fight-night listings
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {editorialPositioning}
                </p>
              </div>
            )}

            {/* Training Section */}
            {trainActivities.length > 0 && (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                  Muay Thai Training Classes
                </h2>
                <div className="space-y-6 mb-12">
                  {trainActivities.map((cls) => (
                    <div key={cls.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <TypeBadge type={cls.type} />
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
                            <div className="text-sm text-gray-500">Planning fit</div>
                            <div className="text-lg font-bold text-gray-900">{cls.priceTier || 'General'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Combo Section */}
            {comboActivities.length > 0 && (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                  Combined Experiences
                </h2>
                <div className="space-y-6 mb-12">
                  {comboActivities.map((cls, index) => (
                    <div key={cls.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-0">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <TypeBadge type={cls.type} />
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
                            <div className="text-sm text-gray-500">Planning fit</div>
                            <div className="text-lg font-bold text-gray-900">{cls.priceTier || 'General'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Training Gyms Section */}
            {muayThaiData?.trainingGyms && muayThaiData.trainingGyms.length > 0 && (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                  Top Training Gyms in {city.name.en}
                </h2>
                <p className="text-gray-600 mb-6">
                  Looking for a serious training camp? These gyms in {city.name.en} are summarized with location notes, standout features, and short editorial highlights from our current city dataset.
                </p>
                <div className="space-y-6 mb-12">
                  {muayThaiData.trainingGyms.map((gym) => (
                    <div key={gym.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-l-4 border-yellow-400">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs font-semibold text-gray-500">{gym.location.en}</span>
                              {gym.dtvVisa && (
                                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                                  DTV Visa
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{gym.name}</h3>
                            <p className="text-gray-700 text-sm mb-3">{gym.highlight.en}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {gym.features.map((feature, i) => (
                                <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Tips Section */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                Tips for Muay Thai in {city.name.en}
              </h2>
              <ul className="space-y-3">
                {(muayThaiData?.tips?.en?.length ? muayThaiData.tips.en : [
                  'Use Muay Thai pages as a fit check, not a booking list, when the city is not a core combat-sport base.',
                  'Bangkok, Chiang Mai, and Phuket are usually much better starting points for fights or training.',
                  `In ${city.name.en}, a place-led plan will usually deliver more value than chasing fight listings when Muay Thai is only a secondary fit.`,
                ]).map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

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
                    <p className="text-gray-600 text-sm">Learn Thai cuisine</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-semibold text-gray-900">Hotels</h4>
                    <p className="text-gray-600 text-sm">Where to stay</p>
                  </div>
                </Link>
              </div>
              {!hasLocalOptions && (
                <div className="mt-8 rounded-2xl border border-gray-100 bg-surface-cream p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">Better Muay Thai alternatives</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {recommendedAlternatives.map((item) => (
                      <Link key={item.href} href={item.href} className="rounded-xl bg-white p-4 hover:shadow-md transition-all duration-300">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.note || 'A stronger fit.'}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            <CityExploreMore citySlug={city.slug} cityName={city.name.en} currentPage="muay-thai" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citySlugs = getAllMuayThaiCities();
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

  const muayThaiData = getMuayThaiByCity(slug);
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

  const sanitizedMuayThaiData = muayThaiData
    ? {
        ...muayThaiData,
        tips: {
          ...muayThaiData.tips,
          en: (muayThaiData.tips?.en || []).filter((tip) => !/GetYourGuide|price|rating|review/i.test(tip)),
          nl: (muayThaiData.tips?.nl || []).filter((tip) => !/GetYourGuide|price|rating|review/i.test(tip)),
        },
        classes: muayThaiData.classes.map(({ priceFrom, rating, reviews, badge, gygPath, provider, currency, ...activity }) => ({
          ...activity,
          priceTier: typeof priceFrom === 'number'
            ? (priceFrom <= 20 ? 'Entry-level' : priceFrom <= 40 ? 'Mid-range' : 'Premium')
            : undefined,
        })),
      }
    : null;

  return { props: { city: sanitizedCity, muayThaiData: sanitizedMuayThaiData }, revalidate: 604800 };
};
