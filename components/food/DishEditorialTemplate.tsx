import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, ArrowRight, BookOpen, Check, ChefHat, ExternalLink, Leaf, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

export interface DishEditorialData {
  title: string;
  description: string;
  canonical: string;
  updatedAt: string;
  name: string;
  thaiName?: string;
  heroImage: string;
  heroAlt: string;
  heroEyebrow: string;
  lead: string;
  quickFacts: Array<{ label: string; value: string; icon: LucideIcon }>;
  navItems: PageSectionNavItem[];
  taste: { intro: string; texture: string; finish: string; scores: Array<{ label: string; value: number }> };
  ingredients: Array<{ name: string; role: string }>;
  allergenCopy: string;
  vegetarianCopy: string;
  formats: Array<{ title: string; bestFor: string; tradeOff: string }>;
  orderSteps: Array<{ title: string; text: string }>;
  cooking: { title: string; intro: string; steps: string[]; boundary: string };
  affiliates: Array<{ href: string; title: string; text: string }>;
  classHref: string;
  classCopy: string;
  classSignals: Array<{ title: string; text: string }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt?: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
}

function absoluteImage(src: string) {
  return src.startsWith('http') ? src : `https://go2-thailand.com${src}`;
}

function TasteMeter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[.13em] text-white/65"><span>{label}</span><span>{value}/5</span></div>
      <div className="grid grid-cols-5 gap-1.5" aria-label={`${label}: ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((step) => <span key={step} className={`h-1.5 rounded-full ${step <= value ? 'bg-saffron' : 'bg-white/14'}`} />)}
      </div>
    </div>
  );
}

function schemas(data: DishEditorialData) {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', headline: data.title, description: data.description,
      inLanguage: 'en-GB', mainEntityOfPage: data.canonical, image: absoluteImage(data.heroImage), dateModified: data.updatedAt,
      author: { '@type': 'Organization', name: 'Go2Thailand.com', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand.com', url: 'https://go2-thailand.com/' },
      about: [{ '@type': 'Thing', name: data.name }, { '@type': 'Country', name: 'Thailand' }],
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Thai food', item: 'https://go2-thailand.com/food/' },
        { '@type': 'ListItem', position: 3, name: data.name, item: data.canonical },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: `${data.name} ingredient signals`,
      itemListElement: data.ingredients.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name })),
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: data.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
  ];
}

export function DishEditorialTemplate({ data }: { data: DishEditorialData }) {
  return (
    <>
      <SEOHead title={data.title} description={data.description} ogImage={absoluteImage(data.heroImage)}>
        {schemas(data).map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal" data-premium-template="dish-editorial">
        <EditorialHero
          image={data.heroImage}
          imageAlt={data.heroAlt}
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Thai food', href: '/food/' }, { label: data.name }]}
          eyebrow={data.heroEyebrow}
          title={data.name}
          subtitle={data.thaiName ? <span lang="th">{data.thaiName}</span> : undefined}
          description={data.lead}
          actions={[{ label: 'Know what to order', href: '#order', kind: 'primary' }, { label: 'Cook it at home', href: '#cook', kind: 'secondary' }]}
          minHeightClassName="min-h-[760px] lg:min-h-[690px]"
          titleClassName="max-w-[680px] text-[4.7rem] leading-[0.82] sm:text-[6rem] lg:text-[7.1rem]"
          contentClassName="max-w-[650px]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(7,41,35,0.08)_0%,rgba(7,41,35,0.74)_58%,rgba(7,41,35,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,41,35,0.98)_0%,rgba(7,41,35,0.91)_38%,rgba(7,41,35,0.18)_69%,rgba(7,41,35,0.03)_100%)]"
          contentTone="light"
          sideCard={<aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-20 hidden w-[310px] rounded-2xl border border-white/16 bg-jade/82 p-6 text-white shadow-editorial-lift backdrop-blur-xl xl:block"><p className="eyebrow !text-saffron-light">At a glance</p><div className="mt-5 grid gap-4">{data.quickFacts.map(({ label, value, icon: Icon }) => <div key={label} className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/8 text-saffron-light"><Icon size={17} /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[.13em] text-white/45">{label}</p><p className="mt-1 text-xs font-extrabold">{value}</p></div></div>)}</div></aside>}
        />

        <PageSectionNav label="On this page" items={data.navItems} />

        <section id="taste" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-11 lg:grid-cols-[.86fr_1.14fr]">
            <div><SectionHeading eyebrow="Taste before the top ten" title={`What does ${data.name} taste like?`} description={data.taste.intro} /><div className="mt-8 grid gap-6 border-l border-saffron/45 pl-6 sm:grid-cols-2"><div><p className="eyebrow">Texture</p><p className="mt-2 text-sm font-medium leading-7 text-charcoal/66">{data.taste.texture}</p></div><div><p className="eyebrow">Finish</p><p className="mt-2 text-sm font-medium leading-7 text-charcoal/66">{data.taste.finish}</p></div></div></div>
            <aside className="relative overflow-hidden rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10"><StoryDottedRoute className="absolute -bottom-12 -right-4 h-52 w-64 opacity-30" /><div className="relative flex items-start justify-between gap-5"><div><p className="eyebrow !text-saffron-light">Taste compass</p><h2 className="font-display text-[2.7rem] font-semibold leading-[.92]">Four signals.<br />No fixed formula.</h2></div><Sparkles className="text-saffron-light" /></div><div className="relative mt-9 grid gap-6 sm:grid-cols-2">{data.taste.scores.map((score) => <TasteMeter key={score.label} {...score} />)}</div><p className="relative mt-8 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/52">This describes a common version. Vendor, recipe, protein and chilli choice can move every signal.</p></aside>
          </div>
        </section>

        <section id="ingredients" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom"><SectionHeading eyebrow="Read the plate" title="Ingredient signals, not a guarantee." description="Use these clues to ask better questions. Premixed sauce, stock, toppings and shared preparation can add ingredients that are not visible." /><div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2 lg:grid-cols-4">{data.ingredients.map((item, index) => <article key={item.name} className={`${index % 2 ? 'bg-mist' : 'bg-white'} min-h-36 p-5`}><span className="text-[10px] font-black text-saffron-dark">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-4 font-display text-[1.5rem] font-semibold text-jade">{item.name}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/58">{item.role}</p></article>)}</div><div className="mt-6 grid gap-5 md:grid-cols-2"><article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><AlertTriangle className="text-saffron-dark" /><h3 className="mt-5 font-display text-[1.9rem] font-semibold text-jade">Allergen boundary</h3><p className="mt-3 text-sm font-medium leading-7 text-charcoal/66">{data.allergenCopy}</p></article><article className="rounded-2xl bg-jade p-7 text-white shadow-editorial-card"><Leaf className="text-saffron-light" /><h3 className="mt-5 font-display text-[1.9rem] font-semibold">Vegetarian or vegan?</h3><p className="mt-3 text-sm font-medium leading-7 text-white/68">{data.vegetarianCopy}</p><Link href="/travel-guides/vegetarian-vegan-thailand/" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Use the ordering guide <ArrowRight size={14} /></Link></article></div></div>
        </section>

        <section id="choose" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom"><SectionHeading eyebrow="Street, restaurant or home" title="Same name. Different job." description="Choose the format for the experience you want rather than assuming one setting is always more authentic." /><div className="mt-9 grid gap-5 lg:grid-cols-3">{data.formats.map((item, index) => <article key={item.title} className={`rounded-[24px] border p-7 shadow-editorial-card ${index === 0 ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white'}`}><p className={`text-[9px] font-extrabold uppercase tracking-[.15em] ${index === 0 ? 'text-saffron-light' : 'text-saffron-dark'}`}>Choice {index + 1}</p><h3 className={`mt-3 font-display text-[2.35rem] font-semibold leading-none ${index === 0 ? 'text-white' : 'text-jade'}`}>{item.title}</h3><p className={`mt-5 text-xs font-medium leading-6 ${index === 0 ? 'text-white/68' : 'text-charcoal/65'}`}><strong>Best for:</strong> {item.bestFor}</p><p className={`mt-3 text-xs font-medium leading-6 ${index === 0 ? 'text-white/52' : 'text-charcoal/55'}`}><strong>Check:</strong> {item.tradeOff}</p></article>)}</div></div>
        </section>

        <section id="order" className="section-divider-bottom scroll-mt-24 bg-mist py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><SectionHeading eyebrow="From menu to useful choice" title={`Order ${data.name} in three decisions.`} description="Protein, chilli, hidden sauce ingredients and toppings matter more than memorising a long phonetic sentence." /><div className="relative grid gap-4 lg:grid-cols-3"><div className="absolute left-[15%] right-[15%] top-7 hidden border-t-2 border-dashed border-saffron/55 lg:block" />{data.orderSteps.map((step, index) => <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-mist bg-saffron text-sm font-black text-white">{index + 1}</span><h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-none text-jade">{step.title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{step.text}</p></article>)}</div></div>
        </section>

        <section id="cook" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><article className="rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10"><p className="eyebrow !text-saffron-light">Cook with a sequence</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.88]">{data.cooking.title}</h2><p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-white/67">{data.cooking.intro}</p><ol className="mt-8 grid gap-3 sm:grid-cols-2">{data.cooking.steps.map((step, index) => <li key={step} className="flex gap-3 rounded-xl border border-white/10 bg-white/[.05] p-4 text-xs font-semibold leading-6 text-white/72"><span className="font-black text-saffron-light">{index + 1}</span>{step}</li>)}</ol><p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/48">{data.cooking.boundary}</p></article><aside className="rounded-[28px] border border-jade/10 bg-white p-8 shadow-editorial-card"><BookOpen className="text-jade" /><p className="eyebrow mt-6">Useful home references</p><div className="mt-5 grid gap-5">{data.affiliates.map((item) => <article key={item.href} className="border-b border-jade/10 pb-5 last:border-0 last:pb-0"><h2 className="font-display text-[2.15rem] font-semibold leading-none text-jade">{item.title}</h2><p className="mt-4 text-sm font-medium leading-7 text-charcoal/64">{item.text}</p><a href={item.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern mt-5">Check current price at Amazon <ExternalLink size={14} className="text-saffron" /></a></article>)}</div><AffiliateDisclosure className="mt-5">Amazon affiliate links through our central `/go/` routes. As an Amazon Associate we earn from qualifying purchases. OneLink may send you to a local store; price, seller and availability vary by country.</AffiliateDisclosure></aside></div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20"><div className="container-custom grid gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div><p className="eyebrow">Learn through the kitchen</p><h2 className="font-display text-[3rem] font-semibold leading-[.9] text-jade">A class can answer what a recipe cannot.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/64">{data.classCopy}</p><a href={data.classHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern mt-6">Check current cooking classes <ExternalLink size={14} className="text-saffron" /></a><AffiliateDisclosure className="mt-4">Klook affiliate link. Check the actual menu, city, language, dietary support, group size and cancellation terms before booking.</AffiliateDisclosure></div><div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-3">{data.classSignals.map((signal, index) => { const ItemIcon = [ChefHat, UtensilsCrossed, ShoppingBasket][index] || ChefHat; return <article key={signal.title} className="bg-white p-6"><ItemIcon className="text-jade" /><h3 className="mt-5 font-display text-[1.6rem] font-semibold text-jade">{signal.title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/58">{signal.text}</p></article>; })}</div></div></section>

        <FaqSplitSection id="questions" eyebrow="Real UK search questions" title={`${data.name} questions`} description="Questions found in the researched UK-English results; unrelated restaurant-near-me and celebrity-recipe intent was excluded." items={data.faqs} />
        <RelatedGuidesSection eyebrow="Keep tasting" title={`After ${data.name}: three useful next steps`} guides={data.related} sideLink={{ label: 'Browse all Thai dishes', href: '/food/' }} readLabel="Open guide" />
        <SourceMethodSection eyebrow="Sources & method" title="A dish guide with an evidence boundary" description={data.methodDescription} sources={data.sources} />
        <section className="py-8"><div className="container-custom flex flex-wrap items-center justify-between gap-4 text-[10px] font-medium text-charcoal/48"><span>Independent UK-market research: {data.updatedAt}</span><span className="inline-flex items-center gap-2"><Check size={13} className="text-jade" /> Ingredients and availability remain a vendor-level check</span></div></section>
      </div>
    </>
  );
}
