import { AlertTriangle, Bus, CalendarDays, Compass, Footprints, Hotel, MapPin, MoonStar, ShieldCheck, Sun, Sunrise, Sunset, TicketCheck, Umbrella, Users, Waves } from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from "./PhuketAreaGuideTemplate";

const HERO = "/images/redesign/karon-area-hero-v2.webp";

export default function KaronAreaGuideNl({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, "karon-owner-nl-hotels");
  const activities = withSubId(activityHref || KLOOK_GENERIC, "karon-owner-nl-activities");
  const data: PhuketAreaGuideData = {
    locale: "nl", pageUrl: "https://go2-thailand.com/nl/phuket/karon/", alternateUrl: "https://go2-thailand.com/phuket/karon/", updatedAt: "2026-07-31", area: "Karon",
    title: "Karon Beach Phuket: strand, zones en eerlijk advies",
    description: "Ontdek of Karon Beach bij je Phuket-reis past. Vergelijk zones, strandritme, Karon met Kata en Patong, seizoenen, veiligheid en actuele verblijven.",
    heroImage: HERO, heroAlt: "Het brede Karon Beach met groene kaap en wandelaars bij warm avondlicht", heroEyebrow: "De ruimere strandbasis aan de westkust",
    heroTitle: <>Karon Beach.<br /><span className="text-saffron-dark">Ruimte om te vertragen.</span></>, heroSubtitle: "Een lang strand met een andere keuze aan ieder uiteinde.",
    heroDescription: "Karon voelt ruimer dan Patong en meer uitgespreid dan Kata. Daardoor bepaalt niet alleen de naam Karon, maar vooral de exacte hotelpin of je dagen gemakkelijk of vervoersafhankelijk worden.",
    heroPrimary: { label: "Ontdek of Karon past", href: "#fit" }, heroAffiliate: { label: "Bekijk actuele hotels", href: hotels },
    navItems: [
      { href: "#fit", label: "Voor wie?", icon: Compass }, { href: "#zones", label: "Zones", icon: MapPin }, { href: "#beach", label: "Strand", icon: Waves },
      { href: "#season", label: "Beste reistijd", icon: CalendarDays }, { href: "#plan", label: "Plan Karon", icon: TicketCheck }, { href: "#safety", label: "Veiligheid", icon: ShieldCheck },
    ],
    verdictTitle: <>Ruimte is het voordeel.<br />De micro-locatie bepaalt het gemak.</>,
    verdictDescription: "Karon past bij een strandgericht verblijf met restaurants en resorts dichtbij, zonder de intensiteit van Patong. De lengte is tegelijk het nadeel: kaartpin, oversteek en echte looproute bepalen hoeveel vervoer je nodig hebt.",
    fitCards: [
      { eyebrow: "Sterke match", title: "Stellen met strandfocus", copy: "Sterk wanneer zonsondergang, resorttijd en ontspannen diners belangrijker zijn dan dicht nachtleven.", icon: Sunset },
      { eyebrow: "Sterke match", title: "Gezinnen die ruimte zoeken", copy: "Het brede strand en resortaanbod kunnen goed werken als zwembad, kamerindeling, oversteek en zeecondities passen.", icon: Users },
      { eyebrow: "Voorwaardelijke match", title: "Reizen zonder auto", copy: "Met de juiste zone zijn dagelijkse behoeften beloopbaar; heel Karon doorkruisen of Phuket verkennen vraagt nog steeds vervoer.", icon: Footprints },
      { eyebrow: "Kies iets anders", title: "Nachtleven aan de deur", copy: "Patong is logischer voor geconcentreerd uitgaan. Kata kan beter passen bij een compacter avondcentrum.", icon: MoonStar, tone: "dark" },
    ],
    editorialRule: "Boek het deel van Karon dat bij je dagelijkse ritme past. Een mooi resort aan het verkeerde uiteinde wordt iedere keer dat je vertrekt een vervoersprobleem.",
    zones: [
      { title: "Noord-Karon", eyebrow: "Resortgericht en losser", copy: "Past wanneer accommodatie en strand een groot deel van je verblijf dragen. Restaurants en loopcomfort verschillen per pin.", check: "Bekijk hotelingang, veilige oversteek en de plekken die je na donker echt gebruikt.", image: HERO, imageAlt: "Open strand en resortgroen in Noord-Karon" },
      { title: "Centrum & Karon Circle", eyebrow: "Dagelijks gemak bij elkaar", copy: "Praktisch wanneer je restaurants, winkels en diensten dichtbij het strand wilt zonder iedere kleine rit.", check: "Controleer kameroriëntatie en recente geluidservaringen; centraal gemak ruilt wat rust in.", image: "/images/cities/phuket/attractions/Karon Beach.webp", imageAlt: "De brede zandkust van Karon Beach" },
      { title: "Zuid-Karon", eyebrow: "De Kata-gerichte middenweg", copy: "Past wanneer je Karons open strand wilt en Kata in je bredere eet- en avondroute wilt houden.", check: "Neem niet aan dat de verbinding altijd eenvoudig is; controleer hitte, regen, verkeer, helling en mobiliteit.", image: "/images/redesign/phuket-stay-kata-karon.webp", imageAlt: "De kust tussen Karon en Kata" },
    ],
    dayParts: [
      { time: "Vroege ochtend", title: "Loop langs de open kust", copy: "Gebruik de koelere uren om strandsectie en vlaggen te begrijpen voordat je de dag vastlegt.", icon: Sunrise },
      { time: "Middag", title: "Laat schaduw de dag sturen", copy: "Zwembad, lunch of een binnenpauze zijn comfortabeler dan het onbeschutte strand als dagvullend plan.", icon: Sun },
      { time: "Zonsondergang", title: "De westkust verdient haar plek", copy: "Keer terug naar het strand en houd daarna je diner dichtbij je gekozen zone.", icon: Sunset },
      { time: "Avond", title: "Rustig, niet stil", copy: "Verwacht restaurants en ontspannen bars; ga alleen naar Patong wanneer groter nachtleven echt het doel is.", icon: MoonStar },
    ],
    beachTitle: "Een royaal strand — met een dagelijkse veiligheidsbeslissing.",
    beachDescription: "De brede kust is Karons belangrijkste voordeel, maar geen maand garandeert veilig zwemmen. Wind, deining en muistromen veranderen snel, vooral tijdens nattere moessonpatronen. Volg strandwachten, borden en rode vlaggen ter plekke.",
    beachChecks: [
      { title: "Vlaggen boven verwachting", copy: "Een mooie lucht overrulet geen rode vlag. Kies dan zwembad of een plan op land.", icon: AlertTriangle },
      { title: "Beoordeel opnieuw met kinderen", copy: "Gezinsvriendelijk zegt iets over gebiedsfit, niet over gegarandeerde waterveiligheid. Controleer diepte, golven en toezicht telkens opnieuw.", icon: Users },
      { title: "Controleer wateractiviteiten", copy: "Bekijk operator, uitrusting, verzekering, briefing en weersannulering vóór betaling.", icon: ShieldCheck },
    ],
    seasonTitle: <>Kies een breed venster.<br />Controleer de echte week.</>,
    seasonDescription: "De westkust heeft herkenbare patronen, maar korte weersverwachting, zeecondities en lokale vlaggen bepalen je dag. Houd minstens één flexibele dag in een strandgerichte route.",
    seasonRows: [
      { period: "dec–feb", conditions: "Vaak een sterker breed venster voor droger weer en rustigere kustplanning.", planning: "De vraag kan hoger zijn. Vergelijk actuele hotelvoorwaarden en blijf de zee controleren.", cue: "Populaire periode", highlight: true },
      { period: "mrt–apr", conditions: "Hitte maakt onbeschut strand en lopen vermoeiender.", planning: "Begin vroeger, plan schaduw en water en houd de middag lichter.", cue: "Plan voor hitte" },
      { period: "mei–okt", conditions: "Zuidwestmoesson kan buien, wind, deining en groter stromingsrisico brengen.", planning: "Bouw een land- of binnenalternatief en behandel een rode vlag als harde stop.", cue: "Blijf flexibel", highlight: true },
      { period: "nov", conditions: "Een overgang met zowel betere reeksen als onrustige dagen.", planning: "Beoordeel je data met de actuele TMD-verwachting, niet met een vaste maandbelofte.", cue: "Controleer de week" },
    ],
    spokes: [
      { title: "Hotels in Karon", copy: "Vergelijk verblijven op micro-locatie, recente kamerfeedback en actuele annulering.", href: "/phuket/karon/hotels/", image: "/images/redesign/phuket-hotels-hero.webp", imageAlt: "Hotelzone aan de kust van Phuket", label: "Open de hotelgids" },
      { title: "Bezienswaardigheden op Phuket", copy: "Scheid eilandbrede plekken van wat vanuit Karon werkelijk praktisch is.", href: "/city/phuket/attractions/", image: "/images/redesign/phuket-attractions-hero.webp", imageAlt: "Kust en bezienswaardigheden op Phuket", label: "Ontdek bezienswaardigheden" },
      { title: "Actuele activiteiten", copy: "Vergelijk ophaalzone, operator, inhoud en weersbeleid vóór je boekt.", href: activities, image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "Tropische kust en dagtochten op Phuket", label: "Bekijk actuele activiteiten", affiliate: true },
      { title: "Waar verblijven op Phuket?", copy: "Vergelijk Karon met andere bases voordat je één kust kiest.", href: "/best-hotels/phuket/", image: "/images/redesign/phuket-stay-bang-tao.webp", imageAlt: "Strandresort en verblijfszones op Phuket", label: "Vergelijk alle gebieden" },
    ],
    comparisonCards: [
      { area: "Kata", fit: "Compacter en vaak de eerste vergelijking voor gezinnen, restaurants en surfen.", href: "/phuket/kata/", image: "/images/redesign/phuket-stay-kata-karon.webp", imageAlt: "De kust van Kata en Karon" },
      { area: "Patong", fit: "Sterker voor geconcentreerd nachtleven, winkelen en maximale toeristische voorzieningen.", href: "/phuket/patong/", image: "/images/redesign/phuket-stay-patong.webp", imageAlt: "Strand en bezoekersgebied van Patong" },
      { area: "Kamala", fit: "Een rustigere, kleiner aanvoelende westkustbasis met een andere mix van dorp en resort.", href: "/phuket/kamala/", image: "/images/redesign/phuket-stay-kamala.webp", imageAlt: "Kamala Beach en groene heuvels" },
    ],
    safetyCards: [
      { title: "Zeecondities", copy: "Volg strandwachten, waarschuwingen en vlaggen. Ruw water en muistromen maken zwemmen soms onveilig.", icon: Waves },
      { title: "Wegen & oversteken", copy: "Beoordeel de echte hotel-strandroute. Rijd alleen met geldig rijbewijs, helm en passende verzekering.", icon: Bus },
      { title: "Hitte & blootstelling", copy: "Gebruik schaduw, water en een rustig middagroutine. De kaart onderschat soms de praktische loopafstand.", icon: Umbrella },
    ],
    bookingCards: [
      { title: "Hotels in Karon", copy: "Vergelijk kaartpin, kamertype, recente feedback, annulering en totaal voor jouw data.", href: hotels, label: "Bekijk actuele hotelprijzen", icon: Hotel, affiliate: true },
      { title: "Activiteiten op Phuket", copy: "Controleer ophaalplek, operator, inhoud, fysieke eisen en weersbeleid.", href: activities, label: "Bekijk actuele opties", icon: TicketCheck, affiliate: true },
      { title: "Airport- en kustbus", copy: "Controleer haltes, dienstregeling, bagage en betaalinformatie bij de operator.", href: "https://phuketsmartbus.com/", label: "Open actuele businformatie", icon: Bus },
    ],
    faqs: [
      { question: "Is Karon Beach een goede plek om te verblijven?", answer: "Karon is sterk wanneer je een open strand, resortkeuze en ontspannen avonden zonder de intensiteit van Patong wilt. Omdat het gebied lang is, kies je op exacte kaartpin en dagelijkse route." },
      { question: "Is Karon of Patong beter?", answer: "Karon past doorgaans bij een rustiger strandverblijf; Patong bij uitgaan, winkelen en maximale concentratie van voorzieningen. De beste keuze volgt uit je avondprioriteit en hotelstraat." },
      { question: "Is Karon Beach of Kata Beach beter?", answer: "Karon is langer, opener en meer uitgespreid. Kata is kleiner en compacter, met meer surfcontext. Kies op hotelpositie, looptolerantie en gewenste avondsfeer." },
      { question: "Is er veel te doen in Karon?", answer: "Karon werkt vooral als strand- en resortbasis met restaurants, diensten en toegang tot bredere activiteiten. Voor een dichte attractielijst aan de deur past een drukkere basis beter." },
      { question: "Is Karon Beach geschikt voor gezinnen?", answer: "Het ruime strand en resortaanbod kunnen goed passen, maar gezinsvriendelijk betekent niet dat de zee altijd veilig is. Controleer vlaggen, oversteek, kamer, zwembadtoezicht en looproute." },
      { question: "Kun je van Karon naar Kata Beach lopen?", answer: "De gebieden sluiten op elkaar aan, maar of lopen verstandig is hangt af van startpunt, hitte, regen, verkeer, helling en mobiliteit. Controleer de echte route." },
      { question: "Heeft Karon nachtleven?", answer: "Karon heeft restaurants en rustige avondlocaties, maar is niet de belangrijkste uitgaansbasis. Kies Patong wanneer laat nachtleven aan de deur centraal staat." },
      { question: "Is Karon Beach veilig om te zwemmen?", answer: "Veiligheid verandert met wind, deining en stroming. Volg strandwachten, borden en vlaggen en ga niet het water in bij een rode vlag." },
    ],
    faqDescription: "Gebaseerd op vijf actuele Nederlandse SERP-sets met 26 echte PAA-vragen van 31 juli 2026. Antwoorden scheiden gebiedsfit van veiligheid op de dag zelf.",
    related: [
      { title: "Complete Phuket-gids", description: "Bouw de eilandroute voordat je één kustbasis kiest.", href: "/city/phuket/", image: "/images/redesign/phuket-destination-hero-v2.webp", imageAlt: "Tropische kust van Phuket" },
      { title: "Waar verblijven op Phuket?", description: "Vergelijk hotelzones op reizigersfit en route.", href: "/best-hotels/phuket/", image: "/images/redesign/phuket-hotels-hero.webp", imageAlt: "Resortkust en hotelzones op Phuket" },
      { title: "Bezienswaardigheden op Phuket", description: "Plan eilandbrede plekken zonder iedere stop in Karon te dwingen.", href: "/city/phuket/attractions/", image: "/images/redesign/phuket-attractions-hero.webp", imageAlt: "Kust, uitzichtpunten en bezienswaardigheden" },
    ],
    sources: [
      { title: "Phuket", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350", note: "Officiële bestemmingscontext en advies om strandvlaggen te volgen." },
      { title: "Weer in de provincie Phuket", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/weather/province/phuket", note: "Primaire actuele weerbron." },
      { title: "Routes, dienstregeling en live tracking", creator: "Phuket Smart Bus", url: "https://phuketsmartbus.com/", note: "Actuele informatie van de vervoersoperator." },
      { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actueel Nederlands veiligheids- en verkeerskader." },
    ],
    methodDescription: "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters (395 keywordrecords), 100 concurrentdomeinen, vijf actuele Nederlandse SERP-sets met 26 echte PAA-vragen en primaire TAT-, TMD-, operator- en NederlandWereldwijd-bronnen. Hoteldiepte en eilandbrede attracties blijven apart; vaste prijzen, tijden, kortingen, hotelvoorzieningen en universele veiligheidsclaims zijn verwijderd.",
    sectionCopy: {
      zonesEyebrow: "Drie micro-locaties", zonesTitle: <>Een lang strand vraagt<br />een precieze kaartpin.</>, zonesDescription: "Noord, centrum en zuid leveren andere looproutes, avondkeuzes en vervoersbehoeften op.",
      rhythmEyebrow: "Eén strand, vier momenten", rhythmTitle: <>Gebruik de ruimte.<br />Vecht niet tegen de hitte.</>, rhythmDescription: "Koele ochtend, beschutte middag en westkustzonsondergang maken Karon sterker dan een volle checklist.",
      featureEyebrow: "Strandruimte zonder zwemgarantie", seasonEyebrow: "Brede seizoenen, actuele beslissing", seasonNote: "Dit zijn patronen, geen weer- of zwemgarantie. Controleer TMD, lokale vlaggen en operatorvoorwaarden.",
      comparisonEyebrow: "Kies het herhaalbare dagritme", comparisonTitle: <>Meer ruimte of<br />meer concentratie?</>, comparisonDescription: "Vergelijk Karon met Kata, Patong en Kamala op wat je iedere dag wilt herhalen.",
      safetyEyebrow: "Water, wegen en hitte", safetyTitle: <>Ruimte voelt rustig.<br />Blijf praktisch.</>, safetyDescription: "Zeecondities, hoteloversteek en blootstelling aan hitte bepalen de echte gebruiksvriendelijkheid.",
      bookingEyebrow: "Controleer wat nu klopt", bookingTitle: <>Boek de micro-locatie,<br />niet alleen Karon.</>, bookingDescription: "Controleer kaartpin, kamer, route, voorwaarden, ophaalplek en totaal voor jouw data.",
      methodTitle: "Een keuzehulp voor Karon, geen generieke strandlijst.",
    },
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
