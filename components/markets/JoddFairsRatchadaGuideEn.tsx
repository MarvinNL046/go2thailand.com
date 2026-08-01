import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Clock3,
  CloudRain,
  ExternalLink,
  Eye,
  MapPin,
  Navigation,
  Route,
  ShoppingBag,
  Store,
  TrainFront,
  UtensilsCrossed,
  WalletCards,
  X,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/blog/jodd-fairs-bangkok-night-market-guide/';
const HERO_IMAGE = '/images/redesign/jodd-fairs-ratchada-hero.webp';
const PAGE_TITLE = 'Jodd Fairs Ratchada: location, hours and visit plan';
const PAGE_DESCRIPTION = 'Visit the current Jodd Fairs Ratchada without location confusion. Check hours, MRT Exit 4, food, payment tips and an honest 90-minute plan.';

const navItems: PageSectionNavItem[] = [
  { href: '#quick-facts', label: 'Quick facts', icon: BadgeCheck },
  { href: '#route', label: 'MRT route', icon: TrainFront },
  { href: '#timing', label: 'Best time', icon: Clock3 },
  { href: '#food', label: 'Food', icon: UtensilsCrossed },
  { href: '#worth-it', label: 'Worth it?', icon: Eye },
  { href: '#compare', label: 'Compare', icon: Store },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

const planSteps = [
  {
    minutes: '0–15 min',
    title: 'Scan first',
    text: 'Walk one complete loop before buying the first oversized dish. Notice queues, visible prices, preparation, seating and stalls you genuinely want to revisit.',
    icon: Eye,
  },
  {
    minutes: '15–55 min',
    title: 'Share small',
    text: 'Pick one savoury base, then share smaller bites. You keep room for something discovered halfway through and avoid letting one viral plate decide the whole evening.',
    icon: UtensilsCrossed,
  },
  {
    minutes: '55–90 min',
    title: 'Return on purpose',
    text: 'Go back only to the favourites that still appeal after the first lap. Check the MRT route before the final drink and agree on an Exit 4 meeting point.',
    icon: Navigation,
  },
];

const faqs = [
  {
    question: 'Are there two Jodd Fairs in Bangkok?',
    answer: 'The Jodd Fairs name has been attached to several Bangkok locations, which is why current search results look contradictory. This guide covers Jodd Fairs Ratchada at 129 Ratchadaphisek Road, beside Thailand Cultural Centre MRT. The former Rama 9 branch closed at the end of June 2025. Other branch names and old videos should be checked against the official Jodd Fairs channels before you travel.',
  },
  {
    question: 'What happened to Jodd Fairs?',
    answer: 'Jodd Fairs did not disappear as a brand, but its best-known Rama 9 site closed in June 2025. Jodd Fairs Ratchada opened on 31 January 2025 and was still publishing fresh activity in June 2026. Confusion persists because old Rama 9 articles, reviews and map pins remain visible. Use the full Ratchada name, address and Exit 4 rather than following a historic snippet.',
  },
  {
    question: 'What is Jodd Fairs Bangkok?',
    answer: 'Jodd Fairs Ratchada is a modern evening market with street-food stalls, drinks, fashion, accessories and small retailers. It is easy to reach by MRT and designed for a lively, photogenic night out. It is more curated and tourist-facing than a quiet neighbourhood market, so its strengths are convenience, variety and energy rather than a promise of the cheapest or most local meal in Bangkok.',
  },
  {
    question: 'What is the best time to visit Jodd Fairs Ratchada?',
    answer: 'Arrive around 17:30–18:30 for easier orientation, remaining daylight and a calmer first lap. The 18:30–21:30 window usually delivers more lights and atmosphere but also more queues and tightly packed walkways. These are editorial planning windows, not live crowd readings. Official published hours are daily from 17:00 to 01:00, and individual stalls may keep shorter hours.',
  },
  {
    question: 'What is the nearest train station to Jodd Fair Night Market in Ratchada?',
    answer: 'Thailand Cultural Centre on the MRT Blue Line is the route anchor. Use Exit 4. The Tourism Authority of Thailand’s Japan office describes the walk as roughly two minutes. There is no direct BTS stop at the market; travellers starting on the BTS network need to transfer to the MRT or use a road connection.',
  },
  {
    question: 'Where is the new Jodd Fair located?',
    answer: 'The Ratchada market is at 129 Ratchadaphisek Road, Din Daeng, Bangkok 10400, close to Thailand Cultural Centre MRT Exit 4. Search for “Jodd Fairs Ratchada” rather than only “Jodd Fairs” so a map app does not surface an old Rama 9 result. Compare the pin with the published address before leaving your hotel.',
  },
  {
    question: 'Is Jodd Fairs shut down?',
    answer: 'The former Jodd Fairs Rama 9 branch is shut, but the Ratchada market was active when checked in July 2026. Its official published hours are 17:00–01:00 daily. Temporary closures, events or holiday changes can still occur, so check the official Facebook or Instagram channel on the day of your visit.',
  },
  {
    question: 'Where did Jodd Fairs move to?',
    answer: 'For travellers looking for the successor to the famous Rama 9 experience, the current route is Jodd Fairs Ratchada beside Thailand Cultural Centre MRT. It is one Blue Line stop away from Phra Ram 9. Avoid treating every reference to Ratchada Train Market, The One Ratchada or Jodd Fairs as the same venue; Bangkok’s night-market names have changed repeatedly.',
  },
  {
    question: 'What makes Jodd Fairs unique?',
    answer: 'Its main advantage is a compact combination of food, small shops, lights and direct MRT access. A mixed group can browse different dishes and products without travelling to the edge of Bangkok. That same polished convenience is also why some visitors find it touristy. The market is distinctive as an easy first night-market experience, not because every stall is exclusive or inexpensive.',
  },
  {
    question: 'How crowded does Jodd Fairs get?',
    answer: 'Crowding changes by evening, weather, holiday period and event schedule. Popular food stalls and narrow paths can feel dense during the main dinner window. Arrive early if sensory load, mobility or keeping a group together matters. Choose a visible meeting point, carry your bag closed and do not mistake an editorial time window for a live attendance forecast.',
  },
  {
    question: 'What to do at Jodd Fair Night Market?',
    answer: 'Take a first lap, compare prices and preparation, share a few small dishes, browse fashion or accessories, then return to one or two favourites. Ninety minutes is enough for a focused first visit; stay longer if drinks, music or shopping are the goal. The market works best as an evening experience, not as a checklist of viral stalls.',
  },
  {
    question: 'What do they eat at the Jodds Fair?',
    answer: 'The mix changes, but grilled meat and seafood, noodles, spicy salads, desserts, mango sticky rice and colourful drinks commonly appear. Do not build the trip around a static top-ten list: vendors change. Look for food being cooked now, a clear price, manageable portions and staff who can answer ingredient questions.',
  },
  {
    question: 'Is there seating available at Jodd Fairs?',
    answer: 'Seating exists, but availability is not guaranteed when the market is busy and it may not sit beside the stall you choose. Identify a table or quieter edge before ordering several hot dishes. Families, larger groups and travellers with limited energy will have an easier visit early in the evening. Do not assume a night market provides restaurant-style seating or accessibility throughout.',
  },
];

const sources = [
  {
    title: 'Jodd Fairs Ratchada grand opening and visitor details',
    creator: 'Jodd Fairs',
    url: 'https://www.facebook.com/JoddFairs/posts/come-join-us-jodd-fairs-ratchada-grand-opening-31-january-2025-%E0%B8%95%E0%B8%AD%E0%B8%81%E0%B8%A2%E0%B9%89%E0%B8%B3%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%A2/592580060149213/',
    note: 'Primary brand post for the opening date, daily published hours and Thailand Cultural Centre Exit 4.',
  },
  {
    title: 'Jodd Fairs Ratchada',
    creator: 'Tourism Authority of Thailand — Japan',
    url: 'https://www.thailandtravel.or.jp/jodd-fairs/',
    note: 'Current address, MRT walking route, market description and confirmation that Rama 9 closed in June 2025.',
  },
  {
    title: 'MRT system map and passenger information',
    creator: 'Bangkok Expressway and Metro',
    url: 'https://metro.bemplc.co.th/MRT-System-Map?lang=en',
    note: 'Official network context for the MRT Blue Line and Thailand Cultural Centre journey planning.',
  },
  {
    title: 'Train Night Market Ratchada reopened on 27 March 2026',
    creator: 'Tourism Authority of Thailand — Japan',
    url: 'https://www.thailandtravel.or.jp/train-night-market-ratchada/',
    note: 'Current source used to distinguish the reopened Train Night Market from Jodd Fairs Ratchada.',
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
      datePublished: '2026-03-17',
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
      name: 'Jodd Fairs Ratchada',
      description: 'Evening market in Ratchada, Bangkok, with food, drinks, fashion and small retailers.',
      url: 'https://www.facebook.com/JoddFairs.Ratchada/',
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '129 Ratchadaphisek Road',
        addressLocality: 'Din Daeng, Bangkok',
        postalCode: '10400',
        addressCountry: 'TH',
      },
      openingHours: 'Mo-Su 17:00-01:00',
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
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Jodd Fairs Ratchada', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: '90-minute Jodd Fairs Ratchada visit plan',
      itemListElement: planSteps.map((step, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: step.title,
        description: step.text,
      })),
    },
  ];
}

export function JoddFairsRatchadaGuideEn() {
  const subId = useSubId();
  const foodTourHref = withPlacementSubId(KLOOK_GENERIC, subId, 'en-jodd-fairs-related-bangkok-food-tour');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="Jodd Fairs Ratchada, Jodd Fairs Bangkok, Jodd Fairs opening hours, Jodd Fairs new location, Jodd Fairs MRT" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-17" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Jodd Fairs Ratchada in Bangkok with illuminated food stalls and evening visitors"
          breadcrumbAriaLabel="Breadcrumb"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Jodd Fairs Ratchada' }]}
          eyebrow="The current market, without the detour"
          title={<>Jodd Fairs<br />Ratchada.</>}
          subtitle={<>One evening. The right location.</>}
          description={<>Old Rama 9 pages still circulate. This July 2026 guide takes you to the active Ratchada market, MRT Exit 4, a smarter tasting plan and an honest answer to whether it fits your Bangkok night.</>}
          actions={[
            { label: 'Plan your visit', href: '#quick-facts', kind: 'primary' },
            { label: 'Route from MRT', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[730px]"
          contentClassName="max-w-[680px]"
          titleClassName="max-w-[680px] text-[4.05rem] leading-[0.83] sm:text-[5.25rem] lg:text-[6.1rem]"
          subtitleClassName="max-w-[620px] text-[1.9rem] leading-[0.95] text-saffron-dark sm:text-[2.75rem]"
          imageClassName="object-cover object-[67%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.58)_46%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_39%,rgba(252,250,246,0.12)_68%,rgba(18,63,54,0.18)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[330px] overflow-hidden rounded-2xl border border-white/50 bg-jade/91 text-white shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-white/12 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-light">Verified July 2026</p><BadgeCheck size={19} className="text-saffron-light" /></div>
              <dl className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]"><dt className="text-white/52">Open</dt><dd className="font-bold">Daily 17:00–01:00</dd><dt className="text-white/52">MRT</dt><dd className="font-bold">Thailand Cultural Centre</dd><dt className="text-white/52">Exit</dt><dd className="font-bold">Exit 4</dd><dt className="text-white/52">Address</dt><dd className="font-bold">129 Ratchadaphisek Road</dd></dl>
              <p className="border-t border-white/12 px-5 py-4 text-[10px] font-medium leading-4 text-white/60">Check the official channel on your visit day for temporary changes.</p>
            </aside>
          )}
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section id="quick-facts" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-5 rounded-[26px] border border-saffron/25 bg-[#fff5e6] p-6 shadow-editorial-card sm:grid-cols-[auto_1fr] sm:p-8 lg:items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-saffron text-white"><MapPin size={22} /></span>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Location check — July 2026</p><h2 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">Rama 9 is closed. This guide takes you to Ratchada.</h2><p className="mt-3 max-w-3xl text-xs font-medium leading-6 text-charcoal/68">The former Jodd Fairs Rama 9 closed at the end of June 2025. Old videos and map results still surface. Use the full name <strong>Jodd Fairs Ratchada</strong>, travel to Thailand Cultural Centre and take Exit 4.</p></div>
                <a href="https://www.facebook.com/JoddFairs.Ratchada/" target="_blank" rel="noopener noreferrer" className="btn-cream min-h-11 justify-center px-5 text-saffron-dark">Official channel <ExternalLink size={14} /></a>
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Begin with a plan" title={<>Ninety minutes.<br />Three good decisions.</>} description="Jodd Fairs rewards orientation. It is compact enough for a complete lap, yet busy enough to make the first dramatic plate feel urgent. Scan, share and return instead." />
              <div className="grid gap-4 md:grid-cols-3">
                {planSteps.map(({ minutes, title, text, icon: Icon }, index) => <article key={title} className="flex min-h-[305px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} strokeWidth={1.5} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{minutes}</span></div><h3 className="mt-7 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{text}</p><span className="mt-auto pt-5 text-[10px] font-extrabold text-jade">Step {index + 1} of 3</span></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative min-h-[480px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[620px]">
              <Image src="/images/redesign/jodd-fairs-ratchada-arrival.webp" alt="Route from Thailand Cultural Centre MRT to illuminated Jodd Fairs Ratchada" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/90 via-jade/45 to-transparent p-7 pt-28 text-white"><p className="eyebrow !text-saffron-light">Your route anchor</p><h2 className="max-w-xl font-display text-[2.9rem] font-semibold leading-[0.9] tracking-[-0.035em]">Exit 4, not an old market name.</h2></div>
            </div>
            <div>
              <SectionHeading eyebrow="Skip the taxi detour" title="From MRT to the first stall" description={<>The Blue Line is the simplest route for most visitors. One verifiable point removes most confusion: Thailand Cultural Centre, Exit 4. Read our <Link href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Bangkok BTS and MRT guide</Link> if your trip begins on another rail system.</>} />
              <ol className="mt-8 space-y-5">
                {[
                  ['Plan to Thailand Cultural Centre', 'Check that your route reaches the MRT Blue Line. BTS and MRT are separate systems, so a transfer may be required.'],
                  ['Use Exit 4', 'Follow the numbered station signs. For a group, make Exit 4 the first meeting point before anyone passes the gates.'],
                  ['Confirm the full market name', 'Search for Jodd Fairs Ratchada outside the station. The TAT Japan listing describes the walk as roughly two minutes.'],
                  ['Save the way back', 'Keep a screenshot of the station and exit, then check the final practical train connection before ordering the last drink.'],
                ].map(([title, text], index) => <li key={title} className="grid grid-cols-[44px_1fr] gap-4"><span className="grid h-11 w-11 place-items-center rounded-full border border-saffron/40 bg-canvas font-display text-lg font-semibold text-saffron-dark">{index + 1}</span><div><h3 className="font-display text-[1.5rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/66">{text}</p></div></li>)}
              </ol>
              <div className="mt-8 rounded-2xl border border-jade/10 bg-white p-5"><p className="flex items-center gap-2 text-xs font-extrabold text-jade"><Route size={17} className="text-saffron" /> Taxi or Grab?</p><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">Use the current market profile and compare its pin with 129 Ratchadaphisek Road. Travel time and fare change with traffic and origin, so a hard estimate here would create false certainty.</p></div>
            </div>
          </div>
        </section>

        <section id="timing" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Choose the atmosphere" title="The market changes by the hour" description="Published hours are daily from 17:00 to 01:00. Your arrival decides whether the evening feels easy to scan, fully illuminated or like a late second stop. These are planning windows, not live crowd predictions." />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['17:00–18:30', 'Easy orientation', 'Useful for remaining daylight, a calmer first lap and visitors limiting sensory load. Not every stall must be fully ready at the first minute.', 'Best for overview'],
                  ['18:30–21:30', 'Full market energy', 'Lights, food stalls and visitor flow come together. This is often the liveliest experience, with a higher chance of queues and dense paths.', 'Best for atmosphere'],
                  ['21:30–00:30', 'A later second stop', 'Convenient after dinner or another Bangkok activity. Plenty may remain open, but never depend on one specific dish until closing time.', 'Best after another plan'],
                ].map(([time, title, text, cue], index) => <article key={time} className={`rounded-2xl border p-6 ${index === 1 ? 'border-saffron/45 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}><p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{time}</p><h3 className="mt-4 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{text}</p><p className="mt-6 border-t border-jade/10 pt-4 text-[10px] font-extrabold text-jade">{cue}</p></article>)}
              </div>
            </div>
            <div className="mt-10 overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
                <div className="p-8 sm:p-10"><p className="eyebrow !text-saffron-light">A better evening order</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em]">Arrive hungry.<br />Not desperate.</h2><p className="mt-5 text-xs font-medium leading-6 text-white/64">Water, a calm first lap and one shared dish preserve more choice than buying a huge plate at the entrance.</p></div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-3">{[[Eye, 'Scan', 'Compare food, prices and preparation before choosing.'], [UtensilsCrossed, 'Share', 'Smaller portions create a broader tasting route.'], [ShoppingBag, 'Carry later', 'Buy souvenirs after eating so you hold them for less of the evening.']].map(([Icon, title, text]) => { const CardIcon = Icon as LucideIcon; return <div key={String(title)} className="bg-jade p-8 sm:py-10"><CardIcon size={25} strokeWidth={1.4} className="text-saffron-light" /><h3 className="mt-6 font-display text-2xl font-semibold">{String(title)}</h3><p className="mt-3 text-xs leading-6 text-white/60">{String(text)}</p></div>; })}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="food" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Choose with your eyes and judgement" title="Four filters for the first bite" description={<>Vendors change, so a static top ten ages faster than a good decision method. Apply these checks even when a dish is famous online. Our broader <Link href="/thailand-street-food/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Thailand street-food guide</Link> explains how stalls, food courts and restaurants differ.</>} />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ['Is it cooked now?', 'For hot dishes, favour stalls where you can see preparation, temperature and turnover.'],
                  ['Is the price clear?', 'Ask for price and portion size before ordering when the sign is unclear. Do not infer it from a neighbouring stall.'],
                  ['Can you share it?', 'One viral plate can fill the table. Several smaller choices create a more interesting market tasting.'],
                  ['Can staff answer ingredients?', 'Ask separately about peanut, shellfish, fish sauce, egg and shared equipment. “Not spicy” is not an allergy check.'],
                ].map(([title, text], index) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5"><span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Filter 0{index + 1}</span><h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/66">{text}</p></article>)}
              </div>
              <div className="mt-6 grid gap-4 rounded-2xl border border-jade/10 bg-canvas p-6 sm:grid-cols-[auto_1fr]"><WalletCards size={27} strokeWidth={1.4} className="text-jade" /><div><h3 className="font-display text-xl font-semibold text-jade">Cash as backup; QR is not a promise</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/65">Payment methods vary by vendor. Thai QR payments often depend on local banking apps and are not equivalent to universal international-card acceptance. Carry small baht notes and a second payment option.</p></div></div>
            </div>
            <div className="relative min-h-[510px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[650px]">
              <Image src="/images/redesign/jodd-fairs-ratchada-food-choice.webp" alt="Traveller comparing freshly cooked food at a Jodd Fairs Ratchada stall" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-jade/88 p-6 text-white backdrop-blur-md sm:left-auto sm:w-[340px]"><p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">The useful market rule</p><p className="mt-2 font-display text-[1.8rem] font-semibold leading-none">One lap first. Choose second.</p><p className="mt-3 text-[10px] font-medium leading-5 text-white/62">Popularity is a signal, not a guarantee of flavour, allergens or value.</p></div>
            </div>
          </div>

          <div className="container-custom mt-12">
            <div className="grid gap-8 rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9 lg:grid-cols-[0.66fr_1.34fr]">
              <div><p className="eyebrow">Who is travelling?</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">The same market needs a different rhythm.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Group size, sensory load, mobility and dietary needs determine where you meet, how much you order and when a successful short visit should end.</p></div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Solo', 'Save the station name offline, carry a closed bag toward the front in dense paths and choose portions you can finish. A solo visitor can skip a crowded aisle and return without disrupting a group.'],
                  ['As a pair', 'Share two small dishes and photograph a stall name before moving on. Similar awnings become difficult to recognise after dark, so agree before one person leaves to find a table or drink.'],
                  ['With a group', 'Use Exit 4 as the first meeting point and choose a second visible landmark inside. Discuss food at the edge of a path, not in the middle, and let each buyer confirm price and allergens.'],
                  ['Children or limited energy', 'Arrive early, identify seating before ordering and set a firm end time. Hot grills, tight passages and changing ground surfaces make one successful lap better than “one more stall” indefinitely.'],
                ].map(([title, text]) => <article key={title} className="border-l-2 border-saffron/55 pl-5"><h3 className="font-display text-[1.45rem] font-semibold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="worth-it" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">A better answer than “must visit”</p><h2 className="font-display text-[3.4rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[4.2rem]">Is Jodd Fairs<br />worth visiting?</h2><p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-7 text-charcoal/68">Yes when MRT convenience, variety and evening energy matter. Less so when you want vintage depth, quiet local rhythm or broad walkways. Compare the wider options in our <Link href="/blog/best-night-markets-bangkok-2026/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Bangkok night-market guide</Link>.</p></div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[26px] border border-jade/12 bg-jade p-7 text-white sm:p-9"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-saffron"><Check size={20} /></span><h3 className="font-display text-[2.1rem] font-semibold">A good fit</h3></div><ul className="mt-7 space-y-4 text-sm font-medium leading-6 text-white/72">{['You want a first night market with a simple MRT route.', 'Your group wants several foods and small shops in one compact area.', 'You enjoy lights, visible energy and photogenic stalls.', 'You are already planning an evening around Ratchada or the Blue Line.'].map((item) => <li key={item} className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-saffron-light" />{item}</li>)}</ul></article>
              <article className="rounded-[26px] border border-jade/10 bg-white p-7 sm:p-9"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full border border-saffron/35 bg-canvas text-saffron-dark"><X size={20} /></span><h3 className="font-display text-[2.1rem] font-semibold text-jade">Probably not</h3></div><ul className="mt-7 space-y-4 text-sm font-medium leading-6 text-charcoal/68">{['You mainly want a quiet neighbourhood market with little tourism.', 'Vintage, antiques or one specialist category are the main purpose.', 'Dense visitor flows and visual noise quickly become tiring.', 'You have one Bangkok evening and another market fits your route better.'].map((item) => <li key={item} className="flex gap-3"><X size={17} className="mt-1 shrink-0 text-saffron-dark" />{item}</li>)}</ul></article>
            </div>
          </div>
        </section>

        <section id="compare" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
            <SectionHeading eyebrow="Same city, different purpose" title="Which market fits better?" description="Ratchada now carries several market histories in the same wider district. Jodd Fairs and the Train Night Market are not two names for one identical venue. Choose by experience, then verify the current place and hours." />
            <div className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <div className="hidden grid-cols-[1.05fr_1fr_1fr] bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white sm:grid"><span>Market</span><span>Strong when you want</span><span>Watch for</span></div>
              {[
                ['Jodd Fairs Ratchada', 'Direct MRT access, broad food choice and a high-energy first night market.', 'Compact and tourist-facing; the dinner peak can feel crowded.'],
                ['Train Night Market Ratchada', 'The market that reopened behind Esplanade on 27 March 2026 and a different Ratchada story.', 'Do not merge it with Jodd Fairs. Verify its own current schedule and entrance.'],
                ['Srinakarin Train Night Market', 'A longer retro and vintage evening when travel time matters less.', 'Farther from central Bangkok and better treated as a dedicated trip.'],
                ['Chatuchak Weekend Market', 'Extensive daytime shopping with product sections and food along the route.', 'Weekend timing, heat and scale require a very different plan.'],
              ].map(([name, fit, caveat]) => <article key={name} className="grid gap-3 border-t border-jade/10 px-6 py-5 first:border-t-0 sm:grid-cols-[1.05fr_1fr_1fr] sm:gap-6"><h3 className="font-display text-[1.35rem] font-semibold leading-none text-jade">{name}</h3><p className="text-xs font-medium leading-5 text-charcoal/66"><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark sm:hidden">Strong when you want</span>{fit}</p><p className="text-xs font-medium leading-5 text-charcoal/58"><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark sm:hidden">Watch for</span>{caveat}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]"><SectionHeading eyebrow="Before leaving" title="Small checks, calmer evening" description="A night market is not a controlled restaurant room. Weather, noise, seating, ground surfaces and payment options can change by evening and vendor. Plan what you can control." /><div className="grid gap-4 sm:grid-cols-2">{[
              [CloudRain, 'Rain and heat', 'Wear light clothing, drink water and carry a compact rain solution in wet weather. Wait out a severe storm in a substantial building and keep electronics dry.'],
              [Accessibility, 'Access and movement', 'Expect dense or narrow paths, limited seating and occasional thresholds or cable covers. Early arrival helps but does not guarantee step-free access everywhere.'],
              [UtensilsCrossed, 'Food hygiene and allergens', 'Prefer visible cooking and good turnover. Shared oil, tongs, grills and work surfaces can create cross-contact, so ask before ordering.'],
              [WalletCards, 'Cash and phone', 'Carry small notes, a second payment option and enough battery for the MRT return. Keep valuables closed and visible toward the front in dense passages.'],
            ].map(([Icon, title, text]) => { const PracticalIcon = Icon as LucideIcon; return <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><PracticalIcon size={21} strokeWidth={1.45} /></span><h3 className="mt-6 font-display text-[1.6rem] font-semibold leading-none text-jade">{String(title)}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p></article>; })}</div></div>

            <div className="mt-10 grid gap-5 rounded-[26px] border border-jade/10 bg-[#f3eee3] p-7 sm:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div><p className="eyebrow">Intentional affiliate choice</p><h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">No random product carousel between you and Exit 4.</h2></div>
              <div><p className="text-sm font-medium leading-7 text-charcoal/70">We reviewed Amazon OneLink for this owner. A generic poncho, bag or power bank does not answer its core question: where is the current Jodd Fairs and how should you visit? Those products remain on dedicated packing and product owners. The only commercial next step here is a broader Bangkok food tour, clearly separated from the free market visit.</p><a href={foodTourHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group mt-5 min-h-12 px-6">Check current tour price at Klook <ExternalLink size={15} className="text-saffron" /></a><p className="mt-3 text-[10px] font-medium leading-5 text-charcoal/55">Affiliate link: we may earn a commission at no extra cost to you. This is a link to broader Bangkok food tours, not a Jodd Fairs admission ticket. Confirm the current route, inclusions and price on Klook.</p></div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real search questions" title="Jodd Fairs questions, answered" description="These questions were captured verbatim from the independent English DataForSEO People Also Ask research. Answers prioritise the current Ratchada location over old viral pages." items={faqs} />

        <RelatedGuidesSection eyebrow="Continue through Bangkok" title="Turn one market into a good evening" readLabel="Read guide" guides={[
          { title: 'Bangkok night markets', description: 'Compare the main evening markets by atmosphere, location and travel intent.', href: '/blog/best-night-markets-bangkok-2026/', image: '/images/blog/best-night-markets-bangkok-2026.webp', imageAlt: 'Illuminated night market in Bangkok' },
          { title: 'Bangkok street-food markets', description: 'Compare food-led markets without asking one venue to solve every dining question.', href: '/blog/best-street-food-markets-bangkok/', image: '/images/redesign/jodd-fairs-ratchada-food-choice.webp', imageAlt: 'Choosing food at a Bangkok night-market stall' },
          { title: 'Bangkok BTS and MRT', description: 'Plan transfers, payment and the final journey back with less uncertainty.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/redesign/jodd-fairs-ratchada-arrival.webp', imageAlt: 'Arriving by MRT for a Bangkok evening market' },
        ]} sideLink={{ label: 'Check current tour price at Klook', href: foodTourHref, affiliate: true }} disclosure="The Klook link covers broader Bangkok food tours and is not a Jodd Fairs ticket. The three guide cards are editorial internal links." />

        <SourceMethodSection eyebrow="Sources & editorial method" title="Current location before old virality" description="This owner combines official location and opening information with independent English DataForSEO keyword, ranking, SERP, competitor and PAA research. Vendor mix, crowd levels and payment acceptance are deliberately framed as checks rather than permanent promises. Last editorial review: 26 July 2026." sources={sources} />

        <section className="py-12 lg:py-16">
          <div className="container-custom"><div className="flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Ready for Ratchada?</p><h2 className="font-display text-[2.6rem] font-semibold leading-none text-jade">Save Exit 4. Walk one lap first.</h2></div><div className="flex flex-wrap gap-3"><a href="#route" className="btn-jade btn-jade-pattern group min-h-12 px-6">View the route <ArrowRight size={15} className="text-saffron" /></a><Link href="/city/bangkok/" className="btn-cream min-h-12 px-6 text-saffron-dark">Plan Bangkok <MapPin size={15} /></Link></div></div></div>
        </section>
      </div>
    </>
  );
}
