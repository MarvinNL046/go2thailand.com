import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
    'tea': '',
    'coffee': '',
    'juice': '',
    'herbal': '',
    'alcohol': '',
    'natural': '',
    'mocktail': '',
    'soda': '',
    'milk': ''
  };
  return icons[category] || '';
}

// Helper function to get temperature icon
function getTemperatureIcon(temp: string) {
  const icons: Record<string, string> = {
    'hot': '',
    'cold': '',
    'both': '',
    'room': '',
    'neat': '',
    'mixed': ''
  };
  return icons[temp] || '';
}

export default function DrinksPage({ drinks }: DrinksPageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
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
        title={isNl
          ? `Thaise Dranken Gids 2026 — ${drinks.length} Dranken Die Je Moet Proberen`
          : `Thai Drinks Guide 2026 — ${drinks.length} Beverages You Must Try`}
        description={isNl
          ? `Ontdek ${drinks.length} authentieke Thaise dranken van Thai ijsthee tot Singha bier. Recepten, prijzen en waar je ze vindt in heel Thailand.`
          : `Discover ${drinks.length} authentic Thai drinks from Thai iced tea to Singha beer. Recipes, prices and where to find them across Thailand.`}
      >
        <meta name="keywords" content="Thai drinks, Thai tea, Thai coffee, Thai beer, Singha, Chang, Thai beverages, coconut water, Thai iced tea" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">

        {/* Hero Section */}
        <section className="relative bg-surface-dark py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
          <div className="relative container-custom text-center text-white">
            <FadeInText>
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Verfrissende Smaken' : 'Refreshing Flavors'}</p>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                <HighlightedText
                  text={isNl ? 'Thaise Dranken & Drankjes' : 'Thai Drinks & Beverages'}
                  highlightWords={isNl ? ['Thaise', 'Dranken'] : ['Thai', 'Drinks']}
                  highlightClassName="text-thailand-gold"
                  animationType="glow"
                />
              </h1>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl max-w-3xl mx-auto">
                {isNl
                  ? 'Van verfrissende Thai ijsthee tot exotische vruchtensappen en legendarische lokale bieren, ontdek de diverse wereld van Thaise dranken'
                  : 'From refreshing Thai iced tea to exotic fruit juices and legendary local beers, explore the diverse world of Thai beverages'}
              </p>
            </FadeInText>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: isNl ? 'Thaise Dranken' : 'Thai Drinks', href: '/drinks' }
            ]} />
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white py-8 border-b">
          <div className="container-custom">
            <p className="section-label font-script text-thailand-gold text-center">{isNl ? 'Categorieën' : 'Categories'}</p>
            <h2 className="text-2xl font-heading font-bold text-center mb-6">{isNl ? 'Bekijk per Categorie' : 'Browse by Category'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/drinks/category/tea/" className="group">
                <div className="bg-surface-cream p-4 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-2"></div>
                  <h3 className="font-heading font-semibold group-hover:text-thailand-red">{isNl ? 'Thaise Thee' : 'Thai Tea'}</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['tea']?.length || 0} {isNl ? 'dranken' : 'drinks'}</p>
                </div>
              </Link>
              <Link href="/drinks/category/coffee/" className="group">
                <div className="bg-surface-cream p-4 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-2"></div>
                  <h3 className="font-heading font-semibold group-hover:text-thailand-blue">{isNl ? 'Koffie' : 'Coffee'}</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['coffee']?.length || 0} {isNl ? 'dranken' : 'drinks'}</p>
                </div>
              </Link>
              <Link href="/drinks/category/juice/" className="group">
                <div className="bg-surface-cream p-4 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-2"></div>
                  <h3 className="font-heading font-semibold group-hover:text-thailand-blue">{isNl ? 'Verse Sappen' : 'Fresh Juices'}</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['juice']?.length || 0} {isNl ? 'dranken' : 'drinks'}</p>
                </div>
              </Link>
              <Link href="/drinks/category/alcohol/" className="group">
                <div className="bg-surface-cream p-4 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-2"></div>
                  <h3 className="font-heading font-semibold group-hover:text-thailand-red">{isNl ? 'Alcohol' : 'Alcohol'}</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['alcohol']?.length || 0} {isNl ? 'dranken' : 'drinks'}</p>
                </div>
              </Link>
              <Link href="/drinks/category/herbal/" className="group">
                <div className="bg-surface-cream p-4 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-2"></div>
                  <h3 className="font-heading font-semibold group-hover:text-thailand-blue">{isNl ? 'Kruiden' : 'Herbal'}</h3>
                  <p className="text-sm text-gray-600">{drinksByCategory['herbal']?.length || 0} {isNl ? 'dranken' : 'drinks'}</p>
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
                  <h2 className="text-2xl font-heading font-bold capitalize flex items-center gap-2">
                    {getCategoryIcon(category)} {category} {isNl ? 'Dranken' : 'Drinks'}
                  </h2>
                  <Link
                    href={`/drinks/category/${category}/`}
                    className="text-thailand-blue hover:text-thailand-red font-medium"
                  >
                    {isNl ? `Bekijk alle ${category} →` : `View all ${category} →`}
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {drinksByCategory[category].slice(0, 4).map((drink) => (
                    <Link key={drink.id} href={`/drinks/${drink.slug}/`}>
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                        <div className="relative h-48">
                          <Image
                            src={drink.image}
                            alt={drink.name[lang] || drink.name.en}
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
                                Caffeine
                              </span>
                            )}
                          </div>
                          <div className="absolute top-2 right-2">
                            <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm">
                              {getTemperatureIcon(drink.temperature)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-thailand-red transition-colors">
                            {drink.name[lang] || drink.name.en}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2 font-thai">
                            {drink.name.thai}
                          </p>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {drink.description[lang] || drink.description.en}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              {drink.price_range}
                            </span>
                            <span className="text-thailand-blue group-hover:text-thailand-red font-medium">
                              {isNl ? 'Meer info →' : 'Learn more →'}
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

        {/* Food Cross-Link */}
        <section className="bg-surface-cream section-padding">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3">{isNl ? 'Combineer met Thaise Keuken' : 'Pair with Thai Cuisine'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Ontdek de authentieke Thaise gerechten die perfect passen bij deze traditionele dranken.' : 'Explore the authentic Thai dishes that go perfectly with these traditional beverages.'}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/food/" className="inline-flex items-center gap-2 bg-thailand-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors">
                {isNl ? 'Ontdek Thaise Gerechten' : 'Explore Thai Dishes'}
              </Link>
              <Link href="/best-cooking-classes-in-thailand/" className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                {isNl ? 'Kooklessen' : 'Cooking Classes'}
              </Link>
            </div>
          </div>
        </section>

        {/* Thai Drinking Culture Section */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-thailand-gold">{isNl ? 'Cultuur' : 'Culture'}</p>
              <h2 className="text-3xl font-heading font-bold mb-4">{isNl ? 'Thaise Drinkencultuur' : 'Thai Drinking Culture'}</h2>
              <p className="text-gray-600 mb-8">
                {isNl
                  ? 'De drinkencultuur van Thailand is net zo divers als de keuken. Van ochtend koffierituelen tot middagthee en avondlijke sociale drankjes, dranken spelen een belangrijke rol in het Thaise dagelijkse leven en sociale gewoonten.'
                  : "Thailand's beverage culture is as diverse as its cuisine. From morning coffee rituals to afternoon tea breaks and evening social drinks, beverages play an important role in Thai daily life and social customs."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? 'Ochtendrituelen' : 'Morning Rituals'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Begin met Thaise koffie (Oliang) of vers vruchtensap' : 'Start with Thai coffee (Oliang) or fresh fruit juice'}
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? 'Middagverkoeling' : 'Afternoon Cool Down'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Thai ijsthee en kruidendranken verslaan de hitte' : 'Thai iced tea and herbal drinks beat the heat'}
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? 'Avond Sociaal' : 'Evening Social'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Lokale bieren en sterke drank voor sociale bijeenkomsten' : 'Local beers and spirits for social gatherings'}
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
