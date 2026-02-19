import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import { getCookingClassesByCity, getAllCookingClassCities } from '../../../lib/cooking-classes';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';

interface CookingClass {
  name: string;
  slug: string;
  provider: string;
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
  classes: CookingClass[];
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
  cookingData: CityData;
}

const GYG_AFFILIATE = 'https://getyourguide.tpo.lv/6HngJ5FC';
const KLOOK_AFFILIATE = 'https://klook.tpo.lv/7Dt6WApj';

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

export default function CookingClassesPage({ city, cookingData }: Props) {
  if (!city || !cookingData) return <div>Not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Cooking Classes', href: `/city/${city.slug}/cooking-classes/` }
  ];

  const title = `Best Cooking Classes in ${city.name.en} (2025) - Prices & Reviews`;
  const description = `Discover the ${cookingData.classes.length} best Thai cooking classes in ${city.name.en}. Compare prices from ${cookingData.classes[0]?.currency || 'EUR'}${cookingData.classes[0]?.priceFrom || ''}, read reviews, and book your hands-on Thai cooking experience.`;

  const faqItems = [
    {
      q: `How much does a cooking class in ${city.name.en} cost?`,
      a: `Cooking classes in ${city.name.en} typically cost between ${cookingData.classes[0]?.currency || 'EUR'}${Math.min(...cookingData.classes.map(c => c.priceFrom))} and ${cookingData.classes[0]?.currency || 'EUR'}${Math.max(...cookingData.classes.map(c => c.priceFrom))} per person, depending on the class duration and inclusions.`
    },
    {
      q: `How long is a typical cooking class in ${city.name.en}?`,
      a: `Most cooking classes in ${city.name.en} last between 3 to 5 hours. Half-day classes are the most popular option, usually including a market visit and cooking 4-6 dishes.`
    },
    {
      q: `Do I need cooking experience to join a class in ${city.name.en}?`,
      a: `No! All cooking classes in ${city.name.en} are beginner-friendly. Instructors guide you step-by-step through each dish, and the atmosphere is relaxed and fun.`
    },
    {
      q: `What dishes will I learn to cook?`,
      a: `Most classes teach classic Thai dishes like Pad Thai, Green Curry, Tom Yum soup, Spring Rolls, and Mango Sticky Rice. Some classes specialize in regional dishes or street food.`
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
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Best Cooking Classes in {city.name.en}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {cookingData.intro.en.split('.').slice(0, 2).join('.') + '.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-thailand-blue">{cookingData.classes.length}</div>
                <div className="text-sm text-gray-600">Classes Available</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-thailand-blue">
                  {cookingData.classes[0]?.currency}{Math.min(...cookingData.classes.map(c => c.priceFrom))}
                </div>
                <div className="text-sm text-gray-600">Starting From</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-thailand-blue">
                  {Math.max(...cookingData.classes.map(c => c.rating)).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Top Rating</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-thailand-blue">
                  {cookingData.classes.reduce((sum, c) => sum + c.reviews, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Thai Cooking Classes in {city.name.en}
              </h2>
              <p className="text-gray-700 leading-relaxed">{cookingData.intro.en}</p>
            </div>

            {/* Cooking Classes List */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Top {cookingData.classes.length} Cooking Classes in {city.name.en}
            </h2>

            <div className="space-y-6 mb-12">
              {cookingData.classes.map((cls, index) => (
                <div key={cls.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-thailand-blue bg-blue-50 px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                          {cls.badge && (
                            <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded">
                              {cls.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{cls.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <StarRating rating={cls.rating} />
                            <span className="font-semibold text-gray-900">{cls.rating}</span>
                            {cls.reviews > 0 && (
                              <span className="text-gray-500">({cls.reviews.toLocaleString()} reviews)</span>
                            )}
                          </span>
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
                          <div className="text-2xl font-bold text-gray-900">{cls.currency}{cls.priceFrom}</div>
                          <div className="text-xs text-gray-500">per person</div>
                        </div>
                        <a
                          href={GYG_AFFILIATE}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm"
                        >
                          View on GetYourGuide
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tips for Cooking Classes in {city.name.en}
              </h2>
              <ul className="space-y-3">
                {cookingData.tips.en.map((tip, i) => (
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

            {/* Book Section */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-8 mb-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Book Your Cooking Class in {city.name.en}
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Compare prices and find the perfect cooking experience on these trusted platforms.
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
                <Link href={`/city/${city.slug}/food/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Food & Dining</h4>
                    <p className="text-gray-600 text-sm">Local cuisine guide</p>
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
  const citySlugs = getAllCookingClassCities();
  const paths: { params: { slug: string }; locale?: string }[] = [];

  const locales = ['en', 'nl', 'zh', 'de', 'fr', 'ru', 'ja', 'ko'];
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  if (!city) return { notFound: true };

  const cookingData = getCookingClassesByCity(slug);
  if (!cookingData) return { notFound: true };

  return { props: { city, cookingData }, revalidate: 86400 };
};
