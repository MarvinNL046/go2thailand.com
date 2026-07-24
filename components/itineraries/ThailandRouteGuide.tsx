import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  ExternalLink,
  Footprints,
  Hotel,
  MapPinned,
  Mountain,
  Palmtree,
  Plane,
  Ship,
  Sparkles,
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
import { ThailandMapGraphic } from '../visuals/ThailandMapGraphic';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';

type DurationKey = '10' | '14' | '21' | '28';

interface RouteStop {
  place: string;
  nights: number;
  role: string;
}

interface DurationRoute {
  key: DurationKey;
  label: string;
  title: string;
  verdict: string;
  pace: string;
  moveDays: number;
  stops: RouteStop[];
}

const durationRoutes: DurationRoute[] = [
  {
    key: '10', label: '10 dagen', title: 'Stad, noorden en één kustbasis', pace: 'Vlot', moveDays: 2,
    verdict: 'Kan goed, zolang je één kustbasis kiest en geen extra eiland probeert mee te pakken.',
    stops: [
      { place: 'Bangkok', nights: 3, role: 'landen, rivier & streetfood' },
      { place: 'Chiang Mai', nights: 3, role: 'tempels, eten & bergen' },
      { place: 'Krabi', nights: 4, role: 'strandbasis & één bootdag' },
    ],
  },
  {
    key: '14', label: '2 weken', title: 'De complete eerste kennismaking', pace: 'Gebalanceerd', moveDays: 3,
    verdict: 'De beste balans voor een eerste reis: genoeg contrast zonder dat elke derde dag een transferdag wordt.',
    stops: [
      { place: 'Bangkok', nights: 3, role: 'rustig landen & buurten' },
      { place: 'Kanchanaburi', nights: 2, role: 'rivier, historie & natuur' },
      { place: 'Chiang Mai', nights: 4, role: 'noordelijk reisblok' },
      { place: 'Krabi', nights: 5, role: 'kust, karst & rust' },
    ],
  },
  {
    key: '21', label: '3 weken', title: 'De klassieke route met ademruimte', pace: 'Rustig', moveDays: 4,
    verdict: 'Onze sterkste eerste-reisroute: vijf duidelijke reisblokken en voldoende ruimte voor weer, rust en spontane keuzes.',
    stops: [
      { place: 'Bangkok', nights: 3, role: 'start zonder jetlag-race' },
      { place: 'Kanchanaburi', nights: 3, role: 'centrale natuurstop' },
      { place: 'Chiang Mai', nights: 5, role: 'stad plus bergdag' },
      { place: 'Khao Sok', nights: 3, role: 'jungle & meer' },
      { place: 'Krabi', nights: 7, role: 'kustbasis met bufferdag' },
    ],
  },
  {
    key: '28', label: '4 weken', title: 'Langzaam van cultuur naar kust', pace: 'Slow travel', moveDays: 6,
    verdict: 'Vier weken geven ruimte voor een historische tussenstop en twee zuidelijke bases zonder de reis vol te proppen.',
    stops: [
      { place: 'Bangkok', nights: 3, role: 'hoofdstad & acclimatiseren' },
      { place: 'Kanchanaburi', nights: 3, role: 'rivierlandschap' },
      { place: 'Sukhothai', nights: 3, role: 'historische tussenstop' },
      { place: 'Chiang Mai', nights: 5, role: 'noorden zonder haast' },
      { place: 'Khao Sok', nights: 3, role: 'groene reset' },
      { place: 'Krabi', nights: 5, role: 'Andamanbasis' },
      { place: 'Koh Lanta', nights: 6, role: 'langzaam eilandritme' },
    ],
  },
];

const archetypes = [
  {
    title: 'De gebalanceerde eerste reis', kicker: 'Stad + noord + kust', icon: Compass,
    description: 'Bangkok, Chiang Mai en één zuidelijke regio. De slimste basis als je Thailand nog niet kent en contrast wilt zonder logistieke marathon.',
    bestFor: 'Eerste bezoek, 10–21 dagen', tradeoff: 'Je ziet bewust niet elk bekend eiland.', image: '/images/redesign/destination-bangkok.webp',
  },
  {
    title: 'Noorden & natuur', kicker: 'Trein + bergen + historie', icon: Mountain,
    description: 'Bangkok, Kanchanaburi, Sukhothai en Chiang Mai. Meer landschap en cultuur, minder binnenlandse vluchten en geen verplichte strandfinish.',
    bestFor: 'Actief reizen, koeler seizoen', tradeoff: 'Geen tropische eilanddagen.', image: '/images/redesign/destination-chiang-mai.webp',
  },
  {
    title: 'Zuiden & eilanden', kicker: 'Kust + boot + langzaam ritme', icon: Palmtree,
    description: 'Bangkok met één kustregio en maximaal twee aansluitende eilanden. Kies Andaman of de Golf op seizoen; combineer ze niet automatisch.',
    bestFor: 'Strand, snorkelen en herstel', tradeoff: 'Bootdagen blijven weersafhankelijk.', image: '/images/redesign/destination-krabi.webp',
  },
];

const itinerary21 = [
  { days: 'Dag 1–3', place: 'Bangkok', text: 'Land rustig, groepeer tempels aan de rivier op één dag en plan Chinatown of een markt op een andere avond.', icon: Plane },
  { days: 'Dag 4–6', place: 'Kanchanaburi', text: 'Reis westwaarts voor rivier, historie en één natuurdag. Dit blok voorkomt een losse, lange dagtrip vanuit Bangkok.', icon: TrainFront },
  { days: 'Dag 7–11', place: 'Chiang Mai', text: 'Gebruik de stad als basis: oude stad, eetbuurten en één volledige dag voor bergen of platteland.', icon: Mountain },
  { days: 'Dag 12–14', place: 'Khao Sok', text: 'Maak van de verplaatsing naar het zuiden een bestemming. Houd rekening met aansluitingen en boek geen kwetsbare excursie op aankomstdag.', icon: Footprints },
  { days: 'Dag 15–21', place: 'Krabi', text: 'Eindig met één vaste kustbasis, twee gerichte boot- of natuurdagen en minstens één lege weersbuffer.', icon: Ship },
];

const faqs = [
  { question: 'Wat is een goede reisroute voor 3 weken Thailand?', answer: 'Voor een eerste reis werkt Bangkok – Kanchanaburi – Chiang Mai – Khao Sok – Krabi sterk. Met vijf reisblokken houd je contrast én rust. Kies aan de kust één basis en gebruik dagtochten in plaats van meerdere korte eilandverblijven.' },
  { question: 'Kan je 2 weken naar Thailand?', answer: 'Ja. Twee weken is lang genoeg voor Bangkok, één noordelijk blok en één kustbasis. Beperk de route tot ongeveer vier verblijfsplaatsen; extra stops kosten vaak meer bruikbare tijd dan ze toevoegen.' },
  { question: 'Is 3 weken in Thailand te lang?', answer: 'Nee. Drie weken geeft juist ruimte voor verschillende regio’s zonder dagelijks door te reizen. Het wordt alleen onrustig wanneer je de extra dagen gebruikt voor nog meer stops in plaats van langere verblijven.' },
  { question: 'Wat is de ultieme rondreisroute voor Thailand?', answer: 'Er bestaat geen universele ultieme route. Voor een eerste bezoek is stad + noorden + één kustregio meestal het meest logisch. De beste kustkeuze hangt af van je maand, terwijl tempo en interesses bepalen of Kanchanaburi, Khao Sok of een eiland extra waarde heeft.' },
  { question: 'Wat moet je allemaal regelen voordat je naar Thailand gaat?', answer: 'Controleer geldige reisdocumenten en actuele officiële inreisregels, regel een passende verzekering, leg je eerste verblijf en kritieke lange trajecten vast en laat korte lokale verplaatsingen flexibel. Controleer vlak voor vertrek ook weer- en vervoersmeldingen.' },
  { question: 'Wat is het mooiste deel van Thailand om te bezoeken?', answer: 'Dat hangt af van wat je zoekt: Bangkok voor stedelijke energie en eten, Chiang Mai voor Lanna-cultuur en bergen, Khao Sok voor natuur en Krabi of de Golf-eilanden voor kust. Kies liever twee sterke contrasten dan zes haastige hoogtepunten.' },
];

const sectionNav = [
  { href: '#reisduur' as const, label: 'Reisduur', icon: CalendarDays },
  { href: '#routekaart' as const, label: 'Routekaart', icon: MapPinned },
  { href: '#reisstijl' as const, label: 'Reisstijl', icon: Compass },
  { href: '#reisritme' as const, label: 'Reisritme', icon: Clock3 },
  { href: '#seizoen' as const, label: 'Seizoen', icon: Palmtree },
  { href: '#vragen' as const, label: 'Vragen', icon: Sparkles },
];

export default function ThailandRouteGuide() {
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>('21');
  const selected = useMemo(() => durationRoutes.find((route) => route.key === selectedDuration) || durationRoutes[2], [selectedDuration]);
  const subId = 'nl-thailand-route';
  const twelveGoHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'transport');
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, 'hotels');
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, 'activities');

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: 'Thailand reisroute: 10 dagen tot 4 weken',
    description: 'Kies een logische Thailand reisroute voor 10 dagen, 2, 3 of 4 weken met minder transferdagen en een kustkeuze op seizoen.',
    image: 'https://go2-thailand.com/images/redesign/thailand-route-hero.webp',
    mainEntityOfPage: 'https://go2-thailand.com/nl/thailand-itinerary/', inLanguage: 'nl-NL',
    dateModified: '2026-07-24', author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Thailand reisroute', item: 'https://go2-thailand.com/nl/thailand-itinerary/' },
    ],
  };

  return (
    <>
      <SEOHead
        title="Thailand reisroute: 10 dagen tot 4 weken | Go2Thailand"
        description="Kies jouw Thailand reisroute voor 10 dagen, 2, 3 of 4 weken. Met routekaart, slimme stops, transferdagen en seizoensadvies voor de eilanden."
        ogImage="https://go2-thailand.com/images/redesign/thailand-route-hero.webp"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-route-hero.webp"
          imageAlt="Reisroute door Thailand langs Bangkok, bergen, trein en zuidelijke kust"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisroute' }]}
          eyebrow="Minder overstappen. Meer Thailand."
          title={<>Jouw Thailand<br /><span className="text-saffron-dark">reisroute</span></>}
          subtitle="10 dagen, 2, 3 of 4 weken — gebouwd op reistempo, niet op een afvinklijst."
          description="Begin met hoeveel dagen je écht hebt. Wij vertalen dat naar een logische lijn door het land, met ruimte voor jetlag, weer en een middag waarop niets hoeft."
          actions={[
            { label: 'Kies je reisduur', href: '#reisduur', kind: 'primary' },
            { label: 'Bekijk kant-en-klare routes', href: '/itineraries/', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[720px] lg:min-h-[700px]"
          titleClassName="max-w-[690px] text-[4.35rem] leading-[0.82] sm:text-[5.5rem] lg:text-[6.3rem]"
          subtitleClassName="max-w-[610px] text-[1.35rem] leading-[1.1] sm:text-[1.7rem]"
          imageClassName="object-cover object-[62%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(250,247,240,0.08)_0%,rgba(250,247,240,0.48)_48%,rgba(250,247,240,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,247,240,0.98)_0%,rgba(250,247,240,0.92)_35%,rgba(250,247,240,0.16)_60%,rgba(5,48,39,0.05)_100%)]"
          sideCard={(
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[300px] rounded-2xl border border-white/45 bg-white/84 p-5 shadow-editorial-card backdrop-blur-lg xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">De routecheck</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[['21', 'dagen'], ['5', 'reisblokken'], ['4', 'verplaatsingen']].map(([value, label]) => <div key={label}><strong className="block font-display text-2xl text-jade">{value}</strong><span className="text-[9px] font-bold text-charcoal/48">{label}</span></div>)}
              </div>
              <p className="mt-4 border-t border-jade/10 pt-4 text-xs font-medium leading-5 text-charcoal/60">Elke extra stop betaalt “transfertaks” in inpakken, uitchecken en opnieuw landen.</p>
            </div>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section id="reisduur" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-9 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
              <SectionHeading eyebrow="Kies op beschikbare tijd" title={<>Hoeveel Thailand<br />past in jouw reis?</>} description="Niet de afstand op de kaart, maar het aantal verhuisdagen bepaalt het gevoel. Kies je duur; de route past zich direct aan." />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Kies de reisduur">
                {durationRoutes.map((route) => (
                  <button key={route.key} type="button" role="tab" aria-selected={selectedDuration === route.key} onClick={() => setSelectedDuration(route.key)} className={`min-h-14 rounded-xl border px-4 text-sm font-extrabold transition ${selectedDuration === route.key ? 'border-jade bg-jade text-white shadow-editorial-card' : 'border-jade/12 bg-white text-jade hover:border-saffron/45'}`}>{route.label}</button>
                ))}
              </div>
            </div>

            <div className="mt-9 overflow-hidden rounded-[26px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
                <div className="bg-jade p-7 text-white sm:p-9">
                  <p className="eyebrow !text-saffron-light">{selected.label} · tempo {selected.pace.toLowerCase()}</p>
                  <h2 className="font-display text-[3.1rem] font-semibold leading-[0.88] tracking-[-0.035em]">{selected.title}</h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/68">{selected.verdict}</p>
                  <div className="mt-7 flex gap-6 border-t border-white/12 pt-5"><div><strong className="font-display text-3xl text-saffron-light">{selected.stops.length}</strong><span className="block text-[9px] font-bold uppercase tracking-wider text-white/50">reisblokken</span></div><div><strong className="font-display text-3xl text-saffron-light">{selected.moveDays}</strong><span className="block text-[9px] font-bold uppercase tracking-wider text-white/50">grote transfers</span></div></div>
                </div>
                <div className="p-6 sm:p-8">
                  <ol className="grid gap-3 sm:grid-cols-2">
                    {selected.stops.map((stop, index) => <li key={stop.place} className="group flex items-start gap-4 rounded-xl border border-jade/10 bg-canvas p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-saffron text-xs font-black text-jade">{index + 1}</span><div><h3 className="font-display text-xl font-semibold text-jade">{stop.place}</h3><p className="mt-1 text-[11px] font-medium text-charcoal/58">{stop.nights} nachten · {stop.role}</p></div></li>)}
                  </ol>
                  <p className="mt-5 flex items-start gap-2 text-xs font-semibold leading-5 text-jade"><Check size={16} className="mt-0.5 shrink-0 text-saffron-dark" />Plan een lange transfer nooit als volwaardige vakantiedag.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="routekaart" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="relative min-h-[590px] overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10">
              <ThailandMapGraphic className="absolute bottom-[-22px] right-[-5px] h-[94%] w-auto opacity-90" />
              <div className="relative z-10 max-w-[260px]"><p className="eyebrow !text-saffron-light">Geografische lijn</p><h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.035em]">Noord naar zuid, zonder zigzag.</h2><p className="mt-5 text-sm font-medium leading-6 text-white/67">De kaart is een echte Thailandcontour. Je route loopt in één richting; zo voorkom je onnodig terugreizen via Bangkok.</p></div>
              <div className="absolute bottom-8 left-7 z-10 rounded-xl border border-white/12 bg-jade/75 p-4 backdrop-blur sm:left-10"><p className="text-[9px] font-black uppercase tracking-[0.13em] text-saffron-light">Routeprincipe</p><p className="mt-1 text-xs font-semibold text-white/72">Aankomst → noorden → natuurstop → kust → vertrek</p></div>
            </div>
            <div>
              <SectionHeading eyebrow="Eerst de lijn, dan de stops" title="Een goede route is geen lijst met plaatsnamen." description="Kies een richting en geef elke bestemming een duidelijke rol. Als twee stops hetzelfde doel vervullen, schrap er één." />
              <div className="mt-8 space-y-3">
                {[
                  ['Bangkok', 'Aankomst & stad', 'Begin hier, maar plan niet alles op jetlag-dag één.'],
                  ['Noorden', 'Cultuur & bergen', 'Chiang Mai is meestal een sterkere basis dan meerdere korte noordstops.'],
                  ['Tussenblok', 'Natuur of historie', 'Kies Kanchanaburi, Sukhothai óf Khao Sok op basis van je lijn.'],
                  ['Kustregio', 'Rust & water', 'Kies Andaman of de Golf; maak van eilanden geen verhuiscarrousel.'],
                ].map(([title, role, text], index) => <article key={title} className="grid grid-cols-[auto_1fr] gap-4 rounded-xl border border-jade/10 bg-white p-5"><span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/35 font-display text-lg font-semibold text-jade">{index + 1}</span><div><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-display text-2xl font-semibold text-jade">{title}</h3><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{role}</span></div><p className="mt-2 text-xs font-medium leading-5 text-charcoal/62">{text}</p></div></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="reisstijl" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Drie routefamilies" title="Kies je verhaal vóór je plaatsen kiest." description="Deze drie routes hebben elk een eigen ritme. Combineer niet automatisch alle drie: één helder reisverhaal voelt rijker dan een verzameling losse highlights." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {archetypes.map((route) => { const Icon = route.icon; return <article key={route.title} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-56 overflow-hidden"><Image src={route.image} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/85 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl border border-white/30 bg-white/12 text-white backdrop-blur"><Icon size={21} /></span></div><div className="p-6"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{route.kicker}</p><h2 className="mt-2 font-display text-[2rem] font-semibold leading-[0.95] text-jade">{route.title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{route.description}</p><dl className="mt-5 grid gap-3 border-t border-jade/10 pt-4 text-[11px]"><div><dt className="font-extrabold text-jade">Sterk voor</dt><dd className="mt-1 text-charcoal/58">{route.bestFor}</dd></div><div><dt className="font-extrabold text-jade">Bewuste concessie</dt><dd className="mt-1 text-charcoal/58">{route.tradeoff}</dd></div></dl></div></article>; })}
            </div>
          </div>
        </section>

        <section id="reisritme" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
              <div className="relative min-h-[470px]"><Image src="/images/redesign/thailand-route-rhythm.webp" alt="Reistas, routekaart, trein- en ferryticket voor het plannen van transfers" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-jade/35" /></div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">De onzichtbare transfertaks</p>
                <h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.035em]">Een rit van vier uur kost zelden maar vier uur.</h2>
                <p className="mt-6 text-sm font-medium leading-7 text-white/68">Inpakken, uitchecken, naar het station, wachten, aankomen en opnieuw oriënteren maken van één verbinding snel een halve of hele reisdag. Daarom tellen we verhuisdagen apart.</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[['1–3 uur', 'Lichte wissel', 'Zelfde regio, eenvoudige deur-tot-deurreis.'], ['4–7 uur', 'Halve dag weg', 'Plan hooguit een rustige avondactiviteit.'], ['8+ uur', 'Volle reisdag', 'Gebruik nachtvervoer alleen als slaapkwaliteit past.']].map(([time, title, text]) => <article key={time} className="rounded-xl border border-white/12 bg-white/[0.06] p-4"><strong className="font-display text-2xl text-saffron-light">{time}</strong><h3 className="mt-2 text-xs font-extrabold">{title}</h3><p className="mt-2 text-[10px] font-medium leading-4 text-white/54">{text}</p></article>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-end"><SectionHeading eyebrow="Voorbeeldroute" title={<>Drie weken,<br />dag voor dag</>} description="Dit is de vlaggenschiproute uit de keuzehulp. Gebruik hem als ritme, niet als verplicht draaiboek." /><Link href="/itineraries/" className="justify-self-start text-xs font-extrabold text-jade lg:justify-self-end">Bekijk alle uitgewerkte routes <ArrowRight size={14} className="ml-2 inline text-saffron" /></Link></div>
            <ol className="relative mt-10 grid gap-4 lg:grid-cols-5 before:absolute before:left-[10%] before:right-[10%] before:top-8 before:hidden before:border-t-2 before:border-dotted before:border-saffron/55 lg:before:block">
              {itinerary21.map((item, index) => { const Icon = item.icon; return <li key={item.place} className="relative rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-saffron-light"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.days}</p><h2 className="mt-1 font-display text-2xl font-semibold text-jade">{item.place}</h2><p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/60">{item.text}</p>{index < itinerary21.length - 1 ? <ArrowRight size={15} className="absolute right-4 top-5 text-saffron lg:hidden" /> : null}</li>; })}
            </ol>
          </div>
        </section>

        <section id="seizoen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Laat de kust meebewegen" title="Andaman of de Golf? Kies pas na je reismaand." description="Thailand heeft geen identiek strandseizoen aan beide kusten. Gebruik historische patronen als richting, controleer vlak voor vertrek de actuele verwachting en houd bootdagen flexibel." />
            <div className="relative mt-10 min-h-[560px] overflow-hidden rounded-[30px] shadow-editorial-lift"><Image src="/images/redesign/thailand-route-coast-fork.webp" alt="Keuze tussen de kalksteenkust van de Andamanzee en een palmenstrand aan de Golf" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/92 via-jade/12 to-transparent" /><div className="absolute inset-x-5 bottom-5 grid gap-3 sm:inset-x-8 sm:bottom-8 md:grid-cols-2"><article className="rounded-2xl border border-white/20 bg-jade/74 p-5 text-white backdrop-blur-md"><div className="flex items-center gap-3"><Ship size={19} className="text-saffron-light" /><h2 className="font-display text-2xl font-semibold">Andamankust</h2></div><p className="mt-3 text-xs font-medium leading-5 text-white/68">Krabi, Phuket, Koh Lanta en omliggende eilanden. Controleer in de zuidwestmoesson extra scherp wind, golven en vaarschema’s.</p></article><article className="rounded-2xl border border-white/20 bg-jade/74 p-5 text-white backdrop-blur-md"><div className="flex items-center gap-3"><Palmtree size={19} className="text-saffron-light" /><h2 className="font-display text-2xl font-semibold">Golfkust</h2></div><p className="mt-3 text-xs font-medium leading-5 text-white/68">Koh Samui, Koh Phangan en Koh Tao kunnen een alternatief zijn, maar ook hier veranderen regen en zeecondities per periode.</p></article></div></div>
            <p className="mt-4 text-[11px] font-medium leading-5 text-charcoal/54">Weer is geen boekingsgarantie. Raadpleeg kort voor boottochten de officiële waarschuwingen van de Thai Meteorological Department en de voorwaarden van de uitvoerder.</p>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionHeading eyebrow="Leg alleen de ruggengraat vast" title="Boek in de juiste volgorde." description="Zet eerst de kwetsbare verbindingen vast. Laat lokale invulling beweeglijk genoeg voor weer, energie en een plek waar je langer wilt blijven." />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { step: '1', title: 'Lange trajecten', text: 'Vergelijk trein, bus, boot en vlucht inclusief terminals en overstappen.', href: twelveGoHref, label: 'Vergelijk vervoer', icon: TicketCheck },
                { step: '2', title: 'Route-ankers', text: 'Reserveer de eerste nacht en schaarse verblijven; vergelijk locatie vóór korting.', href: tripHref, label: 'Bekijk hotels', icon: Hotel },
                { step: '3', title: 'Ervaringen', text: 'Boek datumgevoelige activiteiten pas nadat de route en transferbuffer kloppen.', href: klookHref, label: 'Bekijk uitjes', icon: Sparkles },
              ].map((item) => { const Icon = item.icon; return <article key={item.step} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/30 text-jade"><Icon size={19} /></span><span className="font-display text-4xl font-semibold text-jade/10">{item.step}</span></div><h2 className="mt-5 font-display text-2xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p><a href={item.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{item.label} <ExternalLink size={13} className="text-saffron" /></a></article>; })}
              <AffiliateDisclosure className="sm:col-span-3">De drie externe knoppen zijn affiliate-links. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. Aanbod, dienstregeling, beschikbaarheid en voorwaarden komen van de aanbieder; controleer die vóór betaling.</AffiliateDisclosure>
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over je Thailand reisroute" description="Deze vragen komen uit actuele Nederlandse DataForSEO-SERP-resultaten. Budgetvragen verwijzen we bewust naar de aparte budgetgids, zodat deze pagina geen snel verouderende bedragen suggereert." items={faqs} />

        <RelatedGuidesSection eyebrow="Van lijn naar boekbare reis" title="Werk je route verder uit" guides={[
          { title: 'Kant-en-klare routes', description: 'Open routes per duur en reisstijl met een concretere dagindeling.', href: '/itineraries/', image: '/images/redesign/thailand-route-hero.webp', imageAlt: 'Route door Thailand van stad naar kust' },
          { title: 'Vervoer in Thailand', description: 'Vergelijk trein, bus, boot en vlucht per specifiek traject.', href: '/transport/', image: '/images/redesign/transport-thailand-hero.webp', imageAlt: 'Vervoer door Thailand' },
          { title: 'Beste reistijd', description: 'Stem noord, Andaman en Golf af op je vertrekmaand.', href: '/weather/', image: '/images/redesign/thailand-route-coast-fork.webp', imageAlt: 'Twee kustregio’s van Thailand' },
        ]} />

        <SourceMethodSection
          eyebrow="Bronnen & methode"
          title="Zo is deze routekeuze opgebouwd"
          description="Zoekvraag, SERP, concurrenten en People Also Ask zijn op 24 juli 2026 via DataForSEO voor Nederland onderzocht. De route is redactioneel opgebouwd rond geografische lijn, verhuisdagen en regionale variatie. Actuele dienstregelingen en weerswaarschuwingen blijven leidend."
          sources={[
            { title: 'Officiële bestemmingsinformatie Bangkok en Chiang Mai', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/', note: 'Gebruikt om de functie en het karakter van de belangrijkste routeblokken te controleren.' },
            { title: 'D-Ticket en officiële treinkanalen', creator: 'State Railway of Thailand', url: 'https://www.dticket.railway.co.th/DTicketPublicWeb/home/Home', note: 'Primaire plek voor actuele treinreserveringen en controle van beschikbare verbindingen.' },
            { title: 'Voorspellingen en waarschuwingen voor Thailand', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Voor actuele regen-, wind- en golfwaarschuwingen bij kust- en bootplanning.' },
          ]}
        />
      </main>
    </>
  );
}
