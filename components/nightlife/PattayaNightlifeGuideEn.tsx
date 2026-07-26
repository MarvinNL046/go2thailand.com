import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  GlassWater,
  Hotel,
  MapPin,
  MapPinned,
  Martini,
  Music2,
  Navigation,
  Phone,
  ReceiptText,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
  Ticket,
  Users,
  WalletCards,
  Waves,
  Zap,
} from "lucide-react";
import {
  cityAffiliates,
  KLOOK_GENERIC,
  withPlacementSubId,
} from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";
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

const PAGE_URL = "https://go2-thailand.com/nightlife/pattaya/";
const PAGE_TITLE = "Pattaya Nightlife Guide: Areas, Rules & a Safe Night Out";
const PAGE_DESCRIPTION =
  "Choose the Pattaya nightlife area that fits you: Walking Street, Soi Buakhao, Jomtien or a planned show. Current rules, budget checks and a safe return plan.";
const HERO_IMAGE = "/images/redesign/pattaya-nightlife-hero.webp";

const sectionNav: PageSectionNavItem[] = [
  { href: "#choose", label: "Choose a mood", icon: Sparkles },
  { href: "#route", label: "Night route", icon: Route },
  { href: "#budget", label: "Budget", icon: WalletCards },
  { href: "#rules", label: "Rules", icon: BadgeCheck },
  { href: "#return", label: "Get back safely", icon: ShieldCheck },
  { href: "#book", label: "Shows", icon: Ticket },
  { href: "#questions", label: "Questions", icon: CircleHelp },
];

interface NightMood {
  icon: LucideIcon;
  name: string;
  cue: string;
  fits: string;
  expect: string;
  check: string;
}

const nightMoods: NightMood[] = [
  {
    icon: Music2,
    name: "Walking Street",
    cue: "Maximum energy",
    fits: "You want to experience Pattaya’s best-known nightlife strip once, with clubs, live music and highly visible adult entertainment.",
    expect:
      "Dense crowds, loud music, promoters and venues that change quickly. You can walk the street without entering every bar.",
    check:
      "Choose one venue type and a finish time before you arrive; do not let the loudest doorway design your whole night.",
  },
  {
    icon: GlassWater,
    name: "Soi Buakhao & LK Metro",
    cue: "Compact bar hop",
    fits: "You prefer casual bars, sport screens, food and a compact street rhythm away from the main beachfront strip.",
    expect:
      "A busy traffic street with many side lanes and a substantial adult-entertainment presence around LK Metro.",
    check:
      "This is not a pedestrian zone. Put your phone away when crossing and agree on one well-lit pickup point.",
  },
  {
    icon: Waves,
    name: "Jomtien",
    cue: "Slower and inclusive",
    fits: "You want beach restaurants, casual bars or the LGBTQ+ scene around Jomtien Complex without making Walking Street the centrepiece.",
    expect:
      "A more dispersed, generally slower evening; the atmosphere varies significantly by street, venue and night.",
    check:
      "Check the venue’s latest official update and arrange the return because Jomtien sits outside the compact central cluster.",
  },
  {
    icon: Sun,
    name: "Sunset, rooftop or show",
    cue: "A planned evening",
    fits: "You are travelling as a couple, group or family and want a clear start time, reserved seat or quieter view instead of a bar crawl.",
    expect:
      "A sunset restaurant, hotel lounge or cabaret can make the night more predictable, but may require a booking or dress code.",
    check:
      "Compare the exact date, venue, seat category, duration, inclusions, transfer and cancellation terms before paying.",
  },
];

const routeSteps = [
  {
    time: "18:30",
    title: "Eat before the rush",
    text: "Choose a real dinner stop in or near your evening area. Starting with food prevents the night becoming a chain of impulsive street choices.",
    icon: Sun,
  },
  {
    time: "20:00",
    title: "Sample one mood",
    text: "Walk one short loop first. Seeing a street does not obligate you to enter a venue, order a drink or accept an invitation.",
    icon: Eye,
  },
  {
    time: "22:00",
    title: "Stay or switch once",
    text: "If the atmosphere fits, keep the night compact. If it does not, choose one deliberate alternative instead of spending the night in taxis.",
    icon: Route,
  },
  {
    time: "Beforehand",
    title: "Lock in the return",
    text: "Save your hotel address, pickup pin and emergency contact before your battery is low and your group has split up.",
    icon: Navigation,
  },
];

const venueChecks = [
  {
    label: "Open?",
    title: "Recent activity",
    text: "Find a recent official post, event listing or bookable date. An old review does not prove the venue still has the same name or concept.",
  },
  {
    label: "What costs?",
    title: "Price before ordering",
    text: "Read the menu, admission, seat category, minimum spend and included drink before ordering or handing over payment.",
  },
  {
    label: "Where exactly?",
    title: "Pin and pickup point",
    text: "Match the map pin to an official contact page and choose a bright pickup point outside the densest pedestrian flow.",
  },
];

const faqs = [
  {
    question: "Which part of Pattaya is best for nightlife?",
    answer:
      "Walking Street suits maximum energy and a first look at Pattaya’s most famous strip. Soi Buakhao and LK Metro work for a compact bar hop, Jomtien for a slower or more inclusive evening, and a rooftop or cabaret for a planned night. The best area depends on your tolerance for noise, crowds, adult entertainment and travel time.",
  },
  {
    question: "What are the mistakes to avoid in Pattaya?",
    answer:
      "Avoid ordering without a visible price, leaving an open tab unchecked, handing over your passport as security, using illegal drugs or riding a scooter after drinking. Keep your drink in sight, protect valuables in dense crowds and do not follow anyone to another location unless it is your own clear and sober decision.",
  },
  {
    question: "What is Soi Buakhao famous for?",
    answer:
      "Soi Buakhao is a busy central street between Second and Third Road, known for food, services, casual bars, side streets and the nearby LK Metro entertainment area. It is compact and lively but also traffic-heavy and includes visible adult entertainment.",
  },
  {
    question: "What’s the nightlife like on Soi Buakhao?",
    answer:
      "It feels more like a long, busy neighbourhood strip than a single pedestrian attraction. Expect open-fronted bars, sport screens, food, music and many short side streets. Prices and atmosphere vary by venue, so check the menu before ordering and do not treat the road as car-free.",
  },
  {
    question: "What is Walking Street in Pattaya famous for?",
    answer:
      "Walking Street is famous for its dense mix of clubs, live music, restaurants, neon signs and visible adult entertainment. It is Pattaya’s best-known nightlife landmark, but not a complete picture of the city’s evenings and not automatically the right choice for every traveller.",
  },
  {
    question: "What are some things to avoid on Walking Street?",
    answer:
      "Avoid carrying valuables where they are easy to reach, blocking the pedestrian flow while using your phone, accepting unclear offers or ordering before seeing the full price. Thailand’s tourism authority specifically warns visitors about pickpockets in the Walking Street crowds.",
  },
  {
    question: "What are the transportation options to Walking Street, Pattaya?",
    answer:
      "Depending on where you stay, options include walking, a songthaew on an appropriate route, a metered or negotiated taxi, and app-based transport where available. Check the live route and fare, agree on the destination, and select a well-lit pickup point outside the busiest entrance before the night begins.",
  },
  {
    question: "What time does Walking Street close in Pattaya?",
    answer:
      "There is no reliable universal closing time for every venue. Licensed entertainment venues in designated parts of Chon Buri may operate under the separate 04:00 framework, but this does not mean every bar can or will stay open until 04:00. Verify the individual venue on the day you visit.",
  },
  {
    question: "What is the red-light district street in Pattaya?",
    answer:
      "Walking Street is the internationally recognised name most associated with Pattaya’s adult-entertainment scene, while related venues also appear around areas such as Soi 6 and LK Metro. Travellers who prefer to avoid that setting can choose Jomtien, a hotel lounge, restaurant, night market or preselected show.",
  },
];

const sources = [
  {
    title: "Alcohol sales and consumption rules updated in Thailand",
    creator: "TAT Newsroom · 29 May 2026",
    url: "https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/",
    note: "Primary tourism guidance for current general alcohol-sale hours, the minimum age, exceptions and temporary restrictions.",
  },
  {
    title: "Entertainment venues in tourist destinations to open until 4 am",
    creator: "TAT Newsroom",
    url: "https://www.tatnews.org/2023/12/entertainment-venues-in-thai-tourist-destinations-to-open-until-4-am/",
    note: "Source for the limited 04:00 framework: licensed entertainment venues in designated areas, including Chon Buri.",
  },
  {
    title: "Pattaya destination information",
    creator: "Tourism Authority of Thailand",
    url: "https://www.tourismthailand.org/Destinations/Provinces/Pattaya/469",
    note: "Official destination context and the specific warning about pickpockets in crowded Walking Street.",
  },
  {
    title: "Tourist Police 1155",
    creator: "Thailand Tourist Police Bureau",
    url: "https://www.touristpolice.go.th/main",
    note: "Official route for 24-hour tourist assistance, interpretation support and hotline 1155.",
  },
  {
    title: "Thailand travel advice",
    creator: "UK Foreign, Commonwealth & Development Office",
    url: "https://www.gov.uk/foreign-travel-advice/thailand",
    note: "Current English-language government guidance used to check nightlife, drink, drugs, crime and road-safety boundaries.",
  },
  {
    title: "Pattaya Nightlife Guide 2026",
    creator: "Pattaya Pointer · secondary source",
    url: "https://pattayapointer.com/guides/pattaya-nightlife-guide/",
    note: "Recent market source used only to test area coverage and changing venue patterns; its prices and rankings were not treated as facts.",
  },
];

function createSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: "2026-03-10",
      dateModified: "2026-07-26",
      inLanguage: "en",
      mainEntityOfPage: PAGE_URL,
      author: {
        "@type": "Organization",
        name: "Go2Thailand",
        url: "https://go2-thailand.com/",
      },
      publisher: {
        "@type": "Organization",
        name: "Go2Thailand",
        url: "https://go2-thailand.com/",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
          item: "https://go2-thailand.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Nightlife",
          item: "https://go2-thailand.com/nightlife/",
        },
        { "@type": "ListItem", position: 3, name: "Pattaya", item: PAGE_URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to plan a night out in Pattaya",
      step: routeSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Four types of Pattaya nightlife",
      itemListElement: nightMoods.map((mood, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: mood.name,
        description: mood.fits,
      })),
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark"
    >
      {children}
    </Link>
  );
}

export function PattayaNightlifeGuideEn() {
  const subId = useSubId();
  const klookHref = withPlacementSubId(
    cityAffiliates.pattaya?.klook || KLOOK_GENERIC,
    subId,
    "pattaya-nightlife-organised-evening",
  );
  const schemas = createSchemas();

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        ogImage={`https://go2-thailand.com${HERO_IMAGE}`}
      >
        <meta
          name="keywords"
          content="pattaya nightlife, walking street pattaya, pattaya nightlife areas, soi buakhao nightlife, pattaya bars, pattaya clubs, jomtien nightlife"
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-10" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => (
          <script
            key={`${schema["@type"]}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Pattaya after sunset"
          title={
            <>
              Choose your night.
              <br />
              Not just a street.
            </>
          }
          subtitle="From full neon to a quiet table by the sea."
          description={
            <>
              Walking Street is the famous name, not the only answer. Choose
              your mood and area first; then set a budget, venue check and
              return route. That keeps the night yours.
            </>
          }
          image={HERO_IMAGE}
          imageAlt="Editorial view of adult travellers overlooking Pattaya Bay at sunset"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Nightlife", href: "/nightlife/" },
            { label: "Pattaya" },
          ]}
          actions={[
            { label: "Choose your night", href: "#choose", kind: "primary" },
            { label: "Plan the return", href: "#return", kind: "secondary" },
          ]}
          minHeightClassName="min-h-[890px] lg:min-h-[735px]"
          contentClassName="max-w-[735px]"
          titleClassName="max-w-[760px] text-[3.55rem] leading-[0.86] sm:text-[4.7rem] lg:text-[5.5rem]"
          subtitleClassName="max-w-[650px] text-[1.45rem] leading-[1.04] text-saffron-dark sm:text-[1.95rem]"
          imageClassName="object-cover object-[67%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.78)_52%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.91)_39%,rgba(5,36,32,0.1)_67%,rgba(5,27,24,0.03)_100%)]"
          sideCard={
            <div className="absolute bottom-8 right-[5vw] z-20 hidden w-[340px] overflow-hidden rounded-[26px] border border-white/65 bg-canvas/94 shadow-editorial-lift backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-6 py-5">
                <p className="eyebrow !mb-0">Night passport · July 2026</p>
                <Martini size={19} className="text-jade" />
              </div>
              <div className="space-y-4 p-6 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Areas</span>
                  <strong className="text-right text-jade">
                    4 different rhythms
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">
                    General alcohol sales
                  </span>
                  <strong className="text-right text-jade">11:00–24:00</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Minimum age</span>
                  <strong className="text-right text-jade">20 years</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Help</span>
                  <strong className="text-right text-saffron-dark">
                    Tourist Police 1155
                  </strong>
                </div>
              </div>
            </div>
          }
        />

        <PageSectionNav items={sectionNav} />

        <section className="section-divider-bottom bg-canvas py-7">
          <div className="container-custom grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPin,
                label: "Choose first",
                value: "Area before venue",
              },
              {
                icon: ReceiptText,
                label: "Before ordering",
                value: "Price and inclusions",
              },
              {
                icon: Navigation,
                label: "Before leaving",
                value: "Save a pickup pin",
              },
              { icon: Phone, label: "Need help?", value: "Call 1155" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 border-l border-jade/12 pl-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-jade/[0.06] text-jade">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                    {label}
                  </p>
                  <p className="mt-1 text-xs font-extrabold text-jade">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="choose"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid items-end gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <SectionHeading
                eyebrow="Four nights in one city"
                title="Walking Street is a choice, not a summary."
                description="The useful question is not which club tops a temporary ranking. It is how much noise, crowding, adult entertainment and movement you want."
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
                <Image
                  src="/images/redesign/pattaya-nightlife-moods.webp"
                  alt="Editorial collage of four different Pattaya nightlife moods"
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052b25]/68 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 sm:inset-x-7 sm:bottom-7">
                  {nightMoods.map((mood) => (
                    <span
                      key={mood.name}
                      className="rounded-full border border-white/25 bg-[#062f29]/72 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur"
                    >
                      {mood.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 divide-y divide-jade/10 border-y border-jade/10">
              {nightMoods.map(
                ({ icon: Icon, name, cue, fits, expect, check }, index) => (
                  <article
                    key={name}
                    className="grid gap-5 py-7 sm:grid-cols-[54px_190px_1fr] lg:grid-cols-[64px_235px_1fr_1fr] lg:items-start"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-saffron/25 bg-saffron/[0.07] text-saffron-dark">
                      <Icon size={22} />
                    </span>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                        0{index + 1} · {cue}
                      </p>
                      <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-jade">
                        {name}
                      </h3>
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/45">
                        Fits you if
                      </p>
                      <p className="mt-2 text-xs font-medium leading-6 text-charcoal/68">
                        {fits}
                      </p>
                      <p className="mt-3 text-xs font-medium leading-6 text-charcoal/56 lg:hidden">
                        {expect}
                      </p>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/45">
                        Expect + check
                      </p>
                      <p className="mt-2 text-xs font-medium leading-6 text-charcoal/68">
                        {expect}
                      </p>
                      <p className="mt-2 text-[11px] font-extrabold leading-5 text-jade">
                        {check}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
            <p className="mt-7 max-w-3xl text-sm font-medium leading-7 text-charcoal/65">
              Need the city context first? The{" "}
              <InlineLink href="/city/pattaya/">
                complete Pattaya guide
              </InlineLink>{" "}
              puts beaches, districts, transport and daytime plans beside the
              nightlife. The{" "}
              <InlineLink href="/nightlife/">
                Thailand nightlife comparison
              </InlineLink>{" "}
              helps when you are still choosing between cities.
            </p>

            <div className="mt-16 grid overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift lg:grid-cols-[0.78fr_1.22fr]">
              <div className="bg-[#0a3932] p-8 text-white sm:p-11">
                <p className="eyebrow !text-saffron-light">
                  Set the expectation first
                </p>
                <h2 className="font-display text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.035em]">
                  Your boundaries belong in the route—not at the doorway.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/66">
                  Adult entertainment is visible from the street in parts of
                  Pattaya. You do not have to enter, buy anything or accept an
                  invitation. A polite, clear “no, thank you” is enough.
                </p>
                <p className="mt-4 text-sm font-medium leading-7 text-white/58">
                  To avoid that setting, skip an unplanned crawl through Walking
                  Street, Soi 6 or LK Metro. A sunset restaurant, hotel lounge,
                  night market or preselected show gives you more control over
                  setting, duration and audience.
                </p>
              </div>
              <div className="divide-y divide-jade/10 p-7 sm:p-10">
                {[
                  {
                    number: "01",
                    title: "Only walk the street",
                    text: "Complete one loop before choosing a venue. Stay in the public flow and be clear if your group only wants the atmosphere or live music.",
                  },
                  {
                    number: "02",
                    title: "Price, photos, boundaries",
                    text: "Ask about admission, minimum spend and photo rules before ordering. Payment never grants permission for touching, filming, personal data or a second location.",
                  },
                  {
                    number: "03",
                    title: "Couple, solo or group",
                    text: "Couples agree on the venue type. Solo travellers keep their room number private. Groups set one meeting point and a clear departure check.",
                  },
                  {
                    number: "04",
                    title: "Families or under 20",
                    text: "Thailand’s legal drinking age is 20 and venues may set stricter entry rules. Choose an early market, restaurant, cabaret or carefully checked show.",
                  },
                ].map((item) => (
                  <article
                    key={item.number}
                    className="grid gap-3 py-6 sm:grid-cols-[52px_190px_1fr]"
                  >
                    <span className="font-display text-2xl font-semibold text-saffron-dark">
                      {item.number}
                    </span>
                    <h3 className="text-sm font-extrabold text-jade">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium leading-6 text-charcoal/63">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="route"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <SectionHeading
                eyebrow="One night, one main line"
                title="From sunset to a return route you already know."
                description="A strong Pattaya night does not collect the most addresses. It has one mood, one decision point and an ending chosen before the first order."
              />
              <div className="relative pt-2">
                <div className="absolute left-6 top-8 h-[calc(100%-4rem)] border-l-2 border-dashed border-saffron/55 lg:left-0 lg:right-0 lg:top-10 lg:h-0 lg:border-l-0 lg:border-t-2" />
                <div className="grid gap-4 lg:grid-cols-4">
                  {routeSteps.map(
                    ({ time, title, text, icon: Icon }, index) => (
                      <article
                        key={title}
                        className="relative ml-12 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card lg:ml-0 lg:mt-7"
                      >
                        <span className="absolute -left-[2.55rem] top-6 grid h-7 w-7 place-items-center rounded-full border-4 border-tonal bg-saffron text-[9px] font-black text-white lg:-top-[2.55rem] lg:left-5">
                          {index + 1}
                        </span>
                        <Icon size={20} className="text-jade" />
                        <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                          {time}
                        </p>
                        <h3 className="mt-2 font-display text-[1.5rem] font-semibold leading-none text-jade">
                          {title}
                        </h3>
                        <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/62">
                          {text}
                        </p>
                      </article>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="mt-14 overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="p-8 sm:p-10">
                  <p className="eyebrow !text-saffron-light">
                    The 60-second venue check
                  </p>
                  <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">
                    A name in a list is not yet a night plan.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/62">
                    Pattaya venues close, move and rebrand. Check these three
                    signals on the same day; call or ask your hotel when
                    information conflicts.
                  </p>
                </div>
                <div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-3 sm:p-9">
                  {venueChecks.map((item, index) => (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-white/14 bg-white/[0.06] p-5"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-xs font-black text-jade">
                        {index + 1}
                      </span>
                      <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">
                        {item.label}
                      </p>
                      <h3 className="mt-2 font-display text-[1.45rem] font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[11px] leading-5 text-white/58">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="budget"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <SectionHeading
                eyebrow="Budget without false precision"
                title="Four categories. No magic nightly price."
                description="Online price lists age quickly and unlike venues cannot be compared honestly. Set your own ceiling and verify every charge before ordering."
              />
              <div className="mt-8 rounded-2xl border border-saffron/25 bg-saffron/[0.07] p-6">
                <ReceiptText size={22} className="text-saffron-dark" />
                <p className="mt-4 text-sm font-extrabold text-jade">
                  Do not build an unclear final bill.
                </p>
                <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">
                  Ask for a menu, track the tab by round and raise an error
                  calmly as soon as it appears. A cheap headline offer without
                  the full terms is not a budget plan.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              {[
                {
                  icon: Navigation,
                  label: "01 · Transport",
                  title: "Out and back",
                  text: "Check the live app fare or agree on the songthaew or taxi price before departure. Keep a larger return buffer for rain, late hours or a changed pickup point.",
                },
                {
                  icon: GlassWater,
                  label: "02 · Drinks",
                  title: "Menu price per round",
                  text: "Choose alcohol-free or alcohol on your terms. Check service, serving size and promotion conditions instead of trusting an old online average.",
                },
                {
                  icon: Ticket,
                  label: "03 · Entry or show",
                  title: "What is included?",
                  text: "Compare the seat, duration, drink, transfer, photo or service costs and cancellation terms before paying.",
                },
                {
                  icon: WalletCards,
                  label: "04 · Buffer",
                  title: "One plan change",
                  text: "Keep room for a different ride, food stop or early exit. Store your main payment method and emergency reserve separately.",
                },
              ].map(({ icon: Icon, label, title, text }) => (
                <article
                  key={label}
                  className="grid gap-4 border-b border-jade/10 p-6 last:border-b-0 sm:grid-cols-[42px_170px_1fr] sm:items-center"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-jade/[0.06] text-jade">
                    <Icon size={19} />
                  </span>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                      {label}
                    </p>
                    <h3 className="mt-1 font-display text-[1.45rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                  </div>
                  <p className="text-xs font-medium leading-6 text-charcoal/62">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="rules"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Rules checked 26 July 2026"
                title="Opening hours and alcohol-sale hours are not the same."
                description="A national sale rule, an entertainment licence and one venue’s actual opening hours are three separate layers."
              />
              <a
                href="https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-jade"
              >
                Read the official TAT update <ExternalLink size={14} />
              </a>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-jade/10 bg-jade/10 md:grid-cols-4">
              {[
                {
                  icon: Clock3,
                  value: "11:00–24:00",
                  title: "General alcohol sales",
                  text: "Since 29 May 2026, the previous 14:00–17:00 restriction is included in the general permitted window.",
                },
                {
                  icon: Users,
                  value: "20 years",
                  title: "Legal minimum age",
                  text: "A venue can request identification and may apply a stricter entry policy than the national drinking age.",
                },
                {
                  icon: BadgeCheck,
                  value: "Only if eligible",
                  title: "Potentially until 04:00",
                  text: "The separate framework applies to licensed entertainment venues in designated areas—not automatically to every business.",
                },
                {
                  icon: CalendarClock,
                  value: "Check the date",
                  title: "Temporary restrictions",
                  text: "Elections, important religious dates and official decisions can temporarily restrict sales or entertainment.",
                },
              ].map(({ icon: Icon, value, title, text }) => (
                <article key={title} className="bg-white p-7">
                  <Icon size={22} className="text-saffron-dark" />
                  <p className="mt-7 font-display text-[1.8rem] font-semibold text-jade">
                    {value}
                  </p>
                  <h3 className="mt-2 text-xs font-extrabold text-jade">
                    {title}
                  </h3>
                  <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/60">
                    {text}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs font-medium leading-6 text-charcoal/58">
              An open venue does not prove every sale or activity is permitted.
              Follow staff and local authorities, use licensed businesses and
              recheck time-sensitive rules on the day you visit.
            </p>
          </div>
        </section>

        <section
          id="return"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="Before the first ride"
                title="Five decisions are settled by 17:00."
                description="A safe return route is not created by adding warnings after midnight. Make the decisions that require clear thinking before you leave."
              />
              <div className="divide-y divide-jade/10 border-y border-jade/10">
                {[
                  {
                    label: "Hotel card",
                    text: "Save the hotel name, address and map pin as a screenshot. An English hotel name alone may not be enough for a driver or passer-by.",
                  },
                  {
                    label: "Group agreement",
                    text: "Choose one meeting point and one moment when everybody explicitly confirms whether they are returning alone or together.",
                  },
                  {
                    label: "Pickup zone",
                    text: "Choose a bright place outside the densest traffic and footfall. Match the vehicle and destination before getting in.",
                  },
                  {
                    label: "Help route",
                    text: "Save Tourist Police 1155 and your hotel reception. For immediate police assistance in Thailand, call 191.",
                  },
                  {
                    label: "Weather + rules",
                    text: "Check rain, any alcohol-free date or election restriction, and the venue’s latest post. A changed plan beats an old screenshot.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="grid gap-3 py-5 sm:grid-cols-[46px_150px_1fr]"
                  >
                    <span className="font-display text-xl font-semibold text-saffron-dark">
                      0{index + 1}
                    </span>
                    <p className="text-xs font-extrabold text-jade">
                      {item.label}
                    </p>
                    <p className="text-xs font-medium leading-6 text-charcoal/63">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-14 min-h-[470px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <Image
                src="/images/redesign/pattaya-nightlife-return-route.webp"
                alt="Editorial view of adult travellers checking their evening return route beside Pattaya Bay"
                fill
                sizes="100vw"
                className="object-cover object-[67%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,31,27,0.96)_0%,rgba(3,31,27,0.78)_38%,rgba(3,31,27,0.08)_75%)]" />
              <div className="relative z-10 flex min-h-[470px] max-w-[650px] flex-col justify-center p-8 text-white sm:p-12">
                <p className="eyebrow !text-saffron-light">
                  Make the final choice first
                </p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.035em] sm:text-[4rem]">
                  Save the way home before the night begins.
                </h2>
                <p className="mt-5 max-w-[560px] text-sm font-medium leading-7 text-white/68">
                  Keep the Thai hotel name, map pin, agreed pickup point and
                  Tourist Police 1155 available offline. Never ride a scooter or
                  motorbike after drinking.
                </p>
                <Link
                  href="/practical-info/scams-safety/"
                  className="btn-cream mt-7 w-fit"
                >
                  Check scams & safety <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Eye,
                    title: "In the crowd",
                    text: "TAT specifically mentions pickpockets on Walking Street. Keep valuables in front of your body and step out of the flow before using your phone.",
                  },
                  {
                    icon: ReceiptText,
                    title: "At the venue",
                    text: "Order only with a visible price, check the bill by round and keep your drink in sight.",
                  },
                  {
                    icon: Navigation,
                    title: "On the street",
                    text: "Soi Buakhao is not pedestrian-only. Look up when crossing and use a bright pickup point outside the busiest flow.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "If something is wrong",
                    text: "Move to a well-lit place, ask venue or hotel staff for help and call Tourist Police 1155 for multilingual support.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <article
                    key={title}
                    className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                  >
                    <Icon size={21} className="text-jade" />
                    <h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
              <aside className="flex flex-col rounded-[26px] bg-[#082f29] p-7 text-white shadow-editorial-lift sm:p-9">
                <Zap size={25} className="text-saffron-light" />
                <p className="eyebrow mt-7 !text-saffron-light">
                  A functional night kit
                </p>
                <h2 className="font-display text-[2.55rem] font-semibold leading-[0.9]">
                  Backup power for your route—not a longer night.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/62">
                  A compact power bank can support navigation and a booked
                  return. It does not replace an offline address, group
                  agreement or sober transport decision.
                </p>
                <a
                  href="/go/anker-powercore-10k/"
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="mt-7 inline-flex min-h-12 items-center justify-between rounded-xl border border-white/16 bg-white/[0.08] px-5 text-xs font-extrabold transition hover:border-saffron/45 hover:bg-white/[0.11]"
                >
                  Check the current price on Amazon{" "}
                  <ExternalLink size={15} className="text-saffron-light" />
                </a>
                <AffiliateDisclosure className="mt-4 !text-white/54">
                  Amazon affiliate link through our central OneLink route. As an
                  Amazon Associate, we earn from qualifying purchases at no
                  extra cost to you. Product, battery rules, price, seller and
                  local availability can vary.
                </AffiliateDisclosure>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="book"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-8 sm:p-11">
                  <p className="eyebrow !text-saffron-light">
                    A fixed start time can simplify the night
                  </p>
                  <h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.035em]">
                    Compare an organised show instead of bar hopping.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/64">
                    Cabaret and other evening activities can provide a clear
                    venue, duration and seat category. The Klook link opens
                    current Pattaya inventory; it does not guarantee a
                    particular product or time slot.
                  </p>
                  <a
                    href={klookHref}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="btn-cream mt-7"
                  >
                    Check current evening activities <ExternalLink size={15} />
                  </a>
                  <AffiliateDisclosure className="mt-4 !text-white/54">
                    Klook affiliate link. Recheck the product name, operator,
                    date, venue, age rules, seat, transfer, inclusions and
                    cancellation terms before paying.
                  </AffiliateDisclosure>
                </div>
                <div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10">
                  {[
                    {
                      icon: MapPinned,
                      title: "Exact venue",
                      text: "Pattaya and Jomtien locations are easy to mix up in a results list.",
                    },
                    {
                      icon: Clock3,
                      title: "Start and finish",
                      text: "Use the current voucher, not a time copied from an old blog or screenshot.",
                    },
                    {
                      icon: Ticket,
                      title: "Seat and inclusions",
                      text: "Standard, VIP, photos, transfers and drinks can be different products.",
                    },
                    {
                      icon: Hotel,
                      title: "Route from your stay",
                      text: "Only then choose a hotel district that also fits the daytime trip.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <article
                      key={title}
                      className="rounded-2xl border border-white/14 bg-white/[0.06] p-5"
                    >
                      <Icon size={21} className="text-saffron-light" />
                      <h3 className="mt-5 font-display text-[1.45rem] font-semibold">
                        {title}
                      </h3>
                      <p className="mt-3 text-[11px] leading-5 text-white/58">
                        {text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-7 text-sm font-medium leading-7 text-charcoal/62">
              Want to sleep near your chosen evening area without designing the
              entire trip around it? Start with the{" "}
              <InlineLink href="/best-hotels/pattaya/">
                Pattaya hotel guide by district
              </InlineLink>
              ; that is where a stay comparison and Trip.com belong naturally in
              the journey.
            </p>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real questions from the search results"
          title="Frequently asked questions about Pattaya nightlife"
          description="These answers use the exact useful English PAA captured in the live SERPs. Sensational adult queries and claims that age badly were deliberately excluded."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Build Pattaya around more than one night"
          title="Daytime, where to stay and what to do"
          guides={[
            {
              title: "Pattaya complete guide",
              description:
                "Choose a beach, district, transport rhythm and daytime plan before nightlife defines the whole destination.",
              href: "/city/pattaya/",
              image: "/images/redesign/pattaya-destination-hero.webp",
            },
            {
              title: "Where to stay",
              description:
                "Compare Pattaya districts by beach, noise, access and the return from your evening area.",
              href: "/best-hotels/pattaya/",
              image: "/images/redesign/pattaya-seafood-coast.webp",
            },
            {
              title: "Pattaya attractions",
              description:
                "Fill the days with coastline, culture and trips rather than only late evenings.",
              href: "/city/pattaya/attractions/",
              image: "/images/cities/pattaya/pattaya-sanctuary-truth.webp",
            },
          ]}
        />

        <SourceMethodSection
          title="A current rule outweighs an old club ranking"
          description="DataForSEO mapped English area, Walking Street, Soi Buakhao, club, cost, opening-hours and safety intent and captured the live PAA. Official TAT, Tourist Police and UK government sources support the rules and safety boundaries. Secondary nightlife coverage was used only to test evening types and information gaps. Fixed prices, universal closing times, absolute safety labels and volatile club rankings were removed. Last checked: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
