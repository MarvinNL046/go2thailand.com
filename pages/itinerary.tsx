import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EmailCapture from '../components/EmailCapture';

export default function ItineraryPillarPage() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Thailand Reisroute' : 'Thailand Itinerary', href: '/itinerary/' },
  ];

  const faqItems = [
    {
      question: 'Is 7 days enough for Thailand?',
      answer: 'Yes, 7 days is enough for a rewarding Thailand trip if you focus on one region. A popular week-long route is 2-3 days in Bangkok for temples and street food, followed by 4-5 days on one island or beach destination like Koh Samui or Phuket. Trying to squeeze in both the north (Chiang Mai) and the south (islands) in just 7 days means spending too much time in transit and not enough time actually experiencing each place. Pick one direction and save the other for a return trip — because you will want to come back.',
    },
    {
      question: 'Should I go north or south first?',
      answer: 'Go north first, then finish with beaches in the south. Starting with Chiang Mai gives you cultural immersion — temples, cooking classes, elephant sanctuaries, and mountain scenery — while you still have travel energy. By the time you head south to the islands, you are ready to slow down and relax on the beach. This north-to-south flow also works logistically: Chiang Mai has cheap flights to Phuket, Krabi, and Koh Samui, so you avoid backtracking through Bangkok. Ending your trip with sunset cocktails and warm ocean water feels like the perfect finale rather than a rushed beginning.',
    },
    {
      question: 'Can I do Thailand on a budget in 2 weeks?',
      answer: 'Absolutely. A comfortable budget for 2 weeks in Thailand is around 1,500 baht per day ($45 USD), which totals roughly 21,000 baht ($630 USD) excluding international flights. This budget covers guesthouse accommodation (400-600 baht/night), three meals of street food and local restaurants (300-500 baht/day), local transport (100-200 baht/day), and entrance fees for major attractions. Overnight trains and buses between destinations cost 300-800 baht each. The biggest savings come from eating where Thai people eat, using public transport instead of taxis, and booking domestic flights 2-4 weeks in advance. Bangkok and Chiang Mai are the most budget-friendly bases, while islands like Koh Samui and Phuket cost 20-30% more.',
    },
    {
      question: 'What is the best month for a Thailand trip?',
      answer: 'November to February is the best window for a Thailand trip. These cool-season months bring lower humidity, minimal rain, and comfortable temperatures of 25-30 degrees Celsius across most of the country. December and January are peak tourist season with higher prices but the best weather everywhere. November and February are excellent shoulder months with fewer crowds and lower rates. If you can only travel during March-May (hot season), head to the islands where sea breezes keep things bearable. The rainy season from June to October offers dramatic discounts of 30-50% on accommodation but brings daily afternoon downpours — though mornings are usually clear.',
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
        title="Thailand Itinerary: 1, 2, 3 & 4-Week Travel Plans (2026) | Go2Thailand"
        description="Complete Thailand itinerary guide for 2026. Day-by-day travel plans for 7 days, 10 days, 2 weeks, and 3-4 weeks — with costs, transport tips, and routes for every travel style."
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
                Thailand Itinerary: 1, 2, 3 &amp; 4-Week Travel Plans (2026)
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Day-by-day Thailand routes for every trip length and travel style — from a packed 7-day sprint to a leisurely month-long exploration. Real costs, transport options, and practical tips from travelers who have done it.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            {/* Table of Contents */}
            <nav className="bg-white rounded-2xl shadow-md p-6 mb-10">
              <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">{isNl ? 'In deze gids' : 'In this guide'}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <li><a href="#7-day" className="text-thailand-blue hover:underline">{isNl ? '7-Daagse Reisroute (Bangkok + Eilanden)' : '7-Day Itinerary (Bangkok + Islands)'}</a></li>
                <li><a href="#10-day" className="text-thailand-blue hover:underline">{isNl ? '10-Daagse Reisroute (Noord + Zuid)' : '10-Day Itinerary (North + South)'}</a></li>
                <li><a href="#2-week" className="text-thailand-blue hover:underline">{isNl ? '2-Weken Reisroute (De Klassieke Route)' : '2-Week Itinerary (The Classic Route)'}</a></li>
                <li><a href="#3-4-week" className="text-thailand-blue hover:underline">{isNl ? '3-4 Weken Reisroute (Uitgebreid)' : '3-4 Week Itinerary (Deep Dive)'}</a></li>
                <li><a href="#by-interest" className="text-thailand-blue hover:underline">{isNl ? 'Reisroutes per Interesse' : 'Itineraries by Interest'}</a></li>
                <li><a href="#transport" className="text-thailand-blue hover:underline">{isNl ? 'Vervoer Tussen Bestemmingen' : 'Getting Between Destinations'}</a></li>
                <li><a href="#faq" className="text-thailand-blue hover:underline">{isNl ? 'Reisroute FAQ\'s' : 'Itinerary FAQs'}</a></li>
              </ul>
            </nav>

            {/* Intro paragraph */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Thailand is a country that rewards both careful planning and spontaneous detours. Whether you have a single week of vacation or the luxury of a month-long adventure, the right itinerary makes all the difference between a rushed checklist and a trip that flows naturally from one unforgettable experience to the next. This guide breaks down the most popular Thailand routes into day-by-day plans, complete with real costs in Thai baht, transport logistics, and the kind of practical details that guidebooks tend to skip.
            </p>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              Every itinerary here has been designed around how Thailand actually works on the ground — flight schedules, ferry timetables, and the distances between destinations that look close on a map but take longer than you expect. We have included budget estimates based on 2026 prices, and each route can be adjusted to suit your pace. Whether you are a temple-hopping culture enthusiast, a beach-loving island hopper, a food-obsessed traveler, or a family looking for kid-friendly adventures, there is a Thailand itinerary here that fits.
            </p>

            {/* ============================================ */}
            {/* SECTION 1: 7-Day Thailand Itinerary */}
            {/* ============================================ */}
            <section id="7-day" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">7-Day Thailand Itinerary (Bangkok + Islands)</h2>
                <p className="text-gray-600 mt-2">The best route when you only have one week. Focuses on two highlights: Bangkok&apos;s cultural energy and a southern island escape.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                A week in Thailand is tight but absolutely doable if you resist the temptation to cram in too many destinations. This itinerary gives you the best of Bangkok&apos;s temples, markets, and street food, then whisks you south for beach time on one of Thailand&apos;s most popular islands. The key to making 7 days work is keeping your transit time short — which means flying between Bangkok and your island destination rather than taking buses or trains.
              </p>

              {/* Day 1-2 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Days 1-2</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Bangkok — Temples, Street Food, and Markets</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Start your Thailand trip in Bangkok, the chaotic, beautiful capital that hits you with sensory overload from the moment you step outside the airport. On your first day, head straight to the Grand Palace and Wat Phra Kaew (entrance fee: ฿500), the most important religious site in Thailand. The complex is enormous — allow 2-3 hours to explore the glittering spires, intricate murals, and the sacred Emerald Buddha. From there, walk five minutes south to Wat Pho, home to the famous 46-meter reclining Buddha covered in gold leaf (entrance fee: ฿300). Wat Pho is also the birthplace of traditional Thai massage, and you can get a one-hour massage on the temple grounds for around ฿500 — the perfect way to recover from jet lag.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    In the evening, head to <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Bangkok&apos;s</Link> legendary street food scene. Yaowarat (Chinatown) comes alive after dark with hundreds of food stalls serving grilled seafood, kuay jab (rolled noodle soup), roasted duck, and mango sticky rice. Budget around ฿200-400 for an incredibly satisfying dinner. For your second day, explore either Chatuchak Weekend Market (Saturday or Sunday only — over 15,000 stalls spanning 35 acres) or one of Bangkok&apos;s famous night markets like Jodd Fairs or Rod Fai. Chatuchak is overwhelming in the best possible way: vintage clothing, handmade jewelry, Thai silk, ceramics, and some of the best market food in the city. If your second day falls on a weekday, spend the morning at Wat Arun (Temple of Dawn, ฿100) and the afternoon exploring the creative neighborhood of Charoen Krung or the rooftop bars along the riverside.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Budget estimate:</strong> ฿3,000-5,000/day (mid-range hotel, food, transport, entrance fees)</p>
                    <p><strong>Where to stay:</strong> Silom, Sukhumvit (near BTS), or Khao San Road area for budget options</p>
                    <p><strong>Transport tip:</strong> Use the BTS Skytrain and MRT metro to avoid Bangkok&apos;s notorious traffic jams</p>
                  </div>
                </div>
              </div>

              {/* Day 3-5 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Days 3-5</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Island Escape — Koh Samui or Phuket</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    On the morning of day 3, fly from Bangkok to either <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">Koh Samui</Link> (1 hour flight, approximately ฿2,000-4,000 one-way) or <Link href="/city/phuket/" className="text-thailand-blue hover:underline font-semibold">Phuket</Link> (1.5 hour flight, approximately ฿1,500-3,000 one-way). Both islands offer stunning beaches, excellent food, and enough activities to fill three days without feeling rushed. Book domestic flights 2-4 weeks in advance on AirAsia, Nok Air, or Thai Lion Air for the best prices — last-minute fares can be double or triple.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    On <strong>Koh Samui</strong>, base yourself on Chaweng Beach for convenience or Lamai Beach for a slightly quieter vibe. Spend day 3 settling in and hitting the beach. On day 4, take a day trip to Ang Thong National Marine Park (฿1,500-2,500 including boat, lunch, and kayaking) — a stunning archipelago of 42 islands with emerald lagoons, hidden caves, and panoramic viewpoints. Day 5 is for the Big Buddha temple (free entry, donations welcome), a Thai cooking class, or simply relaxing with a beachside massage.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    On <strong>Phuket</strong>, the west coast beaches are the main draw. Kata and Karon are ideal for families and swimmers, while Patong is the nightlife hub. Spend day 4 on a boat trip to the Phi Phi Islands (฿1,500-3,000 for a day tour including snorkeling and lunch) or explore Phang Nga Bay&apos;s dramatic limestone karsts by kayak. Day 5 is for Old Phuket Town&apos;s Sino-Portuguese architecture and street art, or a sunset dinner at one of the west coast beach clubs.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Flights:</strong> Bangkok to Koh Samui: ~1hr, ฿2,000-4,000 | Bangkok to Phuket: ~1.5hr, ฿1,500-3,000</p>
                    <p><strong>Budget estimate:</strong> ฿2,500-4,500/day on islands (accommodation is pricier than Bangkok)</p>
                    <p><strong>Tip:</strong> Koh Samui is more compact and relaxed; Phuket offers more variety and nightlife</p>
                  </div>
                </div>
              </div>

              {/* Day 6-7 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Days 6-7</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Return to Bangkok and Departure</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fly back to Bangkok on the morning of day 6 (or the evening before if you want to maximize your last full day). Use your remaining time for the things you missed on days 1-2: the sprawling MBK Center or Siam Paragon for shopping, the trendy cafes and galleries of Ari neighborhood, or a traditional Thai massage at Wat Pho&apos;s massage school. If you are departing from Suvarnabhumi Airport (BKK), the Airport Rail Link from central Bangkok takes just 30 minutes and costs ฿45. From Don Mueang Airport (DMK), take the A1 or A2 bus from Mo Chit BTS station (฿30, 30-45 minutes depending on traffic).
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For a memorable final evening, book a dinner cruise on the Chao Phraya River (฿1,200-2,500 depending on the operator) or head to one of Bangkok&apos;s famous rooftop bars — Sky Bar at Lebua, Octave at Marriott Sukhumvit, or the more affordable Attitude rooftop at Hotel Indigo. Watch the sun set over the city skyline with a cocktail in hand as a fitting end to your week in Thailand.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Total 7-day budget (mid-range):</strong> ฿20,000-30,000 ($570-860 USD) excluding international flights</p>
                    <p><strong>Shopping tip:</strong> MBK Center has better deals than Siam Paragon. Bargaining is expected at MBK.</p>
                    <p><strong>Airport tip:</strong> Allow 2 hours before domestic flights, 3 hours before international departures</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 2: 10-Day Thailand Itinerary */}
            {/* ============================================ */}
            <section id="10-day" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">10-Day Thailand Itinerary (North + South)</h2>
                <p className="text-gray-600 mt-2">The sweet spot for most first-time visitors. Covers Bangkok, Chiang Mai, and one island destination.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Ten days gives you enough time to experience the three pillars of Thailand travel: Bangkok&apos;s urban energy, Chiang Mai&apos;s cultural depth, and the southern islands&apos; beach paradise. This is the most popular route among first-time visitors, and for good reason — it delivers the full spectrum of Thai experiences without excessive travel fatigue. The key addition over the 7-day itinerary is Chiang Mai, which many travelers consider the highlight of their trip.
              </p>

              {/* Day 1-3 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Days 1-3</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Bangkok — Temples, Food Tours, and Rooftop Bars</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    With three days in <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Bangkok</Link>, you can explore at a comfortable pace without the breathless rush of a two-day stopover. Day 1 follows the classic temple circuit: Grand Palace and Wat Phra Kaew (฿500), then a walk to Wat Pho (฿300) for the reclining Buddha and an optional Thai massage. Cross the Chao Phraya River by ferry (฿4) to catch sunset at Wat Arun (฿100), whose ceramic-encrusted spire glows golden in the evening light.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Day 2 is for markets and neighborhoods. If it is a weekend, Chatuchak Market is unmissable. On weekdays, explore the flower market at Pak Khlong Talat (open 24 hours, best before dawn), then wander through the creative studios and hip cafes of Charoen Krung, Bangkok&apos;s oldest road. Take a longtail boat through the canals of Thonburi for a glimpse of old Bangkok — wooden houses on stilts, orchid gardens, and cats sleeping on river docks. A 90-minute canal tour costs around ฿1,000-1,500 per boat.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Day 3 is your food day. Join a morning <Link href="/things-to-do-in-thailand/" className="text-thailand-blue hover:underline font-semibold">street food tour</Link> through Yaowarat (Chinatown) or Bang Rak — guided tours cost ฿800-1,500 and introduce you to dishes you would never find on your own, from boat noodles ladled from a tiny sidewalk pot to charcoal-grilled pork satay at stalls that have been family-run for three generations. In the afternoon, head to a rooftop bar for sundowners with views over the city. For a budget-friendly option, try Roof at Siam@Siam (cocktails around ฿250-350) rather than the tourist-priced Sky Bar (฿400+ per drink).
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Budget estimate:</strong> ฿3,000-5,000/day (mid-range)</p>
                    <p><strong>Must-eat:</strong> Kuay jab (rolled noodle soup) in Chinatown, pad kra pao (basil stir-fry) at any street stall</p>
                    <p><strong>Transport:</strong> Grab app for taxis, BTS/MRT for fixed-price rides, Chao Phraya Express Boat for riverside sights</p>
                  </div>
                </div>
              </div>

              {/* Day 4-6 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Days 4-6</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Chiang Mai — Doi Suthep, Cooking Class, and Elephants</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fly from Bangkok to <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Chiang Mai</Link> on the morning of day 4 (1 hour flight, ฿1,200-2,500 on budget airlines). Chiang Mai is the cultural heart of northern Thailand — a city of over 300 temples within a moated old town, surrounded by misty mountains and lush countryside. The pace here is noticeably slower than Bangkok, and the air feels cleaner.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    On day 4, head up to Wat Phra That Doi Suthep (entrance fee: ฿30), the golden hilltop temple that overlooks the city from 1,070 meters above sea level. Climb the 309 steps of the Naga staircase or take the funicular for ฿20. The panoramic views of Chiang Mai and the surrounding valley are spectacular on a clear day. Back in the old town, explore Wat Chedi Luang (a massive 14th-century temple with a half-ruined chedi) and Wat Phra Singh (home to one of Thailand&apos;s most revered Buddha images). In the evening, browse the Night Bazaar along Chang Klan Road for handicrafts, art, and food stalls.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Day 5 is for a Thai cooking class — Chiang Mai is the undisputed cooking class capital of Thailand. Half-day classes (฿800-1,500) typically start with a market tour where you learn to identify lemongrass, galangal, kaffir lime leaves, and Thai basil, then return to the kitchen to prepare 4-6 dishes including pad thai, green curry, tom yum soup, and mango sticky rice. Farm-based classes outside the city (฿1,200-2,000) include the market visit plus a peaceful setting among rice paddies. Book early in your trip so you can order with confidence for the rest of your stay.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Day 6 is your elephant day. Visit an ethical elephant sanctuary where rescued elephants roam freely and you observe, feed, and walk alongside them rather than riding. Reputable sanctuaries include Elephant Nature Park and Elephant Jungle Sanctuary (฿2,000-3,500 for a half-day visit including transport and lunch). Avoid any operation that offers elephant riding, painting, or circus-style performances — these are signs of animal exploitation. Spend the evening at the Sunday Walking Street Market (Ratchadamnoen Road) if timing aligns, or the Saturday Night Market on Wua Lai Road, both of which are far more atmospheric than the daily Night Bazaar.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Flight:</strong> Bangkok to Chiang Mai: ~1 hour, ฿1,200-2,500 on AirAsia/Nok Air/Thai Lion</p>
                    <p><strong>Budget estimate:</strong> ฿2,000-3,500/day (Chiang Mai is cheaper than Bangkok)</p>
                    <p><strong>Ethical elephant tip:</strong> Look for sanctuaries that are &quot;no-ride&quot; and let elephants roam freely in natural habitat</p>
                  </div>
                </div>
              </div>

              {/* Day 7-9 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Days 7-9</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Islands — Beach, Diving, and Island Hopping</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fly from Chiang Mai directly to <Link href="/city/phuket/" className="text-thailand-blue hover:underline font-semibold">Phuket</Link> (2 hours, ฿1,500-3,500) or <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">Koh Samui</Link> (1.5 hours with a stop, ฿2,500-5,000). Direct flights from Chiang Mai to the south are available daily, saving you the backtrack through Bangkok. These three island days are your reward for the cultural deep-dive of the first week — unstructured beach time, snorkeling excursions, and long dinners watching the sunset.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you choose the Andaman coast (Phuket, <Link href="/city/krabi/" className="text-thailand-blue hover:underline font-semibold">Krabi</Link>), take a day trip to the <Link href="/thailand-islands/" className="text-thailand-blue hover:underline font-semibold">Phi Phi Islands</Link> for snorkeling among tropical fish in crystal-clear water (฿1,500-3,000 for a full-day tour including lunch). The second island day is for relaxing on the beach, getting a ฿300 beachside massage, and exploring local restaurants. If you are on the Gulf coast (Koh Samui, <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline font-semibold">Koh Phangan</Link>, <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">Koh Tao</Link>), the snorkeling and diving are world-class. A fun-dive for certified divers costs around ฿2,500-3,500 for two dives.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Flight:</strong> Chiang Mai to Phuket/Krabi: ~2hr, ฿1,500-3,500 | to Koh Samui: ~1.5hr (via Bangkok), ฿2,500-5,000</p>
                    <p><strong>Island season:</strong> Andaman (Nov-Apr best) | Gulf (year-round, wettest Oct-Dec)</p>
                    <p><strong>Tip:</strong> If you want both Phuket and an island, fly into Phuket, then ferry to Koh Phi Phi or Koh Lanta</p>
                  </div>
                </div>
              </div>

              {/* Day 10 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Day 10</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Return to Bangkok for Departure</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fly back to Bangkok for your international departure. If your flight is in the evening, you have time for a final temple visit, a last round of street food, or some souvenir shopping at Terminal 21 (a quirky mall where each floor is themed after a different city). Phuket also has direct international flights to many Asian and European cities, so you may be able to skip the return to Bangkok entirely — check routes before booking.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Total 10-day budget (mid-range):</strong> ฿28,000-42,000 ($800-1,200 USD) excluding international flights</p>
                    <p><strong>Pro tip:</strong> Check if Phuket has direct international flights to your home city — saves time and often money</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mid-page Email Capture */}
            <EmailCapture heading="Planning your Thailand trip?" subtext="Get weekly travel tips, hidden-gem routes, and budget hacks delivered straight to your inbox." />

            {/* ============================================ */}
            {/* SECTION 3: 2-Week Thailand Itinerary */}
            {/* ============================================ */}
            <section id="2-week" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">2-Week Thailand Itinerary (The Classic Route)</h2>
                <p className="text-gray-600 mt-2">The gold standard for first-timers. Two weeks lets you slow down, take overnight trains, and add off-beat destinations like Pai.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Two weeks in Thailand is the trip length most travelers wish they had booked. It removes the pressure to rush between destinations and opens up options that shorter trips simply cannot accommodate — overnight trains, detours to mountain towns, and the ability to island-hop rather than settle for just one beach. This route covers the classic north-to-south traverse that has been the backbone of Thailand travel for decades, with a few modern updates.
              </p>

              {/* Week 1 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Week 1</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Bangkok, Overnight Train to Chiang Mai, and Pai</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Days 1-2: Bangkok.</strong> Follow the Bangkok itinerary above: Grand Palace, Wat Pho, street food in Chinatown, markets, and rooftop bars. Two days is enough to hit the highlights and still leave some neighborhoods for your return at the end of the trip.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Day 2 evening: Overnight train to Chiang Mai.</strong> This is one of Thailand&apos;s iconic travel experiences. The sleeper train departs Bangkok&apos;s Hua Lamphong station (or the newer Bang Sue Grand Station) in the evening and arrives in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Chiang Mai</Link> the next morning after 11-13 hours. Second-class sleeper berths (฿800-1,000) have fold-down beds with clean sheets and curtains for privacy. First-class private cabins (฿1,100-1,300) come with a lockable door and a small washbasin. The gentle rocking of the train through the Thai countryside at night is unforgettable, and you wake up in an entirely different world — misty mountains instead of concrete towers. Book tickets at the station 2-3 days in advance or through <Link href="/transport/" className="text-thailand-blue hover:underline font-semibold">12Go</Link> online.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Days 3-5: Chiang Mai.</strong> Three full days in Chiang Mai gives you time for Doi Suthep, a cooking class, an elephant sanctuary, and unhurried exploration of the old town&apos;s temples and cafes. Chiang Mai&apos;s coffee scene is excellent — the northern hills produce Thailand&apos;s best arabica beans, and specialty cafes in the Nimmanhaemin neighborhood serve single-origin Thai coffee that rivals anything you would find in Melbourne or Portland.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Days 6-7: <Link href="/city/pai/" className="text-thailand-blue hover:underline font-semibold">Pai</Link>.</strong> Take the minibus from Chiang Mai to Pai (3 hours, ฿150-200, 762 curves through mountain roads — take motion sickness medicine if needed). Pai is a tiny town in a mountain valley that has become a backpacker favorite for its laid-back atmosphere, hot springs, waterfalls, and some of the most photogenic scenery in Thailand. Rent a scooter (฿150-200/day) and spend two days exploring Pai Canyon (a dramatic narrow ridge walk at sunset), Pam Bok Waterfall, the Pai hot springs (฿300 entry for the national park hot springs, or free at the natural riverside ones), and the White Buddha on the hill overlooking town. At night, Pai&apos;s Walking Street comes alive with food stalls, live music, and a bohemian market selling handmade goods.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Overnight train:</strong> Bangkok-Chiang Mai, 11-13 hours. 2nd class sleeper from ฿800, 1st class from ฿1,100</p>
                    <p><strong>Pai minibus:</strong> Chiang Mai-Pai, 3 hours, ฿150-200. Book at Arcade Bus Station or any travel agent.</p>
                    <p><strong>Pai tip:</strong> Take motion sickness medication before the minibus ride — it is 762 curves through mountains</p>
                  </div>
                </div>
              </div>

              {/* Week 2 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Week 2</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">Fly South: Krabi, Koh Phi Phi or Koh Lanta, and Bangkok</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Day 8: Return to Chiang Mai, fly south.</strong> Take the morning minibus back from Pai to Chiang Mai (3 hours), then catch an afternoon flight to <Link href="/city/krabi/" className="text-thailand-blue hover:underline font-semibold">Krabi</Link> (2 hours, ฿1,500-3,000). Arrive in Krabi by evening and check into your hotel in Ao Nang or Krabi Town.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Days 9-10: Krabi.</strong> Krabi province is the gateway to some of Thailand&apos;s most stunning coastal scenery. On day 9, take a Four Islands tour by longtail boat (฿800-1,500 per person including lunch and snorkeling gear). You will visit Tup Island (where a sandbar connects two islands at low tide), Chicken Island, Poda Island, and Phra Nang Cave Beach — one of the most beautiful beaches in the world, backed by a towering limestone cliff with a cave shrine. Day 10 is for Railay Beach, accessible only by longtail boat from Ao Nang (฿100-200, 15 minutes). Railay is a rock-climbing mecca with world-class routes on limestone cliffs, but it is equally enjoyable for non-climbers who simply want to swim, kayak, or hike to the lagoon viewpoint.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Days 11-13: <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">Koh Lanta</Link> or Koh Phi Phi.</strong> From Krabi, take a ferry to your island of choice. Koh Phi Phi (1.5 hours, ฿450-600) is stunning but busy — dramatic cliffs, excellent snorkeling, and a lively party scene. <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">Koh Lanta</Link> (1.5 hours by ferry, ฿400, or 2 hours by minivan plus car ferry) is the laid-back alternative with long empty beaches, a charming Old Town, and some of the best snorkeling day trips in Thailand to Koh Rok and Koh Haa. Spend three days island-hopping, snorkeling, eating fresh seafood at beachfront restaurants, and watching sunsets from the west coast.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Day 14: Return to Bangkok.</strong> Ferry back to Krabi, then fly to Bangkok (or directly from Phuket if you can get there by minivan). Use any remaining time for last-minute shopping, a final massage, or a farewell pad thai from your favorite street stall.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Ferries:</strong> Krabi to Koh Phi Phi: 1.5hr, ฿450-600 | Krabi to Koh Lanta: 1.5hr, ฿400</p>
                    <p><strong>Total 2-week budget (mid-range):</strong> ฿38,000-55,000 ($1,100-1,600 USD) excluding international flights</p>
                    <p><strong>Island choice tip:</strong> Phi Phi for energy and snorkeling, Koh Lanta for peace and relaxation</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 4: 3-4 Week Thailand Itinerary */}
            {/* ============================================ */}
            <section id="3-4-week" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">3-4 Week Thailand Itinerary (Deep Dive)</h2>
                <p className="text-gray-600 mt-2">The complete north-to-south journey for travelers with time to spare. Adds historical cities, national parks, and off-the-beaten-path gems.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Three to four weeks in Thailand opens up an entirely different kind of trip. You have time to visit destinations that most tourists skip, travel at a pace that allows genuine connections with local communities, and explore regions that shorter itineraries simply cannot accommodate. This route runs from Bangkok all the way through the historical heartland, up to the northern mountains, and down to the southern islands — covering more of the country than most residents have seen.
              </p>

              <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">The Complete Route</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Days 1-3: Bangkok.</strong> Three days for temples, food, markets, and canal tours. With more time ahead, you can explore beyond the tourist center — visit the Jim Thompson House (฿200), the Museum of Contemporary Art (MOCA, ฿250), or take a day trip to the Maeklong Railway Market where a functioning train passes through a narrow alley of market stalls eight times a day.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Days 4-5: <Link href="/city/ayutthaya/" className="text-thailand-blue hover:underline font-semibold">Ayutthaya</Link>.</strong> Take the train from Bangkok (2 hours, ฿20-245 depending on class). Spend two days cycling through the UNESCO-listed ruins of Thailand&apos;s former capital. Highlights include Wat Mahathat (with the Buddha head in the tree roots), Wat Phra Si Sanphet (three iconic chedis), and the Ayutthaya Floating Market. Stay overnight to see the temples lit up after dark — a magical experience that day-trippers miss entirely.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Days 6-7: <Link href="/city/sukhothai/" className="text-thailand-blue hover:underline font-semibold">Sukhothai</Link>.</strong> Bus from Ayutthaya to Sukhothai (5-6 hours, ฿250-400). Sukhothai was the first capital of the Thai kingdom, and its historical park feels more contemplative and less crowded than Ayutthaya. Rent a bicycle (฿30/day) and explore the central zone&apos;s 21 temples and four lotus ponds at your own pace. The centrepiece is Wat Mahathat with its iconic seated Buddha reflected in still water. If you have an extra day, visit Si Satchanalai Historical Park, 60 km north — even quieter and equally beautiful.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Days 8-11: Chiang Mai and Pai.</strong> Bus or fly from Sukhothai to Chiang Mai (6 hours by bus, ฿250-350; or fly via Bangkok). Follow the Chiang Mai and Pai itinerary from the 2-week plan above: temples, cooking class, elephants, coffee culture, and two days exploring Pai&apos;s mountain scenery.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Days 12-13: <Link href="/city/chiang-rai/" className="text-thailand-blue hover:underline font-semibold">Chiang Rai</Link>.</strong> Bus from Chiang Mai to Chiang Rai (3 hours, ฿150-250). Visit the White Temple (Wat Rong Khun, ฿200), the Blue Temple (Wat Rong Suea Ten, free), and the Black House (Baan Dam Museum, ฿80) — three of the most artistically striking sites in Thailand, all created by contemporary Thai artists. Take a boat trip on the Mekong River at Chiang Saen for views into Laos and Myanmar from the Golden Triangle viewpoint.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Days 14-15: Fly south to Krabi or Phuket.</strong> Fly from Chiang Rai (via Bangkok or Chiang Mai) to the southern coast. Spend two days exploring Krabi&apos;s islands, Railay Beach, or the Tiger Cave Temple (1,256 steps to a panoramic viewpoint — start early to avoid the heat).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Days 16-19: Island hopping.</strong> Ferry to the islands for four days of beach life. With this much time, you can island-hop between multiple destinations: Koh Phi Phi for one night, then Koh Lanta for two nights, or Phuket to Koh Yao Noi to Koh Yao Yai. On the Gulf side, do three nights on <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline font-semibold">Koh Phangan</Link> (yoga, beaches, optional Full Moon Party) and two nights on <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">Koh Tao</Link> (diving and snorkeling).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Days 20-21: Bangkok and departure.</strong> Return to Bangkok for any final exploration, shopping at MBK or Terminal 21, and departure.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Off-Beat Additions for a 4th Week</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have a full four weeks, consider adding some of these less-visited destinations that offer experiences you will not find on the standard tourist trail:
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-thailand-blue font-bold shrink-0">Kanchanaburi</span>
                    <p className="text-gray-700 text-sm">2-3 days. The Bridge over the River Kwai, the JEATH War Museum, Erawan National Park (7-tiered waterfall with natural swimming pools), and the Hellfire Pass Memorial Walk. A sobering historical experience combined with stunning nature. 2.5 hours west of Bangkok by bus (฿120).</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-thailand-blue font-bold shrink-0">Khao Sok</span>
                    <p className="text-gray-700 text-sm">2-3 days. Thailand&apos;s oldest evergreen rainforest, 160 million years old. Sleep in floating bungalows on Cheow Lan Lake, kayak through limestone gorges, and trek through jungle where you might spot gibbons, hornbills, and the world&apos;s largest flower (Rafflesia). Located between Krabi and Surat Thani.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-thailand-blue font-bold shrink-0">Isaan</span>
                    <p className="text-gray-700 text-sm">3-4 days. Thailand&apos;s vast northeastern region is where few tourists venture but where you will find the most authentic Thai culture and some of the best food in the country. Nakhon Ratchasima (Korat) is the gateway, with Khao Yai National Park (UNESCO) nearby. Udon Thani gives access to the Red Lotus Sea (January-February) and prehistoric sites at Ban Chiang.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-thailand-blue font-bold shrink-0">Hat Yai</span>
                    <p className="text-gray-700 text-sm">1-2 days. Thailand&apos;s deep south, near the Malaysian border. Outstanding southern Thai food (fiery and intense), the floating market at Khlong Hae, and a completely different cultural vibe with strong Malay-Muslim influences.</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1 mt-4">
                  <p><strong>Total 3-week budget (mid-range):</strong> ฿50,000-75,000 ($1,430-2,150 USD) excluding international flights</p>
                  <p><strong>Total 4-week budget (mid-range):</strong> ฿65,000-95,000 ($1,860-2,720 USD) excluding international flights</p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Thailand Itinerary by Interest */}
            {/* ============================================ */}
            <section id="by-interest" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">Thailand Itinerary by Interest</h2>
                <p className="text-gray-600 mt-2">Not everyone travels the same way. Here are tailored 10-day routes for foodies, adventurers, couples, and families.</p>
              </div>

              {/* Foodies */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">The Foodie Itinerary (10 Days)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Thailand is one of the world&apos;s great food destinations, and this itinerary is built around eating your way from north to south. Start with <strong>3 days in Bangkok</strong> focused entirely on food: a guided street food tour through Yaowarat (Chinatown), lunch at one of the city&apos;s Michelin-starred street stalls like Jay Fai (crab omelette, ฿1,000) or Raan Jay Fai noodle shops, and dinner at a local restaurant in the Ari neighborhood where Bangkok residents actually eat. Visit Or Tor Kor Market (consistently ranked among the world&apos;s best fresh markets) for tropical fruits you have never seen before.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fly to <strong>Chiang Mai for 2 days</strong> of northern Thai cuisine — take a cooking class focusing on khao soi (the coconut curry noodle soup that defines northern Thai food), sai ua (herbal northern sausage), and nam prik (chili dips served with fresh vegetables). The Saturday and Sunday walking street markets have the best food stall diversity in the country. Continue south for <strong>2 days in Hat Yai</strong> for fiery southern Thai food — gaeng som (sour curry), massaman curry with its Malay influences, and roti canai at Muslim-owned stalls. Finish with <strong>3 days on the islands</strong> for fresh-caught seafood barbecued on the beach.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p><strong>Route:</strong> Bangkok (3d) → Chiang Mai (2d) → Hat Yai (2d) → Koh Samui or Koh Lanta (3d)</p>
                  </div>
                </div>
              </div>

              {/* Adventure */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">The Adventure Itinerary (10 Days)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For adrenaline seekers and nature lovers, Thailand delivers far beyond its beach reputation. Start with <strong>2 days in Bangkok</strong> for Muay Thai — either watch a live fight at Rajadamnern Stadium (฿1,000-2,000) or try a beginner class at a training gym (฿500-800 for a 2-hour session). Then head to <strong>Khao Sok National Park for 2 days</strong> of jungle trekking, kayaking through limestone canyons on Cheow Lan Lake, and sleeping in floating bungalows surrounded by 160-million-year-old rainforest.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ferry to <strong><Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">Koh Tao</Link> for 3 days</strong> of diving — either get PADI certified (฿9,000-11,000 for the 3-4 day Open Water course) or do fun dives at sites like Sail Rock and Chumphon Pinnacle where whale sharks are occasionally spotted. Finish with <strong>3 days in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Chiang Mai</Link></strong> for Muay Thai training at one of the city&apos;s renowned camps, mountain biking on Doi Suthep&apos;s trails, or white-water rafting on the Mae Taeng River (฿1,500-2,500 for a half-day trip).
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p><strong>Route:</strong> Bangkok (2d) → Khao Sok (2d) → Koh Tao (3d) → Chiang Mai (3d)</p>
                  </div>
                </div>
              </div>

              {/* Couples */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">The Couples Itinerary (10 Days)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Thailand is one of the most romantic destinations in Southeast Asia, offering everything from candlelit dinners on the beach to couples&apos; spa treatments and sunset cruises. Start with <strong>2 days in Bangkok</strong> focused on romance: a sunset dinner cruise on the Chao Phraya River (฿1,200-2,500), cocktails at a rooftop bar overlooking the glittering skyline, and a couples&apos; Thai massage at a luxury spa (฿3,000-5,000 for 2 hours for two people). The Mandarin Oriental&apos;s spa is legendary, but excellent options exist at a fraction of the price.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fly to <strong><Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Chiang Mai</Link> for 2 days</strong> of cultural exploration together — a private cooking class (฿2,500-3,500 for two), a visit to Doi Suthep at sunset, and dinner at one of the old town&apos;s atmospheric courtyard restaurants. Then fly south for <strong>4 days on <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">Koh Lanta</Link> or Koh Lipe</strong> — two of Thailand&apos;s most peaceful islands with long stretches of uncrowded beach, stunning sunsets, and boutique beachfront resorts. Koh Lipe&apos;s crystal-clear water is perfect for snorkeling right from the shore, and the island&apos;s Walking Street has romantic beachfront dining with fairy lights and fresh seafood. End with <strong>2 final days</strong> relaxing before departure.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p><strong>Route:</strong> Bangkok (2d) → Chiang Mai (2d) → Koh Lanta or Koh Lipe (4d) → Bangkok (2d)</p>
                  </div>
                </div>
              </div>

              {/* Families */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">The Family Itinerary (10 Days)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Thailand is exceptionally family-friendly — Thai culture adores children, and kids are welcomed everywhere from temple grounds to street food stalls. Start with <strong>3 days in <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Bangkok</Link></strong> with kid-friendly activities: the SEA LIFE Bangkok Ocean World aquarium (฿990 adults, ฿790 children), a longtail boat ride through the canals (kids love it), the Grand Palace (free for children under 120cm), and the interactive exhibits at the Bangkok National Museum. For food, introduce kids to Thai cuisine gently — chicken satay, pad thai, mango sticky rice, and coconut ice cream are universally kid-approved.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fly to <strong><Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">Koh Samui</Link> for 4 days</strong> — the most family-friendly island in Thailand with calm, shallow beaches (especially Lamai and Maenam), family resort pools, and activities like the Samui Aquarium and Tiger Zoo (฿700), Namuang Waterfall (free, natural swimming pool at the base), and the Na Thon Day Market. Many resorts offer kids&apos; clubs and family suites. Finish with <strong>3 days in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Chiang Mai</Link></strong> for the ethical elephant experience (kids aged 4+ are welcome at most sanctuaries), a family cooking class, and the Chiang Mai Night Safari zoo (฿800 adults, ฿400 children).
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p><strong>Route:</strong> Bangkok (3d) → Koh Samui (4d) → Chiang Mai (3d)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: Getting Between Destinations */}
            {/* ============================================ */}
            <section id="transport" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">Getting Between Destinations</h2>
                <p className="text-gray-600 mt-2">Thailand&apos;s domestic transport network is excellent and affordable. Here is how to move between the cities and islands in each itinerary.</p>
              </div>

              <div className="space-y-6">
                {/* Domestic Flights */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Domestic Flights</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Thailand&apos;s budget airlines — AirAsia, Nok Air, and Thai Lion Air — connect Bangkok to every major destination for ฿1,500-4,000 one-way when booked 2-4 weeks in advance. Last-minute fares can spike to ฿5,000-8,000, so planning ahead saves real money. Bangkok has two airports: Suvarnabhumi (BKK) handles most international and full-service domestic flights, while Don Mueang (DMK) serves the budget carriers. Double-check which airport your flight departs from — they are 30 km apart, and switching between them in Bangkok traffic can take over an hour. Direct flights between Chiang Mai and the southern islands (Phuket, Krabi, Surat Thani) run daily, so you do not have to backtrack through Bangkok for the north-to-south traverse.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Typical fares (booked 2-4 weeks ahead):</strong> Bangkok-Chiang Mai ฿1,200-2,500 | Bangkok-Phuket ฿1,500-3,000 | Bangkok-Koh Samui ฿2,000-4,000 | Chiang Mai-Krabi ฿1,500-3,500</p>
                    <p><strong>Tip:</strong> AirAsia and Nok Air charge for checked bags. Carry-on only (7kg) keeps costs down.</p>
                  </div>
                </div>

                {/* Overnight Trains */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Overnight Trains</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The Bangkok-Chiang Mai overnight sleeper train is one of Thailand&apos;s classic travel experiences and a practical way to save a night&apos;s accommodation. The journey takes 11-13 hours, departing in the evening and arriving the next morning. Second-class sleeper berths (฿800-1,000) have fold-down beds with clean sheets, a pillow, and curtains for privacy — lower berths are wider and slightly more expensive than upper berths. First-class private cabins (฿1,100-1,300) come with a lockable door, a small sink, and two beds (ideal for couples). The trains have a dining car serving Thai dishes and cold beer, and vendors pass through selling snacks and coffee. Overnight trains also run to Surat Thani (gateway to Koh Samui, Koh Phangan, and Koh Tao), Nakhon Si Thammarat, and Hat Yai in the south.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Bangkok-Chiang Mai:</strong> 11-13 hours | 2nd class sleeper from ฿500 (seat) to ฿1,000 (lower berth) | 1st class from ฿1,300</p>
                    <p><strong>Booking:</strong> 12Go.co (online, English), or at train station ticket windows. Book 3-7 days ahead for sleeper berths.</p>
                  </div>
                </div>

                {/* Buses and Minivans */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">Buses and Minivans</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Buses and minivans are the cheapest way to travel between Thai cities and the only option for reaching smaller destinations like Pai, Kanchanaburi, and Sukhothai that do not have airports. Government-run buses are comfortable, air-conditioned, and remarkably affordable — Bangkok to Chiang Mai by VIP bus (12 hours overnight) costs just ฿500-800 with reclining seats, blankets, and onboard meals. Minivans are faster than buses for shorter routes (Bangkok to Hua Hin in 3 hours for ฿200, Chiang Mai to Pai in 3 hours for ฿150) but less comfortable for long journeys. Book bus and minivan tickets through <Link href="/transport/" className="text-thailand-blue hover:underline font-semibold">12Go</Link> for English-language booking and e-tickets, or purchase directly at bus stations for slightly lower prices.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Useful routes:</strong> Bangkok-Ayutthaya: 1.5hr, ฿70 minivan | Bangkok-Kanchanaburi: 2.5hr, ฿120 bus | Chiang Mai-Pai: 3hr, ฿150 minivan</p>
                    <p><strong>Tip:</strong> VIP buses are significantly better than 2nd class. The extra ฿100-200 is worth it for overnight journeys.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 7: Itinerary FAQs */}
            {/* ============================================ */}
            <section id="faq" className="mb-12">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">Itinerary FAQs</h2>
                <p className="text-gray-600 mt-2">Quick answers to the most common Thailand itinerary planning questions.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="space-y-6">
                  {faqItems.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-bold font-heading text-gray-900 mb-2 text-lg">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      {item.question === 'Is 7 days enough for Thailand?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/thailand-itinerary/" className="text-thailand-blue hover:underline font-semibold">Browse our ready-made itineraries →</Link>
                        </p>
                      )}
                      {item.question === 'Can I do Thailand on a budget in 2 weeks?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/blog/thailand-budget-2026-daily-costs/" className="text-thailand-blue hover:underline font-semibold">Full Thailand budget breakdown 2026 →</Link>
                        </p>
                      )}
                      {item.question === 'What is the best month for a Thailand trip?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/best-time-to-visit/" className="text-thailand-blue hover:underline font-semibold">Month-by-month weather guide →</Link>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Email Capture */}
            <EmailCapture heading="Want personalized itinerary tips?" subtext="Get our weekly newsletter with hidden gems, budget hacks, and insider routes for Thailand." />

            {/* Cross-links to other pillar pages */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Ontdek Meer Thailand Gidsen' : 'Explore More Thailand Guides'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/thailand-travel-guide/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Travel Guide</div>
                  <div className="text-xs text-gray-600">Everything you need</div>
                </Link>
                <Link href="/best-places-to-visit-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Best Places</div>
                  <div className="text-xs text-gray-600">33 destinations</div>
                </Link>
                <Link href="/things-to-do-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Things to Do</div>
                  <div className="text-xs text-gray-600">25 top experiences</div>
                </Link>
                <Link href="/thailand-for-first-timers/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">First Timers</div>
                  <div className="text-xs text-gray-600">Start here</div>
                </Link>
                <Link href="/thailand-islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Thai Islands</div>
                  <div className="text-xs text-gray-600">Beach paradise</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Thai Food</div>
                  <div className="text-xs text-gray-600">Cuisine guide</div>
                </Link>
                <Link href="/is-thailand-safe/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Safety Guide</div>
                  <div className="text-xs text-gray-600">Stay safe</div>
                </Link>
                <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Transport</div>
                  <div className="text-xs text-gray-600">Buses, trains, flights</div>
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
