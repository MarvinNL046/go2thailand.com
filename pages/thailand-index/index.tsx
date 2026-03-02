import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ThailandIndex, BilingualText } from '../../lib/thailand-index';
import {
  IndexTable,
  TableOfContents,
  RankingCard,
  MonthMatrix,
} from '../../components/index';
import type { TocItem } from '../../components/index';

interface ThailandIndexPageProps {
  data: ThailandIndex;
}

function t(obj: BilingualText, locale: string): string {
  return obj[(locale as keyof BilingualText)] || obj.en;
}

const tocItemsEn: TocItem[] = [
  { id: 'at-a-glance', label: 'At a Glance' },
  { id: 'overview-table', label: 'Full Ranking Table' },
  { id: 'why-this-index', label: 'Why This Index' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'budget-preview', label: 'Budget Preview' },
  { id: 'best-time-preview', label: 'Best Time Preview' },
  { id: 'nomad-preview', label: 'Digital Nomads' },
  { id: 'safety-preview', label: 'Safety' },
  { id: 'explore', label: 'Explore Thailand' },
  { id: 'faq', label: 'FAQ' },
  { id: 'about', label: 'About' },
];

const tocItemsNl: TocItem[] = [
  { id: 'at-a-glance', label: 'In een Oogopslag' },
  { id: 'overview-table', label: 'Volledige Ranglijst' },
  { id: 'why-this-index', label: 'Waarom Deze Index' },
  { id: 'methodology', label: 'Methodologie' },
  { id: 'budget-preview', label: 'Budget Overzicht' },
  { id: 'best-time-preview', label: 'Beste Reistijd' },
  { id: 'nomad-preview', label: 'Digitale Nomaden' },
  { id: 'safety-preview', label: 'Veiligheid' },
  { id: 'explore', label: 'Ontdek Thailand' },
  { id: 'faq', label: 'FAQ' },
  { id: 'about', label: 'Over Ons' },
];

const faqItems = [
  {
    q: {
      en: 'What is the cheapest place to visit in Thailand?',
      nl: 'Wat is de goedkoopste plek om te bezoeken in Thailand?',
    },
    a: {
      en: 'Based on our 2026 data, Bueng Kan and Nong Khai in the Isaan region are the most affordable destinations, with budget travellers spending around $19 per day on accommodation, food, and local transport. Other wallet-friendly options include Lampang, Chumphon, and Chanthaburi.',
      nl: 'Op basis van onze data uit 2026 zijn Bueng Kan en Nong Khai in de Isaan-regio de meest betaalbare bestemmingen, waar budget reizigers rond de $19 per dag uitgeven aan accommodatie, eten en lokaal vervoer. Andere voordelige opties zijn Lampang, Chumphon en Chanthaburi.',
    },
  },
  {
    q: {
      en: 'When is the best time to visit Thailand?',
      nl: 'Wanneer is de beste tijd om Thailand te bezoeken?',
    },
    a: {
      en: 'The cool and dry season from November to February offers the most comfortable weather across most of Thailand. However, timing varies by region: southern Thailand\'s Andaman coast (Phuket, Krabi) is best from November to March, while the Gulf coast (Koh Samui) peaks from January to April. Our month-by-month comfort matrix shows exact scores for each destination.',
      nl: 'Het koele en droge seizoen van november tot februari biedt het comfortabelste weer in het grootste deel van Thailand. De timing verschilt echter per regio: de Andamankust in Zuid-Thailand (Phuket, Krabi) is het best van november tot maart, terwijl de Golfkust (Koh Samui) piekt van januari tot april. Onze maand-voor-maand comfortmatrix toont exacte scores per bestemming.',
    },
  },
  {
    q: {
      en: 'How much does a trip to Thailand cost per day?',
      nl: 'Hoeveel kost een reis naar Thailand per dag?',
    },
    a: {
      en: 'Daily costs vary widely by destination and travel style. Budget travellers can expect to spend $19-40 per day depending on the city. Mid-range travellers typically spend $40-100 per day, while luxury travellers should budget $100-200+ per day. Bangkok and Phuket tend to be the most expensive, while Isaan destinations offer the best value.',
      nl: 'Dagelijkse kosten varieren sterk per bestemming en reisstijl. Budgetreizigers kunnen rekenen op $19-40 per dag, afhankelijk van de stad. Middenklasse reizigers besteden doorgaans $40-100 per dag, terwijl luxe reizigers $100-200+ per dag moeten budgetteren. Bangkok en Phuket zijn over het algemeen het duurst, terwijl Isaan-bestemmingen de beste waarde bieden.',
    },
  },
  {
    q: {
      en: 'Which Thai city is best for digital nomads?',
      nl: 'Welke Thaise stad is het beste voor digital nomads?',
    },
    a: {
      en: 'Chiang Mai consistently ranks as Thailand\'s top digital nomad hub thanks to its low cost of living ($25-35/day budget), excellent coworking spaces, reliable internet, and vibrant expat community. Bangkok offers more amenities but at a higher cost. Pai and Koh Samui are popular alternatives for those seeking a more relaxed pace.',
      nl: 'Chiang Mai scoort consequent als de beste digital nomad hub van Thailand dankzij de lage kosten van levensonderhoud ($25-35/dag budget), uitstekende coworking spaces, betrouwbaar internet en een levendige expat-gemeenschap. Bangkok biedt meer voorzieningen maar tegen hogere kosten. Pai en Koh Samui zijn populaire alternatieven voor wie een rustiger tempo zoekt.',
    },
  },
  {
    q: {
      en: 'How are the scores in this index calculated?',
      nl: 'Hoe worden de scores in deze index berekend?',
    },
    a: {
      en: 'Each city is scored on three dimensions: Budget (based on daily cost data for backpacker, mid-range, and luxury tiers), Weather (comfort score derived from temperature, rainfall, and humidity data across 12 months), and Transport (connectivity score based on number of routes, destinations, and transport hub importance). The overall score is a weighted average of these three components, normalised to a 0-1 scale.',
      nl: 'Elke stad wordt beoordeeld op drie dimensies: Budget (gebaseerd op dagelijkse kostendata voor backpacker, middenklasse en luxe), Weer (comfortscore afgeleid van temperatuur, neerslag en vochtigheidsdata over 12 maanden), en Transport (connectiviteitsscore gebaseerd op aantal routes, bestemmingen en belang als vervoersknooppunt). De totaalscore is een gewogen gemiddelde van deze drie componenten, genormaliseerd naar een schaal van 0-1.',
    },
  },
];

export default function ThailandIndexPage({ data }: ThailandIndexPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const tocItems = lang === 'nl' ? tocItemsNl : tocItemsEn;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    {
      name: lang === 'nl' ? 'Thailand Index' : 'Thailand Index',
      href: '/thailand-index/',
    },
  ];

  // Top 10 rankings
  const cheapestTop10 = data.rankings.cheapest.items.slice(0, 10);
  const overallTop10 = data.rankings.overall.items.slice(0, 10);

  // Budget preview: top 5 cheapest + top 5 most expensive
  const cheapestTop5 = data.rankings.cheapest.items.slice(0, 5);
  const expensiveTop5 = data.rankings.most_expensive.items.slice(0, 5);

  // Cities with weather data for best-time preview
  const citiesWithWeather = useMemo(
    () => data.cities.filter((c) => c.weather && c.weather.month_scores),
    [data.cities]
  );

  // FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[lang],
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      lang === 'nl'
        ? 'Thailand Reis- & Kostenindex 2026'
        : 'Thailand Travel & Cost Index 2026',
    author: {
      '@type': 'Organization',
      name: 'Go2Thailand',
    },
    datePublished: '2026-03-01',
    dateModified: data.metadata.generated_at.split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      logo: {
        '@type': 'ImageObject',
        url: 'https://go2-thailand.com/logo.png',
      },
    },
    url: 'https://go2-thailand.com/thailand-index/',
  };

  const combinedSchema = [articleSchema, faqSchema];

  return (
    <>
      <SEOHead
        title={
          lang === 'nl'
            ? 'Thailand Index 2026: Kosten, Weer & Transport voor 33 Bestemmingen'
            : 'Thailand Index 2026: Cost, Weather & Transport for 33 Destinations'
        }
        description={
          lang === 'nl'
            ? 'Vergelijk 33 Thaise bestemmingen op dagelijks budget, weerscomfort en transportverbindingen. Actuele data voor 2026.'
            : 'Compare 33 Thai destinations on daily budget, weather comfort, and transport connectivity. Updated data for 2026.'
        }
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-thailand-blue/80 to-surface-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">
                {lang === 'nl' ? 'Data-gedreven Reisgids' : 'Data-Driven Travel Guide'}
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {lang === 'nl'
                  ? 'Thailand Reis- & Kostenindex 2026'
                  : 'Thailand Travel & Cost Index 2026'}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                {lang === 'nl'
                  ? 'Vergelijk 33 bestemmingen op budget, weer en transport — van Bangkok tot Bueng Kan'
                  : 'Compare 33 destinations on budget, weather, and transport — from Bangkok to Bueng Kan'}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {data.metadata.city_count} {lang === 'nl' ? 'steden' : 'cities'}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {data.metadata.regions_count} {lang === 'nl' ? 'regio\'s' : 'regions'}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {lang === 'nl' ? 'Bijgewerkt maart 2026' : 'Updated March 2026'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Main content with sidebar layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
            {/* Sidebar TOC */}
            <TableOfContents items={tocItems} />

            {/* Content */}
            <div className="space-y-16">
              {/* At a Glance */}
              <section id="at-a-glance">
                <p className="section-label">
                  {lang === 'nl' ? 'In een Oogopslag' : 'At a Glance'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Top Bestemmingen in Thailand'
                    : 'Top Destinations in Thailand'}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Top 10 Cheapest */}
                  <div>
                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">$</span>
                      {lang === 'nl' ? 'Top 10 Goedkoopste' : 'Top 10 Cheapest'}
                    </h3>
                    <div className="space-y-3">
                      {cheapestTop10.map((item) => (
                        <RankingCard
                          key={item.slug}
                          rank={item.rank}
                          slug={item.slug}
                          name={item.name}
                          metricLabel={lang === 'nl' ? 'Budget/dag' : 'Budget/day'}
                          metricValue={`$${item.value}`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Top 10 Best Overall */}
                  <div>
                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-thailand-gold/20 text-thailand-gold flex items-center justify-center text-sm font-bold">&#9733;</span>
                      {lang === 'nl' ? 'Top 10 Beste Totaal' : 'Top 10 Best Overall'}
                    </h3>
                    <div className="space-y-3">
                      {overallTop10.map((item) => (
                        <RankingCard
                          key={item.slug}
                          rank={item.rank}
                          slug={item.slug}
                          name={item.name}
                          metricLabel={lang === 'nl' ? 'Score' : 'Score'}
                          metricValue={item.value.toFixed(2)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Overview Table */}
              <section id="overview-table">
                <p className="section-label">
                  {lang === 'nl' ? 'Volledige Ranglijst' : 'Full Ranking'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                  {lang === 'nl'
                    ? 'Alle 33 Bestemmingen Vergeleken'
                    : 'All 33 Destinations Compared'}
                </h2>
                <p className="text-gray-500 mb-8">
                  {lang === 'nl'
                    ? 'Klik op een kolomkop om te sorteren. Filter per regio.'
                    : 'Click a column header to sort. Filter by region.'}
                </p>
                <IndexTable cities={data.cities} regions={data.regions} />
              </section>

              {/* Why This Index */}
              <section id="why-this-index" className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="section-label">
                  {lang === 'nl' ? 'Waarom' : 'Why'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                  {lang === 'nl'
                    ? 'Waarom Deze Index?'
                    : 'Why This Index?'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {lang === 'nl' ? (
                    <>
                      <p>
                        Thailand heeft meer dan 30 populaire bestemmingen, elk met een eigen karakter,
                        prijsniveau en klimaat. Of je nu een <strong>backpacker</strong> bent die het meeste
                        uit een klein budget wilt halen, een <strong>digital nomad</strong> die zoekt naar
                        de perfecte mix van kosten en comfort, een <strong>stel</strong> dat een romantische
                        bestemming zoekt, of een <strong>gezin</strong> dat veiligheid en bereikbaarheid
                        prioriteert: de keuze kan overweldigend zijn.
                      </p>
                      <p>
                        De Thailand Index combineert actuele budgetdata, weercomfort en
                        transportverbindingen in een vergelijkbaar overzicht. Geen vage meningen,
                        maar concrete cijfers uit 2026 — zodat je zelf kunt beslissen welke bestemming
                        het beste bij jouw reisstijl past.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Thailand has more than 30 popular destinations, each with its own character,
                        price level, and climate. Whether you are a <strong>backpacker</strong> trying to
                        stretch a tight budget, a <strong>digital nomad</strong> looking for the perfect
                        balance of cost and comfort, a <strong>couple</strong> seeking a romantic getaway,
                        or a <strong>family</strong> prioritising safety and accessibility: the choice can
                        be overwhelming.
                      </p>
                      <p>
                        The Thailand Index combines current budget data, weather comfort scores, and
                        transport connectivity into one comparable overview. No vague opinions, but
                        concrete 2026 figures — so you can decide for yourself which destination best
                        matches your travel style.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* Methodology */}
              <section id="methodology" className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="section-label">
                  {lang === 'nl' ? 'Methodologie' : 'Methodology'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                  {lang === 'nl'
                    ? 'Hoe We Scoren & Bronnen'
                    : 'How We Score & Data Sources'}
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-surface-cream rounded-xl p-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold mb-3">$</div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2">
                      {lang === 'nl' ? 'Budget Score' : 'Budget Score'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'nl'
                        ? 'Gebaseerd op dagelijkse kosten voor accommodatie, eten en lokaal vervoer in drie prijsklassen (budget, midden, luxe). Lagere kosten = hogere score.'
                        : 'Based on daily costs for accommodation, food, and local transport across three tiers (budget, mid-range, luxury). Lower costs = higher score.'}
                    </p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-6">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2">
                      {lang === 'nl' ? 'Weer Score' : 'Weather Score'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'nl'
                        ? 'Comfortscore berekend uit temperatuur, neerslag en luchtvochtigheid per maand. Dekt 10 steden met gedetailleerde maanddata; overige steden krijgen een regionaal geschat gemiddelde.'
                        : 'Comfort score calculated from temperature, rainfall, and humidity per month. Covers 10 cities with detailed monthly data; remaining cities receive a regional estimated average.'}
                    </p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-6">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2">
                      {lang === 'nl' ? 'Transport Score' : 'Transport Score'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'nl'
                        ? 'Connectiviteitsscore gebaseerd op het aantal routes, unieke bestemmingen en belang als knooppunt. Bangkok scoort het hoogst als belangrijkste hub van Thailand.'
                        : 'Connectivity score based on number of routes, unique destinations, and hub importance. Bangkok scores highest as Thailand\'s main transport hub.'}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>
                    <strong>{lang === 'nl' ? 'Totaalscore' : 'Overall Score'}:</strong>{' '}
                    {lang === 'nl'
                      ? 'Gewogen gemiddelde van budget (25%), weer (25%), transport (20%), nomad (15%) en veiligheid (15%), genormaliseerd naar 0-1. We geven budget en weer het meeste gewicht omdat die het meest van invloed zijn op de reiservaring. Transport, nomad-vriendelijkheid en veiligheid vullen het profiel aan.'
                      : 'Weighted average of budget (25%), weather (25%), transport (20%), nomad (15%), and safety (15%), normalised to 0-1. Budget and weather carry the most weight as they most directly affect the travel experience. Transport, nomad-friendliness, and safety complete the destination profile.'}
                  </p>
                  <p>
                    <strong>{lang === 'nl' ? 'Beperkingen' : 'Limitations'}:</strong>{' '}
                    {lang === 'nl'
                      ? 'Budgetschattingen zijn indicatief en variëren per seizoen. Weerdata is beschikbaar voor 10 steden; overige steden gebruiken regionale schattingen. Bij gelijke scores worden steden alfabetisch gerangschikt. Scores worden periodiek bijgewerkt.'
                      : 'Budget estimates are indicative and vary by season. Weather data is available for 10 cities; remaining cities use regional estimates. Tied scores are ranked alphabetically by city name. Scores are updated periodically.'}
                  </p>
                  <p>
                    <strong>{lang === 'nl' ? 'Bronnen' : 'Data Sources'}:</strong>{' '}
                    {lang === 'nl'
                      ? 'Budgetdata uit lokale prijsonderzoeken en reizigersrapporten. Weerdata uit historische klimaatgegevens (temperatuur, neerslag, luchtvochtigheid). Transportdata uit 245 routes van officiële vervoerders. Nomad- en veiligheidsscores via AI-ondersteunde analyse op basis van reisadviezen, gemeenschapsrapporten en openbare data — conservatieve schattingen, periodiek beoordeeld.'
                      : 'Budget data from local price surveys and traveller reports. Weather data from historical climate records (temperature, rainfall, humidity). Transport data from 245 routes via official carriers. Nomad and safety scores via AI-assisted analysis based on travel advisories, community reports, and public data — conservative estimates, periodically reviewed.'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {lang === 'nl'
                      ? `Laatste update: ${data.metadata.generated_at.split('T')[0]} | Versie: ${data.metadata.data_version}`
                      : `Last updated: ${data.metadata.generated_at.split('T')[0]} | Version: ${data.metadata.data_version}`}
                  </p>
                </div>
              </section>

              {/* Budget Preview */}
              <section id="budget-preview">
                <p className="section-label">
                  {lang === 'nl' ? 'Budget' : 'Budget'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Budget Overzicht'
                    : 'Budget Preview'}
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Top 5 Cheapest */}
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold font-heading text-green-800 mb-4">
                      {lang === 'nl' ? 'Top 5 Goedkoopste' : 'Top 5 Cheapest'}
                    </h3>
                    <div className="space-y-3">
                      {cheapestTop5.map((item) => (
                        <RankingCard
                          key={item.slug}
                          rank={item.rank}
                          slug={item.slug}
                          name={item.name}
                          metricLabel={lang === 'nl' ? 'Budget/dag' : 'Budget/day'}
                          metricValue={`$${item.value}`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Top 5 Most Expensive */}
                  <div className="bg-red-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold font-heading text-red-800 mb-4">
                      {lang === 'nl' ? 'Top 5 Duurste' : 'Top 5 Most Expensive'}
                    </h3>
                    <div className="space-y-3">
                      {expensiveTop5.map((item) => (
                        <RankingCard
                          key={item.slug}
                          rank={item.rank}
                          slug={item.slug}
                          name={item.name}
                          metricLabel={lang === 'nl' ? 'Budget/dag' : 'Budget/day'}
                          metricValue={`$${item.value}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href="/thailand-index/budget/"
                    className="inline-flex items-center gap-2 bg-thailand-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {lang === 'nl'
                      ? 'Bekijk volledige budgetvergelijking'
                      : 'View full budget comparison'}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </section>

              {/* Best Time Preview */}
              <section id="best-time-preview">
                <p className="section-label">
                  {lang === 'nl' ? 'Weer & Seizoenen' : 'Weather & Seasons'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                  {lang === 'nl'
                    ? 'Beste Reistijd per Bestemming'
                    : 'Best Time to Visit by Destination'}
                </h2>
                <p className="text-gray-500 mb-8">
                  {lang === 'nl'
                    ? 'Comfort scores per maand voor de 10 steden met gedetailleerde weerdata.'
                    : 'Comfort scores per month for the 10 cities with detailed weather data.'}
                </p>
                {citiesWithWeather.length > 0 && (
                  <MonthMatrix cities={citiesWithWeather} />
                )}
                <div className="text-center mt-8">
                  <Link
                    href="/thailand-index/best-time/"
                    className="inline-flex items-center gap-2 bg-thailand-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {lang === 'nl'
                      ? 'Bekijk volledige seizoensgids'
                      : 'View full season guide'}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </section>

              {/* Nomad Preview */}
              {data.rankings.best_nomad && (
                <section id="nomad-preview" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {lang === 'en' ? 'Top Digital Nomad Cities' : 'Top Digitale Nomaden Steden'}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {lang === 'en'
                      ? 'Cities ranked by WiFi speed, coworking spaces, cost of living, and nomad community size.'
                      : 'Steden gerangschikt op WiFi-snelheid, coworking ruimtes, kosten van levensonderhoud en nomadengemeenschap.'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.rankings.best_nomad.items.slice(0, 6).map((item) => (
                      <RankingCard
                        key={item.slug}
                        rank={item.rank}
                        slug={item.slug}
                        name={item.name}
                        metricLabel={lang === 'en' ? 'Nomad Score' : 'Nomad Score'}
                        metricValue={(item.value * 100).toFixed(0) + '%'}
                      />
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href="/thailand-index/digital-nomad/" className="text-thailand-blue hover:underline font-medium">
                      {lang === 'en' ? 'Full digital nomad guide \u2192' : 'Volledige digitale nomaden gids \u2192'}
                    </Link>
                  </div>
                </section>
              )}

              {/* Safety Preview */}
              {data.rankings.safest && (
                <section id="safety-preview" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {lang === 'en' ? 'Safest Destinations' : 'Veiligste Bestemmingen'}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {lang === 'en'
                      ? 'Cities ranked by overall safety, solo traveller safety, nighttime safety, and healthcare quality.'
                      : 'Steden gerangschikt op algehele veiligheid, veiligheid voor alleen-reizigers, nachtveiligheid en gezondheidszorg.'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.rankings.safest.items.slice(0, 6).map((item) => (
                      <RankingCard
                        key={item.slug}
                        rank={item.rank}
                        slug={item.slug}
                        name={item.name}
                        metricLabel={lang === 'en' ? 'Safety Score' : 'Veiligheidsscore'}
                        metricValue={(item.value * 100).toFixed(0) + '%'}
                      />
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href="/thailand-index/safety/" className="text-thailand-blue hover:underline font-medium">
                      {lang === 'en' ? 'Complete safety guide \u2192' : 'Volledige veiligheidsgids \u2192'}
                    </Link>
                  </div>
                </section>
              )}

              {/* Explore Thailand routes */}
              <section id="explore">
                <p className="section-label">
                  {lang === 'nl' ? 'Ontdek Meer' : 'Explore More'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Ontdek Thailand'
                    : 'Explore Thailand'}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link
                    href="/itineraries/"
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-thailand-blue/10 text-thailand-blue flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2 group-hover:text-thailand-blue transition-colors">
                      {lang === 'nl' ? 'Reistrajecten' : 'Itineraries'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'nl'
                        ? 'Kant-en-klare reisroutes door Thailand, van 5 dagen tot 3 weken.'
                        : 'Ready-made travel routes through Thailand, from 5 days to 3 weeks.'}
                    </p>
                  </Link>
                  <Link
                    href="/transport/"
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {lang === 'nl' ? 'Transport Routes' : 'Transport Routes'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'nl'
                        ? `${data.metadata.transport_routes_count} routes tussen steden per bus, trein, vlucht en boot.`
                        : `${data.metadata.transport_routes_count} routes between cities by bus, train, flight, and boat.`}
                    </p>
                  </Link>
                  <Link
                    href="/islands/"
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors">
                      {lang === 'nl' ? 'Eilanden' : 'Islands'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'nl'
                        ? 'Ontdek de mooiste eilanden van Thailand, van Koh Samui tot Koh Lipe.'
                        : 'Discover the most beautiful islands in Thailand, from Koh Samui to Koh Lipe.'}
                    </p>
                  </Link>
                  {/* Transport Hub */}
                  <Link
                    href="/thailand-index/transport/"
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {lang === 'en' ? 'Transport Hub' : 'Transport Hub'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'en' ? 'Connections & routes for 33 cities' : 'Verbindingen & routes voor 33 steden'}
                    </p>
                  </Link>
                  {/* Digital Nomad Guide */}
                  <Link
                    href="/thailand-index/digital-nomad/"
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {lang === 'en' ? 'Digital Nomad Guide' : 'Digitale Nomaden Gids'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'en' ? 'WiFi, coworking & cost rankings' : 'WiFi, coworking & kosten rankings'}
                    </p>
                  </Link>
                  {/* Safety Guide */}
                  <Link
                    href="/thailand-index/safety/"
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="font-bold font-heading text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {lang === 'en' ? 'Safety Guide' : 'Veiligheidsgids'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === 'en' ? 'Safety scores for 33 cities' : 'Veiligheidsscores voor 33 steden'}
                    </p>
                  </Link>
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="section-label">FAQ</p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <details key={i} className="group bg-surface-cream rounded-xl">
                      <summary className="p-5 font-semibold cursor-pointer hover:bg-gray-50 rounded-xl list-none flex items-center justify-between transition-colors">
                        <span className="text-gray-900">{item.q[lang]}</span>
                        <svg
                          className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 text-gray-700 leading-relaxed text-sm">
                        {item.a[lang]}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* About / E-E-A-T */}
              <section id="about" className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="section-label">
                  {lang === 'nl' ? 'Over' : 'About'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                  {lang === 'nl'
                    ? 'Over de Thailand Index'
                    : 'About the Thailand Index'}
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 text-gray-700 space-y-4 text-sm leading-relaxed">
                    {lang === 'nl' ? (
                      <>
                        <p>
                          De Thailand Index is samengesteld door het <strong>Go2Thailand</strong> team,
                          een groep reizigers en schrijvers die sinds 2024 praktische informatie publiceren
                          over reizen naar Thailand.
                        </p>
                        <p>
                          Onze data is afkomstig uit meerdere bronnen: budgetschattingen gebaseerd op actuele
                          verblijfs- en eetprijzen, weerdata van meteorologische diensten, en transportroutes
                          geverifieerd met lokale vervoerders. We streven naar objectiviteit en transparantie
                          in onze methodologie.
                        </p>
                        <p>
                          Deze index wordt periodiek bijgewerkt om seizoensveranderingen en prijsontwikkelingen
                          te weerspiegelen. Heb je een fout gevonden of een suggestie? Neem dan contact met ons op.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          The Thailand Index is compiled by the <strong>Go2Thailand</strong> team,
                          a group of travellers and writers who have been publishing practical
                          information about travelling to Thailand since 2024.
                        </p>
                        <p>
                          Our data comes from multiple sources: budget estimates based on current
                          accommodation and dining prices, weather data from meteorological services,
                          and transport routes verified with local operators. We strive for objectivity
                          and transparency in our methodology.
                        </p>
                        <p>
                          This index is updated periodically to reflect seasonal changes and price
                          developments. Found an error or have a suggestion? Please get in touch.
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex-shrink-0 bg-surface-cream rounded-xl p-6 md:w-64">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {lang === 'nl' ? 'Index feiten' : 'Index Facts'}
                    </p>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="text-gray-400">{lang === 'nl' ? 'Bestemmingen' : 'Destinations'}</dt>
                        <dd className="font-semibold text-gray-900">{data.metadata.city_count}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">{lang === 'nl' ? 'Regio\'s' : 'Regions'}</dt>
                        <dd className="font-semibold text-gray-900">{data.metadata.regions_count}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">{lang === 'nl' ? 'Transport routes' : 'Transport routes'}</dt>
                        <dd className="font-semibold text-gray-900">{data.metadata.transport_routes_count}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">{lang === 'nl' ? 'Weerdata steden' : 'Weather data cities'}</dt>
                        <dd className="font-semibold text-gray-900">{data.metadata.weather_coverage}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">{lang === 'nl' ? 'Laatste update' : 'Last updated'}</dt>
                        <dd className="font-semibold text-gray-900">{data.metadata.generated_at.split('T')[0]}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require('../../data/thailand-index.json');
  return {
    props: { data },
    revalidate: 86400,
  };
};
