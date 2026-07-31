import { Anchor, Bus, CalendarDays, CheckCircle2, Compass, Hotel, MapPin, MoonStar, ShieldCheck, Sun, Sunrise, Sunset, TicketCheck, Users, Waves } from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from "./PhuketAreaGuideTemplate";

const HERO = "/images/redesign/rawai-area-hero-v2.webp";

export default function RawaiAreaGuideNl({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, "rawai-owner-nl-hotels");
  const activities = withSubId(activityHref || KLOOK_GENERIC, "rawai-owner-nl-activities");
  const data: PhuketAreaGuideData = {
    locale: "nl",
    pageUrl: "https://go2-thailand.com/nl/phuket/rawai/",
    alternateUrl: "https://go2-thailand.com/phuket/rawai/",
    updatedAt: "2026-07-31",
    area: "Rawai",
    title: "Rawai Phuket: waterfront, verblijf en eerlijk advies",
    description: "Ontdek of Rawai bij je Phuket-reis past. Vergelijk waterfront, woonzones, Rawai met Nai Harn, bootplanning, eten, veiligheid en actuele verblijven.",
    heroImage: HERO,
    heroAlt: "Waterfront van Rawai met longtailboten, pier en lokale restaurants bij warm avondlicht",
    heroEyebrow: "Het bewoonde waterfront van Zuid-Phuket",
    heroTitle: <>Rawai.<br /><span className="text-saffron-dark">Leven aan het water, geen zwemstrand.</span></>,
    heroSubtitle: "Kies het voor eten, boten en een zuidelijk ritme.",
    heroDescription: "Rawai is een werkend waterfront, woongebied en vertrekpunt voor boten — niet het klassieke zand-en-zwemstrand van Phuket. Het past bij een langzamer verblijf wanneer je begrijpt dat Nai Harn de nabijgelegen vergelijking voor zwemmen is.",
    heroPrimary: { label: "Ontdek of Rawai past", href: "#fit" },
    heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass }, { href: "#zones", label: "Zones", icon: MapPin },
      { href: "#beach", label: "Waterfront", icon: Anchor }, { href: "#season", label: "Beste reistijd", icon: CalendarDays },
      { href: "#plan", label: "Plan Rawai", icon: TicketCheck }, { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: <>Een sterke zuidelijke basis.<br />Geen vervanging voor een resortstrand.</>,
    verdictDescription: "Rawai past bij langere verblijven, avonden rond seafood, bootplanning en reizigers die vervoer willen gebruiken. Het past minder wanneer je iedere dag vanuit je hotel een gemakkelijk zwemstrand op wilt lopen.",
    fitCards: [
      { eyebrow: "Sterke match", title: "Langer en langzamer verblijven", copy: "Handig wanneer winkels, cafés, restaurants en dagelijks lokaal ritme belangrijker zijn dan een resortstrip.", icon: CheckCircle2 },
      { eyebrow: "Sterke match", title: "Eten en bootdagen", copy: "Het waterfront kan seafood en actuele eilandvertrekken dragen nadat je operator en weersvoorwaarden controleert.", icon: Anchor },
      { eyebrow: "Voorwaardelijke match", title: "Gezinnen met vervoer", copy: "Het kan werken met zwembad, passende kamer en geplande ritten naar zwemstranden; strand aan de deur is niet vanzelfsprekend.", icon: Users },
      { eyebrow: "Kies iets anders", title: "Klassiek strand of nachtleven", copy: "Kies Nai Harn voor een nabijgelegen zwemstrandbasis of Patong voor geconcentreerd nachtleven.", icon: MoonStar, tone: "dark" },
    ],
    editorialRule: "Boek Rawai voor het zuidelijke waterfrontleven. Wanneer ‘strand’ dagelijkse zand- en zwemtoegang betekent, vergelijk dan eerst Nai Harn.",
    zones: [
      { title: "Waterfront & pier", eyebrow: "Boten, seafood en beweging", copy: "Sterk wanneer de werkende kust en avondsfeer voordelen zijn, geen compromissen.", check: "Controleer vertrekpunt, getij, weer, terugkeer en operator; het waterfront is geen standaard zwemstrand.", image: HERO, imageAlt: "Waterfront van Rawai met longtailboten en pier" },
      { title: "Woongebied landinwaarts", eyebrow: "Dagelijks gemak", copy: "Kan passen bij langere verblijven en ruimere villa's, waarbij vervoer onderdeel van je routine wordt.", check: "Breng winkels, avondroute, waterafvoer en ophaaltoegang rond de exacte accommodatie in kaart.", image: "/images/redesign/phuket-stay-bang-tao.webp", imageAlt: "Groene laagbouw in een woongebied op Phuket" },
      { title: "Rand richting Nai Harn", eyebrow: "Rawai-adres, strandgericht plan", copy: "Sommige accommodaties liggen tussen beide gebieden en maken het zwemstrand praktischer dan de Rawai-kust.", check: "Beoordeel de echte route en helling; accommodatielabels vervagen de grens tussen Rawai en Nai Harn.", image: "/images/redesign/nai-harn-area-hero-v2.webp", imageAlt: "Nai Harn Beach dichtbij Rawai" },
    ],
    dayParts: [
      { time: "Vroege ochtend", title: "Bekijk de werkende kust", copy: "Loop langs het waterfront terwijl boten, getij en dagelijkse routines tonen hoe het gebied functioneert.", icon: Sunrise },
      { time: "Middag", title: "Kies zwembad, café of strandrit", copy: "Dwing de Rawai-kust niet in een zwemplan; ga bewust naar een geschikt strand wanneer de omstandigheden dat toelaten.", icon: Sun },
      { time: "Late middag", title: "Keer terug voor eten", copy: "Gebruik de sfeer aan het water en controleer prijs en bereidingskosten voordat je seafood bestelt.", icon: Sunset },
      { time: "Avond", title: "Lokaal ritme boven clubcircuit", copy: "Rawai heeft restaurants en bars zonder de concentratie van Patong; plan laat vervoer vooraf.", icon: MoonStar },
    ],
    beachTitle: "Een werkend waterfront, geen standaard zwemstrand.",
    beachDescription: "De ondiepe, door boten gebruikte kust van Rawai heeft een andere functie dan Nai Harn of Kata. Getij, meerlijnen, bootverkeer en bodem maken spontaan zwemmen geen goed uitgangspunt. Gebruik een erkend zwemstrand en volg daar vlaggen en strandwachten.",
    beachChecks: [
      { title: "Scheid kust van zwemstrand", copy: "Neem niet aan dat ‘Rawai Beach’ in een accommodatievermelding een conventioneel zwemstrand betekent.", icon: Waves },
      { title: "Controleer getij en vertrek", copy: "Boottoegang en ontmoetingspunten kunnen veranderen door getij, weer en instructies van de operator.", icon: Anchor },
      { title: "Controleer de operator", copy: "Bevestig boot, reddingsvesten, verzekering, inbegrepen onderdelen, terugkeer en annulering.", icon: ShieldCheck },
    ],
    seasonTitle: <>Plan boten en wegen.<br />Controleer de echte dag.</>,
    seasonDescription: "Rawai kan als woon- en eetbasis het hele jaar functioneren, maar regen, wind en zeecondities bepalen nog altijd bootvertrekken en zwemmen elders.",
    seasonRows: [
      { period: "dec–feb", conditions: "Vaak een sterker breed venster voor droger weer en maritieme planning.", planning: "De vraag kan stijgen. Vergelijk actuele voorwaarden en bevestig ieder vertrek kort voor de datum.", cue: "Populaire periode", highlight: true },
      { period: "mrt–apr", conditions: "Hitte en vochtigheid maken onbeschutte waterfront- en wegroutes vermoeiender.", planning: "Begin vroeger, zoek schaduw en houd middagroutes kort.", cue: "Plan voor hitte" },
      { period: "mei–okt", conditions: "Moessonpatronen kunnen regen, wind en veranderlijke zeecondities brengen.", planning: "Houd landalternatieven klaar en accepteer weersannuleringen of routewijzigingen.", cue: "Flexibel bootplan", highlight: true },
      { period: "nov", conditions: "De overgang kan betere perioden en onrustige zeedagen combineren.", planning: "Gebruik actuele TMD- en operatorupdates in plaats van een vaste maandbelofte.", cue: "Controleer de week" },
    ],
    spokes: [
      { title: "Nai Harn naast de deur", copy: "Vergelijk het werkende waterfront van Rawai met een rustigere zwemstrandbasis.", href: "/phuket/nai-harn/", image: "/images/redesign/nai-harn-area-hero-v2.webp", imageAlt: "De groene baai van Nai Harn", label: "Open de Nai Harn-gids" },
      { title: "Waar verblijven op Phuket?", copy: "Vergelijk Rawai met alle belangrijke zones voordat je voor het verre zuiden kiest.", href: "/best-hotels/phuket/", image: "/images/redesign/phuket-hotels-hero.webp", imageAlt: "Hotels en verblijfszones op Phuket", label: "Vergelijk alle gebieden" },
      { title: "Actuele activiteiten", copy: "Controleer echt vertrekpunt, operator, boot, inbegrepen onderdelen en weersvoorwaarden.", href: activities, image: "/images/redesign/phuket-attractions-hero.webp", imageAlt: "Kustactiviteiten en uitzichtpunten op Phuket", label: "Bekijk actuele opties", affiliate: true },
      { title: "Bezienswaardigheden op Phuket", copy: "Plan eilandbrede plekken zonder ze in de Rawai-owner te proppen.", href: "/city/phuket/attractions/", image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "Kust en bezienswaardigheden op Phuket", label: "Ontdek bezienswaardigheden" },
    ],
    comparisonCards: [
      { area: "Nai Harn", fit: "De nabijgelegen keuze wanneer een rustig zwemstrandritme je prioriteit is.", href: "/phuket/nai-harn/", image: "/images/redesign/nai-harn-area-hero-v2.webp", imageAlt: "Nai Harn Beach" },
      { area: "Kata", fit: "Meer compacte toeristische voorzieningen, zand-en-zwemfocus en een duidelijke seizoensgebonden surfcontext.", href: "/phuket/kata/", image: "/images/redesign/kata-area-hero-v2.webp", imageAlt: "De baai van Kata Beach" },
      { area: "Karon", fit: "Een langer westkuststrand met meer conventionele resorts en strandvakantie-fit.", href: "/phuket/karon/", image: "/images/redesign/karon-area-hero-v2.webp", imageAlt: "Het brede strand van Karon" },
    ],
    safetyCards: [
      { title: "Boten & water", copy: "Gebruik gecontroleerde operators, draag de verstrekte veiligheidsuitrusting en volg weer- en zee-instructies.", icon: Anchor },
      { title: "Wegen & scooters", copy: "Rijd alleen met correct rijbewijs, helm en verzekering en plan vervoer na diner of zonsondergang.", icon: Bus },
      { title: "Markten & cultuur", copy: "Vraag toestemming voor foto's van mensen, maak gemeenschapsleven niet exotisch en bevestig prijzen voor aankoop.", icon: ShieldCheck },
    ],
    bookingCards: [
      { title: "Hotels in Rawai", copy: "Vergelijk kaartpin, zwembad, looproute, recente feedback, annulering en totaal voor jouw data.", href: hotels, label: "Bekijk actuele hotelprijzen", icon: Hotel, affiliate: true },
      { title: "Activiteiten in Zuid-Phuket", copy: "Controleer vertrekpunt, operator, boot, inbegrepen onderdelen en weersbeleid.", href: activities, label: "Bekijk actuele activiteiten", icon: TicketCheck, affiliate: true },
      { title: "Vervoer op Phuket", copy: "Vergelijk actuele gelicentieerde transfers en openbaar vervoer voor je echte route.", href: "https://phuketsmartbus.com/", label: "Open actuele businformatie", icon: Bus },
    ],
    faqs: [
      { question: "Hoe is Rawai op Phuket?", answer: "Rawai is een bewoond zuidelijk gebied met werkend waterfront, restaurants, woningen en bootactiviteit. Het voelt anders dan de conventionele resortstranden aan de westkust." },
      { question: "Is Rawai de moeite waard?", answer: "Rawai is het overwegen waard voor eten aan het water, lokale routines en gecontroleerde bootplannen. Het is minder sterk wanneer je reis afhangt van een klassiek zwemstrand aan de deur." },
      { question: "Is Rawai een goede plek om te verblijven?", answer: "Ja voor langere, langzamere of op eten en boten gerichte verblijven met een vervoersplan. Vergelijk Nai Harn wanneer eenvoudig naar een zwemstrand lopen belangrijker is." },
      { question: "Kun je zwemmen bij Rawai Beach?", answer: "Het waterfront van Rawai is geen verstandig standaard zwemstrand omdat het ondiep en actief door boten gebruikt wordt. Kies een erkend zwemstrand en volg daar vlaggen en strandwachten." },
      { question: "Wat is het verschil tussen Rawai en Nai Harn?", answer: "Rawai is een werkend waterfront en woon-/bootbasis. Nai Harn draait om een zwemstrand en groene baai. Accommodatielabels kunnen de grens tussen beide vervagen." },
      { question: "Is Rawai geschikt voor gezinnen?", answer: "Dat kan met een passend zwembad, kamer en vervoersplan, vooral bij langer verblijf. Gezinnen die directe zand- en zwemtoegang verwachten kunnen beter ook Nai Harn, Kata of Karon vergelijken." },
      { question: "Heeft Rawai nachtleven?", answer: "Rawai heeft restaurants en bars, maar geen geconcentreerd laat uitgaansgebied zoals Patong. Controleer actuele locaties en plan vervoer terug." },
      { question: "Is Rawai Seafood Market de moeite waard?", answer: "Het kan een leuke eetstop zijn wanneer je actuele seafoodprijs, bereidingskosten en totaal bevestigt vóór je bestelt. Aanbod en prijzen veranderen, dus vaste menuclaims zijn onbetrouwbaar." },
    ],
    faqDescription: "Gebaseerd op vijf actuele Nederlandse SERP-sets met 29 echte PAA-vragen van 31 juli 2026. Statische seafoodprijzen, taxitarieven en onbewezen culturele aantallen zijn uitgesloten.",
    related: [
      { title: "Complete Phuket-gids", description: "Bouw eerst de eilandroute voordat je voor het verre zuiden kiest.", href: "/city/phuket/", image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "De kust van Phuket" },
      { title: "Waar verblijven op Phuket?", description: "Vergelijk Rawai met de belangrijkste hotelzones van het eiland.", href: "/best-hotels/phuket/", image: "/images/redesign/phuket-hotels-hero.webp", imageAlt: "Verblijfszones op Phuket" },
      { title: "Bezienswaardigheden op Phuket", description: "Plan eilandbrede plekken los van deze gebiedsowner.", href: "/city/phuket/attractions/", image: "/images/redesign/phuket-attractions-hero.webp", imageAlt: "Bezienswaardigheden op Phuket" },
    ],
    sources: [
      { title: "Phuket", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350", note: "Officiële bestemmings- en strandvlagcontext." },
      { title: "Weer in de provincie Phuket", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/weather/province/phuket", note: "Primaire actuele weerbron." },
      { title: "Routes, dienstregeling en live tracking", creator: "Phuket Smart Bus", url: "https://phuketsmartbus.com/", note: "Actuele vervoersinformatie van de operator." },
      { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actueel Nederlands veiligheids- en verkeerskader." },
    ],
    methodDescription: "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters (155 keywordrecords en 50 concurrentdomeinen), vijf actuele Nederlandse SERP-sets met 29 echte PAA-vragen en primaire TAT-, TMD-, operator- en NederlandWereldwijd-bronnen. Vaste tarieven, ritduren, prijzen, marktfees, culturele bevolkings-/oorsprongsclaims, expatsuperlatieven, hotelprijzen en onveilig vervoersadvies uit de legacycopy zijn verwijderd.",
    sectionCopy: {
      zonesEyebrow: "Drie manieren om Rawai te gebruiken", zonesTitle: <>Je kaartpin bepaalt<br />of Rawai praktisch is.</>, zonesDescription: "Waterfront, woongebied en de rand richting Nai Harn leveren verschillende dagelijkse routes op.",
      rhythmEyebrow: "Eén waterfront, vier momenten", rhythmTitle: <>Laat Rawai werken<br />zoals Rawai werkt.</>, rhythmDescription: "De kust is sterker als werkend waterfront en eetplek dan als geforceerd zwemstrand.",
      featureEyebrow: "Kustgebruik zonder strandbelofte", seasonEyebrow: "Plan rond zee en weer", seasonNote: "Dit zijn brede planningspatronen, geen vertrek- of weergarantie. Controleer TMD, operator en lokale veiligheidsinstructies.",
      comparisonEyebrow: "Kies je dagelijkse behoefte", comparisonTitle: <>Waterfront of zwemstrand?<br />Dat is de echte keuze.</>, comparisonDescription: "Vergelijk niet alleen sfeerfoto's, maar de activiteit die je iedere dag wilt herhalen.",
      safetyEyebrow: "Boten, wegen en respect", safetyTitle: <>Rustig gebied.<br />Concrete controles.</>, safetyDescription: "De belangrijkste aandachtspunten zijn operatorveiligheid, vervoer na donker en respectvol gedrag rond werk en gemeenschappen.",
      bookingEyebrow: "Controleer wat nu klopt", bookingTitle: <>Boek je echte route,<br />niet alleen ‘Rawai’.</>, bookingDescription: "Controleer kaartpin, vervoer, voorwaarden, totaalprijs en het echte vertrekpunt voor jouw data.",
      methodTitle: "Een keuzehulp voor Rawai, geen vissersdorp-cliché.",
    },
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
