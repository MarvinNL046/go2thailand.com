import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EmailCapture from '../components/EmailCapture';
import { useT } from '../lib/i18n';
import { strings as i18nStrings } from '../lib/i18n/thailand-islands';

export default function ThailandIslandsPage() {
  const t = useT(i18nStrings);
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Thailand Eilanden' : 'Thailand Islands', href: '/thailand-islands/' },
  ];

  const items = [
    { position: 1, name: 'Koh Lipe' },
    { position: 2, name: 'Koh Phi Phi' },
    { position: 3, name: 'Koh Lanta' },
    { position: 4, name: 'Koh Muk' },
    { position: 5, name: 'Koh Tao' },
    { position: 6, name: 'Similan Islands' },
    { position: 7, name: 'Koh Phangan' },
    { position: 8, name: 'Phuket' },
    { position: 9, name: 'Koh Samui' },
    { position: 10, name: 'Koh Chang' },
  ];

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isNl ? 'Beste Thailand Eilanden om te Bezoeken per Type' : 'Best Thailand Islands to Visit by Type',
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: 'https://go2-thailand.com/thailand-islands/',
    })),
  };

  const faqItems = isNl ? [
    {
      question: 'Welk Thais eiland is het mooist?',
      answer: 'Dat hangt af van wat je het meest waardeert. Koh Lipe scoort consequent het hoogst voor pure strandschoonheid — het poederachtige witte zand en turquoise Andaman water hebben het de bijnaam "Malediven van Thailand" opgeleverd. Voor onderwaterlandschappen bieden de Similan eilanden het beste zicht en koraaldiversiteit in Zuidoost-Azië. Voor dramatisch bovenwater landschap is Koh Phi Phi moeilijk te verslaan — de torenhoge kalkstenen kliffen en smaragdgroene lagunes behoren tot de meest gefotografeerde landschappen in Thailand.',
    },
    {
      question: 'Welk eiland is het beste voor eerste bezoekers?',
      answer: 'Koh Samui is de meest praktische keuze voor eerste bezoekers van de Thaise eilanden. Het heeft een eigen internationaal vliegveld met directe vluchten vanuit Bangkok, Singapore en Kuala Lumpur. De infrastructuur is het meest ontwikkeld �� internationale ziekenhuizen, betrouwbare 4G/5G dekking, westerse supermarkten en een volledig aanbod van budget tot vijfsterren. De stranden langs de noord- en oostkust (Chaweng, Lamai, Bophut) bieden kalme zwemomstandigheden het grootste deel van het jaar.',
    },
    {
      question: 'Wanneer is de beste tijd om Thaise eilanden te bezoeken?',
      answer: 'Thailand heeft twee kustlijnen met tegenovergestelde moessonpatronen. De Andamankust (westkant — Phuket, Phi Phi, Koh Lanta, Koh Lipe, Similan eilanden) heeft droog seizoen van november tot april. De Golfkust (oostkant — Koh Samui, Koh Phangan, Koh Tao) is het droogst van januari tot september, met oktober tot december als natste periode. Je kunt dus bijna altijd goed eilandweer vinden in Thailand. De belangrijkste fout is Andaman eilanden boeken in juni-september of Golf eilanden in november-december.',
    },
    {
      question: 'Kun je eilandhoppen met een budget?',
      answer: 'Ja. Een realistisch budget voor twee weken eilandhoppen is 10.000-15.000 baht (ongeveer $280-420) voor alleen veerponten. De Golfroute (Koh Samui naar Koh Phangan naar Koh Tao) is het goedkoopst, met veerpont tickets van 300-600 baht per rit. De Andaman route (Phuket naar Phi Phi naar Koh Lanta naar Koh Lipe) kost meer, 600-1.500 baht per rit. Via 12Go Asia kun je ferry-aanbieders vergelijken en tickets van tevoren boeken. De grootste budgetbesparingen komen van accommodatie — hostels op Koh Phangan en Koh Tao beginnen vanaf 300 baht per nacht.',
    },
  ] : [
    {
      question: 'Which Thai island is the most beautiful?',
      answer: 'It depends on what you value most. Koh Lipe consistently ranks highest for pure beach beauty — its powdery white sand and turquoise Andaman water have earned it the nickname "Maldives of Thailand." For underwater scenery, the Similan Islands offer some of the best visibility and coral diversity in Southeast Asia, with visibility regularly exceeding 30 meters. For dramatic above-water scenery, Koh Phi Phi is hard to beat — the towering limestone karst cliffs, emerald lagoons, and the iconic Phi Phi viewpoint overlooking the twin bays are among the most photographed landscapes in Thailand. Each island offers a genuinely different kind of beauty, which is why many travelers visit more than one.',
    },
    {
      question: 'Which island is best for first-time visitors?',
      answer: 'Koh Samui is the most practical choice for first-time visitors to the Thai islands. It has its own international airport with direct flights from Bangkok, Singapore, and Kuala Lumpur, which eliminates the multi-transfer journeys required to reach most other islands. The infrastructure is the most developed of any Thai island — international hospitals (Bangkok Hospital Samui and Thai International Hospital), reliable 4G and 5G coverage, Western supermarkets, and a full range of accommodation from budget guesthouses to five-star resorts. The beaches along the north and east coasts (Chaweng, Lamai, Bophut) offer calm swimming conditions for most of the year, and there is enough variety in activities, dining, and day trips to fill a week without needing to island-hop.',
    },
    {
      question: 'When is the best time to visit Thai islands?',
      answer: 'Thailand has two coastlines with opposite monsoon patterns, which is the single most important planning fact. The Andaman coast (west side — Phuket, Phi Phi, Koh Lanta, Koh Lipe, Similan Islands) has its dry season from November to April. The Gulf coast (east side — Koh Samui, Koh Phangan, Koh Tao) has its driest months from roughly January to September, with October through December being the wettest period. This means you can almost always find good island weather in Thailand regardless of when you travel. The key mistake is booking Andaman islands during June-September (heavy monsoon) or Gulf islands during November-December (peak rain). Plan your coast based on your travel dates, not the other way around.',
    },
    {
      question: 'Can you island-hop on a budget?',
      answer: 'Yes. A realistic budget for two weeks of island-hopping is 10,000-15,000 baht (roughly $280-420 USD) for ferries alone. The Gulf route (Koh Samui to Koh Phangan to Koh Tao) is the cheapest, with ferry tickets running 300-600 baht per leg and journey times of 30-90 minutes. The Andaman route (Phuket to Phi Phi to Koh Lanta to Koh Lipe) costs more at 600-1,500 baht per leg, with longer journey times. Booking through 12Go Asia lets you compare ferry operators, read reviews, and secure tickets in advance during high season when popular routes sell out. The biggest budget savings come from accommodation, not transport — hostels on Koh Phangan and Koh Tao start from 300 baht per night, and street food costs 40-80 baht per meal on every island.',
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
        title={t("s001_thailand_islands_guide_best")}
        description={t("s002_the_best_thai_islands")}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Header */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                Thailand Islands Guide: Best Islands to Visit by Type (2026)
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Thailand has over 1,400 islands spread across two coastlines with opposite monsoon seasons. This guide organizes the best islands by what you actually want from your trip — beaches, diving, nightlife, family travel, or budget-friendly exploration — with real prices, ferry routes, and seasonal advice.
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
                <li><a href="#beaches" className="text-thailand-blue hover:underline">{isNl ? 'Beste Eilanden voor Stranden' : 'Best Islands for Beaches'}</a></li>
                <li><a href="#diving" className="text-thailand-blue hover:underline">{isNl ? 'Beste Eilanden voor Duiken & Snorkelen' : 'Best Islands for Diving & Snorkeling'}</a></li>
                <li><a href="#nightlife" className="text-thailand-blue hover:underline">{isNl ? 'Beste Eilanden voor Nachtleven' : 'Best Islands for Nightlife'}</a></li>
                <li><a href="#families" className="text-thailand-blue hover:underline">{isNl ? 'Beste Eilanden voor Gezinnen' : 'Best Islands for Families'}</a></li>
                <li><a href="#budget" className="text-thailand-blue hover:underline">{isNl ? 'Beste Eilanden voor Budget Reizigers' : 'Best Islands for Budget Travelers'}</a></li>
                <li><a href="#island-hopping" className="text-thailand-blue hover:underline">{isNl ? 'Hoe Eilandhoppen' : 'How to Island-Hop'}</a></li>
                <li><a href="#faq" className="text-thailand-blue hover:underline">{isNl ? 'Eiland FAQ\'s' : 'Island FAQs'}</a></li>
              </ul>
            </nav>

            {/* Intro paragraph */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Choosing a Thai island is not as simple as picking the one with the best photos on social media. The two coasts — Andaman Sea on the west and the Gulf of Thailand on the east — run on completely different monsoon calendars. The Andaman coast (Phuket, Koh Phi Phi, Koh Lanta, Koh Lipe, the Similan Islands) is at its best from November through April. The Gulf coast (Koh Samui, Koh Phangan, Koh Tao) follows a separate rhythm, with its driest stretch running roughly from January to September. Getting the season wrong can mean closed ferries, heavy swells, and deserted islands that are supposed to be buzzing.
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Beyond weather, each island has a distinct personality. Koh Tao is overwhelmingly a dive island. Koh Phangan splits between the Full Moon Party crowd at Haad Rin and the yoga-retreat seekers on the quiet northern beaches. Koh Samui has international hospitals and an airport; Koh Lipe has neither and shuts down for half the year. These are not interchangeable destinations, and picking the right one depends on what you want from your trip, when you are traveling, and how much time you have.
            </p>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              This guide organizes Thailand&apos;s best islands by trip type — beaches, diving, nightlife, families, and budget travel — so you can skip the generic top-10 lists and find the islands that actually match what you are looking for. Every price, ferry route, and season recommendation is based on current 2026 data. For deeper destination guides, follow the links to our individual city and island pages.
            </p>

            {/* ============================================ */}
            {/* SECTION 1: Best Islands for Beaches */}
            {/* ============================================ */}
            <section id="beaches" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s003_best_islands_for_beaches")}</h2>
                <p className="text-gray-600 mt-2">{t("s004_powdery_white_sand_turquoise")}</p>
              </div>

              {/* Koh Lipe */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">1</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s005_koh_lipe_the_quot")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Lipe sits in the far south of the Andaman Sea, within Tarutao National Marine Park near the Malaysian border, and it earns its nickname honestly. The sand on Sunrise Beach and Pattaya Beach is fine enough to rival any Maldivian sandbank, and the water shifts between turquoise and deep blue depending on the time of day. The island is small enough to walk across in twenty minutes, which gives it an intimacy that larger Thai islands cannot match. There are no cars — just walking paths and the occasional motorbike taxi.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The coral reefs begin right off the beach at Sunrise Beach, which means you can snorkel directly from the shore without needing a boat trip. For a more immersive experience, longtail boats run short trips to Koh Adang, Koh Rawi, and Koh Rokroy — all within 15 to 30 minutes and offering some of the healthiest reef systems in the Thai Andaman. Walking Street runs the width of the island between Pattaya Beach and Sunrise Beach, lined with restaurants, bars, dive shops, and tattoo parlors. The food scene is surprisingly strong for such a small island, with several beachfront restaurants serving fresh-caught seafood at reasonable prices (200-400 baht for a grilled fish plate).
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The critical planning detail is that Koh Lipe is effectively closed during the monsoon. Ferry services from Pak Bara Pier (1.5 hours by speedboat) reduce dramatically or stop entirely from late May through mid-October. Most accommodation and restaurants follow suit. The high season runs November through May, with December to February being the busiest and most expensive period. If you can visit in November or March-April, you get peak weather with fewer crowds and lower prices.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Coast:</strong> {t("s006_andaman_sea_far_south")}</p>
                      <p><strong>{t("s007_best_season")}</strong> {t("s008_november_may_ferries_stop")}</p>
                      <p><strong>{t("s009_getting_there")}</strong> {t("s010_speedboat_from_pak_bara")}</p>
                      <p><strong>{t("s011_best_beaches")}</strong> {t("s012_sunrise_beach_pattaya_beach")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Koh Phi Phi */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">2</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s013_koh_phi_phi_maya")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      No island in Thailand has more recognizable scenery than Koh Phi Phi. The limestone karst formations that rise vertically from the Andaman Sea create the kind of dramatic backdrop that looks unreal even in person. Phi Phi consists of two islands: Phi Phi Don, where all the accommodation and nightlife are, and Phi Phi Leh, an uninhabited island that is home to the famous Maya Bay. The viewpoint hike on Phi Phi Don — a steep 30-minute climb up uneven steps — rewards you with a panoramic view of the twin bays and the green hills in between. It is one of the most photographed viewpoints in Southeast Asia for good reason.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Maya Bay reopened in January 2022 after a four-year closure to allow coral recovery, and the results are visible. The bay now operates with a strict daily visitor cap of 2,000 people (down from the 5,000-plus who used to visit daily), swimming is no longer permitted in the bay itself, and boats must dock at a pier on the back side of the island rather than anchoring directly in front of the beach. The coral has recovered significantly, and blacktip reef sharks have returned to the shallows. Visiting requires advance booking through an authorized tour operator, and the national park entrance fee is 400 baht for foreign adults.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Phi Phi Don is car-free — the only way to get around is on foot or by longtail boat. Tonsai Village is the main hub, packed with bars, restaurants, dive shops, and budget accommodation. The party scene is lively (Phi Phi has a reputation for nightlife), but if you walk 15 minutes north to Long Beach or take a longtail to Laem Tong Beach on the northern tip, the island transforms into something far quieter. Snorkeling at Shark Point, where blacktip reef sharks are regularly spotted in shallow water, is a highlight that does not require diving certification.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Coast:</strong> {t("s014_andaman_sea_krabi_province")}</p>
                      <p><strong>{t("s007_best_season")}</strong> {t("s016_november_april")}</p>
                      <p><strong>{t("s009_getting_there")}</strong> {t("s018_ferry_from_krabi_1")}</p>
                      <p><strong>{t("s019_maya_bay")}</strong> {isNl ? 'Heropend met 2.000/dag limiet — boek vooraf, zwemmen niet toegestaan' : 'Reopened with 2,000/day cap — book in advance, no swimming allowed'}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/krabi/" className="text-thailand-blue hover:underline font-semibold">{t("s020_explore_our_krabi_guide")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/best-beaches-in-thailand/" className="text-thailand-blue hover:underline font-semibold">{t("s021_best_beaches_in_thailand")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Koh Lanta */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">3</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s022_koh_lanta_laid_back")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Lanta is the antidote to Thailand&apos;s busier islands. This long, narrow island in Krabi Province stretches roughly 30 kilometers from north to south, with a string of west-facing beaches that get progressively quieter as you drive south. Long Beach (Phra Ae) and Klong Dao are the most developed, with restaurants, bars, and family-friendly resorts. Continue south past Klong Nin and Kantiang Bay, and you reach near-empty stretches of sand backed by jungle-covered hills where the loudest sound is the surf.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      What makes Koh Lanta exceptional for families is the combination of calm, shallow waters (especially on the northern beaches), a relaxed pace of life, and enough infrastructure to be convenient without feeling overdeveloped. There are no full moon parties, no pounding bass from beach bars at midnight, and no jet skis roaring across the swim zone. The island has a genuine community feel — the Old Town on the eastern coast is a row of wooden stilt houses built by Chinese and Malay traders generations ago, now home to quirky cafes, small galleries, and a handful of atmospheric guesthouses.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Lanta is also unusual among Thai islands in that it is reachable by road. A vehicle ferry connects the mainland to the northern tip of the island, which means you can drive or take a minivan directly from Krabi Airport without needing a separate ferry terminal. This makes it one of the most accessible Andaman islands for travelers with luggage, children, or mobility considerations. Day trips to Koh Rok and Koh Haa — two nearby marine parks with world-class snorkeling and pristine coral — are available from November through April.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Coast:</strong> {t("s014_andaman_sea_krabi_province")}</p>
                      <p><strong>{t("s007_best_season")}</strong> {t("s016_november_april")}</p>
                      <p><strong>{t("s009_getting_there")}</strong> {t("s027_minivan_car_ferry_from")}</p>
                      <p><strong>{t("s028_best_for")}</strong> {t("s029_families_couples_relaxing_no")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">{t("s030_explore_our_koh_lanta")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Koh Muk */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">4</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s031_koh_muk_the_emerald")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Muk (sometimes spelled Koh Mook) is a small island in Trang Province that most travelers visit for one reason: the Emerald Cave (Tham Morakot). To reach it, you swim through a 70-meter-long sea cave in near-total darkness — headlamps or waterproof flashlights are essential — and emerge into a hidden beach completely enclosed by towering limestone cliffs open to the sky. The effect is genuinely surreal. It feels like discovering a place that should not exist.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Beyond the Emerald Cave, Koh Muk is a quiet, locally-run island that has resisted the large-scale development seen on Phi Phi or Lanta. Charlie Beach on the western side is the main swimming beach — a beautiful crescent of sand with a handful of small resorts and restaurants. The eastern side of the island is home to a Muslim fishing village where life moves at a pace entirely separate from the tourist economy. You can rent a kayak and explore the coastline, or take longtail boat trips to nearby Koh Kradan (known for its stunning coral reef) and Koh Ngai.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The practical reality is that Koh Muk is best visited as part of a broader Trang Islands trip rather than as a standalone destination. The island is small, accommodation options are limited, and there is not much to do beyond the cave and the beach. But as a stop on an Andaman island-hopping route — or as a day trip from Koh Lanta — it delivers one of the most memorable experiences in Thailand. Ferries run from Trang&apos;s Hat Yao Pier (around 45 minutes) and from Koh Lanta during high season.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Coast:</strong> {t("s032_andaman_sea_trang_province")}</p>
                      <p><strong>{t("s007_best_season")}</strong> {t("s016_november_april")}</p>
                      <p><strong>{t("s009_getting_there")}</strong> {t("s036_longtail_or_ferry_from")}</p>
                      <p><strong>Highlight:</strong> {t("s037_emerald_cave_tham_morakot")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 2: Best Islands for Diving and Snorkeling */}
            {/* ============================================ */}
            <section id="diving" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s038_best_islands_for_diving")}</h2>
                <p className="text-gray-600 mt-2">{t("s039_from_the_world_apos")}</p>
              </div>

              {/* Koh Tao */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">5</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s040_koh_tao_dive_capital")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Tao (Turtle Island) has certified more scuba divers than any other location in Southeast Asia. PADI itself recognizes the island as one of the world&apos;s top destinations for Open Water certification, and the numbers back it up: over 25 dive schools compete for business, which keeps prices low and instruction quality consistently high. An Open Water course runs approximately 9,000-12,000 baht (roughly $250-340 USD) and takes 3-4 days, with most schools including basic accommodation as part of the package. That price point is roughly half what you would pay in Australia or the Caribbean for the same certification.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The diving itself ranges from easy beginner sites with gentle currents and 10-meter depths to advanced pinnacles where whale sharks appear between June and September. Sail Rock, located between Koh Tao and Koh Phangan, is widely considered the best single dive site in the Gulf of Thailand — a submerged rock pinnacle covered in coral, home to large schools of barracuda, batfish, and occasional whale shark sightings. Chumphon Pinnacle is another advanced site known for groupers and bull sharks. For snorkelers, Shark Bay (Ao Thian Ok) on the southern tip is famous for green sea turtles that graze on seagrass in the shallows, and Japanese Gardens on the northwestern corner has accessible reef just meters from shore.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Beyond diving, Koh Tao has excellent viewpoint hikes — the trek to John-Suwan Viewpoint on the southern tip and the short climb to the Koh Nang Yuan lookout (one of the most photographed panoramas in Thailand) are both worthwhile. The island is small enough that you can explore most of it on foot or by scooter in a single day. Accommodation ranges from basic beach bungalows at 400-800 baht per night to boutique resorts on Sairee Beach. The vibe is relaxed, international, and dive-obsessed.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Coast:</strong> {t("s041_gulf_of_thailand_surat")}</p>
                      <p><strong>{t("s042_best_diving_season")}</strong> {t("s043_march_october_calmest_seas")}</p>
                      <p><strong>{t("s044_padi_open_water")}</strong> ~฿9,000-12,000 (3-4 days, often includes accommodation)</p>
                      <p><strong>{t("s045_whale_shark_season")}</strong> {t("s046_june_september")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">{t("s047_explore_koh_tao")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/best-diving-snorkeling-in-thailand/" className="text-thailand-blue hover:underline font-semibold">{t("s048_best_diving_amp_snorkeling")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Similan Islands */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">6</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s049_similan_islands_pristine_national")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The Similan Islands are Thailand&apos;s premier dive destination for experienced divers and snorkelers who want the healthiest coral systems and the clearest water the country has to offer. This archipelago of nine granite islands, located about 70 kilometers off the Phang Nga coast in the Andaman Sea, is a national park with strict visitor controls. The result is underwater visibility that regularly exceeds 30 meters and reef ecosystems in far better condition than anything around the more accessible tourist islands.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The Similans are open only from October 15 to May 15 each year. Outside that window, the park is closed entirely — no exceptions. Day trips depart from Khao Lak (about 1.5 hours by speedboat) and from Phuket (longer, usually combined with an overnight stay on a liveaboard). Day-trip prices range from 2,500 to 4,500 baht including park fees, snorkeling equipment, lunch, and boat transfers. For divers, liveaboard trips of 2-4 nights are the gold standard — they allow you to dive the best sites (Elephant Head Rock, Christmas Point, Richelieu Rock) with multiple dives per day and access to sites that day-trippers cannot reach.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Richelieu Rock, technically part of the Surin Islands but often included on Similan liveaboard itineraries, is arguably the single best dive site in Thailand. It is a horseshoe-shaped pinnacle encrusted in soft coral and swarming with marine life, including manta rays from February through April and whale sharks from March through May. Even for snorkelers, the Similans deliver — several of the islands have shallow reef areas within swimming distance of the beach where the coral coverage and fish diversity are outstanding.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Coast:</strong> {t("s050_andaman_sea_phang_nga")}</p>
                      <p><strong>{t("s051_open_season")}</strong> {t("s052_october_15_may_15")}</p>
                      <p><strong>{t("s053_day_trips")}</strong> {t("s054_from_khao_lak_2")}</p>
                      <p><strong>{t("s055_best_for_experienced_divers")}</strong> {t("s056_liveaboard_trips_2_4")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/phuket/" className="text-thailand-blue hover:underline font-semibold">{t("s057_explore_phuket")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/best-diving-snorkeling-in-thailand/" className="text-thailand-blue hover:underline font-semibold">{t("s058_full_diving_guide")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Koh Lipe (diving angle) */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">7</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s059_koh_lipe_andaman_snorkeling")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Lipe deserves a second mention in the diving and snorkeling section because its reef access is genuinely unusual. At Sunrise Beach, healthy hard coral begins within 10-15 meters of the shoreline, which means you can walk into the water with a mask and snorkel and be over a living reef within a minute. That level of accessibility is rare anywhere in Thailand — most islands require a boat trip to reach good snorkeling spots.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The surrounding waters of Tarutao National Marine Park contain over 25 dive sites within a 30-minute boat ride. Stonehenge (a series of underwater rock formations at 18-25 meters) and 8 Mile Rock (an isolated pinnacle attracting pelagic fish and occasional reef sharks) are among the best. Dive schools on the island offer PADI courses at prices comparable to Koh Tao, though the range of schools is smaller. For snorkelers, half-day longtail boat trips to Koh Adang and Koh Rawi (100-300 baht per person in a shared boat) provide access to untouched reefs with excellent coral coverage and clear visibility.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{t("s060_shore_snorkeling")}</strong> {t("s061_sunrise_beach_coral_reef")}</p>
                      <p><strong>{t("s062_boat_snorkeling")}</strong> {t("s063_koh_adang_koh_rawi")}</p>
                      <p><strong>{t("s064_dive_sites")}</strong> 25+ sites within 30 min by boat</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mid-page Email Capture */}
            <EmailCapture heading="Planning a Thai island trip?" subtext="Get weekly tips on ferry routes, dive deals, and hidden beaches — straight to your inbox." />

            {/* ============================================ */}
            {/* SECTION 3: Best Islands for Nightlife */}
            {/* ============================================ */}
            <section id="nightlife" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s065_best_islands_for_nightlife")}</h2>
                <p className="text-gray-600 mt-2">{t("s066_from_legendary_monthly_parties")}</p>
              </div>

              {/* Koh Phangan */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">8</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s067_koh_phangan_full_moon")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The Full Moon Party at Haad Rin Beach is one of the most famous party events in the world, and despite decades of notoriety, it still draws tens of thousands of people every month. The beach transforms into a mile-long strip of sound systems, fire dancers, neon body paint stations, and bucket cocktail sellers. Entry costs 200 baht, and the party runs from roughly 9pm until well past sunrise. It is loud, chaotic, and unforgettable if you go with the right expectations.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      What many visitors do not realize is that Koh Phangan has also spawned Half Moon and Black Moon parties, which happen on the weeks between Full Moon events and offer a more curated experience in jungle venues with electronic music lineups. The island&apos;s party calendar is essentially continuous. But Koh Phangan is not only a party island — the northern and western coasts are home to yoga retreats, wellness centers, and some of the quietest beaches in the Gulf of Thailand. Bottle Beach on the north coast is reachable only by boat or jungle hike and feels like a different island entirely from Haad Rin.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{t("s068_full_moon_party")}</strong> {isNl ? 'Maandelijks op Haad Rin Beach, ฿200 entree' : 'Monthly at Haad Rin Beach, ฿200 entrance'}</p>
                      <p><strong>{isNl ? 'Ook' : 'Also'}:</strong> {isNl ? 'Half Moon Party, Black Moon Party (junglelocaties tussen full moons)' : 'Half Moon Party, Black Moon Party (jungle venues between full moons)'}</p>
                      <p><strong>Tip:</strong> {isNl ? 'Draag schoenen die vies mogen worden, bewaar waardevolle spullen in je hotel, drink alleen uit verzegelde verpakkingen' : 'Wear shoes you do not mind ruining, keep valuables at your hotel, drink from sealed containers only'}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline font-semibold">{t("s069_explore_our_koh_phangan")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Phuket */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">9</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s070_phuket_patong_beach_and")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Phuket is Thailand&apos;s largest island and its most developed, and the nightlife is concentrated almost entirely in Patong Beach&apos;s Bangla Road. This neon-lit strip runs from the beach inland for about 400 meters and is packed with bars, clubs, live music venues, go-go bars, and restaurants. It is loud, brash, and unapologetically commercial — the kind of nightlife that divides opinion but delivers a consistent experience seven nights a week. If Bangla Road is too much, Boat Avenue in the Laguna/Bang Tao area offers a more polished alternative with beach clubs, cocktail bars, and live music in a less frenetic setting.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Phuket also has a growing beach club scene. Catch Beach Club, Cafe Del Mar, and XANA Beach Club on Bang Tao Beach and Surin Beach offer a more upscale experience — DJ sets, infinity pools, cocktails, and sunset views — at prices that reflect the premium positioning. Sunday Walking Street Market in Phuket Old Town combines street food, live music, and cultural atmosphere in a format that is not a nightclub but is distinctly evening entertainment.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{t("s071_main_nightlife_zone")}</strong> {t("s072_bangla_road_patong_beach")}</p>
                      <p><strong>{t("s073_upscale_alternative")}</strong> {t("s074_beach_clubs_at_bang")}</p>
                      <p><strong>{t("s009_getting_there")}</strong> {t("s076_international_airport_with_direct")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/phuket/" className="text-thailand-blue hover:underline font-semibold">{t("s057_explore_phuket")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/phuket-beaches/" className="text-thailand-blue hover:underline font-semibold">{t("s078_phuket_beach_guide")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Koh Samui */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">10</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s079_koh_samui_chaweng_beach")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Samui&apos;s nightlife is centered on Chaweng Beach, where a strip of bars, clubs, and restaurants runs parallel to the island&apos;s busiest beach. The scene is more upscale than Koh Phangan and less overwhelming than Patong — think cocktail bars with quality sound systems rather than bucket drinks on the sand. Green Mango, Ark Bar, and Solo Bar are among the longest-running venues. The cabaret shows on Samui — most notably the Paris Follies and Starz Cabaret — offer polished, family-appropriate entertainment with elaborate costumes and choreography.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Lamai Beach, Samui&apos;s second-busiest area, has a smaller but more laid-back nightlife strip. Fisherman&apos;s Village in Bophut hosts a Friday Night Market where the atmosphere blends street food, live music, shopping, and people-watching along a charming waterfront street. For a genuinely different experience, several rooftop bars at hillside resorts offer sunset cocktails with panoramic views of the Gulf — Air Bar at InterContinental and The Jungle Club are standouts.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{isNl ? 'Belangrijkste uitgaansgebied' : 'Main nightlife area'}:</strong> Chaweng Beach Road ({isNl ? 'elke avond' : 'nightly'})</p>
                      <p><strong>{isNl ? 'Cabaretshows' : 'Cabaret shows'}:</strong> {t("s080_paris_follies_starz_cabaret")}</p>
                      <p><strong>{t("s081_friday_night_market")}</strong> Fisherman&apos;s Village, Bophut — {isNl ? 'straatvoedsel en livemuziek' : 'street food and live music'}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">{t("s082_explore_koh_samui")}</Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 4: Best Islands for Families */}
            {/* ============================================ */}
            <section id="families" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s083_best_islands_for_families")}</h2>
                <p className="text-gray-600 mt-2">{t("s084_infrastructure_calm_beaches_and")}</p>
              </div>

              {/* Koh Samui */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">11</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s085_koh_samui_best_infrastructure")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Samui is the single best island in Thailand for families, and the reason is infrastructure. It has its own international airport (USM) with multiple daily flights from Bangkok, direct connections from Singapore and Kuala Lumpur, and a domestic terminal that makes arriving with children and luggage a non-event compared to the ferry-plus-minivan combinations required for other islands.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The island has two international-standard hospitals (Bangkok Hospital Samui and Thai International Hospital), which provides genuine peace of mind for families traveling with young children. Western-brand pharmacies, supermarkets with imported products, and a wide range of dining options (from street food to Italian, Japanese, and Indian restaurants) mean you are not roughing it. The northern and eastern beaches — Chaweng, Lamai, Bophut, Maenam — offer calm, shallow water suitable for children during most of the year. Family resorts with kids&apos; clubs, pools, and organized activities are plentiful, and most of the island&apos;s attractions (Ang Thong Marine Park day trips, the Big Buddha temple, Na Muang waterfalls, monkey and elephant sanctuaries) work well for all ages.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Airport:</strong> {t("s086_koh_samui_airport_usm")}</p>
                      <p><strong>Medical:</strong> {t("s087_two_international_hospitals_on")}</p>
                      <p><strong>{t("s088_family_beaches")}</strong> {t("s089_chaweng_maenam_bophut_calm")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">{t("s082_explore_koh_samui")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Koh Lanta */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">12</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s091_koh_lanta_calm_seas")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Lanta appears in the beach section above, but it earns a separate mention for families because the calm, shallow waters on its northern beaches (Klong Dao and Long Beach) are some of the safest swimming conditions in the Thai Andaman during the dry season. The absence of a nightlife scene means the island stays quiet after dark, which families with small children will appreciate. Several resorts along Klong Dao are specifically geared toward families, with interconnected rooms, kids&apos; pools, and babysitting services.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The road-accessible nature of Koh Lanta (via vehicle ferry from the mainland) eliminates the boat transfers that can be stressful with young children or heavy luggage. Renting a car or scooter lets families explore the island at their own pace — visiting the mangrove boardwalk, the old town, and the national park at the southern tip without depending on taxis or tour operators.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{t("s092_best_family_beaches")}</strong> {t("s093_klong_dao_long_beach")}</p>
                      <p><strong>Access:</strong> {t("s094_road_accessible_via_vehicle")}</p>
                      <p><strong>Atmosphere:</strong> {t("s095_quiet_relaxed_no_party")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">{t("s096_explore_koh_lanta")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Phuket */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">13</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s097_phuket_family_resorts_waterparks")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Phuket&apos;s scale works in its favor for families. The island is large enough to offer a genuine range of activities beyond the beach: Splash Jungle Water Park, Phuket Aquarium, the Phuket Elephant Sanctuary (an ethical, no-riding operation), Blue Tree Phuket (a family entertainment complex with a lagoon, water slides, and restaurants), and numerous cooking class operators who run family-friendly sessions. The Bang Tao and Laguna area on the west coast is essentially a family resort zone — several international hotel brands operate here with interconnected facilities, kids&apos; clubs, and shared beach access.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Kata and Karon beaches are the best swimming beaches for families — wide, sandy, and relatively calm during the dry season (November to April). During the monsoon months (May to October), red flags indicate dangerous rip currents on the west coast beaches, so pool-based resort activities become more important. Phuket also serves as a base for day trips to Phang Nga Bay (James Bond Island, sea kayaking through limestone caves), which is sheltered enough to operate year-round and is one of the most popular family excursions in southern Thailand.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{t("s088_family_beaches")}</strong> {t("s099_kata_karon_nai_harn")}</p>
                      <p><strong>Activities:</strong> {t("s100_splash_jungle_water_park")}</p>
                      <p><strong>{t("s053_day_trips")}</strong> {t("s102_phang_nga_bay_similan")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/phuket/" className="text-thailand-blue hover:underline font-semibold">{t("s057_explore_phuket")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/phuket-beaches/" className="text-thailand-blue hover:underline font-semibold">{t("s078_phuket_beach_guide")}</Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Best Islands for Budget Travelers */}
            {/* ============================================ */}
            <section id="budget" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s105_best_islands_for_budget")}</h2>
                <p className="text-gray-600 mt-2">{t("s106_hostels_from_300_baht")}</p>
              </div>

              {/* Koh Phangan */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">14</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s107_koh_phangan_beyond_parties")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Phangan&apos;s reputation as a party island obscures the fact that it is one of the most affordable islands in Thailand for extended stays. Away from the Haad Rin party zone, the island has a thriving community of long-term travelers, digital nomads, and yoga practitioners who stay for weeks or months at a time. Hostels in Thong Sala and Sri Thanu start from 300 baht per night for a dorm bed, and bungalows on quieter beaches like Haad Yao, Haad Salad, and Ban Tai run 500-1,000 baht per night for a private room with a fan.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The yoga and wellness scene on the island&apos;s western coast is substantial. Orion Healing Center, Wonderland Healing Center, and The Sanctuary on Haad Tien each offer multi-day retreat packages that include accommodation, meals, and daily yoga sessions at prices that undercut similar programs in Bali or India. Street food on the island is cheap and good — the Thong Sala night market has full meals for 50-80 baht, and the Pantip Market in the center of town is where locals eat. Renting a scooter costs 200-300 baht per day and gives you access to the entire island, including beaches that are impossible to reach without your own transport.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{t("s108_dorm_beds")}</strong> {t("s109_from_300_night")}</p>
                      <p><strong>{t("s110_private_bungalows")}</strong> ฿500-1,000/night (fan rooms on quiet beaches)</p>
                      <p><strong>{t("s111_street_food")}</strong> ฿50-80 per meal at Thong Sala night market</p>
                      <p><strong>{t("s112_scooter_rental")}</strong> ฿200-300/day</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline font-semibold">{t("s113_explore_koh_phangan")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Koh Chang */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">15</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s114_koh_chang_a_cheaper")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Chang is Thailand&apos;s third-largest island, located in Trat Province on the eastern Gulf coast near the Cambodian border. Despite its size, it receives a fraction of the international tourists that Phuket or Samui attract, which keeps prices significantly lower. White Sand Beach (Hat Sai Khao) on the northwestern coast is the most developed area, with mid-range resorts running 800-1,500 baht per night — roughly half of what comparable accommodation costs on Phuket. Lonely Beach further south is the backpacker hub, with hostels, cheap bungalows, and a mellow bar scene.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The island&apos;s interior is mountainous and covered in tropical rainforest, with several waterfalls (Klong Plu and Than Mayom are the most accessible) and hiking trails that feel genuinely remote. The eastern coast is almost entirely undeveloped — a handful of fishing villages and mangrove forests that see very few tourists. Koh Chang is reachable from Bangkok by minivan and ferry in about 5-6 hours (or a 1-hour flight to Trat Airport plus a short transfer), making it one of the closest islands to the capital. For budget travelers who want an island experience with real size, jungle interior, and fewer crowds, Koh Chang is the strongest option.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Coast:</strong> {t("s115_eastern_gulf_of_thailand")}</p>
                      <p><strong>{t("s116_mid_range_resorts")}</strong> ฿800-1,500/night (roughly half of Phuket prices)</p>
                      <p><strong>{t("s009_getting_there")}</strong> {t("s118_minivan_ferry_from_bangkok")}</p>
                      <p><strong>{t("s028_best_for")}</strong> {t("s120_budget_travelers_who_want")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Koh Lipe off-season */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">16</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s121_koh_lipe_off_season")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Lipe makes a budget appearance because of its dramatic seasonal pricing. During the high season (December to February), accommodation prices on the island are among the highest in the Thai Andaman — a basic beachfront bungalow runs 1,500-3,000 baht per night, and the more popular spots sell out weeks in advance. But in the shoulder months (late October to November and March to May), prices drop 30-50%, availability opens up, and the weather is often still excellent.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The deep off-season (June to October) is a different calculation. Ferry services reduce dramatically — sometimes to a single departure per day or none at all — and roughly half the island&apos;s businesses close entirely. Those that remain open, however, offer steep discounts (50-70% off high-season rates), and the island takes on a genuinely different character: empty beaches, no queues, and a small community of travelers who actively seek out the quiet. The weather is genuinely unpredictable during this period — you may get days of perfect sunshine or extended rain — but for flexible budget travelers who accept the trade-off, it is one of the cheapest ways to experience a premium Thai island.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{t("s122_high_season")}</strong> ฿1,500-3,000/night for basic beachfront bungalows</p>
                      <p><strong>{t("s123_shoulder_season_nov_mar")}</strong> 30-50% lower — best value with good weather</p>
                      <p><strong>{t("s124_off_season_jun_oct")}</strong> 50-70% discounts, but limited ferries and many businesses closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: How to Island-Hop in Thailand */}
            {/* ============================================ */}
            <section id="island-hopping" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s125_how_to_island_hop")}</h2>
                <p className="text-gray-600 mt-2">{t("s126_two_main_routes_real")}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s127_andaman_route_phuket_to")}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The classic Andaman island-hopping route runs south from Phuket through Phi Phi, Koh Lanta, and down to Koh Lipe. Each leg is connected by ferry services that operate during the high season (November to April). The route works well because each island has a distinct character — Phuket for infrastructure and nightlife, Phi Phi for dramatic scenery and snorkeling, Koh Lanta for relaxation, and Koh Lipe for pristine beaches — so there is a genuine reason to move on rather than just ticking boxes.
                </p>
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                  <h4 className="font-bold font-heading text-gray-900 mb-4">{t("s128_andaman_route_ferry_legs")}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{t("s129_phuket_to_koh_phi")}</span>
                      <span className="font-semibold text-gray-900">฿400-700 · ~2 hours</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{t("s130_koh_phi_phi_to")}</span>
                      <span className="font-semibold text-gray-900">฿400-600 · ~1 hour</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{t("s131_koh_lanta_to_koh")}</span>
                      <span className="font-semibold text-gray-900">฿1,000-1,500 · ~3-4 hours</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-semibold text-gray-700">{t("s132_full_route_total")}</span>
                      <span className="font-bold text-thailand-blue">฿1,800-2,800</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s133_gulf_route_koh_samui")}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Gulf route is shorter, cheaper, and operates year-round with more frequency. The three islands — Koh Samui, Koh Phangan, and Koh Tao — form a natural cluster connected by multiple daily ferries. The short distances (30-90 minutes per leg) mean you lose very little time to transit, and the ferries are reliable even during the wetter months. This makes the Gulf route ideal for travelers with limited time or those who want to island-hop without major logistical planning.
                </p>
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                  <h4 className="font-bold font-heading text-gray-900 mb-4">{t("s134_gulf_route_ferry_legs")}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{t("s135_koh_samui_to_koh")}</span>
                      <span className="font-semibold text-gray-900">฿300-400 · ~30-60 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{t("s136_koh_phangan_to_koh")}</span>
                      <span className="font-semibold text-gray-900">฿400-600 · ~60-90 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-semibold text-gray-700">{t("s132_full_route_total")}</span>
                      <span className="font-bold text-thailand-blue">฿700-1,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s138_booking_ferries_12go_asia")}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The most reliable platform for booking Thai ferry tickets in advance is{' '}
                  <a
                    href="https://12go.tpo.lv/tNA80urD?subid=islands-ferry"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-thailand-blue hover:underline font-semibold"
                  >
                    12Go Asia
                  </a>
                  . It aggregates multiple ferry operators (Lomprayah, Seatran Discovery, Raja Ferry, Tigerline, Bundhaya Speed Boat), lets you compare schedules and prices side by side, and provides e-tickets that you can show on your phone at the pier. Advance booking is particularly important during peak season (December to February) on popular routes, when ferries genuinely sell out — especially the Koh Lanta to Koh Lipe speedboat.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For the Gulf route, you can also buy tickets directly at the pier on the day of travel in most cases — Lomprayah and Seatran run frequent enough services that same-day booking is usually fine outside of peak season. On the Andaman route, advance booking is more strongly recommended because departures are less frequent and operators are more varied. Some routes (particularly to Koh Lipe) have only one or two departures per day during high season and none during low season.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                  <p><strong>{t("s139_best_booking_platform")}</strong>{' '}
                    <a
                      href="https://12go.tpo.lv/tNA80urD?subid=islands-ferry"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-thailand-blue hover:underline"
                    >
                      12Go Asia
                    </a>
                    {' '}— compare operators, read reviews, e-tickets
                  </p>
                  <p><strong>{t("s140_gulf_operators")}</strong> {t("s141_lomprayah_catamaran_seatran_discovery")}</p>
                  <p><strong>{t("s142_andaman_operators")}</strong> {t("s143_tigerline_bundhaya_speed_boat")}</p>
                  <p><strong>Tip:</strong> {t("s144_book_1_2_weeks")}</p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 7: Island FAQs */}
            {/* ============================================ */}
            <section id="faq" className="mb-12">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s145_island_faqs")}</h2>
                <p className="text-gray-600 mt-2">{t("s146_answers_to_the_most")}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="space-y-6">
                  {faqItems.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-bold font-heading text-gray-900 mb-2 text-lg">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      {item.question === 'When is the best time to visit Thai islands?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/best-time-to-visit/" className="text-thailand-blue hover:underline font-semibold">{t("s147_full_month_by_month")}</Link>
                        </p>
                      )}
                      {item.question === 'Which island is best for first-time visitors?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/city/koh-samui/" className="text-thailand-blue hover:underline font-semibold">{t("s148_explore_our_koh_samui")}</Link>
                          {' '}<span className="text-gray-400">|</span>{' '}
                          <Link href="/thailand-for-first-timers/" className="text-thailand-blue hover:underline font-semibold">{t("s149_thailand_for_first_timers")}</Link>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Email Capture */}
            <EmailCapture heading="Want more Thailand island tips?" subtext="Get our weekly newsletter with hidden beaches, ferry deals, and seasonal island guides." />

            {/* Cross-links to other pillar pages */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Ontdek Meer Thailand Gidsen' : 'Explore More Thailand Guides'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/things-to-do-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s150_things_to_do")}</div>
                  <div className="text-xs text-gray-600">25 best experiences</div>
                </Link>
                <Link href="/best-beaches-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s151_best_beaches")}</div>
                  <div className="text-xs text-gray-600">{t("s152_beach_guide")}</div>
                </Link>
                <Link href="/best-diving-snorkeling-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s153_diving_guide")}</div>
                  <div className="text-xs text-gray-600">{t("s154_sites_amp_courses")}</div>
                </Link>
                <Link href="/best-places-to-visit-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s155_best_places")}</div>
                  <div className="text-xs text-gray-600">33 destinations</div>
                </Link>
                <Link href="/city/phuket/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">Phuket</div>
                  <div className="text-xs text-gray-600">{t("s156_full_guide")}</div>
                </Link>
                <Link href="/city/koh-samui/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s157_koh_samui")}</div>
                  <div className="text-xs text-gray-600">{t("s156_full_guide")}</div>
                </Link>
                <Link href="/city/koh-phangan/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s159_koh_phangan")}</div>
                  <div className="text-xs text-gray-600">{t("s156_full_guide")}</div>
                </Link>
                <Link href="/thailand-travel-guide/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{t("s161_travel_guide")}</div>
                  <div className="text-xs text-gray-600">{t("s162_everything_you_need")}</div>
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
