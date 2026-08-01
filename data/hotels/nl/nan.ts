import type { HotelGuideData } from "../types";

const nanOldTownImage = "/images/redesign/nan-hotel-hero.webp";
const nanRiverfrontImage = "/images/redesign/nan-riverfront-hotel.webp";
const nanPuaImage = "/images/redesign/nan-pua-hotel.webp";

export const nanHotelGuide: HotelGuideData = {
  citySlug: "nan",
  cityName: "Nan",
  parentGuideHref: "/nl/city/",
  locale: "nl",
  pageTitle: "Waar verblijven in Nan? 8 hotels & Pua",
  pageDescription:
    "Vergelijk de oude stad, Nan-rivier, luchthavenzijde, rustige stadsrand en Pua. Kies uit 8 gecontroleerde hotels en bekijk beschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/nan/",
  heroImage: nanOldTownImage,
  heroAlt:
    "Heritage hotelterras met uitzicht op Wat Phumin en de oude stad van Nan",
  eyebrow: "Slaap bij Wat Phumin of bouw een tweede bergbasis",
  heroTitle: "Waar verblijven",
  heroAccent: "in Nan?",
  intro:
    "Nan-stad is compact rond Wat Phumin, het museum en de rustige tempelstraten, maar de hotels liggen ook langs de rivier, bij de noordelijke luchthavenroute en op groene stadsranden. Pua hoort niet bij die stadswijken: het is een zelfstandige tweede basis voor Doi Phu Kha en de verdere bergroute. Kies eerst of je tempels, een vlucht of een vroege bergdag zonder extra verplaatsing wilt beginnen.",
  quickAnswer:
    "Kies Nan Nakara voor Wat Phumin, Pukha Nanfa voor houten stadserfgoed, Nan Boutique Hotel voor een complete centrale basis, Nan Seasons voor rust tussen velden en rivierlandschap, Nan Boutique Resort voor ruimte en wellness buiten de kern, Nantrungjai voor de noordelijke luchthavenzijde, Pua De View voor uitzicht over Pua en Cocoa Valley voor een kleinschalige cacao-ervaring. Vergelijk daarna dezelfde kamer en actuele totaalprijs; een hotelnaam met ‘Nan’ of ‘river’ bewijst geen wandelafstand of uitzicht.",
  areaDecisionNote:
    "Deze owner vergelijkt concrete verblijfslocaties. Wat Phumin, de Nan-rivier, Nan Nakhon Airport, de groene stadsrand, Pua en Doi Phu Kha zijn afzonderlijke kaartpinnen. Bo Kluea ligt verder in de bergen en wordt niet als hotelwijk van Nan-stad verkocht.",
  areas: [
    {
      slug: "old-town-wat-phumin",
      name: "Oude stad & Wat Phumin",
      shortLabel: "De beste eerste basis",
      tone: "local",
      image: nanOldTownImage,
      imageAlt:
        "Wat Phumin en de lage historische kern van Nan bij zonsopkomst",
      bestFor:
        "Eerste bezoeken, tempels, museum, Walking Street en rustig fietsen",
      summary:
        "Rond Wat Phumin, Nan National Museum en de oude tempelstraten ervaar je het culturele hart zonder telkens vervoer te regelen. De kern is klein genoeg om de precieze straat belangrijker te maken dan een generiek label ‘city center’.",
      advantage:
        "Je kunt vroeg naar de tempels, overdag pauzeren en ’s avonds terugkeren naar markt of oude stad zonder je dag aan een chauffeur te koppelen.",
      tradeoff:
        "Historische houten gebouwen kunnen andere geluidsisolatie, trappen en kamerindelingen hebben dan een modern resort.",
      transport:
        "Controleer hotelingang, tempelroute, fietsvoorziening en bagage-opslag; regel luchthaven en bergdagen afzonderlijk.",
    },
    {
      slug: "nan-river-phu-phiang",
      name: "Nan-rivier & Phu Phiang",
      shortLabel: "Ruimte, velden en een rustiger ritme",
      tone: "scenic",
      image: nanRiverfrontImage,
      imageAlt:
        "Boutique hotelterras aan de Nan-rivier tijdens het blauwe uur",
      bestFor:
        "Stellen, gezinnen, zwembad, uitzicht en reizigers met eigen vervoer",
      summary:
        "Aan de oostzijde van de rivier en in Phu Phiang liggen resorts met meer grond, groen en buitenruimte. De sfeer is landelijker, terwijl Wat Phumin en het avondritme een geplande rit blijven.",
      advantage:
        "Je ruilt de compacte tempelstraat in voor uitzicht, tuin, zwembad of een zelfstandiger resortverblijf.",
      tradeoff:
        "‘Riverside’ betekent niet dat iedere kamer aan het water ligt of dat de oude stad prettig te lopen is.",
      transport:
        "Open de kaart voor brug, Wat Phra That Chae Haeng en oude stad; bevestig ook de terugrit na het avondeten.",
    },
    {
      slug: "airport-north",
      name: "Luchthaven & noordzijde",
      shortLabel: "Praktisch bij een vluchtdag",
      tone: "easy",
      image: nanRiverfrontImage,
      imageAlt:
        "Rivierstad Nan met lage groene heuvels langs de noordelijke route",
      bestFor:
        "Vroege of late vlucht, zakenreis en automobilisten die noordwaarts vervolgen",
      summary:
        "De noordelijke stadszijde bij de luchthaven kan handig zijn wanneer aankomst, vertrek of de route richting Tha Wang Pha en Pua zwaarder weegt dan slapen naast Wat Phumin.",
      advantage:
        "Je kiest op routegemak en hotelvoorzieningen in plaats van een historische ligging die je op een korte doorreis nauwelijks gebruikt.",
      tradeoff:
        "De oude stad, Walking Street en avondrestaurants liggen niet vanzelf op je hotelstoep.",
      transport:
        "Controleer vluchtnummer, terminal, hotelpin en actueel vervoer rechtstreeks; baseer geen aansluiting op een oude transferbelofte.",
    },
    {
      slug: "quiet-city-edge",
      name: "Rustige stadsrand",
      shortLabel: "Tuin, wellness en langer verblijf",
      tone: "quiet",
      image: nanRiverfrontImage,
      imageAlt:
        "Rustige groene verblijfszijde aan de Nan-rivier buiten de oude kern",
      bestFor:
        "Gezinnen, wellness, meerdere nachten en reizigers die rust boven lopen zetten",
      summary:
        "Op de groene randen van Nan en Phu Phiang vind je grotere kamers, tuinen en resortfaciliteiten. Deze keuze werkt wanneer het hotel zelf deel van de dag mag zijn.",
      advantage:
        "Meer buitenruimte en faciliteiten maken rustdagen en gezinsverblijven eenvoudiger.",
      tradeoff:
        "Zonder eigen vervoer verlies je spontaniteit voor ontbijt, tempels en de avondmarkt in het centrum.",
      transport:
        "Vergelijk de werkelijke uitrit met oude stad, luchthaven en noordroute en reserveer alleen bevestigde diensten.",
    },
    {
      slug: "pua-doi-phu-kha",
      name: "Pua & Doi Phu Kha-route",
      shortLabel: "Een zelfstandige tweede basis",
      tone: "scenic",
      image: nanPuaImage,
      imageAlt:
        "Lodge bij rijstvelden van Pua met het Doi Phu Kha-gebergte aan de horizon",
      bestFor:
        "Berglandschap, lokale landbouw, Doi Phu Kha en een langzame noordelijke route",
      summary:
        "Pua is een eigen plaats met markt, tempels, cafés en uitzicht op het Doi Phu Kha-massief. Overnacht hier alleen wanneer de noordelijke provincie het hoofddoel wordt, niet als buitenwijk van Nan-stad.",
      advantage:
        "Je kunt een bergdag rustig voorbereiden en vermijdt dat Pua, Doi Phu Kha en Bo Kluea in één ambitieuze retourdag verdwijnen.",
      tradeoff:
        "Wat Phumin, het museum en Nan Airport horen niet meer bij je directe hotelomgeving.",
      transport:
        "Controleer weer, parkmededelingen, wegconditie, brandstof en voertuig; spreek verhuurderbeperkingen voor bergwegen expliciet af.",
    },
  ],
  hotelPicks: [
    {
      name: "Nan Nakara Hotel",
      area: "Oude stad, bij Wat Phumin",
      category: "Beste voor de tempelkern",
      bestFor:
        "Eerste bezoeken en reizigers die Wat Phumin, museum en avondmarkt centraal zetten",
      description:
        "De rechtstreeks beheerde website bevestigt het adres in Nai Wiang, de ligging bij Wat Phumin en Walking Street, verschillende kamertypen, fietsen en parkeren.",
      whySelected:
        "De kaartpin lost de belangrijkste Nan-vraag op: de oude stad beleven zonder dagelijkse rit. Controleer bedtype, deposit en annuleringsvoorwaarden vóór betaling.",
      officialUrl: "https://nannakara.com/",
    },
    {
      name: "Pukha Nanfa Hotel",
      area: "Oude stad, Sumon Thevarat Road",
      category: "Beste houten erfgoedhotel",
      bestFor:
        "Stellen, architectuurliefhebbers en reizigers die een kleinschalige Nan-identiteit zoeken",
      description:
        "De officiële hotelsite beschrijft een gerestaureerd houten hotel in het centrum met Lanna–Nan-inrichting en meerdere onderscheidende kamertypen.",
      whySelected:
        "Het verblijf zelf voegt erfgoedkarakter toe. Vergelijk trappen, kameroppervlak, bedden en geluidsverwachting met een modern hotel.",
      officialUrl: "https://www.pukhananfahotel.co.th/",
    },
    {
      name: "Nan Boutique Hotel",
      area: "Centraal Nai Wiang",
      category: "Beste complete centrale basis",
      bestFor:
        "Gezinnen, marktbezoek en reizigers die grotere kamers en hotelservice willen",
      description:
        "De eigen site plaatst het hotel centraal in Nai Wiang en publiceert standaard-, superior-, deluxe- en familiekamers, ontbijt, fietsen en lokale activiteiten.",
      whySelected:
        "Een praktische middenweg tussen een houten erfgoedhotel en een buitenresort. Controleer de exacte looproute naar jouw tempels in plaats van alleen ‘centrum’ te lezen.",
      officialUrl: "https://www.nanboutique.com/en/hotel/",
    },
    {
      name: "Nan Seasons Boutique Resort",
      area: "Phu Phiang, velden en rivierlandschap",
      category: "Beste landelijke rivierbasis",
      bestFor:
        "Stellen en rustige verblijven die bungalow, uitzicht, zwembad en restaurant combineren",
      description:
        "De officiële resortsite bevestigt de ligging in Muang Tuet, Phu Phiang, met villa’s en bungalows, tuin, zwembad, restaurant en uitzicht over velden en bergen.",
      whySelected:
        "Een echte landschapskeuze buiten de tempelkern. Bevestig kameruitzicht en vervoer afzonderlijk; niet iedere bungalow heeft dezelfde oriëntatie.",
      officialUrl: "https://www.nanseasons.com/",
    },
    {
      name: "Nan Boutique Resort",
      area: "Fai Kaew, rustige stadsrand",
      category: "Beste voor gezinnen en wellness",
      bestFor:
        "Gezinnen, toegankelijke kamers en langere verblijven met resortfaciliteiten",
      description:
        "De officiële groepssite beschrijft een rustige rivier- en heuvelsetting in Fai Kaew met ruime kamers, familiekamers, een toegankelijke kamer, zwembad en wellness.",
      whySelected:
        "De kamerruimte en faciliteiten lossen andere behoeften op dan een compacte old-townbasis. Plan alle ritten naar de stad vooraf.",
      officialUrl: "https://www.nanboutique.com/en/resort/",
    },
    {
      name: "Nantrungjai Boutique Hotel",
      area: "Pha Sing, luchthavenzijde",
      category: "Beste voor vlucht en noordroute",
      bestFor:
        "Korte verblijven, zakelijke bijeenkomsten en reizigers die noordwaarts vervolgen",
      description:
        "De rechtstreeks beheerde website positioneert het hotel bij Nan Airport en publiceert premier-, junior-suite- en boutiquekamers plus eventfaciliteiten.",
      whySelected:
        "Een functionele luchthavenbasis met meer hotelservice dan een guesthouse. Vraag vervoer voor jouw vlucht opnieuw aan en neem geen oude rijtijd over.",
      officialUrl: "https://www.nantrungjai.com/",
    },
    {
      name: "Pua De View Boutique Resort",
      area: "Pua centrum",
      category: "Beste voor Pua en bergzicht",
      bestFor:
        "Roadtrips, stellen en reizigers die markt, tempel en Doi Phu Kha-route combineren",
      description:
        "Het officiële LINE-profiel bevestigt het adres in Pua, de ligging tegenover Wat Phra That Beng Sakat, parkeren, tuin en uitzicht richting Doi Phu Kha.",
      whySelected:
        "Een logische Pua-basis met voorzieningen in de plaats zelf. Controleer kamerzijde, zwembad en wegconditie rechtstreeks voor jouw data.",
      officialUrl: "https://page.line.me/bcp4604m",
    },
    {
      name: "Cocoa Valley Resort",
      area: "Pua en landbouwlandschap",
      category: "Beste kleinschalige ervaringsbasis",
      bestFor:
        "Gezinnen, cacao-interesse en reizigers die Pua als meerdaagse tweede basis kiezen",
      description:
        "De officiële TAT-vermelding bevestigt het resort in Pua met accommodatie, cacaoboerderij, café en chocoladeactiviteiten rond lokaal geteelde cacao.",
      whySelected:
        "Het verblijf voegt een inhoudelijke lokale ervaring toe in plaats van alleen een bed. Bevestig workshop, taal, toegankelijkheid en kamertype per datum.",
      officialUrl: "https://www.thailandtravel.or.jp/cocoavalley/",
    },
  ],
  splitStay: {
    eyebrow: "Eén stadsbasis, hooguit één bergbasis",
    title: "Blijf bij Wat Phumin. Verplaats pas wanneer Pua je volgende hoofdstuk is.",
    description:
      "Voor twee of drie nachten werkt één hotel in of rond Nan-stad. Splits pas als Doi Phu Kha, Pua en mogelijk Bo Kluea voldoende tijd krijgen om een afzonderlijke noordelijke route te vormen.",
    routes: [
      {
        label: "2 nachten",
        title: "Oude stad als enige basis",
        description:
          "Combineer Wat Phumin, museum, tempels, rivier en avondmarkt zonder checkout.",
      },
      {
        label: "3 nachten",
        title: "Stad plus één landdag",
        description:
          "Behoud hetzelfde hotel en kies Phu Phiang, lokale dorpen of een beperkte noordelijke excursie.",
      },
      {
        label: "4+ nachten",
        title: "Nan-stad plus Pua",
        description:
          "Verplaats één keer en geef Pua, Doi Phu Kha en de bergweg een eigen planning met weerbuffer.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Scheid stad en provincie",
      description:
        "Vergelijk hotel, Wat Phumin, luchthaven, Pua en Doi Phu Kha als vijf afzonderlijke kaartpinnen.",
    },
    {
      title: "Bevestig uitzicht en toegang",
      description:
        "Rivier, rijstveld of berg in de hoteltekst geldt pas wanneer jouw kamer en toegangsroute dit expliciet bevestigen.",
    },
    {
      title: "Controleer de bergroute live",
      description:
        "Vraag naar weer, parkmededelingen, wegconditie, voertuig, brandstof en bereik voordat je Pua verlaat.",
    },
    {
      title: "Vergelijk dezelfde voorwaarden",
      description:
        "Match gasten, bedden, ontbijt, belastingen, betaalmoment en annulering voordat je actuele totaalprijzen beoordeelt.",
    },
  ],
  faqs: [
    {
      question: "In welk gebied kun je het beste verblijven in Nan?",
      answer:
        "Kies de oude stad rond Wat Phumin voor een eerste bezoek. Kies rivier of stadsrand voor rust en faciliteiten, de noordzijde voor een vluchtdag en Pua alleen voor een zelfstandige bergroute.",
    },
    {
      question: "Hoeveel nachten heb je nodig in Nan?",
      answer:
        "Twee nachten passen bij de oude stad, tempels, museum en rivier. Neem extra nachten wanneer Pua, Doi Phu Kha of Bo Kluea een echt onderdeel van de reis wordt.",
    },
    {
      question: "Kun je Nan-stad te voet verkennen?",
      answer:
        "De tempelkern rond Wat Phumin is compact en ook geschikt voor rustig fietsen. Rivierresorts, luchthaven, Wat Phra That Chae Haeng en stadsrand vragen vaker gepland vervoer.",
    },
    {
      question: "Waar verblijf je voor Nan Nakhon Airport?",
      answer:
        "Kies de noordelijke stadszijde wanneer de vlucht je planning bepaalt. Controleer hotelpin en vervoer voor het actuele vluchtnummer; een luchthavenvermelding is geen automatische transfergarantie.",
    },
    {
      question: "Is een hotel aan de Nan-rivier een goede keuze?",
      answer:
        "Ja wanneer rust, tuin of zwembad belangrijker zijn dan lopen naar Wat Phumin. Controleer wel kamerzicht, brugroute en avondvervoer, want ‘river’ in een naam bewijst geen directe ligging.",
    },
    {
      question: "Moet je in Pua overnachten voor Doi Phu Kha?",
      answer:
        "Niet voor iedere Nan-reis. Een Pua-nacht is logisch wanneer de bergroute een hoofddoel is en je voldoende tijd en weerbuffer hebt; anders blijft Nan-stad de veelzijdiger basis.",
    },
    {
      question: "Wanneer zijn hotels in Nan drukker?",
      answer:
        "Lokale festivals, bootraces, lange weekenden en populaire bergseizoenen kunnen de vraag verhogen. Controleer officiële data per reisjaar en kies passende annuleringsvoorwaarden.",
    },
    {
      question: "Hoe vergelijk je hotelprijzen in Nan?",
      answer:
        "Vergelijk exact dezelfde gasten, data, kamer, bedden, ontbijt, belastingen, betaalmoment en annulering. Open daarna de aanbieder voor de actuele totaalprijs en beschikbaarheid.",
    },
  ],
  relatedGuides: [
    {
      title: "Bestemmingsoverzichten in Thailand",
      description:
        "Kies een bestaande bestemmingseigenaar en plan stad, rivier en bergroute vanuit betrouwbare route-informatie.",
      href: "/nl/city/",
      image: nanOldTownImage,
    },
    {
      title: "Bezienswaardigheden per bestemming",
      description:
        "Vergelijk bestaande attractieoverzichten en behandel Pua en Doi Phu Kha als afzonderlijke provincieroutes.",
      href: "/nl/city/",
      image: nanPuaImage,
    },
    {
      title: "Alle Thaise bestemmingen",
      description:
        "Kies reisduur, vervoer en een beschikbare stad- of eilandgids voor je volgende routeblok.",
      href: "/nl/city/",
      image: nanRiverfrontImage,
    },
  ],
  sources: [
    {
      title: "Nan",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/trat/108",
      note:
        "Officiële bestemmingscontext voor Wat Phumin, de oude stad, Pua en Doi Phu Kha; de afwijkende URL-slug is van TAT zelf.",
    },
    {
      title: "Doi Phu Kha National Park",
      creator: "Department of National Parks Thailand",
      url: "https://portal.dnp.go.th/Content/nationalpark?contentId=40550",
      note:
        "Primaire parkbron voor actuele contactcontext; omstandigheden blijven een live check.",
    },
    {
      title: "Pukha Nanfa Hotel",
      creator: "Pukha Nanfa Hotel",
      url: "https://www.pukhananfahotel.co.th/accommodation",
      note: "Officiële bron voor historie, centrale ligging en kamertypen.",
    },
    {
      title: "Nan Boutique Hotel & Resort",
      creator: "Nan Boutique Hotel Group",
      url: "https://www.nanboutique.com/en/",
      note:
        "Officiële bron voor de afzonderlijke stads- en resortformules, kamers en voorzieningen.",
    },
    {
      title: "Nan Seasons Boutique Resort",
      creator: "Nan Seasons",
      url: "https://www.nanseasons.com/",
      note: "Officiële bron voor Phu Phiang-locatie, verblijfsvormen en faciliteiten.",
    },
    {
      title: "Nantrungjai Boutique Hotel",
      creator: "Nantrungjai",
      url: "https://www.nantrungjai.com/",
      note: "Officiële bron voor luchthavenpositionering, kamers en eventfaciliteiten.",
    },
    {
      title: "Pua De View",
      creator: "Pua De View Boutique Resort",
      url: "https://page.line.me/bcp4604m",
      note:
        "Officieel bedrijfsprofiel voor Pua-adres, bergzicht en basisvoorzieningen.",
    },
    {
      title: "Cocoa Valley Resort",
      creator: "Tourism Authority of Thailand Japan",
      url: "https://www.thailandtravel.or.jp/cocoavalley/",
      note: "Officiële hotelvermelding voor Pua, cacaoboerderij, café en workshops.",
    },
  ],
  dateModified: "2026-07-31",
};
