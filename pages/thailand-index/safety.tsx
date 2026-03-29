import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ThailandIndex, BilingualText } from '../../lib/thailand-index';
import { RankingCard, TableOfContents, SafetyTable, RiskCard, ScoreBadge } from '../../components/index';
import type { TocItem } from '../../components/index';

interface SafetyPageProps {
  data: ThailandIndex;
}

function t(obj: BilingualText, locale: string): string {
  return obj[(locale as keyof BilingualText)] || obj.en;
}

const tocItems: { id: string; label: BilingualText }[] = [
  { id: 'safety-table', label: { en: 'Safety Rankings', nl: 'Veiligheid Rankings' } },
  { id: 'safest-cities', label: { en: 'Safest Cities', nl: 'Veiligste Steden' } },
  { id: 'common-risks', label: { en: 'Common Risks', nl: 'Veelvoorkomende Risico\'s' } },
  { id: 'emergency', label: { en: 'Emergency Numbers', nl: 'Alarmnummers' } },
  { id: 'by-region', label: { en: 'By Region', nl: 'Per Regio' } },
  { id: 'faq', label: { en: 'FAQ', nl: 'FAQ' } },
];

const faqItems = [
  {
    q: {
      en: 'Is Thailand safe for tourists?',
      nl: 'Is Thailand veilig voor toeristen?',
    },
    a: {
      en: 'Thailand is generally very safe for tourists. Violent crime against foreigners is rare, and the most common issues are petty theft, scams, and traffic accidents. Most of Thailand\'s 33 major destinations score above 0.70 on our safety index. Tourist police (call 1155) are available in all major tourist areas and speak English. By taking basic precautions — like using registered taxis, being cautious with valuables, and wearing a helmet on motorbikes — you can have a very safe trip.',
      nl: 'Thailand is over het algemeen zeer veilig voor toeristen. Geweldsmisdaden tegen buitenlanders zijn zeldzaam, en de meest voorkomende problemen zijn kleine diefstal, oplichting en verkeersongevallen. De meeste van Thailand\'s 33 grote bestemmingen scoren boven 0,70 op onze veiligheidsindex. Toeristenpolitie (bel 1155) is beschikbaar in alle grote toeristengebieden en spreekt Engels. Door basisvoorzorgsmaatregelen te nemen — zoals geregistreerde taxi\'s gebruiken, voorzichtig zijn met waardevolle spullen en een helm dragen op motorfietsen — kun je een zeer veilige reis hebben.',
    },
  },
  {
    q: {
      en: 'Is Thailand safe for solo female travellers?',
      nl: 'Is Thailand veilig voor vrouwelijke soloreizigers?',
    },
    a: {
      en: 'Thailand is one of the most popular destinations for solo female travellers in Southeast Asia. Our female solo safety scores average around 0.70 across all 33 destinations. Cities like Chiang Mai, Pai, and Koh Lanta are especially well-regarded for solo female travel. Standard precautions apply: avoid walking alone late at night in poorly lit areas, be cautious with drinks in nightlife areas, use reputable transport, and trust your instincts. Thailand\'s friendly culture and well-developed tourist infrastructure make it a comfortable choice.',
      nl: 'Thailand is een van de populairste bestemmingen voor vrouwelijke soloreizigers in Zuidoost-Azië. Onze veiligheidsscores voor vrouwelijke soloreizigers liggen gemiddeld rond 0,70 over alle 33 bestemmingen. Steden als Chiang Mai, Pai en Koh Lanta staan bijzonder goed bekend voor vrouwelijk soloreizen. Standaard voorzorgsmaatregelen gelden: vermijd \'s avonds laat alleen lopen in slecht verlichte gebieden, wees voorzichtig met drankjes in uitgaansgebieden, gebruik betrouwbaar vervoer en vertrouw op je instinct. Thailand\'s vriendelijke cultuur en goed ontwikkelde toeristische infrastructuur maken het een comfortabele keuze.',
    },
  },
  {
    q: {
      en: 'What are the most common scams in Thailand?',
      nl: 'Wat zijn de meest voorkomende oplichtingstrucs in Thailand?',
    },
    a: {
      en: 'The most common scams include: tuk-tuk overcharging (always agree on a price beforehand), taxi meter refusal (insist on the meter or use Grab), jet-ski damage scams on islands (avoid renting or photograph the jet-ski thoroughly first), ATM skimming (use ATMs inside banks), and gem shop scams in Bangkok (never buy gems from "recommended" shops). Being aware of these common tricks significantly reduces your risk. When in doubt, the Tourist Police hotline at 1155 can help with disputes.',
      nl: 'De meest voorkomende oplichtingstrucs zijn: tuk-tuk prijsopdrijving (spreek altijd van tevoren een prijs af), taximeter weigering (sta erop dat de meter loopt of gebruik Grab), jet-ski schade scams op eilanden (vermijd het huren of fotografeer de jet-ski grondig van tevoren), ATM skimming (gebruik geldautomaten in banken), en edelstenen winkel scams in Bangkok (koop nooit edelstenen bij "aanbevolen" winkels). Bewust zijn van deze veelvoorkomende trucs vermindert je risico aanzienlijk. Bij twijfel kan de Toeristenpolitie hotline op 1155 helpen bij geschillen.',
    },
  },
  {
    q: {
      en: 'What should I do in a medical emergency in Thailand?',
      nl: 'Wat moet ik doen bij een medisch noodgeval in Thailand?',
    },
    a: {
      en: 'Call 1669 for ambulance/medical emergencies. Thailand has excellent private hospitals in major cities like Bangkok, Chiang Mai, and Phuket — many are internationally accredited (JCI) with English-speaking staff. Bangkok Hospital, Bumrungrad, and Samitivej are world-class facilities. In smaller cities, government hospitals provide adequate emergency care. Always have travel insurance that covers medical evacuation. Keep your embassy\'s emergency number saved. For non-urgent issues, many pharmacies have knowledgeable staff who can help with minor ailments.',
      nl: 'Bel 1669 voor ambulance/medische noodgevallen. Thailand heeft uitstekende privéziekenhuizen in grote steden als Bangkok, Chiang Mai en Phuket — veel zijn internationaal geaccrediteerd (JCI) met Engelssprekend personeel. Bangkok Hospital, Bumrungrad en Samitivej zijn faciliteiten van wereldklasse. In kleinere steden bieden overheidsziekenhuizen adequate spoedeisende hulp. Zorg altijd voor een reisverzekering die medische evacuatie dekt. Bewaar het noodnummer van je ambassade. Voor niet-urgente zaken hebben veel apotheken kundig personeel dat kan helpen bij kleine kwalen.',
    },
  },
];

export default function SafetyPage({ data }: SafetyPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Index', href: '/thailand-index/' },
    {
      name: lang === 'nl' ? 'Veiligheid' : 'Safety',
      href: '/thailand-index/safety/',
    },
  ];

  // Resolve TOC items for current locale
  const resolvedTocItems: TocItem[] = tocItems.map((item) => ({
    id: item.id,
    label: item.label[lang],
  }));

  // Stats for hero
  const citiesWithSafety = data.cities.filter((c) => c.safety);
  const avgSafetyScore = useMemo(() => {
    const scores = citiesWithSafety.map((c) => c.safety!.overall_safety_score);
    return scores.length > 0
      ? scores.reduce((sum, s) => sum + s, 0) / scores.length
      : 0;
  }, [citiesWithSafety]);

  const citiesWithTouristPolice = citiesWithSafety.filter(
    (c) => c.safety!.tourist_police_available
  ).length;

  const citiesWithHighHospital = citiesWithSafety.filter(
    (c) => c.safety!.hospital_quality === 'high'
  ).length;

  // Top 10 safest
  const safestTop10 = data.rankings.safest.items.slice(0, 10);

  // Per-region safety breakdown
  const regionSafety = useMemo(() => {
    return data.regions
      .map((region) => {
        const slugSet = new Set(region.city_slugs);
        const regionCities = data.cities.filter(
          (c) => slugSet.has(c.slug) && c.safety
        );
        const avgScore =
          regionCities.length > 0
            ? regionCities.reduce(
                (sum, c) => sum + (c.safety?.overall_safety_score ?? 0),
                0
              ) / regionCities.length
            : 0;

        // Collect common risks across the region
        const riskCounts: Record<string, number> = {};
        for (const city of regionCities) {
          for (const risk of city.safety?.common_risks ?? []) {
            riskCounts[risk] = (riskCounts[risk] || 0) + 1;
          }
        }
        const topRisks = Object.entries(riskCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([risk, count]) => ({ risk, count }));

        const top3 = [...regionCities]
          .sort(
            (a, b) =>
              (b.safety?.overall_safety_score ?? 0) -
              (a.safety?.overall_safety_score ?? 0)
          )
          .slice(0, 3);

        return {
          ...region,
          avgScore,
          cityCount: regionCities.length,
          top3,
          topRisks,
        };
      })
      .sort((a, b) => b.avgScore - a.avgScore);
  }, [data.cities, data.regions]);

  // Risk label lookup
  const riskLabels: Record<string, BilingualText> = useMemo(() => {
    const labels: Record<string, BilingualText> = {
      'taxi-scams': { en: 'Taxi scams', nl: 'Taxi scams' },
      'tuk-tuk-overcharging': { en: 'Tuk-tuk overcharging', nl: 'Tuk-tuk prijsopdrijving' },
      'gem-scams': { en: 'Gem scams', nl: 'Edelstenen scams' },
      'jet-ski-scams': { en: 'Jet-ski scams', nl: 'Jet-ski scams' },
      'fake-police': { en: 'Fake police', nl: 'Nep politie' },
      'atm-skimming': { en: 'ATM skimming', nl: 'ATM skimming' },
      'pickpocketing': { en: 'Pickpocketing', nl: 'Zakkenrollerij' },
      'bag-snatching': { en: 'Bag snatching', nl: 'Tassenroof' },
      'drink-spiking': { en: 'Drink spiking', nl: 'Drankjes drogeren' },
      'petty-theft': { en: 'Petty theft', nl: 'Kleine diefstal' },
      'traffic-accidents': { en: 'Traffic accidents', nl: 'Verkeersongevallen' },
      'motorbike-accidents': { en: 'Motorbike accidents', nl: 'Motorongevallen' },
      'road-safety': { en: 'Road safety', nl: 'Verkeersveiligheid' },
      'rip-currents': { en: 'Rip currents', nl: 'Muistromingen' },
      'animal-bites': { en: 'Animal bites', nl: 'Dierenbeten' },
      'food-poisoning': { en: 'Food poisoning', nl: 'Voedselvergiftiging' },
      'food-hygiene': { en: 'Food hygiene', nl: 'Voedselhygiëne' },
      'jellyfish-stings': { en: 'Jellyfish stings', nl: 'Kwallensteken' },
      'water-safety': { en: 'Water safety', nl: 'Waterveiligheid' },
      'air-pollution': { en: 'Air pollution', nl: 'Luchtvervuiling' },
      'boat-safety': { en: 'Boat safety', nl: 'Bootveiligheid' },
    };
    return labels;
  }, []);

  // Emergency numbers
  const emergencyNumbers = [
    {
      label: { en: 'Police', nl: 'Politie' },
      number: '191',
      description: { en: 'Thai police emergency line', nl: 'Thaise politie noodlijn' },
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      label: { en: 'Tourist Police', nl: 'Toeristenpolitie' },
      number: '1155',
      description: { en: 'English-speaking, available 24/7', nl: 'Engelssprekend, 24/7 beschikbaar' },
      color: 'bg-green-50 text-green-800 border-green-200',
    },
    {
      label: { en: 'Ambulance / Medical', nl: 'Ambulance / Medisch' },
      number: '1669',
      description: { en: 'Medical emergencies', nl: 'Medische noodgevallen' },
      color: 'bg-red-50 text-red-800 border-red-200',
    },
    {
      label: { en: 'Fire', nl: 'Brandweer' },
      number: '199',
      description: { en: 'Fire department', nl: 'Brandweer' },
      color: 'bg-orange-50 text-orange-800 border-orange-200',
    },
    {
      label: { en: 'Highway Police', nl: 'Snelwegpolitie' },
      number: '1193',
      description: { en: 'Highway emergencies and accidents', nl: 'Snelweg noodgevallen en ongelukken' },
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  ];

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

  return (
    <>
      <SEOHead
        title={
          lang === 'nl'
            ? 'Hoe Veilig is Thailand? Veiligheidsscores voor 33 Bestemmingen (2026)'
            : 'How Safe is Thailand? Safety Scores for 33 Destinations (2026)'
        }
        description={
          lang === 'nl'
            ? 'Vergelijk veiligheidsscores voor 33 Thaise bestemmingen. Solo- en vrouwvriendelijke scores, nachtveiligheid, veelvoorkomende risico\'s en alarmnummers.'
            : 'Compare safety scores for 33 Thai destinations. Solo and female-friendly scores, night safety, common risks, and emergency numbers.'
        }
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/80 to-surface-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Link
              href="/thailand-index/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {lang === 'nl' ? 'Terug naar Thailand Index' : 'Back to Thailand Index'}
            </Link>
            <h1 className="text-3xl lg:text-5xl font-bold font-heading mb-4">
              {lang === 'nl'
                ? 'Thailand Veiligheidsindex 2026'
                : 'Thailand Safety Index 2026'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mb-8">
              {lang === 'nl'
                ? 'Veiligheidsscores voor 33 bestemmingen — van solo reizen tot nachtleven veiligheid'
                : 'Safety scores for 33 destinations — from solo travel to nightlife safety'}
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl' ? 'Gem. Veiligheid' : 'Avg. Safety'}
                </div>
                <div className="text-2xl font-bold">{avgSafetyScore.toFixed(2)}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl' ? 'Met Toeristenpolitie' : 'Tourist Police'}
                </div>
                <div className="text-2xl font-bold">
                  {citiesWithTouristPolice} {lang === 'nl' ? 'steden' : 'cities'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl' ? 'Top Ziekenhuizen' : 'Top Hospitals'}
                </div>
                <div className="text-2xl font-bold">
                  {citiesWithHighHospital} {lang === 'nl' ? 'steden' : 'cities'}
                </div>
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

        {/* Main content with TOC sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
            {/* Sidebar */}
            <TableOfContents items={resolvedTocItems} />

            {/* Content */}
            <div className="space-y-16">
              {/* Full safety table */}
              <section id="safety-table">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                  {lang === 'nl'
                    ? 'Alle 33 Bestemmingen op Veiligheid'
                    : 'All 33 Destinations by Safety'}
                </h2>
                <p className="text-gray-500 mb-6">
                  {lang === 'nl'
                    ? 'Sorteerbaar op veiligheidsscores. Klik op kolomheaders om te sorteren.'
                    : 'Sortable by safety scores. Click column headers to sort.'}
                </p>
                <SafetyTable cities={data.cities} regions={data.regions} />
              </section>

              {/* Top 10 Safest Cities */}
              <section id="safest-cities">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Top 10 Veiligste Steden'
                    : 'Top 10 Safest Cities'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {safestTop10.map((item) => (
                    <RankingCard
                      key={item.slug}
                      rank={item.rank}
                      slug={item.slug}
                      name={item.name}
                      metricLabel={lang === 'nl' ? 'Veiligheidsscore' : 'Safety Score'}
                      metricValue={item.value.toFixed(2)}
                    />
                  ))}
                </div>
              </section>

              {/* Common Risks */}
              <section id="common-risks">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                  {lang === 'nl'
                    ? 'Veelvoorkomende Risico\'s in Thailand'
                    : 'Common Risks in Thailand'}
                </h2>
                <p className="text-gray-500 mb-8">
                  {lang === 'nl'
                    ? 'Gebaseerd op risicogegevens van alle 33 bestemmingen, gegroepeerd per categorie.'
                    : 'Based on risk data from all 33 destinations, grouped by category.'}
                </p>
                <RiskCard cities={data.cities} />
              </section>

              {/* Emergency Numbers */}
              <section id="emergency">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                  {lang === 'nl'
                    ? 'Alarmnummers Thailand'
                    : 'Emergency Numbers Thailand'}
                </h2>
                <p className="text-gray-500 mb-8">
                  {lang === 'nl'
                    ? 'Bewaar deze nummers voor je reis. De toeristenpolitie (1155) spreekt Engels.'
                    : 'Save these numbers before your trip. The Tourist Police (1155) speak English.'}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyNumbers.map((item) => (
                    <div
                      key={item.number}
                      className={`rounded-2xl border-2 p-6 text-center ${item.color}`}
                    >
                      <p className="text-sm font-semibold uppercase tracking-wider mb-2">
                        {item.label[lang]}
                      </p>
                      <p className="text-4xl font-bold font-heading mb-2">
                        {item.number}
                      </p>
                      <p className="text-xs opacity-75">
                        {item.description[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Per-region safety */}
              <section id="by-region">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Veiligheid per Regio'
                    : 'Safety by Region'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {regionSafety.map((region) => (
                    <div
                      key={region.slug}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold font-heading text-gray-900">
                          {t(region.name, lang)}
                        </h3>
                        <ScoreBadge score={region.avgScore} size="sm" />
                      </div>
                      <p className="text-xs text-gray-400 mb-4">
                        {region.cityCount} {lang === 'nl' ? 'steden' : 'cities'}
                      </p>

                      {/* Top risks in region */}
                      {region.topRisks.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            {lang === 'nl' ? 'Top Risico\'s' : 'Top Risks'}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {region.topRisks.map(({ risk, count }) => {
                              const label = riskLabels[risk];
                              return (
                                <span
                                  key={risk}
                                  className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 rounded-full px-2.5 py-1"
                                >
                                  {label ? label[lang] : risk}
                                  <span className="text-red-400">({count})</span>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Top 3 safest cities */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          {lang === 'nl' ? 'Top 3 Veiligste' : 'Top 3 Safest'}
                        </p>
                        <div className="space-y-2">
                          {region.top3.map((city, i) => (
                            <Link
                              key={city.slug}
                              href={`/city/${city.slug}/`}
                              className="flex items-center justify-between text-sm hover:bg-surface-cream rounded-lg px-2 py-1.5 -mx-2 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-gray-400 font-medium text-xs w-4">
                                  {i + 1}
                                </span>
                                <span className="text-thailand-blue font-medium hover:text-thailand-red transition-colors">
                                  {t(city.name, lang)}
                                </span>
                              </span>
                              <ScoreBadge
                                score={city.safety?.overall_safety_score ?? null}
                                size="sm"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="section-label">FAQ</p>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl' ? 'Veelgestelde Vragen over Veiligheid' : 'Safety FAQ'}
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

              {/* About / Methodology */}
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold font-heading text-gray-900 mb-3">
                  {lang === 'nl' ? 'Over deze data' : 'About this data'}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {lang === 'nl'
                    ? `Veiligheidsdata is gebaseerd op analyse van ${citiesWithSafety.length} bestemmingen in Thailand, beoordeeld op algehele veiligheid, solo reizen, veiligheid voor vrouwelijke reizigers, nachtveiligheid, ziekenhuiskwaliteit en veelvoorkomende risico's. Scores zijn op een schaal van 0-1 (hoger is veiliger). Data is samengesteld uit officiële veiligheidsadviezen, lokale politierapporten, reizigersbeoordelingen en persoonlijke reiservaring. De toeristenpolitie (1155) is beschikbaar in de meeste toeristische bestemmingen en spreekt Engels. Laatst bijgewerkt: maart 2026.`
                    : `Safety data is based on analysis of ${citiesWithSafety.length} destinations in Thailand, rated on overall safety, solo travel, female traveller safety, night safety, hospital quality, and common risks. Scores are on a 0-1 scale (higher is safer). Data is compiled from official travel advisories, local police reports, traveller reviews, and personal travel experience. The Tourist Police (1155) are available in most tourist destinations and speak English. Last updated: March 2026.`}
                </p>
              </section>

              {/* Back to index CTA */}
              <div className="text-center">
                <Link
                  href="/thailand-index/"
                  className="inline-flex items-center gap-2 text-thailand-blue font-semibold hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  {lang === 'nl' ? 'Terug naar Thailand Index' : 'Back to Thailand Index'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require('../../data/thailand-index.json') as ThailandIndex;
  return {
    props: { data },
    revalidate: 604800,
  };
};
