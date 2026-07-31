import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
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

export interface OldTownSpokeData {
  locale?: "en" | "nl";
  alternateUrl?: string;
  pageUrl: string;
  updatedAt: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  heroImage: string;
  heroAlt: string;
  heroEyebrow: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  heroDescription: string;
  primaryAction: { label: string; href: `#${string}` };
  affiliateAction: { label: string; href: string };
  navItems: PageSectionNavItem[];
  introEyebrow: string;
  introTitle: ReactNode;
  introDescription: string;
  overviewCards: Array<{
    eyebrow: string;
    title: string;
    copy: string;
    icon: LucideIcon;
    tone?: "dark" | "light";
  }>;
  editorialRule: string;
  routeEyebrow: string;
  routeTitle: ReactNode;
  routeDescription: string;
  routeSteps: Array<{
    marker: string;
    title: string;
    copy: string;
    note: string;
  }>;
  focusEyebrow: string;
  focusTitle: ReactNode;
  focusDescription: string;
  focusCards: Array<{ title: string; copy: string; icon: LucideIcon }>;
  timingEyebrow: string;
  timingTitle: ReactNode;
  timingDescription: string;
  timingRows: Array<{
    period: string;
    feel: string;
    plan: string;
    cue: string;
    highlight?: boolean;
  }>;
  highlightEyebrow: string;
  highlightTitle: ReactNode;
  highlightDescription: string;
  highlights: Array<{
    title: string;
    copy: string;
    image: string;
    imageAlt: string;
    label: string;
  }>;
  practicalEyebrow: string;
  practicalTitle: ReactNode;
  practicalDescription: string;
  practicalCards: Array<{ title: string; copy: string; icon: LucideIcon }>;
  bookingTitle: ReactNode;
  bookingDescription: string;
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
}

function createSchemas(data: OldTownSpokeData) {
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
          name: "Phuket Old Town",
          item: `https://go2-thailand.com${isNl ? "/nl" : ""}/phuket/old-town/`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: data.breadcrumbLabel,
          item: data.pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${data.breadcrumbLabel} sequence`,
      numberOfItems: data.routeSteps.length,
      itemListElement: data.routeSteps.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.title,
        description: step.copy,
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

export function OldTownSpokeTemplate({ data }: { data: OldTownSpokeData }) {
  const schemas = createSchemas(data);
  const isNl = data.locale === "nl";

  return (
    <div
      className="bg-canvas"
      data-premium-template={`old-town-spoke-${isNl ? "nl" : "en"}`}
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
          { label: "Old Town", href: "/phuket/old-town/" },
          { label: data.breadcrumbLabel },
        ]}
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        description={data.heroDescription}
        actions={[
          {
            label: data.primaryAction.label,
            href: data.primaryAction.href,
            kind: "primary",
          },
          {
            label: data.affiliateAction.label,
            href: data.affiliateAction.href,
            kind: "secondary",
            newTab: true,
            affiliate: true,
          },
        ]}
        disclosure={
          isNl
            ? "De providerlink is gesponsord. Wij kunnen zonder extra kosten voor jou een commissie ontvangen. Controleer aanbieder, inhoud, beschikbaarheid, totaal en annulering."
            : "The provider link is sponsored. We may earn a commission at no extra cost to you. Check the current operator, inclusions, availability, total and cancellation terms."
        }
        minHeightClassName="min-h-[740px] lg:min-h-[690px]"
        titleClassName="max-w-[735px] text-[4rem] leading-[0.84] sm:text-[5rem] lg:text-[5.8rem]"
        contentClassName="max-w-[715px]"
        imageClassName="object-cover object-[68%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(248,244,235,0.10)_0%,rgba(248,244,235,0.52)_48%,rgba(248,244,235,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(248,244,235,0.98)_0%,rgba(248,244,235,0.89)_38%,rgba(9,44,38,0.22)_66%,rgba(9,44,38,0.02)_100%)]"
      />

      <PageSectionNav
        label={
          isNl
            ? `In deze gids over ${data.breadcrumbLabel.toLowerCase()}`
            : `On this ${data.breadcrumbLabel.toLowerCase()} guide`
        }
        items={data.navItems}
      />

      <section
        id="overview"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
          <div className="relative">
            <SectionHeading
              eyebrow={data.introEyebrow}
              title={data.introTitle}
              description={data.introDescription}
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
              {data.overviewCards.map(
                ({ eyebrow, title, copy, icon: Icon, tone }, index) => {
                  const dark =
                    tone === "dark" || index === data.overviewCards.length - 1;
                  return (
                    <article
                      key={title}
                      className={`min-h-[245px] p-7 ${dark ? "bg-jade text-white" : index % 2 ? "bg-tonal" : "bg-white"}`}
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
        id="route"
        className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
      >
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading
              eyebrow={data.routeEyebrow}
              title={data.routeTitle}
            />
            <p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">
              {data.routeDescription}
            </p>
          </div>
          <div className="relative mt-11 grid gap-5 lg:grid-cols-5">
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 90"
              preserveAspectRatio="none"
              className="pointer-events-none absolute left-8 right-8 top-8 hidden h-20 w-[calc(100%-4rem)] text-saffron lg:block"
            >
              <path
                d="M5 44 C100 2 170 85 255 43 S430 2 505 43 S680 85 755 43 S900 2 995 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="3 8"
                strokeLinecap="round"
              />
            </svg>
            {data.routeSteps.map((step, index) => (
              <article
                key={step.title}
                className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-saffron/35 bg-saffron-pale font-display text-xl font-semibold text-jade">
                  {step.marker || index + 1}
                </div>
                <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">
                  {isNl ? "Stap" : "Step"} {index + 1}
                </p>
                <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">
                  {step.title}
                </h3>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">
                  {step.copy}
                </p>
                <p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold leading-5 text-jade">
                  <MapPin size={13} className="mr-1 inline text-saffron" />
                  {step.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="focus"
        className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow !text-saffron-light">{data.focusEyebrow}</p>
            <h2 className="font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.035em]">
              {data.focusTitle}
            </h2>
            <p className="mt-6 text-sm font-medium leading-7 text-white/66">
              {data.focusDescription}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {data.focusCards.map(({ title, copy, icon: Icon }) => (
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
        id="timing"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading
              eyebrow={data.timingEyebrow}
              title={data.timingTitle}
              description={data.timingDescription}
            />
            <p className="text-xs font-medium leading-6 text-charcoal/58">
              {isNl
                ? "Gebruik dit als planningssignalen, niet als garanties. Controleer voor de dag zelf het actuele weer, locatie-informatie, straatafsluitingen en instructies van de aanbieder."
                : "Treat these as planning cues, not guarantees. Check the current weather, venue information, road closures and provider instructions for the day itself."}
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-jade/10 bg-jade/10">
            <div className="hidden grid-cols-[.55fr_1.2fr_1.2fr_.7fr] bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white md:grid">
              <span>Moment</span>
              <span>{isNl ? "Hoe het voelt" : "What it feels like"}</span>
              <span>{isNl ? "Zo gebruik je het" : "How to use it"}</span>
              <span>{isNl ? "Signaal" : "Cue"}</span>
            </div>
            {data.timingRows.map((row) => (
              <article
                key={row.period}
                className={`grid gap-3 border-b border-jade/10 p-6 last:border-0 md:grid-cols-[.55fr_1.2fr_1.2fr_.7fr] ${row.highlight ? "bg-saffron-pale" : "bg-white"}`}
              >
                <h3 className="font-display text-[1.35rem] font-semibold text-jade">
                  {row.period}
                </h3>
                <p className="text-xs font-medium leading-5 text-charcoal/64">
                  {row.feel}
                </p>
                <p className="text-xs font-medium leading-5 text-charcoal/64">
                  {row.plan}
                </p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-saffron-dark">
                  {row.cue}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <SectionHeading
            eyebrow={data.highlightEyebrow}
            title={data.highlightTitle}
            description={data.highlightDescription}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {data.highlights.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[1.7rem] font-semibold text-jade">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">
                    {item.copy}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">
                    {item.label}{" "}
                    <ArrowRight size={13} className="text-saffron" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="practical"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading
            eyebrow={data.practicalEyebrow}
            title={data.practicalTitle}
            description={data.practicalDescription}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {data.practicalCards.map(({ title, copy, icon: Icon }) => (
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
                {isNl ? "Controleer actuele details" : "Check live details"}
              </p>
              <h2 className="font-display text-[3.2rem] font-semibold leading-[0.9]">
                {data.bookingTitle}
              </h2>
            </div>
            <p className="text-sm font-medium leading-7 text-white/66">
              {data.bookingDescription}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {data.bookingCards.map(
              ({ title, copy, href, label, icon: Icon, affiliate }) => (
                <article
                  key={title}
                  className="flex min-h-[285px] flex-col rounded-2xl border border-white/13 bg-white/[0.065] p-7"
                >
                  <Icon size={25} className="text-saffron-light" />
                  <h3 className="mt-6 font-display text-[1.7rem] font-semibold">
                    {title}
                  </h3>
                  <p className="mt-4 flex-1 text-xs font-medium leading-6 text-white/64">
                    {copy}
                  </p>
                  {affiliate ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer nofollow sponsored"
                      className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light"
                    >
                      {label} <ExternalLink size={13} />
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light"
                    >
                      {label} <ArrowRight size={13} />
                    </Link>
                  )}
                </article>
              ),
            )}
          </div>
          <AffiliateDisclosure className="mt-4 !text-white/55">
            {isNl
              ? "Kaarten met actuele provideropties zijn gesponsord. Wij kunnen een commissie ontvangen zonder jouw prijs te verhogen; interne redactionele gidslinks leveren geen commissie op."
              : "Cards marked as live provider options are sponsored. We may earn a commission without increasing your price; editorial guide links do not earn one."}
          </AffiliateDisclosure>
        </div>
      </section>

      <FaqSplitSection
        id="questions"
        eyebrow={isNl ? "Echte zoekvragen" : "Genuine search questions"}
        title={
          isNl
            ? `Vragen over ${data.breadcrumbLabel.toLowerCase()}`
            : `Questions about ${data.breadcrumbLabel.toLowerCase()}`
        }
        description={data.faqDescription}
        items={data.faqs}
      />
      <RelatedGuidesSection
        eyebrow={isNl ? "Houd de cluster helder" : "Keep the cluster clear"}
        title={
          isNl
            ? "Plan verder door Old Town en Phuket"
            : "Continue through Old Town and Phuket"
        }
        readLabel={isNl ? "Open de gids" : "Open the guide"}
        guides={data.related}
      />
      <SourceMethodSection
        eyebrow={isNl ? "Bronnen & methode" : "Sources & method"}
        title={
          isNl
            ? "Zoekintentiegestuurd, gecontroleerd en prijslicht."
            : "Search-led, fact-checked and price-light."
        }
        description={data.methodDescription}
        sources={data.sources}
      />
    </div>
  );
}
