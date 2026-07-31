import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BedDouble,
  CalendarRange,
  Check,
  Clock3,
  ExternalLink,
  FerrisWheel,
  HeartPulse,
  Hotel,
  MapPinned,
  Palmtree,
  Route,
  School,
  ShieldCheck,
  Sparkles,
  TrainFront,
  UsersRound,
  Waves,
} from "lucide-react";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";
import { KLOOK_GENERIC, TRIP_GENERIC, withPlacementSubId } from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";

const familyProfiles = [
  {
    title: "Baby of peuter",
    eyebrow: "Routine beschermen",
    copy: "Weinig basissen, korte deur-tot-deurketens, slaapruimte en eenvoudige toegang tot eten, zorg en koelte wegen zwaarder dan een lange wensenlijst.",
    avoid: "Plan niet meerdere zware reisdagen achter elkaar en controleer babybed, lift, badkamer en transfermiddel rechtstreeks.",
    icon: Baby,
  },
  {
    title: "Basisschoolleeftijd",
    eyebrow: "Ontdekken met herstel",
    copy: "Wissel cultuur, natuur, water en vrije tijd af. Eén herkenbaar hoogtepunt plus speeltijd werkt vaak beter dan een vol dagprogramma.",
    avoid: "Een minimumleeftijd zegt niets over zwemvaardigheid, hittebestendigheid of persoonlijke geschiktheid.",
    icon: School,
  },
  {
    title: "Tieners",
    eyebrow: "Mee laten kiezen",
    copy: "Geef ieder gezinslid invloed op één dagdeel. Combineer zelfstandigheid met duidelijke afspraken over verkeer, water, geld en bereikbaarheid.",
    avoid: "Verwar online populariteit niet met gezinsfit; bespreek vroeg vertrek, kledingregels en telefoonmomenten vooraf.",
    icon: UsersRound,
  },
];

const bases = [
  {
    title: "Bangkok",
    tag: "Stad met uitwijkopties",
    image: "/images/redesign/destination-bangkok.webp",
    fit: "Veel activiteiten, eten, vervoer en binnenopties wanneer hitte of regen het plan wijzigt.",
    tradeoff: "Verkeer, loopafstanden en prikkels maken wijk- en hotelligging belangrijker dan de sterrenclassificatie.",
    href: "/city/bangkok/",
  },
  {
    title: "Chiang Mai",
    tag: "Compactere noordbasis",
    image: "/images/redesign/destination-chiang-mai.webp",
    fit: "Stad, workshops en natuur zijn te combineren zonder iedere dag van accommodatie te wisselen.",
    tradeoff: "Luchtkwaliteit en hitte zijn seizoensgevoelig; controleer de actuele situatie en houd een binnenplan.",
    href: "/city/chiang-mai/",
  },
  {
    title: "Krabi of vastelandkust",
    tag: "Strand met wegverbinding",
    image: "/images/redesign/krabi-destination-hero.webp",
    fit: "Stranddagen en uitstappen vanuit één basis, met minder bootafhankelijkheid dan bij een eilandroute.",
    tradeoff: "Zeecondities, transfers en het verschil tussen strandzones blijven bepalend voor jonge gezinnen.",
    href: "/city/krabi/",
  },
  {
    title: "Koh Samui of eiland",
    tag: "Eiland als eindbasis",
    image: "/images/redesign/koh-samui-destination-hero.webp",
    fit: "Sterk wanneer het eiland zelf de afsluiting is en je weinig verdere verplaatsingen plant.",
    tradeoff: "Vlucht- of ferryketen, lokale ritten, weer en afstand tot passende zorg vragen extra controle.",
    href: "/city/koh-samui/",
  },
];

const routeRhythm = [
  {
    step: "01",
    title: "Landen",
    detail: "Eén aankomstbasis met marge voor slaap, warmte en een vertraagde bagage- of vluchtketen.",
    icon: BedDouble,
  },
  {
    step: "02",
    title: "Verdiepen",
    detail: "Eén contrasterende basis—noord, natuur of cultuur—zonder tussendoor losse overnachtingen te stapelen.",
    icon: MapPinned,
  },
  {
    step: "03",
    title: "Vertragen",
    detail: "Kust of eiland met ruimte om weersafhankelijke activiteiten te verschuiven en echt te herstellen.",
    icon: Palmtree,
  },
  {
    step: "04",
    title: "Bufferen",
    detail: "Plan vóór de internationale terugreis voldoende marge voor boot, weg, binnenlandse vlucht en bagage.",
    icon: CalendarRange,
  },
];

const hotelChecks = [
  "Bevestig maximale kamerbezetting en of een kind als extra persoon telt",
  "Vraag om echte slaapopstelling: bedtype, babybed en afsluitbare slaapruimte",
  "Controleer lift, trap, balkon, zwembadtoegang en badkamerindeling",
  "Meet deur-tot-deurafstand naar eten, vervoer, apotheek en passende zorg",
  "Lees annulerings-, ontbijt- en extra-bedvoorwaarden bij de aanbieder",
];

const activityChecks = [
  "Minimumleeftijd, lengte, zwemvaardigheid en eigen risicobeoordeling",
  "Totale duur inclusief ophalen, wachten, bootrit en terugbrengen",
  "Actuele weers-, water- en veiligheidsvoorwaarden op de uitvoeringsdag",
  "Schaduw, toiletten, eten en mogelijkheid om eerder te stoppen",
  "Wat de activiteit werkelijk omvat en welk deel je zelf moet regelen",
];

const faqs = [
  {
    question: "Wat kost drie weken Thailand met een gezin?",
    answer:
      "Dat hangt af van gezinsgrootte, kamerbezetting, seizoen, route, binnenlandse verplaatsingen, activiteiten en eetstijl. Bouw een scenario met actuele offertes voor volledige kamers, alle passagiers, bagage, transfers, verzekering en een buffer. Een online gemiddeld gezinsbedrag is geen betrouwbare persoonlijke begroting.",
  },
  {
    question: "Wat is de beste reistijd voor Thailand met kinderen?",
    answer:
      "Thailand heeft geen uniform beste gezinsseizoen. Regen, hitte, luchtkwaliteit, zeecondities en drukte verschillen per regio en maand. Kies eerst je route, controleer daarna de weerowner per basis en houd binnenactiviteiten en verschuifbare dagen achter de hand.",
  },
  {
    question: "Wat is het meest kindvriendelijke eiland in Thailand?",
    answer:
      "Er bestaat geen nummer-één-eiland voor ieder gezin. Vergelijk de volledige transferketen, strand- en watercondities, geschikte kamer, lokale ritten, eten, zorgafstand en activiteiten voor jouw leeftijden. Koh Samui kan logistiek anders werken dan Koh Lanta, Koh Chang of een vastelandkust; dat maakt het niet automatisch beter.",
  },
  {
    question: "Is het veilig om met kinderen naar Thailand te reizen?",
    answer:
      "Veel gezinnen reizen door Thailand, maar ‘veilig’ is geen algemene garantie. Controleer het actuele reisadvies, verkeer, wateractiviteiten, hitte, dierencontact, voedselallergieën, vaccinaties en zorgtoegang voor jouw route. Plan kind-specifiek medisch advies met GGD, huisarts of reisarts.",
  },
  {
    question: "Wat is leuker met kinderen: Thailand of Bali?",
    answer:
      "Dat hangt af van de reis die je wilt bouwen. Thailand biedt veel combinaties van stad, noord, eilanden en vastelandkust; Bali kan een compactere eilandroute geven. Vergelijk vluchtketen, aantal verhuizingen, verkeer, seizoen, zorg, activiteiten en slaapritme in plaats van één bestemming als universele winnaar aan te wijzen.",
  },
];

export default function ThailandWithKidsGuideNl() {
  const subId = useSubId();
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, "thailand-with-kids-nl-family-stay");
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, "thailand-with-kids-nl-family-activities");
  const pageUrl = "https://go2-thailand.com/nl/travel-guides/thailand-with-kids/";
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Thailand met kinderen: plan een gezinsreis die haalbaar blijft",
      description:
        "Kies gezinsritme, bestemmingsbasissen, transfermarge, kamerfit en activiteiten zonder vaste prijs- of beste-eilandclaims.",
      image: "https://go2-thailand.com/images/redesign/thailand-family-travel-hero-v2.webp",
      url: pageUrl,
      inLanguage: "nl-NL",
      author: { "@type": "Organization", name: "GO2 Thailand" },
      publisher: { "@type": "Organization", name: "GO2 Thailand" },
      dateModified: "2026-07-31",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Thailandbasissen voor een gezinsreis",
      numberOfItems: bases.length,
      itemListElement: bases.map((base, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: base.title,
        url: `https://go2-thailand.com/nl${base.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Thailand", item: "https://go2-thailand.com/nl/" },
        { "@type": "ListItem", position: 2, name: "Reisgidsen", item: "https://go2-thailand.com/nl/travel-guides/" },
        { "@type": "ListItem", position: 3, name: "Thailand met kinderen", item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Thailand met kinderen: route, reistijd en gezinsplanning"
        description="Plan Thailand met kinderen op leeftijd, tempo, basissen, transfers, kamerfit en activiteiten. Inclusief echte PAA-vragen en actuele controlepunten."
        ogImage="https://go2-thailand.com/images/redesign/thailand-family-travel-hero-v2.webp"
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template="thailand-with-kids-nl" className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-family-travel-hero-v2.webp"
          imageAlt="Gezin plant met kaart en telefoon de volgende reisstap aan een Bangkokse rivierpier"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Reisgidsen", href: "/travel-guides/" },
            { label: "Met kinderen" },
          ]}
          eyebrow="Minder wisselen, meer meemaken"
          title={<>Thailand samen.<br /><span className="text-saffron-light">Op jullie tempo.</span></>}
          subtitle="Bouw de reis rond energie, slaap en transfers—niet rond zoveel mogelijk stops."
          description="Vergelijk gezinsfit, routebelasting, kamerindeling, weer en zorgtoegang vóór je hotels en activiteiten vastzet. Leeftijd is een startpunt, geen veiligheidskeurmerk."
          actions={[
            { label: "Vind jullie gezinsritme", href: "#gezinsritme", kind: "primary" },
            { label: "Bouw de route", href: "#route", kind: "secondary" },
          ]}
          contentTone="light"
          gradientClassName="bg-[linear-gradient(90deg,rgba(5,35,29,0.97)_0%,rgba(5,35,29,0.88)_38%,rgba(5,35,29,0.2)_66%,rgba(5,35,29,0.04)_100%)]"
          imageClassName="object-cover object-[68%_center]"
          titleClassName="max-w-[710px] text-[4rem] leading-[0.84] !text-white sm:text-[5.1rem] lg:text-[5.8rem]"
          subtitleClassName="max-w-[590px] text-[1.4rem] leading-[1.1] !text-white sm:text-[1.65rem]"
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white/75"
        />

        <PageSectionNav
          items={[
            { href: "#gezinsritme", label: "Gezinsritme", icon: UsersRound },
            { href: "#basissen", label: "Basissen", icon: MapPinned },
            { href: "#route", label: "Route", icon: Route },
            { href: "#boeken", label: "Boeken", icon: Hotel },
            { href: "#vragen", label: "Vragen", icon: Sparkles },
          ]}
        />

        <div>
          <section id="gezinsritme" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading
                eyebrow="Begin bij jullie echte dag"
                title={<>Leeftijd verandert<br />dezelfde bestemming</>}
                description={<>Gebruik leeftijd om praktische vragen te stellen, niet om een activiteit automatisch veilig te noemen. Leg daarna de <Link href="/practical-info/health-vaccinations/" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">gezondheidsvoorbereiding</Link> en <Link href="/travel-guides/health-hospitals-thailand/" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">zorgroute</Link> naast jullie reisplan.</>}
              />
              <div className="mt-9 grid gap-4 lg:grid-cols-3">
                {familyProfiles.map(({ title, eyebrow, copy, avoid, icon: Icon }, index) => (
                  <article key={title} className="relative overflow-hidden rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card">
                    <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Icon size={23} aria-hidden="true" /></span><span className="font-display text-5xl font-semibold text-jade/10">0{index + 1}</span></div>
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{eyebrow}</p>
                    <h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-sm font-medium leading-6 text-charcoal/70">{copy}</p>
                    <p className="mt-5 border-t border-jade/10 pt-5 text-xs font-medium leading-5 text-charcoal/55"><strong className="text-jade">Controleer:</strong> {avoid}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="basissen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading
                eyebrow="Vier verschillende reisdagen"
                title="Kies basissen, geen winnaar"
                description="Een bestemming is gezinsvriendelijk wanneer woning, route, zorg, eten, weer en activiteiten voor jullie concrete gezin samenwerken."
              />
              <div className="mt-9 grid gap-5 md:grid-cols-2">
                {bases.map((base) => (
                  <Link key={base.title} href={base.href} className="group grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-[240px] overflow-hidden"><Image src={base.image} alt={`${base.title} als mogelijke gezinsbasis`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /></div>
                    <div className="flex flex-col p-6">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{base.tag}</p>
                      <h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{base.title}</h3>
                      <p className="mt-4 text-xs font-medium leading-5 text-charcoal/68">{base.fit}</p>
                      <p className="mt-4 border-t border-jade/10 pt-4 text-xs leading-5 text-charcoal/55"><strong className="text-jade">Afweging:</strong> {base.tradeoff}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-extrabold text-jade">Open bestemming <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" aria-hidden="true" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="route" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <div className="grid gap-8 lg:grid-cols-[0.67fr_1.33fr] lg:items-start">
                <SectionHeading
                  eyebrow="Voorbeeldritme, geen vaste duur"
                  title="Een route met ademruimte"
                  description="Gebruik deze vier functies in elke reisduur. Hoe jonger het gezin of hoe zwaarder de transfer, hoe belangrijker extra nachten en lege dagdelen worden."
                />
                <ol className="relative grid gap-4 sm:grid-cols-2">
                  <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true"><path d="M170 130 C340 40 370 260 510 260 S720 470 860 385" fill="none" stroke="#F39B32" strokeWidth="3" strokeDasharray="7 12" opacity="0.75" /></svg>
                  {routeRhythm.map(({ step, title, detail, icon: Icon }) => (
                    <li key={step} className="relative z-10 min-h-[230px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                      <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade text-saffron"><Icon size={20} aria-hidden="true" /></span><span className="text-[10px] font-extrabold tracking-[0.15em] text-saffron-dark">STAP {step}</span></div>
                      <h3 className="mt-7 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{detail}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 grid overflow-hidden rounded-[1.7rem] bg-jade text-white shadow-editorial-card lg:grid-cols-[0.84fr_1.16fr]">
                <div className="relative min-h-[340px]"><Image src="/images/redesign/bangkok-first-day-kit.webp" alt="Compacte reisbagage en dagplanning voor een gezin in Bangkok" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" /></div>
                <div className="p-7 lg:p-10">
                  <p className="eyebrow !text-saffron-light">Transfer is onderdeel van de dag</p>
                  <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Tel iedere handoff, niet alleen de rijtijd</h2>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {[{title:"Deur tot deur",copy:"Hotel uit, wachten, terminal, rit, bagage en nieuwe kamer.",icon:Clock3},{title:"Plan B",copy:"Wat gebeurt er bij regen, zeecondities, vertraging of vermoeidheid?",icon:ShieldCheck},{title:"Zit- en slaapfit",copy:"Controleer het echte voertuig, stoeltype en nachtcomfort.",icon:TrainFront},{title:"Aankomsttaak",copy:"Bewaar energie voor eten, inchecken en de eerste nacht.",icon:BedDouble}].map(({title,copy,icon:Icon})=><article key={title} className="rounded-xl border border-white/12 bg-white/7 p-4"><Icon size={18} className="text-saffron-light" aria-hidden="true" /><h3 className="mt-3 font-display text-xl font-semibold text-white">{title}</h3><p className="mt-2 text-xs leading-5 text-white/62">{copy}</p></article>)}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="boeken" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading eyebrow="Vergelijk het echte gezinsproduct" title="Kamer en activiteit vóór de prijs" description="Een lage vanafprijs zegt niets wanneer bezetting, bedden, transfer, minimumleeftijd of annuleringsvoorwaarden niet passen." />
              <div className="mt-9 grid gap-5 lg:grid-cols-2">
                <article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card">
                  <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Hotel size={23} aria-hidden="true" /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Verblijven via Trip.com</p><h3 className="mt-1 font-display text-[2rem] font-semibold leading-none text-jade">Controleer de familiekamer</h3></div></div>
                  <ul className="mt-7 space-y-3">{hotelChecks.map(item=><li key={item} className="flex gap-3 text-xs font-medium leading-5 text-charcoal/68"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-jade text-saffron"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{item}</li>)}</ul>
                  <a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group mt-7 min-h-12 px-6">Bekijk actuele gezinsverblijven <ExternalLink size={15} className="text-saffron" aria-hidden="true" /></a>
                  <AffiliateDisclosure className="mt-3">Affiliate-link: controleer de volledige gezinsprijs en voorwaarden bij Trip.com. Wij kunnen commissie ontvangen zonder extra kosten voor jou.</AffiliateDisclosure>
                </article>
                <article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card">
                  <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><FerrisWheel size={23} aria-hidden="true" /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Activiteiten via Klook</p><h3 className="mt-1 font-display text-[2rem] font-semibold leading-none text-jade">Controleer de hele excursiedag</h3></div></div>
                  <ul className="mt-7 space-y-3">{activityChecks.map(item=><li key={item} className="flex gap-3 text-xs font-medium leading-5 text-charcoal/68"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-jade text-saffron"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{item}</li>)}</ul>
                  <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Bekijk actuele activiteiten <ExternalLink size={15} aria-hidden="true" /></a>
                  <AffiliateDisclosure className="mt-3">Affiliate-link: aanbod, leeftijdsregels, beschikbaarheid en prijs kunnen wijzigen. Klook betaalt mogelijk commissie aan GO2 Thailand.</AffiliateDisclosure>
                </article>
              </div>
              <p className="mt-5 max-w-[900px] text-xs font-medium leading-6 text-charcoal/58">Geen Amazon-blok op deze owner: een generiek reisproduct lost de kernvraag—route, tempo en gezinsfit—niet beter op. Productkeuzes blijven op de aparte paklijstowner, waar maat, verkoper en actuele OneLink-bestemming controleerbaar zijn.</p>
            </div>
          </section>

          <FaqSplitSection
            eyebrow="Echte zoekvragen"
            title="Veelgestelde vragen over Thailand met kinderen"
            description="De antwoorden vervangen vaste prijs- en beste-bestemmingclaims door een controleerbaar gezinsbesluit."
            items={faqs}
          />

          <RelatedGuidesSection
            title="Maak de gezinsroute verder af"
            guides={[
              { title: "Thailand voor het eerst", description: "Orden aankomst, geld, SIM, vervoer, veiligheid en de eerste dagen.", href: "/thailand-for-first-timers/", image: "/images/redesign/bangkok-first-time-hero.webp" },
              { title: "Eilanden vergelijken", description: "Vergelijk transferketen, kustprofiel, seizoen en dagelijkse voorzieningen.", href: "/islands/", image: "/images/redesign/stay-island-hideaway.webp" },
              { title: "Zorg & ziekenhuizen", description: "Sla noodnummers op en bereid verzekerings- en zorgdocumenten voor.", href: "/travel-guides/health-hospitals-thailand/", image: "/images/redesign/thailand-health-hospitals-hero-v2.webp" },
            ]}
          />

          <div id="bronnen">
            <SourceMethodSection
              title="Gezinsfit vraagt actuele context"
              description="Nederlandse PAA’s zijn op 31 juli 2026 zichtbaar gecontroleerd. Veiligheid, gezondheid, weer en productvoorwaarden kunnen veranderen; gebruik officiële bronnen en actuele offertes voor je eigen gezin."
              sources={[
                { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actuele regionale risico’s, voorbereiding en hulp bij noodsituaties." },
                { title: "Travel and health", creator: "World Health Organization", url: "https://www.who.int/health-topics/travel-and-health", note: "Primaire context dat risico’s afhangen van reiziger, reisvorm en bestemming, met extra aandacht voor jonge kinderen." },
                { title: "Thailand", creator: "GGD Reisvaccinaties", url: "https://www.ggdreisvaccinaties.nl/land/thailand", note: "Bestemmingsinformatie als voorbereiding op persoonlijk advies bij GGD, huisarts of reisarts." },
                { title: "Familycation", creator: "Tourism Authority of Thailand", url: "https://tourismproduct.tourismthailand.org/en/database/ebook/familycation", note: "Officiële toeristische inspiratie; opening, geschiktheid en voorwaarden blijven per aanbieder te controleren." },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
