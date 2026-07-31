import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Compass,
  ExternalLink,
  HeartHandshake,
  LifeBuoy,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Users,
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

export type PhuketTourOwner =
  | "hub"
  | "big-buddha"
  | "elephant-sanctuary"
  | "cooking-class"
  | "snorkeling"
  | "old-town"
  | "phi-phi-day-trip"
  | "maya-bay"
  | "phi-phi-snorkeling"
  | "phi-phi-sunset"
  | "phi-phi-speedboat"
  | "khai-islands"
  | "bamboo-island";
type TourConfig = {
  path: string;
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  description: string;
  focus: string;
  focusCopy: string;
  image: string;
  alt: string;
  checks: string[];
  faqs: { question: string; answer: string }[];
};

const sharedPrice =
  "Prijzen veranderen per datum, groepsgrootte, vervoer, parkfees en voorwaarden. Vergelijk dezelfde inclusies en bekijk de actuele totaalprijs bij de aanbieder.";
const CONFIG: Record<PhuketTourOwner, TourConfig> = {
  hub: {
    path: "/phuket-tours/",
    eyebrow: "Kies de dag die bij je reis past",
    title: "Tours op Phuket.",
    accent: "Van cultuur tot eilanddag.",
    subtitle: "Niet de populairste tour, maar de juiste tour voor jou.",
    description:
      "Zeecomfort, mobiliteit, dierenwelzijn, reistijd en weer bepalen welke Phuket-tour echt bij je past. Gebruik deze keuzehulp vóór je actuele opties vergelijkt.",
    focus: "Begin bij energie, niet bij de bestseller",
    focusCopy:
      "Een eilanddag vraagt een vroege start en veel vervoer; Old Town of een kookles houdt de dag compacter. Kies eerst hoeveel zee, zon, lopen en groepsprogramma je wilt.",
    image: "/images/redesign/phuket-attractions-hero.webp",
    alt: "Uitzicht over de tropische kust en eilanden rond Phuket",
    checks: [
      "Duur en echte ophaalzone",
      "Zee, hitte en mobiliteit",
      "Groepsgrootte en voertaal",
      "Parkfees en annuleringsregels",
    ],
    faqs: [
      {
        question: "Welke Phuket-tour kies je voor een eerste reis?",
        answer:
          "Kies op interesse en belastbaarheid. Een Phi Phi-dagtocht is iconisch maar lang; Old Town, een kookles of een tempelroute kan beter passen bij een rustigere dag.",
      },
      { question: "Wat kosten tours op Phuket?", answer: sharedPrice },
      {
        question: "Hoe ver vooraf boek je?",
        answer:
          "Er bestaat geen universele termijn. Controleer actuele capaciteit en annuleringsvoorwaarden; reserveer zodra datum, uitvoering en voorwaarden samen passen.",
      },
    ],
  },
  "big-buddha": {
    path: "/phuket-tours/big-buddha/",
    eyebrow: "Controleer toegang vóór vertrek",
    title: "Big Buddha bezoeken vanaf Phuket.",
    accent: "Status eerst, tour daarna.",
    subtitle: "Een landmark is geen garantie dat de toegangsweg open is.",
    description:
      "Controleer voor je datum de actuele toegang tot Phuket Big Buddha. Vergelijk daarna pas vervoer, tempelstops, kledingregels en route-alternatief.",
    focus: "Maak de openstellingsstatus onderdeel van je boeking",
    focusCopy:
      "Zichtbare Google-vragen gaan vooral over heropening, bezoekbaarheid en entree. Vraag de operator wat er gebeurt wanneer Big Buddha niet toegankelijk is en welke vervangende stop geldt.",
    image: "/images/cities/phuket/attractions/Big Buddha Phuket.webp",
    alt: "Phuket Big Buddha op de heuvel boven het eiland",
    checks: [
      "Actuele toegang en wegstatus",
      "Respectvolle schouders/knieën-bedekking",
      "Alternatief bij sluiting",
      "Exacte hotelophaalzone",
    ],
    faqs: [
      {
        question: "Is Big Buddha Phuket open?",
        answer:
          "Dit is veranderlijke lokale informatie. Controleer op je bezoekdag de officiële/lokale status en laat een touroperator schriftelijk bevestigen welk alternatief geldt bij sluiting.",
      },
      {
        question: "Kun je Big Buddha nog bezoeken?",
        answer:
          "Alleen wanneer terrein en toegangsweg officieel toegankelijk zijn. Een boekbare listing is op zichzelf geen openstellingsbewijs.",
      },
      {
        question: "Is Big Buddha Phuket de moeite waard?",
        answer:
          "Dat hangt af van actuele toegang, je interesse in religieuze plekken en de rest van de route. Behandel het als een respectvolle tempelstop, niet alleen als fotopunt.",
      },
    ],
  },
  "elephant-sanctuary": {
    path: "/phuket-tours/elephant-sanctuary/",
    eyebrow: "Dierenwelzijn vóór de selfie",
    title: "Een olifantenopvang op Phuket kiezen.",
    accent: "Kijken, niet aanraken.",
    subtitle: "‘Sanctuary’ in de naam bewijst geen goed welzijn.",
    description:
      "Kies een observation-led ervaring waar olifanten ruimte en autonomie houden. Vermijd rijden, baden, shows en onbeschermd direct contact.",
    focus: "Laat het programma bewijzen dat welzijn vooropstaat",
    focusCopy:
      "World Animal Protection adviseert locaties waar bezoekers kijken in plaats van aanraken. Controleer gedrag, ruimte, groepsopzet en of baby’s of shows als toeristische trekker worden gebruikt.",
    image: "/images/redesign/phuket-attraction-elephants.webp",
    alt: "Olifanten op afstand in een groene omgeving op Phuket",
    checks: [
      "Geen rijden, baden of shows",
      "Observatie op veilige afstand",
      "Geen onbeschermd voeren/aanraken",
      "Duidelijke welzijns- en noodprocedure",
    ],
    faqs: [
      {
        question: "Welke olifantenopvang op Phuket is verantwoord?",
        answer:
          "Gebruik actuele onafhankelijke welzijnscriteria. World Animal Protection noemt observation-led locaties zonder rijden, baden, shows of onbeschermd aanraken als richting.",
      },
      {
        question: "Is olifanten wassen ethisch?",
        answer:
          "World Animal Protection beschouwt direct wassen en aanraken niet als elephant-friendly. Kies een ervaring die natuurlijk gedrag op afstand observeert.",
      },
      {
        question: "Waarom is olifanten rijden schadelijk?",
        answer:
          "Rijden en shows vragen controle en training die het welzijn en natuurlijke gedrag van olifanten aantasten. Kies geen programma dat dit aanbiedt.",
      },
    ],
  },
  "cooking-class": {
    path: "/phuket-tours/cooking-class/",
    eyebrow: "Kies wat je werkelijk zelf kookt",
    title: "Een kookcursus op Phuket kiezen.",
    accent: "Van markt tot eigen wok.",
    subtitle: "Menu, allergenen en hands-on tijd maken het verschil.",
    description:
      "Vergelijk een demonstratie met een echte hands-on les. Controleer menu, marktbezoek, dieetwensen, groepsgrootte, transfer en wat je mee naar huis krijgt.",
    focus: "Het menu is maar één helft van de les",
    focusCopy:
      "Vraag hoeveel gerechten je zelf bereidt, of deelnemers een eigen werkplek hebben en hoe allergenen en dieetwensen worden behandeld. Een marktbezoek kan leerzaam zijn, maar kost ook lestijd.",
    image: "/images/redesign/mee-hokkien-phuket-wok-hero.webp",
    alt: "Thaise ingrediënten en wok tijdens een kookles op Phuket",
    checks: [
      "Zelf koken of vooral kijken",
      "Menu en vervangende ingrediënten",
      "Allergenen en dieetwensen",
      "Marktbezoek, transfer en recepten",
    ],
    faqs: [
      {
        question: "Wat kook je tijdens een Phuket-kookcursus?",
        answer:
          "Dat verschilt per les. Controleer het exacte menu, hoeveel gerechten je zelf maakt en of aanpassingen voor dieet of allergenen mogelijk zijn.",
      },
      {
        question: "Is een marktbezoek inbegrepen?",
        answer:
          "Alleen wanneer dit op de actuele productpagina staat. Controleer duur, ontmoetingsplek en hoeveel effectieve kooktijd overblijft.",
      },
      { question: "Wat kost een kookcursus op Phuket?", answer: sharedPrice },
    ],
  },
  snorkeling: {
    path: "/phuket-tours/snorkeling/",
    eyebrow: "Kies water dat bij je niveau past",
    title: "Snorkelen vanaf Phuket.",
    accent: "Bestemming, boot en begeleiding.",
    subtitle: "Helder water is geen veiligheidsplan.",
    description:
      "Vergelijk snorkeltours op zwemniveau, begeleiding, bootcomfort, uitrusting, zeecondities en koraalregels. Phi Phi-specifieke snorkelintentie blijft een aparte owner.",
    focus: "Een goede snorkeltour begint boven water",
    focusCopy:
      "Vraag naar instapmethode, reddingsvesten, schaduw, gidsratio en alternatief bij ruwe zee. Raak of voer wildlife niet en sta nooit op koraal.",
    image: "/images/cities/phuket/attractions/Phi Phi Islands.webp",
    alt: "Helder tropisch water bij de eilanden rond Phuket",
    checks: [
      "Zwemniveau en drijfhulpmiddel",
      "Bootinstap en schaduw",
      "Gids, briefing en noodplan",
      "Geen koraal/wildlife aanraken of voeren",
    ],
    faqs: [
      {
        question: "Waar kun je snorkelen vanaf Phuket?",
        answer:
          "Tours gaan naar verschillende eilanden en riffen. Kies op actuele zeecondities, reistijd, zwemniveau en de exacte stops van het product.",
      },
      {
        question: "Kun je snorkelen als beginnende zwemmer?",
        answer:
          "Alleen met passende begeleiding en drijfmiddel, en wanneer de operator het niveau accepteert. Meld je ervaring vooraf en sla een stop over wanneer omstandigheden niet goed voelen.",
      },
      {
        question: "Zijn snorkelspullen inbegrepen?",
        answer:
          "Controleer de actuele inclusies en maten. Vraag ook naar masker, snorkel, vinnen, reddingsvest en eventuele vervangingskosten.",
      },
    ],
  },
  "old-town": {
    path: "/phuket-tours/old-town/",
    eyebrow: "Lees de gevels, niet alleen de fotostops",
    title: "Wandelen door Phuket Old Town.",
    accent: "Met gids of op eigen tempo?",
    subtitle: "Erfgoed, eten en gemeenschap liggen dicht bij elkaar.",
    description:
      "Een begeleide wandeling voegt context toe aan Sino-Europese gevels, Peranakan-cultuur en lokaal eten. Vergelijk route, groep, hitte, toegankelijkheid en inbegrepen proeverijen.",
    focus: "Een compacte wijk kan toch een rijke tour zijn",
    focusCopy:
      "Tourism Authority of Thailand benadrukt de gemengde culturele geschiedenis en lokale gemeenschap. Kies een gids wanneer verhalen en toegang belangrijker zijn dan alleen de route volgen.",
    image: "/images/redesign/phuket-old-town-walk-hero-v2.webp",
    alt: "Historische kleurrijke gevels in Phuket Old Town",
    checks: [
      "Route, duur en schaduwpauzes",
      "Lokale gids en voertaal",
      "Proeverijen en allergenen",
      "Trapjes, hitte en mobiliteit",
    ],
    faqs: [
      {
        question: "Kun je Phuket Old Town zelf wandelen?",
        answer:
          "Ja, de kern is compact. Een gids is vooral waardevol voor erfgoedcontext, lokale verhalen, musea en gerichte proeverijen.",
      },
      {
        question: "Wanneer wandel je het prettigst?",
        answer:
          "Kies een tijd die bij hitte, regen en openingstijden past. Controleer de actuele starttijd van je tour en neem water en zon-/regenbescherming mee.",
      },
      {
        question: "Wat zie je tijdens een Old Town-tour?",
        answer:
          "Dat verschilt per route. Controleer straten, musea, markten, gebedshuizen en proeverijen op de actuele productpagina.",
      },
    ],
  },
  "phi-phi-day-trip": {
    path: "/phuket-tours/phi-phi-day-trip/",
    eyebrow: "Vergelijk de hele dag, niet één baai",
    title: "Een Phi Phi-dagtocht vanaf Phuket.",
    accent: "Boot, stops en terugkeer.",
    subtitle: "Een dagproduct is meer dan vervoer naar Phi Phi.",
    description:
      "Vergelijk speedboot, catamaran en andere dagprogramma’s op ophaalzone, zitcomfort, stops, parkfees, lunch, zeecondities en terugkeerbuffer.",
    focus: "Kies een dagritme dat je volhoudt",
    focusCopy:
      "Een vroeg programma kan drukte anders verdelen; een grotere boot kan meer comfort of juist meer deelnemers betekenen. Controleer het echte programma en behandel geen stop als garantie.",
    image: "/images/redesign/koh-phi-phi-island-hero-nl.webp",
    alt: "De baaien en kalksteenrotsen van de Phi Phi-eilanden",
    checks: [
      "Boottype, zitplaats en schaduw",
      "Werkelijke stops en zwemmogelijkheden",
      "Parkfees, eten en hoteltransfer",
      "Weerswijziging en terugkeerbuffer",
    ],
    faqs: [
      {
        question: "Is een Phi Phi-dagtocht vanaf Phuket de moeite waard?",
        answer:
          "Ja wanneer je een lange dag en bootreis prettig vindt en het programma bij je verwachtingen past. Overnachten is rustiger wanneer je ook Phi Phi Don wilt ervaren.",
      },
      {
        question: "Welke boot kies je naar Phi Phi?",
        answer:
          "Vergelijk comfort, groepsgrootte, instap, schaduw en programma. Vaartijden zijn afhankelijk van vertrekpunt, boot en zee en worden niet gegarandeerd.",
      },
      {
        question: "Zijn parkfees inbegrepen?",
        answer:
          "Niet altijd. Controleer vóór betalen welke toegangskosten per bestemming wel of niet in de totaalprijs staan.",
      },
    ],
  },
  "maya-bay": {
    path: "/phuket-tours/maya-bay/",
    eyebrow: "Een beschermd park, geen zwemgarantie",
    title: "Maya Bay bezoeken vanaf Phuket.",
    accent: "Controleer parkstatus en regels.",
    subtitle: "Toegang is georganiseerd rond ecologisch herstel.",
    description:
      "Vergelijk Maya Bay-tours op actuele parktoegang, landingsroute, tijdslot, parkfees en alternatieve stops. TAT meldt dat zwemmen in Maya Bay verboden blijft.",
    focus: "Bezoek de baai zoals het park dat vandaag toestaat",
    focusCopy:
      "Zichtbare PAA draait om toegang, sluiting, prijs en vaartijd. Gebruik actuele parkstatus; een oude kalender of listing is geen garantie. Respecteer looproutes en zwemverbod.",
    image: "/images/redesign/koh-phi-phi-island-hero-nl.webp",
    alt: "Maya Bay tussen kalkstenen kliffen op Phi Phi Leh",
    checks: [
      "Actuele park- en seizoensstatus",
      "Toegang via aangewezen route",
      "Geen zwemmen waar verboden",
      "Parkfees en alternatief bij sluiting",
    ],
    faqs: [
      {
        question: "Kun je Maya Bay bezoeken vanuit Phuket?",
        answer:
          "Er zijn dagproducten, maar toegang hangt af van actuele parkstatus en regels. Controleer dit bij DNP/TAT en je operator voor de bezoekdatum.",
      },
      {
        question: "Waarom sluit Maya Bay soms?",
        answer:
          "Tijdelijke sluitingen en bezoekersmaatregelen ondersteunen ecologisch herstel en veiligheid. Data kunnen veranderen; actuele parkmededelingen zijn leidend.",
      },
      {
        question: "Kun je zwemmen in Maya Bay?",
        answer:
          "TAT meldt dat zwemmen in Maya Bay verboden blijft om het ecosysteem te beschermen. Volg altijd de actuele aanwijzingen van parkmedewerkers.",
      },
    ],
  },
  "phi-phi-snorkeling": {
    path: "/phuket-tours/phi-phi-snorkeling/",
    eyebrow: "Onderwaterkwaliteit boven vinkjes verzamelen",
    title: "Snorkelen rond Phi Phi.",
    accent: "Kies begeleiding en zeecomfort.",
    subtitle: "Niet elke Phi Phi-stop is een snorkelstop.",
    description:
      "Vergelijk tours op echte snorkellocaties, watertijd, zwemniveau, gids, uitrusting en ecologische regels. Een druk highlightsprogramma kan minder snorkeltijd geven.",
    focus: "Is Phi Phi-snorkelen de hype waard?",
    focusCopy:
      "Dat hangt af van zicht, zee, groepsgrootte en gekozen plekken. Vraag hoeveel begeleide watertijd het actuele programma bevat en wat het alternatief is bij ongunstige omstandigheden.",
    image: "/images/cities/phuket/attractions/Phi Phi Islands.webp",
    alt: "Snorkelwater tussen de Phi Phi-eilanden",
    checks: [
      "Echte snorkelstops en watertijd",
      "Gidsratio en zwemniveau",
      "Masker, vinnen en drijfhulpmiddel",
      "Koraal- en wildliferegels",
    ],
    faqs: [
      {
        question: "Is snorkelen bij Phi Phi de hype waard?",
        answer:
          "Het kan prachtig zijn, maar zicht en ervaring wisselen met plek, weer, drukte en groep. Kies op begeleide watertijd en actuele omstandigheden.",
      },
      {
        question: "Raak je koraal of vissen aan?",
        answer:
          "Nee. Thaise mariene beschermingsregels zijn aangescherpt; raak of voer wildlife niet en sta nooit op koraal.",
      },
      {
        question: "Is snorkelen onderdeel van iedere Phi Phi-tour?",
        answer:
          "Niet in dezelfde mate. Controleer hoeveel stops en effectieve watertijd het specifieke product vermeldt.",
      },
    ],
  },
  "phi-phi-sunset": {
    path: "/phuket-tours/phi-phi-sunset/",
    eyebrow: "Later licht vraagt een ander logistiek plan",
    title: "Een Phi Phi-sunsettour.",
    accent: "Route heen, transfer terug.",
    subtitle: "Zonsondergang is een moment, geen gegarandeerd decor.",
    description:
      "Vergelijk sunsettours op starttijd, route, terugvaart in het donker, verlichting, hoteltransfer en alternatief bij bewolking of ruwe zee.",
    focus: "Plan vooral wat er ná zonsondergang gebeurt",
    focusCopy:
      "Controleer terugkeerhaven, verwachte aankomstband, verlichting en laatste hoteltransfer. Laat ‘sunset’ niet impliceren dat weer of uitzicht gegarandeerd is.",
    image: "/images/islands/koh-phi-phi.webp",
    alt: "Warm avondlicht boven de Phi Phi-eilanden",
    checks: [
      "Terugkeerhaven en hoteltransfer",
      "Bootverlichting en veiligheidsbriefing",
      "Route vóór het donker",
      "Weersalternatief zonder sunsetgarantie",
    ],
    faqs: [
      {
        question: "Zie je gegarandeerd zonsondergang?",
        answer:
          "Nee. Bewolking, regen en routewijzigingen kunnen het uitzicht veranderen. Boek het programma, niet een gegarandeerde lucht.",
      },
      {
        question: "Hoe kom je na afloop terug bij je hotel?",
        answer:
          "Controleer welke transferzone en verwachte terugkeertijd op de actuele voucher staan, vooral buiten de belangrijkste strandplaatsen.",
      },
      {
        question: "Is een sunsettour geschikt voor kinderen?",
        answer:
          "Dat hangt af van leeftijdsbeleid, late terugkeer, bootcomfort en zee. Controleer de voorwaarden van het exacte product.",
      },
    ],
  },
  "phi-phi-speedboat": {
    path: "/phuket-tours/phi-phi-speedboat/",
    eyebrow: "Snel is niet hetzelfde als comfortabel",
    title: "Met een speedboot naar Phi Phi.",
    accent: "Controleer zitplaats en zee.",
    subtitle: "Het boottype bepaalt een groot deel van je dag.",
    description:
      "Vergelijk speedboottours op stoelopstelling, schaduw, instap, groepsgrootte, veiligheidsbriefing en beleid bij ruwe zee. Een voorbeeldboot is geen voertuiggarantie.",
    focus: "Past een speedboot bij jouw lichaam en reisgroep?",
    focusCopy:
      "Zichtbare communityvragen gaan veel over comfort en vooraf boeken. Meld zwangerschap, rug-/nekklachten of beperkte mobiliteit en volg de medische/operationele uitsluitingen van de aanbieder.",
    image: "/images/redesign/koh-phi-phi-island-hero-nl.webp",
    alt: "Een bootroute tussen Phuket en de Phi Phi-eilanden",
    checks: [
      "Zitopstelling, schaduw en toilet",
      "Instap en mobiliteitsvereisten",
      "Medische uitsluitingen",
      "Annulering bij onveilige zee",
    ],
    faqs: [
      {
        question: "Is de speedboot naar Phi Phi erg hobbelig?",
        answer:
          "Dat kan bij golfslag. Comfort verschilt per boot, zitplaats en zee. Controleer medische uitsluitingen en kies een ander boottype als schokken een probleem zijn.",
      },
      {
        question: "Moet je vooraf boeken?",
        answer:
          "Capaciteit wisselt per datum. Boek zodra product en voorwaarden passen, maar gebruik een duidelijke annuleringsregeling.",
      },
      {
        question: "Hoe lang vaart een speedboot naar Phi Phi?",
        answer:
          "Vertrekpunt, route, boot en zee bepalen de duur. Gebruik de actuele productplanning als indicatie, niet als garantie.",
      },
    ],
  },
  "khai-islands": {
    path: "/phuket-tours/khai-islands/",
    eyebrow: "Een compactere eilanddag dicht bij Phuket",
    title: "Een Khai Islands-tour vanaf Phuket.",
    accent: "Zwemmen, snorkelen of strand?",
    subtitle: "Kleine eilanden vragen heldere verwachtingen.",
    description:
      "Vergelijk halve en hele dagprogramma’s op echte snorkeltijd, schaduw, strandvoorzieningen, groepsgrootte en wildlife-regels.",
    focus: "Khai is meer strandstop dan expeditie",
    focusCopy:
      "Controleer welke Khai-eilanden worden bezocht en hoeveel tijd voor snorkelen versus strand overblijft. Voer geen vissen en raak geen koraal aan.",
    image: "/images/cities/phuket/attractions/Phi Phi Islands.webp",
    alt: "Kleine tropische eilanden en helder water bij Phuket",
    checks: [
      "Halve of hele dag",
      "Snorkeltijd versus strandtijd",
      "Schaduw en voorzieningen",
      "Geen vissen voeren of koraal aanraken",
    ],
    faqs: [
      {
        question: "Is Khai Islands geschikt voor een halve dag?",
        answer:
          "Veel producten zijn compacter, maar controleer transfer- en bootduur tegenover effectieve eilandtijd.",
      },
      {
        question: "Kun je goed snorkelen bij Khai?",
        answer:
          "Dat wisselt met plek, zee, drukte en zicht. Kies op actuele begeleide snorkelstops, niet alleen op strandfoto’s.",
      },
      {
        question: "Mag je vissen voeren?",
        answer:
          "Nee. Voer wildlife niet en volg de actuele park- en crewregels voor bescherming van het ecosysteem.",
      },
    ],
  },
  "bamboo-island": {
    path: "/phuket-tours/bamboo-island/",
    eyebrow: "Stop binnen Phi Phi of doel op zichzelf",
    title: "Bamboo Island bezoeken.",
    accent: "Lees de route vóór je boekt.",
    subtitle: "De naam in een titel bewijst geen lange stop.",
    description:
      "Bamboo Island verschijnt vaak als stop binnen een Phi Phi-programma. Controleer landingsstatus, effectieve tijd, snorkelplan, parkfees en alternatief bij routewijziging.",
    focus: "Bepaal hoeveel Bamboo Island je werkelijk krijgt",
    focusCopy:
      "Vergelijk een brede Phi Phi-highlightsdag met een programma dat meer tijd rond Bamboo Island reserveert. Vraag of de stop landing, zwemmen, snorkelen of alleen passeren betekent.",
    image: "/images/redesign/koh-phi-phi-island-hero-nl.webp",
    alt: "Wit strand en helder water bij Bamboo Island",
    checks: [
      "Landing, snorkelen of panoramastop",
      "Effectieve tijd op locatie",
      "Parkfee en actuele toegang",
      "Alternatief bij routewijziging",
    ],
    faqs: [
      {
        question: "Ligt Bamboo Island bij Phi Phi?",
        answer:
          "Bamboo Island maakt deel uit van de bredere Phi Phi-archipel/parkcontext en verschijnt vaak in dagprogramma’s. Controleer de actuele route.",
      },
      {
        question: "Is Bamboo Island altijd inbegrepen?",
        answer:
          "Nee. Zelfs wanneer het genoemd wordt, kunnen zee, parkregels en operationele keuzes de stop wijzigen.",
      },
      {
        question: "Zijn parkfees inbegrepen?",
        answer:
          "Controleer dit per product en per bestemming vóór betalen; ga niet uit van een algemene bundelregel.",
      },
    ],
  },
};

export default function PhuketTourGuideNl({
  owner,
  primaryUrl,
  secondaryUrl,
  tertiaryUrl,
}: {
  owner: PhuketTourOwner;
  primaryUrl: string;
  secondaryUrl: string;
  tertiaryUrl: string;
}) {
  const c = CONFIG[owner],
    canonical = `https://go2-thailand.com/nl${c.path}`,
    primary = withSubId(primaryUrl, `phuket-tour-${owner}-nl-klook`),
    secondary = withSubId(secondaryUrl, `phuket-tour-${owner}-nl-gyg`),
    tertiary = withSubId(tertiaryUrl, `phuket-tour-${owner}-nl-viator`);
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
  return (
    <>
      <SEOHead
        title={`${c.title} Keuzehulp en actuele opties`}
        description={c.description}
      >
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="nl" href={canonical} />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://go2-thailand.com${c.path}`}
        />
        {schemas.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </SEOHead>
      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image={c.image}
          imageAlt={c.alt}
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Phuket tours", href: "/phuket-tours/" },
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
            { label: "Doe de tourcheck", href: "#keuze", kind: "primary" },
            {
              label: "Bekijk actuele opties",
              href: primary,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De externe optieknop is een affiliate-link. Wij kunnen commissie ontvangen zonder extra kosten voor jou. Actuele uitvoering, prijs, inclusies en voorwaarden staan uitsluitend bij de aanbieder."
          titleClassName="max-w-[800px] text-[3.15rem] leading-[0.9] sm:text-[4.35rem] lg:text-[5rem]"
        />
        <PageSectionNav
          label="Op deze pagina"
          items={[
            { href: "#keuze", label: "Past deze tour?", icon: Compass },
            { href: "#controle", label: "Tourcheck", icon: ClipboardCheck },
            { href: "#veilig", label: "Veilig & bewust", icon: ShieldCheck },
            { href: "#boeken", label: "Actuele opties", icon: TicketCheck },
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
                {c.focus}
              </h2>
              <p className="mt-5 leading-8 text-muted">{c.focusCopy}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  Clock3,
                  "Tijd en energie",
                  "Tel hoteltransfer, wachten en terugkeer mee.",
                ],
                [
                  Users,
                  "Groep en begeleiding",
                  "Controleer capaciteit, voertaal en gidsratio.",
                ],
                [
                  Route,
                  "Programma en alternatief",
                  "Stops zijn afhankelijk van toegang en omstandigheden.",
                ],
                [
                  BadgeCheck,
                  "Voorwaarden",
                  "Lees inclusies, uitsluitingen en annulering.",
                ],
              ].map(([Icon, t, x], i) => {
                const I = Icon as typeof Compass;
                return (
                  <article
                    key={String(t)}
                    className={`rounded-[1.25rem] border border-jade/10 p-5 ${i === 0 ? "bg-jade text-ivory" : "bg-white"}`}
                  >
                    <I className={i === 0 ? "text-saffron" : "text-jade"} />
                    <h3 className="mt-4 font-display text-2xl">{String(t)}</h3>
                    <p
                      className={`mt-2 text-sm leading-6 ${i === 0 ? "text-ivory/75" : "text-muted"}`}
                    >
                      {String(x)}
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
              eyebrow="Vóór je betaalt"
              title={
                <>
                  Vier ownerchecks.
                  <br />
                  Acht basisvragen.
                </>
              }
              description="De ownerchecks hieronder zijn specifiek; de boekingsvragen gelden voor iedere tour."
            />
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {c.checks.map((item, i) => (
                <article
                  key={item}
                  className="rounded-[1.25rem] border border-jade/10 bg-white p-5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-xs font-bold text-jade">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-jade">
                    {item}
                  </h3>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Exact ontmoetingspunt",
                "Werkelijke ophaalzone",
                "Wat wel/niet inbegrepen is",
                "Park- of entreefees",
                "Eten en allergenen",
                "Medische/mobiliteitseisen",
                "Wijziging door weer/status",
                "Annulering en no-show",
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
          id="veilig"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Goede ervaring, lichte voetafdruk"
                title="Volg gids, park en lokale gemeenschap"
                description="Een tour mag nooit toegang, dierencontact of natuurgebruik boven welzijn en regels plaatsen."
              />
              <ul className="mt-7 grid gap-4">
                {[
                  "Respecteer tempelkleding, bewoners en fotografie-aanwijzingen",
                  "Raak of voer wildlife niet en sta nooit op koraal",
                  "Meld dieet, allergenen, mobiliteit en medische beperkingen vooraf",
                  "Sla een activiteit over wanneer omstandigheden niet veilig voelen",
                ].map((x) => (
                  <li
                    key={x}
                    className="flex gap-3 text-sm leading-7 text-jade"
                  >
                    <HeartHandshake
                      className="mt-1 shrink-0 text-saffron"
                      size={19}
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:p-9">
              <LifeBuoy className="text-saffron" />
              <h3 className="mt-5 font-display text-3xl">
                Plan B is kwaliteitsinformatie
              </h3>
              <p className="mt-3 leading-7 text-ivory/75">
                Vraag vóór boeken wat er gebeurt bij sluiting, onveilige zee,
                extreme hitte of een routewijziging. Een betrouwbare aanbieder
                verkoopt geen onvoorwaardelijke garantie.
              </p>
            </aside>
          </div>
        </section>
        <section
          id="boeken"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Na de keuzehulp"
              title="Vergelijk actuele uitvoering bij drie aanbieders"
              description="Open dezelfde datum en controleer de laatste boekingsstap opnieuw."
            />
            <div className="mt-8 grid gap-3 lg:grid-cols-3">
              <a
                href={primary}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center justify-between rounded-xl bg-jade px-5 py-4 text-sm font-bold text-white"
              >
                Bekijk bij Klook{" "}
                <ExternalLink size={17} className="text-saffron" />
              </a>
              <a
                href={secondary}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center justify-between rounded-xl border border-jade/15 bg-white px-5 py-4 text-sm font-bold text-jade"
              >
                Vergelijk GetYourGuide{" "}
                <ExternalLink size={17} className="text-saffron" />
              </a>
              <a
                href={tertiary}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center justify-between rounded-xl border border-jade/15 bg-white px-5 py-4 text-sm font-bold text-jade"
              >
                Vergelijk Viator{" "}
                <ExternalLink size={17} className="text-saffron" />
              </a>
            </div>
            <AffiliateDisclosure
              className="mt-5"
              text="Dit zijn affiliate-links via onze centrale Travelpayoutsconfiguratie. Een mogelijke commissie verandert jouw prijs niet. We rangschikken geen tour op commissie en publiceren geen vluchtige prijs als redactioneel feit."
            />
          </div>
        </section>
        <FaqSplitSection
          id="vragen"
          eyebrow="Voor vertrek"
          title={`${c.title} Veelgestelde vragen`}
          items={c.faqs}
        />
        <section className="section-divider-top py-14">
          <div className="container-custom">
            <div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:flex lg:items-center lg:justify-between lg:p-9">
              <div>
                <p className="eyebrow text-saffron">Verder plannen</p>
                <h2 className="mt-2 font-display text-3xl">
                  Bekijk de tourfamilie of je Phuket-basis
                </h2>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 lg:mt-0">
                <Link
                  href="/phuket-tours/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  Alle Phuket tours{" "}
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
                <Link
                  href="/city/phuket/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  Phuket reisgids{" "}
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
                <Link
                  href="/best-hotels/phuket/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  Hotels kiezen{" "}
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <SourceMethodSection
          title="Bronnen en actualiteit"
          description="We scheiden blijvende keuzehulp van veranderlijke toegang, parkstatus, uitvoering en prijs."
          sources={[
            {
              label: "Tourism Authority of Thailand — Phuket en Old Town",
              href: "https://www.tourismthailand.org/Articles/10-things-to-do-in-phuket",
            },
            {
              label: "World Animal Protection — elephant-friendly guide",
              href: "https://www.worldanimalprotection.org/elephant-friendly-tourist-guide",
            },
            {
              label: "TAT — actuele parkstatus en seizoenssluitingen",
              href: "https://www.tatnews.org/2023/07/the-latest-opening-and-closing-status-of-thailands-national-parks/",
            },
            {
              label: "TAT — strengere regels voor duiken en snorkelen",
              href: "https://www.tatnews.org/2025/05/stricter-regulations-for-diving-activities-now-in-effect-in-thailand/",
            },
          ]}
          method="Dertien zichtbare Google-NL SERP's zijn afzonderlijk gecontroleerd. Echte PAA-signalen zijn alleen gebruikt waar ze zichtbaar waren. DataForSEO leverde tijdelijk geen bruikbaar lokaal rapport; vaste prijzen, tijden, groepen, parkfees en operatorclaims zijn daarom niet als evergreen feiten opgeslagen."
        />
      </main>
    </>
  );
}
