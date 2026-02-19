import { GetStaticProps, GetStaticPaths } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import monthlyGuides from '../../data/monthly-guides.json';
import { getAllCities } from '../../lib/cities';

interface MonthlyGuide {
  month: string;
  slug: string;
  title: string;
  meta_description: string;
  weather: {
    overview: string;
    temperature: {
      north: string;
      central: string;
      south: string;
    };
    rainfall: string;
    humidity: string;
  };
  highlights: string[];
  festivals: {
    name: string;
    description: string;
  }[];
  best_destinations: {
    name: string;
    reason: string;
  }[];
  travel_tips: string[];
  pros: string[];
  cons: string[];
}

interface MonthlyPageProps {
  guide: MonthlyGuide;
  previousMonth: string | null;
  nextMonth: string | null;
  popularCities: any[];
}

export default function ThailandMonthlyPage({ guide, previousMonth, nextMonth, popularCities }: MonthlyPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Travel Guides', href: '/travel-guides' },
    { name: `Thailand in ${guide.month}`, href: `/thailand-in/${guide.slug}` }
  ];

  return (
    <>
      <SEOHead
        title={guide.title}
        description={guide.meta_description}
      >
        <meta name="keywords" content={`Thailand ${guide.month}, ${guide.month} weather Thailand, ${guide.month} festivals Thailand, visit Thailand ${guide.month}`} />
        <meta property="og:type" content="article" />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold text-white">
          <div className="container-custom py-16">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Thailand in {guide.month}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {guide.weather.overview}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🌡️ {guide.weather.temperature.central}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  💧 {guide.weather.rainfall}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  💨 {guide.weather.humidity} humidity
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center">
              {previousMonth ? (
                <Link href={`/thailand-in/${previousMonth}/`} className="flex items-center text-thailand-blue hover:underline">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Month
                </Link>
              ) : <div />}
              
              <Link href="/travel-guides/thailand-weather/" className="text-gray-600 hover:text-thailand-blue">
                View All Months
              </Link>
              
              {nextMonth ? (
                <Link href={`/thailand-in/${nextMonth}/`} className="flex items-center text-thailand-blue hover:underline">
                  Next Month
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Weather Details */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">🌤️</span>
                    Weather in {guide.month}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-2">Northern Thailand</h3>
                      <div className="text-2xl font-bold text-thailand-blue">{guide.weather.temperature.north}</div>
                      <p className="text-sm text-gray-600 mt-1">Chiang Mai, Chiang Rai</p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-2">Central Thailand</h3>
                      <div className="text-2xl font-bold text-thailand-blue">{guide.weather.temperature.central}</div>
                      <p className="text-sm text-gray-600 mt-1">Bangkok, Ayutthaya</p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-2">Southern Thailand</h3>
                      <div className="text-2xl font-bold text-thailand-blue">{guide.weather.temperature.south}</div>
                      <p className="text-sm text-gray-600 mt-1">Phuket, Krabi, Koh Samui</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-semibold text-gray-900">Rainfall:</span>
                        <p className="text-gray-600">{guide.weather.rainfall}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Humidity:</span>
                        <p className="text-gray-600">{guide.weather.humidity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">✨</span>
                    {guide.month} Highlights
                  </h2>
                  <ul className="space-y-3">
                    {guide.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Festivals */}
                {guide.festivals.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-3xl mr-3">🎉</span>
                      Festivals & Events
                    </h2>
                    <div className="space-y-4">
                      {guide.festivals.map((festival, index) => (
                        <div key={index} className="bg-white bg-opacity-70 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{festival.name}</h3>
                          <p className="text-gray-700">{festival.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Destinations */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">📍</span>
                    Best Places to Visit
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guide.best_destinations.map((destination, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-thailand-blue transition-colors">
                        <h3 className="font-semibold text-gray-900 mb-1">{destination.name}</h3>
                        <p className="text-gray-600 text-sm">{destination.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travel Tips */}
                <div className="bg-blue-50 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">💡</span>
                    Travel Tips for {guide.month}
                  </h2>
                  <ul className="space-y-2">
                    {guide.travel_tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                      Pros
                    </h3>
                    <ul className="space-y-2">
                      {guide.pros.map((pro, index) => (
                        <li key={index} className="text-green-700 text-sm flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-6">
                    <h3 className="font-semibold text-red-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Cons
                    </h3>
                    <ul className="space-y-2">
                      {guide.cons.map((con, index) => (
                        <li key={index} className="text-red-700 text-sm flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-8">
                  
                  {/* Trip.com Widget */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Plan Your {guide.month} Trip
                    </h3>
                    <TripcomWidget city="Thailand" type="bundle" />
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Popular Destinations
                    </h3>
                    <div className="space-y-2">
                      {popularCities.slice(0, 6).map((city) => (
                        <Link 
                          key={city.slug}
                          href={`/city/${city.slug}/`} 
                          className="block text-thailand-blue hover:underline"
                        >
                          📍 {city.name.en}
                        </Link>
                      ))}
                    </div>
                  </div>


                  {/* Other Months */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Thailand by Month
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {Object.keys(monthlyGuides).map((monthSlug) => (
                        <Link
                          key={monthSlug}
                          href={`/thailand-in/${monthSlug}/`}
                          className={`text-center py-2 rounded ${
                            monthSlug === guide.slug 
                              ? 'bg-thailand-blue text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {monthSlug.charAt(0).toUpperCase() + monthSlug.slice(1, 3)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activities & Tours CTA */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Book Activities for {guide.month}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Discover the best tours, day trips, and experiences across Thailand.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <a
                  href="https://klook.tpo.lv/aq6ZFxvc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                >
                  Browse Klook Activities
                </a>
                <a
                  href="https://getyourguide.tpo.lv/GuAFfGGK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  Browse GetYourGuide
                </a>
                <Link
                  href="/activities/"
                  className="flex items-center justify-center bg-thailand-blue text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
                >
                  All Activities
                </Link>
              </div>
              <p className="text-xs text-gray-500 text-center">
                External links are affiliate links. We may earn a small commission at no extra cost to you.
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 bg-gradient-to-r from-thailand-blue to-thailand-gold rounded-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Visit Thailand in {guide.month}?
              </h2>
              <p className="mb-6 opacity-90">
                Explore our city guides, find the best hotels, and plan your perfect trip
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/city/" className="bg-white text-thailand-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Explore Cities
                </Link>
                <Link href="/top-10/hotels/" className="bg-white bg-opacity-20 text-white border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-thailand-blue transition-colors">
                  Find Hotels
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
  const paths = Object.keys(monthlyGuides).map((month) => ({
    params: { month }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const month = params?.month as string;
  const guide = (monthlyGuides as any)[month];
  
  if (!guide) {
    return { notFound: true };
  }

  // Get month navigation
  const months = Object.keys(monthlyGuides);
  const currentIndex = months.indexOf(month);
  const previousMonth = currentIndex > 0 ? months[currentIndex - 1] : null;
  const nextMonth = currentIndex < months.length - 1 ? months[currentIndex + 1] : null;

  // Get popular cities for sidebar
  const popularCities = getAllCities().slice(0, 6);

  return {
    props: {
      guide,
      previousMonth,
      nextMonth,
      popularCities
    },
    revalidate: 86400
  };
};