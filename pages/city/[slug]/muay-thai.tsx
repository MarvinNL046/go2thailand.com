import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import { getMuayThaiByCity, getAllMuayThaiCities } from '../../../lib/muay-thai';
import { formatPrice } from '../../../lib/price';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
import AffiliateBox from '../../../components/AffiliateBox';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';

interface MuayThaiActivity {
  name: string;
  slug: string;
  provider: string;
  type: 'watch' | 'train' | 'combo';
  rating: number;
  reviews: number;
  priceFrom: number;
  currency: string;
  duration: string;
  groupSize: string;
  includes: string[];
  badge: string;
  gygPath: string;
}

interface TrainingGym {
  name: string;
  slug: string;
  location: { en: string; nl: string };
  score: number;
  maxScore: number;
  scores: {
    facilities: number;
    cleanliness: number;
    classStructure: number;
    coachingQuality: number;
  };
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
}

interface Props {
  city: City;
  muayThaiData: CityData;
  affiliates: CityAffiliates | null;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
      {hasHalf && (
        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )}
    </span>
  );
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

export default function MuayThaiPage({ city, muayThaiData, affiliates }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  if (!city || !muayThaiData) return <div>Not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Muay Thai', href: `/city/${city.slug}/muay-thai/` }
  ];

  const watchActivities = muayThaiData.classes.filter(c => c.type === 'watch');
  const trainActivities = muayThaiData.classes.filter(c => c.type === 'train');
  const comboActivities = muayThaiData.classes.filter(c => c.type === 'combo');

  const title = `Muay Thai in ${city.name.en} 2026 — Fights, Training & Camps`;
  const description = `Muay Thai in ${city.name.en}: live fights from ${formatPrice(Math.min(...muayThaiData.classes.map(c => c.priceFrom)), loc)}, training gyms, and camps. ${muayThaiData.classes.length} activities compared with 2026 prices.`;

  const faqItems = [
    {
      q: `Where can I watch Muay Thai fights in ${city.name.en}?`,
      a: `${city.name.en} has ${watchActivities.length} venues for watching live Muay Thai fights. Tickets start from ${formatPrice(Math.min(...watchActivities.map(c => c.priceFrom)), loc)} for standard seats, with VIP and ringside options available.`
    },
    {
      q: `Can beginners try Muay Thai training in ${city.name.en}?`,
      a: `Yes! All training gyms in ${city.name.en} welcome beginners. Sessions typically last 1-2 hours, and all equipment (gloves, pads, wraps) is provided. Instructors guide you through basic techniques step by step.`
    },
    {
      q: `How much does a Muay Thai experience cost in ${city.name.en}?`,
      a: `Prices range from ${formatPrice(Math.min(...muayThaiData.classes.map(c => c.priceFrom)), loc)} to ${formatPrice(Math.max(...muayThaiData.classes.map(c => c.priceFrom)), loc)}. Fight tickets are the most affordable option, while private training sessions and combo packages cost more.`
    },
    {
      q: `What should I wear to a Muay Thai fight or training session?`,
      a: `For watching fights, casual clothes are fine. For training, wear comfortable sportswear (shorts and a t-shirt). Most gyms provide gloves and equipment, but bring your own water bottle and towel.`
    }
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
                {muayThaiData.intro.en.split('.').slice(0, 2).join('.') + '.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-red">{muayThaiData.classes.length}</div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-red">
                  {formatPrice(Math.min(...muayThaiData.classes.map(c => c.priceFrom)), loc)}
                </div>
                <div className="text-sm text-gray-600">Starting From</div>
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
              <p className="text-gray-700 leading-relaxed">{muayThaiData.intro.en}</p>
            </div>

            {/* Watch Fights Section */}
            {watchActivities.length > 0 && (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                  Watch Live Muay Thai Fights
                </h2>
                <div className="space-y-6 mb-12">
                  {watchActivities.map((cls, index) => (
                    <div key={cls.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                                #{index + 1}
                              </span>
                              <TypeBadge type={cls.type} />
                              {cls.badge && (
                                <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded">
                                  {cls.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{cls.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              {cls.rating > 0 && (
                                <span className="flex items-center gap-1">
                                  <StarRating rating={cls.rating} />
                                  <span className="font-semibold text-gray-900">{cls.rating}</span>
                                  {cls.reviews > 0 && (
                                    <span className="text-gray-500">({cls.reviews.toLocaleString()} reviews)</span>
                                  )}
                                </span>
                              )}
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
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <div className="text-sm text-gray-500">From</div>
                              <div className="text-2xl font-bold text-gray-900">{formatPrice(cls.priceFrom, loc)}</div>
                              <div className="text-xs text-gray-500">per person</div>
                            </div>
                            {affiliates?.getyourguide && (
                              <a
                                href={affiliates.getyourguide}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="inline-flex items-center px-6 py-2 bg-thailand-red text-white font-semibold rounded-xl hover:bg-thailand-red-600 transition-colors text-sm"
                              >
                                View on GetYourGuide
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Training Section */}
            {trainActivities.length > 0 && (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                  Muay Thai Training Classes
                </h2>
                <div className="space-y-6 mb-12">
                  {trainActivities.map((cls, index) => (
                    <div key={cls.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                #{index + 1}
                              </span>
                              <TypeBadge type={cls.type} />
                              {cls.badge && (
                                <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded">
                                  {cls.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{cls.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              {cls.rating > 0 && (
                                <span className="flex items-center gap-1">
                                  <StarRating rating={cls.rating} />
                                  <span className="font-semibold text-gray-900">{cls.rating}</span>
                                  {cls.reviews > 0 && (
                                    <span className="text-gray-500">({cls.reviews.toLocaleString()} reviews)</span>
                                  )}
                                </span>
                              )}
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
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <div className="text-sm text-gray-500">From</div>
                              <div className="text-2xl font-bold text-gray-900">{formatPrice(cls.priceFrom, loc)}</div>
                              <div className="text-xs text-gray-500">per person</div>
                            </div>
                            {affiliates?.getyourguide && (
                              <a
                                href={affiliates.getyourguide}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="inline-flex items-center px-6 py-2 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors text-sm"
                              >
                                View on GetYourGuide
                              </a>
                            )}
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
                              {cls.badge && (
                                <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded">
                                  {cls.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{cls.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              {cls.rating > 0 && (
                                <span className="flex items-center gap-1">
                                  <StarRating rating={cls.rating} />
                                  <span className="font-semibold text-gray-900">{cls.rating}</span>
                                  {cls.reviews > 0 && (
                                    <span className="text-gray-500">({cls.reviews.toLocaleString()} reviews)</span>
                                  )}
                                </span>
                              )}
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
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <div className="text-sm text-gray-500">From</div>
                              <div className="text-2xl font-bold text-gray-900">{formatPrice(cls.priceFrom, loc)}</div>
                              <div className="text-xs text-gray-500">per person</div>
                            </div>
                            {affiliates?.getyourguide && (
                              <a
                                href={affiliates.getyourguide}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="inline-flex items-center px-6 py-2 bg-thailand-red text-white font-semibold rounded-xl hover:bg-thailand-red-600 transition-colors text-sm"
                              >
                                View on GetYourGuide
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Training Gyms Section */}
            {muayThaiData.trainingGyms && muayThaiData.trainingGyms.length > 0 && (
              <>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                  Top Training Gyms in {city.name.en}
                </h2>
                <p className="text-gray-600 mb-6">
                  Looking for a serious training camp? These gyms in {city.name.en} are summarized with facility, cleanliness, class structure, and coaching scores from our current city dataset (max 20 points).
                </p>
                <div className="space-y-6 mb-12">
                  {muayThaiData.trainingGyms.map((gym, index) => (
                    <div key={gym.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-l-4 border-yellow-400">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                                #{index + 1}
                              </span>
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
                            <div className="grid grid-cols-4 gap-2 text-center">
                              <div className="bg-gray-50 rounded p-2">
                                <div className="text-sm font-bold text-gray-900">{gym.scores.facilities}/5</div>
                                <div className="text-[10px] text-gray-500">Facilities</div>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="text-sm font-bold text-gray-900">{gym.scores.cleanliness}/5</div>
                                <div className="text-[10px] text-gray-500">Clean</div>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="text-sm font-bold text-gray-900">{gym.scores.classStructure}/5</div>
                                <div className="text-[10px] text-gray-500">Structure</div>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="text-sm font-bold text-gray-900">{gym.scores.coachingQuality}/5</div>
                                <div className="text-[10px] text-gray-500">Coaching</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-1 min-w-[80px]">
                            <div className="text-3xl font-bold text-yellow-600">{gym.score}</div>
                            <div className="text-sm text-gray-500">/ {gym.maxScore}</div>
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
                {muayThaiData.tips.en.map((tip, i) => (
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

            {/* Book Section */}
            {affiliates && (
              <div className="mb-12">
                <AffiliateBox affiliates={affiliates} cityName={city.name.en} type="activities" />
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

  const muayThaiData = getMuayThaiByCity(slug);
  if (!muayThaiData) return { notFound: true };

  const affiliates = getAffiliates(slug);

  return { props: { city, muayThaiData, affiliates }, revalidate: 86400 };
};
