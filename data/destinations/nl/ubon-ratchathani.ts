import type { DestinationGuideData } from '../types';

export const ubonRatchathaniDestinationGuide: DestinationGuideData = {
  citySlug: 'ubon-ratchathani',
  cityName: 'Ubon Ratchathani',
  locale: 'nl',
  pageTitle: 'Ubon Ratchathani: stad, Mekong & route (2026)',
  pageDescription:
    'Plan Ubon Ratchathani met stad, kaarsenfestival, Khong Chiam, Pha Taem en Sam Phan Bok. Inclusief 3-nachtenroute, vervoer, seizoen en veiligheid.',
  pageUrl: 'https://go2-thailand.com/nl/city/ubon-ratchathani/',
  dateModified: '2026-07-24',
  coordinates: { latitude: 15.2287, longitude: 104.8564 },
  touristType: ['Cultuurreizigers', 'Slow travel', 'Roadtrippers', 'Natuurliefhebbers'],
  stayGuideHref: '/best-hotels/ubon-ratchathani/',
  hero: {
    image: '/images/redesign/ubon-ratchathani-hero.webp',
    imageAlt: 'Wat Phra That Nong Bua boven de groene stadsrand van Ubon Ratchathani bij zacht ochtendlicht',
    eyebrow: 'Isan-stad, kaarsenkunst en de weg naar de Mekong',
    title: 'Ubon Ratchathani',
    accent: 'van stad naar Mekong',
    subtitle: 'Kies eerst welk Ubon je bedoelt. De provincie is veel groter dan de stad.',
    description:
      'Ubon Ratchathani combineert een rustige Isan-stad met tempels, museum en markten én een uitgestrekte provincie richting Khong Chiam, Pha Taem en de Mekong. Juist die schaal bepaalt je reis. Met drie nachten geef je de stad één echte dag en de oostelijke route één volle dag. Sam Phan Bok, het kaarsenfestival of een zuidelijke omweg vragen elk hun eigen seizoen en logistiek.',
    imageClassName: 'object-cover object-[72%_center] lg:object-center',
    stats: [
      { label: 'Sterke eerste reis', value: '3 nachten', icon: 'calendar' },
      { label: 'Stad naar Pha Taem', value: 'Volle reisdag', icon: 'car' },
      { label: 'Aankomst', value: 'Vlucht of trein', icon: 'map' },
    ],
  },
  quickAnswer: {
    eyebrow: 'Eerst de schaal begrijpen',
    title: 'Ubon is de moeite waard wanneer je stad en provincie als twee reisblokken plant',
    paragraphs: [
      'De stad zelf is geen verzameling wereldberoemde monumenten, maar een rustige culturele basis. Rond Thung Si Mueang liggen het nationale museum, Wat Si Ubon Rattanaram, stedelijke markten en de plekken waar het jaarlijkse kaarsenfestival vorm krijgt. Wat Phra That Nong Bua staat noordelijker en geeft de stad een herkenbaar architectonisch anker. Wie alleen een avond aankomt en de volgende ochtend doorrijdt, ziet vooral wegen en mist precies de Isan-laag die Ubon onderscheidt.',
      'De landschappen waarvoor veel reizigers komen liggen buiten de stad. Khong Chiam is de logische basis voor de samenvloeiing van Mun en Mekong, Wat Tham Khuha Sawan en de route naar Pha Taem. Pha Taem draait niet alleen om zonsopkomst: het park combineert zandsteen, droog dipterocarpbos en prehistorische rotsschilderingen. Sam Phan Bok ligt in een andere richting en is afhankelijk van een lage Mekongstand. Zet beide daarom niet achteloos in één gehaaste autorit.',
      'Drie nachten is de robuuste eerste keuze: aankomst plus stad, één volle oostelijke dag en vertrek met marge. Een vierde nacht is verstandiger wanneer Sam Phan Bok, uitgebreid wandelen of het kaarsenfestival een hoofdreden is. Controleer daarbij altijd het actuele Nederlandse reisadvies. In juli 2026 golden rode en oranje zones langs de grens met Cambodja; een zuidelijke provincie-uitstap is dus geen vrijblijvende aanvulling op de veilige stads- en Mekongroute.',
    ],
    verdicts: [
      {
        label: 'Is Ubon de moeite waard?',
        value: 'Ja, voor langzaam Isan',
        description: 'De combinatie van levende stadscultuur, Mekonglandschap en Pha Taem is sterker dan een losse top-tien.',
        icon: 'sparkles',
      },
      {
        label: 'Hoeveel nachten?',
        value: '3 als basis',
        description: 'Eén stadsdag en één oostelijke dag passen. Voeg een vierde nacht toe voor Sam Phan Bok of festivaldrukte.',
        icon: 'calendar',
      },
      {
        label: 'Auto nodig?',
        value: 'Voor de provincie: ja',
        description: 'Luchthaven en trein brengen je naar de stad, niet automatisch naar Khong Chiam of de nationale parken.',
        icon: 'car',
      },
      {
        label: 'Veilige route?',
        value: 'Check grenszones',
        description: 'Volg NederlandWereldwijd en Thaise aanwijzingen; zuidelijke grensgebieden kunnen een andere kleurcode hebben.',
        icon: 'compass',
      },
    ],
  },
  zones: [
    {
      slug: 'ubon-city',
      name: 'Ubon-stad & Thung Si Mueang',
      kicker: 'Museum, markt en kaarsencultuur',
      image: '/images/redesign/ubon-ratchathani-candle-festival.webp',
      imageAlt: 'Wat Phra That Nong Bua en de lage stadsbebouwing van Ubon Ratchathani',
      summary:
        'Gebruik het centrum niet alleen als parkeerplaats voor een provincietocht. Begin bij het Ubon Ratchathani National Museum, dat archeologie, lagere-Isangeschiedenis, textiel en lokale cultuur samenbrengt. Wandel daarna via Thung Si Mueang naar Wat Si Ubon Rattanaram en een markt die op dat moment werkelijk actief is. Rond de boeddhistische vastentijd verandert dit gebied door de voorbereidingen en presentatie van de beroemde kaarsenwagens, maar buiten het festival blijft het een levende bestuurs- en woonstad. Controleer museumopening en evenementafzettingen bij officiële bronnen in plaats van een oud dagschema te kopiëren.',
      bestFor: 'Eerste dag, reizigers zonder auto, cultuur, museum, avondmarkt en een rustige introductie tot Isan.',
      tradeoff:
        'De grote natuurlocaties liggen hier niet om de hoek. Een stadshotel maakt een lange provincie-uitstap niet kort; plan rijtijd en een eventuele tweede basis apart.',
    },
    {
      slug: 'nong-bua',
      name: 'Wat Nong Bua & de noordelijke stad',
      kicker: 'Het architectonische herkenningspunt',
      image: '/images/redesign/ubon-ratchathani-wat-nong-bua.webp',
      imageAlt: 'De witte en gouden Mahabodhi-geïnspireerde pagode van Wat Phra That Nong Bua',
      summary:
        'Wat Phra That Nong Bua ligt buiten de compacte museumwandeling en verdient een bewust bezoek. De hoge chedi is geïnspireerd op de Mahabodhi-tempel in Bodh Gaya en vormt een heel ander beeld dan de lage binnenstad. Ga vroeg of later voor zachter licht, draag kleding die schouders en knieën bedekt en houd gebedsruimtes vrij. Combineer de tempel met één noordelijke eet- of koffiestop, niet met een willekeurige stadsronde die dezelfde hoofdwegen meerdere keren kruist.',
      bestFor: 'Tempelarchitectuur, fotografie met respect en reizigers die een halve stadsdag logisch willen opbouwen.',
      tradeoff:
        'Niet optimaal te combineren met elke centrumwandeling te voet. Een korte taxi- of Grabrit bespaart hitte en onnodige verkeerskilometers.',
    },
    {
      slug: 'khong-chiam',
      name: 'Khong Chiam & de Mun–Mekongroute',
      kicker: 'Een andere basis, een ander tempo',
      image: '/images/redesign/ubon-ratchathani-khong-chiam.webp',
      imageAlt: 'Een kleine vissersboot op de brede Mekong bij Khong Chiam in zacht ochtendlicht',
      summary:
        'Khong Chiam ligt aan de oostelijke kant van de provincie en werkt beter als routebasis dan als snelle fotostop. Bekijk de samenvloeiing van Mun en Mekong als hydrologisch landschap, niet als een permanent fel tweekleurig spektakel; kleurverschil verandert met sediment, seizoen en licht. Voeg Wat Tham Khuha Sawan of een aantoonbaar geopende rivierstop toe en slaap hier wanneer je Pha Taem vroeg en zonder een lange stadstransfer wilt beginnen. Controleer ter plaatse waterstand, wegconditie en bootveiligheid voordat je een rivieractiviteit boekt.',
      bestFor: 'Mekong, slow travel, een vroege Pha Taem-start en reizigers die één nacht buiten Ubon-stad willen slapen.',
      tradeoff:
        'Minder keuze in stedelijke voorzieningen dan Ubon-stad. Boek geen strakke terugvlucht na een lange oostelijke autorit.',
    },
    {
      slug: 'pha-taem-sam-phan-bok',
      name: 'Pha Taem & de noordelijke Mekong',
      kicker: 'Twee landschappen, geen snelle dubbelstop',
      image: '/images/redesign/ubon-ratchathani-pha-taem.webp',
      imageAlt: 'Zandstenen richel en de Mekongvallei in Pha Taem National Park bij zonsopkomst',
      summary:
        'Pha Taem combineert een kliflandschap met prehistorische rotsschilderingen en Sao Chaliang-formaties. Kies vooraf een wandelafstand die bij hitte, conditie en parktoegang past en blijf op gemarkeerde routes. Sam Phan Bok is noordelijker en toont duizenden door water gevormde gaten wanneer de Mekong laag genoeg staat. Bij hoge rivierstand kan het beeld grotendeels verdwijnen. Maak van beide locaties daarom afzonderlijke beslissingen en vraag park, verblijf of chauffeur naar de actuele toegang in plaats van een jaarrond canyonfoto als bewijs te gebruiken.',
      bestFor: 'Landschap, geologie, archeologie en reizigers met minimaal één volle dag plus flexibel wegvervoer.',
      tradeoff:
        'De combinatie is afstands- en seizoensgevoelig. Wie Pha Taem, Sam Phan Bok en Ubon-stad in één dag propt, kijkt vooral vanuit een voertuig.',
    },
  ],
  highlights: [
    {
      eyebrow: 'Geloof, ambacht en stad',
      title: 'Plan het kaarsenfestival op het officiële programma',
      image: '/images/redesign/ubon-ratchathani-candle-festival.webp',
      imageAlt: 'Rijk gedetailleerde wassculpturen en lokale begeleiders tijdens het kaarsenfestival van Ubon Ratchathani',
      description:
        'Ubon bouwt rond Asalha Puja en het begin van de boeddhistische vastentijd indrukwekkende kaarsenwagens. Het festival is meer dan een parade: tempelgemeenschappen, beeldhouwers en dansgroepen werken aan een religieuze gift die ook de identiteit van de provincie draagt. Datum, route, avondpresentatie, tribune en wegafsluiting veranderen per editie. Reserveer pas vervoer en een kijkplek wanneer provincie of TAT de actuele programmering publiceert en behandel de wagens niet als decor waar je op klimt of tegenaan leunt.',
      decision: 'Kom voor het ambacht en de traditie; baseer je planning niet op de data van de editie van vorig jaar.',
      href: '/city/ubon-ratchathani/attractions/',
    },
    {
      eyebrow: 'Meer dan de eerste zonsopkomst',
      title: 'Lees Pha Taem van landschap naar rotsschildering',
      image: '/images/redesign/ubon-ratchathani-pha-taem.webp',
      imageAlt: 'Pha Taem-klif, droog bos en brede rivierlaag in de vroege ochtend',
      description:
        'De zonsopkomst is fotogeniek, maar het parkverhaal ligt in zandsteen, vegetatie en menselijke bewoning. Neem na het uitzicht tijd voor het officiële pad naar de schilderingen en Sao Chaliang wanneer terrein en opening dat toelaten. Draag water en zonbescherming, maar vermijd een te grote wandeling midden op een hete dag. Regen maakt rots en aarde glad; bij onweer is een open klif geen plek om te wachten op een foto.',
      decision: 'Kies één inhoudelijke route en controleer parktoegang; een zonsopkomst zonder wandeling is een ander bezoek dan Pha Taem echt lezen.',
      href: '/city/ubon-ratchathani/attractions/',
    },
    {
      eyebrow: 'De Mekong bepaalt het beeld',
      title: 'Rijd alleen naar Sam Phan Bok bij passende waterstand',
      image: '/images/redesign/ubon-ratchathani-khong-chiam.webp',
      imageAlt: 'Rustige Mekong met lage oevers en een lokale boot in de provincie Ubon Ratchathani',
      description:
        'Sam Phan Bok wordt vaak als de Grand Canyon van Thailand verkocht, maar de essentie is eenvoudiger: erosie heeft talloze gaten in de rotsbodem gevormd die bij lagere rivierstand zichtbaar worden. Vraag kort vooraf naar waterstand, toegankelijke zone, hitte en lokaal vervoer. Stap niet op natte of instabiele randen en laat een chauffeur geen fotoplek verzinnen wanneer de rivier het landschap bedekt. Zonder bevestiging is een extra dag in Khong Chiam of Ubon-stad een betere keuze.',
      decision: 'Waterstand gaat vóór kalender. Een oude droge-seizoensfoto is geen actuele toegangscontrole.',
      href: '/city/ubon-ratchathani/attractions/',
    },
  ],
  featureBanner: {
    image: '/images/redesign/ubon-ratchathani-route-banner.webp',
    imageAlt: 'Een landelijke weg door rijstvelden richting de oostelijke rotsplateaus en Mekongvallei van Ubon Ratchathani',
    eyebrow: 'Stad, tweede basis, dan pas de verre stop',
    title: 'Bouw de route op afstand, niet op een top-tien',
    description:
      'Slaap eerst in Ubon-stad voor museum, tempels en avondmarkt. Verplaats daarna naar Khong Chiam wanneer Pha Taem je hoofdreden is. Voeg Sam Phan Bok alleen toe met een extra dag en actuele waterstand. De beeldlijn is geen kaart op schaal; controleer weg, park, weer en reisadvies vlak voor vertrek.',
  },
  food: {
    image: '/images/redesign/ubon-ratchathani-food-market.webp',
    imageAlt: 'Lokale Ubon-markt met moo yor, gegrilde Isan-worst, kleefrijst en verse kruiden',
    eyebrow: 'Een stad die je ook aan de kraam leert kennen',
    title: 'Moo yor, Isan-worst en een scherpe papajasalade',
    description:
      'Ubon is een goede plek om Isan-eten zonder toeristisch proefmenu te leren lezen. Kijk eerst hoe druk een kraam bij lokale klanten is, hoe warm en koud voedsel wordt bewaard en of bereiding vers gebeurt. Vraag bij allergieën naar vissaus, gefermenteerde vis, garnalenpasta, pinda, ei en gedeelde vijzel of grill. “Niet pittig” verandert geen verborgen ingrediënt en vegetarisch betekent niet automatisch zonder vissaus.',
    dishes: [
      {
        name: 'Moo yor',
        description:
          'Een fijne varkensworst die Ubon als lokaal product promoot. Je vindt hem gestoomd, gebakken of in een frisse salade. Vraag of de versie gekoeld moet blijven wanneer je hem meeneemt en controleer de ingrediënten bij soja-, ei- of smaakversterkergevoeligheid.',
      },
      {
        name: 'Sai krok Isan',
        description:
          'Gefermenteerde varkensworst met rijst, vaak gegrild en gegeten met kool, gember en chili. Kies een kraam die de worsten volledig verhit en niet lang lauw laat liggen. De zure smaak hoort bij fermentatie, maar hygiëne blijft een aparte beoordeling.',
      },
      {
        name: 'Som tam & khao niao',
        description:
          'Papajasalade met kleefrijst is een toegankelijke marktcombinatie. De vijzel kan sporen van pinda, gedroogde garnaal, krab en gefermenteerde vis bevatten. Laat je voorkeur in het Thais bevestigen en kies bij ernstige allergie een gerecht uit een schone, aparte bereiding.',
      },
    ],
  },
  itinerary: {
    eyebrow: 'Drie nachten, drie duidelijke keuzes',
    title: 'Een eerste Ubon-route hoeft niet de hele provincie te bewijzen',
    description:
      'Gebruik dag 1 voor de stad, dag 2 voor Khong Chiam en Pha Taem en dag 3 voor een langzame keuze. Voeg Sam Phan Bok alleen toe als vierde dag of als bewust vervangend hoofdblok.',
    days: [
      {
        day: 'Dag 1',
        title: 'Museum, Thung Si Mueang en Wat Nong Bua',
        description:
          'Begin bij het nationale museum wanneer het officieel open is. Wandel daarna door de omgeving van Thung Si Mueang, eet lokaal en neem voor Wat Phra That Nong Bua een korte rit in plaats van een hete verkeerswandeling. Kom je tijdens het kaarsenfestival, laat de gepubliceerde route en wegafsluitingen de dag bepalen. Sluit af op een actieve avondmarkt en houd je eerste avond licht wanneer je de volgende ochtend vroeg vertrekt.',
        href: '/city/ubon-ratchathani/attractions/',
      },
      {
        day: 'Dag 2',
        title: 'Khong Chiam en één goede Pha Taem-route',
        description:
          'Vertrek vroeg met vooraf geregeld vervoer. Bekijk Khong Chiam en de samenvloeiing zonder een gegarandeerde tweekleurige rivier te verwachten. Ga daarna naar Pha Taem voor uitzicht en een haalbare wandelroute naar rotskunst of Sao Chaliang. Controleer parkopening, laatste toegang en weer dezelfde dag. Slaap in Khong Chiam wanneer een vroege start of ontspannen terugweg belangrijker is dan een tweede stadsavond.',
        href: '/city/ubon-ratchathani/attractions/',
      },
      {
        day: 'Dag 3',
        title: 'Langzaam terug of een bevestigde rivierstop',
        description:
          'Kies tussen extra tijd aan de Mekong, een rustige terugrit met één geopende tussenstop of een tweede stadsdag. Sam Phan Bok hoort hier alleen bij wanneer waterstand, rijtijd en vertrekplanning kloppen; vaak is een vierde nacht beter. Houd een ruime buffer voor vlucht of trein en controleer of de route langs actuele grens- of weerbeperkingen komt.',
        href: '/city/ubon-ratchathani/attractions/',
      },
    ],
  },
  planning: {
    weather: {
      title: 'Koel voor wandelen, laag water voor Sam Phan Bok',
      summary:
        'De koelere, relatief drogere maanden zijn het prettigst voor stad, klifpaden en lange autoritten. In de hete maanden loopt de gevoelstemperatuur snel op op open rots en marktstraten. De regentijd maakt de provincie groener en watervallen krachtiger, maar brengt zware buien, gladde paden en hogere rivierstanden. Het kaarsenfestival volgt de boeddhistische kalender en valt niet in het klassieke koele hoogseizoen.',
      best: 'Gebruik grofweg november tot februari voor comfortabeler wandelen. Controleer Sam Phan Bok op actuele waterstand en het kaarsenfestival op het officiële jaarprogramma, niet op een vaste evergreen datum.',
      tradeoff:
        'Droger weer kan stoffiger en drukker zijn bij populaire rivierlocaties. Groen seizoen geeft mooier bos en water, maar vraagt flexibel park- en wegprogramma.',
      href: '/city/ubon-ratchathani/best-time-to-visit/',
      image: '/images/redesign/ubon-ratchathani-pha-taem.webp',
      imageAlt: 'Pha Taem en de Mekongvallei onder helder koel-seizoenslicht',
    },
    transport: {
      title: 'Aankomen is eenvoudig; de provincie vraagt een tweede plan',
      summary:
        'Binnenlandse vluchten landen bij Ubon Ratchathani Airport aan de stadszijde. De trein uit Bangkok eindigt bij Ubon Ratchathani Station in Warin Chamrap, ten zuiden van de Mun en niet bij elke centrumaccommodatie op loopafstand. Voor Khong Chiam, Pha Taem en Sam Phan Bok heb je een chauffeur, huurauto of passende tour nodig. Vergelijk niet alleen prijs, maar ook wachttijd, terugrit, verzekering en grens van de route.',
      facts: [
        'Controleer live vluchtinformatie bij Department of Airports en treinplanning bij SRT; neem geen oude vertrektijd over.',
        'Spreek bij een chauffeur af welke stops inbegrepen zijn, hoeveel wachttijd je krijgt en waar de overnachting eindigt.',
        'Rijd je zelf, dan rijd je links. Vermijd na donker onbekende provinciale wegen en controleer dekking, rijbewijs en huurvoorwaarden.',
        'Laat een lange Mekongdag niet eindigen vlak voor een vlucht of nachttrein. Een extra stadsnacht is vaak goedkoper dan een gemiste aansluiting.',
      ],
      image: '/images/redesign/ubon-ratchathani-route-banner.webp',
      imageAlt: 'Landelijke weg van Ubon-stad richting Khong Chiam en Pha Taem',
    },
  },
  practicalTips: [
    {
      icon: 'map',
      title: 'Splits stad en provincie',
      description: 'Markeer Ubon-stad, Khong Chiam, Pha Taem en Sam Phan Bok apart. Een provincienaam is geen wandelbare bestemming.',
    },
    {
      icon: 'compass',
      title: 'Controleer grenskleuren',
      description: 'Bekijk NederlandWereldwijd vlak voor vertrek en volg lokale aanwijzingen. Rood en oranje zijn geen optionele toeristische routes.',
    },
    {
      icon: 'waves',
      title: 'Vraag naar waterstand',
      description: 'Sam Phan Bok en het rivierbeeld veranderen met de Mekong. Laat een actuele melding zwaarder wegen dan een kalendermaand.',
    },
    {
      icon: 'calendar',
      title: 'Gebruik het jaarprogramma',
      description: 'Festivaldata, parade, avondshow en afzettingen veranderen. Wacht op provincie of TAT voor de actuele editie.',
    },
  ],
  faqs: [
    {
      question: 'Wat betekent Ubon in het Thais?',
      answer:
        'Ubon is afgeleid van een woord voor lotus. De volledige naam Ubon Ratchathani wordt vaak uitgelegd als “koninklijke lotusstad”. Gebruik de betekenis als culturele context, niet als bewijs dat elke tempel, wijk of attractie met een lotusverhaal verbonden is.',
    },
    {
      question: 'Is Ubon Ratchathani veilig voor toeristen?',
      answer:
        'Ubon-stad en de gebruikelijke route richting Khong Chiam en Pha Taem vallen niet automatisch onder dezelfde risico’s als de grens met Cambodja, maar de provincie is groot. Op 9 juli 2026 gold rood binnen 5 kilometer en oranje binnen 5 tot 20 kilometer van die grens. Controleer daarom altijd de actuele kaart van NederlandWereldwijd, volg Thaise afzettingen en plan geen zuidelijke grensomweg op basis van een oude routeblog.',
    },
    {
      question: 'Ligt Ubon Ratchathani in Isan?',
      answer:
        'Ja. Ubon Ratchathani ligt in het oosten van Noordoost-Thailand, de regio die meestal Isan wordt genoemd. De stad ligt aan de Mun; verder oostelijk mondt die rivier bij Khong Chiam uit in de Mekong. De provincie grenst aan Laos en in het zuiden ook aan Cambodja.',
    },
    {
      question: 'Hoe is het klimaat in Ubon Ratchathani?',
      answer:
        'Ubon heeft een tropisch savanne- en moessonritme met een koelere droge periode, een zeer hete aanloop naar het regenseizoen en daarna maanden met zware buien. Lokale omstandigheden verschillen tussen stad, open rotsplateau en rivier. Gebruik klimaatnormalen voor de grote lijn en de Thai Meteorological Department voor de actuele verwachting.',
    },
    {
      question: 'Wat zijn de koelste maanden in Ubon Ratchathani?',
      answer:
        'December en januari behoren doorgaans tot de koelste maanden, met november en februari als aangrenzende comfortabele reismaanden. Middagen kunnen nog steeds warm en zonnig zijn. Plan open klif- en tempelbezoeken vroeg, neem water mee en beoordeel hitte op de dag zelf.',
    },
    {
      question: 'Wat is het kaarsenfestival van Ubon Ratchathani?',
      answer:
        'Het is een grote boeddhistische traditie rond Asalha Puja en het begin van Khao Phansa, de vastentijd van monniken tijdens het regenseizoen. Gemeenschappen maken rijk gedetailleerde kaarsenwagens en presenteren die in Ubon-stad. Data, route en programma verschillen per jaar; gebruik alleen de actuele aankondiging van provincie of Tourism Authority of Thailand.',
    },
  ],
  relatedGuides: [
    {
      title: 'Bezienswaardigheden Ubon Ratchathani',
      description: 'Kies stad, Pha Taem en Mekongstops op afstand, seizoen en actuele toegang.',
      href: '/city/ubon-ratchathani/attractions/',
      image: '/images/redesign/ubon-ratchathani-candle-festival.webp',
      imageAlt: 'Kaarsenkunst tijdens het festival van Ubon Ratchathani',
    },
    {
      title: 'Beste reistijd Ubon Ratchathani',
      description: 'Vergelijk koeler wandelen, groen seizoen, waterstand en festivalperiode.',
      href: '/city/ubon-ratchathani/best-time-to-visit/',
      image: '/images/redesign/ubon-ratchathani-pha-taem.webp',
      imageAlt: 'Pha Taem en Mekonglandschap in de vroege ochtend',
    },
    {
      title: 'Beste hotels Ubon Ratchathani',
      description: 'Bepaal eerst of je in de stad of dichter bij Khong Chiam wilt slapen.',
      href: '/best-hotels/ubon-ratchathani/',
      image: '/images/redesign/ubon-ratchathani-khong-chiam.webp',
      imageAlt: 'Rustige ochtend aan de Mekong bij Khong Chiam',
    },
  ],
  sources: [
    {
      title: 'Ubon Ratchathani destination',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Destinations/Provinces/ubon-ratchathani/587',
      note: 'Officiële provinciecontext voor Pha Taem, Sam Phan Bok, tempels, lokale producten en het kaarsenfestival.',
    },
    {
      title: 'Si Sa Ket–Ubon Ratchathani 3 Days',
      creator: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/si-sa-ket-ubon-ratchathani-3-days',
      note: 'Officiële routecontext voor Khong Chiam, Pha Taem, Kaeng Tana, Sam Phan Bok en de samenvloeiing van Mun en Mekong.',
    },
    {
      title: 'Ubon Ratchathani National Museum exhibition',
      creator: 'Fine Arts Department of Thailand',
      url: 'https://www.virtualmuseum.finearts.go.th/ubonratchathani/index.php/en/event.html',
      note: 'Primaire museumbron voor archeologie, lagere-Isangeschiedenis, textiel, religieuze kunst en lokale cultuur.',
    },
    {
      title: 'Ubon Ratchathani Airport flight information',
      creator: 'Department of Airports',
      url: 'https://tfic.airports.go.th/lcd/?p=TUU',
      note: 'Officiële live luchthaveninformatie; vluchttijden worden niet statisch in de gids vastgezet.',
    },
    {
      title: 'SRT timetable',
      creator: 'State Railway of Thailand',
      url: 'https://www.railway.co.th/SRTTimetable/StationList',
      note: 'Actuele officiële bron voor treinplanning naar Ubon Ratchathani; gepubliceerde tijden kunnen veranderen.',
    },
    {
      title: 'Reisadvies Thailand',
      creator: 'NederlandWereldwijd',
      url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand',
      note: 'Actuele kleurcodes en veiligheidsinformatie, in juli 2026 bijzonder relevant voor de grens met Cambodja.',
    },
  ],
};
