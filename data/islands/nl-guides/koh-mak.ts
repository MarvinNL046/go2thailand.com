import type { DestinationGuideData } from '../../destinations/types';

const hero = '/images/redesign/koh-mak-island-hero-nl.webp';

export const kohMakIslandGuide: DestinationGuideData = {
  citySlug: 'koh-mak', cityName: 'Koh Mak', locale: 'nl',
  pageTitle: 'Koh Mak Thailand: waar verblijven & wat doen?',
  pageDescription: 'Ontdek of Koh Mak bij je past. Vergelijk Ao Kao, Ao Suan Yai, Ao Nid en de noordoostkant, met de route via Trat en eerlijke low-carboncontext.',
  pageUrl: 'https://go2-thailand.com/nl/islands/koh-mak/', dateModified: '2026-07-31',
  coordinates: { latitude: 11.8211, longitude: 102.4781 },
  touristType: ['eilandreizigers', 'rustzoekers', 'stellen', 'gezinnen'],
  breadcrumbsRoot: { label: 'Eilanden', href: '/islands/' }, stayGuideHref: null, foodGuideHref: null,
  hero: {
    image: hero, imageAlt: 'Lage kustweg tussen kokospalmen en kleinschalige huizen op Koh Mak met Koh Kham aan de horizon', imageClassName: 'object-cover object-[70%_center]',
    eyebrow: 'Laag eiland in de Trat-archipel', title: 'Koh Mak', accent: 'Thailand',
    subtitle: 'Rust is hier geloofwaardig. De juiste baai en volledige bootketen maken haar praktisch.',
    description: 'Koh Mak combineert kokos- en rubberlandschap met kleinschalige stranden en een bescheiden dorpsritme. Het eiland is compacter dan Koh Chang, maar kustkeuze, seizoen en de laatste transfer bepalen nog steeds je echte vakantie.',
    stats: [
      { label: 'Sterk verblijf', value: '3–4 dagen', icon: 'calendar' },
      { label: 'Keuze-as', value: 'Ao Kao · Suan Yai', icon: 'map' },
      { label: 'Gateway', value: 'Trat · speedboat', icon: 'ship' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst het eilandtype kiezen', title: 'Is Koh Mak leuk en de omweg waard?',
    paragraphs: [
      'Ja, wanneer je een laag, rustig eiland zoekt waar fietsen, strandtijd en een klein aantal restaurants belangrijker zijn dan uitgaan of een lange activiteitenlijst. Ao Kao en Ao Suan Yai geven de meeste vakantie-infrastructuur zonder het schaalgevoel van grotere Thaise eilanden.',
      'Koh Mak past minder goed wanneer je veel avondkeuze, gegarandeerde dagelijkse bootverbindingen of een volledig autovrije bestemming verwacht. Rust betekent niet dat iedere baai naast elkaar ligt; hitte, wegdek, zee en de route via Trat blijven onderdeel van je planning.',
    ],
    verdicts: [
      { label: 'Meeste keuze', value: 'Ao Kao', description: 'Lange zuidwestelijke verblijfsas met restaurants en resorts; controleer het exacte kustdeel.', icon: 'hotel' },
      { label: 'Zonsondergang', value: 'Ao Suan Yai', description: 'Noordwestelijke baai met zicht richting Koh Kham en een rustiger resortritme.', icon: 'sun' },
      { label: 'Lokale context', value: 'Ao Nid', description: 'Oostelijke aankomst- en dorpsomgeving; praktisch, maar niet het klassieke resortstrand.', icon: 'ship' },
      { label: 'Meer afzondering', value: 'Noordoost', description: 'Groener en dunner bebouwd; vervoer en hotelvoorzieningen wegen daardoor zwaarder.', icon: 'compass' },
    ],
  },
  zones: [
    { slug: 'ao-kao', name: 'Ao Kao & zuidwestkust', kicker: 'Keuze, strand & verspreiding', image: '/images/islands/koh-mak.webp', imageAlt: 'Tropische kust en palmen op Koh Mak', summary: 'Ao Kao vormt een lange toeristische as met veel van de accommodatie- en eetkeuze. Het is een sterke eerste basis wanneer je meerdere opties dichtbij wilt vergelijken.', bestFor: 'Eerste bezoekers, stellen en reizigers die zonder lange avondritten willen eten.', tradeoff: 'De baai is lang en hotels kunnen aan een weg, helling of ander kustdeel liggen. Controleer de echte looproute en strandtoegang.' },
    { slug: 'ao-suan-yai', name: 'Ao Suan Yai', kicker: 'Koh Kham-zicht & resortritme', image: hero, imageAlt: 'Lage palmenkust van Koh Mak met een klein eiland voor de kust', summary: 'De noordwestkant kijkt richting Koh Kham en past bij reizigers die het verblijf en de baai als hoofdbestemming behandelen. De sfeer is doorgaans kleiner dan langs Ao Kao.', bestFor: 'Rustige stranddagen, zonsondergang en een verblijf met eigen voorzieningen.', tradeoff: 'Toegang tot Koh Kham, landing, kosten en bootuitvoering kunnen veranderen. Behandel het uitzicht niet als excursiegarantie.' },
    { slug: 'ao-nid', name: 'Ao Nid & oostkant', kicker: 'Pier, dorp & dagelijks eiland', image: '/images/redesign/trat-ban-nam-chiao.webp', imageAlt: 'Lokale houten kustbebouwing en waterlandschap in Trat', summary: 'Ao Nid geeft meer zicht op aankomst, lokaal wonen en de praktische eilandkant. Het is nuttig voor context en transfers, maar minder vanzelfsprekend als klassieke strandbasis.', bestFor: 'Doorreizigers en bezoekers die lokaal ritme belangrijker vinden dan een resortstrook.', tradeoff: 'Je geboekte boot kan een andere eilandpier gebruiken. Bevestig operator, pier en hotelpickup opnieuw.' },
    { slug: 'northeast', name: 'Noordoost & Laem Son', kicker: 'Afstand, groen & minder voorraad', image: '/images/redesign/stay-island-hideaway.webp', imageAlt: 'Kleinschalig eilandverblijf tussen tropisch groen', summary: 'De stillere noord- en oostkant kan meer afzondering bieden en maakt het verblijf zelf belangrijker. De kleinere voorraad vraagt vooraf meer controle.', bestFor: 'Langzame verblijven en reizigers die bewust weinig willen verplaatsen.', tradeoff: 'Controleer wegconditie, restaurant, donkerterit, strandgebruik en laatste transfer; afzondering is geen objectieve stiltegarantie.' },
  ],
  highlights: [
    { title: 'Koh Mak is niet Koh Mook', eyebrow: 'Eén letter, andere kust', image: hero, imageAlt: 'Lage bewoonde kust van Koh Mak in de provincie Trat', description: 'Zoekresultaten mengen de namen gemakkelijk. Koh Mak ligt bij Trat in de oostelijke Golf van Thailand; Koh Mook ligt bij Trang aan de Andamankust. Routes, klimaatcontext en hotels zijn niet uitwisselbaar.', decision: 'Laat eilandnaam, provincie, hotelpin en beide pieren op iedere boeking overeenkomen.', href: '#praktisch' },
    { title: 'Low carbon is richting, geen totaalgarantie', eyebrow: 'Erkenning met een grens', image: '/images/redesign/trat-route-banner.webp', imageAlt: 'Groene kustroute in de provincie Trat', description: 'Koh Mak kreeg internationale erkenning voor zijn low-carbonbestemmingsaanpak. Dat maakt lokale keuzes, wandelen, fietsen en bewust verbruik zichtbaar, maar certificeert niet automatisch iedere kamer, transfer of excursie.', decision: 'Vraag aanbieders naar concrete maatregelen en vergelijk uitvoering in plaats van alleen een groen label.', href: '#bronnen' },
    { title: 'Koh Kham en snorkelen blijven conditioneel', eyebrow: 'Zee, toegang & operator', image: '/images/blog/koh-kood-quiet-island-guide-trat-2026.webp', imageAlt: 'Helder kustwater en eilandlandschap in de Trat-archipel', description: 'Een korte afstand op de kaart garandeert geen landing, zicht of uitvoering. Wind, golf, getij, exploitatie en lokale voorwaarden bepalen de bootdag.', decision: 'Vraag dezelfde dag naar toegang, totaalprijs, zwemniveau, materiaal en een alternatief bij annulering.', href: '/activities/' },
  ],
  featureBanner: { image: hero, imageAlt: 'Smalle kustweg door kokosgroen op het bewoonde Koh Mak', eyebrow: 'Rust zonder decorstuk', title: 'Laat het lage eilandritme ook na je vertrek kloppen.', description: 'Gebruik navulwater waar beschikbaar, beperk onnodige transfers, respecteer privéterrein en kies lokale uitgaven bewust. De low-carbonpositie wordt pas betekenisvol door controleerbaar gedrag.' },
  food: {
    image: '/images/redesign/trat-food-eastern-table.webp', imageAlt: 'Tafel met gerechten en ingrediënten uit Oost-Thailand', eyebrow: 'Trat aan tafel', title: 'Eet lokaal en vraag naar aanvoer, basis en totaalprijs.', description: 'Een klein eilandmenu verandert met aanvoer en seizoen. Vraag bij allergieën concreet naar vissaus, garnalenpasta, noten en kruiscontact; vegetarisch betekent niet automatisch zonder visbasis.',
    dishes: [
      { name: 'Vis of zeevruchten', description: 'Vraag naar soort, portie, prijswijze en bereiding voordat de keuken start.' },
      { name: 'Thaise curry of roerbak', description: 'Benoem pittigheid en allergenen afzonderlijk en controleer saus en bouillon.' },
      { name: 'Fruit uit Trat', description: 'Kies wat werkelijk rijp en beschikbaar is en behandel herkomstclaims niet als keurmerk.' },
    ],
  },
  itinerary: {
    eyebrow: 'Drie nachten, één flexibele zeedag', title: 'Een Koh Mak-route zonder het eiland vol te plannen.', description: 'Kies één slaapbasis en groepeer de kust per richting. Zo blijft een weerwissel een aanpassing in plaats van een mislukte reisdag.',
    days: [
      { day: 'Dag 1', title: 'Pier, hotel & eigen baai', description: 'Rond bagage en pickup af, bevestig vertrekdetails en houd de eerste avond lokaal.', href: '#zones' },
      { day: 'Dag 2', title: 'Ao Kao en eilandwegen', description: 'Verken rustig per transfer of passend vervoer, met pauze voor hitte en wegconditie.', href: '#doen' },
      { day: 'Dag 3', title: 'Suan Yai of conditionele boot', description: 'Beslis op actuele zee en toegang; wissel bij twijfel naar strand, fiets of rust.', href: '#praktisch' },
      { day: 'Dag 4', title: 'Trat-keten met marge', description: 'Laat hotel en operator pier en tijd opnieuw bevestigen en bescherm je vervolgaansluiting.', href: '#route' },
    ],
  },
  planning: {
    weather: { title: 'De beste reistijd is geen bootgarantie', summary: 'De drogere periode kan aantrekkelijk zijn, maar actuele wind, regen en golf beslissen over strand- en bootgebruik.', best: 'Controleer TMD, hotel en operator kort voor iedere zeedag.', tradeoff: 'Een zonnige ochtend zegt niets zeker over zicht, getij, landing of terugvaart.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Vergelijking van weerpatronen aan Thaise kusten' },
    transport: { title: 'Boek Bangkok of Trat tot aan de hoteldeur', summary: 'Combineer landrit, juiste vastelandpier, operator, echte eilandpier, bagage en hotelpickup op één tijdlijn. Een generiek ticket naar Koh Mak lost de laatste kilometer niet vanzelf op.', facts: ['Vraag welke vastelandpier de operator gebruikt', 'Controleer de werkelijke aankomstpier op Koh Mak', 'Bevestig bagage en hotelpickup', 'Plan marge bij vlucht, bus of vervolgboot'], image: hero, imageAlt: 'Lokale kustweg en kleinschalige bebouwing op Koh Mak' },
  },
  practicalTips: [
    { icon: 'ship', title: 'De pierketen is operatorgebonden', description: 'Gebruik geen oude blogdienstregeling; laat hotel en operator beide kanten bevestigen.' },
    { icon: 'compass', title: 'Fietsen vraagt een echte inschatting', description: 'Plan voor hitte, regen, donkerte, wegdek en eigen conditie; regel anders vervoer.' },
    { icon: 'waves', title: 'Zwem en vaar per actuele conditie', description: 'Volg lokale aanwijzingen voor wind, golf, getij, bootzones en zicht.' },
    { icon: 'map', title: 'Scooter is geen standaardoplossing', description: 'Huur alleen met geldig rijbewijs, verzekering, helm en ervaring.' },
  ],
  faqs: [
    { question: 'Wat is de beste reistijd voor Koh Mak?', answer: 'De drogere maanden worden vaak gekozen, maar de juiste dag hangt af van actuele regen, wind en golf in Trat. Controleer TMD en je operator opnieuw; ook in een gunstige periode kan een boot- of snorkeldag wijzigen.' },
    { question: 'Is Koh Mak leuk?', answer: 'Koh Mak is vooral leuk voor reizigers die een laag, kleinschalig eiland met strand, fietsen en rustige avonden zoeken. Wie veel nachtleven, winkelkeuze of dagelijkse grote excursies wil, past waarschijnlijk beter op een groter eiland.' },
    { question: 'Wat is het mooiste strand op Koh Mak?', answer: 'Er is geen objectief mooiste strand. Ao Kao geeft de meeste verspreide keuze; Ao Suan Yai biedt een rustiger baai- en Koh Khambeeld. Kies op hotelpositie, strandgebruik, getij en gewenste avondroute.' },
    { question: 'Is Koh Mak hetzelfde als Koh Mook?', answer: 'Nee. Koh Mak ligt in de Trat-archipel in de oostelijke Golf van Thailand. Koh Mook ligt bij Trang aan de Andamankust. Controleer provincie, hotelpin en pier voordat je vervoer boekt.' },
    { question: 'Hoe kom je van Bangkok naar Koh Mak?', answer: 'De route combineert doorgaans vervoer naar Trat, een operatorgebonden vastelandpier, boot naar een specifieke eilandpier en hoteltransfer. Leg alle schakels met marge vast en gebruik geen verouderde vaste vaartijd uit een blog.' },
  ],
  relatedGuides: [
    { title: 'Trat', description: 'Plan de vastelandgateway, aankomstbuffer en juiste pier als één route.', href: '/city/trat/', image: '/images/redesign/trat-destination-hero.webp', imageAlt: 'Trat als groene gateway naar de eilanden' },
    { title: 'Koh Chang', description: 'Vergelijk Koh Mak met een groter, bergachtiger eiland met meer zones en ferrylogistiek.', href: '/islands/koh-chang/', image: '/images/redesign/koh-chang-island-hero-nl.webp', imageAlt: 'Bergachtige kust van Koh Chang' },
    { title: 'Koh Kood', description: 'Vergelijk een groter en groener buureiland met andere transfers en verblijfafstanden.', href: '/blog/koh-kood-quiet-island-guide-trat-2026/', image: '/images/blog/koh-kood-quiet-island-guide-trat-2026.webp', imageAlt: 'Groene kust en helder water bij Koh Kood' },
  ],
  sources: [
    { title: 'The Journey to become the first low carbon destination in Thailand', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/promotions/73/The%20Journey%20to%20become%20the%20first%20low%20carbon%20destination%20in%20Thailand.', note: 'Primaire context voor de erkenning en low-carbonpositionering; verlopen campagnevoorwaarden zijn niet hergebruikt.' },
    { title: 'Sustainable and responsible tourism direction', creator: 'TAT Newsroom', url: 'https://www.tatnews.org/2022/11/tat-highlights-sustainable-and-responsible-tourism-direction-promotes-always-warm-thailand/', note: 'Aanvullende primaire context voor Koh Maks low-carbonrichting.' },
    { title: 'The Gulf of Thailand: Koh Mak, Trat', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/the-gulf-of-thailand-koh-mak-trat', note: 'Brede eiland- en activiteitencontext; oude transportdetails zijn niet als actuele dienstregeling gebruikt.' },
    { title: 'Eastern region weather', creator: 'Thai Meteorological Department', url: 'https://tmd.go.th/en/weather/region/eastern', note: 'Actuele regen-, wind- en golfcontext voor Trat.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele veiligheids-, rijbewijs-, scooter-, verzekerings- en geldcontext.' },
  ],
};
