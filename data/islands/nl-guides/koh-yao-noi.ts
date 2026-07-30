import type { DestinationGuideData } from '../../destinations/types';

export const kohYaoNoiIslandGuide: DestinationGuideData = {
  citySlug: 'koh-yao-noi', cityName: 'Koh Yao Noi', locale: 'nl',
  pageTitle: 'Koh Yao Noi: waar verblijven & wat doen?',
  pageDescription: 'Ontdek of Koh Yao Noi bij je past. Vergelijk Tha Khao, Pasai, het zuiden en de noordkant, met bootroutes, getij en een realistisch eilandritme.',
  pageUrl: 'https://go2-thailand.com/nl/islands/koh-yao-noi/', dateModified: '2026-07-31', coordinates: { latitude: 8.1197, longitude: 98.6068 }, touristType: ['eilandreizigers', 'rustzoekers', 'stellen', 'gezinnen'],
  breadcrumbsRoot: { label: 'Eilanden', href: '/islands/' }, stayGuideHref: null, foodGuideHref: null,
  hero: {
    image: '/images/redesign/koh-yao-noi-island-hero-nl.webp', imageAlt: 'Bewoonde kust van Koh Yao Noi met rijstvelden, lokale weg, longtail en karstbergen in Phang Nga Bay', imageClassName: 'object-cover object-[67%_center]', eyebrow: 'Bewoond eiland in Phang Nga Bay', title: 'Koh Yao Noi', accent: 'Thailand', subtitle: 'Je komt voor het rustige ritme. Je plant voor pier, getij en echte hotelafstand.', description: 'Koh Yao Noi combineert dorpen, landbouw en kleinschalige verblijven met uitzicht op de karstbergen van Phang Nga Bay. Het eiland voelt overzichtelijk, maar kustkeuze en boot-hotelketen bepalen hoe ontspannen je verblijf werkelijk wordt.',
    stats: [
      { label: 'Sterk verblijf', value: '3–4 dagen', icon: 'calendar' },
      { label: 'Keuze-as', value: 'Oostkust · zuid', icon: 'map' },
      { label: 'Gateways', value: 'Phuket · Krabi', icon: 'ship' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst het eilandbeeld aanscherpen', title: 'Is Koh Yao Noi de moeite waard?',
    paragraphs: [
      'Ja, wanneer je een bewoond eiland zoekt waar dorpen, velden, moskeeën, vissersleven en rustige verblijven deel van hetzelfde landschap zijn. Het uitzicht richting de kalksteenformaties is sterk, terwijl het avond- en activiteitenaanbod kleiner blijft dan op Phuket of Krabi.',
      'Koh Yao Noi past minder goed wanneer je een breed zwemstrand voor iedere hoteldeur verwacht, veel nachtleven zoekt of iedere overstap strak wilt vastleggen. Getij, wind en bootuitvoering veranderen strandgebruik en route; rust betekent hier niet dat alles vanzelf dichtbij ligt.',
    ],
    verdicts: [
      { label: 'Pier & lokaal ritme', value: 'Tha Khao', description: 'Noordoostelijke aankomstomgeving met dorpse context; controleer de afstand tot je exacte verblijf.', icon: 'ship' },
      { label: 'Meeste verblijfkeuze', value: 'Pasai · Klong Jark', description: 'Oostelijke hotelas met karstzicht en restaurants, maar wisselend strandgebruik door getij.', icon: 'waves' },
      { label: 'Routegemak', value: 'Zuid & Manoh', description: 'Praktisch voor aankomst en lokale verplaatsing; minder het klassieke resortbeeld.', icon: 'map' },
      { label: 'Verblijf als bestemming', value: 'Noordkant', description: 'Afgelegen resorts en groen; hotelvoorzieningen en laatste transfer wegen zwaarder.', icon: 'hotel' },
    ],
  },
  zones: [
    { slug: 'tha-khao', name: 'Tha Khao & noordoost', kicker: 'Pier, dorp & verre karst', image: '/images/redesign/koh-yao-noi-island-hero-nl.webp', imageAlt: 'Lokale kustweg en Phang Nga-karst aan de noordoostkant van Koh Yao Noi', summary: 'Tha Khao geeft een dorpser eilandbeeld en kan onderdeel zijn van de aankomstketen vanaf de Krabi-zijde. Je zit dicht bij lokale voorzieningen, terwijl hotels en strandtoegang onderling sterk verschillen.', bestFor: 'Reizigers die lokale context en rust belangrijker vinden dan een compacte resortstrook.', tradeoff: 'Een piernaam is geen hotelzone. Vraag vooraf naar de actuele aankomstpier, bagage en laatste transfer.' },
    { slug: 'pasai-klong-jark', name: 'Pasai & Klong Jark', kicker: 'Karstzicht & meeste keuze', image: '/images/islands/koh-yao-noi.webp', imageAlt: 'Oostkust en verre kalksteenformaties bij Koh Yao Noi', summary: 'Langs de oostkant ligt veel van de toegankelijke accommodatie- en restaurantkeuze. Dit is de logische allround basis voor wie uitzicht en een eenvoudige avondroute wil combineren.', bestFor: 'Eerste bezoekers, stellen, gezinnen en reizigers die meerdere eetopties dichtbij willen vergelijken.', tradeoff: 'De kust is niet overal een klassiek zwemstrand. Bodem, getij, wind en boten bepalen het gebruik per plek en moment.' },
    { slug: 'south-manoh', name: 'Zuidkant & Manoh', kicker: 'Aankomst, wegen & dagelijks leven', image: '/images/redesign/phuket-attraction-phang-nga.webp', imageAlt: 'Groene kust en lokale route in de provincie Phang Nga', summary: 'De zuidkant legt de nadruk op routegemak, dorpen en verbindingen. Het is bruikbaar als je veel over het eiland beweegt of je aankomst- en vertrekdag licht wilt houden.', bestFor: 'Korte verblijven, doorreizigers en wie praktische eilandlogistiek boven resortisolatie zet.', tradeoff: 'Controleer of de gekozen accommodatie echt aan zee ligt en welke voorzieningen na donker bereikbaar zijn.' },
    { slug: 'north-resorts', name: 'Noordelijke resortzone', kicker: 'Groen, afstand & hotelritme', image: '/images/redesign/stay-island-hideaway.webp', imageAlt: 'Kleinschalig verblijf tussen groen aan een Thaise eilandkust', summary: 'In het noorden kan het verblijf zelf de bestemming worden. De groene ligging en kleinere voorraad passen bij rustige dagen, maar maken spontane ritten en restaurantkeuze minder vanzelfsprekend.', bestFor: 'Stellen, langzame verblijven en reizigers die vooraf weten welke hotelvoorzieningen zij willen gebruiken.', tradeoff: 'Afgelegen betekent niet automatisch stil of privé. Controleer bouw, boten, transfer, restauranturen en werkelijke kusttoegang.' },
  ],
  highlights: [
    { title: 'Koh Yao Noi is niet Koh Yao Yai', eyebrow: 'Twee eilanden, andere planning', image: '/images/redesign/koh-yao-noi-island-hero-nl.webp', imageAlt: 'Bewoond Koh Yao Noi in de archipel van Phang Nga Bay', description: 'Zoekresultaten en kaarten mengen beide eilanden gemakkelijk. Laem Had en verschillende grote resorts horen bij Koh Yao Yai; je voucher, pier en hotelpin moeten daarom exact hetzelfde eiland noemen.', decision: 'Controleer vóór betaling de volledige hotelnaam, eilandnaam, aankomstpier en laatste transfer.', href: '#praktisch' },
    { title: 'De oostkust is uitzicht, niet altijd zwemgarantie', eyebrow: 'Getij bepaalt de stranddag', image: '/images/islands/koh-yao-noi.webp', imageAlt: 'Getijdenkust van Koh Yao Noi met uitzicht op Phang Nga Bay', description: 'Bij lager water kan een brede ondiepe kust zichtbaar worden; op andere momenten veranderen wind, bodem en bootverkeer de zwemruimte. Een hotelbeeld toont maar één moment.', decision: 'Vraag het hotel naar de actuele kusttoegang en plan zwemmen per plek, getij en lokale instructie.', href: '#zones' },
    { title: 'Eén bootdag, met een volwaardig alternatief', eyebrow: 'Phang Nga op voorwaarden', image: '/images/redesign/phuket-attraction-phang-nga.webp', imageAlt: 'Longtail tussen kalksteenformaties in Phang Nga Bay', description: 'Eilandstops, kajakken en snorkelen hangen af van wind, getij, parkstatus en operator. Dezelfde posterroute is niet iedere dag verantwoord of beschikbaar.', decision: 'Boek op veiligheidsbeleid en voorwaarden en houd een lokale fiets-, dorp- of rustdag als alternatief.', href: '/activities/' },
  ],
  featureBanner: { image: '/images/redesign/koh-yao-noi-island-hero-nl.webp', imageAlt: 'Rijstvelden, lokale huizen en kustnatuur op Koh Yao Noi', eyebrow: 'Een gemeenschap is geen decor', title: 'Reis rustig zonder het dagelijkse leven te romantiseren.', description: 'Kleed je passend buiten strand en resort, vraag toestemming voor foto’s, respecteer gebed en privéterrein en besteed bij lokale ondernemers zonder mensen als “authentieke attractie” te behandelen.' },
  food: { image: '/images/redesign/krabi-food-estuary-table.webp', imageAlt: 'Zuid-Thaise tafel met vis, rijst, groenten en kruiden', eyebrow: 'Eilandkeuken & aanvoer', title: 'Eet lokaal, maar vraag concreet naar basis en totaalprijs.', description: 'Vis, rijstgerechten en Zuid-Thaise curries passen bij de kustcontext. Beschikbaarheid wisselt; vraag bij allergieën naar vissaus, garnalenpasta, noten en kruiscontact en bevestig prijs en bereiding vooraf.', dishes: [
    { name: 'Vis of zeevruchten', description: 'Vraag naar soort, portie, prijswijze en bereiding; beschikbaarheid is afhankelijk van aanvoer en vangst.' },
    { name: 'Zuid-Thaise curry', description: 'Kan pittig zijn en visbasis bevatten. Benoem allergenen en gewenste bereiding afzonderlijk.' },
    { name: 'Roti, rijst & eenvoudig ontbijt', description: 'Praktisch rond een vroege boot- of eilanddag; controleer openingstijd de avond ervoor.' },
  ]},
  itinerary: { eyebrow: 'Drie nachten, één wisselbare baaidag', title: 'Een eilandritme met ruimte voor getij en gemeenschap.', description: 'Gebruik één slaapbasis en bouw iedere dag rond één richting. Zo hoef je het eiland niet als checklist te behandelen.', days: [
    { day: 'Dag 1', title: 'Pier, hotel & eigen kust', description: 'Rond bagage en transfer af, controleer avondeten en verken alleen je directe omgeving.', href: '#zones' },
    { day: 'Dag 2', title: 'Dorpen, velden & oostkust', description: 'Combineer lokale wegen en uitzicht met respectvolle stops en een hittepauze.', href: '#doen' },
    { day: 'Dag 3', title: 'Baaiboot of landalternatief', description: 'Controleer weer, getij en operator en wissel zo nodig naar een rustige eilanddag.', href: '#praktisch' },
    { day: 'Dag 4', title: 'Eenvoudige vertrekbuffer', description: 'Bevestig pier en transfer opnieuw en koppel geen kwetsbare aansluiting direct aan de boot.', href: '#route' },
  ]},
  planning: {
    weather: { title: 'Getij en wind zijn deel van de bestemming', summary: 'Klimaat helpt bij de reisperiode; actuele wind, regen, golven en getij bepalen de concrete kust- en bootdag.', best: 'Controleer TMD, operator en hotel opnieuw en houd één activiteit kunnen wisselen.', tradeoff: 'Zon aan je hotel garandeert geen rustige baai, helder water of dezelfde terugroute.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Vergelijking van weerpatronen aan Thaise kusten' },
    transport: { title: 'Boek tot de hoteldeur, niet alleen tot “Koh Yao”', summary: 'Vergelijk vertrekpier, boot, juiste eiland en aankomstpier, bagage en laatste transfer. Phuket en Krabi kunnen allebei een gateway zijn, maar niet iedere verbinding past op iedere dag.', facts: ['Laat hotel en voucher dezelfde eilandnaam tonen', 'Bevestig vertrek- en aankomstpier opnieuw', 'Vraag wie de laatste transfer uitvoert', 'Plan marge bij losse vlucht of vervolgboot'], image: '/images/redesign/koh-yao-noi-island-hero-nl.webp', imageAlt: 'Longtail en kustweg op Koh Yao Noi' },
  },
  practicalTips: [
    { icon: 'ship', title: 'Piernamen zijn beslissend', description: 'Controleer Noi versus Yai, beide pieren en de hoteltransfer vóór vertrek.' },
    { icon: 'compass', title: 'Scooter is geen standaardadvies', description: 'Huur alleen met geldig rijbewijs, verzekering, helm en ervaring; kies anders een lokale transfer.' },
    { icon: 'waves', title: 'Lees de kust per moment', description: 'Gebruik getij, bodem, wind en botenzones; volg hotel- en lokale aanwijzingen.' },
    { icon: 'map', title: 'Respecteer bewoond gebied', description: 'Vraag toestemming voor foto’s en behandel erf, moskee en werkplek niet als open attractie.' },
  ],
  faqs: [
    { question: 'Is Koh Yao Noi de moeite waard?', answer: 'Ja, wanneer je een bewoond, rustiger eiland zoekt met Phang Nga-uitzicht en minder avondvertier dan Phuket of Krabi. Kies je slaapzone op kustgebruik, hotelafstand en pierlogistiek — niet op de belofte van een leeg paradijs.' },
    { question: 'Wat is er te doen op Koh Yao Noi?', answer: 'Verken dorpen en landbouwlandschap respectvol, vergelijk delen van de oostkust en plan één conditionele boot- of kajakdag. Gebruik getij, weer en lokale aanwijzingen om te bepalen wat die dag verantwoord is.' },
    { question: 'Hoe kom je op Koh Yao Noi?', answer: 'Veel routes combineren een vertrekpier aan de Phuket- of Krabi-zijde met een boot en een laatste eilandtransfer. Controleer Koh Yao Noi versus Yai, exacte pieren, bagage, voorwaarden en hoteldeurtransfer op één tijdlijn.' },
    { question: 'Hoeveel dagen heb je nodig voor Koh Yao Noi?', answer: 'Drie tot vier dagen is voor veel reizigers een bruikbaar ritme: aankomst, een eilanddag, een wisselbare boot- of kustdag en vertrek. Blijf langer wanneer rust en het verblijf zelf het doel zijn; korter maakt de bootketen relatief zwaar.' },
  ],
  relatedGuides: [
    { title: 'Phuket', description: 'Plan de westelijke gateway en controleer vanaf welke pier je boot werkelijk vertrekt.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Kust en stedelijke gateway Phuket' },
    { title: 'Krabi', description: 'Vergelijk de oostelijke gateway, vastelandtransfer en een vervolg door Phang Nga Bay.', href: '/city/krabi/', image: '/images/redesign/krabi-destination-hero.webp', imageAlt: 'Kalksteenlandschap en kust bij Krabi' },
    { title: 'Thailand weer', description: 'Begrijp de Andamankust en controleer daarna de actuele boot- en kustconditie.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Visuele vergelijking van Thaise kustseizoenen' },
  ],
  sources: [
    { title: 'Phang Nga', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/Phang-Nga/348', note: 'Officiële brede context voor provincie, baai en eilanden.' },
    { title: 'Unique Thai Local Experiences', creator: 'TAT Newsroom', url: 'https://www.tatnews.org/2017/01/tat-governor-speech-atf-2017/', note: 'Officiële context voor visserij- en gemeenschapsactiviteiten op Ko Yao Noi.' },
    { title: 'Southern west coast weather', creator: 'Thai Meteorological Department', url: 'https://tmd.go.th/en/weather/region/southernwestcoast', note: 'Actuele wind-, regen- en golfcontext voor Phang Nga en de Andamankust.' },
    { title: 'National park information', creator: 'Department of National Parks Thailand', url: 'https://www.dnp.go.th/', note: 'Primaire bron voor actuele parkstatus en natuurregels.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele veiligheids-, rijbewijs-, scooter- en verzekeringscontext.' },
  ],
};
