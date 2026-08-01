import type { HotelDetailGuideData } from './types';

const relatedKaronGuides = [
  {
    title: 'Waar verblijven in Karon?',
    description: 'Vergelijk strandligging, heuvelresorts en rustige delen van Karon.',
    href: '/phuket/karon/hotels/',
    image: '/images/redesign/phuket-stay-kata-karon.webp',
    imageAlt: 'De kust bij Kata en Karon op Phuket',
  },
  {
    title: 'Karon als reisbasis',
    description: 'Bekijk hoe strand, restaurants en omliggende baaien samenhangen.',
    href: '/phuket/karon/',
    image: '/images/redesign/karon-area-hero-v2.webp',
    imageAlt: 'Karon Beach aan de westkust van Phuket',
  },
  {
    title: 'Phuket reisgids',
    description: 'Combineer Karon met andere stranden, oude stad en een haalbare eilandroute.',
    href: '/city/phuket/',
    image: '/images/redesign/phuket-destination-hero-v2.webp',
    imageAlt: 'Tropische kust van Phuket met helder water',
  },
];

export const nlKaronHotelDetailGuides: Record<string, HotelDetailGuideData> = {
  'pullman-phuket-arcadia-karon-beach-resort': {
    slug: 'pullman-phuket-arcadia-karon-beach-resort',
    hotelName: 'Pullman Phuket Karon Beach Resort',
    cityName: 'Phuket',
    citySlug: 'phuket',
    destinationHref: '/phuket/karon/',
    hotelGuideHref: '/phuket/karon/hotels/',
    hotelGuideLabel: 'Hotels in Karon',
    area: 'Karon Beach · Patak Road',
    pageTitle: 'Pullman Phuket Karon Beach Resort: past dit hotel bij je?',
    pageDescription: 'Eerlijk verblijfadvies over Pullman Phuket Karon Beach Resort: ligging, resortomvang, kamers, zwembaden en wat je vóór boeken controleert.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/karon/hotels/pullman-phuket-arcadia-karon-beach-resort/',
    dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/pullman-karon-guide-hero.webp',
      imageAlt: 'Redactioneel sfeerbeeld van een groot tropisch resort tegenover Karon Beach',
      imageCaption: 'AI-gegenereerd sfeerbeeld van een resort in Karon; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Groot resort tegenover Karon Beach',
      title: 'Pullman Phuket',
      accent: 'Karon Beach Resort',
      subtitle: 'Veel zwembaden en restaurants op één uitgestrekt terrein.',
      description: 'Accor positioneert dit resort tegenover Karon Beach en noemt een terrein van circa 30 hectare. De belangrijkste keuze is niet alleen garden of sea view, maar ook of een groot resortcomplex bij jouw reisritme past.',
      ctaLabel: 'Controleer actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel',
      title: 'Sterk voor complete resortdagen dicht bij het strand.',
      description: 'Kies Pullman wanneer zwembaden, sport en meerdere eetplekken belangrijk zijn. De schaal geeft veel keuze, maar voelt minder compact dan een klein hotel. Let bij zoeken op de huidige naam: Pullman Phuket Arcadia is een ander hotel bij Naithon Beach.',
      stats: [
        { label: 'Ligging', value: 'Tegenover strand', note: 'Karon Beach volgens Accor', icon: 'waves' },
        { label: 'Terrein', value: 'Circa 30 ha', note: 'Een uitgestrekt resortcomplex', icon: 'map' },
        { label: 'Zwembaden', value: '5 buitenbaden', note: 'Plus een kinderglijbaan', icon: 'waves' },
        { label: 'Kamers', value: '44 m² en groter', note: 'Garden, sea view en suites', icon: 'bed' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?',
      title: 'Een resort om te gebruiken, niet alleen om te slapen.',
      intro: 'De meerwaarde zit in de combinatie van vijf zwembaden, acht eet- en drinkplekken en sportvoorzieningen.',
      goodFor: ['Gezinnen die meerdere zwembaden en een kinderglijbaan waarderen', 'Stellen die stranddagen met spa, fitness of tennis willen afwisselen', 'Reizigers die graag restaurants en faciliteiten op het terrein hebben', 'Wie bewust extra ruimte in een junior of grotere suite zoekt'],
      tradeoffs: ['Het grote terrein voelt minder overzichtelijk dan een compact strandhotel', 'Garden en sea view zijn bij de basiscategorieën even groot; je betaalt vooral voor uitzicht', 'Het strand ligt tegenover het hotel en is geen privéstrand', 'Tijdelijke renovaties kunnen delen van het resort beïnvloeden; controleer dit voor jouw data'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk',
      title: 'Karon Beach dichtbij, maar houd rekening met de schaal.',
      description: 'Accor noemt Karon Beach op circa twee minuten lopen en Kata Beach op circa tien minuten. De route vanaf jouw specifieke kamer kan binnen zo’n groot terrein verschillen.',
      steps: [
        { label: 'Strand', title: 'Steek gericht over', description: 'Controleer bij aankomst welke hoteluitgang de kortste route naar Karon Beach geeft.' },
        { label: 'Resortdag', title: 'Kies je zwembadzone', description: 'Gebruik de plattegrond om zwembad, ontbijt en kamer logisch te combineren.' },
        { label: 'Buiten Karon', title: 'Plan vervoer', description: 'Voor Phuket Old Town en verder gelegen stranden blijft taxi, transfer of huurauto nodig.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer',
      title: 'Controleer eerst hotelidentiteit, daarna kamer en uitzicht.',
      description: 'De bestaande route bevat nog “Arcadia”, maar de huidige accommodatie heet Pullman Phuket Karon Beach Resort. Controleer altijd naam en adres 333 Patak Road.',
      checks: [
        { title: 'Juiste hotel', description: 'Verwar deze Karon-property niet met Pullman Phuket Arcadia Naithon Beach.' },
        { title: 'Uitzicht', description: 'Garden en sea view hebben bij meerdere categorieën dezelfde oppervlakte.' },
        { title: 'Suitekeuze', description: 'Vergelijk 44 m² kamers met junior suites van 62 m² en grotere suites.' },
        { title: 'Werkzaamheden', description: 'Vraag welke restaurants en lobbydelen op jouw verblijfsdata geopend zijn.' },
      ],
    },
    faqs: [
      { question: 'Hoe heet Pullman Phuket Arcadia Karon Beach Resort nu?', answer: 'De huidige officiële naam is Pullman Phuket Karon Beach Resort. Pullman Phuket Arcadia Naithon Beach is een afzonderlijk hotel op een andere plek in Phuket.' },
      { question: 'Ligt Pullman Phuket Karon direct aan het strand?', answer: 'Accor positioneert het resort tegenover Karon Beach en noemt het strand op ongeveer twee minuten lopen. Het hotel heeft geen privéstrand.' },
      { question: 'Hoe groot is Pullman Phuket Karon Beach Resort?', answer: 'Accor noemt een terrein van ongeveer 75 acres, circa 30 hectare. Dat geeft veel voorzieningen, maar betekent ook dat de afstand vanaf jouw kamer tot lobby, zwembad of uitgang kan verschillen.' },
      { question: 'Hoeveel zwembaden heeft Pullman Phuket Karon?', answer: 'De actuele Accor-pagina noemt vijf buitenzwembaden en één waterglijbaan voor kinderen. Controleer voor vertrek eventuele tijdelijke sluitingen.' },
      { question: 'Is een sea-viewkamer groter dan garden view?', answer: 'Niet automatisch. De actuele Superior- en Deluxe-varianten met garden of sea view zijn 44 m². De meerwaarde van sea view zit daar vooral in het uitzicht.' },
      { question: 'Zijn er renovaties bij Pullman Phuket Karon?', answer: 'Accor meldt voor 10 april tot 1 december 2026 werkzaamheden aan onder meer Sails en delen van de lobby. Controleer vlak voor boeken welke onderdelen op jouw data geraakt worden.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt',
    faqDescription: 'Controleer actuele kamers, werkzaamheden en voorwaarden altijd bij de officiële hotelpagina of boekingspartner.',
    relatedGuides: relatedKaronGuides,
    sources: [
      { title: 'Pullman Phuket Karon Beach Resort', creator: 'Accor', url: 'https://all.accor.com/hotel/C1D6/index.en.shtml', note: 'Officiële bron voor huidige naam, adres, ligging, kamers, resortomvang, zwembaden en tijdelijke werkzaamheden.' },
    ],
  },

  'centara-grand-beach-resort-phuket': {
    slug: 'centara-grand-beach-resort-phuket',
    hotelName: 'Centara Grand Beach Resort Phuket',
    cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/karon/', hotelGuideHref: '/phuket/karon/hotels/', hotelGuideLabel: 'Hotels in Karon',
    area: 'Noord-Karon · direct aan het strand',
    pageTitle: 'Centara Grand Beach Resort Phuket: eerlijk verblijfadvies',
    pageDescription: 'Past Centara Grand Beach Resort Phuket bij je? Vergelijk directe strandtoegang, waterpark, gezinsfaciliteiten, kamers en villa’s.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/karon/hotels/centara-grand-beach-resort-phuket/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/centara-grand-karon-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een familieresort direct aan Karon Beach', imageCaption: 'AI-gegenereerd sfeerbeeld van noord-Karon; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Direct strand en waterpark', title: 'Centara Grand', accent: 'Beach Resort Phuket', subtitle: 'Een complete gezinsbasis op een rustiger deel van Karon Beach.',
      description: 'Centara ligt direct aan het zand en combineert vier zwembaden, waterslides, lazy river en kinderfaciliteiten. De keerzijde van de afgezonderde ligging is dat het centrum van Karon minder vanzelfsprekend te voet bereikbaar is.', ctaLabel: 'Bekijk actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Een sterke strandkeuze wanneer het resort zelf deel van de reis is.',
      description: 'Voor gezinnen zijn strand, waterpark en kidsvoorzieningen de duidelijke troeven. Stellen kunnen het rustigere adults-only zwembad gebruiken, maar het hotel als geheel blijft een uitgesproken familieresort.',
      stats: [
        { label: 'Ligging', value: 'Direct aan zee', note: 'Toegang tot Karon Beach', icon: 'waves' },
        { label: 'Omvang', value: '262 verblijven', note: 'Kamers, suites en villa’s', icon: 'bed' },
        { label: 'Water', value: '4 zwembaden', note: 'Met kinderbad en waterpark', icon: 'waves' },
        { label: 'Karon', value: 'Circa 2 km', note: 'Afstand volgens Centara', icon: 'route' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Veel gemak aan zee, minder dorpsritme voor de deur.', intro: 'Kies dit resort wanneer strand- en zwembaddagen zwaarder wegen dan iedere avond lopend het centrum in gaan.',
      goodFor: ['Gezinnen die waterpark, kinderbad en speelvoorzieningen willen gebruiken', 'Reizigers die directe toegang tot Karon Beach belangrijk vinden', 'Stellen die binnen een familieresort een rustigere zwembadzone waarderen', 'Groepen die een villa met twee slaapkamers en privézwembad gericht vergelijken'],
      tradeoffs: ['Centara noemt circa twee kilometer tot Karon; de ligging is niet midden in het centrum', 'Een rustig adults-only zwembad maakt het hotel zelf niet adults-only', 'Pool suites verschillen sterk in ruimte en maximale bezetting', 'Directe strandtoegang betekent niet dat het openbare strand privé is'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Plan stranddagen hier en bundel uitstappen naar Karon.', description: 'De afgezonderde noordelijke ligging werkt goed voor resorttijd. Controleer de actuele shuttle wanneer je vaak naar winkels of restaurants buiten het hotel wilt.',
      steps: [
        { label: 'Overdag', title: 'Strand en waterpark', description: 'Combineer het strand met zwembaden zodat je niet onnodig reist.' },
        { label: 'Avond', title: 'Kies resort of Karon', description: 'Gebruik een van de zeven horecaplekken of plan vervoer naar het centrum.' },
        { label: 'Uitstap', title: 'Bundel je ritten', description: 'Combineer Karon, Kata of verder Phuket op dezelfde vervoersdag.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Koppel de kamer aan je echte gezelschap.', description: 'De actuele inventaris loopt van Deluxe Garden View tot grote villa’s. Controleer oppervlakte, bedden en maximale bezetting per categorie.',
      checks: [
        { title: 'Basisruimte', description: 'Deluxe Garden View begint bij 49 m² en kan volgens Centara 2 volwassenen en 2 kinderen plaatsen.' },
        { title: 'Privézwembad', description: 'Vergelijk pool suite en villa; een groter gezin past niet automatisch in iedere poolcategorie.' },
        { title: 'Shuttle', description: 'Vraag naar actuele route, tijden en voorwaarden tussen resort en Karon.' },
        { title: 'Kinderfaciliteiten', description: 'Controleer openingstijden en eventuele leeftijdsvoorwaarden voor jouw data.' },
      ],
    },
    faqs: [
      { question: 'Ligt Centara Grand Beach Resort Phuket direct aan het strand?', answer: 'Ja. Centara positioneert het resort direct aan Karon Beach. Spreek wel over directe strandtoegang, niet over een gegarandeerd privéstrand.' },
      { question: 'Hoe ver ligt het resort van het centrum van Karon?', answer: 'De officiële contactpagina noemt circa twee kilometer tot Karon. Controleer de actuele shuttle of plan ander vervoer wanneer je vaak buiten het resort eet.' },
      { question: 'Heeft Centara Grand Phuket een waterpark?', answer: 'Ja. De officiële informatie noemt een lazy river, waterslides, watervallen en een jacuzzi, naast vier zwembaden en een kinderbad.' },
      { question: 'Is Centara Grand Phuket geschikt voor gezinnen?', answer: 'Het resort noemt Camp Safari, E-Zone, een speelplaats en meerdere waterfaciliteiten. Controleer per datum de openingstijden en voorwaarden.' },
      { question: 'Is Centara Grand Phuket adults-only?', answer: 'Nee. Het is een familieresort. Er is wel een zwembadzone die Centara als rustig en adults-only omschrijft.' },
      { question: 'Welke kamer past bij een groter gezin?', answer: 'Controleer eerst de maximale bezetting. De grotere villa’s met twee slaapkamers bieden meer capaciteit dan de meeste private-pool suites, maar bedopstelling en beschikbaarheid verschillen per datum.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Baseer je keuze op de actuele bezetting, shuttle en geopende faciliteiten, niet op oude kamer- of prijsinformatie.',
    relatedGuides: relatedKaronGuides,
    sources: [
      { title: 'Centara Grand Beach Resort Phuket', creator: 'Centara Hotels & Resorts', url: 'https://www.centarahotelsresorts.com/centaragrand/cpbr', note: 'Officiële ligging, faciliteiten, restaurants en resortpositionering.' },
      { title: 'Accommodation', creator: 'Centara Hotels & Resorts', url: 'https://www.centarahotelsresorts.com/centaragrand/cpbr/accommodation', note: 'Actuele kamers, suites, villa’s, oppervlaktes en bezetting.' },
      { title: 'Property factsheet', creator: 'Centara Hotels & Resorts', url: 'https://www.centarahotelsresorts.com/sites/centara-global/files/2025-10/13499_CPBR_Fact_Sheet_Y25_10_01.pdf', note: 'Primaire factsheet voor omvang, zwembaden, horeca en gezinsfaciliteiten.' },
    ],
  },

  'mandarava-resort-and-spa-karon-beach': {
    slug: 'mandarava-resort-and-spa-karon-beach', hotelName: 'Mandarava Resort and Spa Karon Beach', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/karon/', hotelGuideHref: '/phuket/karon/hotels/', hotelGuideLabel: 'Hotels in Karon',
    area: 'Heuvels boven Karon Beach',
    pageTitle: 'Mandarava Resort Karon: past dit heuvelresort bij je?',
    pageDescription: 'Eerlijk verblijfadvies over Mandarava Resort Karon: heuvels, strandshuttle, vijf zwembaden, pool access en kamertypes.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/karon/hotels/mandarava-resort-and-spa-karon-beach/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/mandarava-karon-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van villa’s en infinity pools op een groene heuvel bij Karon', imageCaption: 'AI-gegenereerd sfeerbeeld van een heuvelresort in Karon; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Groene heuvel, niet beachfront', title: 'Mandarava Resort', accent: 'Karon Beach', subtitle: 'Veel ruimte en vijf zwembaden, met hoogteverschil als belangrijkste afweging.',
      description: 'Mandarava telt 232 kamers in 55 villa’s en ligt volgens het hotel 700 meter van Karon Beach. De gratis strandshuttle helpt, maar de verspreide ligging maakt de exacte kamerpositie belangrijk.', ctaLabel: 'Vergelijk actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Kies dit voor groen, ruimte en resorttijd boven het strand.',
      description: 'Mandarava past bij reizigers die een heuvelresort bewust verkiezen boven directe strandligging. Vijf infinity pools spreiden het resortgevoel; vraag bij mobiliteit of kleine kinderen gericht naar een praktische kamerlocatie.',
      stats: [
        { label: 'Strand', value: 'Circa 700 m', note: 'Plus gratis hotelshuttle', icon: 'route' },
        { label: 'Omvang', value: '232 kamers', note: 'Verdeeld over 55 villa’s', icon: 'bed' },
        { label: 'Zwembaden', value: '5 infinity pools', note: 'Op verschillende hellingen', icon: 'waves' },
        { label: 'Ruimte', value: 'Veelal 55 m²', note: 'Plus grotere privépoolvilla', icon: 'sparkles' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Een groene resortbasis voor wie een helling accepteert.', intro: 'De villa-opzet en verschillende zwembadniveaus geven sfeer, maar maken ligging binnen het terrein belangrijker dan bij een compact hotel.',
      goodFor: ['Stellen die groen en zwembadtijd belangrijker vinden dan beachfront', 'Reizigers die een ruime kamer of echte privépoolvilla zoeken', 'Wie de gratis strandshuttle graag gebruikt', 'Gasten die meerdere dagen in en rond het resort willen blijven'],
      tradeoffs: ['Het hotel ligt op een heuvel en niet direct aan het strand', 'De officiële site bevestigt geen vaste shuttlefrequentie of eindtijd', 'Pool access betekent toegang tot een gedeeld zwembad, niet altijd een privépool', 'Een kamer hoog of ver op het terrein kan praktisch anders uitpakken dan een kamer bij de lobby'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Laat kamerpositie en shuttle samen je dag bepalen.', description: 'Het strand ligt op circa 700 meter. Controleer de actuele shuttle en vraag vooraf om een passende plek op het terrein wanneer hoogteverschil belangrijk is.',
      steps: [
        { label: 'Vooraf', title: 'Vraag om kamerlocatie', description: 'Benoem mobiliteit, kinderwagen of voorkeur voor lobby, zwembad of lager niveau.' },
        { label: 'Strand', title: 'Check de shuttle', description: 'Laat de actuele heen- en terugtijden bij aankomst bevestigen.' },
        { label: 'Resort', title: 'Kies een zwembad', description: 'Gebruik het dichtstbijzijnde bad of verken bewust de verschillende niveaus.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Lees pool access en private pool letterlijk.', description: 'De actuele inventaris gebruikt verschillende namen voor uitzicht, verdieping en toegang tot water. Vergelijk de volledige categorie, niet alleen het woord “pool”.',
      checks: [
        { title: 'Categorie', description: 'Vergelijk Tropicana, Panoramic, Seafan, Coral, Horizon, Aqua en Sea Pearl op ligging en toegang.' },
        { title: 'Pool access', description: 'Aqua en Sea Pearl geven toegang tot water; controleer of dit gedeeld of privé is.' },
        { title: 'Privépoolvilla', description: 'Andaman Private Pool Villa is 120 m² met een eigen zwembad en aparte woonruimte.' },
        { title: 'Toekomstige faciliteit', description: 'Palm & Sky staat aangekondigd voor 1 september 2026 en mag vóór opening niet als beschikbaar gelden.' },
      ],
    },
    faqs: [
      { question: 'Ligt Mandarava Resort direct aan Karon Beach?', answer: 'Nee. De officiële site noemt ongeveer 700 meter tot het strand. Het hotel biedt een gratis shuttle, maar publiceert geen vaste actuele frequentie op de geraadpleegde pagina.' },
      { question: 'Is Mandarava Resort heuvelachtig?', answer: 'Ja. De villa’s en vijf zwembaden liggen op verschillende hellingen. Vraag het hotel om een praktisch gelegen kamer wanneer hoogteverschil meespeelt.' },
      { question: 'Hoeveel zwembaden heeft Mandarava?', answer: 'De actuele officiële site noemt vijf infinity pools. Oude vermeldingen van negen verbonden zwembaden zijn niet actueel.' },
      { question: 'Heeft iedere pool-accesskamer een privézwembad?', answer: 'Nee. Pool access en een volledig privézwembad zijn verschillende producten. Controleer de precieze beschrijving van Aqua, Sea Pearl of de Andaman Private Pool Villa.' },
      { question: 'Welke kamer is geschikt als extra ruimte belangrijk is?', answer: 'Veel actuele kamers zijn ongeveer 55 m². De Andaman Private Pool Villa is 120 m² en heeft een aparte slaap- en woonruimte; controleer altijd de maximale bezetting.' },
      { question: 'Is de strandshuttle de hele dag beschikbaar?', answer: 'De officiële site bevestigt een gratis shuttle, maar geen vaste frequentie of eindtijd. Vraag het actuele schema voor jouw verblijfsdata rechtstreeks aan het hotel.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Controleer vooral kamerpositie, zwembadtype en shuttle; die bepalen hoe praktisch het resort voor jou is.',
    relatedGuides: relatedKaronGuides,
    sources: [
      { title: 'Mandarava Resort and Spa', creator: 'Mandarava Resort and Spa', url: 'https://www.mandaravaresort.com/', note: 'Officiële bron voor ligging, omvang, zwembaden, kamertypes, shuttle en faciliteiten.' },
    ],
  },

  'beyond-resort-karon': {
    slug: 'beyond-resort-karon', hotelName: 'Beyond Karon', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/karon/', hotelGuideHref: '/phuket/karon/hotels/', hotelGuideLabel: 'Hotels in Karon',
    area: 'Zuid-Karon · direct aan het strand',
    pageTitle: 'Beyond Karon: adults-only aan het strand',
    pageDescription: 'Past Beyond Karon bij je? Eerlijk advies over de 18+-regel, directe strandligging, 81 kamers en actuele sea-view- en poolcategorieën.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/karon/hotels/beyond-resort-karon/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/beyond-karon-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een compact adults-only hotel aan Karon Beach', imageCaption: 'AI-gegenereerd sfeerbeeld van een strandhotel in Karon; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Adults-only en beachfront', title: 'Beyond', accent: 'Karon', subtitle: 'Een compacte 18+-basis waar zeezicht en strand de hoofdrol spelen.',
      description: 'Beyond Karon verwelkomt uitsluitend gasten van 18 jaar en ouder en telt 81 kamers. Kies dit hotel voor directe strandligging; vergelijk de actuele sea-view-, pool- en suitecategorieën zorgvuldig.', ctaLabel: 'Controleer actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Sterk voor volwassenen die strand boven resortomvang zetten.',
      description: 'De combinatie van 18+, 81 kamers en directe ligging aan Karon Beach maakt de keuze helder. Wie met kinderen reist of een groot familieresort met veel activiteiten zoekt, valt direct af.',
      stats: [
        { label: 'Minimumleeftijd', value: '18+', note: 'Volgens de officiële hotelpagina', icon: 'sparkles' },
        { label: 'Ligging', value: 'Beachfront', note: 'Direct aan Karon Beach', icon: 'waves' },
        { label: 'Omvang', value: '81 kamers', note: 'Compactere strandproperty', icon: 'bed' },
        { label: 'Kamers', value: 'Sea view & pool', note: 'Plus suites', icon: 'map' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Een duidelijke keuze zonder gezinscompromis.', intro: 'Beyond Karon richt zich op volwassen gasten die strand, zeezicht en een compactere hotelopzet waarderen.',
      goodFor: ['Stellen en volwassen reisgenoten die direct aan Karon Beach willen slapen', 'Wie een 18+-hotel expliciet belangrijk vindt', 'Reizigers die zeezicht of pool access gericht willen vergelijken', 'Gasten die een kleiner hotel verkiezen boven een groot familiecomplex'],
      tradeoffs: ['Gasten jonger dan 18 jaar worden niet toegelaten', 'Pool access betekent niet automatisch een privézwembad', 'Beachfront garandeert geen specifieke zeecondities of rustig openbaar strand', 'De officiële site maakt promotionele sfeerclaims; beoordeel kamer en voorwaarden afzonderlijk'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Laat het strand je vaste vertrekpunt zijn.', description: 'Het hotel ligt aan Karon Beach. Plan verder vervoer op Phuket los van de strandligging en controleer de route naar adressen die jij belangrijk vindt.',
      steps: [
        { label: 'Ochtend', title: 'Begin aan zee', description: 'Gebruik de directe strandligging voordat je vervoer naar andere delen van Phuket plant.' },
        { label: 'Karon', title: 'Controleer jouw route', description: 'Bekijk op de kaart de afstand tot restaurants of winkels die je echt wilt bezoeken.' },
        { label: 'Eilanddag', title: 'Reserveer vervoer', description: 'Voor Phuket Old Town en andere kustplaatsen blijft taxi, transfer of huurauto nodig.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Kies uitzicht en watertoegang als aparte beslissingen.', description: 'De actuele lijst bevat Deluxe Seaview, Deluxe Premier Seaview, Deluxe Pool, Deluxe, Junior Suite en Seaview Suite.',
      checks: [
        { title: 'Leeftijd', description: 'Controleer dat alle gasten bij aankomst minimaal 18 jaar zijn.' },
        { title: 'Uitzicht', description: 'Baseer zeezicht alleen op de exacte categorie, niet op algemene hotelfoto’s.' },
        { title: 'Poolcategorie', description: 'Controleer of “Deluxe Pool” gedeelde toegang of andere waterligging betekent.' },
        { title: 'Tariefvoorwaarden', description: 'Vergelijk ontbijt, annulering, belastingen en eventuele directe voordelen.' },
      ],
    },
    faqs: [
      { question: 'Is Beyond Karon adults-only?', answer: 'Ja. De huidige officiële hotelpagina vermeldt dat uitsluitend gasten van 18 jaar en ouder welkom zijn.' },
      { question: 'Ligt Beyond Karon direct aan het strand?', answer: 'Ja. Het hotel positioneert zich direct aan Karon Beach. Het strand zelf is openbaar en zeecondities kunnen per seizoen en dag verschillen.' },
      { question: 'Hoeveel kamers heeft Beyond Karon?', answer: 'De actuele officiële site noemt 81 kamers. Oude vermeldingen van 192 kamers horen niet bij de huidige propertyinformatie.' },
      { question: 'Hebben alle kamers zeezicht?', answer: 'De hotelpagina legt sterk de nadruk op zeezicht, maar je moet het uitzicht per exacte categorie controleren. Kies een expliciete Seaview-categorie wanneer dit doorslaggevend is.' },
      { question: 'Heeft een Deluxe Pool-kamer een privézwembad?', answer: 'Dat mag je niet uit de naam alleen afleiden. Controleer op de actuele kamerpagina of het om gedeelde pool access of een andere zwembadligging gaat.' },
      { question: 'Is Beyond Karon geschikt voor gezinnen?', answer: 'Niet voor gezinnen met minderjarigen, omdat de minimumleeftijd 18 jaar is. Volwassen familieleden of vrienden kunnen wel samen reizen, afhankelijk van de kamerbezetting.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'De leeftijdsgrens en exacte kamerbeschrijving zijn hier de twee belangrijkste boekingscontroles.',
    relatedGuides: relatedKaronGuides,
    sources: [
      { title: 'Beyond Karon', creator: 'Beyond Resorts', url: 'https://www.beyondresort.com/karon/', note: 'Officiële bron voor huidige naam, 18+-beleid, ligging, aantal kamers, categorieën en faciliteiten.' },
      { title: 'Kata Group', creator: 'Kata Group Resorts', url: 'https://www.katagroup.com/', note: 'Officiële merkbron voor de huidige hotelgroep en propertyidentiteit.' },
    ],
  },

  'avista-grande-karon-mgallery': {
    slug: 'avista-grande-karon-mgallery', hotelName: 'Avista Grande Phuket Karon – MGallery', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/karon/', hotelGuideHref: '/phuket/karon/hotels/', hotelGuideLabel: 'Hotels in Karon',
    area: 'Zuid-Karon · nabij Karon Beach',
    pageTitle: 'Avista Grande Karon MGallery: eerlijk verblijfadvies',
    pageDescription: 'Past Avista Grande Phuket Karon MGallery bij je? Vergelijk strandroute, 159 ruime kamers, family rooms, pool access en suites.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/karon/hotels/avista-grande-karon-mgallery/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/avista-grande-karon-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een stijlvol hotelzwembad bij zuidelijk Karon Beach', imageCaption: 'AI-gegenereerd sfeerbeeld van een hotel in zuid-Karon; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Ruime kamers nabij het strand', title: 'Avista Grande', accent: 'Karon MGallery', subtitle: 'Design, gezinskamers en suites op korte loopafstand van Karon Beach.',
      description: 'MGallery noemt 159 kamers en suites die beginnen bij 53 m². Het hotel ligt niet direct op het zand; Accor noemt ongeveer twee minuten lopen naar Karon Beach en tien minuten naar Kata Beach.', ctaLabel: 'Vergelijk actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Sterk voor ruimte en kamerkeuze, zonder beachfront-premie als hoofdzaak.',
      description: 'Avista Grande past bij stellen, gezinnen en groepen die ruime kamers en een korte strandroute combineren. De belangrijkste boekingsfout is pool access verwarren met een privézwembad of een view aannemen die niet bij de gekozen categorie hoort.',
      stats: [
        { label: 'Omvang', value: '159 verblijven', note: 'Kamers en suites', icon: 'bed' },
        { label: 'Basiskamer', value: 'Vanaf 53 m²', note: 'Ruim voor Karon', icon: 'sparkles' },
        { label: 'Karon Beach', value: 'Circa 2 min', note: 'Hotelopgave van Accor', icon: 'route' },
        { label: 'Zwembad', value: 'Hoofd- en kinderbad', note: 'Geen rooftop infinity pool', icon: 'waves' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Kies op ruimte, bedden en uitzicht.', intro: 'De inventaris loopt van ruime kamers tot pool-accesssuites en een suite met twee slaapkamers. Daardoor is de exacte categorie belangrijker dan het algemene MGallery-label.',
      goodFor: ['Gezinnen die een king- plus queenbed en bezetting tot vier gericht zoeken', 'Groepen die een tweeslaapkamersuite met woonruimte en kitchenette willen', 'Stellen die sea view, whirlpool of pool access bewust vergelijken', 'Reizigers die Karon en Kata vanaf één zuidelijke basis willen combineren'],
      tradeoffs: ['Het hotel ligt nabij het strand, maar niet direct aan het zand', 'Mountain, pool en sea view horen bij specifieke categorieën', 'Pool access geeft toegang tot een gedeeld zwembad en is geen privépool', 'De overdekte parkeerplaats heeft volgens Accor slechts twintig plekken'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Karon dichtbij, Kata binnen een langere wandeling.', description: 'Gebruik de korte route naar Karon Beach voor stranddagen. Accor noemt Kata Beach op ongeveer tien minuten lopen; controleer zelf of die route bij jouw tempo en gezelschap past.',
      steps: [
        { label: 'Karon', title: 'Loop naar het strand', description: 'Vraag bij aankomst naar de praktische voetgangersroute vanaf de hoteluitgang.' },
        { label: 'Kata', title: 'Plan op comfort', description: 'Neem warmte, verkeer en bagage mee in de keuze tussen lopen en kort vervoer.' },
        { label: 'Met auto', title: 'Bevestig parking', description: 'Reserveer of vraag vooraf naar beschikbaarheid vanwege het beperkte aantal plaatsen.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Kamernaam, bedopstelling en bezetting moeten alle drie kloppen.', description: 'De actuele MGallery-inventaris onderscheidt mountain, sea en pool view, family rooms, whirlpools, pool access en grotere suites.',
      checks: [
        { title: 'Gezinskamer', description: 'Controleer king plus queen, maximale bezetting en voorwaarden voor kinderen.' },
        { title: 'Pool access', description: 'Bevestig gedeelde toegang, verdieping, terras en privacy van de gekozen suite.' },
        { title: 'Twee slaapkamers', description: 'De Avista Suite is 105 m² en biedt woon-/eetruimte en kitchenette; controleer de bedden voor jouw groep.' },
        { title: 'Parkeren', description: 'Accor noemt twintig overdekte plaatsen; vraag vooraf beschikbaarheid wanneer je rijdt.' },
      ],
    },
    faqs: [
      { question: 'Ligt Avista Grande Karon direct aan het strand?', answer: 'Nee. Het hotel ligt nabij Karon Beach. Accor noemt ongeveer twee minuten lopen; de precieze route hangt af van hoteluitgang en jouw tempo.' },
      { question: 'Hoeveel kamers heeft Avista Grande Karon?', answer: 'De huidige officiële MGallery-pagina noemt 159 kamers en suites. Oudere vermeldingen van 158 kamers zijn niet meer de actuele merkclaim.' },
      { question: 'Is Avista Grande Karon geschikt voor gezinnen?', answer: 'Ja, verschillende Family Rooms hebben een king- en queenbed en een maximale bezetting tot vier gasten. Controleer per tarief de leeftijds- en bezettingsvoorwaarden.' },
      { question: 'Heeft Avista Grande Karon een rooftop infinity pool?', answer: 'De officiële pagina noemt een hoofdzwembad met marmeren waterval en een kinderbad. The Dim Sun is de rooftop bar; behandel dit niet als bewijs voor een rooftop infinity pool.' },
      { question: 'Is pool access hetzelfde als een privézwembad?', answer: 'Nee. De pool-accesscategorieën bieden toegang tot een zwembad, maar worden niet als volledig privézwembad beschreven. Controleer terras, privacy en gedeeld gebruik.' },
      { question: 'Welke kamer past bij vijf gasten?', answer: 'De Avista Suite met twee slaapkamers is 105 m² en wordt tot vijf gasten vermeld. Controleer de actuele bedopstelling en maximale aantallen volwassenen en kinderen voor jouw boeking.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Vergelijk de live kamerinventaris omdat uitzicht, bedden en pool access per categorie verschillen.',
    relatedGuides: relatedKaronGuides,
    sources: [
      { title: 'Avista Grande Phuket Karon – MGallery', creator: 'MGallery', url: 'https://mgallery.accor.com/en/hotels/A224.html', note: 'Officiële merkbron voor ligging, omvang, ontwerp, kamers, zwembaden en horeca.' },
      { title: 'Avista Grande Phuket Karon', creator: 'Accor', url: 'https://all.accor.com/hotel/A224/index.en.shtml', note: 'Officiële booking- en faciliteitenbron voor loopafstanden, parking en actuele kamercategorieën.' },
      { title: 'Avista Grande Phuket Karon Resort', creator: 'Avista Hotels & Resorts', url: 'https://www.avistagrandephuketresort.com/', note: 'Officiële propertysite voor actuele accommodatie- en faciliteitsinformatie.' },
    ],
  },
};

export function getNlKaronHotelDetailGuide(slug: string): HotelDetailGuideData | undefined {
  return nlKaronHotelDetailGuides[slug];
}
