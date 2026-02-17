import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';

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

        {/* Explore Thailand - Affiliate Section */}
        <section className="bg-gradient-to-r from-thailand-blue-50 to-thailand-red-50 py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Explore Thailand
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-8">
              Book hotels, discover activities, and arrange transport across all regions of Thailand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a
                href="https://trip.tpo.lv/TmObooZ5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-center"
              >
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Search Hotels on Trip.com
              </a>

              <Link
                href="/activities/"
                className="flex items-center justify-center px-6 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl text-center"
              >
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Browse Activities
              </Link>

              <a
                href="https://12go.tpo.lv/tNA80urD"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl text-center"
              >
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Book Transport on 12Go
              </a>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              Affiliate disclosure: We may earn a commission when you book through our partner links, at no extra cost to you.
            </p>
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