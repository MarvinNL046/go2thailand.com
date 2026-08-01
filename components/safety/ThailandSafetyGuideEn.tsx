import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ambulance,
  Bike,
  Check,
  ExternalLink,
  FileCheck2,
  Flame,
  HeartHandshake,
  MapPinned,
  MoonStar,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Users,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';
import {
  KLOOK_GENERIC,
  TRIP_GENERIC,
  TWELVEGO_GENERIC,
  withPlacementSubId,
} from '../../lib/affiliates';

const PAGE_URL = 'https://go2-thailand.com/is-thailand-safe/';
const UPDATED_AT = '2026-07-27';

const sectionNav = [
  { href: '#advice' as const, label: 'Live advice', icon: MapPinned },
  { href: '#risks' as const, label: 'Risk layers', icon: ShieldCheck },
  { href: '#transport' as const, label: 'Transport', icon: Bike },
  { href: '#route' as const, label: 'Day & night', icon: MoonStar },
  { href: '#emergency' as const, label: 'Emergency', icon: PhoneCall },
  { href: '#questions' as const, label: 'Questions', icon: HeartHandshake },
];

const preparationItems = [
  'Checked the live FCDO map for every overnight stop and transfer',
  'Confirmed insurance covers the itinerary and planned activities',
  'Stored passport, policy and booking copies away from the originals',
  'Saved 191, 1155, 1669, insurer and embassy contacts offline',
  'Shared the route and first-night accommodation with someone at home',
  'Checked licence, helmet, vehicle and policy wording before any motorbike plan',
];

const riskLayers = [
  {
    icon: MapPinned,
    label: 'Check first',
    title: 'Official route status',
    text: 'A country-level answer cannot replace warnings for a border strip, province, district or specific transport corridor.',
    action: 'Open the live map before booking and again before departure.',
  },
  {
    icon: Bike,
    label: 'Daily leverage',
    title: 'Roads & transfers',
    text: 'Licence, experience, insurance, helmet, vehicle, road and weather belong to one decision—not seven separate excuses.',
    action: 'Choose a train, taxi or transfer when one condition fails.',
  },
  {
    icon: Waves,
    label: 'Same-day decision',
    title: 'Sea, weather & health',
    text: 'Red flags, currents, storms, heat, air quality, mosquitoes and animal contact change by place, season and traveller.',
    action: 'Follow local warnings and specialist health advice.',
  },
  {
    icon: Users,
    label: 'Situation matters',
    title: 'Crime & evenings',
    text: 'Crowding, isolation, alcohol, an unattended drink and an improvised ride home alter exposure more than a city score.',
    action: 'Plan the return before the evening starts.',
  },
];

const faqItems = [
  {
    question: 'Is it safe to go to Thailand right now?',
    answer: 'No trip can be guaranteed safe. At our 27 July 2026 source check, FCDO did not advise against travel to Thailand as a whole, but it did advise against all but essential travel to specified areas in the deep south and within 20 kilometres of the Cambodia land border. Conditions can change, so open the live FCDO map for your exact route before booking and departure.',
  },
  {
    question: 'Are there any travel warnings for Thailand?',
    answer: 'Yes. FCDO has regional warnings rather than one blanket country label. The live advice covers parts of the Thailand–Malaysia border area, the Cambodia border area and changing regional, security, weather and transport risks. Travelling against official advice may also affect insurance, so check the current wording rather than relying on a screenshot of this page.',
  },
  {
    question: 'Is Thailand safe for British tourists?',
    answer: 'British travellers use the same route-level test as everyone else: check FCDO advice, confirm insurance, choose transport you are licensed and covered to use, and prepare for local health and weather risks. Your nationality does not create a safety guarantee; it determines which government and consular guidance you should follow.',
  },
  {
    question: 'Is Thailand safe to visit as a tourist?',
    answer: 'Many established visitor routes are commonly travelled, but a useful answer depends on location, transport, activity, time of day and current official advice. The practical priorities are avoiding advised-against areas, making conservative road and sea decisions, protecting drinks and belongings, and having an emergency plan.',
  },
  {
    question: 'What should I be careful of in Thailand?',
    answer: 'Prioritise road transport and motorbike decisions, unsafe sea conditions, scams that use pressure or diversion, theft in crowded places, drink spiking, isolated late-night routes, mosquito and animal exposure, and changing regional warnings. Do not treat this as a complete risk list; match the checks to your route and activities.',
  },
  {
    question: 'What are the main scams in Thailand?',
    answer: 'Common patterns include a stranger claiming an attraction is closed, a detour to a gem or tailor shop, pressure to pay immediately, card or ATM fraud, passport deposits and disputed rental damage. Stories change; the useful response is stable: pause, verify independently, keep control of documents and walk away from pressure. See our dedicated scams guide for the full decision process.',
  },
  {
    question: 'Is it safe for a girl to travel alone in Thailand?',
    answer: 'Many women travel independently in Thailand, but popularity is not a safety promise. Choose a well-lit arrival, share your route, keep control of drinks, pre-plan transport home and leave any situation that feels coercive. Our solo-female guide covers accommodation, arrivals, nightlife and communication in more depth.',
  },
  {
    question: 'Is it safe to walk Bangkok at night?',
    answer: 'That depends on the street, lighting, crowd level, distance and your way home. A busy station-to-hotel route is not equivalent to an isolated shortcut. Use a mapped main route, avoid displaying valuables, arrange transport when the walk becomes uncertain and do not let a general Bangkok label override the immediate setting.',
  },
  {
    question: 'Is Bangkok safe for tourists right now?',
    answer: 'Check current FCDO and local-authority updates before travel, especially around demonstrations or major disruptions. For ordinary day-to-day planning, focus on traffic, valuables, licensed transport, nightlife choices and a reliable return route. Go2Thailand does not operate a live incident feed.',
  },
  {
    question: 'Why is Thailand on the no travel list?',
    answer: 'For UK travellers, Thailand is not under one blanket “do not travel” instruction at the time of our source check. FCDO applies stronger advice to specific areas. Search snippets and social posts often collapse regional warnings into a country-wide claim, so use the official map and exact wording for your itinerary.',
  },
];

const routeStops = [
  {
    label: 'Before booking',
    title: 'Official map',
    text: 'Check every base, border crossing and long transfer—not just the arrival airport.',
  },
  {
    label: 'Before leaving',
    title: 'Conditions',
    text: 'Recheck weather, sea, demonstrations, transport notices and your first-night arrival.',
  },
  {
    label: 'Before the evening',
    title: 'Return route',
    text: 'Choose the ride home, meeting point and backup before alcohol or a late finish changes the decision.',
  },
  {
    label: 'If plans change',
    title: 'Exit early',
    text: 'A red flag, pressured sale, unsafe vehicle or uncomfortable situation is enough reason to leave.',
  },
];

export default function ThailandSafetyGuideEn() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const progress = useMemo(
    () => Math.round((checkedItems.length / preparationItems.length) * 100),
    [checkedItems.length],
  );
  const subId = 'en-thailand-safety';
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, 'hotel-conditions');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'transport-conditions');
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, 'activity-conditions');

  const toggleItem = (index: number) => {
    setCheckedItems((current) => (
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    ));
  };

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Is Thailand safe? Current advice and practical decisions',
      description: 'A current, route-led Thailand safety guide for UK travellers covering official advice, transport, scams, health preparation and emergency contacts.',
      url: PAGE_URL,
      inLanguage: 'en-GB',
      dateModified: UPDATED_AT,
      isPartOf: { '@type': 'WebSite', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Is Thailand safe?', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Four layers of Thailand travel safety planning',
      itemListElement: riskLayers.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.text,
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title="Is Thailand Safe? Current Advice & Risks | Go2Thailand"
        description="Is Thailand safe right now? Check current UK travel advice, route warnings, transport and sea risks, scams, emergency numbers and a practical trip checklist."
        ogImage="https://go2-thailand.com/images/redesign/thailand-safety-hero.webp"
      >
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-safety-hero.webp"
          imageAlt="Travellers checking their route beside an illuminated Bangkok train station"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Travel safety' }]}
          eyebrow="Calm comes from better decisions"
          title={<>Is Thailand<br /><span className="text-saffron">safe?</span></>}
          subtitle="Many established routes are commonly travelled. No route comes with a blank safety promise."
          description="Start with current official advice. Then manage the choices with the most daily leverage: transport, conditions, setting and an exit plan."
          actions={[
            { label: 'Check your route', href: '#advice', kind: 'primary' },
            { label: 'Save emergency numbers', href: '#emergency', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[720px] lg:min-h-[710px]"
          titleClassName="max-w-[640px] text-[4.4rem] leading-[0.84] !text-white sm:text-[5.7rem] lg:text-[6.4rem]"
          subtitleClassName="max-w-[610px] !text-white"
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white/80"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.22)_0%,rgba(4,42,34,0.44)_44%,rgba(4,42,34,0.96)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.94)_40%,rgba(4,42,34,0.17)_64%,rgba(4,42,34,0.03)_100%)]"
          contentClassName="max-w-[680px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={(
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[320px] rounded-2xl border border-white/25 bg-jade/78 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Source check · 27 July 2026</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight">No made-up country score. One live route check and four controllable layers.</p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold text-white/58">
                <ShieldCheck size={16} className="text-saffron-light" />
                FCDO page said current at 21 July 2026.
              </div>
            </div>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section id="advice" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-9 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
            <SectionHeading
              eyebrow="The live answer comes first"
              title={<>Go2Thailand is<br />not a travel-advice service.</>}
              description="At our source check, FCDO used regional warnings—not a blanket ban on Thailand. Its live map remains authoritative because borders, unrest, weather and transport conditions can change after this page is published."
            />
            <div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: 'Most visitor routes',
                    title: 'Read the advice',
                    text: 'Do not convert “no warning” into “no risk”. Match insurance, transport and activities to the actual itinerary.',
                    tone: 'bg-[#f3df76]',
                  },
                  {
                    label: 'Advised against',
                    title: 'Change the route',
                    text: 'FCDO advice can affect insurance and assistance. A holiday is not the reason to test a regional boundary.',
                    tone: 'bg-saffron',
                  },
                  {
                    label: 'Unclear today',
                    title: 'Pause and verify',
                    text: 'Check FCDO, the operator and local authorities before moving through a disrupted border or transport corridor.',
                    tone: 'bg-[#be5b4b]',
                  },
                ].map((item) => (
                  <article key={item.label} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                    <span className={`block h-2 w-12 rounded-full ${item.tone}`} />
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.label}</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-jade">{item.title}</h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/58">{item.text}</p>
                  </article>
                ))}
              </div>
              <a
                href="https://www.gov.uk/foreign-travel-advice/thailand"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-jade/10 bg-jade px-5 py-4 text-white shadow-editorial-card"
              >
                <span>
                  <strong className="block text-sm">Open current UK travel advice and map</strong>
                  <span className="mt-1 block text-[10px] font-medium text-white/55">FCDO · check again before booking and departure</span>
                </span>
                <ExternalLink size={17} className="shrink-0 text-saffron-light" />
              </a>
              <p className="mt-3 text-[10px] font-medium leading-5 text-charcoal/48">Source-check snapshot: FCDO advised against all but essential travel to specified parts of the deep south and areas within 20 km of the Cambodia land border. Use the live page for the current boundary and wording.</p>
            </div>
          </div>
        </section>

        <section id="risks" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Replace anxiety with an order"
              title={<>Four layers.<br />Checked in sequence.</>}
              description="A green badge hides geography, time and behaviour. These four layers show which decision comes next without pretending to predict every incident."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {riskLayers.map((risk, index) => {
                const Icon = risk.icon;
                return (
                  <article key={risk.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span>
                      <span className="font-display text-4xl font-semibold text-jade/10">0{index + 1}</span>
                    </div>
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{risk.label}</p>
                    <h2 className="mt-2 font-display text-[1.8rem] font-semibold text-jade">{risk.title}</h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{risk.text}</p>
                    <p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold leading-4 text-jade">{risk.action}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="transport" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
              <SectionHeading
                eyebrow="The decision with daily leverage"
                title={<>Transport is part<br />of the safety plan.</>}
                description="FCDO highlights road danger and motorbike conditions. The useful question is not whether scooters are normal; it is whether this rider, licence, policy, vehicle, road and weather all match."
              />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/62 lg:justify-self-end">A train, licensed taxi, shared transfer or extra hotel night can be the better route. Convenience never repairs missing legal entitlement or insurance cover.</p>
            </div>
            <div className="relative mt-10 min-h-[660px] overflow-hidden rounded-[30px] shadow-editorial-lift">
              <Image
                src="/images/redesign/thailand-safety-transport.webp"
                alt="Helmet beside a Thailand route showing train, ferry and hotel options"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/12 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 grid gap-3 md:inset-x-8 md:bottom-8 md:grid-cols-3">
                {[
                  { label: 'Motorbike', title: 'Six yeses—or no ride', text: 'Correct licence, policy cover, experience, helmet, vehicle and conditions must align.', light: false },
                  { label: 'Long distance', title: 'Read the whole transfer', text: 'Operator, terminal, arrival time, connection, luggage and last mile form one journey.', light: true },
                  { label: 'Boat & sea', title: 'Conditions over schedule', text: 'Do not board when loading, equipment or weather feels wrong. Follow local warnings.', light: false },
                ].map((item) => (
                  <article key={item.label} className={item.light ? 'rounded-2xl border border-saffron/35 bg-canvas p-5 text-jade shadow-editorial-card' : 'rounded-2xl border border-white/18 bg-jade/80 p-5 text-white backdrop-blur-md'}>
                    <p className={`text-[9px] font-extrabold uppercase tracking-[0.13em] ${item.light ? 'text-saffron-dark' : 'text-saffron-light'}`}>{item.label}</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold">{item.title}</h2>
                    <p className={`mt-3 text-xs font-medium leading-5 ${item.light ? 'text-charcoal/64' : 'text-white/64'}`}>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid min-h-[500px] gap-10 px-7 py-10 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-14">
                <div>
                  <p className="eyebrow !text-saffron-light">A route you can actually use</p>
                  <h2 className="font-display text-[3.45rem] font-semibold leading-[0.88] tracking-[-0.04em]">Safety is a chain of four moments.</h2>
                  <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/64">The chain starts before payment and ends only when the return route is settled. A change of plan is a valid safety decision—not a failed holiday.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link href="/practical-info/scams-safety/" className="rounded-full border border-white/18 bg-white/[0.06] px-4 py-2 text-[10px] font-extrabold text-white">Scams decision guide</Link>
                    <Link href="/travel-guides/solo-female-travel-thailand/" className="rounded-full border border-white/18 bg-white/[0.06] px-4 py-2 text-[10px] font-extrabold text-white">Solo travel guide</Link>
                  </div>
                </div>
                <div className="relative min-h-[330px]">
                  <StoryDottedRoute className="absolute left-0 top-20 hidden h-40 w-72 opacity-90 lg:block" />
                  <div aria-hidden="true" className="absolute bottom-8 left-5 top-8 border-l-2 border-dotted border-saffron/55 lg:hidden" />
                  <div className="relative grid gap-3 lg:ml-auto lg:w-[440px] lg:grid-cols-2">
                    {routeStops.map((stop, index) => (
                      <article key={stop.title} className="ml-12 rounded-2xl border border-white/15 bg-white/[0.09] p-5 backdrop-blur-sm lg:ml-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{stop.label}</span>
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-saffron text-[10px] font-extrabold text-jade">{index + 1}</span>
                        </div>
                        <h3 className="mt-3 font-display text-2xl font-semibold">{stop.title}</h3>
                        <p className="mt-3 text-xs font-medium leading-5 text-white/58">{stop.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Six actions before departure"
              title={<>Build the plan<br />in ten minutes.</>}
              description="This checklist stores nothing and cannot assess your personal risk. It simply makes unfinished preparation visible."
            />
            <div className="mt-10 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
                <div className="bg-jade p-7 text-white sm:p-10">
                  <p className="eyebrow !text-saffron-light">Your departure check</p>
                  <h2 className="font-display text-[4rem] font-semibold leading-none">{checkedItems.length}<span className="text-saffron-light"> / 6</span></h2>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/62">{checkedItems.length === preparationItems.length ? 'The base is ready. Recheck live advice and conditions shortly before departure.' : 'Mark a step only after you have actually checked it.'}</p>
                  <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-saffron transition-all" style={{ width: `${progress}%` }} /></div>
                  <span className="mt-2 block text-[10px] font-bold text-white/45">{progress}% prepared</span>
                </div>
                <div className="grid gap-px bg-jade/10 sm:grid-cols-2">
                  {preparationItems.map((item, index) => {
                    const selected = checkedItems.includes(index);
                    return (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleItem(index)}
                        className={`flex min-h-[124px] items-start gap-4 p-6 text-left transition ${selected ? 'bg-mist' : 'bg-white hover:bg-tonal'}`}
                      >
                        <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border ${selected ? 'border-jade bg-jade text-white' : 'border-jade/18 text-transparent'}`}><Check size={14} /></span>
                        <span>
                          <strong className="block text-xs leading-5 text-jade">{item}</strong>
                          <span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.11em] text-saffron-dark">{selected ? 'checked' : 'still to do'}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="emergency" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[30px] border border-jade/8 bg-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[520px]">
                <Image
                  src="/images/redesign/thailand-safety-emergency-kit.webp"
                  alt="Phone, document copies, first-aid pouch and route map prepared for an emergency"
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-jade p-7 text-white sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">Save this offline</p>
                <h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.035em]">Who do you call when something does happen?</h2>
                <div className="mt-7 grid gap-3">
                  {[
                    { icon: ShieldCheck, number: '191', label: 'General police emergency' },
                    { icon: PhoneCall, number: '1155', label: 'Tourist Police' },
                    { icon: Ambulance, number: '1669', label: 'Medical emergency' },
                    { icon: Flame, number: '199', label: 'Fire and rescue' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.number} className="flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3">
                        <span className="flex items-center gap-3 text-xs font-extrabold"><Icon size={16} className="text-saffron-light" />{item.label}</span>
                        <strong className="font-display text-2xl text-white">{item.number}</strong>
                      </div>
                    );
                  })}
                </div>
                <a href="https://www.gov.uk/world/organisations/british-embassy-bangkok" target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between border-t border-white/12 pt-5 text-[10px] font-bold text-white/62">
                  <span>British Embassy Bangkok · current contact routes</span>
                  <ExternalLink size={13} className="text-saffron-light" />
                </a>
                <p className="mt-4 text-[10px] font-medium leading-5 text-white/48">Also save your insurer&apos;s assistance number and policy reference. Call the appropriate local emergency service first when immediate help is needed.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
              <SectionHeading
                eyebrow="A marketplace is not a safety certificate"
                title={<>Compare the conditions.<br />Keep the judgement.</>}
                description="Use booking partners to inspect current location, operator, timing and flexibility. A listing never removes your responsibility to verify the route and provider."
              />
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {['recent terms', 'arrival route', 'operator', 'cancellation'].map((item) => <span key={item} className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">{item}</span>)}
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { icon: FileCheck2, eyebrow: 'Stay', title: 'Trip.com', text: 'Check the neighbourhood, reception hours, arrival route and current cancellation terms.', href: tripHref, label: 'Check current stays' },
                { icon: TrainFront, eyebrow: 'Transfer', title: '12Go', text: 'Read operator, terminal, arrival time, connection and luggage as one current journey.', href: transportHref, label: 'Check current transport' },
                { icon: Sparkles, eyebrow: 'Activity', title: 'Klook', text: 'Read the exact operator, pickup zone, inclusions and current change conditions.', href: klookHref, label: 'Check current activities' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.eyebrow}</span></div>
                    <h2 className="mt-5 font-display text-3xl font-semibold text-jade">{item.title}</h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p>
                    <a href={item.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{item.label} <ExternalLink size={13} className="text-saffron" /></a>
                  </article>
                );
              })}
            </div>
            <AffiliateDisclosure className="mt-3">Trip.com, 12Go and Klook links are affiliate links. Go2Thailand may receive a commission at no extra cost to you. We do not certify providers or guarantee safety, availability or performance.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real UK-English search questions"
          title="Frequently asked questions about Thailand safety"
          description="These questions were deduplicated from ten current DataForSEO SERPs. Any question about the situation 'right now' returns to the live government source."
          items={faqItems}
        />

        <RelatedGuidesSection
          eyebrow="Go deeper only where needed"
          title="Complete the practical plan"
          readLabel="Read the guide"
          guides={[
            {
              title: 'Scams and pressure patterns',
              description: 'Recognise diversion, urgency, document deposits and disputed damage before money changes hands.',
              href: '/practical-info/scams-safety/',
              image: '/images/redesign/thailand-safety-emergency-kit.webp',
              imageAlt: 'Phone and documents used to verify a Thailand booking',
            },
            {
              title: 'Solo female travel',
              description: 'Plan arrivals, accommodation, communication, evenings and the route home without blanket promises.',
              href: '/travel-guides/solo-female-travel-thailand/',
              image: '/images/redesign/thailand-safety-hero.webp',
              imageAlt: 'Travellers planning a lit urban route in Thailand',
            },
            {
              title: 'Health and vaccinations',
              description: 'Use the specialist owner for pre-travel health advice, insurance, mosquito exposure and animal bites.',
              href: '/practical-info/health-vaccinations/',
              image: '/images/redesign/thailand-safety-transport.webp',
              imageAlt: 'Thailand journey choices prepared before departure',
            },
          ]}
        />

        <SourceMethodSection
          eyebrow="Sources & method"
          title="Safety advice needs a live owner"
          description="Five DFS clusters, ten UK SERPs, four successful full-page parses, seven Go2Thailand ranking/backlink checks and current primary-source review were completed on 27 July 2026. Go2Thailand turns official advice into planning decisions; it does not publish a private country score or live incident status."
          sources={[
            {
              title: 'Thailand travel advice',
              creator: 'UK Foreign, Commonwealth & Development Office',
              url: 'https://www.gov.uk/foreign-travel-advice/thailand',
              note: 'Primary live source for regional warnings, insurance implications and current route boundaries.',
            },
            {
              title: 'Safety and security in Thailand',
              creator: 'UK Foreign, Commonwealth & Development Office',
              url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security',
              note: 'Primary UK guidance for crime, drink spiking, laws, road travel, sea travel and severe weather.',
            },
            {
              title: 'Thailand country information',
              creator: 'TravelHealthPro · NaTHNaC',
              url: 'https://travelhealthpro.org.uk/country/221/thailand',
              note: 'Current UK specialist source for route-specific health risks and pre-travel consultation.',
            },
            {
              title: 'Tourist Police and emergency contacts',
              creator: 'Thailand Tourist Police Bureau',
              url: 'https://www.touristpolice.go.th/en/main',
              note: 'Official source for Tourist Police 1155 and national police, medical and fire contacts.',
            },
            {
              title: 'Thailand road-safety profile',
              creator: 'World Health Organization',
              url: 'https://www.who.int/thailand/health-topics/road-safety',
              note: 'Primary public-health context for why road choices deserve prominent treatment.',
            },
          ]}
        />
      </div>
    </>
  );
}
