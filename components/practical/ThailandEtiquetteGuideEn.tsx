import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Camera,
  Check,
  CircleHelp,
  Eye,
  ExternalLink,
  Footprints,
  Hand,
  House,
  Landmark,
  MapPin,
  MessageCircle,
  Route,
  Scale,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Volume2,
  X,
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

const PAGE_URL = "https://go2-thailand.com/practical-info/etiquette-culture/";
const PAGE_TITLE = "Thailand Etiquette: Do's, Don'ts & Temple Rules";
const PAGE_DESCRIPTION =
  "Use Thai etiquette with confidence: wai greetings, head and feet, temple clothing, monks, table manners, tipping and current legal boundaries.";
const HERO_IMAGE = "/images/redesign/thailand-etiquette-hero.webp";

const sectionNav: PageSectionNavItem[] = [
  { href: "#compass", label: "Compass", icon: Eye },
  { href: "#everyday", label: "Everyday", icon: Hand },
  { href: "#temple", label: "Temples", icon: Landmark },
  { href: "#route", label: "60 seconds", icon: Route },
  { href: "#table", label: "Table & tips", icon: UtensilsCrossed },
  { href: "#boundaries", label: "Boundaries", icon: Scale },
  { href: "#questions", label: "FAQs", icon: CircleHelp },
];

interface ContextRule {
  icon: LucideIcon;
  number: string;
  title: string;
  signal: string;
  doText: string;
  avoidText: string;
  unsure: string;
}

const contextRules: ContextRule[] = [
  {
    icon: Hand,
    number: "01",
    title: "Someone greets you with a wai",
    signal: "The other person brings their palms together and bows slightly.",
    doText:
      "Return the greeting calmly when it is offered. A gentle nod, smile and sawatdee khrap or sawatdee kha is enough for most visitors.",
    avoidText:
      "Do not turn the wai into a performance or try to calculate hand height and status in every casual encounter. Its form depends on relationship and context.",
    unsure:
      "If your hands are full, smile and nod. Follow the other person’s pace instead of freezing.",
  },
  {
    icon: Footprints,
    number: "02",
    title: "People are sitting low or on the floor",
    signal: "The space is sacred, domestic or arranged close to floor level.",
    doText:
      "Keep your feet on the floor or folded to the side. In Thai cultural symbolism, the head is high and the feet are low.",
    avoidText:
      "Do not touch someone’s head without permission, point your soles at people or Buddha images, or use a foot to indicate or move an object.",
    unsure:
      "Sit so your feet remain outside the central sightline and avoid stepping over people or food.",
  },
  {
    icon: House,
    number: "03",
    title: "You reach a home or small business",
    signal:
      "Shoes are lined up at the entrance, a rack is present or the floor rises beyond a threshold.",
    doText:
      "Pause before entering. Remove shoes when the host does, when a sign asks you to or when the entrance clearly marks a shoe-free area.",
    avoidText:
      "Do not assume every shop, massage business or accommodation follows the same rule. Read the specific doorway.",
    unsure:
      "Point to your shoes and ask. A two-second question is more respectful than pretending to know.",
  },
  {
    icon: Volume2,
    number: "04",
    title: "A bill or booking is wrong",
    signal:
      "The service does not match the confirmation, price or order you expected.",
    doText:
      "Explain the concrete mismatch, show the confirmation and give the person room to solve it. A calm, specific request usually travels further than blame.",
    avoidText:
      "Do not shout, ridicule staff or film a disagreement as leverage. That can make a small practical problem socially much larger.",
    unsure:
      "Ask for a manager, colleague or translation help and lower the speed and volume of the exchange.",
  },
  {
    icon: Camera,
    number: "05",
    title: "You want a photo of people or ritual",
    signal:
      "A prayer, offering, monk, ceremony or private moment is part of the frame.",
    doText:
      "Check signs, ask before a close-up and stay out of the route used by people who came to worship. Switch off flash and sound where photography is allowed.",
    avoidText:
      "Do not use a person as unasked-for scenery or pose in a way that turns a sacred object into a joke or prop.",
    unsure:
      "Lower the camera. A missed photo is easier to recover than damaged trust.",
  },
];

const templeChecklist = [
  {
    title: "Dress for the specific site",
    text: "Covered shoulders and knees are a safe starting point, but each temple or palace can set its own entry rules. Read the official page and entrance signs.",
    icon: Shirt,
  },
  {
    title: "Read the shoe boundary",
    text: "Shoes normally come off before a prayer hall or where the site marks the boundary. They may remain on outdoors. Look for racks, signs and local behaviour.",
    icon: Footprints,
  },
  {
    title: "Keep feet to the side",
    text: "Do not aim the soles at a Buddha image, monk or another visitor. Fold your legs or place both feet to the side when seated on the floor.",
    icon: MapPin,
  },
  {
    title: "Do not climb or touch",
    text: "Do not climb chedis, statues or platforms for a photograph. Follow barriers and touch sacred objects only when a host explicitly invites it.",
    icon: ShieldCheck,
  },
  {
    title: "Give monks physical space",
    text: "Avoid physical contact and do not enter a ritual uninvited. When offering something, use the method shown by the temple or guide.",
    icon: Hand,
  },
  {
    title: "Ask before photographing",
    text: "Photography is not universal. Check signs, avoid flash near vulnerable art and never block prayer or a procession to improve the frame.",
    icon: Camera,
  },
];

const courtesySteps = [
  {
    title: "Look",
    text: "Where are the shoes, how are people moving and what do the signs mark?",
    icon: Eye,
  },
  {
    title: "Greet",
    text: "Make eye contact, smile and use a simple greeting without taking over the moment.",
    icon: MessageCircle,
  },
  {
    title: "Ask",
    text: "Permission for a photo, touch, seat or action takes only a few seconds.",
    icon: CircleHelp,
  },
  {
    title: "Adjust",
    text: "If corrected, thank the person and change course immediately instead of defending the mistake.",
    icon: BadgeCheck,
  },
];

const faqItems = [
  {
    question: "What are do's and don'ts in Thailand?",
    answer:
      "Do observe the setting, greet people calmly, dress for religious sites, ask before close-up photographs and solve problems without public humiliation. Do not touch heads casually, point your feet at people or Buddha images, climb sacred structures or treat every online etiquette rule as a law. Local instructions always take priority.",
  },
  {
    question: "What is frowned upon in Thailand?",
    answer:
      "Shouting at someone in public, using your feet to point, touching a person’s head without permission and disrespecting religious spaces are commonly regarded as poor manners. Context varies by family, generation and place. If you make a mistake, a short apology and immediate adjustment are usually more helpful than a long defence.",
  },
  {
    question: "Is it rude to touch someone's head in Thailand?",
    answer:
      "Yes, touching another person’s head without permission is widely treated as disrespectful. The Thailand Foundation explains the cultural contrast between the high or sacred head and the low feet. Avoid ruffling a child’s hair as well; normal consent still matters more than trying to perform a cultural rule perfectly.",
  },
  {
    question: "Is it rude not to bow in Thailand?",
    answer:
      "Visitors are not expected to master every level of the wai. When someone greets you with a wai, you can return it gently; a smile and nod is also reasonable when your hands are full or the situation is informal. Service staff may wai as part of their role, so do not turn every greeting into a status calculation.",
  },
  {
    question: "What should you wear to a temple in Thailand?",
    answer:
      "Covered shoulders and knees, opaque fabric and clothing that is not extremely tight form a safe baseline. Exact rules differ by site. The Grand Palace has a stricter published list than many temple grounds, so check the specific attraction rather than relying on one universal dress code or assuming a loan sarong will be available.",
  },
  {
    question: "Are you allowed to take photos of temples in Thailand?",
    answer:
      "Often outdoors, but not everywhere and not during every ritual. Check signs and staff instructions before photographing interiors, art, monks or worshippers. Avoid flash, tripods and drones unless expressly permitted, and never block a prayer route or climb a structure for a photograph.",
  },
  {
    question: "Is 100 baht a good tip in Thailand?",
    answer:
      "It can be a generous tip for many everyday services, but there is no national amount that is correct for every bill or job. Check whether a service charge is already included, consider the total price and service, and tip voluntarily. A fixed internet number should not override the actual context.",
  },
  {
    question: "Is it rude not to tip in Thailand?",
    answer:
      "Tipping is not a universal obligation in Thailand. In some tourist businesses it is common and appreciated; in other settings it is not expected. Check the bill for service charge and use your judgement. Treating a voluntary tip as a mandatory cultural fee creates false certainty.",
  },
  {
    question: "What is not polite at the table in Thailand?",
    answer:
      "Avoid pointing your feet at people, reaching across everyone when dishes are shared, taking large portions before others and ignoring serving utensils that have been provided. Many meals use a spoon and fork, but follow what the restaurant or host sets out instead of enforcing one rigid national table rule.",
  },
  {
    question: "Can I kiss my wife in public in Thailand?",
    answer:
      "A brief, modest display of affection is seen in many tourist and urban settings, but intimate or prolonged behaviour can feel inappropriate in religious, formal or family spaces. Read the setting and keep physical affection discreet. This is a question of context and courtesy, not a claim that all Thai people share one preference.",
  },
];

const relatedGuides = [
  {
    title: "Thailand for first timers",
    description:
      "Build a calm sequence from entry and money to transport, etiquette and the first 48 hours.",
    href: "/thailand-for-first-timers/",
    image: "/images/redesign/first-time-thailand-hero.webp",
    imageAlt: "First-time traveller near a Thai temple",
  },
  {
    title: "Is Thailand safe?",
    description:
      "Separate ordinary travel risk, current warnings, local law and emergency routes.",
    href: "/is-thailand-safe/",
    image: "/images/redesign/thailand-safety-hero.webp",
    imageAlt: "Travellers reviewing a safe Thailand route",
  },
  {
    title: "Useful Thai phrases",
    description:
      "Greet, thank and ask simple questions without memorising an entire phrasebook.",
    href: "/travel-guides/thai-phrases-language/",
    image: "/images/redesign/blue-temple-chiang-rai-hero.webp",
    imageAlt: "Thai temple as context for language and local culture",
  },
];

const sources = [
  {
    title: "Practical information & dress code",
    creator: "The Grand Palace — official",
    url: "https://www.royalgrandpalace.th/en/visit/practical-information",
    note: "Site-specific entry information and the stricter clothing rules for the Grand Palace complex.",
  },
  {
    title: "Feet Low, Head High: a guide to Thai etiquettes",
    creator: "Thailand Foundation",
    url: "https://thailandfoundation.or.th/feet-low-head-high-a-guide-to-thai-etiquettes/",
    note: "Cultural context for head, feet, shoes and respectful body position.",
  },
  {
    title: "Wai: the Thai greeting",
    creator: "Thailand Foundation",
    url: "https://thailandfoundation.or.th/wai-the-thai-greeting/",
    note: "Background on the wai as greeting, acknowledgement and expression of respect.",
  },
  {
    title: "Thailand travel advice: safety and security",
    creator: "UK Foreign, Commonwealth & Development Office",
    url: "https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security",
    note: "Current UK guidance on Thai law, monarchy, e-cigarettes, drugs, cannabis and other legal boundaries.",
  },
];

function CourtesyRoute() {
  return (
    <div className="relative mt-10">
      <svg
        className="pointer-events-none absolute left-[8%] top-10 hidden h-20 w-[84%] text-saffron/70 lg:block"
        viewBox="0 0 1000 120"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15 65 C105 3 170 115 255 60 S420 5 500 61 S660 116 745 60 S895 4 985 64"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 9"
          strokeLinecap="round"
        />
        <circle cx="15" cy="65" r="5" fill="currentColor" />
        <circle cx="985" cy="64" r="5" fill="currentColor" />
      </svg>
      <ol className="relative grid gap-4 lg:grid-cols-4">
        {courtesySteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card lg:min-h-[250px]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-saffron/30 bg-tonal text-jade">
                  <Icon size={21} strokeWidth={1.5} />
                </span>
                <span className="font-display text-3xl font-semibold text-jade/12">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-7 font-display text-[1.85rem] font-semibold leading-none text-jade">
                {step.title}
              </h3>
              <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">
                {step.text}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function ThailandEtiquetteGuideEn() {
  const subId = useSubId();
  const cultureTourHref = withPlacementSubId(
    KLOOK_GENERIC,
    subId,
    "etiquette-cultural-tour-en",
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    mainEntityOfPage: PAGE_URL,
    image: `https://go2-thailand.com${HERO_IMAGE}`,
    inLanguage: "en",
    dateModified: "2026-07-26",
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
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbJsonLd = {
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
        name: "Practical information",
        item: "https://go2-thailand.com/practical-info/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Thailand etiquette",
        item: PAGE_URL,
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to respond respectfully in Thailand in 60 seconds",
    description:
      "A short decision route for an unfamiliar social or religious setting.",
    step: courtesySteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
      url: `${PAGE_URL}#route`,
    })),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Five everyday Thailand etiquette situations",
    itemListElement: contextRules.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      description: item.doText,
    })),
  };

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        ogImage={`https://go2-thailand.com${HERO_IMAGE}`}
      >
        {[
          articleJsonLd,
          faqJsonLd,
          breadcrumbJsonLd,
          howToJsonLd,
          itemListJsonLd,
        ].map((schema) => (
          <script
            key={schema["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <div className="overflow-hidden bg-canvas">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Traveller returning a wai greeting near a Thai temple"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Practical information", href: "/practical-info/" },
            { label: "Etiquette" },
          ]}
          eyebrow="Respect without the performance"
          title={
            <>
              Thailand etiquette.
              <br />
              Look first.
              <br />
              <span className="italic">Then join in.</span>
            </>
          }
          description={
            <>
              You do not need to memorise a cultural rulebook. Four habits—
              <strong>
                observe, speak calmly, ask permission and adjust quickly
              </strong>
              —take you a long way in homes, temples and at the table.
            </>
          }
          actions={[
            {
              label: "Open the social compass",
              href: "#compass",
              kind: "primary",
            },
            {
              label: "Check temple etiquette",
              href: "#temple",
              kind: "secondary",
            },
          ]}
          minHeightClassName="min-h-[760px] lg:min-h-[690px]"
          titleClassName="max-w-[650px] text-[3.65rem] leading-[0.86] sm:text-[4.8rem] lg:text-[5.45rem]"
          contentClassName="max-w-[620px]"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.18)_0%,rgba(252,250,246,0.58)_48%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_35%,rgba(252,250,246,0.25)_64%,rgba(8,46,39,0.08)_100%)]"
          sideCard={
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[285px] rounded-2xl border border-white/45 bg-white/78 p-5 shadow-editorial-lift backdrop-blur-xl xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                Your social passport
              </p>
              <div className="mt-4 grid grid-cols-[32px_1fr] gap-x-3 gap-y-3 text-[11px] font-bold leading-5 text-jade">
                <Eye size={17} className="mt-0.5 text-saffron" />
                <span>Read what the space asks</span>
                <MessageCircle size={17} className="mt-0.5 text-saffron" />
                <span>Keep tone and explanation calm</span>
                <CircleHelp size={17} className="mt-0.5 text-saffron" />
                <span>Ask when the boundary is unclear</span>
              </div>
            </aside>
          }
        />

        <PageSectionNav label="On this page" items={sectionNav} />

        <section
          className="section-divider-bottom bg-canvas py-7"
          aria-label="Four etiquette principles"
        >
          <div className="container-custom grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                Eye,
                "Observe first",
                "The setting says more than a generic list.",
              ],
              [
                Footprints,
                "Read the threshold",
                "Shoes and feet depend on context.",
              ],
              [
                MessageCircle,
                "Correct calmly",
                "Leave the other person room to solve it.",
              ],
              [
                Scale,
                "Know the difference",
                "A custom is not a law—and vice versa.",
              ],
            ].map(([Icon, title, text]) => {
              const TrustIcon = Icon as LucideIcon;
              return (
                <div
                  key={title as string}
                  className="flex items-center gap-4 border-l border-jade/10 pl-4 first:border-l-0 first:pl-0 sm:first:border-l sm:first:pl-4 lg:first:border-l-0 lg:first:pl-0"
                >
                  <TrustIcon
                    size={21}
                    strokeWidth={1.45}
                    className="shrink-0 text-jade"
                  />
                  <div>
                    <strong className="block text-xs font-extrabold text-jade">
                      {title as string}
                    </strong>
                    <span className="mt-1 block text-[10px] font-medium leading-4 text-charcoal/54">
                      {text as string}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="compass"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Make the first distinction"
                title={
                  <>
                    A social mistake
                    <br />
                    is not a crime.
                  </>
                }
                description="Thailand has customs, venue rules and laws. Treating all three as strict taboos makes travel needlessly tense; treating every boundary as folklore can create real trouble."
              />
              <p className="mt-6 text-sm font-medium leading-7 text-charcoal/66">
                This guide avoids claims about a single “Thai personality”. It
                gives each situation a{" "}
                <strong className="text-jade">
                  visible signal, a safe response and a recovery route
                </strong>
                .
              </p>
            </div>
            <div className="overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid md:grid-cols-2">
                <article className="jade-pattern p-8 sm:p-10">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-saffron-light">
                    <MessageCircle size={21} />
                  </span>
                  <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">
                    Social custom
                  </p>
                  <h2 className="mt-2 font-display text-[2.5rem] font-semibold leading-[0.94]">
                    Notice. Adjust. Move on.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/66">
                    Remove your shoes, move your feet or apologise briefly. A
                    respectful correction does not need to define the rest of
                    the day.
                  </p>
                </article>
                <article className="border-t border-white/10 bg-white/[0.055] p-8 sm:p-10 md:border-l md:border-t-0">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-saffron/35 bg-saffron text-white">
                    <AlertTriangle size={21} />
                  </span>
                  <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">
                    Legal boundary
                  </p>
                  <h2 className="mt-2 font-display text-[2.5rem] font-semibold leading-[0.94]">
                    Stop. Verify. Get help.
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/66">
                    Drugs, vaping and criticism of the monarchy are not
                    etiquette questions. Use current official advice and
                    professional help if an incident occurs.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="everyday"
          className="section-divider-bottom scroll-mt-24 bg-tonal/52 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading
                eyebrow="Five recognisable moments"
                title={
                  <>
                    What does this
                    <br />
                    situation ask?
                  </>
                }
                description="Not everyone in Thailand expects identical behaviour. Use concrete signals instead of assumptions about an entire country."
              />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/64 lg:justify-self-end">
                The wai receives a lot of attention, but everyday courtesy more
                often means pausing at a doorway, asking before a photograph or
                lowering your voice when something goes wrong.
              </p>
            </div>
            <div className="mt-12 border-y border-jade/10">
              {contextRules.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className={`grid gap-6 border-b border-jade/10 px-1 py-8 last:border-b-0 lg:grid-cols-[80px_0.7fr_1.3fr] lg:items-start lg:gap-9 ${index % 2 ? "bg-white/45" : ""}`}
                  >
                    <div className="flex items-center justify-between lg:block">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-jade/12 bg-canvas text-jade">
                        <Icon size={22} strokeWidth={1.45} />
                      </span>
                      <span className="font-display text-3xl font-semibold text-jade/10 lg:mt-7 lg:block">
                        {item.number}
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                        Signal
                      </p>
                      <h2 className="mt-2 font-display text-[2.15rem] font-semibold leading-none text-jade">
                        {item.title}
                      </h2>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/60">
                        {item.signal}
                      </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-jade">
                          <Check size={15} className="text-saffron" /> Do this
                        </p>
                        <p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">
                          {item.doText}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-jade">
                          <X size={15} className="text-saffron" /> Avoid this
                        </p>
                        <p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">
                          {item.avoidText}
                        </p>
                      </div>
                      <p className="rounded-xl border border-saffron/25 bg-tonal px-4 py-3 text-[11px] font-bold leading-5 text-jade sm:col-span-2">
                        <span className="text-saffron-dark">If unsure:</span>{" "}
                        {item.unsure}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="temple"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[430px] lg:min-h-[720px]">
                <Image
                  src="/images/redesign/thailand-etiquette-temple.webp"
                  alt="Visitors remove their shoes before entering a Thai temple prayer space"
                  fill
                  sizes="(max-width: 1024px) 100vw, 43vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-jade/35" />
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/15 bg-jade/76 p-4 backdrop-blur-md">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                    Read the threshold
                  </p>
                  <p className="mt-2 text-xs font-medium leading-5 text-white/72">
                    A shoe rack, sign or host marks the boundary. Not every part
                    of a complex follows the same rule.
                  </p>
                </div>
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">
                  From gate to prayer hall
                </p>
                <h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.035em] sm:text-[4rem]">
                  A temple visit happens in layers.
                </h2>
                <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/68">
                  “Thailand temple rules” sounds like one checklist. An open
                  courtyard, inner hall, ceremony and palace complex can each
                  set a different boundary. These are safe defaults; local
                  instructions always win.
                </p>
                <div className="mt-9 grid gap-x-7 gap-y-6 sm:grid-cols-2">
                  {templeChecklist.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article
                        key={item.title}
                        className="border-t border-white/12 pt-5"
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.45}
                          className="text-saffron-light"
                        />
                        <h3 className="mt-4 text-sm font-extrabold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[11px] font-medium leading-5 text-white/58">
                          {item.text}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-7 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <article className="rounded-[24px] border border-saffron/25 bg-tonal p-7 sm:p-9">
                <p className="eyebrow">A stricter example</p>
                <h2 className="font-display text-[2.35rem] font-semibold leading-none text-jade">
                  Grand Palace is not a universal temple dress code.
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">
                  The official Grand Palace page excludes sleeveless, short,
                  see-through, torn and very tight clothing, bike trousers and
                  miniskirts, among other items. Use that list for{" "}
                  <strong className="text-jade">that complex</strong>; check
                  each other temple’s own information.
                </p>
                <a
                  href="https://www.royalgrandpalace.th/en/visit/practical-information"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade"
                >
                  Open the official visitor information{" "}
                  <ExternalLink size={14} className="text-saffron" />
                </a>
              </article>
              <aside className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9">
                <Sparkles
                  size={23}
                  strokeWidth={1.45}
                  className="text-saffron"
                />
                <h2 className="mt-5 font-display text-[2rem] font-semibold leading-none text-jade">
                  Prefer local context?
                </h2>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">
                  A local guide can explain ritual and site-specific choices.
                  Check the exact temples, dress code, inclusions, language and
                  cancellation policy before booking.
                </p>
                <a
                  href={cultureTourHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="btn-jade btn-jade-pattern group mt-6 w-full justify-center"
                >
                  Compare cultural tours on Klook{" "}
                  <ExternalLink size={14} className="text-saffron-light" />
                </a>
                <AffiliateDisclosure className="mt-3">
                  Klook is an affiliate link. We may earn commission at no extra
                  cost to you; the tour operator controls the itinerary and
                  conditions.
                </AffiliateDisclosure>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="route"
          className="section-divider-bottom scroll-mt-24 bg-tonal/55 py-16 lg:py-24"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="No rule in sight?"
              title={
                <>
                  Your route in
                  <br />
                  60 seconds.
                </>
              }
              description="You do not need to guess in an unfamiliar setting. Four actions make respect visible while leaving room to learn."
            />
            <CourtesyRoute />
          </div>
        </section>

        <section
          id="table"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <SectionHeading
                eyebrow="Food, bill and tip"
                title={
                  <>
                    The table is
                    <br />
                    not a test.
                  </>
                }
                description="Watch how dishes are shared, use serving spoons when provided and discuss allergies or dietary requirements before ordering."
              />
              <Link
                href="/food/"
                className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade"
              >
                Explore Thai food culture{" "}
                <ArrowRight size={14} className="text-saffron" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <article className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-8">
                <UtensilsCrossed
                  size={23}
                  strokeWidth={1.45}
                  className="text-jade"
                />
                <h2 className="mt-6 font-display text-[2.15rem] font-semibold leading-none text-jade">
                  Sharing a meal
                </h2>
                <p className="mt-4 text-sm font-medium leading-7 text-charcoal/64">
                  Many meals combine shared dishes with rice per person, but
                  format and sequence vary. Take small portions, use the serving
                  spoon and pause when a host is ordering or beginning the meal.
                </p>
                <p className="mt-5 border-t border-jade/10 pt-5 text-[11px] font-bold leading-5 text-jade">
                  <span className="text-saffron-dark">Practical:</span> spoon
                  and fork are common; follow whatever the restaurant or host
                  provides.
                </p>
              </article>
              <article className="rounded-[24px] border border-saffron/25 bg-tonal p-7 shadow-editorial-card sm:p-8">
                <ShoppingBag
                  size={23}
                  strokeWidth={1.45}
                  className="text-saffron-dark"
                />
                <h2 className="mt-6 font-display text-[2.15rem] font-semibold leading-none text-jade">
                  Tipping in Thailand
                </h2>
                <p className="mt-4 text-sm font-medium leading-7 text-charcoal/64">
                  Read the bill first: a service charge may already be included.
                  An extra tip is then voluntary appreciation, not a single
                  national tariff. The business type, service and total bill
                  matter more than an online amount per occupation.
                </p>
                <p className="mt-5 border-t border-jade/10 pt-5 text-[11px] font-bold leading-5 text-jade">
                  <span className="text-saffron-dark">
                    Avoid false precision:
                  </span>{" "}
                  a timeless “correct” baht amount cannot follow prices or
                  expectations.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom pb-16 lg:pb-24">
          <div className="container-custom">
            <div className="relative min-h-[440px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift lg:min-h-[470px]">
              <Image
                src="/images/redesign/thailand-etiquette-everyday.webp"
                alt="Thai hosts and travellers sharing a calm meal beside the river"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,34,30,0.98)_0%,rgba(5,34,30,0.9)_35%,rgba(5,34,30,0.28)_68%,rgba(5,34,30,0.08)_100%)]" />
              <div className="relative z-10 max-w-[620px] p-8 text-white sm:p-11 lg:p-14">
                <p className="eyebrow !text-saffron-light">
                  The most useful custom
                </p>
                <h2 className="font-display text-[3.4rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4.35rem]">
                  Respect is not a performance.
                </h2>
                <p className="mt-6 max-w-[520px] text-sm font-medium leading-7 text-white/70">
                  You do not need to act “as Thai as possible”. Listening,
                  responding calmly and accepting that a host knows the space
                  better feels more natural than a rehearsed sequence of
                  gestures.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/66">
                  <span className="rounded-lg border border-white/15 bg-white/[0.07] px-4 py-3">
                    Read the context
                  </span>
                  <span className="rounded-lg border border-white/15 bg-white/[0.07] px-4 py-3">
                    Ask permission
                  </span>
                  <span className="rounded-lg border border-white/15 bg-white/[0.07] px-4 py-3">
                    Repair without drama
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="boundaries"
          className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-24"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow !text-saffron-light">
                Law is not etiquette
              </p>
              <h2 className="font-display text-[3.6rem] font-semibold leading-[0.88] tracking-[-0.04em]">
                Some boundaries need an official source.
              </h2>
              <p className="mt-6 text-sm font-medium leading-7 text-white/68">
                UK travel advice is current on 26 July 2026 and can change.
                Recheck it shortly before departure instead of saving this
                summary as permanent legal advice.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Monarchy",
                  "Criticising the Thai monarchy is illegal and the law can be interpreted broadly, including online sharing.",
                ],
                [
                  "Vaping",
                  "Possessing or using vapes, e-cigarettes, pods, e-liquid or heat-not-burn devices is illegal; there is no tourist exception.",
                ],
                [
                  "Drugs & cannabis",
                  "Drug laws are strict. Current UK advice says recreational cannabis remains illegal and medical use needs a Thai-issued prescription.",
                ],
                [
                  "Police or legal incident",
                  "Stop relying on etiquette advice. Contact your insurer, embassy support where appropriate and qualified local legal help.",
                ],
              ].map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-white/12 bg-white/[0.055] p-6"
                >
                  <AlertTriangle size={20} className="text-saffron-light" />
                  <h3 className="mt-5 font-display text-[1.65rem] font-semibold leading-none">
                    {title}
                  </h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-white/62">
                    {text}
                  </p>
                </article>
              ))}
              <a
                href="https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cream group sm:col-span-2 sm:justify-center"
              >
                Check current UK Thailand travel advice{" "}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal/55 py-16 lg:py-24">
          <div className="container-custom grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <SectionHeading
                eyebrow="A temple day in your bag"
                title={
                  <>
                    Two practical
                    <br />
                    helpers.
                  </>
                }
                description="Neither is mandatory or an entry guarantee. Both can help when a hot city walk turns into an unplanned religious-site visit."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href="/go/hovsiyla-quick-dry-shirt/"
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="group rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:border-saffron/35"
                >
                  <Shirt size={23} strokeWidth={1.45} className="text-jade" />
                  <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                    Amazon via OneLink
                  </p>
                  <h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">
                    Quick-dry travel shirt
                  </h2>
                  <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/58">
                    Check sleeve length, fit, fabric, size and the site’s rules;
                    one shirt does not make every outfit suitable.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">
                    Check current price at Amazon{" "}
                    <ExternalLink size={13} className="text-saffron" />
                  </span>
                </a>
                <a
                  href="/go/venture-pal-packable-backpack/"
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="group rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:border-saffron/35"
                >
                  <ShoppingBag
                    size={23}
                    strokeWidth={1.45}
                    className="text-jade"
                  />
                  <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                    Amazon via OneLink
                  </p>
                  <h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">
                    Packable day backpack
                  </h2>
                  <p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/58">
                    For an extra clothing layer and shoe bag. Check size,
                    comfort, seller and live availability in your Amazon store.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">
                    Check current price at Amazon{" "}
                    <ExternalLink size={13} className="text-saffron" />
                  </span>
                </a>
              </div>
              <AffiliateDisclosure className="mt-4">
                As an Amazon Associate we earn from qualifying purchases, at no
                extra cost to you. Our central <strong>/go/</strong> router
                applies the Go2Thailand tag; OneLink may route you to a local
                Amazon store. Product, price, seller and availability vary by
                country.
              </AffiliateDisclosure>
            </div>
            <aside className="relative overflow-hidden rounded-[26px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10">
              <div
                className="jade-pattern absolute inset-0 opacity-50"
                aria-hidden="true"
              />
              <div className="relative">
                <BookOpen size={25} className="text-saffron-light" />
                <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">
                  What should you pack?
                </p>
                <h2 className="mt-2 font-display text-[2.65rem] font-semibold leading-[0.92]">
                  A layer, not a costume.
                </h2>
                <ul className="mt-7 space-y-4 text-xs font-medium leading-6 text-white/66">
                  <li className="flex gap-3">
                    <Check
                      size={15}
                      className="mt-1 shrink-0 text-saffron-light"
                    />
                    Light coverage for shoulders and knees.
                  </li>
                  <li className="flex gap-3">
                    <Check
                      size={15}
                      className="mt-1 shrink-0 text-saffron-light"
                    />
                    Shoes that are easy to remove and put back on.
                  </li>
                  <li className="flex gap-3">
                    <Check
                      size={15}
                      className="mt-1 shrink-0 text-saffron-light"
                    />
                    A calm question when the boundary is unclear.
                  </li>
                </ul>
                <Link href="/travel-gear/" className="btn-cream mt-8">
                  Open the full packing guide <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Verbatim search questions"
          title="Thailand etiquette FAQs"
          description="These are real English People Also Ask questions. The answers distinguish safe cultural defaults, site-specific instructions and current law."
          items={faqItems}
        />

        <RelatedGuidesSection
          eyebrow="Travel with context"
          title="Prepare the rest of the trip"
          guides={relatedGuides}
          readLabel="Read the guide"
          sideLink={{
            label: "Browse Thailand culture tours",
            href: cultureTourHref,
            affiliate: true,
          }}
          disclosure="Affiliate disclosure: we may earn commission from a Klook booking at no extra cost to you. The activity provider controls inclusions, dress code and operating conditions."
        />

        <SourceMethodSection
          eyebrow="Evidence before etiquette myths"
          title="Sources & editorial method"
          description="Reviewed on 26 July 2026 using official venue information, Thailand Foundation cultural explainers, current UK government travel advice, English DataForSEO clusters, ten English SERPs, verbatim PAA questions and competitor-format analysis. We do not turn one family’s custom into a national law or one palace dress code into a rule for every temple."
          sources={sources}
        />
      </div>
    </>
  );
}
