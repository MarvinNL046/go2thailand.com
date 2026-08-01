import type { DestinationGuideData } from '../types';

export const nakhonRatchasimaDestinationGuide: DestinationGuideData = {
  citySlug: 'nakhon-ratchasima',
  cityName: 'Korat',
  locale: 'nl',
  pageTitle: 'Korat (Nakhon Ratchasima): route & tips (2026)',
  pageDescription:
    'Plan Korat met Ya Mo, Wat Sala Loi, Phimai en Khao Yai. Inclusief 3-daagse route, vervoer, beste reistijd, lokaal eten en eerlijke gebiedskeuzes.',
  pageUrl: 'https://go2-thailand.com/nl/city/nakhon-ratchasima/',
  dateModified: '2026-07-24',
  coordinates: { latitude: 14.9799, longitude: 102.0978 },
  touristType: ['Cultuurreizigers', 'Erfgoedliefhebbers', 'Slow travel', 'Roadtrippers'],
  stayGuideHref: '/best-hotels/nakhon-ratchasima/',
  hero: {
    image: '/images/redesign/korat-hero.webp',
    imageAlt: 'Chum Phon Gate en de stadskern van Korat in warm ochtendlicht',
    eyebrow: 'Ya Mo, Khmer-erfgoed en het Khoratplateau',
    title: 'Korat',
    accent: 'stad eerst, provincie daarna',
    subtitle: 'Nakhon Ratchasima is een provincie, geen compacte checklist.',
    description:
      'Korat is de korte naam voor Nakhon Ratchasima, zowel de stad als de uitgestrekte provincie eromheen. Begin rond Ya Mo en de oude poort, voeg daarna één duidelijke corridor toe: Phimai voor Khmer-erfgoed, Pak Chong en Khao Yai voor natuur, of het UNESCO-geopark voor fossielen en landschap. Met drie nachten maak je een echte reis van Korat in plaats van een gehaaste verzameling dagtrips.',
    imageClassName: 'object-cover object-[70%_center] lg:object-center',
    stats: [
      { label: 'Sterke eerste reis', value: '2–3 nachten', icon: 'calendar' },
      { label: 'Beste erfgoeddag', value: 'Phimai', icon: 'compass' },
      { label: 'Aankomst', value: 'Trein of bus', icon: 'car' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst de naam, dan de kaart',
    title: 'Korat is de moeite waard wanneer je de stad niet verwart met de hele provincie',
    paragraphs: [
      'Korat en Nakhon Ratchasima worden door elkaar gebruikt. Dat geldt voor de stad én voor de provincie, een gebied met 32 districten volgens de Tourism Authority of Thailand. In de stad vormt het Thao Suranaree Monument, lokaal Ya Mo genoemd, samen met Chum Phon Gate een logisch oriëntatiepunt. Wat Sala Loi, een avondmarkt en pad mee Korat geven daarna genoeg inhoud voor een volwaardige stadsdag. Wie direct na aankomst doorrijdt, ziet vooral het verkeersknooppunt en mist de lokale identiteit waar de naam Khorat voor staat.',
      'Buiten de stad lopen de sterke routes uiteen. Phimai ligt volgens TAT ongeveer 60 kilometer van het centrum en verdient een eigen erfgoeddag met het historische park en museum. Het Pak Chong-gebied en de ingangen van Khao Yai liggen westelijk en werken beter als aparte natuur- of resortbasis dan als achteloze stadsattractie. Het Khorat UNESCO Global Geopark beslaat 3.167 km²; de fossielen, cuesta-ruggen en versteend-houtlocaties vormen geen enkel compact parkhek dat je in een uur afvinkt.',
      'Twee nachten werken voor een stadsdag plus Phimai. Drie nachten geven ruimte voor aankomst, stad, één volle provincie-uitstap en een vertrek zonder haast. Voeg een vierde nacht of tweede basis toe wanneer Khao Yai de hoofdreden is. Een stadsdag, Phimai én een serieuze parkdag in twee nachten klinkt efficiënt, maar maakt Korat vooral tot een reeks lange transfers.',
    ],
    verdicts: [
      {
        label: 'Is Korat de moeite waard?',
        value: 'Ja, met één corridor',
        description: 'De stad krijgt samenhang rond Ya Mo; Phimai of Khao Yai geeft daarna het gewenste contrast.',
        icon: 'sparkles',
      },
      {
        label: 'Hoeveel nachten?',
        value: '2–3 als basis',
        description: 'Twee voor stad plus Phimai; drie voor rust, marktavond en een logisch vertrek.',
        icon: 'calendar',
      },
      {
        label: 'Khao Yai vanuit Korat?',
        value: 'Kan, maar kies bewust',
        description: 'Pak Chong en de parkingangen vormen een eigen logistieke zone; een tweede basis is vaak sterker.',
        icon: 'map',
      },
      {
        label: 'Auto nodig?',
        value: 'Buiten de stad meestal',
        description: 'Trein en bus lossen de aankomst op. Voor Phimai, geopark of parkroute heb je een tweede plan nodig.',
        icon: 'car',
      },
    ],
  },
  zones: [
    {
      slug: 'ya-mo-stadskern',
      name: 'Ya Mo & de oude stadskern',
      kicker: 'Monument, poort en publiek geheugen',
      image: '/images/redesign/korat-ya-mo.webp',
      imageAlt: 'Bloemoffers en bezoekers bij het Thao Suranaree Monument in Korat',
      summary:
        'Begin bij het Thao Suranaree Monument, beter bekend als Ya Mo, maar behandel het niet als een los standbeeld. De offers, lokale bezoekers en nabijgelegen Chum Phon Gate laten zien hoe geschiedenis, geloof en stadsidentiteit hier samenkomen. Loop een compact blok rond het monument en de oude poort, zoek daarna één tempel of museumstop die aantoonbaar open is en bewaar de markt voor de avond. Respecteer mensen die komen bidden: houd afstand, blokkeer geen offerplek en fotografeer geen gezicht zonder toestemming.',
      bestFor: 'Eerste middag, reizigers zonder auto, lokale geschiedenis, korte stadswandeling en een marktavond.',
      tradeoff:
        'Het verkeersrijke moderne Korat ligt rondom deze kern. Verwacht geen volledig bewaarde ommuurde oude stad en bouw je wandeling in korte, koele blokken.',
    },
    {
      slug: 'wat-sala-loi',
      name: 'Wat Sala Loi & de stadsrand',
      kicker: 'Moderne tempelarchitectuur',
      image: '/images/redesign/korat-wat-sala-loi.webp',
      imageAlt: 'De kenmerkende bootvormige architectuur van Wat Sala Loi in Nakhon Ratchasima',
      summary:
        'Wat Sala Loi hoort inhoudelijk bij het Ya Mo-verhaal, maar ligt niet in dezelfde compacte wandeling. De moderne hoofdhal is geïnspireerd op een zeilende sampan en contrasteert met de oude poort en traditionele binnenstadstempels. Ga vroeg of laat voor rust en zachter licht, bedek schouders en knieën en controleer of een ceremonie delen van het complex tijdelijk minder toegankelijk maakt. Combineer deze stop met een gerichte stadsrandrit, niet met een willekeurige mallronde die je meerdere keren door hetzelfde verkeer stuurt.',
      bestFor: 'Architectuur, religieuze context en reizigers die een halve stadsdag met één duidelijke rit willen verlengen.',
      tradeoff:
        'De tempel maakt Phimai of Khao Yai niet “onderweg”. Gebruik een taxi of ride-hailingdienst en houd de verre corridors apart.',
    },
    {
      slug: 'phimai-corridor',
      name: 'Phimai & Khmer-erfgoed',
      kicker: 'De sterkste historische dag',
      image: '/images/redesign/korat-phimai.webp',
      imageAlt: 'De centrale zandstenen toegang tot Phimai Historical Park bij zacht ochtendlicht',
      summary:
        'Phimai Historical Park is de duidelijkste erfgoeduitstap vanuit Korat. De ommuurde Khmer-site vormde ongeveer duizend jaar geleden een belangrijk regionaal centrum. Trek tijd uit voor de hoofdassen, reliëfs en ruimtelijke opbouw, en voeg Phimai National Museum toe wanneer de actuele opening past. Begin bij officiële informatie van Fine Arts Department of TAT; oude entreeprijzen en openingstijden verouderen sneller dan de stenen. De Sai Ngam-banyanboom kan een rustige extra stop zijn, maar mag park en museum niet uit de dag drukken.',
      bestFor: 'Khmer-architectuur, archeologie, museumcontext en één inhoudelijke dag buiten Korat-stad.',
      tradeoff:
        'Phimai ligt in een andere richting dan Pak Chong en Khao Yai. Beide combineren op één dag levert rijtijd op, geen sterke route.',
    },
    {
      slug: 'pak-chong-khao-yai',
      name: 'Pak Chong & de Khao Yai-kant',
      kicker: 'Een tweede basis, geen stadswijk',
      image: '/images/redesign/korat-khao-yai.webp',
      imageAlt: 'Groene bergrug, bosweg en waterval in de Khao Yai-corridor van Nakhon Ratchasima',
      summary:
        'Khao Yai ligt deels in de provincie Nakhon Ratchasima, maar dat maakt het nog geen attractie om de hoek van Korat-stad. Pak Chong is het rail- en wegknooppunt voor deze westelijke corridor; parktoegang, accommodatie en vervoer liggen daarna nog verspreid. Wil je een volle parkdag, gidswandeling of vroeg wildkijkmoment, slaap dan aan de Khao Yai-kant. Vanuit Korat-stad kan een dagtrip alleen met een realistische chauffeur- of autoroute, actuele parkopening en ruime terugmarge.',
      bestFor: 'Natuurreizigers, een afzonderlijk resortblok en routes die daarna richting Bangkok teruggaan.',
      tradeoff:
        'Een verblijf bij Khao Yai is minder praktisch voor Ya Mo en Phimai. Kies de basis op reisdoel, niet omdat beide namen op dezelfde provinciekaart staan.',
    },
  ],
  highlights: [
    {
      eyebrow: 'Stadsgeschiedenis leeft nog',
      title: 'Lees Ya Mo als publiek geheugen, niet als fotodecor',
      image: '/images/redesign/korat-ya-mo.webp',
      imageAlt: 'Lokale bezoekers en bloemoffers rond het Ya Mo-monument in Korat',
      description:
        'Het Thao Suranaree Monument is tegelijk stadsanker, herinneringsplek en dagelijks heiligdom. Begin met kijken hoe inwoners de ruimte gebruiken en loop daarna door naar Chum Phon Gate. Zo wordt de stop een verhaal over Korat in plaats van één foto van een bronzen figuur. Historische heldenverhalen kunnen in populaire bronnen eenvoudiger klinken dan de academische werkelijkheid; presenteer lokale verering daarom met respect en zonder elke legende als bewezen feit te verkopen.',
      decision: 'Kies een rustige stadswandeling en geef offers en gebed voorrang boven je camerahoek.',
      href: '/city/nakhon-ratchasima/attractions/',
    },
    {
      eyebrow: 'Een complete erfgoeddag',
      title: 'Combineer Phimai-park met museumcontext',
      image: '/images/redesign/korat-phimai.webp',
      imageAlt: 'Khmer-heiligdom en stenen toegangsas in Phimai Historical Park',
      description:
        'De centrale as en heiligdommen van Phimai zijn indrukwekkend, maar het museum maakt stijl, inscripties en regionale macht beter leesbaar. Controleer dezelfde ochtend de officiële opening en kies vooraf hoeveel tijd je op de archeologische site wilt lopen. Hitte vraagt om een vroege start, water en schaduwstop; regen maakt gladde steen en ongelijk terrein minder vergevingsgezind. Laat een chauffeur niet wachten met een onrealistische terugtijd wanneer je beide plekken serieus wilt zien.',
      decision: 'Plan park en museum als hoofdblok; voeg alleen een kleine Phimai-stop toe als er werkelijk tijd overblijft.',
      href: '/city/nakhon-ratchasima/attractions/',
    },
    {
      eyebrow: 'Cuesta en fossielenland',
      title: 'Gebruik het UNESCO-geopark als route, niet als pin',
      image: '/images/redesign/korat-geopark.webp',
      imageAlt: 'Versteend hout, droog bos en cuesta-landschap in het Khorat UNESCO Global Geopark',
      description:
        'UNESCO beschrijft een geopark van 3.167 km² met fossielen van circa 16 miljoen tot 10.000 jaar oud, versteend hout en meerdere cuesta-ruggen. Dat is inhoudelijk bijzonder, maar toeristisch verspreid. Kies vooraf één museum, fossiel- of landschapslocatie, controleer beheer en opening en regel vervoer dat de exacte plek kent. Een algemeen kaartlabel “geopark” is geen garantie op een bezoekerscentrum, wandelpad en fossiel in dezelfde parkeerplaats.',
      decision: 'Alleen toevoegen bij echte geologische interesse en een bevestigde dagroute; anders is Phimai de helderdere eerste keuze.',
      href: '/city/nakhon-ratchasima/attractions/',
    },
  ],
  featureBanner: {
    image: '/images/redesign/korat-route-banner.webp',
    imageAlt: 'Weg over het Khoratplateau tussen velden en lage cuesta-ruggen in warm avondlicht',
    eyebrow: 'Eén stadsbasis, één duidelijke richting',
    title: 'Kies na Korat niet alles, maar het juiste vervolg',
    description:
      'Gebruik de stad voor Ya Mo, Wat Sala Loi en pad mee Korat. Kies daarna Phimai voor erfgoed, Pak Chong en Khao Yai voor natuur of een geoparkroute voor geologie. De drie corridors samen zijn geen driedaagse checklist. De beeldlijn is geen kaart op schaal; controleer route, opening en terugtijd vlak voor vertrek.',
  },
  food: {
    image: '/images/redesign/korat-pad-mee.webp',
    imageAlt: 'Verse pad mee Korat uit de wok met gegrilde kip en som-tamingrediënten op een avondmarkt',
    eyebrow: 'Korat heeft een eigen noedelidentiteit',
    title: 'Pad mee Korat is niet simpelweg Pad Thai',
    description:
      'Pad mee Korat gebruikt doorgaans lokale rijstnoedels en een hartig-zoete saus met een eigen regionale balans. Proef het bij een drukke kraam of eenvoudige zaak waar de wok per bestelling werkt. Voeg daarna één Isan-combinatie toe, bijvoorbeeld som tam met kleefrijst en gegrilde kip. Vraag bij allergieën expliciet naar vissaus, gedroogde garnaal, pinda, ei, soja en gedeelde wok of vijzel; “niet pittig” zegt niets over verborgen ingrediënten.',
    dishes: [
      {
        name: 'Pad mee Korat',
        description:
          'Gebakken rijstnoedels met een donkere, licht zoet-pittige saus, vaak aangevuld met taugé, bieslook en ei. Recepten verschillen per kraam. Vergelijk niet obsessief met Pad Thai, maar let op verse wokbereiding, textuur en de lokale sausbalans.',
      },
      {
        name: 'Som tam, kai yang & khao niao',
        description:
          'Papajasalade, gegrilde kip en kleefrijst vormen een praktische gedeelde maaltijd. Vraag welke som-tamstijl wordt gebruikt: gefermenteerde vis, krab, pinda en gedroogde garnaal kunnen in saus of vijzel zitten. Kies kip die volledig heet en gaar van de grill komt.',
      },
      {
        name: 'Avondmarkt in Korat',
        description:
          'Save One en andere actieve markten laten zien hoe breed de stad eet, maar dagen en zones veranderen. Controleer dezelfde dag of de markt open en levendig is, loop eerst een ronde en kies kramen met omloop, schone werkvlakken en correcte warme of koude opslag.',
      },
    ],
  },
  itinerary: {
    eyebrow: 'Drie dagen zonder provincie-FOMO',
    title: 'Korat wordt sterker wanneer één dag bewust leeg blijft voor één corridor',
    description:
      'Dag 1 is voor de stad, dag 2 voor Phimai óf Khao Yai en dag 3 voor een rustig vervolg. Het geopark vervangt een corridor; het komt er niet gratis bovenop.',
    days: [
      {
        day: 'Dag 1',
        title: 'Ya Mo, Chum Phon Gate en pad mee Korat',
        description:
          'Oriënteer je rond het Thao Suranaree Monument en de oude poort. Houd de wandeling compact, neem tijd voor een rustige lunch en ga later met een korte rit naar Wat Sala Loi. Kies ’s avonds een aantoonbaar actieve markt en proef pad mee Korat voordat je een lange lijst snacks bestelt. Kom je laat aan, schrap dan de tempel in plaats van het programma in het donker te forceren.',
        href: '/city/nakhon-ratchasima/attractions/',
      },
      {
        day: 'Dag 2',
        title: 'Phimai als erfgoeddag óf Khao Yai als natuurdag',
        description:
          'Voor een eerste cultuurreis is Phimai de helderste keuze: vertrek vroeg, combineer het historische park met het museum en houd terugmarge voor verkeer. Is natuur de hoofdreden, verplaats dan liever naar Pak Chong of een parkbasis en gebruik de dag voor één officieel geopende Khao Yai-route. Probeer beide niet in één lus te persen; ze liggen aan verschillende kanten van de provincie.',
        href: '/city/nakhon-ratchasima/attractions/',
      },
      {
        day: 'Dag 3',
        title: 'Langzame stad, geoparkroute of logisch vertrek',
        description:
          'Gebruik de derde ochtend voor een gemiste stadsstop, een café of een vertrek zonder stress. Kies het geopark alleen wanneer een concrete museum- of landschapsroute en vervoer bevestigd zijn. Reis je verder naar Isan, dan is Korat-stad het logische knooppunt; reis je terug naar Bangkok, dan kan een vooraf gekozen Pak Chong-stop in de route passen. Controleer trein of bus live en houd speling.',
        href: '/city/nakhon-ratchasima/attractions/',
      },
    ],
  },
  planning: {
    weather: {
      title: 'Koeler voor stad en steen; groener voor natuur',
      summary:
        'November tot februari voelt doorgaans het prettigst voor stadswandelingen, tempels en een lange Phimai-dag. Maart tot mei kan zeer heet worden op open pleinen en zandsteen. Het regenseizoen maakt Khao Yai en het plateau groener, maar brengt zware buien, gladde paden en minder voorspelbare natuuractiviteiten. De stad blijft dan bruikbaar met een flexibel binnen-buitenritme.',
      best: 'Kies grofweg november tot februari voor de breedste eerste reis. Gebruik TMD en parkberichten voor de actuele week; een klimaatgemiddelde voorspelt geen onweersbui of padsluiting.',
      tradeoff:
        'Koeler en droger weer kan drukker zijn bij Phimai en Khao Yai. Groene maanden geven sterker landschap, maar vragen meer route- en regenmarge.',
      href: '/city/nakhon-ratchasima/best-time-to-visit/',
      image: '/images/redesign/korat-phimai.webp',
      imageAlt: 'Phimai Historical Park in zacht, relatief koel ochtendlicht',
    },
    transport: {
      title: 'Korat is goed bereikbaar; de provincie is de echte transportvraag',
      summary:
        'Nakhon Ratchasima ligt aan de noordoostelijke spoorlijn en heeft intercitybusverbindingen met Bangkok en andere Isan-steden. Controleer tijden en aankomststation altijd live. De trein brengt je naar Korat-stad of Pak Chong, maar niet naar de ingang van Phimai Historical Park, een gekozen geoparklocatie of je Khao Yai-wandelroute. Voor die dagen heb je een chauffeur, huurauto of aantoonbaar passende lokale verbinding nodig.',
      facts: [
        'Gebruik de SRT-dienstregeling voor treinritten; gepubliceerde tijden en treinnummers kunnen veranderen.',
        'Korat heeft meerdere bus- en vervoersknooppunten. Bevestig terminal en uitstapplaats voordat je een hoteltransfer afspreekt.',
        'Pak Chong is de betere railbasis voor veel Khao Yai-plannen; vanaf het station volgt nog vervoer naar accommodatie en park.',
        'Rijd je zelf, dan rijd je links. Vermijd een lange onbekende terugrit na donker en controleer rijbewijs, verzekering en parkregels.',
      ],
      image: '/images/redesign/korat-route-banner.webp',
      imageAlt: 'Rustige provinciale weg over het Khoratplateau richting een gekozen dagroute',
    },
  },
  practicalTips: [
    {
      icon: 'map',
      title: 'Zoek op Korat én Nakhon Ratchasima',
      description: 'Trein, hotel en kaart kunnen een andere naam tonen. Controleer altijd district, station en exacte locatie.',
    },
    {
      icon: 'compass',
      title: 'Kies één provincieas',
      description: 'Phimai, Khao Yai en het geopark liggen niet als drie punten rond dezelfde rotonde. Geef één richting een echte dag.',
    },
    {
      icon: 'calendar',
      title: 'Controleer opening op de dag zelf',
      description: 'Museum, historisch park, markt en natuurpad hebben elk eigen beheer. Een oude blogtijd is geen actuele garantie.',
    },
    {
      icon: 'car',
      title: 'Spreek de terugrit vooraf af',
      description: 'Buiten de stad is spontaan vervoer minder vanzelfsprekend. Leg stops, wachttijd en eindpunt vast vóór vertrek.',
    },
  ],
  faqs: [
    {
      question: 'Wat te zien in Korat, Thailand?',
      answer:
        'Begin in Korat-stad bij het Thao Suranaree Monument en Chum Phon Gate, voeg Wat Sala Loi en een avondmarkt toe en kies daarna één dagroute. Phimai is de sterkste erfgoedkeuze. Pak Chong en Khao Yai passen beter bij een aparte natuurdag of tweede basis; het UNESCO-geopark is vooral sterk voor geologie- en fossielenliefhebbers.',
    },
    {
      question: 'Wat is Korat?',
      answer:
        'Korat is de gangbare korte naam voor Nakhon Ratchasima. De naam wordt gebruikt voor de provincie én voor de provinciale hoofdstad. Daardoor kunnen een “hotel in Korat”, station, attractie en nationaal park ver uit elkaar liggen. Controleer bij iedere boeking het district en de kaartpositie.',
    },
    {
      question: 'Waar staat Nakhon Ratchasima om bekend?',
      answer:
        'Nakhon Ratchasima staat bekend als belangrijk vervoers- en economisch knooppunt van Noordoost-Thailand, om de Ya Mo-identiteit van Korat-stad, Khmer-erfgoed bij Phimai, zijde en landbouw, Khao Yai aan de westkant en het Khorat UNESCO Global Geopark met fossielen en cuesta-landschap.',
    },
    {
      question: 'Is Nakhon Ratchasima een bezoek waard?',
      answer:
        'Ja, vooral wanneer je Korat-stad combineert met één duidelijke provincie-uitstap. De stad alleen is subtieler dan Bangkok of Chiang Mai, maar Ya Mo, Wat Sala Loi, pad mee Korat en een marktavond geven lokale samenhang. Phimai maakt de reis sterker voor erfgoed; Khao Yai voor natuur.',
    },
    {
      question: 'Waar staat Korat bekend om qua eten?',
      answer:
        'Pad mee Korat is het bekendste lokale gerecht: gebakken rijstnoedels met een regionale hartig-zoete saus. Daarnaast past Korat duidelijk in de Isan-eetcultuur met som tam, gegrilde kip en kleefrijst. Proef bij een drukke, schone kraam en vraag bij allergieën naar vissaus, pinda, garnaal, ei en gedeelde bereiding.',
    },
    {
      question: 'Wat is de beste tijd om Korat te bezoeken?',
      answer:
        'November tot februari is doorgaans het comfortabelst voor stad, tempels en Phimai. Maart tot mei is heet en vraagt vroege starts. Het regenseizoen maakt natuur groener, maar routes en paden variabeler. Controleer vlak voor vertrek de Thai Meteorological Department en eventuele parkmeldingen.',
    },
    {
      question: 'In welke provincie ligt Korat?',
      answer:
        'Korat-stad ligt in de provincie Nakhon Ratchasima in Noordoost-Thailand, de regio Isan. Korat is óók de informele naam van die hele provincie. De provincie is zeer groot en omvat onder meer Phimai en Pak Chong; deze gebieden zijn geen wijken op loopafstand van het centrum.',
    },
    {
      question: 'Ligt Korat in de buurt van Khao Yai?',
      answer:
        'Khao Yai ligt gedeeltelijk in de provincie Nakhon Ratchasima, maar Korat-stad en de gebruikelijke parkcorridor rond Pak Chong zijn afzonderlijke bases. Een rit is mogelijk, maar voor een volle parkdag is slapen bij Pak Chong of Khao Yai vaak praktischer. Controleer de gekozen parkingang en rijtijd, niet alleen de provincienaam.',
    },
  ],
  relatedGuides: [
    {
      title: 'Bezienswaardigheden Korat',
      description: 'Vergelijk Ya Mo, Phimai, Khao Yai en het geopark op afstand en reisdoel.',
      href: '/city/nakhon-ratchasima/attractions/',
      image: '/images/redesign/korat-phimai.webp',
      imageAlt: 'Phimai Historical Park in de provincie Nakhon Ratchasima',
    },
    {
      title: 'Beste reistijd Korat',
      description: 'Kies tussen koeler erfgoedweer, hete stadsdagen en een groener natuurtraject.',
      href: '/city/nakhon-ratchasima/best-time-to-visit/',
      image: '/images/redesign/korat-khao-yai.webp',
      imageAlt: 'Groene Khao Yai-corridor na regen',
    },
    {
      title: 'Beste hotels Korat',
      description: 'Kies eerst tussen Korat-stad en de afzonderlijke Pak Chong/Khao Yai-basis.',
      href: '/best-hotels/nakhon-ratchasima/',
      image: '/images/redesign/korat-route-banner.webp',
      imageAlt: 'Route over het Khoratplateau tussen Korat-stad en de gekozen verblijfscorridor',
    },
  ],
  sources: [
    {
      title: 'Nakhon Ratchasima destination',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Destinations/Provinces/Nakhon-Ratchasima/580',
      note: 'Officiële provinciecontext voor de namen Korat/Nakhon Ratchasima, districten, cultuur, Phimai, Pak Thong Chai en Khao Yai.',
    },
    {
      title: 'Khorat UNESCO Global Geopark',
      creator: 'UNESCO',
      url: 'https://www.unesco.org/en/iggp/geoparks/khorat',
      note: 'Primaire bron voor oppervlakte, geologie, fossielendiversiteit, cuesta-landschap en Khorat-cultuur.',
    },
    {
      title: '5 Inspiring Historical Sites — Phimai',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Articles/5-inspiring-historical-sites-to-visit-in-thailand',
      note: 'Officiële historische en afstandscontext voor Phimai Historical Park; opening en prijs worden altijd live gecontroleerd.',
    },
    {
      title: 'Khao Yai National Park',
      creator: 'Department of National Parks, Wildlife and Plant Conservation',
      url: 'https://npv-app.dnp.go.th/front/other/83/23?lang=en',
      note: 'Officiële parkbron voor actuele beheer- en toegangscontext; de gids zet geen veranderlijke opening statisch vast.',
    },
    {
      title: 'SRT timetable',
      creator: 'State Railway of Thailand',
      url: 'https://www.railway.co.th/SRTTimetable/StationList',
      note: 'Actuele officiële bron voor Nakhon Ratchasima- en Pak Chong-treinplanning.',
    },
    {
      title: 'Reisadvies Thailand',
      creator: 'NederlandWereldwijd',
      url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand',
      note: 'Actuele landelijke veiligheids- en reiscontext; controleer de kaart en wijzigingen vlak voor vertrek.',
    },
  ],
};
