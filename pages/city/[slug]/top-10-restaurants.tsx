import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';
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

interface RestaurantItem {
  rank: number;
  name: string;
  description?: string;
  location?: string;
  current_price?: string;
  highlights?: string[];
  current_info?: string;
  story?: string;
  insider_tips?: string[];
  why_locals_love_it?: string;
  price_reality?: string;
  location_details?: string;
  personal_moment?: string;
}

interface Top10RestaurantsData {
  title: string;
  meta_description: string;
  intro: string;
  items: RestaurantItem[];
  city_slug: string;
  city_name: string;
  category: string;
  data_sources?: string[];
  last_perplexity_update?: string;
  generated_at: string;
  hybrid?: boolean;
}

interface Top10RestaurantsPageProps {
  city: City;
  restaurantsData: Top10RestaurantsData | null;
}

export default function Top10RestaurantsPage({ city, restaurantsData }: Top10RestaurantsPageProps) {
  if (!city) return <div>City not found</div>;

  const breadcrumbs = [
    ...generateBreadcrumbs(city),
    { name: 'Top 10 Restaurants', href: `/city/${city.slug}/top-10-restaurants/` }
  ];

  // If no data, show coming soon
  if (!restaurantsData) {
    return (
      <>
        <SEOHead
          title={`10 Best Restaurants in ${city.name.en} 2026 — Local Picks`}
          description={`Discover the 10 best restaurants in ${city.name.en}, Thailand. Current prices, local favorites, and insider tips updated for 2026.`}
        />

        <div className="bg-gray-50 min-h-screen">
          <section className="bg-white shadow-sm">
            <div className="container-custom py-8">
              <Breadcrumbs items={breadcrumbs} />
              <div className="text-center py-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Top 10 Restaurants in {city.name.en}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Coming soon! We're working on adding current restaurant recommendations with up-to-date pricing.
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
        title={`${restaurantsData.title} 2026 — ${city.name.en}`}
        description={restaurantsData.meta_description}
      >
        <meta name="keywords" content={`${city.name.en} restaurants, Thailand dining, local food, ${city.name.en} cuisine, restaurant guide`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": restaurantsData.title,
              "description": restaurantsData.meta_description,
              "author": {
                "@type": "Organization",
                "name": "Go2Thailand"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Go2Thailand"
              },
              "datePublished": restaurantsData.generated_at,
              "dateModified": restaurantsData.last_perplexity_update || restaurantsData.generated_at
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
                {restaurantsData.title}
              </h1>
              
              <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                {restaurantsData.intro}
              </div>

              {/* Data sources badge */}
              {restaurantsData.data_sources && (
                <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-6">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Current Data
                  </span>
                  {restaurantsData.hybrid && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      Expert Curated
                    </span>
                  )}
                  {restaurantsData.last_perplexity_update && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      Updated {new Date(restaurantsData.last_perplexity_update).toLocaleDateString()}
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
                      {restaurantsData.items.slice(0, 5).map((item) => (
                        <a
                          key={item.rank}
                          href={`#restaurant-${item.rank}`}
                          className="block text-sm text-gray-600 hover:text-thailand-blue transition-colors"
                        >
                          #{item.rank} {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* City Info */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore More</h3>
                    <div className="space-y-3">
                      <Link href={`/city/${city.slug}/`} className="block text-thailand-blue hover:underline">
                        {city.name.en} Guide
                      </Link>
                      <Link href={`/city/${city.slug}/top-10-hotels/`} className="block text-thailand-blue hover:underline">
                        Top 10 Hotels
                      </Link>
                      <Link href={`/city/${city.slug}/top-10-attractions/`} className="block text-thailand-blue hover:underline">
                        Top 10 Attractions
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="lg:col-span-9">
                <div className="space-y-8">
                  {restaurantsData.items.map((restaurant, index) => (
                    <div key={restaurant.rank}>
                      {/* Restaurant Item */}
                      <article 
                        id={`restaurant-${restaurant.rank}`}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                      >
                        <div className="p-6 lg:p-8">
                          {/* Rank Badge */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-thailand-blue text-white rounded-full flex items-center justify-center text-xl font-bold">
                              {restaurant.rank}
                            </div>
                            <div className="flex-1">
                              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                {restaurant.name}
                              </h2>
                              {restaurant.current_price && (
                                <div className="text-lg text-green-600 font-semibold mb-2">
                                  {restaurant.current_price}
                                </div>
                              )}
                              <div className="text-gray-600 mb-2">
                                {restaurant.location}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="prose prose-lg max-w-none mb-6">
                            <p>{restaurant.description}</p>
                            {restaurant.story && (
                              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                <p className="italic">{restaurant.story}</p>
                              </div>
                            )}
                          </div>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {(restaurant.highlights || restaurant.insider_tips || []).map((highlight, idx) => (
                              <span
                                key={idx}
                                className="bg-thailand-blue/10 text-thailand-blue px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          {/* Current Info */}
                          {restaurant.current_info && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                              <p className="text-blue-700 text-sm">
                                <strong>Current Info:</strong> {restaurant.current_info}
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

                  {/* Trip.com Bundle Widget */}
                  <div className="mt-12">
                    <TripcomWidget 
                      city={city.name.en}
                      type="bundle"
                      customTitle="Stay Near These Top Restaurants"
                      className="max-w-3xl mx-auto"
                    />
                  </div>

                  {/* Book a Food Experience - Affiliate CTA */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-lg p-8 text-center border border-orange-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Book a Food Experience in {city.name.en}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Take your taste buds further with hands-on cooking classes and guided food tours in {city.name.en}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                      <a
                        href="https://klook.tpo.lv/aq6ZFxvc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Cooking Classes on Klook
                      </a>
                      <a
                        href="https://getyourguide.tpo.lv/GuAFfGGK"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                      >
                        Food Tours on GetYourGuide
                      </a>
                    </div>
                    <p className="text-xs text-gray-500">
                      We earn a commission at no extra cost to you
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Planning Your Trip to {city.name.en}?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Get the complete guide with attractions, hotels, and more insider tips.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href={`/city/${city.slug}/`} className="btn-primary">
                        Complete {city.name.en} Guide
                      </Link>
                      <Link href={`/city/${city.slug}/top-10-hotels/`} className="btn-secondary">
                        Top 10 Hotels
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

  // Try to load top 10 restaurants data
  let restaurantsData = null;
  try {
    const dataPath = path.join(process.cwd(), 'data', 'top10', `${slug}-restaurants.json`);
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      restaurantsData = JSON.parse(fileContent);
    }
  } catch (error) {
    // No top 10 restaurants data found for this city
  }

  return { 
    props: { 
      city,
      restaurantsData 
    },
    revalidate: 86400 // Revalidate daily
  };
};
