import type { HotelGuideData } from "../types";

export const udonThaniHotelGuide: HotelGuideData = {
  citySlug: "udon-thani",
  cityName: "Udon Thani",
  parentGuideHref: "/nl/city/udon-thani/",
  locale: "nl",
  pageTitle: "Waar verblijven in Udon Thani? Gebieden & hotels",
  pageDescription:
    "Vergelijk het centrum, Nong Prajak en rustige stadsranden. Kies uit 8 gecontroleerde hotels en bekijk actuele beschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/udon-thani/",
  heroImage: "/images/redesign/udon-thani-destination-hero.webp",
  heroAlt: "Stadslicht, tempels en het groene landschap rond Udon Thani",
  eyebrow: "Kies je stadsbasis vóór je hotel",
  heroTitle: "Waar verblijven",
  heroAccent: "in Udon Thani?",
  intro:
    "Udon Thani is een uitgestrekte Isaan-stad met verschillende praktische ankers. Rond Central Udon, het busstation en het treinstation zit je dicht bij winkels en avondeten; Nong Prajak biedt ruimte voor een rustige wandeling; de oostelijke en noordelijke stadsdelen passen beter bij designhotels en autoritten. Kies daarom eerst welke dagelijkse verplaatsing je wilt vermijden en vergelijk daarna pas de actuele kamerprijs.",
  quickAnswer:
    "Kies Centara Udon of The Pannarai voor een eerste korte stadsreis rond Central Udon, station en avondmarkt. Civilize is een rustigere centrale basis, Prajaktra past bij Nong Prajak, Brown House bij een lokale meeromgeving en De Princess, VELA Dhi of HOP INN bij een specifieke route of hotelstijl. Ban Chiang, Phu Phrabat en de Red Lotus Sea liggen buiten de compacte stad: boek daar niet blind een stadscentrumhotel voor zonder vervoer te plannen.",
  areaDecisionNote:
    "Deze pagina helpt je een hotel en stadsgebied kiezen. Voor bezienswaardigheden, eten en dagroutes gebruik je de complete Udon Thani-gids. Central Udon, treinstation, Bus Terminal 1, Nong Prajak en de luchthaven zijn afzonderlijke kaartpunten; ‘centrum’ betekent niet automatisch dat elk doel prettig beloopbaar is.",
  areas: [
    {
      slug: "central-udon-station",
      name: "Central Udon & stationskwartier",
      shortLabel: "Winkels, trein en avondeten",
      tone: "easy",
      image: "/images/redesign/udon-thani-destination-hero.webp",
      imageAlt: "Levendig centrum van Udon Thani rond het stationskwartier",
      bestFor: "Een eerste bezoek, korte verblijven, treinreizigers en veel keuze voor eten",
      summary:
        "De blokken rond Central Udon, Bus Terminal 1, het treinstation en de avondmarkt vormen de handigste basis zonder eigen auto. Je kunt meerdere dagelijkse adressen combineren, maar controleer de echte looproute en niet alleen de afstand op de kaart.",
      advantage: "De grootste concentratie van vervoer, winkels, restaurants en praktische voorzieningen.",
      tradeoff: "Meer verkeer en avondgeluid dan bij Nong Prajak of aan een rustige stadsrand.",
      transport: "Vergelijk de hotelingang met station en busstation; brede wegen en hitte kunnen een korte kaartafstand minder comfortabel maken.",
    },
    {
      slug: "posri-downtown",
      name: "Posri & administratief centrum",
      shortLabel: "Rustig centraal en lokaal",
      tone: "local",
      image: "/images/redesign/udon-thani-food-station-breakfast.webp",
      imageAlt: "Lokale ochtend en stadsleven in centraal Udon Thani",
      bestFor: "Stadsafspraken, lokale eetadressen en een centraler verblijf met minder uitgaansdrukte",
      summary:
        "Rond Posri Road en het centrale monument verblijf je nog steeds bruikbaar voor de binnenstad, maar buiten de drukste avondblokken. Het is een goede middenweg wanneer je overdag afspraken hebt en ’s avonds gericht vervoer wilt nemen.",
      advantage: "Een functionele stadsbasis met meer rust dan direct naast het winkel- en uitgaansgebied.",
      tradeoff: "Station, avondmarkt en Nong Prajak zijn niet vanuit ieder hotel vanzelfsprekende wandelingen.",
      transport: "Zet je vaste afspraak en gewenste avondadres naast de hotelpin voordat je boekt.",
    },
    {
      slug: "nong-prajak",
      name: "Nong Prajak & noordwestelijke binnenstad",
      shortLabel: "Park, ochtendwandeling en ruimte",
      tone: "scenic",
      image: "/images/redesign/udon-thani-nong-prajak.webp",
      imageAlt: "Groen park en water bij Nong Prajak in Udon Thani",
      bestFor: "Stellen, rustige ochtenden, hardlopers en reizigers die parkruimte waarderen",
      summary:
        "Nong Prajak is het duidelijkste openbare wandelanker van de stad. Hotels aan deze zijde passen bij een kalmer ochtend- en avondritme, terwijl station, Central Udon en busverbindingen meestal een gerichte rit blijven.",
      advantage: "Directe toegang tot groen en een herkenbare plek om buiten te bewegen.",
      tradeoff: "Minder spontane keuze voor winkels en avondeten dan in het stationskwartier.",
      transport: "Controleer aan welke zijde van het park je hotel werkelijk ligt en plan vervoer voor vroege trein- of busvertrekken.",
    },
    {
      slug: "east-adulyadej",
      name: "Adulyadej & oostelijke stadszijde",
      shortLabel: "Designhotels en rustige straten",
      tone: "quiet",
      image: "/images/redesign/udon-thani-ban-chiang.webp",
      imageAlt: "Isaan-vormen en rustige stedelijke sfeer aan de oostzijde van Udon Thani",
      bestFor: "Designgerichte verblijven, zakenreizen en reizigers die lokaal vervoer gebruiken",
      summary:
        "Aan de oostelijke zijde liggen verschillende moderne en uitgesproken designhotels. De buurt is bruikbaar met een auto of vaste ritten, maar minder geschikt als je elke avond te voet bij station of Central Udon wilt eindigen.",
      advantage: "Meer hotelkarakter en vaak een rustiger verblijf buiten het drukste commerciële blok.",
      tradeoff: "Bijna iedere centrale avond vraagt om lokaal vervoer of een bewuste langere wandeling.",
      transport: "Beoordeel de route naar je hoofdadres op reistijd en wegtype, niet op de brede aanduiding ‘city center’.",
    },
    {
      slug: "ring-road-airport-side",
      name: "Ringweg & luchthavenzijde",
      shortLabel: "Auto, parkeren en doorreis",
      tone: "easy",
      image: "/images/redesign/udon-thani-phu-phrabat.webp",
      imageAlt: "Landschapsroute vanuit Udon Thani richting culturele plekken in de provincie",
      bestFor: "Roadtrips, parkeren, vroege vertrekdagen en provinciale uitstappen",
      summary:
        "Een hotel aan de buitenzijde kan slim zijn wanneer een huurauto, luchthaven of uitgaande provincieroute je dag bepaalt. Voor een eerste stadsbezoek zonder auto levert deze keuze juist extra ritten op.",
      advantage: "Makkelijker aansluiten op autoroutes en minder stadsverkeer bij vertrek.",
      tradeoff: "Weinig spontaniteit voor het centrum; eten en bezienswaardigheden worden losse verplaatsingen.",
      transport: "Bevestig parkeerregels en regel een vroege transfer rechtstreeks bij hotel of erkende vervoerder.",
    },
  ],
  hotelPicks: [
    {
      name: "Centara Udon",
      area: "Central Udon & stationskwartier",
      category: "Beste complete centrumkeuze",
      bestFor: "Eerste bezoeken, winkelgemak, evenementen en een korte stadsreis",
      description:
        "Centara publiceert een ligging naast Central Udon, vernieuwde kamers, meerdere restaurants en bars, zwembad en grote evenementruimten.",
      whySelected:
        "De combinatie van centrale kaartpin en complete hotelfaciliteiten beperkt losse ritten. Vergelijk wel exact hetzelfde kamer- en maaltijdplan bij de actuele aanbieder.",
      officialUrl: "https://www.centarahotelsresorts.com/centara/cud",
    },
    {
      name: "The Pannarai Hotel",
      area: "Sampanthamit Road, stationskwartier",
      category: "Beste voor station en avondmarkt",
      bestFor: "Treinreizigers, korte verblijven en wie centraal wil eten zonder auto",
      description:
        "De officiële hotelsite plaatst The Pannarai dicht bij winkelcentrum, avondmarkt, trein- en busstation en publiceert kamers, zwembad, restaurant en conferentiefaciliteiten.",
      whySelected:
        "Een concrete centrumoptie wanneer vervoer en avondprogramma zwaarder wegen dan een rustige parkomgeving. Controleer het gekozen kamertype en de actuele voorwaarden.",
      officialUrl: "https://www.thepannaraihotel.com/",
    },
    {
      name: "Civilize Hotel",
      area: "Posri Road, centrum",
      category: "Beste rustige centrale basis",
      bestFor: "Stadsafspraken, families en reizigers die ruimte en bereikbaarheid combineren",
      description:
        "Civilize publiceert zijn adres aan Posri Road, verschillende ruime kamertypes, waaronder familiekamers en toegankelijke kamers, plus restaurant, bar en fietsen.",
      whySelected:
        "Het biedt een rustiger alternatief binnen de stad zonder volledig naar de rand te verhuizen. Controleer voor vertrek welke fiets- en horecafaciliteiten actueel beschikbaar zijn.",
      officialUrl: "https://www.civilizehotel.com/",
    },
    {
      name: "Prajaktra Design Hotel",
      area: "Nong Prajak",
      category: "Beste hotel bij het park",
      bestFor: "Ochtendwandelaars, stellen en reizigers die Nong Prajak als dagelijks anker kiezen",
      description:
        "De eigen site vermeldt 79 kamers, een zoutwaterzwembad, restaurant en een adres aan de zijde van Nong Prajak.",
      whySelected:
        "De locatie maakt de parkkeuze tastbaar. Kies dit hotel om de omgeving, niet vanwege onbevestigde vaste rijtijden naar andere stadsdelen.",
      officialUrl: "https://www.prajaktrahotel.com/",
    },
    {
      name: "Brown House Hotel",
      area: "Nong Bua, oostelijke stadszijde",
      category: "Beste lokale boetieksfeer",
      bestFor: "Stellen, families en reizigers die Isaan-design en een rustige meeromgeving zoeken",
      description:
        "Brown House beschrijft 74 kamers in een boetiekhotel aan een meer, met Isaan-geïnspireerd houtdesign, balkons en meerdere kamerindelingen.",
      whySelected:
        "Een uitgesproken lokaal alternatief voor een generiek stadshotel. De rustige ligging vraagt wel om bewuste ritten naar station en het commerciële centrum.",
      officialUrl: "https://www.brownhousehotel.com/en/home-en/",
    },
    {
      name: "De Princess Hotel Udon Thani",
      area: "Mak Khaeng, zuidoostelijke stad",
      category: "Beste verfijnde boetiekkeuze",
      bestFor: "Stellen, ruimere suites en reizigers die hotelcomfort boven loopafstand zetten",
      description:
        "De officiële site publiceert kamers en suites van verschillende formaten, een zwembad, fitness, bibliotheek, restaurant en kleinere vergaderruimten.",
      whySelected:
        "De Princess is een sterke hotelgerichte keuze wanneer ruimte en voorzieningen leidend zijn. Leg de ligging naast je dagelijkse stadsroute voordat je betaalt.",
      officialUrl: "https://deprincesshotel.com/en/index.html",
    },
    {
      name: "VELA Dhi Udon Thani",
      area: "Adulyadej Road, oostelijke stad",
      category: "Beste eigentijdse lifestylehotel",
      bestFor: "Designliefhebbers, zakenreizigers en langere verblijven met lokaal vervoer",
      description:
        "VELA Dhi publiceert een luchtvaartgeïnspireerd concept, diverse kamers en suites en het actuele adres aan Adulyadej Road.",
      whySelected:
        "Het geeft de oostelijke stadskeuze een helder modern profiel. Voor Central Udon en het station moet je de terugkerende verplaatsing bewust accepteren.",
      officialUrl: "https://www.veladhiudonthani.com/",
    },
    {
      name: "HOP INN Udon Thani",
      area: "Nong Prajak-zijde",
      category: "Beste voorspelbare praktische nacht",
      bestFor: "Budgetbewuste korte stops en reizigers die een eenvoudige ketenstandaard zoeken",
      description:
        "HOP INN publiceert voor de vestiging in Udon Thani het actuele adres, kamertypes en boekingsvoorwaarden binnen zijn gestandaardiseerde hotelformule.",
      whySelected:
        "Een bruikbare prijs- en functionaliteitsbenchmark wanneer je geen uitgebreid hotelterrein nodig hebt. Vergelijk de kaartpin en totaalprijs met centralere alternatieven.",
      officialUrl: "https://www.hopinnhotel.com/our-hotels/hop-inn-udon-thani",
    },
  ],
  splitStay: {
    eyebrow: "Eén stadsbasis is meestal genoeg",
    title: "Splits alleen wanneer de provincie je reis verandert.",
    description:
      "Voor twee of drie nachten in Udon Thani voorkomt één goed gekozen stadsbasis onnodige checkouts. Een tweede verblijf is pas logisch wanneer Ban Chiang, Phu Phrabat, de Red Lotus Sea of een doorreis richting Nong Khai werkelijk een apart dagritme vraagt.",
    routes: [
      {
        label: "1–2 nachten",
        title: "Centrum als praktische standaard",
        description: "Combineer station, avondeten en stadsankers vanuit één basis rond Central Udon of Posri.",
      },
      {
        label: "Parkritme",
        title: "Nong Prajak voor rust",
        description: "Kies het parkgebied wanneer buiten bewegen belangrijker is dan ieder avondadres te voet bereiken.",
      },
      {
        label: "Provincieroute",
        title: "Splits op afstand, niet op foto",
        description: "Voeg alleen een tweede basis toe wanneer je route aantoonbaar reistijd of een zeer vroege start bespaart.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Vergelijk dezelfde voorwaarden",
      description: "Match gasten, bedtype, ontbijt, belastingen, betaalmoment en annulering voordat je actuele totalen vergelijkt.",
    },
    {
      title: "Controleer de echte kaartpin",
      description: "Zet hotel, trein, Bus Terminal 1, Nong Prajak en je avondadres afzonderlijk op de kaart.",
    },
    {
      title: "Plan provinciedagen apart",
      description: "Ban Chiang, Phu Phrabat en de Red Lotus Sea zijn geen wandeling vanuit de stad; controleer actuele toegang en vervoer.",
    },
    {
      title: "Bevestig vroeg of laat vervoer",
      description: "Vraag hotel of erkende vervoerder naar actuele opties voor een vroege vlucht, trein of bus in plaats van een vaste transfertijd aan te nemen.",
    },
  ],
  specialistGuides: [
    {
      title: "Complete reisgids voor Udon Thani",
      description: "Plan stad, provincie, vervoer en een realistisch aantal dagen.",
      href: "/nl/guides/travel-guide/udon-thani/",
    },
    {
      title: "Beste reistijd voor Udon Thani",
      description: "Stem hitte, regentijd en buitenroutes af op je reisperiode.",
      href: "/nl/city/udon-thani/best-time-to-visit/",
    },
  ],
  faqs: [
    {
      question: "In welk gebied kun je het beste verblijven in Udon Thani?",
      answer: "Voor een eerste korte reis is het gebied rond Central Udon, trein- en busstation het handigst. Kies Nong Prajak voor rust en parkruimte, Posri voor een kalmere centrale basis en de stadsrand alleen wanneer auto, luchthaven of provincieroute je dag bepaalt.",
    },
    {
      question: "Hoeveel dagen heb je nodig in Udon Thani?",
      answer: "Twee nachten zijn bruikbaar voor de stad en Nong Prajak. Plan drie of meer nachten wanneer je een volledige dag voor Ban Chiang, Phu Phrabat of de Red Lotus Sea wilt reserveren; combineer niet automatisch alle drie in één gehaaste rit.",
    },
    {
      question: "Kun je Udon Thani te voet verkennen?",
      answer: "Rond Central Udon en het stationskwartier kun je compacte stukken lopen. De stad als geheel is verspreid en voor Nong Prajak, luchthaven en buitenstedelijke attracties is lokaal wegvervoer praktischer.",
    },
    {
      question: "Moet je bij het treinstation van Udon Thani verblijven?",
      answer: "Dat is handig bij een vroege of late trein en voor de avondmarkt. Als parkruimte, luchthaven of een specifieke afspraak belangrijker is, kan een ander stadsdeel beter passen.",
    },
    {
      question: "Is Nong Prajak een goede buurt om te overnachten?",
      answer: "Ja, vooral voor wandelen, hardlopen en een rustiger ritme. Je levert wel directe toegang tot een deel van de winkels, avondmarkt en vervoersknooppunten rond het station in.",
    },
    {
      question: "Waar verblijf je voor de Red Lotus Sea?",
      answer: "Veel reizigers gebruiken Udon Thani als stadsbasis en regelen een vroege rit. Controleer vooraf de actuele bloeiperiode, vertreklocatie en vervoersvorm; een hotelnaam met ‘Udon Thani’ garandeert geen korte route naar het meer.",
    },
    {
      question: "Waar verblijf je voor een bezoek aan Ban Chiang?",
      answer: "Een stadshotel werkt wanneer je Ban Chiang als losse dag- of halve dagroute bezoekt. Kies alleen een tweede basis buiten de stad als die past bij een bredere provincieroute en je vervoer vooraf vastligt.",
    },
    {
      question: "Wat controleer je vóór een hotelboeking in Udon Thani?",
      answer: "Controleer de exacte kaartpin, het kamertype, bedden, ontbijt, totaalprijs, annulering, parkeren en actuele opening van genoemde faciliteiten. Vergelijk vervolgens actuele beschikbaarheid bij dezelfde voorwaarden.",
    },
  ],
  relatedGuides: [
    {
      title: "Udon Thani overzicht",
      description: "Bouw een haalbare route rond de stad, Nong Prajak en één gekozen provinciedag.",
      href: "/nl/city/udon-thani/",
      image: "/images/redesign/udon-thani-destination-hero.webp",
    },
    {
      title: "Eten in Udon Thani",
      description: "Ontdek Isaan-ontbijt, lokale markten en adressen die logisch bij je stadsroute passen.",
      href: "/nl/city/udon-thani/food/",
      image: "/images/redesign/udon-thani-food-nong-prajak-breakfast-nl.webp",
    },
    {
      title: "Bezienswaardigheden in Udon Thani",
      description: "Vergelijk Nong Prajak, Ban Chiang en Phu Phrabat zonder provinciale afstanden te onderschatten.",
      href: "/nl/city/udon-thani/attractions/",
      image: "/images/redesign/udon-thani-ban-chiang.webp",
    },
  ],
  sources: [
    {
      title: "Udon Thani",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Udon%2BThani/588",
      note: "Officiële bestemmingscontext voor Ban Chiang, natuur, lokale producten en provinciale spreiding.",
    },
    {
      title: "Centara Udon",
      creator: "Centara Hotels & Resorts",
      url: "https://www.centarahotelsresorts.com/centara/cud",
      note: "Actuele ligging naast Central Udon, kamers, horeca, recreatie en evenementruimten.",
    },
    {
      title: "The Pannarai Hotel",
      creator: "The Pannarai Hotel",
      url: "https://www.thepannaraihotel.com/",
      note: "Actuele centrumlocatie, kamertypes en hotelfaciliteiten.",
    },
    {
      title: "Civilize Hotel",
      creator: "Civilize Hotel",
      url: "https://www.civilizehotel.com/",
      note: "Actueel adres, kamers, toegankelijke opties en voorzieningen.",
    },
    {
      title: "Prajaktra Design Hotel",
      creator: "Prajaktra Design Hotel",
      url: "https://www.prajaktrahotel.com/",
      note: "Actuele ligging, kameromvang, zwembad, restaurant en contactgegevens.",
    },
    {
      title: "Brown House Hotel",
      creator: "Brown House Hotel",
      url: "https://www.brownhousehotel.com/en/home-en/",
      note: "Actueel Isaan-designconcept, meeromgeving, kamertypes en adres.",
    },
    {
      title: "De Princess Hotel Udon Thani",
      creator: "De Princess Hotel",
      url: "https://deprincesshotel.com/en/index.html",
      note: "Actuele kamers, suites, horeca en hotelfaciliteiten.",
    },
    {
      title: "VELA Dhi Udon Thani",
      creator: "VELA Dhi",
      url: "https://www.veladhiudonthani.com/",
      note: "Actueel hotelconcept, kamertypes en adres aan Adulyadej Road.",
    },
    {
      title: "HOP INN Udon Thani",
      creator: "HOP INN Hotels",
      url: "https://www.hopinnhotel.com/our-hotels/hop-inn-udon-thani",
      note: "Actuele vestigingsinformatie, kamers en boekingsvoorwaarden.",
    },
  ],
  dateModified: "2026-07-31",
};
