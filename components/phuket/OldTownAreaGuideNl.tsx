import {
  BookOpen,
  Building2,
  Bus,
  CalendarDays,
  Camera,
  Coffee,
  Compass,
  Footprints,
  Hotel,
  Map,
  MapPin,
  MoonStar,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Sunrise,
  TicketCheck,
  Utensils,
} from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import {
  PhuketAreaGuideTemplate,
  type PhuketAreaGuideData,
} from "./PhuketAreaGuideTemplate";

const HERO = "/images/redesign/phuket-old-town-hero-v2.webp";

export default function OldTownAreaGuideNl({
  activityHref,
}: {
  activityHref?: string;
}) {
  const hotels = withSubId(TRIP_GENERIC, "phuket-old-town-owner-nl-hotels");
  const activities = withSubId(
    activityHref || KLOOK_GENERIC,
    "phuket-old-town-owner-nl-activities",
  );

  const data: PhuketAreaGuideData = {
    locale: "nl",
    pageUrl: "https://go2-thailand.com/nl/phuket/old-town/",
    alternateUrl: "https://go2-thailand.com/phuket/old-town/",
    updatedAt: "2026-07-31",
    area: "Phuket Old Town",
    title: "Phuket Old Town: straten, eten en slim bezoek",
    description:
      "Plan Phuket Old Town per straat en dagdeel. Vergelijk erfgoed, eten, Sunday Walking Street, vervoer en de keuze om er wel of niet te verblijven.",
    heroImage: HERO,
    heroAlt:
      "Pastelkleurige winkelhuizen en dagelijks straatleven in Phuket Old Town na een tropische bui",
    heroEyebrow: "Phuket zonder strandfilter",
    heroTitle: (
      <>
        Phuket Old Town.
        <br />
        <span className="text-saffron-dark">
          Lees de straten, niet een checklist.
        </span>
      </>
    ),
    heroSubtitle: "Een compacte erfgoedwijk met een levende eetcultuur.",
    heroDescription:
      "Kom voor de gevels, maar blijf lang genoeg om heiligdommen, familiebedrijven, lokale gerechten en het veranderende avondritme te zien. Deze gids helpt je kiezen wanneer je gaat, waar je loopt en of Old Town bij jou past als verblijfsbasis.",
    heroPrimary: { label: "Plan je bezoek", href: "#fit" },
    heroAffiliate: { label: "Bekijk actuele wandeltours", href: activities },
    navItems: [
      { href: "#fit", label: "Past het bij jou?", icon: Compass },
      { href: "#zones", label: "Straatzones", icon: MapPin },
      { href: "#beach", label: "Erfgoed", icon: Building2 },
      { href: "#season", label: "Wanneer gaan?", icon: CalendarDays },
      { href: "#plan", label: "Plan per taak", icon: Map },
      { href: "#safety", label: "Straatwijs", icon: ShieldCheck },
    ],
    verdictTitle: (
      <>
        Een sterke halve dag.
        <br />
        Beter wanneer je vertraagt.
      </>
    ),
    verdictDescription:
      "Old Town is het duidelijkste tegenwicht voor een strandroute op Phuket: beloopbaar op wijkniveau, gedreven door eten en visueel eigen. Het is geen strandbasis en op marktmomenten voelt de bekendste straat veel drukker.",
    fitCards: [
      {
        eyebrow: "Sterke match",
        title: "Architectuur & straatdetail",
        copy: "Kies Old Town wanneer winkelhuizen, heiligdommen, musea en langzaam kijken belangrijker zijn dan zand.",
        icon: Building2,
      },
      {
        eyebrow: "Sterke match",
        title: "Verkennen via eten",
        copy: "Gebruik de wijk om Phuket-smaken te begrijpen via actuele restaurants, markten en een gerichte foodtour.",
        icon: Utensils,
      },
      {
        eyebrow: "Voorwaardelijke match",
        title: "Een stedelijke basis",
        copy: "Overnachten past bij stadstoegang en avondeten, niet bij reizigers die een strand voor de hoteldeur verwachten.",
        icon: Hotel,
      },
      {
        eyebrow: "Kies iets anders",
        title: "Iedere dag resort & strand",
        copy: "Kies een westkustbasis wanneer zwembad, strand en resortfaciliteiten het middelpunt van iedere dag zijn.",
        icon: Sun,
        tone: "dark",
      },
    ],
    editorialRule:
      "Deze pagina helpt de wijk kiezen en begrijpen. De activiteitenpagina bezit de concrete wandelroute; de marktowner bezit de actuele zondagplanning.",
    zones: [
      {
        title: "Thalang & Soi Romanee",
        eyebrow: "De herkenbare kern",
        copy: "De bekendste zone met arcades, winkelhuizen, kleine ondernemingen en de route van Sunday Walking Street.",
        check:
          "Loop hier ook buiten de fotopiek. Deuren en arcades blijven echte toegangen, geen decor.",
        image: HERO,
        imageAlt: "Arcades en historische winkelhuizen in Phuket Old Town",
      },
      {
        title: "Dibuk & Krabi Road",
        eyebrow: "Musea en grotere huizen",
        copy: "Een nuttige uitbreiding voor cultuurinstellingen, rustigere blokken en meer context dan één pastelstraat.",
        check:
          "Controleer museumuren en toegang bij de officiële locatie voordat je een strak tijdschema bouwt.",
        image: "/images/cities/phuket/phuket-old-town.webp",
        imageAlt: "Historische gebouwen en straatbeeld in Old Phuket Town",
      },
      {
        title: "Phang Nga & oostrand",
        eyebrow: "Eten, murals en overgang",
        copy: "Verbind streetart en lokale eetstops met de moderne stad rond de historische kern.",
        check:
          "Buiten de compacte kern neemt verkeer snel toe. Plan oversteekpunten en je ophaalplek.",
        image:
          "/images/blog/old-town-phuket-walking-guide-street-art-cafes-2026.webp",
        imageAlt: "Streetart en straatdetails rond Phuket Old Town",
      },
    ],
    dayParts: [
      {
        time: "Vroege ochtend",
        title: "Gevels vóór de hitte",
        copy: "Begin wanneer rolluiken opengaan en de wijk in een normale werkdag verandert.",
        icon: Sunrise,
      },
      {
        time: "Late ochtend",
        title: "Museum of lokale context",
        copy: "Kies één cultuurstop of actuele wandeltour in plaats van iedere kaartpin af te jagen.",
        icon: BookOpen,
      },
      {
        time: "Middag",
        title: "Eten, schaduw en zijstraten",
        copy: "Laat lunch en overdekte arcades je route bepalen; hitte en buien maken een star schema onnodig zwaar.",
        icon: Coffee,
      },
      {
        time: "Avond",
        title: "Gewone stad of markt",
        copy: "Een normale avond en Sunday Walking Street zijn verschillende ervaringen. Kies bewust.",
        icon: MoonStar,
      },
    ],
    beachTitle: "Een levende wijk — geen pastelachtergrond.",
    beachDescription:
      "De architectuur hoort bij een actieve stad die is gevormd door migratie, handel, geloof en familieleven. Houd ingangen vrij en behandel publieke murals, winkels, woningen en gebedsplekken ieder op hun eigen voorwaarden.",
    beachChecks: [
      {
        title: "Kijk voorbij één label",
        copy: "“Sino-Portugees” is bruikbare shorthand, maar het erfgoed van Phuket weerspiegelt meerdere gemeenschappen en handelsgeschiedenissen.",
        icon: Building2,
      },
      {
        title: "Fotografeer zorgvuldig",
        copy: "Vraag toestemming voor mensen en private interieurs en blokkeer nooit winkel- of heiligdomtoegang.",
        icon: Camera,
      },
      {
        title: "Besteed lokaal, claim niet eeuwig",
        copy: "Kies actuele lokale ondernemingen zonder een tijdelijk adres tot permanente “beste keuze” te verheffen.",
        icon: ShoppingBag,
      },
    ],
    seasonTitle: (
      <>
        Plan voor hitte, regen
        <br />
        en de dag van de week.
      </>
    ),
    seasonDescription:
      "Old Town is het hele jaar te bezoeken, maar buitentemperatuur, tropische buien en het zondagse marktritme veranderen de ervaring.",
    seasonRows: [
      {
        period: "Ma–za",
        conditions:
          "Een gewone werkstad zonder dat Sunday Walking Street Thalang Road overneemt.",
        planning:
          "Sterk voor architectuur, musea, eten en dagelijks straatleven.",
        cue: "Normale stadsdag",
        highlight: true,
      },
      {
        period: "Zondag",
        conditions:
          "Thalang Road kan later op de dag veranderen in het marktformat Lat Yai.",
        planning:
          "Controleer de actuele organisatie en verwacht ander publiek en vervoer.",
        cue: "Marktintentie",
      },
      {
        period: "Drogere periode",
        conditions:
          "Vaak eenvoudiger voor een langere buitenwandeling; zon en hitte blijven relevant.",
        planning: "Begin eerder, neem water mee en plan schaduw.",
        cue: "Loop eerder",
      },
      {
        period: "Nattere periode",
        conditions: "Buien kunnen de wandeling en buitenmarkt onderbreken.",
        planning:
          "Maak een flexibele lus met cafés, musea en arcades en bekijk de actuele verwachting.",
        cue: "Flexibele route",
        highlight: true,
      },
    ],
    spokes: [
      {
        title: "Wat te doen & wandelroute",
        copy: "Volg een logische volgorde van straten, erfgoedstops en realistische pauzes.",
        href: "/phuket/old-town/things-to-do/",
        image:
          "/images/blog/old-town-phuket-walking-guide-street-art-cafes-2026.webp",
        imageAlt: "Wandelroute en streetart in Phuket Old Town",
        label: "Open de route",
      },
      {
        title: "Sunday Walking Street",
        copy: "Plan de markt apart: actuele planning, drukte, eten en vervoer.",
        href: "/phuket/old-town/night-market/",
        image:
          "/images/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket.webp",
        imageAlt: "Avondmarkt met eetstalletjes in Thailand",
        label: "Open de marktgids",
      },
      {
        title: "Actuele Old Town-tours",
        copy: "Vergelijk operator, duur, ontmoetingspunt, inhoud en annulering.",
        href: activities,
        image: HERO,
        imageAlt: "Wandelomgeving in Phuket Old Town",
        label: "Bekijk actuele opties",
        affiliate: true,
      },
      {
        title: "Waar verblijven in Phuket?",
        copy: "Vergelijk een stedelijke basis met de strandzones voordat je boekt.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Verblijfszones op Phuket",
        label: "Vergelijk gebieden",
      },
    ],
    comparisonCards: [
      {
        area: "Patong",
        fit: "Voor geconcentreerd nachtleven, een drukke resortzone en strandtoegang.",
        href: "/phuket/patong/",
        image: "/images/redesign/patong-area-hero-v2.webp",
        imageAlt: "Patong Beach en stedelijke resortzone",
      },
      {
        area: "Kata",
        fit: "Voor een compacte westkustbasis met strand, voorzieningen en seizoenssurf.",
        href: "/phuket/kata/",
        image: "/images/redesign/kata-area-hero-v2.webp",
        imageAlt: "De baai van Kata Beach",
      },
      {
        area: "Rawai",
        fit: "Voor een bewoonde zuidkust, bootplannen en een rustiger dagelijks ritme.",
        href: "/phuket/rawai/",
        image: "/images/redesign/rawai-area-hero-v2.webp",
        imageAlt: "Waterfront van Rawai in Zuid-Phuket",
      },
    ],
    safetyCards: [
      {
        title: "Verkeer & voetpad",
        copy: "Loopcomfort verschilt per blok. Gebruik oversteekpunten zorgvuldig en plan een ophaalplek buiten afsluitingen.",
        icon: Footprints,
      },
      {
        title: "Hitte & regen",
        copy: "Neem water en zon-/regenbescherming mee en gebruik actuele TMD-informatie in plaats van maandgaranties.",
        icon: Sun,
      },
      {
        title: "Tempels, heiligdommen & mensen",
        copy: "Gedraag je respectvol, vraag toestemming voor portretten en volg lokale fotografieregels.",
        icon: ShieldCheck,
      },
    ],
    bookingCards: [
      {
        title: "Verblijven in Old Town",
        copy: "Controleer kaartpin, avondgeluid, kamerbereikbaarheid, parkeren, annulering en totaal voor jouw data.",
        href: hotels,
        label: "Bekijk actuele hotelprijzen",
        icon: Hotel,
        affiliate: true,
      },
      {
        title: "Wandel- en foodtours",
        copy: "Controleer ontmoetingspunt, route, gidstaal, inbegrepen eten en annulering vóór betaling.",
        href: activities,
        label: "Bekijk actuele touropties",
        icon: TicketCheck,
        affiliate: true,
      },
      {
        title: "Vervoer op Phuket",
        copy: "Gebruik actuele operatorinformatie en plan de laatste verbinding of ophaalplek.",
        href: "https://phuketsmartbus.com/",
        label: "Open actuele businformatie",
        icon: Bus,
      },
    ],
    faqs: [
      {
        question: "Is Phuket Old Town de moeite waard?",
        answer:
          "Ja wanneer je architectuur, eten en culturele context naast de stranden zoekt. Een halve dag volstaat voor een gericht eerste bezoek; plan langer wanneer musea, food of de zondagmarkt centraal staan.",
      },
      {
        question: "Welke dag kun je het beste naar Phuket Old Town?",
        answer:
          "Kies maandag tot en met zaterdag voor normaal straatleven en rustiger architectuur kijken. Kies zondag wanneer Sunday Walking Street zelf het doel is en controleer vooraf de actuele planning.",
      },
      {
        question: "Hoeveel tijd heb je nodig in Phuket Old Town?",
        answer:
          "De kern is compact, maar een betekenisvol bezoek is geen race. Reken op een halve dag voor straten, één cultuurstop en eten. Gebruik de activiteitenpagina voor de concrete volgorde.",
      },
      {
        question: "Is Phuket Old Town goed te voet te bekijken?",
        answer:
          "De historische kern is op wijkniveau beloopbaar, al verschillen voetpad, verkeer en hitte per straat. Plan oversteekpunten, schaduw en een ophaalplek.",
      },
      {
        question: "Wat is de mooiste straat in Phuket Old Town?",
        answer:
          "Thalang Road en Soi Romanee vormen de bekendste visuele kern. Dibuk, Krabi en Phang Nga Road voegen grotere huizen, musea en stadscontext toe.",
      },
      {
        question: "Kun je verblijven in Phuket Old Town?",
        answer:
          "Ja, vooral voor stadstoegang en eten. Controleer de exacte kaartpin, recente geluidservaringen en bereikbaarheid en onthoud dat Old Town geen strandbasis is.",
      },
      {
        question: "Is Phuket Old Town ’s avonds leuk?",
        answer:
          "Dat kan, vooral voor eten of Sunday Walking Street. Een gewone avond en een marktavond voelen anders; controleer actuele opening en regel je terugreis.",
      },
      {
        question: "Is Phuket Old Town hetzelfde als Phuket Town?",
        answer:
          "Phuket Old Town is de historische wijk binnen het grotere moderne Phuket Town/Phuket City. Accommodaties gebruiken de namen soms losjes, dus controleer de kaart.",
      },
    ],
    faqDescription:
      "Gebaseerd op vijf actuele Nederlandse SERP-sets met echte PAA-vragen. Vaste ritprijzen, verouderde openingstijden en onbewezen “beste”-claims zijn bewust uitgesloten.",
    related: [
      {
        title: "Complete Phuket-gids",
        description:
          "Bouw de eilandroute rond kust, stad en realistische reistijd.",
        href: "/city/phuket/",
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Kust en stad op Phuket",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        description:
          "Vergelijk eilandbrede plekken zonder de Old Town-owner te overladen.",
        href: "/city/phuket/attractions/",
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Bezienswaardigheden en uitzichtpunten op Phuket",
      },
      {
        title: "Waar verblijven in Phuket?",
        description: "Kies bewust tussen een stedelijke en een strandbasis.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Verblijfszones op Phuket",
      },
    ],
    sources: [
      {
        title: "Recommended Route for One Day: Phuket",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/recommended-route-for-one-day-3",
        note: "Primaire context voor straten, gemeenschappen, erfgoed en Sunday Walking Street.",
      },
      {
        title: "Stroll the Historic Roads in Phuket Old Town",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Articles/stroll-the-historic-roads-in-phuket-old-town",
        note: "Primaire context voor de wijk, lokale eetcultuur en wandelen.",
      },
      {
        title: "Weer in de provincie Phuket",
        creator: "Thai Meteorological Department",
        url: "https://www.tmd.go.th/weather/province/phuket",
        note: "Actuele primaire weer- en waarschuwingsbron.",
      },
      {
        title: "Routes en actuele vervoersinformatie",
        creator: "Phuket Smart Bus",
        url: "https://phuketsmartbus.com/",
        note: "Operatorinformatie voor actuele routecontrole.",
      },
      {
        title: "Reisadvies Thailand",
        creator: "NederlandWereldwijd",
        url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
        note: "Actueel Nederlands veiligheids- en verkeerskader.",
      },
    ],
    methodDescription:
      "Op 31 juli 2026 zelfstandig onderzocht met drie Nederlandse DataForSEO-clusters (165 records), vijf actuele Nederlandse SERP-sets met 29 echte PAA-vragen en primaire TAT-, TMD-, operator- en NederlandWereldwijd-bronnen. Vaste taxi- en marktprijzen, starre ritduren, niet-gecontroleerde venue-uren, superlatieven en culturele vereenvoudigingen uit de oude pagina zijn verwijderd.",
    sectionCopy: {
      zonesEyebrow: "Drie straatlenzen",
      zonesTitle: (
        <>
          Loop verder dan
          <br />
          één pastelstraat.
        </>
      ),
      zonesDescription:
        "De kern is compact, maar iedere straatgroep combineert handel, architectuur, verkeer en culturele stops anders.",
      rhythmEyebrow: "Eén wijk, vier momenten",
      rhythmTitle: (
        <>
          Old Town verandert
          <br />
          wanneer rolluiken opengaan.
        </>
      ),
      rhythmDescription:
        "Vroege straten, musea, schaduwrijke eetstops en een marktavond zijn verschillende ervaringen.",
      featureEyebrow: "Erfgoed in het dagelijks leven",
      seasonEyebrow: "Timing in de straten",
      seasonNote:
        "Dit zijn planningspatronen, geen garantie op opening. Controleer markt, locatie, weer en vervoer voor jouw dag.",
      comparisonEyebrow: "Kies eerst de reis, dan de basis",
      comparisonTitle: (
        <>
          Old Town is stadsleven.
          <br />
          Vergelijk de kust.
        </>
      ),
      comparisonDescription:
        "Een mooie erfgoedwandeling maakt de wijk niet automatisch de beste overnachtingsbasis.",
      safetyEyebrow: "Straatwijs & respectvol",
      safetyTitle: (
        <>
          Vertraag waar
          <br />
          de stad onhandig wordt.
        </>
      ),
      safetyDescription:
        "De stuurbare risico’s zijn gewoon: verkeer, hitte, regen, private ruimte en vervoer na je laatste stop.",
      bookingEyebrow: "Controleer wat nu klopt",
      bookingTitle: (
        <>
          Boek de route,
          <br />
          niet de ansichtkaart.
        </>
      ),
      bookingDescription:
        "Controleer voor tours, verblijf en vervoer de kaartpin, inhoud, bereikbaarheid, annulering en totaal.",
      methodTitle: "Een levende-stadgids, geen pastelchecklist.",
    },
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
