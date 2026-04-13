import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import TripcomWidget from '../../../../components/TripcomWidget';
import SEOHead from '../../../../components/SEOHead';
import { TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';
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

const monthNamesEN: Record<string, string> = {
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

const monthNamesNL: Record<string, string> = {
  'january': 'Januari',
  'february': 'Februari',
  'march': 'Maart',
  'april': 'April',
  'may': 'Mei',
  'june': 'Juni',
  'july': 'Juli',
  'august': 'Augustus',
  'september': 'September',
  'october': 'Oktober',
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
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
  const subId = useSubId();
  const monthNamesLocale = isNl ? monthNamesNL : monthNamesEN;
  const cityName = city.name[lang] || city.name.en;
  const localMonthName = monthNamesLocale[month] || monthName;
  const trackAffiliate = (url: string, placement: string) =>
    withPlacementSubId(url, subId, placement);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: cityName, href: `/city/${city.slug}` },
    { name: isNl ? 'Weer' : 'Weather', href: `/city/${city.slug}/weather` },
    { name: localMonthName, href: `/city/${city.slug}/weather/${month}` }
  ];

  return (
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title={isNl
          ? `${cityName} Weer in ${localMonthName} 2026: Temperaturen, Regen & Reistips`
          : `${cityName} Weather in ${monthName} 2026: Temperatures, Rain & Travel Tips`}
        description={isNl
          ? `${cityName} in ${localMonthName}: ${weatherData.temperature.high}°C max, ${weatherData.rainfall}mm regen & ${weatherData.humidity}% luchtvochtigheid. Is het de moeite waard om te bezoeken? Inpaktips inbegrepen.`
          : `${cityName} in ${monthName}: ${weatherData.temperature.high}°C highs, ${weatherData.rainfall}mm rain & ${weatherData.humidity}% humidity. Is it worth visiting? Packing tips inside.`}
      >
        <meta name="robots" content="noindex, follow" />
        <meta name="keywords" content={isNl
          ? `${cityName} weer ${localMonthName}, ${cityName} temperatuur ${localMonthName}, ${cityName} regenval ${localMonthName}, ${cityName} klimaat ${localMonthName}, ${cityName} bezoeken ${localMonthName}`
          : `${cityName} weather ${monthName}, ${cityName} temperature ${monthName}, ${cityName} rainfall ${monthName}, ${cityName} climate ${monthName}, visit ${cityName} ${monthName}`} />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-8">
          {isNl ? `${cityName} Weer in ${localMonthName}` : `${cityName} Weather in ${monthName}`}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Weather Overview */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold font-heading mb-4">{isNl ? 'Weeroverzicht' : 'Weather Overview'}</h2>
              <p className="text-gray-700 mb-6">{weatherData.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {weatherData.temperature.high}°C
                  </div>
                  <div className="text-sm text-gray-600">{isNl ? 'Gem. Max' : 'Avg High'}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {weatherData.temperature.low}°C
                  </div>
                  <div className="text-sm text-gray-600">{isNl ? 'Gem. Min' : 'Avg Low'}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">
                    {weatherData.rainfall}mm
                  </div>
                  <div className="text-sm text-gray-600">{isNl ? 'Regenval' : 'Rainfall'}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">
                    {weatherData.humidity}%
                  </div>
                  <div className="text-sm text-gray-600">{isNl ? 'Luchtvochtigheid' : 'Humidity'}</div>
                </div>
              </div>

              {weatherData.seaTemperature && (
                <div className="mt-4 p-4 bg-cyan-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-cyan-600">
                    {weatherData.seaTemperature}°C
                  </div>
                  <div className="text-sm text-gray-600">{isNl ? 'Zeetemperatuur' : 'Sea Temperature'}</div>
                </div>
              )}
            </section>


            {/* Pros and Cons */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold font-heading mb-4">{isNl ? `Voor- & Nadelen van een Bezoek in ${localMonthName}` : `Pros & Cons of Visiting in ${monthName}`}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold font-heading text-green-600 mb-3">{isNl ? 'Voordelen' : 'Advantages'}</h3>
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
                  <h3 className="text-lg font-semibold font-heading text-red-600 mb-3">{isNl ? 'Aandachtspunten' : 'Considerations'}</h3>
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
              <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold font-heading mb-4">{isNl ? 'Evenementen & Festivals' : 'Events & Festivals'}</h2>
                <ul className="space-y-3">
                  {weatherData.events.map((event, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl"></span>
                      <span className="text-gray-700">{event}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Book Your Trip - Affiliate CTA */}
            <div className="bg-surface-cream rounded-2xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 text-center">
                {isNl ? `Boek Je Reis naar ${cityName}` : `Book Your Trip to ${cityName}`}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                {isNl
                  ? `Plan je bezoek in ${localMonthName} met de beste deals voor hotels en transport.`
                  : `Plan your ${monthName} visit with the best deals on hotels and transport.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={trackAffiliate(TRIP_GENERIC, 'month-hotels')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {isNl ? 'Hotels op Trip.com' : 'Hotels on Trip.com'}
                </a>
                <a
                  href={trackAffiliate(TWELVEGO_GENERIC, 'month-transport')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {isNl ? 'Transport op 12Go' : 'Transport on 12Go'}
                </a>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                {isNl
                  ? 'Affiliate melding: We kunnen een commissie verdienen wanneer je boekt via onze partnerlinks, zonder extra kosten voor jou.'
                  : 'Affiliate disclosure: We may earn a commission when you book through our partner links, at no extra cost to you.'}
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex justify-between items-center bg-white rounded-2xl shadow-md p-6">
              {prevMonth ? (
                <Link href={`/city/${city.slug}/weather/${prevMonth.slug}`} className="flex items-center text-thailand-red hover:text-thailand-blue">
                  <span className="mr-2">←</span>
                  <span>{prevMonth.name}</span>
                </Link>
              ) : (
                <div></div>
              )}
              <Link href={`/city/${city.slug}/weather`} className="text-gray-600 hover:text-gray-800">
                {isNl ? 'Alle Maanden' : 'All Months'}
              </Link>
              {nextMonth ? (
                <Link href={`/city/${city.slug}/weather/${nextMonth.slug}`} className="flex items-center text-thailand-red hover:text-thailand-blue">
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
            <div className="lg:sticky lg:top-4 space-y-6">
            {/* City Weather Selector */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? 'Weer in Andere Steden' : 'Other Cities Weather'}</h3>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-thailand-red"
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
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? 'Plan Je Reis' : 'Plan Your Trip'}</h3>
              <TripcomWidget city={city.name.en} type="hotels" />
            </div>

            {/* Monthly Overview */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? `${cityName} Weer per Maand` : `${cityName} Weather by Month`}</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {allMonths.map((m) => (
                  <Link key={m.slug} href={`/city/${city.slug}/weather/${m.slug}`} className={`text-center p-2 rounded ${
                    m.slug === month 
                      ? 'bg-thailand-red text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    {m.name.slice(0, 3)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? `Ontdek ${cityName}` : `Explore ${cityName}`}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/city/${city.slug}/attractions`} className="text-thailand-red hover:text-thailand-blue">
                    {isNl ? 'Top Bezienswaardigheden' : 'Top Attractions'}
                  </Link>
                </li>
                <li>
                  <Link href={`/city/${city.slug}/hotels`} className="text-thailand-red hover:text-thailand-blue">
                    {isNl ? 'Waar Verblijven' : 'Where to Stay'}
                  </Link>
                </li>
                <li>
                  <Link href={`/city/${city.slug}/food`} className="text-thailand-red hover:text-thailand-blue">
                    {isNl ? 'Eten & Restaurants' : 'Food & Dining'}
                  </Link>
                </li>
                <li>
                  <Link href={`/thailand-in/${month}`} className="text-thailand-red hover:text-thailand-blue">
                    {isNl ? `Thailand in ${localMonthName}` : `Thailand in ${monthName}`}
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
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<CityWeatherPageProps> = async ({ params, locale }) => {
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

  const monthsArray = Object.keys(monthNamesEN);
  const currentIndex = monthsArray.indexOf(month);
  
  const prevMonth = currentIndex > 0 ? {
    slug: monthsArray[currentIndex - 1],
    name: monthNamesEN[monthsArray[currentIndex - 1]]
  } : null;
  
  const nextMonth = currentIndex < monthsArray.length - 1 ? {
    slug: monthsArray[currentIndex + 1],
    name: monthNamesEN[monthsArray[currentIndex + 1]]
  } : null;

  const allMonths = monthsArray.map(m => ({
    slug: m,
    name: monthNamesEN[m]
  }));

  return {
    props: {
      city,
      month,
      monthName: monthNamesEN[month],
      weatherData,
      prevMonth,
      nextMonth,
      allMonths
    },
    revalidate: 604800
  };
};

export default CityWeatherPage;
