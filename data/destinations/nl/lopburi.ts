import type { DestinationGuideData } from '../types';

export const lopburiDestinationGuide: DestinationGuideData = {
  citySlug: 'lopburi',
  cityName: 'Lopburi',
  locale: 'nl',
  pageTitle: 'Lopburi Thailand: tempels, apen & dagtrip (2026)',
  pageDescription:
    'Plan Lopburi vanuit Bangkok met de oude stad, Prang Sam Yot, Narai’s paleis en een eerlijke apencheck. Inclusief trein, verblijfsduur en zonnebloemen.',
  pageUrl: 'https://go2-thailand.com/nl/city/lopburi/',
  dateModified: '2026-07-24',
  coordinates: { latitude: 14.7995, longitude: 100.6534 },
  touristType: ['Cultuurreizigers', 'Treinreizigers', 'Slow travel', 'Geschiedenisliefhebbers'],
  stayGuideHref: '/where-to-stay/lopburi/',
  hero: {
    image: '/images/redesign/lopburi-hero.webp',
    imageAlt: 'De drie Khmer-prangs van Phra Prang Sam Yot in het oude centrum van Lopburi',
    eyebrow: 'Khmer-erfgoed, Narai en een stad in verandering',
    title: 'Lopburi',
    accent: 'meer dan de apen',
    subtitle: 'Kom voor de lagen geschiedenis. Check de apensituatie pas vlak voor vertrek.',
    description:
      'Lopburi is een compacte historische stop aan de noordelijke spoorlijn. Rond het oude station liggen Khmer-ruïnes, Prang Sam Yot en het paleiskwartier van koning Narai dicht genoeg bij elkaar voor een sterke dag. De beroemde stadsmakaken worden inmiddels actief beheerd en zijn geen gegarandeerde straatscène. Met één overnachting zie je meer dan op een gehaaste fotostop vanuit Bangkok.',
    imageClassName: 'object-cover object-[65%_center] lg:object-center',
    stats: [
      { label: 'Sterk eerste verblijf', value: '1 nacht', icon: 'calendar' },
      { label: 'Oude stad', value: 'Veel te voet', icon: 'map' },
      { label: 'Vanuit Bangkok', value: 'Trein of auto', icon: 'car' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst de juiste reden kiezen',
    title: 'Lopburi is de moeite waard als geschiedenis je hoofdreden is',
    paragraphs: [
      'Lopburi werkt niet meer goed als reisbelofte van “duizenden apen op straat”. De gemeente en natuurautoriteiten hebben sinds 2024 grote aantallen makaken gevangen, gesteriliseerd en in verblijven ondergebracht. De situatie verandert nog steeds; eind juni 2026 ontsnapte tijdelijk een groep uit een gemeentelijk verblijf. Je kunt dieren rond de historische zone tegenkomen, maar aantal en locatie zijn niet voorspelbaar. Reis daarom nooit alleen voor een gegarandeerde apenfoto.',
      'De constante waarde zit in de stad zelf. Phra Prang Sam Yot laat de Khmer-laag zien, Wat Phra Si Rattana Mahathat vormt een grotere ruïnezone bij het spoor en Phra Narai Ratchaniwet met het nationale museum verklaart waarom Lopburi onder koning Narai een tweede koninklijk centrum werd. Ban Wichayen voegt het verhaal van buitenlandse gezanten en zeventiende-eeuwse hofpolitiek toe. Deze plekken maken samen een compacte erfgoedroute die wezenlijk anders is dan Ayutthaya.',
      'Een lange dagtrip kan, maar één nacht is beter. Je vermijdt dan een kwetsbare combinatie van twee lange treinritten en beperkte openingstijden, en je ziet de oude stad vroeg of laat op de dag. Voeg de zonnebloemvelden alleen toe wanneer een veld aantoonbaar bloeit en je apart vervoer hebt: de landbouwzones liggen buiten het historische centrum en bloei verschuift per perceel, weer en zaaimoment.',
    ],
    verdicts: [
      {
        label: 'Is Lopburi de moeite waard?',
        value: 'Ja, voor erfgoed',
        description: 'De combinatie van Khmer-ruïnes en het paleiskwartier van Narai is compact, leesbaar en onderscheidend.',
        icon: 'sparkles',
      },
      {
        label: 'Hoeveel dagen?',
        value: '1 nacht',
        description: 'Een dagtrip kan; een overnachting geeft marge voor museumsluiting, treinwijziging en zachter licht.',
        icon: 'calendar',
      },
      {
        label: 'Zie je zeker apen?',
        value: 'Nee',
        description: 'De populatie wordt actief beheerd. Controleer de actuele situatie en benader wilde dieren nooit voor interactie.',
        icon: 'compass',
      },
      {
        label: 'Zonnebloemen erbij?',
        value: 'Alleen bij bloei',
        description: 'Velden liggen buiten de stad en zijn landbouwgrond, geen jaarrond attractie met vaste garantie.',
        icon: 'sun',
      },
    ],
  },
  zones: [
    {
      slug: 'prang-sam-yot',
      name: 'Prang Sam Yot & de oude stationszone',
      kicker: 'Khmer-erfgoed als startpunt',
      image: '/images/redesign/lopburi-hero.webp',
      imageAlt: 'Phra Prang Sam Yot met drie verbonden laterieten torens in warm avondlicht',
      summary:
        'De drie verbonden prangs van Phra Prang Sam Yot zijn het herkenningspunt van Lopburi, maar bekijk ze eerst als architectuur. De Bayon-Khmerstijl, latere boeddhistische aanpassingen en ligging midden in de levende stad laten zien hoe oud en nieuw hier letterlijk naast elkaar staan. Aan dezelfde kant van het historische centrum liggen San Phra Kan en de spoorzone. Loop niet met open eten, losse zonnebril of een bungelende fles wanneer er makaken aanwezig zijn. Houd afstand, voer niet, blokkeer geen vluchtroute en volg aanwijzingen van personeel of gemeente.',
      bestFor: 'Eerste bezoek, Khmer-architectuur, treinreizigers en een compacte wandeling door de oude stad.',
      tradeoff:
        'De actuele apensituatie kan totaal anders zijn dan op oudere blogs. Kom niet met de verwachting dat contact of een volle straat dieren onderdeel van je ticket is.',
    },
    {
      slug: 'narai-palace',
      name: 'Narai’s paleis & nationaal museum',
      kicker: 'Het inhoudelijke hart van de stad',
      image: '/images/redesign/lopburi-palace-quarter.webp',
      imageAlt: 'Historische bogen en tuinen in het paleiskwartier van koning Narai in Lopburi',
      summary:
        'Phra Narai Ratchaniwet is meer dan een fotogenieke paleismuur. Het complex omvat buiten-, midden- en binnenzones uit verschillende bouwfasen. Het Somdet Phra Narai National Museum gebruikt gebouwen in het terrein om de ontwikkeling van Lopburi van prehistorie via Dvaravati en Khmer-invloed tot Ayutthaya en Rattanakosin te tonen. Reserveer hier echte leestijd. Controleer de officiële museumdag en laatste toegang kort voor je bezoek; een oude blog met een vast weekschema is geen garantie.',
      bestFor: 'Geschiedenis, musea, architectuur, reizigers die willen begrijpen waarom koning Narai hier een tweede hofcentrum ontwikkelde.',
      tradeoff:
        'Op een sluitingsdag valt een groot deel van de inhoudelijke kern weg. Plan dit blok eerst en bouw de ruïnewandeling eromheen.',
    },
    {
      slug: 'wichayen-mahathat',
      name: 'Ban Wichayen & Wat Phra Si Rattana Mahathat',
      kicker: 'Diplomatie naast een oudere ruïnestad',
      image: '/images/redesign/lopburi-palace-quarter.webp',
      imageAlt: 'Verweerde zeventiende-eeuwse bogen en laterieten muren in historisch Lopburi',
      summary:
        'Ban Wichayen werd in de tijd van koning Narai verbonden met de ontvangst van buitenlandse gezanten en met Constantine Phaulkon. De Europese en Thaise bouwinvloeden geven een zeldzame extra laag aan een reis door Centraal-Thailand. Wat Phra Si Rattana Mahathat bij het spoor vertelt juist een langere religieuze en architectonische geschiedenis. Bezoek beide niet als naamloze ruïnes: lees vooraf de kern en let ter plaatse op materiaal, assen, bogen en latere aanpassingen.',
      bestFor: 'Reizigers die hofgeschiedenis, internationale contacten en Khmer- plus Ayutthaya-erfgoed willen verbinden.',
      tradeoff:
        'Hitte en weinig schaduw maken te veel ruïnes midden op de dag vermoeiend. Kies kwaliteit boven een top-tien-checklist.',
    },
    {
      slug: 'sunflower-country',
      name: 'Zonnebloemland & Khao Chin Lae',
      kicker: 'Een seizoensroute buiten de stad',
      image: '/images/redesign/lopburi-sunflower-route.webp',
      imageAlt: 'Gouden zonnebloemvelden bij een groene kalksteenheuvel in de provincie Lopburi',
      summary:
        'Lopburi’s zonnebloemen groeien op landbouwpercelen in meerdere districten, onder meer rond Khao Chin Lae. Bloei wordt beïnvloed door zaaidatum, regen en perceelkeuze. Een jaartal of maand uit een oud artikel zegt daarom niet welk veld vandaag open en geel is. Vraag je verblijf, lokale toerisme-informatie of het veld rechtstreeks om een recente foto en locatie. Respecteer hekken, gewassen en eventuele bijdrage; stap niet tussen rijen alleen voor een foto.',
      bestFor: 'Roadtrip, fotografie met toestemming, koelere seizoensmaanden en reizigers met een extra halve of volle dag.',
      tradeoff:
        'Niet wandelbaar vanuit de oude stad en niet jaarrond. Zonder bevestigde bloei is het geen verstandige omweg.',
    },
  ],
  highlights: [
    {
      eyebrow: 'Erfgoed eerst',
      title: 'Lees Prang Sam Yot zonder de apenbril',
      image: '/images/redesign/lopburi-monkey-reality.webp',
      imageAlt: 'Makaken op afstand bij de laterieten ruïnes van Phra Prang Sam Yot',
      description:
        'Begin aan de buitenzijde en kijk naar de drie torens, hun verbinding en de verhouding met de hedendaagse stad. Wanneer makaken aanwezig zijn, blijf je op afstand en berg je bril, eten en losse spullen op voordat je de zone inloopt. Voeren of lokken maakt dieren niet vriendelijker; het versterkt juist gedrag dat voor bewoners, reizigers en dieren onveilig kan worden. Zie je geen apen, dan is het monument nog steeds de stop waard.',
      decision: 'Plan de site als historische kern. Behandel een eventuele waarneming als wilde fauna, niet als interactieproduct.',
      href: '/city/lopburi/attractions/',
    },
    {
      eyebrow: 'De stad van Narai',
      title: 'Geef paleis en museum minstens één rustig blok',
      image: '/images/redesign/lopburi-palace-quarter.webp',
      imageAlt: 'Bogen, oude muren en tuinen in Phra Narai Ratchaniwet',
      description:
        'De paleiszone maakt begrijpelijk waarom Lopburi geen kleine versie van Ayutthaya is. Museumcollecties verbinden meerdere historische periodes, terwijl de gebouwen zelf hofceremonie, opslag, ontvangst en wonen laten zien. Combineer het daarna met Ban Wichayen voor de diplomatieke laag. Controleer de officiële opening kort vooraf en zet dit blok niet als laatste uur op een volle dagtrip.',
      decision: 'Als je slechts één inhoudelijke keuze maakt, kies dan paleis plus museum boven een extra verspreide fotostop.',
      href: '/city/lopburi/attractions/',
    },
    {
      eyebrow: 'Seizoen is geen kalendergarantie',
      title: 'Rijd alleen naar een veld dat vandaag bloeit',
      image: '/images/redesign/lopburi-sunflower-route.webp',
      imageAlt: 'Bloeiende zonnebloemen en kalksteenlandschap buiten Lopburi-stad',
      description:
        'Zonnebloemfoto’s maken Lopburi aantrekkelijk in de koelere tijd, maar de velden zijn verspreide landbouwlocaties. Laat je op dezelfde dag een actuele locatie en beeld sturen, regel heen- én terugvervoer en vraag of bezoekers welkom zijn. Zo voorkom je een lange rit naar geoogste of nog groene planten en blijft landbouwgrond intact.',
      decision: 'Zonder recente bevestiging blijft je tweede dag in de oude stad of gaat hij naar een andere aantoonbaar geopende provincieattractie.',
      href: '/city/lopburi/attractions/',
    },
  ],
  featureBanner: {
    image: '/images/redesign/lopburi-route-banner.webp',
    imageAlt: 'Panoramische routevisual van Khmer-ruïnes via Narai’s paleis naar zonnebloemland',
    eyebrow: 'Eén compacte kern, één optionele buitenroute',
    title: 'Maak van Lopburi geen apensafari',
    description:
      'Wandel eerst de historische as van Prang Sam Yot naar het paleiskwartier en Ban Wichayen. Voeg daarna alleen een bevestigde seizoensroute toe. De visuele lijn is geen kaart op schaal; controleer stations, opening, vervoer en actuele dieren- en bloeisituatie vlak voor vertrek.',
  },
  food: {
    image: '/images/redesign/lopburi-palace-quarter.webp',
    imageAlt: 'Schaduwrijke historische wijk van Lopburi als context voor een lokale lunch',
    eyebrow: 'Kijk verder dan een toeristenstraat',
    title: 'Thai Phuan-smaken en lokale producten',
    description:
      'Lopburi heeft geen gerecht dat je bij elke straathoek gegarandeerd vindt. Zoek liever naar een keuken die Thai Phuan-gerechten of lokale producten werkelijk op het menu uitlegt. Officiële provincie-informatie noemt onder meer gezouten eieren die met lokale fijne mergel worden bereid en gepekelde kokospaddenstoel als producten. Beschikbaarheid verandert; koop niet omdat een verouderde lijst zegt dat iets overal ligt. Bij allergieën zijn gefermenteerde vis, garnalenpasta, vissaus, pinda, ei en gedeelde wok belangrijke vragen.',
    dishes: [
      {
        name: 'Pla som fak',
        description:
          'Een gefermenteerde visbereiding die in Thai Phuan-context voorkomt. Smaak, bereiding en serveren verschillen per maker. Vraag hoe het product gekoeld wordt, of het rauw of verhit wordt gegeten en vermijd het bij visallergie; gedeelde snijplanken en sauzen tellen mee.',
      },
      {
        name: 'Kaeng som Phuan',
        description:
          'Een zure, kruidige curry in lokale Thai Phuan-stijl. Recepten kunnen vis, garnalenpasta of vissaus bevatten, ook wanneer vooral groente zichtbaar is. Vraag naar de volledige currybase en niet alleen naar de stukjes in de kom.',
      },
      {
        name: 'Gezouten ei uit Lopburi',
        description:
          'De provincie promoot een lokale gezouten-eitraditie met fijne mergel. Zie het als product om te proeven of mee te nemen wanneer herkomst en verpakking duidelijk zijn. Controleer houdbaarheid en vervoer; bij ei-allergie is ook verwerking in sauzen of snacks relevant.',
      },
    ],
  },
  itinerary: {
    eyebrow: 'Eén nacht, twee rustige dagdelen',
    title: 'De betere Lopburi-stop begint niet bij de laatste trein',
    description:
      'Kom op dag 1 vroeg genoeg voor het paleiskwartier en slaap in of nabij de oude stad. Gebruik dag 2 voor de ruïnes bij zachter licht of een alleen vooraf bevestigde buitenroute.',
    days: [
      {
        day: 'Dag 1',
        title: 'Narai’s paleis, museum en Ban Wichayen',
        description:
          'Controleer vóór vertrek welk Lopburi-station jouw trein gebruikt en wanneer paleis en museum die dag toegang geven. Laat bagage bij je verblijf en begin bij Phra Narai Ratchaniwet. Neem de museumteksten mee als context voor de rest van de stad en wandel daarna naar Ban Wichayen. Sluit af met een vroege avondwandeling door bewoonde straten zonder deuren, diensten of lokale routine te blokkeren.',
        href: '/city/lopburi/attractions/',
      },
      {
        day: 'Dag 2',
        title: 'Khmer-as en terug naar Bangkok',
        description:
          'Berg eten, zonnebril en losse spullen op voordat je richting Prang Sam Yot loopt. Bekijk het monument en volg de actuele veiligheidsaanwijzingen; zoek geen dieren op als personeel een zone afsluit. Ga daarna naar Wat Phra Si Rattana Mahathat of een tweede ruïne die echt open is. Reis met marge terug, want het oude station en Lopburi 2 bedienen niet noodzakelijk dezelfde treincategorieën.',
        href: '/city/lopburi/attractions/',
      },
      {
        day: 'Optionele dag 2',
        title: 'Alleen bij bevestigde zonnebloembloei',
        description:
          'Vraag dezelfde ochtend naar een actueel bloeiend veld, exacte ingang en terugrit. Bezoek één locatie en respecteer het perceel. Is de bloei voorbij of het veld gesloten, houd dan de erfgoedroute aan. Een zonnebloemenstop combineren met alle oude-stadsplekken en een vaste trein terug maakt de dag onnodig kwetsbaar.',
        href: '/city/lopburi/attractions/',
      },
    ],
  },
  planning: {
    weather: {
      title: 'Koeler weer helpt, maar bloei blijft lokaal',
      summary:
        'De koelere, relatief drogere maanden zijn comfortabeler voor open ruïneterreinen en vallen vaak samen met het bredere zonnebloemseizoen. Dat maakt november tot ongeveer februari een logisch reisvenster, niet een garantie op elk veld. Maart en april kunnen zeer heet worden; in de nattere maanden vragen onweer, gladde steen en korte zware buien meer marge.',
      best: 'Kies de koelere periode voor wandelen en bevestig zonnebloemen afzonderlijk. Controleer op de dag zelf de Thai Meteorological Department-verwachting en schuil niet onder een geïsoleerde boom of hoge ruïne bij onweer.',
      tradeoff:
        'Een heldere droge dag trekt meer weekendbezoekers naar bloeiende velden. Een rustigere natte dag kan prettiger zijn in de stad, maar vraagt flexibel buitenprogramma.',
      href: '/city/lopburi/best-time-to-visit/',
      image: '/images/redesign/lopburi-sunflower-route.webp',
      imageAlt: 'Zonnebloemveld onder zacht koel-seizoenslicht in Lopburi',
    },
    transport: {
      title: 'Controleer niet alleen de tijd, maar ook het station',
      summary:
        'Lopburi ligt aan de noordelijke spoorlijn en is per lokale of doorgaande trein bereikbaar vanuit Bangkok. Sinds de opening van Lopburi 2 gebruiken sommige treinsoorten een ander station dan het oude centrumstation. De oude stad is vanaf het historische station goed te voet te verkennen; Lopburi 2 vraagt een aanvullende transfer. Dienstregeling, categorie en vertrekstation in Bangkok veranderen, dus gebruik de actuele SRT-planner.',
      facts: [
        'Controleer op je ticket zowel Bangkok-vertrekstation als “Lopburi” of “Lopburi 2”; ga niet af op een oude blogroute.',
        'Een lokale trein kan langer duren maar bij de oude stad stoppen. Snellere treincategorieën zijn niet automatisch handiger als je daarna een transfer nodig hebt.',
        'Voor de zonnebloemvelden heb je apart vervoer nodig. Spreek prijs, wachttijd, exacte locatie en terugrit af voordat je instapt.',
        'Met een huurauto rijd je links. Parkeer niet tegen spoor, historische toegang of marktbevoorrading en laat geen eten zichtbaar liggen in een apenzone.',
      ],
      image: '/images/redesign/lopburi-route-banner.webp',
      imageAlt: 'Routebeeld van de oude stad en buitengebieden van Lopburi',
    },
  },
  practicalTips: [
    {
      icon: 'compass',
      title: 'Voer of lok geen makaken',
      description: 'Houd afstand, berg losse spullen op en volg actuele afzettingen. Een rustige waarneming is geen uitnodiging tot contact.',
    },
    {
      icon: 'map',
      title: 'Check je aankomststation',
      description: 'Lopburi en Lopburi 2 zijn niet dezelfde uitstapplek. Controleer treinsoort en regel zo nodig vooraf een transfer.',
    },
    {
      icon: 'sun',
      title: 'Vraag om een foto van vandaag',
      description: 'Een actuele veldfoto is waardevoller dan een jaartal in een blog. Bloei en toegang verschuiven per perceel.',
    },
    {
      icon: 'calendar',
      title: 'Bouw rond het museum',
      description: 'Controleer officiële openingsdagen eerst. Zonder het paleis en museum mist de oude stad haar belangrijkste contextlaag.',
    },
  ],
  faqs: [
    {
      question: 'Is Lopburi de moeite waard?',
      answer:
        'Ja, wanneer Khmer-erfgoed en de geschiedenis van koning Narai je interesseren. Prang Sam Yot, Wat Phra Si Rattana Mahathat, het paleiskwartier en Ban Wichayen liggen compact genoeg voor een sterke erfgoedstop. Reis niet uitsluitend voor een gegarandeerde straat vol apen; de populatie wordt actief beheerd en de situatie verandert.',
    },
    {
      question: 'Hoeveel dagen heb je nodig in Lopburi?',
      answer:
        'Eén overnachting is voor de meeste reizigers het beste. Daarmee verdeel je paleis en museum over één dagdeel en de Khmer-ruïnes over een koeler tweede dagdeel. Een dagtrip vanuit Bangkok kan, maar wordt kwetsbaar door treintijden, stationskeuze en eventuele sluitingsdagen.',
    },
    {
      question: 'Wat is de beste tijd om Lopburi te bezoeken?',
      answer:
        'De relatief koelere en drogere periode van ongeveer november tot februari is het prettigst voor open ruïneterreinen. Zonnebloemen bloeien vaak in een deel van die periode, maar nooit gegarandeerd op elke locatie. Vraag vlak voor vertrek welk perceel daadwerkelijk bloeit en controleer de actuele weersverwachting.',
    },
    {
      question: 'Wat is de apentempel in Lopburi?',
      answer:
        'Phra Prang Sam Yot wordt vaak de apentempel genoemd. Het is in de eerste plaats een historisch complex met drie verbonden Khmer-prangs. Makaken kunnen in en rond de oude stad aanwezig zijn, maar aantallen en zones veranderen door actief populatiebeheer. Voer, lok of raak de dieren niet aan.',
    },
    {
      question: 'Kun je Lopburi als dagtrip vanuit Bangkok bezoeken?',
      answer:
        'Ja. Kies vooraf welke twee of drie kernplekken je wilt zien, controleer de officiële museumopening en boek of controleer een trein met het juiste aankomststation. Plan ruime terugkeermarge. Wie paleis, museum, ruïnes en zonnebloemen allemaal in één dag wil doen, plant te veel.',
    },
    {
      question: 'Zijn de apen in Lopburi gevaarlijk?',
      answer:
        'Makaken zijn wilde dieren en kunnen eten of losse spullen grijpen, dreigen, krabben of bijten. Houd afstand, maak geen direct contact, berg eten en bril op en volg lokale aanwijzingen. Bij beet of kras spoel je de wond direct grondig en laat je dezelfde dag medisch beoordelen vanwege infectie- en rabiësrisico.',
    },
    {
      question: 'Wanneer bloeien de zonnebloemen in Lopburi?',
      answer:
        'Vaak worden bloeiende velden in de koelere maanden tussen grofweg november en januari bezocht, maar het precieze venster verschilt per zaaidatum, regen en perceel. Vraag om een actuele foto en exacte bezoekerslocatie. De velden liggen buiten de oude stad en vereisen eigen vervoer of een afgesproken chauffeur.',
    },
  ],
  relatedGuides: [
    {
      title: 'Bezienswaardigheden Lopburi',
      description: 'Kies de historische kern zonder een verouderde top-tien af te werken.',
      href: '/city/lopburi/attractions/',
      image: '/images/redesign/lopburi-monkey-reality.webp',
      imageAlt: 'Prang Sam Yot en makaken op gepaste afstand',
    },
    {
      title: 'Beste reistijd Lopburi',
      description: 'Vergelijk wandelcomfort, hitte, regen en het onzekere bloeivenster.',
      href: '/city/lopburi/best-time-to-visit/',
      image: '/images/redesign/lopburi-sunflower-route.webp',
      imageAlt: 'Zonnebloemveld in het groene landschap van Lopburi',
    },
    {
      title: 'Waar verblijven in Lopburi?',
      description: 'Kies een basis bij de oude stad en controleer je aankomststation.',
      href: '/where-to-stay/lopburi/',
      image: '/images/redesign/lopburi-palace-quarter.webp',
      imageAlt: 'Historische paleiszone in Lopburi',
    },
  ],
  sources: [
    {
      title: 'Lop Buri destination',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Destinations/Provinces/Lop-Buri/223',
      note: 'Officiële provinciecontext voor Narai, historische locaties, zonnebloemen en lokale producten.',
    },
    {
      title: '10 things to do in Lop Buri',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Articles/10-things-to-do-in-lop-buri',
      note: 'Officiële context voor Prang Sam Yot, Ban Wichayen en de verspreide zonnebloemgebieden; oude uren of prijzen zijn niet vastgezet.',
    },
    {
      title: 'Somdet Phra Narai National Museum',
      creator: 'Museum Thailand',
      url: 'https://www.museumthailand.com/th/museum/Somdet-Phra-Narai-National-Museum',
      note: 'Museum- en paleiscontext, inclusief de drie paleiszones en collecties over de ontwikkeling van Lopburi.',
    },
    {
      title: 'Wichayen House',
      creator: 'Museum Thailand',
      url: 'https://www.museumthailand.com/en/museum/Wichayen-House',
      note: 'Historische context voor de ontvangstresidentie, buitenlandse gezanten en Constantine Phaulkon.',
    },
    {
      title: 'SRT timetable Bangkok–Lopburi',
      creator: 'State Railway of Thailand',
      url: 'https://www.railway.co.th/SRTTimetable/StationList?DestStation=1050&StartStation=1001',
      note: 'Actuele officiële planner voor treincategorie, station, dienstregeling en wijzigingen; tijden worden niet statisch overgenomen.',
    },
    {
      title: 'Lopburi Municipality',
      creator: 'Lopburi Municipality',
      url: 'https://www.lopburicity.go.th/',
      note: 'Actuele gemeentelijke context voor de stad en voorzieningen rond het beheer van dieren.',
    },
    {
      title: 'Reisadvies Thailand',
      creator: 'NederlandWereldwijd',
      url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand',
      note: 'Actueel landelijk veiligheids- en gezondheidsadvies, onder meer verkeer, dierenbeten en medische hulp.',
    },
  ],
};
