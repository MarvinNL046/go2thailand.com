import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCities } from '../lib/cities';
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

interface HomeProps {
  cities: City[];
  featuredCities: City[];
}

export default function Home({ cities, featuredCities }: HomeProps) {
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

      {/* Hero Section */}
      <section className="relative h-96 lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
            alt="Beautiful Thailand landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Discover <span className="text-thailand-red">Thailand</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Your ultimate guide to exploring the Land of Smiles. From bustling cities to pristine beaches, 
              discover the best of Thailand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/city/" className="btn-primary">
                Explore Cities
              </Link>
              <Link href="#featured" className="btn-secondary bg-white text-thailand-blue hover:bg-gray-100">
                Featured Destinations
              </Link>
            </div>
          </div>
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

      {/* Regions Section */}
      <section className="section-padding bg-white">
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
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
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
                  src="https://images.unsplash.com/photo-1464983953574-0892a716854b"
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
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
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
  
  // Featured cities (first 6)
  const featuredCities = cities.slice(0, 6);
  
  return {
    props: {
      cities,
      featuredCities,
    },
  };
};
