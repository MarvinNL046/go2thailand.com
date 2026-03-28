import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
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
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Islands', href: '/islands/' }
  ];

  const regions = ['all', 'Gulf of Thailand', 'Andaman Sea'];
  const filteredIslands =
    selectedRegion === 'all'
      ? islands
      : islands.filter(island => island.region === selectedRegion);

  const featuredRoutes = [
    {
      href: '/thailand-islands/',
      title: 'Thailand islands pillar',
      body: 'Use the planning-first pillar if you are still deciding which island style fits the trip.'
    },
    {
      href: '/best-beaches-in-thailand/',
      title: 'Best beaches in Thailand',
      body: 'Switch to the beach pillar when the decision is about shoreline style, not island logistics.'
    },
    {
      href: '/compare/',
      title: 'Island comparison pages',
      body: 'Best used after you have a shortlist of two realistic island candidates.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Thailand Islands Discovery Hub',
    description: 'Editorial discovery hub for Thailand island guides.',
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
        title="Thailand Islands Discovery Hub | Go2Thailand"
        description="Editorial discovery hub for Thailand islands, built around internal navigation, coast logic, and source-backed planning notes."
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
              <p className="font-script text-thailand-gold mb-3">Editorial discovery hub</p>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">Thailand islands</h1>
              <p className="text-lg lg:text-2xl opacity-90">
                Browse the island guides as a discovery layer, not a funnel. Use the coast filter, the comparison table, and the linked pillar pages to move from broad interest to a defensible shortlist.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-surface-cream p-5">
              <h2 className="text-lg font-heading font-bold text-gray-900 mb-2">Start with coast</h2>
              <p className="text-sm text-gray-700">The Andaman side is stronger for classic scenery and famous bays. The Gulf side is easier to shape around Samui, Phangan, and Tao as one coherent trip idea.</p>
            </div>
            <div className="rounded-2xl bg-surface-cream p-5">
              <h2 className="text-lg font-heading font-bold text-gray-900 mb-2">Then pick pace</h2>
              <p className="text-sm text-gray-700">Ask whether you want one island base, a pair with contrast, or a faster hop. That answer usually matters more than the raw ranking of an island.</p>
            </div>
            <div className="rounded-2xl bg-surface-cream p-5">
              <h2 className="text-lg font-heading font-bold text-gray-900 mb-2">Use the deeper routes</h2>
              <p className="text-sm text-gray-700">Every card here should lead you deeper into a guide, a pillar page, or a comparison page. That is the point of this hub.</p>
            </div>
          </div>
        </section>

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
                  {region === 'all' ? 'All islands' : region}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="section-label font-script text-thailand-gold">Browse guides</p>
              <h2 className="text-3xl font-heading font-bold text-gray-900">
                {selectedRegion === 'all'
                  ? `All island guides (${filteredIslands.length})`
                  : `${selectedRegion} guides (${filteredIslands.length})`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIslands.map(island => (
                <IslandCard key={island.id} island={island} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label font-script text-thailand-gold text-center">Compare quickly</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">Quick island comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-thailand-blue text-white">
                    <th className="px-4 py-3 text-left rounded-tl-xl">Island</th>
                    <th className="px-4 py-3 text-left">Region</th>
                    <th className="px-4 py-3 text-left">Highlights</th>
                    <th className="px-4 py-3 text-left rounded-tr-xl">Guide</th>
                  </tr>
                </thead>
                <tbody>
                  {islands.map((island, index) => (
                    <tr key={island.id} className={index % 2 === 0 ? 'bg-surface-cream' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-gray-900">{island.name.en}</td>
                      <td className="px-4 py-3 text-gray-700">{island.region}</td>
                      <td className="px-4 py-3 text-gray-700">{island.highlights.slice(0, 2).join(', ')}</td>
                      <td className="px-4 py-3">
                        <Link href={`/islands/${island.slug}/`} className="text-thailand-blue hover:underline">
                          Open guide
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 bg-surface-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label font-script text-thailand-gold text-center">Internal routes</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">Use the stronger cluster pages next</h2>
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

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label font-script text-thailand-gold text-center">Sources and review</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-6">Visible trust signals</h2>
            <div className="rounded-3xl bg-surface-cream p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-5">
                This hub was reviewed on March 28, 2026 against official TAT destination pages for the main islands in this cluster. The goal here is editorial navigation, so claims stay broad unless they are durable enough to keep.
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
    revalidate: 86400
  };
};
