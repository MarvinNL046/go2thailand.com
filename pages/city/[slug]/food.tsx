import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs } from '../../../lib/cities';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TripcomWidget from '../../../components/TripcomWidget';
import SEOHead from '../../../components/SEOHead';
import foodData from '../../../data/enhanced/food/index.json';
import foodSpecialtiesData from '../../../data/cities/food-specialties.json';

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string; };
  region: string;
  province: string;
  image: string;
  categories: { food: { en: string; nl: string; }; };
}

interface Food {
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
  description?: {
    en: string;
    nl: string;
  };
}

interface Market {
  name: string;
  location: string;
  hours: string;
  specialty: string;
}

interface StreetFoodArea {
  name: string;
  description: string;
}

interface CityFoodData {
  specialties: string[];
  markets: Market[];
  street_food_areas: StreetFoodArea[];
  vegetarian_friendly: boolean;
}

interface CityFoodPageProps {
  city: City;
  cityFoodData?: CityFoodData;
}

export default function CityFoodPage({ city, cityFoodData }: CityFoodPageProps) {
  if (!city) return <div>City not found</div>;

  const breadcrumbs = generateBreadcrumbs(city, 'food');
  const baseMetadata = generateCityMetadata(city, 'food');

  // SEO-optimized title & description for food pages
  const metadata = {
    ...baseMetadata,
    title: `Best Food in ${city.name.en} 2026 — Street Food & Restaurants`,
    description: `Discover the best food in ${city.name.en}: street food, local restaurants, night markets, and must-try Thai dishes. Updated prices and tips for 2026.`,
  };

  // Get popular dishes (main dishes, soups, and curries)
  const popularDishes = (foodData as Food[]).filter(food => 
    ['main-dish', 'soup', 'curry'].includes(food.category)
  ).slice(0, 8);

  // Helper function to get spice level icon
  const getSpiceIcon = (level: string) => {
    const icons = {
      mild: 'Mild',
      medium: 'Medium',
      hot: 'Hot',
      'very hot': 'Very Hot'
    };
    return icons[level as keyof typeof icons] || 'Mild';
  };

  // Helper function to format price range
  const formatPriceRange = (range: string) => {
    const prices = {
      budget: '฿',
      moderate: '฿฿',
      expensive: '฿฿฿',
      luxury: '฿฿฿฿'
    };
    return prices[range as keyof typeof prices] || '฿';
  };

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
      >
        <meta name="keywords" content={metadata.keywords} />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Food & Dining in {city.name.en}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {city.categories.food.en}
              </p>
            </div>
          </div>
        </section>

        {/* Popular Dishes Section */}
        <section className="section-padding">
          <div className="container-custom">
            {/* Book Your Stay & Transport Section - Moved to top */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Book Your Stay & Transport
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <TripcomWidget city={city.name.en} type="bundle" />
                <p className="text-gray-600 text-center mt-6">
                  Find hotels near the best food markets and restaurant districts in {city.name.en}. 
                  Book your accommodation and transport together for the best deals!
                </p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Popular Thai Dishes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {popularDishes.map((dish) => (
                <Link 
                  key={dish.id} 
                  href={`/food/${dish.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name.en}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                      {formatPriceRange(dish.price_range)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {dish.name.en}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{dish.name.thai}</p>
                    {dish.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {dish.description.en}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{getSpiceIcon(dish.spice_level)}</span>
                      <span className="text-gray-500 capitalize">{dish.category.replace('-', ' ')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Local Specialties Section */}
            {cityFoodData && cityFoodData.specialties.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Local Specialties
                </h2>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <p className="text-gray-600 mb-6 text-center">
                    Discover unique dishes and flavors specific to {city.name.en}. 
                    From street food favorites to traditional recipes passed down through generations.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cityFoodData.specialties.map((specialty, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg px-4 py-3 text-center">
                        <span className="text-gray-800 font-medium">{specialty}</span>
                      </div>
                    ))}
                  </div>
                  {cityFoodData.vegetarian_friendly && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                      <span className="text-green-800 font-medium">This city is vegetarian-friendly!</span>
                      <p className="text-green-700 text-sm mt-1">
                        You'll find plenty of vegetarian options at local restaurants and markets.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Where to Find the Best Food */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Where to Find the Best Food in {city.name.en}
              </h2>
              
              {cityFoodData && cityFoodData.markets.length > 0 ? (
                <>
                  {/* Markets Section */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Popular Food Markets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cityFoodData.markets.map((market, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{market.name}</h4>
                          <div className="space-y-2 text-sm">
                            <p className="text-gray-600">
                              <span className="font-semibold">Location:</span> {market.location}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Hours:</span> {market.hours}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Specialty:</span> {market.specialty}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Street Food Areas Section */}
                  {cityFoodData.street_food_areas.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Street Food Areas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cityFoodData.street_food_areas.map((area, index) => (
                          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="w-12 h-12 bg-thailand-blue rounded-full flex items-center justify-center mb-4">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h4>
                            <p className="text-gray-600 text-sm">{area.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Fallback when no city data */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="w-16 h-16 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Street Food Markets</h3>
                    <p className="text-gray-600 text-center">
                      Experience authentic Thai flavors at bustling night markets and street food stalls throughout the city.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="w-16 h-16 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Local Restaurants</h3>
                    <p className="text-gray-600 text-center">
                      Family-run establishments serving time-honored recipes and regional specialties.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="w-16 h-16 bg-thailand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Fine Dining</h3>
                    <p className="text-gray-600 text-center">
                      Modern interpretations of Thai cuisine in elegant settings with innovative presentations.
                    </p>
                  </div>
                </div>
              )}
            </div>


            {/* Call to Action */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Plan Your Culinary Journey
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Ready to explore the best restaurants and food experiences in {city.name.en}? 
                Check out our curated list of top dining destinations.
              </p>
              <Link 
                href={`/city/${city.slug}/top-10-restaurants`} 
                className="btn-primary inline-block"
              >
                View Top 10 Restaurants →
              </Link>
            </div>

            {/* Book a Thai Cooking Class - Affiliate Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Book a Thai Cooking Class in {city.name.en}
              </h3>
              <p className="text-gray-600 text-center mb-8">
                Learn to cook authentic Thai dishes with local chefs and take the flavors home with you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 text-center">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Klook</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Cooking classes and food tours
                  </p>
                  <a
                    href="https://klook.tpo.lv/aq6ZFxvc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Browse on Klook
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 text-center">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">GetYourGuide</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Food walking tours
                  </p>
                  <a
                    href="https://getyourguide.tpo.lv/GuAFfGGK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Browse on GetYourGuide
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                We may earn a commission when you book through our links, at no extra cost to you. This helps us keep the site running.
              </p>
            </div>

            {/* Explore More Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Explore More of {city.name.en}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/city/${city.slug}/attractions/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Attractions</h4>
                    <p className="text-gray-600 text-sm">See top attractions</p>
                  </div>
                </Link>
                <Link href={`/city/${city.slug}/hotels/`} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-thailand-blue rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hotels & Stay</h4>
                    <p className="text-gray-600 text-sm">Find accommodation</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCityStaticPaths();
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  if (!city) return { notFound: true };
  
  // Get city-specific food data
  const cityFoodData = (foodSpecialtiesData as Record<string, CityFoodData>)[slug] || null;
  
  return { props: { city, cityFoodData }, revalidate: 86400 };
};
