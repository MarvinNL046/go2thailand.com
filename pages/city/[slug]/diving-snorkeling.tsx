import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCityBySlug, generateBreadcrumbs } from '../../../lib/cities';
import { getDivingSnorkelingByCity, getAllDivingSnorkelingCities } from '../../../lib/diving-snorkeling';
import { formatPrice } from '../../../lib/price';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import AffiliateBox from '../../../components/AffiliateBox';
import CityExploreMore from '../../../components/CityExploreMore';
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
  gygPath: string;
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
}

interface Props {
  city: City;
  divingData: CityData;
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
  if (!city || !divingData) return <div>Not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Diving & Snorkeling', href: `/city/${city.slug}/diving-snorkeling/` }
  ];

  const divingActivities = divingData.classes.filter(c => c.type === 'diving');
  const snorkelingActivities = divingData.classes.filter(c => c.type === 'snorkeling');

  const title = `Diving & Snorkeling in ${city.name.en} 2026 — Practical Overview`;
  const description = `Use this overview to compare diving and snorkeling trip types, general price ranges, and seasonal planning notes in ${city.name.en}.`;

  const faqItems = [
    {
      q: `How much does diving or snorkeling cost in ${city.name.en}?`,
      a: `Diving and snorkeling tours in ${city.name.en} range from ${formatPrice(Math.min(...divingData.classes.map(c => c.priceFrom)), loc)} to ${formatPrice(Math.max(...divingData.classes.map(c => c.priceFrom)), loc)} per person. Snorkeling tours are typically more affordable, while scuba diving experiences cost more due to equipment and instruction.`
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
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">From</div>
                      <div className="text-2xl font-bold text-gray-900">{formatPrice(activity.priceFrom, loc)}</div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                    {affiliates?.getyourguide && (
                      <a
                        href={affiliates.getyourguide}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center px-6 py-2 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors text-sm"
                      >
                        Check current availability
                      </a>
                    )}
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
                {divingData.intro.en.split('.').slice(0, 2).join('.') + '.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">{divingData.classes.length}</div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {formatPrice(Math.min(...divingData.classes.map(c => c.priceFrom)), loc)}
                </div>
                <div className="text-sm text-gray-600">Starting From</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {new Set(divingData.classes.map(c => c.duration)).size}
                </div>
                <div className="text-sm text-gray-600">Trip Formats</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-md">
                <div className="text-3xl font-bold text-thailand-blue">
                  {new Set(divingData.classes.map(c => c.groupSize)).size}
                </div>
                <div className="text-sm text-gray-600">Group Styles</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Diving & Snorkeling in {city.name.en}
              </h2>
              <p className="text-gray-700 leading-relaxed">{divingData.intro.en}</p>
            </div>

            {affiliates && (
              <AffiliateBox affiliates={affiliates} cityName={city.name.en} type="activities" />
            )}

            {/* Activities by type */}
            {divingActivities.length > 0 && snorkelingActivities.length > 0 ? (
              <>
                {renderActivitySection(divingActivities, `Scuba Diving in ${city.name.en}`)}
                {renderActivitySection(snorkelingActivities, `Snorkeling Tours in ${city.name.en}`)}
              </>
            ) : (
              renderActivitySection(divingData.classes, `Top ${divingData.classes.length} Activities in ${city.name.en}`)
            )}

            {/* Tips Section */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                Tips for Diving & Snorkeling in {city.name.en}
              </h2>
              <ul className="space-y-3">
                {divingData.tips.en.map((tip, i) => (
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

            {/* Book Section */}
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
  if (!divingData) return { notFound: true };

  const affiliates = getAffiliates(params.slug as string);

  return { props: { city, divingData, affiliates }, revalidate: 86400 };
};
