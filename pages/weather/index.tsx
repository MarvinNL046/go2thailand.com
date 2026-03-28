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
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title="Thailand Weather — Best Time to Visit & Seasons 2026"
        description="When to visit Thailand? Monthly weather, rainy season dates, temperature & humidity for 33 cities. Plan the perfect trip with our 2026 climate guide."
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

        <p className="font-script text-thailand-gold mb-2">Climate Guide</p>
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-8">
          Thailand Weather Guide
        </h1>

        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            Planning your Thailand adventure? Understanding the weather is key to a perfect trip.
            Thailand has three main seasons: Cool (November–February), Hot (March–May), and Rainy (June–October).
            Each region and city has its own weather patterns. Use this guide to find the best time to visit each destination.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            One of the most important things to understand is that Thailand's two coastlines operate on opposite monsoon schedules. The <strong>Andaman coast</strong> (Phuket, Krabi, Koh Lanta, Koh Phi Phi) receives the southwest monsoon from May to October — this is its wet season, with some beaches and boat services closing entirely in September and October. The <strong>Gulf of Thailand coast</strong> (Koh Samui, Koh Phangan, Koh Tao, Hua Hin) is largely sheltered from the southwest monsoon and instead gets its rain from the northeast monsoon in November and December. This means that when Phuket is at peak season (December–April), Koh Samui's best months are January–September.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Northern Thailand (Chiang Mai, Chiang Rai) follows yet another pattern: a genuine cool season from November to February with temperatures sometimes dropping to 10°C at night in the mountains, a very hot and smoky March–April (burning season), and a green, lush rainy season from June to October that transforms the mountains into excellent trekking terrain.
          </p>
        </section>

        {/* Activities by Season */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="section-label">Activities</p>
          <h2 className="text-2xl font-bold font-heading mb-6">Activities by Season</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">Scuba Diving & Snorkelling</h3>
              <p className="text-sm text-gray-700 mb-3">
                The best diving in Thailand depends entirely on which coast you're visiting. The Andaman Sea (Similan Islands, Koh Bon, Richelieu Rock) has its finest visibility from <strong>November to April</strong> — calm seas, 30m+ visibility, and whale sharks from February to April. The Similan Islands National Park closes entirely May–October. Gulf of Thailand dive sites (Koh Tao, Sail Rock, Chumphon Pinnacle) are diveable year-round, with peak conditions from <strong>March to September</strong>. Koh Tao has some of the cheapest PADI dive certification courses in the world.
              </p>
              <p className="text-xs text-thailand-gold font-medium">Best months: Nov–Apr (Andaman) | Mar–Sep (Gulf)</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">Trekking & Hiking</h3>
              <p className="text-sm text-gray-700 mb-3">
                The cool season (<strong>November to February</strong>) is prime trekking time in northern Thailand. Temperatures in Chiang Mai sit at 15–25°C, jungle trails are dry and manageable, and hill tribe village stays are comfortable. Doi Inthanon, Doi Pha Hom Pok, and the trails around Mae Hong Son are all at their best. Avoid trekking in March–April when forest fires create dangerous smoke and heat. Rainy season (June–October) makes northern jungles lush and photogenic but trails can be slippery and leech-heavy — waterproof boots essential.
              </p>
              <p className="text-xs text-thailand-gold font-medium">Best months: Nov–Feb (north), Jun–Oct for lush scenery</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">Beach Holidays</h3>
              <p className="text-sm text-gray-700 mb-3">
                For the classic Thailand beach holiday — turquoise water, white sand, low waves — timing depends on your destination. <strong>Phuket and Krabi</strong>: December to March is peak season with flat seas and full sun. <strong>Koh Samui and Koh Phangan</strong>: January to September, avoiding the northeast monsoon in November–December. <strong>Koh Chang</strong> (eastern coast): November to May. For families wanting guaranteed beach weather across the whole country, <strong>January and February</strong> are the safest months — both coastlines are simultaneously at their best.
              </p>
              <p className="text-xs text-thailand-gold font-medium">Best months: Dec–Mar (Andaman) | Jan–Sep (Gulf coast)</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">Festivals & Cultural Events</h3>
              <p className="text-sm text-gray-700 mb-3">
                Thailand's festival calendar offers year-round reasons to visit. <strong>Songkran</strong> (Thai New Year water festival) fills Bangkok, Chiang Mai, and every city in April — the world's largest water fight and an unmissable experience. <strong>Loi Krathong</strong> in November (floating candle boats on rivers) is the most visually stunning festival. <strong>Yi Peng</strong> in Chiang Mai (same week as Loi Krathong) releases thousands of sky lanterns — one of the most photographed events on earth. The <strong>Vegetarian Festival</strong> in Phuket (October) involves extreme devotion rituals. <strong>Ubon Candle Festival</strong> (July) draws crowds to Isan.
              </p>
              <p className="text-xs text-thailand-gold font-medium">Best months: Apr (Songkran), Nov (Loi Krathong/Yi Peng)</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">Wildlife & Birdwatching</h3>
              <p className="text-sm text-gray-700 mb-3">
                Khao Yai National Park (UNESCO World Heritage) is best from <strong>November to June</strong> — elephants, gibbons, and hornbills are reliably seen. The rainy season (July–October) brings animals to water sources but trails flood. For whale sharks and manta rays at the Similan Islands, target <strong>February to April</strong>. Doi Inthanon in the north has over 360 bird species; the cool season (November–February) brings rare high-altitude migrants. The Mangrove forests of Krabi and Phang Nga are best explored October–April before the monsoon.
              </p>
              <p className="text-xs text-thailand-gold font-medium">Best months: Nov–Apr for most wildlife experiences</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">Budget Travel & Fewer Crowds</h3>
              <p className="text-sm text-gray-700 mb-3">
                The shoulder and low seasons offer significant savings. <strong>May–June</strong> (just as rains begin) and <strong>September–October</strong> (rainy season peak) see hotel prices drop 30–50% and popular attractions become manageable. Bangkok is always busy, but Phuket in June or Chiang Mai in October feel genuinely uncrowded. The trade-off is weather risk — but in practice, most rainy season days have morning sunshine and afternoon showers, not all-day rain. Budget travellers who can be flexible with activities will find these months excellent value.
              </p>
              <p className="text-xs text-thailand-gold font-medium">Best months: May–Jun and Sep–Oct for value</p>
            </div>
          </div>
        </section>

        {/* Monsoon Explained */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="section-label">Climate Science</p>
          <h2 className="text-2xl font-bold font-heading mb-4">The Two Monsoons Explained</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-400 pl-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-2">Southwest Monsoon (Andaman Coast)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Arrives: Late May / June<br />
                Departs: October / early November
              </p>
              <p className="text-sm text-gray-700">
                The southwest monsoon rolls in from the Indian Ocean, hitting the Andaman coast of Thailand (Phuket, Krabi, Ranong, Trang, Satun) with the full force of tropical rain. June to August brings heavy rain, strong seas, and boat cancellations. September and October are the worst months on this coast. By November, the southwest monsoon retreats and the Andaman Sea becomes a mirror — beginning peak beach season that runs through April.
              </p>
            </div>
            <div className="border-l-4 border-teal-400 pl-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-2">Northeast Monsoon (Gulf Coast)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Arrives: October / November<br />
                Departs: January / February
              </p>
              <p className="text-sm text-gray-700">
                The northeast monsoon affects the Gulf of Thailand coastline (Koh Samui, Koh Phangan, Koh Tao, Hua Hin). November and December bring significant rain and rough seas to Koh Samui in particular — the island has a notorious reputation for bad weather in December that catches first-timers off guard. The flip side: while the Andaman coast bakes in dry-season sun, the Gulf coast is perfectly calm from January through September, making it the better choice for most of the year.
              </p>
            </div>
          </div>
          <div className="mt-6 bg-surface-cream rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <strong>Practical tip:</strong> If you want to island-hop between the Andaman and Gulf coasts in a single trip, January and February are the safest months when both coasts simultaneously have good weather. December through April is reliably dry on the Andaman; January through September on the Gulf. Avoid flying directly from Phuket to Koh Samui in November or December — there's a high chance both ends of that journey will be wet.
            </p>
          </div>
        </section>

        {/* Festival Calendar */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="section-label">Events</p>
          <h2 className="text-2xl font-bold font-heading mb-6">Thailand Festival Calendar 2026</h2>
          <div className="space-y-4">
            {[
              { month: 'January', festival: 'Bo Sang Umbrella Festival', location: 'Chiang Mai', desc: 'Three-day craft festival celebrating the hand-painted paper umbrella tradition of the Bo Sang village. Miss Bo Sang beauty pageant, craft demonstrations, and cultural parade.' },
              { month: 'February', festival: 'Chinese New Year / Makha Bucha', location: 'Bangkok (Chinatown), nationwide', desc: 'Chinese New Year fills Yaowarat Road in Bangkok with dragon dances and lanterns. Makha Bucha (Buddhist holy day) sees candlelit circumambulations at every temple nationwide.' },
              { month: 'March', festival: 'Elephant Festival', location: 'Surin', desc: 'Surin province celebrates its elephant-mahout heritage with parades, historical re-enactments, and elephant demonstrations at the Surin Elephant Study Centre.' },
              { month: 'April', festival: 'Songkran (Thai New Year)', location: 'Nationwide — biggest in Chiang Mai and Bangkok', desc: 'Thailand\'s biggest celebration — a 3-day water festival marking the Thai New Year (April 13–15). Streets become nationwide water fights. Temple visits, merit-making, and family reunions also central. Chiang Mai\'s Songkran is considered the most spectacular.' },
              { month: 'May', festival: 'Royal Ploughing Ceremony / Visakha Bucha', location: 'Bangkok / Nationwide', desc: 'The Royal Ploughing Ceremony at Sanam Luang in Bangkok is an ancient Brahman ritual that predicts the year\'s agricultural fortunes. Visakha Bucha (most important Buddhist holiday) involves candlelit processions at temples nationwide.' },
              { month: 'July', festival: 'Ubon Ratchathani Candle Festival / Asalha Bucha', location: 'Ubon Ratchathani', desc: 'One of the most spectacular regional festivals in Thailand: enormous intricately carved beeswax candles paraded through the city to mark Buddhist Lent (Khao Phansa). Best experienced in Ubon but celebrated across Isan.' },
              { month: 'October', festival: 'Vegetarian Festival (Tesagan Gin Je)', location: 'Phuket', desc: 'Nine-day Chinese Taoist festival in Phuket involving extreme devotional acts (body piercing, fire-walking), strict vegetarian diet, and street processions. Not for the faint-hearted — one of the most intense ritual experiences in Southeast Asia.' },
              { month: 'November', festival: 'Loi Krathong & Yi Peng Lantern Festival', location: 'Nationwide — most spectacular in Chiang Mai', desc: 'Loi Krathong (25 November 2026) sees millions of candlelit banana-leaf floats released on rivers and lakes nationwide. In Chiang Mai, the simultaneous Yi Peng festival releases thousands of sky lanterns (khom loi) — one of the most photographed spectacles in Asia. Book accommodation months ahead.' },
              { month: 'December', festival: 'Lopburi Monkey Festival / King\'s Birthday', location: 'Lopburi / Nationwide', desc: 'Lopburi\'s famous macaque residents get an annual feast (December) in thanks for bringing tourism. Thailand\'s national day on December 5 marks the late King Bhumibol\'s birthday with celebrations and illuminations in Bangkok.' },
            ].map((item) => (
              <div key={item.festival} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0">
                <div className="w-24 flex-shrink-0">
                  <span className="text-sm font-bold text-thailand-gold">{item.month}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.festival}</h3>
                  <p className="text-xs text-gray-500 mb-1">{item.location}</p>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Monthly Overview */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <p className="section-label">Monthly Overview</p>
              <h2 className="text-2xl font-bold font-heading mb-6">Thailand Weather by Month</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monthlyHighlights.map((month) => (
                  <Link 
                    key={month.month} 
                    href={`/thailand-in/${month.month}/`}
                    className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow"
                  >
                    <span className="text-3xl mr-4">{month.emoji}</span>
                    <div>
                      <h3 className="font-semibold font-heading text-lg">{month.name}</h3>
                      <p className="text-sm text-gray-600">{month.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>


            {/* Cities by Region */}
            <section className="bg-white rounded-2xl shadow-md p-6">
              <p className="section-label">By City</p>
              <h2 className="text-2xl font-bold font-heading mb-6">City Weather Guides</h2>

              {Object.entries(citiesByRegion).map(([region, regionCities]) => (
                <div key={region} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold font-heading text-gray-800 mb-4 flex items-center">
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
                        className="flex items-center justify-between p-3 bg-surface-cream rounded-xl hover:bg-thailand-blue/5 transition-colors group"
                      >
                        <span className="font-medium text-gray-700 group-hover:text-thailand-blue">
                          {city.name.en}
                        </span>
                        <span className="text-thailand-blue group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <p className="section-label">FAQ</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {weatherFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{faq.question}</h3>
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
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">Quick Weather Tips</h3>
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
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">Best Times to Visit</h3>
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
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">Regional Differences</h3>
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

        {/* Explore More */}
        <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
          <p className="section-label">Explore More</p>
          <h2 className="text-2xl font-bold font-heading mb-6">Plan Your Trip to Thailand</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/city/"
              className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group"
            >
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">City Guides</h3>
                <p className="text-sm text-gray-600">Explore all 33 Thai cities</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">→</span>
            </Link>
            <Link
              href="/compare/"
              className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group"
            >
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">Compare Destinations</h3>
                <p className="text-sm text-gray-600">Side-by-side city comparisons</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">→</span>
            </Link>
            <Link
              href="/thailand-index/best-time"
              className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group"
            >
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">Best Time to Visit</h3>
                <p className="text-sm text-gray-600">Data-driven month-by-month index</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">→</span>
            </Link>
            <Link
              href="/thailand-for-first-timers/"
              className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group"
            >
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">First Timer's Guide</h3>
                <p className="text-sm text-gray-600">Everything you need to know</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">→</span>
            </Link>
            <Link
              href="/islands/"
              className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group"
            >
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">Thai Islands</h3>
                <p className="text-sm text-gray-600">Beaches, diving & island life</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">→</span>
            </Link>
            <Link
              href="/travel-gear/"
              className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group"
            >
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">Travel Gear</h3>
                <p className="text-sm text-gray-600">Pack smart for every season</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">→</span>
            </Link>
          </div>
        </section>

        {/* Ready to Book Section */}
        <section className="bg-surface-dark rounded-2xl p-8 text-white mt-12">
          <p className="font-script text-thailand-gold text-center mb-2">Plan Ahead</p>
          <h2 className="text-2xl font-bold font-heading text-center mb-4">Ready to Book Your Thailand Trip?</h2>
          <p className="text-center mb-8 opacity-90 max-w-2xl mx-auto">
            Now that you know the best time to visit, start planning your perfect Thailand getaway.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <a
              href="https://trip.tpo.lv/TmObooZ5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-thailand-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold font-heading text-lg mb-1">Find Hotels</h3>
              <p className="text-sm text-gray-600">Compare deals on Trip.com</p>
            </a>
            <Link
              href="/esim/"
              className="bg-white text-thailand-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold font-heading text-lg mb-1">Stay Connected</h3>
              <p className="text-sm text-gray-600">Get an eSIM for Thailand</p>
            </Link>
            <Link
              href="/travel-insurance-thailand/"
              className="bg-white text-thailand-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold font-heading text-lg mb-1">Travel Insurance</h3>
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
