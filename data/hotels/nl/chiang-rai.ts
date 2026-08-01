import type { HotelGuideData } from "../types";

export const chiangRaiHotelGuide: HotelGuideData = {
  citySlug: "chiang-rai",
  cityName: "Chiang Rai",
  parentGuideHref: "/nl/city/chiang-rai/",
  locale: "nl",
  pageTitle: "Waar verblijven in Chiang Rai? Gebieden & hotels",
  pageDescription:
    "Vergelijk het centrum, de Night Bazaar, de Kok-rivier en Chiang Saen. Kies je uitvalsbasis en bekijk actuele hotelbeschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/chiang-rai/",
  heroImage: "/images/redesign/best-hotels-chiang-rai-en-hero.webp",
  heroAlt:
    "Rustig hotelterras aan een rivier tussen de groene heuvels van Chiang Rai",
  eyebrow: "Kies tussen stadsavonden, rivierstilte en het verre noorden",
  heroTitle: "Waar verblijven",
  heroAccent: "in Chiang Rai?",
  intro:
    "Een hotel bij de Clock Tower, een resort aan de Kok-rivier en een lodge in de Golden Triangle leveren drie totaal verschillende reizen op. Bepaal daarom eerst waar je 's avonds wilt zijn en hoeveel vervoer je acceptabel vindt. Vergelijk daarna pas de actuele kamerprijs en voorwaarden.",
  quickAnswer:
    "Voor een eerste bezoek zonder eigen vervoer is het compacte centrum tussen de Clock Tower, Night Bazaar en Bus Terminal 1 meestal het handigst. Kies de Kok-rivier wanneer rust, tuin en zwembad belangrijker zijn dan spontaan naar restaurants lopen. Hotels bij Chiang Saen en de Golden Triangle liggen ver buiten Chiang Rai-stad en horen alleen bij een bewuste tweede etappe.",
  areaDecisionNote:
    "Deze gids koppelt concrete hotels aan hun praktische ligging. Een provincienaam is daarbij niet precies genoeg: controleer altijd de kaartpin, de ingang en je avondroute. De boekingsknoppen openen actuele beschikbaarheid via Trip.com; er worden bewust geen vaste prijzen of reviewscores vastgezet.",
  areas: [
    {
      slug: "clock-tower-old-centre",
      name: "Clock Tower & oud centrum",
      shortLabel: "Avonden te voet",
      tone: "easy",
      image: "/images/cities/chiang-rai/chiang-rai-temple-front.webp",
      imageAlt: "Noord-Thaise tempelarchitectuur in het centrum van Chiang Rai",
      bestFor:
        "Een eerste bezoek, lokale restaurants, tempels en de zaterdagse Walking Street",
      summary:
        "Rond de Clock Tower liggen cafés, tempels, kleine restaurants en de oude handelsstraten dicht bij elkaar. De prettigste kamer ligt niet automatisch aan de drukste hoofdstraat: ook binnen het centrum verschillen verkeer en avondgeluid per blok.",
      advantage:
        "Je kunt veel korte stadsavonden invullen zonder voor iedere verplaatsing vervoer te regelen.",
      tradeoff:
        "Centrale hotels hebben meestal minder tuin- en resortruimte dan verblijven aan de rivier.",
      transport:
        "Controleer de echte looproute naar de Clock Tower en regel vervoer voor Wat Rong Khun, Baan Dam en andere verspreide bezienswaardigheden.",
    },
    {
      slug: "night-bazaar-bus-terminal",
      name: "Night Bazaar & Bus Terminal 1",
      shortLabel: "Makkelijk aankomen",
      tone: "local",
      image:
        "/images/cities/chiang-rai/attractions/chiang rai Night Bazaar.webp",
      imageAlt: "Avondverlichting en kraampjes bij Chiang Rai Night Bazaar",
      bestFor:
        "Een kort verblijf, busreizigers en wie eten en vervoer dichtbij wil",
      summary:
        "De zone rond de Night Bazaar en het centrale busstation is praktisch en levendig. Je stapt snel de avondmarkt in, maar kamers aan doorgaande straten kunnen meer verkeer en marktgeluid meekrijgen.",
      advantage:
        "Een soepele aankomst en veel eetopties op korte afstand maken deze zone sterk voor twee of drie nachten.",
      tradeoff:
        "De handigste ligging is niet altijd de rustigste; kamerrichting kan hier belangrijker zijn dan een extra voorziening.",
      transport:
        "Controleer of jouw bus aankomt bij Terminal 1 in het centrum of Terminal 2 buiten het centrum; beide worden als Chiang Rai Bus Terminal aangeduid.",
    },
    {
      slug: "rob-wiang-south-city",
      name: "Rob Wiang & zuidkant van de stad",
      shortLabel: "Meer ruimte",
      tone: "quiet",
      image: "/images/redesign/chiang-rai-food-coffee.webp",
      imageAlt: "Groene hoteltuin met rustige Noord-Thaise sfeer in Chiang Rai",
      bestFor:
        "Reizigers met vervoer, gezinnen en wie een zwembad boven nachtleven kiest",
      summary:
        "Net buiten de compacte avondkern vind je laagbouw, tuinhotels en makkelijkere parkeermogelijkheden. De stad blijft dichtbij, maar een adres in Mueang Chiang Rai zegt weinig over de werkelijke loopafstand.",
      advantage:
        "Meer rust en buitenruimte zonder dat je een afgelegen provincieresort hoeft te boeken.",
      tradeoff:
        "Voor de Night Bazaar en late diners wordt een korte rit sneller onderdeel van iedere avond.",
      transport:
        "Bereken vooraf de terugrit en verifieer parkeerplaats, fietsgebruik of shuttle rechtstreeks voor je reisdata.",
    },
    {
      slug: "kok-river",
      name: "Kok-rivier",
      shortLabel: "Resortritme",
      tone: "scenic",
      image: "/images/redesign/best-hotels-chiang-rai-en-hero.webp",
      imageAlt: "Rivier, tropische beplanting en groene heuvels bij Chiang Rai",
      bestFor:
        "Stellen, gezinnen en reizigers die zwembad-, tuin- of spatijd inplannen",
      summary:
        "Aan de Kok-rivier hebben resorts ruimte voor tuinen, grotere kamers en uitgebreide faciliteiten. De stad is over de weg bereikbaar, maar 'riverside' betekent niet dat de Clock Tower comfortabel te voet bereikbaar is.",
      advantage:
        "Een kalmere omgeving en volwaardiger resortgevoel terwijl Chiang Rai-stad binnen bereik blijft.",
      tradeoff:
        "Voor zelfstandig eten, markten en avondwandelingen ben je vaker afhankelijk van een rit.",
      transport:
        "Bekijk zowel de dag- als avondroute; bruggen en de exacte hotelingang bepalen de reistijd sterker dan de afstand in vogelvlucht.",
    },
    {
      slug: "golden-triangle-chiang-saen",
      name: "Golden Triangle & Chiang Saen",
      shortLabel: "Tweede etappe",
      tone: "scenic",
      image: "/images/cities/chiang-rai/attractions/goldentriangle.webp",
      imageAlt:
        "Groene heuvels en rivieren in de Golden Triangle in Chiang Rai",
      bestFor:
        "Een langere Noord-Thailandreis waarin het afgelegen verblijf zelf centraal staat",
      summary:
        "De bekende tented camps en resorts in de Golden Triangle liggen in het district Chiang Saen, ver ten noorden van Chiang Rai-stad. Ze zijn geen praktische basis voor stadsavonden, maar kunnen wel een afzonderlijke landschaps- en resortetappe vormen.",
      advantage:
        "Je verblijft in een andere omgeving rond Mekong en Ruak, in plaats van alleen een dagtocht te maken.",
      tradeoff:
        "Transfers, arrangementen en activiteitvoorwaarden maken de vergelijking complexer dan bij een gewoon stadshotel.",
      transport:
        "Leg de transfer en inbegrepen onderdelen schriftelijk vast; een adres in de provincie Chiang Rai is geen adres in Chiang Rai-stad.",
    },
  ],
  hotelPicks: [
    {
      name: "Nak Nakara Hotel",
      area: "Clock Tower & oud centrum",
      category: "Karaktervol centrumhotel",
      bestFor: "Een eerste bezoek met Lanna-sfeer en stadswandelingen",
      description:
        "Een centraal hotel aan Uttarakit Road met modern-Lanna kamers, een buitenzwembad en meerdere kamertypes voor stellen en gezinnen.",
      whySelected:
        "De officiële site bevestigt de ligging bij de voetgangersstraat en het stadsmuseum. Dat maakt het een bruikbare centrumkeuze, al blijft de Night Bazaar een andere route dan de directe omgeving van het hotel.",
      officialUrl: "https://naknakarahotel.com/",
    },
    {
      name: "Wiang Inn Hotel",
      area: "Night Bazaar & Bus Terminal 1",
      category: "Praktische aankomstbasis",
      bestFor:
        "Een kort verblijf en reizigers die de Night Bazaar prioriteit geven",
      description:
        "Een gevestigd, grootschaliger stadshotel aan Phaholyothin Road met zwembad, restaurants en vergaderfaciliteiten in de centrale avondzone.",
      whySelected:
        "Dit is de duidelijkste gemak-eerst-keuze in de selectie. Controleer bij een actuele boeking vooral kamertype, recente kamerinformatie en ligging aan de straat.",
      officialUrl: "https://www.wianginnchiangrai.com/",
    },
    {
      name: "NAI YA Hotel",
      area: "Rob Wiang & zuidkant van de stad",
      category: "Compact modern verblijf",
      bestFor: "Stellen en reizigers met vervoer die een zwembad willen",
      description:
        "Een kleiner modern hotel aan Ruamchittawai Road met zoutwaterzwembad, fitnessruimte, restaurant en fietsen volgens de eigen hotelinformatie.",
      whySelected:
        "Het geeft meer rust en faciliteiten dan een eenvoudig marktverblijf zonder een volledig resort te worden. Plan voor de avond wel een korte rit in plaats van automatische loopafstand te veronderstellen.",
      officialUrl: "https://www.naiyahotel.com/",
    },
    {
      name: "Laluna Hotel & Resort",
      area: "Rob Wiang & zuidkant van de stad",
      category: "Tuinhotel met zwembad",
      bestFor: "Gezinnen, stellen en reizigers die buitenruimte waarderen",
      description:
        "Een laagbouwresort aan Sanambin Road met bungalowachtige kamers, tropische tuin en lagunezwembad binnen het stedelijke gebied.",
      whySelected:
        "Laluna voegt echt tuin- en zwembadtijd toe. Het hotel presenteert Night Bazaar en busstation als taxirit, waardoor het vooral past bij gasten die niet iedere avond willen lopen.",
      officialUrl: "https://www.lalunaresortchiangrai.com/",
    },
    {
      name: "The Riverie by Katathani",
      area: "Kok-rivier, stadsrand",
      category: "Familieresort aan de rivier",
      bestFor: "Gezinnen en meer-generatiereizen met veel hoteltijd",
      description:
        "Een groot resort aan Kraisorasit Road met meerdere kamertypes, kidsclub, spa en River Splash-waterfaciliteiten volgens de officiële hotelsite.",
      whySelected:
        "De combinatie van rivieromgeving en gezinsfaciliteiten onderscheidt het van een centrumhotel. Controleer de route naar je avondadressen en actuele opening van doorslaggevende voorzieningen.",
      officialUrl: "https://www.theriverie.com/",
    },
    {
      name: "Le Méridien Chiang Rai Resort",
      area: "Kok-rivier, noordzijde",
      category: "Volwaardig rivierresort",
      bestFor: "Stellen en reizigers die rust, spa en tuinen prioriteren",
      description:
        "Een full-service resort aan Kwaewai Road met ruime kamers, tuinen, rivierzicht, buitenzwembad, spa en meerdere restaurants.",
      whySelected:
        "De officiële Marriott-pagina positioneert het als rivierresort op autorit van het centrum. Juist die afstand creëert rust, maar maakt iedere onafhankelijke stadsavond een geplande verplaatsing.",
      officialUrl:
        "https://www.marriott.com/en-us/hotels/ceimd-le-meridien-chiang-rai-resort-thailand/overview/",
    },
    {
      name: "Anantara Golden Triangle Elephant Camp & Resort",
      area: "Chiang Saen, Golden Triangle",
      category: "Afgelegen resortetappe",
      bestFor: "Een langere premium reis waarin het resort een hoofddoel is",
      description:
        "Een resort bij Chiang Saen met uitzicht over de grensregio en arrangementen die per boekingsproduct verschillende onderdelen kunnen omvatten.",
      whySelected:
        "Het hoort alleen als bewuste tweede etappe in deze vergelijking. Bekijk bij activiteiten met dieren zelf de actuele programmaopzet, interactievorm en welzijnsinformatie voordat je boekt.",
      officialUrl: "https://www.anantara.com/en/golden-triangle-chiang-rai",
    },
    {
      name: "Four Seasons Tented Camp Golden Triangle",
      area: "Chiang Saen, Golden Triangle",
      category: "Kleinschalige tented-campetappe",
      bestFor:
        "Een bijzondere reis waarbij afzondering belangrijker is dan stadsbereik",
      description:
        "Een kleinschalig tented camp bij Chiang Saen waarvan transfer, maaltijden en activiteiten afhankelijk zijn van het gekozen actuele arrangement.",
      whySelected:
        "Het laat zien dat een Golden Triangle-verblijf geen extra hotelnacht in de stad is. Vergelijk daarom de volledige inclusielijst en transfer, niet alleen het bedrag van de kamer.",
      officialUrl: "https://www.fourseasons.com/goldentriangle/",
    },
  ],
  splitStay: {
    eyebrow: "Eén basis of het noorden toevoegen?",
    title: "Verhuis alleen voor een echt andere etappe",
    description:
      "Voor een korte reis levert wisselen tussen centrum en rivier meestal weinig op: beide ondersteunen dezelfde stads- en tempeldagen. Chiang Saen is wél een aparte bestemming, maar alleen zinvol wanneer landschap, resort en programma de transfer rechtvaardigen.",
    routes: [
      {
        label: "2–3 nachten",
        title: "Eén stads- of rivierbasis",
        description:
          "Kies tussen avondgemak en resortrust en bundel de verspreide tempels in een logische dagroute.",
      },
      {
        label: "4–5 nachten",
        title: "Blijf meestal in Chiang Rai",
        description:
          "Gebruik een chauffeur of excursie voor Doi Tung, theegebieden of de Golden Triangle wanneer verhuizen weinig extra beleving toevoegt.",
      },
      {
        label: "5+ nachten",
        title: "Stad plus Chiang Saen",
        description:
          "Combineer een centrale eerste etappe met een afzonderlijk verblijf in het verre noorden als dat verblijf zelf een reisdoel is.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Controleer plaats én district",
      description:
        "Chiang Rai-stad, Chiang Saen en de Golden Triangle kunnen onder dezelfde provincie verschijnen terwijl ze geen uitwisselbare basis zijn.",
    },
    {
      title: "Test je avondroute",
      description:
        "Bekijk de route van de hotelingang naar Clock Tower of Night Bazaar na zonsondergang; bruggen en hoofdwegen bepalen het gemak.",
    },
    {
      title: "Vergelijk dezelfde voorwaarden",
      description:
        "Controleer kamertype, bezetting, belastingen, ontbijt, annulering en transfers voordat je twee actuele totalen naast elkaar zet.",
    },
    {
      title: "Verifieer doorslaggevende faciliteiten",
      description:
        "Vraag actuele informatie over zwembad, kidsclub, fiets, shuttle, toegankelijkheid en activiteitvoorwaarden vóór een niet-restitueerbare boeking.",
    },
  ],
  faqs: [
    {
      question: "Wat is de beste plek om te verblijven in Chiang Rai?",
      answer:
        "Voor de meeste eerste bezoekers is het centrum tussen Clock Tower, Night Bazaar en Bus Terminal 1 het handigst. Kies de Kok-rivier wanneer je rust en resortfaciliteiten belangrijker vindt dan zelfstandig naar restaurants lopen.",
    },
    {
      question: "Is Chiang Rai goed te voet te verkennen?",
      answer:
        "De centrale avondzone is voor veel reizigers beloopbaar, afhankelijk van hitte, regen, verkeer en persoonlijke mobiliteit. Wat Rong Khun, Baan Dam, de luchthaven en de meeste rivierresorts horen niet bij één eenvoudige wandelroute.",
    },
    {
      question: "Hoeveel nachten heb je nodig in Chiang Rai?",
      answer:
        "Drie nachten geven ruimte voor de stad, de zuidelijke tempelroute en een noordelijke of landelijke dag. Voeg nachten toe voor Doi Tung, Mae Salong of een afzonderlijk verblijf bij Chiang Saen; met twee nachten moet je scherper kiezen.",
    },
    {
      question: "Moet je in het centrum of aan de Kok-rivier verblijven?",
      answer:
        "Kies het centrum voor restaurants en avondwandelingen zonder steeds vervoer te regelen. Kies de rivier voor tuinen, zwembad en een rustiger ritme. Voor een korte reis is één van beide meestal efficiënter dan tussentijds verhuizen.",
    },
    {
      question: "Kun je vanuit de Golden Triangle Chiang Rai-stad bezoeken?",
      answer:
        "Dat kan als gerichte verplaatsing, maar een resort bij Chiang Saen is geen praktische stadsbasis. Behandel de Golden Triangle als een tweede etappe en bevestig vooraf transferduur, inbegrepen onderdelen en voorwaarden.",
    },
    {
      question: "Is Chiang Rai geschikt voor gezinnen?",
      answer:
        "Ja, wanneer je het reistempo rustig houdt. Een centraal hotel beperkt korte ritten; een rivierresort kan juist zwembad en kinderfaciliteiten toevoegen. Controleer altijd bezettingsregels, toezicht en actuele beschikbaarheid van voorzieningen.",
    },
  ],
  relatedGuides: [
    {
      title: "Chiang Rai reisgids",
      description:
        "Plan tempels, eten, vervoer en realistische dagroutes in het noorden.",
      href: "/nl/city/chiang-rai/",
      image: "/images/redesign/chiang-rai-destination-hero.webp",
    },
    {
      title: "Bezienswaardigheden in Chiang Rai",
      description:
        "Plan de stad, kunstroute en tempels voordat je een hotelgebied kiest.",
      href: "/nl/city/chiang-rai/attractions/",
      image: "/images/redesign/chiang-rai-mountain-route.webp",
    },
    {
      title: "Plan ook Chiang Mai",
      description:
        "Vergelijk de grotere noordelijke stadsbasis met het rustigere reisritme van Chiang Rai.",
      href: "/nl/city/chiang-mai/",
      image: "/images/redesign/chiang-mai-chiang-rai-comparison-hero.webp",
    },
  ],
  sources: [
    {
      title: "Chiang Rai",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/chiang-rai/103",
      note: "Officiële bestemmingscontext voor Chiang Rai en de wijdere provincie.",
    },
    {
      title: "Nak Nakara Hotel",
      creator: "Nak Nakara Hotel",
      url: "https://naknakarahotel.com/",
      note: "Controle van adres, kamertypes, zwembad en relatie tot centrale adressen.",
    },
    {
      title: "Wiang Inn Hotel Chiang Rai",
      creator: "Wiang Inn Hotel",
      url: "https://www.wianginnchiangrai.com/",
      note: "Controle van adres, schaal en hotelfaciliteiten.",
    },
    {
      title: "NAI YA Hotel",
      creator: "NAI YA Hotel",
      url: "https://www.naiyahotel.com/",
      note: "Controle van adres, zwembad, fitness, restaurant en fietsen.",
    },
    {
      title: "Laluna Hotel & Resort",
      creator: "Laluna Hotel & Resort",
      url: "https://www.lalunaresortchiangrai.com/",
      note: "Controle van het tuinconcept, zwembad en de relatie tot het centrum.",
    },
    {
      title: "The Riverie by Katathani",
      creator: "Katathani Collection",
      url: "https://www.theriverie.com/",
      note: "Controle van adres, kamertypes, kidsclub, spa en waterfaciliteiten.",
    },
    {
      title: "Le Méridien Chiang Rai Resort",
      creator: "Marriott International",
      url: "https://www.marriott.com/en-us/hotels/ceimd-le-meridien-chiang-rai-resort-thailand/overview/",
      note: "Controle van ligging aan de Kok-rivier, kamers, zwembad, spa, restaurants en afstandscontext.",
    },
    {
      title: "Anantara Golden Triangle",
      creator: "Minor Hotels",
      url: "https://www.anantara.com/en/golden-triangle-chiang-rai/contact",
      note: "Controle van het adres bij Chiang Saen en transfercontext.",
    },
    {
      title: "Four Seasons Tented Camp Golden Triangle",
      creator: "Four Seasons Hotels and Resorts",
      url: "https://www.fourseasons.com/goldentriangle/getting-here/",
      note: "Controle van ligging, schaal en transfercontext van het camp.",
    },
  ],
  dateModified: "2026-07-31",
};
