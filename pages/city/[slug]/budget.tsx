import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';
import SEOHead from '../../../components/SEOHead';

interface BudgetTier {
  min: number;
  max: number;
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
}

interface CityBudgetPageProps {
  city: City;
  budgetGuide: BudgetGuide | null;
  budgetReality: BudgetReality | null;
  budgetInfo: BudgetInfo | null;
}

export default function CityBudgetPage({ city, budgetGuide, budgetReality, budgetInfo }: CityBudgetPageProps) {
  if (!city) return <div>City not found</div>;

  const breadcrumbs = generateBreadcrumbs(city, 'budget');
  const baseMetadata = generateCityMetadata(city, 'budget');

  const metadata = {
    ...baseMetadata,
    title: `Cost of Travel in ${city.name.en} 2026 — Daily Budget Guide`,
    description: `How much does ${city.name.en} cost per day? Budget breakdown from $${budgetGuide?.budget?.min || 20}/day to $${budgetGuide?.luxury?.max || 400}+/day. Money-saving tips, daily costs, and realistic travel budgets for 2026.`,
  };

  // Generic money-saving tips as fallback
  const genericTips = [
    'Eat at local street food stalls and markets instead of tourist restaurants',
    'Use public transportation or rent a scooter instead of taxis',
    'Visit temples and parks which are often free or low-cost',
    'Book accommodation in advance for better rates, especially during peak season',
    'Drink water from refill stations or buy large bottles from 7-Eleven',
    'Negotiate prices at markets but always do so respectfully',
  ];

  const moneySavingTips = budgetReality?.money_saving_tricks && budgetReality.money_saving_tricks.length > 0
    ? budgetReality.money_saving_tricks
    : genericTips;

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
      >
        <meta name="keywords" content={`${city.name.en} cost, ${city.name.en} budget, how much does ${city.name.en} cost, ${city.name.en} daily budget, ${city.name.en} travel cost 2026`} />
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
                      ? `Budget travelers can expect to spend $${budgetGuide.budget.min}-${budgetGuide.budget.max} per day, mid-range travelers $${budgetGuide.midrange.min}-${budgetGuide.midrange.max} per day, and luxury travelers $${budgetGuide.luxury.min}-${budgetGuide.luxury.max}+ per day in ${city.name.en}.`
                      : `Daily costs in ${city.name.en} vary by travel style. Budget travelers typically spend $20-40/day, mid-range $50-100/day, and luxury $150+/day.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `Is ${city.name.en} expensive for tourists?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${city.name.en} offers excellent value for money compared to Western destinations. Street food meals cost $1-3, local transport is affordable, and accommodation starts from $10-15/night for budget options.`
                  }
                }
              ]
            })
          }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How Much Does {city.name.en} Cost?
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A realistic daily budget guide for {city.name.en}, Thailand — updated for 2026 with actual prices and money-saving tips.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {budgetGuide ? (
              <div className="space-y-12">

                {/* Budget Overview Cards */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Daily Budget Overview
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Budget Card */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Budget</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                          ${budgetGuide.budget.min}-${budgetGuide.budget.max}
                        </p>
                        <p className="text-sm text-green-700 font-medium">per day</p>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {budgetGuide.budget.description}
                      </p>
                    </div>

                    {/* Mid-Range Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-blue-800">Mid-Range</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                          ${budgetGuide.midrange.min}-${budgetGuide.midrange.max}
                        </p>
                        <p className="text-sm text-blue-700 font-medium">per day</p>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {budgetGuide.midrange.description}
                      </p>
                    </div>

                    {/* Luxury Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-amber-50 border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-purple-800">Luxury</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                          ${budgetGuide.luxury.min}-${budgetGuide.luxury.max}
                        </p>
                        <p className="text-sm text-purple-700 font-medium">per day</p>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {budgetGuide.luxury.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily Cost Breakdown */}
                {budgetReality?.daily_costs && Object.keys(budgetReality.daily_costs).length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                      Daily Cost Breakdown
                    </h2>
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(budgetReality.daily_costs).map(([item, cost], index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700 font-medium capitalize">
                              {item.replace(/_/g, ' ')}
                            </span>
                            <span className="text-gray-900 font-semibold">{cost}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Real Price Examples */}
                {budgetReality?.examples && budgetReality.examples.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                      Real Prices in {city.name.en}
                    </h2>
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {budgetReality.examples.map((example, index) => {
                          const parts = example.split(':');
                          const label = parts[0];
                          const value = parts.slice(1).join(':');
                          return (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-700">{label}</span>
                              {value && <span className="text-gray-900 font-semibold">{value.trim()}</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Money-Saving Tips */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Money-Saving Tips for {city.name.en}
                  </h2>
                  <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <ul className="space-y-4">
                      {moneySavingTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
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
                {budgetReality?.where_to_splurge && budgetReality.where_to_splurge.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                      Where to Splurge in {city.name.en}
                    </h2>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 md:p-8">
                      <p className="text-gray-600 mb-6 text-center">
                        Some experiences in {city.name.en} are worth spending a little extra on. Here are our top picks.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {budgetReality.where_to_splurge.map((item, index) => (
                          <div key={index} className="flex items-start bg-white bg-opacity-70 rounded-lg p-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
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
                {budgetReality?.hidden_costs && budgetReality.hidden_costs.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                      Hidden Costs to Watch For
                    </h2>
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 md:p-8">
                      <p className="text-gray-600 mb-6 text-center">
                        Be aware of these common unexpected expenses when visiting {city.name.en}.
                      </p>
                      <ul className="space-y-3">
                        {budgetReality.hidden_costs.map((cost, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
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

                {/* TripcomWidget */}
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Find the Best Deals in {city.name.en}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Compare prices on hotels, flights, and activities to stretch your budget further.
                  </p>
                  <TripcomWidget city={city.name.en} type="hotels" />
                </div>

              </div>
            ) : (
              /* Fallback when no budget guide data */
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Budget Information Coming Soon
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We're working on adding a detailed budget guide for {city.name.en}. Check back soon for daily cost breakdowns, money-saving tips, and more.
                  </p>
                  <Link href={`/city/${city.slug}/`} className="btn-primary">
                    ← Back to {city.name.en}
                  </Link>
                </div>
              </div>
            )}

            {/* Book Your Stay - Affiliate Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-12 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Book Your Stay in {city.name.en}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Compare prices across top booking platforms and find the best deal for your budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search on Trip.com
                </a>
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Search on Booking.com
                </a>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                We may earn a commission when you book through our links, at no extra cost to you. This helps us keep the site running.
              </p>
            </div>

            {/* Explore More */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Explore More of {city.name.en}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hotels & Stay</h4>
                    <p className="text-gray-600 text-sm">Find accommodation</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/food/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Food & Dining</h4>
                    <p className="text-gray-600 text-sm">Discover local cuisine</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/attractions/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Attractions</h4>
                    <p className="text-gray-600 text-sm">See top attractions</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCityStaticPaths();
  return { paths, fallback: 'blocking' };
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const rawCity = getCityBySlug(slug);

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

  // Serialize city data for props (only what we need)
  const serializedCity = {
    id: city.id,
    slug: city.slug,
    name: city.name,
    region: city.region,
    province: city.province,
    image: city.image,
    categories: city.categories,
  };

  return {
    props: {
      city: serializedCity,
      budgetGuide,
      budgetReality,
      budgetInfo,
    },
    revalidate: 86400,
  };
};
