import { Bus, Clock3, Compass, Eye, GlassWater, Hotel, MapPin, MoonStar, Music, ShieldCheck, Sparkles, TicketCheck, Users } from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import { PatongExperienceTemplate, type PatongExperienceData } from "./PatongExperienceTemplate";

const HERO = "/images/redesign/patong-nightlife-hero-v2.webp";

export default function PatongNightlifeNl({ stayHref }: { stayHref?: string }) {
  const options = withSubId(KLOOK_GENERIC, "patong-nightlife-owner-nl-options");
  const stays = withSubId(stayHref || TRIP_GENERIC, "patong-nightlife-owner-nl-stays");
  const data: PatongExperienceData = {
    locale: "nl", alternateUrl: "https://go2-thailand.com/phuket/patong/nightlife/", pageUrl: "https://go2-thailand.com/nl/phuket/patong/nightlife/", updatedAt: "2026-07-31", breadcrumbLabel: "Nachtleven",
    title: "Patong nightlife: Bangla Road en rustige avonden", description: "Plan het nachtleven van Patong verantwoord. Vergelijk Bangla Road, live muziek, clubs, shows en rustige alternatieven en regel rekening, drankjes en vervoer veilig.",
    heroImage: HERO, heroAlt: "Volwassen reizigers, live muziek en gelicentieerd ophaalverkeer in een kleurrijke avondstraat in Patong", heroEyebrow: "Patong na donker, zonder de hype",
    heroTitle: <>Patong nightlife.<br /><span className="text-saffron-light">Kies de avond vóór de avond jou kiest.</span></>, heroSubtitle: "Bangla Road is één product — niet je hele avond.",
    heroDescription: "Patong kan zonsondergang, live muziek, clubs, een ticketshow of bewust rustig diner betekenen. Deze gids helpt zones en veiligheid kiezen zonder adult-serviceprijzen, verouderde clubranglijsten of sluitingsgaranties.",
    primaryAction: { label: "Kies je soort avond", href: "#choose" }, affiliateAction: { label: "Bekijk actuele avondopties", href: options },
    navItems: [
      { href: "#decide", label: "Avondfit", icon: Compass }, { href: "#zones", label: "Avondzones", icon: MapPin }, { href: "#choose", label: "Kies je avond", icon: MoonStar },
      { href: "#rhythm", label: "Avondritme", icon: Clock3 }, { href: "#practical", label: "Veiligheid", icon: ShieldCheck }, { href: "#book", label: "Actuele opties", icon: TicketCheck },
    ],
    introEyebrow: "Beslis eerst", introTitle: <>Hoeveel intensiteit<br />wil je werkelijk?</>, introDescription: "Patongs voordeel is concentratie. Het risico is ongemerkt in een luidere, latere of duurdere avond belanden dan je wilde.",
    introCards: [
      { eyebrow: "Hoge intensiteit", title: "Bangla Road & clubs", copy: "Kies dit bewust voor volwassen nachtleven, promoters, harde muziek en constante commerciële aandacht.", icon: Music },
      { eyebrow: "Middelintensiteit", title: "Live muziek & sociale bars", copy: "Kies een actuele locatie met heldere prijzen, zichtbare sfeer en eenvoudige uitgang.", icon: GlassWater },
      { eyebrow: "Gepland product", title: "Shows & ticketavonden", copy: "Vergelijk operator, locatie, zitplaats, inhoud, vervoer en annulering vóór betaling.", icon: TicketCheck },
      { eyebrow: "Volwaardig alternatief", title: "Diner, zonsondergang of vroeg naar bed", copy: "Je hebt Bangla Road niet nodig voor een goede Patong-avond of om verblijf in Patong te rechtvaardigen.", icon: MoonStar, tone: "dark" },
    ],
    editorialRule: "Dit is een beslisgids voor volwassen nachtleven. Hij faciliteert geen seksuele diensten, publiceert geen adult-serviceprijzen en behandelt uitbuiting niet als attractie.",
    zonesEyebrow: "Nachtleven per zone", zonesTitle: <>De kern is compact.<br />Je avond hoeft dat niet te zijn.</>, zonesDescription: "Kies de zone vóór de locatie. Zo verandert een plan voor live muziek niet per ongeluk in een laat clubcircuit.",
    zones: [
      { title: "Kern van Bangla Road", eyebrow: "Maximale intensiteit", copy: "Een dichte volwassen uitgaansstraat met bars, clubs, promoters en veel prikkels. Loop er alleen door wanneer dat milieu past.", check: "Spreek ontmoetingspunt af, houd een uitgang en bevestig iedere kostenpost vóór drank of zitplaats.", image: HERO, imageAlt: "Drukke maar overzichtelijke avondstraat bij Bangla Road" },
      { title: "Beach Road & zonsondergang", eyebrow: "Vroeger en meer openlucht", copy: "Geschikt voor zonsondergang, diner en een rustigere start voordat je beslist of je later doorgaat.", check: "Controleer locatie, weer, muziekvolume en veilige route verder.", image: "/images/redesign/patong-area-hero-v2.webp", imageAlt: "Patong Beach en boulevard in de avond" },
      { title: "Buiten de kern", eyebrow: "Rustiger of doelgericht", copy: "Live muziek, hotelbars, restaurants en ticketentertainment maken een avond zonder Bangla-circuit mogelijk.", check: "Controleer kaartpin, laatste toegang, kledingregel, vervoer terug en actuele bedrijfsinformatie.", image: "/images/redesign/phuket-stay-patong.webp", imageAlt: "Hotel en rustigere avondzone in Patong" },
    ],
    choiceEyebrow: "Kies het product", choiceTitle: <>Eén avond.<br />Vier totaal andere intenties.</>, choiceDescription: "Vergelijk pas locaties wanneer de groep weet of ze wil praten, muziek luisteren, dansen of een ticketshow zien.",
    choices: [
      { title: "Live muziek en praten", copy: "Kies waar sfeer, prijsstructuur en uitgang zichtbaar zijn voordat je bestelt.", check: "actueel programma, volume, zitplaats en rekeningvorm", icon: Music },
      { title: "Clubs en dansen", copy: "Gebruik actuele officiële locatie-informatie; line-up, toegang, kleding en sluiting veranderen.", check: "leeftijd/ID, officieel ticket, toegang en vervoer terug", icon: Sparkles },
      { title: "Ticketshow of sport", copy: "Behandel operator, datum, zitplaats en transfers als veranderlijke boekbare voorraad.", check: "locatie, start, inhoud, pickup en annulering", icon: TicketCheck },
      { title: "Stellen of rustige groepen", copy: "Kies zonsondergang, diner, hotelbar of live muziek buiten de kern in plaats van Bangla af te dwingen.", check: "geluid, looproute en gezamenlijke vertrektijd", icon: Users },
    ],
    rhythmEyebrow: "Beheers de boog", rhythmTitle: <>Begin met een plan.<br />Vertrek met dezelfde groep.</>, rhythmDescription: "Exacte opening, drukte en sluiting veranderen. Leg intensiteit, budget en vervoer vast voordat alcohol en lawaai beslissen moeilijker maken.",
    rhythmRows: [
      { period: "Zonsondergang", feel: "Beach Road, diner en openlucht bieden een zachtere start.", plan: "Controleer weer, tafel, route en of de groep later door wil.", cue: "Bepaal de toon", highlight: true },
      { period: "Vroege avond", feel: "De kern wordt actiever terwijl lopen en praten vaak nog eenvoudiger zijn.", plan: "Bekijk de omgeving eerst en kies ontmoeting en uitgang.", cue: "Eerst observeren" },
      { period: "Later", feel: "Lawaai, drukte, promoters en clubenergie kunnen toenemen.", plan: "Bewaak drankjes, bevestig rekeningen en verlaat druk of onduidelijkheid.", cue: "Blijf samen" },
      { period: "Naar huis", feel: "Vermoeidheid, alcohol en vraag maken wegkeuzes en pickup moeilijker.", plan: "Gebruik een geboekte gelicentieerde rit, controleer voertuig/bestuurder en rijd nooit na alcohol.", cue: "Vooraf regelen", highlight: true },
    ],
    featureEyebrow: "Realiteit van Bangla Road", featureTitle: <>Volwassen entertainment.<br />Geen vrijbrief voor grensoverschrijding.</>, featureDescription: "Het gebied is commercieel en zwaar gefilmd. Verantwoorde bezoekers houden grenzen helder, vermijden uitbuiting en behandelen werknemers en gasten als mensen, niet als content.",
    featureCards: [
      { title: "Niet filmen zonder toestemming", copy: "Fotografeer of film werknemers, performers en gasten niet zonder duidelijke toestemming.", icon: Eye },
      { title: "Geen inkoopgids", copy: "Deze pagina legt niet uit hoe je seksuele diensten koopt of wat ze kosten. Wet, consent en uitbuitingsrisico tellen.", icon: ShieldCheck },
      { title: "Loop weg van druk", copy: "Vertrek bij onduidelijke rekeningen, dwingende verkoop, ongewenst contact of weigering om voorwaarden uit te leggen.", icon: Users },
    ],
    practicalEyebrow: "Verklein stuurbaar risico", practicalTitle: <>Bescherm drankje,<br />rekening en route terug.</>, practicalDescription: "Praktische veiligheid verslaat venue-mythes. Blijf bij vertrouwde mensen en gebruik actueel officieel advies.",
    practicalCards: [
      { title: "Drankveiligheid", copy: "Koop gesloten of direct geserveerde drank, houd die in zicht en zoek onmiddellijk hulp wanneer iemand onverwacht onwel wordt.", icon: GlassWater },
      { title: "Rekeningen & promoters", copy: "Bevestig menu, entree, minimumbesteding, service en iedere aangeboden drank vóór bestellen en bewaar de rekening.", icon: ShieldCheck },
      { title: "Vervoer terug", copy: "Bewaar je hotelpin, gebruik gelicentieerd vervoer, controleer voertuig/bestuurder en combineer alcohol nooit met rijden.", icon: Bus },
    ],
    bookingTitle: <>Boek controleerbare voorraad.<br />Boek geen stereotype.</>, bookingDescription: "Shows, sport en begeleide avonden zijn als actuele voorraad te vergelijken. Bars en clubs vragen op de avond zelf officiële controle.",
    bookingCards: [
      { title: "Avondshows & activiteiten", copy: "Vergelijk operator, exacte locatie, zitplaats, inhoud, pickup en annulering.", href: options, label: "Bekijk actuele avondopties", icon: TicketCheck, affiliate: true },
      { title: "Slaap dichtbij — of juist ver weg", copy: "Vergelijk kaartpin, recente geluidsreviews, annulering en totaal voor jouw data.", href: stays, label: "Bekijk actuele hotelprijzen", icon: Hotel, affiliate: true },
      { title: "Restaurantgids voor Patong", copy: "Plan diner apart met actuele menu-, dieet- en totaalprijscontrole.", href: "/phuket/patong/restaurants/", label: "Kies waar je eet", icon: GlassWater },
    ],
    faqs: [
      { question: "Is het nachtleven van Patong leuk?", answer: "Het past sterk bij reizigers die geconcentreerd volwassen nachtleven, live muziek of clubs zoeken. Het past minder bij stille avonden, weinig commerciële druk of vroeg slapen." },
      { question: "Waar staat Bangla Road om bekend?", answer: "Bangla Road is de geconcentreerde volwassen uitgaanskern met bars, clubs, live entertainment en promoters. Het is één deel van Patong, niet de hele bestemming." },
      { question: "Is Patong nightlife veilig?", answer: "Geen uitgaansgebied is universeel veilig. Blijf bij vertrouwde mensen, bescherm drankjes, bevestig rekeningen, vermijd illegale drugs en gebruik gelicentieerd vervoer." },
      { question: "Wat kunnen stellen 's avonds doen in Patong?", answer: "Kies zonsondergang, diner, live muziek, een ticketshow of vroege wandeling zonder Bangla Road centraal te zetten." },
      { question: "Kun je Patong nightlife beleven zonder Bangla Road?", answer: "Ja. Beach Road, restaurants, hotelbars, live muziek en actuele ticketshows bieden alternatieven. Controleer locatie en route terug." },
      { question: "Hoe laat sluiten bars in Patong?", answer: "Sluiting en handhaving veranderen per vergunning, locatie en actuele regels. Controleer officiële informatie en plan vervoer nooit rond een generieke sluitingstijd." },
      { question: "Heeft Patong een red-light district?", answer: "Bangla Road bevat volwassen nachtleven. Deze gids faciliteert geen seksuele diensten; volg Thaise wet, respecteer consent en vermijd uitbuitende of dwingende situaties." },
      { question: "Wat moet je vermijden in Patong 's avonds?", answer: "Vermijd illegale drugs, onbeheerde drankjes, onduidelijke rekeningen, ongelicentieerd vervoer, rijden na alcohol, filmen zonder toestemming en iedere dwingende interactie." },
    ],
    faqDescription: "Gebaseerd op vijf actuele Nederlandse SERP-sets met 26 echte PAA-vragen van 31 juli 2026. Adult-serviceprijzen, clubranglijsten, vaste sluitingstijden en drukteclaims zijn uitgesloten.",
    related: [
      { title: "Patong-gebiedsgids", description: "Beslis of de uitgaanskern dichtbij of ver van je hotel moet liggen.", href: "/phuket/patong/", image: "/images/redesign/patong-area-hero-v2.webp", imageAlt: "Patong Beach en stedelijk gebied" },
      { title: "Restaurants in Patong", description: "Kies diner op zone, gelegenheid en actuele informatie.", href: "/phuket/patong/restaurants/", image: "/images/redesign/patong-restaurants-hero-v2.webp", imageAlt: "Thais restaurant in Patong bij avondlicht" },
      { title: "Hotels in Patong", description: "Vergelijk zones en recente geluidsreviews vóór boeken.", href: "/phuket/patong/hotels/", image: "/images/redesign/phuket-hotels-hero.webp", imageAlt: "Hotelzones op Phuket" },
    ],
    sources: [
      { title: "Phuket", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350", note: "Officiële bestemmingscontext." },
      { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actueel Nederlands veiligheids-, drugs- en verkeerskader." },
      { title: "Routes en live tracking", creator: "Phuket Smart Bus", url: "https://phuketsmartbus.com/", note: "Actuele vervoersinformatie van de operator." },
      { title: "Thailand local laws and customs", creator: "UK FCDO", url: "https://www.gov.uk/foreign-travel-advice/thailand/local-laws-and-customs", note: "Aanvullende actuele juridische en gedragscontext." },
    ],
    methodTitle: "Verantwoord avondadvies, geen voyeurisme.",
    methodDescription: "Op 31 juli 2026 zelfstandig onderzocht met twee Nederlandse DataForSEO-clusters (99 keywordrecords), 50 concurrentdomeinen en vijf actuele Nederlandse SERP-sets met 26 echte PAA-vragen, plus primaire TAT-, vervoers-, NederlandWereldwijd- en juridische bronnen. Seksuele-diensteninkoop, vaste drank-/vervoerprijzen, crowdclaims, clubranglijsten, sluitingstijden en venueschema's zijn verwijderd.",
  };
  return <PatongExperienceTemplate data={data} />;
}
