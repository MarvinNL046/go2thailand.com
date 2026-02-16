import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import monthlyGuides from '../../data/monthly-guides.json';

interface MonthGuide {
  month: string;
  slug: string;
  weather: {
    overview: string;
    temperature: {
      central: string;
    };
    rainfall: string;
  };
  highlights: string[];
}

interface ThailandWeatherPageProps {
  months: MonthGuide[];
}

export default function ThailandWeatherPage({ months }: ThailandWeatherPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Travel Guides', href: '/travel-guides' },
    { name: 'Thailand Weather by Month', href: '/travel-guides/thailand-weather' }
  ];

  return (
    <>
      <Head>
        <title>Thailand Weather by Month - Complete Climate Guide 2026</title>
        <meta name="description" content="Plan your trip with our Thailand weather guide. Monthly climate breakdown, best time to visit, rainfall patterns, and seasonal travel tips." />
        <meta name="keywords" content="Thailand weather, Thailand climate, best time to visit Thailand, Thailand seasons, Thailand rainfall" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold text-white">
          <div className="container-custom py-16">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Thailand Weather by Month
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                Find the perfect time for your Thailand adventure with our complete monthly weather guide
              </p>
            </div>
          </div>
        </section>

        {/* Season Overview */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Thailand's Three Seasons
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-3">❄️</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cool Season</h3>
                  <p className="text-sm text-gray-600 mb-2">November - February</p>
                  <p className="text-gray-700">Best weather, minimal rain, peak tourist season</p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-3">☀️</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hot Season</h3>
                  <p className="text-sm text-gray-600 mb-2">March - May</p>
                  <p className="text-gray-700">High temperatures, Songkran festival, fewer tourists</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-3">🌧️</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rainy Season</h3>
                  <p className="text-sm text-gray-600 mb-2">June - October</p>
                  <p className="text-gray-700">Daily showers, lush landscapes, best deals</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Choose Your Perfect Month
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {months.map((month) => (
                <Link 
                  key={month.slug} 
                  href={`/thailand-in/${month.slug}/`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-thailand-blue transition-colors">
                        {month.month}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3 text-sm">
                        <span className="text-gray-600">🌡️ {month.weather.temperature.central}</span>
                        <span className="text-gray-600">💧 {month.weather.rainfall}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {month.weather.overview}
                      </p>
                      
                      <div className="space-y-1">
                        {month.highlights.slice(0, 2).map((highlight, index) => (
                          <p key={index} className="text-xs text-gray-500 flex items-start">
                            <span className="text-green-500 mr-1">•</span>
                            {highlight}
                          </p>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-thailand-blue font-medium text-sm group-hover:underline">
                        View {month.month} Guide →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Quick Weather Reference
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-thailand-blue text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Month</th>
                    <th className="px-6 py-3 text-center">Season</th>
                    <th className="px-6 py-3 text-center">Temperature</th>
                    <th className="px-6 py-3 text-center">Rainfall</th>
                    <th className="px-6 py-3 text-center">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">January</td>
                    <td className="px-6 py-4 text-center">Cool</td>
                    <td className="px-6 py-4 text-center">20-32°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="px-6 py-4">Beach holidays, sightseeing</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">February</td>
                    <td className="px-6 py-4 text-center">Cool</td>
                    <td className="px-6 py-4 text-center">22-33°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="px-6 py-4">All activities</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">March</td>
                    <td className="px-6 py-4 text-center">Hot</td>
                    <td className="px-6 py-4 text-center">25-36°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐⭐⭐</td>
                    <td className="px-6 py-4">Fewer crowds</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">April</td>
                    <td className="px-6 py-4 text-center">Hot</td>
                    <td className="px-6 py-4 text-center">28-39°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐⭐</td>
                    <td className="px-6 py-4">Songkran Festival</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">May</td>
                    <td className="px-6 py-4 text-center">Hot/Rainy</td>
                    <td className="px-6 py-4 text-center">26-35°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐</td>
                    <td className="px-6 py-4">Budget travel</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">June</td>
                    <td className="px-6 py-4 text-center">Rainy</td>
                    <td className="px-6 py-4 text-center">26-33°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐</td>
                    <td className="px-6 py-4">Green landscapes</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">July</td>
                    <td className="px-6 py-4 text-center">Rainy</td>
                    <td className="px-6 py-4 text-center">26-32°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐</td>
                    <td className="px-6 py-4">Cultural experiences</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">August</td>
                    <td className="px-6 py-4 text-center">Rainy</td>
                    <td className="px-6 py-4 text-center">26-32°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐</td>
                    <td className="px-6 py-4">Low prices</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">September</td>
                    <td className="px-6 py-4 text-center">Rainy</td>
                    <td className="px-6 py-4 text-center">25-31°C</td>
                    <td className="px-6 py-4 text-center">⭐</td>
                    <td className="px-6 py-4">Lowest prices</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">October</td>
                    <td className="px-6 py-4 text-center">Rainy/Cool</td>
                    <td className="px-6 py-4 text-center">25-32°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐⭐</td>
                    <td className="px-6 py-4">Shoulder season</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">November</td>
                    <td className="px-6 py-4 text-center">Cool</td>
                    <td className="px-6 py-4 text-center">23-32°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐⭐⭐</td>
                    <td className="px-6 py-4">Loy Krathong</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">December</td>
                    <td className="px-6 py-4 text-center">Cool</td>
                    <td className="px-6 py-4 text-center">22-31°C</td>
                    <td className="px-6 py-4 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="px-6 py-4">Holiday season</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              ⭐ = Rainfall level (fewer stars = more rain)
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const months = Object.values(monthlyGuides);
  
  return {
    props: {
      months
    }
  };
};