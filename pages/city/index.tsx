import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getAllCities } from '../../lib/cities';
import CityCard from '../../components/CityCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import AnimatedCounter from '../../components/AnimatedCounter';
import TravelpayoutsRecoveryPanel from '../../components/TravelpayoutsRecoveryPanel';
import { BOOKING_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
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
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const regions = ['all', 'Northern', 'Central', 'Southern'];
  const regionLabels: Record<string, { en: string; nl: string }> = {
    'all': { en: 'All Regions', nl: 'Alle Regio\'s' },
    'Northern': { en: 'Northern', nl: 'Noord' },
    'Central': { en: 'Central', nl: 'Centraal' },
    'Southern': { en: 'Southern', nl: 'Zuid' },
  };

  const filteredCities = cities.filter(city => {
    const matchesRegion = selectedRegion === 'all' || city.region === selectedRegion;
    const matchesSearch = (city.name[lang] || city.name.en).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.province.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const breadcrumbs = [
    { name: isNl ? 'Home' : 'Home', href: '/' },
    { name: isNl ? 'Steden' : 'Cities', href: '/city/' }
  ];

  const gridAnim = useScrollAnimation(0.05);
  const statsAnim = useScrollAnimation(0.2);
  const trackAffiliate = (url: string, placement: string) =>
    withPlacementSubId(url, 'city-index', placement);

  return (
    <>
      <SEOHead
        title={isNl
          ? "Thailand Stedengids 2026 — Beste Plekken om te Bezoeken"
          : "Thailand Cities Guide 2026 — Best Places to Visit"}
        description={isNl
          ? "Ontdek de top steden in Thailand voor 2026. Bangkok, Chiang Mai, Phuket, Krabi en meer — hotels, eten, bezienswaardigheden en reistips voor elk budget."
          : "Explore 10 top cities in Thailand for 2026. Bangkok, Chiang Mai, Phuket, Krabi and more — hotels, food, attractions, and travel tips for every budget."}
      >
        <meta name="keywords" content={isNl
          ? "Thailand steden, Bangkok, Chiang Mai, Phuket, Pattaya, Krabi, Thailand bestemmingen, Thaise stedengids"
          : "Thailand cities, Bangkok, Chiang Mai, Phuket, Pattaya, Krabi, Thailand destinations, Thai cities guide"} />
      </SEOHead>

      {/* Hero */}
      <section className="bg-surface-cream pt-8 pb-12">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} />

          <div className="text-center mb-10">
            <span className="section-label">{isNl ? 'Ontdek Thailand' : 'Explore Thailand'}</span>
            <h1 className="section-title mb-4">
              {isNl ? 'Thailand Steden' : 'Thailand Cities'}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {isNl
                ? `Ontdek ${cities.length} fantastische steden in Thailand. Van bruisende metropolen tot charmante kuststeden, vind jouw perfecte bestemming.`
                : `Discover ${cities.length} amazing cities across Thailand. From bustling metropolises to charming coastal towns, find your perfect destination.`}
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="w-full lg:w-96">
                <label htmlFor="search" className="sr-only">{isNl ? 'Zoek steden' : 'Search cities'}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    type="text"
                    placeholder={isNl ? "Zoek steden..." : "Search cities..."}
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
                    {regionLabels[region]?.[lang] || region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <TravelpayoutsRecoveryPanel
              pageType="city"
              placement="city-index-panel"
              columns={3}
            />
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="section-padding bg-white" ref={gridAnim.ref}>
        <div className="container-custom">
          {/* Results info */}
          <div className="mb-8">
            <p className="text-gray-500 text-sm">
              {isNl
                ? `${filteredCities.length} van ${cities.length} steden`
                : `Showing ${filteredCities.length} of ${cities.length} cities`}
              {selectedRegion !== 'all' && (isNl ? ` in ${regionLabels[selectedRegion]?.nl || selectedRegion} Thailand` : ` in ${selectedRegion} Thailand`)}
              {searchTerm && (isNl ? ` voor "${searchTerm}"` : ` matching "${searchTerm}"`)}
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
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1">{isNl ? 'Geen steden gevonden' : 'No cities found'}</h3>
              <p className="text-sm text-gray-500">
                {isNl ? 'Probeer andere zoektermen of filtercriteria.' : 'Try adjusting your search terms or filter criteria.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Travel Guides */}
      <section className="section-padding bg-surface-cream">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="section-label">{isNl ? 'Ontdek Thailand' : 'Explore Thailand'}</span>
            <h2 className="section-title mb-3">{isNl ? 'Reisgidsen' : 'Travel Guides'}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isNl
                ? 'Alles wat je nodig hebt om je perfecte Thailand reis te plannen — restaurants, hotels, bezienswaardigheden en meer.'
                : 'Everything you need to plan your perfect Thailand trip — restaurants, hotels, attractions, and more.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link
              href="/top-10/restaurants/"
              className="flex flex-col items-center gap-3 px-4 py-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-thailand-red/30 transition-all group"
            >
              <span className="text-3xl">🍜</span>
              <span className="font-medium text-sm text-gray-800 group-hover:text-thailand-red transition-colors text-center">{isNl ? 'Restaurantgidsen' : 'Restaurant Guides'}</span>
            </Link>

            <Link
              href="/top-10/hotels/"
              className="flex flex-col items-center gap-3 px-4 py-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-thailand-red/30 transition-all group"
            >
              <span className="text-3xl">🏨</span>
              <span className="font-medium text-sm text-gray-800 group-hover:text-thailand-red transition-colors text-center">{isNl ? 'Hotelgidsen' : 'Hotel Guides'}</span>
            </Link>

            <Link
              href="/top-10/attractions/"
              className="flex flex-col items-center gap-3 px-4 py-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-thailand-red/30 transition-all group"
            >
              <span className="text-3xl">🗺️</span>
              <span className="font-medium text-sm text-gray-800 group-hover:text-thailand-red transition-colors text-center">{isNl ? 'Bezienswaardigheden' : 'Attraction Guides'}</span>
            </Link>

            <Link
              href="/food/"
              className="flex flex-col items-center gap-3 px-4 py-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-thailand-red/30 transition-all group"
            >
              <span className="text-3xl">🌶️</span>
              <span className="font-medium text-sm text-gray-800 group-hover:text-thailand-red transition-colors text-center">{isNl ? 'Thais Eten Gids' : 'Thai Food Guide'}</span>
            </Link>

            <Link
              href="/islands/"
              className="flex flex-col items-center gap-3 px-4 py-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-thailand-red/30 transition-all group"
            >
              <span className="text-3xl">🏝️</span>
              <span className="font-medium text-sm text-gray-800 group-hover:text-thailand-red transition-colors text-center">{isNl ? 'Thaise Eilanden' : 'Thai Islands'}</span>
            </Link>

            <Link
              href="/thailand-index/"
              className="flex flex-col items-center gap-3 px-4 py-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-thailand-red/30 transition-all group"
            >
              <span className="text-3xl">📊</span>
              <span className="font-medium text-sm text-gray-800 group-hover:text-thailand-red transition-colors text-center">{isNl ? 'Thailand Reisindex' : 'Thailand Travel Index'}</span>
            </Link>

            <Link
              href="/compare/"
              className="flex flex-col items-center gap-3 px-4 py-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-thailand-red/30 transition-all group"
            >
              <span className="text-3xl">⚖️</span>
              <span className="font-medium text-sm text-gray-800 group-hover:text-thailand-red transition-colors text-center">{isNl ? 'Bestemmingen Vergelijken' : 'Compare Destinations'}</span>
            </Link>

            <Link
              href="/transport/"
              className="flex flex-col items-center gap-3 px-4 py-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-thailand-red/30 transition-all group"
            >
              <span className="text-3xl">🚌</span>
              <span className="font-medium text-sm text-gray-800 group-hover:text-thailand-red transition-colors text-center">{isNl ? 'Vervoersroutes' : 'Transport Routes'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Regional Stats */}
      <section className="bg-surface-dark py-14" ref={statsAnim.ref}>
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="font-script text-thailand-gold text-lg mb-2 block">{isNl ? 'Steden per Regio' : 'Cities by Region'}</span>
            <h2 className="font-heading text-3xl font-bold text-white">{isNl ? 'Ontdek per Regio' : 'Explore by Region'}</h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 scroll-fade-up ${statsAnim.isVisible ? 'is-visible' : ''}`}>
            {['Northern', 'Central', 'Southern'].map((region) => {
              const regionCities = cities.filter(city => city.region === region);
              return (
                <div key={region} className="text-center">
                  <div className="text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
                    <AnimatedCounter target={regionCities.length} />
                  </div>
                  <div className="text-gray-400 mb-4">{regionLabels[region]?.[lang] || region} Thailand</div>
                  <button
                    onClick={() => {
                      setSelectedRegion(region);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-thailand-red hover:text-thailand-red-400 font-medium text-sm transition-colors"
                  >
                    {isNl ? `Bekijk ${regionLabels[region]?.nl || region} Steden` : `View ${region} Cities`}
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
            <span className="section-label">{isNl ? 'Plan Je Reis' : 'Plan Your Trip'}</span>
            <h2 className="section-title mb-3">{isNl ? 'Plan Je Thailand Reis' : 'Plan Your Thailand Trip'}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isNl
                ? 'Vind de beste deals op hotels, vluchten en vervoer voor je Thailand avontuur.'
                : 'Find the best deals on hotels, flights, and transport for your Thailand adventure.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <a
              href={trackAffiliate(TRIP_GENERIC, 'hotels-primary')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-thailand-blue text-white font-medium rounded-xl hover:bg-thailand-blue-600 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <span className="text-lg">🏨</span>
              {isNl ? 'Zoek Hotels op Trip.com' : 'Search Hotels on Trip.com'}
            </a>

            <a
              href={trackAffiliate(BOOKING_GENERIC, 'hotels-secondary')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-700 text-white font-medium rounded-xl hover:bg-blue-800 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <span className="text-lg">📋</span>
              {isNl ? 'Boek op Booking.com' : 'Book on Booking.com'}
            </a>

            <a
              href={trackAffiliate(TWELVEGO_GENERIC, 'transport')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <span className="text-lg">🚂</span>
              {isNl ? 'Boek Vervoer op 12Go' : 'Book Transport on 12Go'}
            </a>
          </div>

          <p className="text-xs text-gray-400 text-center">
            {isNl
              ? 'Affiliate melding: We kunnen een commissie verdienen wanneer je boekt via onze partnerlinks, zonder extra kosten voor jou.'
              : 'Affiliate disclosure: We may earn a commission when you book through our partner links, at no extra cost to you.'}
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
