export const transportHubNl = {
  seo: {
    title: 'Vervoer in Thailand: trein, bus, boot of vlucht?',
    description: 'Vergelijk vervoer in Thailand op reistijd, comfort en logistiek. Vind routes voor trein, bus, ferry en vlucht en bekijk actuele tickets via 12Go.',
  },
  hero: {
    eyebrow: 'Van A naar B, zonder halve reisdag te verliezen',
    title: 'Vervoer in',
    accent: 'Thailand.',
    intro: 'Trein, nachtbus, binnenlandse vlucht of ferry? Kies per traject wat werkelijk tijd, rust of budget oplevert en vind daarna de route die bij je reis past.',
  },
  modes: [
    {
      id: 'trein',
      title: 'Trein & nachttrein',
      bestFor: 'Lange routes vanaf Bangkok en reizen waarbij de nacht onderdeel van de ervaring mag zijn.',
      tradeoff: 'Langzamer en populaire slaapplaatsen kunnen op drukke dagen beperkt beschikbaar zijn.',
      check: 'Treinnummer, klasse, bedtype en het juiste vertrekstation.',
    },
    {
      id: 'bus',
      title: 'Bus & minivan',
      bestFor: 'Veel directe verbindingen en plaatsen zonder station of luchthaven.',
      tradeoff: 'Comfort, bagageruimte en aankomstpunt verschillen sterk per voertuig en aanbieder.',
      check: 'Operator, voertuigtype, bagagebeleid en exact busstation.',
    },
    {
      id: 'vlucht',
      title: 'Binnenlandse vlucht',
      bestFor: 'Grote afstanden wanneer één extra vakantiedag zwaarder weegt dan de ticketprijs.',
      tradeoff: 'Reken luchthavenritten, inchecktijd en bagage mee; de vluchtduur alleen vertelt niet het hele verhaal.',
      check: 'Vertrekluchthaven, ruimbagage, transfer en totale deur-tot-deurtijd.',
    },
    {
      id: 'ferry',
      title: 'Ferry & combiticket',
      bestFor: 'Eilanden en trajecten waarbij bus, trein of minivan op één ticket aansluit op de boot.',
      tradeoff: 'Weer, pierkeuze en losse aansluitingen kunnen je planning kwetsbaar maken.',
      check: 'Juiste pier, inbegrepen transfer, overstaptijd en laatste afvaart.',
    },
    {
      id: 'taxi',
      title: 'Taxi & transfer',
      bestFor: 'Luchthavens, korte regionale ritten en reizen met kinderen of veel bagage.',
      tradeoff: 'Duurder op lange afstanden en prijsafspraken zijn niet overal hetzelfde.',
      check: 'Meter of vaste prijs, tolwegen, ophaalpunt en voertuigformaat.',
    },
    {
      id: 'huurauto',
      title: 'Huurauto & scooter',
      bestFor: 'Landelijke regio’s en routes met meerdere stops buiten hoofdverbindingen.',
      tradeoff: 'Links rijden, verzekering, verkeersdrukte en rijbevoegdheid vragen extra voorbereiding.',
      check: 'Actuele rijbewijsregels, volledige verzekeringsdekking en schadeprocedure.',
    },
  ],
  decisionRows: [
    { situation: 'Tot ongeveer 200 km', firstChoice: 'Trein, bus of transfer', why: 'Je vermijdt luchthavenlogistiek en komt vaak centraler aan.', watch: 'Vertrekstation en laatste lokale aansluiting.' },
    { situation: 'Lange noord-zuidroute', firstChoice: 'Nachttrein of vlucht', why: 'Kies tussen een reisnacht en maximale tijd op bestemming.', watch: 'Tel hotelnacht, bagage en deur-tot-deurtijd mee.' },
    { situation: 'Naar een eiland', firstChoice: 'Combiticket of vlucht + ferry', why: 'Eén aansluiting verkleint het risico op losse overstappen.', watch: 'Pier, laatste boot en weersgevoeligheid.' },
    { situation: 'Met kinderen of veel bagage', firstChoice: 'Trein of vooraf geboekte transfer', why: 'Meer ruimte en minder wissels geven rust.', watch: 'Kinderzitje en bagageruimte vooraf bevestigen.' },
    { situation: 'Buiten de hoofdroute', firstChoice: 'Bus, minivan of huurauto', why: 'Deze bereiken plekken zonder goede spoor- of vliegverbinding.', watch: 'Aankomstpunt kan buiten het centrum liggen.' },
  ],
  planningSteps: [
    { title: 'Vergelijk deur tot deur', text: 'Tel niet alleen de rit, maar ook transfer, wachten, inchecken en de laatste kilometer.' },
    { title: 'Controleer het station', text: 'Bangkok en andere steden hebben meerdere terminals. De naam op je ticket is leidend.' },
    { title: 'Bouw overstaptijd in', text: 'Boek losse ferry- en busdelen niet strak tegen elkaar wanneer vertraging je hele route breekt.' },
    { title: 'Bewaar je ticket offline', text: 'Maak een screenshot of download de voucher met vertrekpunt en contactgegevens.' },
  ],
  faqs: [
    {
      question: 'Hoe kan ik me het beste verplaatsen in Thailand?',
      answer: 'Dat hangt vooral af van afstand en route. Voor korte en middellange trajecten zijn trein, bus of een transfer vaak logisch. Voor grote noord-zuidafstanden kies je meestal tussen een nachttrein en een binnenlandse vlucht. Naar eilanden is een combiticket met bus of trein en ferry vaak eenvoudiger dan losse aansluitingen.',
    },
    {
      question: 'Wat kost vervoer in Thailand?',
      answer: 'De totaalprijs hangt af van route, klasse, bagage, seizoen en hoe vroeg je boekt. Vergelijk niet alleen de ticketprijs: een vlucht kan extra kosten voor bagage en luchthavenvervoer hebben, terwijl een nachttrein mogelijk een hotelnacht vervangt. Bekijk daarom actuele prijzen per datum en aanbieder.',
    },
    {
      question: 'Wat kost openbaar vervoer in Thailand?',
      answer: 'Stadsvervoer, regionale bussen en treinklassen hebben verschillende tarieven en die kunnen wijzigen. Voor een bruikbare begroting vergelijk je de actuele routeprijs en noteer je daarnaast lokaal vervoer van station, pier of luchthaven naar je verblijf.',
    },
    {
      question: 'Wat is de goedkoopste manier om door Thailand te reizen?',
      answer: 'Op veel landroutes zijn gewone bussen en lagere treinklassen voordelig, maar de goedkoopste optie is niet altijd de beste waarde. Een lange nachtbus kan een dag kosten; een nachttrein kan juist een overnachting uitsparen. Vergelijk prijs, reistijd en aankomsttijd samen.',
    },
    {
      question: 'Welke apps zijn handig voor vervoer in Thailand?',
      answer: 'Gebruik een route- of boekingsplatform voor intercitytickets en controleer treinen ook bij de officiële SRT D-Ticket-kanalen. Voor lokale ritten zijn kaart- en taxi-apps nuttig waar ze beschikbaar zijn. Controleer altijd voertuig, kenteken, ophaalpunt en de prijs vóór vertrek.',
    },
    {
      question: 'Is het handig om een auto te huren in Thailand?',
      answer: 'Een huurauto kan handig zijn in landelijke regio’s of voor een route met veel tussenstops. Voor Bangkok en bekende intercitytrajecten is openbaar vervoer vaak eenvoudiger. Controleer vóór vertrek de actuele rijbewijs- en verzekeringsvoorwaarden en houd rekening met links rijden en lokaal verkeer.',
    },
  ],
  sources: [
    {
      title: 'Travel Around Thailand — FAQ',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Faqs/3',
      note: 'Officiële basisinformatie over trein, bus, lokaal vervoer, rijden en ferry’s in Thailand.',
    },
    {
      title: 'SRT D-Ticket',
      creator: 'State Railway of Thailand',
      url: 'https://dticket.railway.co.th/DTicketPublicWeb/home/Home',
      note: 'Officieel kanaal voor treinzoekopdrachten, reserveringen en actuele ticketvoorwaarden.',
    },
    {
      title: 'Vervoer in Thailand',
      creator: 'Riksja Travel',
      url: 'https://www.riksjatravel.nl/thailand/informatie/vervoer/',
      note: 'Nederlandse DFS-concurrentiebron, gebruikt om vervoersvormen en routevragen te vergelijken.',
    },
  ],
} as const;
