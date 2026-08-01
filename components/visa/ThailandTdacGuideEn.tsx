import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Baby,
  CalendarDays,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  Hotel,
  MailCheck,
  Plane,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Ship,
  Smartphone,
  Users,
  WifiOff,
} from "lucide-react";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";
import {
  TRIP_GENERIC,
  TWELVEGO_GENERIC,
  withPlacementSubId,
} from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";

const OFFICIAL_TDAC = "https://tdac.immigration.go.th/";
const PAGE_URL = "https://go2-thailand.com/visa/digital-arrival-card/";

const sectionNav = [
  { href: "#answer" as const, label: "Short answer", icon: ShieldCheck },
  { href: "#when" as const, label: "When", icon: CalendarDays },
  { href: "#steps" as const, label: "Steps", icon: Smartphone },
  { href: "#details" as const, label: "Prepare", icon: FileCheck2 },
  { href: "#changes" as const, label: "Fix a mistake", icon: RefreshCw },
  { href: "#questions" as const, label: "FAQs", icon: CircleAlert },
];

const quickFacts = [
  {
    icon: ShieldCheck,
    label: "Official cost",
    value: "No fee",
    text: "Submit on the Thailand Immigration Bureau domain, not a paid lookalike.",
  },
  {
    icon: CalendarDays,
    label: "Submission window",
    value: "Within 3 days",
    text: "The official FAQ includes your arrival date in that window.",
  },
  {
    icon: RefreshCw,
    label: "Validity",
    value: "One entry",
    text: "Submit a new TDAC for every new arrival in Thailand.",
  },
  {
    icon: Clock3,
    label: "Official estimate",
    value: "About 3–5 min",
    text: "That estimate assumes your passport, journey and first address are ready.",
  },
];

const formSteps = [
  {
    icon: ScanLine,
    label: "01 · Identity",
    title: "Passport details",
    text: "Enter details in English and manually verify every field retrieved from the MRZ.",
  },
  {
    icon: Plane,
    label: "02 · Journey",
    title: "Arrival details",
    text: "Use the Thai arrival date, mode of travel and flight or vehicle number.",
  },
  {
    icon: Hotel,
    label: "03 · First stay",
    title: "Address in Thailand",
    text: "Prepare the accommodation type, province, district and address you will use first.",
  },
  {
    icon: ShieldCheck,
    label: "04 · Health",
    title: "Answer what appears",
    text: "Prompts can depend on your recent countries, boarding point and current health rules.",
  },
  {
    icon: MailCheck,
    label: "05 · Proof",
    title: "Review and download",
    text: "Check the preview, submit and keep the TDAC document with QR code available offline.",
  },
];

const checklistItems = [
  "Passport and name exactly as printed",
  "Thai arrival date and flight or vehicle number",
  "Country or territory where you boarded",
  "First accommodation address in Thailand",
  "Countries visited during the previous two weeks",
  "Working email address for the document and QR code",
];

const situations = [
  {
    icon: Baby,
    label: "Children",
    title: "Every traveller needs a record",
    text: "The official FAQ includes infants and children. A parent may submit on their behalf.",
  },
  {
    icon: Users,
    label: "Family or group",
    title: "Up to 10 in one submission",
    text: "The group route can reuse shared journey and accommodation information.",
  },
  {
    icon: Ship,
    label: "Air, land or sea",
    title: "The mode does not remove the rule",
    text: "Non-Thai travellers entering through immigration submit before arrival.",
  },
  {
    icon: WifiOff,
    label: "Airside transit",
    title: "No immigration, no TDAC",
    text: "The official FAQ says it is not required if you remain in transit and do not pass immigration.",
  },
];

const faqItems = [
  {
    question: "Is it necessary to fill a Thailand Digital Arrival Card?",
    answer:
      "Yes for non-Thai nationals who enter Thailand and pass immigration by air, land or sea. The official exceptions include crew and travellers who remain in transit without passing immigration. The TDAC is an arrival form, not a visa or permission to stay.",
  },
  {
    question: "How do I get a digital arrival card for Thailand?",
    answer:
      "Use only tdac.immigration.go.th. Choose Arrival Card, enter your passport, personal, journey, first-accommodation and any requested health information, review the preview, submit and download the document with QR code.",
  },
  {
    question: "How many days before we can fill TDAC Thailand?",
    answer:
      "The Immigration Bureau says to submit within three days before arrival, including the arrival date. The calculator on this page turns that rule into three calendar dates using the Thai arrival date on your itinerary.",
  },
  {
    question: "Does it cost to get a Thailand Digital Arrival Card?",
    answer:
      "The official Thailand Immigration Bureau submission requires no fee. Commercial assistance websites may charge for a service you do not need. Check that the address ends in immigration.go.th before entering passport data.",
  },
  {
    question: "Which is the official TDAC website for Thailand?",
    answer:
      "The official address is tdac.immigration.go.th. Open it directly or through an official immigration or government source; avoid search advertisements and lookalike domains that ask for payment.",
  },
  {
    question: "Do children need a Thailand arrival card?",
    answer:
      "Yes. The official FAQ states that infants and children need a TDAC. A parent or authorised person can submit for them, and the group flow supports up to ten travellers in one submission.",
  },
  {
    question: "Do I need to fill TDAC for transit in Thailand?",
    answer:
      "Not if you remain airside and do not pass Thai immigration. If you leave the transit area, collect baggage landside or otherwise enter Thailand through immigration, submit a TDAC before that entry.",
  },
  {
    question: "Can you edit TDAC after submission?",
    answer:
      "Use Update Arrival Card before travel for fields the system permits. If the detail cannot be changed, the official FAQ recommends submitting a new correct form; the most recent valid submission is used.",
  },
  {
    question: "Do I need to print my TDAC for Thailand?",
    answer:
      "Printing is not required according to the official FAQ. Download the document and QR code to your phone. An optional paper copy can be a useful fallback if your device is unavailable.",
  },
  {
    question: 'What does "within 3 days before arrival" mean?',
    answer:
      "The official FAQ counts the day you arrive. For example, an arrival on 10 August produces a practical submission window of 8, 9 and 10 August. Use your local Thai arrival date rather than the date you leave home.",
  },
];

function formatEnglishDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function ThailandTdacGuideEn() {
  const [arrivalDate, setArrivalDate] = useState("");
  const [checked, setChecked] = useState<number[]>([]);
  const subId = useSubId();

  const submissionWindow = useMemo(() => {
    if (!arrivalDate) return null;
    const arrival = new Date(`${arrivalDate}T12:00:00Z`);
    if (Number.isNaN(arrival.getTime())) return null;
    const first = new Date(arrival);
    first.setUTCDate(first.getUTCDate() - 2);
    return { arrival, first };
  }, [arrivalDate]);

  const hotelHref = withPlacementSubId(
    TRIP_GENERIC,
    subId,
    "tdac-first-address",
  );
  const transportHref = withPlacementSubId(
    TWELVEGO_GENERIC,
    subId,
    "tdac-arrival-details",
  );

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Thailand Digital Arrival Card: Official TDAC Guide",
      description:
        "Official-first English TDAC guide with submission window, required details, family and transit rules, corrections and direct Immigration Bureau links.",
      url: PAGE_URL,
      inLanguage: "en",
      dateModified: "2026-07-26",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
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
          name: "Home",
          item: "https://go2-thailand.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Thailand visas and entry",
          item: "https://go2-thailand.com/visa/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Thailand Digital Arrival Card",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to submit the Thailand Digital Arrival Card",
      step: formSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "TDAC rules for common travel situations",
      itemListElement: situations.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.text,
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title="Thailand Digital Arrival Card: Official TDAC Guide"
        description="Complete Thailand's free TDAC on the official site. Check the 3-day window, required details, children, transit, corrections and QR code."
        ogImage="https://go2-thailand.com/images/redesign/thailand-tdac-hero.webp"
      >
        {schemas.map((schema) => (
          <script
            key={schema["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-tdac-hero.webp"
          imageAlt="Passport and phone beside a digital arrival workflow in a Thailand airport lounge"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Visas and entry", href: "/visa/" },
            { label: "TDAC" },
          ]}
          eyebrow="No-fee arrival card · not a visa"
          title={
            <>
              Thailand TDAC.
              <br />
              <span className="text-saffron">One official route.</span>
            </>
          }
          subtitle="Submit within three days before arrival on the Immigration Bureau domain."
          description="Prepare your passport, Thai arrival details and first accommodation address. This guide turns the official form into a calm sequence and helps you avoid paid lookalikes."
          actions={[
            {
              label: "Open official TDAC",
              href: OFFICIAL_TDAC,
              kind: "primary",
              newTab: true,
            },
            {
              label: "Calculate my window",
              href: "#when",
              kind: "secondary",
            },
          ]}
          minHeightClassName="min-h-[730px] lg:min-h-[710px]"
          titleClassName="max-w-[730px] text-[3.65rem] leading-[0.88] !text-white sm:text-[5.05rem] lg:text-[5.65rem]"
          subtitleClassName="max-w-[650px] !text-white"
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white/80"
          imageClassName="object-cover object-[67%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.16)_0%,rgba(4,42,34,0.52)_45%,rgba(4,42,34,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.95)_44%,rgba(4,42,34,0.15)_70%,rgba(4,42,34,0.02)_100%)]"
          contentClassName="max-w-[760px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[320px] rounded-2xl border border-white/25 bg-jade/84 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">
                Check before typing
              </p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight">
                The address must end in immigration.go.th
              </p>
              <p className="mt-4 flex items-start gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold leading-5 text-white/58">
                <Fingerprint
                  size={17}
                  className="mt-0.5 shrink-0 text-saffron-light"
                />
                The official application does not charge a submission fee.
              </p>
            </div>
          }
        />

        <PageSectionNav items={sectionNav} />

        <section
          id="answer"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="The short answer"
              title="Required before immigration. Still not a visa."
              description="The Thailand Digital Arrival Card replaces the paper arrival card for non-Thai travellers. It records an arrival; it does not create permission to stay or replace a visa check."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <article
                    key={fact.label}
                    className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade">
                        <Icon size={20} />
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                        {fact.label}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-[1.85rem] font-semibold leading-tight text-jade">
                      {fact.value}
                    </h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">
                      {fact.text}
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 max-w-3xl text-xs font-medium leading-6 text-charcoal/62">
              Your TDAC and permission to enter are separate decisions. Check
              the current{" "}
              <Link
                href="/visa/"
                className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4"
              >
                Thailand visa and entry rules
              </Link>
              , and use the dedicated{" "}
              <Link
                href="/visa/tourist-visa/"
                className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4"
              >
                tourist visa guide
              </Link>{" "}
              when your stay or passport needs a visa.
            </p>
            <a
              href={OFFICIAL_TDAC}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-jade/10 bg-jade px-5 py-4 text-white shadow-editorial-card"
            >
              <span>
                <strong className="block text-sm">
                  Official website: tdac.immigration.go.th
                </strong>
                <span className="mt-1 block text-[10px] font-medium text-white/55">
                  No fee · Thailand Immigration Bureau · check every character.
                </span>
              </span>
              <ExternalLink size={18} className="shrink-0 text-saffron-light" />
            </a>
          </div>
        </section>

        <section
          id="when"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <SectionHeading
              eyebrow="The official 3-day rule"
              title="When does your TDAC window open?"
              description="Choose the local date on which you arrive in Thailand. The calculator shows the first calendar day of the official window, with arrival day included."
            />
            <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid md:grid-cols-[0.72fr_1.28fr]">
                <div className="bg-jade p-7 text-white sm:p-9">
                  <label
                    htmlFor="tdac-arrival-en"
                    className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light"
                  >
                    Arrival date in Thailand
                  </label>
                  <input
                    id="tdac-arrival-en"
                    type="date"
                    value={arrivalDate}
                    onChange={(event) => setArrivalDate(event.target.value)}
                    className="mt-4 min-h-14 w-full rounded-xl border border-white/18 bg-white px-4 text-sm font-extrabold text-jade outline-none ring-saffron focus:ring-2"
                  />
                  <p className="mt-4 text-[10px] font-medium leading-5 text-white/55">
                    Use the Thai arrival date on the ticket, not the date you
                    leave your home country.
                  </p>
                </div>
                <div className="p-7 sm:p-9" aria-live="polite">
                  {submissionWindow ? (
                    <>
                      <p className="eyebrow">Your practical window</p>
                      <h2 className="font-display text-[2.65rem] font-semibold leading-[0.94] text-jade">
                        From {formatEnglishDate(submissionWindow.first)}
                      </h2>
                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {[
                          submissionWindow.first,
                          new Date(submissionWindow.first.getTime() + 86400000),
                          submissionWindow.arrival,
                        ].map((date, index) => (
                          <div
                            key={date.toISOString()}
                            className={`rounded-xl border p-3 text-center ${
                              index === 2
                                ? "border-saffron/40 bg-saffron/10"
                                : "border-jade/10 bg-mist/45"
                            }`}
                          >
                            <span className="block text-[9px] font-extrabold uppercase tracking-[0.1em] text-charcoal/45">
                              {index === 2 ? "Arrival" : `Day ${index + 1}`}
                            </span>
                            <strong className="mt-2 block font-display text-xl text-jade">
                              {new Intl.DateTimeFormat("en-GB", {
                                day: "numeric",
                                month: "short",
                                timeZone: "UTC",
                              }).format(date)}
                            </strong>
                          </div>
                        ))}
                      </div>
                      <p className="mt-5 text-xs font-medium leading-6 text-charcoal/60">
                        Submit before immigration. If your actual arrival date
                        changes, update or replace the entry before you arrive.
                      </p>
                    </>
                  ) : (
                    <div className="flex min-h-[220px] flex-col justify-center">
                      <CalendarDays size={34} className="text-saffron" />
                      <h2 className="mt-4 font-display text-[2.4rem] font-semibold leading-tight text-jade">
                        Choose your arrival date.
                      </h2>
                      <p className="mt-3 text-xs font-medium leading-6 text-charcoal/60">
                        Three clear calendar dates will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="steps"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="One calm sequence"
              title="Passport to QR code in five steps."
              description="The official flow moves from identity to journey and accommodation, then any requested health information and one final preview."
            />
            <div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[440px] lg:min-h-[650px]">
                  <Image
                    src="/images/redesign/thailand-tdac-form-flow.webp"
                    alt="Visual TDAC route from passport through journey and accommodation to confirmation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
                <div className="bg-jade p-7 text-white sm:p-10 lg:p-11">
                  <p className="eyebrow !text-saffron-light">
                    Prepare first, then type
                  </p>
                  <div className="mt-6 grid gap-3">
                    {formSteps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <article
                          key={step.title}
                          className="grid grid-cols-[42px_1fr] gap-4 rounded-2xl border border-white/13 bg-white/[0.06] p-4"
                        >
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-saffron-light">
                            <Icon size={18} />
                          </span>
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-light">
                              {step.label}
                            </p>
                            <h2 className="mt-1 font-display text-xl font-semibold">
                              {step.title}
                            </h2>
                            <p className="mt-1 text-[10px] font-medium leading-5 text-white/55">
                              {step.text}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  <a
                    href={OFFICIAL_TDAC}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cream mt-6"
                  >
                    Start on the official website <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="details"
          className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Your arrival folder"
                title="Is every detail ready?"
                description="Tick off the set before you begin. The official site does not offer a save-and-finish-later draft."
              />
              <div className="mt-7 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-jade">
                    {checked.length} of {checklistItems.length} ready
                  </span>
                  <span className="font-display text-2xl font-semibold text-saffron">
                    {Math.round((checked.length / checklistItems.length) * 100)}
                    %
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist">
                  <div
                    className="h-full rounded-full bg-saffron transition-all"
                    style={{
                      width: `${(checked.length / checklistItems.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              {checklistItems.map((item, index) => {
                const active = checked.includes(index);
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setChecked((items) =>
                        active
                          ? items.filter((value) => value !== index)
                          : [...items, index],
                      )
                    }
                    className={`flex min-h-16 items-center gap-4 rounded-2xl border px-5 py-4 text-left text-xs font-extrabold transition ${
                      active
                        ? "border-saffron/35 bg-saffron/10 text-jade"
                        : "border-jade/10 bg-white text-charcoal/68 hover:border-jade/25"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                        active
                          ? "border-saffron bg-saffron text-jade"
                          : "border-jade/15 bg-mist text-jade/30"
                      }`}
                    >
                      <Check size={15} />
                    </span>
                    {item}
                  </button>
                );
              })}
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <a
                  href={hotelHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="rounded-2xl border border-jade/10 bg-jade p-5 text-white shadow-editorial-card"
                >
                  <Hotel size={20} className="text-saffron-light" />
                  <strong className="mt-4 block text-sm">
                    Check your first hotel address
                  </strong>
                  <span className="mt-1 block text-[10px] text-white/55">
                    Check current stay price at Trip.com
                  </span>
                </a>
                <a
                  href={transportHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="rounded-2xl border border-jade/10 bg-white p-5 text-jade shadow-editorial-card"
                >
                  <Plane size={20} className="text-saffron" />
                  <strong className="mt-4 block text-sm">
                    Verify your arrival route
                  </strong>
                  <span className="mt-1 block text-[10px] text-charcoal/45">
                    Check current transport at 12Go
                  </span>
                </a>
              </div>
              <AffiliateDisclosure className="mt-1">
                Trip.com and 12Go are affiliate links for an accommodation or
                journey you genuinely need. They do not submit, approve or
                influence your TDAC, which remains free on the official site.
              </AffiliateDisclosure>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="When the journey differs"
              title="Four situations that change the route."
              description="The useful question is not which visa label you have. It is whether a non-Thai traveller will pass Thai immigration on this arrival."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {situations.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade">
                        <Icon size={20} />
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">
                        {item.label}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-tight text-jade">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="changes"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="bg-jade p-8 text-white sm:p-11">
                  <p className="eyebrow !text-saffron-light">
                    Mistake or itinerary change?
                  </p>
                  <h2 className="font-display text-[3.25rem] font-semibold leading-[0.9] tracking-[-0.035em]">
                    Repair the record before entry.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/62">
                    A different hotel, flight or passport typo needs a calm
                    correction. The official site provides an update route and
                    explains when to submit a new form.
                  </p>
                </div>
                <div className="grid gap-4 p-7 sm:p-10 md:grid-cols-3">
                  {[
                    {
                      icon: RefreshCw,
                      number: "01",
                      title: "Open Update Arrival Card",
                      text: "Retrieve the submission using the identifiers requested by the current form.",
                    },
                    {
                      icon: FileCheck2,
                      number: "02",
                      title: "Correct available fields",
                      text: "Then review the full journey and accommodation record again.",
                    },
                    {
                      icon: MailCheck,
                      number: "03",
                      title: "Otherwise submit again",
                      text: "If that field cannot be edited, the latest valid submission is the one used.",
                    },
                  ].map((step) => {
                    const Icon = step.icon;
                    return (
                      <article
                        key={step.title}
                        className="rounded-2xl border border-jade/10 bg-mist/45 p-5"
                      >
                        <div className="flex items-center justify-between">
                          <Icon size={19} className="text-jade" />
                          <span className="font-display text-3xl font-semibold text-saffron">
                            {step.number}
                          </span>
                        </div>
                        <h3 className="mt-5 font-display text-xl font-semibold leading-tight text-jade">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[10px] font-medium leading-5 text-charcoal/58">
                          {step.text}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Final checkpoint</p>
              <h2 className="font-display text-[3.1rem] font-semibold leading-[0.92] text-jade">
                English details. Correct domain. QR code offline.
              </h2>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-charcoal/60">
                The official guide asks for details in English. Recheck anything
                read from an MRZ scan and keep the downloaded document or email
                available through your arrival.
              </p>
            </div>
            <a
              href={OFFICIAL_TDAC}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-jade"
            >
              Open official TDAC
              <ExternalLink size={15} className="text-saffron-light" />
            </a>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Verbatim search questions"
          title="Thailand TDAC FAQs"
          description="These are real English People Also Ask questions captured on 26 July 2026. Answers follow the current Thailand Immigration Bureau guide and FAQ."
          items={faqItems}
        />

        <RelatedGuidesSection
          eyebrow="Finish the arrival plan"
          title="Connect the form to the real trip"
          guides={[
            {
              title: "Thailand visas and entry",
              description:
                "Check permission to stay, passport validity and onward travel separately.",
              href: "/visa/",
              image: "/images/redesign/thailand-visa-hero.webp",
              imageAlt: "Thailand passport and entry documents",
            },
            {
              title: "Thailand packing list",
              description:
                "Keep documents, power, clothing and arrival essentials in one practical system.",
              href: "/travel-gear/",
              image: "/images/redesign/travel-gear-hero.webp",
              imageAlt: "Thailand travel gear laid out for packing",
            },
            {
              title: "First time in Thailand",
              description:
                "Build a calm sequence from route and money to the first 48 hours.",
              href: "/thailand-for-first-timers/",
              image: "/images/redesign/thailand-tdac-hero.webp",
              imageAlt: "First arrival in Thailand with passport and phone",
            },
          ]}
        />

        <SourceMethodSection
          eyebrow="Source and method"
          title="The official guide owns the rules."
          description="Three English DFS clusters, ten live SERPs, verbatim PAA, ranking and backlink checks and four competitor/source structures were researched on 26 July 2026. Requirements, timing, group size, transit, corrections and release status were then checked against Thailand Immigration Bureau application version 2026.07.00."
          sources={[
            {
              title: "TDAC User Guide",
              creator: "Thailand Immigration Bureau",
              url: "https://tdac.immigration.go.th/manual/en/",
              note: "Primary step-by-step source for individual and group submission, required fields, preview, download and updates.",
            },
            {
              title: "TDAC FAQ & Updates",
              creator: "Thailand Immigration Bureau",
              url: "https://tdac.immigration.go.th/manual/en/faq.html",
              note: "Primary source for the window, children, transit, validity, group size, printing and mistakes; release 2026.07.00 checked.",
            },
            {
              title: "Thailand entry requirements",
              creator: "GOV.UK Foreign Travel Advice",
              url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements",
              note: "Current UK-facing entry context and a direct route to the official TDAC, checked separately from the form itself.",
            },
          ]}
        />
      </div>
    </>
  );
}
