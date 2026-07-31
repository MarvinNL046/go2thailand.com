import type { HotelGuideData } from "../types";

export const pattayaHotelGuide: HotelGuideData = {
  citySlug: "pattaya",
  cityName: "Pattaya",
  parentGuideHref: "/nl/city/pattaya/",
  locale: "nl",
  pageTitle: "Waar verblijven in Pattaya? Gebieden & hotelkeuzes",
  pageDescription:
    "Vergelijk Central Pattaya, Naklua, Wong Amat, Pratumnak en Jomtien. Kies je uitvalsbasis en bekijk actuele hotelbeschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/pattaya/",
  heroImage: "/images/redesign/best-hotels-pattaya-en-hero.webp",
  heroAlt: "Hotelterras met uitzicht over de baai en skyline van Pattaya",
  eyebrow: "Kies eerst het juiste deel van de kust",
  heroTitle: "Waar verblijven",
  heroAccent: "in Pattaya?",
  intro:
    "Pattaya is een langgerekte kuststad. Een hotel aan Beach Road geeft een ander reistempo dan een resort bij Wong Amat of een kamer aan Jomtien Beach. Kies daarom eerst het gebied dat past bij je avonden, strandwensen en vervoer, en vergelijk daarna pas de actuele kamerprijs.",
  quickAnswer:
    "Central Pattaya is het makkelijkst voor winkels, restaurants en uitgaan. Naklua en Wong Amat passen beter bij een rustiger resortverblijf, Pratumnak bij reizigers die afstand van de drukte willen en Jomtien bij een langere strandstrook met een kalmer dagritme. Controleer altijd de exacte kaartpin: dezelfde wijknaam kan een heel andere looproute betekenen.",
  areaDecisionNote:
    "Deze gids vergelijkt concrete hotels en legt uit wat hun adres voor je dagindeling betekent. De prijs wordt niet vastgezet: de boekingsknoppen openen de actuele beschikbaarheid via Trip.com.",
  areas: [
    {
      slug: "central-pattaya",
      name: "Central Pattaya & Beach Road",
      shortLabel: "Alles dichtbij",
      tone: "easy",
      image: "/images/cities/pattaya/attractions/Pattaya Beach.webp",
      imageAlt: "Pattaya Beach en de centrale baai langs Beach Road",
      bestFor: "Een eerste bezoek, winkels, restaurants en uitgaan",
      summary:
        "Tussen Beach Road, Second Road en het centrum vind je de grootste concentratie aan hotels, winkelcentra en avondleven. De sfeer en geluidsoverlast kunnen per straat sterk verschillen.",
      advantage:
        "Veel dagelijkse adressen zijn te voet of via de songthaew-route bereikbaar.",
      tradeoff:
        "Verkeer, drukte en nachtelijk geluid wegen hier vaak zwaarder dan een klein verschil in hotelklasse.",
      transport:
        "Controleer de echte looproute naar Beach Road en of je dagelijks een drukke weg moet oversteken.",
    },
    {
      slug: "naklua-wong-amat",
      name: "Naklua & Wong Amat",
      shortLabel: "Rustiger resortgevoel",
      tone: "quiet",
      image: "/images/cities/pattaya/pattaya-sanctuary-truth.webp",
      imageAlt: "Groene kust bij Naklua en het Sanctuary of Truth",
      bestFor: "Gezinnen, resortfaciliteiten en een rustiger strandverblijf",
      summary:
        "Ten noorden van de centrale baai wordt Pattaya residentiëler en meer resortgericht. Wong Amat ligt dichter bij het strandgevoel; Naklua Road geeft meer lokale eet- en vervoersopties.",
      advantage:
        "Meer afstand van de drukste uitgaansstraten zonder Pattaya volledig te verlaten.",
      tradeoff:
        "Voor veel avonden in Central Pattaya of Walking Street heb je herhaald vervoer nodig.",
      transport:
        "Bekijk de route van de hotelentree naar Naklua Road; sommige resorts liggen aan een lange of steile zijweg.",
    },
    {
      slug: "pratumnak",
      name: "Pratumnak",
      shortLabel: "Tussen twee stranden",
      tone: "scenic",
      image: "/images/redesign/pattaya-sanctuary-route.webp",
      imageAlt: "Groene kustroute in Pattaya met uitzicht over zee",
      bestFor:
        "Stellen, rust en reizigers die taxi of eigen vervoer prima vinden",
      summary:
        "De heuvel tussen Pattaya en Jomtien voelt afgescheidener dan het centrum. Exacte hoogte, straat en toegang bepalen of strand, restaurants en doorgaande routes praktisch zijn.",
      advantage: "Een kalmere basis met delen van de stad aan beide kanten.",
      tradeoff:
        "De kaart lijkt compact, maar hellingen en indirecte wegen maken lopen minder vanzelfsprekend.",
      transport:
        "Reken de dagelijkse ritten naar zowel Central Pattaya als Jomtien mee voordat je boekt.",
    },
    {
      slug: "jomtien",
      name: "Jomtien & Na Jomtien",
      shortLabel: "Langere stranddagen",
      tone: "local",
      image: "/images/redesign/pattaya-destination-hero.webp",
      imageAlt: "Kust en palmen bij Pattaya aan de Golf van Thailand",
      bestFor: "Langere verblijven, strandwandelingen en een rustiger dagritme",
      summary:
        "Jomtien heeft een lange boulevard, appartementen, hotels en veel eetgelegenheden. Na Jomtien ligt verder zuidelijk en kan aanzienlijk verder van het centrum liggen dan de naam suggereert.",
      advantage:
        "Meer ruimte langs de kust en doorgaans minder intens dan Central Pattaya.",
      tradeoff:
        "Een goedkope kamer ver naar het zuiden kan tijd en taxikosten toevoegen aan iedere stadsavond.",
      transport:
        "Controleer of je hotel aan de songthaew-route ligt en onderscheid Jomtien duidelijk van Na Jomtien.",
    },
  ],
  hotelPicks: [
    {
      name: "Hilton Pattaya",
      area: "Central Pattaya",
      category: "Luxe stadsverblijf",
      bestFor: "Uitzicht en maximale centrumtoegang",
      description:
        "Een hoogbouwhotel boven Central Pattaya met directe aansluiting op de centrale winkel- en strandzone.",
      whySelected:
        "Duidelijke keuze wanneer de ligging en het uitzicht onderdeel van de stedentrip zijn.",
      officialUrl: "https://www.hilton.com/en/hotels/bkkhphi-hilton-pattaya/",
    },
    {
      name: "Areca Lodge",
      area: "Central Pattaya",
      category: "Middenklasse",
      bestFor: "Een praktische centrale basis",
      description:
        "Een gevestigd stadshotel tussen Second Road en Soi Buakhao, dicht bij restaurants en avondleven.",
      whySelected:
        "Laat goed zien dat een centraal hotel vooral op looproute en kamerrust moet worden beoordeeld.",
      officialUrl: "https://www.arecalodge.com/",
    },
    {
      name: "Amari Pattaya",
      area: "North Pattaya",
      category: "Familieresort",
      bestFor: "Gezinnen en resortfaciliteiten",
      description:
        "Een groot resort aan de noordkant van Pattaya Bay, bij de overgang naar Naklua.",
      whySelected:
        "Combineert voorzieningen voor gezinnen met toegang tot de stad zonder in het drukste centrum te zitten.",
      officialUrl: "https://www.amari.com/pattaya",
    },
    {
      name: "Centara Grand Mirage Beach Resort Pattaya",
      area: "Wong Amat",
      category: "Strandresort",
      bestFor: "Gezinnen die veel hoteltijd plannen",
      description:
        "Een grootschalig resort aan Wong Amat met uitgebreide water- en recreatiefaciliteiten.",
      whySelected:
        "Het verblijf zelf is hier een belangrijk deel van de reis; dat rechtvaardigt de rustigere ligging.",
      officialUrl: "https://www.centarahotelsresorts.com/centaragrand/cmbr",
    },
    {
      name: "Dusit Thani Pattaya",
      area: "North Pattaya",
      category: "Klassiek resort",
      bestFor: "Strandtoegang en bereikbaarheid",
      description:
        "Een resort bij de noordelijke bocht van Pattaya Bay en de vervoersroutes rond Dolphin Roundabout.",
      whySelected:
        "Een bruikbare middenweg tussen resortruimte en toegang tot Central Pattaya.",
      officialUrl: "https://www.dusit.com/dusitthani-pattaya/",
    },
    {
      name: "Royal Cliff Grand Hotel",
      area: "Pratumnak",
      category: "Afgescheiden resort",
      bestFor: "Rust, uitzicht en veel faciliteiten",
      description:
        "Onderdeel van een groot resortcomplex op de landtong tussen Pattaya en Jomtien.",
      whySelected:
        "Sterke keuze wanneer afstand van de stad een voordeel is en niet iedere maaltijd buiten de deur hoeft.",
      officialUrl: "https://www.royalcliff.com/royal-cliff-grand-hotel/",
    },
    {
      name: "D Varee Jomtien Beach",
      area: "Jomtien",
      category: "Strandhoogbouw",
      bestFor: "Een langere kustbasis",
      description:
        "Een hoogbouwhotel aan Jomtien Beach met de boulevard en kustzone voor de deur.",
      whySelected:
        "Een duidelijke Jomtien-keuze voor reizigers die strandtijd boven centrale nightlife plaatsen.",
      officialUrl: "https://djb.dvaree.com/",
    },
  ],
  splitStay: {
    eyebrow: "Eén hotel of combineren?",
    title: "Verdeel je nachten alleen met een reden",
    description:
      "Binnen Pattaya verhuizen kost tijd. Splits je verblijf alleen als de tweede basis echt een andere ervaring toevoegt.",
    routes: [
      {
        label: "Route A",
        title: "Alleen Central Pattaya",
        description:
          "Praktisch voor een korte eerste reis met winkels, restaurants en avondleven.",
      },
      {
        label: "Route B",
        title: "Centrum + Wong Amat",
        description:
          "Combineer twee actieve nachten met rustiger resort- en strandtijd.",
      },
      {
        label: "Route C",
        title: "Jomtien als vaste basis",
        description:
          "Kies één kusthotel en plan alleen gerichte ritten naar het centrum.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Controleer de kaartpin",
      description:
        "Pattaya, Jomtien en Na Jomtien worden in zoekresultaten ruim gebruikt; vergelijk de echte route naar je belangrijkste adressen.",
    },
    {
      title: "Vraag naar de kamerzijde",
      description:
        "Straat-, evenement- en nightlifegeluid kan binnen hetzelfde hotel sterk verschillen.",
    },
    {
      title: "Vergelijk het totaal",
      description:
        "Open de actuele prijs inclusief kamertype, belastingen, ontbijt en annuleringsvoorwaarden.",
    },
    {
      title: "Plan je avondrit",
      description:
        "Een rustig resort is alleen voordelig als je niet iedere avond lang heen en weer wilt reizen.",
    },
  ],
  faqs: [
    {
      question: "Welk deel van Pattaya is het beste om te verblijven?",
      answer:
        "Central Pattaya is het makkelijkst voor een eerste bezoek met winkels en avondleven. Wong Amat en Naklua passen beter bij rust en resorts, Pratumnak bij afzondering en Jomtien bij langere stranddagen.",
    },
    {
      question: "Is Jomtien beter dan Central Pattaya?",
      answer:
        "Jomtien is meestal beter voor een rustiger kustverblijf; Central Pattaya is praktischer voor winkels, restaurants en uitgaan. De beste keuze hangt af van waar je de meeste avonden wilt doorbrengen.",
    },
    {
      question: "Kun je in Pattaya zonder auto verblijven?",
      answer:
        "Ja, vooral rond Central Pattaya en delen van Jomtien. Kies een hotel aan een bruikbare songthaew-route en controleer de loopafstand; afgelegen resorts en zijstraten maken taxi’s vaker nodig.",
    },
    {
      question: "Hoeveel nachten heb je nodig in Pattaya?",
      answer:
        "Drie nachten geven ruimte voor de stad, een stranddag en bijvoorbeeld Koh Larn. Plan langer wanneer het resort, Jomtien of meerdere dagtochten een belangrijk deel van je reis zijn.",
    },
    {
      question: "Is Pattaya geschikt voor gezinnen?",
      answer:
        "Ja, maar kies het gebied zorgvuldig. North Pattaya, Wong Amat en delen van Jomtien hebben veel gezinsgerichte resorts; controleer strandtoegang, zwembadfaciliteiten en de avondomgeving rond het hotel.",
    },
  ],
  relatedGuides: [
    {
      title: "Pattaya reisgids",
      description: "Plan je route, wijken en belangrijkste ervaringen.",
      href: "/nl/city/pattaya/",
      image: "/images/redesign/pattaya-destination-hero.webp",
    },
    {
      title: "Wat te doen in Pattaya",
      description: "Vergelijk stranden, cultuur en dagtochten.",
      href: "/nl/city/pattaya/attractions/",
      image: "/images/redesign/pattaya-sanctuary-route.webp",
    },
    {
      title: "Eten in Pattaya",
      description: "Van visrestaurants tot lokale markten.",
      href: "/nl/city/pattaya/food/",
      image: "/images/redesign/pattaya-food-coast-table-nl.webp",
    },
  ],
  sources: [
    {
      title: "Pattaya",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Pattaya/469",
      note: "Officiële context voor de bestemming, stranden en het brede activiteitenaanbod.",
    },
    {
      title: "Chon Buri – Pattaya 3 Days",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/chon-buri-pattaya-3-days",
      note: "Controle van Jomtien en andere bestemmingspunten binnen Pattaya.",
    },
    {
      title: "Hilton Pattaya",
      creator: "Officiële hotelsite",
      url: "https://www.hilton.com/en/hotels/bkkhphi-hilton-pattaya/",
      note: "Controle van merk, ligging en hotelpositionering.",
    },
    {
      title: "Amari Pattaya",
      creator: "Officiële hotelsite",
      url: "https://www.amari.com/pattaya",
      note: "Controle van ligging en gezinsgerichte resortpositionering.",
    },
    {
      title: "Centara Grand Mirage Pattaya",
      creator: "Officiële hotelsite",
      url: "https://www.centarahotelsresorts.com/centaragrand/cmbr",
      note: "Controle van ligging en resortfaciliteiten.",
    },
    {
      title: "Dusit Thani Pattaya",
      creator: "Officiële hotelsite",
      url: "https://www.dusit.com/dusitthani-pattaya/",
      note: "Controle van ligging aan de noordzijde van Pattaya Bay.",
    },
  ],
  dateModified: "2026-07-31",
};
