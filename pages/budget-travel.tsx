import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EmailCapture from '../components/EmailCapture';

export default function BudgetTravelPage() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Budget Reizen' : 'Budget Travel', href: '/budget-travel/' },
  ];

  const faqItems = [
    {
      question: 'Is $50 a day enough in Thailand?',
      answer: 'Yes, $50 a day (approximately ฿1,750) puts you comfortably in the mid-range bracket outside of the islands. You can afford a private air-conditioned hotel room, eat a mix of street food and sit-down restaurants, take Grab taxis, and do one paid activity per day. On the islands, $50 a day is tighter but still workable if you stay in budget guesthouses and eat at local restaurants rather than beachfront tourist spots. Backpackers who are comfortable with hostel dorms, street food, and local transport can manage on $30-40 per day in mainland Thailand, and many long-term travelers sustain this level of spending for months.',
    },
    {
      question: 'Is Thailand cheaper than Bali?',
      answer: 'Thailand and Bali are broadly similar for budget travelers, but the cost breakdown differs. Thailand has cheaper street food (฿30-80 per dish versus $2-4 in Bali) and more affordable local transport options like the BTS, songthaews, and overnight trains. Bali tends to have cheaper accommodation, particularly private villas and guesthouses in areas like Ubud and Canggu. Domestic flights within Thailand are cheaper than getting between Indonesian islands. Overall, the two destinations cost roughly the same for a two-week trip, though Thailand edges ahead on food value and transport infrastructure.',
    },
    {
      question: "What's the cheapest month to visit Thailand?",
      answer: 'September and October offer the lowest prices across Thailand. Hotels drop 30-50% compared to the December-February peak season, and you will find deals on tours, cooking classes, and even flights. This period falls in the rainy season, but the rain is usually short afternoon bursts rather than all-day downpours — mornings are typically clear and sunny. The trade-off is that some islands on the Andaman coast (Phuket, Krabi, Koh Lanta) are in their wettest period with rougher seas, so the Gulf islands (Koh Samui, Koh Phangan, Koh Tao) are the better beach choice during these months. Shoulder months like May and November also offer good value with less rain.',
    },
    {
      question: 'Can I use credit cards in Thailand?',
      answer: 'In cities, shopping malls, chain restaurants, and larger hotels, credit cards are widely accepted. However, street food vendors, small local shops, tuk-tuks, songthaews, market stalls, and many businesses on the islands are cash-only. Thai ATMs charge a flat fee of ฿220 per withdrawal regardless of the amount, so withdraw larger sums less frequently to minimize fees. The best strategy is to use a travel-friendly debit card like Wise or Revolut that offers no foreign exchange markup and free or low-cost ATM withdrawals. Always choose to be charged in Thai baht (not your home currency) when given the option at ATMs or card terminals — this avoids dynamic currency conversion markups that can add 3-5% to your transaction.',
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
        title="Thailand on a Budget: Daily Costs, Tips & Money-Saving Hacks (2026) | Go2Thailand"
        description="Complete Thailand budget guide for 2026. Daily costs from ฿1,000-7,000+ ($30-200+), cheapest cities, budget accommodation, street food tips, and transport hacks. Real prices, not guesses."
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
                {isNl ? 'Thailand met een Budget: Dagelijkse Kosten, Tips & Bespaarhacks (2026)' : 'Thailand on a Budget: Daily Costs, Tips & Money-Saving Hacks (2026)'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isNl
                  ? 'Thailand blijft een van de bestemmingen met de beste prijs-kwaliteitverhouding ter wereld. Of je nu backpackt op \u0E3F1.000 per dag of comfortabel reist op \u0E3F3.500, deze gids geeft precies weer wat dingen kosten zodat je vol vertrouwen kunt plannen.'
                  : 'Thailand remains one of the best-value destinations on the planet. Whether you are backpacking on \u0E3F1,000 a day or traveling comfortably on \u0E3F3,500, this guide breaks down exactly what things cost so you can plan confidently.'}
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
                <li><a href="#daily-costs" className="text-thailand-blue hover:underline">{isNl ? 'Dagelijkse Kosten Overzicht' : 'Daily Costs Breakdown'}</a></li>
                <li><a href="#cheapest-places" className="text-thailand-blue hover:underline">{isNl ? 'Goedkoopste Plekken' : 'Cheapest Places to Visit'}</a></li>
                <li><a href="#accommodation" className="text-thailand-blue hover:underline">{isNl ? 'Budget Accommodatie' : 'Budget Accommodation'}</a></li>
                <li><a href="#food" className="text-thailand-blue hover:underline">{isNl ? 'Goedkoop Eten' : 'Eating on a Budget'}</a></li>
                <li><a href="#transport" className="text-thailand-blue hover:underline">{isNl ? 'Goedkoop Vervoer' : 'Getting Around Cheaply'}</a></li>
                <li><a href="#faqs" className="text-thailand-blue hover:underline">{isNl ? 'Budget FAQ' : 'Budget FAQs'}</a></li>
              </ul>
            </nav>

            {/* Intro paragraph */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Thailand has been a backpacker favorite since the 1970s, and for good reason: it is one of the few countries where you can eat world-class food for under $2, sleep in a clean air-conditioned room for $15, and travel between cities for the price of a coffee back home. But costs have risen since the post-pandemic boom, and what you spend depends enormously on where you go, when you visit, and how you travel.
            </p>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              This guide uses verified 2026 prices to give you an honest picture of what Thailand costs for backpackers, mid-range travelers, and luxury seekers. Every price in this guide is in Thai baht (฿) with USD equivalents, based on the approximate exchange rate of ฿35 = $1. We cover accommodation, food, transport, activities, and the hidden costs that trip up first-time visitors. Whether you are planning a one-week holiday or a three-month backpacking odyssey, you will leave this page knowing exactly how much to budget.
            </p>

            {/* ============================================ */}
            {/* SECTION 1: How Much Does Thailand Cost Per Day? */}
            {/* ============================================ */}
            <section id="daily-costs" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Hoeveel Kost Thailand Per Dag?' : 'How Much Does Thailand Cost Per Day?'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Drie realistische dagbudgetten op basis van geverifieerde 2026-prijzen \u2014 van zuinig tot luxe.' : 'Three realistic daily budgets based on verified 2026 prices \u2014 from shoestring to splurge.'}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                The most common question travelers ask is simple: how much money do I need per day in Thailand? The answer depends on your travel style, but Thailand is genuinely flexible. You can have an incredible trip on ฿1,000 a day, or you can spend ฿7,000+ for a luxury experience. The sweet spot for most visitors is the mid-range bracket, where you get comfort and variety without breaking the bank.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                One important caveat: islands are 25-50% more expensive than mainland Thailand and the north. A ฿500 hotel room in Chiang Mai might cost ฿800-1,000 on Koh Samui. Street food that costs ฿40 in Bangkok runs ฿60-80 on Phuket. Factor this into your planning if your itinerary includes island time.
              </p>

              {/* Budget Breakdown Table */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-thailand-blue text-white">
                        <th className="text-left p-4 font-semibold">{isNl ? 'Categorie' : 'Category'}</th>
                        <th className="text-center p-4 font-semibold">{isNl ? 'Backpacker' : 'Backpacker'}</th>
                        <th className="text-center p-4 font-semibold">{isNl ? 'Middensegment' : 'Mid-Range'}</th>
                        <th className="text-center p-4 font-semibold">{isNl ? 'Luxe' : 'Luxury'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">{isNl ? 'Accommodatie' : 'Accommodation'}</td>
                        <td className="p-4 text-center text-gray-700">฿150-500<br /><span className="text-xs text-gray-500">hostel dorm</span></td>
                        <td className="p-4 text-center text-gray-700">฿800-1,800<br /><span className="text-xs text-gray-500">private hotel room</span></td>
                        <td className="p-4 text-center text-gray-700">฿5,000-17,000<br /><span className="text-xs text-gray-500">5-star resort</span></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">{isNl ? 'Eten (3 maaltijden)' : 'Food (3 meals)'}</td>
                        <td className="p-4 text-center text-gray-700">฿120-240<br /><span className="text-xs text-gray-500">street food &amp; 7-Eleven</span></td>
                        <td className="p-4 text-center text-gray-700">฿300-600<br /><span className="text-xs text-gray-500">mix of street &amp; restaurant</span></td>
                        <td className="p-4 text-center text-gray-700">฿1,000-3,000<br /><span className="text-xs text-gray-500">fine dining</span></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">{isNl ? 'Vervoer' : 'Transport'}</td>
                        <td className="p-4 text-center text-gray-700">฿50-150<br /><span className="text-xs text-gray-500">songthaew, bus, BTS</span></td>
                        <td className="p-4 text-center text-gray-700">฿150-400<br /><span className="text-xs text-gray-500">Grab, BTS, occasional taxi</span></td>
                        <td className="p-4 text-center text-gray-700">฿500-2,000<br /><span className="text-xs text-gray-500">private car, domestic flights</span></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">{isNl ? 'Activiteiten' : 'Activities'}</td>
                        <td className="p-4 text-center text-gray-700">฿0-200<br /><span className="text-xs text-gray-500">free temples, beaches</span></td>
                        <td className="p-4 text-center text-gray-700">฿300-800<br /><span className="text-xs text-gray-500">tours, cooking classes</span></td>
                        <td className="p-4 text-center text-gray-700">฿1,500-5,000<br /><span className="text-xs text-gray-500">private tours, spa</span></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">{isNl ? 'Dranken' : 'Drinks'}</td>
                        <td className="p-4 text-center text-gray-700">฿30-100<br /><span className="text-xs text-gray-500">water, coffee, one beer</span></td>
                        <td className="p-4 text-center text-gray-700">฿100-300<br /><span className="text-xs text-gray-500">cocktails, craft beer</span></td>
                        <td className="p-4 text-center text-gray-700">฿500-1,500<br /><span className="text-xs text-gray-500">rooftop bars, wine</span></td>
                      </tr>
                      <tr className="bg-gray-50 font-bold">
                        <td className="p-4 text-gray-900">{isNl ? 'Dagelijks Totaal' : 'Daily Total'}</td>
                        <td className="p-4 text-center text-thailand-blue">฿1,000-1,750<br /><span className="text-xs font-normal">($30-50)</span></td>
                        <td className="p-4 text-center text-thailand-blue">฿2,000-3,500<br /><span className="text-xs font-normal">($60-100)</span></td>
                        <td className="p-4 text-center text-thailand-blue">฿7,000+<br /><span className="text-xs font-normal">($200+)</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total trip costs */}
              <div className="mb-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Wat Kost een Volledige Reis?' : 'What Does a Full Trip Cost?'}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Beyond daily spending, you need to account for flights, visa costs (free for most nationalities on stays under 60 days), travel insurance, and one-time purchases like a local SIM card (฿300-600 for 15-30 days of data). Here is what typical total trip budgets look like:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
                    <h4 className="font-bold text-gray-900 mb-1">1 Week Backpacking</h4>
                    <p className="text-2xl font-bold text-green-600 mb-2">~฿10,000 <span className="text-sm font-normal text-gray-500">($300)</span></p>
                    <p className="text-sm text-gray-600">Hostels, street food, buses, free activities. Bangkok + Chiang Mai or one island.</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-thailand-blue">
                    <h4 className="font-bold text-gray-900 mb-1">2 Weeks Mid-Range</h4>
                    <p className="text-2xl font-bold text-thailand-blue mb-2">~฿50,000 <span className="text-sm font-normal text-gray-500">($1,500)</span></p>
                    <p className="text-sm text-gray-600">Hotels, restaurants, Grab, tours, cooking classes. Bangkok + north + islands.</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
                    <h4 className="font-bold text-gray-900 mb-1">2 Weeks Luxury</h4>
                    <p className="text-2xl font-bold text-purple-600 mb-2">~฿200,000+ <span className="text-sm font-normal text-gray-500">($5,700+)</span></p>
                    <p className="text-sm text-gray-600">5-star resorts, fine dining, private tours, internal flights, spa treatments.</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  These figures exclude international airfare. Return flights from Europe typically run $500-800, from the US $600-1,000, and from Australia $300-600. Booking 2-3 months ahead and flying midweek usually saves 20-30%.
                </p>
              </div>

              {/* SE Asia comparison */}
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Thailand vs Other Southeast Asian Countries</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  How does Thailand compare to its neighbors for budget travel? Thailand sits in the middle of the Southeast Asian price spectrum. It is more expensive than Cambodia and Vietnam for basic costs, but cheaper than Malaysia and Singapore. Compared to Bali, Thailand offers better street food value and cheaper transport, while Bali edges ahead on accommodation prices for private villas and guesthouses. Here is a rough comparison for mid-range daily spending:
                </p>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left p-4 font-semibold text-gray-900">Country</th>
                          <th className="text-center p-4 font-semibold text-gray-900">Backpacker/Day</th>
                          <th className="text-center p-4 font-semibold text-gray-900">Mid-Range/Day</th>
                          <th className="text-center p-4 font-semibold text-gray-900">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50 bg-blue-50">
                          <td className="p-4 font-medium text-gray-900">Thailand</td>
                          <td className="p-4 text-center text-gray-700">$30-50</td>
                          <td className="p-4 text-center text-gray-700">$60-100</td>
                          <td className="p-4 text-gray-600">Best street food, good transport</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">Vietnam</td>
                          <td className="p-4 text-center text-gray-700">$20-35</td>
                          <td className="p-4 text-center text-gray-700">$40-70</td>
                          <td className="p-4 text-gray-600">Cheapest in region, great food</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">Cambodia</td>
                          <td className="p-4 text-center text-gray-700">$20-30</td>
                          <td className="p-4 text-center text-gray-700">$40-60</td>
                          <td className="p-4 text-gray-600">Very cheap, less infrastructure</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">Bali</td>
                          <td className="p-4 text-center text-gray-700">$25-45</td>
                          <td className="p-4 text-center text-gray-700">$50-90</td>
                          <td className="p-4 text-gray-600">Cheap villas, pricier food</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Thailand&apos;s advantages over its neighbors include vastly better transport infrastructure (budget airlines, overnight trains, efficient bus networks), a more developed tourism industry with English signage and booking platforms, and the sheer variety of experiences available — from megacity to mountain village to tropical island — all within one country and one visa-free entry.
                </p>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 2: Cheapest Places to Visit */}
            {/* ============================================ */}
            <section id="cheapest-places" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Goedkoopste Plekken om te Bezoeken in Thailand' : 'Cheapest Places to Visit in Thailand'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Waar je heen moet als je je baht zo ver mogelijk wilt oprekken \u2014 en wat je moet vermijden met een krap budget.' : 'Where to go if you want to stretch your baht the furthest \u2014 and what to avoid on a tight budget.'}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Thailand&apos;s cost of living varies dramatically by region. Northern Thailand and the Isaan (northeast) region are significantly cheaper than Bangkok, the southern islands, and popular resort areas. If you are on a strict budget, choosing the right destinations can extend your trip by days or even weeks.
              </p>

              {/* Cheapest cities */}
              <div className="mb-10">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Best Budget Destinations</h3>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">฿</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Chiang Mai — The Budget Traveler&apos;s Capital</h4>
                        <p className="text-gray-700 leading-relaxed mb-2">
                          Chiang Mai is where budget travel and quality of life intersect perfectly. You can live well here on ฿800-1,200 per day — and many digital nomads do exactly that for months at a time. Hostels start at ฿150 per night, a bowl of khao soi (the city&apos;s signature curry noodle soup) costs ฿40-60, and songthaews (shared red trucks) take you anywhere in the old city for ฿20-30. The city has hundreds of temples to explore for free, night markets with ฿40-60 street food, and some of Thailand&apos;s best cooking classes at ฿800-1,200. The old city and Nimmanhaemin area have excellent cafes where a coffee costs ฿50-80, and co-working spaces run ฿150-300 per day. Chiang Mai&apos;s lower costs compared to Bangkok extend to everything: massages are ฿200-300 per hour (versus ฿300-500 in Bangkok), Grab rides are 30-40% cheaper, and accommodation offers considerably more space for the same price.
                        </p>
                        <p className="text-sm">
                          <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Explore our Chiang Mai guide →</Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">฿</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Pai — Backpacker Paradise in the Mountains</h4>
                        <p className="text-gray-700 leading-relaxed mb-2">
                          Pai is even cheaper than Chiang Mai and has a magical laid-back atmosphere that makes travelers extend their stay again and again. This tiny mountain town three hours north of Chiang Mai (via a winding road with 762 curves) offers bamboo bungalows for ฿200-400 per night, enormous plates of pad thai for ฿40-50, fresh fruit smoothies for ฿30, and free hot springs and viewpoints in the surrounding hills. The town is small enough to walk everywhere, and scooter rental costs just ฿150-200 per day for exploring the waterfalls, canyons, and rice paddies outside town. Pai is especially popular with backpackers during the cool season (November-February) when misty mornings and comfortable temperatures make it one of the most pleasant places in Thailand. The trade-off is fewer luxury options and limited nightlife beyond a few bars on the walking street.
                        </p>
                        <p className="text-sm">
                          <Link href="/city/pai/" className="text-thailand-blue hover:underline font-semibold">Explore our Pai guide →</Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">฿</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Isaan Cities — Local Prices, Zero Tourists</h4>
                        <p className="text-gray-700 leading-relaxed mb-2">
                          If you want to experience Thailand at genuinely local prices, head to the Isaan (northeast) region. Cities like Khon Kaen and Udon Thani see very few foreign tourists, which means prices are set for Thai locals rather than international visitors. Hotel rooms in modern properties start at ฿400-600 per night, meals at local restaurants cost ฿30-50, and you will find enormous night markets with dishes for ฿25-40. Isaan is the heartland of Thai cuisine — som tam (papaya salad), larb (minced meat salad), and sticky rice all originate here, and the local versions are fiercely flavorful. The region also offers interesting cultural experiences including Khmer ruins at Phimai and Phanom Rung, dinosaur museums, and the unique rock formations at Pha Taem National Park. The downside is that English is less widely spoken and tourist infrastructure is more limited, but that is part of the authentic appeal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget islands */}
              <div className="mb-10">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Budget-Friendly Islands</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Islands are inherently more expensive than the mainland because everything needs to be shipped in by ferry. But some islands are significantly cheaper than the resort-heavy options:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <h4 className="font-bold text-gray-900 mb-2">Koh Phangan (Beyond the Full Moon Party)</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Most travelers associate Koh Phangan with the Full Moon Party, but the island&apos;s northern and western coasts are a haven for budget travelers and yoga enthusiasts. Away from Haad Rin, you will find basic bungalows for ฿300-600 per night, beachside restaurants with ฿50-80 meals, and yoga retreats offering drop-in classes for ฿200-300. The island has a slower, more relaxed energy than Koh Samui next door, with a fraction of the cost. Bottle Beach on the north coast is one of the most beautiful and affordable beaches in the Gulf of Thailand.
                    </p>
                    <p className="mt-2 text-sm">
                      <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline font-semibold">Explore Koh Phangan →</Link>
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <h4 className="font-bold text-gray-900 mb-2">Koh Chang — The Cheaper Phuket Alternative</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Koh Chang in eastern Thailand near the Cambodian border is Thailand&apos;s third-largest island and offers a similar experience to Phuket — beautiful beaches, jungle interior, waterfalls, snorkeling — at roughly half the price. Guesthouses on the quieter southern beaches start at ฿400-700 per night, and restaurants are noticeably cheaper than Phuket or Koh Samui. The island is also less developed and less crowded, especially outside the main strip of White Sand Beach. Getting there is easy via a short flight or bus from Bangkok to Trat, then a 30-minute ferry crossing.
                    </p>
                    <p className="mt-2 text-sm">
                      <Link href="/city/koh-chang/" className="text-thailand-blue hover:underline font-semibold">Explore Koh Chang →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Most expensive - avoid on budget */}
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Most Expensive (Avoid on a Strict Budget)</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Not every part of Thailand is budget-friendly. If you are watching every baht, be aware that these areas will eat through your money fastest:
                </p>
                <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">!</span>
                      <span><strong>Phuket in peak season (December-February):</strong> Thailand&apos;s most expensive island by a wide margin. Budget accommodation is limited, and restaurant prices in tourist areas like Patong rival European cities. A basic meal that costs ฿50 in Chiang Mai might cost ฿150-200 here. If you must visit Phuket on a budget, stay in Phuket Town rather than the beaches — it is significantly cheaper and has authentic local food markets.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">!</span>
                      <span><strong>Koh Samui resorts:</strong> Koh Samui has positioned itself as an upscale destination, and the resort areas of Chaweng and Bophut reflect this with premium pricing. Budget travelers can survive by staying in the less-developed south of the island or in Nathon town, but the island overall is 30-40% more expensive than its neighbors Koh Phangan and Koh Tao.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">!</span>
                      <span><strong>Bangkok Sukhumvit luxury zone:</strong> The area around lower Sukhumvit (Nana to Phrom Phong) is Bangkok&apos;s most international and expensive neighborhood. Restaurants, bars, and hotels here cater to expats and business travelers at prices well above the Bangkok average. Budget travelers should base themselves in the Khao San Road area, Silom, or across the river in Thonburi for much better value while still having easy BTS/MRT access to the rest of the city.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 3: Budget Accommodation */}
            {/* ============================================ */}
            <section id="accommodation" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Budget Accommodatie in Thailand' : 'Budget Accommodation in Thailand'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Waar slapen voor elk budget \u2014 van \u0E3F150 hostel-slaapzalen tot \u0E3F2.000 priv\u00e9-appartementen.' : 'Where to sleep on every budget \u2014 from \u0E3F150 hostel dorms to \u0E3F2,000 private apartments.'}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Accommodation is usually your biggest daily expense, but Thailand offers exceptional value across every price point. The key to saving money is knowing which booking platform to use, when to book direct, and which areas offer the best price-to-quality ratio.
              </p>

              <div className="space-y-8">
                {/* Hostels */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">1</span>
                    <div>
                      <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Hostels (฿150-500/night)</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Thailand&apos;s hostel scene has evolved far beyond basic backpacker dorms. In Bangkok, cities like <Link href="/city/bangkok/" className="text-thailand-blue hover:underline">Bangkok</Link> have hostels that rival boutique hotels in design — capsule pods with privacy curtains, individual reading lights, USB charging ports, and lockers large enough for a full backpack. A bed in an air-conditioned 6-8 bed dorm typically costs ฿200-400 per night in Bangkok, and ฿150-300 in Chiang Mai and smaller cities. The Khao San Road area and Silom in Bangkok have the highest concentration of quality hostels.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Private rooms in hostels are available for ฿500-1,000 per night — often better value than budget hotels because you get the social atmosphere, common areas, and often breakfast included. Hostelworld and Booking.com are the best platforms for comparing options. Many hostels also organize free walking tours, bar crawls, and day trips, which helps you save on activities while meeting other travelers.
                      </p>
                      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                        <p><strong>Pro tip:</strong> Book hostels with a free breakfast included. Even a basic spread of toast, eggs, fruit, and coffee saves you ฿80-150 per morning, which adds up quickly over a multi-week trip.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Hotels */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">2</span>
                    <div>
                      <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Budget Hotels (฿500-1,500/night)</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        The ฿500-1,500 range gets you a clean private room with air conditioning, hot water, and wifi in most parts of Thailand. In Chiang Mai, ฿500-700 gets you a well-reviewed hotel with a pool. In Bangkok, expect to pay ฿800-1,200 for a similar standard, and on the islands ฿1,000-1,500. This is the sweet spot for couples and travelers who want privacy without luxury pricing.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        The best platform for budget hotels in Thailand is Agoda. As a Southeast Asian company (now part of Booking Holdings), Agoda consistently offers the lowest prices for Thai hotels — often 10-20% cheaper than the same property on Booking.com or Expedia. The platform also runs frequent flash sales, and its &quot;Insider Deals&quot; for logged-in users can knock another 5-15% off. Filter by guest review score (8.0+) and sort by price to find the best value properties.
                      </p>
                      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                        <p><strong>Pro tip:</strong> Use Agoda for hotels and Booking.com for hostels. Each platform tends to have better inventory and prices in its respective category for Thailand properties.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Airbnb/Apartments */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">3</span>
                    <div>
                      <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Airbnb and Apartments (฿800-2,000/night)</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Renting a full apartment or condo is the best value for couples, families, or small groups. A one-bedroom apartment with a kitchen, washing machine, pool access, and gym in Chiang Mai costs ฿800-1,200 per night on a short-term basis, or ฿8,000-15,000 per month if you stay longer. In Bangkok, similar apartments near a BTS station run ฿1,200-2,000 per night. Having a kitchen saves money on meals — buying ingredients at a local market and cooking even one meal a day can cut your food budget by 30%.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        For stays of a week or more, try negotiating directly with guesthouse and small hotel owners. Many Thai-owned properties offer significant discounts for extended stays that are not listed on booking platforms. Walk in, ask for the weekly or monthly rate, and you will often find it is 20-40% less than the per-night price shown online. This works especially well in Chiang Mai, Pai, and the quieter islands.
                      </p>
                      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                        <p><strong>Pro tip:</strong> Book direct for small guesthouses (saves them the 15-20% booking platform commission, and they often pass part of that saving to you). Use Agoda for hotels where the platform&apos;s bulk negotiated rates beat walk-in prices.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mid-page Email Capture */}
            <EmailCapture heading={isNl ? 'Een Thailand reis met budget plannen?' : 'Planning a Thailand trip on a budget?'} subtext={isNl ? 'Ontvang wekelijkse bespaartips, goedkope vluchtwaarschuwingen en budget hacks \u2014 direct in je inbox.' : 'Get weekly money-saving tips, cheap flight alerts, and budget hacks \u2014 straight to your inbox.'} />

            {/* ============================================ */}
            {/* SECTION 4: Eating on a Budget */}
            {/* ============================================ */}
            <section id="food" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Goedkoop Eten in Thailand' : 'Eating on a Budget in Thailand'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Hoe je drie maaltijden per dag eet voor minder dan $7 \u2014 en ongelooflijk goed eet.' : 'How to eat three meals a day for under $7 \u2014 and eat incredibly well while doing it.'}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Food is where Thailand&apos;s budget-friendliness truly shines. The country has one of the greatest street food cultures in the world, and eating cheaply does not mean eating badly — quite the opposite. Some of the best meals you will have in Thailand cost less than ฿60. The trick is knowing where to look and avoiding the tourist-price restaurants that cluster around major attractions.
              </p>

              <div className="space-y-8">
                {/* Street food */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Street Food (฿30-80 per dish)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Thai street food is not just cheap — it is some of the best food on the planet, period. Bangkok alone has over 100,000 street food vendors, and several have earned Michelin stars while still charging under ฿100 per plate. A typical street meal costs ฿40-60 for a generous portion of pad thai, basil pork rice (khao pad krapao), or a bowl of boat noodles. Som tam (papaya salad) runs ฿30-50. Grilled pork skewers on sticky rice cost ฿10-20 each — perfect for snacking while exploring.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The best strategy is to eat where locals eat. If a street stall has a line of Thai people, the food is almost certainly excellent and fairly priced. Tourist-oriented restaurants with English menus and photos of every dish on the wall tend to charge 2-3 times more for inferior versions of the same food. Look for stalls that specialize in one or two dishes — a vendor who has spent 20 years perfecting their pad thai will outperform a restaurant with a 10-page menu every time.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If you eat street food for all three meals, your daily food budget can easily stay under ฿200 ($6). Add a fruit smoothie (฿30) or a coffee (฿40-50) from a local cart, and you are still well under ฿250 for the day. That leaves money in your budget for a sit-down restaurant meal when you want one without blowing past your daily target.
                  </p>
                </div>

                {/* 7-Eleven */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">7-Eleven Meals (฿25-60)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    This might sound strange if you have never been to Thailand, but 7-Eleven is a genuinely good budget food option. Thai 7-Elevens are nothing like their Western counterparts — they stock hot meals, fresh sandwiches, rice boxes, dim sum, toasties, and ready-to-eat meals that are microwaved for you at the counter. A ham-and-cheese toastie costs ฿25-35. A rice box with chicken basil or teriyaki runs ฿35-55. Instant noodles with hot water cost ฿15-25. An iced coffee is ฿25.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    With over 13,000 branches nationwide (there are literally 7-Elevens on every block in Bangkok), they are always within walking distance and open 24 hours. They are a lifesaver for early morning departures, late-night hunger, or when you are too tired to hunt for a street stall. The &quot;toasted sandwich&quot; section is particularly good — the chicken toastie with chili sauce is a cult favorite among backpackers. They also sell SIM cards, bus tickets, and basic toiletries, making them a one-stop shop for budget travelers.
                  </p>
                </div>

                {/* Mall food courts */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Shopping Mall Food Courts (฿40-80)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Thai shopping mall food courts are a budget traveler&apos;s best-kept secret. Unlike food courts in Western malls, Thai versions serve authentic local food at prices that are only slightly above street food — typically ฿40-80 per dish. The key difference is air conditioning, clean seating, and proper hygiene standards, which makes them a welcome retreat on Bangkok&apos;s hottest days.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The most famous budget food court is Terminal 21 in Bangkok (both Asok and Rama 3 locations), where many dishes start at ฿40-50. MBK Center&apos;s food court on the 5th floor is another reliable option. Most mall food courts use a prepaid card system: you buy a card at the entrance counter, load it with credit, and tap it at each food stall. Any unused balance is refunded at the counter when you leave. The variety is excellent — you can get Thai, Japanese, Chinese, Indian, and Western food all under one roof, making food courts ideal for groups with different preferences.
                  </p>
                </div>

                {/* Cooking classes */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Cooking Classes (฿800-1,500 — Equals Two Meals)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    A Thai cooking class might seem like a splurge on a tight budget, but consider what you get: a guided market tour where you learn about Thai ingredients, 4-5 hours of hands-on cooking instruction, and you make and eat 4-5 full dishes. That is effectively lunch and an early dinner, plus a cultural experience and skills you will use for years. At ฿800-1,500, it works out to roughly ฿200-375 per meal — not much more than a restaurant — plus you get the market tour and the cooking education for free.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Chiang Mai has the best concentration of cooking schools at the lowest prices. Farm-based classes outside the city (where you pick ingredients from the garden) cost ฿1,000-1,500 and include hotel pickup. Bangkok classes tend to be slightly more expensive at ฿1,200-2,000 but offer the added experience of shopping at a bustling Thai market. Even on a strict backpacker budget, this is one activity worth the spend — you will learn to cook dishes at home that would cost ฿200-300 each in Thai restaurants back in your home country.
                  </p>
                  <p className="text-sm mt-3">
                    <Link href="/best-cooking-classes-in-thailand/" className="text-thailand-blue hover:underline font-semibold">Best cooking classes in Thailand →</Link>
                  </p>
                </div>

                {/* Bangkok hawker centres */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Bangkok&apos;s Hawker Centres and Night Markets</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    For the ultimate budget food experience in Bangkok, seek out the city&apos;s hawker centres and night markets where locals eat. Yaowarat (Chinatown) comes alive after dark with grilled seafood stalls, noodle shops, and dessert vendors stretching for blocks. The Lumpini area hawker stalls near Sala Daeng serve excellent lunchtime meals to office workers at ฿40-60 per dish. Rot Fai Market (Train Market) at Ratchada is a massive night market with vintage shops and dozens of food stalls offering everything from barbecued ribs to Japanese-style crepe desserts.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The strategy is simple: go where Thai people eat, eat what they eat, and pay what they pay. Tourist-oriented restaurants near the Grand Palace or Khao San Road charge 2-4 times more for the same dishes you can get around the corner. Walk two blocks away from any major tourist attraction and prices drop immediately. Night markets are particularly good value because competition between stalls keeps prices low, and the food is cooked fresh to order right in front of you.
                  </p>
                  <p className="text-sm mt-3">
                    <Link href="/blog/bangkok-lumpini-hawker-centre-street-food-2026/" className="text-thailand-blue hover:underline font-semibold">Bangkok Lumpini hawker centre guide →</Link>
                    {' '}<span className="text-gray-400">|</span>{' '}
                    <Link href="/blog/eat-like-local-thailand-under-5-dollars/" className="text-thailand-blue hover:underline font-semibold">Eat like a local for under $5 →</Link>
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Getting Around Cheaply */}
            {/* ============================================ */}
            <section id="transport" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Goedkoop Reizen door Thailand' : 'Getting Around Thailand Cheaply'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Budgetvluchten vanaf \u0E3F800, nachttreinen vanaf \u0E3F500, en waarom Grab altijd beter is dan tuk-tuks.' : 'Budget flights from \u0E3F800, overnight trains from \u0E3F500, and why Grab beats tuk-tuks every time.'}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Thailand has one of the best transport networks in Southeast Asia, and budget travelers benefit enormously from competition between airlines, bus companies, and the expanding rail network. The right transport choice can save you hundreds of baht per journey — and in some cases, a night of accommodation too.
              </p>

              <div className="space-y-8">
                {/* Budget flights */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Budget Flights (from ฿800 one-way)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Thailand&apos;s domestic airline market is fiercely competitive, with AirAsia, Nok Air, Thai Lion Air, and Thai VietJet all fighting for budget travelers. The result is astonishingly cheap flights: Bangkok to Chiang Mai starts from ฿800 one-way (about $23), Bangkok to Phuket from ฿900, and Bangkok to Krabi from ฿1,000. These prices are for hand luggage only — add ฿200-400 for a checked bag.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The sweet spot for booking is 2-4 weeks before your travel date. Booking too early or too late tends to be more expensive. Midweek flights (Tuesday, Wednesday, Thursday) are typically 20-40% cheaper than Friday-Sunday flights. Use Google Flights or Skyscanner to compare across airlines, but then book directly on the airline&apos;s website — direct bookings are easier to modify if plans change, and you avoid third-party booking fees.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The time versus money trade-off matters too. A Bangkok-Chiang Mai flight takes 1 hour 15 minutes versus 10-14 hours by bus or train. When a flight costs ฿800-1,200 and saves you an entire day of travel, it is often the smartest budget choice — even though the bus might be ฿400-600. Your time has value, and the saved day means one more day of experiences rather than sitting on a bus.
                  </p>
                </div>

                {/* Overnight trains */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Overnight Trains (from ฿500)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Thailand&apos;s overnight trains are a budget traveler&apos;s dream because they double as transport and accommodation — you save a night&apos;s hotel cost while covering ground. The most popular route is Bangkok to Chiang Mai (12-14 hours overnight), with second-class fan sleeper berths starting at ฿500 and air-conditioned sleepers at ฿800-1,000. You get a padded bunk with a curtain for privacy, sheets and a pillow, and the gentle rocking of the train to lull you to sleep.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The experience itself is part of the appeal. Watching the Thai countryside roll by from the open windows of a second-class carriage, buying snacks from vendors who walk through the train, and arriving in a new city as the sun rises — it is one of those quintessential Southeast Asian travel moments that budget travelers remember for years. Other popular overnight routes include Bangkok to Surat Thani (for Koh Samui/Koh Phangan connections), Bangkok to Nong Khai (for the Laos border), and Bangkok to Hat Yai (for southern Thailand and Malaysia).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Book tickets at the station or through 12Go, which charges a small booking fee but saves you a trip to the station. During peak season (December-January) and Thai holidays (Songkran in April, New Year), popular sleeper berths sell out days or weeks ahead, so book early.
                  </p>
                </div>

                {/* Local transport */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Songthaews and Local Transport (฿20-40)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Songthaews (shared pickup trucks with bench seats in the back) are the cheapest way to get around most Thai cities. In Chiang Mai, the red songthaews operate as shared taxis on loosely defined routes for ฿20-30 per person. In smaller cities like Pai and Sukhothai, similar shared vehicles cost even less. They are not the fastest or most comfortable option, but they are dirt cheap and go everywhere.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Other budget-friendly local transport includes tuk-tuks (but always negotiate the price before getting in — aim for ฿60-100 for short trips), motorcycle taxis (฿20-50 for short hops, identifiable by their orange vests), and bicycle rentals (฿50-100 per day in most cities). Many cities and islands are also walkable for sightseeing once you are in the right area.
                  </p>
                </div>

                {/* Grab */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Grab — Cheaper Than Tuk-Tuks, Every Time</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Download the Grab app before you arrive in Thailand. It is Southeast Asia&apos;s equivalent of Uber and is available in all major Thai cities. Grab shows you the fare upfront before you book, which eliminates the negotiation hassle with tuk-tuk and taxi drivers who may try to overcharge tourists. In Bangkok, a Grab ride across town typically costs ฿80-200 — often 30-50% less than what a tuk-tuk driver would quote for the same journey.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Grab also offers motorcycle taxis (GrabBike) for solo travelers, which costs about half of a car ride and zips through Bangkok&apos;s infamous traffic jams. The app accepts cash payment, so you do not need a Thai bank account or credit card. For budget travelers, Grab eliminates one of the most common frustrations in Thailand: being overcharged for transport because a driver assumes you do not know the fair price.
                  </p>
                </div>

                {/* BTS/MRT */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">BTS/MRT in Bangkok (฿16-62 per trip)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Bangkok&apos;s BTS Skytrain and MRT subway are fast, air-conditioned, and remarkably cheap. Single-journey fares range from ฿16 to ฿62 depending on distance. A day pass costs ฿140 for unlimited BTS rides, which pays for itself after 3-4 trips. The Rabbit card (BTS) and MRT card are reloadable stored-value cards that save you time queuing for tokens — get one at any station for a ฿100-200 refundable deposit.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The BTS and MRT cover most of the areas tourists visit in Bangkok: Siam (shopping), Sukhumvit (hotels and restaurants), Silom (business district and nightlife), Chatuchak (weekend market), and the river area (temples and Grand Palace). For destinations not on the train lines, take the train as far as you can and then switch to a Grab or motorcycle taxi for the last mile — this is almost always faster and cheaper than a taxi or Grab for the entire journey.
                  </p>
                  <p className="text-sm mt-3">
                    <Link href="/transport/" className="text-thailand-blue hover:underline font-semibold">Full Thailand transport guide →</Link>
                  </p>
                </div>

                {/* Ferries */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Ferries Between Islands</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Getting between Thailand&apos;s islands requires ferries, and prices vary significantly between operators and booking channels. The main ferry operators for the Gulf islands (Koh Samui, Koh Phangan, Koh Tao) are Lomprayah and Seatran, with prices ranging from ฿400-700 per journey. On the Andaman coast, ferries to Koh Lanta, Koh Phi Phi, and Koh Lipe run during the November-April season with similar pricing.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The most convenient way to book ferries, combined bus-ferry tickets, and train-ferry packages is through 12Go, which aggregates all operators and lets you compare times and prices. Booking through 12Go is particularly useful for combined tickets (for example, a single ticket that covers the bus from Bangkok to Chumphon plus the catamaran to Koh Tao), which saves you from buying separate tickets and coordinating connections yourself.
                  </p>
                  <p className="text-sm mt-3">
                    <a href="https://12go.tpo.lv/tNA80urD?subid=budget-transport" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-semibold">Book ferries and transport on 12Go →</a>
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: Budget FAQs */}
            {/* ============================================ */}
            <section id="faqs" className="mb-12">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Thailand Budget FAQ' : 'Thailand Budget FAQs'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Snelle antwoorden op de meest gestelde budget reisvragen over Thailand.' : 'Quick answers to the most common budget travel questions about Thailand.'}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="space-y-6">
                  {faqItems.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-bold font-heading text-gray-900 mb-2 text-lg">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      {item.question === 'Is $50 a day enough in Thailand?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/blog/thailand-budget-2026-daily-costs/" className="text-thailand-blue hover:underline font-semibold">Full daily cost breakdown for 2026 →</Link>
                        </p>
                      )}
                      {item.question === 'Is Thailand cheaper than Bali?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/things-to-do-in-thailand/" className="text-thailand-blue hover:underline font-semibold">Best things to do in Thailand →</Link>
                        </p>
                      )}
                      {item.question === "What's the cheapest month to visit Thailand?" && (
                        <p className="mt-2 text-sm">
                          <Link href="/best-time-to-visit/" className="text-thailand-blue hover:underline font-semibold">Full month-by-month guide →</Link>
                        </p>
                      )}
                      {item.question === 'Can I use credit cards in Thailand?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/thailand-travel-guide/" className="text-thailand-blue hover:underline font-semibold">Complete Thailand travel guide →</Link>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Email Capture */}
            <EmailCapture heading={isNl ? 'Meer budget tips?' : 'Want more budget tips?'} subtext={isNl ? 'Ontvang onze wekelijkse nieuwsbrief met goedkope vliegdeals, verborgen budget pareltjes en bespaarhacks voor Thailand.' : 'Get our weekly newsletter with cheap flight deals, hidden budget gems, and money-saving hacks for Thailand.'} />

            {/* Cross-links to other pillar pages */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Ontdek Meer Thailand Gidsen' : 'Explore More Thailand Guides'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/thailand-travel-guide/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Reisgids' : 'Travel Guide'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Alles wat je nodig hebt' : 'Everything you need'}</div>
                </Link>
                <Link href="/things-to-do-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Bezienswaardigheden' : 'Things to Do'}</div>
                  <div className="text-xs text-gray-600">{isNl ? '25 beste ervaringen' : '25 best experiences'}</div>
                </Link>
                <Link href="/thailand-itinerary/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Reisroutes' : 'Itineraries'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Kant-en-klare routes' : 'Ready-made routes'}</div>
                </Link>
                <Link href="/best-time-to-visit/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Beste Reistijd' : 'Best Time'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Maand-per-maand' : 'Month-by-month'}</div>
                </Link>
                <Link href="/best-places-to-visit-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Beste Plekken' : 'Best Places'}</div>
                  <div className="text-xs text-gray-600">{isNl ? '33 bestemmingen' : '33 destinations'}</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Thais Eten' : 'Thai Food'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Culinaire gids' : 'Cuisine guide'}</div>
                </Link>
                <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Vervoer' : 'Transport'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Bussen, treinen, vluchten' : 'Buses, trains, flights'}</div>
                </Link>
                <Link href="/thailand-for-first-timers/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Beginners' : 'First Timers'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Begin hier' : 'Start here'}</div>
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
