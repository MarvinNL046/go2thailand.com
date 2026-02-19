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
      </SEOHead>

      <div className="min-h-screen bg-gray-50">

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
              <div className="relative h-96 lg:h-full rounded-lg overflow-hidden">
                <Image
                  src={drink.image}
                  alt={drink.name.en}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {drink.alcohol_content !== 'none' && (
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {drink.alcohol_content} alcohol
                    </span>
                  )}
                  {drink.caffeine !== 'none' && (
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {drink.name.en}
                  </h1>
                  <p className="text-2xl text-gray-500 mb-4 font-thai">
                    {drink.name.thai}
                  </p>
                </FadeInText>

                <FadeInText delay={200}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {drink.category}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {drink.price_range}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {drink.region === 'all' ? 'All Thailand' : `${drink.region} region`}
                    </span>
                  </div>
                </FadeInText>

                <FadeInText delay={300}>
                  <p className="text-lg text-gray-700 mb-6">
                    {drink.enhanced_description || drink.description.en}
                  </p>
                </FadeInText>

                {/* Quick Info */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Quick Information</h3>
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
            <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drink.detailed_ingredients ? (
                drink.detailed_ingredients.map((ing: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">{ing.name}</h4>
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
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{ing}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Preparation Method */}
        {drink.preparation_method && (
          <section className="bg-gray-50 py-12">
            <div className="container-custom">
              <h2 className="text-2xl font-bold mb-6">How to Make {drink.name.en}</h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-gray-700 mb-6">{drink.preparation_method.overview}</p>
                {drink.preparation_method.steps && (
                  <div>
                    <h3 className="font-semibold mb-4">Steps:</h3>
                    <ol className="space-y-3">
                      {drink.preparation_method.steps.map((step: string, index: number) => (
                        <li key={index} className="flex">
                          <span className="bg-thailand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {drink.preparation_method.tips && (
                  <div className="mt-6 bg-thailand-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Tips:</h4>
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
              <h2 className="text-2xl font-bold mb-6">Cultural Background</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{drink.cultural_significance.history}</p>
                {drink.cultural_significance.occasions && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Traditional Occasions:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {drink.cultural_significance.occasions.map((occasion: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium">{occasion.name}</h4>
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
          <section className="bg-gray-50 py-12">
            <div className="container-custom">
              <h2 className="text-2xl font-bold mb-6">Where to Try {drink.name.en}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Best Locations</h3>
                  <ul className="space-y-2">
                    {drink.where_to_find.best_locations?.map((location: string, index: number) => (
                      <li key={index} className="text-gray-700">• {location}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Popular Venues</h3>
                  <ul className="space-y-2">
                    {drink.where_to_find.popular_venues?.map((venue: string, index: number) => (
                      <li key={index} className="text-gray-700">• {venue}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Price Range</h3>
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

        {/* Affiliate: Experience Thai Food & Drink Culture */}
        <section className="bg-gradient-to-b from-white to-orange-50 py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Experience Thai Food &amp; Drink Culture
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Taste the best of Thailand with guided food tours, night market visits, and hands-on cooking experiences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-orange-100">
                <div className="text-5xl mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Street Food &amp; Night Market Tours</h3>
                <p className="text-gray-600 mb-6">
                  Street food &amp; night market tours
                </p>
                <a
                  href="https://klook.tpo.lv/aq6ZFxvc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Browse on Klook
                </a>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-blue-100">
                <div className="text-5xl mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cooking &amp; Tasting Experiences</h3>
                <p className="text-gray-600 mb-6">
                  Thai cooking &amp; tasting experiences
                </p>
                <a
                  href="https://getyourguide.tpo.lv/GuAFfGGK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  Browse on GetYourGuide
                </a>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">
              We may earn a commission when you book through our links, at no extra cost to you. This helps us keep Go2Thailand running.
            </p>
          </div>
        </section>

        {/* Related Drinks */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-6">More {drink.category} Drinks</h2>
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