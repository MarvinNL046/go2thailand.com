import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
  Coffee,
  Droplets,
  ExternalLink,
  GlassWater,
  HeartHandshake,
  Languages,
  Leaf,
  Martini,
  Milk,
  PackageCheck,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
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

const PAGE_URL = "https://go2-thailand.com/drinks/";
const PAGE_TITLE = "Thai drinks: 25 traditional drinks to try in Thailand";
const PAGE_DESCRIPTION =
  "Explore 25 traditional Thai drinks, from cha yen and oliang to herbal drinks and Thai beer, with ordering phrases, water and ice advice, and current alcohol rules.";
const HERO_IMAGE = "/images/redesign/thai-drinks-hero.webp";

interface Drink {
  id: number;
  slug: string;
  name: { en: string; nl: string; thai: string };
  category: string;
  description: { en: string; nl: string };
  image: string;
  alcohol_content: string;
  caffeine: string;
}

interface ThaiDrinksGuideEnProps {
  drinks: Drink[];
}

const navItems: PageSectionNavItem[] = [
  { href: "#start", label: "Start here", icon: Sparkles },
  { href: "#taste-route", label: "Taste route", icon: Route },
  { href: "#all-drinks", label: "All 25", icon: GlassWater },
  { href: "#ordering", label: "Ordering", icon: Languages },
  { href: "#drink-safely", label: "Water & rules", icon: ShieldCheck },
  { href: "#questions", label: "Questions", icon: CircleHelp },
];

const firstSips = [
  {
    slug: "thai-iced-tea",
    label: "Sweet & creamy",
    why: "The orange classic combines strong tea, ice and usually milk. Ask for less sweetness if you want the tea itself to lead.",
  },
  {
    slug: "oliang",
    label: "Dark & aromatic",
    why: "Traditional Thai iced coffee with a deeper roasted profile. The blend, milk and sweetness vary by vendor.",
  },
  {
    slug: "coconut-water",
    label: "Fresh & simple",
    why: "A young coconut can be both a drink and a pause from the heat. Choose one opened in front of you.",
  },
  {
    slug: "nam-manao",
    label: "Tart & refreshing",
    why: "Lime, water, ice and often sugar. A useful contrast to creamy tea and coffee.",
  },
  {
    slug: "nam-anchan",
    label: "Floral & vivid",
    why: "Butterfly-pea flowers provide the blue colour; lime can visibly shift its shade.",
  },
  {
    slug: "nam-matoom",
    label: "Soft & herbal",
    why: "Dried bael fruit makes a fragrant drink that may be served warm or chilled.",
  },
];

const tasteCompass = [
  {
    icon: Milk,
    title: "Creamy & sweet",
    cue: "cha yen · nom yen",
    text: "Start here if you enjoy rich, dessert-like flavours. Condensed milk, evaporated milk or creamer may appear, so ask about dairy when it matters.",
  },
  {
    icon: Coffee,
    title: "Dark & roasted",
    cue: "oliang · Thai iced coffee",
    text: "For coffee drinkers who want a bolder street drink. The word “coffee” alone tells you little about milk, sugar or caffeine.",
  },
  {
    icon: Droplets,
    title: "Fresh & tart",
    cue: "nam manao · coconut water",
    text: "Refreshing does not automatically mean unsweetened. Ask about added sugar in lime, fruit and soda drinks.",
  },
  {
    icon: Leaf,
    title: "Floral & herbal",
    cue: "anchan · krajiab · matoom",
    text: "These drinks reveal a culture far broader than iced tea and beer. Recipes, colour and availability differ by vendor and season.",
  },
];

const catalogGroups = [
  {
    title: "Tea & coffee",
    subtitle: "Four approachable starting points",
    slugs: ["thai-iced-tea", "thai-milk-tea", "oliang", "thai-iced-coffee"],
  },
  {
    title: "Fruit, lime & sugar cane",
    subtitle: "Five different kinds of refreshment",
    slugs: [
      "coconut-water",
      "nam-manao",
      "manao-soda",
      "nam-oy",
      "sugarcane-juice",
    ],
  },
  {
    title: "Herbs, flowers & colour",
    subtitle: "Ten less familiar glasses",
    slugs: [
      "chrysanthemum-tea",
      "ginger-tea",
      "lemongrass-tea",
      "nam-anchan",
      "nam-bai-makrut",
      "nam-dok-anchan-manao",
      "nam-krajiab",
      "nam-matoom",
      "nom-yen",
      "sala-syrup-soda",
    ],
  },
  {
    title: "Beer & spirits",
    subtitle: "Six alcoholic routes for age 20+",
    slugs: [
      "singha-beer",
      "chang-beer",
      "leo-beer",
      "sangsom-rum",
      "mekong-whisky",
      "sato",
    ],
  },
];

const dayRoute = [
  {
    time: "07:00–10:00",
    title: "Morning",
    icon: Coffee,
    drink: "Oliang or Thai coffee",
    text: "Ask about milk and sugar before ordering. A chilled street coffee can be much sweeter than the coffee you drink at home.",
  },
  {
    time: "11:00–14:00",
    title: "Midday",
    icon: Sun,
    drink: "Coconut water or nam manao",
    text: "Choose a freshly opened or clearly prepared drink, and keep reliable drinking water alongside it.",
  },
  {
    time: "15:00–18:00",
    title: "Market pause",
    icon: GlassWater,
    drink: "Cha yen or a herbal drink",
    text: "Compare creamy with floral. Sharing two smaller drinks can make flavour more important than volume.",
  },
  {
    time: "After dinner",
    title: "Evening",
    icon: Martini,
    drink: "Alcohol-free or age 20+",
    text: "If you choose alcohol, check the venue, current rules and your transport home. Keep water part of the evening.",
  },
];

const orderingPhrases = [
  {
    thai: "หวานน้อย",
    latin: "waan noi",
    english: "less sweet",
    note: "Usually reduces added sugar, but it does not guarantee a sugar-free drink.",
  },
  {
    thai: "ไม่หวาน",
    latin: "mai waan",
    english: "not sweet / no added sugar",
    note: "A premixed base, syrup or condensed milk can still contain sugar.",
  },
  {
    thai: "ไม่ใส่นม",
    latin: "mai sai nom",
    english: "do not add milk",
    note: "For an allergy, also ask about powder, creamer, premixes and shared equipment.",
  },
  {
    thai: "ไม่ใส่น้ำแข็ง",
    latin: "mai sai nam khaeng",
    english: "without ice",
    note: "A practical request when the water source is uncertain, not a judgement on every venue.",
  },
];

const safetyChecks = [
  {
    icon: Droplets,
    title: "Choose drinking water deliberately",
    text: "CDC advises using unopened, factory-sealed water or adequately treated water wherever tap-water safety is uncertain. Use the same caution for brushing your teeth.",
  },
  {
    icon: GlassWater,
    title: "Ask how the drink is made",
    text: "Consider water, ice, raw juice, milk and storage temperature. A boiling-hot or factory-sealed drink has a different risk profile from a jug left standing in the heat.",
  },
  {
    icon: PackageCheck,
    title: "Check hidden ingredients",
    text: "Milk, creamer, nuts, caffeine and flavour mixes are not always visible. “No milk” is not enough for a serious allergy without an ingredient and cross-contact check.",
  },
  {
    icon: ShieldCheck,
    title: "Alcohol: age 20+ and locally regulated",
    text: "TAT reports general alcohol sales from 11:00 to 24:00 since 29 May 2026. Venue licences, prohibited places, elections and religious days can still change what is permitted.",
  },
];

const faqs = [
  {
    question: "What is a popular drink in Thailand?",
    answer:
      "Cha yen, the orange Thai iced tea commonly served with milk and ice, is one highly recognisable choice. Popularity varies by place and audience, so also look for oliang, coconut water, lime drinks and local herbal infusions rather than treating one drink as a national winner.",
  },
  {
    question: "What are traditional Thai drinks?",
    answer:
      "Traditional and established Thai drinks include cha yen, oliang, nam manao, coconut water, bael-fruit tea, roselle drink, butterfly-pea drink, chrysanthemum tea and regional rice-based alcohol such as sato. Not every drink is available everywhere or made to one fixed recipe.",
  },
  {
    question: "What is Thai iced tea made of?",
    answer:
      "The base is strongly brewed tea. A served cha yen commonly also includes sugar, ice and milk or creamer, but the blend and ratios differ. Check the actual ingredients if dairy, caffeine or sugar matters to you.",
  },
  {
    question: "Can you drink tap water in Thailand for tourists?",
    answer:
      "Municipal standards and building plumbing differ by place. CDC advises travellers not to put tap water in their mouths unless they are reasonably certain it is safe; unopened factory-sealed or adequately treated water is the conservative choice.",
  },
  {
    question: "How to tell if ice is safe in Thailand?",
    answer:
      "Appearance alone cannot prove that ice was made or handled safely. Established venues often use commercially supplied ice, but that is not a universal guarantee. Ask about the source or order without ice when you cannot reasonably establish that safe water was used.",
  },
  {
    question: "What is traditional Thai alcohol?",
    answer:
      "Regional rice drinks such as sato and locally established spirits are part of Thailand’s alcohol traditions, while Singha, Chang and Leo are commonly encountered beer brands. Availability and alcohol percentage can change, so check the label or menu. Thailand’s legal drinking age is 20.",
  },
];

const sources = [
  {
    title: "Alcohol sales and consumption rules updated in Thailand",
    creator: "TAT Newsroom · 29 May 2026",
    url: "https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/",
    note: "Current official visitor source for general sales hours, minimum age, prohibited places and venue-specific or temporary restrictions.",
  },
  {
    title: "Food and Water Precautions for Travelers",
    creator: "CDC Yellow Book · 2026 edition",
    url: "https://www.cdc.gov/yellow-book/hcp/preparing-international-travelers/food-and-water-precautions-for-travelers.html",
    note: "Travel-health source for sealed drinks, tap water, ice, hot beverages and safe-water uncertainty.",
  },
  {
    title: "Water Quality Standard",
    creator: "Metropolitan Waterworks Authority",
    url: "https://pdpa.mwa.co.th/en/knowledge-2/water-quality-information-2/water-quality-standard/",
    note: "Primary Bangkok-area utility source showing that treated MWA water follows WHO drinking-water parameters; it does not guarantee every building’s plumbing.",
  },
  {
    title: "Our History",
    creator: "ChaTraMue",
    url: "https://chatramue.com/pages/our-history",
    note: "Brand source used only for the development of red tea blends associated with Thai milk and black tea, not for health claims.",
  },
  {
    title: "Thai Iced Tea Recipe",
    creator: "Hot Thai Kitchen",
    url: "https://hot-thai-kitchen.com/thai-iced-tea/",
    note: "English SERP competitor used to compare recipe intent and identify where traveller-focused ordering and ingredient context were missing.",
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

function createSchemas(drinks: Drink[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en",
      mainEntityOfPage: PAGE_URL,
      image: [
        `https://go2-thailand.com${HERO_IMAGE}`,
        "https://go2-thailand.com/images/redesign/thai-drinks-cha-yen.webp",
      ],
      dateModified: "2026-07-26",
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
          name: "Thai drinks",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "25 Thai drinks",
      numberOfItems: drinks.length,
      itemListElement: drinks.map((drink, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: drink.name.en,
        url: `${PAGE_URL}${drink.slug}/`,
      })),
    },
  ];
}

export function ThaiDrinksGuideEn({ drinks }: ThaiDrinksGuideEnProps) {
  const subId = useSubId();
  const foodTourHref = withPlacementSubId(
    KLOOK_GENERIC,
    subId,
    "thai-drinks-food-tour-en",
  );
  const bySlug = new Map(drinks.map((drink) => [drink.slug, drink]));
  const schemas = createSchemas(drinks);

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        ogImage={`https://go2-thailand.com${HERO_IMAGE}`}
      >
        <meta
          name="keywords"
          content="Thai drinks, traditional Thai drinks, Thai drinks non alcoholic, Thai iced tea, Thai coffee drinks, Thai alcoholic drinks"
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
          eyebrow="Taste Thailand in layers"
          title={
            <>
              Twenty-five glasses.
              <br />
              One useful route.
            </>
          }
          subtitle="From cha yen to anchan, without flattening a whole drinks culture into one winner."
          description={
            <>
              Compare sweetness, milk, caffeine, water and the moment of
              day—then order a Thai drink that actually suits you.
            </>
          }
          image={HERO_IMAGE}
          imageAlt="Editorial spread of Thai iced tea, oliang, coconut water, lime and butterfly-pea drinks near Wat Arun"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Food & drink", href: "/food/" },
            { label: "Thai drinks" },
          ]}
          actions={[
            { label: "Find your first drink", href: "#start", kind: "primary" },
            {
              label: "See all 25 drinks",
              href: "#all-drinks",
              kind: "secondary",
            },
          ]}
          minHeightClassName="min-h-[900px] lg:min-h-[740px]"
          contentClassName="max-w-[755px]"
          titleClassName="max-w-[790px] text-[3.45rem] leading-[0.86] sm:text-[4.65rem] lg:text-[5.45rem]"
          subtitleClassName="max-w-[670px] text-[1.4rem] leading-[1.06] text-saffron-dark sm:text-[1.9rem]"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.78)_54%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_39%,rgba(4,38,32,0.08)_67%,rgba(4,30,25,0.02)_100%)]"
          sideCard={
            <div className="absolute bottom-8 right-[5vw] z-20 hidden w-[338px] overflow-hidden rounded-[26px] border border-white/65 bg-canvas/94 shadow-editorial-lift backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-6 py-5">
                <p className="eyebrow !mb-0">Taste passport</p>
                <GlassWater size={20} className="text-jade" />
              </div>
              <div className="space-y-4 p-6 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">In this guide</span>
                  <strong className="text-right text-jade">
                    25 drinks · 9 categories
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Choose by</span>
                  <strong className="text-right text-jade">
                    4 flavour families
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Ordering</span>
                  <strong className="text-right text-jade">
                    4 useful phrases
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-charcoal/50">Alcohol</span>
                  <strong className="text-right text-saffron-dark">
                    Age 20+ · check rules
                  </strong>
                </div>
              </div>
            </div>
          }
        />

        <PageSectionNav items={navItems} />

        <section className="section-divider-bottom bg-canvas py-7">
          <div className="container-custom grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: GlassWater,
                label: "Collection",
                value: `${drinks.length} drink routes`,
              },
              { icon: Languages, label: "Ordering", value: "Sweetness + milk" },
              {
                icon: Droplets,
                label: "Drinking water",
                value: "Sealed or treated",
              },
              { icon: ShieldCheck, label: "Alcohol", value: "Age 20 and over" },
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
          id="start"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid items-end gap-10 lg:grid-cols-[0.73fr_1.27fr]">
              <div>
                <SectionHeading
                  eyebrow="Start with flavour, not a ranking"
                  title={
                    <>
                      What belongs
                      <br />
                      in your glass?
                    </>
                  }
                  description="The best-known name is not automatically your best first drink. Choose creamy, roasted, fresh or herbal first; then check sweetness, milk and caffeine."
                />
                <p className="mt-6 text-sm font-medium leading-7 text-charcoal/66">
                  A useful guide helps you decide. It should not turn an
                  unverified “national drink” or “healthiest choice” into a
                  fact.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {tasteCompass.map(({ icon: Icon, title, cue, text }, index) => (
                  <article
                    key={title}
                    className={`min-h-[235px] rounded-[24px] border p-6 ${index === 0 ? "border-saffron/25 bg-saffron/[0.07]" : "border-jade/10 bg-white"}`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        size={23}
                        className={
                          index === 0 ? "text-saffron-dark" : "text-jade"
                        }
                      />
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-charcoal/38">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                    <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                      {cue}
                    </p>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-14 divide-y divide-jade/10 border-y border-jade/10">
              {firstSips.map((item) => {
                const drink = bySlug.get(item.slug);
                if (!drink) return null;
                return (
                  <Link
                    key={item.slug}
                    href={`/drinks/${item.slug}/`}
                    className="group grid gap-5 py-5 sm:grid-cols-[92px_170px_1fr_32px] sm:items-center"
                  >
                    <div className="relative h-24 overflow-hidden rounded-2xl">
                      <Image
                        src={drink.image}
                        alt={drink.name.en}
                        fill
                        sizes="92px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">
                        {item.label}
                      </p>
                      <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">
                        {drink.name.en}
                      </h3>
                      <p className="mt-1 font-thai text-xs text-charcoal/45">
                        {drink.name.thai}
                      </p>
                    </div>
                    <p className="text-xs font-medium leading-6 text-charcoal/64">
                      {item.why}
                    </p>
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-jade/12 text-jade transition group-hover:border-saffron/45 group-hover:text-saffron-dark">
                      <ChevronRight size={15} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="taste-route"
          className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"
        >
          <div className="container-custom grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <Image
                src="/images/redesign/thai-drinks-cha-yen.webp"
                alt="Thai street vendor pouring cha yen through a traditional tea filter"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#052f29]/75 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5 text-white sm:inset-x-8 sm:bottom-8">
                <div>
                  <p className="eyebrow !text-saffron-light">
                    One glass, four choices
                  </p>
                  <p className="max-w-md font-display text-[1.9rem] font-semibold leading-none">
                    Tea · sweetness · milk · ice
                  </p>
                </div>
                <GlassWater size={28} className="shrink-0 text-saffron-light" />
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Cha yen, unpacked"
                title={
                  <>
                    Orange is
                    <br />
                    not a recipe.
                  </>
                }
                description="Vendors do not all use the same tea blend, milk, creamer, sugar or ratio. One extra question can change the drink you receive."
              />
              <div className="mt-8 space-y-5">
                {[
                  [
                    "01",
                    "Ask about sweetness",
                    "“Waan noi” is more useful than assuming every cha yen must be extremely sweet.",
                  ],
                  [
                    "02",
                    "Check the milk",
                    "Condensed milk, evaporated milk and creamer are different ingredients and can appear together.",
                  ],
                  [
                    "03",
                    "Treat caffeine as real",
                    "Strong tea and coffee still contain caffeine even when ice and milk soften the flavour.",
                  ],
                  [
                    "04",
                    "Compare one element",
                    "Taste cha yen beside Thai black tea or a herbal drink to separate tea, milk and sugar.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="grid grid-cols-[38px_1fr] gap-4 border-t border-jade/10 pt-4"
                  >
                    <span className="text-[10px] font-extrabold text-saffron-dark">
                      {number}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-jade">
                        {title}
                      </h3>
                      <p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-7 text-sm font-medium leading-7 text-charcoal/66">
                Want to go deeper into coffee? The{" "}
                <InlineLink href="/blog/bangkok-specialty-coffee-cafe-guide-2026/">
                  Bangkok specialty-coffee guide
                </InlineLink>{" "}
                compares neighbourhood, brew method and café rhythm.
              </p>
            </div>
          </div>

          <div className="container-custom mt-16">
            <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading
                eyebrow="One day, four tasting moments"
                title="Leave space between glasses."
                description="A taste route is not a drinking challenge. Alternate sweet or caffeinated drinks with food, rest and reliable drinking water."
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">
                This route stays intentionally timeless: no shop, price or
                opening time is presented as guaranteed. Use it at a market, on
                a food tour or during your own city walk.
              </p>
            </div>
            <div className="relative mt-10 grid gap-4 lg:grid-cols-4">
              <div
                aria-hidden="true"
                className="absolute left-[8%] right-[8%] top-8 hidden border-t-2 border-dotted border-saffron/55 lg:block"
              />
              {dayRoute.map(
                ({ time, title, icon: Icon, drink, text }, index) => (
                  <article
                    key={title}
                    className="relative z-10 min-h-[285px] rounded-[24px] border border-jade/10 bg-canvas p-6 shadow-editorial-card"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-tonal bg-saffron text-white">
                      <Icon size={21} />
                    </span>
                    <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                      {time} · stop 0{index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-extrabold text-jade">
                      {drink}
                    </p>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">
                      {text}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="all-drinks"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
              <SectionHeading
                eyebrow="The complete collection"
                title={
                  <>
                    All 25.
                    <br />
                    Without card fatigue.
                  </>
                }
                description="These four rows lead to every existing drink detail. Choose a family here, then use the detail page for ingredients, flavour and context."
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">
                Two sugar-cane entries in the current collection describe nearly
                the same drink under English and Thai naming. Both remain
                discoverable, but we do not pretend they represent entirely
                different traditions.
              </p>
            </div>
            <div className="mt-12 divide-y divide-jade/10 border-y border-jade/10">
              {catalogGroups.map((group, groupIndex) => (
                <section
                  key={group.title}
                  className="grid gap-6 py-8 lg:grid-cols-[235px_1fr]"
                >
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                      0{groupIndex + 1} · {group.subtitle}
                    </p>
                    <h2 className="mt-2 font-display text-[1.85rem] font-semibold leading-none text-jade">
                      {group.title}
                    </h2>
                  </div>
                  <div className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
                    {group.slugs.map((slug) => {
                      const drink = bySlug.get(slug);
                      if (!drink) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/drinks/${slug}/`}
                          className="group flex items-center justify-between gap-4 border-b border-jade/8 py-3 text-sm font-extrabold text-jade"
                        >
                          <span>
                            <span className="block">{drink.name.en}</span>
                            <span className="mt-1 block font-thai text-[10px] font-medium text-charcoal/42">
                              {drink.name.thai}
                            </span>
                          </span>
                          <ArrowRight
                            size={14}
                            className="shrink-0 text-saffron transition group-hover:translate-x-1"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section
          id="ordering"
          className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-24"
        >
          <div className="container-custom grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow !text-saffron-light">
                Order without theatre
              </p>
              <h2 className="font-display text-[3.25rem] font-semibold leading-[0.9] tracking-[-0.04em] sm:text-[4.25rem]">
                Four phrases that change the drink.
              </h2>
              <p className="mt-6 text-sm font-medium leading-7 text-white/68">
                Show the Thai text when pronunciation is difficult. A friendly
                request helps; a serious allergy still requires a clear
                ingredient and cross-contact check.
              </p>
              <div className="mt-8 rounded-2xl border border-white/14 bg-white/[0.06] p-5">
                <HeartHandshake size={22} className="text-saffron-light" />
                <p className="mt-4 text-xs font-extrabold text-white">
                  Start with “sawatdee” and point calmly.
                </p>
                <p className="mt-2 text-xs leading-6 text-white/58">
                  You do not need perfect Thai. Clarity, patience and respect
                  work better than repeating a phonetic phrase loudly.
                </p>
              </div>
            </div>
            <div className="divide-y divide-white/12 border-y border-white/12">
              {orderingPhrases.map((phrase, index) => (
                <div
                  key={phrase.thai}
                  className="grid gap-4 py-6 sm:grid-cols-[64px_170px_1fr] sm:items-center"
                >
                  <span className="text-[10px] font-extrabold text-saffron-light">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-thai text-[1.8rem] font-semibold leading-none">
                      {phrase.thai}
                    </p>
                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/45">
                      {phrase.latin} · {phrase.english}
                    </p>
                  </div>
                  <p className="text-xs font-medium leading-6 text-white/62">
                    {phrase.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="drink-safely"
          className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"
        >
          <div className="container-custom">
            <div className="relative min-h-[430px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <Image
                src="/images/redesign/thai-drinks-hydration-route.webp"
                alt="Travel stop with a reusable bottle, sealed water, coconut and lime drink at sunset"
                fill
                sizes="100vw"
                className="object-cover object-[65%_center] sm:object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,31,26,0.98)_0%,rgba(3,31,26,0.9)_38%,rgba(3,31,26,0.18)_68%,rgba(3,31,26,0.02)_100%)]" />
              <div className="relative z-10 flex min-h-[430px] max-w-[650px] flex-col justify-center p-7 text-white sm:p-11 lg:p-14">
                <p className="eyebrow !text-saffron-light">
                  Hydration is the base route
                </p>
                <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] sm:text-[4rem]">
                  A beautiful drink does not replace safe water.
                </h2>
                <p className="mt-5 max-w-[580px] text-sm font-medium leading-7 text-white/68">
                  Bangkok’s MWA treats municipal water to stated quality
                  standards, but conditions and building plumbing are not
                  identical everywhere. CDC’s traveller rule is practical: when
                  you are not reasonably certain, use unopened factory-sealed or
                  adequately treated water, including for ice and brushing
                  teeth.
                </p>
                <Link
                  href="/practical-info/health-vaccinations/"
                  className="btn-cream mt-7 w-fit"
                >
                  Plan health & preparation{" "}
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {safetyChecks.map(({ icon: Icon, title, text }, index) => (
                <article
                  key={title}
                  className="grid gap-5 border-t border-jade/12 py-6 sm:grid-cols-[52px_1fr]"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 3 ? "bg-saffron/[0.1] text-saffron-dark" : "bg-jade/[0.06] text-jade"}`}
                  >
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.65rem] font-semibold leading-none text-jade">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                      {text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs font-medium leading-6 text-charcoal/58">
              For current official safety advice, consult your government’s
              Thailand travel advisory and a qualified travel-health
              professional. This page provides preparation context, not
              individual medical advice.
            </p>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="Taste with context"
                title={
                  <>
                    A food tour can help.
                    <br />
                    The listing still leads.
                  </>
                }
                description="A guided market or food tour can add ingredient, language and cultural context. This button deliberately opens a broad Klook destination: search for food tour, street food or cooking class and verify the actual inclusions."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  [
                    "Route",
                    "Which market or neighbourhood is actually visited, and how much walking or transport is involved?",
                  ],
                  [
                    "Tastings",
                    "Which drinks and portions are confirmed, and are alcohol-free options available?",
                  ],
                  [
                    "Diet",
                    "Can the operator safely handle the allergy or dietary requirement you have?",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-jade/10 bg-white p-5"
                  >
                    <h3 className="text-sm font-extrabold text-jade">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/60">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href={foodTourHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="btn-jade btn-jade-pattern mt-7 w-fit"
              >
                Check current food tours on Klook{" "}
                <ExternalLink size={15} className="text-saffron" />
              </a>
              <AffiliateDisclosure className="mt-4">
                Klook is an affiliate link. Go2Thailand may earn a commission at
                no extra cost to you. This broad button does not guarantee a
                specific tour, drink, stop or availability.
              </AffiliateDisclosure>
            </div>

            <aside className="overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="eyebrow !text-saffron-light">
                    For the road and home
                  </p>
                  <h2 className="font-display text-[2.65rem] font-semibold leading-[0.92]">
                    Two relevant Amazon routes.
                  </h2>
                </div>
                <BookOpenCheck
                  size={26}
                  className="shrink-0 text-saffron-light"
                />
              </div>
              <p className="mt-5 text-xs font-medium leading-6 text-white/62">
                No generic gadget carousel: one reusable bottle for water you
                already trust, and one Thai tea mix for exploring cha yen at
                home.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <a
                  href="/go/owala-freesip-24oz/"
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="group flex min-h-[235px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]"
                >
                  <Droplets size={23} className="text-saffron-light" />
                  <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">
                    For trusted fill water
                  </p>
                  <h3 className="mt-2 font-display text-[1.55rem] font-semibold">
                    Insulated water bottle
                  </h3>
                  <p className="mt-3 text-[11px] font-medium leading-5 text-white/58">
                    The bottle does not purify tap water. Fill it only with
                    water you trust; check size, cleaning requirements, seller
                    and current availability.
                  </p>
                  <span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">
                    Check current Amazon offer{" "}
                    <ExternalLink size={13} className="text-saffron-light" />
                  </span>
                </a>
                <a
                  href="/go/chatramue-original-thai-tea/"
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="group flex min-h-[235px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]"
                >
                  <Leaf size={23} className="text-saffron-light" />
                  <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">
                    For tasting at home
                  </p>
                  <h3 className="mt-2 font-display text-[1.55rem] font-semibold">
                    Original Thai Tea mix
                  </h3>
                  <p className="mt-3 text-[11px] font-medium leading-5 text-white/58">
                    Check ingredients, caffeine, preparation, shelf life, seller
                    and local availability. Your recipe still determines the
                    milk and sugar.
                  </p>
                  <span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">
                    Check current Amazon offer{" "}
                    <ExternalLink size={13} className="text-saffron-light" />
                  </span>
                </a>
              </div>
              <AffiliateDisclosure className="mt-5 !text-white/55">
                As an Amazon Associate we earn from qualifying purchases.
                OneLink attempts to send you to a suitable local Amazon store;
                product, price and stock vary by country.
              </AffiliateDisclosure>
            </aside>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real questions from English search results"
          title="Frequently asked questions about Thai drinks"
          description="These questions were selected verbatim from the researched English SERP/PAA sets. The answers separate taste, drinking-water uncertainty and current law."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Continue planning food and drink"
          title="From one glass to markets, coffee and curry"
          guides={[
            {
              title: "Choose a Thai curry",
              description:
                "Compare green, red, yellow, massaman and panang by flavour rather than colour alone.",
              href: "/blog/thai-curry-guide-green-red-yellow-massaman-panang/",
              image: "/images/redesign/thai-curry-guide-hero.webp",
            },
            {
              title: "Bangkok coffee route",
              description:
                "Choose a neighbourhood, brew method and café rhythm for specialty coffee in Bangkok.",
              href: "/blog/bangkok-specialty-coffee-cafe-guide-2026/",
              image: "/images/redesign/bangkok-coffee-hero.webp",
            },
            {
              title: "Eating at 7-Eleven",
              description:
                "Build a practical basket and check labels, sugar, refrigeration and allergens.",
              href: "/travel-guides/7-eleven-thailand/",
              image: "/images/redesign/seven-eleven-thailand-food.webp",
            },
          ]}
        />

        <SourceMethodSection
          title="Researched as a decision guide, not a popularity contest."
          description="This English owner uses four DFS keyword clusters, twelve current English SERP/PAA sets, eight existing rankings, three competitor parses and current primary water and alcohol sources. Fixed street prices, timeless beer percentages, health promises and unsupported national rankings were removed."
          sources={sources}
        />
      </div>
    </>
  );
}
