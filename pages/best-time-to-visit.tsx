import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EmailCapture from '../components/EmailCapture';

export default function BestTimeToVisitPage() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Beste Reistijd voor Thailand' : 'Best Time to Visit Thailand', href: '/best-time-to-visit/' },
  ];

  const faqItems = [
    {
      question: 'What is the hottest month in Thailand?',
      answer: 'April is the hottest month in Thailand, with temperatures regularly exceeding 40\u00B0C in Bangkok and central Thailand. The extreme heat makes April challenging for sightseeing, but it is also when Songkran (Thai New Year) takes place \u2014 the country-wide water fight helps cool things down considerably. If you visit in April, plan outdoor activities for early morning or late afternoon and stay hydrated.',
    },
    {
      question: 'Can you visit Thailand during rainy season?',
      answer: 'Yes. Rain typically falls in short, heavy bursts lasting 1-2 hours, usually in the afternoon, then clears. Many travelers prefer rainy season for lower prices (30-50% cheaper than peak season) and fewer crowds. The landscape is also at its lushest and greenest. The main exceptions are some Andaman coast islands that close entirely from May to October due to rough seas, and September-October when flooding can occasionally affect low-lying areas.',
    },
    {
      question: 'When is the cheapest time to visit Thailand?',
      answer: 'September and October offer the lowest prices across Thailand. Hotels can be 30-50% cheaper than peak season (December to February). Flights are also significantly cheaper during this period. The trade-off is that these are the wettest months, particularly on the Andaman coast where some islands and dive sites close. However, the Gulf coast (Koh Samui, Koh Tao) is still accessible in September before its own rainy season kicks in during October-December.',
    },
    {
      question: 'Does it rain all day during monsoon season?',
      answer: 'No. Even in the wettest months, Bangkok averages about 3 hours of rain per day. Mornings are usually dry and sunny, with rain arriving in the afternoon or evening in intense but short-lived downpours. You can absolutely sightsee, visit temples, and enjoy outdoor activities during monsoon season \u2014 just carry a compact umbrella and be flexible with your schedule. Many travelers find the dramatic cloud formations and brief tropical storms add character to their trip.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Best Time to Visit Thailand: Season Guide by Region (2026) | Go2Thailand"
        description="When is the best time to visit Thailand? Complete 2026 guide to Thailand's three seasons, regional weather differences, best months for beaches, trekking, and festivals, plus packing tips."
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Header */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Beste Reistijd voor Thailand: Seizoensgids per Regio (2026)' : 'Best Time to Visit Thailand: Season Guide by Region (2026)'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isNl
                  ? 'Thailand heeft drie verschillende seizoenen en twee aparte moessonsystemen. Wanneer je moet bezoeken hangt volledig af van waar je naartoe wilt en wat je wilt doen.'
                  : 'Thailand has three distinct seasons and two separate monsoon systems. When you should visit depends entirely on where you want to go and what you want to do.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            {/* Table of Contents */}
            <nav className="bg-white rounded-2xl shadow-md p-6 mb-10">
              <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">{isNl ? 'In deze gids' : 'In this guide'}</h2>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li><a href="#seasons" className="text-thailand-blue hover:underline">{isNl ? 'De Drie Seizoenen van Thailand' : "Thailand's Three Seasons"}</a></li>
                <li><a href="#regions" className="text-thailand-blue hover:underline">{isNl ? 'Beste Reistijd per Regio' : 'Best Time by Region'}</a></li>
                <li><a href="#month-by-month" className="text-thailand-blue hover:underline">{isNl ? 'Maand-per-Maand Overzicht' : 'Month-by-Month Breakdown'}</a></li>
                <li><a href="#festivals" className="text-thailand-blue hover:underline">{isNl ? 'Festivals & Evenementen 2026' : 'Festivals & Events 2026'}</a></li>
                <li><a href="#packing" className="text-thailand-blue hover:underline">{isNl ? 'Inpaktips per Seizoen' : 'Packing Tips by Season'}</a></li>
                <li><a href="#faq" className="text-thailand-blue hover:underline">FAQ</a></li>
              </ul>
            </nav>

            {/* Intro paragraph */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              &quot;When is the best time to visit Thailand?&quot; is one of the most common questions travelers ask, and the honest answer is: it depends. Thailand stretches over 1,600 kilometers from north to south, and the weather in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">Chiang Mai</Link> can be completely different from the weather in <Link href="/city/phuket/" className="text-thailand-blue hover:underline">Phuket</Link> on any given day. The country also has two separate monsoon systems, which means one coast can be drenched in rain while the other enjoys perfect sunshine.
            </p>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              This guide breaks down Thailand&apos;s weather by season, by region, and month by month, so you can plan your trip around the conditions that matter most to you &mdash; whether that is dry beach days, cool trekking weather, festival dates, or the lowest possible prices. For detailed weather data on all 33 cities, check our interactive <Link href="/thailand-index/best-time/" className="text-thailand-blue hover:underline">Thailand Weather Index</Link>.
            </p>

            {/* ============================================ */}
            {/* SECTION 1: Thailand's Three Seasons */}
            {/* ============================================ */}
            <section id="seasons" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'De Drie Seizoenen van Thailand' : "Thailand's Three Seasons"}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'In tegenstelling tot landen met vier seizoenen, doorloopt Thailand koel, heet en regen. Elk heeft zijn voordelen.' : 'Unlike countries with four seasons, Thailand cycles through cool, hot, and rainy. Each has its advantages.'}</p>
              </div>

              {/* Cool Season */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
                    *
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Cool Season (November &ndash; February)</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The cool season is the most popular time to visit Thailand, and for good reason. Average temperatures range from 26 to 30&deg;C across most of the country, humidity drops noticeably, and rainfall is at its lowest. Skies are generally clear, making it ideal for beach holidays, temple visits, and outdoor activities. The north gets genuinely cool during this period &mdash; morning temperatures in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">Chiang Mai</Link>, <Link href="/city/chiang-rai/" className="text-thailand-blue hover:underline">Chiang Rai</Link>, and <Link href="/city/pai/" className="text-thailand-blue hover:underline">Pai</Link> can drop to 8&ndash;12&deg;C, which feels downright cold if you packed only shorts and tank tops. Bangkok and the southern islands stay warm and comfortable.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The trade-off is that this is peak tourist season. Popular destinations are at their busiest, hotel prices are at their highest (particularly around Christmas, New Year, and Chinese New Year), and popular attractions can feel crowded. Book accommodation and internal flights well in advance if you plan to visit during December or January. Despite the crowds, the weather is so consistently excellent that most first-time visitors should aim for November through February if their schedule allows.
                    </p>
                    <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
                      <p><strong>Temperature:</strong> 26&ndash;30&deg;C average (north: mornings can drop to 8&ndash;12&deg;C)</p>
                      <p><strong>Rainfall:</strong> Minimal across most of the country</p>
                      <p><strong>Crowds:</strong> Peak season &mdash; busiest and most expensive</p>
                      <p><strong>Best for:</strong> First-time visitors, beach holidays, trekking in the north, photography</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hot Season */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xl">
                    *
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Hot Season (March &ndash; May)</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The hot season lives up to its name. Temperatures climb to 35&ndash;40&deg;C and beyond, with April consistently being the hottest month of the year. In <Link href="/city/bangkok/" className="text-thailand-blue hover:underline">Bangkok</Link> and central Thailand, the combination of heat and humidity can make sightseeing genuinely exhausting, particularly between 11am and 3pm. Northern Thailand, especially the Isaan region in the northeast, also bakes under intense heat in April and May.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      That said, the hot season has a major draw: Songkran, the Thai New Year water festival, takes place from April 13 to 15, 2026. The entire country erupts in a massive water fight, and the celebrations are unlike anything else in Southeast Asia. It is one of the most joyful festivals in the world and well worth braving the heat for. Outside of Songkran, the hot season offers shoulder-season pricing and thinner crowds, making it appealing for budget-conscious travelers who can handle the heat. Air-conditioned malls, swimming pools, and island beaches provide welcome relief.
                    </p>
                    <div className="bg-orange-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
                      <p><strong>Temperature:</strong> 35&ndash;40&deg;C+ (April is the hottest month)</p>
                      <p><strong>Rainfall:</strong> Increasing toward May, but mostly dry in March and April</p>
                      <p><strong>Crowds:</strong> Moderate &mdash; shoulder season pricing in most areas</p>
                      <p><strong>Best for:</strong> Songkran (April 13&ndash;15), budget travel, beach holidays (early season)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rainy Season */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xl">
                    *
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Rainy Season (June &ndash; October)</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The rainy season scares away many travelers, but it should not. Temperatures settle around 29&deg;C with humidity reaching approximately 90%, and while it does rain, the pattern is typically short, intense bursts lasting 1 to 2 hours &mdash; usually in the afternoon &mdash; followed by clear skies. You can absolutely fill a day with activities; you just need a compact umbrella and some flexibility in your schedule.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The rainy season is when Thailand is at its greenest and most lush. Waterfalls are at full flow, rice paddies glow in vivid emerald, and national parks look their most spectacular. It is also the cheapest time to visit, with hotels discounting rates by 30&ndash;50% compared to peak season. The biggest caveat is the Andaman coast (Phuket, Krabi, Phi Phi): rough seas can make boat trips unsafe, and some smaller islands close entirely from May to October. However, the Gulf coast &mdash; <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline">Koh Samui</Link>, <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline">Koh Phangan</Link>, <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline">Koh Tao</Link> &mdash; operates on a different monsoon system and remains largely dry from May through September, making it the perfect alternative for beach time during the Andaman rainy season.
                    </p>
                    <div className="bg-green-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
                      <p><strong>Temperature:</strong> ~29&deg;C with high humidity (~90%)</p>
                      <p><strong>Rainfall:</strong> Short bursts (1&ndash;2 hours), usually afternoon. Wettest months: September&ndash;October</p>
                      <p><strong>Crowds:</strong> Low season &mdash; prices drop 30&ndash;50%</p>
                      <p><strong>Best for:</strong> Budget travel, nature photography, Gulf coast beaches, whale shark season at Koh Tao</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 2: Best Time by Region */}
            {/* ============================================ */}
            <section id="regions" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Beste Reistijd per Regio' : 'Best Time to Visit by Region'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Dit is het belangrijkste deel van deze gids. De regio\'s van Thailand hebben heel verschillende weerpatronen, en de verkeerde kust op het verkeerde moment kiezen kan dagen regen en gesloten eilanden betekenen.' : "This is the most important section of this guide. Thailand's regions have very different weather patterns, and picking the wrong coast at the wrong time can mean days of rain and closed islands."}</p>
              </div>

              {/* Bangkok & Central */}
              <div className="mb-10">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Bangkok &amp; Central Thailand</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Best: Nov &ndash; Feb</span>
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">Hot: Mar &ndash; May</span>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Wet: Jun &ndash; Oct</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <Link href="/city/bangkok/" className="text-thailand-blue hover:underline">Bangkok</Link> is hot year-round, but the cool season from November to February is the most comfortable time for sightseeing. Temperatures ease into the high 20s, humidity drops, and rainfall is rare. The wettest months are September and October, when heavy afternoon downpours can briefly flood streets in low-lying areas. That said, Bangkok is a city built for all weather &mdash; its shopping malls, covered markets like <Link href="/blog/chatuchak-market-bangkok-guide/" className="text-thailand-blue hover:underline">Chatuchak</Link>, air-conditioned temples, and excellent public transport mean you can visit productively any time of year.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Central Thailand, including Ayutthaya and Kanchanaburi, follows the same pattern. Historical sites are more enjoyable when you are not battling 40-degree heat, so November to February is strongly recommended for temple explorations and cycling tours. March and April are the hottest months, but Songkran transforms Bangkok into a water-drenched party city that many consider worth the heat.
                  </p>
                </div>
              </div>

              {/* Northern Thailand */}
              <div className="mb-10">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Northern Thailand (Chiang Mai, Chiang Rai, Pai)</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Best: Nov &ndash; Feb</span>
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Avoid: Feb &ndash; Apr (haze)</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Northern Thailand has the most pronounced seasonal variation in the country. The cool season from November to February is spectacular &mdash; crisp mornings with temperatures dropping to 8&ndash;12&deg;C in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">Chiang Mai</Link>, <Link href="/city/chiang-rai/" className="text-thailand-blue hover:underline">Chiang Rai</Link>, and <Link href="/city/pai/" className="text-thailand-blue hover:underline">Pai</Link>, warming to comfortable mid-20s by afternoon. This is perfect weather for trekking, temple visits, and exploring night markets without breaking a sweat. Pack a light jacket or sweater for early mornings and evenings.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The one thing to be aware of in the north is the burning season. From roughly February to April, agricultural burning and forest fires create a thick haze that blankets the valleys. Air quality deteriorates significantly, visibility drops, and it can aggravate respiratory conditions. During the worst periods, the AQI in Chiang Mai regularly exceeds unhealthy levels. If you are sensitive to air quality or want clear mountain views, avoid the north from late February through April. The haze typically clears once the rains begin in May.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The rainy season (June to October) transforms the north into a lush green paradise. Waterfalls are at their most impressive, rice terraces are vividly green, and the air is clean after months of haze. Rain follows the usual pattern of afternoon bursts. It is a rewarding time to visit if you do not mind getting caught in the occasional downpour.
                  </p>
                </div>
              </div>

              {/* Andaman Coast */}
              <div className="mb-10">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Andaman Coast (Phuket, Krabi, Phi Phi, Koh Lanta)</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Best: Dec &ndash; Mar</span>
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Rainy: Apr &ndash; Oct</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The Andaman coast &mdash; Thailand&apos;s western shoreline facing the Indian Ocean &mdash; has the most dramatic seasonal difference for beach travelers. From December to March, conditions are close to perfect: calm turquoise seas, clear skies, and warm temperatures ideal for swimming, snorkeling, and island hopping. <Link href="/city/phuket/" className="text-thailand-blue hover:underline">Phuket</Link>, <Link href="/city/krabi/" className="text-thailand-blue hover:underline">Krabi</Link>, and <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline">Koh Lanta</Link> are at their best during these months.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The southwest monsoon brings heavy rains from approximately April to October, with September and October being the wettest months. Seas can be rough, and strong currents make swimming dangerous on exposed west-facing beaches. Some smaller islands close entirely during this period, and ferry services are reduced or suspended. The Similan Islands and Surin Islands, two of Thailand&apos;s best <Link href="/best-diving-snorkeling-in-thailand/" className="text-thailand-blue hover:underline">dive sites</Link>, close from mid-May to mid-October.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    That said, <Link href="/city/phuket/" className="text-thailand-blue hover:underline">Phuket</Link> and Krabi town themselves remain open year-round. You can still have a good holiday during the shoulder months (April-May and October-November) if you are flexible &mdash; just be prepared for some rainy days and check that your intended islands are operating before booking.
                  </p>
                </div>
              </div>

              {/* Gulf Coast */}
              <div className="mb-10">
                <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-thailand-blue">
                  <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm text-blue-800 font-semibold">
                    Key insight: The Gulf coast operates on a different monsoon pattern than the Andaman coast. When one side is rainy, the other is often dry.
                  </div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Gulf Coast (Koh Samui, Koh Phangan, Koh Tao)</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Best: May &ndash; Sep (dry)</span>
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Wettest: Oct &ndash; Dec</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    This is the most important piece of weather information for Thailand trip planning, and the one most travelers get wrong. The Gulf coast &mdash; <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline">Koh Samui</Link>, <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline">Koh Phangan</Link>, and <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline">Koh Tao</Link> &mdash; operates on the northeast monsoon, which is the opposite pattern to the Andaman coast. The Gulf islands are driest from May to September, precisely when the Andaman coast is wettest.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The Gulf coast&apos;s wettest period runs from October to December, with November often seeing the heaviest rainfall. This means that if you are visiting Thailand during the Andaman rainy season (June to September), you can simply head to the Gulf coast instead and enjoy excellent beach weather. Koh Tao in particular is a popular choice during these months for its calm seas and good diving visibility &mdash; it is also whale shark season, with sightings most common from March to October.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    January to April is also pleasant on the Gulf coast, though humidity is higher than the Andaman side during the same months. The Full Moon Party on Koh Phangan runs monthly year-round (entrance fee: &#3647;200), and the Gulf islands remain open and accessible even during their rainy season, though seas can be rough in November and some diving trips may be cancelled.
                  </p>
                </div>
              </div>

              {/* Isaan */}
              <div className="mb-10">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Isaan (Northeast Thailand)</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Best: Nov &ndash; Feb</span>
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">Extreme heat: Apr &ndash; May</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Isaan, Thailand&apos;s vast northeastern plateau, is the least touristy region and has the most extreme temperature swings. April and May bring blistering heat, while December and January can feel genuinely cold, especially at night. The cool season from November to February is the most comfortable time to explore this fascinating region, which is home to Khmer temple ruins, vibrant local food culture, and an authenticity you will not find in more touristed areas.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Isaan is best suited for experienced Thailand travelers on a return visit who want to see a completely different side of the country. The food alone is worth the trip &mdash; Isaan cuisine (som tam, larb, nam tok) is the backbone of Thai street food, and eating it in its homeland is an entirely different experience from ordering it in Bangkok.
                  </p>
                </div>
              </div>

              {/* Quick Reference Table */}
              <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Quick Reference: Best Months by Region</h3>
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-semibold text-gray-900">Region</th>
                      <th className="py-3 px-2 font-semibold text-gray-900">Best Months</th>
                      <th className="py-3 px-2 font-semibold text-gray-900">Avoid</th>
                      <th className="py-3 pl-2 font-semibold text-gray-900">Key Note</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">Bangkok &amp; Central</td>
                      <td className="py-3 px-2">Nov &ndash; Feb</td>
                      <td className="py-3 px-2">Sep &ndash; Oct (wettest)</td>
                      <td className="py-3 pl-2">Visitable year-round</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">Northern Thailand</td>
                      <td className="py-3 px-2">Nov &ndash; Feb</td>
                      <td className="py-3 px-2">Feb &ndash; Apr (haze)</td>
                      <td className="py-3 pl-2">Pack layers for cool mornings</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">Andaman Coast</td>
                      <td className="py-3 px-2">Dec &ndash; Mar</td>
                      <td className="py-3 px-2">Sep &ndash; Oct (rough seas)</td>
                      <td className="py-3 pl-2">Some islands close May &ndash; Oct</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">Gulf Coast</td>
                      <td className="py-3 px-2">May &ndash; Sep</td>
                      <td className="py-3 px-2">Oct &ndash; Dec (wettest)</td>
                      <td className="py-3 pl-2">Opposite monsoon to Andaman</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium">Isaan (Northeast)</td>
                      <td className="py-3 px-2">Nov &ndash; Feb</td>
                      <td className="py-3 px-2">Apr &ndash; May (extreme heat)</td>
                      <td className="py-3 pl-2">Least touristy region</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Mid-page Email Capture */}
            <EmailCapture heading={isNl ? 'Je Thailand reis plannen?' : 'Planning your Thailand trip?'} subtext={isNl ? 'Ontvang wekelijkse reistips, seizoensupdates en budget hacks \u2014 direct in je inbox.' : 'Get weekly travel tips, seasonal updates, and budget hacks \u2014 straight to your inbox.'} />

            {/* ============================================ */}
            {/* SECTION 3: Month-by-Month Breakdown */}
            {/* ============================================ */}
            <section id="month-by-month" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Maand-per-Maand Overzicht' : 'Month-by-Month Breakdown'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Een praktische gids over hoe elke maand eruitziet in Thailand, zodat je je reisdata kunt afstemmen op de beste omstandigheden.' : 'A practical guide to what each month looks like across Thailand, so you can match your travel dates to the best conditions.'}</p>
              </div>

              {/* January / February */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    Jan/Feb
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">January &amp; February: Peak Season Perfection</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      These are arguably the two best months to visit Thailand. The weather is dry and comfortable virtually everywhere: warm days, cooler evenings, low humidity, and almost no rain. The Andaman coast is in its prime with calm, crystal-clear seas perfect for diving and snorkeling. Northern Thailand is at its most pleasant with cool mornings and sunny afternoons (though the burning season haze can start to appear in late February around Chiang Mai).
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The downside is price. January and February are peak season across the country, and accommodation prices reflect it. Popular <Link href="/thailand-islands/" className="text-thailand-blue hover:underline">islands</Link> and <Link href="/best-beaches-in-thailand/" className="text-thailand-blue hover:underline">beaches</Link> book up well in advance, especially over Chinese New Year. If you can travel in the first half of January (after the New Year rush) or the second half of February, you will find slightly more availability and potentially better rates.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Weather:</strong> Dry and comfortable everywhere. Cool mornings in the north.</p>
                      <p><strong>Prices:</strong> Highest of the year (peak season)</p>
                      <p><strong>Best for:</strong> Beach holidays, island hopping, trekking, temple visits</p>
                      <p><strong>Watch out for:</strong> Crowds and inflated prices, especially around Chinese New Year</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* March / April */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">
                    Mar/Apr
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">March &amp; April: Scorching Heat, Songkran, and Shoulder Pricing</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      These are the hottest months in Thailand, with April regularly hitting 40&deg;C+ in Bangkok and central Thailand. Sightseeing in the middle of the day becomes a genuine endurance test. In northern Thailand, the burning season haze peaks in March and early April, making it the worst time to visit Chiang Mai for air quality and mountain views.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The redeeming feature of April is Songkran (April 13&ndash;15, 2026), the Thai New Year water festival. The entire country engages in a massive, joyful water fight that lasts several days. <Link href="/city/bangkok/" className="text-thailand-blue hover:underline">Bangkok</Link>&apos;s Khao San Road and Silom Road host the biggest celebrations, but every town and village participates. Getting thoroughly soaked is not optional &mdash; and in the 40-degree heat, it is welcome. It is one of the most unique cultural experiences in Southeast Asia and a highlight of many travelers&apos; Thailand trips.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Pricing-wise, March and April fall into shoulder season territory. Hotels are cheaper than December-February, and you will have more space at popular attractions. The <Link href="/best-beaches-in-thailand/" className="text-thailand-blue hover:underline">beaches</Link> are still enjoyable, particularly on the Gulf coast, though the Andaman coast starts receiving more rain from April onward.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Weather:</strong> 35&ndash;40&deg;C+. Oppressively hot, especially inland.</p>
                      <p><strong>Prices:</strong> Shoulder season &mdash; lower than peak</p>
                      <p><strong>Best for:</strong> Songkran (April 13&ndash;15), budget beach holidays</p>
                      <p><strong>Watch out for:</strong> Northern Thailand haze (Feb&ndash;Apr), extreme heat in Bangkok and Isaan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* May / June */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                    May/Jun
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">May &amp; June: Rains Begin, Prices Drop</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The southwest monsoon arrives on the Andaman coast in May, bringing the first sustained rains of the year to Phuket, Krabi, and the western islands. Seas grow rougher, and some smaller islands begin to close. However, the rain is rarely constant &mdash; mornings are often sunny, with showers arriving in the afternoon.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Meanwhile, the Gulf coast (<Link href="/city/koh-samui/" className="text-thailand-blue hover:underline">Koh Samui</Link>, <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline">Koh Phangan</Link>, <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline">Koh Tao</Link>) remains in good shape. May and June are among the driest months on the Gulf side, making these islands an excellent alternative if you want a beach holiday without peak-season crowds or prices. Prices drop 30&ndash;50% compared to December-February, and you will have beaches that are noticeably less crowded.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      In northern Thailand, the rains wash away the burning season haze and everything turns green again. <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">Chiang Mai</Link> in June is pleasant if you do not mind occasional showers, and the surrounding countryside is beautiful with fresh foliage and flowing waterfalls.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Weather:</strong> Rains start on Andaman coast. Gulf coast still dry. North clears.</p>
                      <p><strong>Prices:</strong> Low season begins &mdash; 30&ndash;50% cheaper</p>
                      <p><strong>Best for:</strong> Gulf coast beaches, budget travel, lush northern landscapes</p>
                      <p><strong>Watch out for:</strong> Andaman coast rougher seas, some island closures</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* July / August */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                    Jul/Aug
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">July &amp; August: European Summer, Green Thailand</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Despite being firmly in the rainy season, July and August are popular with European travelers during their summer holidays. The rain, while present, remains manageable &mdash; typically afternoon downpours that clear quickly. The landscape is at its most spectacular, with vivid green rice paddies, rushing waterfalls, and lush jungle canopy across the north and central regions.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The Gulf coast continues to enjoy relatively dry conditions, and <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline">Koh Tao</Link> is particularly appealing during these months. Diving conditions are often excellent, with calm seas and good visibility. This is also peak whale shark season at Koh Tao &mdash; while sightings are never guaranteed, your odds are highest between March and October, with many encounters reported in July and August. The Full Moon Party on <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline">Koh Phangan</Link> continues monthly year-round.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Bangkok remains functional as always, though the humidity is intense. Air-conditioned malls, rooftop restaurants, and indoor attractions keep the city enjoyable. Northern Thailand sees regular rain but remains beautiful and far less crowded than the cool season.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Weather:</strong> Rainy but manageable. Gulf coast mostly dry. Lush green everywhere.</p>
                      <p><strong>Prices:</strong> Low season &mdash; excellent deals</p>
                      <p><strong>Best for:</strong> Gulf coast diving (whale shark season), budget travel, nature photography</p>
                      <p><strong>Watch out for:</strong> Higher humidity, Andaman coast rough seas continue</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* September / October */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                    Sep/Oct
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">September &amp; October: Wettest Months, Lowest Prices</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      September and October are the wettest months across most of Thailand. Rainfall reaches its peak on the Andaman coast, with rough seas and potential flooding in some areas. These are the months when Phuket&apos;s west coast beaches fly red warning flags due to dangerous currents, and most Andaman island day trips and ferry services are limited or suspended.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      However, these months also bring the lowest prices of the year. Hotels that charge &#3647;5,000 per night in January might drop to &#3647;2,000 or less. If you are a budget-conscious traveler who does not mind some rain, September and October offer remarkable value. Focus on <Link href="/city/bangkok/" className="text-thailand-blue hover:underline">Bangkok</Link> (where you can duck into temples, malls, and restaurants during downpours), or head to the Gulf coast, keeping in mind that the Gulf&apos;s own rainy season kicks in around October.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      For more on making the most of a <Link href="/blog/thailand-budget-2026-daily-costs/" className="text-thailand-blue hover:underline">budget Thailand trip</Link>, including daily cost breakdowns by season, see our dedicated budget guide.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Weather:</strong> Heaviest rainfall nationwide. Andaman coast at its roughest.</p>
                      <p><strong>Prices:</strong> Absolute lowest of the year</p>
                      <p><strong>Best for:</strong> Extreme budget travel, Bangkok city exploration</p>
                      <p><strong>Watch out for:</strong> Island closures, rough seas, occasional flooding</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* November / December */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    Nov/Dec
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">November &amp; December: Cool Season Returns, Festival Season</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      November marks the transition back into the cool season, and it is a wonderful time to be in Thailand. The rains taper off across most of the country (though the Gulf coast enters its wettest period from October to December &mdash; keep this in mind when planning). Temperatures begin to drop, particularly in the north, and the air feels fresher after months of monsoon rains.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      November 2026 brings two of Thailand&apos;s most beautiful festivals. Loy Krathong (November 25, 2026) is celebrated nationwide: people release small decorated floats (krathong) onto rivers, canals, and lakes to pay respect to the water goddess and symbolically let go of negativity. In Chiang Mai, the Yi Peng festival (November 24&ndash;25, 2026) adds the magical spectacle of thousands of sky lanterns released simultaneously into the night sky. Witnessing Yi Peng in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">Chiang Mai</Link> is one of the most memorable experiences Thailand offers.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      December is the start of high season, and prices climb accordingly. The Andaman coast reopens in full swing: islands resume ferry services, dive sites open, and the beaches are at their most beautiful. Christmas and New Year&apos;s are the most expensive period &mdash; book well in advance if you plan to visit over the holidays. Early November, before peak season pricing kicks in, can be a sweet spot for good weather and reasonable rates.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Weather:</strong> Cool season begins. Dry across most regions (Gulf coast still wet).</p>
                      <p><strong>Prices:</strong> November is still shoulder season; December is peak</p>
                      <p><strong>Best for:</strong> Loy Krathong &amp; Yi Peng festivals, Andaman coast beaches</p>
                      <p><strong>Watch out for:</strong> Gulf coast rain (Oct&ndash;Dec), Christmas/New Year premium pricing</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 4: Festivals & Events 2026 */}
            {/* ============================================ */}
            <section id="festivals" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Grote Festivals & Evenementen in 2026' : 'Major Festivals & Events in 2026'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Thailand\'s festivals zijn reden genoeg om je reis erop af te stemmen. Hier zijn de hoogtepunten voor 2026.' : "Thailand's festivals are reason enough to time your trip around them. Here are the highlights for 2026."}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Songkran */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">April 13&ndash;15, 2026</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Songkran (Thai New Year)</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Thailand&apos;s biggest holiday and the world&apos;s largest water fight. The entire country celebrates with water throwing, temple visits, and family gatherings. Bangkok&apos;s Khao San Road and Silom Road host the wildest street parties. Chiang Mai is famous for its multi-day moat-side celebrations. Expect everything to be soaking wet for three days straight.
                  </p>
                  <p className="mt-3 text-sm">
                    <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Bangkok Songkran guide &rarr;</Link>
                    {' '}<span className="text-gray-400">|</span>{' '}
                    <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Chiang Mai Songkran &rarr;</Link>
                  </p>
                </div>

                {/* Loy Krathong */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">November 25, 2026</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Loy Krathong (Water Lantern Festival)</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    On the evening of the full moon in the twelfth month of the Thai lunar calendar, people across Thailand release small decorated floats (krathong) onto rivers and waterways. Each krathong carries a candle, incense, and flowers as an offering to the water goddess. It is one of the most photogenic and atmospheric evenings you will experience in Thailand. Best experienced near water: Bangkok&apos;s Chao Phraya River, Sukhothai Historical Park (the historical birthplace of the festival), or anywhere along Chiang Mai&apos;s Ping River.
                  </p>
                </div>

                {/* Yi Peng */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">November 24&ndash;25, 2026</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Yi Peng (Sky Lantern Festival, Chiang Mai)</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Unique to northern Thailand and centered on <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">Chiang Mai</Link>, Yi Peng coincides with Loy Krathong and adds thousands of paper sky lanterns (khom loi) released into the night sky. The sight of the dark sky filling with glowing lanterns is genuinely magical and widely considered one of the most beautiful festival moments in the world. The main mass release events require tickets (often &#3647;3,000&ndash;5,000 including dinner) and sell out months in advance. Smaller spontaneous releases happen throughout the city.
                  </p>
                </div>

                {/* Full Moon Party */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">Monthly</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Full Moon Party (Koh Phangan)</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    The legendary all-night beach party on Haad Rin, <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline">Koh Phangan</Link>, happens monthly around the full moon. Expect fire dancers, neon body paint, booming music, and bucket cocktails on the sand. The entrance fee is &#3647;200. The party runs year-round regardless of season, though the biggest crowds come during high season months (December&ndash;February). Check exact dates before booking, as they sometimes shift to avoid Buddhist holidays.
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Packing Tips by Season */}
            {/* ============================================ */}
            <section id="packing" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Wat In Te Pakken: Seizoen-per-Seizoen Gids' : 'What to Pack: Season-by-Season Guide'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Thailand is informeel en praktisch. Pak licht in, kleed je voor de hitte en onthoud de kledingvoorschriften voor tempels.' : 'Thailand is informal and practical. Pack light, dress for the heat, and remember temple dress codes.'}</p>
              </div>

              {/* All Seasons */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-3">Every Season: The Essentials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <div>
                      <p className="font-semibold mb-1">Clothing</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Light cotton or linen clothing (breathable fabrics)</li>
                        <li>Comfortable walking sandals or shoes</li>
                        <li>Clothes that cover shoulders and knees for temples</li>
                        <li>Swimwear</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Essentials</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>High-SPF sunscreen (tropical sun is intense)</li>
                        <li>Mosquito repellent (DEET-based recommended)</li>
                        <li>Reusable water bottle</li>
                        <li>Universal power adapter (Thailand uses Type A, B, C, and O plugs)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 bg-amber-50 rounded-lg p-3 text-sm text-amber-800">
                    <strong>Temple dress code:</strong> You must cover your shoulders and knees when visiting temples. No see-through clothing. Sarongs are available to borrow or buy cheaply (&#3647;50&ndash;100) at most major temples, but having your own is more convenient.
                  </div>
                </div>
              </div>

              {/* Season-specific */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-2xl p-5">
                  <h4 className="font-bold font-heading text-gray-900 mb-2 text-sm">Cool Season (Nov&ndash;Feb)</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>Light jacket or sweater (essential for the north)</li>
                    <li>Long trousers for cool evenings</li>
                    <li>Layers you can add and remove</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Mornings in Chiang Mai/Pai can drop to 8&ndash;12&deg;C</p>
                </div>
                <div className="bg-orange-50 rounded-2xl p-5">
                  <h4 className="font-bold font-heading text-gray-900 mb-2 text-sm">Hot Season (Mar&ndash;May)</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>Lightest possible clothing</li>
                    <li>Wide-brim hat or cap</li>
                    <li>Extra sunscreen (you will reapply often)</li>
                    <li>Electrolyte packets for hydration</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Temperatures regularly exceed 40&deg;C in April</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-5">
                  <h4 className="font-bold font-heading text-gray-900 mb-2 text-sm">Rainy Season (Jun&ndash;Oct)</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>Compact travel umbrella</li>
                    <li>Waterproof phone case</li>
                    <li>Quick-dry clothes</li>
                    <li>Waterproof bag or dry bag for electronics</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Rain is intense but short (1&ndash;2 hours)</p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: FAQ */}
            {/* ============================================ */}
            <section id="faq" className="mb-12">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Snelle antwoorden op de meest gestelde vragen over Thailand\'s weer en timing.' : "Quick answers to the most common questions about Thailand's weather and timing."}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="space-y-6">
                  {faqItems.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-bold font-heading text-gray-900 mb-2 text-lg">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      {item.question === 'When is the cheapest time to visit Thailand?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/blog/thailand-budget-2026-daily-costs/" className="text-thailand-blue hover:underline font-semibold">Full Thailand budget breakdown 2026 &rarr;</Link>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Email Capture */}
            <EmailCapture heading={isNl ? 'Seizoenstips voor Thailand?' : 'Want seasonal Thailand tips?'} subtext={isNl ? 'Ontvang onze wekelijkse nieuwsbrief met weerupdates, festivaldatums en insider reisadvies.' : 'Get our weekly newsletter with weather updates, festival dates, and insider travel advice.'} />

            {/* Cross-links to other pillar pages */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Ga Verder met het Plannen van Je Reis' : 'Continue Planning Your Trip'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/thailand-travel-guide/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Reisgids' : 'Travel Guide'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Alles wat je nodig hebt' : 'Everything you need'}</div>
                </Link>
                <Link href="/best-places-to-visit-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Beste Plekken' : 'Best Places'}</div>
                  <div className="text-xs text-gray-600">{isNl ? '33 bestemmingen' : '33 destinations'}</div>
                </Link>
                <Link href="/things-to-do-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Bezienswaardigheden' : 'Things to Do'}</div>
                  <div className="text-xs text-gray-600">{isNl ? '25 top ervaringen' : '25 top experiences'}</div>
                </Link>
                <Link href="/thailand-itinerary/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Reisroutes' : 'Itineraries'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Kant-en-klare routes' : 'Ready-made routes'}</div>
                </Link>
                <Link href="/thailand-islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Thaise Eilanden' : 'Thai Islands'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Strandparadijs' : 'Beach paradise'}</div>
                </Link>
                <Link href="/best-beaches-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Beste Stranden' : 'Best Beaches'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Zand en zee' : 'Sand and surf'}</div>
                </Link>
                <Link href="/is-thailand-safe/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Veiligheidsgids' : 'Safety Guide'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Blijf veilig' : 'Stay safe'}</div>
                </Link>
                <Link href="/thailand-index/best-time/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Weerdata' : 'Weather Data'}</div>
                  <div className="text-xs text-gray-600">{isNl ? '33 steden vergeleken' : '33 cities compared'}</div>
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  };
};
