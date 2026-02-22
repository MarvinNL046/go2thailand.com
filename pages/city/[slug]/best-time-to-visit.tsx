import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';
import SEOHead from '../../../components/SEOHead';

interface PracticalInfo {
  bestMonths?: string[];
  nearestAirport?: string;
  travelTimeFromAirport?: string;
  localTransport?: string[];
}

interface BestTimeToVisitObj {
  season?: string;
  months?: string;
  weather?: string;
  reasons?: string;
}

interface SeasonalSecrets {
  best_times?: Record<string, string>;
  local_festivals?: string[];
  seasonal_foods?: Record<string, string>;
  insider_tips?: Record<string, string>;
}

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  categories: Record<string, { en: string; nl: string }>;
  tags?: string[];
  bestTimeToVisit?: string;
  best_time_to_visit?: BestTimeToVisitObj;
  seasonal_secrets?: SeasonalSecrets;
  practicalInfo?: PracticalInfo;
}

interface BestTimeToVisitPageProps {
  city: City;
}

const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MONTH_FULL_NAMES: Record<string, string> = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December',
};

export default function BestTimeToVisitPage({ city }: BestTimeToVisitPageProps) {
  if (!city) return <div>City not found</div>;

  const cityName = typeof city.name === 'string' ? city.name : city.name?.en || '';
  const breadcrumbs = generateBreadcrumbs(city, 'best-time-to-visit');
  const baseMetadata = generateCityMetadata(city, 'best-time-to-visit');

  const metadata = {
    ...baseMetadata,
    title: `Best Time to Visit ${cityName} 2026 \u2014 Month-by-Month Guide`,
    description: `Find the best time to visit ${cityName}, Thailand. Month-by-month weather guide, festivals, seasonal tips, and travel advice. Plan your perfect trip for 2026.`,
  };

  const bestMonths = city.practicalInfo?.bestMonths || [];
  const bestTimeObj = city.best_time_to_visit;
  const seasonalSecrets = city.seasonal_secrets;
  const practicalInfo = city.practicalInfo;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    datePublished: '2026-01-15',
    dateModified: '2026-02-22',
    author: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://go2-thailand.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://go2-thailand.com/city/${city.slug}/best-time-to-visit/`,
    },
  };

  // FAQ schema from seasonal secrets insider tips + common questions
  const faqItems = [
    ...(bestTimeObj ? [{
      question: `What is the best time to visit ${cityName}?`,
      answer: `The best time to visit ${cityName} is during the ${bestTimeObj.season || 'cool season'} (${bestTimeObj.months || 'November to February'}). ${bestTimeObj.weather || ''} ${bestTimeObj.reasons || ''}`.trim(),
    }] : []),
    {
      question: `What is the weather like in ${cityName}?`,
      answer: city.bestTimeToVisit || `${cityName} has a tropical climate with three seasons: cool (November-February), hot (March-May), and rainy (June-October).`,
    },
    ...(seasonalSecrets?.local_festivals && seasonalSecrets.local_festivals.length > 0 ? [{
      question: `What festivals happen in ${cityName}?`,
      answer: `Key festivals in ${cityName} include: ${seasonalSecrets.local_festivals.slice(0, 4).join(', ')}.`,
    }] : []),
    {
      question: `Is ${cityName} worth visiting in rainy season?`,
      answer: seasonalSecrets?.insider_tips?.['Rainy season'] || `Yes! Rain usually falls in short afternoon bursts, and you'll enjoy fewer crowds and lower prices. Mornings are often sunny and great for sightseeing.`,
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // Event schema for festivals
  const festivalEvents = (seasonalSecrets?.local_festivals || []).slice(0, 5).map(festival => ({
    '@type': 'Event',
    name: festival.split(' - ')[0].split(' (')[0],
    description: festival,
    location: {
      '@type': 'Place',
      name: cityName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressCountry: 'TH',
      },
    },
  }));

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
      >
        <meta name="keywords" content={metadata.keywords} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {festivalEvents.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `Festivals and Events in ${cityName}`,
              itemListElement: festivalEvents.map((event, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: event,
              })),
            }) }}
          />
        )}
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Best Time to Visit {cityName}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your complete month-by-month guide to weather, festivals, and the ideal time to plan your trip to {cityName}, Thailand.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="space-y-12">

              {/* When to Visit - Month Grid */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Visit {cityName}</h2>
                {bestTimeObj && (
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {bestTimeObj.season && (
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Best Season</div>
                          <div className="font-bold text-gray-900">{bestTimeObj.season}</div>
                        </div>
                      )}
                      {bestTimeObj.months && (
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Best Months</div>
                          <div className="font-bold text-gray-900">{bestTimeObj.months}</div>
                        </div>
                      )}
                      {bestTimeObj.weather && (
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Weather</div>
                          <div className="font-bold text-gray-900">{bestTimeObj.weather}</div>
                        </div>
                      )}
                      {bestTimeObj.reasons && (
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Why Visit Then</div>
                          <div className="font-bold text-gray-900">{bestTimeObj.reasons}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Month-by-Month Overview</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                    {ALL_MONTHS.map((month) => {
                      const isBest = bestMonths.includes(month);
                      return (
                        <div
                          key={month}
                          className={`text-center p-3 rounded-lg border-2 transition-colors ${
                            isBest
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-gray-50 border-gray-200 text-gray-500'
                          }`}
                        >
                          <div className="text-sm font-bold">{month}</div>
                          {isBest && (
                            <svg className="w-4 h-4 mx-auto mt-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {bestMonths.length > 0 && (
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
                        <span>Best months to visit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-50 border-2 border-gray-200 rounded"></div>
                        <span>Other months</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Climate Overview */}
              {city.bestTimeToVisit && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Climate Overview</h2>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="prose prose-lg max-w-none text-gray-700">
                      {city.bestTimeToVisit.split('\n\n').map((paragraph: string, idx: number) => (
                        <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Seasonal Guide */}
              {seasonalSecrets && (seasonalSecrets.best_times || seasonalSecrets.seasonal_foods) && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Seasonal Guide</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {seasonalSecrets.best_times && Object.keys(seasonalSecrets.best_times).length > 0 && (
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          Best Times by Month
                        </h3>
                        <ul className="space-y-3">
                          {Object.entries(seasonalSecrets.best_times).map(([month, description]) => (
                            <li key={month} className="flex items-start">
                              <span className="font-semibold text-thailand-blue min-w-[80px]">{month}:</span>
                              <span className="text-gray-700 ml-2">{description}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {seasonalSecrets.seasonal_foods && Object.keys(seasonalSecrets.seasonal_foods).length > 0 && (
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Seasonal Foods
                        </h3>
                        <ul className="space-y-3">
                          {Object.entries(seasonalSecrets.seasonal_foods).map(([season, food]) => (
                            <li key={season} className="flex items-start">
                              <span className="font-semibold text-thailand-blue min-w-[80px] capitalize">{season}:</span>
                              <span className="text-gray-700 ml-2">{food}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {seasonalSecrets.insider_tips && Object.keys(seasonalSecrets.insider_tips).length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-6 mt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Insider Tips</h3>
                      <ul className="space-y-2">
                        {Object.entries(seasonalSecrets.insider_tips).map(([season, tip]) => (
                          <li key={season} className="flex items-start">
                            <svg className="w-5 h-5 text-thailand-blue mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700"><span className="font-semibold capitalize">{season}:</span> {tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Festivals & Events */}
              {seasonalSecrets?.local_festivals && seasonalSecrets.local_festivals.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Festivals & Events</h2>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <p className="text-gray-600 mb-4">
                      Plan your trip around these local festivals and events in {cityName} for a more immersive experience.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {seasonalSecrets.local_festivals.map((festival, idx) => (
                        <div key={idx} className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium text-gray-900">{festival}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Getting There */}
              {practicalInfo && (practicalInfo.nearestAirport || practicalInfo.localTransport) && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting There & Around</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {practicalInfo.nearestAirport && (
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 text-thailand-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z" />
                          </svg>
                          Nearest Airport
                        </h3>
                        <p className="text-gray-700 font-semibold text-lg mb-2">{practicalInfo.nearestAirport}</p>
                        {practicalInfo.travelTimeFromAirport && (
                          <p className="text-gray-600">
                            <span className="font-medium">Travel time:</span> {practicalInfo.travelTimeFromAirport}
                          </p>
                        )}
                      </div>
                    )}

                    {practicalInfo.localTransport && practicalInfo.localTransport.length > 0 && (
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 text-thailand-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Local Transport Options
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {practicalInfo.localTransport.map((transport, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                              {transport}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Trip.com Widget */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Plan Your Trip to {cityName}</h3>
                <p className="text-gray-600 mb-6">Search and compare the best deals on flights, hotels, and transport</p>
                <TripcomWidget city={cityName} type="hotels" />
              </div>

              {/* Affiliate Booking Links */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Book Your Trip to {cityName}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Compare prices across top booking platforms and find the best deal for your stay.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://trip.tpo.lv/TmObooZ5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Search on Trip.com
                  </a>
                  <a
                    href="https://booking.tpo.lv/2PT1kR82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Search on Booking.com
                  </a>
                  <a
                    href="https://12go.tpo.lv/tNA80urD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Transport on 12Go
                  </a>
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  We may earn a commission when you book through our links, at no extra cost to you. This helps us keep the site running.
                </p>
              </div>

              {/* Explore More */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Explore More of {cityName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Hotels & Stay</h4>
                      <p className="text-gray-600 text-sm">Where to stay in {cityName}</p>
                    </div>
                  </Link>
                  <Link href={`/city/${city.slug}/attractions/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Attractions</h4>
                      <p className="text-gray-600 text-sm">Top things to do</p>
                    </div>
                  </Link>
                  <Link href={`/city/${city.slug}/food/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Food & Dining</h4>
                      <p className="text-gray-600 text-sm">Discover local cuisine</p>
                    </div>
                  </Link>
                  <Link href={`/city/${city.slug}/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">City Overview</h4>
                      <p className="text-gray-600 text-sm">Complete guide to {cityName}</p>
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCityStaticPaths();
  return { paths, fallback: 'blocking' };
};

// Recursively resolve {en, nl} bilingual objects to plain strings.
function flattenBilingual(data: any): any {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(item => flattenBilingual(item));
  const keys = Object.keys(data);
  if (keys.includes('en') && keys.every(k => k.length <= 3)) {
    return data.en || '';
  }
  const result: any = {};
  for (const key of keys) {
    result[key] = flattenBilingual(data[key]);
  }
  return result;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const rawCity = getCityBySlug(slug);

  if (!rawCity) {
    return { notFound: true };
  }

  // Flatten all bilingual objects to strings
  const city = flattenBilingual(rawCity);
  // Restore bilingual name for the template
  city.name = rawCity.name;

  return {
    props: { city: JSON.parse(JSON.stringify(city)) },
    revalidate: 86400,
  };
};
