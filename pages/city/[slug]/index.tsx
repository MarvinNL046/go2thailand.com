import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs, getRelatedCities, getCityImageForSection, getAllCities, toAbsoluteImageUrl } from '../../../lib/cities';
import { getComparisonsForItem, getComparisonPair } from '../../../lib/comparisons';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CityCard from '../../../components/CityCard';
import Sidebar from '../../../components/Sidebar';
import TripcomWidget from '../../../components/TripcomWidget';
import FeedbackForm from '../../../components/FeedbackForm';
import SEOHead from '../../../components/SEOHead';
import { useEffect, useState } from 'react';
import { useTranslatedContent } from '../../../hooks/useTranslatedContent';
import { useRouter } from 'next/router';
import { formatNumber, formatPopulation } from '../../../utils/formatNumber';
import AffiliateWidget from '../../../components/AffiliateWidget';
import InlineAd from '../../../components/ads/InlineAd';
import BookingHeroCTA from '../../../components/BookingHeroCTA';
import transportRoutes from '../../../data/transport-routes.json';

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
  population_label?: string;
  population_note?: string;
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
    rank?: number;
    location?: string;
    entrance_fee?: string;
    highlights?: string[];
    href?: string;
    cta_label?: string;
  }>;
  top_restaurants?: Array<{
    rank?: number;
    name: string;
    cuisine?: string;
    cuisine_type?: string;
    description: string;
    location?: string;
    price_range?: string;
    highlights?: string[];
    href?: string;
    cta_label?: string;
  }>;
  top_hotels?: Array<{
    rank?: number;
    name: string;
    price_range?: string;
    description: string;
    category?: string;
    area?: string;
    highlights?: string[];
    href?: string;
    cta_label?: string;
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
    name?: string;
    activity?: string;
    story: string;
    cultural_significance?: string;
    how_to_participate?: string;
    insights?: string[];
    href?: string;
    cta_label?: string;
  }>;
  foodie_adventures?: Array<{
    name?: string;
    story: string;
    dish?: string;
    location?: string;
    where_to_find?: string;
    price_range?: string;
    ordering_tips?: string[];
    href?: string;
    cta_label?: string;
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
  enhanced_at?: string;
  // Scraped / enhanced content fields
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  topHotels?: Array<{
    name: string;
    category: string;
    priceRange: string;
    area: string;
    description: string;
  }>;
  whereToEat?: Array<{
    name: string;
    cuisine: string;
    priceRange: string;
    description: string;
  }>;
  overview?: string;
  thingsToDo?: string;
  whereToStay?: string;
  safetyTips?: string;
  budgetGuide?: {
    budget: { min: number; max: number; description: string };
    midrange: { min: number; max: number; description: string };
    luxury: { min: number; max: number; description: string };
  };
  contentSources?: Array<{
    type: string;
    title: string;
    creator: string;
    url: string;
    description?: string;
  }>;
  reviewed_by?: string;
}

interface CityComparisonLink {
  slug: string;
  otherName: { en: string; nl: string };
  otherSlug: string;
}

interface TransportRouteLink {
  slug: string;
  otherName: string;
  distance: string;
  modes: string[];
}

interface CityPageProps {
  editorial?: string;
  city: City;
  relatedCities: any[];
  comparisons: CityComparisonLink[];
  transportLinks: TransportRouteLink[];
}

export default function CityPage({ city, relatedCities, comparisons, transportLinks, editorial }: CityPageProps) {
  const router = useRouter();
  const { locale = 'en' } = router;
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
  const baseMetadata = generateCityMetadata(city);
  const introText = city.overview || city.description.en;
  const introSnippet = introText.length > 200 ? `${introText.substring(0, 200)}...` : introText;
  const aboutParagraphs = (city.overview || city.enhanced_description || city.description.en)
    .split('\n\n')
    .filter(Boolean);
  const reviewedDate = city.enhanced_at
    ? new Date(city.enhanced_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const metadata = {
    ...baseMetadata,
    title: baseMetadata.title || `${cityName}, Thailand Travel Guide: Best Areas, Attractions, Food & Hotels`,
    description: baseMetadata.description || `Plan a smarter ${cityName} trip with curated attractions, neighborhood advice, food picks, hotel recommendations, and practical local tips.`,
  };
  const featureCardClass = "group relative overflow-hidden rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_54px_rgba(15,23,42,0.10)]";
  const sidebarPanelClass = "rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)]";
  const exploreCardClass = "group relative overflow-hidden rounded-[30px] border border-gray-100 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(15,23,42,0.10)]";
  
  // Load Trip.com widget on client side
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://tpembd.com/content?trs=384595&shmarker=602467&lang=www&layout=S10391&powered_by=true&campaign_id=121&promo_id=4038';
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
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        ogImage={metadata.openGraph?.images?.[0]?.url || toAbsoluteImageUrl(getCityImageForSection(city, 'hero'))}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              "name": city.name.en,
              "description": city.overview || city.description.en,
              "image": city.image?.startsWith('http') ? city.image : `https://go2-thailand.com${city.image}`,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": city.location.lat,
                "longitude": city.location.lng
              },
              "containedInPlace": {
                "@type": "Country",
                "name": "Thailand"
              },
              "touristType": (city.tags || []).map((tag: string) => ({
                "@type": "Audience",
                "audienceType": tag
              })),
              "url": `https://go2-thailand.com/city/${city.slug}/`,
              "hasMap": `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city.name.en + ' Thailand')}`,
              ...(city.top_attractions && city.top_attractions.length > 0 ? {
                "containsPlace": city.top_attractions.map((attraction: { name: string; description: string }) => ({
                  "@type": "TouristAttraction",
                  "name": attraction.name,
                  "description": attraction.description
                }))
              } : {}),
              ...(city.top_hotels && city.top_hotels.length > 0 ? {
                "amenityFeature": city.top_hotels.map((hotel: { name: string; category?: string; price_range?: string; area?: string }) => ({
                  "@type": "LocationFeatureSpecification",
                  "name": hotel.name,
                  "value": `${hotel.category || 'hotel'} in ${hotel.area || city.name.en}${hotel.price_range ? ` - ${hotel.price_range}` : ''}`
                }))
              } : {})
            })
          }}
        />
        {city.faq && city.faq.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": city.faq.map((item: { question: string; answer: string }) => ({
                  "@type": "Question",
                  "name": item.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                  }
                }))
              })
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelGuide",
              "name": `${city.name.en} Travel Guide`,
              "description": city.overview || city.description.en,
              "about": {
                "@type": "City",
                "name": city.name.en,
                "containedInPlace": {
                  "@type": "Country",
                  "name": "Thailand"
                }
              },
              "author": {
                "@type": "Organization",
                "name": "Go2Thailand.com",
                "url": "https://go2-thailand.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Go2Thailand.com",
                "url": "https://go2-thailand.com"
              },
              ...(reviewedDate ? { "dateModified": city.enhanced_at } : {}),
              "inLanguage": locale || 'en',
              "image": city.image?.startsWith('http') ? city.image : `https://go2-thailand.com${city.image}`
            })
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-end">
            <div className="container-custom pb-12 text-white">
              <div className="max-w-4xl">
                <div className="flex items-center mb-4">
                  <span className="bg-thailand-red text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    {city.region}
                  </span>
                  <span className="text-gray-200 text-sm">
                    {city.province} Province
                  </span>
                </div>
                <span className="font-script text-thailand-gold text-lg mb-2 block">Travel Guide</span>
                <h1 className="font-heading text-4xl lg:text-6xl font-bold mb-4">
                  {cityName}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">
                  {introSnippet}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Editorial Introduction */}
        {editorial && (
          <section className="bg-white border-b">
            <div className="container-custom py-8">
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
                {editorial}
              </p>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="bg-white">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />

            {/* Booking Hero CTA — contextual, referrer-aware */}
            <BookingHeroCTA slug={city.slug} cityName={city.name.en} citySlug={city.slug} pageType="city" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 order-last lg:order-first">
                {/* City Description */}
                <div className="mb-12">
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                      Overview
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                      About {city.name.en}
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none rounded-[30px] border border-gray-100 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                    {aboutParagraphs.length > 0 ? (
                      <div className="space-y-5">
                        {aboutParagraphs.map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-8">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {city.description.en}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-4 my-8">
                      <div className="rounded-[24px] bg-slate-50 px-5 py-5 border border-slate-100">
                        <h4 className="font-semibold text-gray-900 mb-2">{city.population_label || 'Population'}</h4>
                        <p className="font-heading text-2xl font-bold text-thailand-blue">
                          {formatNumber(city.population)}
                        </p>
                        {city.population_note && (
                          <p className="mt-2 text-sm leading-6 text-gray-500">
                            {city.population_note}
                          </p>
                        )}
                      </div>
                      <div className="rounded-[24px] bg-slate-50 px-5 py-5 border border-slate-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Region</h4>
                        <p className="font-heading text-2xl font-bold text-thailand-blue">
                          {city.region}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hidden Gems */}
                {city.hidden_gems && city.hidden_gems.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-thailand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-red">
                        Beyond the obvious
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Hidden Gems
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        Places that make {city.name.en} feel more layered once you step outside the obvious first-timer circuit.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {(showAllHiddenGems ? city.hidden_gems : city.hidden_gems.slice(0, 2)).map((gem, index) => (
                        <div key={index} className={featureCardClass}>
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-red via-orange-400 to-thailand-gold" />
                          <div className="relative">
                          <div className="flex items-start mb-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-thailand-red rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{gem.name}</h3>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <p className="text-gray-700 leading-7">{gem.story}</p>
                            
                            {gem.how_to_find && (
                              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">How to find:</span> {gem.how_to_find}
                                </p>
                              </div>
                            )}

                            {gem.best_time && (
                              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Best time:</span> {gem.best_time}
                                </p>
                              </div>
                            )}
                            
                            {gem.local_insights && gem.local_insights.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {gem.local_insights.map((insight, i) => (
                                  <span key={i} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                                    {insight}
                                  </span>
                                ))}
                              </div>
                            )}

                            {city.slug === 'bangkok' && gem.name === 'Bangkokian Museum' && (
                              <div className="pt-2">
                                <Link
                                  href="/city/bangkok/attractions/bangkokian-museum/"
                                  className="inline-flex items-center text-thailand-red hover:text-thailand-red-600 font-medium text-sm"
                                >
                                  Read the full Bangkokian Museum guide
                                </Link>
                              </div>
                            )}

                            {city.slug === 'bangkok' && gem.name === 'Talad Rot Fai Srinakarin' && (
                              <div className="pt-2">
                                <Link
                                  href="/city/bangkok/attractions/talad-rot-fai-srinakarin/"
                                  className="inline-flex items-center text-thailand-red hover:text-thailand-red-600 font-medium text-sm"
                                >
                                  Read the full Talad Rot Fai Srinakarin guide
                                </Link>
                              </div>
                            )}

                            {city.slug === 'bangkok' && gem.name === 'Kudi Chin Community' && (
                              <div className="pt-2">
                                <Link
                                  href="/city/bangkok/attractions/kudi-chin-community/"
                                  className="inline-flex items-center text-thailand-red hover:text-thailand-red-600 font-medium text-sm"
                                >
                                  Read the full Kudi Chin Community guide
                                </Link>
                              </div>
                            )}

                            {city.slug === 'bangkok' && gem.name === 'Bang Kachao' && (
                              <div className="pt-2">
                                <Link
                                  href="/city/bangkok/attractions/bang-kachao/"
                                  className="inline-flex items-center text-thailand-red hover:text-thailand-red-600 font-medium text-sm"
                                >
                                  Read the full Bang Kachao guide
                                </Link>
                              </div>
                            )}

                            {city.slug === 'bangkok' && gem.name === 'Suan Pakkad Palace' && (
                              <div className="pt-2">
                                <Link
                                  href="/city/bangkok/attractions/suan-pakkad-palace/"
                                  className="inline-flex items-center gap-2 text-thailand-red hover:text-thailand-red-600 font-medium text-sm"
                                >
                                  Read the full Suan Pakkad Palace guide
                                  <span aria-hidden="true">→</span>
                                </Link>
                              </div>
                            )}
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {city.hidden_gems.length > 2 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowAllHiddenGems(!showAllHiddenGems)}
                          className="text-thailand-red hover:text-thailand-red-600 font-medium flex items-center gap-2 mx-auto"
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
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue">
                        Deeper experiences
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Authentic Experiences
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        Experiences that say more about how {city.name.en} actually works than a standard checklist of sights.
                      </p>
                    </div>
                    <div className="space-y-6">
                      {(showAllExperiences ? city.authentic_experiences : city.authentic_experiences.slice(0, 1)).map((experience, index) => (
                        <div key={index} className={featureCardClass}>
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-blue to-cyan-400" />
                          <div className="relative">
                          <div className="flex items-start mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-thailand-blue rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                                {experience.name || experience.activity}
                              </h3>
                              <p className="text-gray-700 text-lg leading-8 mb-5">{experience.story}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {experience.cultural_significance && (
                                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <h4 className="font-semibold text-gray-900 mb-2">Cultural Significance</h4>
                                    <p className="text-sm text-gray-600">{experience.cultural_significance}</p>
                                  </div>
                                )}

                                {experience.how_to_participate && (
                                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
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
                                      <span key={i} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700">
                                        {insight}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {experience.href && experience.cta_label && (
                                <div className="mt-4">
                                  <Link
                                    href={experience.href}
                                    className="inline-flex items-center gap-2 text-thailand-red hover:text-thailand-red-600 font-medium text-sm"
                                  >
                                    {experience.cta_label}
                                    <span aria-hidden="true">→</span>
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {city.authentic_experiences.length > 1 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowAllExperiences(!showAllExperiences)}
                          className="text-thailand-red hover:text-thailand-red-600 font-medium flex items-center gap-2 mx-auto"
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
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-thailand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-red">
                        Must-sees
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Top Attractions
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        The headline {city.name.en} sights, framed in a way that is actually useful for planning.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(showAllAttractions ? city.top_attractions : city.top_attractions.slice(0, 3)).map((attraction, index) => (
                        <div key={index} className={featureCardClass}>
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-red via-orange-400 to-thailand-gold" />
                          <div className="relative">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 bg-thailand-blue rounded-2xl flex items-center justify-center mr-4 mt-1 shadow-sm">
                              <span className="text-white font-bold text-sm">{attraction.rank || index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                              <p className="text-gray-700 leading-relaxed mb-4">{attraction.description}</p>

                              {(attraction.location || attraction.entrance_fee) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                  {attraction.location && (
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Location</h4>
                                      <p className="text-sm text-gray-700">{attraction.location}</p>
                                    </div>
                                  )}

                                  {attraction.entrance_fee && (
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Typical Entry</h4>
                                      <p className="text-sm text-gray-700">{attraction.entrance_fee}</p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {attraction.highlights && attraction.highlights.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {attraction.highlights.map((highlight, i) => (
                                    <span key={i} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700">
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {attraction.href && attraction.cta_label && (
                                <Link
                                  href={attraction.href}
                                  className="inline-flex items-center gap-2 text-thailand-red hover:text-thailand-red-600 font-medium text-sm"
                                >
                                  {attraction.cta_label}
                                  <span aria-hidden="true">→</span>
                                </Link>
                              )}
                            </div>
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
                          {showAllAttractions ? 'Show less' : `View ${city.top_attractions.length - 3} more attractions`}
                          <svg className={`w-4 h-4 transition-transform ${showAllAttractions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Ad between sections */}
                <InlineAd />

                {/* Top Guides Cross-Links */}
                <div className="my-8 rounded-[30px] border border-gray-100 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                  <div className="mb-5">
                    <span className="inline-flex items-center rounded-full bg-thailand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-red">
                      Deep Dives
                    </span>
                    <h3 className="mt-3 text-2xl font-heading font-bold text-gray-900">
                      Top Guides for {city.name.en}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                      href={`/city/${city.slug}/top-10-restaurants/`}
                      className="group rounded-[24px] border border-gray-100 bg-slate-50/70 p-4 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-thailand-red text-white shadow-sm flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-thailand-red/70 mb-1">Food</div>
                          <span className="font-medium text-gray-800 text-sm">Top 10 Restaurants</span>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href={`/city/${city.slug}/top-10-hotels/`}
                      className="group rounded-[24px] border border-gray-100 bg-slate-50/70 p-4 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-thailand-blue text-white shadow-sm flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue/70 mb-1">Stay</div>
                          <span className="font-medium text-gray-800 text-sm">Top 10 Hotels</span>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href={`/city/${city.slug}/top-10-attractions/`}
                      className="group rounded-[24px] border border-gray-100 bg-slate-50/70 p-4 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-thailand-gold text-white shadow-sm flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700/80 mb-1">See</div>
                          <span className="font-medium text-gray-800 text-sm">Top 10 Attractions</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Strong support-page cross-links */}
                <div className="my-8 rounded-[30px] border border-gray-100 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                  <div className="mb-5">
                    <span className="inline-flex items-center rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue">
                      Plan Smarter
                    </span>
                    <h3 className="mt-3 text-2xl font-heading font-bold text-gray-900">
                      Stronger Guides for {city.name.en}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link
                      href={`/city/${city.slug}/best-time-to-visit/`}
                      className="flex items-center gap-3 rounded-[24px] border border-gray-100 bg-slate-50/70 p-4 hover:-translate-y-1 hover:bg-white hover:shadow-md transition-all text-sm font-medium text-gray-800"
                    >
                      <span className="text-lg">🗓️</span><span>Best Time</span>
                    </Link>
                    <Link
                      href={`/city/${city.slug}/budget/`}
                      className="flex items-center gap-3 rounded-[24px] border border-gray-100 bg-slate-50/70 p-4 hover:-translate-y-1 hover:bg-white hover:shadow-md transition-all text-sm font-medium text-gray-800"
                    >
                      <span className="text-lg">💸</span><span>Budget Guide</span>
                    </Link>
                    <Link
                      href={`/city/${city.slug}/food/`}
                      className="flex items-center gap-3 rounded-[24px] border border-gray-100 bg-slate-50/70 p-4 hover:-translate-y-1 hover:bg-white hover:shadow-md transition-all text-sm font-medium text-gray-800"
                    >
                      <span className="text-lg">🍽️</span><span>Where to Eat</span>
                    </Link>
                    <Link
                      href={`/city/${city.slug}/hotels/`}
                      className="flex items-center gap-3 rounded-[24px] border border-gray-100 bg-slate-50/70 p-4 hover:-translate-y-1 hover:bg-white hover:shadow-md transition-all text-sm font-medium text-gray-800"
                    >
                      <span className="text-lg">🛏️</span><span>Where to Stay</span>
                    </Link>
                  </div>
                </div>

                {/* Travel Services Section */}
                <div className="mb-12">
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                      Travel Smarter
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                      Complete Travel Services for {city.name.en}
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-3xl">
                      Planning tools and booking shortcuts for the practical parts of a {city.name.en} trip.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Hotel + Flight Bundle */}
                    <div className={featureCardClass}>
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-red to-orange-400" />
                      <div className="relative text-left">
                        <h3 className="font-semibold text-gray-900 mb-2">Flight + Hotel</h3>
                        <p className="text-sm text-gray-600 leading-6 mb-4">Save time and often money by bundling the trip basics instead of booking each part separately.</p>
                        <a
                          href="https://trip.tpo.lv/iP1HSint?subid=city"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-thailand-red hover:text-thailand-red-600"
                        >
                          Book Bundle <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                    
                    {/* Airport Transfers */}
                    <div className={featureCardClass}>
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-blue to-cyan-400" />
                      <div className="relative text-left">
                        <h3 className="font-semibold text-gray-900 mb-2">Airport Transfers</h3>
                        <p className="text-sm text-gray-600 leading-6 mb-4">Useful if you want the easiest arrival flow instead of figuring out transport after a long flight.</p>
                        <a
                          href="https://trip.tpo.lv/iP1HSint?subid=city"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-thailand-blue hover:text-cyan-600"
                        >
                          Book Transfer <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                    
                    {/* Car Rental */}
                    <div className={featureCardClass}>
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
                      <div className="relative text-left">
                        <h3 className="font-semibold text-gray-900 mb-2">Car Rental</h3>
                        <p className="text-sm text-gray-600 leading-6 mb-4">Mostly useful for arrival logistics, day trips, or onward travel beyond {city.name.en} itself.</p>
                        <a
                          href="https://trip.tpo.lv/fzIWyBhW?subid=city"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-teal-600"
                        >
                          Rent a Car <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                    
                    {/* 12Go Transport */}
                    <div className={featureCardClass}>
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 to-indigo-400" />
                      <div className="relative text-left">
                        <h3 className="font-semibold text-gray-900 mb-2">Bus, Train & Ferry</h3>
                        <p className="text-sm text-gray-600 leading-6 mb-4">Best when {city.name.en} is one stop in a broader Thailand route rather than the whole trip.</p>
                        <a
                          href="https://12go.tpo.lv/tNA80urD?subid=city"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-indigo-600"
                        >
                          Book Transport <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Book with confidence - 24/7 customer support & best price guarantee
                    </p>
                  </div>
                </div>

                {/* 12Go Transport Widget */}
                <div className="mb-12">
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                      Onward Travel
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                      Book Transport from {cityName}
                    </h2>
                  </div>
                  <div className="rounded-[30px] border border-gray-100 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                    <AffiliateWidget
                      scriptContent={`<script async src="https://tpembd.com/content?currency=USD&trs=421888&shmarker=602467&powered_by=true&dafault_width=true&locale=en&header_color=%234b4b4b&text_color=%234b4b4b&background_color=%23ffffff&price_color=%234db84d&promo_id=8995&campaign_id=44" charset="utf-8"></script>`}
                      minHeight="300px"
                    />
                    <div className="mt-4 text-center">
                      <a
                        href="https://12go.tpo.lv/tNA80urD?subid=city"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 transition-colors"
                      >
                        View All Routes on 12Go <span aria-hidden="true">→</span>
                      </a>
                      <p className="text-xs text-gray-500 mt-2">
                        Buses, trains, ferries & transfers — powered by 12Go
                      </p>
                    </div>
                  </div>
                </div>

                {/* Activities & Tours Section */}
                <div className="mb-12">
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue">
                      Bookable Experiences
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                      Activities & Tours in {cityName}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <a
                      href={(() => {
                        const klookLinks: Record<string, string> = {
                          bangkok: 'https://klook.tpo.lv/FXwAY84o?subid=city',
                          phuket: 'https://klook.tpo.lv/7Dt6WApj?subid=city',
                          'chiang-mai': 'https://klook.tpo.lv/SrPrBanh?subid=city',
                          krabi: 'https://klook.tpo.lv/aq6ZFxvc?subid=city',
                          pattaya: 'https://klook.tpo.lv/aq6ZFxvc?subid=city',
                        };
                        return klookLinks[city.slug] || 'https://klook.tpo.lv/aq6ZFxvc?subid=city';
                      })()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={featureCardClass + " block"}
                    >
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-red to-orange-400" />
                      <div className="relative">
                        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-red/70">Marketplace</div>
                        <h3 className="font-bold text-gray-900 mb-3">Klook Activities</h3>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 leading-6 mb-4">
                          Book tours, experiences & attraction tickets in {cityName} with instant confirmation
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-thailand-red hover:text-thailand-red-600 transition-colors">
                          Browse {cityName} on Klook <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </a>
                    <a
                      href={(() => {
                        const gygLinks: Record<string, string> = {
                          bangkok: 'https://getyourguide.tpo.lv/PHh5hvej?subid=city',
                          phuket: 'https://getyourguide.tpo.lv/8d41f2Fq?subid=city',
                          'chiang-mai': 'https://getyourguide.tpo.lv/8d41f2Fq?subid=city',
                          krabi: 'https://getyourguide.tpo.lv/GuAFfGGK?subid=city',
                          pattaya: 'https://getyourguide.tpo.lv/GuAFfGGK?subid=city',
                        };
                        return gygLinks[city.slug] || 'https://getyourguide.tpo.lv/GuAFfGGK?subid=city';
                      })()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={featureCardClass + " block"}
                    >
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-blue to-cyan-400" />
                      <div className="relative">
                        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue/70">Marketplace</div>
                        <h3 className="font-bold text-gray-900 mb-3">GetYourGuide Tours</h3>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 leading-6 mb-4">
                          Expert-guided tours and curated experiences in {cityName} with free cancellation
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-thailand-blue hover:text-cyan-600 transition-colors">
                          Browse {cityName} on GetYourGuide <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="text-center">
                    <Link href="/activities/" className="text-thailand-blue hover:text-thailand-red text-sm font-medium transition-colors">
                      View all Thailand activities & tours →
                    </Link>
                  </div>
                </div>

                {/* Foodie Adventures */}
                {city.foodie_adventures && city.foodie_adventures.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-thailand-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                        Eat your way in
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Foodie Adventures
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        Dish-led stops that help visitors understand {city.name.en} through what they actually eat and where they try it.
                      </p>
                    </div>
                    <div className="space-y-8">
                      {(showAllFoodAdventures ? city.foodie_adventures : city.foodie_adventures.slice(0, 2)).map((food, index) => (
                        <div key={index} className={featureCardClass}>
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-gold to-amber-400" />
                          <div className="relative">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-thailand-gold rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="font-heading text-2xl font-bold text-gray-900">{food.name || food.dish}</h3>
                                {food.price_range && (
                                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                                    {food.price_range}
                                  </span>
                                )}
                              </div>
                              
                              <p className="text-gray-700 text-lg leading-8 mb-5">{food.story}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {food.dish && (
                                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Dish:</span> {food.dish}
                                    </p>
                                  </div>
                                )}

                                {(food.where_to_find || food.location) && (
                                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Where to find:</span> {food.where_to_find || food.location}
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              {food.ordering_tips && food.ordering_tips.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Ordering Tips</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {food.ordering_tips.map((tip, i) => (
                                      <span key={i} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700">
                                        {tip}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {food.href && food.cta_label && (
                                <div className="mt-4">
                                  <Link
                                    href={food.href}
                                    className="inline-flex items-center gap-2 text-thailand-red hover:text-thailand-red-600 font-medium text-sm"
                                  >
                                    {food.cta_label}
                                    <span aria-hidden="true">→</span>
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {city.foodie_adventures.length > 2 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowAllFoodAdventures(!showAllFoodAdventures)}
                          className="text-thailand-red hover:text-thailand-red-600 font-medium flex items-center gap-2 mx-auto"
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

                {city.thingsToDo && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-thailand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-red">
                        Core Guide
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Things to Do
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        A broader {city.name.en} planning section that connects the major sights, food, and practical on-the-ground decisions into one overview.
                      </p>
                    </div>
                    <div className="rounded-[30px] border border-gray-100 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                      <div className="space-y-5">
                        {city.thingsToDo.split('\n\n').filter(Boolean).map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-8">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Restaurants */}
                {city.top_restaurants && city.top_restaurants.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-thailand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-red">
                        Food Picks
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Best Restaurants
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        A tighter shortlist for meals that actually feel distinct in {city.name.en}, from local staples to stronger special-occasion picks.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                      {(showAllRestaurants ? city.top_restaurants : city.top_restaurants.slice(0, 4)).map((restaurant, index) => (
                        <div key={index} className={featureCardClass}>
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-red via-orange-400 to-thailand-gold" />
                          <div className="relative">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div>
                                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-thailand-red text-sm font-bold text-white shadow-sm">
                                  {restaurant.rank || index + 1}
                                </div>
                                <h3 className="font-heading text-xl font-bold text-gray-900 leading-tight">
                                  {restaurant.name}
                                </h3>
                              </div>
                              {(restaurant.cuisine || restaurant.cuisine_type) && (
                                <span className="rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-semibold text-thailand-blue text-right">
                                  {restaurant.cuisine || restaurant.cuisine_type}
                                </span>
                              )}
                            </div>

                            <div className="mb-4 flex flex-wrap gap-2">
                              {restaurant.location && (
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                  {restaurant.location}
                                </span>
                              )}
                              {restaurant.price_range && (
                                <span className="rounded-full bg-surface-cream px-3 py-1 text-xs font-medium text-gray-700">
                                  {restaurant.price_range}
                                </span>
                              )}
                            </div>

                            <p className="text-gray-600 text-sm leading-7">{restaurant.description}</p>

                            {restaurant.highlights && restaurant.highlights.length > 0 && (
                              <div className="mt-5 border-t border-gray-100 pt-4">
                                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                                  Why It Stands Out
                                </div>
                                <div className="flex flex-wrap gap-2">
                                {restaurant.highlights.map((highlight, highlightIndex) => (
                                  <span key={highlightIndex} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                                    {highlight}
                                  </span>
                                ))}
                                </div>
                              </div>
                            )}

                            {restaurant.href && (
                              <div className="pt-5">
                                <Link
                                  href={restaurant.href}
                                  className="inline-flex items-center gap-2 text-sm font-semibold text-thailand-red hover:text-thailand-red-600"
                                >
                                  {restaurant.cta_label || 'See more restaurant picks'}
                                  <span aria-hidden="true">→</span>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {city.top_restaurants.length > 4 && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => setShowAllRestaurants(!showAllRestaurants)}
                          className="inline-flex items-center gap-2 bg-surface-cream hover:bg-surface-gold px-6 py-3 rounded-full font-medium text-thailand-blue transition-colors"
                        >
                          {showAllRestaurants ? 'Show fewer restaurant picks' : `Show ${city.top_restaurants.length - 4} more restaurant picks`}
                          <svg className={`w-4 h-4 transition-transform ${showAllRestaurants ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Top Hotels */}
                {city.top_hotels && city.top_hotels.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        Stay Picks
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Recommended Hotels
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        Hotels that make sense for different {city.name.en} stays, not just a pile of names and nightly rates.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                      {city.top_hotels.slice(0, 4).map((hotel, index) => (
                        <div key={index} className={featureCardClass}>
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />
                          <div className="relative">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div>
                                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-sm">
                                  {hotel.rank || index + 1}
                                </div>
                                <h3 className="font-heading text-xl font-bold text-gray-900 leading-tight">{hotel.name}</h3>
                              </div>
                              {hotel.price_range && (
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                                  {hotel.price_range}
                                </span>
                              )}
                            </div>

                            <div className="mb-4 flex flex-wrap gap-2">
                              {hotel.category && (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                                  {hotel.category}
                                </span>
                              )}
                              {hotel.area && (
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                  {hotel.area}
                                </span>
                              )}
                            </div>

                            <p className="text-gray-600 text-sm leading-7">{hotel.description}</p>

                            {hotel.highlights && hotel.highlights.length > 0 && (
                              <div className="mt-5 border-t border-gray-100 pt-4">
                                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                                  Good For
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {hotel.highlights.map((highlight, highlightIndex) => (
                                    <span key={highlightIndex} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {hotel.href && (
                              <div className="pt-5">
                                <Link
                                  href={hotel.href}
                                  className="inline-flex items-center gap-2 text-sm font-semibold text-thailand-red hover:text-thailand-red-600"
                                >
                                  {hotel.cta_label || 'See more hotel picks'}
                                  <span aria-hidden="true">→</span>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {city.whereToStay && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        Stay Strategy
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Where to Stay
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        Area context that helps you choose the right base in {city.name.en} instead of booking blind on price alone.
                      </p>
                    </div>
                    <div className="rounded-[30px] border border-gray-100 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                      <div className="space-y-5">
                        {city.whereToStay.split('\n\n').filter(Boolean).map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-8">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Local Insights */}
                {city.local_insights && city.local_insights.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue">
                        Local Rhythm
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Local Insights
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        Practical patterns that matter once you move past the obvious sightseeing checklist in {city.name.en}.
                      </p>
                    </div>
                    <div className="rounded-[30px] border border-gray-100 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                      <div className="flex items-center mb-5">
                        <div className="w-10 h-10 bg-thailand-blue rounded-2xl flex items-center justify-center mr-3 shadow-sm">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue/70">Read the city better</div>
                          <h3 className="text-lg font-semibold text-gray-900">What Locals Want You to Know</h3>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {(showAllLocalInsights ? city.local_insights : city.local_insights.slice(0, 4)).map((insight, index) => (
                          <div key={index} className="rounded-[24px] border border-gray-100 bg-slate-50/60 p-5">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 w-8 h-8 bg-thailand-red rounded-2xl flex items-center justify-center mr-3 mt-0.5 shadow-sm">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                {typeof insight === 'string' ? (
                                  <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
                                ) : (
                                  <div className="space-y-3">
                                    {insight.observation && (
                                      <h4 className="font-semibold text-gray-900 text-sm leading-6">{insight.observation}</h4>
                                    )}
                                    {insight.tip && (
                                      <p className="text-gray-700 text-sm leading-6">{insight.tip}</p>
                                    )}
                                    {insight.surprise && (
                                      <div className="rounded-2xl bg-white px-3 py-2 text-xs leading-5 text-teal-700 border border-teal-100">
                                        {insight.surprise}
                                      </div>
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
                            className="text-thailand-red hover:text-thailand-red-600 font-medium flex items-center gap-2 mx-auto"
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
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                        Smart Planning
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Travel Tips
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        Quick planning notes that make {city.name.en} easier to handle on the ground.
                      </p>
                    </div>
                    <div className="rounded-[30px] border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.05)]">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(showAllTravelTips ? city.travel_tips : city.travel_tips.slice(0, 3)).map((tip, index) => (
                          <li key={index} className="rounded-[24px] border border-white/70 bg-white/80 px-4 py-4 shadow-sm">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-amber-500 text-sm font-bold text-white shadow-sm">
                                  {index + 1}
                                </div>
                              </div>
                              <span className="text-gray-700 leading-6">{tip}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {city.travel_tips.length > 3 && (
                        <div className="text-center mt-6">
                          <button
                            onClick={() => setShowAllTravelTips(!showAllTravelTips)}
                            className="text-thailand-red hover:text-thailand-red-600 font-medium flex items-center gap-2 mx-auto"
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

                {city.safetyTips && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                        Practical
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Safety Tips
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-3xl">
                        Real-world cautions for getting around {city.name.en} smoothly without turning it into something riskier than it is.
                      </p>
                    </div>
                    <div className="rounded-[30px] border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.05)]">
                      <div className="space-y-5">
                        {city.safetyTips.split('\n\n').filter(Boolean).map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-8">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="mb-12">
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue">
                      City Sections
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                      Explore {city.name.en}
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-3xl">
                      Jump into the parts of the city guide that matter most for planning where to eat, stay, and what to prioritize first.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {/* Food */}
                    <Link href={`/city/${city.slug}/food/`}>
                      <div className={exploreCardClass}>
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-blue to-cyan-400" />
                        <div className="relative text-left">
                          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-thailand-blue text-white shadow-sm">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue/70">Taste</div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Food & Dining</h3>
                          <p className="text-gray-600 text-sm leading-6 mb-5 min-h-[72px]">
                            {city.categories.food.en}
                          </p>
                          <span className="inline-flex items-center gap-2 text-thailand-blue font-semibold">
                            Explore Food <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Hotels */}
                    <Link href={`/city/${city.slug}/hotels/`}>
                      <div className={exploreCardClass}>
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
                        <div className="relative text-left">
                          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-emerald-500 text-white shadow-sm">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/80">Stay</div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Hotels & Stay</h3>
                          <p className="text-gray-600 text-sm leading-6 mb-5 min-h-[72px]">
                            {city.categories.hotels.en}
                          </p>
                          <span className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
                            Find Hotels <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Attractions */}
                    <Link href={`/city/${city.slug}/attractions/`}>
                      <div className={exploreCardClass}>
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-thailand-red to-orange-400" />
                        <div className="relative text-left">
                          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-thailand-red text-white shadow-sm">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-red/80">See</div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Attractions</h3>
                          <p className="text-gray-600 text-sm leading-6 mb-5 min-h-[72px]">
                            {city.categories.attractions.en}
                          </p>
                          <span className="inline-flex items-center gap-2 text-thailand-red font-semibold">
                            See Attractions <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Best Time to Visit */}
                    <Link href={`/city/${city.slug}/best-time-to-visit/`}>
                      <div className={exploreCardClass}>
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 to-indigo-400" />
                        <div className="relative text-left">
                          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-violet-500 text-white shadow-sm">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700/80">Timing</div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Best Time to Visit</h3>
                          <p className="text-gray-600 text-sm leading-6 mb-5 min-h-[72px]">
                            Weather, seasons & festivals
                          </p>
                          <span className="inline-flex items-center gap-2 text-violet-700 font-semibold">
                            View Guide <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Budget */}
                    <Link href={`/city/${city.slug}/budget/`}>
                      <div className={exploreCardClass}>
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 to-yellow-400" />
                        <div className="relative text-left">
                          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-amber-500 text-white shadow-sm">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700/80">Costs</div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Budget Guide</h3>
                          <p className="text-gray-600 text-sm leading-6 mb-5 min-h-[72px]">
                            Daily costs & money tips
                          </p>
                          <span className="inline-flex items-center gap-2 text-amber-700 font-semibold">
                            See Costs <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Compare with Other Cities */}
                {comparisons && comparisons.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                        Compare
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Compare {city.name.en} with Other Cities
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {comparisons.map((comp: CityComparisonLink) => (
                        <Link
                          key={comp.slug}
                          href={`/compare/${comp.slug}/`}
                          className="rounded-[24px] border border-gray-100 bg-white p-4 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {city.name.en} <span className="text-gray-400">vs</span> {comp.otherName.en}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transport Routes */}
                {transportLinks && transportLinks.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                        Routes
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-gray-900 mt-3">
                        Getting To & From {city.name.en}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {transportLinks.slice(0, 12).map((route) => (
                        <Link
                          key={route.slug}
                          href={`/transport/${route.slug}/`}
                          className="rounded-[24px] border border-gray-100 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                        >
                          <div className="font-medium text-gray-900 mb-2">
                            {city.name.en} → {route.otherName}
                          </div>
                          <div className="text-sm text-gray-500 mb-3">{route.distance}</div>
                          <div className="flex flex-wrap gap-2">
                            {route.modes.map((mode) => (
                              <span key={mode} className="text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full font-medium">
                                {mode}
                              </span>
                            ))}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Sources */}
                {city.contentSources && city.contentSources.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                        Transparency
                      </span>
                      <h3 className="mt-3 text-2xl font-heading font-bold text-gray-900">Sources & References</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                        This page is curated from official venue pages, museum and attraction sources, hotel and restaurant references, and direct planning resources. We use source-backed details for opening hours, entry notes, neighborhood fit, and practical trip planning.
                      </p>
                    </div>
                    <div className="mb-5 rounded-[26px] border border-slate-100 bg-slate-50 px-5 py-5">
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reviewed By</div>
                          <div className="mt-1 text-sm font-semibold text-gray-900">{city.reviewed_by || 'Go2Thailand Editorial Team'}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reviewed</div>
                          <div className="mt-1 text-sm font-semibold text-gray-900">{reviewedDate || 'Editorial review in progress'}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Sources Used</div>
                          <div className="mt-1 text-sm font-semibold text-gray-900">{city.contentSources.length} references on-page</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Method</div>
                          <div className="mt-1 text-sm font-semibold text-gray-900">Curated manually, then checked against linked sources</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {city.contentSources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start p-4 bg-white rounded-[24px] border border-gray-100 hover:border-gray-300 transition-all hover:-translate-y-0.5 hover:shadow-md text-sm"
                        >
                          {source.type === 'video' && (
                            <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{source.title}</div>
                            <div className="text-gray-500">by {source.creator}</div>
                            {source.description && (
                              <div className="text-gray-600 mt-1 leading-6">{source.description}</div>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <Sidebar mobilePosition="top">
                {/* Quick Facts */}
                <div className={sidebarPanelClass}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-thailand-blue text-white shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-2m-6 2V2m6 16l5.447-2.724A1 1 0 0021 14.382V3.618a1 1 0 00-.553-.894L15 0m0 18V0m-6 2l6-2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue/70">Snapshot</div>
                      <h3 className="font-heading text-xl font-bold text-gray-900">Quick Facts</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-gray-500">Region</span>
                      <Link href={`/region/${city.region}/`} className="text-right font-semibold text-thailand-blue hover:underline capitalize">{city.region}</Link>
                    </div>
                    <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-gray-500">Province</span>
                      <span className="text-right font-semibold text-gray-900">{city.province}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-gray-500">{city.population_label || 'Population'}</span>
                      <span className="text-right font-semibold text-gray-900">{formatNumber(city.population)}</span>
                    </div>
                    {city.population_note && (
                      <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                        <p className="text-xs leading-5 text-amber-900">{city.population_note}</p>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-gray-500">Coordinates</span>
                      <span className="text-right font-semibold text-sm text-gray-900">
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
                  <div className={`${sidebarPanelClass} mt-4`}>
                    <div className="mb-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Booking</div>
                      <h4 className="mt-1 text-base font-bold text-gray-900">Why Book with Trip.com?</h4>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start rounded-2xl bg-emerald-50 px-3 py-2.5">
                        <svg className="mt-0.5 w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>24/7 Customer Service</span>
                      </div>
                      <div className="flex items-start rounded-2xl bg-emerald-50 px-3 py-2.5">
                        <svg className="mt-0.5 w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{locale === 'nl' ? 'Beste Prijs Garantie' : 'Best Price Guarantee'}</span>
                      </div>
                      <div className="flex items-start rounded-2xl bg-emerald-50 px-3 py-2.5">
                        <svg className="mt-0.5 w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>1.2M+ Hotels Worldwide</span>
                      </div>
                      <div className="flex items-start rounded-2xl bg-emerald-50 px-3 py-2.5">
                        <svg className="mt-0.5 w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{locale === 'nl' ? 'Veilig Boekingsproces' : 'Secure Booking Process'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SIDEBAR AD - THE MONEY MAKER! */}

                {/* Enhanced Seasonal Secrets */}
                {city.seasonal_secrets ? (
                  <div className={sidebarPanelClass + " mb-8"}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center mr-3 shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Seasonality</div>
                        <h3 className="font-heading text-xl font-bold text-gray-900">Best Time to Visit</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="rounded-[22px] bg-gradient-to-br from-blue-50 to-slate-50 p-4 border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-blue-900">{city.seasonal_secrets.best_season || 'Cool Season'}</span>
                          <span className="text-xs bg-white text-blue-700 px-2.5 py-1 rounded-full font-semibold border border-blue-100">Recommended</span>
                        </div>
                        <p className="text-sm leading-6 text-blue-800">{city.seasonal_secrets.why || 'Most comfortable weather'}</p>
                      </div>

                      {city.seasonal_secrets.local_festivals && city.seasonal_secrets.local_festivals.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Local Festivals
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {city.seasonal_secrets.local_festivals.map((festival, i) => (
                              <span key={i} className="text-xs font-medium text-gray-700 bg-slate-100 px-3 py-1.5 rounded-full">
                                {festival}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {city.seasonal_secrets.seasonal_foods && city.seasonal_secrets.seasonal_foods.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Seasonal Foods
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {city.seasonal_secrets.seasonal_foods.map((food, i) => (
                              <span key={i} className="text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full font-medium">
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {city.seasonal_secrets.insider_tips && city.seasonal_secrets.insider_tips.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Insider Tips
                          </h4>
                          <div className="space-y-2">
                            {city.seasonal_secrets.insider_tips.slice(0, 2).map((tip, i) => (
                              <div key={i} className="rounded-2xl border border-yellow-100 bg-yellow-50 px-3 py-2.5 text-xs leading-5 text-gray-700">
                                {tip}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : city.best_time_to_visit ? (
                  <div className={sidebarPanelClass + " mb-8"}>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Best Time to Visit</h3>
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
                  <div className={sidebarPanelClass + " mb-8"}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center mr-3 shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">Costs</div>
                        <h3 className="font-heading text-xl font-bold text-gray-900">Budget Reality</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                          <span className="text-sm text-gray-600">Budget</span>
                          <span className="font-bold text-emerald-700">{city.budget_reality.budget || '$25-40/day'}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
                          <span className="text-sm text-gray-600">Mid-range</span>
                          <span className="font-bold text-blue-700">{city.budget_reality.mid_range || '$40-80/day'}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3">
                          <span className="text-sm text-gray-600">Luxury</span>
                          <span className="font-bold text-purple-700">{city.budget_reality.luxury || '$80+/day'}</span>
                        </div>
                      </div>

                      {city.budget_reality.examples && city.budget_reality.examples.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Real Prices
                          </h4>
                          <div className="space-y-2">
                            {city.budget_reality.examples.slice(0, 3).map((example, i) => (
                              <div key={i} className="text-xs text-gray-600 bg-slate-50 px-3 py-2.5 rounded-2xl flex justify-between gap-3">
                                <span>{example.split(':')[0]}:</span>
                                <span className="font-medium">{example.split(':')[1]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {city.budget_reality.money_saving_tricks && city.budget_reality.money_saving_tricks.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Money-Saving Tricks
                          </h4>
                          <div className="space-y-2">
                            {city.budget_reality.money_saving_tricks.slice(0, 2).map((trick, i) => (
                              <div key={i} className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-xs leading-5 text-emerald-800">
                                {trick}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {city.budget_reality.hidden_costs && city.budget_reality.hidden_costs.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Hidden Costs
                          </h4>
                          <div className="space-y-2">
                            {city.budget_reality.hidden_costs.slice(0, 2).map((cost, i) => (
                              <div key={i} className="rounded-2xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-800">
                                {cost}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : city.budget_info?.daily_budget ? (
                  <div className={sidebarPanelClass + " mb-8"}>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Daily Budget</h3>
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
                  <div className={sidebarPanelClass + " mb-8"}>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {city.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="rounded-full border border-gray-200 bg-slate-50 px-3 py-1.5 text-sm text-gray-700"
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
          <section className="section-padding bg-surface-cream">
            <div className="container-custom">
              <div className="text-center mb-8">
                <span className="inline-flex items-center rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue">
                  Keep Exploring
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">
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
  const locales = ['en', 'nl'];
  
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
    fallback: 'blocking',
  };
};

// Recursively resolve {en, nl} bilingual objects to plain strings.
function flattenBilingual(data: any): any {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(item => flattenBilingual(item));
  // Check if this looks like a bilingual object {en, nl} or {en, nl, ...locale}
  const keys = Object.keys(data);
  if (keys.includes('en') && keys.every(k => k.length <= 3)) {
    return data.en || '';
  }
  // Recurse into object
  const result: any = {};
  for (const key of keys) {
    result[key] = flattenBilingual(data[key]);
  }
  return result;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const rawCity = getCityBySlug(slug);

  if (!rawCity) {
    return {
      notFound: true,
    };
  }

  // Flatten ALL bilingual objects to strings, then restore the ones the template needs
  const city = flattenBilingual(rawCity);
  // Restore bilingual fields that the template handles via locale lookup
  city.name = rawCity.name;
  city.description = rawCity.description;
  if (rawCity.seo) city.seo = rawCity.seo;
  if (rawCity.categories) city.categories = rawCity.categories;

  // Normalize travel_tips: convert {title, content} objects to strings
  if (city.travel_tips && Array.isArray(city.travel_tips)) {
    city.travel_tips = city.travel_tips.map((tip: any) => {
      if (typeof tip === 'string') return tip;
      if (typeof tip === 'object' && tip.content) return tip.content;
      if (typeof tip === 'object' && tip.title) return tip.title;
      return String(tip);
    });
  }

  // Normalize hidden_gems: map 'description' to 'story' if needed
  if (city.hidden_gems && Array.isArray(city.hidden_gems)) {
    city.hidden_gems = city.hidden_gems.map((gem: any) => ({
      name: typeof gem.name === 'string' ? gem.name : gem.name?.en || '',
      story: gem.story || gem.description || '',
      how_to_find: gem.how_to_find || '',
      best_time: gem.best_time || '',
      local_insights: gem.local_insights || [],
    }));
  }

  // Normalize best_time_to_visit: if it's a plain string, wrap it
  if (typeof city.best_time_to_visit === 'string') {
    city.best_time_to_visit = {
      season: '',
      weather: city.best_time_to_visit,
      reasons: '',
    };
  }

  // Normalize budget_info: convert agent format to template format
  if (city.budget_info && !city.budget_info.daily_budget) {
    city.budget_info = {
      daily_budget: {
        budget: city.budget_info.budget_per_day || city.budget_info.budget || '',
        mid: city.budget_info.midrange_per_day || city.budget_info.mid || '',
        luxury: city.budget_info.luxury_per_day || city.budget_info.luxury || '',
      },
    };
  }

  const relatedCities = getRelatedCities(rawCity, 3);

  // Get transport routes for this city
  const cityTransportLinks: TransportRouteLink[] = transportRoutes.routes
    .filter((r: any) => r.from === slug || r.to === slug)
    .map((r: any) => {
      const isFrom = r.from === slug;
      const otherSlug = isFrom ? r.to : r.from;
      const otherCity = getAllCities().find((c: { slug: string }) => c.slug === otherSlug);
      return {
        slug: r.slug,
        otherName: otherCity?.name?.en || otherSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
        distance: r.distance,
        modes: Object.keys(r.duration),
      };
    })
    .sort((a: TransportRouteLink, b: TransportRouteLink) => {
      // Sort popular routes first, then by fewest modes (most useful)
      const aModes = a.modes.length;
      const bModes = b.modes.length;
      return bModes - aModes;
    })
    .slice(0, 12);

  const comparisonSlugs = getComparisonsForItem(slug, 'city');
  const comparisons = comparisonSlugs.map((s: string) => {
    const pair = getComparisonPair(s);
    if (!pair) return null;
    const otherSlug = pair.item1Slug === slug ? pair.item2Slug : pair.item1Slug;
    const cities = getAllCities();
    const other = cities.find((c: { slug: string }) => c.slug === otherSlug);
    return other ? { slug: s, otherName: other.name, otherSlug: other.slug } : null;
  }).filter(Boolean);

  // Load editorial introduction if available
  let editorial = '';
  try {
    const editorialsPath = require('path').join(process.cwd(), 'data', 'city-editorials.json');
    const fs = require('fs');
    if (fs.existsSync(editorialsPath)) {
      const editorials = JSON.parse(fs.readFileSync(editorialsPath, 'utf8'));
      if (editorials[slug]?.en) {
        editorial = editorials[slug].en;
      }
    }
  } catch {}

  return {
    props: {
      city,
      relatedCities,
      comparisons,
      transportLinks: cityTransportLinks,
      editorial,
    },
    revalidate: 604800,
  };
};
