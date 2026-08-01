import {
  AlertTriangle,
  Bus,
  CalendarDays,
  Compass,
  Footprints,
  Hotel,
  MapPin,
  MoonStar,
  ShieldCheck,
  Sun,
  Sunrise,
  Sunset,
  TicketCheck,
  Users,
  Waves,
} from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import {
  PhuketAreaGuideTemplate,
  type PhuketAreaGuideData,
} from "./PhuketAreaGuideTemplate";

const HERO = "/images/redesign/kamala-area-hero-v2.webp";

export default function KamalaAreaGuideNl({
  hotelHref,
  activityHref,
}: {
  hotelHref?: string;
  activityHref?: string;
}) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, "kamala-owner-nl-hotels");
  const activities = withSubId(
    activityHref || KLOOK_GENERIC,
    "kamala-owner-nl-activities",
  );
  const data: PhuketAreaGuideData = {
    locale: "nl",
    pageUrl: "https://go2-thailand.com/nl/phuket/kamala/",
    alternateUrl: "https://go2-thailand.com/phuket/kamala/",
    updatedAt: "2026-07-31",
    area: "Kamala",
    title: "Kamala Beach Phuket: past Kamala bij jouw reis?",
    description:
      "Ontdek of Kamala Beach bij je Phuket-reis past. Vergelijk dorp en resortzones, gezinsfit, Kamala met Patong of Kata, seizoenen, veiligheid en actuele hotels.",
    heroImage: HERO,
    heroAlt:
      "Kamala Beach bij goud avondlicht met groene landtong, lokale boten en ontspannen reizigers",
    heroEyebrow: "De rustigere dorp- en resortbaai van Phuket",
    heroTitle: (
      <>
        Kamala Beach.
        <br />
        <span className="text-saffron-dark">Een zachter westkustritme.</span>
      </>
    ),
    heroSubtitle:
      "Dichtbij genoeg om te verkennen. Rustig genoeg om te blijven.",
    heroDescription:
      "Kamala beweegt tussen een bewoond dorp, gezinsgerichte resorts en een ontspannen strandritme. Het is rustiger dan Patong, maar noord, centrum en de zuidelijke heuvelrand leveren werkelijk andere verblijven op.",
    heroPrimary: { label: "Ontdek of Kamala past", href: "#fit" },
    heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass },
      { href: "#zones", label: "Zones", icon: MapPin },
      { href: "#beach", label: "Strand", icon: Waves },
      { href: "#season", label: "Beste reistijd", icon: CalendarDays },
      { href: "#plan", label: "Plan Kamala", icon: TicketCheck },
      { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: (
      <>
        Phuket op lager tempo.
        <br />
        Kies nog steeds de juiste rand.
      </>
    ),
    verdictDescription:
      "Kamala past sterk bij gezinnen, stellen en tragere reizen die strand en rustige avonden zoeken. Het past minder bij dicht nachtleven of bij reizigers die aannemen dat ieder resort binnen de loopradius van dorp en strand ligt.",
    fitCards: [
      {
        eyebrow: "Sterke match",
        title: "Gezinnen met rustiger ritme",
        copy: "Een strand-, zwembad- en eetroutine kan goed werken na controle van kamer, oversteken en actuele zeecondities.",
        icon: Users,
      },
      {
        eyebrow: "Sterke match",
        title: "Stellen die vertragen",
        copy: "Zonsondergang, resorttijd en eenvoudige diners kunnen de reis dragen zonder volle attractielijst.",
        icon: Sunset,
      },
      {
        eyebrow: "Voorwaardelijke match",
        title: "Verblijf zonder auto",
        copy: "Centraal Kamala kan praktisch zijn; heuvel- en buitenbaaihotels maken shuttles of ritten onderdeel van iedere dag.",
        icon: Footprints,
      },
      {
        eyebrow: "Kies iets anders",
        title: "Nachtleven voorop",
        copy: "Patong is de duidelijkere basis wanneer laat uitgaan en groot winkelaanbod centraal staan.",
        icon: MoonStar,
        tone: "dark",
      },
    ],
    editorialRule:
      "Kies Kamala voor het tempo en controleer daarna of je hotel echt verbonden is met dorp en strand — of er juist bewust los van ligt.",
    zones: [
      {
        title: "Noord-Kamala",
        eyebrow: "Resortgericht en meer losstaand",
        copy: "Past wanneer de accommodatie onderdeel van de bestemming is en je het dorp niet aan de deur nodig hebt.",
        check:
          "Bevestig hellingen, shuttletijden, ophaalpunten en de echte openbare strandroute.",
        image: HERO,
        imageAlt: "De groene noordelijke landtong en rustige kust van Kamala",
      },
      {
        title: "Centraal dorp & strand",
        eyebrow: "Het eenvoudigste dagelijkse ritme",
        copy: "Sterker voor lopen naar eten, diensten en strand terwijl de avonden rustig blijven.",
        check:
          "Bekijk ingang en recente geluidscontext in plaats van alleen de afstand tot het zand.",
        image: "/images/redesign/phuket-stay-kamala.webp",
        imageAlt: "De lage dorps- en strandbebouwing van Kamala",
      },
      {
        title: "Zuid-Kamala & heuvels",
        eyebrow: "Uitzicht met vervoersafweging",
        copy: "Sommige verblijven winnen privacy of hoogte, maar maken spontaan strandbezoek en dorpsdiners minder eenvoudig.",
        check:
          "Behandel een resortshuttle als dienstregeling, niet als permanente vrijheid van deur tot deur.",
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Groene kust en hoger gelegen resorts op Phuket",
      },
    ],
    dayParts: [
      {
        time: "Vroege ochtend",
        title: "Lees eerst de baai",
        copy: "Controleer vlaggen en loop langs het strand wanneer temperatuur en drukte lager zijn.",
        icon: Sunrise,
      },
      {
        time: "Middag",
        title: "Laat het hotel zijn plek verdienen",
        copy: "Gebruik schaduw, lunch en zwembad in plaats van de heetste uren volledig op onbeschut strand te vullen.",
        icon: Sun,
      },
      {
        time: "Zonsondergang",
        title: "Kamala’s natuurlijke hoofdmoment",
        copy: "Keer terug naar de westkust en houd het diner daarna binnen de bewust gekozen zone.",
        icon: Sunset,
      },
      {
        time: "Avond",
        title: "Ontspannen, niet leeg",
        copy: "Verwacht restaurants en rustige bars, niet de schaal van Patong. Plan vervoer vooraf voor een grotere avond elders.",
        icon: MoonStar,
      },
    ],
    beachTitle: "Een rustig ogende baai is geen veiligheidsbelofte.",
    beachDescription:
      "Kamala kan beschut lijken, maar zwemveiligheid verandert met wind, deining en stroming. Volg strandwachten, borden en vlaggen op de dag zelf. Houd bij ruwere moessonpatronen zwembad of landalternatief klaar.",
    beachChecks: [
      {
        title: "Vlaggen beslissen",
        copy: "Ga niet het water in bij rood, ook niet als anderen zwemmen of de lucht helder lijkt.",
        icon: AlertTriangle,
      },
      {
        title: "Houd actief toezicht",
        copy: "Gezinsvriendelijk beschrijft de gebiedsfit, niet gegarandeerd kindveilig water. Controleer golven en diepte telkens opnieuw.",
        icon: Users,
      },
      {
        title: "Controleer aanbieders",
        copy: "Bekijk bij boot- of wateractiviteiten briefing, uitrusting, verzekering en weersvoorwaarden vóór betaling.",
        icon: ShieldCheck,
      },
    ],
    seasonTitle: (
      <>
        Kies de reisstijl.
        <br />
        Controleer de echte verwachting.
      </>
    ),
    seasonDescription:
      "Brede westkustseizoenen helpen een reis vormen, maar korte TMD-verwachtingen en lokale zeecondities bepalen afzonderlijke strand- en bootdagen.",
    seasonRows: [
      {
        period: "dec–feb",
        conditions:
          "Vaak een sterker breed venster voor droger weer en rustiger strandplanning.",
        planning:
          "Vraag kan hoger zijn. Vergelijk actuele kamervoorwaarden en controleer dagelijks vlaggen.",
        cue: "Populair venster",
        highlight: true,
      },
      {
        period: "mrt–apr",
        conditions:
          "Warmere omstandigheden maken onbeschut lopen en middagstrand vermoeiender.",
        planning:
          "Begin vroeger en waardeer schaduw, zwembad en een compacte loopradius.",
        cue: "Plan voor hitte",
      },
      {
        period: "mei–okt",
        conditions:
          "Zuidwestmoesson kan buien, deining en groter stromingsrisico brengen.",
        planning:
          "Houd flexibele landdagen en behandel een rode vlag als harde stop.",
        cue: "Flexibel kustplan",
        highlight: true,
      },
      {
        period: "nov",
        conditions:
          "De overgang kan verbeterende reeksen en onrustige perioden mengen.",
        planning:
          "Beoordeel je data via de actuele vooruitblik, niet via een vaste maandclaim.",
        cue: "Controleer de week",
      },
    ],
    spokes: [
      {
        title: "Hotels in Kamala",
        copy: "Vergelijk micro-locatie, strandroute, kamertype en actuele annulering.",
        href: "/phuket/kamala/hotels/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Resortkust en hotelzones op Phuket",
        label: "Open de hotelgids",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        copy: "Bouw eilanddagen zonder te doen alsof iedere plek binnen Kamala ligt.",
        href: "/city/phuket/attractions/",
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Kust, uitzichtpunten en bezienswaardigheden op Phuket",
        label: "Ontdek bezienswaardigheden",
      },
      {
        title: "Actuele activiteiten",
        copy: "Vergelijk operator, ophaalplek, fysieke eisen en weersvoorwaarden voor je data.",
        href: activities,
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Tropische kust en dagtochtlandschap op Phuket",
        label: "Bekijk actuele opties",
        affiliate: true,
      },
      {
        title: "Waar verblijven op Phuket?",
        copy: "Vergelijk het rustige ritme van Kamala met andere praktische bases.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-stay-bang-tao.webp",
        imageAlt: "Resort- en strandgebied op Phuket",
        label: "Vergelijk alle gebieden",
      },
    ],
    comparisonCards: [
      {
        area: "Patong",
        fit: "Sterker voor nachtleven, winkelen en maximale toeristische infrastructuur.",
        href: "/phuket/patong/",
        image: "/images/redesign/phuket-stay-patong.webp",
        imageAlt: "Strand en bezoekersgebied van Patong",
      },
      {
        area: "Kata",
        fit: "Compacter van gevoel, drukker en sterker verbonden met seizoenssurf.",
        href: "/phuket/kata/",
        image: "/images/redesign/kata-area-hero-v2.webp",
        imageAlt: "De compacte baai van Kata Beach",
      },
      {
        area: "Karon",
        fit: "Langer en meer verspreid, met een bredere resort- en strandvoetafdruk.",
        href: "/phuket/karon/",
        image: "/images/redesign/karon-area-hero-v2.webp",
        imageAlt: "Het brede Karon Beach bij avondlicht",
      },
    ],
    safetyCards: [
      {
        title: "Zeecondities",
        copy: "Volg lokale vlaggen en strandwachten; ruw water en stroming kunnen zwemmen onveilig maken.",
        icon: Waves,
      },
      {
        title: "Heuvels & wegen",
        copy: "Bekijk echte looproutes en gebruik passend vervoer. Rijd alleen met correct rijbewijs, helm en dekking.",
        icon: Bus,
      },
      {
        title: "Respect voor de omgeving",
        copy: "Kamala combineert resorts met bewoonde buurten. Kleed en gedraag je buiten het strand respectvol.",
        icon: ShieldCheck,
      },
    ],
    bookingCards: [
      {
        title: "Hotels in Kamala",
        copy: "Vergelijk exacte pin, recente kamerfeedback, annulering en totaal voor je data.",
        href: hotels,
        label: "Bekijk actuele hotelprijzen",
        icon: Hotel,
        affiliate: true,
      },
      {
        title: "Activiteiten op Phuket",
        copy: "Controleer ophaalplek, operator, inclusies, fysieke eisen en weersbeleid vóór betaling.",
        href: activities,
        label: "Bekijk actuele activiteiten",
        icon: TicketCheck,
        affiliate: true,
      },
      {
        title: "Westkustbus",
        copy: "Controleer haltes, dienstregeling, bagage en betaalinformatie rechtstreeks bij de operator.",
        href: "https://phuketsmartbus.com/",
        label: "Open actuele businformatie",
        icon: Bus,
      },
    ],
    faqs: [
      {
        question: "Is Kamala Beach de moeite waard?",
        answer:
          "Kamala is het overwegen waard als een ontspannen strand- en resortbasis belangrijker is dan nachtleven of groot winkelaanbod. Buitenbaaihotels vragen wel een vervoerscheck.",
      },
      {
        question: "Is Kamala een goede plek om te verblijven?",
        answer:
          "Ja voor veel gezinnen, stellen en tragere reizen. Centraal Kamala ondersteunt een eenvoudiger loopritme; heuvel- en resortranden kunnen gemak inruilen voor uitzicht of afzondering.",
      },
      {
        question: "Is Kamala Beach beter dan Patong?",
        answer:
          "Kamala past doorgaans bij rustige avonden en resorttijd; Patong bij uitgaan, winkelen en geconcentreerde diensten. Kies op de dominante dagelijkse behoefte.",
      },
      {
        question: "Is Kamala Beach of Kata Beach beter?",
        answer:
          "Kamala is vaak rustiger en meer dorp- en resortgericht. Kata voelt compacter, bezoekersgerichter en sterker gekoppeld aan seizoenssurf. Vergelijk toegang, avondritme en geplande eilandritten.",
      },
      {
        question: "Is er veel te doen in Kamala?",
        answer:
          "Kamala werkt het best wanneer strand, zwembad, eten en een trager ritme voordelen zijn. Plan voor een lange attractielijst selectieve Phuket-dagtochten en controleer ophaalzones.",
      },
      {
        question: "Heeft Kamala Beach nachtleven?",
        answer:
          "Kamala heeft restaurants en rustige bars, maar niet de late concentratie van Patong. Plan vervoer vooraf wanneer een grotere avond elders onderdeel van de reis is.",
      },
      {
        question: "Is Kamala Beach geschikt voor gezinnen?",
        answer:
          "Dat kan met passende resorts en een rustig tempo. Controleer kamer, zwembadtoezicht, oversteken, looproute en dagelijkse zeecondities in plaats van op het label te vertrouwen.",
      },
      {
        question: "Kun je zwemmen bij Kamala Beach?",
        answer:
          "Alleen wanneer actuele condities en lokale vlaggen dat toelaten. Wind, deining en muistromen veranderen; blijf uit zee bij een rode vlag.",
      },
    ],
    faqDescription:
      "Gebaseerd op zes actuele Nederlandse SERP-sets met 33 echte PAA-vermeldingen en zichtbare Google-NL-controle op 31 juli 2026. Antwoorden vermijden vaste prijzen, afstanden, tijden en universele veiligheidsclaims.",
    related: [
      {
        title: "Complete Phuket-gids",
        description: "Bouw de eilandroute voordat je één kust kiest.",
        href: "/city/phuket/",
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Kust en tropische baai op Phuket",
      },
      {
        title: "Waar verblijven op Phuket?",
        description: "Vergelijk Kamala met alle belangrijke hotelzones.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Resortkust en verblijfszones op Phuket",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        description: "Plan eilandbrede plekken los van de Kamala-owner.",
        href: "/city/phuket/attractions/",
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Bezienswaardigheden en uitzichtpunten op Phuket",
      },
    ],
    sources: [
      {
        title: "Phuket",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350",
        note: "Officiële Phuket-context en advies over strandvlaggen.",
      },
      {
        title: "Weer in Phuket",
        creator: "Thai Meteorological Department",
        url: "https://www.tmd.go.th/weather/province/phuket",
        note: "Primaire actuele weer- en vooruitblikbron.",
      },
      {
        title: "Routes, dienstregeling en live tracking",
        creator: "Phuket Smart Bus",
        url: "https://phuketsmartbus.com/",
        note: "Actuele informatie van de westkustvervoerder.",
      },
      {
        title: "Reisadvies Thailand",
        creator: "NederlandWereldwijd",
        url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
        note: "Actueel Nederlands strand-, weg- en veiligheidskader.",
      },
    ],
    methodDescription:
      "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters (45 keywordrecords, geen bruikbare concurrentdomeinen), zes actuele SERP-sets met 50 organische resultaten en 33 PAA-vermeldingen, zichtbare Google-NL-controle en vier primaire bronnen. Vaste prijzen, afstanden, tijden, percentages, hotelclaims, resortaantallen, religieuze generalisaties, lifeguarduren en universele veiligheidsclaims zijn verwijderd.",
    sectionCopy: {
      zonesEyebrow: "Drie Kamala’s",
      zonesTitle: (
        <>
          Rustig aan zee.
          <br />
          Anders per hotelpin.
        </>
      ),
      zonesDescription:
        "Noord, centrum en zuidelijke heuvels veranderen je loopradius, avondritme en vervoersbehoefte.",
      rhythmEyebrow: "Een zachter dagritme",
      rhythmTitle: (
        <>
          Begin bij de baai.
          <br />
          Laat de middag vertragen.
        </>
      ),
      rhythmDescription:
        "Kamala wordt sterker wanneer strand, zwembad en een eenvoudige avond samen genoeg mogen zijn.",
      featureEyebrow: "Rustige uitstraling zonder zwemgarantie",
      seasonEyebrow: "Brede seizoenen, actuele beslissing",
      seasonNote:
        "Dit zijn patronen, geen weer- of zwemgarantie. Controleer TMD en lokale vlaggen.",
      comparisonEyebrow: "Kies je dagelijkse behoefte",
      comparisonTitle: (
        <>
          Rustiger resortritme
          <br />
          of meer concentratie?
        </>
      ),
      comparisonDescription:
        "Vergelijk Kamala met Patong, Kata en Karon op wat je iedere dag wilt herhalen.",
      safetyEyebrow: "Water, wegen en gemeenschap",
      safetyTitle: (
        <>
          Lager tempo.
          <br />
          Blijf aandachtig.
        </>
      ),
      safetyDescription:
        "Zeecondities, heuvelroutes en respect voor bewoonde buurten bepalen de echte ervaring.",
      bookingEyebrow: "Controleer wat nu klopt",
      bookingTitle: (
        <>
          Boek de verbinding,
          <br />
          niet alleen Kamala.
        </>
      ),
      bookingDescription:
        "Controleer pin, ingang, kamer, shuttle, voorwaarden, ophaalplek en totaal voor jouw data.",
      methodTitle: "Een keuzehulp voor Kamala, geen universeel familielabel.",
    },
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
