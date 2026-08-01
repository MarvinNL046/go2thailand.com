import type { DestinationGuideData } from '../../destinations/types';

export const kohChangIslandGuide: DestinationGuideData = {
  citySlug: 'koh-chang', cityName: 'Koh Chang', locale: 'nl',
  pageTitle: 'Koh Chang Thailand: waar verblijven & wat doen?',
  pageDescription: 'Ontdek of Koh Chang bij je past. Vergelijk White Sand, Klong Prao, Kai Bae en Lonely Beach, met ferryketen, jungleplanning en een realistische route.',
  pageUrl: 'https://go2-thailand.com/nl/islands/koh-chang/', dateModified: '2026-07-31', coordinates: { latitude: 12.0614, longitude: 102.3479 }, touristType: ['eilandreizigers', 'natuurreizigers', 'gezinnen', 'strandreizigers'],
  breadcrumbsRoot: { label: 'Eilanden', href: '/islands/' }, stayGuideHref: null, foodGuideHref: null,
  hero: {
    image: '/images/redesign/koh-chang-island-hero-nl.webp', imageAlt: 'Bergachtige junglekust van Koh Chang met baaien, ferry en bochtige westkustweg', imageClassName: 'object-cover object-[68%_center]', eyebrow: 'Jungle-eiland met één hoofdweg', title: 'Koh Chang', accent: 'Thailand', subtitle: 'De ferry brengt je naar het eiland. Je slaapzone bepaalt hoeveel weg je daarna nog aflegt.', description: 'Koh Chang combineert toeristische westkustzones met steile jungle, watervallen en een veel stillere oostkant. Dat contrast is de kracht — zolang je ferry, wegafstand en weer als onderdeel van de reis behandelt.',
    stats: [
      { label: 'Sterk verblijf', value: '4–5 dagen', icon: 'calendar' },
      { label: 'Keuze-as', value: 'Westkust · noord–zuid', icon: 'map' },
      { label: 'Gateway', value: 'Trat · voertuigferry', icon: 'ship' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst de omweg beoordelen', title: 'Is Koh Chang de moeite waard?',
    paragraphs: [
      'Ja, wanneer je strand wilt combineren met een duidelijk groen en bergachtig eilandprofiel en bereid bent tijd te reserveren voor de route via Trat, pier en ferry. De westkust biedt voldoende hotels en restaurants; natuur en rust liggen niet automatisch naast iedere kamer.',
      'Koh Chang past minder goed wanneer je alles lopend wilt doen, een vlak wegennet verwacht of meerdere kwetsbare aansluitingen op één dag plant. De hoofdweg kent bochten, hoogteverschil en donkere stukken; een rustige baai kan daardoor praktisch verder weg voelen dan de kaart suggereert.',
    ],
    verdicts: [
      { label: 'Meeste gemak', value: 'White Sand', description: 'Veel keuze en korte route vanaf de ferrykant; ook meer verkeer en avondactiviteit.', icon: 'hotel' },
      { label: 'Ruimte & gezin', value: 'Klong Prao', description: 'Langere kustzone met resorts en groen; exacte ligging rond rivier en weg controleren.', icon: 'waves' },
      { label: 'Allround zuiden', value: 'Kai Bae', description: 'Goede balans tussen voorzieningen en zuidelijke uitstappen, met heuvelroutes eromheen.', icon: 'compass' },
      { label: 'Sociaal & budget', value: 'Lonely Beach', description: 'De naam betekent niet stil: controleer actuele avondgeluiden en echte strandafstand.', icon: 'sparkles' },
    ],
  },
  zones: [
    { slug: 'white-sand', name: 'White Sand Beach · Hat Sai Khao', kicker: 'Gemak, keuze & verkeer', image: '/images/islands/koh-chang.webp', imageAlt: 'Groene kust en zandstrand op Koh Chang', summary: 'White Sand ligt aan de noordelijke westkust en bundelt veel accommodatie, restaurants en winkels. De route vanaf de ferryzijde is relatief direct, waardoor deze zone praktisch is voor een eerste of kort verblijf.', bestFor: 'Eerste bezoekers, gezinnen die voorzieningen willen en reizigers die aankomst- en vertrekdag eenvoudig houden.', tradeoff: 'De drukste infrastructuur geeft ook verkeer en avondgeluid. Controleer welk deel van het strand en welke kant van de hoofdweg je boekt.' },
    { slug: 'klong-prao', name: 'Klong Prao & Chai Chet', kicker: 'Lange kust, rivier & resorts', image: '/images/redesign/koh-chang-island-hero-nl.webp', imageAlt: 'Lange groene baai en junglerug van Koh Chang', summary: 'Klong Prao beslaat een ruimer gebied met strand, riviermonding, resorts en groene stukken. Het werkt goed als rustige middenbasis, maar de zone is te lang om alles vanzelf op loopafstand te hebben.', bestFor: 'Gezinnen, stellen, resortdagen en reizigers die centraal aan de westkust willen zitten.', tradeoff: 'Waterlopen, bruggen en hoofdweg bepalen je werkelijke looproute. Controleer strandtoegang en avondeten vanaf het exacte hotelpunt.' },
    { slug: 'kai-bae', name: 'Kai Bae', kicker: 'Balans & zuidelijke toegang', image: '/images/blog/koh-chang-underrated-eastern-island.webp', imageAlt: 'Tropische baai met beboste heuvels op Koh Chang', summary: 'Kai Bae geeft een bruikbare balans tussen eetkeuze, strandritme en toegang tot de zuidelijkere westkust. Het is een sterke basis voor wie niet in de drukste noordzone wil zitten.', bestFor: 'Stellen, terugkerende reizigers en wie strand met meerdere landuitstappen combineert.', tradeoff: 'De wegen rond de zuidelijke hellingen vragen aandacht, zeker bij regen en donkerte. Beoordeel vervoer vóór je avondplannen maakt.' },
    { slug: 'lonely-bailan', name: 'Lonely Beach & Bailan', kicker: 'Sociaal versus werkelijk rustig', image: '/images/blog/koh-chang-guide-thailand-eastern-island.webp', imageAlt: 'Jungle, strand en kleine kustzone op Koh Chang', summary: 'Lonely Beach trekt sociale en budgetgerichte reizigers; Bailan kan rustiger aanvoelen. Beide liggen verder zuid en maken de noordelijke ferry- en voorzieningenzone minder vanzelfsprekend.', bestFor: 'Backpackers, langere verblijven en reizigers die hun avondritme rond de eigen zone bouwen.', tradeoff: 'Een gebiedsnaam zegt niets over muziek of strandafstand. Lees recente locatiegerichte reviews en regel de terugrit vóór een avond elders.' },
  ],
  highlights: [
    { title: 'De westkustweg is je echte routekaart', eyebrow: 'Ferry naar slaapzone', image: '/images/redesign/koh-chang-island-hero-nl.webp', imageAlt: 'Bochtige kustweg, ferry en junglehellingen op Koh Chang', description: 'Vanaf de ferry beweegt vrijwel iedere populaire slaapzone langs dezelfde bergachtige westkant. Regen, verkeer, donkerte en stops kunnen de laatste kilometers zwaarder maken dan een rechte kaartlijn.', decision: 'Plan je eerste en laatste nacht op basis van de hele keten en niet alleen de goedkoopste kamer.', href: '#zones' },
    { title: 'De oostkant is geen snelle lus terug', eyebrow: 'Oost- & zuidoostkust', image: '/images/redesign/chanthaburi-mangrove-coast.webp', imageAlt: 'Mangrovewater en groene kust in Oost-Thailand', description: 'Mangrove, lokale gemeenschappen en rustigere kust geven een ander eilandbeeld dan de weststranden. Wegen en verbindingen maken een volledige ronde echter niet vanzelfsprekend.', decision: 'Kies één oostelijke hoofdbestemming en controleer route en terugtijd voordat je extra stops toevoegt.', href: '#route' },
    { title: 'Waterval en bootdag blijven conditioneel', eyebrow: 'Natuur zonder garantie', image: '/images/redesign/rayong-mangrove-route.webp', imageAlt: 'Groene waterroute door tropische natuur in Oost-Thailand', description: 'Waterstand, padconditie, parkstatus, regen en zee bepalen wat verantwoord en open is. Een droge periode en een natte periode leveren niet dezelfde waterval- of snorkeldag op.', decision: 'Controleer DNP, TMD en lokale instructies en houd één dag kunnen wisselen.', href: '/weather/' },
  ],
  featureBanner: { image: '/images/blog/koh-chang-underrated-eastern-island.webp', imageAlt: 'Dichte jungle en kustlandschap van Koh Chang', eyebrow: 'Groen is geen decor', title: 'Behandel jungle, apen en water als natuur — niet als attractie.', description: 'Voer geen dieren, houd afstand, berg eten op en ga niet buiten duidelijke routes. Controleer bij regen pad- en waterconditie; een populaire fotoplek is niet automatisch veilig of geopend.' },
  food: { image: '/images/redesign/koh-samui-food-island-table.webp', imageAlt: 'Thaise eilandtafel met vis, rijst, groenten en kruiden', eyebrow: 'Trat aan tafel', title: 'Kies verse kustgerechten zonder aannames over prijs of allergenen.', description: 'Aanvoer en menu wisselen per zone. Vraag vóór bestellen naar totaalprijs, bereiding, vissaus, garnalenpasta, noten en kruiscontact; “vegetarisch” is niet automatisch zonder visbasis.', dishes: [
    { name: 'Vis of zeevruchten van de grill', description: 'Vraag hoe wordt geprijsd en bereid en laat de gekozen portie vóór bereiding bevestigen.' },
    { name: 'Curry uit Oost-Thailand', description: 'Smaak en pittigheid verschillen per keuken. Bevestig saus, bouillon en allergenen concreet.' },
    { name: 'Tropisch fruit uit Trat', description: 'Probeer lokaal en seizoensgebonden, maar was of schil fruit en behandel marktbeloften niet als keurmerk.' },
  ]},
  itinerary: { eyebrow: 'Vier nachten, drie eilandkanten', title: 'Een route die ferry, jungle en strand uit elkaar houdt.', description: 'Gebruik één westkustbasis en plan hooguit één grote natuur- of bootactiviteit per dag. Zo blijft er marge voor regen en wegconditie.', days: [
    { day: 'Dag 1', title: 'Ferry en eigen zone', description: 'Rond de volledige transfer af, check avondeten en verken alleen je directe omgeving.', href: '#zones' },
    { day: 'Dag 2', title: 'Westkust zonder eilandrace', description: 'Vergelijk twee nabije stranden en gebruik getij, hitte en terugrit als grens.', href: '#doen' },
    { day: 'Dag 3', title: 'Waterval of oostkant', description: 'Kies één landthema na controle van park-, pad- en wegconditie.', href: '#route' },
    { day: 'Dag 4', title: 'Bootdag of lokale reserve', description: 'Controleer zee en operator; wissel zonder verlies naar strand of een rustige landdag.', href: '#praktisch' },
  ]},
  planning: {
    weather: { title: 'Regen verandert weg, waterval én zee', summary: 'Klimaat helpt bij de reisperiode; actuele neerslag, wind en waarschuwingen bepalen je concrete ferry-, jungle- en bootdag.', best: 'Houd een wisseldag vrij en controleer TMD plus lokale park- of operatorinformatie opnieuw.', tradeoff: 'Meer water maakt een waterval niet automatisch veiliger; zon op het strand garandeert geen rustige zee elders.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Vergelijking van weerpatronen aan Thaise kusten' },
    transport: { title: 'Boek de keten tot je echte eindpunt', summary: 'Bangkok of Trat is nog niet Koh Chang. Vergelijk wegtransfer, exacte pier, voertuigferry, aankomstzijde en de laatste rit naar je hotel.', facts: ['Controleer pier en ferryoperator op de voucher', 'Vraag of eilandtransfer werkelijk is inbegrepen', 'Plan ruime marge bij losse vlucht of bus', 'Bewaar hotelpin en contact offline'], image: '/images/redesign/koh-chang-island-hero-nl.webp', imageAlt: 'Ferry nadert de bergachtige kust van Koh Chang' },
  },
  practicalTips: [
    { icon: 'map', title: 'Steil en bochtig is echt', description: 'Beoordeel weg, regen en donkerte; kaartafstand alleen is geen reistijd.' },
    { icon: 'compass', title: 'Scooter is optioneel', description: 'Huur alleen met geldig rijbewijs, verzekering, helm en ervaring; kies anders lokale transfer.' },
    { icon: 'waves', title: 'Zwem per plek en moment', description: 'Getij, stroming, rotsen en weer verschillen; volg vlaggen en lokale instructies.' },
    { icon: 'compass', title: 'Dieren blijven wild', description: 'Voer apen niet, houd eten uit zicht en bewaar afstand bij iedere ontmoeting.' },
  ],
  faqs: [
    { question: 'Is Ko Chang de moeite waard?', answer: 'Ja wanneer je een groen, bergachtig eiland zoekt met meerdere westkustzones en bereid bent de langere ferry- en wegketen te plannen. Voor een ultracompact verblijf of volledig vlak vervoer past een ander eiland mogelijk beter.' },
    { question: 'Wat is er te doen in Koh Chang?', answer: 'Combineer een rustige westkustdag met één conditionele natuurdag richting waterval, mangrove of oostkant. Voeg alleen bij passende zee- en parkcondities een bootactiviteit toe en houd de terugrit realistisch.' },
    { question: 'Wat is de beste reistijd voor Koh Chang?', answer: 'Er is geen gegarandeerde beste maand. Gebruik de regionale klimaatcontext als eerste filter en controleer vlak voor ferry, junglewandeling en boottocht de actuele TMD-waarschuwingen, parkstatus en operatorvoorwaarden.' },
    { question: 'Is Koh Chang het mooiste eiland van Thailand?', answer: 'Dat is subjectief. Koh Chang is sterk voor jungle, hoogteverschil en een mix van toeristische westkust en rustigere eilandkanten. Koh Mak past beter bij kleinschaligheid en Koh Samet bij een kortere strandstop. Kies op reisstijl en logistiek.' },
  ],
  relatedGuides: [
    { title: 'Trat', description: 'Plan de vastelandgateway, pierketen en eventueel een tussenstop vóór de ferry.', href: '/city/trat/', image: '/images/redesign/trat-destination-hero.webp', imageAlt: 'Rivier- en stadslandschap van Trat in Oost-Thailand' },
    { title: 'Koh Mak', description: 'Vergelijk Koh Chang met een kleiner en rustiger eiland in dezelfde Trat-archipel.', href: '/islands/koh-mak/', image: '/images/islands/koh-mak.webp', imageAlt: 'Palmen en rustig strand op Koh Mak' },
    { title: 'Thailand weer', description: 'Begrijp het regionale patroon en controleer daarna actuele waarschuwingen voor ferry en natuurdag.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Visuele vergelijking van Thaise kustseizoenen' },
  ],
  sources: [
    { title: 'Ko Chang', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/Ko%20Chang/467', note: 'Officiële brede context voor westkust, ferrytoegang en highlights.' },
    { title: 'Trat', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/Trat/466', note: 'Officiële provinciale gateway- en archipelcontext.' },
    { title: 'National park information', creator: 'Department of National Parks Thailand', url: 'https://www.dnp.go.th/', note: 'Primaire bron voor actuele parkstatus en natuurregels.' },
    { title: 'Warning and events', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en/warning-and-events', note: 'Actuele weer- en maritieme waarschuwingen.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele regionale veiligheids- en consulaire context.' },
  ],
};
