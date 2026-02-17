import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';
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

interface HotelItem {
  rank: number;
  name: string;
  description?: string;
  location?: string;
  current_price?: string;
  highlights?: string[];
  insider_tips?: string[];
  current_info?: string;
  story?: string;
  why_locals_love_it?: string;
  price_reality?: string;
  location_details?: string;
  personal_moment?: string;
}

interface Top10HotelsData {
  title: string;
  meta_description: string;
  intro: string;
  items: HotelItem[];
  city_slug: string;
  city_name: string;
  category: string;
  data_sources?: string[];
  last_perplexity_update?: string;
  generated_at: string;
  hybrid?: boolean;
}

interface Top10HotelsPageProps {
  city: City;
  hotelsData: Top10HotelsData | null;
}

export default function Top10HotelsPage({ city, hotelsData }: Top10HotelsPageProps) {
  if (!city) return <div>City not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Top 10 Hotels', href: `/city/${city.slug}/top-10-hotels/` }
  ];

  // If no data, show coming soon
  if (!hotelsData) {
    return (
      <>
        <Head>
          <title>Top 10 Hotels in {city.name.en} | Go2Thailand</title>
          <meta name="description" content={`Find the best hotels in ${city.name.en}, Thailand. Current prices, guest reviews, and booking recommendations.`} />
        </Head>

        <div className="bg-gray-50 min-h-screen">
          <section className="bg-white shadow-sm">
            <div className="container-custom py-8">
              <Breadcrumbs items={breadcrumbs} />
              <div className="text-center py-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Top 10 Hotels in {city.name.en}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Coming soon! We're working on adding current hotel recommendations with up-to-date pricing.
                </p>
                <Link href={`/city/${city.slug}/`} className="btn-primary">
                  ← Back to {city.name.en}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{hotelsData.title} | Go2Thailand</title>
        <meta name="description" content={hotelsData.meta_description} />
        <meta name="keywords" content={`${city.name.en} hotels, Thailand accommodation, ${city.name.en} resorts, hotel booking, where to stay`} />

        {/* OpenGraph for social sharing */}
        <meta property="og:title" content={hotelsData.title} />
        <meta property="og:description" content={hotelsData.meta_description} />
        <meta property="og:url" content={`https://go2-thailand.com/city/${city.slug}/top-10-hotels/`} />
        <meta property="og:type" content="article" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": hotelsData.title,
              "description": hotelsData.meta_description,
              "author": {
                "@type": "Organization",
                "name": "Go2Thailand"
              },
              "publisher": {
                "@type": "Organization", 
                "name": "Go2Thailand"
              },
              "datePublished": hotelsData.generated_at,
              "dateModified": hotelsData.last_perplexity_update || hotelsData.generated_at
            })
          }}
        />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {hotelsData.title}
              </h1>
              
              <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                {hotelsData.intro}
              </div>

              {/* Data sources badge */}
              {hotelsData.data_sources && (
                <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-6">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    📊 Current Rates
                  </span>
                  {hotelsData.hybrid && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      🤖 Expert Curated
                    </span>
                  )}
                  {hotelsData.last_perplexity_update && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      🔄 Updated {new Date(hotelsData.last_perplexity_update).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Header Banner Ad */}
            <div className="mt-8">
            </div>
          </div>
        </section>

        {/* Trip.com Hotels Widget */}
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <TripcomWidget 
              city={city.name.en}
              type="hotels"
              customTitle={`Book Your Hotel in ${city.name.en}`}
              className="max-w-4xl mx-auto"
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              
              {/* Sidebar - Desktop */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-4 space-y-6">
                  {/* Sticky Sidebar Ad */}
                  
                  {/* Quick Navigation */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Jump</h3>
                    <div className="space-y-2">
                      {hotelsData.items.slice(0, 5).map((item) => (
                        <a
                          key={item.rank}
                          href={`#hotel-${item.rank}`}
                          className="block text-sm text-gray-600 hover:text-thailand-blue transition-colors"
                        >
                          #{item.rank} {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Hotel Booking Tips */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Booking Tips</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>• Book 2-3 months ahead for best rates</p>
                      <p>• Check cancellation policies</p>
                      <p>• Compare prices across platforms</p>
                      <p>• Read recent guest reviews</p>
                    </div>
                  </div>

                  {/* City Info */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore More</h3>
                    <div className="space-y-3">
                      <Link href={`/city/${city.slug}/`} className="block text-thailand-blue hover:underline">
                        📍 {city.name.en} Guide
                      </Link>
                      <Link href={`/city/${city.slug}/top-10-restaurants/`} className="block text-thailand-blue hover:underline">
                        🍽️ Top 10 Restaurants
                      </Link>
                      <Link href={`/city/${city.slug}/top-10-attractions/`} className="block text-thailand-blue hover:underline">
                        🎯 Top 10 Attractions
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="lg:col-span-9">
                <div className="space-y-8">
                  {hotelsData.items.map((hotel, index) => (
                    <div key={hotel.rank}>
                      {/* Hotel Item */}
                      <article 
                        id={`hotel-${hotel.rank}`}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                      >
                        <div className="p-6 lg:p-8">
                          {/* Rank Badge */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-thailand-blue text-white rounded-full flex items-center justify-center text-xl font-bold">
                              {hotel.rank}
                            </div>
                            <div className="flex-1">
                              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                {hotel.name}
                              </h2>
                              {hotel.current_price && (
                                <div className="text-lg text-green-600 font-semibold mb-2">
                                  💰 {hotel.current_price}
                                </div>
                              )}
                              <div className="text-gray-600 mb-2">
                                📍 {hotel.location}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="prose prose-lg max-w-none mb-6">
                            <p>{hotel.description}</p>
                            {hotel.story && (
                              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                <p className="italic">{hotel.story}</p>
                              </div>
                            )}
                          </div>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {(hotel.highlights || hotel.insider_tips || []).map((highlight, idx) => (
                              <span
                                key={idx}
                                className="bg-thailand-blue/10 text-thailand-blue px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          {/* Current Info */}
                          {hotel.current_info && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                              <p className="text-blue-700 text-sm">
                                <strong>Current Info:</strong> {hotel.current_info}
                              </p>
                            </div>
                          )}
                        </div>
                      </article>

                      {/* Ad Placements */}
                      {index === 2 && (
                        <div className="my-8">
                        </div>
                      )}
                      
                      {index === 6 && (
                        <div className="my-8">
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Bottom Banner Ad */}
                  <div className="mt-12">
                  </div>

                  {/* Book Your Hotel - Affiliate CTA */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-8 text-center border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      🏨 Book Your Hotel in {city.name.en}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Compare rates across top booking platforms and find the best deal for your stay in {city.name.en}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                      <a
                        href="https://trip.tpo.lv/TmObooZ5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Search on Trip.com
                      </a>
                      <a
                        href="https://booking.tpo.lv/2PT1kR82"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
                      >
                        Search on Booking.com
                      </a>
                    </div>
                    <p className="text-xs text-gray-500">
                      We earn a commission at no extra cost to you
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Book Your Stay in {city.name.en}?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Explore more of {city.name.en} with our complete travel guide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href={`/city/${city.slug}/`} className="btn-primary">
                        Complete {city.name.en} Guide
                      </Link>
                      <Link href={`/city/${city.slug}/top-10-restaurants/`} className="btn-secondary">
                        Top 10 Restaurants
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCityStaticPaths();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  
  if (!city) return { notFound: true };

  // Try to load top 10 hotels data
  let hotelsData = null;
  try {
    const dataPath = path.join(process.cwd(), 'data', 'top10', `${slug}-hotels.json`);
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      hotelsData = JSON.parse(fileContent);
    }
  } catch (error) {
    // No top 10 hotels data found for this city
  }

  return { 
    props: { 
      city,
      hotelsData 
    },
    revalidate: 86400 // Revalidate daily
  };
};
