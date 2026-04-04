import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    title: 'Thai Tea', titleNl: 'Thaise Thee',
    description: 'Traditional Thai teas including the famous Thai iced tea and herbal varieties',
    descriptionNl: 'Traditionele Thaise thee inclusief de beroemde Thaise ijsthee en kruidenvariëteiten',
    icon: '',
  },
  'coffee': {
    title: 'Thai Coffee', titleNl: 'Thaise Koffie',
    description: 'Rich and aromatic Thai coffee drinks from traditional to modern styles',
    descriptionNl: 'Rijke en aromatische Thaise koffiedranken van traditioneel tot modern',
    icon: '',
  },
  'juice': {
    title: 'Fresh Juices', titleNl: 'Verse Sappen',
    description: 'Tropical fruit juices and refreshing blends made from exotic Thai fruits',
    descriptionNl: 'Tropische vruchtensappen en verfrissende blends van exotisch Thais fruit',
    icon: '',
  },
  'herbal': {
    title: 'Herbal Drinks', titleNl: 'Kruidendranken',
    description: 'Health-boosting herbal beverages and traditional Thai medicinal drinks',
    descriptionNl: 'Gezondheidsbevorderende kruidendranken en traditionele Thaise medicinale dranken',
    icon: '',
  },
  'alcohol': {
    title: 'Alcoholic Beverages', titleNl: 'Alcoholische Dranken',
    description: 'Thai beers, spirits, and traditional alcoholic drinks',
    descriptionNl: 'Thaise bieren, sterke drank en traditionele alcoholische dranken',
    icon: '',
  },
  'natural': {
    title: 'Natural Drinks', titleNl: 'Natuurlijke Dranken',
    description: 'Coconut water and other natural Thai beverages',
    descriptionNl: 'Kokoswater en andere natuurlijke Thaise dranken',
    icon: '',
  },
  'mocktail': {
    title: 'Mocktails', titleNl: 'Mocktails',
    description: 'Non-alcoholic cocktails with Thai flavors and ingredients',
    descriptionNl: 'Alcoholvrije cocktails met Thaise smaken en ingrediënten',
    icon: '',
  },
  'soda': {
    title: 'Sodas & Soft Drinks', titleNl: 'Frisdranken',
    description: 'Thai sodas and carbonated beverages with unique local flavors',
    descriptionNl: 'Thaise frisdranken en koolzuurhoudende dranken met unieke lokale smaken',
    icon: '',
  },
  'milk': {
    title: 'Milk-Based Drinks', titleNl: 'Melkdranken',
    description: 'Thai milk teas and creamy beverages',
    descriptionNl: 'Thaise melkthee en romige dranken',
    icon: '',
  }
};

export default function DrinkCategoriesIndex({ categoryCounts }: DrinkCategoriesPageProps) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  return (
    <>
      <SEOHead
        title={isNl ? "Thaise Dranken Categorieën - Bekijk per Type | Go2Thailand" : "Thai Drink Categories - Browse by Type | Go2Thailand"}
        description={isNl ? "Ontdek Thaise dranken per categorie. Van traditionele thee en koffie tot tropische sappen en Thais bier. Vind je perfecte Thaise drank." : "Explore Thai drinks by category. From traditional teas and coffee to tropical juices and Thai beer. Find your perfect Thai beverage."}
      >
        <meta name="robots" content="noindex, follow" />
        <meta name="keywords" content="Thai drink categories, Thai beverages, Thai tea, Thai coffee, Thai beer, Thai juice, Thai drinks by type" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Hero Section */}
        <section className="relative py-16 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <FadeInText>
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Bekijk per Type' : 'Browse by Type'}</p>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                <HighlightedText
                  text={isNl ? "Thaise Dranken Categorieën" : "Thai Drink Categories"}
                  highlightWords={['Thai', 'Thaise', 'Drink', 'Dranken']}
                  highlightClassName="text-thailand-gold"
                  animationType="glow"
                />
              </h1>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl max-w-3xl mx-auto">
                {isNl ? 'Ontdek de diverse wereld van Thaise dranken. Van verfrissende thee tot exotische vruchtensappen en legendarische lokale bieren.' : 'Discover the diverse world of Thai beverages. From refreshing teas to exotic fruit juices and legendary local beers.'}
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
                  <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                    <div className="text-center">
                      <div className="text-5xl mb-4">{info.icon}</div>
                      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">{isNl ? info.titleNl : info.title}</h2>
                      <p className="text-gray-600 mb-4">{isNl ? info.descriptionNl : info.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-500">
                          {categoryCounts[slug] || 0} {isNl ? 'Dranken' : 'Beverages'}
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-thailand-blue font-medium hover:text-thailand-red transition-colors">
                          {isNl ? `Bekijk ${info.titleNl}` : `Explore ${info.title}`} &rarr;
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
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-thailand-gold">{isNl ? 'Cultuur' : 'Culture'}</p>
              <h2 className="text-3xl font-heading font-bold mb-4">{isNl ? 'Thaise Drankencultuur' : 'Thai Beverage Culture'}</h2>
              <p className="text-gray-600 mb-8">
                {isNl
                  ? 'Dranken spelen een cruciale rol in de Thaise cultuur en het dagelijks leven. Van ochtendkoffierituelen tot middagtheepauzes en avondlijke sociale drankjes, elke categorie vertegenwoordigt verschillende aspecten van de Thaise levensstijl en tradities. Veel dranken hebben medicinale eigenschappen en zijn diep geworteld in de traditionele Thaise geneeskunde.'
                  : 'Beverages play a crucial role in Thai culture and daily life. From morning coffee rituals to afternoon tea breaks and evening social drinks, each category represents different aspects of Thai lifestyle and traditions. Many drinks have medicinal properties and are deeply rooted in traditional Thai medicine.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? 'Klimaatbestendig' : 'Climate Adapted'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Dranken ontworpen om af te koelen in tropische hitte' : 'Drinks designed to cool down in tropical heat'}
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? 'Gezondheidsvoordelen' : 'Health Benefits'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Veel dranken hebben traditionele medicinale eigenschappen' : 'Many drinks have traditional medicinal properties'}
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2"></div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? 'Sociale Tradities' : 'Social Traditions'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Dranken staan centraal bij Thaise sociale bijeenkomsten' : 'Drinks are central to Thai social gatherings'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Thai Food & Drink Culture */}
        <section className="bg-white py-16">
          <div className="container-custom text-center">
            <p className="section-label font-script text-thailand-gold">{isNl ? 'Ervaring' : 'Experience'}</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              {isNl ? 'Ervaar de Thaise Eet- & Drankcultuur' : 'Experience Thai Food & Drink Culture'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {isNl
                ? <>Ontdek de smaken achter deze dranken door onze <Link href="/food/" className="text-thailand-blue hover:underline">Thaise eetgids</Link> te verkennen of leer ze zelf te maken.</>
                : <>Discover the flavors behind these drinks by exploring our <Link href="/food/" className="text-thailand-blue hover:underline">Thai food guide</Link> or learning to cook them yourself.</>}
            </p>
            <Link
              href="/best-cooking-classes-in-thailand/"
              className="inline-block bg-thailand-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-thailand-blue transition-colors"
            >
              {isNl ? 'Vergelijk Kookcursussen in Thailand' : 'Compare Cooking Classes Across Thailand'}
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-8 bg-white">
          <div className="container-custom text-center">
            <Link href="/drinks/" className="btn-primary">
              &larr; {isNl ? 'Terug naar Alle Thaise Dranken' : 'Back to All Thai Drinks'}
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
