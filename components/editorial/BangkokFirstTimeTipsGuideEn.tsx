import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Banknote,
  BatteryCharging,
  BedDouble,
  CircleHelp,
  CloudSun,
  Compass,
  ExternalLink,
  Footprints,
  Landmark,
  Map,
  MapPin,
  Navigation,
  PlaneLanding,
  Route,
  ShieldCheck,
  Shirt,
  Smartphone,
  Sparkles,
  TrainFront,
  TriangleAlert,
  Umbrella,
  Waves,
  Wifi,
} from "lucide-react";
import {
  SAILY_GENERIC,
  TRIP_GENERIC,
  TWELVEGO_GENERIC,
  cityAffiliates,
  withPlacementSubId,
} from "../../lib/affiliates";
import type { AmazonAffiliateSlug } from "../../lib/amazon-affiliates";
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

const PAGE_URL = "https://go2-thailand.com/blog/bangkok-travel-tips-reddit/";
const HERO_IMAGE = "/images/redesign/bangkok-first-time-hero.webp";
const KIT_IMAGE = "/images/redesign/bangkok-first-day-kit.webp";
const PAGE_TITLE = "Bangkok Travel Tips for First-Time Visitors | Go2Thailand";
const PAGE_DESCRIPTION =
  "Plan a first Bangkok visit without zig-zagging across the city. Choose a base, handle arrival, switch transport modes, avoid common mistakes and build three realistic days.";

const navItems: PageSectionNavItem[] = [
  { href: "#arrival", label: "First 90 minutes", icon: PlaneLanding },
  { href: "#base", label: "Choose a base", icon: BedDouble },
  { href: "#move", label: "Move well", icon: TrainFront },
  { href: "#days", label: "Build three days", icon: Route },
  { href: "#friction", label: "Avoid friction", icon: ShieldCheck },
  { href: "#kit", label: "First-day kit", icon: BatteryCharging },
  { href: "#questions", label: "Questions", icon: CircleHelp },
];

const arrivalSteps: Array<{
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  boundary: string;
}> = [
  {
    icon: Wifi,
    label: "00–15 min",
    title: "Get connected",
    description:
      "Activate the connection you prepared or compare a local option after landing. Save your hotel name, address and one map offline before leaving the terminal.",
    boundary:
      "Connectivity is useful; it does not replace a written hotel address.",
  },
  {
    icon: Navigation,
    label: "15–30 min",
    title: "Confirm the transfer",
    description:
      "Use the official arrival area and compare the current airport-to-hotel route. The best mode depends on airport, landing time, luggage and hotel corridor.",
    boundary: "Do not reuse an old fare or timetable screenshot as a promise.",
  },
  {
    icon: BedDouble,
    label: "30–75 min",
    title: "Reach one corridor",
    description:
      "Move to the part of Bangkok you chose before the flight. The first win is reaching the right side of the city, not ticking off a sight on the way.",
    boundary: "A detour with luggage rarely improves the first afternoon.",
  },
  {
    icon: CloudSun,
    label: "75–90 min",
    title: "Reset before exploring",
    description:
      "Check in or store bags, drink, change layers and check the sky. Start with one nearby loop that can shrink when heat, rain or fatigue arrives.",
    boundary:
      "The city will still be there after a shower, meal or short rest.",
  },
];

const corridors = [
  {
    name: "Old Town + riverside",
    cue: "Temples and river first",
    icon: Landmark,
    suits:
      "A short first visit built around the Grand Palace, Wat Pho, Wat Arun and older Bangkok.",
    rhythm:
      "Walk compact old-town pockets, then use the river or a road transfer for the next zone.",
    tradeoff:
      "Rail coverage is less direct. Do not assume every saved place is an easy walk.",
    href: "/where-to-stay/bangkok/first-time/",
  },
  {
    name: "Siam",
    cue: "Central and connected",
    icon: TrainFront,
    suits:
      "A first visit that values BTS access, malls, indoor recovery and straightforward movement east or west.",
    rhythm:
      "Use rail for the long move, then explore one compact cluster on foot.",
    tradeoff:
      "It is convenient, not atmospheric in the same way as the river or Chinatown.",
    href: "/where-to-stay/bangkok/",
  },
  {
    name: "Lower Sukhumvit",
    cue: "Food and evening choice",
    icon: Sparkles,
    suits:
      "Travellers who want rail access, restaurants and a broad evening range close to the hotel.",
    rhythm:
      "Choose a station area, not “Sukhumvit” as one walkable neighbourhood.",
    tradeoff: "The corridor is long, busy and easy to underestimate on a map.",
    href: "/where-to-stay/bangkok/nightlife/",
  },
  {
    name: "Silom + Sathorn",
    cue: "City and river balance",
    icon: Waves,
    suits:
      "A mixed plan of business-city energy, parks, food, nightlife and access towards the river.",
    rhythm:
      "Combine rail with one riverside or old-town transfer rather than crossing repeatedly.",
    tradeoff:
      "The character changes street by street; verify the hotel’s actual station walk.",
    href: "/where-to-stay/bangkok/couples/",
  },
];

const moveModes: Array<{
  icon: LucideIcon;
  mode: string;
  use: string;
  avoid: string;
}> = [
  {
    icon: TrainFront,
    mode: "BTS / MRT",
    use: "Use rail for long, traffic-exposed corridors when stations fit both ends.",
    avoid:
      "Do not treat every attraction as rail-adjacent or assume one payment product covers every network.",
  },
  {
    icon: Waves,
    mode: "River",
    use: "Use the river when it connects the old-city edge, Sathorn pier and riverside stops naturally.",
    avoid:
      "Do not choose a boat only because it looks scenic; verify the current route and pier.",
  },
  {
    icon: Navigation,
    mode: "Car / taxi",
    use: "Use a metered taxi or app-based car for awkward gaps, luggage, late arrival or a group.",
    avoid:
      "A car is not automatically faster during congestion. Confirm the destination before moving.",
  },
  {
    icon: Footprints,
    mode: "Walking",
    use: "Walk inside a compact neighbourhood, market or temple cluster.",
    avoid:
      "Bangkok blocks, heat, crossings and footpaths can make a short map distance feel much longer.",
  },
];

const dayPlans = [
  {
    label: "Day 1",
    title: "Old Bangkok, one river line",
    anchor: "Old Town + river",
    steps: [
      "Begin with one major temple complex",
      "Pause before adding a second landmark",
      "Cross or follow the river only when it simplifies the route",
      "Choose Chinatown or a calm riverside finish",
    ],
    boundary: "Do not stack every royal-site name into one hot afternoon.",
  },
  {
    label: "Day 2",
    title: "Modern Bangkok, rail first",
    anchor: "Siam + park + one evening zone",
    steps: [
      "Start around one BTS/MRT anchor",
      "Use a mall, museum or café as a heat or rain buffer",
      "Add one park or neighbourhood",
      "Finish near the hotel or one direct rail line",
    ],
    boundary:
      "A central day works because the movement is simple, not because malls are compulsory.",
  },
  {
    label: "Day 3",
    title: "Choose one personal Bangkok",
    anchor: "Market, food, art or canal",
    steps: [
      "Pick the question the first two days did not answer",
      "Open the specialist guide before crossing town",
      "Keep one flexible alternative nearby",
      "Leave enough energy for the onward journey",
    ],
    boundary:
      "One meaningful theme beats a final-day list of disconnected leftovers.",
  },
];

const frictionCards: Array<{
  icon: LucideIcon;
  title: string;
  answer: string;
  link?: { label: string; href: string };
}> = [
  {
    icon: Banknote,
    title: "Cash is still a useful backup",
    answer:
      "Acceptance varies by business and system. Keep a modest payment backup and do not assume an international card or local QR method works everywhere.",
  },
  {
    icon: Shirt,
    title: "Temple clothing is a route decision",
    answer:
      "Carry or wear shoulder-and-knee coverage when a temple is genuinely in the day. Respect the active place rather than dressing for a photo checkpoint.",
    link: {
      label: "Read Thailand etiquette",
      href: "/practical-info/etiquette-culture/",
    },
  },
  {
    icon: Umbrella,
    title: "Weather changes the sequence",
    answer:
      "A shower or hot spell should shorten the exposed section, not cancel the entire day. Keep one indoor pause and one smaller version of each route.",
    link: { label: "Compare Bangkok weather", href: "/city/bangkok/weather/" },
  },
  {
    icon: Smartphone,
    title: "Save decisions offline",
    answer:
      "Keep the hotel address, one route back, emergency contacts and any critical booking information available when reception or battery fails.",
  },
  {
    icon: TriangleAlert,
    title: "Urgency is a warning sign",
    answer:
      "Be cautious when a stranger says a sight is closed, pressures a special detour or asks for an immediate payment. Verify through the venue or another independent source.",
  },
  {
    icon: Footprints,
    title: "Map distance is not walking quality",
    answer:
      "Assess heat, crossings, luggage, mobility and shade. Use a short ride when the walk adds risk or exhaustion without adding experience.",
  },
];

const mistakes = [
  [
    "Booking a “central” hotel without checking the station or pier",
    "Choose the corridor first, then inspect the actual door-to-platform route.",
  ],
  [
    "Crossing Bangkok for every saved recommendation",
    "Group days by geography and let specialist guides compete for one open slot.",
  ],
  [
    "Treating tuk-tuks as the default transport system",
    "Use them only after agreeing the trip clearly; build the day around rail, river, walking zones and sensible gaps.",
  ],
  [
    "Planning the first day like a full-energy day",
    "Make arrival day expandable: one meal, one nearby loop and an early reset can be enough.",
  ],
  [
    "Using community anecdotes as current rules",
    "Use community threads to discover questions; verify transport, safety, law and opening details with current sources.",
  ],
  [
    "Buying gear because a checklist says so",
    "Bring what solves your own tasks. Skip every product when what you own already works.",
  ],
];

const faqs = [
  {
    question: "Do and don'ts in Bangkok?",
    answer:
      "Do group your days by area, keep a payment backup, cover shoulders and knees for active temples, use official or clearly identified transport channels and verify current conditions. Do not touch people on the head, point feet at sacred objects, criticise the monarchy, carry illegal drugs or assume an old social-media claim is current law. Use the etiquette and official travel-advice pages for the full boundary.",
  },
  {
    question: "What should I see first time in Bangkok?",
    answer:
      "Choose one old-Bangkok cluster such as the Grand Palace, Wat Pho, Wat Arun and the river, then contrast it with one modern or neighbourhood day. Chinatown, a market, a park, an art stop or a food route can supply that contrast. You do not need every headline attraction; the best first visit shows at least two different Bangkok rhythms without constant cross-city travel.",
  },
  {
    question: "What do I need to know before going to Bangkok?",
    answer:
      "Choose your hotel corridor before your property, prepare airport-to-hotel options, arrange connectivity, keep a payment backup, understand temple clothing, save emergency contacts and plan around heat, rain and traffic. Check current UK travel advice shortly before departure because safety and legal guidance can change.",
  },
  {
    question: "What to be careful with in Bangkok?",
    answer:
      "Protect valuables in crowded areas, be cautious with drink handling, verify claims that a sight is closed, agree or confirm transport terms and never carry packages for strangers. Road traffic, crossings, heat and fatigue are everyday planning risks too. For an emergency or tourist assistance in Thailand, the Tourist Police service is 1155; verify current app and contact guidance before travel.",
  },
  {
    question: "What to do when you first arrive in Bangkok?",
    answer:
      "Get connected, save the hotel details offline, confirm the current airport transfer, reach the correct corridor, store your bags and reset. If energy remains, use one nearby meal-and-walk loop. Avoid an attraction detour with luggage or a cross-city first evening that depends on perfect traffic and energy.",
  },
  {
    question: "How do tourists get around Bangkok?",
    answer:
      "Most first-time visitors combine BTS or MRT for long urban corridors, river services where the piers fit, cars or taxis for gaps and late or luggage-heavy trips, and walking inside compact zones. No single mode covers every useful route, and ticket or payment arrangements differ, so check the current operator information for the exact journey.",
  },
  {
    question: "What is the best area to stay in Bangkok for first timers?",
    answer:
      "Old Town or the riverside suits a short temple-and-river visit; Siam is highly connected and easy to recover indoors; lower Sukhumvit suits dining and evening choice; Silom and Sathorn balance city, park and river access. The best area is the corridor that removes the most repeated travel from your own plan. Use the accommodation owner for property-level choices.",
  },
  {
    question: "Is Bangkok safe for tourists right now?",
    answer:
      "A static guide cannot certify current safety. Bangkok receives large numbers of visitors, but crime, scams, drink spiking, road danger, political events and other risks still require normal precautions. Read the current GOV.UK Thailand travel advice immediately before travel, follow local instructions and use Tourist Police 1155 when appropriate.",
  },
  {
    question: "Is 2 days in Bangkok enough?",
    answer:
      "Two full days can cover one old-Bangkok and river day plus one modern, food or neighbourhood day. It is enough for orientation, not depth. Stay in a corridor that supports those two routes and resist adding distant markets or day trips.",
  },
  {
    question: "Are 3 days in Bangkok enough?",
    answer:
      "Three full days are a strong first-visit shape: old Bangkok and the river, a rail-connected modern day, then one personal theme such as food, markets, art or canals. A fourth day adds breathing room, a day trip or a slower neighbourhood without forcing the first three days to become longer.",
  },
];

const amazonProducts: Array<{
  slug: AmazonAffiliateSlug;
  icon: LucideIcon;
  title: string;
  reason: string;
}> = [
  {
    slug: "anker-powercore-10k",
    icon: BatteryCharging,
    title: "Compact power bank",
    reason:
      "Useful when maps, tickets and contact details live on one phone. Compare capacity, airline rules, ports, cable needs, seller and delivery.",
  },
  {
    slug: "momax-travel-adapter",
    icon: Smartphone,
    title: "Universal travel adapter",
    reason:
      "Useful when your existing charger does not solve the socket and USB mix. Check plug compatibility, wattage and device requirements yourself.",
  },
  {
    slug: "venture-pal-packable-backpack",
    icon: Map,
    title: "Packable daypack",
    reason:
      "Keeps water, a light layer and small purchases together. Compare capacity, strap comfort, material and seller; reuse your own bag when it already works.",
  },
];

const sources = [
  {
    title: "Safety and security — Thailand travel advice",
    creator: "GOV.UK / FCDO",
    url: "https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security",
    note: "Current UK-facing safety and legal boundaries. Travellers should recheck the live page shortly before departure.",
  },
  {
    title: "Rabbit card information",
    creator: "BTS Skytrain",
    url: "https://www.bts.co.th/eng/tickets/ticket-rabbit.html",
    note: "Official operator reference for current BTS card information. This guide does not infer cross-network coverage from a generic card name.",
  },
  {
    title: "Explore Thailand safely with the TPB app",
    creator: "Tourism Authority of Thailand",
    url: "https://www.tourismthailand.org/Articles/tourist-police-app-en",
    note: "Official context for the multilingual Tourist Police app and 1155 assistance service.",
  },
  {
    title: "12 things to know before travelling to Bangkok",
    creator: "Lonely Planet",
    url: "https://www.lonelyplanet.com/articles/things-to-know-before-traveling-to-bangkok",
    note: "Competitor format and coverage reference only; personal anecdotes and recommendations were not copied as facts.",
  },
  {
    title: "SERP API documentation",
    creator: "DataForSEO / Go2Thailand editorial",
    url: "https://dataforseo.com/apis/serp-api",
    note: "Two DFS clusters, eleven UK-English SERPs, 88 organic appearances, 40 PAA appearances and four candidate ranking/backlink checks shaped the owner.",
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
      datePublished: "2026-07-29",
      dateModified: "2026-07-29",
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
          name: "Bangkok",
          item: "https://go2-thailand.com/city/bangkok/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Bangkok travel tips",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "A first-time Bangkok arrival and three-day plan",
      itemListElement: arrivalSteps.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.title,
        description: step.description,
      })),
    },
  ];
}

export function BangkokFirstTimeTipsGuideEn() {
  const subId = useSubId();
  const klookHref = withPlacementSubId(
    cityAffiliates.bangkok.klook,
    subId,
    "bangkok-first-time-en-orientation",
  );
  const tripHref = withPlacementSubId(
    cityAffiliates.bangkok.trip || TRIP_GENERIC,
    subId,
    "bangkok-first-time-en-hotels",
  );
  const sailyHref = withPlacementSubId(
    SAILY_GENERIC,
    subId,
    "bangkok-first-time-en-connectivity",
  );
  const onwardHref = withPlacementSubId(
    TWELVEGO_GENERIC,
    subId,
    "bangkok-first-time-en-onward",
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
          content="bangkok travel tips, bangkok first time, first time in bangkok tips, bangkok for first time visitors, bangkok travel tips reddit"
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-07-29" />
        <meta property="article:modified_time" content="2026-07-29" />
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
          image={HERO_IMAGE}
          imageAlt="First-time traveller orienting beside Bangkok's elevated rail in soft morning light"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Bangkok", href: "/city/bangkok/" },
            { label: "First-time tips" },
          ]}
          breadcrumbAriaLabel="Breadcrumb"
          eyebrow="Arrive with a system, not a longer list"
          title={
            <>
              Bangkok.
              <br />
              Start on the right side.
            </>
          }
          subtitle="First-time travel tips that reduce city-crossing, arrival friction and tired-day mistakes."
          description={
            <>
              Bangkok feels difficult when every saved place becomes a separate
              journey. Choose one base corridor, switch transport modes
              deliberately and give each day one geography.
            </>
          }
          actions={[
            {
              label: "Plan the first 90 minutes",
              href: "#arrival",
              kind: "primary",
            },
            { label: "Choose your base", href: "#base", kind: "secondary" },
          ]}
          minHeightClassName="min-h-[760px] lg:min-h-[700px]"
          titleClassName="max-w-[690px] text-[4.35rem] leading-[0.82] sm:text-[5.6rem] lg:text-[6.35rem]"
          imageClassName="object-cover object-[64%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(250,247,239,0.15)_0%,rgba(250,247,239,0.68)_54%,rgba(250,247,239,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,247,239,0.99)_0%,rgba(250,247,239,0.93)_34%,rgba(250,247,239,0.28)_62%,rgba(15,50,42,0.08)_100%)]"
        />

        <PageSectionNav
          items={navItems}
          label="Bangkok first-time guide sections"
        />

        <section
          id="arrival"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
              <SectionHeading
                eyebrow="Land, connect, reset"
                title="Your first 90 minutes have one job"
                description="Reach the correct hotel corridor with enough energy and information left for a small first loop. Airport, hotel and time of arrival decide the route."
              />
              <div className="rounded-2xl border border-saffron/25 bg-[#fff4df] p-5 text-xs font-medium leading-6 text-charcoal/72">
                <strong className="text-jade">Before take-off:</strong> keep
                your hotel name and address offline, compare a connection option
                and know whether your arrival plan depends on rail, car or both.
                Open our{" "}
                <Link
                  href="/blog/bangkok-airport-transfer-guide-2026/"
                  className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4"
                >
                  Bangkok airport transfer guide
                </Link>{" "}
                for the current transport decision.
              </div>
            </div>
            <div className="relative mt-10 grid gap-5 lg:grid-cols-4">
              <div
                aria-hidden="true"
                className="absolute left-[8%] right-[8%] top-7 hidden border-t-2 border-dashed border-saffron/40 lg:block"
              />
              {arrivalSteps.map(
                (
                  { icon: Icon, label, title, description, boundary },
                  index,
                ) => (
                  <article
                    key={title}
                    className="relative z-10 flex min-h-[330px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-canvas bg-jade text-saffron-light shadow-sm">
                        <Icon size={21} />
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                        Step 0{index + 1}
                      </span>
                    </div>
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.13em] text-charcoal/72">
                      {label}
                    </p>
                    <h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/72">
                      {description}
                    </p>
                    <p className="mt-auto border-l-2 border-saffron/50 pl-3 pt-1 text-[10px] font-medium leading-5 text-charcoal/72">
                      {boundary}
                    </p>
                  </article>
                ),
              )}
            </div>
            <div className="mt-7 flex flex-col gap-5 rounded-2xl bg-jade p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                  Connectivity · current options
                </p>
                <p className="mt-2 max-w-2xl text-xs font-medium leading-6 text-white/64">
                  Compare coverage, data amount, activation timing, hotspot
                  terms and current price. A working phone helps only when the
                  route and address are already clear.
                </p>
              </div>
              <a
                href={sailyHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="btn-cream min-h-12 shrink-0 justify-center px-6 text-saffron-dark"
              >
                Check current eSIM options <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <section
          id="base"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading
                eyebrow="Choose a corridor before a hotel"
                title="The best base removes repeated journeys"
                description="Bangkok is not one centre. Pick the side of the city that owns most of your first two days, then compare properties inside that corridor."
              />
              <a
                href={tripHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="group ml-auto inline-flex items-center gap-3 text-xs font-extrabold text-jade"
              >
                Check current Bangkok stays on Trip.com{" "}
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-saffron/35 text-saffron-dark">
                  <ExternalLink size={13} />
                </span>
              </a>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {corridors.map(
                (
                  { name, cue, icon: Icon, suits, rhythm, tradeoff, href },
                  index,
                ) => (
                  <article
                    key={name}
                    className={`grid min-h-[340px] gap-6 rounded-[26px] p-7 sm:grid-cols-[72px_1fr] sm:p-9 ${index === 0 ? "bg-jade text-white shadow-editorial-lift" : "border border-jade/10 bg-white shadow-editorial-card"}`}
                  >
                    <span
                      className={`grid h-16 w-16 place-items-center rounded-2xl ${index === 0 ? "border border-white/14 bg-white/[0.07] text-saffron-light" : "bg-tonal text-jade"}`}
                    >
                      <Icon size={25} />
                    </span>
                    <div className="flex flex-col">
                      <p
                        className={`text-[9px] font-extrabold uppercase tracking-[0.14em] ${index === 0 ? "text-saffron-light" : "text-saffron-dark"}`}
                      >
                        {cue}
                      </p>
                      <h3
                        className={`mt-3 font-display text-[2.15rem] font-semibold leading-none ${index === 0 ? "text-white" : "text-jade"}`}
                      >
                        {name}
                      </h3>
                      <p
                        className={`mt-5 text-xs font-medium leading-6 ${index === 0 ? "text-white/68" : "text-charcoal/72"}`}
                      >
                        <strong
                          className={index === 0 ? "text-white" : "text-jade"}
                        >
                          Fits:
                        </strong>{" "}
                        {suits}
                      </p>
                      <p
                        className={`mt-3 text-xs font-medium leading-6 ${index === 0 ? "text-white/58" : "text-charcoal/72"}`}
                      >
                        <strong
                          className={
                            index === 0 ? "text-white/80" : "text-jade"
                          }
                        >
                          Rhythm:
                        </strong>{" "}
                        {rhythm}
                      </p>
                      <p
                        className={`mt-3 border-l-2 pl-3 text-[10px] font-medium leading-5 ${index === 0 ? "border-saffron/60 text-white/60" : "border-saffron/45 text-charcoal/72"}`}
                      >
                        {tradeoff}
                      </p>
                      <Link
                        href={href}
                        className={`mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold ${index === 0 ? "text-saffron-light" : "text-jade"}`}
                      >
                        Compare the stay decision <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ),
              )}
            </div>
            <AffiliateDisclosure className="mt-4">
              Trip.com affiliate link. We may earn commission after a qualifying
              booking at no extra cost to you. The provider controls current
              room, price, taxes, terms, availability and property information.
            </AffiliateDisclosure>
          </div>
        </section>

        <section
          id="move"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.68fr_1.32fr]">
                <div className="relative min-h-[430px] overflow-hidden p-8 sm:p-10 lg:min-h-[670px] lg:p-12">
                  <div
                    aria-hidden="true"
                    className="absolute -left-20 top-44 h-52 w-80 rotate-[-8deg] rounded-[50%] border-2 border-dashed border-saffron/40"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-[45%] top-[58%] h-4 w-4 rounded-full border-4 border-jade bg-saffron shadow-[0_0_0_5px_rgba(255,255,255,0.08)]"
                  />
                  <p className="eyebrow !text-saffron-light">
                    Mode-switch, not mode loyalty
                  </p>
                  <h2 className="relative z-10 max-w-xl font-display text-[3.9rem] font-semibold leading-[0.84] tracking-[-0.045em]">
                    Rail for distance.
                    <br />
                    Feet for detail.
                  </h2>
                  <p className="relative z-10 mt-7 max-w-lg text-sm font-medium leading-7 text-white/66">
                    The route improves when you change mode at the right moment.
                    One direct car can fix an awkward gap; one unnecessary car
                    can turn a compact day into traffic.
                  </p>
                  <Link
                    href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/"
                    className="relative z-10 mt-8 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light"
                  >
                    Open the Bangkok transport guide <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {moveModes.map(({ icon: Icon, mode, use, avoid }, index) => (
                    <article
                      key={mode}
                      className="min-h-[300px] bg-jade p-7 sm:p-9"
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/14 bg-white/[0.055] text-saffron-light">
                          <Icon size={21} />
                        </span>
                        <span aria-hidden="true" className="font-display text-3xl text-white/60">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-7 font-display text-[1.8rem] font-semibold leading-none">
                        {mode}
                      </h3>
                      <p className="mt-5 text-xs font-medium leading-6 text-white/68">
                        {use}
                      </p>
                      <p className="mt-4 border-l-2 border-saffron/55 pl-3 text-[10px] font-medium leading-5 text-white/60">
                        {avoid}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="days"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Three geographies, three rhythms"
              title="Build days that stay on one side of Bangkok"
              description="This is a route frame, not a compulsory attraction schedule. Swap the content; keep the geographic discipline."
            />
            <div className="relative mt-10 grid gap-6 lg:grid-cols-3">
              <div
                aria-hidden="true"
                className="absolute left-[10%] right-[10%] top-12 hidden border-t-2 border-dashed border-saffron/45 lg:block"
              />
              {dayPlans.map((day, index) => (
                <article
                  key={day.label}
                  className={`relative z-10 flex min-h-[510px] flex-col rounded-[26px] p-7 sm:p-9 ${index === 1 ? "bg-jade text-white shadow-editorial-lift" : "border border-jade/10 bg-white shadow-editorial-card"}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-16 w-16 place-items-center rounded-full border-4 font-display text-xl ${index === 1 ? "border-jade bg-saffron text-jade" : "border-tonal bg-jade text-saffron-light"}`}
                    >
                      {index + 1}
                    </span>
                    <MapPin
                      size={20}
                      className={
                        index === 1 ? "text-saffron-light" : "text-jade"
                      }
                    />
                  </div>
                  <p
                    className={`mt-8 text-[9px] font-extrabold uppercase tracking-[0.14em] ${index === 1 ? "text-saffron-light" : "text-saffron-dark"}`}
                  >
                    {day.label} · {day.anchor}
                  </p>
                  <h3
                    className={`mt-3 font-display text-[2.3rem] font-semibold leading-[0.9] ${index === 1 ? "text-white" : "text-jade"}`}
                  >
                    {day.title}
                  </h3>
                  <ol className="mt-7 space-y-4">
                    {day.steps.map((step, stepIndex) => (
                      <li
                        key={step}
                        className="flex gap-3 text-xs font-semibold leading-5"
                      >
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-display ${index === 1 ? "bg-white/10 text-saffron-light" : "bg-tonal text-jade"}`}
                        >
                          {stepIndex + 1}
                        </span>
                        <span
                          className={
                            index === 1 ? "text-white/70" : "text-charcoal/72"
                          }
                        >
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p
                    className={`mt-auto border-l-2 pl-4 text-[10px] font-medium leading-5 ${index === 1 ? "border-saffron/65 text-white/60" : "border-saffron/45 text-charcoal/72"}`}
                  >
                    {day.boundary}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Leaving Bangkok afterwards?</p>
                <p className="max-w-2xl text-xs font-medium leading-6 text-charcoal/72">
                  Keep the last day compatible with checkout and the correct
                  station, airport or pier. Compare the current operator,
                  departure point, luggage terms and live price.
                </p>
              </div>
              <a
                href={onwardHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="btn-jade btn-jade-pattern min-h-12 shrink-0 justify-center px-6"
              >
                Check current onward options{" "}
                <ExternalLink size={14} className="text-saffron" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="friction"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="Questions underneath the itinerary"
                title="Six small frictions shape the whole city"
                description="Community threads are good at revealing anxiety. They are not a substitute for current operator, government or venue information."
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/72">
                Use the cards as a five-minute pre-flight check. If one issue
                could materially change your day—mobility, serious allergy,
                medication, legal status or current security—open the specialist
                or official source.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {frictionCards.map(({ icon: Icon, title, answer, link }) => (
                <article
                  key={title}
                  className="flex min-h-[285px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-tonal text-jade">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">
                    {title}
                  </h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/72">
                    {answer}
                  </p>
                  {link ? (
                    <Link
                      href={link.href}
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-extrabold text-jade"
                    >
                      {link.label}{" "}
                      <ArrowRight size={13} className="text-saffron" />
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>

            <div className="mt-10 grid overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift lg:grid-cols-[0.88fr_1.12fr]">
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">
                  Current safety, not a blanket label
                </p>
                <h2 className="font-display text-[3.25rem] font-semibold leading-[0.86] tracking-[-0.04em]">
                  Check the date before you trust the answer.
                </h2>
                <p className="mt-6 text-sm font-medium leading-7 text-white/65">
                  Bangkok cannot be certified “safe right now” by an evergreen
                  article. GOV.UK travel advice can change; open it again before
                  departure. For appropriate tourist assistance in Thailand, the
                  current Tourist Police service is 1155.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://www.gov.uk/foreign-travel-advice/thailand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cream min-h-12 px-5 text-saffron-dark"
                  >
                    Open current UK advice <ExternalLink size={14} />
                  </a>
                  <a
                    href="https://www.touristpolice.go.th/main"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 px-5 text-xs font-extrabold text-white"
                  >
                    Tourist Police 1155 <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                {[
                  [
                    "Closed attraction story",
                    "Verify with the venue or another independent source before accepting a detour.",
                  ],
                  [
                    "Transport pressure",
                    "Confirm destination and terms; leave when urgency replaces a clear choice.",
                  ],
                  [
                    "Drink and belongings",
                    "Keep control of both and use a safe return plan that does not depend on one stranger.",
                  ],
                  [
                    "Road and crossing risk",
                    "Use crossings carefully, avoid casual scooter decisions and allow a safer route to take longer.",
                  ],
                ].map(([title, text], index) => (
                  <article
                    key={title}
                    className="min-h-[245px] bg-jade p-7 sm:p-8"
                  >
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                      Boundary 0{index + 1}
                    </span>
                    <h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none">
                      {title}
                    </h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-white/60">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading
              eyebrow="A better swap"
              title="Replace the mistake, not the whole day"
              description="These are planning corrections, not rules about what every traveller must enjoy."
            />
            <div className="divide-y divide-jade/10 border-y border-jade/10">
              {mistakes.map(([mistake, swap], index) => (
                <article
                  key={mistake}
                  className="grid gap-4 py-6 sm:grid-cols-[42px_1fr_44px_1fr] sm:items-start"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0df] text-saffron-dark">
                    <TriangleAlert size={17} />
                  </span>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-charcoal/72">
                      Mistake 0{index + 1}
                    </p>
                    <h3 className="mt-2 text-sm font-extrabold leading-5 text-jade">
                      {mistake}
                    </h3>
                  </div>
                  <span className="hidden h-10 w-10 place-items-center rounded-full border border-saffron/30 text-saffron-dark sm:grid">
                    <ArrowRight size={16} />
                  </span>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">
                      Better swap
                    </p>
                    <p className="mt-2 text-xs font-medium leading-6 text-charcoal/72">
                      {swap}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom grid gap-5 lg:grid-cols-3">
            {[
              {
                label: "Klook · orientation",
                title: "Compare a first-day city experience",
                text: "Check the live route, group size, walking level, inclusions, meeting point, cancellation terms and current price.",
                href: klookHref,
                icon: Compass,
                cta: "Check current Bangkok activities",
              },
              {
                label: "Trip.com · stay",
                title: "Compare the corridor before the room",
                text: "Check the actual map position, transport access, cancellation terms, taxes, room and current total.",
                href: tripHref,
                icon: BedDouble,
                cta: "Check current Bangkok stays",
              },
              {
                label: "12Go · onward",
                title: "Keep departure day geographically honest",
                text: "Confirm the current terminal, operator, luggage rules, departure point and live price before leaving Bangkok.",
                href: onwardHref,
                icon: Route,
                cta: "Check current onward travel",
              },
            ].map(({ label, title, text, href, icon: Icon, cta }, index) => (
              <article
                key={label}
                className={`flex min-h-[360px] flex-col rounded-[26px] p-7 sm:p-9 ${index === 1 ? "bg-jade text-white shadow-editorial-lift" : "border border-jade/10 bg-white shadow-editorial-card"}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl ${index === 1 ? "border border-white/14 bg-white/[0.06] text-saffron-light" : "bg-tonal text-jade"}`}
                  >
                    <Icon size={20} />
                  </span>
                  <ExternalLink
                    size={15}
                    className={index === 1 ? "text-white/60" : "text-jade/70"}
                  />
                </div>
                <p
                  className={`mt-8 text-[9px] font-extrabold uppercase tracking-[0.14em] ${index === 1 ? "text-saffron-light" : "text-saffron-dark"}`}
                >
                  {label}
                </p>
                <h2
                  className={`mt-3 font-display text-[2rem] font-semibold leading-[0.92] ${index === 1 ? "text-white" : "text-jade"}`}
                >
                  {title}
                </h2>
                <p
                  className={`mt-5 text-xs font-medium leading-6 ${index === 1 ? "text-white/62" : "text-charcoal/72"}`}
                >
                  {text}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className={`mt-auto inline-flex items-center gap-2 pt-7 text-xs font-extrabold ${index === 1 ? "text-saffron-light" : "text-jade"}`}
                >
                  {cta} <ArrowRight size={14} />
                </a>
              </article>
            ))}
            <AffiliateDisclosure className="lg:col-span-3">
              Klook, Trip.com and 12Go affiliate links. We may earn commission
              after a qualifying booking at no extra cost to you. Providers
              control the current product, operator, availability, terms and
              price.
            </AffiliateDisclosure>
          </div>
        </section>

        <section
          id="kit"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
                <div className="relative min-h-[500px] lg:min-h-[720px]">
                  <Image
                    src={KIT_IMAGE}
                    alt="Bangkok first-day kit with a packable backpack, adapter, power bank, bottle and route map"
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="eyebrow !text-saffron-light">
                      One task per item
                    </p>
                    <h2 className="max-w-xl font-display text-[3.45rem] font-semibold leading-[0.84] tracking-[-0.04em]">
                      Pack for the first day, not every imagined problem.
                    </h2>
                  </div>
                </div>
                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="text-sm font-medium leading-7 text-white/66">
                    These are optional examples, not a product ranking or
                    compulsory kit. Each link solves a concrete arrival task and
                    opens a current Amazon offer through the central
                    OneLink-compatible router.
                  </p>
                  <div className="mt-8 space-y-3">
                    {amazonProducts.map(
                      ({ slug, icon: Icon, title, reason }) => (
                        <a
                          key={slug}
                          href={`/go/${slug}/`}
                          target="_blank"
                          rel="noopener noreferrer nofollow sponsored"
                          className="group grid grid-cols-[42px_1fr_34px] items-start gap-4 rounded-xl border border-white/13 bg-white/[0.06] p-4 transition hover:border-saffron/45 hover:bg-white/[0.1]"
                        >
                          <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/35 text-saffron-light">
                            <Icon size={18} />
                          </span>
                          <span>
                            <strong className="block text-xs text-white">
                              {title}
                            </strong>
                            <span className="mt-1 block text-[10px] leading-4 text-white/60">
                              {reason}
                            </span>
                            <span className="mt-2 block text-[9px] font-extrabold uppercase tracking-[0.08em] text-saffron-light">
                              Check current price at Amazon
                            </span>
                          </span>
                          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-white/60 transition group-hover:text-saffron-light">
                            <ExternalLink size={13} />
                          </span>
                        </a>
                      ),
                    )}
                  </div>
                  <AffiliateDisclosure className="mt-5 !text-white/60">
                    Amazon affiliate disclosure: as an Amazon Associate, we earn
                    from qualifying purchases at no extra cost to you. OneLink
                    may route eligible visitors to a local store; product,
                    seller, price, delivery, plug compatibility and availability
                    vary by country.
                  </AffiliateDisclosure>
                  <div className="mt-8 border-t border-white/12 pt-7">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                      Skip the whole block when
                    </p>
                    <p className="mt-3 text-xs font-medium leading-6 text-white/62">
                      Your phone, charger, bag and battery plan already work.
                      Reusing suitable gear is the better recommendation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real first-time search questions"
          title="Bangkok questions, answered without certainty theatre"
          description="These are genuine questions captured across eleven live UK-English SERPs. Current safety, law, transport and operator details still require a live source check."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Open the specialist owner next"
          title="Let one guide own one decision"
          guides={[
            {
              title: "Bangkok transport",
              description:
                "Compare BTS, MRT and the practical network boundary before turning a city route into a ticket question.",
              href: "/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/",
              image:
                "/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp",
              imageAlt: "Bangkok urban rail and transport",
            },
            {
              title: "Bangkok street food",
              description:
                "Choose an area, a bounded tasting route and a food-tour decision without chasing one permanent vendor list.",
              href: "/blog/best-street-food-markets-bangkok/",
              image: "/images/redesign/bangkok-street-food-hero.webp",
              imageAlt: "Bangkok street-food district at blue hour",
            },
            {
              title: "Grand Palace",
              description:
                "Plan the old-Bangkok anchor with dress, route and current-condition checks before the first temple day.",
              href: "/blog/grand-palace-bangkok-complete-guide-2026/",
              image:
                "/images/blog/grand-palace-bangkok-complete-guide-2026.webp",
              imageAlt: "Grand Palace in Bangkok",
            },
          ]}
          readLabel="Open the guide"
          sideLink={{
            label: "Open the complete Bangkok hub",
            href: "/city/bangkok/",
          }}
        />

        <SourceMethodSection
          eyebrow="Sources & editorial method"
          title="Community questions, independently verified answers"
          description="Reddit and Tripadvisor appearances helped reveal first-time friction; they were not treated as factual consensus. This owner combines two independent DFS clusters, eleven current UK-English SERPs, exact ranking and backlink checks, full competitor parses and current government or operator sources. Last substantive review: 29 July 2026."
          sources={sources}
        />

        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <div className="flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">One base. One side per day.</p>
                <h2 className="font-display text-[2.6rem] font-semibold leading-none text-jade">
                  Let Bangkok feel large without making every day long.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#arrival"
                  className="btn-jade btn-jade-pattern group min-h-12 px-6"
                >
                  Plan arrival <ArrowRight size={15} className="text-saffron" />
                </a>
                <Link
                  href="/city/bangkok/"
                  className="btn-cream min-h-12 px-6 text-saffron-dark"
                >
                  Open Bangkok <MapPin size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
