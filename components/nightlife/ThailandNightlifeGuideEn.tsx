import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  CircleHelp,
  Clock3,
  ExternalLink,
  GlassWater,
  Headphones,
  Hotel,
  Landmark,
  MapPin,
  MapPinned,
  Martini,
  MoonStar,
  Music2,
  Navigation,
  Phone,
  ReceiptText,
  Route,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Sun,
  Ticket,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import { KLOOK_GENERIC, withPlacementSubId } from "../../lib/affiliates";
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

const PAGE_URL = "https://go2-thailand.com/nightlife/";
const PAGE_TITLE = "Thailand nightlife: choose the right city and night out";
const PAGE_DESCRIPTION =
  "Compare nightlife in Bangkok, Pattaya, Phuket, Chiang Mai and four island or coastal destinations. Includes night types, current alcohol rules, Full Moon Party context and a safer route home.";
const HERO_IMAGE = "/images/redesign/thailand-nightlife-hero.webp";

const sectionNav: PageSectionNavItem[] = [
  { href: "#choose", label: "Choose a mood", icon: Sparkles },
  { href: "#destinations", label: "Destinations", icon: MapPinned },
  { href: "#evening-route", label: "Evening route", icon: Route },
  { href: "#rules", label: "Rules", icon: BadgeCheck },
  { href: "#full-moon", label: "Full Moon", icon: MoonStar },
  { href: "#safe-return", label: "Safe return", icon: ShieldCheck },
  { href: "#questions", label: "Questions", icon: CircleHelp },
];

interface NightMood {
  icon: LucideIcon;
  title: string;
  cue: string;
  fits: string;
  tradeoff: string;
}

const nightMoods: NightMood[] = [
  {
    icon: ShoppingBasket,
    title: "Night market",
    cue: "Food + wandering",
    fits: "You want to start early, taste widely and keep the evening flexible.",
    tradeoff:
      "Markets are not always daily, and “night market” can mean anything from a local walking street to a tourist food court. Check the day and location.",
  },
  {
    icon: Sun,
    title: "Sunset & rooftop",
    cue: "View + conversation",
    fits: "You prefer a planned start, a seat and a slower pace as a couple or small group.",
    tradeoff:
      "Dress code, minimum spend and reservation rules are venue-specific. Check the official page on the day.",
  },
  {
    icon: Music2,
    title: "Live music",
    cue: "Band + local rhythm",
    fits: "You want to listen, talk and decide later whether the night should continue.",
    tradeoff:
      "Well-known venues can move or change format. A recent programme is more useful than an old top ten.",
  },
  {
    icon: Headphones,
    title: "Club night",
    cue: "Late + intense",
    fits: "You deliberately choose dancing, loud music, entry checks and a later return.",
    tradeoff:
      "Age, ID, dress code, admission and closing time depend on the venue and its licence.",
  },
  {
    icon: Waves,
    title: "Beach bar",
    cue: "Sand + sunset",
    fits: "You want to begin beside the sea and perhaps stay after dark.",
    tradeoff:
      "Weather, sea conditions and distance to your hotel define the return. Do not swim after drinking alcohol.",
  },
  {
    icon: Martini,
    title: "Adult zone",
    cue: "Visible but optional",
    fits: "You want to see a famous neon street and understand that adult entertainment may be part of the streetscape.",
    tradeoff:
      "You never need to enter or buy anything. Ask prices before ordering, respect boundaries and choose another area when this is not your scene.",
  },
];

interface Destination {
  name: string;
  label: string;
  href: string;
  bestFor: string;
  rhythm: string;
  tradeoff: string;
  detailOwner: boolean;
}

const destinations: Destination[] = [
  {
    name: "Bangkok",
    label: "Widest choice",
    href: "/nightlife/bangkok/",
    bestFor:
      "Rooftops, night markets, live music and clubs in clearly different districts.",
    rhythm:
      "Choose one district per night; the city is too large for careless venue-hopping.",
    tradeoff: "Traffic and travel time matter more than the distance on a map.",
    detailOwner: true,
  },
  {
    name: "Pattaya",
    label: "Most concentrated",
    href: "/nightlife/pattaya/",
    bestFor:
      "Walking Street, Soi Buakhao, cabaret and a calmer evening in Jomtien.",
    rhythm:
      "A lot of energy in a small area, with visible adult entertainment in specific zones.",
    tradeoff:
      "Set your boundaries and return plan before entering the busiest street.",
    detailOwner: true,
  },
  {
    name: "Phuket",
    label: "Beach + intensity",
    href: "/nightlife/phuket/",
    bestFor:
      "Patong for full energy; Kata, Karon, Kamala and Old Town for other tempos.",
    rhythm:
      "The right coastal base changes the whole night, not only the hotel.",
    tradeoff:
      "Island distances make spontaneous late transfers expensive and less practical.",
    detailOwner: true,
  },
  {
    name: "Chiang Mai",
    label: "Markets + music",
    href: "/nightlife/chiang-mai/",
    bestFor:
      "Night markets, live music, Nimman and a social pace without beach clubs.",
    rhythm: "Start with food or a market, then add one bar or live set.",
    tradeoff:
      "Not the obvious choice when dancing until sunrise is your main goal.",
    detailOwner: true,
  },
  {
    name: "Koh Samui",
    label: "Choice by beach",
    href: "/city/koh-samui/",
    bestFor:
      "Chaweng for energy, Bophut for dinner and bars, and resort-led sunset evenings elsewhere.",
    rhythm:
      "Choose your coast before your venue; island transfers shape the night.",
    tradeoff: "A late taxi across the island can outweigh a cheaper room.",
    detailOwner: false,
  },
  {
    name: "Koh Phangan",
    label: "Event-led",
    href: "/islands/koh-phangan/",
    bestFor:
      "Full Moon Party dates, smaller events and beach or village evenings outside Haad Rin.",
    rhythm:
      "The calendar changes demand, transport and atmosphere more than a generic island ranking.",
    tradeoff:
      "Never book flights, ferries or a room around an unverified party date.",
    detailOwner: false,
  },
  {
    name: "Krabi",
    label: "Relaxed coast",
    href: "/city/krabi/",
    bestFor:
      "Ao Nang bars, live music and an easy evening after island or climbing days.",
    rhythm:
      "Dinner and one compact bar area usually work better than long transfers.",
    tradeoff: "Krabi Town and Ao Nang are different evening bases.",
    detailOwner: false,
  },
  {
    name: "Hua Hin",
    label: "Low-key evening",
    href: "/city/hua-hin/",
    bestFor:
      "Markets, dinner, live music and a more conversational coastal night.",
    rhythm:
      "A good fit when nightlife supports the trip rather than defines it.",
    tradeoff: "Check which markets run on your actual weekday.",
    detailOwner: false,
  },
];

const eveningRoute = [
  {
    time: "17:00–19:00",
    title: "Set the base",
    icon: Sun,
    text: "Start with sunset, dinner or a market. Confirm where the night ends and save the hotel name and pin before the first drink.",
  },
  {
    time: "19:00–22:00",
    title: "Choose one zone",
    icon: MapPin,
    text: "Stay within one walkable district when possible. A city with more options does not require more transfers.",
  },
  {
    time: "22:00 onward",
    title: "Decide again",
    icon: Headphones,
    text: "Only continue when the group, transport and venue still feel right. Do not let a paid ride or admission become pressure to stay.",
  },
  {
    time: "Before the battery fades",
    title: "Use the return plan",
    icon: Navigation,
    text: "Use your saved pickup point and booked or known transport. Never ride a scooter or swim after drinking.",
  },
];

const rules = [
  {
    icon: Clock3,
    title: "Sales are not closing times",
    text: "TAT reports general alcohol sales from 11:00 to 24:00 from 29 May 2026. Licensed hotels, airport areas and authorised entertainment venues can follow different conditions. A sales window is not a promise that every bar stays open until midnight.",
  },
  {
    icon: BadgeCheck,
    title: "The legal age is 20",
    text: "Carry suitable identification and follow staff instructions. Entry and service policies can be stricter than the national minimum.",
  },
  {
    icon: Landmark,
    title: "Some places remain restricted",
    text: "Temples, government offices, petrol stations, public parks and public-transport areas are among places with restrictions unless specifically permitted.",
  },
  {
    icon: CalendarClock,
    title: "The date can change the rules",
    text: "Elections, major religious days and official announcements can temporarily restrict sales. Check current information for the exact day of your night out.",
  },
];

const returnChecks = [
  {
    icon: Navigation,
    title: "Pre-arrange transport",
    label: "Before the first drink",
    text: "Save your hotel name in Thai, its map pin and a clear pickup point. Use licensed or app-booked transport and verify the driver and vehicle.",
  },
  {
    icon: GlassWater,
    title: "Keep control of the glass",
    label: "At every venue",
    text: "Do not leave drinks unattended or accept open drinks from strangers. If something feels wrong, tell trusted staff or a friend and seek medical help.",
  },
  {
    icon: ReceiptText,
    title: "Check the bill as you go",
    label: "Before another round",
    text: "Ask prices before ordering in unfamiliar venues, keep your card in sight and resolve confusion calmly with staff.",
  },
  {
    icon: Users,
    title: "Make one group agreement",
    label: "Before the crowd",
    text: "Choose a meeting point and departure check. Agree that nobody disappears silently or returns alone without telling the group.",
  },
];

const faqs = [
  {
    question: "Is Thailand good for nightlife?",
    answer:
      "Yes, when you choose the right type of night and the right area. Thailand offers early night markets, rooftop bars, live music, clubs, beach evenings and event-led parties. A famous neon street is one option, not a summary of the whole country.",
  },
  {
    question: "Which city in Thailand has the best nightlife?",
    answer:
      "There is no single best city for every traveller. Bangkok has the widest choice, Pattaya the most concentrated nightlife zones, Phuket combines beaches with Patong, and Chiang Mai suits markets and live music. Koh Phangan is strongest when a verified event date drives the trip.",
  },
  {
    question: "Is Bangkok or Phuket better for nightlife?",
    answer:
      "Choose Bangkok for the broadest mix of districts, rooftops, markets, live music and clubs. Choose Phuket when beach location is part of the night and you are willing to pick the right coast. Patong is far more intense than Kata, Karon, Kamala or Old Town.",
  },
  {
    question: "What is the most famous night market in Thailand?",
    answer:
      "No official national ranking establishes one winner. Bangkok, Chiang Mai, Phuket and many regional cities have well-known night markets, but operating days and locations change. Choose a market that runs on your actual date and fits the rest of your route.",
  },
  {
    question: "What date is the Full Moon Party in Thailand?",
    answer:
      "The Full Moon Party is held at Haad Rin on Koh Phangan, but the date can shift around religious days or other circumstances. Check the official event website before booking accommodation, ferry or flights; do not rely on an old annual calendar copied into a blog.",
  },
  {
    question: "Can tourists drink alcohol in Thailand?",
    answer:
      "Tourists aged 20 or over can drink alcohol where sale and consumption are permitted. Since 29 May 2026, TAT reports general sales from 11:00 to 24:00, with venue-specific exceptions and restrictions for certain public places or official dates.",
  },
  {
    question: "What time does nightlife end in Thailand?",
    answer:
      "There is no universal end time for every bar, market or club. Market days, venue licences and designated entertainment conditions differ. Treat the general 11:00–24:00 alcohol sales window as a sales rule, not a guaranteed closing time, and verify the venue on the day.",
  },
  {
    question: "Is it safe to go to Thailand at night?",
    answer:
      "Many travellers go out without incident, but risk is not zero. UK travel advice highlights drink spiking, late-night assaults around bars and Full Moon-style events, methanol risk and unlicensed transport. Pre-arrange the return, watch your drink, stay with people you trust and call Tourist Police 1155 when you need assistance or translation.",
  },
];

const sources = [
  {
    title: "Alcohol sales and consumption rules updated in Thailand",
    creator: "Tourism Authority of Thailand · 29 May 2026",
    url: "https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/",
    note: "Current primary tourism source for the general 11:00–24:00 sales window, legal age 20, restricted places and venue- or date-specific conditions.",
  },
  {
    title: "Safety and security — Thailand travel advice",
    creator:
      "UK Foreign, Commonwealth & Development Office · checked 26 July 2026",
    url: "https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security",
    note: "Current government source for drink spiking, methanol, assaults near bars and Full Moon-style events, unlicensed transport, drugs and road risks.",
  },
  {
    title: "Tourist Police hotline 1155",
    creator: "Thailand Tourist Police Bureau",
    url: "https://www.touristpolice.go.th/en/organization",
    note: "Official source confirming Tourist Police contact and hotline 1155 for assistance.",
  },
  {
    title: "Official Full Moon Party",
    creator: "Haad Rin event website",
    url: "https://www.fullmoonpartythailand.com/",
    note: "Event source for location and the next published date. The date is deliberately not frozen into this guide because it can shift.",
  },
  {
    title: "Nightlife in Thailand: 10 Best Places to Party",
    creator: "Time Out Thailand",
    url: "https://www.timeout.com/thailand/things-to-do/best-nightlife-in-thailand",
    note: "English SERP competitor used to compare destination-list intent and identify the missing decision, transport and rules layers.",
  },
];

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

function createSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      dateModified: "2026-07-26",
      inLanguage: "en",
      mainEntityOfPage: PAGE_URL,
      author: { "@type": "Organization", name: "Go2Thailand" },
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
          name: "Thailand nightlife",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Thailand nightlife destinations",
      numberOfItems: destinations.length,
      itemListElement: destinations.map((destination, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: destination.name,
        url: `https://go2-thailand.com${destination.href}`,
      })),
    },
  ];
}

export function ThailandNightlifeGuideEn() {
  const subId = useSubId();
  const klookHref = withPlacementSubId(
    KLOOK_GENERIC,
    subId,
    "thailand-nightlife-hub-en",
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
          content="Thailand nightlife, nightlife in Thailand, best nightlife in Thailand, Thailand night markets, Full Moon Party Thailand, Thailand nightlife safety"
        />
        <meta property="og:type" content="article" />
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
          eyebrow="Choose the night before the venue"
          title={
            <>
              After dark.
              <br />
              Still your Thailand.
            </>
          }
          subtitle="Markets, rooftops, music, beach bars and clubs—each with a different route home."
          description={
            <>
              Start with the mood and the district, then check the date, current
              rules and return plan. A louder night is not automatically a
              better one.
            </>
          }
          image={HERO_IMAGE}
          imageAlt="Thailand nightlife scene combining a night market, rooftop, live music and beach atmosphere"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Travel guide", href: "/travel-guides/" },
            { label: "Nightlife" },
          ]}
          actions={[
            { label: "Choose your night", href: "#choose", kind: "primary" },
            {
              label: "Compare destinations",
              href: "#destinations",
              kind: "secondary",
            },
          ]}
          minHeightClassName="min-h-[890px] lg:min-h-[740px]"
          contentClassName="max-w-[760px]"
          titleClassName="max-w-[820px] text-[3.65rem] leading-[0.84] sm:text-[4.85rem] lg:text-[5.65rem]"
          subtitleClassName="max-w-[690px] text-[1.35rem] leading-[1.08] text-saffron-dark sm:text-[1.85rem]"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.8)_52%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.93)_40%,rgba(4,31,27,0.12)_67%,rgba(4,24,21,0.03)_100%)]"
          sideCard={
            <div className="absolute bottom-8 right-[5vw] z-20 hidden w-[344px] overflow-hidden rounded-[26px] border border-white/50 bg-[#082f29]/94 text-white shadow-editorial-lift backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <p className="eyebrow !mb-0 !text-saffron-light">
                  Night compass
                </p>
                <MoonStar size={20} className="text-saffron-light" />
              </div>
              <div className="space-y-4 p-6 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-white/45">Compare</span>
                  <strong className="text-right">8 destinations</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/45">Choose by</span>
                  <strong className="text-right">6 night moods</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/45">Current rule</span>
                  <strong className="text-right text-saffron-light">
                    Sales 11:00–24:00*
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/45">Help</span>
                  <strong className="text-right">Tourist Police 1155</strong>
                </div>
                <p className="border-t border-white/10 pt-4 text-[10px] leading-5 text-white/45">
                  *General sales window from 29 May 2026; venue, location and
                  date conditions still apply.
                </p>
              </div>
            </div>
          }
        />

        <PageSectionNav items={sectionNav} />

        <section className="section-divider-bottom bg-canvas py-7">
          <div className="container-custom grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPinned,
                label: "Destination choice",
                value: "8 evening bases",
              },
              { icon: Clock3, label: "Rule check", value: "Date + venue" },
              {
                icon: Navigation,
                label: "Return route",
                value: "Plan before drinks",
              },
              { icon: Phone, label: "Tourist Police", value: "1155" },
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
            <div className="grid items-end gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <SectionHeading
                  eyebrow="Begin with the feeling"
                  title={
                    <>
                      Six nights.
                      <br />
                      Six different plans.
                    </>
                  }
                  description="A night market, rooftop, live set, club, beach bar and adult zone do not share one ideal district, budget or return route."
                />
                <p className="mt-6 text-sm font-medium leading-7 text-charcoal/65">
                  Choose what you actually want to do before letting a viral
                  street or old venue list decide for you.
                </p>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
                <Image
                  src="/images/redesign/thailand-nightlife-moods.webp"
                  alt="A sequence of Thailand evening moods from market to rooftop and beach bar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052f29]/78 via-transparent to-transparent" />
                <div className="absolute inset-x-7 bottom-7 flex items-end justify-between text-white">
                  <div>
                    <p className="eyebrow !text-saffron-light">
                      Your route starts here
                    </p>
                    <p className="font-display text-[2rem] font-semibold leading-none">
                      Mood before postcode.
                    </p>
                  </div>
                  <Sparkles size={27} className="text-saffron-light" />
                </div>
              </div>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {nightMoods.map(
                ({ icon: Icon, title, cue, fits, tradeoff }, index) => (
                  <article
                    key={title}
                    className={`min-h-[305px] rounded-[25px] border p-6 ${index === 0 ? "border-saffron/25 bg-saffron/[0.07]" : "border-jade/10 bg-white"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 0 ? "bg-saffron text-white" : "bg-jade/[0.06] text-jade"}`}
                      >
                        <Icon size={21} />
                      </span>
                      <span className="text-[9px] font-extrabold tracking-[0.14em] text-charcoal/36">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                    <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                      {cue}
                    </p>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">
                      {fits}
                    </p>
                    <p className="mt-4 border-t border-jade/10 pt-4 text-[11px] font-medium leading-5 text-charcoal/50">
                      Watch for: {tradeoff}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="destinations"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
              <SectionHeading
                eyebrow="Best means best fit"
                title={
                  <>
                    Eight destinations.
                    <br />
                    No fake winner.
                  </>
                }
                description="Bangkok is not Pattaya, Patong is not all of Phuket, and a Full Moon date is not every night on Koh Phangan. Compare scale, rhythm and return friction."
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">
                The high-volume city terms retain their own detail pages. This
                hub helps you pick the correct owner instead of repeating eight
                shallow city articles.
              </p>
            </div>
            <div className="mt-12 divide-y divide-jade/10 border-y border-jade/10">
              {destinations.map((destination, index) => (
                <Link
                  key={destination.name}
                  href={destination.href}
                  className="group grid gap-5 py-7 lg:grid-cols-[48px_175px_1fr_1fr_32px] lg:items-center"
                >
                  <span className="text-[10px] font-extrabold text-saffron-dark">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                      {destination.label}
                    </p>
                    <h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-none text-jade">
                      {destination.name}
                    </h3>
                    {destination.detailOwner && (
                      <span className="mt-2 inline-flex rounded-full bg-jade/[0.06] px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.12em] text-jade">
                        Detailed guide
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-charcoal/38">
                      Best for
                    </p>
                    <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">
                      {destination.bestFor}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-charcoal/38">
                      Route reality
                    </p>
                    <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">
                      {destination.rhythm} {destination.tradeoff}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-jade/12 text-jade transition group-hover:border-saffron/45 group-hover:text-saffron-dark">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="evening-route"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading
                eyebrow="One night, four decisions"
                title="Make the return part of the route."
                description="The safest transport choice is much easier to make before the group is tired, separated or low on battery."
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">
                This route works for a market, rooftop, club or beach evening
                because it controls the handovers: hotel to zone, zone to venue
                and venue back to a known pickup point.
              </p>
            </div>
            <div className="relative mt-10 grid gap-4 lg:grid-cols-4">
              <div
                aria-hidden="true"
                className="absolute left-[8%] right-[8%] top-8 hidden border-t-2 border-dotted border-saffron/55 lg:block"
              />
              {eveningRoute.map(({ time, title, icon: Icon, text }, index) => (
                <article
                  key={title}
                  className="relative z-10 min-h-[280px] rounded-[24px] border border-jade/10 bg-white p-6 shadow-editorial-card"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-saffron text-white">
                    <Icon size={20} />
                  </span>
                  <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                    {time} · decision 0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-[1.7rem] font-semibold leading-none text-jade">
                    {title}
                  </h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="rules"
          className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-24"
        >
          <div className="container-custom grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow !text-saffron-light">
                Checked 26 July 2026
              </p>
              <h2 className="font-display text-[3.35rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4.35rem]">
                One current rule. Four necessary checks.
              </h2>
              <p className="mt-6 text-sm font-medium leading-7 text-white/66">
                TAT’s update effective 29 May 2026 is more reliable than an old
                blog claiming a universal bar closing time. The exact venue,
                licence, place and date still matter.
              </p>
              <a
                href="https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cream mt-7 w-fit"
              >
                Read the current TAT update{" "}
                <ExternalLink size={15} className="text-saffron" />
              </a>
            </div>
            <div className="divide-y divide-white/12 border-y border-white/12">
              {rules.map(({ icon: Icon, title, text }, index) => (
                <article
                  key={title}
                  className="grid gap-5 py-6 sm:grid-cols-[52px_1fr]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.07] text-saffron-light">
                    <Icon size={21} />
                  </span>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/38">
                      Rule check 0{index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-white/62">
                      {text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="full-moon"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-[30px] bg-[#082f29] shadow-editorial-lift">
              <Image
                src="/images/redesign/thailand-nightlife-hero.webp"
                alt="Night beach atmosphere used as context for planning the Full Moon Party"
                fill
                sizes="100vw"
                className="object-cover object-[70%_center] opacity-50"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,31,26,0.99)_0%,rgba(3,31,26,0.92)_44%,rgba(3,31,26,0.18)_78%,rgba(3,31,26,0.06)_100%)]" />
              <div className="relative z-10 grid min-h-[480px] gap-10 p-7 text-white sm:p-11 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:p-14">
                <div>
                  <p className="eyebrow !text-saffron-light">
                    Calendar before commitment
                  </p>
                  <h2 className="font-display text-[3.1rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4.1rem]">
                    Full Moon is a date and a place—not a whole island.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/68">
                    The event is associated with Haad Rin on Koh Phangan.
                    Published dates can shift, so verify the official event page
                    before booking flights, ferry or accommodation.
                  </p>
                  <a
                    href="https://www.fullmoonpartythailand.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cream mt-7 w-fit"
                  >
                    Check the official date{" "}
                    <ExternalLink size={15} className="text-saffron" />
                  </a>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    [
                      "Stay",
                      "Choose Haad Rin for event access or another area for distance and recovery; compare the actual transfer.",
                    ],
                    [
                      "Ferry",
                      "Do not assume the last normal ferry, a special boat or a return transfer will match an old schedule.",
                    ],
                    [
                      "Meeting point",
                      "Set one landmark and a departure check before entering the crowd.",
                    ],
                    [
                      "Shoes + water",
                      "Use practical footwear, watch your drink and keep reliable water and transport money available.",
                    ],
                  ].map(([title, text]) => (
                    <article
                      key={title}
                      className="rounded-2xl border border-white/13 bg-white/[0.07] p-5 backdrop-blur-sm"
                    >
                      <h3 className="font-display text-[1.45rem] font-semibold">
                        {title}
                      </h3>
                      <p className="mt-3 text-[11px] font-medium leading-5 text-white/60">
                        {text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="safe-return"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
                <Image
                  src="/images/redesign/thailand-nightlife-return.webp"
                  alt="Traveller checking a saved pickup point and route home after a Thailand evening"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052f29]/72 via-transparent to-transparent" />
                <div className="absolute inset-x-7 bottom-7 text-white">
                  <p className="eyebrow !text-saffron-light">
                    The last stop is part of the plan
                  </p>
                  <p className="font-display text-[2rem] font-semibold leading-none">
                    Known pickup. Charged phone. Shared check.
                  </p>
                </div>
              </div>
              <div>
                <SectionHeading
                  eyebrow="Safety without scare tactics"
                  title={
                    <>
                      Four small choices
                      <br />
                      with real leverage.
                    </>
                  }
                  description="Current UK travel advice flags drink spiking, methanol risk, assaults around late-night bars and Full Moon-style events, and unlicensed lifts. Turn that into a route, not panic."
                />
                <p className="mt-6 text-sm font-medium leading-7 text-charcoal/65">
                  If you need assistance or translation, contact Thailand
                  Tourist Police on <strong className="text-jade">1155</strong>.
                  Seek urgent medical help if someone may have been spiked or
                  shows symptoms after drinking.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {returnChecks.map(({ icon: Icon, title, label, text }) => (
                  <article
                    key={title}
                    className="rounded-[24px] border border-jade/10 bg-white p-6"
                  >
                    <Icon size={21} className="text-jade" />
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                      {label}
                    </p>
                    <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">
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
                  Functional evening kit
                </p>
                <h2 className="font-display text-[2.55rem] font-semibold leading-[0.9]">
                  Reserve power for navigation and the ride home.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/62">
                  A compact power bank can keep your phone available for
                  navigation and a booked return. It does not replace an offline
                  hotel address, group agreement or sober transport choice.
                </p>
                <a
                  href="/go/anker-powercore-10k/"
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="mt-7 inline-flex min-h-12 items-center justify-between rounded-xl border border-white/16 bg-white/[0.08] px-5 text-xs font-extrabold transition hover:border-saffron/45 hover:bg-white/[0.11]"
                >
                  Check the current Amazon offer{" "}
                  <ExternalLink size={15} className="text-saffron-light" />
                </a>
                <AffiliateDisclosure className="mt-4 !text-white/54">
                  Amazon affiliate link through our central OneLink route. As an
                  Amazon Associate we earn from qualifying purchases at no extra
                  cost to you. Product, airline rules, price, seller and local
                  availability can differ.
                </AffiliateDisclosure>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
                <div className="p-8 sm:p-11">
                  <p className="eyebrow !text-saffron-light">
                    Only after choosing the mood
                  </p>
                  <h2 className="font-display text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.035em]">
                    Compare an evening activity with a fixed start.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/64">
                    A food tour, show, cruise or organised evening can provide a
                    clear location and duration. The Klook link opens a broad
                    Thailand page, so the live listing—not this button—defines
                    what is included.
                  </p>
                  <a
                    href={klookHref}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="btn-cream mt-7 w-fit"
                  >
                    Check current evening activities{" "}
                    <ExternalLink size={15} className="text-saffron" />
                  </a>
                  <AffiliateDisclosure className="mt-4 !text-white/55">
                    Klook affiliate link. Check the exact operator, date,
                    meeting point, age rule, inclusions, transfer and
                    cancellation terms before paying.
                  </AffiliateDisclosure>
                </div>
                <div className="grid gap-px bg-white/[0.09] sm:grid-cols-2">
                  {[
                    {
                      icon: Ticket,
                      title: "Exact product",
                      text: "A general search page contains different tours, shows, locations and ticket types.",
                    },
                    {
                      icon: MapPinned,
                      title: "Start + finish",
                      text: "Put both pins next to your hotel and planned return route.",
                    },
                    {
                      icon: Users,
                      title: "Age + setting",
                      text: "Check whether the activity fits your group and desired mood.",
                    },
                    {
                      icon: Check,
                      title: "Conditions",
                      text: "Read inclusions, dress code, weather policy and cancellation again at checkout.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <article key={title} className="bg-white/[0.055] p-7">
                      <Icon size={21} className="text-saffron-light" />
                      <h3 className="mt-5 font-display text-[1.5rem] font-semibold">
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
              Choose the city and evening zone first. Then compare accommodation
              through the dedicated hotel guides for{" "}
              <InlineLink href="/best-hotels/bangkok/">Bangkok</InlineLink>,{" "}
              <InlineLink href="/best-hotels/phuket/">Phuket</InlineLink>,{" "}
              <InlineLink href="/best-hotels/pattaya/">Pattaya</InlineLink> or{" "}
              <InlineLink href="/best-hotels/chiang-mai/">
                Chiang Mai
              </InlineLink>
              , where neighbourhood decisions and Trip.com affiliate links are
              explained together.
            </p>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real questions from the English SERP"
          title="Frequently asked questions about Thailand nightlife"
          description="The questions were captured verbatim with DataForSEO on 26 July 2026. Answers separate destination choice, event dates, national rules and practical safety; sexual price queries and unsupported venue rankings were excluded."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Choose the next level of detail"
          title="Four guides for the next decision"
          guides={[
            {
              title: "Bangkok nightlife",
              description:
                "Compare districts, evening types and city transport where the choice is widest.",
              href: "/nightlife/bangkok/",
              image: "/images/redesign/bangkok-destination-hero.webp",
            },
            {
              title: "Pattaya nightlife",
              description:
                "Choose Walking Street, Soi Buakhao, Jomtien or a planned night with clear boundaries.",
              href: "/nightlife/pattaya/",
              image: "/images/redesign/pattaya-nightlife-hero.webp",
            },
            {
              title: "Phuket nightlife",
              description:
                "See why Patong, Kata, Karon, Kamala and Old Town each require a different evening plan.",
              href: "/nightlife/phuket/",
              image: "/images/redesign/phuket-destination-hero-v2.webp",
            },
          ]}
          sideLink={{
            label: "Evening activities via Klook",
            href: klookHref,
            affiliate: true,
          }}
          disclosure="Klook is an affiliate partner. A possible commission does not increase your price; always verify the current product and conditions."
        />

        <SourceMethodSection
          title="A current rule beats an old club ranking."
          description="Four English DFS clusters produced 526 keyword records, while twelve current SERP/PAA sets, two useful competitor parses and one official event parse established destination, Full Moon, night-market and safety intent. Official TAT, FCDO and Tourist Police sources carry the time-sensitive rules and safety boundaries. The event website is used only for date and location checks. Fixed prices, universal closing times, sexual transaction queries and volatile venue rankings were removed. Last checked: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
