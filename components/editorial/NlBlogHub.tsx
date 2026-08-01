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

function labelForCategory(category: string): string {
  return categoryLabels[category.toLowerCase()] || category.replace(/-/g, ' ');
}

function readableDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function BlogCard({ post }: { post: NlBlogHubPost }) {
  return (
    <article className="group flex min-h-[520px] flex-col overflow-hidden rounded-[24px] border border-jade/10 bg-white shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
      <Link href={`/blog/${post.slug}/`} className="relative block h-60 overflow-hidden">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jade/40 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-jade/78 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[.13em] text-white backdrop-blur-sm">
          {labelForCategory(post.category)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[10px] font-semibold text-charcoal/48">
          <span>{readableDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime || 1} min lezen</span>
        </div>
        <h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.02] text-jade">
          <Link href={`/blog/${post.slug}/`} className="transition hover:text-saffron-dark">{post.title}</Link>
        </h2>
        <p className="mt-4 line-clamp-3 text-xs font-medium leading-6 text-charcoal/62">{post.description}</p>
        <Link href={`/blog/${post.slug}/`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-[10px] font-extrabold text-jade">
          Lees de gids <ArrowRight size={13} className="text-saffron-dark" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function NlBlogHub({ posts, categories }: NlBlogHubProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const availableCategories = useMemo(
    () => categories.filter((category) => posts.some((post) => post.category === category)),
    [categories, posts],
  );

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('nl-NL');
    return posts.filter((post) => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
      if (!query) return true;
      return `${post.title} ${post.description} ${post.tags.join(' ')}`.toLocaleLowerCase('nl-NL').includes(query);
    });
  }, [posts, searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visiblePosts = filteredPosts.slice((safePage - 1) * pageSize, safePage * pageSize);
  const featured = posts[0];
  const postsByCategory = useMemo(() => {
    const grouped = new Map<string, NlBlogHubPost[]>();
    for (const post of posts) grouped.set(post.category, [...(grouped.get(post.category) || []), post]);
    return [...grouped.entries()].sort(([left], [right]) => labelForCategory(left).localeCompare(labelForCategory(right), 'nl-NL'));
  }, [posts]);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'GO2 Thailand reisblog',
      description: 'Nederlandse Thailand-gidsen, reisplanning en actuele redactionele uitleg met zichtbare bron- en actualiteitsgrenzen.',
      url: 'https://go2-thailand.com/nl/blog/',
      inLanguage: 'nl-NL',
      publisher: { '@type': 'Organization', name: 'GO2 Thailand', url: 'https://go2-thailand.com/nl/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Reisblog', item: 'https://go2-thailand.com/nl/blog/' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Nieuwe artikelen van GO2 Thailand',
      itemListElement: posts.slice(0, 12).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://go2-thailand.com/nl/blog/${post.slug}/`,
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
        title="Thailand blog: gidsen, reisplanning en actuele uitleg"
        description="Lees Nederlandse Thailand-gidsen over routes, bestemmingen, eten, cultuur en actuele reisvragen. Met bronchecks en duidelijke grenzen voor veranderlijke informatie."
        ogImage="https://go2-thailand.com/images/redesign/thailand-editorial-blog-hub-hero.webp"
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template="nl-blog-hub" className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-editorial-blog-hub-hero.webp"
          imageAlt="Redactionele reisplanning met Thailand-kaart, longtailboot en landschap"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisblog' }]}
          eyebrow="Van inspiratie naar een beter besluit"
          title={<>Thailand lezen.<br /><span className="text-saffron-light">Slimmer reizen.</span></>}
          description="Geen losse lijst met virale tips. Hier verbinden we reisideeën met routekeuze, actuele checks en de gids die het onderwerp echt bezit."
          actions={[
            { label: 'Bekijk de nieuwste gidsen', href: '#artikelen', kind: 'primary' },
            { label: 'Kies een startpunt', href: '#startpunten', kind: 'secondary' },
          ]}
          contentTone="light"
          minHeightClassName="min-h-[780px] lg:min-h-[700px]"
          titleClassName="max-w-[820px] text-[4rem] leading-[.85] !text-white sm:text-[5.1rem] lg:text-[5.8rem]"
          descriptionClassName="mt-5 max-w-[650px] text-sm leading-7 !text-white/78"
          imageClassName="object-cover object-[62%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(90deg,rgba(3,29,29,.98)_0%,rgba(3,29,29,.9)_42%,rgba(3,29,29,.25)_72%,rgba(3,29,29,.04)_100%)]"
        />

        <PageSectionNav
          label="Op deze pagina"
          items={[
            { href: '#startpunten', label: 'Startpunten', icon: Compass },
            { href: '#artikelen', label: 'Alle gidsen', icon: BookOpen },
            { href: '#werkwijze', label: 'Onze werkwijze', icon: ShieldCheck },
          ]}
        />

        <section id="startpunten" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Eerst je hoofdvraag"
              title="Drie sterke startpunten"
              description="Gebruik een artikel voor verdieping. Gebruik een ownerpagina wanneer je een bestemming, route of concrete reisbeslissing moet kiezen."
            />
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {editorialDoors.map(({ title, copy, href, image, icon: Icon }) => (
                <Link key={href} href={href} className="group grid min-h-[430px] overflow-hidden rounded-[24px] bg-jade text-white shadow-editorial-card">
                  <div className="relative min-h-[235px] overflow-hidden">
                    <Image src={image} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-jade/70 to-transparent" />
                    <span className="absolute bottom-5 left-5 grid h-11 w-11 place-items-center rounded-full bg-saffron text-jade"><Icon size={20} aria-hidden="true" /></span>
                  </div>
                  <div className="flex flex-col p-6">
                    <h2 className="font-display text-[2rem] font-semibold leading-none">{title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-white/68">{copy}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-extrabold text-saffron-light">Open de keuzehulp <ArrowRight size={13} aria-hidden="true" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="artikelen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <SectionHeading
                eyebrow="Zoek in het archief"
                title="Gidsen, uitleg en actuele dossiers"
                description="Tijdgevoelige artikelen krijgen een zichtbare datum en live-checkgrens. Evergreen gidsen verwijzen door naar de juiste beslispagina."
              />
              <label className="relative block">
                <span className="sr-only">Zoek een artikel</span>
                <Search aria-hidden="true" size={19} className="absolute left-5 top-1/2 -translate-y-1/2 text-jade/45" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder="Zoek op bestemming, onderwerp of reisvraag"
                  className="min-h-14 w-full rounded-2xl border border-jade/12 bg-white pl-14 pr-5 text-sm font-semibold text-jade outline-none transition placeholder:text-charcoal/38 focus:border-saffron/55 focus:ring-4 focus:ring-saffron/10"
                />
              </label>
            </div>

            <div className="scrollbar-hide mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter artikelen op categorie">
              {['all', ...availableCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => chooseCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-[10px] font-extrabold transition ${selectedCategory === category ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-charcoal/62 hover:border-saffron/45 hover:text-jade'}`}
                >
                  {labelForCategory(category)}
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
                  <span className="eyebrow !text-saffron-light">Nieuw in het dossier</span>
                  <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[.9]">{featured.title}</h2>
                  <p className="mt-6 text-sm font-medium leading-7 text-white/70">{featured.description}</p>
                  <div className="mt-6 flex items-center gap-3 text-[10px] font-bold text-white/50">
                    <CalendarDays size={14} aria-hidden="true" /> {readableDate(featured.date)} · {featured.readingTime || 1} min lezen
                  </div>
                  <Link href={`/blog/${featured.slug}/`} className="btn-cream mt-8 min-h-12 w-fit px-6 text-saffron-dark">Lees het artikel <ArrowRight size={14} aria-hidden="true" /></Link>
                </div>
              </article>
            ) : null}

            {visiblePosts.length ? (
              <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visiblePosts.map((post) => <BlogCard key={post.slug} post={post} />)}
              </div>
            ) : (
              <div className="mt-9 rounded-2xl border border-jade/10 bg-white p-10 text-center">
                <Sparkles className="mx-auto text-saffron-dark" aria-hidden="true" />
                <p className="mt-4 font-display text-2xl font-semibold text-jade">Geen gids gevonden</p>
                <p className="mt-2 text-sm text-charcoal/58">Probeer een bredere zoekterm of kies ‘Alles’.</p>
              </div>
            )}

            {totalPages > 1 ? (
              <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Paginering van het blogarchief">
                <button type="button" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="min-h-11 rounded-xl border border-jade/10 bg-white px-5 text-[10px] font-extrabold text-jade disabled:opacity-35">Vorige</button>
                <span className="text-[10px] font-bold text-charcoal/50">Pagina {safePage} van {totalPages}</span>
                <button type="button" disabled={safePage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="min-h-11 rounded-xl border border-jade/10 bg-white px-5 text-[10px] font-extrabold text-jade disabled:opacity-35">Volgende</button>
              </nav>
            ) : null}

            <div className="mt-14 border-t border-jade/10 pt-10">
              <div className="grid gap-6 lg:grid-cols-[.68fr_1.32fr] lg:items-end">
                <SectionHeading
                  eyebrow="Volledige publicatie-index"
                  title="Iedere gids heeft een vaste ingang"
                  description="Open per onderwerp de complete, indexeerbare collectie. Zo blijven ook oudere maar nog actuele dossiers rechtstreeks bereikbaar zonder door een zoekfilter te hoeven gaan."
                />
                <p className="max-w-2xl text-xs font-medium leading-6 text-charcoal/58 lg:justify-self-end">
                  Verlopen of samengevoegde artikelen staan niet in deze index. Zij blijven alleen als transparant archief bereikbaar of verwijzen naar hun definitieve owner.
                </p>
              </div>
              <div className="mt-8 grid gap-3 lg:grid-cols-2">
                {postsByCategory.map(([category, categoryPosts], index) => (
                  <details key={category} className="group rounded-2xl border border-jade/10 bg-white shadow-editorial-card" open={index < 2}>
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-extrabold text-jade marker:hidden">
                      <span>{labelForCategory(category)}</span>
                      <span className="rounded-full bg-tonal px-3 py-1 text-[9px] tracking-[.08em] text-charcoal/48">{categoryPosts.length} gidsen</span>
                    </summary>
                    <div className="grid gap-px border-t border-jade/8 bg-jade/8 sm:grid-cols-2">
                      {categoryPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}/`} className="group/link flex min-h-14 items-center justify-between gap-3 bg-white px-5 py-3 text-[11px] font-bold leading-5 text-charcoal/68 transition hover:text-jade">
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
              <p className="eyebrow">Onze redactionele grens</p>
              <h2 className="font-display text-[3.2rem] font-semibold leading-[.9] text-jade">Een datum is geen garantie.</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Nieuws, prijzen, tickets, routes en regels kunnen veranderen. Daarom scheiden we stabiele keuzehulp van informatie die je op de bezoekdag opnieuw moet controleren.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Bron boven samenvatting', 'Belangrijke actuele claims horen terug te leiden naar een controleerbare bron.'],
                ['Owner boven dubbel artikel', 'Bij dezelfde zoekintentie verwijst één sterke pagina door; we houden geen tweede zwakke winnaar in leven.'],
                ['Prijs als live check', 'We tonen geen oude vanafprijs alsof die vandaag nog geldt.'],
                ['Affiliate na uitleg', 'Een commerciële uitgang volgt pas wanneer de gratis keuzehulp het besluit al heeft verduidelijkt.'],
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
