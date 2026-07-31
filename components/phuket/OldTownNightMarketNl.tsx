import {
  Bus,
  Camera,
  Clock3,
  CloudRain,
  Map,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TicketCheck,
  Utensils,
  Users,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  OldTownSpokeTemplate,
  type OldTownSpokeData,
} from "./OldTownSpokeTemplate";

const HERO = "/images/redesign/phuket-old-town-market-hero-v2.webp";

export default function OldTownNightMarketNl({
  activityHref,
}: {
  activityHref?: string;
}) {
  const activities = withSubId(
    activityHref || KLOOK_GENERIC,
    "phuket-old-town-market-nl-activities",
  );
  const data: OldTownSpokeData = {
    locale: "nl",
    alternateUrl: "https://go2-thailand.com/phuket/old-town/night-market/",
    pageUrl: "https://go2-thailand.com/nl/phuket/old-town/night-market/",
    updatedAt: "2026-07-31",
    title: "Phuket Old Town Night Market: Sunday Walking Street",
    description:
      "Plan Sunday Walking Street in Phuket Old Town: locatie, actuele planning, drukteritme, eten, regenplan en vervoer zonder verouderde prijslijst.",
    breadcrumbLabel: "Sunday Walking Street",
    heroImage: HERO,
    heroAlt:
      "Foodstalletjes, lokale families en verlichte winkelhuizen tijdens Sunday Walking Street in Phuket Old Town",
    heroEyebrow: "De markt die Thalang Road verandert",
    heroTitle: (
      <>
        Sunday Walking Street.
        <br />
        <span className="text-saffron-light">
          Kom met een plan. Dwaal daarna.
        </span>
      </>
    ),
    heroSubtitle: "Eén avondformat. Meerdere totaal verschillende ritmes.",
    heroDescription:
      "De markt verdient een eigen pagina omdat straatoegang, drukte, foodkeuze en terugreis veranderen. Bevestig eerst de actuele zondagplanning; kies daarna je aankomstmoment zonder ieder stalletje als vaste listing te behandelen.",
    primaryAction: { label: "Plan de avond", href: "#route" },
    affiliateAction: { label: "Bekijk actuele foodtours", href: activities },
    navItems: [
      { href: "#overview", label: "Snelle keuze", icon: Sparkles },
      { href: "#route", label: "Marktplan", icon: Map },
      { href: "#focus", label: "Wat probeer je?", icon: Utensils },
      { href: "#timing", label: "Drukteritme", icon: Clock3 },
      { href: "#practical", label: "Praktisch", icon: ShieldCheck },
      { href: "#book", label: "Actuele opties", icon: TicketCheck },
    ],
    introEyebrow: "Controleer eerst",
    introTitle: (
      <>
        Zondag is de intentie.
        <br />
        De actuele planning beslist.
      </>
    ),
    introDescription:
      "Zoekers willen vaak een exact uur. Gebruik breed gepubliceerde tijden als startsignaal en bevestig informatie voor jouw zondag voordat je Phuket oversteekt.",
    overviewCards: [
      {
        eyebrow: "Identiteit",
        title: "De zondagmarkt van Old Town",
        copy: "Dit is het Walking Street-format in de historische straten, niet een verzamelnaam voor iedere weekendmarkt op Phuket.",
        icon: MapPin,
      },
      {
        eyebrow: "Sterk voor",
        title: "Food, craft en straatsfeer",
        copy: "Kies de markt wanneer rondkijken zelf de avond is; prop haar niet in een strak museumprogramma.",
        icon: ShoppingBag,
      },
      {
        eyebrow: "Afweging",
        title: "Drukte verandert de straat",
        copy: "Latere drukte kan sfeervoller zijn maar minder prettig voor foto’s, kinderwagens en snel bewegen.",
        icon: Users,
      },
      {
        eyebrow: "Moet vooraf",
        title: "Plan de terugreis",
        copy: "Afsluitingen kunnen ophaalpunten veranderen. Bepaal hoe je vertrekt voordat het druk wordt.",
        icon: Bus,
        tone: "dark",
      },
    ],
    editorialRule:
      "Deze pagina bezit Sunday Walking Street-planning, foodoriëntatie en logistiek. De wijkowner en wandelroute behouden hun eigen informatietaak.",
    routeEyebrow: "Marktplan in vijf delen",
    routeTitle: (
      <>
        Doe het praktische werk
        <br />
        vóór het eerste stalletje.
      </>
    ),
    routeDescription:
      "Een markt is live inventaris. Vendors, prijzen, weer, toegang en exacte planning veranderen; daarom legt deze route verificatie en keuzes vast in plaats van een eeuwige stallmap.",
    routeSteps: [
      {
        marker: "01",
        title: "Bevestig dat de markt draait",
        copy: "Controleer actuele organisator- of lokale informatie voor jouw zondag, vooral bij zwaar weer of evenementen.",
        note: "Doe dit vóór je het eiland oversteekt.",
      },
      {
        marker: "02",
        title: "Kies aankomst en vertrek",
        copy: "Kies een afzetpunt buiten mogelijke afsluitingen en sla een bereikbaar terugpunt op.",
        note: "Neem niet aan dat dezelfde stoeprand later werkt.",
      },
      {
        marker: "03",
        title: "Loop één ronde vóór je koopt",
        copy: "Bekijk markt, mensenstroom en voedselbereiding voordat je bij het eerste stalletje bestelt.",
        note: "Houd middenpad en winkelingangen vrij.",
      },
      {
        marker: "04",
        title: "Kies food bewust",
        copy: "Vraag naar ingrediënten, allergenen, actuele prijs en portie en let op zichtbare doorloopsnelheid.",
        note: "Neem kleine betaalopties mee en bescherm waardevolle spullen.",
      },
      {
        marker: "05",
        title: "Vertrek vóór vermoeidheid beslist",
        copy: "Gebruik je geplande ophaalpunt terwijl groep, energie en verbinding nog goed zijn.",
        note: "Controleer de actuele rit- of busoptie opnieuw.",
      },
    ],
    focusEyebrow: "Food zonder schijnzekerheid",
    focusTitle: (
      <>
        Proef Phuket-smaken.
        <br />
        Sla de vaste prijslijst over.
      </>
    ),
    focusDescription:
      "Nuttig advies leert je wat je herkent en vraagt, niet welke vendor, portie of prijs op jouw datum gegarandeerd bestaat.",
    focusCards: [
      {
        title: "A-pong",
        copy: "Een dunne kokospannenkoek uit Phuket. Controleer ingrediënten en bereiding wanneer allergieën relevant zijn.",
        icon: Sparkles,
      },
      {
        title: "Hokkien-noedels",
        copy: "Een ingang naar de Hokkien-foodgeschiedenis van Phuket; recept, eiwit en portie verschillen per kok.",
        icon: Utensils,
      },
      {
        title: "Oh tao & lokale snacks",
        copy: "Vraag bij hartige gerechten en zoetigheden naar schaaldieren, varken, ei en actuele prijs.",
        icon: ShoppingBag,
      },
    ],
    timingEyebrow: "Drukteritme",
    timingTitle: (
      <>
        Eerder is overzichtelijker.
        <br />
        Later is intenser.
      </>
    ),
    timingDescription:
      "Opbouw en drukte verschillen. Kies de ervaring die je wilt in plaats van één universeel “beste uur” te claimen.",
    timingRows: [
      {
        period: "Voor vertrek",
        feel: "Weer, evenementen of operationele wijziging kunnen de markt beïnvloeden.",
        plan: "Bevestig de actuele zondagplanning en bewaar een vervoersalternatief.",
        cue: "Eerst controleren",
        highlight: true,
      },
      {
        period: "Vroeg marktdeel",
        feel: "Vaak eenvoudiger voor straatcontext, gezinnen en rustig food bekijken.",
        plan: "Loop een oriëntatieronde en keer gericht terug.",
        cue: "Eerst kijken",
      },
      {
        period: "Drukkere avond",
        feel: "Meer sfeer en activiteit, mogelijk met nauwere doorgang en wachtrijen.",
        plan: "Bescherm spullen, houd de groep samen en blokkeer geen stalletjes.",
        cue: "Drukteplan",
      },
      {
        period: "Regenavond",
        feel: "Buitenactiviteit, comfort en stallmix kunnen snel veranderen.",
        plan: "Neem regenbescherming mee en durf over te schakelen op een avond binnen.",
        cue: "Flexibel vertrek",
        highlight: true,
      },
    ],
    highlightEyebrow: "Drie keuzes",
    highlightTitle: (
      <>
        Markt, foodstop
        <br />
        of begeleide context?
      </>
    ),
    highlightDescription:
      "Alle drie kunnen passen. Ze zijn niet hetzelfde; betaal alleen wanneer actuele inhoud echt waarde toevoegt.",
    highlights: [
      {
        title: "Zelf rondkijken",
        copy: "Sterk voor vrijheid om vendors te vergelijken, foto’s te maken en op eigen tempo te vertrekken.",
        image: HERO,
        imageAlt: "Sunday Walking Street tijdens het blauwe uur",
        label: "Gebruik het vijfstappenplan",
      },
      {
        title: "Combineren met Old Town",
        copy: "Gebruik eerder de wandelroute en schakel daarna bewust van erfgoedlus naar marktmodus.",
        image: "/images/redesign/phuket-old-town-walk-hero-v2.webp",
        imageAlt: "Wandeling door Phuket Old Town",
        label: "Houd intenties apart",
      },
      {
        title: "Foodcontext met gids",
        copy: "Controleer taal, tastings, dieetafhandeling, groepsgrootte, ontmoetingspunt en annulering.",
        image:
          "/images/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket.webp",
        imageAlt: "Foodstalletjes op een Thaise avondmarkt",
        label: "Vergelijk actuele inhoud",
      },
    ],
    practicalEyebrow: "De werkelijkheid van een straatmarkt",
    practicalTitle: (
      <>
        Plan voor mensen,
        <br />
        regen en afsluitingen.
      </>
    ),
    practicalDescription:
      "De markt is niet ingewikkeld, maar kleine logistieke missers worden vervelend wanneer een hele straat druk is.",
    practicalCards: [
      {
        title: "Drukte & spullen",
        copy: "Houd waardevolle spullen veilig, spreek een ontmoetingspunt af en stop niet plots in de hoofdstroom.",
        icon: Users,
      },
      {
        title: "Regen & hitte",
        copy: "Gebruik de actuele verwachting, neem compacte bescherming mee en accepteer dat buitenactiviteit verandert.",
        icon: CloudRain,
      },
      {
        title: "Food & allergieën",
        copy: "Vraag rechtstreeks naar ingrediënten en kruiscontact; een druk stalletje kan niet iedere dieetbehoefte garanderen.",
        icon: ShieldCheck,
      },
    ],
    bookingTitle: (
      <>
        Betaal voor context,
        <br />
        niet voor een vage “markttour”.
      </>
    ),
    bookingDescription:
      "Vergelijk vóór boeken de exacte markt, actuele dag, taal, tastings, dieetafhandeling, ontmoetingspunt en annulering.",
    bookingCards: [
      {
        title: "Actuele foodtours",
        copy: "Controleer of Sunday Walking Street echt is inbegrepen en bekijk tasting- en ontmoetingsdetails.",
        href: activities,
        label: "Bekijk actuele touropties",
        icon: TicketCheck,
        affiliate: true,
      },
      {
        title: "Old Town-wandelroute",
        copy: "Plan de erfgoedstraten apart voordat je overschakelt op marktmodus.",
        href: "/phuket/old-town/things-to-do/",
        label: "Open de wandelroute",
        icon: Camera,
      },
      {
        title: "Phuket Old Town-gids",
        copy: "Ga terug voor verblijfsfit, straatzones en eilandvergelijkingen.",
        href: "/phuket/old-town/",
        label: "Open de wijkgids",
        icon: Map,
      },
    ],
    faqs: [
      {
        question: "Op welke dag is de Phuket Old Town Night Market?",
        answer:
          "De markt staat bekend als Sunday Walking Street en hoort bij zondag. Controleer actuele organisator- of lokale informatie voordat je reist.",
      },
      {
        question: "Hoe laat opent Sunday Walking Street in Phuket?",
        answer:
          "Veel bronnen noemen een markt van late namiddag tot avond, maar opbouw en sluiting kunnen wijzigen. Controleer actuele informatie voor jouw datum.",
      },
      {
        question: "Waar is Sunday Walking Street in Phuket Old Town?",
        answer:
          "De markt concentreert zich rond Thalang Road in de historische wijk. Afsluitingen kunnen aankomst- en ophaalpunten veranderen.",
      },
      {
        question: "Is Phuket Old Town ’s avonds de moeite waard?",
        answer:
          "Ja wanneer food, verlichte winkelhuizen en straatleven je aanspreken. Een zondagmarktavond is drukker en structureel anders dan een gewone avond.",
      },
      {
        question: "Wat eet je op de Old Town Night Market?",
        answer:
          "Kijk naar Phuket-gerechten zoals a-pong, Hokkien-noedels en regionale snacks. Vraag naar ingrediënten, allergenen, portie en actuele prijs.",
      },
      {
        question: "Is Sunday Walking Street geschikt met kinderen?",
        answer:
          "Dat kan, vooral eerder in het marktritme. Drukte, hitte, geluid en ongelijk bewegen kunnen vermoeiend zijn; spreek een ontmoetingspunt af.",
      },
      {
        question: "Is dit dezelfde markt als Phuket Weekend Market?",
        answer:
          "Nee, neem dat niet aan. Phuket gebruikt overlappende marktnamen. Deze gids gaat over Sunday Walking Street in Old Town; controleer kaart en dag.",
      },
    ],
    faqDescription:
      "Gebaseerd op vier zelfstandige Nederlandse markt-SERP-sets met echte PAA. Exacte tijden, prijzen, stallenaantallen en ritprijzen zijn niet bevroren.",
    related: [
      {
        title: "Phuket Old Town-gids",
        description: "Begrijp de wijk vóór je één avondformat kiest.",
        href: "/phuket/old-town/",
        image: "/images/redesign/phuket-old-town-hero-v2.webp",
        imageAlt: "Historische winkelhuizen in Phuket Old Town",
      },
      {
        title: "Old Town-wandelroute",
        description: "Bouw de dagroute los van de markt.",
        href: "/phuket/old-town/things-to-do/",
        image: "/images/redesign/phuket-old-town-walk-hero-v2.webp",
        imageAlt: "Reiziger in Phuket Old Town",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        description:
          "Vergelijk eilandbrede activiteiten zonder deze marktowner uit te rekken.",
        href: "/city/phuket/attractions/",
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Bezienswaardigheden op Phuket",
      },
    ],
    sources: [
      {
        title: "Recommended Route for One Day: Phuket",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/recommended-route-for-one-day-3",
        note: "Primaire context voor Lat Yai, Thalang Road en het zondagformat.",
      },
      {
        title: "10 Things to Do in Phuket",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Articles/10-things-to-do-in-phuket",
        note: "Officiële context voor Sunday Walking Street en Old Town.",
      },
      {
        title: "Weer in Phuket",
        creator: "Thai Meteorological Department",
        url: "https://www.tmd.go.th/weather/province/phuket",
        note: "Actuele weer- en waarschuwingsbron.",
      },
      {
        title: "Reisadvies Thailand",
        creator: "NederlandWereldwijd",
        url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
        note: "Actuele Nederlandse veiligheids- en verkeerscontext.",
      },
    ],
    methodDescription:
      "Zelfstandig NL onderzocht op 31 juli 2026 met twee marktclusters, vier Nederlandse SERP-sets en echte PAA. De bestaande owner behoudt de markt- en navigatie-intentie. Vaste prijzen, exacte uren, stallen- en kortingsclaims, ritprijzen en onveilig scooteradvies zijn verwijderd.",
  };
  return <OldTownSpokeTemplate data={data} />;
}
