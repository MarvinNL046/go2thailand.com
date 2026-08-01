export interface NlNightlifeZone {
  name: string;
  label: string;
  fit: string;
  plan: string;
  tradeoff: string;
}

export interface NlNightlifeFaq {
  question: string;
  answer: string;
}

export interface NlNightlifeSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface NlCityNightlifeGuide {
  slug: "bangkok" | "chiang-mai" | "phuket";
  city: string;
  translationKey: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  heroAlt: string;
  primaryIntent: string;
  intro: string;
  decision: string;
  zones: NlNightlifeZone[];
  route: Array<{ time: string; title: string; text: string }>;
  checks: Array<{ title: string; text: string }>;
  safety: Array<{ title: string; text: string }>;
  cityLink: string;
  cityLinkLabel: string;
  foodLink: string;
  foodLinkLabel: string;
  stayLink: string;
  stayLinkLabel: string;
  klookPlacement: string;
  related: Array<{ title: string; description: string; href: string; image: string }>;
  faqs: NlNightlifeFaq[];
  sources: NlNightlifeSource[];
}

const sharedSources: NlNightlifeSource[] = [
  {
    title: "Alcohol sales and consumption rules updated in Thailand",
    creator: "Tourism Authority of Thailand · 29 mei 2026",
    url: "https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/",
    note: "Primaire bron voor het algemene verkoopvenster, de minimumleeftijd en uitzonderingen. Een venue kan aanvullende toegangsregels hanteren.",
  },
  {
    title: "Reisadvies Thailand",
    creator: "NederlandWereldwijd · gecontroleerd 31 juli 2026",
    url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
    note: "Nederlandse overheidsbron voor actuele veiligheids-, verkeers-, drugs- en noodinformatie.",
  },
  {
    title: "Tourist Police Hotline 1155",
    creator: "Thailand Tourist Police Bureau",
    url: "https://www.touristpolice.go.th/en/main",
    note: "Officiële bron voor meertalige toeristenhulp en hotline 1155.",
  },
];

export const nlCityNightlifeGuides: Record<NlCityNightlifeGuide["slug"], NlCityNightlifeGuide> = {
  bangkok: {
    slug: "bangkok",
    city: "Bangkok",
    translationKey: "nightlife-bangkok",
    title: "Nachtleven Bangkok: kies de juiste wijk en avond",
    description: "Vergelijk Khao San, Chinatown, Sukhumvit, Thonglor en RCA voor een avond uit in Bangkok. Met wijkkeuze, terugroute, regels en actuele checks.",
    eyebrow: "Eén stad, vijf totaal andere avonden",
    heroTitle: "Bangkok bij nacht. Kies eerst je wijk.",
    heroSubtitle: "Rooftop, markt, muziek of club — niet alles op één avond.",
    heroDescription: "Bangkok is te groot om op goed geluk te barhoppen. Deze gids helpt je één compacte avondzone kiezen, de actuele venuevoorwaarden controleren en je terugrit regelen voordat de drukte begint.",
    heroImage: "/images/redesign/bangkok-destination-hero.webp",
    heroAlt: "Avondlicht boven de skyline en rivier van Bangkok",
    primaryIntent: "Waar uitgaan in Bangkok zonder wijken, reistijd en avondtypes door elkaar te halen.",
    intro: "Het beste nachtleven in Bangkok hangt niet af van één clubranglijst, maar van de avond die je zoekt. Khao San is direct en luid, Chinatown draait sterker om eten en sfeer, Sukhumvit combineert bars met makkelijke ov-toegang, Thonglor vraagt meer planning en RCA is een gerichte clubkeuze. De afstanden maken één wijk per avond meestal slimmer dan een lange lijst adressen.",
    decision: "Kies een zone die ook bij je hotel en terugroute past. Een rooftop aan de rivier en een club ver buiten het spoor lijken op de kaart combineerbaar, maar verkeer, dresscode en wachttijd kunnen de avond opslokken.",
    zones: [
      { name: "Khao San & Phra Athit", label: "Sociaal en direct", fit: "Backpackerenergie, straatgeluid en een avond die zonder reservering kan beginnen.", plan: "Start met eten rond Phra Athit en loop daarna pas richting Khao San.", tradeoff: "Geen logische keuze voor een rustig gesprek of verfijnde cocktailavond." },
      { name: "Chinatown", label: "Eten voorop", fit: "Een vroege foodroute, neonstraten en één bar als rustige afsluiting.", plan: "Bouw de avond rond Yaowarat en kies vooraf een eindpunt bij MRT of hotelrit.", tradeoff: "Restaurant- en markttiming zijn belangrijker dan clubtiming." },
      { name: "Sukhumvit", label: "Veel keuze", fit: "Bars, rooftops en clubs rond meerdere BTS-haltes.", plan: "Kies één soi of één haltegebied; ‘Sukhumvit’ is geen compacte wandelwijk.", tradeoff: "Adult entertainment is in enkele zones zichtbaar en hoeft geen onderdeel van je avond te zijn." },
      { name: "Thonglor & Ekkamai", label: "Gepland en verzorgd", fit: "Cocktailbars, live muziek en venues waarvoor reservering of dresscode kan gelden.", plan: "Controleer dezelfde dag de officiële venuepagina en regel je laatste kilometer.", tradeoff: "Minder spontaan en doorgaans minder budgetgericht dan Khao San." },
      { name: "RCA", label: "Gerichte clubavond", fit: "Je wilt dansen en kiest bewust één entertainmentzone.", plan: "Controleer event, toegang, ID, dresscode en actuele eindtijd vóór vertrek.", tradeoff: "Niet handig als je vooral wilt rondwandelen of verschillende buurten wilt zien." },
    ],
    route: [
      { time: "18:00", title: "Eten in dezelfde zone", text: "Begin dicht bij je hoofdactiviteit. Zo voorkom je dat de eerste rit de avond al versnippert." },
      { time: "20:00", title: "Eén hoofdkeuze", text: "Markt, rooftop, live muziek of club. Reserveer alleen wanneer de officiële venuepagina dat ondersteunt." },
      { time: "22:30", title: "Bewust beslismoment", text: "Blijf in dezelfde zone of rond af. Wissel niet impulsief naar de andere kant van de stad." },
      { time: "Voor vertrek", title: "Terugrit opgeslagen", text: "Bewaar hotelnaam, kaartpin, ophaalpunt en een alternatief als de laatste ov-verbinding niet meer past." },
    ],
    checks: [
      { title: "Rooftopvoorwaarden", text: "Controleer reservering, dresscode, minimum spend, leeftijd en weersbeleid op de officiële pagina." },
      { title: "BTS/MRT is geen nachtbeloefte", text: "Bekijk de actuele dienstregeling en houd een ritoptie achter de hand; neem geen oude laatste-trein-tijd over." },
      { title: "Venues veranderen", text: "Gebruik recente officiële posts voor event, locatie en toegang. Een oude top-10 bewijst geen actuele opening." },
      { title: "Adult zones zijn optioneel", text: "Sukhumvit en Patpong hebben zichtbare volwassen entertainmentzones. Kies grenzen vooraf en loop door wanneer iets niet past." },
    ],
    safety: [
      { title: "Drank + rekening", text: "Laat een drankje niet onbeheerd en houd de rekening per ronde bij. Vraag prijzen vóór bestellen." },
      { title: "Verkeer", text: "Rijd na alcohol niet zelf. Kies een verlicht ophaalpunt buiten de drukste loopstroom." },
      { title: "Waardevolle spullen", text: "Neem alleen mee wat je nodig hebt en draag telefoon en portemonnee voor je lichaam in drukke straten." },
      { title: "Hulp", text: "Bel Tourist Police 1155 voor meertalige hulp; bij direct gevaar geldt 191." },
    ],
    cityLink: "/city/bangkok/", cityLinkLabel: "Bangkok compleet",
    foodLink: "/city/bangkok/food/", foodLinkLabel: "Eten in Bangkok",
    stayLink: "/best-hotels/bangkok/", stayLinkLabel: "Waar verblijven in Bangkok",
    klookPlacement: "bangkok-nightlife-evening-activities",
    related: [
      { title: "Bangkok compleet", description: "Plan wijken, vervoer en dagen rond meer dan alleen de avond.", href: "/city/bangkok/", image: "/images/redesign/bangkok-destination-hero.webp" },
      { title: "Eten in Bangkok", description: "Kies een foodzone die natuurlijk aansluit op je avondroute.", href: "/city/bangkok/food/", image: "/images/redesign/bangkok-food-yaowarat-nl.webp" },
      { title: "Hotels in Bangkok", description: "Vergelijk verblijfswijken op bereikbaarheid en dagritme.", href: "/best-hotels/bangkok/", image: "/images/redesign/stay-bangkok-rooftop.webp" },
    ],
    faqs: [
      { question: "Waar kun je het beste uitgaan in Bangkok?", answer: "Dat hangt af van je avondtype. Khao San past bij directe backpackerenergie, Chinatown bij eten en sfeer, Sukhumvit bij brede keuze, Thonglor en Ekkamai bij geplande bars en RCA bij een gerichte clubavond. Kies één zone en controleer actuele venueinformatie." },
      { question: "Is Khao San Road veilig in de avond?", answer: "Geen druk uitgaansgebied is risicoloos. Let op zakkenrollerij, houd je drankje en rekening in beeld, regel de terugweg en volg actueel reisadvies. Tourist Police is bereikbaar via 1155." },
      { question: "Hoe laat begint het nachtleven in Bangkok?", answer: "Er is geen universele starttijd. Markten en diners beginnen eerder dan clubs. Controleer de officiële opening, het event en eventuele reservering van de plek die je wilt bezoeken." },
      { question: "Kun je met BTS of MRT terug na het uitgaan?", answer: "Soms, afhankelijk van tijd, lijn en station. Controleer de actuele dienstregeling op de bezoekdag en houd altijd een veilige ritoptie achter de hand." },
      { question: "Moet je reserveren voor een rooftopbar in Bangkok?", answer: "Dat verschilt per rooftop, dag en tafeltype. Controleer de officiële venuepagina voor reservering, dresscode, weersbeleid en eventuele bestedingsvoorwaarden." },
      { question: "Wat kost uitgaan in Bangkok?", answer: "Een betrouwbaar vast avondbedrag bestaat niet. Vervoer, entree, reserveringsvoorwaarden en consumpties verschillen sterk per wijk en venue. Stel vooraf vier potjes in: heenrit, hoofdactiviteit, consumpties en terugbuffer." },
    ],
    sources: [...sharedSources, { title: "Bangkok transportinformatie", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219", note: "Officiële bestemmingscontext; actuele BTS- en MRT-tijden moeten bij de vervoerder worden gecontroleerd." }],
  },
  "chiang-mai": {
    slug: "chiang-mai", city: "Chiang Mai", translationKey: "nightlife-chiang-mai",
    title: "Nachtleven Chiang Mai: markten, muziek en Nimman",
    description: "Kies tussen Old City, Night Bazaar, Nimman en riverside voor een avond uit in Chiang Mai. Met avondroute, actuele checks, veiligheid en vervoer.",
    eyebrow: "Avondstad zonder kustclubtempo", heroTitle: "Chiang Mai bij avond. Rustiger, niet saai.",
    heroSubtitle: "Begin met markt of muziek en kies daarna één compacte zone.",
    heroDescription: "Chiang Mai past bij reizigers die eten, live muziek en sociale bars willen combineren. De stad heeft geen Bangkok-schaal; juist daarom maakt de keuze tussen Old City, Night Bazaar, Nimman en riverside veel verschil.",
    heroImage: "/images/redesign/destination-chiang-mai.webp", heroAlt: "Warme avondverlichting bij tempels en straten in Chiang Mai",
    primaryIntent: "Welke Chiang Mai-zone past bij markt, live muziek, bars of een jonge clubavond.",
    intro: "Nachtleven in Chiang Mai is verspreid over verschillende avondritmes. De Old City werkt voor een vroege wandeling en bars, de Night Bazaar voor markt en eten, Nimman voor een jonger en moderner publiek en de riverside voor diner en live muziek. Wie alles op één avond probeert te combineren, verliest tijd in ritten en mist juist het ontspannen karakter.",
    decision: "Kies eerst of je avond om eten, gesprek, live muziek of dansen draait. Controleer daarna één actuele venue of markt. Chiang Mai verandert per seizoen en event; oude sluitingstijden en lijstjes zijn geen planning.",
    zones: [
      { name: "Old City", label: "Wandelen + bars", fit: "Vroege tempelomgeving, diner en een toegankelijke baravond.", plan: "Kies één poort- of straatzone en eindig dicht bij je verblijf.", tradeoff: "Niet iedere rustige straat heeft laat vervoer of veel keuze." },
      { name: "Night Bazaar", label: "Markt + eten", fit: "Een avond die vroeg begint met winkelen, proeven en mensen kijken.", plan: "Controleer marktdag en actuele locatie voordat je vertrekt.", tradeoff: "Een marktavond is iets anders dan een clubavond." },
      { name: "Nimman", label: "Modern + sociaal", fit: "Cocktailbars, muziek en een jonger publiek rond compacte sois.", plan: "Kies een kleine loopzone en controleer venue-event en dresscode.", tradeoff: "Verkeer en drukte kunnen per weekend of evenement sterk verschillen." },
      { name: "Riverside", label: "Diner + muziek", fit: "Een geplande tafel, gesprek en live muziek als hoofdactiviteit.", plan: "Reserveer alleen via een officiële bron en leg de terugrit vast.", tradeoff: "Minder geschikt voor spontaan hoppen tussen veel zaken." },
    ],
    route: [
      { time: "17:30", title: "Markt of diner", text: "Begin vóór het late uitgaan met eten en water in dezelfde zone." },
      { time: "19:30", title: "Muziek of bar", text: "Kies één hoofdplek en controleer agenda, toegang en eventuele reservering." },
      { time: "22:00", title: "Verleng bewust", text: "Ga alleen door als vervoer, energie en groepsafspraak nog kloppen." },
      { time: "Voor vertrek", title: "Terugrit klaar", text: "Sla hotelkaart en ophaalpunt op; reken niet op een vaste songthaewprijs of beschikbaarheid." },
    ],
    checks: [
      { title: "Marktdag", text: "Walking streets en markten zijn dag- en locatiegebonden. Controleer een actuele gemeentelijke of organisatorische bron." },
      { title: "Luchtkwaliteit", text: "In het rookseizoen kan buiten zijn minder prettig of gezond zijn. Bekijk actuele metingen en pas je avond aan." },
      { title: "Venueagenda", text: "Live muziek en clubconcepten wisselen. Controleer de officiële post van dezelfde week." },
      { title: "Vervoer", text: "Spreek prijs en bestemming af of gebruik een live app; oude vaste songthaewprijzen zijn geen betrouwbare belofte." },
    ],
    safety: [
      { title: "Rijd niet na alcohol", text: "Ook korte scooterritten zijn verkeer. Kies een nuchtere chauffeur of geboekte rit." },
      { title: "Respecteer woonstraten", text: "Old City en Nimman zijn ook woongebieden. Houd geluid en gedrag passend buiten venues." },
      { title: "Groepscheck", text: "Spreek een ontmoetingspunt af en laat niemand zonder bewuste check verdwijnen." },
      { title: "Noodnummers", text: "Bewaar Tourist Police 1155 en je hotelreceptie offline; bij direct gevaar bel je 191." },
    ],
    cityLink: "/city/chiang-mai/", cityLinkLabel: "Chiang Mai compleet", foodLink: "/city/chiang-mai/food/", foodLinkLabel: "Eten in Chiang Mai", stayLink: "/best-hotels/chiang-mai/", stayLinkLabel: "Hotels in Chiang Mai", klookPlacement: "chiang-mai-nightlife-evening-activities",
    related: [
      { title: "Chiang Mai compleet", description: "Plan stad, bergen en reistempo vóór je avondkeuze.", href: "/city/chiang-mai/", image: "/images/redesign/destination-chiang-mai.webp" },
      { title: "Eten in Chiang Mai", description: "Bouw je avond rond Lanna-gerechten en een passende foodzone.", href: "/city/chiang-mai/food/", image: "/images/redesign/chiang-mai-food-lanna-table-nl.webp" },
      { title: "Hotels in Chiang Mai", description: "Vergelijk Old City, Nimman en rustige verblijfszones.", href: "/best-hotels/chiang-mai/", image: "/images/redesign/best-hotels-chiang-mai-en-hero.webp" },
    ],
    faqs: [
      { question: "Heeft Chiang Mai goed nachtleven?", answer: "Ja, vooral voor nachtmarkten, bars, live muziek en een sociale avond. Voor een enorme internationale clubscene past Bangkok of Patong waarschijnlijk beter." },
      { question: "Waar kun je uitgaan in Chiang Mai?", answer: "Old City, Night Bazaar, Nimman en riverside bieden verschillende avondtypes. Kies één zone op basis van markt, gesprek, live muziek of dansen." },
      { question: "Is Nimman leuk in de avond?", answer: "Nimman past bij moderne bars, restaurants en een jong publiek. Controleer per venue de actuele agenda, toegang en dresscode." },
      { question: "Hoe laat sluit het nachtleven in Chiang Mai?", answer: "Er is geen betrouwbare universele tijd. Vergunning, venue en datum verschillen. Controleer de officiële venuepagina en actuele lokale regels." },
      { question: "Kun je veilig met een songthaew terug?", answer: "Controleer bestemming en prijs vóór instappen en kies een verlichte opstapplek. Beschikbaarheid en tarief zijn niet gegarandeerd; houd een alternatief klaar." },
      { question: "Welke avondmarkt is het beste in Chiang Mai?", answer: "Dat hangt af van dag en doel. Sommige walking streets zijn weekgebonden, terwijl Night Bazaar een andere formule heeft. Controleer de actuele marktlocatie en dag." },
    ],
    sources: [...sharedSources, { title: "Chiang Mai destination information", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101", note: "Officiële bestemmingscontext voor de stad; venueagenda's en marktdagen blijven apart tijdgevoelig." }],
  },
  phuket: {
    slug: "phuket", city: "Phuket", translationKey: "nightlife-phuket",
    title: "Nachtleven Phuket: Patong of een rustiger kustplaats?",
    description: "Vergelijk Patong, Phuket Old Town, Kata-Karon en Kamala-Rawai voor nightlife op Phuket. Met terugvervoer, Bangla Road, regels en actuele checks.",
    eyebrow: "Het eiland kiest niet voor jou", heroTitle: "Phuket bij nacht. Patong is maar één antwoord.",
    heroSubtitle: "Kies je kustplaats vóór je hotel en je laatste rit.",
    heroDescription: "Bangla Road is de intensste uitgaanszone van Phuket, maar niet de samenvatting van het eiland. Old Town, Kata, Karon, Kamala en Rawai bieden andere combinaties van diner, markt, muziek en rust.",
    heroImage: "/images/redesign/patong-nightlife-hero-v2.webp", heroAlt: "Volwassen reizigers in een levendige avondstraat in Patong op Phuket",
    primaryIntent: "Nachtleven op Phuket vergelijken per kustplaats, met Patong als intense keuze en duidelijke alternatieven.",
    intro: "De belangrijkste beslissing voor nightlife op Phuket is waar je slaapt. Patong geeft directe toegang tot Bangla Road en clubs. Phuket Old Town past beter bij food, architectuur en een vroegere avond. Kata en Karon combineren stranddagen met restaurants en bars; Kamala en Rawai zijn doorgaans rustiger en vragen een bewustere ritplanning.",
    decision: "Boek geen verblijf aan de andere kant van het eiland alleen omdat één avond in Patong aantrekkelijk lijkt. Een heenrit is eenvoudig; laat, bij regen of piekdrukte kan de terugweg de grootste trade-off worden.",
    zones: [
      { name: "Patong & Bangla Road", label: "Maximale intensiteit", fit: "Neon, clubs, bars en zichtbaar adult entertainment in een compacte kern.", plan: "Lees de aparte Patong-nightlifegids en kies een verblijf of terugrit vóór vertrek.", tradeoff: "Luid, druk en niet representatief voor de rest van Phuket." },
      { name: "Phuket Old Town", label: "Food + cultuur", fit: "Een eerdere avond met diner, markt, cocktailbar of muziek.", plan: "Controleer marktdag en laatste rit; Old Town is geen strandzone.", tradeoff: "Minder geschikt voor een late strandclubavond." },
      { name: "Kata & Karon", label: "Strandavond", fit: "Restaurants, toegankelijke bars en een rustiger vervolg na zonsondergang.", plan: "Blijf binnen één kustplaats; heuvels en kustweg maken ‘even lopen’ niet altijd logisch.", tradeoff: "Minder clubdichtheid dan Patong." },
      { name: "Kamala & Rawai", label: "Rustiger tempo", fit: "Diner, beach bar of gesprek zonder dat een feeststraat de avond bepaalt.", plan: "Controleer event, weer en terugrit; beide plaatsen liggen niet naast elkaar.", tradeoff: "Voor een spontane late wissel naar Patong is afstand de beperkende factor." },
    ],
    route: [
      { time: "17:30", title: "Zonsondergang of diner", text: "Begin in dezelfde kustplaats waar je hoofdactiviteit ligt." },
      { time: "20:00", title: "Eén avondtype", text: "Kies markt, beach bar, live muziek, show of club — en controleer het actuele product." },
      { time: "22:30", title: "Terugrit opnieuw checken", text: "Bekijk weer, ophaalzone en live ritoptie voordat de telefoon of groep leegloopt." },
      { time: "Voor vertrek", title: "Geen scooter na alcohol", text: "Plan een nuchtere chauffeur of verblijf op loopafstand van je gekozen zone." },
    ],
    checks: [
      { title: "Eilandafstand", text: "Een kustplaatsnaam zegt weinig over reistijd. Controleer de live route en terugoptie vanaf je echte hotel." },
      { title: "Bangla Road", text: "Adult entertainment is zichtbaar maar nooit verplicht. Spreek grenzen af, vraag prijzen vooraf en loop door bij druk." },
      { title: "Weer en zeegang", text: "Een strandbar of bootactiviteit is weersafhankelijk. Zwem niet nadat je alcohol hebt gedronken." },
      { title: "Actuele venue", text: "Clubs, shows en markten kunnen rebranden, verhuizen of van dag wisselen. Controleer officiële kanalen." },
    ],
    safety: [
      { title: "Terugvervoer", text: "Leg een verlicht ophaalpunt vast en controleer kenteken en bestemming voordat je instapt." },
      { title: "Rekening", text: "Bestel alleen met zichtbare voorwaarden en houd consumpties per ronde bij." },
      { title: "Zee", text: "Combineer alcohol niet met nachtzwemmen. Volg vlaggen, personeel en actuele weerswaarschuwingen." },
      { title: "Hulp", text: "Bewaar Tourist Police 1155, hoteladres en kaartpin offline; bij direct gevaar bel je 191." },
    ],
    cityLink: "/city/phuket/", cityLinkLabel: "Phuket compleet", foodLink: "/city/phuket/food/", foodLinkLabel: "Eten op Phuket", stayLink: "/best-hotels/phuket/", stayLinkLabel: "Waar verblijven op Phuket", klookPlacement: "phuket-nightlife-evening-activities",
    related: [
      { title: "Patong nightlife", description: "Plan Bangla Road, alternatieven en terugroute op straatniveau.", href: "/phuket/patong/nightlife/", image: "/images/redesign/patong-nightlife-hero-v2.webp" },
      { title: "Phuket compleet", description: "Vergelijk kustplaatsen, vervoer en dagritme voor het hele eiland.", href: "/city/phuket/", image: "/images/redesign/phuket-destination-hero-v2.webp" },
      { title: "Hotels op Phuket", description: "Kies een verblijfszone die bij dag én avond past.", href: "/best-hotels/phuket/", image: "/images/redesign/phuket-hotels-hero.webp" },
    ],
    faqs: [
      { question: "Waar is het beste nachtleven op Phuket?", answer: "Patong heeft de grootste concentratie clubs en bars. Old Town past beter bij eten en een vroegere avond, terwijl Kata, Karon, Kamala en Rawai rustiger alternatieven bieden." },
      { question: "Is Bangla Road veilig?", answer: "Het is een druk uitgaansgebied met normale risico's zoals zakkenrollerij, onduidelijke rekeningen en verkeersdruk rond de randen. Houd drankje en rekening in beeld, leg vervoer vast en volg actueel reisadvies." },
      { question: "Is Phuket nightlife alleen in Patong?", answer: "Nee. Patong is het intensst, maar Old Town, Kata, Karon, Kamala en Rawai hebben restaurants, markten, bars en muziek met een ander tempo." },
      { question: "Kun je 's nachts van Patong naar Kata of Karon?", answer: "Er zijn ritopties, maar beschikbaarheid, prijs, verkeer en weer variëren. Controleer een live route en spreek een helder ophaalpunt af vóór je uitgaat." },
      { question: "Wat kost uitgaan op Phuket?", answer: "Er is geen betrouwbaar vast bedrag. Kustafstand, vervoer, venuecategorie, entree en consumpties verschillen. Controleer de actuele prijs bij de aanbieder en houd een terugbuffer apart." },
      { question: "Is Phuket nightlife geschikt voor stellen of gezinnen?", answer: "Dat hangt van zone en tijdstip af. Old Town, een vroeg diner, markt of vooraf gecontroleerde show kan passen; Bangla Road en adult entertainment zijn geen automatische gezinsactiviteit." },
    ],
    sources: [...sharedSources, { title: "Phuket destination information", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350", note: "Officiële bestemmingscontext; kustplaats, venue, weer en vervoer moeten voor de bezoekdag worden gecontroleerd." }],
  },
};

export function getNlCityNightlifeGuide(slug: string) {
  return nlCityNightlifeGuides[slug as NlCityNightlifeGuide["slug"]] ?? null;
}
