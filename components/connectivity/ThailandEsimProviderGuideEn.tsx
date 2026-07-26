import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  ExternalLink,
  Gauge,
  Globe2,
  MapPin,
  MessageCircle,
  PhoneCall,
  Plane,
  RadioTower,
  Router,
  Settings,
  ShieldCheck,
  Signal,
  Smartphone,
  Wifi,
  WifiOff,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SAILY_GENERIC, withPlacementSubId } from "../../lib/affiliates";
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

const PAGE_URL = "https://go2-thailand.com/esim/";
const HERO_IMAGE = "/images/redesign/thailand-esim-provider-hero.webp";
const AIRALO_AFFILIATE = "https://airalo.tp.st/r8TriO5V";
const YESIM_AFFILIATE = "https://yesim.tp.st/i9QU4Xm6";
const AFFILIATE_REL = "noopener noreferrer nofollow sponsored";

type Provider = {
  name: string;
  label: string;
  bestFor: string;
  summary: string;
  strengths: string[];
  verify: string[];
  link: string;
  accent: string;
};

const providers: Provider[] = [
  {
    name: "Airalo",
    label: "Broad marketplace",
    bestFor:
      "Travellers who want several Thailand plan shapes in one established marketplace.",
    summary:
      "Airalo lists multiple Thailand products rather than one universal plan. Some are data-only, while selected products can include calls and texts. The live product card—not the Airalo brand name—defines what you receive.",
    strengths: [
      "Multiple fixed-data and unlimited plan shapes",
      "Large help centre and in-app plan management",
      "Selected Thailand products can include calls and texts",
    ],
    verify: [
      "Whether your exact product is data-only",
      "Activation policy and supported network",
      "Hotspot, top-up and fair-use conditions",
    ],
    link: AIRALO_AFFILIATE,
    accent: "bg-[#eef5f3]",
  },
  {
    name: "Yesim",
    label: "Flexible plan menu",
    bestFor:
      "Travellers comparing fixed data, unlimited data or a pay-as-you-use route.",
    summary:
      "Yesim combines country plans with its wider Pay & Fly option. Its current Thailand page says the displayed country plan is data-only, keeps your existing WhatsApp number usable and makes hotspot availability operator-dependent.",
    strengths: [
      "Fixed-data and unlimited Thailand options",
      "Pay & Fly for a less predictable multi-country trip",
      "24/7 support and one-click installation are advertised",
    ],
    verify: [
      "The current activation deadline",
      "Hotspot availability for the selected operator",
      "Daily throttling and refund conditions",
    ],
    link: YESIM_AFFILIATE,
    accent: "bg-[#fff7ec]",
  },
  {
    name: "Saily",
    label: "App-led setup",
    bestFor:
      "Travellers who value a simple app flow and optional security features.",
    summary:
      "Saily offers fixed-data and unlimited Thailand plans. It also now offers an optional US phone number with separate call and text plans, so “Saily is always data-only” is no longer accurate. That is not the same as receiving a Thai local number.",
    strengths: [
      "Fixed-data and unlimited Thailand plans",
      "App security features and data-use tools",
      "Optional US number is available as a separate product",
    ],
    verify: [
      "Live activation window and validity trigger",
      "Unlimited-plan fair-use terms",
      "Whether the separate phone-number product fits your destination",
    ],
    link: SAILY_GENERIC,
    accent: "bg-[#f1f4ff]",
  },
];

const comparisonRows = [
  [
    "Plan shapes",
    "Fixed data, unlimited and product-specific variants",
    "Fixed data, unlimited and Pay & Fly",
    "Fixed data and unlimited",
  ],
  [
    "Calls & number",
    "Some products include calls/texts; many are data-only",
    "Displayed Thailand country plan is data-only; virtual numbers are separate",
    "Optional US number and call/text plans are separate products",
  ],
  [
    "WhatsApp",
    "Keep your existing account number when using the eSIM for data",
    "Official page says your existing WhatsApp number can stay in use",
    "WhatsApp works over data; do not change the account number at setup",
  ],
  [
    "Hotspot",
    "Check the exact product card",
    "Depends on the operator shown for the plan",
    "Available on current Thailand information; recheck the selected plan",
  ],
  [
    "Activation",
    "Product-specific; read the activation policy before installation",
    "Validity starts on compatible-network connection; purchase activation window applies",
    "Can activate automatically on arrival when the line and roaming are enabled",
  ],
  [
    "Best decision signal",
    "Exact product inclusions",
    "Plan type plus operator conditions",
    "Activation, fair-use and optional-number fit",
  ],
];

const faqs = [
  {
    question: "Is it worth getting an eSIM for Thailand?",
    answer:
      "It can be worth it when your unlocked phone supports eSIM and you mainly need mobile data immediately after landing. A Thai SIM can be a better fit when you need a Thai number, in-person setup help or a local carrier product. Compare the connection type before comparing brands.",
  },
  {
    question: "Which eSIM is best for Thailand tourists?",
    answer:
      "There is no provider that is best for every tourist. Start with device compatibility, trip length, countries visited, data use, hotspot needs and whether you need calls or a number. Then compare the live Airalo, Yesim and Saily product cards against those requirements.",
  },
  {
    question: "Can I still use my WhatsApp with an eSIM?",
    answer:
      "Yes. WhatsApp can continue using the number already registered to your account while a travel eSIM supplies mobile data. Do not choose “change number” in WhatsApp just because you installed a second line. Keep access to your home number if account verification may be required.",
  },
  {
    question: "How much data on an eSIM do I need for two weeks in Thailand?",
    answer:
      "Check your current per-app mobile-data use first. Maps, messaging and occasional browsing need far less than daily video, cloud uploads or hotspot work. Download offline maps, use trusted hotel Wi-Fi and add a buffer rather than buying an “unlimited” label without reading its speed policy.",
  },
  {
    question: "Should I buy eSIM before traveling to Thailand?",
    answer:
      "Usually, yes: buying and installing while you have reliable Wi-Fi gives you time to solve compatibility or QR-code problems. Activation timing is different from installation timing, so follow the selected provider’s instructions and record when validity begins.",
  },
  {
    question: "Is there a downside to an eSIM?",
    answer:
      "Your phone must support eSIM and be carrier-unlocked. Moving the profile to another device can be harder than moving a physical SIM, many travel plans are data-only, and deleting a profile too early can make recovery difficult. Keep the installation email and provider support details offline.",
  },
  {
    question: "Which eSIM is best for Thailand unlimited data?",
    answer:
      "The most suitable unlimited plan is the one whose full-speed allowance, speed after throttling, reset time, hotspot policy and validity match your use. Airalo, Yesim and Saily can show unlimited Thailand options, but the live fair-use terms matter more than the word “unlimited”.",
  },
  {
    question: "What happens if I activate my eSIM too early?",
    answer:
      "Some plans begin validity at installation or activation; others begin only when the eSIM connects to a supported network in Thailand. Activating too early can therefore shorten the usable period on certain products. Read the activation policy before switching the line on.",
  },
  {
    question: "Is Airalo good for eSIM in Thailand?",
    answer:
      "Airalo is a credible option to compare, especially if you value a broad product menu and extensive help documentation. Suitability still depends on the exact Thailand product, because inclusions, activation, hotspot and calls can differ between listings.",
  },
  {
    question: "Which is better, Airalo or Saily?",
    answer:
      "Airalo is stronger as a broad marketplace with multiple product types; Saily is more app-led and includes optional security tools. Neither difference proves better coverage on your route. Compare the exact plan, supported network, activation, fair-use terms and support before choosing.",
  },
];

const navItems: PageSectionNavItem[] = [
  { href: "#choose", label: "Choose", icon: Smartphone },
  { href: "#providers", label: "Providers", icon: Globe2 },
  { href: "#compare", label: "Compare", icon: Signal },
  { href: "#data", label: "Data", icon: Gauge },
  { href: "#install", label: "Install", icon: Settings },
  { href: "#fix", label: "Fix", icon: Router },
  { href: "#questions", label: "FAQs", icon: CircleHelp },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best eSIM for Thailand: Airalo vs Yesim vs Saily",
    description:
      "An independent Thailand eSIM provider comparison based on live plan terms, activation, hotspot use, numbers and fair-use policies—not temporary prices.",
    image: `https://go2-thailand.com${HERO_IMAGE}`,
    datePublished: "2026-03-25",
    dateModified: "2026-07-26",
    inLanguage: "en",
    mainEntityOfPage: PAGE_URL,
    author: {
      "@type": "Organization",
      name: "Go2 Thailand Editorial Team",
      url: "https://go2-thailand.com/about/",
    },
    publisher: {
      "@type": "Organization",
      name: "Go2 Thailand",
      url: "https://go2-thailand.com/",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://go2-thailand.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Travel Guides",
        item: "https://go2-thailand.com/travel-guides/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Thailand eSIM comparison",
        item: PAGE_URL,
      },
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
    "@type": "ItemList",
    name: "Thailand eSIM providers compared",
    itemListElement: providers.map((provider, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: provider.name,
      description: provider.bestFor,
    })),
  },
];

export function ThailandEsimProviderGuideEn() {
  const subId = useSubId();
  const trackedProviders = providers.map((provider) => ({
    ...provider,
    trackedLink: withPlacementSubId(
      provider.link,
      subId,
      `thailand-esim-${provider.name.toLowerCase()}`,
    ),
  }));

  return (
    <>
      <SEOHead
        title="Best eSIM for Thailand: Airalo vs Yesim vs Saily (2026)"
        description="Compare Airalo, Yesim and Saily for Thailand by plan type, activation, hotspot, calls and fair-use terms. No stale sample prices or invented winner."
        ogImage={HERO_IMAGE}
      >
        <meta
          name="keywords"
          content="best esim for thailand, thailand esim, airalo thailand, saily thailand esim, yesim thailand, unlimited esim thailand"
        />
        {schemas.map((schema) => (
          <script
            key={schema["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Traveller checking an eSIM on a smartphone beside Bangkok's Chao Phraya River"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Travel guides", href: "/travel-guides/" },
            { label: "eSIM comparison" },
          ]}
          eyebrow="Choose the plan, not the loudest badge"
          title={
            <>
              Best eSIM
              <br />
              for Thailand.
            </>
          }
          subtitle={<>Airalo, Yesim or Saily?</>}
          description={
            <>
              A provider comparison built around the live contract: plan shape,
              activation, hotspot, phone number and fair-use terms. Prices stay
              on the provider page, where they can remain current.
            </>
          }
          actions={[
            {
              label: "Compare the providers",
              href: "#providers",
              kind: "primary",
            },
            {
              label: "eSIM or Thai SIM?",
              href: "/travel-guides/sim-card-thailand/",
              kind: "secondary",
            },
          ]}
          minHeightClassName="min-h-[790px] lg:min-h-[720px]"
          contentClassName="max-w-[720px]"
          titleClassName="max-w-[690px] text-[4.1rem] leading-[0.84] sm:text-[5.2rem] lg:text-[6rem]"
          subtitleClassName="max-w-[620px] text-[2rem] leading-[0.95] text-saffron-dark sm:text-[2.7rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.14)_0%,rgba(252,250,246,0.64)_44%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.95)_42%,rgba(252,250,246,0.3)_66%,rgba(9,47,39,0.07)_100%)]"
          sideCard={
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[330px] overflow-hidden rounded-2xl border border-white/70 bg-white/84 shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">
                  Before any provider
                </p>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-canvas text-jade">
                  <Smartphone size={17} />
                </span>
              </div>
              <div className="space-y-3 px-5 py-5 text-[11px] font-bold leading-5 text-jade">
                {[
                  "Exact phone supports eSIM",
                  "Phone is carrier-unlocked",
                  "You know whether you need a number",
                  "You have read the activation trigger",
                ].map((item) => (
                  <p key={item} className="flex gap-3">
                    <Check size={15} className="mt-0.5 shrink-0 text-saffron" />
                    {item}
                  </p>
                ))}
              </div>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/60">
                A cheap plan that does not fit your device or starts too early
                is not good value.
              </p>
            </aside>
          }
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section
          id="choose"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Protect the search intent"
                title="This page compares providers."
                description={
                  <>
                    If you are still choosing between a travel eSIM, a Thai SIM
                    and home roaming, start with our{" "}
                    <Link
                      href="/travel-guides/sim-card-thailand/"
                      className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4"
                    >
                      Thailand SIM and eSIM guide
                    </Link>
                    . Return here once a travel eSIM fits your trip.
                  </>
                }
              />
              <div
                className="relative mt-8 hidden h-24 max-w-[320px] lg:block"
                aria-hidden="true"
              >
                <Smartphone
                  size={29}
                  strokeWidth={1.45}
                  className="absolute left-0 top-0 text-jade"
                />
                <div className="absolute left-10 top-5 h-10 w-[70%] rounded-[50%] border-b-2 border-dashed border-saffron/75" />
                <MapPin
                  size={29}
                  strokeWidth={1.45}
                  className="absolute right-4 top-10 text-saffron"
                />
                <span className="absolute left-[52%] top-[50px] h-2 w-2 rounded-full bg-saffron" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Smartphone,
                  title: "1. Check the exact device",
                  text: "The model—not just the brand—must support eSIM. It also needs to be carrier-unlocked.",
                },
                {
                  icon: PhoneCall,
                  title: "2. Decide about a number",
                  text: "Data-only is enough for maps and WhatsApp. Local calls, reservations or long stays can change the answer.",
                },
                {
                  icon: Gauge,
                  title: "3. Map real data use",
                  text: "Use your phone settings as evidence. Video, cloud backups and hotspot work change the plan size fastest.",
                },
                {
                  icon: Globe2,
                  title: "4. Count every country",
                  text: "A Thailand plan can beat a regional plan for one country; a regional profile can reduce switching on a longer route.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-[22px] border border-jade/10 bg-white p-6 shadow-editorial-card"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-tonal text-jade">
                    <Icon size={20} strokeWidth={1.55} />
                  </span>
                  <h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-none text-jade">
                    {title}
                  </h2>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="providers"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="No universal winner"
              title="Three providers, three decision routes."
              description="We do not award a provider first place without a route, device and live product. These cards show where each menu starts to make sense—and what still needs checking."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {trackedProviders.map((provider, index) => (
                <article
                  key={provider.name}
                  className={`flex h-full flex-col overflow-hidden rounded-[26px] border border-jade/10 bg-white shadow-editorial-card ${index === 1 ? "lg:-translate-y-3" : ""}`}
                >
                  <div
                    className={`${provider.accent} border-b border-jade/10 p-7`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">
                          {provider.label}
                        </p>
                        <h2 className="mt-2 font-display text-[2.6rem] font-semibold leading-none text-jade">
                          {provider.name}
                        </h2>
                      </div>
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-jade/10 bg-white/70 text-jade">
                        <RadioTower size={20} strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className="mt-5 text-xs font-extrabold leading-5 text-jade">
                      Best fit: {provider.bestFor}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-sm font-medium leading-7 text-charcoal/70">
                      {provider.summary}
                    </p>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div>
                        <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-jade">
                          Useful strengths
                        </p>
                        <ul className="mt-3 space-y-2 text-[11px] font-medium leading-5 text-charcoal/70">
                          {provider.strengths.map((item) => (
                            <li key={item} className="flex gap-2">
                              <Check
                                size={13}
                                className="mt-0.5 shrink-0 text-saffron"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-jade">
                          Verify live
                        </p>
                        <ul className="mt-3 space-y-2 text-[11px] font-medium leading-5 text-charcoal/70">
                          {provider.verify.map((item) => (
                            <li key={item} className="flex gap-2">
                              <AlertTriangle
                                size={13}
                                className="mt-0.5 shrink-0 text-saffron-dark"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <a
                      href={provider.trackedLink}
                      target="_blank"
                      rel={AFFILIATE_REL}
                      aria-label={`Check the current price of ${provider.name} Thailand eSIM plans`}
                      className="btn-jade btn-jade-pattern group mt-7 w-full justify-center"
                    >
                      Check current price at {provider.name}
                      <ExternalLink size={15} className="text-saffron" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <AffiliateDisclosure className="mx-auto mt-5 max-w-[920px] text-center">
              Affiliate disclosure: we may earn commission if you buy through
              one of these provider links, at no extra cost to you. Placement
              and commission do not determine the comparison. Prices, promotions
              and plan terms remain the provider’s live information.
            </AffiliateDisclosure>
          </div>
        </section>

        <section
          id="compare"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading
                eyebrow="Compare the contract"
                title="The logo cannot answer these questions."
                description="Use the same criteria for every live plan. A provider can have an excellent product for one trip and a poor fit for another."
              />
              <div className="rounded-2xl border border-saffron/25 bg-[#fff8ec] p-6">
                <p className="flex items-start gap-3 text-sm font-extrabold leading-6 text-jade">
                  <BadgeCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-saffron-dark"
                  />
                  Editorial rule: we show comparison criteria, not temporary
                  sample prices. Every purchase button asks you to check the
                  current price at the provider.
                </p>
              </div>
            </div>
            <div className="mt-9 overflow-x-auto rounded-[24px] border border-jade/10 bg-white shadow-editorial-card">
              <table className="w-full min-w-[960px] border-collapse text-left">
                <caption className="sr-only">
                  Airalo, Yesim and Saily Thailand eSIM comparison
                </caption>
                <thead className="bg-jade text-white">
                  <tr>
                    {["Decision point", "Airalo", "Yesim", "Saily"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-5 text-xs font-extrabold"
                        >
                          {header}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-jade/10">
                  {comparisonRows.map(([feature, airalo, yesim, saily]) => (
                    <tr key={feature} className="align-top">
                      <th className="bg-tonal/70 px-6 py-5 text-xs font-extrabold text-jade">
                        {feature}
                      </th>
                      {[airalo, yesim, saily].map((value, index) => (
                        <td
                          key={`${feature}-${index}`}
                          className="px-6 py-5 text-xs font-medium leading-6 text-charcoal/70"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[10px] font-medium leading-5 text-charcoal/55">
              On mobile, swipe the table horizontally. Provider products change
              faster than an editorial page; confirm every marked condition on
              the live checkout card.
            </p>
          </div>
        </section>

        <section
          id="data"
          className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-24"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-white/5 p-8 lg:p-10">
              <div
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-dashed border-saffron/40"
                aria-hidden="true"
              />
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-saffron">
                Unlimited is a contract word
              </p>
              <h2 className="mt-3 max-w-[560px] font-display text-[3.4rem] font-semibold leading-[0.9] tracking-[-0.04em]">
                Read past the infinity symbol.
              </h2>
              <p className="mt-6 max-w-[620px] text-sm font-medium leading-7 text-white/72">
                An unlimited plan can still reduce speed after a daily
                allowance, limit hotspot use or reset at a specific time. Record
                the full-speed allowance, throttled speed, reset moment and
                tethering policy before paying.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Full-speed allowance",
                  "Speed after the cap",
                  "Daily reset time",
                  "Hotspot and video rules",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-xs font-extrabold"
                  >
                    <Check size={15} className="text-saffron" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-saffron">
                Estimate from your behaviour
              </p>
              <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em]">
                How much data for Thailand?
              </h2>
              <div className="mt-7 grid gap-4">
                {[
                  {
                    icon: MessageCircle,
                    title: "Maps, chat and bookings",
                    text: "Download offline maps, switch off app updates and use trusted Wi-Fi for large downloads.",
                  },
                  {
                    icon: Globe2,
                    title: "Social media and daily photos",
                    text: "Background uploads and short video can use more data than navigation. Set photo backup to Wi-Fi.",
                  },
                  {
                    icon: Wifi,
                    title: "Work, video and hotspot",
                    text: "Check hotspot terms first and treat video calls, cloud sync and laptop updates as heavy-use activities.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <article
                    key={title}
                    className="flex gap-4 rounded-2xl border border-white/13 bg-white/[0.055] p-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-saffron/25 text-saffron">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.45rem] font-semibold leading-none">
                        {title}
                      </h3>
                      <p className="mt-2 text-xs font-medium leading-5 text-white/65">
                        {text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="install"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Install at home, activate on evidence"
                  title="Landing should be a switch, not a setup session."
                  description="Menu names differ by phone and provider. The safe logic stays the same: install on reliable Wi-Fi, label both lines, keep the home line from using data and activate according to the selected product’s trigger."
                />
                <div className="mt-7 rounded-2xl border border-jade/10 bg-tonal p-5 text-xs font-medium leading-6 text-charcoal/68">
                  <strong className="text-jade">Keep offline:</strong>{" "}
                  installation email, QR code or manual code, provider support
                  link, hotel address and first transfer voucher. Never make
                  mobile data your only route to the trip.
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
                <div className="relative h-[310px] sm:h-[390px]">
                  <Image
                    src="/images/redesign/esim-thailand-setup.webp"
                    alt="Hands configuring an eSIM on a smartphone before travelling to Thailand"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid gap-px bg-jade/10 sm:grid-cols-4">
                  {[
                    ["1", "Install on Wi-Fi"],
                    ["2", "Label both lines"],
                    ["3", "Select eSIM for data"],
                    ["4", "Test after arrival"],
                  ].map(([number, label]) => (
                    <div key={number} className="bg-white p-5">
                      <span className="text-[10px] font-extrabold text-saffron-dark">
                        STEP {number}
                      </span>
                      <p className="mt-2 text-xs font-extrabold text-jade">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="fix"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading
              eyebrow="Do not delete first"
              title="No data after landing? Check in order."
              description="Deleting an eSIM can turn a simple setting error into a replacement problem. Work through the line, data and network settings before contacting support."
            />
            <ol className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Smartphone,
                  title: "Turn the travel line on",
                  text: "Confirm the installed eSIM is enabled and the plan is active under provider instructions.",
                },
                {
                  icon: Signal,
                  title: "Select it for mobile data",
                  text: "Your phone can keep the home line for calls while the Thailand line supplies data.",
                },
                {
                  icon: WifiOff,
                  title: "Switch Wi-Fi off for the test",
                  text: "Load a fresh webpage and map over cellular data, not cached airport Wi-Fi.",
                },
                {
                  icon: Settings,
                  title: "Check roaming and APN",
                  text: "Travel eSIMs often need roaming enabled on that line. Use only the provider’s APN instructions.",
                },
                {
                  icon: Plane,
                  title: "Toggle airplane mode",
                  text: "Wait briefly, then reconnect. Restart the phone if the network profile still does not register.",
                },
                {
                  icon: ShieldCheck,
                  title: "Contact provider support",
                  text: "Send screenshots, device model, location and order details. Do not publish the QR code.",
                },
              ].map(({ icon: Icon, title, text }, index) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-[22px] border border-jade/10 bg-white p-6 shadow-editorial-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-tonal text-jade">
                    <Icon size={19} />
                  </span>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                      Check {index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-[1.45rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/65">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="p-8 lg:p-10">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-saffron">
                  One last live check
                </p>
                <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">
                  Choose with the plan card open.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/70">
                  Compare the same five fields in separate tabs: validity
                  trigger, high-speed data, speed after any cap, hotspot and
                  calls/number. Then use the current price—not a screenshot from
                  an old article—as the final tie-breaker.
                </p>
              </div>
              <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                {trackedProviders.map((provider) => (
                  <a
                    key={provider.name}
                    href={provider.trackedLink}
                    target="_blank"
                    rel={AFFILIATE_REL}
                    className="group flex min-h-[220px] flex-col justify-between bg-white/[0.045] p-7 transition hover:bg-white/[0.09]"
                  >
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron">
                        Live provider page
                      </p>
                      <h3 className="mt-3 font-display text-[2.1rem] font-semibold">
                        {provider.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-extrabold">
                      Check current price{" "}
                      <ArrowRight
                        size={15}
                        className="text-saffron transition group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real search questions"
          title="Thailand eSIM FAQs"
          description="These questions come from the current English search results. Answers separate stable setup logic from provider terms that must be checked live."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Avoid search overlap"
          title="Continue with the right owner guide"
          readLabel="Open the guide"
          guides={[
            {
              title: "eSIM or Thai SIM?",
              description:
                "Compare a travel eSIM, local SIM and home roaming before choosing a provider.",
              href: "/travel-guides/sim-card-thailand/",
              image: "/images/redesign/esim-thailand-choice.webp",
              imageAlt:
                "Visual comparison of mobile connection options for Thailand",
            },
            {
              title: "7-Eleven Thailand",
              description:
                "Use the convenience-store guide for food, drinks and practical stops—not as a guaranteed SIM counter.",
              href: "/travel-guides/7-eleven-thailand/",
              image: "/images/redesign/seven-eleven-thailand-food.webp",
              imageAlt: "Convenience-store food and drinks in Thailand",
            },
            {
              title: "First time in Thailand",
              description:
                "Plan the first 48 hours, documents, money, transport and arrival routine.",
              href: "/thailand-for-first-timers/",
              image: "/images/redesign/first-time-thailand-hero.webp",
              imageAlt: "First-time traveller planning a Thailand trip",
            },
          ]}
        />

        <SourceMethodSection
          eyebrow="Verified, not guessed"
          title="Sources & editorial method"
          description="Reviewed on 26 July 2026 using official provider and Apple documentation, current English DataForSEO keyword clusters, English SERPs, competitor formats and verbatim People Also Ask questions. Provider claims are attributed; temporary prices are deliberately kept off-page."
          sources={[
            {
              title: "Thailand eSIM listings and product details",
              creator: "Airalo",
              url: "https://www.airalo.com/thailand-esim/",
              note: "Used for product-shape, inclusion and plan-specific verification guidance.",
            },
            {
              title: "Thailand eSIM plans and technical details",
              creator: "Yesim",
              url: "https://yesim.app/country/thailand/",
              note: "Used for plan type, validity trigger, hotspot, WhatsApp and support claims.",
            },
            {
              title: "Thailand eSIM plans and setup information",
              creator: "Saily",
              url: "https://saily.com/esim-thailand/",
              note: "Used for plan shapes, activation, hotspot and current product scope.",
            },
            {
              title: "Travel eSIM and Dual SIM guidance",
              creator: "Apple Support",
              url: "https://support.apple.com/en-ie/118227",
              note: "Used for supported-device, dual-line and travel-data setup logic on iPhone.",
            },
          ]}
        />
      </div>
    </>
  );
}
