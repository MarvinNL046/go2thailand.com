import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import { getEnhancedDishBySlug, getDishStaticPaths, generateDishMetadata, getRelatedDishes, generateFoodBreadcrumbs } from '../../lib/food';
import SEOHead from '../../components/SEOHead';
import FoodCityLinks from '../../components/FoodCityLinks';
import FoodAffiliateCTA from '../../components/FoodAffiliateCTA';
import InlineAd from '../../components/ads/InlineAd';

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
  cooking?: {
    preparation_time: string;
    difficulty: string;
    spice_level: string;
    serves: string;
  };
  ai_generated?: boolean;
}

interface CityLink {
  slug: string;
  name: string;
  region: string;
}

interface DishPageProps {
  dish: EnhancedDish;
  relatedDishes: EnhancedDish[];
  citiesForDish: CityLink[];
  editorial?: string;
}

export default function DishPage({ dish, relatedDishes, citiesForDish, editorial }: DishPageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  if (!dish) return <div>Dish not found</div>;

  const metadata = generateDishMetadata(dish);

  // Optimized SEO title and description (overrides lib defaults)
  const categoryLabel = dish.category.replace('-', ' ');
  // Use custom SEO title from JSON if available, otherwise generate
  const dishAny = dish as Record<string, any>;
  const seoTitle = dishAny.seo?.metaTitle?.en || `${dish.name.en} (${dish.name.thai}) — What It Is, Where to Eat It & Prices`;
  const descriptionBase = (dish.enhanced_description || dish.description.en).substring(0, 100);
  const seoDescription = dishAny.seo?.metaDescription?.en || `${dish.name.en} (${dish.name.thai}) — ${descriptionBase}. Where to find it, prices, and what makes it special.`;

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
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        ogImage={dish.image?.startsWith('http') ? dish.image : `https://go2-thailand.com${dish.image}`}
      >
        <meta name="keywords" content={metadata.keywords} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": isNl ? (dish.name.nl || dish.name.en) : dish.name.en,
              "description": isNl ? (dish.description.nl || dish.enhanced_description || dish.description.en) : (dish.enhanced_description || dish.description.en),
              "author": {
                "@type": "Organization",
                "name": "Go2Thailand.com",
                "url": "https://go2-thailand.com"
              },
              "recipeCuisine": "Thai",
              "recipeCategory": dish.category.replace('-', ' '),
              "image": dish.image.startsWith('http') ? dish.image : `https://go2-thailand.com${dish.image}`,
              "recipeYield": dish.cooking?.serves || "2-4 servings",
              ...(dish.preparation_time && { "prepTime": `PT${dish.preparation_time.replace(/[^0-9]/g, '')}M` }),
              ...(dish.preparation_time && { "cookTime": `PT${Math.max(parseInt(dish.preparation_time.replace(/[^0-9]/g, '')) * 2, 20)}M` }),
              ...(dish.ingredients && { "recipeIngredient": dish.ingredients }),
              ...(dish.cooking_method && {
                "recipeInstructions": [
                  ...(dish.cooking_method.cooking_tips || []).map((tip: string, i: number) => ({
                    "@type": "HowToStep",
                    "name": `Step ${i + 1}`,
                    "text": tip
                  })),
                  ...(dish.cooking_method.cooking_tips?.length ? [] : [{
                    "@type": "HowToStep",
                    "name": "Preparation",
                    "text": dish.cooking_method.steps_overview
                  }])
                ]
              }),
              ...(dish.nutritional_info?.calories_per_serving &&
                /\d/.test(dish.nutritional_info.calories_per_serving) && {
                "nutrition": {
                  "@type": "NutritionInformation",
                  "calories": dish.nutritional_info.calories_per_serving.replace(/[^0-9]/g, '') + " calories"
                }
              }),
              "keywords": `${dish.name.en}, ${dish.name.thai}, Thai food, ${dish.category}`
            })
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Breadcrumbs */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-thailand-blue">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/food/" className="hover:text-thailand-blue">{isNl ? 'Thais Eten' : 'Thai Food'}</Link>
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
                    {dish.spice_level === 'none' ? (isNl ? 'Niet Pittig' : 'Not Spicy') : dish.spice_level}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(dish.difficulty)}`}>
                    {dish.difficulty}
                  </span>
                  <Link href={`/food/category/${dish.category}/`} className="px-3 py-1 rounded-full text-sm font-medium bg-thailand-blue/10 text-thailand-blue capitalize hover:bg-thailand-blue/20 transition-colors">
                    {dish.category.replace('-', ' ')}
                  </Link>
                </div>

                <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
                  {dish.name.en}
                </h1>
                <p className="text-2xl text-gray-600 mb-6">
                  {dish.name.thai}
                </p>

                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {(isNl && dish.description?.nl) || dish.enhanced_description || dish.description?.en}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-surface-cream rounded-xl p-4">
                    <div className="text-2xl mb-2"></div>
                    <div className="text-sm text-gray-600">{isNl ? 'Bereidingstijd' : 'Prep Time'}</div>
                    <div className="font-semibold">{dish.preparation_time}</div>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-4">
                    <div className="text-2xl mb-2"></div>
                    <div className="text-sm text-gray-600">{isNl ? 'Regio' : 'Region'}</div>
                    <div className="font-semibold capitalize">
                      <Link href={`/region/${dish.region}/`} className="text-thailand-blue hover:underline">
                        {dish.region === 'isaan' ? 'Isaan (Northeast)' : `${dish.region.charAt(0).toUpperCase() + dish.region.slice(1)} Thailand`}
                      </Link>
                    </div>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-4">
                    <div className="text-2xl mb-2"></div>
                    <div className="text-sm text-gray-600">{isNl ? 'Prijsklasse' : 'Price Range'}</div>
                    <div className="font-semibold capitalize">{dish.price_range}</div>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-4">
                    <div className="text-2xl mb-2"></div>
                    <div className="text-sm text-gray-600">{isNl ? 'Moeilijkheid' : 'Difficulty'}</div>
                    <div className="font-semibold capitalize">{dish.difficulty}</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name.en}
                  className="w-full h-96 object-cover rounded-2xl shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-food.jpg';
                  }}
                />
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

        {/* Ad after hero/description */}
        <div className="container-custom">
          <InlineAd />
        </div>

        {/* Content Sections */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Ingredients */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">{isNl ? 'Ingredi\u00ebnten' : 'Ingredients'}</h2>
                  {dish.detailed_ingredients ? (
                    <div className="space-y-4">
                      {dish.detailed_ingredients.map((ingredient, index) => (
                        <div key={index} className="border-l-4 border-thailand-blue pl-4">
                          <h3 className="font-heading font-semibold text-gray-900 capitalize">{ingredient.name}</h3>
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
                        <span key={index} className="bg-surface-cream text-gray-700 px-3 py-2 rounded-xl capitalize">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cooking Method */}
                {dish.cooking_method && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">{isNl ? 'Bereidingswijze' : 'Cooking Method'}</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Techniek' : 'Technique'}</h3>
                        <p className="text-gray-700">{dish.cooking_method.technique}</p>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Overzicht' : 'Overview'}</h3>
                        <p className="text-gray-700">{dish.cooking_method.steps_overview}</p>
                      </div>
                      {dish.cooking_method.cooking_tips.length > 0 && (
                        <div>
                          <h3 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Kooktips' : 'Cooking Tips'}</h3>
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
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">{isNl ? 'Culturele Betekenis' : 'Cultural Significance'}</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Oorsprong' : 'Origin Story'}</h3>
                        <p className="text-gray-700">{dish.cultural_significance.origin_story}</p>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Cultureel Belang' : 'Cultural Importance'}</h3>
                        <p className="text-gray-700">{dish.cultural_significance.cultural_importance}</p>
                      </div>
                      {dish.cultural_significance.traditional_occasions.length > 0 && (
                        <div>
                          <h3 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Traditionele Gelegenheden' : 'Traditional Occasions'}</h3>
                          <div className="flex flex-wrap gap-2">
                            {dish.cultural_significance.traditional_occasions.map((occasion, index) => (
                              <span key={index} className="bg-thailand-blue/10 text-thailand-blue px-3 py-1 rounded-full text-sm">
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
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">{isNl ? 'Variaties' : 'Variations'}</h2>
                    <div className="space-y-4">
                      {dish.variations.map((variation, index) => (
                        <div key={index} className="border-l-4 border-thailand-gold pl-4">
                          <h3 className="font-heading font-semibold text-gray-900">{variation.name}</h3>
                          <p className="text-gray-700">{variation.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">

                {/* Quick Info */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">{isNl ? 'Snelle Info' : 'Quick Info'}</h3>
                  <div className="space-y-3">
                    {dish.allergens.length > 0 && (
                      <div>
                        <span className="font-semibold text-gray-900">{isNl ? 'Allergenen:' : 'Allergens:'}</span>
                        <div className="mt-1">
                          {dish.allergens.map((allergen, index) => (
                            <span key={index} className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-1 mb-1">
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {dish.dietary.length > 0 && (
                      <div>
                        <span className="font-semibold text-gray-900">{isNl ? 'Dieet:' : 'Dietary:'}</span>
                        <div className="mt-1">
                          {dish.dietary.map((diet, index) => (
                            <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-1 mb-1">
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
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">{isNl ? 'Waar te Vinden' : 'Where to Find'}</h3>
                    <div className="space-y-4">
                      {dish.where_to_find.best_restaurants.length > 0 && (
                        <div>
                          <h4 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Beste Restaurants' : 'Best Restaurants'}</h4>
                          <ul className="text-gray-700 text-sm space-y-1">
                            {dish.where_to_find.best_restaurants.map((restaurant, index) => (
                              <li key={index}>• {restaurant}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {dish.where_to_find.street_food_areas.length > 0 && (
                        <div>
                          <h4 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Straatvoedsel Gebieden' : 'Street Food Areas'}</h4>
                          <ul className="text-gray-700 text-sm space-y-1">
                            {dish.where_to_find.street_food_areas.map((area, index) => (
                              <li key={index}>• {area}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <h4 className="font-heading font-semibold text-gray-900 mb-2">{isNl ? 'Prijsklassen' : 'Price Ranges'}</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>{isNl ? 'Straatvoedsel:' : 'Street Food:'}</span>
                            <span className="font-medium">{dish.where_to_find.price_ranges.street_food}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Restaurant:</span>
                            <span className="font-medium">{dish.where_to_find.price_ranges.restaurant}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{isNl ? 'Luxe:' : 'Upscale:'}</span>
                            <span className="font-medium">{dish.where_to_find.price_ranges.upscale}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nutritional Info */}
                {dish.nutritional_info && (
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">{isNl ? 'Voedingsinfo' : 'Nutritional Info'}</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-900">{isNl ? 'Calorie\u00ebn per portie:' : 'Calories per serving:'}</span>
                        <p className="text-gray-700">{dish.nutritional_info.calories_per_serving}</p>
                      </div>
                      {dish.nutritional_info.health_benefits.length > 0 && (
                        <div>
                          <span className="font-semibold text-gray-900">{isNl ? 'Gezondheidsvoordelen:' : 'Health Benefits:'}</span>
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
              <p className="section-label font-script text-thailand-gold text-center">More Dishes</p>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">{isNl ? 'Gerelateerde Gerechten' : 'Related Dishes'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedDishes.map((relatedDish) => (
                  <Link key={relatedDish.id} href={`/food/${relatedDish.slug}`} className="group">
                    <div className="bg-surface-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <img
                        src={relatedDish.image}
                        alt={relatedDish.name.en}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-food.jpg';
                        }}
                      />
                      <div className="p-4">
                        <h3 className="font-heading font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors">
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

        {/* Where to Try This Dish */}
        {citiesForDish.length > 0 && (
          <section className="bg-surface-cream section-padding">
            <div className="container-custom">
              <FoodCityLinks dishName={dish.name.en} cities={citiesForDish} />
            </div>
          </section>
        )}

        <section className="section-padding">
          <div className="container-custom max-w-4xl mx-auto">
            <FoodAffiliateCTA category={dish.category} dishName={dish.name.en} />
          </div>
        </section>

        {/* Regional Cuisine Context */}
        <section className="bg-surface-cream section-padding">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <p className="section-label font-script text-thailand-gold">Regional Cuisine</p>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              {dish.name.en} is a {dish.region === 'isaan' ? 'Isaan (Northeast)' : `${dish.region.charAt(0).toUpperCase() + dish.region.slice(1)} Thailand`} Dish
            </h2>
            <p className="text-gray-600 mb-6">
              {isNl ? 'Ontdek meer gerechten en reiservaringen uit deze regio.' : 'Discover more dishes and travel experiences from this region.'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href={`/region/${dish.region}/`}
                className="inline-flex items-center gap-2 bg-thailand-blue text-white px-5 py-3 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors"
              >
                {isNl ? 'Ontdek' : 'Explore'} {dish.region === 'isaan' ? 'Isaan' : `${dish.region.charAt(0).toUpperCase() + dish.region.slice(1)} Thailand`}
              </Link>
              <Link
                href="/drinks/"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                {isNl ? 'Thaise Dranken' : 'Thai Drinks & Beverages'}
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-surface-dark text-white section-padding">
          <div className="container-custom text-center">
            <p className="font-script text-thailand-gold mb-2">Explore More</p>
            <h2 className="text-3xl font-heading font-bold mb-6">{isNl ? 'Ontdek Meer Thaise Keuken' : 'Explore More Thai Cuisine'}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {isNl ? 'Ontdek meer authentieke Thaise gerechten en hun verhalen' : 'Discover more authentic Thai dishes and their stories'}
            </p>
            <Link href="/food/" className="bg-white text-thailand-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              {isNl ? 'Bekijk Alle Gerechten' : 'Browse All Dishes'}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const dish = getEnhancedDishBySlug(slug);
  if (!dish) return { notFound: true };

  const relatedDishes = getRelatedDishes(dish, 4);

  // Find cities where this dish is mentioned in foodie_adventures
  const citiesForDish: CityLink[] = [];
  const enhancedDir = path.join(process.cwd(), 'data', 'enhanced');
  const dishNameLower = dish.name.en.toLowerCase();

  try {
    const files = fs.readdirSync(enhancedDir).filter(f => f.endsWith('.json') && !['drinks', 'food', 'attractions'].includes(f.replace('.json', '')));
    for (const file of files) {
      try {
        const cityData = JSON.parse(fs.readFileSync(path.join(enhancedDir, file), 'utf8'));
        if (!cityData.name || !cityData.slug) continue;

        // Check foodie_adventures for dish mentions
        const foodieAdventures = cityData.foodie_adventures || [];
        const hasDish = foodieAdventures.some((fa: { dish?: string }) =>
          fa.dish && fa.dish.toLowerCase().includes(dishNameLower)
        );

        if (hasDish) {
          citiesForDish.push({
            slug: cityData.slug,
            name: typeof cityData.name === 'object' ? cityData.name.en : cityData.name,
            region: cityData.region || '',
          });
        }
      } catch { /* skip unreadable files */ }
    }
  } catch { /* enhanced dir not found */ }

  // Load food editorial if available
  let editorial = '';
  try {
    const editorialsPath = path.join(process.cwd(), 'data', 'food-editorials.json');
    if (fs.existsSync(editorialsPath)) {
      const editorials = JSON.parse(fs.readFileSync(editorialsPath, 'utf8'));
      if (editorials[slug]?.en) {
        editorial = editorials[slug].en;
      }
    }
  } catch {}

  return {
    props: {
      dish,
      relatedDishes,
      citiesForDish: citiesForDish.slice(0, 6),
      editorial,
    },
    revalidate: 604800
  };
};
