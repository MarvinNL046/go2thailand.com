import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import CityCard from '../../components/CityCard';
import { getAllCities } from '../../lib/cities';

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
  highlights: string[];
  cities: string[];
  climate: string;
  bestTimeToVisit: string;
  image: string;
  geography?: string;
  culture?: string;
  cuisine?: string;
  transportation?: string;
  budgetInfo?: string;
  topActivities?: string[];
  hiddenGems?: string[];
  localFestivals?: string[];
  travelTips?: string[];
  whatToPack?: string[];
  statistics?: {
    area?: string;
    population?: string;
    provinces?: string;
    coastline?: string;
    highestPeak?: string;
    majorCity?: string;
  };
  categories?: {
    attractions?: {
      en: string;
      nl: string;
    };
    cities?: {
      en: string;
      nl: string;
    };
    climate?: {
      en: string;
      nl: string;
    };
  };
  tags?: string[];
  seo: {
    metaTitle: {
      en: string;
      nl: string;
    };
    metaDescription: {
      en: string;
      nl: string;
    };
  };
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
  image: string;
  highlights: string[];
}

interface RegionPageProps {
  region: Region;
  cities: City[];
}

export default function RegionPage({ region, cities }: RegionPageProps) {
  if (!region) {
    return <div>Region not found</div>;
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Regions', href: '/region/' },
    { name: region.name.en, href: `/region/${region.slug}/` }
  ];

  return (
    <>
      <Head>
        <title>{region.seo.metaTitle.en}</title>
        <meta name="description" content={region.seo.metaDescription.en} />
        <meta name="keywords" content={`${region.name.en}, Thailand, ${region.cities.join(', ')}, travel guide, attractions, culture`} />
        <meta property="og:title" content={region.seo.metaTitle.en} />
        <meta property="og:description" content={region.seo.metaDescription.en} />
        <meta property="og:image" content={region.image} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://go2-thailand.com/region/${region.slug}/`} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={region.image}
              alt={`${region.name.en}, Thailand`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-end">
            <div className="container-custom pb-12 text-white">
              <div className="max-w-4xl">
                <div className="flex items-center mb-4">
                  <span className="bg-thailand-red text-white px-3 py-1 rounded text-sm font-semibold mr-3">
                    {cities.length} Cities
                  </span>
                  <span className="text-gray-200 text-sm">
                    Best time: {region.bestTimeToVisit}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  {region.name.en}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">
                  {region.description.en}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Content */}
        <section className="bg-white">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Region Overview */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    About {region.name.en}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {region.description.en}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 my-8 p-6 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cities</h4>
                        <p className="text-2xl font-bold text-thailand-blue">
                          {cities.length}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Best Time</h4>
                        <p className="text-lg font-medium text-thailand-blue">
                          {region.bestTimeToVisit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Geography & Culture */}
                {(region.geography || region.culture) && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Geography & Culture
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {region.geography && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Geography</h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{region.geography}</p>
                        </div>
                      )}
                      
                      {region.culture && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Culture</h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{region.culture}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Cuisine & Transportation */}
                {(region.cuisine || region.transportation) && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Cuisine & Getting Around
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {region.cuisine && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Local Cuisine</h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{region.cuisine}</p>
                        </div>
                      )}
                      
                      {region.transportation && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Transportation</h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{region.transportation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Top Activities */}
                {region.topActivities && region.topActivities.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      🎯 Top Activities
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {region.topActivities.map((activity, index) => (
                        <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{activity}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hidden Gems */}
                {region.hiddenGems && region.hiddenGems.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      💎 Hidden Gems
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {region.hiddenGems.map((gem, index) => (
                        <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{gem}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regional Highlights */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Regional Highlights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {region.highlights.map((highlight, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{highlight}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Cities in Region */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Cities in {region.name.en}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Explore {cities.length} amazing cities in {region.name.en}, each offering unique experiences and attractions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cities.map((city) => (
                      <CityCard key={city.id} city={city} />
                    ))}
                  </div>
                </div>

                {/* Regional Travel Guide */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Travel Guide for {region.name.en}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Getting Around */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Getting Around</h3>
                      </div>
                      <div className="space-y-3 text-sm text-gray-600">
                        {region.slug === 'northern' && (
                          <>
                            <p>• Domestic flights connect major cities</p>
                            <p>• Buses are reliable for inter-city travel</p>
                            <p>• Motorbike rentals popular in mountain areas</p>
                            <p>• Red trucks (songthaews) for local transport</p>
                          </>
                        )}
                        {region.slug === 'central' && (
                          <>
                            <p>• Excellent train and bus connections</p>
                            <p>• BTS/MRT in Bangkok for metro transport</p>
                            <p>• Easy day trips from Bangkok</p>
                            <p>• Taxi and Grab widely available</p>
                          </>
                        )}
                        {region.slug === 'southern' && (
                          <>
                            <p>• Ferries for island hopping</p>
                            <p>• Domestic flights to major destinations</p>
                            <p>• Buses connect mainland cities</p>
                            <p>• Longtail boats for local transport</p>
                          </>
                        )}
                        {region.slug === 'isaan' && (
                          <>
                            <p>• Limited flights to major cities</p>
                            <p>• Buses connect all provinces</p>
                            <p>• Local songthaews and tuk-tuks</p>
                            <p>• Motorbike rentals common</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* What to Expect */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">What to Expect</h3>
                      </div>
                      <div className="space-y-3 text-sm text-gray-600">
                        {region.slug === 'northern' && (
                          <>
                            <p>• Cooler temperatures, especially evenings</p>
                            <p>• Rich cultural heritage and temples</p>
                            <p>• Mountain landscapes and hill tribes</p>
                            <p>• Traditional crafts and markets</p>
                          </>
                        )}
                        {region.slug === 'central' && (
                          <>
                            <p>• Mix of modern and historical attractions</p>
                            <p>• Bustling city life and quiet historic sites</p>
                            <p>• Great food scene and shopping</p>
                            <p>• Easy access to beaches and nature</p>
                          </>
                        )}
                        {region.slug === 'southern' && (
                          <>
                            <p>• Tropical climate year-round</p>
                            <p>• Beautiful beaches and crystal clear water</p>
                            <p>• Amazing seafood and fresh fruit</p>
                            <p>• Vibrant nightlife and beach culture</p>
                          </>
                        )}
                        {region.slug === 'isaan' && (
                          <>
                            <p>• Strong Lao influence and unique culture</p>
                            <p>• Spiciest and most flavorful Thai cuisine</p>
                            <p>• Traditional festivals and village life</p>
                            <p>• Most affordable region in Thailand</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Quick Facts */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cities:</span>
                      <span className="font-medium">{cities.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Time:</span>
                      <span className="font-medium">{region.bestTimeToVisit}</span>
                    </div>
                    {region.statistics && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Area:</span>
                          <span className="font-medium">{region.statistics.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Population:</span>
                          <span className="font-medium">{region.statistics.population}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Provinces:</span>
                          <span className="font-medium">{region.statistics.provinces}</span>
                        </div>
                        {region.statistics.coastline && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Coastline:</span>
                            <span className="font-medium">{region.statistics.coastline}</span>
                          </div>
                        )}
                        {region.statistics.highestPeak && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Highest Peak:</span>
                            <span className="font-medium text-sm">{region.statistics.highestPeak}</span>
                          </div>
                        )}
                        {region.statistics.majorCity && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Major City:</span>
                            <span className="font-medium text-sm">{region.statistics.majorCity}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Budget Information */}
                {region.budgetInfo && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Budget Guide</h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{region.budgetInfo}</p>
                  </div>
                )}

                {/* Local Festivals */}
                {region.localFestivals && region.localFestivals.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Local Festivals</h3>
                    </div>
                    <div className="space-y-2">
                      {region.localFestivals.map((festival, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{festival}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Travel Tips */}
                {region.travelTips && region.travelTips.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Pro Tips</h3>
                    </div>
                    <div className="space-y-3">
                      {region.travelTips.slice(0, 3).map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-4 h-4 bg-blue-400 rounded-full mr-3 flex-shrink-0 mt-0.5"></div>
                          <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What to Pack */}
                {region.whatToPack && region.whatToPack.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Packing List</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {region.whatToPack.slice(0, 6).map((item, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {/* Regional Highlights */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Regional Specialties</h3>
                  <div className="space-y-3">
                    {region.highlights.slice(0, 4).map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-thailand-blue rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Cities */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Cities</h3>
                  <div className="space-y-3">
                    {cities.slice(0, 4).map((city) => (
                      <Link key={city.id} href={`/city/${city.slug}/`}>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                          <span className="text-gray-700 font-medium">{city.name.en}</span>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Tips */}
        <section className="bg-gray-50 py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Tips for Visiting {region.name.en}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">When to Visit</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {region.bestTimeToVisit} offers the best weather conditions for exploring {region.name.en}. 
                  Plan accordingly for the most comfortable experience.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Getting Around</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Transportation varies by region. Research the best options for moving between 
                  cities and local transport within each destination.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Tips</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Each region has unique customs and traditions. Learning basic Thai phrases 
                  and respecting local customs will enhance your experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Explore More
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/region/" className="group">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">All Regions</h3>
                    <p className="text-gray-600 text-sm">Compare all Thai regions</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/city/" className="group">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">All Cities</h3>
                    <p className="text-gray-600 text-sm">Browse all destinations</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/food/" className="group">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Thai Food</h3>
                    <p className="text-gray-600 text-sm">Explore Thai cuisine</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/top-10/" className="group">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Top 10 Lists</h3>
                    <p className="text-gray-600 text-sm">Best attractions & more</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Define paths directly to avoid dynamic imports during build
  const paths = [
    { params: { slug: 'northern' } },
    { params: { slug: 'central' } },
    { params: { slug: 'southern' } },
    { params: { slug: 'isaan' } }
  ];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fs = require('fs');
  const path = require('path');
  
  const slug = params?.slug as string;
  
  // Read specific region data directly
  const regionPath = path.join(process.cwd(), 'data', 'regions', `${slug}.json`);
  
  if (!fs.existsSync(regionPath)) {
    return {
      notFound: true,
    };
  }

  const region = JSON.parse(fs.readFileSync(regionPath, 'utf8'));
  
  // Get cities in this region - hardcoded mapping to ensure it works
  const allCities = getAllCities();
  let cities = [];
  
  if (slug === 'northern') {
    cities = allCities.filter((city: any) => 
      ['chiang-mai', 'chiang-rai', 'sukhothai'].includes(city.slug)
    );
  } else if (slug === 'central') {
    cities = allCities.filter((city: any) => 
      ['bangkok', 'ayutthaya', 'pattaya'].includes(city.slug)
    );
  } else if (slug === 'southern') {
    cities = allCities.filter((city: any) => 
      ['phuket', 'krabi', 'hat-yai', 'surat-thani'].includes(city.slug)
    );
  } else if (slug === 'isaan') {
    // For now, Isaan uses placeholder cities since we don't have these cities in our database yet
    // In the future, add cities like: khon-kaen, udon-thani, nakhon-ratchasima, ubon-ratchathani
    cities = [];
  }
  
  return {
    props: {
      region,
      cities,
    },
  };
};