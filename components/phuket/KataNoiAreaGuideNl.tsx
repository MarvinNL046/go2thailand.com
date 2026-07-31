import {
  Bus,
  CalendarDays,
  CheckCircle2,
  Compass,
  Footprints,
  Hotel,
  MapPin,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  TicketCheck,
  Umbrella,
  Users,
  Waves,
} from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import {
  PhuketAreaGuideTemplate,
  type PhuketAreaGuideData,
} from "./PhuketAreaGuideTemplate";

const HERO = "/images/redesign/kata-noi-area-hero-v2.webp";

export default function KataNoiAreaGuideNl({
  hotelHref,
  activityHref,
}: {
  hotelHref?: string;
  activityHref?: string;
}) {
  const hotels = withSubId(
    hotelHref || TRIP_GENERIC,
    "kata-noi-owner-nl-hotels",
  );
  const activities = withSubId(
    activityHref || KLOOK_GENERIC,
    "kata-noi-owner-nl-activities",
  );
  const data: PhuketAreaGuideData = {
    locale: "nl",
    pageUrl: "https://go2-thailand.com/nl/phuket/kata/kata-noi/",
    alternateUrl: "https://go2-thailand.com/phuket/kata/kata-noi/",
    updatedAt: "2026-07-31",
    area: "Kata Noi",
    title: "Kata Noi Beach Phuket: past de kleine baai bij jou?",
    description:
      "Ontdek of Kata Noi Beach bij je Phuket-reis past. Vergelijk zones, toegang tot Kata, zeecondities, gezinsfit, beperkt lokaal aanbod en actuele hotels.",
    heroImage: HERO,
    heroAlt:
      "De compacte boog van Kata Noi Beach met groene landtongen en lage resorts in zacht ochtendlicht",
    heroEyebrow: "De kleinere zuidelijke baai naast Kata",
    heroTitle: (
      <>
        Kata Noi.
        <br />
        <span className="text-saffron-dark">
          Een compacte baai, met compacte keuzes.
        </span>
      </>
    ),
    heroSubtitle: "Kies de baai — en accepteer de afweging.",
    heroDescription:
      "Kata Noi biedt een meer besloten strandritme dan main Kata, maar minder onafhankelijke keuze en meer afhankelijkheid van je accommodatie. Het past wanneer rustige strandtijd zwaarder telt dan een breed dorp aan de deur.",
    heroPrimary: { label: "Ontdek of Kata Noi past", href: "#fit" },
    heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass },
      { href: "#zones", label: "Baai-zones", icon: MapPin },
      { href: "#beach", label: "Strandrealiteit", icon: Waves },
      { href: "#season", label: "Beste reistijd", icon: CalendarDays },
      { href: "#plan", label: "Plan je verblijf", icon: TicketCheck },
      { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: (
      <>
        Een rustiger strandritme.
        <br />
        Geen vervanging voor een compleet dorp.
      </>
    ),
    verdictDescription:
      "Kata Noi is op zijn sterkst voor reizigers die strand en accommodatie centraal zetten. Main Kata is sterker wanneer restaurants, winkels, surfscholen en een bredere avondroute iedere dag belangrijk zijn.",
    fitCards: [
      {
        eyebrow: "Sterke match",
        title: "Stellen met strandfocus",
        copy: "Past wanneer een besloten baai, rustige avonden en de exacte accommodatie-ervaring het doel van de reis zijn.",
        icon: Sparkles,
      },
      {
        eyebrow: "Sterke match",
        title: "Rustige resortgezinnen",
        copy: "Kan werken met de juiste kamer, zwembad en voorzieningen, na controle van actuele gezinsvoorwaarden en veilige zeecondities.",
        icon: Users,
      },
      {
        eyebrow: "Voorwaardelijke match",
        title: "Terugkerende Phuket-reizigers",
        copy: "Een goede reset als je het eiland al kent en geen brede eerste-keer-basis nodig hebt.",
        icon: CheckCircle2,
      },
      {
        eyebrow: "Kies iets anders",
        title: "Variatie voorop",
        copy: "Kies main Kata wanneer onafhankelijke restaurants, winkels, surfscholen en avondkeuze beloopbaar moeten zijn.",
        icon: MoonStar,
        tone: "dark",
      },
    ],
    editorialRule:
      "Boek Kata Noi voor de besloten baai-ervaring — niet omdat een oud artikel een vast drukteniveau, hotelaantal, kamerprijs of permanent rustige zee belooft.",
    zones: [
      {
        title: "Noordelijke toegang",
        eyebrow: "Dichter bij de Kata-verbinding",
        copy: "Handig wanneer bewegen tussen beide baaien belangrijker is dan volledig in het resortritme blijven.",
        check:
          "Teken weg, helling, stoep en avondroute vanaf de exacte hotelpin uit.",
        image: "/images/redesign/kata-area-hero-v2.webp",
        imageAlt: "Kata Bay bij de toegang richting Kata Noi",
      },
      {
        title: "Centrale baairand",
        eyebrow: "Strandritme voorop",
        copy: "Past wanneer directe strandtoegang en accommodatievoorzieningen het grootste deel van de dag dragen.",
        check:
          "Controleer of jouw kamercategorie — niet alleen het resort — de getoonde toegang, ligging en inclusies heeft.",
        image: HERO,
        imageAlt: "De centrale baai en resortrand van Kata Noi Beach",
      },
      {
        title: "Zuidelijke & heuvelrand",
        eyebrow: "Uitzicht met meer logistiek",
        copy: "Hogere of randaccommodaties kunnen vlakke toegang inruilen voor uitzicht, privacy of een andere aankomstroute.",
        check:
          "Controleer trappen, oversteken, shuttle-afhankelijkheid en de echte route naar openbare strandtoegang.",
        image: "/images/redesign/phuket-stay-kata-karon.webp",
        imageAlt: "Heuvelaccommodaties en tropisch groen in zuidelijk Phuket",
      },
    ],
    dayParts: [
      {
        time: "Vroege ochtend",
        title: "Lees de baai voordat je neerstrijkt",
        copy: "Controleer vlaggen, golven, toegangen en hoe het strand die dag werkelijk wordt gebruikt.",
        icon: Sunrise,
      },
      {
        time: "Middag",
        title: "Laat schaduw en hotel meetellen",
        copy: "Door het beperktere lokale aanbod worden zwembad, kamer, eten en schaduw belangrijker dan alleen de gebiedsnaam.",
        icon: Sun,
      },
      {
        time: "Late middag",
        title: "Vergelijk zee- en wegplan",
        copy: "Gebruik het strand alleen als condities passen; kies anders zwembad, uitzichtpunt of geverifieerd landalternatief.",
        icon: Sunset,
      },
      {
        time: "Avond",
        title: "Rustig blijven of naar main Kata",
        copy: "Blijf lokaal voor een besloten avond of plan de echte terugroute als je meer keuze in main Kata zoekt.",
        icon: MoonStar,
      },
    ],
    beachTitle: "Een mooie baai is geen zwemgarantie.",
    beachDescription:
      "De beschutte vorm op foto’s zegt niet hoe golven, stroming en surfcondities op jouw dag zijn. Zwemgeschiktheid volgt uit actuele condities, vlaggen en strandwachten — niet uit seizoenscopy of een hotelbeschrijving.",
    beachChecks: [
      {
        title: "Volg vlaggen en strandwachten",
        copy: "Ga niet het water in bij rood en vraag lokaal wanneer condities of bewaakte zones onduidelijk zijn.",
        icon: ShieldCheck,
      },
      {
        title: "Scheid zwemmen van surfen",
        copy: "Een periode die ervaren surfers aantrekt kan ongeschikt zijn voor gewone zwemmers of beginners.",
        icon: Waves,
      },
      {
        title: "Houd kinderen dichtbij",
        copy: "Een compact strand en rustig ogende rand nemen branding, stroming of wisselende diepte niet weg.",
        icon: Users,
      },
    ],
    seasonTitle: (
      <>
        Kies een breed venster.
        <br />
        Beoordeel de echte zee.
      </>
    ),
    seasonDescription:
      "Brede Andamanpatronen helpen verwachtingen vormen, maar beloven geen kalme week, surfsessie of veilig zwemwater op een bepaalde dag.",
    seasonRows: [
      {
        period: "dec–feb",
        conditions:
          "Vaak een sterker breed venster voor droger weer en strandgerichte plannen.",
        planning:
          "Vraag kan stijgen; vergelijk actuele kamervoorwaarden en controleer dagelijks de vlaggen.",
        cue: "Populair venster",
        highlight: true,
      },
      {
        period: "mrt–apr",
        conditions:
          "Warmere omstandigheden maken de wegverbinding en het onbeschutte strand vermoeiender.",
        planning: "Geef schaduw, water en kortere loopmomenten voorrang.",
        cue: "Plan voor hitte",
      },
      {
        period: "mei–okt",
        conditions:
          "Moessonpatronen kunnen regen, grotere golven, stroming en wisselende strandcondities brengen.",
        planning:
          "Houd zwembad en landalternatieven; surf is nooit bewijs dat zwemmen veilig is.",
        cue: "Flexibel strandplan",
        highlight: true,
      },
      {
        period: "nov",
        conditions:
          "De overgang kan verbeterende perioden en onrustige dagen mengen.",
        planning:
          "Gebruik actuele TMD-verwachtingen en lokale informatie in plaats van een maandbelofte.",
        cue: "Controleer de week",
      },
    ],
    spokes: [
      {
        title: "Main Kata",
        copy: "Vergelijk de besloten baai met het bredere dorp, strand en avondaanbod ernaast.",
        href: "/phuket/kata/",
        image: "/images/redesign/kata-area-hero-v2.webp",
        imageAlt: "De baai van main Kata Beach",
        label: "Vergelijk main Kata",
      },
      {
        title: "Hotels in Kata",
        copy: "Ga pas naar de hotelshortlist nadat je hebt gekozen welke kant van Kata past.",
        href: "/phuket/kata/hotels/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Hotel- en resortzones op Phuket",
        label: "Open de hotelgids",
      },
      {
        title: "Surfen bij Kata",
        copy: "Houd niveau, seizoen, lessen en veiligheid bij de specialistische surfowner.",
        href: "/phuket/kata/surfing/",
        image: "/images/redesign/kata-surfing-hero-v2.webp",
        imageAlt: "Surfen in seizoenscondities bij Kata",
        label: "Plan surfen",
      },
      {
        title: "Actuele Phuket-activiteiten",
        copy: "Vergelijk operator, ophaalplek, inclusies, weersbeleid en annulering op live aanbod.",
        href: activities,
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Kustactiviteiten en uitzichtpunten op Phuket",
        label: "Bekijk actuele opties",
        affiliate: true,
      },
    ],
    comparisonCards: [
      {
        area: "Main Kata",
        fit: "Meer onafhankelijke keuze, toegang tot surfscholen en een breder bezoekersdorp.",
        href: "/phuket/kata/",
        image: "/images/redesign/kata-area-hero-v2.webp",
        imageAlt: "Main Kata Beach",
      },
      {
        area: "Nai Harn",
        fit: "Een rustig alternatief in zuidelijk Phuket met een andere baai, groene omgeving en lokaal ritme.",
        href: "/phuket/nai-harn/",
        image: "/images/redesign/nai-harn-area-hero-v2.webp",
        imageAlt: "Nai Harn Beach",
      },
      {
        area: "Karon",
        fit: "Een langer traditioneel resortstrand met meer ruimte en andere avondlogistiek.",
        href: "/phuket/karon/",
        image: "/images/redesign/karon-area-hero-v2.webp",
        imageAlt: "Karon Beach",
      },
    ],
    safetyCards: [
      {
        title: "Zeecondities",
        copy: "Volg vlaggen en strandwachten, houd toezicht op kinderen en blijf uit zee bij onveilige condities.",
        icon: Waves,
      },
      {
        title: "Heuvels & wegen",
        copy: "Controleer hellingen en looproutes vóór boeken; gebruik passend vervoer en verkeersveiligheidsmaatregelen.",
        icon: Footprints,
      },
      {
        title: "Zon & hitte",
        copy: "Gebruik schaduw, voldoende drinken en zonbescherming, ook als wind of bewolking blootstelling mild laat voelen.",
        icon: Umbrella,
      },
    ],
    bookingCards: [
      {
        title: "Hotels in Kata Noi",
        copy: "Vergelijk exacte pin, kamercategorie, toegang, recente feedback, annulering en totaal voor je data.",
        href: hotels,
        label: "Bekijk actuele hotelprijzen",
        icon: Hotel,
        affiliate: true,
      },
      {
        title: "Activiteiten op Phuket",
        copy: "Controleer ophaalzone, operator, inclusies, weersvoorwaarden en terugplan vóór betaling.",
        href: activities,
        label: "Bekijk actuele activiteiten",
        icon: TicketCheck,
        affiliate: true,
      },
      {
        title: "Actueel vervoer",
        copy: "Controleer route en haltes bij de operator en teken daarna de laatste verbinding naar Kata Noi uit.",
        href: "https://phuketsmartbus.com/",
        label: "Open actuele businformatie",
        icon: Bus,
      },
    ],
    faqs: [
      {
        question: "Is Kata Noi Beach een bezoek waard?",
        answer:
          "Ja als een compact, strandgericht bezoek of verblijf past. Het is minder geschikt wanneer je veel onafhankelijke restaurants, winkels of nachtleven nodig hebt.",
      },
      {
        question: "Wat is het verschil tussen Kata Beach en Kata Noi?",
        answer:
          "Kata Noi is de kleinere zuidelijke baai met een meer accommodatiegericht ritme. Main Kata heeft een breder bezoekersdorp, meer onafhankelijke keuze en betere toegang tot surfscholen.",
      },
      {
        question: "Kun je van Kata naar Kata Noi lopen?",
        answer:
          "Er is een wegverbinding, maar de ervaring hangt af van startpunt, helling, stoep, hitte en verkeer. Bekijk de exacte route in plaats van een oude vaste looptijd.",
      },
      {
        question: "Kun je zwemmen bij Kata Noi Beach?",
        answer:
          "Alleen wanneer actuele condities, vlaggen en strandwachten dat toelaten. Seizoenspatronen garanderen geen veilig zwemmen op een bepaalde dag.",
      },
      {
        question: "Is Kata Noi geschikt voor gezinnen?",
        answer:
          "Dat kan met een passende kamer, zwembad en voorzieningen plus nauw toezicht bij zee. Gezinnen die veel beloopbare onafhankelijke keuze willen, passen mogelijk beter bij main Kata.",
      },
      {
        question: "Waar kun je het beste verblijven bij Kata Noi?",
        answer:
          "Kies op exacte kaartpin, kamercategorie, helling en echte route naar openbare strandtoegang. Leid toegang of uitzicht niet af uit alleen de resortnaam.",
      },
      {
        question: "Heeft Kata Noi restaurants?",
        answer:
          "Er zijn eetopties in en rond het gebied, maar minder dan in main Kata en bedrijven veranderen. Controleer actuele kaart, menu, dieetinfo en opening voordat je op één plek rekent.",
      },
      {
        question: "Kun je surfen bij Kata Noi?",
        answer:
          "Surf kan voorkomen als deining en condities passen, maar is geen gegarandeerde of automatisch beginnersgeschikte sessie. Gebruik main Kata voor een bredere les- en schoolzoekvraag.",
      },
    ],
    faqDescription:
      "Gebaseerd op zes actuele Nederlandse SERP-sets met 33 echte PAA-vermeldingen en zichtbare Google-NL-controle op 31 juli 2026. Vaste tarieven, looptijden, prijzen en zwemgaranties zijn uitgesloten.",
    related: [
      {
        title: "Kata gebiedsgids",
        description:
          "Vergelijk het bredere dorp en strand voordat je de kleinere baai kiest.",
        href: "/phuket/kata/",
        image: "/images/redesign/kata-area-hero-v2.webp",
        imageAlt: "De baai van Kata Beach",
      },
      {
        title: "Waar verblijven op Phuket?",
        description:
          "Vergelijk Kata Noi met de belangrijkste hotelzones van het eiland.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Verblijfszones op Phuket",
      },
      {
        title: "Complete Phuket-gids",
        description:
          "Bouw de eilandroute rond realistische beweging tussen kust en stad.",
        href: "/city/phuket/",
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Kust en bestemmingscontext van Phuket",
      },
    ],
    sources: [
      {
        title: "Phuket",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350",
        note: "Officiële bestemmings- en strandcontext.",
      },
      {
        title: "Weer in Phuket",
        creator: "Thai Meteorological Department",
        url: "https://www.tmd.go.th/weather/province/phuket",
        note: "Primaire actuele weerbron.",
      },
      {
        title: "Routes, dienstregeling en live tracking",
        creator: "Phuket Smart Bus",
        url: "https://phuketsmartbus.com/",
        note: "Actuele vervoersinformatie van de operator.",
      },
      {
        title: "Reisadvies Thailand",
        creator: "NederlandWereldwijd",
        url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
        note: "Actueel Nederlands strand-, verkeer- en veiligheidskader.",
      },
    ],
    methodDescription:
      "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters (89 keywordrecords), 100 concurrentdomeinen, zes actuele SERP-sets met 47 organische resultaten en 33 PAA-vermeldingen, zichtbare Google-NL-controle en vier primaire bronnen. Strandlengte, hotel- en restauranttellingen, resortclaims, vaste loop- en ritprijzen of -tijden, kamerprijzen, surf-, drukte- en zwemgaranties zijn verwijderd.",
    sectionCopy: {
      zonesEyebrow: "Drie micro-locaties",
      zonesTitle: (
        <>
          Eén kleine baai.
          <br />
          Drie verschillende routes.
        </>
      ),
      zonesDescription:
        "Toegang tot main Kata, strand en helling veranderen per exacte hotelpin.",
      rhythmEyebrow: "Een besloten dagritme",
      rhythmTitle: (
        <>
          Laat strand en hotel
          <br />
          samen het verblijf dragen.
        </>
      ),
      rhythmDescription:
        "Door minder onafhankelijk aanbod telt de kwaliteit van je dagelijkse looproute en accommodatie zwaarder.",
      featureEyebrow: "Mooie baai zonder zwemgarantie",
      seasonEyebrow: "Brede patronen, actuele beslissing",
      seasonNote:
        "Dit zijn patronen, geen weer-, surf- of zwemgarantie. Controleer TMD en lokale vlaggen.",
      comparisonEyebrow: "Accepteer de afweging",
      comparisonTitle: (
        <>
          Besloten baai
          <br />
          of meer keuze?
        </>
      ),
      comparisonDescription:
        "Vergelijk Kata Noi met main Kata, Nai Harn en Karon op je dagelijkse behoefte aan zelfstandige voorzieningen.",
      safetyEyebrow: "Zee, helling en hitte",
      safetyTitle: (
        <>
          Klein voelt overzichtelijk.
          <br />
          Blijf praktisch.
        </>
      ),
      safetyDescription:
        "Watercondities en de echte weg naar strand of main Kata blijven doorslaggevend.",
      bookingEyebrow: "Controleer de exacte accommodatie",
      bookingTitle: (
        <>
          Boek de kamer en route,
          <br />
          niet alleen de baai.
        </>
      ),
      bookingDescription:
        "Controleer pin, kamercategorie, toegang, voorwaarden, terugroute en totaal voor jouw data.",
      methodTitle: "Een keuzehulp voor Kata Noi, geen rustbelofte.",
    },
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
