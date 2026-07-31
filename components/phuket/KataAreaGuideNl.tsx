import {
  AlertTriangle,
  Bus,
  CalendarDays,
  CheckCircle2,
  Compass,
  Footprints,
  Hotel,
  MapPin,
  MoonStar,
  ShieldCheck,
  Sun,
  Sunrise,
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

const HERO = "/images/redesign/kata-area-hero-v2.webp";

interface Props {
  hotelHref?: string;
  activityHref?: string;
  surfingHref?: string;
}

export default function KataAreaGuideNl({
  hotelHref,
  activityHref,
  surfingHref,
}: Props) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, "kata-owner-nl-hotels");
  const activities = withSubId(
    activityHref || KLOOK_GENERIC,
    "kata-owner-nl-activities",
  );
  const surfing = withSubId(
    surfingHref || activityHref || KLOOK_GENERIC,
    "kata-owner-nl-surfing",
  );
  const data: PhuketAreaGuideData = {
    locale: "nl",
    pageUrl: "https://go2-thailand.com/nl/phuket/kata/",
    alternateUrl: "https://go2-thailand.com/phuket/kata/",
    updatedAt: "2026-07-31",
    area: "Kata",
    title: "Kata Beach Phuket: past Kata bij jouw reis?",
    description:
      "Ontdek of Kata Beach bij je Phuket-reis past. Vergelijk zones, gezins- en surffit, Kata met Karon of Patong, seizoenen, veiligheid en actuele hotels.",
    heroImage: HERO,
    heroAlt:
      "De compacte baai van Kata Beach bij goud avondlicht met groene kapen en wandelaars",
    heroEyebrow: "De compacte strand- en dorpsbasis van Phuket",
    heroTitle: (
      <>
        Kata Beach.
        <br />
        <span className="text-saffron-dark">Kleine baai, flexibele dagen.</span>
      </>
    ),
    heroSubtitle: "Strandritme met meer dagelijks leven dichtbij.",
    heroDescription:
      "Kata combineert een gebogen westkuststrand, een compact bezoekerscentrum en seizoensgebonden surfcontext. Dat past vaak bij gezinnen en een eerste Phuket-reis, maar de echte strandtoegang en micro-locatie bepalen het gemak.",
    heroPrimary: { label: "Ontdek of Kata past", href: "#fit" },
    heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass },
      { href: "#zones", label: "Zones", icon: MapPin },
      { href: "#beach", label: "Strand & surf", icon: Waves },
      { href: "#season", label: "Beste reistijd", icon: CalendarDays },
      { href: "#plan", label: "Plan Kata", icon: TicketCheck },
      { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: (
      <>
        Compact van karakter.
        <br />
        Niet vanaf iedere voordeur.
      </>
    ),
    verdictDescription:
      "Kata is een sterke allrounder als strand, restaurants en een ontspannen avondritme samen tellen. Grote muren, indirecte ingangen en heuvelhotels kunnen de compactheid doorbreken: beoordeel daarom de echte route van kamer naar zand.",
    fitCards: [
      {
        eyebrow: "Sterke match",
        title: "Gezinnen die balans zoeken",
        copy: "Een bruikbare mix van strand, zwembad, informeel eten en rustige avonden — als oversteek, kamerindeling en actuele zee passen.",
        icon: Users,
      },
      {
        eyebrow: "Sterke match",
        title: "Strand plus seizoenssurf",
        copy: "Kata heeft een duidelijke surfcontext in ruwere westkustperioden. Geschiktheid vraagt altijd een actuele check bij een gekwalificeerde aanbieder.",
        icon: Waves,
      },
      {
        eyebrow: "Sterke match",
        title: "Eerste basis op Phuket",
        copy: "Handig als je een herkenbare badplaats met voldoende diensten wilt zonder het nachtleven van Patong centraal te zetten.",
        icon: CheckCircle2,
      },
      {
        eyebrow: "Kies iets anders",
        title: "Afzondering of groot nachtleven",
        copy: "Kata is populair en bezoekersgericht. Kies een rustigere kust voor afzondering of Patong voor geconcentreerd uitgaan.",
        icon: MoonStar,
        tone: "dark",
      },
    ],
    editorialRule:
      "Behandel ‘Kata’ als verschillende loopervaringen. Teken vóór boeken de route naar de echte strandingang en je meest gebruikte avondroute uit.",
    zones: [
      {
        title: "Noord-Kata",
        eyebrow: "Karon-gericht en routegevoelig",
        copy: "Deze kant kan goed aansluiten op een bredere Kata-Karon-planning, maar strandtoegang verschilt rond grote terreinen en wegen.",
        check:
          "Zoek de openbare strandingang op de kaart; meet niet in een rechte lijn vanaf de hotelpin.",
        image: "/images/redesign/phuket-stay-kata-karon.webp",
        imageAlt: "De kust van Kata en Karon met groene kapen",
      },
      {
        title: "Centraal Kata",
        eyebrow: "Dagelijks gemak voorop",
        copy: "Past bij reizigers die restaurants, winkels en avonddiensten dicht bij hun dagelijkse route willen.",
        check:
          "Weeg toegang af tegen kamergeluid, verkeer en de helling van zijstraten.",
        image: "/images/cities/phuket/attractions/Kata Beach.webp",
        imageAlt: "De gebogen baai van Kata Beach",
      },
      {
        title: "Zuid-Kata & rand Kata Noi",
        eyebrow: "Rustigere randen, meer helling",
        copy: "De zuidkant kan schilderachtiger en resortgerichter voelen, met toegang richting Kata Noi. Heuvels worden belangrijker.",
        check:
          "Bevestig shuttle, helling en ophaalpunt als iemand in je groep beperkt mobiel is.",
        image: HERO,
        imageAlt: "Kata Beach met de groene zuidelijke landtong",
      },
    ],
    dayParts: [
      {
        time: "Vroege ochtend",
        title: "Begin met de watercheck",
        copy: "Lees vlaggen en lokale condities voordat je kiest tussen zwemmen, wandelen, een les of een zwembadochtend.",
        icon: Sunrise,
      },
      {
        time: "Middag",
        title: "Houd de straal compact",
        copy: "Gebruik schaduw, lunch en zwembadpauze in plaats van onbeschut strand te stapelen op een lange klim terug.",
        icon: Sun,
      },
      {
        time: "Late middag",
        title: "Strand of begeleide surf",
        copy: "Keer terug als de hitte zakt. Laat les, materiaal en plek aansluiten op actuele condities en je werkelijke niveau.",
        icon: Waves,
      },
      {
        time: "Avond",
        title: "Diner zonder uitgaansmissie",
        copy: "Kata blinkt uit in een eenvoudig restaurant- en barritme. Reis alleen naar Patong als een grotere avond de extra rit waard is.",
        icon: MoonStar,
      },
    ],
    beachTitle: "Zwemstrand en surfplek — nooit op de automatische piloot.",
    beachDescription:
      "De zee bij Kata verandert door het jaar én per dag. Rustiger ogende perioden kunnen passen bij zwemmen; ruwere westkustpatronen dragen de surfidentiteit maar vergroten ook golf- en stromingsrisico. Vlaggen, strandwachten en gekwalificeerd lokaal oordeel gaan boven een maandlabel.",
    beachChecks: [
      {
        title: "Zwem volgens de vlaggen",
        copy: "Gebruik andere zwemmers niet als veiligheidsbewijs. Volg borden en blijf uit het water bij een rode vlag.",
        icon: AlertTriangle,
      },
      {
        title: "Surf op je eigen niveau",
        copy: "Vraag een actuele aanbieder naar condities, lesgebied, instructeur, materiaal en annuleringsbeleid.",
        icon: Waves,
      },
      {
        title: "Beoordeel opnieuw met kinderen",
        copy: "Een gezinsvriendelijk gebied garandeert geen kindvriendelijke zee. Diepte, branding en stroming vragen actief toezicht.",
        icon: Users,
      },
    ],
    seasonTitle: (
      <>
        Plan voor strand of surf.
        <br />
        Controleer daarna de dag.
      </>
    ),
    seasonDescription:
      "Brede Phuket-seizoenen helpen het type reis kiezen, maar garanderen geen activiteit. Gebruik TMD-verwachtingen, maritieme waarschuwingen, strandvlaggen en gekwalificeerd lokaal oordeel vlak voor je bezoek.",
    seasonRows: [
      {
        period: "dec–feb",
        conditions:
          "Vaak een sterker breed venster voor droger weer en rustiger westkustplanning.",
        planning:
          "Populaire data kunnen eerder vollopen. Vergelijk actuele voorwaarden en controleer iedere ochtend de zee.",
        cue: "Strandgericht venster",
        highlight: true,
      },
      {
        period: "mrt–apr",
        conditions:
          "Hitte en luchtvochtigheid kunnen de grootste beperking worden, ook als strandplannen mogelijk blijven.",
        planning:
          "Begin vroeger, gebruik schaduw en houd de kamer-strandroute realistisch.",
        cue: "Plan voor hitte",
      },
      {
        period: "mei–okt",
        conditions:
          "Zuidwestmoesson kan regen, wind, deining en zichtbaardere surfcondities brengen.",
        planning:
          "Surf binnen je niveau en aanbiederadvies; een rode vlag kan zwemmen onveilig maken.",
        cue: "Surfcontext, flexibel plan",
        highlight: true,
      },
      {
        period: "nov",
        conditions:
          "De overgang kan betere reeksen mengen met onrustig weer en veranderende zee.",
        planning:
          "Gebruik de actuele vooruitblik in plaats van de hele maand gelijk te behandelen.",
        cue: "Controleer de week",
      },
    ],
    spokes: [
      {
        title: "Hotels in Kata",
        copy: "Vergelijk verblijven op echte strandroute, micro-locatie, kamertype en actuele annulering.",
        href: "/phuket/kata/hotels/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Hotelzone aan de kust van Phuket",
        label: "Open de hotelgids",
      },
      {
        title: "Surfen in Kata",
        copy: "Gebruik de aparte gids voor seizoenscontext, leschecks en veiligheidsgerichte planning.",
        href: "/phuket/kata/surfing/",
        image: "/images/cities/phuket/attractions/Kata Beach.webp",
        imageAlt: "Kata Beach en de zeecondities aan de westkust",
        label: "Open de surfgids",
      },
      {
        title: "Actuele Phuket-activiteiten",
        copy: "Vergelijk operator, ophaalplek, fysieke eisen en weersbeleid vóór boeken.",
        href: activities,
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Kustactiviteiten en uitzichtpunten op Phuket",
        label: "Bekijk actuele opties",
        affiliate: true,
      },
      {
        title: "Actuele surfopties",
        copy: "Bekijk of een passende les of ervaring beschikbaar is voor je data en niveau.",
        href: surfing,
        image: HERO,
        imageAlt: "Surfers bij de compacte baai van Kata",
        label: "Bekijk actuele surfopties",
        affiliate: true,
      },
    ],
    comparisonCards: [
      {
        area: "Karon",
        fit: "Langer, opener en meer verspreid; vergelijk voor resortruimte en een rustiger ritme.",
        href: "/phuket/karon/",
        image: "/images/redesign/karon-area-hero-v2.webp",
        imageAlt: "Het brede Karon Beach bij avondlicht",
      },
      {
        area: "Patong",
        fit: "Sterker voor nachtleven, winkelen en maximale concentratie van bezoekersdiensten.",
        href: "/phuket/patong/",
        image: "/images/redesign/phuket-stay-patong.webp",
        imageAlt: "Strand en bezoekersgebied van Patong",
      },
      {
        area: "Kamala",
        fit: "Een rustiger westkustalternatief met een andere balans tussen dorp en resort.",
        href: "/phuket/kamala/",
        image: "/images/redesign/phuket-stay-kamala.webp",
        imageAlt: "Kamala Beach en groene westkustheuvels",
      },
    ],
    safetyCards: [
      {
        title: "Zee & surf",
        copy: "Volg strandwachten, vlaggen en gekwalificeerde instructie. Ruw water kan aantrekkelijk zijn voor ervaren surfers en tegelijk onveilig voor zwemmers.",
        icon: Waves,
      },
      {
        title: "Heuvels & wegen",
        copy: "Controleer looproute en oversteken. Rijd alleen met correct rijbewijs, helm en passende verzekeringsdekking.",
        icon: Bus,
      },
      {
        title: "Zon & hitte",
        copy: "Gebruik schaduw, voldoende drinken en een rustiger middagplan. Bewolking neemt uv- en hitterisico niet weg.",
        icon: Umbrella,
      },
    ],
    bookingCards: [
      {
        title: "Hotels in Kata",
        copy: "Vergelijk ingang, recente kamerfeedback, annulering en totaal voor je data.",
        href: hotels,
        label: "Bekijk actuele hotelprijzen",
        icon: Hotel,
        affiliate: true,
      },
      {
        title: "Kata- & Phuket-activiteiten",
        copy: "Controleer ophaalzone, operator, inclusies, fysieke eisen en weersbeleid.",
        href: activities,
        label: "Bekijk actuele activiteiten",
        icon: TicketCheck,
        affiliate: true,
      },
      {
        title: "Airport- & westkustbus",
        copy: "Controleer haltes, dienstregeling, bagage en betaalinformatie rechtstreeks bij Phuket Smart Bus.",
        href: "https://phuketsmartbus.com/",
        label: "Open actuele businformatie",
        icon: Bus,
      },
    ],
    faqs: [
      {
        question: "Is Kata Beach een bezoek waard?",
        answer:
          "Kata is het overwegen waard als je een compacte Phuket-basis wilt met strand, restaurants, resortkeuze en seizoenssurf. Het is populair en bezoekersgericht; kies een andere kust als afzondering het hoofddoel is.",
      },
      {
        question: "Is Karon of Kata beter?",
        answer:
          "Kata voelt compacter en heeft meer surfcontext. Karon is langer, opener en meer verspreid. Kies op de echte hotel-strandroute, looptolerantie, avondsfeer en vervoersplan.",
      },
      {
        question: "Waarom is Kata Beach populair?",
        answer:
          "Kata combineert een aantrekkelijke westkustbaai, praktisch bezoekerscentrum, resortkeuze en toegang tot eten en activiteiten in een relatief compact gebied. Die populariteit kan op gewilde data ook drukte betekenen.",
      },
      {
        question: "Is Kata Beach veilig om te zwemmen?",
        answer:
          "Zwemveiligheid verandert met wind, deining en stroming. Volg strandwachten, borden en vlaggen op de dag zelf en ga nooit het water in bij een rode vlag.",
      },
      {
        question: "Is Kata Beach geschikt voor gezinnen?",
        answer:
          "Kata kan goed passen omdat strand, zwembad, eten en dagelijkse diensten in een compact ritme kunnen vallen. Controleer kamer, actuele zee, toezicht, oversteken en werkelijke looproute.",
      },
      {
        question: "Is Kata Beach te toeristisch?",
        answer:
          "Kata is duidelijk een bezoekersgerichte badplaats. Dat geeft gemak en keuze, maar kan te ontwikkeld voelen als je afzondering zoekt. Kies Kata wanneer die infrastructuur je reis helpt.",
      },
      {
        question: "Kun je beter in Kata of Patong verblijven?",
        answer:
          "Kata past vaker bij strandgerichte dagen, rustige avonden en gezins- of stelreizen. Patong past bij geconcentreerd nachtleven, winkelen en veel tourinfrastructuur. Je avondprioriteit bepaalt de betere basis.",
      },
      {
        question: "Heeft Kata nachtleven?",
        answer:
          "Kata heeft restaurants en ontspannen bars, maar niet de schaal van Patong. Het past bij reizigers die een eenvoudige avond dichtbij het strand willen.",
      },
      {
        question: "Wat kun je doen bij Kata Beach?",
        answer:
          "Gebruik het strand wanneer vlaggen dat toelaten, verken eten en uitzichtpunten, overweeg een passende begeleide surfles en voeg selectieve Phuket-dagtochten toe. Controleer operator en weerbeleid actueel.",
      },
    ],
    faqDescription:
      "Gebaseerd op zes actuele Nederlandse SERP-sets met 33 echte PAA-vermeldingen en zichtbare Google-NL-controle op 31 juli 2026. Antwoorden vermijden vaste tijden, prijzen en onveilige maandgaranties.",
    related: [
      {
        title: "Complete Phuket-gids",
        description: "Bouw je eilandroute voordat je één strandbasis kiest.",
        href: "/city/phuket/",
        image: "/images/redesign/phuket-destination-hero-v2.webp",
        imageAlt: "Tropische kust en baai van Phuket",
      },
      {
        title: "Waar verblijven op Phuket?",
        description:
          "Vergelijk Kata met andere hotelzones en dagelijkse routes.",
        href: "/best-hotels/phuket/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Resortkust en verblijfszones op Phuket",
      },
      {
        title: "Bezienswaardigheden op Phuket",
        description:
          "Scheid eilandbrede plekken van activiteiten die werkelijk dicht bij Kata liggen.",
        href: "/city/phuket/attractions/",
        image: "/images/redesign/phuket-attractions-hero.webp",
        imageAlt: "Kust en bezienswaardigheden op Phuket",
      },
    ],
    sources: [
      {
        title: "Phuket",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350",
        note: "Officiële bestemmingscontext en advies om strandwaarschuwingen te volgen.",
      },
      {
        title: "Weer in Phuket",
        creator: "Thai Meteorological Department",
        url: "https://www.tmd.go.th/weather/province/phuket",
        note: "Primaire actuele weerbron en officiële vooruitblik.",
      },
      {
        title: "Routes, dienstregeling en live tracking",
        creator: "Phuket Smart Bus",
        url: "https://phuketsmartbus.com/",
        note: "Actuele informatie van de vervoersoperator.",
      },
      {
        title: "Reisadvies Thailand",
        creator: "NederlandWereldwijd",
        url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
        note: "Actueel Nederlands veiligheids- en verkeerskader.",
      },
    ],
    methodDescription:
      "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters (363 keywordrecords), 100 concurrentdomeinen, zes actuele SERP-sets met 47 organische resultaten en 33 PAA-vermeldingen, zichtbare Google-NL-controle en vier primaire bronnen. De bestaande positie 79 voor ‘kata beach phuket’ blijft op dezelfde URL. Hotel-, surf-, Kata Noi- en attractiediepte blijven apart; vaste prijzen, percentages, rit- en looptijden, golfgaranties en universele gezins- of veiligheidsclaims zijn verwijderd.",
    sectionCopy: {
      zonesEyebrow: "Drie micro-locaties",
      zonesTitle: (
        <>
          Compact op de kaart.
          <br />
          Anders vanaf iedere deur.
        </>
      ),
      zonesDescription:
        "Noord, centrum en zuid leveren andere ingangen, hellingen en avondroutes op.",
      rhythmEyebrow: "Eén baai, vier momenten",
      rhythmTitle: (
        <>
          Laat water, hitte en
          <br />
          avondritme de dag sturen.
        </>
      ),
      rhythmDescription:
        "Kata werkt het best als je niet ieder uur met dezelfde strandverwachting vult.",
      featureEyebrow: "Strand- en surfcontext zonder garantie",
      seasonEyebrow: "Brede seizoenen, actuele beslissing",
      seasonNote:
        "Dit zijn patronen, geen weer-, zwem- of surfgarantie. Controleer TMD, vlaggen en aanbiedervoorwaarden.",
      comparisonEyebrow: "Kies het dagelijkse ritme",
      comparisonTitle: (
        <>
          Compact stranddorp
          <br />
          of een andere Phuket-basis?
        </>
      ),
      comparisonDescription:
        "Vergelijk Kata met Karon, Patong en Kamala op wat je iedere dag wilt herhalen.",
      safetyEyebrow: "Water, wegen en hitte",
      safetyTitle: (
        <>
          Gezinsvriendelijke basis.
          <br />
          Geen automatische veiligheid.
        </>
      ),
      safetyDescription:
        "Actuele zee, route naar het strand en actief toezicht blijven doorslaggevend.",
      bookingEyebrow: "Controleer wat nu klopt",
      bookingTitle: (
        <>
          Boek de echte looproute,
          <br />
          niet alleen de naam Kata.
        </>
      ),
      bookingDescription:
        "Controleer ingang, kamer, route, voorwaarden, ophaalplek en totaal voor jouw data.",
      methodTitle: "Een keuzehulp voor Kata, geen generieke strandlijst.",
    },
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
