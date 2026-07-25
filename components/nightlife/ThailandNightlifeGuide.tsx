import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  CircleHelp,
  Clock3,
  ExternalLink,
  GlassWater,
  Headphones,
  Hotel,
  Landmark,
  MapPin,
  MapPinned,
  Martini,
  MoonStar,
  Music2,
  Navigation,
  Phone,
  ReceiptText,
  Route,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Sun,
  Ticket,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import { KLOOK_GENERIC, withPlacementSubId } from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import {
  PageSectionNav,
  type PageSectionNavItem,
} from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

const PAGE_URL = "https://go2-thailand.com/nl/nightlife/";
const PAGE_TITLE = "Nachtleven in Thailand: 8 bestemmingen vergeleken";
const PAGE_DESCRIPTION =
  "Vergelijk het nachtleven van Bangkok, Pattaya, Phuket, Chiang Mai en vier eilanden of kustplaatsen. Met avondtypes, actuele alcoholregels, Full Moon Party en veilige terugroute.";
const HERO_IMAGE = "/images/redesign/thailand-nightlife-hero.webp";

const sectionNav: PageSectionNavItem[] = [
  { href: "#kiezen", label: "Kies je sfeer", icon: Sparkles },
  { href: "#bestemmingen", label: "Bestemmingen", icon: MapPinned },
  { href: "#avondroute", label: "Avondroute", icon: Route },
  { href: "#regels", label: "Regels", icon: BadgeCheck },
  { href: "#full-moon", label: "Full Moon", icon: MoonStar },
  { href: "#veilig", label: "Veilig terug", icon: ShieldCheck },
  { href: "#vragen", label: "Vragen", icon: CircleHelp },
];

interface NightMood {
  icon: LucideIcon;
  title: string;
  cue: string;
  fits: string;
  tradeoff: string;
}

const nightMoods: NightMood[] = [
  {
    icon: ShoppingBasket,
    title: "Nachtmarkt",
    cue: "Eten + rondkijken",
    fits: "Je wilt vroeg beginnen, veel proeven en zonder vaste eindtijd door een levendige markt lopen.",
    tradeoff:
      "Markten zijn niet elke dag open en “nachtmarkt” kan ook vooral een toeristische foodcourt betekenen. Controleer dag en locatie.",
  },
  {
    icon: Sun,
    title: "Sunset & rooftop",
    cue: "Uitzicht + gesprek",
    fits: "Je zoekt een geplande start, zitplek en rustiger tempo als stel of kleine groep.",
    tradeoff:
      "Dresscode, minimum spend en reservering verschillen per venue. Kijk op de officiële pagina van dezelfde dag.",
  },
  {
    icon: Music2,
    title: "Live muziek",
    cue: "Band + lokale sfeer",
    fits: "Je wilt luisteren, praten en eventueel later beslissen of de avond langer duurt.",
    tradeoff:
      "Een bekende naam kan verhuizen of van formule wisselen. Een recente agenda is nuttiger dan een oude top-10.",
  },
  {
    icon: Headphones,
    title: "Clubavond",
    cue: "Laat + intens",
    fits: "Je kiest bewust voor dansen, volume, entreecontrole en een latere terugrit.",
    tradeoff:
      "Leeftijd, ID, dresscode, entree en eindtijd zijn venue- en vergunningafhankelijk. Neem geen universele tijden over.",
  },
  {
    icon: Waves,
    title: "Beach bar",
    cue: "Voeten in het zand",
    fits: "Je wilt de avond aan zee beginnen en misschien na zonsondergang blijven.",
    tradeoff:
      "Weer, zeegang en afstand tot je verblijf bepalen de terugweg. Zwem niet nadat je alcohol hebt gedronken.",
  },
  {
    icon: Martini,
    title: "Adult zone",
    cue: "Zichtbaar maar optioneel",
    fits: "Je wilt een bekende neonstraat zien en begrijpt dat volwassen entertainment onderdeel van het straatbeeld kan zijn.",
    tradeoff:
      "Je hoeft niets binnen te gaan of te kopen. Vraag prijzen vooraf, respecteer grenzen en kies een ander gebied als dit niet bij je past.",
  },
];

interface Destination {
  name: string;
  label: string;
  href: string;
  bestFor: string;
  rhythm: string;
  tradeoff: string;
  detailOwner: boolean;
}

const destinations: Destination[] = [
  {
    name: "Bangkok",
    label: "Meeste keuze",
    href: "/nightlife/bangkok/",
    bestFor:
      "Rooftops, nachtmarkten, live muziek en clubs in duidelijk verschillende wijken.",
    rhythm:
      "Kies één wijk per avond; de stad is te groot voor gedachteloos hoppen.",
    tradeoff:
      "Reistijd en druk verkeer wegen zwaarder dan de afstand op de kaart.",
    detailOwner: true,
  },
  {
    name: "Pattaya",
    label: "Meest geconcentreerd",
    href: "/nightlife/pattaya/",
    bestFor:
      "Walking Street, Soi Buakhao, cabaret en een rustiger avond in Jomtien.",
    rhythm:
      "Veel prikkels op korte afstand, met zichtbaar adult entertainment in specifieke zones.",
    tradeoff: "Kies je grenzen en terugrit vóór je de drukste straat inloopt.",
    detailOwner: true,
  },
  {
    name: "Phuket",
    label: "Strand + intensiteit",
    href: "/nightlife/phuket/",
    bestFor:
      "Patong voor volle energie; Kata, Karon, Kamala en Phuket Old Town voor een ander tempo.",
    rhythm:
      "De juiste kustplaats verandert de hele avond, niet alleen je hotel.",
    tradeoff:
      "Eilandafstanden maken een spontane late wissel duurder en minder praktisch.",
    detailOwner: true,
  },
  {
    name: "Chiang Mai",
    label: "Markt + muziek",
    href: "/nightlife/chiang-mai/",
    bestFor:
      "Nachtmarkten, live muziek, Nimman en een socialer tempo zonder strandclubs.",
    rhythm: "Begin met eten of markt en voeg daarna één bar of live-set toe.",
    tradeoff:
      "Niet de logische keuze als je vooral tot zonsopgang wilt clubben.",
    detailOwner: true,
  },
  {
    name: "Koh Phangan",
    label: "Kalender bepaalt",
    href: "/islands/koh-phangan/",
    bestFor:
      "De Full Moon Party in Haad Rin of juist een veel rustiger eilandritme buiten het evenement.",
    rhythm: "Je reisweek bepaalt meer dan een algemene eilandbeschrijving.",
    tradeoff:
      "Rond grote evenementen veranderen drukte, vervoer en accommodatie sterk.",
    detailOwner: false,
  },
  {
    name: "Koh Samui",
    label: "Keuze per kust",
    href: "/city/koh-samui/",
    bestFor:
      "Chaweng voor levendigheid; Bophut en Fisherman’s Village voor eten en gesprek.",
    rhythm: "Combineer zonsondergang, diner en één compacte avondzone.",
    tradeoff: "Een hotel aan de verkeerde kust maakt de terugrit onnodig lang.",
    detailOwner: false,
  },
  {
    name: "Krabi",
    label: "Ontspannen kustavond",
    href: "/city/krabi/",
    bestFor:
      "Ao Nang voor toegankelijke bars en Krabi Town voor een lokaler avondritme.",
    rhythm:
      "Past bij reizigers die de volgende ochtend nog een boot- of natuurdag willen.",
    tradeoff:
      "Verwacht geen Bangkok-achtige clubdichtheid of eilandbrede partyscene.",
    detailOwner: false,
  },
  {
    name: "Hua Hin",
    label: "Gesprek boven club",
    href: "/city/hua-hin/",
    bestFor:
      "Avondmarkt, visrestaurant, live muziek en een rustige hotellounge.",
    rhythm: "Vroeger en overzichtelijker dan de grote feestbestemmingen.",
    tradeoff:
      "Minder geschikt als een internationale clubscene je hoofdreden voor reizen is.",
    detailOwner: false,
  },
];

const routeSteps = [
  {
    icon: MapPin,
    title: "Kies een straal",
    label: "Voor je vertrekt",
    text: "Selecteer één wijk, kustplaats of marktgebied. Zet een tweede optie alleen klaar als die binnen dezelfde compacte zone ligt.",
  },
  {
    icon: BadgeCheck,
    title: "Controleer de avond",
    label: "Dezelfde dag",
    text: "Bekijk officiële venuepost, markt- of evenementagenda, weer, dresscode, ID-regel en eventuele reservering.",
  },
  {
    icon: Navigation,
    title: "Reserveer de terugweg",
    label: "Voor de eerste ronde",
    text: "Bewaar hotelnaam in het Thais, kaartpin en een helder ophaalpunt. Rijd na alcohol niet zelf op scooter of motor.",
  },
  {
    icon: Users,
    title: "Maak één groepsafspraak",
    label: "Voor de drukte",
    text: "Kies een ontmoetingspunt en vertrekmoment. Spreek af dat niemand stil verdwijnt of zonder check alleen teruggaat.",
  },
];

const faqs = [
  {
    question: "Wat is het beste nachtleven in Thailand?",
    answer:
      "Er is geen beste plek voor iedere reiziger. Bangkok heeft de breedste keuze, Pattaya de meest geconcentreerde neon- en adult zones, Phuket combineert strandplaatsen met Patong, Chiang Mai past beter bij nachtmarkten en live muziek, en Koh Phangan draait rond specifieke feestdata. Kies op sfeer, schaal en terugrit — niet op één online ranglijst.",
  },
  {
    question: "Is Thailand een goede plek voor het nachtleven?",
    answer:
      "Ja, wanneer je het juiste avondtype en gebied kiest. Je kunt vroeg eten op een nachtmarkt, een rooftop reserveren, live muziek luisteren, naar een club gaan of een strandavond plannen. Het aanbod verschilt sterk per wijk en eiland; een bekende feeststraat is geen samenvatting van heel Thailand.",
  },
  {
    question: "Waar kan je het beste uitgaan in Thailand?",
    answer:
      "Voor maximale variatie kies je Bangkok. Voor compacte uitgaansstraten past Pattaya, voor strand en clubs Phuket of delen van Koh Samui, voor een evenement Koh Phangan en voor markten en live muziek Chiang Mai. Bekijk in de bestemmingenvergelijking ook de praktische keerzijde van elke keuze.",
  },
  {
    question: "Wat is het party-eiland van Thailand?",
    answer:
      "Koh Phangan is door de Full Moon Party op Haad Rin het bekendste party-eiland. Dat betekent niet dat het hele eiland iedere nacht feest. Buiten het evenement en buiten Haad Rin kan het ritme heel anders zijn. Controleer de officiële evenementdatum vóór je vervoer en verblijf boekt.",
  },
  {
    question: "Wat is leuker, Koh Phangan of Koh Samui?",
    answer:
      "Koh Phangan past beter wanneer een specifieke feestdatum of een kleinschaliger eilandritme je reis bepaalt. Koh Samui biedt meer verschillende kustplaatsen en voorzieningen, van levendig Chaweng tot rustiger Bophut. Kies eerst je week en gewenste avondritme, daarna pas het eiland.",
  },
  {
    question: "Wat zijn de alcoholregels in Thailand?",
    answer:
      "Sinds 29 mei 2026 geldt volgens de Tourism Authority of Thailand in het algemeen verkoop van 11:00 tot 24:00. De wettelijke minimumleeftijd is 20 jaar. Er zijn plaats-, vergunning- en datumgebonden uitzonderingen en beperkingen. Tempels, overheidskantoren, tankstations, openbare parken en delen van openbaar vervoer kennen beperkingen tenzij de wet iets anders toestaat. Controleer actuele regels op je bezoekdag.",
  },
  {
    question: "Is er een avondmarkt in Thailand?",
    answer:
      "Ja, veel steden en eilanden hebben avond- of nachtmarkten, maar dagen, locatie en formule wisselen. Een Thaise avondmarkt combineert vaak eten, winkelen en een sociale avondwandeling. Controleer de officiële of recente lokale agenda; ga niet uit van een jarenoude bloglijst.",
  },
  {
    question: "Wat is de populairste uitgaansstraat in Bangkok?",
    answer:
      "Khao San Road is internationaal een van de bekendste uitgaansstraten, terwijl Sukhumvit, RCA, Chinatown en Silom elk een ander avondtype bieden. “Populairst” zegt weinig over jouw beste keuze. De Bangkok-nightlifegids vergelijkt gebieden op sfeer, verplaatsing en zichtbaarheid van adult entertainment.",
  },
  {
    question: "Is Phuket een goede plek voor het nachtleven?",
    answer:
      "Ja, vooral als je de juiste kustplaats kiest. Patong en Bangla Road zijn het intensiefst. Kata, Karon, Kamala, Rawai en Phuket Old Town geven andere combinaties van diner, bars en rust. Boek je verblijf niet alleen op eilandnaam; de locatie bepaalt je avondroute.",
  },
  {
    question: "Wat moet je vermijden tijdens het uitgaan in Thailand?",
    answer:
      "Vermijd onduidelijke rekeningen, onbeheerde drankjes, illegale drugs, zelf rijden na alcohol, zwemmen wanneer je onder invloed bent en een terugrit die je pas met een bijna lege telefoon probeert te regelen. Houd paspoort en grote bedragen veilig in je verblijf en bel Tourist Police 1155 wanneer je hulp of vertaling nodig hebt.",
  },
];

const sources = [
  {
    title: "Alcohol sales and consumption rules updated in Thailand",
    creator: "Tourism Authority of Thailand · 29 mei 2026",
    url: "https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/",
    note: "Primaire toerismebron voor het algemene verkoopvenster 11:00–24:00, minimumleeftijd 20 en plaats- en vergunninggebonden beperkingen.",
  },
  {
    title: "Reisadvies Thailand",
    creator: "NederlandWereldwijd · gecontroleerd 26 juli 2026",
    url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
    note: "Actuele Nederlandse overheidsbron voor criminaliteit, zakkenrollerij, verkeers- en scooterrisico’s, drugsregels en noodvoorbereiding.",
  },
  {
    title: "Tourist Police Hotline 1155",
    creator: "Thailand Tourist Police Bureau",
    url: "https://www.touristpolice.go.th/en/main",
    note: "Officiële bron voor hulp en vertaling via de Tourist Police en hotline 1155.",
  },
  {
    title: "Official Full Moon Party",
    creator: "Haad Rin-evenementwebsite",
    url: "https://www.fullmoonpartythailand.com/",
    note: "Actuele evenementpagina voor locatie en eerstvolgende datum. Data worden niet vast in deze gids overgenomen omdat ze kunnen verschuiven.",
  },
  {
    title: "Safety at the Party",
    creator: "Official Full Moon Party",
    url: "https://www.fullmoonpartythailand.com/safety",
    note: "Evenementbron voor ontmoetingspunt, praktische schoenen, bewaakte drankjes, waardevolle spullen, water en zelf rijden.",
  },
];

function createSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      dateModified: "2026-07-26",
      inLanguage: "nl-NL",
      mainEntityOfPage: PAGE_URL,
      author: {
        "@type": "Organization",
        name: "Go2Thailand",
        url: "https://go2-thailand.com/",
      },
      publisher: {
        "@type": "Organization",
        name: "Go2Thailand",
        url: "https://go2-thailand.com/",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Thailand",
          item: "https://go2-thailand.com/nl/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Nachtleven",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Zo plan je een avond uit in Thailand",
      step: routeSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Acht bestemmingen voor nachtleven in Thailand",
      itemListElement: destinations.map((destination, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: destination.name,
        description: destination.bestFor,
        url: `https://go2-thailand.com/nl${destination.href}`,
      })),
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark"
    >
      {children}
    </Link>
  );
}

export function ThailandNightlifeGuide() {
  const subId = useSubId();
  const klookHref = withPlacementSubId(
    KLOOK_GENERIC,
    subId,
    "thailand-nightlife-evening-activities",
  );
  const schemas = createSchemas();

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        ogImage={`https://go2-thailand.com${HERO_IMAGE}`}
      >
        <meta
          name="keywords"
          content="thailand nightlife, nachtleven thailand, uitgaan thailand, beste uitgaanssteden thailand, full moon party thailand, nachtmarkt thailand"
        />
        <meta property="og:type" content="article" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => (
          <script
            key={`${schema["@type"]}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <main className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Thailand na zonsondergang"
          title={
            <>
              Kies je avond.
              <br />
              Dan pas je bestemming.
            </>
          }
          subtitle="Van een eerste hap op de markt tot dansen aan zee."
          description={
            <>
              Het nachtleven in Thailand is geen enkel product. Vergelijk acht
              bestemmingen op sfeer, schaal en terugroute — inclusief de plekken
              waar volwassen entertainment zichtbaar is en de alternatieven waar
              dat niet je avond bepaalt.
            </>
          }
          image={HERO_IMAGE}
          imageAlt="Redactioneel sfeerbeeld van volwassen reizigers aan een levendige avondmarkt langs de rivier in Bangkok"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Nachtleven" },
          ]}
          actions={[
            {
              label: "Vergelijk bestemmingen",
              href: "#bestemmingen",
              kind: "primary",
            },
            {
              label: "Plan je avondroute",
              href: "#avondroute",
              kind: "secondary",
            },
          ]}
          minHeightClassName="min-h-[900px] lg:min-h-[740px]"
          contentClassName="max-w-[760px]"
          titleClassName="max-w-[800px] text-[3.55rem] leading-[0.86] sm:text-[4.8rem] lg:text-[5.7rem]"
          subtitleClassName="max-w-[690px] text-[1.45rem] leading-[1.04] text-saffron-dark sm:text-[1.95rem]"
          imageClassName="object-cover object-[69%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.04)_0%,rgba(252,250,246,0.76)_50%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.92)_39%,rgba(5,36,32,0.13)_68%,rgba(5,27,24,0.03)_100%)]"
          sideCard={
            <div className="absolute bottom-8 right-[5vw] z-20 hidden w-[340px] overflow-hidden rounded-[26px] border border-white/65 bg-canvas/94 shadow-editorial-lift backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-6 py-5">
                <p className="eyebrow !mb-0">Avondpaspoort · juli 2026</p>
                <MoonStar size={19} className="text-jade" />
              </div>
              <div className="space-y-4 p-6 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Vergelijking</span>
                  <strong className="text-right text-jade">
                    8 avondbestemmingen
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Algemene verkoop</span>
                  <strong className="text-right text-jade">11:00–24:00</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Minimumleeftijd</span>
                  <strong className="text-right text-jade">20 jaar</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Hulp</span>
                  <strong className="text-right text-saffron-dark">
                    Tourist Police 1155
                  </strong>
                </div>
              </div>
            </div>
          }
        />

        <PageSectionNav items={sectionNav} />

        <section className="section-divider-bottom bg-canvas py-7">
          <div className="container-custom grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Sparkles,
                label: "Eerst kiezen",
                value: "Sfeer vóór venue",
              },
              { icon: MapPin, label: "Dan slapen", value: "Gebied vóór hotel" },
              {
                icon: Navigation,
                label: "Voor de eerste ronde",
                value: "Terugrit opslaan",
              },
              { icon: Phone, label: "Bij hulp", value: "Bel 1155" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 border-l border-jade/12 pl-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-jade/[0.06] text-jade">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                    {label}
                  </p>
                  <p className="mt-1 text-xs font-extrabold text-jade">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="kiezen"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid items-end gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <SectionHeading
                eyebrow="Niet één soort nachtleven"
                title={
                  <>
                    Begin met het ritme.
                    <br />
                    Niet met een toplijst.
                  </>
                }
                description="Een nachtmarkt, rooftop, live-set, club, beach bar en adult zone vragen elk om een andere wijk, starttijd, kleding en terugweg. De beste bestemming volgt pas daarna."
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
                <Image
                  src="/images/redesign/thailand-nightlife-moods.webp"
                  alt="Redactioneel sfeerbeeld van volwassen reizigers bij een rustige avondmaaltijd met live muziek aan het water"
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052b25]/72 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 sm:inset-x-7 sm:bottom-7">
                  {nightMoods.map((mood) => (
                    <span
                      key={mood.title}
                      className="rounded-full border border-white/25 bg-[#062f29]/72 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur"
                    >
                      {mood.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 divide-y divide-jade/10 border-y border-jade/10">
              {nightMoods.map(
                ({ icon: Icon, title, cue, fits, tradeoff }, index) => (
                  <article
                    key={title}
                    className="grid gap-5 py-7 sm:grid-cols-[54px_190px_1fr] lg:grid-cols-[64px_230px_1fr_1fr] lg:items-start"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-saffron/25 bg-saffron/[0.07] text-saffron-dark">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                        0{index + 1} · {cue}
                      </p>
                      <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-jade">
                        {title}
                      </h3>
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/45">
                        Past bij
                      </p>
                      <p className="mt-2 text-xs font-medium leading-6 text-charcoal/68">
                        {fits}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/45">
                        Praktische keerzijde
                      </p>
                      <p className="mt-2 text-xs font-medium leading-6 text-charcoal/68">
                        {tradeoff}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
            <p className="mt-7 max-w-3xl text-sm font-medium leading-7 text-charcoal/65">
              Wie vooral eten en proeven zoekt, begint bij de{" "}
              <InlineLink href="/drinks/">Thaise drankengids</InlineLink> en een
              nachtmarkt. Wie volwassen entertainment liever vermijdt, kiest
              gericht voor markt, rooftop, live muziek of een rustige
              kustplaats; je hoeft bekende neongebieden niet te bezoeken om
              Thailand na donker te ervaren.
            </p>
          </div>
        </section>

        <section
          id="bestemmingen"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow="Acht bestemmingen, acht afwegingen"
                  title="Waar je slaapt bepaalt hoe je avond eindigt."
                  description="Vergelijk niet alleen de grootste naam. Kijk naar sfeer, schaal en de afstand die overblijft wanneer je naar huis wilt."
                />
                <div className="mt-8 rounded-2xl border border-saffron/25 bg-saffron/[0.08] p-6">
                  <Hotel size={22} className="text-saffron-dark" />
                  <p className="mt-4 text-sm font-extrabold text-jade">
                    Hotelkeuze komt na de avondzone.
                  </p>
                  <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">
                    Gebruik daarna de hotelgids van je bestemming. Daar
                    vergelijken we wijken en staan de transparante
                    Trip.com-uitgangen op de logische plek in de funnel.
                  </p>
                </div>
              </div>
              <div className="divide-y divide-jade/10 border-y border-jade/10">
                {destinations.map((destination, index) => (
                  <article
                    key={destination.name}
                    className="group grid gap-4 py-7 sm:grid-cols-[54px_180px_1fr] lg:grid-cols-[54px_190px_1fr_170px]"
                  >
                    <span className="font-display text-2xl font-semibold text-saffron-dark">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                        {destination.label}
                      </p>
                      <h3 className="mt-2 font-display text-[1.85rem] font-semibold leading-none text-jade">
                        {destination.name}
                      </h3>
                      {destination.detailOwner ? (
                        <span className="mt-3 inline-flex rounded-full bg-jade/[0.06] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-jade">
                          Eigen nightlife-gids
                        </span>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-xs font-medium leading-6 text-charcoal/68">
                        {destination.bestFor}
                      </p>
                      <p className="mt-2 text-[11px] font-extrabold leading-5 text-jade">
                        {destination.rhythm}
                      </p>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/55">
                        Keerzijde: {destination.tradeoff}
                      </p>
                    </div>
                    <Link
                      href={destination.href}
                      className="inline-flex h-fit items-center gap-2 self-center text-xs font-extrabold text-jade transition hover:text-saffron-dark"
                    >
                      Bekijk {destination.name}{" "}
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="text-saffron transition group-hover:translate-x-1"
                      />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="avondroute"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
              <SectionHeading
                eyebrow="Eén avond, één hoofdlijn"
                title="Vier beslissingen vóór de straat het overneemt."
                description="Een sterke avond is niet de langste lijst met adressen. Hij heeft een klein gebied, een actuele check, een bekende terugweg en een groepsafspraak."
              />
              <div className="relative pt-2">
                <div className="absolute left-6 top-8 h-[calc(100%-4rem)] border-l-2 border-dashed border-saffron/55 lg:left-0 lg:right-0 lg:top-10 lg:h-0 lg:border-l-0 lg:border-t-2" />
                <div className="grid gap-4 lg:grid-cols-4">
                  {routeSteps.map(
                    ({ icon: Icon, title, label, text }, index) => (
                      <article
                        key={title}
                        className="relative ml-12 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card lg:ml-0 lg:mt-7"
                      >
                        <span className="absolute -left-[2.55rem] top-6 grid h-7 w-7 place-items-center rounded-full border-4 border-canvas bg-saffron text-[9px] font-black text-white lg:-top-[2.55rem] lg:left-5">
                          {index + 1}
                        </span>
                        <Icon
                          size={20}
                          className="text-jade"
                          aria-hidden="true"
                        />
                        <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                          {label}
                        </p>
                        <h3 className="mt-2 font-display text-[1.5rem] font-semibold leading-none text-jade">
                          {title}
                        </h3>
                        <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/62">
                          {text}
                        </p>
                      </article>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="mt-14 overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.84fr_1.16fr]">
                <div className="p-8 sm:p-11">
                  <p className="eyebrow !text-saffron-light">
                    De 90-seconden avondcheck
                  </p>
                  <h2 className="font-display text-[3.1rem] font-semibold leading-[0.89] tracking-[-0.035em]">
                    Een screenshot van vorig jaar is geen reservering.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/64">
                    Markten wisselen van dag, clubs rebranden en evenementen
                    kunnen verschuiven. Controleer vier signalen bij de bron die
                    de avond werkelijk uitvoert.
                  </p>
                </div>
                <div className="grid gap-px bg-white/[0.09] sm:grid-cols-2">
                  {[
                    {
                      icon: CalendarClock,
                      title: "Datum + agenda",
                      text: "Is de markt, show of het evenement juist op jouw datum actief?",
                    },
                    {
                      icon: MapPin,
                      title: "Exacte kaartpin",
                      text: "Klopt de locatie met de officiële contactpagina en je geplande ophaalpunt?",
                    },
                    {
                      icon: ReceiptText,
                      title: "Prijs + inclusies",
                      text: "Vraag naar entree, zitplek, minimum spend, service en wat een ticket wel of niet bevat.",
                    },
                    {
                      icon: Clock3,
                      title: "Laatste officiële update",
                      text: "Gebruik een venuepost of voucher van dezelfde dag voor tijd en toegangsregels.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <article key={title} className="bg-white/[0.055] p-7">
                      <Icon
                        size={21}
                        className="text-saffron-light"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 font-display text-[1.5rem] font-semibold">
                        {title}
                      </h3>
                      <p className="mt-3 text-[11px] leading-5 text-white/58">
                        {text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="regels"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Gecontroleerd op 26 juli 2026"
                title="Verkooptijd, openingstijd en vergunning zijn drie lagen."
                description="Een open zaak is geen bewijs dat iedere verkoop of activiteit op dat moment is toegestaan. Landelijke regels, lokale voorwaarden en de vergunning van de venue bestaan naast elkaar."
              />
              <a
                href="https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-jade"
              >
                Lees de officiële TAT-update{" "}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-jade/10 bg-jade/10 md:grid-cols-4">
              {[
                {
                  icon: Clock3,
                  value: "11:00–24:00",
                  title: "Algemene alcoholverkoop",
                  text: "Sinds 29 mei 2026 hoort ook 14:00–17:00 bij het reguliere toegestane tijdvak.",
                },
                {
                  icon: Users,
                  value: "20 jaar",
                  title: "Wettelijke minimumleeftijd",
                  text: "Een venue mag om legitimatie vragen en kan strengere toegangseisen hanteren.",
                },
                {
                  icon: Landmark,
                  value: "Plaatsgebonden",
                  title: "Openbare beperkingen",
                  text: "Onder meer tempels, overheid, tankstations, parken en transportgebieden kennen beperkingen tenzij wettelijk toegestaan.",
                },
                {
                  icon: CalendarClock,
                  value: "Check je datum",
                  title: "Tijdelijke regels",
                  text: "Verkiezingen, religieuze dagen en officiële besluiten kunnen verkoop of entertainment tijdelijk beperken.",
                },
              ].map(({ icon: Icon, value, title, text }) => (
                <article key={title} className="bg-white p-7">
                  <Icon
                    size={22}
                    className="text-saffron-dark"
                    aria-hidden="true"
                  />
                  <p className="mt-7 font-display text-[1.8rem] font-semibold text-jade">
                    {value}
                  </p>
                  <h3 className="mt-2 text-xs font-extrabold text-jade">
                    {title}
                  </h3>
                  <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/60">
                    {text}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-4xl text-xs font-medium leading-6 text-charcoal/58">
              Sommige gelicentieerde entertainmentvenues in aangewezen gebieden
              kunnen onder andere voorwaarden vallen. Dat maakt een uitzondering
              niet automatisch geldig voor iedere bar, winkel of straat.
              Controleer venue, vergunning, gebied en bezoekdatum opnieuw en
              volg aanwijzingen van personeel en lokale autoriteiten.
            </p>
          </div>
        </section>

        <section
          id="full-moon"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift lg:grid-cols-[0.78fr_1.22fr]">
              <div className="bg-[#082f29] p-8 text-white sm:p-11">
                <MoonStar
                  size={28}
                  className="text-saffron-light"
                  aria-hidden="true"
                />
                <p className="eyebrow mt-7 !text-saffron-light">
                  Koh Phangan · Haad Rin
                </p>
                <h2 className="font-display text-[3.45rem] font-semibold leading-[0.87] tracking-[-0.035em]">
                  Boek niet op de maan. Boek op de officiële datum.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/65">
                  De Full Moon Party is een specifieke evenementavond op Haad
                  Rin, geen beschrijving van heel Koh Phangan. Data kunnen
                  verschuiven. Controleer daarom de actuele organisatorpagina
                  vóór je vlucht, ferry of hotel vastzet.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://www.fullmoonpartythailand.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cream"
                  >
                    Controleer de actuele datum{" "}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                  <Link
                    href="/islands/koh-phangan/"
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/18 px-5 text-xs font-extrabold transition hover:border-saffron/45"
                  >
                    Bekijk Koh Phangan{" "}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-jade/10 p-7 sm:p-10">
                {[
                  {
                    number: "01",
                    title: "Plan verblijf en ferry samen",
                    text: "Rond grote evenementen veranderen beschikbaarheid, verkeersdruk en vervoersvraag. Vergelijk je slaapplaats met de werkelijke route naar Haad Rin, niet alleen met de eilandnaam.",
                  },
                  {
                    number: "02",
                    title: "Draag praktische schoenen",
                    text: "De officiële veiligheidsinformatie waarschuwt voor drukte en glas of rommel op het strand. Comfort en bescherming wegen zwaarder dan een perfecte outfit.",
                  },
                  {
                    number: "03",
                    title: "Kies een ontmoetingspunt",
                    text: "Haad Rin is op de evenementavond zeer druk. Spreek vóór aankomst een herkenbare plek en twee vaste checkmomenten af.",
                  },
                  {
                    number: "04",
                    title: "Water is geen afterparty",
                    text: "Ga niet zwemmen wanneer je alcohol hebt gedronken. Houd je drankje in zicht en rijd liever niet zelf terug.",
                  },
                ].map((item) => (
                  <article
                    key={item.number}
                    className="grid gap-3 py-6 sm:grid-cols-[52px_190px_1fr]"
                  >
                    <span className="font-display text-2xl font-semibold text-saffron-dark">
                      {item.number}
                    </span>
                    <h3 className="text-sm font-extrabold text-jade">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium leading-6 text-charcoal/63">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="veilig"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="relative min-h-[500px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <Image
                src="/images/redesign/thailand-nightlife-return.webp"
                alt="Redactioneel sfeerbeeld van twee volwassen reizigers die bij een verlichte hotelingang hun terugrit controleren"
                fill
                sizes="100vw"
                className="object-cover object-[69%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,31,27,0.97)_0%,rgba(3,31,27,0.82)_40%,rgba(3,31,27,0.1)_76%)]" />
              <div className="relative z-10 flex min-h-[500px] max-w-[690px] flex-col justify-center p-8 text-white sm:p-12">
                <p className="eyebrow !text-saffron-light">
                  Je laatste keuze maak je als eerste
                </p>
                <h2 className="font-display text-[3.35rem] font-semibold leading-[0.87] tracking-[-0.035em] sm:text-[4.2rem]">
                  Je terugrit hoort bij je avondplan.
                </h2>
                <p className="mt-5 max-w-[590px] text-sm font-medium leading-7 text-white/68">
                  Bewaar hotelnaam in het Thais, kaartpin, ophaalpunt en Tourist
                  Police 1155 voordat je vertrekt. Controleer voertuig en
                  bestemming bij instappen. Na alcohol rijd je niet zelf op een
                  scooter of motor.
                </p>
                <Link
                  href="/practical-info/scams-safety/"
                  className="btn-cream mt-7 w-fit"
                >
                  Bekijk scams & veiligheid{" "}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="grid gap-px overflow-hidden rounded-[26px] border border-jade/10 bg-jade/10 sm:grid-cols-2">
                {[
                  {
                    icon: ReceiptText,
                    title: "Rekening",
                    text: "Lees prijzen en voorwaarden vóór bestelling. Houd de rekening per ronde bij en bespreek een fout rustig voordat hij groeit.",
                  },
                  {
                    icon: GlassWater,
                    title: "Drankje",
                    text: "Houd je glas in zicht, accepteer niets onduidelijks en laat groepsgenoten weten wanneer je van locatie wisselt.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Waardevolle spullen",
                    text: "Neem geen paspoort of grote bedragen mee naar een drukke avond. Draag telefoon en portemonnee aan de voorkant.",
                  },
                  {
                    icon: Phone,
                    title: "Hulp",
                    text: "Ga naar een verlichte plek en vraag venue- of hotelpersoneel om hulp. Tourist Police 1155 biedt ondersteuning en vertaling.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <article key={title} className="bg-white p-7">
                    <Icon size={21} className="text-jade" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
              <aside className="flex flex-col rounded-[26px] bg-[#082f29] p-7 text-white shadow-editorial-lift sm:p-9">
                <Zap
                  size={25}
                  className="text-saffron-light"
                  aria-hidden="true"
                />
                <p className="eyebrow mt-7 !text-saffron-light">
                  Functionele avondkit
                </p>
                <h2 className="font-display text-[2.55rem] font-semibold leading-[0.9]">
                  Reserve-energie voor route en boeking.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/62">
                  Een compacte powerbank helpt je telefoon bereikbaar te houden
                  voor navigatie en een geboekte terugrit. Hij vervangt geen
                  offline adres, groepsafspraak of nuchtere vervoerskeuze.
                </p>
                <a
                  href="/go/anker-powercore-10k/"
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="mt-7 inline-flex min-h-12 items-center justify-between rounded-xl border border-white/16 bg-white/[0.08] px-5 text-xs font-extrabold transition hover:border-saffron/45 hover:bg-white/[0.11]"
                >
                  Bekijk een compacte powerbank{" "}
                  <ExternalLink
                    size={15}
                    className="text-saffron-light"
                    aria-hidden="true"
                  />
                </a>
                <AffiliateDisclosure className="mt-4 !text-white/54">
                  Amazon-affiliatelink via onze centrale OneLink-route. Als
                  Amazon-partner verdienen wij aan in aanmerking komende
                  aankopen, zonder extra kosten voor jou. Product,
                  luchtvaartregels, prijs, verkoper en lokale beschikbaarheid
                  kunnen verschillen.
                </AffiliateDisclosure>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
                <div className="p-8 sm:p-11">
                  <p className="eyebrow !text-saffron-light">
                    Pas na je sfeerkeuze
                  </p>
                  <h2 className="font-display text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.035em]">
                    Vergelijk een avondactiviteit met een vaste start.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/64">
                    Een foodtour, show, cruise of andere georganiseerde avond
                    kan een heldere locatie en duur geven. De Klook-link opent
                    het actuele Thailand-aanbod; een specifiek product of
                    tijdslot is niet gegarandeerd.
                  </p>
                  <a
                    href={klookHref}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="btn-cream mt-7"
                  >
                    Bekijk actuele avondactiviteiten{" "}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                  <AffiliateDisclosure className="mt-4 !text-white/54">
                    Klook-affiliatelink. Controleer aanbieder, datum,
                    ontmoetingspunt, leeftijdsregel, inbegrepen onderdelen,
                    transfer en annulering vóór betaling.
                  </AffiliateDisclosure>
                </div>
                <div className="grid gap-px bg-white/[0.09] sm:grid-cols-2">
                  {[
                    {
                      icon: Ticket,
                      title: "Exact product",
                      text: "Een algemene zoekpagina bevat verschillende tours, shows, locaties en tickettypes.",
                    },
                    {
                      icon: MapPinned,
                      title: "Start + einde",
                      text: "Zet beide pins naast je hotel en de geplande terugrit.",
                    },
                    {
                      icon: Users,
                      title: "Leeftijd + setting",
                      text: "Controleer of de activiteit past bij je groep en gewenste sfeer.",
                    },
                    {
                      icon: Check,
                      title: "Voorwaarden",
                      text: "Lees inclusies, dresscode, weersbeleid en annulering opnieuw in de checkout.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <article key={title} className="bg-white/[0.055] p-7">
                      <Icon
                        size={21}
                        className="text-saffron-light"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 font-display text-[1.5rem] font-semibold">
                        {title}
                      </h3>
                      <p className="mt-3 text-[11px] leading-5 text-white/58">
                        {text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-7 text-sm font-medium leading-7 text-charcoal/62">
              Kies eerst je stad en avondzone. Vergelijk daarna een verblijf via
              de eigen hotelgidsen voor{" "}
              <InlineLink href="/best-hotels/bangkok/">Bangkok</InlineLink>,{" "}
              <InlineLink href="/best-hotels/phuket/">Phuket</InlineLink>,{" "}
              <InlineLink href="/best-hotels/pattaya/">Pattaya</InlineLink> of{" "}
              <InlineLink href="/best-hotels/chiang-mai/">
                Chiang Mai
              </InlineLink>
              . Daar worden de wijkkeuze en Trip.com-affiliatelinks transparant
              bij elkaar gebracht.
            </p>
          </div>
        </section>

        <FaqSplitSection
          id="vragen"
          eyebrow="Echte vragen uit de Nederlandse SERP"
          title="Veelgestelde vragen over nachtleven in Thailand"
          description="De vragen zijn op 25 juli 2026 via DataForSEO vastgelegd. De antwoorden scheiden bestemmingskeuze, evenementdatum, landelijke regels en praktische veiligheid; vluchtige clubrankings en vaste prijzen zijn bewust weggelaten."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Kies daarna je detailniveau"
          title="Vier gidsen voor je volgende beslissing"
          guides={[
            {
              title: "Bangkok nightlife",
              description:
                "Vergelijk wijken, avondtypes en verplaatsing in de stad met de grootste keuze.",
              href: "/nightlife/bangkok/",
              image: "/images/redesign/bangkok-destination-hero.webp",
            },
            {
              title: "Pattaya nightlife",
              description:
                "Kies Walking Street, Soi Buakhao, Jomtien of een geplande avond met duidelijke grenzen.",
              href: "/nightlife/pattaya/",
              image: "/images/redesign/pattaya-nightlife-hero.webp",
            },
            {
              title: "Phuket nightlife",
              description:
                "Zie waarom Patong, Kata, Karon, Kamala en Old Town elk een ander avondplan vragen.",
              href: "/nightlife/phuket/",
              image: "/images/redesign/phuket-destination-hero-v2.webp",
            },
          ]}
          sideLink={{
            label: "Avondactiviteiten via Klook",
            href: klookHref,
            affiliate: true,
          }}
          disclosure="Klook is een affiliatepartner. Een eventuele commissie verandert jouw prijs niet; controleer altijd het actuele product en de voorwaarden."
        />

        <SourceMethodSection
          title="Een actuele regel weegt zwaarder dan een oude clubranglijst"
          description="DataForSEO bepaalde de Nederlandse bestemming-, nightlife-, uitgaan-, Full Moon-, nachtmarkt- en veiligheidsintentie en legde echte PAA vast. Officiële TAT-, Tourist Police- en NederlandWereldwijd-bronnen dragen de tijdgevoelige regels en veiligheidsgrenzen. De evenementwebsite wordt alleen gebruikt voor datumcontrole en praktische eventinformatie. Vaste prijzen, onbewezen populariteitsclaims, universele sluitingstijden en vluchtige venue-rankings zijn verwijderd. Laatst gecontroleerd: 26 juli 2026."
          sources={sources}
        />
      </main>
    </>
  );
}
