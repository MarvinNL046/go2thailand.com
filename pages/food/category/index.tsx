import Head from 'next/head';
import Link from 'next/link';
import FadeInText from '../../../components/FadeInText';
import HighlightedText from '../../../components/HighlightedText';
import { useTranslation } from '../../../hooks/useTranslation';

const categoryInfo = {
  'main-dish': {
    title: 'Main Dishes',
    description: 'Hearty and satisfying Thai main courses that form the centerpiece of any meal',
    icon: '🍛',
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    count: 15
  },
  'soup': {
    title: 'Thai Soups',
    description: 'Soul-warming broths and soups that showcase the complex flavors of Thai cuisine',
    icon: '🍜',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    count: 8
  },
  'curry': {
    title: 'Thai Curries',
    description: 'Rich and aromatic curry dishes featuring coconut milk and fragrant spices',
    icon: '🍛',
    color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400',
    count: 10
  },
  'salad': {
    title: 'Thai Salads',
    description: 'Fresh and vibrant salads with bold flavors and exciting textures',
    icon: '🥗',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    count: 7
  },
  'dessert': {
    title: 'Thai Desserts',
    description: 'Sweet treats and traditional desserts that perfectly end any Thai meal',
    icon: '🍨',
    color: 'bg-pink-50 border-pink-200 hover:border-pink-400',
    count: 6
  }
};

export default function FoodCategoriesIndex() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Thai Food Categories - Explore Dishes by Type | Go2Thailand</title>
        <meta 
          name="description" 
          content="Browse Thai dishes by category. Explore main dishes, soups, curries, salads, and desserts. Find authentic recipes from all regions of Thailand."
        />
        <meta name="keywords" content="Thai food categories, Thai dishes, Thai recipes, Thai cuisine types, Thai main dishes, Thai soups, Thai curries" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-thailand-red to-thailand-red-600">
          <div className="container-custom text-center text-white">
            <FadeInText>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                <HighlightedText 
                  text="Thai Food Categories"
                  highlightWords={['Thai', 'Food']}
                  highlightClassName="text-yellow-300"
                  animationType="glow"
                />
              </h1>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl max-w-3xl mx-auto">
                Explore the diverse world of Thai cuisine organized by dish type. From hearty main courses to refreshing salads and sweet desserts.
              </p>
            </FadeInText>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(categoryInfo).map(([slug, info]) => (
                <Link key={slug} href={`/food/category/${slug}/`}>
                  <div className={`card p-6 border-2 ${info.color} transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer`}>
                    <div className="text-center">
                      <div className="text-5xl mb-4">{info.icon}</div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h2>
                      <p className="text-gray-600 mb-4">{info.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-500">
                          {info.count} Traditional Dishes
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

        {/* Additional Info */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">About Thai Food Categories</h2>
              <p className="text-gray-600 mb-8">
                Thai cuisine is incredibly diverse, with each category offering unique flavors and cooking techniques. 
                From the complex layers of spices in curries to the fresh, vibrant flavors of salads, each category 
                represents an important part of Thai culinary tradition. Many dishes can be adapted to different spice 
                levels and dietary preferences while maintaining their authentic taste.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl mb-2">🌶️</div>
                  <h3 className="font-semibold mb-2">Spice Levels</h3>
                  <p className="text-sm text-gray-600">
                    Most dishes can be adjusted from mild to very hot
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl mb-2">🌍</div>
                  <h3 className="font-semibold mb-2">Regional Variations</h3>
                  <p className="text-sm text-gray-600">
                    Each region has its own unique take on classic dishes
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl mb-2">🥗</div>
                  <h3 className="font-semibold mb-2">Fresh Ingredients</h3>
                  <p className="text-sm text-gray-600">
                    Thai cooking emphasizes fresh herbs and vegetables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliate: Book a Thai Cooking Class */}
        <section className="bg-gradient-to-b from-white to-orange-50 py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Book a Thai Cooking Class
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn to cook authentic Thai dishes with expert local chefs — from street food favorites to royal Thai cuisine
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-orange-100">
                <div className="text-5xl mb-4">👨‍🍳</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cooking Classes &amp; Food Tours</h3>
                <p className="text-gray-600 mb-6">
                  Cooking classes and food tours across Thailand
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
                <div className="text-5xl mb-4">🍜</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Food Walking Tours</h3>
                <p className="text-gray-600 mb-6">
                  Guided food walking tours
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
            <Link href="/food/" className="btn-primary">
              ← Back to All Thai Dishes
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}