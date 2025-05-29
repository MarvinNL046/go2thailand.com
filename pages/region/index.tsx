import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import EzoicAd from '../../components/EzoicAd';
import { EZOIC_AD_UNITS } from '../../lib/ads/ezoic-config';

interface Region {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
  };
  description: {
    en: string;
    nl: string;
  };
  image: string;
  cities: string[];
  highlights: string[];
}

interface RegionsPageProps {
  regions: Region[];
}

export default function RegionsPage({ regions }: RegionsPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Regions', href: '/region/' }
  ];

  return (
    <>
      <Head>
        <title>Thailand Regions - Complete Travel Guide | Go2Thailand</title>
        <meta 
          name="description" 
          content="Explore Thailand's three main regions: Northern, Central, and Southern Thailand. Discover unique attractions, climate, culture, and travel tips for each region." 
        />
        <meta name="keywords" content="Thailand regions, Northern Thailand, Central Thailand, Southern Thailand, Thailand travel guide, Thai regions" />
        <meta property="og:title" content="Thailand Regions - Complete Travel Guide | Go2Thailand" />
        <meta property="og:description" content="Explore Thailand's three main regions: Northern, Central, and Southern Thailand. Discover unique attractions, climate, and culture." />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Thailand Regions
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover Thailand's diverse regions, each offering unique experiences, 
                landscapes, and cultural treasures. From the mountains of the North to 
                the beaches of the South.
              </p>
            </div>
          </div>
        </section>

        {/* 💰 REGIONS INDEX HEADER AD - HIGH VISIBILITY */}
        <section className="bg-white py-6">
          <div className="container-custom">
            <EzoicAd 
              adUnit={EZOIC_AD_UNITS.CITY_INDEX_BANNER}
              size="banner"
              className="mx-auto"
              lazy={false}
            />
          </div>
        </section>

        {/* Regions Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {regions.map((region, index) => (
                <div key={region.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Region Image */}
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                      src={region.image}
                      alt={region.name.en}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  {/* Region Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {region.name.en}
                    </h2>
                    
                    <p className="text-gray-600 mb-4">
                      {region.description.en}
                    </p>

                    {/* Cities */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Cities in this region:</h3>
                      <div className="flex flex-wrap gap-2">
                        {region.cities.map((city) => (
                          <span
                            key={city}
                            className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Highlights:</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {region.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center">
                            <svg className="w-4 h-4 text-thailand-blue mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link 
                      href={`/region/${region.slug}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-thailand-blue text-white font-medium rounded-md hover:bg-thailand-red transition-colors"
                    >
                      Explore {region.name.en}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 💰 MID-CONTENT AD */}
        <section className="bg-white py-8">
          <div className="container-custom">
            <EzoicAd 
              adUnit={EZOIC_AD_UNITS.CITY_INDEX_GRID}
              size="rectangle"
              className="mx-auto"
              lazy={true}
            />
          </div>
        </section>

        {/* Regional Comparison */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Compare Thailand's Regions
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Region</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Best For</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Climate</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Cities</th>
                  </tr>
                </thead>
                <tbody>
                  {regions.map((region) => (
                    <tr key={region.id} className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <Link 
                          href={`/region/${region.slug}`}
                          className="font-medium text-thailand-blue hover:text-thailand-red"
                        >
                          {region.name.en}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {region.highlights.slice(0, 2).join(', ')}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {region.slug === 'northern' && 'Cooler, dry winters'}
                        {region.slug === 'central' && 'Hot, tropical monsoon'}
                        {region.slug === 'southern' && 'Hot, humid, tropical'}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {region.cities.length} cities
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Travel Tips */}
        <section className="bg-gray-50 py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Regional Travel Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Northern Thailand</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Best visited November to February</li>
                  <li>• Pack warm clothes for evenings</li>
                  <li>• Perfect for cultural experiences</li>
                  <li>• Great for trekking and nature</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Central Thailand</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Year-round destination</li>
                  <li>• Easy transportation links</li>
                  <li>• Mix of urban and historical sites</li>
                  <li>• Gateway to other regions</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Southern Thailand</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Best from December to April</li>
                  <li>• Perfect for beach lovers</li>
                  <li>• Great for island hopping</li>
                  <li>• Amazing seafood cuisine</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  const path = require('path');

  // Read regions index file directly
  const regionsIndexPath = path.join(process.cwd(), 'data', 'regions', 'index.json');
  const regions = JSON.parse(fs.readFileSync(regionsIndexPath, 'utf8'));
  
  return {
    props: {
      regions,
    },
  };
};