import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FadeInText from '../../../components/FadeInText';
import HighlightedText from '../../../components/HighlightedText';
import { getAllDishes } from '../../../lib/food';
import { useTranslation } from '../../../hooks/useTranslation';

interface Dish {
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
  description?: {
    en: string;
    nl: string;
  } | string;
  difficulty: string;
  preparation_time: string;
  price_range: string;
  ingredients: string[];
}

interface CategoryPageProps {
  category: string;
  dishes: Dish[];
}

const categoryInfo = {
  'main-dish': {
    title: 'Main Dishes',
    description: 'Hearty and satisfying Thai main courses that form the centerpiece of any meal',
    icon: '🍛',
    color: 'bg-orange-50 border-orange-200'
  },
  'soup': {
    title: 'Thai Soups',
    description: 'Soul-warming broths and soups that showcase the complex flavors of Thai cuisine',
    icon: '🍜',
    color: 'bg-blue-50 border-blue-200'
  },
  'curry': {
    title: 'Thai Curries',
    description: 'Rich and aromatic curry dishes featuring coconut milk and fragrant spices',
    icon: '🍛',
    color: 'bg-yellow-50 border-yellow-200'
  },
  'salad': {
    title: 'Thai Salads',
    description: 'Fresh and vibrant salads with bold flavors and exciting textures',
    icon: '🥗',
    color: 'bg-green-50 border-green-200'
  },
  'dessert': {
    title: 'Thai Desserts',
    description: 'Sweet treats and traditional desserts that perfectly end any Thai meal',
    icon: '🍨',
    color: 'bg-pink-50 border-pink-200'
  }
};

export default function FoodCategoryPage({ category, dishes }: CategoryPageProps) {
  const { t } = useTranslation('common');
  const [filter, setFilter] = useState<'all' | 'northern' | 'southern' | 'central' | 'northeastern'>('all');
  const [spiceFilter, setSpiceFilter] = useState<'all' | 'none' | 'mild' | 'medium' | 'hot' | 'very hot'>('all');

  const info = categoryInfo[category as keyof typeof categoryInfo];

  // Filter dishes
  const filteredDishes = dishes.filter(dish => {
    const regionMatch = filter === 'all' || dish.region === filter;
    const spiceMatch = spiceFilter === 'all' || dish.spice_level === spiceFilter;
    return regionMatch && spiceMatch;
  });

  // Group dishes by region
  const dishesByRegion = filteredDishes.reduce((acc, dish) => {
    if (!acc[dish.region]) {
      acc[dish.region] = [];
    }
    acc[dish.region].push(dish);
    return acc;
  }, {} as Record<string, Dish[]>);

  return (
    <>
      <Head>
        <title>{info.title} - Authentic Thai {category.replace('-', ' ')} Recipes | Go2Thailand</title>
        <meta 
          name="description" 
          content={`Discover authentic Thai ${category.replace('-', ' ')} recipes. ${info.description} Learn to cook traditional dishes from all regions of Thailand.`}
        />
        <meta name="keywords" content={`Thai ${category}, ${category} recipes, Thai cooking, authentic Thai food, ${info.title.toLowerCase()}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-thailand-red to-thailand-red-600">
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
        <section className="py-8 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Region Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">Region:</label>
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-thailand-red"
                >
                  <option value="all">All Regions</option>
                  <option value="northern">Northern</option>
                  <option value="southern">Southern</option>
                  <option value="central">Central</option>
                  <option value="northeastern">Northeastern (Isaan)</option>
                </select>
              </div>

              {/* Spice Level Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">Spice Level:</label>
                <select 
                  value={spiceFilter} 
                  onChange={(e) => setSpiceFilter(e.target.value as any)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-thailand-red"
                >
                  <option value="all">All Levels</option>
                  <option value="none">No Spice</option>
                  <option value="mild">Mild 🌶️</option>
                  <option value="medium">Medium 🌶️🌶️</option>
                  <option value="hot">Hot 🌶️🌶️🌶️</option>
                  <option value="very hot">Very Hot 🌶️🌶️🌶️🌶️</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-center mt-4 text-gray-600">
              Showing {filteredDishes.length} {category.replace('-', ' ')} recipes
            </div>
          </div>
        </section>

        {/* Dishes Grid */}
        <section className="py-12">
          <div className="container-custom">
            {Object.entries(dishesByRegion).map(([region, regionDishes]) => (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                  {region} Thailand
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regionDishes.map((dish) => (
                    <Link key={dish.id} href={`/food/${dish.slug}/`}>
                      <div className={`card hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${info.color}`}>
                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={dish.image}
                            alt={dish.name.en}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full text-white ${
                              dish.spice_level === 'hot' || dish.spice_level === 'very hot' ? 'bg-red-500' :
                              dish.spice_level === 'medium' ? 'bg-orange-500' :
                              dish.spice_level === 'mild' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>
                              {dish.spice_level === 'none' ? 'No spice' : 
                               dish.spice_level === 'mild' ? '🌶️ Mild' :
                               dish.spice_level === 'medium' ? '🌶️🌶️ Medium' :
                               dish.spice_level === 'hot' ? '🌶️🌶️🌶️ Hot' :
                               '🌶️🌶️🌶️🌶️ Very Hot'}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-thailand-blue text-white">
                              {dish.preparation_time}
                            </span>
                          </div>
                        </div>
                        <div className="p-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {dish.name.en}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2 font-thai">
                            {dish.name.thai}
                          </p>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {typeof dish.description === 'string' 
                              ? dish.description 
                              : (dish.description?.en || 'Traditional Thai dish')}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${
                              dish.difficulty === 'easy' ? 'text-green-600' :
                              dish.difficulty === 'medium' ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {dish.difficulty} difficulty
                            </span>
                            <span className="text-thailand-blue font-medium">
                              View Recipe →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {filteredDishes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No dishes found with the selected filters. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Back to Food Index */}
        <section className="py-8 bg-gray-50">
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

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['main-dish', 'soup', 'curry', 'salad', 'dessert'];
  
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
  const allDishes = getAllDishes();
  
  // Filter dishes by category
  const dishes = allDishes.filter(dish => dish.category === category);

  return {
    props: {
      category,
      dishes
    }
  };
};