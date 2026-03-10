import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import TripcomWidget from '../components/TripcomWidget';
import { useState } from 'react';

interface IslandData {
  rank: number;
  name: string;
  province: string;
  best_for: string[];
  best_time: string;
  how_to_get_there: string;
  description: string;
  key_facts: string[];
  coast: 'Andaman' | 'Gulf';
  google_maps_query: string;
}

interface PageData {
  title: string;
  meta_description: string;
  intro: string;
  items: IslandData[];
  tips: string[];
  generated_at: string;
}

interface ThailandIslandsProps {
  data: PageData;
}

type CoastFilter = 'all' | 'Andaman' | 'Gulf';
type BestForFilter = 'all' | 'diving' | 'families' | 'budget' | 'couples';

const FAQ_ITEMS = [
  {
    question: 'What is the best time to visit Thailand\'s islands?',
    answer: 'It depends on the coast. The Andaman Sea islands (Phuket, Koh Phi Phi, Koh Lipe, Similan Islands) are best from November to April when seas are calm and skies are clear. The Gulf of Thailand islands (Koh Samui, Koh Phangan, Koh Tao) have their peak season from January to August. Koh Samet and Koh Chang are accessible year-round. The monsoon shoulder months (May and October) can offer great deals with manageable weather on the Gulf coast.'
  },
  {
    question: 'How do you get to Thailand\'s islands?',
    answer: 'Only two Thai islands have airports: Phuket (international) and Koh Samui (domestic + regional). All other islands require a ferry or speedboat. The main ferry hubs are Surat Thani and Chumphon for Gulf islands, and Krabi, Phuket, and Pak Bara for Andaman islands. Most ferries take 1-3 hours. Book through 12Go or directly at the pier. During monsoon season, some routes are cancelled or reduced — always check schedules before booking connecting transport.'
  },
  {
    question: 'Which Thai island is best for beginners and first-time visitors?',
    answer: 'Phuket is the easiest starting point thanks to its international airport, wide range of accommodation from hostels to luxury resorts, and well-developed tourist infrastructure. Koh Samui is a close second with its own airport and a more relaxed atmosphere. If you want a smaller island experience without complicated logistics, Koh Lanta is connected to the mainland by bridge and has a laid-back vibe that suits first-timers. For budget travellers, Koh Tao offers affordable diving courses and a welcoming backpacker scene.'
  }
];

export default function ThailandIslands({ data }: ThailandIslandsProps) {
  const [coastFilter, setCoastFilter] = useState<CoastFilter>('all');
  const [bestForFilter, setBestForFilter] = useState<BestForFilter>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Islands', href: '/thailand-islands/' }
  ];

  const filterIslands = (islands: IslandData[]): IslandData[] => {
    let filtered = islands;

    if (coastFilter !== 'all') {
      filtered = filtered.filter(i => i.coast === coastFilter);
    }

    if (bestForFilter !== 'all') {
      const matchMap: Record<string, string[]> = {
        diving: ['diving', 'budget diving', 'snorkeling', 'pristine waters'],
        families: ['families', 'first-timers'],
        budget: ['budget', 'budget diving', 'backpackers', 'camping'],
        couples: ['couples', 'honeymooners', 'relaxation', 'tranquility']
      };
      const keywords = matchMap[bestForFilter] || [];
      filtered = filtered.filter(i =>
        i.best_for.some(f => keywords.includes(f.toLowerCase()))
      );
    }

    return filtered;
  };

  const filteredIslands = filterIslands(data.items);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.title,
    numberOfItems: data.items.length,
    itemListElement: data.items.map(island => ({
      '@type': 'ListItem',
      position: island.rank,
      name: island.name,
      url: `https://go2-thailand.com/thailand-islands/`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
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

  const coastFilters: { key: CoastFilter; label: string }[] = [
    { key: 'all', label: 'All Islands' },
    { key: 'Andaman', label: 'Andaman Coast' },
    { key: 'Gulf', label: 'Gulf Coast' }
  ];

  const bestForFilters: { key: BestForFilter; label: string }[] = [
    { key: 'all', label: 'All Types' },
    { key: 'diving', label: 'Best for Diving' },
    { key: 'families', label: 'Best for Families' },
    { key: 'budget', label: 'Best for Budget' },
    { key: 'couples', label: 'Best for Couples' }
  ];

  return (
    <>
      <SEOHead
        title="Thailand Islands — 12 Best Islands to Visit (2026 Guide)"
        description={data.meta_description}
      >
        <meta
          name="keywords"
          content="Thailand islands, best islands Thailand, Koh Phi Phi, Phuket, Koh Samui, Koh Tao, Koh Lipe, Thai island guide, island hopping Thailand 2026"
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
              <p className="font-script text-thailand-gold text-lg mb-2">Island Guide</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {data.title}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                From Phuket&apos;s international gateway to Koh Tarutao&apos;s untouched wilderness — find your perfect Thai island
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">12 islands</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">2 coastlines</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Ranked &amp; reviewed</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Updated March 2026</span>
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
            <p className="text-lg text-gray-700 leading-relaxed">{data.intro}</p>
          </div>
        </section>

        {/* Coast Filter Buttons */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-3 mb-3">
              {coastFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setCoastFilter(f.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    coastFilter === f.key
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {bestForFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setBestForFilter(f.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    bestForFilter === f.key
                      ? 'bg-thailand-gold text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Island Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredIslands.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">No islands found for this filter combination.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredIslands.map(island => (
                  <div key={island.rank}>
                    <article className="bg-white rounded-2xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow">
                      {/* Rank Badge */}
                      <div className="absolute top-4 left-4 z-10 bg-thailand-gold text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        #{island.rank}
                      </div>

                      {/* Header */}
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 pt-8">
                        <div className="ml-12">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold font-heading text-white">{island.name}</h2>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                island.coast === 'Andaman'
                                  ? 'bg-blue-500/30 text-blue-200 border border-blue-400/40'
                                  : 'bg-teal-500/30 text-teal-200 border border-teal-400/40'
                              }`}
                            >
                              {island.coast === 'Andaman' ? 'Andaman Coast' : 'Gulf Coast'}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm">{island.province} Province</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Best For Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {island.best_for.map(tag => (
                            <span
                              key={tag}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                island.coast === 'Andaman'
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-teal-50 text-teal-700'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{island.description}</p>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                          <div className="bg-surface-cream rounded-xl p-3 text-center">
                            <div className="text-gray-500 text-xs mb-1">Best Time to Visit</div>
                            <div className="font-semibold text-gray-900">{island.best_time}</div>
                          </div>
                          <div className="bg-surface-cream rounded-xl p-3 text-center sm:col-span-2">
                            <div className="text-gray-500 text-xs mb-1">How to Get There</div>
                            <div className="font-semibold text-gray-900 text-xs sm:text-sm">{island.how_to_get_there}</div>
                          </div>
                        </div>

                        {/* Key Facts */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {island.key_facts.map((fact, i) => (
                            <span
                              key={i}
                              className="flex items-start text-sm text-gray-600"
                            >
                              <span className="text-green-500 mr-1.5 flex-shrink-0">&#10003;</span>
                              {fact}
                              {i < island.key_facts.length - 1 && (
                                <span className="text-gray-300 ml-2 mr-1">|</span>
                              )}
                            </span>
                          ))}
                        </div>

                        {/* Google Maps Link */}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(island.google_maps_query)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-thailand-blue hover:text-thailand-red transition-colors font-medium"
                        >
                          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          View on Google Maps
                        </a>
                      </div>
                    </article>

                    {/* Affiliate CTA after island 4 */}
                    {island.rank === 4 && (
                      <div className="bg-surface-dark rounded-2xl p-6 text-white my-8">
                        <h3 className="text-xl font-bold font-heading mb-2">
                          Book Your Island Hopping
                        </h3>
                        <p className="opacity-90 mb-4 text-sm">
                          Ferries, hotels &amp; tours for Thailand&apos;s best islands
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href="https://12go.tpo.lv/tNA80urD"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Book Ferries
                          </a>
                          <a
                            href="https://booking.tpo.lv/2PT1kR82"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Booking.com
                          </a>
                          <a
                            href="https://klook.tpo.lv/7Dt6WApj"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Tours &amp; Activities
                          </a>
                        </div>
                      </div>
                    )}

                    {/* TripcomWidget after island 8 */}
                    {island.rank === 8 && (
                      <div className="my-8">
                        <TripcomWidget
                          city="Thailand Islands"
                          type="searchbox"
                          customTitle="Find Hotels on Thailand's Islands"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* By Coast Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">Explore by Coast</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Islands by Coastline
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Andaman Coast */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold font-heading text-blue-800 mb-2">Andaman Coast</h3>
                <p className="text-blue-700 text-sm mb-4">
                  Thailand&apos;s western seaboard is known for dramatic limestone karsts, crystal-clear water, and vibrant coral reefs. Best visited November to April when seas are calm and visibility peaks. Home to iconic destinations like Phuket, Koh Phi Phi, and the remote Similan Islands.
                </p>
                <ul className="space-y-2">
                  {data.items.filter(i => i.coast === 'Andaman').map(island => (
                    <li key={island.rank} className="flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {island.rank}
                      </span>
                      <div>
                        <span className="font-medium text-gray-900 text-sm">{island.name}</span>
                        <span className="text-gray-500 text-xs ml-2">-- {island.province}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gulf Coast */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold font-heading text-teal-800 mb-2">Gulf Coast</h3>
                <p className="text-teal-700 text-sm mb-4">
                  The Gulf of Thailand offers calm waters with excellent diving and a longer season. Koh Samui serves as the main hub with its own airport, connecting to Koh Phangan and Koh Tao by ferry. Several Gulf islands are accessible year-round, making them a reliable option outside the Andaman high season.
                </p>
                <ul className="space-y-2">
                  {data.items.filter(i => i.coast === 'Gulf').map(island => (
                    <li key={island.rank} className="flex items-center gap-3">
                      <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {island.rank}
                      </span>
                      <div>
                        <span className="font-medium text-gray-900 text-sm">{island.name}</span>
                        <span className="text-gray-500 text-xs ml-2">-- {island.province}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Tips Section */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">Good to Know</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Practical Tips for Thailand&apos;s Islands
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.tips.map((tip, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="bg-thailand-gold text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">FAQ</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} className="mb-4 bg-surface-cream rounded-xl shadow-sm group">
                  <summary className="p-5 font-semibold cursor-pointer hover:bg-gray-200 rounded-xl list-none flex items-center justify-between transition-colors">
                    <span className="text-gray-900">{item.question}</span>
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
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Full Affiliate CTA Section */}
        <section className="bg-surface-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-8">
              <p className="font-script text-thailand-gold text-lg mb-2">Start Planning</p>
              <h2 className="text-3xl font-bold font-heading mb-3">
                Plan Your Thai Island Adventure
              </h2>
              <p className="text-lg opacity-90">
                Book everything you need for your island-hopping trip
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <TripcomWidget
                city="Thailand"
                type="searchbox"
                customTitle="Search Hotels on Thai Islands"
              />
              <div className="space-y-3">
                <a
                  href="https://12go.tpo.lv/tNA80urD"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#9941; Book Ferries (12go)</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127968; Booking.com</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127968; Trip.com Hotels</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://klook.tpo.lv/7Dt6WApj"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127774; Klook Tours &amp; Activities</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://getyourguide.tpo.lv/GuAFfGGK"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127774; GetYourGuide Activities</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://saily.tpo.lv/rf9lidnE"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#128242; Saily eSIM for Thailand</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-6">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>

        {/* Related Pages Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">More Guides</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
              Related Pages
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a
                href="/best-beaches-in-thailand/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127958;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Best Beaches in Thailand
                </h3>
                <p className="text-gray-600 text-sm">
                  25 stunning beaches ranked across 10 islands and 2 coastlines.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  View beach guide &#8594;
                </span>
              </a>

              <a
                href="/islands/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127965;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Explore Individual Islands
                </h3>
                <p className="text-gray-600 text-sm">
                  In-depth guides for Koh Samui, Koh Phi Phi, Koh Tao, and more.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  View all islands &#8594;
                </span>
              </a>

              <a
                href="/compare/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#9878;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Compare Islands
                </h3>
                <p className="text-gray-600 text-sm">
                  Can&apos;t decide? Compare Thai islands side by side.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Compare islands &#8594;
                </span>
              </a>
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

  const localePath = path.join(process.cwd(), 'data', `islands.${lang}.json`);
  const defaultPath = path.join(process.cwd(), 'data', 'islands.json');
  const dataPath = lang !== 'en' && fs.existsSync(localePath) ? localePath : defaultPath;

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return {
    props: { data },
    revalidate: 86400
  };
};
