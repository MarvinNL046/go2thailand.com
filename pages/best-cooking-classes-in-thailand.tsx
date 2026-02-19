import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCookingClassesIndex, getCookingClassesByCity } from '../lib/cooking-classes';
import { formatPrice } from '../lib/price';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface CookingClass {
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

interface CityClasses {
  city: string;
  cityName: { en: string; nl: string };
  intro: { en: string; nl: string };
  classes: CookingClass[];
}

interface Props {
  cities: CityEntry[];
  topClasses: { cityName: string; citySlug: string; cls: CookingClass }[];
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

export default function BestCookingClassesPage({ cities, topClasses }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Cooking Classes in Thailand', href: '/best-cooking-classes-in-thailand/' }
  ];

  const title = 'Best Cooking Classes in Thailand (2025) - Top 5 Cities Compared';
  const description = 'Compare the best Thai cooking classes across Chiang Mai, Bangkok, Phuket, Koh Samui, and Krabi. Prices, reviews, and insider tips to find your perfect cooking experience.';

  const faqItems = [
    {
      q: 'Where is the best place to take a cooking class in Thailand?',
      a: 'Chiang Mai is widely considered the best place for cooking classes in Thailand. It has the most options, the lowest prices (from EUR24), and classes include organic farm visits and market tours. Bangkok is a close second for convenience.'
    },
    {
      q: 'How much does a Thai cooking class cost?',
      a: 'Thai cooking classes range from EUR22-146 depending on location and class type. Chiang Mai and Krabi are the most affordable (EUR24-42), while Phuket and Koh Samui are pricier (EUR46-105). Premium experiences like Blue Elephant can cost EUR120+.'
    },
    {
      q: 'Should I book a cooking class in advance?',
      a: 'Yes, especially during peak season (November-February). Popular classes in Chiang Mai and Bangkok can sell out days in advance. Book at least 2-3 days ahead, or 1 week during holidays.'
    },
    {
      q: 'Are Thai cooking classes suitable for vegetarians?',
      a: 'Most cooking classes can accommodate vegetarians and vegans. Many allow you to choose your dishes, and instructors are experienced with dietary modifications. Mention your preferences when booking.'
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
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Best Cooking Classes in Thailand
              </h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Compare top-rated Thai cooking classes across 5 cities. From Chiang Mai&apos;s organic farms to Bangkok&apos;s urban kitchens — find your perfect culinary experience.
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
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Classes</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price Range</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Best For</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <Link href={`/city/${city.slug}/cooking-classes/`} className="font-semibold text-thailand-blue hover:underline">
                            {city.name.en}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{city.classCount}+</td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatPrice(city.priceRange.from, loc)} - {formatPrice(city.priceRange.to, loc)}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{city.highlight.en.split(' — ')[0]}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/city/${city.slug}/cooking-classes/`}
                            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
                          >
                            View classes &rarr;
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
                  <span className="text-lg font-bold text-white bg-thailand-blue w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <Link href={`/city/${city.slug}/cooking-classes/`} className="hover:text-thailand-blue">
                      Cooking Classes in {city.name.en}
                    </Link>
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">{city.highlight.en}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.classCount}+</div>
                    <div className="text-xs text-gray-600">Classes</div>
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

                {/* Top 3 classes for this city */}
                <div className="space-y-3 mb-6">
                  {topClasses
                    .filter(tc => tc.citySlug === city.slug)
                    .slice(0, 3)
                    .map((tc, i) => (
                      <div key={tc.cls.slug} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{tc.cls.name}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <StarRating rating={tc.cls.rating} />
                              <span>{tc.cls.rating}</span>
                              {tc.cls.reviews > 0 && <span>({tc.cls.reviews.toLocaleString()})</span>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{formatPrice(tc.cls.priceFrom, loc)}</div>
                        </div>
                      </div>
                    ))}
                </div>

                <Link
                  href={`/city/${city.slug}/cooking-classes/`}
                  className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600"
                >
                  See all {city.classCount} classes in {city.name.en} &rarr;
                </Link>
              </div>
            ))}

            {/* CTA */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-8 mb-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Book Your Thai Cooking Class?</h2>
              <p className="text-lg mb-6 opacity-90">
                Browse hundreds of cooking classes across Thailand on these trusted booking platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={GYG_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
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
  const index = getCookingClassesIndex();
  if (!index) return { notFound: true };

  const topClasses: { cityName: string; citySlug: string; cls: CookingClass }[] = [];

  index.cities.forEach((city: CityEntry) => {
    const data = getCookingClassesByCity(city.slug) as CityClasses | null;
    if (data) {
      data.classes.slice(0, 3).forEach((cls: CookingClass) => {
        topClasses.push({
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
      topClasses
    },
    revalidate: 86400
  };
};
