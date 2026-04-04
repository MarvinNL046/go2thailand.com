import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../../components/Breadcrumbs';
import FadeInText from '../../../components/FadeInText';
import HighlightedText from '../../../components/HighlightedText';
import { getAllDrinks, getDrinkCategories } from '../../../lib/drinks';
import { useTranslation } from '../../../hooks/useTranslation';
import SEOHead from '../../../components/SEOHead';

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
  'tea': { title: 'Thai Tea', titleNl: 'Thaise Thee', description: 'Traditional Thai teas including the famous Thai iced tea and herbal varieties', descriptionNl: 'Traditionele Thaise thee inclusief de beroemde Thaise ijsthee en kruidenvariëteiten', icon: '' },
  'coffee': { title: 'Thai Coffee', titleNl: 'Thaise Koffie', description: 'Rich and aromatic Thai coffee drinks from traditional to modern styles', descriptionNl: 'Rijke en aromatische Thaise koffiedranken van traditioneel tot modern', icon: '' },
  'juice': { title: 'Fresh Juices', titleNl: 'Verse Sappen', description: 'Tropical fruit juices and refreshing blends made from exotic Thai fruits', descriptionNl: 'Tropische vruchtensappen en verfrissende blends van exotisch Thais fruit', icon: '' },
  'herbal': { title: 'Herbal Drinks', titleNl: 'Kruidendranken', description: 'Health-boosting herbal beverages and traditional Thai medicinal drinks', descriptionNl: 'Gezondheidsbevorderende kruidendranken en traditionele Thaise medicinale dranken', icon: '' },
  'alcohol': { title: 'Alcoholic Beverages', titleNl: 'Alcoholische Dranken', description: 'Thai beers, spirits, and traditional alcoholic drinks', descriptionNl: 'Thaise bieren, sterke drank en traditionele alcoholische dranken', icon: '' },
  'natural': { title: 'Natural Drinks', titleNl: 'Natuurlijke Dranken', description: 'Coconut water and other natural Thai beverages', descriptionNl: 'Kokoswater en andere natuurlijke Thaise dranken', icon: '' },
  'mocktail': { title: 'Mocktails', titleNl: 'Mocktails', description: 'Non-alcoholic cocktails with Thai flavors and ingredients', descriptionNl: 'Alcoholvrije cocktails met Thaise smaken en ingrediënten', icon: '' },
  'soda': { title: 'Sodas & Soft Drinks', titleNl: 'Frisdranken', description: 'Thai sodas and carbonated beverages with unique local flavors', descriptionNl: 'Thaise frisdranken en koolzuurhoudende dranken met unieke lokale smaken', icon: '' },
  'milk': { title: 'Milk-Based Drinks', titleNl: 'Melkdranken', description: 'Thai milk teas and creamy beverages', descriptionNl: 'Thaise melkthee en romige dranken', icon: '' },
};

// Helper function to get temperature display
const getTemperatureDisplay = (temp: string) => {
  const displays: Record<string, string> = {
    'hot': 'Hot',
    'cold': 'Cold',
    'both': 'Hot/Cold',
    'room': 'Room temp',
    'neat': 'Neat',
    'mixed': 'Mixed'
  };
  return displays[temp] || temp;
};

export default function DrinkCategoryPage({ category, drinks }: CategoryPageProps) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
  const [temperatureFilter, setTemperatureFilter] = useState<string>('all');
  const [alcoholFilter, setAlcoholFilter] = useState<string>('all');

  const info = categoryInfo[category as keyof typeof categoryInfo] || {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    titleNl: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Browse all ${category} drinks`,
    descriptionNl: `Bekijk alle ${category} dranken`,
    icon: '',
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
      <SEOHead
        title={`${info.title} - Thai ${category} Drinks & Recipes | Go2Thailand`}
        description={`Discover authentic Thai ${category} drinks and beverages. ${info.description} Learn recipes and find where to try them in Thailand.`}
      >
        <meta name="robots" content="noindex, follow" />
        <meta name="keywords" content={`Thai ${category}, ${category} drinks Thailand, Thai beverages, ${info.title.toLowerCase()}`} />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: isNl ? 'Thaise Dranken' : 'Thai Drinks', href: '/drinks' },
              { name: isNl ? 'Categorieën' : 'Categories', href: '/drinks/category' },
              { name: isNl ? info.titleNl : info.title, href: `/drinks/category/${category}` }
            ]} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-12 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <FadeInText>
              <div className="text-6xl mb-4">{info.icon}</div>
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Thaise Dranken' : 'Thai Beverages'}</p>
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
        <section className="bg-white py-6 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Temperature Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">{isNl ? 'Temperatuur:' : 'Temperature:'}</label>
                <select
                  value={temperatureFilter}
                  onChange={(e) => setTemperatureFilter(e.target.value)}
                  className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-thailand-blue"
                >
                  <option value="all">{isNl ? 'Alles' : 'All'}</option>
                  <option value="hot">{isNl ? 'Alleen Warm' : 'Hot Only'}</option>
                  <option value="cold">{isNl ? 'Alleen Koud' : 'Cold Only'}</option>
                  <option value="both">{isNl ? 'Warm of Koud' : 'Hot or Cold'}</option>
                  <option value="room">{isNl ? 'Kamertemperatuur' : 'Room Temperature'}</option>
                </select>
              </div>

              {/* Alcohol Filter (only show for relevant categories) */}
              {['alcohol', 'mocktail'].includes(category) && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mr-2">{isNl ? 'Type:' : 'Type:'}</label>
                  <select
                    value={alcoholFilter}
                    onChange={(e) => setAlcoholFilter(e.target.value)}
                    className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-thailand-blue"
                  >
                    <option value="all">{isNl ? 'Alle Types' : 'All Types'}</option>
                    <option value="alcoholic">{isNl ? 'Alcoholisch' : 'Alcoholic'}</option>
                    <option value="non-alcoholic">{isNl ? 'Alcoholvrij' : 'Non-Alcoholic'}</option>
                  </select>
                </div>
              )}
            </div>

            {/* Results count */}
            <div className="text-center mt-4 text-gray-600">
              {isNl ? `${filteredDrinks.length} ${category} dranken gevonden` : `Showing ${filteredDrinks.length} ${category} drinks`}
            </div>
          </div>
        </section>

        {/* Drinks Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDrinks.map((drink) => (
                <Link key={drink.id} href={`/drinks/${drink.slug}/`}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                    <div className="relative h-48">
                      <Image
                        src={drink.image}
                        alt={drink.name.en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {drink.alcohol_content !== 'none' && (
                          <span className="bg-thailand-red text-white px-2 py-1 rounded-full text-xs font-medium">
                            {drink.alcohol_content} alcohol
                          </span>
                        )}
                        {drink.caffeine !== 'none' && (
                          <span className="bg-thailand-blue text-white px-2 py-1 rounded-full text-xs font-medium">
                            {drink.caffeine} caffeine
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm">
                          {getTemperatureDisplay(drink.temperature)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-thailand-blue transition-colors">
                        {drink.name[lang] || drink.name.en}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 font-thai">
                        {drink.name.thai}
                      </p>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {(drink.description as any)[lang] || drink.description.en}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {drink.price_range}
                        </span>
                        <span className="text-thailand-blue group-hover:text-thailand-red font-medium">
                          {isNl ? 'Meer info' : 'Learn more'} &rarr;
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
                  {isNl ? 'Geen dranken gevonden met de geselecteerde filters. Probeer je filters aan te passen.' : 'No drinks found with the selected filters. Try adjusting your filters.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Explore Other Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">{isNl ? 'Andere Drankcategorieën Verkennen' : 'Explore Other Drink Categories'}</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { slug: 'tea', label: 'Thai Teas', labelNl: 'Thaise Thee' },
                { slug: 'coffee', label: 'Thai Coffee', labelNl: 'Thaise Koffie' },
                { slug: 'alcohol', label: 'Beer & Spirits', labelNl: 'Bier & Sterke Drank' },
                { slug: 'juice', label: 'Fresh Juices', labelNl: 'Verse Sappen' },
                { slug: 'herbal', label: 'Herbal Drinks', labelNl: 'Kruidendranken' },
                { slug: 'smoothie', label: 'Smoothies', labelNl: 'Smoothies' },
                { slug: 'cocktail', label: 'Cocktails', labelNl: 'Cocktails' },
              ].filter(c => c.slug !== category).map(c => (
                <Link
                  key={c.slug}
                  href={`/drinks/category/${c.slug}/`}
                  className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:border-thailand-blue hover:text-thailand-blue transition-colors"
                >
                  {isNl ? c.labelNl : c.label}
                </Link>
              ))}
              <Link
                href="/food/"
                className="bg-thailand-red/10 border border-thailand-red/20 px-4 py-2 rounded-xl text-sm font-medium text-thailand-red hover:bg-thailand-red/20 transition-colors"
              >
                {isNl ? 'Thais Eten' : 'Thai Food'}
              </Link>
              <Link
                href="/best-cooking-classes-in-thailand/"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-xl text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
              >
                {isNl ? 'Kookcursussen' : 'Cooking Classes'}
              </Link>
            </div>
          </div>
        </section>

        {/* Category Information */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="section-label font-script text-thailand-gold text-center">{isNl ? 'Over' : 'About'}</p>
              <h2 className="text-2xl font-heading font-bold mb-6 text-center">{isNl ? `Over ${info.titleNl}` : `About ${info.title}`}</h2>

              {/* Category-specific content */}
              {category === 'tea' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    Thai tea culture is rich and diverse, ranging from the internationally famous Thai iced tea (cha yen)
                    to traditional herbal infusions. Thai teas often feature unique preparation methods and ingredients
                    like condensed milk, spices, and natural colorings.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-surface-cream p-4 rounded-2xl">
                      <h3 className="font-heading font-semibold mb-2">Popular Occasions</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Afternoon refreshment</li>
                        <li>• With Thai desserts</li>
                        <li>• Social gatherings</li>
                      </ul>
                    </div>
                    <div className="bg-surface-cream p-4 rounded-2xl">
                      <h3 className="font-heading font-semibold mb-2">Health Benefits</h3>
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

        {/* Navigation */}
        <section className="py-8 bg-surface-cream">
          <div className="container-custom">
            <div className="flex justify-center gap-4">
              <Link href="/drinks/category/" className="btn-secondary">
                &larr; {isNl ? 'Alle Categorieën' : 'All Categories'}
              </Link>
              <Link href="/drinks/" className="btn-primary">
                {isNl ? 'Bekijk Alle Dranken' : 'View All Drinks'}
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
    fallback: 'blocking'
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
    },
    revalidate: 604800
  };
};
