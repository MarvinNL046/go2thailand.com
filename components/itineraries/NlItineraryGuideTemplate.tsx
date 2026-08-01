import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  CalendarRange,
  Check,
  Compass,
  ExternalLink,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Tickets,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import type { NlItineraryGuide } from '../../data/itineraries/nl-guides';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface Props {
  guide: NlItineraryGuide;
}

const bookingCards = [
  {
    key: 'hotel',
    icon: BedDouble,
    title: 'Slaap per basis, niet per checklist',
    copy: 'Vergelijk actuele hotels rond de wijk, terminal of pier die jouw route werkelijk gebruikt.',
    label: 'Bekijk actuele hotels',
    provider: 'Trip.com',
    url: TRIP_GENERIC,
  },
  {
    key: 'transport',
    icon: Tickets,
    title: 'Controleer de hele vervoersketen',
    copy: 'Vergelijk vertrekpunt, aankomstpunt, bagage en voorwaarden; een ticketnaam is nog geen deur-tot-deurroute.',
    label: 'Bekijk actuele verbindingen',
    provider: '12Go',
    url: TWELVEGO_GENERIC,
  },
  {
    key: 'activity',
    icon: Compass,
    title: 'Boek alleen de uitvoerbare dag',
    copy: 'Controleer pickupzone, annuleringsvoorwaarden, parktoegang en actuele weers- of zeeconditie.',
    label: 'Bekijk actuele activiteiten',
    provider: 'Klook',
    url: KLOOK_GENERIC,
  },
];

export function NlItineraryGuideTemplate({ guide }: Props) {
  const subId = useSubId();
  const isIslandRoute = guide.slug === '3-days-islands';
  const baseSummary = guide.bases.length === 1 ? 'Eén vaste basis' : `${guide.bases.length} vaste bases`;
  const pageUrl = `https://go2-thailand.com/nl/itineraries/${guide.slug}/`;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      image: `https://go2-thailand.com${guide.heroImage}`,
      url: pageUrl,
      inLanguage: 'nl-NL',
      author: { '@type': 'Organization', name: 'GO2 Thailand', url: 'https://go2-thailand.com/nl/' },
      publisher: { '@type': 'Organization', name: 'GO2 Thailand', url: 'https://go2-thailand.com/nl/' },
      about: { '@type': 'Country', name: 'Thailand' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Dagindeling voor ${guide.title}`,
      numberOfItems: guide.days.length,
      itemListElement: guide.days.map((day, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `Dag ${day.day}: ${day.title}`,
        description: `${day.focus} ${day.decision}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Reisroutes', item: 'https://go2-thailand.com/nl/itineraries/' },
        { '@type': 'ListItem', position: 3, name: guide.title, item: pageUrl },
      ],
    },
  ];

  return <>
    <SEOHead title={guide.title} description={guide.description} ogImage={`https://go2-thailand.com${guide.heroImage}`}>
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>

    <div data-premium-template="nl-itinerary-guide" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero
        image={guide.heroImage}
        imageAlt={guide.heroAlt}
        breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisroutes', href: '/itineraries/' }, { label: guide.duration }]}
        eyebrow={guide.eyebrow}
        title={<>{guide.heroTitle}<br /> <span className="text-saffron-dark">{guide.heroAccent}.</span></>}
        subtitle={guide.subtitle}
        description={guide.intro}
        actions={[
          { label: 'Bekijk de dagindeling', href: '#dagindeling', kind: 'primary' },
          { label: 'Check actueel vervoer', href: withPlacementSubId(TWELVEGO_GENERIC, subId, `${guide.slug}-hero-transport`), kind: 'secondary', newTab: true, affiliate: true },
        ]}
        disclosure="De vervoerknop is een gesponsorde 12Go-link. Controleer actuele vertrekpunten, voorwaarden en de volledige aansluiting."
        sideCard={<aside className="absolute bottom-8 right-[max(1.25rem,calc((100vw-1200px)/2))] hidden w-[290px] rounded-2xl border border-white/45 bg-white/88 p-5 text-jade shadow-[0_18px_50px_rgba(18,63,54,0.18)] backdrop-blur-md lg:block">
          <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-saffron-dark">In één oogopslag</p>
          <p className="mt-3 font-display text-[1.8rem] font-semibold leading-none">{guide.title}</p>
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-jade/10 pt-4">
            {[[guide.duration, 'duur'], [guide.network, 'kust'], [guide.moves, 'tempo']].map(([value, label]) => <div key={label}><p className="text-[9px] font-extrabold uppercase tracking-[.12em] text-charcoal/45">{label}</p><p className="mt-1 text-[11px] font-extrabold leading-4 text-jade">{value}</p></div>)}
          </div>
          <p className="mt-4 text-[11px] font-medium leading-5 text-charcoal/65">{baseSummary}, één hoofdkeuze per dag en ruimte om het plan aan te passen aan weer, energie en vervoer.</p>
        </aside>}
        imageClassName="object-cover object-[68%_center]"
      />

      <PageSectionNav items={[
        { href: '#opbouw', label: 'Routeopbouw', icon: MapPinned },
        { href: '#dagindeling', label: 'Per dag', icon: CalendarRange },
        { href: '#flexibel', label: 'Flexibel plan', icon: Sparkles },
        { href: '#boeken', label: 'Boeken', icon: Tickets },
        { href: '#vragen', label: 'Vragen', icon: ShieldCheck },
      ]} />

      <section id="opbouw" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading eyebrow="Eerst de hotelbases" title="De route werkt vanuit vaste ankers." description="Een hotelwissel kost meer dan de rit alleen. Deze indeling telt checkout, terminal, wachttijd en de laatste transfer bewust mee." />
            <div className="grid grid-cols-3 gap-3">
              {[['Duur', guide.duration], ['Netwerk', guide.network], ['Tempo', guide.moves]].map(([label, value]) => <div key={label} className="rounded-xl border border-jade/10 bg-tonal p-4"><p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">{label}</p><p className="mt-2 text-xs font-extrabold leading-5 text-jade sm:text-sm">{value}</p></div>)}
            </div>
          </div>
          <div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="pointer-events-none absolute left-8 right-8 top-8 hidden border-t-2 border-dashed border-saffron/45 xl:block" aria-hidden="true" />
            {guide.bases.map((base, index) => <Link key={`${base.title}-${index}`} href={base.href} className="group relative flex min-h-64 flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1">
              <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-saffron text-xs font-black text-jade shadow-sm">{index + 1}</span>
              <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">{base.nights}</p>
              <h2 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{base.title}</h2>
              <p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{base.role}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-extrabold text-jade">Bekijk de bestemming <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" /></span>
            </Link>)}
          </div>
        </div>
      </section>

      <section id="dagindeling" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[.62fr_1.38fr]">
          <div className="lg:sticky lg:top-28 lg:self-start"><SectionHeading eyebrow="Dag voor dag" title="Iedere dag krijgt één hoofdtaak." description="De beslisregel is belangrijker dan een dichtgetimmerd tijdschema. Zo kan de route bewegen zonder dat alle hotelbases verschuiven." /></div>
          <ol className="relative space-y-4 before:absolute before:bottom-7 before:left-[1.4rem] before:top-7 before:border-l-2 before:border-dashed before:border-saffron/45">
            {guide.days.map((day, index) => <li key={`${day.day}-${day.title}`} className={`relative grid gap-4 rounded-2xl border p-5 pl-16 sm:grid-cols-[.82fr_1.18fr] sm:p-6 sm:pl-20 ${day.flex ? 'border-saffron/35 bg-[#fff8eb]' : 'border-jade/10 bg-white'}`}>
              <span className={`absolute left-3 top-5 z-10 grid h-8 w-8 place-items-center rounded-full text-[10px] font-black shadow-sm sm:left-5 ${day.flex ? 'bg-saffron text-jade' : 'bg-jade text-white'}`}>{index + 1}</span>
              <div><p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">Dag {day.day} · {day.base}</p><h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-none text-jade">{day.title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/66">{day.focus}</p></div>
              <div className="flex items-start gap-3 rounded-xl bg-tonal/75 p-4"><Compass size={17} className="mt-0.5 shrink-0 text-saffron-dark" /><div><p className="text-[9px] font-extrabold uppercase tracking-[.12em] text-jade/55">Beslismoment</p><p className="mt-2 text-xs font-bold leading-5 text-jade">{day.decision}</p></div></div>
            </li>)}
          </ol>
        </div>
      </section>

      <section id="flexibel" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Reserveplan is onderdeel van de route" title="Zo blijft de reis overeind." description="Weer, luchtkwaliteit, parktoegang, zee en eigen energie zijn geen voetnoten. Wissel de dagtaak; behoud zo mogelijk dezelfde hotelbasis." />
          <div className="mt-9 grid gap-5 md:grid-cols-3">{guide.flexCards.map((card, index) => <article key={card.title} className="relative overflow-hidden rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="absolute -right-4 -top-8 font-display text-[7rem] font-semibold text-tonal">0{index + 1}</span><Sparkles size={22} className="relative text-saffron-dark" /><h3 className="relative mt-7 font-display text-[1.9rem] font-semibold leading-none text-jade">{card.title}</h3><p className="relative mt-4 text-xs font-medium leading-6 text-charcoal/65">{card.copy}</p><p className="relative mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold uppercase tracking-[.1em] text-jade">{card.rule}</p></article>)}</div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-jade text-white lg:grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="p-7 lg:p-9"><p className="eyebrow !text-saffron">Overgangen</p><h2 className="font-display text-[2.7rem] font-semibold leading-[.92]">Maak van iedere wissel een keten.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/66">Noteer hotelcheckout, vertrekterminal, hoofdticket, aankomstterminal en laatste transfer apart. Bescherm losse tickets met extra marge.</p></div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-3">{guide.handoffs.map((handoff, index) => <div key={handoff.title} className="bg-jade p-7"><Route size={21} className="text-saffron" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[.13em] text-white/45">Overgang {index + 1}</p><h3 className="mt-2 font-display text-[1.45rem] font-semibold leading-none">{handoff.title}</h3><p className="mt-4 text-xs font-medium leading-5 text-white/62">{handoff.copy}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section id="boeken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Pas na de routekeuze" title="Controleer de actuele uitvoering." description="We tonen geen schijnzekerheid met vaste voorbeeldprijzen. Open de aanbieder, controleer het actuele totaal en vergelijk voorwaarden vóór je boekt." />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">{bookingCards.map(({ key, icon: Icon, title, copy, label, provider, url }) => <article key={key} className="flex flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-jade/10 bg-tonal text-jade"><Icon size={21} /></span><h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{copy}</p><a href={withPlacementSubId(url, subId, `${guide.slug}-${key}`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group mt-6 w-fit">{label} <ExternalLink size={14} className="text-saffron" /></a><AffiliateDisclosure className="mt-3">Gesponsorde link naar {provider}. Beschikbaarheid, prijs en voorwaarden kunnen wijzigen.</AffiliateDisclosure></article>)}</div>
          <div className="mt-8 grid gap-3 rounded-2xl border border-jade/10 bg-white p-6 sm:grid-cols-3">{['Controleer de exacte terminal of pier', 'Vergelijk het totaal inclusief bagage en transfer', 'Bewaar een land- of rustalternatief'].map((item) => <p key={item} className="flex items-start gap-3 text-xs font-bold leading-5 text-jade"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-tonal"><Check size={13} className="text-saffron-dark" /></span>{item}</p>)}</div>
        </div>
      </section>

      <FaqSplitSection id="vragen" eyebrow="Voor vertrek beslissen" title={isIslandRoute ? 'Vragen over drie dagen aan de Thaise kust' : `Vragen over ${guide.duration.toLowerCase()} Thailand`} description="De antwoorden bewaken routehaalbaarheid en verwijzen veranderlijke openingstijden, prijzen, documenten en condities bewust naar de actuele bron." items={guide.faqs} />
      <RelatedGuidesSection eyebrow="Maak de route van jou" title="Open de volgende beslislaag" guides={guide.related} />
      <SourceMethodSection title="Een routekader, geen dienstregeling" description="Deze gids is samengesteld uit Nederlands zoekintentieonderzoek, zichtbare Google-vragen, bestaande sitegegevens en primaire Thaise of Nederlandse bronnen. Controleer vlak voor vertrek actuele dienstregelingen, parkstatus, weer, zee en reisadvies." sources={[
        { title: 'Bestemmingen en actuele reiscontext', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations', note: 'Officiële bestemming- en regiocontext als startpunt voor de route.' },
        { title: 'Weer, waarschuwingen en kustcondities', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Actuele weersverwachting en waarschuwingen per gebied.' },
        { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele veiligheids-, grens- en documentcontext voor Nederlandse reizigers.' },
      ]} />
    </div>
  </>;
}
