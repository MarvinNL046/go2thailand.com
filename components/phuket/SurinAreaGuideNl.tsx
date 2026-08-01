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

const HERO = "/images/redesign/surin-area-hero-v2.webp";

export default function SurinAreaGuideNl({
  hotelHref,
  activityHref,
}: {
  hotelHref?: string;
  activityHref?: string;
}) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, "surin-owner-nl-hotels");
  const activities = withSubId(
    activityHref || KLOOK_GENERIC,
    "surin-owner-nl-activities",
  );
  const data: PhuketAreaGuideData = {
    locale: "nl",
    pageUrl: "https://go2-thailand.com/nl/phuket/surin/",
    alternateUrl: "https://go2-thailand.com/phuket/surin/",
    updatedAt: "2026-07-31",
    area: "Surin",
    title: "Surin Beach Phuket: past Surin bij jouw reis?",
    description:
      "Ontdek of Surin Beach bij je Phuket-reis past. Vergelijk strand- en verblijfszones, Surin met Bang Tao of Kamala, seizoenen, veiligheid en actuele hotels.",
    heroImage: HERO,
    heroAlt:
      "De compacte baai van Surin Beach bij goud avondlicht met groene landtong en reizigers",
    heroEyebrow: "De compacte, verfijnde westkustbaai van Phuket",
    heroTitle: (
      <>
        Surin Beach.
        <br />
        <span className="text-saffron-dark">Kleine baai, bewuste keuze.</span>
      </>
    ),
    heroSubtitle: "Een mooie strandbasis met minder om de hoek.",
    heroDescription:
      "Surin koppelt een compacte baai en groene landtongen aan een verzorgde accommodatiesfeer. Dat kan sterk zijn voor stellen en korte strandreizen, maar de beperkte variatie rondom maakt hotelpin en vervoer belangrijk.",
    heroPrimary: { label: "Ontdek of Surin past", href: "#fit" },
    heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass },
      { href: "#zones", label: "Zones", icon: MapPin },
      { href: "#beach", label: "Strand", icon: Waves },
      { href: "#season", label: "Beste reistijd", icon: CalendarDays },
      { href: "#plan", label: "Plan Surin", icon: TicketCheck },
      { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: (
      <>
        Strandkwaliteit eerst.
        <br />
        Variatie daarna.
      </>
    ),
    verdictDescription:
      "Surin is op zijn sterkst wanneer baai, resort en rustige avond de reis zijn — niet alleen een basis voor dagelijkse eilandritten. Het is minder passend voor brede budgetkeuze, dicht nachtleven of veel gezinsactiviteiten op loopafstand.",
    fitCards: [
      {
        eyebrow: "Sterke match",
        title: "Stellen voor een verzorgd verblijf",
        copy: "Een compacte baai en resortgericht ritme werken goed wanneer rustige avonden een voordeel zijn.",
        icon: Sunset,
      },
      {
        eyebrow: "Sterke match",
        title: "Korte strandgerichte reis",
        copy: "Sterk wanneer enkele goede stranddagen belangrijker zijn dan een lange lijst nabijgelegen attracties.",
        icon: Waves,
      },
      {
        eyebrow: "Voorwaardelijke match",
        title: "Gezinnen",
        copy: "Het kan met de juiste kamer en zwembad; vergelijk Kamala en Bang Tao voor een bredere gezinsomgeving.",
        icon: Users,
      },
      {
        eyebrow: "Kies iets anders",
        title: "Budget of nachtleven voorop",
        copy: "Surins compacte premiumpositie biedt minder keuze dan Patong, Kata of het bredere Bang Tao.",
        icon: MoonStar,
        tone: "dark",
      },
    ],
    editorialRule:
      "Kies Surin omdat de baai en accommodatie het verblijf dragen. Verwacht je dagelijks meer variatie, breng dan vervoer in kaart vóór je voor de locatie betaalt.",
    zones: [
      {
        title: "Route naar het strand",
        eyebrow: "De baai als dagelijks anker",
        copy: "Sterk wanneer eenvoudige strandtoegang de hoofdreden is en de accommodatie je middagbehoeften opvangt.",
        check:
          "Volg de echte ingang en oversteek; een nabije kaartpin bewijst geen directe toegang tot het zand.",
        image: HERO,
        imageAlt: "Surin Beach en de compacte groene baai",
      },
      {
        title: "Straten aan de dorpszijde",
        eyebrow: "Meer dagelijkse diensten, minder afzondering",
        copy: "Een praktische middenweg voor eten en kleine boodschappen, waarbij sfeer per straat en kameroriëntatie verschilt.",
        check:
          "Lees recente kamergerichte feedback over geluid en looproute, niet alleen gemiddelden over het gebied.",
        image: "/images/redesign/phuket-stay-kamala.webp",
        imageAlt: "Lage bebouwing en strandcontext aan de westkust van Phuket",
      },
      {
        title: "Heuvels en grenslocaties",
        eyebrow: "Uitzicht met meer vervoer",
        copy: "Hoger gelegen of aangrenzende accommodaties kunnen privé voelen, maar gedragen zich niet altijd als loopbaar Surin-verblijf.",
        check:
          "Controleer helling, shuttle, ophaalpunt en of de merknaam overeenkomt met de echte baai.",
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Groene, hoger gelegen kust van Phuket",
      },
    ],
    dayParts: [
      {
        time: "Vroege ochtend",
        title: "Lees de compacte baai",
        copy: "Loop langs de kust en controleer vlaggen voordat je een zwemplan kiest.",
        icon: Sunrise,
      },
      {
        time: "Middag",
        title: "Blijf dicht bij schaduw",
        copy: "Zwembad, lunch en een korte terugweg zijn waardevoller dan Phuket doorkruisen in de hitte.",
        icon: Sun,
      },
      {
        time: "Late middag",
        title: "Laat het strand leiden",
        copy: "Keer terug wanneer de hitte afneemt en houd het diner binnen de route die je controleerde.",
        icon: Sunset,
      },
      {
        time: "Avond",
        title: "Rust is onderdeel van de keuze",
        copy: "Verwacht eten en een drankje, geen breed uitgaanscircuit. Plan vervoer voor een grotere avond elders.",
        icon: MoonStar,
      },
    ],
    beachTitle: "Compact en aantrekkelijk — nooit automatisch veilig.",
    beachDescription:
      "De besloten uitstraling van Surin garandeert geen kalm water. Wind, deining, shorebreak en stroming veranderen door het jaar en per dag. Volg strandwachten, borden en vlaggen op het strand.",
    beachChecks: [
      {
        title: "Vlaggen beslissen",
        copy: "Ga niet het water in bij rood, ongeacht de lucht of wat andere bezoekers doen.",
        icon: AlertTriangle,
      },
      {
        title: "Let op de shorebreak",
        copy: "Beoordeel golven, instap en uitstap opnieuw met kinderen of minder zekere zwemmers.",
        icon: Waves,
      },
      {
        title: "Controleer activiteiten",
        copy: "Bekijk aanbieder, briefing, uitrusting, verzekering en annulering bij slecht weer.",
        icon: ShieldCheck,
      },
    ],
    seasonTitle: (
      <>
        Kies een breed venster.
        <br />
        Controleer de echte baai.
      </>
    ),
    seasonDescription:
      "De westkustpatronen van Phuket vormen het brede plan; TMD en lokale vlaggen bepalen iedere stranddag.",
    seasonRows: [
      {
        period: "dec–feb",
        conditions:
          "Vaak een sterker breed venster voor droger weer en rustiger strandplanning.",
        planning:
          "Hoge vraag kan de keuze verkleinen. Vergelijk actuele kamervoorwaarden en zeecondities.",
        cue: "Populair venster",
        highlight: true,
      },
      {
        period: "mrt–apr",
        conditions:
          "Hitte en luchtvochtigheid kunnen open strandtijd en hellingen vermoeiender maken.",
        planning:
          "Begin eerder en geef prioriteit aan schaduw, zwembad en een korte looproute.",
        cue: "Plan voor hitte",
      },
      {
        period: "mei–okt",
        conditions:
          "Zuidwestmoesson kan regen, deining en groter stromingsrisico brengen.",
        planning:
          "Houd landalternatieven klaar en behandel een rode vlag als harde stop.",
        cue: "Flexibel kustplan",
        highlight: true,
      },
      {
        period: "nov",
        conditions:
          "De overgang kan verbeterende reeksen en onrustige dagen mengen.",
        planning:
          "Gebruik de actuele verwachting en beloof geen vast maandgedrag.",
        cue: "Controleer de week",
      },
    ],
    spokes: [
      {
        title: "Waar verblijven op Phuket?",
        copy: "Vergelijk Surins compacte premiumfit met alle belangrijke eilandbases.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Resortkust en hotelzones op Phuket",
        label: "Vergelijk alle gebieden",
      },
      {
        title: "Bang Tao ernaast",
        copy: "Vergelijk Surin met een langer en meer verspreid resort- en eetgebied.",
        href: "/phuket/bang-tao/",
        image: "/images/redesign/bang-tao-area-hero-v2.webp",
        imageAlt: "Bang Tao Beach bij goud avondlicht",
        label: "Open de Bang Tao-gids",
      },
      {
        title: "Actuele activiteiten",
        copy: "Vergelijk ophaalplek, aanbieder, inclusies en weersvoorwaarden voor jouw data.",
        href: activities,
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Kust, uitzichtpunten en activiteiten op Phuket",
        label: "Bekijk actuele opties",
        affiliate: true,
      },
      {
        title: "Bezienswaardigheden op Phuket",
        copy: "Plan eilandbrede plekken los van deze Surin-owner.",
        href: "/city/phuket/attractions/",
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Tropische kust en bezienswaardigheden op Phuket",
        label: "Ontdek bezienswaardigheden",
      },
    ],
    comparisonCards: [
      {
        area: "Bang Tao",
        fit: "Langer, meer verspreid en sterker voor resort-, eet- en lifestylevariatie.",
        href: "/phuket/bang-tao/",
        image: "/images/redesign/bang-tao-area-hero-v2.webp",
        imageAlt: "Resortstrand van Bang Tao",
      },
      {
        area: "Kamala",
        fit: "Meer dorp- en gezinsgericht met een kalmer totaalritme.",
        href: "/phuket/kamala/",
        image: "/images/redesign/kamala-area-hero-v2.webp",
        imageAlt: "Ontspannen Kamala Beach",
      },
      {
        area: "Kata",
        fit: "Meer compacte bezoekersinfrastructuur en een sterkere seizoenssurfidentiteit.",
        href: "/phuket/kata/",
        image: "/images/redesign/kata-area-hero-v2.webp",
        imageAlt: "De compacte baai van Kata Beach",
      },
    ],
    safetyCards: [
      {
        title: "Zeecondities",
        copy: "Volg vlaggen en strandwachten; ruw water en shorebreak kunnen zwemmen onveilig maken.",
        icon: Waves,
      },
      {
        title: "Heuvels & wegen",
        copy: "Bekijk de echte route en rijd alleen met correct rijbewijs, helm en verzekeringsdekking.",
        icon: Bus,
      },
      {
        title: "Hitte & blootstelling",
        copy: "Gebruik schaduw, water en een kortere middagroute, zeker met kinderen of oudere reizigers.",
        icon: Umbrella,
      },
    ],
    bookingCards: [
      {
        title: "Hotels rond Surin",
        copy: "Vergelijk exacte pin, toegangsroute, recente kamerfeedback, annulering en totaal voor jouw data.",
        href: hotels,
        label: "Bekijk actuele hotelprijzen",
        icon: Hotel,
        affiliate: true,
      },
      {
        title: "Activiteiten op Phuket",
        copy: "Controleer ophaalplek, aanbieder, inclusies, fysieke eisen en weersbeleid.",
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
        question: "Is Surin Beach de moeite waard?",
        answer:
          "Surin is het overwegen waard voor een compacte, aantrekkelijke baai en een rustig resortgericht verblijf. Het past minder als budgetkeuze, nachtleven of veel loopbare activiteiten belangrijkst zijn.",
      },
      {
        question: "Hoe is Surin Beach?",
        answer:
          "Surin is een relatief compacte westkustbaai met groene landtongen en een verzorgde accommodatiecontext. Het strand is de hoofdreden; voor bredere eet- en activiteitenkeuze kan vervoer nodig zijn.",
      },
      {
        question: "Is Surin Beach goed om te zwemmen?",
        answer:
          "Alleen wanneer actuele condities en vlaggen dat toelaten. Wind, deining, shorebreak en stroming veranderen; blijf uit zee bij rood en houd actief toezicht.",
      },
      {
        question: "Wat is beter, Kamala of Surin Beach?",
        answer:
          "Kamala biedt doorgaans een breder dorp- en gezinsritme. Surin is compacter en meer op strand en resort gericht. Vergelijk toegang, avondbehoefte en vervoer.",
      },
      {
        question: "Wat is het verschil tussen Surin en Bang Tao?",
        answer:
          "Surin is kleiner en compacter. Bang Tao is langer, meer verspreid en ondersteunt een bredere resort-, eet- en winkelomgeving.",
      },
      {
        question: "Is Surin Beach geschikt voor gezinnen?",
        answer:
          "Het kan met de juiste kamer, zwembad en route; vergelijk Kamala en Bang Tao voor bredere gezinsvoorzieningen. Zwemveiligheid blijft afhankelijk van de vlaggen.",
      },
      {
        question: "Zijn er winkels bij Surin Beach?",
        answer:
          "Er zijn diensten in en rond het gebied, maar aanbod verandert en Surin is geen groot winkeldistrict. Controleer de actuele looproute naar wat je groep echt nodig heeft.",
      },
      {
        question: "Welke activiteiten kun je doen bij Surin Beach?",
        answer:
          "Gebruik het strand wanneer condities het toelaten, geniet van een resortdag en voeg geselecteerde Phuket-activiteiten toe met geverifieerde ophaal- en weersvoorwaarden.",
      },
      {
        question: "Is Surin Beach hetzelfde als de Surin-eilanden?",
        answer:
          "Nee. Deze pagina gaat over Surin Beach op Phuket. De Surin-eilanden vormen een afzonderlijke eilandengroep en reisintentie.",
      },
    ],
    faqDescription:
      "Gebaseerd op zes actuele Nederlandse SERP-sets met 28 echte PAA-vermeldingen en zichtbare Google-NL-controle op 31 juli 2026. De pagina onderscheidt Surin Beach, hotel The Surin en de Surin-eilanden expliciet.",
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
        description: "Vergelijk de belangrijkste hotelzones op het eiland.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Resortkust van Phuket",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        description: "Plan eilandbrede plekken los van de strandowner.",
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
      "Op 31 juli 2026 zelfstandig onderzocht met één behouden rankingkeyword, twee Nederlandse DataForSEO-clusters (233 keywordrecords en 50 concurrentdomeinen), zes actuele SERP-sets met 52 organische resultaten en 28 PAA-vermeldingen, zichtbare Google-NL-controle en vier primaire bronnen. Vaste prijzen, afstanden, tijden, hotel- en vendoraantallen, historische vendorclaims, lifeguarduren, doelgroepafwijzingen en zwemgaranties zijn verwijderd.",
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
