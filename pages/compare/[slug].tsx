import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import { getAllComparisons, getComparisonPair, getComparisonBySlug, getComparisonsForItem } from '../../lib/comparisons';
import { getIslandBySlug } from '../../lib/islands';
import { getCityBySlug } from '../../lib/cities';

const SITE_URL = 'https://go2-thailand.com';
const TRANSLATED_LOCALES = ['en', 'nl'];

// ---- Type definitions ----

interface Island {
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  description: { en: string; nl: string };
  beaches: Array<{ name: string; description: { en: string; nl: string }; best_for: string[] }>;
  activities: Array<{ name: string; type: string; description: { en: string; nl: string }; price_range: string }>;
  getting_there: { from_bangkok: { options: Array<{ method: string; duration: string; price: string; description: { en: string; nl: string } }> } };
  accommodation_tips: { areas: Array<{ name: string; description: { en: string; nl: string }; price_range: string }> };
  budget_info: { daily_budget: { budget: string; mid: string; luxury: string }; currency_tips: { en: string; nl: string } };
  best_time_to_visit: { high_season: string; shoulder: string; low_season: string; avoid: string; description: { en: string; nl: string } };
  highlights: string[];
  tags: string[];
  seo: { metaTitle: { en: string; nl: string }; metaDescription: { en: string; nl: string } };
}

interface City {
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  description: { en: string; nl: string };
  highlights: string[];
  tags: string[];
  population?: number;
  budget_info?: { daily_budget?: { budget: string; mid: string; luxury: string } };
  best_time_to_visit?: { season?: string; weather?: string; reasons?: string };
  seo: { metaTitle: { en: string; nl: string }; metaDescription: { en: string; nl: string } };
}

interface ComparisonCategory {
  name: string;
  icon: string;
  winner: string;
  item1_score: number;
  item2_score: number;
  item1_text: { en: string; nl: string };
  item2_text: { en: string; nl: string };
}

interface ComparisonFaq {
  question: { en: string; nl: string };
  answer: { en: string; nl: string };
}

interface ComparisonData {
  slug: string;
  type: 'island' | 'city';
  summary: { en: string; nl: string };
  verdict: { en: string; nl: string };
  categories: ComparisonCategory[];
  faq: ComparisonFaq[];
  sources: string[];
}

interface ComparisonPageProps {
  item1: Island | City;
  item2: Island | City;
  comparisonType: 'island' | 'city';
  enrichedData: ComparisonData | null;
  relatedComparisons1: string[];
  relatedComparisons2: string[];
  slug: string;
}

// ---- Helper utilities ----

function isIsland(item: Island | City, type: 'island' | 'city'): item is Island {
  return type === 'island';
}

function formatSlugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getRelatedComparisonName(compSlug: string, lang: 'en' | 'nl'): string {
  // Convert "koh-samui-vs-koh-phangan" to "Koh Samui vs Koh Phangan"
  const parts = compSlug.split('-vs-');
  if (parts.length === 2) {
    return `${formatSlugToName(parts[0])} vs ${formatSlugToName(parts[1])}`;
  }
  return formatSlugToName(compSlug);
}

// ---- Score bar component ----

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, score * 10))}%` }}
      />
    </div>
  );
}

// ---- Translations ----

const translations = {
  en: {
    island: 'Island',
    city: 'City',
    whichThai: (typeLabel: string, name1: string, name2: string) =>
      `${name1} vs ${name2} (2026) — Which Thai ${typeLabel} Is Better?`,
    metaDescriptionFallback: (name1: string, name2: string, type: string) =>
      `Compare ${name1} and ${name2} side by side. Find out which Thai ${type} suits your travel style, budget, and interests best.`,
    whichShouldYouChoose: (type: string) =>
      `Which Thai ${type} should you choose in 2026?`,
    ourVerdict: 'Our Verdict',
    keyComparison: (name1: string, name2: string) =>
      `${name1} vs ${name2}: Key Comparison`,
    category: 'Category',
    beaches: 'Beaches',
    activities: 'Activities',
    budgetPerDay: 'Budget / day',
    bestSeason: 'Best Season',
    region: 'Region',
    province: 'Province',
    tags: 'Tags',
    highlights: 'Highlights',
    categoryBreakdown: 'Category Breakdown',
    winner: 'Winner:',
    frequentlyAskedQuestions: 'Frequently Asked Questions',
    bookYourTrip: 'Book Your Trip',
    stayIn: (name: string) => `Stay in ${name}`,
    affiliateDisclaimer: 'Affiliate links — we may earn a commission at no extra cost to you.',
    moreComparisons: 'More Comparisons',
    learnMore: 'Learn More',
    fullGuide: (name: string) => `Full Guide: ${name}`,
    compare: 'Compare',
  },
  nl: {
    island: 'Eiland',
    city: 'Stad',
    whichThai: (typeLabel: string, name1: string, name2: string) =>
      `${name1} vs ${name2} (2026) — Welk Thais ${typeLabel} is Beter?`,
    metaDescriptionFallback: (name1: string, name2: string, type: string) =>
      `Vergelijk ${name1} en ${name2} zij aan zij. Ontdek welk Thais ${type} het beste past bij jouw reistijl, budget en interesses.`,
    whichShouldYouChoose: (type: string) =>
      `Welk Thais ${type} moet je kiezen in 2026?`,
    ourVerdict: 'Ons Oordeel',
    keyComparison: (name1: string, name2: string) =>
      `${name1} vs ${name2}: Vergelijking`,
    category: 'Categorie',
    beaches: 'Stranden',
    activities: 'Activiteiten',
    budgetPerDay: 'Budget / dag',
    bestSeason: 'Beste Seizoen',
    region: 'Regio',
    province: 'Provincie',
    tags: 'Tags',
    highlights: 'Hoogtepunten',
    categoryBreakdown: 'Score per Categorie',
    winner: 'Winnaar:',
    frequentlyAskedQuestions: 'Veelgestelde Vragen',
    bookYourTrip: 'Boek je Reis',
    stayIn: (name: string) => `Verblijf in ${name}`,
    affiliateDisclaimer: 'Affiliate links — we kunnen een commissie verdienen zonder extra kosten voor jou.',
    moreComparisons: 'Meer Vergelijkingen',
    learnMore: 'Meer Informatie',
    fullGuide: (name: string) => `Complete Gids: ${name}`,
    compare: 'Vergelijken',
  },
};

// ---- Main page component ----

export default function ComparisonPage({
  item1,
  item2,
  comparisonType,
  enrichedData,
  relatedComparisons1,
  relatedComparisons2,
  slug,
}: ComparisonPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const isTranslated = TRANSLATED_LOCALES.includes(locale || 'en');
  const t = translations[lang];

  const item1Name = item1.name[lang];
  const item2Name = item2.name[lang];
  const typeLabel = comparisonType === 'island' ? t.island : t.city;

  const pageTitle = t.whichThai(typeLabel, item1Name, item2Name);

  const metaDescription = enrichedData
    ? enrichedData.verdict[lang].slice(0, 155) + (enrichedData.verdict[lang].length > 155 ? '...' : '')
    : t.metaDescriptionFallback(item1Name, item2Name, comparisonType);

  const pageUrl = `https://go2-thailand.com/compare/${slug}/`;

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: t.compare, href: '/compare/' },
    { name: `${item1Name} vs ${item2Name}`, href: `/compare/${slug}/` },
  ];

  // Build unique related comparisons list (deduplicated, max 8)
  const allRelated = [...new Set([...relatedComparisons1, ...relatedComparisons2])].filter(s => s !== slug).slice(0, 8);

  // JSON-LD: FAQPage (only when FAQ data exists)
  const faqJsonLd = enrichedData && enrichedData.faq && enrichedData.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: enrichedData.faq.map(item => ({
          '@type': 'Question',
          name: item.question[lang],
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer[lang],
          },
        })),
      }
    : null;

  // Island-specific table rows
  const renderIslandTableRows = () => {
    const i1 = item1 as Island;
    const i2 = item2 as Island;
    return (
      <>
        <TableRow
          label={t.beaches}
          val1={String(i1.beaches?.length ?? 0)}
          val2={String(i2.beaches?.length ?? 0)}
          numericCompare
        />
        <TableRow
          label={t.activities}
          val1={String(i1.activities?.length ?? 0)}
          val2={String(i2.activities?.length ?? 0)}
          numericCompare
        />
        <TableRow
          label={t.budgetPerDay}
          val1={i1.budget_info?.daily_budget?.budget ?? '-'}
          val2={i2.budget_info?.daily_budget?.budget ?? '-'}
        />
        <TableRow
          label={t.bestSeason}
          val1={i1.best_time_to_visit?.high_season ?? '-'}
          val2={i2.best_time_to_visit?.high_season ?? '-'}
        />
        <TableRow label={t.region} val1={i1.region} val2={i2.region} />
        <TableRow label={t.province} val1={i1.province} val2={i2.province} />
        <TableRow
          label={t.tags}
          val1={i1.tags?.slice(0, 3).join(', ') ?? '-'}
          val2={i2.tags?.slice(0, 3).join(', ') ?? '-'}
        />
      </>
    );
  };

  // City-specific table rows
  const renderCityTableRows = () => {
    const c1 = item1 as City;
    const c2 = item2 as City;
    return (
      <>
        <TableRow label={t.region} val1={c1.region} val2={c2.region} />
        <TableRow label={t.province} val1={c1.province} val2={c2.province} />
        <TableRow
          label={t.highlights}
          val1={String(c1.highlights?.length ?? 0)}
          val2={String(c2.highlights?.length ?? 0)}
          numericCompare
        />
        <TableRow
          label={t.budgetPerDay}
          val1={c1.budget_info?.daily_budget?.budget ?? '-'}
          val2={c2.budget_info?.daily_budget?.budget ?? '-'}
        />
        <TableRow
          label={t.tags}
          val1={c1.tags?.slice(0, 3).join(', ') ?? '-'}
          val2={c2.tags?.slice(0, 3).join(', ') ?? '-'}
        />
      </>
    );
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={metaDescription}
      >
        <meta property="og:type" content="website" />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
      </SEOHead>
      {/* Override canonical for non-translated locales to point to EN */}
      {!isTranslated && (
        <Head>
          <link key="canonical" rel="canonical" href={`${SITE_URL}/compare/${slug}/`} />
        </Head>
      )}

      <div className="bg-gray-50 min-h-screen">

        {/* Hero */}
        <section className="bg-gradient-to-r from-thailand-blue to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs (white on dark) */}
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="inline-flex items-center">
                    {index > 0 && (
                      <svg className="w-5 h-5 text-blue-300 mx-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-blue-200 text-sm">{crumb.name}</span>
                    ) : (
                      <Link href={crumb.href} className="text-white hover:text-blue-200 text-sm transition-colors">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* VS layout */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="flex-1">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3">
                  {item1.region}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">{item1Name}</h1>
              </div>

              <div className="flex-shrink-0">
                <div className="bg-white text-thailand-blue text-3xl font-black w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                  VS
                </div>
              </div>

              <div className="flex-1">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3">
                  {item2.region}
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold">{item2Name}</h2>
              </div>
            </div>

            <p className="text-center text-blue-100 mt-6 text-lg">
              {t.whichShouldYouChoose(comparisonType)}
            </p>
          </div>
        </section>

        {/* Breadcrumbs component (for JSON-LD) — hidden visually, already rendered in hero */}
        <div className="hidden">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Quick verdict */}
          {enrichedData && (
            <section className="mb-10">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0"></div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-900 mb-2">{t.ourVerdict}</h2>
                    <p className="text-blue-800 leading-relaxed">{enrichedData.verdict[lang]}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Summary */}
          {enrichedData?.summary && (
            <section className="mb-10">
              <p className="text-gray-700 text-lg leading-relaxed">{enrichedData.summary[lang]}</p>
            </section>
          )}

          {/* Side-by-side comparison table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t.keyComparison(item1Name, item2Name)}
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-thailand-blue text-white">
                <div className="p-4 font-bold text-lg text-center">{item1Name}</div>
                <div className="p-4 font-semibold text-center text-blue-100 text-sm uppercase tracking-wide border-x border-blue-500">
                  {t.category}
                </div>
                <div className="p-4 font-bold text-lg text-center">{item2Name}</div>
              </div>

              {/* Table rows */}
              <div className="divide-y divide-gray-100">
                {comparisonType === 'island' ? renderIslandTableRows() : renderCityTableRows()}
              </div>
            </div>
          </section>

          {/* Category scores */}
          {enrichedData && enrichedData.categories && enrichedData.categories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.categoryBreakdown}</h2>
              <div className="space-y-6">
                {enrichedData.categories.map((cat, idx) => {
                  const item1Wins = cat.winner === item1.slug;
                  const item2Wins = cat.winner === item2.slug;
                  return (
                    <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{cat.icon}</span>
                        <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
                        {(item1Wins || item2Wins) && (
                          <span className="ml-auto bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            {t.winner} {item1Wins ? item1Name : item2Name}
                          </span>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Item 1 */}
                        <div className={`rounded-lg p-4 ${item1Wins ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{item1Name}</span>
                            <span className="text-sm font-bold text-gray-600">{cat.item1_score}/10</span>
                          </div>
                          <ScoreBar score={cat.item1_score} color={item1Wins ? 'bg-green-500' : 'bg-blue-400'} />
                          <p className="text-sm text-gray-700 mt-3">{cat.item1_text[lang]}</p>
                        </div>

                        {/* Item 2 */}
                        <div className={`rounded-lg p-4 ${item2Wins ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{item2Name}</span>
                            <span className="text-sm font-bold text-gray-600">{cat.item2_score}/10</span>
                          </div>
                          <ScoreBar score={cat.item2_score} color={item2Wins ? 'bg-green-500' : 'bg-blue-400'} />
                          <p className="text-sm text-gray-700 mt-3">{cat.item2_text[lang]}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ */}
          {enrichedData && enrichedData.faq && enrichedData.faq.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t.frequentlyAskedQuestions}
              </h2>
              <div className="space-y-4">
                {enrichedData.faq.map((item, idx) => (
                  <details key={idx} className="bg-white rounded-xl shadow-md group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                      <h3 className="font-semibold text-gray-900 pr-4">{item.question[lang]}</h3>
                      <svg
                        className="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{item.answer[lang]}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Booking widgets */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t.bookYourTrip}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t.stayIn(item1Name)}
                </h3>
                <TripcomWidget
                  city={item1.name.en}
                  type="searchbox"
                  customTitle={`Hotels in ${item1.name.en}`}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t.stayIn(item2Name)}
                </h3>
                <TripcomWidget
                  city={item2.name.en}
                  type="searchbox"
                  customTitle={`Hotels in ${item2.name.en}`}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              {t.affiliateDisclaimer}
            </p>
          </section>

          {/* Related comparisons */}
          {allRelated.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t.moreComparisons}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allRelated.map(relSlug => (
                  <Link
                    key={relSlug}
                    href={`/compare/${relSlug}/`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100 hover:border-thailand-blue group"
                  >
                    <span className="text-sm font-medium text-gray-800 group-hover:text-thailand-blue transition-colors">
                      {getRelatedComparisonName(relSlug, lang)}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-thailand-blue mt-1 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Deep links back to individual pages */}
          <section className="mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t.learnMore}</h2>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${comparisonType === 'island' ? 'islands' : 'city'}/${item1.slug}/`}
                  className="inline-flex items-center gap-2 bg-thailand-blue text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t.fullGuide(item1Name)} &rarr;
                </Link>
                <Link
                  href={`/${comparisonType === 'island' ? 'islands' : 'city'}/${item2.slug}/`}
                  className="inline-flex items-center gap-2 bg-thailand-blue text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t.fullGuide(item2Name)} &rarr;
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

// ---- Table row helper component ----

function TableRow({
  label,
  val1,
  val2,
  numericCompare = false,
}: {
  label: string;
  val1: string;
  val2: string;
  numericCompare?: boolean;
}) {
  let item1Better = false;
  let item2Better = false;

  if (numericCompare) {
    const n1 = parseInt(val1, 10);
    const n2 = parseInt(val2, 10);
    if (!isNaN(n1) && !isNaN(n2)) {
      item1Better = n1 > n2;
      item2Better = n2 > n1;
    }
  }

  return (
    <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
      <div className={`p-4 text-center text-sm font-medium ${item1Better ? 'bg-green-50 text-green-800' : 'text-gray-700'}`}>
        {val1}
        {item1Better && <span className="ml-1 text-green-600">✓</span>}
      </div>
      <div className="p-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-x border-gray-100">
        {label}
      </div>
      <div className={`p-4 text-center text-sm font-medium ${item2Better ? 'bg-green-50 text-green-800' : 'text-gray-700'}`}>
        {val2}
        {item2Better && <span className="ml-1 text-green-600">✓</span>}
      </div>
    </div>
  );
}

// ---- Data fetching ----

export const getStaticPaths: GetStaticPaths = async () => {
  const comparisons = getAllComparisons();
  const paths = comparisons.map(c => ({ params: { slug: c.slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const pair = getComparisonPair(slug);
  if (!pair || !pair.type) {
    return { notFound: true };
  }

  const { item1Slug, item2Slug, type } = pair;

  let item1: Island | City | null = null;
  let item2: Island | City | null = null;

  if (type === 'island') {
    item1 = getIslandBySlug(item1Slug);
    item2 = getIslandBySlug(item2Slug);
  } else {
    item1 = getCityBySlug(item1Slug);
    item2 = getCityBySlug(item2Slug);
  }

  if (!item1 || !item2) {
    return { notFound: true };
  }

  const enrichedData = getComparisonBySlug(slug);

  const relatedComparisons1 = getComparisonsForItem(item1Slug, type).slice(0, 6);
  const relatedComparisons2 = getComparisonsForItem(item2Slug, type).slice(0, 6);

  return {
    props: {
      item1,
      item2,
      comparisonType: type,
      enrichedData: enrichedData ?? null,
      relatedComparisons1,
      relatedComparisons2,
      slug,
    },
    revalidate: 86400,
  };
};
