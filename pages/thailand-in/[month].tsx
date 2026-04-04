import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
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
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const monthNl: Record<string, string> = {
    January: 'Januari', February: 'Februari', March: 'Maart', April: 'April',
    May: 'Mei', June: 'Juni', July: 'Juli', August: 'Augustus',
    September: 'September', October: 'Oktober', November: 'November', December: 'December',
  };
  const monthName = isNl ? (monthNl[guide.month] || guide.month) : guide.month;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Reisgidsen' : 'Travel Guides', href: '/travel-guides' },
    { name: isNl ? `Thailand in ${monthName}` : `Thailand in ${guide.month}`, href: `/thailand-in/${guide.slug}` }
  ];

  const faqs = [
    {
      question: isNl
        ? `Is ${monthName} een goed moment om Thailand te bezoeken?`
        : `Is ${guide.month} a good time to visit Thailand?`,
      answer: `${guide.weather.overview} ${guide.pros[0] ? `Key advantages include: ${guide.pros.slice(0, 2).join(', ').toLowerCase()}.` : ''} ${guide.cons[0] ? `However, keep in mind: ${guide.cons[0].toLowerCase()}.` : ''}`
    },
    {
      question: isNl
        ? `Hoe is het weer in Thailand in ${monthName}?`
        : `What is the weather like in Thailand in ${guide.month}?`,
      answer: `In ${guide.month}, temperatures in central Thailand (Bangkok) average ${guide.weather.temperature.central}, while northern Thailand (Chiang Mai) sees ${guide.weather.temperature.north} and southern Thailand ${guide.weather.temperature.south}. Rainfall: ${guide.weather.rainfall.toLowerCase()}. Humidity is ${guide.weather.humidity.toLowerCase()}.`
    },
    {
      question: isNl
        ? `Waar moet ik naartoe in Thailand in ${monthName}?`
        : `Where should I go in Thailand in ${guide.month}?`,
      answer: `The best destinations in ${guide.month} include ${guide.best_destinations.map(d => `${d.name} (${d.reason.toLowerCase()})`).join(', ')}. Each offers unique experiences suited to the season.`
    },
    {
      question: isNl
        ? `Zijn er festivals in Thailand in ${monthName}?`
        : `Are there any festivals in Thailand in ${guide.month}?`,
      answer: guide.festivals.length > 0
        ? `Yes! ${guide.month} features ${guide.festivals.map(f => `${f.name} — ${f.description.toLowerCase()}`).join('. ')}. These events offer a wonderful glimpse into Thai culture.`
        : `${guide.month} is a quieter month for major festivals, but you can still enjoy local temple fairs, night markets, and cultural events throughout the country.`
    },
    {
      question: isNl
        ? `Wat moet ik inpakken voor Thailand in ${monthName}?`
        : `What should I pack for Thailand in ${guide.month}?`,
      answer: `For ${guide.month} in Thailand, pack lightweight breathable clothing, sunscreen, and comfortable walking shoes. ${guide.weather.humidity.toLowerCase().includes('high') || guide.weather.rainfall.toLowerCase().includes('heavy') || guide.weather.rainfall.toLowerCase().includes('frequent') ? 'Bring a compact rain jacket or umbrella as showers are likely.' : 'A light rain jacket is still recommended for unexpected showers.'} ${guide.weather.temperature.north.includes('15') || guide.weather.temperature.north.includes('16') || guide.weather.temperature.north.includes('17') || guide.weather.temperature.north.includes('18') ? 'Pack a sweater if visiting northern Thailand, as evenings can be cool.' : ''}`
    },
    {
      question: isNl
        ? `Is ${monthName} hoogseizoen of laagseizoen in Thailand?`
        : `Is ${guide.month} peak season or low season in Thailand?`,
      answer: `${guide.pros.some(p => p.toLowerCase().includes('peak') || p.toLowerCase().includes('high season')) ? `${guide.month} falls in Thailand's peak season (November-February). Expect higher prices and more tourists, but the best weather conditions.` : guide.pros.some(p => p.toLowerCase().includes('fewer') || p.toLowerCase().includes('budget') || p.toLowerCase().includes('low')) ? `${guide.month} is part of Thailand's low/shoulder season. You will benefit from lower prices, fewer crowds, and better hotel deals, though weather can be less predictable.` : `${guide.month} is a transitional period in Thailand's tourism calendar. Prices and crowds are moderate, offering a good balance of value and weather conditions.`}`
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title={guide.title}
        description={guide.meta_description}
      >
        <meta name="keywords" content={`Thailand ${guide.month}, ${guide.month} weather Thailand, ${guide.month} festivals Thailand, visit Thailand ${guide.month}`} />
        <meta property="og:type" content="article" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-thailand-gold text-lg">{isNl ? 'Maandelijkse gids' : 'Monthly guide'}</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-2">
                Thailand in {monthName}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {guide.weather.overview}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {guide.weather.temperature.central}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {guide.weather.rainfall}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {guide.weather.humidity} {isNl ? 'luchtvochtigheid' : 'humidity'}
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
                  {isNl ? 'Vorige Maand' : 'Previous Month'}
                </Link>
              ) : <div />}
              
              <Link href="/travel-guides/thailand-weather/" className="text-gray-600 hover:text-thailand-blue">
                {isNl ? 'Alle Maanden' : 'View All Months'}
              </Link>
              
              {nextMonth ? (
                <Link href={`/thailand-in/${nextMonth}/`} className="flex items-center text-thailand-blue hover:underline">
                  {isNl ? 'Volgende Maand' : 'Next Month'}
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
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3"></span>
                    {isNl ? `Weer in ${monthName}` : `Weather in ${guide.month}`}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Noord-Thailand' : 'Northern Thailand'}</h3>
                      <div className="text-2xl font-bold text-thailand-blue">{guide.weather.temperature.north}</div>
                      <p className="text-sm text-gray-600 mt-1">Chiang Mai, Chiang Rai</p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Centraal-Thailand' : 'Central Thailand'}</h3>
                      <div className="text-2xl font-bold text-thailand-blue">{guide.weather.temperature.central}</div>
                      <p className="text-sm text-gray-600 mt-1">Bangkok, Ayutthaya</p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Zuid-Thailand' : 'Southern Thailand'}</h3>
                      <div className="text-2xl font-bold text-thailand-blue">{guide.weather.temperature.south}</div>
                      <p className="text-sm text-gray-600 mt-1">Phuket, Krabi, Koh Samui</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-semibold text-gray-900">{isNl ? 'Regenval:' : 'Rainfall:'}</span>
                        <p className="text-gray-600">{guide.weather.rainfall}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">{isNl ? 'Luchtvochtigheid:' : 'Humidity:'}</span>
                        <p className="text-gray-600">{guide.weather.humidity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3"></span>
                    {isNl ? `Hoogtepunten in ${monthName}` : `${guide.month} Highlights`}
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
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center">
                      <span className="text-3xl mr-3"></span>
                      {isNl ? 'Festivals & Evenementen' : 'Festivals & Events'}
                    </h2>
                    <div className="space-y-4">
                      {guide.festivals.map((festival, index) => (
                        <div key={index} className="bg-surface-cream rounded-xl p-4">
                          <h3 className="font-semibold font-heading text-gray-900 mb-2">{festival.name}</h3>
                          <p className="text-gray-700">{festival.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Destinations */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3"></span>
                    {isNl ? 'Beste Plekken om te Bezoeken' : 'Best Places to Visit'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guide.best_destinations.map((destination, index) => (
                      <div key={index} className="bg-surface-cream rounded-xl p-4 hover:shadow-md transition-all">
                        <h3 className="font-semibold font-heading text-gray-900 mb-1">{destination.name}</h3>
                        <p className="text-gray-600 text-sm">{destination.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travel Tips */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3"></span>
                    {isNl ? `Reistips voor ${monthName}` : `Travel Tips for ${guide.month}`}
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
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h3 className="font-semibold font-heading text-green-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                      {isNl ? 'Voordelen' : 'Pros'}
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

                  <div className="bg-red-50 rounded-2xl p-6">
                    <h3 className="font-semibold font-heading text-red-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {isNl ? 'Nadelen' : 'Cons'}
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

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-md p-8 mt-12">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3"></span>
                    {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
                  </h2>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explore Thailand — internal linking section */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                    {isNl ? 'Plan Je Bezoek aan Thailand' : 'Plan Your Visit to Thailand'}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {isNl ? 'Alles wat je nodig hebt om je reis naar Thailand te plannen en te boeken.' : 'Everything you need to research, plan, and book your Thailand trip.'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                      href="/city/"
                      className="flex items-center gap-3 bg-surface-cream rounded-xl p-4 hover:shadow-md transition-all group"
                    >
                      <span className="text-2xl">🏙️</span>
                      <div>
                        <div className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Stadsgidsen' : 'City Guides'}</div>
                        <div className="text-sm text-gray-600">{isNl ? 'Ontdek alle 33 Thaise steden' : 'Explore all 33 Thai cities'}</div>
                      </div>
                    </Link>
                    <Link
                      href="/islands/"
                      className="flex items-center gap-3 bg-surface-cream rounded-xl p-4 hover:shadow-md transition-all group"
                    >
                      <span className="text-2xl">🏝️</span>
                      <div>
                        <div className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Thaise Eilanden' : 'Thai Islands'}</div>
                        <div className="text-sm text-gray-600">{isNl ? 'Stranden, duiken & eilandleven' : 'Beaches, diving & island life'}</div>
                      </div>
                    </Link>
                    <Link
                      href="/food/"
                      className="flex items-center gap-3 bg-surface-cream rounded-xl p-4 hover:shadow-md transition-all group"
                    >
                      <span className="text-2xl">🍜</span>
                      <div>
                        <div className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Thais Eten Gids' : 'Thai Food Guide'}</div>
                        <div className="text-sm text-gray-600">{isNl ? 'Gerechten, street food & waar te eten' : 'Dishes, street food & where to eat'}</div>
                      </div>
                    </Link>
                    <Link
                      href="/thailand-index/best-time"
                      className="flex items-center gap-3 bg-surface-cream rounded-xl p-4 hover:shadow-md transition-all group"
                    >
                      <span className="text-2xl">📅</span>
                      <div>
                        <div className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Beste Reistijd' : 'Best Time to Visit'}</div>
                        <div className="text-sm text-gray-600">{isNl ? 'Maand-voor-maand weerindex' : 'Month-by-month weather index'}</div>
                      </div>
                    </Link>
                    <Link
                      href="/weather/"
                      className="flex items-center gap-3 bg-surface-cream rounded-xl p-4 hover:shadow-md transition-all group"
                    >
                      <span className="text-2xl">🌤️</span>
                      <div>
                        <div className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Weergids' : 'Weather Guide'}</div>
                        <div className="text-sm text-gray-600">{isNl ? 'Seizoenen, regio\'s & voorspellingen' : 'Seasons, regions & forecasts'}</div>
                      </div>
                    </Link>
                    <Link
                      href="/thailand-for-first-timers/"
                      className="flex items-center gap-3 bg-surface-cream rounded-xl p-4 hover:shadow-md transition-all group"
                    >
                      <span className="text-2xl">✈️</span>
                      <div>
                        <div className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Gids voor Beginners' : 'First Timer\'s Guide'}</div>
                        <div className="text-sm text-gray-600">{isNl ? 'Tips, budgetten & wat te verwachten' : 'Tips, budgets & what to expect'}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-8">
                  
                  {/* Trip.com Widget */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-4">
                      {isNl ? `Plan Je ${monthName} Reis` : `Plan Your ${guide.month} Trip`}
                    </h3>
                    <TripcomWidget city="Thailand" type="bundle" />
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-4">
                      {isNl ? 'Populaire Bestemmingen' : 'Popular Destinations'}
                    </h3>
                    <div className="space-y-2">
                      {popularCities.slice(0, 6).map((city) => (
                        <Link 
                          key={city.slug}
                          href={`/city/${city.slug}/`} 
                          className="block text-thailand-blue hover:underline"
                        >
                          {city.name.en}
                        </Link>
                      ))}
                    </div>
                  </div>


                  {/* Other Months */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-4">
                      {isNl ? 'Thailand per Maand' : 'Thailand by Month'}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {Object.keys(monthlyGuides).map((monthSlug) => (
                        <Link
                          key={monthSlug}
                          href={`/thailand-in/${monthSlug}/`}
                          className={`text-center py-2 rounded-xl ${
                            monthSlug === guide.slug
                              ? 'bg-thailand-blue text-white'
                              : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
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
            <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4 text-center">
                {isNl ? `Boek Activiteiten voor ${monthName}` : `Book Activities for ${guide.month}`}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {isNl ? 'Ontdek de beste tours, dagtrips en ervaringen in heel Thailand.' : 'Discover the best tours, day trips, and experiences across Thailand.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <a
                  href="https://klook.tpo.lv/aq6ZFxvc?subid=month-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-thailand-red text-white py-3 px-4 rounded-xl font-semibold hover:bg-thailand-blue transition-colors text-sm"
                >
                  {isNl ? 'Bekijk Klook Activiteiten' : 'Browse Klook Activities'}
                </a>
                <a
                  href="https://getyourguide.tpo.lv/GuAFfGGK?subid=month-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-thailand-blue text-white py-3 px-4 rounded-xl font-semibold hover:bg-thailand-red transition-colors text-sm"
                >
                  {isNl ? 'Bekijk GetYourGuide' : 'Browse GetYourGuide'}
                </a>
                <Link
                  href="/activities/"
                  className="flex items-center justify-center bg-thailand-blue text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
                >
                  {isNl ? 'Alle Activiteiten' : 'All Activities'}
                </Link>
              </div>
              <p className="text-xs text-gray-500 text-center">
                {isNl ? 'Externe links zijn affiliate links. We kunnen een kleine commissie verdienen zonder extra kosten voor jou.' : 'External links are affiliate links. We may earn a small commission at no extra cost to you.'}
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 bg-surface-dark rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold font-heading mb-4">
                {isNl ? `Klaar om Thailand te bezoeken in ${monthName}?` : `Ready to Visit Thailand in ${guide.month}?`}
              </h2>
              <p className="mb-6 opacity-90">
                {isNl ? 'Ontdek onze stadsgidsen, vind de beste hotels en plan je perfecte reis' : 'Explore our city guides, find the best hotels, and plan your perfect trip'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/city/" className="bg-white text-thailand-blue px-6 py-3 rounded-xl font-semibold hover:bg-surface-cream transition-colors">
                  {isNl ? 'Ontdek Steden' : 'Explore Cities'}
                </Link>
                <Link href="/top-10/hotels/" className="bg-white bg-opacity-20 text-white border-2 border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-thailand-blue transition-colors">
                  {isNl ? 'Vind Hotels' : 'Find Hotels'}
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
    revalidate: 604800
  };
};