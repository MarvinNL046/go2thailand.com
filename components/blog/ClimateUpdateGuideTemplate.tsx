import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenText,
  Check,
  CloudRain,
  ExternalLink,
  HeartPulse,
  Map,
  MapPinned,
  ShieldCheck,
  SunMedium,
  ThermometerSun,
  Waves,
  Wind,
} from "lucide-react";
import type {
  ClimateGuideIcon,
  ClimateUpdateGuideData,
} from "../../data/climate/types";
import FeedbackForm from "../FeedbackForm";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import {
  EditorialHero,
  type EditorialHeroAction,
} from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import {
  PageSectionNav,
  type PageSectionNavItem,
} from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SourceMethodSection } from "../design/SourceMethodSection";

interface ClimateUpdateGuideTemplateProps {
  data: ClimateUpdateGuideData;
}

const iconMap: Record<ClimateGuideIcon, LucideIcon> = {
  cloud: CloudRain,
  heat: ThermometerSun,
  map: Map,
  rain: CloudRain,
  shield: ShieldCheck,
  sun: SunMedium,
  waves: Waves,
  wind: Wind,
};

const templateCopy = {
  nl: {
    nav: ["Status", "Betekenis", "Per regio", "Plan A–C", "Meenemen", "Vragen"],
    currentStatus: "Bekijk de actuele status",
    weatherGuide: "Open de weergids",
    travelGuide: "Reisgids",
    breadcrumb: "Weer & El Niño",
    sourceStatus: "Bronstatus",
    currentOn: "Actueel op 26 juli 2026",
    sourceSummary:
      "WMO voor het klimaatsignaal. TMD voor jouw reisdag. WHO voor hittegezondheid.",
    openTmd: "Open actuele TMD-verwachting",
    bannerAlt: "Tropische weersomslag boven de Chao Phraya in Bangkok",
    bannerEyebrow: "De kern van deze update",
    bannerTitle: "Klimaat geeft de kans. Lokaal weer bepaalt de dag.",
    bannerDescription:
      "Een flexibele route is geen concessie. Het is de manier waarop je in tropisch weer betere keuzes maakt zonder iedere bui als een mislukte vakantiedag te zien.",
    warnings: "Bekijk TMD-waarschuwingen",
    regionEyebrow: "Niet één Thailand-weer",
    regionTitle: "Lees je regio vóór je het landelijk verhaal leest",
    regionDescription:
      "Gebruik deze kaarten als keuzehulp. Voor een concrete datum controleer je daarna de officiële lokale verwachting.",
    planEyebrow: "Plan op omstandigheden",
    planTitle: "Drie dagplannen, één flexibele reis",
    planDescription:
      "De route tussen deze plannen mag op dezelfde ochtend veranderen. Boek de onderdelen die echt weersafhankelijk zijn niet onnodig strak achter elkaar.",
    pack: "Slim inpakken",
    currentOffer: "Bekijk actueel aanbod",
    amazonDisclosure:
      "Als Amazon-partner verdienen wij aan in aanmerking komende aankopen. Jij betaalt niets extra. Producten zijn voorbeelden per gebruiksmoment, geen medische aanbeveling; controleer prijs, verkoper, levering en geschiktheid zelf.",
    medicalEyebrow: "Wanneer hitte medisch wordt",
    medicalTitle:
      "Verward, bewusteloos of een hete droge huid? Schakel direct hulp in.",
    medicalDescription:
      "WHO beschrijft hitteberoerte als een levensbedreigende noodsituatie. Breng de persoon naar een koele plek, begin met koelen en bel medische hulp. Bij twijfel volg je professionele instructies.",
    who: "Lees WHO-advies",
    faqEyebrow: "Echte vragen uit de Nederlandse SERP",
    faqTitle: "Veelgestelde vragen over El Niño en Thailand in 2026",
    faqDescription:
      "De vragen zijn via DataForSEO uit Nederlandse Google-resultaten vastgelegd. De antwoorden zijn opnieuw gecontroleerd op 26 juli 2026 en scheiden een mondiaal klimaatsignaal bewust van lokaal reisweer.",
    relatedEyebrow: "Verder plannen",
    relatedTitle: "Plan verder dan één weerskop",
    relatedSide: "Volledige Thailand-weergids",
    readLabel: "Lees de gids",
    sourceEyebrow: "Bronnen & methode",
    sourceTitle: "Hoe is deze weerupdate onderzocht?",
    sourceDescription:
      "GA4 wees deze bestaande Nederlandse pagina aan als bewezen verkeersroute. DataForSEO leverde de actuele SERP, echte PAA, rankings en backlinkstatus. Feiten zijn daarna gecontroleerd bij WMO, TMD, WHO en NederlandWereldwijd. Tijdgebonden status staat daarom expliciet bij de update.",
    language: "nl-NL",
    articleName: "El Niño 2026 in Thailand",
    about: "El Niño en reizen in Thailand",
    weatherHref: "/nl/weather/",
    breadcrumbUrl: "https://go2-thailand.com/nl/travel-guides/",
    homeUrl: "https://go2-thailand.com/nl/",
  },
  en: {
    nav: [
      "Status",
      "What it means",
      "By region",
      "Plan A–C",
      "What to pack",
      "Questions",
    ],
    currentStatus: "See the current status",
    weatherGuide: "Open the weather guide",
    travelGuide: "Travel guide",
    breadcrumb: "Weather & El Niño",
    sourceStatus: "Source status",
    currentOn: "Current on 26 July 2026",
    sourceSummary:
      "WMO for the climate signal. TMD for your travel day. WHO for heat health.",
    openTmd: "Open the current TMD forecast",
    bannerAlt: "Tropical weather change above the Chao Phraya in Bangkok",
    bannerEyebrow: "The core of this update",
    bannerTitle: "Climate changes the odds. Local weather decides the day.",
    bannerDescription:
      "A flexible route is not a compromise. It is how you make better decisions in tropical weather without treating every shower as a lost holiday day.",
    warnings: "Check TMD warnings",
    regionEyebrow: "Thailand does not have one weather pattern",
    regionTitle: "Read your region before the national headline",
    regionDescription:
      "Use these cards to choose a plan. For a specific date, check the official local forecast next.",
    planEyebrow: "Plan for conditions",
    planTitle: "Three day plans, one flexible trip",
    planDescription:
      "You can switch plans on the same morning. Avoid stacking weather-dependent bookings too tightly.",
    pack: "Pack for both conditions",
    currentOffer: "Check current Amazon offer",
    amazonDisclosure:
      "As an Amazon Associate we earn from qualifying purchases, at no extra cost to you. Products are examples for a practical use case, not medical recommendations; verify current price, seller, delivery and suitability.",
    medicalEyebrow: "When heat becomes a medical emergency",
    medicalTitle:
      "Confused, unconscious or hot with dry skin? Get urgent medical help.",
    medicalDescription:
      "WHO describes heatstroke as a life-threatening emergency. Move the person to a cool place, start cooling and call medical services. Follow professional instructions whenever in doubt.",
    who: "Read WHO guidance",
    faqEyebrow: "Exact questions from the English SERP",
    faqTitle: "Questions about El Niño and Thailand in 2026",
    faqDescription:
      "These exact People Also Ask questions were captured from English UK Google results through DataForSEO. Answers were checked again on 26 July 2026 and keep a global climate signal separate from local travel weather.",
    relatedEyebrow: "Continue planning",
    relatedTitle: "Plan beyond one weather headline",
    relatedSide: "Full Thailand weather guide",
    readLabel: "Read the guide",
    sourceEyebrow: "Sources & method",
    sourceTitle: "How was this weather update researched?",
    sourceDescription:
      "GA4 identifies this URL as a proven traffic route. Independent English DataForSEO research supplied live SERPs, exact PAA, rankings and backlink status. Time-sensitive claims were then checked against WMO, TMD and WHO primary sources.",
    language: "en",
    articleName: "El Niño 2026 in Thailand",
    about: "El Niño and travel in Thailand",
    weatherHref: "/weather/",
    breadcrumbUrl: "https://go2-thailand.com/travel-guides/",
    homeUrl: "https://go2-thailand.com/",
  },
};

export function ClimateUpdateGuideTemplate({
  data,
}: ClimateUpdateGuideTemplateProps) {
  const copy = templateCopy[data.locale];
  const navItems: PageSectionNavItem[] = [
    { href: "#kort", label: copy.nav[0], icon: ShieldCheck },
    { href: "#betekenis", label: copy.nav[1], icon: Wind },
    { href: "#regios", label: copy.nav[2], icon: MapPinned },
    { href: "#plan", label: copy.nav[3], icon: CloudRain },
    { href: "#meenemen", label: copy.nav[4], icon: Check },
    { href: "#vragen", label: copy.nav[5], icon: BookOpenText },
  ];
  const heroActions: EditorialHeroAction[] = [
    { label: copy.currentStatus, href: "#kort", kind: "primary" },
    { label: copy.weatherGuide, href: copy.weatherHref, kind: "secondary" },
  ];
  const breadcrumbs = [
    { label: "Thailand", href: "/" },
    { label: copy.travelGuide, href: "/travel-guides/" },
    { label: copy.breadcrumb },
  ];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${data.pageUrl}#article`,
    headline: data.pageTitle,
    description: data.pageDescription,
    image: `https://go2-thailand.com${data.hero.image}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    inLanguage: copy.language,
    author: { "@type": "Organization", name: data.author },
    publisher: {
      "@type": "Organization",
      name: "Go2Thailand",
      url: "https://go2-thailand.com/",
    },
    mainEntityOfPage: data.pageUrl,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Thailand",
        item: copy.homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.travelGuide,
        item: copy.breadcrumbUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: copy.articleName,
        item: data.pageUrl,
      },
    ],
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${data.pageUrl}#webpage`,
    url: data.pageUrl,
    name: data.pageTitle,
    description: data.pageDescription,
    inLanguage: copy.language,
    dateModified: data.dateModified,
    about: { "@type": "Thing", name: copy.about },
  };

  return (
    <>
      <SEOHead
        title={data.pageTitle}
        description={data.pageDescription}
        ogImage={`https://go2-thailand.com${data.hero.image}`}
      >
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={data.datePublished} />
        <meta property="article:modified_time" content={data.dateModified} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={breadcrumbs}
          eyebrow={data.hero.eyebrow}
          title={
            <>
              {data.hero.title}
              <span className="sr-only"> </span>
              <span className="block text-[2.7rem] text-saffron-dark sm:text-[3.75rem] lg:text-[4.35rem]">
                {data.hero.accent}
              </span>
            </>
          }
          titleClassName="max-w-[720px] text-[3.65rem] leading-[0.86] sm:text-[4.8rem] lg:text-[5.6rem]"
          subtitle={data.hero.subtitle}
          subtitleClassName="max-w-[620px] text-[1.3rem] leading-[1.08] sm:text-[1.65rem]"
          description={data.hero.description}
          descriptionClassName="mt-5 max-w-[640px] text-sm leading-7"
          actions={heroActions}
          minHeightClassName="min-h-[790px] lg:min-h-[690px]"
          imageClassName="object-cover object-[66%_center]"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.18)_0%,rgba(252,250,246,0.62)_38%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_38%,rgba(252,250,246,0.38)_62%,rgba(18,63,54,0.04)_100%)]"
          sideCard={
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1180px)/2))] z-10 hidden w-[350px] rounded-2xl border border-white/70 bg-canvas/[0.94] p-5 shadow-[0_18px_50px_rgba(18,63,54,0.16)] backdrop-blur-md xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-dark">
                {copy.sourceStatus}
              </p>
              <h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-jade">
                {copy.currentOn}
              </h2>
              <p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">
                {copy.sourceSummary}
              </p>
              <a
                href="https://tmd.go.th/en/weather/weatherthailand"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-jade hover:text-saffron-dark"
              >
                {copy.openTmd} <ExternalLink size={12} />
              </a>
            </div>
          }
        />
        <div className="section-divider-bottom bg-canvas">
          <div className="container-custom py-3 text-[10px] font-medium leading-5 text-charcoal/48">
            {data.hero.imageCaption}
          </div>
        </div>

        <PageSectionNav items={navItems} />

        <section
          id="kort"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow">{data.status.label}</p>
              <h2 className="heading-redesign">{data.status.title}</h2>
              <p className="mt-6 text-sm font-medium leading-7 text-charcoal/72">
                {data.status.summary}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-jade/10 bg-mist px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-jade">
                <ShieldCheck size={14} />
                {data.status.checked}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {data.status.facts.map((fact) => {
                const Icon = iconMap[fact.icon];
                return (
                  <article
                    key={fact.label}
                    className="rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_12px_36px_rgba(18,63,54,0.055)]"
                  >
                    <Icon
                      size={28}
                      strokeWidth={1.4}
                      className="text-saffron-dark"
                    />
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-charcoal/42">
                      {fact.label}
                    </p>
                    <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">
                      {fact.value}
                    </h3>
                    <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/60">
                      {fact.note}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="betekenis"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
        >
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="eyebrow">{data.fundamentals.eyebrow}</p>
                <h2 className="heading-redesign">{data.fundamentals.title}</h2>
              </div>
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">
                {data.fundamentals.intro}
              </p>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {data.fundamentals.cards.map((card) => {
                const Icon = iconMap[card.icon];
                const dark = card.tone === "jade";
                return (
                  <article
                    key={card.title}
                    className={`rounded-2xl border p-6 sm:p-7 ${dark ? "border-jade bg-jade text-white shadow-editorial-lift" : "border-jade/10 bg-canvas text-charcoal shadow-[0_12px_36px_rgba(18,63,54,0.045)]"}`}
                  >
                    <Icon
                      size={30}
                      strokeWidth={1.35}
                      className={
                        dark ? "text-saffron-light" : "text-saffron-dark"
                      }
                    />
                    <h3
                      className={`mt-8 font-display text-[1.85rem] font-semibold leading-[0.98] ${dark ? "text-white" : "text-jade"}`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`mt-4 text-sm font-medium leading-6 ${dark ? "text-white/68" : "text-charcoal/65"}`}
                    >
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-jade-dark shadow-[0_18px_55px_rgba(18,63,54,0.17)]">
              <Image
                src={data.hero.image}
                alt={copy.bannerAlt}
                fill
                sizes="100vw"
                className="object-cover object-[72%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,54,47,0.97)_0%,rgba(6,54,47,0.84)_40%,rgba(6,54,47,0.12)_76%)]" />
              <div className="relative z-10 flex min-h-[400px] max-w-[610px] flex-col justify-center p-7 text-white sm:p-10 lg:p-12">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">
                  {copy.bannerEyebrow}
                </p>
                <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em] sm:text-[3.7rem]">
                  {copy.bannerTitle}
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/74">
                  {copy.bannerDescription}
                </p>
                <a
                  href="https://tmd.go.th/en/weather/weatherthailand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cream mt-7 w-fit"
                >
                  {copy.warnings}{" "}
                  <ExternalLink size={14} className="text-saffron-dark" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="regios"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <div className="max-w-3xl">
              <p className="eyebrow">{copy.regionEyebrow}</p>
              <h2 className="heading-redesign">{copy.regionTitle}</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/67">
                {copy.regionDescription}
              </p>
            </div>
            <div className="mt-9 grid gap-4 lg:grid-cols-4">
              {data.regions.map((region, index) => {
                const Icon = iconMap[region.icon];
                return (
                  <article
                    key={region.name}
                    className="flex min-h-[360px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_14px_42px_rgba(18,63,54,0.055)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-tonal text-jade">
                        <Icon size={22} strokeWidth={1.4} />
                      </span>
                      <span className="text-[10px] font-extrabold text-saffron-dark">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-7 font-display text-[1.75rem] font-semibold leading-none text-jade">
                      {region.name}
                    </h3>
                    <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                      {region.signal}
                    </p>
                    <p className="mt-5 text-xs font-medium leading-5 text-charcoal/64">
                      {region.description}
                    </p>
                    <p className="mt-auto border-t border-jade/10 pt-5 text-[11px] font-semibold leading-5 text-jade">
                      <Check size={13} className="mb-2 text-saffron-dark" />
                      {region.action}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="plan"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
        >
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="eyebrow">{copy.planEyebrow}</p>
                <h2 className="heading-redesign">{copy.planTitle}</h2>
              </div>
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/67 lg:justify-self-end">
                {copy.planDescription}
              </p>
            </div>
            <div className="relative mt-10 grid gap-5 lg:grid-cols-3">
              <div
                aria-hidden="true"
                className="absolute left-[15%] right-[15%] top-12 hidden border-t-2 border-dashed border-saffron/55 lg:block"
              />
              {data.decisionPlan.map((plan) => {
                const Icon = iconMap[plan.icon];
                return (
                  <article
                    key={plan.label}
                    className="relative rounded-2xl border border-jade/10 bg-canvas p-6 shadow-[0_14px_42px_rgba(18,63,54,0.055)]"
                  >
                    <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-tonal bg-saffron text-white">
                      <Icon size={20} />
                    </span>
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">
                      {plan.label}
                    </p>
                    <h3 className="mt-2 font-display text-[1.95rem] font-semibold leading-none text-jade">
                      {plan.title}
                    </h3>
                    <p className="mt-4 text-sm font-medium leading-6 text-charcoal/64">
                      {plan.description}
                    </p>
                    <p className="mt-6 flex items-center gap-2 border-t border-jade/10 pt-5 text-[11px] font-extrabold text-jade">
                      <ArrowRight size={13} className="text-saffron-dark" />
                      {plan.action}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="meenemen"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[390px] lg:min-h-full">
                  <Image
                    src={data.kit.image}
                    alt={data.kit.imageAlt}
                    fill
                    sizes="(max-width:1024px) 100vw,50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="eyebrow">{copy.pack}</p>
                  <h2 className="heading-redesign">{data.kit.title}</h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-charcoal/67">
                    {data.kit.description}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {data.kit.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-xs font-medium leading-5 text-charcoal/66"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mist text-jade">
                          <Check size={12} strokeWidth={2.4} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-jade/10 bg-jade p-6 text-white sm:p-8 lg:p-10">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {data.kit.products.map((product) => (
                    <article
                      key={product.amazonSlug}
                      className="group flex min-h-[210px] flex-col rounded-2xl border border-white/12 bg-white/[0.07] p-5"
                    >
                      <h3 className="font-display text-[1.55rem] font-semibold leading-none">
                        {product.title}
                      </h3>
                      <p className="mt-3 text-[11px] font-medium leading-5 text-white/62">
                        {product.reason}
                      </p>
                      <a
                        href={`/go/${product.amazonSlug}/`}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-5 text-[10px] font-extrabold text-white transition hover:text-saffron-light"
                      >
                        {copy.currentOffer} <ExternalLink size={13} />
                      </a>
                    </article>
                  ))}
                </div>
                <AffiliateDisclosure className="mt-5 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 !text-white/70">
                  {copy.amazonDisclosure}
                </AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-mist py-12 lg:py-16">
          <div className="container-custom grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-jade text-saffron-light">
              <HeartPulse size={26} />
            </span>
            <div>
              <p className="eyebrow">{copy.medicalEyebrow}</p>
              <h2 className="font-display text-[2.15rem] font-semibold leading-none text-jade">
                {copy.medicalTitle}
              </h2>
              <p className="mt-3 max-w-3xl text-xs font-medium leading-5 text-charcoal/64">
                {copy.medicalDescription}
              </p>
            </div>
            <a
              href="https://www.who.int/europe/news-room/fact-sheets/item/keepcool-in-the-heat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-jade/20 bg-white px-5 text-[11px] font-extrabold text-jade transition hover:border-saffron/50 hover:text-saffron-dark"
            >
              {copy.who} <ExternalLink size={13} />
            </a>
          </div>
        </section>

        <FaqSplitSection
          eyebrow={copy.faqEyebrow}
          title={copy.faqTitle}
          description={copy.faqDescription}
          items={data.faqs}
        />
        <RelatedGuidesSection
          eyebrow={copy.relatedEyebrow}
          title={copy.relatedTitle}
          guides={data.relatedGuides}
          sideLink={{ label: copy.relatedSide, href: copy.weatherHref }}
          readLabel={copy.readLabel}
        />
        <SourceMethodSection
          eyebrow={copy.sourceEyebrow}
          title={copy.sourceTitle}
          description={copy.sourceDescription}
          sources={data.sources}
        />
        <section className="section-divider-bottom py-12">
          <div className="container-custom">
            <FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} />
          </div>
        </section>
      </div>
    </>
  );
}
