import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import FadeInText from '../../../components/FadeInText';
import HighlightedText from '../../../components/HighlightedText';
import { getAllDrinks, getDrinkCategories } from '../../../lib/drinks';
import { useTranslation } from '../../../hooks/useTranslation';

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
  region: string;
}

interface CategoryPageProps {
  category: string;
  drinks: Drink[];
}

const categoryInfo = {
  'tea': {
    title: 'Thai Tea',
    description: 'Traditional Thai teas including the famous Thai iced tea and herbal varieties',
    icon: '🫖',
    color: 'amber'
  },
  'coffee': {
    title: 'Thai Coffee',
    description: 'Rich and aromatic Thai coffee drinks from traditional to modern styles',
    icon: '☕',
    color: 'brown'
  },
  'juice': {
    title: 'Fresh Juices',
    description: 'Tropical fruit juices and refreshing blends made from exotic Thai fruits',
    icon: '🥤',
    color: 'orange'
  },
  'herbal': {
    title: 'Herbal Drinks',
    description: 'Health-boosting herbal beverages and traditional Thai medicinal drinks',
    icon: '🌿',
    color: 'green'
  },
  'alcohol': {
    title: 'Alcoholic Beverages',
    description: 'Thai beers, spirits, and traditional alcoholic drinks',
    icon: '🍺',
    color: 'yellow'
  },
  'natural': {
    title: 'Natural Drinks',
    description: 'Coconut water and other natural Thai beverages',
    icon: '🥥',
    color: 'blue'
  },
  'mocktail': {
    title: 'Mocktails',
    description: 'Non-alcoholic cocktails with Thai flavors and ingredients',
    icon: '🍹',
    color: 'pink'
  },
  'soda': {
    title: 'Sodas & Soft Drinks',
    description: 'Thai sodas and carbonated beverages with unique local flavors',
    icon: '🥤',
    color: 'purple'
  },
  'milk': {
    title: 'Milk-Based Drinks',
    description: 'Thai milk teas and creamy beverages',
    icon: '🥛',
    color: 'gray'
  }
};

// Helper function to get temperature display
const getTemperatureDisplay = (temp: string) => {
  const displays: Record<string, string> = {
    'hot': '🔥 Hot',
    'cold': '🧊 Cold',
    'both': '🌡️ Hot/Cold',
    'room': '🏠 Room temp',
    'neat': '🥃 Neat',
    'mixed': '🍸 Mixed'
  };
  return displays[temp] || temp;
};

export default function DrinkCategoryPage({ category, drinks }: CategoryPageProps) {
  const { t } = useTranslation('common');
  const [temperatureFilter, setTemperatureFilter] = useState<string>('all');
  const [alcoholFilter, setAlcoholFilter] = useState<string>('all');
  
  const info = categoryInfo[category as keyof typeof categoryInfo] || {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Browse all ${category} drinks`,
    icon: '🍹',
    color: 'gray'
  };

  // Filter drinks
  const filteredDrinks = drinks.filter(drink => {
    const tempMatch = temperatureFilter === 'all' || drink.temperature === temperatureFilter;
    const alcoholMatch = alcoholFilter === 'all' || 
      (alcoholFilter === 'alcoholic' && drink.alcohol_content !== 'none') ||
      (alcoholFilter === 'non-alcoholic' && drink.alcohol_content === 'none');
    return tempMatch && alcoholMatch;
  });

  return (
    <>
      <Head>
        <title>{info.title} - Thai {category} Drinks & Recipes | Go2Thailand</title>
        <meta 
          name="description" 
          content={`Discover authentic Thai ${category} drinks and beverages. ${info.description} Learn recipes and find where to try them in Thailand.`}
        />
        <meta name="keywords" content={`Thai ${category}, ${category} drinks Thailand, Thai beverages, ${info.title.toLowerCase()}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: 'Thai Drinks', href: '/drinks' },
              { name: 'Categories', href: '/drinks/category' },
              { name: info.title, href: `/drinks/category/${category}` }
            ]} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-12 bg-gradient-to-r from-thailand-blue to-thailand-blue-600">
          <div className="container-custom text-center text-white">
            <FadeInText>
              <div className="text-6xl mb-4">{info.icon}</div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {info.title}
              </h1>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl max-w-3xl mx-auto">
                {info.description}
              </p>
            </FadeInText>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white py-6 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Temperature Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">Temperature:</label>
                <select 
                  value={temperatureFilter} 
                  onChange={(e) => setTemperatureFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-thailand-blue"
                >
                  <option value="all">All</option>
                  <option value="hot">Hot Only</option>
                  <option value="cold">Cold Only</option>
                  <option value="both">Hot or Cold</option>
                  <option value="room">Room Temperature</option>
                </select>
              </div>

              {/* Alcohol Filter (only show for relevant categories) */}
              {['alcohol', 'mocktail'].includes(category) && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mr-2">Type:</label>
                  <select 
                    value={alcoholFilter} 
                    onChange={(e) => setAlcoholFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-thailand-blue"
                  >
                    <option value="all">All Types</option>
                    <option value="alcoholic">Alcoholic</option>
                    <option value="non-alcoholic">Non-Alcoholic</option>
                  </select>
                </div>
              )}
            </div>

            {/* Results count */}
            <div className="text-center mt-4 text-gray-600">
              Showing {filteredDrinks.length} {category} drinks
            </div>
          </div>
        </section>

        {/* Drinks Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDrinks.map((drink) => (
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
                            {drink.caffeine} caffeine
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm">
                          {getTemperatureDisplay(drink.temperature)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-thailand-blue transition-colors">
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

            {filteredDrinks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No drinks found with the selected filters. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Category Information */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">About {info.title}</h2>
              
              {/* Category-specific content */}
              {category === 'tea' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    Thai tea culture is rich and diverse, ranging from the internationally famous Thai iced tea (cha yen) 
                    to traditional herbal infusions. Thai teas often feature unique preparation methods and ingredients 
                    like condensed milk, spices, and natural colorings.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Popular Occasions</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Afternoon refreshment</li>
                        <li>• With Thai desserts</li>
                        <li>• Social gatherings</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Health Benefits</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Antioxidant properties</li>
                        <li>• Digestive aid</li>
                        <li>• Energy boost</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {category === 'coffee' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    Thai coffee culture blends traditional roasting methods with modern coffee trends. From the 
                    strong and sweet traditional Thai coffee (oliang) to contemporary specialty coffee, Thailand's 
                    coffee scene offers something for every coffee lover.
                  </p>
                </div>
              )}

              {category === 'juice' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    Thailand's tropical climate produces an abundance of exotic fruits, making fresh juices a 
                    staple beverage. From common favorites like mango and pineapple to unique local fruits like 
                    mangosteen and rambutan, Thai juices offer incredible variety and flavor.
                  </p>
                </div>
              )}
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

        {/* Navigation */}
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-center gap-4">
              <Link href="/drinks/category/" className="btn-secondary">
                ← All Categories
              </Link>
              <Link href="/drinks/" className="btn-primary">
                View All Drinks
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getDrinkCategories();
  
  const paths = categories.map(category => ({
    params: { category }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const allDrinks = getAllDrinks();
  
  // Filter drinks by category
  const drinks = allDrinks.filter(drink => drink.category === category);

  return {
    props: {
      category,
      drinks
    }
  };
};