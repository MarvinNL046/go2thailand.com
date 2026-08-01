import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  Footprints,
  HeartPulse,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  Ticket,
  TrainFront,
  Users,
  Waves,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/blog/cave-fantasy-mbk-center-bangkok-immersive-art-2026/';
const PAGE_TITLE = 'Cave Fantasy Bangkok: tickets, MBK route and honest review';
const PAGE_DESCRIPTION = 'Choose between Fantasy Space, Flight Theater and the Cave Fantasy Bangkok combo. Includes current MBK location, BTS route, family checks and ticket advice.';
const HERO_IMAGE = '/images/redesign/cave-fantasy-hero.webp';

const navItems: PageSectionNavItem[] = [
  { href: '#choose', label: 'Choose a ticket', icon: Ticket },
  { href: '#inside', label: 'What is inside?', icon: Sparkles },
  { href: '#families', label: 'With children', icon: Users },
  { href: '#route', label: 'Getting there', icon: Route },
  { href: '#practical', label: 'Before booking', icon: BadgeCheck },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

interface TicketChoice {
  icon: LucideIcon;
  label: string;
  title: string;
  time: string;
  bestFor: string;
  expectation: string;
  check: string;
}

const ticketChoices: TicketChoice[] = [
  {
    icon: Sparkles,
    label: 'Walk at your own pace',
    title: 'Fantasy Space',
    time: 'Allow roughly 45–90 minutes',
    bestFor: 'Photos, projections, children who want to move freely and visitors who do not need a motion ride.',
    expectation: 'The current listing divides Fantasy Space into eight themed zones. You walk through them and largely set your own pace.',
    check: 'Check which zones are included on your date and the last-admission time before paying.',
  },
  {
    icon: Waves,
    label: 'Short and motion based',
    title: 'Flight Theater',
    time: 'A separate, shorter experience',
    bestFor: 'Visitors looking for a simulated flight and one clearly defined attraction moment.',
    expectation: 'This is not another walk-through gallery. It is a motion-focused theatre experience with visual effects.',
    check: 'A minimum height and health warnings apply. Read the product conditions before booking.',
  },
  {
    icon: Ticket,
    label: 'The complete first visit',
    title: 'Combo',
    time: 'Plan 1–2 hours plus a buffer',
    bestFor: 'Groups who know that both the free-roaming photo zones and Flight Theater suit everyone.',
    expectation: 'The combo joins the walk-through zones and theatre. It is more complete, but not automatically better for every visitor.',
    check: 'Compare inclusions, date validity, changes, cancellation and re-entry on the actual voucher.',
  },
];

// Questions are copied verbatim from the English DataForSEO PAA captures dated 26 July 2026.
const faqs = [
  { question: 'Where is Cave Fantasy in Bangkok?', answer: 'Cave Fantasy is on floor 4, Zone A, unit 4K-103 in MBK Center. Take the BTS Silom Line to National Stadium (W1), follow the covered connection towards MBK and use the current mall directory once inside.' },
  { question: 'What is MBK Mall famous for?', answer: 'MBK is known for its large mix of shopping, food and entertainment in central Bangkok. For this itinerary, its practical advantage is the direct National Stadium BTS connection and the ability to combine Cave Fantasy with lunch, shopping or another indoor stop.' },
  { question: 'Is it worth going to MBK Bangkok?', answer: 'It can be worth it when you want shopping, food and indoor entertainment in one BTS-connected building. It is less compelling if you only want luxury brands or quiet museum galleries. Cave Fantasy gives MBK a specific purpose rather than making the mall the entire day.' },
  { question: 'What is the best time to visit MBK?', answer: 'For Cave Fantasy, the best time is the ticket slot that leaves a buffer before the product’s last admission. MBK lists broad mall and entertainment hours, but ticket hours can be shorter. Weekday mornings or early afternoons may feel easier than peak evening and weekend periods, without guaranteeing low crowds.' },
  { question: 'Do you haggle at MBK Bangkok?', answer: 'Some independent stalls may negotiate, while fixed-price shops, restaurants and ticketed attractions do not work that way. Do not treat the Cave Fantasy counter as a market stall: compare the exact package and current price on the official or ticket platform instead.' },
  { question: 'What to do in Bangkok during the rainy season?', answer: 'Use the BTS to build a compact indoor route rather than crossing the city by road. Cave Fantasy, BACC when open, lunch and one MBK activity can form a resilient half day. Availability and opening times still need checking before a storm starts.' },
  { question: 'What fun activities to do in Bangkok?', answer: 'Bangkok offers markets, temples, food tours, viewpoints, museums and indoor entertainment. Cave Fantasy fits visitors who want a short, air-conditioned, photo-led experience near Siam; it should complement rather than replace the city’s cultural sights.' },
  { question: 'What is the immersive digital art museum in Bangkok?', answer: 'Bangkok has several venues marketed with words such as immersive, digital and interactive. Cave Fantasy is best understood as commercial photo-led entertainment, not a traditional collecting art museum. Compare it with BACC or another digital attraction by format, location and purpose.' },
  { question: 'Is Bangkok, Thailand kid friendly?', answer: 'Many Bangkok attractions can work well for families when heat, transport, rest and sensory load are planned. At Cave Fantasy, check the current height rules, dark and mirrored spaces, motion warnings and whether each child actually wants Flight Theater.' },
  { question: 'What malls are kid friendly in Bangkok?', answer: 'Several Bangkok malls combine food, toilets, air conditioning and family entertainment. MBK can work well because it is BTS-connected and has multiple activities, but suitability still depends on the child. Choose one main activity and leave time for food and rest.' },
];

const sources = [
  { title: 'Cave Fantasy directory', creator: 'MBK Center', url: 'https://www.mbk-center.co.th/directory/shop/Cave-Fantasy/', note: 'Primary location source: floor 4, Zone A, unit 4K-103, plus the venue’s 3D immersive-entertainment positioning.' },
  { title: 'Entertainment at MBK Center', creator: 'MBK Center', url: 'https://www.mbk-center.co.th/en/zone/entertainment-zone/', note: 'Official entertainment directory and broad daily opening hours for Cave Fantasy within MBK.' },
  { title: 'Plan your visit', creator: 'Bangkok Art and Culture Centre', url: 'https://www.bacc.or.th/en/plan-your-visit', note: 'Primary source for BACC opening days, hours, admission and its direct National Stadium connection.' },
  { title: 'Cave Fantasy ticket', creator: 'Klook', url: 'https://www.klook.com/en-US/activity/195002-cave-fantasy-ticket-bangkok/', note: 'Current packages, eight-zone combo inclusions, duration, product hours, height criteria, re-entry and visitor conditions; checked 26 July 2026.' },
  { title: 'Review: Cave Fantasy', creator: 'HoneyKids Asia', url: 'https://honeykidsasia.com/thailand/cave-fantasy-bangkok-review/', note: 'English DFS-parsed competitor used to compare family expectations and practical coverage.' },
  { title: 'Cave Fantasy ticket overview', creator: 'ThaiPass', url: 'https://www.thethaipass.com/activities/thailand-bangkok/cave-fantasy-bangkok', note: 'English DFS-parsed commercial competitor used for ticket-intent coverage, not fixed prices or ratings.' },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-22', dateModified: '2026-07-26',
      inLanguage: 'en', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org', '@type': 'TouristAttraction', name: 'Cave Fantasy Bangkok', url: PAGE_URL,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`,
      address: { '@type': 'PostalAddress', streetAddress: 'MBK Center, 444 Phayathai Road, floor 4, Zone A', addressLocality: 'Bangkok', postalCode: '10330', addressCountry: 'TH' },
      touristType: ['Families', 'Photography enthusiasts', 'Visitors looking for an indoor activity'],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Cave Fantasy Bangkok', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to reach Cave Fantasy Bangkok by BTS',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Travel to National Stadium', text: 'Take the BTS Silom Line to National Stadium W1. Change at Siam when arriving on the Sukhumvit Line.' },
        { '@type': 'HowToStep', position: 2, name: 'Follow the covered connection', text: 'Walk towards MBK using the short covered connection instead of crossing the busiest road level.' },
        { '@type': 'HowToStep', position: 3, name: 'Go to floor 4, Zone A', text: 'Use the current mall directory to find unit 4K-103 and verify the product desk and admission time.' },
        { '@type': 'HowToStep', position: 4, name: 'Check the exact ticket', text: 'Confirm whether your voucher covers Fantasy Space, Flight Theater or the combo before entering.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function CaveFantasyBangkokGuideEn() {
  const subId = useSubId();
  const ticketHref = withPlacementSubId(KLOOK_GENERIC, subId, 'cave-fantasy-ticket-check-en');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="cave fantasy bangkok, cave fantasy mbk, cave fantasy bangkok tickets, cave fantasy review, immersive art bangkok, indoor activities bangkok" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-22" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="An immersive world on MBK floor four"
          title={<>Cave Fantasy<br />Bangkok.</>}
          subtitle="Choose the experience that fits."
          description="A practical decision guide to Fantasy Space, Flight Theater and the combo—with the BTS route, family checks and current conditions."
          image={HERO_IMAGE}
          imageAlt="Editorial atmosphere image of a family exploring an immersive light cave for a Cave Fantasy Bangkok guide"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Cave Fantasy' }]}
          actions={[
            { label: 'Choose your ticket', href: '#choose', kind: 'primary' },
            { label: 'Plan the BTS route', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[850px] lg:min-h-[720px]"
          contentClassName="max-w-[700px]"
          titleClassName="max-w-[710px] text-[3.9rem] leading-[0.84] sm:text-[5rem] lg:text-[5.45rem]"
          subtitleClassName="max-w-[640px] text-[1.65rem] leading-[1] text-saffron-dark sm:text-[2.25rem]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.72)_49%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.97)_0%,rgba(252,250,246,0.84)_38%,rgba(7,39,34,0.1)_61%,rgba(5,27,24,0.06)_100%)]"
          sideCard={
            <div className="rounded-2xl border border-white/25 bg-canvas/94 p-6 text-jade shadow-editorial-lift backdrop-blur-xl">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Visit card · checked 26 July 2026</p>
              <dl className="mt-5 grid gap-3 text-xs font-bold">
                <div className="flex justify-between gap-4 border-b border-jade/10 pb-3"><dt className="text-charcoal/45">Location</dt><dd className="text-right">MBK · 4F · Zone A</dd></div>
                <div className="flex justify-between gap-4 border-b border-jade/10 pb-3"><dt className="text-charcoal/45">BTS</dt><dd className="text-right">National Stadium</dd></div>
                <div className="flex justify-between gap-4 border-b border-jade/10 pb-3"><dt className="text-charcoal/45">Time</dt><dd className="text-right">Allow 1–2 hours</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-charcoal/45">Choice</dt><dd className="text-right text-saffron-dark">Space · Flight · combo</dd></div>
              </dl>
              <p className="mt-5 text-[10px] font-medium leading-5 text-charcoal/48">Hours, price and inclusions can change by date. Check the exact product before booking and again on your visit day.</p>
            </div>
          }
        />

        <PageSectionNav items={navItems} />

        <section id="choose" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Do not default to the combo" title={<>Three tickets,<br />three expectations</>} />
              <div className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">
                <p>Cave Fantasy is often presented as one attraction, but the important decision is the product. Fantasy Space is a self-paced walk through projected and photo-led worlds. Flight Theater is a shorter motion experience. The combo joins both.</p>
                <p className="mt-4">Decide who you are booking for and how the group responds to motion, darkness, mirrors and sound. Only then open the current ticket page. The most expensive bundle should not make the decision for you.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {ticketChoices.map(({ icon: Icon, label, title, time, bestFor, expectation, check }, index) => (
                <article key={title} className={`overflow-hidden rounded-[26px] border shadow-editorial-card ${index === 2 ? 'border-saffron/30 bg-[#fff4df]' : 'border-jade/10 bg-white'}`}>
                  <div className="bg-jade p-6 text-white">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-white/16 bg-white/8"><Icon size={21} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Choice 0{index + 1}</span></div>
                    <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/48">{label}</p>
                    <h2 className="mt-2 font-display text-[2.4rem] font-semibold leading-none">{title}</h2>
                    <p className="mt-3 text-xs font-bold text-saffron-light">{time}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-medium leading-6 text-charcoal/64">{bestFor}</p>
                    <p className="mt-5 border-l-2 border-saffron/55 pl-4 text-xs font-medium leading-6 text-charcoal/64">{expectation}</p>
                    <p className="mt-5 flex gap-2 text-[10px] font-bold leading-5 text-jade"><BadgeCheck size={16} className="mt-0.5 shrink-0 text-saffron" />{check}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="inside" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
              <div className="relative min-h-[520px] overflow-hidden rounded-[30px] shadow-editorial-lift lg:min-h-[650px]">
                <Image src="/images/redesign/cave-fantasy-interactive.webp" alt="Editorial atmosphere image of a family in an interactive ocean projection" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-jade/78 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">Editorial mood image · not a named room</span>
              </div>
              <div>
                <SectionHeading eyebrow="What is inside?" title={<>A visual world,<br />not a classic museum</>} description="Come for light, motion, mirrors, photography and short interactions—not text panels, a permanent art collection or a long thrill ride." />
                <div className="mt-8 border-y border-jade/10">
                  {[
                    ['Move freely', 'In Fantasy Space, you largely decide how long to spend at each projection or photo point.'],
                    ['Eight zones plus theatre', 'The current combo inclusions list eight themed Fantasy Space zones and Flight Theater separately.'],
                    ['Photos shape the experience', 'Crowds can affect a photo-led attraction more than a conventional museum, so allow people space.'],
                    ['Fit beats a universal score', 'Whether it is worth it depends on expectations, group and ticket choice—not one changing review number.'],
                  ].map(([title, text], index) => (
                    <div key={title} className="grid grid-cols-[38px_1fr] gap-4 border-b border-jade/10 py-5 last:border-0"><span className="text-[10px] font-extrabold text-saffron-dark">0{index + 1}</span><div><h3 className="font-display text-xl font-semibold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">{text}</p></div></div>
                  ))}
                </div>
                <p className="mt-7 text-sm font-medium leading-7 text-charcoal/64">For curatorial context and exhibitions, pair the day with <InlineLink href="/blog/bangkok-art-biennale-2026-angels-mara-guide/">art in Bangkok</InlineLink> or a collecting museum. Cave Fantasy works as compact entertainment between BTS, lunch and Siam.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-[0.48fr_1.52fr]">
              <SectionHeading eyebrow="Compare the right format" title={<>Immersive is<br />not the same as art</>} description="Bangkok uses digital, interactive and immersive for very different experiences. Choose by what you want to do, not the most dramatic search-result image." />
              <div className="border-y border-jade/10">
                {[
                  { tag: 'Photos + entertainment', title: 'Cave Fantasy', text: 'Choose this for a compact walk through projections, mirrors and fantasy worlds, optionally with Flight Theater.', href: '#choose', label: 'Choose a product' },
                  { tag: 'Gallery + context', title: 'BACC', text: 'Choose BACC for exhibitions, artists and a museum-like structure. It is generally free, opens Tuesday–Sunday and closes on Mondays.', href: '/blog/bangkok-art-biennale-2026-angels-mara-guide/', label: 'See art context' },
                  { tag: 'Another digital format', title: 'Space & Time Cube', text: 'Compare location, zone count, ticket format and your actual purpose before booking two similar digital experiences.', href: '/blog/space-time-cube-bangkok-immersive-metaverse-museum-2026/', label: 'Compare experiences' },
                ].map(({ tag, title, text, href, label }) => (
                  <article key={title} className="grid gap-4 border-b border-jade/10 py-7 last:border-0 sm:grid-cols-[170px_1fr_auto] sm:items-start">
                    <div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{tag}</p><h3 className="mt-2 font-display text-2xl font-semibold text-jade">{title}</h3></div>
                    <p className="text-xs font-medium leading-6 text-charcoal/62">{text}</p>
                    <Link href={href} className="inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">{label}<ArrowRight size={13} className="text-saffron" /></Link>
                  </article>
                ))}
              </div>
            </div>

            <aside className="mt-12 grid gap-8 rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card lg:grid-cols-[0.72fr_1.28fr] lg:p-9">
              <div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-jade text-saffron-light"><Camera size={22} /></span><div><p className="eyebrow">Photography without owning the room</p><h2 className="font-display text-[2.2rem] font-semibold leading-[0.95] text-jade">Experience first. Frame second.</h2></div></div>
              <div className="grid gap-5 text-xs font-medium leading-6 text-charcoal/64 sm:grid-cols-2">
                <p><strong className="text-jade">Choose one main image.</strong> Watch how the floor and light move, wait for a naturally clear moment and then continue. Every zone need not become a photo shoot.</p>
                <p><strong className="text-jade">Ask before including others.</strong> Mirrors and wide lenses capture people easily. Do not publish recognisable children outside your group without permission.</p>
                <p><strong className="text-jade">Use the available light.</strong> Flash can flatten projections and disturb others. Clean the lens, lower screen brightness and watch dark floor transitions.</p>
                <p><strong className="text-jade">Know the boundary.</strong> The current listing allows personal photography but not commercial shoots or live broadcasting. Ask before bringing professional equipment.</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="families" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <SectionHeading eyebrow="For families and sensory-sensitive visitors" title={<>Fun begins with<br />the right boundary</>} description="Age alone says little. Dark transitions, mirrors, sound and moving images may feel magical to one child and overwhelming to another." />
                <div className="mt-7 rounded-2xl bg-jade p-6 text-white shadow-editorial-card">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Klook criteria checked 26 July 2026</p>
                  <p className="mt-4 font-display text-2xl font-semibold">Free at 90 cm or below · adult rate from 140 cm · Flight minimum 100 cm</p>
                  <p className="mt-3 text-xs font-medium leading-6 text-white/58">These are current product conditions, not age advice. Recheck the measurement, package and voucher terms.</p>
                </div>
              </div>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {[
                  { icon: Eye, title: 'Look first', text: 'Let a child see the entrance and first projection before rushing forward. Agree that stopping or stepping back is always allowed.' },
                  { icon: HeartPulse, title: 'Decide on Flight separately', text: 'Motion sickness, dizziness or the listed health warnings are reasons not to treat Flight Theater as automatic.' },
                  { icon: Camera, title: 'No photo pressure', text: 'Alternate looking, moving and one chosen photo so the child’s experience stays central.' },
                  { icon: ShieldCheck, title: 'Stay close', text: 'Mirrors and darkness make orientation harder. Stay together and follow staff and floor markings.' },
                  { icon: Clock3, title: 'Pause before fatigue', text: 'Plan food, drinks and toilets outside the attraction before restlessness builds. Food and drinks are not allowed inside.' },
                  { icon: Users, title: 'Check mobility access', text: 'The listing asks wheelchair and mobility-aid users to be accompanied. Ask the venue about the exact route and Flight access.' },
                ].map(({ icon: Icon, title, text }) => (
                  <article key={title} className="border-b border-jade/10 py-6"><Icon size={21} className="text-saffron-dark" /><h3 className="mt-4 font-display text-2xl font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
              <div><p className="eyebrow !text-saffron-light">From platform to projection</p><h2 className="font-display text-[3.4rem] font-semibold leading-[0.9] tracking-[-0.04em]">Three steps. No taxi.</h2></div>
              <p className="max-w-3xl text-sm font-medium leading-7 text-white/65">MBK is one of Bangkok’s easiest indoor attractions to reach by BTS. Use National Stadium as the anchor; Siam also works but adds a walk through the busier shopping district.</p>
            </div>
            <div className="relative mt-12 grid gap-7 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden border-t-2 border-dashed border-saffron/65 lg:block" />
              {[
                { n: '1', icon: TrainFront, title: 'National Stadium W1', text: 'From the Sukhumvit Line, change at Siam and travel one stop on the Silom Line.' },
                { n: '2', icon: Footprints, title: 'Covered connection', text: 'Follow signs towards MBK and use the sheltered connection instead of the busiest street level.' },
                { n: '3', icon: MapPin, title: '4F · Zone A · 4K-103', text: 'Go to floor four and follow the current directory. Verify your admission time at the correct product desk.' },
              ].map(({ n, icon: Icon, title, text }) => (
                <article key={n} className="relative rounded-2xl border border-white/14 bg-white/[0.055] p-7 backdrop-blur-sm"><span className="relative z-10 grid h-20 w-20 place-items-center rounded-full border border-saffron/60 bg-jade text-saffron-light shadow-[0_0_0_8px_rgba(18,77,66,1)]"><Icon size={27} /></span><p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Step 0{n}</p><h3 className="mt-2 font-display text-[1.85rem] font-semibold">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/58">{text}</p></article>
              ))}
            </div>
            <p className="mt-8 max-w-4xl text-sm font-medium leading-7 text-white/62">For transfers and ticket validation, read our <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">Bangkok BTS and MRT guide</InlineLink>. Use a map pin as a final check, not a replacement for the current MBK directory.</p>
          </div>
        </section>

        <section aria-label="Rain-ready Bangkok route" className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="relative min-h-[450px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[390px]">
              <Image src="/images/redesign/cave-fantasy-rain-route.webp" alt="Editorial image of a family following a rain-ready BTS route to a Bangkok mall" fill sizes="100vw" className="object-cover object-[67%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,35,30,0.99)_0%,rgba(5,35,30,0.91)_39%,rgba(5,35,30,0.16)_72%,rgba(5,35,30,0.03)_100%)]" />
              <div className="relative z-10 flex min-h-[450px] max-w-[610px] flex-col justify-center p-7 text-white sm:min-h-[390px] sm:p-12">
                <p className="eyebrow !text-saffron-light">Rain is a reason, not a guarantee</p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em]">Build a day that also works dry.</h2>
                <p className="mt-5 max-w-[530px] text-sm font-medium leading-7 text-white/67">Do not wait for a downpour before checking availability. Travel by BTS and combine Cave Fantasy with BACC, lunch or one unhurried MBK activity.</p>
                <Link href="/city/bangkok/attractions/" className="btn-cream mt-7 w-fit">Compare Bangkok attractions <ArrowRight size={15} className="text-saffron" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="practical" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <SectionHeading eyebrow="Before you pay" title={<>Read the product,<br />not only the photos</>} description="Similar ticket names can hide different inclusions, re-entry and change rules. These six checks matter more than an old fixed price." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  { icon: Ticket, title: 'Exact package', text: 'Does it say Fantasy Space, Flight Theater or combo? Read the zones listed as included.' },
                  { icon: Clock3, title: 'Date + last admission', text: 'Mall hours are not ticket hours. Check validity, time slot and last entry for your date.' },
                  { icon: Users, title: 'Height + rate', text: 'Do not estimate a child’s height. Recheck the free threshold, adult-rate threshold and Flight minimum.' },
                  { icon: HeartPulse, title: 'Motion check', text: 'Read Flight Theater warnings separately. Choose Fantasy Space only when motion does not suit the group.' },
                  { icon: Route, title: 'Re-entry', text: 'The current listing permits Fantasy Space re-entry with proof but not Flight Theater re-entry. Confirm on your voucher.' },
                  { icon: Camera, title: 'Photos + house rules', text: 'Personal photos are allowed; commercial recording and livestreaming are not. Food, drinks and disruptive items stay outside.' },
                ].map(({ icon: Icon, title, text }) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><Icon size={20} className="text-jade" /><h3 className="mt-5 font-display text-[1.45rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
                ))}
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-[28px] border border-saffron/25 bg-[#fff4df] shadow-editorial-card">
              <div className="grid gap-8 p-7 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
                <div><p className="eyebrow">Current-price step</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] text-jade">Search the exact product name first.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/64">The button opens Klook through our affiliate partner. Search for <strong>Cave Fantasy Bangkok</strong>, then verify the date and package. The first activity shown is not guaranteed to be this product.</p></div>
                <div className="lg:self-center lg:justify-self-end">
                  <a href={ticketHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern">Check current tickets at Klook <ExternalLink size={15} className="text-saffron" /></a>
                  <AffiliateDisclosure className="mt-4 max-w-xl">Klook is an affiliate partner. Go2Thailand may earn a commission at no extra cost to you. Check the product name, date, included zones, height criteria, health warnings and conditions before paying.</AffiliateDisclosure>
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-[0.45fr_1.55fr]">
              <div><p className="eyebrow">Choose a day shape</p><h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] text-jade">Cave Fantasy need not become a full day.</h2></div>
              <div className="border-y border-jade/10">
                {[
                  { time: '90 min', title: 'Quick indoor stop', text: 'Travel to National Stadium, choose Fantasy Space and have lunch afterwards. Best when photos and a cool break are the goal.' },
                  { time: 'Half day', title: 'BACC + Cave Fantasy', text: 'Start at BACC when open, pause for food and use Cave Fantasy as a playful contrast. BACC closes on Mondays.' },
                  { time: 'Rain day', title: 'MBK without overplanning', text: 'Combine the experience with lunch and at most one extra MBK activity. Leave room for queues, fatigue and the BTS trip back.' },
                ].map(({ time, title, text }) => (
                  <article key={title} className="grid gap-4 border-b border-jade/10 py-7 last:border-0 sm:grid-cols-[90px_220px_1fr]"><p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{time}</p><h3 className="font-display text-2xl font-semibold text-jade">{title}</h3><p className="text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Exact English PAA questions" title="Cave Fantasy Bangkok questions" description="These questions were captured from current English search results. Answers distinguish current venue facts from changing ticket conditions and avoid fixed prices or ratings." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Build the day around Siam"
          title="See more without crossing Bangkok"
          guides={[
            { title: 'Bangkok attractions', description: 'Compare indoor experiences, temples, viewpoints and markets by time, area and purpose.', href: '/city/bangkok/attractions/', image: '/images/cities/bangkok/redesign/bangkok-attractions-hero.webp' },
            { title: 'Bangkok BTS & MRT', description: 'Plan National Stadium, Siam and your next district without an unnecessary taxi ride.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp' },
            { title: 'Space & Time Cube', description: 'Compare another digital attraction before paying for two similar experiences.', href: '/blog/space-time-cube-bangkok-immersive-metaverse-museum-2026/', image: '/images/blog/space-time-cube-bangkok-immersive-metaverse-museum-2026.webp' },
          ]}
        />

        <SourceMethodSection
          title="An attraction guide stays useful only with a checked date"
          description="Independent English research used three DFS keyword clusters, twelve live SERP sets, exact PAA, ranking and backlink snapshots and three parsed competitors. Current MBK, Klook and BACC sources determine location, format, conditions and comparison. Fixed prices, changing ratings and unsupported superlatives were excluded. Last checked: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
