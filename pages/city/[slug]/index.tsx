import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs, getRelatedCities, getCityImageForSection } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CityCard from '../../../components/CityCard';
import Sidebar from '../../../components/Sidebar';
import TripcomWidget from '../../../components/TripcomWidget';
import FeedbackForm from '../../../components/FeedbackForm';
import { useEffect, useState } from 'react';
import { useTranslatedContent } from '../../../hooks/useTranslatedContent';
import { useRouter } from 'next/router';
import { formatNumber, formatPopulation } from '../../../utils/formatNumber';
import DebugContent from '../../../components/DebugContent';

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
  population: number;
  highlights: string[];
  location: {
    lat: number;
    lng: number;
  };
  image: string;
  images?: {
    hero?: string;
    attractions?: string;
    restaurants?: string;
    hotels?: string;
    food?: string;
  };
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
  categories: {
    food: {
      en: string;
      nl: string;
    };
    hotels: {
      en: string;
      nl: string;
    };
    attractions: {
      en: string;
      nl: string;
    };
  };
  tags: string[];
  // Enhanced content
  enhanced_description?: string;
  top_attractions?: Array<{
    name: string;
    description: string;
  }>;
  top_restaurants?: Array<{
    name: string;
    cuisine?: string;
    description: string;
  }>;
  top_hotels?: Array<{
    name: string;
    price_range?: string;
    description: string;
  }>;
  travel_tips?: string[];
  best_time_to_visit?: {
    season: string;
    weather: string;
    reasons: string;
  };
  budget_info?: {
    daily_budget?: {
      budget: string;
      mid: string;
      luxury: string;
    };
  };
  // New engaging content types
  hidden_gems?: Array<{
    name: string;
    story: string;
    how_to_find?: string;
    best_time?: string;
    local_insights?: string[];
  }>;
  authentic_experiences?: Array<{
    name: string;
    story: string;
    cultural_significance?: string;
    how_to_participate?: string;
    insights?: string[];
  }>;
  foodie_adventures?: Array<{
    name: string;
    story: string;
    dish?: string;
    where_to_find?: string;
    price_range?: string;
    ordering_tips?: string[];
  }>;
  local_insights?: (string | {
    observation?: string;
    tip?: string;
    surprise?: string;
  })[];
  seasonal_secrets?: {
    best_season?: string;
    why?: string;
    local_festivals?: string[];
    seasonal_foods?: string[];
    insider_tips?: string[];
  };
  budget_reality?: {
    budget?: string;
    mid_range?: string;
    luxury?: string;
    examples?: string[];
    money_saving_tricks?: string[];
    hidden_costs?: string[];
  };
  ai_generated?: boolean;
}

interface CityPageProps {
  city: City;
  relatedCities: any[];
}

export default function CityPage({ city, relatedCities }: CityPageProps) {
  const router = useRouter();
  const { locale = 'en' } = router;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllHiddenGems, setShowAllHiddenGems] = useState(false);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllFoodAdventures, setShowAllFoodAdventures] = useState(false);
  const [showAllLocalInsights, setShowAllLocalInsights] = useState(false);
  const [showAllTravelTips, setShowAllTravelTips] = useState(false);
  const [showAllAttractions, setShowAllAttractions] = useState(false);
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);
  
  // Load translated content
  const { content: translatedContent, loading: translationLoading } = useTranslatedContent('city', city?.slug);
  
  if (!city) {
    return <div>City not found</div>;
  }

  // Merge translated content with base city data
  const displayCity = translatedContent || city;
  
  // Ensure we always get strings, not objects
  let cityName: string;
  let cityDescription: string;
  
  // Handle city name
  if (typeof translatedContent?.name === 'string') {
    cityName = translatedContent.name;
  } else if (typeof city.name === 'object' && city.name.en) {
    cityName = city.name.en;
  } else if (typeof city.name === 'string') {
    cityName = city.name;
  } else {
    cityName = 'Unknown City'; // Fallback
  }
  
  // Handle city description
  if (typeof translatedContent?.description === 'string') {
    cityDescription = translatedContent.description;
  } else if (typeof city.description === 'object' && city.description.en) {
    cityDescription = city.description.en;
  } else if (typeof city.description === 'string') {
    cityDescription = city.description;
  } else {
    cityDescription = ''; // Fallback
  }
  
  const cityHighlights = Array.isArray(translatedContent?.highlights) 
    ? translatedContent.highlights 
    : city.highlights;

  const breadcrumbs = generateBreadcrumbs(city);
  const metadata = generateCityMetadata(city);
  
  // Load Trip.com widget on client side
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://tpembd.com/content?trs=384595&shmarker=602467&locale=en&curr=USD&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121';
    script.charset = 'utf-8';
    
    const widgetContainer = document.getElementById('trip-com-widget');
    if (widgetContainer && widgetContainer.children.length === 0) {
      widgetContainer.appendChild(script);
    }
    
    // Cleanup
    return () => {
      if (widgetContainer && script.parentNode) {
        widgetContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph?.title || metadata.title} />
        <meta property="og:description" content={metadata.openGraph?.description || metadata.description} />
        <meta property="og:image" content={metadata.openGraph?.images?.[0]?.url || getCityImageForSection(city, 'hero')} />
        <meta property="og:type" content={metadata.openGraph?.type || 'website'} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Debug component - only shows in development */}
        <DebugContent 
          data={{
            locale,
            cityName,
            cityDescription,
            translatedContent: translatedContent ? {
              name: translatedContent.name,
              description: translatedContent.description,
              hasTranslation: true
            } : { hasTranslation: false }
          }}
          title="Translation Debug"
        />
        {/* Hero Section */}
        <section className="relative h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={getCityImageForSection(city, 'hero')}
              alt={`${cityName}, Thailand`}
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
                    {city.region}
                  </span>
                  <span className="text-gray-200 text-sm">
                    {city.province} Province
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  {cityName}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">
                  {city.enhanced_description 
                    ? city.enhanced_description.substring(0, 200) + '...'
                    : cityDescription}
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
              <div className="lg:col-span-2 order-last lg:order-first">
                {/* City Description */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    About {city.name.en}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {city.enhanced_description ? (
                      <div className="space-y-4">
                        {(() => {
                          const paragraphs = city.enhanced_description.split('\n\n');
                          const firstParagraph = paragraphs[0];
                          const hasMoreContent = paragraphs.length > 1;
                          
                          if (!showFullDescription) {
                            return (
                              <>
                                <p className="text-gray-700 leading-relaxed">
                                  {firstParagraph.length > 300 
                                    ? firstParagraph.substring(0, 300) + '...' 
                                    : firstParagraph}
                                </p>
                                {(hasMoreContent || firstParagraph.length > 300) && (
                                  <button
                                    onClick={() => setShowFullDescription(true)}
                                    className="text-thailand-blue hover:text-thailand-red font-medium flex items-center gap-2 mt-4"
                                  >
                                    Read more about {city.name.en}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                )}
                              </>
                            );
                          }
                          
                          return (
                            <>
                              {paragraphs.map((paragraph, index) => (
                                <p key={index} className="text-gray-700 leading-relaxed">
                                  {paragraph}
                                </p>
                              ))}
                              <button
                                onClick={() => setShowFullDescription(false)}
                                className="text-thailand-blue hover:text-thailand-red font-medium flex items-center gap-2 mt-4"
                              >
                                Show less
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                            </>
                          );
                        })()}
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {city.description.en}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-6 my-8 p-6 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Population</h4>
                        <p className="text-2xl font-bold text-thailand-blue">
                          {formatNumber(city.population)}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Region</h4>
                        <p className="text-2xl font-bold text-thailand-blue">
                          {city.region}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hidden Gems */}
                {city.hidden_gems && city.hidden_gems.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      🏰 Hidden Gems
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {(showAllHiddenGems ? city.hidden_gems : city.hidden_gems.slice(0, 2)).map((gem, index) => (
                        <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start mb-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{gem.name}</h3>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <p className="text-gray-700 italic leading-relaxed">"{gem.story}"</p>
                            
                            {gem.how_to_find && (
                              <div className="bg-white bg-opacity-60 rounded-lg p-3">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">How to find:</span> {gem.how_to_find}
                                </p>
                              </div>
                            )}
                            
                            {gem.best_time && (
                              <div className="bg-white bg-opacity-60 rounded-lg p-3">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Best time:</span> {gem.best_time}
                                </p>
                              </div>
                            )}
                            
                            {gem.local_insights && gem.local_insights.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {gem.local_insights.map((insight, i) => (
                                  <span key={i} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                                    {insight}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {city.hidden_gems.length > 2 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowAllHiddenGems(!showAllHiddenGems)}
                          className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2 mx-auto"
                        >
                          {showAllHiddenGems ? 'Show less' : `Discover ${city.hidden_gems.length - 2} more hidden gems`}
                          <svg className={`w-4 h-4 transition-transform ${showAllHiddenGems ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Authentic Experiences */}
                {city.authentic_experiences && city.authentic_experiences.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      🎭 Authentic Experiences
                    </h2>
                    <div className="space-y-6">
                      {(showAllExperiences ? city.authentic_experiences : city.authentic_experiences.slice(0, 1)).map((experience, index) => (
                        <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 mb-3">{experience.name}</h3>
                              <p className="text-gray-700 text-lg leading-relaxed mb-4">"{experience.story}"</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {experience.cultural_significance && (
                                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Cultural Significance</h4>
                                    <p className="text-sm text-gray-600">{experience.cultural_significance}</p>
                                  </div>
                                )}
                                
                                {experience.how_to_participate && (
                                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">How to Participate</h4>
                                    <p className="text-sm text-gray-600">{experience.how_to_participate}</p>
                                  </div>
                                )}
                              </div>
                              
                              {experience.insights && experience.insights.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="font-semibold text-gray-900 mb-2">Insider Tips</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.insights.map((insight, i) => (
                                      <span key={i} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {insight}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {city.authentic_experiences.length > 1 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowAllExperiences(!showAllExperiences)}
                          className="text-orange-600 hover:text-orange-800 font-medium flex items-center gap-2 mx-auto"
                        >
                          {showAllExperiences ? 'Show less' : `Explore ${city.authentic_experiences.length - 1} more experiences`}
                          <svg className={`w-4 h-4 transition-transform ${showAllExperiences ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Top Attractions */}
                {city.top_attractions && city.top_attractions.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Top Attractions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(showAllAttractions ? city.top_attractions.slice(0, 6) : city.top_attractions.slice(0, 3)).map((attraction, index) => (
                        <div key={index} className="card hover:shadow-lg transition-shadow">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-thailand-blue rounded-full flex items-center justify-center mr-4 mt-1">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 mb-2">{attraction.name}</h3>
                              <p className="text-gray-600 text-sm">{attraction.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {city.top_attractions.length > 3 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowAllAttractions(!showAllAttractions)}
                          className="text-thailand-blue hover:text-thailand-red font-medium flex items-center gap-2 mx-auto"
                        >
                          {showAllAttractions ? 'Show less' : `View ${showAllAttractions ? 0 : Math.min(3, city.top_attractions.length - 3)} more attractions`}
                          <svg className={`w-4 h-4 transition-transform ${showAllAttractions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Where to Stay Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    🏨 Where to Stay in {city.name.en}
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Budget Hotels */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">💰 Budget Hotels</h3>
                        <p className="text-gray-600 text-sm mb-3">Great value accommodations from $10-30/night</p>
                        <a 
                          href={`https://trip.tp.st/yeelXIdE`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View Budget Options →
                        </a>
                      </div>
                      
                      {/* Mid-Range Hotels */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">⭐ Mid-Range Hotels</h3>
                        <p className="text-gray-600 text-sm mb-3">Comfortable stays from $30-80/night</p>
                        <a 
                          href={`https://trip.tp.st/yeelXIdE`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View Mid-Range →
                        </a>
                      </div>
                      
                      {/* Luxury Hotels */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">✨ Luxury Hotels</h3>
                        <p className="text-gray-600 text-sm mb-3">Premium experiences from $80+/night</p>
                        <a 
                          href={`https://trip.tp.st/yeelXIdE`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View Luxury Hotels →
                        </a>
                      </div>
                    </div>
                    
                    {/* Trip.com CTA */}
                    <div className="text-center">
                      <a 
                        href={`https://trip.tp.st/yeelXIdE`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        🔍 Search All {city.name.en} Hotels on Trip.com
                      </a>
                      <p className="text-xs text-gray-600 mt-2">
                        💡 We earn a commission when you book through our links at no extra cost to you
                      </p>
                    </div>
                  </div>
                </div>

                {/* Travel Services Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    ✈️ Complete Travel Services for {city.name.en}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Hotel + Flight Bundle */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="text-3xl mb-2">✈️🏨</div>
                        <h3 className="font-semibold text-gray-900 mb-2">Flight + Hotel</h3>
                        <p className="text-sm text-gray-600 mb-3">Save up to 20% with bundles</p>
                        <a 
                          href="https://trip.tp.st/DrPeHSFI"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                          Book Bundle →
                        </a>
                      </div>
                    </div>
                    
                    {/* Airport Transfers */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🚕</div>
                        <h3 className="font-semibold text-gray-900 mb-2">Airport Transfers</h3>
                        <p className="text-sm text-gray-600 mb-3">Door-to-door convenience</p>
                        <a 
                          href="https://trip.tp.st/h4kJjHv9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Book Transfer →
                        </a>
                      </div>
                    </div>
                    
                    {/* Car Rental */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🚗</div>
                        <h3 className="font-semibold text-gray-900 mb-2">Car Rental</h3>
                        <p className="text-sm text-gray-600 mb-3">Explore at your own pace</p>
                        <a 
                          href="https://trip.tp.st/oLwZ3h1y"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-700 transition-colors"
                        >
                          Rent a Car →
                        </a>
                      </div>
                    </div>
                    
                    {/* Hotels (repeat for balance) */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🏨</div>
                        <h3 className="font-semibold text-gray-900 mb-2">Hotels</h3>
                        <p className="text-sm text-gray-600 mb-3">1.2M+ properties worldwide</p>
                        <a 
                          href="https://trip.tp.st/yeelXIdE"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Find Hotels →
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      💡 Book with confidence - 24/7 customer support & best price guarantee
                    </p>
                  </div>
                </div>

                {/* In-Content Ad */}
                <div className="mb-12">
                </div>

                {/* Foodie Adventures */}
                {city.foodie_adventures && city.foodie_adventures.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      🍜 Foodie Adventures
                    </h2>
                    <div className="space-y-8">
                      {(showAllFoodAdventures ? city.foodie_adventures : city.foodie_adventures.slice(0, 2)).map((food, index) => (
                        <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-2xl font-bold text-gray-900">{food.name}</h3>
                                {food.price_range && (
                                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {food.price_range}
                                  </span>
                                )}
                              </div>
                              
                              <p className="text-gray-700 text-lg leading-relaxed mb-4 italic">"{food.story}"</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {food.dish && (
                                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Dish:</span> {food.dish}
                                    </p>
                                  </div>
                                )}
                                
                                {food.where_to_find && (
                                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Where to find:</span> {food.where_to_find}
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              {food.ordering_tips && food.ordering_tips.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Ordering Tips</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {food.ordering_tips.map((tip, i) => (
                                      <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                        {tip}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {city.foodie_adventures.length > 2 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowAllFoodAdventures(!showAllFoodAdventures)}
                          className="text-yellow-600 hover:text-yellow-800 font-medium flex items-center gap-2 mx-auto"
                        >
                          {showAllFoodAdventures ? 'Show less' : `Discover ${city.foodie_adventures.length - 2} more foodie adventures`}
                          <svg className={`w-4 h-4 transition-transform ${showAllFoodAdventures ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Top Restaurants */}
                {city.top_restaurants && city.top_restaurants.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Best Restaurants
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {city.top_restaurants.slice(0, 6).map((restaurant, index) => (
                        <div key={index} className="card hover:shadow-lg transition-shadow">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                              {restaurant.cuisine && (
                                <span className="bg-thailand-blue text-white px-2 py-1 rounded text-xs">
                                  {restaurant.cuisine}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">{restaurant.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Hotels */}
                {city.top_hotels && city.top_hotels.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Recommended Hotels
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {city.top_hotels.slice(0, 4).map((hotel, index) => (
                        <div key={index} className="card hover:shadow-lg transition-shadow">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-gray-900">{hotel.name}</h3>
                              {hotel.price_range && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                  {hotel.price_range}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">{hotel.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Local Insights */}
                {city.local_insights && city.local_insights.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      🤝 Local Insights
                    </h2>
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">What Locals Want You to Know</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(showAllLocalInsights ? city.local_insights : city.local_insights.slice(0, 4)).map((insight, index) => (
                          <div key={index} className="bg-white bg-opacity-70 rounded-lg p-4 border border-teal-100">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                {typeof insight === 'string' ? (
                                  <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
                                ) : (
                                  <div className="space-y-2">
                                    {insight.observation && (
                                      <h4 className="font-semibold text-gray-900 text-sm">{insight.observation}</h4>
                                    )}
                                    {insight.tip && (
                                      <p className="text-gray-700 text-sm leading-relaxed">{insight.tip}</p>
                                    )}
                                    {insight.surprise && (
                                      <p className="text-teal-600 text-xs italic mt-1">💡 {insight.surprise}</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {city.local_insights.length > 4 && (
                        <div className="text-center mt-6">
                          <button
                            onClick={() => setShowAllLocalInsights(!showAllLocalInsights)}
                            className="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-2 mx-auto"
                          >
                            {showAllLocalInsights ? 'Show less' : `Discover ${city.local_insights.length - 4} more insights`}
                            <svg className={`w-4 h-4 transition-transform ${showAllLocalInsights ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Travel Tips */}
                {city.travel_tips && city.travel_tips.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Travel Tips
                    </h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <ul className="space-y-3">
                        {(showAllTravelTips ? city.travel_tips : city.travel_tips.slice(0, 3)).map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                      {city.travel_tips.length > 3 && (
                        <div className="text-center mt-6">
                          <button
                            onClick={() => setShowAllTravelTips(!showAllTravelTips)}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mx-auto"
                          >
                            {showAllTravelTips ? 'Show less' : `View ${city.travel_tips.length - 3} more tips`}
                            <svg className={`w-4 h-4 transition-transform ${showAllTravelTips ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Explore {city.name.en}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Food */}
                    <Link href={`/city/${city.slug}/food/`}>
                      <div className="card hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Food & Dining</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {city.categories.food.en}
                          </p>
                          <span className="text-thailand-blue font-medium">
                            Explore Food →
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Hotels */}
                    <Link href={`/city/${city.slug}/hotels/`}>
                      <div className="card hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Hotels & Stay</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {city.categories.hotels.en}
                          </p>
                          <span className="text-thailand-blue font-medium">
                            Find Hotels →
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Attractions */}
                    <Link href={`/city/${city.slug}/attractions/`}>
                      <div className="card hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Attractions</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {city.categories.attractions.en}
                          </p>
                          <span className="text-thailand-blue font-medium">
                            See Attractions →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <Sidebar mobilePosition="top">
                {/* Quick Facts */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-medium">{city.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Province:</span>
                      <span className="font-medium">{city.province}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Population:</span>
                      <span className="font-medium">{formatNumber(city.population)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coordinates:</span>
                      <span className="font-medium text-sm">
                        {city.location.lat.toFixed(4)}, {city.location.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trip.com Search Widget */}
                <div className="mb-8">
                  <TripcomWidget 
                    city={city.name.en} 
                    type="searchbox" 
                    className=""
                  />
                  
                  {/* Trip.com Features */}
                  <div className="card mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Why Book with Trip.com?</h4>
                    <div className="text-xs text-gray-600 space-y-2">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>24/7 Customer Service</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Best Price Guarantee</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>1.2M+ Hotels Worldwide</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Booking Process</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 💰 SIDEBAR AD - THE MONEY MAKER! */}

                {/* Enhanced Seasonal Secrets */}
                {city.seasonal_secrets ? (
                  <div className="card mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">🌅 Best Time to Visit</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-blue-800">{city.seasonal_secrets.best_season || 'Cool Season'}</span>
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Recommended</span>
                        </div>
                        <p className="text-sm text-blue-700 mb-2">{city.seasonal_secrets.why || 'Most comfortable weather'}</p>
                      </div>

                      {city.seasonal_secrets.local_festivals && city.seasonal_secrets.local_festivals.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-sm mr-2">🎊</span> Local Festivals
                          </h4>
                          <div className="space-y-1">
                            {city.seasonal_secrets.local_festivals.map((festival, i) => (
                              <span key={i} className="block text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                {festival}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {city.seasonal_secrets.seasonal_foods && city.seasonal_secrets.seasonal_foods.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-sm mr-2">🍎</span> Seasonal Foods
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {city.seasonal_secrets.seasonal_foods.map((food, i) => (
                              <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {city.seasonal_secrets.insider_tips && city.seasonal_secrets.insider_tips.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-sm mr-2">💡</span> Insider Tips
                          </h4>
                          <div className="space-y-1">
                            {city.seasonal_secrets.insider_tips.slice(0, 2).map((tip, i) => (
                              <p key={i} className="text-xs text-gray-600 bg-yellow-50 p-2 rounded border-l-2 border-yellow-400">
                                {tip}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : city.best_time_to_visit ? (
                  <div className="card mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Best Time to Visit</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-thailand-blue">{city.best_time_to_visit.season}</span>
                        <p className="text-sm text-gray-600 mt-1">{city.best_time_to_visit.weather}</p>
                      </div>
                      <p className="text-sm text-gray-700">{city.best_time_to_visit.reasons}</p>
                    </div>
                  </div>
                ) : null}

                {/* Enhanced Budget Reality */}
                {city.budget_reality ? (
                  <div className="card mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">💰 Budget Reality</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex justify-between p-2 bg-green-50 rounded">
                          <span className="text-sm text-gray-600">Budget:</span>
                          <span className="font-bold text-green-700">{city.budget_reality.budget || '$25-40/day'}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-blue-50 rounded">
                          <span className="text-sm text-gray-600">Mid-range:</span>
                          <span className="font-bold text-blue-700">{city.budget_reality.mid_range || '$40-80/day'}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-purple-50 rounded">
                          <span className="text-sm text-gray-600">Luxury:</span>
                          <span className="font-bold text-purple-700">{city.budget_reality.luxury || '$80+/day'}</span>
                        </div>
                      </div>

                      {city.budget_reality.examples && city.budget_reality.examples.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-sm mr-2">📊</span> Real Prices
                          </h4>
                          <div className="space-y-1">
                            {city.budget_reality.examples.slice(0, 3).map((example, i) => (
                              <div key={i} className="text-xs text-gray-600 bg-gray-50 p-2 rounded flex justify-between">
                                <span>{example.split(':')[0]}:</span>
                                <span className="font-medium">{example.split(':')[1]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {city.budget_reality.money_saving_tricks && city.budget_reality.money_saving_tricks.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-sm mr-2">💡</span> Money-Saving Tricks
                          </h4>
                          <div className="space-y-1">
                            {city.budget_reality.money_saving_tricks.slice(0, 2).map((trick, i) => (
                              <p key={i} className="text-xs text-green-700 bg-green-50 p-2 rounded border-l-2 border-green-400">
                                {trick}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {city.budget_reality.hidden_costs && city.budget_reality.hidden_costs.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-sm mr-2">⚠️</span> Hidden Costs
                          </h4>
                          <div className="space-y-1">
                            {city.budget_reality.hidden_costs.slice(0, 2).map((cost, i) => (
                              <p key={i} className="text-xs text-red-700 bg-red-50 p-2 rounded border-l-2 border-red-400">
                                {cost}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : city.budget_info?.daily_budget ? (
                  <div className="card mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Budget</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium text-green-600">{city.budget_info.daily_budget.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mid-range:</span>
                        <span className="font-medium text-blue-600">{city.budget_info.daily_budget.mid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Luxury:</span>
                        <span className="font-medium text-purple-600">{city.budget_info.daily_budget.luxury}</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Tags */}
                {city.tags && city.tags.length > 0 && (
                  <div className="card mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {city.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Sidebar>
            </div>
          </div>
        </section>

        {/* Feedback Form */}
        <section className="section-padding">
          <div className="container-custom max-w-3xl mx-auto">
            <FeedbackForm 
              pageTitle={`${city.name.en} Travel Guide`}
              pageUrl={`/city/${city.slug}`}
            />
          </div>
        </section>

        {/* Related Cities */}
        {relatedCities && relatedCities.length > 0 && (
          <section className="section-padding bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                More Cities in {city.region} Thailand
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedCities.map((relatedCity) => (
                  <CityCard key={relatedCity.id} city={relatedCity} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mobile Sticky Ad */}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cities = getCityStaticPaths();
  const locales = ['en', 'zh', 'de', 'fr', 'ru', 'ja', 'ko'];
  
  // Generate paths for all locales
  const paths = [];
  for (const city of cities) {
    for (const locale of locales) {
      paths.push({
        params: { slug: city.params.slug },
        locale: locale
      });
    }
  }
  
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

  const relatedCities = getRelatedCities(city, 3);
  
  return {
    props: {
      city,
      relatedCities,
    },
  };
};
