import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
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
  scraped?: {
    source: 'booking.com' | 'trip.com' | 'tripadvisor';
    price_per_night?: string;
    rating?: number;
    review_count?: number;
    address?: string;
    facilities?: string[];
    photo_url?: string;
    review_snippets?: string[];
    scraped_at: string;
  };
  affiliate_url?: string;
  trip_affiliate_url?: string;
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
  last_scraped?: string;
  generated_at: string;
  hybrid?: boolean;
  scraped?: boolean;
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
        <SEOHead
          title={`10 Best Hotels in ${city.name.en} 2026 — Prices & Reviews`}
          description={`Find the 10 best hotels in ${city.name.en}, Thailand. Compare current prices, guest reviews, and booking tips updated for 2026.`}
        />

        <div className="bg-surface-cream min-h-screen">
          <section className="bg-white shadow-sm">
            <div className="container-custom py-8">
              <Breadcrumbs items={breadcrumbs} />
              <div className="text-center py-16">
                <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
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
      <SEOHead
        title={`${hotelsData.title} 2026 — ${city.name.en}`}
        description={hotelsData.meta_description}
      >
        <meta name="keywords" content={`${city.name.en} hotels, Thailand accommodation, ${city.name.en} resorts, hotel booking, where to stay`} />
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
              "dateModified": hotelsData.last_scraped || hotelsData.last_perplexity_update || hotelsData.generated_at
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": hotelsData.title,
              "description": hotelsData.meta_description,
              "numberOfItems": hotelsData.items.length,
              "itemListElement": hotelsData.items.map((item: HotelItem) => ({
                "@type": "ListItem",
                "position": item.rank,
                "name": item.name,
                "url": `https://go2-thailand.com/city/${city.slug}/top-10-hotels/#hotel-${item.rank}`
              }))
            })
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Header Section */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="text-center max-w-4xl mx-auto">
              <span className="section-label">Top 10 Guide</span>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
                {hotelsData.title}
              </h1>
              
              <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                {hotelsData.intro}
              </div>

              {/* Data sources badge */}
              {hotelsData.data_sources && (
                <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-500 mb-6">
                  {hotelsData.scraped && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Verified Hotel Data
                    </span>
                  )}
                  {hotelsData.data_sources.includes('scraped') && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">
                      Source: {hotelsData.data_sources[0]}
                    </span>
                  )}
                  {(hotelsData.last_scraped || hotelsData.last_perplexity_update) && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      Updated {new Date(hotelsData.last_scraped || hotelsData.last_perplexity_update!).toLocaleDateString()}
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
        <section className="py-8 bg-surface-cream">
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
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-4">Quick Jump</h3>
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
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-4">Booking Tips</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>• Book 2-3 months ahead for best rates</p>
                      <p>• Check cancellation policies</p>
                      <p>• Compare prices across platforms</p>
                      <p>• Read recent guest reviews</p>
                    </div>
                  </div>

                  {/* City Info */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-4">Explore More</h3>
                    <div className="space-y-3">
                      <Link href={`/city/${city.slug}/`} className="block text-thailand-blue hover:underline">
                        {city.name.en} Guide
                      </Link>
                      <Link href={`/city/${city.slug}/top-10-restaurants/`} className="block text-thailand-blue hover:underline">
                        Top 10 Restaurants
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
                  {hotelsData.items.map((hotel, index) => (
                    <div key={hotel.rank}>
                      {/* Hotel Item */}
                      <article 
                        id={`hotel-${hotel.rank}`}
                        className="bg-white rounded-2xl shadow-md overflow-hidden"
                      >
                        <div className="p-6 lg:p-8">
                          {/* Rank Badge */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-thailand-blue text-white rounded-xl flex items-center justify-center text-xl font-bold">
                              {hotel.rank}
                            </div>
                            <div className="flex-1">
                              <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-2">
                                {hotel.name}
                              </h2>
                              {hotel.current_price && (
                                <div className="text-lg text-green-600 font-semibold mb-2">
                                  {hotel.current_price}
                                </div>
                              )}
                              {hotel.location && (
                                <div className="text-gray-600 mb-2">
                                  {hotel.location}
                                </div>
                              )}
                              <div className="flex flex-wrap items-center gap-3 mt-2">
                                {hotel.scraped?.rating && (
                                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-lg text-sm font-semibold">
                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                    {hotel.scraped.rating}/{hotel.scraped.source === 'booking.com' ? '10' : '5'}
                                  </span>
                                )}
                                {hotel.scraped?.review_count && (
                                  <span className="text-sm text-gray-500">
                                    {hotel.scraped.review_count.toLocaleString()} reviews
                                  </span>
                                )}
                                {hotel.scraped?.source && (
                                  <span className="text-xs text-gray-400 capitalize">
                                    via {hotel.scraped.source}
                                  </span>
                                )}
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' ' + city.name.en + ' Thailand')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm text-gray-500 hover:text-thailand-blue transition-colors"
                                  title="View on Google Maps"
                                >
                                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                  </svg>
                                  Maps
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="prose prose-lg max-w-none mb-6">
                            <p>{hotel.description}</p>
                            {hotel.story && (
                              <div className="bg-surface-cream rounded-xl p-4 mt-4">
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
                            <div className="bg-surface-cream border-l-4 border-thailand-red p-4 rounded-xl">
                              <p className="text-gray-700 text-sm">
                                <strong>Current Info:</strong> {hotel.current_info}
                              </p>
                            </div>
                          )}

                          {/* Booking Buttons */}
                          {(hotel.affiliate_url || hotel.trip_affiliate_url) && (
                            <div className="flex flex-wrap gap-3 mt-4">
                              {hotel.affiliate_url && (
                                <a
                                  href={hotel.affiliate_url}
                                  target="_blank"
                                  rel="noopener noreferrer sponsored"
                                  className="inline-flex items-center bg-thailand-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-thailand-blue/90 transition-colors"
                                >
                                  Check on Booking.com
                                </a>
                              )}
                              {hotel.trip_affiliate_url && (
                                <a
                                  href={hotel.trip_affiliate_url}
                                  target="_blank"
                                  rel="noopener noreferrer sponsored"
                                  className="inline-flex items-center bg-thailand-red text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-thailand-red/90 transition-colors"
                                >
                                  Check on Trip.com
                                </a>
                              )}
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
                  <div className="bg-surface-cream rounded-2xl shadow-md p-8 text-center border-0">
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
                      Book Your Hotel in {city.name.en}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Compare rates across top booking platforms and find the best deal for your stay in {city.name.en}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                      <a
                        href="https://trip.tpo.lv/TmObooZ5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-thailand-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors"
                      >
                        Search on Trip.com
                      </a>
                      <a
                        href="https://booking.tpo.lv/2PT1kR82"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-thailand-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors"
                      >
                        Search on Booking.com
                      </a>
                    </div>
                    <p className="text-xs text-gray-500">
                      We earn a commission at no extra cost to you
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
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

        <CityExploreMore citySlug={city.slug} cityName={city.name.en} currentPage="top-10-hotels" />
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
