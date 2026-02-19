import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import FadeInText from '../../components/FadeInText';
import HighlightedText from '../../components/HighlightedText';
import { getAllDrinks } from '../../lib/drinks';
import { useTranslation } from '../../hooks/useTranslation';
import SEOHead from '../../components/SEOHead';

interface Drink {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
    thai: string;
  };
  category: string;
  type: string;
  description: {
    en: string;
    nl: string;
  };
  image: string;
  temperature: string;
  alcohol_content: string;
  caffeine: string;
  price_range: string;
  occasions: string[];
}

interface DrinksPageProps {
  drinks: Drink[];
}

// Helper function to get category icon
function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    'tea': '🫖',
    'coffee': '☕',
    'juice': '🥤',
    'herbal': '🌿',
    'alcohol': '🍺',
    'natural': '🥥',
    'mocktail': '🍹',
    'soda': '🥤',
    'milk': '🥛'
  };
  return icons[category] || '🍹';
}

// Helper function to get temperature icon
function getTemperatureIcon(temp: string) {
  const icons: Record<string, string> = {
    'hot': '🔥',
    'cold': '🧊',
    'both': '🌡️',
    'room': '🏠',
    'neat': '🥃',
    'mixed': '🍸'
  };
  return icons[temp] || '🌡️';
}

export default function DrinksPage({ drinks }: DrinksPageProps) {
  const { t } = useTranslation('common');

  // Group drinks by category
  const drinksByCategory = drinks.reduce((acc, drink) => {
    if (!acc[drink.category]) {
      acc[drink.category] = [];
    }
    acc[drink.category].push(drink);
    return acc;
  }, {} as Record<string, Drink[]>);

  const categories = Object.keys(drinksByCategory);

  return (
    <>
      <SEOHead
        title={`Thai Drinks Guide 2026 — ${drinks.length} Beverages You Must Try`}
        description={`Discover ${drinks.length} authentic Thai drinks from Thai iced tea to Singha beer. Recipes, prices and where to find them across Thailand.`}
      >
        <meta name="keywords" content="Thai drinks, Thai tea, Thai coffee, Thai beer, Singha, Chang, Thai beverages, coconut water, Thai iced tea" />
      </SEOHead>

      <div className="min-h-screen bg-gray-50">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-thailand-blue to-thailand-blue-600 py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
          <div className="relative container-custom text-center text-white">
            <FadeInText>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                <HighlightedText 
                  text="Thai Drinks & Beverages"
                  highlightWords={['Thai', 'Drinks']}
                  highlightClassName="text-thailand-red"
                  animationType="glow"
                />
              </h1>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl max-w-3xl mx-auto">
                From refreshing Thai iced tea to exotic fruit juices and legendary local beers, explore the diverse world of Thai beverages
              </p>
            </FadeInText>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: 'Thai Drinks', href: '/drinks' }
            ]} />
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white py-8 border-b">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-center mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/drinks/category/tea/" className="group">
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-thailand-red-50 transition-all border-2 border-transparent hover:border-thailand-red">
                  <div className="text-3xl mb-2">🫖</div>
                  <h3 className="font-semibold group-hover:text-thailand-red">Thai Tea</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['tea']?.length || 0} drinks</p>
                </div>
              </Link>
              <Link href="/drinks/category/coffee/" className="group">
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-thailand-blue-50 transition-all border-2 border-transparent hover:border-thailand-blue">
                  <div className="text-3xl mb-2">☕</div>
                  <h3 className="font-semibold group-hover:text-thailand-blue">Coffee</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['coffee']?.length || 0} drinks</p>
                </div>
              </Link>
              <Link href="/drinks/category/juice/" className="group">
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-green-50 transition-all border-2 border-transparent hover:border-green-500">
                  <div className="text-3xl mb-2">🥤</div>
                  <h3 className="font-semibold group-hover:text-green-600">Fresh Juices</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['juice']?.length || 0} drinks</p>
                </div>
              </Link>
              <Link href="/drinks/category/alcohol/" className="group">
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-amber-50 transition-all border-2 border-transparent hover:border-amber-500">
                  <div className="text-3xl mb-2">🍺</div>
                  <h3 className="font-semibold group-hover:text-amber-600">Alcohol</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['alcohol']?.length || 0} drinks</p>
                </div>
              </Link>
              <Link href="/drinks/category/herbal/" className="group">
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-purple-50 transition-all border-2 border-transparent hover:border-purple-500">
                  <div className="text-3xl mb-2">🌿</div>
                  <h3 className="font-semibold group-hover:text-purple-600">Herbal</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['herbal']?.length || 0} drinks</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* All Drinks by Category */}
        <section className="py-12">
          <div className="container-custom">
            {categories.map((category) => (
              <div key={category} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
                    {getCategoryIcon(category)} {category} Drinks
                  </h2>
                  <Link 
                    href={`/drinks/category/${category}/`} 
                    className="text-thailand-blue hover:text-thailand-red font-medium"
                  >
                    View all {category} →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {drinksByCategory[category].slice(0, 4).map((drink) => (
                    <Link key={drink.id} href={`/drinks/${drink.slug}/`}>
                      <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className="relative h-48">
                          <Image
                            src={drink.image}
                            alt={drink.name.en}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 flex gap-2">
                            {drink.alcohol_content !== 'none' && (
                              <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-medium">
                                {drink.alcohol_content} alcohol
                              </span>
                            )}
                            {drink.caffeine !== 'none' && (
                              <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium">
                                Caffeine
                              </span>
                            )}
                          </div>
                          <div className="absolute top-2 right-2">
                            <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm">
                              {getTemperatureIcon(drink.temperature)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1 group-hover:text-thailand-red transition-colors">
                            {drink.name.en}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2 font-thai">
                            {drink.name.thai}
                          </p>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {drink.description.en}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              {drink.price_range}
                            </span>
                            <span className="text-thailand-blue group-hover:text-thailand-red font-medium">
                              Learn more →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

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
                <div className="text-5xl mb-4">🌙</div>
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
                <div className="text-5xl mb-4">👨‍🍳</div>
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

        {/* Thai Drinking Culture Section */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Thai Drinking Culture</h2>
              <p className="text-gray-600 mb-8">
                Thailand's beverage culture is as diverse as its cuisine. From morning coffee rituals to afternoon tea breaks 
                and evening social drinks, beverages play an important role in Thai daily life and social customs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl mb-3">☀️</div>
                  <h3 className="font-semibold mb-2">Morning Rituals</h3>
                  <p className="text-sm text-gray-600">
                    Start with Thai coffee (Oliang) or fresh fruit juice
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl mb-3">🌤️</div>
                  <h3 className="font-semibold mb-2">Afternoon Cool Down</h3>
                  <p className="text-sm text-gray-600">
                    Thai iced tea and herbal drinks beat the heat
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl mb-3">🌙</div>
                  <h3 className="font-semibold mb-2">Evening Social</h3>
                  <p className="text-sm text-gray-600">
                    Local beers and spirits for social gatherings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const drinks = getAllDrinks();

  return {
    props: {
      drinks
    }
  };
};