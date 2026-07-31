import type { HotelGuideData } from "../types";

const mountainHotelImage = "/images/redesign/prachinburi-hotel-hero.webp";
const riversideHotelImage = "/images/redesign/prachinburi-riverside-hotel.webp";
const forestLodgeImage = "/images/redesign/prachinburi-forest-lodge.webp";

export const prachinburiHotelGuide: HotelGuideData = {
  citySlug: "prachinburi",
  cityName: "Prachinburi",
  parentGuideHref: "/nl/city/",
  locale: "nl",
  pageTitle: "Waar verblijven in Prachinburi? 5 gebieden & 8 hotels",
  pageDescription:
    "Vergelijk Prachinburi-stad, Khao Yai-oost, Si Maha Phot, Kabin Buri en Na Di. Kies uit 8 gecontroleerde hotels en bekijk beschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/prachinburi/",
  heroImage: mountainHotelImage,
  heroAlt:
    "Houten hotelterras met uitzicht over beboste bergkammen en ochtendmist in Prachinburi",
  eyebrow: "Kies tussen rivierstad, werkcorridor en beschermd woud",
  heroTitle: "Waar verblijven",
  heroAccent: "in Prachinburi?",
  intro:
    "Prachinburi is een uitgestrekte provincie, geen compacte hotelstad. De provinciehoofdstad ligt aan de Prachinburi-rivier, de zuidoostelijke toegang tot Khao Yai begint bij Noen Hom, Si Maha Phot bedient de 304-corridor en verder oostwaarts volgen Kabin Buri en Na Di. Kies daarom eerst je dagelijkse route. Een hotel bij Thap Lan is geen praktische basis voor de stad, en een adres met ‘Khao Yai’ in de naam ligt niet automatisch bij Pak Chong.",
  quickAnswer:
    "Kies iRabbit Hotel voor de voorzieningen van Prachinburi-stad, Siamdasada voor de groene Noen Hom-route aan de Prachinburi-zijde van Khao Yai, Kantary 304 voor een compleet lang verblijf en Tawa Ravadee voor een resortsetting in Si Maha Phot. The Canal 304 en The Garden 304 zijn alternatieven binnen dezelfde werkcorridor. Serenity past bij Kabin Buri; The Verona is een zelfstandige basis in Na Di bij de Thap Lan-route. Vergelijk daarna kamer, locatie en actuele totaalprijs onder dezelfde voorwaarden.",
  areaDecisionNote:
    "Deze owner behandelt vijf afzonderlijke kaartblokken. Prachinburi-stad en de rivier horen bij het provinciale centrum. Noen Hom ligt aan de Khao Yai-kant van de provincie. Si Maha Phot is de 304- en industriële hotelzone. Kabin Buri is een eigen oostelijk knooppunt. Na Di ligt verder noordelijk bij Thap Lan en de Sai Yai-rivier; het is geen wijk van Khao Yai of de hoofdstad.",
  areas: [
    {
      slug: "prachinburi-city-river",
      name: "Prachinburi-stad & rivier",
      shortLabel: "Erfgoed en dagelijkse voorzieningen",
      tone: "local",
      image: riversideHotelImage,
      imageAlt:
        "Houten verblijf met tuin en terras aan een rustige rivier bij Prachinburi-stad",
      bestFor:
        "Eerste bezoeken, het Abhaibhubejhr-erfgoed, lokale markten en treinreizigers",
      summary:
        "De provinciehoofdstad groeide langs de Prachinburi-rivier. Een stadsbasis werkt voor het museum, Wat Kaeo Phichit, lokale restaurants en de historische Abhaibhubejhr-gebouwen, maar niet ieder stadshotel ligt werkelijk aan het water.",
      advantage:
        "Je houdt erfgoed, markt, station en dagelijkse voorzieningen in hetzelfde routeblok.",
      tradeoff:
        "De Khao Yai-ingang, de 304-zone en Thap Lan blijven afzonderlijke ritten; ‘Prachinburi’ in een hotelnaam zegt niets over rivierzicht.",
      transport:
        "Controleer hotel, station, rivierovergang en je gekozen bezienswaardigheid als aparte kaartpinnen en bevestig avondvervoer vooraf.",
    },
    {
      slug: "noen-hom-khao-yai-east",
      name: "Noen Hom & Khao Yai-oost",
      shortLabel: "De groene parkzijde van Prachinburi",
      tone: "scenic",
      image: mountainHotelImage,
      imageAlt:
        "Hotelterras boven groene bergen met lage ochtendmist aan de Prachinburi-zijde van Khao Yai",
      bestFor:
        "Natuurreizigers, tuinen, watervallen en een bewuste parkdag vanaf Prachinburi",
      summary:
        "Noen Hom ligt op de route naar de zuidoostelijke toegang van Khao Yai. Dit is een andere zijde van het park dan de bekende Pak Chong-corridor in Nakhon Ratchasima en vraagt een eigen routeplanning.",
      advantage:
        "Je begint dichter bij de groene noordrand van Mueang Prachinburi en kunt een resortnacht onderdeel van de natuurreis maken.",
      tradeoff:
        "Restaurants en avondvoorzieningen zijn beperkter dan in de stad, terwijl parktoegang en watervallen afhankelijk blijven van actuele omstandigheden.",
      transport:
        "Controleer de officiële parkingang, opening, weer en toegankelijke parkdelen vlak voor vertrek; voer niet alleen ‘Khao Yai’ in als bestemming.",
    },
    {
      slug: "si-maha-phot-304",
      name: "Si Maha Phot & 304-corridor",
      shortLabel: "Werk, suites en langere verblijven",
      tone: "easy",
      image: riversideHotelImage,
      imageAlt:
        "Rustig hotelterras met tuin en water als sfeerbeeld voor een langer verblijf in Prachinburi",
      bestFor:
        "Zakenreizen, industriebezoek, eigen vervoer en verblijven met meer hotelvoorzieningen",
      summary:
        "Tha Tum en de 304 Industrial Park-zone vormen het grootste zakelijke hotelcluster van de provincie. De keuze draait hier om de juiste fabriekspoort, suite-indeling, maaltijden en langverblijffaciliteiten, niet om loopafstand tot de oude stad.",
      advantage:
        "Je vindt hier de ruimste keuze aan serviced apartments, vergaderruimte, restaurants en voorzieningen voor meerdere nachten.",
      tradeoff:
        "Deze corridor ligt buiten het toeristische centrum en is geen logische natuurbase voor Khao Yai of Thap Lan.",
      transport:
        "Vraag om de exacte ingang van bedrijf, industriepark en hotel; verschillende poorten langs Route 304 zijn niet uitwisselbaar.",
    },
    {
      slug: "kabin-buri",
      name: "Kabin Buri",
      shortLabel: "Oostelijk knooppunt en wellnessstop",
      tone: "easy",
      image: riversideHotelImage,
      imageAlt:
        "Groene hotelomgeving aan stromend water als sfeerbeeld voor een rustige stop in Kabin Buri",
      bestFor:
        "Roadtrips richting Sa Kaeo of Korat, zakelijke stops en reizigers die hotelrust zoeken",
      summary:
        "Kabin Buri is een zelfstandig district waar regionale wegen en rivieren samenkomen. Kies het als de oostelijke route je planning bepaalt, niet omdat het binnen dezelfde provincie als Prachinburi-stad ligt.",
      advantage:
        "Een complete hotelbasis voorkomt een onnodige terugrit naar de hoofdstad en werkt goed als rustige tussenstop.",
      tradeoff:
        "De belangrijkste stadsbezienswaardigheden en de Khao Yai-ingang bij Noen Hom liggen niet in je directe omgeving.",
      transport:
        "Controleer vervolgweg, eventuele voertuigbeperkingen en de hotelingang voordat je Kabin Buri als tussenstop vastlegt.",
    },
    {
      slug: "na-di-thap-lan",
      name: "Na Di & Thap Lan-route",
      shortLabel: "Woud, rivier en Route 304",
      tone: "scenic",
      image: forestLodgeImage,
      imageAlt:
        "Houten boslodges naast een beek in dicht groen regenwoud als natuurroutebeeld voor Na Di",
      bestFor:
        "Thap Lan, Kaeng Hin Phoeng, gezinnen met eigen vervoer en een zelfstandige natuurstop",
      summary:
        "Na Di en Bu Phram liggen aan de bergroute bij Thap Lan. De zone wordt soms onder de brede Khao Yai-marketing geschoven, maar geografisch en praktisch plan je hier Thap Lan, de Sai Yai-rivier en Route 304.",
      advantage:
        "Je overnacht dicht bij het eigenlijke natuurhoofdstuk en hoeft na een buitenactiviteit niet terug naar Prachinburi-stad.",
      tradeoff:
        "Parkstatus, wildwateractiviteiten en wegcondities kunnen veranderen; een resortovernachting geeft geen automatische toegang of activiteitengarantie.",
      transport:
        "Bevestig parkmededelingen, ontmoetingspunt, aanbieder, weersituatie en voertuig rechtstreeks voordat je de natuurdag vastzet.",
    },
  ],
  hotelPicks: [
    {
      name: "iRabbit Hotel",
      area: "Na Mueang, Prachinburi-stad",
      category: "Beste praktische stadsbasis",
      bestFor:
        "Korte stadsstops, lokale restaurants en reizigers die voorzieningen boven een resortlocatie kiezen",
      description:
        "De officiële hotelsite bevestigt het adres in Na Mueang, de centrale stadspositie, meerdere kamertypen, ontbijt, parkeren en rechtstreeks gepubliceerde verblijfsvoorwaarden.",
      whySelected:
        "Dit is de duidelijkste stadspick in de vergelijking. Controleer het beschikbare kamertype en de werkelijke route naar station, rivier en erfgoed voor jouw planning.",
      officialUrl: "https://irabbithotel.com/",
    },
    {
      name: "Siamdasada Khaoyai",
      area: "Noen Hom, Khao Yai-route",
      category: "Beste groene Khao Yai-zijde",
      bestFor:
        "Stellen, tuinliefhebbers en natuurreizigers die bewust aan de Prachinburi-kant verblijven",
      description:
        "De rechtstreeks beheerde website bevestigt Siamdasada aan Prachin–Khao Yai Road in Noen Hom, met eigen kamers, tuinen en contactgegevens.",
      whySelected:
        "Het maakt de parkzijde tot een zelfstandige verblijfkeuze. Controleer live welke tuindelen en diensten open zijn en verwar deze locatie niet met Pak Chong.",
      officialUrl: "https://www.siamdasada.com/",
    },
    {
      name: "Kantary 304 Hotel",
      area: "Tha Tum, Si Maha Phot",
      category: "Beste voor een compleet lang verblijf",
      bestFor:
        "Zakelijke reizigers, gezinnen en gasten die studio's of suites met extra leefruimte zoeken",
      description:
        "De officiële hotelsite publiceert de locatie in Tha Tum en een aanbod van hotelkamers en suites met werk- en verblijfsvoorzieningen.",
      whySelected:
        "De verschillende suite-indelingen zijn nuttig voor een langer verblijf in de 304-zone. Vergelijk bezetting, bedden en actuele voorwaarden per kamer.",
      officialUrl: "https://www.kantary304-prachinburi.com/",
    },
    {
      name: "Tawa Ravadee Resort Prachinburi",
      area: "Tha Tum, Si Maha Phot",
      category: "Beste resort- en vergaderbasis",
      bestFor:
        "Evenementen, gezinnen en zakenreizigers die tuin, sport en hotelservice combineren",
      description:
        "De eigen resortsite bevestigt de Si Maha Phot-locatie, kamers en suites, tuinen, recreatie, restaurants en vergaderfaciliteiten.",
      whySelected:
        "Dit verblijf biedt een ander ritme dan een serviced apartment. Controleer welke recreatie- en restaurantruimtes tijdens jouw verblijf beschikbaar zijn.",
      officialUrl: "https://www.tawaravadeehotel.com/index_en.html",
    },
    {
      name: "The Canal 304 Hotel & Residence",
      area: "304 Industrial Park, Si Maha Phot",
      category: "Beste residentie met ruime kamers",
      bestFor:
        "Meerdere nachten, werkbezoek en reizigers die restaurant en ontspanningsfaciliteiten op het terrein willen",
      description:
        "De officiële website bevestigt het adres in Tha Tum, verschillende kamerformaten, een restaurant en clubvoorzieningen voor hotel- en residentiegasten.",
      whySelected:
        "Een bruikbare vergelijking voor wie in de 304-zone wil wonen in plaats van alleen overnachten. Bevestig de gekozen verblijfsformule rechtstreeks.",
      officialUrl: "https://thecanal304.com/home/",
    },
    {
      name: "The Garden 304",
      area: "Tha Tum, Si Maha Phot",
      category: "Beste rustige tuinbasis in de 304-zone",
      bestFor:
        "Langere werkreizen en gasten die een groene hotelomgeving binnen de zakelijke corridor zoeken",
      description:
        "De rechtstreeks beheerde site bevestigt het adres in Si Maha Phot en publiceert hotelcontact, restaurant, tuinconcept en verblijfsvoorzieningen.",
      whySelected:
        "Deze keuze legt meer nadruk op een groene woonomgeving. Controleer kamer, maaltijden en eventuele langverblijfvoorwaarden voor de actuele data.",
      officialUrl: "https://www.thegarden304.com/",
    },
    {
      name: "Serenity Hotel & Spa Onsen",
      area: "Mueang Kao, Kabin Buri",
      category: "Beste wellnessstop in Kabin Buri",
      bestFor:
        "Stellen, roadtrips en reizigers die een zelfstandige hotel- en wellnessstop zoeken",
      description:
        "De officiële hotelsite bevestigt het adres in Kabin Buri en publiceert kamers, restaurant, spa, onsen en andere hotelvoorzieningen.",
      whySelected:
        "Een sterke rustbasis voor de oostelijke route. Bevestig behandeling, onsenvoorwaarden en opening afzonderlijk van de kamerreservering.",
      officialUrl: "https://serenityhotelonsen.com/",
    },
    {
      name: "The Verona at Tub Lan",
      area: "Bu Phram, Na Di",
      category: "Beste familiebasis bij de Thap Lan-route",
      bestFor:
        "Gezinnen, roadtrips en reizigers die een themaverblijf met eigen activiteiten zoeken",
      description:
        "De officiële resortsite bevestigt de locatie aan Route 304 in Bu Phram, Na Di, met meerdere kamerconcepten, restaurants en activiteiten op het terrein.",
      whySelected:
        "Het is een zelfstandige Na Di-basis en geen stads- of Pak Chong-hotel. Controleer activiteit, huisdierbeleid en parkroute los van de kamer.",
      officialUrl: "https://www.veronatublan.com/",
    },
  ],
  splitStay: {
    eyebrow: "Eén route, hooguit één bewuste wissel",
    title: "Slaap waar je volgende ochtend werkelijk begint.",
    description:
      "Voor een korte stop kies je één basis: stad, 304, Kabin Buri of natuur. Combineer Prachinburi-stad alleen met Noen Hom of Na Di wanneer erfgoed én beschermd woud afzonderlijke reisdoelen zijn. Een zakelijke afspraak in Si Maha Phot is geen reden om extra hotelwissels toe te voegen.",
    routes: [
      {
        label: "Stad & erfgoed",
        title: "Prachinburi-stad plus Noen Hom",
        description:
          "Behoud de stadsbasis voor rivier en erfgoed en wissel alleen naar Noen Hom als de Khao Yai-zijde een volwaardig natuurhoofdstuk krijgt.",
      },
      {
        label: "Werkroute",
        title: "Si Maha Phot als enige basis",
        description:
          "Kies het hotel op fabriekspoort, suite en maaltijden; dagelijkse ritten terug naar de provinciehoofdstad voegen weinig toe.",
      },
      {
        label: "Oost & woud",
        title: "Kabin Buri plus Na Di",
        description:
          "Combineer een comfortabele oostelijke stop met Na Di wanneer Thap Lan of de Sai Yai-rivier voldoende tijd en live bevestigde toegang krijgt.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Vergelijk vijf kaartpinnen",
      description:
        "Zet stad, Noen Hom, Si Maha Phot, Kabin Buri en Na Di naast elkaar voordat je op een provincienaam filtert.",
    },
    {
      title: "Controleer de juiste parkingang",
      description:
        "Khao Yai-oost en Thap Lan zijn verschillende natuurkeuzes; volg actuele informatie van het park dat je werkelijk bezoekt.",
    },
    {
      title: "Match hotel en bedrijfspoort",
      description:
        "Vraag in de 304-zone om een exacte kaartpin voor je afspraak, want de zakelijke corridor is uitgestrekt.",
    },
    {
      title: "Vergelijk gelijke voorwaarden",
      description:
        "Match gasten, kamer, bedden, ontbijt, belastingen, betaalmoment en annulering voordat je actuele totaalprijzen vergelijkt.",
    },
  ],
  faqs: [
    {
      question: "In welk gebied kun je het beste verblijven in Prachinburi?",
      answer:
        "Kies Prachinburi-stad voor erfgoed en voorzieningen, Noen Hom voor de Khao Yai-zijde, Si Maha Phot voor de 304-corridor, Kabin Buri voor een oostelijke stop en Na Di voor Thap Lan en de Sai Yai-route.",
    },
    {
      question: "Is Prachinburi-stad een goede basis voor Khao Yai?",
      answer:
        "De stad kan werken voor een beperkte rit naar de Prachinburi-ingang, maar Noen Hom is logischer wanneer Khao Yai het hoofddoel is. Controleer altijd de actuele ingang en toegankelijke parkdelen.",
    },
    {
      question: "Ligt Na Di bij Khao Yai?",
      answer:
        "Na Di ligt in dezelfde provincie, maar de natuurroute draait daar om Thap Lan, Bu Phram en de Sai Yai-rivier. Behandel het niet als een hotelwijk van Khao Yai of Pak Chong.",
    },
    {
      question: "Waar verblijf je voor 304 Industrial Park?",
      answer:
        "Kies Tha Tum of de ruimere Si Maha Phot-zone. Kantary 304, Tawa Ravadee, The Canal 304 en The Garden 304 bedienen verschillende verblijfsstijlen binnen die corridor.",
    },
    {
      question: "Is Kabin Buri een goede tussenstop?",
      answer:
        "Ja wanneer je route oostwaarts of via Route 304 loopt en je een complete hotelstop wilt. Voor de bezienswaardigheden van Prachinburi-stad is Kabin Buri geen centrale basis.",
    },
    {
      question: "Kun je zonder auto in Prachinburi verblijven?",
      answer:
        "In de stad kun je enkele lokale ritten en het station plannen, maar de meeste provinciebrede combinaties vragen vooraf geregeld vervoer. Voor Noen Hom, 304, Kabin Buri en Na Di is een exacte vervoersplanning belangrijk.",
    },
    {
      question: "Wanneer boek je een natuurverblijf in Prachinburi?",
      answer:
        "Boek pas nadat je het gewenste park, de ingang en de activiteit hebt gekozen. Weer, wegconditie, wildwaterseizoen en parkmededelingen kunnen je dagindeling veranderen.",
    },
    {
      question: "Hoe vergelijk je hotelprijzen in Prachinburi?",
      answer:
        "Vergelijk dezelfde data, gasten, kamer, bedden, ontbijt, belastingen, betaalmoment en annulering. Open daarna de aanbieder voor de actuele totaalprijs en beschikbaarheid.",
    },
  ],
  relatedGuides: [
    {
      title: "Waar verblijven in Thailand?",
      description:
        "Vergelijk eerst bestemming en gebied, en pas daarna het hotel en de actuele voorwaarden.",
      href: "/nl/where-to-stay/",
      image: riversideHotelImage,
    },
    {
      title: "Bestemmingen in Thailand",
      description:
        "Plaats Prachinburi tussen Bangkok, het oosten en de bergroute richting Korat.",
      href: "/nl/city/",
      image: mountainHotelImage,
    },
    {
      title: "Praktische reisinformatie",
      description:
        "Plan vervoer, veiligheid en actuele reisvoorwaarden voor een provinciebrede roadtrip.",
      href: "/nl/practical-info/",
      image: forestLodgeImage,
    },
  ],
  sources: [
    {
      title: "Prachin Buri",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Prachin-Buri/230",
      note:
        "Officiële bestemmingsbron voor rivierlandschap, erfgoed en de afzonderlijke natuurgebieden Khao Yai en Thap Lan.",
    },
    {
      title: "iRabbit Hotel",
      creator: "iRabbit Hotel",
      url: "https://irabbithotel.com/",
      note:
        "Officiële hotelbron voor adres in Na Mueang, kamers, voorzieningen en verblijfsvoorwaarden.",
    },
    {
      title: "Siamdasada Khaoyai",
      creator: "Siamdasada Khaoyai",
      url: "https://www.siamdasada.com/",
      note:
        "Officiële resortbron voor de locatie aan Prachin–Khao Yai Road in Noen Hom en het actuele resortaanbod.",
    },
    {
      title: "Kantary 304 Hotel, Prachinburi",
      creator: "Cape & Kantary Hotels",
      url: "https://www.kantary304-prachinburi.com/",
      note:
        "Officiële hotelbron voor locatie, kamers, suites en langverblijffaciliteiten in Tha Tum.",
    },
    {
      title: "Tawa Ravadee Resort Prachinburi",
      creator: "Tawa Ravadee Resort",
      url: "https://www.tawaravadeehotel.com/index_en.html",
      note:
        "Officiële resortbron voor het adres in Si Maha Phot, kamers, recreatie en vergaderfaciliteiten.",
    },
    {
      title: "The Canal 304 Hotel & Residence",
      creator: "The Canal 304",
      url: "https://thecanal304.com/home/",
      note:
        "Officiële hotelbron voor de locatie in 304 Industrial Park, kamerformules, restaurant en clubvoorzieningen.",
    },
    {
      title: "The Garden 304",
      creator: "The Garden 304",
      url: "https://www.thegarden304.com/",
      note:
        "Officiële hotelbron voor het adres in Si Maha Phot, tuinconcept, restaurant en rechtstreeks hotelcontact.",
    },
    {
      title: "Serenity Hotel & Spa Onsen",
      creator: "Serenity Hotel & Spa Onsen",
      url: "https://serenityhotelonsen.com/",
      note:
        "Officiële hotelbron voor het adres in Kabin Buri, kamers, restaurants en wellnessvoorzieningen.",
    },
    {
      title: "The Verona at Tub Lan",
      creator: "The Verona at Tub Lan",
      url: "https://www.veronatublan.com/",
      note:
        "Officiële resortbron voor Bu Phram in Na Di, kamerconcepten, restaurants en activiteiten.",
    },
  ],
  dateModified: "2026-07-31",
};
