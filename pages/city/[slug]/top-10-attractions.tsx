import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
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

interface AttractionItem {
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

interface Top10AttractionsData {
  title: string;
  meta_description: string;
  intro: string;
  items: AttractionItem[];
  city_slug: string;
  city_name: string;
  category: string;
  data_sources?: string[];
  last_perplexity_update?: string;
  generated_at: string;
  hybrid?: boolean;
}

interface Top10AttractionsPageProps {
  city: City;
  attractionsData: Top10AttractionsData | null;
}

export default function Top10AttractionsPage({ city, attractionsData }: Top10AttractionsPageProps) {
  if (!city) return <div>City not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Top 10 Attractions', href: `/city/${city.slug}/top-10-attractions/` }
  ];

  // If no data, show coming soon
  if (!attractionsData) {
    return (
      <>
        <SEOHead
          title={`10 Best Attractions in ${city.name.en} 2026 — Must-See`}
          description={`Discover the 10 must-see attractions in ${city.name.en}, Thailand. Current entrance fees, opening hours, and visitor tips for 2026.`}
        />

        <div className="bg-gray-50 min-h-screen">
          <section className="bg-white shadow-sm">
            <div className="container-custom py-8">
              <Breadcrumbs items={breadcrumbs} />
              <div className="text-center py-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Top 10 Attractions in {city.name.en}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Coming soon! We're working on adding current attraction recommendations with up-to-date pricing.
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
      <SEOHead
        title={`${attractionsData.title} 2026 — ${city.name.en}`}
        description={attractionsData.meta_description}
      >
        <meta name="keywords" content={`${city.name.en} attractions, Thailand tourism, ${city.name.en} sightseeing, things to do, tourist attractions`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": attractionsData.title,
              "description": attractionsData.meta_description,
              "author": {
                "@type": "Organization",
                "name": "Go2Thailand"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Go2Thailand"
              },
              "datePublished": attractionsData.generated_at,
              "dateModified": attractionsData.last_perplexity_update || attractionsData.generated_at
            })
          }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {attractionsData.title}
              </h1>
              
              <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                {attractionsData.intro}
              </div>

              {/* Data sources badge */}
              {attractionsData.data_sources && (
                <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-6">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    📊 Current Info
                  </span>
                  {attractionsData.hybrid && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      🤖 Expert Curated
                    </span>
                  )}
                  {attractionsData.last_perplexity_update && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      🔄 Updated {new Date(attractionsData.last_perplexity_update).toLocaleDateString()}
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
                      {attractionsData.items.slice(0, 5).map((item) => (
                        <a
                          key={item.rank}
                          href={`#attraction-${item.rank}`}
                          className="block text-sm text-gray-600 hover:text-thailand-blue transition-colors"
                        >
                          #{item.rank} {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Visitor Tips */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Visitor Tips</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>• Visit early morning to avoid crowds</p>
                      <p>• Check opening hours before going</p>
                      <p>• Bring sunscreen and water</p>
                      <p>• Respect local customs and dress codes</p>
                      <p>• Keep entrance tickets for discounts</p>
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
                      <Link href={`/city/${city.slug}/top-10-hotels/`} className="block text-thailand-blue hover:underline">
                        🏨 Top 10 Hotels
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="lg:col-span-9">
                <div className="space-y-8">
                  {attractionsData.items.map((attraction, index) => (
                    <div key={attraction.rank}>
                      {/* Attraction Item */}
                      <article 
                        id={`attraction-${attraction.rank}`}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                      >
                        <div className="p-6 lg:p-8">
                          {/* Rank Badge */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-thailand-blue text-white rounded-full flex items-center justify-center text-xl font-bold">
                              {attraction.rank}
                            </div>
                            <div className="flex-1">
                              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                {attraction.name}
                              </h2>
                              {attraction.current_price && (
                                <div className="text-lg text-green-600 font-semibold mb-2">
                                  🎫 {attraction.current_price}
                                </div>
                              )}
                              <div className="text-gray-600 mb-2">
                                📍 {attraction.location}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="prose prose-lg max-w-none mb-6">
                            <p>{attraction.description}</p>
                            {attraction.story && (
                              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                <p className="italic">{attraction.story}</p>
                              </div>
                            )}
                          </div>

                          {/* Highlights */}
                          {attraction.highlights && attraction.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {attraction.highlights.map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className="bg-thailand-blue/10 text-thailand-blue px-3 py-1 rounded-full text-sm font-medium"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Current Info */}
                          {attraction.current_info && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                              <p className="text-blue-700 text-sm">
                                <strong>Current Info:</strong> {attraction.current_info}
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

                  {/* Book Tickets & Tours - Affiliate CTA */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-8 text-center border border-green-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      🎟️ Book Tickets & Tours in {city.name.en}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Skip the queues and book tickets, guided tours, and unique experiences in {city.name.en} online.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                      <a
                        href="https://klook.tpo.lv/aq6ZFxvc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Book on Klook
                      </a>
                      <a
                        href="https://getyourguide.tpo.lv/GuAFfGGK"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                      >
                        Book on GetYourGuide
                      </a>
                    </div>
                    <Link href="/activities/" className="text-sm text-thailand-blue hover:underline">
                      Browse all activities in Thailand →
                    </Link>
                    <p className="text-xs text-gray-500 mt-2">
                      We earn a commission at no extra cost to you
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Explore {city.name.en}?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Get the complete travel guide with dining, accommodation, and more local insights.
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
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  
  if (!city) return { notFound: true };

  // Try to load top 10 attractions data
  let attractionsData = null;
  try {
    const dataPath = path.join(process.cwd(), 'data', 'top10', `${slug}-attractions.json`);
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      attractionsData = JSON.parse(fileContent);
    }
  } catch (error) {
    // No top 10 attractions data found for this city
  }

  return { 
    props: { 
      city,
      attractionsData 
    },
    revalidate: 86400 // Revalidate daily
  };
};
