import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Building2,
  Check,
  Clock3,
  Compass,
  ExternalLink,
  Footprints,
  Glasses,
  Hotel,
  Map,
  MapPin,
  MoonStar,
  Palmtree,
  Plane,
  Route,
  Scale,
  ShieldCheck,
  Ship,
  Sparkles,
  TicketCheck,
  Users,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, cityAffiliates, withSubId } from '../../lib/affiliates';

const UPDATED_AT = '2026-07-23';
const pageUrl = 'https://go2-thailand.com/nl/compare/phuket-vs-krabi/';

const sectionNav = [
  { href: '#uitkomst' as const, label: 'Uitkomst', icon: BadgeCheck },
  { href: '#vergelijken' as const, label: 'Vergelijken', icon: Scale },
  { href: '#reisprofiel' as const, label: 'Jouw reisstijl', icon: Users },
  { href: '#combineren' as const, label: 'Combineren', icon: Route },
  { href: '#boeken' as const, label: 'Boeken', icon: TicketCheck },
  { href: '#vragen' as const, label: 'Vragen', icon: ShieldCheck },
];

const quickVerdicts = [
  { label: 'Rust & landschap', winner: 'Krabi', icon: Palmtree },
  { label: 'Keuze & gemak', winner: 'Phuket', icon: Compass },
  { label: 'Nachtleven', winner: 'Phuket', icon: MoonStar },
  { label: 'Kalksteen & eilandgevoel', winner: 'Krabi', icon: Waves },
];

const comparisonRows = [
  {
    criterion: 'Sfeer',
    phuket: 'Levendiger, groter en meer ontwikkeld. Je kunt per wijk een heel andere vakantie bouwen.',
    krabi: 'Kleinschaliger rond Ao Nang, Railay en de eilanden; natuur bepaalt sterker het ritme.',
    winner: 'Krabi voor rust',
  },
  {
    criterion: 'Stranden',
    phuket: 'Veel stranden die over de weg bereikbaar zijn, van levendig Patong tot rustiger Nai Harn en Mai Khao.',
    krabi: 'Spectaculaire karstrotsen en bootstranden; Railay en de eilandroutes zijn deel van de ervaring.',
    winner: 'Gelijkspel',
  },
  {
    criterion: 'Bereikbaarheid',
    phuket: 'De grootste keuze aan aankomstroutes en een uitgebreid eilandnetwerk, maar afstanden op het eiland tellen op.',
    krabi: 'Compactere aankomst voor Ao Nang en Railay; minder stedelijke spreiding, wel vaker een bootstap.',
    winner: 'Phuket',
  },
  {
    criterion: 'Uitjes',
    phuket: 'Grote variatie: Phang Nga Bay, Phi Phi, Old Town, strandclubs, markten en watersport.',
    krabi: 'Sterk in Hong Islands, Four Islands, Railay, kajakken, klimmen en natuur landinwaarts.',
    winner: 'Phuket voor variatie',
  },
  {
    criterion: 'Avonden',
    phuket: 'Van avondmarkt en cocktailbar tot uitgesproken nachtleven; de wijkkeuze maakt het verschil.',
    krabi: 'Meer ontspannen avonden, vooral rond Ao Nang en Krabi Town; minder reden om voor clubs te kiezen.',
    winner: 'Phuket',
  },
  {
    criterion: 'Tempo',
    phuket: 'Meer verkeer, meer opties en meer beslissingen. Goed als je graag zelf een programma samenstelt.',
    krabi: 'Makkelijker om een rustige basis te kiezen en strand, boottocht en natuur af te wisselen.',
    winner: 'Krabi',
  },
];

const profileCards = [
  {
    eyebrow: 'Eerste Thailandreis',
    title: 'Kies Phuket',
    text: 'Als een ruime keuze aan vluchten, wijken, hotels, restaurants en georganiseerde tours je onzekerheid wegneemt. Blijf buiten Patong wanneer je wel gemak maar niet het drukste nachtleven zoekt.',
    icon: Plane,
    accent: 'bg-[#eaf0ed]',
  },
  {
    eyebrow: 'Rustige strandreis',
    title: 'Kies Krabi',
    text: 'Als kalksteenlandschap, een overzichtelijke kustbasis en bootdagen belangrijker zijn dan winkelcentra of een grote uitgaansscene. Ao Nang is praktisch; Railay voelt sterker als ontsnapping.',
    icon: Palmtree,
    accent: 'bg-[#f6eee2]',
  },
  {
    eyebrow: 'Gezin met keuzevrijheid',
    title: 'Kies per verblijfplaats',
    text: 'Phuket geeft meer resort- en restaurantkeuze, terwijl Krabi een eenvoudiger ritme kan bieden. Kijk eerst naar transferduur, zwembad, strandtoegang en dagtrips — niet alleen naar de provincienaam.',
    icon: Users,
    accent: 'bg-[#eef2ea]',
  },
  {
    eyebrow: 'Actieve reiziger',
    title: 'Krabi, tenzij…',
    text: 'Krabi past sterk bij klimmen, kajakken en natuur. Kies Phuket wanneer je actieve dagen wilt combineren met Old Town, een bredere foodscene en meer avondopties.',
    icon: Footprints,
    accent: 'bg-[#f3ece4]',
  },
];

const dayRhythms = [
  {
    place: 'Een dag in Phuket',
    image: '/images/cities/phuket/phuket-old-town.webp',
    imageAlt: 'Kleurrijke historische straat in Phuket Old Town',
    steps: [
      ['08:00', 'Ontbijt en vroeg naar een rustiger strand'],
      ['11:30', 'Lunch of koffie in Old Town'],
      ['15:00', 'Viewpoint, markt of strandwissel'],
      ['19:30', 'Diner en een avond die bij je wijk past'],
    ],
    note: 'De afstanden zijn onderdeel van je planning: zet activiteiten per zone bij elkaar.',
  },
  {
    place: 'Een dag in Krabi',
    image: '/images/cities/krabi/krabi-mountain-view.webp',
    imageAlt: 'Kalksteenbergen en groene natuur in Krabi',
    steps: [
      ['07:30', 'Vroege longtail of eilandtour'],
      ['13:30', 'Terug naar strand of lunch in Ao Nang'],
      ['16:30', 'Rust, kajak of korte zonsondergangwandeling'],
      ['19:00', 'Avondmarkt of ontspannen diner'],
    ],
    note: 'Bootweer en getij sturen vaker je dag; plan daarom minder strak rondom een excursie.',
  },
];

const bookingChoices = [
  {
    partner: 'Trip.com',
    title: 'Hotels in Phuket vergelijken',
    text: 'Kies eerst een wijk die bij je ritme past. Een goedkoop hotel aan de verkeerde kant van het eiland kost dagelijks tijd.',
    href: withSubId(TRIP_GENERIC, 'compare-nl-phuket-hotels'),
    cta: 'Bekijk actuele hotels',
    icon: Building2,
  },
  {
    partner: 'Trip.com',
    title: 'Hotels in Krabi vergelijken',
    text: 'Vergelijk Ao Nang, Railay, Krabi Town en de rustigere kust. Strandtoegang en transferwijze zijn hier beslissend.',
    href: withSubId(TRIP_GENERIC, 'compare-nl-krabi-hotels'),
    cta: 'Bekijk actuele hotels',
    icon: Hotel,
  },
  {
    partner: 'Klook',
    title: 'Uitjes vanuit Phuket',
    text: 'Vergelijk vertrekpunt, groepsgrootte, bootsoort, inbegrepen transfers en de daadwerkelijke uitvoerder.',
    href: withSubId(cityAffiliates.phuket?.klook || KLOOK_GENERIC, 'compare-nl-phuket-tours'),
    cta: 'Vergelijk Phuket-uitjes',
    icon: Ship,
  },
  {
    partner: 'Klook',
    title: 'Uitjes vanuit Krabi',
    text: 'Let naast de route op pier, ophaalgebied, weersvoorwaarden en hoeveel strand- of snorkeltijd je echt krijgt.',
    href: withSubId(cityAffiliates.krabi?.klook || KLOOK_GENERIC, 'compare-nl-krabi-tours'),
    cta: 'Vergelijk Krabi-uitjes',
    icon: Waves,
  },
];

const faqs = [
  {
    question: 'Welke is beter, Krabi of Phuket?',
    answer: 'Krabi is meestal de sterkere keuze voor rust, kalksteenlandschap en een eenvoudiger strandritme. Phuket is sterker voor bereikbaarheid, hotel- en restaurantkeuze, uiteenlopende wijken en nachtleven. De beste keuze hangt dus niet af van welke bestemming “mooier” is, maar van hoeveel variatie, drukte en verplaatsing jij prettig vindt.',
  },
  {
    question: 'Is Krabi duurder dan Phuket?',
    answer: 'Niet automatisch. Phuket heeft meer luxe- en uitgaansopties, maar ook een veel grotere hotelmarkt. Krabi kan voordelig zijn vanuit Ao Nang of Krabi Town, terwijl een afgelegen strandresort met boottransfer juist duurder uitpakt. Vergelijk voor jouw data altijd dezelfde hotelklasse, locatie, bagage en transfers.',
  },
  {
    question: 'Wat is duurder, Krabi of Phuket?',
    answer: 'Je reisstijl weegt zwaarder dan de bestemming. In Phuket kunnen taxi-afstanden, beachclubs en een levendige avondplanning optellen. In Krabi kunnen private longtails, eilandtours en resorts met boottoegang de kosten verhogen. Maak daarom één totaalvergelijking van hotel, luchthavenrit, lokale ritten en de twee of drie uitjes die je echt wilt doen.',
  },
  {
    question: 'Is Krabi of Phuket leuker?',
    answer: 'Phuket voelt leuker wanneer je graag veel kunt kiezen en stranddagen afwisselt met Old Town, markten, restaurants en uitgaan. Krabi voelt leuker wanneer natuur, boottochten, kajakken, klimmen en rustige avonden je ideale vakantie vormen. Voor twijfelgevallen werkt vier nachten Phuket plus vier nachten Krabi vaak beter dan geforceerd één winnaar kiezen.',
  },
  {
    question: 'Kun je Phuket en Krabi combineren?',
    answer: 'Ja. Beide liggen aan de Andamanse kust en zijn over land en, afhankelijk van route en seizoen, per boot te combineren. Reken niet alleen de gepubliceerde ritduur: hotelophaalpunt, pier of terminal, wachttijd en de laatste transfer bepalen je werkelijke halve reisdag.',
  },
  {
    question: 'Hoeveel dagen heb je nodig voor Phuket en Krabi?',
    answer: 'Voor één bestemming zijn vier tot zes nachten een bruikbaar startpunt als je ook een eiland- of natuurdag wilt plannen. Voor beide samen voelt acht tot tien nachten rustiger. Met minder tijd is één goede basis vaak waardevoller dan twee korte verblijven en een extra transferdag.',
  },
];

const relatedGuides = [
  {
    title: 'Krabi reisgids',
    description: 'Bouw je Krabi-keuze verder uit met stranden, route, weer en praktische planning.',
    href: '/city/krabi/',
    image: '/images/redesign/krabi-destination-hero.webp',
    imageAlt: 'Longtailboot en kalksteenrotsen in Krabi',
  },
  {
    title: 'Waar verblijven in Krabi',
    description: 'Vergelijk Ao Nang, Railay, Krabi Town en rustige kustbases op echte trade-offs.',
    href: '/best-hotels/krabi/',
    image: '/images/redesign/krabi-hotel-beach-resort.webp',
    imageAlt: 'Resort aan de kust van Krabi',
  },
  {
    title: 'Vervoer in Thailand',
    description: 'Vergelijk je hele reisdag en niet alleen de geadverteerde rit- of vaartijd.',
    href: '/transport/',
    image: '/images/blog/bangkok-chiang-mai-sleeper-train-guide-2026.webp',
    imageAlt: 'Vervoer plannen tijdens een rondreis door Thailand',
  },
];

const sources = [
  {
    title: 'Phuket — officieel bestemmingsprofiel',
    creator: 'Tourism Authority of Thailand',
    url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350',
    note: 'Officiële context voor de strandgebieden, Old Town en de rol van nachtleven binnen het bredere Phuket-aanbod.',
  },
  {
    title: 'Krabi — officieel bestemmingsprofiel',
    creator: 'Tourism Authority of Thailand',
    url: 'https://www.tourismthailand.org/Destinations/Provinces/Krabi/344',
    note: 'Officiële context voor stranden, eilanden, kalksteenlandschap, natuur en duiken in de provincie Krabi.',
  },
  {
    title: 'Phuket International Airport',
    creator: 'Airports of Thailand',
    url: 'https://phuket.airportthai.co.th/',
    note: 'Officiële luchthaveninformatie en grondvervoer; gebruikt om bereikbaarheid niet alleen op algemene reisblogs te baseren.',
  },
  {
    title: 'Krabi International Airport',
    creator: 'Department of Airports Thailand',
    url: 'https://minisite.airports.go.th/krabi/',
    note: 'Officiële luchthavenbron voor actuele passagiersinformatie en faciliteiten in Krabi.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Phuket of Krabi vergelijken',
      description: 'Phuket en Krabi vergeleken op sfeer, stranden, bereikbaarheid, uitjes, avonden en reistempo.',
      url: pageUrl,
      numberOfItems: comparisonRows.length,
      inLanguage: 'nl-NL',
      itemListElement: comparisonRows.map((row, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: row.criterion,
        description: `Phuket: ${row.phuket} Krabi: ${row.krabi} Uitkomst: ${row.winner}.`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Bestemmingen', item: 'https://go2-thailand.com/nl/city/' },
        { '@type': 'ListItem', position: 3, name: 'Phuket of Krabi', item: pageUrl },
      ],
    },
  ];
}

function HeroVerdictCard() {
  return (
    <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-20 hidden w-[330px] rounded-2xl border border-white/55 bg-white/88 p-5 shadow-editorial-lift backdrop-blur-xl xl:block">
      <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">De korte uitkomst</p>
      <p className="mt-2 font-display text-[1.8rem] font-semibold leading-[0.98] text-jade">Meer keuze of meer rust?</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-jade p-4 text-white">
          <Building2 size={18} className="text-saffron" aria-hidden="true" />
          <p className="mt-3 text-xs font-extrabold">Phuket</p>
          <p className="mt-1 text-[10px] leading-4 text-white/68">Keuze, gemak, avonden</p>
        </div>
        <div className="rounded-xl bg-tonal p-4 text-jade">
          <Palmtree size={18} className="text-saffron-dark" aria-hidden="true" />
          <p className="mt-3 text-xs font-extrabold">Krabi</p>
          <p className="mt-1 text-[10px] leading-4 text-charcoal/58">Natuur, rust, bootdagen</p>
        </div>
      </div>
      <a href="#reisprofiel" className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-jade">
        Kies op reisstijl <ArrowRight size={14} className="text-saffron" aria-hidden="true" />
      </a>
    </aside>
  );
}

export default function PhuketKrabiComparisonGuide() {
  const schemas = createSchemas();
  const transferHref = withSubId(TWELVEGO_GENERIC, 'compare-nl-phuket-krabi-transfer');

  return (
    <>
      <SEOHead
        title="Phuket of Krabi? Eerlijke vergelijking per reisstijl"
        description="Phuket of Krabi kiezen? Vergelijk sfeer, stranden, drukte, uitjes, bereikbaarheid en kosten — met een helder advies per reisstijl."
        ogImage="https://go2-thailand.com/images/redesign/phuket-vs-krabi-hero.webp"
      >
        {schemas.map((schema) => (
          <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/phuket-vs-krabi-hero.webp"
          imageAlt="Panoramisch contrast tussen de ontwikkelde kust van Phuket en de kalksteenrotsen van Krabi"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bestemmingen', href: '/city/' }, { label: 'Phuket of Krabi' }]}
          eyebrow="Twee kusten · één echte keuze"
          title={<>Phuket <span className="text-saffron-dark">of</span>{' '}<br />Krabi?</>}
          subtitle="Kies op reisstijl, niet op de mooiste foto."
          description={<>Phuket geeft je meer keuze, verbindingen en avondleven. Krabi geeft je een rustiger ritme en het sterkere kalksteenlandschap. Hier zie je welke bestemming bij <em>jouw</em> reis past — en wanneer je ze beter combineert.</>}
          actions={[
            { label: 'Bekijk de uitkomst', href: '#uitkomst', kind: 'primary' },
            { label: 'Vergelijk per reisstijl', href: '#reisprofiel', kind: 'secondary' },
          ]}
          sideCard={<HeroVerdictCard />}
          minHeightClassName="min-h-[720px] lg:min-h-[680px]"
          titleClassName="max-w-[630px] text-[4.7rem] leading-[0.82] sm:text-[6rem] lg:text-[7.2rem]"
          contentClassName="max-w-[670px]"
          imageClassName="object-cover object-[58%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.08)_0%,rgba(252,250,246,0.76)_58%,rgba(252,250,246,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.86)_34%,rgba(252,250,246,0.15)_58%,rgba(10,50,43,0.04)_100%)]"
        />

        <PageSectionNav items={sectionNav} />

        <section id="uitkomst" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading
              eyebrow="Direct antwoord"
              title={<>De beste keuze<br />in één minuut</>}
              description="Er is geen algemene winnaar. De goede bestemming is degene waarvan het dagelijkse ritme bij je past — ook nadat de zonsondergangfoto is gemaakt."
            />
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {quickVerdicts.map(({ label, winner, icon: Icon }) => (
                  <div key={label} className="group flex items-center gap-4 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-tonal text-jade transition group-hover:bg-jade group-hover:text-saffron"><Icon size={20} aria-hidden="true" /></span>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-charcoal/45">{label}</p>
                      <p className="mt-1 font-display text-[1.55rem] font-semibold leading-none text-jade">{winner}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-6 overflow-hidden rounded-2xl bg-jade p-7 text-white shadow-editorial-lift sm:p-9">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-dashed border-saffron/45" aria-hidden="true" />
                <Sparkles className="text-saffron" size={24} aria-hidden="true" />
                <p className="mt-5 font-display text-[2.1rem] font-semibold leading-[0.98]">Ons redactionele advies</p>
                <p className="mt-4 max-w-[720px] text-sm font-medium leading-7 text-white/76">Kies <strong className="text-white">Phuket</strong> voor een eerste reis met maximale keuzevrijheid, een brede foodscene en avonden die je zelf kunt opschalen. Kies <strong className="text-white">Krabi</strong> wanneer natuur het hoofddoel is en je liever één rustige basis met sterke boot- en stranddagen hebt. Heb je acht tot tien nachten? Dan is combineren vaak de eerlijkste winnaar.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="vergelijken" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Zij aan zij" title="Phuket vs Krabi" description="Geen totaalscore die alles plat slaat. Per criterium zie je het voordeel én de prijs die je ervoor betaalt." />
              <p className="max-w-[340px] text-xs font-medium leading-6 text-charcoal/55">Veeg op mobiel horizontaal door de vergelijking. De uitkomst is een redactionele keuzehulp, geen gebruikersrating.</p>
            </div>
            <div className="mt-9 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <table className="w-full min-w-[940px] border-collapse text-left">
                <thead>
                  <tr className="bg-jade text-white">
                    <th className="w-[16%] px-6 py-5 text-[10px] font-extrabold uppercase tracking-[0.14em]">Criterium</th>
                    <th className="w-[34%] px-6 py-5 font-display text-2xl font-semibold">Phuket</th>
                    <th className="w-[34%] px-6 py-5 font-display text-2xl font-semibold">Krabi</th>
                    <th className="w-[16%] px-6 py-5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-saffron">Uitkomst</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-jade/10">
                  {comparisonRows.map((row, index) => (
                    <tr key={row.criterion} className={index % 2 ? 'bg-canvas/55' : 'bg-white'}>
                      <th scope="row" className="px-6 py-6 text-sm font-extrabold text-jade">{row.criterion}</th>
                      <td className="px-6 py-6 text-xs font-medium leading-6 text-charcoal/68">{row.phuket}</td>
                      <td className="px-6 py-6 text-xs font-medium leading-6 text-charcoal/68">{row.krabi}</td>
                      <td className="px-6 py-6"><span className="inline-flex rounded-full bg-tonal px-3 py-2 text-[10px] font-extrabold text-jade">{row.winner}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="reisprofiel" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Kies jouw profiel" title={<>Voor wie wint<br />welke bestemming?</>} description="Eenzelfde plek kan voor twee reizigers een totaal andere keuze zijn. Begin bij je gewenste dagritme en pas daarna bij hotels en tours." />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {profileCards.map(({ eyebrow, title, text, icon: Icon, accent }, index) => (
                <article key={eyebrow} className="relative overflow-hidden rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-8">
                  <div className={`absolute right-0 top-0 h-full w-24 ${accent}`} aria-hidden="true" />
                  <div className="relative grid gap-5 sm:grid-cols-[auto_1fr]">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-jade/10 bg-canvas text-jade"><Icon size={24} aria-hidden="true" /></span>
                    <div className="pr-8">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{eyebrow}</p>
                      <h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{title}</h3>
                      <p className="mt-4 text-sm font-medium leading-7 text-charcoal/65">{text}</p>
                    </div>
                  </div>
                  <span className="absolute bottom-5 right-6 font-display text-5xl font-semibold text-jade/8" aria-hidden="true">0{index + 1}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-mist py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Voel het verschil" title="Twee vakanties, uur voor uur" description="De bestemmingen verschillen minder in lijstjes dan in tempo. Dit zijn voorbeeldritmes — geen programma dat je verplicht moet afvinken." />
            <div className="mt-9 grid gap-6 lg:grid-cols-2">
              {dayRhythms.map((day) => (
                <article key={day.place} className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-lift">
                  <div className="relative h-56">
                    <Image src={day.image} alt={day.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-jade/85 via-jade/10 to-transparent" />
                    <h3 className="absolute bottom-5 left-6 font-display text-[2.3rem] font-semibold leading-none text-white">{day.place}</h3>
                  </div>
                  <div className="p-6 sm:p-8">
                    <ol className="relative space-y-5 before:absolute before:bottom-3 before:left-[4.15rem] before:top-3 before:border-l before:border-dashed before:border-saffron/55">
                      {day.steps.map(([time, activity]) => (
                        <li key={time} className="relative grid grid-cols-[3.4rem_auto_1fr] items-start gap-3">
                          <span className="pt-1 text-[10px] font-extrabold text-saffron-dark">{time}</span>
                          <span className="mt-1.5 h-3 w-3 rounded-full border-[3px] border-white bg-saffron shadow-[0_0_0_1px_rgba(239,143,45,0.4)]" aria-hidden="true" />
                          <span className="text-sm font-bold leading-6 text-jade">{activity}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-7 rounded-xl bg-tonal px-5 py-4 text-xs font-medium leading-5 text-charcoal/62"><Clock3 size={15} className="mr-2 inline text-jade" aria-hidden="true" />{day.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="combineren" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-jade px-7 py-10 text-white shadow-editorial-lift sm:px-10 lg:px-14 lg:py-14">
              <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,#fff_1px,transparent_1.5px)] [background-size:18px_18px]" aria-hidden="true" />
              <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <p className="eyebrow text-saffron">Waarom kiezen?</p>
                  <h2 className="font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.04em] lg:text-[4.2rem]">Phuket én Krabi<br />in één route</h2>
                  <p className="mt-6 max-w-[520px] text-sm font-medium leading-7 text-white/72">Met acht tot tien nachten hoef je de tegenstelling niet weg te redeneren. Start in Phuket voor aankomstgemak en variatie, reis daarna naar Krabi en laat de route steeds rustiger worden. Draai hem om wanneer je juist met meer restaurant- en avondkeuze wilt eindigen.</p>
                  <a href={transferHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Vergelijk de transfer <ExternalLink size={15} aria-hidden="true" /></a>
                  <AffiliateDisclosure className="mt-3 text-white/46">Affiliate-link naar 12Go. Controleer uitvoerder, vertrekpunt, bagage en voorwaarden vóór je boekt.</AffiliateDisclosure>
                </div>
                <div className="relative min-h-[260px] rounded-2xl border border-white/15 bg-white/7 p-6 sm:p-8">
                  <div className="absolute left-[18%] right-[18%] top-1/2 border-t-2 border-dashed border-saffron/70" aria-hidden="true" />
                  <Ship className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade p-2 text-saffron" size={44} aria-hidden="true" />
                  <div className="relative flex h-full min-h-[200px] items-center justify-between gap-6">
                    <div className="max-w-[165px] rounded-2xl bg-white p-5 text-jade shadow-editorial-card">
                      <MapPin size={20} className="text-saffron-dark" aria-hidden="true" />
                      <p className="mt-3 font-display text-2xl font-semibold">Phuket</p>
                      <p className="mt-2 text-[10px] font-medium leading-4 text-charcoal/55">3–4 nachten · wijk, food & strand</p>
                    </div>
                    <div className="max-w-[165px] rounded-2xl bg-tonal p-5 text-jade shadow-editorial-card">
                      <MapPin size={20} className="text-saffron-dark" aria-hidden="true" />
                      <p className="mt-3 font-display text-2xl font-semibold">Krabi</p>
                      <p className="mt-2 text-[10px] font-medium leading-4 text-charcoal/55">4–5 nachten · natuur, boot & rust</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="boeken" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Pas ná je keuze" title="Boek de juiste basis" description="De bestemming is pas stap één. Wijk, hoteltoegang, pier en uitvoerder bepalen hoeveel gemak je werkelijk koopt." />
              <div className="flex items-center gap-2 text-xs font-bold text-jade"><Glasses size={17} className="text-saffron-dark" aria-hidden="true" /> Transparant geselecteerd, niet betaald gerangschikt</div>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {bookingChoices.map(({ partner, title, text, href, cta, icon: Icon }) => (
                <article key={title} className="flex min-h-[330px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-mist text-jade"><Icon size={21} aria-hidden="true" /></span>
                    <span className="rounded-full bg-tonal px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">via {partner}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-[1.02] text-jade">{title}</h3>
                  <p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{text}</p>
                  <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{cta}<ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" aria-hidden="true" /></a>
                </article>
              ))}
            </div>
            <AffiliateDisclosure className="mt-4">De boekingsknoppen zijn affiliate-links. Go2Thailand kan een commissie ontvangen zonder dat jouw prijs stijgt. Beschikbaarheid, prijzen, inclusies en voorwaarden komen van de aanbieder en kunnen wijzigen.</AffiliateDisclosure>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.74fr_1.26fr]">
            <SectionHeading eyebrow="Beslis zonder spijt" title="Controleer deze vier dingen" description="Een sterke vergelijking eindigt niet bij een winnaar. Controleer of die keuze ook klopt voor je maand, hotel en daadwerkelijke reisdag." />
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {[
                ['Je maand', 'Beide liggen aan de Andamanse kust, maar vaaromstandigheden en aanbod kunnen per periode veranderen.', Waves],
                ['Je basis', 'Patong is niet heel Phuket en Railay is niet heel Krabi. Vergelijk de plek waar je echt zult slapen.', BedDouble],
                ['Je transfer', 'Tel hotelophaalpunt, wachttijd, bagage en de laatste kilometer mee naast de kale ritduur.', Route],
                ['Je hoofdreden', 'Schrijf je drie belangrijkste vakantiewensen op. De bestemming die er twee duidelijk wint, is meestal de juiste.', Check],
              ].map(([title, text, Icon]) => {
                const IconComponent = Icon as typeof Map;
                return (
                  <div key={String(title)} className="border-t border-jade/12 pt-5">
                    <IconComponent size={19} className="text-saffron-dark" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-[1.55rem] font-semibold leading-none text-jade">{String(title)}</h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FaqSplitSection
          eyebrow="Echte zoekvragen"
          title="Veelgestelde vragen over Phuket of Krabi"
          description="Deze vragen komen letterlijk uit de Nederlandse Google-resultaten van 23 juli 2026. Antwoorden zijn afgestemd op dezelfde keuzecriteria als de zichtbare vergelijking."
          items={faqs}
        />

        <RelatedGuidesSection
          title="Plan verder na je keuze"
          guides={relatedGuides}
          sideLink={{ label: 'Bekijk uitjes op Klook', href: withSubId(KLOOK_GENERIC, 'compare-nl-related'), affiliate: true }}
          disclosure="De Klook-link is een affiliate-link. De redactionele volgorde van de gidsen wordt hierdoor niet bepaald."
        />

        <SourceMethodSection
          title="Zo is deze vergelijking gemaakt"
          description={`Zoekintentie, concurrenten en echte PAA-vragen zijn op ${UPDATED_AT} met DataForSEO voor Nederland onderzocht. Bestemmings- en luchthavenclaims zijn getoetst aan officiële Thaise bronnen. We gebruiken geen samengestelde reviewscore en noemen geen dagprijs zonder live boekingscontext.`}
          sources={sources}
        />
      </main>
    </>
  );
}
