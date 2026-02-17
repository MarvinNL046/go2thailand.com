import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import TripcomWidget from '../../../../components/TripcomWidget';
import cityWeatherData from '../../../../data/city-weather.json';
import citiesData from '../../../../data/cities/index.json';

interface WeatherData {
  temperature: {
    high: number;
    low: number;
  };
  rainfall: number;
  rainyDays: number;
  humidity: number;
  seaTemperature?: number | null;
  description: string;
  events: string[];
  pros: string[];
  cons: string[];
}

interface CityWeatherPageProps {
  city: any;
  month: string;
  monthName: string;
  weatherData: WeatherData;
  prevMonth: { slug: string; name: string } | null;
  nextMonth: { slug: string; name: string } | null;
  allMonths: { slug: string; name: string }[];
}

const monthNames = {
  'january': 'January',
  'february': 'February',
  'march': 'March',
  'april': 'April',
  'may': 'May',
  'june': 'June',
  'july': 'July',
  'august': 'August',
  'september': 'September',
  'october': 'October',
  'november': 'November',
  'december': 'December'
};

const CityWeatherPage: React.FC<CityWeatherPageProps> = ({
  city,
  month,
  monthName,
  weatherData,
  prevMonth,
  nextMonth,
  allMonths
}) => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: city.name.en, href: `/city/${city.slug}` },
    { name: 'Weather', href: `/city/${city.slug}/weather` },
    { name: monthName, href: `/city/${city.slug}/weather/${month}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{`${city.name.en} Weather in ${monthName} - Temperature, Rainfall & Travel Tips | Go2 Thailand`}</title>
        <meta name="description" content={`Planning to visit ${city.name.en} in ${monthName}? Get detailed weather information including temperature (${weatherData.temperature.high}°C/${weatherData.temperature.low}°C), rainfall, humidity, and expert travel tips.`} />
        <meta name="keywords" content={`${city.name.en} weather ${monthName}, ${city.name.en} temperature ${monthName}, ${city.name.en} rainfall ${monthName}, ${city.name.en} climate ${monthName}, visit ${city.name.en} ${monthName}`} />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {city.name.en} Weather in {monthName}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Weather Overview */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Weather Overview</h2>
              <p className="text-gray-700 mb-6">{weatherData.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {weatherData.temperature.high}°C
                  </div>
                  <div className="text-sm text-gray-600">Avg High</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {weatherData.temperature.low}°C
                  </div>
                  <div className="text-sm text-gray-600">Avg Low</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">
                    {weatherData.rainfall}mm
                  </div>
                  <div className="text-sm text-gray-600">Rainfall</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">
                    {weatherData.humidity}%
                  </div>
                  <div className="text-sm text-gray-600">Humidity</div>
                </div>
              </div>

              {weatherData.seaTemperature && (
                <div className="mt-4 p-4 bg-cyan-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-cyan-600">
                    {weatherData.seaTemperature}°C
                  </div>
                  <div className="text-sm text-gray-600">Sea Temperature</div>
                </div>
              )}
            </section>


            {/* Pros and Cons */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Pros & Cons of Visiting in {monthName}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">Advantages</h3>
                  <ul className="space-y-2">
                    {weatherData.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">Considerations</h3>
                  <ul className="space-y-2">
                    {weatherData.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Events and Festivals */}
            {weatherData.events.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Events & Festivals</h2>
                <ul className="space-y-3">
                  {weatherData.events.map((event, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">🎉</span>
                      <span className="text-gray-700">{event}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Book Your Trip - Affiliate CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Book Your Trip to {city.name.en}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Plan your {monthName} visit with the best deals on hotels and transport.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Hotels on Trip.com
                </a>
                <a
                  href="https://12go.tpo.lv/tNA80urD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Transport on 12Go
                </a>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Affiliate disclosure: We may earn a commission when you book through our partner links, at no extra cost to you.
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex justify-between items-center bg-white rounded-lg shadow-md p-6">
              {prevMonth ? (
                <Link href={`/city/${city.slug}/weather/${prevMonth.slug}`} className="flex items-center text-orange-500 hover:text-orange-600">
                  <span className="mr-2">←</span>
                  <span>{prevMonth.name}</span>
                </Link>
              ) : (
                <div></div>
              )}
              <Link href={`/city/${city.slug}/weather`} className="text-gray-600 hover:text-gray-800">
                All Months
              </Link>
              {nextMonth ? (
                <Link href={`/city/${city.slug}/weather/${nextMonth.slug}`} className="flex items-center text-orange-500 hover:text-orange-600">
                  <span>{nextMonth.name}</span>
                  <span className="ml-2">→</span>
                </Link>
              ) : (
                <div></div>
              )}
            </nav>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-4 space-y-6 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            {/* City Weather Selector */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">🌍 Other Cities Weather</h3>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={city.slug}
                onChange={(e) => window.location.href = `/city/${e.target.value}/weather/${month}/`}
              >
                <option value="bangkok">Bangkok</option>
                <option value="chiang-mai">Chiang Mai</option>
                <option value="phuket">Phuket</option>
                <option value="pattaya">Pattaya</option>
                <option value="krabi">Krabi</option>
                <option value="ayutthaya">Ayutthaya</option>
                <option value="chiang-rai">Chiang Rai</option>
                <option value="hat-yai">Hat Yai</option>
                <option value="sukhothai">Sukhothai</option>
                <option value="surat-thani">Surat Thani</option>
              </select>
            </div>

            {/* Trip.com Widget */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Plan Your Trip</h3>
              <TripcomWidget city={city.name.en} type="hotels" />
            </div>

            {/* Monthly Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">{city.name.en} Weather by Month</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {allMonths.map((m) => (
                  <Link key={m.slug} href={`/city/${city.slug}/weather/${m.slug}`} className={`text-center p-2 rounded ${
                    m.slug === month 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    {m.name.slice(0, 3)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Explore {city.name.en}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/city/${city.slug}/attractions`} className="text-orange-500 hover:text-orange-600">
                    Top Attractions
                  </Link>
                </li>
                <li>
                  <Link href={`/city/${city.slug}/hotels`} className="text-orange-500 hover:text-orange-600">
                    Where to Stay
                  </Link>
                </li>
                <li>
                  <Link href={`/city/${city.slug}/food`} className="text-orange-500 hover:text-orange-600">
                    Food & Dining
                  </Link>
                </li>
                <li>
                  <Link href={`/thailand-in/${month}`} className="text-orange-500 hover:text-orange-600">
                    Thailand in {monthName}
                  </Link>
                </li>
              </ul>
            </div>

            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const cityWeather = cityWeatherData as Record<string, any>;
  
  for (const citySlug of Object.keys(cityWeather)) {
    // Skip cities that have the old structure metadata fields at the root
    const cityData = cityWeather[citySlug];
    const monthlyData = cityData.monthly_weather || cityData;
    
    // Only process valid month keys
    for (const month of Object.keys(monthNames)) {
      if (monthlyData[month]) {
        paths.push({
          params: { slug: citySlug, month }
        });
      }
    }
  }
  
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<CityWeatherPageProps> = async ({ params }) => {
  const { slug, month } = params as { slug: string; month: string };
  const cityWeather = cityWeatherData as Record<string, any>;
  
  const city = citiesData.find(c => c.slug === slug);
  if (!city || !cityWeather[slug]) {
    return { notFound: true };
  }

  // Handle both data structures
  const cityData = cityWeather[slug];
  const monthlyData = cityData.monthly_weather || cityData;
  
  if (!monthlyData[month]) {
    return { notFound: true };
  }

  const monthData = monthlyData[month];
  
  // Convert data to consistent format
  let weatherData: WeatherData;
  
  if (monthData.temperature) {
    // New structure
    weatherData = monthData;
  } else {
    // Old structure - convert to new format
    weatherData = {
      temperature: { high: monthData.temp_high, low: monthData.temp_low },
      rainfall: monthData.rainfall_mm,
      rainyDays: monthData.rainfall_days,
      humidity: monthData.humidity,
      seaTemperature: monthData.sea_temperature || null,
      description: monthData.description,
      events: monthData.events || [],
      pros: monthData.pros || [],
      cons: monthData.cons || []
    };
  }

  const monthsArray = Object.keys(monthNames);
  const currentIndex = monthsArray.indexOf(month);
  
  const prevMonth = currentIndex > 0 ? {
    slug: monthsArray[currentIndex - 1],
    name: monthNames[monthsArray[currentIndex - 1] as keyof typeof monthNames]
  } : null;
  
  const nextMonth = currentIndex < monthsArray.length - 1 ? {
    slug: monthsArray[currentIndex + 1],
    name: monthNames[monthsArray[currentIndex + 1] as keyof typeof monthNames]
  } : null;

  const allMonths = monthsArray.map(m => ({
    slug: m,
    name: monthNames[m as keyof typeof monthNames]
  }));

  return {
    props: {
      city,
      month,
      monthName: monthNames[month as keyof typeof monthNames],
      weatherData,
      prevMonth,
      nextMonth,
      allMonths
    },
    revalidate: 86400
  };
};

export default CityWeatherPage;