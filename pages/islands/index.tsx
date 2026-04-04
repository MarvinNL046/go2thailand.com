import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import IslandCard from '../../components/IslandCard';
import { getAllIslands } from '../../lib/islands';

interface Island {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  highlights: string[];
}

interface IslandsPageProps {
  islands: Island[];
}

const SOURCE_LINKS = [
  {
    label: 'Tourism Authority of Thailand: Ko Samui',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Samui/360'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Phi Phi',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Phi-Phi/359'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Tao',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/ko-tao/361'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Chang',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko%20Chang/467'
  },
  {
    label: 'Tourism Authority of Thailand: Phuket province',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350'
  }
];

export default function IslandsPage({ islands }: IslandsPageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Eilanden' : 'Islands', href: '/islands/' }
  ];

  const regions = ['all', 'Gulf of Thailand', 'Andaman Sea'];
  const filteredIslands =
    selectedRegion === 'all'
      ? islands
      : islands.filter(island => island.region === selectedRegion);

  const featuredRoutes = [
    {
      href: '/thailand-islands/',
      title: isNl ? 'Thailand eilanden — planningsgids' : 'Thailand islands — planning guide',
      body: isNl ? 'Behandelt hoe je kiest tussen kusten, hoeveel eilanden je in een reis opneemt, en welke combinaties logistiek werken.' : 'Covers how to choose between coasts, how many islands to include in a trip, and which combinations work logistically.'
    },
    {
      href: '/best-beaches-in-thailand/',
      title: isNl ? 'Beste stranden in Thailand' : 'Best beaches in Thailand',
      body: isNl ? 'Georganiseerd op strandkarakter in plaats van eilandnaam — handig als je weet wat voor soort strand je wilt maar nog niet welk eiland.' : 'Organised by beach character rather than island name — useful when you know the kind of shore you want but not which island to anchor on.'
    },
    {
      href: '/compare/',
      title: isNl ? 'Eiland vs eiland vergelijkingen' : 'Island vs island comparisons',
      body: isNl ? 'Zij-aan-zij vergelijkingen van specifieke eilandparen. Het nuttigst als je een shortlist van twee realistische kandidaten hebt.' : 'Side-by-side breakdowns of specific island pairs. Most useful once you have a shortlist of two realistic candidates.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Thailand Islands Guide',
    description: 'Editorial guides to Thailand\'s main islands, organised by coast and trip type.',
    url: 'https://go2-thailand.com/islands/',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `https://go2-thailand.com${crumb.href}`
      }))
    }
  };

  return (
    <>
      <SEOHead
        title={isNl
          ? 'Thailand Eilanden Gids — Andamanzee en Golf van Thailand'
          : 'Thailand Islands Guide — Andaman Sea and Gulf of Thailand'}
        description={isNl
          ? 'Redactionele gidsen voor de belangrijkste eilanden van Thailand. Begrijp het verschil tussen de Andamanzee en de Golfkust, en gebruik de eilandkaarten om je shortlist te bepalen.'
          : "Editorial guides to Thailand's main islands. Understand the difference between the Andaman Sea and Gulf coasts, then use the island cards to narrow your shortlist."}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="bg-surface-dark text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl">
              <p className="font-script text-thailand-gold mb-3">{isNl ? 'Eilandgidsen' : 'Island guides'}</p>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">{isNl ? 'Thailand Eilanden' : 'Thailand islands'}</h1>
              <p className="text-lg lg:text-2xl opacity-90">
                {isNl
                  ? 'Thailand heeft twee verschillende eilandkusten met verschillende karakters, seizoenen en praktische logistiek. De juiste kust kiezen komt voor het kiezen van het juiste eiland.'
                  : 'Thailand has two distinct island coasts with different characters, seasons, and practical logistics. Choosing the right coast comes before choosing the right island.'}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Andaman vs Gulf editorial framing */}
        <section className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="section-label font-script text-thailand-gold mb-2">{isNl ? 'Andamanzee vs Golf van Thailand' : 'Andaman Sea vs Gulf of Thailand'}</p>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">{isNl ? 'Hoe de twee kusten verschillen' : 'How the two coasts differ'}</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl bg-surface-cream p-5">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{isNl ? 'Andamanzee — westkust' : 'Andaman Sea — west coast'}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Phuket, Krabi, Koh Phi Phi, Koh Lanta, and the Similan Islands sit on the Andaman side. This coast is known for dramatic limestone karst scenery, clear water from November to April, and strong diving from Khao Lak to the outer islands.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The southwest monsoon closes large parts of the Andaman coast from May to October. High season is December to March. If scenery and diving are the priority, this is the stronger coast.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-cream p-5">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{isNl ? 'Golf van Thailand — oostkust' : 'Gulf of Thailand — east coast'}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Koh Samui, Koh Phangan, Koh Tao, and Koh Chang sit in the Gulf. The seasons here are offset from the Andaman — the Gulf is often workable when the west coast is closed, though Samui has its own rainy window in November.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The Samui–Phangan–Tao chain is the most coherent Gulf itinerary: three islands with distinct personalities within easy ferry distance of each other. Koh Tao in particular is one of the world&apos;s most accessible dive training destinations.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-gray-900">{isNl ? 'Praktische opmerking:' : 'Practical note:'}</strong> {isNl
                  ? 'De meeste bezoekers bezoeken slechts een kust per reis — de logistiek om van Andaman naar de Golf te reizen kost een volle reisdag. Bepaal eerst welke kust bij je reisperiode past, en beperk dan tot specifieke eilanden.'
                  : 'Most visitors only visit one coast per trip — the logistics of crossing from Andaman to Gulf add a full travel day. Decide which coast suits your travel window first, then narrow to specific islands.'}
              </p>
            </div>
          </div>
        </section>

        {/* Coast filter */}
        <section className="bg-white border-b sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedRegion === region
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {region === 'all' ? (isNl ? 'Alle eilanden' : 'All islands') : region}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Island cards */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold text-gray-900">
                {selectedRegion === 'all'
                  ? (isNl ? `Eilandgidsen (${filteredIslands.length})` : `Island guides (${filteredIslands.length})`)
                  : (isNl ? `${selectedRegion} gidsen (${filteredIslands.length})` : `${selectedRegion} guides (${filteredIslands.length})`)}
              </h2>
              {selectedRegion !== 'all' && (
                <p className="text-gray-600 mt-2 text-sm">
                  {selectedRegion === 'Andaman Sea'
                    ? (isNl ? 'Best te bezoeken van november tot april. Duikseizoen piekt van december tot maart rond de Similan Eilanden.' : 'Best visited November to April. Diving season peaks December to March around the Similan Islands.')
                    : (isNl ? 'Golfse seizoenen variëren — Samui en Phangan pieken december tot september; Koh Tao is het grootste deel van het jaar te beduiken.' : 'Gulf seasons vary — Samui and Phangan peak December to September; Koh Tao is diveable most of the year.')}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIslands.map(island => (
                <IslandCard key={island.id} island={island} />
              ))}
            </div>
          </div>
        </section>

        {/* Quick comparison table */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label font-script text-thailand-gold text-center">{isNl ? 'Snelle referentie' : 'Quick reference'}</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-3">{isNl ? 'Eilandvergelijking in een oogopslag' : 'Island comparison at a glance'}</h2>
            <p className="text-gray-600 text-center text-sm mb-8 max-w-xl mx-auto">
              {isNl ? 'Slechts een startpunt — gebruik de individuele eilandgidsen voor alles waar je daadwerkelijk naar zou handelen.' : 'A starting point only — use the individual island guides for anything you might actually act on.'}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-thailand-blue text-white">
                    <th className="px-4 py-3 text-left rounded-tl-xl">{isNl ? 'Eiland' : 'Island'}</th>
                    <th className="px-4 py-3 text-left">{isNl ? 'Kust' : 'Coast'}</th>
                    <th className="px-4 py-3 text-left">{isNl ? 'Bekend om' : 'Known for'}</th>
                    <th className="px-4 py-3 text-left rounded-tr-xl">{isNl ? 'Gids' : 'Guide'}</th>
                  </tr>
                </thead>
                <tbody>
                  {islands.map((island, index) => (
                    <tr key={island.id} className={index % 2 === 0 ? 'bg-surface-cream' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-gray-900">{island.name[lang] || island.name.en}</td>
                      <td className="px-4 py-3 text-gray-700">{island.region}</td>
                      <td className="px-4 py-3 text-gray-700">{island.highlights.slice(0, 2).join(', ')}</td>
                      <td className="px-4 py-3">
                        <Link href={`/islands/${island.slug}/`} className="text-thailand-blue hover:underline">
                          {isNl ? 'Lees gids' : 'Read guide'}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stronger internal routes */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label font-script text-thailand-gold text-center">{isNl ? 'Verder plannen' : 'Continue planning'}</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">{isNl ? 'Gerelateerde gidsen' : 'Related guides'}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredRoutes.map(route => (
                <Link key={route.href} href={route.href} className="rounded-3xl bg-white p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{route.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{route.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Source attribution */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label font-script text-thailand-gold text-center">{isNl ? 'Bronnen' : 'Sources'}</p>
            <h2 className="text-2xl font-heading font-bold text-gray-900 text-center mb-6">{isNl ? 'Redactionele opmerkingen en bronnen' : 'Editorial notes and sources'}</h2>
            <div className="rounded-3xl bg-surface-cream p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-5">
                {isNl
                  ? 'Eilandgegevens zijn gecontroleerd aan de hand van officiële bestemmingspagina\'s van de Tourism Authority of Thailand in maart 2026. Seizoensvensters en vervoersinformatie zijn bewust breed gehouden — exacte veerbootschema\'s en parkopeningsdata veranderen per seizoen en moeten dichter bij de reis worden bevestigd.'
                  : 'Island data was reviewed against official Tourism Authority of Thailand destination pages in March 2026. Season windows and transport information are intentionally broad — exact ferry schedules and park opening dates change seasonally and should be confirmed closer to travel.'}
              </p>
              <ul className="space-y-3">
                {SOURCE_LINKS.map(source => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const islands = getAllIslands();

  return {
    props: {
      islands
    },
    revalidate: 604800
  };
};
