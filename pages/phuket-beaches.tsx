import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';
import TripcomWidget from '../components/TripcomWidget';
import { useState } from 'react';

interface BeachData {
  rank: number;
  name: string;
  thai_name: string;
  coast: 'west' | 'east' | 'south' | 'north';
  vibe: string;
  crowd_level: string;
  best_for: string[];
  description: string;
  length: string;
  access: string;
  nearby: string;
  best_time: string;
  google_maps_query: string;
}

interface PageData {
  title: string;
  meta_description: string;
  intro: string;
  items: BeachData[];
  tips: string[];
  generated_at: string;
}

interface PhuketBeachesProps {
  data: PageData;
}

type CoastFilter = 'all' | 'west' | 'east' | 'south' | 'north';
type VibeFilter = 'all' | 'family' | 'party' | 'quiet' | 'snorkeling';

const FAQ_ITEMS = [
  {
    question: 'What is the best beach in Phuket for families?',
    answer: 'Kata Beach is the best family beach in Phuket. The 1.5 km stretch of soft white sand has shallow, calm water safe for children during high season (November-April). There are lifeguards, nearby restaurants, and the small offshore Pu Island offers snorkeling. Karon Beach is another excellent option — at 5 km long, it never feels crowded even in peak season. Kamala Beach north of Patong is a quieter alternative with very calm, shallow water.'
  },
  {
    question: 'Which Phuket beaches are best for snorkeling?',
    answer: 'Ao Sane Beach has the best shore snorkeling in Phuket — coral is right at the waterline in crystal-clear water. Nai Yang Beach has a vibrant 2 sq km coral reef just 100 meters offshore where you can spot clownfish, angelfish, and sea turtles. Freedom Beach has excellent snorkeling at both rocky ends (no jet skis allowed). Ya Nui offers brain coral on its rocky promontory. Snorkeling gear rental costs 150-200 THB at most beaches.'
  },
  {
    question: 'When is the best time to visit Phuket beaches?',
    answer: 'November to April is the best time. This is the dry season with calm seas, clear water, and sunny skies. May to October is monsoon season — the west coast gets large swells and strong currents (red flags mean no swimming). Some surfers enjoy Kata and Surin during monsoon months. The east coast beaches like Rawai stay calmer year-round but are less scenic for swimming. Peak tourist season is December to February with the highest prices and most crowds.'
  }
];

function coastLabel(coast: string): string {
  switch (coast) {
    case 'west': return 'West Coast';
    case 'east': return 'East Coast';
    case 'south': return 'South';
    case 'north': return 'North';
    default: return coast;
  }
}

function coastColor(coast: string): string {
  switch (coast) {
    case 'west': return 'bg-blue-500/30 text-blue-200 border border-blue-400/40';
    case 'east': return 'bg-teal-500/30 text-teal-200 border border-teal-400/40';
    case 'south': return 'bg-amber-500/30 text-amber-200 border border-amber-400/40';
    case 'north': return 'bg-green-500/30 text-green-200 border border-green-400/40';
    default: return 'bg-gray-500/30 text-gray-200';
  }
}

function vibeColor(vibe: string): string {
  switch (vibe) {
    case 'family': return 'bg-green-50 text-green-700';
    case 'party': return 'bg-purple-50 text-purple-700';
    case 'quiet': return 'bg-blue-50 text-blue-700';
    case 'snorkeling': return 'bg-cyan-50 text-cyan-700';
    default: return 'bg-gray-50 text-gray-700';
  }
}

function crowdBadge(level: string): { label: string; color: string } {
  switch (level) {
    case 'busy': return { label: 'Busy', color: 'text-red-600' };
    case 'moderate': return { label: 'Moderate', color: 'text-amber-600' };
    case 'quiet': return { label: 'Quiet', color: 'text-green-600' };
    default: return { label: level, color: 'text-gray-600' };
  }
}

export default function PhuketBeaches({ data }: PhuketBeachesProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const [coastFilter, setCoastFilter] = useState<CoastFilter>('all');
  const [vibeFilter, setVibeFilter] = useState<VibeFilter>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: isNl ? 'Phuket Stranden' : 'Phuket Beaches', href: '/phuket-beaches/' }
  ];

  const filterBeaches = (beaches: BeachData[]): BeachData[] => {
    let filtered = beaches;
    if (coastFilter !== 'all') {
      filtered = filtered.filter(b => b.coast === coastFilter);
    }
    if (vibeFilter !== 'all') {
      filtered = filtered.filter(b => b.vibe === vibeFilter);
    }
    return filtered;
  };

  const filteredBeaches = filterBeaches(data.items);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.title,
    numberOfItems: data.items.length,
    itemListElement: data.items.map(beach => ({
      '@type': 'ListItem',
      position: beach.rank,
      name: `${beach.name} (${beach.thai_name})`,
      url: 'https://go2-thailand.com/phuket-beaches/'
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
    { key: 'all', label: isNl ? 'Alle Stranden' : 'All Beaches' },
    { key: 'west', label: isNl ? 'Westkust' : 'West Coast' },
    { key: 'south', label: isNl ? 'Zuid' : 'South' },
    { key: 'north', label: isNl ? 'Noord' : 'North' },
    { key: 'east', label: isNl ? 'Oostkust' : 'East Coast' }
  ];

  const vibeFilters: { key: VibeFilter; label: string }[] = [
    { key: 'all', label: isNl ? 'Alle Sferen' : 'All Vibes' },
    { key: 'family', label: isNl ? 'Gezinsvriendelijk' : 'Family-Friendly' },
    { key: 'quiet', label: isNl ? 'Rustig & Afgelegen' : 'Quiet & Secluded' },
    { key: 'snorkeling', label: 'Snorkeling' },
    { key: 'party', label: isNl ? 'Feest & Nachtleven' : 'Party & Nightlife' }
  ];

  return (
    <>
      <SEOHead
        title={data.title}
        description={data.meta_description}
      >
        <meta
          name="keywords"
          content="phuket beaches, best beaches phuket, patong beach, kata beach, freedom beach, nai harn beach, phuket snorkeling, phuket beach guide 2026"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'Strandengids' : 'Beach Guide'}</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {data.title}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                {isNl
                  ? 'Van Kata\'s gezinsvriendelijke kusten tot het verborgen Freedom Beach — vind jouw perfecte Phuket strand'
                  : 'From Kata\u0027s family-friendly shores to hidden Freedom Beach \u2014 find your perfect Phuket sand'}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">{isNl ? '15 stranden' : '15 beaches'}</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">{isNl ? '4 kustlijnen' : '4 coastlines'}</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">{isNl ? 'Gerangschikt & beoordeeld' : 'Ranked & reviewed'}</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">{isNl ? 'Bijgewerkt maart 2026' : 'Updated March 2026'}</span>
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
            <p className="text-lg text-gray-700 leading-relaxed">{data.intro}</p>
          </div>
        </section>

        {/* Filters */}
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
              {vibeFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setVibeFilter(f.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    vibeFilter === f.key
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

        {/* Beach Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredBeaches.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">{isNl ? 'Geen stranden gevonden voor deze filtercombinatie.' : 'No beaches found for this filter combination.'}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredBeaches.map(beach => (
                  <div key={beach.rank}>
                    <article className="bg-white rounded-2xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow">
                      <div className="absolute top-4 left-4 z-10 bg-thailand-gold text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        #{beach.rank}
                      </div>

                      {/* Header */}
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 pt-8">
                        <div className="ml-12">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h2 className="text-2xl font-bold font-heading text-white">{beach.name}</h2>
                            <span className="text-white/60 text-sm">{beach.thai_name}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${coastColor(beach.coast)}`}>
                              {coastLabel(beach.coast)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-white/70">
                            <span>{beach.length} long</span>
                            <span>&#183;</span>
                            <span className={crowdBadge(beach.crowd_level).color}>
                              {crowdBadge(beach.crowd_level).label} crowds
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Vibe & Best For tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${vibeColor(beach.vibe)}`}>
                            {beach.vibe.charAt(0).toUpperCase() + beach.vibe.slice(1)}
                          </span>
                          {beach.best_for.map(tag => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-thailand-gold/10 text-thailand-gold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{beach.description}</p>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                          <div className="bg-surface-cream rounded-xl p-3 text-center">
                            <div className="text-gray-500 text-xs mb-1">{isNl ? 'Beste Tijd' : 'Best Time'}</div>
                            <div className="font-semibold text-gray-900">{beach.best_time}</div>
                          </div>
                          <div className="bg-surface-cream rounded-xl p-3 text-center">
                            <div className="text-gray-500 text-xs mb-1">{isNl ? 'Hoe er te komen' : 'How to Get There'}</div>
                            <div className="font-semibold text-gray-900 text-xs sm:text-sm">{beach.access}</div>
                          </div>
                          <div className="bg-surface-cream rounded-xl p-3 text-center">
                            <div className="text-gray-500 text-xs mb-1">{isNl ? 'In de buurt' : 'Nearby'}</div>
                            <div className="font-semibold text-gray-900 text-xs sm:text-sm">{beach.nearby}</div>
                          </div>
                        </div>

                        {/* Google Maps */}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(beach.google_maps_query)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-thailand-blue hover:text-thailand-red transition-colors font-medium"
                        >
                          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {isNl ? 'Bekijk op Google Maps' : 'View on Google Maps'}
                        </a>
                      </div>
                    </article>

                    {/* Affiliate CTA after beach 5 */}
                    {beach.rank === 5 && (
                      <div className="bg-surface-dark rounded-2xl p-6 text-white my-8">
                        <h3 className="text-xl font-bold font-heading mb-2">
                          {isNl ? 'Boek Jouw Phuket Strandvakantie' : 'Book Your Phuket Beach Holiday'}
                        </h3>
                        <p className="opacity-90 mb-4 text-sm">
                          {isNl ? 'Hotels, tours & activiteiten bij de beste stranden van Phuket' : 'Hotels, tours & activities near Phuket\u0027s best beaches'}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href="https://booking.tpo.lv/2PT1kR82?subid=beaches"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Booking.com
                          </a>
                          <a
                            href="https://klook.tpo.lv/7Dt6WApj?subid=beaches"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            {isNl ? 'Tours & Activiteiten' : 'Tours & Activities'}
                          </a>
                          <a
                            href="https://12go.tpo.lv/tNA80urD?subid=beaches"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            {isNl ? 'Boek Veerboten' : 'Book Ferries'}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* TripcomWidget after beach 10 */}
                    {beach.rank === 10 && (
                      <div className="my-8">
                        <TripcomWidget
                          city="Phuket"
                          type="searchbox"
                          customTitle="Find Hotels Near Phuket Beaches"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">{isNl ? 'Goed om te Weten' : 'Good to Know'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {isNl ? 'Phuket Strandtips' : 'Phuket Beach Tips'}
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

        {/* FAQ */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">FAQ</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
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

        {/* Affiliate CTA */}
        <section className="bg-surface-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-8">
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'Begin met Plannen' : 'Start Planning'}</p>
              <h2 className="text-3xl font-bold font-heading mb-3">
                {isNl ? 'Plan Jouw Phuket Strandtrip' : 'Plan Your Phuket Beach Trip'}
              </h2>
              <p className="text-lg opacity-90">
                {isNl ? 'Boek hotels, tours en vervoer voor jouw Phuket vakantie' : 'Book hotels, tours, and transport for your Phuket holiday'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <TripcomWidget
                city="Phuket"
                type="searchbox"
                customTitle="Search Phuket Beach Hotels"
              />
              <div className="space-y-3">
                <a
                  href="https://booking.tpo.lv/2PT1kR82?subid=beaches"
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
                  href="https://klook.tpo.lv/7Dt6WApj?subid=beaches"
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
                  href="https://getyourguide.tpo.lv/GuAFfGGK?subid=beaches"
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
                  href="https://saily.tpo.lv/rf9lidnE?subid=beaches"
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
              {isNl ? 'Sommige links zijn affiliate links. We kunnen een commissie ontvangen zonder extra kosten voor jou.' : 'Some links are affiliate links. We may earn a commission at no extra cost to you.'}
            </p>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">{isNl ? 'Meer Gidsen' : 'More Guides'}</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
              {isNl ? 'Gerelateerde Pagina\'s' : 'Related Pages'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/best-beaches-in-thailand/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127958;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {isNl ? 'Beste Stranden in Thailand' : 'Best Beaches in Thailand'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isNl ? '25 prachtige stranden gerangschikt over 10 eilanden en 2 kustlijnen.' : '25 stunning beaches ranked across 10 islands and 2 coastlines.'}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {isNl ? 'Bekijk strandgids' : 'View beach guide'} &#8594;
                </span>
              </Link>

              <Link
                href="/city/phuket/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127965;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {isNl ? 'Phuket Reisgids' : 'Phuket Travel Guide'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isNl ? 'Complete gids voor Phuket — attracties, restaurants, hotels & tips.' : 'Complete guide to Phuket \u2014 attractions, restaurants, hotels & tips.'}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {isNl ? 'Ontdek Phuket' : 'Explore Phuket'} &#8594;
                </span>
              </Link>

              <Link
                href="/thailand-islands/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127754;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {isNl ? 'Thailand Eilandengids' : 'Thailand Islands Guide'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isNl ? '12 beste Thaise eilanden van Phuket tot Koh Lipe, gerangschikt & beoordeeld.' : '12 best Thai islands from Phuket to Koh Lipe, ranked & reviewed.'}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {isNl ? 'Bekijk eilandgids' : 'View island guide'} &#8594;
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

  const localePath = path.join(process.cwd(), 'data', `phuket-beaches.${lang}.json`);
  const defaultPath = path.join(process.cwd(), 'data', 'phuket-beaches.json');
  const dataPath = lang !== 'en' && fs.existsSync(localePath) ? localePath : defaultPath;

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return {
    props: { data },
    revalidate: 604800
  };
};
