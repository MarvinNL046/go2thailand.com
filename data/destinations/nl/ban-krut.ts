import type { DestinationGuideData } from "../types";

export const banKrutDestinationGuide: DestinationGuideData = {
  citySlug: "ban-krut",
  cityName: "Ban Krut",
  locale: "nl",
  pageTitle: "Ban Krut Thailand: strand, Wat Thang Sai & route (2026)",
  pageDescription:
    "Ontdek Ban Krut aan de Thaise Golfkust. Vergelijk de strandzones, plan trein en last mile, bezoek Wat Thang Sai en kies een rustig verblijf.",
  pageUrl: "https://go2-thailand.com/nl/city/ban-krut/",
  dateModified: "2026-07-24",
  coordinates: { latitude: 11.3494, longitude: 99.5646 },
  touristType: [
    "Rustige strandreizigers",
    "Treinrondreizen",
    "Fietsers",
    "Slow travel",
  ],
  stayGuideHref: null,
  hero: {
    image: "/images/redesign/ban-krut-destination-hero.webp",
    imageAlt:
      "Lang rustig strand van Ban Krut aan de Golf van Thailand met palmen en lokale vissersboten",
    eyebrow: "Een kleine Golfkustplaats die je tijd teruggeeft",
    title: "Ban Krut",
    accent: "Thailand",
    subtitle: "Kies je strandzone. Laat de haast in de trein achter.",
    description:
      "Ban Krut is een rustige kustplaats in Prachuap Khiri Khan met een eigen spoorstation, een lang strand en Khao Thong Chai als herkenbare groene scheiding. Je komt hier niet voor een eindeloze attractielijst, maar voor twee tot vier nachten met fietsen, zee, een respectvol tempelbezoek en verse Golfvis. De keuze tussen het centrale strand en het stillere noorden bepaalt meer dan een willekeurige hotelster.",
    imageClassName: "object-cover object-[62%_center] lg:object-center",
    stats: [
      {
        label: "Goed eerste verblijf",
        value: "2–4 nachten",
        icon: "calendar",
      },
      {
        label: "Logische aankomst",
        value: "Trein + transfer",
        icon: "car",
      },
      {
        label: "Sterkste reisstijl",
        value: "Strand & fietsen",
        icon: "waves",
      },
    ],
  },
  quickAnswer: {
    eyebrow: "Eerst eerlijk kiezen",
    title: "Ban Krut is de moeite waard als rust je hoofdreden is",
    paragraphs: [
      "Ban Krut ligt aan de Golf van Thailand, in het district Bang Saphan van de provincie Prachuap Khiri Khan. Het is kleiner en stiller dan Hua Hin en heeft minder internationale voorzieningen, avondleven en georganiseerde activiteiten. Daar staat een lange kust, een compact lokaal centrum en een spoorstation tegenover. Dat maakt de plaats interessant als zelfstandige stop op een zuidelijke treinroute, niet als gehaaste strandexcursie vanuit Bangkok. Reken op een reis van meerdere uren en blijf overnachten; anders gaat het rustige karakter verloren aan de heen- en terugweg.",
      "De kust is niet overal hetzelfde. Rond het dorp en het centrale of zuidelijke deel van Ban Krut Beach zit je praktischer voor eenvoudige winkels, eetplekken en de transfer vanaf het station. Khao Thong Chai met Wat Thang Sai vormt vervolgens een herkenbaar headland. Aan de noordzijde ligt Thang Sai Beach: doorgaans stiller, groener en meer op losse resorts gericht, maar met minder voorzieningen op loopafstand. Wie zonder scooter of auto reist, moet daarom eerst het verblijf en pas daarna de strandfoto kiezen.",
      "Twee nachten geven een aankomstavond, een volle strand- en tempeldag en een ontspannen vertrek. Drie of vier nachten passen beter wanneer je wilt fietsen, het weer wilt kunnen opvangen of een aparte kustdag richting Bang Saphan plant. Verwacht geen gegarandeerd kalme, glasheldere zee: wind, regen en Golfcondities wisselen. Kijk naar lokale vlaggen en TMD-waarschuwingen. Ban Krut werkt het best voor reizigers die stilte en een eenvoudig dagritme als voordeel zien; voor nightlife, veel tours of een autovrije resortwereld is Hua Hin of een grotere eilandbasis logischer.",
    ],
    verdicts: [
      {
        label: "Is Ban Krut de moeite waard?",
        value: "Ja, voor echte rust",
        description:
          "Het lange strand, fietsen en de kleine schaal zijn de hoofdzaak. Wie veel highlights verwacht, kiest beter een andere basis.",
        icon: "sparkles",
      },
      {
        label: "Hoeveel nachten?",
        value: "2–4 nachten",
        description:
          "Twee is een bruikbaar minimum; drie of vier geeft ruimte voor weer, fietsen en een aparte kustuitstap.",
        icon: "calendar",
      },
      {
        label: "Waar verblijven?",
        value: "Centraal of noord",
        description:
          "Centraal is handiger zonder vervoer. Thang Sai is stiller, maar vraagt meer planning voor eten en verplaatsing.",
        icon: "hotel",
      },
      {
        label: "Grootste planningsfout",
        value: "Station = strand denken",
        description:
          "De trein brengt je naar Ban Krut, niet tot aan je strandkamer. Spreek de laatste transfer vooraf af.",
        icon: "map",
      },
    ],
  },
  zones: [
    {
      slug: "ban-krut-beach-centraal",
      name: "Centraal Ban Krut Beach",
      kicker: "Het praktischste eerste verblijf",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt: "Kustweg, stranden en Khao Thong Chai rond Ban Krut",
      summary:
        "Het centrale en zuidelijke stranddeel ligt het logischst voor reizigers die per trein aankomen en niet iedere maaltijd met een rit willen beginnen. Je zit dichter bij het dorp, lokale eetplekken, kleine winkels en de wegen naar het station. De sfeer blijft laagbouw en ontspannen, maar ‘centraal’ betekent niet dat alles aan één boulevard ligt. Controleer de echte looproute van accommodatie naar strand en voorzieningen; een pin in Ban Krut kan nog steeds verder lopen zijn dan de kaart doet vermoeden.",
      bestFor:
        "Eerste bezoek, treinreizigers, korte verblijven, makkelijke maaltijden en reizigers die niet dagelijks een scooter willen gebruiken.",
      tradeoff:
        "In weekenden en rond Thaise feestdagen kan het levendiger worden met binnenlandse bezoekers. De meest fotogenieke lege strook is niet automatisch de handigste plek om te slapen.",
    },
    {
      slug: "khao-thong-chai-wat-thang-sai",
      name: "Khao Thong Chai & Wat Thang Sai",
      kicker: "De groene scheiding aan de kust",
      image: "/images/redesign/ban-krut-wat-thang-sai.webp",
      imageAlt:
        "Wat Thang Sai en Phra Mahathat Chedi Phakdee Prakat op de groene kustheuvel",
      summary:
        "Khao Thong Chai verdeelt het kustbeeld en geeft Ban Krut zijn duidelijkste herkenningspunt. Op de heuvel ligt Wat Thang Sai met Phra Mahathat Chedi Phakdee Prakat. Behandel dit als een actieve religieuze plek, niet als decor voor het uitzicht: bedek schouders en knieën, praat zacht, volg lokale aanwijzingen en fotografeer geen mensen in gebed zonder toestemming. De helling, warmte en actuele toegang bepalen hoeveel tijd je nodig hebt; controleer ter plaatse welke delen open zijn.",
      bestFor:
        "Tempelarchitectuur, kustuitzicht, een rustige fietstocht of wandeling buiten de heetste uren en reizigers die context belangrijker vinden dan een snelle foto.",
      tradeoff:
        "De klim en het terrein zijn niet voor iedereen eenvoudig. Er is geen reden om onbevestigde openingstijden of toegang te forceren; bouw de dag zo dat het strand ook zonder tempelbezoek werkt.",
    },
    {
      slug: "thang-sai-beach-noord",
      name: "Thang Sai Beach",
      kicker: "Stillere resortstrook ten noorden van de heuvel",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt:
        "Khao Thong Chai tussen de lange stranden rond Ban Krut met fietsers op de kustweg",
      summary:
        "Ten noorden van Khao Thong Chai verandert het ritme. Thang Sai Beach voelt losser bebouwd en accommodaties liggen vaker als afzonderlijke groene verblijven langs de kust. Dat kan precies zijn wat je zoekt voor lezen, zwemmen wanneer de omstandigheden goed zijn en een trage ochtend. De keerzijde is minder keuze direct buiten de deur. Vraag vóór boeken naar ontbijt, restaurantdagen, fietsverhuur, transfer, strandtoegang en vervoer in de avond.",
      bestFor:
        "Stellen, langere rustige verblijven, directe strandtijd, fietsers en reizigers die het niet erg vinden om maaltijden of vervoer vooraf te organiseren.",
      tradeoff:
        "Afzondering is hier zowel kwaliteit als beperking. Zonder eigen vervoer kan één gesloten restaurant of een regenbui je dag sterker bepalen dan in het centrale deel.",
    },
    {
      slug: "bang-saphan-zuidkust",
      name: "Bang Saphan & de zuidkust",
      kicker: "Een aparte dag, niet ‘nog een stukje Ban Krut’",
      image: "/images/redesign/ban-krut-route-banner.webp",
      imageAlt:
        "Redactionele kustroute vanuit Ban Krut via het headland naar noordelijke en zuidelijke strandkeuzes",
      summary:
        "De grotere Bang Saphan-regio heeft meer kust, lokale gemeenschappen en baaien zoals Ao Bo Thong Lang, maar die horen niet allemaal bij het dorp Ban Krut. Maak er een bewuste dagroute van wanneer je vervoer hebt en de actuele weg- en weerssituatie past. Zo voorkom je dat reisgidsen elk strand, eiland en restaurant in het district als één compacte bestemming presenteren. Spreek een keerpunt af en laat genoeg tijd om voor donker terug te zijn.",
      bestFor:
        "Een derde of vierde dag, reizigers met auto of chauffeur en bezoekers die verschillende stukken Golfkust willen vergelijken zonder een attractiemarathon.",
      tradeoff:
        "Afstanden en weinig frequente lokale verbindingen maken improviseren lastiger. Koh Talu of een bootactiviteit is een afzonderlijk product met eigen weer-, veiligheids- en uitvoerderscheck, geen standaardonderdeel van deze owner.",
    },
  ],
  highlights: [
    {
      eyebrow: "Lees eerst de kust",
      title: "Kies tussen gemak in het centrum en stilte bij Thang Sai",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt:
        "Groene Khao Thong Chai-heuvel als scheiding tussen de stranden rond Ban Krut",
      description:
        "Ban Krut heeft niet één universele beste hotelzone. Rond centraal Ban Krut Beach bereik je eten en dagelijkse voorzieningen makkelijker. Ten noorden van Khao Thong Chai geeft Thang Sai meer afzondering en een resortachtig strandritme. Die keuze beïnvloedt je vervoer, avondeten en bewegingsvrijheid sterker dan een klein prijsverschil tussen kamers.",
      decision:
        "Zonder scooter of auto kies je een verblijf dat transfer en maaltijden duidelijk bevestigt. Met eigen vervoer kun je rustiger noordelijk slapen en het dorp gericht bezoeken.",
      href: "/city/ban-krut/attractions/",
    },
    {
      eyebrow: "Eén betekenisvolle cultuurstop",
      title: "Bezoek Wat Thang Sai als tempel, niet als uitzichtplatform",
      image: "/images/redesign/ban-krut-wat-thang-sai.webp",
      imageAlt:
        "Tempelcomplex van Wat Thang Sai op Khao Thong Chai bij de Golfkust",
      description:
        "Het tempelcomplex en de chedi op Khao Thong Chai verbinden religieuze betekenis met het kustlandschap. Juist daarom vraagt de plek om tempo en respect. Draag passende kleding, zet geluid uit, volg aanwijzingen en laat ceremoniële ruimtes met rust wanneer ze in gebruik zijn. Het uitzicht is een aanvulling op het bezoek, niet het bestaansrecht van de tempel.",
      decision:
        "Ga vroeg of later op de dag, neem water mee en accepteer dat actuele toegang of religieuze activiteiten je route kunnen veranderen.",
      href: "/city/ban-krut/attractions/",
    },
    {
      eyebrow: "Plan minder, beleef meer",
      title: "Een fiets, een stranddag en een goede tafel zijn genoeg",
      image: "/images/redesign/ban-krut-seafood.webp",
      imageAlt:
        "Lokale vissers en een gedeelde tafel met gegrilde vis, inktvis, krab en Zuid-Thaise curry",
      description:
        "De waarde van Ban Krut zit niet in het aantal tickets dat je boekt. Fiets een haalbaar deel van de kust, rust tijdens het heetste uur en bestel ’s avonds lokale vis, inktvis of curry om te delen. Vraag naar de vangst en bereiding in plaats van één online ‘beste restaurant’ na te jagen; namen, eigenaren en openingstijden kunnen sneller veranderen dan de kust.",
      decision:
        "Reserveer niet iedere dag vooraf. Leg alleen vervoer en essentiële transfers vast en houd zee, hitte en regen leidend voor de rest.",
      href: "/city/ban-krut/food/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/ban-krut-route-banner.webp",
    imageAlt:
      "Reisroute van station en dorp naar Ban Krut Beach, Khao Thong Chai en de rustigere noordkust",
    eyebrow: "Een station, twee strandritmes",
    title: "Laat je route splitsen bij Khao Thong Chai",
    description:
      "Kom per spoor aan, regel de laatste transfer en maak het centrale strand je praktische basis. Kies daarna noordwaarts voor Thang Sai en meer stilte of zuidwaarts voor een losse Bang Saphan-kustdag. De stippelroute is redactioneel, geen schaalkaart: echte afstanden en wegen controleer je voor vertrek.",
  },
  food: {
    image: "/images/redesign/ban-krut-seafood.webp",
    imageAlt:
      "Gedeelde Ban Krut-tafel met gegrilde Golfvis, inktvis, krab, curry, kruiden en rijst",
    eyebrow: "Eet met de kust mee",
    title: "Verse Golfvis is sterker dan een bevroren restaurantlijst",
    description:
      "Ban Krut en Bang Saphan hebben een levende visserijcontext, maar beschikbaarheid wisselt per dag, seizoen en weer. Vraag wat vers is, hoe het wordt bereid en of de portie bedoeld is om te delen. Een eenvoudige gegrilde vis kan hier meer zeggen dan een lange menukaart. Bij allergieën zijn schaal- en schelpdieren, vissaus, garnalenpasta, pinda en gedeelde wok of grill belangrijke gesprekspunten; laat je vertaling offline zien en neem bij ernstige allergie geen genoegen met alleen ‘mai phet’ of ‘niet pittig’.",
    dishes: [
      {
        name: "Gegrilde vis & nam jim",
        description:
          "Vraag welke hele vis die dag beschikbaar is en wat het gewicht of de portiegrootte betekent vóór bereiding. De pittig-zure dipsaus kan vissaus bevatten; bestel hem apart wanneer je zout, chili of allergenen wilt kunnen doseren. Eet de vis met rijst, limoen en verse kruiden in plaats van meerdere hoofdgerechten tegelijk te bestellen.",
      },
      {
        name: "Inktvis, krab & schelpdieren",
        description:
          "Gegrilde inktvis en krab passen bij de kust, maar zijn geen garantie op lokale vangst of een vaste prijs. Vraag naar dagprijs en bereiding. Voor schelpdierallergie is kruiscontact waarschijnlijker op een gedeelde grill, in frituurolie of in sauzen; kies bij twijfel een andere keuken en houd noodmedicatie bereikbaar.",
      },
      {
        name: "Zuid-Thaise curry & marktsnacks",
        description:
          "Curry’s kunnen aromatischer, zouter en scherper zijn dan reizigers verwachten en bevatten geregeld garnalenpasta of vis. Combineer een kleine portie met rijst en groente. Op een markt zijn fruit, gegrilde snacks en eenvoudige rijstgerechten een goede aanvulling, maar opening en aanbod volgen lokaal ritme; bouw je dag niet rond een oude online tijd.",
      },
    ],
  },
  itinerary: {
    eyebrow: "Drie dagen zonder checklistdruk",
    title: "Zo krijgt Ban Krut rust én richting",
    description:
      "Deze route gebruikt het centrale strand als eerste anker en laat pas daarna ruimte voor noord of zuid. Met twee nachten volg je aankomst en dag één; met een derde of vierde nacht voeg je een kustkeuze toe.",
    days: [
      {
        day: "Aankomst",
        title: "Van station naar strand, daarna niets meer hoeven",
        description:
          "Controleer je actuele trein en vertrekstation bij SRT en bevestig vóór vertrek wie je in Ban Krut ophaalt. Check in bij centraal Ban Krut Beach wanneer gemak vooropstaat, of rijd bewust door naar Thang Sai wanneer je verblijf transfer en diner regelt. Loop alleen een rustig stuk strand, kijk naar de zeecondities en eet lokaal. Een aankomstdag hoeft geen tempel, markt en zonsondergang tegelijk te bevatten.",
        href: "/city/ban-krut/food/",
      },
      {
        day: "Dag 1",
        title: "Fiets de kust en geef Wat Thang Sai echte tijd",
        description:
          "Begin vroeg met een veilige fietsroute of korte strandwandeling. Ga richting Khao Thong Chai en bezoek Wat Thang Sai wanneer toegang, kleding en omstandigheden passen. Rust midden op de dag. Kies later een stuk strand op basis van wind en lokale aanwijzingen en sluit af met gegrilde vis of curry. Rijd in het donker alleen wanneer weg, voertuig en verzekering dat verantwoord maken.",
        href: "/city/ban-krut/attractions/",
      },
      {
        day: "Dag 2",
        title: "Blijf noordelijk stil of maak één zuidelijke kustdag",
        description:
          "Gebruik een derde dag voor een echte keuze. Noordelijk blijf je dicht bij Thang Sai met lezen, zwemmen bij goede condities en een rustige lunch. Zuidelijk plan je met auto of chauffeur een afzonderlijke route richting Bang Saphan en eventueel Ao Bo Thong Lang. Controleer weer en terugrit, voeg geen spontane verre boottocht toe en houd voldoende marge voor je volgende trein of reisdag.",
        href: "/city/ban-krut/best-time-to-visit/",
      },
    ],
  },
  planning: {
    weather: {
      title: "De Golf volgt geen strandbrochure",
      summary:
        "Ban Krut heeft tropische warmte en seizoensgebonden regen, wind en zeecondities. Een maandgemiddelde vertelt niet of je specifieke middag rustig blijft. Plan fietsen vroeg, bescherm je tegen zon en houd voor zware regen of onweer een eenvoudige binnenoptie. De late jaarsperiode kan aan de Golf natter en onrustiger zijn dan veel algemene Thailandkalenders suggereren.",
      best: "Kies actuele rustige zee en draaglijke hitte boven één ‘perfecte’ maand",
      tradeoff:
        "Zelfs in een doorgaans drogere periode kan het regenen; in een nattere periode zijn er ook heldere uren. Controleer TMD en lokale vlaggen, ga bij onweer uit zee en laat een boot- of zwemdag door de uitvoerder bevestigen.",
      href: "/city/ban-krut/best-time-to-visit/",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt: "Golfkust en groene Khao Thong Chai-heuvel rond Ban Krut",
    },
    transport: {
      title: "De trein is sterk — als de last mile ook klopt",
      summary:
        "Ban Krut heeft een station aan de zuidelijke spoorlijn en is daardoor aantrekkelijk zonder binnenlandse vlucht. Het station ligt echter niet aan iedere strandaccommodatie. Controleer op D-Ticket of bij SRT je trein, datum en daadwerkelijke vertrekterminal en vraag je verblijf om een schriftelijk bevestigd ophaalpunt. Voor kustzones buiten het centrum heb je daarna een fiets, lokale transfer, chauffeur of verantwoord gehuurd voertuig nodig.",
      facts: [
        "Langeafstandstreinen naar het zuiden gebruiken doorgaans Krung Thep Aphiwat in Bangkok, maar treinsoort en vertrekpunt kunnen verschillen. Volg je concrete ticket en de actuele SRT-informatie, niet een oude blogtijd.",
        "Spreek de laatste transfer vóór vertrek af en deel treinnummer en verwachte aankomst pas via het kanaal van je accommodatie. Houd rekening met vertraging en bewaar telefoonnummer en adres offline.",
        "Een scooter is geen standaardoplossing. Controleer rijbewijs, internationaal rijbewijs, helm, verzekering, voertuigstaat, regen en donker. Kies een taxi of chauffeur wanneer je ervaring of dekking niet voldoende is.",
      ],
      image: "/images/redesign/ban-krut-route-banner.webp",
      imageAlt:
        "Treinroute via Ban Krut station naar dorp, strand en Khao Thong Chai",
    },
  },
  practicalTips: [
    {
      icon: "map",
      title: "Bewaar station, hotel en strand als drie pins",
      description:
        "Zo zie je vóór boeken of de laatste transfer en je dagelijkse looproute werkelijk logisch zijn. Alleen ‘Ban Krut’ op de kaart is te grof.",
    },
    {
      icon: "waves",
      title: "Lees de zee iedere dag opnieuw",
      description:
        "Controleer wind, onweer, lokale vlaggen en stroming. Een leeg strand is geen bewijs dat zwemmen op dat moment veilig is.",
    },
    {
      icon: "food",
      title: "Vraag naar dagvangst én allergenen",
      description:
        "Bespreek prijs, portie, vissaus, garnalenpasta, schelpdieren en gedeelde grill voordat de keuken begint. Neem je vertaling offline mee.",
    },
    {
      icon: "sun",
      title: "Gebruik het heetste uur voor rust",
      description:
        "Fiets en bezoek de heuvel vroeg of laat, drink voldoende en verschuif je route bij extreme hitte of een TMD-waarschuwing.",
    },
  ],
  faqs: [
    {
      question: "Wat te doen in Ban Krut?",
      answer:
        "Wandel of fiets een haalbaar deel van Ban Krut Beach, bezoek Wat Thang Sai en Phra Mahathat Chedi Phakdee Prakat respectvol op Khao Thong Chai en eet verse Golfvis of Zuid-Thaise curry. Met een extra dag kies je het stillere Thang Sai Beach in het noorden of een afzonderlijke kustroute richting Bang Saphan. De plaats is sterk door tempo en landschap, niet door een lange attractielijst.",
    },
    {
      question: "Waar ligt Ban Krut in Thailand?",
      answer:
        "Ban Krut ligt aan de Golf van Thailand in het district Bang Saphan, provincie Prachuap Khiri Khan, ten zuiden van Hua Hin. De plaats heeft een station aan de zuidelijke spoorlijn. Zie het niet als een snelle Bangkok-strandtrip: de reis duurt meerdere uren en het station ligt niet automatisch naast je accommodatie, dus plan een overnachting en laatste transfer.",
    },
    {
      question: "Wat is een mooi strand dicht bij Bangkok?",
      answer:
        "Ban Krut is mooi voor wie een rustige meerdaagse trein- of autorit wil, maar het is niet ‘dicht bij Bangkok’ in de zin van een korte dagtrip. Voor een snellere kuststop zijn Hua Hin of Cha-am praktischer. Kies Ban Krut wanneer de langere reis juist onderdeel van je route mag zijn en je minstens twee nachten blijft.",
    },
    {
      question: "Is Hua Hin erg toeristisch?",
      answer:
        "Hua Hin is groter, bekender en toeristischer dan Ban Krut, met meer hotels, winkels, restaurants, nightlife en vervoer. Dat kan een voordeel zijn voor gemak en keuze. Ban Krut is kleiner en rustiger, maar vraagt meer voorbereiding voor transfer en maaltijden. De betere keuze hangt dus niet af van ‘mooi’, maar van hoeveel voorzieningen en stilte je wilt.",
    },
  ],
  relatedGuides: [
    {
      title: "Wat te doen in Ban Krut",
      description:
        "Vergelijk strand, Wat Thang Sai, fietsen en een afzonderlijke Bang Saphan-kustdag zonder afstanden te onderschatten.",
      href: "/city/ban-krut/attractions/",
      image: "/images/redesign/ban-krut-wat-thang-sai.webp",
      imageAlt: "Wat Thang Sai op de kustheuvel bij Ban Krut",
    },
    {
      title: "Eten in Ban Krut",
      description:
        "Kies dagvangst, gegrilde vis, inktvis en Zuid-Thaise smaken met duidelijke allergie- en prijschecks.",
      href: "/city/ban-krut/food/",
      image: "/images/redesign/ban-krut-seafood.webp",
      imageAlt: "Gedeelde tafel met lokale visgerechten aan de Golfkust",
    },
    {
      title: "Beste reistijd voor Ban Krut",
      description:
        "Plan op actuele hitte, regen en zeecondities in plaats van één algemene Thailandkalender.",
      href: "/city/ban-krut/best-time-to-visit/",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt: "Golfkust en groene headland rond Ban Krut",
    },
  ],
  sources: [
    {
      title: "Prachuap Khiri Khan",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Prachuap-Khiri-Khan/231",
      note: "Officiële provinciecontext voor kustbestemmingen en Ao Bo Thong Lang.",
    },
    {
      title: "Ban Krut Beach official media",
      creator: "Tourism Authority of Thailand",
      url: "https://tatmediaassets.com/file/8984036",
      note: "Officiële locatie- en naamcontext voor Ban Krut Beach; niet gebruikt als nieuwe websiteasset.",
    },
    {
      title: "Phra Mahathat Chedi Phakdee Prakat",
      creator: "Tourism Authority of Thailand / Thailand Travel",
      url: "https://www.thailandtravel.or.jp/phra_mahathat_chedi_pakdee_prakat/",
      note: "Officiële context voor Wat Thang Sai, de chedi en de ligging op Khao Thong Chai.",
    },
    {
      title: "Southern Line timetable",
      creator: "State Railway of Thailand",
      url: "https://ttsview.railway.co.th/SRT_Schedule2022.php?line=4&ln=en&trip=2",
      note: "Actuele officiële stations- en spoorcontext; tijden worden niet op deze owner bevroren.",
    },
    {
      title: "D-Ticket",
      creator: "State Railway of Thailand",
      url: "https://www.dticket.railway.co.th/DTicketPublicWeb/home/Home",
      note: "Officieel kanaal om trein, datum en vertrekstation vlak voor boeken te controleren.",
    },
    {
      title: "Thai Meteorological Department",
      creator: "TMD",
      url: "https://www.tmd.go.th/en",
      note: "Officiële actuele verwachtingen en waarschuwingen voor hitte, regen en zeecondities.",
    },
    {
      title: "Reisadvies Thailand",
      creator: "NederlandWereldwijd",
      url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
      note: "Actuele Nederlandse veiligheidscontext; controleer opnieuw vlak voor vertrek.",
    },
  ],
};
