import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ThailandIndex, BilingualText, IndexCity } from '../../lib/thailand-index';
import { RankingCard, TableOfContents, NomadTable, VisaTable } from '../../components/index';
import type { TocItem } from '../../components/index';

interface DigitalNomadPageProps {
  data: ThailandIndex;
}

function t(obj: BilingualText, locale: string): string {
  return obj[(locale as keyof BilingualText)] || obj.en;
}

const tocItems: { id: string; label: BilingualText }[] = [
  { id: 'nomad-table', label: { en: 'Nomad Rankings', nl: 'Nomad Rankings' } },
  { id: 'top-nomad', label: { en: 'Top 10', nl: 'Top 10' } },
  { id: 'by-region', label: { en: 'By Region', nl: 'Per Regio' } },
  { id: 'visa-guide', label: { en: 'Visa Guide', nl: 'Visumgids' } },
  { id: 'sim-guide', label: { en: 'SIM & eSIM', nl: 'SIM & eSIM' } },
  { id: 'faq', label: { en: 'FAQ', nl: 'FAQ' } },
];

const faqItems = [
  {
    q: {
      en: 'Is Thailand a good country for digital nomads?',
      nl: 'Is Thailand een goed land voor digitale nomaden?',
    },
    a: {
      en: 'Yes, Thailand is consistently ranked among the top digital nomad destinations worldwide. It offers affordable living costs ($800-1,500/month in most cities), reliable WiFi (30-100+ Mbps), a large established nomad community especially in Bangkok and Chiang Mai, excellent food, warm weather year-round, and a welcoming culture. The 2024 Destination Thailand Visa (DTV) also makes it easier to stay legally as a remote worker.',
      nl: 'Ja, Thailand staat consequent in de top van digitale nomadenbestemmingen wereldwijd. Het biedt betaalbare kosten van levensonderhoud ($800-1.500/maand in de meeste steden), betrouwbaar WiFi (30-100+ Mbps), een grote gevestigde nomadengemeenschap vooral in Bangkok en Chiang Mai, uitstekend eten, warm weer het hele jaar door en een gastvrije cultuur. Het Destination Thailand Visa (DTV) uit 2024 maakt het ook makkelijker om legaal te verblijven als remote werker.',
    },
  },
  {
    q: {
      en: 'How much does it cost to live in Thailand as a digital nomad?',
      nl: 'Hoeveel kost het om in Thailand te leven als digitale nomade?',
    },
    a: {
      en: 'Monthly costs vary significantly by city and lifestyle. Budget nomads can live comfortably on $800-1,000/month in cities like Chiang Mai or Chiang Rai (shared apartment, street food, basic coworking). A comfortable mid-range lifestyle in Bangkok or Phuket runs $1,200-2,000/month (private studio, restaurants, gym, coworking membership). On average across all 33 Thai cities, the monthly cost is approximately $894 USD.',
      nl: 'Maandelijkse kosten varieren aanzienlijk per stad en levensstijl. Budget nomaden kunnen comfortabel leven van $800-1.000/maand in steden als Chiang Mai of Chiang Rai (gedeeld appartement, straateten, basis coworking). Een comfortabele middenklasse levensstijl in Bangkok of Phuket kost $1.200-2.000/maand (prive studio, restaurants, sportschool, coworking lidmaatschap). Gemiddeld over alle 33 Thaise steden zijn de maandkosten ongeveer $894 USD.',
    },
  },
  {
    q: {
      en: 'Do I need a special visa to work remotely in Thailand?',
      nl: 'Heb ik een speciaal visum nodig om remote te werken in Thailand?',
    },
    a: {
      en: 'Technically, working on a tourist visa is a grey area. However, Thailand introduced the Destination Thailand Visa (DTV) in 2024, specifically designed for remote workers and digital nomads. It costs 10,000 THB (~$280), is valid for 5 years with 180-day entries, and requires proof of remote work or freelancing plus 500,000 THB in savings. Many nomads also use the 60-day tourist visa exemption for shorter stays, or ED visas for those studying Thai language or Muay Thai.',
      nl: 'Technisch gezien is werken op een toeristenvisum een grijs gebied. Thailand heeft echter in 2024 het Destination Thailand Visa (DTV) geintroduceerd, speciaal ontworpen voor remote werkers en digitale nomaden. Het kost 10.000 THB (~$280), is 5 jaar geldig met verblijven van 180 dagen, en vereist bewijs van remote werk of freelancen plus 500.000 THB spaargeld. Veel nomaden gebruiken ook de 60-daagse toeristenvrijstelling voor kortere verblijven, of ED-visa voor wie Thai taal of Muay Thai studeert.',
    },
  },
  {
    q: {
      en: 'Which Thai city is best for digital nomads: Bangkok or Chiang Mai?',
      nl: 'Welke Thaise stad is het beste voor digitale nomaden: Bangkok of Chiang Mai?',
    },
    a: {
      en: 'Both are excellent choices with different strengths. Bangkok scores highest overall for nomads thanks to world-class coworking spaces, ultra-fast WiFi (60+ Mbps average), massive international community, and unbeatable food and nightlife. Chiang Mai is the classic nomad hub with lower costs ($1,200/month vs $1,500+ in Bangkok), a tight-knit community centered around Nimman area, abundant cafes to work from, and a more relaxed pace. Choose Bangkok for energy and opportunity, Chiang Mai for affordability and community.',
      nl: 'Beide zijn uitstekende keuzes met verschillende sterke punten. Bangkok scoort het hoogst voor nomaden dankzij coworkingspaces van wereldklasse, ultrasnelle WiFi (60+ Mbps gemiddeld), een enorme internationale gemeenschap en ongeevenaarde eetcultuur en nachtleven. Chiang Mai is de klassieke nomaden-hub met lagere kosten ($1.200/maand vs $1.500+ in Bangkok), een hechte gemeenschap rond het Nimman-gebied, talloze cafes om vanuit te werken en een meer ontspannen tempo. Kies Bangkok voor energie en mogelijkheden, Chiang Mai voor betaalbaarheid en gemeenschap.',
    },
  },
];

export default function DigitalNomadPage({ data }: DigitalNomadPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Index', href: '/thailand-index/' },
    {
      name: lang === 'nl' ? 'Digital Nomad' : 'Digital Nomad',
      href: '/thailand-index/digital-nomad/',
    },
  ];

  // Resolve TOC items for current locale
  const resolvedTocItems: TocItem[] = tocItems.map((item) => ({
    id: item.id,
    label: item.label[lang],
  }));

  // Top nomad city
  const topNomadCity = useMemo(() => {
    return [...data.cities].sort(
      (a, b) => (b.scores?.nomad_score ?? 0) - (a.scores?.nomad_score ?? 0)
    )[0];
  }, [data.cities]);

  // Average monthly cost
  const avgMonthlyCost = useMemo(() => {
    const costs = data.cities
      .filter((c) => c.nomad?.monthly_cost_usd != null)
      .map((c) => c.nomad!.monthly_cost_usd);
    return costs.length > 0
      ? Math.round(costs.reduce((sum, c) => sum + c, 0) / costs.length)
      : 0;
  }, [data.cities]);

  // Cities with large or medium community
  const largeCommunityCount = useMemo(() => {
    return data.cities.filter(
      (c) =>
        c.nomad?.nomad_community_size === 'large' ||
        c.nomad?.nomad_community_size === 'medium'
    ).length;
  }, [data.cities]);

  // Top 10 nomad cities from rankings
  const nomadTop10 = data.rankings.best_nomad.items.slice(0, 10);

  // Per-region nomad breakdown
  const regionNomad = useMemo(() => {
    return data.regions
      .map((region) => {
        const slugSet = new Set(region.city_slugs);
        const regionCities = data.cities.filter((c) => slugSet.has(c.slug));
        const citiesWithNomad = regionCities.filter(
          (c) => c.scores?.nomad_score != null
        );
        const avgNomadScore =
          citiesWithNomad.length > 0
            ? citiesWithNomad.reduce(
                (sum, c) => sum + (c.scores?.nomad_score ?? 0),
                0
              ) / citiesWithNomad.length
            : 0;
        const top3 = [...regionCities]
          .sort(
            (a, b) =>
              (b.scores?.nomad_score ?? 0) - (a.scores?.nomad_score ?? 0)
          )
          .slice(0, 3);
        return {
          ...region,
          avgNomadScore,
          cityCount: regionCities.length,
          top3,
        };
      })
      .sort((a, b) => b.avgNomadScore - a.avgNomadScore);
  }, [data.cities, data.regions]);

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
            ? 'Thailand Digital Nomad Index 2026: 33 Steden Vergeleken'
            : 'Thailand Digital Nomad Index 2026: 33 Cities Ranked'
        }
        description={
          lang === 'nl'
            ? 'Vergelijk 33 Thaise steden op WiFi-snelheid, coworking, maandkosten en community in 2026. Vind de beste bestemming voor remote werken in Thailand.'
            : 'Compare 33 Thai cities on WiFi speed, coworking, monthly costs, and nomad community in 2026. Find the best destination for remote work in Thailand.'
        }
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Header */}
        <section className="bg-surface-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/80 to-surface-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Link
              href="/thailand-index/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {lang === 'nl'
                ? 'Terug naar Thailand Index'
                : 'Back to Thailand Index'}
            </Link>
            <h1 className="text-3xl lg:text-5xl font-bold font-heading mb-4">
              {lang === 'nl'
                ? 'Thailand Digital Nomad Index 2026'
                : 'Thailand Digital Nomad Index 2026'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mb-8">
              {lang === 'nl'
                ? '33 bestemmingen vergeleken op WiFi, coworking, kosten en nomadengemeenschap'
                : '33 destinations compared on WiFi, coworking, cost, and nomad community'}
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl' ? '#1 Nomad Stad' : '#1 Nomad City'}
                </div>
                <div className="text-2xl font-bold">
                  {topNomadCity ? t(topNomadCity.name, lang) : '-'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl' ? 'Gem. Maandkosten' : 'Avg. Monthly Cost'}
                </div>
                <div className="text-2xl font-bold">${avgMonthlyCost}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl'
                    ? 'Steden met Community'
                    : 'Cities with Community'}
                </div>
                <div className="text-2xl font-bold">{largeCommunityCount}</div>
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
              {/* NomadTable */}
              <section id="nomad-table">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                  {lang === 'nl'
                    ? 'Alle 33 Bestemmingen voor Nomaden'
                    : 'All 33 Destinations for Nomads'}
                </h2>
                <p className="text-gray-500 mb-6">
                  {lang === 'nl'
                    ? 'Sorteerbaar op WiFi, coworking, kosten, community en nomad score. Klik op kolomheaders om te sorteren.'
                    : 'Sortable by WiFi, coworking, cost, community, and nomad score. Click column headers to sort.'}
                </p>
                <NomadTable cities={data.cities} regions={data.regions} />
              </section>

              {/* Top 10 Nomad Cities */}
              <section id="top-nomad">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Top 10 Steden voor Digitale Nomaden'
                    : 'Top 10 Cities for Digital Nomads'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {nomadTop10.map((item) => (
                    <RankingCard
                      key={item.slug}
                      rank={item.rank}
                      slug={item.slug}
                      name={item.name}
                      metricLabel={
                        lang === 'nl' ? 'Nomad Score' : 'Nomad Score'
                      }
                      metricValue={item.value.toFixed(2)}
                    />
                  ))}
                </div>
              </section>

              {/* Per-region overview */}
              <section id="by-region">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Nomad Score per Regio'
                    : 'Nomad Score by Region'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {regionNomad.map((region) => (
                    <div
                      key={region.slug}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                      <h3 className="font-bold font-heading text-gray-900 mb-1">
                        {t(region.name, lang)}
                      </h3>
                      <p className="text-xs text-gray-400 mb-4">
                        {region.cityCount}{' '}
                        {lang === 'nl' ? 'steden' : 'cities'}
                      </p>
                      <dl className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">
                            {lang === 'nl'
                              ? 'Gem. Nomad Score'
                              : 'Avg. Nomad Score'}
                          </dt>
                          <dd className="font-semibold text-gray-700">
                            {region.avgNomadScore.toFixed(2)}
                          </dd>
                        </div>
                      </dl>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          {lang === 'nl' ? 'Top 3 Steden' : 'Top 3 Cities'}
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
                              <span className="text-xs text-gray-400">
                                {(city.scores?.nomad_score ?? 0).toFixed(2)}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Visa Guide */}
              <section id="visa-guide">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  {lang === 'nl'
                    ? 'Visumgids voor Digitale Nomaden'
                    : 'Visa Guide for Digital Nomads'}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {lang === 'nl'
                    ? 'Thailand biedt verschillende visumopties voor digitale nomaden en remote werkers. De nieuwste optie is het Destination Thailand Visa (DTV), speciaal ontworpen voor mensen die op afstand werken. Hieronder vind je een overzicht van alle relevante visa.'
                    : 'Thailand offers several visa options for digital nomads and remote workers. The newest option is the Destination Thailand Visa (DTV), specifically designed for people working remotely. Below you\'ll find an overview of all relevant visas.'}
                </p>
                <VisaTable />
                <p className="mt-3 text-xs text-gray-400">
                  {lang === 'nl'
                    ? 'Visumvereisten kunnen wijzigen. Controleer altijd de laatste informatie bij de Thaise ambassade of immigratiedienst. Laatst bijgewerkt: maart 2026.'
                    : 'Visa requirements may change. Always verify the latest information with the Thai embassy or immigration office. Last updated: March 2026.'}
                </p>
              </section>

              {/* SIM & eSIM Guide */}
              <section id="sim-guide">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  {lang === 'nl'
                    ? 'SIM & eSIM Gids voor Thailand'
                    : 'SIM & eSIM Guide for Thailand'}
                </h2>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold font-heading text-gray-900 mb-3">
                        {lang === 'nl'
                          ? 'Thaise Mobiele Providers'
                          : 'Thai Mobile Providers'}
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="font-semibold text-thailand-blue min-w-[60px]">
                            AIS
                          </span>
                          <span>
                            {lang === 'nl'
                              ? 'Beste dekking, grootste netwerk. Ideaal voor reizen buiten steden.'
                              : 'Best coverage, largest network. Ideal for travel outside cities.'}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold text-thailand-blue min-w-[60px]">
                            DTAC
                          </span>
                          <span>
                            {lang === 'nl'
                              ? 'Goede prijs-kwaliteit, populair bij toeristen. Goede dekking in steden.'
                              : 'Good value for money, popular with tourists. Good coverage in cities.'}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold text-thailand-blue min-w-[60px]">
                            TrueMove H
                          </span>
                          <span>
                            {lang === 'nl'
                              ? 'Beste data-aanbiedingen, goede 5G dekking in Bangkok en grote steden.'
                              : 'Best data deals, good 5G coverage in Bangkok and major cities.'}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold font-heading text-gray-900 mb-3">
                        {lang === 'nl' ? 'Prijzen & Tips' : 'Pricing & Tips'}
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {lang === 'nl'
                            ? 'Toerist-SIM: 300-600 THB voor 15-30 dagen, onbeperkt data'
                            : 'Tourist SIM: 300-600 THB for 15-30 days, unlimited data'}
                        </li>
                        <li className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {lang === 'nl'
                            ? 'eSIM beschikbaar op luchthavens en online (geen fysieke kaart nodig)'
                            : 'eSIM available at airports and online (no physical card needed)'}
                        </li>
                        <li className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {lang === 'nl'
                            ? 'eSIM-aanbieders: Airalo, Holafly — koop vooraf en activeer bij aankomst'
                            : 'eSIM providers: Airalo, Holafly — buy ahead and activate on arrival'}
                        </li>
                        <li className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {lang === 'nl'
                            ? 'Langverblijvers: maandelijks prepaid plan ~300-500 THB voor onbeperkt data'
                            : 'Long-stayers: monthly prepaid plan ~300-500 THB for unlimited data'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Link to /expat/ */}
              <section className="bg-gradient-to-r from-thailand-blue to-purple-700 rounded-2xl p-8 text-white">
                <h2 className="text-xl font-bold font-heading mb-2">
                  {lang === 'nl'
                    ? 'Meer over Wonen in Thailand'
                    : 'More about Living in Thailand'}
                </h2>
                <p className="opacity-90 mb-4">
                  {lang === 'nl'
                    ? 'Voor gedetailleerde Bangkok-wijkgidsen en expat-informatie, bezoek onze Expat Gids.'
                    : 'For detailed Bangkok neighbourhood guides and expat resources, visit our Expat Guide.'}
                </p>
                <Link
                  href="/expat/"
                  className="inline-flex items-center gap-2 bg-white text-thailand-blue font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {lang === 'nl' ? 'Bekijk Expat Gids' : 'View Expat Guide'}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </section>

              {/* FAQ */}
              <section id="faq" className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="section-label">FAQ</p>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Veelgestelde Vragen over Digital Nomad Leven in Thailand'
                    : 'Digital Nomad Life in Thailand FAQ'}
                </h2>
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <details
                      key={i}
                      className="group bg-surface-cream rounded-xl"
                    >
                      <summary className="p-5 font-semibold cursor-pointer hover:bg-gray-50 rounded-xl list-none flex items-center justify-between transition-colors">
                        <span className="text-gray-900">{item.q[lang]}</span>
                        <svg
                          className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
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
                    ? `Nomad data is gebaseerd op onderzoek van ${data.metadata.nomad_enrichment_count} steden in Thailand, geanalyseerd op WiFi-snelheid, aantal coworking spaces, maandelijkse kosten van levensonderhoud, grootte van de nomadengemeenschap en visumopties. De Nomad Score (0-1) weerspiegelt de algehele geschiktheid van een stad voor digitale nomaden, berekend uit alle bovengenoemde factoren. Data is samengesteld uit lokaal veldonderzoek, Nomad List, Coworker.com en persoonlijke ervaring als remote werker in Thailand. Laatst bijgewerkt: maart 2026.`
                    : `Nomad data is based on research of ${data.metadata.nomad_enrichment_count} cities in Thailand, analysed on WiFi speed, number of coworking spaces, monthly cost of living, nomad community size, and visa options. The Nomad Score (0-1) reflects the overall suitability of a city for digital nomads, calculated from all the factors mentioned above. Data is compiled from local field research, Nomad List, Coworker.com, and personal experience as a remote worker in Thailand. Last updated: March 2026.`}
                </p>
              </section>

              {/* Back to index CTA */}
              <div className="text-center">
                <Link
                  href="/thailand-index/"
                  className="inline-flex items-center gap-2 text-thailand-blue font-semibold hover:underline"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  {lang === 'nl'
                    ? 'Terug naar Thailand Index'
                    : 'Back to Thailand Index'}
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
