import { GetStaticProps } from 'next';
import Link from 'next/link';
import FadeInText from '../../../components/FadeInText';
import HighlightedText from '../../../components/HighlightedText';
import { getAllDrinks } from '../../../lib/drinks';
import { useTranslation } from '../../../hooks/useTranslation';
import SEOHead from '../../../components/SEOHead';

interface DrinkCategoriesPageProps {
  categoryCounts: Record<string, number>;
}

const categoryInfo = {
  'tea': {
    title: 'Thai Tea',
    description: 'Traditional Thai teas including the famous Thai iced tea and herbal varieties',
    icon: '',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400'
  },
  'coffee': {
    title: 'Thai Coffee',
    description: 'Rich and aromatic Thai coffee drinks from traditional to modern styles',
    icon: '',
    color: 'bg-brown-50 border-brown-200 hover:border-brown-400'
  },
  'juice': {
    title: 'Fresh Juices',
    description: 'Tropical fruit juices and refreshing blends made from exotic Thai fruits',
    icon: '',
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400'
  },
  'herbal': {
    title: 'Herbal Drinks',
    description: 'Health-boosting herbal beverages and traditional Thai medicinal drinks',
    icon: '',
    color: 'bg-green-50 border-green-200 hover:border-green-400'
  },
  'alcohol': {
    title: 'Alcoholic Beverages',
    description: 'Thai beers, spirits, and traditional alcoholic drinks',
    icon: '',
    color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400'
  },
  'natural': {
    title: 'Natural Drinks',
    description: 'Coconut water and other natural Thai beverages',
    icon: '',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400'
  },
  'mocktail': {
    title: 'Mocktails',
    description: 'Non-alcoholic cocktails with Thai flavors and ingredients',
    icon: '',
    color: 'bg-pink-50 border-pink-200 hover:border-pink-400'
  },
  'soda': {
    title: 'Sodas & Soft Drinks',
    description: 'Thai sodas and carbonated beverages with unique local flavors',
    icon: '',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400'
  },
  'milk': {
    title: 'Milk-Based Drinks',
    description: 'Thai milk teas and creamy beverages',
    icon: '',
    color: 'bg-gray-50 border-gray-200 hover:border-gray-400'
  }
};

export default function DrinkCategoriesIndex({ categoryCounts }: DrinkCategoriesPageProps) {
  const { t } = useTranslation('common');

  return (
    <>
      <SEOHead
        title="Thai Drink Categories - Browse by Type | Go2Thailand"
        description="Explore Thai drinks by category. From traditional teas and coffee to tropical juices and Thai beer. Find your perfect Thai beverage."
      >
        <meta name="keywords" content="Thai drink categories, Thai beverages, Thai tea, Thai coffee, Thai beer, Thai juice, Thai drinks by type" />
      </SEOHead>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-thailand-blue to-thailand-blue-600">
          <div className="container-custom text-center text-white">
            <FadeInText>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                <HighlightedText 
                  text="Thai Drink Categories"
                  highlightWords={['Thai', 'Drink']}
                  highlightClassName="text-thailand-red"
                  animationType="glow"
                />
              </h1>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl max-w-3xl mx-auto">
                Discover the diverse world of Thai beverages. From refreshing teas to exotic fruit juices and legendary local beers.
              </p>
            </FadeInText>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(categoryInfo).map(([slug, info]) => (
                <Link key={slug} href={`/drinks/category/${slug}/`}>
                  <div className={`card p-6 border-2 ${info.color} transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer`}>
                    <div className="text-center">
                      <div className="text-5xl mb-4">{info.icon}</div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h2>
                      <p className="text-gray-600 mb-4">{info.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-500">
                          {categoryCounts[slug] || 0} Beverages
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-thailand-blue font-medium hover:text-thailand-red transition-colors">
                          Explore {info.title} →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Thai Beverage Culture */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Thai Beverage Culture</h2>
              <p className="text-gray-600 mb-8">
                Beverages play a crucial role in Thai culture and daily life. From morning coffee rituals 
                to afternoon tea breaks and evening social drinks, each category represents different 
                aspects of Thai lifestyle and traditions. Many drinks have medicinal properties and are 
                deeply rooted in traditional Thai medicine.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-semibold mb-2">Climate Adapted</h3>
                  <p className="text-sm text-gray-600">
                    Drinks designed to cool down in tropical heat
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-semibold mb-2">Health Benefits</h3>
                  <p className="text-sm text-gray-600">
                    Many drinks have traditional medicinal properties
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-semibold mb-2">Social Traditions</h3>
                  <p className="text-sm text-gray-600">
                    Drinks are central to Thai social gatherings
                  </p>
                </div>
              </div>
            </div>
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

        {/* Call to Action */}
        <section className="py-8 bg-white">
          <div className="container-custom text-center">
            <Link href="/drinks/" className="btn-primary">
              ← Back to All Thai Drinks
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const drinks = getAllDrinks();
  
  // Count drinks by category
  const categoryCounts = drinks.reduce((acc, drink) => {
    if (!acc[drink.category]) {
      acc[drink.category] = 0;
    }
    acc[drink.category]++;
    return acc;
  }, {} as Record<string, number>);

  return {
    props: {
      categoryCounts
    }
  };
};