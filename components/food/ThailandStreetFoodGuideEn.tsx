import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChefHat,
  Clock3,
  ExternalLink,
  Flame,
  HeartHandshake,
  Map,
  MapPin,
  MoonStar,
  ShieldCheck,
  ShoppingBasket,
  Store,
  Sun,
  UtensilsCrossed,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/thailand-street-food/';
const HERO = '/images/redesign/bangkok-street-food-hero.webp';
const UPDATED_AT = '2026-07-29';

const venueChoices = [
  {
    title: 'Made-to-order stall',
    fit: 'You want one hot rice or noodle dish and can watch it being cooked.',
    look: 'A short menu, a clean working rhythm and ingredients kept separate from waste and cash handling.',
    icon: Flame,
  },
  {
    title: 'Specialist cart',
    fit: 'You want one snack, dessert, soup or grilled item the vendor repeats all day.',
    look: 'Steady turnover and food protected from contamination; reheating cannot rescue poor storage.',
    icon: Store,
  },
  {
    title: 'Night market',
    fit: 'Your group wants variety and you prefer several small tastes over one full plate.',
    look: 'Choose a bounded loop. Market size and social-media fame do not prove every stall is good.',
    icon: MoonStar,
  },
  {
    title: 'Food court',
    fit: 'You value seating, clearer menus, mixed preferences and easier payment.',
    look: 'Check how its payment card works and remember that an indoor venue is not an allergy guarantee.',
    icon: ShoppingBasket,
  },
] as const;

const dishRoutes = [
  {
    label: 'One hot plate',
    title: 'Cooked to order',
    description: 'Begin with a dish that goes from wok to plate in front of you. Confirm chilli and ingredients before the pan gets busy.',
    picks: [
      { name: 'Pad kra pao', note: 'Basil stir-fry over rice; ask about the protein and fried egg.', href: '/food/pad-kra-pao/' },
      { name: 'Pad see ew', note: 'Broad rice noodles with dark seasoning and greens.', href: '/food/pad-see-ew/' },
      { name: 'Khao pad', note: 'Fried rice is familiar, but sauces and garnishes still vary.', href: '/food/khao-pad/' },
    ],
    image: '/images/redesign/pad-kra-pao-bangkok-hero.webp',
  },
  {
    label: 'Sour, grilled & shared',
    title: 'Build an Isaan set',
    description: 'Som tam, grilled chicken and sticky rice create contrast. Order the salad heat knowingly and ask about pla ra or dried shrimp.',
    picks: [
      { name: 'Som tam', note: 'Papaya salad pounded to order; the variation matters.', href: '/food/som-tam/' },
      { name: 'Laab', note: 'Minced meat, herbs, lime and toasted rice powder.', href: '/food/larb/' },
      { name: 'Gai yang', note: 'Grilled chicken works as the calm anchor beside a sharp salad.', href: '/food/gai-yang/' },
    ],
    image: '/images/redesign/som-tam-dish-hero.webp',
  },
  {
    label: 'A bowl with a place',
    title: 'Follow the region',
    description: 'A regional bowl teaches more than repeating the same famous dish in every city. Use the destination as part of the choice.',
    picks: [
      { name: 'Khao soi', note: 'Northern curry noodles with soft and crisp texture.', href: '/blog/khao-soi-chiang-mai-guide/' },
      { name: 'Boat noodles', note: 'Small, concentrated bowls associated with Bangkok.', href: '/food/boat-noodles/' },
      { name: 'Tom yum noodles', note: 'A noodle format built around hot-sour aromatics.', href: '/food/tom-yum-noodles/' },
    ],
    image: '/images/redesign/khao-soi-chiang-mai-hero.webp',
  },
] as const;

const cityRoutes = [
  {
    city: 'Bangkok',
    signal: 'Neighbourhood choice matters most',
    description: 'Use Yaowarat for a dense evening food route, Chatuchak for a daytime market and specialist neighbourhoods for one focused dish.',
    href: '/blog/best-street-food-markets-bangkok/',
    image: '/images/redesign/bangkok-food-yaowarat.webp',
  },
  {
    city: 'Chiang Mai',
    signal: 'Northern dishes become the route',
    description: 'Look beyond a generic night-bazaar list toward khao soi, sai ua, chilli dips and local morning or evening markets.',
    href: '/city/chiang-mai/food/',
    image: '/images/redesign/chiang-rai-food-coffee.webp',
  },
  {
    city: 'Phuket',
    signal: 'Old Town changes the menu',
    description: 'Chinese-Thai and southern influences make kopitiams, Hokkien noodles and local sweets more useful targets than another pad thai.',
    href: '/city/phuket/food/',
    image: '/images/redesign/phuket-food-kopitiam.webp',
  },
] as const;

const stallChecks = [
  ['Watch the whole cycle', 'Look at storage, preparation, cooking, serving and cleaning—not only a queue. Busy is useful context, not proof of safety.', Clock3],
  ['Prefer food cooked through', 'A dish served hot immediately after cooking is easier to assess than food that has sat at an uncertain temperature.', Flame],
  ['Separate raw and ready-to-eat', 'Notice whether utensils, boards and hands move between raw ingredients, cooked food, money and waste.', ShieldCheck],
  ['Treat allergies differently', 'A translated card and a clear conversation can help, but shared surfaces, sauces, stocks and cross-contact remain possible.', AlertTriangle],
] as const;

const eveningPlan = [
  { time: '17:30', title: 'Start savoury', text: 'Choose one made-to-order anchor while the market is still easy to scan.', icon: Sun },
  { time: '18:15', title: 'Add contrast', text: 'Share something grilled, sour or crunchy instead of buying another full plate.', icon: UtensilsCrossed },
  { time: '19:00', title: 'Pause and reassess', text: 'Water, seating and appetite matter more than completing a checklist.', icon: Clock3 },
  { time: '19:30', title: 'Finish small', text: 'Fruit or a dessert can close the route without turning the evening into a food marathon.', icon: MoonStar },
] as const;

const faqs = [
  { question: 'What is typical Thai street food?', answer: 'Typical formats include rice and noodle dishes cooked to order, grilled skewers, soups, salads, fruit, drinks and small sweets. Street food describes how and where food is sold, not one fixed national menu.' },
  { question: 'What is the best Thai street food?', answer: 'There is no universal best dish. Pad kra pao or pad see ew suits a hot made-to-order meal; som tam with grilled chicken creates a shared Isaan-style set; khao soi makes sense when exploring northern food. Choose by format, region, appetite and dietary needs.' },
  { question: 'What street food should I eat in Thailand first?', answer: 'Start with food you can identify and watch being cooked, such as a rice or noodle dish from a specialist stall. Then add one contrasting snack, salad or dessert. A short, varied route is more useful than attempting a long must-eat list.' },
  { question: 'Should you eat street food in Thailand?', answer: 'Many travellers choose to, but no guide can guarantee an individual stall or meal is safe. Assess handling and turnover, prefer food cooked thoroughly and served hot, communicate allergies clearly and make a conservative choice whenever the setup gives you doubt.' },
  { question: 'What is the safest food to eat in Thailand?', answer: 'No particular Thai dish is universally safest. Food that is thoroughly cooked, served promptly and handled with clean utensils is generally easier to assess than food stored for an unknown time. Your medical needs and allergies can change the decision.' },
  { question: 'What food should I avoid in Thailand to not get sick?', answer: 'Avoid making a blacklist by dish name. Walk away from food with uncertain storage, poor separation of raw and cooked ingredients, visibly unclean utensils, or a setup that makes you uncomfortable. General WHO food-safety principles remain more reliable than folklore.' },
  { question: 'What should I eat at a Thailand night market?', answer: 'Use a three-part route: one hot anchor dish, one contrasting grilled or fresh item, and one small sweet or fruit finish. This creates variety without buying several full meals or choosing stalls only because they are viral.' },
  { question: 'What is a must-eat dish in Bangkok?', answer: 'Bangkok has no single compulsory dish. Boat noodles, pad kra pao, Chinese-Thai food around Yaowarat and specialist market snacks each answer a different food question. Choose the neighbourhood first, then a dish that fits it.' },
  { question: 'How much does Thai street food cost?', answer: 'Prices vary by city, venue, ingredients, portion and tourist concentration and can change quickly. Check the displayed menu or ask before ordering; this guide deliberately avoids presenting a stale countrywide price as a promise.' },
  { question: 'Do you need cash for Thai street food?', answer: 'Cash remains useful, especially at small stalls, although QR payment is common for people with compatible Thai banking access. Carry small denominations, confirm the amount before paying and keep a backup payment option.' },
] as const;

const sources = [
  { title: 'Five keys to safer food', creator: 'World Health Organization', url: 'https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food', note: 'Primary framework for keeping clean, separating raw and cooked food, cooking thoroughly and using safe ingredients.' },
  { title: 'Regional consultation on safe street foods', creator: 'WHO South-East Asia', url: 'https://www.who.int/publications/i/item/regional-consultation-on-safe-street-foods', note: 'Regional guidance on street-food safety, regulation and monitoring. It supports a process-based assessment rather than claiming any stall is risk-free.' },
  { title: 'Discover Thai cuisine through its famous four regions', creator: 'Tourism Authority of Thailand Newsroom', url: 'https://www.tatnews.org/2018/01/discover-thai-cuisine-famous-four-regions/', note: 'Regional food orientation used to keep destination choices connected to local cuisine.' },
  { title: 'Tom Yum Kung', creator: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org/en/RL/tom-yum-kung-01879', note: 'Primary cultural source for the 2024 inscription; not used to imply that Thai street food as a whole has UNESCO status.' },
] as const;

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Thai Street Food Guide: What to Eat and How to Choose a Stall',
    description: 'Choose Thai street food by stall type, dish and city, assess food handling, plan a night-market route and communicate dietary needs.',
    url: PAGE_URL,
    image: `https://go2-thailand.com${HERO}`,
    inLanguage: 'en-GB',
    dateModified: UPDATED_AT,
    author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
      { '@type': 'ListItem', position: 2, name: 'Thai food guide', item: 'https://go2-thailand.com/travel-guides/thai-cuisine-food-guide/' },
      { '@type': 'ListItem', position: 3, name: 'Thai street food guide', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  },
];

const foodTourHref = withPlacementSubId(KLOOK_GENERIC, 'en-thai-street-food-owner', 'food-tour');

export default function ThailandStreetFoodGuideEn() {
  const navItems = [
    { href: '#choose' as const, label: 'Choose a stall', icon: Store },
    { href: '#dishes' as const, label: 'Choose dishes', icon: UtensilsCrossed },
    { href: '#cities' as const, label: 'Choose a city', icon: Map },
    { href: '#safety' as const, label: 'Food checks', icon: ShieldCheck },
    { href: '#route' as const, label: 'Plan an evening', icon: MoonStar },
    { href: '#questions' as const, label: 'FAQs', icon: HeartHandshake },
  ];

  return (
    <>
      <SEOHead
        title="Thai Street Food Guide: What to Eat & Stall Safety"
        description="Choose Thai street food by stall, dish and city. Use practical food-handling checks, plan a night-market route and order with less guesswork."
        ogImage={`https://go2-thailand.com${HERO}`}
      >
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="bg-canvas text-charcoal" data-premium-template="thai-street-food-guide-en" data-owner="thailand-street-food">
        <EditorialHero
          image={HERO}
          imageAlt="A Thai street-food vendor cooking at a busy Bangkok evening market"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Thai food', href: '/travel-guides/thai-cuisine-food-guide/' }, { label: 'Street food guide' }]}
          eyebrow="Choose the stall before the hype"
          title={<>Thai street food,<br /><span className="text-saffron-light">one good choice at a time.</span></>}
          subtitle="A decision guide for stalls, dishes, cities and safer eating."
          description="Skip the impossible must-eat marathon. Read the cooking rhythm, choose one useful format, follow regional clues and build an evening that still feels good after the final bite."
          actions={[
            { label: 'Choose your stall type', href: '#choose', kind: 'primary' },
            { label: 'Build a dish route', href: '#dishes', kind: 'secondary' },
          ]}
          contentTone="light"
          minHeightClassName="min-h-[720px] lg:min-h-[700px]"
          contentClassName="max-w-[785px]"
          titleClassName="max-w-[785px] text-[3.75rem] leading-[0.85] sm:text-[5rem] lg:text-[5.8rem]"
          subtitleClassName="max-w-[630px] text-[1.3rem] leading-[1.08] sm:text-[1.65rem]"
          descriptionClassName="mt-4 max-w-[620px] text-sm leading-7"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(3,37,31,0.12)_0%,rgba(3,37,31,0.67)_55%,rgba(3,37,31,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,37,31,0.98)_0%,rgba(3,37,31,0.9)_43%,rgba(3,37,31,0.28)_72%,rgba(3,37,31,0.06)_100%)]"
          breadcrumbAriaLabel="Breadcrumb"
          sideCard={<aside className="absolute bottom-9 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/20 bg-jade/78 p-6 text-white shadow-editorial-card backdrop-blur-xl xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">The calm route</p><strong className="mt-3 block font-display text-[2rem] font-semibold leading-[0.95]">One hot dish.<br />One contrast.<br />One sweet finish.</strong><p className="mt-4 text-[11px] font-medium leading-5 text-white/64">Enough variety to learn something, without ordering for a checklist.</p></aside>}
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section id="choose" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow="First decision" title="What kind of stall solves tonight?" description="Street food is a selling format, not one cuisine. Choose the setup that fits your appetite, group and need for certainty." />
              <p className="max-w-[690px] text-sm font-medium leading-7 text-charcoal/68">Current competitors mostly rank dishes or addresses. This owner adds the missing layer: how to decide before you order, while keeping city-specific markets and the broader Thai-cuisine guide in their own lanes.</p>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {venueChoices.map(({ title, fit, look, icon: Icon }, index) => (
                <article key={title} className={`rounded-2xl border p-6 ${index === 0 ? 'border-saffron/30 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}>
                  <span className={`grid h-11 w-11 place-items-center rounded-xl border ${index === 0 ? 'border-white/18 bg-white/8 text-saffron-light' : 'border-jade/12 bg-tonal text-jade'}`}><Icon size={21} aria-hidden="true" /></span>
                  <h2 className="mt-7 font-display text-[1.8rem] font-semibold leading-none">{title}</h2>
                  <p className={`mt-4 text-xs font-extrabold leading-5 ${index === 0 ? 'text-white/82' : 'text-jade'}`}>{fit}</p>
                  <p className={`mt-3 text-xs font-medium leading-6 ${index === 0 ? 'text-white/64' : 'text-charcoal/62'}`}><strong className={index === 0 ? 'text-saffron-light' : 'text-saffron-dark'}>Look for:</strong> {look}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dishes" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="A dish compass" title="Three routes beat twenty-five rankings" description="Use each route as a small meal structure. Specialist guides carry the ingredients, variations and deeper context." />
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {dishRoutes.map((route) => (
                <article key={route.title} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
                  <div className="relative h-52 overflow-hidden"><Image src={route.image} alt={`${route.title} Thai street-food route`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /></div>
                  <div className="p-6">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{route.label}</p>
                    <h2 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{route.title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{route.description}</p>
                    <div className="mt-5 divide-y divide-jade/10 border-y border-jade/10">
                      {route.picks.map((pick) => <Link key={pick.href} href={pick.href} className="group/link flex items-center justify-between gap-3 py-4"><span><strong className="block text-sm text-jade">{pick.name}</strong><span className="mt-1 block text-[11px] leading-5 text-charcoal/58">{pick.note}</span></span><ArrowRight size={15} aria-hidden="true" className="shrink-0 text-saffron-dark transition group-hover/link:translate-x-1" /></Link>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cities" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow="Follow the place" title="Three cities, three different food questions" description="A national guide should help you choose the next destination owner—not flatten every market into one giant list." />
            <div className="space-y-4">
              {cityRoutes.map((city, index) => (
                <Link key={city.city} href={city.href} className={`group grid overflow-hidden rounded-2xl border sm:grid-cols-[0.68fr_1.32fr] ${index === 1 ? 'border-jade/15 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}>
                  <div className="relative min-h-44 overflow-hidden"><Image src={city.image} alt={`${city.city} food scene`} fill sizes="(max-width: 640px) 100vw, 28vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /></div>
                  <div className="p-6">
                    <p className={`text-[9px] font-extrabold uppercase tracking-[0.15em] ${index === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{city.signal}</p>
                    <h2 className="mt-2 font-display text-[2rem] font-semibold leading-none">{city.city}</h2>
                    <p className={`mt-4 text-xs font-medium leading-6 ${index === 1 ? 'text-white/66' : 'text-charcoal/64'}`}>{city.description}</p>
                    <span className={`mt-4 inline-flex items-center gap-2 text-xs font-extrabold ${index === 1 ? 'text-saffron-light' : 'text-jade'}`}>Open the local food guide <ArrowRight size={14} aria-hidden="true" className="transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="safety" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Food handling, not folklore" title="Four checks before the first bite" description="No queue, award, indoor venue or guide can guarantee safety. These checks adapt WHO principles to what a traveller can actually observe." className="[&>.eyebrow]:!text-saffron-light [&_.heading-redesign]:text-white [&>div]:!text-white/68" />
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stallChecks.map(([title, body, Icon], index) => (
                <article key={title} className={`rounded-2xl border p-6 ${index === 3 ? 'border-saffron/35 bg-white text-jade' : 'border-white/16 bg-white/7'}`}>
                  <Icon size={23} aria-hidden="true" className={index === 3 ? 'text-saffron-dark' : 'text-saffron-light'} />
                  <h2 className="mt-6 font-display text-[1.65rem] font-semibold leading-none">{title}</h2>
                  <p className={`mt-4 text-xs font-medium leading-6 ${index === 3 ? 'text-charcoal/68' : 'text-white/66'}`}>{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex gap-3 rounded-2xl border border-saffron/25 bg-saffron/10 p-5"><AlertTriangle size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-saffron-light" /><p className="text-xs font-medium leading-6 text-white/72"><strong className="text-white">Allergies need a higher bar.</strong> Ask about sauces, stock, shrimp paste, fish sauce, peanuts and shared equipment. A translated card improves communication but cannot eliminate cross-contact or replace medical advice.</p></div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom overflow-hidden rounded-[1.5rem] border border-jade/10 bg-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative min-h-72 lg:min-h-full"><Image src="/images/redesign/thailand-food-street-banner.webp" alt="Thai night-market stalls forming a relaxed evening food route" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/70 to-transparent" /><div className="absolute bottom-7 left-7 right-7 text-white"><p className="eyebrow">One evening, not a challenge</p><h2 className="font-display text-[2.7rem] font-semibold leading-[0.9]">Leave room to notice what you eat.</h2></div></div>
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="space-y-1">
                  {eveningPlan.map(({ time, title, text, icon: Icon }, index) => (
                    <article key={time} className="relative grid grid-cols-[52px_1fr] gap-4 pb-7 last:pb-0">
                      {index < eveningPlan.length - 1 ? <span aria-hidden="true" className="absolute left-[25px] top-10 h-[calc(100%-1.2rem)] border-l border-dashed border-saffron/55" /> : null}
                      <span className="relative z-10 grid h-[52px] w-[52px] place-items-center rounded-full border border-jade/12 bg-tonal text-jade"><Icon size={20} aria-hidden="true" /></span>
                      <div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{time}</p><h3 className="mt-1 font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">{text}</p></div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow="Useful next steps" title="Book the experience—or practise at home" description="Food tours and kitchen tools solve different intents. Live provider pages control current price, availability, inclusions and delivery." />
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-saffron/30 bg-jade p-6 text-white shadow-editorial-lift">
                <MapPin size={22} aria-hidden="true" className="text-saffron-light" />
                <h2 className="mt-6 font-display text-[1.7rem] font-semibold leading-none">Guided food experience</h2>
                <p className="mt-4 text-xs font-medium leading-6 text-white/66">Compare the exact neighbourhood, tasting count, group size, dietary support and meeting point before booking.</p>
                <a href={foodTourHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Check current Klook options <ExternalLink size={13} aria-hidden="true" /></a>
              </article>
              <article className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                <BookOpen size={22} aria-hidden="true" className="text-jade" />
                <h2 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">Thai cookbook</h2>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">Choose a book that explains technique and ingredients, not just a promise of instant authenticity.</p>
                <a href="/go/simple-thai-food-cookbook/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Check the current Amazon price <ExternalLink size={13} aria-hidden="true" className="text-saffron-dark" /></a>
              </article>
              <article className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                <ChefHat size={22} aria-hidden="true" className="text-jade" />
                <h2 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">Granite mortar</h2>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">Useful for bruising aromatics and building paste texture. Check dimensions, weight and delivery before ordering.</p>
                <a href="/go/thai-granite-mortar-eight-inch/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Check the current Amazon price <ExternalLink size={13} aria-hidden="true" className="text-saffron-dark" /></a>
              </article>
            </div>
            <AffiliateDisclosure className="lg:col-start-2">Sponsored links. We may earn a commission at no extra cost to you. Amazon OneLink may send you to a local store; product, price and delivery vary by country. Check all live provider details before buying or booking.</AffiliateDisclosure>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow="Ordering without a fake promise" title="Ask, point and confirm" description="A few words reduce friction, but a phrase is never a food-safety guarantee." />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Ao an-nee', 'I would like this one', 'Point to the exact menu item and confirm quantity.'],
                ['Mai phet', 'Not spicy', 'A preference request, not a universal heat scale.'],
                ['Mai sai ...', 'Do not add ...', 'Name the ingredient; sauces or stock may already contain it.'],
                ['Tao-rai?', 'How much?', 'Confirm the displayed or stated price before ordering.'],
              ].map(([thai, meaning, note], index) => <article key={thai} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-9 w-9 place-items-center rounded-full bg-tonal text-xs font-extrabold text-jade">0{index + 1}</span><h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-none text-jade">{thai}</h2><p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{meaning}</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{note}</p></article>)}
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real search questions" title="Street-food questions, answered" description="These questions were captured verbatim from current UK-English Google People Also Ask results. Answers stay practical and avoid universal safety or price claims." items={[...faqs]} />

        <SourceMethodSection eyebrow="Sources & method" title="Research before recommendation" description="This owner combines independent UK-English DFS keyword, SERP, PAA, ranking and backlink research, six competitor parses and primary food-safety and cultural sources. The two former owners had no measured ranking or backlink signal, so the evergreen URL was selected." sources={[...sources]} />

        <RelatedGuidesSection
          eyebrow="Keep exploring"
          title="Turn one meal into a Thailand food route"
          guides={[
            { title: 'Thai cuisine guide', description: 'Choose dishes by flavour, format and region before going deeper into street food.', href: '/travel-guides/thai-cuisine-food-guide/', image: '/images/redesign/thailand-food-shared-table.webp' },
            { title: 'Bangkok street-food markets', description: 'Choose a Bangkok neighbourhood and market by evening style, transport and food focus.', href: '/blog/best-street-food-markets-bangkok/', image: '/images/redesign/bangkok-street-food-market-kit.webp' },
            { title: 'Cooking classes in Thailand', description: 'Compare cities, menus, market visits and hands-on value before reserving a class.', href: '/best-cooking-classes-in-thailand/', image: '/images/redesign/thailand-cooking-classes-hero-v2.webp' },
          ]}
          readLabel="Open guide"
        />
      </div>
    </>
  );
}
