import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
import CitySupportSources from '../../../components/CitySupportSources';

interface BudgetTier {
  min?: number;
  max?: number;
  description: string;
}

interface BudgetGuide {
  budget: BudgetTier;
  midrange: BudgetTier;
  luxury: BudgetTier;
}

interface BudgetReality {
  budget?: string;
  mid_range?: string;
  luxury?: string;
  daily_costs?: Record<string, string>;
  examples?: string[];
  money_saving_tricks?: string[];
  where_to_splurge?: string[];
  hidden_costs?: string[];
}

interface BudgetInfo {
  budget?: string;
  mid_range?: string;
  luxury?: string;
  notes?: string;
  daily_budget?: {
    budget: string;
    mid: string;
    luxury: string;
  };
}

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  categories: {
    food: { en: string; nl: string };
    hotels: { en: string; nl: string };
    attractions: { en: string; nl: string };
  };
  contentSources?: any[];
  reviewed_by?: string;
  reviewed_at?: string;
  enhanced_at?: string;
  editorialPositioning?: string;
  sourceSummary?: string;
}

interface CityBudgetPageProps {
  city: City;
  budgetGuide: BudgetGuide | null;
  budgetReality: BudgetReality | null;
  budgetInfo: BudgetInfo | null;
}

function stripMoneyMentions(text: string | undefined | null): string {
  if (!text) return '';

  return text
    .replace(/\([^)]*(?:\$|THB|baht|USD|EUR)[^)]*\)/gi, '')
    .replace(/\b\d+(?:-\d+)?\s*(?:THB|baht|USD|EUR|dollars?)\b/gi, '')
    .replace(/\$\d+(?:-\d+)?(?:\+)?(?:\/day|\/night)?/gi, '')
    .replace(/\b\d+(?:-\d+)?\b(?=\s*(?:per day|per night))/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .trim();
}

export default function CityBudgetPage({ city, budgetGuide, budgetReality, budgetInfo }: CityBudgetPageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  if (!city) return <div>{isNl ? 'Stad niet gevonden' : 'City not found'}</div>;

  const cityName = city.name[lang] || city.name.en;
  const breadcrumbs = generateBreadcrumbs(city, 'budget');
  const baseMetadata = generateCityMetadata(city, 'budget');

  const metadata = {
    ...baseMetadata,
    title: isNl
      ? `Reiskosten in ${cityName} 2026 — Dagelijks Budget Gids`
      : `Cost of Travel in ${cityName} 2026 — Daily Budget Guide`,
    description: isNl
      ? `Een praktische budgetgids voor ${cityName}, inclusief dagelijkse uitgavenpatronen, kostenaandachtspunten en slimmere manieren om transport, hotels en maaltijden te plannen.`
      : `A practical budget guide for ${cityName}, including daily spending patterns, cost pressure points, and smarter ways to plan transport, hotels, and meals.`,
  };
  const budgetRealityObj = typeof budgetReality === 'object' && budgetReality !== null ? budgetReality : null;
  const budgetRealityText = stripMoneyMentions(typeof budgetReality === 'string' ? budgetReality : budgetInfo?.notes || '');
  const dailyBudgetInfo = budgetInfo?.daily_budget || null;
  const hasBudgetContent = Boolean(budgetGuide || dailyBudgetInfo || budgetRealityText || budgetRealityObj);
  const cleanedBudgetDescriptions = budgetGuide
    ? {
        budget: stripMoneyMentions(budgetGuide.budget.description) || 'Guesthouses, simple local meals, public transport, and selective paid sights.',
        midrange: stripMoneyMentions(budgetGuide.midrange.description) || 'Comfortable hotels, a broader restaurant mix, and more paid attractions or short rides.',
        luxury: stripMoneyMentions(budgetGuide.luxury.description) || 'High-end hotels, destination dining, and flexible transport choices.',
      }
    : null;

  // Generic money-saving tips as fallback
  const genericTips = isNl ? [
    'Eet bij lokale straateettentjes en markten in plaats van toeristenrestaurants',
    'Gebruik het openbaar vervoer of huur een scooter in plaats van taxi\'s',
    'Bezoek tempels en parken die vaak gratis of goedkoop zijn',
    'Boek accommodatie van tevoren voor betere prijzen, vooral tijdens het hoogseizoen',
    'Drink water van hervulstations of koop grote flessen bij 7-Eleven',
    'Onderhandel over prijzen op markten, maar doe dit altijd respectvol',
  ] : [
    'Eat at local street food stalls and markets instead of tourist restaurants',
    'Use public transportation or rent a scooter instead of taxis',
    'Visit temples and parks which are often free or low-cost',
    'Book accommodation in advance for better rates, especially during peak season',
    'Drink water from refill stations or buy large bottles from 7-Eleven',
    'Negotiate prices at markets but always do so respectfully',
  ];

  const moneySavingTips = budgetRealityObj?.money_saving_tricks && budgetRealityObj.money_saving_tricks.length > 0
    ? budgetRealityObj.money_saving_tricks.map((tip) => stripMoneyMentions(tip)).filter(Boolean)
    : genericTips;

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
      >
        <meta name="robots" content="noindex, follow" />
        <meta name="keywords" content={isNl
          ? `${cityName} kosten, ${cityName} budget, hoeveel kost ${cityName}, ${cityName} dagelijks budget, ${cityName} reiskosten 2026`
          : `${cityName} cost, ${cityName} budget, how much does ${cityName} cost, ${cityName} daily budget, ${cityName} travel cost 2026`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `How much does ${city.name.en} cost per day?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": budgetGuide
                      ? `Daily costs in ${city.name.en} usually fall into budget-friendly, mid-range, or comfort-first patterns depending on hotel choice, transport habits, and how much of the trip is built around premium meals or private outings.`
                      : dailyBudgetInfo
                        ? `Daily costs in ${city.name.en} depend mostly on hotel choice, transport decisions, and how much time you spend on longer outings or sit-down dining.`
                        : `Daily costs in ${city.name.en} vary mainly with hotel choice, transport, and how much of the trip is built around day trips or premium stays.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `Is ${city.name.en} expensive for tourists?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${city.name.en} is usually easier to manage on a modest budget than major resort destinations, but costs rise quickly when you add private transport, premium rooms, or longer side trips.`
                  }
                }
              ]
            })
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? `Hoeveel Kost ${cityName}?` : `How Much Does ${cityName} Cost?`}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isNl
                  ? `Een praktische gids voor dagelijkse uitgaven in ${cityName}, inclusief waar kosten laag blijven en waar ze het snelst stijgen.`
                  : `A practical guide to daily spending in ${cityName}, including where costs usually stay low and where they rise fastest.`}
              </p>
            </div>
          </div>
        </section>

        {(city.contentSources?.length || city.reviewed_by || city.reviewed_at || city.enhanced_at || city.editorialPositioning || city.sourceSummary) && (
          <section className="section-padding pt-8">
            <div className="container-custom">
              <CitySupportSources
                cityName={cityName}
                contentSources={city.contentSources}
                reviewedBy={city.reviewed_by}
                reviewedAt={city.reviewed_at}
                enhancedAt={city.enhanced_at}
                editorialPositioning={city.editorialPositioning}
                sourceSummary={city.sourceSummary}
              />
            </div>
          </section>
        )}

        <section className="section-padding">
          <div className="container-custom">
            {hasBudgetContent ? (
              <div className="space-y-12">

                {/* Budget Overview Cards */}
                {(budgetGuide || dailyBudgetInfo) && (
                <div>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                    {isNl ? 'Dagelijks Budget Overzicht' : 'Daily Budget Overview'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Budget Card */}
                    <div className="bg-white border-0 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-xl mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold font-heading text-green-800">Budget</h3>
                        <p className="text-2xl font-bold text-green-600 mt-2">
                          {budgetGuide
                            ? (isNl ? 'Lagere dagelijkse uitgaven' : 'Lower daily spend')
                            : (isNl ? 'Budget stijl' : 'Budget style')}
                        </p>
                        <p className="text-sm text-green-700 font-medium">{budgetGuide
                          ? (isNl ? 'Ideaal voor eenvoudige planning' : 'Best for simpler planning')
                          : (isNl ? 'reisstijl' : 'travel style')}</p>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {cleanedBudgetDescriptions ? cleanedBudgetDescriptions.budget : 'Use this as a rough planning lane rather than a quoted rate.'}
                      </p>
                    </div>

                    {/* Mid-Range Card */}
                    <div className="bg-white border-0 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold font-heading text-blue-800">{isNl ? 'Midden Klasse' : 'Mid-Range'}</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-2">
                          {budgetGuide
                            ? (isNl ? 'Gebalanceerde dagelijkse uitgaven' : 'Balanced daily spend')
                            : (isNl ? 'Midden klasse stijl' : 'Mid-range style')}
                        </p>
                        <p className="text-sm text-blue-700 font-medium">{budgetGuide
                          ? (isNl ? 'Goede balans tussen comfort en waarde' : 'Good balance of comfort and value')
                          : (isNl ? 'reisstijl' : 'travel style')}</p>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {cleanedBudgetDescriptions ? cleanedBudgetDescriptions.midrange : 'Use this as a rough planning lane rather than a quoted rate.'}
                      </p>
                    </div>

                    {/* Luxury Card */}
                    <div className="bg-white border-0 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-thailand-red rounded-xl mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold font-heading text-purple-800">{budgetGuide
                          ? (isNl ? 'Luxe' : 'Luxury')
                          : (isNl ? 'Hogere Uitgaven' : 'Higher Spend')}</h3>
                        <p className="text-2xl font-bold text-purple-600 mt-2">
                          {budgetGuide
                            ? (isNl ? 'Hoger comfort uitgaven' : 'Higher-comfort spend')
                            : (isNl ? 'Hogere Uitgaven' : 'Higher Spend')}
                        </p>
                        <p className="text-sm text-purple-700 font-medium">{budgetGuide
                          ? (isNl ? 'Meer ruimte voor premium keuzes' : 'More room for premium choices')
                          : (isNl ? 'reisstijl' : 'travel style')}</p>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {cleanedBudgetDescriptions ? cleanedBudgetDescriptions.luxury : 'Use this as a rough planning lane rather than a quoted rate.'}
                      </p>
                    </div>
                  </div>
                </div>
                )}

                {budgetRealityText && (
                  <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
                      {isNl ? `Kosten Realiteit in ${cityName}` : `Cost Reality in ${cityName}`}
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                      {budgetRealityText}
                    </p>
                  </div>
                )}

                {/* Money-Saving Tips */}
                <div>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                    {isNl ? `Bespaartips voor ${cityName}` : `Money-Saving Tips for ${cityName}`}
                  </h2>
                  <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                    <ul className="space-y-4">
                      {moneySavingTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-4 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Where to Splurge */}
                {budgetRealityObj?.where_to_splurge && budgetRealityObj.where_to_splurge.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                      {isNl ? `Waar Uitpakken in ${cityName}` : `Where to Splurge in ${cityName}`}
                    </h2>
                    <div className="bg-surface-cream border-0 rounded-2xl p-6 md:p-8">
                      <p className="text-gray-600 mb-6 text-center">
                        {isNl
                          ? `Sommige ervaringen in ${cityName} zijn het waard om iets extra's aan uit te geven. Dit zijn de belangrijkste gebieden om te overwegen.`
                          : `Some experiences in ${cityName} are worth spending a little extra on. Here are the main areas to consider.`}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {budgetRealityObj.where_to_splurge.map((item, index) => (
                          <div key={index} className="flex items-start bg-white bg-opacity-70 rounded-lg p-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center mr-3 mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hidden Costs */}
                {budgetRealityObj?.hidden_costs && budgetRealityObj.hidden_costs.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                      {isNl ? 'Verborgen Kosten om Op te Letten' : 'Hidden Costs to Watch For'}
                    </h2>
                    <div className="bg-surface-cream border-0 rounded-2xl p-6 md:p-8">
                      <p className="text-gray-600 mb-6 text-center">
                        {isNl
                          ? `Let op deze veelvoorkomende onverwachte kosten bij een bezoek aan ${cityName}.`
                          : `Be aware of these common unexpected expenses when visiting ${cityName}.`}
                      </p>
                      <ul className="space-y-3">
                        {budgetRealityObj.hidden_costs.map((cost, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-xl flex items-center justify-center mr-3 mt-0.5">
                              <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-700 leading-relaxed">{cost}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* Fallback when no budget guide data */
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                    {isNl ? `${cityName} Budget Gids` : `${cityName} Budget Guide`}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {isNl
                      ? `Een gedetailleerde budgetoverzicht voor ${cityName} wordt voorbereid. Bekijk ons stadsoverzicht voor algemene reiskosten en tips.`
                      : `A detailed budget breakdown for ${cityName} is being prepared. Browse our city overview for general travel costs and tips.`}
                  </p>
                  <Link href={`/city/${city.slug}/`} className="btn-primary">
                    {isNl ? `← Terug naar ${cityName}` : `← Back to ${cityName}`}
                  </Link>
                </div>
              </div>
            )}

            {/* Related Guides */}
            <div className="bg-white rounded-2xl shadow-md p-8 mt-12 mb-8">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4 text-center">
                {isNl ? `Gerelateerde Gidsen voor ${cityName}` : `Related Guides for ${cityName}`}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {isNl
                  ? 'Gebruik deze interne gidsen om te vergelijken waar het geld doorgaans naartoe gaat op zo\'n reis.'
                  : 'Use these internal guides to compare where money typically goes on a trip like this.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/city/${city.slug}/hotels/`}
                  className="inline-flex items-center justify-center px-8 py-3 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors"
                >
                  {isNl ? 'Vergelijk Hotelgebieden' : 'Compare Hotel Areas'}
                </Link>
                <Link
                  href={`/city/${city.slug}/food/`}
                  className="inline-flex items-center justify-center px-8 py-3 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors"
                >
                  {isNl ? 'Vergelijk Eetgelegenheden' : 'Compare Dining Choices'}
                </Link>
              </div>
            </div>

            {/* Explore More */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
                {isNl ? `Ontdek Meer van ${cityName}` : `Explore More of ${cityName}`}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{isNl ? 'Hotels & Verblijf' : 'Hotels & Stay'}</h4>
                    <p className="text-gray-600 text-sm">{isNl ? 'Vind accommodatie' : 'Find accommodation'}</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/food/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{isNl ? 'Eten & Restaurants' : 'Food & Dining'}</h4>
                    <p className="text-gray-600 text-sm">{isNl ? 'Ontdek de lokale keuken' : 'Discover local cuisine'}</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/attractions/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{isNl ? 'Bezienswaardigheden' : 'Attractions'}</h4>
                    <p className="text-gray-600 text-sm">{isNl ? 'Bekijk top bezienswaardigheden' : 'See top attractions'}</p>
                  </div>
                </Link>
              </div>
            <CityExploreMore citySlug={city.slug} cityName={cityName} currentPage="budget" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

// Recursively resolve {en, nl} bilingual objects to plain strings.
function flattenBilingual(data: any): any {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(item => flattenBilingual(item));
  const keys = Object.keys(data);
  if (keys.includes('en') && keys.every(k => k.length <= 3)) {
    return data.en || '';
  }
  const result: any = {};
  for (const key of keys) {
    result[key] = flattenBilingual(data[key]);
  }
  return result;
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const rawCity = getCityBySlug(slug, locale);

  if (!rawCity) {
    return { notFound: true };
  }

  // Flatten bilingual objects to strings
  const city = flattenBilingual(rawCity);
  // Restore bilingual fields needed by the template
  city.name = rawCity.name;
  if (rawCity.categories) city.categories = rawCity.categories;

  // Extract budget data
  const budgetGuide = (rawCity as any).budgetGuide
    ? flattenBilingual((rawCity as any).budgetGuide)
    : null;

  const budgetReality = (rawCity as any).budget_reality
    ? flattenBilingual((rawCity as any).budget_reality)
    : null;

  const budgetInfo = (rawCity as any).budget_info
    ? flattenBilingual((rawCity as any).budget_info)
    : null;

  const sanitizedBudgetGuide = budgetGuide
    ? {
        budget: { description: budgetGuide.budget.description },
        midrange: { description: budgetGuide.midrange.description },
        luxury: { description: budgetGuide.luxury.description },
      }
    : null;

  const sanitizedBudgetReality = budgetReality
    ? Object.fromEntries(
        Object.entries({
          budget: budgetReality.budget,
          mid_range: budgetReality.mid_range,
          luxury: budgetReality.luxury,
          money_saving_tricks: budgetReality.money_saving_tricks,
          where_to_splurge: budgetReality.where_to_splurge,
          hidden_costs: budgetReality.hidden_costs,
        }).filter(([, value]) => value !== undefined)
      )
    : null;

  const sanitizedBudgetInfo = budgetInfo
    ? (budgetInfo.notes !== undefined ? { notes: budgetInfo.notes } : null)
    : null;

  // Serialize city data for props (only what we need)
  const serializedCity = {
    id: city.id,
    slug: city.slug,
    name: city.name,
    region: city.region,
    province: city.province,
    image: city.image,
    categories: city.categories,
    contentSources: (rawCity as any).contentSources || (rawCity as any).content_sources || [],
    reviewed_by: (rawCity as any).reviewed_by ?? null,
    reviewed_at: (rawCity as any).reviewed_at ?? null,
    enhanced_at: (rawCity as any).enhanced_at ?? null,
    editorialPositioning: (rawCity as any).editorialPositioning ?? null,
    sourceSummary: (rawCity as any).sourceSummary ?? null,
    recommendedAlternatives: (rawCity as any).recommendedAlternatives ?? null,
  };

  return {
    props: {
      city: serializedCity,
      budgetGuide: sanitizedBudgetGuide,
      budgetReality: sanitizedBudgetReality,
      budgetInfo: sanitizedBudgetInfo,
    },
    revalidate: 604800,
  };
};
