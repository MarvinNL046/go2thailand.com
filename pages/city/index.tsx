import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { getAllCities } from '../../lib/cities';
import CityCard from '../../components/CityCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import AnimatedCounter from '../../components/AnimatedCounter';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface City {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
  };
  region: string;
  province: string;
  image: string;
  highlights: string[];
}

interface CitiesPageProps {
  cities: City[];
}

export default function CitiesPage({ cities }: CitiesPageProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const regions = ['all', 'Northern', 'Central', 'Southern'];

  const filteredCities = cities.filter(city => {
    const matchesRegion = selectedRegion === 'all' || city.region === selectedRegion;
    const matchesSearch = city.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.province.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cities', href: '/city/' }
  ];

  const gridAnim = useScrollAnimation(0.05);
  const statsAnim = useScrollAnimation(0.2);

  return (
    <>
      <SEOHead
        title="Thailand Cities Guide 2026 — Best Places to Visit"
        description="Explore 10 top cities in Thailand for 2026. Bangkok, Chiang Mai, Phuket, Krabi and more — hotels, food, attractions, and travel tips for every budget."
      >
        <meta name="keywords" content="Thailand cities, Bangkok, Chiang Mai, Phuket, Pattaya, Krabi, Thailand destinations, Thai cities guide" />
      </SEOHead>

      {/* Hero */}
      <section className="bg-surface-cream pt-8 pb-12">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} />

          <div className="text-center mb-10">
            <span className="section-label">Explore Thailand</span>
            <h1 className="section-title mb-4">
              Thailand Cities
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover {cities.length} amazing cities across Thailand. From bustling metropolises to
              charming coastal towns, find your perfect destination.
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="w-full lg:w-96">
                <label htmlFor="search" className="sr-only">Search cities</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search cities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-thailand-red/20 focus:border-thailand-red transition-colors"
                  />
                </div>
              </div>

              {/* Region Pill Filters */}
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedRegion === region
                        ? 'bg-thailand-red text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {region === 'all' ? 'All Regions' : region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="section-padding bg-white" ref={gridAnim.ref}>
        <div className="container-custom">
          {/* Results info */}
          <div className="mb-8">
            <p className="text-gray-500 text-sm">
              Showing {filteredCities.length} of {cities.length} cities
              {selectedRegion !== 'all' && ` in ${selectedRegion} Thailand`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {filteredCities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredCities.slice(0, 6).map((city, i) => (
                  <div key={city.id} className={`scroll-fade-up stagger-${(i % 3) + 1} ${gridAnim.isVisible ? 'is-visible' : ''}`}>
                    <CityCard city={city} />
                  </div>
                ))}
              </div>

              {filteredCities.length > 6 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCities.slice(6).map((city, i) => (
                    <div key={city.id} className={`scroll-fade-up stagger-${(i % 3) + 1} ${gridAnim.isVisible ? 'is-visible' : ''}`}>
                      <CityCard city={city} />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1">No cities found</h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search terms or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Regional Stats */}
      <section className="bg-surface-dark py-14" ref={statsAnim.ref}>
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="font-script text-thailand-gold text-lg mb-2 block">Cities by Region</span>
            <h2 className="font-heading text-3xl font-bold text-white">Explore by Region</h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 scroll-fade-up ${statsAnim.isVisible ? 'is-visible' : ''}`}>
            {['Northern', 'Central', 'Southern'].map((region) => {
              const regionCities = cities.filter(city => city.region === region);
              return (
                <div key={region} className="text-center">
                  <div className="text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
                    <AnimatedCounter target={regionCities.length} />
                  </div>
                  <div className="text-gray-400 mb-4">{region} Thailand</div>
                  <button
                    onClick={() => {
                      setSelectedRegion(region);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-thailand-red hover:text-thailand-red-400 font-medium text-sm transition-colors"
                  >
                    View {region} Cities
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plan Your Trip */}
      <section className="section-padding bg-surface-cream">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="section-label">Plan Your Trip</span>
            <h2 className="section-title mb-3">Plan Your Thailand Trip</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the best deals on hotels, flights, and transport for your Thailand adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <a
              href="https://trip.tpo.lv/TmObooZ5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-thailand-blue text-white font-medium rounded-xl hover:bg-thailand-blue-600 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <span className="text-lg">🏨</span>
              Search Hotels on Trip.com
            </a>

            <a
              href="https://booking.tpo.lv/2PT1kR82"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-700 text-white font-medium rounded-xl hover:bg-blue-800 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <span className="text-lg">📋</span>
              Book on Booking.com
            </a>

            <a
              href="https://12go.tpo.lv/tNA80urD"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <span className="text-lg">🚂</span>
              Book Transport on 12Go
            </a>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Affiliate disclosure: We may earn a commission when you book through our partner links, at no extra cost to you.
          </p>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cities = getAllCities();

  return {
    props: {
      cities,
    },
  };
};
