import {
  ArrowRight,
  Baby,
  BedDouble,
  CheckCircle2,
  ExternalLink,
  GlassWater,
  Hotel,
  MapPin,
  ShieldCheck,
  Sparkles,
  Utensils,
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

export type PhuketHotelCategory = "all-inclusive" | "family" | "resorts";

type Candidate = {
  name: string;
  area?: string;
  tripPartnerUrl?: string;
  bookingUrl?: string;
};

const priceAnswer =
  "Prijzen veranderen per datum, bezetting, kamertype, pakket en voorwaarden. Vergelijk dezelfde gegevens en bekijk de actuele totaalprijs bij de aanbieder.";

const CONFIG = {
  "all-inclusive": {
    eyebrow: "De naam van het pakket is niet genoeg",
    title: "All-inclusive hotels op Phuket.",
    accent: "Lees wat werkelijk inbegrepen is.",
    subtitle:
      "Volpension, resort credit en all-inclusive zijn verschillende producten.",
    description:
      "Vergelijk Phuket-arrangementen op maaltijden, drank, restaurants, tijden, toeslagen, credits en de exacte kamercategorie. Controleer iedere inclusie voor jouw datum.",
    fit: "Reizigers die veel tijd in het resort doorbrengen en vooraf grip op maaltijden en drank willen",
    checks: [
      "Maaltijden en deelnemende restaurants",
      "Dranken, minibar en roomservice",
      "Tijden, reserveringen en toeslagen",
      "Credits, activiteiten en transfers",
    ],
    faqs: [
      {
        question: "Zijn er all-inclusive hotels op Phuket?",
        answer:
          "Er zijn accommodaties met all-inclusive of vergelijkbare arrangementen, maar aanbod en inhoud wisselen. Controleer per datum het exacte pakket.",
      },
      {
        question: "Is volpension hetzelfde als all-inclusive?",
        answer:
          "Nee. Volpension omvat doorgaans maaltijden; drank en extra’s kunnen apart zijn. Alleen de actuele voorwaarden bepalen de inhoud.",
      },
      {
        question: "Wat kost een all-inclusive hotel op Phuket?",
        answer: priceAnswer,
      },
    ],
    icons: [Utensils, GlassWater, Hotel, Sparkles],
  },
  family: {
    eyebrow: "Gezinsvriendelijk moet concreet zijn",
    title: "Familiehotels op Phuket.",
    accent: "Kies op leeftijd én dagritme.",
    subtitle:
      "Een kinderclub maakt een onhandige kamer of locatie niet vanzelf geschikt.",
    description:
      "Vergelijk familiehotels op bedindeling, verbonden kamers, zwembadveiligheid, strandroute, kinderclubvoorwaarden, eten, was en dagelijkse vervoersbehoefte.",
    fit: "Gezinnen die kamerindeling, veilige faciliteiten en een praktische gebiedskeuze samen willen beoordelen",
    checks: [
      "Echte bedden en verbonden kamers",
      "Zwembad, balkon en trapveiligheid",
      "Leeftijd, tijden en toezicht kinderclub",
      "Strandroute, eten en vervoer",
    ],
    faqs: [
      {
        question: "Welk gebied op Phuket is geschikt voor gezinnen?",
        answer:
          "Kata, Karon, Kamala, Bang Tao en andere zones hebben verschillende sterke punten. Kies op leeftijd, strandroute, gewenste rust en dagelijkse ritten.",
      },
      {
        question: "Wat maakt een hotel echt gezinsvriendelijk?",
        answer:
          "Een passende kamerindeling, concrete veiligheidsvoorzieningen, eten, toegankelijkheid en faciliteiten voor de leeftijd van jouw kinderen — niet alleen een familielabel.",
      },
      { question: "Wat kost een familiehotel op Phuket?", answer: priceAnswer },
    ],
    icons: [BedDouble, ShieldCheck, Baby, MapPin],
  },
  resorts: {
    eyebrow: "Een resort verkoopt meer dan een kamer",
    title: "Resorts op Phuket.",
    accent: "Kies faciliteiten én ligging.",
    subtitle:
      "Hoe completer het resort, hoe belangrijker de vraag of je het terrein wilt verlaten.",
    description:
      "Vergelijk Phuket-resorts op strandtoegang, terrein, restaurants, zwembaden, service, mobiliteit, renovaties en afstand tot wat je buiten het resort wilt doen.",
    fit: "Reizigers die bewust kiezen voor faciliteiten op het terrein en de locatie-trade-off begrijpen",
    checks: [
      "Echte strand- en terreinligging",
      "Open restaurants en faciliteiten",
      "Trappen, buggy’s en toegankelijkheid",
      "Vervoer buiten het resort",
    ],
    faqs: [
      {
        question: "Wat is het verschil tussen een hotel en resort op Phuket?",
        answer:
          "Een resort legt meestal meer nadruk op faciliteiten en verblijf op het terrein, maar de term is niet beschermd. Controleer wat werkelijk aanwezig en open is.",
      },
      {
        question: "Welk Phuket-resort is het beste?",
        answer:
          "Dat hangt af van gebied, reisgezelschap, gewenste faciliteiten en hoeveel je het terrein verlaat. Vergelijk op concrete criteria in plaats van één algemene ranglijst.",
      },
      { question: "Wat kost een resort op Phuket?", answer: priceAnswer },
    ],
    icons: [Waves, Hotel, Utensils, MapPin],
  },
} as const;

export default function PhuketHotelCategoryNl({
  category,
  candidates,
}: {
  category: PhuketHotelCategory;
  candidates: Candidate[];
}) {
  const c = CONFIG[category];
  const path = `/best-hotels/phuket/${category}/`;
  const canonical = `https://go2-thailand.com/nl${path}`;
  const heroUrl = withPlacementSubId(
    candidates.find((x) => x.tripPartnerUrl)?.tripPartnerUrl || TRIP_GENERIC,
    `phuket-hotels-${category}-nl`,
    "hero",
  );
  const cleanCandidates = candidates.slice(0, 8);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: c.title,
      description: c.description,
      url: canonical,
      inLanguage: "nl-NL",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
  return (
    <>
      <SEOHead
        title={`${c.title} Onafhankelijke keuzehulp`}
        description={c.description}
      >
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="nl" href={canonical} />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://go2-thailand.com${path}`}
        />
        {schemas.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </SEOHead>
      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/phuket-hotels-hero.webp"
          imageAlt="Resort en tropische kust op Phuket"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Phuket", href: "/city/phuket/" },
            { label: "Hotels", href: "/best-hotels/phuket/" },
            { label: c.title },
          ]}
          eyebrow={c.eyebrow}
          title={
            <>
              {c.title}
              <br />
              <span className="text-saffron-dark">{c.accent}</span>
            </>
          }
          subtitle={c.subtitle}
          description={c.description}
          actions={[
            {
              label: "Doe de categoriecheck",
              href: "#controle",
              kind: "primary",
            },
            {
              label: "Bekijk actuele opties",
              href: heroUrl,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De externe hotelknop is een affiliate-link via onze centrale Travelpayoutsconfiguratie. Wij kunnen commissie ontvangen zonder extra kosten voor jou; prijs, pakket en voorwaarden staan bij de aanbieder."
          titleClassName="max-w-[850px] text-[3rem] leading-[0.91] sm:text-[4.15rem] lg:text-[4.85rem]"
        />
        <PageSectionNav
          label="Op deze pagina"
          items={[
            { href: "#past-dit", label: "Past dit?", icon: Sparkles },
            { href: "#controle", label: "Controlelijst", icon: CheckCircle2 },
            { href: "#shortlist", label: "Shortlist", icon: Hotel },
            { href: "#boeken", label: "Actuele opties", icon: ExternalLink },
            { href: "#vragen", label: "Vragen", icon: ShieldCheck },
          ]}
        />
        <section
          id="past-dit"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Goede match</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-jade">
                Voor wie werkt deze categorie?
              </h2>
              <p className="mt-5 leading-8 text-muted">{c.fit}</p>
            </div>
            <aside className="rounded-[1.5rem] bg-jade p-7 text-ivory">
              <ShieldCheck className="text-saffron" />
              <h3 className="mt-5 font-display text-3xl">
                Label is geen bewijs
              </h3>
              <p className="mt-3 leading-7 text-ivory/75">
                Controleer de exacte kamer, het arrangement en welke
                faciliteiten op jouw verblijfsdatum beschikbaar zijn. Een
                categorienaam heeft geen universele inhoud.
              </p>
            </aside>
          </div>
        </section>
        <section
          id="controle"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Vóór je reserveert"
              title="Vier categoriechecks"
              description="Gebruik dezelfde vragen bij iedere kandidaat, zodat je echte producten vergelijkt."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {c.checks.map((x, i) => {
                const Icon = c.icons[i];
                return (
                  <article
                    key={x}
                    className={`rounded-[1.25rem] border p-5 ${i === 0 ? "border-jade bg-jade text-ivory" : "border-jade/10 bg-white"}`}
                  >
                    <Icon className={i === 0 ? "text-saffron" : "text-jade"} />
                    <h3 className="mt-4 font-display text-xl">{x}</h3>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="shortlist"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Kandidaten om actueel te controleren"
              title="Geen ranglijst, wel een werkbare shortlist"
              description="Namen en gebieden helpen je zoeken. Voorzieningen, renovatiestatus, pakketinhoud, kamertype en prijs controleer je bij de aanbieder en officiële accommodatiebron."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {cleanCandidates.map((hotel, i) => {
                const url = withPlacementSubId(
                  hotel.tripPartnerUrl || TRIP_GENERIC,
                  `phuket-hotels-${category}-nl`,
                  `candidate-${i}`,
                );
                return (
                  <article
                    key={hotel.name}
                    className="flex flex-col rounded-[1.25rem] border border-jade/10 bg-white p-5"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-saffron-dark">
                      {hotel.area || "Phuket"}
                    </span>
                    <h3 className="mt-3 font-display text-xl text-jade">
                      {hotel.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                      Controleer exact kamertype, actuele faciliteiten,
                      totaalprijs en voorwaarden.
                    </p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer nofollow sponsored"
                      className="mt-5 inline-flex items-center justify-between rounded-lg bg-jade px-4 py-3 text-sm font-bold text-white"
                    >
                      Bekijk actuele prijs
                      <ExternalLink size={15} className="text-saffron" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="boeken"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:flex lg:items-center lg:justify-between lg:p-9">
              <div>
                <p className="eyebrow text-saffron">
                  Vergelijk dezelfde voorwaarden
                </p>
                <h2 className="mt-2 font-display text-3xl">
                  Bekijk actuele{" "}
                  {category === "family"
                    ? "familiekamers"
                    : category === "all-inclusive"
                      ? "arrangementen"
                      : "resorts"}
                </h2>
              </div>
              <a
                href={heroUrl}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-saffron px-5 py-3 text-sm font-bold text-jade lg:mt-0"
              >
                Actuele prijzen via Trip.com
                <ExternalLink size={16} />
              </a>
            </div>
            <AffiliateDisclosure
              className="mt-5"
              text="Trip.com loopt via onze centrale Travelpayoutsconfiguratie. Een mogelijke commissie verandert jouw prijs niet. De shortlist is niet gerangschikt op commissie."
            />
          </div>
        </section>
        <FaqSplitSection
          id="vragen"
          eyebrow="Voor je boekt"
          title={`Veelgestelde vragen over ${c.title.toLowerCase()}`}
          items={c.faqs}
        />
        <section className="section-divider-top py-14">
          <div className="container-custom">
            <div className="rounded-[1.4rem] border border-jade/10 bg-white p-7 lg:flex lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow">Kies ook het gebied</p>
                <h2 className="mt-2 font-display text-3xl text-jade">
                  Een categorie past pas op de juiste locatie
                </h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 lg:mt-0">
                <Link
                  href="/nl/best-hotels/phuket/"
                  className="inline-flex items-center gap-2 rounded-lg bg-jade px-4 py-3 text-sm font-bold text-white"
                >
                  Vergelijk Phuket-gebieden
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
                <Link
                  href="/nl/best-hotels/phuket/"
                  className="inline-flex items-center gap-2 rounded-lg border border-jade/15 px-4 py-3 text-sm font-bold text-jade"
                >
                  Alle Phuket-hotels
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <SourceMethodSection
          title="Bronnen en werkwijze"
          description="De categoriecriteria volgen uit actuele zoekresultaten, reizigersvragen en officiële accommodatie-informatie. De shortlist is een controlelijst, geen statische ranglijst. Vluchtige prijzen, scores en voorzieningen blijven bij de aanbieder."
          sources={[
            {
              label: "Tourism Authority of Thailand — Phuket",
              href: "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350",
            },
          ]}
        />
      </div>
    </>
  );
}
