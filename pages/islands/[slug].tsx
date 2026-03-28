import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import pathModule from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllIslands, getIslandBySlug, getRelatedIslands, generateIslandBreadcrumbs } from '../../lib/islands';
import { getComparisonsForItem, getComparisonPair } from '../../lib/comparisons';

interface Beach {
  name: string;
  description: { en: string; nl: string };
  best_for: string[];
}

interface Activity {
  name: string;
  type: string;
  description: { en: string; nl: string };
  price_range: string;
}

interface TransportOption {
  method: string;
  duration: string;
  price: string;
  description: { en: string; nl: string };
}

interface AccommodationArea {
  name: string;
  description: { en: string; nl: string };
  price_range: string;
}

interface Island {
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  description: { en: string; nl: string };
  beaches: Beach[];
  activities: Activity[];
  getting_there: {
    from_bangkok: {
      options: TransportOption[];
    };
  };
  accommodation_tips: {
    areas: AccommodationArea[];
  };
  budget_info: {
    daily_budget: { budget: string; mid: string; luxury: string };
    currency_tips: { en: string; nl: string };
  };
  best_time_to_visit: {
    high_season: string;
    shoulder: string;
    low_season: string;
    avoid: string;
    description: { en: string; nl: string };
  };
  highlights: string[];
  tags: string[];
  seo: {
    metaTitle: { en: string; nl: string };
    metaDescription: { en: string; nl: string };
  };
}

interface RelatedIsland {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  image: string;
  highlights: string[];
}

interface ComparisonLink {
  slug: string;
  otherName: { en: string; nl: string };
  otherSlug: string;
}

interface IslandPageProps {
  island: Island;
  relatedIslands: RelatedIsland[];
  comparisons: ComparisonLink[];
  relevantRoutes: Array<{ slug: string; from: string; to: string }>;
}

type Lang = 'en' | 'nl';

const GENERIC_SOURCE_LINKS = [
  {
    label: 'Tourism Authority of Thailand destination portal',
    href: 'https://www.tourismthailand.org/Destinations'
  },
  {
    label: 'Tourism Authority of Thailand beach roundup',
    href: 'https://tourismproduct.tourismthailand.org/en/2023/01/27/20-crystal-clear-water-and-beaches-of-thailand/'
  }
];

const SOURCE_MAP: Record<string, Array<{ label: string; href: string }>> = {
  'koh-samui': [
    {
      label: 'Tourism Authority of Thailand: Ko Samui',
      href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Samui/360'
    }
  ],
  'koh-phi-phi': [
    {
      label: 'Tourism Authority of Thailand: Ko Phi Phi',
      href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Phi-Phi/359'
    }
  ],
  'koh-tao': [
    {
      label: 'Tourism Authority of Thailand: Ko Tao',
      href: 'https://www.tourismthailand.org/Destinations/Provinces/ko-tao/361'
    }
  ],
  'koh-chang': [
    {
      label: 'Tourism Authority of Thailand: Ko Chang',
      href: 'https://www.tourismthailand.org/Destinations/Provinces/Ko%20Chang/467'
    }
  ],
  phuket: [
    {
      label: 'Tourism Authority of Thailand: Phuket province',
      href: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350'
    }
  ]
};

function getSourceLinks(slug: string) {
  return [...(SOURCE_MAP[slug] || []), ...GENERIC_SOURCE_LINKS];
}

function getPlanningSummary(island: Island, lang: Lang) {
  const isGulf = island.region === 'Gulf of Thailand';

  if (lang === 'nl') {
    return isGulf
      ? `${island.name.en} is vooral logisch als je een Golf-reis bouwt rond een vaste uitvalsbasis, duikdagen of korte verbindingen naar naburige eilanden.`
      : `${island.name.en} werkt het best als onderdeel van een Andaman-reis waarin landschap, stranddagen en bootverbindingen tussen grote namen centraal staan.`;
  }

  return isGulf
    ? `${island.name.en} makes the most sense when you want a Gulf base with room for diving days, slower beach time, or links to neighboring islands.`
    : `${island.name.en} works best when your trip is Andaman-led and built around scenery, beach time, and boat-linked island choices.`;
}

function getWhyGoText(island: Island, lang: Lang) {
  if (lang === 'nl') {
    return `${island.name.en} valt vooral op door ${island.highlights.slice(0, 3).join(', ')}. Gebruik deze pagina om te bepalen of het eiland als hoofdbasis werkt, niet alleen als losse dagtrip of fotostop.`;
  }

  return `${island.name.en} stands out for ${island.highlights.slice(0, 3).join(', ')}. Use this page to decide whether it works as a real base, not just a name on a day-trip list.`;
}

export default function IslandPage({ island, relatedIslands, comparisons, relevantRoutes }: IslandPageProps) {
  const { locale } = useRouter();
  const lang: Lang = locale === 'nl' ? 'nl' : 'en';
  const breadcrumbs = generateIslandBreadcrumbs(island);
  const sourceLinks = getSourceLinks(island.slug);

  const faqs = [
    {
      question: lang === 'nl' ? `Wanneer plan je ${island.name.en} het best in?` : `When does ${island.name.en} fit best in an itinerary?`,
      answer:
        lang === 'nl'
          ? `${island.name.en} past het best in reizen die mikken op ${island.best_time_to_visit.high_season} als veiligste hoogseizoenvenster. ${island.best_time_to_visit.description.nl}`
          : `${island.name.en} fits best in trips targeting ${island.best_time_to_visit.high_season} as the safest broad high-season window. ${island.best_time_to_visit.description.en}`
    },
    {
      question: lang === 'nl' ? `Is ${island.name.en} geschikt als vaste uitvalsbasis?` : `Is ${island.name.en} a good base island?`,
      answer:
        lang === 'nl'
          ? `${getPlanningSummary(island, 'nl')} Kijk vooral naar je tempo, het aantal gewenste stranddagen en hoeveel transfers je wilt accepteren.`
          : `${getPlanningSummary(island, 'en')} Focus on pace, how many beach days you want, and how much transfer time you are willing to absorb.`
    },
    {
      question: lang === 'nl' ? `Waar begin je met kiezen op ${island.name.en}?` : `Where should you start when choosing ${island.name.en}?`,
      answer:
        lang === 'nl'
          ? `Begin met de stranden, slaapgebieden en aankomstlogica. Dat trio bepaalt sneller of ${island.name.en} bij je reis past dan een losse top-10 lijst met activiteiten.`
          : `Start with beaches, stay areas, and arrival logic. That trio tells you faster whether ${island.name.en} fits your trip than a generic activity ranking does.`
    }
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: island.name.en,
    description: island.description.en,
    url: `https://go2-thailand.com/islands/${island.slug}/`,
    image: `https://go2-thailand.com${island.image}`,
    touristType: island.tags,
    containedInPlace: {
      '@type': 'Country',
      name: 'Thailand'
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://go2-thailand.com${crumb.href}`
    }))
  };

  return (
    <>
      <SEOHead
        title={island.seo.metaTitle[lang]}
        description={island.seo.metaDescription[lang]}
        ogImage={`https://go2-thailand.com${island.image}`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="relative h-[420px] lg:h-[520px]">
          <Image
            src={island.image}
            alt={`${island.name.en}, Thailand`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">{island.region}</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">{island.province}</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Reviewed March 28, 2026</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-4">{island.name[lang]}</h1>
              <p className="text-lg lg:text-xl max-w-3xl opacity-90">{island.description[lang]}</p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-surface-cream p-5">
              <h2 className="text-lg font-heading font-bold text-gray-900 mb-2">
                {lang === 'nl' ? 'Waarom hierheen' : 'Why this island'}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{getWhyGoText(island, lang)}</p>
            </div>
            <div className="rounded-2xl bg-surface-cream p-5">
              <h2 className="text-lg font-heading font-bold text-gray-900 mb-2">
                {lang === 'nl' ? 'Trip-fit' : 'Trip fit'}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{getPlanningSummary(island, lang)}</p>
            </div>
            <div className="rounded-2xl bg-surface-cream p-5">
              <h2 className="text-lg font-heading font-bold text-gray-900 mb-2">
                {lang === 'nl' ? 'Seizoenswaarschuwing' : 'Season caution'}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {lang === 'nl'
                  ? 'Gebruik het seizoensvenster als brede planningstool. Controleer precieze boot- en parkvoorwaarden dichter op vertrek.'
                  : 'Use the season window as a broad planning tool. Check exact boat conditions and park operations closer to departure.'}
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[minmax(0,2fr)_340px] gap-8">
            <div className="space-y-10">
              <section className="rounded-3xl bg-white p-6 md:p-8 shadow-sm">
                <p className="section-label text-thailand-gold">
                  {lang === 'nl' ? 'Stranden' : 'Beaches'}
                </p>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? `Waar het eiland het sterkst is` : `Where ${island.name[lang]} is strongest`}
                </h2>
                <div className="space-y-4">
                  {island.beaches.map(beach => (
                    <div key={beach.name} className="rounded-2xl bg-surface-cream p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <h3 className="text-xl font-heading font-bold text-gray-900">{beach.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {beach.best_for.slice(0, 3).map(tag => (
                            <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{beach.description[lang]}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-white p-6 md:p-8 shadow-sm">
                <p className="section-label text-thailand-gold">
                  {lang === 'nl' ? 'Wat je hier echt doet' : 'What you actually do here'}
                </p>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? `Activiteiten die de reis sturen` : `Activities that shape the trip`}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {island.activities.map(activity => (
                    <div key={activity.name} className="rounded-2xl bg-surface-cream p-5">
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="text-lg font-heading font-bold text-gray-900">{activity.name}</h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700">
                          {activity.price_range}
                        </span>
                      </div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{activity.type}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{activity.description[lang]}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-white p-6 md:p-8 shadow-sm">
                <p className="section-label text-thailand-gold">
                  {lang === 'nl' ? 'Aankomstlogica' : 'Arrival logic'}
                </p>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? `Hoe ${island.name[lang]} praktisch in je reis past` : `How ${island.name[lang]} fits into a real itinerary`}
                </h2>
                <div className="space-y-4">
                  {island.getting_there.from_bangkok.options.map(option => (
                    <div key={`${option.method}-${option.duration}`} className="rounded-2xl bg-surface-cream p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-lg font-heading font-bold text-gray-900">{option.method}</h3>
                          <p className="text-sm text-gray-500">{option.duration}</p>
                        </div>
                        <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-800">{option.price}</div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{option.description[lang]}</p>
                    </div>
                  ))}
                </div>

                {relevantRoutes.length > 0 && (
                  <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-100 p-5">
                    <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">
                      {lang === 'nl' ? 'Verdiep je met routegidsen' : 'Deepen this with route guides'}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {relevantRoutes.map(route => (
                        <Link key={route.slug} href={`/transport/${route.slug}/`} className="text-sm font-semibold text-thailand-blue hover:underline">
                          {route.from} → {route.to}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              <section className="rounded-3xl bg-white p-6 md:p-8 shadow-sm">
                <p className="section-label text-thailand-gold">
                  {lang === 'nl' ? 'Waar verblijven' : 'Where to stay'}
                </p>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? `Slaapgebieden op ${island.name[lang]}` : `Stay areas on ${island.name[lang]}`}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {island.accommodation_tips.areas.map(area => (
                    <div key={area.name} className="rounded-2xl bg-surface-cream p-5">
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="text-lg font-heading font-bold text-gray-900">{area.name}</h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700">
                          {area.price_range}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{area.description[lang]}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-white p-6 md:p-8 shadow-sm">
                <p className="section-label text-thailand-gold">
                  {lang === 'nl' ? 'Bronnen en review' : 'Sources and review'}
                </p>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? 'Zichtbare bronvermelding' : 'Visible source notes'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-5">
                  {lang === 'nl'
                    ? `Deze gids voor ${island.name.en} is op 28 maart 2026 handmatig herzien. Claims over seizoenen en planning zijn bewust algemeen gehouden wanneer precieze operationele details te veranderlijk zijn.`
                    : `This ${island.name.en} guide was manually revised on March 28, 2026. Season and planning language is intentionally broad where precise operational details are too volatile to present as evergreen facts.`}
                </p>
                <ul className="space-y-3">
                  {sourceLinks.map(source => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? `Veelgestelde vragen over ${island.name[lang]}` : `Frequently asked questions about ${island.name[lang]}`}
                </h2>
                <div className="space-y-4">
                  {faqs.map(item => (
                    <details key={item.question} className="rounded-2xl bg-surface-cream p-5">
                      <summary className="cursor-pointer list-none font-semibold text-gray-900">{item.question}</summary>
                      <p className="mt-3 text-sm text-gray-700 leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-4 self-start">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                  {lang === 'nl' ? 'Snelle planning' : 'Quick planning snapshot'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">{lang === 'nl' ? 'Hoogseizoen' : 'High season'}</span>
                    <span className="font-semibold text-gray-900">{island.best_time_to_visit.high_season}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">{lang === 'nl' ? 'Schouderseizoen' : 'Shoulder'}</span>
                    <span className="font-semibold text-gray-900">{island.best_time_to_visit.shoulder}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">{lang === 'nl' ? 'Rustiger periode' : 'Low season'}</span>
                    <span className="font-semibold text-gray-900">{island.best_time_to_visit.low_season}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">{lang === 'nl' ? 'Voorzichtig met' : 'Caution window'}</span>
                    <span className="font-semibold text-gray-900">{island.best_time_to_visit.avoid}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">{island.best_time_to_visit.description[lang]}</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                  {lang === 'nl' ? 'Dagbudget' : 'Daily budget'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">{lang === 'nl' ? 'Budget' : 'Budget'}</span>
                    <span className="font-semibold text-gray-900">{island.budget_info.daily_budget.budget}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">{lang === 'nl' ? 'Middenklasse' : 'Mid-range'}</span>
                    <span className="font-semibold text-gray-900">{island.budget_info.daily_budget.mid}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">{lang === 'nl' ? 'Hoog segment' : 'Higher-end'}</span>
                    <span className="font-semibold text-gray-900">{island.budget_info.daily_budget.luxury}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">{island.budget_info.currency_tips[lang]}</p>
              </div>

              {relatedIslands.length > 0 && (
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                    {lang === 'nl' ? 'Verwante eilanden' : 'Related islands'}
                  </h3>
                  <div className="space-y-4">
                    {relatedIslands.map(related => (
                      <Link key={related.slug} href={`/islands/${related.slug}/`} className="flex items-center gap-3 group">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image src={related.image} alt={related.name.en} fill className="object-cover rounded-xl" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-thailand-blue transition-colors">
                            {related.name[lang]}
                          </h4>
                          <p className="text-xs text-gray-500">{related.highlights.slice(0, 2).join(', ')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {comparisons.length > 0 && (
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                    {lang === 'nl' ? 'Vergelijk slim' : 'Compare intelligently'}
                  </h3>
                  <div className="space-y-3">
                    {comparisons.map(comp => (
                      <Link key={comp.slug} href={`/compare/${comp.slug}/`} className="block text-sm font-semibold text-thailand-blue hover:underline">
                        {island.name[lang]} vs {comp.otherName[lang]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-3xl bg-surface-dark text-white p-6">
                <h3 className="text-xl font-heading font-bold mb-4">
                  {lang === 'nl' ? 'Sterkere interne routes' : 'Stronger internal routes'}
                </h3>
                <div className="space-y-3 text-sm">
                  <Link href="/islands/" className="block hover:underline">
                    {lang === 'nl' ? 'Alle eilandengidsen' : 'All island guides'}
                  </Link>
                  <Link href="/thailand-islands/" className="block hover:underline">
                    {lang === 'nl' ? 'Thailand-eilanden pillar' : 'Thailand islands pillar'}
                  </Link>
                  <Link href="/best-beaches-in-thailand/" className="block hover:underline">
                    {lang === 'nl' ? 'Beste stranden in Thailand' : 'Best beaches in Thailand'}
                  </Link>
                  <Link href="/compare/" className="block hover:underline">
                    {lang === 'nl' ? 'Vergelijk eilanden' : 'Compare islands'}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const islands = getAllIslands();
  const paths = islands.map((island: { slug: string }) => ({
    params: { slug: island.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const island = getIslandBySlug(slug);

  if (!island) {
    return { notFound: true };
  }

  const relatedIslands = getRelatedIslands(island, 3);

  const comparisonSlugs = getComparisonsForItem(slug, 'island');
  const comparisons = comparisonSlugs
    .map((itemSlug: string) => {
      const pair = getComparisonPair(itemSlug);
      if (!pair) return null;
      const otherSlug = pair.item1Slug === slug ? pair.item2Slug : pair.item1Slug;
      const islands = getAllIslands();
      const other = islands.find((item: { slug: string }) => item.slug === otherSlug);
      return other ? { slug: itemSlug, otherName: other.name, otherSlug: other.slug } : null;
    })
    .filter(Boolean);

  const transportRoutesPath = pathModule.join(process.cwd(), 'data', 'transport-routes.json');
  const transportData = JSON.parse(fs.readFileSync(transportRoutesPath, 'utf-8'));
  const relevantRoutes = (transportData.routes || [])
    .filter((route: any) => route.to === slug || route.from === slug)
    .slice(0, 3)
    .map((route: any) => ({
      slug: route.slug,
      from: route.from.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      to: route.to.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }));

  return {
    props: {
      island,
      relatedIslands,
      comparisons,
      relevantRoutes
    },
    revalidate: 86400
  };
};
