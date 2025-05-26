import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getEnhancedDishBySlug, getDishStaticPaths, generateDishMetadata, getRelatedDishes, generateFoodBreadcrumbs } from '../../lib/food';
import EzoicAd from '../../components/EzoicAd';
import { AD_PLACEMENTS, EZOIC_AD_UNITS } from '../../lib/ads/ezoic-config';

interface EnhancedDish {
  id: number;
  slug: string;
  name: { en: string; nl: string; thai: string; };
  category: string;
  region: string;
  spice_level: string;
  description: { en: string; nl: string; };
  ingredients: string[];
  allergens: string[];
  dietary: string[];
  image: string;
  preparation_time: string;
  difficulty: string;
  price_range: string;
  enhanced_description?: string;
  detailed_ingredients?: Array<{
    name: string;
    purpose: string;
    substitutes: string[];
  }>;
  cooking_method?: {
    technique: string;
    steps_overview: string;
    cooking_tips: string[];
  };
  cultural_significance?: {
    origin_story: string;
    cultural_importance: string;
    traditional_occasions: string[];
  };
  variations?: Array<{
    name: string;
    description: string;
  }>;
  serving_suggestions?: {
    traditional_accompaniments: string[];
    presentation: string;
    eating_etiquette: string;
  };
  nutritional_info?: {
    calories_per_serving: string;
    health_benefits: string[];
    dietary_notes: string[];
  };
  where_to_find?: {
    best_restaurants: string[];
    street_food_areas: string[];
    price_ranges: {
      street_food: string;
      restaurant: string;
      upscale: string;
    };
  };
  ai_generated?: boolean;
}

interface DishPageProps {
  dish: EnhancedDish;
  relatedDishes: EnhancedDish[];
}

export default function DishPage({ dish, relatedDishes }: DishPageProps) {
  if (!dish) return <div>Dish not found</div>;

  const metadata = generateDishMetadata(dish);

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hot': return 'bg-orange-100 text-orange-800';
      case 'very-hot': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={`https://go2-thailand.com/food/${dish.slug}/`} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumbs */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-thailand-blue">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/food/" className="hover:text-thailand-blue">Thai Food</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{dish.name.en}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSpiceLevelColor(dish.spice_level)}`}>
                    {dish.spice_level === 'none' ? 'Not Spicy' : dish.spice_level}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(dish.difficulty)}`}>
                    {dish.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                    {dish.category.replace('-', ' ')}
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {dish.name.en}
                </h1>
                <p className="text-2xl text-gray-600 mb-6">
                  {dish.name.thai}
                </p>
                
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {dish.enhanced_description || dish.description.en}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl mb-2">⏱️</div>
                    <div className="text-sm text-gray-600">Prep Time</div>
                    <div className="font-semibold">{dish.preparation_time}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl mb-2">📍</div>
                    <div className="text-sm text-gray-600">Region</div>
                    <div className="font-semibold capitalize">{dish.region}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-sm text-gray-600">Price Range</div>
                    <div className="font-semibold capitalize">{dish.price_range}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl mb-2">👨‍🍳</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className="font-semibold capitalize">{dish.difficulty}</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={dish.image} 
                  alt={dish.name.en}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-food.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 💰 FOOD DETAIL HEADER AD - HIGH VISIBILITY */}
        <section className="bg-white py-6">
          <div className="container-custom">
            <EzoicAd 
              adUnit={EZOIC_AD_UNITS.FOOD_BANNER}
              size="banner"
              className="mx-auto"
              lazy={false}
            />
          </div>
        </section>

        {/* Content Sections */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Ingredients */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
                  {dish.detailed_ingredients ? (
                    <div className="space-y-4">
                      {dish.detailed_ingredients.map((ingredient, index) => (
                        <div key={index} className="border-l-4 border-thailand-blue pl-4">
                          <h3 className="font-semibold text-gray-900 capitalize">{ingredient.name}</h3>
                          <p className="text-gray-600 text-sm">{ingredient.purpose}</p>
                          {ingredient.substitutes.length > 0 && (
                            <p className="text-gray-500 text-xs mt-1">
                              Substitutes: {ingredient.substitutes.join(', ')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {dish.ingredients.map((ingredient, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg capitalize">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cooking Method */}
                {dish.cooking_method && (
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Cooking Method</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Technique</h3>
                        <p className="text-gray-700">{dish.cooking_method.technique}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
                        <p className="text-gray-700">{dish.cooking_method.steps_overview}</p>
                      </div>
                      {dish.cooking_method.cooking_tips.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Cooking Tips</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {dish.cooking_method.cooking_tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Cultural Significance */}
                {dish.cultural_significance && (
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Cultural Significance</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Origin Story</h3>
                        <p className="text-gray-700">{dish.cultural_significance.origin_story}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Cultural Importance</h3>
                        <p className="text-gray-700">{dish.cultural_significance.cultural_importance}</p>
                      </div>
                      {dish.cultural_significance.traditional_occasions.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Traditional Occasions</h3>
                          <div className="flex flex-wrap gap-2">
                            {dish.cultural_significance.traditional_occasions.map((occasion, index) => (
                              <span key={index} className="bg-thailand-blue bg-opacity-10 text-thailand-blue px-3 py-1 rounded-full text-sm">
                                {occasion}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Variations */}
                {dish.variations && dish.variations.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Variations</h2>
                    <div className="space-y-4">
                      {dish.variations.map((variation, index) => (
                        <div key={index} className="border-l-4 border-thailand-gold pl-4">
                          <h3 className="font-semibold text-gray-900">{variation.name}</h3>
                          <p className="text-gray-700">{variation.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* 💰 FOOD SIDEBAR AD - HIGH VALUE PLACEMENT */}
                <EzoicAd 
                  adUnit="go2thailand_food_sidebar_rect"
                  size="rectangle"
                  className="mx-auto sticky top-4"
                  lazy={true}
                />

                {/* Quick Info */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    {dish.allergens.length > 0 && (
                      <div>
                        <span className="font-semibold text-gray-900">Allergens:</span>
                        <div className="mt-1">
                          {dish.allergens.map((allergen, index) => (
                            <span key={index} className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs mr-1 mb-1">
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {dish.dietary.length > 0 && (
                      <div>
                        <span className="font-semibold text-gray-900">Dietary:</span>
                        <div className="mt-1">
                          {dish.dietary.map((diet, index) => (
                            <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-1 mb-1">
                              {diet}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Where to Find */}
                {dish.where_to_find && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Where to Find</h3>
                    <div className="space-y-4">
                      {dish.where_to_find.best_restaurants.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Best Restaurants</h4>
                          <ul className="text-gray-700 text-sm space-y-1">
                            {dish.where_to_find.best_restaurants.map((restaurant, index) => (
                              <li key={index}>• {restaurant}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {dish.where_to_find.street_food_areas.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Street Food Areas</h4>
                          <ul className="text-gray-700 text-sm space-y-1">
                            {dish.where_to_find.street_food_areas.map((area, index) => (
                              <li key={index}>• {area}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Price Ranges</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Street Food:</span>
                            <span className="font-medium">{dish.where_to_find.price_ranges.street_food}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Restaurant:</span>
                            <span className="font-medium">{dish.where_to_find.price_ranges.restaurant}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Upscale:</span>
                            <span className="font-medium">{dish.where_to_find.price_ranges.upscale}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nutritional Info */}
                {dish.nutritional_info && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Nutritional Info</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-900">Calories per serving:</span>
                        <p className="text-gray-700">{dish.nutritional_info.calories_per_serving}</p>
                      </div>
                      {dish.nutritional_info.health_benefits.length > 0 && (
                        <div>
                          <span className="font-semibold text-gray-900">Health Benefits:</span>
                          <ul className="text-gray-700 text-sm mt-1 space-y-1">
                            {dish.nutritional_info.health_benefits.map((benefit, index) => (
                              <li key={index}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Dishes */}
        {relatedDishes.length > 0 && (
          <section className="bg-white section-padding">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Dishes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedDishes.map((relatedDish) => (
                  <Link key={relatedDish.id} href={`/food/${relatedDish.slug}`} className="group">
                    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <img 
                        src={relatedDish.image} 
                        alt={relatedDish.name.en}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-food.jpg';
                        }}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors">
                          {relatedDish.name.en}
                        </h3>
                        <p className="text-gray-600 text-sm">{relatedDish.name.thai}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold text-white section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Explore More Thai Cuisine</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Discover more authentic Thai dishes and their stories
            </p>
            <Link href="/food/" className="bg-white text-thailand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse All Dishes
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getDishStaticPaths();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const dish = getEnhancedDishBySlug(slug);
  if (!dish) return { notFound: true };
  
  const relatedDishes = getRelatedDishes(dish, 4);
  
  return { 
    props: { 
      dish,
      relatedDishes
    } 
  };
};
