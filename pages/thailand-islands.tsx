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
    label: 'Tourism Authority of Thailand: Ko Phangan',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Phangan/358'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Chang',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko%20Chang/467'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Lanta',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Lanta/357'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Samet',
    href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Samet/468'
  },
  {
    label: 'Tourism Authority of Thailand: Tarutao National Park (Ko Lipe)',
    href: 'https://www.tourismthailand.org/Attraction/tarutao-national-park'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Yao Noi',
    href: 'https://www.tourismthailand.org/Attraction/ko-yao-noi'
  },
  {
    label: 'Tourism Authority of Thailand: Ko Mak',
    href: 'https://www.tourismthailand.org/Attraction/ko-mak'
  },
  {
    label: 'Wikipedia: Phi Phi Islands',
    href: 'https://en.wikipedia.org/wiki/Phi_Phi_Islands'
  },
  {
    label: 'Wikipedia: Ko Tao',
    href: 'https://en.wikipedia.org/wiki/Ko_Tao'
  },
  {
    label: 'Wikipedia: Ko Pha-ngan',
    href: 'https://en.wikipedia.org/wiki/Ko_Pha-ngan'
  },
  {
    label: 'Wikipedia: Ko Chang',
    href: 'https://en.wikipedia.org/wiki/Ko_Chang'
  },
  {
    label: 'Wikipedia: Ko Lipe',
    href: 'https://en.wikipedia.org/wiki/Ko_Lipe'
  },
  {
    label: 'Wikipedia: Ko Samet',
    href: 'https://en.wikipedia.org/wiki/Ko_Samet'
  },
  {
    label: 'Wikipedia: Ko Yao district (Phang Nga Bay)',
    href: 'https://en.wikipedia.org/wiki/Ko_Yao_district'
  },
  {
    label: 'Wikipedia: Ko Mak',
    href: 'https://en.wikipedia.org/wiki/Ko_Mak'
  }
];

const FAQ_ITEMS = [
  {
    question: 'What is the difference between the Andaman coast and the Gulf of Thailand?',
    answer: 'The Andaman Sea sits on the western side of the Thai peninsula, sheltered by the Malay Peninsula\'s mountain ridge. Its dry season runs November to April. The Gulf of Thailand wraps around the other side, with a different monsoon pattern — Koh Samui, Koh Phangan, and Koh Tao can be visited through much of the year when the Andaman is wet. The two coasts do not share a season, which matters for planning.'
  },
  {
    question: 'Which islands can be connected on a single Gulf trip?',
    answer: 'Koh Samui, Koh Phangan, and Koh Tao form a natural cluster. Samui to Phangan is a 30–60 minute ferry; Phangan to Tao is roughly the same. The three islands have distinct characters — Samui is the most developed and easiest entry point, Phangan splits between the Full Moon Party scene at Hat Rin and quiet north-coast beaches, Tao is overwhelmingly dive-focused. Koh Chang and Koh Mak in Trat Province form a separate eastern Gulf cluster, further from Bangkok and unconnected to the Samui group.'
  },
  {
    question: 'Is Koh Phi Phi worth visiting given the overtourism concerns?',
    answer: 'The Phi Phi Islands have genuine environmental pressure, and that is worth acknowledging. Maya Bay closed entirely in 2018 after significant coral damage and reopened in January 2022 with a cap of 2,000 visitors per day — a real reduction from the 5,000-plus who visited daily at peak. The dramatic limestone karst geography, the national park status, and the car-free character of Phi Phi Don remain intact. Arriving on a weekday in shoulder season and booking through an operator who confirms Maya Bay entry in advance are the most practical mitigations.'
  },
  {
    question: 'How remote is Koh Lipe, and is it accessible year-round?',
    answer: 'Koh Lipe is within Tarutao National Park in Satun Province, near the Malaysian border. The ferry from Pak Bara Pier takes about 1.5 hours. The island is largely inaccessible during the May–October monsoon when ferry services are reduced or suspended. Most accommodation and restaurants close for several months. This is a genuine planning constraint, not a technicality.'
  },
  {
    question: 'Which Thai island is best for diving beginners?',
    answer: 'Koh Tao is the practical answer. It has the highest concentration of dive schools, the most affordable open-water certification packages, and genuinely calm, clear water for the first few dives. PADI cites it as the location that has certified more divers than anywhere else in Southeast Asia. For more experienced divers seeking the healthiest reef systems, the Similan Islands (Phang Nga Province, Andaman) are a step above — but they require liveaboard trips or advance-booked day excursions from Khao Lak.'
  },
  {
    question: 'Do you need to island-hop to get the most from a Thailand trip?',
    answer: 'No. The default assumption that island-hopping is better value is often wrong. Transfer days consume time, and smaller islands typically have fewer services and more weather risk during crossings. A single island base with one or two day trips — or two carefully chosen islands with the transit factored in — usually delivers a stronger experience than rushing through four or five. The Gulf trio (Samui, Phangan, Tao) makes island-hopping sensible because the ferries are short and frequent. Other combinations require more planning honesty.'
  }
];

const PLANNING_FRAMEWORK = [
  {
    title: 'The two coasts do not share a season',
    body: 'The Andaman Sea (Phi Phi, Lanta, Lipe, Yao Noi) is strongest November to April. The Gulf of Thailand (Samui, Phangan, Tao, Chang, Samet, Mak) runs on a different monsoon clock — often viable when the Andaman is wet. Knowing which coast you are on is the first decision, not the last.'
  },
  {
    title: 'Access is a real variable, not a footnote',
    body: 'Koh Samui has an airport. Koh Tao requires a ferry from either Samui or the mainland. Koh Lipe is a 1.5-hour speedboat from a mainland pier and largely closed in the wet season. Ko Lanta is unusual in being reachable by road via vehicle ferry. These differences change the shape of a trip significantly.'
  },
  {
    title: 'Size and crowd profile are not the same thing',
    body: 'Koh Chang is Thailand\'s third-largest island but far less internationally developed than Koh Samui. Ko Lipe is small but busy during its short high season. Ko Mak is privately owned and deliberately quiet. The crowd level of an island is not determined by its size — it is determined by its infrastructure and its distance from an airport.'
  }
];

const COAST_NOTES = {
  Andaman:
    'The Andaman Sea coast is on Thailand\'s western side, open to the Indian Ocean and protected during its dry season (November–April) by the peninsula\'s central mountain range. It holds the limestone karst formations at Phi Phi and Phang Nga Bay, the remotest national park beaches at Ko Lipe, and the quieter community island of Ko Yao Noi. Most of what the world recognises as "Thailand scenery" — the vertical cliffs, the turquoise bays — is on this coast.',
  Gulf:
    'The Gulf of Thailand coast wraps around the eastern side of the peninsula. The monsoon pattern here is offset from the Andaman: Ko Samui, Ko Phangan, and Ko Tao are often accessible when the western islands are wet. The Gulf\'s defining cluster is the Samui–Phangan–Tao trio, connected by short regular ferries. The eastern Gulf — Ko Chang, Ko Mak — is closer to Bangkok and functions as a separate sub-cluster with lower international tourism density.'
};

function matchesBestFor(item: IslandData, filter: BestForFilter) {
  const tags = item.best_for.map(value => value.toLowerCase());

  switch (filter) {
    case 'diving':
      return tags.some(tag =>
        tag.includes('diving') ||
        tag.includes('snorkel') ||
        tag.includes('coral') ||
        tag.includes('dive')
      );
    case 'families':
      return tags.some(tag =>
        tag.includes('famil') ||
        tag.includes('first-timer') ||
        tag.includes('weekend') ||
        tag.includes('slow travel')
      );
    case 'budget':
      return tags.some(tag =>
        tag.includes('budget') ||
        tag.includes('backpacker') ||
        tag.includes('eco') ||
        tag.includes('short break')
      );
    case 'couples':
      return tags.some(tag =>
        tag.includes('slow') ||
        tag.includes('quiet') ||
        tag.includes('authentic') ||
        tag.includes('remote') ||
        tag.includes('tranquil') ||
        tag.includes('couple') ||
        tag.includes('honeymoon')
      );
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
        title="Thailand Islands | Geography-backed guide to 10 major islands"
        description="Ten Thai island profiles with real geography, access routes, and seasonal facts — sourced from the Tourism Authority of Thailand and Wikipedia. Andaman and Gulf coast both covered."
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
              <p className="font-script text-thailand-gold text-lg mb-3">Island planning guide</p>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
                Thailand Islands: geography, access, and honest season notes
              </h1>
              <p className="text-lg lg:text-2xl opacity-90">
                Thailand has over 1,400 islands across two coasts with separate monsoon patterns. This guide covers ten of the major ones — their real geography, what makes each distinct, how to get there, and which months actually work. Facts are sourced from the Tourism Authority of Thailand and Wikipedia.
              </p>
              <div className="flex flex-wrap gap-3 mt-8 text-sm">
                <span className="bg-white/15 rounded-full px-4 py-2">10 island profiles</span>
                <span className="bg-white/15 rounded-full px-4 py-2">Andaman and Gulf coast</span>
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
                <p className="section-label text-thailand-gold">Island profiles</p>
                <h2 className="text-3xl font-heading font-bold text-gray-900">
                  Ten islands — geography, access, and what sets each apart
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
              Andaman Sea vs Gulf of Thailand — how the two coasts differ
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
            <p className="section-label text-thailand-gold text-center">Related guides</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
              Next decisions after choosing a coast
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/best-beaches-in-thailand/" className="rounded-3xl bg-white p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Best beaches in Thailand</h3>
                <p className="text-sm text-gray-700">Once you have picked a coast and a rough island, use the beach guide to narrow down which beach type matches your trip — white sand, calm bay, surf-accessible, or secluded.</p>
              </Link>
              <Link href="/islands/" className="rounded-3xl bg-white p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Island guides hub</h3>
                <p className="text-sm text-gray-700">Individual island profiles with more detailed practical notes — accommodation areas, ferry piers, and local context for each island in this guide.</p>
              </Link>
              <Link href="/compare/" className="rounded-3xl bg-white p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Island comparisons</h3>
                <p className="text-sm text-gray-700">Head-to-head comparisons for the most common dilemmas: Samui vs Phangan, Phi Phi vs Lanta, Koh Tao vs Similan Islands. Useful once you have narrowed to two candidates.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-thailand-gold text-center">Sources and review</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-6">
              Sources used in this guide
            </h2>
            <div className="rounded-3xl bg-surface-cream p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-5">
                Island area figures, administrative details, and population data are sourced from the Tourism Authority of Thailand destination pages and Wikipedia, both cited individually below. Area, coast, and monsoon season notes are kept at the broad level — ferry timetables, national park permit quotas, and entry fees change faster than an editorial page should claim to track precisely. Verify operational details with the relevant national park authority or ferry operator before travel.
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
