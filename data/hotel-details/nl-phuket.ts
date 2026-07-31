import type { HotelDetailGuideData } from './types';

const relatedPatongGuides = [
  {
    title: 'Waar verblijven in Patong?',
    description: 'Vergelijk de rustige noordkant, het centrum en de zuidkant van het strand.',
    href: '/phuket/patong/hotels/',
    image: '/images/redesign/phuket-hotels-hero.webp',
    imageAlt: 'Patong Beach en de bebouwde kust van Phuket',
  },
  {
    title: 'Patong zonder verrassingen',
    description: 'Plan strand, avondleven, vervoer en rustige momenten per wijk.',
    href: '/phuket/patong/',
    image: '/images/redesign/patong-area-hero-v2.webp',
    imageAlt: 'Patong Beach bij warm avondlicht',
  },
  {
    title: 'Phuket reisgids',
    description: 'Combineer Patong met stranden, oude stad en een haalbare eilandroute.',
    href: '/city/phuket/',
    image: '/images/redesign/phuket-destination-hero-v2.webp',
    imageAlt: 'Tropische kust van Phuket met helder water',
  },
];

export const nlPhuketHotelDetailGuides: Record<string, HotelDetailGuideData> = {
  'grand-mercure-phuket-patong': {
    slug: 'grand-mercure-phuket-patong',
    hotelName: 'Grand Mercure Phuket Patong',
    cityName: 'Phuket',
    citySlug: 'phuket',
    destinationHref: '/phuket/patong/',
    hotelGuideHref: '/phuket/patong/hotels/',
    hotelGuideLabel: 'Hotels in Patong',
    area: 'Centraal Patong · Rat U Thit',
    pageTitle: 'Grand Mercure Phuket Patong: past dit hotel bij je?',
    pageDescription: 'Eerlijk verblijfadvies over Grand Mercure Phuket Patong: ligging, kamers, pool access, gezinnen en wat je vóór boeken controleert.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/grand-mercure-phuket-patong/',
    dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/grand-mercure-patong-guide-hero.webp',
      imageAlt: 'Redactioneel sfeerbeeld van een rustig tropisch hotelhof met zwembad in Patong',
      imageCaption: 'AI-gegenereerd sfeerbeeld van een stedelijk resort in Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Centraal, maar niet aan de boulevard',
      title: 'Grand Mercure',
      accent: 'Phuket Patong',
      subtitle: 'Een complete resortbasis voor wie Patong te voet wil gebruiken.',
      description: 'Het hotel ligt volgens Accor circa 500 meter terug van Patong Beach en op ongeveer tien minuten lopen van Bangla Road. De winst is een zwembad- en resortomgeving midden in de plaats; de afweging is dat je niet direct aan het zand slaapt.',
      ctaLabel: 'Controleer actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel',
      title: 'Sterk als locatie én hotelvoorzieningen allebei tellen.',
      description: 'Kies Grand Mercure wanneer je centraal Patong wilt combineren met een zwembad, fitness, spa en meerdere kamertypes. Boek niet op een oude sterren- of reviewscore: vergelijk voor jouw data vooral ligging van de kamer, ontbijt, annulering en eventuele pool access.',
      stats: [
        { label: 'Strand', value: 'Circa 500 m', note: 'Volgens de officiële Accor-pagina', icon: 'waves' },
        { label: 'Bangla Road', value: 'Circa 10 min', note: 'Officieel vermelde looptijd', icon: 'route' },
        { label: 'Kamers', value: 'Kamer tot villa', note: 'Ook suites en pool-accessopties', icon: 'bed' },
        { label: 'Reisprofiel', value: 'Allround', note: 'Stellen, vrienden en gezinnen', icon: 'sparkles' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?',
      title: 'Resortcomfort zonder Patong buiten bereik te zetten.',
      intro: 'De juiste keuze hangt minder af van het merk dan van hoeveel tijd je in het hotel doorbrengt en welke kamerpositie je boekt.',
      goodFor: ['Wie strand, winkelcentra en avondleven grotendeels lopend wil bereiken', 'Gezinnen of stellen die zwembad en ontbijt in dezelfde basis waarderen', 'Reizigers die pool access, suite of villa bewust willen vergelijken', 'Een eerste Patong-verblijf waarbij praktische voorspelbaarheid belangrijk is'],
      tradeoffs: ['Het hotel ligt terug van het strand; “Patong” betekent hier niet direct aan zee', 'Een pool-accesskamer is alleen meerwaarde wanneer je die buitenruimte echt gebruikt', 'Een centrale locatie blijft levendiger dan een rustig strandresort elders op Phuket', 'Ontbijt, shuttle en annulering verschillen per tarief en moeten actueel worden gecontroleerd'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk',
      title: 'Gebruik Patong te voet en plan verder Phuket per dagcluster.',
      description: 'Voor Bangla Road, Jungceylon en het strand is lopen logisch. Voor Old Phuket Town, Kata of de luchthaven blijft vervoer nodig.',
      steps: [
        { label: 'Overdag', title: 'Strand & centrum', description: 'Loop naar Patong Beach en bundel winkels of lunch op dezelfde route.' },
        { label: 'Avond', title: 'Bangla op keuze', description: 'De centrale ligging maakt een avondbezoek eenvoudig zonder dat je er direct boven slaapt.' },
        { label: 'Buiten Patong', title: 'Reserveer reistijd', description: 'Plan taxi, transfer of huurauto voor andere stranden en Phuket Old Town.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer',
      title: 'Kies eerst kamerlogica, daarna pas het tarief.',
      description: 'Accor toont standaardkamers, suites, pool-accesskamers en villa’s. Vergelijk exact dezelfde categorie en bezetting bij hotel en boekingspartner.',
      checks: [
        { title: 'Kamertype', description: 'Controleer oppervlakte, bedopstelling, balkon en werkelijke pool access.' },
        { title: 'Tarief', description: 'Bekijk of ontbijt, belastingen en flexibele annulering inbegrepen zijn.' },
        { title: 'Ligging kamer', description: 'Vraag bij gevoeligheid voor geluid naar een rustig gelegen kamer.' },
        { title: 'Actuele faciliteiten', description: 'Controleer openingstijden van zwembad, spa, fitness en restaurants.' },
      ],
    },
    faqs: [
      { question: 'Hoe ver ligt Grand Mercure Phuket Patong van het strand?', answer: 'Accor noemt ongeveer 500 meter tot Patong Beach en circa tien minuten lopen. De exacte route en looptijd hangen af van uitgang, drukte en tempo.' },
      { question: 'Ligt Grand Mercure dichtbij Bangla Road?', answer: 'De officiële hotelpagina noemt Bangla Road op circa 500 meter en ongeveer tien minuten lopen. Daardoor is het avondleven bereikbaar, maar het hotel ligt niet direct in de uitgaansstraat.' },
      { question: 'Welke kamertypes heeft Grand Mercure Phuket Patong?', answer: 'Accor toont onder meer Superior- en Deluxe-kamers, pool-accessvarianten, suites en villa’s met één of twee slaapkamers. Beschikbaarheid en bezetting verschillen per datum.' },
      { question: 'Is Grand Mercure Phuket Patong geschikt voor gezinnen?', answer: 'Het brede kamerassortiment en de resortfaciliteiten kunnen goed passen bij gezinnen. Controleer voor jouw samenstelling de maximale bezetting, verbindingsopties en voorwaarden voor extra bedden.' },
      { question: 'Is ontbijt inbegrepen?', answer: 'Dat verschilt per tarief. Vergelijk dezelfde kamer met en zonder ontbijt en controleer daarnaast belastingen en annuleringsvoorwaarden.' },
      { question: 'Moet je een pool-accesskamer boeken?', answer: 'Alleen wanneer directe toegang tot het zwembad een belangrijk deel van je verblijf is. Controleer privacy, terrasligging, kinderpraktijk en het exacte kamertype voordat je extra betaalt.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt',
    faqDescription: 'Deze praktische boekingsvragen zijn afgeleid van de kamertypes en voorwaarden die je op de officiële hotelpagina moet controleren; er is geen PAA-label gebruikt zonder bruikbaar PAA-resultaat.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Grand Mercure Phuket Patong', creator: 'Accor', url: 'https://all.accor.com/hotel/8109/index.en.shtml', note: 'Officiële ligging, faciliteiten, kamertypes, adres en vermelde loopafstanden.' },
    ],
  },

  'four-points-by-sheraton-phuket-patong-beach-resort': {
    slug: 'four-points-by-sheraton-phuket-patong-beach-resort',
    hotelName: 'Four Points by Sheraton Phuket Patong Beach Resort',
    cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong',
    area: 'Noord-Patong · Thawewong Road',
    pageTitle: 'Four Points Phuket Patong: eerlijk verblijfadvies',
    pageDescription: 'Past Four Points Phuket Patong bij je reis? Vergelijk noord-Patong, strandligging, 600 kamers, familiefaciliteiten en kamertypes.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/four-points-by-sheraton-phuket-patong-beach-resort/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/four-points-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een modern resortzwembad bij noordelijk Patong Beach', imageCaption: 'AI-gegenereerd sfeerbeeld van noord-Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Noord-Patong aan de kust', title: 'Four Points', accent: 'Phuket Patong', subtitle: 'Kies dit resort voor strand en faciliteiten, niet voor de kortste route naar ieder uitgaansadres.',
      description: 'Marriott vermeldt 600 kamers en suites, twee zoutwaterzwembaden, kinderbaden, een kidsclub en vijf eet- en drinkplekken. De noordelijke ligging geeft een andere reisdag dan slapen midden bij Bangla Road.', ctaLabel: 'Bekijk actuele beschikbaarheid',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Een groot strandresort dat Patong doseerbaar maakt.',
      description: 'Sterk voor gezinnen, stellen en Bonvoy-reizigers die veel voorzieningen op één plek willen. De schaal van 600 kamers is tegelijk de trade-off: kies bewust tussen gewone kamer, pool access, ocean view en suite.',
      stats: [
        { label: 'Voorraad', value: '600 kamers', note: 'Kamers en suites volgens Marriott', icon: 'bed' },
        { label: 'Zwembad', value: '2 zoutwater', note: 'Plus kinderbaden', icon: 'waves' },
        { label: 'Gezinnen', value: 'Kidsclub', note: 'En specifieke familiesuites', icon: 'sparkles' },
        { label: 'Luchthaven', value: 'Circa 40 km', note: 'Afstand volgens Marriott', icon: 'route' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Veel resort binnen handbereik, met Patong buiten de deur.', intro: 'Noord-Patong werkt goed wanneer strand en hotelritme zwaarder wegen dan iedere avond de kortste uitgaansroute.',
      goodFor: ['Gezinnen die kinderbad, kidsclub en familiekamer gericht vergelijken', 'Stellen die aan de kust willen slapen maar Patong niet willen overslaan', 'Bonvoy-leden die directe merkvoorwaarden naast een extern tarief leggen', 'Reizigers die meerdere zwembaden en eetopties op het terrein gebruiken'],
      tradeoffs: ['600 kamers maken dit geen klein of intiem boetiekhotel', 'De rustigere noordkant ligt verder van sommige adressen rond Jungceylon en Bangla', 'Ocean view en pool access zijn categorieclaims; controleer exacte ligging en uitzicht', 'Loyaliteitsvoordelen gelden doorgaans alleen onder specifieke directe boekingsvoorwaarden'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Noord-Patong verschuift je dag richting strand.', description: 'Loop langs de kust naar het centrum wanneer het weer past; gebruik vervoer voor de luchthaven en routes buiten Patong.',
      steps: [
        { label: 'Ochtend', title: 'Strand vóór centrum', description: 'Begin aan de kust en voorkom onnodig heen-en-weer lopen door Patong.' },
        { label: 'Avond', title: 'Kies je drukte', description: 'Ga gericht naar het centrum en keer terug naar de noordelijke resortzone.' },
        { label: 'Aankomst', title: 'Transfer vooraf', description: 'Marriott noemt circa 40 kilometer tot Phuket International Airport; plan op verkeer.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Vergelijk acht kamertypes op functie, niet op naam.', description: 'De officiële kamersite toont onder meer pool access, ocean view, triples en familiesuites. De juiste categorie voorkomt een dure maar onnodige upgrade.',
      checks: [
        { title: 'Uitzicht', description: 'Controleer gebouw, verdieping, balkon en wat “ocean view” voor de gekozen categorie betekent.' },
        { title: 'Gezinsbezetting', description: 'Bekijk bedden, sofa, kindervoorzieningen en maximale bezetting per kamer.' },
        { title: 'Ontbijt', description: 'Vergelijk tarief met maaltijden tegen los eten in Patong.' },
        { title: 'Bonvoy', description: 'Controleer welke ledenvoordelen alleen bij rechtstreeks boeken gelden.' },
      ],
    },
    faqs: [
      { question: 'Ligt Four Points by Sheraton Phuket Patong aan het strand?', answer: 'Marriott positioneert het hotel als strandresort in noord-Patong, op Thawewong Road en op korte afstand van zee. Controleer op de kaart de precieze route tussen jouw gebouw en het strand.' },
      { question: 'Hoeveel kamers heeft Four Points Phuket Patong?', answer: 'De actuele officiële overzichtspagina noemt 600 kamers en suites. Daardoor zijn er veel categorieën, maar is het ook duidelijk een groot resort.' },
      { question: 'Is Four Points Phuket Patong geschikt voor gezinnen?', answer: 'Marriott noemt kinderbaden, een kidsclub, activiteiten en een tweeslaapkamer-familiesuite. Controleer per datum de openingstijden en de bezetting van de gekozen kamer.' },
      { question: 'Welke kamer is het meest logisch?', answer: 'Kies een standaardkamer voor prijs en eenvoud, pool access wanneer je die directe toegang echt gebruikt, ocean view voor de ligging of een familie- of one-bedroom suite voor extra ruimte.' },
      { question: 'Hoe ver is het hotel van de luchthaven?', answer: 'Marriott vermeldt ongeveer 40 kilometer tot Phuket International Airport. De reistijd wisselt sterk met verkeer en aankomsttijd.' },
      { question: 'Is direct boeken via Marriott altijd beter?', answer: 'Niet automatisch. Vergelijk dezelfde kamer en voorwaarden. Directe boekingen kunnen relevante Bonvoy-voordelen hebben; een extern tarief kan op jouw data voordeliger of flexibeler zijn.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt',
    faqDescription: 'Deze praktische boekingsvragen zijn afgeleid van de officiële kamer- en hoteldetails; er is geen PAA-label gebruikt zonder bruikbaar PAA-resultaat.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Four Points Phuket Patong — overview', creator: 'Marriott', url: 'https://www.marriott.com/en-us/hotels/hktfp-four-points-phuket-patong-beach-resort/overview/', note: 'Officiële ligging, omvang, faciliteiten, adres en luchthavenafstand.' },
      { title: 'Rooms & suites', creator: 'Marriott', url: 'https://www.marriott.com/en-us/hotels/hktfp-four-points-phuket-patong-beach-resort/rooms/', note: 'Officiële kameropties, pool access, ocean view en familiesuite.' },
    ],
  },

  'hotel-indigo-phuket-patong': {
    slug: 'hotel-indigo-phuket-patong', hotelName: 'Hotel Indigo Phuket Patong', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong', area: 'Noord-Patong · Rat U Thit',
    pageTitle: 'Hotel Indigo Phuket Patong: eerlijk verblijfadvies',
    pageDescription: 'Eerlijk advies over Hotel Indigo Phuket Patong: noordelijke ligging, rooftop infinity pool, 180 kamers, design en de juiste kamercategorie.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/hotel-indigo-phuket-patong/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/hotel-indigo-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een designgericht rooftopzwembad boven Patong bij avondlicht', imageCaption: 'AI-gegenereerd sfeerbeeld van een designhotel in Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Designbasis in noord-Patong', title: 'Hotel Indigo', accent: 'Phuket Patong', subtitle: 'Een compacte hotelervaring rond design, rooftop en de buurt.',
      description: 'IHG noemt 180 kamers, vijf verdiepingen, een rooftop infinity pool, een gym met Muay Thai-ring en twee restaurants. Het past bij reizigers die een uitgesproken hotel willen, maar Patong zelf nog steeds te voet willen gebruiken.', ctaLabel: 'Controleer actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Meer karakter dan een standaard ketenhotel, zonder resortisolatie.', description: 'Het ontwerp verwijst volgens IHG naar Phuket als vissersdorp, tropisch landschap en neonachtig nachtleven. Kies het voor die sfeer en het rooftopritme; niet wanneer een groot familieresort of directe strandtoegang je hoofdprioriteit is.',
      stats: [
        { label: 'Kamers', value: '180', note: 'Over vijf verdiepingen volgens IHG', icon: 'bed' },
        { label: 'Rooftop', value: 'Infinity pool', note: 'Met uitzicht over Patong', icon: 'waves' },
        { label: 'Fitness', value: 'Muay Thai-ring', note: 'Onderdeel van de officiële gym', icon: 'sparkles' },
        { label: 'Inchecken', value: 'Vanaf 15:00', note: 'Uitchecken tot 12:00', icon: 'route' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Sterk voor koppels en designliefhebbers die Patong bewust kiezen.', intro: 'De combinatie van boetiekuitstraling en keteninfrastructuur is de echte propositie; de rooftop is geen vervanging voor een breed strandresort.',
      goodFor: ['Koppels of solo-reizigers die een uitgesproken interieur waarderen', 'Wie een rooftopzwembad en bar als vast hotelmoment wil gebruiken', 'IHG-leden die merkvoorwaarden naast externe tarieven vergelijken', 'Reizigers die noord-Patong als basis willen zonder buiten de plaats te slapen'],
      tradeoffs: ['Een rooftopzwembad heeft minder ligruimte dan een groot resortdek', 'De noordelijke ligging is niet voor iedere Patong-route de kortste', 'Pool access, suite en standaardkamer bieden een wezenlijk andere ervaring', 'Restaurant-, bar- en zwembaduren kunnen wijzigen en vragen een actuele check'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Maak van noord-Patong je rustige vertrekpunt.', description: 'Plan strand en centrum als één looproute en voorkom dat je meerdere keren per dag dezelfde drukke straten kruist.',
      steps: [
        { label: 'Ochtend', title: 'Rooftop of strand', description: 'Kies één rustige start en bewaar centrumverplaatsingen voor later op de dag.' },
        { label: 'Middag', title: 'Bundel Patong', description: 'Combineer lunch, winkels en strand in één ronde vanuit noord-Patong.' },
        { label: 'Avond', title: 'Terug naar boven', description: 'Gebruik de rooftop als eindpunt in plaats van nog een extra rit door de plaats.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Bepaal of je voor design, buitenruimte of pool access betaalt.', description: 'IHG toont standaardkamers, suites en pool-accesscategorieën. Controleer de precieze kameromschrijving, want een mooi hotelbeeld zegt niets over jouw uitzicht.',
      checks: [
        { title: 'Categorie', description: 'Vergelijk standaard, suite, garden view en pool access op echte gebruikswaarde.' },
        { title: 'Ontbijt', description: 'Controleer of ontbijt in het tarief zit en of je het dagelijks gebruikt.' },
        { title: 'Rooftop', description: 'Bekijk actuele openingstijden, eventuele events en toegang voor hotelgasten.' },
        { title: 'Voorwaarden', description: 'Vergelijk annuleerbaarheid, belastingen en IHG-ledenvoordelen.' },
      ],
    },
    faqs: [
      { question: 'Waar ligt Hotel Indigo Phuket Patong?', answer: 'Het hotel ligt aan Rat U Thit 200 Pee Road in noord-Patong, nabij strand, winkels en uitgaansplekken. Controleer de route op de kaart voor de adressen die jij dagelijks bezoekt.' },
      { question: 'Heeft Hotel Indigo Phuket Patong een rooftopzwembad?', answer: 'Ja. IHG beschrijft een rooftop infinity pool met uitzicht over de wijk en een rooftopbar. Openingstijden en eventuele beperkingen kunnen wijzigen.' },
      { question: 'Hoeveel kamers heeft Hotel Indigo Phuket Patong?', answer: 'De actuele IHG-voorzieningenpagina noemt 180 kamers verdeeld over vijf verdiepingen, waaronder standaardkamers, suites en pool-accessopties.' },
      { question: 'Is Hotel Indigo Phuket Patong geschikt voor gezinnen?', answer: 'Verbindende kamers worden als voorziening genoemd, maar het hotelconcept en de rooftop passen vooral bij reizigers die design en stedelijk Patong zoeken. Controleer bezetting en kindervoorwaarden per kamer.' },
      { question: 'Heeft het hotel een fitnessruimte?', answer: 'Ja. IHG vermeldt een fitnessruimte met een Muay Thai-ring. Controleer actuele toegang en openingstijden bij het hotel.' },
      { question: 'Welke kamer moet je kiezen?', answer: 'Een standaardkamer is logisch wanneer locatie en design genoeg zijn. Kies pool access of een suite alleen wanneer buitenruimte, aparte leefruimte of directe zwembadtoegang de meerprijs voor jou waard is.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt',
    faqDescription: 'Deze praktische boekingsvragen zijn afgeleid van de officiële hotel- en voorzieningendetails; er is geen PAA-label gebruikt zonder bruikbaar PAA-resultaat.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Hotel Indigo Phuket Patong', creator: 'IHG', url: 'https://www.ihg.com/hotelindigo/hotels/us/en/phuket/phupp/hoteldetail', note: 'Officiële ligging, hotelconcept, restaurants, kamers en basisvoorzieningen.' },
      { title: 'Hotel amenities', creator: 'IHG', url: 'https://www.ihg.com/hotelindigo/hotels/us/en/phuket/phupp/hoteldetail/amenities', note: 'Officiële kamertelling, verdiepingen, rooftop pool, toegankelijkheid en praktische hoteldetails.' },
    ],
  },

  'movenpick-myth-hotel-patong-phuket': {
    slug: 'movenpick-myth-hotel-patong-phuket', hotelName: 'Mövenpick Myth Hotel Patong Phuket', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong', area: 'Centraal Patong · Rat U Thit',
    pageTitle: 'Mövenpick Myth Hotel Patong: eerlijk verblijfadvies',
    pageDescription: 'Past Mövenpick Myth Hotel Patong bij je reis? Eerlijk advies over ligging, pool access, familiekamers, erfgoeddesign en boekingskeuzes.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/movenpick-myth-hotel-patong-phuket/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/movenpick-myth-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een erfgoedgeïnspireerd hotelhof met tropisch zwembad in Patong', imageCaption: 'AI-gegenereerd sfeerbeeld van een erfgoedgeïnspireerd resort in Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Erfgoedstijl in centraal Patong', title: 'Mövenpick Myth', accent: 'Hotel Patong', subtitle: 'Een uitgesproken resortbasis met familiesuites en pool-accesskamers.',
      description: 'Accor plaatst het hotel aan Rat U Thit Road en noemt Patong Beach op ongeveer tien minuten lopen in de kerninformatie. Het ontwerp verwijst naar King Rama V en Sino-Portugees Phuket; de kamerkeuze loopt van pool view tot pool access en familiesuite.', ctaLabel: 'Controleer actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Kies het voor de hotelervaring, niet alleen voor het Mövenpick-label.', description: 'De combinatie van vrijgevormd zwembad, spa, restaurant en familiekamers past bij wie een resortmoment in Patong wil. De centrale ligging blijft stedelijk: strand, markt en winkelcentra vragen lopen en de route verschilt per uitgang.',
      stats: [
        { label: 'Strand', value: 'Circa 10 min', note: 'Kern-FAQ van Accor; andere sectie noemt 18 min', icon: 'waves' },
        { label: 'Kamers', value: 'Pool view/access', note: 'Plus familiesuite en Heritage Suite', icon: 'bed' },
        { label: 'Zwembad', value: 'Vrije vorm', note: 'Met Azure Pool Bar', icon: 'sparkles' },
        { label: 'Aankomst', value: 'Vanaf 15:00', note: 'Uitchecken tot 12:00', icon: 'route' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Sterk voor gezinnen en stellen die het hotel bewust gebruiken.', intro: 'De thematiek en faciliteiten zijn alleen meerwaarde wanneer je ook tijd rond zwembad, restaurant of spa plant.',
      goodFor: ['Gezinnen die een echte familiekamer met meerdere bedden vergelijken', 'Stellen die een pool-access- of Heritage Suite bewust kiezen', 'Reizigers die centraal Patong willen combineren met een volwaardige hotelbasis', 'ALL-leden die merkvoorwaarden naast een extern flexibel tarief leggen'],
      tradeoffs: ['Accor toont verschillende looptijden naar Patong Beach; beoordeel de kaart en route zelf', 'Pool access en een privéjacuzzi zijn categoriegebonden, niet standaard', 'Erfgoedthema en grotere resortopzet passen niet bij wie minimalistisch of kleinschalig zoekt', 'Spa, minibar, wasserij en sommige extra’s kunnen apart worden berekend'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Centraal Patong, maar niet aan de strandlijn.', description: 'Banzaan Market en winkelzones liggen op loopafstand; plan strand en avondcentrum als één route en voorkom extra heen-en-weer lopen.',
      steps: [
        { label: 'Ochtend', title: 'Zwembad of strand', description: 'Kies één hoofdmoment en houd rekening met de werkelijke looproute vanaf Rat U Thit.' },
        { label: 'Middag', title: 'Markt & winkels', description: 'Accor noemt Banzaan Market en Jungceylon in de nabije omgeving; combineer ze logisch.' },
        { label: 'Avond', title: 'Centrum op keuze', description: 'Ga gericht naar het levendige deel van Patong en keer terug naar de hotelbasis.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Controleer bedden en zwembadrelatie per exacte kamer.', description: 'De officiële lijst onderscheidt king/twin, pool view, pool access met jacuzzi, Family Suite en Heritage Suite. De naam “Deluxe” alleen is dus onvoldoende.',
      checks: [
        { title: 'Bedopstelling', description: 'Controleer king, twin en de werkelijke bedden in de familiesuite.' },
        { title: 'Pool access', description: 'Bevestig terras, directe toegang, jacuzzi en veiligheidspraktijk voor kinderen.' },
        { title: 'Ontbijt', description: 'Bekijk of het Atrio-ontbijt in het gekozen tarief is inbegrepen.' },
        { title: 'Voorwaarden', description: 'Vergelijk flexibel tarief, vooruitbetaling, belastingen en ALL-ledenvoordelen.' },
      ],
    },
    faqs: [
      { question: 'Hoe ver ligt Mövenpick Myth Hotel Patong van het strand?', answer: 'Accor noemt in de kern-FAQ ongeveer tien minuten lopen, terwijl een latere lijst op dezelfde pagina achttien minuten noemt. Gebruik daarom de kaart en controleer de route vanaf de hotellingang in plaats van één looptijd als garantie te zien.' },
      { question: 'Welke kamers heeft Mövenpick Myth Hotel Patong?', answer: 'De officiële hotelpagina noemt Deluxe king- en twinrooms met pool view, pool access, een variant met privéjacuzzi, een Family Suite en de Heritage Suite. Beschikbaarheid verschilt per datum.' },
      { question: 'Is het hotel geschikt voor gezinnen?', answer: 'De Family Suite met één kingsize en twee eenpersoonsbedden is een concrete gezinsoptie. Controleer maximale bezetting, kinderbeleid en beschikbaarheid voordat je boekt.' },
      { question: 'Heeft Mövenpick Myth Hotel Patong een spa?', answer: 'Ja. Accor noemt A Vida Spa naast het buitenzwembad, fitnesscentrum en de eet- en drinkplekken. Behandelingen worden doorgaans apart geboekt.' },
      { question: 'Is ontbijt inbegrepen?', answer: 'Dat hangt af van het tarief. Accor noemt een internationaal ontbijtbuffet bij Atrio; controleer per kamerprijs of ontbijt en belastingen zijn inbegrepen.' },
      { question: 'Hoe laat kun je in- en uitchecken?', answer: 'De actuele Accor-pagina noemt inchecken vanaf 15:00 en uitchecken tot 12:00. Een latere uitcheck is een verzoek of tariefvoordeel, geen garantie.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Deze praktische vragen volgen uit de actuele Accor-hotel- en kamerinformatie; er is geen PAA-label gebruikt zonder bruikbaar PAA-resultaat.', relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Mövenpick Myth Hotel Patong Phuket', creator: 'Accor', url: 'https://all.accor.com/hotel/B2E1/index.en.shtml', note: 'Officiële ligging, kamertypes, faciliteiten, maaltijden en aankomsttijden.' },
      { title: 'Hotel location', creator: 'Mövenpick Hotels & Resorts', url: 'https://movenpick.accor.com/en/asia/thailand/phuket/myth-hotel-patong-phuket/location.html', note: 'Officiële locatie- en contactinformatie.' },
    ],
  },

  'lub-d-phuket-patong': {
    slug: 'lub-d-phuket-patong', hotelName: 'Lub d Phuket Patong', cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong', area: 'Noord-centraal Patong · Sawatdirak Road',
    pageTitle: 'Lub d Phuket Patong: past deze social stay bij je?',
    pageDescription: 'Eerlijk advies over Lub d Phuket Patong: privékamer of dorm, social events, coworking, zwembad, ligging en de belangrijkste trade-offs.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/lub-d-phuket-patong/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/lub-d-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een sociaal designverblijf met zwembad en coworkingruimte in Patong', imageCaption: 'AI-gegenereerd sfeerbeeld van een social stay in Patong; bekijk actuele kamer- en dormfoto’s bij de aanbieder.',
      eyebrow: 'Social stay, geen stil resort', title: 'Lub d', accent: 'Phuket Patong', subtitle: 'Kies tussen privékamer en dorm — en kies bewust voor de sociale programmering.',
      description: 'Lub d positioneert deze locatie rond pool parties, bar crawls, chillzones en coworking. De officiële site noemt 154 privékamers, 33 gedeelde dorms, een zwembad en Patong Beach op 150 meter.', ctaLabel: 'Controleer actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Een sociale uitvalsbasis die meer hotelkeuze dan hostelkeuze vraagt.', description: 'Het grote verschil zit niet alleen tussen privé en gedeeld, maar tussen rust zoeken en actief meedoen. De centrale ligging, coworking en events passen bij solo-reizigers en vrienden; lichte slapers moeten hun kamerpositie en eventkalender extra goed controleren.',
      stats: [
        { label: 'Privé', value: '154 kamers', note: 'Volgens de officiële locatiepagina', icon: 'bed' },
        { label: 'Gedeeld', value: '33 dorms', note: 'Controleer type en bezetting', icon: 'sparkles' },
        { label: 'Strand', value: '150 m', note: 'Afstand zoals Lub d die vermeldt', icon: 'waves' },
        { label: 'Bangla', value: '500 m', note: 'Officieel genoemde afstand', icon: 'route' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Sterk voor contact en flexibiliteit. Zwak voor gegarandeerde stilte.', intro: 'Dezelfde programmering die solo-reizigers helpt mensen te ontmoeten, kan botsen met vroeg slapen of een rustige strandweek.',
      goodFor: ['Solo-reizigers die sociale ruimtes en georganiseerde activiteiten willen', 'Vrienden die locatie, zwembad en gezamenlijke sfeer belangrijk vinden', 'Remote workers die coworking willen combineren met een centrale Patong-basis', 'Stellen die een privékamer kiezen maar niet in een klassiek resort hoeven te zitten'],
      tradeoffs: ['De officiële positionering noemt pool parties en bar crawls; absolute stilte is niet de kernbelofte', 'Een dorm en een privékamer hebben totaal verschillende privacy en bagagepraktijk', 'Eventdagen, tijden en prijzen wijzigen en horen niet als vaste planning te worden behandeld', 'Een social stay is minder logisch voor gezinnen of reizigers die veel hotelservice verwachten'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Strand en avondleven liggen dichtbij; je slaapkeuze blijft bepalend.', description: 'Lub d noemt Patong Beach op 150 meter en Bangla Walking Street op 500 meter. Dat maakt lopen eenvoudig, maar de omgeving en eigen events blijven levendig.',
      steps: [
        { label: 'Overdag', title: 'Strand & coworking', description: 'Wissel één strandblok af met een gepland werk- of rustmoment op locatie.' },
        { label: 'Avond', title: 'Event of eigen plan', description: 'Controleer de actuele kalender en kies bewust of je aansluit of elders eet en uitgaat.' },
        { label: 'Nacht', title: 'Kamerpositie telt', description: 'Vraag bij slaapgevoeligheid naar afstand tot bar, zwembad en sociale zones.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Beslis eerst privé versus gedeeld, daarna pas pool view.', description: 'De officiële site toont privékamers van onder meer 25 m² met balkon en ensuite, plus shared dorms. Controleer bij dorms privacy, locker en badkamers; bij privé vooral ligging en balkon.',
      checks: [
        { title: 'Slaaptype', description: 'Kies privékamer of dorm op privacy, sociale behoefte en bagage — niet alleen prijs.' },
        { title: 'Kamerpositie', description: 'Vraag hoe dicht je bij zwembad, bar, lift en eventzones ligt.' },
        { title: 'Eventkalender', description: 'Controleer actuele dagen, inhoud en eventuele kosten rechtstreeks bij Lub d.' },
        { title: 'Voorwaarden', description: 'Vergelijk ontbijt, annulering, betaling en bezetting voor dezelfde kamer.' },
      ],
    },
    faqs: [
      { question: 'Is Lub d Phuket Patong een hostel of hotel?', answer: 'Het is een social-stayconcept met zowel 154 privékamers als 33 gedeelde dorms volgens de officiële site. Je kunt dus hotelachtige privacy kiezen, maar de gezamenlijke sfeer en programmering blijven onderdeel van het verblijf.' },
      { question: 'Hoe ver ligt Lub d Phuket Patong van het strand?', answer: 'Lub d noemt Patong Beach op ongeveer 150 meter en Bangla Walking Street op ongeveer 500 meter. Looproutes en drukte kunnen de werkelijke tijd beïnvloeden.' },
      { question: 'Heeft Lub d Phuket Patong privékamers?', answer: 'Ja. De officiële site toont onder meer king-, pool-view- en twinopties met ensuite badkamer; sommige privékamers zijn 25 m² en hebben een balkon.' },
      { question: 'Is Lub d geschikt voor solo-reizigers?', answer: 'De coworking, sociale ruimtes en activiteiten zijn duidelijk op contact gericht. Wie juist alleen en rustig wil blijven, moet de kamerpositie en eventkalender vooraf controleren.' },
      { question: 'Kun je werken bij Lub d Phuket Patong?', answer: 'De officiële locatiepagina noemt een coworkingruimte. Controleer voor serieus remote werk de actuele opening, zitplekken en internetpraktijk en houd een back-upwerkplek achter de hand.' },
      { question: 'Is Lub d Phuket Patong rustig?', answer: 'Rust is geen kernbelofte: Lub d noemt zelf pool parties, bar crawls en sociale events. Een privékamer op afstand van de eventzones kan beter passen, maar vraag dit vooraf aan de accommodatie.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Deze praktische vragen volgen uit de actuele Lub d-locatie-, kamer- en eventinformatie; er is geen PAA-label gebruikt zonder bruikbaar PAA-resultaat.', relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Lub d Phuket Patong', creator: 'Lub d', url: 'https://lubd.com/destination/phuket-patong/', note: 'Officiële ligging, aantallen privé/dorm, voorzieningen, kamertypes en sociale positionering.' },
      { title: 'Our rooms', creator: 'Lub d', url: 'https://lubd.com/destination/phuket-patong/our-rooms/', note: 'Officiële kamer- en dormopties; controleer live beschikbaarheid op de boekingsdatum.' },
    ],
  },
};

export function getNlPhuketHotelDetailGuide(slug: string): HotelDetailGuideData | null {
  return nlPhuketHotelDetailGuides[slug] || null;
}
