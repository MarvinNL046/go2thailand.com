import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs, getCityImageForSection, getEnhancedAttractionsByCity } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';

interface Attraction {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
  };
  type: string;
  description: {
    en: string;
    nl: string;
  };
  highlights: string[];
  image: string;
  entrance_fee: {
    thb: number;
    usd: number;
  };
  enhanced_description?: string;
}

interface City {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
  };
  region: string;
  province: string;
  description: {
    en: string;
    nl: string;
  };
  highlights: string[];
  image: string;
  images?: {
    hero?: string;
    attractions?: string;
    restaurants?: string;
    hotels?: string;
    food?: string;
  };
  categories: {
    attractions: {
      en: string;
      nl: string;
    };
    food: {
      en: string;
      nl: string;
    };
    hotels: {
      en: string;
      nl: string;
    };
  };
  enhanced_description?: string;
}

interface CityAttractionsPageProps {
  city: City;
  attractions: Attraction[];
}

export default function CityAttractionsPage({ city, attractions }: CityAttractionsPageProps) {
  if (!city) {
    return <div>City not found</div>;
  }

  const breadcrumbs = generateBreadcrumbs(city, 'attractions');
  const metadata = generateCityMetadata(city, 'attractions');

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph?.title || metadata.title} />
        <meta property="og:description" content={metadata.openGraph?.description || metadata.description} />
        <meta property="og:image" content={metadata.openGraph?.images?.[0]?.url || getCityImageForSection(city, 'attractions')} />
        <link rel="canonical" href={`https://go2-thailand.com/city/${city.slug}/attractions/`} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-80 lg:h-96 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={getCityImageForSection(city, 'attractions')}
              alt={`Attractions in ${city.name.en}, Thailand`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-thailand-blue-900/80 to-thailand-red-900/60"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container-custom text-white">
              <div className="max-w-4xl">
                <div className="flex items-center mb-4">
                  <span className="bg-thailand-red text-white px-3 py-1 rounded-lg text-sm font-semibold mr-3">
                    {city.region} Thailand
                  </span>
                  <span className="text-gray-200 text-sm">
                    🎯 Attractions Guide
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  Attractions in {city.name.en}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">
                  {city.categories.attractions.en}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Header Banner Ad */}
        <section className="bg-white py-4">
          <div className="container-custom">
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b border-gray-200">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Attractions Overview */}
                <div className="mb-12">
                  <div className="bg-gradient-to-r from-thailand-blue-50 to-thailand-red-50 rounded-xl p-8 mb-8">
                    <h2 className="text-3xl font-bold text-thailand-blue-900 mb-4">
                      🏛️ Must-Visit Attractions
                    </h2>
                    <p className="text-thailand-blue-700 text-lg leading-relaxed">
                      {city.enhanced_description 
                        ? `Discover the incredible attractions that make ${city.name.en} special. ${city.enhanced_description.substring(0, 200)}...`
                        : `Explore the top attractions in ${city.name.en}, from ancient temples to modern landmarks. Each destination offers unique insights into Thai culture and history.`
                      }
                    </p>
                  </div>

                  {/* Trip.com Hotels Widget */}
                  <div className="mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                      <h3 className="text-2xl font-bold text-thailand-blue-900 mb-4 text-center">
                        📍 Book Your Stay Near These Attractions
                      </h3>
                      <p className="text-gray-600 text-center mb-6">
                        Find the perfect hotel close to {city.name.en}'s top attractions
                      </p>
                      <TripcomWidget city={city.name.en} type="hotels" />
                    </div>
                  </div>

                  {/* Attractions Grid */}
                  {attractions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {attractions.map((attraction, index) => (
                        <Link 
                          key={attraction.id} 
                          href={`/city/${city.slug}/attractions/${attraction.slug}/`}
                          className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-thailand-blue-100"
                        >
                          {/* Attraction Image */}
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={attraction.image}
                              alt={attraction.name.en}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            
                            {/* Ranking Badge */}
                            <div className="absolute top-4 left-4">
                              <div className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <span className="text-thailand-blue font-bold text-sm">#{index + 1}</span>
                              </div>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-4 right-4">
                              <span className="bg-thailand-gold text-thailand-blue-900 px-2 py-1 rounded-lg text-xs font-semibold capitalize">
                                {attraction.type}
                              </span>
                            </div>

                            {/* Entrance Fee */}
                            {attraction.entrance_fee.thb > 0 && (
                              <div className="absolute bottom-4 left-4">
                                <span className="bg-white/90 backdrop-blur-sm text-thailand-blue-900 px-2 py-1 rounded-lg text-xs font-semibold">
                                  ฿{attraction.entrance_fee.thb}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-thailand-blue-900 mb-3 group-hover:text-thailand-red transition-colors">
                              {attraction.name.en}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                              {attraction.enhanced_description?.substring(0, 150) || attraction.description.en}
                              {(attraction.enhanced_description?.length > 150 || attraction.description.en.length > 150) && '...'}
                            </p>
                            
                            {/* Highlights */}
                            {attraction.highlights.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-4">
                                {attraction.highlights.slice(0, 3).map((highlight, idx) => (
                                  <span 
                                    key={idx}
                                    className="bg-thailand-blue-50 text-thailand-blue-700 px-2 py-1 rounded text-xs"
                                  >
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Action Bar */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center text-thailand-blue text-sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{city.name.en}</span>
                              </div>
                              <div className="text-thailand-blue hover:text-thailand-red font-medium text-sm flex items-center transition-colors group">
                                <span>Learn More</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-thailand-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-thailand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Attractions Coming Soon
                      </h3>
                      <p className="text-gray-600 mb-6">
                        We're working on adding detailed attraction information for {city.name.en}.
                      </p>
                    </div>
                  )}
                </div>

                {/* In-Content Ad */}
                <div className="mb-12">
                </div>

                {/* Travel Tips for Attractions */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                  <h3 className="text-2xl font-bold text-thailand-blue-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-thailand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Tips for Visiting Attractions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-red rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Visit early morning to avoid crowds</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-red rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Dress modestly when visiting temples</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-red rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Bring water and stay hydrated</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-blue rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Check opening hours before visiting</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-blue rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Respect local customs and traditions</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-blue rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Bring comfortable walking shoes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Navigation */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-thailand-blue-900 mb-6 text-center">
                    Explore More of {city.name.en}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link 
                      href={`/city/${city.slug}/food/`}
                      className="group flex items-center p-6 border-2 border-thailand-blue-100 rounded-xl hover:border-thailand-red hover:bg-thailand-red-50 transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-thailand-blue to-thailand-red rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-thailand-blue-900 group-hover:text-thailand-red text-lg mb-1">Food & Dining</h4>
                        <p className="text-gray-600 text-sm">{city.categories.food.en}</p>
                      </div>
                    </Link>

                    <Link 
                      href={`/city/${city.slug}/hotels/`}
                      className="group flex items-center p-6 border-2 border-thailand-blue-100 rounded-xl hover:border-thailand-red hover:bg-thailand-red-50 transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-thailand-red to-thailand-blue rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-thailand-blue-900 group-hover:text-thailand-red text-lg mb-1">Hotels & Stay</h4>
                        <p className="text-gray-600 text-sm">{city.categories.hotels.en}</p>
                      </div>
                    </Link>
                  </div>

                  <div className="text-center mt-8">
                    <Link 
                      href={`/city/${city.slug}/`} 
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-thailand-blue to-thailand-red text-white font-semibold rounded-lg hover:from-thailand-blue-600 hover:to-thailand-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to {city.name.en} Overview
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-lg font-bold text-thailand-blue-900 mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Total Attractions:</span>
                      <span className="font-bold text-thailand-blue">{attractions.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Region:</span>
                      <span className="font-medium text-thailand-blue">{city.region}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Province:</span>
                      <span className="font-medium text-thailand-blue">{city.province}</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Ad */}

                {/* Travel Tips */}
                <div className="bg-gradient-to-br from-thailand-gold-50 to-thailand-blue-50 rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-bold text-thailand-blue-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-thailand-gold-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Pro Tip
                  </h3>
                  <p className="text-thailand-blue-700 text-sm leading-relaxed">
                    Many attractions in {city.name.en} are within walking distance of each other. 
                    Plan your route to maximize your time and minimize travel between sites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Sticky Ad */}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCityStaticPaths();
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  
  if (!city) {
    return {
      notFound: true,
    };
  }

  // Load enhanced attractions data
  const attractions = getEnhancedAttractionsByCity(slug);
  
  return {
    props: {
      city,
      attractions,
    },
  };
};
