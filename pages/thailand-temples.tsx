import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import TripcomWidget from '../components/TripcomWidget';

interface TempleData {
  rank: number;
  name: string;
  city: string;
  city_slug: string;
  entry_fee: string | null;
  opening_hours: string | null;
  description: string;
  key_facts: string[];
  type: string;
  google_maps_query: string;
}

interface PageData {
  title: string;
  meta_description: string;
  intro: string;
  items: TempleData[];
  tips: string[];
  generated_at: string;
}

interface ThailandTemplesProps {
  data: PageData;
}

type CityFilter = 'all' | 'bangkok' | 'chiang-mai' | 'chiang-rai' | 'ayutthaya' | 'other';

const faqItems = [
  {
    question: 'What should I wear when visiting temples in Thailand?',
    answer:
      'You must cover your shoulders and knees at all Thai temples. Long pants or a skirt below the knee and a shirt with sleeves are required. Avoid see-through clothing. Some popular temples provide sarongs or wraps at the entrance, but it is more reliable to bring your own. Shoes must be removed before entering any temple building — look for the pile of shoes at the door as your cue.'
  },
  {
    question: 'Are Thailand temples free to visit?',
    answer:
      'Many Thai temples are free to enter, especially smaller local ones. Major tourist temples charge an entrance fee ranging from 30 THB to 500 THB (about $1 to $15 USD). For example, Wat Pho in Bangkok costs 200 THB, while the Grand Palace (which includes Wat Phra Kaew) costs 500 THB. Temples outside major cities like Wat Suan Dok in Chiang Mai and the Blue Temple in Chiang Rai are free.'
  },
  {
    question: 'What is the best time of day to visit Thai temples?',
    answer:
      'Early morning (before 9am) is the best time to visit temples in Thailand. Temperatures are cooler, crowds are smaller, and you may witness monks performing morning alms or chanting rituals. Late afternoon (after 3pm) is also good for photography as the light softens. Avoid midday visits if possible — most temple grounds have limited shade and temperatures can exceed 35C.'
  }
];

export default function ThailandTemples({ data }: ThailandTemplesProps) {
  const [activeFilter, setActiveFilter] = useState<CityFilter>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Temples', href: '/thailand-temples/' }
  ];

  const filterLabels: Record<CityFilter, string> = {
    all: 'All Temples',
    bangkok: 'Bangkok',
    'chiang-mai': 'Chiang Mai',
    'chiang-rai': 'Chiang Rai',
    ayutthaya: 'Ayutthaya',
    other: 'Other Cities'
  };

  const otherCitySlugs = ['krabi', 'phuket', 'buriram', 'pattaya', 'pai'];

  const filterTemples = (temples: TempleData[]): TempleData[] => {
    if (activeFilter === 'all') return temples;
    if (activeFilter === 'other') {
      return temples.filter(t => otherCitySlugs.includes(t.city_slug));
    }
    return temples.filter(t => t.city_slug === activeFilter);
  };

  const filteredTemples = filterTemples(data.items);

  // Unique cities for stats
  const uniqueCities = Array.from(new Set(data.items.map((t: TempleData) => t.city)));
  const freeCount = data.items.filter(
    t => t.entry_fee === 'Free' || t.entry_fee === null
  ).length;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.title,
    numberOfItems: data.items.length,
    itemListElement: data.items.map(temple => ({
      '@type': 'ListItem',
      position: temple.rank,
      name: temple.name,
      url: `https://go2-thailand.com/city/${temple.city_slug}/`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://go2-thailand.com${item.href}`
    }))
  };

  const combinedSchema = [itemListSchema, faqSchema, breadcrumbSchema];

  return (
    <>
      <SEOHead
        title="Thailand Temples — 16 Must-Visit Sacred Sites (2026 Guide)"
        description={data.meta_description}
      >
        <meta
          name="keywords"
          content="Thailand temples, Wat Pho, Wat Arun, White Temple Chiang Rai, Thai temple etiquette, Bangkok temples, Chiang Mai temples, best temples Thailand"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">
                Sacred Sites of Thailand
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {data.title}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                A ranked guide to Thailand&#39;s most impressive temples — from
                ancient ruins to contemporary masterpieces
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {data.items.length} temples
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {uniqueCities.length} cities
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

        {/* Intro Text */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {data.intro}
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {(Object.keys(filterLabels) as CityFilter[]).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterLabels[category]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Temple Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTemples.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">No temples found for this filter.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredTemples.map(temple => (
                  <div key={temple.rank}>
                    <article className="bg-white rounded-2xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        {/* Header row */}
                        <div className="flex items-start gap-4 mb-4">
                          {/* Rank Badge */}
                          <div className="bg-thailand-gold text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                            #{temple.rank}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl md:text-2xl font-bold font-heading text-gray-900">
                              {temple.name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Link
                                href={`/city/${temple.city_slug}/`}
                                className="text-thailand-blue hover:underline text-sm font-medium"
                              >
                                {temple.city}
                              </Link>
                              <span className="text-gray-400 text-sm">
                                &#183; {temple.type}
                              </span>
                            </div>
                          </div>
                          {/* Entry Fee Badge */}
                          <div className="flex-shrink-0">
                            {temple.entry_fee === 'Free' || temple.entry_fee === null ? (
                              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                Free
                              </span>
                            ) : (
                              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                                {temple.entry_fee}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Opening Hours */}
                        {temple.opening_hours && (
                          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                            <svg
                              className="w-4 h-4 text-gray-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>{temple.opening_hours}</span>
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {temple.description}
                        </p>

                        {/* Key Facts Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {temple.key_facts.map(fact => (
                            <span
                              key={fact}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>

                        {/* Google Maps Link */}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(temple.google_maps_query)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-thailand-blue hover:underline font-medium"
                        >
                          <svg
                            className="w-4 h-4"
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
                          View on Google Maps
                        </a>
                      </div>
                    </article>

                    {/* Affiliate CTA after rank 5 */}
                    {temple.rank === 5 && (
                      <div className="bg-surface-dark rounded-2xl p-6 text-white my-8">
                        <h3 className="text-xl font-bold font-heading mb-2">
                          Book Temple Tours in Thailand
                        </h3>
                        <p className="opacity-90 mb-4 text-sm">
                          Guided tours, skip-the-line tickets, and cultural
                          experiences at the best temples
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href="https://klook.tpo.lv/7Dt6WApj"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Klook Temple Tours
                          </a>
                          <a
                            href="https://getyourguide.tpo.lv/GuAFfGGK"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            GetYourGuide
                          </a>
                          <a
                            href="https://booking.tpo.lv/2PT1kR82"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Booking.com
                          </a>
                        </div>
                      </div>
                    )}

                    {/* TripcomWidget after rank 10 */}
                    {temple.rank === 10 && (
                      <div className="my-8">
                        <TripcomWidget
                          city="Thailand"
                          type="searchbox"
                          customTitle="Find Hotels Near Thailand's Best Temples"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Temple Etiquette Tips */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">Good to Know</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Temple Etiquette &amp; Practical Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {data.tips.map((tip, i) => (
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

        {/* FAQ Section */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">FAQ</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="mb-4 bg-white rounded-xl shadow-sm group"
                >
                  <summary className="p-5 font-semibold cursor-pointer hover:bg-gray-50 rounded-xl list-none flex items-center justify-between transition-colors">
                    <span className="text-gray-900">{item.question}</span>
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
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate CTA Section */}
        <section className="bg-surface-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-8">
              <p className="font-script text-thailand-gold text-lg mb-2">
                Start Planning
              </p>
              <h2 className="text-3xl font-bold font-heading mb-3">
                Plan Your Temple Tour
              </h2>
              <p className="text-lg opacity-90">
                Book guided tours, hotels near temple districts, and travel
                essentials
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <TripcomWidget
                city="Bangkok"
                type="searchbox"
                customTitle="Search Hotels Near Bangkok Temples"
              />
              <div className="space-y-3">
                <a
                  href="https://klook.tpo.lv/7Dt6WApj"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127969; Klook Temple Tours</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                  href="https://getyourguide.tpo.lv/GuAFfGGK"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127774; GetYourGuide Activities</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127968; Booking.com</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127968; Trip.com Hotels</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                  href="https://saily.tpo.lv/rf9lidnE"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#128242; Saily eSIM for Thailand</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
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
            </div>
            <p className="text-white/70 text-xs text-center mt-6">
              Some links are affiliate links. We may earn a commission at no
              extra cost to you.
            </p>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">More Guides</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
              Related Pages
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/city/bangkok/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127751;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Bangkok City Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  Home to 4 of our top 5 temples plus food, nightlife, and
                  transport tips.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Explore Bangkok &#8594;
                </span>
              </Link>

              <Link
                href="/city/chiang-mai/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#9968;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Chiang Mai City Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  The temple capital of the north with Doi Suthep, Wat Chedi
                  Luang, and more.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Explore Chiang Mai &#8594;
                </span>
              </Link>

              <Link
                href="/thailand-travel-guide/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127988;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Thailand Travel Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  Everything you need to know before your first trip to
                  Thailand.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Read the guide &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const fs = require('fs');
  const path = require('path');
  const lang = locale || 'en';

  // Try locale-specific file first, fall back to English
  const localePath = path.join(process.cwd(), 'data', `temples.${lang}.json`);
  const defaultPath = path.join(process.cwd(), 'data', 'temples.json');
  const dataPath = lang !== 'en' && fs.existsSync(localePath) ? localePath : defaultPath;

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return {
    props: { data },
    revalidate: 86400
  };
};
