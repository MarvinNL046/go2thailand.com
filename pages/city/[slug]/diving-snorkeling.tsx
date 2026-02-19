import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCityBySlug, generateBreadcrumbs } from '../../../lib/cities';
import { getDivingSnorkelingByCity, getAllDivingSnorkelingCities } from '../../../lib/diving-snorkeling';
import { formatPrice } from '../../../lib/price';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';

interface Activity {
  name: string;
  slug: string;
  provider: string;
  type: 'diving' | 'snorkeling';
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
}

const GYG_AFFILIATE = 'https://getyourguide.tpo.lv/6HngJ5FC';
const KLOOK_AFFILIATE = 'https://klook.tpo.lv/7Dt6WApj';

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  );
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
  const { locale } = useRouter();
  const loc = locale || 'en';
  if (!city || !divingData) return <div>Not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Diving & Snorkeling', href: `/city/${city.slug}/diving-snorkeling/` }
  ];

  const divingActivities = divingData.classes.filter(c => c.type === 'diving');
  const snorkelingActivities = divingData.classes.filter(c => c.type === 'snorkeling');

  const title = `Best Diving & Snorkeling in ${city.name.en} (2025) - Tours & Prices`;
  const description = `Discover the ${divingData.classes.length} best diving and snorkeling experiences in ${city.name.en}. Compare prices from ${formatPrice(Math.min(...divingData.classes.map(c => c.priceFrom)), loc)}, read reviews, and book your underwater adventure.`;

  const faqItems = [
    {
      q: `How much does diving or snorkeling cost in ${city.name.en}?`,
      a: `Diving and snorkeling tours in ${city.name.en} range from ${formatPrice(Math.min(...divingData.classes.map(c => c.priceFrom)), loc)} to ${formatPrice(Math.max(...divingData.classes.map(c => c.priceFrom)), loc)} per person. Snorkeling tours are typically more affordable, while scuba diving experiences cost more due to equipment and instruction.`
    },
    {
      q: `Do I need certification to go scuba diving in ${city.name.en}?`,
      a: `No! "Discover scuba" or "try dive" programs are designed for complete beginners with no certification required. Professional instructors guide you through everything. If you want to get certified, multi-day PADI courses are also available.`
    },
    {
      q: `When is the best time for diving and snorkeling in ${city.name.en}?`,
      a: `The best season is November to April, when seas are calm and visibility is excellent (20-30+ meters). Some sites like the Similan Islands are only open November to May. The monsoon season (June-October) has rougher seas and reduced visibility.`
    },
    {
      q: `What should I bring on a diving or snorkeling trip?`,
      a: `Most tours provide all equipment (masks, fins, snorkels, dive gear). Bring sunscreen (reef-safe preferred), a towel, swimwear, a waterproof phone case for photos, and motion sickness medication if needed. Underwater cameras can be rented on many tours.`
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{sectionTitle}</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      {activity.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <StarRating rating={activity.rating} />
                          <span className="font-semibold text-gray-900">{activity.rating}</span>
                          {activity.reviews > 0 && (
                            <span className="text-gray-500">({activity.reviews.toLocaleString()} reviews)</span>
                          )}
                        </span>
                      )}
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
                    <a
                      href={GYG_AFFILIATE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      View on GetYourGuide
                    </a>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <section className="bg-blue-900 text-white">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-4">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Best Diving & Snorkeling in {city.name.en}
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
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-700">{divingData.classes.length}</div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-700">
                  {formatPrice(Math.min(...divingData.classes.map(c => c.priceFrom)), loc)}
                </div>
                <div className="text-sm text-gray-600">Starting From</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-700">
                  {Math.max(...divingData.classes.map(c => c.rating)).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Top Rating</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-700">
                  {divingData.classes.reduce((sum, c) => sum + c.reviews, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Diving & Snorkeling in {city.name.en}
              </h2>
              <p className="text-gray-700 leading-relaxed">{divingData.intro.en}</p>
            </div>

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
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
            <div className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-lg p-8 mb-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Book Your Diving Adventure in {city.name.en}
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Compare prices and find the perfect underwater experience on these trusted platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={GYG_AFFILIATE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Browse on GetYourGuide
                </a>
                <a href={KLOOK_AFFILIATE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/40">
                  Browse on Klook
                </a>
              </div>
              <p className="text-xs text-white/70 mt-4">
                We may earn a commission when you book through our links, at no extra cost to you.
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore More */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Explore More of {city.name.en}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={`/city/${city.slug}/attractions/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Attractions</h4>
                    <p className="text-gray-600 text-sm">Top things to see</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/elephant-sanctuaries/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Elephant Sanctuaries</h4>
                    <p className="text-gray-600 text-sm">Ethical elephant experiences</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Hotels</h4>
                    <p className="text-gray-600 text-sm">Where to stay</p>
                  </div>
                </Link>
              </div>
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

  const locales = ['en', 'nl', 'zh', 'de', 'fr', 'ru', 'ja', 'ko'];
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

  return { props: { city, divingData }, revalidate: 86400 };
};
