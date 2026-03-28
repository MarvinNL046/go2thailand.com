import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';

interface IslandData {
  rank: number;
  name: string;
  province: string;
  best_for: string[];
  best_time: string;
  how_to_get_there: string;
  description: string;
  key_facts: string[];
  coast: 'Andaman' | 'Gulf';
  google_maps_query: string;
}

interface PageData {
  title: string;
  meta_description: string;
  intro: string;
  items: IslandData[];
  tips: string[];
  generated_at: string;
}

interface ThailandIslandsProps {
  data: PageData;
}

type CoastFilter = 'all' | 'Andaman' | 'Gulf';
type BestForFilter = 'all' | 'diving' | 'families' | 'budget' | 'couples';

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

const FAQ_ITEMS = [
  {
    question: 'Do you need to island-hop in Thailand to have a good trip?',
    answer: 'No. Many travelers are better off choosing one island base and adding a day trip or two. Island-hopping only pays off if you want contrast and are comfortable spending part of the trip on transfer days.'
  },
  {
    question: 'How should you choose between the Andaman coast and the Gulf?',
    answer: 'Use the Andaman coast for dramatic scenery, famous bays, and routes built around Phuket or Krabi. Use the Gulf for Samui, Phangan, and Tao when you want a linked trio with different moods and a season pattern that can work better outside the Andaman sweet spot.'
  },
  {
    question: 'Which islands are the easiest for first-time visitors?',
    answer: 'Phuket and Koh Samui are the easiest starting points because they function well as full-service bases. They are not the quietest islands, but they reduce logistics risk for a first Thailand trip.'
  }
];

const PLANNING_FRAMEWORK = [
  {
    title: 'Pick the trip style first',
    body: 'Choose between a single island base, a two-island contrast, or a faster island-hop. Most weak itineraries start by collecting famous names instead of matching islands to pace and priorities.'
  },
  {
    title: 'Use access as a filter, not an afterthought',
    body: 'Phuket and Koh Samui absorb mistakes better because they are straightforward arrivals. Smaller islands can be better experiences, but only if you actively want the extra transfer steps.'
  },
  {
    title: 'Keep season notes durable',
    body: 'This guide uses broad coast patterns and avoids brittle route promises. Exact ferries, marine conditions, and park access can change faster than an editorial page should pretend otherwise.'
  }
];

const COAST_NOTES = {
  Andaman:
    'The Andaman side is strongest for classic scenery and headline beach imagery. It is where Phuket, Phi Phi, Lanta, Yao Noi, and Lipe start making sense as a cluster rather than one-off picks.',
  Gulf:
    'The Gulf gives you a more coherent set of linked identities: Samui for convenience, Phangan for range, Tao for diving, and the eastern islands for slower beach time.'
};

function matchesBestFor(item: IslandData, filter: BestForFilter) {
  const tags = item.best_for.map(value => value.toLowerCase());

  switch (filter) {
    case 'diving':
      return tags.some(tag => ['diving', 'budget diving', 'snorkeling', 'pristine waters'].includes(tag));
    case 'families':
      return tags.some(tag => ['families', 'first-timers'].includes(tag));
    case 'budget':
      return tags.some(tag => ['budget', 'budget diving', 'backpackers', 'camping'].includes(tag));
    case 'couples':
      return tags.some(tag => ['couples', 'honeymooners', 'relaxation', 'tranquility', 'luxury'].includes(tag));
    default:
      return true;
  }
}

function internalIslandHref(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return `/islands/${slug}/`;
}

export default function ThailandIslands({ data }: ThailandIslandsProps) {
  const [coastFilter, setCoastFilter] = useState<CoastFilter>('all');
  const [bestForFilter, setBestForFilter] = useState<BestForFilter>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Islands', href: '/thailand-islands/' }
  ];

  const filteredIslands = data.items.filter(item => {
    const coastMatch = coastFilter === 'all' || item.coast === coastFilter;
    const bestForMatch = matchesBestFor(item, bestForFilter);
    return coastMatch && bestForMatch;
  });

  const coastFilters: Array<{ key: CoastFilter; label: string }> = [
    { key: 'all', label: 'All islands' },
    { key: 'Andaman', label: 'Andaman coast' },
    { key: 'Gulf', label: 'Gulf coast' }
  ];

  const bestForFilters: Array<{ key: BestForFilter; label: string }> = [
    { key: 'all', label: 'All trip types' },
    { key: 'diving', label: 'Diving and snorkeling' },
    { key: 'families', label: 'Families and first trips' },
    { key: 'budget', label: 'Budget-led trips' },
    { key: 'couples', label: 'Couples and slower trips' }
  ];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.title,
    numberOfItems: data.items.length,
    itemListElement: data.items.map(item => ({
      '@type': 'ListItem',
      position: item.rank,
      name: item.name,
      url: `https://go2-thailand.com${internalIslandHref(item.name)}`
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://go2-thailand.com${item.href}`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const combinedSchema = [itemListSchema, breadcrumbSchema, faqSchema];

  return (
    <>
      <SEOHead
        title="Thailand Islands | Editorial guide to choosing the right island"
        description="A planning-first guide to Thailand islands, with coast logic, shortlist filtering, and visible official source signals."
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="bg-surface-dark text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl">
              <p className="font-script text-thailand-gold text-lg mb-3">Editorial island pillar</p>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
                Choose the island before you choose the itinerary
              </h1>
              <p className="text-lg lg:text-2xl opacity-90">
                This page is built to narrow decisions, not inflate a ranking. Use it to decide whether your trip belongs on the Andaman coast, the Gulf, or one of the slower eastern islands before you commit to transfers.
              </p>
              <div className="flex flex-wrap gap-3 mt-8 text-sm">
                <span className="bg-white/15 rounded-full px-4 py-2">12 island profiles</span>
                <span className="bg-white/15 rounded-full px-4 py-2">Planning-led filters</span>
                <span className="bg-white/15 rounded-full px-4 py-2">Reviewed March 28, 2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-5">
            <p className="text-lg text-gray-700 leading-relaxed">{data.intro}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {PLANNING_FRAMEWORK.map(item => (
                <div key={item.title} className="rounded-2xl bg-surface-cream p-5">
                  <h2 className="text-lg font-heading font-bold text-gray-900 mb-2">{item.title}</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-b sticky top-0 z-30 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
            <div className="flex flex-wrap gap-3">
              {coastFilters.map(item => (
                <button
                  key={item.key}
                  onClick={() => setCoastFilter(item.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    coastFilter === item.key
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {bestForFilters.map(item => (
                <button
                  key={item.key}
                  onClick={() => setBestForFilter(item.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    bestForFilter === item.key
                      ? 'bg-thailand-gold text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="section-label text-thailand-gold">Island shortlist</p>
                <h2 className="text-3xl font-heading font-bold text-gray-900">
                  Which island shape matches your trip?
                </h2>
              </div>
              <Link href="/islands/" className="text-sm font-semibold text-thailand-blue hover:underline">
                Browse the individual island guides
              </Link>
            </div>

            <div className="space-y-6">
              {filteredIslands.map(item => (
                <article key={item.rank} className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-thailand-blue text-white font-bold">
                          {item.rank}
                        </span>
                        <div>
                          <h3 className="text-2xl font-heading font-bold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.province} · {item.coast === 'Andaman' ? 'Andaman coast' : 'Gulf coast'}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.best_for.map(tag => (
                          <span key={tag} className="rounded-full bg-thailand-blue/10 px-3 py-1 text-xs font-medium text-thailand-blue">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="rounded-2xl bg-surface-cream p-4">
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">Why it makes the list:</span> {item.key_facts.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:w-72 text-sm">
                      <div className="rounded-2xl bg-surface-cream p-4">
                        <div className="text-gray-500 mb-1">Best broad season</div>
                        <div className="font-semibold text-gray-900">{item.best_time}</div>
                      </div>
                      <div className="rounded-2xl bg-surface-cream p-4">
                        <div className="text-gray-500 mb-1">Arrival logic</div>
                        <div className="font-semibold text-gray-900">{item.how_to_get_there}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={internalIslandHref(item.name)}
                      className="inline-flex items-center rounded-full bg-thailand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-thailand-red transition-colors"
                    >
                      Open the {item.name} guide
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.google_maps_query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-surface-cream px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      View map context
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">Coast planning</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
              Choose the coast that matches your trip logic
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {(['Andaman', 'Gulf'] as const).map(coast => (
                <div key={coast} className="rounded-3xl bg-surface-cream p-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                    {coast === 'Andaman' ? 'Andaman coast' : 'Gulf coast'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{COAST_NOTES[coast]}</p>
                  <ul className="space-y-3">
                    {data.items
                      .filter(item => item.coast === coast)
                      .slice(0, 5)
                      .map(item => (
                        <li key={item.name} className="rounded-2xl bg-white px-4 py-3 flex items-center justify-between">
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <Link href={internalIslandHref(item.name)} className="text-sm text-thailand-blue hover:underline">
                            Read guide
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-surface-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">Related routes</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
              Stronger internal routes for the next decision
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/best-beaches-in-thailand/" className="rounded-3xl bg-white p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Best beaches in Thailand</h3>
                <p className="text-sm text-gray-700">Use the beach pillar when you already know the trip is beach-led and need the shortlist narrowed by vibe and coast.</p>
              </Link>
              <Link href="/islands/" className="rounded-3xl bg-white p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Islands discovery hub</h3>
                <p className="text-sm text-gray-700">Browse every island profile as a discovery layer rather than a ranking page.</p>
              </Link>
              <Link href="/compare/" className="rounded-3xl bg-white p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Island comparisons</h3>
                <p className="text-sm text-gray-700">Useful once you are deciding between two realistic candidates instead of browsing loosely.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">Sources and review</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-6">
              Official sources behind the planning notes
            </h2>
            <div className="rounded-3xl bg-surface-cream p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-5">
                This page was reviewed on March 28, 2026 against official Tourism Authority of Thailand destination pages for the main island anchors in this cluster. Access and seasonal wording is kept broad where exact operating details are unstable.
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

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">FAQ</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map(item => (
                <details key={item.question} className="rounded-2xl bg-surface-cream p-5">
                  <summary className="cursor-pointer list-none font-semibold text-gray-900">{item.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const fs = require('fs');
  const path = require('path');
  const lang = locale || 'en';
  const localePath = path.join(process.cwd(), 'data', `islands.${lang}.json`);
  const defaultPath = path.join(process.cwd(), 'data', 'islands.json');
  const dataPath = lang !== 'en' && fs.existsSync(localePath) ? localePath : defaultPath;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  return {
    props: { data },
    revalidate: 86400
  };
};
