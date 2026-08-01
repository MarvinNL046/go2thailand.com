import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Backpack,
  BadgeCheck,
  CircleHelp,
  Clock3,
  Droplets,
  ExternalLink,
  Eye,
  MapPin,
  Route,
  Ruler,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  Ticket,
  TrainFront,
  Umbrella,
  Users,
  Waves,
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

const PAGE_URL =
  "https://go2-thailand.com/blog/harbor-island-bangkok-rooftop-waterpark-2026/";
const PAGE_TITLE = "Harbor Island Bangkapi: route, tickets & family guide";
const PAGE_DESCRIPTION =
  "Plan Harbor Island at The Mall Lifestore Bangkapi without booking the wrong branch. Compare its seven zones, route, family fit, hours and packing list.";
const HERO_IMAGE = "/images/redesign/harbor-island-bangkapi-hero.webp";

const navItems: PageSectionNavItem[] = [
  { href: "#branch", label: "Right branch", icon: Store },
  { href: "#zones", label: "Seven zones", icon: Waves },
  { href: "#family", label: "With children", icon: Users },
  { href: "#route", label: "Getting there", icon: Route },
  { href: "#tickets", label: "Tickets & hours", icon: Ticket },
  { href: "#packing", label: "What to bring", icon: Backpack },
  { href: "#questions", label: "Questions", icon: CircleHelp },
];

interface BranchChoice {
  icon: LucideIcon;
  label: string;
  title: string;
  place: string;
  identity: string;
  chooseWhen: string;
  warning: string;
}
const branches: BranchChoice[] = [
  {
    icon: Waves,
    label: "This guide",
    title: "Harbor Island Bangkapi",
    place: "The Mall Lifestore Bangkapi · floor 3",
    identity:
      "A rooftop water park of more than 10,000 m² with seven wet and dry zones, 18 slides in Super Island, a roughly 200-metre lazy river and Sky Rider.",
    chooseWhen:
      "Choose it for the water park beside the MRT Yellow Line and a multi-hour family session.",
    warning: "Every booking should explicitly say Bangkapi and Harbor Island.",
  },
  {
    icon: Sparkles,
    label: "Separate water park",
    title: "Harbor Island Bangkae",
    place: "The Mall Lifestore Bangkae · floor 3",
    identity:
      "A newer branch that opened on 6 March 2026 with more than 11,000 m², nine zones, a wave pool and different headline rides.",
    chooseWhen:
      "Choose it when western Bangkok suits your hotel or the wave pool is a priority.",
    warning:
      "Bangkae has a different route, zone plan and potentially different conditions.",
  },
  {
    icon: Store,
    label: "Different product",
    title: "HarborLand indoor",
    place: "Several Bangkok branches",
    identity:
      "The same group’s dry indoor playground product: play structures, ball pits and active zones rather than an automatic water-park admission.",
    chooseWhen:
      "Choose it for an air-conditioned dry play session or weather fallback.",
    warning:
      "A HarborLand search result is not necessarily a Harbor Island ticket.",
  },
];

const zones = [
  {
    number: "01",
    title: "Super Island",
    kind: "Big water action",
    text: "The Aqua Tower has 18 slides according to HarborLand. Access still depends on the rules displayed for each ride.",
  },
  {
    number: "02",
    title: "Little Island",
    kind: "Gentler splashing",
    text: "A spray-park option for younger children and families who do not need the largest slides.",
  },
  {
    number: "03",
    title: "Lazy Island",
    kind: "Float and reset",
    text: "A route of about 200 metres with water effects—a change of pace, never a substitute for active supervision.",
  },
  {
    number: "04",
    title: "Jungle Island",
    kind: "Dry movement",
    text: "Outdoor obstacles and play give non-swimmers and tired children a different kind of activity.",
  },
  {
    number: "05",
    title: "Sky Rider",
    kind: "Height and thrill",
    text: "A roughly 100-metre rail experience about 8 metres above ground. Check current height, weight and health rules.",
  },
  {
    number: "06",
    title: "Toys Island",
    kind: "Water discovery",
    text: "A development-led water-play zone. The park’s “age 2+” positioning does not grant access to every feature.",
  },
  {
    number: "07",
    title: "Art Island",
    kind: "Creative reset",
    text: "Craft and DIY activities create a dry pause without requiring the family to leave the complex.",
  },
];

const familyChecks = [
  {
    icon: Users,
    title: "Age is only the first filter",
    text: "HarborLand positions the park for ages 2 and up. That does not mean every child can use every slide or Sky Rider.",
  },
  {
    icon: Ruler,
    title: "Check before queueing",
    text: "Ask which height, weight, supervision and health requirements apply to each attraction on your visit.",
  },
  {
    icon: Eye,
    title: "Agree one meeting point",
    text: "Assign an adult to each child and choose a recognisable dry return point before everyone spreads across seven zones.",
  },
  {
    icon: ShieldCheck,
    title: "Water confidence still matters",
    text: "A wristband or published safety standard never replaces close supervision and an honest view of swimming ability.",
  },
];

const routeSteps = [
  {
    icon: TrainFront,
    number: "01",
    title: "Take the MRT Yellow Line",
    text: "Travel to Bang Kapi Station. Lat Phrao connects with the Blue Line; Hua Mak can connect with the Airport Rail Link.",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Use Exit 3",
    text: "The Mall Group identifies Exit 3 for the skywalk. Check station signs because temporary walking routes can change.",
  },
  {
    icon: Route,
    number: "03",
    title: "Follow the skywalk to M",
    text: "The covered link reaches the mall’s M floor without requiring you to cross busy Lat Phrao Road.",
  },
  {
    icon: Store,
    number: "04",
    title: "Continue to floor 3",
    text: "Inside the mall, follow current signs to Harbor Island and reconfirm branch, session and ride rules at the desk.",
  },
];

const ticketChecks = [
  [
    "Branch",
    "Does the product say Bangkapi rather than Bangkae or another HarborLand branch?",
  ],
  [
    "Product",
    "Is it Harbor Island water park, HarborLand indoor or a clearly defined combination?",
  ],
  [
    "Guest type",
    "Which category applies to each child, playing adult, non-playing adult and senior?",
  ],
  [
    "Session",
    "A 2026 official promotion used a six-hour session; confirm the current product and entry slot.",
  ],
  [
    "Included",
    "Recheck towels, lockers, changing facilities, flotation aids and other gear.",
  ],
  [
    "Changes",
    "Read date, re-entry, no-show, cancellation, weather and temporary ride-closure terms before paying.",
  ],
];

const faqs = [
  {
    question: "Where is the Harbor Island in Bangkok?",
    answer:
      "This guide covers Harbor Island on floor 3 of The Mall Lifestore Bangkapi, 3522 Lat Phrao Road. Take the MRT Yellow Line to Bang Kapi, use Exit 3 and the skywalk to the mall’s M floor, then follow internal signs to floor 3.",
  },
  {
    question: "What is HarborLand Bangkok?",
    answer:
      "HarborLand is the group’s dry indoor-playground product. Harbor Island is its water-park product. Similar branding means you must verify both the product and branch before buying.",
  },
  {
    question: "How much is the ticket for HarborLand Bangkok?",
    answer:
      "There is no single Bangkok price: the group operates different branches, products, guest categories and promotions. Open the official page for the exact branch and check the current total for your whole group.",
  },
  {
    question: "How much does it cost to enter HarborLand Bangkapi?",
    answer:
      "Do not rely on an old fixed-price table. First establish whether you mean Harbor Island water park or HarborLand indoor, then check the live official offer, session, adult category and any extras before payment.",
  },
  {
    question: "What time does the mall Bangkapi open?",
    answer:
      "Mall and attraction hours are not interchangeable. In our 26 July 2026 check, Harbor Island’s English page listed 10:30–20:00 on weekdays and 10:00–20:00 at weekends. Recheck the venue on the day, including last admission.",
  },
  {
    question: "What is the largest rooftop waterpark in Bangkok?",
    answer:
      "Harbor Island Bangkapi markets itself as a very large rooftop water park, but the group opened a larger Bangkae branch in 2026. Treat “largest” as a changing marketing claim and choose by location, zones and rules.",
  },
  {
    question: "Is Harbor Land Bangkok worth visiting?",
    answer:
      "It can be worthwhile for families who want several hours of managed play, but confirm which product you are considering. Bangkapi Harbor Island suits water-focused days near the Yellow Line; HarborLand indoor is a different experience.",
  },
  {
    question: "Is Harbour Land Bangkok safe for toddlers?",
    answer:
      "The operator positions its venues for families, but safety depends on the exact zone, current restrictions and close adult supervision. A venue-wide age label is not permission for every attraction.",
  },
  {
    question: "Is HarborLand suitable for toddlers?",
    answer:
      "Some gentler and creative zones may suit toddlers, while large slides and elevated attractions may not. Ask staff about the child’s height, age and swimming ability before choosing a zone.",
  },
  {
    question: "Where to go in Bangkok with children?",
    answer:
      "Harbor Island Bangkapi is one option for a water-focused half day. Balance it against indoor attractions, parks, markets and shorter activities based on weather, location and each child’s energy.",
  },
  {
    question: "Which is the best waterpark in Bangkok?",
    answer:
      "There is no universal winner. Compare travel time, age and height rules, indoor versus outdoor balance and the rides your family can actually use. Bangkapi is especially practical when the Yellow Line fits your route.",
  },
  {
    question: "What is the biggest waterpark in Thailand?",
    answer:
      "That superlative changes and depends on whether area, ride count or another measure is used. It is not a reliable reason to cross Bangkok; use current branch facts and family fit instead.",
  },
];

const sources = [
  {
    title: "Harbor Island The Mall Lifestore Bangkapi",
    creator: "HarborLand Group",
    url: "https://harborlandgroup.com/harbor-island-the-mall-lifestore-bangkapi/",
    note: "Primary source for the branch, seven zones, location, features, age positioning and English hours.",
  },
  {
    title: "Harbor Island Bangkapi — Thai",
    creator: "HarborLand Group",
    url: "https://harborlandgroup.com/harbor-island-the-mall-lifestore-bangkapi-th/",
    note: "Official local-language page retained as a same-day cross-check for changing operational details.",
  },
  {
    title: "Harbor Island Bangkae opening",
    creator: "HarborLand Group",
    url: "https://harborlandgroup.com/open-now-harbor-island-the-mall-lifestore-bangkae/",
    note: "Primary source distinguishing the newer Bangkae water park and its nine-zone plan.",
  },
  {
    title: "Public transport to The Mall Lifestore Bangkapi",
    creator: "The Mall Group",
    url: "https://www.facebook.com/themallgroup/posts/818336273672061/",
    note: "Official mall channel for Bang Kapi Station, Exit 3 and the skywalk to the M floor.",
  },
  {
    title: "Harbor Island & HarborLand guide",
    creator: "The Smart Local",
    url: "https://thesmartlocal.com/read/harborland-waterpark-bangkok/",
    note: "Secondary source used to test product confusion and visitor flow, not as a live price source.",
  },
];

function schemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: "2026-03-22",
      dateModified: "2026-07-26",
      inLanguage: "en",
      mainEntityOfPage: PAGE_URL,
      author: { "@type": "Organization", name: "Go2Thailand" },
      publisher: { "@type": "Organization", name: "Go2Thailand" },
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: "Harbor Island The Mall Lifestore Bangkapi",
      url: PAGE_URL,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "The Mall Lifestore Bangkapi, 3522 Lat Phrao Road, floor 3",
        addressLocality: "Bangkok",
        postalCode: "10240",
        addressCountry: "TH",
      },
      touristType: [
        "Families",
        "Travellers with children",
        "Water-park visitors",
      ],
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
          name: "Harbor Island Bangkapi",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to reach Harbor Island Bangkapi by MRT Yellow Line",
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
      name: "The seven zones at Harbor Island Bangkapi",
      itemListElement: zones.map((zone, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: zone.title,
        description: zone.text,
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

export function HarborIslandBangkapiGuideEn() {
  const subId = useSubId();
  const klookHref = withPlacementSubId(
    KLOOK_GENERIC,
    subId,
    "en-harbor-island-bangkapi-alternatives",
  );
  const structuredData = schemas();
  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        ogImage={`https://go2-thailand.com${HERO_IMAGE}`}
      >
        <meta
          name="keywords"
          content="harbor island bangkok, harbor island bangkapi, harbor island bangkok tickets, bangkok water park kids"
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-22" />
        <meta property="article:modified_time" content="2026-07-26" />
        {structuredData.map((schema, index) => (
          <script
            key={`${schema["@type"]}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>
      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Rooftop water park on the Yellow Line"
          title={
            <>
              Harbor Island
              <br />
              Bangkapi.
            </>
          }
          subtitle="Choose the branch before the ticket."
          description="Bangkapi, Bangkae and HarborLand indoor look similar in search results, yet create three different days. This guide identifies the product first, then plans zones, route and family fit."
          image={HERO_IMAGE}
          imageAlt="Editorial venue-neutral rooftop water-park scene above Bangkok with a family on the right"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Bangkok", href: "/city/bangkok/" },
            { label: "Harbor Island Bangkapi" },
          ]}
          actions={[
            { label: "Check the branch", href: "#branch", kind: "primary" },
            {
              label: "Plan the Yellow Line",
              href: "#route",
              kind: "secondary",
            },
          ]}
          minHeightClassName="min-h-[880px] lg:min-h-[735px]"
          contentClassName="max-w-[720px]"
          titleClassName="max-w-[730px] text-[3.8rem] leading-[0.84] sm:text-[5rem] lg:text-[5.6rem]"
          subtitleClassName="max-w-[630px] text-[1.65rem] leading-[1] text-saffron-dark sm:text-[2.25rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.76)_50%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.88)_39%,rgba(7,39,34,0.1)_63%,rgba(5,27,24,0.05)_100%)]"
          sideCard={
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[350px] overflow-hidden rounded-2xl border border-white/55 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">
                  Branch passport · July 2026
                </p>
                <Waves size={19} className="text-jade" />
              </div>
              <dl className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Product</dt>
                <dd className="font-extrabold text-jade">
                  Harbor Island water park
                </dd>
                <dt className="text-charcoal/46">Branch</dt>
                <dd className="font-extrabold text-jade">
                  The Mall Bangkapi · 3F
                </dd>
                <dt className="text-charcoal/46">Layout</dt>
                <dd className="font-extrabold text-jade">7 wet + dry zones</dd>
                <dt className="text-charcoal/46">Before paying</dt>
                <dd className="font-extrabold text-saffron-dark">
                  Check current session
                </dd>
              </dl>
            </aside>
          }
        />
        <PageSectionNav items={navItems} />

        <section
          id="branch"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="The name is the first trap"
                title={
                  <>
                    Three products.
                    <br />
                    Three different days.
                  </>
                }
                description="Harbor Island means water park; HarborLand means dry indoor playground. Since 2026, Bangkok also has two separate Harbor Island branches."
              />
              <div className="max-w-3xl space-y-4 text-sm font-medium leading-7 text-charcoal/66">
                <p>
                  This owner is specifically about{" "}
                  <strong className="text-jade">Bangkapi</strong>: floor 3 of
                  The Mall Lifestore Bangkapi, beside the MRT Yellow Line, with
                  seven official zones.
                </p>
                <p>
                  Never book from the words “Harbor” and “Bangkok” alone. Read
                  the complete product name, branch, guest type and session.
                </p>
              </div>
            </div>
            <div className="mt-11 grid gap-5 lg:grid-cols-3">
              {branches.map(
                (
                  {
                    icon: Icon,
                    label,
                    title,
                    place,
                    identity,
                    chooseWhen,
                    warning,
                  },
                  index,
                ) => (
                  <article
                    key={title}
                    className={`flex min-h-[470px] flex-col overflow-hidden rounded-[26px] border shadow-editorial-card ${index === 0 ? "border-saffron/38 bg-[#fff3df]" : "border-jade/10 bg-white"}`}
                  >
                    <div className="bg-jade p-6 text-white">
                      <div className="flex items-center justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.07]">
                          <Icon size={22} className="text-saffron-light" />
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                          {label}
                        </span>
                      </div>
                      <h3 className="mt-7 font-display text-[2.2rem] font-semibold leading-[0.92]">
                        {title}
                      </h3>
                      <p className="mt-3 text-[10px] font-bold leading-5 text-white/58">
                        {place}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-medium leading-6 text-charcoal/64">
                        {identity}
                      </p>
                      <p className="mt-5 border-l-2 border-saffron/55 pl-4 text-xs font-semibold leading-6 text-jade">
                        {chooseWhen}
                      </p>
                      <p className="mt-auto flex gap-2 pt-6 text-[10px] font-bold leading-5 text-charcoal/58">
                        <ShieldCheck
                          size={15}
                          className="mt-0.5 shrink-0 text-saffron"
                        />
                        {warning}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
            <aside className="mt-8 border-y border-jade/10 py-7 lg:flex lg:items-start lg:justify-between lg:gap-12">
              <div className="flex items-center gap-3 text-jade">
                <BadgeCheck size={21} />
                <p className="font-display text-2xl font-semibold">
                  A superlative is not a route plan
                </p>
              </div>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-charcoal/64 lg:mt-0">
                Bangkapi still uses a “largest” claim, while the same operator
                opened a larger 11,000+ m² Bangkae branch in 2026. Choose by
                journey and usable zones, not a changing record.
              </p>
            </aside>
          </div>
        </section>

        <section
          id="zones"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
            <div className="relative min-h-[560px] overflow-hidden rounded-[30px] shadow-editorial-lift lg:min-h-[700px]">
              <Image
                src="/images/redesign/harbor-island-family-zones.webp"
                alt="Editorial venue-neutral family splash zone beside a dry creative activity"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jade/78 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 max-w-[520px] font-display text-2xl font-semibold leading-none text-white">
                The best zone is the one that fits this moment in the family
                day.
              </p>
            </div>
            <div>
              <SectionHeading
                eyebrow="Seven zones, not seven obligations"
                title={
                  <>
                    Build the route
                    <br />
                    around energy
                  </>
                }
                description="Pick one action anchor, one gentler water moment and one dry reset. That is more realistic than racing through every attraction."
              />
              <div className="relative mt-8 space-y-3">
                <div
                  aria-hidden="true"
                  className="absolute bottom-7 left-[18px] top-7 border-l-2 border-dashed border-saffron/50"
                />
                {zones.map((zone) => (
                  <article
                    key={zone.number}
                    className="relative grid grid-cols-[38px_1fr] gap-4"
                  >
                    <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-saffron/45 bg-canvas text-[10px] font-extrabold text-saffron-dark">
                      {zone.number}
                    </span>
                    <div className="rounded-2xl border border-jade/10 bg-white p-4 shadow-editorial-card">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-display text-[1.35rem] font-semibold leading-none text-jade">
                          {zone.title}
                        </h3>
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">
                          {zone.kind}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/62">
                        {zone.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="family"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading
                eyebrow="Age 2+ is not all-access"
                title={
                  <>
                    Four checks before
                    <br />
                    the first queue
                  </>
                }
                description="Venue-wide positioning tells you who may visit. Each attraction still decides through ride rules, swimming ability and supervision."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {familyChecks.map(({ icon: Icon, title, text }, index) => (
                  <article
                    key={title}
                    className={`min-h-[250px] rounded-2xl border p-6 shadow-editorial-card ${index === 0 ? "border-saffron/34 bg-[#fff3df]" : "border-jade/10 bg-white"}`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon size={24} className="text-jade" />
                      <span className="text-[9px] font-extrabold text-saffron-dark">
                        CHECK 0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-5 overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift lg:grid-cols-[0.65fr_1.35fr] lg:p-10">
              <div>
                <p className="eyebrow !text-saffron-light">
                  A 30-second family agreement
                </p>
                <h2 className="font-display text-[2.75rem] font-semibold leading-[0.9]">
                  Who watches? Where do we meet? When do we pause?
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [
                    "Who",
                    "Assign one active adult to each child. “Everyone is watching” is not a task.",
                  ],
                  [
                    "Where",
                    "Choose one recognisable dry return point before the family splits up.",
                  ],
                  [
                    "When",
                    "Schedule water, toilet, shade and sunscreen before tiredness becomes obvious.",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/14 bg-white/[0.06] p-5"
                  >
                    <h3 className="font-display text-[1.55rem] font-semibold text-saffron-light">
                      {title}
                    </h3>
                    <p className="mt-3 text-[11px] font-medium leading-5 text-white/60">
                      {text}
                    </p>
                  </div>
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
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="A taxi is not required"
                title={
                  <>
                    Yellow Line.
                    <br />
                    Exit 3. Floor 3.
                  </>
                }
                description={
                  <>
                    Use our broader{" "}
                    <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">
                      Bangkok public-transport guide
                    </InlineLink>{" "}
                    for the interchange. The local route starts at Bang Kapi
                    Station.
                  </>
                }
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">
                “Connected” does not mean beside the platform. Follow Exit 3,
                the skywalk to M and the internal mall route to floor 3. With
                children, allow for toilets, lifts and the admission desk.
              </p>
            </div>
            <div className="relative mt-12 grid gap-5 lg:grid-cols-4">
              <div
                aria-hidden="true"
                className="absolute left-[8%] right-[8%] top-7 hidden border-t-2 border-dashed border-saffron/45 lg:block"
              />
              {routeSteps.map(({ icon: Icon, number, title, text }) => (
                <article
                  key={number}
                  className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                >
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-saffron/40 bg-canvas text-jade">
                    <Icon size={22} />
                  </span>
                  <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                    Step {number}
                  </p>
                  <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">
                    {title}
                  </h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/63">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-label="Harbor Island weather plan"
          className="section-divider-bottom py-12 lg:py-16"
        >
          <div className="container-custom">
            <div className="relative min-h-[480px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[410px]">
              <Image
                src="/images/redesign/harbor-island-weather-route.webp"
                alt="Editorial venue-neutral rooftop water park between tropical rain and clearing sun"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,31,27,0.99)_0%,rgba(5,31,27,0.91)_40%,rgba(5,31,27,0.16)_72%,rgba(5,31,27,0.03)_100%)]" />
              <div className="relative z-10 flex min-h-[480px] max-w-[680px] flex-col justify-center p-7 text-white sm:min-h-[410px] sm:p-12">
                <p className="eyebrow !text-saffron-light">Plan A / Plan B</p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.87] tracking-[-0.04em]">
                  An open mall does not prove every slide is open.
                </h2>
                <p className="mt-5 max-w-[590px] text-sm font-medium leading-7 text-white/68">
                  Use shade and sunscreen breaks in sun; dry zones or the mall
                  during a shower. Thunder or operational changes belong to the
                  venue’s safety call, so check on the day before crossing
                  Bangkok.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/city/bangkok/weather/" className="btn-cream">
                    Check Bangkok weather{" "}
                    <ArrowRight size={15} className="text-saffron" />
                  </Link>
                  <Link
                    href="/city/bangkok/attractions/"
                    className="inline-flex min-h-12 items-center gap-2 px-4 text-xs font-extrabold text-white"
                  >
                    Compare indoor alternatives{" "}
                    <ArrowRight size={14} className="text-saffron-light" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="tickets"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading
                eyebrow="Price follows product"
                title={
                  <>
                    Six checks on
                    <br />
                    every ticket screen
                  </>
                }
                description="Old price tables expire quickly. Compare the family total only after branch, product and guest category are correct."
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {ticketChecks.map(([title, text], index) => (
                  <article
                    key={title}
                    className="min-h-[210px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                  >
                    <div className="flex items-center justify-between">
                      <Ticket size={21} className="text-jade" />
                      <span className="text-[9px] font-extrabold text-saffron-dark">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-5 overflow-hidden rounded-[28px] border border-saffron/28 bg-[#fff3df] p-7 shadow-editorial-card lg:grid-cols-[0.72fr_1.28fr] lg:p-10">
              <div>
                <p className="eyebrow">Checked · 26 July 2026</p>
                <h2 className="font-display text-[2.8rem] font-semibold leading-[0.9] text-jade">
                  Hours are a same-day check, not a promise.
                </h2>
              </div>
              <div>
                <div className="rounded-2xl border border-jade/10 bg-white p-5">
                  <Clock3 size={20} className="text-jade" />
                  <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                    Official English page
                  </p>
                  <p className="mt-2 text-sm font-extrabold text-jade">
                    Weekdays 10:30–20:00
                    <br />
                    Weekends 10:00–20:00
                  </p>
                </div>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/63">
                  Promotions, localised pages, last entry and individual rides
                  can differ. Recheck the official branch page or venue channel
                  on your visit day.
                </p>
              </div>
            </div>
            <aside className="mt-8 grid gap-6 rounded-[26px] bg-jade p-7 text-white shadow-editorial-lift lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:p-9">
              <div>
                <p className="eyebrow !text-saffron-light">
                  Alternatives via Klook
                </p>
                <h2 className="font-display text-[2.65rem] font-semibold leading-[0.9]">
                  Compare only after reading the complete product name.
                </h2>
              </div>
              <div>
                <p className="text-sm font-medium leading-7 text-white/64">
                  This opens a general Klook destination, not a confirmed Harbor
                  Island deep link. Search Bangkok water parks and identify the
                  branch and product yourself.
                </p>
                <a
                  href={klookHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="btn-cream mt-6 w-fit"
                >
                  Check current Bangkok water-park options{" "}
                  <ExternalLink size={14} className="text-saffron" />
                </a>
                <AffiliateDisclosure className="mt-4 !text-white/54">
                  Affiliate link. Go2Thailand may earn commission without
                  increasing your price. Price, availability, branch, entry and
                  conditions can change.
                </AffiliateDisclosure>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="packing"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <SectionHeading
                  eyebrow="One bag, two environments"
                  title={
                    <>
                      Pack for water
                      <br />
                      and the mall
                    </>
                  }
                  description="Keep wet and dry items apart. Confirm what your current ticket actually provides rather than trusting an old article."
                />
                <div className="mt-8 divide-y divide-jade/10 border-y border-jade/10">
                  {[
                    [
                      "Suitable swimwear",
                      "Avoid hard metal details and ask about current slide rules when unsure.",
                    ],
                    [
                      "Dry layer + simple shoes",
                      "Keep mall clothing away from wet gear; use footwear only where the venue permits it.",
                    ],
                    [
                      "Sun protection",
                      "Several zones are outdoors. Follow the product instructions and plan shade and reapplication.",
                    ],
                    [
                      "Water + family identifier",
                      "Agree a return point and place a contact detail on younger children.",
                    ],
                    [
                      "Phone away on rides",
                      "Use approved storage and put the phone down whenever it weakens supervision or ride safety.",
                    ],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="grid gap-2 py-5 sm:grid-cols-[190px_1fr]"
                    >
                      <p className="text-sm font-extrabold text-jade">
                        {title}
                      </p>
                      <p className="text-xs font-medium leading-6 text-charcoal/62">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <aside className="overflow-hidden rounded-[28px] bg-[#082f29] p-7 text-white shadow-editorial-lift sm:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="eyebrow !text-saffron-light">
                      A functional water-park kit
                    </p>
                    <h2 className="font-display text-[2.75rem] font-semibold leading-[0.9]">
                      Two products with a clear job.
                    </h2>
                  </div>
                  <Backpack size={28} className="shrink-0 text-saffron-light" />
                </div>
                <p className="mt-5 text-sm font-medium leading-7 text-white/62">
                  No ride gear or toys without a venue check. These Amazon
                  routes only support sun protection and separating wet clothes.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a
                    href="/go/neutrogena-beach-defense-spf70/"
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="flex min-h-[230px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45"
                  >
                    <Sun size={23} className="text-saffron-light" />
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">
                      For outdoor zones
                    </p>
                    <h3 className="mt-2 font-display text-[1.55rem] font-semibold">
                      Water-resistant SPF
                    </h3>
                    <p className="mt-3 text-[11px] font-medium leading-5 text-white/58">
                      Check skin suitability, ingredients, directions and
                      seller. Water resistance does not remove the need to
                      reapply.
                    </p>
                    <span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">
                      Check current price at Amazon{" "}
                      <ExternalLink size={13} className="text-saffron-light" />
                    </span>
                  </a>
                  <a
                    href="/go/earth-pak-dry-bag/"
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="flex min-h-[230px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45"
                  >
                    <Droplets size={23} className="text-saffron-light" />
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">
                      For the journey back
                    </p>
                    <h3 className="mt-2 font-display text-[1.55rem] font-semibold">
                      Dry bag for wet clothes
                    </h3>
                    <p className="mt-3 text-[11px] font-medium leading-5 text-white/58">
                      Use it to separate wet items in your day bag; do not
                      assume it can be carried onto a ride.
                    </p>
                    <span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">
                      Check current price at Amazon{" "}
                      <ExternalLink size={13} className="text-saffron-light" />
                    </span>
                  </a>
                </div>
                <AffiliateDisclosure className="mt-4 !text-white/54">
                  As an Amazon Associate, we earn from qualifying purchases at
                  no extra cost to you. OneLink may redirect to a local store;
                  product, seller, availability and current price vary by
                  country.
                </AffiliateDisclosure>
              </aside>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Umbrella,
                  title: "Shower",
                  text: "Use the designated dry zone or mall route and wait for operational instructions.",
                },
                {
                  icon: ShieldCheck,
                  title: "Ride limit",
                  text: "Accept every current height, weight, health and supervision limit, even after queueing.",
                },
                {
                  icon: Droplets,
                  title: "Afterwards",
                  text: "Dry off, change, eat and drink before the train ride. Water-park days need transition time.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                >
                  <Icon size={22} className="text-jade" />
                  <h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">
                    {title}
                  </h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real questions found in the search results"
          title="Harbor Island questions answered"
          description="Names, branches, hours and conditions change. These answers make the choice auditable but never replace a same-day venue check."
          items={faqs}
        />
        <RelatedGuidesSection
          eyebrow="Plan the rest of the family day"
          title="Bangkok before and after the water park"
          guides={[
            {
              title: "Thailand with children",
              description:
                "Balance heat, food and rest days across different ages.",
              href: "/blog/thailand-with-kids-family-travel-guide/",
              image: "/images/blog/thailand-with-kids-family-travel-guide.webp",
            },
            {
              title: "Bangkok public transport",
              description: "Choose the right interchange onto the Yellow Line.",
              href: "/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/",
              image:
                "/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp",
            },
            {
              title: "Bangkok attractions",
              description:
                "Compare indoor, temple, market and family alternatives.",
              href: "/city/bangkok/attractions/",
              image:
                "/images/cities/bangkok/redesign/bangkok-attractions-hero.webp",
            },
          ]}
        />
        <SourceMethodSection
          title="The branch name matters more than a review score"
          description="Independent English DFS research covered brand, branch, ticket, price, opening-hour, child, route, safety and review intent. Official HarborLand sources carry the venue facts; The Mall Group carries Exit 3 and the skywalk. Three parsed competitors were used only to test ambiguity and user flow. Fixed affiliate prices, uncertain inclusions and timeless largest claims were removed. Last checked: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
