import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs, getCityImageForSection, getEnhancedAttractionsByCity, toAbsoluteImageUrl } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import CitySupportSources from '../../../components/CitySupportSources';

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
  visitAccess?: 'Free' | 'Ticketed' | null;
  enhanced_description?: string;
  googleMapsUrl?: string;
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
  contentSources?: any[];
  reviewed_by?: string;
  reviewed_at?: string;
  enhanced_at?: string;
  editorialPositioning?: string;
  sourceSummary?: string;
}

interface CityAttractionsPageProps {
  city: City;
  attractions: Attraction[];
}

export default function CityAttractionsPage({ city, attractions }: CityAttractionsPageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  if (!city) {
    return <div>{isNl ? 'Stad niet gevonden' : 'City not found'}</div>;
  }

  const cityName = city.name[lang] || city.name.en;
  const breadcrumbs = generateBreadcrumbs(city, 'attractions');
  const baseMetadata = generateCityMetadata(city, 'attractions');

  // SEO-optimized title & description for attractions pages
  const metadata = {
    ...baseMetadata,
    title: isNl
      ? `Top Bezienswaardigheden in ${cityName} 2026 — Must-See Plekken`
      : `Top Attractions in ${city.name.en} 2026 — Must-See Places`,
    description: isNl
      ? `Ontdek de beste bezienswaardigheden in ${cityName} met praktische routelogica, lokale context en de stops die je tijd echt waard zijn.`
      : `Explore the strongest attractions in ${city.name.en} with practical route logic, local context, and the stops that actually justify your time.`,
  };

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        ogImage={metadata.openGraph?.images?.[0]?.url || toAbsoluteImageUrl(getCityImageForSection(city, 'attractions'))}
      >
        <meta name="keywords" content={metadata.keywords} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative h-80 lg:h-96 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={getCityImageForSection(city, 'attractions')}
              alt={isNl ? `Bezienswaardigheden in ${cityName}, Thailand` : `Attractions in ${city.name.en}, Thailand`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-surface-dark/70"></div>
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="container-custom text-white">
              <div className="max-w-4xl">
                <div className="flex items-center mb-4">
                  <span className="bg-thailand-red text-white px-3 py-1 rounded-xl text-sm font-semibold mr-3">
                    {city.region} Thailand
                  </span>
                  <span className="text-gray-200 text-sm">
                    {isNl ? 'Bezienswaardigheden Gids' : 'Attractions Guide'}
                  </span>
                </div>
                <p className="font-script text-thailand-gold text-sm mb-2">{isNl ? 'Ontdek' : 'Discover'}</p>
                <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-4">
                  {isNl ? `Bezienswaardigheden in ${cityName}` : `Attractions in ${city.name.en}`}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">
                  {city.categories.attractions[lang] || city.categories.attractions.en}
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

        {(city.contentSources?.length || city.reviewed_by || city.reviewed_at || city.enhanced_at || city.editorialPositioning || city.sourceSummary) && (
          <section className="section-padding pt-8">
            <div className="container-custom">
              <CitySupportSources
                cityName={cityName}
                contentSources={city.contentSources}
                reviewedBy={city.reviewed_by}
                reviewedAt={city.reviewed_at}
                enhancedAt={city.enhanced_at}
                editorialPositioning={city.editorialPositioning}
                sourceSummary={city.sourceSummary}
              />
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Attractions Overview */}
                <div className="mb-12">
                  <div className="bg-surface-cream rounded-2xl p-8 mb-8">
                    <p className="font-script text-thailand-gold text-sm mb-2">{isNl ? 'Must-See' : 'Must-See'}</p>
                    <h2 className="text-3xl font-bold font-heading text-thailand-blue-900 mb-4">
                      {isNl ? 'Must-Visit Bezienswaardigheden' : 'Must-Visit Attractions'}
                    </h2>
                    <p className="text-thailand-blue-700 text-lg leading-relaxed">
                      {city.enhanced_description
                        ? (isNl
                            ? `Ontdek de ongelooflijke bezienswaardigheden die ${cityName} bijzonder maken. ${city.enhanced_description.substring(0, 200)}...`
                            : `Discover the incredible attractions that make ${city.name.en} special. ${city.enhanced_description.substring(0, 200)}...`)
                        : (isNl
                            ? `Ontdek de top bezienswaardigheden in ${cityName}, van oude tempels tot moderne landmarks. Elke bestemming biedt unieke inzichten in de Thaise cultuur en geschiedenis.`
                            : `Explore the top attractions in ${city.name.en}, from ancient temples to modern landmarks. Each destination offers unique insights into Thai culture and history.`)
                      }
                    </p>
                  </div>

                  {/* Attractions Grid */}
                  {attractions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {attractions.map((attraction, index) => (
                        <Link 
                          key={attraction.id} 
                          href={`/city/${city.slug}/attractions/${attraction.slug}/`}
                          className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-0"
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

                            {/* Visit Access */}
                            {attraction.visitAccess && (
                              <div className="absolute bottom-4 left-4">
                                <span className="bg-white/90 backdrop-blur-sm text-thailand-blue-900 px-2 py-1 rounded-lg text-xs font-semibold">
                                  {isNl ? (attraction.visitAccess === 'Free' ? 'Gratis' : 'Toegangskaart') : attraction.visitAccess}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold font-heading text-thailand-blue-900 mb-3 group-hover:text-thailand-red transition-colors">
                              {attraction.name[lang] || attraction.name.en}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                              {attraction.enhanced_description?.substring(0, 150) || (attraction.description[lang] || attraction.description.en)}
                              {(attraction.enhanced_description?.length > 150 || (attraction.description[lang] || attraction.description.en).length > 150) && '...'}
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
                              <div className="flex items-center gap-3">
                                <div className="flex items-center text-thailand-blue text-sm">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <span>{cityName}</span>
                                </div>
                                {attraction.googleMapsUrl && (
                                  <a
                                    href={attraction.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs text-gray-500 hover:text-thailand-blue transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <svg className="w-3.5 h-3.5 mr-0.5" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                    Maps
                                  </a>
                                )}
                              </div>
                              <div className="text-thailand-blue hover:text-thailand-red font-medium text-sm flex items-center transition-colors group">
                                <span>{isNl ? 'Lees Meer' : 'Learn More'}</span>
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
                      <div className="w-24 h-24 bg-thailand-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-thailand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                        {isNl ? `Ontdek ${cityName} Bezienswaardigheden` : `Explore ${city.name.en} Attractions`}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {isNl
                          ? `Gedetailleerde gidsen voor bezienswaardigheden in ${cityName} worden voorbereid. Bekijk in de tussentijd ons stadsoverzicht voor highlights en reistips.`
                          : `Detailed attraction guides for ${city.name.en} are being prepared. In the meantime, check out our city overview for highlights and travel tips.`}
                      </p>
                    </div>
                  )}
                </div>

                {/* In-Content Ad */}
                <div className="mb-12">
                </div>

                {/* Travel Tips for Attractions */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                  <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-thailand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {isNl ? 'Tips voor het Bezoeken van Bezienswaardigheden' : 'Tips for Visiting Attractions'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-red rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{isNl ? 'Bezoek vroeg in de ochtend om drukte te vermijden' : 'Visit early morning to avoid crowds'}</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-red rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{isNl ? 'Kleed je bescheiden bij het bezoeken van tempels' : 'Dress modestly when visiting temples'}</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-red rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{isNl ? 'Neem water mee en blijf gehydrateerd' : 'Bring water and stay hydrated'}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-blue rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{isNl ? 'Controleer openingstijden voor je bezoek' : 'Check opening hours before visiting'}</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-blue rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{isNl ? 'Respecteer lokale gewoonten en tradities' : 'Respect local customs and traditions'}</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 bg-thailand-blue rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{isNl ? 'Neem comfortabele wandelschoenen mee' : 'Bring comfortable walking shoes'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Planning Links */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                  <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-4 text-center">
                    {isNl ? `Handige Links voor ${cityName}` : `Optional Planning Links for ${city.name.en}`}
                  </h3>
                  <p className="text-gray-600 text-center mb-8">
                    {isNl
                      ? 'Gebruik deze interne gidsen nadat je hebt besloten welke wijken en bezienswaardigheden bij je route passen.'
                      : 'Use these internal guides after deciding which neighborhoods and attraction types fit your route.'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border-0 bg-surface-cream rounded-2xl p-6 text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{isNl ? 'Stadsoverzicht' : 'City overview'}</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {isNl
                          ? `Bouw je ${cityName} route op vanuit de sterkste wijk-level context.`
                          : `Rebuild your ${city.name.en} route from the strongest district-level context.`}
                      </p>
                      <Link href={`/city/${city.slug}/`} className="inline-flex items-center justify-center w-full px-6 py-3 bg-thailand-red text-white font-semibold rounded-xl hover:bg-thailand-red-600 transition-colors">
                        {isNl ? 'Bekijk Stadsoverzicht' : 'See City Overview'}
                      </Link>
                    </div>
                    <div className="border-0 bg-surface-cream rounded-2xl p-6 text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{isNl ? 'Eten & Drinken' : 'Food & Dining'}</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {isNl
                          ? 'Combineer grote bezienswaardigheden met een slimmer buurt-maaltijdplan.'
                          : 'Pair major sights with a smarter neighborhood meal plan.'}
                      </p>
                      <Link href={`/city/${city.slug}/food/`} className="inline-flex items-center justify-center w-full px-6 py-3 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors">
                        {isNl ? 'Bekijk Etengids' : 'See Food Guide'}
                      </Link>
                    </div>
                    <div className="border-0 bg-surface-cream rounded-2xl p-6 text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hotels' : 'Hotels'}</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {isNl
                          ? 'Kies een uitvalsbasis die het reizen door de stad beperkt.'
                          : 'Choose a base that cuts down cross-city transfers.'}
                      </p>
                      <Link href={`/city/${city.slug}/hotels/`} className="inline-flex items-center justify-center w-full px-6 py-3 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-colors">
                        {isNl ? 'Bekijk Hotelgids' : 'See Hotel Guide'}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick Navigation */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h3 className="text-2xl font-bold font-heading text-thailand-blue-900 mb-6 text-center">
                    {isNl ? `Ontdek Meer van ${cityName}` : `Explore More of ${city.name.en}`}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                      href={`/city/${city.slug}/food/`}
                      className="group flex items-center p-6 border-0 bg-surface-cream rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-thailand-blue rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-thailand-blue-900 group-hover:text-thailand-red text-lg mb-1">{isNl ? 'Eten & Drinken' : 'Food & Dining'}</h4>
                        <p className="text-gray-600 text-sm">{city.categories.food[lang] || city.categories.food.en}</p>
                      </div>
                    </Link>

                    <Link
                      href={`/city/${city.slug}/hotels/`}
                      className="group flex items-center p-6 border-0 bg-surface-cream rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-thailand-red rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-thailand-blue-900 group-hover:text-thailand-red text-lg mb-1">{isNl ? 'Hotels & Verblijf' : 'Hotels & Stay'}</h4>
                        <p className="text-gray-600 text-sm">{city.categories.hotels[lang] || city.categories.hotels.en}</p>
                      </div>
                    </Link>
                  </div>

                  <div className="text-center mt-8">
                    <Link
                      href={`/city/${city.slug}/`}
                      className="inline-flex items-center px-6 py-3 bg-thailand-blue text-white font-semibold rounded-xl hover:bg-thailand-blue-600 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      {isNl ? `Terug naar ${cityName} Overzicht` : `Back to ${city.name.en} Overview`}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                  <h3 className="text-lg font-bold font-heading text-thailand-blue-900 mb-4">{isNl ? 'Snelle Info' : 'Quick Info'}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">{isNl ? 'Totaal Bezienswaardigheden:' : 'Total Attractions:'}</span>
                      <span className="font-bold text-thailand-blue">{attractions.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">{isNl ? 'Regio:' : 'Region:'}</span>
                      <span className="font-medium text-thailand-blue">{city.region}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">{isNl ? 'Provincie:' : 'Province:'}</span>
                      <span className="font-medium text-thailand-blue">{city.province}</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Ad */}

                {/* Travel Tips */}
                <div className="bg-surface-cream rounded-2xl p-6 mt-8">
                  <h3 className="text-lg font-bold font-heading text-thailand-blue-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-thailand-gold-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {isNl ? 'Pro Tip' : 'Pro Tip'}
                  </h3>
                  <p className="text-thailand-blue-700 text-sm leading-relaxed">
                    {isNl
                      ? `Veel bezienswaardigheden in ${cityName} liggen op loopafstand van elkaar. Plan je route om je tijd te maximaliseren en reistijd tussen locaties te minimaliseren.`
                      : `Many attractions in ${city.name.en} are within walking distance of each other. Plan your route to maximize your time and minimize travel between sites.`}
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
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug, locale);
  
  if (!city) {
    return {
      notFound: true,
    };
  }

  const rawCity = city as any;
  const sanitizedCity = {
    id: city.id,
    slug: city.slug,
    name: city.name,
    region: city.region,
    province: city.province,
    description: city.description,
    highlights: city.highlights,
    image: city.image,
    images: city.images || null,
    categories: city.categories,
    enhanced_description: city.enhanced_description || null,
    contentSources: rawCity.contentSources || rawCity.content_sources || [],
    reviewed_by: rawCity.reviewed_by ?? null,
    reviewed_at: rawCity.reviewed_at ?? null,
    enhanced_at: rawCity.enhanced_at ?? null,
    editorialPositioning: rawCity.editorialPositioning ?? null,
    sourceSummary: rawCity.sourceSummary ?? null,
  };
  const attractions = getEnhancedAttractionsByCity(slug).map((attraction) => ({
    id: attraction.id,
    slug: attraction.slug,
    name: attraction.name,
    type: attraction.type,
    description: attraction.description,
    highlights: attraction.highlights,
    image: attraction.image,
    visitAccess: typeof attraction.entrance_fee?.thb === 'number'
      ? (attraction.entrance_fee.thb > 0 ? 'Ticketed' : 'Free')
      : null,
    enhanced_description: attraction.enhanced_description || null,
    googleMapsUrl: attraction.googleMapsUrl || null,
  }));

  return {
    props: {
      city: sanitizedCity,
      attractions,
    },
    revalidate: 604800,
  };
};
