import type { DestinationGuideData } from '../../destinations/types';

export const kohPhiPhiIslandGuide: DestinationGuideData = {
  citySlug: 'koh-phi-phi', cityName: 'Koh Phi Phi', locale: 'nl',
  pageTitle: 'Koh Phi Phi Thailand: verblijven, gebieden & route',
  pageDescription: 'Beslis of overnachten op Phi Phi Don bij je past. Vergelijk Ton Sai, Loh Dalum, Long Beach en Laem Tong, met Phi Phi Leh-context en een realistische route.',
  pageUrl: 'https://go2-thailand.com/nl/islands/koh-phi-phi/', dateModified: '2026-07-31', coordinates: { latitude: 7.7407, longitude: 98.7784 }, touristType: ['eilandreizigers', 'bootreizigers', 'strandreizigers', 'duikreizigers'],
  breadcrumbsRoot: { label: 'Eilanden', href: '/islands/' }, stayGuideHref: null, foodGuideHref: null,
  hero: {
    image: '/images/redesign/koh-phi-phi-island-hero-nl.webp', imageAlt: 'Vroege ochtend boven Phi Phi Don met twee baaien, dorp, pier en kalksteenheuvels', imageClassName: 'object-cover object-[68%_center]', eyebrow: 'Dagtocht of echt eilandverblijf?', title: 'Koh Phi Phi', accent: 'Thailand', subtitle: 'Phi Phi Don is waar je slaapt. Phi Phi Leh is waar je voorwaarden controleert.', description: 'Koh Phi Phi is geen enkel strand. Je komt aan in de compacte Ton Sai-landengte, kiest tussen levendigheid en bootafhankelijkheid, en plant Phi Phi Leh alleen als actuele zee- en parkregels dat toelaten.',
    stats: [
      { label: 'Bewoonde basis', value: 'Phi Phi Don', icon: 'map' },
      { label: 'Aankomst', value: 'Ferry · Ton Sai', icon: 'ship' },
      { label: 'Sterk verblijf', value: '3–4 dagen', icon: 'calendar' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst het verblijfsverschil', title: 'Is Phi Phi de moeite waard?',
    paragraphs: [
      'Ja, wanneer je het kalksteenlandschap niet alleen vanuit een volle dagtour wilt zien en bereid bent je slaapgebied zorgvuldig te kiezen. Overnachten geeft ruimte voor een vroege wandeling, een rustige ochtend en een bootdag vanaf het eiland, maar maakt je ook afhankelijk van ferry, longtail en lokale voorraad.',
      'Phi Phi past minder goed wanneer je brede wegen, goedkope eilandlogistiek, volledige stilte dicht bij Ton Sai of gegarandeerde toegang tot Maya Bay verwacht. De keuze is niet “Phi Phi ja of nee”, maar Ton Sai-gemak versus een rustigere kust die vaker bootvervoer vraagt.',
    ],
    verdicts: [
      { label: 'Eerste keer & gemak', value: 'Ton Sai', description: 'Dicht bij pier, eten en tours; ook de meeste voetgangersstroom en avondgeluid.', icon: 'ship' },
      { label: 'Nachtleven dichtbij', value: 'Loh Dalum', description: 'Direct aan de ondiepe baai en avondscene; locatie en geluid vooraf controleren.', icon: 'sparkles' },
      { label: 'Strand met bereik', value: 'Long Beach', description: 'Meer strandfocus met longtail- of wandelverbinding; niet hetzelfde gemak als het dorp.', icon: 'waves' },
      { label: 'Resort als basis', value: 'Laem Tong', description: 'Rustiger noordelijk verblijf; vrijwel iedere eilandbrede verplaatsing wordt een bootkeuze.', icon: 'hotel' },
    ],
  },
  zones: [
    { slug: 'ton-sai', name: 'Ton Sai Village & pier', kicker: 'Aankomst, gemak & voetgangersstroom', image: '/images/redesign/hotel-tonsai-bay-resort-hero.webp', imageAlt: 'Baai, pier en groene kalksteenheuvels rond Ton Sai op Phi Phi Don', summary: 'Ton Sai is de aankomst- en voorzieningenbasis op de smalle landengte. Je loopt naar veel restaurants, duikshops en vertrekpunten en hoeft voor je eerste of laatste nacht weinig extra bootlogistiek te regelen.', bestFor: 'Korte verblijven, eerste bezoekers, vroege ferry’s en reizigers die veel keuze op loopafstand willen.', tradeoff: 'Gemak betekent drukte. Controleer de exacte ligging ten opzichte van pier, hoofdlooproute en avondgeluid.' },
    { slug: 'loh-dalum', name: 'Loh Dalum & centrale landengte', kicker: 'Baai overdag, geluid ’s avonds', image: '/images/blog/phi-phi-islands-guide-beyond-tourist-crowds.webp', imageAlt: 'Kalksteenlandschap en baai van de Phi Phi-eilanden', summary: 'Aan de andere kant van de landengte ligt de ondiepe Loh Dalum-baai. De afstand tot Ton Sai is klein, maar het avondprofiel kan per straat en accommodatie sterk verschillen.', bestFor: 'Reizigers die centraal willen zitten en bewust kiezen voor avondsfeer.', tradeoff: 'Een kaartafstand zegt niets over muziek, getij of de route met bagage. Lees recente locatiegerichte reviews, niet alleen een eilandscore.' },
    { slug: 'long-beach', name: 'Long Beach & zuidoost', kicker: 'Strandbasis met verbinding', image: '/images/islands/koh-phi-phi.webp', imageAlt: 'Zandstrand en helder water bij Phi Phi Don', summary: 'Long Beach verplaatst de nadruk van dorp naar strand. Je blijft binnen bereik van Ton Sai, maar de praktische route kan een wandeling of longtail vragen afhankelijk van locatie en omstandigheden.', bestFor: 'Stellen, strandreizigers en wie rustiger wil slapen zonder volledig noordelijk te verblijven.', tradeoff: 'Bagage, donkerte, getij en zeeconditie kunnen een “korte” verbinding veranderen. Vraag je accommodatie hoe aankomst werkelijk werkt.' },
    { slug: 'laem-tong', name: 'Laem Tong & noordelijk Phi Phi Don', kicker: 'Resortritme & bootafhankelijkheid', image: '/images/blog/outrigger-phi-phi-island-resort-barefoot-luxury-2026.webp', imageAlt: 'Rustige resortkust tussen palmen op noordelijk Phi Phi Don', summary: 'Het noorden voelt duidelijk losser van Ton Sai. Dat is precies de aantrekkingskracht wanneer je accommodatie en strand als bestemming ziet en niet iedere avond naar het dorp wilt.', bestFor: 'Langzamer resortverblijf, stellen en reizigers die vooraf hun transfers en maaltijdaanbod controleren.', tradeoff: 'Rust kost flexibiliteit. Een boottransfer, weersmarge en aanbod bij de accommodatie worden onderdeel van je dagelijkse budget en planning.' },
  ],
  highlights: [
    { title: 'Phi Phi Don en Phi Phi Leh zijn twee verschillende taken', eyebrow: 'Eerst de kaart begrijpen', image: '/images/redesign/koh-phi-phi-island-hero-nl.webp', imageAlt: 'Phi Phi Don met dorp, baaien en pier bij ochtendlicht', description: 'Je slaapt en eet op Phi Phi Don. Phi Phi Leh is onbewoond en wordt per boot bezocht onder actuele park- en zeevoorwaarden. Verwar een hotelkeuze dus niet met een Maya Bay-ticket.', decision: 'Kies eerst je basis op Don. Plan daarna één voorwaardelijke Leh-dag en accepteer dat route of toegang kan wijzigen.', href: '/phuket-tours/phi-phi-day-trip/' },
    { title: 'Loop het viewpoint vroeg en conditioneel', eyebrow: 'Landdag', image: '/images/blog/phi-phi-islands-guide-beyond-tourist-crowds.webp', imageAlt: 'Uitzicht over baaien en kalksteenheuvels van Phi Phi', description: 'Hitte, regen, padconditie en eigen belastbaarheid bepalen of de klim past. Controleer de actuele ingang en neem water mee; “zonsopgang” is geen reden om onvoorbereid in het donker te lopen.', decision: 'Gebruik de wandeling als hoofdmoment van een rustige landdag en combineer haar niet automatisch met een volle boottocht.', href: '/travel-gear/' },
    { title: 'Boek een bootdag op voorwaarden, niet op een poster', eyebrow: 'Phi Phi Leh & zee', image: '/images/redesign/seven-day-phuket-phi-phi-krabi-hero-v2.webp', imageAlt: 'Bootroute tussen Phuket, Phi Phi en Krabi', description: 'Vraag naar vertrekpunt, type boot, groepsgrootte, parktoegang, zwemstops, terugtijd en annuleringsroute bij slecht weer. Wildlife en helder water zijn nooit gegarandeerd.', decision: 'Vergelijk de actuele excursie pas nadat je weet of je vanaf Phi Phi Don, Krabi of Phuket vertrekt.', href: '/activities/' },
  ],
  featureBanner: { image: '/images/blog/phi-phi-islands-guide-beyond-tourist-crowds.webp', imageAlt: 'Phi Phi-eilanden met kalksteen, tropisch groen en Andamanzee', eyebrow: 'Niet iedere baai is een zwemplek', title: 'Parkregels en zeeconditie gaan vóór het verlanglijstje.', description: 'Controleer actuele DNP-regels, TMD-waarschuwingen en instructies van de operator. Stap niet op koraal, voer dieren niet en behandel “gesloten” of “niet zwemmen” als een echte grens.' },
  food: { image: '/images/redesign/krabi-food-estuary-table.webp', imageAlt: 'Zuid-Thaise kusttafel met vis, kruiden en gedeelde gerechten uit Krabi', eyebrow: 'Eilandvoorraad heeft gevolgen', title: 'Eet dichtbij je basis — en vraag vóór bestellen.', description: 'Ton Sai heeft de breedste keuze; afgelegen stranden draaien sterker op het aanbod van je accommodatie. Prijs, aanvoer en beschikbaarheid wisselen. Vraag bij allergieën expliciet naar vissaus, garnalenpasta, noten en kruiscontact.', dishes: [
    { name: 'Gegrilde vis of zeevruchten', description: 'Vraag naar totaalprijs en bereiding; uiterlijk alleen bewijst geen herkomst of voedselveiligheid.' },
    { name: 'Zuid-Thaise curry', description: 'Kan pittig zijn en visbasis bevatten. Vraag welke pasta en bouillon werkelijk worden gebruikt.' },
    { name: 'Rijstgerecht voor een bootdag', description: 'Praktisch en compact, maar laat bereid eten niet onnodig lang warm of in de zon staan.' },
  ]},
  itinerary: { eyebrow: 'Drie nachten, twee soorten dag', title: 'Een verblijf dat niet één lange tour wordt.', description: 'Bouw maar één grote bootdag in. Zo behoud je marge voor zeeconditie en ervaar je Phi Phi Don ook als verblijf.', days: [
    { day: 'Dag 1', title: 'Pier, basis & rustige avond', description: 'Check in, begrijp de loop- of bootroute van je hotel en blijf rond je eigen gebied.', href: '#zones' },
    { day: 'Dag 2', title: 'Phi Phi Don te voet', description: 'Plan viewpoint of een andere landactiviteit vroeg en houd de middag lokaal.', href: '#doen' },
    { day: 'Dag 3', title: 'Voorwaardelijke bootdag', description: 'Controleer zee, parkregels, operator en terugkeer vóór vertrek naar Phi Phi Leh of omliggende stops.', href: '#doen' },
    { day: 'Dag 4', title: 'Strand en ferrybuffer', description: 'Plan geen kwetsbare aansluiting direct achter een lange bootactiviteit; houd vertrekdag eenvoudig.', href: '#praktisch' },
  ]},
  planning: {
    weather: { title: 'Andamanweer kiest de bootdag', summary: 'Klimaatnormalen helpen bij de reisperiode; actuele wind, regen en maritieme waarschuwingen bepalen de concrete overtocht en baai.', best: 'Gebruik een breder reisvenster en laat één dag kunnen wisselen.', tradeoff: 'Een zonnige foto of droge ochtend garandeert geen rustige zee, zicht of parktoegang later op de dag.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Weerkeuze tussen Andamanzee en Golf van Thailand' },
    transport: { title: 'Phuket of Krabi is je gateway', summary: 'Vergelijk de hele keten vanaf luchthaven of hotel tot exacte pier, operator, Ton Sai-aankomst en laatste hoteltransfer.', facts: ['Controleer de exacte vertrekpier op de voucher', 'Plan marge tussen losse vlucht en ferry', 'Vraag het hotel hoe bagage vanaf Ton Sai reist', 'Hercontroleer bij maritieme waarschuwingen'], image: '/images/redesign/seven-day-phuket-phi-phi-krabi-hero-v2.webp', imageAlt: 'Route over zee tussen Phuket, Phi Phi en Krabi' },
  },
  practicalTips: [
    { icon: 'ship', title: 'Hoteltransfer eerst', description: 'Vraag vóór boeken of je hotel lopend bereikbaar is of een aparte longtailtransfer vereist.' },
    { icon: 'waves', title: 'Zwemstatus is lokaal', description: 'Getij, bootverkeer, parkregels en zeeconditie verschillen per baai en dag.' },
    { icon: 'sun', title: 'Hitte verandert je route', description: 'Plan klimmen en open bootdelen vroeg, neem drinkwater mee en bouw schaduw in.' },
    { icon: 'compass', title: 'Bewaar de pier offline', description: 'Download voucher, hotelpin en contactgegevens vóór de overtocht.' },
  ],
  faqs: [
    { question: 'Wat is er te doen op Koh Phi Phi?', answer: 'Verdeel je tijd tussen Phi Phi Don en één bootdag: kies een viewpoint- of stranddag op Don, verken je slaapgebied en plan Phi Phi Leh alleen na controle van parkregels, zeeconditie en operatorvoorwaarden.' },
    { question: 'Is Phi Phi de moeite waard?', answer: 'Ja wanneer je het landschap vanuit een meerdaags verblijf wilt ervaren en de drukte en logistiek accepteert. Voor alleen Maya Bay kan een dagtour logischer zijn; voor volledige rust of veel wegvervoer past een ander eiland waarschijnlijk beter.' },
    { question: 'Wat is de beste reistijd voor Koh Phi Phi?', answer: 'Er is geen gegarandeerde beste maand. Gebruik het Andamanklimaat als eerste filter en controleer vlak voor iedere ferry of bootdag de actuele TMD-verwachting, maritieme waarschuwingen en parkstatus.' },
    { question: 'Wat is het mooiste eiland van Thailand?', answer: 'Dat is subjectief. Phi Phi is sterk voor kalksteenlandschap en bootcontext, maar Koh Lanta kan beter passen bij langzaam strandritme en Koh Tao bij duik- en snorkelfocus. Kies op reisstijl en logistiek, niet op één ranglijst.' },
  ],
  relatedGuides: [
    { title: 'Phi Phi-tour vergelijken', description: 'Bekijk actuele vertrekpunten en tourvoorwaarden wanneer je niet op het eiland verblijft.', href: '/phuket-tours/phi-phi-day-trip/', image: '/images/blog/phi-phi-islands-guide-beyond-tourist-crowds.webp', imageAlt: 'Boottocht door het landschap van de Phi Phi-eilanden' },
    { title: 'Krabi', description: 'Gebruik Krabi als vastelandbasis of gateway en vergelijk dat met overnachten op Phi Phi Don.', href: '/city/krabi/', image: '/images/redesign/krabi-destination-hero.webp', imageAlt: 'Kalksteenkust van Krabi' },
    { title: 'Koh Lanta', description: 'Vergelijk Phi Phi met een langer, rustiger Andaman-eiland en meer weglogistiek.', href: '/islands/koh-lanta/', image: '/images/islands/koh-lanta.webp', imageAlt: 'Lang strand en groene kust van Koh Lanta' },
  ],
  sources: [
    { title: 'Ko Phi Phi', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Phi-Phi/359', note: 'Officiële brede bestemmingscontext voor de Phi Phi-eilanden.' },
    { title: 'National park information', creator: 'Department of National Parks Thailand', url: 'https://www.dnp.go.th/', note: 'Primaire bron voor actuele parkstatus, natuurregels en officiële aankondigingen.' },
    { title: 'Weather and warnings', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Actuele weersverwachting en maritieme waarschuwingen voor Andamanreizen.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele regionale veiligheids- en consulaire context.' },
  ],
};
