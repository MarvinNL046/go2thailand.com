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
};

export function getNlPhuketHotelDetailGuide(slug: string): HotelDetailGuideData | null {
  return nlPhuketHotelDetailGuides[slug] || null;
}
