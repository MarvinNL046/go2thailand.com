import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCities } from '../../lib/cities';
import fs from 'fs';
import path from 'path';

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string; };
  region: string;
  province: string;
  image: string;
}

interface Top10Guide {
  city: City;
  title: string;
  meta_description: string;
  last_updated?: string;
  item_count: number;
  has_current_data: boolean;
}

interface Top10AttractionsIndexProps {
  availableGuides: Top10Guide[];
  featuredGuides: Top10Guide[];
}

export default function Top10AttractionsIndex({ availableGuides, featuredGuides }: Top10AttractionsIndexProps) {

  return (
    <>
      <Head>
        <title>Top 10 Attraction Guides | Must-See Places in Thailand | Go2Thailand</title>
        <meta name="description" content="Discover Thailand's must-see attractions with our comprehensive Top 10 guides. Current entrance fees, opening hours, and visitor tips in Bangkok, Phuket, Chiang Mai and more." />
        <meta name="keywords" content="Thailand attractions, top 10 attractions, sightseeing, tourist attractions, Bangkok attractions, Phuket activities, Chiang Mai temples, Thailand tourism" />
        <link rel="canonical" href="https://go2-thailand.com/top-10/attractions/" />
        
        {/* OpenGraph for social sharing */}
        <meta property="og:title" content="Top 10 Attraction Guides | Must-See Places in Thailand" />
        <meta property="og:description" content="Discover Thailand's must-see attractions with current entrance fees, opening hours, and visitor tips." />
        <meta property="og:url" content="https://go2-thailand.com/top-10/attractions/" />
        <meta property="og:type" content="website" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Top 10 Attraction Guides Thailand",
              "description": "Comprehensive attraction guides for Thailand's top destinations",
              "publisher": {
                "@type": "Organization",
                "name": "Go2Thailand"
              },
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": availableGuides.length,
                "itemListElement": availableGuides.map((guide, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "url": `https://go2-thailand.com/city/${guide.city.slug}/top-10-attractions/`,
                  "name": guide.title
                }))
              }
            })
          }}
        />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                🎯 Top 10 Attraction <span className="text-yellow-300">Guides</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                Discover Thailand's must-see places. Current entrance fees, opening hours, and insider visitor tips.
              </p>
              
              {/* Trust badges */}
              <div className="flex justify-center items-center gap-4 text-sm mb-8">
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">
                  📊 Current Info
                </span>
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">
                  🤖 Expert Curated
                </span>
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">
                  🎫 Updated Prices
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Header Ad */}
        <section className="bg-white py-6">
          <div className="container-custom">
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {availableGuides.length}
                </div>
                <div className="text-gray-600">City Guides</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {availableGuides.reduce((sum, guide) => sum + guide.item_count, 0)}+
                </div>
                <div className="text-gray-600">Attractions</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {availableGuides.filter(guide => guide.has_current_data).length}
                </div>
                <div className="text-gray-600">With Current Info</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Updated Info</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Guides */}
        {featuredGuides.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  🔥 Featured Attraction Guides
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Most popular guides with the latest information and visitor tips
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {featuredGuides.map((guide) => (
                  <Link key={guide.city.slug} href={`/city/${guide.city.slug}/top-10-attractions/`} className="group">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border border-gray-100">
                      <div className="relative h-48">
                        <Image
                          src={guide.city.image}
                          alt={`${guide.city.name.en} attractions`}
                          layout="fill"
                          objectFit="cover"
                          className="brightness-90"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {guide.city.region}
                          </span>
                        </div>
                        {guide.has_current_data && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              📊 Current Info
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {guide.city.name.en} Attractions
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {guide.meta_description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>🎯 {guide.item_count} attractions</span>
                          {guide.last_updated && (
                            <span>🔄 Updated {new Date(guide.last_updated).toLocaleDateString()}</span>
                          )}
                        </div>
                        
                        <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-center group-hover:bg-green-700 transition-colors">
                          View Attraction Guide →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mid-content Ad */}
              <div className="mb-8">
              </div>
            </div>
          </section>
        )}

        {/* Visitor Tips */}
        <section className="section-padding bg-green-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                💡 Smart Visitor Tips
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Make the most of your sightseeing with these insider tips
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-4">🌅</div>
                <h3 className="font-semibold text-gray-900 mb-2">Visit Early</h3>
                <p className="text-gray-600 text-sm">Arrive early morning to avoid crowds and heat, especially at popular temples and landmarks.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-4">🎫</div>
                <h3 className="font-semibold text-gray-900 mb-2">Check Hours</h3>
                <p className="text-gray-600 text-sm">Verify opening hours before visiting, as they can change for holidays and special events.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-4">👕</div>
                <h3 className="font-semibold text-gray-900 mb-2">Dress Code</h3>
                <p className="text-gray-600 text-sm">Respect local customs and dress codes, especially when visiting temples and religious sites.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-4">💧</div>
                <h3 className="font-semibold text-gray-900 mb-2">Stay Hydrated</h3>
                <p className="text-gray-600 text-sm">Bring sunscreen and water, especially for outdoor attractions in Thailand's tropical climate.</p>
              </div>
            </div>
          </div>
        </section>

        {/* All Guides */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                All Attraction Guides
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Complete collection of attraction guides across Thailand
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableGuides.map((guide) => (
                <Link key={guide.city.slug} href={`/city/${guide.city.slug}/top-10-attractions/`} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group border border-gray-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {guide.city.name.en}
                        </h3>
                        {guide.has_current_data && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                            Current Info
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {guide.city.province} Province • {guide.city.region} Thailand
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>🎯 {guide.item_count} attractions</span>
                        {guide.last_updated && (
                          <span>🔄 {new Date(guide.last_updated).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Complete Your Thailand Experience
              </h3>
              <p className="text-gray-600 mb-8">
                Explore our complete collection of Top 10 guides for restaurants and hotels too.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/top-10/restaurants/" className="bg-thailand-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-thailand-red-600 transition-colors">
                  🍽️ Restaurant Guides
                </Link>
                <Link href="/top-10/hotels/" className="bg-thailand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-thailand-blue-600 transition-colors">
                  🏨 Hotel Guides
                </Link>
              </div>

              {/* Bottom Ad */}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cities = getAllCities();
  const availableGuides: Top10Guide[] = [];
  const featuredGuides: Top10Guide[] = [];

  // Check which cities have attraction guides
  for (const city of cities) {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'top10', `${city.slug}-attractions.json`);
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(fileContent);
        
        const guide: Top10Guide = {
          city,
          title: data.title,
          meta_description: data.meta_description,
          last_updated: data.last_perplexity_update || data.generated_at,
          item_count: data.items?.length || 10,
          has_current_data: !!(data.data_sources && data.data_sources.length > 0)
        };
        
        availableGuides.push(guide);
        
        // Featured guides: Bangkok, Phuket, Chiang Mai
        if (['bangkok', 'phuket', 'chiang-mai'].includes(city.slug)) {
          featuredGuides.push(guide);
        }
      }
    } catch (error) {
      // Error reading top 10 attractions data for this city
    }
  }

  return {
    props: {
      availableGuides,
      featuredGuides
    },
    revalidate: 86400 // Revalidate daily
  };
};
