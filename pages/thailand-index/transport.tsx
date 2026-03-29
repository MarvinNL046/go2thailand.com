import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ThailandIndex, BilingualText } from '../../lib/thailand-index';
import { RankingCard, TableOfContents, TransportTable } from '../../components/index';
import type { TocItem } from '../../components/index';

interface TransportPageProps {
  data: ThailandIndex;
}

function t(obj: BilingualText, locale: string): string {
  return obj[(locale as keyof BilingualText)] || obj.en;
}

const tocItems: { id: string; label: BilingualText }[] = [
  { id: 'transport-table', label: { en: 'Transport Table', nl: 'Transport Tabel' } },
  { id: 'most-connected', label: { en: 'Most Connected', nl: 'Best Verbonden' } },
  { id: 'by-region', label: { en: 'By Region', nl: 'Per Regio' } },
  { id: 'faq', label: { en: 'FAQ', nl: 'FAQ' } },
];

const faqItems = [
  {
    q: {
      en: 'What is the best way to travel between cities in Thailand?',
      nl: 'Wat is de beste manier om tussen steden in Thailand te reizen?',
    },
    a: {
      en: 'It depends on the distance and your budget. For short distances (under 4 hours), minivans and buses are the most popular and affordable option. For longer routes like Bangkok to Chiang Mai, you can choose between overnight trains (comfortable sleeper cabins from ~$15), domestic flights (1-1.5 hours, from ~$30), or VIP buses (9-10 hours, from ~$20). Between islands, ferries and speedboats connect the major destinations. Grab taxi and private transfers are convenient for shorter trips.',
      nl: 'Het hangt af van de afstand en je budget. Voor korte afstanden (onder 4 uur) zijn minibusjes en bussen de populairste en meest betaalbare optie. Voor langere routes zoals Bangkok naar Chiang Mai kun je kiezen tussen nachttreinen (comfortabele slaapcabines vanaf ~$15), binnenlandse vluchten (1-1,5 uur, vanaf ~$30), of VIP-bussen (9-10 uur, vanaf ~$20). Tussen eilanden verbinden veerboten en speedboten de belangrijkste bestemmingen. Grab taxi en privevervoer zijn handig voor kortere ritten.',
    },
  },
  {
    q: {
      en: 'Which Thai cities have the best transport connections?',
      nl: 'Welke Thaise steden hebben de beste vervoersverbindingen?',
    },
    a: {
      en: 'Bangkok is by far the most connected city, serving as the central transport hub with direct connections to nearly every destination in Thailand. Chiang Mai is the northern hub with extensive bus, train, and flight connections. Phuket and Surat Thani are the main gateways to southern Thailand and the islands. Hat Yai serves as a key junction for the deep south. These hub cities offer the most route options, transport modes, and frequency of departures.',
      nl: 'Bangkok is verreweg de best verbonden stad en dient als het centrale vervoersknooppunt met directe verbindingen naar bijna elke bestemming in Thailand. Chiang Mai is de noordelijke hub met uitgebreide bus-, trein- en vliegverbindingen. Phuket en Surat Thani zijn de belangrijkste toegangspoorten tot Zuid-Thailand en de eilanden. Hat Yai dient als belangrijk knooppunt voor het diepe zuiden. Deze hubsteden bieden de meeste routeopties, vervoerswijzen en vertrekfrequenties.',
    },
  },
  {
    q: {
      en: 'How do I get from Bangkok to Chiang Mai?',
      nl: 'Hoe kom ik van Bangkok naar Chiang Mai?',
    },
    a: {
      en: 'There are three main options: 1) Fly — multiple daily flights (1-1.5 hours, $30-80), the fastest option. Airlines include AirAsia, Nok Air, Thai Lion Air, and Thai Smile. 2) Train — the overnight sleeper train from Hua Lamphong or Bang Sue station is a classic Thai experience (12-14 hours, $15-45 depending on class). Book 2nd class sleeper for the best value. 3) Bus — VIP and first-class buses run from Mo Chit terminal (9-10 hours, $20-30). The VIP 24-seater buses are the most comfortable with reclining seats, snacks, and blankets.',
      nl: 'Er zijn drie hoofdopties: 1) Vliegen — meerdere dagelijkse vluchten (1-1,5 uur, $30-80), de snelste optie. Luchtvaartmaatschappijen zijn onder andere AirAsia, Nok Air, Thai Lion Air en Thai Smile. 2) Trein — de nachttrein vanaf Hua Lamphong of Bang Sue station is een klassieke Thaise ervaring (12-14 uur, $15-45 afhankelijk van klasse). Boek 2e klas slaapwagen voor de beste prijs-kwaliteit. 3) Bus — VIP- en eersteklasbussen rijden vanaf Mo Chit terminal (9-10 uur, $20-30). De VIP 24-zits bussen zijn het comfortabelst met verstelbare stoelen, snacks en dekens.',
    },
  },
];

export default function TransportPage({ data }: TransportPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Index', href: '/thailand-index/' },
    {
      name: 'Transport',
      href: '/thailand-index/transport/',
    },
  ];

  // Resolve TOC items for current locale
  const resolvedTocItems: TocItem[] = tocItems.map((item) => ({
    id: item.id,
    label: item.label[lang],
  }));

  // Stats for hero
  const totalRoutes = data.metadata.transport_routes_count;
  const popularHubCount = data.cities.filter(
    (c) => (c.transport?.hubness ?? 0) > 0.5
  ).length;
  const mostConnectedCity = useMemo(() => {
    return [...data.cities].sort(
      (a, b) => (b.transport?.hubness ?? 0) - (a.transport?.hubness ?? 0)
    )[0];
  }, [data.cities]);

  // Top 10 most connected
  const mostConnectedTop10 = data.rankings.most_connected.items.slice(0, 10);

  // Per-region transport breakdown
  const regionTransport = useMemo(() => {
    return data.regions
      .map((region) => {
        const slugSet = new Set(region.city_slugs);
        const regionCities = data.cities.filter((c) => slugSet.has(c.slug));
        const avgHubness =
          regionCities.length > 0
            ? regionCities.reduce((sum, c) => sum + (c.transport?.hubness ?? 0), 0) /
              regionCities.length
            : 0;
        const top3 = [...regionCities]
          .sort((a, b) => (b.transport?.hubness ?? 0) - (a.transport?.hubness ?? 0))
          .slice(0, 3);
        return {
          ...region,
          avgHubness,
          cityCount: regionCities.length,
          top3,
        };
      })
      .sort((a, b) => b.avgHubness - a.avgHubness);
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
            ? 'Transport Hub: Reizen door Thailand — 33 Steden Vergeleken'
            : 'Transport Hub: How to Get Around Thailand — 33 Cities Compared'
        }
        description={
          lang === 'nl'
            ? 'Vergelijk vervoersverbindingen voor 33 Thaise steden. Hub scores, populaire routes en de best verbonden bestemmingen in Thailand.'
            : 'Compare transport connections for 33 Thai cities. Hub scores, popular routes, and the most connected destinations in Thailand.'
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
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/80 to-surface-dark" />
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
                ? 'Thailand Transport Hub 2026'
                : 'Thailand Transport Hub 2026'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mb-8">
              {lang === 'nl'
                ? 'Vervoersverbindingen voor 33 bestemmingen — vind de best verbonden steden'
                : 'Transport connections for 33 destinations — find the best connected cities'}
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl' ? 'Totale Routes' : 'Total Routes'}
                </div>
                <div className="text-2xl font-bold">{totalRoutes}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl' ? 'Major Hubs' : 'Major Hubs'}
                </div>
                <div className="text-2xl font-bold">{popularHubCount}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  {lang === 'nl' ? 'Best Verbonden' : 'Most Connected'}
                </div>
                <div className="text-2xl font-bold">
                  {mostConnectedCity ? t(mostConnectedCity.name, lang) : '-'}
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
              {/* Full transport table */}
              <section id="transport-table">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                  {lang === 'nl'
                    ? 'Alle 33 Bestemmingen op Transport'
                    : 'All 33 Destinations by Transport'}
                </h2>
                <p className="text-gray-500 mb-6">
                  {lang === 'nl'
                    ? 'Sorteerbaar op verbindingen, populaire routes en hub score. Klik op kolomheaders om te sorteren.'
                    : 'Sortable by connections, popular routes, and hub score. Click column headers to sort.'}
                </p>
                <TransportTable cities={data.cities} regions={data.regions} />
              </section>

              {/* Top 10 Most Connected */}
              <section id="most-connected">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Top 10 Best Verbonden Steden'
                    : 'Top 10 Most Connected Cities'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {mostConnectedTop10.map((item) => (
                    <RankingCard
                      key={item.slug}
                      rank={item.rank}
                      slug={item.slug}
                      name={item.name}
                      metricLabel={lang === 'nl' ? 'Hub Score' : 'Hub Score'}
                      metricValue={item.value.toFixed(2)}
                    />
                  ))}
                </div>
              </section>

              {/* Per-region transport */}
              <section id="by-region">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
                  {lang === 'nl'
                    ? 'Transport per Regio'
                    : 'Transport by Region'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {regionTransport.map((region) => (
                    <div
                      key={region.slug}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                      <h3 className="font-bold font-heading text-gray-900 mb-1">
                        {t(region.name, lang)}
                      </h3>
                      <p className="text-xs text-gray-400 mb-4">
                        {region.cityCount} {lang === 'nl' ? 'steden' : 'cities'}
                      </p>
                      <dl className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">
                            {lang === 'nl' ? 'Gem. Hub Score' : 'Avg. Hub Score'}
                          </dt>
                          <dd className="font-semibold text-gray-700">
                            {region.avgHubness.toFixed(2)}
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
                                {(city.transport?.hubness ?? 0).toFixed(2)}
                              </span>
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
                  {lang === 'nl' ? 'Veelgestelde Vragen over Transport' : 'Transport FAQ'}
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
                    ? `Transport data is gebaseerd op ${totalRoutes} routes tussen 33 steden in Thailand, geanalyseerd op basis van beschikbare vervoerswijzen (bus, trein, vlucht, boot, taxi), frequentie en populariteit. De Hub Score (0-1) weerspiegelt hoe goed verbonden een stad is ten opzichte van alle andere bestemmingen in ons netwerk. Data is samengesteld uit officiële vervoersschema's, lokale reisaanbieders en persoonlijke reiservaring. Laatst bijgewerkt: maart 2026.`
                    : `Transport data is based on ${totalRoutes} routes between 33 cities in Thailand, analysed by available transport modes (bus, train, flight, boat, taxi), frequency, and popularity. The Hub Score (0-1) reflects how well connected a city is relative to all other destinations in our network. Data is compiled from official transport schedules, local travel providers, and personal travel experience. Last updated: March 2026.`}
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
