import type { HotelGuideData } from "../types";

export const paiHotelGuide: HotelGuideData = {
  citySlug: "pai",
  cityName: "Pai",
  parentGuideHref: "/nl/city/pai/",
  locale: "nl",
  pageTitle: "Waar verblijven in Pai? 5 gebieden & 8 hotels",
  pageDescription:
    "Vergelijk Walking Street, de Pai-rivier en de rustige vallei rond Pai. Kies een passende basis en controleer actuele hotelbeschikbaarheid.",
  pageUrl: "https://go2-thailand.com/nl/best-hotels/pai/",
  heroImage: "/images/redesign/pai-destination-hero.webp",
  heroAlt:
    "Groene bergvallei, rijstvelden en houten verblijfplaatsen rond Pai in Noord-Thailand",
  eyebrow: "Kies tussen avondgemak, rivierstilte en de open vallei",
  heroTitle: "Waar verblijven",
  heroAccent: "in Pai?",
  intro:
    "Pai is compact op de kaart, maar je hotelkeuze verandert je dagritme sterk. Vanuit de kern loop je naar Walking Street; aan de rivier slaap je rustiger zonder de avondzone helemaal los te laten; in Tung Yao en de noordelijke vallei heb je vervoer nodig. Kies daarom eerst de ligging en vergelijk daarna pas actuele kamerprijzen en voorwaarden.",
  quickAnswer:
    "Voor een eerste bezoek zonder scooter is de kern rond Walking Street en het busstation de meest praktische keuze. Direct ten oosten van de Pai-rivier krijg je meer rust terwijl het centrum, afhankelijk van de exacte ingang en het weer, nog te voet bereikbaar kan zijn. Kies Tung Yao of de noordelijke vallei alleen wanneer uitzicht en afzondering zwaarder wegen dan spontaan uit eten gaan.",
  areaDecisionNote:
    "In boekingsresultaten kan een adres in Pai zowel een steeg bij de avondmarkt als een landelijke helling buiten de kern betekenen. Controleer daarom de kaartpin, de brug of toegangsweg en je terugroute na zonsondergang. De boekingsknoppen tonen actuele beschikbaarheid via Trip.com; deze gids zet bewust geen vaste prijzen of reviewscores vast.",
  areas: [
    {
      slug: "walking-street-centre",
      name: "Walking Street & dorpskern",
      shortLabel: "Alles te voet",
      tone: "easy",
      image: "/images/redesign/pai-food-walking-street.webp",
      imageAlt: "Warme avondverlichting en eetkraampjes in het centrum van Pai",
      bestFor:
        "Een eerste bezoek, busreizigers en wie restaurants en avondmarkt dichtbij wil",
      summary:
        "De kleine kern rond Chaisongkram Road, het busstation en Walking Street biedt het meeste gemak. Binnen enkele straten verschilt de sfeer echter van levendige marktstraat tot stillere zijweg.",
      advantage:
        "Je hebt voor aankomst, ontbijt en de meeste avonden geen eigen vervoer nodig.",
      tradeoff:
        "Muziek, marktbezoek en verkeer kunnen hoorbaar zijn; een centrale kaartpin zegt niets over de ligging van je kamer.",
      transport:
        "Loop de route vanaf het busstation op de kaart na en vraag bij lichte slapers om een kamer van de straat af.",
    },
    {
      slug: "pai-river-east-bank",
      name: "Pai-rivier & oostoever",
      shortLabel: "Rust bij de kern",
      tone: "scenic",
      image: "/images/redesign/pai-valley-riverside-v2.webp",
      imageAlt: "De groene vallei en rivieromgeving van Pai bij ochtendlicht",
      bestFor:
        "Stellen en rustige reizigers die Walking Street niet volledig willen opgeven",
      summary:
        "Aan de Mae Hi-kant van de rivier liggen bungalows en kleinschalige resorts buiten de drukste straten. De afstand tot het centrum kan klein lijken, maar de bruikbare brug en hotelingang bepalen de echte wandeling.",
      advantage:
        "Je combineert een groener slaapadres met relatief snelle toegang tot de avondkern.",
      tradeoff:
        "Een onverlichte of natte terugroute voelt 's avonds anders dan dezelfde afstand overdag.",
      transport:
        "Controleer welke brug je gebruikt en of de route voor jouw mobiliteit ook bij regen en met bagage werkt.",
    },
    {
      slug: "mae-hi-mae-yen",
      name: "Mae Hi & Mae Yen",
      shortLabel: "Langzaam Pai",
      tone: "quiet",
      image: "/images/extra images/The shore of the river Pai.webp",
      imageAlt: "Groene oever van de Pai-rivier bij Mae Hi",
      bestFor:
        "Een langer verblijf, bungalows en reizigers die stilte boven uitgaan kiezen",
      summary:
        "Verder oostelijk en zuidoostelijk rond Mae Hi wordt Pai landelijker. Hier verblijf je tussen groen, vijvers en lokale wegen, met Wat Phra That Mae Yen aan deze zijde van de rivier.",
      advantage:
        "Meer buitenruimte en een kalmer ochtend- en avondritme dan midden in de marktzone.",
      tradeoff:
        "Restaurants en het busstation zijn niet vanuit ieder adres een comfortabele wandeling.",
      transport:
        "Plan een veilige rit terug en neem de naam en kaartpin van het verblijf offline mee; straatverlichting is niet overal stedelijk.",
    },
    {
      slug: "tung-yao-south-valley",
      name: "Tung Yao & zuidelijke vallei",
      shortLabel: "Uitzicht en route",
      tone: "scenic",
      image: "/images/redesign/pai-canyon-route.webp",
      imageAlt: "Berglandschap langs de zuidelijke route door de Pai-vallei",
      bestFor:
        "Stellen, roadtrippers en wie Pai Canyon of de zuidelijke route centraal stelt",
      summary:
        "Ten zuiden van de kern liggen resorts op ruimere percelen rond Route 1095 en de landelijke zijwegen van Tung Yao. Dit is een landschapsbasis, geen verlengstuk van Walking Street.",
      advantage:
        "Uitzicht, tuin en rust krijgen voorrang en de zuidelijke bezienswaardigheden liggen logischer op je route.",
      tradeoff:
        "Zonder vooraf geregeld vervoer ben je minder vrij voor spontane avonden in het centrum.",
      transport:
        "Verifieer de exacte toegangsweg, parkeeroptie en actuele transfermogelijkheden rechtstreeks bij het hotel.",
    },
    {
      slug: "north-valley-viang-nuea",
      name: "Noordelijke vallei & Viang Nuea",
      shortLabel: "Landelijke afzondering",
      tone: "local",
      image: "/images/cities/generated/pai.webp",
      imageAlt: "Mistige groene heuvels en landelijke vallei ten noorden van Pai",
      bestFor:
        "Reizigers met eigen vervoer, een langer verblijf en veel tijd bij het hotel",
      summary:
        "Richting Viang Nuea liggen grotere tuinen, bergzicht en een uitgesproken landelijk decor. De rust is echt, maar de afstand tot de avondmarkt eveneens.",
      advantage:
        "De vallei en het verblijf worden onderdeel van de ervaring in plaats van alleen een slaapadres.",
      tradeoff:
        "Iedere maaltijd of activiteit buiten het hotel vraagt meer planning en reistijd.",
      transport:
        "Beoordeel niet alleen kilometers: controleer wegdek, laatste afslag en vervoer in het donker voor jouw reisperiode.",
    },
  ],
  hotelPicks: [
    {
      name: "Pai Village Boutique Resort",
      area: "Walking Street & dorpskern",
      category: "Boutiqueverblijf in het centrum",
      bestFor: "Een eerste bezoek met restaurants en avondmarkt voor de deur",
      description:
        "Een groen boutique resort aan Tedsaban 1 Road met Lanna-geïnspireerde kamers en bungalows, direct bij de centrale avondzone.",
      whySelected:
        "De officiële site bevestigt dat Walking Street op enkele stappen ligt. Dat maakt dit de sterkste gemak-eerst-keuze, terwijl de binnentuin afstand creëert tot de straat; vraag voor stilte alsnog naar de kamerlokatie.",
      officialUrl: "https://paivillage.com/",
    },
    {
      name: "Pai Cherkaew Boutique House",
      area: "Walking Street & dorpskern",
      category: "Kleinschalige centrumkeuze",
      bestFor: "Reizigers die een compacte basis vlak bij de avondmarkt zoeken",
      description:
        "Een klein boutique house met individueel ingerichte kamers, teakdetails, een bescheiden plunge pool en parkeerruimte volgens de eigen site.",
      whySelected:
        "De officiële locatiepagina plaatst het vlak bij de night market. Het is daarmee een ander product dan een vallei-resort: kies het voor loopgemak, niet voor een uitgestrekt terrein.",
      officialUrl: "https://paicherkaew.wordpress.com/",
    },
    {
      name: "Family House Zen Boutique Resort",
      area: "Pai-rivier & oostoever",
      category: "Rustige rivierbasis",
      bestFor: "Stellen die groen willen zonder ver van de avondkern te slapen",
      description:
        "Een kleinschalig resort aan de oostzijde van de Pai-rivier, met vrijstaande kamers en een zwembad in een groene setting.",
      whySelected:
        "De officiële hotelinformatie noemt het busstation op korte afstand. Controleer desondanks de actuele looproute over de rivier, vooral wanneer je met bagage aankomt of in de regenperiode reist.",
      officialUrl: "https://www.familyhousezen.com/",
    },
    {
      name: "Pairadise Resort",
      area: "Mae Hi & Mae Yen",
      category: "Bungalows rond vijvers",
      bestFor: "Langzaam reizen, privacy en een groene omgeving",
      description:
        "Een bungalowverblijf in Baan Mae Yen met lokaal gedecoreerde accommodaties, tuinen en natuurlijke zwemvijvers volgens de eigen site.",
      whySelected:
        "Pairadise vertegenwoordigt de rustige Mae Hi-keuze zonder zich als centrumhotel voor te doen. De officiële site omschrijft Walking Street als bereikbaar, maar test de route zelf op weer, licht en mobiliteit.",
      officialUrl: "https://www.pairadise.com/",
    },
    {
      name: "Reverie Siam",
      area: "Tung Yao & zuidelijke vallei",
      category: "Kleinschalig designresort",
      bestFor: "Stellen en reizigers die hotelervaring boven avondmarktgemak zetten",
      description:
        "Een intiem resort met 18 individueel vormgegeven kamers, geïnspireerd op vroeg-twintigste-eeuwse architectuur en culturele uitwisseling in Zuidoost-Azië.",
      whySelected:
        "De schaal en uitgesproken inrichting maken dit een bestemming op zichzelf. Neem vervoer naar het centrum mee in de beslissing en bevestig actuele restaurant- en vervoersinformatie voor je data.",
      officialUrl: "https://reveriesiam.com/",
    },
    {
      name: "Pai Iyara Resort",
      area: "Tung Yao & zuidelijke vallei",
      category: "Resort op een groene helling",
      bestFor: "Roadtrippers en reizigers die rust en bergdecor zoeken",
      description:
        "Een resort op een helling in Tung Yao, ten zuiden van Pai, met verschillende accommodatietypen in een natuurlijke omgeving.",
      whySelected:
        "Het officiële adres bevestigt dat dit geen centrumhotel is. Kies het wanneer de zuidelijke route en tijd op het terrein belangrijk zijn en leg noodzakelijk vervoer vooraf vast.",
      officialUrl: "https://paiiyararesort.com/",
    },
    {
      name: "Belle Villa Resort Pai",
      area: "Noordelijke vallei & Viang Nuea",
      category: "Ruim vallei-resort",
      bestFor: "Gezinnen en stellen die zwembad en buitenruimte prioriteren",
      description:
        "Een resort met cottages en een kamergebouw, berggerichte balkons, zwembad en een eigen restaurant in de landelijke noordrand van Pai.",
      whySelected:
        "De officiële site bevestigt meerdere ruime kamertypen en een landelijk resortkarakter. Controleer actuele bezetting, bereikbaarheid en doorslaggevende voorzieningen vóór een niet-restitueerbare boeking.",
      officialUrl: "https://www.bellevillaresort.com/en/pai",
    },
    {
      name: "Puri Pai Villa",
      area: "Noordelijke vallei & Viang Nuea",
      category: "Villa-retreat met bergzicht",
      bestFor: "Stellen, families en rustzoekers die veel tijd bij het verblijf plannen",
      description:
        "Een villa- en retreatconcept op een groene helling buiten de kern, met kamers en grotere villa-opties gericht op privacy en uitzicht over de Pai-vallei.",
      whySelected:
        "Dit is een bewuste afzonderingskeuze, geen handig adres voor iedere avond Walking Street. Vergelijk het volledige kamertype en bevestig vervoer en geopende faciliteiten rechtstreeks voor jouw verblijfsdata.",
      officialUrl: "https://puripaivilla.com/",
    },
  ],
  splitStay: {
    eyebrow: "Centrum en vallei combineren?",
    title: "Verhuis alleen als je reisritme echt verandert",
    description:
      "Voor twee of drie nachten kost een hotelwissel meestal meer tijd dan hij oplevert. Bij vijf nachten of langer kan een korte centrale start gevolgd door een landelijke retreat wél logisch zijn, mits vervoer en bagageoverdracht vooraf helder zijn.",
    routes: [
      {
        label: "2–3 nachten",
        title: "Kies één loopbare basis",
        description:
          "Verblijf in de kern of net over de rivier en plan Pai Canyon en de vallei als gerichte uitstap.",
      },
      {
        label: "4–5 nachten",
        title: "Eén rustige basis kan volstaan",
        description:
          "Kies Mae Hi of de rand wanneer je vervoer hebt en niet iedere avond naar Walking Street wilt.",
      },
      {
        label: "5+ nachten",
        title: "Centrum plus landelijke retreat",
        description:
          "Start praktisch bij Walking Street en verhuis alleen voor meerdere langzame dagen met uitzicht, tuin en hoteltijd.",
      },
    ],
  },
  bookingTips: [
    {
      title: "Controleer de brug en ingang",
      description:
        "Een hotel vlak bij de rivier kan via de bruikbare brug een langere route hebben. Bekijk de echte wandel- of rijroute, niet alleen de afstand in vogelvlucht.",
    },
    {
      title: "Plan aankomst zonder risicorit",
      description:
        "Pai bereik je over een bochtige bergroute. Regel passend vervoer en behandel een scooter niet als vanzelfsprekende oplossing wanneer je weinig ervaring hebt.",
    },
    {
      title: "Vergelijk dezelfde kamer",
      description:
        "Controleer bezetting, bedtype, ontbijt, belastingen, annulering en kamerlokatie voordat je twee actuele totalen naast elkaar zet.",
    },
    {
      title: "Verifieer wat doorslaggevend is",
      description:
        "Vraag rechtstreeks naar actuele zwembad-, restaurant-, parkeer-, transfer- en toegankelijkheidsinformatie vóór een niet-restitueerbare boeking.",
    },
  ],
  faqs: [
    {
      question: "Wat is de beste plek om te verblijven in Pai?",
      answer:
        "Voor een eerste bezoek zonder eigen vervoer is de kern rond Walking Street het handigst. De oostoever van de Pai-rivier past bij wie rust wil maar de avondzone bereikbaar wil houden. Kies de noordelijke of zuidelijke vallei voor landschap en hoteltijd, niet voor dagelijks loopgemak.",
    },
    {
      question: "Kun je in Pai verblijven zonder scooter?",
      answer:
        "Ja. Boek dan centraal bij het busstation en Walking Street en reserveer passend vervoer voor verspreide bezienswaardigheden. Een onervaren reiziger hoeft de bochtige wegen rond Pai niet als oefenterrein te gebruiken; controleer alternatieven bij hotel en lokale vervoerders.",
    },
    {
      question: "Hoeveel nachten heb je nodig in Pai?",
      answer:
        "Drie nachten geven de meeste reizigers twee volledige dagen voor de kern, de zuidelijke route en rust in de vallei. Met vier of vijf nachten hoef je minder te stapelen. Eén nacht is kwetsbaar voor reistijd en maakt het bergtraject relatief dominant.",
    },
    {
      question: "Is Walking Street de beste hotelzone in Pai?",
      answer:
        "Walking Street is de praktischste zone voor avondeten en aankomst per minibus, maar niet automatisch de rustigste. Kijk naar de exacte straat en kamerrichting. Voor vroeg slapen of veel buitenruimte kan net over de rivier of buiten de kern beter passen.",
    },
    {
      question: "Is de oostoever van de Pai-rivier beloopbaar?",
      answer:
        "Sommige verblijven liggen op een haalbare wandeling van de kern, maar de brug, toegangsweg, regen, duisternis en persoonlijke mobiliteit bepalen of die route prettig is. Controleer daarom de kaartpin en vraag het hotel naar de actuele route.",
    },
    {
      question: "Waar verblijf je in Pai voor rust en natuur?",
      answer:
        "Mae Hi, Tung Yao en de noordelijke vallei bieden meer groen en afstand tot de marktzone. Daar staat tegenover dat je voor restaurants en activiteiten vaker vervoer plant. Kies het specifieke landschap én de toegangsweg, niet alleen het woord ‘resort’.",
    },
    {
      question: "Moet je twee hotels in Pai combineren?",
      answer:
        "Niet bij een kort verblijf. Eén goede basis is efficiënter voor twee tot vier nachten. Een split-stay wordt pas interessant bij een langer bezoek waarin je eerst de kern wilt ervaren en daarna bewust meerdere dagen bij een landelijke retreat blijft.",
    },
    {
      question: "Wanneer moet je een hotel in Pai vroeg boeken?",
      answer:
        "De vraag kan hoger zijn in het koelere seizoen, tijdens feestdagen en rond lokale evenementen. Boek vroeg wanneer je een specifiek kleinschalig hotel of kamertype nodig hebt, maar vergelijk altijd actuele annuleringsvoorwaarden omdat planning en weer kunnen veranderen.",
    },
  ],
  relatedGuides: [
    {
      title: "Pai reisgids",
      description:
        "Plan de bergroute, bezienswaardigheden en een realistisch verblijf in de vallei.",
      href: "/nl/city/pai/",
      image: "/images/redesign/pai-destination-hero.webp",
    },
    {
      title: "Weer en beste reistijd voor Pai",
      description:
        "Stem koele ochtenden, regen en buitenroutes af op je reismaand.",
      href: "/nl/city/pai/best-time-to-visit/",
      image: "/images/redesign/pai-valley-riverside-v2.webp",
    },
    {
      title: "Eten in Pai",
      description:
        "Vind Walking Street, Noord-Thaise smaken en rustige eetmomenten buiten de drukte.",
      href: "/nl/food/pai/",
      image: "/images/redesign/pai-food-walking-street-table.webp",
    },
  ],
  sources: [
    {
      title: "Mae Hong Son",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Mae-Hong-Son/106",
      note: "Officiële bestemmingscontext voor Pai en de provincie Mae Hong Son.",
    },
    {
      title: "Accommodaties in de gemeente Pai",
      creator: "Pai Subdistrict Municipality",
      url: "https://tessabanpai.go.th/upload/catalogs_file/catalogs_file_47_50_10_302160.pdf",
      note: "Gemeentelijke adressenlijst als controle op plaatsnamen, subdistricten en hotelwebsites.",
    },
    {
      title: "Pai Village Boutique Resort",
      creator: "Pai Village Boutique Resort",
      url: "https://paivillage.com/",
      note: "Controle van adres, verblijfstypen en ligging bij Walking Street.",
    },
    {
      title: "Pai Cherkaew Boutique House",
      creator: "Pai Cherkaew Boutique House",
      url: "https://paicherkaew.wordpress.com/",
      note: "Controle van centrale ligging, kamers, plunge pool en parkeerruimte.",
    },
    {
      title: "Family House Zen Boutique Resort",
      creator: "Family House Zen Boutique Resort",
      url: "https://www.familyhousezen.com/",
      note: "Controle van hotelidentiteit, ligging en basisvoorzieningen.",
    },
    {
      title: "Pairadise Resort",
      creator: "Pairadise Resort",
      url: "https://www.pairadise.com/",
      note: "Controle van adres in Mae Hi, bungalows, tuinen en natuurlijke zwemvijvers.",
    },
    {
      title: "Reverie Siam",
      creator: "Reverie Siam",
      url: "https://reveriesiam.com/",
      note: "Controle van schaal, kamers, ontwerpconcept en hotelfaciliteiten.",
    },
    {
      title: "Pai Iyara Resort",
      creator: "Pai Iyara Resort",
      url: "https://paiiyararesort.com/",
      note: "Controle van het adres in Tung Yao en het karakter van het resort.",
    },
    {
      title: "Belle Villa Resort Pai",
      creator: "Belle Villa Resort",
      url: "https://www.bellevillaresort.com/en/pai",
      note: "Controle van kamertypen, zwembad, restaurant en vallei-context.",
    },
    {
      title: "Puri Pai Villa",
      creator: "Puri Pai Villa",
      url: "https://puripaivilla.com/",
      note: "Controle van het villa- en retreatconcept, ligging op een helling en accommodatietypen.",
    },
  ],
  dateModified: "2026-07-31",
};
