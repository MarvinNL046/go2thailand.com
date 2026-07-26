import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  CalendarClock,
  Check,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  Hotel,
  ListChecks,
  MapPin,
  Palmtree,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react';
import { TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/new-luxury-resorts-thailand-2026-marriott-hilton-mercure/';
const PAGE_TITLE = 'Nieuwe luxe resorts Thailand: wat is open in 2026?';
const PAGE_DESCRIPTION = 'Actuele status van Grand Mercure Krabi, Nivata Koh Samui en JW Marriott Phuket Chalong Bay, met locatiekeuze en boekchecks voor 2026.';
const HERO_IMAGE = '/images/redesign/luxury-resorts-thailand-hero.webp';

const navItems: PageSectionNavItem[] = [
  { href: '#status', label: 'Status', icon: BadgeCheck },
  { href: '#hotels', label: 'Drie hotels', icon: Hotel },
  { href: '#locatie', label: 'Locatiekeuze', icon: MapPin },
  { href: '#boeken', label: 'Boekcheck', icon: ListChecks },
  { href: '#alternatieven', label: 'Nu verblijven', icon: BedDouble },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

interface ResortStatus {
  name: string;
  destination: string;
  state: string;
  date: string;
  statusClass: string;
  icon: LucideIcon;
  verdict: string;
  officialFacts: string[];
  locationFit: string;
  verify: string;
}

const resortStatuses: ResortStatus[] = [
  {
    name: 'Grand Mercure Krabi Ao Nang',
    destination: 'Ao Nang · Krabi',
    state: 'Open',
    date: 'boekbaar in juli 2026',
    statusClass: 'border-jade/20 bg-jade text-white',
    icon: BadgeCheck,
    verdict: 'De voormalige “opening in 2026” is inmiddels een bestaand hotel. Accor toont boekbare data en actuele gastreviews.',
    officialFacts: ['twee zwembaden, inclusief kinderbad', 'Kids Club en fitnesscentrum', 'restaurants plus rooftopbar', '9-9 Moo 2 in Ao Nang'],
    locationFit: 'Voor reizigers die strand, restaurants en excursies relatief gemakkelijk willen combineren vanuit Ao Nang.',
    verify: 'Controleer kamertype, recente reviews, belasting, transfer en wijzigingsvoorwaarden voor jouw data.',
  },
  {
    name: 'Nivata Koh Samui, Tapestry Collection by Hilton',
    destination: 'Taling Ngam · Koh Samui',
    state: 'Gepland',
    date: 'oktober 2026 · nog niet boekbaar',
    statusClass: 'border-saffron/30 bg-[#fff1d9] text-jade',
    icon: Clock3,
    verdict: 'Hiltons actuele hotelpagina noemt oktober 2026, maar accepteert op 25 juli nog geen reserveringen. Een hotelpagina is nog geen bevestigde kamer.',
    officialFacts: ['55 kamers en twee verdiepingen', 'drie restaurants', 'lazy pool en infinitypool', 'zuidwestpunt van Koh Samui'],
    locationFit: 'Voor een rustige eilandbasis met zonsondergang en afstand tot Chaweng; minder logisch als levendig uitgaansgebied je prioriteit is.',
    verify: 'Wacht op een echte boekbare kamer met tarief en voorwaarden; leg je vlucht niet vast rond alleen een aangekondigde maand.',
  },
  {
    name: 'JW Marriott Phuket Chalong Bay Resort & Spa',
    destination: 'Chalong Bay · Phuket',
    state: 'Doorgeschoven',
    date: 'Q4 2027 volgens Marriott',
    statusClass: 'border-charcoal/12 bg-white text-jade',
    icon: CalendarClock,
    verdict: 'Deze naam hoort niet meer in een lijst met boekbare openingen voor 2026. Marriott zet het project momenteel op Q4 2027.',
    officialFacts: ['165 kamers in de actuele openingslijst', 'Chalong Bay als aangekondigde locatie', 'geen normale hotelinventaris voor 2026', 'planning kan opnieuw wijzigen'],
    locationFit: 'Interessant als toekomstige basis voor zuidoost-Phuket en Chalong Pier, maar niet als concrete 2026-keuze.',
    verify: 'Plan 2026 met bestaande hotels. Hercontroleer pas voor een latere reis de officiële openingslijst én echte boekbaarheid.',
  },
];

const bookingChecks: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Hotel, title: 'Exacte property', text: 'Vergelijk volledige naam én adres. Phuket heeft al een JW Marriott in Mai Khao; dat is niet het aangekondigde Chalong-project.' },
  { icon: CalendarClock, title: 'Echte boekbare nacht', text: 'Een merkpagina, persbericht of verwachte openingsmaand is geen reservering. Zoek jouw precieze in- en uitcheckdatum.' },
  { icon: Eye, title: 'Recente signalen', text: 'Lees de nieuwste reviews en bekijk of zwembaden, restaurants, bouwzones en strandtoegang daadwerkelijk operationeel zijn.' },
  { icon: MapPin, title: 'Locatie boven logo', text: 'Meet de route naar strand, pier, restaurants en luchthaven. Dezelfde ketennaam zegt niets over je dagelijkse reistijd.' },
  { icon: RefreshCcw, title: 'Wijzigbare voorwaarden', text: 'Kies rond een nieuwe opening bij voorkeur een tarief dat je kunt aanpassen wanneer bouw- of openingsdata verschuiven.' },
  { icon: ShieldCheck, title: 'Volledige prijs', text: 'Controleer belasting, ontbijt, transfer, extra bed, borg en annuleringsmoment vóór je de goedkoopste kaart kiest.' },
];

const faqs = [
  { question: 'Welke van deze nieuwe resorts is nu echt open?', answer: 'Grand Mercure Krabi Ao Nang is op 25 juli 2026 operationeel en boekbaar op de officiële Accor-pagina. Nivata Koh Samui meldt een opening in oktober 2026 maar accepteert nog geen reserveringen. JW Marriott Phuket Chalong Bay staat in Marriotts actuele openingslijst voor Q4 2027.' },
  { question: 'Wanneer opent Nivata Koh Samui?', answer: 'De actuele Hilton-hotelpagina noemt oktober 2026 en vermeldt dat reserveringen nog niet worden geaccepteerd. Zie die maand als planning, niet als garantie; boek pas wanneer jouw kamer en data werkelijk beschikbaar zijn.' },
  { question: 'Kan ik Nivata Koh Samui al boeken?', answer: 'Niet via de officiële Hilton-pagina op de controledatum 25 juli 2026. Wacht op echte beschikbaarheid met kamertype, prijs en voorwaarden. Een vermelding bij een externe site is geen vervanging voor die controle.' },
  { question: 'Wanneer opent JW Marriott Phuket Chalong Bay?', answer: 'Marriott noemt momenteel Q4 2027 en 165 kamers. Daarmee is dit geen bruikbare 2026-hoteloptie. Openingsplanningen kunnen opnieuw veranderen, dus controleer de officiële openingslijst voor een latere reis opnieuw.' },
  { question: 'Is Grand Mercure Krabi Ao Nang open?', answer: 'Ja. Accor toont boekbare data, diensten en actuele gastreviews. Controleer nog steeds de precieze kamer, actuele score, faciliteiten en voorwaarden voor jouw verblijfsdata.' },
  { question: 'Waar kun je het beste verblijven: Phuket, Koh Samui of Krabi?', answer: 'Dat hangt af van route en seizoen. Ao Nang is praktisch voor restaurants en Krabi-excursies; Taling Ngam is rustiger en afgelegener; Chalong is handig voor het zuidoosten van Phuket en de pier, maar het nieuwe JW Marriott daar is nog niet open.' },
  { question: 'Is Taling Ngam een goede plek op Koh Samui?', answer: 'Taling Ngam past bij rust, zonsondergang en een resortgerichte reis. Voor veel restaurants, winkels en avondleven op loopafstand zijn Chaweng of Lamai doorgaans logischer. Reken vanuit Taling Ngam vaker op een taxi of transfer.' },
  { question: 'Wat is het verschil tussen Ao Nang en Krabi?', answer: 'Krabi is de provincie en ook de naam van Krabi Town; Ao Nang is de belangrijkste kustplaats voor veel reizigers. Ao Nang biedt makkelijke toegang tot restaurants, strand en bootexcursies, maar voelt drukker dan een afgelegen resortzone.' },
  { question: 'Zijn nieuwe hotels goedkoper vlak na opening?', answer: 'Soms bestaan er openingstarieven, maar dat is geen vaste regel. Een lager tarief kan samengaan met beperkte faciliteiten, weinig reviews of bouwactiviteit. Vergelijk de volledige prijs en wijzigbaarheid, niet alleen de korting.' },
  { question: 'Hoe boek ik een nieuw resort met minder risico?', answer: 'Controleer de officiële hotelstatus, zoek een echte kamer voor jouw data, lees recente reviews, bekijk de locatie op kaart en kies waar mogelijk wijzigbare voorwaarden. Bewaar vervolgens de propertynaam, het adres en de voorwaarden bij je reservering.' },
];

const sources = [
  {
    title: 'Marriott New Hotel Openings',
    creator: 'Marriott International',
    url: 'https://www.marriott.com/en-us/marriott-brands/portfolio/openings.mi',
    note: 'Actuele openingslijst met Q4 2027 en 165 kamers voor JW Marriott Phuket Chalong Bay Resort & Spa.',
  },
  {
    title: 'Nivata Koh Samui, Tapestry Collection by Hilton',
    creator: 'Hilton',
    url: 'https://www.hilton.com/en/hotels/usmupup-nivata-koh-samui/',
    note: 'Actuele hotelpagina met oktober 2026, nog geen reserveringen, locatie en voorzieningen.',
  },
  {
    title: 'Grand Mercure Krabi Ao Nang',
    creator: 'Accor / ALL',
    url: 'https://all.accor.com/hotel/B6F7/index.en.shtml',
    note: 'Operationele hotelpagina met adres, boekmodule, faciliteiten en actuele gastreviews.',
  },
  {
    title: 'New hotels and resorts debuting in 2025',
    creator: 'Accor Press',
    url: 'https://press.accor.com/accor-unveils-an-outstanding-line-up-of-new-hotels-resorts-and-hospitality-experiences-debuting-in-2025/?lang=eng',
    note: 'Oorspronkelijke openingscontext voor Grand Mercure Krabi; gebruikt om de latere operationele status te duiden.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-23', dateModified: '2026-07-25',
      inLanguage: 'nl-NL', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Status van drie aangekondigde luxe resorts in Thailand',
      itemListElement: resortStatuses.map((resort, index) => ({
        '@type': 'ListItem', position: index + 1, name: resort.name,
        description: `${resort.state}: ${resort.date}. ${resort.verdict}`,
      })),
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Hotels', item: 'https://go2-thailand.com/nl/top-10/hotels/' },
        { '@type': 'ListItem', position: 3, name: 'Nieuwe luxe resorts Thailand', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'Zo controleer je een nieuw resort vóór je boekt',
      step: bookingChecks.map((check, index) => ({ '@type': 'HowToStep', position: index + 1, name: check.title, text: check.text })),
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function NewLuxuryResortsThailandGuide() {
  const subId = useSubId();
  const tripHeroHref = withPlacementSubId(TRIP_GENERIC, subId, 'luxury-resorts-hero');
  const tripKrabiHref = withPlacementSubId(TRIP_GENERIC, subId, 'luxury-resorts-krabi');
  const tripSamuiHref = withPlacementSubId(TRIP_GENERIC, subId, 'luxury-resorts-samui');
  const tripPhuketHref = withPlacementSubId(TRIP_GENERIC, subId, 'luxury-resorts-phuket');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="nieuwe luxe resorts thailand 2026, nieuwe hotels thailand 2026, luxe resorts thailand, nieuwe resorts phuket, nieuwe hotels koh samui, nieuwe hotels krabi" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-23" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Sfeerbeeld van een eigentijds Thais kustresort bij zonsopkomst"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Hotels', href: '/top-10/hotels/' }, { label: 'Nieuwe luxe resorts' }]}
          eyebrow="Open. Gepland. Doorgeschoven."
          title={<>Nieuwe luxe resorts Thailand.</>}
          subtitle={<>Wat is écht open in 2026?</>}
          description={<>Drie veelgenoemde hotelopeningen, opnieuw gecontroleerd op officiële status. Geen oude aankondiging als boekadvies, maar een heldere route van shortlist naar verifieerbare kamer.</>}
          actions={[
            { label: 'Bekijk de status', href: '#status', kind: 'primary' },
            { label: 'Vergelijk wat nu boekbaar is', href: tripHeroHref, kind: 'secondary', newTab: true, affiliate: true, ariaLabel: 'Vergelijk actuele hotels in Thailand via Trip.com' },
          ]}
          disclosure="De tweede knop is een affiliatelink naar Trip.com. Bij een boeking ontvangen wij mogelijk commissie; jij betaalt niets extra. Controleer altijd de exacte property, data en voorwaarden."
          minHeightClassName="min-h-[850px] lg:min-h-[720px]"
          contentClassName="max-w-[690px]"
          titleClassName="max-w-[700px] text-[3.85rem] leading-[0.84] sm:text-[5rem] lg:text-[5.4rem]"
          subtitleClassName="max-w-[620px] text-[1.75rem] leading-[1] text-saffron-dark sm:text-[2.35rem]"
          imageClassName="object-cover object-[74%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.74)_49%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.86)_38%,rgba(11,49,43,0.12)_62%,rgba(5,27,24,0.08)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[350px] overflow-hidden rounded-2xl border border-white/55 bg-white/[0.9] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Statuskaart · 25 juli 2026</p><Sparkles size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Krabi</dt><dd className="font-extrabold text-jade">Open · live controleren</dd>
                <dt className="text-charcoal/46">Koh Samui</dt><dd className="font-extrabold text-saffron-dark">Okt. 2026 · nog dicht</dd>
                <dt className="text-charcoal/46">Phuket</dt><dd className="font-extrabold text-charcoal/68">Q4 2027 · doorgeschoven</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Een openingsmaand is geen inventaris. Een echte kamer voor jouw data is de beslissende stap.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="status" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
              <SectionHeading eyebrow="De lijst opnieuw geopend" title={<>Drie namen.<br />Drie andere fases.</>} description={<>De oude versie zette alle resorts onder één 2026-label. Dat klopt niet meer. De actuele bronstatus bepaalt wat je vandaag kunt boeken en wat alleen op een toekomstige watchlist hoort.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Nieuwe hotels verschuiven geregeld door bouw, vergunningen, inrichting of commerciële planning. Daarom scheiden we <strong className="text-jade">aankondiging</strong>, <strong className="text-jade">officiële hotelpagina</strong> en <strong className="text-jade">echte kamerbeschikbaarheid</strong>. Alleen die laatste maakt een resort bruikbaar voor jouw reisdata.</p>
            </div>

            <div className="relative mt-12 grid gap-4 lg:grid-cols-3">
              <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-9 hidden border-t-2 border-dashed border-saffron/45 lg:block" />
              {resortStatuses.map(({ name, destination, state, date, statusClass, icon: Icon }, index) => (
                <article key={name} className="relative z-10 rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <div className="flex items-start justify-between gap-5">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.13em] ${statusClass}`}><Icon size={14} />{state}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-canvas text-[10px] font-extrabold text-saffron-dark">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-[0.98] text-jade">{name}</h3>
                  <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-charcoal/45">{destination}</p>
                  <p className="mt-5 border-t border-jade/10 pt-5 text-xs font-extrabold text-jade">{date}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-[24px] border border-jade/10 bg-white shadow-editorial-card">
              <div className="grid lg:grid-cols-3">
                <article className="border-b border-jade/10 p-6 lg:border-b-0 lg:border-r">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Bewijsniveau 1</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-jade">Aankondiging</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">Een persbericht of ontwikkelingslijst bewijst dat een project is gepland. Het zegt nog niet dat de bouw af is, alle faciliteiten openen of gasten op jouw datum kunnen inchecken. Gebruik dit niveau alleen voor een watchlist.</p>
                </article>
                <article className="border-b border-jade/10 p-6 lg:border-b-0 lg:border-r">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Bewijsniveau 2</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-jade">Officiële hotelpagina</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">Een eigen merkpagina geeft sterker bewijs voor naam, adres, kamertal en geplande voorzieningen. Toch kan er letterlijk staan dat reserveringen nog niet mogelijk zijn. Lees dus de statusmelding; kijk niet alleen naar de aanwezigheid van foto’s en een logo.</p>
                </article>
                <article className="bg-[#fff5e6] p-6">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Bewijsniveau 3</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-jade">Kamer voor jouw data</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">Het sterkste praktische signaal is een exacte kamer met in- en uitcheckdatum, totaalprijs en voorwaarden. Controleer ook recente gastenervaringen en operationele faciliteiten. Zelfs dan blijft een wijzigbaar tarief verstandig rond een verse opening.</p>
                </article>
              </div>
            </div>
            <p className="mx-auto mt-6 max-w-4xl text-center text-xs font-medium leading-6 text-charcoal/58">Praktische volgorde: bewaar een aangekondigd hotel eerst als idee, verplaats het pas naar je shortlist wanneer de officiële propertypagina actueel is en zet het pas in je reisplan zodra jouw nacht werkelijk boekbaar is. Maak bij een kersverse opening bovendien een schermafbeelding van kamertype, inbegrepen diensten en voorwaarden. Dan kun je bij een wijziging aantonen wat tijdens het boeken werd aangeboden. Gebruik een zoekresultaat, influencerpost of OTA-teaser alleen als spoor naar de bron: een oude snippet kan nog maanden een achterhaalde openingsdatum tonen. Zo scheid je inspiratie van bewijs voordat geld en vluchten vastliggen.</p>
          </div>
        </section>

        <section id="hotels" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Niet groeperen op luxe alleen" title="De actuele status per resort" description="Elk profiel begint bij het officiële signaal, daarna pas bij sfeer en reisfit. Zo voorkom je dat een bekende merknaam een niet-bestaande 2026-kamer wordt." />

            <div className="mt-11 space-y-5">
              {resortStatuses.map((resort, index) => {
                const Icon = resort.icon;
                return (
                  <article key={resort.name} className="overflow-hidden rounded-[26px] border border-jade/10 bg-white shadow-editorial-card">
                    <div className={`grid ${index === 0 ? 'lg:grid-cols-[0.78fr_1.22fr]' : 'lg:grid-cols-[0.34fr_0.66fr]'}`}>
                      {index === 0 ? (
                        <div className="relative min-h-[320px] overflow-hidden">
                          <Image src="/images/redesign/luxury-resorts-krabi.webp" alt="Sfeerbeeld van een resorttuin in Krabi met kalksteenrotsen" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
                          <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-jade/75 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">Destination-sfeerbeeld · geen hotelfoto</span>
                        </div>
                      ) : (
                        <div className={`relative flex min-h-[250px] flex-col justify-between overflow-hidden p-7 text-white ${index === 1 ? 'bg-jade' : 'bg-[#263d37]'}`}>
                          <div aria-hidden="true" className="absolute -right-10 -top-12 h-44 w-44 rounded-full border border-saffron/25" />
                          <div><span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.07]"><Icon size={22} className="text-saffron-light" /></span><p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">{resort.state}</p></div>
                          <p className="max-w-[260px] font-display text-3xl font-semibold leading-[0.96]">{index === 1 ? 'Nog geen kamer om vast te klikken.' : 'Van 2026-lijst naar 2027-watchlist.'}</p>
                        </div>
                      )}

                      <div className="p-7 sm:p-10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div><p className="eyebrow">{resort.destination}</p><h2 className="max-w-3xl font-display text-[2.45rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">{resort.name}</h2></div>
                          <span className={`shrink-0 rounded-full border px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.13em] ${resort.statusClass}`}>{resort.date}</span>
                        </div>
                        <p className="mt-6 max-w-4xl text-sm font-semibold leading-7 text-charcoal/72">{resort.verdict}</p>
                        <div className="mt-7 grid gap-7 md:grid-cols-2">
                          <div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Wat officieel zichtbaar is</p><ul className="mt-4 space-y-3">{resort.officialFacts.map((fact) => <li key={fact} className="flex gap-3 text-xs font-medium leading-5 text-charcoal/66"><Check size={15} className="mt-0.5 shrink-0 text-jade" />{fact}</li>)}</ul></div>
                          <div className="rounded-2xl bg-canvas p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Reisfit</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/68">{resort.locationFit}</p><p className="mt-4 border-t border-jade/10 pt-4 text-[11px] font-semibold leading-5 text-jade"><strong>Voor boeken:</strong> {resort.verify}</p></div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="locatie" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Het logo slaapt niet voor jou" title={<>Kies eerst<br />de kustzone</>} description={<>Een resort kan prachtig zijn en toch aan de verkeerde kant van het eiland liggen. Vergelijk daarom de dagelijkse route voordat je kamers vergelijkt. Bekijk ook onze gidsen voor <InlineLink href="/city/krabi/">Krabi</InlineLink>, <InlineLink href="/city/koh-samui/">Koh Samui</InlineLink> en <InlineLink href="/city/phuket/">Phuket</InlineLink>.</>} />
              <div className="overflow-x-auto rounded-[26px] border border-jade/10 bg-white shadow-editorial-card">
                <table className="min-w-[760px] w-full text-left text-xs">
                  <thead className="bg-jade text-white"><tr><th className="p-5">Vraag</th><th className="p-5">Ao Nang</th><th className="p-5">Taling Ngam</th><th className="p-5">Chalong Bay</th></tr></thead>
                  <tbody className="divide-y divide-jade/10 text-charcoal/67">
                    <tr><th className="p-5 font-extrabold text-jade">Sfeer</th><td className="p-5">Levendige kustbasis</td><td className="p-5">Rustige zuidwestkust</td><td className="p-5">Haven- en woonzone</td></tr>
                    <tr><th className="p-5 font-extrabold text-jade">Sterk voor</th><td className="p-5">Restaurants + excursies</td><td className="p-5">Resortrust + zonsondergang</td><td className="p-5">Pier + zuidoost-Phuket</td></tr>
                    <tr><th className="p-5 font-extrabold text-jade">Zonder auto</th><td className="p-5">Relatief praktisch centraal</td><td className="p-5">Vaker taxi of transfer</td><td className="p-5">Afhankelijk van exacte plek</td></tr>
                    <tr><th className="p-5 font-extrabold text-jade">Deze owner</th><td className="p-5 font-bold text-jade">Hotel open</td><td className="p-5 font-bold text-saffron-dark">Nog niet boekbaar</td><td className="p-5 font-bold text-charcoal/55">Project voor 2027</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { icon: Waves, eyebrow: 'Andaman-kust', title: 'Ao Nang als actieve basis', text: 'Loopbaarheid verschilt per straat, maar de kustplaats bundelt veel restaurants, tours en transfers. Controleer de echte afstand tot strand en pier.' },
                { icon: Palmtree, eyebrow: 'Golf van Thailand', title: 'Taling Ngam voor vertraging', text: 'Het zuidwesten voelt rustiger dan Chaweng. Dat is een voordeel als je resorttijd zoekt en een nadeel als je spontaan veel buiten de deur wilt doen.' },
                { icon: MapPin, eyebrow: 'Zuidoost-Phuket', title: 'Chalong is geen Mai Khao', text: 'Verwar het toekomstige Chalong-project niet met het bestaande JW Marriott Phuket Resort & Spa in Mai Khao, aan de noordwestkust.' },
              ].map(({ icon: Icon, eyebrow, title, text }) => (
                <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={22} className="text-jade" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{eyebrow}</p><h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Van aankondiging naar boeking" className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="relative min-h-[430px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[380px]">
              <Image src="/images/redesign/luxury-resorts-verify-banner.webp" alt="Reiziger controleert een reservering bij zonsondergang op Koh Samui" fill sizes="100vw" className="object-cover object-[68%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,35,30,0.98)_0%,rgba(6,35,30,0.88)_38%,rgba(6,35,30,0.16)_72%,rgba(6,35,30,0.04)_100%)]" />
              <div className="relative z-10 flex min-h-[430px] max-w-[610px] flex-col justify-center p-7 text-white sm:min-h-[380px] sm:p-12">
                <p className="eyebrow !text-saffron-light">Aankondiging ≠ aankomst</p>
                <h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em]">Boek de kamer die bestaat.</h2>
                <p className="mt-5 max-w-[520px] text-sm font-medium leading-7 text-white/67">Een persbericht verkoopt toekomst. Jouw reservering moet een exacte property, datum, kamer en annuleringsregel bevatten. Leg pas daarna vlucht en transfer rond een nieuwe opening vast.</p>
                <a href="#boeken" className="btn-cream mt-7 w-fit">Gebruik de zes checks <ArrowRight size={15} className="text-saffron" /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="boeken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
              <SectionHeading eyebrow="Zes checks vóór betalen" title={<>Nieuw hotel.<br />Oude boekdiscipline.</>} description={<>De openingsstatus is slechts de eerste controle. Gebruik dezelfde beslisvolgorde voor ieder nieuw of recent geopend resort, ook wanneer een OTA al een mooie kaart toont.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Bij een nieuw hotel is onzekerheid niet automatisch een reden om af te haken. Het is wel een reden om flexibiliteit hoger te waarderen. Een iets duurder wijzigbaar tarief kan rationeler zijn dan een niet-restitueerbare “deal” rond een verschuivende opening.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {bookingChecks.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className={`flex min-h-[285px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/35 bg-[#fff2de] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-jade/10 bg-canvas text-jade"><Icon size={20} strokeWidth={1.45} /></span><span className="text-[10px] font-extrabold text-saffron-dark">0{index + 1}</span></div>
                  <h3 className="mt-7 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="alternatieven" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Niet wachten op één merk" title="Vergelijk wat voor jouw data echt beschikbaar is" description={<>Een doorgeschoven of nog gesloten resort hoeft je bestemming niet te schrappen. Begin bij de juiste kustzone en vergelijk daar bestaande hotels met recente voorwaarden. Onze <InlineLink href="/blog/best-time-to-visit-thailand/">beste-reistijdgids</InlineLink> helpt voorkomen dat je Samui en de Andaman-kust onder één seizoen schuift.</>} />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                { image: '/images/redesign/krabi-destination-hero.webp', eyebrow: 'Nu open', title: 'Krabi & Ao Nang', text: 'Vergelijk Ao Nang, rustigere kustzones en de route naar je excursies.', href: tripKrabiHref, internal: '/best-hotels/krabi/' },
                { image: '/images/redesign/koh-samui-hotels-hero.webp', eyebrow: 'Niet afhankelijk van Nivata', title: 'Koh Samui', text: 'Vergelijk Taling Ngam met Bophut, Lamai en Chaweng op dagelijkse reisfit.', href: tripSamuiHref, internal: '/best-hotels/koh-samui/' },
                { image: '/images/redesign/phuket-hotels-hero.webp', eyebrow: 'Chalong-project pas later', title: 'Phuket', text: 'Kies een bestaand hotel op basis van kust, strand en reistijd — niet op de toekomstige naam.', href: tripPhuketHref, internal: '/best-hotels/phuket/' },
              ].map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
                  <div className="relative h-52 overflow-hidden"><Image src={item.image} alt={`Sfeerbeeld van hotels in ${item.title}`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /></div>
                  <div className="p-6"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{item.eyebrow}</p><h3 className="mt-2 font-display text-[1.9rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p><div className="mt-6 flex flex-wrap items-center gap-4"><Link href={item.internal} className="inline-flex items-center gap-2 text-xs font-extrabold text-jade">Lees de hotelgids <ArrowRight size={14} className="text-saffron" /></Link><a href={item.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">Bekijk live aanbod <ExternalLink size={13} /></a></div></div>
                </article>
              ))}
            </div>
            <AffiliateDisclosure className="mt-3">De links naar live hotelaanbod zijn Trip.com-affiliatelinks. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. Controleer exacte property, verblijfsdata, kamertype, belastingen, opening, recente reviews en annuleringsvoorwaarden.</AffiliateDisclosure>

            <div className="mt-12 grid gap-8 rounded-[26px] border border-jade/10 bg-jade p-7 text-white shadow-editorial-lift lg:grid-cols-[0.8fr_1.2fr] lg:p-11">
              <div><p className="eyebrow !text-saffron-light">Amazon OneLink-check</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92]">Hier hoeft geen product tussen.</h2></div>
              <div className="lg:justify-self-end"><p className="max-w-3xl text-sm font-medium leading-7 text-white/66">De taak op deze pagina is hotelstatus verifiëren en verstandig boeken. Een adapter, powerbank of strandartikel maakt die beslissing niet beter. Daarom staat hier bewust géén Amazon-blok; OneLink blijft gereserveerd voor pagina’s waar een product een echte reistaak oplost.</p><p className="mt-4 text-xs font-semibold text-saffron-light">Commerciële relevantie boven affiliate-dichtheid.</p></div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte vragen uit de zoekresultaten" title="Veelgestelde vragen over nieuwe resorts in Thailand" description="De antwoorden scheiden de actuele status op 25 juli 2026 van planning en reisadvies. Hotelopeningen en beschikbaarheid blijven veranderlijk; controleer opnieuw vlak voor boeken." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Verder kiezen"
          title="Van hotelnieuws naar een complete reisbeslissing"
          guides={[
            { title: 'Hotels in Phuket', description: 'Kies eerst de kustzone en vergelijk daarna hotels die voor jouw data werkelijk open zijn.', href: '/best-hotels/phuket/', image: '/images/redesign/phuket-hotels-hero.webp' },
            { title: 'Hotels op Koh Samui', description: 'Vergelijk rustige en levendige eilandzones voordat je op een resortnaam verliefd wordt.', href: '/best-hotels/koh-samui/', image: '/images/redesign/koh-samui-hotels-hero.webp' },
            { title: 'Hotels in Krabi', description: 'Zet Ao Nang, Railay en rustigere kustzones naast je excursie- en strandplan.', href: '/best-hotels/krabi/', image: '/images/redesign/krabi-destination-hero.webp' },
          ]}
        />

        <SourceMethodSection
          title="Een openingslijst heeft een controledatum nodig"
          description="DFS bepaalde de Nederlandse zoekintentie, concurrentie en echte PAA. Hotelstatus en kerngegevens zijn daarna teruggebracht tot actuele primaire merkpagina’s. We behandelen aankondigingen als planning, officiële hotelpagina’s als bron en een echte boekbare kamer als beslissend bewijs. Laatst gecontroleerd: 25 juli 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
