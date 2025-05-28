import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAllCities } from '../lib/cities';
import { getPopularDishes } from '../lib/food';
import CityCard from '../components/CityCard';
import EzoicAd from '../components/EzoicAd';
import { AD_PLACEMENTS } from '../lib/ads/ezoic-config';

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
        <title>Go2Thailand - Your Ultimate Thailand Travel Guide</title>
        <meta 
          name="description" 
          content="Discover amazing destinations across Thailand. Explore cities, attractions, food, and culture in the Land of Smiles. Your complete travel guide to Thailand." 
        />
        <meta name="keywords" content="Thailand travel, Thailand cities, Bangkok, Chiang Mai, Phuket, Thailand tourism, Thai culture, Thailand attractions" />
        <meta property="og:title" content="Go2Thailand - Your Ultimate Thailand Travel Guide" />
        <meta property="og:description" content="Discover amazing destinations across Thailand. Explore cities, attractions, food, and culture in the Land of Smiles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://go2-thailand.com/" />
      </Head>

      {/* Hero Section with Auto-Rotating Slider */}
      <section className="relative h-96 lg:h-[600px] overflow-hidden">
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
                quality={90}
              />
            </div>
          ))}
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Discover <span className="text-thailand-red">Thailand</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Your ultimate guide to exploring the Land of Smiles. From bustling cities to pristine beaches, 
              discover the best of Thailand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/city/" className="btn-primary shadow-lg">
                Explore Cities
              </Link>
              <Link href="#featured" className="btn-secondary bg-white text-thailand-blue hover:bg-gray-100 shadow-lg">
                Featured Destinations
              </Link>
              <Link href="#top10" className="bg-gradient-to-r from-thailand-red to-thailand-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-thailand-red-600 hover:to-thailand-red-700 transition-all shadow-lg">
                🏆 Top 10 Guides
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

      {/* 💰 HOMEPAGE HEADER AD - HIGH VISIBILITY */}
      <section className="bg-white py-6">
        <div className="container-custom">
          <EzoicAd 
            adUnit="go2thailand_homepage_header"
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
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-thailand-blue mb-2">
                3
              </div>
              <div className="text-gray-600">Regions</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-thailand-blue mb-2">
                100+
              </div>
              <div className="text-gray-600">Attractions</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-thailand-blue mb-2">
                24/7
              </div>
              <div className="text-gray-600">Travel Tips</div>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 AD BETWEEN STATS AND FEATURED */}
      <section className="bg-gray-50 py-6">
        <div className="container-custom">
          <EzoicAd 
            adUnit="go2thailand_homepage_featured"
            size="rectangle"
            className="mx-auto"
            lazy={true}
          />
        </div>
      </section>

      {/* Featured Cities */}
      <section id="featured" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your journey with these must-visit cities that showcase the best of Thailand
            </p>
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
              adUnit="go2thailand_homepage_mid_content"
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
              View All Cities
            </Link>
          </div>
        </div>
      </section>

      {/* Top 10 Travel Guides Section */}
      <section id="top10" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              🏆 Top 10 Travel <span className="text-thailand-red">Guides</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Get the latest recommendations with current prices, insider tips, and local insights. 
              Our expertly curated guides combine real-time data with authentic local experiences.
            </p>
            
            {/* Current Data Features */}
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-8">
              <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full font-medium">
                📊 Current 2025 Data
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full font-medium">
                ✨ Expert Curated
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full font-medium">
                💰 Local Prices
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
                    Restaurant Guides
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Discover where locals actually eat with current pricing and authentic recommendations
                  </p>
                  <div className="bg-thailand-red text-white px-4 py-2 rounded-lg font-medium group-hover:bg-thailand-red-600 transition-colors">
                    View Restaurant Guides →
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
                    Hotel Guides
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Find the perfect stay with updated rates, guest reviews, and booking recommendations
                  </p>
                  <div className="bg-thailand-blue text-white px-4 py-2 rounded-lg font-medium group-hover:bg-thailand-blue-600 transition-colors">
                    View Hotel Guides →
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
                    Attraction Guides
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Must-see attractions with current entrance fees, opening hours, and visitor tips
                  </p>
                  <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-green-700 transition-colors">
                    View Attraction Guides →
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Trending Top 10 Guides */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🔥 Trending Now
              </h3>
              <p className="text-gray-600">
                Most popular guides updated with latest information
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/city/bangkok/top-10-restaurants/" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🍽️</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-thailand-red transition-colors">
                      Bangkok Restaurants
                    </h4>
                    <p className="text-sm text-gray-500">Current prices • Local favorites</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/city/phuket/top-10-hotels/" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🏨</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors">
                      Phuket Hotels
                    </h4>
                    <p className="text-sm text-gray-500">Beach resorts • Updated rates</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/city/chiang-mai/top-10-attractions/" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      Chiang Mai Attractions
                    </h4>
                    <p className="text-sm text-gray-500">Temples • Nature • Culture</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Thai Cuisine Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Authentic Thai <span className="text-thailand-red">Cuisine</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the incredible flavors of Thailand. From street food to fine dining, explore traditional recipes and cooking techniques.
            </p>
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
                        Difficulty: {dish.difficulty}
                      </span>
                      <span className="text-thailand-blue group-hover:text-thailand-red transition-colors font-medium">
                        Learn Recipe →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/food/" className="btn-primary">
              Explore All Thai Dishes
            </Link>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore by Region
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each region of Thailand offers unique experiences, culture, and attractions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Northern Thailand */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/food/northern.webp"
                  alt="Northern Thailand"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Northern Thailand</h3>
              <p className="text-gray-600 mb-4">
                Mountains, temples, and rich cultural heritage. Experience traditional hill tribes and ancient cities.
              </p>
              <Link href="/region/northern/" className="text-thailand-blue hover:text-thailand-red font-medium">
                Explore Northern Thailand →
              </Link>
            </div>

            {/* Central Thailand */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/food/central.webp"
                  alt="Central Thailand"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Central Thailand</h3>
              <p className="text-gray-600 mb-4">
                Home to Bangkok and historical sites. The heart of Thailand's political and economic center.
              </p>
              <Link href="/region/central/" className="text-thailand-blue hover:text-thailand-red font-medium">
                Explore Central Thailand →
              </Link>
            </div>

            {/* Southern Thailand */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/food/southern.webp"
                  alt="Southern Thailand"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Southern Thailand</h3>
              <p className="text-gray-600 mb-4">
                Pristine beaches, tropical islands, and crystal-clear waters. Paradise for beach lovers and divers.
              </p>
              <Link href="/region/southern/" className="text-thailand-blue hover:text-thailand-red font-medium">
                Explore Southern Thailand →
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
              Plan Your Perfect Thailand Trip
            </h3>
            <p className="text-gray-600">
              Get the latest travel tips, destination guides, and exclusive offers
            </p>
          </div>
          <EzoicAd 
            adUnit="go2thailand_homepage_bottom"
            size="banner"
            className="mx-auto mb-6"
            lazy={true}
          />
          <div className="text-center">
            <Link href="/city/" className="btn-primary">
              Start Exploring Thailand
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
