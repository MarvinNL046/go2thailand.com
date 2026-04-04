import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import FadeInText from '../../../components/FadeInText';
import HighlightedText from '../../../components/HighlightedText';
import { getAllDishes } from '../../../lib/food';
import { useTranslation } from '../../../hooks/useTranslation';
import SEOHead from '../../../components/SEOHead';

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
    title: 'Main Dishes', titleNl: 'Hoofdgerechten',
    description: 'Hearty and satisfying Thai main courses that form the centerpiece of any meal',
    descriptionNl: 'Hartige en bevredigende Thaise hoofdgerechten die het middelpunt van elke maaltijd vormen',
    icon: '',
  },
  'soup': {
    title: 'Thai Soups', titleNl: 'Thaise Soepen',
    description: 'Soul-warming broths and soups that showcase the complex flavors of Thai cuisine',
    descriptionNl: 'Verwarmende bouillons en soepen die de complexe smaken van de Thaise keuken laten zien',
    icon: '',
  },
  'curry': {
    title: 'Thai Curries', titleNl: 'Thaise Curry\'s',
    description: 'Rich and aromatic curry dishes featuring coconut milk and fragrant spices',
    descriptionNl: 'Rijke en aromatische currygerechten met kokosmelk en geurige specerijen',
    icon: '',
  },
  'salad': {
    title: 'Thai Salads', titleNl: 'Thaise Salades',
    description: 'Fresh and vibrant salads with bold flavors and exciting textures',
    descriptionNl: 'Frisse en levendige salades met gedurfde smaken en spannende texturen',
    icon: '',
  },
  'dessert': {
    title: 'Thai Desserts', titleNl: 'Thaise Desserts',
    description: 'Sweet treats and traditional desserts that perfectly end any Thai meal',
    descriptionNl: 'Zoete lekkernijen en traditionele desserts die elke Thaise maaltijd perfect afsluiten',
    icon: '',
  }
};

export default function FoodCategoryPage({ category, dishes }: CategoryPageProps) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
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
      <SEOHead
        title={`${info.title} - Authentic Thai ${category.replace('-', ' ')} Recipes | Go2Thailand`}
        description={`Discover authentic Thai ${category.replace('-', ' ')} recipes. ${info.description} Learn to cook traditional dishes from all regions of Thailand.`}
      >
        <meta name="robots" content="noindex, follow" />
        <meta name="keywords" content={`Thai ${category}, ${category} recipes, Thai cooking, authentic Thai food, ${info.title.toLowerCase()}`} />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">

        {/* Hero Section */}
        <section className="relative py-16 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <FadeInText>
              <div className="text-6xl mb-4">{info.icon}</div>
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Thaise Keuken' : 'Thai Cuisine'}</p>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                {isNl ? info.titleNl : info.title}
              </h1>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl max-w-3xl mx-auto">
                {isNl ? info.descriptionNl : info.description}
              </p>
            </FadeInText>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b bg-white">
          <div className="container-custom">
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Region Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">{isNl ? 'Regio:' : 'Region:'}</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-thailand-red"
                >
                  <option value="all">{isNl ? 'Alle Regio\'s' : 'All Regions'}</option>
                  <option value="northern">{isNl ? 'Noord' : 'Northern'}</option>
                  <option value="southern">{isNl ? 'Zuid' : 'Southern'}</option>
                  <option value="central">{isNl ? 'Centraal' : 'Central'}</option>
                  <option value="northeastern">{isNl ? 'Noordoost (Isaan)' : 'Northeastern (Isaan)'}</option>
                </select>
              </div>

              {/* Spice Level Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">{isNl ? 'Pittigheid:' : 'Spice Level:'}</label>
                <select
                  value={spiceFilter}
                  onChange={(e) => setSpiceFilter(e.target.value as any)}
                  className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-thailand-red"
                >
                  <option value="all">{isNl ? 'Alle Niveaus' : 'All Levels'}</option>
                  <option value="none">{isNl ? 'Niet Pittig' : 'No Spice'}</option>
                  <option value="mild">{isNl ? 'Mild' : 'Mild'}</option>
                  <option value="medium">{isNl ? 'Medium' : 'Medium'}</option>
                  <option value="hot">{isNl ? 'Pittig' : 'Hot'}</option>
                  <option value="very hot">{isNl ? 'Zeer Pittig' : 'Very Hot'}</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-center mt-4 text-gray-600">
              {isNl
                ? `${filteredDishes.length} ${category.replace('-', ' ')} recepten gevonden`
                : `Showing ${filteredDishes.length} ${category.replace('-', ' ')} recipes`}
            </div>
          </div>
        </section>

        {/* Dishes Grid */}
        <section className="py-12">
          <div className="container-custom">
            {Object.entries(dishesByRegion).map(([region, regionDishes]) => (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 capitalize">
                  {region} {isNl ? 'Thailand' : 'Thailand'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regionDishes.map((dish) => (
                    <Link key={dish.id} href={`/food/${dish.slug}/`}>
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="relative h-48 mb-4 rounded-t-2xl overflow-hidden">
                          <Image
                            src={dish.image}
                            alt={dish.name[lang] || dish.name.en}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full text-white ${
                              dish.spice_level === 'hot' || dish.spice_level === 'very hot' ? 'bg-thailand-red' :
                              dish.spice_level === 'medium' ? 'bg-orange-500' :
                              dish.spice_level === 'mild' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>
                              {dish.spice_level === 'none' ? (isNl ? 'Niet pittig' : 'No spice') :
                               dish.spice_level === 'mild' ? 'Mild' :
                               dish.spice_level === 'medium' ? 'Medium' :
                               dish.spice_level === 'hot' ? (isNl ? 'Pittig' : 'Hot') :
                               (isNl ? 'Zeer Pittig' : 'Very Hot')}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-thailand-blue text-white">
                              {dish.preparation_time}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                            {dish.name[lang] || dish.name.en}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2 font-thai">
                            {dish.name.thai}
                          </p>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {typeof dish.description === 'string'
                              ? dish.description
                              : ((dish.description as any)?.[lang] || dish.description?.en || (isNl ? 'Traditioneel Thais gerecht' : 'Traditional Thai dish'))}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${
                              dish.difficulty === 'easy' ? 'text-thailand-blue' :
                              dish.difficulty === 'medium' ? 'text-thailand-gold' : 'text-thailand-red'
                            }`}>
                              {isNl
                                ? `${dish.difficulty === 'easy' ? 'makkelijk' : dish.difficulty === 'medium' ? 'gemiddeld' : 'moeilijk'}`
                                : `${dish.difficulty} difficulty`}
                            </span>
                            <span className="text-thailand-blue font-medium">
                              {isNl ? 'Bekijk Recept' : 'View Recipe'} &rarr;
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
                  {isNl ? 'Geen gerechten gevonden met de geselecteerde filters. Probeer je filters aan te passen.' : 'No dishes found with the selected filters. Try adjusting your filters.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Explore Other Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">{isNl ? 'Andere Categorieën Verkennen' : 'Explore Other Categories'}</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { slug: 'main-dish', label: 'Main Dishes', labelNl: 'Hoofdgerechten' },
                { slug: 'soup', label: 'Soups & Curries', labelNl: 'Soepen & Curry\'s' },
                { slug: 'curry', label: 'Curries', labelNl: 'Curry\'s' },
                { slug: 'salad', label: 'Salads', labelNl: 'Salades' },
                { slug: 'noodle', label: 'Noodles', labelNl: 'Noedels' },
                { slug: 'stir-fry', label: 'Stir-Fries', labelNl: 'Roerbakgerechten' },
                { slug: 'dessert', label: 'Desserts', labelNl: 'Desserts' },
                { slug: 'appetizer', label: 'Appetizers', labelNl: 'Voorgerechten' },
              ].filter(c => c.slug !== category).map(c => (
                <Link
                  key={c.slug}
                  href={`/food/category/${c.slug}/`}
                  className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:border-thailand-red hover:text-thailand-red transition-colors"
                >
                  {isNl ? c.labelNl : c.label}
                </Link>
              ))}
              <Link
                href="/drinks/"
                className="bg-thailand-blue/10 border border-thailand-blue/20 px-4 py-2 rounded-xl text-sm font-medium text-thailand-blue hover:bg-thailand-blue/20 transition-colors"
              >
                {isNl ? 'Thaise Dranken' : 'Thai Drinks'}
              </Link>
            </div>
          </div>
        </section>

        {/* Cooking Classes + Back to Food Index */}
        <section className="py-8 bg-surface-cream">
          <div className="container-custom text-center space-y-4">
            <Link href="/best-cooking-classes-in-thailand/" className="inline-flex items-center gap-2 text-thailand-red font-semibold hover:underline">
              {isNl ? 'Leer deze gerechten koken — Vergelijk kookcursussen in Thailand' : 'Learn to cook these dishes — Compare cooking classes across Thailand'} &rarr;
            </Link>
            <div>
              <Link href="/food/" className="btn-primary">
                &larr; {isNl ? 'Terug naar Alle Thaise Gerechten' : 'Back to All Thai Dishes'}
              </Link>
            </div>
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
    fallback: 'blocking'
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
    },
    revalidate: 604800
  };
};
