import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDivingSnorkelingIndex, getDivingSnorkelingByCity } from '../lib/diving-snorkeling';
import { formatPrice } from '../lib/price';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface Activity {
  name: string;
  slug: string;
  type: 'diving' | 'snorkeling';
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

interface CityData {
  city: string;
  cityName: { en: string; nl: string };
  intro: { en: string; nl: string };
  classes: Activity[];
}

interface Props {
  cities: CityEntry[];
  topActivities: { cityName: string; citySlug: string; activity: Activity }[];
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
    diving: { label: 'Diving', color: 'bg-blue-100 text-blue-700' },
    snorkeling: { label: 'Snorkeling', color: 'bg-cyan-100 text-cyan-700' },
  };
  const { label, color } = config[type] || config.snorkeling;
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded ${color}`}>{label}</span>;
}

export default function BestDivingSnorkelingPage({ cities, topActivities }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Diving & Snorkeling in Thailand', href: '/best-diving-snorkeling-in-thailand/' }
  ];

  const title = 'Best Diving & Snorkeling in Thailand 2026 — Top Sites';
  const description = 'Compare diving and snorkeling in Phuket and Krabi. Similan Islands, Phi Phi and more. Trips from $22, PADI courses and best-season tips included.';

  const faqItems = [
    {
      q: 'Where is the best diving in Thailand?',
      a: 'Phuket is the top destination for scuba diving, with access to the Similan Islands, Racha Islands, and Phi Phi. The Similan Islands are considered some of the best dive sites in the world, with visibility up to 30+ meters and diverse marine life including manta rays and whale sharks.'
    },
    {
      q: 'Where is the best snorkeling in Thailand?',
      a: 'Krabi offers some of the most accessible and affordable snorkeling in Thailand. The 4 Islands, 7 Islands, and Hong Islands tours provide crystal-clear waters and vibrant coral reefs. Phuket also has excellent snorkeling at the Similan Islands and Phi Phi.'
    },
    {
      q: 'How much does diving cost in Thailand?',
      a: 'Snorkeling day trips start from as low as $22 in Krabi. Scuba diving experiences range from $47 for a shore dive to $173 for a premium 3-dive trip. PADI certification courses cost $450-600 for 3-day programs.'
    },
    {
      q: 'When is the best time for diving in Thailand?',
      a: 'The best diving season on the Andaman coast (Phuket, Krabi) is November to April. The Similan Islands are only open November-May. During this period, seas are calm and visibility reaches 20-30+ meters. Avoid June-October when monsoon brings rough seas.'
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
        <section className="bg-blue-900 text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Best Diving & Snorkeling in Thailand
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-blue-100">
                From Phuket&apos;s world-class dive sites at the Similan Islands to Krabi&apos;s stunning island-hopping snorkeling tours — find your perfect underwater adventure.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <h2 className="text-2xl font-bold text-gray-900 p-6 pb-0">
                Destination Comparison at a Glance
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Destination</th>
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
                          <Link href={`/city/${city.slug}/diving-snorkeling/`} className="font-semibold text-blue-700 hover:underline">
                            {city.name.en}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{city.classCount}+</td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatPrice(city.priceRange.from, loc)} - {formatPrice(city.priceRange.to, loc)}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{city.highlight.en.split('.')[0]}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/city/${city.slug}/diving-snorkeling/`}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
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
                  <span className="text-lg font-bold text-white bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <Link href={`/city/${city.slug}/diving-snorkeling/`} className="hover:text-blue-700">
                      Diving & Snorkeling in {city.name.en}
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
                      {formatPrice(city.priceRange.from, loc)}+
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
                    .filter(ta => ta.citySlug === city.slug)
                    .slice(0, 3)
                    .map((ta, i) => (
                      <div key={ta.activity.slug} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                          <div>
                            <div className="font-medium text-gray-900 text-sm flex items-center gap-2">
                              {ta.activity.name}
                              <TypeBadge type={ta.activity.type} />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              {ta.activity.rating > 0 && (
                                <>
                                  <StarRating rating={ta.activity.rating} />
                                  <span>{ta.activity.rating}</span>
                                  {ta.activity.reviews > 0 && <span>({ta.activity.reviews.toLocaleString()})</span>}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{formatPrice(ta.activity.priceFrom, loc)}</div>
                        </div>
                      </div>
                    ))}
                </div>

                <Link
                  href={`/city/${city.slug}/diving-snorkeling/`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                >
                  See all {city.classCount} activities in {city.name.en} &rarr;
                </Link>
              </div>
            ))}

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-lg p-8 mb-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Explore Thailand&apos;s Underwater World?</h2>
              <p className="text-lg mb-6 opacity-90">
                Browse diving and snorkeling experiences across Thailand on these trusted booking platforms.
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
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const index = getDivingSnorkelingIndex();
  if (!index) return { notFound: true };

  const topActivities: { cityName: string; citySlug: string; activity: Activity }[] = [];

  index.cities.forEach((city: CityEntry) => {
    const data = getDivingSnorkelingByCity(city.slug) as CityData | null;
    if (data) {
      data.classes.slice(0, 3).forEach((activity: Activity) => {
        topActivities.push({
          cityName: city.name.en,
          citySlug: city.slug,
          activity
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
