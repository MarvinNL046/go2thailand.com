import {
  ArrowRight,
  Building2,
  Compass,
  ExternalLink,
  Hotel,
  MapPin,
  Route,
  Sparkles,
  TrainFront,
  Waves,
} from "lucide-react";
import Link from "next/link";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";
import { TRIP_GENERIC, withPlacementSubId } from "../../lib/affiliates";

type HubPage = {
  city: string;
  cityName: string;
  intro: string;
  topPicks: { name: string }[];
};

const highlighted = [
  {
    slug: "bangkok",
    label: "Bangkok",
    copy: "Kies op treinverbinding, rivier of historisch centrum — niet alleen op stadsnaam.",
    icon: TrainFront,
  },
  {
    slug: "chiang-mai",
    label: "Chiang Mai",
    copy: "Vergelijk oude stad, Nimman en rustigere randen op sfeer en dagelijkse ritten.",
    icon: Building2,
  },
  {
    slug: "phuket",
    label: "Phuket",
    copy: "De kustzone bepaalt strand, verkeer, avondleven en afstand tot excursies.",
    icon: Waves,
  },
  {
    slug: "krabi",
    label: "Krabi",
    copy: "Ao Nang, Krabi Town en rustigere stranden passen bij verschillende reisplannen.",
    icon: Compass,
  },
];

export default function WhereToStayHubNl({ pages }: { pages: HubPage[] }) {
  const tripUrl = withPlacementSubId(
    TRIP_GENERIC,
    "where-to-stay-thailand-nl",
    "compare-after-area-choice",
  );
  const canonical = "https://go2-thailand.com/nl/where-to-stay/";
  const faqs = [
    {
      question: "Waar kun je het beste verblijven in Thailand?",
      answer:
        "Er is geen beste plaats voor iedere reis. Kies eerst je route en bestemming; vergelijk daarna gebieden op reistijd, vervoer, sfeer, strand of bezienswaardigheden.",
    },
    {
      question: "Welke bestemmingen passen bij een eerste Thailandreis?",
      answer:
        "Veel eerste routes combineren een stedelijke basis met Noord-Thailand of een kustbestemming. De juiste combinatie hangt af van reistijd, seizoen en het tempo dat je prettig vindt.",
    },
    {
      question: "Boek je eerst een hotel of kies je eerst een gebied?",
      answer:
        "Kies eerst het gebied. Een aantrekkelijk hotel op een onhandige locatie kan dagelijks extra vervoer en verloren tijd veroorzaken.",
    },
    {
      question: "Hoe vergelijk je actuele hotelprijzen eerlijk?",
      answer:
        "Gebruik dezelfde datum, bezetting en kamercategorie. Vergelijk de totaalprijs inclusief belastingen, ontbijt, betaalmoment en annuleringsvoorwaarden.",
    },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <>
      <SEOHead
        title="Waar verblijven in Thailand? Kies bestemming en gebied"
        description="Kies waar je verblijft in Thailand op route, sfeer en dagelijkse reistijd. Vergelijk daarna gebieden, hotels en actuele voorwaarden."
      >
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="nl" href={canonical} />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://go2-thailand.com/where-to-stay/"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </SEOHead>
      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/phuket-hotels-hero.webp"
          imageAlt="Tropisch hotel en kustlandschap in Thailand"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Waar verblijven" },
          ]}
          eyebrow="Kies eerst je uitvalsbasis"
          title={
            <>
              Waar verblijven in Thailand?
              <br />
              <span className="text-saffron-dark">
                Van route naar het juiste gebied.
              </span>
            </>
          }
          subtitle="Eerst bestemming. Dan gebied. Pas daarna het hotel."
          description="Een goede uitvalsbasis beperkt onnodige reistijd en past bij wat je iedere dag wilt doen. Gebruik de gidsen om sfeer, vervoer en trade-offs te vergelijken."
          actions={[
            {
              label: "Kies je bestemming",
              href: "#bestemmingen",
              kind: "primary",
            },
            {
              label: "Vergelijk actuele hotels",
              href: tripUrl,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De hotelknop is een affiliate-link via onze centrale Travelpayoutsconfiguratie. Wij kunnen commissie ontvangen zonder extra kosten voor jou."
        />
        <PageSectionNav
          label="Op deze pagina"
          items={[
            { href: "#keuze", label: "Kiesvolgorde", icon: Route },
            { href: "#bestemmingen", label: "Bestemmingen", icon: MapPin },
            { href: "#alle-gidsen", label: "Alle gidsen", icon: Hotel },
            { href: "#vergelijken", label: "Hotelcheck", icon: Sparkles },
          ]}
        />
        <section
          id="keuze"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="De goede volgorde"
              title={
                <>
                  Vier keuzes.
                  <br />
                  Minder dagelijkse reistijd.
                </>
              }
              description="Een hotel kan uitstekend zijn en toch verkeerd liggen voor jouw route. Maak de locatiekeuze van groot naar klein."
            />
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["1", "Route", "Welke delen van Thailand combineer je?"],
                ["2", "Bestemming", "Stad, kust, eiland of natuurgebied?"],
                ["3", "Gebied", "Welke sfeer en dagelijkse ritten passen?"],
                ["4", "Hotel", "Welke kamer en voorwaarden kloppen?"],
              ].map(([n, title, copy], i) => (
                <article
                  key={title}
                  className={`rounded-[1.25rem] border border-jade/10 p-5 ${i === 0 ? "bg-jade text-ivory" : "bg-white"}`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-xs font-bold text-jade">
                    {n}
                  </span>
                  <h3 className="mt-4 font-display text-2xl">{title}</h3>
                  <p
                    className={`mt-2 text-sm leading-6 ${i === 0 ? "text-ivory/75" : "text-muted"}`}
                  >
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="bestemmingen"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Veelgebruikte uitvalsbases"
              title="Begin bij het karakter van de bestemming"
              description="De kaarten sturen naar een zelfstandige hotel- en gebiedsgids; ze zijn geen ranglijst."
            />
            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {highlighted.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.slug}
                    href={`/best-hotels/${item.slug}/`}
                    className={`group rounded-[1.35rem] border p-6 transition-transform hover:-translate-y-1 ${i === 0 ? "border-jade bg-jade text-ivory" : "border-jade/10 bg-white"}`}
                  >
                    <Icon className={i === 0 ? "text-saffron" : "text-jade"} />
                    <h3 className="mt-5 font-display text-3xl">{item.label}</h3>
                    <p
                      className={`mt-3 leading-7 ${i === 0 ? "text-ivory/75" : "text-muted"}`}
                    >
                      {item.copy}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                      Vergelijk gebieden
                      <ArrowRight size={16} className="text-saffron" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="alle-gidsen"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Van grote stad tot regionale basis"
              title={`${pages.length} bestemmingsgidsen`}
              description="Open de bestemming die in je route past en kies daar het gebied op vervoer, sfeer en trade-off."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <Link
                  key={page.city}
                  href={`/best-hotels/${page.city}/`}
                  className="group rounded-xl border border-jade/10 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl text-jade">
                      {page.cityName}
                    </h3>
                    <ArrowRight
                      size={17}
                      className="mt-1 shrink-0 text-saffron transition-transform group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                    {page.intro}
                  </p>
                  {page.topPicks.length > 0 && (
                    <p className="mt-3 text-xs font-semibold text-jade/65">
                      Gebieden:{" "}
                      {page.topPicks
                        .slice(0, 3)
                        .map((x) => x.name)
                        .join(" · ")}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section
          id="vergelijken"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:flex lg:items-center lg:justify-between lg:p-9">
              <div className="max-w-2xl">
                <p className="eyebrow text-saffron">Na je gebiedskeuze</p>
                <h2 className="mt-2 font-display text-3xl lg:text-4xl">
                  Vergelijk dezelfde datum, kamer en voorwaarden
                </h2>
                <p className="mt-3 leading-7 text-ivory/75">
                  Controleer totaalprijs, belastingen, ontbijt, betaalmoment en
                  annulering op de laatste boekingsstap.
                </p>
              </div>
              <a
                href={tripUrl}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-saffron px-5 py-3 text-sm font-bold text-jade lg:mt-0"
              >
                Bekijk actuele prijzen via Trip.com
                <ExternalLink size={16} />
              </a>
            </div>
            <AffiliateDisclosure
              className="mt-5"
              text="Trip.com loopt via onze centrale Travelpayoutsconfiguratie. Een mogelijke commissie verandert jouw prijs niet. De gidsrangschikking is niet gebaseerd op commissie."
            />
          </div>
        </section>
        <FaqSplitSection
          id="vragen"
          eyebrow="Veelgestelde keuzevragen"
          title="Waar verblijven in Thailand?"
          items={faqs}
        />
        <SourceMethodSection
          title="Bronnen en werkwijze"
          description="De hub is gebaseerd op actuele Nederlandse zoekintentie en route-/gebiedslogica. Bestemmingscontext wordt getoetst aan Tourism Authority of Thailand. Vluchtige hotelprijzen en beschikbaarheid blijven bij de aanbieder."
          sources={[
            {
              label: "Tourism Authority of Thailand — Destinations",
              href: "https://www.tourismthailand.org/Destinations",
            },
          ]}
        />
      </div>
    </>
  );
}
