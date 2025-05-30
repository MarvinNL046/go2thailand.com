import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { getAllCities } from '../../lib/cities';
import CityCard from '../../components/CityCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import EzoicAd from '../../components/EzoicAd';
import { EZOIC_PLACEMENT_IDS } from '../../lib/ads/ezoic-config';

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

  return (
    <>
      <Head>
        <title>Thailand Cities - Complete Travel Guide | Go2Thailand</title>
        <meta 
          name="description" 
          content="Explore all major cities in Thailand. From Bangkok to Chiang Mai, discover the best destinations, attractions, food, and culture across Thailand." 
        />
        <meta name="keywords" content="Thailand cities, Bangkok, Chiang Mai, Phuket, Pattaya, Krabi, Thailand destinations, Thai cities guide" />
        <meta property="og:title" content="Thailand Cities - Complete Travel Guide | Go2Thailand" />
        <meta property="og:description" content="Explore all major cities in Thailand. From Bangkok to Chiang Mai, discover the best destinations, attractions, food, and culture." />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Thailand Cities
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      id="search"
                      type="text"
                      placeholder="Search cities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-thailand-blue focus:border-thailand-blue"
                    />
                  </div>
                </div>

                {/* Region Filter */}
                <div className="flex space-x-2">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedRegion === region
                          ? 'bg-thailand-blue text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
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

        {/* 💰 CITIES INDEX HEADER AD - HIGH VISIBILITY */}
        <section className="bg-white py-6">
          <div className="container-custom">
            <EzoicAd 
              placementId={EZOIC_PLACEMENT_IDS.CITY_INDEX_BANNER}
              size="banner"
              className="mx-auto"
              lazy={false}
            />
          </div>
        </section>

        {/* Cities Grid */}
        <section className="section-padding">
          <div className="container-custom">
            {/* Results Info */}
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {filteredCities.length} of {cities.length} cities
                {selectedRegion !== 'all' && ` in ${selectedRegion} Thailand`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            {/* Cities Grid */}
            {filteredCities.length > 0 ? (
              <>
                {/* First batch of cities */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {filteredCities.slice(0, 6).map((city) => (
                    <CityCard key={city.id} city={city} />
                  ))}
                </div>

                {/* 💰 MID-CONTENT AD - STRATEGIC PLACEMENT */}
                {filteredCities.length > 6 && (
                  <div className="mb-12">
                    <EzoicAd 
                      placementId={EZOIC_PLACEMENT_IDS.CITY_INDEX_GRID}
                      size="rectangle"
                      className="mx-auto"
                      lazy={true}
                    />
                  </div>
                )}

                {/* Remaining cities */}
                {filteredCities.length > 6 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCities.slice(6).map((city) => (
                      <CityCard key={city.id} city={city} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0M3 3h18" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No cities found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search terms or filter criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Regional Stats */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cities by Region</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Northern', 'Central', 'Southern'].map((region) => {
                const regionCities = cities.filter(city => city.region === region);
                return (
                  <div key={region} className="text-center">
                    <div className="text-3xl font-bold text-thailand-blue mb-2">
                      {regionCities.length}
                    </div>
                    <div className="text-gray-600 mb-4">{region} Thailand</div>
                    <button
                      onClick={() => setSelectedRegion(region)}
                      className="text-thailand-blue hover:text-thailand-red font-medium"
                    >
                      View {region} Cities →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
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
