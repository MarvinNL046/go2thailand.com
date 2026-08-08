import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Check,
  ChefHat,
  CircleHelp,
  Clock3,
  Coffee,
  ExternalLink,
  Eye,
  Flame,
  IceCreamBowl,
  Map,
  MapPin,
  Navigation,
  Salad,
  ShoppingBag,
  Soup,
  Sun,
  UtensilsCrossed,
  WalletCards,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/blog/chatuchak-weekend-market-food-guide/';
const HERO_IMAGE = '/images/redesign/chatuchak-food-hero.webp';
const PAGE_TITLE = 'Chatuchak Weekend Market food: what to eat + smart route';
const PAGE_DESCRIPTION = 'Find the best way to explore Chatuchak Weekend Market food with a 90-minute tasting route, food sections, opening hours, MRT advice and allergen checks.';

const navItems: PageSectionNavItem[] = [
  { href: '#plan', label: 'Choose a plan', icon: BadgeCheck },
  { href: '#route', label: 'Food route', icon: Navigation },
  { href: '#eat', label: 'What to eat', icon: UtensilsCrossed },
  { href: '#timing', label: 'Timing', icon: Clock3 },
  { href: '#choose', label: 'Choose well', icon: Eye },
  { href: '#market-kit', label: 'Market kit', icon: ShoppingBag },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

const foodDirections: Array<{
  icon: LucideIcon;
  title: string;
  cue: string;
  description: string;
  orderTip: string;
}> = [
  {
    icon: Soup,
    title: 'Rice & curry',
    cue: 'Fast and shareable',
    description: 'Khao gaeng pairs rice with one or more prepared dishes. You can see the available trays before ordering, compare textures and share two flavours without committing to a large meal.',
    orderTip: 'Point to each tray, ask what is inside and confirm whether rice is included or charged separately.',
  },
  {
    icon: Flame,
    title: 'Wok & noodles',
    cue: 'Made to order',
    description: 'A dish cooked after you order lets you watch the sequence and temperature. Noodles, fried rice and basil stir-fries are useful anchors when you want something hot rather than another snack.',
    orderTip: 'Discuss chilli before the wok starts. A paste or premixed sauce may already contain heat, fish sauce or shellfish.',
  },
  {
    icon: ChefHat,
    title: 'Grill & skewers',
    cue: 'Start small',
    description: 'Grilled meat, sausage, fish or vegetables work as a first shared bite. Marinades and dips can contain soy, fish sauce, sugar, peanut or other ingredients that are not obvious by sight.',
    orderTip: 'Check the portion, chosen protein and sauce before ordering several pieces at once.',
  },
  {
    icon: Salad,
    title: 'Fresh & Isaan',
    cue: 'Sour, salty, spicy',
    description: 'Som tam, larb and herb-heavy salads can feel refreshing in the heat, yet their base often includes chilli, fish sauce and sometimes peanut or dried shrimp. “Vegetable” does not mean vegetarian.',
    orderTip: 'Ask about chilli and allergens separately; changing one ingredient does not remove cross-contact.',
  },
  {
    icon: IceCreamBowl,
    title: 'Cold & sweet',
    cue: 'Finish cool',
    description: 'Fruit, coconut ice cream and mango sticky rice are natural final stops. Ripeness, toppings and exact availability change with season, time of day and the individual stall.',
    orderTip: 'Ask for toppings separately when you need to avoid peanut, dairy, coconut or another ingredient.',
  },
  {
    icon: Coffee,
    title: 'Drinks & pauses',
    cue: 'Water first',
    description: 'Water is the foundation; Thai tea, coffee, juice and smoothies are extras. Sweetness can be higher than expected, and a sugary drink does not automatically replace water during a hot market walk.',
    orderTip: 'Ask for less sugar before mixing and decide about ice using your own travel-health guidance.',
  },
];

const faqs = [
  {
    question: 'Does Chatuchak Market have food?',
    answer: 'Yes. Food and drinks appear throughout the market, and the published section guide lists food and beverage in sections 2, 3, 4, 23, 24, 26 and 27. Treat those numbers as orientation rather than a fixed restaurant map because individual stalls, aisles and opening times can change.',
  },
  {
    question: 'Where is the food court in Chatuchak Market?',
    answer: 'Chatuchak is not organised around one single food court. The market publishes food and beverage across several sections, while individual stalls also line main and side aisles. Section 3 is a useful food reference, but a route based on several zones and a permanent landmark is more reliable than searching for one room labelled food court.',
  },
  {
    question: 'What to eat in Chatuchak Weekend Market?',
    answer: 'Build variety rather than chasing a brittle top-15 list: choose one hot base such as rice with curry or noodles, one grilled or fresh dish, then one cold dessert or drink. Coconut ice cream, mango sticky rice, papaya salad, skewers and noodle dishes are common directions, but availability changes by stall and day.',
  },
  {
    question: 'What is the best time to go to Chatuchak Market?',
    answer: 'For a food-first visit, roughly 09:30–11:30 is a practical editorial window: more stalls have opened while the strongest midday heat and lunch pressure may still be ahead. Go earlier if cooler walking matters most, but allow individual food businesses time to start. This is planning advice, not live crowd data.',
  },
  {
    question: 'Is Chatuchak open every day?',
    answer: 'No, not as the complete weekend market. The market publishes Saturday and Sunday 09:00–18:00 for the whole market. Plant-focused periods and the Friday wholesale evening are different experiences and should not be treated as substitutes for a full food-and-shopping visit. Recheck official channels around holidays.',
  },
  {
    question: 'Do I need cash for Chatuchak Market?',
    answer: 'Bring Thai baht in small notes as a dependable backup. Some stalls accept Thai QR payments, but those often require a local banking setup, and international card acceptance is not universal. Confirm the price and payment method before food is prepared, then keep cash and your phone secure in crowded aisles.',
  },
  {
    question: 'Can you haggle at Chatuchak?',
    answer: 'Bargaining may be possible for some merchandise or multiple items, but it is not the natural default for prepared food with a visible price. If a food price or portion is unclear, ask before ordering and decide whether it suits you. Treat a small food stall differently from a negotiable bulk purchase.',
  },
  {
    question: 'How many hours to spend in Chatuchak?',
    answer: 'Allow about 90 minutes for this focused route and three shared food choices. Chatuchak’s own guidance suggests at least three hours for a brief market sweep and around five for a deeper visit. If you want to shop extensively, pause and compare several sections, reserve half a day instead of stacking a full market tour onto a long food checklist.',
  },
  {
    question: 'Which MRT station is Chatuchak Market?',
    answer: 'MRT Kamphaeng Phet is a convenient food-first arrival because it places you close to the western and inner market area. MRT Chatuchak Park and BTS Mo Chit are also useful depending on where you start and which side you want to explore. Save the station name and exit offline before entering the market.',
  },
  {
    question: 'Is it worth it to go to Chatuchak Market?',
    answer: 'Yes when you want food, shopping and the scale of a weekend market in one experience. If eating is your only priority, a smaller food market, food court or guided food route may offer easier comparison and more seating. Chatuchak’s strength is the combination, not a guarantee that every famous dish or stall will be available.',
  },
  {
    question: 'Is it safe to eat street food in Bangkok?',
    answer: 'No market or stall can be declared safe through a general webpage. CDC guidance notes extra risk with street-vendor food and says fully cooked food served hot is generally the safer choice. Look for clean handling, separation of raw and cooked ingredients and food held appropriately hot or cold; people with higher medical risk should seek personalised clinical advice.',
  },
  {
    question: 'How to avoid food poisoning in Bangkok?',
    answer: 'Risk cannot be removed, but it can be reduced. Follow the WHO principles: keep clean, separate raw and cooked food, cook thoroughly, maintain safe temperatures and use safe water and ingredients. For travellers, CDC advises care with raw foods and recommends food that is fully cooked and served hot. Wash or sanitise hands before eating and do not rely on appearance alone.',
  },
];

const sources = [
  {
    title: 'Chatuchak Weekend Market — opening and contact information',
    creator: 'Chatuchak Market',
    url: 'https://www.chatuchakmarket.org/contact/',
    note: 'Used for the full weekend-market hours and the distinction from plant-only and wholesale periods.',
  },
  {
    title: 'Sections at Chatuchak Market',
    creator: 'Chatuchak Market',
    url: 'https://www.chatuchakmarket.org/sections/',
    note: 'Primary orientation source for the published food and beverage sections and the section/soi navigation system.',
  },
  {
    title: 'Tips and FAQs',
    creator: 'Chatuchak Market',
    url: 'https://www.chatuchakmarket.org/tips-and-faqs/',
    note: 'Used for official visitor-planning context, including suggested time for a brief or deeper market visit.',
  },
  {
    title: 'Food and Water Precautions for Travelers',
    creator: 'U.S. Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/yellow-book/hcp/preparing-international-travelers/food-and-water-precautions-for-travelers.html',
    note: 'Primary travel-health source for cautious wording about street-vendor food, raw ingredients and fully cooked food served hot.',
  },
  {
    title: 'Five keys to safer food',
    creator: 'World Health Organization',
    url: 'https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food/',
    note: 'Primary source for cleanliness, raw/cooked separation, thorough cooking, safe temperature and safe water principles.',
  },
];

const amazonProducts: Array<{ slug: AmazonAffiliateSlug; title: string; reason: string; icon: LucideIcon }> = [
  {
    slug: 'venture-pal-packable-backpack',
    title: 'Packable daypack',
    reason: 'Room for water and small purchases without bringing a large travel bag into narrow aisles. Compare capacity, straps and seller details.',
    icon: ShoppingBag,
  },
  {
    slug: 'anker-powercore-10k',
    title: 'Compact power bank',
    reason: 'Keeps maps and the route back to your hotel available on a long market day. Confirm capacity, airline rules and cable compatibility.',
    icon: BatteryCharging,
  },
  {
    slug: 'sun-cube-wide-brim-hat',
    title: 'Lightweight sun hat',
    reason: 'Useful for exposed paths and the station walk. Check fit, material and care instructions before buying.',
    icon: Sun,
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
      datePublished: '2026-03-19',
      dateModified: '2026-07-26',
      inLanguage: 'en',
      mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      '@id': `${PAGE_URL}#place`,
      name: 'Chatuchak Weekend Market',
      description: 'Bangkok weekend market with food, drinks, clothing, art, homeware and many other categories.',
      url: 'https://www.chatuchakmarket.org/',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kamphaeng Phet 2 Road',
        addressLocality: 'Chatuchak, Bangkok',
        postalCode: '10900',
        addressCountry: 'TH',
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '09:00', closes: '18:00' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Chatuchak Market food guide', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Six durable food directions at Chatuchak Market',
      itemListElement: foodDirections.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.description,
      })),
    },
  ];
}

export function ChatuchakFoodGuideEn() {
  const subId = useSubId();
  const foodTourHref = withPlacementSubId(KLOOK_GENERIC, subId, 'chatuchak-food-en-related-tour');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="chatuchak market food, what to eat at chatuchak market, chatuchak food section, chatuchak food route, chatuchak market opening hours" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-19" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Food stalls and visitors at Chatuchak Weekend Market in Bangkok"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Chatuchak food' }]}
          breadcrumbAriaLabel="Breadcrumb"
          eyebrow="A food route through the maze"
          title={<>Taste<br />Chatuchak.</>}
          subtitle={<>Without losing your route.</>}
          description={<>Skip the fragile checklist of famous stalls. This plan shows where to start, how to share three contrasting choices, when to pause and how to make better food decisions even when vendors move.</>}
          actions={[
            { label: 'Choose your food plan', href: '#plan', kind: 'primary' },
            { label: 'See the route', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[730px]"
          contentClassName="max-w-[680px]"
          titleClassName="max-w-[660px] text-[4.2rem] leading-[0.82] sm:text-[5.4rem] lg:text-[6.2rem]"
          subtitleClassName="max-w-[620px] text-[1.9rem] leading-[0.96] text-saffron-dark sm:text-[2.75rem]"
          imageClassName="object-cover object-[66%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.63)_48%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_40%,rgba(252,250,246,0.18)_68%,rgba(18,63,54,0.08)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[330px] overflow-hidden rounded-2xl border border-white/60 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Food-first departure card</p><UtensilsCrossed size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Full market</dt><dd className="font-extrabold text-jade">Sat–Sun 09:00–18:00</dd>
                <dt className="text-charcoal/46">Start</dt><dd className="font-extrabold text-jade">MRT Kamphaeng Phet</dd>
                <dt className="text-charcoal/46">Food zones</dt><dd className="font-extrabold text-jade">2–4, 23–24 and 26–27</dd>
                <dt className="text-charcoal/46">Food only</dt><dd className="font-extrabold text-jade">About 90 minutes</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/58">Sections help you orientate; individual stalls and passages can change.</p>
            </aside>
          )}
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section id="plan" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="Choose the purpose first"
                title={<>What should the<br />market give you?</>}
                description={<>Chatuchak is far larger than a food court. Let food support your route rather than dictate every turn. For shopping, all sections and a complete visit, use our <Link href="/blog/chatuchak-market-bangkok-guide/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">full Chatuchak guide</Link>; this page owns the tasting plan.</>}
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [UtensilsCrossed, 'Food only', 'Start at Kamphaeng Phet, walk one loop and share three small, contrasting choices.', '± 90 min'],
                  [ShoppingBag, 'Shop + eat', 'Schedule one savoury break halfway and a cold finish close to your chosen exit.', '3–4 hours'],
                  [ChefHat, 'Learn flavours', 'Compare visible preparations and flavour families rather than chasing online fame.', '2–3 hours'],
                  [Sun, 'Cooler & calmer', 'Arrive early, mark a shade or air-conditioned pause and limit yourself to two zones.', '± 2 hours'],
                ].map(([Icon, title, text, time], index) => {
                  const CardIcon = Icon as LucideIcon;
                  return (
                    <article key={String(title)} className={`flex min-h-[290px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/40 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                      <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><CardIcon size={20} strokeWidth={1.5} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(time)}</span></div>
                      <h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none text-jade">{String(title)}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{String(text)}</p>
                      <span className="mt-auto pt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-jade/48">Plan 0{index + 1}</span>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[650px]">
              <Image src="/images/redesign/chatuchak-food-route.webp" alt="Several food paths through Chatuchak Weekend Market" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/92 via-jade/48 to-transparent p-7 pt-32 text-white">
                <p className="eyebrow !text-saffron-light">Your map is a compass</p>
                <h2 className="max-w-xl font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Save a section and a permanent landmark.</h2>
                <p className="mt-4 max-w-lg text-xs font-medium leading-6 text-white/64">A stall number alone is weak when a passage changes. Add the soi, a gate, station or another recognisable fixed point.</p>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Three loops, no zigzag"
                title="A food route with room to adapt"
                description={<>The published directory names sections 2, 3, 4, 23, 24, 26 and 27 for food and beverage. Use them to choose a direction, not as a promise that one specific dish always sits in the same place. Our <Link href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">BTS and MRT guide</Link> helps with the trip from your hotel.</>}
              />
              <ol className="mt-8 space-y-6">
                {[
                  ['09:30 — scan the west side', 'Start at MRT Kamphaeng Phet when it fits your journey. Walk the edge of sections 2–4, mark a drink point and resist ordering a full meal at the first busy stall.'],
                  ['10:00 — share something hot', 'Choose one freshly prepared base and one small snack. Only then continue towards 23–24 or 26–27, keeping your hands free between food zones.'],
                  ['10:45 — cool down and decide', 'Finish with fruit, coconut or a drink. Decide whether to continue shopping, and let the route end at the station you genuinely plan to use.'],
                ].map(([title, text], index) => (
                  <li key={title} className="grid grid-cols-[50px_1fr] gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-jade font-display text-xl font-semibold text-saffron-light">0{index + 1}</span>
                    <div><h3 className="font-display text-[1.5rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/66">{text}</p></div>
                  </li>
                ))}
              </ol>
              <a href="https://www.chatuchakmarket.org/map/" target="_blank" rel="noopener noreferrer" className="btn-cream mt-8 min-h-12 px-6 text-saffron-dark">Open the current market map <ExternalLink size={15} /></a>
            </div>
          </div>
        </section>

        <section id="eat" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading
                eyebrow="No compulsory top fifteen"
                title="Six food directions that age well"
                description={<>Stalls move and online favourites disappear; a good decision method lasts longer. Use these flavour directions for a varied route, then read our <Link href="/blog/thai-curry-guide-green-red-yellow-massaman-panang/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Thai curry guide</Link> to separate colour, flavour, texture and heat.</>}
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/62">A balanced tasting route can be as simple as one hot base, one grilled or fresh contrast and one cold finish. That is enough to experience several techniques without allowing every queue and trend to hijack the plan. Ask what is genuinely available that day instead of treating an old vendor list as a contract.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {foodDirections.map(({ icon: Icon, title, cue, description, orderTip }) => (
                <article key={title} className="group flex min-h-[350px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
                  <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#eef2ed] text-jade"><Icon size={23} strokeWidth={1.45} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{cue}</span></div>
                  <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{description}</p>
                  <div className="mt-auto border-t border-jade/10 pt-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/50">Order check</p><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/62">{orderTip}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timing" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <p className="eyebrow !text-saffron-light">Time is an ingredient</p>
                  <h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em]">Eat before heat and hunger make every decision.</h2>
                  <p className="mt-6 text-sm font-medium leading-7 text-white/66">The whole market publishes Saturday and Sunday 09:00–18:00. Individual food stalls can vary. Arrive with a little appetite, drink water first and plan a real pause before energy drops.</p>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                  {[
                    ['09:00–11:30', 'Food first', 'More orientation and usually less midday heat. Allow food businesses enough time to complete their setup.', 'Best for a route'],
                    ['11:30–14:30', 'Lunch pressure', 'More atmosphere and choice, but also stronger pressure on aisles, seats and popular orders.', 'Best for energy'],
                    ['14:30–17:30', 'Shop + snack', 'Logical when shopping comes first. Do not assume every specific dish remains available near closing.', 'Best as a finish'],
                  ].map(([time, title, text, cue]) => (
                    <article key={time} className="flex min-h-[320px] flex-col bg-jade p-7 sm:py-10">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{time}</p>
                      <h3 className="mt-5 font-display text-[1.7rem] font-semibold leading-none">{title}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-white/62">{text}</p>
                      <p className="mt-auto border-t border-white/12 pt-5 text-[10px] font-extrabold text-white/75">{cue}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                [Sun, 'Heat stop', 'Do not wait for dizziness or nausea. Find shade or air conditioning, drink water and shorten the visit when recovery does not follow.'],
                [MapPin, 'Fixed meeting point', 'Choose a gate, station or permanent building. “Near the food stalls” is too vague in a market of this scale.'],
                [WalletCards, 'Payment backup', 'Carry small notes. Thai QR and cards vary by stall, so an ATM symbol on a map is not a complete payment plan.'],
              ].map(([Icon, title, text]) => {
                const TipIcon = Icon as LucideIcon;
                return <article key={String(title)} className="grid grid-cols-[44px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-11 w-11 place-items-center rounded-full border border-saffron/30 text-jade"><TipIcon size={19} /></span><div><h3 className="font-display text-xl font-semibold text-jade">{String(title)}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{String(text)}</p></div></article>;
              })}
            </div>

            <div className="mt-10 grid gap-8 rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9 lg:grid-cols-[0.58fr_1.42fr]">
              <div>
                <p className="eyebrow">Prevent route failure</p>
                <h2 className="font-display text-[2.75rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade">Four plans that work better on paper than in the market.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Chatuchak is not a climate-controlled mall with an immutable directory. A strong plan has anchors but leaves room to skip an aisle, pause early or leave without finding one internet-famous snack.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Treating Friday as a full food day', 'Friday wholesale evening is not the same complete experience as Saturday and Sunday. Choose the full weekend window when you want food zones and shopping together, then verify temporary changes.'],
                  ['Arriving with fifteen stall names', 'One closed or relocated vendor can turn an efficient-looking list into a zigzag. Choose three flavour directions and replace a missed stall with a preparation you can assess on the day.'],
                  ['Eating with both hands already full', 'A drink, shopping bag, map and hot snack make a crowded aisle unnecessarily difficult. Finish and clear one choice before carrying the next.'],
                  ['Counting sweet drinks as all hydration', 'Thai tea or a smoothie can refresh, but it does not automatically replace water. Start with water and add another drink break when heat, walking and salty food combine.'],
                ].map(([title, text], index) => (
                  <article key={title} className="border-l-2 border-saffron/55 pl-5">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Avoid 0{index + 1}</p>
                    <h3 className="mt-2 font-display text-[1.4rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="choose" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Stall by stall"
                  title="Look, ask, order — in that order"
                  description={<>A long queue suggests popularity, not automatic suitability for your taste, diet or medical needs. Our wider <Link href="/thailand-street-food/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Thailand street-food guide</Link> helps you compare stalls, markets and food courts beyond Chatuchak.</>}
                />
                <div className="mt-8 space-y-4">
                  {[
                    ['01', 'Watch the preparation', 'Is a hot dish cooked after ordering or kept appropriately hot? Are raw and cooked ingredients handled separately? A quick process check is more useful than a viral name.'],
                    ['02', 'Ask price and portion', 'When either is unclear, ask before ordering what one portion includes. Sharing only works well when you understand quantity, sides and sauces.'],
                    ['03', 'Separate heat, diet and allergy', '“Not spicy”, vegetarian and allergy-safe are three different questions. Curry paste, fish sauce, peanut, shellfish, egg and shared oil can be hidden.'],
                    ['04', 'Order small and reassess', 'Start with one portion, taste it and then decide whether to return. You reduce waste and preserve appetite for something better discovered later.'],
                  ].map(([step, title, text]) => (
                    <article key={step} className="grid grid-cols-[48px_1fr] gap-4 rounded-2xl border border-jade/10 bg-tonal p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-jade font-display text-lg text-saffron-light">{step}</span><div><h3 className="font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/66">{text}</p></div></article>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[540px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[680px]">
                <Image src="/images/redesign/chatuchak-food-choice.webp" alt="Traveller comparing freshly prepared dishes at a Chatuchak food stall" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-jade/[0.9] p-6 text-white backdrop-blur-md sm:left-auto sm:w-[350px]">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">The strongest first question</p>
                  <p className="mt-2 font-display text-[1.8rem] font-semibold leading-none">What will be cooked fresh for me now?</p>
                  <p className="mt-3 text-[10px] font-medium leading-5 text-white/62">Then ask separately about heat, ingredients, portion and price.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-8 rounded-[26px] border border-jade/10 bg-[#f3eee3] p-7 sm:p-9 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="eyebrow">Food safety & allergens</p>
                <h2 className="font-display text-[2.85rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade">Reduce risk without pretending a queue proves safety.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">CDC travel guidance notes that street-vendor food adds risk and generally favours food that is fully cooked and served hot. WHO’s framework adds clean handling, raw/cooked separation, safe temperatures and safe water. These are decision aids, not a guarantee about any stall.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Heat and holding', 'Prefer food cooked thoroughly and served hot. Be cautious with lukewarm dishes and raw or undercooked meat, seafood and egg. A good appearance or smell cannot prove safety.'],
                  ['Hands and utensils', 'Clean-looking preparation and separate tools for raw and cooked food support a better decision. Clean your own hands before eating and avoid placing food bags on dirty surfaces.'],
                  ['Serious allergy', 'Removing one visible ingredient does not remove cross-contact through oil, grill, wok, tongs or chopping board. Show a professionally translated allergy card before ordering.'],
                  ['When the answer is unclear', 'If staff cannot reliably explain ingredients or shared preparation, choose another dish or a controlled alternative. Popularity and politeness are not substitutes for information.'],
                ].map(([title, text], index) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Decision 0{index + 1}</p><h3 className="mt-3 font-display text-[1.45rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
              <SectionHeading eyebrow="Food destination or market experience?" title="Chatuchak does not need to be your only food plan" description="Choose it for the combination. When eating is the sole purpose, a smaller market, food court or guided route may provide easier comparison, seating and dietary communication." />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['Choose Chatuchak', 'You want shopping and casual tasting, have a weekend morning free and see wandering as part of the experience.'],
                  ['Choose one market lunch', 'Shopping is the priority. One planned food zone becomes a real break rather than a second full route.'],
                  ['Choose a food-first alternative', 'Food is the primary purpose, you want easier ingredient comparison or Chatuchak’s scale and heat cost too much energy.'],
                ].map(([title, text], index) => (
                  <article key={title} className={`rounded-2xl border p-6 ${index === 0 ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-charcoal'}`}><span className={`text-[9px] font-extrabold uppercase tracking-[0.14em] ${index === 0 ? 'text-saffron-light' : 'text-saffron-dark'}`}>Choice 0{index + 1}</span><h3 className={`mt-4 font-display text-[1.55rem] font-semibold leading-none ${index === 0 ? 'text-white' : 'text-jade'}`}>{title}</h3><p className={`mt-4 text-xs font-medium leading-6 ${index === 0 ? 'text-white/65' : 'text-charcoal/64'}`}>{text}</p></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="market-kit" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
                <div className="relative min-h-[430px] lg:min-h-[650px]">
                  <Image src="/images/redesign/chatuchak-market-kit.webp" alt="Compact Chatuchak market kit with daypack, sun hat, power bank, water bottle and map" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/78 via-transparent to-transparent" />
                  <div className="absolute bottom-7 left-7 right-7"><p className="eyebrow !text-saffron-light">Pack light</p><h2 className="max-w-lg font-display text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.04em]">Make room for water, your route and what you actually buy.</h2></div>
                </div>
                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="text-sm font-medium leading-7 text-white/68">For a large open-air market, three items are more credible than a long gadget list: carrying space that stays out of the way, enough battery for maps and your return journey, and protection on exposed paths. These products are examples, not necessities; compare size, material, specifications, seller and local availability yourself.</p>
                  <div className="mt-7 space-y-3">
                    {amazonProducts.map(({ slug, title, reason, icon: Icon }) => (
                      <a key={slug} href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid grid-cols-[42px_1fr_34px] items-start gap-4 rounded-xl border border-white/13 bg-white/[0.065] p-4 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                        <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/35 text-saffron-light"><Icon size={18} /></span>
                        <span><strong className="block text-xs text-white">{title}</strong><span className="mt-1 block text-[10px] leading-4 text-white/55">{reason}</span><span className="mt-2 block text-[9px] font-extrabold uppercase tracking-[0.08em] text-saffron-light">Check current price at Amazon</span></span>
                        <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-white/60 transition group-hover:text-saffron-light"><ExternalLink size={13} /></span>
                      </a>
                    ))}
                  </div>
                  <AffiliateDisclosure className="mt-4 !text-white/54">Amazon affiliate disclosure: as an Amazon Associate, we may earn from qualifying purchases at no extra cost to you. Our central <strong className="text-white/72">/go/</strong> router supports OneLink, which may send you to a local Amazon store. Product, price, seller, delivery and availability vary by country.</AffiliateDisclosure>
                  <div className="mt-8 border-t border-white/12 pt-7">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Bring from your room</p>
                    <ul className="mt-4 grid gap-3 text-xs font-medium leading-5 text-white/64 sm:grid-cols-2">
                      <li className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-saffron-light" />Water and small Thai notes</li>
                      <li className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-saffron-light" />Offline station and exit</li>
                      <li className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-saffron-light" />Permanent meeting point</li>
                      <li className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-saffron-light" />Allergy card if required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real search questions" title="Frequently asked questions about Chatuchak food" description="Every question below was captured verbatim in the English SERP research. Answers separate official market facts from editorial planning estimates and health-risk guidance." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Keep eating in Bangkok"
          title="Build a food day that matches your energy"
          guides={[
            { title: 'Complete Chatuchak guide', description: 'Plan the whole market, shopping sections, route and visit length outside this food-first owner.', href: '/blog/chatuchak-market-bangkok-guide/', image: '/images/redesign/chatuchak-food-route.webp', imageAlt: 'Paths through Chatuchak Market' },
            { title: 'Choose a Thai curry', description: 'Compare green, red, yellow, massaman and panang by flavour, texture, heat and allergens.', href: '/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp', imageAlt: 'Several Thai curries at a food stall' },
            { title: 'Bangkok street food', description: 'Choose neighbourhoods and eating formats when food matters more than one enormous market.', href: '/thailand-street-food/', image: '/images/redesign/chatuchak-food-choice.webp', imageAlt: 'Choosing food at a Bangkok stall' },
          ]}
          readLabel="Read the guide"
          sideLink={{ label: 'Check current food-tour price at Klook', href: foodTourHref, affiliate: true }}
          disclosure="The Klook link opens broader Bangkok food experiences, not a required Chatuchak entrance ticket. We may receive commission after a booking; price, schedule and availability can change. The three guide cards are editorial internal links."
        />

        <SourceMethodSection
          eyebrow="Sources & editorial method"
          title="A route that does not break when one stall moves"
          description="This English owner combines current market and public-health sources with independent DataForSEO keyword, ranking, backlink, SERP, competitor and exact-PAA research. It avoids unverified visit claims, old hard prices and promises about individual vendors. Last substantive review: 26 July 2026."
          sources={sources}
        />

        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <div className="flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="eyebrow">Ready to taste?</p><h2 className="font-display text-[2.6rem] font-semibold leading-none text-jade">Start with water. Then share three choices.</h2></div>
              <div className="flex flex-wrap gap-3"><a href="#route" className="btn-jade btn-jade-pattern group min-h-12 px-6">See the food route <ArrowRight size={15} className="text-saffron" /></a><Link href="/city/bangkok/" className="btn-cream min-h-12 px-6 text-saffron-dark">Plan Bangkok <Map size={15} /></Link></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

