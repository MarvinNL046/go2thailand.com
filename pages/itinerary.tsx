import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EmailCapture from '../components/EmailCapture';
import { useT } from '../lib/i18n';
import { strings as i18nStrings } from '../lib/i18n/itinerary';

export default function ItineraryPillarPage() {
  const t = useT(i18nStrings);
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
        title={t("s001_thailand_itinerary_1_2")}
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
                {t("s001_thailand_itinerary_1_2")}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("s002_day_by_day_thailand")}
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
              {isNl
                ? 'Thailand is een land dat zowel zorgvuldige planning als spontane omwegen beloont. Of je nu een enkele week vakantie hebt of de luxe van een maandlang avontuur, de juiste reisroute maakt het verschil tussen een gehaaste checklist en een reis die natuurlijk van de ene onvergetelijke ervaring naar de volgende vloeit. Deze gids deelt de populairste Thailand-routes op in dag-voor-dag plannen, compleet met echte kosten in Thaise baht, vervoerslogistiek en het soort praktische details dat reisgidsen vaak overslaan.'
                : 'Thailand is a country that rewards both careful planning and spontaneous detours. Whether you have a single week of vacation or the luxury of a month-long adventure, the right itinerary makes all the difference between a rushed checklist and a trip that flows naturally from one unforgettable experience to the next. This guide breaks down the most popular Thailand routes into day-by-day plans, complete with real costs in Thai baht, transport logistics, and the kind of practical details that guidebooks tend to skip.'}
            </p>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              {isNl
                ? 'Elke reisroute hier is ontworpen rond hoe Thailand in de praktijk werkt — vluchtschema\'s, veerdienstregelingen en de afstanden tussen bestemmingen die dichtbij lijken op de kaart maar langer duren dan je verwacht. We hebben budgetschattingen opgenomen op basis van prijzen uit 2026, en elke route kan worden aangepast aan jouw tempo. Of je nu een tempelspringende cultuurliefhebber bent, een strandminnende eilandhopper, een door eten geobsedeerde reiziger, of een gezin op zoek naar kindvriendelijke avonturen — er is hier een Thailand-reisroute die past.'
                : 'Every itinerary here has been designed around how Thailand actually works on the ground — flight schedules, ferry timetables, and the distances between destinations that look close on a map but take longer than you expect. We have included budget estimates based on 2026 prices, and each route can be adjusted to suit your pace. Whether you are a temple-hopping culture enthusiast, a beach-loving island hopper, a food-obsessed traveler, or a family looking for kid-friendly adventures, there is a Thailand itinerary here that fits.'}
            </p>

            {/* ============================================ */}
            {/* SECTION 1: 7-Day Thailand Itinerary */}
            {/* ============================================ */}
            <section id="7-day" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">7-Day Thailand Itinerary (Bangkok + Islands)</h2>
                <p className="text-gray-600 mt-2">{t("s002_the_best_route_when")}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {isNl
                  ? 'Een week in Thailand is krap maar absoluut haalbaar als je de verleiding weerstaat om te veel bestemmingen in te proppen. Deze reisroute geeft je het beste van Bangkok\'s tempels, markten en straatvoedsel, en brengt je vervolgens snel naar het zuiden voor strandtijd op een van Thailand\'s populairste eilanden. De sleutel om 7 dagen te laten werken is je reistijd kort houden — wat betekent dat je vliegt tussen Bangkok en je eilandbestemming in plaats van bussen of treinen te nemen.'
                  : 'A week in Thailand is tight but absolutely doable if you resist the temptation to cram in too many destinations. This itinerary gives you the best of Bangkok\'s temples, markets, and street food, then whisks you south for beach time on one of Thailand\'s most popular islands. The key to making 7 days work is keeping your transit time short — which means flying between Bangkok and your island destination rather than taking buses or trains.'}
              </p>

              {/* Day 1-2 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">{t("s003_days_1_2")}</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s004_bangkok_temples_street_food")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s003_start_your_thailand_trip")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s004_in_the_evening_head")} <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Bangkok&apos;s</Link> legendary street food scene. Yaowarat (Chinatown) comes alive after dark with hundreds of food stalls serving grilled seafood, kuay jab (rolled noodle soup), roasted duck, and mango sticky rice. Budget around ฿200-400 for an incredibly satisfying dinner. For your second day, explore either Chatuchak Weekend Market (Saturday or Sunday only — over 15,000 stalls spanning 35 acres) or one of Bangkok&apos;s famous night markets like Jodd Fairs or Rod Fai. Chatuchak is overwhelming in the best possible way: vintage clothing, handmade jewelry, Thai silk, ceramics, and some of the best market food in the city. If your second day falls on a weekday, spend the morning at Wat Arun (Temple of Dawn, ฿100) and the afternoon exploring the creative neighborhood of Charoen Krung or the rooftop bars along the riverside.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>{t("s005_budget_estimate")}</strong> ฿3,000-5,000/day (mid-range hotel, food, transport, entrance fees)</p>
                    <p><strong>{t("s006_where_to_stay")}</strong> {t("s007_silom_sukhumvit_near_bts")}</p>
                    <p><strong>{t("s008_transport_tip")}</strong> {t("s009_use_the_bts_skytrain")}</p>
                  </div>
                </div>
              </div>

              {/* Day 3-5 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">{t("s010_days_3_5")}</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s011_island_escape_koh_samui")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s005_on_the_morning_of")} <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">{t("s012_koh_samui")}</Link> (1 hour flight, approximately ฿2,000-4,000 one-way) or <Link href="/city/phuket/" className="text-thailand-blue hover:underline font-semibold">Phuket</Link> (1.5 hour flight, approximately ฿1,500-3,000 one-way). Both islands offer stunning beaches, excellent food, and enough activities to fill three days without feeling rushed. Book domestic flights 2-4 weeks in advance on AirAsia, Nok Air, or Thai Lion Air for the best prices — last-minute fares can be double or triple.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <><strong>Koh Samui</strong>: verblijf op Chaweng Beach voor het gemak of Lamai Beach voor een iets rustigere sfeer. Besteed dag 3 aan aankomst en het strand. Op dag 4 maak je een dagtocht naar Ang Thong National Marine Park (฿1.500-2.500 inclusief boot, lunch en kajakken) — een prachtige archipel van 42 eilanden met smaragdgroene lagunes, verborgen grotten en panoramische uitkijkpunten. Dag 5 is voor de Big Buddha tempel (gratis entree, donaties welkom), een Thaise kookles, of gewoon ontspannen met een massage op het strand.</>
                      : <>On <strong>{t("s012_koh_samui")}</strong>, base yourself on Chaweng Beach for convenience or Lamai Beach for a slightly quieter vibe. Spend day 3 settling in and hitting the beach. On day 4, take a day trip to Ang Thong National Marine Park (฿1,500-2,500 including boat, lunch, and kayaking) — a stunning archipelago of 42 islands with emerald lagoons, hidden caves, and panoramic viewpoints. Day 5 is for the Big Buddha temple (free entry, donations welcome), a Thai cooking class, or simply relaxing with a beachside massage.</>}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <><strong>Phuket</strong>: de stranden aan de westkust zijn de grote trekpleister. Kata en Karon zijn ideaal voor gezinnen en zwemmers, terwijl Patong het uitgaanscentrum is. Besteed dag 4 aan een boottocht naar de Phi Phi Islands (฿1.500-3.000 voor een dagtour inclusief snorkelen en lunch) of verken de dramatische kalksteenrotsen van Phang Nga Bay per kajak. Dag 5 is voor de Sino-Portugese architectuur en street art van Old Phuket Town, of een zonsondergangdiner bij een van de beachclubs aan de westkust.</>
                      : <>On <strong>Phuket</strong>, the west coast beaches are the main draw. Kata and Karon are ideal for families and swimmers, while Patong is the nightlife hub. Spend day 4 on a boat trip to the Phi Phi Islands (฿1,500-3,000 for a day tour including snorkeling and lunch) or explore Phang Nga Bay&apos;s dramatic limestone karsts by kayak. Day 5 is for Old Phuket Town&apos;s Sino-Portuguese architecture and street art, or a sunset dinner at one of the west coast beach clubs.</>}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Flights:</strong> {t("s014_bangkok_to_koh_samui")}</p>
                    <p><strong>{t("s005_budget_estimate")}</strong> ฿2,500-4,500/day on islands (accommodation is pricier than Bangkok)</p>
                    <p><strong>Tip:</strong> {t("s016_koh_samui_is_more")}</p>
                  </div>
                </div>
              </div>

              {/* Day 6-7 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">{t("s017_days_6_7")}</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s018_return_to_bangkok_and")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s006_fly_back_to_bangkok")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s007_for_a_memorable_final")}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>{t("s019_total_7_day_budget")}</strong> ฿20,000-30,000 ($570-860 USD) excluding international flights</p>
                    <p><strong>{t("s020_shopping_tip")}</strong> {t("s021_mbk_center_has_better")}</p>
                    <p><strong>{t("s022_airport_tip")}</strong> {t("s023_allow_2_hours_before")}</p>
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
                <p className="text-gray-600 mt-2">{t("s024_the_sweet_spot_for")}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {t("s008_ten_days_gives_you")}
              </p>

              {/* Day 1-3 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">{t("s025_days_1_3")}</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s026_bangkok_temples_food_tours")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s009_with_three_days_in")} <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Bangkok</Link>, you can explore at a comfortable pace without the breathless rush of a two-day stopover. Day 1 follows the classic temple circuit: Grand Palace and Wat Phra Kaew (฿500), then a walk to Wat Pho (฿300) for the reclining Buddha and an optional Thai massage. Cross the Chao Phraya River by ferry (฿4) to catch sunset at Wat Arun (฿100), whose ceramic-encrusted spire glows golden in the evening light.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s010_day_2_is_for")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s011_day_3_is_your")} <Link href="/things-to-do-in-thailand/" className="text-thailand-blue hover:underline font-semibold">street food tour</Link> through Yaowarat (Chinatown) or Bang Rak — guided tours cost ฿800-1,500 and introduce you to dishes you would never find on your own, from boat noodles ladled from a tiny sidewalk pot to charcoal-grilled pork satay at stalls that have been family-run for three generations. In the afternoon, head to a rooftop bar for sundowners with views over the city. For a budget-friendly option, try Roof at Siam@Siam (cocktails around ฿250-350) rather than the tourist-priced Sky Bar (฿400+ per drink).
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>{t("s005_budget_estimate")}</strong> ฿3,000-5,000/day (mid-range)</p>
                    <p><strong>Must-eat:</strong> {t("s028_kuay_jab_rolled_noodle")}</p>
                    <p><strong>Transport:</strong> {t("s029_grab_app_for_taxis")}</p>
                  </div>
                </div>
              </div>

              {/* Day 4-6 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">{t("s030_days_4_6")}</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s031_chiang_mai_doi_suthep")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s012_fly_from_bangkok_to")} <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">{t("s032_chiang_mai")}</Link> on the morning of day 4 (1 hour flight, ฿1,200-2,500 on budget airlines). Chiang Mai is the cultural heart of northern Thailand — a city of over 300 temples within a moated old town, surrounded by misty mountains and lush countryside. The pace here is noticeably slower than Bangkok, and the air feels cleaner.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s013_on_day_4_head")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s014_day_5_is_for")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s015_day_6_is_your")}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Flight:</strong> {t("s033_bangkok_to_chiang_mai")}</p>
                    <p><strong>{t("s005_budget_estimate")}</strong> ฿2,000-3,500/day (Chiang Mai is cheaper than Bangkok)</p>
                    <p><strong>{t("s035_ethical_elephant_tip")}</strong> {t("s036_look_for_sanctuaries_that")}</p>
                  </div>
                </div>
              </div>

              {/* Day 7-9 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">{t("s037_days_7_9")}</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s038_islands_beach_diving_and")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s016_fly_from_chiang_mai")} <Link href="/city/phuket/" className="text-thailand-blue hover:underline font-semibold">Phuket</Link> (2 hours, ฿1,500-3,500) or <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">{t("s012_koh_samui")}</Link> (1.5 hours with a stop, ฿2,500-5,000). Direct flights from Chiang Mai to the south are available daily, saving you the backtrack through Bangkok. These three island days are your reward for the cultural deep-dive of the first week — unstructured beach time, snorkeling excursions, and long dinners watching the sunset.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s017_if_you_choose_the")} <Link href="/city/krabi/" className="text-thailand-blue hover:underline font-semibold">Krabi</Link>), take a day trip to the <Link href="/thailand-islands/" className="text-thailand-blue hover:underline font-semibold">{t("s040_phi_phi_islands")}</Link> for snorkeling among tropical fish in crystal-clear water (฿1,500-3,000 for a full-day tour including lunch). The second island day is for relaxing on the beach, getting a ฿300 beachside massage, and exploring local restaurants. If you are on the Gulf coast (Koh Samui, <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline font-semibold">{t("s041_koh_phangan")}</Link>, <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">Koh Tao</Link>), the snorkeling and diving are world-class. A fun-dive for certified divers costs around ฿2,500-3,500 for two dives.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Flight:</strong> {t("s042_chiang_mai_to_phuket")}</p>
                    <p><strong>{t("s043_island_season")}</strong> {t("s044_andaman_nov_apr_best")}</p>
                    <p><strong>Tip:</strong> {t("s045_if_you_want_both")}</p>
                  </div>
                </div>
              </div>

              {/* Day 10 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Day 10</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s046_return_to_bangkok_for")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("s018_fly_back_to_bangkok")}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>{t("s047_total_10_day_budget")}</strong> ฿28,000-42,000 ($800-1,200 USD) excluding international flights</p>
                    <p><strong>{t("s048_pro_tip")}</strong> {t("s049_check_if_phuket_has")}</p>
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
                <p className="text-gray-600 mt-2">{t("s050_the_gold_standard_for")}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {t("s019_two_weeks_in_thailand")}
              </p>

              {/* Week 1 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Week 1</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s051_bangkok_overnight_train_to")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>{t("s052_days_1_2_bangkok")}</strong> {t("s053_follow_the_bangkok_itinerary")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>{t("s054_day_2_evening_overnight")}</strong> {t("s055_this_is_one_of")} <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">{t("s032_chiang_mai")}</Link> the next morning after 11-13 hours. Second-class sleeper berths (฿800-1,000) have fold-down beds with clean sheets and curtains for privacy. First-class private cabins (฿1,100-1,300) come with a lockable door and a small washbasin. The gentle rocking of the train through the Thai countryside at night is unforgettable, and you wake up in an entirely different world — misty mountains instead of concrete towers. Book tickets at the station 2-3 days in advance or through <Link href="/transport/" className="text-thailand-blue hover:underline font-semibold">12Go</Link> online.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>{t("s057_days_3_5_chiang")}</strong> {t("s058_three_full_days_in")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>{t("s059_days_6_7")} <Link href="/city/pai/" className="text-thailand-blue hover:underline font-semibold">Pai</Link>.</strong> {t("s060_take_the_minibus_from")}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>{t("s061_overnight_train")}</strong> {t("s062_bangkok_chiang_mai_11")}</p>
                    <p><strong>{t("s063_pai_minibus")}</strong> {t("s064_chiang_mai_pai_3")}</p>
                    <p><strong>{t("s065_pai_tip")}</strong> {t("s066_take_motion_sickness_medication")}</p>
                  </div>
                </div>
              </div>

              {/* Week 2 */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-thailand-blue text-white text-sm font-bold px-3 py-1 rounded-full">Week 2</span>
                    <h3 className="text-xl font-bold font-heading text-gray-900">{t("s067_fly_south_krabi_koh")}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>{t("s068_day_8_return_to")}</strong> {t("s069_take_the_morning_minibus")} <Link href="/city/krabi/" className="text-thailand-blue hover:underline font-semibold">Krabi</Link> (2 hours, ฿1,500-3,000). Arrive in Krabi by evening and check into your hotel in Ao Nang or Krabi Town.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>{t("s070_days_9_10_krabi")}</strong> {t("s071_krabi_province_is_the")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>{t("s072_days_11_13")} <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">{t("s073_koh_lanta")}</Link> or Koh Phi Phi.</strong> {t("s074_from_krabi_take_a")} <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">{t("s073_koh_lanta")}</Link> (1.5 hours by ferry, ฿400, or 2 hours by minivan plus car ferry) is the laid-back alternative with long empty beaches, a charming Old Town, and some of the best snorkeling day trips in Thailand to Koh Rok and Koh Haa. Spend three days island-hopping, snorkeling, eating fresh seafood at beachfront restaurants, and watching sunsets from the west coast.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>{t("s076_day_14_return_to")}</strong> {t("s077_ferry_back_to_krabi")}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Ferries:</strong> {t("s078_krabi_to_koh_phi")}</p>
                    <p><strong>{t("s079_total_2_week_budget")}</strong> ฿38,000-55,000 ($1,100-1,600 USD) excluding international flights</p>
                    <p><strong>{t("s080_island_choice_tip")}</strong> {t("s081_phi_phi_for_energy")}</p>
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
                <p className="text-gray-600 mt-2">{t("s082_the_complete_north_to")}</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {t("s020_three_to_four_weeks")}
              </p>

              <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{t("s083_the_complete_route")}</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t("s084_days_1_3_bangkok")}</strong> {t("s085_three_days_for_temples")}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t("s086_days_4_5")} <Link href="/city/ayutthaya/" className="text-thailand-blue hover:underline font-semibold">Ayutthaya</Link>.</strong> {t("s087_take_the_train_from")}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t("s059_days_6_7")} <Link href="/city/sukhothai/" className="text-thailand-blue hover:underline font-semibold">Sukhothai</Link>.</strong> {t("s089_bus_from_ayutthaya_to")}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t("s090_days_8_11_chiang")}</strong> {t("s091_bus_or_fly_from")}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t("s092_days_12_13")} <Link href="/city/chiang-rai/" className="text-thailand-blue hover:underline font-semibold">{t("s093_chiang_rai")}</Link>.</strong> {t("s094_bus_from_chiang_mai")}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t("s095_days_14_15_fly")}</strong> {t("s096_fly_from_chiang_rai")}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t("s097_days_16_19_island")}</strong> {t("s098_ferry_to_the_islands")} <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline font-semibold">{t("s041_koh_phangan")}</Link> (yoga, beaches, optional Full Moon Party) and two nights on <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">Koh Tao</Link> (diving and snorkeling).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t("s100_days_20_21_bangkok")}</strong> {t("s101_return_to_bangkok_for")}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{t("s102_off_beat_additions_for")}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t("s021_if_you_have_a")}
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-thailand-blue font-bold shrink-0">Kanchanaburi</span>
                    <p className="text-gray-700 text-sm">2-3 days. The Bridge over the River Kwai, the JEATH War Museum, Erawan National Park (7-tiered waterfall with natural swimming pools), and the Hellfire Pass Memorial Walk. A sobering historical experience combined with stunning nature. 2.5 hours west of Bangkok by bus (฿120).</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-thailand-blue font-bold shrink-0">{t("s103_khao_sok")}</span>
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
                  <p><strong>{t("s104_total_3_week_budget")}</strong> ฿50,000-75,000 ($1,430-2,150 USD) excluding international flights</p>
                  <p><strong>{t("s105_total_4_week_budget")}</strong> ฿65,000-95,000 ($1,860-2,720 USD) excluding international flights</p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Thailand Itinerary by Interest */}
            {/* ============================================ */}
            <section id="by-interest" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s106_thailand_itinerary_by_interest")}</h2>
                <p className="text-gray-600 mt-2">{t("s107_not_everyone_travels_the")}</p>
              </div>

              {/* Foodies */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s108_the_foodie_itinerary_10")}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <>Thailand is een van &apos;s werelds beste culinaire bestemmingen, en deze reisroute draait om je een weg eten van noord naar zuid. Begin met <strong>3 dagen in Bangkok</strong> volledig gericht op eten: een begeleide straatvoedsel-tour door Yaowarat (Chinatown), lunch bij een van de Michelin-bekroonde straatetentjes zoals Jay Fai (krabomelet, ฿1.000) of Raan Jay Fai noedelwinkels, en diner bij een lokaal restaurant in de Ari-buurt waar Bangkokers daadwerkelijk eten. Bezoek Or Tor Kor Market (consequent gerangschikt als een van &apos;s werelds beste versmarkten) voor tropische vruchten die je nog nooit eerder hebt gezien.</>
                      : <>{t("s109_thailand_is_one_of")} <strong>3 days in Bangkok</strong> focused entirely on food: a guided street food tour through Yaowarat (Chinatown), lunch at one of the city&apos;s Michelin-starred street stalls like Jay Fai (crab omelette, ฿1,000) or Raan Jay Fai noodle shops, and dinner at a local restaurant in the Ari neighborhood where Bangkok residents actually eat. Visit Or Tor Kor Market (consistently ranked among the world&apos;s best fresh markets) for tropical fruits you have never seen before.</>}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <>Vlieg naar <strong>Chiang Mai voor 2 dagen</strong> Noord-Thaise keuken — volg een kookles gericht op khao soi (de kokoscurry-noedelsoep die de Noord-Thaise keuken definieert), sai ua (kruiden-noordelijke worst), en nam prik (chili-dips geserveerd met verse groenten). De zaterdag- en zondagse walking street markten hebben de beste diversiteit aan eetkraampjes van het hele land. Ga verder naar het zuiden voor <strong>2 dagen in Hat Yai</strong> voor vurige Zuid-Thaise gerechten — gaeng som (zure curry), massaman curry met Maleisische invloeden, en roti canai bij islamitische kraampjes. Eindig met <strong>3 dagen op de eilanden</strong> voor vers gevangen zeevruchten gegrild op het strand.</>
                      : <>Fly to <strong>{t("s110_chiang_mai_for_2")}</strong> of northern Thai cuisine — take a cooking class focusing on khao soi (the coconut curry noodle soup that defines northern Thai food), sai ua (herbal northern sausage), and nam prik (chili dips served with fresh vegetables). The Saturday and Sunday walking street markets have the best food stall diversity in the country. Continue south for <strong>2 days in Hat Yai</strong> for fiery southern Thai food — gaeng som (sour curry), massaman curry with its Malay influences, and roti canai at Muslim-owned stalls. Finish with <strong>3 days on the islands</strong> for fresh-caught seafood barbecued on the beach.</>}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p><strong>Route:</strong> {t("s111_bangkok_3d_chiang_mai")}</p>
                  </div>
                </div>
              </div>

              {/* Adventure */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s112_the_adventure_itinerary_10")}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <>Voor adrenaliejunkies en natuurliefhebbers biedt Thailand veel meer dan alleen stranden. Begin met <strong>2 dagen in Bangkok</strong> voor Muay Thai — kijk naar een live gevecht in Rajadamnern Stadium (฿1.000-2.000) of probeer een beginnerles in een trainingsgym (฿500-800 voor een sessie van 2 uur). Ga vervolgens naar <strong>{t("s113_khao_sok_national_park")}</strong> jungletrekking, kajakken door kalksteenkloven op Cheow Lan Lake, en slapen in drijvende bungalows omringd door 160 miljoen jaar oud regenwoud.</>
                      : <>{t("s114_for_adrenaline_seekers_and")} <strong>2 days in Bangkok</strong> for Muay Thai — either watch a live fight at Rajadamnern Stadium (฿1,000-2,000) or try a beginner class at a training gym (฿500-800 for a 2-hour session). Then head to <strong>{t("s115_khao_sok_national_park")}</strong> of jungle trekking, kayaking through limestone canyons on Cheow Lan Lake, and sleeping in floating bungalows surrounded by 160-million-year-old rainforest.</>}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <>Neem de veerboot naar <strong><Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">Koh Tao</Link> voor 3 dagen</strong> duiken — haal je PADI-certificaat (฿9.000-11.000 voor de 3-4 daagse Open Water cursus) of maak fun dives bij locaties zoals Sail Rock en Chumphon Pinnacle waar af en toe walvishaaien worden gespot. Eindig met <strong>3 dagen in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">{t("s032_chiang_mai")}</Link></strong> voor Muay Thai training bij een van de beroemde kampen van de stad, mountainbiken op de trails van Doi Suthep, of wildwatervaren op de Mae Taeng rivier (฿1.500-2.500 voor een halvedagtocht).</>
                      : <>{t("s117_ferry_to")} <strong><Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">Koh Tao</Link> for 3 days</strong> of diving — either get PADI certified (฿9,000-11,000 for the 3-4 day Open Water course) or do fun dives at sites like Sail Rock and Chumphon Pinnacle where whale sharks are occasionally spotted. Finish with <strong>3 days in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">{t("s032_chiang_mai")}</Link></strong> for Muay Thai training at one of the city&apos;s renowned camps, mountain biking on Doi Suthep&apos;s trails, or white-water rafting on the Mae Taeng River (฿1,500-2,500 for a half-day trip).</>}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p><strong>Route:</strong> {t("s119_bangkok_2d_khao_sok")}</p>
                  </div>
                </div>
              </div>

              {/* Couples */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s120_the_couples_itinerary_10")}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <>Thailand is een van de meest romantische bestemmingen in Zuidoost-Azië, met alles van kaarslichtdiners op het strand tot spa-behandelingen voor koppels en zonsondergangcruises. Begin met <strong>2 dagen in Bangkok</strong> gericht op romantiek: een zonsondergangdiner-cruise op de Chao Phraya rivier (฿1.200-2.500), cocktails bij een rooftopbar met uitzicht over de glinsterende skyline, en een Thaise koppelsmassage bij een luxe spa (฿3.000-5.000 voor 2 uur voor twee personen). De spa van het Mandarin Oriental is legendarisch, maar uitstekende opties bestaan voor een fractie van de prijs.</>
                      : <>{t("s121_thailand_is_one_of")} <strong>2 days in Bangkok</strong> focused on romance: a sunset dinner cruise on the Chao Phraya River (฿1,200-2,500), cocktails at a rooftop bar overlooking the glittering skyline, and a couples&apos; Thai massage at a luxury spa (฿3,000-5,000 for 2 hours for two people). The Mandarin Oriental&apos;s spa is legendary, but excellent options exist at a fraction of the price.</>}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <>Vlieg naar <strong><Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Chiang Mai</Link> voor 2 dagen</strong> culturele verkenning samen — een privé kookles (฿2.500-3.500 voor twee), een bezoek aan Doi Suthep bij zonsondergang, en diner bij een van de sfeervolle binnenplaatsrestaurants in de oude stad. Vlieg vervolgens naar het zuiden voor <strong>4 dagen op <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">{t("s073_koh_lanta")}</Link> of Koh Lipe</strong> — twee van Thailands meest vredige eilanden met lange stukken rustig strand, prachtige zonsondergangen en boutique strandresorts. Het kristalheldere water van Koh Lipe is perfect om direct vanaf het strand te snorkelen, en de Walking Street van het eiland biedt romantisch dineren aan het strand met lichtjes en verse zeevruchten. Eindig met <strong>2 laatste dagen</strong> ontspannen voor vertrek.</>
                      : <>Fly to <strong><Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">{t("s032_chiang_mai")}</Link> for 2 days</strong> of cultural exploration together — a private cooking class (฿2,500-3,500 for two), a visit to Doi Suthep at sunset, and dinner at one of the old town&apos;s atmospheric courtyard restaurants. Then fly south for <strong>4 days on <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">{t("s073_koh_lanta")}</Link> or Koh Lipe</strong> — two of Thailand&apos;s most peaceful islands with long stretches of uncrowded beach, stunning sunsets, and boutique beachfront resorts. Koh Lipe&apos;s crystal-clear water is perfect for snorkeling right from the shore, and the island&apos;s Walking Street has romantic beachfront dining with fairy lights and fresh seafood. End with <strong>2 final days</strong> relaxing before departure.</>}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p><strong>Route:</strong> {t("s125_bangkok_2d_chiang_mai")}</p>
                  </div>
                </div>
              </div>

              {/* Families */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s126_the_family_itinerary_10")}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <>Thailand is uitzonderlijk gezinsvriendelijk — de Thaise cultuur is dol op kinderen, en kids zijn overal welkom, van tempelterreinen tot straatvoedselkraampjes. Begin met <strong>3 dagen in <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Bangkok</Link></strong> met kindvriendelijke activiteiten: het SEA LIFE Bangkok Ocean World aquarium (฿990 volwassenen, ฿790 kinderen), een longtailboottocht door de grachten (kinderen vinden het geweldig), het Grand Palace (gratis voor kinderen onder 120cm), en de interactieve tentoonstellingen in het Bangkok National Museum. Wat betreft eten: laat kinderen geleidelijk kennismaken met de Thaise keuken — kipsaté, pad thai, mango sticky rice en kokosijs worden universeel goedgekeurd door kids.</>
                      : <>{t("s127_thailand_is_exceptionally_family")} <strong>3 days in <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Bangkok</Link></strong> with kid-friendly activities: the SEA LIFE Bangkok Ocean World aquarium (฿990 adults, ฿790 children), a longtail boat ride through the canals (kids love it), the Grand Palace (free for children under 120cm), and the interactive exhibits at the Bangkok National Museum. For food, introduce kids to Thai cuisine gently — chicken satay, pad thai, mango sticky rice, and coconut ice cream are universally kid-approved.</>}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {isNl
                      ? <>Vlieg naar <strong><Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">Koh Samui</Link> voor 4 dagen</strong> — het meest gezinsvriendelijke eiland van Thailand met rustige, ondiepe stranden (vooral Lamai en Maenam), familieresort-zwembaden, en activiteiten zoals het Samui Aquarium en Tiger Zoo (฿700), Namuang Waterfall (gratis, natuurlijk zwembad aan de voet), en de Na Thon Day Market. Veel resorts bieden kinderclubs en familiekamers. Eindig met <strong>3 dagen in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">{t("s032_chiang_mai")}</Link></strong> voor de ethische olifantenervaring (kinderen vanaf 4 jaar zijn welkom bij de meeste sanctuaries), een gezins-kookles, en de Chiang Mai Night Safari dierentuin (฿800 volwassenen, ฿400 kinderen).</>
                      : <>Fly to <strong><Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">{t("s012_koh_samui")}</Link> for 4 days</strong> — the most family-friendly island in Thailand with calm, shallow beaches (especially Lamai and Maenam), family resort pools, and activities like the Samui Aquarium and Tiger Zoo (฿700), Namuang Waterfall (free, natural swimming pool at the base), and the Na Thon Day Market. Many resorts offer kids&apos; clubs and family suites. Finish with <strong>3 days in <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">{t("s032_chiang_mai")}</Link></strong> for the ethical elephant experience (kids aged 4+ are welcome at most sanctuaries), a family cooking class, and the Chiang Mai Night Safari zoo (฿800 adults, ฿400 children).</>}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p><strong>Route:</strong> {t("s131_bangkok_3d_koh_samui")}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: Getting Between Destinations */}
            {/* ============================================ */}
            <section id="transport" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s132_getting_between_destinations")}</h2>
                <p className="text-gray-600 mt-2">{t("s133_thailand_apos_s_domestic")}</p>
              </div>

              <div className="space-y-6">
                {/* Domestic Flights */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s134_domestic_flights")}</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {t("s022_thailand_apos_s_budget")}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>{t("s135_typical_fares_booked_2")}</strong> {t("s136_bangkok_chiang_mai_1")}</p>
                    <p><strong>Tip:</strong> {t("s137_airasia_and_nok_air")}</p>
                  </div>
                </div>

                {/* Overnight Trains */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s138_overnight_trains")}</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {t("s023_the_bangkok_chiang_mai")}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>{t("s139_bangkok_chiang_mai")}</strong> 11-13 hours | 2nd class sleeper from ฿500 (seat) to ฿1,000 (lower berth) | 1st class from ฿1,300</p>
                    <p><strong>Booking:</strong> 12Go.co (online, English), or at train station ticket windows. Book 3-7 days ahead for sleeper berths.</p>
                  </div>
                </div>

                {/* Buses and Minivans */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s140_buses_and_minivans")}</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {t("s024_buses_and_minivans_are")} <Link href="/transport/" className="text-thailand-blue hover:underline font-semibold">12Go</Link> for English-language booking and e-tickets, or purchase directly at bus stations for slightly lower prices.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>{t("s141_useful_routes")}</strong> {t("s142_bangkok_ayutthaya_1_5hr")}</p>
                    <p><strong>Tip:</strong> {t("s143_vip_buses_are_significantly")}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 7: Itinerary FAQs */}
            {/* ============================================ */}
            <section id="faq" className="mb-12">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s144_itinerary_faqs")}</h2>
                <p className="text-gray-600 mt-2">{t("s145_quick_answers_to_the")}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="space-y-6">
                  {faqItems.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-bold font-heading text-gray-900 mb-2 text-lg">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      {item.question === 'Is 7 days enough for Thailand?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/thailand-itinerary/" className="text-thailand-blue hover:underline font-semibold">{t("s146_browse_our_ready_made")}</Link>
                        </p>
                      )}
                      {item.question === 'Can I do Thailand on a budget in 2 weeks?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/blog/thailand-budget-2026-daily-costs/" className="text-thailand-blue hover:underline font-semibold">{t("s147_full_thailand_budget_breakdown")}</Link>
                        </p>
                      )}
                      {item.question === 'What is the best month for a Thailand trip?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/best-time-to-visit/" className="text-thailand-blue hover:underline font-semibold">{t("s148_month_by_month_weather")}</Link>
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
                  <div className="font-semibold text-gray-900 text-sm">{t("s149_travel_guide")}</div>
                  <div className="text-xs text-gray-600">{t("s150_everything_you_need")}</div>
                </Link>
                <Link href="/best-places-to-visit-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s151_best_places")}</div>
                  <div className="text-xs text-gray-600">33 destinations</div>
                </Link>
                <Link href="/things-to-do-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s152_things_to_do")}</div>
                  <div className="text-xs text-gray-600">25 top experiences</div>
                </Link>
                <Link href="/thailand-for-first-timers/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s153_first_timers")}</div>
                  <div className="text-xs text-gray-600">{t("s154_start_here")}</div>
                </Link>
                <Link href="/thailand-islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s155_thai_islands")}</div>
                  <div className="text-xs text-gray-600">{t("s156_beach_paradise")}</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s157_thai_food")}</div>
                  <div className="text-xs text-gray-600">{t("s158_cuisine_guide")}</div>
                </Link>
                <Link href="/is-thailand-safe/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s159_safety_guide")}</div>
                  <div className="text-xs text-gray-600">{t("s160_stay_safe")}</div>
                </Link>
                <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Transport</div>
                  <div className="text-xs text-gray-600">{t("s161_buses_trains_flights")}</div>
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
