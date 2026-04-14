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
                {t("s001_thailand_islands_guide_best")}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("s002_thailand_has_over_1")}
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
              {t("s003_choosing_a_thai_island")}
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {t("s004_beyond_weather_each_island")}
            </p>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              {t("s005_this_guide_organizes_thailand")}
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
                      {t("s006_koh_lipe_sits_in")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s007_the_coral_reefs_begin")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s008_the_critical_planning_detail")}
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
                      {t("s009_no_island_in_thailand")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s010_maya_bay_reopened_in")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s011_phi_phi_don_is")}
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
                      {t("s012_koh_lanta_is_the")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s013_what_makes_koh_lanta")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s014_koh_lanta_is_also")}
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
                      {t("s015_koh_muk_sometimes_spelled")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s016_beyond_the_emerald_cave")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s017_the_practical_reality_is")}
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
                      {t("s018_koh_tao_turtle_island")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s019_the_diving_itself_ranges")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s020_beyond_diving_koh_tao")}
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
                      {t("s021_the_similan_islands_are")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s022_the_similans_are_open")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s023_richelieu_rock_technically_part")}
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
                      {t("s024_koh_lipe_deserves_a")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s025_the_surrounding_waters_of")}
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
                      {t("s026_the_full_moon_party")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s027_what_many_visitors_do")}
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
                      {t("s028_phuket_is_thailand_apos")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s029_phuket_also_has_a")}
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
                      {t("s030_koh_samui_apos_s")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s031_lamai_beach_samui_apos")}
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
                      {t("s032_koh_samui_is_the")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s033_the_island_has_two")}
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
                      {t("s034_koh_lanta_appears_in")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s035_the_road_accessible_nature")}
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
                      {t("s036_phuket_apos_s_scale")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s037_kata_and_karon_beaches")}
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
                      {t("s038_koh_phangan_apos_s")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s039_the_yoga_and_wellness")}
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
                      {t("s040_koh_chang_is_thailand")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s041_the_island_apos_s")}
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
                      {t("s042_koh_lipe_makes_a")}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t("s043_the_deep_off_season")}
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
                  {t("s044_the_classic_andaman_island")}
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
                  {t("s045_the_gulf_route_is")}
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
                  {t("s046_for_the_gulf_route")}
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
