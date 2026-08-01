import {
  BookOpen,
  Bus,
  Camera,
  Clock3,
  Coffee,
  Footprints,
  Map,
  Palette,
  ShieldCheck,
  Sun,
  TicketCheck,
  Utensils,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  OldTownSpokeTemplate,
  type OldTownSpokeData,
} from "./OldTownSpokeTemplate";

const HERO = "/images/redesign/phuket-old-town-walk-hero-v2.webp";

export default function OldTownThingsToDoNl({
  activityHref,
}: {
  activityHref?: string;
}) {
  const activities = withSubId(
    activityHref || KLOOK_GENERIC,
    "phuket-old-town-things-nl-activities",
  );
  const data: OldTownSpokeData = {
    locale: "nl",
    alternateUrl: "https://go2-thailand.com/phuket/old-town/things-to-do/",
    pageUrl: "https://go2-thailand.com/nl/phuket/old-town/things-to-do/",
    updatedAt: "2026-07-31",
    title: "Wat te doen in Phuket Old Town? Slimme wandelroute",
    description:
      "Loop Phuket Old Town in een logische volgorde langs erfgoedstraten, cultuur, murals en eten. Met hitte-, verkeer- en zondagmarktgrenzen.",
    breadcrumbLabel: "Wat te doen",
    heroImage: HERO,
    heroAlt:
      "Reiziger met kaart naast een mural en historische winkelhuizen in Phuket Old Town",
    heroEyebrow: "Een route, geen verzameling kaartpins",
    heroTitle: (
      <>
        Loop door Old Town.
        <br />
        <span className="text-saffron-dark">
          Laat de straten Phuket uitleggen.
        </span>
      </>
    ),
    heroSubtitle: "Eerst architectuur. Eten en context ertussen.",
    heroDescription:
      "De beste Old Town-wandeling is een korte samenhangende lus, geen race langs tien losse pins. Deze route scheidt de visuele kern, één cultuurstop en eetpauzes; zondagmarktlogistiek blijft in haar eigen gids.",
    primaryAction: { label: "Start de route", href: "#route" },
    affiliateAction: {
      label: "Bekijk actuele wandelingen met gids",
      href: activities,
    },
    navItems: [
      { href: "#overview", label: "Past de route?", icon: Map },
      { href: "#route", label: "Vijf stappen", icon: Footprints },
      { href: "#focus", label: "Waar let je op?", icon: Camera },
      { href: "#timing", label: "Beste ritme", icon: Clock3 },
      { href: "#practical", label: "Praktisch", icon: ShieldCheck },
      { href: "#book", label: "Actuele opties", icon: TicketCheck },
    ],
    introEyebrow: "Voor je begint",
    introTitle: (
      <>
        Bouw één lus.
        <br />
        Houd ruimte om te kijken.
      </>
    ),
    introDescription:
      "Een eerste bezoek past in een halve dag. Niet afstand maar hitte, verkeer, actuele toegang en de tijd die je aan eten of displays besteedt bepalen het tempo.",
    overviewCards: [
      {
        eyebrow: "Kerndoel",
        title: "Lees de winkelhuisstraten",
        copy: "Zie Thalang, Soi Romanee en de omliggende wegen als verbonden stadsgeschiedenis, niet als losse fotodecors.",
        icon: Palette,
      },
      {
        eyebrow: "Eén anker",
        title: "Kies één cultuurstop",
        copy: "Kies een museum, historisch huis of heiligdom dat aantoonbaar open is in plaats van iedere gevel te verzamelen.",
        icon: BookOpen,
      },
      {
        eyebrow: "Noodzakelijke pauze",
        title: "Plan eten en schaduw",
        copy: "Een lokale stop in de schaduw maakt de route beter en voorkomt een geforceerde mars tijdens de heetste uren.",
        icon: Coffee,
      },
      {
        eyebrow: "Aparte intentie",
        title: "De zondagmarkt krijgt een eigen plan",
        copy: "Gebruik de marktowner voor actuele planning, drukte, food en terugvervoer.",
        icon: Clock3,
        tone: "dark",
      },
    ],
    editorialRule:
      "Deze pagina bezit de wandelvolgorde en activiteitkeuze. Markturen, eetlijsten en zondaglogistiek blijven op de aparte marktowner.",
    routeEyebrow: "Zelfstandige wandelvolgorde",
    routeTitle: (
      <>
        Vijf bewegingen door
        <br />
        de historische kern.
      </>
    ),
    routeDescription:
      "Draai de volgorde om wanneer weer, afsluitingen of jouw aankomstpunt dat logischer maken. Controleer iedere bemande locatie voordat je erheen loopt.",
    routeSteps: [
      {
        marker: "01",
        title: "Oriënteer op Thalang Road",
        copy: "Begin bij het ritme van arcades en winkelhuizen en zie welke ingangen winkel, woning, café of heiligdom zijn.",
        note: "Houd deuren en overdekte loopruimte vrij.",
      },
      {
        marker: "02",
        title: "Draai door Soi Romanee",
        copy: "Gebruik het korte straatje voor geveldetails en loop daarna verder dan de bekendste fotohoek.",
        note: "Vraag toestemming voor portretten en private interieurs.",
      },
      {
        marker: "03",
        title: "Verleng naar Dibuk en Krabi",
        copy: "Voeg rustigere straten en één actuele erfgoedlocatie toe voor context.",
        note: "Controleer opening en toegang bij de locatie zelf.",
      },
      {
        marker: "04",
        title: "Loop terug via Phang Nga Road",
        copy: "Kijk naar murals, actieve ondernemingen en de overgang van ansichtkaartkern naar dagelijkse stad.",
        note: "Verkeer en loopcomfort veranderen snel.",
      },
      {
        marker: "05",
        title: "Eindig met eten, niet nog een pin",
        copy: "Kies een actuele lokale stop en controleer ingrediënten, dieetwensen en totaal vóór je bestelt.",
        note: "Geen restaurant geldt als eeuwige “beste keuze”.",
      },
    ],
    focusEyebrow: "Meer informatiewaarde",
    focusTitle: (
      <>
        Zie de stad
        <br />
        achter de kleur.
      </>
    ),
    focusDescription:
      "De nuttige laag is niet een langere lijst, maar begrijpen hoe architectuur, geloof, handel en food dezelfde blokken delen.",
    focusCards: [
      {
        title: "Arcades & drempels",
        copy: "Let op schaduw, ingangen en de grens tussen publieke loopruimte en privaat eigendom.",
        icon: Footprints,
      },
      {
        title: "Heiligdommen & geloof",
        copy: "Vertraag, kleed je passend en volg regels ter plaatse in plaats van toegang aan te nemen.",
        icon: ShieldCheck,
      },
      {
        title: "Murals & context",
        copy: "Streetart maakt niet iedere aangrenzende muur, deur of bewoner tot fotodecor.",
        icon: Camera,
      },
    ],
    timingEyebrow: "Gebruik de dag slim",
    timingTitle: (
      <>
        Routeer op energie,
        <br />
        niet op stopwatch.
      </>
    ),
    timingDescription:
      "Een zondagnamiddag gedraagt zich anders dan een doordeweekse ochtend. Kies het ritme dat past bij weer en doel.",
    timingRows: [
      {
        period: "Ochtend",
        feel: "Vaak prettiger voor gevels vóór de sterkste hitte en bezoekersstroom.",
        plan: "Loop eerst de visuele kern en kies daarna één cultuurstop.",
        cue: "Eerst architectuur",
        highlight: true,
      },
      {
        period: "Middag",
        feel: "Hitte en buien kunnen onbeschut lopen onaangenaam maken.",
        plan: "Gebruik eten, schaduw of een gecontroleerde binnenlocatie.",
        cue: "Pauzeer goed",
      },
      {
        period: "Namiddag",
        feel: "Meer straatactiviteit; licht en verkeer verschillen per blok.",
        plan: "Houd de route korter en bevestig je ophaalplek.",
        cue: "Flexibel einde",
      },
      {
        period: "Zondagavond",
        feel: "De markt verandert Thalang Road en de voetgangersstroom.",
        plan: "Schakel naar de marktowner en controleer actuele informatie.",
        cue: "Andere intentie",
        highlight: true,
      },
    ],
    highlightEyebrow: "Kies drie lagen",
    highlightTitle: (
      <>
        Architectuur, context
        <br />
        en een goede pauze.
      </>
    ),
    highlightDescription:
      "Een sterke route bevat alle drie. Meer pins toevoegen geeft meestal minder begrip.",
    highlights: [
      {
        title: "Het straatweefsel",
        copy: "Arcades, gevels, luiken en actieve begane grond maken de wijk samenhangend.",
        image: HERO,
        imageAlt: "Historische straat en mural op de Old Town-route",
        label: "Bekijk het hele blok",
      },
      {
        title: "Eén cultureel interieur",
        copy: "Kies een actuele open locatie en volg de bezoekregels.",
        image: "/images/cities/phuket/attractions/Phuket Old Town2.webp",
        imageAlt: "Historische architectuur in Phuket Old Town",
        label: "Controleer vóór vertrek",
      },
      {
        title: "Eten met context",
        copy: "Gebruik actuele menu’s en dieetchecks; maak van één bezoek geen eeuwige prijs- of bestclaim.",
        image:
          "/images/blog/old-town-phuket-walking-guide-street-art-cafes-2026.webp",
        imageAlt: "Café- en straatdetails in Phuket Old Town",
        label: "Houd ruimte voor lunch",
      },
    ],
    practicalEyebrow: "Laat de lus werken",
    practicalTitle: (
      <>
        Kleine frictie
        <br />
        bepaalt de wandeling.
      </>
    ),
    practicalDescription:
      "Old Town is compact, maar loopcomfort is ongelijk. Plan de saaie details zodat de culturele laag aandacht krijgt.",
    practicalCards: [
      {
        title: "Hitte & buien",
        copy: "Neem water en zon-/regenbescherming mee. Gebruik de actuele TMD-verwachting en houd een binnenalternatief.",
        icon: Sun,
      },
      {
        title: "Wegen & ophaalpunten",
        copy: "Steek zorgvuldig over en kies een ophaalpunt dat ook tijdens afsluitingen bereikbaar blijft.",
        icon: Bus,
      },
      {
        title: "Respect & toegang",
        copy: "Vraag toestemming voor mensen of interieurs en blokkeer geen werkende ingang.",
        icon: ShieldCheck,
      },
    ],
    bookingTitle: (
      <>
        Kies begeleiding
        <br />
        alleen voor echte context.
      </>
    ),
    bookingDescription:
      "Zelf lopen kan prima. Een betaalde gids voegt waarde toe wanneer taal, architectuurcontext, food of toegang helder en actueel zijn.",
    bookingCards: [
      {
        title: "Wandelingen met gids",
        copy: "Controleer aanbieder, route, duur, taal, ontmoetingspunt, inhoud en annulering.",
        href: activities,
        label: "Bekijk actuele wandeltours",
        icon: TicketCheck,
        affiliate: true,
      },
      {
        title: "Sunday Walking Street",
        copy: "Gebruik de marktowner wanneer stalletjes en het avondformat het doel zijn.",
        href: "/phuket/old-town/night-market/",
        label: "Plan de zondagmarkt",
        icon: Utensils,
      },
      {
        title: "Complete Old Town-gids",
        copy: "Ga terug voor straatzones, verblijfsfit en vergelijking met strandbases.",
        href: "/phuket/old-town/",
        label: "Open de wijkgids",
        icon: Map,
      },
    ],
    faqs: [
      {
        question: "Wat kun je doen in Phuket Old Town?",
        answer:
          "Loop Thalang Road en Soi Romanee, verleng via Dibuk, Krabi en Phang Nga Road, kies één actuele cultuurstop en houd tijd voor eten. Sunday Walking Street is een afzonderlijk avondplan.",
      },
      {
        question: "Is Phuket Old Town goed te voet te doen?",
        answer:
          "Ja op wijkniveau, al verschillen voetpad, verkeer, hitte en regen. Steek zorgvuldig over en kies een realistisch ophaalpunt.",
      },
      {
        question: "Hoeveel tijd heb je nodig voor Phuket Old Town?",
        answer:
          "Een halve dag past bij een gerichte lus met één cultuurstop en eten. Plan langer voor musea, een tour of de zondagmarkt.",
      },
      {
        question: "Kun je Phuket Old Town zonder gids bezoeken?",
        answer:
          "Ja. Deze volgorde werkt zelfstandig. Boek een gids alleen wanneer taal, historische context, food of toegang aantoonbaar waarde toevoegt.",
      },
      {
        question: "Wat mag je niet missen in Phuket Old Town?",
        answer:
          "Mis vooral de relatie tussen Thalang Road, Soi Romanee en de rustigere omliggende straten niet. Eén doordachte cultuurstop is nuttiger dan alleen de pastelstraat fotograferen.",
      },
      {
        question: "Waar start je een wandeling door Phuket Old Town?",
        answer:
          "Thalang Road is een praktisch oriëntatiepunt, maar start bij jouw echte aankomstpunt en draai de lus om wanneer weer, afsluiting of reservering dat logischer maakt.",
      },
    ],
    faqDescription:
      "Gebaseerd op vier zelfstandige Nederlandse activiteiten-SERP-sets met echte PAA-vragen. Vaste entreeprijzen, openingstijden en restaurantrankings zijn uitgesloten.",
    related: [
      {
        title: "Phuket Old Town-gids",
        description: "Kies dag, straatzone en verblijfsfit.",
        href: "/phuket/old-town/",
        image: "/images/redesign/phuket-old-town-hero-v2.webp",
        imageAlt: "Winkelhuizen in Phuket Old Town",
      },
      {
        title: "Sunday Walking Street",
        description: "Schakel over naar de actuele marktplanning.",
        href: "/phuket/old-town/night-market/",
        image: "/images/redesign/phuket-old-town-market-hero-v2.webp",
        imageAlt: "Sunday Walking Street in Phuket Old Town",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        description:
          "Vergelijk eilandbrede plekken zonder deze looproute uit te rekken.",
        href: "/city/phuket/attractions/",
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Bezienswaardigheden en uitzichtpunten op Phuket",
      },
    ],
    sources: [
      {
        title: "Stroll the Historic Roads in Phuket Old Town",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Articles/stroll-the-historic-roads-in-phuket-old-town",
        note: "Officiële wijk-, wandel-, erfgoed- en foodcontext.",
      },
      {
        title: "Recommended Route for One Day: Phuket",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/recommended-route-for-one-day-3",
        note: "Officiële straat- en erfgoedcontext.",
      },
      {
        title: "Weer in Phuket",
        creator: "Thai Meteorological Department",
        url: "https://www.tmd.go.th/weather/province/phuket",
        note: "Actuele weerinformatie.",
      },
      {
        title: "Reisadvies Thailand",
        creator: "NederlandWereldwijd",
        url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
        note: "Actuele Nederlandse verkeers- en veiligheidscontext.",
      },
    ],
    methodDescription:
      "Zelfstandig NL onderzocht op 31 juli 2026 met twee activiteitenclusters, vier Nederlandse SERP-sets en echte PAA. De pagina bezit alleen routevolgorde en activiteitkeuze; marktlogistiek blijft op haar aparte owner. Vaste prijzen, tijden, venuegaranties, restaurantrankings en onveilige scooteradviezen zijn verwijderd.",
  };
  return <OldTownSpokeTemplate data={data} />;
}
