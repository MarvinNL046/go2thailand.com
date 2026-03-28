import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllPracticalInfo } from '../../lib/practical-info';

interface PracticalInfoItem {
  id: number;
  slug: string;
  title: { en: string; nl: string };
  icon: string;
}

interface PracticalInfoPageProps {
  items: PracticalInfoItem[];
}

// Trip-planning phase groupings for editorial organization
const phases = {
  en: [
    {
      phase: 'Before You Go',
      description: 'Paperwork, health prep, and what to pack before leaving home.',
      slugs: ['health-vaccinations', 'packing-list'],
    },
    {
      phase: 'Money & Safety',
      description: 'How to handle cash, ATMs, and avoid common tourist traps.',
      slugs: ['atm-money', 'scams-safety'],
    },
    {
      phase: 'Culture & Etiquette',
      description: 'Understanding Thai customs helps you travel respectfully.',
      slugs: ['etiquette-culture'],
    },
  ],
  nl: [
    {
      phase: 'Voor Vertrek',
      description: 'Documenten, gezondheidsvoorbereiding en wat je moet inpakken.',
      slugs: ['health-vaccinations', 'packing-list'],
    },
    {
      phase: 'Geld & Veiligheid',
      description: 'Hoe om te gaan met contant geld, geldautomaten en veelvoorkomende oplichting.',
      slugs: ['atm-money', 'scams-safety'],
    },
    {
      phase: 'Cultuur & Etiquette',
      description: 'Thaise gewoonten begrijpen helpt je respectvol op reis te gaan.',
      slugs: ['etiquette-culture'],
    },
  ],
};

export default function PracticalInfoIndexPage({ items }: PracticalInfoPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Practical Info', href: '/practical-info/' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": lang === 'nl' ? 'Praktische Reisinformatie Thailand' : 'Thailand Practical Travel Information',
    "description": lang === 'nl'
      ? 'Praktische gidsen voor je reis naar Thailand: visa, geld, gezondheid, veiligheid en culturele etiquette.'
      : 'Practical guides for traveling to Thailand: visas, money, health, safety, and cultural etiquette.',
    "url": "https://go2-thailand.com/practical-info/",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `https://go2-thailand.com${crumb.href}`
      }))
    }
  };

  const itemsBySlug = Object.fromEntries(items.map(item => [item.slug, item]));
  const currentPhases = phases[lang];

  return (
    <>
      <SEOHead
        title={lang === 'nl'
          ? 'Praktische Informatie Thailand 2026 | Go2Thailand'
          : 'Thailand Practical Travel Information 2026 | Go2Thailand'}
        description={lang === 'nl'
          ? 'Gidsen voor je Thailand reis: geld en geldautomaten, gezondheid en vaccinaties, veiligheid, etiquette en paklijst.'
          : 'Practical guides for Thailand travel: money and ATMs, health and vaccinations, safety, etiquette, and packing list.'}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <span className="font-script text-thailand-gold text-lg">
                {lang === 'nl' ? 'Reisinformatie' : 'Travel Information'}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-2">
                {lang === 'nl' ? 'Praktische Informatie' : 'Practical Travel Info'}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                {lang === 'nl'
                  ? 'Alles wat je moet weten voor je reis naar Thailand'
                  : 'Everything you need to know before visiting Thailand'}
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Editorial Intro */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {lang === 'nl' ? (
              <>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Planning je reis naar Thailand</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Thailand ontvangt jaarlijks meer dan 30 miljoen bezoekers. De meeste reizen verloopt probleemloos,
                  maar een goede voorbereiding maakt het verschil. Deze gidsen zijn gebaseerd op officiële Thaise overheidsbronnen,
                  de Tourism Authority of Thailand (TAT) en ambassade-informatie — geen gesponsorde adviezen.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Gebruik de fases hieronder als leidraad: wat te regelen voor vertrek, hoe je geld beheert ter plaatse,
                  en hoe je respectvol met de Thaise cultuur omgaat.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Planning your trip to Thailand</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Thailand welcomes over 30 million visitors each year. Most trips go smoothly, but solid preparation
                  makes a real difference. These guides draw from official Thai government sources, the Tourism Authority
                  of Thailand (TAT), and embassy information — not sponsored advice.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Use the phases below as a framework: what to arrange before departure, how to manage money on the ground,
                  and how to engage respectfully with Thai culture.
                </p>
              </>
            )}
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
              <span>
                {lang === 'nl' ? 'Bronnen: ' : 'Sources: '}
                <a
                  href="https://www.immigration.go.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-thailand-blue hover:underline"
                >
                  Thai Immigration Bureau
                </a>
                {' · '}
                <a
                  href="https://www.tourismthailand.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-thailand-blue hover:underline"
                >
                  TAT
                </a>
                {' · '}
                <a
                  href="https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Thailand.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-thailand-blue hover:underline"
                >
                  US State Department Thailand
                </a>
              </span>
            </div>
          </div>
        </section>

        {/* Phase-based Content Sections */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {currentPhases.map((phase) => {
              const phaseItems = phase.slugs
                .map(slug => itemsBySlug[slug])
                .filter(Boolean);

              if (phaseItems.length === 0) return null;

              return (
                <div key={phase.phase}>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold font-heading text-gray-900">{phase.phase}</h2>
                    <p className="text-gray-600 mt-1">{phase.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {phaseItems.map(item => (
                      <Link
                        key={item.id}
                        href={`/practical-info/${item.slug}/`}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-8 group text-center"
                      >
                        <div className="text-5xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors">
                          {item.title[lang]}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Any items not in a phase group */}
            {(() => {
              const assignedSlugs = currentPhases.flatMap(p => p.slugs);
              const unassigned = items.filter(item => !assignedSlugs.includes(item.slug));
              if (unassigned.length === 0) return null;
              return (
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    {lang === 'nl' ? 'Overige Gidsen' : 'More Guides'}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unassigned.map(item => (
                      <Link
                        key={item.id}
                        href={`/practical-info/${item.slug}/`}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-8 group text-center"
                      >
                        <div className="text-5xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors">
                          {item.title[lang]}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Cross-links to related sections */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2 text-center">
              {lang === 'nl' ? 'Meer Reisinformatie' : 'More Travel Resources'}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {lang === 'nl'
                ? 'Andere onderdelen van je reisplanning'
                : 'Other parts of your trip planning'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/visa/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                {lang === 'nl' ? 'Visum Gids' : 'Visa Guide'}
              </Link>
              <Link href="/weather/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                {lang === 'nl' ? 'Weer & Klimaat' : 'Weather & Climate'}
              </Link>
              <Link href="/transport/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                {lang === 'nl' ? 'Transport' : 'Getting Around'}
              </Link>
              <Link href="/esim/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                {lang === 'nl' ? 'Verbinding & SIM' : 'SIM & Connectivity'}
              </Link>
              <Link href="/travel-insurance-thailand/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                {lang === 'nl' ? 'Reisverzekering' : 'Travel Insurance'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const items = getAllPracticalInfo();
  return {
    props: { items }
  };
};
