import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import FadeInText from '../../components/FadeInText';
import { getDrink, getAllDrinks } from '../../lib/drinks';
import { useTranslation } from '../../hooks/useTranslation';
import SEOHead from '../../components/SEOHead';

interface DrinkPageProps {
  drink: any; // Full drink data with enhanced content
}

export default function DrinkPage({ drink }: DrinkPageProps) {
  const router = useRouter();
  const { t } = useTranslation('common');

  if (!drink) {
    return <div>Drink not found</div>;
  }

  // Helper function for temperature display
  const getTemperatureDisplay = (temp: string) => {
    const displays: Record<string, string> = {
      'hot': 'Served Hot',
      'cold': 'Served Cold',
      'both': 'Hot or Cold',
      'room': 'Room Temperature',
      'neat': 'Served Neat',
      'mixed': 'Mixed Drink'
    };
    return displays[temp] || temp;
  };

  return (
    <>
      <SEOHead
        title={`${drink.name.en} — Recipe, Where to Try & History`}
        description={`${drink.name.en} (${drink.name.thai}) — learn how it's made, where to find it and what makes this Thai ${drink.category} drink special. Prices from ${drink.price_range}.`}
      >
        <meta name="keywords" content={`${drink.name.en}, ${drink.name.thai}, Thai ${drink.category}, Thai drinks, Thailand beverages, ${drink.name.en} recipe`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": drink.name.en,
              "description": drink.enhanced_description || drink.description.en,
              "author": {
                "@type": "Organization",
                "name": "Go2Thailand.com",
                "url": "https://go2-thailand.com"
              },
              "recipeCuisine": "Thai",
              "recipeCategory": drink.category,
              "image": drink.image?.startsWith('http') ? drink.image : `https://go2-thailand.com${drink.image}`,
              ...(drink.ingredients && { "recipeIngredient": drink.ingredients }),
              ...(drink.preparation_method?.steps && {
                "recipeInstructions": drink.preparation_method.steps.map((step: string, i: number) => ({
                  "@type": "HowToStep",
                  "name": `Step ${i + 1}`,
                  "text": step
                }))
              }),
              "keywords": `${drink.name.en}, ${drink.name.thai}, Thai ${drink.category}`
            })
          }}
        />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">

        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: 'Thai Drinks', href: '/drinks' },
              { name: drink.category, href: `/drinks/category/${drink.category}` },
              { name: drink.name.en, href: `/drinks/${drink.slug}` }
            ]} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white pb-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden">
                <Image
                  src={drink.image}
                  alt={drink.name.en}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {drink.alcohol_content !== 'none' && (
                    <span className="bg-thailand-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {drink.alcohol_content} alcohol
                    </span>
                  )}
                  {drink.caffeine !== 'none' && (
                    <span className="bg-thailand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      {drink.caffeine} caffeine
                    </span>
                  )}
                  <span className="bg-thailand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                    {getTemperatureDisplay(drink.temperature)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <FadeInText>
                  <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
                    {drink.name.en}
                  </h1>
                  <p className="text-2xl text-gray-500 mb-4 font-thai">
                    {drink.name.thai}
                  </p>
                </FadeInText>

                <FadeInText delay={200}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-surface-cream px-3 py-1 rounded-full text-sm">
                      {drink.category}
                    </span>
                    <span className="bg-surface-cream px-3 py-1 rounded-full text-sm">
                      {drink.price_range}
                    </span>
                    {drink.region && drink.region !== 'all' ? (
                      <Link href={`/region/${drink.region}/`} className="bg-surface-cream px-3 py-1 rounded-full text-sm text-thailand-blue hover:underline">
                        {drink.region === 'isaan' ? 'Isaan (Northeast)' : `${drink.region.charAt(0).toUpperCase() + drink.region.slice(1)} Thailand`}
                      </Link>
                    ) : (
                      <span className="bg-surface-cream px-3 py-1 rounded-full text-sm">
                        All Thailand
                      </span>
                    )}
                  </div>
                </FadeInText>

                <FadeInText delay={300}>
                  <p className="text-lg text-gray-700 mb-6">
                    {drink.enhanced_description || drink.description.en}
                  </p>
                </FadeInText>

                {/* Quick Info */}
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-4">Quick Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Best Occasions</p>
                      <p className="font-medium">{drink.occasions.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium capitalize">{drink.type}</p>
                    </div>
                    {drink.allergens.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Allergens</p>
                        <p className="font-medium">{drink.allergens.join(', ')}</p>
                      </div>
                    )}
                    {drink.dietary.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Dietary</p>
                        <p className="font-medium">{drink.dietary.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="bg-white py-12 border-t">
          <div className="container-custom">
            <p className="section-label font-script text-thailand-gold">Recipe</p>
            <h2 className="text-2xl font-heading font-bold mb-6">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drink.detailed_ingredients ? (
                drink.detailed_ingredients.map((ing: any, index: number) => (
                  <div key={index} className="bg-surface-cream p-4 rounded-2xl">
                    <h4 className="font-heading font-semibold mb-2">{ing.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{ing.purpose}</p>
                    {ing.substitutes && ing.substitutes.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Substitutes:</p>
                        <ul className="text-xs text-gray-600">
                          {ing.substitutes.map((sub: string, i: number) => (
                            <li key={i}>• {sub}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                drink.ingredients.map((ing: string, index: number) => (
                  <div key={index} className="bg-surface-cream p-3 rounded-2xl">
                    <p className="font-medium">{ing}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Preparation Method */}
        {drink.preparation_method && (
          <section className="bg-surface-cream py-12">
            <div className="container-custom">
              <p className="section-label font-script text-thailand-gold">How To</p>
              <h2 className="text-2xl font-heading font-bold mb-6">How to Make {drink.name.en}</h2>
              <div className="bg-white p-8 rounded-2xl">
                <p className="text-gray-700 mb-6">{drink.preparation_method.overview}</p>
                {drink.preparation_method.steps && (
                  <div>
                    <h3 className="font-heading font-semibold mb-4">Steps:</h3>
                    <ol className="space-y-3">
                      {drink.preparation_method.steps.map((step: string, index: number) => (
                        <li key={index} className="flex">
                          <span className="bg-thailand-red text-white w-6 h-6 rounded-xl flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {drink.preparation_method.tips && (
                  <div className="mt-6 bg-surface-cream p-4 rounded-2xl">
                    <h4 className="font-heading font-semibold mb-2">Pro Tips:</h4>
                    <ul className="text-sm space-y-1">
                      {drink.preparation_method.tips.map((tip: string, index: number) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Cultural Significance */}
        {drink.cultural_significance && (
          <section className="bg-white py-12">
            <div className="container-custom">
              <p className="section-label font-script text-thailand-gold">Heritage</p>
              <h2 className="text-2xl font-heading font-bold mb-6">Cultural Background</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{drink.cultural_significance.history}</p>
                {drink.cultural_significance.occasions && (
                  <div className="mt-6">
                    <h3 className="font-heading font-semibold mb-3">Traditional Occasions:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {drink.cultural_significance.occasions.map((occasion: any, index: number) => (
                        <div key={index} className="bg-surface-cream p-4 rounded-2xl">
                          <h4 className="font-heading font-medium">{occasion.name}</h4>
                          <p className="text-sm text-gray-600">{occasion.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Where to Find */}
        {drink.where_to_find && (
          <section className="bg-surface-cream py-12">
            <div className="container-custom">
              <p className="section-label font-script text-thailand-gold">Discover</p>
              <h2 className="text-2xl font-heading font-bold mb-6">Where to Try {drink.name.en}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-3">Best Locations</h3>
                  <ul className="space-y-2">
                    {drink.where_to_find.best_locations?.map((location: string, index: number) => (
                      <li key={index} className="text-gray-700">• {location}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-3">Popular Venues</h3>
                  <ul className="space-y-2">
                    {drink.where_to_find.popular_venues?.map((venue: string, index: number) => (
                      <li key={index} className="text-gray-700">• {venue}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">Street vendor: {drink.where_to_find.price_ranges?.street || '20-40 THB'}</p>
                    <p className="text-gray-700">Restaurant: {drink.where_to_find.price_ranges?.restaurant || '60-120 THB'}</p>
                    <p className="text-gray-700">Hotel/Bar: {drink.where_to_find.price_ranges?.hotel || '150-300 THB'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cross-Links: Region & Food */}
        <section className="bg-surface-cream section-padding">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <p className="section-label font-script text-thailand-gold">Discover More</p>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              Pair with Thai Cuisine
            </h2>
            <p className="text-gray-600 mb-6">
              Explore the dishes that go perfectly with {drink.name.en}.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/food/"
                className="inline-flex items-center gap-2 bg-thailand-red text-white px-5 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors"
              >
                Explore Thai Dishes
              </Link>
              {drink.region && drink.region !== 'all' && (
                <Link
                  href={`/region/${drink.region}/`}
                  className="inline-flex items-center gap-2 bg-thailand-blue text-white px-5 py-3 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors"
                >
                  Explore {drink.region === 'isaan' ? 'Isaan' : `${drink.region.charAt(0).toUpperCase() + drink.region.slice(1)} Thailand`}
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Related Drinks */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-heading font-bold mb-6">More {drink.category} Drinks</h2>
            <div className="text-center">
              <Link
                href={`/drinks/category/${drink.category}/`}
                className="btn-primary"
              >
                View All {drink.category} Drinks
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const drinks = getAllDrinks();

  const paths = drinks.map(drink => ({
    params: { slug: drink.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const drink = getDrink(slug);

  if (!drink) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      drink
    },
    revalidate: 86400
  };
};
