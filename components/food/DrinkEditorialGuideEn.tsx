import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Coffee,
  ExternalLink,
  GlassWater,
  Languages,
  Leaf,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

interface Drink {
  slug: string;
  name: { en: string; thai?: string };
  category?: string;
  type?: string;
  description?: { en?: string };
  enhanced_description?: string;
  ingredients?: string[];
  detailed_ingredients?: Array<{ name: string; purpose?: string }>;
  allergens?: string[];
  dietary?: string[];
  image?: string;
  temperature?: string;
  alcohol_content?: string;
  caffeine?: string;
  occasions?: string[];
  preparation_method?: { overview?: string; steps?: string[]; tips?: string[] };
  cultural_significance?: { history?: string };
}

const SITE = "https://go2-thailand.com";

const amazonBySlug: Record<string, { href: string; title: string; copy: string }> = {
  "thai-iced-tea": {
    href: "/go/chatramue-original-thai-tea/",
    title: "Thai tea blend for home",
    copy: "Useful only if you want to recreate the characteristic tea base. Check the ingredient label, pack size, seller and current local price before buying.",
  },
  "thai-milk-tea": {
    href: "/go/chatramue-original-thai-tea/",
    title: "Thai tea blend for home",
    copy: "A practical starting point for a home version; milk, sweetness and ice still remain your own choices. Check the current label, seller and price.",
  },
  "thai-iced-coffee": {
    href: "/go/aeropress-go-travel-coffee-maker/",
    title: "Compact travel coffee maker",
    copy: "Relevant for travellers who want to brew their own coffee rather than imitate a vendor recipe. Check the current package, seller and price.",
  },
  oliang: {
    href: "/go/aeropress-go-travel-coffee-maker/",
    title: "Compact travel coffee maker",
    copy: "A portable brewer can be useful for coffee-focused trips, although an oliang blend and vendor technique are separate choices.",
  },
};

const labelMap: Record<string, string> = {
  hot: "Usually served hot",
  cold: "Usually served cold",
  both: "Served hot or cold",
  room: "Often room temperature",
  neat: "Often served neat",
  mixed: "Commonly mixed",
};

function textOr(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function makeFaqs(drink: Drink) {
  const name = drink.name.en;
  const hasAlcohol = drink.alcohol_content && drink.alcohol_content !== "none";
  return [
    {
      question: `What is ${name}?`,
      answer: textOr(
        drink.enhanced_description || drink.description?.en,
        `${name} is a Thai drink whose recipe and presentation can vary by vendor and region.`,
      ),
    },
    {
      question: `What is usually in ${name}?`,
      answer: drink.ingredients?.length
        ? `A common version uses ${drink.ingredients.join(", ")}. Treat this as a recipe clue, not an ingredient guarantee: premixes, toppings and vendor methods differ.`
        : `Recipes vary. Ask the vendor about the base, sweetener, milk, caffeine, alcohol and any premix when those details matter.`,
    },
    {
      question: `Is ${name} suitable for allergies or a special diet?`,
      answer: `A dish or drink name cannot confirm suitability. Ask about the complete ingredient list and cross-contact, including premixes, milk or creamer, nuts, colourings and shared utensils. For a serious allergy, use a professionally translated allergy card and do not rely on this guide alone.`,
    },
    {
      question: `How should I order ${name} in Thailand?`,
      answer: `Start by asking how it is prepared, then choose sweetness, ice and milk where the recipe allows it. “Waan noi” asks for less sweetness, but a premixed base may still contain sugar.`,
    },
    ...(hasAlcohol
      ? [{
          question: `How strong is ${name}?`,
          answer: `Strength can vary by product, batch and serve. Check the current bottle label or venue menu rather than relying on a fixed percentage online. Thailand’s minimum legal drinking age is 20, and local sales restrictions can change.`,
        }]
      : []),
  ];
}

function schemas(drink: Drink, title: string, description: string, image: string) {
  const canonical = `${SITE}/drinks/${drink.slug}/`;
  const faqs = makeFaqs(drink);
  const result: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      inLanguage: "en-GB",
      mainEntityOfPage: canonical,
      image: `${SITE}${image}`,
      dateModified: "2026-08-01",
      author: { "@type": "Organization", name: "Go2Thailand.com", url: `${SITE}/` },
      publisher: { "@type": "Organization", name: "Go2Thailand.com", url: `${SITE}/` },
      about: [{ "@type": "Thing", name: drink.name.en }, { "@type": "Country", name: "Thailand" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Thailand", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Thai drinks", item: `${SITE}/drinks/` },
        { "@type": "ListItem", position: 3, name: drink.name.en, item: canonical },
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
  ];

  if ((drink.ingredients?.length || 0) >= 2 && (drink.preparation_method?.steps?.length || 0) >= 2) {
    result.push({
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: drink.name.en,
      description,
      image: `${SITE}${image}`,
      recipeCuisine: "Thai",
      recipeCategory: "Drink",
      recipeIngredient: drink.ingredients,
      recipeInstructions: drink.preparation_method?.steps?.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: step,
      })),
    });
  }
  return result;
}

export function DrinkEditorialGuideEn({ drink }: { drink: Drink }) {
  const name = drink.name.en;
  const baseDescription = textOr(
    drink.enhanced_description || drink.description?.en,
    `A practical guide to ${name}: taste, ingredients, ordering, dietary checks and where it fits in a Thailand trip.`,
  );
  const description = baseDescription.length >= 100
    ? baseDescription
    : `${baseDescription.replace(/[.!?]?$/, '.')} Learn its common ingredients, how to order it, and which dietary, caffeine or alcohol details to verify in Thailand.`;
  const title = `${name}: taste, ingredients and how to order it`;
  const image = drink.image || "/images/redesign/thai-drinks-hero.webp";
  const ingredients = drink.detailed_ingredients?.length
    ? drink.detailed_ingredients.map((item) => ({ name: item.name, note: item.purpose || "Recipe role varies by maker." }))
    : (drink.ingredients || []).map((ingredient) => ({ name: ingredient, note: "Common recipe signal; verify the actual serve." }));
  const affiliate = amazonBySlug[drink.slug];
  const faqs = makeFaqs(drink);
  const hasAlcohol = drink.alcohol_content && drink.alcohol_content !== "none";
  const quickFacts = [
    { label: "Category", value: textOr(drink.category, "Thai drink") },
    { label: "Serve", value: labelMap[drink.temperature || ""] || textOr(drink.temperature, "Varies") },
    { label: "Caffeine", value: drink.caffeine === "none" ? "No expected caffeine" : textOr(drink.caffeine, "Check the recipe") },
    { label: "Alcohol", value: hasAlcohol ? "Age 20+ · check label" : "Non-alcoholic base" },
  ];

  return (
    <>
      <SEOHead title={title} description={description} ogImage={`${SITE}${image}`}>
        <meta property="og:type" content="article" />
        {schemas(drink, title, description, image).map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal" data-premium-template="drink-editorial">
        <EditorialHero
          image={image}
          imageAlt={`${name}, a Thai drink, served ready to taste`}
          breadcrumbs={[{ label: "Thailand", href: "/" }, { label: "Thai drinks", href: "/drinks/" }, { label: name }]}
          eyebrow={`${textOr(drink.category, "Thai drink")} · order with context`}
          title={name}
          subtitle={drink.name.thai ? <span lang="th">{drink.name.thai}</span> : undefined}
          description={description}
          actions={[{ label: "Know what to ask", href: "#ingredients", kind: "primary" }, { label: "How to order", href: "#order", kind: "secondary" }]}
          minHeightClassName="min-h-[760px] lg:min-h-[690px]"
          contentTone="light"
          gradientClassName="bg-[linear-gradient(180deg,rgba(7,41,35,.08)_0%,rgba(7,41,35,.76)_56%,rgba(7,41,35,.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,41,35,.98)_0%,rgba(7,41,35,.9)_38%,rgba(7,41,35,.2)_70%,rgba(7,41,35,.04)_100%)]"
          sideCard={<aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-20 hidden w-[320px] rounded-2xl border border-white/15 bg-jade/84 p-6 text-white shadow-editorial-lift backdrop-blur-xl xl:block"><p className="eyebrow !text-saffron-light">At a glance</p><dl className="mt-5 grid gap-4">{quickFacts.map((fact) => <div key={fact.label} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-0"><dt className="text-[9px] font-extrabold uppercase tracking-[.13em] text-white/45">{fact.label}</dt><dd className="max-w-[175px] text-right text-xs font-extrabold">{fact.value}</dd></div>)}</dl></aside>}
        />

        <PageSectionNav label="On this page" items={[
          { href: "#taste", label: "Taste", icon: Sparkles },
          { href: "#ingredients", label: "Ingredients", icon: ShoppingBasket },
          { href: "#order", label: "Order", icon: Languages },
          { href: "#safety", label: "Safety", icon: ShieldCheck },
          { href: "#questions", label: "Questions", icon: Leaf },
        ]} />

        <section id="taste" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <SectionHeading eyebrow="Read the glass" title="A name is the start, not the whole recipe." description="Sweetness, milk, ice, caffeine, alcohol and preparation can differ between a street cart, café, restaurant and packaged bottle." />
            <div className="grid gap-px overflow-hidden rounded-[26px] border border-jade/10 bg-jade/10 sm:grid-cols-2">
              {quickFacts.map((fact, index) => <article key={fact.label} className={`${index % 2 ? "bg-mist" : "bg-white"} min-h-36 p-7`}><p className="eyebrow">{fact.label}</p><h2 className="mt-4 font-display text-[2rem] font-semibold leading-none text-jade">{fact.value}</h2></article>)}
            </div>
          </div>
        </section>

        <section id="ingredients" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Ingredient boundary" title="Common signals. Always check the actual serve." description="Premixes and toppings can introduce sugar, dairy, caffeine or allergens that are not obvious from the drink name." />
            <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2 lg:grid-cols-4">
              {(ingredients.length ? ingredients : [{ name: "Vendor recipe", note: "Ask about the base, sweetener, milk, ice and any premix." }]).map((item, index) => <article key={`${item.name}-${index}`} className="bg-white p-6"><span className="text-[10px] font-black text-saffron-dark">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 font-display text-[1.55rem] font-semibold text-jade">{item.name}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{item.note}</p></article>)}
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><AlertTriangle className="text-saffron-dark" /><h3 className="mt-5 font-display text-[1.9rem] font-semibold text-jade">Allergy boundary</h3><p className="mt-3 text-sm font-medium leading-7 text-charcoal/70">Listed allergens are clues, never a guarantee. Ask about premixes, milk or creamer, nuts, shared blenders and utensils. With a serious allergy, use a professionally translated allergy card.</p></article>
              <article className="rounded-2xl bg-jade p-7 text-white shadow-editorial-card"><PackageCheck className="text-saffron-light" /><h3 className="mt-5 font-display text-[1.9rem] font-semibold">Packaged versus made to order</h3><p className="mt-3 text-sm font-medium leading-7 text-white/70">A sealed product gives you a label to inspect. A made-to-order drink lets you ask for changes, but only the vendor can confirm the real recipe and cross-contact.</p></article>
            </div>
          </div>
        </section>

        <section id="order" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <SectionHeading eyebrow="Order in three decisions" title={`Make ${name} fit the moment.`} description="Short questions beat assumptions—especially with sugar, milk, ice, caffeine and alcohol." />
            <div className="relative grid gap-4 md:grid-cols-3">
              {[
                ["1", "Ask what is inside", "Confirm the base, premix, milk, sweetener and toppings before requesting changes."],
                ["2", "Choose sweetness and ice", "Waan noi means less sweet; mai waan asks for no added sweetness. Premixes may already contain sugar."],
                ["3", "Check the setting", "For alcohol, confirm the label, age and current local rules. For water or ice uncertainty, choose sealed or adequately treated drinks."],
              ].map(([number, heading, copy]) => <article key={number} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-sm font-black text-white">{number}</span><h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">{heading}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section id="safety" className="section-divider-bottom scroll-mt-24 bg-mist py-14 lg:py-20">
          <div className="container-custom grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <article className="rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10"><ShieldCheck className="text-saffron-light" /><p className="eyebrow mt-6 !text-saffron-light">Food, water & alcohol</p><h2 className="font-display text-[3rem] font-semibold leading-[.9]">Use a layered safety check.</h2><ul className="mt-8 grid gap-4 text-sm font-medium leading-7 text-white/72"><li>Choose unopened factory-sealed or adequately treated water when safety is uncertain.</li><li>Freshly hot drinks and correctly refrigerated ingredients have different risk profiles from drinks left standing.</li><li>Appearance cannot prove ice or water safety; ask the venue when uncertain.</li>{hasAlcohol ? <li>Check the current bottle label, minimum age and venue-specific sales rules; do not drive after drinking.</li> : null}</ul></article>
            <aside className="rounded-[28px] border border-jade/10 bg-white p-8 shadow-editorial-card"><MapPin className="text-jade" /><p className="eyebrow mt-6">Where to try it</p><h2 className="font-display text-[2.5rem] font-semibold leading-none text-jade">Follow the drink, not a frozen venue list.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Availability changes. Look at market drink stalls, cafés, restaurants and supermarkets, then verify the current menu, ingredients and preparation at the point of purchase.</p><Link href="/drinks/" className="btn-jade btn-jade-pattern mt-6">Compare all Thai drinks <ArrowRight size={14} className="text-saffron" /></Link></aside>
          </div>
        </section>

        {affiliate ? <section className="section-divider-bottom py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 rounded-[28px] border border-jade/10 bg-white p-8 shadow-editorial-card lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><Coffee className="text-jade" /><p className="eyebrow mt-5">Useful at home</p><h2 className="font-display text-[2.7rem] font-semibold leading-[.9] text-jade">{affiliate.title}</h2></div><div><p className="text-sm font-medium leading-7 text-charcoal/68">{affiliate.copy}</p><a href={affiliate.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern mt-6">Check current price on Amazon <ExternalLink size={14} className="text-saffron" /></a><AffiliateDisclosure className="mt-4">Amazon affiliate link through our central OneLink-compatible `/go/` route. As an Amazon Associate we earn from qualifying purchases. Store, seller, price and availability can differ by country.</AffiliateDisclosure></div></div></div></section> : null}

        {drink.preparation_method?.steps?.length ? <section className="section-divider-bottom bg-tonal py-14 lg:py-20"><div className="container-custom grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Home method" title={`Make a version of ${name}`} description="This is a recipe route, not a claim that every Thai vendor uses the same formula." /><ol className="grid gap-3">{drink.preparation_method.steps.map((step, index) => <li key={`${step}-${index}`} className="flex gap-4 rounded-xl border border-jade/10 bg-white p-5 text-sm font-medium leading-7 text-charcoal/68"><span className="font-black text-saffron-dark">{index + 1}</span>{step}</li>)}</ol></div></section> : null}

        <FaqSplitSection id="questions" eyebrow="Practical questions" title={`${name}: what travellers ask`} description="Answers preserve the difference between a common recipe and the drink actually served in front of you." items={faqs} />
        <RelatedGuidesSection eyebrow="Keep tasting" title="Three useful next steps" guides={[
          { title: "Thai drinks guide", description: "Compare 25 drinks by flavour, time of day and ordering decision.", href: "/drinks/", image: "/images/redesign/thai-drinks-cha-yen.webp" },
          { title: "Thai food guide", description: "Pair drinks with dishes without reducing Thai cuisine to one top-ten list.", href: "/food/", image: "/images/redesign/thailand-food-hub-hero.webp" },
          { title: "Thailand street food", description: "Use practical stall, water, allergen and ordering checks on the ground.", href: "/thailand-street-food/", image: "/images/redesign/thailand-food-street-banner.webp" },
        ]} readLabel="Open guide" />
        <SourceMethodSection eyebrow="Sources & evidence boundary" title="Safety guidance comes from primary public-health sources." description="Drink identity and common ingredients come from the route data; this page deliberately avoids fixed street prices, timeless alcohol percentages, health promises and ingredient guarantees. Vendor-level availability and ingredients remain a live check." sources={[
          { title: "Food and Water Precautions for Travelers", creator: "CDC Yellow Book · 2026 edition", url: "https://www.cdc.gov/yellow-book/hcp/preparing-international-travelers/food-and-water-precautions-for-travelers.html", note: "Traveller-health guidance for sealed drinks, water, ice, hot drinks and uncertainty." },
          { title: "Five keys to safer food", creator: "World Health Organization", url: "https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food", note: "Primary food-safety framework for clean handling, separation, cooking, temperature and safe water." },
          { title: "Allergies and Travel", creator: "US Centers for Disease Control and Prevention", url: "https://wwwnc.cdc.gov/travel/page/allergies", note: "Official traveller guidance supporting translated allergy cards, medication planning and direct communication with food preparers." },
          { title: "Alcohol rules for visitors", creator: "Tourism Authority of Thailand Newsroom · 29 May 2026", url: "https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/", note: "Current visitor-facing source for minimum age and general, venue-specific or temporary restrictions." },
        ]} />
      </div>
    </>
  );
}
