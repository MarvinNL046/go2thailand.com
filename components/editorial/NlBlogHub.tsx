import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Compass,
  MapPinned,
  Search,
  ShieldCheck,
  Sparkles,
  Utensils,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { EditorialHero } from '../design/EditorialHero';
import { PageSectionNav } from '../design/PageSectionNav';
import { SectionHeading } from '../design/SectionHeading';

export interface NlBlogHubPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: { name: string };
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  readingTime: number;
}

interface NlBlogHubProps {
  posts: NlBlogHubPost[];
  categories: string[];
  locale?: 'nl' | 'en';
}

const pageSize = 12;

const categoryLabels: Record<string, string> = {
  all: 'Alles',
  attractions: 'Bezienswaardigheden',
  culture: 'Cultuur',
  events: 'Evenementen',
  food: 'Eten & drinken',
  hotels: 'Verblijven',
  islands: 'Eilanden',
  news: 'Actueel',
  planning: 'Reisplanning',
  safety: 'Veilig reizen',
  transport: 'Vervoer',
  travel: 'Reisinspiratie',
  'travel-planning': 'Reisplanning',
  wellness: 'Wellness',
};

const categoryLabelsEn: Record<string, string> = {
  all: 'All',
  attractions: 'Attractions',
  culture: 'Culture',
  events: 'Events',
  food: 'Food & drink',
  hotels: 'Places to stay',
  islands: 'Islands',
  news: 'News',
  planning: 'Trip planning',
  safety: 'Travel safety',
  transport: 'Transport',
  travel: 'Travel inspiration',
  'travel-planning': 'Trip planning',
  wellness: 'Wellness',
};

const editorialDoors = [
  {
    title: 'Een route kiezen',
    copy: 'Begin bij reistijd, tempo en regio voordat losse tips je planning bepalen.',
    href: '/itineraries/',
    image: '/images/redesign/thailand-route-hero.webp',
    icon: Compass,
  },
  {
    title: 'Bestemmingen vergelijken',
    copy: 'Vind de plek die past bij strand, stad, natuur of een rustige uitvalsbasis.',
    href: '/city/',
    image: '/images/redesign/thailand-travel-guide-hero-v2.webp',
    icon: MapPinned,
  },
  {
    title: 'Thailand proeven',
    copy: 'Leer gerechten en regio’s kennen en ga daarna door naar lokale foodgidsen.',
    href: '/food/',
    image: '/images/redesign/thailand-food-hub-hero.webp',
    icon: Utensils,
  },
];

function labelForCategory(category: string, locale: 'nl' | 'en' = 'nl'): string {
  const labels = locale === 'nl' ? categoryLabels : categoryLabelsEn;
  return labels[category.toLowerCase()] || category.replace(/-/g, ' ');
}

function readableDate(value: string, locale: 'nl' | 'en' = 'nl'): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === 'nl' ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function BlogCard({ post, locale }: { post: NlBlogHubPost; locale: 'nl' | 'en' }) {
  const href = `${locale === 'nl' ? '/nl' : ''}/blog/${post.slug}/`;
  return (
    <article className="group flex min-h-[520px] flex-col overflow-hidden rounded-[24px] border border-jade/10 bg-white shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
      <Link href={href} className="relative block h-60 overflow-hidden">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jade/40 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-jade/78 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[.13em] text-white backdrop-blur-sm">
          {labelForCategory(post.category, locale)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[10px] font-semibold text-charcoal/48">
          <span>{readableDate(post.date, locale)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime || 1} {locale === 'nl' ? 'min lezen' : 'min read'}</span>
        </div>
        <h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.02] text-jade">
          <Link href={href} className="transition hover:text-saffron-dark">{post.title}</Link>
        </h2>
        <p className="mt-4 line-clamp-3 text-xs font-medium leading-6 text-charcoal/62">{post.description}</p>
        <Link href={href} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-[10px] font-extrabold text-jade">
          {locale === 'nl' ? 'Lees de gids' : 'Read the guide'} <ArrowRight size={13} className="text-saffron-dark" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function NlBlogHub({ posts, categories, locale = 'nl' }: NlBlogHubProps) {
  const isNl = locale === 'nl';
  const blogHref = (slug: string) => `${isNl ? '/nl' : ''}/blog/${slug}/`;
  const localHref = (path: string) => isNl ? `/nl${path}` : path;
  const copy = isNl ? {
    seoTitle: 'Thailand blog: gidsen, reisplanning en actuele uitleg', seoDescription: 'Lees Nederlandse Thailand-gidsen over routes, bestemmingen, eten, cultuur en actuele reisvragen. Met bronchecks en duidelijke grenzen voor veranderlijke informatie.', heroAlt: 'Redactionele reisplanning met Thailand-kaart, longtailboot en landschap', breadcrumbsHome: 'Thailand', breadcrumbsBlog: 'Reisblog', heroEyebrow: 'Van inspiratie naar een beter besluit', heroTitle: <>Thailand lezen.<br /><span className="text-saffron-light">Slimmer reizen.</span></>, heroDescription: 'Geen losse lijst met virale tips. Hier verbinden we reisideeën met routekeuze, actuele checks en de gids die het onderwerp echt bezit.', latest: 'Bekijk de nieuwste gidsen', choose: 'Kies een startpunt', navLabel: 'Op deze pagina', starts: 'Startpunten', allGuides: 'Alle gidsen', method: 'Onze werkwijze', startEyebrow: 'Eerst je hoofdvraag', startTitle: 'Drie sterke startpunten', startDescription: 'Gebruik een artikel voor verdieping. Gebruik een ownerpagina wanneer je een bestemming, route of concrete reisbeslissing moet kiezen.', door1: 'Een route kiezen', door1Copy: 'Begin bij reistijd, tempo en regio voordat losse tips je planning bepalen.', door2: 'Bestemmingen vergelijken', door2Copy: 'Vind de plek die past bij strand, stad, natuur of een rustige uitvalsbasis.', door3: 'Thailand proeven', door3Copy: 'Leer gerechten en regio’s kennen en ga daarna door naar lokale foodgidsen.', openChoice: 'Open de keuzehulp', archiveEyebrow: 'Zoek in het archief', archiveTitle: 'Gidsen, uitleg en actuele dossiers', archiveDescription: 'Tijdgevoelige artikelen krijgen een zichtbare datum en live-checkgrens. Evergreen gidsen verwijzen door naar de juiste beslispagina.', searchLabel: 'Zoek een artikel', searchPlaceholder: 'Zoek op bestemming, onderwerp of reisvraag', filterLabel: 'Filter artikelen op categorie', newDossier: 'Nieuw in het dossier', readArticle: 'Lees het artikel', noGuide: 'Geen gids gevonden', noGuideCopy: 'Probeer een bredere zoekterm of kies ‘Alles’.', previous: 'Vorige', next: 'Volgende', page: 'Pagina', fullIndexEyebrow: 'Volledige publicatie-index', fullIndexTitle: 'Iedere gids heeft een vaste ingang', fullIndexDescription: 'Open per onderwerp de complete, indexeerbare collectie. Zo blijven ook oudere maar nog actuele dossiers rechtstreeks bereikbaar zonder door een zoekfilter te hoeven gaan.', fullIndexNote: 'Verlopen of samengevoegde artikelen staan niet in deze index. Zij blijven alleen als transparant archief bereikbaar of verwijzen naar hun definitieve owner.', guides: 'gidsen', methodEyebrow: 'Onze redactionele grens', methodTitle: 'Een datum is geen garantie.', methodDescription: 'Nieuws, prijzen, tickets, routes en regels kunnen veranderen. Daarom scheiden we stabiele keuzehulp van informatie die je op de bezoekdag opnieuw moet controleren.', principles: [['Bron boven samenvatting', 'Belangrijke actuele claims horen terug te leiden naar een controleerbare bron.'], ['Owner boven dubbel artikel', 'Bij dezelfde zoekintentie verwijst één sterke pagina door; we houden geen tweede zwakke winnaar in leven.'], ['Prijs als live check', 'We tonen geen oude vanafprijs alsof die vandaag nog geldt.'], ['Affiliate na uitleg', 'Een commerciële uitgang volgt pas wanneer de gratis keuzehulp het besluit al heeft verduidelijkt.']], schemaName: 'GO2 Thailand reisblog', schemaDescription: 'Nederlandse Thailand-gidsen, reisplanning en actuele redactionele uitleg met zichtbare bron- en actualiteitsgrenzen.', inLanguage: 'nl-NL', blogName: 'Reisblog', schemaList: 'Nieuwe artikelen van GO2 Thailand',
  } : {
    seoTitle: 'Thailand travel blog: guides, planning and practical advice', seoDescription: 'Read practical Thailand travel guides covering routes, destinations, food, culture and current travel questions, with source checks and clear freshness notes.', heroAlt: 'Editorial travel planning with a Thailand map, longtail boat and landscape', breadcrumbsHome: 'Thailand', breadcrumbsBlog: 'Travel blog', heroEyebrow: 'From inspiration to a better decision', heroTitle: <>Read Thailand.<br /><span className="text-saffron-light">Travel smarter.</span></>, heroDescription: 'More than a list of viral tips. We connect travel ideas with route choices, current checks and the guide that truly owns the question.', latest: 'Browse the latest guides', choose: 'Choose a starting point', navLabel: 'On this page', starts: 'Starting points', allGuides: 'All guides', method: 'Our approach', startEyebrow: 'Start with your question', startTitle: 'Three strong starting points', startDescription: 'Use an article for depth. Use an owner page when you need to choose a destination, route or concrete travel option.', door1: 'Choose a route', door1Copy: 'Start with travel time, pace and region before individual tips shape your plan.', door2: 'Compare destinations', door2Copy: 'Find the place that fits beaches, cities, nature or a quieter base.', door3: 'Taste Thailand', door3Copy: 'Learn the dishes and regions, then continue to local food guides.', openChoice: 'Open the trip planner', archiveEyebrow: 'Search the archive', archiveTitle: 'Guides, explainers and current dossiers', archiveDescription: 'Time-sensitive articles show a visible date and freshness boundary. Evergreen guides point to the right decision page.', searchLabel: 'Search articles', searchPlaceholder: 'Search by destination, topic or travel question', filterLabel: 'Filter articles by category', newDossier: 'New in the dossier', readArticle: 'Read the article', noGuide: 'No guide found', noGuideCopy: 'Try a broader search term or choose “All”.', previous: 'Previous', next: 'Next', page: 'Page', fullIndexEyebrow: 'Full publication index', fullIndexTitle: 'Every guide has a clear entry point', fullIndexDescription: 'Open the complete, indexable collection by topic. Older but still useful dossiers stay directly reachable without relying on a search filter.', fullIndexNote: 'Expired or merged articles are not duplicated in this index. They remain available as a transparent archive or point to their definitive owner.', guides: 'guides', methodEyebrow: 'Our editorial boundary', methodTitle: 'A date is not a guarantee.', methodDescription: 'News, prices, tickets, routes and rules can change. We separate stable decision help from information you should check again on the day.', principles: [['Sources before summaries', 'Important current claims should lead back to a source you can verify.'], ['Owner pages over duplicate articles', 'One strong page should own an intent; we do not keep a weaker duplicate alive.'], ['Prices as live checks', 'We never present an old starting price as if it were guaranteed today.'], ['Affiliate after explanation', 'A commercial next step comes only after the free guidance has clarified the decision.']], schemaName: 'GO2 Thailand travel blog', schemaDescription: 'Thailand travel guides, planning and current editorial explainers with visible source and freshness boundaries.', inLanguage: 'en-GB', blogName: 'Travel blog', schemaList: 'Latest GO2 Thailand articles',
  };
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const availableCategories = useMemo(
    () => categories.filter((category) => posts.some((post) => post.category === category)),
    [categories, posts],
  );

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase(locale === 'nl' ? 'nl-NL' : 'en-GB');
    return posts.filter((post) => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
      if (!query) return true;
      return `${post.title} ${post.description} ${post.tags.join(' ')}`.toLocaleLowerCase(locale === 'nl' ? 'nl-NL' : 'en-GB').includes(query);
    });
  }, [posts, searchQuery, selectedCategory, locale]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visiblePosts = filteredPosts.slice((safePage - 1) * pageSize, safePage * pageSize);
  const featured = posts[0];
  const postsByCategory = useMemo(() => {
    const grouped = new Map<string, NlBlogHubPost[]>();
    for (const post of posts) grouped.set(post.category, [...(grouped.get(post.category) || []), post]);
    return [...grouped.entries()].sort(([left], [right]) => labelForCategory(left, locale).localeCompare(labelForCategory(right, locale), locale === 'nl' ? 'nl-NL' : 'en-GB'));
  }, [posts, locale]);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: copy.schemaName,
      description: copy.schemaDescription,
      url: `https://go2-thailand.com${localHref('/blog/')}`,
      inLanguage: copy.inLanguage,
      publisher: { '@type': 'Organization', name: 'GO2 Thailand', url: `https://go2-thailand.com${localHref('/')}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: copy.breadcrumbsHome, item: `https://go2-thailand.com${localHref('/')}` },
        { '@type': 'ListItem', position: 2, name: copy.breadcrumbsBlog, item: `https://go2-thailand.com${localHref('/blog/')}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: copy.schemaList,
      itemListElement: posts.slice(0, 12).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://go2-thailand.com${blogHref(post.slug)}`,
        name: post.title,
      })),
    },
  ];

  const chooseCategory = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const updateSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <>
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        ogImage="https://go2-thailand.com/images/redesign/thailand-editorial-blog-hub-hero.webp"
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template={`${isNl ? 'nl' : 'en'}-blog-hub`} className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-editorial-blog-hub-hero.webp"
          imageAlt={copy.heroAlt}
          breadcrumbs={[{ label: copy.breadcrumbsHome, href: localHref('/') }, { label: copy.breadcrumbsBlog }]}
          eyebrow={copy.heroEyebrow}
          title={copy.heroTitle}
          description={copy.heroDescription}
          actions={[
            { label: copy.latest, href: '#artikelen', kind: 'primary' },
            { label: copy.choose, href: '#startpunten', kind: 'secondary' },
          ]}
          contentTone="light"
          minHeightClassName="min-h-[780px] lg:min-h-[700px]"
          titleClassName="max-w-[820px] text-[4rem] leading-[.85] !text-white sm:text-[5.1rem] lg:text-[5.8rem]"
          descriptionClassName="mt-5 max-w-[650px] text-sm leading-7 !text-white/78"
          imageClassName="object-cover object-[62%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(90deg,rgba(3,29,29,.98)_0%,rgba(3,29,29,.9)_42%,rgba(3,29,29,.25)_72%,rgba(3,29,29,.04)_100%)]"
        />

        <PageSectionNav
          label={copy.navLabel}
          items={[
            { href: '#startpunten', label: copy.starts, icon: Compass },
            { href: '#artikelen', label: copy.allGuides, icon: BookOpen },
            { href: '#werkwijze', label: copy.method, icon: ShieldCheck },
          ]}
        />

        <section id="startpunten" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading
              eyebrow={copy.startEyebrow}
              title={copy.startTitle}
              description={copy.startDescription}
            />
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {editorialDoors.map(({ href, image, icon: Icon }, index) => {
                const title = index === 0 ? copy.door1 : index === 1 ? copy.door2 : copy.door3;
                const doorCopy = index === 0 ? copy.door1Copy : index === 1 ? copy.door2Copy : copy.door3Copy;
                return (
                <Link key={href} href={localHref(href)} className="group grid min-h-[430px] overflow-hidden rounded-[24px] bg-jade text-white shadow-editorial-card">
                  <div className="relative min-h-[235px] overflow-hidden">
                    <Image src={image} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-jade/70 to-transparent" />
                    <span className="absolute bottom-5 left-5 grid h-11 w-11 place-items-center rounded-full bg-saffron text-jade"><Icon size={20} aria-hidden="true" /></span>
                  </div>
                  <div className="flex flex-col p-6">
                    <h2 className="font-display text-[2rem] font-semibold leading-none">{title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-white/68">{doorCopy}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-extrabold text-saffron-light">{copy.openChoice} <ArrowRight size={13} aria-hidden="true" /></span>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="artikelen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <SectionHeading
                eyebrow={copy.archiveEyebrow}
                title={copy.archiveTitle}
                description={copy.archiveDescription}
              />
              <label className="relative block">
                <span className="sr-only">{copy.searchLabel}</span>
                <Search aria-hidden="true" size={19} className="absolute left-5 top-1/2 -translate-y-1/2 text-jade/45" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder={copy.searchPlaceholder}
                  className="min-h-14 w-full rounded-2xl border border-jade/12 bg-white pl-14 pr-5 text-sm font-semibold text-jade outline-none transition placeholder:text-charcoal/38 focus:border-saffron/55 focus:ring-4 focus:ring-saffron/10"
                />
              </label>
            </div>

            <div className="scrollbar-hide mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label={copy.filterLabel}>
              {['all', ...availableCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => chooseCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-[10px] font-extrabold transition ${selectedCategory === category ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-charcoal/62 hover:border-saffron/45 hover:text-jade'}`}
                >
                  {labelForCategory(category, locale)}
                </button>
              ))}
            </div>

            {featured && selectedCategory === 'all' && !searchQuery && safePage === 1 ? (
              <article className="mt-9 grid overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift lg:grid-cols-[1.08fr_.92fr]">
                <div className="relative min-h-[360px] lg:min-h-[500px]">
                  <Image src={featured.image} alt="" fill sizes="(max-width:1024px) 100vw, 54vw" className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/30 to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-7 lg:p-10">
                  <span className="eyebrow !text-saffron-light">{copy.newDossier}</span>
                  <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[.9]">{featured.title}</h2>
                  <p className="mt-6 text-sm font-medium leading-7 text-white/70">{featured.description}</p>
                  <div className="mt-6 flex items-center gap-3 text-[10px] font-bold text-white/50">
                    <CalendarDays size={14} aria-hidden="true" /> {readableDate(featured.date, locale)} · {featured.readingTime || 1} {isNl ? 'min lezen' : 'min read'}
                  </div>
                  <Link href={blogHref(featured.slug)} className="btn-cream mt-8 min-h-12 w-fit px-6 text-saffron-dark">{copy.readArticle} <ArrowRight size={14} aria-hidden="true" /></Link>
                </div>
              </article>
            ) : null}

            {visiblePosts.length ? (
              <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visiblePosts.map((post) => <BlogCard key={post.slug} post={post} locale={locale} />)}
              </div>
            ) : (
              <div className="mt-9 rounded-2xl border border-jade/10 bg-white p-10 text-center">
                <Sparkles className="mx-auto text-saffron-dark" aria-hidden="true" />
                <p className="mt-4 font-display text-2xl font-semibold text-jade">{copy.noGuide}</p>
                <p className="mt-2 text-sm text-charcoal/58">{copy.noGuideCopy}</p>
              </div>
            )}

            {totalPages > 1 ? (
              <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Paginering van het blogarchief">
                <button type="button" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="min-h-11 rounded-xl border border-jade/10 bg-white px-5 text-[10px] font-extrabold text-jade disabled:opacity-35">{copy.previous}</button>
                <span className="text-[10px] font-bold text-charcoal/50">{copy.page} {safePage} / {totalPages}</span>
                <button type="button" disabled={safePage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="min-h-11 rounded-xl border border-jade/10 bg-white px-5 text-[10px] font-extrabold text-jade disabled:opacity-35">{copy.next}</button>
              </nav>
            ) : null}

            <div className="mt-14 border-t border-jade/10 pt-10">
              <div className="grid gap-6 lg:grid-cols-[.68fr_1.32fr] lg:items-end">
                <SectionHeading
                  eyebrow={copy.fullIndexEyebrow}
                  title={copy.fullIndexTitle}
                  description={copy.fullIndexDescription}
                />
                <p className="max-w-2xl text-xs font-medium leading-6 text-charcoal/58 lg:justify-self-end">
                  {copy.fullIndexNote}
                </p>
              </div>
              <div className="mt-8 grid gap-3 lg:grid-cols-2">
                {postsByCategory.map(([category, categoryPosts], index) => (
                  <details key={category} className="group rounded-2xl border border-jade/10 bg-white shadow-editorial-card" open={index < 2}>
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-extrabold text-jade marker:hidden">
                      <span>{labelForCategory(category, locale)}</span>
                      <span className="rounded-full bg-tonal px-3 py-1 text-[9px] tracking-[.08em] text-charcoal/48">{categoryPosts.length} {copy.guides}</span>
                    </summary>
                    <div className="grid gap-px border-t border-jade/8 bg-jade/8 sm:grid-cols-2">
                      {categoryPosts.map((post) => (
                        <Link key={post.slug} href={blogHref(post.slug)} className="group/link flex min-h-14 items-center justify-between gap-3 bg-white px-5 py-3 text-[11px] font-bold leading-5 text-charcoal/68 transition hover:text-jade">
                          <span>{post.title}</span>
                          <ArrowRight size={13} className="shrink-0 text-saffron-dark transition group-hover/link:translate-x-0.5" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="werkwijze" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
            <div>
              <p className="eyebrow">{copy.methodEyebrow}</p>
              <h2 className="font-display text-[3.2rem] font-semibold leading-[.9] text-jade">{copy.methodTitle}</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">{copy.methodDescription}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ...(copy.principles),
              ].map(([title, copy], index) => (
                <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <span className="text-[9px] font-extrabold tracking-[.15em] text-saffron-dark">PRINCIPE 0{index + 1}</span>
                  <h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
