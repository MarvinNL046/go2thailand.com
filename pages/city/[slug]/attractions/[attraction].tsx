import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCityBySlug, getAttractionBySlug, generateAttractionMetadata, generateAttractionBreadcrumbs, getAllAttractionStaticPaths, toAbsoluteImageUrl } from '../../../../lib/cities';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import TripcomWidget from '../../../../components/TripcomWidget';
import SEOHead from '../../../../components/SEOHead';
import Sources from '../../../../components/blog/Sources';

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
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  opening_hours: string;
  entrance_fee: {
    thb: number | null;
    usd: number | null;
  };
  official_website?: string;
  enhanced_description?: string;
  detailed_history?: string;
  visitor_experience?: string;
  hidden_gem_reason?: string;
  who_should_visit?: string[];
  who_can_skip?: string[];
  best_time_to_visit?: {
    time_of_day: string;
    duration: string;
    crowd_level: string;
  };
  photography_tips?: string[];
  practical_info?: {
    how_to_get_there: string;
    nearby_attractions: string;
    food_options: string;
    shopping: string;
  };
  insider_tips?: string[];
  seasonal_considerations?: string;
  accessibility?: string;
  verified_note?: string;
  cultural_significance?: string;
  fun_facts?: string[];
  googleMapsUrl?: string;
  contentSources?: Array<{
    name: string;
    url: string;
  }>;
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
}

interface AttractionDetailPageProps {
  city: City;
  attraction: Attraction;
}

export default function AttractionDetailPage({ city, attraction }: AttractionDetailPageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  if (!city || !attraction) {
    return <div>{isNl ? 'Bezienswaardigheid niet gevonden' : 'Attraction not found'}</div>;
  }

  const cityName = city.name[lang] || city.name.en;
  const attractionName = attraction.name[lang] || attraction.name.en;
  const attractionDesc = attraction.description[lang] || attraction.description.en;
  const breadcrumbs = generateAttractionBreadcrumbs(city, attraction);
  const metadata = generateAttractionMetadata(attraction, city);

  // Noindex thin pages with less than 100 words of description content
  const descriptionText = [
    attraction.enhanced_description || '',
    attraction.description?.en || '',
    attraction.detailed_history || '',
    attraction.visitor_experience || '',
    attraction.cultural_significance || '',
  ].join(' ');
  const wordCount = descriptionText.split(/\s+/).filter(Boolean).length;
  const shouldIndex = wordCount >= 100;

  // Hide affiliate widgets on pages with less than 300 words
  const showAffiliates = wordCount >= 300;

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        ogImage={toAbsoluteImageUrl(attraction.image)}
      >
        {!shouldIndex && <meta name="robots" content="noindex, follow" />}
        <meta name="keywords" content={metadata.keywords} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              "name": attraction.name.en,
              "description": attraction.enhanced_description || attraction.description.en,
              "image": attraction.image?.startsWith('http') ? attraction.image : `https://go2-thailand.com${attraction.image}`,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": attraction.address,
                "addressCountry": "TH"
              },
              ...(attraction.location?.lat && attraction.location?.lng && {
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": attraction.location.lat,
                  "longitude": attraction.location.lng
                }
              }),
              ...(attraction.opening_hours && { "openingHours": attraction.opening_hours }),
              ...(typeof attraction.entrance_fee.thb === 'number' && attraction.entrance_fee.thb > 0 && {
                "isAccessibleForFree": false,
                "offers": {
                  "@type": "Offer",
                  "price": attraction.entrance_fee.thb,
                  "priceCurrency": "THB"
                }
              }),
              ...(attraction.entrance_fee.thb === 0 && { "isAccessibleForFree": true }),
              "containedInPlace": {
                "@type": "City",
                "name": city.name.en
              },
              "url": `https://go2-thailand.com/city/${city.slug}/attractions/${attraction.slug}`
            })
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={attraction.image}
              alt={attraction.name.en}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-surface-dark/70"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-end">
            <div className="container-custom text-white pb-12">
              <div className="max-w-4xl">
                <div className="flex items-center mb-4">
                  <span className="bg-thailand-gold text-thailand-blue-900 px-3 py-1 rounded-lg text-sm font-semibold mr-3 capitalize">
                    {attraction.type}
                  </span>
                  <span className="text-gray-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {cityName}, Thailand
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-4">
                  {attractionName}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">
                  {attraction.enhanced_description?.substring(0, 200) || attractionDesc}
                  {(attraction.enhanced_description?.length > 200 || attractionDesc.length > 200) && '...'}
                </p>
                
                {/* Quick Info Bar */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {typeof attraction.entrance_fee.thb === 'number' && attraction.entrance_fee.thb > 0 && (
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <svg className="w-5 h-5 mr-2 text-thailand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <span>฿{attraction.entrance_fee.thb} / ${attraction.entrance_fee.usd}</span>
                    </div>
                  )}
                  
                  {attraction.opening_hours && (
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <svg className="w-5 h-5 mr-2 text-thailand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{attraction.opening_hours}</span>
                    </div>
                  )}
                  
                  {attraction.best_time_to_visit?.duration && (
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <svg className="w-5 h-5 mr-2 text-thailand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{attraction.best_time_to_visit.duration}</span>
                    </div>
                  )}

                  {attraction.googleMapsUrl && (
                    <a
                      href={attraction.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2 text-thailand-gold" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>Google Maps</span>
                    </a>
                  )}
                </div>
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
              <div className="lg:col-span-3 space-y-12">
                
                {/* Enhanced Description */}
                {attraction.enhanced_description && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-3xl font-bold font-heading text-thailand-blue-900 mb-6">
                      {isNl ? `Over ${attractionName}` : `About ${attraction.name.en}`}
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {attraction.enhanced_description}
                    </p>
                  </div>
                )}

                {/* Highlights */}
                {attraction.highlights.length > 0 && (
                  <div className="bg-surface-cream rounded-2xl p-8">
                    <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-thailand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {isNl ? 'Belangrijkste Hoogtepunten' : 'Key Highlights'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {attraction.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-6 h-6 bg-thailand-gold rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-4 h-4 text-thailand-blue-900" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-thailand-blue-900 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cultural Significance & History */}
                {(attraction.detailed_history || attraction.cultural_significance) && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-thailand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {isNl ? 'Geschiedenis & Culturele Betekenis' : 'History & Cultural Significance'}
                    </h3>

                    {attraction.detailed_history && (
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-thailand-blue-800 mb-3">{isNl ? 'Historische Achtergrond' : 'Historical Background'}</h4>
                        <p className="text-gray-700 leading-relaxed">{attraction.detailed_history}</p>
                      </div>
                    )}
                    
                    {attraction.cultural_significance && (
                      <div>
                        <h4 className="text-xl font-semibold text-thailand-blue-800 mb-3">{isNl ? 'Cultureel Belang' : 'Cultural Importance'}</h4>
                        <p className="text-gray-700 leading-relaxed">{attraction.cultural_significance}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Visitor Experience */}
                {attraction.visitor_experience && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-thailand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {isNl ? 'Wat te Verwachten' : 'What to Expect'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{attraction.visitor_experience}</p>
                  </div>
                )}

                {(attraction.hidden_gem_reason || attraction.verified_note) && (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {attraction.hidden_gem_reason && (
                      <div className="xl:col-span-2 bg-white rounded-2xl shadow-md p-8">
                        <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-4">
                          {isNl ? `Waarom het een Verborgen Parel is in ${cityName}` : `Why It Is a Hidden Gem in ${city.name.en}`}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{attraction.hidden_gem_reason}</p>
                      </div>
                    )}

                    {attraction.verified_note && (
                      <div className="bg-surface-cream rounded-2xl p-8">
                        <h3 className="text-xl font-bold font-heading text-thailand-blue-900 mb-4">
                          {isNl ? 'Geverifieerde Planningsnotitie' : 'Verified Planning Note'}
                        </h3>
                        <p className="text-thailand-blue-800 leading-relaxed text-sm">
                          {attraction.verified_note}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {(attraction.who_should_visit?.length || attraction.who_can_skip?.length) && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {attraction.who_should_visit && attraction.who_should_visit.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-5">
                            {isNl ? 'Wie Moet Bezoeken' : 'Who Should Visit'}
                          </h3>
                          <div className="space-y-3">
                            {attraction.who_should_visit.map((item, index) => (
                              <div key={index} className="flex items-start">
                                <div className="w-6 h-6 bg-thailand-gold rounded-xl flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                  <svg className="w-3 h-3 text-thailand-blue-900" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {attraction.who_can_skip && attraction.who_can_skip.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-5">
                            {isNl ? 'Je Kunt Het Overslaan Als' : 'You Can Skip It If'}
                          </h3>
                          <div className="space-y-3">
                            {attraction.who_can_skip.map((item, index) => (
                              <div key={index} className="flex items-start">
                                <div className="w-6 h-6 bg-thailand-red rounded-xl flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-10.95a1 1 0 00-1.414-1.414L10 8.757 7.879 6.636a1 1 0 10-1.414 1.414L8.586 10l-2.121 2.121a1 1 0 101.414 1.414L10 11.414l2.121 2.121a1 1 0 001.414-1.414L11.414 10l2.122-2.121z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* In-Content Ad */}

                {/* Photography Tips */}
                {attraction.photography_tips && attraction.photography_tips.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-thailand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {isNl ? 'Fotografietips' : 'Photography Tips'}
                    </h3>
                    <div className="space-y-3">
                      {attraction.photography_tips.map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-thailand-red rounded-xl flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insider Tips */}
                {attraction.insider_tips && attraction.insider_tips.length > 0 && (
                  <div className="bg-surface-cream rounded-2xl p-8">
                    <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-thailand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {isNl ? 'Insider Tips' : 'Insider Tips'}
                    </h3>
                    <div className="space-y-3">
                      {attraction.insider_tips.map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-thailand-gold rounded-xl flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <svg className="w-3 h-3 text-thailand-blue-900" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-thailand-blue-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {attraction.contentSources && attraction.contentSources.length > 0 && (
                  <Sources sources={attraction.contentSources} />
                )}

                {/* Fun Facts */}
                {attraction.fun_facts && attraction.fun_facts.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-thailand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      {isNl ? 'Leuke Weetjes' : 'Fun Facts'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {attraction.fun_facts.map((fact, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-8 h-8 bg-thailand-gold rounded-xl flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trip.com Bundle Widget - Only show on pages with sufficient content */}
                {showAffiliates && (
                  <div className="bg-surface-cream rounded-2xl p-8">
                    <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-4 text-center">
                      {isNl ? 'Bespaar op Hotels & Vluchten' : 'Save on Hotels & Flights'}
                    </h3>
                    <p className="text-gray-700 text-center mb-6">
                      {isNl
                        ? `Bundel je ${cityName} hotel en vlucht voor de beste deals`
                        : `Bundle your ${city.name.en} hotel and flight for the best deals`}
                    </p>
                    <TripcomWidget city={city.name.en} type="bundle" />
                  </div>
                )}

                {/* Book This Experience - Affiliate Section - Only show on pages with sufficient content */}
                {showAffiliates && (
                  <div className="bg-surface-cream rounded-2xl p-8">
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4 text-center">
                      {isNl ? 'Boek Deze Ervaring' : 'Book This Experience'}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {isNl
                        ? `Vind tours, tickets en activiteiten voor ${attractionName} en andere bezienswaardigheden in ${cityName}.`
                        : `Find tours, tickets, and activities for ${attraction.name.en} and other attractions in ${city.name.en}.`}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://klook.tpo.lv/aq6ZFxvc?subid=city-attraction"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-thailand-red text-white font-semibold rounded-xl hover:bg-thailand-red-600 transition-colors shadow-md hover:shadow-xl"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        {isNl ? 'Boek op Klook' : 'Book on Klook'}
                      </a>
                      <a
                        href="https://getyourguide.tpo.lv/GuAFfGGK?subid=city-attraction"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors shadow-md hover:shadow-xl"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {isNl ? 'Boek op GetYourGuide' : 'Book on GetYourGuide'}
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-4">
                      {isNl
                        ? 'Affiliate melding: We kunnen een commissie verdienen wanneer je boekt via onze partnerlinks, zonder extra kosten voor jou.'
                        : 'Affiliate disclosure: We may earn a commission when you book through our partner links, at no extra cost to you.'}
                    </p>
                  </div>
                )}

                {/* Navigation */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/city/${city.slug}/attractions/`}
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      {isNl ? 'Terug naar Bezienswaardigheden' : 'Back to Attractions'}
                    </Link>

                    <Link
                      href={`/city/${city.slug}/`}
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-thailand-blue text-thailand-blue font-semibold rounded-lg hover:bg-thailand-blue hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {isNl ? `${cityName} Overzicht` : `${city.name.en} Overview`}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Quick Facts */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                  <h3 className="text-lg font-bold font-heading text-thailand-blue-900 mb-4">{isNl ? 'Snelle Feiten' : 'Quick Facts'}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{isNl ? 'Adres:' : 'Address:'}</div>
                      <div className="text-sm font-medium">{attraction.address}</div>
                    </div>

                    {attraction.opening_hours && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{isNl ? 'Openingstijden:' : 'Hours:'}</div>
                        <div className="text-sm font-medium">{attraction.opening_hours}</div>
                      </div>
                    )}

                    <div>
                      <div className="text-sm text-gray-600 mb-1">{isNl ? 'Toegangsprijs:' : 'Entrance Fee:'}</div>
                      <div className="text-sm font-medium">
                        {attraction.entrance_fee.thb === 0
                          ? (isNl ? 'Gratis' : 'Free')
                          : attraction.entrance_fee.thb == null
                            ? (isNl ? 'Controleer actuele prijzen' : 'Check current pricing')
                            : `฿${attraction.entrance_fee.thb} / $${attraction.entrance_fee.usd}`}
                      </div>
                    </div>

                    {attraction.best_time_to_visit && (
                      <>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">{isNl ? 'Beste Tijd:' : 'Best Time:'}</div>
                          <div className="text-sm font-medium">{attraction.best_time_to_visit.time_of_day}</div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-600 mb-1">{isNl ? 'Duur:' : 'Duration:'}</div>
                          <div className="text-sm font-medium">{attraction.best_time_to_visit.duration}</div>
                        </div>
                      </>
                    )}

                    {attraction.official_website && (
                      <div>
                        <a 
                          href={attraction.official_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center w-full px-4 py-2 bg-thailand-blue text-white rounded-lg hover:bg-thailand-blue-600 transition-colors text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {isNl ? 'Officiële Website' : 'Official Website'}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Map */}
                {attraction.location?.lat && attraction.location?.lng && (
                  <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <h3 className="text-lg font-bold font-heading text-thailand-blue-900 mb-4">{isNl ? 'Locatie' : 'Location'}</h3>
                    <a
                      href={attraction.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${attraction.location.lat},${attraction.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${attraction.location.lat},${attraction.location.lng}&zoom=15&size=400x200&markers=color:red%7C${attraction.location.lat},${attraction.location.lng}&key=`}
                        alt={isNl ? `Kaart van ${attractionName}` : `Map of ${attraction.name.en}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="flex items-center justify-center text-sm text-thailand-blue font-medium mt-2">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {isNl ? 'Bekijk op Google Maps' : 'View on Google Maps'}
                      </div>
                    </a>
                  </div>
                )}

                {/* Trip.com Search Widget - Only show on pages with sufficient content */}
                {showAffiliates && (
                  <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <h3 className="text-lg font-bold font-heading text-thailand-blue-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-thailand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      {isNl ? 'Plan Je Bezoek' : 'Plan Your Visit'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {isNl
                        ? `Zoek hotels, vluchten en activiteiten in ${cityName}`
                        : `Search for hotels, flights, and activities in ${city.name.en}`}
                    </p>
                    <TripcomWidget city={city.name.en} type="searchbox" />
                  </div>
                )}

                {/* Sidebar Ad */}
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
  // Skip pre-rendering at build time — pages are generated on-demand and cached via ISR
  // This saves ~75s build time (544 pages × 1.76MB each)
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.slug as string;
  const attractionSlug = params?.attraction as string;
  
  const city = getCityBySlug(citySlug);
  const attraction = getAttractionBySlug(citySlug, attractionSlug);
  
  if (!city || !attraction) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      city,
      attraction,
    },
    revalidate: 604800,
  };
};
