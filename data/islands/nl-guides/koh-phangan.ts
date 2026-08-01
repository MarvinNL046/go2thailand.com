import type { DestinationGuideData } from '../../destinations/types';

export const kohPhanganIslandGuide: DestinationGuideData = {
  citySlug: 'koh-phangan', cityName: 'Koh Phangan', locale: 'nl',
  pageTitle: 'Koh Phangan Thailand: gebieden, stranden & route',
  pageDescription: 'Plan Koh Phangan zonder het eiland tot Full Moon Party te reduceren. Vergelijk Haad Rin, Thong Sala, westkust en noordoostkust, met ferrylogica en een route voor 4 dagen.',
  pageUrl: 'https://go2-thailand.com/nl/islands/koh-phangan/', dateModified: '2026-07-31',
  coordinates: { latitude: 9.7319, longitude: 100.0136 }, touristType: ['strandreizigers', 'wellnessreizigers', 'nachtlevenreizigers', 'eilandhoppers'],
  breadcrumbsRoot: { label: 'Eilanden', href: '/islands/' }, stayGuideHref: null, foodGuideHref: null,
  hero: {
    image: '/images/redesign/koh-phangan-island-hero-nl.webp', imageAlt: 'Rustige baai met palmen, longtailboten en groene heuvels op Koh Phangan bij zonsopkomst', imageClassName: 'object-cover object-[68%_center]',
    eyebrow: 'Eén eiland, vier verschillende ritmes', title: 'Koh Phangan', accent: 'Thailand', subtitle: 'Kies eerst je kust — en pas daarna je feestnacht.',
    description: 'Koh Phangan is geen synoniem voor Haad Rin. Het eiland combineert een praktische havenstad, rustige westkust, afgelegen noordoostelijke baaien en een zuidoosthoek die rond grote feesten volledig van ritme verandert.',
    stats: [
      { label: 'Aankomst', value: 'Ferry · Thong Sala', icon: 'ship' },
      { label: 'Sterk reisritme', value: '4–6 dagen', icon: 'calendar' },
      { label: 'Belangrijkste keuze', value: 'Gebied vóór hotel', icon: 'map' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst de juiste verwachting', title: 'Is Koh Phangan de moeite waard?',
    paragraphs: [
      'Ja, wanneer je een Golfeiland zoekt waar je strand, wellness, natuur en eventueel nachtleven binnen één verblijf kunt combineren. De gebieden verschillen sterk genoeg om je reis te maken of te breken: Haad Rin rond een feestdatum voelt als een andere bestemming dan Thong Nai Pan of de noordwestkust.',
      'Koh Phangan past minder goed als je maximale vervoerszekerheid, een eigen luchthaven of iedere avond een groot aanbod op loopafstand wilt. De ferry, heuvelachtige wegen en verspreide baaien maken locatiekeuze belangrijker dan een algemene “beste hotel”-lijst.',
    ],
    verdicts: [
      { label: 'Praktisch & flexibel', value: 'Thong Sala', description: 'Haven, dagelijkse voorzieningen en verbindingen; minder het klassieke strandgevoel.', icon: 'ship' },
      { label: 'Wellness & zonsondergang', value: 'Sri Thanu · west', description: 'Cafés, lessen en westkustritme; controleer zwemcondities per strand en seizoen.', icon: 'sun' },
      { label: 'Strand als bestemming', value: 'Thong Nai Pan', description: 'Noordoostelijke baaien voor een rustiger verblijf; meer transfertijd naar haven en zuiden.', icon: 'waves' },
      { label: 'Feest als hoofdreden', value: 'Haad Rin', description: 'Logisch rond het gekozen evenement, maar drukte, prijs en vervoer veranderen per datum.', icon: 'sparkles' },
    ],
  },
  zones: [
    { slug: 'thong-sala', name: 'Thong Sala & Baan Tai', kicker: 'Haven, eten & eilandlogistiek', image: '/images/extra images/Young Asian woman friends using mobile phone taking selfie together while travel on boat passing island beach.webp', imageAlt: 'Reizigers op een boot onderweg naar een Thais eiland', summary: 'Thong Sala is het praktische knooppunt rond de belangrijkste aankomstpier. Baan Tai strekt zich oostwaarts uit richting Haad Rin en werkt als tussenbasis wanneer je mobiliteit belangrijker vindt dan één perfecte baai.', bestFor: 'Eerste of laatste nacht, reizigers zonder eigen vervoer, korte verblijven en wie voorzieningen dichtbij wil.', tradeoff: 'De hoofdplaats voelt minder als een afgezonderde strandvakantie. Controleer de exacte afstand tot pier, markt en hoofdweg.' },
    { slug: 'haad-rin', name: 'Haad Rin & zuidoost', kicker: 'Feestdatum bepaalt alles', image: '/images/blog/full-moon-party-koh-phangan-guide-2026.webp', imageAlt: 'Avondsfeer tijdens een strandfeest op Koh Phangan', summary: 'Haad Rin heeft stranden, accommodaties en een eigen dagelijks ritme, maar rond grote evenementen nemen drukte, controles en vervoersvraag sterk toe. Plan dit gebied alleen bewust.', bestFor: 'Reizigers voor wie een specifiek evenement de hoofdreden is en die daarna weinig nachtvervoer willen.', tradeoff: 'Buiten je gekozen evenement kan het profiel anders zijn; rond pieknachten kunnen rust, voorraad en flexibiliteit afnemen.' },
    { slug: 'westkust', name: 'Sri Thanu, Haad Yao & noordwest', kicker: 'Wellness, cafés & westlicht', image: '/images/blog/yoga-retreats-koh-samui-koh-phangan-2026-guide.webp', imageAlt: 'Rustige wellness- en yogasfeer tussen tropisch groen op Koh Phangan', summary: 'De west- en noordwestkust combineert verspreide strandgebieden met wellness, cafés en zonsondergang. Je kiest hier eerder een buurt en dagelijkse routine dan één centraal dorp.', bestFor: 'Langere verblijven, wellness, stellen en reizigers die een scooter- of taxiplan hebben.', tradeoff: 'Niet ieder strand is bij ieder getij of seizoen hetzelfde om te zwemmen. “Westkust” is te breed om loopbaarheid te garanderen.' },
    { slug: 'noordoost', name: 'Thong Nai Pan & noordoost', kicker: 'Baai als eindbestemming', image: '/images/islands/koh-phangan.webp', imageAlt: 'Tropische baai en palmen op Koh Phangan', summary: 'De noordoostelijke baaien passen bij reizigers die vooral in en rond hun strandgebied willen blijven. Het landschap en tragere ritme zijn de winst; de afstand tot andere eilanddelen is de prijs.', bestFor: 'Rustige stranddagen, stellen, gezinnen die hun baai zorgvuldig kiezen en reizigers met weinig eilandbrede plannen.', tradeoff: 'Een goedkope kamer kan duurder uitvallen als je dagelijks naar Thong Sala, westkust of Haad Rin wilt reizen.' },
  ],
  highlights: [
    { title: 'Plan Haad Rin als evenement, niet als cliché', eyebrow: 'Full Moon-afweging', image: '/images/blog/full-moon-party-koh-phangan-guide-2026.webp', imageAlt: 'Feestlichten en bezoekers tijdens een evenement op Koh Phangan', description: 'Controleer de actuele datum bij de organisator, boek een passende slaapzone en bepaal vooraf hoe je terugkomt. Ga niet uit van een vaste maanddag, prijs of eindtijd.', decision: 'Wil je het feest echt meemaken, blijf dan in of nabij Haad Rin. Wil je vooral slapen, kies bewust een ander eilanddeel en vermijd een onnodige nachttransfer.', href: '/nightlife/' },
    { title: 'Laat één kust je dagelijkse basis zijn', eyebrow: 'Strandkeuze', image: '/images/redesign/koh-phangan-island-hero-nl.webp', imageAlt: 'Brede rustige baai op Koh Phangan in warm ochtendlicht', description: 'Een kaart laat afstanden klein lijken, maar heuvels, donkerte en weersomstandigheden maken dagelijks kruisen vermoeiend. Kies één kust voor je gewone dagen.', decision: 'Verplaats alleen van slaapzone als je verblijf lang genoeg is om opnieuw in te checken zonder een hele stranddag te verliezen.', href: '/islands/' },
    { title: 'Behandel watervallen en trails als conditie-afhankelijk', eyebrow: 'Groen binnenland', image: '/images/blog/kaia-koh-phangan-eco-luxury-tented-resort-2026.webp', imageAlt: 'Tropisch groen en heuvelachtig landschap op Koh Phangan', description: 'Waterstand, hitte, regen en padconditie veranderen. Controleer lokaal wat open en verantwoord is en ga niet op basis van een oude top-10-foto.', decision: 'Plan natuur in de ochtend en houd een strand- of caféplan achter de hand wanneer omstandigheden tegenvallen.', href: '/weather/' },
  ],
  featureBanner: { image: '/images/blog/full-moon-party-koh-phangan-guide-2026.webp', imageAlt: 'Koh Phangan in de avond tijdens een groot strandevenement', eyebrow: 'Feestnacht of rustige nacht', title: 'Je slaapgebied is je belangrijkste veiligheidskeuze.', description: 'Sla hotelpin en terugroute offline op, bepaal vóór vertrek wie rijdt en rijd na alcohol niet zelf. Tourist Police is bereikbaar via 1155; bij direct gevaar bel je 191.' },
  food: { image: '/images/redesign/koh-samui-food-working-coast-coconut-nl.webp', imageAlt: 'Zuid-Thaise kusttafel met kokos, vis en gedeelde gerechten', eyebrow: 'Eten volgt het gebied', title: 'Markt, wellnesscafé of kusttafel?', description: 'Thong Sala geeft de breedste praktische keuze; Sri Thanu legt meer nadruk op wellness- en dieetvriendelijke cafés; strandgebieden draaien sterker op de lokale hotel- en restaurantmix. Controleer allergenen en actuele opening ter plekke.', dishes: [
    { name: 'Gedeelde zuidelijke curry', description: 'Vraag naar pittigheid en ingrediënten; recept en visbasis verschillen per keuken.' },
    { name: 'Gegrilde vis of zeevruchten', description: 'Vraag naar totaalprijs, bereiding en herkomst zonder versheid op uiterlijk alleen te claimen.' },
    { name: 'Kokosdessert of fruit', description: 'Een lichte afsluiting die lokaal aanbod volgt; geen specifieke kraam is tijdloos “de beste”.' },
  ]},
  itinerary: { eyebrow: 'Vier dagen, één duidelijke basis', title: 'Een route die niet steeds het eiland kruist.', description: 'Dit is een ritme, geen dienstregeling. Pas boot- en buitendagen aan op actuele zee, regen, evenementdruk en je slaapgebied.', days: [
    { day: 'Dag 1', title: 'Aankomen & gebied testen', description: 'Check in, regel betaal- en vervoersbuffer en loop je directe strand- of dorpsomgeving.', href: '#zones' },
    { day: 'Dag 2', title: 'Jouw eigen kust', description: 'Blijf rond de gekozen west-, noord- of oostkust en plan niet meer dan één verre stop.', href: '#zones' },
    { day: 'Dag 3', title: 'Boot, natuur of wellness', description: 'Kies één conditie-afhankelijke hoofddag en bewaar een lokaal plan B.', href: '#doen' },
    { day: 'Dag 4', title: 'Evenement óf rustige avond', description: 'Plan Haad Rin alleen wanneer dat je doel is; anders kies je een avond dichtbij je hotel.', href: '#doen' },
  ]},
  planning: {
    weather: { title: 'Golfweer vraagt live controle', summary: 'Koh Phangan volgt niet simpelweg de Andamanseizoenen. Gebruik klimaat als eerste filter en actuele voorspelling en maritieme waarschuwing voor de echte dagbeslissing.', best: 'Kies je venster op route en activiteit, niet op één universele “beste maand”.', tradeoff: 'Regen, wind, getij en zicht kunnen per dag en kust verschillen; boot- en snorkelplannen blijven voorwaardelijk.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Visuele vergelijking van weerspatronen aan Thaise kusten' },
    transport: { title: 'De ferry is maar één schakel', summary: 'Plan vertrekpunt op het vasteland of Samui, exacte pier, check-in, bagage en transfer vanaf Thong Sala als één keten.', facts: ['Controleer operator en pier op je voucher', 'Bouw marge in voor losse aansluitingen', 'Download hotelpin en boekingsbewijs offline', 'Hercontroleer bij wind of zware regen'], image: '/images/redesign/thailand-island-hopping-hero-v2.webp', imageAlt: 'Reizigers tijdens een ferry-overtocht langs Thaise eilanden' },
  },
  practicalTips: [
    { icon: 'ship', title: 'Pier vóór prijs', description: 'Een goedkoop ticket vanaf de verkeerde pier kan extra taxi, nacht of gemiste aansluiting veroorzaken.' },
    { icon: 'car', title: 'Geen scooter op routine', description: 'Rijd alleen met passend rijbewijs, helm, ervaring en geldige dekking; neem na alcohol ander vervoer.' },
    { icon: 'calendar', title: 'Datumdruk controleren', description: 'Feesten en feestdagen kunnen vraag, voorraad, verkeer en rust veranderen.' },
    { icon: 'compass', title: 'Eén offline route', description: 'Bewaar hotelnaam, kaartpin, pier, noodnummers en een afgesproken ontmoetingspunt.' },
  ],
  faqs: [
    { question: 'Is Koh Phangan de moeite waard?', answer: 'Ja voor reizigers die strand, wellness, natuur en eventueel nachtleven in één eilandverblijf willen combineren. Het werkt minder goed als je alle gebieden dagelijks wilt afvinken of luchthaven- en stadscomfort verwacht.' },
    { question: 'Wat is er te doen in Koh Phangan?', answer: 'Kies per dag één hoofdthema: een west- of noordkuststrand, Thong Sala en lokale eetmomenten, een wellnessdag, een conditie-afhankelijke natuur- of bootdag, of een bewust gepland evenement in Haad Rin.' },
    { question: 'Wat is de beste reistijd voor Koh Phangan?', answer: 'Er is geen maandgarantie. Vergelijk het Golfklimaat met jouw activiteit en controleer vlak voor en tijdens de reis de actuele TMD-verwachting, wind en maritieme waarschuwingen. Evenementdata en schoolvakanties kunnen daarnaast de drukte veranderen.' },
    { question: 'Wat is leuker, Koh Phangan of Koh Samui?', answer: 'Kies Samui voor eigen luchthaven, meer voorzieningen en een grotere hotel- en gebiedskeuze. Kies Phangan voor een sterker eilandritme, kleinere baaien, wellness en de optie van Haad Rin. Bekijk de volledige vergelijking als beide op je shortlist staan.' },
  ],
  relatedGuides: [
    { title: 'Koh Samui of Koh Phangan?', description: 'Vergelijk bereikbaarheid, gebieden, stranden en dagelijks ritme naast elkaar.', href: '/compare/koh-samui-vs-koh-phangan/', image: '/images/islands/koh-samui.webp', imageAlt: 'Kust van Koh Samui als vergelijking met Koh Phangan' },
    { title: 'Koh Tao', description: 'Kies de volgende Golfstop voor duiken, snorkelen en een compacter eilandritme.', href: '/islands/koh-tao/', image: '/images/islands/koh-tao.webp', imageAlt: 'Baai en kust van Koh Tao' },
    { title: 'Eilanden van Thailand', description: 'Leg Phangan naast andere Golf- en Andaman-eilanden voordat je een route bouwt.', href: '/islands/', image: '/images/redesign/thailand-island-hopping-hero-v2.webp', imageAlt: 'Ferryroute langs eilanden in Thailand' },
  ],
  sources: [
    { title: 'Thailand destination portal', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations', note: 'Officiële bestemmingscontext; operationele details worden apart live gecontroleerd.' },
    { title: 'Weather and warnings', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Actuele weersverwachting en maritieme waarschuwingen voor reis- en bootbeslissingen.' },
    { title: 'Full Moon Party schedule', creator: 'Full Moon Party Thailand', url: 'https://www.fullmoonparty-thailand.com/schedules/', note: 'Datumafhankelijke evenementinformatie; controleer opnieuw bij accommodatie en lokale autoriteiten.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele regionale veiligheids- en consulaire context.' },
  ],
};
