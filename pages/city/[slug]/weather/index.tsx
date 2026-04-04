import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import TripcomWidget from '../../../../components/TripcomWidget';
import SEOHead from '../../../../components/SEOHead';
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

const getSeasonColor = (month: string) => {
  const coolSeason = ['november', 'december', 'january', 'february'];
  const hotSeason = ['march', 'april', 'may'];
  const rainySeason = ['june', 'july', 'august', 'september', 'october'];
  
  if (coolSeason.includes(month)) return 'bg-blue-100 border-blue-300';
  if (hotSeason.includes(month)) return 'bg-orange-100 border-orange-300';
  return 'bg-green-100 border-green-300';
};

const getSeasonName = (month: string, isNl: boolean) => {
  const coolSeason = ['november', 'december', 'january', 'february'];
  const hotSeason = ['march', 'april', 'may'];

  if (coolSeason.includes(month)) return isNl ? 'Koele Seizoen' : 'Cool Season';
  if (hotSeason.includes(month)) return isNl ? 'Hete Seizoen' : 'Hot Season';
  return isNl ? 'Regenseizoen' : 'Rainy Season';
};

const CityWeatherIndex: React.FC<CityWeatherIndexProps> = ({ city, monthlyWeather }) => {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
  const monthNames = isNl ? monthNamesNL : monthNamesEN;
  const cityName = city.name[lang] || city.name.en;

  const breadcrumbs = [
    { name: isNl ? 'Home' : 'Home', href: '/' },
    { name: cityName, href: `/city/${city.slug}` },
    { name: isNl ? 'Weer' : 'Weather', href: `/city/${city.slug}/weather` }
  ];

  return (
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title={isNl
          ? `${cityName} Weer 2026 — Beste Reistijd per Maand`
          : `${cityName} Weather 2026 — Best Time to Visit by Month`}
        description={isNl
          ? `${cityName} weergids: maandelijkse temperaturen, regenval en beste reistijd in 2026. Plan je Thailand reis met seizoensgebonden tips.`
          : `${cityName} weather guide: monthly temperatures, rainfall, and best time to visit in 2026. Plan your Thailand trip with season-by-season tips.`}
      >
        <meta name="keywords" content={isNl
          ? `${cityName} weer, ${cityName} klimaat, ${cityName} temperatuur, ${cityName} regenval, ${cityName} beste reistijd, ${cityName} seizoenen`
          : `${cityName} weather, ${cityName} climate, ${cityName} temperature, ${cityName} rainfall, ${cityName} best time to visit, ${cityName} seasons`} />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-8">
          {isNl ? `${cityName} Weer & Klimaatgids` : `${cityName} Weather & Climate Guide`}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Introduction */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                {isNl
                  ? `Ben je je reis naar ${cityName} aan het plannen? Het begrijpen van de weerpatronen gedurende het jaar is essentieel om het meeste uit je bezoek te halen. ${cityName} kent drie verschillende seizoenen: het koele seizoen (november-februari), het hete seizoen (maart-mei) en het regenseizoen (juni-oktober). Elk seizoen biedt unieke ervaringen en bezienswaardigheden.`
                  : `Planning your trip to ${cityName}? Understanding the weather patterns throughout the year is essential for making the most of your visit. ${cityName} experiences three distinct seasons: the cool season (November-February), hot season (March-May), and rainy season (June-October). Each season offers unique experiences and attractions.`}
              </p>
            </section>

            {/* Monthly Weather Grid */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold font-heading mb-6">{isNl ? 'Weer per Maand' : 'Weather by Month'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthlyWeather.map((data) => (
                  <Link key={data.month} href={`/city/${city.slug}/weather/${data.month}`} className={`block p-4 rounded-lg border-2 hover:shadow-lg transition-shadow ${getSeasonColor(data.month)}`}>
                    <h3 className="font-semibold font-heading text-lg mb-2">{monthNames[data.month] || data.monthName}</h3>
                    <div className="text-sm text-gray-600 mb-2">{getSeasonName(data.month, isNl)}</div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">
                        <span className="font-medium">{isNl ? 'Max:' : 'High:'}</span> {data.temperature.high}°C
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{isNl ? 'Min:' : 'Low:'}</span> {data.temperature.low}°C
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{isNl ? 'Regenval:' : 'Rainfall:'}</span> {data.rainfall}mm
                    </div>
                  </Link>
                ))}
              </div>
            </section>


            {/* Season Overview */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold font-heading mb-6">{isNl ? 'Seizoensoverzicht' : 'Seasonal Overview'}</h2>

              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold font-heading text-blue-800 mb-2">{isNl ? 'Koele Seizoen (November - Februari)' : 'Cool Season (November - February)'}</h3>
                  <p className="text-gray-700">
                    {isNl
                      ? `De populairste tijd om ${cityName} te bezoeken. De temperaturen zijn aangenaam, er valt weinig regen en het weer is perfect voor sightseeing en buitenactiviteiten.`
                      : `The most popular time to visit ${cityName}. Temperatures are comfortable, rainfall is minimal, and the weather is perfect for sightseeing and outdoor activities.`}
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-xl font-semibold font-heading text-orange-800 mb-2">{isNl ? 'Hete Seizoen (Maart - Mei)' : 'Hot Season (March - May)'}</h3>
                  <p className="text-gray-700">
                    {isNl
                      ? 'De warmste tijd van het jaar met temperaturen die regelmatig boven de 35°C uitkomen. Ideaal voor strandactiviteiten maar uitdagend voor uitgebreid sightseeing. Het Songkran Festival in april brengt feestelijke vieringen.'
                      : 'The hottest time of year with temperatures often exceeding 35°C. Great for beach activities but can be challenging for extensive sightseeing. Songkran Festival in April brings festive celebrations.'}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-xl font-semibold font-heading text-green-800 mb-2">{isNl ? 'Regenseizoen (Juni - Oktober)' : 'Rainy Season (June - October)'}</h3>
                  <p className="text-gray-700">
                    {isNl
                      ? 'Gekenmerkt door middagbuien en af en toe hevige regenval. Ondanks de regen zijn er veel zonnige periodes. Minder toeristen betekent betere prijzen en minder drukke bezienswaardigheden.'
                      : 'Characterized by afternoon showers and occasional heavy rainfall. Despite the rain, there are many sunny periods. Lower tourist numbers mean better prices and less crowded attractions.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Best Time to Visit */}
            <section className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold font-heading mb-4">{isNl ? `Beste Reistijd voor ${cityName}` : `Best Time to Visit ${cityName}`}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold font-heading text-lg mb-2">{isNl ? 'Voor Perfect Weer:' : 'For Perfect Weather:'}</h3>
                  <p className="text-gray-700">{isNl ? 'November tot februari - Koele temperaturen en minimale regenval' : 'November to February - Cool temperatures and minimal rainfall'}</p>
                </div>
                <div>
                  <h3 className="font-semibold font-heading text-lg mb-2">{isNl ? 'Voor Minder Drukte:' : 'For Fewer Crowds:'}</h3>
                  <p className="text-gray-700">{isNl ? 'Mei tot oktober - Het regenseizoen trekt minder toeristen' : 'May to October - Rainy season brings fewer tourists'}</p>
                </div>
                <div>
                  <h3 className="font-semibold font-heading text-lg mb-2">{isNl ? 'Voor Festivals:' : 'For Festivals:'}</h3>
                  <p className="text-gray-700">{isNl ? 'April (Songkran) en november (Loy Krathong)' : 'April (Songkran) and November (Loy Krathong)'}</p>
                </div>
              </div>
            </section>
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
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? 'Boek Je Reis' : 'Book Your Trip'}</h3>
              <TripcomWidget city={city.name.en} type="searchbox" />
            </div>

            {/* Quick Weather Stats */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? 'Snelle Weerfeiten' : 'Quick Weather Facts'}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">{isNl ? 'Warmste Maand:' : 'Hottest Month:'}</span>
                  <span className="font-medium">{isNl ? 'April' : 'April'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">{isNl ? 'Koelste Maand:' : 'Coolest Month:'}</span>
                  <span className="font-medium">December</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">{isNl ? 'Natste Maand:' : 'Wettest Month:'}</span>
                  <span className="font-medium">September</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">{isNl ? 'Droogste Maand:' : 'Driest Month:'}</span>
                  <span className="font-medium">{isNl ? 'Januari' : 'January'}</span>
                </li>
              </ul>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? 'Plan Je Bezoek' : 'Plan Your Visit'}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/city/${city.slug}`} className="text-thailand-red hover:text-thailand-blue">
                    {isNl ? `${cityName} Stadsgids` : `${cityName} City Guide`}
                  </Link>
                </li>
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
              </ul>
            </div>

            </div>
          </aside>
        </div>

        {/* Booking CTA */}
        <section className="mt-12 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold font-heading text-gray-900 mb-4 text-center">
            {isNl ? `Boek Je ${cityName} Reis` : `Book Your ${cityName} Trip`}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://trip.tpo.lv/TmObooZ5?subid=city-weather"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-thailand-blue text-white py-3 px-6 rounded-xl font-semibold hover:bg-thailand-blue-600 transition-colors"
            >
              {isNl ? 'Boek Hotels' : 'Book Hotels'}
            </a>
            <a
              href="https://12go.tpo.lv/tNA80urD?subid=city-weather"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-thailand-blue text-white py-3 px-6 rounded-xl hover:bg-thailand-blue-600 font-semibold transition-colors"
            >
              {isNl ? 'Boek Transport' : 'Book Transport'}
            </a>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            {isNl ? 'Affiliate links. We kunnen een kleine commissie verdienen zonder extra kosten voor jou.' : 'Affiliate links. We may earn a small commission at no extra cost to you.'}
          </p>
        </section>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
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

  const monthlyWeather = Object.entries(monthNamesEN).map(([monthSlug, monthName]) => {
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
    revalidate: 604800
  };
};

export default CityWeatherIndex;