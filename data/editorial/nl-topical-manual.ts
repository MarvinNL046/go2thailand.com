export interface NlTopicalProfile {
  title: string;
  label: string;
  copy: string;
  verify: string;
}

export interface NlTopicalStep {
  title: string;
  copy: string;
}

export interface NlTopicalFaq {
  question: string;
  answer: string;
}

export interface NlTopicalSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface NlTopicalGuideData {
  slug: string;
  pageUrl: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  heroImage: string;
  heroAlt: string;
  decisionTitle: string;
  decisionDescription: string;
  profiles: NlTopicalProfile[];
  checkTitle: string;
  checkDescription: string;
  steps: NlTopicalStep[];
  boundaryTitle: string;
  boundaryCopy: string;
  affiliate?: {
    label: string;
    href: string;
    placement: string;
    disclosure: string;
  };
  amazon?: Array<{ title: string; copy: string; slug: string }>;
  related: Array<{ title: string; description: string; href: string; image: string }>;
  faqs: NlTopicalFaq[];
  sources: NlTopicalSource[];
}

export const nlTopicalManualGuides: Record<string, NlTopicalGuideData> = {
  "best-cooking-classes-in-thailand": {
    slug: "best-cooking-classes-in-thailand",
    pageUrl: "https://go2-thailand.com/nl/best-cooking-classes-in-thailand/",
    title: "Kookcursus Thailand: kies stad, lesvorm en menu",
    metaDescription: "Kies een kookcursus in Thailand op stad, marktbezoek, hands-on tijd, menu en dieetwensen. Met boekingscheck, allergenenroute en actuele opties.",
    eyebrow: "Proeven is niet hetzelfde als leren",
    heroTitle: "Kies een kookles",
    heroAccent: "die bij je reis past.",
    heroDescription: "Vergelijk geen scholen op een oude top-10. Kies eerst stad en lesvorm; controleer daarna hoeveel je zelf kookt, welk menu geldt en hoe de aanbieder met allergenen omgaat.",
    heroImage: "/images/redesign/thailand-cooking-classes-hero-v2.webp",
    heroAlt: "Thaise kookdocent begeleidt reizigers bij het bereiden van verse gerechten",
    decisionTitle: "Vier lesvormen, vier andere verwachtingen",
    decisionDescription: "De beste keuze hangt af van wat je wilt doen, niet van hoeveel gerechten in een verkooptekst staan.",
    profiles: [
      { title: "Stadsles", label: "Compact en bereikbaar", copy: "Past bij een korte reisdag. Controleer of je zelf snijdt, stampt en bakt of vooral naar een demonstratie kijkt.", verify: "Adres, lestijd, hands-on onderdelen, groepsgrootte en vervoer" },
      { title: "Markt + keuken", label: "Ingrediënten begrijpen", copy: "Een marktbezoek voegt alleen waarde toe als de gids producten uitlegt en de tijd niet ten koste gaat van het koken.", verify: "Markt, duur, proeven, hygiëne en wat je daarna zelf bereidt" },
      { title: "Boerderijles", label: "Meer context, langere dag", copy: "Past bij reizigers die kruiden en herkomst willen zien. Reken op extra vervoer en controleer hoeveel van de locatie echt onderdeel is van de les.", verify: "Transfer, terrein, schaduw, maaltijd, terugkeer en weersalternatief" },
      { title: "Privé of dieetgericht", label: "Meer afstemming", copy: "Handig bij een eigen menu, kinderen of dieetwensen. Een vegetarisch gerecht is niet automatisch veganistisch of allergeenvrij.", verify: "Ingrediënten, kruiscontact, vervanging, taal en annuleringsvoorwaarden" },
    ],
    checkTitle: "Boek pas na deze vijf checks",
    checkDescription: "Menu's, tijden en inclusies veranderen. Laat de actuele aanbieder de concrete les bevestigen.",
    steps: [
      { title: "Kies één leerdoel", copy: "Wil je curry pasta stampen, streetfood bereiden, een markt leren lezen of vooral samen eten? Dat bepaalt de lesvorm." },
      { title: "Vraag wat je zelf doet", copy: "Controleer of iedere deelnemer een eigen werkplek heeft en welke onderdelen demonstratie of gezamenlijk zijn." },
      { title: "Leg dieetwensen schriftelijk vast", copy: "Noem allergie, intolerantie, vegetarisch of vegan afzonderlijk. Vraag naar vissaus, garnalenpasta en kruiscontact." },
      { title: "Controleer de hele tijdketen", copy: "Bekijk ophalen, markt, koken, eten en terugbrengen. Plan geen strakke aansluiting direct na de les." },
      { title: "Vergelijk de actuele voorwaarden", copy: "Controleer live prijs, menu, minimumleeftijd, annulering, transfergebied en wat bij ziekte of slecht weer gebeurt." },
    ],
    boundaryTitle: "Een platformlabel is geen kwaliteitsbewijs",
    boundaryCopy: "Een hoge positie, badge of mooie foto bewijst niet dat jij veel zelf kookt of dat een dieetwens veilig kan worden uitgevoerd. Gebruik een boekingsplatform om actuele opties te vergelijken en bevestig kritieke wensen rechtstreeks bij de aanbieder.",
    affiliate: { label: "Bekijk actuele kooklessen", href: "klook", placement: "cooking-classes-thailand-nl", disclosure: "Klook-affiliatelink: we kunnen commissie ontvangen zonder extra kosten voor jou. Controleer actuele aanbieder, menu, prijs, transfer, dieetafspraken en voorwaarden zelf." },
    amazon: [
      { title: "Thaise kookinspiratie voor thuis", copy: "Een kookboek kan recepten en technieken na je les helpen terughalen. Controleer editie, taal en actuele verkoper.", slug: "simple-thai-food-cookbook" },
      { title: "Granieten vijzel voor currypasta", copy: "Past bij het stampen van kruiden thuis, niet bij je bagage. Controleer formaat, gewicht, materiaal en onderhoud.", slug: "thai-granite-mortar-eight-inch" },
    ],
    related: [
      { title: "Eten in Thailand", description: "Herken gerechten, regionale smaken en bestelkeuzes voor je les.", href: "/food/", image: "/images/redesign/thailand-food-hub-hero.webp" },
      { title: "Vegetarisch en vegan", description: "Bereid je dieetvragen en ingrediëntencheck voor.", href: "/travel-guides/vegetarian-vegan-thailand/", image: "/images/redesign/thai-curry-home-cooking.webp" },
      { title: "Thailand paklijst", description: "Neem alleen mee wat je route en bagageregels echt vragen.", href: "/travel-gear/", image: "/images/redesign/first-time-thailand-packing.webp" },
    ],
    faqs: [
      { question: "Waar kun je het beste een kookcursus volgen in Thailand?", answer: "Bangkok past goed bij een compacte stadsles, Chiang Mai bij markt- en boerderijformats en kustplaatsen bij een les naast je strandroute. Kies op reislogistiek, hands-on tijd, menu en dieetafspraken; niet op een universele nummer één." },
      { question: "Is een marktbezoek altijd inbegrepen?", answer: "Nee. Het verschilt per programma en tijdstip. Controleer of het bezoek echt onderdeel is van jouw sessie, hoe lang het duurt en welke kooktijd daarna overblijft." },
      { question: "Kan een Thaise kookles vegetarisch of vegan?", answer: "Veel aanbieders kunnen gerechten aanpassen, maar vissaus, oestersaus, garnalenpasta en kruiscontact vragen een expliciete check. Laat de aanbieder schriftelijk bevestigen wat mogelijk is." },
      { question: "Moet je een kookcursus vooraf boeken?", answer: "Voor een specifieke lesvorm, taal, dieetwens of kleine groep is vooraf vergelijken verstandig. Controleer vlak voor betaling de actuele plek, het menu en de annuleringsvoorwaarden." },
    ],
    sources: [
      { title: "Tomyum Kung op de erfgoedlijst", creator: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/tomyum-kung-01879", note: "Primaire context over de kennis en culturele praktijk rond tomyum kung; geen ranglijst van kookscholen." },
      { title: "Voedselallergie", creator: "Voedingscentrum", url: "https://www.voedingscentrum.nl/encyclopedie/voedselallergie.aspx", note: "Nederlandse basis voor het onderscheid tussen allergie, intolerantie en praktische voorzorg." },
      { title: "Five keys to safer food", creator: "World Health Organization", url: "https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food", note: "Primaire voedselveiligheidsprincipes voor schoon werken, scheiden, verhitten en bewaren." },
    ],
  },
  "best-muay-thai-in-thailand": {
    slug: "best-muay-thai-in-thailand",
    pageUrl: "https://go2-thailand.com/nl/best-muay-thai-in-thailand/",
    title: "Muay Thai in Thailand: kijken, trainen of kamp kiezen",
    metaDescription: "Kies Muay Thai in Thailand als stadionavond, proefles of trainingskamp. Vergelijk locatie, niveau, begeleiding, herstel en actuele voorwaarden.",
    eyebrow: "Eerst je doel, dan de gym",
    heroTitle: "Muay Thai beleven.",
    heroAccent: "Zonder verkeerde match.",
    heroDescription: "Een stadionavond, eerste les en meerweeks kamp zijn drie andere reisproducten. Kies op doel, niveau, begeleiding, belasting en herstelruimte.",
    heroImage: "/images/redesign/muay-thai-beginner-hero.webp",
    heroAlt: "Beginnende Muay Thai-training met trainer en beschermende pads in Thailand",
    decisionTitle: "Kijken, proberen of echt trainen",
    decisionDescription: "Beperk je shortlist tot de vorm die bij je lichaam, planning en ervaring past.",
    profiles: [
      { title: "Stadionavond", label: "Cultuur en wedstrijd", copy: "Kies vak, zicht, aanvangsblok en veilige terugreis. Een ticket zegt niets over exacte eindtijd of duur van iedere partij.", verify: "Officiële organisator, datum, toegang, zitplaats, huisregels en vervoer" },
      { title: "Proefles", label: "Eerste techniek", copy: "Past bij beginners als de trainer niveau, gezondheid en intensiteit serieus neemt. Sparren hoort niet automatisch bij een eerste les.", verify: "Intake, trainer, groepsgrootte, materiaal, contactniveau en pauzes" },
      { title: "Losse training", label: "Voor sportieve reizigers", copy: "Plan herstel en vertel eerlijk over ervaring en blessures. Hitte en reisvermoeidheid veranderen wat verantwoord voelt.", verify: "Niveau-indeling, sessie-inhoud, hydratatie, douche en herstel" },
      { title: "Trainingskamp", label: "Ritme boven sightseeing", copy: "Meerdere sessies beïnvloeden slaap, eten en uitstapjes. Kies pas na controle van accommodatie, trainingsschema en medische dekking.", verify: "Weekritme, rustdagen, trainer, verblijf, verzekering en annulering" },
    ],
    checkTitle: "Vijf checks voor je betaalt",
    checkDescription: "Een bekend logo of gespierde socialvideo zegt weinig over begeleiding van jouw niveau.",
    steps: [
      { title: "Kies kijken of deelnemen", copy: "Zo voorkom je dat stadion-, beginner- en kampintentie in één onvergelijkbare shortlist belanden." },
      { title: "Meld gezondheid en blessures", copy: "Bespreek relevante klachten vooraf. Bij twijfel hoort professioneel medisch advies vóór intensieve training." },
      { title: "Vraag naar contactniveau", copy: "Controleer techniek, pads, conditie, clinch en sparren afzonderlijk. Je hoeft geen onderdeel te doen dat niet past." },
      { title: "Plan herstelruimte", copy: "Zet geen zware training direct na een lange reisdag en bouw slaap, eten, vocht en een rustmoment in." },
      { title: "Controleer actuele boeking", copy: "Verifieer trainer, locatie, materiaal, taal, transfer, prijs en annulering bij de live aanbieder." },
    ],
    boundaryTitle: "Een trainingsles is geen medische beoordeling",
    boundaryCopy: "De trainer kan techniek en intensiteit aanpassen, maar stelt niet vast of trainen medisch verantwoord is. Stop bij alarmsignalen en zoek passende professionele hulp. Een reisverzekering dekt risicosporten niet automatisch.",
    affiliate: { label: "Bekijk actuele Muay Thai-activiteiten", href: "klook", placement: "muay-thai-thailand-nl", disclosure: "Klook-affiliatelink: we kunnen commissie ontvangen zonder extra kosten voor jou. Controleer actuele gym of organisator, niveau, contact, materiaal, prijs, verzekering en voorwaarden zelf." },
    related: [
      { title: "Muay Thai voor beginners", description: "Verdiep de eerste les, trainingsweek, paklijst en herstelkeuze.", href: "/blog/muay-thai-training-camps-thailand-beginners-guide-2026/", image: "/images/redesign/muay-thai-first-lesson.webp" },
      { title: "Thailand reisverzekering", description: "Controleer dekking, uitsluitingen en risicosport vóór deelname.", href: "/travel-insurance/", image: "/images/redesign/thailand-safety-hero.webp" },
      { title: "Wat te doen in Thailand", description: "Vergelijk Muay Thai met andere activiteiten binnen je route.", href: "/things-to-do-in-thailand/", image: "/images/redesign/thailand-travel-guide-hero-v2.webp" },
    ],
    faqs: [
      { question: "Kun je als beginner Muay Thai trainen in Thailand?", answer: "Ja, veel gyms bieden beginnerslessen. Vraag vooraf naar intake, groepsgrootte, taal, contactniveau en materiaal. Een eerste les hoeft geen sparren te bevatten." },
      { question: "Waar kun je Muay Thai kijken in Thailand?", answer: "Bangkok heeft bekende stadions; ook andere toeristische plaatsen hebben wedstrijdaanbod. Controleer altijd de officiële kalender, organisator, locatie en toegangsvoorwaarden voor jouw datum." },
      { question: "Hoe kies je een Muay Thai-gym?", answer: "Kies op passend niveau, duidelijke intake, trainer-aandacht, hygiëne, contactbeleid, herstelruimte en transparante voorwaarden. Een socialmedia-aantal of oude ranking is geen kwaliteitsbewijs." },
      { question: "Dekt een reisverzekering Muay Thai?", answer: "Dat verschilt per polis en trainingsvorm. Controleer risicosport, wedstrijd, sparren, professioneel trainen en medische kosten expliciet bij je verzekeraar." },
    ],
    sources: [
      { title: "Rajadamnern Stadium", creator: "Rajadamnern World Series", url: "https://rajadamnern.com/", note: "Officieel kanaal voor actuele wedstrijden en toegang in Rajadamnern; controleer je datum live." },
      { title: "Lumpinee Boxing Stadium", creator: "Lumpinee Boxing Stadium", url: "https://www.lumpineemuaythai.com/", note: "Officieel locatiekanaal voor actuele programmering en bezoekersinformatie." },
      { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actuele overheidscontext voor veiligheid en hulp; geen oordeel over individuele gyms." },
    ],
  },
  "best-elephant-sanctuaries-in-thailand": {
    slug: "best-elephant-sanctuaries-in-thailand",
    pageUrl: "https://go2-thailand.com/nl/best-elephant-sanctuaries-in-thailand/",
    title: "Olifantenopvang Thailand: kies op dierenwelzijn",
    metaDescription: "Beoordeel een olifantenopvang in Thailand op observatie, afstand, gedrag en transparantie. Herken rode vlaggen en controleer een tour vóór boeken.",
    eyebrow: "Een naam met sanctuary bewijst niets",
    heroTitle: "Kijk naar gedrag.",
    heroAccent: "Niet naar badges.",
    heroDescription: "Beoordeel wat olifanten moeten doen, hoeveel keuze en afstand ze hebben en hoe de organisatie haar dieren, programma en inkomsten uitlegt.",
    heroImage: "/images/redesign/experience-elephants.webp",
    heroAlt: "Olifanten bewegen vrij in een groene Thaise omgeving terwijl bezoekers afstand houden",
    decisionTitle: "Van observatie tot rode vlag",
    decisionDescription: "Geen enkele checklist bewijst welzijn volledig, maar het programma laat wel zien welke vragen je moet stellen.",
    profiles: [
      { title: "Observatie op afstand", label: "Sterkste uitgangspunt", copy: "De dieren bepalen tempo en afstand. Bezoekers kijken, leren en verstoren zo weinig mogelijk.", verify: "Ruimte, keuzevrijheid, groepsgrootte, gidsuitleg en terugtrekmogelijkheid" },
      { title: "Begeleid voeren", label: "Alleen met grens", copy: "Vraag waarom, hoe vaak en onder welke begeleiding wordt gevoerd. Een fotomoment mag gedrag en dieet niet sturen.", verify: "Voedsel, frequentie, barrière, verzorger en stopmogelijkheid" },
      { title: "Wandelen in leefgebied", label: "Dier bepaalt route", copy: "Past alleen wanneer bezoekers volgen en afstand houden, zonder het dier te sturen voor beeld of aanraking.", verify: "Pad, groepsafstand, tempo, weersalternatief en dierkeuze" },
      { title: "Rijden, shows of gedwongen baden", label: "Niet boeken", copy: "Vermijd programma's waarin olifanten rijden, kunstjes doen, poseren of herhaald met groepen moeten baden.", verify: "Activiteitenlijst, recente beelden, groepsprogramma en direct antwoord van aanbieder" },
    ],
    checkTitle: "Vijf vragen voor een welzijnscheck",
    checkDescription: "Affiliateplatforms en reviews zijn hulpmiddelen, geen onafhankelijke welzijnsaudit.",
    steps: [
      { title: "Lees het hele programma", copy: "Zoek niet alleen naar no riding. Controleer ook baden, aanraken, poseren, kettingen, shows en dagelijkse groepswissels." },
      { title: "Vraag wat het dier mag weigeren", copy: "Een geloofwaardig antwoord beschrijft afstand, rust, terugtrekken en aanpassing wanneer een olifant niet wil deelnemen." },
      { title: "Controleer groepsgrootte en tijd", copy: "Veel bezoekers rond één dier verhogen druk. Vraag hoeveel mensen tegelijk aanwezig zijn en hoe observatie wordt begeleid." },
      { title: "Bekijk transparantie", copy: "Zoek informatie over herkomst, verzorging, dierenarts, leefgebied, inkomsten en langdurige verantwoordelijkheid." },
      { title: "Hercontroleer vlak voor boeken", copy: "Programma's veranderen. Vraag de actuele activiteiten schriftelijk en annuleer als de praktijk niet overeenkomt." },
    ],
    boundaryTitle: "Wij certificeren geen opvangcentra",
    boundaryCopy: "Deze pagina geeft een keuze- en vragenkader. Een vermelding of affiliateknop is geen keurmerk en geen garantie dat de praktijk op jouw bezoekdag voldoet. Loop weg bij rijden, shows, dwang, zichtbare mishandeling of druk om contact te maken.",
    affiliate: { label: "Vergelijk actuele olifantenactiviteiten", href: "klook", placement: "elephant-welfare-thailand-nl", disclosure: "Klook-affiliatelink: we kunnen commissie ontvangen zonder extra kosten voor jou. Een listing is geen welzijnsbewijs. Controleer het actuele programma rechtstreeks en boek niet bij rijden, shows of gedwongen contact." },
    related: [
      { title: "Chiang Mai-opvang kiezen", description: "Pas dezelfde welzijnscheck toe op programma's rond Chiang Mai.", href: "/chiang-mai-elephant-sanctuary/", image: "/images/redesign/destination-chiang-mai.webp" },
      { title: "Dierenrisico's in Thailand", description: "Houd afstand en ken de handelingsroute na contact of letsel.", href: "/travel-guides/dangerous-animals-thailand/", image: "/images/redesign/thailand-animal-risk-hero-v2.webp" },
      { title: "Thailand met kinderen", description: "Maak de hele activiteitendag passend bij leeftijd en belastbaarheid.", href: "/travel-guides/thailand-with-kids/", image: "/images/redesign/thailand-family-travel-hero-v2.webp" },
    ],
    faqs: [
      { question: "Hoe herken je een ethische olifantenopvang in Thailand?", answer: "Begin bij observatie, afstand, keuzevrijheid en transparantie. Vermijd rijden, shows, poseren en gedwongen baden. Vraag wat een dier mag weigeren en hoe rust en medische zorg zijn georganiseerd." },
      { question: "Is olifanten voeren altijd verantwoord?", answer: "Niet automatisch. Vraag naar doel, voedsel, frequentie, begeleiding en keuzevrijheid. Voeren dat vooral een fotomoment of continue bezoekersstroom bedient, verdient extra kritiek." },
      { question: "Kun je vertrouwen op het woord sanctuary?", answer: "Nee. Het woord is geen onafhankelijk keurmerk. Beoordeel het concrete programma, recente praktijken, transparantie en antwoorden van de organisatie." },
      { question: "Mag je olifanten baden in een opvangcentrum?", answer: "World Animal Protection adviseert ervaringen waarbij bezoekers kijken in plaats van direct wassen of aanraken. Herhaalde badsessies kunnen voor bezoekers worden gestuurd. Kies observatie boven deelname." },
    ],
    sources: [
      { title: "Elephant-friendly tourist guide", creator: "World Animal Protection", url: "https://www.worldanimalprotection.org/latest/blogs/elephant-friendly-tourist-guide/", note: "Onafhankelijke welzijnscriteria rond kijken, afstand en het vermijden van rijden en direct contact." },
      { title: "Asian elephant", creator: "IUCN Red List", url: "https://www.iucnredlist.org/species/7140/45818198", note: "Soort- en bedreigingscontext; geen beoordeling van individuele toeristische locaties." },
      { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actuele algemene reis- en hulpcontext naast de afzonderlijke dierenwelzijnscheck." },
    ],
  },
  "grand-palace-tickets": {
    slug: "grand-palace-tickets",
    pageUrl: "https://go2-thailand.com/nl/grand-palace-tickets/",
    title: "Grand Palace Bangkok tickets: officieel of met gids",
    metaDescription: "Plan Grand Palace Bangkok: vergelijk officieel ticket en rondleiding, controleer dresscode, actuele toegang, scam-signalen en je tempelroute.",
    eyebrow: "Officiële toegang eerst",
    heroTitle: "Grand Palace bezoeken.",
    heroAccent: "Zonder ticketruis.",
    heroDescription: "Kies tussen zelfstandig bezoek en rondleiding. Controleer actuele toegang en kledingregels op het officiële kanaal; laat je niet omleiden door iemand die buiten beweert dat het paleis dicht is.",
    heroImage: "/images/blog/grand-palace-bangkok-complete-guide-2026.webp",
    heroAlt: "Daken en gouden details van het Grand Palace-complex in Bangkok",
    decisionTitle: "Drie manieren om je bezoek te plannen",
    decisionDescription: "De beste optie hangt af van hoeveel context, begeleiding en logistieke zekerheid je nodig hebt.",
    profiles: [
      { title: "Officieel ticket", label: "Zelfstandig bezoek", copy: "Past als je eigen tempo en voorbereiding prettig vindt. Controleer live toegang, inbegrepen zones en kledingregels bij het paleis.", verify: "Officiële website, datum, loket of verkoopkanaal, toegang en voorwaarden" },
      { title: "Rondleiding", label: "Context bij details", copy: "Een gids kan symboliek en geschiedenis verbinden. Controleer taal, groepsgrootte, ontmoetingspunt en wat het ticket omvat.", verify: "Gids, taal, ticket, route, duur, headset en annulering" },
      { title: "Tempelcombinatie", label: "Meer op één dag", copy: "Combineer alleen als lopen, hitte, kleding en vervoer passen. Meer stops betekenen niet automatisch meer begrip.", verify: "Volgorde, toegang per locatie, rust, transfer en eindpunt" },
      { title: "Aanbod op straat", label: "Niet op druk beslissen", copy: "Controleer zelf de officiële status. Stap niet in een tuk-tuk of winkelroute omdat iemand zegt dat de ingang gesloten is.", verify: "Officiële melding, herkenbare ingang en eigen route" },
    ],
    checkTitle: "Vijf checks voor de paleispoort",
    checkDescription: "Opening, ceremonies en toegangsregels kunnen veranderen; actuele officiële informatie gaat voor.",
    steps: [
      { title: "Open de officiële bezoekinformatie", copy: "Controleer datum, toegang, kleding en eventuele bijzondere sluiting of ceremonie vlak voor vertrek." },
      { title: "Kies zelfstandig of met gids", copy: "Betaal alleen extra wanneer uitleg, taal, groep en logistiek aantoonbaar waarde toevoegen." },
      { title: "Draag passende kleding", copy: "Bedek schouders en knieën en controleer de actuele regels. Neem geen oude blog als definitieve dresscode." },
      { title: "Bouw hitte en lopen in", copy: "Neem water volgens lokale regels, plan rust en combineer niet te veel tempels op het heetste deel van de dag." },
      { title: "Negeer gesloten-vandaag-verhalen", copy: "Controleer de officiële status zelf en laat je route niet door een toevallige verkoper buiten de ingang bepalen." },
    ],
    boundaryTitle: "Skip-the-line is geen universele belofte",
    boundaryCopy: "Een rondleiding kan ticketlogistiek en context bundelen, maar veiligheidscontrole, drukte en lokale toegang blijven gelden. Controleer precies wat de aanbieder bedoelt en wat wel of niet inbegrepen is.",
    affiliate: { label: "Bekijk actuele Grand Palace-tours", href: "klook", placement: "grand-palace-bangkok-nl", disclosure: "Klook-affiliatelink: we kunnen commissie ontvangen zonder extra kosten voor jou. Controleer actuele aanbieder, ticketinclusie, taal, ontmoetingspunt, kledingregels en annulering zelf." },
    related: [
      { title: "Bangkok bezienswaardigheden", description: "Plaats het paleis naast tempels, wijken en andere dagkeuzes.", href: "/city/bangkok/attractions/", image: "/images/redesign/bangkok-destination-hero.webp" },
      { title: "Thaise etiquette", description: "Bereid kleding, tempelgedrag en respectvolle omgang voor.", href: "/practical-info/etiquette-culture/", image: "/images/redesign/thailand-history-culture-hero-v2.webp" },
      { title: "Bangkok reisgids", description: "Plan buurten, vervoer en dagritme rond je bezoek.", href: "/city/bangkok/", image: "/images/redesign/bangkok-destination-hero.webp" },
    ],
    faqs: [
      { question: "Waar koop je officiële Grand Palace-tickets?", answer: "Begin op de officiële website van The Grand Palace en volg alleen het daar genoemde verkoopproces. Controleer live informatie voor jouw bezoekdatum; prijzen en toegang kunnen veranderen." },
      { question: "Heb je een gids nodig voor het Grand Palace?", answer: "Nee. Zelfstandig bezoeken kan prima met voorbereiding. Een gids is vooral nuttig als je historische en religieuze context, een bepaalde taal of gebundelde logistiek wilt." },
      { question: "Wat moet je dragen in het Grand Palace?", answer: "Bedek schouders en knieën en draag nette kleding. Controleer de actuele officiële dresscode vlak voor vertrek, omdat samenvattingen van derden verouderd kunnen zijn." },
      { question: "Wat doe je als iemand zegt dat het Grand Palace gesloten is?", answer: "Controleer de officiële website en de herkenbare ingang zelf. Ga niet mee in een alternatieve winkel- of tuk-tukroute die ter plekke onder tijdsdruk wordt aangeboden." },
    ],
    sources: [
      { title: "The Grand Palace", creator: "Bureau of the Royal Household", url: "https://www.royalgrandpalace.th/en/home", note: "Primaire bron voor actuele bezoekinformatie, toegang en regels." },
      { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actuele veiligheids- en hulpcontext voor reizigers in Thailand." },
      { title: "Bangkok", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219", note: "Officiële bestemmingscontext; controleer paleistoegang altijd bij het paleis zelf." },
    ],
  },
  "chiang-mai-elephant-sanctuary": {
    slug: "chiang-mai-elephant-sanctuary",
    pageUrl: "https://go2-thailand.com/nl/chiang-mai-elephant-sanctuary/",
    title: "Olifantenopvang Chiang Mai: ethische keuzecheck",
    metaDescription: "Kies een olifantenopvang bij Chiang Mai op observatie, afstand, programma en transparantie. Herken rode vlaggen en controleer transport en voorwaarden.",
    eyebrow: "Chiang Mai heeft aanbod, geen automatische winnaar",
    heroTitle: "Kies een opvang.",
    heroAccent: "Niet een fotomoment.",
    heroDescription: "Vergelijk programma's op wat olifanten moeten doen, hoeveel keuze ze hebben en hoe bezoekers afstand houden. Controleer daarna pas transfer, duur en boeking.",
    heroImage: "/images/redesign/destination-chiang-mai.webp",
    heroAlt: "Groene bergomgeving bij Chiang Mai als context voor een rustige dierenwelzijnsdag",
    decisionTitle: "Welke bezoekvorm past bij welzijn én route?",
    decisionDescription: "De naam van een organisatie is minder belangrijk dan haar actuele programma en dagelijkse praktijk.",
    profiles: [
      { title: "Observatieprogramma", label: "Minste bezoekerssturing", copy: "Je kijkt hoe olifanten bewegen, eten en sociaal gedrag tonen, met afstand en uitleg van een gids.", verify: "Afstand, groepsgrootte, observatieplek, rust en terugtrekken" },
      { title: "Halve dag", label: "Minder tijd, zelfde welzijnsgrens", copy: "Past bij een korte route, maar transport kan een groot deel innemen. Een compact programma mag geen serie contactmomenten afdwingen.", verify: "Ophaalzone, reistijdvenster, activiteiten, eten en terugkeer" },
      { title: "Volle dag", label: "Meer observatie mogelijk", copy: "Meer tijd is alleen beter wanneer die naar rustig kijken en context gaat, niet naar extra baden, poseren of groepswissels.", verify: "Dagritme, rustblokken, wandeling, groepsgrootte en plan B" },
      { title: "Vrijwilligers- of verblijfsvorm", label: "Onderzoek verantwoordelijkheid", copy: "Vraag welke taken echte zorg ondersteunen, welke expertise nodig is en waar je betaling terechtkomt.", verify: "Werkzaamheden, begeleiding, accommodatie, veiligheid, dierenarts en financiën" },
    ],
    checkTitle: "Van Chiang Mai-hotel tot leefgebied",
    checkDescription: "Een welzijnsdag is ook een vervoers- en belastbaarheidskeuze. Controleer de hele keten.",
    steps: [
      { title: "Screen eerst op rode vlaggen", copy: "Sluit rijden, shows, poseren, gedwongen baden en structureel direct contact uit vóór je aanbieders vergelijkt." },
      { title: "Vraag naar actuele activiteiten", copy: "Gebruik een antwoord van de organisatie zelf; een oude review of platformtekst kan achterlopen." },
      { title: "Controleer afstand en groepsdruk", copy: "Vraag hoeveel bezoekers tegelijk bij hoeveel dieren zijn en hoe een olifant zich kan terugtrekken." },
      { title: "Plan de transfer realistisch", copy: "Controleer ophaalzone en terugkeervenster. Zet geen vlucht, bus of belangrijk diner direct na de activiteit." },
      { title: "Bevestig kleding en toegankelijkheid", copy: "Paden kunnen ongelijk of modderig zijn. Vraag naar lopen, schaduw, toilet, eten, leeftijdsgrens en weersalternatief." },
    ],
    boundaryTitle: "Geen individuele organisatie krijgt hier een keurmerk",
    boundaryCopy: "Praktijken kunnen veranderen en marketing is geen onafhankelijke audit. Gebruik de vragen op deze pagina, lees het actuele programma en stop wanneer de werkelijkheid niet overeenkomt met wat is beloofd.",
    affiliate: { label: "Vergelijk actuele Chiang Mai-opties", href: "klook", placement: "chiang-mai-elephant-welfare-nl", disclosure: "Klook-affiliatelink: we kunnen commissie ontvangen zonder extra kosten voor jou. Een listing is geen welzijnskeurmerk. Controleer programma, afstand, transfer, prijs en voorwaarden rechtstreeks." },
    related: [
      { title: "Landelijke welzijnscheck", description: "Vergelijk de algemene olifantenwelzijnscriteria voor Thailand.", href: "/best-elephant-sanctuaries-in-thailand/", image: "/images/redesign/experience-elephants.webp" },
      { title: "Chiang Mai bezienswaardigheden", description: "Bouw een haalbare dag rond stad, berg en activiteit.", href: "/city/chiang-mai/attractions/", image: "/images/cities/chiang-mai/redesign/chiang-mai-destination-hero.webp" },
      { title: "Waar verblijven in Chiang Mai", description: "Kies een uitvalsbasis die bij je ophaalzone en verdere route past.", href: "/best-hotels/chiang-mai/", image: "/images/redesign/best-hotels-chiang-mai-en-hero.webp" },
    ],
    faqs: [
      { question: "Wat is een ethische olifantenopvang in Chiang Mai?", answer: "Een sterke bezoekvorm draait om observatie, afstand, keuzevrijheid en transparantie. Vermijd rijden, shows, poseren en gedwongen baden. Het woord sanctuary alleen is geen bewijs." },
      { question: "Is een halve of hele dag beter?", answer: "Dat hangt af van transport en programma. Een volle dag is niet automatisch beter; extra tijd moet naar rustige observatie en uitleg gaan, niet naar meer direct contact." },
      { question: "Zijn transfers inbegrepen?", answer: "Dat verschilt per aanbieder, hotelzone en programma. Controleer ophaalpunt, tijdvenster, terugkeer en eventuele toeslag vóór betaling." },
      { question: "Kunnen kinderen mee naar een olifantenopvang?", answer: "Leeftijdsgrenzen en fysieke eisen verschillen. Vraag naar lopen, hitte, modder, vervoer, toezicht, afstand en toiletvoorzieningen en kies een programma dat het dier niet voor contact inzet." },
    ],
    sources: [
      { title: "Elephant-friendly tourist guide", creator: "World Animal Protection", url: "https://www.worldanimalprotection.org/latest/blogs/elephant-friendly-tourist-guide/", note: "Onafhankelijke criteria voor observatie en het vermijden van rijden en direct contact." },
      { title: "Elephant Nature Park", creator: "Save Elephant Foundation", url: "https://www.elephantnaturepark.org/", note: "Primaire informatie van één organisatie over haar actuele programma; geen onafhankelijke vergelijking." },
      { title: "Chiang Mai", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101", note: "Officiële bestemmingscontext voor Chiang Mai; geen welzijnscertificering van aanbieders." },
    ],
  },
};
