import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Backpack,
  Check,
  CircleDollarSign,
  Clock3,
  Compass,
  ExternalLink,
  HeartPulse,
  Hotel,
  Landmark,
  Map,
  MapPin,
  Navigation,
  PlaneLanding,
  ShieldCheck,
  Smartphone,
  Sun,
  TicketCheck,
  TrainFront,
  TriangleAlert,
  Utensils,
  WalletCards,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { SAILY_GENERIC, TWELVEGO_GENERIC, withSubId } from '../../lib/affiliates';

const UPDATED_AT = '2026-07-26';
const routeGuideHref = '/itineraries/';

const sectionNav = [
  { href: '#start' as const, label: 'Start', icon: Compass },
  { href: '#route' as const, label: 'Route', icon: Map },
  { href: '#eerste-48-uur' as const, label: 'Eerste 48 uur', icon: Clock3 },
  { href: '#valkuilen' as const, label: 'Valkuilen', icon: TriangleAlert },
  { href: '#inpakken' as const, label: 'Inpakken', icon: Backpack },
  { href: '#vragen' as const, label: 'Vragen', icon: ShieldCheck },
];

const routeChoices = [
  {
    title: 'Stad, noord & strand',
    label: 'De eerste-keer klassieker',
    duration: 'circa 14 dagen',
    route: 'Bangkok → Chiang Mai → Krabi',
    description: 'Drie duidelijke bases geven contrast zonder dat je om de dag je tas opnieuw inpakt.',
    image: '/images/blog/bangkok-chiang-mai-sleeper-train-guide-2026.webp',
    imageAlt: 'Nachttrein tussen Bangkok en Chiang Mai als onderdeel van een Thailandroute',
    href: routeGuideHref,
  },
  {
    title: 'Bangkok & één kustbasis',
    label: 'Voor een kortere reis',
    duration: 'circa 9–11 dagen',
    route: 'Bangkok → Krabi of Koh Samui',
    description: 'Minder verplaatsingen, meer tijd om te landen en ruimte voor twee of drie dagtrips.',
    image: '/images/blog/krabi-travel-guide.webp',
    imageAlt: 'Thaise kust met kalksteenrotsen, tempel en avondmarkt',
    href: '/city/krabi/',
  },
  {
    title: 'Cultuur & rustig tempo',
    label: 'Voor reizigers zonder haast',
    duration: 'circa 12–16 dagen',
    route: 'Bangkok → Ayutthaya → Chiang Mai',
    description: 'Sterk als eten, tempels, historie en een comfortabel reistempo belangrijker zijn dan eilandhoppen.',
    image: '/images/blog/ayutthaya-day-trip-train-bangkok-temples-guide-2026.webp',
    imageAlt: 'Historische tempels van Ayutthaya tijdens een treinreis vanuit Bangkok',
    href: '/city/ayutthaya/',
  },
];

const readinessChecks = [
  {
    title: 'Documenten',
    text: 'Controleer paspoort, actuele inreisregels en de Thailand Digital Arrival Card vlak voor vertrek.',
    href: '/visa/',
    label: 'Open visumgids',
    icon: TicketCheck,
  },
  {
    title: 'Gezondheid',
    text: 'Laat je advies afhangen van route, reisduur en persoonlijke gezondheid; plan dit niet op de laatste dag.',
    href: '/practical-info/health-vaccinations/',
    label: 'Gezondheid voorbereiden',
    icon: HeartPulse,
  },
  {
    title: 'Eerste nacht',
    text: 'Boek je eerste accommodatie en bewaar adres en reservering ook offline op je telefoon.',
    href: '/best-hotels/bangkok/',
    label: 'Kies een wijk in Bangkok',
    icon: Hotel,
  },
  {
    title: 'Verbinding',
    text: 'Regel data vóór aankomst of op de luchthaven, zodat route, Grab en hotelcontact direct werken.',
    href: '/travel-guides/sim-card-thailand/',
    label: 'Bekijk de SIM- en eSIM-gids',
    icon: Smartphone,
  },
];

const arrivalTimeline = [
  {
    time: 'Voor landing',
    title: 'Zet je bewijsstukken offline',
    text: 'Sla hoteladres, verzekeringsnummer, paspoortkopie en vervolgboeking op waar je ook zonder data bij kunt.',
    icon: PlaneLanding,
  },
  {
    time: 'Uur 1–3',
    title: 'Eerst data, daarna vervoer',
    text: 'Verbind je telefoon, controleer je aankomstterminal en vergelijk de officiële taxi-, rail- of transferoptie.',
    icon: Smartphone,
  },
  {
    time: 'Dag 1',
    title: 'Plan maar één ankerpunt',
    text: 'Kies één wijkwandeling, tempel of avondmarkt. Jetlag plus hitte maakt een volle lijst zelden leuker.',
    icon: MapPin,
  },
  {
    time: 'Dag 2',
    title: 'Maak de stad klein',
    text: 'Combineer plekken per wijk of vervoerslijn en laat ruimte voor eten, rust en een onverwachte omweg.',
    icon: Navigation,
  },
];

const planningCards = [
  {
    title: 'Budget zonder schijnprecisie',
    text: 'Bereken eerst vlucht, nachten en lange verplaatsingen. Voeg daarna een dagpot toe voor eten, lokaal vervoer en activiteiten. Zo past het bedrag bij jouw comfortniveau.',
    href: '/thailand-index/budget/',
    label: 'Open budgetgids',
    icon: CircleDollarSign,
  },
  {
    title: 'Vervoer per traject',
    text: 'Een vlucht is niet automatisch het snelst. Vergelijk deur tot deur: hoteltransfer, wachttijd, terminal en de laatste kilometer tellen mee.',
    href: '/transport/',
    label: 'Vergelijk vervoersvormen',
    icon: TrainFront,
  },
  {
    title: 'Weer per regio',
    text: 'Thailand heeft geen identiek seizoen in elke kustregio. Kies eerst je maand en leg daarna pas eiland of kust vast.',
    href: '/weather/',
    label: 'Bekijk Thailand weer',
    icon: Sun,
  },
  {
    title: 'Veilig zonder angstlijst',
    text: 'De grootste winst zit in verkeerskeuzes, actuele reisadviezen, zwemwaarschuwingen en het bewaren van je originele paspoort.',
    href: '/is-thailand-safe/',
    label: 'Lees de veiligheidsgids',
    icon: ShieldCheck,
  },
];

const mistakes = [
  {
    number: '01',
    title: 'Te veel bases plannen',
    wrong: 'Vijf eilanden in tien dagen lijken op papier efficiënt.',
    better: 'Kies minder bases en gebruik dagtrips voor variatie. Je houdt meer vakantie over en minder wachttijd.',
  },
  {
    number: '02',
    title: 'Een scooter als standaardoplossing zien',
    wrong: '“Iedereen doet het” is geen rijbevoegdheid of verzekering.',
    better: 'Controleer rijbewijs, dekking en ervaring. Gebruik zonder passende bevoegdheid een transfer, taxi of lokaal vervoer.',
  },
  {
    number: '03',
    title: 'Alleen de ritduur vergelijken',
    wrong: 'Een vlucht van een uur klinkt altijd beter dan een trein.',
    better: 'Tel beide hotelritten, inchecken, wachten en bagage mee. De nachttrein kan tegelijk vervoer én overnachting zijn.',
  },
  {
    number: '04',
    title: 'Tempels als fotodecor behandelen',
    wrong: 'Een mooie locatie blijft een religieuze plek met eigen omgangsvormen.',
    better: 'Bedek schouders en knieën waar gevraagd, trek schoenen uit en volg aanwijzingen ter plaatse.',
  },
  {
    number: '05',
    title: 'Belangrijke informatie alleen online bewaren',
    wrong: 'Een lege batterij of tijdelijk geen netwerk haalt dan je hele plan onderuit.',
    better: 'Bewaar adressen, tickets, verzekering en noodnummers ook offline en deel je route met iemand thuis.',
  },
  {
    number: '06',
    title: 'Boeken zonder uitvoerder te lezen',
    wrong: 'Een verkoopplatform is niet altijd de partij die trein, ferry of tour uitvoert.',
    better: 'Controleer operator, vertrekpunt, bagage, annuleringsregels en wie je bij vertraging moet bellen.',
  },
];

const packingEssentials = [
  'Luchtige kleding die snel droogt',
  'Dunne laag of sjaal voor tempels en airco',
  'Zonnebescherming en muggenwering',
  'Herbruikbare fles en kleine dagrugzak',
  'Medicijnen plus eventuele verklaring',
  'Offline kopieën van belangrijke documenten',
];

const packingGear = [
  { name: 'Compacte reisadapter', note: 'Voor hotelkamers met verschillende stopcontacten.', slug: 'momax-travel-adapter' },
  { name: 'Powerbank voor reisdagen', note: 'Handig voor navigatie, vouchers en lange transfers.', slug: 'anker-powercore-10k' },
  { name: 'Opvouwbare dagrugzak', note: 'Voor markt, tempeldag of korte boottocht.', slug: 'venture-pal-packable-backpack' },
  { name: 'Lichte regenponcho', note: 'Klein mee te nemen en bruikbaar bij een tropische bui.', slug: 'hagon-rain-ponchos' },
] as const;

const faqs = [
  {
    question: 'Waar moet je op letten als je naar Thailand gaat?',
    answer: 'Controleer vlak voor vertrek het officiële reisadvies, je paspoort- en inreisvereisten, de Thailand Digital Arrival Card, je verzekeringsdekking en gezondheidsadvies. Ter plaatse verdienen vooral verkeer, scooterhuur, zwemwaarschuwingen en het veilig bewaren van je originele paspoort extra aandacht.',
  },
  {
    question: 'Wat te doen tijdens je eerste bezoek aan Thailand?',
    answer: 'Kies twee of drie duidelijke bases en bouw contrast in: bijvoorbeeld Bangkok, Noord-Thailand en één zuidelijke kustbasis. Plan niet iedere dag dicht. Eén hoofdactiviteit plus tijd voor eten, vervoer en spontane ontdekkingen werkt voor een eerste reis meestal beter.',
  },
  {
    question: 'Hoeveel geld heb je nodig voor twee weken Thailand?',
    answer: 'Dat hangt vooral af van vlucht, hotelniveau, binnenlandse verplaatsingen en betaalde tours. Maak daarom vier aparte budgetpotten: internationale vlucht, accommodatie, lange transfers en dagelijkse uitgaven. Tel daarna een buffer voor bagage, veranderde plannen en medische of praktische onverwachte kosten op. De budgetgids helpt je deze posten voor jouw reisstijl te ramen.',
  },
  {
    question: 'Wat moet je vermijden in Thailand?',
    answer: 'Vermijd het afgeven van je originele paspoort als borg, rijden zonder passende bevoegdheid en verzekering, zwemmen bij een rode vlag, drugsbezit en het negeren van actuele regionale reisadviezen. Wees ook terughoudend bij aanbiedingen waarbij vertrekpunt, operator of voorwaarden onduidelijk blijven.',
  },
  {
    question: 'Wat mag je zeker niet vergeten voor Thailand?',
    answer: 'Een geldig paspoort, de actuele aankomstregistratie, reisverzekering, medicijnen en verklaringen waar nodig, offline reserveringen, een werkende betaaloptie en een telefoonverbinding. Kleding en toiletartikelen zijn lokaal gemakkelijk aan te vullen; documenten en dekking niet.',
  },
  {
    question: 'Is Thailand geschikt voor een eerste verre reis?',
    answer: 'Voor veel reizigers wel: er zijn veel vervoersopties, accommodaties en reisservices. Toch blijft voorbereiding nodig. Beperk je route, leg de eerste nacht vast en controleer officiële informatie over veiligheid, gezondheid en inreisregels vlak voor vertrek.',
  },
];

const relatedGuides = [
  {
    title: 'Mooiste plekken',
    description: 'Kies je bases per regio en reisstijl voordat je losse hotels of tours vastlegt.',
    href: '/city/',
    image: '/images/redesign/destination-bangkok.webp',
    imageAlt: 'Bangkok als een van de bestemmingen voor een eerste Thailandreis',
  },
  {
    title: 'Vervoer in Thailand',
    description: 'Vergelijk trein, bus, ferry, vlucht en transfer op de hele reisdag.',
    href: '/transport/',
    image: '/images/blog/bangkok-chiang-mai-sleeper-train-guide-2026.webp',
    imageAlt: 'Nachttrein voor vervoer door Thailand',
  },
  {
    title: 'Thailand weer',
    description: 'Koppel je maand aan de juiste kust en laat ruimte voor regionale verschillen.',
    href: '/weather/',
    image: '/images/blog/beste-tijd-thailand-bezoeken-per-regio.webp',
    imageAlt: 'Thailandlandschap tijdens het plannen van de beste reistijd',
  },
];

const sources = [
  {
    title: 'Reisadvies Thailand',
    creator: 'NederlandWereldwijd · Ministerie van Buitenlandse Zaken',
    url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand',
    note: 'Actuele regionale veiligheidsrisico’s, paspoort- en visuminformatie, verkeer, noodnummers en voorbereiding voor Nederlandse reizigers.',
  },
  {
    title: 'Thailand Digital Arrival Card',
    creator: 'Thai Immigration Bureau',
    url: 'https://tdac.immigration.go.th/',
    note: 'Officiële aankomstregistratie voor niet-Thaise reizigers en de actuele indieningsinstructies.',
  },
  {
    title: 'Official Thailand E-Visa',
    creator: 'Ministry of Foreign Affairs of Thailand',
    url: 'https://www.thaievisa.go.th/',
    note: 'Officiële controle voor visumplicht, verblijfsduur, visumcategorie en aanvraagstappen.',
  },
  {
    title: 'Vaccinaties Thailand',
    creator: 'GGD Reisvaccinaties',
    url: 'https://www.ggdreisvaccinaties.nl/land/thailand',
    note: 'Persoons- en reisgebonden gezondheidsadvies; route, duur en gezondheid bepalen wat voor jou relevant is.',
  },
];

function createSchemas() {
  const pageUrl = 'https://go2-thailand.com/nl/thailand-for-first-timers/';
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Eerste keer Thailand: praktische beginnersgids',
      description: 'Een beslisgids voor je eerste Thailandreis met routekeuze, voorbereiding, eerste 48 uur, valkuilen en paklijst.',
      image: 'https://go2-thailand.com/images/redesign/first-time-thailand-hero.webp',
      datePublished: '2026-03-02',
      dateModified: UPDATED_AT,
      inLanguage: 'nl-NL',
      mainEntityOfPage: pageUrl,
      author: { '@type': 'Organization', name: 'Go2 Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2 Thailand', url: 'https://go2-thailand.com/' },
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
        { '@type': 'ListItem', position: 2, name: 'Reisgidsen', item: 'https://go2-thailand.com/nl/travel-guides/' },
        { '@type': 'ListItem', position: 3, name: 'Eerste keer Thailand', item: pageUrl },
      ],
    },
  ];
}

export default function FirstTimeThailandGuide() {
  const schemas = createSchemas();

  return (
    <>
      <SEOHead
        title="Eerste keer Thailand? Praktische beginnersgids 2026"
        description="Eerste keer naar Thailand? Kies een haalbare route en bereid documenten, vervoer, budget, je eerste 48 uur en paklijst stap voor stap voor."
        ogImage="https://go2-thailand.com/images/redesign/first-time-thailand-hero.webp"
      >
        {schemas.map((schema) => (
          <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/first-time-thailand-hero.webp"
          imageAlt="Reiziger die voor het eerst aankomt aan de Chao Phraya-rivier in Bangkok"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisgidsen', href: '/travel-guides/' }, { label: 'Eerste keer' }]}
          eyebrow="Van losse tips naar een rustige eerste reis"
          title={<>Eerste keer{' '}<span className="block">Thailand.</span></>}
          subtitle={<>Zo voelt het niet.</>}
          description="Kies eerst een haalbare route. Regel daarna alleen wat vóór vertrek echt vast moet staan — en laat genoeg ruimte over om Thailand onderweg te ontdekken."
          actions={[
            { label: 'Kies je route', href: '#route', kind: 'primary' },
            { label: 'Vergelijk vervoer', href: withSubId(TWELVEGO_GENERIC, 'first-time-nl-hero'), kind: 'secondary', affiliate: true, newTab: true, ariaLabel: 'Vergelijk actuele vervoerstickets voor Thailand op 12Go' },
          ]}
          disclosure="Affiliate-link: boek je via 12Go, dan ontvangen wij mogelijk commissie zonder extra kosten voor jou. Controleer altijd uitvoerder en voorwaarden."
          minHeightClassName="min-h-[760px] lg:min-h-[720px]"
          titleClassName="max-w-[620px] text-[4.45rem] leading-[0.8] sm:text-[5.5rem] lg:text-[6.2rem]"
          subtitleClassName="max-w-[520px] text-[2.2rem] leading-[0.9] text-saffron-dark sm:text-[2.8rem]"
          imageClassName="object-cover object-[62%_center] lg:object-center"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[310px] rounded-2xl border border-white/50 bg-white/82 p-5 shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Controle vóór vertrek</p>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-canvas text-jade"><ShieldCheck size={17} /></span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-extrabold text-jade">
                {['Paspoort', 'TDAC', 'Dekking', 'Eerste nacht'].map((item) => <span key={item} className="flex items-center gap-2 rounded-lg bg-canvas px-3 py-2"><Check size={12} className="text-saffron" />{item}</span>)}
              </div>
              <p className="mt-4 border-t border-jade/10 pt-4 text-[10px] font-medium leading-4 text-charcoal/55">Bronnen laatst gecontroleerd op 26 juli 2026. Controleer officiële regels opnieuw vlak voor vertrek.</p>
            </aside>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section id="start" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Eerst even oriënteren"
                title={<>Wat staat vast.<br />Wat blijft vrij.</>}
                description="Voor een eerste Thailandreis hoef je niet alles vooraf te boeken. Het verschil zit vooral in weten welke beslissingen andere keuzes blokkeren — en welke je gerust later neemt."
              />
              <div className="relative mt-9 hidden h-28 max-w-[310px] lg:block" aria-hidden="true">
                <div className="absolute left-2 top-12 h-14 w-[88%] rounded-[50%] border-b-2 border-dashed border-saffron/70" />
                <Sun className="absolute left-0 top-4 text-saffron" size={28} strokeWidth={1.5} />
                <MapPin className="absolute bottom-0 right-2 text-jade" size={30} strokeWidth={1.5} />
                <span className="absolute left-[46%] top-[70px] h-2 w-2 rounded-full bg-saffron" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {readinessChecks.map(({ title, text, href, label, icon: Icon }, index) => (
                <article key={title} className={`group rounded-2xl border p-6 shadow-editorial-card ${index === 0 ? 'border-saffron/30 bg-tonal' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={20} /></span>
                    <span className="font-display text-3xl font-semibold text-jade/14">0{index + 1}</span>
                  </div>
                  <h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h2>
                  <p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{text}</p>
                  <Link href={href} className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label}<ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Kies je reisritme"
                title={<>Drie routes.<br />Geen afvinklijst.</>}
                description="De beste beginnersroute is niet de route met de meeste pinnen. Kies één variant die bij je tempo past en voeg pas daarna activiteiten toe."
              />
              <Link href={routeGuideHref} className="inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk alle reisroutes <ArrowRight size={14} className="text-saffron" /></Link>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {routeChoices.map((choice) => (
                <Link key={choice.title} href={choice.href} className="group overflow-hidden rounded-[22px] border border-jade/10 bg-white shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={choice.image} alt={choice.imageAlt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/5 to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-jade/75 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur">{choice.label}</span>
                    <p className="absolute bottom-5 left-5 right-5 font-display text-2xl font-semibold leading-none text-white">{choice.route}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-display text-[2rem] font-semibold leading-none text-jade">{choice.title}</h2>
                      <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{choice.duration}</span>
                    </div>
                    <p className="mt-4 text-xs font-medium leading-5 text-charcoal/62">{choice.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Werk de route uit <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="eerste-48-uur" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[0.74fr_1.26fr]">
              <div className="relative min-h-[470px] overflow-hidden">
                <Image src="/images/blog/bangkok-travel-tips-reddit.webp" alt="Eerste avond tussen tuk-tuks, straateten en Wat Arun in Bangkok" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/10 to-transparent" />
                <div className="absolute bottom-9 left-8 right-8">
                  <p className="eyebrow !text-saffron-light">Na de landing</p>
                  <h2 className="font-display text-[3.7rem] font-semibold leading-[0.84]">Je eerste<br />48 uur.</h2>
                  <p className="mt-4 max-w-sm text-xs font-medium leading-5 text-white/67">Niet maximaliseren. Eerst landen, verbinden en de stad leren lezen.</p>
                </div>
              </div>
              <div className="relative p-7 sm:p-10 lg:p-12">
                <div className="absolute bottom-10 left-12 top-14 hidden border-l-2 border-dashed border-saffron/30 sm:block" aria-hidden="true" />
                <ol className="relative space-y-5">
                  {arrivalTimeline.map(({ time, title, text, icon: Icon }, index) => (
                    <li key={time} className="relative rounded-2xl border border-white/12 bg-white/[0.06] p-5 sm:ml-8">
                      <span className="absolute -left-[49px] top-5 hidden h-8 w-8 place-items-center rounded-full border border-saffron/40 bg-jade text-saffron-light sm:grid"><Icon size={15} /></span>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{time}</p>
                        <span className="font-display text-2xl font-semibold text-white/14">0{index + 1}</span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-semibold leading-none">{title}</h3>
                      <p className="mt-3 text-xs font-medium leading-5 text-white/67">{text}</p>
                    </li>
                  ))}
                </ol>
                <a href={withSubId(SAILY_GENERIC, 'first-time-nl-arrival')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 min-h-12 px-6 text-saffron-dark">Vergelijk eSIM-opties <ExternalLink size={15} /></a>
                <AffiliateDisclosure className="mt-3 !text-white/45">Affiliate-link. Controleer dekking, databundel, geldigheid en toestelcompatibiliteit vóór aankoop.</AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-mist py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Vier beslissingen die rust geven"
              title="Plan de randvoorwaarden. Niet ieder uur."
              description="Deze vier gidsen lossen elk een ander risico op. Houd de antwoorden uit elkaar, zodat één pagina niet voor alles probeert te ranken."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {planningCards.map(({ title, text, href, label, icon: Icon }) => (
                <Link key={title} href={href} className="group flex min-h-[285px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span>
                  <h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h2>
                  <p className="mt-4 flex-1 text-xs font-medium leading-5 text-charcoal/62">{text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label}<ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="valkuilen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Wat je beter niet leert op dag één"
                title={<>Zes fouten.<br />Zes betere keuzes.</>}
                description="Geen panieklijst, wel de afweging die erachter zit. Dat maakt deze tips bruikbaar wanneer je route of omstandigheden veranderen."
              />
              <Link href="/blog/10-biggest-thailand-travel-mistakes/" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Lees alle reisfouten <ArrowRight size={14} className="text-saffron" /></Link>
            </div>
            <div className="relative">
              <div className="absolute bottom-5 left-[27px] top-5 border-l-2 border-dashed border-saffron/30" aria-hidden="true" />
              <div className="space-y-4">
                {mistakes.map((mistake) => (
                  <article key={mistake.number} className="relative ml-14 rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <span className="absolute -left-[55px] top-6 grid h-11 w-11 place-items-center rounded-full border-4 border-canvas bg-jade font-display text-lg font-semibold text-saffron-light">{mistake.number}</span>
                    <h2 className="font-display text-[1.85rem] font-semibold leading-none text-jade">{mistake.title}</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl bg-tonal p-4"><p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">De aanname</p><p className="mt-2 text-xs font-medium leading-5 text-charcoal/62">{mistake.wrong}</p></div>
                      <div className="rounded-xl bg-mist p-4"><p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-jade">De betere keuze</p><p className="mt-2 text-xs font-medium leading-5 text-charcoal/67">{mistake.better}</p></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="inpakken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <SectionHeading
                eyebrow="Slim inpakken"
                title={<>Wat neem je mee.<br />Wat koop je daar.</>}
                description="Neem mee wat je reis bestuurt: documenten, medicatie, bereikbaarheid en bescherming. Gewone kleding en toiletartikelen hoef je niet voor iedere mogelijke situatie op te stapelen."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {packingEssentials.map((item) => <p key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-white px-4 py-3 text-xs font-semibold leading-5 text-charcoal/68"><Check size={15} className="mt-0.5 shrink-0 text-saffron-dark" />{item}</p>)}
              </div>
            </div>

            <div className="relative mt-10 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="relative min-h-[520px] lg:min-h-[620px]">
                <Image src="/images/redesign/first-time-thailand-packing.webp" alt="Compacte Thailand paklijst met lichte kleding, adapter, powerbank en documenten" fill sizes="100vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/85 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-jade/88" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-jade/86 p-6 text-white backdrop-blur-lg lg:bottom-auto lg:left-auto lg:right-8 lg:top-8 lg:w-[380px]">
                  <p className="eyebrow !text-saffron-light">Vier nuttige aanvullingen</p>
                  <h2 className="font-display text-[2.4rem] font-semibold leading-[0.9]">Alleen wat je echt gebruikt.</h2>
                  <div className="mt-5 divide-y divide-white/12">
                    {packingGear.map((item) => (
                      <a key={item.slug} href={`/go/${item.slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex items-start justify-between gap-3 py-3">
                        <div><p className="text-xs font-extrabold">{item.name}</p><p className="mt-1 text-[10px] font-medium leading-4 text-white/58">{item.note}</p></div>
                        <ExternalLink size={14} className="mt-1 shrink-0 text-saffron-light transition group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                  <Link href="/travel-gear/" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-white">Bekijk de volledige paklijst <ArrowRight size={14} className="text-saffron-light" /></Link>
                  <AffiliateDisclosure className="mt-3 !text-white/70">Amazon-affiliatelinks. Wij kunnen commissie ontvangen zonder extra kosten voor jou. Controleer prijs, verkoper en geschiktheid zelf.</AffiliateDisclosure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-5 md:grid-cols-3">
            {[
              { icon: Landmark, title: 'Respect werkt beter dan regels uit het hoofd leren', text: 'Observeer, kleed je passend waar gevraagd en volg aanwijzingen van de plek zelf.' },
              { icon: Utensils, title: 'Eten is onderdeel van je route', text: 'Plan wijken en markten, maar laat ruimte om te kiezen waar het druk, schoon en vers bereid voelt.' },
              { icon: WalletCards, title: 'Maak één betaalplan en één reserveplan', text: 'Spreid kaarten en contant geld; bewaar niet alles samen en kies bij een betaalautomaat bewust de valuta.' },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-saffron/30 text-jade"><Icon size={20} /></span>
                <h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-none text-jade">{title}</h2>
                <p className="mt-4 text-xs font-medium leading-5 text-charcoal/62">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <FaqSplitSection
          id="vragen"
          eyebrow="Echte vragen uit de Nederlandse zoekresultaten"
          title="Eerste keer Thailand: veelgestelde vragen"
          description="De vragen komen uit de live Nederlandse Google-PAA-resultaten van 23 juli 2026. Antwoorden zijn herschreven en waar nodig gekoppeld aan actuele officiële bronnen."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Maak je plan concreet"
          title="De volgende drie keuzes"
          guides={relatedGuides}
          sideLink={{ label: 'Vergelijk actuele tickets op 12Go', href: withSubId(TWELVEGO_GENERIC, 'first-time-nl-related'), affiliate: true }}
          disclosure="De 12Go-link is een affiliate-link. De redactionele gidsen en routekeuzes staan los van een eventuele boeking."
        />

        <SourceMethodSection
          title="Actuele regels verdienen actuele bronnen."
          description={`Deze gids is inhoudelijk gecontroleerd op ${UPDATED_AT.split('-').reverse().join('-')}. Inreisregels, gezondheidsadvies en regionale veiligheid kunnen veranderen. Daarom linken we rechtstreeks naar de verantwoordelijke instanties en vermijden we tijdloze claims over tijdelijke regels.`}
          sources={sources}
        />
      </div>
    </>
  );
}
