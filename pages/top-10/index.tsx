import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import EzoicAd from '../../components/EzoicAd';
import { EZOIC_PLACEMENT_IDS } from '../../lib/ads/ezoic-config';

interface Top10IndexProps {
  totalGuides: {
    attractions: number;
    restaurants: number;
    hotels: number;
  };
}

export default function Top10Index({ totalGuides }: Top10IndexProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Top 10 Guides', href: '/top-10/' }
  ];

  const categories = [
    {
      slug: 'attractions',
      title: 'Top 10 Attractions',
      description: 'Discover the must-see attractions and landmarks in each Thai city',
      icon: '🎯',
      count: totalGuides.attractions,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      slug: 'restaurants',
      title: 'Top 10 Restaurants',
      description: 'Find the best dining experiences and local food gems',
      icon: '🍽️',
      count: totalGuides.restaurants,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      slug: 'hotels',
      title: 'Top 10 Hotels',
      description: 'Discover the finest accommodations for every budget',
      icon: '🏨',
      count: totalGuides.hotels,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  return (
    <>
      <Head>
        <title>Top 10 Guides - Best Attractions, Restaurants & Hotels in Thailand | Go2Thailand</title>
        <meta 
          name="description" 
          content="Comprehensive Top 10 guides for Thailand's best attractions, restaurants, and hotels. Current prices, opening hours, and insider tips for every major destination." 
        />
        <meta name="keywords" content="Thailand top 10, best attractions Thailand, top restaurants Thailand, best hotels Thailand, Thailand travel guides" />
        <meta property="og:title" content="Top 10 Guides - Best of Thailand | Go2Thailand" />
        <meta property="og:description" content="Comprehensive Top 10 guides for Thailand's best attractions, restaurants, and hotels." />
        <link rel="canonical" href="https://go2-thailand.com/top-10/" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                🏆 Top 10 Guides
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover Thailand's best attractions, restaurants, and hotels with our 
                comprehensive Top 10 guides. Current prices, hours, and insider tips included.
              </p>
            </div>
          </div>
        </section>

        {/* Header Banner Ad */}
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

        {/* Categories Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {categories.map((category) => (
                <Link key={category.slug} href={`/top-10/${category.slug}/`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <div className={`bg-gradient-to-r ${category.color} ${category.hoverColor} transition-all duration-300 p-6 text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-4xl">{category.icon}</div>
                        <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                          <span className="text-sm font-semibold">{category.count} Guides</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                      <p className="text-white text-opacity-90">{category.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="text-sm">View all guides</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mid-Content Ad */}
            <div className="mb-12">
              <EzoicAd 
                placementId={EZOIC_PLACEMENT_IDS.CITY_INDEX_GRID}
                size="rectangle"
                className="mx-auto"
                lazy={true}
              />
            </div>

            {/* What Makes Our Guides Special */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                What Makes Our Top 10 Guides Special?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Current Information</h3>
                  <p className="text-gray-600 text-sm">Up-to-date prices, hours, and contact details</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Locally Verified</h3>
                  <p className="text-gray-600 text-sm">Recommendations tested by local experts</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Insider Tips</h3>
                  <p className="text-gray-600 text-sm">Hidden gems and local secrets included</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">City Specific</h3>
                  <p className="text-gray-600 text-sm">Tailored guides for each Thai destination</p>
                </div>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Popular Destination Guides
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Krabi', 'Chiang Rai', 'Ayutthaya', 'Hat Yai', 'Sukhothai', 'Surat Thani'].map((city) => (
                  <Link key={city} href={`/city/${city.toLowerCase().replace(' ', '-')}/`}>
                    <div className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition-colors cursor-pointer">
                      <h3 className="font-medium text-gray-900 text-sm">{city}</h3>
                      <p className="text-gray-500 text-xs mt-1">View guides</p>
                    </div>
                  </Link>
                ))}
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

  // Count available guides for each category
  const totalGuides = {
    attractions: 0,
    restaurants: 0,
    hotels: 0
  };

  try {
    const top10Dir = path.join(process.cwd(), 'data', 'top10');
    if (fs.existsSync(top10Dir)) {
      const files = fs.readdirSync(top10Dir);
      
      files.forEach((file: string) => {
        if (file.endsWith('-attractions.json')) totalGuides.attractions++;
        if (file.endsWith('-restaurants.json')) totalGuides.restaurants++;
        if (file.endsWith('-hotels.json')) totalGuides.hotels++;
      });
    }
  } catch (error) {
    console.warn('Could not count top10 guides:', error);
  }

  return {
    props: {
      totalGuides,
    },
  };
};