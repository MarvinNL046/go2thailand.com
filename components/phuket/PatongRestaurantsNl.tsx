import {
  Bus,
  CheckCircle2,
  Clock3,
  Compass,
  Hotel,
  MapPin,
  Salad,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TicketCheck,
  Utensils,
  Users,
} from "lucide-react";
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from "../../lib/affiliates";
import {
  PatongExperienceTemplate,
  type PatongExperienceData,
} from "./PatongExperienceTemplate";

const HERO = "/images/redesign/patong-restaurants-hero-v2.webp";

export default function PatongRestaurantsNl({
  stayHref,
}: {
  stayHref?: string;
}) {
  const foodExperiences = withSubId(
    KLOOK_GENERIC,
    "patong-restaurants-owner-nl-food",
  );
  const stays = withSubId(
    stayHref || TRIP_GENERIC,
    "patong-restaurants-owner-nl-stays",
  );
  const data: PatongExperienceData = {
    locale: "nl",
    alternateUrl: "https://go2-thailand.com/phuket/patong/restaurants/",
    pageUrl: "https://go2-thailand.com/nl/phuket/patong/restaurants/",
    updatedAt: "2026-07-31",
    breadcrumbLabel: "Restaurants",
    title: "Restaurants in Patong: zo kies je waar je gaat eten",
    description:
      "Kies waar je eet in Patong op basis van buurt, moment en actuele controles. Vergelijk Thais eten, seafood, streetfood en dieetwensen zonder verouderde top 10.",
    heroImage: HERO,
    heroAlt:
      "Open restaurant in Patong waar Thais wordt gewokt en reizigers samen eten bij avondlicht",
    heroEyebrow: "Eten in Patong, gekozen met context",
    heroTitle: (
      <>
        Lekker eten in Patong.
        <br />
        <span className="text-saffron-dark">
          Kies de maaltijd, niet de ranglijst.
        </span>
      </>
    ),
    heroSubtitle:
      "Buurt, gelegenheid en actuele informatie zeggen meer dan een eeuwige top tien.",
    heroDescription:
      "Patong heeft enorm veel keuze, maar zoekresultaten mengen gewone eettentjes, seafood, resortrestaurants en verouderde lijstjes. Hier kies je eerst een passende zone en controleer je daarna het actuele menu, recente ervaringen, dieetfit en totaalbedrag.",
    primaryAction: { label: "Kies je eetzone", href: "#zones" },
    affiliateAction: {
      label: "Bekijk actuele food-ervaringen",
      href: foodExperiences,
    },
    navItems: [
      { href: "#decide", label: "Zo kies je", icon: Compass },
      { href: "#zones", label: "Eetzones", icon: MapPin },
      { href: "#choose", label: "Per moment", icon: Utensils },
      { href: "#rhythm", label: "Dagritme", icon: Clock3 },
      { href: "#practical", label: "Eetchecks", icon: ShieldCheck },
      { href: "#book", label: "Actuele opties", icon: TicketCheck },
    ],
    introEyebrow: "Beslis eerst",
    introTitle: (
      <>
        Wat voor maaltijd
        <br />
        zoek je eigenlijk?
      </>
    ),
    introDescription:
      "‘Het beste restaurant’ is geen enkele zoekintentie. Een snelle Thaise lunch, seafoodavond, gezinsdiner en tafel met uitzicht vragen ieder om andere informatie.",
    introCards: [
      {
        eyebrow: "Alledaagse keuze",
        title: "Thais & zuidelijk eten",
        copy: "Let op een actueel menu, zichtbare doorloop en een locatie waar je werkelijk wilt eten.",
        icon: Utensils,
      },
      {
        eyebrow: "Extra prijscheck",
        title: "Seafood per gewicht",
        copy: "Bevestig soort, gewicht, bereidingskosten en totaal voordat de keuken begint.",
        icon: ShoppingBag,
      },
      {
        eyebrow: "Wensen voorop",
        title: "Gezin of dieet",
        copy: "Controleer zitruimte, pittigheid, allergenen, kruiscontact en of personeel het gerecht kan uitleggen.",
        icon: Users,
      },
      {
        eyebrow: "Ander product",
        title: "Uitzicht & gelegenheid",
        copy: "Een zonsondergang kan de meerprijs waard zijn, maar vergelijk tafel, weer, reservering en totaal — niet alleen foto’s.",
        icon: Sparkles,
        tone: "dark",
      },
    ],
    editorialRule:
      "Deze pagina bedient de commerciële restaurantzoekvraag, maar roept geen zaak permanent uit tot ‘beste’. Een shortlist ontstaat pas uit actuele informatie.",
    zonesEyebrow: "Eet op locatie",
    zonesTitle: (
      <>
        Drie eetzones.
        <br />
        Drie andere afwegingen.
      </>
    ),
    zonesDescription:
      "Een restaurantnaam zonder locatiecontext is zwak advies. Kies eerst of gemak, sfeer aan zee of een rustigere rand belangrijk is en controleer daarna de actuele zaak.",
    zones: [
      {
        title: "Centraal Patong & marktzone",
        eyebrow: "De meeste variatie",
        copy: "Handig voor Thais eten, foodcourts, streetfood en groepen die meerdere opties bij elkaar willen.",
        check:
          "Vergelijk recente patronen, hygiënesignalen, betaalwijze, zitruimte en je echte looproute na donker.",
        image: HERO,
        imageAlt: "Open restaurant en levendige straat in centraal Patong",
      },
      {
        title: "Beach Road & zeekant",
        eyebrow: "Premie voor uitzicht",
        copy: "Logisch als sfeer aan zee of een diner rond zonsondergang deel van de ervaring is.",
        check:
          "Reserveer de exacte tafel als uitzicht telt en controleer totaal, weersblootstelling en geluidsniveau.",
        image: "/images/redesign/patong-area-hero-v2.webp",
        imageAlt: "Patong Beach en de eetzone langs zee",
      },
      {
        title: "Noord-, zuid- & heuvelrand",
        eyebrow: "Bestemmingsdiner",
        copy: "Kan passen bij een rustigere avond of uitzicht, maar maakt vervoer onderdeel van je keuze.",
        check:
          "Controleer kaartpin, toegang, kledingverwachting, annulering en terugrit voordat je reserveert.",
        image: "/images/redesign/phuket-stay-patong.webp",
        imageAlt: "Heuvels en resortrand rond Patong",
      },
    ],
    choiceEyebrow: "Koppel aan het moment",
    choiceTitle: (
      <>
        Kies de gelegenheid.
        <br />
        Maak daarna een actuele shortlist.
      </>
    ),
    choiceDescription:
      "Dit zijn besliskaders, geen restaurantprijzen. Ze blijven bruikbaar als een zaak sluit, van chef wisselt of het menu aanpast.",
    choices: [
      {
        title: "Snelle Thaise lunch",
        copy: "Zoek een overzichtelijk actueel menu, heldere gerechtbeschrijvingen en voldoende doorloop voor verse bereiding.",
        check: "pittigheid, eiwit, portie en actuele prijs",
        icon: Utensils,
      },
      {
        title: "Seafooddiner",
        copy: "Scheid een mooie visdisplay van werkelijke waarde. Marktprijs en bereiding kunnen de rekening onvoorspelbaar maken.",
        check: "gewicht, bereiding, bijgerechten, belasting en service",
        icon: ShoppingBag,
      },
      {
        title: "Gezin of groep",
        copy: "Geef zitruimte, geluid, deelgerechten, dieetduidelijkheid en een eenvoudige terugweg voorrang boven hype.",
        check: "reservering, kinderstoel of toegang en rekening splitsen",
        icon: Users,
      },
      {
        title: "Vegetarisch of allergie",
        copy: "Een vegetarisch label sluit vissaus, bouillon, ei of kruiscontact niet automatisch uit.",
        check: "ingrediënten en keukenwerkwijze rechtstreeks bij personeel",
        icon: Salad,
      },
    ],
    rhythmEyebrow: "Gebruik het dagritme",
    rhythmTitle: (
      <>
        Patong eet anders
        <br />
        voor en na zonsondergang.
      </>
    ),
    rhythmDescription:
      "Een bruikbare keuze houdt rekening met hitte, reserveringen rond zonsondergang, marktdrukte en de verandering van centrale straten in de avond.",
    rhythmRows: [
      {
        period: "Ontbijt",
        feel: "Gemak bij hotel of café is vaak waardevoller dan heel Patong doorkruisen voor een bekende pin.",
        plan: "Controleer actuele opening en dieetwensen langs je echte ochtendroute.",
        cue: "Blijf dichtbij",
        highlight: true,
      },
      {
        period: "Lunch",
        feel: "Geschikt voor Thaise gerechten, foodcourts en een beschaduwde strandpauze.",
        plan: "Gebruik actuele menu’s en zichtbare doorloop; populariteit is geen kwaliteitsgarantie.",
        cue: "Eten voorop",
      },
      {
        period: "Diner bij zonsondergang",
        feel: "Uitzicht, reservering en weersblootstelling worden onderdeel van het product.",
        plan: "Bevestig tafelpositie, annulering, totaalbedrag en een weerfallback.",
        cue: "Boek het detail",
      },
      {
        period: "Late avond",
        feel: "Centraal blijft de keuze breed, terwijl geluid, alcohol en vervoer de ervaring veranderen.",
        plan: "Spreek een duidelijke ontmoetingsplek af en controleer de keukensluiting los van de zaalsluiting.",
        cue: "Plan de terugweg",
        highlight: true,
      },
    ],
    featureEyebrow: "Zo controleer je een restaurant",
    featureTitle: (
      <>
        Recente signalen.
        <br />
        Helder menu. Eerlijk totaal.
      </>
    ),
    featureDescription:
      "Een gids kan levende bedrijven niet bevriezen. Met deze checks maak je van redactionele oriëntatie een actuele keuze.",
    featureCards: [
      {
        title: "Lees recente patronen",
        copy: "Bekijk meerdere recente ervaringen op terugkerende opmerkingen over eten, bediening, hygiëne en geluid — niet één score.",
        icon: CheckCircle2,
      },
      {
        title: "Controleer het menu",
        copy: "Bevestig gerechten, ingrediënten, portievorm en omgang met dieetwensen rechtstreeks bij de zaak.",
        icon: Utensils,
      },
      {
        title: "Bevestig het totaal",
        copy: "Vraag vóór bestellen naar marktprijs, gewicht, service, belasting, minimumafname en betaalwijze.",
        icon: ShieldCheck,
      },
    ],
    practicalEyebrow: "Voedselveiligheid & comfort",
    practicalTitle: (
      <>
        Laat alleen je eetlust
        <br />
        een verrassing zijn.
      </>
    ),
    practicalDescription:
      "Goede beslissingen zijn meestal eenvoudig: schone bereiding, heldere ingrediënten, een beheersbare rekening en een veilige terugweg.",
    practicalCards: [
      {
        title: "Streetfood beoordelen",
        copy: "Kies bij voorkeur eten dat goed gaar wordt en heet wordt geserveerd; wees terughoudend met lauwe, rauwe of lang blootgestelde producten.",
        icon: ShieldCheck,
      },
      {
        title: "Allergenen & dieet",
        copy: "Vertaal ernstige allergieën, vraag naar vissaus en bouillon en houd rekening met moeilijk beheersbaar kruiscontact.",
        icon: Salad,
      },
      {
        title: "Vervoer na het eten",
        copy: "Bewaar de exacte pin en kies passend vervoer wanneer route, weer of alcohol lopen onverstandig maakt.",
        icon: Bus,
      },
    ],
    bookingTitle: (
      <>
        Boek alleen wat
        <br />
        echt voordeel heeft van boeken.
      </>
    ),
    bookingDescription:
      "Reserveer een actuele food-ervaring of verblijfszone wanneer de inclusies duidelijk zijn. Gewoon een restaurant vinden kan redactioneel en zelfstandig blijven.",
    bookingCards: [
      {
        title: "Food-ervaringen in Patong",
        copy: "Controleer aanbieder, proeverijen, dieetafhandeling, ontmoetingspunt, duur en annulering.",
        href: foodExperiences,
        label: "Bekijk actuele food-opties",
        icon: TicketCheck,
        affiliate: true,
      },
      {
        title: "Verblijf bij je eetzone",
        copy: "Vergelijk exacte pin, ontbijt, recente geluidsfeedback, annulering en totaal voor je data.",
        href: stays,
        label: "Bekijk actuele hotelprijzen",
        icon: Hotel,
        affiliate: true,
      },
      {
        title: "Nachtleven in Patong",
        copy: "Houd Bangla Road, rustige avondkeuzes en verantwoord terugreizen bij de aparte sibling-owner.",
        href: "/nl/phuket/patong/nightlife/",
        label: "Plan Patong na donker",
        icon: Sparkles,
      },
    ],
    faqs: [
      {
        question: "Wat zijn de beste restaurants in Patong?",
        answer:
          "Er is geen blijvende winnaar. Kies eerst maaltijdtype en zone en vergelijk daarna het actuele menu, meerdere recente ervaringen, dieetfit, reserveringsvoorwaarden en totaalbedrag.",
      },
      {
        question: "Waar eten locals in Patong?",
        answer:
          "‘Waar locals eten’ wordt vaak als marketing gebruikt. Kijk gerust buiten de zeekant en toeristenlijstjes, maar beoordeel iedere actuele zaak op menu, doorloop, hygiëne en gemak — niet op wie er lijkt te zitten.",
      },
      {
        question: "Waar eet je goed Thais in Patong?",
        answer:
          "Begin voor veel keuze in het centrum en rond de markt. Selecteer vervolgens actuele zaken met duidelijke Thaise of Zuid-Thaise gerechten en controleer pittigheid, eiwit, vissaus of bouillon en prijs.",
      },
      {
        question: "Zijn restaurants aan Patong Beach duur?",
        answer:
          "Een plek aan zee en vraag rond zonsondergang kunnen een premie geven, maar totalen verschillen. Vergelijk live menu, tafelpositie, service en belasting plus vervoer in plaats van een oud gemiddelde.",
      },
      {
        question: "Is streetfood in Patong veilig?",
        answer:
          "Geen kraam is zonder risico. Geef voorkeur aan goed doorbakken eten dat heet wordt geserveerd, zichtbare doorloop en schone omgang; volg daarnaast officiële reisgezondheidsadviezen voor eten en water.",
      },
      {
        question: "Waar kun je met kinderen eten in Patong?",
        answer:
          "Kies op zitruimte, geluid, deelgerechten, allergiecommunicatie en een eenvoudige terugweg. Een rustigere actuele optie kan nuttiger zijn dan een hippe zaak in de uitgaanszone.",
      },
      {
        question: "Kun je vegetarisch eten in Patong?",
        answer:
          "Ja, maar bevestig vissaus, garnalenpasta, bouillon, ei en kruiscontact in plaats van alleen op een vegetarisch label te vertrouwen.",
      },
      {
        question: "Wat kost eten in Patong?",
        answer:
          "Er bestaat geen duurzaam bedrag voor streetfood, gewone Thaise restaurants, seafood per gewicht en resortdiners samen. Open het actuele menu en bevestig alle kosten voordat je bestelt.",
      },
    ],
    faqDescription:
      "Gebaseerd op vijf actuele Nederlandse restaurant-SERPs met 24 echte PAA-vermeldingen, onderzocht op 31 juli 2026. Er zijn geen prijzen, waarderingen of restaurantranglijsten verzonnen of vastgezet.",
    related: [
      {
        title: "Patong gebiedsgids",
        description:
          "Kies eerst de juiste micro-locatie voor je verblijf en dagritme.",
        href: "/nl/phuket/patong/",
        image: "/images/redesign/patong-area-hero-v2.webp",
        imageAlt: "Patong Beach en het stedelijke gebied",
      },
      {
        title: "Patong nachtleven",
        description:
          "Plan Bangla Road, rustigere avonden en een verantwoorde terugweg.",
        href: "/nl/phuket/patong/nightlife/",
        image: "/images/redesign/patong-nightlife-hero-v2.webp",
        imageAlt: "Uitgaansstraat in Patong bij avondlicht",
      },
      {
        title: "Hotels in Patong",
        description:
          "Vergelijk zones, recente geluidsfeedback en actuele hotelvoorwaarden.",
        href: "/nl/phuket/patong/hotels/",
        image: "/images/redesign/phuket-hotels-hero.webp",
        imageAlt: "Hotelzones op Phuket",
      },
    ],
    sources: [
      {
        title: "Phuket destination",
        creator: "Tourism Authority of Thailand",
        url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350",
        note: "Officiële bestemmingscontext.",
      },
      {
        title: "Five Keys to Safer Food",
        creator: "World Health Organization",
        url: "https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food",
        note: "Primaire richtlijnen voor veiliger voedsel.",
      },
      {
        title: "Voedselallergie",
        creator: "Voedingscentrum",
        url: "https://www.voedingscentrum.nl/encyclopedie/voedselallergie.aspx",
        note: "Nederlandstalige allergenencontext.",
      },
      {
        title: "Reisadvies Thailand",
        creator: "NederlandWereldwijd",
        url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
        note: "Actuele officiële veiligheidscontext.",
      },
      {
        title: "Routes en live tracking",
        creator: "Phuket Smart Bus",
        url: "https://phuketsmartbus.com/",
        note: "Actuele informatie van de vervoerder.",
      },
    ],
    methodTitle: "Een actuele beslisgids, geen eeuwige best-of-lijst.",
    methodDescription:
      "Bijgewerkt op 31 juli 2026 na twee Nederlandse DataForSEO-clusters, vijf actuele SERPs met 45 organische resultaten en 24 PAA-vermeldingen, plus controle van primaire bronnen. Oude ratings, vaste prijzen, openingstijden, named-venue-superlatieven, menu- en veiligheidsgaranties zijn verwijderd. Restaurantkeuze blijft gescheiden van de Patong-gebiedsowner en nightlife-owner.",
  };

  return <PatongExperienceTemplate data={data} />;
}
