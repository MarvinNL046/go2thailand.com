import { GetStaticProps } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllItineraries, toAbsoluteImageUrl } from '../../lib/itineraries';

interface Itinerary {
  slug: string;
  title: string;
  duration: number;
  region: string;
  image: string;
  highlights: string[];
  budgetRange: string;
  cities?: string[];
}

interface ItinerariesPageProps {
  itineraries: Itinerary[];
}

const DURATION_FILTERS = [
  { label: 'All', value: 0 },
  { label: '3 Days', value: 3 },
  { label: '5 Days', value: 5 },
  { label: '7 Days', value: 7 },
  { label: '10 Days', value: 10 },
];

export default function ItinerariesPage({ itineraries }: ItinerariesPageProps) {
  const [activeDuration, setActiveDuration] = useState(0);

  const filteredItineraries = activeDuration === 0
    ? itineraries
    : itineraries.filter(i => i.duration === activeDuration);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Itineraries', href: '/itineraries/' }
  ];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Thailand Travel Itineraries",
    "description": "Curated Thailand itineraries for every travel style and budget",
    "numberOfItems": itineraries.length,
    "itemListElement": itineraries.map((itinerary, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": itinerary.title,
      "url": `https://go2-thailand.com/itineraries/${itinerary.slug}/`
    }))
  };

  return (
    <>
      <SEOHead
        title="Thailand Itineraries 2026: Day-by-Day Travel Plans | Go2Thailand"
        description="Explore curated Thailand itineraries from 3 to 10+ days. Day-by-day plans with budgets, accommodation tips, and transport guides for every travel style."
        ogImage="https://go2-thailand.com/og-default.webp"
      >
        <meta name="keywords" content="Thailand itinerary, Thailand travel plan, Thailand trip planner, Thailand route, Thailand 7 days, Thailand 10 days, Thailand 2 weeks" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative h-80 lg:h-[420px] overflow-hidden">
          <div className="absolute inset-0 bg-surface-dark">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }} />
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="container-custom text-white">
              <div className="max-w-3xl">
                <span className="font-script text-thailand-gold text-lg">Plan your adventure</span>
                <div className="flex items-center mb-4 mt-2">
                  <span className="bg-thailand-red text-white px-3 py-1 rounded-xl text-sm font-semibold mr-3">
                    {itineraries.length} Itineraries
                  </span>
                  <span className="text-gray-200 text-sm">
                    Updated for 2026
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-4">
                  Thailand Itineraries
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-2xl">
                  Day-by-day travel plans for every budget and travel style. From quick 3-day trips to epic 10-day adventures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />

            {/* Duration Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {DURATION_FILTERS.map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setActiveDuration(filter.value)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeDuration === filter.value
                      ? 'bg-thailand-blue text-white shadow-md'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Itinerary Cards Grid */}
            {filteredItineraries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredItineraries.map(itinerary => (
                  <Link
                    key={itinerary.slug}
                    href={`/itineraries/${itinerary.slug}/`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 h-full flex flex-col">
                      {/* Card Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={itinerary.image}
                          alt={itinerary.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="bg-thailand-blue text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                            {itinerary.duration} Days
                          </span>
                          <span className="bg-white/90 backdrop-blur-sm text-thailand-blue px-3 py-1 rounded-full text-xs font-semibold shadow">
                            {itinerary.region}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 className="text-lg font-bold font-heading text-gray-900 mb-2 group-hover:text-thailand-blue transition-colors line-clamp-2">
                          {itinerary.title}
                        </h2>
                        {/* Card has no description field from index data */}

                        {/* Highlights */}
                        {itinerary.highlights && itinerary.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {itinerary.highlights.slice(0, 3).map((highlight, idx) => (
                              <span
                                key={idx}
                                className="bg-surface-cream text-gray-600 px-2 py-0.5 rounded-full text-xs"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Budget Range */}
                        {itinerary.budgetRange && (
                          <div className="pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Budget range</span>
                              <span className="font-semibold text-thailand-blue">
                                {itinerary.budgetRange}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-surface-cream rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-900 mb-2">No itineraries found</h3>
                <p className="text-gray-600 mb-4">
                  No itineraries available for this duration yet. Try a different filter.
                </p>
                <button
                  onClick={() => setActiveDuration(0)}
                  className="text-thailand-blue font-medium hover:underline"
                >
                  View all itineraries
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Plan Your Trip CTA */}
        <section className="bg-surface-dark py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Ready to Plan Your Thailand Trip?</h2>
                <p className="opacity-90 text-sm">Book hotels, transport, activities, and get connected with an eSIM</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://booking.tpo.lv/2PT1kR82" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href="https://trip.tpo.lv/TmObooZ5" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Trip.com</a>
                <a href="https://klook.tpo.lv/7Dt6WApj" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
                <a href="https://12go.tpo.lv/tNA80urD" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </section>

        {/* Explore More */}
        <section className="bg-surface-cream py-12">
          <div className="container-custom">
            <div className="text-center mb-8">
              <span className="font-script text-thailand-gold text-lg">Keep exploring</span>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mt-1">
                Explore More
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/city/" className="group">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">All Cities</h3>
                  <p className="text-gray-600 text-sm">Browse all destinations</p>
                </div>
              </Link>
              <Link href="/islands/" className="group">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">Thai Islands</h3>
                  <p className="text-gray-600 text-sm">Beach paradise awaits</p>
                </div>
              </Link>
              <Link href="/transport/" className="group">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">Transport</h3>
                  <p className="text-gray-600 text-sm">Getting around Thailand</p>
                </div>
              </Link>
              <Link href="/blog/" className="group">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">Travel Blog</h3>
                  <p className="text-gray-600 text-sm">Tips & stories</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const rawItineraries = getAllItineraries();
  const lang = locale || 'en';

  // Transform bilingual data to locale-specific strings
  const itineraries = rawItineraries.map((item: any) => ({
    slug: item.slug,
    title: typeof item.title === 'object' ? (item.title[lang] || item.title.en) : item.title,
    duration: item.duration,
    region: item.region,
    image: item.image,
    highlights: item.highlights || [],
    budgetRange: item.budgetRange || '',
    cities: item.cities || [],
  }));

  return {
    props: {
      itineraries,
    },
    revalidate: 86400,
  };
};
