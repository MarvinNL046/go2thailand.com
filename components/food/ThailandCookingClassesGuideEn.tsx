import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Check,
  ChefHat,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  HeartHandshake,
  Leaf,
  Map,
  MapPin,
  NotebookTabs,
  Salad,
  SearchCheck,
  ShoppingBasket,
  Sparkles,
  Store,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { cityAffiliates, KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/best-cooking-classes-in-thailand/';
const HERO = '/images/redesign/thailand-cooking-classes-hero-v2.webp';
const UPDATED_AT = '2026-07-27';

const destinations = [
  {
    city: 'Chiang Mai',
    eyebrow: 'Garden & northern context',
    fit: 'A strong all-round choice when you want the class itself to be a major part of the day.',
    lookFor: 'A genuine hands-on station, clear transfer zone and a market or garden visit that teaches ingredients rather than filling time.',
    href: withSubId(cityAffiliates['chiang-mai'].klook, 'cooking-owner-en-chiang-mai'),
    image: '/images/redesign/destination-chiang-mai.webp',
  },
  {
    city: 'Bangkok',
    eyebrow: 'Urban market & compact schedule',
    fit: 'Best when the lesson must fit around a city itinerary and you value easy transport and broad class choice.',
    lookFor: 'The exact meeting point, whether the market walk runs for your time slot and how much of the menu each guest cooks personally.',
    href: withSubId(cityAffiliates.bangkok.klook, 'cooking-owner-en-bangkok'),
    image: '/images/redesign/destination-bangkok.webp',
  },
  {
    city: 'Phuket',
    eyebrow: 'Southern flavours & Old Town',
    fit: 'A useful beach-trip add-on, especially if local southern or Sino-Thai food matters more than a generic island activity.',
    lookFor: 'Transport coverage, menu rotation and whether the class reflects Phuket ingredients instead of teaching only universal tourist dishes.',
    href: withSubId(cityAffiliates.phuket.klook, 'cooking-owner-en-phuket'),
    image: '/images/redesign/phuket-food-kopitiam.webp',
  },
  {
    city: 'Krabi',
    eyebrow: 'Relaxed resort-day option',
    fit: 'Good for a slower inland half-day between boat days, provided the pickup and class location make sense from your base.',
    lookFor: 'Ao Nang, Krabi Town or Railay logistics, included transfers and a weather-independent workspace.',
    href: withSubId(cityAffiliates.krabi.klook, 'cooking-owner-en-krabi'),
    image: '/images/redesign/destination-krabi.webp',
  },
  {
    city: 'Koh Samui',
    eyebrow: 'Island produce & small groups',
    fit: 'Best for travellers who want one structured cultural activity without leaving the island itinerary behind.',
    lookFor: 'Where pickup operates, whether stations are shared and what happens if the advertised menu or market visit changes.',
    href: withSubId(cityAffiliates['koh-samui'].klook, 'cooking-owner-en-koh-samui'),
    image: '/images/redesign/koh-samui-food.webp',
  },
] as const;

const faqs = [
  {
    question: 'Are Thai cooking classes worth it?',
    answer: 'They are worth it when you want transferable technique rather than only a meal: ingredient recognition, curry-paste texture, heat control and tasting for balance. Check that you cook at your own station, that the menu interests you and that the total transfer time fits the day. A demonstration-only format offers a different kind of value.',
  },
  {
    question: 'How much are Thai cooking classes?',
    answer: 'There is no useful fixed Thailand-wide price. City, class length, group size, private transport, market or farm visits and premium ingredients all change the total. Open your date on the provider page and compare the same inclusions, cancellation terms and pickup area before paying.',
  },
  {
    question: 'Where is the best place to do a cooking class in Thailand?',
    answer: 'Chiang Mai is the strongest default for a class-led day, Bangkok for a compact urban schedule, Phuket for southern and Sino-Thai context, and Krabi or Koh Samui for an island or coast itinerary. The best place is the city already on your route with the most suitable class format.',
  },
  {
    question: 'What do you do in cooking classes?',
    answer: 'A hands-on class commonly starts with an ingredient briefing and may include a market or garden visit. You then prepare components such as curry paste, soup, a stir-fry, noodles or dessert, cook with instructor guidance and eat what you made. The exact sequence and menu vary by operator and time slot.',
  },
  {
    question: 'What should I expect in a cooking class?',
    answer: 'Expect several hours on your feet, sharp tools, heat, shared work areas and a substantial amount of food. Confirm the meeting point, transfer, class language, menu, personal versus shared stations, dietary support and what you can take away. Wear closed, comfortable shoes and arrive hungry but hydrated.',
  },
  {
    question: 'Is Thai cooking difficult to learn?',
    answer: 'The individual actions are learnable, but ingredient preparation, heat, texture and flavour balance need practice. A useful beginner class explains why a step matters and gives substitution guidance for ingredients you may not find at home instead of asking you to memorise one fixed recipe.',
  },
] as const;

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Cooking Classes in Thailand: Choose by City and Class Style',
    description: 'Compare Thai cooking classes by city, format, market visit, dietary support and booking checks, then view current Klook options.',
    url: PAGE_URL,
    image: `https://go2-thailand.com${HERO}`,
    inLanguage: 'en-GB',
    dateModified: UPDATED_AT,
    author: { '@type': 'Organization', name: 'Go2Thailand' },
    publisher: { '@type': 'Organization', name: 'Go2Thailand' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Thai cooking-class destinations compared',
    numberOfItems: destinations.length,
    itemListElement: destinations.map((destination, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: destination.city,
      description: `${destination.fit} Check: ${destination.lookFor}`,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  },
];

const selectionChecks = [
  ['Hands-on means hands-on', 'Confirm whether each guest has a burner, knife and mortar or whether the group mainly watches one instructor.', ChefHat],
  ['Read the exact menu', 'A class labelled “Thai cooking” may rotate dishes by day. Check choice rules, substitutions and whether curry paste is made from scratch.', NotebookTabs],
  ['Map the full door-to-door time', 'Pickup windows, market stops and an out-of-town garden can turn a half-day class into most of a day.', Clock3],
  ['Compare current terms', 'Use the live listing for today’s price, language, meeting point, cancellation policy and minimum-participant rules.', CalendarCheck],
] as const;

export default function ThailandCookingClassesGuideEn() {
  const klookAll = withSubId(KLOOK_GENERIC, 'cooking-owner-en-hero');

  return (
    <main className="bg-canvas" data-premium-template="cooking-class-owner-en">
      <SEOHead
        title="Best Cooking Classes in Thailand: City & Class Guide"
        description="Compare Thai cooking classes in Bangkok, Chiang Mai, Phuket, Krabi and Samui by format, market visit and dietary support. Check current options."
        ogImage={`https://go2-thailand.com${HERO}`}
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <EditorialHero
        image={HERO}
        imageAlt="Thai cooking instructor showing two travellers how to pound curry paste in an open-air tropical kitchen"
        breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Food', href: '/food/' }, { label: 'Cooking classes' }]}
        eyebrow="Choose the class, not the badge"
        title={<>Thai cooking classes,<br /><span className="text-saffron-dark">chosen properly.</span></>}
        subtitle="City, format and menu matter more than a generic top ten."
        description="Use this guide to choose where to learn, decide whether a market or garden visit adds value, check dietary support and compare current classes without relying on stale prices or invented rankings."
        actions={[
          { label: 'Compare the five cities', href: '#cities', kind: 'primary' },
          { label: 'Check current classes', href: klookAll, kind: 'secondary', newTab: true, affiliate: true },
        ]}
        disclosure="The Klook link is sponsored. We may earn a commission at no extra cost to you. Availability, operator, price, menu and terms remain the provider’s responsibility."
        minHeightClassName="min-h-[760px] lg:min-h-[690px]"
        titleClassName="max-w-[720px] text-[3.9rem] leading-[0.87] sm:text-[5rem] lg:text-[5.8rem]"
        contentClassName="max-w-[690px]"
        imageClassName="object-cover object-[72%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(248,244,235,0.10)_0%,rgba(248,244,235,0.54)_48%,rgba(248,244,235,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(248,244,235,0.98)_0%,rgba(248,244,235,0.91)_37%,rgba(8,38,31,0.20)_66%,rgba(8,38,31,0.04)_100%)]"
      />

      <PageSectionNav
        label="On this cooking-class guide"
        items={[
          { href: '#choose', label: 'Choose well', icon: SearchCheck },
          { href: '#cities', label: 'Cities', icon: MapPin },
          { href: '#format', label: 'Class format', icon: ChefHat },
          { href: '#diet', label: 'Diet & safety', icon: Leaf },
          { href: '#book', label: 'Current options', icon: CalendarCheck },
          { href: '#questions', label: 'Questions', icon: HeartHandshake },
        ]}
      />

      <section id="choose" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <SectionHeading
            eyebrow="Start with fit"
            title="A good class changes what you notice at the next market."
            description="The useful outcome is not a certificate or the largest menu. It is understanding ingredients, technique and balance well enough to ask better questions and cook with more confidence later."
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">
            {selectionChecks.map(([title, copy, Icon], index) => (
              <article key={title} className={`min-h-[250px] p-7 ${index === 3 ? 'bg-jade text-white' : index === 1 || index === 2 ? 'bg-tonal' : 'bg-white'}`}>
                <span className={`grid h-11 w-11 place-items-center rounded-xl border ${index === 3 ? 'border-white/15 bg-white/10 text-saffron-light' : 'border-jade/10 bg-white text-jade'}`}><Icon size={22} /></span>
                <h2 className={`mt-6 font-display text-[1.75rem] font-semibold leading-none ${index === 3 ? 'text-white' : 'text-jade'}`}>{title}</h2>
                <p className={`mt-4 text-xs font-medium leading-6 ${index === 3 ? 'text-white/68' : 'text-charcoal/64'}`}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cities" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <SectionHeading eyebrow="City by city" title="Choose the context you want to taste." />
            <p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">Chiang Mai is not automatically better than Bangkok, and a beach destination is not automatically less serious. Match the class to the route you already have, then judge the operator on teaching format, logistics and menu clarity.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {destinations.map((destination, index) => (
              <article key={destination.city} className={`group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card ${index < 2 ? 'xl:col-span-3' : 'xl:col-span-2'}`}>
                <div className="relative h-52 overflow-hidden">
                  <Image src={destination.image} alt={`${destination.city} food and destination context`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">{destination.eyebrow}</p>
                    <h3 className="mt-1 font-display text-[2rem] font-semibold leading-none">{destination.city}</h3>
                  </div>
                </div>
                <div className="flex min-h-[260px] flex-col p-6">
                  <p className="text-xs font-medium leading-6 text-charcoal/66">{destination.fit}</p>
                  <div className="mt-5 rounded-xl bg-tonal p-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Check before booking</p><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/62">{destination.lookFor}</p></div>
                  <a href={destination.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold text-jade">Check current {destination.city} classes <ArrowRight size={14} className="text-saffron" /></a>
                </div>
              </article>
            ))}
          </div>
          <AffiliateDisclosure className="mt-4">All five city buttons are sponsored Klook links. They open live listings so you can compare the actual date, operator, menu, pickup area, language, cancellation terms and current price.</AffiliateDisclosure>
        </div>
      </section>

      <section id="format" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="What the label hides" title="Market tour, farm visit or kitchen-only?" description="Each format can work. The deciding question is whether the extra stop teaches something you care about or simply adds transfer time." />
            <div className="mt-8 grid gap-3">
              {([
                ['Kitchen-only', 'Efficient and often easier to fit around a city day. Best when technique and individual cooking time are the priority.', UtensilsCrossed],
                ['Market + kitchen', 'Useful when the guide identifies aromatics, sauces and produce and connects them directly to the menu you cook.', ShoppingBasket],
                ['Garden or farm + kitchen', 'Adds ingredient-growing context and a quieter setting, but may increase pickup time and reduce flexibility.', Leaf],
                ['Private class', 'Can suit a focused cook or a complex dietary discussion, provided the operator confirms the requested menu and cross-contact limits in writing.', Users],
              ] as const).map(([title, copy, Icon]) => (
                <article key={String(title)} className="grid grid-cols-[44px_1fr] gap-4 rounded-xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-tonal text-jade"><Icon size={21} /></span>
                  <div><h3 className="font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{copy}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div className="relative min-h-[600px] overflow-hidden rounded-[28px] bg-jade shadow-editorial-lift">
            <Image src="/images/redesign/thai-curry-paste.webp" alt="Thai cook pounding fresh curry paste in a granite mortar" fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <p className="eyebrow !text-saffron-light">Information gain</p>
              <h2 className="max-w-md font-display text-[2.8rem] font-semibold leading-[0.9]">Ask what you will do with your own hands.</h2>
              <p className="mt-5 max-w-lg text-xs font-medium leading-6 text-white/68">“Seven dishes” may mean seven demonstrations, seven shared preparations or seven individual portions. Ask how many dishes you personally prepare from start to finish and whether you choose the curry, stir-fry or soup.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diet" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div><p className="eyebrow !text-saffron-light">Diet & allergy</p><h2 className="font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.035em]">A substitute is not the same as a safe process.</h2></div>
            <p className="max-w-[760px] text-sm font-medium leading-7 text-white/68">Fish sauce, oyster sauce, shrimp paste, peanuts, coconut, egg and gluten-containing sauces can appear in familiar dishes. Shared mortars, woks, oil, knives and worktops also matter. Discuss the exact menu and cross-contact before booking; do not rely on a “vegetarian-friendly” label for a medical allergy.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {([
              ['Before payment', 'Message the operator with the exact allergen or dietary restriction. Ask which dishes can be changed and which shared tools or ingredients remain.', SearchCheck],
              ['At the kitchen', 'Repeat the request before preparation begins and show a professionally translated chef card. Keep prescribed emergency medication with you.', AlertTriangle],
              ['If the answer is vague', 'Choose another class. A friendly response is not enough when staff cannot explain ingredients, equipment or cross-contact controls.', HeartHandshake],
            ] as const).map(([title, copy, Icon]) => (
              <article key={String(title)} className="rounded-2xl border border-white/13 bg-white/[0.065] p-7"><Icon size={25} className="text-saffron-light" /><h3 className="mt-6 font-display text-[1.75rem] font-semibold">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/64">{copy}</p></article>
            ))}
          </div>
          <a href="https://www.foodallergy.org/resources/food-allergy-chef-cards" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Food Allergy Research & Education chef cards <ExternalLink size={14} /></a>
        </div>
      </section>

      <section id="book" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr]">
          <SectionHeading eyebrow="Check the actual listing" title="A booking card should answer these questions." description="Do not compare headline prices alone. Compare the same class length, transfer zone, menu freedom, group format and cancellation conditions for your exact date." />
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {([
                ['Menu', 'Which dishes, and can each guest choose separately?', NotebookTabs],
                ['Teaching', 'Personal station, shared station or demonstration?', ChefHat],
                ['Logistics', 'Exact meeting point, pickup zone and return time?', Map],
                ['Terms', 'Current total, language, cancellation and minimum group?', CircleDollarSign],
              ] as const).map(([title, copy, Icon]) => (
                <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={23} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">{copy}</p></article>
              ))}
            </div>
            <a href={withSubId(KLOOK_GENERIC, 'cooking-owner-en-booking-grid')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group mt-6 min-h-12 px-6">Check current Thai cooking classes <ArrowRight size={16} className="text-saffron transition group-hover:translate-x-1" /></a>
            <AffiliateDisclosure className="mt-3">Sponsored Klook link. Check the current operator, total price, menu, dietary support, pickup, cancellation policy and reviews on the live provider page.</AffiliateDisclosure>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading eyebrow="Continue at home" title="Three tools, only if you will use them." description="A class is the experience. These are optional follow-up tools for practising technique after the trip, not prerequisites for booking one." />
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              {([
                ['Granite mortar', 'For curry paste and som tam texture. Check size, weight and worktop protection.', 'thai-granite-mortar-eight-inch', UtensilsCrossed],
                ['Thai cookbook', 'A structured reference for revisiting techniques and ingredient substitutions at home.', 'simple-thai-food-cookbook', BookOpen],
                ['Rice cooker', 'Useful if rice is a regular part of your cooking. Confirm voltage, capacity and local warranty.', 'zojirushi-six-cup-rice-cooker', Sparkles],
              ] as const).map(([title, copy, slug, Icon]) => (
                <article key={String(slug)} className="flex min-h-[275px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={24} className="text-jade" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p><a href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-dark">Check current price at Amazon <ExternalLink size={12} /></a></article>
              ))}
            </div>
            <AffiliateDisclosure className="mt-4">As an Amazon Associate we earn from qualifying purchases at no extra cost to you. Our central /go/ routes support OneLink, which may send you to a local Amazon store. Product, seller, voltage, delivery, price and availability vary by country.</AffiliateDisclosure>
          </div>
        </div>
      </section>

      <FaqSplitSection
        id="questions"
        eyebrow="Genuine search questions"
        title="Before you reserve a burner"
        description="These are genuine English People Also Ask questions captured in the 27 July 2026 Thailand cooking-class SERPs. Price answers intentionally point to live listings because static totals age quickly."
        items={[...faqs]}
      />

      <RelatedGuidesSection
        eyebrow="Taste more of Thailand"
        title="Build a food-led route"
        readLabel="Open the guide"
        guides={[
          { title: 'Thailand food guide', description: 'Choose dishes by region, setting and dietary needs instead of following a generic checklist.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp', imageAlt: 'Shared table of regional Thai food' },
          { title: 'Thai curry guide', description: 'Understand curry families, paste, heat and ordering before or after your class.', href: '/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp', imageAlt: 'Selection of Thai curries and aromatics' },
          { title: 'Vegetarian Thailand', description: 'Plan around ingredients, language and cross-contact rather than trusting one menu symbol.', href: '/travel-guides/vegetarian-vegan-thailand/', image: '/images/redesign/thai-curry-home-cooking.webp', imageAlt: 'Thai vegetable cooking in a home-style kitchen' },
        ]}
        sideLink={{ label: 'Check current classes on Klook', href: withSubId(KLOOK_GENERIC, 'cooking-owner-en-related'), affiliate: true }}
        disclosure="The side link is sponsored. The three guide cards are editorial internal links."
      />

      <SourceMethodSection
        eyebrow="Sources & method"
        title="Research, not a frozen leaderboard."
        description="Updated 27 July 2026 after DataForSEO owner ranking and backlink checks, 214 keyword records across two clusters, 50 competitor domains, ten live English SERPs, 33 captured PAA questions and three competitor content parses. UK cooking-class, recipe and non-travel intent were excluded. No operator is ranked without comparable current evidence, and no static price or review score is presented as live."
        sources={[
          { title: 'Tomyum Kung — Representative List', creator: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org/en/RL/tomyum-kung-01879', note: 'Primary source for the 2024 inscription and the role of ingredient, cooking and environmental knowledge.' },
          { title: 'Phuket, City of Gastronomy', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Promotions/76/phuket-known-as-the-city-of-gastronomy', note: 'Official context for Phuket’s Thai and Sino-Portuguese food identity; not a class ranking.' },
          { title: 'Chiang Mai destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/chiang%20mai/101', note: 'Official destination context for Lanna culture and local cuisine; not a cooking-school ranking.' },
          { title: 'Food Allergy Chef Cards', creator: 'Food Allergy Research & Education', url: 'https://www.foodallergy.org/resources/food-allergy-chef-cards', note: 'Primary practical resource for communicating food allergies to a chef or manager.' },
          { title: 'Avoiding cross-contact', creator: 'Food Allergy Research & Education', url: 'https://www.foodallergy.org/resources/avoiding-cross-contact', note: 'Primary safety guidance supporting separate questions about equipment, surfaces and preparation.' },
        ]}
      />
    </main>
  );
}
