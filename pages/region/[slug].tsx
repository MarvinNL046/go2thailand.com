import { GetStaticProps, GetStaticPaths } from 'next';
import SEOHead from '../../components/SEOHead';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import CityCard from '../../components/CityCard';
import { getAllCities, toAbsoluteImageUrl } from '../../lib/cities';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useRouter } from 'next/router';
import AffiliateBox from '../../components/AffiliateBox';
import { getAffiliates, regionFeaturedCities, CityAffiliates } from '../../lib/affiliates';
const { getAllDishes } = require('../../lib/food');
const { getAllItineraries } = require('../../lib/itineraries');

// Helper to resolve bilingual fields — supports both string and {en, nl} formats
function t(field: any, locale: string): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[locale] || field.en || '';
}
function tArr(field: any, locale: string): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  const val = field[locale] || field.en;
  return Array.isArray(val) ? val : [];
}

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
  highlights: string[] | { en: string[]; nl: string[] };
  cities: string[];
  climate: string | { en: string; nl: string };
  bestTimeToVisit: string | { en: string; nl: string };
  image: string;
  geography?: string | { en: string; nl: string };
  culture?: string | { en: string; nl: string };
  cuisine?: string | { en: string; nl: string };
  transportation?: string | { en: string; nl: string };
  budgetInfo?: string | { en: string; nl: string };
  topActivities?: string[] | { en: string[]; nl: string[] };
  hiddenGems?: string[] | { en: string[]; nl: string[] };
  localFestivals?: string[] | { en: string[]; nl: string[] };
  travelTips?: string[] | { en: string[]; nl: string[] };
  whatToPack?: string[] | { en: string[]; nl: string[] };
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
  hasTop10Hotels?: boolean;
  hasTop10Restaurants?: boolean;
  hasTop10Attractions?: boolean;
}

interface RegionalDish {
  slug: string;
  name: { en: string; nl: string };
  category: string;
  image: string;
}

interface RegionalItinerary {
  slug: string;
  title: { en: string; nl: string };
  duration: string;
  image: string;
}

interface RegionalComparison {
  slug: string;
  name1: string;
  name2: string;
}

interface RegionalTransportRoute {
  slug: string;
  from: string;
  to: string;
  distance: string;
}

interface RegionPageProps {
  region: Region;
  cities: City[];
  regionalDishes: RegionalDish[];
  regionalItineraries: RegionalItinerary[];
  regionalComparisons: RegionalComparison[];
  regionalTransportRoutes: RegionalTransportRoute[];
  featuredCityAffiliates: Array<{ cityName: string; citySlug: string; affiliates: CityAffiliates }>;
}

export default function RegionPage({ region, cities, regionalDishes, regionalItineraries, regionalComparisons, regionalTransportRoutes, featuredCityAffiliates }: RegionPageProps) {
  const { locale } = useRouter();
  const lang = locale || 'en';
  const isNl = locale === 'nl';
  const contentAnim = useScrollAnimation(0.05);
  const tipsAnim = useScrollAnimation(0.1);
  const planAnim = useScrollAnimation(0.1);
  const exploreAnim = useScrollAnimation(0.1);

  if (!region) {
    return <div>{isNl ? 'Regio niet gevonden' : 'Region not found'}</div>;
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? "Regio's" : 'Regions', href: '/region/' },
    { name: (isNl && region.name.nl) ? region.name.nl : (region.name[lang] || region.name.en), href: `/region/${region.slug}/` }
  ];

  return (
    <>
      <SEOHead
        title={region.seo.metaTitle[lang] || region.seo.metaTitle.en}
        description={(region.seo.metaDescription[lang] || region.seo.metaDescription.en) || (region.description[lang] || (region.description[lang] || region.description.en))}
        ogImage={toAbsoluteImageUrl(region.image)}
      >
        <meta name="keywords" content={`${(region.name[lang] || region.name.en)}, Thailand, ${region.cities.join(', ')}, travel guide, attractions, culture`} />
        <meta property="og:type" content="website" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={region.image}
              alt={`${(region.name[lang] || region.name.en)}, Thailand`}
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
                  <span className="bg-thailand-red text-white px-3 py-1 rounded-xl text-sm font-semibold mr-3">
                    {cities.length} {isNl ? 'Steden' : 'Cities'}
                  </span>
                  <span className="text-gray-200 text-sm">
                    {isNl ? 'Beste tijd' : 'Best time'}: {t(region.bestTimeToVisit, lang)}
                  </span>
                </div>
                <span className="font-script text-thailand-red text-lg">{isNl ? 'Ontdek de regio' : 'Explore the region'}</span>
                <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-4">
                  {(region.name[lang] || region.name.en)}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">
                  {(region.description[lang] || region.description.en)}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Content */}
        <section className="bg-surface-cream" ref={contentAnim.ref}>
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Region Overview */}
                <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                    {isNl ? `Over ${(region.name[lang] || region.name.en)}` : `About ${(region.name[lang] || region.name.en)}`}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {(region.description[lang] || region.description.en)}
                    </p>

                    <div className="grid grid-cols-2 gap-6 my-8 p-6 bg-white rounded-2xl shadow-sm">
                      <div>
                        <h4 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Steden' : 'Cities'}</h4>
                        <p className="text-2xl font-bold text-thailand-blue">
                          {cities.length}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Beste Tijd' : 'Best Time'}</h4>
                        <p className="text-lg font-medium text-thailand-blue">
                          {t(region.bestTimeToVisit, lang)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Geography & Culture */}
                {(region.geography || region.culture) && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      {isNl ? 'Geografie & Cultuur' : 'Geography & Culture'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {region.geography && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold font-heading text-gray-900">{isNl ? 'Geografie' : 'Geography'}</h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{t(region.geography, lang)}</p>
                        </div>
                      )}

                      {region.culture && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold font-heading text-gray-900">{isNl ? 'Cultuur' : 'Culture'}</h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{t(region.culture, lang)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Cuisine & Transportation */}
                {(region.cuisine || region.transportation) && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      {isNl ? 'Keuken & Vervoer' : 'Cuisine & Getting Around'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {region.cuisine && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold font-heading text-gray-900">{isNl ? 'Lokale Keuken' : 'Local Cuisine'}</h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{t(region.cuisine, lang)}</p>
                        </div>
                      )}

                      {region.transportation && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold font-heading text-gray-900">{isNl ? 'Vervoer' : 'Transportation'}</h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{t(region.transportation, lang)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Top Activities */}
                {tArr(region.topActivities, lang).length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      {isNl ? 'Top Activiteiten' : 'Top Activities'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tArr(region.topActivities, lang).map((activity, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold font-heading text-gray-900">{activity}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hidden Gems */}
                {tArr(region.hiddenGems, lang).length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      {isNl ? 'Verborgen Parels' : 'Hidden Gems'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tArr(region.hiddenGems, lang).map((gem, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold font-heading text-gray-900">{gem}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regional Highlights */}
                <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                    {isNl ? 'Regionale Hoogtepunten' : 'Regional Highlights'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tArr(region.highlights, lang).map((highlight, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold font-heading text-gray-900">{highlight}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Cities in Region */}
                <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                    {isNl ? `Steden in ${(region.name[lang] || region.name.en)}` : `Cities in ${(region.name[lang] || region.name.en)}`}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {isNl ? `Ontdek ${cities.length} prachtige steden in ${(region.name[lang] || region.name.en)}, elk met unieke ervaringen en attracties.` : `Explore ${cities.length} amazing cities in ${(region.name[lang] || region.name.en)}, each offering unique experiences and attractions.`}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cities.map((city) => (
                      <div key={city.id}>
                        <CityCard city={city} />
                        {(city.hasTop10Hotels || city.hasTop10Restaurants || city.hasTop10Attractions) && (
                          <div className="flex flex-wrap gap-2 mt-2 px-1">
                            {city.hasTop10Hotels && (
                              <Link href={`/city/${city.slug}/top-10-hotels/`} className="text-xs text-thailand-blue hover:underline">Hotels</Link>
                            )}
                            {city.hasTop10Hotels && city.hasTop10Restaurants && <span className="text-gray-300">·</span>}
                            {city.hasTop10Restaurants && (
                              <Link href={`/city/${city.slug}/top-10-restaurants/`} className="text-xs text-thailand-blue hover:underline">Restaurants</Link>
                            )}
                            {(city.hasTop10Hotels || city.hasTop10Restaurants) && city.hasTop10Attractions && <span className="text-gray-300">·</span>}
                            {city.hasTop10Attractions && (
                              <Link href={`/city/${city.slug}/top-10-attractions/`} className="text-xs text-thailand-blue hover:underline">Attractions</Link>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regional Food */}
                {regionalDishes.length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      {isNl ? `Regionale Keuken van ${(region.name[lang] || region.name.en)}` : `Regional Cuisine of ${(region.name[lang] || region.name.en)}`}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {isNl ? `Ontdek de kenmerkende gerechten die ${(region.name[lang] || region.name.en)} tot een culinaire bestemming maken.` : `Discover the signature dishes that make ${(region.name[lang] || region.name.en)} a culinary destination.`}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {regionalDishes.map((dish) => (
                        <Link key={dish.slug} href={`/food/${dish.slug}/`} className="group">
                          <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-32">
                              <Image src={dish.image} alt={dish.name[lang] || dish.name.en} fill className="object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="p-3">
                              <h3 className="font-semibold text-sm text-gray-900 group-hover:text-thailand-blue transition-colors">{dish.name[lang] || dish.name.en}</h3>
                              <span className="text-xs text-gray-500 capitalize">{dish.category.replace('-', ' ')}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Link href="/food/" className="text-thailand-blue font-medium hover:underline text-sm">
                        {isNl ? 'Bekijk alle Thaise gerechten' : 'Browse all Thai dishes'} &rarr;
                      </Link>
                    </div>
                  </div>
                )}

                {/* Regional Itineraries */}
                {regionalItineraries.length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      {isNl ? `Reisroutes voor ${(region.name[lang] || region.name.en)}` : `Itineraries for ${(region.name[lang] || region.name.en)}`}
                    </h2>
                    <div className="space-y-4">
                      {regionalItineraries.map((it) => (
                        <Link key={it.slug} href={`/itineraries/${it.slug}/`} className="block group">
                          <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow flex items-center gap-4">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                              <Image src={it.image} alt={it.title.en} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors truncate">{it.title[lang] || it.title.en}</h3>
                              <span className="text-sm text-gray-500">{it.duration}</span>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-thailand-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compare Cities in Region */}
                {regionalComparisons.length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      {isNl ? `Vergelijk Steden in ${(region.name[lang] || region.name.en)}` : `Compare Cities in ${(region.name[lang] || region.name.en)}`}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {regionalComparisons.map((comp) => (
                        <Link key={comp.slug} href={`/compare/${comp.slug}/`} className="group">
                          <div className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center justify-between">
                            <span className="font-medium text-gray-800 group-hover:text-thailand-blue transition-colors text-sm">
                              {comp.name1} vs {comp.name2}
                            </span>
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-thailand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transport Routes in Region */}
                {regionalTransportRoutes.length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      {isNl ? `Vervoer in ${(region.name[lang] || region.name.en)}` : `Getting Around ${(region.name[lang] || region.name.en)}`}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {regionalTransportRoutes.map((route) => (
                        <Link key={route.slug} href={`/transport/${route.slug}/`} className="group">
                          <div className="bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition-shadow flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-gray-800 group-hover:text-thailand-blue transition-colors">
                                {route.from} &rarr; {route.to}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">{route.distance}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regional Travel Guide */}
                <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                    {isNl ? `Reisgids voor ${(region.name[lang] || region.name.en)}` : `Travel Guide for ${(region.name[lang] || region.name.en)}`}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Getting Around */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold font-heading text-gray-900">Getting Around</h3>
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
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold font-heading text-gray-900">What to Expect</h3>
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
                <div className="bg-white rounded-2xl border-0 shadow-md p-6 mb-8">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Snelle Feiten' : 'Quick Facts'}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{isNl ? 'Steden:' : 'Cities:'}</span>
                      <span className="font-medium">{cities.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{isNl ? 'Beste Tijd:' : 'Best Time:'}</span>
                      <span className="font-medium">{t(region.bestTimeToVisit, lang)}</span>
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
                  <div className="bg-white rounded-2xl border-0 shadow-md p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-gray-900">{isNl ? 'Budgetgids' : 'Budget Guide'}</h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{t(region.budgetInfo, lang)}</p>
                  </div>
                )}

                {/* Local Festivals */}
                {tArr(region.localFestivals, lang).length > 0 && (
                  <div className="bg-white rounded-2xl border-0 shadow-md p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-gray-900">{isNl ? 'Lokale Festivals' : 'Local Festivals'}</h3>
                    </div>
                    <div className="space-y-2">
                      {tArr(region.localFestivals, lang).map((festival, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{festival}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Travel Tips */}
                {tArr(region.travelTips, lang).length > 0 && (
                  <div className="bg-white rounded-2xl border-0 shadow-md p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-gray-900">{isNl ? 'Pro Tips' : 'Pro Tips'}</h3>
                    </div>
                    <div className="space-y-3">
                      {tArr(region.travelTips, lang).slice(0, 3).map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-4 h-4 bg-blue-400 rounded-full mr-3 flex-shrink-0 mt-0.5"></div>
                          <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What to Pack */}
                {tArr(region.whatToPack, lang).length > 0 && (
                  <div className="bg-white rounded-2xl border-0 shadow-md p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-gray-900">{isNl ? 'Paklijst' : 'Packing List'}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {tArr(region.whatToPack, lang).slice(0, 6).map((item, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {/* Regional Highlights */}
                <div className="bg-white rounded-2xl border-0 shadow-md p-6 mb-8">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Regionale Specialiteiten' : 'Regional Specialties'}</h3>
                  <div className="space-y-3">
                    {tArr(region.highlights, lang).slice(0, 4).map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-thailand-blue rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Cities */}
                <div className="bg-white rounded-2xl border-0 shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Populaire Steden' : 'Popular Cities'}</h3>
                  <div className="space-y-3">
                    {cities.slice(0, 4).map((city) => (
                      <Link key={city.id} href={`/city/${city.slug}/`}>
                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-cream transition-colors cursor-pointer">
                          <span className="text-gray-700 font-medium">{city.name[lang] || city.name.en}</span>
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
        <section className="bg-surface-cream section-padding" ref={tipsAnim.ref}>
          <div className="container-custom">
            <div className={`text-center mb-10 scroll-fade-up ${tipsAnim.isVisible ? 'is-visible' : ''}`}>
              <span className="section-label">{isNl ? 'Reis slimmer' : 'Travel smarter'}</span>
              <h2 className="section-title">
                {isNl ? `Tips voor een Bezoek aan ${(region.name[lang] || region.name.en)}` : `Tips for Visiting ${(region.name[lang] || region.name.en)}`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`bg-white p-6 rounded-2xl shadow-sm scroll-fade-up ${tipsAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">{isNl ? 'Wanneer Bezoeken' : 'When to Visit'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(region.bestTimeToVisit, lang)} offers the best weather conditions for exploring {(region.name[lang] || region.name.en)}.
                  Plan accordingly for the most comfortable experience.
                </p>
              </div>

              <div className={`bg-white p-6 rounded-2xl shadow-sm scroll-fade-up ${tipsAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">{isNl ? 'Rondreizen' : 'Getting Around'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isNl ? 'Vervoer varieert per regio. Onderzoek de beste opties om tussen steden te reizen en lokaal vervoer binnen elke bestemming.' : 'Transportation varies by region. Research the best options for moving between cities and local transport within each destination.'}
                </p>
              </div>

              <div className={`bg-white p-6 rounded-2xl shadow-sm scroll-fade-up ${tipsAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">{isNl ? 'Culturele Tips' : 'Cultural Tips'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isNl ? 'Elke regio heeft unieke gebruiken en tradities. Het leren van basiszinnen in het Thai en het respecteren van lokale gewoonten verrijkt je ervaring.' : 'Each region has unique customs and traditions. Learning basic Thai phrases and respecting local customs will enhance your experience.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Plan Your Trip */}
        <section className="bg-white section-padding" ref={planAnim.ref}>
          <div className="container-custom">
            <div className={`text-center mb-10 scroll-fade-up ${planAnim.isVisible ? 'is-visible' : ''}`}>
              <span className="section-label">{isNl ? 'Boek met vertrouwen' : 'Book with confidence'}</span>
              <h2 className="section-title">
                {isNl ? `Plan Je Reis naar ${(region.name[lang] || region.name.en)}` : `Plan Your Trip to ${(region.name[lang] || region.name.en)}`}
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Find the best deals on hotels, transport, and activities for your {(region.name[lang] || region.name.en)} adventure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              {/* Hotels */}
              <div className={`bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow scroll-fade-up ${planAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Hotels & Accommodatie' : 'Hotels & Accommodation'}</h3>
                <p className="text-gray-600 text-sm mb-4">Compare prices on top booking platforms for {(region.name[lang] || region.name.en)}.</p>
                {featuredCityAffiliates.map(({ cityName, affiliates }) => (
                  <AffiliateBox key={cityName} affiliates={affiliates} cityName={cityName} type="hotels" />
                ))}
              </div>

              {/* Transport */}
              <div className={`bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow scroll-fade-up ${planAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Vervoer & Transfers' : 'Transport & Transfers'}</h3>
                <p className="text-gray-600 text-sm mb-4">Book buses, trains, ferries, and flights across {(region.name[lang] || region.name.en)}.</p>
                <a href="https://12go.tpo.lv/tNA80urD?subid=region" target="_blank" rel="noopener noreferrer" className="block bg-green-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors text-sm">
                  Book on 12Go Asia
                </a>
              </div>

              {/* Activities */}
              <div className={`bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow scroll-fade-up ${planAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Tours & Activiteiten' : 'Tours & Activities'}</h3>
                <p className="text-gray-600 text-sm mb-4">Discover the best things to do in {(region.name[lang] || region.name.en)}.</p>
                <Link href="/activities/" className="block bg-orange-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-orange-700 transition-colors text-sm">
                  {isNl ? 'Bekijk Activiteiten' : 'Browse Activities'}
                </Link>
              </div>
            </div>

            {featuredCityAffiliates[0] && (
              <div className="mt-6">
                <AffiliateBox
                  affiliates={featuredCityAffiliates[0].affiliates}
                  cityName={featuredCityAffiliates[0].cityName}
                  type="activities"
                />
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              {isNl ? 'Deze sectie bevat affiliate links. We kunnen een kleine commissie ontvangen zonder extra kosten voor jou.' : 'This section contains affiliate links. We may earn a small commission at no extra cost to you.'}
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-surface-cream section-padding" ref={exploreAnim.ref}>
          <div className="container-custom">
            <div className={`text-center mb-10 scroll-fade-up ${exploreAnim.isVisible ? 'is-visible' : ''}`}>
              <span className="section-label">{isNl ? 'Blijf ontdekken' : 'Keep exploring'}</span>
              <h2 className="section-title">
                {isNl ? 'Ontdek Meer' : 'Explore More'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/region/" className={`group scroll-fade-up ${exploreAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                      </svg>
                    </div>
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Alle Regio\'s' : 'All Regions'}</h3>
                    <p className="text-gray-600 text-sm">{isNl ? 'Vergelijk alle Thaise regio\'s' : 'Compare all Thai regions'}</p>
                  </div>
                </div>
              </Link>

              <Link href="/city/" className={`group scroll-fade-up ${exploreAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Alle Steden' : 'All Cities'}</h3>
                    <p className="text-gray-600 text-sm">{isNl ? 'Bekijk alle bestemmingen' : 'Browse all destinations'}</p>
                  </div>
                </div>
              </Link>

              <Link href="/food/" className={`group scroll-fade-up ${exploreAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Thais Eten' : 'Thai Food'}</h3>
                    <p className="text-gray-600 text-sm">{isNl ? 'Ontdek de Thaise keuken' : 'Explore Thai cuisine'}</p>
                  </div>
                </div>
              </Link>

              <Link href="/islands/" className={`group scroll-fade-up ${exploreAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Thaise Eilanden' : 'Thai Islands'}</h3>
                    <p className="text-gray-600 text-sm">{isNl ? 'Strandparadijs gids' : 'Beach paradise guide'}</p>
                  </div>
                </div>
              </Link>

              <Link href="/top-10/" className={`group scroll-fade-up ${exploreAnim.isVisible ? 'is-visible' : ''}`}>
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-thailand-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Top 10 Lijsten' : 'Top 10 Lists'}</h3>
                    <p className="text-gray-600 text-sm">{isNl ? 'Beste attracties & meer' : 'Best attractions & more'}</p>
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
    fallback: 'blocking',
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

  // Get cities in this region dynamically based on each city's region field
  const allCities = getAllCities();
  const regionMap: Record<string, string> = {
    northern: 'Northern',
    central: 'Central',
    southern: 'Southern',
    isaan: 'Isaan',
  };
  const regionName = regionMap[slug] || slug;
  const cities = allCities.filter((city: any) => city.region === regionName);
  const top10Dir = path.join(process.cwd(), 'data', 'top10');
  const citiesWithTop10Info = cities.map((city: any) => ({
    ...city,
    hasTop10Hotels: fs.existsSync(path.join(top10Dir, `${city.slug}-hotels.json`)),
    hasTop10Restaurants: fs.existsSync(path.join(top10Dir, `${city.slug}-restaurants.json`)),
    hasTop10Attractions: fs.existsSync(path.join(top10Dir, `${city.slug}-attractions.json`)),
  }));
  const citySlugs = new Set(cities.map((c: any) => c.slug));

  // Regional food dishes
  const foodRegionMap: Record<string, string[]> = {
    northern: ['northern'],
    central: ['central'],
    southern: ['southern'],
    isaan: ['isaan', 'northeastern', 'northeast'],
  };
  const foodRegions = foodRegionMap[slug] || [slug];
  const allDishes = getAllDishes();
  const regionalDishes = allDishes
    .filter((d: any) => foodRegions.includes((d.region || '').toLowerCase()))
    .slice(0, 9)
    .map((d: any) => ({
      slug: d.slug,
      name: d.name,
      category: d.category || '',
      image: d.image || '/images/food/default.webp',
    }));

  // Regional itineraries
  const allItineraries = getAllItineraries();
  const regionalItineraries = allItineraries
    .filter((it: any) => {
      const itRegion = (it.region || '').toLowerCase();
      return itRegion === slug || itRegion === regionName.toLowerCase();
    })
    .slice(0, 4)
    .map((it: any) => ({
      slug: it.slug,
      title: it.title,
      duration: it.duration || '',
      image: it.image || '/images/itineraries/default.webp',
    }));

  // Regional comparisons (between cities in this region)
  const regionalComparisons: Array<{ slug: string; name1: string; name2: string }> = [];
  const cityArr = cities.map((c: any) => ({ slug: c.slug, name: typeof c.name === 'object' ? c.name.en : c.name }));
  for (let i = 0; i < cityArr.length; i++) {
    for (let j = i + 1; j < cityArr.length; j++) {
      const compSlug = `${cityArr[i].slug}-vs-${cityArr[j].slug}`;
      const compPath = path.join(process.cwd(), 'data', 'comparisons', 'city', `${compSlug}.json`);
      if (fs.existsSync(compPath)) {
        regionalComparisons.push({ slug: compSlug, name1: cityArr[i].name, name2: cityArr[j].name });
      }
      // Also check reverse
      const reverseSlug = `${cityArr[j].slug}-vs-${cityArr[i].slug}`;
      const reversePath = path.join(process.cwd(), 'data', 'comparisons', 'city', `${reverseSlug}.json`);
      if (fs.existsSync(reversePath)) {
        regionalComparisons.push({ slug: reverseSlug, name1: cityArr[j].name, name2: cityArr[i].name });
      }
    }
  }

  // Regional transport routes (between cities in this region)
  const transportData = fs.readFileSync(path.join(process.cwd(), 'data', 'transport-routes.json'), 'utf8');
  const transportRoutes = JSON.parse(transportData);
  const regionalTransportRoutes = (transportRoutes.routes || [])
    .filter((r: any) => citySlugs.has(r.from) && citySlugs.has(r.to))
    .slice(0, 10)
    .map((r: any) => ({
      slug: r.slug,
      from: r.fromName || r.from.split('-').map((w: string) => w[0].toUpperCase() + w.slice(1)).join(' '),
      to: r.toName || r.to.split('-').map((w: string) => w[0].toUpperCase() + w.slice(1)).join(' '),
      distance: r.distance || '',
    }));

  const featuredSlugs = regionFeaturedCities[region.slug] || [];
  const featuredCityAffiliates = featuredSlugs
    .map(slug => {
      const aff = getAffiliates(slug);
      const city = cities.find((c: any) => c.slug === slug);
      return aff && city ? { cityName: city.name.en, citySlug: slug, affiliates: aff } : null;
    })
    .filter((x): x is { cityName: string; citySlug: string; affiliates: CityAffiliates } => x !== null);

  return {
    props: {
      region,
      cities: citiesWithTop10Info,
      regionalDishes,
      regionalItineraries,
      regionalComparisons,
      regionalTransportRoutes,
      featuredCityAffiliates,
    },
    revalidate: 604800,
  };
};
