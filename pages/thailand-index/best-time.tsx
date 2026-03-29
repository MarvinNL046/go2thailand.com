import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ThailandIndex, BilingualText, IndexCity } from '../../lib/thailand-index';
import { MonthMatrix } from '../../components/index';

interface BestTimePageProps {
  data: ThailandIndex;
}

function t(obj: BilingualText, locale: string): string {
  return obj[(locale as keyof BilingualText)] || obj.en;
}

const regionDescriptions: Record<string, BilingualText> = {
  northern: {
    en: 'Northern Thailand (Chiang Mai, Chiang Rai, Pai, Lampang) enjoys a cooler climate than the rest of the country, especially from November to February when temperatures can drop to 15-20 C at night. The rainy season runs from June to October with lush green landscapes. Best visited November to February for comfortable temperatures and clear skies.',
    nl: 'Noord-Thailand (Chiang Mai, Chiang Rai, Pai, Lampang) geniet van een koeler klimaat dan de rest van het land, vooral van november tot februari wanneer de temperatuur \'s nachts kan dalen tot 15-20 graden. Het regenseizoen loopt van juni tot oktober met weelderige groene landschappen. Het beste te bezoeken van november tot februari voor comfortabele temperaturen en heldere luchten.',
  },
  central: {
    en: 'Central Thailand (Bangkok, Ayutthaya, Kanchanaburi, Hua Hin) has a tropical climate with three seasons: hot (March-May), rainy (June-October), and cool (November-February). The cool season offers the most pleasant weather with lower humidity and temperatures around 25-30 C. Bangkok can be visited year-round but the hot season can be intense.',
    nl: 'Centraal-Thailand (Bangkok, Ayutthaya, Kanchanaburi, Hua Hin) heeft een tropisch klimaat met drie seizoenen: heet (maart-mei), regen (juni-oktober) en koel (november-februari). Het koele seizoen biedt het aangenaamste weer met lagere vochtigheid en temperaturen rond 25-30 graden. Bangkok kan het hele jaar door bezocht worden, maar het hete seizoen kan intens zijn.',
  },
  southern: {
    en: 'Southern Thailand has two distinct coasts with different weather patterns. The Andaman coast (Phuket, Krabi) is best from November to March. The Gulf coast (Koh Samui, Surat Thani) has its driest months from January to April. The monsoon season hits the Andaman side from May to October and the Gulf side from October to December.',
    nl: 'Zuid-Thailand heeft twee verschillende kusten met verschillende weerpatronen. De Andamankust (Phuket, Krabi) is het best van november tot maart. De Golfkust (Koh Samui, Surat Thani) heeft de droogste maanden van januari tot april. Het moessonseizoen treft de Andamankant van mei tot oktober en de Golfkant van oktober tot december.',
  },
  isaan: {
    en: 'Isaan (Northeast Thailand) including Khon Kaen, Udon Thani, and Nong Khai, has a continental climate with distinct dry and wet seasons. The cool season (November-February) is very pleasant with temperatures around 20-28 C. The hot season (March-May) brings temperatures over 35 C. The rainy season (June-October) sees heavy but usually short downpours.',
    nl: 'Isaan (Noordoost-Thailand), inclusief Khon Kaen, Udon Thani en Nong Khai, heeft een continentaal klimaat met duidelijke droge en natte seizoenen. Het koele seizoen (november-februari) is zeer aangenaam met temperaturen rond 20-28 graden. Het hete seizoen (maart-mei) brengt temperaturen boven 35 graden. Het regenseizoen (juni-oktober) kent zware maar meestal korte buien.',
  },
};

const regionBestMonths: Record<string, BilingualText> = {
  northern: {
    en: 'Best: November - February. Avoid: April - May (extreme heat).',
    nl: 'Beste: november - februari. Vermijden: april - mei (extreme hitte).',
  },
  central: {
    en: 'Best: November - February. Avoid: April (hottest month).',
    nl: 'Beste: november - februari. Vermijden: april (warmste maand).',
  },
  southern: {
    en: 'Andaman coast best: November - March. Gulf coast best: January - April.',
    nl: 'Andamankust best: november - maart. Golfkust best: januari - april.',
  },
  isaan: {
    en: 'Best: November - February. Avoid: March - May (extreme heat, 35 C+).',
    nl: 'Beste: november - februari. Vermijden: maart - mei (extreme hitte, 35+).',
  },
};

const faqItems = [
  {
    q: {
      en: 'What is the best month to visit Thailand overall?',
      nl: 'Wat is de beste maand om Thailand te bezoeken in het algemeen?',
    },
    a: {
      en: 'December and January are generally the best months to visit most of Thailand. The cool season is in full swing with comfortable temperatures (25-30 C), low rainfall, and lower humidity. This is peak tourist season though, so expect higher prices and larger crowds, especially around Christmas and New Year.',
      nl: 'December en januari zijn over het algemeen de beste maanden om het grootste deel van Thailand te bezoeken. Het koele seizoen is dan in volle gang met comfortabele temperaturen (25-30 graden), weinig neerslag en lagere luchtvochtigheid. Dit is wel het piek toeristenseizoen, dus verwacht hogere prijzen en meer drukte, vooral rond Kerst en Nieuwjaar.',
    },
  },
  {
    q: {
      en: 'Can I visit Thailand during the rainy season?',
      nl: 'Kan ik Thailand bezoeken tijdens het regenseizoen?',
    },
    a: {
      en: 'Yes, travelling during the rainy season (June-October) is absolutely possible and has advantages: lower prices, fewer tourists, and lush green scenery. Rain typically falls in short, heavy bursts — often in the afternoon — leaving plenty of sunshine. The Gulf coast (Koh Samui) avoids the worst rains until October-December, making it a good rainy season alternative.',
      nl: 'Ja, reizen tijdens het regenseizoen (juni-oktober) is zeker mogelijk en heeft voordelen: lagere prijzen, minder toeristen en weelderig groen landschap. Regen valt meestal in korte, hevige buien — vaak in de middag — waardoor er nog volop zon is. De Golfkust (Koh Samui) ontwijkt de zwaarste regenval tot oktober-december, wat het een goed alternatief maakt voor het regenseizoen.',
    },
  },
  {
    q: {
      en: 'How does weather differ between northern and southern Thailand?',
      nl: 'Hoe verschilt het weer tussen Noord- en Zuid-Thailand?',
    },
    a: {
      en: 'Northern Thailand (Chiang Mai, Chiang Rai) has more pronounced seasons: genuinely cool winters (15-20 C at night) and very hot summers (38 C+). Southern Thailand stays warm year-round (27-33 C) but has two monsoon patterns — the Andaman coast (west) gets rain May-October, while the Gulf coast (east) gets rain October-December. This means you can almost always find sunny weather somewhere in the south.',
      nl: 'Noord-Thailand (Chiang Mai, Chiang Rai) heeft meer uitgesproken seizoenen: echt koele winters (15-20 graden \'s nachts) en zeer hete zomers (38+). Zuid-Thailand blijft het hele jaar warm (27-33 graden) maar heeft twee moessonpatronen — de Andamankust (west) krijgt regen van mei-oktober, terwijl de Golfkust (oost) regen krijgt van oktober-december. Dit betekent dat je bijna altijd ergens in het zuiden zonnig weer kunt vinden.',
    },
  },
];

export default function BestTimePage({ data }: BestTimePageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Index', href: '/thailand-index/' },
    {
      name: lang === 'nl' ? 'Beste Reistijd' : 'Best Time',
      href: '/thailand-index/best-time/',
    },
  ];

  // All cities with weather data, sorted by comfort score
  const citiesWithWeather = useMemo(
    () =>
      data.cities
        .filter((c) => c.weather && c.weather.month_scores)
        .sort((a, b) => b.weather.comfort_score - a.weather.comfort_score),
    [data.cities]
  );

  // Per-region breakdown (only cities with weather data)
  const regionBreakdowns = useMemo(() => {
    return data.regions.map((region) => {
      const slugSet = new Set(region.city_slugs);
      const regionCities = citiesWithWeather.filter((c) => slugSet.has(c.slug));
      return {
        region,
        cities: regionCities,
        description: regionDescriptions[region.slug],
        bestMonths: regionBestMonths[region.slug],
      };
    }).filter((rb) => rb.cities.length > 0);
  }, [data.regions, citiesWithWeather]);

  // All cities for the weather links grid (sorted alphabetically)
  const allCitiesSorted = useMemo(
    () =>
      [...data.cities].sort((a, b) =>
        t(a.name, lang).localeCompare(t(b.name, lang))
      ),
    [data.cities, lang]
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

  return (
    <>
      <SEOHead
        title={
          lang === 'nl'
            ? 'Beste Reistijd Thailand 2026: Seizoensgids per Regio'
            : 'Best Time to Visit Thailand 2026: Season Guide by Region'
        }
        description={
          lang === 'nl'
            ? 'Ontdek de beste maanden om Thailand te bezoeken per regio en stad. Maandelijkse comfortscores, regenseizoen en klimaatdata voor 2026.'
            : 'Discover the best months to visit Thailand by region and city. Monthly comfort scores, rainy season, and climate data for 2026.'
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 to-surface-dark" />
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
                ? 'Beste Reistijd Thailand 2026'
                : 'Best Time to Visit Thailand 2026'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              {lang === 'nl'
                ? 'Seizoensgids per regio — comfortscores per maand voor elke bestemming'
                : 'Season guide by region — comfort scores per month for every destination'}
            </p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Full MonthMatrix */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
              {lang === 'nl'
                ? 'Comfortscores per Maand — Alle Bestemmingen'
                : 'Comfort Scores by Month — All Destinations'}
            </h2>
            <p className="text-gray-500 mb-6">
              {lang === 'nl'
                ? 'Gebaseerd op temperatuur, neerslag en luchtvochtigheidsdata. Gesorteerd op totaal comfortscore.'
                : 'Based on temperature, rainfall, and humidity data. Sorted by overall comfort score.'}
            </p>
            {citiesWithWeather.length > 0 ? (
              <MonthMatrix cities={citiesWithWeather} />
            ) : (
              <p className="text-gray-400 italic">
                {lang === 'nl'
                  ? 'Geen gedetailleerde weerdata beschikbaar.'
                  : 'No detailed weather data available.'}
              </p>
            )}
            <p className="mt-4 text-xs text-gray-400">
              {lang === 'nl'
                ? `${citiesWithWeather.length} van ${data.metadata.city_count} steden hebben gedetailleerde maandelijkse weerdata. Overige steden tonen regionaal gemiddelden op hun stadspagina.`
                : `${citiesWithWeather.length} of ${data.metadata.city_count} cities have detailed monthly weather data. Remaining cities show regional averages on their city page.`}
            </p>
          </section>

          {/* Per-region breakdown */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
              {lang === 'nl'
                ? 'Seizoensgids per Regio'
                : 'Season Guide by Region'}
            </h2>
            <div className="space-y-12">
              {regionBreakdowns.map(({ region, cities, description, bestMonths }) => (
                <div key={region.slug} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                    {t(region.name, lang)}
                  </h3>
                  {description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {t(description, lang)}
                    </p>
                  )}
                  {bestMonths && (
                    <p className="text-sm font-semibold text-thailand-blue mb-6 bg-thailand-blue/5 rounded-lg px-4 py-2 inline-block">
                      {t(bestMonths, lang)}
                    </p>
                  )}
                  {cities.length > 0 && (
                    <MonthMatrix cities={cities} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <p className="section-label">FAQ</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
              {lang === 'nl' ? 'Veelgestelde Vragen over Reistijd' : 'Best Time FAQ'}
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

          {/* City weather links */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
              {lang === 'nl'
                ? 'Weer per Stad'
                : 'Weather by City'}
            </h2>
            <p className="text-gray-500 mb-6">
              {lang === 'nl'
                ? 'Bekijk gedetailleerde weerinfo en de beste reistijd per stad.'
                : 'View detailed weather info and best time to visit for each city.'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {allCitiesSorted.map((city) => (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}/best-time-to-visit/`}
                  className="bg-white rounded-xl px-4 py-3 text-sm font-medium text-thailand-blue hover:text-thailand-red hover:shadow-md transition-all text-center border border-gray-100"
                >
                  {t(city.name, lang)}
                </Link>
              ))}
            </div>
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require('../../data/thailand-index.json');
  return {
    props: { data },
    revalidate: 604800,
  };
};
