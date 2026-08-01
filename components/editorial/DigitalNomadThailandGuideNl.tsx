import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarRange,
  Check,
  ExternalLink,
  HousePlug,
  Laptop,
  MapPin,
  Router,
  ShieldCheck,
  Smartphone,
  WalletCards,
  Wifi,
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

const baseProfiles = [
  {
    title: "Bangkok",
    tag: "Grootstedelijk netwerk",
    fit: "Veel buurten, internationale verbindingen en specialistische voorzieningen.",
    tradeoff:
      "Reistijd, geluid, luchtkwaliteit en woninglocatie kunnen je werkdag sterker beïnvloeden.",
    href: "/city/bangkok/",
  },
  {
    title: "Chiang Mai",
    tag: "Noordelijk ritme",
    fit: "Compactere dagelijkse routine, veel cafés en een herkenbare remote-workcontext.",
    tradeoff:
      "Luchtkwaliteit is seizoensgevoelig; woning, wijk en werkplek moet je actueel controleren.",
    href: "/city/chiang-mai/",
  },
  {
    title: "Phuket of Krabi",
    tag: "Andamanbasis",
    fit: "Kustleven met luchthaven- of toerisme-infrastructuur en uiteenlopende woonzones.",
    tradeoff:
      "Afstanden, seizoen, toeristische druk en lokale mobiliteit kunnen het maandritme bepalen.",
    href: "/region/southern/",
  },
  {
    title: "Koh Samui",
    tag: "Eilandbasis",
    fit: "Gulf-eiland met dagelijkse voorzieningen en verschillende kustprofielen.",
    tradeoff:
      "Vlucht- of ferryketen, lokale ritten, weer en afstand tot zorg of werkplek tellen zwaarder.",
    href: "/city/koh-samui/",
  },
];

const workChecks = [
  {
    title: "Werkplek",
    copy: "Vraag naar een echte tafel, stoel, daglicht, geluid en videogesprekruimte—not alleen “laptopvriendelijk”.",
    icon: Laptop,
  },
  {
    title: "Verbinding",
    copy: "Test wifi op jouw werkuren en regel een onafhankelijke mobiele backup die op je toestel werkt.",
    icon: Wifi,
  },
  {
    title: "Stroom",
    copy: "Controleer stopcontact, adapter, apparaatwattage, laadstrategie en wat je doet bij uitval.",
    icon: Router,
  },
  {
    title: "Tijdzone",
    copy: "Zet vaste overlegvensters naast slaap, eten, verkeer en seizoensgebonden hitte of regen.",
    icon: CalendarRange,
  },
  {
    title: "Beleid",
    copy: "Volg het apparaat-, netwerk- en reisbeleid van je werkgever of opdrachtgever.",
    icon: ShieldCheck,
  },
  {
    title: "Herstel",
    copy: "Plan werkdagen en vrije dagen; permanent onderweg zijn is geen duurzaam maandritme.",
    icon: BriefcaseBusiness,
  },
];

const faqs = [
  {
    question: "Waar zitten veel digital nomads?",
    answer:
      "Bangkok en Chiang Mai hebben een zichtbare remote-workcontext, maar “veel nomads” is geen kwaliteitsgarantie. Phuket, Krabi en Koh Samui passen soms beter bij kustleven. Kies op woning, werkplek, seizoen, tijdzone, zorg, mobiliteit en de community die jij daadwerkelijk nodig hebt.",
  },
  {
    question: "Heeft Thailand een visum voor digitale nomaden?",
    answer:
      "Thailand heeft de Destination Thailand Visa-route voor bepaalde doelen, waaronder workcation/remote-workprofielen. Voorwaarden en bewijs hangen van je situatie af en kunnen wijzigen. Controleer de officiële status en gebruik onze afzonderlijke DTV-owner; deze pagina geeft geen individuele visumbeoordeling.",
  },
  {
    question: "Wat verdien je per maand in Thailand?",
    answer:
      "Je inkomen hangt af van werkgever, opdrachtgever, vakgebied, contract, valuta, belastingpositie en werkrecht—not van Thailand als bestemming. Gebruik geen online “nomad salary” als persoonlijke verwachting en vraag professioneel advies bij grensoverschrijdend werk.",
  },
  {
    question: "Hoeveel geld heb je nodig om in Thailand te wonen?",
    answer:
      "Maak een maandscenario met actuele woningquote, borg, nutsvoorzieningen, internet, SIM, verzekering, vervoer, eten, coworking en visum- of administratieve kosten. Voeg een vertrek- en noodbuffer toe. Eén gemiddeld maandbedrag past niet bij iedere basis of verblijfsstatus.",
  },
];

export default function DigitalNomadThailandGuideNl() {
  const subId = useSubId();
  const tripHref = withPlacementSubId(
    TRIP_GENERIC,
    subId,
    "digital-nomad-thailand-nl-base-check",
  );
  const pageUrl = "https://go2-thailand.com/nl/thailand-index/digital-nomad/";
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Digital nomad in Thailand: kies een werkbare leefbasis",
      description:
        "Vergelijk Thailandbasissen op werkplek, internetbackup, seizoen, woning, mobiliteit en dagelijks ritme.",
      image:
        "https://go2-thailand.com/images/redesign/digital-nomad-thailand-hero-v2.webp",
      url: pageUrl,
      inLanguage: "nl-NL",
      author: { "@type": "Organization", name: "GO2 Thailand" },
      publisher: { "@type": "Organization", name: "GO2 Thailand" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Thailandbasissen voor remote werken",
      numberOfItems: baseProfiles.length,
      itemListElement: baseProfiles.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `https://go2-thailand.com/nl${item.href}`,
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
        {
          "@type": "ListItem",
          position: 1,
          name: "Thailand",
          item: "https://go2-thailand.com/nl/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Reisindex",
          item: "https://go2-thailand.com/nl/thailand-index/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Digital nomad",
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Digital nomad Thailand: kies een werkbare basis"
        description="Vergelijk Thailandbasissen op woning, werkplek, internetbackup, seizoen, mobiliteit en dagelijks ritme—zonder vaste maandprijs of beste-stadranglijst."
        ogImage="https://go2-thailand.com/images/redesign/digital-nomad-thailand-hero-v2.webp"
      >
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>
      <div
        data-premium-template="digital-nomad-thailand-nl"
        className="overflow-hidden bg-canvas text-charcoal"
      >
        <EditorialHero
          image="/images/redesign/digital-nomad-thailand-hero-v2.webp"
          imageAlt="Remote werker aan een houten bureau met uitzicht op groen en noord-Thaise daken"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Reisindex", href: "/thailand-index/" },
            { label: "Digital nomad" },
          ]}
          eyebrow="Kies een leefritme, geen nummer-éénstad"
          title={
            <>
              Remote werken.
              <br />
              <span className="text-saffron">Leven dat ook werkt.</span>
            </>
          }
          subtitle="De beste basis bestaat pas met jouw werkdag."
          description="Vergelijk woning, werkplek, internetbackup, tijdzone, seizoen en dagelijkse mobiliteit. Regel visum en werkstatus bij hun eigen officiële owner."
          actions={[
            { label: "Vergelijk leefbases", href: "#bases", kind: "primary" },
            {
              label: "Controleer DTV",
              href: "/visa/digital-nomad-visa/",
              kind: "secondary",
            },
          ]}
        titleClassName="max-w-[700px] text-[4rem] leading-[0.84] !text-white sm:text-[5.1rem] lg:text-[5.8rem]"
        subtitleClassName="max-w-[570px] text-[1.45rem] leading-[1.1] !text-white sm:text-[1.7rem]"
        descriptionClassName="mt-4 max-w-[600px] text-sm leading-7 !text-white/75"
          contentClassName="[&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          imageClassName="object-cover object-[70%_center]"
          gradientClassName="bg-[linear-gradient(90deg,rgba(4,42,34,.98)_0%,rgba(4,42,34,.91)_42%,rgba(4,42,34,.12)_70%,rgba(4,42,34,.03)_100%)]"
        />
        <PageSectionNav
          items={[
            { href: "#bases", label: "Leefbases", icon: MapPin },
            { href: "#werkdag", label: "Werkdag", icon: Laptop },
            { href: "#maand", label: "Maandcheck", icon: WalletCards },
            { href: "#vragen", label: "Vragen", icon: ShieldCheck },
          ]}
        />

        <section
          id="bases"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr] lg:items-end">
              <SectionHeading
                eyebrow="Vier basisprofielen"
                title="Vergelijk het dagelijks leven, niet de reputatie."
                description="Een bekende nomadstad kan slecht passen bij je beluren, gezondheid, seizoen of behoefte aan rust. Gebruik de profielen als shortlist en open daarna de lokale owner."
              />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/62">
                Communitygrootte, coworkingaanbod, internet en huur veranderen.
                Daarom publiceren we geen permanente beste-stadscore of
                verzonnen gemiddelde Mbps.
              </p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {baseProfiles.map((profile) => (
                <Link
                  key={profile.title}
                  href={profile.href}
                  className="group rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                >
                  <p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">
                    {profile.tag}
                  </p>
                  <h2 className="mt-2 font-display text-[2.2rem] font-semibold leading-none text-jade">
                    {profile.title}
                  </h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[.12em] text-jade/48">
                        Kan passen als
                      </p>
                      <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">
                        {profile.fit}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[.12em] text-jade/48">
                        Controleer vooral
                      </p>
                      <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">
                        {profile.tradeoff}
                      </p>
                    </div>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">
                    Open de lokale owner{" "}
                    <ArrowRight
                      size={13}
                      className="text-saffron-dark transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="werkdag"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[.66fr_1.34fr]">
            <SectionHeading
              eyebrow="Test vóór een maandboeking"
              title="Een mooie kamer is nog geen werkbasis."
              description="Vraag de host om concrete informatie en test de verbinding terwijl annuleren of verhuizen nog mogelijk is. Een café is een aanvulling, geen gegarandeerd kantoor."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {workChecks.map(({ title, copy, icon: Icon }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade">
                    <Icon size={19} />
                  </span>
                  <h2 className="mt-5 font-display text-[1.65rem] font-semibold leading-none text-jade">
                    {title}
                  </h2>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="maand"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="overflow-hidden rounded-[28px] bg-jade text-white lg:grid lg:grid-cols-[.82fr_1.18fr]">
              <div className="p-7 lg:p-10">
                <p className="eyebrow !text-saffron">
                  Maak je eigen maandscenario
                </p>
                <h2 className="font-display text-[3rem] font-semibold leading-[.9]">
                  Begin met de woningquote.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/64">
                  Controleer data, buurt, werkplek, nutsvoorzieningen, borg,
                  annulering en eventuele maandvoorwaarden. Voeg daarna zorg,
                  vervoer, eten, coworking en administratie toe.
                </p>
                <a
                  href={tripHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="btn-cream mt-7 text-saffron-dark"
                >
                  Bekijk actuele verblijfsopties <ExternalLink size={14} />
                </a>
                <AffiliateDisclosure className="mt-3 !text-white/55">
                  Gesponsorde Trip.com-link. De productpagina bezit actuele
                  prijs, beschikbaarheid en voorwaarden; een hotelplatform
                  vervangt geen huurcontract- of verblijfsadvies.
                </AffiliateDisclosure>
              </div>
              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                {[
                  "Woning + borg",
                  "Internet + mobiele backup",
                  "Zorg + verzekering",
                  "Lokaal vervoer",
                  "Werkplek + sport",
                  "Vertrek- en noodbuffer",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-jade p-5 text-xs font-bold text-white/68"
                  >
                    <Check size={16} className="shrink-0 text-saffron" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <p className="eyebrow">
                  Amazon OneLink · alleen voor de werktaak
                </p>
                <h2 className="font-display text-[2.25rem] font-semibold leading-none text-jade">
                  Stroombackup vóór gadgets.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "MOMAX reisadapter",
                    copy: "Controleer stekkertype, ingangsspanning en totaalwattage van je eigen apparaten.",
                    slug: "momax-travel-adapter",
                    icon: Router,
                  },
                  {
                    title: "UGREEN powerbank",
                    copy: "Controleer luchtvaartlimieten, USB-C-profiel, capaciteit en laptopcompatibiliteit.",
                    slug: "ugreen-25000-power-bank",
                    icon: Smartphone,
                  },
                ].map(({ title, copy, slug, icon: Icon }) => (
                  <a
                    key={slug}
                    href={`/go/${slug}/`}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="group rounded-xl border border-jade/10 bg-canvas p-5"
                  >
                    <Icon size={18} className="text-jade" />
                    <h3 className="mt-3 text-sm font-extrabold text-jade">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs font-medium leading-5 text-charcoal/60">
                      {copy}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-jade">
                      Bekijk actuele prijs{" "}
                      <ExternalLink size={12} className="text-saffron-dark" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection
          id="vragen"
          eyebrow="Echte Nederlandse zoekvragen"
          title="Veelgestelde vragen over digital nomad zijn in Thailand"
          description="De vragen zijn op 31 juli 2026 zichtbaar gecontroleerd in Google Nederland. Inkomen, maandkosten en visumstatus krijgen bewust geen generiek persoonlijk advies."
          items={faqs}
        />
        <RelatedGuidesSection
          eyebrow="Scheid de beslissingen"
          title="Regel status, verbinding en lang verblijf apart"
          guides={[
            {
              title: "DTV-visum Thailand",
              description:
                "Controleer officiële voorwaarden, bewijs en aanvraagroute voor jouw situatie.",
              href: "/visa/digital-nomad-visa/",
              image: "/images/redesign/thailand-entry-documents.webp",
              imageAlt: "Documenten voor verblijf in Thailand",
            },
            {
              title: "SIM & eSIM",
              description:
                "Kies je mobiele verbinding en backup op toestel, activatie en dekking.",
              href: "/travel-guides/sim-card-thailand/",
              image: "/images/redesign/esim-thailand-hero.webp",
              imageAlt: "Mobiele verbinding in Thailand",
            },
            {
              title: "Expat & lang verblijf",
              description:
                "Plan woning, zorg, betalen, mobiliteit en administratie zonder visumclaims te dupliceren.",
              href: "/travel-guides/expat-long-stay-thailand/",
              image: "/images/redesign/thailand-practical-hub-hero-nl.webp",
              imageAlt: "Lang verblijf in Thailand voorbereiden",
            },
          ]}
        />
        <SourceMethodSection
          eyebrow="Bronnen & ownergrens"
          title="Leefbasis en verblijfsrecht zijn niet hetzelfde"
          description="De SERP- en PAA-research bepaalt de vragen en ownergrens. Visum- en werkstatus blijven bij officiële Thaise bronnen en de DTV-owner; deze pagina vergelijkt alleen het praktische leef- en werkritme."
          sources={[
            {
              title: "DTV-informatie en consulaire diensten",
              creator: "Royal Thai Embassy The Hague",
              url: "https://hague.thaiembassy.org/",
              note: "Officiële startbron voor actuele visumcategorieën en consulaire verwijzingen voor Nederland.",
            },
            {
              title: "Thailand e-Visa",
              creator: "Ministry of Foreign Affairs Thailand",
              url: "https://www.thaievisa.go.th/",
              note: "Officieel aanvraagportaal; vereisten moeten voor de actuele aanvraag opnieuw worden gecontroleerd.",
            },
            {
              title: "Reisadvies Thailand",
              creator: "NederlandWereldwijd",
              url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
              note: "Actuele Nederlandse veiligheids-, document- en regiocontext.",
            },
            {
              title: "Bestemmingcontext",
              creator: "Tourism Authority of Thailand",
              url: "https://www.tourismthailand.org/Destinations",
              note: "Primaire bestemmingcontext; geen bron voor individueel werk-, belasting- of verblijfsadvies.",
            },
          ]}
        />
      </div>
    </>
  );
}
