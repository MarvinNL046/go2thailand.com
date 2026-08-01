import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  ExternalLink,
  HeartPulse,
  Home,
  KeyRound,
  Landmark,
  MapPinned,
  ShieldCheck,
  TrainFront,
  WalletCards,
} from "lucide-react";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";
import { TRIP_GENERIC, withPlacementSubId } from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";

const decisions = [
  {
    title: "Verblijfsstatus",
    label: "Altijd eerst",
    copy: "Bepaal welk officieel verblijfsdoel bij jouw situatie past. Een huurcontract, vliegticket of eerdere toelating geeft op zichzelf geen recht op langer verblijf.",
    href: "/visa/",
    cta: "Bekijk de visumroutes",
    icon: BadgeCheck,
  },
  {
    title: "Proefwonen",
    label: "Wijk vóór woning",
    copy: "Begin flexibel en test geluid, hitte, regen, boodschappen, internet, zorg en dagelijkse reistijd voordat je een langere woonkeuze maakt.",
    href: "/where-to-stay/",
    cta: "Vergelijk verblijfplaatsen",
    icon: KeyRound,
  },
  {
    title: "Zorg & dekking",
    label: "Voor vertrek regelen",
    copy: "Controleer vooraf wat je verzekering wel en niet dekt, welke zorg je nodig kunt hebben en hoe je een passende kliniek of ziekenhuis bereikt.",
    href: "/travel-guides/health-hospitals-thailand/",
    cta: "Lees de zorggids",
    icon: HeartPulse,
  },
  {
    title: "Geldscenario",
    label: "Eigen offertes",
    copy: "Reken met actuele woning-, borg-, energie-, vervoer-, verzekerings- en zorgquotes. Een gemiddeld maandbedrag is geen persoonlijk budget.",
    href: "/practical-info/atm-money/",
    cta: "Plan betalen en pinnen",
    icon: WalletCards,
  },
  {
    title: "Dagelijkse mobiliteit",
    label: "Routine boven vakantie",
    copy: "Meet deur-tot-deurtijd naar werk, zorg en boodschappen. Een aantrekkelijke woning kan onpraktisch zijn zonder bruikbare vervoersketen.",
    href: "/transport/",
    cta: "Open de vervoersgids",
    icon: TrainFront,
  },
];

const baseProfiles = [
  {
    title: "Bangkok",
    tag: "Netwerk & keuze",
    fit: "Veel buurten, specialistische zorg, internationale verbindingen en openbaar vervoer.",
    check: "Kies op dagelijkse route, niet alleen op een bekende wijknaam.",
    href: "/city/bangkok/",
  },
  {
    title: "Chiang Mai",
    tag: "Compact noordelijk ritme",
    fit: "Een kleinere stedelijke basis met verschillende woonwijken en een groot dagelijks aanbod.",
    check: "Neem seizoensgebonden luchtkwaliteit mee in je woon- en zorgkeuze.",
    href: "/city/chiang-mai/",
  },
  {
    title: "Kust of eiland",
    tag: "Leefstijl met logistiek",
    fit: "Phuket, Krabi en Koh Samui combineren kustleven met uiteenlopende voorzieningen.",
    check: "Test ferry- of vluchtketen, ziekenhuisafstand, regenperiode en lokale ritten.",
    href: "/region/southern/",
  },
  {
    title: "Hua Hin of kleinere stad",
    tag: "Rustiger dagelijks tempo",
    fit: "Kan passen als je minder grootstedelijke drukte en een vaste lokale routine zoekt.",
    check: "Controleer specialistische zorg, verbindingen en taalondersteuning persoonlijk.",
    href: "/city/hua-hin/",
  },
];

const phases = [
  {
    step: "01",
    title: "Oriënteer officieel",
    copy: "Leg verblijfsdoel, paspoortcontext, werk- of pensioensituatie en mogelijke verplichtingen naast actuele overheidsinformatie.",
  },
  {
    step: "02",
    title: "Test één echte routine",
    copy: "Boek flexibel, doe boodschappen, reis op normale uren, test internet en bezoek de voorzieningen die jij structureel nodig hebt.",
  },
  {
    step: "03",
    title: "Vraag offertes op",
    copy: "Vergelijk de volledige woonlast, verzekering, zorg, vervoer en vertrekbuffer—niet alleen huur of een online kostenindex.",
  },
  {
    step: "04",
    title: "Beslis met exitplan",
    copy: "Leg voorwaarden, opzegroute, documenten, noodcontacten en een financieel vertrekpad vast voordat je langdurige verplichtingen aangaat.",
  },
];

const faqs = [
  {
    question: "Hoe lang mag je in Thailand blijven als Nederlander?",
    answer:
      "Dat hangt af van je paspoort, verblijfsdoel, gekozen visum- of vrijstellingsroute en de actuele toelatingsbeslissing. Controleer vóór vertrek de Thaise ambassade, het officiële eVisa-portaal en je daadwerkelijke toelatingsstempel. Deze langverblijfgids vervangt geen visumadvies.",
  },
  {
    question: "Kan ik drie maanden naar Thailand?",
    answer:
      "Mogelijk, maar niet automatisch en niet via iedere route. Gebruik de actuele officiële voorwaarden voor jouw situatie en boek geen niet-wijzigbare lange woonperiode voordat je verblijfsstatus helder is. Onze visumpagina’s leggen de routes uit; de overheid beslist.",
  },
  {
    question: "Is Thailand een goede plek om te wonen voor expats?",
    answer:
      "Dat hangt minder van een ranglijst af dan van jouw verblijfsstatus, zorgbehoefte, budget, taal, klimaat, werk, mobiliteit en afstand tot Nederland. Een proefbasis in een realistische wijk geeft meer informatie dan een vakantieverblijf.",
  },
  {
    question: "Hoeveel geld heb je nodig om in Thailand te wonen?",
    answer:
      "Er is geen betrouwbaar universeel maandbedrag. Maak een persoonlijk scenario met actuele offertes voor wonen, borg, energie, internet, vervoer, verzekering, zorg, administratie en terugkeer. Houd een aparte nood- en vertrekbuffer aan.",
  },
  {
    question: "Kan ik AOW ontvangen als ik naar Thailand verhuis?",
    answer:
      "Je persoonlijke AOW-, verzekerings- en belastingpositie vraagt een officiële beoordeling. Controleer dit vóór emigratie rechtstreeks bij de SVB en NederlandWereldwijd en laat grensoverschrijdende gevolgen zo nodig professioneel toetsen. Deze pagina doet daar geen individuele uitspraak over.",
  },
];

export default function ExpatLongStayThailandGuideNl() {
  const subId = useSubId();
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, "expat-long-stay-nl-trial-base");
  const pageUrl = "https://go2-thailand.com/nl/travel-guides/expat-long-stay-thailand/";
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Lang verblijf in Thailand: van proefbasis naar woonbesluit",
      description:
        "Plan langer wonen in Thailand via verblijfsstatus, proefwonen, zorg, geld, mobiliteit en een veilige exitroute.",
      image: "https://go2-thailand.com/images/redesign/expat-long-stay-thailand-hero-v2.webp",
      url: pageUrl,
      inLanguage: "nl-NL",
      author: { "@type": "Organization", name: "GO2 Thailand" },
      publisher: { "@type": "Organization", name: "GO2 Thailand" },
      dateModified: "2026-07-31",
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
        { "@type": "ListItem", position: 3, name: "Lang verblijf", item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Lang verblijf Thailand: wonen als expat voorbereiden"
        description="Bereid een lang verblijf in Thailand voor via verblijfsstatus, proefwonen, zorg, budget, mobiliteit en officiële bronnen—zonder verouderde vaste bedragen."
        ogImage="https://go2-thailand.com/images/redesign/expat-long-stay-thailand-hero-v2.webp"
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template="expat-long-stay-thailand-nl" className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/expat-long-stay-thailand-hero-v2.webp"
          imageAlt="Man bereidt aan de eettafel in een Thais appartement een langer verblijf voor"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Reisgidsen", href: "/travel-guides/" },
            { label: "Lang verblijf" },
          ]}
          eyebrow="Maak van vakantie geen woonplan"
          title={<>Langer blijven.<br /><span className="text-saffron-light">Eerst goed landen.</span></>}
          subtitle="Van proefbasis naar een besluit dat ook buiten de vakantiebubbel werkt."
          description="Orden verblijfsstatus, woning, zorg, geld en dagelijkse mobiliteit vóór je langdurige verplichtingen aangaat. Officiële instanties blijven eigenaar van visum-, AOW- en belastingbesluiten."
          actions={[
            { label: "Start bij je verblijfsstatus", href: "#beslisroute", kind: "primary" },
            { label: "Bekijk officiële bronnen", href: "#bronnen", kind: "secondary" },
          ]}
          contentTone="light"
          gradientClassName="bg-[linear-gradient(90deg,rgba(6,32,27,0.96)_0%,rgba(6,32,27,0.87)_37%,rgba(6,32,27,0.22)_65%,rgba(6,32,27,0.06)_100%)]"
          imageClassName="object-cover object-[66%_center]"
          titleClassName="max-w-[700px] text-[4rem] leading-[0.84] !text-white sm:text-[5.1rem] lg:text-[5.8rem]"
          subtitleClassName="max-w-[590px] text-[1.4rem] leading-[1.1] !text-white sm:text-[1.65rem]"
          descriptionClassName="mt-4 max-w-[600px] text-sm leading-7 !text-white/75"
        />

        <PageSectionNav
          items={[
            { href: "#beslisroute", label: "Beslisroute", icon: MapPinned },
            { href: "#proefbasis", label: "Proefbasis", icon: Home },
            { href: "#wooncheck", label: "Wooncheck", icon: Building2 },
            { href: "#vragen", label: "Vragen", icon: ShieldCheck },
          ]}
        />

        <div>
          <section id="beslisroute" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading
                eyebrow="Vijf eigenaren, één besluit"
                title={<>Wat moet kloppen<br />vóór je langer blijft?</>}
                description={<>Deze onderdelen beïnvloeden elkaar, maar hebben niet dezelfde informatie-eigenaar. Begin bij de <Link href="/visa/" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">actuele verblijfsroute</Link>, leg daarna je <Link href="/practical-info/atm-money/" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">persoonlijke geldscenario</Link> en dagelijkse woonketen vast.</>}
              />
              <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {decisions.map(({ title, label, copy, href, cta, icon: Icon }) => (
                  <article key={title} className="group flex min-h-[330px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Icon size={21} aria-hidden="true" /></span>
                    <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{label}</p>
                    <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{copy}</p>
                    <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-extrabold text-jade transition hover:text-saffron-dark">{cta}<ArrowRight size={14} aria-hidden="true" /></Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="proefbasis" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
            <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Woon als bewoner"
                  title="Kies een proefbasis, geen definitieve winnaar"
                  description="Een stad past pas wanneer je normale week werkt. Vergelijk daarom het concrete wijkprofiel en de dagelijkse keten die jij nodig hebt."
                />
                <div className="mt-7 overflow-hidden rounded-2xl border border-jade/10 bg-white p-3 shadow-editorial-card">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <Image src="/images/redesign/thailand-practical-hub-hero-nl.webp" alt="Dagelijkse wijk in Thailand met lokale voorzieningen" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                  </div>
                  <p className="p-4 text-xs font-medium leading-6 text-charcoal/64">Test minstens één gewone werk- of weekdag: ochtendgeluid, warmte, ritten, supermarkt, internet, zorgroute en avondomgeving.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {baseProfiles.map((base, index) => (
                  <Link key={base.title} href={base.href} className="group rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:border-saffron/30">
                    <div className="flex items-center justify-between"><span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{base.tag}</span><span className="font-display text-3xl text-jade/18">0{index + 1}</span></div>
                    <h3 className="mt-5 font-display text-[2rem] font-semibold leading-none text-jade">{base.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-6 text-charcoal/72">{base.fit}</p>
                    <p className="mt-4 border-t border-jade/10 pt-4 text-xs leading-5 text-charcoal/58"><strong className="text-jade">Controleer:</strong> {base.check}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk de bestemming <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" aria-hidden="true" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="wooncheck" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <div className="rounded-[1.75rem] bg-jade p-6 text-white shadow-editorial-card lg:p-10">
                <div className="grid gap-8 lg:grid-cols-[0.67fr_1.33fr]">
                  <div>
                    <p className="eyebrow !text-saffron-light">Van plan naar proefweek</p>
                    <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] text-white">Vier controles vóór een langere verplichting</h2>
                    <p className="mt-5 text-sm font-medium leading-7 text-white/68">Gebruik deze volgorde ook wanneer je al vaker in Thailand bent geweest. Vakantie-ervaring bewijst nog geen woonfit.</p>
                  </div>
                  <ol className="grid gap-3 sm:grid-cols-2">
                    {phases.map((phase) => (
                      <li key={phase.step} className="rounded-2xl border border-white/12 bg-white/7 p-5">
                        <span className="text-[10px] font-extrabold tracking-[0.16em] text-saffron-light">STAP {phase.step}</span>
                        <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-white">{phase.title}</h3>
                        <p className="mt-3 text-xs font-medium leading-6 text-white/65">{phase.copy}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-8 grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card lg:grid-cols-[1fr_0.82fr]">
                <div className="p-7 lg:p-9">
                  <p className="eyebrow">Tijdelijk en wijzigbaar</p>
                  <h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">Boek je eerste basis als onderzoek</h2>
                  <p className="mt-5 max-w-[650px] text-sm font-medium leading-7 text-charcoal/68">Een flexibel hotel of aparthotel kan handig zijn voor de eerste wijkcheck. Controleer altijd actuele voorwaarden, totale prijs, locatie en wijzigbaarheid bij de aanbieder. Trip.com is geen huurcontract- of immigratieadviseur.</p>
                  <a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group mt-6 min-h-12 px-6">Bekijk actuele verblijven bij Trip.com <ExternalLink size={15} aria-hidden="true" className="text-saffron" /></a>
                  <AffiliateDisclosure className="mt-3">Affiliate-link: bij een boeking kan GO2 Thailand commissie ontvangen, zonder extra kosten voor jou.</AffiliateDisclosure>
                </div>
                <div className="relative min-h-[280px] bg-mist">
                  <Image src="/images/redesign/stay-bangkok-rooftop.webp" alt="Tijdelijk verblijf in Bangkok als proefbasis" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
              </div>
            </div>
          </section>

          <FaqSplitSection
            eyebrow="Echte zoekvragen"
            title="Veelgestelde vragen over langer wonen"
            description="De antwoorden bewaken de grens tussen reisvoorbereiding en individuele visum-, pensioen- of belastingbeoordeling."
            items={faqs}
          />

          <RelatedGuidesSection
            title="Maak je langverblijfplan concreet"
            guides={[
              { title: "Visumroutes", description: "Vergelijk het officiële verblijfsdoel vóór je woon- of reisverplichtingen aangaat.", href: "/visa/", image: "/images/redesign/thailand-visa-hero.webp" },
              { title: "Geld & pinnen", description: "Plan betaalmiddelen, ATM-keuzes en een eigen financiële noodroute.", href: "/practical-info/atm-money/", image: "/images/redesign/thailand-money-atm-hero-nl.webp" },
              { title: "Digital nomad", description: "Kies een werkbare basis op internet, woning, tijdzone en dagelijks ritme.", href: "/thailand-index/digital-nomad/", image: "/images/redesign/digital-nomad-thailand-hero-v2.webp" },
            ]}
          />

          <div id="bronnen">
            <SourceMethodSection
              title="Controleer besluiten bij de eigenaar"
              description="Zoekvragen en PAA’s zijn op 31 juli 2026 handmatig in de Nederlandse Google-resultaten onderzocht. Regels kunnen daarna wijzigen; daarom linken we voor beslissingen rechtstreeks naar officiële instanties."
              sources={[
                { title: "Thai eVisa official website", creator: "Ministry of Foreign Affairs Thailand", url: "https://www.thaievisa.go.th/", note: "Officieel portaal voor actuele eVisa-informatie en het aanvraagproces." },
                { title: "Royal Thai Embassy, The Hague", creator: "Thaise ambassade", url: "https://hague.thaiembassy.org/", note: "Ambassade-informatie voor aanvragers in Nederland; controleer altijd de actuele route." },
                { title: "Wonen en werken in het buitenland", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/wonen-werken", note: "Nederlandse overheidsinformatie over wonen, werken en zaken regelen vanuit het buitenland." },
                { title: "AOW", creator: "Sociale Verzekeringsbank", url: "https://www.svb.nl/nl/aow", note: "Officiële eigenaar van persoonlijke AOW-informatie en wijzigingen bij wonen buiten Nederland." },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
