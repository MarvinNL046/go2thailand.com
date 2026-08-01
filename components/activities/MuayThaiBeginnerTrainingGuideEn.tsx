import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  Droplets,
  ExternalLink,
  Footprints,
  HeartPulse,
  MapPin,
  Moon,
  PackageCheck,
  Route,
  ShieldCheck,
  Shirt,
  Sparkles,
  Sun,
  ThermometerSun,
  Timer,
  Users,
  WalletCards,
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
  "https://go2-thailand.com/blog/muay-thai-training-camps-thailand-beginners-guide-2026/";
const PAGE_TITLE = "Muay Thai training in Thailand for beginners (2026)";
const PAGE_DESCRIPTION =
  "Choose a first Muay Thai class, training week or camp in Thailand. A beginner-first guide to sessions, locations, costs, gym checks, gear and insurance.";
const HERO_IMAGE = "/images/redesign/muay-thai-beginner-hero.webp";

const navItems: PageSectionNavItem[] = [
  { href: "#format", label: "Choose a format", icon: Route },
  { href: "#first-class", label: "First class", icon: Activity },
  { href: "#rhythm", label: "Training rhythm", icon: CalendarDays },
  { href: "#gym", label: "Choose a gym", icon: BadgeCheck },
  { href: "#packing", label: "What to bring", icon: PackageCheck },
  { href: "#safety", label: "Safety", icon: ShieldCheck },
  { href: "#questions", label: "Questions", icon: CircleHelp },
];

interface TrainingFormat {
  icon: LucideIcon;
  label: string;
  title: string;
  duration: string;
  fit: string;
  gain: string;
  risk: string;
}

const trainingFormats: TrainingFormat[] = [
  {
    icon: Sparkles,
    label: "Test without rebuilding the trip",
    title: "One introduction class",
    duration: "One session · commonly 60–120 min",
    fit: "A first encounter during a normal Thailand itinerary. It tests the coaching style, heat and physical load before you commit.",
    gain: "Lowest commitment and easiest to combine with sightseeing.",
    risk: "A visitor class does not reveal the rhythm of a full camp.",
  },
  {
    icon: CalendarDays,
    label: "Repeat technique and recovery",
    title: "Three to seven days",
    duration: "Start with one session per training day",
    fit: "For beginners who want repetition without turning the whole holiday into a sports camp.",
    gain: "The most flexible balance of coaching, recovery and destination time.",
    risk: "An unlimited pass can tempt you to follow more sessions than you can recover from.",
  },
  {
    icon: Timer,
    label: "Training shapes the itinerary",
    title: "Two weeks or longer",
    duration: "Camp, gym + room, or package",
    fit: "For travellers prepared to organise accommodation, food, laundry and rest around a consistent gym routine.",
    gain: "More feedback and routine than a holiday class.",
    risk: "Do not prepay a long stay before checking level split, hygiene, room, neighbourhood and terms.",
  },
];

const lessonSteps = [
  {
    icon: Users,
    number: "01",
    title: "Say you are new",
    time: "Before class",
    text: "Disclose injuries, relevant health concerns and previous combat-sport experience. Ask which parts involve contact and how to opt out.",
  },
  {
    icon: Footprints,
    number: "02",
    title: "Stance and footwork",
    time: "Build the base",
    text: "A beginner class should establish balance, guard and controlled movement before it rewards power.",
  },
  {
    icon: Activity,
    number: "03",
    title: "Pads or bag work",
    time: "Rounds at your level",
    text: "Simple punches, kicks, knees and defence are built progressively. Pace should follow your technique, not the strongest person present.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Contact needs consent",
    time: "Agree it clearly",
    text: "Sparring is not an entry test. Sumalee says participation is optional; ask what “light” means at this particular gym.",
  },
  {
    icon: Droplets,
    number: "05",
    title: "Cool down and reassess",
    time: "After class",
    text: "Cool down, drink according to your needs and leave space in the day. Sharp, worsening, unstable or neurological symptoms are not a training trophy.",
  },
];

const destinations = [
  {
    city: "Bangkok",
    cue: "City trip + one class",
    text: "Useful for a try-out between city days. Choose by real travel time; traffic can turn a short class into half a day.",
    href: "/city/bangkok/",
    image: "/images/redesign/bangkok-destination-hero.webp",
  },
  {
    city: "Phuket",
    cue: "Large camp choice",
    text: "Strong when training is a main purpose. Compare the gym area with the beach or neighbourhood where you actually want to stay.",
    href: "/city/phuket/",
    image: "/images/redesign/phuket-destination-hero-v2.webp",
  },
  {
    city: "Chiang Mai",
    cue: "Compact training base",
    text: "A practical city-and-training combination. During smoky periods, check current air quality and whether the training space suits you.",
    href: "/city/chiang-mai/",
    image:
      "/images/cities/chiang-mai/redesign/chiang-mai-destination-hero.webp",
  },
  {
    city: "Koh Samui",
    cue: "Camp + island rhythm",
    text: "A bundled stay can simplify logistics, but switching becomes harder if the first days reveal a poor fit.",
    href: "/city/koh-samui/",
    image: "/images/redesign/muay-thai-recovery-route.webp",
  },
];

const weekPlan = [
  {
    day: "Day 1",
    title: "Arrive",
    icon: Moon,
    tone: "rest",
    text: "No hard session after a long flight. Check sleep, gym route, water and required equipment.",
  },
  {
    day: "Day 2",
    title: "Introduction",
    icon: Activity,
    tone: "train",
    text: "Do one session. Ask for stance feedback and decide afterwards whether to book more.",
  },
  {
    day: "Day 3",
    title: "Recover + walk",
    icon: Footprints,
    tone: "rest",
    text: "Move gently, eat normally and note what feels like unfamiliar load versus a concerning symptom.",
  },
  {
    day: "Day 4",
    title: "Repeat technique",
    icon: ShieldCheck,
    tone: "train",
    text: "Repeat the basics. Do not let speed, volume or contact increase without a deliberate choice.",
  },
  {
    day: "Day 5",
    title: "Destination day",
    icon: Sun,
    tone: "rest",
    text: "Explore Thailand. A free day is part of the plan, not a failed training day.",
  },
  {
    day: "Day 6",
    title: "Third session",
    icon: Activity,
    tone: "train",
    text: "A private technique class may be more useful than adding another high-volume group block.",
  },
  {
    day: "Day 7",
    title: "Evaluate",
    icon: BadgeCheck,
    tone: "rest",
    text: "Extend only if energy, sleep and symptoms are stable. Rest or seek appropriate care when they are not.",
  },
];

const gymChecks = [
  {
    icon: Users,
    title: "A real beginner pathway",
    text: "Ask whether complete beginners are separated, how many people one coach watches and which language is used.",
  },
  {
    icon: ShieldCheck,
    title: "Consent around contact",
    text: "Ask when clinch or sparring begins, what protection applies and whether opting out is accepted without pressure.",
  },
  {
    icon: Droplets,
    title: "Hygiene and airflow",
    text: "Inspect mats, shared gloves, cleaning, drinking water and ventilation. Open-air does not automatically mean cool.",
  },
  {
    icon: Clock3,
    title: "A schedule you can use",
    text: "Two daily blocks are an offer, not your prescription. Confirm class length, rest days and drop-in rules.",
  },
  {
    icon: MapPin,
    title: "Distance from your bed",
    text: "Test the route at the actual class time. A cheap room with a long commute can undermine consistency and sleep.",
  },
  {
    icon: WalletCards,
    title: "Transparent terms",
    text: "Separate training, room, meals, gear, private lessons, tax, changes and refunds before comparing packages.",
  },
];

const budgetParts = [
  [
    "Training",
    "Drop-in, day pass, weekly access, private coaching and an all-class package are different products.",
  ],
  [
    "Equipment",
    "Rental can suit one class; fit and hygiene matter more for longer training. Ask before buying.",
  ],
  [
    "Accommodation",
    "A package is convenient; a separate room preserves choice. Compare air-con, laundry, sleep and walking distance.",
  ],
  [
    "Daily rhythm",
    "Food, water, laundry, transport and recovery determine whether the cheapest training rate is truly cheaper.",
  ],
];

const faqs = [
  {
    question: "Can you train Muay Thai in Thailand as a beginner?",
    answer:
      "Yes. Several established gyms publish programmes for people with little or no experience. Look for a real beginner pathway, disclose your level and try one class before committing to a long package. “All levels welcome” alone does not prove suitable group size or coaching.",
  },
  {
    question: "How much does it cost to train Muay Thai in Thailand?",
    answer:
      "It depends on the product and location. As a dated benchmark checked on 26 July 2026, Tiger Muay Thai listed 500 THB for a single drop-in and 1,000 THB for a day pass, excluding 7% VAT and subject to change. Compare training, tax, equipment, room, meals and transport separately.",
  },
  {
    question:
      "How much does it cost to go to Muay Thai training camp in Thailand?",
    answer:
      "A camp total may combine classes, room, meals, airport transfer or private sessions, so headline prices are rarely comparable. Request an itemised current quote for your dates and compare it with a gym-only pass plus independent accommodation.",
  },
  {
    question: "What part of Thailand is best for Muay Thai?",
    answer:
      "There is no universal best region. Bangkok suits a city-based trial class, Phuket has extensive camp choice, Chiang Mai can offer a more compact base, and islands may combine training and accommodation. Choose by gym fit, travel time, air and heat conditions, sleep and non-training plans.",
  },
  {
    question: "Where to stay in Thailand to train Muay Thai?",
    answer:
      "Stay close enough to walk or make a reliable short journey at the real morning and afternoon class times. Confirm noise, air-conditioning, laundry, food and cancellation terms before tying the full stay to one gym.",
  },
  {
    question: "How often should you train Muay Thai as a beginner?",
    answer:
      "A gym timetable is not individual training advice. On a Thailand trip, test one session and leave recovery space before adding volume. Increase only when coaching, sleep, heat response and symptoms support it; seek qualified advice for personal health or training decisions.",
  },
  {
    question: "Is it worth it to train Muay Thai in Thailand?",
    answer:
      "It can be valuable for direct coaching and cultural context when the gym, class format and travel rhythm fit you. It is poor value when a discounted long package locks you into unsuitable coaching, transport or accommodation. A single class is the lowest-risk test.",
  },
  {
    question: "What to bring to Muay Thai training?",
    answer:
      "Bring light sportswear, water, a small towel and clean clothes for afterwards. Ask the gym about hand wraps, glove weight, shin guards and mouthguard before buying. Requirements differ: Tiger currently specifies wraps, 16 oz gloves and shin pads for its own beginner class.",
  },
  {
    question: "Is Muay Thai hard for a beginner?",
    answer:
      "The movements, conditioning and tropical heat can make a first class demanding, but beginner coaching should scale technique and pace. Difficulty is not proof that unsafe contact, ignored symptoms or a twice-daily schedule is appropriate.",
  },
  {
    question: "What are the risks of Muay Thai?",
    answer:
      "Risks include ordinary training strains as well as injury from contact, falls, poor technique, unsuitable intensity, heat and hygiene. Reduce avoidable risk through beginner coaching, consent, suitable protection, rest and stopping for concerning symptoms. No contact sport is risk-free.",
  },
  {
    question: "Does travel insurance cover Muay Thai?",
    answer:
      "Not automatically. Policies may distinguish technique training, contact, sparring and competition or require an activity add-on. Ask the insurer in writing about medical costs, emergency transport and repatriation for exactly what you plan to do.",
  },
  {
    question: "Is 40 too old to train Muay Thai?",
    answer:
      "Age alone does not decide suitability. Current health, training history, recovery and the ability of a coach to scale the class matter more. Discuss relevant conditions or symptoms with an appropriate healthcare professional and tell the trainer before class.",
  },
];

const sources = [
  {
    title: "Beginners Muay Thai Training Program",
    creator: "Tiger Muay Thai",
    url: "https://www.tigermuaythai.com/training/muay-thai-training-program-beginners",
    note: "Primary source for beginner curriculum, schedule, supervised light sparring and required equipment at this gym.",
  },
  {
    title: "Prices & Packages",
    creator: "Tiger Muay Thai",
    url: "https://www.tigermuaythai.com/prices",
    note: "Primary dated benchmark for drop-in, day pass, training packages, VAT and the explicit change warning.",
  },
  {
    title: "Muay Thai Training",
    creator: "Sumalee Boxing Gym",
    url: "https://sumaleeboxinggym.com/muay-thai-training/",
    note: "Primary source for a 90-minute class structure, all-level group rhythm and optional sparring.",
  },
  {
    title: "Foreign travel insurance",
    creator: "UK Foreign, Commonwealth & Development Office",
    url: "https://www.gov.uk/guidance/foreign-travel-insurance",
    note: "Primary government guidance to insure planned sports and activities and check medical and repatriation cover.",
  },
  {
    title: "Heatwave: how to cope in hot weather",
    creator: "NHS",
    url: "https://www.nhs.uk/live-well/seasonal-health/heatwave-how-to-cope-in-hot-weather/",
    note: "Primary health guidance for dehydration, overheating, heat-exhaustion risk and warning signs; last reviewed 12 June 2026.",
  },
  {
    title: "Muay Thai in Thailand for Beginners",
    creator: "Punch It Gym",
    url: "https://punchitgym.com/muay-thai-in-thailand-for-beginners/",
    note: "Competitor/gym source used to test acclimatisation and camp intent. Universal fluid and supplement prescriptions were not adopted.",
  },
];

function createSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: "2026-03-23",
      dateModified: "2026-07-26",
      inLanguage: "en",
      mainEntityOfPage: PAGE_URL,
      author: { "@type": "Organization", name: "Go2Thailand" },
      publisher: { "@type": "Organization", name: "Go2Thailand" },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to prepare for a first Muay Thai class in Thailand",
      totalTime: "PT2H",
      step: lessonSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
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
          name: "Activities",
          item: "https://go2-thailand.com/activities/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Muay Thai training for beginners",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Three ways to train Muay Thai in Thailand as a beginner",
      itemListElement: trainingFormats.map((format, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: format.title,
        description: format.fit,
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

export function MuayThaiBeginnerTrainingGuideEn() {
  const subId = useSubId();
  const introLessonHref = withPlacementSubId(
    KLOOK_GENERIC,
    subId,
    "en-muay-thai-beginner-intro-class",
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
          content="muay thai training thailand beginners, muay thai camp thailand beginners, muay thai training thailand cost, first muay thai class"
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-23" />
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
          eyebrow="From first pad round to training camp"
          title={
            <>
              Train Muay Thai
              <br />
              in Thailand.
            </>
          }
          subtitle="Start with one class. Build the camp afterwards."
          description="A beginner-first guide to class structure, training rhythm, gym choice, current cost checks, equipment, heat and insurance—without pretending twice-daily training is everyone’s goal."
          image={HERO_IMAGE}
          imageAlt="Editorial scene of an adult beginner practising pad work with a Thai coach in an open-air gym"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Activities", href: "/activities/" },
            { label: "Muay Thai for beginners" },
          ]}
          actions={[
            { label: "Choose your format", href: "#format", kind: "primary" },
            {
              label: "See the first class",
              href: "#first-class",
              kind: "secondary",
            },
          ]}
          minHeightClassName="min-h-[900px] lg:min-h-[740px]"
          contentClassName="max-w-[730px]"
          titleClassName="max-w-[760px] text-[3.75rem] leading-[0.84] sm:text-[5rem] lg:text-[5.55rem]"
          subtitleClassName="max-w-[650px] text-[1.62rem] leading-[1] text-saffron-dark sm:text-[2.2rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.76)_50%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.88)_39%,rgba(7,39,34,0.12)_63%,rgba(5,27,24,0.08)_100%)]"
          sideCard={
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[350px] overflow-hidden rounded-2xl border border-white/55 bg-white/[0.91] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">
                  Starter card · July 2026
                </p>
                <Activity size={18} className="text-jade" />
              </div>
              <dl className="grid grid-cols-[105px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">First choice</dt>
                <dd className="font-extrabold text-jade">One introduction</dd>
                <dt className="text-charcoal/46">Opening rhythm</dt>
                <dd className="font-extrabold text-jade">
                  One session at a time
                </dd>
                <dt className="text-charcoal/46">Before travel</dt>
                <dd className="font-extrabold text-saffron-dark">
                  Confirm activity cover
                </dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">
                Travel decision support, not personal medical or training
                advice.
              </p>
            </aside>
          }
        />

        <PageSectionNav items={navItems} />

        <section
          id="format"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="Do not let a package choose the trip"
                title={
                  <>
                    Format first.
                    <br />
                    Gym second.
                  </>
                }
                description={
                  <>
                    Choose how much training you actually want before comparing
                    names. Our separate{" "}
                    <InlineLink href="/best-muay-thai-in-thailand/">
                      Muay Thai comparison
                    </InlineLink>{" "}
                    owns cities, gyms and watching versus training.
                  </>
                }
              />
              <div className="max-w-3xl space-y-4 text-sm font-medium leading-7 text-charcoal/66">
                <p>
                  The first decision is commitment, not Phuket versus Bangkok:
                  one physical introduction, several technique sessions or an
                  itinerary built around camp life.
                </p>
                <p>
                  A timetable with two daily sessions describes capacity, not
                  your safe starting level. Test coaching, heat, group split and
                  travel time before a discount locks the decision.
                </p>
              </div>
            </div>
            <div className="mt-11 grid gap-5 lg:grid-cols-3">
              {trainingFormats.map(
                (
                  { icon: Icon, label, title, duration, fit, gain, risk },
                  index,
                ) => (
                  <article
                    key={title}
                    className={`flex min-h-[430px] flex-col overflow-hidden rounded-[26px] border shadow-editorial-card ${index === 1 ? "border-saffron/35 bg-[#fff3df]" : "border-jade/10 bg-white"}`}
                  >
                    <div className="bg-jade p-6 text-white">
                      <div className="flex items-center justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.07]">
                          <Icon size={22} className="text-saffron-light" />
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">
                          Route 0{index + 1}
                        </span>
                      </div>
                      <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/48">
                        {label}
                      </p>
                      <h3 className="mt-2 font-display text-[2.25rem] font-semibold leading-[0.92]">
                        {title}
                      </h3>
                      <p className="mt-3 text-xs font-bold text-saffron-light">
                        {duration}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-medium leading-6 text-charcoal/66">
                        {fit}
                      </p>
                      <div className="mt-auto space-y-3 pt-6 text-[10px] font-semibold leading-5">
                        <p className="flex gap-2 text-jade">
                          <Check
                            size={15}
                            className="mt-0.5 shrink-0 text-saffron"
                          />
                          {gain}
                        </p>
                        <p className="flex gap-2 text-charcoal/58">
                          <ShieldCheck
                            size={15}
                            className="mt-0.5 shrink-0 text-jade"
                          />
                          {risk}
                        </p>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="first-class"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
              <div className="relative min-h-[560px] overflow-hidden rounded-[30px] shadow-editorial-lift lg:min-h-[680px]">
                <Image
                  src="/images/redesign/muay-thai-first-lesson.webp"
                  alt="Editorial scene of an adult beginner calmly practising pad work with a Thai trainer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                    Editorial scene · no named gym
                  </p>
                  <p className="mt-2 max-w-[440px] font-display text-2xl font-semibold leading-none">
                    A good first class feels technical, not heroic.
                  </p>
                </div>
              </div>
              <div>
                <SectionHeading
                  eyebrow="What the first class can contain"
                  title={
                    <>
                      Five moments.
                      <br />
                      One clear boundary.
                    </>
                  }
                  description="Official beginner programmes describe stance, footwork, basic attacks and defence, pads, bags and conditioning. The order may vary; consent around contact should not."
                />
                <div className="relative mt-8 space-y-3">
                  <div
                    aria-hidden="true"
                    className="absolute bottom-8 left-[21px] top-8 border-l-2 border-dashed border-saffron/45"
                  />
                  {lessonSteps.map(
                    ({ icon: Icon, number, title, time, text }) => (
                      <article
                        key={number}
                        className="relative grid grid-cols-[44px_1fr] gap-4"
                      >
                        <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-saffron/40 bg-canvas text-saffron-dark">
                          <Icon size={18} />
                        </span>
                        <div className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3 className="font-display text-[1.45rem] font-semibold leading-none text-jade">
                              {title}
                            </h3>
                            <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">
                              {time}
                            </span>
                          </div>
                          <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                            {text}
                          </p>
                        </div>
                      </article>
                    ),
                  )}
                </div>
              </div>
            </div>
            <aside className="mt-10 grid gap-6 rounded-[26px] border border-saffron/28 bg-[#fff4df] p-7 lg:grid-cols-[0.42fr_1.58fr] lg:items-center lg:p-9">
              <div>
                <p className="eyebrow">A sentence for the coach</p>
                <p className="font-display text-[2rem] font-semibold leading-[0.95] text-jade">
                  “I am a beginner and I do not want to spar today.”
                </p>
              </div>
              <p className="text-sm font-medium leading-7 text-charcoal/66">
                That is a complete instruction, not an apology. Ask how
                technique, clinch and sparring differ. A gym that mocks or
                ignores the boundary has already answered whether to book more.
              </p>
            </aside>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
              <SectionHeading
                eyebrow="Where do you want to be outside class?"
                title={
                  <>
                    The gym is not
                    <br />
                    the destination
                  </>
                }
                description="This is travel fit, not a ranking. Sleep, food, free days and the actual commute matter as much as a famous ring."
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">
                A celebrated gym ninety minutes from the hotel is rarely your
                best choice. Test the route at the real training hour and choose
                a neighbourhood where eating, laundry and sleeping also work.
              </p>
            </div>
            <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {destinations.map((item, index) => (
                <Link
                  key={item.city}
                  href={item.href}
                  className={`group overflow-hidden rounded-2xl border shadow-editorial-card ${index === 0 ? "border-saffron/28 bg-[#fff5e7]" : "border-jade/10 bg-white"}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.city} as a possible base for a Muay Thai trip`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-jade/75 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                      {item.cue}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-[1.75rem] font-semibold text-jade">
                        {item.city}
                      </h3>
                      <ArrowRight
                        size={15}
                        className="text-saffron transition group-hover:translate-x-1"
                      />
                    </div>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                      {item.text}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="rhythm"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
              <SectionHeading
                eyebrow="Example, not prescription"
                title={
                  <>
                    Seven days
                    <br />
                    without proving anything
                  </>
                }
                description="Established gyms may offer morning and afternoon sessions. A beginner does not have to fill every slot; this first-week rhythm alternates technique and recovery."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {weekPlan.map(
                  ({ day, title, icon: Icon, tone, text }, index) => (
                    <article
                      key={day}
                      className={`rounded-2xl border p-5 shadow-editorial-card ${tone === "train" ? "border-saffron/32 bg-[#fff3df]" : "border-jade/10 bg-white"} ${index === 6 ? "sm:col-span-2" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-jade/10 bg-canvas text-jade">
                          <Icon size={19} />
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                          {day} · {tone}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">
                        {title}
                      </h3>
                      <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                        {text}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
            <div className="mt-10 grid gap-6 border-y border-jade/10 py-8 lg:grid-cols-3">
              {[
                [
                  "Sleep",
                  "Do not put a night bus between training days. New technique lands poorly in an exhausted body.",
                ],
                [
                  "Heat",
                  "An early session may be cooler; open-air still is not the same as cool. Pause and scale down.",
                ],
                [
                  "Recovery",
                  "Massage can feel relaxing, but it is not diagnosis or protection from injury.",
                ],
              ].map(([title, text], index) => (
                <div key={title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-jade text-[10px] font-extrabold text-saffron-light">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-jade">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-label="Training trip and recovery"
          className="section-divider-bottom py-12 lg:py-16"
        >
          <div className="container-custom">
            <div className="relative min-h-[470px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[400px]">
              <Image
                src="/images/redesign/muay-thai-recovery-route.webp"
                alt="Editorial scene of a quiet route from Muay Thai training towards the Thai coast"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,31,27,0.99)_0%,rgba(5,31,27,0.92)_40%,rgba(5,31,27,0.2)_71%,rgba(5,31,27,0.04)_100%)]" />
              <div className="relative z-10 flex min-h-[470px] max-w-[650px] flex-col justify-center p-7 text-white sm:min-h-[400px] sm:p-12">
                <p className="eyebrow !text-saffron-light">
                  Train where the trip can recover
                </p>
                <h2 className="font-display text-[3.25rem] font-semibold leading-[0.87] tracking-[-0.04em]">
                  The rest day belongs to the camp.
                </h2>
                <p className="mt-5 max-w-[560px] text-sm font-medium leading-7 text-white/68">
                  Discipline is not attending every slot. It is planning
                  technique, sleep, food, heat and free days as one system.
                </p>
                <Link
                  href="/blog/thai-massage-guide-types-prices/"
                  className="btn-cream mt-7 w-fit"
                >
                  Plan recovery without miracle claims{" "}
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="gym"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading
                eyebrow="Walk one lap before paying"
                title={
                  <>
                    Six gym checks
                    <br />
                    before a package
                  </>
                }
                description="A famous name, beautiful ring or full schedule does not prove that beginner support fits you. Ask, observe and try."
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {gymChecks.map(({ icon: Icon, title, text }) => (
                  <article
                    key={title}
                    className="flex min-h-[255px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                  >
                    <Icon size={24} strokeWidth={1.45} className="text-jade" />
                    <h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-12 overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="p-7 sm:p-10">
                  <p className="eyebrow !text-saffron-light">
                    Cost without false precision
                  </p>
                  <h2 className="font-display text-[3rem] font-semibold leading-[0.88]">
                    Compare the layers, not one headline.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/63">
                    On 26 July 2026, Tiger listed a 500 THB drop-in and 1,000
                    THB day pass, excluding 7% VAT and subject to change. That
                    is one dated official benchmark—not a Thailand average or
                    affiliate price.
                  </p>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {budgetParts.map(([title, text], index) => (
                    <article key={title} className="bg-jade p-6 sm:p-7">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                        Cost layer 0{index + 1}
                      </span>
                      <h3 className="mt-3 font-display text-[1.65rem] font-semibold">
                        {title}
                      </h3>
                      <p className="mt-3 text-xs font-medium leading-6 text-white/58">
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
          id="packing"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionHeading
                  eyebrow="Pack lightly"
                  title={
                    <>
                      What to bring
                      <br />
                      to the first class
                    </>
                  }
                  description="Do not buy a full fight bag yet. Let the gym specify glove weight, protection and rentals for this particular class."
                />
                <div className="mt-8 divide-y divide-jade/10 border-y border-jade/10">
                  {[
                    [
                      "Light sportswear",
                      "No zips, hard buttons or jewellery. A quick-dry change helps between training and laundry.",
                    ],
                    [
                      "Water + small towel",
                      "Ask whether drinking water is available. Do not share a towel or leave belongings on the training mat.",
                    ],
                    [
                      "Wraps, gloves, shin guards",
                      "Confirm what is required, rented or only sold. Tiger currently requires all three in its beginner class.",
                    ],
                    [
                      "Mouthguard",
                      "Ask whether contact, clinch or sparring is offered and use protection that fits correctly.",
                    ],
                    [
                      "Clean clothes afterwards",
                      "Separate wet gear from the dry layer you wear back to the hotel.",
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
              <aside className="overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="eyebrow !text-saffron-light">
                      A small training-day kit
                    </p>
                    <h2 className="font-display text-[2.65rem] font-semibold leading-[0.9]">
                      Two useful extras. No fake mandatory gear.
                    </h2>
                  </div>
                  <PackageCheck
                    size={28}
                    className="shrink-0 text-saffron-light"
                  />
                </div>
                <p className="mt-5 text-sm font-medium leading-7 text-white/63">
                  These Amazon products only support sweat and laundry. Combat
                  gear stays out until the gym, fit and exact requirement are
                  known.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a
                    href="/go/hovsiyla-quick-dry-shirt/"
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="flex min-h-[220px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45"
                  >
                    <Shirt size={23} className="text-saffron-light" />
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/46">
                      For class
                    </p>
                    <h3 className="mt-2 font-display text-[1.55rem] font-semibold">
                      Quick-dry shirt
                    </h3>
                    <p className="mt-3 text-[11px] font-medium leading-5 text-white/58">
                      A light spare layer. Check material, size, seller and
                      current availability.
                    </p>
                    <span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">
                      Check current price at Amazon{" "}
                      <ExternalLink size={13} className="text-saffron-light" />
                    </span>
                  </a>
                  <a
                    href="/go/rainleaf-travel-towel/"
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="flex min-h-[220px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45"
                  >
                    <Droplets size={23} className="text-saffron-light" />
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/46">
                      After class
                    </p>
                    <h3 className="mt-2 font-display text-[1.55rem] font-semibold">
                      Compact travel towel
                    </h3>
                    <p className="mt-3 text-[11px] font-medium leading-5 text-white/58">
                      A personal towel for sweat or shower; wash it and let it
                      dry fully.
                    </p>
                    <span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">
                      Check current price at Amazon{" "}
                      <ExternalLink size={13} className="text-saffron-light" />
                    </span>
                  </a>
                </div>
                <AffiliateDisclosure className="mt-4 !text-white/55">
                  As an Amazon Associate, we earn from qualifying purchases at
                  no extra cost to you. OneLink may redirect to a local store;
                  product, seller, availability and current price vary by
                  country.
                </AffiliateDisclosure>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="safety"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-[#082f29] text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.73fr_1.27fr]">
                <div className="relative overflow-hidden p-8 sm:p-11">
                  <div
                    aria-hidden="true"
                    className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-saffron/20"
                  />
                  <p className="eyebrow !text-saffron-light">
                    Safety starts before departure
                  </p>
                  <h2 className="relative font-display text-[3.35rem] font-semibold leading-[0.87] tracking-[-0.04em]">
                    Ask the insurer about Muay Thai. In writing.
                  </h2>
                  <p className="relative mt-6 text-sm font-medium leading-7 text-white/64">
                    Worldwide cover does not prove cover for a contact sport.
                    Name recreational technique, clinch, sparring and
                    competition separately and ask about medical transport and
                    repatriation.
                  </p>
                  <Link
                    href="/blog/travel-insurance-thailand-guide/"
                    className="btn-cream relative mt-7 w-fit"
                  >
                    Open the Thailand insurance guide{" "}
                    <ArrowRight size={15} className="text-saffron" />
                  </Link>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Activity",
                      text: "Describe exactly which forms of training and contact you may do.",
                    },
                    {
                      icon: HeartPulse,
                      title: "Medical costs",
                      text: "Ask about public/private care, limits, excess and pre-existing conditions.",
                    },
                    {
                      icon: Route,
                      title: "Help + repatriation",
                      text: "Know whom to call first and whether emergency transport and return are covered.",
                    },
                    {
                      icon: BadgeCheck,
                      title: "Keep evidence",
                      text: "Store the written answer, policy, emergency number and gym details offline.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <article key={title} className="bg-[#082f29] p-7 sm:p-8">
                      <Icon size={23} className="text-saffron-light" />
                      <h3 className="mt-5 font-display text-[1.65rem] font-semibold">
                        {title}
                      </h3>
                      <p className="mt-3 text-xs font-medium leading-6 text-white/58">
                        {text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: ThermometerSun,
                  title: "Stop for heat symptoms",
                  text: "Dizziness, nausea, confusion or inability to cool down are not badges of honour. Stop and seek appropriate help.",
                },
                {
                  icon: Activity,
                  title: "Do not normalise every pain",
                  text: "Sharp, worsening, unstable or neurological symptoms deserve assessment rather than another round.",
                },
                {
                  icon: Moon,
                  title: "Recovery is not treatment",
                  text: "Sleep, food and gentle movement may support recovery; massage or ice does not replace diagnosis.",
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
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Book only after the checks"
                title={
                  <>
                    Find one class.
                    <br />
                    Verify four things.
                  </>
                }
                description="A marketplace can surface options; it cannot prove beginner fit. Open the concrete listing and read provider, exact location, level and included equipment."
              />
              <ul className="mt-7 space-y-3 text-xs font-semibold text-jade">
                {[
                  "Does it explicitly welcome complete beginners?",
                  "Is it a group class, private class, show or combination?",
                  "Which protection is included, rented or required?",
                  "What are the change, cancellation and contact conditions?",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check size={16} className="mt-0.5 shrink-0 text-saffron" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-[28px] border border-saffron/28 bg-[#fff3df] p-7 shadow-editorial-card sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">
                    Klook · option finder
                  </p>
                  <h2 className="mt-3 font-display text-[2.65rem] font-semibold leading-[0.9] text-jade">
                    Compare an introduction, not a promise.
                  </h2>
                </div>
                <ExternalLink size={22} className="shrink-0 text-jade" />
              </div>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">
                This opens a general affiliate destination, not a verified gym
                deep link. Search Muay Thai and check provider, city, duration,
                language, equipment, current price and terms.
              </p>
              <a
                href={introLessonHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="btn-jade btn-jade-pattern group mt-7 w-fit"
              >
                Check current Muay Thai class options{" "}
                <ArrowRight
                  size={15}
                  className="text-saffron transition group-hover:translate-x-1"
                />
              </a>
              <AffiliateDisclosure className="mt-4">
                Affiliate link. We may earn commission without increasing your
                price. Availability, current price and conditions can change.
              </AffiliateDisclosure>
            </aside>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real questions from the English search results"
          title="Muay Thai beginner questions answered"
          description="These answers support a decision and preparation; they do not replace personal coaching, medical assessment or written insurance confirmation."
          items={faqs}
        />
        <RelatedGuidesSection
          eyebrow="Build the rest of the active trip"
          title="Train, recover and plan further"
          guides={[
            {
              title: "Compare Muay Thai options",
              description:
                "Compare places, gyms and watching versus training without duplicating this beginner owner.",
              href: "/best-muay-thai-in-thailand/",
              image:
                "/images/blog/muay-thai-in-thailand-where-to-watch-and-where-to-train.webp",
            },
            {
              title: "Thailand travel insurance",
              description:
                "Check activities, medical costs, emergency help and repatriation.",
              href: "/blog/travel-insurance-thailand-guide/",
              image: "/images/blog/travel-insurance-thailand-guide.webp",
            },
            {
              title: "Choose a Thai massage",
              description:
                "Understand styles, caution flags and the limits of recovery claims.",
              href: "/blog/thai-massage-guide-types-prices/",
              image: "/images/redesign/thai-massage-hero.webp",
            },
          ]}
        />
        <SourceMethodSection
          title="Schedules and prices are snapshots"
          description="Independent English DFS research covered beginner, camp, cost, location, accommodation, equipment, frequency, safety and insurance intent across 12 live SERPs. Five market pages and primary gym sources were parsed in full. NHS and FCDO guidance carries heat and insurance safeguards. Fixed conversions, universal hydration or supplement prescriptions, rankings, guaranteed safety and unverifiable certifications were excluded. Last checked: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
