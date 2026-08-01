export const MONTH_SLUGS_NL = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
] as const;

export type MonthSlugNl = (typeof MONTH_SLUGS_NL)[number];

export interface ThailandMonthGuideNl {
  slug: MonthSlugNl;
  month: string;
  title: string;
  description: string;
  verdict: string;
  hero: string;
  heroAlt: string;
  season: string;
  signal: string;
  bestFor: string;
  caution: string;
  coastChoice: string;
  rhythm: string;
  event: { title: string; copy: string };
  regions: Array<{ title: string; label: string; copy: string; fit: string }>;
  choices: Array<{ title: string; copy: string; rule: string }>;
  packing: string[];
}

const sharedHero = '/images/redesign/best-time-thailand-hero-v2.webp';

export const thailandMonthGuidesNl: Record<MonthSlugNl, ThailandMonthGuideNl> = {
  january: {
    slug: 'january', month: 'januari',
    title: 'Thailand in januari: weer, regio’s en reisadvies',
    description: 'Kies tussen het koelere noorden, Bangkok en de twee zuidkusten. Met duidelijke kanttekeningen voor drukte, zeegang en regionale regen.',
    verdict: 'Sterke allround maand, maar niet overal hetzelfde droog',
    hero: sharedHero, heroAlt: 'Longtailboot aan een rustige Thaise kust als illustratie van een maandkeuze',
    season: 'Koeler seizoen in het grootste deel van Thailand', signal: 'Droger in veel regio’s',
    bestFor: 'Een eerste rondreis met stad, noorden en Andamankust',
    caution: 'De Golfkust kan nog restregen en ruwe zeedagen hebben; rond populaire data loopt beschikbaarheid sneller terug.',
    coastChoice: 'Kies de Andamankust wanneer strand en bootdagen zwaar wegen. Houd aan de Golfkust ruimte voor een gewijzigd vaarschema.',
    rhythm: 'Plan stad en tempels vroeg op de dag. Neem in het noorden een extra laag mee voor ochtend en avond.',
    event: { title: 'Nieuwjaar en Kinderdag', copy: 'Lokale programma’s en verkeersmaatregelen verschillen per jaar en plaats. Controleer de agenda van je bestemming vlak voor vertrek.' },
    regions: [
      { title: 'Noord', label: 'Koele start', copy: 'Chiang Mai en Chiang Rai zijn vaak prettig voor buitenplannen; hooggelegen gebieden kunnen ’s ochtends fris aanvoelen.', fit: 'Cultuur, wandelen en een rustig dagritme' },
      { title: 'Bangkok & centraal', label: 'Praktische stadsmaand', copy: 'De combinatie van minder regen en lagere luchtvochtigheid maakt lange stadsdagen meestal beter planbaar.', fit: 'Eerste bezoek en een Bangkok–Ayutthaya-combinatie' },
      { title: 'Zuid', label: 'Kust kiezen', copy: 'Phuket en Krabi passen vaak beter bij een strandroute dan de Golf, maar actuele wind en zee blijven leidend.', fit: 'Andamankust en flexibele bootdagen' },
    ],
    choices: [
      { title: 'Klassieke eerste reis', copy: 'Combineer Bangkok, één noordelijke basis en één zuidkust.', rule: 'Beperk het aantal hotelwissels.' },
      { title: 'Alleen strand', copy: 'Kies één kust en bouw een reservedag in voor zeecondities.', rule: 'Boek geen strakke keten van losse boten.' },
      { title: 'Rustiger reizen', copy: 'Vermijd de bekendste stranden en kies een tweede stads- of natuurbasis.', rule: 'Rust ontstaat door routing, niet door de maandnaam.' },
    ],
    packing: ['Luchtige kleding', 'Warme laag voor het noorden', 'Zonbescherming', 'Lichte regenbescherming'],
  },
  february: {
    slug: 'february', month: 'februari',
    title: 'Thailand in februari: droogte, hitte en kustkeuze',
    description: 'Februari is vaak goed planbaar, maar de hitte bouwt op en luchtkwaliteit kan in het noorden een grotere rol gaan spelen.',
    verdict: 'Goed voor een brede rondreis, met een luchtkwaliteitscheck in het noorden',
    hero: sharedHero, heroAlt: 'Thaise baai in helder seizoenslicht als illustratie van februari',
    season: 'Overgang van koel naar heet seizoen', signal: 'Veel droge dagen, oplopende warmte',
    bestFor: 'Bangkok, centraal Thailand en een kustverblijf',
    caution: 'Brand- en rookperiodes verschillen per jaar. Controleer actuele luchtkwaliteit voordat je een noordelijke wandelroute vastzet.',
    coastChoice: 'Beide kustregio’s kunnen passen. Laat eilandkeuze afhangen van actuele zeecondities, route en gewenste sfeer.',
    rhythm: 'Zet actieve onderdelen in de ochtend en maak het midden van de dag lichter zodra de temperatuur oploopt.',
    event: { title: 'Makha Bucha en Chinees Nieuwjaar', copy: 'Data verschuiven. Religieuze dagen kunnen invloed hebben op alcoholverkoop; programma’s rond Chinees Nieuwjaar verschillen per stad en jaar.' },
    regions: [
      { title: 'Noord', label: 'Check de lucht', copy: 'De temperatuur kan aantrekkelijk zijn, maar rook en fijnstof kunnen de keuze voor Chiang Mai of berggebieden veranderen.', fit: 'Alleen met actuele luchtkwaliteitscheck' },
      { title: 'Bangkok & centraal', label: 'Vroeg beginnen', copy: 'Stads- en erfgoeddagen blijven logisch, zolang je de oplopende middagwarmte niet onderschat.', fit: 'Bangkok, Ayutthaya en Kanchanaburi' },
      { title: 'Zuid', label: 'Veel keuze', copy: 'Zowel Andaman- als Golfbestemmingen kunnen werken; kies op bereikbaarheid en gewenste eilanddynamiek.', fit: 'Strand, snorkelen en een vaste eilandbasis' },
    ],
    choices: [
      { title: 'Noord plus strand', copy: 'Houd een alternatief voor het noordelijke deel achter de hand.', rule: 'Luchtkwaliteit beslist mee.' },
      { title: 'Stad plus kust', copy: 'Een eenvoudige Bangkok–kustcombinatie voorkomt onnodige transfers.', rule: 'Kies één kust.' },
      { title: 'Eilandreis', copy: 'Vergelijk veerroute en luchthaven vóór je het hotel kiest.', rule: 'De laatste transfer hoort bij de bestemming.' },
    ],
    packing: ['Ademende kleding', 'Zonbescherming', 'Herbruikbare waterfles', 'Lichte regenlaag'],
  },
  march: {
    slug: 'march', month: 'maart',
    title: 'Thailand in maart: hitte, rook en slimme routes',
    description: 'Maart kan goed werken voor de zuidkust en een compact stadsdeel. Voor Noord-Thailand is een actuele luchtkwaliteitscheck essentieel.',
    verdict: 'Kies kust en tempo zorgvuldig; zet het noorden niet blind vast',
    hero: sharedHero, heroAlt: 'Tropische Thaise kust onder warm maartlicht',
    season: 'Heet seizoen', signal: 'Droog in veel gebieden, steeds warmer',
    bestFor: 'Een kustgerichte reis met beperkte stadsdagen',
    caution: 'Warmte en luchtkwaliteit kunnen buitenplannen begrenzen. Een lagere bezetting of aanbieding is geen garantie voor prettige omstandigheden.',
    coastChoice: 'De Andamankust is vaak een logische keuze; controleer wind, golven en lokale vaarschema’s voordat je meerdere eilanden koppelt.',
    rhythm: 'Begin vroeg, plan schaduw of binnenactiviteiten midden op de dag en laat intensieve excursies niet direct op een transferdag vallen.',
    event: { title: 'Lokale sport- en tempelagenda', copy: 'Evenementen zijn geen vaste maandgarantie. Controleer officiële lokale kanalen voor datum, locatie en eventuele verkeersmaatregelen.' },
    regions: [
      { title: 'Noord', label: 'Voorwaardelijke keuze', copy: 'Rook en fijnstof kunnen uitzicht, gezondheid en buitenactiviteiten beïnvloeden.', fit: 'Alleen wanneer actuele omstandigheden passen' },
      { title: 'Bangkok & centraal', label: 'Compact houden', copy: 'De hitte maakt een vol dagprogramma zwaarder. Kies wijken slim en voorkom onnodig heen-en-weer reizen.', fit: 'Korte stadsstop met vroege starts' },
      { title: 'Zuid', label: 'Kust als hoofdroute', copy: 'Strandbestemmingen passen vaak beter bij het seizoen, maar bootactiviteiten blijven afhankelijk van zee en operator.', fit: 'Eén kust met één of twee bases' },
    ],
    choices: [
      { title: 'Kustvakantie', copy: 'Maak één badplaats of eiland je hoofdbasis.', rule: 'Minder transfers, meer bruikbare ochtenden.' },
      { title: 'Bangkok toevoegen', copy: 'Beperk de stad tot overzichtelijke buurten en gekoelde pauzes.', rule: 'Plan op wijk, niet op checklist.' },
      { title: 'Noord overwegen', copy: 'Beslis pas na een recente luchtkwaliteits- en brandcheck.', rule: 'Boek flexibel.' },
    ],
    packing: ['Zeer luchtige kleding', 'Zonbescherming', 'Waterfles', 'Eventueel goed passend fijnstofmasker'],
  },
  april: {
    slug: 'april', month: 'april',
    title: 'Thailand in april: Songkran, hitte en reisplanning',
    description: 'April draait om hoge temperaturen en Songkran. De maand werkt vooral wanneer je vervoer, waterbestendige spullen en rustmomenten vooraf slim plant.',
    verdict: 'Kies april voor Songkran, niet voor een koel en strak reisschema',
    hero: '/images/blog/thailand-in-april-songkran-worth-it-2026.webp', heroAlt: 'Feestelijk versierde tempelstraat als sfeerbeeld voor Thailand in april',
    season: 'Piek van het hete seizoen', signal: 'Zeer warm, lokaal eerste buien',
    bestFor: 'Reizigers die Songkran bewust willen meemaken',
    caution: 'Wateractiviteiten, verkeersdrukte en aangepaste opening kunnen je planning veranderen. Houd telefoon, documenten en medicatie waterdicht.',
    coastChoice: 'Kies een kustbasis met zo min mogelijk extra transfers. Hitte en feestdrukte maken een complexe eilandketen onnodig zwaar.',
    rhythm: 'Plan één hoofdmoment per dag, begin vroeg en reserveer tijd om af te koelen. Rond Songkran is een korte wandeling niet vanzelfsprekend droog.',
    event: { title: 'Songkran', copy: 'Het Thaise nieuwjaar valt jaarlijks rond 13–15 april, maar lokale programma’s kunnen langer duren. Controleer officiële locaties, veiligheidsregels en vervoersinformatie voor jouw reisjaar.' },
    regions: [
      { title: 'Noord', label: 'Feest plus hitte', copy: 'Chiang Mai is bekend om Songkran, maar luchtkwaliteit en warmte blijven een serieuze routecheck.', fit: 'Festivalreizigers met flexibele planning' },
      { title: 'Bangkok & centraal', label: 'Kies je wijk', copy: 'Vieringen verschillen sterk per buurt. Een hotel op loopafstand van je gekozen zone voorkomt lastige terugritten.', fit: 'Songkran met een vaste stadsbasis' },
      { title: 'Zuid', label: 'Afkoelen aan de kust', copy: 'Een kustverblijf kan rust geven, maar transferdagen en lokale vieringen vragen dezelfde voorbereiding.', fit: 'Eén strandbasis en weinig verplaatsingen' },
    ],
    choices: [
      { title: 'Songkran centraal', copy: 'Kies accommodatie na je feestzone, niet alleen op kamerprijs.', rule: 'Loopafstand wint van een verre deal.' },
      { title: 'Rustiger april', copy: 'Vermijd de bekendste feeststraten en kies een resort- of natuurbasis.', rule: 'Controleer ook daar lokale vieringen.' },
      { title: 'Rondreis', copy: 'Leg de langste transfer niet midden in de feestdagen.', rule: 'Bouw speling in.' },
    ],
    packing: ['Waterdichte documenthoes', 'Sneldrogende kleding', 'Zonbescherming', 'Stevige sandalen met grip'],
  },
  may: {
    slug: 'may', month: 'mei',
    title: 'Thailand in mei: eerste moessonkeuzes per regio',
    description: 'Mei is een overgangsmaand. Buien nemen toe, maar hun timing en impact verschillen sterk tussen noord, centraal en de twee zuidkusten.',
    verdict: 'Interessant voor flexibele reizigers die regio boven landelijke gemiddelden zetten',
    hero: '/images/redesign/blue-temple-rain-banner.webp', heroAlt: 'Thaise tempel en groen landschap tijdens een tropische bui',
    season: 'Overgang naar het regenseizoen', signal: 'Warme dagen en toenemende buien',
    bestFor: 'Een flexibele rondreis met binnenopties en weinig vaste bootketens',
    caution: 'De start van de moesson verschuift per jaar. Controleer kort voor vertrek weerswaarschuwingen, parkstatus en operatorbeleid.',
    coastChoice: 'De Golfkust kan logischer zijn dan de Andamankust, maar “droger” betekent niet regenvrij. Kies één kust en houd vaartijden flexibel.',
    rhythm: 'Plan buiten vroeg, bewaar musea, eten en spa voor een bui en voorkom dat elke dag van één boottocht afhangt.',
    event: { title: 'Visakha Bucha en landbouwtradities', copy: 'Data volgen kalenders en officiële aankondigingen. Houd rekening met tempeldrukte en mogelijke beperkingen op alcoholverkoop.' },
    regions: [
      { title: 'Noord', label: 'Groener landschap', copy: 'De eerste regen kan de natuur opfrissen, maar hitte, onweersbuien en gladde paden vragen aanpassing.', fit: 'Cultuur en natuur met een alternatief dagplan' },
      { title: 'Bangkok & centraal', label: 'Stad tussen buien', copy: 'Korte, stevige buien kunnen verkeer en looproutes beïnvloeden. Kies activiteiten per wijk.', fit: 'Stadsreis met binnenopties' },
      { title: 'Zuid', label: 'Golf vaak logischer', copy: 'Aan de Andamankust nemen wind en zeeonrust vaker toe; eiland- en parktoegang kan wijzigen.', fit: 'Golfbasis of één goed verbonden kustplaats' },
    ],
    choices: [
      { title: 'Groene rondreis', copy: 'Combineer stad en natuur zonder iedere nacht te wisselen.', rule: 'Reserveer een schuifdag.' },
      { title: 'Eilandkeuze', copy: 'Vergelijk Gulf en Andaman op actuele bereikbaarheid.', rule: 'Boek op route, niet op weericoon.' },
      { title: 'Budgetfocus', copy: 'Vergelijk live voorwaarden en locatie, niet alleen korting.', rule: 'Flexibiliteit is waardevoller dan een vaste lage prijs.' },
    ],
    packing: ['Lichte regenjas', 'Waterdichte tasvoering', 'Schoenen met grip', 'Ademende kleding'],
  },
  june: {
    slug: 'june', month: 'juni',
    title: 'Thailand in juni: groene seizoen zonder gokwerk',
    description: 'Juni beloont een flexibel schema. De Golf, Bangkok en het groene noorden vragen elk een andere omgang met regen, zee en dagplanning.',
    verdict: 'Goede groene-seizoenkeuze wanneer je niet op één weersgevoelige activiteit leunt',
    hero: '/images/redesign/phuket-weather-green-season.webp', heroAlt: 'Groene Thaise kust in het regenseizoen',
    season: 'Regenseizoen in veel regio’s', signal: 'Buien, groen landschap en regionale verschillen',
    bestFor: 'Langzamer reizen, cultuur, eten en natuur met reserveplan',
    caution: 'Nationale parken, boten en buitenactiviteiten kunnen lokaal wijzigen. Controleer op de dag zelf de officiële waarschuwing en operator.',
    coastChoice: 'Koh Samui en omliggende Golfbestemmingen zijn vaak logischer dan een lange Andaman-eilandroute. Ook daar blijven regen en golven mogelijk.',
    rhythm: 'Maak van de ochtend je buitenblok. Bewaar één laagdrempelige binnenoptie per basis en accepteer dat een bui je volgorde kan omdraaien.',
    event: { title: 'Lokale groene-seizoenagenda', copy: 'Festivals en parkprogramma’s verschillen per provincie en jaar. Gebruik ze als bonus, niet als onwrikbaar routeanker.' },
    regions: [
      { title: 'Noord', label: 'Groen en vochtig', copy: 'Bergen en rijstland worden groener; regen maakt sommige paden en ritten trager of minder geschikt.', fit: 'Natuur met lokale terreincheck' },
      { title: 'Bangkok & centraal', label: 'Buienbestendige stad', copy: 'Bangkok werkt wanneer je per buurt plant en vervoer niet direct na een zware bui strak vastzet.', fit: 'Eten, musea en gemengde dagen' },
      { title: 'Zuid', label: 'Golf als eerste vergelijking', copy: 'De westkust kan ruwer zijn. Kijk voor eilandhoppen naar veerbeleid en alternatieve reisdagen.', fit: 'Eén Golfbasis met flexibele dagtrips' },
    ],
    choices: [
      { title: 'Stad en eten', copy: 'Kies buurten met meerdere binnen- en buitenopties.', rule: 'Plan compact.' },
      { title: 'Groen noorden', copy: 'Stem watervallen en hikes af op terrein en lokale waarschuwingen.', rule: 'Meer water is niet automatisch veiliger.' },
      { title: 'Golfverblijf', copy: 'Neem een vaste basis en boek bootdagen pas met zicht op condities.', rule: 'Laat één dag schuiven.' },
    ],
    packing: ['Compacte regenjas', 'Drybag of tasvoering', 'Insectenwering', 'Sneldrogende schoenen'],
  },
  july: {
    slug: 'july', month: 'juli',
    title: 'Thailand in juli: zomervakantie, regen en Golfkust',
    description: 'Juli valt in het groene seizoen én in de Europese zomervakantie. Kies regio’s op weerpatroon en voorkom een route vol kwetsbare verbindingen.',
    verdict: 'Sterk voor een gezinsroute met Golfkust, mits je regenruimte inbouwt',
    hero: '/images/redesign/koh-samui-weather-green-season.webp', heroAlt: 'Groene kust van Koh Samui tijdens het zomerseizoen',
    season: 'Regenseizoen in veel van Thailand', signal: 'Regelmatige buien, niet overal de hele dag',
    bestFor: 'Gezinnen en zomervakantiereizigers met een vaste Golfbasis',
    caution: 'Schoolvakantie kan populaire familieaccommodatie vullen, terwijl weergevoelige excursies nog steeds kunnen verschuiven.',
    coastChoice: 'Vergelijk eerst Koh Samui, Koh Phangan en Koh Tao met de Andamankust. Kies daarna op transferlast, niet alleen op strandfoto.',
    rhythm: 'Plan buiten in de ochtend, houd een rust- of binnenblok achter de hand en zet geen internationale vlucht direct achter een losse veerverbinding.',
    event: { title: 'Asalha Bucha en Khao Phansa', copy: 'Boeddhistische data verschuiven. Toon respect bij tempels en controleer actuele sluiting of alcoholbeperking in plaats van vaste aannames.' },
    regions: [
      { title: 'Noord', label: 'Groen maar nat', copy: 'Landschap en watervallen kunnen aantrekkelijk zijn; modder, stroming en wegcondities bepalen wat verantwoord is.', fit: 'Langzaam natuur- en cultuurtempo' },
      { title: 'Bangkok & centraal', label: 'Gezinsvriendelijk planbaar', copy: 'Combineer één buitenblok met musea, markten of een kookactiviteit in dezelfde zone.', fit: 'Gezinnen die flexibel per dag kiezen' },
      { title: 'Zuid', label: 'Golf eerst vergelijken', copy: 'De Golf heeft vaak een gunstiger seizoensvenster dan de Andamankust, zonder garantie op kalme zee.', fit: 'Eén eilandbasis of korte Golfcombinatie' },
    ],
    choices: [
      { title: 'Met kinderen', copy: 'Kies een basis met eten, zwembad en binnenopties dichtbij.', rule: 'Een goede regendag telt mee.' },
      { title: 'Eilandhoppen', copy: 'Beperk het aantal veerverbindingen en bewaak je vluchtbuffer.', rule: 'Geen krappe laatste overstap.' },
      { title: 'Cultuurroute', copy: 'Bangkok en één noordelijke basis geven meer weersalternatieven.', rule: 'Blijf langer per plek.' },
    ],
    packing: ['Lichte regenlaag', 'Waterdichte telefoonhoes', 'Insectenwering', 'Dunne laag voor airco'],
  },
  august: {
    slug: 'august', month: 'augustus',
    title: 'Thailand in augustus: waarheen in de regentijd?',
    description: 'Augustus vraagt een regionale keuze. De Golf is vaak de eerste kustvergelijking; stad en noorden werken met een flexibel dagritme.',
    verdict: 'Goed mogelijk, maar maak bereikbaarheid en reserveplannen onderdeel van de keuze',
    hero: '/images/redesign/koh-samui-weather-hero.webp', heroAlt: 'Koh Samui als kustkeuze voor Thailand in augustus',
    season: 'Groene seizoen', signal: 'Vochtig, buien en lokaal stevige regen',
    bestFor: 'Zomervakantie met één Golfbasis en een compacte stadsstop',
    caution: 'Een gunstiger kustpatroon is geen weersgarantie. Zware buien kunnen verkeer, boten en terrein ook buiten de westkust beïnvloeden.',
    coastChoice: 'Geef Golfbestemmingen prioriteit in je vergelijking. Kijk daarna naar vlieg- en veerroute, annuleringsvoorwaarden en afstand tot de pier.',
    rhythm: 'Houd excursies verwisselbaar, kies per dag het veiligste tijdvak en maak van regen geen reden om lange afstanden door de stad te kruisen.',
    event: { title: 'Moederdag in Thailand', copy: '12 augustus is een nationale feestdag. Lokale ceremonies en aangepaste dienstverlening verschillen; controleer vervoer en opening kort vooraf.' },
    regions: [
      { title: 'Noord', label: 'Landschap voorop', copy: 'Het noorden is groen, maar terrein, rivierstand en onweersbuien maken een lokale check belangrijk.', fit: 'Natuur met ruime planning' },
      { title: 'Bangkok & centraal', label: 'Werk per wijk', copy: 'Korte looproutes met veel alternatieven maken een bui makkelijker op te vangen.', fit: 'Eten, cultuur en familieactiviteiten' },
      { title: 'Zuid', label: 'Golfbasis', copy: 'Koh Samui en omgeving zijn vaak logischer dan een lange westkustketen, mits zee en operator meewerken.', fit: 'Strand met weinig verplaatsingen' },
    ],
    choices: [
      { title: 'Eén eiland', copy: 'Kies een basis die ook zonder bootexcursie prettig is.', rule: 'De bestemming moet een regendag dragen.' },
      { title: 'Stad plus eiland', copy: 'Vlieg of reis met voldoende marge tussen losse tickets.', rule: 'Bescherm je laatste aansluiting.' },
      { title: 'Noordroute', copy: 'Laat hikes en bergwegen afhangen van lokale condities.', rule: 'Niet elke groene route is begaanbaar.' },
    ],
    packing: ['Regenjas', 'Drybag', 'Insectenwering', 'Schoenen met natte grip'],
  },
  september: {
    slug: 'september', month: 'september',
    title: 'Thailand in september: regen, rust en regioselectie',
    description: 'September is in veel gebieden nat. De maand past bij flexibele reizigers die rust waarderen en weersgevoelige kust- of natuurplannen kunnen loslaten.',
    verdict: 'Niet de makkelijkste eerste reismaand, wel bruikbaar met één stevige basis',
    hero: '/images/cities/phuket/attractions/Patong Beach in september.webp', heroAlt: 'Patong Beach in september onder wisselvallige lucht',
    season: 'Natte fase van de zuidwestmoesson', signal: 'Hogere kans op langdurige of stevige buien',
    bestFor: 'Stad, eten, wellness en langzaam reizen',
    caution: 'Overstroming, ruwe zee, parktoegang en wegcondities zijn lokale en actuele beslissingen. Baseer veiligheid nooit op een maandgemiddelde.',
    coastChoice: 'Kies een kust alleen wanneer de basis zelf genoeg biedt. Bouw geen reis die instort zodra één boot of stranddag wegvalt.',
    rhythm: 'Werk met twee dagvarianten: droog en nat. Houd extra tijd rond vervoer en blijf uit stromend water of ondergelopen routes.',
    event: { title: 'Lokale festivals en agenda’s', copy: 'Programma’s en data verschillen. Controleer lokale overheden of officiële toerismekanalen in plaats van een generieke kalender.' },
    regions: [
      { title: 'Noord', label: 'Weersafhankelijk groen', copy: 'Het landschap is vol, maar paden, rivieren en bergwegen kunnen tijdelijk minder veilig of bereikbaar zijn.', fit: 'Flexibele natuurreis zonder must-do hike' },
      { title: 'Bangkok & centraal', label: 'Sterke vaste basis', copy: 'Bangkok biedt veel alternatieven, al kunnen zware buien vervoer en laaggelegen straten tijdelijk hinderen.', fit: 'Eten, musea en langzaam stadsritme' },
      { title: 'Zuid', label: 'Geen zekere kust', copy: 'Zowel zee als regen kan de reis bepalen. Kies bereikbaarheid en lokale voorzieningen boven eilandhoppen.', fit: 'Resortbasis met flexibel annuleringsbeleid' },
    ],
    choices: [
      { title: 'Bangkokbasis', copy: 'Plan per wijk en houd vervoer na zware regen ruim.', rule: 'Niet door een ondergelopen route lopen of rijden.' },
      { title: 'Natuur', copy: 'Vraag lokaal naar terrein, stroming en sluitingen.', rule: 'Een volle waterval is geen veiligheidsbewijs.' },
      { title: 'Strand', copy: 'Kies een plek met genoeg alternatieven buiten zeeactiviteiten.', rule: 'Boek activiteiten flexibel.' },
    ],
    packing: ['Volwaardige lichte regenjas', 'Waterdichte tasvoering', 'Gripvaste schoenen', 'Reserve voor natte kleding'],
  },
  october: {
    slug: 'october', month: 'oktober',
    title: 'Thailand in oktober: overgangsmaand per kust',
    description: 'Oktober is geen landelijke aan-uitknop voor het regenseizoen. Boven-Thailand kan droger worden terwijl de zuidelijke kustpatronen uiteenlopen.',
    verdict: 'Een kansrijke overgangsmaand als je de kust niet te vroeg vastzet',
    hero: '/images/redesign/thailand-weather-coast-switch.webp', heroAlt: 'Visuele vergelijking van Thaise kustregio’s in een overgangsmaand',
    season: 'Overgang van nat naar koeler seizoen in boven-Thailand', signal: 'Afnemende regen in sommige regio’s, zuid blijft wisselend',
    bestFor: 'Bangkok, noordelijke cultuur en een laat gekozen kust',
    caution: 'Het einde van de regen verschuift per jaar en regio. Oktober aan de Golf of Andaman vraagt een afzonderlijke actuele check.',
    coastChoice: 'Vergelijk de kust opnieuw vlak voor boeken. Houd een binnenlandse route als volwaardig alternatief wanneer zeecondities ongunstig zijn.',
    rhythm: 'Plan actieve ochtenden, houd een regenvariant en gebruik een kustverblijf pas nadat je de transfer- en operatorvoorwaarden kent.',
    event: { title: 'Ok Phansa en vegetarische festivals', copy: 'Religieuze en lokale festivaldata verschuiven. In Phuket kunnen processies, wegafsluitingen en intense rituelen de praktische reisdag beïnvloeden.' },
    regions: [
      { title: 'Noord', label: 'Steeds aantrekkelijker', copy: 'Regen neemt vaak af en het landschap blijft groen, maar terrein en overgangsweer blijven lokaal.', fit: 'Cultuur en natuur met flexibele hike' },
      { title: 'Bangkok & centraal', label: 'Goede tussenmaand', copy: 'Stadsdagen worden vaak beter planbaar, zonder dat een zware bui is uitgesloten.', fit: 'Bangkok en centraal erfgoed' },
      { title: 'Zuid', label: 'Kust niet generaliseren', copy: 'Golf en Andaman kunnen tegengestelde ontwikkelingen hebben. Kies op recente informatie.', fit: 'Laat beslissers, niet vroeg vastgezette eilandketens' },
    ],
    choices: [
      { title: 'Noord en Bangkok', copy: 'Een binnenlandse route vermindert afhankelijkheid van zeecondities.', rule: 'Houd kust als verwisselbare module.' },
      { title: 'Phuketfestival', copy: 'Kies je wijk met processieroutes en bereikbaarheid in gedachten.', rule: 'Respecteer religieuze context.' },
      { title: 'Strandweek', copy: 'Vergelijk beide kusten kort voor betaling.', rule: 'Controleer actuele annuleringsregels.' },
    ],
    packing: ['Lichte regenjas', 'Ademende laagjes', 'Waterdichte tasvoering', 'Schoenen met grip'],
  },
  november: {
    slug: 'november', month: 'november',
    title: 'Thailand in november: koeler noorden, natte Golf',
    description: 'November is sterk voor Bangkok, het noorden en vaak de Andamankust. De Golf kan juist een natte fase hebben, waardoor “heel Thailand droog” misleidt.',
    verdict: 'Topmaand voor boven-Thailand; maak voor het zuiden een bewuste kustkeuze',
    hero: '/images/redesign/northern-thailand-region-hero-nl.webp', heroAlt: 'Noord-Thailand in het koelere seizoen in november',
    season: 'Koeler seizoen in boven-Thailand', signal: 'Droger noord/centraal, Golf kan nog veel regen krijgen',
    bestFor: 'Bangkok, Chiang Mai, Sukhothai en de Andamankust',
    caution: 'Loy Krathong en Yi Peng volgen de maankalender en lokale regels. De Golfkust kan in november nog met stevige regen en ruwe zee te maken hebben.',
    coastChoice: 'Kies eerder Phuket, Krabi of een andere Andamanbasis wanneer strand prioriteit heeft. Behandel Koh Samui niet als automatische novemberkeuze.',
    rhythm: 'Gebruik koelere ochtenden voor buitenplannen en leg festivalnachten niet direct voor een vroege transfer.',
    event: { title: 'Loy Krathong en Yi Peng', copy: 'Datum en programma verschillen per jaar en plaats. Boek alleen officiële evenementen en respecteer lokale regels voor vuur, lantaarns en waterwegen.' },
    regions: [
      { title: 'Noord', label: 'Sterke seizoensfit', copy: 'Koelere lucht en afnemende regen maken cultuur en natuur vaak aantrekkelijker; populaire festivaldata vragen vroege planning.', fit: 'Chiang Mai, Chiang Rai en Sukhothai' },
      { title: 'Bangkok & centraal', label: 'Allround stadsweer', copy: 'Stad, erfgoed en rivierplannen zijn vaak goed combineerbaar, met normale aandacht voor actuele buien en waterstand.', fit: 'Eerste stads- en cultuurroute' },
      { title: 'Zuid', label: 'Andaman boven Golf', copy: 'De Andamankust komt vaak in een gunstiger fase terwijl de Golf nog nat kan zijn.', fit: 'Andamankust met actuele zeecheck' },
    ],
    choices: [
      { title: 'Festivalroute', copy: 'Kies één festivalstad en laat ruimte voor lokale regels en drukte.', rule: 'Geen losgelaten lantaarn zonder officiële toestemming.' },
      { title: 'Klassieke rondreis', copy: 'Bangkok, noord en Andaman vormen een logische seizoensboog.', rule: 'Beperk lange sprongen.' },
      { title: 'Golfplannen', copy: 'Controleer regen, golven en veerbeleid opnieuw.', rule: 'Houd een alternatief achter de hand.' },
    ],
    packing: ['Laag voor koele noordelijke avonden', 'Zonbescherming', 'Lichte regenlaag', 'Nette tempelkleding'],
  },
  december: {
    slug: 'december', month: 'december',
    title: 'Thailand in december: feestdagen en kustkeuze',
    description: 'December is populair en vaak droog in noord en centraal Thailand. Aan de zuidelijke Golf kan regen langer doorlopen; plan feestdagen zonder vaste prijsclaims.',
    verdict: 'Sterke reismaand, maar beschikbaarheid en de zuidelijke Golf vragen extra aandacht',
    hero: '/images/homepageHero/railayBeach.webp', heroAlt: 'Railay Beach aan de Andamankust in het droge seizoen',
    season: 'Koeler seizoen in veel regio’s', signal: 'Vaak droog noord/centraal en Andaman; Golf wisselender',
    bestFor: 'Feestvakantie, eerste rondreis en Andamankust',
    caution: 'Kerst en jaarwisseling kunnen vervoer en accommodatie schaarser maken. Vergelijk live totaalvoorwaarden; noem geen vaste seizoensprijs.',
    coastChoice: 'De Andamankust is vaak de logischere strandkeuze. Controleer voor Golfbestemmingen actuele regen, wind en veerstatus.',
    rhythm: 'Boek hoofdverbindingen tijdig, zet vrije ruimte rond jaarwisseling en houd een warme laag voor het noordelijke ochtend- en avondritme.',
    event: { title: 'Nationale dag en jaarwisseling', copy: '5 december is een nationale dag. Kerst is geen traditionele Thaise feestdag, maar commerciële locaties organiseren vaak programma’s; jaarwisselingsmaatregelen verschillen per stad.' },
    regions: [
      { title: 'Noord', label: 'Koel en populair', copy: 'Ochtenden kunnen fris zijn, vooral buiten de stad en op hoogte. Beschikbaarheid loopt rond vakantieperiodes terug.', fit: 'Cultuur, bergen en langzame ochtenden' },
      { title: 'Bangkok & centraal', label: 'Feestelijke stadsbasis', copy: 'Veel buitenplannen zijn goed te combineren, maar evenementen en verkeersmaatregelen vragen een lokale check.', fit: 'Bangkok en centraal erfgoed' },
      { title: 'Zuid', label: 'Andaman als eerste keuze', copy: 'Phuket, Krabi en omliggende Andamanbestemmingen passen vaak beter dan de nog wisselvallige Golf.', fit: 'Strand met vooraf geregelde hoofdoverstap' },
    ],
    choices: [
      { title: 'Kerstvakantie', copy: 'Vergelijk vroeg, maar betaal pas na controle van locatie en voorwaarden.', rule: 'Live totaalprijs boven loktarief.' },
      { title: 'Noord plus strand', copy: 'Neem warme laagjes mee en kies daarna één Andamanbasis.', rule: 'Vermijd een overvolle eilandketen.' },
      { title: 'Jaarwisseling', copy: 'Verblijf op loopafstand van je gekozen zone en volg lokale veiligheidsinstructies.', rule: 'Plan de terugweg vooraf.' },
    ],
    packing: ['Warme laag voor het noorden', 'Zonbescherming', 'Nette feest- en tempelkleding', 'Lichte regenbescherming'],
  },
};

export function isMonthSlugNl(value: string): value is MonthSlugNl {
  return MONTH_SLUGS_NL.includes(value as MonthSlugNl);
}
