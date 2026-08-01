import { AlertTriangle, Bus, CalendarDays, CheckCircle2, Compass, Hotel, MapPin, MoonStar, ShieldCheck, Sun, Sunrise, Sunset, TicketCheck, Umbrella, Users, Waves } from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from "./PhuketAreaGuideTemplate";

const HERO = "/images/redesign/nai-harn-area-hero-v2.webp";

export default function NaiHarnAreaGuideNl({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, "nai-harn-owner-nl-hotels");
  const activities = withSubId(activityHref || KLOOK_GENERIC, "nai-harn-owner-nl-activities");
  const data: PhuketAreaGuideData = {
    locale: "nl",
    pageUrl: "https://go2-thailand.com/nl/phuket/nai-harn/",
    alternateUrl: "https://go2-thailand.com/phuket/nai-harn/",
    updatedAt: "2026-07-31",
    area: "Nai Harn",
    title: "Nai Harn Phuket: strand, sfeer en eerlijk advies",
    description: "Ontdek of Nai Harn Beach bij je Phuket-reis past. Vergelijk zones, Nai Harn met Kata en Rawai, seizoenen, veiligheid en actuele verblijven.",
    heroImage: HERO,
    heroAlt: "Nai Harn Beach tussen groene kapen bij warm avondlicht",
    heroEyebrow: "Een rustiger strandbasis in Zuid-Phuket",
    heroTitle: <>Nai Harn Beach.<br /><span className="text-saffron-dark">Langzamer ritme, langere routes.</span></>,
    heroSubtitle: "Kies de baai bewust, niet alleen de mooie foto.",
    heroDescription: "Nai Harn combineert strand, groen en een ontspannen zuidelijk ritme. Het past vooral wanneer stranddagen, wandelen en lokaal eten de reis dragen; voor veel ritten naar noordelijk Phuket is de ligging juist het nadeel.",
    heroPrimary: { label: "Ontdek of Nai Harn past", href: "#fit" },
    heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass }, { href: "#zones", label: "Zones", icon: MapPin },
      { href: "#beach", label: "Strand", icon: Waves }, { href: "#season", label: "Beste reistijd", icon: CalendarDays },
      { href: "#plan", label: "Plan Nai Harn", icon: TicketCheck }, { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: <>Sterke zuidelijke strandbasis.<br />Minder handig voor heel Phuket.</>,
    verdictDescription: "Nai Harn past goed bij stellen, terugkerende Phuket-reizigers en gezinnen die een rustig strandritme zoeken. Voor uitgaan, winkelen of dagelijks eilandbreed reizen zijn andere bases logischer.",
    fitCards: [
      { eyebrow: "Sterke match", title: "Rustzoekende stellen", copy: "Strand, wandelingen en ontspannen diners vullen de dag zonder druk uitgaanscentrum.", icon: Sunset },
      { eyebrow: "Sterke match", title: "Terugkerende bezoekers", copy: "Handig wanneer je Phuket al kent en doelbewust voor het zuiden kiest.", icon: CheckCircle2 },
      { eyebrow: "Voorwaardelijke match", title: "Gezinnen", copy: "Het kan goed werken met de juiste kamer, zwembad en vervoer; de zeecondities bepalen iedere dag of zwemmen verstandig is.", icon: Users },
      { eyebrow: "Kies iets anders", title: "Uitgaan of veel eilandritten", copy: "Patong biedt meer nachtleven; Kata of Karon kunnen sommige westkustroutes verkorten.", icon: MoonStar, tone: "dark" },
    ],
    editorialRule: "Verblijf in Nai Harn wanneer Zuid-Phuket je route is. Kies het niet als algemene basis voor dagelijkse ritten over het hele eiland.",
    zones: [
      { title: "Strand- en meerzijde", eyebrow: "Het makkelijkste buitenritme", copy: "Past wanneer ochtendwandelingen, de baai en snel terug naar je kamer belangrijk zijn.", check: "Controleer de echte ingang en oversteek; dichtbij op de kaart betekent niet altijd directe strandtoegang.", image: HERO, imageAlt: "De groene baai van Nai Harn in Zuid-Phuket" },
      { title: "Nai Harn-dorp", eyebrow: "Eten en dagelijks gemak", copy: "Praktisch wanneer restaurants en lokale routines zwaarder wegen dan wakker worden naast het zand.", check: "Bekijk hitte, helling en de route in het donker in plaats van alleen de hemelsbrede afstand.", image: "/images/redesign/phuket-stay-kata-karon.webp", imageAlt: "Laagbouw en groen in Zuid-Phuket" },
      { title: "Heuvels richting Rawai", eyebrow: "Uitzicht, villa's en vervoer", copy: "Kan passen bij een langer verblijf of groep met vervoer, maar maakt spontaan naar het strand lopen lastiger.", check: "Controleer ophaalplek, helling en of de accommodatie praktisch meer bij Rawai dan Nai Harn hoort.", image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "Groene heuvels langs de zuidkust van Phuket" },
    ],
    dayParts: [
      { time: "Vroege ochtend", title: "Loop vóór de hitte", copy: "Gebruik de baai en groene omgeving en lees daarna de strandvlaggen voordat je gaat zwemmen.", icon: Sunrise },
      { time: "Middag", title: "Houd je straal klein", copy: "Schaduw, zwembad en lunch dichtbij werken beter dan iedere dag een lange eilandrit.", icon: Sun },
      { time: "Late middag", title: "Strand of één uitzichtpunt", copy: "Kies één realistisch zonsondergangsplan en reken verkeer, parkeren en terugreis mee.", icon: Sunset },
      { time: "Avond", title: "Eten boven nachtleven", copy: "Verwacht rustige restaurants en regel vooraf vervoer wanneer je elders uitgebreider uit wilt gaan.", icon: MoonStar },
    ],
    beachTitle: "Beschut van vorm — niet gegarandeerd kalm.",
    beachDescription: "De groene kapen laten Nai Harn beschut lijken, maar wind, deining en muistromen veranderen de zwemveiligheid. Volg ter plekke strandwachten, borden en vlaggen; een maandregel vervangt die nooit.",
    beachChecks: [
      { title: "Lees iedere vlag", copy: "Ga niet het water in bij een rode vlag, ook niet wanneer anderen dat wel doen of de lucht helder is.", icon: AlertTriangle },
      { title: "Meer is niet de zee", copy: "Het meer hoort bij het landschap, maar is niet automatisch een bewaakte zwemplek. Volg actuele borden en toegestaan gebruik.", icon: Waves },
      { title: "Controleer bootplannen", copy: "Bekijk vertrekpunt, operator, uitrusting, verzekering en annuleringsbeleid bij slecht weer.", icon: ShieldCheck },
    ],
    seasonTitle: <>Plan het zuiden.<br />Controleer de echte week.</>,
    seasonDescription: "Brede westkustseizoenen sturen je reisstijl. Actuele TMD-verwachtingen, maritieme waarschuwingen en lokale vlaggen beslissen over de afzonderlijke strand- of bootdag.",
    seasonRows: [
      { period: "dec–feb", conditions: "Vaak een gunstiger breed venster voor droger weer en rustigere strandplanning.", planning: "De vraag kan hoog zijn. Vergelijk actuele hotelvoorwaarden en blijf het water dagelijks beoordelen.", cue: "Populaire periode", highlight: true },
      { period: "mrt–apr", conditions: "Hitte en vochtigheid maken heuvels en onbeschutte middagroutes zwaarder.", planning: "Begin vroeg en kies schaduw, water en een korte terugweg naar je kamer.", cue: "Plan voor hitte" },
      { period: "mei–okt", conditions: "Zuidwestmoesson kan regen, deining en een groter risico op sterke stroming brengen.", planning: "Houd landalternatieven achter de hand en beschouw een rode vlag als harde stop.", cue: "Flexibel kustplan", highlight: true },
      { period: "nov", conditions: "De overgang kan betere perioden afwisselen met onrustig water en weer.", planning: "Gebruik de actuele verwachting en behandel de maand niet als uniform droog.", cue: "Controleer de week" },
    ],
    spokes: [
      { title: "Hotels in Nai Harn", copy: "Vergelijk verblijven op strandroute, helling, kamertype en actuele voorwaarden.", href: "/phuket/nai-harn/hotels/", image: "/images/redesign/phuket-hotels-hero.webp", imageAlt: "Resorts aan de kust van Phuket", label: "Open de hotelgids" },
      { title: "Rawai naast de deur", copy: "Vergelijk de bewoonde waterfront- en bootbasis met het strandritme van Nai Harn.", href: "/phuket/rawai/", image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "Waterfront en kust van Zuid-Phuket", label: "Open de Rawai-gids" },
      { title: "Actuele activiteiten", copy: "Controleer ophaalplek, operator, inhoud en weersvoorwaarden voor jouw data.", href: activities, image: "/images/redesign/phuket-attractions-hero.webp", imageAlt: "Kustactiviteiten en uitzichtpunten op Phuket", label: "Bekijk actuele opties", affiliate: true },
      { title: "Bezienswaardigheden op Phuket", copy: "Plan eilandbrede plekken zonder van deze gebiedsgids een algemene Phuket-gids te maken.", href: "/city/phuket/attractions/", image: "/images/redesign/phuket-stay-kamala.webp", imageAlt: "Kust en bezienswaardigheden op Phuket", label: "Ontdek bezienswaardigheden" },
    ],
    comparisonCards: [
      { area: "Rawai", fit: "Sterker voor waterfront-eten, dagelijks lokaal leven en bootverbindingen; niet hetzelfde type zwemstrand.", href: "/phuket/rawai/", image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "Kust van Zuid-Phuket" },
      { area: "Kata", fit: "Meer compacte toeristische voorzieningen, levendigere avonden en een duidelijke seizoensgebonden surfcontext.", href: "/phuket/kata/", image: "/images/redesign/kata-area-hero-v2.webp", imageAlt: "De compacte baai van Kata Beach" },
      { area: "Karon", fit: "Een langer, ruimer westkuststrand met een bredere keuze aan resorts.", href: "/phuket/karon/", image: "/images/redesign/karon-area-hero-v2.webp", imageAlt: "Het brede strand van Karon" },
    ],
    safetyCards: [
      { title: "Zeecondities", copy: "Volg vlaggen en strandwachten; ruw water en stroming kunnen zwemmen onveilig maken.", icon: Waves },
      { title: "Wegen & uitzichtpunten", copy: "Plan de terugweg na zonsondergang en rijd alleen met geldig rijbewijs, helm en passende verzekering.", icon: Bus },
      { title: "Hitte & heuvels", copy: "Plan schaduw, water en een realistische loopafstand voor kinderen en oudere reizigers.", icon: Umbrella },
    ],
    bookingCards: [
      { title: "Hotels in Nai Harn", copy: "Vergelijk kaartpin, strandroute, recente kamerreviews, annulering en totaal voor jouw data.", href: hotels, label: "Bekijk actuele hotelprijzen", icon: Hotel, affiliate: true },
      { title: "Activiteiten in Zuid-Phuket", copy: "Controleer vertrek, ophaalplek, operator, inbegrepen onderdelen en weersbeleid.", href: activities, label: "Bekijk actuele activiteiten", icon: TicketCheck, affiliate: true },
      { title: "Vervoer op Phuket", copy: "Vergelijk actuele gelicentieerde transfer- en openbaarvervoeropties voor je echte route.", href: "https://phuketsmartbus.com/", label: "Open actuele businformatie", icon: Bus },
    ],
    faqs: [
      { question: "Is Nai Harn Beach de moeite waard?", answer: "Nai Harn is het overwegen waard voor een rustiger zuidelijk strandbezoek of langzaam verblijf. Het past minder wanneer uitgaan, winkelen of herhaalde ritten over heel Phuket je reis bepalen." },
      { question: "Wat maakt Nai Harn Beach bijzonder?", answer: "De aantrekkingskracht zit in de combinatie van een groene baai, rustiger zuidelijk decor en het buitenritme rond strand en meer. De sfeer is belangrijker dan een lange attractielijst." },
      { question: "Kun je zwemmen bij Nai Harn Beach?", answer: "Alleen wanneer de actuele omstandigheden en lokale vlaggen dat toelaten. Wind, deining en stroming veranderen; blijf uit het water bij een rode vlag en volg strandwachten." },
      { question: "Is Nai Harn Beach geschikt voor gezinnen?", answer: "Dat kan met de juiste kamer, zwembad, strandroute en vervoersplanning. Gezinsvriendelijk betekent niet dat de zee altijd veilig is; beoordeel die iedere dag opnieuw." },
      { question: "Is Nai Harn rustig?", answer: "Nai Harn heeft doorgaans een rustiger avondritme dan Patong en Kata, maar geluid verschilt per accommodatie, weg en datum. Bekijk recente, kamerspecifieke ervaringen." },
      { question: "Is Nai Harn hetzelfde als Rawai?", answer: "Nee. Nai Harn draait om een strand en groene baai; Rawai is meer een bewoond waterfront en vertrekgebied voor boten. Bij accommodaties kunnen de grenzen vervagen." },
      { question: "Nai Harn of Kata: welke is beter?", answer: "Nai Harn past bij rustigere dagen in het zuiden; Kata bij een compacter toeristisch centrum en meer avondkeuze. Kies op dagelijks ritme en vervoer, niet op een universele ranglijst." },
      { question: "Wat kun je doen in Nai Harn?", answer: "Het gebied is sterk voor strand, wandelen, lokaal eten en enkele zuidelijke uitzichtpunten. Controleer bij bredere activiteiten de echte vertrek- of ophaalplek en operator." },
    ],
    faqDescription: "Gebaseerd op vijf actuele Nederlandse SERP-sets en echte PAA-vragen van 31 juli 2026. Ontbrekende vragen zijn niet verzonnen en veranderlijke prijzen of tijden zijn niet als feit vastgezet.",
    related: [
      { title: "Complete Phuket-gids", description: "Bouw eerst de eilandroute en kies daarna bewust voor het verre zuiden.", href: "/city/phuket/", image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "De kust van Phuket" },
      { title: "Waar verblijven op Phuket?", description: "Vergelijk Nai Harn met de belangrijkste verblijfszones op het eiland.", href: "/best-hotels/phuket/", image: "/images/redesign/phuket-hotels-hero.webp", imageAlt: "Verblijfszones en resorts op Phuket" },
      { title: "Bezienswaardigheden op Phuket", description: "Plan eilandbrede plekken los van deze gebiedsgids.", href: "/city/phuket/attractions/", image: "/images/redesign/phuket-attractions-hero.webp", imageAlt: "Bezienswaardigheden en uitzichtpunten op Phuket" },
    ],
    sources: [
      { title: "Nai Harn Beach", creator: "Phuket Provincial Government", url: "https://www.phuket.go.th/eng/Beaches-Nai%20Harn%20Beach.php", note: "Primaire lokale context voor het strand." },
      { title: "Phuket", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350", note: "Officiële bestemmings- en strandvlagcontext." },
      { title: "Weer in de provincie Phuket", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/weather/province/phuket", note: "Primaire actuele weerbron." },
      { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actueel Nederlands veiligheids- en verkeerskader." },
    ],
    methodDescription: "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters, vijf actuele Nederlandse SERP/PAA-sets en primaire lokale, TAT-, TMD- en NederlandWereldwijd-bronnen. Vaste ritprijzen en -tijden, Blue Flag-claims, absolute zwemmaanden, verdrinkingsaantallen en hotelgaranties uit de oude pagina zijn verwijderd.",
    sectionCopy: {
      zonesEyebrow: "Drie manieren om Nai Harn te boeken", zonesTitle: <>Je kaartpin bepaalt<br />je dagelijkse ritme.</>, zonesDescription: "De naam Nai Harn beslaat strand, dorp en heuvelachtige randen. Controleer de echte route, niet alleen de afstand.",
      rhythmEyebrow: "Een rustige dag zonder haast", rhythmTitle: <>Laat het zuiden<br />de planning dragen.</>, rhythmDescription: "Nai Harn werkt het best wanneer je dag lokaal blijft en één zuidelijk uitstapje bewust kiest.",
      featureEyebrow: "Zwemveiligheid per dag", seasonEyebrow: "Brede seizoenen, actuele beslissing", seasonNote: "Dit zijn planningspatronen, geen zwem- of weergarantie. Controleer actuele vlaggen, waarschuwingen en operatorvoorwaarden.",
      comparisonEyebrow: "Vergelijk je dagelijks ritme", comparisonTitle: <>Nai Harn is niet<br />automatisch de beste baai.</>, comparisonDescription: "Kies de plek die bij je herhaalde dagelijkse behoefte past: strand, eten, uitgaan of vervoer.",
      safetyEyebrow: "Water, wegen en hitte", safetyTitle: <>Rustig voelt fijn.<br />Blijf wel alert.</>, safetyDescription: "De belangrijkste risico’s zijn concreet en controleerbaar: actuele zeecondities, vervoer na donker en hitte op hellende routes.",
      bookingEyebrow: "Controleer wat nu klopt", bookingTitle: <>Boek de kaartpin,<br />niet alleen de naam.</>, bookingDescription: "Controleer verblijf, activiteit en vervoer op locatie, totaalprijs, voorwaarden en bereikbaarheid voor jouw data.",
      methodTitle: "Een keuzehulp voor Nai Harn, geen strandbelofte.",
    },
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
