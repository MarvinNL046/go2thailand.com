import type { HotelGuideData } from "../types";

export const lampangHotelGuide: HotelGuideData = {
  citySlug: "lampang",
  cityName: "Lampang",
  parentGuideHref: "/nl/city/lampang/",
  locale: "nl",
  pageTitle: "Waar verblijven in Lampang? Gebieden & hotels",
  pageDescription:
    "Vergelijk Kad Kong Ta, Wiang Nuea, Suan Dok, Sop Tui en de groene zuidrand. Kies een passende basis en bekijk actuele hotelbeschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/lampang/",
  heroImage: "/images/redesign/lampang-destination-hero.webp",
  heroAlt:
    "Historische bebouwing en de Wang-rivier in het rustige centrum van Lampang",
  eyebrow: "Kies tussen rivieravonden, stadspraktijk en een groene uitvalsbasis",
  heroTitle: "Waar verblijven",
  heroAccent: "in Lampang?",
  intro:
    "Lampang is compact genoeg voor korte stadsritten, maar de juiste hotelzone bepaalt of je 's avonds naar Kad Kong Ta wandelt, soepel op trein of bus stapt, of juist wakker wordt in een groene omgeving buiten de historische kern. Kies daarom eerst je avondritme en vervoer; vergelijk pas daarna kamer en actuele voorwaarden.",
  quickAnswer:
    "Voor een eerste bezoek zonder eigen vervoer is de omgeving van Kad Kong Ta en de Wang-rivier de meest sfeervolle basis. Wiang Nuea past bij rustige tempel- en erfgoedwandelingen, terwijl Sop Tui praktischer is bij een vroege trein of bus. Kies Chomphu en de zuidrand alleen bewust voor ruimte, parkeren of resortrust: de oude stad ligt dan niet vanzelf voor de deur.",
  areaDecisionNote:
    "Een adres in Mueang Lampang kan zowel in de historische kern als aan de snelweg of in een groene buitenzone liggen. Controleer daarom de kaartpin, de werkelijke looproute na zonsondergang en je aansluiting op vervolgvervoer. De boekingsknoppen tonen actuele beschikbaarheid via Trip.com; deze gids zet geen vaste prijzen of reviewscores vast.",
  areas: [
    {
      slug: "kad-kong-ta-wang-river",
      name: "Kad Kong Ta & Wang-rivier",
      shortLabel: "Historische avonden",
      tone: "scenic",
      image: "/images/redesign/lampang-kad-kong-ta.webp",
      imageAlt:
        "Historische houten gevels bij Kad Kong Ta aan de Wang-rivier in Lampang",
      bestFor:
        "Een eerste bezoek, oude architectuur en een avondwandeling langs de rivier",
      summary:
        "Talat Kao Road en de straten rond Ratsadaphisek Bridge vormen de meest herkenbare erfgoedzone van Lampang. De officiële toeristische informatie koppelt Kad Kong Ta aan de historische handel langs de Wang-rivier; het actuele walking-streetprogramma moet je wel afzonderlijk controleren.",
      advantage:
        "Je verblijft midden in het karakter van de stad en kunt rivier, bruggen en oude handelsgevels in één rustig avondrondje combineren.",
      tradeoff:
        "Kleine erfgoedverblijven hebben niet altijd een lift, zwembad of geluidsisolatie van een modern stadshotel; houten bouw kan hoorbaar zijn.",
      transport:
        "Loop de route naar je gewenste avondadres op de kaart na en regel vervoer voor station, busstation, Wat Phra That Lampang Luang en andere provinciale uitstappen.",
    },
    {
      slug: "wiang-nuea-tha-ma-o",
      name: "Wiang Nuea & Tha Ma O",
      shortLabel: "Tempels en woonstraten",
      tone: "local",
      image: "/images/redesign/lampang-luang-temple.webp",
      imageAlt:
        "Houten Lanna-architectuur en tempeldetails in de provincie Lampang",
      bestFor:
        "Langzame stadsdagen, lokale woonstraten en erfgoed ten noorden van de rivier",
      summary:
        "Aan de noordkant van de Wang liggen oude buurten, houten huizen en tempels zoals Wat Phra Kaew Don Tao. Deze zone voelt lokaler dan de commerciële vervoerskant, maar de exacte locatie binnen Wiang Nuea of Hua Wiang bepaalt hoeveel je werkelijk te voet doet.",
      advantage:
        "Een kalmer stadsritme met eenvoudige toegang tot de noordelijke erfgoedlaag van Lampang.",
      tradeoff:
        "Voor restaurants, stations en sommige avondmarkten is een korte rit vaker nodig dan een aantrekkelijke wijknaam doet vermoeden.",
      transport:
        "Controleer brugkeuze en avondroute naar Kad Kong Ta; plan voor verder gelegen tempels een fiets, lokale rit of chauffeur op basis van je eigen mobiliteit.",
    },
    {
      slug: "suan-dok-city-centre",
      name: "Suan Dok & centraal Lampang",
      shortLabel: "Stadsgemak",
      tone: "easy",
      image: "/images/redesign/lampang-destination-hero.webp",
      imageAlt:
        "Centrale stadsroute langs de Wang-rivier en historische brug in Lampang",
      bestFor:
        "Een korte citytrip, zakelijke reis en wie faciliteiten boven erfgoedlogies kiest",
      summary:
        "De centrale blokken rond Suan Dok bieden grotere stadshotels, winkels en dagelijkse voorzieningen. Het is een functionele middenpositie, maar niet ieder centraal adres ligt direct aan de historische rivierstraat.",
      advantage:
        "Je houdt meerdere stadsrichtingen bereikbaar zonder aan de snelweg of diep in een woonwijk te verblijven.",
      tradeoff:
        "De omgeving kan verkeersgerichter en minder sfeervol zijn dan Kad Kong Ta, vooral wanneer je hotel aan een doorgaande weg ligt.",
      transport:
        "Bekijk de hotelingang en veilige looproute naar je dineradres; vergelijk voor aankomst en vertrek de echte route naar luchthaven, station en busstation.",
    },
    {
      slug: "sop-tui-station-bus",
      name: "Sop Tui, station & busstation",
      shortLabel: "Vlot doorreizen",
      tone: "easy",
      image: "/images/cities/generated/lampang.webp",
      imageAlt:
        "Stedelijk landschap van Lampang met noordelijke architectuur en heuvels",
      bestFor:
        "Trein- en busreizigers, een late aankomst en een praktische overnachting",
      summary:
        "Sop Tui is de vervoersgerichte kant van de stad. Hotels bij het busstation of op de route naar Nakhon Lampang Station besparen gedoe op een reisdag, maar leveren niet automatisch de prettigste rivieravond op.",
      advantage:
        "Aankomst en vertrek zijn eenvoudiger wanneer je accommodatie bewust op het juiste vervoersknooppunt is gekozen.",
      tradeoff:
        "Je kiest vooral logistiek; voor Kad Kong Ta, tempels en een karaktervolle avond is meestal een aparte verplaatsing nodig.",
      transport:
        "Controleer of je trein of bus werkelijk bij het knooppunt aankomt waarop je hotelkeuze is gebaseerd en leg alleen een transfer vast die de aanbieder voor jouw tijd bevestigt.",
    },
    {
      slug: "chomphu-south",
      name: "Chomphu & groene zuidrand",
      shortLabel: "Ruimte en rust",
      tone: "quiet",
      image: "/images/redesign/lampang-food-wang-river-rooster-bowls.webp",
      imageAlt:
        "Groene riviersfeer en lokaal keramiek in de omgeving van Lampang",
      bestFor:
        "Reizigers met eigen vervoer, parkeren, een tuin of meer tijd in het verblijf",
      summary:
        "Ten zuiden van de compacte kern liggen moderne hotels aan de hoofdroute en ruimere verblijven in een groenere omgeving. Dit kan handig zijn voor Ko Kha en Wat Phra That Lampang Luang, maar het is een andere keuze dan slapen bij de oude stad.",
      advantage:
        "Meer buitenruimte, gemakkelijker parkeren of extra hotelfaciliteiten kunnen hier zwaarder wegen dan directe toegang tot de avondzone.",
      tradeoff:
        "Restaurants en erfgoedstraten zijn niet vanzelf beloopbaar; een rustige ligging maakt je afhankelijker van gepland vervoer.",
      transport:
        "Controleer de afrit, parkeerinformatie en terugrit na het diner. Combineer de zone alleen met Ko Kha als de route voor jouw reisdag logisch uitkomt.",
    },
  ],
  hotelPicks: [
    {
      name: "The Riverside Guest House",
      area: "Kad Kong Ta & Wang-rivier",
      category: "Erfgoedverblijf aan de rivier",
      bestFor: "Reizigers die sfeer en een historische avondroute prioriteren",
      description:
        "Een kleinschalig guesthouse aan Talad Kao Road met tuin, veranda en kamers in een karaktervolle rivieromgeving.",
      whySelected:
        "Het officiële adres plaatst het direct in de oude handelsstraat. Dat maakt het een inhoudelijk sterke keuze voor Kad Kong Ta, zolang je het passende kamertype en eventuele trappen of geluid in het historische pand vooraf controleert.",
      officialUrl: "https://www.theriverside-lampang.com/",
    },
    {
      name: "Kanecha's Home",
      area: "Wiang Nuea, Wang-rivier",
      category: "Familiehomestay met rivierzicht",
      bestFor: "Een lokaal verblijf met zelfstandige stadswandelingen",
      description:
        "Een kleinschalige homestay aan Charoen Prathet Road met verschillende kamer- en huisindelingen, terras en zicht richting Wang-rivier en Ratsadaphisek Bridge.",
      whySelected:
        "De eigen site benoemt de ligging bij rivier, lokale markt en Kad Kong Ta. Houten kamers verschillen onderling en kunnen leefgeluid doorgeven, dus kies bewust op indeling in plaats van alleen op de naam van het verblijf.",
      officialUrl: "https://www.kanecha-home.com/",
    },
    {
      name: "Regent Lodge Lampang",
      area: "Hua Wiang, noordelijk centrum",
      category: "Functioneel stadshotel",
      bestFor: "Reizigers die een eenvoudig stadsadres en eigen vervoer combineren",
      description:
        "Een lokaal hotel aan Phaholyothin Road in Hua Wiang, aan de noordelijke kant van centraal Lampang.",
      whySelected:
        "Het voegt een praktische optie buiten de rivierguesthouses toe. Controleer bij het boeken het actuele kamertype, de faciliteiten die je nodig hebt en de route naar je avondadres rechtstreeks bij het hotel.",
      officialUrl: "https://regentlodgelampang.com/",
    },
    {
      name: "Wienglakor Hotel Lampang",
      area: "Suan Dok & centraal Lampang",
      category: "Groter Lanna-stadshotel",
      bestFor: "Stellen, groepen en reizigers die service en ruimte wensen",
      description:
        "Een hotel aan Phaholyothin Road met meerdere kamerformaten, restaurant- en vergaderruimte, parkeergelegenheid en een interieur met Noord-Thaise details.",
      whySelected:
        "Wienglakor biedt meer hotelservice dan een kleine homestay en ligt centraal zonder zichzelf als rivierlogies te presenteren. Verifieer een gewenste transfer of specifieke voorziening voor je eigen aankomsttijd.",
      officialUrl: "https://www.wienglakorhotel.com/",
    },
    {
      name: "C2 Residence Hotel Lampang",
      area: "Sop Tui, bij het busstation",
      category: "Compacte vervoersbasis",
      bestFor: "Een busaankomst, korte overnachting of vroege doorreis",
      description:
        "Een kleurrijk, compact hotel aan Chansurin Road in Sop Tui, door de eigen site duidelijk gepositioneerd bij het provinciale busstation.",
      whySelected:
        "Dit is een logistieke keuze en geen vervanging voor een hotel in de oude rivierwijk. Juist daardoor is het bruikbaar wanneer een busverbinding belangrijker is dan een avondwandeling langs Kad Kong Ta.",
      officialUrl: "https://www.c2lampanghotel.com/",
    },
    {
      name: "HOP INN Lampang City Center",
      area: "Sop Tui, vervoers- en winkelzone",
      category: "Gestandaardiseerd budgethotel",
      bestFor: "Een voorspelbare kamer, parkeren en een praktische reisnacht",
      description:
        "Een ketenhotel aan Chansurin Road met compacte standaardkamers en een locatie in de vervoersgerichte kant van de stad.",
      whySelected:
        "De officiële hotelpagina maakt kamertype en adres helder. Het past bij gemak-eerst-reizigers; voor het erfgoedkarakter van Lampang plan je bewust een rit naar de Wang-rivier.",
      officialUrl:
        "https://www.hopinnhotel.com/our-hotels/hop-inn-lampang-city-center",
    },
    {
      name: "Tree Tara Hotel",
      area: "Chomphu, zuidrand",
      category: "Modern hotel met extra faciliteiten",
      bestFor: "Automobilisten, werkreizen en gasten die een onsen of werkruimte zoeken",
      description:
        "Een modern hotel aan de Super Highway in Chomphu met verschillende kamerindelingen, werkruimte, fitness en privé-onsen volgens de eigen hotelinformatie.",
      whySelected:
        "Het is een duidelijke faciliteitenkeuze buiten de historische kern en heeft parkeercontext op de officiële site. Controleer de actuele beschikbaarheid van de onsen of andere doorslaggevende voorzieningen voordat je boekt.",
      officialUrl: "https://www.treetarahotel.com/en/",
    },
    {
      name: "Lampang River Lodge Resort",
      area: "Chomphu, groene zuidrand",
      category: "Lanna-resort in het groen",
      bestFor: "Stellen en gezinnen die tuin- en resortrust boven stadsavonden zetten",
      description:
        "Een ruim opgezet verblijf aan de Wang-rivier met Lanna-geïnspireerde gebouwen, tuinen en een meerachtige waterpartij in Chomphu.",
      whySelected:
        "Dit is de echte rustkeuze van de selectie. De officiële informatie bevestigt ook dat er geen gratis shuttle en geen lift is; bespreek bereikbaarheid en een geschikt kamertype wanneer die punten belangrijk zijn.",
      officialUrl: "https://www.lampangriverlodge.com/",
    },
  ],
  splitStay: {
    eyebrow: "Stadsbasis of tweede ritme?",
    title: "Verhuis alleen als het verblijf echt verandert",
    description:
      "Voor twee of drie nachten is één basis in of rond de stad bijna altijd rustiger. Een split-stay wordt pas zinvol wanneer je na de historische kern bewust resortrust zoekt of Lampang koppelt aan een volgende noordelijke bestemming.",
    routes: [
      {
        label: "1–2 nachten",
        title: "Kies één stadszone",
        description:
          "Slaap bij Kad Kong Ta voor sfeer of bij Sop Tui wanneer je vervolgverbinding het programma bepaalt.",
      },
      {
        label: "3 nachten",
        title: "Blijf op dezelfde basis",
        description:
          "Gebruik één dag voor de rivierstad en één gerichte rit naar Ko Kha of een andere provinciale richting zonder tussentijds inpakken.",
      },
      {
        label: "4+ nachten",
        title: "Stad plus groene etappe",
        description:
          "Combineer alleen een centrale basis met Chomphu wanneer tuin, rust en hoteltijd zelf een wezenlijk deel van de reis vormen.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Kies op avondroute",
      description:
        "Bepaal of je na het eten wilt wandelen of vervoer accepteert; dat onderscheidt Kad Kong Ta van Sop Tui en Chomphu beter dan een algemene centrumclaim.",
    },
    {
      title: "Controleer het juiste knooppunt",
      description:
        "Station en busstation liggen niet op dezelfde plek. Leg je hotelpin naast het vertrekpunt van je concrete trein of bus.",
    },
    {
      title: "Vergelijk gelijke boekingen",
      description:
        "Vergelijk hetzelfde kamertype, dezelfde bezetting, belastingen, ontbijt, betaalmoment en annuleringsvoorwaarden in het actuele totaal.",
    },
    {
      title: "Verifieer toegankelijkheid",
      description:
        "Vraag naar trappen, lift, drempels, badkamerindeling, parkeren en actuele faciliteiten wanneer die je keuze bepalen, vooral bij houten erfgoedverblijven en resorts.",
    },
  ],
  faqs: [
    {
      question: "Wat is de beste plek om te verblijven in Lampang?",
      answer:
        "Voor de meeste eerste bezoekers is Kad Kong Ta aan de Wang-rivier de sfeervolste basis. Kies Sop Tui voor een trein- of busgerichte overnachting en Chomphu wanneer rust, parkeren of hotelfaciliteiten belangrijker zijn dan 's avonds wandelen.",
    },
    {
      question: "Kun je Lampang vanuit je hotel te voet verkennen?",
      answer:
        "Rond Kad Kong Ta, de bruggen en delen van Wiang Nuea kun je veel korte stukken lopen, afhankelijk van hitte, regen, verkeer en je mobiliteit. Station, busstation, Wat Phra That Lampang Luang en veel provinciale attracties horen niet bij één eenvoudige wandelroute.",
    },
    {
      question: "Hoeveel nachten heb je nodig in Lampang?",
      answer:
        "Twee nachten geven tijd voor een rustige stadsdag en een avond aan de Wang-rivier. Met drie nachten kun je één gerichte uitstap naar bijvoorbeeld Ko Kha toevoegen zonder aankomst- en vertrekdag vol te proppen.",
    },
    {
      question: "Is Kad Kong Ta iedere avond een walking street?",
      answer:
        "Nee, behandel Kad Kong Ta eerst als historische straat en rivierwijk. Controleer het actuele marktprogramma en eventuele wijzigingen voor jouw reisdatum via een lokale, actuele bron; baseer je hotelkeuze niet op een oud weekendschema.",
    },
    {
      question: "Waar kun je het beste slapen als je met de trein reist?",
      answer:
        "Een hotel aan de Sop Tui-kant kan praktisch zijn, maar controleer de echte route naar Nakhon Lampang Station en je aankomsttijd. Een centrale of rivierbasis kan prettiger zijn voor meerdere nachten wanneer je voor één transfer vervoer regelt.",
    },
    {
      question: "Heb je een auto nodig in Lampang?",
      answer:
        "Niet voor iedere stadswandeling, maar eigen vervoer of een geregelde rit maakt Ko Kha en verspreide provinciale bezienswaardigheden eenvoudiger. Kies je een hotel aan de zuidrand, plan dan ook je avondritten in plaats van alleen de dagroute.",
    },
    {
      question: "Is een hotel bij Wat Phra That Lampang Luang handig?",
      answer:
        "Alleen wanneer Ko Kha of een rustige provinciale etappe je hoofddoel is. De tempel ligt buiten Lampang-stad; voor Kad Kong Ta, stadsrestaurants en vervolgvervoer is een stadsbasis doorgaans veelzijdiger.",
    },
    {
      question: "Is Lampang geschikt voor gezinnen?",
      answer:
        "Ja, vooral met een rustig programma en een kamerindeling die bij het gezin past. Controleer bezettingsregels, verbindingskamers, zwembadtoezicht, trappen en vervoer rechtstreeks voor de gekozen reisdata.",
    },
  ],
  relatedGuides: [
    {
      title: "Lampang reisgids",
      description:
        "Plan Wang-rivier, Kad Kong Ta, Ko Kha en één haalbare provinciale richting.",
      href: "/nl/city/lampang/",
      image: "/images/redesign/lampang-destination-hero.webp",
    },
    {
      title: "Bezienswaardigheden in Lampang",
      description:
        "Zet tempels, erfgoedwijken en verre uitstappen in een logische volgorde.",
      href: "/nl/city/lampang/attractions/",
      image: "/images/redesign/lampang-luang-temple.webp",
    },
    {
      title: "Eten in Lampang",
      description:
        "Bouw een eetroute rond noedels, Noord-Thaise gerechten, keramiek en een bevestigde marktavond.",
      href: "/nl/city/lampang/food/",
      image: "/images/redesign/lampang-food-ceramics.webp",
    },
  ],
  sources: [
    {
      title: "Lampang",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Lampang/104",
      note: "Primaire bestemmingscontext voor Kad Kong Ta, de Wang-rivier, stadsroutes en Wat Phra That Lampang Luang.",
    },
    {
      title: "10 Things to Do in Lampang",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Articles/10-things-to-do-in-lampang",
      note: "Primaire locatiecontext voor Kad Kong Ta en Wat Phra That Lampang Luang in Ko Kha.",
    },
    {
      title: "The Riverside Guest House",
      creator: "The Riverside Guest House",
      url: "https://www.theriverside-lampang.com/",
      note: "Controle van het officiële adres aan Talad Kao Road en het karakter van het verblijf.",
    },
    {
      title: "Kanecha's Home",
      creator: "Kanecha's Home",
      url: "https://www.kanecha-home.com/",
      note: "Controle van adres, riviercontext, kamertypes en informatie over houten kamers.",
    },
    {
      title: "Regent Lodge Lampang",
      creator: "Regent Lodge Lampang",
      url: "https://regentlodgelampang.com/",
      note: "Controle van het officiële adres in Hua Wiang en de positionering als stadshotel.",
    },
    {
      title: "Wienglakor Hotel Lampang",
      creator: "Wienglakor Hotel",
      url: "https://www.wienglakorhotel.com/",
      note: "Controle van adres, kamerindelingen, horeca, parkeren en hotelservices.",
    },
    {
      title: "C2 Residence Hotel Lampang",
      creator: "C2 Residence Hotel",
      url: "https://www.c2lampanghotel.com/",
      note: "Controle van het adres in Sop Tui, de relatie tot het busstation en kamerfaciliteiten.",
    },
    {
      title: "HOP INN Lampang City Center",
      creator: "HOP INN Hotels",
      url: "https://www.hopinnhotel.com/our-hotels/hop-inn-lampang-city-center",
      note: "Controle van adres, standaardkamer en officiële positionering binnen Lampang.",
    },
    {
      title: "Tree Tara Hotel",
      creator: "Tree Tara Hotel",
      url: "https://www.treetarahotel.com/en/",
      note: "Controle van het adres in Chomphu, kamerindelingen, parkeren, werkruimte, fitness en onsen.",
    },
    {
      title: "Lampang River Lodge Resort",
      creator: "Lampang River Lodge Resort",
      url: "https://www.lampangriverlodge.com/",
      note: "Controle van adres, landschapsconcept, kamertypes en praktische informatie over shuttle, lift en bereikbaarheid.",
    },
  ],
  dateModified: "2026-07-31",
};
