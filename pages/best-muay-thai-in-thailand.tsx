import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getMuayThaiIndex, getMuayThaiByCity } from '../lib/muay-thai';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface MuayThaiActivity {
  name: string;
  slug: string;
  type: 'watch' | 'train' | 'combo';
  rating: number;
  reviews: number;
  priceFrom: number;
  currency: string;
  duration: string;
  groupSize: string;
  badge: string;
}

interface CityEntry {
  slug: string;
  name: { en: string; nl: string };
  classCount: number;
  priceRange: { from: number; to: number; currency: string };
  topRating: number;
  highlight: { en: string; nl: string };
}

interface CityClasses {
  city: string;
  cityName: { en: string; nl: string };
  intro: { en: string; nl: string };
  classes: MuayThaiActivity[];
}

interface Props {
  cities: CityEntry[];
  topActivities: { cityName: string; citySlug: string; cls: MuayThaiActivity }[];
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
    watch: { label: 'Fights', color: 'bg-red-100 text-red-700' },
    train: { label: 'Training', color: 'bg-blue-100 text-blue-700' },
    combo: { label: 'Combo', color: 'bg-purple-100 text-purple-700' },
  };
  const { label, color } = config[type] || config.watch;
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded ${color}`}>{label}</span>;
}

export default function BestMuayThaiPage({ cities, topActivities }: Props) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Muay Thai in Thailand', href: '/best-muay-thai-in-thailand/' }
  ];

  const title = 'Best Muay Thai in Thailand (2025) - Fights, Training & Camps Compared';
  const description = 'Compare the best Muay Thai experiences across Bangkok, Chiang Mai, and Phuket. Watch live fights, train at professional gyms, and find your perfect Muay Thai adventure.';

  const faqItems = [
    {
      q: 'Where is the best place to watch Muay Thai in Thailand?',
      a: 'Bangkok is the ultimate destination for watching Muay Thai, home to the legendary Rajadamnern Stadium (since 1945) with 10,000+ reviews. Phuket\'s Patong Boxing Stadium is a close second with 2,000+ reviews and a vibrant atmosphere.'
    },
    {
      q: 'Can tourists train Muay Thai in Thailand?',
      a: 'Absolutely! All major cities offer beginner-friendly training sessions at professional gyms. Sessions typically cost EUR13-48 per class, last 1-2 hours, and all equipment is provided. No experience needed.'
    },
    {
      q: 'How much do Muay Thai fight tickets cost?',
      a: 'Fight tickets range from EUR16 in Chiang Mai to EUR56+ for VIP seats in Phuket. Bangkok\'s Rajadamnern Stadium offers tickets from EUR27. Ringside and VIP upgrades provide the best experience.'
    },
    {
      q: 'What is the difference between watching and training?',
      a: 'Watching means attending a live Muay Thai fight night with professional bouts — perfect for spectators. Training means you participate in a hands-on session at a gym, learning techniques from coaches. Some combo packages offer both.'
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gray-900 text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Best Muay Thai in Thailand
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                From Bangkok&apos;s legendary Rajadamnern Stadium to Phuket&apos;s world-class training camps — compare fights, training, and combo experiences across Thailand&apos;s top destinations.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <h2 className="text-2xl font-bold text-gray-900 p-6 pb-0">
                City Comparison at a Glance
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">City</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Activities</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price Range</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Best For</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <Link href={`/city/${city.slug}/muay-thai/`} className="font-semibold text-red-600 hover:underline">
                            {city.name.en}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{city.classCount}+</td>
                        <td className="px-6 py-4 text-gray-700">
                          {city.priceRange.currency}{city.priceRange.from} - {city.priceRange.currency}{city.priceRange.to}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{city.highlight.en.split('.')[0]}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/city/${city.slug}/muay-thai/`}
                            className="text-sm font-semibold text-red-500 hover:text-red-600"
                          >
                            View all &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* City Sections */}
            {cities.map((city, index) => (
              <div key={city.slug} className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-white bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <Link href={`/city/${city.slug}/muay-thai/`} className="hover:text-red-600">
                      Muay Thai in {city.name.en}
                    </Link>
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">{city.highlight.en}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.classCount}+</div>
                    <div className="text-xs text-gray-600">Activities</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      EUR{city.priceRange.from}+
                    </div>
                    <div className="text-xs text-gray-600">Starting Price</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.topRating}</div>
                    <div className="text-xs text-gray-600">Top Rating</div>
                  </div>
                </div>

                {/* Top 3 activities for this city */}
                <div className="space-y-3 mb-6">
                  {topActivities
                    .filter(tc => tc.citySlug === city.slug)
                    .slice(0, 3)
                    .map((tc, i) => (
                      <div key={tc.cls.slug} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                          <div>
                            <div className="font-medium text-gray-900 text-sm flex items-center gap-2">
                              {tc.cls.name}
                              <TypeBadge type={tc.cls.type} />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              {tc.cls.rating > 0 && (
                                <>
                                  <StarRating rating={tc.cls.rating} />
                                  <span>{tc.cls.rating}</span>
                                  {tc.cls.reviews > 0 && <span>({tc.cls.reviews.toLocaleString()})</span>}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{tc.cls.currency}{tc.cls.priceFrom}</div>
                        </div>
                      </div>
                    ))}
                </div>

                <Link
                  href={`/city/${city.slug}/muay-thai/`}
                  className="inline-flex items-center text-red-500 font-semibold hover:text-red-600"
                >
                  See all {city.classCount} activities in {city.name.en} &rarr;
                </Link>
              </div>
            ))}

            {/* CTA */}
            <div className="bg-gradient-to-r from-red-600 to-gray-900 rounded-lg p-8 mb-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience Muay Thai?</h2>
              <p className="text-lg mb-6 opacity-90">
                Browse Muay Thai fights, training sessions, and combo packages across Thailand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={GYG_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Browse on GetYourGuide
                </a>
                <a
                  href={KLOOK_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/40"
                >
                  Browse on Klook
                </a>
              </div>
              <p className="text-xs text-white/70 mt-4">
                We may earn a commission when you book through our links, at no extra cost to you.
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const index = getMuayThaiIndex();
  if (!index) return { notFound: true };

  const topActivities: { cityName: string; citySlug: string; cls: MuayThaiActivity }[] = [];

  index.cities.forEach((city: CityEntry) => {
    const data = getMuayThaiByCity(city.slug) as CityClasses | null;
    if (data) {
      data.classes.slice(0, 3).forEach((cls: MuayThaiActivity) => {
        topActivities.push({
          cityName: city.name.en,
          citySlug: city.slug,
          cls
        });
      });
    }
  });

  return {
    props: {
      cities: index.cities,
      topActivities
    },
    revalidate: 86400
  };
};
