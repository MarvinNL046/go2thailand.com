import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarRange, Compass, ExternalLink, Map, Route, ShieldCheck, Sparkles } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { nlItineraryGuides } from '../../data/itineraries/nl-guides';
import { TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

type DurationFilter = 'all' | '3' | '5' | '7' | '10' | '14';
type RouteFilter = 'all' | 'city' | 'north' | 'coast' | 'complete';

const guides = Object.values(nlItineraryGuides);

const durationOptions: Array<{ value: DurationFilter; label: string }> = [
  { value: 'all', label: 'Alle routes' },
  { value: '3', label: '3 dagen' },
  { value: '5', label: '5 dagen' },
  { value: '7', label: '7 dagen' },
  { value: '10', label: '10 dagen' },
  { value: '14', label: '2 weken' },
];

const routeOptions: Array<{ value: RouteFilter; label: string }> = [
  { value: 'all', label: 'Elk netwerk' },
  { value: 'city', label: 'Stad & centraal' },
  { value: 'north', label: 'Noord' },
  { value: 'coast', label: 'Kust & eilanden' },
  { value: 'complete', label: 'Meerdere regio’s' },
];

const tags: Record<RouteFilter, string[]> = {
  all: [],
  city: ['bangkok', 'central'],
  north: ['northern'],
  coast: ['islands', 'southern', 'beach'],
  complete: ['north-south', 'adventure', 'complete', 'mekong'],
};

const faqs = [
  { question: 'Wat is een goede reisroute door Thailand?', answer: 'Een goede route gebruikt weinig hotelbases, groepeert plaatsen per vervoersnetwerk en geeft lange overgangen een eigen reisdag. Voor een eerste reis zijn Bangkok, één noordbasis en één zuidelijke kust een sterke lijn wanneer de reisduur dat toelaat.' },
  { question: 'Hoeveel dagen heb je nodig voor Thailand?', answer: 'Drie tot vijf dagen vraagt één regio. Zeven dagen past bij twee bases binnen één logisch netwerk. Tien dagen kan drie bases dragen; twee weken geeft ruimte aan drie tot vier bases en echte buffers.' },
  { question: 'Wat kost een reisroute door Thailand?', answer: 'Dat hangt af van actuele vluchten, hotels, vervoer, periode en activiteiten. Daarom tonen deze routes geen vaste totaalprijs: vergelijk actuele opties per hotelbasis en bereken de volledige vervoersketen.' },
  { question: 'Kun je Noord- en Zuid-Thailand combineren?', answer: 'In tien dagen kan dat met maximaal drie bases en een directe lange overgang. Met twee weken ontstaat meer herstelruimte. Korter dan tien dagen is één regio of kustnetwerk meestal sterker.' },
  { question: 'Moet je alles vooraf boeken?', answer: 'Leg kwetsbare lange verbindingen, de eerste nachten en seizoensgevoelige overtochten tijdig vast. Houd weersafhankelijke activiteiten flexibel en controleer vlak voor vertrek de uitvoerder en voorwaarden.' },
];

function durationKey(slug: string): DurationFilter {
  if (slug.startsWith('3-days')) return '3';
  if (slug.startsWith('5-days')) return '5';
  if (slug.startsWith('7-days')) return '7';
  if (slug.startsWith('10-days')) return '10';
  if (slug.startsWith('14-days')) return '14';
  return 'all';
}

export function NlItinerariesDirectory() {
  const [duration, setDuration] = useState<DurationFilter>('all');
  const [network, setNetwork] = useState<RouteFilter>('all');
  const subId = useSubId();
  const visibleGuides = useMemo(() => guides.filter((guide) => {
    const durationMatches = duration === 'all' || durationKey(guide.slug) === duration;
    const networkMatches = network === 'all' || tags[network].some((tag) => guide.slug.includes(tag));
    return durationMatches && networkMatches;
  }), [duration, network]);
  const pageUrl = 'https://go2-thailand.com/nl/itineraries/';
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Thailand reisroutes', description: 'Vergelijk reisroutes door Thailand op duur, hotelbases, netwerk en aantal overgangen.', url: pageUrl, inLanguage: 'nl-NL', mainEntity: { '@type': 'ItemList', numberOfItems: guides.length, itemListElement: guides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `${pageUrl}${guide.slug}/` })) } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Reisroutes', item: pageUrl }] },
  ];

  return <>
    <SEOHead title="Thailand reisroutes: 3 dagen tot 2 weken" description="Vergelijk 14 Thailand-reisroutes van 3 dagen tot 2 weken. Kies op hotelbases, regio, overgangen en flexibel reistempo." ogImage="https://go2-thailand.com/images/redesign/thailand-route-hero.webp">
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div data-premium-template="nl-itineraries-directory" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-route-hero.webp" imageAlt="Trein en route door de verschillende landschappen van Thailand" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisroutes' }]} eyebrow="Eerst het ritme, dan de stops" title={<>Thailand<br /><span className="text-saffron-dark">reisroutes.</span></>} subtitle="Van drie dagen focus tot twee weken met ademruimte." description="Vergelijk routes op hotelbases, lange overgangen en reserveplannen. Niet op zoveel mogelijk pins in zo weinig mogelijk tijd." actions={[{ label: 'Vergelijk 14 routes', href: '#routes', kind: 'primary' }, { label: 'Zo kies je', href: '#kiezen', kind: 'secondary' }]} imageClassName="object-cover object-[65%_center]" />
      <PageSectionNav items={[{ href: '#kiezen', label: 'Kiezen', icon: Compass }, { href: '#routes', label: 'Alle routes', icon: Route }, { href: '#tempo', label: 'Reistempo', icon: CalendarRange }, { href: '#vragen', label: 'Vragen', icon: ShieldCheck }]} />

      <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><SectionHeading eyebrow="Routefilter" title="Hoeveel netwerk past in jouw tijd?" description="Kies eerst de duur en daarna het soort netwerk. Een route blijft sterker wanneer hotelbases rustpunten zijn in plaats van afvinklocaties." /><div className="rounded-2xl border border-jade/10 bg-tonal p-5 sm:p-7"><fieldset><legend className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">Reisduur</legend><div className="mt-3 flex flex-wrap gap-2">{durationOptions.map((option) => <button key={option.value} type="button" aria-pressed={duration === option.value} onClick={() => setDuration(option.value)} className={`rounded-xl border px-4 py-3 text-[10px] font-extrabold transition ${duration === option.value ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-jade hover:border-saffron/45'}`}>{option.label}</button>)}</div></fieldset><fieldset className="mt-6"><legend className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">Reisnetwerk</legend><div className="mt-3 flex flex-wrap gap-2">{routeOptions.map((option) => <button key={option.value} type="button" aria-pressed={network === option.value} onClick={() => setNetwork(option.value)} className={`rounded-xl border px-4 py-3 text-[10px] font-extrabold transition ${network === option.value ? 'border-saffron bg-[#fff3d8] text-jade' : 'border-jade/10 bg-white text-jade hover:border-saffron/45'}`}>{option.label}</button>)}</div></fieldset></div></div></section>

      <section id="routes" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Van basis naar basis" title="Kies de route die uitvoerbaar blijft." description={`${visibleGuides.length} van ${guides.length} routes passen bij de huidige filters.`} />{duration !== 'all' || network !== 'all' ? <button type="button" onClick={() => { setDuration('all'); setNetwork('all'); }} className="text-left text-xs font-extrabold text-jade underline decoration-saffron underline-offset-4">Wis filters</button> : null}</div>
        {visibleGuides.length ? <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visibleGuides.map((guide) => <Link key={guide.slug} href={`/itineraries/${guide.slug}/`} className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-52 overflow-hidden"><Image src={guide.heroImage} alt={guide.heroAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/70 via-transparent to-transparent" /><span className="absolute left-4 top-4 rounded-full bg-ivory/92 px-3 py-1.5 text-[9px] font-extrabold text-jade">{guide.duration}</span><p className="absolute bottom-4 left-4 right-4 text-[9px] font-extrabold uppercase tracking-[.13em] text-white">{guide.network}</p></div><div className="flex flex-1 flex-col p-6"><h2 className="font-display text-[2rem] font-semibold leading-[.95] text-jade">{guide.title}</h2><p className="mt-4 line-clamp-3 text-xs font-medium leading-6 text-charcoal/65">{guide.description}</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-lg bg-tonal px-2.5 py-1.5 text-[9px] font-extrabold text-jade">{guide.bases.length} bases</span><span className="rounded-lg bg-tonal px-2.5 py-1.5 text-[9px] font-extrabold text-jade">{guide.moves}</span></div><span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold text-jade">Open dagindeling <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" /></span></div></Link>)}</div> : <div className="mt-10 rounded-2xl border border-dashed border-jade/20 bg-white p-10 text-center"><Map className="mx-auto text-saffron-dark" /><h2 className="mt-4 font-display text-3xl font-semibold text-jade">Deze combinatie vraagt een ander tempo.</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-charcoal/65">Wis één filter of kies een langere reisduur. We tonen bewust geen route die te veel netwerken in te weinig dagen stopt.</p></div>}
      </div></section>

      <section id="tempo" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-9 lg:grid-cols-[.68fr_1.32fr] lg:items-center"><div><p className="eyebrow">De simpele bovengrens</p><h2 className="font-display text-[3.4rem] font-semibold leading-[.9] text-jade">Meer dagen betekent niet automatisch meer hotels.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Gebruik extra tijd eerst voor herstel, een flexdag en een lokale verdieping. Voeg pas daarna een nieuwe basis toe.</p></div><div className="grid gap-3 sm:grid-cols-4">{[['3–5', 'dagen', '1 basis'], ['7', 'dagen', '2 bases'], ['10', 'dagen', '3 bases'], ['14', 'dagen', '3–4 bases']].map(([number, unit, rule]) => <div key={number} className="rounded-2xl border border-jade/10 bg-white p-5 text-center shadow-editorial-card"><p className="font-display text-[3.2rem] font-semibold leading-none text-saffron-dark">{number}</p><p className="mt-1 text-[9px] font-extrabold uppercase tracking-[.13em] text-jade/50">{unit}</p><p className="mt-5 border-t border-jade/10 pt-4 text-xs font-extrabold text-jade">{rule}</p></div>)}</div></div></section>

      <section className="section-divider-bottom bg-jade py-14 text-white"><div className="container-custom grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="eyebrow !text-saffron">Van schema naar echte tickets</p><h2 className="font-display text-[2.8rem] font-semibold leading-[.92]">Vergelijk pas nadat je hotelbases vaststaan.</h2><p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/65">Controleer vertrekpunt, aankomstpunt, bagage, losse aansluitingen en totale reistijd. Dienstregelingen en prijzen veranderen.</p></div><div><a href={withPlacementSubId(TWELVEGO_GENERIC, subId, 'itineraries-nl-directory-transport')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream text-saffron-dark">Bekijk actueel vervoer <ExternalLink size={14} /></a><AffiliateDisclosure className="mt-3 max-w-sm !text-white/58">Gesponsorde 12Go-link. Controleer de volledige verbinding en voorwaarden bij de aanbieder.</AffiliateDisclosure></div></div></section>

      <FaqSplitSection id="vragen" eyebrow="Echte routevragen" title="Veelgestelde vragen over Thailand-reisroutes" description="De vragen zijn gebaseerd op Nederlandse zoekintentie en zichtbare Google-vragen. Veranderlijke prijzen, tijden en toegangsregels verwijzen we naar de actuele bron." items={faqs} />
      <RelatedGuidesSection eyebrow="Van route naar plek" title="Werk je keuzes verder uit" guides={[{ title: 'Regio’s van Thailand', description: 'Kies eerst Noord, Centraal, Zuid of Isaan als praktisch reisnetwerk.', href: '/region/', image: '/images/redesign/thailand-route-rhythm.webp', imageAlt: 'Routekeuzes tussen regio’s van Thailand' }, { title: 'Bestemmingen', description: 'Open de plaatsgids achter iedere hotelbasis en controleer de lokale logistiek.', href: '/city/', image: '/images/redesign/bangkok-destination-hero.webp', imageAlt: 'Bestemmingen in Thailand' }, { title: 'Weer & kustkeuze', description: 'Vergelijk klimaatzones en controleer daarna de actuele conditie.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Weerkeuze tussen Thaise kusten' }]} />
      <SourceMethodSection title="Zo zijn de routes opgebouwd" description="De routefamilie combineert lokaal beschikbare keyworddata, zichtbare Nederlandse SERP- en PAA-vragen, bestaande siteprestaties en primaire bronnen. Routevoorstellen vermijden vaste prijzen, garanties en schijnexacte overstaptijden." sources={[{ title: 'Bestemmingen en regio’s', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations', note: 'Officiële bestemming- en regiocontext.' }, { title: 'Actuele weersverwachtingen', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Weer en waarschuwingen per gebied.' }, { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele veiligheids-, grens- en documentinformatie.' }]} />
    </div>
  </>;
}
