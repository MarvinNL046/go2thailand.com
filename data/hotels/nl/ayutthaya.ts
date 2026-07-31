import type { HotelGuideData } from "../types";

export const ayutthayaHotelGuide: HotelGuideData = {
  citySlug: "ayutthaya",
  cityName: "Ayutthaya",
  parentGuideHref: "/nl/city/ayutthaya/",
  locale: "nl",
  pageTitle: "Waar verblijven in Ayutthaya? Gebieden & hotels",
  pageDescription:
    "Vergelijk het historische eiland, de rivier en de stationszijde. Kies een praktische basis en bekijk actuele hotelbeschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/ayutthaya/",
  heroImage: "/images/redesign/best-hotels-ayutthaya-en-hero.webp",
  heroAlt: "Sfeervol terras aan een rivier in historisch Ayutthaya",
  eyebrow: "Slaap dichtbij de ervaring die je zoekt",
  heroTitle: "Waar verblijven",
  heroAccent: "in Ayutthaya?",
  intro:
    "Overnachten maakt Ayutthaya meer dan een gehaaste dagtocht. Je kunt vroeger bij de ruïnes starten, later langs de rivier eten en een rustiger ritme kiezen. Het historische eiland is meestal de praktischste basis; een rivierhotel maakt juist het verblijf zelf onderdeel van de reis.",
  quickAnswer:
    "Kies het historische eiland of de directe rand voor tempels, fietsen en een vroege start. De zuidelijke rivieroever past bij sfeer en designhotels. De oostelijke stationszijde is handig bij een treinreis, maar vraagt meestal een oversteek naar de belangrijkste ruïnes. Bang Pa-In is een afzonderlijke routekeuze en geen vervanging voor een stadshotel.",
  areaDecisionNote:
    "Een rivierzicht of provincieadres zegt weinig over je echte route. Controleer de exacte hotelpin tegenover de tempels, het station en je geplande avondadres. Actuele prijzen en voorwaarden blijven bij Trip.com.",
  areas: [
    {
      slug: "historisch-eiland",
      name: "Historisch eiland",
      shortLabel: "Tempels eerst",
      tone: "easy",
      image: "/images/cities/ayutthaya/ayutthaya-historical-park.webp",
      imageAlt: "Bakstenen tempelruïnes in Ayutthaya Historical Park",
      bestFor:
        "Een eerste bezoek, fietsen, fotografie en vroege tempelbezoeken",
      summary:
        "Op het eiland liggen de kern van het Historical Park, lokale straten en verschillende kleinschalige hotels. Niet iedere tempel ligt op loopafstand, maar je beperkt onnodige transfers.",
      advantage:
        "De sterkste basis om vroeg te starten en tussendoor terug te keren.",
      tradeoff:
        "Kleine hotels bieden vaak minder resortfaciliteiten en hitte maakt een korte kaartafstand zwaarder.",
      transport:
        "Vergelijk de hotelentree met je eerste tempel en kies daarna lopen, fiets of tuk-tuk.",
    },
    {
      slug: "zuidelijke-rivier",
      name: "Zuidelijke rivierzijde",
      shortLabel: "Sfeer & uitzicht",
      tone: "scenic",
      image: "/images/redesign/ayutthaya-river-heritage.webp",
      imageAlt:
        "Historische bebouwing en rivier in Ayutthaya bij warm avondlicht",
      bestFor: "Stellen, designhotels en een verblijf met rivierdiners",
      summary:
        "Aan de zuid- en zuidoostkant kijken hotels uit over werkende rivieren, tempels en historische locaties. Het uitzicht kan prachtig zijn, maar ligt niet altijd aan dezelfde kant als de bezienswaardigheid.",
      advantage:
        "De accommodatie voelt hier sterker als onderdeel van de historische ervaring.",
      tradeoff:
        "Een populaire restaurantlocatie, beperkt aantal kamers of verkeerde kamerzijde kan de rust en het uitzicht veranderen.",
      transport:
        "Controleer de exacte kamer, oever en avondroute in plaats van alleen “riverside” te boeken.",
    },
    {
      slug: "naresuan-chao-phrom",
      name: "Naresuan & Chao Phrom",
      shortLabel: "Eten & lokale straten",
      tone: "local",
      image: "/images/redesign/ayutthaya-food-specialties.webp",
      imageAlt: "Lokale eetsfeer in Ayutthaya met warme historische details",
      bestFor:
        "Kleinschalige hotels, lokale maaltijden en een praktische eilandbasis",
      summary:
        "De oostelijke eilandstraten combineren guesthouses, eetgelegenheden en lokaal vervoer. De precieze straat bepaalt of je rustig slaapt of juist dicht bij avondactiviteit zit.",
      advantage:
        "Een bruikbaar midden tussen Historical Park, eten en aankomstlogistiek.",
      tradeoff:
        "Verkeer en ongelijke stoepen maken niet iedere korte route prettig met bagage.",
      transport: "Teken zowel de route naar de ruïnes als je avondstraat uit.",
    },
    {
      slug: "station-oostbank",
      name: "Station & oostbank",
      shortLabel: "Treinlogica",
      tone: "quiet",
      image: "/images/redesign/experience-ayutthaya.webp",
      imageAlt: "Historische ervaring en route door Ayutthaya",
      bestFor:
        "Een vroege trein, korte doorreis, auto en reizigers die hotelvoorzieningen belangrijk vinden",
      summary:
        "Ayutthaya Station ligt aan de oostkant van de Pa Sak. Deze zijde is logisch voor aankomst en grotere hotels, maar de historische eilandkern ligt aan de overkant.",
      advantage: "Minder frictie bij trein, auto en sommige doorgaande routes.",
      tradeoff: "De tempels en sfeervolle eilandavonden vragen vaker vervoer.",
      transport:
        "Plan de rivieroversteek of tuk-tuk als onderdeel van iedere Historical Park-dag.",
    },
  ],
  hotelPicks: [
    {
      name: "sala ayutthaya",
      area: "Zuidelijke rivierzijde",
      category: "Designhotel",
      bestFor: "Stellen en tempelzicht",
      description:
        "Een kleinschalig designhotel aan de Chao Phraya met een sterke relatie tussen architectuur, rivier en historische omgeving.",
      whySelected:
        "Een duidelijke keuze wanneer het hotel en het uitzicht net zo belangrijk zijn als minimale reistijd.",
      officialUrl: "https://www.salahospitality.com/ayutthaya/",
    },
    {
      name: "Baan Pomphet",
      area: "Zuidoostelijk eiland",
      category: "Boutique",
      bestFor: "Architectuur, rivier en een rustig tempo",
      description:
        "Een boutiqueverblijf bij het historische Pom Phet, met de rivier en restaurantbeleving als belangrijk onderdeel.",
      whySelected:
        "Verbindt een herkenbare erfgoedlocatie met een kleinschalige overnachting.",
      officialUrl: "https://baanpomphet.com/",
    },
    {
      name: "BAAT Boutique Hotel",
      area: "Historisch eiland",
      category: "Kleinschalig",
      bestFor: "Tempelbezoeken en zelfstandig reizen",
      description:
        "Een compact boutiquehotel op het eiland voor reizigers die de historische stad als dagelijkse basis willen.",
      whySelected:
        "Praktische eilandkeuze zonder te suggereren dat alle ruïnes te voet bereikbaar zijn.",
      officialUrl: "https://baathotel.com/en/",
    },
    {
      name: "Centara Ayutthaya",
      area: "Outer city",
      category: "Volledig stadshotel",
      bestFor: "Gezinnen, auto en moderne faciliteiten",
      description:
        "Een groter hotel buiten de historische eilandkern, gericht op reizigers die faciliteiten en wegverbindingen belangrijk vinden.",
      whySelected:
        "Een bewuste ruil: meer hotelvoorzieningen, maar geen parkbasis.",
      officialUrl: "https://www.centarahotelsresorts.com/centara/cay",
    },
    {
      name: "Kantary Hotel Ayutthaya",
      area: "Oostelijke stad",
      category: "Ruime kamers",
      bestFor: "Langere verblijven en reizigers met auto",
      description:
        "Een serviced-hotelconcept aan de moderne kant van Ayutthaya met ruimere verblijfsvormen.",
      whySelected:
        "Relevant wanneer kamerformaat en parkeren zwaarder wegen dan lopen naar tempels.",
      officialUrl: "https://www.kantaryhotel-ayutthaya.com/",
    },
    {
      name: "sala bang pa-in",
      area: "Bang Pa-In",
      category: "Afzonderlijk rivierresort",
      bestFor: "Een rustige verlenging buiten de stad",
      description:
        "Een designresort aan de rivier in Bang Pa-In, duidelijk los van de Historical Park-basis.",
      whySelected:
        "Alleen sterk wanneer Bang Pa-In bewust een tweede deel van de route is.",
      officialUrl: "https://www.salahospitality.com/bang-pa-in/",
    },
  ],
  splitStay: {
    eyebrow: "Dagtocht of blijven slapen?",
    title: "Zo geeft een overnachting meer rust",
    description:
      "Voor de meeste reizigers is één hotel voldoende. Voeg Bang Pa-In alleen toe als afzonderlijke ervaring.",
    routes: [
      {
        label: "Route A",
        title: "Eén nacht op het eiland",
        description:
          "Kom in de middag, beleef de avond en start de volgende ochtend vroeg bij de ruïnes.",
      },
      {
        label: "Route B",
        title: "Twee nachten aan de rivier",
        description:
          "Geeft tijd voor Historical Park, een rustpauze en een tweede avond zonder haast.",
      },
      {
        label: "Route C",
        title: "Ayutthaya + Bang Pa-In",
        description:
          "Alleen logisch bij een langzamer routeplan met een afzonderlijk rivier- of paleisdeel.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Pin je eerste tempel",
      description:
        "Een eilandadres is pas praktisch als de ingang en route bij jouw ochtendplan passen.",
    },
    {
      title: "Controleer de kamerzijde",
      description:
        "Bij een rivierhotel kan alleen een specifieke categorie het afgebeelde uitzicht hebben.",
    },
    {
      title: "Plan hitte en bagage",
      description:
        "Afstanden die op de kaart kort lijken, zijn niet altijd prettig te lopen met koffers of in de middagzon.",
    },
    {
      title: "Vergelijk actuele voorwaarden",
      description:
        "Bekijk kamertype, ontbijt, belastingen en annulering bij de aanbieder; vaste prijsclaims verouderen snel.",
    },
  ],
  faqs: [
    {
      question: "Waar kun je het beste verblijven in Ayutthaya?",
      answer:
        "Voor een eerste bezoek is het historische eiland of de directe rand meestal het handigst. Je beperkt vervoer naar de belangrijkste ruïnes en kunt eerder starten. Kies de rivierzijde als sfeer en het hotel zelf zwaarder wegen.",
    },
    {
      question: "Is het de moeite waard om in Ayutthaya te overnachten?",
      answer:
        "Ja. Een overnachting geeft een rustigere avond, een vroege start en ruimte voor een pauze tijdens het warmste deel van de dag. Dat is een wezenlijk andere ervaring dan een snelle dagtocht uit Bangkok.",
    },
    {
      question: "Kun je Ayutthaya te voet bekijken?",
      answer:
        "Een deel wel, maar het Historical Park en de buitenliggende tempels zijn verspreid. Fiets, tuk-tuk of auto blijft vaak nodig. Kies je hotel op basis van de monumenten die je echt wilt bezoeken.",
    },
    {
      question: "Is het station een goede plek om te slapen?",
      answer:
        "Het station is handig bij een vroege trein of korte doorreis. Voor de tempels en de sfeer van het historische eiland moet je wel de rivier oversteken, waardoor het minder vanzelfsprekend is voor een volledig bezoek.",
    },
    {
      question: "Hoeveel nachten heb je nodig in Ayutthaya?",
      answer:
        "Eén nacht is genoeg voor een avond en een volle tempelochtend. Twee nachten passen beter bij een rustig tempo, meerdere buitenliggende ruïnes of wanneer het rivierhotel onderdeel van de ervaring is.",
    },
  ],
  relatedGuides: [
    {
      title: "Ayutthaya reisgids",
      description: "Plan tempels, vervoer en je plek in de Thailandroute.",
      href: "/nl/city/ayutthaya/",
      image: "/images/redesign/ayutthaya-destination-hero.webp",
    },
    {
      title: "Bezienswaardigheden",
      description:
        "Kies de ruïnes en musea die bij je beschikbare tijd passen.",
      href: "/nl/city/ayutthaya/attractions/",
      image: "/images/cities/ayutthaya/ayutthaya-historical-park.webp",
    },
    {
      title: "Eten in Ayutthaya",
      description:
        "Proef roti sai mai, riviergarnalen en lokale avondgerechten.",
      href: "/nl/city/ayutthaya/food/",
      image: "/images/redesign/ayutthaya-food-river-table-nl.webp",
    },
  ],
  sources: [
    {
      title: "Phra Nakhon Si Ayutthaya",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Phra-Nakhon-Si-Ayutthaya/229",
      note: "Officiële bestemmingscontext en positie van het Historical Park.",
    },
    {
      title: "Slow Lane in Ayutthaya",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Articles/slow-lane-in-ayutthaya",
      note: "Context voor de omvang van het park, museum en buitenliggende rivierlocaties.",
    },
    {
      title: "sala ayutthaya",
      creator: "Officiële hotelsite",
      url: "https://www.salahospitality.com/ayutthaya/",
      note: "Controle van ligging en hotelpositionering.",
    },
    {
      title: "Baan Pomphet",
      creator: "Officiële hotelsite",
      url: "https://baanpomphet.com/",
      note: "Controle van erfgoedlocatie en verblijfskarakter.",
    },
    {
      title: "Centara Ayutthaya",
      creator: "Officiële hotelsite",
      url: "https://www.centarahotelsresorts.com/centara/cay",
      note: "Controle van hoteltype en buitenstedelijke ligging.",
    },
    {
      title: "sala bang pa-in",
      creator: "Officiële hotelsite",
      url: "https://www.salahospitality.com/bang-pa-in/",
      note: "Controle dat Bang Pa-In een afzonderlijke verblijfslocatie is.",
    },
  ],
  dateModified: "2026-07-31",
};
