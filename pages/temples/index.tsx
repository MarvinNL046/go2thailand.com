import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
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

const filterLabels: Record<CityFilter, string> = {
  all: 'All Temples',
  bangkok: 'Bangkok',
  'chiang-mai': 'Chiang Mai',
  'chiang-rai': 'Chiang Rai',
  other: 'Other Cities',
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
  const [activeFilter, setActiveFilter] = useState<CityFilter>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Temples', href: '/temples/' },
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
        title="Thailand Temples — Complete Hub Guide to 16 Sacred Sites (2026)"
        description={meta.meta_description}
      >
        <meta
          name="keywords"
          content="Thailand temples, Wat Pho, Wat Arun, White Temple, Blue Temple, Doi Suthep, Bangkok temples, Chiang Mai temples, Thai temple guide 2026"
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
                Sacred Sites of Thailand
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Thailand Temples
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Your complete hub to Thailand&#39;s most impressive temples — ancient ruins, gilded chedis, and contemporary masterpieces
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {temples.length} temples
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {uniqueCitiesCount} cities
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {freeCount} free entry
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  Updated Mar 2026
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
                  {filterLabels[key]}
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
                <p className="text-xl">No temples found for this filter.</p>
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
                              Free
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
                          Full guide &#8594;
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
            <p className="section-label text-center">Good to Know</p>
            <h2 className="section-title text-center mb-8">
              Temple Etiquette &amp; Practical Tips
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
                Start Planning
              </p>
              <h2 className="text-3xl font-bold font-heading mb-3">
                Book Temple Tours &amp; Activities
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Skip the queues with guided temple tours, private day trips, and
                cultural experiences across Thailand
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a
                href="https://klook.tpo.lv/7Dt6WApj?subid=temples"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                <span>Klook — Temple Tours &amp; Day Trips</span>
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
                <span>GetYourGuide — Cultural Experiences</span>
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
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">Explore More</p>
            <h2 className="section-title text-center mb-10">
              Related Guides &amp; Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

              <Link
                href="/thailand-temples/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#9965;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Thailand Temples List
                </h3>
                <p className="text-gray-600 text-sm">
                  Ranked list of all 16 temples with entry fees, hours, and key facts on a single page.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  See the list &#8594;
                </span>
              </Link>

              <Link
                href="/city/bangkok/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127751;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Bangkok City Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  Home to Wat Pho, Wat Arun, and the Grand Palace — Bangkok has the highest concentration of must-see temples.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Explore Bangkok &#8594;
                </span>
              </Link>

              <Link
                href="/city/chiang-mai/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#9968;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Chiang Mai City Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  The temple capital of Northern Thailand — Doi Suthep, Wat Chedi Luang, and over 300 temples in the old city.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Explore Chiang Mai &#8594;
                </span>
              </Link>

              <Link
                href="/thailand-travel-guide/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127988;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Thailand Travel Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  Everything you need before your first trip — visas, costs, transport, and cultural tips.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Read the guide &#8594;
                </span>
              </Link>

              <Link
                href="/best-places-to-visit-thailand/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127759;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Best Places to Visit
                </h3>
                <p className="text-gray-600 text-sm">
                  33 destinations ranked by popularity, budget, and season — find the right fit for your trip.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Browse destinations &#8594;
                </span>
              </Link>

              <Link
                href="/food/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127836;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Thai Food Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover Thailand&#39;s street food culture — must-try dishes, food markets, and where to eat near temple districts.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Explore Thai food &#8594;
                </span>
              </Link>

              <Link
                href="/transport/"
                className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all sm:col-span-2 lg:col-span-1"
              >
                <div className="text-3xl mb-3">&#128652;</div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Getting Around Thailand
                </h3>
                <p className="text-gray-600 text-sm">
                  Buses, trains, and flights between temple cities — plan your route from Bangkok to Chiang Mai to Chiang Rai.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  See transport options &#8594;
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
