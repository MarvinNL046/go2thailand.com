import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllTravelGuides } from '../../lib/travel-guides';

interface Guide {
  slug: string;
  title: { en: string; nl: string };
  description: { en: string; nl: string };
  icon: string;
  category: string;
  static?: boolean;
}

const categoryLabels: Record<string, { en: string; nl: string }> = {
  planning: { en: 'Planning & Preparation', nl: 'Planning & Voorbereiding' },
  transport: { en: 'Transport & Getting Around', nl: 'Transport & Vervoer' },
  connectivity: { en: 'Connectivity', nl: 'Connectiviteit' },
  activities: { en: 'Activities & Adventure', nl: 'Activiteiten & Avontuur' },
  culture: { en: 'Culture & Lifestyle', nl: 'Cultuur & Lifestyle' },
  'health-safety': { en: 'Health & Safety', nl: 'Gezondheid & Veiligheid' },
};

const categoryOrder = ['planning', 'health-safety', 'activities', 'culture', 'transport', 'connectivity'];

interface TravelGuidesIndexProps {
  guides: Guide[];
}

export default function TravelGuidesIndex({ guides }: TravelGuidesIndexProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: lang === 'nl' ? 'Reisgidsen' : 'Travel Guides', href: '/travel-guides' }
  ];

  // Group guides by category
  const grouped: Record<string, Guide[]> = {};
  guides.forEach(guide => {
    const cat = guide.category || 'other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(guide);
  });

  // Sort categories
  const sortedCategories = categoryOrder.filter(cat => grouped[cat]);

  return (
    <>
      <SEOHead
        title={lang === 'nl' ? 'Thailand Reisgidsen | Go2Thailand' : 'Thailand Travel Guides | Go2Thailand'}
        description={lang === 'nl'
          ? 'Uitgebreide reisgidsen voor Thailand: weer, transport, cultuur, gezondheid, nachtleven en meer.'
          : 'Comprehensive travel guides for Thailand including weather, health, activities, culture, nightlife, and travel tips.'}
      />

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <p className="font-script text-thailand-gold mb-2">
                {lang === 'nl' ? 'Jouw Reis' : 'Your Journey'}
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {lang === 'nl' ? 'Thailand Reisgidsen' : 'Thailand Travel Guides'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {lang === 'nl'
                  ? 'Alles wat je moet weten voor je perfecte Thailand avontuur'
                  : 'Everything you need to know for your perfect Thailand adventure'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom space-y-12">
            {sortedCategories.map(cat => (
              <div key={cat}>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                  {categoryLabels[cat]?.[lang] || cat}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {grouped[cat].map((guide) => (
                    <Link key={guide.slug} href={`/travel-guides/${guide.slug}/`} className="group">
                      <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                        <div className="text-4xl mb-4">{guide.icon}</div>
                        <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-thailand-blue transition-colors">
                          {guide.title[lang]}
                        </h3>
                        <p className="text-gray-600">
                          {guide.description[lang]}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Book Your Trip - Cross-sell Section */}
        <section className="bg-surface-dark py-12">
          <div className="container-custom">
            <p className="font-script text-thailand-gold text-center mb-2">
              {lang === 'nl' ? 'Plan Vooruit' : 'Plan Ahead'}
            </p>
            <h2 className="text-3xl font-bold font-heading text-white text-center mb-3">
              {lang === 'nl' ? 'Boek Je Reis' : 'Book Your Trip'}
            </h2>
            <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">
              {lang === 'nl'
                ? 'Klaar om te gaan? Boek alles wat je nodig hebt voor je Thailand avontuur'
                : 'Ready to go? Book everything you need for your Thailand adventure'}
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a href="https://trip.tpo.lv/TmObooZ5" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">{'\ud83c\udfe8'}</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {lang === 'nl' ? 'Hotels & Resorts' : 'Hotels & Resorts'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {lang === 'nl' ? 'Vind geweldige deals op accommodatie via Trip.com' : 'Find great deals on Thailand accommodation on Trip.com'}
                  </p>
                </div>
              </a>
              <a href="https://12go.tpo.lv/tNA80urD" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">{'\ud83d\ude82'}</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">Transport</h3>
                  <p className="text-gray-600 text-sm">
                    {lang === 'nl' ? 'Boek treinen, bussen, ferry\'s en vluchten via 12Go Asia' : 'Book trains, buses, ferries, and flights via 12Go Asia'}
                  </p>
                </div>
              </a>
              <Link href="/activities/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">{'\ud83c\udf0a'}</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {lang === 'nl' ? 'Activiteiten & Tours' : 'Activities & Tours'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {lang === 'nl' ? 'Ontdek de beste tours, excursies en ervaringen' : 'Discover the best tours, excursions, and experiences'}
                  </p>
                </div>
              </Link>
            </div>
            <p className="text-white/50 text-xs text-center mt-6">
              {lang === 'nl'
                ? 'Sommige links zijn affiliate links. We kunnen een commissie verdienen zonder extra kosten voor jou.'
                : 'Some links are affiliate links. We may earn a commission at no extra cost to you.'}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const guides = getAllTravelGuides();
  return {
    props: { guides },
    revalidate: 86400
  };
};
