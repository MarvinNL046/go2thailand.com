import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Camera,
  Check,
  CircleHelp,
  Eye,
  ExternalLink,
  Footprints,
  Hand,
  House,
  Landmark,
  Languages,
  MapPin,
  MessageCircle,
  Route,
  Scale,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Volume2,
  X,
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

const PAGE_URL = 'https://go2-thailand.com/nl/practical-info/etiquette-culture/';
const PAGE_TITLE = 'Thailand etiquette: gewoonten en tempelregels';
const PAGE_DESCRIPTION =
  'Leer de belangrijkste Thaise gewoonten: wai, hoofd en voeten, tempelkleding, omgang met monniken, fooi en actuele wettelijke grenzen.';
const HERO_IMAGE = '/images/redesign/thailand-etiquette-hero.webp';

const sectionNav: PageSectionNavItem[] = [
  { href: '#kompas', label: 'Sociaal kompas', icon: Eye },
  { href: '#begroeten', label: 'Begroeten', icon: Hand },
  { href: '#tempel', label: 'Tempel', icon: Landmark },
  { href: '#route', label: '60 seconden', icon: Route },
  { href: '#tafel', label: 'Tafel & fooi', icon: UtensilsCrossed },
  { href: '#wetten', label: 'Grenzen', icon: Scale },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

interface ContextRule {
  icon: LucideIcon;
  number: string;
  title: string;
  signal: string;
  doText: string;
  avoidText: string;
  unsure: string;
}

const contextRules: ContextRule[] = [
  {
    icon: Hand,
    number: '01',
    title: 'Begroeten met een wai',
    signal: 'Iemand brengt de handpalmen samen en buigt licht.',
    doText:
      'Beantwoord een wai rustig wanneer iemand je zo begroet. Een vriendelijke knik, glimlach en sawatdee khrap of sawatdee kha is voor een reiziger meestal genoeg.',
    avoidText:
      'Maak van de wai geen optreden en probeer niet bij iedere ontmoeting zelf rang of handhoogte te bepalen. Het gebaar drukt respect uit; de precieze uitvoering hangt van relatie en context af.',
    unsure:
      'Heb je je handen vol of twijfel je? Kijk vriendelijk, knik en volg het tempo van de ander.',
  },
  {
    icon: Footprints,
    number: '02',
    title: 'Hoofd hoog, voeten laag',
    signal: 'De ruimte is laag, heilig of mensen zitten op de vloer.',
    doText:
      'Houd je voeten op de grond of naar de zijkant en kijk waar anderen hun schoenen laten. In Thaise omgang geldt het hoofd als het hoogste en de voeten als het laagste lichaamsdeel.',
    avoidText:
      'Raak niet zomaar iemands hoofd aan, richt je voetzolen niet op mensen of een Boeddhabeeld en gebruik je voet niet om iets aan te wijzen of te verplaatsen.',
    unsure:
      'Ga zo zitten dat je voeten uit de centrale zichtlijn blijven en verplaats je zonder over iemand heen te stappen.',
  },
  {
    icon: House,
    number: '03',
    title: 'Een huis of kleine zaak binnen',
    signal: 'Er staan schoenen bij de ingang of de vloer ligt duidelijk hoger.',
    doText:
      'Pauzeer bij de drempel. Trek je schoenen uit wanneer de host dat doet, wanneer er een schoenenrek staat of wanneer een bord het vraagt.',
    avoidText:
      'Neem niet aan dat elke winkel, massagezaak of accommodatie exact dezelfde regel heeft. Een schoenenrij is een aanwijzing, geen uitnodiging om zonder te kijken door te lopen.',
    unsure:
      'Wijs even naar je schoenen en vraag kort of ze uit moeten; zo maak je de keuze samen met de host.',
  },
  {
    icon: Volume2,
    number: '04',
    title: 'Een probleem oplossen',
    signal: 'De rekening, reservering of bestelling klopt niet.',
    doText:
      'Leg rustig uit wat je verwachtte, laat de bevestiging zien en geef de ander ruimte om het op te lossen. Een concrete vraag werkt beter dan een openbare confrontatie.',
    avoidText:
      'Verhef je stem niet, maak personeel niet belachelijk en film een discussie niet als drukmiddel. Dat kan een klein praktisch probleem sociaal veel groter maken.',
    unsure:
      'Vraag om een collega, manager of vertaalhulp en ga één stap terug in toon en tempo.',
  },
  {
    icon: Camera,
    number: '05',
    title: 'Mensen en rituelen fotograferen',
    signal: 'Je ziet een gebed, offer, monnik, ceremonie of privé-moment.',
    doText:
      'Controleer borden, vraag toestemming voor een close-up en blijf buiten de looplijn van bezoekers die komen bidden. Zet geluid en flits uit wanneer fotografie is toegestaan.',
    avoidText:
      'Gebruik geen persoon als decor zonder toestemming en neem geen houding aan die een heilig object kleinerend of speels maakt.',
    unsure:
      'Laat de camera zakken. Een gemist beeld is eenvoudiger te herstellen dan beschadigd vertrouwen.',
  },
];

const templeChecklist = [
  {
    title: 'Kleed je voor de specifieke plek',
    text: 'Bedekte schouders en knieën zijn een veilige basis, maar iedere tempel of paleislocatie kan eigen toegangseisen hanteren. Controleer de officiële pagina en borden bij de ingang.',
    icon: Shirt,
  },
  {
    title: 'Schoenen: kijk naar de grens',
    text: 'Schoenen gaan uit vóór een gebedsruimte of waar de locatie dit aangeeft. Buiten op het terrein kunnen ze soms aanblijven. De drempel en de schoenen van anderen geven context.',
    icon: Footprints,
  },
  {
    title: 'Zit met je voeten opzij',
    text: 'Richt je voetzolen niet naar een Boeddhabeeld, monnik of andere bezoeker. Kies bij zitten op de vloer een houding met de benen gevouwen of de voeten naar de zijkant.',
    icon: MapPin,
  },
  {
    title: 'Raak heilige objecten niet aan',
    text: 'Klim niet op chedi’s, beelden of platforms voor een foto. Volg afzettingen en raak een Boeddhabeeld of offeropstelling alleen aan wanneer een begeleider dat uitdrukkelijk toestaat.',
    icon: ShieldCheck,
  },
  {
    title: 'Houd afstand tot monniken',
    text: 'Vermijd lichamelijk contact en dring niet binnen in een ritueel. Wil je iets aanbieden, volg dan de methode die de tempel of begeleider aangeeft in plaats van zelf een regel te improviseren.',
    icon: Hand,
  },
  {
    title: 'Vraag vóór je fotografeert',
    text: 'Fotografie is niet overal toegestaan. Controleer borden, gebruik geen flits bij kwetsbare kunst en blokkeer geen gebed of processie voor het perfecte beeld.',
    icon: Camera,
  },
];

const courtesySteps = [
  {
    title: 'Kijk',
    text: 'Waar liggen de schoenen, hoe bewegen anderen en welke borden markeren de ruimte?',
    icon: Eye,
  },
  {
    title: 'Groet',
    text: 'Maak oogcontact, glimlach en gebruik een eenvoudige begroeting zonder de situatie over te nemen.',
    icon: MessageCircle,
  },
  {
    title: 'Vraag',
    text: 'Toestemming voor een foto, aanraking, zitplek of handeling kost maar een paar seconden.',
    icon: CircleHelp,
  },
  {
    title: 'Pas aan',
    text: 'Krijg je een correctie, bedank dan en verander direct van gedrag. Dat is sterker dan jezelf verdedigen.',
    icon: BadgeCheck,
  },
];

const faqItems = [
  {
    question: 'Wat zijn de gewoontes in Thailand?',
    answer:
      'Gewoonten verschillen per familie, regio, generatie en situatie. Voor reizigers zijn vier veilige uitgangspunten bruikbaar: observeer eerst, spreek rustig, volg aanwijzingen bij tempels en huizen en vraag toestemming wanneer mensen of rituelen onderdeel van je foto of handeling worden. De wai, schoenen bij de drempel en respect voor hoofd en voeten zijn bekende voorbeelden, maar geen vervanging voor context.',
  },
  {
    question: 'Wat is respectloos in Thailand?',
    answer:
      'Iemands hoofd zonder toestemming aanraken, voetzolen naar mensen of Boeddhabeelden richten, op heilige structuren klimmen en een ruzie publiek laten escaleren worden doorgaans als respectloos ervaren. Bij een vergissing is een korte verontschuldiging en directe aanpassing meestal beter dan een lange uitleg.',
  },
  {
    question: 'Wat zijn de do’s en don’ts in Thailand?',
    answer:
      'Doe: kijk hoe de ruimte wordt gebruikt, begroet vriendelijk, kleed je passend voor religieuze locaties, vraag vóór je fotografeert en bespreek problemen rustig. Vermijd: zomaar hoofden aanraken, met je voet wijzen, luid iemand terechtwijzen, heilige objecten als fotoprop gebruiken en sociale gebruiken verwarren met wettelijke toestemming.',
  },
  {
    question: 'Waar moet je opletten als je naar Thailand gaat?',
    answer:
      'Maak onderscheid tussen drie niveaus: huis- of locatieregels, sociale etiquette en Thaise wetgeving. Kijk bij de ingang naar kleding-, schoenen- en fotoregels; volg bij twijfel de host of gids. Controleer vóór vertrek ook het actuele reisadvies, want veiligheids- en wettelijke informatie kan veranderen.',
  },
  {
    question: 'Wat dragen in de tempel van Thailand?',
    answer:
      'Bedekte schouders en knieën zijn een verstandige basis voor mannen en vrouwen. Kies niet-doorschijnende kleding die niet extreem strak zit en neem een extra laag mee. De Grand Palace-regels zijn strenger dan die van sommige andere tempels, dus controleer altijd de officiële locatie-informatie in plaats van één universele dresscode aan te nemen.',
  },
  {
    question: 'Gelden er kledingvoorschriften in Thaise tempels?',
    answer:
      'Ja, maar de precieze toegangseisen verschillen per complex en ruimte. Een open tempelterrein kan andere regels hebben dan een gebedszaal of paleiscomplex. Borden en medewerkers bij de ingang zijn beslissend; een sarong of leenbroek is niet overal beschikbaar.',
  },
  {
    question: 'Wat betekent Wai?',
    answer:
      'De wai is een Thais gebaar met samengebrachte handpalmen en een lichte buiging. Het kan begroeting, dank, erkenning of respect uitdrukken. De vorm hangt samen met de verhouding tussen mensen. Als reiziger hoef je het systeem niet perfect te beheersen: beantwoord een aangeboden wai vriendelijk of gebruik een knik wanneer je handen vol zijn.',
  },
  {
    question: 'Hoe zeg je dankjewel in het Thais?',
    answer:
      'Een veelgebruikte vorm is khop khun khrap voor een mannelijke spreker en khop khun kha voor een vrouwelijke spreker. Uitspraak en transliteratie verschillen per bron. Een rustige toon en vriendelijke houding zijn belangrijker dan perfecte spelling; op de pagina met Thaise basiszinnen vind je meer praktische voorbeelden.',
  },
  {
    question: 'Hoeveel fooi geef je in Thailand?',
    answer:
      'Er bestaat geen universeel bedrag dat in iedere situatie verplicht of passend is. Controleer eerst of service charge al op de rekening staat. Een vrijwillige extra of afronding kan bij goede service, maar laat de context, het type zaak en je eigen oordeel leidend zijn. Gepubliceerd vaste baht-bedragen verouderen snel en suggereren ten onrechte één nationale regel.',
  },
  {
    question: 'Wat is in Thailand verboden voor toeristen?',
    answer:
      'Toeristen vallen onder de Thaise wet. Het actuele Nederlandse reisadvies waarschuwt onder meer voor strenge drugsregels, het huidige verbod op recreatief cannabisgebruik en de strikte handhaving rond belediging van het Thaise koningshuis. Dit zijn wettelijke grenzen, geen etiquetteadviezen. Controleer het reisadvies opnieuw vlak vóór vertrek en neem bij een incident contact op met bevoegde instanties.',
  },
];

const relatedGuides = [
  {
    title: 'Eerste keer Thailand',
    description: 'Van aankomst en geld tot vervoer, omgang en een haalbare eerste reisroute.',
    href: '/thailand-for-first-timers/',
    image: '/images/redesign/first-time-thailand-hero.webp',
    imageAlt: 'Reiziger bij een Thaise tempel tijdens een eerste reis door Thailand',
  },
  {
    title: 'Is Thailand veilig?',
    description: 'Scheid normale reisrisico’s, actuele waarschuwingen en concrete noodroutes.',
    href: '/is-thailand-safe/',
    image: '/images/redesign/thailand-safety-hero.webp',
    imageAlt: 'Reizigers die hun route en veiligheid in Thailand controleren',
  },
  {
    title: 'Thaise basiszinnen',
    description: 'Begroet, bedank en stel eenvoudige vragen zonder een woordenlijst uit je hoofd te leren.',
    href: '/travel-guides/thai-phrases-language/',
    image: '/images/redesign/blue-temple-chiang-rai-hero.webp',
    imageAlt: 'Thaise tempel als context voor taal en lokale omgang',
  },
];

const sources = [
  {
    title: 'Practical information & dress code',
    creator: 'The Grand Palace — official',
    url: 'https://www.royalgrandpalace.th/en/visit/practical-information',
    note: 'Locatiespecifieke toegangsinformatie en de strengere kledingregels voor het Grand Palace-complex.',
  },
  {
    title: 'Feet Low, Head High: a guide to Thai etiquettes',
    creator: 'Thailand Foundation',
    url: 'https://thailandfoundation.or.th/feet-low-head-high-a-guide-to-thai-etiquettes/',
    note: 'Culturele context voor hoofd, voeten, schoenen en respectvolle lichaamshouding.',
  },
  {
    title: 'Wai: the Thai greeting',
    creator: 'Thailand Foundation',
    url: 'https://www.thailandfoundation.or.th/wai-the-thai-greeting/',
    note: 'Achtergrond bij de wai als begroeting, erkenning en respectgebaar.',
  },
  {
    title: 'Reisadvies Thailand',
    creator: 'NederlandWereldwijd',
    url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand',
    note: 'Actuele Nederlandse informatie over wetgeving, drugs, cannabis, het koningshuis en noodnummers.',
  },
];

function CourtesyRoute() {
  return (
    <div className="relative mt-10">
      <svg className="pointer-events-none absolute left-[8%] top-10 hidden h-20 w-[84%] text-saffron/70 lg:block" viewBox="0 0 1000 120" fill="none" aria-hidden="true">
        <path d="M15 65 C105 3 170 115 255 60 S420 5 500 61 S660 116 745 60 S895 4 985 64" stroke="currentColor" strokeWidth="2" strokeDasharray="4 9" strokeLinecap="round" />
        <circle cx="15" cy="65" r="5" fill="currentColor" />
        <circle cx="985" cy="64" r="5" fill="currentColor" />
      </svg>
      <ol className="relative grid gap-4 lg:grid-cols-4">
        {courtesySteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card lg:mt-0 lg:min-h-[250px]">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-saffron/30 bg-tonal text-jade"><Icon size={21} strokeWidth={1.5} /></span>
                <span className="font-display text-3xl font-semibold text-jade/12">0{index + 1}</span>
              </div>
              <h3 className="mt-7 font-display text-[1.85rem] font-semibold leading-none text-jade">{step.title}</h3>
              <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function ThailandEtiquetteGuide() {
  const subId = useSubId();
  const cultureTourHref = withPlacementSubId(KLOOK_GENERIC, subId, 'etiquette-cultural-tour');

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    mainEntityOfPage: PAGE_URL,
    image: `https://go2-thailand.com${HERO_IMAGE}`,
    inLanguage: 'nl-NL',
    dateModified: '2026-07-26',
    author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Praktische info', item: 'https://go2-thailand.com/nl/practical-info/' },
      { '@type': 'ListItem', position: 3, name: 'Thaise etiquette', item: PAGE_URL },
    ],
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'In 60 seconden respectvol reageren in Thailand',
    description: 'Een korte beslisroute voor een onbekende sociale of religieuze situatie.',
    step: courtesySteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.text,
      url: `${PAGE_URL}#route`,
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vijf alledaagse situaties voor Thailand etiquette',
    itemListElement: contextRules.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.doText,
    })),
  };

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        {[articleJsonLd, faqJsonLd, breadcrumbJsonLd, howToJsonLd, itemListJsonLd].map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <main className="overflow-hidden bg-canvas">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Nederlandse reizigers beantwoorden een wai bij een Thaise tempel"
          breadcrumbs={[
            { label: 'Thailand', href: '/' },
            { label: 'Praktische info', href: '/practical-info/' },
            { label: 'Etiquette' },
          ]}
          eyebrow="Respect zonder toneelstuk"
          title={<>Thaise etiquette.<br />Eerst kijken,<br /><span className="italic">dan meedoen.</span></>}
          description={<>Je hoeft geen culturele handleiding uit je hoofd te leren. Met vier gewoonten — <strong>observeren, rustig spreken, toestemming vragen en direct aanpassen</strong> — kom je in huizen, tempels en aan tafel al heel ver.</>}
          actions={[
            { label: 'Open het sociale kompas', href: '#kompas', kind: 'primary' },
            { label: 'Bekijk de tempelregels', href: '#tempel', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[760px] lg:min-h-[690px]"
          titleClassName="max-w-[650px] text-[3.65rem] leading-[0.86] sm:text-[4.8rem] lg:text-[5.45rem]"
          contentClassName="max-w-[620px]"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.18)_0%,rgba(252,250,246,0.58)_48%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_35%,rgba(252,250,246,0.25)_64%,rgba(8,46,39,0.08)_100%)]"
          sideCard={
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[285px] rounded-2xl border border-white/45 bg-white/78 p-5 shadow-editorial-lift backdrop-blur-xl xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Je sociale paspoort</p>
              <div className="mt-4 grid grid-cols-[32px_1fr] gap-x-3 gap-y-3 text-[11px] font-bold leading-5 text-jade">
                <Eye size={17} className="mt-0.5 text-saffron" /><span>Kijk wat de ruimte vraagt</span>
                <MessageCircle size={17} className="mt-0.5 text-saffron" /><span>Houd toon en uitleg rustig</span>
                <CircleHelp size={17} className="mt-0.5 text-saffron" /><span>Vraag als het niet duidelijk is</span>
              </div>
            </aside>
          }
        />

        <PageSectionNav items={sectionNav} />

        <section className="section-divider-bottom bg-canvas py-7" aria-label="Vier basisregels">
          <div className="container-custom grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Eye, 'Observeer eerst', 'De omgeving vertelt vaak meer dan een lijst.'],
              [Footprints, 'Let op de drempel', 'Schoenen en voetzolen vragen context.'],
              [MessageCircle, 'Corrigeer rustig', 'Behoud ruimte voor een oplossing.'],
              [Scale, 'Ken het verschil', 'Een gewoonte is geen wet — en andersom.'],
            ].map(([Icon, title, text]) => {
              const TrustIcon = Icon as LucideIcon;
              return (
                <div key={title as string} className="flex items-center gap-4 border-l border-jade/10 pl-4 first:border-l-0 first:pl-0 sm:first:border-l sm:first:pl-4 lg:first:border-l-0 lg:first:pl-0">
                  <TrustIcon size={21} strokeWidth={1.45} className="shrink-0 text-jade" />
                  <div><strong className="block text-xs font-extrabold text-jade">{title as string}</strong><span className="mt-1 block text-[10px] font-medium leading-4 text-charcoal/54">{text as string}</span></div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="kompas" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Eerst het onderscheid"
                title={<>Een sociale misser<br />is geen misdrijf.</>}
                description={<>Thailand kent gewoonten, locatieregels én wetten. Wie alles als een streng verbod presenteert, maakt reizen onnodig gespannen. Wie alles afdoet als folklore, kan echte grenzen missen.</>}
              />
              <p className="mt-6 text-sm font-medium leading-7 text-charcoal/66">Deze gids gebruikt daarom geen lijst met vermeende “Thaise persoonlijkheidskenmerken”. Hij geeft je per situatie een <strong className="text-jade">zichtbaar signaal, een veilige handeling en een herstelroute</strong>.</p>
            </div>
            <div className="overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid md:grid-cols-2">
                <article className="jade-pattern p-8 sm:p-10">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-saffron-light"><MessageCircle size={21} /></span>
                  <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Sociale gewoonte</p>
                  <h3 className="mt-2 font-display text-[2.5rem] font-semibold leading-[0.94]">Lees. Pas aan. Ga verder.</h3>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/66">Trek je schoenen alsnog uit, verplaats je voeten of bied kort excuses aan. Een respectvolle correctie hoeft je dag niet te bepalen.</p>
                </article>
                <article className="border-t border-white/10 bg-white/[0.055] p-8 sm:p-10 md:border-l md:border-t-0">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-saffron/35 bg-saffron text-white"><AlertTriangle size={21} /></span>
                  <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Wettelijke grens</p>
                  <h3 className="mt-2 font-display text-[2.5rem] font-semibold leading-[0.94]">Stop. Controleer. Neem hulp.</h3>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/66">Drugsregels, het koningshuis en politiecontact zijn geen culturele nuance. Gebruik actuele officiële informatie en vraag professionele hulp bij een incident.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="begroeten" className="section-divider-bottom scroll-mt-24 bg-tonal/52 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow="Vijf herkenbare momenten" title={<>Wat vraagt deze<br />situatie van je?</>} description="Niet iedereen in Thailand verwacht hetzelfde gedrag. Gebruik concrete signalen in plaats van aannames over een heel land." />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/64 lg:justify-self-end">De wai krijgt veel aandacht, maar dagelijkse hoffelijkheid zit vaker in iets kleiners: even wachten bij een drempel, een vraag stellen vóór een foto of de toon verlagen wanneer iets misgaat. Dat werkt in Bangkok net zo goed als in een dorp, zonder te doen alsof iedere ontmoeting identiek is.</p>
            </div>

            <div className="mt-12 border-y border-jade/10">
              {contextRules.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className={`grid gap-6 border-b border-jade/10 px-1 py-8 last:border-b-0 lg:grid-cols-[80px_0.7fr_1.3fr] lg:items-start lg:gap-9 ${index % 2 ? 'bg-white/45' : ''}`}>
                    <div className="flex items-center justify-between lg:block">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-jade/12 bg-canvas text-jade"><Icon size={22} strokeWidth={1.45} /></span>
                      <span className="font-display text-3xl font-semibold text-jade/10 lg:mt-7 lg:block">{item.number}</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Signaal</p>
                      <h3 className="mt-2 font-display text-[2.15rem] font-semibold leading-none text-jade">{item.title}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/60">{item.signal}</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div><p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-jade"><Check size={15} className="text-saffron" /> Doe dit</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{item.doText}</p></div>
                      <div><p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-jade"><X size={15} className="text-saffron" /> Vermijd dit</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{item.avoidText}</p></div>
                      <p className="rounded-xl border border-saffron/25 bg-tonal px-4 py-3 text-[11px] font-bold leading-5 text-jade sm:col-span-2"><span className="text-saffron-dark">Bij twijfel:</span> {item.unsure}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="tempel" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[430px] lg:min-h-[720px]">
                <Image src="/images/redesign/thailand-etiquette-temple.webp" alt="Bezoekers trekken hun schoenen uit voor een Thaise tempelruimte" fill sizes="(max-width: 1024px) 100vw, 43vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-jade/35" />
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/15 bg-jade/76 p-4 backdrop-blur-md">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Lees de drempel</p>
                  <p className="mt-2 text-xs font-medium leading-5 text-white/72">Een schoenenrek, bord of host geeft de grens aan. Niet ieder deel van een complex heeft dezelfde regel.</p>
                </div>
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">Van poort tot gebedsruimte</p>
                <h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.035em] sm:text-[4rem]">Een tempel bezoek je in lagen.</h2>
                <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/68">“Tempelregels Thailand” klinkt alsof er één checklist bestaat. In werkelijkheid kan een open terrein, binnenruimte, ceremonie en paleiscomplex ieder een andere grens hebben. Dit zijn veilige standaardkeuzes; lokale aanwijzingen gaan altijd voor.</p>
                <div className="mt-9 grid gap-x-7 gap-y-6 sm:grid-cols-2">
                  {templeChecklist.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title} className="border-t border-white/12 pt-5">
                        <Icon size={20} strokeWidth={1.45} className="text-saffron-light" />
                        <h3 className="mt-4 text-sm font-extrabold text-white">{item.title}</h3>
                        <p className="mt-2 text-[11px] font-medium leading-5 text-white/58">{item.text}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <article className="rounded-[24px] border border-saffron/25 bg-tonal p-7 sm:p-9">
                <p className="eyebrow">Strenger voorbeeld</p>
                <h3 className="font-display text-[2.35rem] font-semibold leading-none text-jade">Grand Palace is geen universele tempeldresscode.</h3>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">Het officiële Grand Palace-overzicht noemt onder meer mouwloze tops, korte of doorschijnende kleding, korte broeken, gescheurde of zeer strakke broeken, fietsbroeken en minirokken als ongeschikt. Gebruik die lijst voor <strong className="text-jade">dat complex</strong>; controleer voor een andere tempel de eigen informatie.</p>
                <a href="https://www.royalgrandpalace.th/en/visit/practical-information" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk de officiële toegangsinformatie <ExternalLink size={14} className="text-saffron" /></a>
              </article>
              <aside className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9">
                <Sparkles size={23} strokeWidth={1.45} className="text-saffron" />
                <h3 className="mt-5 font-display text-[2rem] font-semibold leading-none text-jade">Liever met context?</h3>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">Een lokale gids kan rituelen en locatiekeuzes uitleggen. Controleer bij iedere tour de exacte tempels, dresscode, inclusies, taal en annuleringsvoorwaarden.</p>
                <a href={cultureTourHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group mt-6 w-full justify-center">Vergelijk cultuurtours op Klook <ExternalLink size={14} className="text-saffron-light" /></a>
                <AffiliateDisclosure className="mt-3">Klook is een affiliatelink. Wij ontvangen mogelijk commissie zonder hogere prijs voor jou; de touraanbieder bepaalt inhoud en voorwaarden.</AffiliateDisclosure>
              </aside>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal/55 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Geen regel gevonden?" title={<>Je route in<br />60 seconden.</>} description="Je hoeft bij een onbekende situatie niet te gokken. Met vier handelingen maak je respect zichtbaar én houd je ruimte om te leren." />
            <CourtesyRoute />
          </div>
        </section>

        <section id="tafel" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <SectionHeading eyebrow="Eten, rekening en fooi" title={<>De tafel is<br />geen test.</>} description="Observeer hoe gerechten worden gedeeld, gebruik opscheplepels wanneer die er liggen en bespreek allergieën of dieetwensen vóór het bestellen." />
              <Link href="/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Ontdek de Thaise eetcultuur <ArrowRight size={14} className="text-saffron" /></Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <article className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-8">
                <UtensilsCrossed size={23} strokeWidth={1.45} className="text-jade" />
                <h3 className="mt-6 font-display text-[2.15rem] font-semibold leading-none text-jade">Samen eten</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-charcoal/64">Veel maaltijden bestaan uit gedeelde gerechten met rijst per persoon, maar formaat en volgorde verschillen. Neem kleine porties, gebruik aanwezige serveerlepels en wacht even wanneer een host bestelt of begint.</p>
                <p className="mt-5 border-t border-jade/10 pt-5 text-[11px] font-bold leading-5 text-jade"><span className="text-saffron-dark">Praktisch:</span> een lepel en vork zijn gebruikelijk; maak er geen probleem van als een zaak ander bestek neerlegt.</p>
              </article>
              <article className="rounded-[24px] border border-saffron/25 bg-tonal p-7 shadow-editorial-card sm:p-8">
                <ShoppingBag size={23} strokeWidth={1.45} className="text-saffron-dark" />
                <h3 className="mt-6 font-display text-[2.15rem] font-semibold leading-none text-jade">Fooi in Thailand</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-charcoal/64">Controleer eerst de rekening: service charge kan al zijn opgenomen. Een extra fooi is vervolgens een vrijwillige waardering, geen landelijk vast tarief. Type zaak, service en lokale context tellen zwaarder dan een online bedrag per beroep.</p>
                <p className="mt-5 border-t border-jade/10 pt-5 text-[11px] font-bold leading-5 text-jade"><span className="text-saffron-dark">Vermijd schijnzekerheid:</span> we publiceren geen tijdloos “correct” baht-bedrag dat prijzen en verwachtingen niet kan volgen.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom pb-16 lg:pb-24">
          <div className="container-custom">
            <div className="relative min-h-[440px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift lg:min-h-[470px]">
              <Image src="/images/redesign/thailand-etiquette-everyday.webp" alt="Thaise hosts en reizigers delen eten aan een rustige tafel bij de rivier" fill sizes="100vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,34,30,0.98)_0%,rgba(5,34,30,0.9)_35%,rgba(5,34,30,0.28)_68%,rgba(5,34,30,0.08)_100%)]" />
              <div className="relative z-10 max-w-[620px] p-8 text-white sm:p-11 lg:p-14">
                <p className="eyebrow !text-saffron-light">De belangrijkste gewoonte</p>
                <h2 className="font-display text-[3.4rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4.35rem]">Respect is geen performance.</h2>
                <p className="mt-6 max-w-[520px] text-sm font-medium leading-7 text-white/70">Je hoeft niet “zo Thais mogelijk” te handelen. Goed luisteren, rustig reageren en accepteren dat een host de ruimte beter kent, voelt natuurlijker dan een ingestudeerde reeks gebaren.</p>
                <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/66">
                  <span className="rounded-lg border border-white/15 bg-white/[0.07] px-4 py-3">Kijk naar de context</span>
                  <span className="rounded-lg border border-white/15 bg-white/[0.07] px-4 py-3">Vraag toestemming</span>
                  <span className="rounded-lg border border-white/15 bg-white/[0.07] px-4 py-3">Herstel zonder drama</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal/55 py-16 lg:py-24">
          <div className="container-custom grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <SectionHeading eyebrow="Een tempeldag in je tas" title={<>Twee praktische<br />hulpmiddelen.</>} description="Niet verplicht en geen toegangsgarantie — wel nuttig wanneer je na een warme stadswandeling spontaan een religieuze locatie bezoekt." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a href="/go/hovsiyla-quick-dry-shirt/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:border-saffron/35">
                  <Shirt size={23} strokeWidth={1.45} className="text-jade" />
                  <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Amazon via OneLink</p>
                  <h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">Quick-dry reisshirt</h3>
                  <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/58">Controleer mouwlengte, pasvorm, materiaal, maat en de regels van je locatie; één shirt maakt een outfit niet automatisch geschikt.</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">Bekijk actueel product <ExternalLink size={13} className="text-saffron" /></span>
                </a>
                <a href="/go/venture-pal-packable-backpack/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:border-saffron/35">
                  <ShoppingBag size={23} strokeWidth={1.45} className="text-jade" />
                  <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Amazon via OneLink</p>
                  <h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">Opvouwbare dagrugzak</h3>
                  <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/58">Voor een extra kledinglaag en schoenenhoes. Controleer formaat, draagcomfort, verkoper en actuele beschikbaarheid per Amazon-winkel.</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">Bekijk actueel product <ExternalLink size={13} className="text-saffron" /></span>
                </a>
              </div>
              <AffiliateDisclosure className="mt-4">Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. Onze centrale <strong>/go/</strong>-router voegt de Go2Thailand-tag toe; OneLink kan je naar een lokale Amazon-winkel sturen. Product, prijs, verkoper en beschikbaarheid verschillen per land.</AffiliateDisclosure>
            </div>
            <aside className="relative overflow-hidden rounded-[26px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10">
              <div className="jade-pattern absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="relative">
                <BookOpen size={25} className="text-saffron-light" />
                <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Wat neem je wél mee?</p>
                <h3 className="mt-2 font-display text-[2.65rem] font-semibold leading-[0.92]">Een laag, geen kostuum.</h3>
                <ul className="mt-7 space-y-4 text-xs font-medium leading-6 text-white/66">
                  <li className="flex gap-3"><Check size={15} className="mt-1 shrink-0 text-saffron-light" />Luchtige bedekking voor schouders en knieën.</li>
                  <li className="flex gap-3"><Check size={15} className="mt-1 shrink-0 text-saffron-light" />Schoenen die je eenvoudig aan- en uittrekt.</li>
                  <li className="flex gap-3"><Check size={15} className="mt-1 shrink-0 text-saffron-light" />Een rustige vraag wanneer de grens niet duidelijk is.</li>
                </ul>
                <Link href="/travel-gear/" className="btn-cream mt-8">Bekijk de volledige paklijst <ArrowRight size={14} /></Link>
              </div>
            </aside>
          </div>
        </section>

        <section id="wetten" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <SectionHeading eyebrow="Niet onderhandelbaar" title={<>Waar etiquette<br />wet wordt.</>} description="Onderstaande punten zijn bewust beperkt tot actuele officiële Nederlandse reisinformatie. Het is geen juridisch advies." />
                <Link href="/is-thailand-safe/" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Lees de volledige veiligheidsgids <ArrowRight size={14} className="text-saffron" /></Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Landmark,
                    label: 'Koningshuis',
                    title: 'Niet bekritiseren of beledigen',
                    text: 'Belediging van het Thaise koningshuis is verboden en wordt streng gehandhaafd. Wees ook online terughoudend; een privégesprek is geen uitzondering op de wet.',
                  },
                  {
                    icon: ShieldCheck,
                    label: 'Drugs & cannabis',
                    title: 'Geen ruimte voor aannames',
                    text: 'Het actuele reisadvies waarschuwt voor zware drugsstraffen en meldt dat recreatief cannabisgebruik verboden is. Vertrouw niet op oude blogs, winkels of sociale media.',
                  },
                  {
                    icon: Languages,
                    label: 'Hulp',
                    title: 'Bel de juiste instantie',
                    text: 'Tourist Police 1155 kan toeristen helpen en vertalen. Bij directe nood is de Thaise politie bereikbaar via 191. Volg daarnaast instructies van lokale autoriteiten.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.label} className="rounded-[22px] border border-jade/10 bg-white p-6 shadow-editorial-card">
                      <div className="flex items-center justify-between"><Icon size={22} strokeWidth={1.45} className="text-jade" /><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.label}</span></div>
                      <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-none text-jade">{item.title}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            <aside className="mt-7 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4"><AlertTriangle size={21} className="mt-0.5 shrink-0 text-saffron-dark" /><p className="max-w-3xl text-xs font-medium leading-6 text-charcoal/66"><strong className="text-jade">Controleer opnieuw vóór vertrek.</strong> Het reisadvies van NederlandWereldwijd was bij onze controle op 24 juli 2026 bijgewerkt. Wetgeving en veiligheidszones kunnen veranderen na publicatie van deze gids.</p></div>
              <a href="https://www.nederlandwereldwijd.nl/reisadvies/thailand" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-jade">Open reisadvies <ExternalLink size={14} className="text-saffron" /></a>
            </aside>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over Thailand etiquette" description="Deze vragen komen uit actuele Nederlandse People Also Ask-resultaten. De antwoorden maken onderscheid tussen stabiele omgangsvormen, locatiespecifieke regels en informatie die je vóór vertrek opnieuw moet controleren." items={faqItems} />

        <RelatedGuidesSection eyebrow="Verder voorbereiden" title="Van goede omgang naar een rustige reis" guides={relatedGuides} />

        <SourceMethodSection
          eyebrow="Controleerbare informatie"
          title="Bronnen & methode"
          description="Deze Nederlandse owner is op 26 juli 2026 herbouwd na DataForSEO-keyword-, SERP-, concurrent-, PAA-, ranking- en backlinkonderzoek. We gebruiken officiële bronnen voor tempeltoegang, culturele context en wetgeving. Waar normen per plek of persoon verschillen, geven we een beslisregel in plaats van schijnzekerheid."
          sources={sources}
        />
      </main>
    </>
  );
}
