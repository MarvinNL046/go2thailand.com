import type { DestinationGuideData } from '../../destinations/types';

export const kohLantaIslandGuide: DestinationGuideData = {
  citySlug: 'koh-lanta', cityName: 'Koh Lanta', locale: 'nl',
  pageTitle: 'Koh Lanta Thailand: waar verblijven & wat doen?',
  pageDescription: 'Kies waar je verblijft op Koh Lanta. Vergelijk Klong Dao, Long Beach, Klong Khong, Klong Nin en het zuiden, plus vervoer, route en actuele voorwaarden.',
  pageUrl: 'https://go2-thailand.com/nl/islands/koh-lanta/', dateModified: '2026-07-31', coordinates: { latitude: 7.6244, longitude: 99.0792 }, touristType: ['eilandreizigers', 'gezinnen', 'stellen', 'langzaam reizenden'],
  breadcrumbsRoot: { label: 'Eilanden', href: '/islands/' }, stayGuideHref: null, foodGuideHref: null,
  hero: {
    image: '/images/redesign/koh-lanta-island-hero-nl.webp', imageAlt: 'Lange westkust van Koh Lanta met stranden, tropisch groen en de kustweg bij ochtendlicht', imageClassName: 'object-cover object-[66%_center]', eyebrow: 'Lang eiland, slimme basis', title: 'Koh Lanta', accent: 'Thailand', subtitle: 'Kies niet alleen een hotel. Kies hoeveel eiland je iedere dag wilt afleggen.', description: 'Koh Lanta werkt voor een langzamer strandritme, maar de westkust is geen compact dorp. Je slaapzone bepaalt je toegang tot restaurants, rustige baaien, Old Town, het zuiden en iedere vroege bootdag.',
    stats: [
      { label: 'Sterk verblijf', value: '4–5 dagen', icon: 'calendar' },
      { label: 'Hoofdas', value: 'Westkust · noord–zuid', icon: 'map' },
      { label: 'Gateway', value: 'Krabi · Trang', icon: 'ship' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst je reisstijl', title: 'Is Koh Lanta toeristisch?',
    paragraphs: [
      'Ja, Koh Lanta heeft een volwassen toeristische infrastructuur met resorts, restaurants, transfers en tours. Toch voelt het eiland anders dan een compacte feestbestemming: voorzieningen liggen verspreid langs een lange kust en het tempo wordt sterk bepaald door je eigen gebied.',
      'Koh Lanta past goed wanneer je meerdere stranddagen wilt, ruimte waardeert en één of twee grotere uitstappen conditioneel plant. Het past minder goed wanneer je alles lopend wilt doen, iedere avond een druk centrum zoekt of zonder rijervaring grote afstanden per scooter verwacht af te leggen.',
    ],
    verdicts: [
      { label: 'Gemak & gezin', value: 'Klong Dao', description: 'Dicht bij Saladan en veel voorzieningen; controleer getij en exacte strandligging.', icon: 'hotel' },
      { label: 'Beste allround basis', value: 'Long Beach', description: 'Brede keuze langs Phra Ae, maar niet iedere accommodatie ligt op loopafstand van alles.', icon: 'waves' },
      { label: 'Langzamer verblijf', value: 'Klong Nin', description: 'Verder zuid, met een compacter strandritme en langere ritten naar het noorden.', icon: 'sun' },
      { label: 'Rust als bestemming', value: 'Kantiang', description: 'Sterke zuidbasis wanneer resort, baai en natuur belangrijker zijn dan noordelijk gemak.', icon: 'compass' },
    ],
  },
  zones: [
    { slug: 'klong-dao', name: 'Klong Dao & Saladan', kicker: 'Aankomst, gezin & voorzieningen', image: '/images/islands/koh-lanta.webp', imageAlt: 'Zandstrand, palmen en rustige kust op Koh Lanta', summary: 'Het noorden verkort de route vanaf de aankomstzone en geeft snelle toegang tot winkels, transfers en een brede hotelkeuze. Dat maakt Klong Dao praktisch voor de eerste keer en voor een korte eilandstop.', bestFor: 'Gezinnen, korte verblijven, reizigers zonder eigen vervoer en wie aankomst- en vertrekdag eenvoudig wil houden.', tradeoff: 'Praktisch betekent niet dat alles één centrum vormt. Controleer looproutes, strandtoegang, getij en de afstand tot de exacte restaurants die je wilt gebruiken.' },
    { slug: 'long-beach', name: 'Long Beach · Phra Ae', kicker: 'Allround westkustbasis', image: '/images/blog/best-beaches-thailand.webp', imageAlt: 'Breed tropisch strand met lange kustlijn in Thailand', summary: 'Long Beach combineert een lange westkust, veel typen accommodatie en voldoende eetkeuze. Het is de veiligste brede aanbeveling voor wie nog niet exact weet hoeveel rust of reuring nodig is.', bestFor: 'Eerste bezoekers, stellen, stranddagen en reizigers die meerdere prijsklassen willen vergelijken.', tradeoff: 'De naam omvat een lang gebied. Een hotel aan Long Beach kan nog steeds een onhandige wandeling van jouw favoriete voorzieningen liggen.' },
    { slug: 'klong-khong-nin', name: 'Klong Khong & Klong Nin', kicker: 'Sfeer versus zwemprofiel', image: '/images/redesign/stay-beach-retreat.webp', imageAlt: 'Kleinschalige strandbasis tussen palmen aan een Thaise kust', summary: 'In het middendeel verschuift het ritme van noordelijk gemak naar kleinere strandclusters. Klong Khong wordt vaak om sfeer gekozen; Klong Nin werkt voor wie een duidelijker lokale strandbasis verder zuid wil.', bestFor: 'Langere verblijven, terugkerende reizigers en wie avonden graag rond de eigen strandzone houdt.', tradeoff: 'Kust, rotsen en getij verschillen per stuk. Boek niet op een algemene strandnaam zonder recente foto’s en locatiegerichte reviews te controleren.' },
    { slug: 'kantiang-south', name: 'Kantiang Bay & het zuiden', kicker: 'Baai, natuur & afstand', image: '/images/redesign/koh-lanta-island-hero-nl.webp', imageAlt: 'Groene zuidkust en lange strandbocht van Koh Lanta', summary: 'Het zuiden zet landschap en een rustiger verblijfsritme centraal. Je zit dichter bij de zuidelijke parkcontext, maar verder van Saladan, de noordelijke voorraad en sommige vertrekpunten.', bestFor: 'Stellen, resortverblijven, natuurliefhebbers en reizigers die hun accommodatie als belangrijk deel van de bestemming zien.', tradeoff: 'Rust wordt een logistieke keuze. Controleer transfer, avondeten, medische marge en de werkelijke weg naar activiteiten vóór je boekt.' },
  ],
  highlights: [
    { title: 'Lees de westkust als een route, niet als één badplaats', eyebrow: 'Noord–zuidkeuze', image: '/images/redesign/koh-lanta-island-hero-nl.webp', imageAlt: 'Kustweg langs de lange westkust van Koh Lanta', description: 'Saladan, Klong Dao, Long Beach, Klong Khong, Klong Nin en Kantiang hebben ieder een ander dagelijks bereik. Een zuidelijke kamer kan prachtig zijn én iedere noordelijke afspraak in een rit veranderen.', decision: 'Kies eerst waar je de meeste avonden wilt eindigen. Vergelijk daarna pas hotels binnen die zone.', href: '#zones' },
    { title: 'Old Town is een andere kant van het eiland', eyebrow: 'Oostkust & cultuur', image: '/images/redesign/nakhon-si-thammarat-old-town.webp', imageAlt: 'Houten gevels en lokaal straatbeeld in Zuid-Thailand', description: 'Lanta Old Town geeft een ander perspectief dan de westkuststranden. Behandel het als bewuste landdag, met respect voor bewoners en zonder het dorp tot fotodecor te reduceren.', decision: 'Combineer Old Town met één oostkust- of mangrovestop en voorkom een gehaaste eilandronde.', href: '#route' },
    { title: 'Maak van een bootdag een optie, geen verplichting', eyebrow: 'Park, Koh Haa & zee', image: '/images/redesign/thailand-island-hopping-hero-v2.webp', imageAlt: 'Boot tussen groene eilanden in de Andamanzee', description: 'Route, parkstatus, zicht, zwemstops en vertrekpunt veranderen met seizoen en zeeconditie. Een bekende eilandnaam is geen garantie op toegang of een specifieke ervaring.', decision: 'Vergelijk actuele operatorvoorwaarden en houd één wisseldag vrij. Sla de tocht over wanneer waarschuwingen of je eigen zwemniveau daar aanleiding toe geven.', href: '/activities/' },
  ],
  featureBanner: { image: '/images/redesign/chanthaburi-mangrove-coast.webp', imageAlt: 'Groene mangrovekust met waterroute in Thailand', eyebrow: 'Een eiland is meer dan strand', title: 'Plan één langzame landdag zonder checklist.', description: 'Kies Old Town, mangrove of het zuidelijke parkgebied als hoofdmoment. Controleer opening, wegconditie, hitte en actuele parkregels en probeer niet alle uiteinden op één dag af te vinken.' },
  food: { image: '/images/redesign/krabi-food-estuary-table.webp', imageAlt: 'Zuid-Thaise kusttafel met rijst, vis, kruiden en gedeelde gerechten', eyebrow: 'Zuid-Thaise kustkeuken', title: 'Eet lokaal, maar vraag precies wat er in de pan zit.', description: 'Verse aanvoer, prijs en menu wisselen per zone en seizoen. Vraag bij allergieën expliciet naar vissaus, garnalenpasta, noten en kruiscontact; “vegetarisch” is niet automatisch zonder visbasis.', dishes: [
    { name: 'Gegrilde vis of zeevruchten', description: 'Vraag vóór bestellen naar bereiding en totaalprijs; een vitrine zegt niets over allergenen of koudeketen.' },
    { name: 'Zuid-Thaise curry', description: 'Vaak aromatisch en pittig. Laat saus, bouillon en garnalenpasta afzonderlijk bevestigen.' },
    { name: 'Rijstgerecht voor onderweg', description: 'Praktisch op een landdag, maar bewaar bereid eten niet onnodig warm in auto, tas of zon.' },
  ]},
  itinerary: { eyebrow: 'Vier nachten, drie soorten dag', title: 'Een Koh Lanta-route met ruimte voor afstand en zee.', description: 'Slaap op één basis en wissel strand, land en één conditionele bootdag af. Zo wordt het eiland geen reeks transfers.', days: [
    { day: 'Dag 1', title: 'Aankomen in je eigen zone', description: 'Check strandtoegang, avondeten en vervoer zonder direct het hele eiland over te steken.', href: '#zones' },
    { day: 'Dag 2', title: 'Westkust op eigen tempo', description: 'Verken maximaal twee nabije strandzones en gebruik getij en hitte als ritme.', href: '#doen' },
    { day: 'Dag 3', title: 'Old Town of zuidelijke landdag', description: 'Kies één kant van het eiland en laat extra stops alleen toe wanneer tijd en wegconditie kloppen.', href: '#route' },
    { day: 'Dag 4', title: 'Voorwaardelijke boot- of reservetag', description: 'Controleer weer, parkstatus en operator; wissel zo nodig voor een lokale stranddag.', href: '#praktisch' },
  ]},
  planning: {
    weather: { title: 'Andamanweer bepaalt meer dan je strandfoto', summary: 'Klimaat helpt bij de reisperiode; actuele wind, regen en maritieme waarschuwingen bepalen ferry, snorkeltocht en parkdag.', best: 'Plan een wisseldag en controleer TMD en operator opnieuw vlak voor iedere bootactiviteit.', tradeoff: 'Droog weer op het land garandeert geen rustige zee, open parkonderdelen of goed zicht onder water.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Weerkeuze tussen de Andamanzee en Golf van Thailand' },
    transport: { title: 'Vergelijk de hele keten tot je hoteldeur', summary: 'Een ticket naar Koh Lanta kan luchthaven, minivan, pier, voertuigferry en hoteltransfer combineren. Controleer welk deel werkelijk is inbegrepen.', facts: ['Controleer luchthaven, pier en eindadres op de voucher', 'Plan marge tussen losse vlucht en transfer', 'Vraag het hotel naar de laatste aankomstmogelijkheid', 'Hercontroleer route bij maritieme waarschuwingen'], image: '/images/redesign/koh-lanta-island-hero-nl.webp', imageAlt: 'Kustweg en lange afstanden op Koh Lanta' },
  },
  practicalTips: [
    { icon: 'map', title: 'Meet in reistijd', description: 'Een korte kaartafstand kan door eilandweg, regen, donkerte en stops anders uitpakken.' },
    { icon: 'compass', title: 'Scooter is geen standaardadvies', description: 'Huur alleen met geldig rijbewijs, verzekering, helm en echte ervaring; kies anders transfer of songthaew.' },
    { icon: 'waves', title: 'Getij verandert het strand', description: 'Controleer recente lokale informatie en beoordeel zwemmen per plek en moment.' },
    { icon: 'sun', title: 'Neem hitte serieus', description: 'Plan open wegen en wandelingen vroeg, drink voldoende en bouw schaduw en herstel in.' },
  ],
  faqs: [
    { question: 'Is Koh Lanta toeristisch?', answer: 'Ja. Er is veel accommodatie, horeca, vervoer en touraanbod, vooral langs de westkust. De sfeer voelt vaak rustiger omdat voorzieningen over een lang eiland zijn verspreid. Je gebiedskeuze bepaalt daarom meer dan het algemene label “toeristisch”.' },
    { question: 'Wat is de beste reistijd voor Koh Lanta?', answer: 'Er bestaat geen gegarandeerde beste maand. Gebruik het Andamanklimaat als eerste filter en controleer voor ferry, park en boottocht altijd de actuele TMD-verwachting, maritieme waarschuwingen en operatorvoorwaarden.' },
    { question: 'Wat te doen op Koh Lanta, Thailand?', answer: 'Combineer een westkustdag met één bewuste landdag richting Old Town, mangrove of het zuiden. Voeg alleen bij passende zee- en parkcondities een bootdag toe en laat ruimte voor een lokale reservetag.' },
    { question: 'Hoe kom je op Koh Lanta?', answer: 'Veel routes lopen via Krabi of Trang en combineren wegtransfer met een ferry- of voertuigverbinding. Controleer op je voucher het exacte vertrekpunt, alle overstappen, bagagevoorwaarden, inbegrepen hoteltransfer en de laatste aankomstmogelijkheid.' },
  ],
  relatedGuides: [
    { title: 'Krabi', description: 'Vergelijk Koh Lanta met een vastelandbasis en controleer je luchthaven- of minivanketen.', href: '/city/krabi/', image: '/images/redesign/krabi-destination-hero.webp', imageAlt: 'Kalksteenkust en boot van Krabi' },
    { title: 'Koh Phi Phi', description: 'Vergelijk een lang eiland met weglogistiek met een compacte, bootafhankelijke Phi Phi-basis.', href: '/islands/koh-phi-phi/', image: '/images/redesign/koh-phi-phi-island-hero-nl.webp', imageAlt: 'Baaien en kalksteenheuvels van Phi Phi Don' },
    { title: 'Thailand weer', description: 'Begrijp de Andamankust en controleer daarna de actuele waarschuwingen voor jouw reisdagen.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Visuele vergelijking van Thaise kustseizoenen' },
  ],
  sources: [
    { title: 'Ko Lanta', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/Ko-Lanta/357', note: 'Officiële brede bestemmingscontext voor kust, Saladan, Old Town en parkgebied.' },
    { title: 'National park information', creator: 'Department of National Parks Thailand', url: 'https://www.dnp.go.th/', note: 'Primaire bron voor actuele parkstatus, regels en officiële aankondigingen.' },
    { title: 'Warning and events', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en/warning-and-events', note: 'Actuele weersverwachting en maritieme waarschuwingen voor Andamanreizen.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele regionale veiligheids- en consulaire context.' },
  ],
};
