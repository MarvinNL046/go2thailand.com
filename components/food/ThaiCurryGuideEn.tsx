import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  ChefHat,
  CircleHelp,
  ExternalLink,
  Flame,
  Languages,
  Leaf,
  ListChecks,
  Nut,
  Scale,
  ShoppingBasket,
  Soup,
  Sparkles,
  UtensilsCrossed,
  WheatOff,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/blog/thai-curry-guide-green-red-yellow-massaman-panang/';
const HERO_IMAGE = '/images/redesign/thai-curry-guide-hero.webp';
const PAGE_TITLE = 'Thai curry guide: green, red, yellow, Massaman or Panang?';
const PAGE_DESCRIPTION = 'Compare five Thai curries by flavour, texture, heat and allergens. Learn green vs red, Massaman vs Panang, and how to order in Thailand.';

interface CurryProfile {
  id: string;
  name: string;
  thai: string;
  cue: string;
  profile: string;
  texture: string;
  common: string;
  decision: string;
  icon: LucideIcon;
  colorClass: string;
}

const curries: CurryProfile[] = [
  {
    id: 'green-curry',
    name: 'Green curry',
    thai: 'แกงเขียวหวาน',
    cue: 'Fresh and aromatic',
    profile: 'Green chillies, Thai basil and fresh aromatics often create a bright, herbal profile. Coconut milk usually rounds the sauce without erasing that freshness.',
    texture: 'Pourable to creamy',
    common: 'Chicken, Thai aubergine, bamboo, basil',
    decision: 'Choose it for fragrant herbs, not because you assume green means mild.',
    icon: Leaf,
    colorClass: 'bg-[#dfe9d9] text-[#245b42]',
  },
  {
    id: 'red-curry',
    name: 'Red curry',
    thai: 'แกงเผ็ด',
    cue: 'Rounded and chilli-led',
    profile: 'Dried red chillies bring colour and depth. A red curry can feel savoury, aromatic and full-bodied, but the name does not prescribe one fixed level of heat.',
    texture: 'Creamy and flowing',
    common: 'Chicken, beef, duck, pumpkin, bamboo',
    decision: 'Choose it for a deeper chilli-and-aromatic profile, then ask about today’s heat.',
    icon: Flame,
    colorClass: 'bg-[#f2ded4] text-[#994629]',
  },
  {
    id: 'yellow-curry',
    name: 'Yellow curry',
    thai: 'แกงกะหรี่',
    cue: 'Warm and earthy',
    profile: 'Turmeric and warm spices often stand ahead of fresh herbs. Potato and onion are common, creating a familiar, comforting bowl, although yellow is not a promise of mildness.',
    texture: 'Soft and creamy',
    common: 'Chicken, potato, onion, fish',
    decision: 'Choose it when earthy spices and a softer, stew-like meal appeal.',
    icon: Sparkles,
    colorClass: 'bg-[#f4e7bd] text-[#855d11]',
  },
  {
    id: 'massaman-curry',
    name: 'Massaman',
    thai: 'มัสมั่น',
    cue: 'Warm, spiced and gently sweet',
    profile: 'Cinnamon, cardamom, cumin and other dried spices build a deep profile. Potato, onion and peanuts are common, while beef or chicken often cooks into a tender, stew-like dish.',
    texture: 'Full and stew-like',
    common: 'Beef or chicken, potato, onion, peanut',
    decision: 'Choose it for warm spice and depth; ask about peanuts and fish sauce.',
    icon: Nut,
    colorClass: 'bg-[#e8d9c9] text-[#6f4932]',
  },
  {
    id: 'panang-curry',
    name: 'Panang',
    thai: 'พะแนง',
    cue: 'Thick, rich and concentrated',
    profile: 'A reduced coconut base, curry paste and makrut lime leaf often produce a rich, perfumed sauce that clings to the main ingredient instead of filling the bowl like soup.',
    texture: 'Thick and concentrated',
    common: 'Meat, coconut cream, makrut lime leaf',
    decision: 'Choose it when you want less liquid and a more concentrated sauce.',
    icon: Soup,
    colorClass: 'bg-[#ead6c3] text-[#824829]',
  },
];

const navItems: PageSectionNavItem[] = [
  { href: '#choose', label: 'Choose', icon: ListChecks },
  { href: '#compare', label: 'Compare', icon: Scale },
  { href: '#paste', label: 'Curry paste', icon: ChefHat },
  { href: '#order', label: 'Order', icon: Languages },
  { href: '#allergens', label: 'Allergens', icon: AlertTriangle },
  { href: '#cook', label: 'Cook', icon: ShoppingBasket },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

const faqs = [
  {
    question: 'Which tastes better, Thai red or green curry?',
    answer: 'Neither is objectively better. Green curry often tastes fresher and more herbal because green chillies, Thai basil and fresh aromatics stand out. Red curry usually tastes rounder and deeper, with dried red chilli at the centre. Choose green for brightness and red for depth, then let the specific restaurant explain its recipe.',
  },
  {
    question: 'Which color Thai curry is best?',
    answer: 'The best colour depends on the flavour you want. Green is often fresh and herbal, red is rounded and chilli-led, and yellow is warm and earthy. Massaman and Panang are more useful choices when you want a stew-like or thick sauce. Colour helps you navigate a menu, but it does not rank quality or guarantee heat.',
  },
  {
    question: 'Which is the tastiest Thai curry?',
    answer: 'Taste is personal, so there is no universal winner. Green curry suits travellers who enjoy basil and fresh aromatics. Red curry offers deeper chilli flavour, Massaman brings warm spice and potato, while Panang is thick and concentrated. Start with the profile that matches food you already enjoy and share more than one dish if possible.',
  },
  {
    question: 'Which is hotter, red Thai or green Thai?',
    answer: 'Either can be hotter. Chilli variety, quantity, curry-paste ratio and the cook determine the heat more reliably than colour. Green curry is sometimes surprisingly hot, while a red curry can be moderate. Ask which prepared curry is least or most spicy that day rather than treating the menu colour as a heat scale.',
  },
  {
    question: 'Which Thai curry is best for beginners?',
    answer: 'Massaman or a gentle yellow curry can be approachable because warm spices, potato and a creamy sauce often soften the chilli impression. Panang can also work if you like a rich sauce. These are tendencies, not guarantees, so ask the kitchen what is genuinely mild and order rice plus a non-spicy dish for the table.',
  },
  {
    question: 'Which is healthier, red curry or green curry?',
    answer: 'Colour alone cannot answer that. Portion size, coconut milk, oil, sugar, sodium, protein and vegetables vary by recipe. A vegetable-heavy green curry can still be rich, and a red curry can be lighter or heavier depending on the kitchen. Compare the actual dish and your own dietary needs rather than assigning a health label to a colour.',
  },
  {
    question: 'Is Massaman curry hotter than Panang curry?',
    answer: 'Massaman is often perceived as gentler because warm dried spices, potato and sweetness share the foreground. Panang can have a more concentrated chilli flavour, but recipes vary. Neither name guarantees a fixed Scoville level. Ask about the batch being served and remember that a curry cooked in advance may not be adjustable.',
  },
  {
    question: 'Which curry is closest to Panang curry?',
    answer: 'Red curry is the closest common comparison because both can use a red-chilli paste and coconut. Panang is normally thicker, more reduced and more concentrated, with makrut lime leaf often noticeable. A standard red curry tends to contain more liquid and may carry a broader mix of vegetables.',
  },
  {
    question: 'Which is hotter, Panang or red curry?',
    answer: 'There is no dependable universal answer. Panang can taste intense because the sauce is concentrated, while red curry can contain more or hotter chillies. Perceived richness and actual chilli heat are not the same measurement. Ask the restaurant which one is hotter in its current preparation.',
  },
  {
    question: 'Which is better, Massaman or Panang?',
    answer: 'Choose Massaman for warm spices, potato, peanuts and a soft stew-like meal. Choose Panang for a thicker coconut sauce, makrut lime aroma and a more concentrated finish. Massaman often feels comforting and gently sweet; Panang usually feels sharper and richer. Allergy needs can decide too, because peanuts or shrimp paste may be present.',
  },
  {
    question: 'What are the 7 different types of curry?',
    answer: 'There is no single official list of seven Thai curries. Green, red, yellow, Massaman and Panang are five widely recognised menu categories, while jungle curry and sour curry are two useful additions. Thailand has many more regional gaeng dishes, including water-based, herb-heavy and coconut-rich preparations, so a list of seven is an introduction rather than a complete taxonomy.',
  },
];

const sources = [
  {
    title: 'Central Thai cuisine: coconut milk and curry traditions',
    creator: 'Thailand Foundation',
    url: 'https://thailandfoundation.or.th/central-thai-cuisine-opening/',
    note: 'Thai public-cultural context on Central Thai cooking, coconut milk, green curry and Massaman.',
  },
  {
    title: 'Gaeng Massaman Nua',
    creator: 'Thailand Foundation / Ministry of Foreign Affairs',
    url: 'https://thailandfoundation.or.th/gaeng-masssaman-nua-3/',
    note: 'Thai culinary context for Massaman and its warm-spice profile.',
  },
  {
    title: 'Phanaeng curry: ingredients and texture',
    creator: 'Thailand Foundation',
    url: 'https://thailandfoundation.or.th/phanaeng-curry-a-thai-culinary-delight/',
    note: 'Supporting background on Phanaeng’s reduced coconut base and aromatics; used cautiously because the source discloses AI assistance.',
  },
  {
    title: 'Food allergies, intolerances and coeliac disease',
    creator: 'UK Food Standards Agency',
    url: 'https://www.food.gov.uk/food-safety-and-hygiene/food-allergies-intolerances-and-coeliac-disease',
    note: 'Consumer guidance on allergen communication, eating out and cross-contact risk.',
  },
];

const amazonProducts: Array<{ amazonSlug: AmazonAffiliateSlug; title: string; reason: string }> = [
  {
    amazonSlug: 'thai-granite-mortar-eight-inch',
    title: 'Eight-inch granite mortar',
    reason: 'A heavy option for pounding curry paste at home; best for a permanent kitchen position.',
  },
  {
    amazonSlug: 'zojirushi-six-cup-rice-cooker',
    title: 'Zojirushi rice cooker',
    reason: 'A separate rice workflow; check capacity, voltage and the model sold in your country.',
  },
  {
    amazonSlug: 'simple-thai-food-cookbook',
    title: 'Simple Thai Food',
    reason: 'Leela Punyaratabandhu’s book adds technique and context beyond a single recipe card.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: '2026-05-06',
      dateModified: '2026-07-26',
      inLanguage: 'en',
      mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Food', item: 'https://go2-thailand.com/food/' },
        { '@type': 'ListItem', position: 3, name: 'Thai curry guide', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Five popular types of Thai curry',
      itemListElement: curries.map((curry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: curry.name,
        description: `${curry.cue}. ${curry.profile}`,
      })),
    },
  ];
}

export function ThaiCurryGuideEn() {
  const subId = useSubId();
  const cookingClassHref = withPlacementSubId(KLOOK_GENERIC, subId, 'en-thai-curry-guide-cooking-class');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="Thai curry guide, green vs red curry, Massaman vs Panang, types of Thai curry, which Thai curry is hottest" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-05-06" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Five bowls of Thai curry served beside fresh herbs and rice"
          breadcrumbAriaLabel="Breadcrumb"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Food', href: '/food/' }, { label: 'Thai curry guide' }]}
          eyebrow="Choose by flavour, not colour"
          title={<>Thai curry.</>}
          subtitle={<>Which bowl is yours?</>}
          description={<>Green, red, yellow, Massaman or Panang: compare flavour, texture and heat before you order. This guide turns five familiar names into a meal you will actually enjoy.</>}
          actions={[
            { label: 'Find your curry', href: '#choose', kind: 'primary' },
            { label: 'Compare the five', href: '#compare', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[800px] lg:min-h-[720px]"
          contentClassName="max-w-[650px]"
          titleClassName="max-w-[650px] text-[4.15rem] leading-[0.84] sm:text-[5.2rem] lg:text-[6rem]"
          subtitleClassName="max-w-[620px] text-[2.15rem] leading-[0.92] text-saffron-dark sm:text-[3rem]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.12)_0%,rgba(252,250,246,0.62)_48%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_38%,rgba(252,250,246,0.22)_65%,rgba(18,63,54,0.08)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[320px] overflow-hidden rounded-2xl border border-white/65 bg-white/84 shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Quick taste route</p>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-canvas"><ChefHat size={17} className="text-jade" /></span>
              </div>
              <div className="space-y-3 p-5 text-[11px] font-bold text-jade">
                <p className="flex items-center justify-between"><span>Fresh &amp; herbal</span><span className="text-saffron-dark">Green</span></p>
                <p className="flex items-center justify-between"><span>Warm &amp; gentle</span><span className="text-saffron-dark">Massaman</span></p>
                <p className="flex items-center justify-between"><span>Thick &amp; rich</span><span className="text-saffron-dark">Panang</span></p>
              </div>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/58">Heat changes by recipe and kitchen. Ask about the curry being served today.</p>
            </aside>
          )}
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section id="choose" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
              <SectionHeading
                eyebrow="Start with taste"
                title={<>Five curries.<br />Five different routes.</>}
                description="Thai curry is not one fixed dish. Curry paste, liquid, herbs, seasoning and cooking method shape the bowl together. Use these profiles to narrow the menu, then let the restaurant confirm the current ingredients and heat."
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-jade/10 bg-tonal p-5"><Leaf size={23} className="text-jade" /><strong className="mt-5 block font-display text-2xl text-jade">Fresh</strong><p className="mt-2 text-xs leading-5 text-charcoal/64">Choose green when basil and fresh aromatics sound right.</p></div>
                <div className="rounded-2xl border border-jade/10 bg-tonal p-5"><Sparkles size={23} className="text-jade" /><strong className="mt-5 block font-display text-2xl text-jade">Warm</strong><p className="mt-2 text-xs leading-5 text-charcoal/64">Choose yellow or Massaman for turmeric and dried spices.</p></div>
                <div className="rounded-2xl border border-jade/10 bg-tonal p-5"><Soup size={23} className="text-jade" /><strong className="mt-5 block font-display text-2xl text-jade">Rich</strong><p className="mt-2 text-xs leading-5 text-charcoal/64">Choose Panang for a reduced sauce that clings to the main ingredient.</p></div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {curries.map((curry) => {
                const Icon = curry.icon;
                return (
                  <article key={curry.id} className="group flex min-h-[360px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
                    <span className={`grid h-12 w-12 place-items-center rounded-xl ${curry.colorClass}`}><Icon size={23} strokeWidth={1.55} /></span>
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{curry.cue}</p>
                    <h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{curry.name}</h2>
                    <p lang="th" className="mt-2 text-xs font-bold text-charcoal/46">{curry.thai}</p>
                    <p className="mt-4 text-xs font-medium leading-5 text-charcoal/68">{curry.profile}</p>
                    <a href={`#${curry.id}`} className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-extrabold text-jade">Compare it <ArrowRight size={12} className="text-saffron" /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-12 lg:py-16">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="p-8 sm:p-10">
                  <p className="eyebrow !text-saffron-light">The biggest curry myth</p>
                  <h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.04em]">Colour is not<br />a heat meter.</h2>
                </div>
                <div className="grid gap-6 border-white/10 bg-white/[0.055] p-8 sm:grid-cols-3 sm:p-10">
                  <div><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/35 text-saffron-light"><Flame size={17} /></span><strong className="mt-4 block text-sm">Chilli matters</strong><p className="mt-2 text-[11px] leading-5 text-white/64">Type, amount and preparation determine heat more reliably than red, green or yellow.</p></div>
                  <div><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/35 text-saffron-light"><ChefHat size={17} /></span><strong className="mt-4 block text-sm">The kitchen matters</strong><p className="mt-2 text-[11px] leading-5 text-white/64">Two restaurants can serve curries with the same name and very different intensity.</p></div>
                  <div><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/35 text-saffron-light"><Languages size={17} /></span><strong className="mt-4 block text-sm">Ask about the batch</strong><p className="mt-2 text-[11px] leading-5 text-white/64">At a rice-and-curry stall, the pot may already be cooked and cannot simply lose its chilli.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="compare" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="The comparisons people actually make" title="Green vs red. Massaman vs Panang." description="These pairs look close on a menu but solve different cravings. Compare aroma, sauce and meal shape first; only then ask the kitchen about heat." />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="overflow-hidden rounded-[26px] border border-jade/10 bg-white shadow-editorial-card">
                <div className="grid grid-cols-2">
                  <div className="bg-[#dfe9d9] p-6"><Leaf size={24} className="text-jade" /><h2 id="green-curry" className="mt-4 font-display text-3xl font-semibold text-jade">Green</h2><p className="mt-2 text-xs font-medium leading-5 text-charcoal/65">Fresh chilli, basil and aromatics often feel bright and herbal.</p></div>
                  <div className="bg-[#f2ded4] p-6"><Flame size={24} className="text-[#994629]" /><h2 id="red-curry" className="mt-4 font-display text-3xl font-semibold text-jade">Red</h2><p className="mt-2 text-xs font-medium leading-5 text-charcoal/65">Dried chilli often creates a rounder, deeper and more savoury profile.</p></div>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-2xl font-semibold text-jade">The useful difference</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-charcoal/68">Green curry leads with freshness; red curry often leads with dried-chilli depth. Both frequently use coconut milk and both can be mild, medium or fierce. If you like basil and vivid aromatics, start green. If you want rounded savouriness and a classic flowing sauce, start red.</p>
                  <p className="mt-4 border-l-2 border-saffron pl-4 text-xs font-bold leading-5 text-jade">Do not ask “Which colour is mild?” Ask “Which of these two is less spicy today?”</p>
                </div>
              </article>

              <article className="overflow-hidden rounded-[26px] border border-jade/10 bg-white shadow-editorial-card">
                <div className="grid grid-cols-2">
                  <div className="bg-[#e8d9c9] p-6"><Nut size={24} className="text-[#6f4932]" /><h2 id="massaman-curry" className="mt-4 font-display text-3xl font-semibold text-jade">Massaman</h2><p className="mt-2 text-xs font-medium leading-5 text-charcoal/65">Warm spices, potato and peanuts create a soft, stew-like meal.</p></div>
                  <div className="bg-[#ead6c3] p-6"><Soup size={24} className="text-[#824829]" /><h2 id="panang-curry" className="mt-4 font-display text-3xl font-semibold text-jade">Panang</h2><p className="mt-2 text-xs font-medium leading-5 text-charcoal/65">Reduced coconut and makrut lime often create a thick, perfumed sauce.</p></div>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-2xl font-semibold text-jade">The useful difference</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-charcoal/68"><Link href="/food/massaman-curry/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Massaman curry</Link> behaves like a long, comforting stew and commonly brings potato, onion and peanuts. Panang is usually more concentrated, with less free liquid and a sauce that coats meat or tofu. Choose Massaman for warm spice and softness; Panang for rich coconut and aromatic intensity.</p>
                  <p className="mt-4 border-l-2 border-saffron pl-4 text-xs font-bold leading-5 text-jade">Peanut, shrimp paste and fish sauce vary. Compare the ingredient list as carefully as the flavour.</p>
                </div>
              </article>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <table className="w-full min-w-[780px] border-collapse text-left">
                <caption className="sr-only">Comparison of five popular Thai curries by flavour, sauce, common ingredients and best fit</caption>
                <thead className="bg-jade text-white"><tr>{['Curry', 'Flavour cue', 'Sauce', 'Often includes', 'Best starting point'].map((label) => <th key={label} scope="col" className="px-5 py-4 text-[10px] font-extrabold uppercase tracking-[0.12em]">{label}</th>)}</tr></thead>
                <tbody className="divide-y divide-jade/10">
                  {curries.map((curry) => <tr key={curry.id} className="align-top"><th scope="row" className="px-5 py-5 font-display text-lg text-jade">{curry.name}</th><td className="px-5 py-5 text-xs leading-5 text-charcoal/65">{curry.cue}</td><td className="px-5 py-5 text-xs leading-5 text-charcoal/65">{curry.texture}</td><td className="px-5 py-5 text-xs leading-5 text-charcoal/65">{curry.common}</td><td className="px-5 py-5 text-xs leading-5 text-charcoal/65">{curry.decision}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="paste" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="relative min-h-[430px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[560px]">
              <Image src="/images/redesign/thai-curry-paste.webp" alt="Thai cook pounding red curry paste in a granite mortar beside fresh aromatics" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/85 to-transparent p-7 pt-24 text-white">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">The system beneath the colour</p>
                <p className="mt-2 max-w-md text-xs font-medium leading-5 text-white/75">Pounding bruises fibres and releases aromatic oils. A food processor works differently but can still be a practical home route.</p>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="How flavour is built" title="Curry paste is a system, not paint" description="Red, green or yellow describes what you see. Character comes from the balance of chilli, fresh aromatics, dried spices, savoury ingredients and the way the paste is fried." />
              <div className="mt-8 space-y-4">
                {[
                  ['01', 'Fresh aromatic base', 'Shallot, garlic, lemongrass, galangal and citrus peel build fragrance and structure. No single paste has to contain exactly the same set.'],
                  ['02', 'Chilli and dried spice', 'Fresh or dried chillies, turmeric, coriander seed and cumin shift colour, warmth and depth. More colour does not automatically mean more heat.'],
                  ['03', 'Savoury balance', 'Shrimp paste, salt, fish sauce, palm sugar and coconut can connect the flavours. This is also where vegetarian and allergy checks become essential.'],
                ].map(([step, title, text]) => <article key={step} className="grid grid-cols-[48px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-jade font-display text-xl text-saffron-light">{step}</span><div><h3 className="font-display text-xl font-semibold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/66">{text}</p></div></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="order" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="At a stall or table" title="Order in four clear steps" description="At a khao gaeng stall you point to dishes that may already be cooked. In a restaurant you often order curries for the table and rice separately. Concrete questions beat assumptions in both settings." />
              <ol className="mt-8 space-y-5">
                {[
                  ['Choose the profile', 'Name green, red, yellow, Massaman or Panang and ask what is available now. Decide whether you want fresh, deep, warm or concentrated flavours.'],
                  ['Choose the main ingredient and rice', 'Confirm whether chicken, beef, tofu, fish or vegetables work in that preparation, and order rice if it is not included.'],
                  ['Discuss heat', 'Phet nit noi (เผ็ดนิดหน่อย) means a little spicy; mai phet (ไม่เผ็ด) means not spicy. A shared pot may already contain chilli and cannot be remade.'],
                  ['Check ingredients separately', 'Ask about shrimp paste, fish sauce, peanuts, shellfish and shared preparation. “Vegetarian” alone may not answer every question.'],
                ].map(([title, text], index) => <li key={title} className="grid grid-cols-[42px_1fr] gap-4"><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/45 bg-canvas text-sm font-extrabold text-saffron-dark">{index + 1}</span><div><h3 className="font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/66">{text}</p></div></li>)}
              </ol>
            </div>
            <div className="relative min-h-[470px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[570px]">
              <Image src="/images/redesign/thai-curry-ordering.webp" alt="Traveller ordering Thai curry at a rice-and-curry stall" fill sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-jade/90 p-5 text-white backdrop-blur-md sm:left-auto sm:w-[320px]">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">More useful than “mild”</p>
                <p className="mt-2 font-display text-2xl font-semibold">Which curry is least spicy today?</p>
                <p className="mt-2 text-[10px] leading-4 text-white/66">That asks about the existing preparation rather than an adjustment the kitchen may not be able to make.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="allergens" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr]">
              <SectionHeading eyebrow="Ask before ordering" title="A vegetable curry is not automatically vegetarian" description="Tofu, vegetables and coconut milk reveal little about the complete paste, stock or shared kitchen. With a serious allergy, an ingredient check is a decision point rather than a formality." />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [Nut, 'Peanuts and tree nuts', 'Massaman often contains peanut; Panang may include peanut in the paste or garnish. Cross-contact can still occur.'],
                  [Soup, 'Fish and shellfish', 'Fish sauce and shrimp paste can be hidden in the base, including in a bowl that otherwise looks entirely vegetable-based.'],
                  [WheatOff, 'Wheat, gluten and soy', 'Soy sauce, stock, seasoning brands and shared work surfaces vary. Ask for a label when your safety depends on it.'],
                  [AlertTriangle, 'Coconut and cross-contact', 'Many familiar curries contain coconut milk or cream. Ladles, woks and preparation areas may serve several dishes.'],
                ].map(([Icon, title, text]) => {
                  const IconComponent = Icon as LucideIcon;
                  return <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-6"><IconComponent size={28} strokeWidth={1.4} className="text-jade" /><h3 className="mt-5 font-display text-[1.65rem] font-semibold leading-none text-jade">{String(title)}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/67">{String(text)}</p></article>;
                })}
              </div>
            </div>
            <div className="mt-9 grid gap-5 rounded-2xl border border-saffron/25 bg-[#fff6e8] p-6 sm:grid-cols-[auto_1fr] sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-saffron text-white"><AlertTriangle size={22} /></span>
              <div><h3 className="font-display text-2xl font-semibold text-jade">If the allergy is serious</h3><p className="mt-2 max-w-4xl text-sm font-medium leading-7 text-charcoal/74">Use a professionally translated allergy card, show it before ordering and ask whether staff can confirm both ingredients and cross-contact. The UK Food Standards Agency advises discussing the allergy and how food is handled when eating out; a vegan label alone does not remove cross-contact risk. If a kitchen cannot give a confident answer, do not rely on appearance or a general “no problem” response. Go2Thailand provides travel context, not medical advice.</p></div>
            </div>
          </div>
        </section>

        <section id="cook" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                <div className="relative min-h-[430px] lg:min-h-[680px]">
                  <Image src="/images/redesign/thai-curry-home-cooking.webp" alt="Traveller learning to cook Thai curry with a local teacher" fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/85 via-transparent to-transparent" />
                  <div className="absolute bottom-7 left-7 right-7"><p className="eyebrow !text-saffron-light">Turn a travel memory into technique</p><h2 className="max-w-lg font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.04em]">Learn to taste before perfecting a recipe.</h2></div>
                </div>
                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="text-sm font-medium leading-7 text-white/70">A sensible home route does not begin with twenty specialist purchases. Pick one curry, use a dependable paste or pound your own, cook rice separately and adjust the final balance one direction at a time. A class in Thailand adds something a recipe cannot: you can smell the paste, watch the sauce change and compare texture beside a teacher.</p>
                  <a href={cookingClassHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Check current class price at Klook <ExternalLink size={15} /></a>
                  <AffiliateDisclosure className="mt-3 !text-white/56">Affiliate link: we may earn a commission if you book through Klook, at no extra cost to you. Check the current price, menu, dietary options, location, cancellation policy and inclusions on the provider page.</AffiliateDisclosure>

                  <div className="my-8 h-px bg-white/12" />
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">A compact home kit via Amazon</p>
                  <div className="mt-4 space-y-3">
                    {amazonProducts.map(({ amazonSlug, title, reason }) => (
                      <a key={amazonSlug} href={`/go/${amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid grid-cols-[40px_1fr_auto] items-start gap-4 rounded-xl border border-white/13 bg-white/[0.065] p-4 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                        <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/35 text-saffron-light"><ShoppingBasket size={17} /></span>
                        <span><strong className="block text-xs text-white">{title}</strong><span className="mt-1 block text-[10px] leading-4 text-white/57">{reason}</span><span className="mt-2 block text-[10px] font-extrabold text-saffron-light">Check current price at Amazon</span></span>
                        <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-white/60 transition group-hover:text-saffron-light"><ExternalLink size={13} /></span>
                      </a>
                    ))}
                  </div>
                  <AffiliateDisclosure className="mt-4 !text-white/56">As an Amazon Associate, we earn from qualifying purchases. These links use our central <strong className="text-white/74">/go/</strong> router; OneLink may send you to a local Amazon store. Product, seller, availability and price can differ by country, so confirm the current offer on Amazon.</AffiliateDisclosure>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="One method, not five duplicate recipes" title="A curry workflow you can adjust" description="Search results around Thai curry are heavily recipe-led. This page protects a different intent: compare and choose. Use the method below as a framework, then follow a tested recipe for exact quantities." />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['1. Fry the paste', 'Warm fat or thick coconut cream gently and cook the paste until the raw aroma changes. Keep garlic and dried spices away from burning heat.'],
                  ['2. Build the sauce', 'Add coconut milk, stock or another suitable liquid in stages. Watch texture rather than forcing every curry into the same consistency.'],
                  ['3. Plan the cooking order', 'Start ingredients that need time. Add quick vegetables and fresh herbs later so they retain colour, fragrance and bite.'],
                  ['4. Balance at the end', 'Taste salt, sweetness, acidity and heat together with rice. Change one direction at a time so you know what improved the bowl.'],
                ].map(([title, text]) => <article key={title} className="rounded-2xl border border-jade/10 bg-tonal p-6"><h3 className="font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/67">{text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real search questions" title="Thai curry questions, answered" description="Every question below appeared in the English DataForSEO People Also Ask research for this owner. The answers preserve recipe variation instead of pretending one restaurant defines an entire curry." items={faqs} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Keep tasting" title="Build your own Thailand food route" /><a href={cookingClassHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Check current class price at Klook <ExternalLink size={14} /></a></div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { title: 'Thai food guide', description: 'Move beyond the best-known curries and build a balanced list of dishes to try.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
                { title: 'Thailand street food', description: 'Choose between stalls, food courts and markets without trying to eat everything in one evening.', href: '/thailand-street-food/', image: '/images/redesign/thai-curry-ordering.webp' },
                { title: 'Thai cooking classes', description: 'Compare destinations and class styles when you want to practise techniques during your trip.', href: '/best-cooking-classes-in-thailand/', image: '/images/redesign/thai-curry-home-cooking.webp' },
              ].map((guide) => <Link key={guide.href} href={guide.href} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-44 overflow-hidden"><Image src={guide.image} alt={guide.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /></div><div className="p-5"><h3 className="font-display text-[1.65rem] font-semibold leading-none text-jade">{guide.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/62">{guide.description}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Read the guide <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span></div></Link>)}
            </div>
            <AffiliateDisclosure className="mt-3">The Klook link is sponsored. The three guide cards are editorial internal links.</AffiliateDisclosure>
          </div>
        </section>

        <SourceMethodSection eyebrow="Sources & editorial method" title="Useful flavour language, with room for variation" description="This guide combines Thai public cultural sources, UK Food Standards Agency guidance and independent English keyword, ranking, PAA and competitor research. We deliberately use words such as ‘often’ and ‘usually’: curry recipes are living food traditions, not universal product specifications. Last editorial review: 26 July 2026." sources={sources} />

        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <div className="flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="eyebrow">Ready to choose?</p><h2 className="font-display text-[2.6rem] font-semibold leading-none text-jade">Start with flavour. Ask about heat second.</h2></div>
              <div className="flex flex-wrap gap-3"><a href="#choose" className="btn-jade btn-jade-pattern group min-h-12 px-6">Compare again <ArrowRight size={15} className="text-saffron" /></a><Link href="/food/" className="btn-cream min-h-12 px-6 text-saffron-dark">Explore Thai food <UtensilsCrossed size={15} /></Link></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
