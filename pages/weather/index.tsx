import React from 'react';
import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import citiesData from '../../data/cities/index.json';

interface WeatherIndexProps {
  cities: Array<{
    id: number;
    slug: string;
    name: { en: string; nl: string };
    region: string;
  }>;
}

const monthlyHighlights = [
  { month: 'january', name: 'January', description: 'Cool & Dry - Peak Season', emoji: '' },
  { month: 'february', name: 'February', description: 'Perfect Weather', emoji: '' },
  { month: 'march', name: 'March', description: 'Getting Warmer', emoji: '' },
  { month: 'april', name: 'April', description: 'Songkran Festival', emoji: '' },
  { month: 'may', name: 'May', description: 'Rainy Season Begins', emoji: '' },
  { month: 'june', name: 'June', description: 'Green Season', emoji: '' },
  { month: 'july', name: 'July', description: 'Peak Rainy Season', emoji: '' },
  { month: 'august', name: 'August', description: 'Monsoon Season', emoji: '' },
  { month: 'september', name: 'September', description: 'Wettest Month', emoji: '' },
  { month: 'october', name: 'October', description: 'Rain Decreasing', emoji: '' },
  { month: 'november', name: 'November', description: 'Loy Krathong - Cool Returns', emoji: '' },
  { month: 'december', name: 'December', description: 'Peak Cool Season', emoji: '' }
];

const weatherFaqs = [
  {
    question: 'What is the best month to visit Thailand?',
    answer: 'The best months to visit Thailand are November through February, during the cool and dry season. December and January offer the most comfortable weather across the country with lower humidity and minimal rainfall.'
  },
  {
    question: 'Does it rain every day during monsoon season in Thailand?',
    answer: 'No, it does not rain all day during monsoon season (June-October). Typically you will experience short but heavy afternoon showers lasting 1-2 hours, with sunshine the rest of the day. Many travelers enjoy this season for fewer crowds and lower prices.'
  },
  {
    question: 'What is the hottest month in Thailand?',
    answer: 'April is the hottest month in Thailand, with temperatures regularly reaching 38-40°C (100-104°F) in central and northern regions. The Songkran water festival in mid-April helps cool things down, making it a fun time to visit despite the heat.'
  },
  {
    question: 'Is Thailand weather the same everywhere?',
    answer: 'No, Thailand has distinct regional weather patterns. Northern Thailand (Chiang Mai) has cooler winters and distinct seasons. Central Thailand (Bangkok) is hot year-round. The southern coasts have different monsoon seasons: the Andaman coast (Phuket, Krabi) is wettest June-October, while the Gulf coast (Koh Samui) is wettest October-December.'
  },
  {
    question: 'Can I visit Thai islands during rainy season?',
    answer: 'Yes, but choose your coast wisely. The Gulf islands (Koh Samui, Koh Phangan, Koh Tao) have their best weather from January to September, making them ideal during the traditional rainy season. The Andaman islands (Phuket, Koh Phi Phi, Koh Lanta) are best from November to April.'
  },
  {
    question: 'What should I pack for Thailand weather?',
    answer: 'Pack lightweight, breathable clothing year-round. Bring a light rain jacket or umbrella regardless of season. During the cool season (November-February), pack a light sweater for northern Thailand evenings. Sunscreen and a hat are essential in every season due to strong tropical UV rays.'
  }
];

const WeatherIndex: React.FC<WeatherIndexProps> = ({ cities }) => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Weather Guide', href: '/weather' }
  ];

  // Group cities by region
  const citiesByRegion = cities.reduce((acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = [];
    }
    acc[city.region].push(city);
    return acc;
  }, {} as Record<string, typeof cities>);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={`Thailand Weather Guide 2026 | Go2Thailand`}
        description="Complete Thailand weather guide. Check weather conditions, temperature, and rainfall for all major Thai cities. Plan your trip with monthly climate information."
      >
        <meta name="keywords" content="Thailand weather, Thailand climate, Thai cities weather, best time visit Thailand, Thailand seasons, Thailand temperature" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": weatherFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Thailand Weather Guide
        </h1>

        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Planning your Thailand adventure? Understanding the weather is key to a perfect trip. 
            Thailand has three main seasons: Cool (November-February), Hot (March-May), and Rainy (June-October). 
            Each region and city has its own weather patterns. Use this guide to find the best time to visit each destination.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Monthly Overview */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Thailand Weather by Month</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monthlyHighlights.map((month) => (
                  <Link 
                    key={month.month} 
                    href={`/thailand-in/${month.month}/`}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow hover:border-orange-300"
                  >
                    <span className="text-3xl mr-4">{month.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{month.name}</h3>
                      <p className="text-sm text-gray-600">{month.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>


            {/* Cities by Region */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">City Weather Guides</h2>

              {Object.entries(citiesByRegion).map(([region, regionCities]) => (
                <div key={region} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">
                      {region === 'Northern' && ''}
                      {region === 'Central' && ''}
                      {region === 'Southern' && ''}
                    </span>
                    {region} Thailand
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {regionCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/city/${city.slug}/weather/`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group"
                      >
                        <span className="font-medium text-gray-700 group-hover:text-orange-600">
                          {city.name.en}
                        </span>
                        <span className="text-orange-500 group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {weatherFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-4 space-y-6">
            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Weather Tips</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2"></span>
                  <div>
                    <strong>Cool Season (Nov-Feb):</strong> Best weather, peak prices
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2"></span>
                  <div>
                    <strong>Hot Season (Mar-May):</strong> Very hot, Songkran in April
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2"></span>
                  <div>
                    <strong>Rainy Season (Jun-Oct):</strong> Afternoon showers, fewer tourists
                  </div>
                </li>
              </ul>
            </div>

            {/* Best Times to Visit */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Best Times to Visit</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-gray-800">For Perfect Weather:</h4>
                  <p className="text-gray-600">November - February</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">For Fewer Crowds:</h4>
                  <p className="text-gray-600">May - October</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">For Beaches:</h4>
                  <p className="text-gray-600">December - March (West Coast)</p>
                  <p className="text-gray-600">January - September (East Coast)</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">For Festivals:</h4>
                  <p className="text-gray-600">April (Songkran)</p>
                  <p className="text-gray-600">November (Loy Krathong)</p>
                </div>
              </div>
            </div>

            {/* Regional Differences */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Regional Differences</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong className="text-gray-800">North:</strong>
                  <span className="text-gray-600"> Cooler, distinct seasons</span>
                </li>
                <li>
                  <strong className="text-gray-800">Central:</strong>
                  <span className="text-gray-600"> Hot, typical tropical</span>
                </li>
                <li>
                  <strong className="text-gray-800">South East:</strong>
                  <span className="text-gray-600"> Different rain pattern</span>
                </li>
                <li>
                  <strong className="text-gray-800">South West:</strong>
                  <span className="text-gray-600"> Monsoon affected</span>
                </li>
              </ul>
            </div>

            </div>
          </aside>
        </div>

        {/* Ready to Book Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold rounded-lg p-8 text-white mt-12">
          <h2 className="text-2xl font-bold text-center mb-4">Ready to Book Your Thailand Trip?</h2>
          <p className="text-center mb-8 opacity-90 max-w-2xl mx-auto">
            Now that you know the best time to visit, start planning your perfect Thailand getaway.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <a
              href="https://trip.tpo.lv/TmObooZ5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-thailand-blue rounded-lg p-6 text-center hover:shadow-lg transition-shadow block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-lg mb-1">Find Hotels</h3>
              <p className="text-sm text-gray-600">Compare deals on Trip.com</p>
            </a>
            <Link
              href="/esim/"
              className="bg-white text-thailand-blue rounded-lg p-6 text-center hover:shadow-lg transition-shadow block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-lg mb-1">Stay Connected</h3>
              <p className="text-sm text-gray-600">Get an eSIM for Thailand</p>
            </Link>
            <Link
              href="/travel-insurance/"
              className="bg-white text-thailand-blue rounded-lg p-6 text-center hover:shadow-lg transition-shadow block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-lg mb-1">Travel Insurance</h3>
              <p className="text-sm text-gray-600">Protect your trip</p>
            </Link>
          </div>
          <p className="text-xs text-center opacity-75">
            External links are affiliate links. We may earn a small commission at no extra cost to you.
          </p>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<WeatherIndexProps> = async () => {
  return {
    props: {
      cities: citiesData
    },
    revalidate: 86400
  };
};

export default WeatherIndex;