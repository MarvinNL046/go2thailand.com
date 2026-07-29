import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BedDouble,
  BatteryCharging,
  Building2,
  Check,
  ChevronRight,
  CircleHelp,
  Compass,
  ExternalLink,
  Footprints,
  HeartHandshake,
  Hotel,
  Landmark,
  LockKeyhole,
  MapPin,
  MessageCircle,
  MoonStar,
  PhoneCall,
  Route,
  ShieldCheck,
  Ship,
  Smartphone,
  Sparkles,
  TrainFront,
  Users,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";
import {
  KLOOK_GENERIC,
  SAILY_GENERIC,
  TRIP_GENERIC,
  TWELVEGO_GENERIC,
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

const PAGE_URL =
  "https://go2-thailand.com/travel-guides/solo-female-travel-thailand/";
const HERO_IMAGE = "/images/redesign/solo-female-thailand-hero.webp";
const ROUTE_IMAGE =
  "/images/redesign/solo-female-thailand-choice-route.webp";
const PAGE_TITLE =
  "Solo Female Travel in Thailand: Safety & Planning | Go2Thailand";
const PAGE_DESCRIPTION =
  "Plan solo female travel in Thailand with a clear arrival, accommodation, transport, social and return-route system. Includes current help contacts and real PAA answers.";
const UPDATED_AT = "2026-07-29";

const navItems: PageSectionNavItem[] = [
  { href: "#chain", label: "Six moments", icon: Route },
  { href: "#bases", label: "Choose a base", icon: MapPin },
  { href: "#stay", label: "Choose a stay", icon: BedDouble },
  { href: "#move", label: "Move well", icon: TrainFront },
  { href: "#connect", label: "Meet people", icon: Users },
  { href: "#return", label: "Return plan", icon: MoonStar },
  { href: "#questions", label: "Questions", icon: CircleHelp },
];

const safetyChain: Array<{
  icon: LucideIcon;
  moment: string;
  title: string;
  action: string;
  boundary: string;
}> = [
  {
    icon: Hotel,
    moment: "01 · Book",
    title: "Make the first arrival easy",
    action:
      "Choose the actual address, arrival route and reception reality before comparing pools, views or decorative room details.",
    boundary:
      "A high score does not answer how the final ten minutes work after dark.",
  },
  {
    icon: TrainFront,
    moment: "02 · Arrive",
    title: "Keep the transfer identifiable",
    action:
      "Know the terminal, the intended mode and the hotel name in Thai and English. Save one offline map and a booking copy.",
    boundary:
      "Do not let a helpful stranger silently replace the route you verified.",
  },
  {
    icon: LockKeyhole,
    moment: "03 · Check in",
    title: "Test the room and the exit",
    action:
      "Check the lock, reception contact, locker or valuables option, fire route and the path back from the nearest useful street.",
    boundary:
      "Ask for a room change or leave when a basic condition is not right.",
  },
  {
    icon: Compass,
    moment: "04 · Move",
    title: "Switch mode before friction wins",
    action:
      "Rail, a booked car, a shared transfer and walking each suit different parts of one day. Re-plan when rain, fatigue or isolation changes the route.",
    boundary:
      "A shorter map line is not automatically the easier or better-lit route.",
  },
  {
    icon: HeartHandshake,
    moment: "05 · Meet",
    title: "Connect without surrendering the plan",
    action:
      "Use a class, small tour, activity or common area as a social anchor. Keep your own room key, money, phone and way home.",
    boundary:
      "You never owe a new acquaintance a changed route, drink or second venue.",
  },
  {
    icon: MoonStar,
    moment: "06 · Return",
    title: "Decide the exit while the evening is easy",
    action:
      "Save the main route, pickup point and backup before going out. Leave early when the setting, drink, group or journey changes.",
    boundary:
      "Politeness is not a reason to delay an exit that you want to make.",
  },
];

const destinationFormats: Array<{
  icon: LucideIcon;
  number: string;
  name: string;
  cue: string;
  fit: string;
  tradeoff: string;
  plan: string;
  href: string;
}> = [
  {
    icon: Building2,
    number: "01",
    name: "Connected Bangkok",
    cue: "Best when movement matters",
    fit: "A first or final base with rail, river, organised activities and many hotel formats.",
    tradeoff:
      "Bangkok is not one walkable neighbourhood. A cheap room can create several difficult daily crossings.",
    plan: "Choose one corridor, arrive in daylight when possible and give each day one side of the city.",
    href: "/city/bangkok/",
  },
  {
    icon: Landmark,
    number: "02",
    name: "Compact-social Chiang Mai",
    cue: "Best for a slower first rhythm",
    fit: "A smaller urban base with classes, cafés, markets and day tours that make meeting people optional rather than random.",
    tradeoff:
      "Old City, riverside and Nimman create different transport patterns. Seasonal air quality also needs a current check.",
    plan: "Put one class or group activity near the start, then keep free days genuinely free.",
    href: "/city/chiang-mai/",
  },
  {
    icon: Waves,
    number: "03",
    name: "Activity-led coast",
    cue: "Best when the day has an anchor",
    fit: "Krabi, Phuket and other coastal bases work well when diving, climbing, cooking or a small-group boat day supplies structure.",
    tradeoff:
      "Beach names can hide long distances. Weather and sea conditions can cancel the activity that held the plan together.",
    plan: "Choose the base for the activity pickup and keep one land-based alternative.",
    href: "/city/krabi/",
  },
  {
    icon: Ship,
    number: "04",
    name: "Island + ferry travel",
    cue: "Best with deliberate transfers",
    fit: "A strong choice when the island itself is the goal and you are comfortable building the journey around ferries and a final transfer.",
    tradeoff:
      "Late arrivals, pier changes, sea conditions and the last ride to the stay add dependencies.",
    plan: "Read the whole airport-to-room chain and protect the final connection with time.",
    href: "/islands/",
  },
];

const accommodationChecks = [
  {
    icon: MapPin,
    title: "Address before atmosphere",
    text: "Open the pin, nearby main street and station or pickup route. Read recent location comments for lighting, construction and late access rather than relying on the neighbourhood name.",
  },
  {
    icon: Hotel,
    title: "Reception that matches arrival",
    text: "Check whether reception, key collection and luggage storage still work at the time you expect to arrive. Message the property when the process is not explicit.",
  },
  {
    icon: LockKeyhole,
    title: "Access you can verify",
    text: "Look for a clear room-lock, entrance and valuables process. In a hostel, compare privacy, locker requirements and women-only versus mixed dorm options on their real trade-offs.",
  },
  {
    icon: Footprints,
    title: "The late-return test",
    text: "Imagine returning alone from the nearest useful station or pickup point. If the route depends on an isolated shortcut, choose another path or another property.",
  },
];

const transportModes = [
  {
    icon: TrainFront,
    title: "Urban rail",
    use: "Use it for long city corridors when both ends fit the network.",
    check: "Last useful service, interchange, exit number and final walk.",
  },
  {
    icon: Smartphone,
    title: "Identifiable car",
    use: "Use an official queue, hotel booking or app-supported ride where available.",
    check: "Plate, driver, pickup point, destination and your own route screen.",
  },
  {
    icon: Users,
    title: "Shared activity transfer",
    use: "Useful when it removes a difficult first or last leg for a class or tour.",
    check: "Named operator, pickup zone, timing, return and what happens after a change.",
  },
  {
    icon: Ship,
    title: "Intercity operator",
    use: "Compare the full train, bus, van or ferry journey rather than one departure time.",
    check: "Terminal, operator, connection, luggage, arrival time and last mile.",
  },
];

const socialAnchors = [
  {
    icon: BedDouble,
    title: "Private room, social common space",
    text: "A private room in a sociable hostel or guesthouse can offer easy conversation without making sleep, belongings or downtime communal.",
    autonomy: "Keep your own key, payment method and return route.",
  },
  {
    icon: UtensilsCrossed,
    title: "A class with a real task",
    text: "Cooking, craft and language sessions give a small group something to do, which can feel easier than trying to manufacture conversation at a bar.",
    autonomy: "Read the operator, meeting point, finish time and transport first.",
  },
  {
    icon: Sparkles,
    title: "A bounded day activity",
    text: "A walking tour, climbing day, dive trip or ethical small-group activity can create connection without committing the rest of the itinerary.",
    autonomy: "Keep tomorrow open until you know whether the group actually fits.",
  },
  {
    icon: MessageCircle,
    title: "Plans that stay optional",
    text: "Meeting again can be a pleasant bonus. Share only what you choose, meet in a public setting and keep accommodation access and documents private.",
    autonomy: "A changed mind is enough reason to cancel or leave.",
  },
];

const faqItems = [
  {
    question: "Is it safe to travel to Thailand as a solo female traveller?",
    answer:
      "Many women travel independently in Thailand, but popularity is not a safety guarantee. A useful plan checks current official advice, the first arrival, accommodation access, each transport mode, drink control and the return route. Sexual assault, drink spiking, theft, road danger and regional warnings are real risks; avoid blanket claims and reassess the immediate setting.",
  },
  {
    question: "Where should a solo female traveller go in Thailand?",
    answer:
      "Choose a format, not a universal ‘safest’ ranking. Bangkok suits travellers who value connections and variety; Chiang Mai offers a compact social rhythm; an activity-led coast works when a class, dive or climbing day anchors the plan; islands suit travellers comfortable with ferry and last-mile dependencies. Match the base to your arrival and movement style.",
  },
  {
    question: "Can a woman wear shorts in Bangkok?",
    answer:
      "Shorts are common casual clothing in Bangkok, but a specific temple, formal venue or workplace can require more coverage. Carry a light layer, check the current dress rules for the place you will enter and avoid treating one city-wide answer as permission for every setting.",
  },
  {
    question: "What should women be careful of in Thailand?",
    answer:
      "Prioritise road and scooter decisions, drink spiking and unknown alcohol, isolated late routes, pressure from strangers or new acquaintances, theft in crowded places, unsafe sea conditions and changing regional advice. The list is not complete; use current official guidance and assess the exact route, activity and time.",
  },
  {
    question: "Is it safe for a girl to travel alone in Thailand?",
    answer:
      "An adult woman can plan an independent Thailand trip, but no responsible guide can promise that it will be safe. Build a first-night arrival, share the route with someone you trust, keep control of drinks and transport, and leave situations that become coercive. A minor needs a different legal, safeguarding and guardian plan; this guide is written for adults.",
  },
  {
    question: "Is Thailand good for solo female travellers?",
    answer:
      "Thailand can fit independent travel because it offers several transport types, many accommodation formats and easy ways to join bounded activities. It is a poor fit when the itinerary depends on unverified late transfers, inexperienced scooter riding or constant improvisation. Suitability depends on your route, experience and tolerance for uncertainty.",
  },
  {
    question: "Is it worth going to Thailand alone?",
    answer:
      "It can be, if travelling alone gives you useful control over pace, bases and activities. Add one or two social anchors instead of filling every day. If the logistics feel heavy, a small-group activity or an easier first base can reduce friction without turning the whole trip into an escorted tour.",
  },
  {
    question: "Can a woman travel alone in Thailand without staying in hostels?",
    answer:
      "Yes. Hotels, guesthouses, serviced apartments and private hostel rooms can all work. Social contact can come from a cooking class, walking tour, dive day or café rather than a dorm. Compare current access, reception, location and recent review signals for the exact property.",
  },
  {
    question: "Is Bangkok safe for a solo female traveller?",
    answer:
      "Bangkok cannot be reduced to one safety label. A well-connected hotel, a known arrival, busy main routes and deliberate transport can make the city easier to manage. Traffic, crowded-place theft, drink spiking and isolated late routes still require attention. Check current official advice and use our Bangkok owner for the city-level plan.",
  },
  {
    question: "Is Chiang Mai safe for solo female travellers?",
    answer:
      "Chiang Mai is often chosen for its smaller scale and activity options, but that is not a safety guarantee. Verify the exact neighbourhood and late route, use conservative transport choices, check current air-quality and regional conditions, and apply the same drink, road and accommodation checks used elsewhere.",
  },
];

const sources = [
  {
    title: "Safety and security in Thailand",
    creator: "UK Foreign, Commonwealth & Development Office",
    url: "https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security",
    note: "Current primary guidance for sexual assault, drink spiking, theft, road travel, cannabis, regional and other safety boundaries.",
  },
  {
    title: "Getting help in Thailand",
    creator: "UK Foreign, Commonwealth & Development Office",
    url: "https://www.gov.uk/foreign-travel-advice/thailand/getting-help",
    note: "Primary source for police 191, ambulance 1669, fire 199, Tourist Police 1155 and the role of provider, insurer and consular support.",
  },
  {
    title: "Rape and sexual assault in Thailand: information for victims",
    creator: "UK Foreign, Commonwealth & Development Office",
    url: "https://www.gov.uk/government/publications/rape-and-sexual-assault-in-thailand-information-for-victims",
    note: "Current support guide explaining medical, reporting and consular choices without forcing one response.",
  },
  {
    title: "Tourist Police Bureau",
    creator: "Thailand Tourist Police",
    url: "https://www.touristpolice.go.th/en/main",
    note: "Official information for Tourist Police assistance and the 1155 service.",
  },
  {
    title: "Tourist Police trust portal",
    creator: "Thailand Tourist Police",
    url: "https://trust.touristpolice.go.th/en",
    note: "Official provider-checking context; the portal explicitly does not guarantee a contract, payment or service performance.",
  },
  {
    title: "SERP API documentation",
    creator: "DataForSEO / Go2Thailand editorial",
    url: "https://dataforseo.com/apis/serp-api",
    note: "Three independent keyword clusters, eleven UK-English SERPs, 87 organic appearances, 50 PAA appearances, four competitor parses and candidate-owner checks shaped this page.",
  },
];

function createSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: "Solo female travel in Thailand: a choice-preserving plan",
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: UPDATED_AT,
      dateModified: UPDATED_AT,
      inLanguage: "en-GB",
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
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
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
          name: "Travel guides",
          item: "https://go2-thailand.com/travel-guides/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Solo female travel in Thailand",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Six moments in a solo female Thailand travel plan",
      itemListElement: safetyChain.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.action,
      })),
    },
  ];
}

export function SoloFemaleThailandGuideEn() {
  const subId = useSubId();
  const tripHref = withPlacementSubId(
    TRIP_GENERIC,
    subId,
    "solo-female-thailand-en-stays",
  );
  const klookHref = withPlacementSubId(
    KLOOK_GENERIC,
    subId,
    "solo-female-thailand-en-social-activities",
  );
  const transportHref = withPlacementSubId(
    TWELVEGO_GENERIC,
    subId,
    "solo-female-thailand-en-transport",
  );
  const sailyHref = withPlacementSubId(
    SAILY_GENERIC,
    subId,
    "solo-female-thailand-en-connectivity",
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
          content="solo female travel thailand, is thailand safe for solo female travellers, solo female travel in thailand, female solo travel thailand"
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={UPDATED_AT} />
        <meta property="article:modified_time" content={UPDATED_AT} />
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
          imageAlt="Independent woman traveller arriving at a staffed Bangkok riverside ferry pier in morning light"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Travel guides", href: "/travel-guides/" },
            { label: "Solo female travel" },
          ]}
          breadcrumbAriaLabel="Breadcrumb"
          eyebrow="Independence works best with a clear next move"
          title={
            <>
              Thailand, solo.
              <br />
              Keep every next move yours.
            </>
          }
          subtitle="A solo-female plan built around choice, connection and a route home—not a list of ‘safest’ places."
          description={
            <>
              Many women travel independently in Thailand. That does not create
              a safety guarantee. Make the first arrival easy, choose stays by
              access, meet people without losing autonomy and decide the return
              before the evening becomes complicated.
            </>
          }
          actions={[
            { label: "Build the six-moment plan", href: "#chain", kind: "primary" },
            { label: "Choose a first base", href: "#bases", kind: "secondary" },
          ]}
          minHeightClassName="min-h-[790px] lg:min-h-[720px]"
          contentClassName="max-w-[730px]"
          titleClassName="max-w-[760px] text-[3.85rem] leading-[0.83] sm:text-[5rem] lg:text-[5.85rem]"
          subtitleClassName="max-w-[650px] text-[1.3rem] leading-[1.08] sm:text-[1.55rem]"
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-7"
          imageClassName="object-cover object-[69%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(250,247,239,0.08)_0%,rgba(250,247,239,0.72)_54%,rgba(250,247,239,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,247,239,0.99)_0%,rgba(250,247,239,0.94)_38%,rgba(250,247,239,0.23)_67%,rgba(15,50,42,0.03)_100%)]"
          sideCard={(
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[302px] rounded-2xl border border-white/40 bg-white/78 p-5 text-jade shadow-editorial-card backdrop-blur-xl xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">
                The useful safety question
              </p>
              <p className="mt-3 font-display text-[1.55rem] font-semibold leading-[1.02]">
                Can I keep control of the next move?
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-jade/10 pt-4 text-center text-[9px] font-bold text-charcoal/62">
                <span>Know arrival</span>
                <span>Keep access</span>
                <span>Plan return</span>
              </div>
            </div>
          )}
        />

        <PageSectionNav
          items={navItems}
          label="Solo female Thailand travel guide sections"
        />

        <section
          id="chain"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading
                eyebrow="The decision system"
                title={
                  <>
                    Six moments.
                    <br />
                    One continuous chain.
                  </>
                }
                description="Safety planning is not a packing list you finish at home. Each moment hands control to the next: the stay shapes arrival, arrival shapes movement, and movement shapes how easily you can leave."
              />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">
                A weak link does not mean cancelling the trip. It means changing
                the property, transfer, meeting place, activity or time before
                the decision becomes expensive or difficult.
              </p>
            </div>

            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="absolute left-6 top-0 h-full border-l-2 border-dotted border-saffron/65 lg:left-[8.3%] lg:right-[8.3%] lg:top-10 lg:h-0 lg:border-l-0 lg:border-t-2"
              />
              <div className="relative grid gap-4 lg:grid-cols-3">
                {safetyChain.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-tonal"} ml-12 min-h-[280px] rounded-2xl border border-jade/10 p-6 shadow-editorial-card lg:ml-0`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/35 bg-canvas text-jade">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                          {item.moment}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-[0.96] text-jade">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/70">
                        {item.action}
                      </p>
                      <p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-bold leading-5 text-jade/72">
                        {item.boundary}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          id="bases"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Where should you start?"
              title={
                <>
                  Choose a travel format.
                  <br />
                  Not a “safest city”.
                </>
              }
              description="A destination works when its movement, activities and transfer dependencies match you. These four formats describe fit and friction; none is a universal safety ranking."
            />

            <div className="mt-11 grid gap-5 lg:grid-cols-2">
              {destinationFormats.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.name}
                    className={`${index === 0 || index === 3 ? "bg-jade text-white" : "bg-white text-jade"} group relative overflow-hidden rounded-[26px] border border-jade/10 p-7 shadow-editorial-card sm:p-9`}
                  >
                    <span className="absolute right-5 top-3 font-display text-[6rem] font-semibold leading-none opacity-[0.07]">
                      {item.number}
                    </span>
                    <div className="relative flex items-center justify-between">
                      <span
                        className={`${index === 0 || index === 3 ? "border-white/18 bg-white/[0.08] text-saffron-light" : "border-saffron/30 bg-canvas text-jade"} grid h-12 w-12 place-items-center rounded-xl border`}
                      >
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span
                        className={`${index === 0 || index === 3 ? "text-saffron-light" : "text-saffron-dark"} text-[9px] font-extrabold uppercase tracking-[0.14em]`}
                      >
                        {item.cue}
                      </span>
                    </div>
                    <h3 className="relative mt-7 font-display text-[2.5rem] font-semibold leading-none">
                      {item.name}
                    </h3>
                    <p
                      className={`${index === 0 || index === 3 ? "text-white/72" : "text-charcoal/70"} relative mt-5 text-sm font-medium leading-7`}
                    >
                      {item.fit}
                    </p>
                    <div
                      className={`${index === 0 || index === 3 ? "border-white/12" : "border-jade/10"} relative mt-6 grid gap-5 border-t pt-5 sm:grid-cols-2`}
                    >
                      <div>
                        <p className={`${index === 0 || index === 3 ? "text-white/45" : "text-charcoal/48"} text-[9px] font-extrabold uppercase tracking-[0.12em]`}>
                          Trade-off
                        </p>
                        <p className={`${index === 0 || index === 3 ? "text-white/62" : "text-charcoal/64"} mt-2 text-[11px] font-medium leading-5`}>
                          {item.tradeoff}
                        </p>
                      </div>
                      <div>
                        <p className={`${index === 0 || index === 3 ? "text-white/45" : "text-charcoal/48"} text-[9px] font-extrabold uppercase tracking-[0.12em]`}>
                          Make it work
                        </p>
                        <p className={`${index === 0 || index === 3 ? "text-white/62" : "text-charcoal/64"} mt-2 text-[11px] font-medium leading-5`}>
                          {item.plan}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={item.href}
                      className={`${index === 0 || index === 3 ? "text-white" : "text-jade"} relative mt-6 inline-flex items-center gap-2 text-xs font-extrabold`}
                    >
                      Open the destination owner
                      <ArrowRight size={14} className="text-saffron" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="stay"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-9 lg:grid-cols-[0.66fr_1.34fr] lg:items-end">
              <SectionHeading
                eyebrow="The room is only half the stay"
                title={
                  <>
                    Choose the route
                    <br />
                    back to the door.
                  </>
                }
                description="Do not search only for ‘female-friendly’ or trust one rating. Inspect the address, access process, current review signals and the actual return from the nearest useful transport point."
              />
              <div className="rounded-2xl border border-saffron/25 bg-tonal p-6 lg:justify-self-end lg:max-w-[520px]">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                  The first-night rule
                </p>
                <p className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.02] text-jade">
                  Pay for less arrival friction before paying for a better view.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-jade/10 bg-jade/10 md:grid-cols-2">
              {accommodationChecks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className={`${index === 0 || index === 3 ? "bg-white" : "bg-mist"} min-h-[245px] p-7 sm:p-9`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="font-display text-4xl font-semibold text-jade/10">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[1.9rem] font-semibold leading-none text-jade">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm font-medium leading-7 text-charcoal/68">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-extrabold text-jade">
                  Compare the exact property—not a destination-wide promise.
                </p>
                <p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">
                  Check current location, reception, room type, access and change
                  terms. A marketplace listing is not a safety certificate.
                </p>
              </div>
              <a
                href={tripHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="btn-jade btn-jade-pattern group min-h-12 shrink-0 px-6"
              >
                Check current stays on Trip.com
                <ExternalLink size={14} className="text-saffron" />
              </a>
            </div>
            <AffiliateDisclosure className="mt-3">
              The Trip.com button is an affiliate link. Go2Thailand may earn a
              commission at no extra cost to you. We do not certify a property
              or guarantee its access, security, availability or service.
            </AffiliateDisclosure>
          </div>
        </section>

        <section
          id="move"
          className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="eyebrow !text-saffron-light">The transport switchboard</p>
                <h2 className="font-display text-[3.45rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4.1rem]">
                  Change mode before
                  <br />
                  the route changes you.
                </h2>
              </div>
              <p className="max-w-2xl text-sm font-medium leading-7 text-white/70 lg:justify-self-end">
                The best transport is the one that fits both ends at that time.
                Do not let a sunk ticket, rainstorm or social plan lock you into
                a route that no longer works.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {transportModes.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="flex min-h-[320px] flex-col rounded-2xl border border-white/15 bg-white/[0.07] p-6"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/35 text-saffron-light">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-none">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-white/72">
                      {item.use}
                    </p>
                    <div className="mt-auto border-t border-white/12 pt-5">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-light">
                        Check before moving
                      </p>
                      <p className="mt-2 text-[10px] font-medium leading-5 text-white/60">
                        {item.check}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="mt-1 shrink-0 text-saffron-light" />
                  <div>
                    <h3 className="font-display text-[1.65rem] font-semibold">
                      A scooter is not a rite of passage
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-white/68">
                      Licence, insurance cover, real riding experience, helmet,
                      vehicle, road and weather must align. Choose another mode
                      when one condition fails. Normality on social media does
                      not repair legal entitlement or policy exclusions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-saffron/35 bg-canvas p-6 text-jade">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                  Read the complete journey
                </p>
                <p className="mt-3 text-sm font-medium leading-6 text-charcoal/70">
                  Use 12Go to compare current operator, departure point,
                  connection and arrival. Then verify the last mile separately.
                </p>
                <a
                  href={transportHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade"
                >
                  Check current transport on 12Go
                  <ExternalLink size={13} className="text-saffron-dark" />
                </a>
                <AffiliateDisclosure className="mt-3">
                  Affiliate link. Check the current operator and complete journey
                  before payment.
                </AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <section
          id="connect"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="relative min-h-[620px] overflow-hidden rounded-[30px] shadow-editorial-lift lg:min-h-[560px]">
              <Image
                src={ROUTE_IMAGE}
                alt="Woman travelling through Bangkok rail, a small Thai cooking class and a staffed island ferry pier"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,42,34,0.04)_0%,rgba(5,42,34,0.14)_44%,rgba(5,42,34,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,42,34,0.86)_0%,rgba(5,42,34,0.34)_40%,rgba(5,42,34,0.02)_72%)]" />
              <div className="absolute bottom-8 left-7 right-7 max-w-[500px] text-white sm:bottom-10 sm:left-10 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
                <p className="eyebrow !text-saffron-light">Connection without dependence</p>
                <h2 className="font-display text-[3.3rem] font-semibold leading-[0.86] tracking-[-0.04em] sm:text-[3.9rem]">
                  Give the day one social anchor.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/78">
                  A shared task makes conversation easier. Your accommodation,
                  phone, money and return remain yours.
                </p>
                <a
                  href={klookHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="btn-cream mt-7 min-h-12 px-6 text-saffron-dark"
                >
                  Check current group activities
                  <ExternalLink size={14} />
                </a>
                <AffiliateDisclosure className="mt-3 !text-white/72">
                  Klook affiliate link. Check the named operator, meeting point,
                  inclusions, return and current change terms.
                </AffiliateDisclosure>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {socialAnchors.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="flex min-h-[300px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                  >
                    <Icon size={23} className="text-jade" aria-hidden="true" />
                    <h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">
                      {item.text}
                    </p>
                    <p className="mt-auto border-t border-jade/10 pt-4 text-[10px] font-extrabold leading-5 text-jade">
                      {item.autonomy}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="return"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:p-14">
                <div>
                  <p className="eyebrow !text-saffron-light">Plan the exit before the first drink</p>
                  <h2 className="font-display text-[3.4rem] font-semibold leading-[0.86] tracking-[-0.04em]">
                    The return route is part of the evening.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/70">
                    FCDO warns that drink spiking and drug-assisted assault happen
                    in Thailand, and that unknown alcohol can be dangerous. Keep
                    your drink in sight, do not accept an unsealed substitute and
                    leave when the plan stops feeling like yours.
                  </p>
                  <Link
                    href="/nightlife/"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light"
                  >
                    Open the nightlife owner
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute bottom-8 left-5 top-8 border-l-2 border-dotted border-saffron/55 lg:bottom-auto lg:left-8 lg:right-8 lg:top-1/2 lg:h-0 lg:border-l-0 lg:border-t-2"
                  />
                  <div className="relative grid gap-3 lg:grid-cols-4">
                    {[
                      {
                        label: "Before",
                        title: "Save the main route",
                        text: "Hotel pin, pickup point and a backup that does not depend on the group.",
                      },
                      {
                        label: "During",
                        title: "Keep control",
                        text: "Drink, phone, room access and payment method remain with you.",
                      },
                      {
                        label: "At the first change",
                        title: "Move to staffed space",
                        text: "Use the main exit, venue staff, hotel desk or another public point.",
                      },
                      {
                        label: "Return",
                        title: "Confirm the destination",
                        text: "Check vehicle, route and final drop before the journey begins.",
                      },
                    ].map((item, index) => (
                      <article
                        key={item.title}
                        className="ml-12 rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm lg:ml-0 lg:min-h-[255px]"
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-[10px] font-extrabold text-jade">
                          {index + 1}
                        </span>
                        <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-light">
                          {item.label}
                        </p>
                        <h3 className="mt-2 font-display text-[1.45rem] font-semibold leading-none">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-[10px] font-medium leading-5 text-white/64">
                          {item.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.66fr_1.34fr] lg:items-end">
              <SectionHeading
                eyebrow="When something does happen"
                title={
                  <>
                    Reach help.
                    <br />
                    Preserve your choices.
                  </>
                }
                description="There is no one mandatory response after an incident. Immediate safety and urgent care come first; reporting, evidence, provider, insurer and consular options depend on what happened and what you want."
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { number: "191", label: "Police" },
                  { number: "1155", label: "Tourist Police" },
                  { number: "1669", label: "Ambulance" },
                  { number: "199", label: "Fire" },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="rounded-2xl border border-jade/10 bg-white p-5 text-center shadow-editorial-card"
                  >
                    <strong className="font-display text-[2rem] font-semibold text-jade">
                      {item.number}
                    </strong>
                    <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.1em] text-saffron-dark">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-jade/10 bg-jade/10 lg:grid-cols-5">
              {[
                {
                  icon: Building2,
                  title: "Reach a staffed place",
                  text: "Move to hotel reception, venue staff, a hospital, police point or another public setting when that is possible.",
                },
                {
                  icon: PhoneCall,
                  title: "Get urgent help",
                  text: "Use the appropriate emergency service first when immediate police, medical or fire help is needed.",
                },
                {
                  icon: ShieldCheck,
                  title: "Keep options open",
                  text: "The FCDO support guide explains medical, reporting and consular choices after sexual assault.",
                },
                {
                  icon: MessageCircle,
                  title: "Contact your network",
                  text: "Tell someone you trust, and contact the provider, insurer or consular service that fits the situation.",
                },
                {
                  icon: Check,
                  title: "Document when safe",
                  text: "Keep booking, route, contact and incident details only when doing so does not delay urgent help or increase risk.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className={`${index % 2 ? "bg-mist" : "bg-white"} min-h-[255px] p-6`}
                  >
                    <Icon size={21} className="text-jade" aria-hidden="true" />
                    <h3 className="mt-6 font-display text-[1.45rem] font-semibold leading-none text-jade">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[11px] font-medium leading-6 text-charcoal/68">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
              <SectionHeading
                eyebrow="Optional tools, clearly bounded"
                title={
                  <>
                    Keep information available.
                    <br />
                    Do not buy a safety promise.
                  </>
                }
                description="Connectivity and battery capacity can keep maps, booking references and contact details available. They do not prevent harassment, assault, theft or a bad transport decision."
              />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">
                Skip either option when your existing phone plan and battery
                already cover the journey. Reusing suitable equipment is the
                better recommendation.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade">
                    <Wifi size={21} aria-hidden="true" />
                  </span>
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                    Saily affiliate
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[2.25rem] font-semibold leading-none text-jade">
                  Connectivity before arrival
                </h3>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">
                  Compare device compatibility, coverage, activation, validity
                  and the current plan. Also keep the first hotel address and key
                  numbers offline.
                </p>
                <a
                  href={sailyHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-jade"
                >
                  Check current eSIM options
                  <ExternalLink size={13} className="text-saffron-dark" />
                </a>
              </article>

              <article className="rounded-[26px] bg-jade p-7 text-white shadow-editorial-lift sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/35 text-saffron-light">
                    <BatteryCharging size={21} aria-hidden="true" />
                  </span>
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">
                    Amazon OneLink · optional
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[2.25rem] font-semibold leading-none">
                  One compact power bank
                </h3>
                <p className="mt-5 text-sm font-medium leading-7 text-white/72">
                  Useful only when long transfer days can outlast your phone.
                  Check current capacity, ports, seller, airline rules and carry
                  power banks in cabin baggage. A charged phone is useful; it is
                  not protection.
                </p>
                <a
                  href="/go/anker-powercore-10k/"
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light"
                >
                  Check current price at Amazon
                  <ExternalLink size={13} />
                </a>
              </article>
            </div>
            <AffiliateDisclosure className="mt-4">
              Saily and Amazon links are affiliate links. As an Amazon Associate,
              Go2Thailand earns from qualifying purchases at no extra cost to
              you. OneLink may route eligible visitors to a local Amazon store;
              product, seller, price, delivery and availability vary by country.
              Neither purchase creates or guarantees safety.
            </AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real UK-English search questions"
          title="Direct answers without certainty theatre"
          description="These ten questions appeared in current UK-English People Also Ask results captured across eleven DataForSEO SERPs. Questions about current safety always return to live official advice and the exact route."
          items={faqItems}
        />

        <RelatedGuidesSection
          eyebrow="Let each owner answer one decision"
          title="Complete the route, not the anxiety list"
          readLabel="Open the guide"
          guides={[
            {
              title: "Is Thailand safe?",
              description:
                "Use the broad country owner for current regional advice, roads, sea conditions, scams and emergency preparation.",
              href: "/is-thailand-safe/",
              image: "/images/redesign/thailand-safety-hero.webp",
              imageAlt: "Travellers checking a route beside a Bangkok station",
            },
            {
              title: "First time in Thailand",
              description:
                "Build the wider first-trip sequence around arrival, money, transport, etiquette and route shape.",
              href: "/blog/thailand-first-time-visitors-essential-guide-2026/",
              image: "/images/redesign/first-time-thailand-hero.webp",
              imageAlt: "First-time traveller preparing a Thailand route",
            },
            {
              title: "Scams and pressure",
              description:
                "Recognise closure stories, rushed payments, document deposits and disputed damage without memorising every script.",
              href: "/practical-info/scams-safety/",
              image: "/images/redesign/thailand-safety-emergency-kit.webp",
              imageAlt: "Phone and documents used to verify a Thailand booking",
            },
          ]}
          sideLink={{ label: "Open all travel guides", href: "/travel-guides/" }}
        />

        <SourceMethodSection
          eyebrow="Sources & editorial method"
          title="Community questions, official boundaries"
          description="Three independent DFS keyword clusters, eleven current UK-English SERPs, 87 organic appearances, 50 PAA appearances, four complete competitor parses and exact ranking/backlink checks defined this owner. Community pages helped reveal friction; they were not treated as evidence of safety. Current government and Tourist Police sources set the factual boundaries. Last substantive review: 29 July 2026."
          sources={sources}
        />

        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <div className="flex flex-col gap-6 rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">One clear next move</p>
                <h2 className="font-display text-[2.55rem] font-semibold leading-none text-jade">
                  Start with the arrival—not the whole country.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#chain"
                  className="btn-jade btn-jade-pattern group min-h-12 px-6"
                >
                  Build the six moments
                  <ArrowRight size={15} className="text-saffron" />
                </a>
                <Link
                  href="/city/"
                  className="btn-cream min-h-12 px-6 text-saffron-dark"
                >
                  Compare destinations
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
