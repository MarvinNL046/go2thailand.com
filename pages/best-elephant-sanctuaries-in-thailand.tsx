import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getElephantSanctuariesIndex, getElephantSanctuariesByCity } from '../lib/elephant-sanctuaries';
import { formatPrice } from '../lib/price';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface Sanctuary {
  name: string;
  slug: string;
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
  classes: Sanctuary[];
}

interface Props {
  cities: CityEntry[];
  topSanctuaries: { cityName: string; citySlug: string; sanctuary: Sanctuary }[];
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

export default function BestElephantSanctuariesPage({ cities, topSanctuaries }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Elephant Sanctuaries in Thailand', href: '/best-elephant-sanctuaries-in-thailand/' }
  ];

  const title = 'Best Elephant Sanctuaries in Thailand 2026 — Ethical Visits';
  const description = 'Compare 80+ ethical elephant sanctuaries in Chiang Mai, Phuket and Krabi. Feeding, bathing and care programs from $18. Reviews and booking links.';

  const faqItems = [
    {
      q: 'Where is the best place to visit an elephant sanctuary in Thailand?',
      a: 'Chiang Mai is the best destination for elephant sanctuaries in Thailand, with 50+ ethical programs to choose from. The surrounding mountains provide a natural jungle setting, and prices start from just EUR21. Phuket is a close second with diverse programs including beach walks with elephants.'
    },
    {
      q: 'How much does an elephant sanctuary visit cost in Thailand?',
      a: 'Elephant sanctuary visits range from EUR18 for a quick feeding session in Krabi to EUR105 for a 2-day overnight homestay in Chiang Mai. Most popular half-day programs cost between EUR40-70 and include hotel transfers, feeding, bathing, and a meal.'
    },
    {
      q: 'Are elephant sanctuaries in Thailand ethical?',
      a: 'The sanctuaries listed here follow no-riding, ethical care policies. Look for programs certified by booking platforms, with explicit no-riding policies, and that focus on feeding, bathing, and observing elephants in their natural habitat rather than performing tricks.'
    },
    {
      q: 'Do elephant sanctuaries include hotel transfers?',
      a: 'Yes, almost all elephant sanctuary programs in Thailand include hotel pickup and drop-off from the main tourist areas. This is included in the price — no need to arrange separate transport.'
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
        <section className="bg-green-800 text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Best Elephant Sanctuaries in Thailand
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-100">
                From Chiang Mai&apos;s jungle sanctuaries to Phuket&apos;s beach elephant walks — compare ethical elephant experiences across Thailand&apos;s top destinations.
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
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Sanctuaries</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price Range</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Best For</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <Link href={`/city/${city.slug}/elephant-sanctuaries/`} className="font-semibold text-green-700 hover:underline">
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
                            href={`/city/${city.slug}/elephant-sanctuaries/`}
                            className="text-sm font-semibold text-green-600 hover:text-green-700"
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
                  <span className="text-lg font-bold text-white bg-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <Link href={`/city/${city.slug}/elephant-sanctuaries/`} className="hover:text-green-700">
                      Elephant Sanctuaries in {city.name.en}
                    </Link>
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">{city.highlight.en}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.classCount}+</div>
                    <div className="text-xs text-gray-600">Sanctuaries</div>
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

                {/* Top 3 sanctuaries for this city */}
                <div className="space-y-3 mb-6">
                  {topSanctuaries
                    .filter(ts => ts.citySlug === city.slug)
                    .slice(0, 3)
                    .map((ts, i) => (
                      <div key={ts.sanctuary.slug} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{ts.sanctuary.name}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              {ts.sanctuary.rating > 0 && (
                                <>
                                  <StarRating rating={ts.sanctuary.rating} />
                                  <span>{ts.sanctuary.rating}</span>
                                  {ts.sanctuary.reviews > 0 && <span>({ts.sanctuary.reviews.toLocaleString()})</span>}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{formatPrice(ts.sanctuary.priceFrom, loc)}</div>
                        </div>
                      </div>
                    ))}
                </div>

                <Link
                  href={`/city/${city.slug}/elephant-sanctuaries/`}
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
                >
                  See all {city.classCount} sanctuaries in {city.name.en} &rarr;
                </Link>
              </div>
            ))}

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 mb-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Meet Thailand&apos;s Elephants?</h2>
              <p className="text-lg mb-6 opacity-90">
                Browse ethical elephant sanctuaries across Thailand on these trusted booking platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={GYG_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
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
  const index = getElephantSanctuariesIndex();
  if (!index) return { notFound: true };

  const topSanctuaries: { cityName: string; citySlug: string; sanctuary: Sanctuary }[] = [];

  index.cities.forEach((city: CityEntry) => {
    const data = getElephantSanctuariesByCity(city.slug) as CityData | null;
    if (data) {
      data.classes.slice(0, 3).forEach((sanctuary: Sanctuary) => {
        topSanctuaries.push({
          cityName: city.name.en,
          citySlug: city.slug,
          sanctuary
        });
      });
    }
  });

  return {
    props: {
      cities: index.cities,
      topSanctuaries
    },
    revalidate: 86400
  };
};
