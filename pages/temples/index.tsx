import { useT } from '../../lib/i18n';
import { strings as i18nStrings } from '../../lib/i18n/temples-index';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllTemples, getTemplesPageMeta, Temple } from '../../lib/temples';

type CityFilter = 'all' | 'bangkok' | 'chiang-mai' | 'chiang-rai' | 'other';

interface PageMeta {
  title: string;
  meta_description: string;
  intro: string;
  tips: string[];
}

interface TemplesIndexProps {
  temples: Temple[];
  meta: PageMeta;
  uniqueCitiesCount: number;
  freeCount: number;
}

const filterLabels: Record<CityFilter, { en: string; nl: string }> = {
  all: { en: 'All Temples', nl: 'Alle Tempels' },
  bangkok: { en: 'Bangkok', nl: 'Bangkok' },
  'chiang-mai': { en: 'Chiang Mai', nl: 'Chiang Mai' },
  'chiang-rai': { en: 'Chiang Rai', nl: 'Chiang Rai' },
  other: { en: 'Other Cities', nl: 'Andere Steden' },
};

const MAIN_CITY_SLUGS: CityFilter[] = ['bangkok', 'chiang-mai', 'chiang-rai'];

function isFree(temple: Temple): boolean {
  return temple.entry_fee === 'Free' || temple.entry_fee === null;
}

function truncate(text: string, maxLen = 120): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

export default function TemplesIndexPage({
  temples,
  meta,
  uniqueCitiesCount,
  freeCount,
}: TemplesIndexProps) {
  const t = useT(i18nStrings);
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
  const [activeFilter, setActiveFilter] = useState<CityFilter>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Tempels' : 'Temples', href: '/temples/' },
  ];

  const filteredTemples = temples.filter((t) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'other') {
      return !MAIN_CITY_SLUGS.includes(t.city_slug as CityFilter);
    }
    return t.city_slug === activeFilter;
  });

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Thailand Temples — Complete Guide',
    numberOfItems: temples.length,
    itemListElement: temples.map((temple) => ({
      '@type': 'ListItem',
      position: temple.rank,
      name: temple.name,
      url: `https://go2-thailand.com/temples/${temple.slug}/`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://go2-thailand.com${item.href}`,
    })),
  };

  return (
    <>
      <SEOHead
        title={t("s001_thailand_temples_complete_hub")}
        description={meta.meta_description}
      >
        <meta
          name="keywords"
          content={t("s002_thailand_temples_wat_pho")}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([itemListSchema, breadcrumbSchema]),
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">

        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">
                {isNl ? 'Heilige Plaatsen van Thailand' : 'Sacred Sites of Thailand'}
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {isNl ? 'Thailand Tempels' : 'Thailand Temples'}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                {t("s003_your_complete_hub_to")}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {temples.length} {isNl ? 'tempels' : 'temples'}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {uniqueCitiesCount} {isNl ? 'steden' : 'cities'}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {freeCount} {isNl ? 'gratis toegang' : 'free entry'}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {isNl ? 'Bijgewerkt mrt 2026' : 'Updated Mar 2026'}
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

        {/* Intro */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-gray-700 leading-relaxed">{meta.intro}</p>
          </div>
        </section>

        {/* City Filter Bar */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {(Object.keys(filterLabels) as CityFilter[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  aria-pressed={activeFilter === key}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === key
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterLabels[key][lang]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Temple Cards Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTemples.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">{isNl ? 'Geen tempels gevonden voor dit filter.' : 'No temples found for this filter.'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemples.map((temple) => (
                  <article
                    key={temple.slug}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    {/* Card Header */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Rank + Badges row */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center justify-center bg-thailand-gold text-white w-8 h-8 rounded-full font-bold text-sm flex-shrink-0">
                          #{temple.rank}
                        </span>
                        <div className="flex items-center gap-2 ml-2 flex-wrap justify-end">
                          {/* Entry fee badge */}
                          {isFree(temple) ? (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                              {isNl ? 'Gratis' : 'Free'}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                              {temple.entry_fee}
                            </span>
                          )}
                          {/* Type badge */}
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium capitalize">
                            {temple.type}
                          </span>
                        </div>
                      </div>

                      {/* Temple name */}
                      <h2 className="text-lg font-bold font-heading text-gray-900 mb-1 leading-snug">
                        <Link
                          href={`/temples/${temple.slug}/`}
                          className="text-thailand-blue hover:underline"
                        >
                          {temple.name}
                        </Link>
                      </h2>

                      {/* City link */}
                      <p className="text-sm text-gray-500 mb-3">
                        <Link
                          href={`/city/${temple.city_slug}/`}
                          className="text-thailand-blue hover:underline font-medium"
                        >
                          {temple.city}
                        </Link>
                        {temple.opening_hours && (
                          <span className="ml-2 text-gray-400">
                            &middot; {temple.opening_hours}
                          </span>
                        )}
                      </p>

                      {/* Description truncated */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                        {truncate(temple.description, 130)}
                      </p>

                      {/* Key facts */}
                      {temple.key_facts && temple.key_facts.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {temple.key_facts.slice(0, 3).map((fact) => (
                            <span
                              key={fact}
                              className="px-2 py-0.5 bg-surface-cream text-gray-600 rounded-full text-xs"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer links */}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Link
                          href={`/temples/${temple.slug}/`}
                          className="text-thailand-blue text-sm font-medium hover:underline"
                        >
                          {isNl ? 'Volledige gids' : 'Full guide'} &#8594;
                        </Link>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            temple.google_maps_query
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-thailand-blue transition-colors"
                          aria-label={`View ${temple.name} on Google Maps`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Map
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">{isNl ? 'Goed om te Weten' : 'Good to Know'}</p>
            <h2 className="section-title text-center mb-8">
              {isNl ? 'Tempel Etiquette & Praktische Tips' : 'Temple Etiquette & Practical Tips'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {meta.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-surface-cream rounded-xl p-4"
                >
                  <span className="text-thailand-gold font-bold text-lg flex-shrink-0 mt-0.5">
                    {i + 1}.
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate CTA */}
        <section className="py-12 bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="font-script text-thailand-gold text-lg mb-2">
                {isNl ? 'Begin met Plannen' : 'Start Planning'}
              </p>
              <h2 className="text-3xl font-bold font-heading mb-3">
                {isNl ? 'Boek Tempelrondleidingen & Activiteiten' : 'Book Temple Tours & Activities'}
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                {isNl ? 'Sla de wachtrijen over met begeleide tempelrondleidingen, privédagtrips en culturele ervaringen door heel Thailand' : 'Skip the queues with guided temple tours, private day trips, and cultural experiences across Thailand'}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a
                href="https://klook.tpo.lv/7Dt6WApj?subid=temples"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                <span>{t("s004_klook_temple_tours_amp")}</span>
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a
                href="https://getyourguide.tpo.lv/GuAFfGGK?subid=temples"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                <span>{t("s005_getyourguide_cultural_experiences")}</span>
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
            <p className="text-white/60 text-xs text-center mt-6">
              {isNl ? 'Sommige links zijn affiliate links. We kunnen een commissie verdienen zonder extra kosten voor jou.' : 'Some links are affiliate links. We may earn a commission at no extra cost to you.'}
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">{isNl ? 'Ontdek Meer' : 'Explore More'}</p>
            <h2 className="section-title text-center mb-10">
              {isNl ? 'Gerelateerde Gidsen & Bestemmingen' : 'Related Guides & Destinations'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

              <Link
                href="/thailand-temples/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#9965;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {t("s006_thailand_temples_list")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("s007_ranked_list_of_all")}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {t("s008_see_the_list_8594")}
                </span>
              </Link>

              <Link
                href="/city/bangkok/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127751;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {t("s009_bangkok_city_guide")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("s010_home_to_wat_pho")}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {t("s011_explore_bangkok_8594")}
                </span>
              </Link>

              <Link
                href="/city/chiang-mai/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#9968;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {t("s012_chiang_mai_city_guide")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("s013_the_temple_capital_of")}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {t("s014_explore_chiang_mai_8594")}
                </span>
              </Link>

              <Link
                href="/thailand-travel-guide/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127988;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {t("s015_thailand_travel_guide")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("s016_everything_you_need_before")}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {t("s017_read_the_guide_8594")}
                </span>
              </Link>

              <Link
                href="/best-places-to-visit-thailand/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127759;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {t("s018_best_places_to_visit")}
                </h3>
                <p className="text-gray-600 text-sm">
                  33 destinations ranked by popularity, budget, and season — find the right fit for your trip.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {t("s019_browse_destinations_8594")}
                </span>
              </Link>

              <Link
                href="/food/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127836;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {t("s020_thai_food_guide")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("s021_discover_thailand_39_s")}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {t("s022_explore_thai_food_8594")}
                </span>
              </Link>

              <Link
                href="/transport/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all sm:col-span-2 lg:col-span-1"
              >
                <div className="text-3xl mb-3">&#128652;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {t("s023_getting_around_thailand")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("s024_buses_trains_and_flights")}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {t("s025_see_transport_options_8594")}
                </span>
              </Link>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const temples = getAllTemples();
  const meta = getTemplesPageMeta();

  const uniqueCitiesCount = new Set(temples.map((t) => t.city_slug)).size;
  const freeCount = temples.filter(isFree).length;

  return {
    props: {
      temples,
      meta: meta ?? {
        title: 'Thailand Temples',
        meta_description:
          'Guide to 16 must-visit temples across Thailand with entry fees, opening hours and key facts.',
        intro: 'Explore Thailand\'s most impressive temples across Bangkok, Chiang Mai, Chiang Rai and beyond.',
        tips: [],
      },
      uniqueCitiesCount,
      freeCount,
    },
    revalidate: 604800,
  };
};
