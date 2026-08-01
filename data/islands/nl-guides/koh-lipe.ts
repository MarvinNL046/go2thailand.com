import type { DestinationGuideData } from '../../destinations/types';

export const kohLipeIslandGuide: DestinationGuideData = {
  citySlug: 'koh-lipe', cityName: 'Koh Lipe', locale: 'nl',
  pageTitle: 'Koh Lipe Thailand: stranden, verblijf & route',
  pageDescription: 'Kies waar je verblijft op Koh Lipe. Vergelijk Pattaya, Sunrise, Sunset en de noordkant, met Pak Bara-route, parkcontext en een realistisch eilandritme.',
  pageUrl: 'https://go2-thailand.com/nl/islands/koh-lipe/', dateModified: '2026-07-31', coordinates: { latitude: 6.4881, longitude: 99.3017 }, touristType: ['eilandreizigers', 'snorkelreizigers', 'stellen', 'gezinnen'],
  breadcrumbsRoot: { label: 'Eilanden', href: '/islands/' }, stayGuideHref: null, foodGuideHref: null,
  hero: {
    image: '/images/redesign/koh-lipe-island-hero-nl.webp', imageAlt: 'Compact Koh Lipe met twee stranden, lage bebouwing, longtails en het beboste Koh Adang erachter', imageClassName: 'object-cover object-[69%_center]', eyebrow: 'Klein eiland, lange aanreis', title: 'Koh Lipe', accent: 'Thailand', subtitle: 'Je kiest niet alleen een strand. Je kiest aankomst, avondroute en parkafhankelijkheid.', description: 'Koh Lipe is compact en populair, met drie duidelijk verschillende kusten en Walking Street als avondas. De echte planning zit in de keten via Pak Bara, je hoteltransfer en één bootdag die met zee en parkstatus moet kunnen wisselen.',
    stats: [
      { label: 'Sterk verblijf', value: '3–4 dagen', icon: 'calendar' },
      { label: 'Avondas', value: 'Walking Street', icon: 'map' },
      { label: 'Gateway', value: 'Pak Bara · speedboat', icon: 'ship' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst het marketingbeeld loslaten', title: 'Is Koh Lipe toeristisch?',
    paragraphs: [
      'Ja. Koh Lipe heeft veel accommodatie, restaurants, duik- en touraanbod op een klein oppervlak. Dat maakt het praktisch en levendig, maar betekent ook bootverkeer, bevoorrading, afval- en waterdruk en merkbare verschillen tussen een kamer aan de avondas en een rustigere rand.',
      'Koh Lipe past wanneer je een compact strandverblijf zoekt en de lange aanreis accepteert. Het past minder goed wanneer je een leeg “verborgen eiland” verwacht, goedkope vastelandprijzen nodig hebt of iedere dag gegarandeerd helder snorkelwater en open parkstops verlangt.',
    ],
    verdicts: [
      { label: 'Aankomst & avond', value: 'Pattaya Beach', description: 'Dicht bij Walking Street en veel transfers; overdag ook het sterkste boot- en aankomstprofiel.', icon: 'ship' },
      { label: 'Lange strandbasis', value: 'Sunrise Beach', description: 'Veel hotelkeuze langs de oostkant; exacte noord-zuidligging blijft belangrijk.', icon: 'sun' },
      { label: 'Kleinschaliger west', value: 'Sunset Beach', description: 'Rustiger profiel met minder keuze; avondroute en echte strandtoegang vooraf controleren.', icon: 'waves' },
      { label: 'Noordelijke rand', value: 'North Point', description: 'Sterk voor resort- en strandfocus, maar verder van de centrale avondas en voorraad.', icon: 'compass' },
    ],
  },
  zones: [
    { slug: 'pattaya-walking-street', name: 'Pattaya Beach & Walking Street', kicker: 'Aankomst, gemak & avondlicht', image: '/images/islands/koh-lipe.webp', imageAlt: 'Wit strand, longtail en turquoise water op Koh Lipe', summary: 'Pattaya Beach is de praktische keuze voor wie aankomst, restaurants en Walking Street dichtbij wil houden. Het gebied maakt een kort verblijf eenvoudig en geeft veel keuze binnen een klein bereik.', bestFor: 'Eerste bezoekers, korte verblijven, gezinnen die gemak willen en reizigers met vroege of late transferlogistiek.', tradeoff: 'Gemak brengt bootbeweging, bevoorrading en avondactiviteit. Controleer of je kamer aan strand, looproute of rustige achterkant ligt.' },
    { slug: 'sunrise', name: 'Sunrise Beach · Hat Chao Leh', kicker: 'Lange oostkust met verschillen', image: '/images/blog/koh-lipe-vs-koh-lanta-which-island-is-right-for-you.webp', imageAlt: 'Licht zand en heldere zee aan een Zuid-Thais eiland', summary: 'Sunrise Beach is geen enkel compact hotelcluster, maar een lange oostkust met uiteenlopende resorts en looproutes. De combinatie van strand en Walking Street-bereik maakt dit voor veel reizigers de allround basis.', bestFor: 'Stellen, langere stranddagen, snorkelinteresse en reizigers die meerdere accommodatiestijlen willen vergelijken.', tradeoff: 'Noord, midden en zuid verschillen in boten, wind, getij en avondafstand. Boek nooit alleen op de naam Sunrise Beach.' },
    { slug: 'sunset', name: 'Sunset Beach & westkant', kicker: 'Kleiner, stiller & minder voorraad', image: '/images/redesign/stay-island-hideaway.webp', imageAlt: 'Kleinschalige tropische strandbaai bij zonsondergang', summary: 'De westkant trekt reizigers die een kleinschaliger ritme zoeken en niet iedere activiteit voor de deur nodig hebben. Het is een bewuste keuze voor accommodatie en baai als bestemming.', bestFor: 'Stellen, langzame dagen en reizigers die beperkte eetkeuze en een donkerdere avondroute accepteren.', tradeoff: '“Sunset” garandeert geen leeg strand of eenvoudige toegang. Vraag het hotel naar bagage, avondvervoer, pad en actuele kustconditie.' },
    { slug: 'north-point', name: 'North Point & noordelijk Sunrise', kicker: 'Resortfocus met Adangzicht', image: '/images/redesign/koh-lipe-island-hero-nl.webp', imageAlt: 'Noordelijke kust van Koh Lipe met Koh Adang aan de overkant', summary: 'Aan de noordelijke rand verschuift de focus naar strand, resort en uitzicht op Koh Adang. Je zit nog op een compact eiland, maar dagelijkse looproutes naar Walking Street worden een grotere keuze.', bestFor: 'Resortverblijven, stellen en reizigers die rustiger willen slapen en hun hotelvoorzieningen vooraf vergelijken.', tradeoff: 'Zandbank, getij en kustlijn veranderen het beeld; vertrouw niet op één promotiefoto en controleer de echte route met bagage.' },
  ],
  highlights: [
    { title: 'Walking Street is de avondas, niet het hele eiland', eyebrow: 'Van strand naar avondeten', image: '/images/redesign/koh-lipe-island-hero-nl.webp', imageAlt: 'Lage bebouwing en smalle centrale as op compact Koh Lipe', description: 'De centrale route verbindt veel restaurants, winkels en duikshops, maar je strandkeuze bepaalt hoe vaak je haar gebruikt en hoe de terugweg voelt bij regen, hitte of met kinderen.', decision: 'Kies eerst hoeveel avonden je centraal wilt eten. Vergelijk daarna pas de hotelafstand en werkelijke looproute.', href: '#zones' },
    { title: 'De aankomst eindigt niet altijd bij het strand', eyebrow: 'Pak Bara naar hoteldeur', image: '/images/redesign/thailand-island-hopping-hero-v2.webp', imageAlt: 'Speedboat en longtail tussen eilanden in de Andamanzee', description: 'Voucher, pier, speedboat, drijvende aankomst of strandstop, bagage en laatste hoteltransfer kunnen afzonderlijke stappen zijn. De uitvoering wisselt per operator en conditie.', decision: 'Laat het hotel vóór vertrek uitleggen hoe je vanaf de actuele aankomstplek met bagage bij de receptie komt.', href: '#praktisch' },
    { title: 'Koh Adang en Tarutao blijven een conditionele parkdag', eyebrow: 'Buiten Lipe', image: '/images/redesign/koh-lipe-island-hero-nl.webp', imageAlt: 'Bebost Koh Adang achter de kleine bebouwde basis van Koh Lipe', description: 'Parkstatus, bootroute, wind, getij en zwemniveau bepalen welke stops verantwoord en toegestaan zijn. Wildlife, zicht en een specifieke baai zijn nooit gegarandeerd.', decision: 'Boek op voorwaarden en veiligheidsinformatie, niet op een vaste posterroute. Houd een lokale reservetag.', href: '/activities/' },
  ],
  featureBanner: { image: '/images/redesign/thailand-island-hopping-hero-v2.webp', imageAlt: 'Kleine boot tussen groene eilanden en helder water in Thailand', eyebrow: 'Een marinepark heeft grenzen', title: 'Helder water is geen uitnodiging om overal te zwemmen.', description: 'Controleer parkregels, stroming, botenzones, getij en lokale instructies. Stap niet op koraal, voer dieren niet en behandel een gesloten stop als een echte grens.' },
  food: { image: '/images/redesign/krabi-food-estuary-table.webp', imageAlt: 'Zuid-Thaise kusttafel met vis, rijst, kruiden en groenten', eyebrow: 'Eilandvoorraad op je bord', title: 'Vergelijk beschikbaarheid en allergenen, niet alleen menufoto’s.', description: 'Veel voorraad reist per boot naar het eiland. Menu en prijs kunnen wisselen. Vraag bij allergieën expliciet naar vissaus, garnalenpasta, noten en kruiscontact en bevestig de totaalprijs vóór bereiding.', dishes: [
    { name: 'Gegrilde vis of zeevruchten', description: 'Laat soort, portie, prijswijze en bereiding bevestigen; “dagvers” is geen controleerbare garantie.' },
    { name: 'Zuid-Thaise curry', description: 'Kan pittig zijn en visbasis bevatten. Vraag naar pasta, bouillon en aparte bereiding.' },
    { name: 'Rijstgerecht voor een bootdag', description: 'Praktisch mee te nemen, maar houd bereid eten niet lang warm of in direct zonlicht.' },
  ]},
  itinerary: { eyebrow: 'Drie nachten, één wisselbare bootdag', title: 'Een compact verblijf zonder iedere baai af te vinken.', description: 'Gebruik één slaapbasis en houd de grootste externe activiteit conditioneel. Zo ervaar je Lipe zelf en blijft de aanreis in verhouding.', days: [
    { day: 'Dag 1', title: 'Aankomst, hotelroute & Walking Street', description: 'Rond bagage en transfer af en verken alleen je eigen kust plus de avondas.', href: '#zones' },
    { day: 'Dag 2', title: 'Twee kusten te voet', description: 'Vergelijk je eigen strand met één andere kust en gebruik hitte en getij als ritme.', href: '#doen' },
    { day: 'Dag 3', title: 'Parkboot of lokale reserve', description: 'Controleer zee, parkstatus en operator; wissel zo nodig naar een strand- en eetdag.', href: '#praktisch' },
    { day: 'Dag 4', title: 'Eenvoudige vertrekbuffer', description: 'Plan geen kwetsbare losse aansluiting direct achter een lange bootactiviteit.', href: '#route' },
  ]},
  planning: {
    weather: { title: 'Zeeconditie bepaalt de echte bereikbaarheid', summary: 'Klimaat helpt bij de reisperiode; actuele wind, regen en waarschuwingen bepalen bootvoorraad, parkroute en zwemdag.', best: 'Controleer TMD, parkstatus en operator opnieuw en bouw een wisseldag in.', tradeoff: 'Zon op Koh Lipe garandeert geen rustige overtocht, open parkstop of goed zicht onder water.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Weerkeuze tussen Thaise kustregio’s' },
    transport: { title: 'Pak Bara is het midden, niet het einde', summary: 'Vergelijk vanaf luchthaven of trein tot minivan, exacte pier, speedboat, aankomstplek en laatste hoteltransfer.', facts: ['Controleer alle overstappen op één tijdlijn', 'Vraag hoe bagage op strand of platform reist', 'Plan marge bij losse vlucht en boot', 'Bewaar voucher en hotelcontact offline'], image: '/images/redesign/koh-lipe-island-hero-nl.webp', imageAlt: 'Speedboat nadert de compacte kust van Koh Lipe' },
  },
  practicalTips: [
    { icon: 'ship', title: 'Bagage blijft onderdeel van de route', description: 'Pak licht en vraag hoe koffer of rugzak vanaf boot tot hotel wordt vervoerd.' },
    { icon: 'map', title: 'Compact is niet drempelloos', description: 'Zand, hitte, regen en onverharde stukken veranderen een korte looproute.' },
    { icon: 'waves', title: 'Snorkelen is lokaal', description: 'Gebruik zwemzone, getij, stroming en eigen niveau; blijf uit bootroutes en van koraal af.' },
    { icon: 'compass', title: 'Voorraad heeft marge nodig', description: 'Neem noodzakelijke medicatie en betaalopties mee en vertrouw niet op één eiland-ATM of winkel.' },
  ],
  faqs: [
    { question: 'Is Koh Lipe toeristisch?', answer: 'Ja. Het eiland heeft veel hotels, restaurants, duikshops en tours op een klein oppervlak. Dat geeft gemak, maar ook bootverkeer en druk op voorraad en voorzieningen. Kies je kust op gewenst avondritme en aankomstgemak.' },
    { question: 'Hoe kom je op Ko Lipe?', answer: 'Veel routes combineren Hat Yai of Trang met een landtransfer naar Pak Bara en een speedboat. Controleer de actuele pier, alle overstappen, bagagevoorwaarden, aankomstplek en laatste hoteltransfer op je voucher.' },
    { question: 'Wat is de beste reistijd voor Koh Lipe?', answer: 'Er is geen gegarandeerde beste maand. Gebruik het Satun- en Andamanklimaat als eerste filter en controleer voor iedere overtocht of parkdag de actuele TMD-waarschuwingen, parkstatus en operatorvoorwaarden.' },
    { question: 'Wat te doen op Koh Lipe Thailand?', answer: 'Verken twee verschillende kusten, gebruik Walking Street voor een avond en plan maximaal één conditionele park- of snorkeldag. Houd een reservetag voor zee, getij of gewijzigde parktoegang.' },
  ],
  relatedGuides: [
    { title: 'Hat Yai', description: 'Plan de meest gebruikte gateway en de landtransfer richting Pak Bara.', href: '/city/hat-yai/', image: '/images/redesign/hat-yai-destination-hero.webp', imageAlt: 'Stads- en reisgateway Hat Yai in Zuid-Thailand' },
    { title: 'Koh Lanta', description: 'Vergelijk een compact bootafhankelijk eiland met een langer eiland en weglogistiek.', href: '/islands/koh-lanta/', image: '/images/redesign/koh-lanta-island-hero-nl.webp', imageAlt: 'Lange westkust en kustweg van Koh Lanta' },
    { title: 'Thailand weer', description: 'Begrijp de Andamankust en controleer daarna actuele zee- en weerswaarschuwingen.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Visuele vergelijking van Thaise kustseizoenen' },
  ],
  sources: [
    { title: 'Satun', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/Satun/352', note: 'Officiële brede context voor Pak Bara, Koh Lipe en regionale bootcondities.' },
    { title: '10 things to do in Satun', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/10-things-to-do-in-satun', note: 'Officiële Koh Lipe- en Tarutao-context.' },
    { title: 'National park information', creator: 'Department of National Parks Thailand', url: 'https://www.dnp.go.th/', note: 'Primaire bron voor actuele Tarutao-parkstatus en regels.' },
    { title: 'Warning and events', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en/warning-and-events', note: 'Actuele weer- en maritieme waarschuwingen.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele veiligheids-, grens- en consulaire context.' },
  ],
};
