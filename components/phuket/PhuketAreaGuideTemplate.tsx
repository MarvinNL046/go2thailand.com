import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ExternalLink, MapPin, Route } from "lucide-react";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import {
  PageSectionNav,
  type PageSectionNavItem,
} from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

export interface PhuketAreaGuideData {
  locale?: "en" | "nl";
  alternateUrl?: string;
  pageUrl: string;
  updatedAt: string;
  title: string;
  description: string;
  area: string;
  heroImage: string;
  heroAlt: string;
  heroEyebrow: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  heroDescription: string;
  heroPrimary: { label: string; href: `#${string}` };
  heroAffiliate: { label: string; href: string };
  navItems: PageSectionNavItem[];
  verdictTitle: ReactNode;
  verdictDescription: string;
  fitCards: Array<{
    eyebrow: string;
    title: string;
    copy: string;
    icon: LucideIcon;
    tone?: "dark" | "light";
  }>;
  editorialRule: string;
  zones: Array<{
    title: string;
    eyebrow: string;
    copy: string;
    check: string;
    image: string;
    imageAlt: string;
  }>;
  dayParts: Array<{
    time: string;
    title: string;
    copy: string;
    icon: LucideIcon;
  }>;
  beachTitle: string;
  beachDescription: string;
  beachChecks: Array<{ title: string; copy: string; icon: LucideIcon }>;
  seasonTitle: ReactNode;
  seasonDescription: string;
  seasonRows: Array<{
    period: string;
    conditions: string;
    planning: string;
    cue: string;
    highlight?: boolean;
  }>;
  spokes: Array<{
    title: string;
    copy: string;
    href: string;
    image: string;
    imageAlt: string;
    label: string;
    affiliate?: boolean;
  }>;
  comparisonCards: Array<{
    area: string;
    fit: string;
    href: string;
    image: string;
    imageAlt: string;
  }>;
  safetyCards: Array<{ title: string; copy: string; icon: LucideIcon }>;
  bookingCards: Array<{
    title: string;
    copy: string;
    href: string;
    label: string;
    icon: LucideIcon;
    affiliate?: boolean;
  }>;
  faqs: Array<{ question: string; answer: string }>;
  faqDescription: string;
  related: Array<{
    title: string;
    description: string;
    href: string;
    image: string;
    imageAlt: string;
  }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
  sectionCopy?: {
    zonesEyebrow?: string;
    zonesTitle?: ReactNode;
    zonesDescription?: string;
    rhythmEyebrow?: string;
    rhythmTitle?: ReactNode;
    rhythmDescription?: string;
    featureEyebrow?: string;
    seasonEyebrow?: string;
    seasonNote?: string;
    comparisonEyebrow?: string;
    comparisonTitle?: ReactNode;
    comparisonDescription?: string;
    safetyEyebrow?: string;
    safetyTitle?: ReactNode;
    safetyDescription?: string;
    bookingEyebrow?: string;
    bookingTitle?: ReactNode;
    bookingDescription?: string;
    methodTitle?: string;
  };
}

function createSchemas(data: PhuketAreaGuideData) {
  const isNl = data.locale === "nl";
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description,
      url: data.pageUrl,
      image: `https://go2-thailand.com${data.heroImage}`,
      inLanguage: isNl ? "nl-NL" : "en-GB",
      dateModified: data.updatedAt,
      author: { "@type": "Organization", name: "Go2Thailand" },
      publisher: { "@type": "Organization", name: "Go2Thailand" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Thailand",
          item: `https://go2-thailand.com${isNl ? "/nl/" : "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Phuket",
          item: `https://go2-thailand.com${isNl ? "/nl" : ""}/city/phuket/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: data.area,
          item: data.pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${data.area} area zones`,
      numberOfItems: data.zones.length,
      itemListElement: data.zones.map((zone, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: zone.title,
        description: `${zone.copy} Check: ${zone.check}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];
}

export function PhuketAreaGuideTemplate({
  data,
}: {
  data: PhuketAreaGuideData;
}) {
  const schemas = createSchemas(data);
  const copy = data.sectionCopy || {};
  const isNl = data.locale === "nl";

  return (
    <div
      className="bg-canvas"
      data-premium-template={`phuket-area-owner-${isNl ? "nl" : "en"}`}
    >
      <SEOHead
        title={data.title}
        description={data.description}
        ogImage={`https://go2-thailand.com${data.heroImage}`}
      >
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <EditorialHero
        image={data.heroImage}
        imageAlt={data.heroAlt}
        breadcrumbs={[
          { label: "Thailand", href: "/" },
          { label: "Phuket", href: "/city/phuket/" },
          { label: data.area },
        ]}
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        description={data.heroDescription}
        actions={[
          {
            label: data.heroPrimary.label,
            href: data.heroPrimary.href,
            kind: "primary",
          },
          {
            label: data.heroAffiliate.label,
            href: data.heroAffiliate.href,
            kind: "secondary",
            newTab: true,
            affiliate: true,
          },
        ]}
        disclosure={
          isNl
            ? "De providerlink is gesponsord. Wij kunnen zonder extra kosten voor jou een commissie ontvangen. Controleer locatie, aanbieder, actuele prijs, beschikbaarheid en voorwaarden op de providerpagina."
            : "The provider link is sponsored. We may earn a commission at no extra cost to you. Check the current property, operator, price, availability and terms on the provider page."
        }
        minHeightClassName="min-h-[760px] lg:min-h-[700px]"
        titleClassName="max-w-[720px] text-[4.2rem] leading-[0.84] sm:text-[5.2rem] lg:text-[6rem]"
        contentClassName="max-w-[710px]"
        imageClassName="object-cover object-[68%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(248,244,235,0.12)_0%,rgba(248,244,235,0.52)_48%,rgba(248,244,235,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(248,244,235,0.98)_0%,rgba(248,244,235,0.90)_37%,rgba(9,44,38,0.25)_66%,rgba(9,44,38,0.02)_100%)]"
      />

      <PageSectionNav
        label={
          isNl ? `In deze gids over ${data.area}` : `On this ${data.area} guide`
        }
        items={data.navItems}
      />

      <section
        id="fit"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
          <div className="relative">
            <SectionHeading
              eyebrow={isNl ? "Kies eerst" : "First decide"}
              title={data.verdictTitle}
              description={data.verdictDescription}
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 360 120"
              className="mt-7 hidden h-28 w-full max-w-sm text-saffron lg:block"
            >
              <path
                d="M10 90 C78 116 82 24 142 62 S246 105 338 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="3 8"
                strokeLinecap="round"
              />
              <circle cx="10" cy="90" r="5" fill="currentColor" />
              <circle cx="142" cy="62" r="4" fill="currentColor" />
              <path
                d="M338 12c-8 0-14 6-14 14 0 11 14 24 14 24s14-13 14-24c0-8-6-14-14-14Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">
              {data.fitCards.map(
                ({ eyebrow, title, copy, icon: Icon, tone }, index) => {
                  const dark =
                    tone === "dark" || index === data.fitCards.length - 1;
                  return (
                    <article
                      key={title}
                      className={`min-h-[250px] p-7 ${dark ? "bg-jade text-white" : index % 2 ? "bg-tonal" : "bg-white"}`}
                    >
                      <Icon
                        size={24}
                        className={dark ? "text-saffron-light" : "text-jade"}
                      />
                      <p
                        className={`mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] ${dark ? "text-saffron-light" : "text-saffron-dark"}`}
                      >
                        {eyebrow}
                      </p>
                      <h3
                        className={`mt-2 font-display text-[1.7rem] font-semibold leading-none ${dark ? "text-white" : "text-jade"}`}
                      >
                        {title}
                      </h3>
                      <p
                        className={`mt-4 text-xs font-medium leading-6 ${dark ? "text-white/66" : "text-charcoal/64"}`}
                      >
                        {copy}
                      </p>
                    </article>
                  );
                },
              )}
            </div>
            <p className="mt-5 rounded-xl border border-saffron/25 bg-saffron-pale px-5 py-4 text-xs font-extrabold leading-6 text-jade">
              {isNl ? "Redactionele grens" : "Editorial rule"}:{" "}
              {data.editorialRule}
            </p>
          </div>
        </div>
      </section>

      <section
        id="zones"
        className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
      >
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading
              eyebrow={
                copy.zonesEyebrow ||
                (isNl ? "De exacte plek telt" : "Micro-location matters")
              }
              title={
                copy.zonesTitle ||
                (isNl
                  ? `Kies jouw deel van ${data.area}.`
                  : `Choose your part of ${data.area}.`)
              }
            />
            <p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">
              {copy.zonesDescription ||
                (isNl
                  ? "Een wijknaam kan verschillende straatomgevingen omvatten. Controleer de exacte kaartpin, looproute na donker en realistische afstand tot wat je gebruikt."
                  : "A neighbourhood label can cover several different street environments. Check the exact map pin, walking route after dark, road crossings and realistic distance to the places you will use daily.")}
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {data.zones.map((zone) => (
              <article
                key={zone.title}
                className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={zone.image}
                    alt={zone.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/85 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">
                      {zone.eyebrow}
                    </p>
                    <h3 className="mt-1 font-display text-[2rem] font-semibold leading-none">
                      {zone.title}
                    </h3>
                  </div>
                </div>
                <div className="flex min-h-[245px] flex-col p-6">
                  <p className="text-xs font-medium leading-6 text-charcoal/66">
                    {zone.copy}
                  </p>
                  <div className="mt-auto rounded-xl bg-tonal p-4">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                      {isNl ? "Controleer op de kaart" : "Map check"}
                    </p>
                    <p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/62">
                      {zone.check}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="rhythm"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={
              copy.rhythmEyebrow ||
              (isNl ? "Eén plek, vier ritmes" : "One place, four moods")
            }
            title={
              copy.rhythmTitle ||
              (isNl
                ? `${data.area} verandert per uur.`
                : `${data.area} changes by the hour.`)
            }
            description={
              copy.rhythmDescription ||
              (isNl
                ? "Beoordeel de omgeving op het tijdstip waarop je haar echt gebruikt."
                : "Judge the area at the time you will actually use it. A convenient beach morning and a lively central night can both be true.")
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {data.dayParts.map(({ time, title, copy, icon: Icon }) => (
              <article
                key={time}
                className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
              >
                <Icon size={23} className="text-jade" />
                <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">
                  {time}
                </p>
                <h3 className="mt-2 font-display text-[1.6rem] font-semibold leading-none text-jade">
                  {title}
                </h3>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="beach"
        className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow !text-saffron-light">
              {copy.featureEyebrow ||
                (isNl ? "Werkelijkheid ter plaatse" : "Beach reality")}
            </p>
            <h2 className="font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.035em]">
              {data.beachTitle}
            </h2>
            <p className="mt-6 text-sm font-medium leading-7 text-white/66">
              {data.beachDescription}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {data.beachChecks.map(({ title, copy, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/13 bg-white/[0.065] p-6"
              >
                <Icon size={24} className="text-saffron-light" />
                <h3 className="mt-6 font-display text-[1.55rem] font-semibold">
                  {title}
                </h3>
                <p className="mt-4 text-xs font-medium leading-6 text-white/64">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="season"
        className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
      >
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading
              eyebrow={
                copy.seasonEyebrow ||
                (isNl ? "Timing aan de Andamankust" : "Andaman timing")
              }
              title={data.seasonTitle}
              description={data.seasonDescription}
            />
            <p className="text-xs font-medium leading-6 text-charcoal/58">
              {copy.seasonNote ||
                (isNl
                  ? "Dit zijn planningsbanden, geen belofte voor een specifieke week. Gebruik de actuele TMD-verwachting en informatie ter plaatse."
                  : "These are planning bands, not a promise for a specific week. Use the Thai Meteorological Department forecast, marine warnings and beach flags for the days you are there.")}
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-jade/10 bg-jade/10">
            <div className="hidden grid-cols-[.55fr_1.2fr_1.2fr_.7fr] bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white md:grid">
              <span>{isNl ? "Periode" : "Period"}</span>
              <span>{isNl ? "Gebruikelijk patroon" : "Typical pattern"}</span>
              <span>{isNl ? "Plan rond" : "Plan around"}</span>
              <span>{isNl ? "Signaal" : "Cue"}</span>
            </div>
            {data.seasonRows.map((row) => (
              <article
                key={row.period}
                className={`grid gap-3 border-b border-jade/10 p-6 last:border-0 md:grid-cols-[.55fr_1.2fr_1.2fr_.7fr] ${row.highlight ? "bg-saffron-pale" : "bg-white"}`}
              >
                <h3 className="font-display text-[1.35rem] font-semibold text-jade">
                  {row.period}
                </h3>
                <p className="text-xs font-medium leading-5 text-charcoal/64">
                  {row.conditions}
                </p>
                <p className="text-xs font-medium leading-5 text-charcoal/64">
                  {row.planning}
                </p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-saffron-dark">
                  {row.cue}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="plan"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom">
          <SectionHeading
            eyebrow={
              isNl
                ? "Verdiep zonder overlap"
                : "Go deeper without cannibalising"
            }
            title={
              isNl
                ? `Plan ${data.area} per taak.`
                : `Plan ${data.area} by task.`
            }
            description={
              isNl
                ? "Iedere specialistische gids bezit één planningsvraag. Deze pagina helpt je de basis kiezen; vervolgpagina’s geven de operationele details."
                : "Each specialist guide owns one planning job. This area page helps you choose the base; the spokes carry the detailed shortlist and operational advice."
            }
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {data.spokes.map((spoke) => {
              const body = (
                <>
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={spoke.image}
                      alt={spoke.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex min-h-[205px] flex-col p-5">
                    <h3 className="font-display text-[1.55rem] font-semibold leading-none text-jade">
                      {spoke.title}
                    </h3>
                    <p className="mt-3 flex-1 text-xs font-medium leading-5 text-charcoal/62">
                      {spoke.copy}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">
                      {spoke.label}{" "}
                      {spoke.affiliate ? (
                        <ExternalLink size={13} className="text-saffron" />
                      ) : (
                        <ArrowRight size={13} className="text-saffron" />
                      )}
                    </span>
                  </div>
                </>
              );
              return spoke.affiliate ? (
                <a
                  key={spoke.title}
                  href={spoke.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"
                >
                  {body}
                </a>
              ) : (
                <Link
                  key={spoke.title}
                  href={spoke.href}
                  className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"
                >
                  {body}
                </Link>
              );
            })}
          </div>
          <AffiliateDisclosure className="mt-4">
            {isNl
              ? "Kaarten met actuele opties zijn gesponsord. Interne redactionele gidsen leveren geen commissie op."
              : "Cards labelled as live options are sponsored. Editorial guide cards stay internal and do not earn a commission."}
          </AffiliateDisclosure>
        </div>
      </section>

      <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <SectionHeading
            eyebrow={
              copy.comparisonEyebrow ||
              (isNl ? "Als deze plek niet past" : "If not here")
            }
            title={
              copy.comparisonTitle ||
              (isNl
                ? `Vergelijk ${data.area} met een andere basis.`
                : `Compare ${data.area} with a quieter base.`)
            }
            description={
              copy.comparisonDescription ||
              (isNl
                ? "Kies een wijk niet op basis van één hero-afbeelding. Vergelijk avondritme, bereikbaarheid en hoe vaak je het eiland moet oversteken."
                : "Do not choose a beach area from one hero image. Compare evening atmosphere, road access and how often you need to cross the island.")
            }
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {data.comparisonCards.map((card) => (
              <Link
                key={card.area}
                href={card.href}
                className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[1.45rem] font-semibold text-jade">
                    {card.area}
                  </h3>
                  <p className="mt-2 text-xs font-medium leading-5 text-charcoal/62">
                    {card.fit}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-jade">
                    {isNl ? "Vergelijk" : "Compare"}{" "}
                    <ArrowRight size={13} className="text-saffron" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="safety"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading
            eyebrow={
              copy.safetyEyebrow ||
              (isNl ? "Praktisch & veilig" : "Practical safety")
            }
            title={
              copy.safetyTitle ||
              (isNl
                ? "Verklein de risico’s die je kunt sturen."
                : "Reduce the risks you can control.")
            }
            description={
              copy.safetyDescription ||
              (isNl
                ? "Gebruik actueel officieel reisadvies. Dit zijn planningsvragen, geen belofte dat één wijk of tijdstip altijd veilig is."
                : "Use current official advice for your nationality. These are planning prompts, not a claim that one district or time is universally safe.")
            }
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {data.safetyCards.map(({ title, copy, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
              >
                <Icon size={24} className="text-jade" />
                <h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">
                  {title}
                </h3>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="book"
        className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20"
      >
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow !text-saffron-light">
                {copy.bookingEyebrow ||
                  (isNl ? "Controleer actuele opties" : "Check current options")}
              </p>
              <h2 className="font-display text-[3.2rem] font-semibold leading-[0.9]">
                {copy.bookingTitle ||
                  (isNl
                    ? "Boek de kaartpin, niet alleen de wijknaam."
                    : "Book the map pin, not the neighbourhood name.")}
              </h2>
            </div>
            <p className="text-sm font-medium leading-7 text-white/66">
              {copy.bookingDescription ||
                (isNl
                  ? "Open jouw data, controleer de exacte locatie en vergelijk dezelfde voorwaarden. Een lagere vanafprijs kan zijn waarde verliezen door transfers, annulering of de verkeerde micro-locatie."
                  : "Open your dates, verify the exact location and compare like-for-like inclusions. A lower headline price can lose its value when transfers, cancellation or the wrong micro-location are added.")}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {data.bookingCards.map(
              ({
                title,
                copy: cardCopy,
                href,
                label,
                icon: Icon,
                affiliate,
              }) => (
                <article
                  key={title}
                  className="flex min-h-[285px] flex-col rounded-2xl border border-white/13 bg-white/[0.065] p-7"
                >
                  <Icon size={25} className="text-saffron-light" />
                  <h3 className="mt-6 font-display text-[1.7rem] font-semibold">
                    {title}
                  </h3>
                  <p className="mt-4 flex-1 text-xs font-medium leading-6 text-white/64">
                    {cardCopy}
                  </p>
                  <a
                    href={href}
                    target="_blank"
                    rel={
                      affiliate
                        ? "noopener noreferrer nofollow sponsored"
                        : "noopener noreferrer"
                    }
                    className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light"
                  >
                    {label} <ExternalLink size={13} />
                  </a>
                </article>
              ),
            )}
          </div>
          <AffiliateDisclosure className="mt-4 !text-white/55">
            {isNl
              ? "De hotel- en activiteitenknoppen zijn gesponsord. Go2Thailand kan een commissie ontvangen zonder jouw prijs te verhogen. De vervoerslink is een redactionele verwijzing naar actuele operatorinformatie."
              : "The hotel and activity buttons are sponsored. Go2Thailand may earn a commission without increasing your price. The transport link is an editorial reference to current operator information."}
          </AffiliateDisclosure>
        </div>
      </section>

      <FaqSplitSection
        id="questions"
        eyebrow={isNl ? "Echte zoekvragen" : "Genuine search questions"}
        title={
          isNl
            ? `Vragen voordat je ${data.area} kiest`
            : `Questions before choosing ${data.area}`
        }
        description={data.faqDescription}
        items={data.faqs}
      />
      <RelatedGuidesSection
        eyebrow={isNl ? "Verder plannen" : "Continue planning"}
        title={isNl ? "Bouw de rest van Phuket" : "Build the rest of Phuket"}
        readLabel={isNl ? "Open de gids" : "Open the guide"}
        guides={data.related}
      />
      <SourceMethodSection
        eyebrow={isNl ? "Bronnen & methode" : "Sources & method"}
        title={
          copy.methodTitle ||
          (isNl
            ? "Een beslisgids, geen wijkstereotype."
            : "A decision guide, not a nightlife stereotype.")
        }
        description={data.methodDescription}
        sources={data.sources}
      />
    </div>
  );
}
