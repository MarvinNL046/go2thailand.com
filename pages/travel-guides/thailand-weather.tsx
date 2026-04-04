import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
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
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Reisgidsen' : 'Travel Guides', href: '/travel-guides' },
    { name: isNl ? 'Thailand Weer per Maand' : 'Thailand Weather by Month', href: '/travel-guides/thailand-weather' }
  ];

  return (
    <>
      <SEOHead
        title={isNl ? 'Thailand Weer per Maand - Complete Klimaatgids 2026' : 'Thailand Weather by Month - Complete Climate Guide 2026'}
        description={isNl
          ? 'Plan je reis met onze Thailand weergids. Maandelijks klimaatoverzicht, beste reistijd, regenvalpatronen en seizoenstips.'
          : 'Plan your trip with our Thailand weather guide. Monthly climate breakdown, best time to visit, rainfall patterns, and seasonal travel tips.'}
      >
        <meta name="keywords" content={isNl
          ? 'Thailand weer, Thailand klimaat, beste reistijd Thailand, Thailand seizoenen, Thailand regenval'
          : 'Thailand weather, Thailand climate, best time to visit Thailand, Thailand seasons, Thailand rainfall'} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-4xl mx-auto">
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Klimaatgids' : 'Climate Guide'}</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {isNl ? 'Thailand Weer per Maand' : 'Thailand Weather by Month'}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {isNl
                  ? 'Vind het perfecte moment voor je Thailand avontuur met onze complete maandelijkse weergids'
                  : 'Find the perfect time for your Thailand adventure with our complete monthly weather guide'}
              </p>
            </div>
          </div>
        </section>

        {/* Season Overview */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="section-label text-center">{isNl ? 'Seizoenen' : 'Seasons'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {isNl ? 'De Drie Seizoenen van Thailand' : "Thailand's Three Seasons"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Koele Seizoen' : 'Cool Season'}</h3>
                  <p className="text-sm text-gray-600 mb-2">{isNl ? 'November - Februari' : 'November - February'}</p>
                  <p className="text-gray-700">{isNl ? 'Beste weer, minimale regen, hoogseizoen' : 'Best weather, minimal rain, peak tourist season'}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Hete Seizoen' : 'Hot Season'}</h3>
                  <p className="text-sm text-gray-600 mb-2">{isNl ? 'Maart - Mei' : 'March - May'}</p>
                  <p className="text-gray-700">{isNl ? 'Hoge temperaturen, Songkran festival, minder toeristen' : 'High temperatures, Songkran festival, fewer tourists'}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Regenseizoen' : 'Rainy Season'}</h3>
                  <p className="text-sm text-gray-600 mb-2">{isNl ? 'Juni - Oktober' : 'June - October'}</p>
                  <p className="text-gray-700">{isNl ? 'Dagelijkse buien, weelderige landschappen, beste deals' : 'Daily showers, lush landscapes, best deals'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Maandelijkse Gids' : 'Monthly Guide'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {isNl ? 'Kies Je Perfecte Maand' : 'Choose Your Perfect Month'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {months.map((month) => (
                <Link
                  key={month.slug}
                  href={`/thailand-in/${month.slug}/`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-thailand-blue transition-colors">
                        {month.month}
                      </h3>

                      <div className="flex items-center justify-between mb-3 text-sm">
                        <span className="text-gray-600">{month.weather.temperature.central}</span>
                        <span className="text-gray-600">{month.weather.rainfall}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {month.weather.overview}
                      </p>

                      <div className="space-y-1">
                        {month.highlights.slice(0, 2).map((highlight, index) => (
                          <p key={index} className="text-xs text-gray-500 flex items-start">
                            <span className="text-green-500 mr-1">&bull;</span>
                            {highlight}
                          </p>
                        ))}
                      </div>

                      <div className="mt-4 text-thailand-blue font-medium text-sm group-hover:underline">
                        {isNl ? `Bekijk ${month.month} Gids \u2192` : `View ${month.month} Guide \u2192`}
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
            <p className="section-label text-center">{isNl ? 'Referentie' : 'Reference'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {isNl ? 'Snelle Weerreferentie' : 'Quick Weather Reference'}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-md">
                <thead className="bg-thailand-blue text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">{isNl ? 'Maand' : 'Month'}</th>
                    <th className="px-6 py-3 text-center">{isNl ? 'Seizoen' : 'Season'}</th>
                    <th className="px-6 py-3 text-center">{isNl ? 'Temperatuur' : 'Temperature'}</th>
                    <th className="px-6 py-3 text-center">{isNl ? 'Regenval' : 'Rainfall'}</th>
                    <th className="px-6 py-3 text-center">{isNl ? 'Beste Voor' : 'Best For'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">{isNl ? 'Januari' : 'January'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Koel' : 'Cool'}</td>
                    <td className="px-6 py-4 text-center">20-32&deg;C</td>
                    <td className="px-6 py-4 text-center">*****</td>
                    <td className="px-6 py-4">{isNl ? 'Strandvakanties, sightseeing' : 'Beach holidays, sightseeing'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">{isNl ? 'Februari' : 'February'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Koel' : 'Cool'}</td>
                    <td className="px-6 py-4 text-center">22-33&deg;C</td>
                    <td className="px-6 py-4 text-center">*****</td>
                    <td className="px-6 py-4">{isNl ? 'Alle activiteiten' : 'All activities'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">{isNl ? 'Maart' : 'March'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Heet' : 'Hot'}</td>
                    <td className="px-6 py-4 text-center">25-36&deg;C</td>
                    <td className="px-6 py-4 text-center">****</td>
                    <td className="px-6 py-4">{isNl ? 'Minder drukte' : 'Fewer crowds'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">{isNl ? 'April' : 'April'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Heet' : 'Hot'}</td>
                    <td className="px-6 py-4 text-center">28-39&deg;C</td>
                    <td className="px-6 py-4 text-center">***</td>
                    <td className="px-6 py-4">Songkran Festival</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">{isNl ? 'Mei' : 'May'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Heet/Regen' : 'Hot/Rainy'}</td>
                    <td className="px-6 py-4 text-center">26-35&deg;C</td>
                    <td className="px-6 py-4 text-center">**</td>
                    <td className="px-6 py-4">{isNl ? 'Budget reizen' : 'Budget travel'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">{isNl ? 'Juni' : 'June'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Regen' : 'Rainy'}</td>
                    <td className="px-6 py-4 text-center">26-33&deg;C</td>
                    <td className="px-6 py-4 text-center">**</td>
                    <td className="px-6 py-4">{isNl ? 'Groene landschappen' : 'Green landscapes'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">{isNl ? 'Juli' : 'July'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Regen' : 'Rainy'}</td>
                    <td className="px-6 py-4 text-center">26-32&deg;C</td>
                    <td className="px-6 py-4 text-center">**</td>
                    <td className="px-6 py-4">{isNl ? 'Culturele ervaringen' : 'Cultural experiences'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">{isNl ? 'Augustus' : 'August'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Regen' : 'Rainy'}</td>
                    <td className="px-6 py-4 text-center">26-32&deg;C</td>
                    <td className="px-6 py-4 text-center">**</td>
                    <td className="px-6 py-4">{isNl ? 'Lage prijzen' : 'Low prices'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">September</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Regen' : 'Rainy'}</td>
                    <td className="px-6 py-4 text-center">25-31&deg;C</td>
                    <td className="px-6 py-4 text-center">*</td>
                    <td className="px-6 py-4">{isNl ? 'Laagste prijzen' : 'Lowest prices'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">{isNl ? 'Oktober' : 'October'}</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Regen/Koel' : 'Rainy/Cool'}</td>
                    <td className="px-6 py-4 text-center">25-32&deg;C</td>
                    <td className="px-6 py-4 text-center">***</td>
                    <td className="px-6 py-4">{isNl ? 'Tussenseizoen' : 'Shoulder season'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">November</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Koel' : 'Cool'}</td>
                    <td className="px-6 py-4 text-center">23-32&deg;C</td>
                    <td className="px-6 py-4 text-center">****</td>
                    <td className="px-6 py-4">Loy Krathong</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">December</td>
                    <td className="px-6 py-4 text-center">{isNl ? 'Koel' : 'Cool'}</td>
                    <td className="px-6 py-4 text-center">22-31&deg;C</td>
                    <td className="px-6 py-4 text-center">*****</td>
                    <td className="px-6 py-4">{isNl ? 'Vakantieseizoen' : 'Holiday season'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              {isNl
                ? '* = Regenval niveau (minder sterren = meer regen)'
                : '* = Rainfall level (fewer stars = more rain)'}
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
