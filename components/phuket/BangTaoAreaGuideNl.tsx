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
  Umbrella,
  Users,
  Waves,
} from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import {
  PhuketAreaGuideTemplate,
  type PhuketAreaGuideData,
} from "./PhuketAreaGuideTemplate";

const HERO = "/images/redesign/bang-tao-area-hero-v2.webp";

export default function BangTaoAreaGuideNl({
  hotelHref,
  activityHref,
}: {
  hotelHref?: string;
  activityHref?: string;
}) {
  const hotels = withSubId(
    hotelHref || TRIP_GENERIC,
    "bang-tao-owner-nl-hotels",
  );
  const activities = withSubId(
    activityHref || KLOOK_GENERIC,
    "bang-tao-owner-nl-activities",
  );
  const data: PhuketAreaGuideData = {
    locale: "nl",
    pageUrl: "https://go2-thailand.com/nl/phuket/bang-tao/",
    alternateUrl: "https://go2-thailand.com/phuket/bang-tao/",
    updatedAt: "2026-07-31",
    area: "Bang Tao",
    title: "Bang Tao Beach Phuket: past Bang Tao bij jouw reis?",
    description:
      "Ontdek of Bang Tao Beach bij je Phuket-reis past. Vergelijk Laguna, Boat Avenue en strandzones, gezinsfit, seizoenen, veiligheid en actuele hotels.",
    heroImage: HERO,
    heroAlt:
      "Bang Tao Beach bij goud avondlicht met resortgroen en reizigers langs de zee",
    heroEyebrow: "De ruime resort- en lifestylekust van Phuket",
    heroTitle: (
      <>
        Bang Tao Beach.
        <br />
        <span className="text-saffron-dark">
          Ruimte, comfort, grotere radius.
        </span>
      </>
    ),
    heroSubtitle: "Kies eerst het juiste cluster — daarna pas het resort.",
    heroDescription:
      "Bang Tao combineert een uitgestrekt westkuststrand, het groene Laguna-gebied en de eet- en winkelomgeving rond Boat Avenue. Die variatie is de kracht, maar maakt micro-locatie en vervoer extra belangrijk.",
    heroPrimary: { label: "Ontdek of Bang Tao past", href: "#fit" },
    heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass },
      { href: "#zones", label: "Zones", icon: MapPin },
      { href: "#beach", label: "Strand", icon: Waves },
      { href: "#season", label: "Beste reistijd", icon: CalendarDays },
      { href: "#plan", label: "Plan Bang Tao", icon: TicketCheck },
      { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: (
      <>
        Resortgemak.
        <br />
        Afstanden op gebiedsniveau.
      </>
    ),
    verdictDescription:
      "Bang Tao past sterk bij gezinnen, stellen en reizigers die een verzorgde eetomgeving en een ruim kustgevoel waarderen. Het past minder bij een compacte loopbasis, een budgetreis of nachtleven aan de voordeur.",
    fitCards: [
      {
        eyebrow: "Sterke match",
        title: "Gezinnen met resort als basis",
        copy: "Zwembad, strand en voorzieningen op één plek kunnen de week vereenvoudigen — na controle van kamer, oversteken en zeecondities.",
        icon: Users,
      },
      {
        eyebrow: "Sterke match",
        title: "Stellen voor strand en eten",
        copy: "Sterk wanneer ontspannen resorttijd en een bredere restaurantscene zwaarder wegen dan een compacte oude stad.",
        icon: Sunset,
      },
      {
        eyebrow: "Voorwaardelijke match",
        title: "Reizen zonder auto",
        copy: "Eén bewust gekozen cluster kan goed werken. Tussen strand, Laguna en de binnenlandse venues is een realistisch vervoerplan nodig.",
        icon: Footprints,
      },
      {
        eyebrow: "Kies iets anders",
        title: "Compact budget of nachtleven",
        copy: "Patong biedt dichter nachtleven en meer diensten; Kata voelt compacter als strandplaats.",
        icon: MoonStar,
        tone: "dark",
      },
    ],
    editorialRule:
      "Boek ‘Bang Tao’ niet alsof het één loopbare buurt is. Pin je hotel, favoriete stranddeel en avondcluster en controleer daarna de verbindingen.",
    zones: [
      {
        title: "Zuid-Bang Tao",
        eyebrow: "Lokaler en meer beachclubenergie",
        copy: "Een gemengdere rand waar strandvenues, kleinere verblijven en lokale straten dichter bij elkaar kunnen liggen dan binnen Laguna.",
        check:
          "Controleer actuele toegang en kamergeluid; strandbedrijven en verkeerspatronen veranderen.",
        image: "/images/redesign/phuket-stay-bang-tao.webp",
        imageAlt: "Resort- en strandsfeer in Bang Tao",
      },
      {
        title: "Laguna & Boat Avenue-orbit",
        eyebrow: "Verzorgd en op gemak gericht",
        copy: "De duidelijkste match voor reizigers die resortinfrastructuur en een brede eet- en winkelomgeving waarderen.",
        check:
          "Bevestig resortvervoer voor jouw data en uren; Boat Avenue ligt landinwaarts en is geen boulevard aan zee.",
        image: HERO,
        imageAlt: "Groene resortkust en strand van Bang Tao",
      },
      {
        title: "Noord-Bang Tao & richting Layan",
        eyebrow: "Meer ruimte, minder spontane stops",
        copy: "Rustiger en resortgerichter wanneer afzondering en tijd op de accommodatie belangrijker zijn dan lopen naar veel restaurants.",
        check:
          "Breng elke terugkerende rit in kaart en controleer ophaalmogelijkheden vóór je een afgelegen pin kiest.",
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Rustige noordkust van Phuket met tropisch groen",
      },
    ],
    dayParts: [
      {
        time: "Vroege ochtend",
        title: "Gebruik de lange kustlijn",
        copy: "Loop je eigen stranddeel en lees de vlaggen voordat je zwemmen of een activiteit plant.",
        icon: Sunrise,
      },
      {
        time: "Middag",
        title: "Laat het resort frictie wegnemen",
        copy: "Zwembad, schaduw en lunch dichtbij zijn waardevoller dan steeds het brede gebied doorkruisen in de hitte.",
        icon: Sun,
      },
      {
        time: "Late middag",
        title: "Keer terug naar de westkust",
        copy: "Gebruik zonsondergang als anker en ga daarna alleen naar het avondcluster dat je vooraf koos.",
        icon: Sunset,
      },
      {
        time: "Avond",
        title: "Eten boven clubhoppen",
        copy: "Bang Tao heeft verzorgde restaurants en strandvenues, maar niet Patongs geconcentreerde late district.",
        icon: MoonStar,
      },
    ],
    beachTitle: "Een lang strand met plaatselijk andere condities.",
    beachDescription:
      "Verschillende delen kunnen echt anders aanvoelen en geen seizoen garandeert veilig zwemmen. Wind, deining en muistromen veranderen het water; volg strandwachten, borden en vlaggen op jouw exacte stranddeel.",
    beachChecks: [
      {
        title: "Controleer jouw stranddeel",
        copy: "Condities en toegang kunnen langs de baai verschillen. Beoordeel opnieuw wanneer je verplaatst.",
        icon: Waves,
      },
      {
        title: "Rood betekent stoppen",
        copy: "Ga niet het water in bij een rode vlag, ongeacht de lucht, planning of andere zwemmers.",
        icon: AlertTriangle,
      },
      {
        title: "Controleer iedere aanbieder",
        copy: "Bekijk briefing, uitrusting, verzekering, inclusies en annuleringsvoorwaarden bij slecht weer.",
        icon: ShieldCheck,
      },
    ],
    seasonTitle: (
      <>
        Kies het reisvenster.
        <br />
        Controleer de echte kust.
      </>
    ),
    seasonDescription:
      "Westkustseizoenen vormen het brede plan. De actuele TMD-verwachting, waarschuwingen en lokale vlaggen bepalen afzonderlijke zwem- en bootdagen.",
    seasonRows: [
      {
        period: "dec–feb",
        conditions:
          "Vaak een sterker breed venster voor droger weer en rustiger strandplanning.",
        planning:
          "Populaire resortdata kunnen druk zijn. Vergelijk actuele voorwaarden en zeecondities.",
        cue: "Populair venster",
        highlight: true,
      },
      {
        period: "mrt–apr",
        conditions:
          "Hitte en luchtvochtigheid kunnen lange wandelingen en open middagen beperken.",
        planning:
          "Begin eerder en waardeer schaduw, zwembad en een korte hotel-strandroute.",
        cue: "Plan voor hitte",
      },
      {
        period: "mei–okt",
        conditions:
          "Zuidwestmoesson kan buien, wind, deining en groter stromingsrisico brengen.",
        planning:
          "Houd landalternatieven klaar en behandel een rode vlag als harde stop.",
        cue: "Flexibel kustplan",
        highlight: true,
      },
      {
        period: "nov",
        conditions:
          "De overgang kan verbeterende reeksen mengen met onrustige perioden.",
        planning:
          "Gebruik de actuele verwachting en beloof geen vast maandgedrag.",
        cue: "Controleer de week",
      },
    ],
    spokes: [
      {
        title: "Hotels in Bang Tao",
        copy: "Vergelijk op micro-zone, strandroute, kamertype en actuele voorwaarden.",
        href: "/phuket/bang-tao/hotels/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Resortkust en verblijfszones op Phuket",
        label: "Open de hotelgids",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        copy: "Plan eilandbrede plekken los van deze gebiedspagina.",
        href: "/city/phuket/attractions/",
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Kust, uitzichtpunten en bezienswaardigheden op Phuket",
        label: "Ontdek bezienswaardigheden",
      },
      {
        title: "Actuele activiteiten",
        copy: "Vergelijk ophaalplek, aanbieder, fysieke eisen en weersvoorwaarden.",
        href: activities,
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Tropische kust en dagtochtlandschap op Phuket",
        label: "Bekijk actuele opties",
        affiliate: true,
      },
      {
        title: "Waar verblijven op Phuket?",
        copy: "Vergelijk Bang Tao met de andere praktische bases op het eiland.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-stay-kata-karon.webp",
        imageAlt: "Hotelgebieden aan de westkust van Phuket",
        label: "Vergelijk alle gebieden",
      },
    ],
    comparisonCards: [
      {
        area: "Patong",
        fit: "Sterker voor nachtleven, winkelen en dicht opeengepakte bezoekersdiensten.",
        href: "/phuket/patong/",
        image: "/images/redesign/phuket-stay-patong.webp",
        imageAlt: "Stranddistrict van Patong",
      },
      {
        area: "Kata",
        fit: "Compacter van gevoel en sterker verbonden met seizoenssurf.",
        href: "/phuket/kata/",
        image: "/images/redesign/kata-area-hero-v2.webp",
        imageAlt: "De compacte baai van Kata Beach",
      },
      {
        area: "Kamala",
        fit: "Een kalmere dorp- en resortbaai met een kleinere totale voetafdruk.",
        href: "/phuket/kamala/",
        image: "/images/redesign/kamala-area-hero-v2.webp",
        imageAlt: "Kamala Beach bij goud avondlicht",
      },
    ],
    safetyCards: [
      {
        title: "Zeecondities",
        copy: "Volg vlaggen en strandwachten op jouw stranddeel; ruw water kan zwemmen onveilig maken.",
        icon: Waves,
      },
      {
        title: "Wegen & afstand",
        copy: "Gebruik passend vervoer en rijd alleen met correct rijbewijs, helm en verzekeringsdekking.",
        icon: Bus,
      },
      {
        title: "Hitte & blootstelling",
        copy: "Schaduw, water en een compacte middagroute tellen extra langs deze uitgestrekte kust.",
        icon: Umbrella,
      },
    ],
    bookingCards: [
      {
        title: "Hotels in Bang Tao",
        copy: "Vergelijk exacte pin, recente kamerfeedback, annulering en totaal voor jouw data.",
        href: hotels,
        label: "Bekijk actuele hotelprijzen",
        icon: Hotel,
        affiliate: true,
      },
      {
        title: "Activiteiten op Phuket",
        copy: "Controleer ophaalzone, aanbieder, inclusies, fysieke eisen en weersbeleid.",
        href: activities,
        label: "Bekijk actuele activiteiten",
        icon: TicketCheck,
        affiliate: true,
      },
      {
        title: "Westkustbus",
        copy: "Controleer haltes, dienstregeling, bagage en betaalinformatie bij de operator.",
        href: "https://phuketsmartbus.com/",
        label: "Open actuele businformatie",
        icon: Bus,
      },
    ],
    faqs: [
      {
        question: "Is Bang Tao Beach de moeite waard?",
        answer:
          "Bang Tao is het overwegen waard voor een ruim strandgevoel, een resortgerichte reis en een verzorgde eetomgeving. Het past minder als compact lopen, lage prijzen of nachtleven aan de deur belangrijkst zijn.",
      },
      {
        question: "Hoe is Bang Tao in Phuket?",
        answer:
          "Het is een verspreid gebied aan de noordwestkust met een lang strand, gemengde zuidelijke straten, Laguna, eten rond Boat Avenue en rustigere noordelijke delen. De micro-zone verandert het verblijf.",
      },
      {
        question: "Is Bang Tao beter dan Patong?",
        answer:
          "Bang Tao past doorgaans bij resorttijd, ruimte en rustige avonden; Patong bij nachtleven, winkelen en dichte dienstverlening. Geen van beide is universeel beter.",
      },
      {
        question: "Wat is het verschil tussen Bang Tao en Kata Beach?",
        answer:
          "Bang Tao is meer verspreid en resort- en lifestylegericht. Kata voelt compacter en heeft een sterkere seizoenssurfidentiteit. Vergelijk vervoersradius en avondritme.",
      },
      {
        question: "Is Bang Tao Beach een partystrand?",
        answer:
          "Bang Tao heeft strandvenues, restaurants en bars, maar is niet Phukets belangrijkste geconcentreerde uitgaansdistrict. Controleer actuele programmering.",
      },
      {
        question: "Is Bang Tao Beach geschikt voor gezinnen?",
        answer:
          "Dat kan met het juiste resort en cluster. Controleer kameropzet, zwembadtoezicht, oversteken, vervoer en dagelijkse zwemcondities.",
      },
      {
        question: "Kun je zwemmen bij Bang Tao Beach?",
        answer:
          "Alleen wanneer actuele condities en vlaggen dat toelaten. Wind, deining en muistromen veranderen; blijf uit zee bij rood en controleer opnieuw op een ander stranddeel.",
      },
      {
        question: "Is er iets te doen in Bang Tao?",
        answer:
          "Het gebied past beter bij strand, resort, eten en geselecteerde activiteiten dan bij een volle sightseeinglijst. Controleer actuele aanbieders en ophaalzones voor bredere Phuket-dagen.",
      },
    ],
    faqDescription:
      "Gebaseerd op zes actuele Nederlandse SERP-sets met 31 echte PAA-vermeldingen en zichtbare Google-NL-controle op 31 juli 2026. Antwoorden vermijden verouderde prijzen, vaste reistijden en veiligheidsbeloften.",
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
        description: "Vergelijk alle belangrijke verblijfszones.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Resortkust en hotelzones op Phuket",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        description: "Plan eilandbrede plekken los van de Bang Tao-owner.",
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
      "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters (295 keywordrecords en 50 concurrentdomeinen), zes actuele SERP-sets met 53 organische resultaten en 31 PAA-vermeldingen, zichtbare Google-NL-controle en vier primaire bronnen. Hotelverdieping blijft bij /nl/phuket/bang-tao/hotels/. Vaste prijzen, afstanden, tijden, aantallen, shuttleclaims en zwemgaranties zijn verwijderd.",
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
