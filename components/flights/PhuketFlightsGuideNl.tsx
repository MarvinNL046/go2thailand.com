import {
  ArrowRight,
  BaggageClaim,
  CalendarSearch,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Gauge,
  Luggage,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  TicketCheck,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";
import { withSubId } from "../../lib/affiliates";

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

const faqs = [
  {
    question: "Kun je rechtstreeks naar Phuket vliegen?",
    answer:
      "Dat hangt af van vertrekstad, seizoen en actuele dienstregeling. Vanuit Nederland is een overstap doorgaans de relevante zoekroute. Controleer voor jouw data of een resultaat één doorgaand ticket is en of bagage wordt doorgelabeld.",
  },
  {
    question: "Hoeveel uur is het vliegen naar Phuket?",
    answer:
      "De kale vliegtijd vertelt niet de hele reis. Vertrekluchthaven, overstapduur, luchthavenwissel, immigratie en het vervoer vanaf HKT bepalen de deur-tot-deurreis. Vergelijk daarom totale duur én ticketstructuur op dezelfde data.",
  },
  {
    question: "Waar vlieg je op als je naar Phuket gaat?",
    answer:
      "De luchthaven van Phuket gebruikt de code HKT. Controleer bij een verbinding via Bangkok ook de code van de Bangkok-luchthaven: BKK en DMK zijn verschillende luchthavens.",
  },
  {
    question: "Kun je rechtstreeks vliegen van Amsterdam naar Phuket?",
    answer:
      "Behandel dit als een actuele dienstregelingsvraag, niet als een blijvend ja of nee. Zoek AMS–HKT voor jouw exacte data en controleer of het resultaat werkelijk non-stop is of een verbinding op één ticket.",
  },
  {
    question: "Wat zijn de goedkoopste vliegtickets naar Phuket?",
    answer:
      "Er is geen vaste goedkoopste maatschappij of maand voor iedere reiziger. Vergelijk dezelfde data, bagage, betaalmethode, luchthaven, overstap en wijzigingsvoorwaarden. Een lager basistarief kan na bagage of losse tickets duurder uitvallen.",
  },
  {
    question: "Is vliegen via Bangkok handig?",
    answer:
      "Dat kan praktisch zijn, vooral binnen één ticket. Bij losse tickets moet je extra ruimte houden voor immigratie, bagage, opnieuw inchecken en vertraging. Controleer bovendien dat aankomst en vertrek niet over BKK en DMK zijn verdeeld.",
  },
  {
    question: "Wanneer boek je een vlucht naar Phuket?",
    answer:
      "Werk met een prijsalert en vergelijk een band rond je reisdata. Boek zodra totaalprijs, bagage, verbinding en voorwaarden samen passen; een universeel beste aantal weken bestaat niet voor alle routes en seizoenen.",
  },
  {
    question: "Hoe kom je vanaf Phuket Airport verder?",
    answer:
      "Kies vervoer op basis van aankomsttijd, groepsgrootte en je echte hotelpin. Controleer officiële luchthaveninformatie, actuele businformatie of de voorwaarden van een vooraf geboekte transfer vóór vertrek.",
  },
];

export default function PhuketFlightsGuideNl({
  routes,
}: {
  routes: FlightRoute[];
}) {
  const generic = routes.find((route) => route.tier === "search");
  const liveFlights = withSubId(
    generic?.partnerUrl || "https://trip.tpo.lv/8K2VZTtC",
    "phuket-flights-owner-nl-live",
  );
  const groups = [
    {
      key: "domestic",
      title: "Vanuit Thailand",
      copy: "Sterk voor een rondreis, maar controleer of een losse binnenlandse vlucht aansluit op je internationale ticket.",
      accent: "bg-saffron/10",
    },
    {
      key: "regional",
      title: "Via een Aziatische hub",
      copy: "Kan routekeuze en stopover combineren. Controleer transitregels, terminal en bagage op jouw combinatie.",
      accent: "bg-seafoam/45",
    },
    {
      key: "long-haul",
      title: "Vanuit Nederland en verder",
      copy: "Vergelijk een doorgaand ticket via Azië of de Golf met een Bangkokverbinding — op totaalreis, niet alleen tarief.",
      accent: "bg-jade text-ivory",
    },
  ] as const;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Vluchten naar Phuket",
      description:
        "Onafhankelijke keuzehulp voor vluchten, overstappen en aankomst op Phuket.",
      url: "https://go2-thailand.com/nl/flights-to-phuket/",
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
        title="Vluchten naar Phuket: routes en overstappen kiezen"
        description="Vergelijk hoe je naar Phuket vliegt: vanuit Nederland, via Bangkok of een andere hub. Met ticket-, bagage-, overstap- en aankomstchecks plus actuele vluchten."
      >
        <link
          rel="canonical"
          href="https://go2-thailand.com/nl/flights-to-phuket/"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://go2-thailand.com/flights-to-phuket/"
        />
        <link
          rel="alternate"
          hrefLang="nl"
          href="https://go2-thailand.com/nl/flights-to-phuket/"
        />
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/phuket-airport-arrival-hero.webp"
          imageAlt="Reizigers arriveren met bagage in de lichte aankomsthal van Phuket Airport"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Vervoer", href: "/transport/" },
            { label: "Vluchten naar Phuket" },
          ]}
          eyebrow="Eerst de route, daarna de prijs"
          title={
            <>
              Vliegen naar Phuket.
              <br />
              <span className="text-saffron-dark">
                Kies de slimste verbinding.
              </span>
            </>
          }
          subtitle="Eén ticket, een hub of toch via Bangkok?"
          description="De beste vlucht is niet automatisch het kortste zoekresultaat. Ticketstructuur, bagage, luchthavenwissel, overstapruimte en je aankomst op HKT bepalen of de reis echt werkt."
          actions={[
            { label: "Kies je vertrekroute", href: "#routes", kind: "primary" },
            {
              label: "Bekijk actuele vluchten",
              href: liveFlights,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De externe vluchtknop is een affiliate-link. Wij kunnen commissie ontvangen zonder extra kosten voor jou. Actuele prijs, route, bagage en voorwaarden staan uitsluitend bij de aanbieder."
          titleClassName="max-w-[720px] text-[3.8rem] leading-[0.88] sm:text-[5rem] lg:text-[5.6rem]"
        />

        <PageSectionNav
          label="Op deze vluchtpagina"
          items={[
            { href: "#keuze", label: "Kies je route", icon: Waypoints },
            { href: "#routes", label: "Vertreksteden", icon: Plane },
            { href: "#overstap", label: "Overstappen", icon: Route },
            { href: "#boeken", label: "Boekingscheck", icon: TicketCheck },
            { href: "#aankomst", label: "Aankomst HKT", icon: MapPin },
            { href: "#vragen", label: "Vragen", icon: ShieldCheck },
          ]}
        />

        <section
          id="keuze"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="De hoofdkeuze"
              title={
                <>
                  Drie manieren.
                  <br />
                  Drie andere risico’s.
                </>
              }
              description="Kies de ticketvorm die bij je route past vóór je op het laagste getal klikt."
            />
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {[
                {
                  icon: TicketCheck,
                  title: "Eén doorgaand ticket",
                  copy: "De duidelijkste bescherming bij een gemiste aansluiting. Controleer nog steeds bagage, transit en minimumverbinding.",
                  label: "Meestal minste frictie",
                },
                {
                  icon: Waypoints,
                  title: "Overstap via een hub",
                  copy: "Vergelijk Bangkok, een Aziatische hub en een Golfhub op totale duur, nachtrust, terminal en aankomsttijd.",
                  label: "Sterk voor vergelijken",
                },
                {
                  icon: Gauge,
                  title: "Losse tickets combineren",
                  copy: "Alleen verstandig met ruime buffer, passende verzekering en een plan voor immigratie, bagage en opnieuw inchecken.",
                  label: "Meer controle, meer risico",
                },
              ].map(({ icon: Icon, title, copy, label }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_14px_38px_rgba(18,63,54,0.07)]"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-saffron-dark">
                    <Icon size={21} />
                  </div>
                  <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                    {label}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-jade">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-charcoal/68">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="routes"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Vertrek kiezen"
              title={
                <>
                  Open jouw route.
                  <br />
                  Controleer daarna live.
                </>
              }
              description="Deze vertrekpagina’s helpen de verbinding beoordelen. Dienstregeling, maatschappij en tarief blijven live gegevens."
            />
            <div className="mt-10 grid gap-5 xl:grid-cols-3">
              {groups.map((group) => (
                <article
                  key={group.key}
                  className={`rounded-[1.35rem] border border-jade/10 p-6 ${group.accent}`}
                >
                  <p
                    className={`text-[9px] font-extrabold uppercase tracking-[0.14em] ${group.key === "long-haul" ? "text-saffron-light" : "text-saffron-dark"}`}
                  >
                    {group.title}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-6 ${group.key === "long-haul" ? "text-ivory/68" : "text-charcoal/65"}`}
                  >
                    {group.copy}
                  </p>
                  <div className="mt-6 grid gap-2">
                    {routes
                      .filter(
                        (route) => route.tier === group.key && SLUG[route.code],
                      )
                      .map((route) => (
                        <Link
                          key={route.code}
                          href={`/flights-to-phuket/${SLUG[route.code]}/`}
                          className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-extrabold transition ${group.key === "long-haul" ? "border-white/12 bg-white/7 text-ivory hover:border-saffron/35" : "border-jade/10 bg-white/75 text-jade hover:border-saffron/35"}`}
                        >
                          <span>
                            <span className="mr-2 text-[10px] opacity-55">
                              {route.from}
                            </span>
                            {route.fromName}
                          </span>
                          <ArrowRight
                            size={15}
                            className="text-saffron transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="overstap"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <SectionHeading
              eyebrow="De overstap die vaak misgaat"
              title={
                <>
                  Bangkok is niet
                  <br />
                  één luchthaven.
                </>
              }
              description="BKK en DMK liggen los van elkaar. Een zoekresultaat met luchthavenwissel vraagt immigratie, bagage, wegtransport en opnieuw inchecken."
            />
            <div className="rounded-[1.5rem] bg-jade p-6 text-ivory sm:p-8">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-saffron/40 text-saffron">
                  <Route />
                </div>
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                    Controle vóór betaling
                  </p>
                  <h3 className="font-display text-3xl font-semibold">
                    Lees iedere luchthavencode
                  </h3>
                </div>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Eén boekingsreferentie of losse tickets?",
                  "Wordt ruimbagage doorgelabeld?",
                  "Blijf je airside of ga je door immigratie?",
                  "Is er een wissel tussen BKK en DMK?",
                  "Wat gebeurt er bij een gemiste aansluiting?",
                  "Past de verbinding bij visa- en transitregels?",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/6 p-4 text-sm font-semibold text-ivory/78"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-saffron"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="boeken"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Vergelijk eerlijk"
              title={
                <>
                  Niet alleen de prijs.
                  <br />
                  Vergelijk hetzelfde ticket.
                </>
              }
              description="Zet resultaten pas naast elkaar wanneer de inhoud werkelijk vergelijkbaar is."
            />
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Luggage,
                  title: "Bagage",
                  copy: "Cabine- en ruimbagage, gewicht, doorlabelen en kosten per traject.",
                },
                {
                  icon: Clock3,
                  title: "Totale reis",
                  copy: "Overstap, luchthavenwissel, nachtvlucht en lokale aankomsttijd.",
                },
                {
                  icon: CalendarSearch,
                  title: "Voorwaarden",
                  copy: "Wijzigen, annuleren, no-show, stoelkeuze en betaaltoeslagen.",
                },
                {
                  icon: ShieldCheck,
                  title: "Bescherming",
                  copy: "Eén ticket of self-transfer, plus polisvoorwaarden bij vertraging.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-jade/10 bg-white p-5"
                >
                  <Icon className="text-saffron-dark" />
                  <h3 className="mt-5 font-display text-2xl font-semibold text-jade">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-charcoal/65">
                    {copy}
                  </p>
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
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] bg-[url('/images/redesign/phuket-route-planning.webp')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                <p className="eyebrow !text-saffron-light">Na de landing</p>
                <h2 className="font-display text-4xl font-semibold">
                  HKT is het begin van je laatste traject.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-ivory/72">
                  Controleer je hotelpin, aankomsttijd en officiële
                  vervoersopties. “Phuket” op de boeking zegt nog niets over de
                  afstand tot je strand of wijk.
                </p>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-jade/10 bg-white p-7">
              <BaggageClaim size={28} className="text-saffron-dark" />
              <h2 className="mt-5 font-display text-4xl font-semibold text-jade">
                Aankomstcheck
              </h2>
              <ol className="mt-6 grid gap-4">
                {[
                  "Controleer vóór vertrek de officiële HKT-terminalinformatie.",
                  "Bewaar je hotelnaam, adres en kaartpin offline.",
                  "Kies vervoer op aankomsttijd, groep en bagage.",
                  "Volg ter plaatse de officiële borden en balies.",
                  "Plan de eerste avond licht; een lange vlucht eindigt niet bij de gate.",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 text-sm font-semibold leading-6 text-charcoal/70"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-saffron/12 text-xs text-saffron-dark">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
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

        <section className="section-divider-bottom bg-jade py-14 text-ivory lg:py-16">
          <div className="container-custom grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow !text-saffron-light">Pas na de keuzehulp</p>
              <h2 className="font-display text-4xl font-semibold sm:text-5xl">
                Controleer jouw data bij de aanbieder.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-ivory/68">
                Zoek dezelfde reis met flexibele data en vergelijk totaalprijs,
                ticketstructuur, bagage en voorwaarden vóór betaling.
              </p>
              <AffiliateDisclosure className="mt-4 !text-ivory/50">
                Trip.com is een affiliatepartner. Wij voeren de vlucht niet uit
                en tonen geen redactionele prijs als live tarief.
              </AffiliateDisclosure>
            </div>
            <a
              href={liveFlights}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="btn-cream group min-h-12 px-6 text-saffron-dark"
            >
              Bekijk actuele vluchten{" "}
              <span className="grid h-6 w-6 place-items-center rounded-md border border-saffron/45">
                <ExternalLink size={14} />
              </span>
            </a>
          </div>
        </section>

        <FaqSplitSection
          id="vragen"
          eyebrow="Echte Nederlandse zoekvragen"
          title="Veelgestelde vragen over vliegen naar Phuket"
          description="De vragen komen uit zes actuele Nederlandse SERP-sets. Antwoorden gebruiken beslisregels en verwijzen dynamische informatie terug naar luchthaven, airline of boekingsprovider."
          items={faqs}
        />
        <SourceMethodSection
          title="Onderzocht zonder dienstregeling te bevriezen"
          description="Op 31 juli 2026 onderzocht met twee DataForSEO-clusters (229 keywordrecords, 92 concurrentdomeinrecords), zes Nederlandse SERP-sets (56 organische resultaten, 28 PAA-vermeldingen), zichtbare Google-NL-controle en primaire operationele bronnen. De bestaande ranking voor ‘hoelang vliegen naar Phuket’ blijft op deze URL."
          sources={[
            {
              title: "Phuket International Airport",
              creator: "Airports of Thailand",
              url: "https://phuket.airportthai.co.th/",
              note: "Officiële luchthaveninformatie voor HKT; controleer terminals en passagiersinformatie actueel.",
            },
            {
              title: "Passagiersrechten bij vliegreizen",
              creator: "Your Europe — Europese Unie",
              url: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_nl.htm",
              note: "Primair Europees kader voor toepasselijke passagiersrechten.",
            },
            {
              title: "Vertrek en overstappen",
              creator: "Royal Schiphol Group",
              url: "https://www.schiphol.nl/nl/",
              note: "Actuele luchthaveninformatie voor vertrek vanaf Amsterdam en operationele checks.",
            },
          ]}
        />
      </div>
    </>
  );
}
