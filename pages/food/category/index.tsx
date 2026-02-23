import Link from 'next/link';
import FadeInText from '../../../components/FadeInText';
import HighlightedText from '../../../components/HighlightedText';
import { useTranslation } from '../../../hooks/useTranslation';
import SEOHead from '../../../components/SEOHead';

const categoryInfo = {
  'main-dish': {
    title: 'Main Dishes',
    description: 'Hearty and satisfying Thai main courses that form the centerpiece of any meal',
    icon: '',
    count: 15
  },
  'soup': {
    title: 'Thai Soups',
    description: 'Soul-warming broths and soups that showcase the complex flavors of Thai cuisine',
    icon: '',
    count: 8
  },
  'curry': {
    title: 'Thai Curries',
    description: 'Rich and aromatic curry dishes featuring coconut milk and fragrant spices',
    icon: '',
    count: 10
  },
  'salad': {
    title: 'Thai Salads',
    description: 'Fresh and vibrant salads with bold flavors and exciting textures',
    icon: '',
    count: 7
  },
  'dessert': {
    title: 'Thai Desserts',
    description: 'Sweet treats and traditional desserts that perfectly end any Thai meal',
    icon: '',
    count: 6
  }
};

export default function FoodCategoriesIndex() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEOHead
        title="Thai Food Categories - Explore Dishes by Type | Go2Thailand"
        description="Browse Thai dishes by category. Explore main dishes, soups, curries, salads, and desserts. Find authentic recipes from all regions of Thailand."
      >
        <meta name="keywords" content="Thai food categories, Thai dishes, Thai recipes, Thai cuisine types, Thai main dishes, Thai soups, Thai curries" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Hero Section */}
        <section className="relative py-16 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <FadeInText>
              <p className="font-script text-thailand-gold mb-2">Explore by Type</p>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                <HighlightedText
                  text="Thai Food Categories"
                  highlightWords={['Thai', 'Food']}
                  highlightClassName="text-thailand-gold"
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
                  <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                    <div className="text-center">
                      <div className="text-5xl mb-4">{info.icon}</div>
                      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">{info.title}</h2>
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
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-thailand-gold">About</p>
              <h2 className="text-3xl font-heading font-bold mb-4">About Thai Food Categories</h2>
              <p className="text-gray-600 mb-8">
                Thai cuisine is incredibly diverse, with each category offering unique flavors and cooking techniques.
                From the complex layers of spices in curries to the fresh, vibrant flavors of salads, each category
                represents an important part of Thai culinary tradition. Many dishes can be adapted to different spice
                levels and dietary preferences while maintaining their authentic taste.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-heading font-semibold mb-2">Spice Levels</h3>
                  <p className="text-sm text-gray-600">
                    Most dishes can be adjusted from mild to very hot
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-heading font-semibold mb-2">Regional Variations</h3>
                  <p className="text-sm text-gray-600">
                    Each region has its own unique take on classic dishes
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-heading font-semibold mb-2">Fresh Ingredients</h3>
                  <p className="text-sm text-gray-600">
                    Thai cooking emphasizes fresh herbs and vegetables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliate: Book a Thai Cooking Class */}
        <section className="bg-white py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="section-label font-script text-thailand-gold">Experience</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
                Book a Thai Cooking Class
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn to cook authentic Thai dishes with expert local chefs — from street food favorites to royal Thai cuisine
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <div className="text-5xl mb-4"></div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Cooking Classes &amp; Food Tours</h3>
                <p className="text-gray-600 mb-6">
                  Cooking classes and food tours across Thailand
                </p>
                <a
                  href="https://klook.tpo.lv/aq6ZFxvc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-thailand-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-thailand-blue transition-colors"
                >
                  Browse on Klook
                </a>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <div className="text-5xl mb-4"></div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Food Walking Tours</h3>
                <p className="text-gray-600 mb-6">
                  Guided food walking tours
                </p>
                <a
                  href="https://getyourguide.tpo.lv/GuAFfGGK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-thailand-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-thailand-red transition-colors"
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
