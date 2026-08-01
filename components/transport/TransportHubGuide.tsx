import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ArrowRight,
  Bus,
  CalendarCheck,
  Car,
  Clock3,
  ExternalLink,
  Ship,
  MapPinned,
  Navigation,
  Plane,
  Search,
  ShieldCheck,
  TicketCheck,
  TrainFront,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { transportHubNl as content } from '../../data/transport/nl';
import { TWELVEGO_GENERIC, withSubId } from '../../lib/affiliates';

interface TransportRoute {
  slug: string;
  from: string;
  to: string;
  distance: string;
  duration: Record<string, string | undefined>;
  popular?: boolean;
}

interface TransportCity {
  slug: string;
  name: { en: string; nl?: string };
  region: string;
}

interface TransportHubGuideProps {
  allRoutes: TransportRoute[];
  cities: TransportCity[];
}

const modeIcons = [TrainFront, Bus, Plane, Ship, Car, Navigation];
const featuredSlugs = [
  'bangkok-to-chiang-mai',
  'bangkok-to-ayutthaya',
  'bangkok-to-krabi',
  'bangkok-to-phuket',
  'bangkok-to-surat-thani',
  'chiang-mai-to-pai',
  'surat-thani-to-koh-samui',
  'krabi-to-phuket',
];

const sectionNav = [
  { href: '#routezoeker' as const, label: 'Routezoeker', icon: Search },
  { href: '#vervoersmiddelen' as const, label: 'Vervoer', icon: TrainFront },
  { href: '#vergelijken' as const, label: 'Vergelijken', icon: Clock3 },
  { href: '#routes' as const, label: 'Routes', icon: MapPinned },
  { href: '#boeken' as const, label: 'Boeken', icon: TicketCheck },
  { href: '#vragen' as const, label: 'Vragen', icon: ShieldCheck },
];

function firstDuration(route: TransportRoute) {
  const preferred = ['flight', 'train', 'bus', 'ferry', 'taxi'];
  for (const mode of preferred) {
    if (route.duration[mode]) return localizeDuration(route.duration[mode]);
  }
  const fallback = Object.values(route.duration).find(Boolean);
  return fallback ? localizeDuration(fallback) : 'bekijk de route';
}

function localizeDuration(value: string) {
  return value
    .replace(/\bhours?\b/gi, 'uur')
    .replace(/\bminutes?\b/gi, 'minuten')
    .replace(/\bdays?\b/gi, 'dagen');
}

export default function TransportHubGuide({ allRoutes, cities }: TransportHubGuideProps) {
  const router = useRouter();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [routeMessage, setRouteMessage] = useState('');

  const cityBySlug = useMemo(() => new Map(cities.map((city) => [city.slug, city])), [cities]);
  const departureCities = useMemo(() => [...new Set(allRoutes.map((route) => route.from))]
    .map((slug) => cityBySlug.get(slug)).filter(Boolean) as TransportCity[], [allRoutes, cityBySlug]);
  const arrivalCities = useMemo(() => [...new Set(allRoutes.filter((route) => !fromCity || route.from === fromCity).map((route) => route.to))]
    .map((slug) => cityBySlug.get(slug)).filter(Boolean) as TransportCity[], [allRoutes, cityBySlug, fromCity]);
  const featuredRoutes = featuredSlugs.map((slug) => allRoutes.find((route) => route.slug === slug)).filter(Boolean) as TransportRoute[];

  const cityName = (slug: string) => {
    const city = cityBySlug.get(slug);
    return city?.name.nl || city?.name.en || slug.replace(/-/g, ' ');
  };

  const findRoute = async () => {
    const route = allRoutes.find((item) => item.from === fromCity && item.to === toCity);
    if (!route) {
      setRouteMessage('Voor deze combinatie is nog geen routegids beschikbaar. Kies een andere bestemming.');
      return;
    }
    setRouteMessage('');
    await router.push(`/transport/${route.slug}/`);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://go2-thailand.com/nl/transport/#routes',
    name: 'Populaire transportroutes in Thailand',
    itemListElement: featuredRoutes.map((route, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${cityName(route.from)} naar ${cityName(route.to)}`,
      url: `https://go2-thailand.com/nl/transport/${route.slug}/`,
    })),
  };
  const collectionSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: content.seo.title,
    description: content.seo.description, url: 'https://go2-thailand.com/nl/transport/', inLanguage: 'nl-NL', dateModified: '2026-07-26',
    mainEntity: { '@id': 'https://go2-thailand.com/nl/transport/#routes' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Vervoer', item: 'https://go2-thailand.com/nl/transport/' },
    ],
  };

  return (
    <>
      <SEOHead title={content.seo.title} description={content.seo.description} ogImage="https://go2-thailand.com/images/redesign/transport-thailand-hero.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/transport-thailand-hero.webp"
          imageAlt="Thaise trein op een groen landelijk station als onderdeel van een reis door Thailand"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Vervoer' }]}
          eyebrow={content.hero.eyebrow}
          title={<>{content.hero.title}{' '}<span className="block text-saffron-dark">{content.hero.accent}</span></>}
          description={content.hero.intro}
          actions={[
            { label: 'Vind jouw route', href: '#routezoeker', kind: 'primary' },
            { label: 'Bekijk tickets', href: withSubId(TWELVEGO_GENERIC, 'transport-nl-hero'), kind: 'secondary', affiliate: true, newTab: true, ariaLabel: 'Bekijk actuele vervoerstickets voor Thailand op 12Go' },
          ]}
          disclosure="Affiliate-link: boek je via 12Go, dan ontvangen wij mogelijk commissie zonder extra kosten voor jou. Vergelijk altijd de specifieke aanbieder en voorwaarden."
          minHeightClassName="min-h-[700px] lg:min-h-[690px]"
          titleClassName="max-w-[650px] text-[4.35rem] leading-[0.83] sm:text-[5.5rem] lg:text-[6.15rem]"
          imageClassName="object-cover object-[62%_center] lg:object-center"
          sideCard={(
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[300px] rounded-2xl border border-white/45 bg-white/84 p-5 shadow-editorial-card backdrop-blur-lg xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Vergelijk de hele reis</p>
              <div className="mt-4 flex items-center justify-between text-center text-[10px] font-bold text-jade"><span>Hotel</span><ArrowRight size={13} className="text-saffron" /><span>Terminal</span><ArrowRight size={13} className="text-saffron" /><span>Bestemming</span></div>
              <p className="mt-4 border-t border-jade/10 pt-4 text-xs font-medium leading-5 text-charcoal/58">De snelste rit is niet altijd de snelste deur-tot-deurroute.</p>
            </div>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section id="routezoeker" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <SectionHeading eyebrow="Begin met je traject" title={<>Van waar<br />naar waar?</>} description="De routezoeker opent alleen bestaande gidsen. Daar vergelijk je vervolgens de beschikbare vervoersvormen voor dat specifieke traject." />
            <div className="rounded-[24px] border border-jade/10 bg-white p-6 shadow-editorial-lift sm:p-8">
              <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                <label className="text-xs font-extrabold text-jade">Van
                  <select value={fromCity} onChange={(event) => { setFromCity(event.target.value); setToCity(''); setRouteMessage(''); }} className="mt-2 min-h-12 w-full rounded-xl border border-jade/15 bg-canvas px-4 text-sm font-semibold text-charcoal outline-none focus:border-saffron">
                    <option value="">Kies vertrekplaats</option>
                    {departureCities.map((city) => <option key={city.slug} value={city.slug}>{city.name.nl || city.name.en}</option>)}
                  </select>
                </label>
                <label className="text-xs font-extrabold text-jade">Naar
                  <select value={toCity} onChange={(event) => { setToCity(event.target.value); setRouteMessage(''); }} disabled={!fromCity} className="mt-2 min-h-12 w-full rounded-xl border border-jade/15 bg-canvas px-4 text-sm font-semibold text-charcoal outline-none focus:border-saffron disabled:opacity-45">
                    <option value="">Kies bestemming</option>
                    {arrivalCities.map((city) => <option key={city.slug} value={city.slug}>{city.name.nl || city.name.en}</option>)}
                  </select>
                </label>
                <button type="button" onClick={findRoute} disabled={!fromCity || !toCity} className="btn-jade btn-jade-pattern min-h-12 justify-center px-6 disabled:cursor-not-allowed disabled:opacity-45">Bekijk route <ArrowRight size={16} className="text-saffron" /></button>
              </div>
              <p aria-live="polite" className="mt-3 min-h-5 text-xs font-semibold text-saffron-dark">{routeMessage}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-jade/10 pt-5">
                <p className="max-w-[530px] text-xs font-medium leading-5 text-charcoal/58">Nog aan het oriënteren? Vergelijk op 12Go actuele tijden en aanbieders; lees daarna onze routegids voor de afweging.</p>
                <a href={withSubId(TWELVEGO_GENERIC, 'transport-nl-finder')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 text-xs font-extrabold text-jade">Open 12Go <ExternalLink size={14} className="text-saffron" /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="vervoersmiddelen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Kies op traject" title="Zes manieren. Zes andere afwegingen." description="Gebruik geen vaste winnaar voor heel Thailand. De beste keuze verandert met afstand, bagage, aankomsttijd en hoeveel overstappen je accepteert." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.modes.map((mode, index) => {
                const Icon = modeIcons[index];
                return <article key={mode.id} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={21} /></span><h2 className="mt-5 font-display text-[2rem] font-semibold leading-none text-jade">{mode.title}</h2><dl className="mt-5 space-y-4 text-xs leading-5"><div><dt className="font-extrabold text-jade">Sterk wanneer</dt><dd className="mt-1 text-charcoal/62">{mode.bestFor}</dd></div><div><dt className="font-extrabold text-jade">Keerzijde</dt><dd className="mt-1 text-charcoal/62">{mode.tradeoff}</dd></div><div className="border-t border-jade/10 pt-4"><dt className="font-extrabold text-saffron-dark">Controleer</dt><dd className="mt-1 text-charcoal/62">{mode.check}</dd></div></dl></article>;
              })}
            </div>
          </div>
        </section>

        <section id="vergelijken" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Snelle beslismatrix" title="Wat past bij jouw reisdag?" description="Dit is een startpunt, geen dienstregeling. Controleer voor elke vertrekdatum de actuele aanbieder, terminal en aansluiting." />
            <div className="mt-10 overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <div className="hidden grid-cols-[1fr_1fr_1.35fr_1.35fr] gap-5 bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white lg:grid"><span>Situatie</span><span>Eerste keuze</span><span>Waarom</span><span>Let op</span></div>
              <div className="divide-y divide-jade/10">{content.decisionRows.map((row) => <div key={row.situation} className="grid gap-4 px-5 py-6 text-xs lg:grid-cols-[1fr_1fr_1.35fr_1.35fr] lg:px-6"><strong className="font-display text-xl font-semibold text-jade">{row.situation}</strong><div><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark lg:hidden">Eerste keuze</span>{row.firstChoice}</div><div><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark lg:hidden">Waarom</span>{row.why}</div><div className="text-charcoal/58"><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark lg:hidden">Let op</span>{row.watch}</div></div>)}</div>
            </div>
          </div>
        </section>

        <section id="routes" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Veel gekozen trajecten" title="Begin bij de route, niet bij het voertuig." description="De tijden hieronder zijn indicatieve bandbreedtes uit onze routedataset. Open de routegids en controleer daarna de actuele vertrektijd voor jouw datum." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredRoutes.map((route) => <Link key={route.slug} href={`/transport/${route.slug}/`} className="group rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift"><div className="flex items-center justify-between"><MapPinned size={19} className="text-saffron-dark" /><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-charcoal/45">{route.distance}</span></div><h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-[0.95] text-jade">{cityName(route.from)} <span className="text-saffron">→</span> {cityName(route.to)}</h2><p className="mt-4 text-xs font-medium text-charcoal/58">Indicatief vanaf {firstDuration(route)}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Vergelijk de route <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span></Link>)}
            </div>
          </div>
        </section>

        <section id="boeken" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative min-h-[430px] overflow-hidden"><Image src="/images/cities/surat thani/attractions/Koh Samui Ferry Terminal.webp" alt="Ferryterminal voor de overtocht naar Koh Samui" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/15 to-transparent" /><div className="absolute bottom-8 left-8 right-8"><p className="eyebrow !text-saffron-light">Boek zonder kwetsbare aansluiting</p><h2 className="font-display text-[3.3rem] font-semibold leading-[0.88]">Eén route.<br />Alle stappen.</h2></div></div>
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="grid gap-5 sm:grid-cols-2">{content.planningSteps.map((step, index) => { const icons = [Clock3, MapPinned, CalendarCheck, TicketCheck]; const Icon = icons[index]; return <article key={step.title} className="rounded-2xl border border-white/12 bg-white/[0.06] p-5"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/35 text-saffron-light"><Icon size={18} /></span><h3 className="mt-4 font-display text-2xl font-semibold leading-none">{step.title}</h3><p className="mt-3 text-xs font-medium leading-5 text-white/67">{step.text}</p></article>; })}</div>
                <a href={withSubId(TWELVEGO_GENERIC, 'transport-nl-combi')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 min-h-12 px-6 text-saffron-dark">Vergelijk tickets op 12Go <ExternalLink size={15} /></a>
                <AffiliateDisclosure className="mt-3 !text-white/48">Affiliate-link. 12Go toont ticketaanbieders; de uitvoerder en voorwaarden verschillen per traject. Controleer dit vóór betaling.</AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Voor vertrek" title="Veelgestelde vragen over vervoer in Thailand" description="Deze vragen zijn vastgelegd in Nederlandse DataForSEO- en zichtbare Google-resultaten. Antwoorden gebruiken actuele routeprijzen als variabele en vermijden schijnprecisie." items={[...content.faqs]} />

        <RelatedGuidesSection eyebrow="Bouw je route" title="Plan de rest van je reis" guides={[
          { title: 'Vliegen naar Bangkok', description: 'Vergelijk aankomstluchthaven, vervolgroute en actuele vluchtopties zonder vaste prijsclaim.', href: '/flights-to-bangkok/', image: '/images/blog/bangkok-airport-transfer-guide-2026.webp', imageAlt: 'Aankomst en vervolgvervoer bij een luchthaven van Bangkok' },
          { title: 'Thailand reisroutes', description: 'Kies een logische lijn met minder verplaatsingen.', href: '/itineraries/', image: '/images/redesign/krabi-destination-hero.webp', imageAlt: 'Route door het landschap van Thailand' },
          { title: 'Mooiste plekken', description: 'Bepaal welke bestemmingen echt bij jouw tempo passen.', href: '/city/', image: '/images/redesign/destination-chiang-mai.webp', imageAlt: 'Tempel en landschap in Chiang Mai' },
          { title: 'Praktische informatie', description: 'Geld, veiligheid, paklijst en lokale etiquette.', href: '/practical-info/', image: '/images/blog/bangkok-airport-transfer-guide-2026.webp', imageAlt: 'Reiziger onderweg vanaf een luchthaven in Thailand' },
        ]} />

        <SourceMethodSection eyebrow="Bronnen & actualiteit" title="Hoe deze vervoersgids is opgebouwd" description="De zoekintentie en concurrenten zijn met DataForSEO vastgelegd; de actuele Nederlandse SERP en echte PAA-vragen zijn op 30 juli 2026 zichtbaar herbeoordeeld. Voor treinreserveringen verwijzen we naar de officiële SRT-kanalen. Routeprijzen en dienstregelingen worden niet als vaste feiten in de tekst gezet." sources={[...content.sources]} />
      </div>
    </>
  );
}
