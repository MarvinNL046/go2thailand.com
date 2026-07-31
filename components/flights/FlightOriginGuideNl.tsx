import {
  ArrowRight,
  BaggageClaim,
  CalendarSearch,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Luggage,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  TicketCheck,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import { withSubId } from "../../lib/affiliates";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

interface FlightRoute {
  code: string;
  from: string;
  fromName: string;
  tier: "domestic" | "regional" | "long-haul" | "search";
  partnerUrl: string;
}

const SLUG: Record<string, string> = {
  "bkk-to-hkt": "bangkok",
  "dmk-to-hkt": "bangkok-dmk",
  "cnx-to-hkt": "chiang-mai",
  "usm-to-hkt": "koh-samui",
  "sin-to-hkt": "singapore",
  "kul-to-hkt": "kuala-lumpur",
  "hkg-to-hkt": "hong-kong",
  "icn-to-hkt": "seoul",
  "dxb-to-hkt": "dubai",
  "lax-to-hkt": "lax",
  "jfk-to-hkt": "jfk",
  "sfo-to-hkt": "sfo",
  "lhr-to-hkt": "london",
  "ams-to-hkt": "amsterdam",
};

export default function FlightOriginGuideNl({
  route,
  siblings,
  generic,
}: {
  route: FlightRoute;
  siblings: FlightRoute[];
  generic: FlightRoute | null;
}) {
  const slug = SLUG[route.code];
  const isAmsterdam = route.code === "ams-to-hkt";
  const shortName = route.fromName.replace(/\s*\([^)]*\)\s*/g, "").trim();
  const currentFlights = withSubId(
    route.partnerUrl || generic?.partnerUrl || "https://trip.tpo.lv/8K2VZTtC",
    `${slug}-phuket-flight-owner-nl-live`,
  );
  const canonical = `https://go2-thailand.com/nl/flights-to-phuket/${slug}/`;
  const connectionLabel =
    route.tier === "domestic"
      ? "binnenlandse verbinding"
      : route.tier === "regional"
        ? "regionale verbinding"
        : "langeafstandverbinding";
  const faqs = [
    {
      question: `Hoe lang duurt een vlucht van ${shortName} naar Phuket?`,
      answer:
        "De totale duur verandert per datum, overstap en ticket. Vergelijk daarom niet alleen de vliegtijd, maar ook wachttijd, terminalwissel, immigratie en de rit vanaf HKT. De provider toont de actuele totale reis voor jouw keuze.",
    },
    {
      question: `Kun je rechtstreeks vliegen van ${shortName} naar Phuket?`,
      answer:
        "Controleer dit voor jouw exacte reisdata. Routes en seizoensschema’s veranderen. Lees in het zoekresultaat of de vlucht werkelijk non-stop is, één verbinding heeft of als self-transfer wordt verkocht.",
    },
    {
      question: `Wat is de beste overstap van ${shortName} naar Phuket?`,
      answer:
        "Er is geen universeel beste hub. Kies op totale duur, tijdstip, terminal, bagage, transitregels en bescherming bij vertraging. Eén doorgaand ticket is meestal eenvoudiger dan losse tickets.",
    },
    {
      question: `Wat kost een vliegticket van ${shortName} naar Phuket?`,
      answer:
        "Een actueel tarief hangt af van data, bagage, cabine, betaalmethode en voorwaarden. Vergelijk dezelfde ticketinhoud en controleer het totaal bij de aanbieder; deze gids bevriest geen prijsband.",
    },
    {
      question: "Moet je bagage opnieuw inchecken tijdens de overstap?",
      answer:
        "Dat hangt af van ticket, airlinecombinatie en luchthaven. Controleer dit schriftelijk vóór betaling. Bij losse tickets moet je vaak rekening houden met immigratie, bagage ophalen en opnieuw inchecken.",
    },
    {
      question: "Wat gebeurt er als je de aansluiting mist?",
      answer:
        "Bij één doorgaand ticket kan de uitvoerende maatschappij verantwoordelijk zijn voor herroutering volgens de ticketvoorwaarden. Bij self-transfer ligt meer risico bij de reiziger. Controleer ticket en verzekering vooraf.",
    },
    {
      question: "Op welke luchthaven kom je aan in Phuket?",
      answer:
        "Phuket International Airport gebruikt code HKT. Plan daarna de verbinding naar je echte hotelpin; reistijd en vervoersopties verschillen per kust en aankomsttijd.",
    },
  ];
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Vliegen van ${shortName} naar Phuket`,
      description: `Keuzehulp voor een vlucht van ${route.from} naar HKT.`,
      url: canonical,
      inLanguage: "nl-NL",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://go2-thailand.com/nl/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Vluchten naar Phuket",
          item: "https://go2-thailand.com/nl/flights-to-phuket/",
        },
        { "@type": "ListItem", position: 3, name: shortName, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title={`Vliegen ${shortName} naar Phuket: route en overstap`}
        description={`Vergelijk hoe je van ${route.from} naar Phuket (HKT) vliegt. Met overstap-, bagage-, ticket- en aankomstchecks plus actuele vluchtopties.`}
      >
        <link rel="canonical" href={canonical} />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://go2-thailand.com/flights-to-phuket/${slug}/`}
        />
        <link rel="alternate" hrefLang="nl" href={canonical} />
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>
      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/phuket-airport-arrival-hero.webp"
          imageAlt={`Reizigers met bagage onderweg voor een vlucht van ${shortName} naar Phuket`}
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Vluchten naar Phuket", href: "/flights-to-phuket/" },
            { label: shortName },
          ]}
          eyebrow={`${route.from} → HKT · ${connectionLabel}`}
          title={
            <>
              Van {shortName}
              <br />
              <span className="text-saffron-dark">naar Phuket.</span>
            </>
          }
          subtitle={
            isAmsterdam
              ? "Kies de overstap die de héle reis laat werken."
              : "Vergelijk de verbinding, niet alleen het tarief."
          }
          description={
            isAmsterdam
              ? "Vanaf Schiphol bepaalt de combinatie van hub, ticketstructuur en bagage of je ontspannen op HKT aankomt. Bouw de reis vanaf één logisch ticket — of neem self-transfer alleen bewust."
              : `Deze ${connectionLabel} verandert per datum. Controleer totale duur, overstap, bagage en bescherming voordat je een actuele optie boekt.`
          }
          actions={[
            { label: "Bouw je route", href: "#route", kind: "primary" },
            {
              label: "Bekijk actuele vluchten",
              href: currentFlights,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De externe vluchtknop is een affiliate-link. Wij kunnen commissie ontvangen zonder extra kosten voor jou. Route, actuele prijs, bagage en voorwaarden staan bij de aanbieder."
          titleClassName="max-w-[700px] text-[4rem] leading-[0.86] sm:text-[5rem] lg:text-[5.7rem]"
        />
        <PageSectionNav
          label="Op deze vliegroute"
          items={[
            { href: "#route", label: "Routekeuze", icon: Waypoints },
            { href: "#overstap", label: "Overstap", icon: Route },
            { href: "#tijd", label: "Reistijd", icon: Clock3 },
            { href: "#ticket", label: "Ticketcheck", icon: TicketCheck },
            { href: "#aankomst", label: "Aankomst", icon: MapPin },
            { href: "#vragen", label: "Vragen", icon: ShieldCheck },
          ]}
        />

        <section
          id="route"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="De routebeslissing"
              title={
                <>
                  Drie verbindingen.
                  <br />
                  Andere gevolgen.
                </>
              }
              description="Dezelfde bestemming kan als doorgaand ticket, hubroute of self-transfer in de resultaten staan."
            />
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {[
                {
                  icon: TicketCheck,
                  title: "Eén ticket naar HKT",
                  copy: "Controleer of alle segmenten onder één boeking vallen en wat de airline bij een gemiste aansluiting doet.",
                  cue: "Minste losse schakels",
                },
                {
                  icon: Plane,
                  title: "Eén bewuste hub",
                  copy: "Kies op terminal, overstapkwaliteit, rustmoment en aankomsttijd — niet alleen op de kortste vermelde duur.",
                  cue: "Routekwaliteit",
                },
                {
                  icon: Waypoints,
                  title: "Self-transfer",
                  copy: "Reken immigratie, bagage, opnieuw inchecken en vertraging als jouw risico mee. Alleen met ruime buffer.",
                  cue: "Meer eigen risico",
                },
              ].map(({ icon: Icon, title, copy, cue }, index) => (
                <article
                  key={title}
                  className={`rounded-2xl border p-6 ${index === 2 ? "border-jade bg-jade text-ivory" : "border-jade/10 bg-white"}`}
                >
                  <Icon
                    className={
                      index === 2 ? "text-saffron" : "text-saffron-dark"
                    }
                  />
                  <p
                    className={`mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] ${index === 2 ? "text-saffron-light" : "text-saffron-dark"}`}
                  >
                    {cue}
                  </p>
                  <h3
                    className={`mt-2 font-display text-2xl font-semibold ${index === 2 ? "text-ivory" : "text-jade"}`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`mt-3 text-sm font-medium leading-7 ${index === 2 ? "text-ivory/65" : "text-charcoal/66"}`}
                  >
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="overstap"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
        >
          <div className="container-custom grid gap-9 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeading
              eyebrow="Overstap kiezen"
              title={
                <>
                  De beste hub
                  <br />
                  bestaat niet.
                </>
              }
              description="Een goede overstap past bij jouw ticket, tijdstip, mobiliteit, bagage en risicotolerantie."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Eén terminal of een duidelijke transfer",
                "Voldoende marge voor jouw situatie",
                "Bagage schriftelijk bevestigd",
                "Transit- en visaregels gecontroleerd",
                "Geen verborgen luchthavenwissel",
                "Aankomst op HKT op bruikbaar tijdstip",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-jade/10 bg-white p-5 text-sm font-bold text-jade"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-saffron-dark"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="tijd"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Hoe lang ben je onderweg?"
              title={
                <>
                  Tel de hele keten.
                  <br />
                  Niet alleen de vlucht.
                </>
              }
              description="Google en providers tonen actuele duurmodules. Gebruik die voor jouw data en voeg de delen toe die niet in ‘vliegtijd’ passen."
            />
            <div className="mt-9 grid gap-3 md:grid-cols-5">
              {[
                { n: "01", t: "Naar vertrek", c: "Trein, parkeren of hotel." },
                { n: "02", t: "Luchthaven", c: "Inchecken en security." },
                { n: "03", t: "Vlucht(en)", c: "Actuele segmentduur." },
                { n: "04", t: "Overstap", c: "Terminal, buffer, rust." },
                { n: "05", t: "HKT → hotel", c: "Immigratie, bagage, rit." },
              ].map((step) => (
                <article
                  key={step.n}
                  className="rounded-xl border border-jade/10 bg-white p-5"
                >
                  <span className="text-xs font-extrabold text-saffron-dark">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-jade">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-charcoal/60">
                    {step.c}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="ticket"
          className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-ivory lg:py-20"
        >
          <div className="container-custom grid gap-9 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="eyebrow !text-saffron-light">Voor je betaalt</p>
              <h2 className="font-display text-5xl font-semibold leading-[0.92]">
                Maak de tickets echt vergelijkbaar.
              </h2>
              <p className="mt-5 text-sm leading-7 text-ivory/65">
                Een lager basistarief wint pas wanneer bagage, stoel,
                betaaltoeslag, overstap en voorwaarden samen ook beter zijn.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Luggage,
                  t: "Bagage",
                  c: "Per segment, doorlabelen en extra kosten.",
                },
                {
                  icon: CalendarSearch,
                  t: "Wijzigen",
                  c: "Tariefregel, no-show en annuleringsroute.",
                },
                {
                  icon: ShieldCheck,
                  t: "Bescherming",
                  c: "Doorgaand ticket, self-transfer en polis.",
                },
                {
                  icon: BaggageClaim,
                  t: "Overstap",
                  c: "Immigratie, bagage en opnieuw inchecken.",
                },
              ].map(({ icon: Icon, t, c }) => (
                <article
                  key={t}
                  className="rounded-xl border border-white/12 bg-white/6 p-5"
                >
                  <Icon className="text-saffron" />
                  <h3 className="mt-4 font-display text-2xl font-semibold">
                    {t}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ivory/60">{c}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="aankomst"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[390px] overflow-hidden rounded-[1.5rem] bg-[url('/images/redesign/phuket-route-planning.webp')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                <p className="eyebrow !text-saffron-light">Aankomst HKT</p>
                <h2 className="font-display text-4xl font-semibold">
                  De reis eindigt bij je hotelpin.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-ivory/70">
                  Plan het laatste traject op aankomsttijd, bagage en kust. De
                  bestemming “Phuket” is groter dan één transferzone.
                </p>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-jade/10 bg-white p-7">
              <MapPin className="text-saffron-dark" />
              <h2 className="mt-5 font-display text-4xl font-semibold text-jade">
                Na de landing
              </h2>
              <ul className="mt-6 grid gap-4">
                {[
                  "Controleer officiële HKT-informatie.",
                  "Bewaar hotelnaam en kaartpin offline.",
                  "Kies vervoer op groep en aankomsttijd.",
                  "Plan de eerste avond bewust licht.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm font-semibold text-charcoal/70"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-saffron-dark"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/blog/phuket-airport/"
                className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-jade"
              >
                Open de Phuket Airport-gids{" "}
                <ArrowRight size={15} className="text-saffron-dark" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-16">
          <div className="container-custom grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Actuele inventaris</p>
              <h2 className="font-display text-4xl font-semibold text-jade sm:text-5xl">
                Controleer {route.from} → HKT voor jouw data.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-charcoal/65">
                Vergelijk totaalprijs, bagage, ticketstructuur, overstap en
                voorwaarden op hetzelfde moment.
              </p>
              <AffiliateDisclosure className="mt-4">
                Trip.com is een affiliatepartner. Wij voeren de vlucht niet uit
                en tonen geen redactionele prijs als live tarief.
              </AffiliateDisclosure>
            </div>
            <a
              href={currentFlights}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="btn-jade btn-jade-pattern group min-h-12 px-6"
            >
              Bekijk actuele vluchten{" "}
              <ExternalLink size={15} className="text-saffron" />
            </a>
          </div>
        </section>

        <section className="section-divider-bottom py-12">
          <div className="container-custom">
            <p className="eyebrow">Andere vertrekpunten</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {siblings
                .filter((item) => item.code !== route.code && SLUG[item.code])
                .slice(0, 7)
                .map((item) => (
                  <Link
                    key={item.code}
                    href={`/flights-to-phuket/${SLUG[item.code]}/`}
                    className="rounded-full border border-jade/12 bg-white px-4 py-2 text-xs font-bold text-jade hover:border-saffron/40"
                  >
                    {item.fromName}
                  </Link>
                ))}
              <Link
                href="/flights-to-phuket/"
                className="rounded-full bg-jade px-4 py-2 text-xs font-bold text-ivory"
              >
                Alle routes
              </Link>
            </div>
          </div>
        </section>
        <FaqSplitSection
          id="vragen"
          eyebrow={
            isAmsterdam
              ? "Zichtbare Google-NL-vragen"
              : "Veelgestelde routevragen"
          }
          title={`Vragen over ${shortName} naar Phuket`}
          description={
            isAmsterdam
              ? "De Amsterdam-vragen zijn zichtbaar gecontroleerd in vier Nederlandse Google-resultaten op 31 juli 2026. Antwoorden bevriezen geen dynamische dienstregeling of prijs."
              : "Antwoorden gebruiken routechecks in plaats van vaste prijzen, tijden of airlineschema’s."
          }
          items={faqs}
        />
        <SourceMethodSection
          title={
            isAmsterdam
              ? "Hybride onderzocht na een providerfout"
              : "Dynamische route, vaste controleprincipes"
          }
          description={
            isAmsterdam
              ? "De exacte route had geen DFS-rankingkeyword. Toen DFS-clusters geen bruikbare payload gaven, zijn vier zichtbare Google-NL-SERP’s gecontroleerd. Primaire bronnen blijven leidend voor vertrek, aankomst en passagiersrechten."
              : "Deze route gebruikt het gedeelde premium vluchtensysteem. Exacte schema’s, tarieven en bagagevoorwaarden blijven bij de actuele operator en provider."
          }
          sources={[
            {
              title: "Vertrek en overstappen",
              creator: "Royal Schiphol Group",
              url: "https://www.schiphol.nl/nl/",
              note: "Actuele vertrek- en luchthaveninformatie.",
            },
            {
              title: "Phuket International Airport",
              creator: "Airports of Thailand",
              url: "https://phuket.airportthai.co.th/",
              note: "Officiële HKT-passagiersinformatie.",
            },
            {
              title: "Passagiersrechten bij vliegreizen",
              creator: "Your Europe — Europese Unie",
              url: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_nl.htm",
              note: "Primair Europees kader waar toepasselijk.",
            },
          ]}
        />
      </main>
    </>
  );
}
