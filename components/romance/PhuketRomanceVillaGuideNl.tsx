import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Heart,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  Waves,
} from "lucide-react";
import Link from "next/link";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";
import { withSubId } from "../../lib/affiliates";

export type PhuketRomanceVillaOwner =
  | "wedding-hub"
  | "wedding-beach"
  | "wedding-packages"
  | "wedding-villa"
  | "honeymoon-hub"
  | "honeymoon-pool"
  | "honeymoon-inclusive"
  | "villa-hub"
  | "villa-private-pool"
  | "villa-oceanfront"
  | "villa-family"
  | "private-pool-search";

type Config = {
  path: string;
  family: "wedding" | "honeymoon" | "villa";
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  description: string;
  decision: string;
  decisionCopy: string;
  checks: string[];
  faqs: { question: string; answer: string }[];
};

const priceAnswer =
  "Tarieven veranderen per datum, bezetting, verblijfsduur, belastingen en voorwaarden. Vergelijk dezelfde kamercategorie en bekijk de actuele totaalprijs bij de aanbieder.";

const CONFIG: Record<PhuketRomanceVillaOwner, Config> = {
  "wedding-hub": {
    path: "/phuket-wedding-venues/",
    family: "wedding",
    eyebrow: "Van droombeeld naar uitvoerbaar plan",
    title: "Trouwen op Phuket.",
    accent: "Kies eerst het juiste type locatie.",
    subtitle:
      "Strand, resort of villa: de praktische verschillen zijn groter dan de foto laat zien.",
    description:
      "Vergelijk trouwlocaties op privacy, regenplan, gastenlogistiek, leveranciersregels en juridische route. Vraag daarna pas een actuele offerte aan.",
    decision: "Begin bij gasten en regenplan, niet bij het uitzicht",
    decisionCopy:
      "Een mooie locatie kan alsnog onpraktisch zijn wanneer vervoer, geluid, toegankelijkheid of een volwaardig overdekt alternatief ontbreken. Leg must-haves vast voordat je aanbieders benadert.",
    checks: [
      "Ceremonie en volwaardig regenplan",
      "Capaciteit en gastenlogistiek",
      "Leveranciers- en geluidsregels",
      "Symbolisch of juridisch huwelijk",
    ],
    faqs: [
      {
        question: "Kun je als Nederlander op Phuket trouwen?",
        answer:
          "Een ceremonie en een juridisch huwelijk zijn niet hetzelfde. Controleer actuele document- en registratie-eisen bij de Nederlandse overheid en bevoegde Thaise instanties voordat je contracten tekent.",
      },
      {
        question: "Wat kost trouwen op Phuket?",
        answer:
          "Er bestaat geen betrouwbaar vast bedrag. Locatiehuur, minimale besteding, gasten, techniek, decor, transfers, belastingen en externe leveranciers bepalen de actuele offerte.",
      },
      {
        question: "Wanneer boek je een trouwlocatie?",
        answer:
          "Vraag beschikbaarheid zodra datum, gastenrange en locatietype duidelijk zijn. Boek pas na controle van aanbetaling, annulering, weerscenario en wat exclusief is.",
      },
    ],
  },
  "wedding-beach": {
    path: "/phuket-wedding-venues/beach/",
    family: "wedding",
    eyebrow: "Zand tussen je tenen, plan B op papier",
    title: "Een strandbruiloft op Phuket.",
    accent: "Mooi én uitvoerbaar.",
    subtitle:
      "Privacy, getij, hitte en regen bepalen of het strand echt werkt.",
    description:
      "Kies een strandlocatie op toegangscontrole, schaduw, geluidsregels, mobiliteit en een gelijkwaardig overdekt alternatief.",
    decision: "Vraag wat ‘aan het strand’ precies betekent",
    decisionCopy:
      "Beachfront, beach access en een ceremonie op het zand zijn verschillende dingen. Laat de exacte plek, looproute, exclusiviteit en verplaatsing bij slecht weer schriftelijk bevestigen.",
    checks: [
      "Exacte ceremonieplek",
      "Privacy en publieke toegang",
      "Getij, hitte en schaduw",
      "Gelijkwaardig regenalternatief",
    ],
    faqs: [
      {
        question: "Zijn stranden op Phuket privé?",
        answer:
          "Ga niet uit van volledige exclusiviteit. Vraag hoe toegang, afzetting en privacy praktisch worden geregeld en welke lokale regels gelden.",
      },
      {
        question: "Wat gebeurt er bij regen?",
        answer:
          "Controleer wie beslist over verplaatsing, op welk moment, naar welke ruimte en of decor, capaciteit en zicht daar gelijkwaardig blijven.",
      },
      {
        question: "Wat kost een strandbruiloft op Phuket?",
        answer: priceAnswer,
      },
    ],
  },
  "wedding-packages": {
    path: "/phuket-wedding-venues/resort-packages/",
    family: "wedding",
    eyebrow: "Vergelijk inhoud, niet alleen pakketnamen",
    title: "Trouwarrangementen op Phuket.",
    accent: "Wat zit er werkelijk in?",
    subtitle:
      "Een pakket maakt vergelijken makkelijker, maar de uitsluitingen bepalen het budget.",
    description:
      "Vergelijk resortpakketten op locatie, minimale besteding, leveranciers, techniek, belastingen, coördinatie en weerscenario.",
    decision: "Maak van iedere offerte dezelfde checklist",
    decisionCopy:
      "Zet locatiehuur, eten en drinken, techniek, styling, fotografie, vervoer, belastingen en overuren in één overzicht. Alleen dan vergelijk je pakketten eerlijk.",
    checks: [
      "Minimum spend en belastingen",
      "Interne of externe leveranciers",
      "Coördinatie op de dag",
      "Overuren en annuleringsvoorwaarden",
    ],
    faqs: [
      {
        question: "Wat zit in een Phuket wedding package?",
        answer:
          "Dat verschilt per resort. Vraag een gespecificeerde offerte met inclusies, uitsluitingen, belastingen, minimale besteding en voorwaarden.",
      },
      {
        question: "Mag je eigen leveranciers meenemen?",
        answer:
          "Sommige locaties rekenen externe-leverancierskosten of werken met een voorkeurslijst. Laat dit bevestigen vóór je fotograaf, stylist of entertainment boekt.",
      },
      {
        question: "Regelt een resort ook de juridische registratie?",
        answer:
          "Neem dat nooit automatisch aan. Vraag afzonderlijk wat ceremonieel, administratief en juridisch wordt ondersteund en verifieer eisen bij officiële instanties.",
      },
    ],
  },
  "wedding-villa": {
    path: "/phuket-wedding-venues/villa/",
    family: "wedding",
    eyebrow: "Meer privacy, meer eigen regie",
    title: "Trouwen in een privévilla op Phuket.",
    accent: "Controleer evenementtoestemming.",
    subtitle:
      "Een vakantieverblijf is niet automatisch een toegestane eventlocatie.",
    description:
      "Vergelijk villa’s op eventbeleid, capaciteit, buurt- en geluidsregels, personeel, catering, veiligheid en slechtweerplan.",
    decision: "Laat de villa een bruiloft schriftelijk toestaan",
    decisionCopy:
      "Controleer evenementfee, maximale bezetting, bezoekers, muziek, eindtijd, leveranciers, parkeren en waarborg. Een gewone boekingsbevestiging is onvoldoende.",
    checks: [
      "Schriftelijke eventtoestemming",
      "Dag- en nachtbezetting",
      "Catering, keuken en personeel",
      "Geluid, vervoer en veiligheid",
    ],
    faqs: [
      {
        question: "Kun je elke villa huren voor een bruiloft?",
        answer:
          "Nee. Vraag expliciete eventtoestemming en alle extra voorwaarden vóór je boekt.",
      },
      {
        question: "Kunnen alle gasten in de villa slapen?",
        answer:
          "Controleer afzonderlijk de toegestane slaapcapaciteit en dagbezetting. Bezoekers tijdens het evenement tellen niet automatisch als verblijvende gasten.",
      },
      {
        question: "Is een villa goedkoper dan een resort?",
        answer:
          "Niet noodzakelijk. Eventfee, personeel, catering, techniek, vervoer en tijdelijke voorzieningen kunnen de totaalprijs sterk veranderen.",
      },
    ],
  },
  "honeymoon-hub": {
    path: "/phuket-honeymoon/",
    family: "honeymoon",
    eyebrow: "Tijd voor twee, zonder verkeerde aannames",
    title: "Honeymoon op Phuket.",
    accent: "Kies sfeer én ligging.",
    subtitle:
      "Romantisch is persoonlijk: privacy, strand, restaurants en rust moeten bij jullie passen.",
    description:
      "Vergelijk honeymoonverblijven op locatie, echte privacy, kamer- of villatype, transfers, maaltijdformule en annuleringsvoorwaarden.",
    decision: "Kies eerst hoe jullie de dagen willen beleven",
    decisionCopy:
      "Een afgelegen poolvilla geeft privacy maar vraagt meer vervoer; een strandresort maakt uitstapjes en diners soms eenvoudiger. Kies op dagritme, niet op het label honeymoon.",
    checks: [
      "Rust of levendige omgeving",
      "Eigen zwembad of gedeelde faciliteiten",
      "Restaurants en vervoer",
      "Kamerbelofte en honeymoonvoorwaarden",
    ],
    faqs: [
      {
        question: "Is Phuket geschikt voor een huwelijksreis?",
        answer:
          "Ja wanneer jullie gewenste mix van strand, privacy, restaurants en uitstapjes bij de gekozen kustzone past. Phuket verschilt sterk per gebied.",
      },
      {
        question: "Welke kant van Phuket past bij honeymooners?",
        answer:
          "Dat hangt af van rust en mobiliteit. Vergelijk de westkustzones en zuidelijke gebieden op strand, verkeer, avondleven en afstand tot activiteiten.",
      },
      { question: "Wat kost een honeymoon op Phuket?", answer: priceAnswer },
    ],
  },
  "honeymoon-pool": {
    path: "/phuket-honeymoon/private-pool-villas/",
    family: "honeymoon",
    eyebrow: "Privacy moet je kunnen controleren",
    title: "Poolvilla’s voor een honeymoon op Phuket.",
    accent: "Echt privé, niet alleen eigen.",
    subtitle: "Uitzicht, inkijk en villatype bepalen het gevoel ter plaatse.",
    description:
      "Vergelijk honeymoon-poolvilla’s op exclusief gebruik, inkijk, ligging, zwembadtoegang, ontbijt, vervoer en kamergarantie.",
    decision: "Controleer privacy vanuit zwembad én slaapkamer",
    decisionCopy:
      "Vraag naar exacte villacategorie, zichtlijnen, aangrenzende units en buitenruimte. Een plunge pool kan exclusief zijn zonder beschut of ruim te zijn.",
    checks: [
      "Exclusief zwembadgebruik",
      "Inkijk en aangrenzende units",
      "Exacte villacategorie",
      "Ontbijt, roomservice en vervoer",
    ],
    faqs: [
      {
        question: "Is een private pool villa volledig privé?",
        answer:
          "Niet altijd. Private kan exclusief gebruik betekenen terwijl buren, paden of hogere gebouwen zicht hebben. Controleer foto’s en vraag naar zichtlijnen.",
      },
      {
        question: "Krijg je altijd de villa van de foto?",
        answer:
          "Boek de exacte categorie en controleer of foto’s representatief zijn voor iedere unit. Vraag hoe een eventuele vervanging wordt behandeld.",
      },
      { question: "Wat kost een honeymoon-poolvilla?", answer: priceAnswer },
    ],
  },
  "honeymoon-inclusive": {
    path: "/phuket-honeymoon/all-inclusive/",
    family: "honeymoon",
    eyebrow: "All-inclusive is geen vaste definitie",
    title: "All-inclusive honeymoon op Phuket.",
    accent: "Lees de maaltijdformule.",
    subtitle: "Volpension, resort credit en all-inclusive zijn niet hetzelfde.",
    description:
      "Vergelijk arrangementen op maaltijden, drank, restaurants, tijden, toeslagen, transfers, spa- of activiteitencredits en uitsluitingen.",
    decision: "Laat iedere inclusie concreet benoemen",
    decisionCopy:
      "Controleer à-la-carterestaurants, alcohol, minibar, roomservice, speciale diners en credits. Reken daarna of flexibiliteit of een pakket beter bij jullie dagritme past.",
    checks: [
      "Maaltijden en deelnemende restaurants",
      "Dranken, minibar en roomservice",
      "Credits en vervaldatum",
      "Toeslagen en uitgesloten momenten",
    ],
    faqs: [
      {
        question: "Zijn er all-inclusive resorts op Phuket?",
        answer:
          "Aanbiedingen en definities wisselen. Controleer bij iedere actuele optie exact welke maaltijden, dranken, restaurants en tijden inbegrepen zijn.",
      },
      {
        question: "Is volpension hetzelfde als all-inclusive?",
        answer:
          "Nee. Volpension omvat doorgaans maaltijden; dranken en extra’s kunnen apart zijn. Alleen de actuele voorwaarden zijn beslissend.",
      },
      {
        question: "Is all-inclusive voordelig voor een honeymoon?",
        answer:
          "Dat hangt af van hoeveel tijd jullie in het resort doorbrengen en wat werkelijk inbegrepen is. Vergelijk de totaalprijs met een flexibel verblijf.",
      },
    ],
  },
  "villa-hub": {
    path: "/phuket-luxury-villas/",
    family: "villa",
    eyebrow: "Luxe zit in de uitvoering",
    title: "Luxe villa’s op Phuket.",
    accent: "Vergelijk ruimte, service en ligging.",
    subtitle:
      "Een fotogeniek zwembad zegt weinig over personeel, toegang of totale voorwaarden.",
    description:
      "Kies een luxe villa op locatie, slaapkamers, service, chefkosten, privacy, toegankelijkheid, veiligheid en contractvoorwaarden.",
    decision: "Bepaal welke service jullie werkelijk nodig hebben",
    decisionCopy:
      "Een staffed villa kan een manager, huishouding of chef hebben, maar taken en uren verschillen. Vraag wat inbegrepen, op afroep en apart afgerekend is.",
    checks: [
      "Exact aantal bruikbare slaapkamers",
      "Personeel en service-uren",
      "Maaltijden en boodschappenbeleid",
      "Ligging, toegang en vervoer",
    ],
    faqs: [
      {
        question: "Wat is inbegrepen bij een luxe villa op Phuket?",
        answer:
          "Dat verschilt per accommodatie. Controleer personeel, ontbijt, chef, boodschappen, transfers, schoonmaak, belastingen, borg en elektriciteit.",
      },
      {
        question: "Waar liggen luxe villa’s op Phuket?",
        answer:
          "Het aanbod ligt verspreid over kustzones en heuvels. Vergelijk uitzicht en privacy met strandtoegang, hellingen, verkeer en afstand tot restaurants.",
      },
      { question: "Wat kost een luxe villa op Phuket?", answer: priceAnswer },
    ],
  },
  "villa-private-pool": {
    path: "/phuket-luxury-villas/private-pool/",
    family: "villa",
    eyebrow: "Exclusief gebruik is pas het begin",
    title: "Luxe villa’s met privézwembad op Phuket.",
    accent: "Controleer zwembad en buitenruimte.",
    subtitle:
      "Formaat, diepte, zon, veiligheid en inkijk verschillen per villa.",
    description:
      "Vergelijk luxe poolvilla’s op exclusief gebruik, zwembadveiligheid, schaduw, buitenruimte, zichtlijnen, onderhoud en exacte unit.",
    decision: "Vraag meer dan alleen ‘is het zwembad privé?’",
    decisionCopy:
      "Controleer afmetingen, diepte, kindveiligheid, toegang vanuit kamers, zonuren, onderhoudsmomenten en zicht van personeel of buren.",
    checks: [
      "Exclusief gebruik en zichtlijnen",
      "Diepte en kindveiligheid",
      "Zon, schaduw en buitenruimte",
      "Onderhoud en exacte unit",
    ],
    faqs: [
      {
        question: "Wat betekent private pool bij een villa?",
        answer:
          "Meestal exclusief gebruik door jouw boeking, maar niet automatisch volledige visuele privacy. Controleer de accommodatievoorwaarden.",
      },
      {
        question: "Zijn privézwembaden kindveilig?",
        answer:
          "Neem dat niet aan. Vraag naar hekwerk, alarm, diepte, antislip, toezicht en toegang vanuit slaapkamers.",
      },
      { question: "Wat kost een luxe poolvilla?", answer: priceAnswer },
    ],
  },
  "villa-oceanfront": {
    path: "/phuket-luxury-villas/oceanfront/",
    family: "villa",
    eyebrow: "Zeezicht is niet hetzelfde als strandtoegang",
    title: "Oceanfront villa’s op Phuket.",
    accent: "Lees de ligging precies.",
    subtitle:
      "Klif, rotskust en beachfront leveren een totaal andere vakantie op.",
    description:
      "Vergelijk oceanfront villa’s op daadwerkelijke positie, veilige toegang tot zee of strand, trappen, uitzicht, wind, golven en vervoer.",
    decision: "Scheid oceanfront, ocean view en beachfront",
    decisionCopy:
      "Vraag een kaart, actuele buitenfoto’s en de looproute. Direct aan zee kan een rotskust of hoge klif betekenen zonder zwembare toegang.",
    checks: [
      "Exacte positie op kaart",
      "Strand- of zeetoegang",
      "Trappen en mobiliteit",
      "Wind, golven en weersinvloed",
    ],
    faqs: [
      {
        question: "Is oceanfront hetzelfde als beachfront?",
        answer:
          "Nee. Oceanfront betekent aan de zeezijde; beachfront suggereert directe ligging aan een strand. Controleer de fysieke toegang altijd afzonderlijk.",
      },
      {
        question: "Hebben oceanfront villa’s altijd zonsondergang?",
        answer:
          "Nee. Oriëntatie, seizoen, terrein en omliggende bebouwing bepalen het zicht. Vraag naar de exacte ligging van de unit.",
      },
      { question: "Wat kost een oceanfront villa?", answer: priceAnswer },
    ],
  },
  "villa-family": {
    path: "/phuket-luxury-villas/family/",
    family: "villa",
    eyebrow: "Ruimte voor iedereen, veiligheid voorop",
    title: "Familievilla’s op Phuket.",
    accent: "Slaapkamers tellen is niet genoeg.",
    subtitle:
      "Indeling, zwembadveiligheid en gezamenlijke ruimte maken het verschil.",
    description:
      "Vergelijk familievilla’s op echte bedindeling, badkamers, trappen, zwembadbeveiliging, keuken, personeel, kinderfaciliteiten en vervoer.",
    decision: "Teken de slaapindeling vóór je boekt",
    decisionCopy:
      "Controleer per kamer bedtype, toegang, badkamer en verbinding met de hoofdvilla. Losse paviljoens kunnen prachtig zijn maar minder geschikt voor jonge kinderen.",
    checks: [
      "Bedindeling per kamer",
      "Verbonden of losse paviljoens",
      "Zwembad- en trapveiligheid",
      "Keuken, was en gezamenlijke ruimte",
    ],
    faqs: [
      {
        question: "Waar let je op bij een villa met kinderen?",
        answer:
          "Controleer zwembadbarrières, trappen, balkonspijlen, slaapkamerverbindingen, nachtroute, kinderbedden en bereikbaarheid van medische hulp.",
      },
      {
        question: "Is het aantal gasten gelijk aan echte bedden?",
        answer:
          "Niet altijd. Capaciteit kan slaapbanken of extra bedden omvatten. Vraag een kamer-voor-kamer indeling.",
      },
      {
        question: "Is villapersoneel ook kinderopvang?",
        answer:
          "Nee, tenzij professionele opvang expliciet is geregeld. Verwar huishouding of villa-management niet met toezicht op kinderen.",
      },
    ],
  },
  "private-pool-search": {
    path: "/private-pool-villa-phuket/",
    family: "villa",
    eyebrow: "Zoekintentie: verblijf met eigen zwembad",
    title: "Een private pool villa op Phuket vinden.",
    accent: "Filter daarna op wat privé betekent.",
    subtitle:
      "Deze owner helpt zoeken; de luxe-owner vergelijkt het hogere servicesegment.",
    description:
      "Vind een verblijf met eigen zwembad en controleer exclusief gebruik, inkijk, unitcategorie, locatie, belastingen, borg en annuleringsvoorwaarden.",
    decision: "Gebruik filters als startpunt, niet als bewijs",
    decisionCopy:
      "Open de accommodatiepagina en verifieer dat jouw exacte kamertype een eigen zwembad heeft. Controleer foto’s, zichtlijnen, voorwaarden en recente gasteninformatie vóór betalen.",
    checks: [
      "Exact kamertype met eigen zwembad",
      "Exclusief gebruik en inkijk",
      "Totaalprijs, borg en belastingen",
      "Locatie en werkelijk vervoer",
    ],
    faqs: [
      {
        question: "Hoe vind je een villa met privézwembad op Phuket?",
        answer:
          "Gebruik een accommodatie-filter en controleer vervolgens op de detailpagina het exacte kamertype, exclusief gebruik, foto’s en voorwaarden.",
      },
      {
        question: "Is een pool access room een private pool villa?",
        answer:
          "Meestal niet. Pool access kan toegang tot een gedeeld zwembad betekenen. Zoek expliciet naar een zwembad dat uitsluitend bij jouw unit hoort.",
      },
      {
        question: "Wat kost een private pool villa op Phuket?",
        answer: priceAnswer,
      },
    ],
  },
};

const familyHref = {
  wedding: "/phuket-wedding-venues/",
  honeymoon: "/phuket-honeymoon/",
  villa: "/phuket-luxury-villas/",
};
const familyLabel = {
  wedding: "Trouwen op Phuket",
  honeymoon: "Honeymoon op Phuket",
  villa: "Luxe villa’s op Phuket",
};

export default function PhuketRomanceVillaGuideNl({
  owner,
  primaryUrl,
  secondaryUrl,
}: {
  owner: PhuketRomanceVillaOwner;
  primaryUrl: string;
  secondaryUrl: string;
}) {
  const c = CONFIG[owner];
  const canonical = `https://go2-thailand.com/nl${c.path}`;
  const primary = withSubId(
    primaryUrl,
    `phuket-romance-villa-${owner}-nl-primary`,
  );
  const secondary = withSubId(
    secondaryUrl,
    `phuket-romance-villa-${owner}-nl-secondary`,
  );
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: c.title,
      description: c.description,
      url: canonical,
      inLanguage: "nl-NL",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
  const isWedding = c.family === "wedding";
  return (
    <>
      <SEOHead
        title={`${c.title} Onafhankelijke keuzehulp`}
        description={c.description}
      >
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="nl" href={canonical} />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://go2-thailand.com${c.path}`}
        />
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>
      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/phuket-romance-villa-hero-v2.webp"
          imageAlt="Rustige luxe villa met infinity pool aan de kust van Phuket"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: familyLabel[c.family], href: familyHref[c.family] },
            { label: c.title },
          ]}
          eyebrow={c.eyebrow}
          title={
            <>
              {c.title}
              <br />
              <span className="text-saffron-dark">{c.accent}</span>
            </>
          }
          subtitle={c.subtitle}
          description={c.description}
          actions={[
            { label: "Doe de verblijfscheck", href: "#keuze", kind: "primary" },
            {
              label: isWedding
                ? "Vraag actuele opties op"
                : "Bekijk actuele verblijven",
              href: primary,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De externe optieknop is een affiliate-link. Wij kunnen commissie ontvangen zonder extra kosten voor jou. Beschikbaarheid, totaalprijs, inclusies en voorwaarden staan uitsluitend bij de aanbieder."
          titleClassName="max-w-[850px] text-[3rem] leading-[0.91] sm:text-[4.15rem] lg:text-[4.85rem]"
        />
        <PageSectionNav
          label="Op deze pagina"
          items={[
            { href: "#keuze", label: "Wat past?", icon: Heart },
            { href: "#controle", label: "Controlelijst", icon: ClipboardCheck },
            { href: "#voorwaarden", label: "Voorwaarden", icon: ShieldCheck },
            {
              href: "#vergelijken",
              label: "Actuele opties",
              icon: CalendarCheck,
            },
            { href: "#vragen", label: "Vragen", icon: Sparkles },
          ]}
        />
        <section
          id="keuze"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-9 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">De beslisvraag</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-jade lg:text-5xl">
                {c.decision}
              </h2>
              <p className="mt-5 leading-8 text-muted">{c.decisionCopy}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  MapPin,
                  "Ligging",
                  "Bekijk omgeving, toegang en dagelijks vervoer.",
                ],
                [
                  Users,
                  "Voor wie",
                  "Controleer bezetting, privacy en toegankelijkheid.",
                ],
                [
                  WalletCards,
                  "Totaalprijs",
                  "Vergelijk belastingen, borg, toeslagen en voorwaarden.",
                ],
                [
                  BedDouble,
                  "Exact product",
                  "Boek het kamertype, de villa of locatie die je hebt gecontroleerd.",
                ],
              ].map(([Icon, title, text], i) => {
                const I = Icon as typeof Home;
                return (
                  <article
                    key={String(title)}
                    className={`rounded-[1.25rem] border border-jade/10 p-5 ${i === 0 ? "bg-jade text-ivory" : "bg-white"}`}
                  >
                    <I className={i === 0 ? "text-saffron" : "text-jade"} />
                    <h3 className="mt-4 font-display text-2xl">
                      {String(title)}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-6 ${i === 0 ? "text-ivory/75" : "text-muted"}`}
                    >
                      {String(text)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="controle"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Vóór een aanbetaling"
              title={
                <>
                  Vier ownerchecks.
                  <br />
                  Eén schriftelijk dossier.
                </>
              }
              description="Bewaar offerte, inclusies, exacte categorie, totaalprijs en wijzigingsvoorwaarden bij elkaar."
            />
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {c.checks.map((x, i) => (
                <article
                  key={x}
                  className="rounded-[1.25rem] border border-jade/10 bg-white p-5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-xs font-bold text-jade">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-jade">{x}</h3>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Exacte datum en bezetting",
                "Alle belastingen en toeslagen",
                "Aanbetaling en betaalmomenten",
                "Annulering en no-show",
                "Wijziging of vervangende categorie",
                "Bereikbaarheid en transfers",
                "Dieet, mobiliteit en veiligheid",
                "Schriftelijke speciale afspraken",
              ].map((x) => (
                <div
                  key={x}
                  className="flex gap-2 rounded-xl bg-sand px-4 py-3 text-sm font-semibold text-jade"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-saffron"
                  />
                  {x}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="voorwaarden"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Geen verrassingen na betalen"
                title="Laat woorden meetbaar maken"
                description="‘Privé’, ‘all-inclusive’, ‘beachfront’ en ‘wedding package’ hebben geen universele inhoud."
              />
              <ul className="mt-7 grid gap-4">
                {[
                  "Vraag wat exact inbegrepen en uitgesloten is",
                  "Controleer of foto’s bij jouw geboekte categorie horen",
                  "Laat uitzonderingen en mondelinge beloftes schriftelijk bevestigen",
                  "Hercontroleer actuele voorwaarden op de laatste boekingsstap",
                ].map((x) => (
                  <li
                    key={x}
                    className="flex gap-3 text-sm leading-7 text-jade"
                  >
                    <ShieldCheck
                      size={19}
                      className="mt-1 shrink-0 text-saffron"
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:p-9">
              <Waves className="text-saffron" />
              <h3 className="mt-5 font-display text-3xl">
                Weerplan zonder verkooppraat
              </h3>
              <p className="mt-3 leading-7 text-ivory/75">
                Phuket blijft tropisch en veranderlijk. Vraag welke onderdelen
                buiten plaatsvinden, wie beslist over aanpassing en welk
                gelijkwaardig alternatief contractueel geldt.
              </p>
            </aside>
          </div>
        </section>
        <section
          id="vergelijken"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Na de keuzehulp"
              title={
                isWedding
                  ? "Vraag actuele beschikbaarheid en voorwaarden op"
                  : "Vergelijk dezelfde categorie bij actuele aanbieders"
              }
              description="Open dezelfde datum en bezetting; vergelijk pas na controle van de laatste boekingsstap."
            />
            <div className="mt-8 grid gap-3 lg:grid-cols-2">
              <a
                href={primary}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center justify-between rounded-xl bg-jade px-5 py-4 text-sm font-bold text-white"
              >
                {isWedding
                  ? "Bekijk trouw- en verblijfsopties"
                  : "Bekijk actuele prijs via Trip.com"}
                <ExternalLink size={17} className="text-saffron" />
              </a>
              <a
                href={secondary}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center justify-between rounded-xl border border-jade/15 bg-white px-5 py-4 text-sm font-bold text-jade"
              >
                {isWedding
                  ? "Vergelijk romantische ervaringen"
                  : "Vergelijk een tweede aanbieder"}
                <ExternalLink size={17} className="text-saffron" />
              </a>
            </div>
            <AffiliateDisclosure
              className="mt-5"
              text="Dit zijn affiliate-links uit onze centrale partnerconfiguratie. Een mogelijke commissie verandert jouw prijs niet. Wij publiceren geen vluchtige prijs als redactioneel feit en rangschikken geen optie op commissie."
            />
          </div>
        </section>
        {owner.endsWith("-hub") ? (
          <section className="section-divider-bottom py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading eyebrow="Volledige keuzefamilie" title="Vergelijk het concrete verblijf- of locatietype" description="De woorden villa, pakket en beachfront zeggen pas iets wanneer ligging, exclusiviteit, inclusies en voorwaarden ook zijn gecontroleerd." />
              <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {(Object.entries(CONFIG) as [PhuketRomanceVillaOwner, Config][]).filter(([key, item]) => item.family === c.family && key !== owner).map(([key, item], index) => (
                  <Link key={key} href={item.path} className="group flex min-h-28 items-center gap-4 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card transition hover:-translate-y-0.5 hover:border-saffron/45">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-tonal text-xs font-extrabold text-saffron-dark">{String(index + 1).padStart(2, "0")}</span>
                    <span><strong className="block font-display text-xl font-semibold leading-none text-jade">{item.title.replace(/\.$/, "")}</strong><small className="mt-2 block text-[10px] font-bold leading-4 text-charcoal/52">{item.eyebrow}</small></span>
                    <ArrowRight size={14} className="ml-auto shrink-0 text-saffron-dark transition group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        <FaqSplitSection
          id="vragen"
          eyebrow="Voor je vastlegt"
          title={`${c.title} Veelgestelde vragen`}
          items={c.faqs}
        />
        <section className="section-divider-top py-14">
          <div className="container-custom">
            <div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:flex lg:items-center lg:justify-between lg:p-9">
              <div>
                <p className="eyebrow text-saffron">Verder plannen</p>
                <h2 className="mt-2 font-display text-3xl">
                  Combineer verblijf, vervoer en Phuket-planning
                </h2>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 lg:mt-0">
                <Link
                  href={familyHref[c.family]}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  {familyLabel[c.family]}
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
                <Link
                  href="/best-hotels/phuket/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  Waar verblijven?
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
                <Link
                  href="/car-rental-phuket/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  Vervoer op Phuket
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <SourceMethodSection
          title="Bronnen en werkwijze"
          description="Zoekintentie en zichtbare Nederlandse resultaten zijn gecontroleerd op 31 juli 2026. Veranderlijke prijzen, beschikbaarheid en pakketinhoud blijven bij de aanbieder. Voor een juridisch huwelijk verwijzen we naar actuele Nederlandse en bevoegde Thaise overheidsinformatie; commerciële listings zijn geen juridische bron."
          sources={[
            {
              label: "NederlandWereldwijd — trouwen in Thailand",
              href: "https://www.nederlandwereldwijd.nl/trouwen/buitenland/thailand",
            },
            {
              label: "Tourism Authority of Thailand — Phuket",
              href: "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350",
            },
          ]}
        />
      </div>
    </>
  );
}
