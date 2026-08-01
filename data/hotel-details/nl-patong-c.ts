import type { HotelDetailGuideData } from './types';

const relatedPatongGuides = [
  {
    title: 'Patong als reisbasis',
    description: 'Vergelijk strand, uitgaan, winkelstraten en rustigere randen van Patong.',
    href: '/phuket/patong/',
    image: '/images/redesign/patong-area-hero-v2.webp',
    imageAlt: 'Patong Beach en de bebouwde baai aan de westkust van Phuket',
  },
  {
    title: 'Hotels in Patong vergelijken',
    description: 'Kies je zone en controleer de actuele kamer, voorwaarden en looproute.',
    href: '/phuket/patong/hotels/',
    image: '/images/redesign/phuket-stay-patong.webp',
    imageAlt: 'Hotel en tropische kust bij Patong op Phuket',
  },
  {
    title: 'Phuket reisgids',
    description: 'Combineer Patong met stranden, Phuket Old Town en haalbare dagtochten.',
    href: '/city/phuket/',
    image: '/images/redesign/phuket-destination-hero-v2.webp',
    imageAlt: 'Tropische kust van Phuket met helder water',
  },
];

export const nlPatongCHotelDetailGuides: Record<string, HotelDetailGuideData> = {
  'best-western-patong-beach': {
    slug: 'best-western-patong-beach',
    hotelName: 'Best Western Patong Beach',
    cityName: 'Phuket',
    citySlug: 'phuket',
    destinationHref: '/phuket/patong/',
    hotelGuideHref: '/phuket/patong/hotels/',
    hotelGuideLabel: 'Hotels in Patong',
    area: 'Centraal Patong · Phang Muang Sai Kor',
    pageTitle: 'Best Western Patong Beach: controleer dit vóór boeken',
    pageDescription: 'Eerlijk verblijfadvies over Best Western Patong Beach: centrale ligging, kamers, ontbijt en de tegenstrijdige officiële zwembadinformatie.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/best-western-patong-beach/',
    dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/best-western-patong-guide-hero.webp',
      imageAlt: 'Redactioneel sfeerbeeld van een stadshotel tussen de straten van Patong',
      imageCaption: 'AI-gegenereerd sfeerbeeld van Patong; bekijk actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Centraal hotel met een belangrijke verificatie',
      title: 'Best Western',
      accent: 'Patong Beach',
      subtitle: 'Een praktische stadsbasis, maar verifieer het zwembad rechtstreeks.',
      description: 'Best Western plaatst het hotel aan 190 Phangmueangsai Gor, op ongeveer één kilometer van Patong Beach en Jungceylon. De officiële pagina spreekt tegelijk over een rooftop pool bar én over het ontbreken van een zwembad. Laat dit vóór betaling schriftelijk bevestigen.',
      ctaLabel: 'Controleer actuele kamers',
    },
    verdict: {
      eyebrow: 'Het korte oordeel',
      title: 'Kies de centrale ligging, niet een onbevestigde zwembadbelofte.',
      description: 'De hotelidentiteit, het adres en de locatie zijn actueel bevestigd. De officiële informatie over het zwembad is intern tegenstrijdig. Voor wie een zwembad essentieel vindt, is een live bevestiging van hotel of boekingspartner daarom een harde boekingsvoorwaarde.',
      stats: [
        { label: 'Adres', value: '190 Phangmueangsai Gor', note: 'Controleer dit in de boekingsflow', icon: 'map' },
        { label: 'Strand', value: 'Circa 1 km', note: 'Afstand volgens Best Western', icon: 'waves' },
        { label: 'Kamers', value: 'Superior', note: 'Queen of twee eenpersoonsbedden', icon: 'bed' },
        { label: 'Zwembad', value: 'Eerst verifiëren', note: 'Officiële pagina spreekt zichzelf tegen', icon: 'sparkles' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?',
      title: 'Een stedelijke Patong-basis voor wie vooraf controleert.',
      intro: 'De locatie is bruikbaar voor strand, winkels en avondleven; de faciliteitencheck bepaalt of het hotel echt bij je wensen past.',
      goodFor: ['Reizigers die centraal Patong als dagelijkse zone kiezen', 'Wie een eenvoudige Superior-kamer met balkon en stadszicht zoekt', 'Gasten die Jungceylon, strand en uitgaan willen combineren', 'Reizigers die ontbijt en annuleringsvoorwaarden per tarief vergelijken'],
      tradeoffs: ['De officiële zwembadclaims zijn tegenstrijdig en mogen niet als zekerheid worden verkocht', 'Het hotel ligt niet direct aan het strand', 'De actuele kamerpagina toont een compacte keuze in kamertypes', 'Ontbijt is niet automatisch in ieder tarief inbegrepen'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk',
      title: 'Plan Patong te voet, maar bekijk de echte route.',
      description: 'Best Western noemt circa één kilometer tot Patong Beach en Jungceylon. Verkeersdrukte, hitte en de exacte ingang bepalen of die afstand voor jou prettig loopt.',
      steps: [
        { label: 'Vooraf', title: 'Open de kaart', description: 'Controleer hoteladres, strandroute en jouw belangrijkste avondbestemming.' },
        { label: 'Overdag', title: 'Bundel strand en winkels', description: 'Vermijd onnodige ritten door activiteiten per Patong-zone te plannen.' },
        { label: 'Buiten Patong', title: 'Reserveer vervoer', description: 'Voor andere stranden en Phuket Old Town blijft gemotoriseerd vervoer nodig.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer',
      title: 'Vraag een ondubbelzinnig antwoord over het zwembad.',
      description: 'Een verwijzing naar een rooftop pool bar is geen bruikbare garantie wanneer dezelfde officiële pagina “geen zwembad” vermeldt. Vraag of er op jouw data een operationeel gastenbad is.',
      checks: [
        { title: 'Zwembadstatus', description: 'Laat schriftelijk bevestigen of er een gastenbad is en of dit geopend is.' },
        { title: 'Hotelidentiteit', description: 'Controleer naam en adres 190 Phangmueangsai Gor.' },
        { title: 'Kamer', description: 'Vergelijk queen en twin, balkon, stadszicht en maximale bezetting.' },
        { title: 'Tarief', description: 'Controleer ontbijt, belastingen, annulering en betaling in dezelfde boekingsstap.' },
      ],
    },
    faqs: [
      { question: 'Heeft Best Western Patong Beach een zwembad?', answer: 'Dat kan op basis van de huidige officiële pagina niet betrouwbaar met ja of nee worden beantwoord. De hoteltekst noemt een rooftop pool bar, terwijl de FAQ op dezelfde pagina zegt dat er geen zwembad is. Laat het hotel of de boekingspartner schriftelijk bevestigen wat op jouw verblijfsdata beschikbaar is.' },
      { question: 'Ligt Best Western Patong Beach direct aan het strand?', answer: 'Nee. Best Western noemt Patong Beach op ongeveer één kilometer. Controleer de praktische looproute voor jouw mobiliteit en aankomsttijd.' },
      { question: 'Zijn parkeren en Best Western Rewards beschikbaar?', answer: 'De actuele officiële boekingspagina noemt gratis parkeren en deelname aan Best Western Rewards. Controleer beschikbaarheid, voertuigvoorwaarden en de voorwaarden voor punten bij jouw tarief.' },
      { question: 'Welke kamers biedt Best Western Patong Beach?', answer: 'De officiële boekingspagina toont Superior-kamers met een queenbed of twee eenpersoonsbedden, balkon en stadszicht. Controleer de bezetting en de exacte inrichting in jouw gekozen tarief.' },
      { question: 'Is ontbijt inbegrepen?', answer: 'Niet automatisch. Best Western vermeldt ontbijt tegen betaling en toont ook afzonderlijke ontbijttarieven. Lees de inclusies van jouw tarief.' },
      { question: 'Biedt het hotel vervoer vanaf de luchthaven?', answer: 'Neem luchthavenvervoer niet automatisch aan. Controleer in de actuele boekingsflow of er een transfer wordt aangeboden, wat die omvat en hoe laat je aankomst wordt opgevangen.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt',
    faqDescription: 'De officiële Best Western-pagina bevat een materiële faciliteitentegenstrijdigheid; controleer de actuele situatie rechtstreeks.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Best Western Patong Beach', creator: 'Best Western Hotels & Resorts', url: 'https://www.bestwestern.com/en_US/book/hotels-in-phuket/best-western-patong-beach/propertyCode.99360.html', note: 'Officiële bron voor identiteit, adres, ligging, horeca en de tegenstrijdige zwembadvermeldingen.' },
      { title: 'Hotel Rooms', creator: 'Best Western Hotels & Resorts', url: 'https://www.bestwestern.com/en_US/book/phuket/hotel-rooms/best-western-patong-beach/propertyCode.99360.html', note: 'Officiële boekingsbron voor actuele kamertypes, bedden, balkon, stadszicht en tariefvoorwaarden.' },
    ],
  },

  'mt-hotel-patong': {
    slug: 'mt-hotel-patong',
    hotelName: 'MT Hotel Patong',
    cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong',
    area: 'Noordelijk Patong · Pisitkaranee Road',
    pageTitle: 'MT Hotel Patong: verifieer de actuele status vóór boeken',
    pageDescription: 'Voorzichtig verblijfadvies over MT Hotel Patong: adres, afstand tot het centrum en waarom je operationele status en faciliteiten eerst moet bevestigen.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/mt-hotel-patong/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/mt-hotel-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een klein hotel aan de noordelijke rand van Patong', imageCaption: 'AI-gegenereerd sfeerbeeld; gebruik actuele aanbiederfoto’s uitsluitend na controle van naam en adres.',
      eyebrow: 'Status eerst, boeking daarna', title: 'MT Hotel', accent: 'Patong', subtitle: 'Een bestaande boekingsvermelding is nog geen bevestigde hoteloperatie.',
      description: 'MT Hotel verschijnt nog bij boekingsplatforms op 24/10 Pisitkaranee Road, maar er is onvoldoende actuele primaire hotelinformatie om eigendom, faciliteiten en dagelijkse operatie onafhankelijk te bevestigen. Boek alleen na een live identiteits- en statuscheck.', ctaLabel: 'Controleer actuele status',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Behandel dit als een statusowner, niet als een gewone aanbeveling.',
      description: 'De route kan nuttig blijven om reizigers voor een risicovolle aanname te behoeden. Wij bevestigen geen zwembad, adults-onlybeleid, restaurant, kamervoorraad of opening zolang een actuele primaire hotelbron ontbreekt.',
      stats: [
        { label: 'Vermeld adres', value: '24/10 Pisitkaranee Rd.', note: 'Moet overeenkomen vóór betaling', icon: 'map' },
        { label: 'Status', value: 'Live controleren', note: 'Geen voldoende actuele primaire bevestiging', icon: 'sparkles' },
        { label: 'Kamers', value: 'Niet bevestigd', note: 'Oude inventaris niet overnemen', icon: 'bed' },
        { label: 'Faciliteiten', value: 'Niet bevestigd', note: 'Vraag per verblijfsdatum', icon: 'waves' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Alleen wanneer verificatie vóór betaling lukt.',
      intro: 'Een laag tarief of actieve kalender weegt niet op tegen onduidelijkheid over exploitant en voorzieningen.',
      goodFor: ['Reizigers die naam, adres en bereikbaarheid rechtstreeks kunnen bevestigen', 'Wie een betaalbaar verblijf aan de noordelijke rand van Patong zoekt', 'Gasten die geen onbevestigde faciliteit als harde eis hebben', 'Wie een flexibel en beschermd betalingstarief kan kiezen'],
      tradeoffs: ['Een actuele primaire website of controleerbaar hotelkanaal ontbreekt', 'Platformvermeldingen geven onderling wisselende faciliteiten en afstanden', 'De operationele status kan niet uit een kalender alleen worden afgeleid', 'Oude beschrijvingen en foto’s kunnen de huidige situatie verkeerd voorstellen'],
    },
    location: {
      eyebrow: 'Locatie zonder aannames', title: 'Controleer het punt op de kaart én de receptie.',
      description: 'De terugkerende platformvermelding gebruikt 24/10 Pisitkaranee Road. Dit ligt niet aan het strand; gebruik geen oude marketingtekst als bewijs voor loopafstand of transfergemak.',
      steps: [
        { label: 'Identiteit', title: 'Match naam en adres', description: 'Laat bevestigen dat MT Hotel Patong op dit adres gasten ontvangt.' },
        { label: 'Contact', title: 'Test de receptie', description: 'Vraag via een controleerbaar kanaal naar aankomsttijd, bagage en faciliteiten.' },
        { label: 'Route', title: 'Bekijk echte afstanden', description: 'Bereken strand en centrum vanaf het exacte kaartpunt.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Maak status en identiteit harde voorwaarden.',
      description: 'Ga pas verder wanneer boekingspartner of accommodatie schriftelijk bevestigt welke rechtspersoon, receptie, kamer en faciliteiten jouw reservering levert.',
      checks: [
        { title: 'Operationeel', description: 'Vraag of het hotel op jouw data geopend is en gasten incheckt.' },
        { title: 'Identiteit', description: 'Controleer hotelnaam, volledig adres en contactkanaal.' },
        { title: 'Voorzieningen', description: 'Laat zwembad, ontbijt, parkeren en receptietijden afzonderlijk bevestigen.' },
        { title: 'Betaling', description: 'Kies bij onzekerheid een flexibel tarief en een betaalmethode met passende bescherming.' },
      ],
    },
    faqs: [
      { question: 'Is MT Hotel Patong nog open?', answer: 'Er bestaan actuele platformvermeldingen, maar wij vonden onvoldoende actuele primaire hotelinformatie om de dagelijkse operatie zelfstandig te bevestigen. Vraag vóór betaling expliciet of het hotel op jouw data geopend is en gasten ontvangt.' },
      { question: 'Wat is het adres van MT Hotel Patong?', answer: 'De terugkerende vermelding is 24/10 Pisitkaranee Road, Patong. Laat dit adres in de definitieve boeking en bij het hotel bevestigen.' },
      { question: 'Heeft MT Hotel Patong een zwembad?', answer: 'Platformbronnen noemen een zwembad, maar zonder actuele primaire hotelbron nemen wij dat niet als bevestigd feit over. Vraag naar beschikbaarheid en opening op jouw data.' },
      { question: 'Is MT Hotel Patong adults-only?', answer: 'Daarover bestaan wisselende platformvermeldingen. Beschouw het niet als bevestigd beleid en vraag de accommodatie naar de actuele leeftijds- en kinderregels.' },
      { question: 'Ligt MT Hotel Patong aan Patong Beach?', answer: 'Nee, het vermelde adres ligt landinwaarts aan de noordelijke rand van Patong. Controleer de route vanaf het exacte kaartpunt.' },
      { question: 'Hoe boek je MT Hotel Patong veilig?', answer: 'Verifieer naam, adres, operationele status, receptie, kamer en faciliteiten schriftelijk. Kies vervolgens een transparant tarief met passende annulerings- en betalingsbescherming.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Deze pagina maakt onzekerheid zichtbaar en vervangt een live bevestiging door de accommodatie niet.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'MT Hotel Patong', creator: 'MT Hotel Patong', url: 'http://mthotelpatong.com/', note: 'Vermoedelijk officieel domein, maar zonder bruikbare actuele primaire hotelinhoud; daarom geen faciliteits- of operationele claims hieruit afgeleid.' },
      { title: 'MT Hotel Patong listing', creator: 'Booking.com', url: 'https://www.booking.com/hotel/th/po-mt-hotel-patong.en-gb.html', note: 'Actuele distributievermelding voor naam en adres; geen vervanging voor primaire operationele bevestiging.' },
      { title: 'MT Hotel directory profile', creator: 'Phuket.Net', url: 'https://www.phuket.net/directory/profile/mt-hotel/', note: 'Oudere lokale directoryvermelding waarmee identiteit en contacthistorie zijn vergeleken; faciliteiten niet als actueel overgenomen.' },
    ],
  },

  'icheck-inn-residences-patong': {
    slug: 'icheck-inn-residences-patong',
    hotelName: 'iCheck inn Residences Patong',
    cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong',
    area: 'Centraal Patong · Phung Muang Road',
    pageTitle: 'iCheck inn Residences Patong: appartementen met keuken',
    pageDescription: 'Eerlijk verblijfadvies over iCheck inn Residences Patong: 79 appartementen, keukens, één tot drie slaapkamers en checks voor langer verblijf.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/icheck-inn-residences-patong/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/icheck-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een serviced apartment met keuken in Patong', imageCaption: 'AI-gegenereerd sfeerbeeld van een appartement; bekijk de actuele indeling en foto’s bij de aanbieder.',
      eyebrow: 'Appartement in plaats van klassieke hotelkamer', title: 'iCheck inn Residences', accent: 'Patong', subtitle: 'Meer woonruimte en een keuken voor een kort of langer verblijf.',
      description: 'Aspira noemt 79 moderne appartementen met één, twee of drie slaapkamers. De woonopzet, keukenapparatuur en keuze uit meerdere slaapkamers zijn de echte redenen om dit boven een gewone hotelkamer te kiezen.', ctaLabel: 'Bekijk actuele appartementen',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Sterk wanneer je keuken en aparte leefruimte werkelijk gebruikt.',
      description: 'De huidige officiële pagina bevestigt 79 appartementen en noemt koelkast, magnetron, keukenapparatuur en kookplaat. Vergelijk de exacte indeling en bezetting; “residence” zegt op zichzelf niet hoeveel slaapkamers je boekt.',
      stats: [
        { label: 'Voorraad', value: '79 appartementen', note: 'Volgens Aspira', icon: 'bed' },
        { label: 'Keuze', value: '1–3 slaapkamers', note: '28, 67 of 120 m² volgens Aspira', icon: 'map' },
        { label: 'Keuken', value: 'Zelf koken mogelijk', note: 'Met onder meer kookplaat en magnetron', icon: 'sparkles' },
        { label: 'Faciliteiten', value: 'Gym en buitenbad', note: 'Actuele status opnieuw controleren', icon: 'waves' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Kies het voor verblijfsritme, niet alleen voor extra vierkante meters.',
      intro: 'Een appartement werkt vooral wanneer ontbijt, eenvoudige maaltijden, werk of privacy tussen slaapkamers deel van je plan zijn.',
      goodFor: ['Langere verblijven waarbij een keuken praktisch is', 'Gezelschappen die één, twee of drie slaapkamers gericht vergelijken', 'Reizigers die een zithoek en eettafel waarderen', 'Wie centrale Patong-ligging met zelfstandig verblijven combineert'],
      tradeoffs: ['De exacte keukeninventaris kan per appartementcategorie verschillen', 'Een aparthotel biedt een ander serviceniveau dan een full-service resort', 'Bezetting en bedopstelling moeten per categorie worden gecontroleerd', 'Zwembad, gym en parkeren blijven datumgebonden faciliteiten'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Centraal, maar niet beachfront.',
      description: 'De officiële contactpagina noemt 158/99 Phung Muang Road Saay 3 Kor. Gebruik dat adres om je route naar strand, Jungceylon en avondbestemmingen te beoordelen.',
      steps: [
        { label: 'Boodschappen', title: 'Plan rond de keuken', description: 'Controleer nabijgelegen winkels als je regelmatig zelf wilt koken.' },
        { label: 'Centrum', title: 'Loop gericht', description: 'Bundel Jungceylon, restaurants en avondactiviteiten binnen dezelfde zone.' },
        { label: 'Strand', title: 'Bekijk de echte route', description: 'Beoordeel afstand, hitte en verkeersoversteken vanaf het exacte adres.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Leg slaapkamers, keuken en service naast elkaar.',
      description: 'De categorie bepaalt of je een compacte éénkameropzet of een groot appartement boekt. Controleer daarnaast schoonmaak, ontbijt en gebruik van gemeenschappelijke faciliteiten.',
      checks: [
        { title: 'Indeling', description: 'Vergelijk 1BR van 28 m², 2BR van 67 m² en 3BR van 120 m² met de actuele plattegrond.' },
        { title: 'Keuken', description: 'Laat bevestigen welke kookplaat, koelkast, magnetron en keukenartikelen aanwezig zijn.' },
        { title: 'Bezetting', description: 'Voer alle volwassenen en kinderen in en controleer bedden en extra bedden.' },
        { title: 'Service', description: 'Controleer schoonmaakfrequentie, ontbijt, borg, parkeren en annuleringsregels.' },
      ],
    },
    faqs: [
      { question: 'Hoeveel appartementen heeft iCheck inn Residences Patong?', answer: 'Aspira noemt op de actuele officiële pagina 79 appartementen.' },
      { question: 'Hebben de appartementen een keuken?', answer: 'Ja. De officiële pagina noemt onder meer een koelkast, magnetron, keukenapparatuur en kookplaat. Controleer de volledige inventaris van jouw specifieke categorie.' },
      { question: 'Welke appartementtypen zijn er?', answer: 'Aspira noemt een éénslaapkamerappartement van 28 m², een tweeslaapkamerappartement van 67 m² en een drieslaapkamerappartement van 120 m². Controleer bedden, badkamers en maximale bezetting per categorie.' },
      { question: 'Is iCheck inn Residences Patong geschikt voor lang verblijf?', answer: 'De keuken, aparte woonopzet en vaste-termijnarrangementen kunnen daarvoor praktisch zijn. Controleer minimale verblijfsduur, schoonmaak, wasmogelijkheden, borg en maaltijdservice voor jouw data.' },
      { question: 'Heeft de accommodatie een zwembad en fitnessruimte?', answer: 'De officiële pagina noemt een buitenzwembad en fitnessruimte. Controleer voor vertrek opening, onderhoud en toegangsvoorwaarden.' },
      { question: 'Waar ligt iCheck inn Residences Patong?', answer: 'Het officiële adres is 158/99 Phung Muang Road Saay 3 Kor in Patong. Het is een centrale stadsbasis en geen accommodatie direct aan het strand.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'Controleer appartementcategorie, keukeninventaris en verblijfsvoorwaarden in de actuele boekingsflow.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'iCheck inn Residence Patong', creator: 'Aspira Hotels & Resorts', url: 'https://www.aspirahotels.com/hotels-residences/icheck-inn-residences-patong/', note: 'Officiële bron voor 79 appartementen, één tot drie slaapkamers, keukenvoorzieningen, faciliteiten, adres en contact.' },
    ],
  },

  'woovo-phuket-patong': {
    slug: 'woovo-phuket-patong',
    hotelName: 'Woovo Phuket Patong',
    cityName: 'Phuket', citySlug: 'phuket', destinationHref: '/phuket/patong/', hotelGuideHref: '/phuket/patong/hotels/', hotelGuideLabel: 'Hotels in Patong',
    area: 'Centraal Patong · 25 Rajpathanusorn Road',
    pageTitle: 'Woovo Phuket Patong: controleer de kamerdata zorgvuldig',
    pageDescription: 'Eerlijk verblijfadvies over Woovo Phuket Patong: centrale ligging, zwembad, restaurant en waarom de officiële kamerdata eerst geverifieerd moet worden.',
    pageUrl: 'https://go2-thailand.com/nl/phuket/patong/hotels/woovo-phuket-patong/', dateModified: '2026-07-31',
    hero: {
      image: '/images/redesign/woovo-patong-guide-hero.webp', imageAlt: 'Redactioneel sfeerbeeld van een modern stadshotel in centraal Patong', imageCaption: 'AI-gegenereerd sfeerbeeld van Patong; controleer actuele hotel- en kamerfoto’s bij de aanbieder.',
      eyebrow: 'Actief hotel, onbetrouwbare kamerdetailroute', title: 'Woovo Phuket', accent: 'Patong', subtitle: 'Gebruik de hotelpagina, maar vertrouw de kamercijfers niet blind.',
      description: 'De actuele Woovo-pagina bevestigt een actieve accommodatie binnen de Swandor-portfolio, met restaurant, fitness en zwembad. Sommige vernieuwde Phuket-kamerroutes tonen echter inhoud van Turkse zusterhotels; neem oppervlaktes, kamernamen en bezetting pas over na live verificatie.', ctaLabel: 'Controleer actuele kamer',
    },
    verdict: {
      eyebrow: 'Het korte oordeel', title: 'Een bruikbare Patong-basis met een datakwaliteitswaarschuwing.',
      description: 'De hotelidentiteit en kernfaciliteiten zijn actueel zichtbaar. De officiële kamerindex noemt andere oppervlaktes en bezetting dan de detailroute, die bovendien signalen van een verkeerde hotelcontext bevat. Selecteer daarom in de live booking engine en laat de gekozen kamer bevestigen.',
      stats: [
        { label: 'Adres', value: '25 Rajpathanusorn Rd.', note: 'Match dit in de boekingsflow', icon: 'map' },
        { label: 'Kamertypen', value: 'Deluxe en Family', note: 'Exacte data eerst controleren', icon: 'bed' },
        { label: 'Faciliteiten', value: 'Zwembad en fitness', note: 'Volgens de actuele hotelpagina', icon: 'waves' },
        { label: 'Kamerdata', value: 'Tegenstrijdig', note: 'Turkse zusterhoteldata niet overnemen', icon: 'sparkles' },
      ],
    },
    fit: {
      eyebrow: 'Past het bij jouw reis?', title: 'Sterk voor centraal Patong als je de kamer schriftelijk vastlegt.',
      intro: 'Het hotel combineert een moderne stadsbasis met restaurant, fitness en zwembad; de boekingscontrole is hier belangrijker dan een losse kamertitel.',
      goodFor: ['Reizigers die centraal Patong en een modern hotelritme zoeken', 'Wie zwembad en fitness als aanvulling gebruikt', 'Gezinnen die een echte family-indeling rechtstreeks laten bevestigen', 'Gasten die via de actuele boekingsroute kamer en voorwaarden vergelijken'],
      tradeoffs: ['De officiële kamerindex en kamerdetailpagina zijn onderling inconsistent', 'Oppervlakte en maximale bezetting mogen niet zonder verificatie worden aangenomen', 'Het hotel ligt niet direct op het zand', 'Algemene hotelclaims vertellen niet welke faciliteiten in jouw tarief zitten'],
    },
    location: {
      eyebrow: 'Locatie in de praktijk', title: 'Centraal Patong zonder beachfront-belofte.',
      description: 'De officiële groepscatalogus positioneert Woovo op circa tien minuten lopen van Patong Beach en noemt Jungceylon en Bangla Road in de buurt. Controleer de echte route vanaf 25 Rajpathanusorn Road.',
      steps: [
        { label: 'Strand', title: 'Test de looproute', description: 'Bekijk verkeer, hitte en de kortste toegankelijke route.' },
        { label: 'Avond', title: 'Bundel centraal Patong', description: 'Combineer restaurants, Jungceylon en Bangla Road zonder onnodige ritten.' },
        { label: 'Rust', title: 'Vraag kamerpositie', description: 'Laat ligging ten opzichte van straat, lift en zwembad bevestigen.' },
      ],
    },
    booking: {
      eyebrow: 'Boek slimmer', title: 'Laat de geselecteerde kamer spreken, niet de foutieve detailpagina.',
      description: 'Oudere officiële hotelpagina’s noemen Deluxe en Deluxe Family, maar sommige vernieuwde Phuket-detailroutes tonen “Deluxe Swim Up” of “Deluxe Pool Suite” met Kemer- of Lykia-context. Gebruik die fout gerouteerde data niet als boekingsbewijs.',
      checks: [
        { title: 'Kamercode', description: 'Noteer de exacte categorie uit de actuele booking engine.' },
        { title: 'Oppervlakte', description: 'Vraag het hotel de vierkante meters van precies die categorie te bevestigen.' },
        { title: 'Bezetting', description: 'Laat aantal volwassenen, kinderen en echte bedden schriftelijk vastleggen.' },
        { title: 'Tarief', description: 'Controleer ontbijt, belastingen, annulering en betalingsmoment vóór afronden.' },
      ],
    },
    faqs: [
      { question: 'Is Woovo Phuket Patong nog actief?', answer: 'De actuele officiële Woovo-pagina toont het hotel als onderdeel van de Swandor-portfolio en biedt een boekingsroute. Controleer voor jouw data altijd beschikbaarheid, naam en adres.' },
      { question: 'Welke kamers heeft Woovo Phuket Patong?', answer: 'Oudere officiële propertypagina’s noemen Deluxe en Deluxe Family. Sommige vernieuwde Phuket-routes tonen echter kamertypen en boekingscontext van Turkse zusterhotels. Controleer daarom de live categorie, oppervlakte en bezetting rechtstreeks.' },
      { question: 'Hoe groot is een Deluxe Family Room?', answer: 'Dat publiceren we niet als vast feit, omdat de officiële kamerindex en detailroute verschillende oppervlaktes noemen. Laat de maat van de gekozen kamercode door het hotel bevestigen.' },
      { question: 'Hoeveel personen passen in een familiekamer?', answer: 'De officiële pagina’s zijn hierover niet consistent. Voer het volledige gezelschap in de live boekingsflow in en vraag om schriftelijke bevestiging van bedden en maximale bezetting.' },
      { question: 'Heeft Woovo Phuket Patong een zwembad en fitness?', answer: 'De actuele officiële hotelpagina toont zwembad en fitness. Controleer de opening en vraag ook apart of spa- of kinderfaciliteiten werkelijk bij deze Phuket-property horen; fout gerouteerde zusterhotelcontent is geen bewijs.' },
      { question: 'Ligt Woovo Phuket Patong direct aan het strand?', answer: 'Nee. De officiële groepscatalogus omschrijft het hotel als ongeveer tien minuten lopen van Patong Beach. Controleer de actuele route vanaf 25 Rajpathanusorn Road.' },
    ],
    faqEyebrow: 'Vragen vóór je boekt', faqDescription: 'De kamerdata op de officiële site is inconsistent; laat de gekozen categorie daarom vóór betaling bevestigen.',
    relatedGuides: relatedPatongGuides,
    sources: [
      { title: 'Woovo Phuket Patong', creator: 'Woovo Hotels', url: 'https://woovohotels.com/de/woovo-phuket-patong/home', note: 'Officiële actuele hotelpagina voor identiteit, portfolioverband, restaurant, fitness en zwembad.' },
      { title: 'About Woovo', creator: 'Woovo Hotels', url: 'https://woovohotels.com/about', note: 'Officiële merkbron voor de relatie tussen Woovo en de Swandor-portfolio.' },
      { title: 'Deluxe Room', creator: 'Woovo Hotels', url: 'https://woovohotels.com/en/hotels/woovo-patong/room/deluxe-room', note: 'Oudere property-specifieke primaire bron; alleen gebruikt als historische categoriecontext en niet om fout gerouteerde actuele data te bevestigen.' },
      { title: 'Woovo Restaurant', creator: 'Woovo Hotels', url: 'https://woovohotels.com/en/hotels/woovo-patong/restaurant/woovo-restaurant', note: 'Property-specifieke primaire bron voor restaurant en ontbijt; actuele tijden en inclusie blijven te controleren.' },
      { title: 'Swandor catalogue', creator: 'Swandor Hotels & Resorts', url: 'https://www.swandorhotels.com/catalog/catalog.pdf', note: 'Primaire groepsbron voor de positionering van Woovo ten opzichte van Patong Beach, Jungceylon en Bangla Road.' },
    ],
  },
};

export const nlPatongCHotelDetailSlugs = new Set(Object.keys(nlPatongCHotelDetailGuides));

export function getNlPatongCHotelDetailGuide(slug: string): HotelDetailGuideData | undefined {
  return nlPatongCHotelDetailGuides[slug];
}
