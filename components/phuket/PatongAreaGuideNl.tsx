import { AlertTriangle, Bus, CalendarDays, Camera, CheckCircle2, Compass, Footprints, GlassWater, Hotel, MapPin, MoonStar, ShieldCheck, Sun, Sunrise, Sunset, TicketCheck, Umbrella, Users, Waves } from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from "./PhuketAreaGuideTemplate";

const HERO = "/images/redesign/patong-area-hero-v2.webp";

export default function PatongAreaGuideNl({ hotelHref }: { hotelHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, "patong-owner-nl-hotels");
  const activities = withSubId(KLOOK_GENERIC, "patong-owner-nl-activities");
  const data: PhuketAreaGuideData = {
    locale: "nl", pageUrl: "https://go2-thailand.com/nl/phuket/patong/", alternateUrl: "https://go2-thailand.com/phuket/patong/", updatedAt: "2026-07-31", area: "Patong",
    title: "Patong Phuket: strand, zones en eerlijk advies", description: "Ontdek of Patong bij je Phuket-reis past. Vergelijk noord, centrum en heuvelrand, strandritme, veiligheid, Patong met Kata en Karon en actuele hotels.",
    heroImage: HERO, heroAlt: "Patong Bay en de compacte strandstad bij het blauwe avonduur", heroEyebrow: "De meest complete én intensieve basis van Phuket",
    heroTitle: <>Patong.<br /><span className="text-saffron-dark">Strandstad op vol volume.</span></>, heroSubtitle: "Kies het voor gemak en energie — niet voor afzondering.",
    heroDescription: "Patong combineert een stedelijk strand met Phukets grootste concentratie hotels, restaurants, winkels, tours en nachtleven. Dat maakt een korte actieve reis eenvoudig, maar kan precies verkeerd zijn voor een rustige eilandvakantie.",
    heroPrimary: { label: "Ontdek of Patong past", href: "#fit" }, heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass }, { href: "#zones", label: "Zones", icon: MapPin }, { href: "#beach", label: "Strand", icon: Waves },
      { href: "#season", label: "Beste reistijd", icon: CalendarDays }, { href: "#plan", label: "Plan Patong", icon: TicketCheck }, { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: <>Gemak eerst.<br />Rust op de tweede plaats.</>,
    verdictDescription: "Patong is de duidelijkste match wanneer je hotels, eten, winkelen, excursies en uitgaan dicht bij elkaar wilt. Het past minder wanneer een kalme strandsfeer en stille avonden de hoofdreden voor Phuket zijn.",
    fitCards: [
      { eyebrow: "Sterke match", title: "Korte, actieve eerste reis", copy: "Handig wanneer je veel diensten dichtbij wilt, meerdere excursies plant en keuze boven afzondering zet.", icon: CheckCircle2 },
      { eyebrow: "Sterke match", title: "Reis met nachtleven als doel", copy: "Centraal Patong houdt het bekendste nachtleven beloopbaar, maar de exacte hotelstraat blijft belangrijk voor slaap.", icon: MoonStar },
      { eyebrow: "Voorwaardelijke match", title: "Gezinnen die gemak zoeken", copy: "Dat kan met de juiste accommodatie en micro-locatie. Vergelijk avondroute, zwembad, kamer en geluid — niet alleen het label Patong.", icon: Users },
      { eyebrow: "Kies iets anders", title: "Rustige strandvakantie", copy: "Kata, Karon, Kamala of Bang Tao passen meestal beter wanneer rustige avonden en resorttijd prioriteit zijn.", icon: Umbrella, tone: "dark" },
    ],
    editorialRule: "Verblijf in Patong omdat de concentratie een logistiek probleem oplost. Kies het niet alleen omdat dit de bekendste naam van Phuket is.",
    zones: [
      { title: "Noord-Patong", eyebrow: "Strandtoegang met zachtere rand", copy: "Een middenweg wanneer je het Patong-aanbod wilt zonder naast de drukste avondstraten te slapen.", check: "Loop de echte route naar strand en centrum na; een korte kaartafstand kan een drukke weg of hellende zijstraat bevatten.", image: "/images/redesign/phuket-stay-patong.webp", imageAlt: "Strand en resorts in Noord-Patong" },
      { title: "Centraal Patong", eyebrow: "Maximaal gemak, maximale prikkels", copy: "Sterk voor lopen naar winkelen, eten en uitgaan. De keerzijde is verkeer en beweging die na de stranddag doorgaan.", check: "Lees recente kamerspecifieke geluidsreviews en kaart de hotelingang — niet alleen de propertypin — naar je dagelijkse plekken.", image: "/images/cities/phuket/attractions/Patong Beach in september.webp", imageAlt: "Het stedelijke strand van centraal Patong" },
      { title: "Zuid- en heuvelrand", eyebrow: "Meer afstand, meer vervoer", copy: "Sommige accommodaties winnen uitzicht of rust door afstand van het centrum, maar voegen hellingen, oversteken en ritten toe.", check: "Controleer helling, shuttle en echte ophaalplek; een Patong-adres garandeert geen beloopbaar centrum.", image: HERO, imageAlt: "Patong Bay gezien vanaf de groene heuvelrand" },
    ],
    dayParts: [
      { time: "Vroege ochtend", title: "Het strand staat voorop", copy: "Gebruik het koelere en rustigere dagdeel voor wandelen of zwemmen wanneer vlaggen en zeecondities dat toelaten.", icon: Sunrise },
      { time: "Middag", title: "Hitte verandert de route", copy: "Plan schaduw, zwembad, lunch of een binnenstop in plaats van de hele baai als dagvullend strandplan.", icon: Sun },
      { time: "Zonsondergang", title: "De boulevard loopt vol", copy: "Een goed moment voor baai, diner en mensen kijken. Reken extra tijd voor verkeer en ontmoetingspunten.", icon: Sunset },
      { time: "Na donker", title: "Centraal Patong wordt volwassener", copy: "Nachtleven is geconcentreerd, niet onvermijdelijk. Gezinnen en vroege slapers moeten straat en looproute precies beoordelen.", icon: MoonStar },
    ],
    beachTitle: "Een stedelijk strand, geen leeg-eilandfantasie.",
    beachDescription: "Patong Beach biedt strand, diensten en activiteiten naast een dichte stad. Ruimte, geluid en water verschillen per seizoen, weer en plek langs de baai. Volg strandwachten, borden en rode vlaggen in plaats van een maandbelofte.",
    beachChecks: [
      { title: "Lees de vlaggen", copy: "Een rode vlag overrulet je planning. Kies dan zwembad of landactiviteit.", icon: AlertTriangle },
      { title: "Kies je stranddeel", copy: "Loop eerst langs de baai; bootbeweging, toegang en drukte verschillen langs de kust.", icon: Footprints },
      { title: "Controleer de operator", copy: "Bekijk bij wateractiviteiten operator, verzekering, briefing, uitrusting en weersannulering.", icon: ShieldCheck },
    ],
    seasonTitle: <>Plan de kust.<br />Controleer daarna de week.</>,
    seasonDescription: "Brede seizoensbanden helpen je reis ontwerpen, maar regen, wind, deining en rode vlaggen bepalen of een specifieke strand- of bootdag verstandig is.",
    seasonRows: [
      { period: "dec–feb", conditions: "Vaak een sterker breed venster voor droger weer en rustigere westkustplanning.", planning: "De vraag kan hoog zijn. Vergelijk actuele hotelvoorwaarden en neem niet aan dat iedere zeedag gelijk is.", cue: "Populaire periode", highlight: true },
      { period: "mrt–apr", conditions: "Hitte en vochtigheid lopen op terwijl veel dagen strandplannen kunnen ondersteunen.", planning: "Loop eerder, bescherm rusttijd en controleer hitte naast regen.", cue: "Plan rond hitte" },
      { period: "mei–okt", conditions: "Zuidwestmoesson kan buien, wind, deining en sterker risico op muistromen brengen.", planning: "Houd binnen- en landalternatieven en volg actuele verwachting, waarschuwingen en vlaggen.", cue: "Flexibel kustplan", highlight: true },
      { period: "nov", conditions: "Een overgang met zowel verbeterende reeksen als onrustige perioden.", planning: "Behandel de maand datumgericht en niet als volledig droog of nat.", cue: "Controleer de week" },
    ],
    spokes: [
      { title: "Waar verblijven?", copy: "Vergelijk Patong-hotels op micro-locatie, kamer en actuele voorwaarden.", href: "/phuket/patong/hotels/", image: "/images/redesign/phuket-stay-patong.webp", imageAlt: "Hotel en zwembad dichtbij Patong", label: "Open de hotelgids" },
      { title: "Eten & markten", copy: "Kies restaurants en marktstops zonder veranderlijke menu's in de gebiedsowner vast te zetten.", href: "/phuket/patong/restaurants/", image: "/images/redesign/phuket-food-kopitiam.webp", imageAlt: "Gerechten en markteten op Phuket", label: "Open de eetgids" },
      { title: "Nachtleven", copy: "Begrijp Bangla Road en avondfit en controleer daarna actuele locaties en veiligheid.", href: "/phuket/patong/nightlife/", image: "/images/redesign/bangkok-zones-banner.webp", imageAlt: "Warme avondlichten in een uitgaansgebied", label: "Open de nightlife-gids" },
      { title: "Actuele activiteiten", copy: "Vergelijk operator, ophaalplek, fysieke eisen, inhoud en annulering.", href: activities, image: "/images/redesign/phuket-attractions-hero.webp", imageAlt: "Kust, uitzichtpunten en dagtochten op Phuket", label: "Bekijk actuele opties", affiliate: true },
    ],
    comparisonCards: [
      { area: "Kata", fit: "Meer strandgericht en vaak een sterkere vergelijking voor gezinnen en surfers.", href: "/phuket/kata/", image: "/images/redesign/phuket-stay-kata-karon.webp", imageAlt: "De kust van Kata en Karon" },
      { area: "Karon", fit: "Een langere, ruimere basis tussen Patong-energie en het kleinere centrum van Kata.", href: "/phuket/karon/", image: "/images/cities/phuket/attractions/Karon Beach.webp", imageAlt: "Het brede Karon Beach" },
      { area: "Kamala", fit: "Een rustiger westkustritme met nog redelijke toegang tot Patong.", href: "/phuket/kamala/", image: "/images/redesign/phuket-stay-kamala.webp", imageAlt: "Kamala Beach en groene heuvels" },
    ],
    safetyCards: [
      { title: "Strand & water", copy: "Volg strandwachten, borden en vlaggen. Sterke stroming en ruwe moessoncondities kunnen zwemmen onveilig maken.", icon: Waves },
      { title: "Wegen & scooters", copy: "Lopen, bus, gelicentieerde transfer of ride-hailing zijn vaak betere defaults. Rijd alleen met geldig rijbewijs, helm en verzekering.", icon: Bus },
      { title: "Avond uit", copy: "Houd drankjes bij je, plan vervoer, bescherm waardevolle spullen en vermijd afgelegen routes alleen. Gebruik actueel reisadvies.", icon: GlassWater },
    ],
    bookingCards: [
      { title: "Hotels in Patong", copy: "Vergelijk kaartpin, kamerspecifieke feedback, annulering en totaal voor jouw data.", href: hotels, label: "Bekijk actuele hotels", icon: Hotel, affiliate: true },
      { title: "Activiteiten op Phuket", copy: "Controleer ophaalzone, operator, inhoud, fysieke eisen en weersbeleid.", href: activities, label: "Bekijk actuele activiteiten", icon: Camera, affiliate: true },
      { title: "Airport- en eilandvervoer", copy: "Vergelijk actuele dienstregeling en deur-tot-deuropties en bevestig halte, bagage en overstaptijd.", href: "https://phuketsmartbus.com/", label: "Open actuele businformatie", icon: Bus },
    ],
    faqs: [
      { question: "Is Patong een leuke plek op Phuket?", answer: "Patong is nuttig wanneer gemak, restaurants, winkelen, excursies en uitgaan zwaarder wegen dan rust. Noord, centrum en heuvelrand voelen wezenlijk anders." },
      { question: "Waar staat Patong om bekend?", answer: "Patong staat bekend om het stedelijke strand, veel hotels en toeristische diensten, winkelen en Bangla Road. Nachtleven is één geconcentreerd deel van het gebied, niet de enige reden om er te zijn." },
      { question: "Is Patong een goede plek om te verblijven?", answer: "Ja voor een korte, actieve of op nachtleven gerichte reis en wanneer veel diensten dichtbij belangrijk zijn. Vergelijk een ander strandgebied voor stille avonden of een resortgerichte vakantie." },
      { question: "Kun je beter in Kata of Patong verblijven?", answer: "Patong is sterker voor uitgaan, winkelen, tourkeuze en maximaal gemak. Kata past vaker wanneer strandsfeer, surfen en een kleiner avondcentrum belangrijker zijn." },
      { question: "Is Patong Beach geschikt voor gezinnen?", answer: "Dat kan bij een goed gekozen resort of straat buiten de meest volwassen avondzone. Controleer avondroute, kamergeluid en zwembad en vergelijk ook Kata, Karon en Kamala." },
      { question: "Is het veilig om 's avonds in Patong te lopen?", answer: "Geen bestemming is gegarandeerd veilig. Bescherm spullen, vermijd geïsoleerde gebieden alleen, houd drankjes bij je en plan gelicentieerd vervoer. Beoordeel je exacte route." },
      { question: "Wat kun je doen in Patong?", answer: "Gebruik het strand wanneer de omstandigheden toelaten, verken de baai per dagdeel, kies eten of markt en voeg nachtleven alleen toe wanneer het past. Controleer bij activiteiten de echte uitvoerings- en ophaalplek." },
      { question: "Is Patong of Karon beter?", answer: "Patong past bij maximale concentratie en uitgaan; Karon bij meer ruimte en een rustiger strandritme. Kies op dagelijks patroon, niet op bekendheid." },
    ],
    faqDescription: "Gebaseerd op vijf actuele Nederlandse SERP-sets met 28 echte PAA-vragen van 31 juli 2026. Expliciete sekstoerisme-intentie en statische taxi-, bar- en hotelprijzen zijn uitgesloten.",
    related: [
      { title: "Complete Phuket-gids", description: "Bouw de eilandroute voordat je één westkustbasis kiest.", href: "/city/phuket/", image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "Kust en tropische baai op Phuket" },
      { title: "Waar verblijven op Phuket?", description: "Vergelijk hotelzones op reizigersfit en route.", href: "/best-hotels/phuket/", image: "/images/redesign/phuket-hotels-hero.webp", imageAlt: "Resortkust en hotelzones op Phuket" },
      { title: "Bezienswaardigheden op Phuket", description: "Scheid eilandbrede plekken van activiteiten die werkelijk in Patong liggen.", href: "/city/phuket/attractions/", image: "/images/redesign/phuket-attractions-hero.webp", imageAlt: "Kust, uitzichtpunten en bezienswaardigheden" },
    ],
    sources: [
      { title: "Phuket", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350", note: "Officiële context en strandvlagadvies." },
      { title: "Weer in de provincie Phuket", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/weather/province/phuket", note: "Primaire actuele weerbron." },
      { title: "Routes, dienstregeling en live tracking", creator: "Phuket Smart Bus", url: "https://phuketsmartbus.com/", note: "Actuele operatorinformatie over vervoer." },
      { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actueel Nederlands veiligheids- en verkeerskader." },
    ],
    methodDescription: "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters (511 keywordrecords), 100 concurrentdomeinen, vijf actuele Nederlandse SERP-sets met 28 echte PAA-vragen en primaire TAT-, TMD-, operator- en NederlandWereldwijd-bronnen. Hotel-, nightlife- en restaurantdiepte blijven bij hun spokes. Vaste prijzen, ritduren, scams als universaliteit, dodentallen, sirenetijden, weersgaranties, sekstoerisme-intentie en hotelvoorzieningsclaims uit de legacycopy zijn verwijderd.",
    sectionCopy: {
      zonesEyebrow: "Drie micro-locaties", zonesTitle: <>Patong verandert<br />per hotelstraat.</>, zonesDescription: "Noord, centrum en heuvelrand ruilen strandtoegang, avondgemak, geluid en vervoer anders tegen elkaar in.",
      rhythmEyebrow: "Eén baai, vier volumes", rhythmTitle: <>Gebruik Patong vroeg.<br />Kies de avond bewust.</>, rhythmDescription: "De ochtend toont het strand; na donker bepaalt je straat of de energie voordeel of nadeel is.",
      featureEyebrow: "Stedelijk strand zonder garantie", seasonEyebrow: "Brede seizoenen, actuele beslissing", seasonNote: "Dit zijn patronen, geen zwem- of weerbelofte. Volg actuele TMD-informatie, vlaggen en operatorvoorwaarden.",
      comparisonEyebrow: "Kies je dagelijkse intensiteit", comparisonTitle: <>Meer concentratie of<br />meer strandruimte?</>, comparisonDescription: "Vergelijk Patong met Kata, Karon en Kamala op wat je iedere dag wilt herhalen.",
      safetyEyebrow: "Water, verkeer en avond", safetyTitle: <>Veel mensen dichtbij.<br />Blijf toch scherp.</>, safetyDescription: "Strandvlaggen, vervoer, spullen, drankjes en de route terug zijn concrete controles.",
      bookingEyebrow: "Controleer wat nu klopt", bookingTitle: <>Boek de hotelstraat,<br />niet alleen Patong.</>, bookingDescription: "Controleer kaartpin, kamer, avondroute, voorwaarden, ophaalplek en totaal voor jouw data.", methodTitle: "Een gebiedskeuze voor Patong, geen nightlife-lijst.",
    },
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
