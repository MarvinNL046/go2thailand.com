import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BatteryCharging,
  Clock3,
  ExternalLink,
  FileCheck2,
  IdCard,
  MapPin,
  Music2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TicketCheck,
  TrainFront,
  Users,
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
import { TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';

const PAGE_URL = 'https://go2-thailand.com/blog/bts-world-tour-bangkok-december-2026-tickets-guide/';
const OFFICIAL_EVENT = 'https://www.livenationtero.co.th/en/event/bts-world-tour-arirang-in-bangkok-bangkok-tickets-edp1675906';
const OFFICIAL_TICKETS = 'https://www.thaiticketmajor.com/concert/bts-world-tour-arirang-in-bangkok.html';
const UPDATED_AT = '2026-07-27';

const concertDates = [
  { day: '03', weekday: 'Thursday', label: '3 December 2026', doors: '16:00', show: '19:00' },
  { day: '05', weekday: 'Saturday', label: '5 December 2026', doors: '16:00', show: '19:00' },
  { day: '06', weekday: 'Sunday', label: '6 December 2026', doors: '16:00', show: '19:00' },
];

const priceTiers = ['฿3,300', '฿4,300', '฿5,300', '฿6,300', '฿6,800', '฿7,800 VIP'];

const sectionNav = [
  { href: '#status' as const, label: 'Live status', icon: TicketCheck },
  { href: '#tickets' as const, label: 'Tickets', icon: ShieldCheck },
  { href: '#venue' as const, label: 'Venue', icon: MapPin },
  { href: '#day-plan' as const, label: 'Concert day', icon: Clock3 },
  { href: '#entry' as const, label: 'Entry checks', icon: IdCard },
  { href: '#questions' as const, label: 'Questions', icon: Sparkles },
];

const officialChecks = [
  {
    icon: TicketCheck,
    title: 'All dates currently sold out',
    text: 'Live Nation Tero and ThaiTicketMajor mark 3, 5 and 6 December as sold out at our 27 July source check.',
  },
  {
    icon: IdCard,
    title: 'The attendee name matters',
    text: 'ThaiTicketMajor says the English name printed on the ticket must match accepted photo identification and cannot be changed.',
  },
  {
    icon: ShieldCheck,
    title: 'Unofficial resale is high risk',
    text: 'The official conditions warn that unauthorised or transferred tickets can be cancelled or refused at entry.',
  },
];

const routeStops = [
  { label: 'Before 14:30', title: 'Leave your base', text: 'Build in Friday or weekend traffic, a last-mile transfer and time to follow event-specific instructions.' },
  { label: 'Before doors', title: 'Reach the venue zone', text: 'Use the official event update for the correct gate, drop-off point and any temporary transport plan.' },
  { label: '16:00', title: 'Doors open', text: 'Keep your named ticket, matching identification and permitted essentials immediately accessible.' },
  { label: 'Before 19:00', title: 'Set a return point', text: 'Agree on a meeting place and backup route before the crowd leaves at the same time.' },
];

const entryChecks = [
  { icon: IdCard, title: 'Matching identification', text: 'Bring the accepted original photo ID or passport named in the current official entry conditions.' },
  { icon: TicketCheck, title: 'Official named ticket', text: 'Keep the QR code private and have the purchase confirmation available; it does not itself replace the ticket.' },
  { icon: Smartphone, title: 'Offline essentials', text: 'Save the official event page, hotel address, route and meeting point before mobile networks become congested.' },
  { icon: FileCheck2, title: 'Current prohibited items', text: 'Recheck the official list. ThaiTicketMajor currently prohibits cameras and recording equipment but allows smartphone cameras.' },
  { icon: Users, title: 'Age and access rules', text: 'Check the published standing-zone, child and accessibility rules directly if they apply to anyone in your group.' },
  { icon: TrainFront, title: 'A real return route', text: 'Do not assume a car can collect you at the gate. Pick a walk-out direction, meeting point and backup before arrival.' },
];

const faqs = [
  {
    question: 'Is BTS coming to Thailand in 2026?',
    answer: "Yes. Live Nation Tero, ThaiTicketMajor and BIGHIT's tour directory confirm BTS WORLD TOUR 'ARIRANG' in Bangkok in December 2026. Use the linked official event pages for changes rather than relying on an old social post or screenshot.",
  },
  {
    question: 'Where will BTS perform in Bangkok in 2026?',
    answer: 'The three Bangkok concerts are scheduled for Rajamangala National Stadium. The venue is in eastern Bangkok; it is not the National Stadium beside Siam. Check the official event update for the correct gate and any temporary transport or drop-off instructions.',
  },
  {
    question: 'Which stadium is the BTS concert in Bangkok?',
    answer: 'Rajamangala National Stadium. Similar searches often confuse it with Suphachalasai National Stadium or with the BTS Skytrain. Confirm the venue name on your official ticket before choosing a hotel or route.',
  },
  {
    question: 'When are the BTS Bangkok concerts?',
    answer: 'The confirmed dates are Thursday 3, Saturday 5 and Sunday 6 December 2026. ThaiTicketMajor currently lists doors at 16:00 and the performance at 19:00 for each date. Recheck your exact ticket and the official event page before travelling.',
  },
  {
    question: 'How much are BTS tickets in Thailand?',
    answer: 'ThaiTicketMajor lists face-value tiers of ฿3,300, ฿4,300, ฿5,300, ฿6,300, ฿6,800 and ฿7,800 VIP. The vendor says booking, payment and ticket-issuance charges may be shown separately before confirmation. These are official face values, not a resale-price guide.',
  },
  {
    question: 'Is the BTS Bangkok concert sold out?',
    answer: 'At our 27 July 2026 check, Live Nation Tero and ThaiTicketMajor marked all three Bangkok dates sold out. Status can change if the organiser releases production holds or cancelled inventory, but Go2Thailand does not operate a live ticket feed or waiting list.',
  },
  {
    question: 'How do I buy official BTS Bangkok tickets?',
    answer: 'The official Thailand seller is ThaiTicketMajor, linked from Live Nation Tero and the official tour directory. General sale opened on 11 June and currently shows sold out. Avoid links that imitate the seller, request payment outside its checkout or promise a name transfer the official rules do not allow.',
  },
  {
    question: 'Can you buy BTS tickets without being an ARMY member?',
    answer: 'The ARMY Membership presale required registration, but the later general sale did not require membership. Both presale and general-sale windows have passed and all dates currently show sold out, so membership is not a route around the present inventory status.',
  },
  {
    question: 'What time does the BTS Bangkok concert start?',
    answer: 'ThaiTicketMajor currently lists doors at 16:00 and show time at 19:00 for all three dates. Your named ticket and later organiser messages control if anything changes. Arrive with enough time for venue access, identification and security checks.',
  },
  {
    question: 'Are BTS Bangkok tickets transferable?',
    answer: 'The current ThaiTicketMajor conditions say the attendee name is printed in English, must match accepted photo identification and cannot be changed or transferred. Unofficial resale may lead to cancellation or refused entry, so do not assume a seller can “fix the name later.”',
  },
];

const sources = [
  {
    title: "BTS WORLD TOUR 'ARIRANG' IN BANGKOK",
    creator: 'Live Nation Tero',
    url: OFFICIAL_EVENT,
    note: 'Primary promoter page for dates, venue, sale windows and current sold-out status.',
  },
  {
    title: "Official ticket page and event conditions",
    creator: 'ThaiTicketMajor',
    url: OFFICIAL_TICKETS,
    note: 'Primary seller page for prices, times, status, named-ticket rules, identification, age and prohibited-item conditions.',
  },
  {
    title: "BTS World Tour 'ARIRANG' tour directory",
    creator: 'BIGHIT MUSIC',
    url: 'https://ibighit.com/en/bts/tour/',
    note: 'Official artist tour directory used to confirm that Bangkok belongs to the announced tour.',
  },
  {
    title: 'Asia and Australia ticket information',
    creator: 'Weverse / BIGHIT MUSIC',
    url: 'https://weverse.io/bts/notice/36080',
    note: 'Official presale-registration context. Those registration and presale windows are now past.',
  },
];

export default function BtsBangkokConcertGuideEn() {
  const [selectedDate, setSelectedDate] = useState(1);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'en-bts-bangkok-2026', 'concert-hotel-options');
  const selected = concertDates[selectedDate];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: "BTS Bangkok 2026: sold-out ticket status and travel guide",
      description: "Current guide to BTS WORLD TOUR 'ARIRANG' in Bangkok with official dates, sold-out status, ticket prices, Rajamangala planning and entry checks.",
      url: PAGE_URL,
      inLanguage: 'en-GB',
      datePublished: '2026-03-23',
      dateModified: UPDATED_AT,
      isPartOf: { '@type': 'WebSite', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
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
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://go2-thailand.com/blog/' },
        { '@type': 'ListItem', position: 3, name: 'BTS Bangkok 2026', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'BTS Bangkok 2026 concert dates',
      itemListElement: concertDates.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        description: `Doors ${item.doors}; show ${item.show}; currently sold out at the 27 July 2026 source check.`,
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title="BTS Bangkok 2026: Sold-Out Tickets & Travel Guide"
        description="BTS Bangkok 2026 guide: official 3, 5–6 December dates, sold-out ticket status, ฿3,300–฿7,800 face values, Rajamangala route and entry checks."
        ogImage="https://go2-thailand.com/images/redesign/bts-bangkok-stadium-hero.webp"
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template="bts-bangkok-concert-en" className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/bts-bangkok-stadium-hero.webp"
          imageAlt="Anonymous concert crowd inside a large Bangkok stadium at night"
          breadcrumbs={[
            { label: 'Thailand', href: '/' },
            { label: 'Bangkok', href: '/city/bangkok/' },
            { label: 'Events', href: '/blog/' },
            { label: 'BTS 2026' },
          ]}
          eyebrow="Official status · checked 27 July 2026"
          title={<>BTS Bangkok.<br />Plan the night,<br />not a rumour.</>}
          subtitle="Three Rajamangala shows. All currently sold out."
          description="The dates and venue are confirmed, the official sale has happened, and named-ticket rules matter. Use this page to verify the live source, understand face value and build a realistic concert-day route."
          actions={[
            { label: 'Check official ticket status', href: OFFICIAL_EVENT, kind: 'primary', newTab: true, icon: <ExternalLink size={16} className="text-saffron" /> },
            { label: 'Build the concert day', href: '#day-plan', kind: 'secondary' },
          ]}
          contentTone="light"
          minHeightClassName="min-h-[760px] lg:min-h-[720px]"
          contentClassName="max-w-[670px]"
          titleClassName="max-w-[690px] text-[3.75rem] leading-[0.86] sm:text-[5.2rem] lg:text-[5.7rem]"
          descriptionClassName="mt-5 max-w-[600px] text-sm leading-7"
          imageClassName="object-cover object-[64%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,20,18,0.2)_0%,rgba(4,20,18,0.7)_52%,rgba(4,20,18,0.97)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,20,17,0.98)_0%,rgba(3,20,17,0.9)_37%,rgba(3,20,17,0.24)_67%,rgba(3,20,17,0.08)_100%)]"
          decorativeOverlay={<div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-jade/45 to-transparent" />}
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-20 hidden w-[300px] rounded-2xl border border-white/15 bg-jade/88 p-6 text-white shadow-editorial-lift backdrop-blur-md xl:block">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-saffron-light/35 bg-saffron/15 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Sold out</span>
                <TicketCheck size={19} className="text-saffron-light" />
              </div>
              <p className="mt-5 font-display text-[2.1rem] font-semibold leading-none">3 · 5 · 6 Dec</p>
              <p className="mt-3 text-xs font-semibold leading-5 text-white/66">Rajamangala National Stadium<br />Doors 16:00 · show 19:00</p>
              <p className="mt-5 border-t border-white/12 pt-4 text-[10px] font-medium leading-5 text-white/52">Status is a dated snapshot. The linked official seller controls live inventory and event conditions.</p>
            </aside>
          )}
        />

        <PageSectionNav label="BTS Bangkok concert guide sections" items={sectionNav} />

        <section id="status" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
              <SectionHeading
                eyebrow="The answer first"
                title="Confirmed event. Closed sale. Live conditions."
                description="This is not a ticket marketplace. It is a dated travel decision page built from the promoter, official seller, artist and Weverse sources."
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {officialChecks.map(({ icon: Icon, title, text }, index) => (
                  <article key={title} className={`rounded-2xl border p-6 ${index === 0 ? 'border-saffron/35 bg-[#fff4df] shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}>
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-jade/10 bg-white text-jade"><Icon size={20} /></span>
                    <h2 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {concertDates.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  aria-pressed={selectedDate === index}
                  onClick={() => setSelectedDate(index)}
                  className={`group flex min-h-[170px] items-stretch overflow-hidden rounded-2xl border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${selectedDate === index ? 'border-jade bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white text-jade shadow-editorial-card hover:border-saffron/40'}`}
                >
                  <span className={`grid w-[92px] shrink-0 place-items-center border-r text-center ${selectedDate === index ? 'border-white/12 bg-white/[0.05]' : 'border-jade/10 bg-tonal'}`}>
                    <span><strong className="block font-display text-[3.4rem] font-semibold leading-none">{item.day}</strong><small className={`mt-2 block text-[9px] font-extrabold uppercase tracking-[0.14em] ${selectedDate === index ? 'text-saffron-light' : 'text-saffron-dark'}`}>Dec</small></span>
                  </span>
                  <span className="flex flex-1 flex-col justify-center p-5">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron">{item.weekday}</span>
                    <span className="mt-2 text-sm font-extrabold">Doors {item.doors}</span>
                    <span className={`mt-1 text-xs font-medium ${selectedDate === index ? 'text-white/58' : 'text-charcoal/55'}`}>Show {item.show}</span>
                    <span className={`mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold ${selectedDate === index ? 'text-saffron-light' : 'text-jade'}`}><span className="h-2 w-2 rounded-full bg-saffron" /> Currently sold out</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="tickets" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow !text-saffron-light">Face value, not resale fantasy</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] sm:text-[4.2rem]">Know the official ladder.<br />Then protect the name.</h2>
              <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-white/65">The old article guessed broad tiers before sales opened. The official seller now publishes the real values and the rules that matter more than a reseller screenshot.</p>
              <a href={OFFICIAL_TICKETS} target="_blank" rel="noopener noreferrer" className="btn-cream mt-7 min-h-12 w-fit px-6 text-saffron-dark">Open ThaiTicketMajor <ExternalLink size={15} /></a>
              <p className="mt-3 text-[10px] font-medium leading-5 text-white/46">Official external source, not an affiliate link. Current status: sold out at our source check.</p>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {priceTiers.map((price, index) => (
                  <div key={price} className={`rounded-2xl border p-5 ${index === priceTiers.length - 1 ? 'border-saffron/45 bg-saffron/12' : 'border-white/12 bg-white/[0.055]'}`}>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/42">Official tier</p>
                    <p className="mt-3 font-display text-[1.9rem] font-semibold leading-none text-white">{price}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] font-medium leading-5 text-white/48">ThaiTicketMajor says separately displayed booking, payment and ticket-issuance charges may apply. Check the seller for the final transaction total; these values do not describe unofficial resale.</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['1', 'Use only the official chain', 'Start at BIGHIT or Live Nation Tero and follow the named seller.'],
                  ['2', 'Match every attendee', 'Enter each English name exactly as required by the current rules.'],
                  ['3', 'Reject transfer promises', 'The official conditions say names cannot be changed or transferred.'],
                ].map(([number, title, text]) => (
                  <article key={number} className="rounded-2xl border border-white/12 bg-white/[0.045] p-5">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-saffron text-[10px] font-black text-jade">{number}</span>
                    <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
                    <p className="mt-3 text-xs leading-6 text-white/57">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="venue" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[380px] lg:min-h-[610px]">
                <Image src="/images/redesign/bangkok-route-planning.webp" alt="Planning a Bangkok city route before a large evening event" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/72 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                  <p className="eyebrow !text-saffron-light">Do not navigate to the wrong stadium</p>
                  <h2 className="max-w-xl font-display text-[2.7rem] font-semibold leading-[0.92]">Rajamangala is not National Stadium by Siam.</h2>
                </div>
              </div>
              <div className="bg-tonal p-7 sm:p-10 lg:p-12">
                <SectionHeading eyebrow="The honest movement plan" title="Rail plus a last mile is still a last mile." description="Rajamangala does not have a station at its gate. Event controls can change road access, drop-off points and walking approaches, so a durable plan uses a buffer and a backup rather than one magic station name." />
                <div className="mt-8 divide-y divide-jade/10 border-y border-jade/10">
                  {[
                    ['Check the organiser update', 'Use the exact gate, access and temporary traffic information published for your show.'],
                    ['Choose a direction, not only a vehicle', 'Know which side of the stadium you will exit and where your group will regroup.'],
                    ['Expect the hard part after the encore', 'The outward trip is staggered; the return puts tens of thousands of people on the road together.'],
                  ].map(([title, text], index) => (
                    <div key={title} className="grid grid-cols-[34px_1fr] gap-4 py-5">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-saffron/35 bg-white text-[10px] font-black text-saffron-dark">{index + 1}</span>
                      <div><h3 className="text-sm font-extrabold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">{text}</p></div>
                    </div>
                  ))}
                </div>
                <Link href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Understand Bangkok BTS and MRT <ArrowRight size={14} className="text-saffron" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="day-plan" className="section-divider-bottom relative scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
              <div className="relative">
                <SectionHeading
                  eyebrow={`${selected.weekday} · ${selected.label}`}
                  title="A route that ends after the encore."
                  description={`For the selected ${selected.day} December show, the official page currently lists doors at ${selected.doors} and performance at ${selected.show}. The same logistics apply to all three dates; recheck the exact ticket.`}
                />
                <StoryDottedRoute className="mt-8 hidden h-44 w-72 opacity-90 lg:block" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {routeStops.map((stop, index) => (
                  <article key={stop.title} className="relative min-h-[220px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{stop.label}</span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-jade text-[10px] font-black text-white">{index + 1}</span>
                    </div>
                    <h3 className="mt-7 font-display text-[1.8rem] font-semibold leading-none text-jade">{stop.title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{stop.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="entry" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Your event-day wallet" title="Six checks before you join the queue" description="Official instructions can change. This list helps you know what to recheck; it does not replace the organiser's latest message or the conditions on your ticket." />
              <a href={OFFICIAL_TICKETS} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Read the current official conditions <ExternalLink size={14} /></a>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {entryChecks.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-jade/10 bg-tonal text-jade"><Icon size={20} /></span>
                  <h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-[#f5efe5] py-14 lg:py-20">
          <div className="container-custom grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="relative overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10">
              <div className="relative z-10 max-w-2xl">
                <p className="eyebrow !text-saffron-light">Where should you sleep?</p>
                <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Choose the return journey before the room view.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/65">A nearby hotel can shorten distance but may offer fewer choices outside the event. A central base may suit the rest of the trip but needs a stronger stadium plan. Compare the actual address, cancellation terms and late-arrival policy.</p>
                <a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 min-h-12 w-fit px-6 text-saffron-dark">Check current Bangkok hotel prices <ExternalLink size={15} /></a>
                <AffiliateDisclosure className="mt-4 max-w-xl text-white/48">Affiliate link: we may earn a commission at no extra cost to you. Trip.com does not provide a safety or concert-access guarantee; verify the exact property, current price, terms and route yourself.</AffiliateDisclosure>
              </div>
              <MapPin className="absolute -bottom-10 -right-8 h-56 w-56 text-white/[0.045]" strokeWidth={1} />
            </article>

            <article className="flex min-h-[360px] flex-col rounded-[28px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1dd] text-saffron-dark"><BatteryCharging size={23} /></span>
              <p className="eyebrow mt-7">OneLink · one relevant product</p>
              <h2 className="font-display text-[2.55rem] font-semibold leading-[0.92] text-jade">Backup power for the long day.</h2>
              <p className="mt-5 flex-1 text-sm font-medium leading-7 text-charcoal/64">A compact Anker PowerCore 10K can support maps, official updates and your return route. Test it before travel, check the exact model and seller, and carry power banks in cabin baggage under the operating airline&apos;s current rules.</p>
              <a href="/go/anker-powercore-10k/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-7 inline-flex items-center justify-between border-t border-jade/10 pt-5 text-xs font-extrabold text-jade">Check current price at Amazon <ExternalLink size={14} className="text-saffron" /></a>
              <AffiliateDisclosure className="mt-3">As an Amazon Associate we earn from qualifying purchases at no extra cost to you. OneLink may route you to a local store; product, seller, delivery, availability and current price vary.</AffiliateDisclosure>
            </article>
          </div>
        </section>

        <FaqSplitSection
          id="questions"
          eyebrow="Real UK search questions"
          title="BTS Bangkok 2026 questions"
          description="These questions were captured in current UK DataForSEO People Also Ask results. Skytrain ticket and fare questions were excluded because they belong to Bangkok transport, not this concert."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Build the rest of the trip"
          title="Bangkok beyond one stadium night"
          readLabel="Open guide"
          guides={[
            { title: 'Bangkok city guide', description: 'Choose a base, city rhythm and realistic multi-day structure around the concert.', href: '/city/bangkok/', image: '/images/redesign/bangkok-destination-hero.webp', imageAlt: 'Bangkok skyline and city life' },
            { title: 'Where to stay in Bangkok', description: 'Compare neighbourhoods by daily route, evening style and transport rather than one event.', href: '/blog/where-to-stay-bangkok-neighborhood-guide/', image: '/images/redesign/stay-bangkok-rooftop.webp', imageAlt: 'Bangkok hotel rooftop at dusk' },
            { title: 'Bangkok BTS and MRT', description: 'Understand the rail systems without confusing BTS Skytrain tickets with BTS concert tickets.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/redesign/bangkok-route-planning.webp', imageAlt: 'Planning a public transport route across Bangkok' },
          ]}
        />

        <SourceMethodSection
          eyebrow="Sources & method"
          title="A dated status page, not a ticket promise"
          description="We combined independent UK keyword, SERP, PAA, ranking and backlink research with current official promoter, seller, artist and fan-platform sources. Dynamic status is dated because inventory, access and event instructions can change."
          sources={sources}
        />

        <section className="py-8">
          <div className="container-custom flex flex-wrap items-center justify-between gap-4 text-[10px] font-medium text-charcoal/48">
            <span>Research and official-source check: 27 July 2026</span>
            <span className="inline-flex items-center gap-2"><Music2 size={13} className="text-jade" /> Independent travel planning · not affiliated with BTS, HYBE, Live Nation Tero or ThaiTicketMajor</span>
          </div>
        </section>
      </div>
    </>
  );
}
