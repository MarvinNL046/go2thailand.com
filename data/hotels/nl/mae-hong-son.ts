import type { HotelGuideData } from "../types";

export const maeHongSonHotelGuide: HotelGuideData = {
  citySlug: "mae-hong-son",
  cityName: "Mae Hong Son",
  parentGuideHref: "/nl/city/mae-hong-son/",
  locale: "nl",
  pageTitle: "Waar verblijven in Mae Hong Son? Gebieden & hotels",
  pageDescription:
    "Vergelijk Mae Hong Son-stad, Ban Rak Thai en Mae Sariang. Kies een logische uitvalsbasis en bekijk actuele hotelbeschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/mae-hong-son/",
  heroImage: "/images/redesign/mae-hong-son-hero.webp",
  heroAlt:
    "Mae Hong Son in een groene bergvallei met tempels en ochtendnevel",
  eyebrow: "Kies tussen de stad, een bosverblijf en een aparte bergetappe",
  heroTitle: "Waar verblijven",
  heroAccent: "in Mae Hong Son?",
  intro:
    "Een kamer bij het Jong Kham-meer, een bosresort buiten de stad en een theehuis in Ban Rak Thai leveren drie verschillende reizen op. Kijk daarom niet alleen naar de provincienaam, maar naar de exacte kaartpin, je avondroute en de volgende etappe van de Mae Hong Son Loop. Vergelijk daarna de actuele beschikbaarheid en voorwaarden.",
  quickAnswer:
    "Voor een eerste bezoek van twee of drie nachten is Mae Hong Son-stad rond het Jong Kham-meer meestal de handigste basis: markt, tempels en eetadressen liggen compact bij elkaar. Kies Pha Bong voor natuur en rust met gepland vervoer. Ban Rak Thai en Mae Sariang zijn afzonderlijke overnachtingsplaatsen op flinke rijafstand; voeg ze alleen toe wanneer ze echt in je route passen.",
  areaDecisionNote:
    "Deze pagina gebruikt 'Mae Hong Son' voor zowel de stad als logische etappes in de provincie, maar noemt het verschil steeds expliciet. Afstanden over bergwegen zeggen meer dan een provincielabel. De boekingsknoppen openen actuele beschikbaarheid via Trip.com; vaste kamerprijzen en reviewscores worden bewust niet vastgezet.",
  areas: [
    {
      slug: "jong-kham-lake-centre",
      name: "Jong Kham-meer & stadscentrum",
      shortLabel: "Avonden te voet",
      tone: "easy",
      image: "/images/redesign/mae-hong-son-lake-temples.webp",
      imageAlt:
        "Wat Jong Kham en Wat Jong Klang aan het meer in Mae Hong Son",
      bestFor:
        "Een eerste bezoek, de ochtendmarkt, avondeten en korte stadswandelingen",
      summary:
        "De compacte kern rond het Jong Kham-meer brengt de twee bekende tempels, de avondzone en lokale eetadressen dicht bij elkaar. Een centrumadres is vooral waardevol na zonsondergang; voor uitzichtpunten en natuurstops blijft vervoer nodig.",
      advantage:
        "Je kunt de sfeer van de stad vroeg en laat beleven zonder voor iedere maaltijd een rit te regelen.",
      tradeoff:
        "Kleinschalige centrumverblijven hebben doorgaans minder terrein en resortruimte dan adressen buiten de kern.",
      transport:
        "Controleer de looproute vanaf de echte ingang en regel apart vervoer voor Doi Kong Mu, Su Tong Pae en de noordelijke dagroute.",
    },
    {
      slug: "south-city-pang-moo",
      name: "Zuidelijke stadsrand & Pang Mu",
      shortLabel: "Rust met bereik",
      tone: "quiet",
      image: "/images/cities/generated/mae-hong-son.webp",
      imageAlt: "Groene bergomgeving aan de rand van Mae Hong Son-stad",
      bestFor:
        "Reizigers met eigen vervoer, gezinnen en wie zwembad of parkeerruimte zoekt",
      summary:
        "Aan de stadsrand liggen ruimere hotels en resorts tussen de hoofdwegen en groene uitlopers van de vallei. De centrale adressen blijven per korte rit bereikbaar, maar de precieze ligging bepaalt of je spontaan uit eten kunt.",
      advantage:
        "Meer buitenruimte en een rustiger ritme zonder meteen een afgelegen route-etappe te boeken.",
      tradeoff:
        "Een restaurant of markt die op de kaart dichtbij lijkt, kan langs een donkere of onprettige looproute liggen.",
      transport:
        "Plan de terugrit na het avondeten en verifieer parkeren, shuttle en luchthavenvervoer rechtstreeks voor je reisdata.",
    },
    {
      slug: "pha-bong-forest",
      name: "Pha Bong & bosrand",
      shortLabel: "Natuurverblijf",
      tone: "scenic",
      image: "/images/redesign/mae-hong-son-route-banner.webp",
      imageAlt: "Dicht groen berglandschap langs de route bij Mae Hong Son",
      bestFor:
        "Rustzoekers die tijd in het verblijf plannen en vervoer vooraf regelen",
      summary:
        "Ten zuiden van Mae Hong Son-stad verschuift de ervaring van een stadsbasis naar bos, tuin en langzaam reizen. Dit werkt goed als het verblijf onderdeel van de dag is, niet wanneer je ieder uur tussen hotel en centrum wilt pendelen.",
      advantage:
        "Je krijgt een duidelijker natuurgevoel dan in de compacte stad en begint de zuidelijke route buiten de drukste kern.",
      tradeoff:
        "Restaurants, markt en avondwandeling zijn geen vanzelfsprekende loopopties; lokaal vervoer is beperkt en kan vroeg eindigen.",
      transport:
        "Bevestig vooraf hoe je aankomt, 's avonds terugkeert en de volgende ochtend verder reist, vooral zonder huurauto of chauffeur.",
    },
    {
      slug: "ban-rak-thai-pang-ung",
      name: "Ban Rak Thai & Pang Ung",
      shortLabel: "Aparte bergnacht",
      tone: "scenic",
      image: "/images/redesign/mae-hong-son-north-route.webp",
      imageAlt:
        "Bergroute door het groene noorden van de provincie Mae Hong Son",
      bestFor:
        "Reizigers die vroeg licht, theeheuvels en een bewuste noordelijke etappe willen",
      summary:
        "Ban Rak Thai ligt bij een bergmeer en theegebied ten noorden van de stad. Een overnachting maakt een vroege, rustige ervaring mogelijk, maar het dorp is geen buitenwijk van Mae Hong Son en de bochtige toegangsroute vraagt planning.",
      advantage:
        "Je beleeft het dorp voor en na de drukste bezoekuren en hoeft de noordelijke route niet in één lange stadsdag te persen.",
      tradeoff:
        "De keuze is kleiner, directe communicatie kan belangrijk zijn en een aantrekkelijke kamerfoto zegt niets over bereikbaarheid of uitzicht vanuit jouw kamertype.",
      transport:
        "Leg de heen- en terugrit vast, rijd bij voorkeur bij daglicht en controleer actuele weg- en weersomstandigheden.",
    },
    {
      slug: "mae-sariang-yuam-river",
      name: "Mae Sariang & Yuam-rivier",
      shortLabel: "Zuidelijke loopstop",
      tone: "local",
      image: "/images/redesign/mae-hong-son-food-lake-shan-nl.webp",
      imageAlt:
        "Rustige Noord-Thaise sfeer tussen water en bergen in Mae Hong Son",
      bestFor:
        "Een ontspannen Mae Hong Son Loop en reizigers die de zuidelijke rit willen breken",
      summary:
        "Mae Sariang is een eigen stad in het zuiden van de provincie en een logische loopetappe tussen Mae Hong Son en Chiang Mai. De Yuam-rivier en oude kern geven hier een ander ritme dan in de provinciehoofdstad.",
      advantage:
        "Je verdeelt een lange bergroute over behapbare dagen en voegt een lokaal rivierstadje toe in plaats van alleen kilometers te maken.",
      tradeoff:
        "Een nacht hier vervangt geen nacht in Mae Hong Son-stad; beide plaatsen bedienen een ander deel van de route.",
      transport:
        "Controleer reistijd en daglicht voor de volgende bergsectie en baseer je planning niet op de afstand in vogelvlucht.",
    },
  ],
  hotelPicks: [
    {
      name: "Ngamta Hotel",
      area: "Jong Kham-meer & stadscentrum",
      category: "Centrale stadsbasis",
      bestFor: "Reizigers die avondmarkt en tempels te voet willen bereiken",
      description:
        "Een compact stadshotel aan de centrale Khunlum Praphat-route, vlak bij de zone rond Jong Kham en Jong Klang.",
      whySelected:
        "De ligging maakt dit de gemak-eerst-keuze van de selectie. Controleer bij het boeken het actuele kamertype, de ingang en eventuele parkeervoorwaarden; de schaal en faciliteiten zijn niet vergelijkbaar met een buitenresort.",
      officialUrl: "https://www.facebook.com/ngamtahotel/",
    },
    {
      name: "B2 Mae Hong Son Premier Resort",
      area: "Zuidelijke stadsrand & Pang Mu",
      category: "Modern hotel aan de stadsrand",
      bestFor: "Stellen, vrienden en automobilisten die ruimte willen",
      description:
        "Een hotel met 42 kamers aan Siri Mongkol Road; de eigen site toont verschillende kamertypes, parkeergelegenheid en een buitenzwembad.",
      whySelected:
        "Het vormt een praktisch midden tussen een eenvoudige centrumkamer en een afgelegen natuurverblijf. De officiële kaartcontext zet Wat Chong Kham en de luchthaven op korte autorit, niet op gegarandeerde loopafstand.",
      officialUrl:
        "https://www.b2hotel.com/mae-hong-son/b2-mae-hong-son-premier-resort/",
    },
    {
      name: "The Imperial Mae Hong Son Resort",
      area: "Zuidelijke stadsrand & Pang Mu",
      category: "Groter resort in teakgroen",
      bestFor: "Gezinnen en reizigers die meer hotelfaciliteiten waarderen",
      description:
        "Een laagbouwresort in Pang Mu met 104 kamers, een restaurant en zwembad volgens de officiële hotelinformatie.",
      whySelected:
        "Het biedt meer resortstructuur dan de kleine adressen rond het meer. Behandel de genoemde afstand tot luchthaven en stad als autorit en verifieer de actuele opening van een doorslaggevende faciliteit vóór een niet-restitueerbare boeking.",
      officialUrl:
        "https://www.imperialhotels.com/find-us/our-hotels/the-imperial-mae-hong-son-resort",
    },
    {
      name: "Fern Resort Mae Hong Son",
      area: "Pha Bong & bosrand",
      category: "Lokaal bosverblijf",
      bestFor: "Natuurliefhebbers en rustige dagen buiten de stad",
      description:
        "Een natuurgericht resort in Ban Hua Nam Mae Sakut, Pha Bong, dat eenvoud, lokale medewerkers en de bosomgeving centraal stelt.",
      whySelected:
        "Fern onderscheidt zich door een helder eigen verhaal over lokaal en natuurgericht verblijf. Dat maakt het geen luxeclaim maar een bewuste ritme-keuze; regel de verbinding met de stad en je vertrekdag vooraf.",
      officialUrl: "https://www.fernresort.info/",
    },
    {
      name: "Lee Wine Ruk Thai Resort",
      area: "Ban Rak Thai & Pang Ung",
      category: "Theeheuvels bij het bergmeer",
      bestFor: "Een bijzondere noordelijke overnachting met vroeg uitzicht",
      description:
        "Een resort met verspreide cottages tussen de theeheuvels van Ban Rak Thai en zicht op de berg- en meeromgeving.",
      whySelected:
        "De officiële Thaise toerisme-informatie bevestigt zowel het karakter als de ligging op ongeveer een uur rijden van de luchthaven. Vergelijk het specifieke cottage-type en boekingskanaal; niet ieder verblijf heeft hetzelfde perspectief.",
      officialUrl: "https://www.facebook.com/leewinerukthairesort/",
    },
    {
      name: "Chasa Rakthai Resort",
      area: "Ban Rak Thai & Pang Ung",
      category: "Kleinschalige bergbasis",
      bestFor: "Reizigers die Ban Rak Thai in hun route opnemen",
      description:
        "Een kleinschalig resort in het Ban Rak Thai-gebied met eigen directe website en een op de bergomgeving gericht verblijf.",
      whySelected:
        "Het geeft een alternatief voor de bekendste theeplantagekamers. Controleer rechtstreeks de exacte kaartpin, bereikbaarheid, taal van communicatie en wat bij het gekozen kamertype is inbegrepen.",
      officialUrl: "https://chasarakthairesort.com/",
    },
    {
      name: "Riverhouse Resort Mae Sariang",
      area: "Mae Sariang & Yuam-rivier",
      category: "Familiehotel aan de rivier",
      bestFor: "Een comfortabele zuidelijke stop op de Mae Hong Son Loop",
      description:
        "Een familiegerund hotel met 42 kamers, teakhouten details en ligging aan de Yuam-rivier in Mae Sariang.",
      whySelected:
        "De officiële site maakt zowel het rivierkarakter als het adres in Mae Sariang duidelijk. Daardoor is dit een sterke routekeuze, maar nadrukkelijk geen hotel voor avonden in Mae Hong Son-stad.",
      officialUrl: "https://www.riverhousehotelgroup.com/resort/",
    },
    {
      name: "River Bank Resort Mae Sariang",
      area: "Mae Sariang & Yuam-rivier",
      category: "Eenvoudige loopstop",
      bestFor: "Roadtrippers die praktisch en lokaal willen overnachten",
      description:
        "Een zelfstandig hotel aan Langpanich Road in Mae Sariang met directe contactgegevens en locatie-informatie op de eigen site.",
      whySelected:
        "Het biedt een tweede, minder resortgerichte optie voor dezelfde zuidelijke etappe. Verifieer kamer, parkeren en actuele maaltijdopties rechtstreeks, omdat lokale diensten en openingstijden kunnen veranderen.",
      officialUrl: "https://www.riverbankresort.net/",
    },
  ],
  splitStay: {
    eyebrow: "Stadsbasis of een echte looproute?",
    title: "Verhuis alleen wanneer de route verandert",
    description:
      "Binnen Mae Hong Son-stad levert een hotelwissel zelden genoeg op. Een tweede verblijf werkt pas wanneer je vroeg in Ban Rak Thai wilt zijn of de zuidelijke rit via Mae Sariang bewust over twee dagen verdeelt.",
    routes: [
      {
        label: "2–3 nachten",
        title: "Eén basis in Mae Hong Son-stad",
        description:
          "Kies centrum voor avondgemak of Pha Bong voor natuur en plan de noordelijke bezienswaardigheden als dagroute.",
      },
      {
        label: "4–5 nachten",
        title: "Stad plus Ban Rak Thai",
        description:
          "Voeg één bergnacht toe als vroeg licht, theegebied en langzaam reizen belangrijker zijn dan een compacte planning.",
      },
      {
        label: "Mae Hong Son Loop",
        title: "Mae Sariang als zuidelijke etappe",
        description:
          "Gebruik Mae Sariang om de lange zuidroute te breken; plan Pai of Pang Mapha afzonderlijk aan de noordzijde van de lus.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Controleer stad en provincie",
      description:
        "Een resultaat in Mae Hong Son kan in de hoofdstad, Ban Rak Thai, Pai of Mae Sariang liggen. Controleer altijd plaatsnaam én kaartpin.",
    },
    {
      title: "Plan bergwegen bij daglicht",
      description:
        "Bochten, regen, mist en wegwerkzaamheden kunnen een korte afstand vertragen. Bouw marge in en verifieer de actuele route.",
    },
    {
      title: "Vergelijk gelijke boekingen",
      description:
        "Leg kamertype, bezetting, belastingen, ontbijt, annulering en betaalmoment naast elkaar voordat je actuele totalen vergelijkt.",
    },
    {
      title: "Bevestig lokaal vervoer",
      description:
        "Shuttles en taxi's zijn niet zo vanzelfsprekend als in Bangkok. Vraag aankomst, avondrit en vervolgtransfer vóór je boekt na.",
    },
  ],
  faqs: [
    {
      question: "Wat is de beste plek om te verblijven in Mae Hong Son?",
      answer:
        "Voor de meeste eerste bezoekers is de compacte zone rond het Jong Kham-meer het handigst. Je bereikt markt, tempels en eetadressen makkelijker te voet. Kies Pha Bong wanneer bos en rust belangrijker zijn en je vervoer vooraf kunt organiseren.",
    },
    {
      question: "Kun je Mae Hong Son-stad te voet verkennen?",
      answer:
        "De kern rond het meer en de markt is compact genoeg voor korte wandelingen, afhankelijk van hitte, regen en persoonlijke mobiliteit. Doi Kong Mu, Su Tong Pae, Pang Ung en Ban Rak Thai horen niet bij één beloopbare stadsroute.",
    },
    {
      question: "Hoeveel nachten heb je nodig in Mae Hong Son?",
      answer:
        "Twee tot drie nachten werken voor de stad en één noordelijke of landelijke dag. Voeg een nacht toe voor Ban Rak Thai of meer tijd voor de loop; probeer afgelegen stops niet in één gehaaste dag te stapelen.",
    },
    {
      question: "Moet je in Mae Hong Son-stad of Ban Rak Thai slapen?",
      answer:
        "Kies de stad voor restaurants, markt, tempels en de meest flexibele basis. Kies Ban Rak Thai voor een vroege berg- en meerervaring. Het dorp ligt niet naast de stad, dus één nacht op beide plekken kan alleen zinvol zijn in een ruimere route.",
    },
    {
      question: "Is Mae Sariang een wijk van Mae Hong Son?",
      answer:
        "Nee. Mae Sariang is een afzonderlijke stad in het zuiden van de provincie. Het is een logische overnachtingsplaats op de Mae Hong Son Loop, maar geen basis voor bezienswaardigheden en avonden in Mae Hong Son-stad.",
    },
    {
      question: "Heb je een auto of scooter nodig in Mae Hong Son?",
      answer:
        "Niet voor iedere wandeling in de stad, maar wel voor veel verspreide stops. Kies alleen een scooter wanneer je wettelijk bevoegd, verzekerd en ervaren bent op bochtige bergwegen; anders zijn een chauffeur of georganiseerde route verstandiger.",
    },
    {
      question: "Wanneer moet je een hotel in Mae Hong Son vroeg boeken?",
      answer:
        "Voor koele maanden, Thaise feestdagen en populaire bergverblijven is vroeg vergelijken verstandig. Beschikbaarheid kan plaatselijk sterk verschillen; controleer altijd actuele voorwaarden in plaats van uit te gaan van een vast hoogseizoenstarief.",
    },
    {
      question: "Is een split-stay in Mae Hong Son de moeite waard?",
      answer:
        "Niet tussen twee hotels binnen de kleine stad. Wel wanneer de tweede nacht een andere route opent, zoals Ban Rak Thai in het noorden of Mae Sariang tijdens de zuidelijke loop. Elke extra verhuizing moet rijtijd of een vroege ervaring opleveren.",
    },
  ],
  relatedGuides: [
    {
      title: "Mae Hong Son reisgids",
      description:
        "Plan de stad, bergwegen, tempels en natuurstops in een realistisch tempo.",
      href: "/nl/city/mae-hong-son/",
      image: "/images/redesign/mae-hong-son-hero.webp",
    },
    {
      title: "Complete routegids",
      description:
        "Combineer Mae Hong Son met logische noordelijke en zuidelijke etappes.",
      href: "/nl/guides/travel-guide/mae-hong-son/",
      image: "/images/redesign/mae-hong-son-route-banner.webp",
    },
    {
      title: "Eten in Mae Hong Son",
      description:
        "Ontdek Tai Yai-smaken, marktmomenten en praktische eetkeuzes rond het meer.",
      href: "/nl/city/mae-hong-son/food/",
      image: "/images/redesign/mae-hong-son-food-lake-shan-nl.webp",
    },
  ],
  sources: [
    {
      title: "Mae Hong Son",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Mae-Hong-Son/106",
      note:
        "Officiële bestemmingscontext voor de stad, provincie en verspreide bergattracties.",
    },
    {
      title: "Mae Hong Son destination brochure",
      creator: "Tourism Authority of Thailand",
      url: "https://tourismthailand.my/E-Brochure%20Mae%20Hong%20Son%20%28En%29.pdf",
      note:
        "Primaire route- en plaatscontext voor Mae Hong Son, Ban Rak Thai en Mae Sariang.",
    },
    {
      title: "The Imperial Mae Hong Son Resort",
      creator: "Imperial Hotels and Resorts",
      url: "https://www.imperialhotels.com/find-us/our-hotels/the-imperial-mae-hong-son-resort",
      note: "Controle van adres, schaal, kamertypes, restaurant en zwembad.",
    },
    {
      title: "Fern Resort Mae Hong Son",
      creator: "Fern Resort",
      url: "https://www.fernresort.info/aboutus?lang=en",
      note:
        "Controle van het adres in Pha Bong en het lokale, natuurgerichte verblijfsconcept.",
    },
    {
      title: "B2 Mae Hong Son Premier Resort",
      creator: "B2 Boutique and Budget Hotels",
      url: "https://www.b2hotel.com/mae-hong-son/b2-mae-hong-son-premier-resort/",
      note:
        "Controle van ligging, kamertypes, parkeercontext en zwembad.",
    },
    {
      title: "Lee Wine Ruk Thai Resort",
      creator: "Tourism Authority of Thailand, Japan office",
      url: "https://www.thailandtravel.or.jp/lee-wine-ruk-thai-resort/",
      note:
        "Officiële toerismebron voor ligging, theeomgeving, cottages en reiscontext.",
    },
    {
      title: "Chasa Rakthai Resort",
      creator: "Chasa Rakthai Resort",
      url: "https://chasarakthairesort.com/",
      note: "Controle van het directe hotelkanaal en de locatiecontext.",
    },
    {
      title: "Riverhouse Resort Mae Sariang",
      creator: "Riverhouse Hotel Group",
      url: "https://www.riverhousehotelgroup.com/resort/",
      note:
        "Controle van adres in Mae Sariang, eigenaarschap, kamers en rivierligging.",
    },
    {
      title: "River Bank Resort Mae Sariang",
      creator: "River Bank Resort",
      url: "https://www.riverbankresort.net/",
      note:
        "Controle van adres, directe contactgegevens en hotelpositionering in Mae Sariang.",
    },
  ],
  dateModified: "2026-07-31",
};
