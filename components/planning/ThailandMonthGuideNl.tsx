import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CloudRain,
  ExternalLink,
  Luggage,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Sun,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { KLOOK_GENERIC, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import {
  MONTH_SLUGS_NL,
  thailandMonthGuidesNl,
  type MonthSlugNl,
  type ThailandMonthGuideNl,
} from '../../data/thailand-month-guides.nl';

interface ThailandMonthGuideNlProps {
  slug: MonthSlugNl;
  previousMonth: string | null;
  nextMonth: string | null;
}

const navItems: PageSectionNavItem[] = [
  { href: '#keuze', label: 'Kort advies', icon: Sparkles },
  { href: '#regios', label: 'Per regio', icon: MapPinned },
  { href: '#route', label: 'Route kiezen', icon: CalendarDays },
  { href: '#inpakken', label: 'Inpakken', icon: Luggage },
  { href: '#vragen', label: 'Vragen', icon: ShieldCheck },
];

const monthLabels = Object.fromEntries(
  MONTH_SLUGS_NL.map((slug) => [slug, thailandMonthGuidesNl[slug].month]),
) as Record<MonthSlugNl, string>;

function buildFaqs(guide: ThailandMonthGuideNl) {
  return [
    {
      question: `Is ${guide.month} een goede maand voor Thailand?`,
      answer: `${guide.verdict}. De juiste keuze hangt vooral af van je regio, kust, tempo en flexibiliteit. ${guide.caution}`,
    },
    {
      question: `Waar kun je het beste naartoe in Thailand in ${guide.month}?`,
      answer: `${guide.bestFor}. Vergelijk de drie regioblokken op deze pagina en controleer vlak voor vertrek de actuele weerswaarschuwingen, bereikbaarheid en eventuele park- of veerwijzigingen.`,
    },
    {
      question: `Welke kust kies je in ${guide.month}?`,
      answer: guide.coastChoice,
    },
    {
      question: `Wat neem je mee naar Thailand in ${guide.month}?`,
      answer: `${guide.packing.join(', ')}. Stem je uiteindelijke uitrusting af op de concrete bestemming en activiteit; een maandgemiddelde vervangt geen lokale verwachting.`,
    },
    {
      question: `Moet je vroeg boeken voor Thailand in ${guide.month}?`,
      answer: 'Boek belangrijke verbindingen en schaarse verblijven eerder wanneer je aan schoolvakanties of een groot evenement vastzit. Vergelijk altijd de actuele totaalprijs, exacte locatie, annuleringsvoorwaarden en laatste transfer; deze gids toont bewust geen vluchtige vanafprijzen.',
    },
  ];
}

function schemas(guide: ThailandMonthGuideNl) {
  const canonical = `https://go2-thailand.com/nl/thailand-in/${guide.slug}/`;
  const faqs = buildFaqs(guide);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      url: canonical,
      image: `https://go2-thailand.com${guide.hero}`,
      inLanguage: 'nl-NL',
      dateModified: '2026-07-31',
      author: { '@type': 'Organization', name: 'Go2Thailand' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand' },
      about: [
        { '@type': 'Place', name: 'Thailand' },
        { '@type': 'Thing', name: `Reizen in ${guide.month}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Weer & reistijd', item: 'https://go2-thailand.com/nl/weather/' },
        { '@type': 'ListItem', position: 3, name: `Thailand in ${guide.month}`, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];
}

function MonthPager({ current, previousMonth, nextMonth }: { current: MonthSlugNl; previousMonth: string | null; nextMonth: string | null }) {
  return (
    <nav aria-label="Andere maanden" className="section-divider-bottom bg-canvas">
      <div className="container-custom flex items-center justify-between gap-3 py-5 text-xs font-extrabold text-jade">
        {previousMonth ? (
          <Link href={`/thailand-in/${previousMonth}/`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-jade/10 bg-white px-4 transition hover:border-saffron/40">
            <ArrowRight size={14} aria-hidden="true" className="rotate-180 text-saffron-dark" />
            <span className="hidden sm:inline">Vorige:</span> {monthLabels[previousMonth as MonthSlugNl]}
          </Link>
        ) : <span />}
        <Link href="/weather/" className="hidden text-charcoal/65 transition hover:text-jade sm:inline">Alle maanden</Link>
        {nextMonth ? (
          <Link href={`/thailand-in/${nextMonth}/`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-jade/10 bg-white px-4 transition hover:border-saffron/40">
            <span className="hidden sm:inline">Volgende:</span> {monthLabels[nextMonth as MonthSlugNl]}
            <ArrowRight size={14} aria-hidden="true" className="text-saffron-dark" />
          </Link>
        ) : <span />}
      </div>
      <div className="container-custom scrollbar-hide flex snap-x gap-2 overflow-x-auto pb-5">
        {MONTH_SLUGS_NL.map((slug) => (
          <Link
            key={slug}
            href={`/thailand-in/${slug}/`}
            aria-current={slug === current ? 'page' : undefined}
            className={`min-h-10 shrink-0 snap-start rounded-full border px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.09em] transition ${slug === current ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-charcoal/65 hover:border-saffron/40 hover:text-jade'}`}
          >
            {monthLabels[slug]}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function ThailandMonthGuideNl({ slug, previousMonth, nextMonth }: ThailandMonthGuideNlProps) {
  const guide = thailandMonthGuidesNl[slug];
  const faqs = buildFaqs(guide);
  const subId = `nl-thailand-${slug}`;
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'region-hotels');
  const activityHref = withPlacementSubId(KLOOK_GENERIC, subId, 'activities');

  return (
    <main className="bg-canvas" data-premium-template="thailand-month-guide-nl" data-month-owner={slug}>
      <SEOHead title={guide.title} description={guide.description} ogImage={`https://go2-thailand.com${guide.hero}`}>
        {schemas(guide).map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <EditorialHero
        image={guide.hero}
        imageAlt={guide.heroAlt}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Weer & reistijd', href: '/weather/' },
          { label: `Thailand in ${guide.month}` },
        ]}
        eyebrow="Kies op regio, niet op maandgemiddelde"
        title={<>Thailand in<br />{guide.month}</>}
        subtitle={guide.verdict}
        description={guide.description}
        actions={[
          { label: 'Bekijk het korte advies', href: '#keuze', kind: 'primary' },
          { label: 'Vergelijk alle maanden', href: '/weather/', kind: 'secondary' },
        ]}
        minHeightClassName="min-h-[740px] lg:min-h-[680px]"
        contentClassName="max-w-[720px]"
        titleClassName="max-w-[720px] text-[4rem] leading-[.84] sm:text-[5.3rem] lg:text-[5.9rem]"
        imageClassName="object-cover object-[66%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,.72)_0%,rgba(252,250,246,.88)_52%,rgba(252,250,246,.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,.98)_0%,rgba(252,250,246,.92)_39%,rgba(252,250,246,.26)_69%,rgba(7,43,35,.08)_100%)]"
        decorativeOverlay={(
          <div aria-hidden="true" className="absolute right-[8%] top-[23%] hidden h-32 w-32 rounded-full border border-saffron/30 lg:block">
            <Sun className="absolute -left-5 top-11 text-saffron" size={38} strokeWidth={1.3} />
          </div>
        )}
      />
      <PageSectionNav label={`Op deze pagina over ${guide.month}`} items={navItems} />
      <MonthPager current={slug} previousMonth={previousMonth} nextMonth={nextMonth} />

      <section id="keuze" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <SectionHeading
            eyebrow="Het nuttige korte antwoord"
            title={<>Past {guide.month}<br />bij jouw reis?</>}
            description={guide.caution}
          />
          <div className="relative overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-card lg:p-10">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
            <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-saffron-light">Ons oordeel</p>
            <p className="mt-4 max-w-[760px] font-display text-[2.45rem] font-semibold leading-[.96] sm:text-[3.25rem]">{guide.verdict}.</p>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-3">
              {[
                ['Seizoen', guide.season],
                ['Weersignaal', guide.signal],
                ['Beste match', guide.bestFor],
              ].map(([label, value]) => (
                <div key={label} className="bg-white/[.055] p-5">
                  <dt className="text-[8px] font-extrabold uppercase tracking-[.13em] text-saffron-light">{label}</dt>
                  <dd className="mt-2 text-xs font-medium leading-5 text-white/72">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="regios" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading eyebrow="Drie verschillende reizen" title={<>Thailand in {guide.month}<br />per regio</>} />
            <p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/66">Een landelijk weericoon is te grof voor een reisbeslissing. Kijk apart naar boven-Thailand, Bangkok en centraal Thailand, en de twee zuidelijke kustpatronen. Controleer daarna de korte-termijnverwachting.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {guide.regions.map((region, index) => (
              <article key={region.title} className={`flex min-h-[330px] flex-col rounded-2xl border p-7 shadow-editorial-card ${index === 1 ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-jade'}`}>
                <div className="flex items-center justify-between">
                  {index === 2 ? <Waves size={25} className="text-saffron" /> : index === 1 ? <Sun size={25} className="text-saffron-light" /> : <CloudRain size={25} className="text-saffron-dark" />}
                  <span className={`text-[9px] font-extrabold uppercase tracking-[.14em] ${index === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{region.label}</span>
                </div>
                <h3 className="mt-8 font-display text-[2.15rem] font-semibold leading-none">{region.title}</h3>
                <p className={`mt-5 text-sm font-medium leading-7 ${index === 1 ? 'text-white/68' : 'text-charcoal/66'}`}>{region.copy}</p>
                <p className={`mt-auto border-t pt-5 text-[10px] font-extrabold leading-5 ${index === 1 ? 'border-white/12 text-saffron-light' : 'border-jade/10 text-jade'}`}>Past bij: {region.fit}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs font-medium leading-6 text-charcoal/58">Klimaat is geen voorspelling. Controleer voor vertrek de actuele waarschuwingen van de Thai Meteorological Department en de status van veerboten, parken en activiteiten.</p>
        </div>
      </section>

      <section id="route" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.67fr_1.33fr]">
          <div>
            <SectionHeading eyebrow="Van maand naar route" title={<>Drie manieren<br />om te kiezen</>} description={guide.rhythm} />
            <svg aria-hidden="true" viewBox="0 0 360 110" className="mt-8 hidden h-24 w-full max-w-sm text-saffron lg:block">
              <path d="M8 72 C70 18 94 101 160 54 S267 21 350 70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" />
              <circle cx="8" cy="72" r="5" fill="currentColor" /><circle cx="160" cy="54" r="4" fill="currentColor" /><circle cx="350" cy="70" r="5" fill="currentColor" />
            </svg>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {guide.choices.map((choice, index) => (
              <article key={choice.title} className="flex min-h-[300px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-tonal font-display text-lg font-semibold text-saffron-dark">0{index + 1}</span>
                <h3 className="mt-7 font-display text-[1.8rem] font-semibold leading-none text-jade">{choice.title}</h3>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{choice.copy}</p>
                <p className="mt-auto border-t border-jade/10 pt-5 text-[10px] font-extrabold leading-5 text-jade">{choice.rule}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-jade py-14 text-white lg:py-20">
        <div className="container-custom grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <p className="eyebrow !text-saffron-light">De kustbeslissing</p>
            <h2 className="font-display text-[3.25rem] font-semibold leading-[.9]">Andaman of Golf<br />in {guide.month}?</h2>
          </div>
          <div className="rounded-[24px] border border-white/12 bg-white/[.055] p-7 lg:p-9">
            <Waves size={28} className="text-saffron-light" />
            <p className="mt-5 font-display text-[2rem] font-semibold leading-[1.05]">{guide.coastChoice}</p>
            <Link href="/weather/" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Vergelijk de weerregio’s <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section id="inpakken" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <SectionHeading eyebrow="Slim inpakken" title={<>Wat neem je mee<br />in {guide.month}?</>} description="Neem mee wat je concrete route oplost. Een product vervangt geen actuele weers-, terrein- of veiligheidscheck." />
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {guide.packing.map((item) => (
                <div key={item} className="flex min-h-20 items-center gap-4 rounded-xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tonal text-jade"><Check size={17} aria-hidden="true" /></span>
                  <span className="text-sm font-extrabold text-jade">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-saffron/20 bg-[#fff5e8] p-5">
              <p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">Kalendernotitie</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-jade">{guide.event.title}</h3>
              <p className="mt-3 text-xs font-medium leading-6 text-charcoal/68">{guide.event.copy}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
        <div className="container-custom grid gap-9 lg:grid-cols-[.72fr_1.28fr]">
          <SectionHeading eyebrow="Pas boeken na de regiokeuze" title={<>Controleer de actuele<br />optie en voorwaarden</>} description="We tonen bewust geen vaste vanafprijzen. Beschikbaarheid, belastingen, bagage, annuleringsregels en de laatste transfer veranderen per datum en aanbieder." />
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card transition hover:border-saffron/35">
              <MapPinned size={24} className="text-jade" />
              <h3 className="mt-6 font-display text-[1.85rem] font-semibold leading-none text-jade">Verblijven per regio</h3>
              <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">Vergelijk op exacte locatie, reisdata, totaalprijs en annuleringsvoorwaarden op Trip.com.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">Controleer actuele verblijven <ExternalLink size={14} /></span>
            </a>
            <a href={activityHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group rounded-2xl border border-jade/10 bg-jade p-7 text-white shadow-editorial-card">
              <CalendarDays size={24} className="text-saffron-light" />
              <h3 className="mt-6 font-display text-[1.85rem] font-semibold leading-none">Activiteiten die bij de maand passen</h3>
              <p className="mt-4 text-xs font-medium leading-6 text-white/65">Vergelijk op operator, ophaalzone, fysieke belasting, inclusies en weerbeleid op Klook.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Bekijk actuele opties <ExternalLink size={14} /></span>
            </a>
            <AffiliateDisclosure className="sm:col-span-2">Trip.com en Klook zijn affiliatepartners. We kunnen commissie ontvangen zonder extra kosten voor jou. De redactionele regiokeuze staat los van betaling of positie.</AffiliateDisclosure>
          </div>
        </div>
      </section>

      <FaqSplitSection
        items={faqs}
        eyebrow="Praktische antwoorden"
        title={`Veelgestelde vragen over ${guide.month}`}
        description="Dit zijn redactionele beslisvragen, geen verzonnen Google People Also Ask-data. Controleer actuele omstandigheden bij de officiële bron."
      />

      <RelatedGuidesSection
        eyebrow="Bouw je reis verder"
        title="Van maandkeuze naar een concrete route"
        guides={[
          { title: 'Weer in Thailand', description: 'Vergelijk de seizoenen en de twee kustpatronen voordat je een regio vastzet.', href: '/weather/', image: '/images/redesign/thailand-weather-hub-hero.webp', imageAlt: 'Weerregio’s van Thailand' },
          { title: 'Beste reistijd', description: 'Leg weer, drukte en reisstijl naast elkaar voor je definitieve maandkeuze.', href: '/thailand-index/best-time/', image: '/images/redesign/best-time-thailand-hero-v2.webp', imageAlt: 'Beste reistijd voor Thailand' },
          { title: 'Thailand voor het eerst', description: 'Plan een haalbare route met minder hotelwissels en duidelijke keuzes.', href: '/thailand-for-first-timers/', image: '/images/redesign/first-time-thailand-hero.webp', imageAlt: 'Eerste reis naar Thailand plannen' },
        ]}
      />

      <SourceMethodSection
        title="Klimaat helpt kiezen. Het voorspelt jouw reisdag niet."
        description="Deze familie gebruikt kwalitatieve klimaatpatronen en vermijdt vaste prijzen, gegarandeerde zon, universele kustclaims en niet-gecontroleerde festivaldata. Laatst redactioneel gecontroleerd op 31 juli 2026."
        method="DataForSEO-credits waren uitgeput. Alle twaalf intents zijn daarom afzonderlijk kwalitatief getoetst aan actuele openbare webresultaten. Deze pagina’s claimen geen zoekvolume, KD, organische positie, volledige SERP-dekking of echte People Also Ask-vragen. De queries, bronnen en ownergrenzen staan in het familie-audit en researchdossier."
        sources={[
          { title: 'Seizoenen van Thailand', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/info/%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B8%81%E0%B8%B2%E0%B8%A5%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2', note: 'Primaire uitleg van hete, natte en koelere seizoenen en de verschuivende moesson.' },
          { title: 'Seasonal forecast portal', creator: 'Thai Meteorological Department', url: 'https://weather.tmd.go.th/seasonal/index.html', note: 'Actuele en experimentele lange-termijninformatie; niet gebruikt als garantie voor een reisdag.' },
          { title: 'Thailand climate & weather', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Plan-Your-Trip/Weather', note: 'Officiële toeristische context voor regionale seizoensverschillen.' },
        ]}
      />
    </main>
  );
}
