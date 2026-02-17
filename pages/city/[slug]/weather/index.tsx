import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import TripcomWidget from '../../../../components/TripcomWidget';
import cityWeatherData from '../../../../data/city-weather.json';
import citiesData from '../../../../data/cities/index.json';

interface CityWeatherIndexProps {
  city: any;
  monthlyWeather: Array<{
    month: string;
    monthName: string;
    temperature: { high: number; low: number };
    rainfall: number;
    description: string;
  }>;
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

const getSeasonColor = (month: string) => {
  const coolSeason = ['november', 'december', 'january', 'february'];
  const hotSeason = ['march', 'april', 'may'];
  const rainySeason = ['june', 'july', 'august', 'september', 'october'];
  
  if (coolSeason.includes(month)) return 'bg-blue-100 border-blue-300';
  if (hotSeason.includes(month)) return 'bg-orange-100 border-orange-300';
  return 'bg-green-100 border-green-300';
};

const getSeasonName = (month: string) => {
  const coolSeason = ['november', 'december', 'january', 'february'];
  const hotSeason = ['march', 'april', 'may'];
  
  if (coolSeason.includes(month)) return 'Cool Season';
  if (hotSeason.includes(month)) return 'Hot Season';
  return 'Rainy Season';
};

const CityWeatherIndex: React.FC<CityWeatherIndexProps> = ({ city, monthlyWeather }) => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: city.name.en, href: `/city/${city.slug}` },
    { name: 'Weather', href: `/city/${city.slug}/weather` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{`${city.name.en} Weather by Month - Complete Climate Guide | Go2 Thailand`}</title>
        <meta name="description" content={`Plan your trip to ${city.name.en} with our complete monthly weather guide. Temperature, rainfall, humidity, and travel tips for each month of the year.`} />
        <meta name="keywords" content={`${city.name.en} weather, ${city.name.en} climate, ${city.name.en} temperature, ${city.name.en} rainfall, ${city.name.en} best time to visit, ${city.name.en} seasons`} />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {city.name.en} Weather & Climate Guide
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Introduction */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Planning your trip to {city.name.en}? Understanding the weather patterns throughout the year is essential for making the most of your visit. 
                {city.name.en} experiences three distinct seasons: the cool season (November-February), hot season (March-May), and rainy season (June-October). 
                Each season offers unique experiences and attractions.
              </p>
            </section>

            {/* Monthly Weather Grid */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Weather by Month</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthlyWeather.map((data) => (
                  <Link key={data.month} href={`/city/${city.slug}/weather/${data.month}`} className={`block p-4 rounded-lg border-2 hover:shadow-lg transition-shadow ${getSeasonColor(data.month)}`}>
                    <h3 className="font-semibold text-lg mb-2">{data.monthName}</h3>
                    <div className="text-sm text-gray-600 mb-2">{getSeasonName(data.month)}</div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">
                        <span className="font-medium">High:</span> {data.temperature.high}°C
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Low:</span> {data.temperature.low}°C
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Rainfall:</span> {data.rainfall}mm
                    </div>
                  </Link>
                ))}
              </div>
            </section>


            {/* Season Overview */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Seasonal Overview</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Cool Season (November - February)</h3>
                  <p className="text-gray-700">
                    The most popular time to visit {city.name.en}. Temperatures are comfortable, rainfall is minimal, and the weather is perfect for sightseeing and outdoor activities.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-2">Hot Season (March - May)</h3>
                  <p className="text-gray-700">
                    The hottest time of year with temperatures often exceeding 35°C. Great for beach activities but can be challenging for extensive sightseeing. Songkran Festival in April brings festive celebrations.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Rainy Season (June - October)</h3>
                  <p className="text-gray-700">
                    Characterized by afternoon showers and occasional heavy rainfall. Despite the rain, there are many sunny periods. Lower tourist numbers mean better prices and less crowded attractions.
                  </p>
                </div>
              </div>
            </section>

            {/* Best Time to Visit */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Best Time to Visit {city.name.en}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">For Perfect Weather:</h3>
                  <p className="text-gray-700">November to February - Cool temperatures and minimal rainfall</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">For Fewer Crowds:</h3>
                  <p className="text-gray-700">May to October - Rainy season brings fewer tourists</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">For Festivals:</h3>
                  <p className="text-gray-700">April (Songkran) and November (Loy Krathong)</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* City Weather Selector */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">🌍 Other Cities Weather</h3>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={city.slug}
                onChange={(e) => window.location.href = `/city/${e.target.value}/weather/`}
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
              <h3 className="text-lg font-semibold mb-4">Book Your Trip</h3>
              <TripcomWidget city={city.name.en} type="searchbox" />
            </div>

            {/* Quick Weather Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Weather Facts</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Hottest Month:</span>
                  <span className="font-medium">April</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Coolest Month:</span>
                  <span className="font-medium">December</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Wettest Month:</span>
                  <span className="font-medium">September</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Driest Month:</span>
                  <span className="font-medium">January</span>
                </li>
              </ul>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Plan Your Visit</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/city/${city.slug}`} className="text-orange-500 hover:text-orange-600">
                    {city.name.en} City Guide
                  </Link>
                </li>
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
              </ul>
            </div>

          </aside>
        </div>

        {/* Booking CTA */}
        <section className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Book Your {city.name.en} Trip
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://trip.tpo.lv/TmObooZ5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🏨 Book Hotels
            </a>
            <a
              href="https://12go.tpo.lv/tNA80urD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              🚌 Book Transport
            </a>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Affiliate links. We may earn a small commission at no extra cost to you.
          </p>
        </section>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cityWeather = cityWeatherData as Record<string, any>;
  const paths = Object.keys(cityWeather).map(slug => ({
    params: { slug }
  }));
  
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<CityWeatherIndexProps> = async ({ params }) => {
  const { slug } = params as { slug: string };
  const cityWeather = cityWeatherData as Record<string, any>;
  
  const city = citiesData.find(c => c.slug === slug);
  if (!city || !cityWeather[slug]) {
    return { notFound: true };
  }

  // Handle both data structures - some cities have nested monthly_weather, others don't
  const cityData = cityWeather[slug];
  const monthlyData = cityData.monthly_weather || cityData;

  const monthlyWeather = Object.entries(monthNames).map(([monthSlug, monthName]) => {
    const data = monthlyData[monthSlug];
    
    // Handle different data structures
    let temperature, rainfall, description;
    
    if (data.temperature) {
      // New structure (ayutthaya, chiang-rai, etc.)
      temperature = data.temperature;
      rainfall = data.rainfall;
      description = data.description;
    } else {
      // Old structure (bangkok, chiang-mai, phuket)
      temperature = { high: data.temp_high, low: data.temp_low };
      rainfall = data.rainfall_mm;
      description = data.description;
    }
    
    return {
      month: monthSlug,
      monthName,
      temperature,
      rainfall,
      description
    };
  });

  return {
    props: {
      city,
      monthlyWeather
    },
    revalidate: 86400
  };
};

export default CityWeatherIndex;