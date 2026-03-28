import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';
import SEOHead from '../../../components/SEOHead';
import CityExploreMore from '../../../components/CityExploreMore';
import hotelAreasData from '../../../data/cities/hotel-areas.json';
import fs from 'fs';
import path from 'path';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string; };
  region: string;
  province: string;
  image: string;
  categories: { hotels: { en: string; nl: string; }; };
}

interface HotelArea {
  name: string;
  best_for: string[];
  description: string;
  price_range: string;
  pros: string[];
  cons: string[];
}

interface CityHotelData {
  areas: HotelArea[];
  booking_tips: string[];
  peak_season: string;
}

interface EnhancedHotel {
  name: string;
  category: string;
  priceRange: string;
  area: string;
  description: string;
}

interface CityHotelsPageProps {
  city: City;
  hotelData: CityHotelData | null;
  hasTop10Hotels: boolean;
  enhancedHotels: EnhancedHotel[];
  affiliates: CityAffiliates | null;
}

function flattenBilingual(data: any): any {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(item => flattenBilingual(item));
  const keys = Object.keys(data);
  if (keys.includes('en') && keys.every(k => k.length <= 3)) {
    return data.en || '';
  }
  const result: any = {};
  for (const key of keys) {
    result[key] = flattenBilingual(data[key]);
  }
  return result;
}

const categoryOrder = ['budget', 'midrange', 'luxury'] as const;
const categoryLabels: Record<string, string> = {
  budget: 'Budget',
  midrange: 'Mid-Range',
  luxury: 'Luxury',
  recommended: 'Recommended',
};
const categoryColors: Record<string, string> = {
  budget: 'bg-green-100 text-green-800',
  midrange: 'bg-blue-100 text-blue-800',
  luxury: 'bg-purple-100 text-purple-800',
  recommended: 'bg-slate-100 text-slate-800',
};

export default function CityHotelsPage({ city, hotelData, hasTop10Hotels, enhancedHotels, affiliates }: CityHotelsPageProps) {
  if (!city) return <div>City not found</div>;

  // Flatten any bilingual objects in enhanced hotels
  const hotels: EnhancedHotel[] = (enhancedHotels || []).map((h: any) => flattenBilingual(h));

  // Group enhanced hotels by category
  const hotelsByCategory: Record<string, EnhancedHotel[]> = {};
  for (const hotel of hotels) {
    const rawCategory = (hotel.category || '').toLowerCase();
    const cat = categoryOrder.includes(rawCategory as any) ? rawCategory : 'recommended';
    if (!hotelsByCategory[cat]) hotelsByCategory[cat] = [];
    hotelsByCategory[cat].push(hotel);
  }
  const hasHotelContent = Boolean(hotelData) || hotels.length > 0;

  const breadcrumbs = generateBreadcrumbs(city, 'hotels');
  const baseMetadata = generateCityMetadata(city, 'hotels');

  // SEO-optimized title & description for hotels pages
  const metadata = {
    ...baseMetadata,
    title: `Where to Stay in ${city.name.en} 2026 — Best Hotels & Areas`,
    description: `Plan where to stay in ${city.name.en} with a practical guide to stronger hotel bases, better area logic, and a clearer overview of stay types and areas.`,
  };

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
      >
        <meta name="keywords" content={metadata.keywords} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                Hotels & Stay in {city.name.en}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {city.categories.hotels.en}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {hasHotelContent ? (
              <div className="space-y-12">
                {/* Best Areas to Stay */}
                {hotelData && (
                <div>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">Best Areas to Stay in {city.name.en}</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {hotelData.areas.map((area, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                        <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{area.name}</h3>
                        <p className="text-gray-600 mb-4">{area.description}</p>
                        
                        <div className="mb-4">
                          <span className="font-semibold text-gray-900">Best for: </span>
                          <span className="text-gray-600">{area.best_for.join(", ")}</span>
                        </div>
                        
                        <div className="mb-4">
                          <span className="font-semibold text-gray-900">Price Range: </span>
                          <span className="text-thailand-blue capitalize">{area.price_range}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2">✓ Pros</h4>
                            <ul className="space-y-1">
                              {area.pros.map((pro, idx) => (
                                <li key={idx} className="text-gray-600">• {pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-700 mb-2">✗ Cons</h4>
                            <ul className="space-y-1">
                              {area.cons.map((con, idx) => (
                                <li key={idx} className="text-gray-600">• {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {/* Accommodation Types */}
                {hotelData && (
                <div className="bg-surface-cream rounded-2xl p-8">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Accommodation Types</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Budget</h3>
                      <p className="text-gray-600 mb-2">Basic and practical</p>
                      <p className="text-sm text-gray-600">Simple chain hotels, guesthouses, and functional rooms where predictability matters more than extras.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Mid-Range</h3>
                      <p className="text-gray-600 mb-2">Balanced comfort</p>
                      <p className="text-sm text-gray-600">City hotels and riverside stays that add more space, better common areas, or a stronger location logic.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Higher-End</h3>
                      <p className="text-gray-600 mb-2">More deliberate stay choice</p>
                      <p className="text-sm text-gray-600">Polished riverside or full-service properties where the hotel itself becomes part of the trip instead of only a bed for the night.</p>
                    </div>
                  </div>
                </div>
                )}

                {/* Recommended Hotels from Enhanced Data */}
                {hotels.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">Recommended Hotels in {city.name.en}</h2>
                    <p className="text-gray-600 mb-6">
                      Use these hotel names as area-by-area planning references. Any live booking link on this page opens a city-wide search, not a direct listing for the specific hotel card.
                    </p>
                    {categoryOrder.map((cat) => {
                      const catHotels = hotelsByCategory[cat];
                      if (!catHotels || catHotels.length === 0) return null;
                      return (
                        <div key={cat} className="mb-8">
                          <h3 className="text-2xl font-semibold font-heading text-gray-800 mb-4">{categoryLabels[cat] || cat} Hotels</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {catHotels.map((hotel, idx) => (
                              <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <h3 className="text-lg font-bold font-heading text-gray-900 flex-1 mr-2">{hotel.name}</h3>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${categoryColors[hotel.category] || 'bg-gray-100 text-gray-800'}`}>
                                    {categoryLabels[hotel.category] || hotel.category}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {hotel.area}
                                </div>
                                <div className="flex items-center text-sm font-semibold text-thailand-blue mb-3">
                                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {hotel.priceRange}
                                </div>
                                <p className="text-gray-600 text-sm">{hotel.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Booking Tips */}
                {hotelData && (
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Hotel Planning Notes for {city.name.en}</h2>
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <ul className="space-y-3">
                      {hotelData.booking_tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-thailand-blue mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-thailand-blue bg-opacity-10 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Peak Season:</span> {hotelData.peak_season}
                      </p>
                    </div>
                  </div>
                </div>
                )}

                {/* Planning Tools */}
                <div className="bg-surface-cream rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Check Hotel Availability in {city.name.en}</h3>
                  <p className="text-gray-600 mb-6">Use the planning tools below only after you have narrowed down which area and stay style fit your trip.</p>
                  <TripcomWidget city={city.name.en} type="hotels" />
                </div>
                {/* Top 10 Hotels Link */}
                {hasTop10Hotels && (
                  <div className="bg-surface-dark rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold font-heading mb-4">Looking for Specific Recommendations?</h3>
                    <p className="mb-6 text-lg">Check out our curated list of the best hotels in {city.name.en}</p>
                    <Link href={`/city/${city.slug}/top-10-hotels/`} className="inline-block bg-white text-thailand-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                      View Top 10 Hotels →
                    </Link>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                    Where to Stay in {city.name.en}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Detailed hotel guides for {city.name.en} are being prepared. Browse our city overview for travel tips and general accommodation advice.
                  </p>
                  <Link href={`/city/${city.slug}/`} className="btn-primary">
                    ← Back to {city.name.en}
                  </Link>
                </div>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
                Explore More of {city.name.en}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/city/${city.slug}/attractions/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Attractions</h4>
                    <p className="text-gray-600 text-sm">See top attractions</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/food/`} className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Food & Dining</h4>
                    <p className="text-gray-600 text-sm">Discover local cuisine</p>
                  </div>
                </Link>
              </div>
            <CityExploreMore citySlug={city.slug} cityName={city.name.en} currentPage="hotels" />
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

  // Get hotel data for the city
  const hotelData = (hotelAreasData as Record<string, CityHotelData>)[slug] || null;
  
  // Load enhanced data for scraped hotels
  let enhancedHotels: any[] = [];
  try {
    const enhancedDataPath = path.join(process.cwd(), 'data', 'enhanced', `${slug}.json`);
    if (fs.existsSync(enhancedDataPath)) {
      const enhancedRaw = fs.readFileSync(enhancedDataPath, 'utf-8');
      const enhancedData = JSON.parse(enhancedRaw);
      if (enhancedData.topHotels && Array.isArray(enhancedData.topHotels)) {
        enhancedHotels = enhancedData.topHotels;
      } else if (enhancedData.top_hotels && Array.isArray(enhancedData.top_hotels)) {
        enhancedHotels = enhancedData.top_hotels;
      }
    }
  } catch (e) {
    // No enhanced data available
  }

  // Check if top-10 hotels file exists
  const top10HotelsPath = path.join(process.cwd(), 'data', 'top10', `${slug}-hotels.json`);
  const hasTop10Hotels = fs.existsSync(top10HotelsPath);

  const affiliates = getAffiliates(params.slug as string);

  return { props: { city, hotelData, hasTop10Hotels, enhancedHotels, affiliates }, revalidate: 86400 };
};
