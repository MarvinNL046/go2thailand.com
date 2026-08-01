import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  Droplets,
  ExternalLink,
  Footprints,
  HeartPulse,
  MapPin,
  Moon,
  PackageCheck,
  Route,
  ShieldCheck,
  Shirt,
  Sparkles,
  Sun,
  ThermometerSun,
  Timer,
  Users,
  WalletCards,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/muay-thai-training-camps-thailand-beginners-guide-2026/';
const PAGE_TITLE = 'Muay Thai trainen in Thailand: beginnersgids 2026';
const PAGE_DESCRIPTION = 'Kies als beginner tussen één Muay Thai-les, een trainingsweek en een kamp in Thailand. Met lesopbouw, kosten, gymchecks, paklijst en verzekering.';
const HERO_IMAGE = '/images/redesign/muay-thai-beginner-hero.webp';

const navItems: PageSectionNavItem[] = [
  { href: '#kiezen', label: 'Kies je vorm', icon: Route },
  { href: '#eerste-les', label: 'Eerste les', icon: Activity },
  { href: '#ritme', label: 'Trainingsritme', icon: CalendarDays },
  { href: '#gym', label: 'Kies een gym', icon: BadgeCheck },
  { href: '#meenemen', label: 'Wat meenemen', icon: PackageCheck },
  { href: '#veiligheid', label: 'Veiligheid', icon: ShieldCheck },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

interface TrainingFormat {
  icon: LucideIcon;
  label: string;
  title: string;
  duration: string;
  fit: string;
  gain: string;
  risk: string;
}

const trainingFormats: TrainingFormat[] = [
  {
    icon: Sparkles,
    label: 'Test zonder reis vast te zetten',
    title: 'Eén introductieles',
    duration: 'Eén sessie · vaak 60–120 min',
    fit: 'Voor een eerste kennismaking tijdens een gewone Thailandreis. Je ontdekt of de coachstijl, hitte en fysieke belasting bij je passen.',
    gain: 'Laagste commitment en eenvoudig te combineren met sightseeing.',
    risk: 'Een losse toeristenles zegt nog weinig over het ritme van een serieus kamp.',
  },
  {
    icon: CalendarDays,
    label: 'Techniek én herstel ervaren',
    title: 'Drie tot zeven dagen',
    duration: 'Eén training per dag als startpunt',
    fit: 'Voor beginners die meerdere lessen willen volgen zonder dat de hele reis een sportkamp wordt. Je krijgt tijd om techniek te herhalen.',
    gain: 'De beste balans tussen leren, herstellen en de bestemming beleven.',
    risk: 'Een onbeperkt pakket verleidt snel tot meer sessies dan je lichaam aankan.',
  },
  {
    icon: Timer,
    label: 'Training bepaalt de reis',
    title: 'Twee weken of langer',
    duration: 'Kamp, losse gym + verblijf of all-in',
    fit: 'Voor wie een vast ritme wil opbouwen en bereid is accommodatie, voeding en rust rond de gym te plannen.',
    gain: 'Meer herhaling, coachfeedback en routine dan bij een vakantieles.',
    risk: 'Betaal niet vooruit voordat niveau, hygiëne, contract, buurt en herstelruimte zijn gecontroleerd.',
  },
];

const lessonSteps = [
  { icon: Users, number: '01', title: 'Zeg dat je beginner bent', time: 'Voor de start', text: 'Meld blessures, conditie, hittegevoeligheid en eerdere vechtsportervaring. Vraag welke onderdelen contact bevatten en hoe je een oefening kunt overslaan.' },
  { icon: Footprints, number: '02', title: 'Houding en voetenwerk', time: 'Basis eerst', text: 'Een goede beginnersles begint met balans, guard en gecontroleerd bewegen. Hard slaan zonder stabiele basis is geen vooruitgang.' },
  { icon: Activity, number: '03', title: 'Techniek op pads of zak', time: 'Rondes op niveau', text: 'De coach bouwt eenvoudige stoten, trappen, knieën en verdediging op. Tempo en kracht horen bij jouw techniek te passen, niet bij de sterkste deelnemer.' },
  { icon: ShieldCheck, number: '04', title: 'Contact is een keuze', time: 'Spreek het af', text: 'Sparren is geen verplicht bewijs van moed. Sumalee zegt expliciet dat deelnemers dit in eigen tijd kunnen opbouwen; vraag altijd eerst wat “licht” bij deze gym betekent.' },
  { icon: Droplets, number: '05', title: 'Cooling-down en drinken', time: 'Na de les', text: 'Loop uit, drink geleidelijk, eet normaal en plan geen volle middag in de zon. Pijn die scherp, toenemend of instabiel voelt is geen gewone spierpijn.' },
];

const destinationFits = [
  { city: 'Bangkok', cue: 'Stadsreis + één les', text: 'Logisch voor een introductie tussen andere stadsdagen. Kies een gym op reistijd, niet alleen op bekendheid; Bangkokverkeer kan een korte les tot een halve dag maken.', href: '/city/bangkok/', image: '/images/redesign/bangkok-destination-hero.webp' },
  { city: 'Phuket', cue: 'Veel camps en pakketten', text: 'Geschikt als training een hoofdonderdeel is. Vergelijk de gymzone met het strand of de wijk waar je werkelijk wilt verblijven; het eiland is groter dan het op een kaart lijkt.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp' },
  { city: 'Chiang Mai', cue: 'Compactere trainingsbasis', text: 'Een prettige optie voor wie een stad, lagere dagelijkse drukte en training wil combineren. Controleer in het rookseizoen ook luchtkwaliteit en trainingsruimte.', href: '/city/chiang-mai/', image: '/images/cities/chiang-mai/redesign/chiang-mai-destination-hero.webp' },
  { city: 'Koh Samui', cue: 'Kamp + eilandleven', text: 'Koh Samui en rustiger Phuket-aanbod kunnen training en verblijf bundelen. Dat is handig, maar maakt wisselen duurder als de eerste dagen niet bevallen.', href: '/city/koh-samui/', image: '/images/redesign/muay-thai-recovery-route.webp' },
];

const weekPlan = [
  { day: 'Dag 1', title: 'Aankomen', icon: Moon, tone: 'rust', text: 'Geen zware sessie na een lange vlucht. Check gymroute, slaap, hydratatie en materiaal.' },
  { day: 'Dag 2', title: 'Introductieles', icon: Activity, tone: 'train', text: 'Train één sessie. Vraag feedback op houding en bepaal pas daarna of je meer boekt.' },
  { day: 'Dag 3', title: 'Herstel + wandelen', icon: Footprints, tone: 'rust', text: 'Rustig bewegen, normaal eten en geen lange zonmiddag. Noteer waar je echt last van hebt.' },
  { day: 'Dag 4', title: 'Techniek herhalen', icon: ShieldCheck, tone: 'train', text: 'Herhaal basiscombinaties. Laat snelheid of contact niet automatisch opschalen.' },
  { day: 'Dag 5', title: 'Vrije reisdag', icon: Sun, tone: 'rust', text: 'Plan je bestemming. Een vrije dag is onderdeel van het trainingsplan, geen gemiste les.' },
  { day: 'Dag 6', title: 'Derde sessie', icon: Activity, tone: 'train', text: 'Kies eventueel een privéles voor gerichte feedback in plaats van een extra zware groepssessie.' },
  { day: 'Dag 7', title: 'Evalueren', icon: BadgeCheck, tone: 'rust', text: 'Voel je je stabiel en energiek? Verleng dan pas. Bij klachten of uitputting: rust en zo nodig medische hulp.' },
];

const gymChecks = [
  { icon: Users, title: 'Echte beginnersgroep', text: 'Vraag of complete starters apart trainen, hoeveel deelnemers één coach tegelijk begeleidt en in welke taal instructie wordt gegeven.' },
  { icon: ShieldCheck, title: 'Contact met toestemming', text: 'Laat uitleggen wanneer clinch of sparren begint, welke bescherming geldt en of overslaan zonder druk mogelijk is.' },
  { icon: Droplets, title: 'Hygiëne en ventilatie', text: 'Bekijk matten, gedeelde handschoenen, schoonmaakroutine, drinkwater en luchtstroom. Een open-air gym kan alsnog heet en benauwd zijn.' },
  { icon: Clock3, title: 'Rooster dat jij aankunt', text: 'Een gym kan twee blokken per dag aanbieden zonder dat jij beide hoeft te volgen. Vraag naar lesduur, rustdagen en vrije inloop.' },
  { icon: MapPin, title: 'Afstand tot je bed', text: 'Test de route op het echte trainingstijdstip. Een goedkope kamer met dagelijks lang vervoer kan herstel en regelmaat ondermijnen.' },
  { icon: WalletCards, title: 'Heldere voorwaarden', text: 'Vergelijk training-only met verblijfspakket, btw, materiaalhuur, maaltijden, privétraining, wijziging en terugbetaling als losse regels.' },
];

const budgetParts = [
  { title: 'Training', text: 'Losse les, dagpas, weekkaart en onbeperkt kamp zijn andere producten. Vraag welke klassen en faciliteiten werkelijk inbegrepen zijn.' },
  { title: 'Materiaal', text: 'Huur kan slim zijn voor één les; bij langer trainen telt pasvorm en hygiëne zwaarder. Vraag wat verplicht is vóór je koopt.' },
  { title: 'Verblijf', text: 'All-in is makkelijk, los verblijf geeft keuzevrijheid. Vergelijk airco, wasmogelijkheden, nachtrust en loopafstand tot de gym.' },
  { title: 'Dagritme', text: 'Eten, water, was, lokaal vervoer en herstel zijn geen voetnoten. Ze bepalen of een goedkoop trainingspakket echt goedkoop blijft.' },
];

const faqs = [
  { question: 'Kun je in Thailand als complete beginner Muay Thai trainen?', answer: 'Ja. Meerdere officiële gymprogramma’s zijn expliciet ingericht voor mensen met weinig of geen ervaring. Kies wel een echte beginnersgroep, meld je niveau vooraf en start met één les voordat je een lang pakket koopt. “Alle niveaus welkom” zegt op zichzelf nog niets over groepsgrootte of persoonlijke begeleiding.' },
  { question: 'Hoeveel kost een Muay Thai-training in Thailand?', answer: 'Dat hangt af van het product: drop-in, dagpas, weekkaart, privétraining en all-in kamp zijn niet onderling vergelijkbaar. Als actuele benchmark vermeldde Tiger Muay Thai op 25 juli 2026 500 THB voor één drop-in en 1.000 THB voor een dagpas, exclusief 7% btw; prijzen kunnen wijzigen. Controleer altijd wat training, materiaal, verblijf en maaltijden apart kosten.' },
  { question: 'Is er een Muay Thai-trainingskamp voor beginners?', answer: 'Ja. Er zijn losse gyms met beginnersgroepen en pakketten waarin training, verblijf en soms maaltijden zijn gebundeld. Een kamp is niet automatisch beter dan een losse gym: check coachratio, rustdagen, niveau-indeling, afstand tot je kamer, wijzigingsvoorwaarden en of je eerst één sessie mag proberen.' },
  { question: 'Hoe vaak moet je als beginner trainen in Thailand?', answer: 'Begin op een reis meestal met één sessie per dag en plan herstel tussen de eerste trainingen. Sommige gyms bieden twee sessies per dag, maar dat rooster is geen persoonlijk trainingsadvies. Bouw alleen op wanneer techniek, slaap, hitteherstel en eventuele klachten dat toelaten. Vraag een coach of zorgprofessional bij twijfel.' },
  { question: 'Welke stad in Thailand is het beste voor Muay Thai?', answer: 'Er is geen universeel beste stad. Bangkok past goed bij een losse introductieles tijdens een stadsreis; Phuket heeft veel kamp- en pakketkeuze; Chiang Mai kan een compactere trainingsbasis bieden. Kies vooral op gymkwaliteit, reistijd, lucht/ventilatie, verblijf en wat je naast training wilt doen.' },
  { question: 'Wat heb je nodig voor je eerste Muay Thai-les?', answer: 'Begin met lichte sportkleding, water en een kleine handdoek. Vraag de gym vooraf naar handwraps, handschoenen, scheenbeschermers en bitje. Tiger vereist voor zijn beginnersgroep bijvoorbeeld wraps, 16 oz handschoenen en scheenbeschermers, maar verhuur en eisen verschillen per gym.' },
  { question: 'Moet je als beginner sparren?', answer: 'Nee. Sparren hoort niet automatisch bij een eerste les. Sumalee vermeldt expliciet dat het niet verplicht is; Tiger beschrijft gecontroleerd licht sparren onder toezicht op geselecteerde dagen. Vraag vóór de les wat er gebeurt, welk contact je accepteert en hoe je zonder discussie kunt overslaan.' },
  { question: 'Is Muay Thai-training veilig voor beginners?', answer: 'Geen contactsport is zonder risico. Je verkleint vermijdbare risico’s met een echte beginnersgroep, gecontroleerde intensiteit, passend materiaal, hygiëne, voldoende rust en duidelijke toestemming voor contact. Stop bij duizeligheid, benauwdheid, instabiliteit of scherpe pijn en zoek passende medische hulp.' },
  { question: 'Dekt mijn reisverzekering Muay Thai in Thailand?', answer: 'Dat verschilt per polis en activiteit. Gevechtssporten kunnen als gevaarlijke of bijzondere sport gelden; training, sparren en wedstrijden kunnen verschillend worden behandeld. Vraag je verzekeraar vóór vertrek schriftelijk naar recreatieve training, medische kosten, repatriëring en eventuele uitsluitingen. Een algemene werelddekking is geen automatisch bewijs.' },
  { question: 'Ben je op 27, 40 of later te oud om te beginnen?', answer: 'Leeftijd alleen bepaalt dat niet. Conditie, medische voorgeschiedenis, herstel, coachkwaliteit en trainingsintensiteit zijn belangrijker. Een goede gym past techniek en tempo aan, maar kan geen medische geschiktheid garanderen. Bespreek relevante klachten vooraf met een zorgprofessional en met de trainer.' },
];

const sources = [
  { title: 'Beginners Muay Thai Training Program', creator: 'Tiger Muay Thai', url: 'https://www.tigermuaythai.com/training/muay-thai-training-program-beginners', note: 'Primaire bron voor beginnerscurriculum, actueel rooster, gecontroleerd sparren en vereiste/verkrijgbare trainingsuitrusting.' },
  { title: 'Prices & Packages', creator: 'Tiger Muay Thai', url: 'https://www.tigermuaythai.com/prices', note: 'Actuele benchmark voor drop-in, dagpas, training-only, all-in, materiaal en de waarschuwing dat btw, prijs en beschikbaarheid kunnen wijzigen.' },
  { title: 'Muay Thai Training', creator: 'Sumalee Boxing Gym', url: 'https://sumaleeboxinggym.com/muay-thai-training/', note: 'Primaire bron voor lesopbouw, groepsritme, minimale leeftijd en de expliciete keuze om sparren pas in eigen tempo te doen.' },
  { title: 'Class schedule', creator: 'Bangtao Muay Thai & MMA', url: 'https://bangtaomuaythai.com/schedule/', note: 'Primaire roosterbron die laat zien dat Muay Thai-lessen daar 90 minuten duren en programma’s per gym verschillen.' },
  { title: 'Sportieve activiteiten op vakantie', creator: 'ANWB', url: 'https://www.anwb.nl/verzekeringen/reisverzekering/sporten', note: 'Nederlandse verzekeringsbron voor het vooraf controleren van sport-, hulpverlenings- en medische-kostendekking.' },
  { title: 'Reistips Thailand', creator: 'Rijksoverheid', url: 'https://www.rijksoverheid.nl/actueel/weblogs/bzers-wereldwijd/2025/reistips-thailand', note: 'Overheidsbron voor het belang van reisverzekering en mogelijk hoge medische kosten in Thailand.' },
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
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'Zo bereid je een eerste Muay Thai-les in Thailand voor',
      totalTime: 'PT2H',
      step: lessonSteps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step.title, text: step.text })),
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Uitjes', item: 'https://go2-thailand.com/nl/activities/' },
        { '@type': 'ListItem', position: 3, name: 'Muay Thai trainen voor beginners', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Drie manieren om als beginner Muay Thai te trainen in Thailand',
      itemListElement: trainingFormats.map((format, index) => ({ '@type': 'ListItem', position: index + 1, name: format.title, description: format.fit })),
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function MuayThaiBeginnerTrainingGuide() {
  const subId = useSubId();
  const introLessonHref = withPlacementSubId(KLOOK_GENERIC, subId, 'muay-thai-beginner-intro-class');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="muay thai training thailand beginners, muay thai kamp thailand, muay thai training kosten, eerste muay thai les, muay thai training phuket" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-23" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Van eerste padsessie tot trainingskamp"
          title={<>Muay Thai trainen<br />in Thailand.</>}
          subtitle="Begin met één les. Bouw pas daarna een kamp."
          description="Een eerlijke beginnersgids voor lesopbouw, trainingsritme, gymkeuze, kosten, materiaal en verzekering — zonder te doen alsof tweemaal per dag trainen voor iedereen het doel is."
          image={HERO_IMAGE}
          imageAlt="Redactioneel sfeerbeeld van een volwassen beginner die onder begeleiding van een Thaise coach padwork doet in een open-air gym"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Uitjes', href: '/activities/' }, { label: 'Muay Thai voor beginners' }]}
          actions={[
            { label: 'Kies je trainingsvorm', href: '#kiezen', kind: 'primary' },
            { label: 'Bekijk je eerste les', href: '#eerste-les', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[900px] lg:min-h-[740px]"
          contentClassName="max-w-[730px]"
          titleClassName="max-w-[760px] text-[3.75rem] leading-[0.84] sm:text-[5rem] lg:text-[5.55rem]"
          subtitleClassName="max-w-[650px] text-[1.62rem] leading-[1] text-saffron-dark sm:text-[2.2rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.76)_50%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.88)_39%,rgba(7,39,34,0.12)_63%,rgba(5,27,24,0.08)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[350px] overflow-hidden rounded-2xl border border-white/55 bg-white/[0.91] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Starterkaart · juli 2026</p><Activity size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[105px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Eerste keuze</dt><dd className="font-extrabold text-jade">Eén introductieles</dd>
                <dt className="text-charcoal/46">Beginritme</dt><dd className="font-extrabold text-jade">Maximaal 1× per dag</dd>
                <dt className="text-charcoal/46">Herstel</dt><dd className="font-extrabold text-jade">Plan 24–48 uur ruimte</dd>
                <dt className="text-charcoal/46">Voor vertrek</dt><dd className="font-extrabold text-saffron-dark">Check contactsportdekking</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Dit is een reis- en keuzehulp, geen persoonlijk trainings- of medisch advies.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Laat je reis niet door een pakket kiezen" title={<>Eerst je vorm.<br />Dan je gym.</>} description={<>Een bekende gym kan goed zijn en toch niet bij jouw reis passen. Kies eerst hoeveel training je werkelijk wilt. Voor steden, concrete gyms en kijken versus trainen blijft onze <InlineLink href="/best-muay-thai-in-thailand/">Muay Thai-vergelijkingsgids</InlineLink> de aparte owner.</>} />
              <div className="max-w-3xl space-y-4 text-sm font-medium leading-7 text-charcoal/66">
                <p>De belangrijkste keuze is niet Phuket of Bangkok, maar commitment. Wil je één culturele en fysieke kennismaking, enkele dagen techniek herhalen of je hele reis rond een kamp bouwen? Elk antwoord vraagt een ander boekmoment, budget en herstelplan.</p>
                <p>Betaal daarom niet meteen voor onbeperkt trainen. Een programma kan twee sessies per dag aanbieden; dat is het rooster van de gym, niet automatisch jouw veilige startniveau. Test coachstijl, hitte, groepsindeling en reistijd voordat korting je vastzet.</p>
              </div>
            </div>

            <div className="mt-11 grid gap-5 lg:grid-cols-3">
              {trainingFormats.map(({ icon: Icon, label, title, duration, fit, gain, risk }, index) => (
                <article key={title} className={`flex min-h-[430px] flex-col overflow-hidden rounded-[26px] border shadow-editorial-card ${index === 1 ? 'border-saffron/35 bg-[#fff3df]' : 'border-jade/10 bg-white'}`}>
                  <div className="bg-jade p-6 text-white">
                    <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.07]"><Icon size={22} className="text-saffron-light" /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Route 0{index + 1}</span></div>
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/48">{label}</p>
                    <h3 className="mt-2 font-display text-[2.25rem] font-semibold leading-[0.92]">{title}</h3>
                    <p className="mt-3 text-xs font-bold text-saffron-light">{duration}</p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium leading-6 text-charcoal/66">{fit}</p>
                    <div className="mt-auto space-y-3 pt-6 text-[10px] font-semibold leading-5">
                      <p className="flex gap-2 text-jade"><Check size={15} className="mt-0.5 shrink-0 text-saffron" />{gain}</p>
                      <p className="flex gap-2 text-charcoal/58"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-jade" />{risk}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="eerste-les" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
              <div className="relative min-h-[560px] overflow-hidden rounded-[30px] shadow-editorial-lift lg:min-h-[680px]">
                <Image src="/images/redesign/muay-thai-first-lesson.webp" alt="Redactioneel sfeerbeeld van een volwassen beginner die rustig padwork oefent met een Thaise trainer" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-white">
                  <div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Sfeerbeeld · geen specifieke gym</p><p className="mt-2 max-w-[440px] font-display text-2xl font-semibold leading-none">Een goede eerste les voelt technisch, niet heroïsch.</p></div>
                  <span className="rounded-full border border-white/25 bg-jade/72 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-md">Vraag vóór contact</span>
                </div>
              </div>

              <div>
                <SectionHeading eyebrow="Zo ziet een eerste les eruit" title={<>Vijf momenten.<br />Eén duidelijke grens.</>} description="Officiële beginnersprogramma’s noemen houding, voetenwerk, basisaanvallen, verdediging, padwork, zakwerk en conditie. De volgorde verschilt per gym; toestemming voor contact hoort niet te verschillen." />
                <div className="relative mt-8 space-y-3">
                  <div aria-hidden="true" className="absolute bottom-8 left-[21px] top-8 border-l-2 border-dashed border-saffron/45" />
                  {lessonSteps.map(({ icon: Icon, number, title, time, text }) => (
                    <article key={number} className="relative grid grid-cols-[44px_1fr] gap-4">
                      <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-saffron/40 bg-canvas text-saffron-dark"><Icon size={18} /></span>
                      <div className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                        <div className="flex flex-wrap items-start justify-between gap-2"><h3 className="font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{time}</span></div>
                        <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside className="mt-10 grid gap-6 rounded-[26px] border border-saffron/28 bg-[#fff4df] p-7 lg:grid-cols-[0.42fr_1.58fr] lg:items-center lg:p-9">
              <div><p className="eyebrow">Zin voor de trainer</p><p className="font-display text-[2rem] font-semibold leading-[0.95] text-jade">“Ik ben beginner en wil vandaag geen sparren.”</p></div>
              <p className="text-sm font-medium leading-7 text-charcoal/66">Dat is een complete instructie, geen verontschuldiging. Vraag ook hoe de gym het verschil tussen techniek, clinch en sparren uitlegt. Als een grens belachelijk wordt gemaakt of genegeerd, is dat bruikbare informatie om niet verder te boeken.</p>
            </aside>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
              <SectionHeading eyebrow="Waar wil je naast trainen zijn?" title={<>De gym is niet<br />de hele bestemming</>} description="Kies een omgeving waar eten, slaap en vrije dagen ook kloppen. Hieronder staat geen ranglijst, maar een reisfit. Controleer daarna concrete gyms in de aparte vergelijking." />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Een topgym op negentig minuten van je hotel is zelden een topkeuze. Test de route rond het echte ochtend- of middagblok, kijk of je voedzaam kunt eten en beoordeel of de buurt rustig genoeg is om te slapen. Dezelfde les kan door logistiek veel zwaarder worden.</p>
            </div>

            <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {destinationFits.map((item, index) => (
                <Link key={item.city} href={item.href} className={`group overflow-hidden rounded-2xl border shadow-editorial-card ${index === 0 ? 'border-saffron/28 bg-[#fff5e7]' : 'border-jade/10 bg-white'}`}>
                  <div className="relative h-48 overflow-hidden"><Image src={item.image} alt={`${item.city} als mogelijke basis voor een Muay Thai-reis`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/75 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{item.cue}</span></div>
                  <div className="p-5"><div className="flex items-center justify-between"><h3 className="font-display text-[1.75rem] font-semibold text-jade">{item.city}</h3><ArrowRight size={15} className="text-saffron transition group-hover:translate-x-1" /></div><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{item.text}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="ritme" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
              <SectionHeading eyebrow="Voorbeeld, geen voorschrift" title={<>Zeven dagen<br />zonder bewijsdrang</>} description={<>Tiger en Sumalee tonen dat gevestigde gyms op meerdere dagen ochtend- en middagtraining kunnen aanbieden. Beginnen betekent niet dat je alle vakjes moet vullen. Deze rustige eerste week laat techniek en herstel elkaar afwisselen.</>} />
              <div className="grid gap-3 sm:grid-cols-2">
                {weekPlan.map(({ day, title, icon: Icon, tone, text }, index) => (
                  <article key={day} className={`rounded-2xl border p-5 shadow-editorial-card ${tone === 'train' ? 'border-saffron/32 bg-[#fff3df]' : 'border-jade/10 bg-white'} ${index === 6 ? 'sm:col-span-2' : ''}`}>
                    <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl border border-jade/10 bg-canvas text-jade"><Icon size={19} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{day} · {tone === 'train' ? 'training' : 'ruimte'}</span></div>
                    <h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 border-y border-jade/10 py-8 lg:grid-cols-3">
              {[['Slaap', 'Boek geen nachtbus tussen trainingsdagen. Nieuwe techniek landt slecht in een uitgeput lichaam.'], ['Hitte', 'Een ochtendblok kan koeler zijn, maar open-air is niet hetzelfde als koel. Drink, pauzeer en schaal af.'], ['Herstel', 'Massage kan ontspannend voelen, maar is geen diagnose of garantie tegen letsel. Kies druk en timing die prettig zijn.']].map(([title, text], index) => (
                <div key={title} className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-jade text-[10px] font-extrabold text-saffron-light">0{index + 1}</span><div><h3 className="font-display text-xl font-semibold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">{text}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Trainingsreis met herstel" className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="relative min-h-[470px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[400px]">
              <Image src="/images/redesign/muay-thai-recovery-route.webp" alt="Redactioneel sfeerbeeld van een rustige route van een Muay Thai-gym naar de Thaise kust na een training" fill sizes="100vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,31,27,0.99)_0%,rgba(5,31,27,0.92)_40%,rgba(5,31,27,0.2)_71%,rgba(5,31,27,0.04)_100%)]" />
              <div className="relative z-10 flex min-h-[470px] max-w-[650px] flex-col justify-center p-7 text-white sm:min-h-[400px] sm:p-12">
                <p className="eyebrow !text-saffron-light">Train waar je reis ook kan herstellen</p>
                <h2 className="font-display text-[3.25rem] font-semibold leading-[0.87] tracking-[-0.04em]">De rustdag hoort bij het kamp.</h2>
                <p className="mt-5 max-w-[560px] text-sm font-medium leading-7 text-white/68">Je boekt geen discipline door ieder trainingsblok te volgen. Je bouwt discipline door techniek, slaap, eten, hitte en vrije dagen als één systeem te plannen. Laat een zware excursie of late avond vervallen wanneer je volgende sessie daaronder lijdt.</p>
                <Link href="/blog/thai-massage-guide-types-prices/" className="btn-cream mt-7 w-fit">Plan herstel zonder wonderclaims <ArrowRight size={15} className="text-saffron" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="gym" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Loop eerst één ronde" title={<>Zes gymchecks<br />vóór je betaalt</>} description="Een bekende naam, mooie ring of groot rooster bewijst nog niet dat de beginnersbegeleiding bij jou past. Vraag, kijk en probeer voordat je een lang pakket vastzet." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {gymChecks.map(({ icon: Icon, title, text }) => (
                  <article key={title} className="flex min-h-[255px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <Icon size={24} strokeWidth={1.45} className="text-jade" />
                    <h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="p-7 sm:p-10"><p className="eyebrow !text-saffron-light">Kosten zonder schijnprecisie</p><h2 className="font-display text-[3rem] font-semibold leading-[0.88]">Vergelijk zes regels, niet één pakketprijs.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/63">Een actuele Tiger-check liet op 25 juli 2026 500 THB voor een drop-in en 1.000 THB voor een dagpas zien, exclusief 7% btw. Dat is één gedateerde benchmark, geen Thailandgemiddelde. Vraag iedere gym om de prijsopbouw op jouw data.</p></div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {budgetParts.map((part, index) => <article key={part.title} className="bg-jade p-6 sm:p-7"><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Kostenlaag 0{index + 1}</span><h3 className="mt-3 font-display text-[1.65rem] font-semibold">{part.title}</h3><p className="mt-3 text-xs font-medium leading-6 text-white/58">{part.text}</p></article>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="meenemen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionHeading eyebrow="Slim inpakken" title={<>Wat neem je mee<br />naar je eerste les?</>} description="Koop nog geen complete vechtsporttas. Laat de gym eerst vertellen welk gewicht handschoenen, welke bescherming en welke huurset bij de les horen." />
                <div className="mt-8 divide-y divide-jade/10 border-y border-jade/10">
                  {[
                    ['Lichte sportkleding', 'Geen ritsen, harde knopen of sieraden. Een sneldrogende laag helpt tussen training en wasbeurt.'],
                    ['Water + kleine handdoek', 'Vraag of drinkwater aanwezig is. Deel geen handdoek en leg je spullen niet op de trainingsmat.'],
                    ['Wraps, handschoenen, scheenbeschermers', 'Controleer wat verplicht, te huur of alleen te koop is. Tiger vereist voor de beginnersgroep alle drie.'],
                    ['Bitje', 'Vraag of er contact, clinch of sparren wordt aangeboden. Gebruik bescherming die goed past en volg gymregels.'],
                    ['Schoon setje voor erna', 'Droge kleding en een aparte zak voor nat materiaal maken de rit terug prettiger en hygiënischer.'],
                  ].map(([title, text]) => <div key={title} className="grid gap-2 py-5 sm:grid-cols-[190px_1fr]"><p className="text-sm font-extrabold text-jade">{title}</p><p className="text-xs font-medium leading-6 text-charcoal/62">{text}</p></div>)}
                </div>
              </div>

              <aside className="overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
                <div className="grid gap-6 p-7 sm:p-9">
                  <div className="flex items-start justify-between gap-6"><div><p className="eyebrow !text-saffron-light">Kleine trainingsdag-kit</p><h2 className="font-display text-[2.65rem] font-semibold leading-[0.9]">Twee functionele extra’s. Geen nep-verplichte gear.</h2></div><PackageCheck size={28} className="shrink-0 text-saffron-light" /></div>
                  <p className="text-sm font-medium leading-7 text-white/63">Deze bestaande Amazon-routes zijn alleen nuttige aanvullingen voor hitte en zweet. Handschoenen, wraps en scheenbeschermers staan hier bewust niet: zonder geverifieerde ASIN, pasvorm en gymvereiste zouden we meer claimen dan we weten.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a href="/go/hovsiyla-quick-dry-shirt/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-[190px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                      <Shirt size={23} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/46">Voor de les</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold">Sneldrogend shirt</h3><p className="mt-3 text-[11px] font-medium leading-5 text-white/58">Een lichte wissellaag voor training en de rit terug. Controleer maat, materiaal en verkoper.</p><span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">Bekijk actueel aanbod <ExternalLink size={13} className="text-saffron-light" /></span>
                    </a>
                    <a href="/go/rainleaf-travel-towel/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-[190px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                      <Droplets size={23} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/46">Na de les</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold">Compacte reishanddoek</h3><p className="mt-3 text-[11px] font-medium leading-5 text-white/58">Eigen kleine handdoek voor zweet of douche; niet delen en volledig laten drogen.</p><span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">Bekijk actueel aanbod <ExternalLink size={13} className="text-saffron-light" /></span>
                    </a>
                  </div>
                  <AffiliateDisclosure className="!text-white/55">Amazon-affiliatelinks lopen via onze centrale <strong className="text-white/72">/go/</strong>-router. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan doorsturen naar een lokale Amazon-winkel; product, prijs, verkoper en beschikbaarheid verschillen per land.</AffiliateDisclosure>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="veiligheid" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-[#082f29] text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.73fr_1.27fr]">
                <div className="relative overflow-hidden p-8 sm:p-11">
                  <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-saffron/20" />
                  <p className="eyebrow !text-saffron-light">Veiligheid begint vóór vertrek</p>
                  <h2 className="relative font-display text-[3.35rem] font-semibold leading-[0.87] tracking-[-0.04em]">Vraag je verzekeraar naar Muay Thai. Schriftelijk.</h2>
                  <p className="relative mt-6 text-sm font-medium leading-7 text-white/64">“Werelddekking” is niet hetzelfde als bevestiging voor een contactsport. Gevechtssporten kunnen onder gevaarlijke of bijzondere sporten vallen; recreatieve techniek, sparren en een wedstrijd kunnen anders worden behandeld.</p>
                  <Link href="/blog/travel-insurance-thailand-guide/" className="btn-cream relative mt-7 w-fit">Open de Thailand-verzekeringsgids <ArrowRight size={15} className="text-saffron" /></Link>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {[
                    { icon: ShieldCheck, title: 'Activiteit', text: 'Noem recreatieve Muay Thai-training én vraag apart naar clinch, sparren en wedstrijden.' },
                    { icon: HeartPulse, title: 'Medische kosten', text: 'Vraag wat boven de Nederlandse vergoeding, eigen risico en privézorg in Thailand wordt vergoed.' },
                    { icon: Route, title: 'Hulp + repatriëring', text: 'Controleer wie je eerst moet bellen, welk ziekenhuisproces geldt en of vervoer of terugkeer is gedekt.' },
                    { icon: BadgeCheck, title: 'Bewijs bewaren', text: 'Bewaar polisantwoord, noodnummer, gymgegevens en boekingsbewijs offline én bij een thuiscontact.' },
                  ].map(({ icon: Icon, title, text }) => <article key={title} className="bg-[#082f29] p-7 sm:p-8"><Icon size={23} className="text-saffron-light" /><h3 className="mt-5 font-display text-[1.65rem] font-semibold">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-white/58">{text}</p></article>)}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { icon: ThermometerSun, title: 'Stop bij hittesignalen', text: 'Duizeligheid, verwardheid, misselijkheid, benauwdheid of niet kunnen afkoelen zijn geen badge of honor. Stop, koel af en zoek passende hulp.' },
                { icon: Activity, title: 'Ken pijn versus belasting', text: 'Algemene spiervermoeidheid kan volgen op nieuwe belasting; scherpe, instabiele, toenemende of neurologische klachten verdienen beoordeling.' },
                { icon: Moon, title: 'Herstel is geen behandeling', text: 'Slaap, eten en rustige beweging ondersteunen herstel. Massage of ijs vervangt geen diagnose wanneer een klacht niet goed voelt.' },
              ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={22} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Pas boeken na de checks" title={<>Vind één les.<br />Controleer vier dingen.</>} description="Een marktplaats is handig om aanbod te vinden, maar niet om beginnersfit te veronderstellen. Open de concrete listing en controleer aanbieder, exacte locatie, niveau en inbegrepen uitrusting." />
              <ul className="mt-7 space-y-3 text-xs font-semibold text-jade">
                {['Staat er expliciet dat complete beginners welkom zijn?', 'Is het een groepsles, privéles, show of combinatie?', 'Welke bescherming is inbegrepen, te huur of verplicht?', 'Wat zijn wijziging, annulering en contactvoorwaarden?'].map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-saffron" />{item}</li>)}
              </ul>
            </div>
            <aside className="rounded-[28px] border border-saffron/28 bg-[#fff3df] p-7 shadow-editorial-card sm:p-9">
              <div className="flex items-start justify-between gap-5"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Klook · aanbodzoeker</p><h2 className="mt-3 font-display text-[2.65rem] font-semibold leading-[0.9] text-jade">Vergelijk een introductieles, niet een belofte.</h2></div><ExternalLink size={22} className="shrink-0 text-jade" /></div>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">De knop opent een algemene affiliatebestemming. Zoek daar zelf op “Muay Thai” en controleer de productnaam, aanbieder, stad, duur, taal, uitrusting en voorwaarden. Go2Thailand bevestigt hiermee geen specifieke gym of beschikbaarheid.</p>
              <a href={introLessonHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group mt-7 w-fit">Bekijk actuele introductielessen <ArrowRight size={15} className="text-saffron transition group-hover:translate-x-1" /></a>
              <AffiliateDisclosure className="mt-4">Klook is een affiliatelink. Wij kunnen commissie ontvangen zonder dat jouw prijs stijgt. De redactionele keuzehulp en veiligheidschecks staan los van de partner.</AffiliateDisclosure>
            </aside>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte vragen uit de zoekresultaten" title="Veelgestelde vragen over Muay Thai trainen" description="De antwoorden helpen je kiezen en voorbereiden, maar vervangen geen persoonlijke instructie, medische beoordeling of schriftelijke polisbevestiging." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Bouw de rest van je actieve reis"
          title="Train, herstel en plan verder"
          guides={[
            { title: 'Muay Thai vergelijken', description: 'Vergelijk steden, gyms en kijken versus trainen zonder deze beginnersowner te dupliceren.', href: '/best-muay-thai-in-thailand/', image: '/images/blog/muay-thai-in-thailand-where-to-watch-and-where-to-train.webp' },
            { title: 'Reisverzekering Thailand', description: 'Controleer medische kosten, activiteiten, repatriëring en de stappen bij schade of zorg.', href: '/blog/travel-insurance-thailand-guide/', image: '/images/blog/travel-insurance-thailand-guide.webp' },
            { title: 'Thaise massage kiezen', description: 'Lees welke ervaring je boekt, wanneer je voorzichtig bent en waarom herstelclaims grenzen hebben.', href: '/blog/thai-massage-guide-types-prices/', image: '/images/redesign/thai-massage-hero.webp' },
          ]}
        />

        <SourceMethodSection
          title="Roosters en prijzen zijn momentopnames"
          description="DFS bepaalde de Nederlandse zoekintentie, echte PAA en concurrentie. De lesopbouw, roosters, uitrusting en prijsbenchmark komen vervolgens uit actuele primaire gymbronnen. Verzekeringstekst is getoetst aan Nederlandse verzekerings- en overheidsinformatie. Vaste euroconversies, verlopen acties, rankings, gegarandeerde veiligheid en onbewezen certificeringsclaims zijn verwijderd. Laatst gecontroleerd: 25 juli 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
