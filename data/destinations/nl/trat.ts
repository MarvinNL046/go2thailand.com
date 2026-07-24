import type { DestinationGuideData } from '../types';

export const tratDestinationGuide: DestinationGuideData = {
  citySlug: 'trat',
  cityName: 'Trat',
  locale: 'nl',
  pageTitle: 'Trat Thailand: stad, eilanden & route kiezen (2026)',
  pageDescription:
    'Ontdek Trat-stad, Ban Nam Chiao en de juiste route naar Koh Chang, Koh Kood of Koh Mak. Met verblijfsadvies, eten, vervoer en actuele grenscontext.',
  pageUrl: 'https://go2-thailand.com/nl/city/trat/',
  dateModified: '2026-07-24',
  coordinates: { latitude: 12.2428, longitude: 102.5175 },
  touristType: [
    'Eilandreizigers',
    'Slow travel',
    'Foodreizigers',
    'Oost-Thailand-routes',
  ],
  stayGuideHref: '/best-hotels/trat/',
  hero: {
    image: '/images/redesign/trat-destination-hero.webp',
    imageAlt:
      'Houten huizen, marktlicht en een kanaal in Trat-stad na een tropische bui',
    eyebrow: 'Kleine stad vóór grote eilandkeuzes',
    title: 'Trat',
    accent: 'Thailand',
    subtitle: 'Blijf één nacht. Kies daarna de juiste kust.',
    description:
      'Trat is meer dan de plaatsnaam op je eilandticket. De compacte oude wijk, ochtendmarkt en lokale keuken maken een tussenstop de moeite waard, terwijl de provincie toegang geeft tot Koh Chang, Koh Kood en Koh Mak. De slimme route begint met één vraag: naar welk eiland ga je werkelijk?',
    imageClassName: 'object-cover object-[66%_center] lg:object-center',
    stats: [
      {
        label: 'Goede eerste reisduur',
        value: '1–2 nachten',
        icon: 'calendar',
      },
      {
        label: 'Sterkste stadsbasis',
        value: 'Oude stad & markt',
        icon: 'hotel',
      },
      { label: 'Belangrijkste keuze', value: 'Eiland vóór pier', icon: 'ship' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst de geografie, dan het ticket',
    title:
      'Trat is de rustige vastelandbasis die je eilandroute overzichtelijk maakt',
    paragraphs: [
      'Met “Trat” kunnen vier verschillende dingen worden bedoeld: de stad, de provincie, de luchthaven of een vertrekcorridor naar de eilanden. Trat-stad ligt landinwaarts en heeft een eigen markt- en erfgoedlaag. De pieren liggen elders aan de kust. Koh Chang, Koh Kood en Koh Mak zijn weer zelfstandige bestemmingen. Wie die lagen uit elkaar houdt, voorkomt de klassieke fout waarbij een goedkoop ticket eindigt bij de verkeerde terminal of pier.',
      'Eén nacht is genoeg om de oude wijk rond Rak Khlong Bang Phra te lopen, de markt te bezoeken en zonder overstapstress lokaal te eten. Met twee nachten voeg je Ban Nam Chiao en Laem Ngop toe als community- en kustroute. Reis je alleen door en heb je een ruime, bevestigde aansluiting van je letterlijke aankomstpunt tot de juiste boot, dan hoeft een stadsnacht niet verplicht te worden. Bij losse tickets, late aankomst of slecht weer is marge waardevoller dan een strak schema.',
      'Trat is vooral sterk voor reizigers die kleine steden, eten en een rustiger tempo waarderen. Verwacht geen strandboulevard of lange lijst spectaculaire stadsattracties. De beloning zit in het dagelijkse ritme én in een beter gekozen eilandvervolg. Gebruik deze pagina daarom als beslisgids: kies eerst of je de stad wilt ervaren, bepaal daarna je eiland en controleer pas dan pier, operator, bagage en actuele uitvoering.',
    ],
    verdicts: [
      {
        label: 'Is Trat de moeite waard?',
        value: 'Ja, voor 1 nacht',
        description:
          'De oude wijk, markt en lokale tafel geven een rustige, inhoudelijke pauze vóór de kust.',
        icon: 'sparkles',
      },
      {
        label: 'Hoeveel nachten?',
        value: '1–2',
        description:
          'Eén voor de stad; twee wanneer Ban Nam Chiao en Laem Ngop echt onderdeel van je route zijn.',
        icon: 'calendar',
      },
      {
        label: 'Waar slapen?',
        value: 'Stad óf piergericht',
        description:
          'Kies de oude stad voor sfeer en eten, de juiste kustcorridor alleen voor een vroege boot.',
        icon: 'hotel',
      },
      {
        label: 'Grootste routefout',
        value: 'Verkeerde pier',
        description:
          'Koh Chang gebruikt een andere vertreklogica dan Koh Kood en Koh Mak.',
        icon: 'compass',
      },
    ],
  },
  zones: [
    {
      slug: 'rak-khlong-bang-phra',
      name: 'Rak Khlong Bang Phra',
      kicker: 'Houten huizen en het oude stadsritme',
      image: '/images/redesign/trat-old-town.webp',
      imageAlt:
        'Historische houten huizen en een kleine brug langs het kanaal in Trat',
      summary:
        'De oude kanaalwijk is de beste plek om Trat als stad te begrijpen. Houten woon- en handelshuizen, steegjes, kleine eetplekken en lokale erfgoedinitiatieven vormen geen decorpark maar een levende buurt. Loop langzaam, kijk ook achter de eerste gevelrij en combineer de wijk met het stadsmuseum wanneer dit op je bezoekdag geopend is.',
      bestFor:
        'Eerste bezoekers, straatfotografie, kleine guesthouses en reizigers die de stad te voet willen ontdekken.',
      tradeoff:
        'Het aanbod is kleinschalig en openingstijden kunnen wisselen. Behandel woonhuizen als privéruimte, fotografeer mensen alleen met toestemming en plan geen hele dag op basis van één café of oud blogadres.',
    },
    {
      slug: 'markt-wat-phai-lom',
      name: 'Markt & Wat Phai Lom',
      kicker: 'Dagelijks Trat in plaats van een checklist',
      image: '/images/redesign/trat-destination-hero.webp',
      imageAlt: 'Avondmarkt en kanaalbuurt in Trat-stad',
      summary:
        'Rond de dagmarkt, avondhandel en Wat Phai Lom zie je hoe de stad eet, koopt en beweegt. Ga vroeg voor verse producten en ontbijt, en kom later terug voor een andere sfeer. De tempel en omliggende straten geven context, maar het gewone marktleven is hier minstens zo belangrijk als een formele bezienswaardigheid.',
      bestFor:
        'Foodreizigers, korte verblijven en iedereen die zonder lange transfer een betekenisvolle ochtend en avond wil plannen.',
      tradeoff:
        'Marktnamen, locaties en tijden worden online vaak door elkaar gehaald. Vraag je accommodatie wat die dag werkelijk actief is en behandel een oude prijs of openingstijd nooit als garantie.',
    },
    {
      slug: 'ban-nam-chiao-laem-ngop',
      name: 'Ban Nam Chiao & Laem Ngop',
      kicker: 'Community, mangrove en kustgeschiedenis',
      image: '/images/redesign/trat-ban-nam-chiao.webp',
      imageAlt:
        'Houten wandelpad door de mangrove bij Ban Nam Chiao met moskee en tempel in de gemeenschap',
      summary:
        'Ban Nam Chiao wordt door Tourism Thailand uitgelicht als gemeenschap met boeddhistische, islamitische en Chinese invloeden, ambacht en mangrovelandschap. Combineer het zorgvuldig met Laem Ngop voor kust- en maritieme context. Kies een lokale begeleider of community-activiteit waarbij duidelijk is wat inbegrepen is en hoe de opbrengst terechtkomt.',
      bestFor:
        'Een tweede dag, community-based tourism, mangrove, lokale cultuur en reizigers die meer willen dan alleen een piertransfer.',
      tradeoff:
        'Dit is geen openluchtstudio. Kleed je respectvol, vraag toestemming, vermijd geënsceneerde portretten en controleer vervoer heen én terug. Laem Ngop is bovendien niet automatisch jouw actuele eilandpier.',
    },
    {
      slug: 'piercorridors',
      name: 'De twee piercorridors',
      kicker: 'Koh Chang is niet Koh Kood',
      image: '/images/redesign/trat-route-banner.webp',
      imageAlt:
        'Routevisual vanuit Trat-stad naar een autoferry voor Koh Chang en een snelle boot richting Koh Kood en Koh Mak',
      summary:
        'Voor Koh Chang reis je doorgaans naar de Laem Ngop/Ao Thammachat-kant en stap je op een voertuig- of passagiersferry. Voor Koh Kood en veel Koh Mak-verbindingen is Laem Sok een belangrijke vertrekcorridor. Operators, seizoenen en gecombineerde tickets kunnen variëren, dus de eilandnaam en de letterlijke pier moeten allebei op je bevestiging staan.',
      bestFor:
        'Iedereen met een boot, losse tickets, huurvervoer of een aankomst via Trat Airport.',
      tradeoff:
        '“Transfer naar Trat” zegt te weinig. Controleer ophaalpunt, wegvervoerder, pier, bootoperator, eilandhaven, bagage en wijzigingsvoorwaarden als één keten. Laat voldoende marge wanneer segmenten apart zijn geboekt.',
    },
  ],
  highlights: [
    {
      eyebrow: 'Begin bij de stad zelf',
      title: 'Loop eerst de oude wijk voordat Trat alleen een transfer wordt',
      image: '/images/redesign/trat-old-town.webp',
      imageAlt: 'Kanaal, brug en houten huizen in de oude wijk van Trat',
      description:
        'Rak Khlong Bang Phra maakt de schaal van Trat begrijpelijk: geen monumentale “oude stad”, maar een bewoonde wijk met handel, herinnering en dagelijks gebruik. Koppel de wandeling aan het museum, de markt en een maaltijd in plaats van losse fotostops af te vinken.',
      decision:
        'Plan de wijk voor late middag en vroege avond, of combineer haar met een marktochtend na één centrale overnachting.',
      href: '/city/trat/attractions/',
    },
    {
      eyebrow: 'Reis met lokale context',
      title: 'Ban Nam Chiao laat zien dat de provincie meer is dan eilanden',
      image: '/images/redesign/trat-ban-nam-chiao.webp',
      imageAlt: 'Mangrovegemeenschap van Ban Nam Chiao in de provincie Trat',
      description:
        'De gemeenschap verbindt mangrove, visserij, ambacht en verschillende geloofstradities. De waarde zit niet in zoveel mogelijk activiteiten, maar in een kleine route met uitleg, respect en aantoonbare lokale betrokkenheid.',
      decision:
        'Voeg Ban Nam Chiao toe met een tweede nacht en regel vooraf een betrouwbare heen- en terugrit of lokale begeleiding.',
      href: '/city/trat/attractions/',
    },
    {
      eyebrow: 'Boek de keten, niet de plaatsnaam',
      title: 'Kies eerst je eiland en laat daaruit je pier volgen',
      image: '/images/redesign/trat-route-banner.webp',
      imageAlt:
        'Visuele splitsing tussen de route naar Koh Chang en de route naar Koh Kood en Koh Mak',
      description:
        'Koh Chang, Koh Kood en Koh Mak vragen niet om hetzelfde vertrekpunt, boottype of aankomstpunt. Een combiticket is handig wanneer alle segmenten duidelijk zijn; een vage “Trat transfer” is dat niet.',
      decision:
        'Open je bevestiging vóór betaling en zoek letterlijk naar startpunt, pier, operator, eilandhaven en bagageregels.',
      href: '/transport/',
    },
  ],
  featureBanner: {
    image: '/images/redesign/trat-route-banner.webp',
    imageAlt:
      'Trat als knooppunt met afzonderlijke routes naar Koh Chang en naar Koh Kood of Koh Mak',
    eyebrow: 'Eén stad, twee kustlijnen in je planning',
    title: 'Boek nooit alleen “Trat naar het eiland”',
    description:
      'Zet eerst busstation, luchthaven of hotel vast als startpunt. Kies daarna Koh Chang óf Koh Kood/Koh Mak, controleer de bijbehorende pier en lees de volledige transferketen. Dat ene minuutje vergelijken voorkomt een dure rit langs de verkeerde kust.',
  },
  food: {
    image: '/images/redesign/trat-food.webp',
    imageAlt:
      'Trat-tafel met krabnoedels, gegrilde inktvis, rijstsnacks, mangosteen en salacca',
    eyebrow: 'Proef de provincie vóór de boot',
    title: 'Krab, rijstsnacks en fruit vertellen het echte Trat-verhaal',
    description:
      'De eetcultuur van Trat past bij kust, boomgaarden en kleine handelsgemeenschappen. Zoek niet naar één “beroemd restaurant”, maar bouw een dag met marktsnack, verse lunch en een rustig diner. Vraag bij allergieën naar schaal- en schelpdieren, vissaus, garnalenpasta, bouillon en gedeelde bereiding; een ogenschijnlijk eenvoudig rijstgerecht kan meerdere smaakmakers bevatten.',
    dishes: [
      {
        name: 'Krabnoedels en verse seafood',
        description:
          'Krab, inktvis en vis passen bij de kustprovincie, maar versheid en herkomst zijn belangrijker dan een virale zaak. Kies een drukke keuken, laat de prijs vóór bereiding bevestigen en vraag of krab in saus, bouillon of als los vlees wordt geserveerd.',
      },
      {
        name: 'Khao kriap en oude-wijksnacks',
        description:
          'Lokale rijst- en deegsnacks worden vaak met hartige dips of toppings gegeten. Proef klein op de markt en vraag wat erin zit; namen en bereidingen verschillen per verkoper en een “vegetarische” basis kan nog vissaus of gedroogde garnaal bevatten.',
      },
      {
        name: 'Salacca, mangosteen en boomgaardfruit',
        description:
          'Trat staat bekend om tropisch fruit, waaronder salacca. Koop rijp fruit in kleine hoeveelheden, laat een verkoper tonen hoe je het opent en controleer vervoers- en invoerregels voordat je fruit naar luchthaven of buitenland meeneemt.',
      },
    ],
  },
  itinerary: {
    eyebrow: 'Een kleine stad verdient een heldere route',
    title: 'Trat in één of twee nachten zonder bootstress',
    description:
      'Houd stadsbezoek en eilandtransfer als aparte blokken. Zo blijft de oude wijk ontspannen en hoeft je vertrekdag niet afhankelijk te zijn van een museum, communitytour of lange lunch.',
    days: [
      {
        day: 'Aankomst',
        title: 'Slaap centraal en zet alle vertrekpunten op de kaart',
        description:
          'Check of je aankomt bij Trat Airport, het busstation, een hotel of een operatoroffice. Kies een verblijf bij de oude stad wanneer je wilt lopen en eten. Bewaar tegelijk de juiste pier en eilandhaven, maar ga nog niet uit van een geschatte rijtijd.',
        href: '/best-hotels/trat/',
      },
      {
        day: 'Dag 1',
        title: 'Ochtendmarkt, oude wijk en een tafel uit Trat',
        description:
          'Begin bij de markt, pauzeer tijdens het heetste dagdeel en loop Rak Khlong Bang Phra later op de dag. Voeg het museum of Wat Phai Lom toe wanneer opening en energie passen. Eindig met krab, rijstsnacks of seizoensfruit en bevestig daarna je volgende transfer.',
        href: '/city/trat/food/',
      },
      {
        day: 'Dag 2',
        title: 'Ban Nam Chiao en Laem Ngop als bewuste uitbreiding',
        description:
          'Kies een compacte community- en mangroveroute met geregeld vervoer. Vraag vooraf naar duur, begeleiding, kleding, inbegrepen activiteiten en terugkomst. Laat deze dag vervallen wanneer je boot dezelfde middag vertrekt; een lokale ervaring hoort geen race tegen de pier te worden.',
        href: '/city/trat/attractions/',
      },
      {
        day: 'Vervolg',
        title: 'Reis rechtstreeks naar de juiste pier en eilandhaven',
        description:
          'Controleer vlak voor vertrek weer, operatorbericht en ophaalpunt. Houd bij losse tickets extra marge. Naar Koh Chang en naar Koh Kood of Koh Mak volg je niet blind dezelfde kustroute; laat de eilandnaam de pierkeuze bepalen.',
        href: '/transport/',
      },
    ],
  },
  planning: {
    weather: {
      title: 'Stadsweer en vaarweer zijn twee verschillende controles',
      summary:
        'Een bui hoeft je marktdag niet te verpesten, maar wind, zicht en zeegang kunnen een bootverbinding wel beïnvloeden. Trat is tropisch en de nattere periode vraagt meer flexibiliteit. Baseer een vertrek niet op een maandgemiddelde alleen: kijk naar de actuele verwachting voor stad, kust en vaargebied.',
      best: 'Voor eilandroutes wordt de drogere periode vaak als eenvoudiger ervaren',
      tradeoff:
        'Een “beste maand” is geen garantie voor kalme zee. Controleer TMD, de operator en je accommodatie opnieuw. Boek flexibele marges, bewaar een stadsalternatief en neem elektronica en documenten waterdicht mee.',
      href: '/weather/',
      image: '/images/redesign/trat-destination-hero.webp',
      imageAlt: 'Trat-stad in zacht avondlicht na een regenbui',
    },
    transport: {
      title: 'Maak van vijf losse namen één controleerbare reisketen',
      summary:
        'Trat Airport, Trat Bus Terminal, je hotel, de kustpier en de aankomsthaven zijn afzonderlijke punten. Een aanbieder kan meerdere segmenten combineren, maar jij moet nog steeds weten wie elk deel uitvoert en wat er gebeurt wanneer een aansluiting wijzigt.',
      facts: [
        'Voor Koh Chang controleer je de actuele operator en pier aan de Laem Ngop/Ao Thammachat-kant. Voor Koh Kood en veel Koh Mak-routes controleer je expliciet Laem Sok en de actuele eilandstop. Een oud bloginterval is geen dienstregeling.',
        'Laat bij luchthaven- of bustickets zien of de wegtransfer inbegrepen is, waar je wordt opgewacht, hoeveel bagage is toegestaan en of het ticket bij vertraging kan worden omgeboekt. Vergelijk deur-tot-deur, niet alleen de laagste bootprijs.',
        'De Cambodjaanse grens ligt in de provincie, maar is geen vanzelfsprekende vervolgroute. NederlandWereldwijd meldt momenteel rode en oranje zones langs de grens en een gesloten landsgrens. Volg het actuele officiële advies en promoot of plan geen landdoorsteek op basis van oude reisblogs.',
      ],
      image: '/images/redesign/trat-route-banner.webp',
      imageAlt:
        'Route vanuit Trat-stad die splitst naar een Koh Chang-ferry en een boot voor Koh Kood of Koh Mak',
    },
  },
  practicalTips: [
    {
      icon: 'map',
      title: 'Bewaar vijf afzonderlijke pins',
      description:
        'Zet luchthaven, busstation, hotel, letterlijke pier en eilandhaven apart in je kaart. “Trat” alleen is geen bruikbaar vertrekpunt.',
    },
    {
      icon: 'ship',
      title: 'Controleer op de vertrekdag',
      description:
        'Lees het laatste operatorbericht voor inchecktijd, pier, bagage, weer en mogelijke routewijziging. Screenshots van oude blogs tellen niet als bevestiging.',
    },
    {
      icon: 'food',
      title: 'Bestel met ingrediënten, niet alleen met labels',
      description:
        'Vraag bij allergie of dieet expliciet naar vissaus, garnalenpasta, bouillon, schaal- en schelpdieren en gedeelde frituur.',
    },
    {
      icon: 'compass',
      title: 'Behandel de grens als aparte veiligheidsvraag',
      description:
        'Trat-stad, de eilanden en de Cambodjagrens hebben niet automatisch hetzelfde risico. Controleer NederlandWereldwijd vlak voor je route.',
    },
  ],
  faqs: [
    {
      question: 'Waar staat Trat in Thailand om bekend?',
      answer:
        'Trat is een oostelijke provincie met een kleine gelijknamige stad, fruit- en visserijcultuur, mangrovegemeenschappen en toegang tot eilanden als Koh Chang, Koh Kood en Koh Mak. Trat-stad zelf staat vooral voor de oude kanaalwijk, markten en lokale keuken. De stad, provincie, luchthaven en pieren zijn verschillende locaties; dat onderscheid is essentieel bij het plannen.',
    },
    {
      question: 'Is het de moeite waard om in Trat, Thailand te verblijven?',
      answer:
        'Ja, vooral voor één nacht tussen Bangkok of de luchthaven en de eilanden. Je krijgt een ontspannen oude wijk, markt en lokale maaltijd zonder veel vervoer. Met twee nachten kun je Ban Nam Chiao en Laem Ngop toevoegen. Verwacht geen strandbestemming: wie alleen zo snel mogelijk naar een eiland wil en een ruime bevestigde aansluiting heeft, kan rechtstreeks doorreizen.',
    },
    {
      question: 'Is Trat Thailand veilig?',
      answer:
        'Trat-stad en de gebruikelijke eilandroutes moeten niet automatisch worden gelijkgesteld aan de Cambodjaanse grensstrook. Voor die grens meldt NederlandWereldwijd momenteel rode en oranje zones en een gesloten landsgrens. Controleer vlak voor vertrek het actuele reisadvies, lokale waarschuwingen en je precieze route. Gebruik in de stad normale voorzorgsmaatregelen en volg voor bootreizen weer- en operatorinstructies.',
    },
    {
      question: 'Hoe kom je van Trat naar Koh Chang?',
      answer:
        'Je reist eerst over de weg van je letterlijke startpunt — stad, busstation, luchthaven of hotel — naar de bevestigde Koh Chang-ferrypier aan de kust, en daarna per ferry naar het eiland. Controleer pier, operator, inchecktijd, inbegrepen transfer, bagage en aankomsthaven. Tijden en routes kunnen wijzigen; gebruik de actuele bevestiging van de uitvoerende vervoerders.',
    },
    {
      question: 'Hoe kom ik van het busstation van Trat naar Koh Chang?',
      answer:
        'Zoek een actuele gedeelde of privétransfer die Trat Bus Terminal expliciet als ophaalpunt noemt en de juiste ferry of pier vermeldt. Vraag of het bootticket inbegrepen is, waar de overstap plaatsvindt en tot waar de rit op Koh Chang gaat. Bij losse tickets plan je extra marge; “naar Koh Chang” kan alleen de kustpier, de ferry of ook hotelvervoer betekenen.',
    },
    {
      question: 'Hoe kom je van Trat naar Koh Kood?',
      answer:
        'Voor Koh Kood loopt de route doorgaans via een wegtransfer naar Laem Sok en daarna met een bevestigde operator naar de juiste aankomst op Koh Kood. Dit is niet dezelfde route als de gebruikelijke Koh Chang-ferry. Controleer seizoensuitvoering, ophaalpunt, pier, boot, bagage, eilandtransfer en wijzigingsvoorwaarden rechtstreeks bij de operator.',
    },
    {
      question: 'Hoe ver ligt Trat van de Cambodjaanse grens?',
      answer:
        'Dat hangt af van het bedoelde punt: Trat-stad, de provinciegrens en de officiële grensovergangen zijn niet hetzelfde. Gebruik afstand daarom niet als reisadvies. NederlandWereldwijd meldt momenteel een rode strook direct langs de grens, een oranje buffer en een gesloten landsgrens. Plan geen landdoorsteek op basis van oude routeartikelen en controleer officiële informatie opnieuw.',
    },
  ],
  relatedGuides: [
    {
      title: 'Wat te doen in Trat',
      description:
        'Vergelijk de oude wijk, markten, Ban Nam Chiao en kuststops zonder de provincie tot transfer te reduceren.',
      href: '/city/trat/attractions/',
      image: '/images/redesign/trat-old-town.webp',
      imageAlt: 'Historische kanaalwijk in Trat',
    },
    {
      title: 'Eten in Trat',
      description:
        'Ontdek krab, seafood, marktsnacks en lokaal fruit met praktische besteltips.',
      href: '/city/trat/food/',
      image: '/images/redesign/trat-food.webp',
      imageAlt: 'Lokale gerechten en fruit uit Trat',
    },
    {
      title: 'Hotels in Trat',
      description:
        'Kies bewust tussen oude stad, luchthavenlogistiek en een overnachting dichter bij de juiste pier.',
      href: '/best-hotels/trat/',
      image: '/images/redesign/trat-destination-hero.webp',
      imageAlt: 'Avond in Trat-stad',
    },
  ],
  sources: [
    {
      title: 'Trat',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Destinations/Provinces/Trat/466',
      note: 'Officiële provincie-, stads-, markt-, fruit- en eilandcontext.',
    },
    {
      title: '10 Things to Do in Trat',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Articles/10-things-to-do-in-trat',
      note: 'Primaire bestemmingscontext voor Ban Nam Chiao, Laem Ngop, kust en lokale ervaringen.',
    },
    {
      title: 'Cultural Feast and Treats at Trat',
      creator: 'MICHELIN Guide Thailand & TAT',
      url: 'https://guide.michelin.com/th/en/article/features/gastronomy-journey-the-series-of-thailand-ep-7-cultural-feast-and-treats-at-trat',
      note: 'Redactionele context voor Rak Khlong Bang Phra, communityroutes, seafood en salacca.',
    },
    {
      title: 'June 2026 timetable update',
      creator: 'Boonsiri High Speed Ferries',
      url: 'https://boonsiriferry.com/en/news/update-timetable-jun2026-boonsiri-ferry',
      note: 'Actuele primaire operatorcontext voor Laem Sok, Koh Kood en Koh Mak; tijden worden niet als evergreen bevroren.',
    },
    {
      title: 'Thai Meteorological Department',
      creator: 'TMD',
      url: 'https://www.tmd.go.th/en',
      note: 'Officiële verwachtingen en waarschuwingen voor stad, kust en vaargebied.',
    },
    {
      title: 'Reisadvies Thailand',
      creator: 'NederlandWereldwijd',
      url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand',
      note: 'Actuele Nederlandse veiligheidscontext voor de Cambodjaanse grens; geraadpleegd op 24 juli 2026.',
    },
  ],
};
