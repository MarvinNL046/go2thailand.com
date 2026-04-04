import { GetStaticProps } from 'next';
import Head from 'next/head';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import PreFooterAffiliateBanner from '../../components/PreFooterAffiliateBanner';
import { getAllComparisons, getPopularComparisons } from '../../lib/comparisons';

const SITE_URL = 'https://go2-thailand.com';
const TRANSLATED_LOCALES = ['en', 'nl'];

interface ComparisonName {
  en: string;
  nl: string;
}

interface Comparison {
  slug: string;
  item1: string;
  item2: string;
  type: 'island' | 'city';
  name1: ComparisonName;
  name2: ComparisonName;
}

interface CompareIndexProps {
  islandComparisons: Comparison[];
  cityComparisons: Comparison[];
  popularSlugs: string[];
}

const translations = {
  en: {
    pageTitle: 'Thailand Comparisons 2026 | Go2Thailand',
    metaDescription: 'Compare Thai islands and cities side by side. Koh Samui vs Koh Phangan, Bangkok vs Chiang Mai and 88 more detailed comparisons to help you choose.',
    heroH1: 'Thailand Destination Comparisons',
    heroSubtitle: (n: number) => `Compare ${n} Thai destinations side by side`,
    heroDescription: "Islands, cities and beach towns compared on beaches, nightlife, diving, family friendliness, budget and more — so you can pick the right destination for your trip.",
    popularComparisons: 'Popular Comparisons',
    mostSearched: 'The most searched Thailand destination comparisons',
    islandComparison: 'island comparison',
    cityComparison: 'city comparison',
    islandComparisons: 'Island Comparisons',
    islandCount: (n: number) => `${n} island-to-island comparisons`,
    cityComparisons: 'City Comparisons',
    cityCount: (n: number) => `${n} city-to-city comparisons`,
    howToChoose: 'How to Choose Your Thailand Destination',
    howToChooseP1: "Choosing between Thailand's many incredible destinations can be overwhelming. Each island and city offers a unique character — from the full-moon parties of Koh Phangan to the temples of Chiang Mai and the luxury resorts of Koh Samui.",
    islandVsIsland: 'Island vs Island',
    islandVsIslandP: "Thailand's islands span two coastlines: the Gulf of Thailand (Koh Samui, Koh Phangan, Koh Tao, Koh Chang) and the Andaman Sea (Koh Phi Phi, Koh Lanta, Koh Lipe). Each comparison dives into beach quality, diving conditions, nightlife, family suitability, and budget expectations to help you pick the right island.",
    cityVsCity: 'City vs City',
    cityVsCityP: "From Bangkok's urban energy to Chiang Mai's relaxed mountain culture, Thailand's cities each have a distinct personality. Our city comparisons cover food scene, cost of living, temples, nightlife, digital nomad suitability, and day trips.",
    readyToBook: 'Ready to Book Your Trip?',
    findBestDeals: 'Find the best deals on hotels, flights, and tours',
    affiliateDisclaimer: 'Some links are affiliate links. We may earn a commission at no extra cost to you.',
    compare: 'Compare',
    exploreMore: 'Explore More Thailand Guides',
    exploreMoreSubtitle: 'Everything you need to plan your perfect Thailand trip',
    weatherGuide: 'Weather Guide',
    weatherGuideDesc: 'Choose your destination by climate and season',
    travelIndex: 'Thailand Travel Index',
    travelIndexDesc: 'Compare cities by budget, weather, and transport',
    cityGuides: 'All City Guides',
    cityGuidesDesc: 'In-depth guides for 33 Thai cities',
    firstTimers: "First Timer's Guide",
    firstTimersDesc: 'Everything you need to know before your first trip',
    hotelGuides: 'Hotel Guides',
    hotelGuidesDesc: 'Find the best hotels in every destination',
    travelInsurance: 'Travel Insurance',
    travelInsuranceDesc: 'Stay protected on your Thailand adventure',
  },
  nl: {
    pageTitle: 'Thailand Vergelijkingen 2026 | Go2Thailand',
    metaDescription: 'Vergelijk Thaise eilanden en steden zij aan zij. Koh Samui vs Koh Phangan, Bangkok vs Chiang Mai en 88 meer gedetailleerde vergelijkingen om je te helpen kiezen.',
    heroH1: 'Thailand Bestemmingen Vergelijken',
    heroSubtitle: (n: number) => `Vergelijk ${n} Thaise bestemmingen zij aan zij`,
    heroDescription: "Eilanden, steden en strandplaatsen vergeleken op stranden, nachtleven, duiken, geschiktheid voor gezinnen, budget en meer — zodat je de juiste bestemming voor jouw reis kunt kiezen.",
    popularComparisons: 'Populaire Vergelijkingen',
    mostSearched: 'De meest gezochte Thailand bestemming vergelijkingen',
    islandComparison: 'eiland vergelijking',
    cityComparison: 'stad vergelijking',
    islandComparisons: 'Eiland Vergelijkingen',
    islandCount: (n: number) => `${n} eiland vergelijkingen`,
    cityComparisons: 'Stad Vergelijkingen',
    cityCount: (n: number) => `${n} stad vergelijkingen`,
    howToChoose: 'Hoe Kies je Jouw Thailand Bestemming',
    howToChooseP1: "Kiezen tussen de vele geweldige bestemmingen van Thailand kan overweldigend zijn. Elk eiland en elke stad heeft een uniek karakter — van de fullmoonfeesten van Koh Phangan tot de tempels van Chiang Mai en de luxe resorts van Koh Samui.",
    islandVsIsland: 'Eiland vs Eiland',
    islandVsIslandP: "De eilanden van Thailand strekken zich uit over twee kustlijnen: de Golf van Thailand (Koh Samui, Koh Phangan, Koh Tao, Koh Chang) en de Andamanese Zee (Koh Phi Phi, Koh Lanta, Koh Lipe). Elke vergelijking gaat dieper in op strandkwaliteit, duikomstandigheden, nachtleven, geschiktheid voor gezinnen en budgetverwachtingen om je te helpen het juiste eiland te kiezen.",
    cityVsCity: 'Stad vs Stad',
    cityVsCityP: "Van de stedelijke energie van Bangkok tot de ontspannen bergcultuur van Chiang Mai — de steden van Thailand hebben elk een eigen karakter. Onze stadsvergelijkingen behandelen het voedselscene, kosten van levensonderhoud, tempels, nachtleven, geschiktheid voor digitale nomaden en dagtrips.",
    readyToBook: 'Klaar om je Reis te Boeken?',
    findBestDeals: 'Vind de beste deals voor hotels, vluchten en tours',
    affiliateDisclaimer: 'Sommige links zijn affiliate links. We kunnen een commissie verdienen zonder extra kosten voor jou.',
    compare: 'Vergelijken',
    exploreMore: 'Meer Thailand Gidsen',
    exploreMoreSubtitle: 'Alles wat je nodig hebt voor je perfecte Thailand reis',
    weatherGuide: 'Weergids',
    weatherGuideDesc: 'Kies je bestemming op klimaat en seizoen',
    travelIndex: 'Thailand Reisindex',
    travelIndexDesc: 'Vergelijk steden op budget, weer en transport',
    cityGuides: 'Alle Stadsgidsen',
    cityGuidesDesc: 'Uitgebreide gidsen voor 33 Thaise steden',
    firstTimers: 'Gids voor Eerstebezoeker',
    firstTimersDesc: 'Alles wat je moet weten voor je eerste reis',
    hotelGuides: 'Hotelgidsen',
    hotelGuidesDesc: 'Vind de beste hotels op elke bestemming',
    travelInsurance: 'Reisverzekering',
    travelInsuranceDesc: 'Beschermd op reis door Thailand',
  },
};

export default function CompareIndexPage({ islandComparisons, cityComparisons, popularSlugs }: CompareIndexProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const t = translations[lang];

  const allComparisons = [...islandComparisons, ...cityComparisons];
  const popularComparisons = popularSlugs
    .map(slug => allComparisons.find(c => c.slug === slug))
    .filter((c): c is Comparison => c !== undefined);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: t.compare, href: '/compare/' }
  ];

  const totalCount = islandComparisons.length + cityComparisons.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": lang === 'nl' ? "Thailand Bestemmingen Vergelijkingen 2026" : "Thailand Destination Comparisons 2026",
    "description": lang === 'nl'
      ? `Vergelijk ${totalCount} Thaise bestemmingen zij aan zij. Eilanden en steden vergeleken om je te helpen de perfecte Thailand bestemming te kiezen.`
      : `Compare ${totalCount} Thai destinations side by side. Islands and cities compared to help you choose the perfect Thailand destination.`,
    "url": "https://go2-thailand.com/compare/",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `https://go2-thailand.com${crumb.href}`
      }))
    }
  };

  const { locale: currentLocale } = useRouter();
  const isTranslated = TRANSLATED_LOCALES.includes(currentLocale || 'en');

  return (
    <>
      <SEOHead
        title={t.pageTitle}
        description={t.metaDescription}
      >
        <meta
          name="keywords"
          content="Thailand comparisons, Koh Samui vs Koh Phangan, Bangkok vs Chiang Mai, Thailand islands comparison, Thailand cities comparison"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>
      {/* Override canonical and hreflang for non-translated locales */}
      {!isTranslated && (
        <Head>
          <link key="canonical" rel="canonical" href={`${SITE_URL}/compare/`} />
        </Head>
      )}

      <div className="bg-surface-cream min-h-screen">

        {/* Hero Section */}
        <section className="bg-surface-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
              {t.heroH1}
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto mb-3">
              {t.heroSubtitle(totalCount)}
            </p>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
              {t.heroDescription}
            </p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Popular Comparisons */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                {t.popularComparisons}
              </h2>
              <p className="text-gray-600">{t.mostSearched}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularComparisons.map(comparison => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}/`}
                  className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 border-thailand-red"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-gray-900">
                      {comparison.name1[lang]}
                    </span>
                    <span className="text-gray-400 font-bold mx-4 text-sm uppercase tracking-widest">
                      VS
                    </span>
                    <span className="font-bold text-lg text-gray-900">
                      {comparison.name2[lang]}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-xs font-medium text-thailand-blue bg-surface-cream px-2 py-1 rounded-full capitalize">
                      {comparison.type === 'island' ? t.islandComparison : t.cityComparison}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Island Comparisons */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                {t.islandComparisons}
              </h2>
              <p className="text-gray-600">{t.islandCount(islandComparisons.length)}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {islandComparisons.map(comparison => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}/`}
                  className="block bg-surface-cream rounded-2xl shadow-sm hover:shadow-md hover:bg-white transition-all p-4 border-0"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900 truncate">
                      {comparison.name1[lang]}
                    </span>
                    <span className="text-gray-400 text-xs mx-2 flex-shrink-0">vs</span>
                    <span className="font-medium text-gray-900 truncate text-right">
                      {comparison.name2[lang]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* City Comparisons */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                {t.cityComparisons}
              </h2>
              <p className="text-gray-600">{t.cityCount(cityComparisons.length)}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {cityComparisons.map(comparison => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}/`}
                  className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 border-0"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900 truncate">
                      {comparison.name1[lang]}
                    </span>
                    <span className="text-gray-400 text-xs mx-2 flex-shrink-0">vs</span>
                    <span className="font-medium text-gray-900 truncate text-right">
                      {comparison.name2[lang]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
              {t.howToChoose}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>{t.howToChooseP1}</p>
              <h3 className="text-xl font-semibold font-heading text-gray-900 mt-6 mb-3">{t.islandVsIsland}</h3>
              <p>{t.islandVsIslandP}</p>
              <h3 className="text-xl font-semibold font-heading text-gray-900 mt-6 mb-3">{t.cityVsCity}</h3>
              <p>{t.cityVsCityP}</p>
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                {t.exploreMore}
              </h2>
              <p className="text-gray-600">{t.exploreMoreSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/weather/"
                className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border-l-4 border-thailand-blue group"
              >
                <div className="text-2xl mb-2">🌤️</div>
                <div className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors">{t.weatherGuide}</div>
                <div className="text-sm text-gray-500 mt-1">{t.weatherGuideDesc}</div>
              </Link>
              <Link
                href="/thailand-index/"
                className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border-l-4 border-thailand-blue group"
              >
                <div className="text-2xl mb-2">📊</div>
                <div className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors">{t.travelIndex}</div>
                <div className="text-sm text-gray-500 mt-1">{t.travelIndexDesc}</div>
              </Link>
              <Link
                href="/city/"
                className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border-l-4 border-thailand-blue group"
              >
                <div className="text-2xl mb-2">🏙️</div>
                <div className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors">{t.cityGuides}</div>
                <div className="text-sm text-gray-500 mt-1">{t.cityGuidesDesc}</div>
              </Link>
              <Link
                href="/thailand-for-first-timers/"
                className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border-l-4 border-thailand-red group"
              >
                <div className="text-2xl mb-2">✈️</div>
                <div className="font-bold text-gray-900 group-hover:text-thailand-red transition-colors">{t.firstTimers}</div>
                <div className="text-sm text-gray-500 mt-1">{t.firstTimersDesc}</div>
              </Link>
              <Link
                href="/top-10/hotels/"
                className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border-l-4 border-thailand-red group"
              >
                <div className="text-2xl mb-2">🏨</div>
                <div className="font-bold text-gray-900 group-hover:text-thailand-red transition-colors">{t.hotelGuides}</div>
                <div className="text-sm text-gray-500 mt-1">{t.hotelGuidesDesc}</div>
              </Link>
              <Link
                href="/travel-insurance-thailand/"
                className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border-l-4 border-thailand-red group"
              >
                <div className="text-2xl mb-2">🛡️</div>
                <div className="font-bold text-gray-900 group-hover:text-thailand-red transition-colors">{t.travelInsurance}</div>
                <div className="text-sm text-gray-500 mt-1">{t.travelInsuranceDesc}</div>
              </Link>
            </div>
          </div>
        </section>

        <PreFooterAffiliateBanner
          title={t.readyToBook}
          description={t.findBestDeals}
          links={[
            { label: 'Booking.com', href: 'https://booking.tpo.lv/2PT1kR82' },
            { label: 'Trip.com', href: 'https://trip.tpo.lv/TmObooZ5' },
            { label: 'Tours & Activities', href: 'https://klook.tpo.lv/7Dt6WApj' },
            { label: 'eSIM', href: 'https://saily.tpo.lv/rf9lidnE' },
            { label: 'NordVPN', href: 'https://nordvpn.tpo.lv/ekHF1i55' },
            { label: 'NordPass', href: 'https://nordvpn.tpo.lv/tp12zNjC' },
          ]}
        />

      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allComparisons = getAllComparisons();
  const popularSlugs = getPopularComparisons();

  const islandComparisons = allComparisons.filter((c: Comparison) => c.type === 'island');
  const cityComparisons = allComparisons.filter((c: Comparison) => c.type === 'city');

  return {
    props: {
      islandComparisons,
      cityComparisons,
      popularSlugs
    },
    revalidate: 604800
  };
};
