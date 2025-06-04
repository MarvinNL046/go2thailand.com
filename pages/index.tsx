import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAllCities } from '../lib/cities';
import { getPopularDishes } from '../lib/food';
import CityCard from '../components/CityCard';
import EzoicAd from '../components/EzoicAd';
import TripcomWidget from '../components/TripcomWidget';
import TypewriterText from '../components/TypewriterText';
import FadeInText from '../components/FadeInText';
import HighlightedText from '../components/HighlightedText';
import { AD_PLACEMENTS } from '../lib/ads/ezoic-config';
import { useTranslation } from '../hooks/useTranslation';

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

interface Dish {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
    thai: string;
  };
  category: string;
  region: string;
  spice_level: string;
  image: string;
  difficulty: string;
  preparation_time: string;
  price_range: string;
  ingredients: string[];
}

interface HomeProps {
  cities: City[];
  featuredCities: City[];
  popularDishes: Dish[];
}

export default function Home({ cities, featuredCities, popularDishes }: HomeProps) {
  const { t } = useTranslation('common');
  
  // Hero slider state and logic
  const heroImages = [
    '/images/homepageHero/business-district-bangkok.webp',
    '/images/homepageHero/downtown-bangkok.webp',
    '/images/homepageHero/lao-landing-beach.webp',
    '/images/homepageHero/railayBeach.webp'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5500); // Change image every 5.5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <>
      <Head>
        <title>{t('meta.mainTitle')}</title>
        <meta 
          name="description" 
          content={t('meta.mainDescription')} 
        />
        <meta name="keywords" content={t('meta.mainKeywords')} />
        <meta property="og:title" content={t('meta.mainTitle')} />
        <meta property="og:description" content={t('meta.mainDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://go2-thailand.com/" />
        
        {/* Preload the first hero image for better LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/homepageHero/business-district-bangkok.webp"
          type="image/webp"
        />
      </Head>

      {/* Hero Section with Auto-Rotating Slider */}
      <section className="relative h-[500px] sm:h-96 lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          {/* Background Images */}
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Beautiful Thailand scenery ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0} // Only prioritize first image
                loading={index === 0 ? "eager" : "lazy"} // Eager load first image
                quality={75} // Lower quality for faster load
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw" // Responsive sizes
                placeholder="blur" // Add blur placeholder
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          ))}
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:py-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              <TypewriterText text={t('hero.title')} speed={80} className="text-white" />
            </h1>
            <FadeInText delay={2000} duration={800}>
              <p className="text-xl lg:text-2xl text-gray-200 mb-4 max-w-2xl mx-auto drop-shadow-md">
                {t('hero.subtitle')}
              </p>
            </FadeInText>
            <FadeInText delay={2500} duration={800}>
              <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-md">
                <HighlightedText 
                  text={t('hero.seoIntro')}
                  highlightWords={['Bangkok', 'Phuket', 'Chiang Mai', '2025']}
                  highlightClassName="text-thailand-red font-bold"
                  animationType="glow"
                />
              </p>
            </FadeInText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/city/" className="btn-primary shadow-lg">
                {t('buttons.exploreCities')}
              </Link>
              <Link href="#featured" className="btn-secondary bg-white text-thailand-blue hover:bg-gray-100 shadow-lg">
                {t('hero.featuredDestinations')}
              </Link>
              <Link href="#top10" className="bg-gradient-to-r from-thailand-red to-thailand-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-thailand-red-600 hover:to-thailand-red-700 transition-all shadow-lg">
                🏆 {t('nav.top10')} {t('sections.top10Guides').split(' ').slice(2).join(' ')}
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle indicator dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trip.com Search Widget - Strategic Placement After Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {t('search.findPerfectStay')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('search.searchCompareHotels')}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TripcomWidget 
              city="Thailand"
              type="searchbox"
              className="shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 💰 HOMEPAGE HEADER AD - HIGH VISIBILITY */}
      <section className="bg-white py-6">
        <div className="container-custom">
          <EzoicAd 
            placementId={101}
            size="banner"
            className="mx-auto"
            lazy={false}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-thailand-blue mb-2">
                {cities.length}+
              </div>
              <div className="text-gray-600">{t('stats.citiesCovered')}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-thailand-blue mb-2">
                3
              </div>
              <div className="text-gray-600">{t('stats.regions')}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-thailand-blue mb-2">
                100+
              </div>
              <div className="text-gray-600">{t('stats.attractions')}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-thailand-blue mb-2">
                24/7
              </div>
              <div className="text-gray-600">{t('stats.travelTips')}</div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Cities */}
      <section id="featured" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <FadeInText>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                <HighlightedText 
                  text={t('sections.featuredDestinations')}
                  highlightWords={['Thailand', 'Destinations']}
                  highlightClassName="text-thailand-red"
                  animationType="underline"
                />
              </h2>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('sections.featuredDescription')}
              </p>
            </FadeInText>
          </div>
          
          {/* Grid with ad placement strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredCities.slice(0, 3).map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>

          {/* 💰 MID-CONTENT AD - STRATEGIC PLACEMENT */}
          <div className="mb-8">
            <EzoicAd 
              placementId={103}
              size="banner"
              className="mx-auto"
              lazy={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCities.slice(3, 6).map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/city/" className="btn-primary">
              {t('buttons.viewAllCities')}
            </Link>
          </div>
        </div>
      </section>

      {/* Top 10 Travel Guides Section */}
      <section id="top10" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <FadeInText>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                🏆 <HighlightedText 
                  text={t('sections.top10Guides')}
                  highlightWords={['Thailand', 'Top 10', '2025']}
                  highlightClassName="text-thailand-red"
                  animationType="fade"
                />
              </h2>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                {t('sections.top10Description')}
              </p>
            </FadeInText>
            
            {/* Current Data Features */}
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-8">
              <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full font-medium">
                📊 {t('badges.current2025Data')}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full font-medium">
                ✨ {t('badges.expertCurated')}
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full font-medium">
                💰 {t('badges.localPrices')}
              </span>
            </div>
          </div>
          
          {/* Top 10 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Restaurant Guides */}
            <Link href="/top-10/restaurants/" className="group">
              <div className="bg-gradient-to-br from-thailand-red-50 to-thailand-red-100 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border border-thailand-red-200">
                <div className="text-center">
                  <div className="text-5xl mb-4">🍽️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-thailand-red transition-colors">
                    {t('nav.restaurantGuides')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('categories.restaurantGuidesDesc')}
                  </p>
                  <div className="bg-thailand-red text-white px-4 py-2 rounded-lg font-medium group-hover:bg-thailand-red-600 transition-colors">
                    {t('buttons.viewRestaurantGuides')} →
                  </div>
                </div>
              </div>
            </Link>

            {/* Hotel Guides */}
            <Link href="/top-10/hotels/" className="group">
              <div className="bg-gradient-to-br from-thailand-blue-50 to-thailand-blue-100 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border border-thailand-blue-200">
                <div className="text-center">
                  <div className="text-5xl mb-4">🏨</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-thailand-blue transition-colors">
                    {t('nav.hotelGuides')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('categories.hotelGuidesDesc')}
                  </p>
                  <div className="bg-thailand-blue text-white px-4 py-2 rounded-lg font-medium group-hover:bg-thailand-blue-600 transition-colors">
                    {t('buttons.viewHotelGuides')} →
                  </div>
                </div>
              </div>
            </Link>

            {/* Attraction Guides */}
            <Link href="/top-10/attractions/" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border border-green-200">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {t('nav.attractionGuides')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('categories.attractionGuidesDesc')}
                  </p>
                  <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-green-700 transition-colors">
                    {t('buttons.viewAttractionGuides')} →
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Trending Top 10 Guides */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🔥 {t('trending.trendingNow')}
              </h3>
              <p className="text-gray-600">
                {t('trending.trendingDescription')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/city/bangkok/top-10-restaurants/" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🍽️</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-thailand-red transition-colors">
                      {t('trending.bangkokRestaurants')}
                    </h4>
                    <p className="text-sm text-gray-500">{t('trending.currentPricesLocalFavorites')}</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/city/phuket/top-10-hotels/" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🏨</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors">
                      {t('trending.phuketHotels')}
                    </h4>
                    <p className="text-sm text-gray-500">{t('trending.beachResortsUpdatedRates')}</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/city/chiang-mai/top-10-attractions/" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {t('trending.chiangMaiAttractions')}
                    </h4>
                    <p className="text-sm text-gray-500">{t('trending.templesNatureCulture')}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trip.com Bundle Widget - Strategic Placement for High Conversion */}
      <section className="bg-gradient-to-b from-white to-thailand-blue-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              💸 {t('search.saveBig')}
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              {t('search.bookFlightHotel')}
            </p>
            <div className="flex justify-center items-center gap-3 text-sm">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                ✈️ {t('search.exclusiveBundleDeals')}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                🏨 {t('search.trustedByMillions')}
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                🛡️ {t('search.bestPriceGuarantee')}
              </span>
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <TripcomWidget 
              city="Thailand"
              type="bundle"
              className="shadow-2xl"
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">
              💡 <strong>{t('search.proTip')}:</strong> {t('search.bundleDealsInfo')}
            </p>
          </div>
        </div>
      </section>

      {/* Authentic Thai Cuisine Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <FadeInText>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                <HighlightedText 
                  text={t('sections.authenticThaiCuisine')}
                  highlightWords={['Thai Food', 'Traditional']}
                  highlightClassName="text-thailand-red font-bold"
                  animationType="glow"
                />
              </h2>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('sections.cuisineDescription')}
              </p>
            </FadeInText>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularDishes.slice(0, 6).map((dish) => (
              <Link key={dish.id} href={`/food/${dish.slug}/`} className="group">
                <div className="card hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name.en}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full text-white ${
                        dish.spice_level === 'hot' ? 'bg-red-500' :
                        dish.spice_level === 'medium' ? 'bg-orange-500' :
                        dish.spice_level === 'mild' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}>
                        🌶️ {dish.spice_level}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-thailand-blue text-white">
                        {dish.preparation_time}
                      </span>
                    </div>
                  </div>
                  <div className="p-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-thailand-red transition-colors">
                      {dish.name.en}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 font-thai">
                      {dish.name.thai}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-thailand-blue font-medium capitalize">
                        {dish.category.replace('-', ' ')}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {dish.region} Thailand
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {ingredient}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-xs text-thailand-blue">
                          +{dish.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        dish.difficulty === 'easy' ? 'text-green-600' :
                        dish.difficulty === 'medium' ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {t('labels.difficulty')}: {dish.difficulty}
                      </span>
                      <span className="text-thailand-blue group-hover:text-thailand-red transition-colors font-medium">
                        {t('labels.learnRecipe')} →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/food/" className="btn-primary">
              {t('buttons.exploreAllThaiDishes')}
            </Link>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('sections.exploreByRegion')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('sections.regionDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Northern Thailand */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/regions/northern-thailand.webp"
                  alt="Northern Thailand"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('nav.northernThailand')}</h3>
              <p className="text-gray-600 mb-4">
                {t('regions.northernDesc')}
              </p>
              <Link href="/region/northern/" className="text-thailand-blue hover:text-thailand-red font-medium">
                {t('regions.exploreNorthern')} →
              </Link>
            </div>

            {/* Central Thailand */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/regions/central-thailand.webp"
                  alt="Central Thailand"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('nav.centralThailand')}</h3>
              <p className="text-gray-600 mb-4">
                {t('regions.centralDesc')}
              </p>
              <Link href="/region/central/" className="text-thailand-blue hover:text-thailand-red font-medium">
                {t('regions.exploreCentral')} →
              </Link>
            </div>

            {/* Southern Thailand */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/regions/southern-thailand.webp"
                  alt="Southern Thailand"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('nav.southernThailand')}</h3>
              <p className="text-gray-600 mb-4">
                {t('regions.southernDesc')}
              </p>
              <Link href="/region/southern/" className="text-thailand-blue hover:text-thailand-red font-medium">
                {t('regions.exploreSouthern')} →
              </Link>
            </div>

            {/* Isaan (Northeast Thailand) */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/regions/isaan-thailand.webp"
                  alt="Isaan (Northeast Thailand)"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('nav.isaanNortheast')}</h3>
              <p className="text-gray-600 mb-4">
                {t('regions.isaanDesc')}
              </p>
              <Link href="/region/isaan/" className="text-thailand-blue hover:text-thailand-red font-medium">
                {t('regions.exploreIsaan')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 BOTTOM SECTION AD */}
      <section className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('sections.planPerfectTrip')}
            </h3>
            <p className="text-gray-600">
              {t('sections.planTripDescription')}
            </p>
          </div>
          <EzoicAd 
            placementId={104}
            size="banner"
            className="mx-auto mb-6"
            lazy={true}
          />
          <div className="text-center">
            <Link href="/city/" className="btn-primary">
              {t('buttons.startExploringThailand')}
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Ad */}
      <EzoicAd {...AD_PLACEMENTS.MOBILE_STICKY} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cities = getAllCities();
  const popularDishes = getPopularDishes(6);
  
  // Featured cities (first 6)
  const featuredCities = cities.slice(0, 6);
  
  return {
    props: {
      cities,
      featuredCities,
      popularDishes,
    },
  };
};
