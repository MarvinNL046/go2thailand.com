import type { HotelDetailGuideData } from './types';

const relatedPatongGuides = [
  {
    title: 'Waar verblijven in Patong?',
    description: 'Vergelijk noord, centrum en zuid op strand, avondleven en hoteltype.',
    href: '/phuket/patong/hotels/',
    image: '/images/redesign/phuket-hotels-hero.webp',
    imageAlt: 'Patong Beach en de bebouwde westkust van Phuket',
  },
  {
    title: 'Patong als reisbasis',
    description: 'Plan strand, winkels, avondleven en vervoer zonder onnodig heen en weer te reizen.',
    href: '/phuket/patong/',
    image: '/images/redesign/patong-area-hero-v2.webp',
    imageAlt: 'Patong Beach bij warm avondlicht',
  },
  {
    title: 'Phuket reisgids',
    description: 'Combineer Patong met andere stranden, Phuket Old Town en een haalbare eilandroute.',
    href: '/city/phuket/',
    image: '/images/redesign/phuket-destination-hero-v2.webp',
    imageAlt: 'Tropische kust van Phuket met helder water',
  },
];

export const nlPatongBHotelDetailGuides: Record<string, HotelDetailGuideData> = {
  'andaman-embrace-patong': {
    slug: 'andaman-embrace-patong', hotelName: 'Andaman Embrace Patong', cityName: 'Phuket', citySlug: 'phuket',
    destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong', area: 'Noord-centraal Patong · Hadpatong Road',
    pageTitle: 'Andaman Embrace Patong: past dit hotel bij je?',
    pageDescription: 'Eerlijk verblijfadvies over Andaman Embrace Patong: strandafstand, twee vleugels, familiekamers, pool access en kinderfaciliteiten.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/andaman-embrace-patong/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/andaman-embrace-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van twee zwembadzones in een gezinsvriendelijk hotel bij Patong Beach', imageCaption: 'AI-gegenereerd sfeerbeeld van een hotel in Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Twee vleugels, twee zwembaden', title: 'Andaman Embrace', accent: 'Patong', subtitle: 'Een strandnabije basis waar de gekozen vleugel je verblijf bepaalt.',
      description: 'Het hotel ligt volgens de actuele factsheet op korte loopafstand van Patong Beach. De Andaman Wing en Premier Wing hebben elk een zwembad en verschillende kamertypes, waardoor je eerst de juiste vleugel en daarna pas het tarief kiest.', ctaLabel: 'Vergelijk actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Sterk voor gezinnen en groepen die ruimte nabij het strand zoeken.',
      description: 'Andaman Embrace combineert twee zwembadzones met een playroom, waterglijbanen en kamers tot een suite met twee slaapkamers. De actuele factsheet noemt 202 kamers, niet de 297 uit oudere data.',
      stats: [
        { label: 'Strand', value: 'Korte wandeling', note: 'Volgens hotel circa 1–2 minuten', icon: 'waves' },
        { label: 'Omvang', value: '202 kamers', note: 'Volgens actuele factsheet', icon: 'bed' },
        { label: 'Zwembaden', value: '2 zones', note: 'Eén per hotelvleugel', icon: 'waves' },
        { label: 'Gezinnen', value: 'Playroom', note: 'Plus speelplek en glijbanen', icon: 'sparkles' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Kies de vleugel die bij jouw kamerwens past.', intro: 'De Andaman Wing bevat onder meer gerenoveerde Elite Balcony- en grotere suites; de Premier Wing biedt Premier Balcony en semi-private pool access.',
      goodFor: ['Gezinnen die een playroom, kinderspeelplek en waterglijbanen gebruiken', 'Groepen die connecting rooms of een suite met twee slaapkamers zoeken', 'Stellen die een ruime pool-accesskamer bewust willen boeken', 'Reizigers die strand en centrum te voet willen combineren'],
      tradeoffs: ['Twee vleugels betekenen dat kamer, zwembad en faciliteiten niet automatisch naast elkaar liggen', 'Pool Access wordt als semi-private toegang tot Zodiac Pool beschreven, niet als volledig privézwembad', 'Een groot hotel met gezinsfaciliteiten is minder intiem dan een klein boetiekhotel', 'Openingstijden en beschikbaarheid van kinder- en spafaciliteiten moeten live worden gecontroleerd'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Strand dichtbij, Patong binnen loopbereik.', description: 'De officiële factsheet noemt Patong Beach op ongeveer één minuut, en Jungceylon en Bangla op ongeveer tien minuten lopen. Behandel dit als hotelopgave; tempo en route verschillen.',
      steps: [
        { label: 'Strand', title: 'Gebruik de korte route', description: 'Vraag bij aankomst welke uitgang vanuit jouw vleugel het handigst is.' },
        { label: 'Centrum', title: 'Bundel winkels en avond', description: 'Combineer Jungceylon en Bangla in één wandeling in plaats van meerdere losse ritten.' },
        { label: 'Buiten Patong', title: 'Plan vervoer', description: 'Voor Phuket Old Town en andere stranden blijft taxi, transfer of huurauto nodig.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Controleer vleugel, kamertype en zwembadtoegang.', description: 'De huidige inventaris wijkt af van oudere generieke kamerlabels. Vergelijk de officiële naam en bedopstelling per kamer.',
      checks: [
        { title: 'Andaman Wing', description: 'Vergelijk Andaman Deluxe, Elite Balcony, Family Suite en Embrace Suite.' },
        { title: 'Premier Wing', description: 'Kies tussen Premier Balcony en Pool Access van 61 m² met semi-private waterzone.' },
        { title: 'Gezinsopstelling', description: 'Controleer slaapkamers, connecting door en maximale bezetting voor jouw groep.' },
        { title: 'Actuele faciliteiten', description: 'Bevestig playroom, glijbanen, fitness, spa en zwembaduren voor jouw data.' },
      ],
    },
    faqs: [
      { question: 'Hoe ver ligt Andaman Embrace Patong van het strand?', answer: 'Het hotel noemt ongeveer één tot twee minuten lopen naar Patong Beach. De exacte route hangt af van de vleugel, uitgang en jouw tempo.' },
      { question: 'Hoeveel kamers heeft Andaman Embrace Patong?', answer: 'De actuele officiële factsheet noemt 202 kamers. Een oudere vermelding van 297 kamers moet daarom niet worden gebruikt.' },
      { question: 'Wat is het verschil tussen de Andaman Wing en Premier Wing?', answer: 'De vleugels hebben ieder een eigen zwembad en andere kamertypes. De Premier Wing bevat onder meer Premier Balcony en Pool Access; de Andaman Wing onder meer Elite Balcony, Family Suite en Embrace Suite.' },
      { question: 'Heeft een Pool Access-kamer een privézwembad?', answer: 'Het hotel beschrijft de Pool Access-kamers als semi-private toegang tot Zodiac Pool. Dat is niet hetzelfde als een volledig privézwembad.' },
      { question: 'Is Andaman Embrace geschikt voor gezinnen?', answer: 'De officiële site noemt een playroom, speelplekken, waterglijbanen en familiekamers. Controleer openingstijden en maximale kamerbezetting voor jouw data.' },
      { question: 'Welke kamer past bij een groter reisgezelschap?', answer: 'Bekijk de Family Suite, connecting rooms en de Embrace Suite met twee slaapkamers. Controleer per boeking de bedden en toegestane aantallen volwassenen en kinderen.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'De vleugel en exacte kameropstelling zijn hier belangrijker dan een algemeen sterrenlabel.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Andaman Embrace Patong', creator: 'Andaman Embrace Patong', url: 'https://www.andamanembrace.com/', note: 'Officiële kamers, vleugels, zwembadindeling en gezinspositionering.' },
      { title: 'Facilities & Services', creator: 'Andaman Embrace Patong', url: 'https://www.andamanembrace.com/facilities-services/', note: 'Officiële zwembaden, kinderfaciliteiten en services.' },
      { title: 'Hotel factsheet', creator: 'Andaman Embrace Patong', url: 'https://www.andamanembrace.com/pdf/factsheet_EN.pdf', note: 'Primaire factsheet voor 202 kamers, oppervlaktes, ligging en kamerverdeling.' },
    ],
  },

  'ramada-by-wyndham-phuket-deevana-patong': {
    slug: 'ramada-by-wyndham-phuket-deevana-patong', hotelName: 'Ramada by Wyndham Phuket Deevana Patong', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong', area: 'Noord-centraal Patong · Raj-U-Thid 200 Pee Road',
    pageTitle: 'Ramada Phuket Deevana Patong: eerlijk verblijfadvies',
    pageDescription: 'Past Ramada by Wyndham Phuket Deevana Patong bij je? Vergelijk ligging, Deluxe-, Premier- en Junior-kamers, zwembad, spa en kidsclub.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/ramada-by-wyndham-phuket-deevana-patong/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/ramada-deevana-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een modern stadshotel met zwembad in Patong', imageCaption: 'AI-gegenereerd sfeerbeeld van een hotel in Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Wyndham-basis dicht bij Patong', title: 'Ramada Phuket', accent: 'Deevana Patong', subtitle: 'Zwembad, spa en kidsclub zonder directe strandligging te claimen.',
      description: 'Wyndham positioneert het hotel dicht bij Patong Beach, winkels en avondleven. De officiële propertysite toont drie actuele kamerlijnen: Deluxe, Premier en Junior, naast zwembad, wellness en kinderfaciliteiten.', ctaLabel: 'Controleer actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Een functionele merkkeuze met voldoende hotelvoorzieningen.', description: 'Kies Ramada wanneer je Wyndham, zwembad, fitness, spa en kidsclub in één Patong-basis wilt. Boek niet op oude claims over meerdere zwembaden, een gerenoveerde toren of standaard inbegrepen ontbijt: die zijn niet door de actuele primaire pagina’s bevestigd.',
      stats: [
        { label: 'Ligging', value: 'Centraal Patong', note: 'Raj-U-Thid 200 Pee Road', icon: 'map' },
        { label: 'Kamers', value: '3 lijnen', note: 'Deluxe, Premier en Junior', icon: 'bed' },
        { label: 'Water', value: 'Zwembad + whirlpool', note: 'Met poolside bar', icon: 'waves' },
        { label: 'Faciliteiten', value: 'Spa & fitness', note: 'Plus kidsclub', icon: 'sparkles' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Meer hotel dan slaapbasis, minder dan een strandresort.', intro: 'De kracht is een herkenbaar merk met recreatie en horeca op het terrein, terwijl Patong buiten de deur bereikbaar blijft.',
      goodFor: ['Wyndham Rewards-reizigers die merkvoorwaarden gericht vergelijken', 'Gezinnen die een kidsclub en zwembad belangrijk vinden', 'Stellen die fitness, spa en horeca op het terrein willen', 'Reizigers die niet iedere dag een volledig resortprogramma nodig hebben'],
      tradeoffs: ['Wyndham zegt “steps away”, maar publiceert geen stabiele exacte looptijd naar het strand', 'De huidige officiële kamerlijst toont geen Family Suite of Pool Access Room', 'Ontbijt is niet aantoonbaar bij ieder tarief inbegrepen', 'Hotel en merkpagina gebruiken soms verschillende marketingdetails; laat de live kamerinventaris beslissen'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Gebruik Patong te voet waar de route past.', description: 'Het adres ligt aan Raj-U-Thid 200 Pee Road. Controleer je eigen looproute naar strand, Jungceylon en Bangla in plaats van oude vaste minuten over te nemen.',
      steps: [
        { label: 'Overdag', title: 'Strand of zwembad', description: 'Kies per dag of de route naar zee opweegt tegen tijd aan het hotelbad.' },
        { label: 'Avond', title: 'Loop gericht', description: 'Bundel eten, winkels en avondleven op dezelfde route door Patong.' },
        { label: 'Verder weg', title: 'Reserveer vervoer', description: 'Plan taxi, transfer of huurauto voor luchthaven, Old Town en andere stranden.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Gebruik alleen de actuele drie kamerlijnen.', description: 'De officiële propertysite toont Deluxe Room, Premier Room en Junior Room. Vergelijk bedtype, balkon, uitzicht en bezetting in de live boekingsmodule.',
      checks: [
        { title: 'Kamertype', description: 'Controleer of Deluxe, Premier of Junior aantoonbaar meerwaarde geeft voor jouw verblijf.' },
        { title: 'Ontbijt', description: 'Vergelijk dezelfde kamer met en zonder ontbijt; neem geen inbegrepen maaltijd aan.' },
        { title: 'Rewards', description: 'Controleer welke Wyndham Rewards-voordelen alleen bij een kwalificerende directe boeking gelden.' },
        { title: 'Kidsclub en spa', description: 'Vraag naar actuele uren, voorwaarden en behandelingsbeschikbaarheid.' },
      ],
    },
    faqs: [
      { question: 'Ligt Ramada Phuket Deevana direct aan Patong Beach?', answer: 'Nee. Wyndham positioneert het hotel dicht bij Patong Beach, maar niet als beachfront. Controleer de actuele looproute op de kaart.' },
      { question: 'Welke kamertypes heeft Ramada Phuket Deevana?', answer: 'De officiële propertysite toont momenteel Deluxe Room, Premier Room en Junior Room. Gebruik de live boekingsmodule voor bedden, bezetting en beschikbaarheid.' },
      { question: 'Heeft het hotel meerdere zwembaden?', answer: 'De huidige Wyndham-pagina noemt een hotelzwembad met whirlpool. Een oudere claim over meerdere zwembaden is niet voldoende bevestigd.' },
      { question: 'Is er een spa en fitnessruimte?', answer: 'Ja. Wyndham noemt een fitnesscentrum en wellness spa; de officiële propertysite beschrijft Orientala Spa met drie behandelkamers.' },
      { question: 'Is Ramada Phuket Deevana geschikt voor kinderen?', answer: 'Wyndham noemt een kidsclub en zwembad. Controleer de actuele openingstijden en de maximale bezetting van jouw kamer.' },
      { question: 'Is ontbijt altijd inbegrepen?', answer: 'Dat is niet aangetoond voor ieder tarief. Vergelijk de live prijsvoorwaarden van exact dezelfde kamer en verblijfsdata.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Controleer kamertype, maaltijden en Rewards-voorwaarden in dezelfde live boeking.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Ramada by Wyndham Phuket Deevana', creator: 'Wyndham Hotels & Resorts', url: 'https://www.wyndhamhotels.com/en-uk/ramada/phuket-thailand/ramada-phuket-deevana/overview', note: 'Officiële merkbron voor identiteit, adres, ligging en faciliteiten.' },
      { title: 'Ramada Phuket Deevana', creator: 'Ramada Phuket Deevana', url: 'https://www.ramadaphuketdeevana.com/', note: 'Officiële propertysite voor actuele kamerlijnen en hotelvoorzieningen.' },
      { title: 'Orientala Spa', creator: 'Ramada Phuket Deevana', url: 'https://www.ramadaphuketdeevana.com/spa.html', note: 'Officiële spa-informatie en behandelkamers.' },
    ],
  },

  'patong-signature-boutique-hotel': {
    slug: 'patong-signature-boutique-hotel', hotelName: 'Patong Signature Boutique Hotel', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong', area: 'Zuid-Patong · Thaweewong Road',
    pageTitle: 'Patong Signature Boutique Hotel: past dit hotel bij je?',
    pageDescription: 'Eerlijk verblijfadvies over Patong Signature Boutique Hotel: zuid-Patong, rooftop pool, zeezicht, private-poolstudio en connecting opties.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/patong-signature-boutique-hotel/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/patong-signature-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een rooftop pool met uitzicht over Patong Beach', imageCaption: 'AI-gegenereerd sfeerbeeld van zuid-Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Zeezicht aan de zuidkant', title: 'Patong Signature', accent: 'Boutique Hotel', subtitle: 'Een compact hotel waar de kamerkeuze belangrijker is dan een lang faciliteitenlijstje.',
      description: 'De officiële site legt de nadruk op een rooftop infinity pool, zeezicht en verschillende studio- en connectingopties. Het is geen klassiek resort met meerdere zwembaden of een grote spa.', ctaLabel: 'Bekijk actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Sterk voor uitzicht en een specifieke kamer, niet voor resortomvang.', description: 'Kies Patong Signature wanneer zuid-Patong, rooftop pool en zeezicht bij je plan passen. De kamers verschillen sterk: van een compacte Superior tot een private-poolstudio en rooftop appartement voor een groep.',
      stats: [
        { label: 'Zone', value: 'Zuid-Patong', note: 'Rustiger dan het directe Bangla-gebied', icon: 'map' },
        { label: 'Zwembad', value: 'Rooftop infinity', note: 'Met uitzicht over de Andamanzee', icon: 'waves' },
        { label: 'Kamers', value: '26–70 m²', note: 'Afgerond uit officiële ft²-opgaven', icon: 'bed' },
        { label: 'Groepen', value: 'Tot 4 + 2', note: 'Connecting studio of appartement', icon: 'sparkles' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Boek hier op kamertype en ligging.', intro: 'De verschillen tussen partial sea view, vol sea view, private pool en connecting ruimte zijn groter dan bij een standaard stadshotel.',
      goodFor: ['Stellen die een rooftop pool en expliciet zeezicht waarderen', 'Gezinnen die een connecting studio of rooftop appartement gericht vergelijken', 'Reizigers die zuid-Patong verkiezen boven midden in de uitgaanszone', 'Wie een private-poolstudio als hoofdreden voor de boeking heeft'],
      tradeoffs: ['Het hotel noemt zelf vijf minuten lopen naar de actie, maar publiceert geen verifieerbare universele route naar ieder adres', 'Er is één rooftop pool, niet twee buitenzwembaden', 'Een private pool is alleen aanwezig in de expliciete Executive Double Studio', 'De kleine hotelopzet biedt minder resortfaciliteiten dan grotere Patong-hotels'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Zuid-Patong doseert het avondleven.', description: 'De property positioneert zich dichtbij de actie maar in een rustiger deel van de plaats. Controleer de route naar strand, Bangla en je excursie-ophaalpunt zelf op de kaart.',
      steps: [
        { label: 'Ochtend', title: 'Gebruik de kust', description: 'Begin aan de zuidkant van Patong en plan pas daarna drukker centrum of excursie.' },
        { label: 'Avond', title: 'Ga doelgericht uit', description: 'Loop of neem kort vervoer en bepaal vooraf hoe je terugkeert.' },
        { label: 'Phuketdag', title: 'Plan vervoer', description: 'Voor andere stranden en Old Town blijft gemotoriseerd vervoer nodig.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Zet uitzicht, bad en zwembad niet op één hoop.', description: 'Niet iedere kamer heeft zeezicht, jacuzzi of privézwembad. Gebruik alleen de kenmerken van de exact gekozen categorie.',
      checks: [
        { title: 'Superior', description: 'Controleer shower of bath en geen, gedeeltelijk of expliciet zeezicht.' },
        { title: 'Private pool', description: 'Deze hoort bij de Executive Double Studio en vraagt extra aandacht voor kinderen die kunnen zwemmen.' },
        { title: 'Groepskamer', description: 'Connecting Studio en rooftop appartement hebben verschillende bedden, badkamers en capaciteit.' },
        { title: 'Boekkanaal', description: 'De officiële site verwijst voor boeken extern; vergelijk naam, categorie en voorwaarden zorgvuldig.' },
      ],
    },
    faqs: [
      { question: 'Ligt Patong Signature Boutique Hotel direct aan het strand?', answer: 'De officiële site positioneert het hotel aan de kustzijde van zuid-Patong met onbelemmerde zeezichten vanuit bepaalde kamers. Controleer de precieze toegang en steekroute op de kaart.' },
      { question: 'Hoeveel zwembaden heeft Patong Signature?', answer: 'De officiële amenitiespagina noemt één rooftop infinity pool. De oudere claim van twee buitenzwembaden is niet door de propertysite bevestigd.' },
      { question: 'Hebben alle kamers zeezicht?', answer: 'Nee. Er zijn kamers zonder expliciet zeezicht, met partial sea view en met sea view. Boek alleen op de exacte categorienaam.' },
      { question: 'Welke kamer heeft een privézwembad?', answer: 'De Executive Double Studio wordt officieel beschreven met een privézwembad in de kamer. De rooftop pool bij andere categorieën is gedeeld.' },
      { question: 'Is er een kamer voor gezinnen of vrienden?', answer: 'De Connecting Studio en het rooftop appartement worden tot vier volwassenen en twee kinderen vermeld. Controleer bedden, leeftijdsregels en maximale bezetting bij boeken.' },
      { question: 'Heeft Patong Signature een restaurant?', answer: 'Ja. De officiële site beschrijft Phuket Thai Bistro voor ontbijt en Thaise en westerse gerechten. Controleer actuele openingstijden rechtstreeks bij het hotel.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Controleer de precieze kamerkenmerken; algemene hotelfoto’s bewijzen geen uitzicht of privézwembad.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Patong Signature Boutique Hotel', creator: 'Patong Signature Boutique Hotel', url: 'https://www.patongsignature.com/', note: 'Officiële positionering, ligging en restaurant.' },
      { title: 'Room Types', creator: 'Patong Signature Boutique Hotel', url: 'https://www.patongsignature.com/our-rooms', note: 'Officiële kamers, oppervlaktes, bezetting, uitzicht en private-pooloptie.' },
      { title: 'Amenities', creator: 'Patong Signature Boutique Hotel', url: 'https://www.patongsignature.com/amenities', note: 'Officiële rooftop pool, jacuzzi-context en horeca.' },
    ],
  },

  'deevana-patong-resort-and-spa': {
    slug: 'deevana-patong-resort-and-spa', hotelName: 'Deevana Patong Resort & Spa', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong', area: 'Noord-centraal Patong · tropische tuin',
    pageTitle: 'Deevana Patong Resort & Spa: eerlijk verblijfadvies',
    pageDescription: 'Past Deevana Patong Resort & Spa bij je? Vergelijk Garden en Deluxe Wing, twee zwembaden, 235 kamers, jacuzzi en suites.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/deevana-patong-resort-and-spa/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/deevana-patong-resort-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een tropische hoteltuin met twee zwembadzones in Patong', imageCaption: 'AI-gegenereerd sfeerbeeld van een tuinresort in Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Tuinresort binnen Patong', title: 'Deevana Patong', accent: 'Resort & Spa', subtitle: 'Twee vleugels en twee zwembaden achter de drukte van de kust.',
      description: 'De officiële factsheet noemt 235 kamers en suites in een Garden Wing en Deluxe Wing. De keuze draait om een eenvoudige tuinkamer, pool-viewbalkon, eigen jacuzzi of extra suite-ruimte.', ctaLabel: 'Vergelijk actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Een groene Patong-basis met echte kamerkeuzes.', description: 'Kies Deevana wanneer een tropische tuin en twee zwembadgebieden belangrijker zijn dan direct aan het zand slapen. De officiële factsheet noemt ongeveer 400 meter tot Patong Beach Street; maak daar geen gegarandeerde strandlooptijd van.',
      stats: [
        { label: 'Omvang', value: '235 kamers', note: 'Kamers en suites', icon: 'bed' },
        { label: 'Water', value: '2 zwembaden', note: 'Plus twee kinderbaden', icon: 'waves' },
        { label: 'Kamers', value: '27–54 m²', note: 'Garden, Deluxe en suites', icon: 'sparkles' },
        { label: 'Ligging', value: 'Circa 400 m', note: 'Tot Patong Beach Street', icon: 'route' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Kies tussen tuinrust en pool-viewcomfort.', intro: 'De Garden Wing is eenvoudiger en gelijkvloers; de Deluxe Wing kijkt richting zwembad en biedt grotere categorieën met jacuzzi of suite.',
      goodFor: ['Gezinnen die twee kinderbaden en een tuinomgeving waarderen', 'Stellen die een Deluxe met balkon of jacuzzi gericht vergelijken', 'Reizigers die een hotelspa, fitness en restaurant willen gebruiken', 'Wie Patong dichtbij wil zonder beachfront als voorwaarde'],
      tradeoffs: ['De Garden Wing en Deluxe Wing verschillen duidelijk in ruimte en uitzicht', 'Een jacuzzi op balkon is geen pool-accesskamer', 'De accommodatie ligt terug van de strandweg', 'De officiële factsheet is ouder; controleer live of kamernaam en faciliteit nog identiek zijn'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Gebruik het resort als rustige onderbreking van Patong.', description: 'Deevana ligt in Patong maar achter de directe kuststrook. Loop voor strand, winkels en avondleven waar praktisch; plan vervoer voor de rest van Phuket.',
      steps: [
        { label: 'Ochtend', title: 'Tuin of strand', description: 'Kies eerst zwembad of kust en voorkom onnodig heen en weer lopen.' },
        { label: 'Avond', title: 'Eet binnen of buiten', description: 'Dalah Cuisine biedt hotelhoreca; Patong geeft meer keuze buiten de deur.' },
        { label: 'Uitstap', title: 'Reserveer reistijd', description: 'Andere stranden en Phuket Old Town vragen gemotoriseerd vervoer.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Kies de categorie op functie, niet alleen op naam.', description: 'De huidige propertysite toont Superior, Deluxe, Deluxe with Jacuzzi, Junior Suite en Junior Suite with Jacuzzi.',
      checks: [
        { title: 'Garden Wing', description: 'Superior is circa 27 m² met tuinterras en eenvoudiger positionering.' },
        { title: 'Deluxe Wing', description: 'Deluxe is circa 36 m² met pool-viewbalkon; controleer bedtype en verdieping.' },
        { title: 'Jacuzzi', description: 'Controleer of de eigen jacuzzi de extra ruimte en voorwaarden waard is.' },
        { title: 'Live status', description: 'Balcony Thai Cuisine staat op de officiële site als tijdelijk gesloten; verifieer horeca voor jouw data.' },
      ],
    },
    faqs: [
      { question: 'Hoeveel kamers heeft Deevana Patong Resort & Spa?', answer: 'De officiële factsheet noemt 235 kamers en suites verdeeld over de Garden Wing en Deluxe Wing.' },
      { question: 'Hoe ver ligt Deevana Patong van het strand?', answer: 'De factsheet noemt ongeveer 400 meter tot Patong Beach Street. Controleer op de kaart de daadwerkelijke looproute van hoteluitgang naar het zand.' },
      { question: 'Hoeveel zwembaden heeft Deevana Patong?', answer: 'De officiële factsheet noemt twee zwembaden en twee kinderbaden. Controleer eventuele onderhouds- of seizoenssluitingen voor jouw data.' },
      { question: 'Wat is het verschil tussen Superior en Deluxe?', answer: 'Superior ligt in de Garden Wing en is circa 27 m² met tuinterras. Deluxe ligt in de Deluxe Wing, is circa 36 m² en heeft een balkon richting zwembad.' },
      { question: 'Heeft Deevana Patong pool-accesskamers?', answer: 'De officiële kamerlijst noemt geen pool access. Wel bestaan Deluxe with Jacuzzi en Junior Suite with Jacuzzi met een eigen jacuzzi, wat iets anders is.' },
      { question: 'Is Deevana Patong geschikt voor gezinnen?', answer: 'Twee kinderbaden, connecting mogelijkheden en grotere suites kunnen bij gezinnen passen. Controleer de maximale bezetting en bedopstelling per kamer.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Controleer de actuele wing, kamernaam en geopende horeca voordat je definitief boekt.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Deevana Patong Resort & Spa', creator: 'Deevana Patong Resort & Spa', url: 'https://www.deevanapatong.com/', note: 'Officiële propertysite voor identiteit, kamers en ligging.' },
      { title: 'Hotel factsheet', creator: 'Deevana Patong Resort & Spa', url: 'https://www.deevanapatong.com/download/Deevana-Patong-Resort-Spa-Hotel-Fact-Sheet-8-8-19.pdf', note: 'Primaire bron voor 235 kamers, twee pools, kamerindeling en oppervlaktes.' },
      { title: 'Swimming Pool', creator: 'Deevana Patong Resort & Spa', url: 'https://www.deevanapatong.com/pool.html', note: 'Officiële informatie over Garden Pool, Deluxe Pool en kinderzones.' },
    ],
  },

  'deevana-plaza-phuket-patong': {
    slug: 'deevana-plaza-phuket-patong', hotelName: 'Deevana Plaza Phuket Patong', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong', area: 'Zuid-centraal Patong · Raj-U-Thid 200 Pee Road',
    pageTitle: 'Deevana Plaza Phuket Patong: eerlijk verblijfadvies',
    pageDescription: 'Past Deevana Plaza Phuket Patong bij je? Vergelijk 249 kamers, pool view, Premier Waterfront, familiekamer, spa en zwembad.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/deevana-plaza-phuket-patong/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/deevana-plaza-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een centraal zwembad tussen hotelvleugels in Patong', imageCaption: 'AI-gegenereerd sfeerbeeld van een stadshotel in Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Centraal Patong met familiekamer', title: 'Deevana Plaza', accent: 'Phuket Patong', subtitle: 'Een groter stadshotel waar city view, pool view en waterfront echt verschillende keuzes zijn.',
      description: 'De officiële Deevana-factsheet noemt 249 kamers en suites. Superior en Deluxe zijn 35 m², terwijl Premier Waterfront op de begane grond zit en de Family Room een eigen kinderhoek met stapelbed heeft.', ctaLabel: 'Vergelijk actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Sterk voor gezinnen en reizigers die centraal Patong praktisch willen houden.', description: 'Deevana Plaza biedt zwembad, spa, fitness en een duidelijke family room zonder een volledig strandresort te zijn. Kies vooral op uitzicht en kamerfunctie; neem ontbijt of strandafstand niet automatisch aan.',
      stats: [
        { label: 'Omvang', value: '249 kamers', note: 'Kamers en suites', icon: 'bed' },
        { label: 'Basisruimte', value: '35 m²', note: 'Superior en Deluxe', icon: 'sparkles' },
        { label: 'Gezinnen', value: '44 m² Family', note: 'Met kinderhoek en stapelbed', icon: 'bed' },
        { label: 'Faciliteiten', value: 'Pool, spa, fitness', note: 'Plus kinderspeelplek', icon: 'waves' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Een allround stadsbasis met gerichte gezinsoptie.', intro: 'De keuze is praktisch: city view voor eenvoud, pool view voor uitzicht, waterfront voor begane-grondligging of family room voor een aparte kinderhoek.',
      goodFor: ['Gezinnen die een stapelbedhoek in dezelfde kamer zoeken', 'Stellen die pool view of Premier Waterfront bewust vergelijken', 'Reizigers die spa, fitness en horeca op het terrein waarderen', 'Wie centraal Patong wil gebruiken zonder in een klein hotel te slapen'],
      tradeoffs: ['De accommodatie ligt niet direct op het strand', 'Superior en Deluxe zijn even groot; verschil zit vooral in ligging en uitzicht', 'Premier Waterfront is een ligging aan de zwembadzone, geen privézwembad', 'De factsheet is de primaire bron maar niet nieuw; controleer live kamernaam en opening van faciliteiten'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Plan zuid-centraal Patong als loopzone.', description: 'De officiële factsheet omschrijft strand, winkelcentrum, night market en avondleven als dichtbij, maar geeft geen stabiele loopminuten. Controleer jouw routes op de kaart.',
      steps: [
        { label: 'Strand', title: 'Kies de praktische route', description: 'Vraag de receptie naar de veiligste en kortste looproute naar Patong Beach.' },
        { label: 'Markt & winkels', title: 'Bundel je stops', description: 'Combineer eten, boodschappen en avondwandeling in één ronde.' },
        { label: 'Buiten Patong', title: 'Plan een rit', description: 'Voor luchthaven, Old Town en andere stranden blijft vervoer nodig.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Vergelijk de vijf officiële kamertypes.', description: 'De factsheet onderscheidt Superior, Deluxe, Premier Waterfront, Family Room en Deluxe Suite.',
      checks: [
        { title: 'Uitzicht', description: 'Superior is city-facing; Deluxe kijkt richting zwembad. Controleer de exacte beschrijving live.' },
        { title: 'Waterfront', description: 'Premier Waterfront ligt op de eerste verdieping bij de zwembadzone; vraag naar terras en privacy.' },
        { title: 'Family Room', description: 'Controleer stapelbed, kinderleeftijd en maximale bezetting voor jouw samenstelling.' },
        { title: 'Suite', description: 'De Deluxe Suite is 75 m² met woonruimte, eethoek en aparte pantry.' },
      ],
    },
    faqs: [
      { question: 'Hoeveel kamers heeft Deevana Plaza Phuket Patong?', answer: 'De officiële Deevana-factsheet noemt 249 kamers en suites. Een oude vermelding van 240 kamers is daarmee niet de actuele primaire claim.' },
      { question: 'Ligt Deevana Plaza direct aan Patong Beach?', answer: 'Nee. Het hotel ligt centraal in Patong aan Raj-U-Thid 200 Pee Road. De factsheet noemt het strand dichtbij, maar geeft geen betrouwbare vaste looptijd.' },
      { question: 'Wat is het verschil tussen Superior en Deluxe?', answer: 'Beide zijn volgens de factsheet 35 m². Superior ligt aan de city side; Deluxe is gericht op de zwembadzijde. Controleer verdieping en balkon bij boeken.' },
      { question: 'Wat is een Premier Waterfront Room?', answer: 'Deze categorie is 35 m² en ligt volgens de factsheet op de eerste verdieping bij de zwembadzone. Het is niet automatisch een kamer met privézwembad.' },
      { question: 'Is er een speciale familiekamer?', answer: 'Ja. De Family Room is 44 m² en heeft een kinderhoek met stapelbed. Controleer actuele bezetting en leeftijdsvoorwaarden.' },
      { question: 'Heeft Deevana Plaza een spa en fitnessruimte?', answer: 'De officiële factsheet noemt Orientala Wellness Spa, een fitnesscentrum, zwembad en kinderspeelplek. Verifieer de actuele openingstijden voor jouw verblijfsdata.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Vergelijk dezelfde kamer en voorwaarden; city, pool en waterfront beschrijven verschillende liggingen.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Deevana Plaza Phuket Patong factsheet', creator: 'Deevana Hotels & Resorts', url: 'https://www.deevanahotels.com/wp-content/uploads/2023/02/2023-Deevana-Plaza-Phuket02.pdf', note: 'Primaire bron voor adres, 249 kamers, kamertypes, oppervlaktes, horeca en faciliteiten.' },
      { title: 'Deevana Hotels & Resorts', creator: 'Deevana Hotels & Resorts', url: 'https://www.deevanahotels.com/', note: 'Officiële groepsbron voor de huidige propertyidentiteit.' },
    ],
  },
};

export function getNlPatongBHotelDetailGuide(slug: string): HotelDetailGuideData | undefined {
  return nlPatongBHotelDetailGuides[slug];
}
