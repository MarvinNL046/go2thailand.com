import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getAllDishes } from '../../lib/food';
import Breadcrumbs from '../../components/Breadcrumbs';

interface Dish {
  id: number;
  slug: string;
  name: { en: string; nl: string; thai: string; };
  category: string;
  region: string;
  spice_level: string;
  image: string;
  difficulty: string;
  preparation_time: string;
  price_range: string;
  ingredients: string[];
}

interface FoodIndexPageProps {
  dishes: Dish[];
  categories: string[];
}

export default function FoodIndexPage({ dishes, categories }: FoodIndexPageProps) {
  // Start with 12 dishes or all dishes if less than 12
  const initialLoad = Math.min(12, dishes.length);
  const [visibleDishes, setVisibleDishes] = useState(initialLoad);
  const [isLoading, setIsLoading] = useState(false);
  const dishesPerLoad = 12; // Load 12 more each time

  const handleShowMore = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleDishes(prev => {
        // Ensure we're adding exactly dishesPerLoad or the remaining dishes
        const remaining = dishes.length - prev;
        const toAdd = Math.min(dishesPerLoad, remaining);
        return prev + toAdd;
      });
      setIsLoading(false);
    }, 300);
  };

  // Calculate how many dishes are left to show
  const remainingDishes = dishes.length - visibleDishes;

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hot': return 'bg-orange-100 text-orange-800';
      case 'very-hot': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'main-dish':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'soup':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'curry':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'salad':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'dessert':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Thai Food Guide | Authentic Thai Dishes & Recipes</title>
        <meta name="description" content="Discover authentic Thai dishes, from Pad Thai to Tom Yum. Learn about ingredients, cooking methods, and cultural significance of Thailand's most beloved foods." />
        <meta name="keywords" content="Thai food, Thai cuisine, Thai recipes, Pad Thai, Tom Yum, Green Curry, Thai dishes, authentic Thai cooking" />
        <link rel="canonical" href="https://go2-thailand.com/food/" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Thai Food Guide
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Discover the authentic flavors of Thailand - from street food favorites to traditional recipes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <span key={category} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Breadcrumbs */}
        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: 'Thai Food Guide', href: '/food' }
            ]} />
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-gray-50 py-8">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-center mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link href="/food/category/main-dish/" className="group">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-center border-2 border-transparent hover:border-thailand-red">
                  <div className="text-4xl mb-2">🍛</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-red">Main Dishes</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'main-dish').length} recipes</p>
                </div>
              </Link>
              <Link href="/food/category/soup/" className="group">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-center border-2 border-transparent hover:border-thailand-blue">
                  <div className="text-4xl mb-2">🍜</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue">Soups</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'soup').length} recipes</p>
                </div>
              </Link>
              <Link href="/food/category/curry/" className="group">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-center border-2 border-transparent hover:border-yellow-500">
                  <div className="text-4xl mb-2">🍛</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600">Curries</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'curry').length} recipes</p>
                </div>
              </Link>
              <Link href="/food/category/salad/" className="group">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-center border-2 border-transparent hover:border-green-500">
                  <div className="text-4xl mb-2">🥗</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600">Salads</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'salad').length} recipes</p>
                </div>
              </Link>
              <Link href="/food/category/dessert/" className="group">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-center border-2 border-transparent hover:border-pink-500">
                  <div className="text-4xl mb-2">🍨</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-pink-600">Desserts</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'dessert').length} recipes</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Dishes Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8">All Thai Dishes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dishes.slice(0, visibleDishes).map((dish) => (
                <Link key={dish.id} href={`/food/${dish.slug}`} className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.name.en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSpiceLevelColor(dish.spice_level)}`}>
                          🌶️ {dish.spice_level === 'none' ? 'Not Spicy' : dish.spice_level}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-white bg-opacity-90 text-thailand-blue px-2 py-1 rounded-full text-xs font-medium">
                          {dish.preparation_time}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-thailand-blue">
                          {getCategoryIcon(dish.category)}
                          <span className="ml-2 text-sm font-medium capitalize">
                            {dish.category.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-thailand-blue transition-colors">
                        {dish.name.en}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {dish.name.thai}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>⏱️ {dish.preparation_time}</span>
                        <span>📍 {dish.region}</span>
                        <span>💰 {dish.price_range}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {ingredient}
                          </span>
                        ))}
                        {dish.ingredients.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{dish.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>


            {/* Show More Button */}
            {visibleDishes < dishes.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleShowMore}
                  disabled={isLoading}
                  className="bg-thailand-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-thailand-red transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    `Show More Dishes (${remainingDishes} remaining)`
                  )}
                </button>
              </div>
            )}

            {/* Show message when all dishes are displayed */}
            {visibleDishes >= dishes.length && (
              <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">
                  You've reached the end! That's all {dishes.length} Thai dishes we have.
                </p>
                <Link 
                  href="/food/category/"
                  className="text-thailand-blue hover:text-thailand-red font-semibold underline"
                >
                  Browse by Category →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Explore by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From hearty main dishes to refreshing salads and sweet desserts
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category) => {
                const categoryDishes = dishes.filter(dish => dish.category === category);
                return (
                  <Link key={category} href={`/food/category/${category}`} className="group">
                    <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-thailand-blue hover:text-white transition-colors duration-300">
                      <div className="w-12 h-12 mx-auto mb-4 text-thailand-blue group-hover:text-white">
                        {getCategoryIcon(category)}
                      </div>
                      <h3 className="font-semibold mb-2 capitalize">
                        {category.replace('-', ' ')}
                      </h3>
                      <p className="text-sm opacity-75">
                        {categoryDishes.length} dishes
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-thailand-gold to-thailand-blue text-white section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Explore Thailand?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Discover the cities where these amazing dishes come from
            </p>
            <Link href="/city/" className="bg-white text-thailand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Thai Cities
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dishes = getAllDishes();
  const categorySet = new Set(dishes.map(dish => dish.category));
  const categories = Array.from(categorySet);
  
  return {
    props: {
      dishes,
      categories
    }
  };
};
