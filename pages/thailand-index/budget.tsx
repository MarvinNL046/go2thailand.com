import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { ThailandIndex, BilingualText, IndexCity } from '../../lib/thailand-index';
import {
  formatBudgetMedian,
  formatBudgetRange,
  getBudgetMedian,
  getBudgetSortValue,
  summarizeRegionBudgets,
} from '../../lib/thailand-index-budget';
import { RankingCard } from '../../components/index';

interface BudgetPageProps {
  data: ThailandIndex;
}

function t(obj: BilingualText, locale: string): string {
  return obj[(locale as keyof BilingualText)] || obj.en;
}

const faqItems = [
  {
    q: {
      en: 'What is the cheapest city in Thailand for travellers?',
      nl: 'Wat is de goedkoopste stad in Thailand voor reizigers?',
    },
    a: {
      en: 'Bueng Kan and Nong Khai in the Isaan region are currently the cheapest destinations at around $19 per day for budget travellers. These northeastern cities offer authentic Thai experiences at a fraction of the cost of tourist hotspots like Phuket or Bangkok.',
      nl: 'Bueng Kan en Nong Khai in de Isaan-regio zijn momenteel de goedkoopste bestemmingen, rond $19 per dag voor budgetreizigers. Deze noordoostelijke steden bieden authentieke Thaise ervaringen voor een fractie van de kosten van toeristische trekpleisters als Phuket of Bangkok.',
    },
  },
  {
    q: {
      en: 'How much should I budget per day in Thailand?',
      nl: 'Hoeveel budget moet ik per dag rekenen in Thailand?',
    },
    a: {
      en: 'It depends on your travel style and destination. Budget travellers can get by on $19-40/day (hostels, street food, local transport). Mid-range travellers should plan $40-100/day (3-star hotels, restaurants, occasional tours). Luxury travellers can expect $100-200+/day (resorts, fine dining, private transfers). The Isaan region and smaller cities are significantly cheaper than popular tourist destinations.',
      nl: 'Het hangt af van je reisstijl en bestemming. Budgetreizigers kunnen rondkomen met $19-40/dag (hostels, straateten, lokaal vervoer). Middenklasse reizigers moeten $40-100/dag plannen (3-sterrenhotels, restaurants, af en toe tours). Luxe reizigers kunnen rekenen op $100-200+/dag (resorts, fine dining, privevervoer). De Isaan-regio en kleinere steden zijn aanzienlijk goedkoper dan populaire toeristische bestemmingen.',
    },
  },
  {
    q: {
      en: 'Is Thailand still cheap in 2026?',
      nl: 'Is Thailand nog steeds goedkoop in 2026?',
    },
    a: {
      en: 'Yes, Thailand remains one of the most affordable destinations in Southeast Asia. While prices have risen in popular tourist areas like Phuket and Bangkok, many destinations — especially in the Isaan region and northern Thailand — still offer excellent value. Budget travellers can comfortably spend under $25/day in multiple cities.',
      nl: 'Ja, Thailand blijft een van de meest betaalbare bestemmingen in Zuidoost-Azie. Hoewel de prijzen zijn gestegen in populaire toeristische gebieden als Phuket en Bangkok, bieden veel bestemmingen — vooral in de Isaan-regio en Noord-Thailand — nog steeds uitstekende waarde. Budgetreizigers kunnen comfortabel onder de $25/dag verblijven in meerdere steden.',
    },
  },
];

export default function BudgetPage({ data }: BudgetPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Index', href: '/thailand-index/' },
    {
      name: lang === 'nl' ? 'Budget' : 'Budget',
      href: '/thailand-index/budget/',
    },
  ];

  // Sort cities by budget median ascending
  const citiesByBudget = useMemo(
    () => [...data.cities].sort((a, b) => getBudgetSortValue(a) - getBudgetSortValue(b)),
    [data.cities]
  );

  const cheapestTop10 = data.rankings.cheapest.items.slice(0, 10);
  const expensiveTop10 = data.rankings.most_expensive.items.slice(0, 10);

  // Average budget per region
  const regionBudgets = useMemo(() => {
    return data.regions.map((region) => {
      const slugSet = new Set(region.city_slugs);
      const regionCities = data.cities.filter((c) => slugSet.has(c.slug));
      const summary = summarizeRegionBudgets(regionCities);
      return {
        ...region,
        ...summary,
      };
    }).sort((a, b) => {
      const aValue = a.avgBudget ?? Number.POSITIVE_INFINITY;
      const bValue = b.avgBudget ?? Number.POSITIVE_INFINITY;
      return aValue - bValue;
    });
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
            ? 'Thailand Budget Index 2026: Dagelijkse Kosten voor 33 Bestemmingen'
            : 'Thailand Budget Index 2026: Daily Costs for 33 Destinations'
        }
        description={
          lang === 'nl'
            ? 'Vergelijk dagelijkse kosten voor 33 Thaise steden. Budget, middenklasse en luxe prijzen per dag. Vind de goedkoopste bestemming in Thailand.'
            : 'Compare daily costs for 33 Thai cities. Budget, mid-range, and luxury prices per day. Find the cheapest destination in Thailand.'
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/80 to-surface-dark" />
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
                ? 'Thailand Budget Index 2026'
                : 'Thailand Budget Index 2026'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              {lang === 'nl'
                ? 'Dagelijkse kosten voor 33 bestemmingen — van backpacker tot luxe'
                : 'Daily costs for 33 destinations — from backpacker to luxury'}
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
          {/* Full budget table */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
              {lang === 'nl'
                ? 'Alle 33 Bestemmingen op Budget'
                : 'All 33 Destinations by Budget'}
            </h2>
            <p className="text-gray-500 mb-6">
              {lang === 'nl'
                ? 'Gesorteerd van goedkoopst naar duurste (budget dagprijs in USD).'
                : 'Sorted from cheapest to most expensive (budget daily rate in USD).'}
            </p>

            {/* Mobile: cards */}
            <div className="md:hidden space-y-3">
              {citiesByBudget.map((city, idx) => (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}/`}
                  className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 font-medium text-sm w-6">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-thailand-blue">
                        {t(city.name, lang)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {city.region ? t(city.region.name, lang) : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm mt-2">
                    <div>
                      <div className="text-gray-400 text-xs">Budget</div>
                      <div className="font-semibold text-green-700">
                        {formatBudgetMedian(city, 'budget')}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">{lang === 'nl' ? 'Midden' : 'Mid'}</div>
                      <div className="font-semibold text-gray-700">
                        {formatBudgetMedian(city, 'mid')}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Luxury</div>
                      <div className="font-semibold text-gray-700">
                        {formatBudgetMedian(city, 'luxury')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-cream border-b border-gray-200">
                    <th className="px-3 py-3 text-left font-semibold text-gray-500 w-12">#</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">
                      {lang === 'nl' ? 'Bestemming' : 'Destination'}
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">
                      {lang === 'nl' ? 'Regio' : 'Region'}
                    </th>
                    <th className="px-3 py-3 text-right font-semibold text-gray-700">
                      {lang === 'nl' ? 'Budget bereik' : 'Budget range'}
                    </th>
                    <th className="px-3 py-3 text-right font-semibold text-gray-700">
                      {lang === 'nl' ? 'Midden' : 'Mid-range'}
                    </th>
                    <th className="px-3 py-3 text-right font-semibold text-gray-700">
                      Luxury
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {citiesByBudget.map((city, idx) => (
                    <tr
                      key={city.slug}
                      className="border-b border-gray-100 hover:bg-surface-cream/50 transition-colors"
                    >
                      <td className="px-3 py-3 text-gray-400 font-medium">{idx + 1}</td>
                      <td className="px-3 py-3">
                        <Link
                          href={`/city/${city.slug}/`}
                          className="font-semibold text-thailand-blue hover:text-thailand-red transition-colors"
                        >
                          {t(city.name, lang)}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-gray-500 text-xs">
                        {city.region ? t(city.region.name, lang) : ''}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <span className="font-semibold text-green-700">
                          {formatBudgetRange(city, 'budget')}
                        </span>
                        {getBudgetMedian(city, 'budget') !== null && (
                          <span className="text-gray-400 text-xs ml-1">
                            ({lang === 'nl' ? 'med' : 'med'} {formatBudgetMedian(city, 'budget')})
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right font-medium text-gray-700">
                        {formatBudgetMedian(city, 'mid')}
                      </td>
                      <td className="px-3 py-3 text-right font-medium text-gray-700">
                        {formatBudgetMedian(city, 'luxury')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              {lang === 'nl'
                ? 'Alle prijzen in USD per persoon per dag. Schattingen op basis van actuele data (maart 2026).'
                : 'All prices in USD per person per day. Estimates based on current data (March 2026).'}
            </p>
          </section>

          {/* Top 10 cheapest + Top 10 most expensive */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
              {lang === 'nl'
                ? 'Goedkoopst vs Duurste'
                : 'Cheapest vs Most Expensive'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold font-heading text-green-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-sm font-bold">$</span>
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
              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold font-heading text-red-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-red-200 text-red-700 flex items-center justify-center text-sm font-bold">$$$</span>
                  {lang === 'nl' ? 'Top 10 Duurste' : 'Top 10 Most Expensive'}
                </h3>
                <div className="space-y-3">
                  {expensiveTop10.map((item) => (
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
          </section>

          {/* Budget per region */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
              {lang === 'nl'
                ? 'Gemiddeld Budget per Regio'
                : 'Average Budget by Region'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {regionBudgets.map((region) => (
                <div
                  key={region.slug}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="font-bold font-heading text-gray-900 mb-1">
                    {t(region.name, lang)}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    {region.cityCount} {lang === 'nl' ? 'steden met budgetdata' : 'cities with budget data'}
                  </p>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Budget</dt>
                      <dd className="font-semibold text-green-700">
                        {region.avgBudget === null ? 'N/A' : `$${region.avgBudget}/day`}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">{lang === 'nl' ? 'Midden' : 'Mid-range'}</dt>
                      <dd className="font-semibold text-gray-700">
                        {region.avgMid === null ? 'N/A' : `$${region.avgMid}/day`}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Luxury</dt>
                      <dd className="font-semibold text-gray-700">
                        {region.avgLuxury === null ? 'N/A' : `$${region.avgLuxury}/day`}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <p className="section-label">FAQ</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">
              {lang === 'nl' ? 'Veelgestelde Vragen over Budget' : 'Budget FAQ'}
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
    revalidate: 86400,
  };
};
