import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';
import hotelAreasData from '../../../data/cities/hotel-areas.json';
import fs from 'fs';
import path from 'path';

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

interface CityHotelsPageProps {
  city: City;
  hotelData: CityHotelData | null;
  hasTop10Hotels: boolean;
}

export default function CityHotelsPage({ city, hotelData, hasTop10Hotels }: CityHotelsPageProps) {
  if (!city) return <div>City not found</div>;

  const breadcrumbs = generateBreadcrumbs(city, 'hotels');
  const metadata = generateCityMetadata(city, 'hotels');

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
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
            {hotelData ? (
              <div className="space-y-12">
                {/* Search & Book Hotels Widget - Moved to top */}
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Search & Book Hotels in {city.name.en}</h3>
                  <p className="text-gray-600 mb-6">Compare prices and find the best deals on Trip.com</p>
                  <TripcomWidget city={city.name.en} type="hotels" />
                </div>

                {/* Best Areas to Stay */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Areas to Stay in {city.name.en}</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {hotelData.areas.map((area, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{area.name}</h3>
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

                {/* Accommodation Types */}
                <div className="bg-gray-50 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Accommodation Types</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Budget</h3>
                      <p className="text-gray-600 mb-2">฿300-800/night</p>
                      <p className="text-sm text-gray-600">Hostels, guesthouses, and budget hotels with basic amenities</p>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Mid-Range</h3>
                      <p className="text-gray-600 mb-2">฿800-2,500/night</p>
                      <p className="text-sm text-gray-600">3-4 star hotels with pools, restaurants, and good service</p>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Luxury</h3>
                      <p className="text-gray-600 mb-2">฿2,500+/night</p>
                      <p className="text-sm text-gray-600">5-star hotels and resorts with premium amenities and service</p>
                    </div>
                  </div>
                </div>

                {/* Booking Tips */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Tips for {city.name.en}</h2>
                  <div className="bg-white rounded-lg shadow-lg p-6">
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

                {/* Top 10 Hotels Link */}
                {hasTop10Hotels && (
                  <div className="bg-thailand-blue rounded-lg p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Looking for Specific Recommendations?</h3>
                    <p className="mb-6 text-lg">Check out our curated list of the best hotels in {city.name.en}</p>
                    <Link href={`/city/${city.slug}/top-10-hotels/`} className="inline-block bg-white text-thailand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      View Top 10 Hotels →
                    </Link>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Hotel Guide Coming Soon
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We're working on adding hotel recommendations and accommodation guides for {city.name.en}.
                  </p>
                  <Link href={`/city/${city.slug}/`} className="btn-primary">
                    ← Back to {city.name.en}
                  </Link>
                </div>
              </div>
            )}

            {/* Book Your Hotel - Affiliate Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Book Your Hotel in {city.name.en}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Compare prices across top booking platforms and find the best deal for your stay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search on Trip.com
                </a>
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Search on Booking.com
                </a>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                We may earn a commission when you book through our links, at no extra cost to you. This helps us keep the site running.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Explore More of {city.name.en}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/city/${city.slug}/attractions/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Attractions</h4>
                    <p className="text-gray-600 text-sm">See top attractions</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/food/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
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
  
  // Get hotel data for the city
  const hotelData = (hotelAreasData as Record<string, CityHotelData>)[slug] || null;
  
  // Check if top-10 hotels file exists
  const top10HotelsPath = path.join(process.cwd(), 'data', 'top10', `${slug}-hotels.json`);
  const hasTop10Hotels = fs.existsSync(top10HotelsPath);
  
  return { props: { city, hotelData, hasTop10Hotels } };
};
