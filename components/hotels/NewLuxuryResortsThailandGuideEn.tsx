import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  CalendarClock,
  Check,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  Hotel,
  ListChecks,
  MapPin,
  Palmtree,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react';
import { TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/blog/new-luxury-resorts-thailand-2026-marriott-hilton-mercure/';
const PAGE_TITLE = 'New luxury resorts in Thailand: what is actually open in 2026?';
const PAGE_DESCRIPTION = 'Current status of Grand Mercure Krabi, Nivata Koh Samui and JW Marriott Phuket Chalong Bay, with destination and booking checks for 2026.';
const HERO_IMAGE = '/images/redesign/luxury-resorts-thailand-hero.webp';

const navItems: PageSectionNavItem[] = [
  { href: '#status', label: 'Current status', icon: BadgeCheck },
  { href: '#hotels', label: 'Three hotels', icon: Hotel },
  { href: '#location', label: 'Choose a coast', icon: MapPin },
  { href: '#booking', label: 'Booking checks', icon: ListChecks },
  { href: '#alternatives', label: 'Stay now', icon: BedDouble },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

interface ResortStatus {
  name: string;
  destination: string;
  state: string;
  date: string;
  statusClass: string;
  icon: LucideIcon;
  verdict: string;
  officialFacts: string[];
  locationFit: string;
  verify: string;
}

const resortStatuses: ResortStatus[] = [
  {
    name: 'Grand Mercure Krabi Ao Nang',
    destination: 'Ao Nang · Krabi',
    state: 'Open',
    date: 'bookable in July 2026',
    statusClass: 'border-jade/20 bg-jade text-white',
    icon: BadgeCheck,
    verdict: 'This is no longer a future opening. Accor shows a live booking module, room categories, services and recent verified-stay feedback.',
    officialFacts: ['two pools, including a children’s pool', 'Kids Club and fitness centre', 'restaurants and a rooftop bar', '9-9 Moo 2 in Ao Nang'],
    locationFit: 'For travellers who want a relatively practical base for the beach, restaurants and Krabi excursions.',
    verify: 'Check the exact room, recent operational feedback, taxes, transfer and change conditions for your dates.',
  },
  {
    name: 'Nivata Koh Samui, Tapestry Collection by Hilton',
    destination: 'Taling Ngam · Koh Samui',
    state: 'Planned',
    date: 'October 2026 · not bookable yet',
    statusClass: 'border-saffron/30 bg-[#fff1d9] text-jade',
    icon: Clock3,
    verdict: 'Hilton’s English hotel page currently says October 2026, but also says reservations are not yet accepted. A hotel page is not the same as a confirmed room.',
    officialFacts: ['55 rooms across two floors', 'three restaurants', 'lazy pool and infinity pool', 'south-western tip of Koh Samui'],
    locationFit: 'For a quiet, sunset-facing resort stay away from Chaweng; less convenient when nightlife and walkable choice are priorities.',
    verify: 'Wait for a real room with a rate and conditions. Do not lock flights around an announced month alone.',
  },
  {
    name: 'JW Marriott Phuket Chalong Bay Resort & Spa',
    destination: 'Chalong Bay · Phuket',
    state: 'Postponed',
    date: 'Q4 2027 in Marriott’s list',
    statusClass: 'border-charcoal/12 bg-white text-jade',
    icon: CalendarClock,
    verdict: 'This name should not sit in a list of bookable 2026 openings. Marriott’s current portfolio page places the project in Q4 2027.',
    officialFacts: ['165 guestrooms in the current opening list', 'Chalong Bay as the announced location', 'no normal 2026 inventory for this property', 'the schedule may move again'],
    locationFit: 'Potentially relevant for south-east Phuket and Chalong Pier in a later year, but not a concrete 2026 choice.',
    verify: 'Choose an existing hotel for 2026. For a later trip, recheck the opening list and actual room inventory.',
  },
];

const bookingChecks: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Hotel, title: 'Exact property', text: 'Match the full name and address. Phuket already has a JW Marriott in Mai Khao; it is not the announced Chalong project.' },
  { icon: CalendarClock, title: 'A real bookable night', text: 'A press release, brand page or expected opening month is not a reservation. Search your exact check-in and check-out dates.' },
  { icon: Eye, title: 'Recent operating signals', text: 'Read the newest stay reports and check whether pools, restaurants, construction zones and beach access are actually operating.' },
  { icon: MapPin, title: 'Location before logo', text: 'Measure the route to beach, pier, restaurants and airport. The same brand name tells you nothing about daily travel time.' },
  { icon: RefreshCcw, title: 'Changeable conditions', text: 'Around a new opening, favour a rate you can change if construction or the opening schedule shifts.' },
  { icon: ShieldCheck, title: 'Complete current price', text: 'Check taxes, breakfast, transfer, extra beds, deposits and the cancellation deadline before choosing the cheapest card.' },
];

// Questions are copied verbatim from English DataForSEO PAA captures dated 26 July 2026.
const faqs = [
  { question: 'Where is the most luxurious place in Thailand?', answer: 'There is no single objectively most luxurious place. Phuket and Koh Samui offer a deep resort choice, while Krabi combines dramatic scenery with several high-end coastal stays. Choose by coast, season, transfer and the kind of days you want—not a destination label alone.' },
  { question: 'What is the new hotel in Bangkok 2026?', answer: 'Several Bangkok properties may be described as new in 2026, so the question needs a brand, neighbourhood and verified opening date. This owner focuses on three southern resort projects; use a current Bangkok hotel comparison rather than transferring these coastal claims to the capital.' },
  { question: 'Is Thailand still worth visiting in 2026?', answer: 'Thailand can still be a strong trip in 2026 when the destination, season, transport and hotel fit your priorities. A new resort is not required for a good visit. Compare the whole stay and current conditions instead of treating one opening as the reason to travel.' },
  { question: 'What is the new hotel in Phuket 2026?', answer: 'There is no single answer. Some search results mix genuinely new, remodelled, renamed and future hotels. JW Marriott Phuket Chalong Bay is not a bookable 2026 opening: Marriott currently lists it for Q4 2027. Verify every named property separately.' },
  { question: 'Is there a posh part of Thailand?', answer: 'Luxury stays appear across Thailand rather than in one official “posh” district. Phuket and Koh Samui have established resort zones; Krabi has high-end beach properties; Bangkok has urban luxury. The useful question is which area matches your beach, dining and transport needs.' },
  { question: 'What is the best 5 star resort in Thailand?', answer: 'No resort is universally best. A secluded villa can be ideal for privacy and poor for walkable dining; a central Ao Nang hotel can be practical and less secluded. Compare location, room, operational facilities, recent feedback, complete price and cancellation conditions.' },
  { question: 'What hotels are opening in 2026?', answer: 'Opening lists change throughout the year. In this tracked set, Hilton currently describes Nivata Koh Samui as an October 2026 opening that is not yet accepting reservations. Grand Mercure Krabi is already operating, while JW Marriott Phuket Chalong Bay moved to Q4 2027.' },
  { question: 'What are the newest hotels in Bangkok?', answer: 'The answer changes whenever a hotel opens, relaunches or rebrands. Use an updated Bangkok-only hotel owner and confirm a live booking date; do not rely on a national 2026 roundup for a complete current list of the capital.' },
  { question: 'Which is the best island in Thailand 2026?', answer: 'The best island depends on timing and trip style. Koh Samui can suit a resort-led Gulf stay, while Phuket offers more geographic and hotel variety. Krabi is a mainland province with island access. Compare seasonal pattern and daily route before choosing.' },
  { question: 'Should I go to Phuket or Koh Samui?', answer: 'Choose Phuket for a larger island with more distinct coast zones and broad activity choice. Choose Koh Samui for a smaller island rhythm and resort areas such as Taling Ngam, Bophut, Lamai or Chaweng. Your travel month matters because their rainfall patterns differ.' },
  { question: 'Where is it better to stay in Koh Samui?', answer: 'Taling Ngam suits quiet sunset-facing resort time; Bophut balances dining and atmosphere; Lamai is livelier but more compact; Chaweng has the largest concentration of nightlife and services. Nivata’s planned location fits the first profile, not all Samui trips.' },
  { question: 'Which part of Koh Samui is the nicest?', answer: '“Nicest” depends on whether you value quiet, beach character, dining or nightlife. Taling Ngam is peaceful and remote, Bophut is convenient for restaurants, Lamai mixes beach and town, and Chaweng is busiest. Map the places you will use every day.' },
];

const sources = [
  { title: 'Marriott New Hotel Openings', creator: 'Marriott International', url: 'https://www.marriott.com/en-us/marriott-brands/portfolio/openings.mi', note: 'Current portfolio source listing JW Marriott Phuket Chalong Bay Resort & Spa for Q4 2027 with 165 guestrooms.' },
  { title: 'Nivata Koh Samui, Tapestry Collection by Hilton', creator: 'Hilton', url: 'https://www.hilton.com/en/hotels/usmupup-nivata-koh-samui/', note: 'Current English hotel page showing October 2026, no reservations yet, the Taling Ngam location, room count and facilities.' },
  { title: 'Grand Mercure Krabi Ao Nang', creator: 'Accor / ALL', url: 'https://all.accor.com/hotel/B6F7/index.en.shtml', note: 'Operational hotel page with booking module, address, room categories, services and recent verified-stay feedback.' },
  { title: 'Thailand’s anticipated luxury openings', creator: 'Sawasdee / Thai Airways', url: 'https://sawasdee.thaiairways.com/thailands-5-most-anticipated-luxury-openings-in-2026-and-beyond/', note: 'DFS-parsed English competitor used for opening-roundup coverage and claims analysis.' },
  { title: 'New hotels in Koh Samui', creator: 'iTravelBlog', url: 'https://en.itravelblog.net/new-hotels-in-koh-samui/', note: 'DFS-parsed English competitor used for island-opening breadth, not as the source of record for property status.' },
  { title: 'New hotels in Phuket', creator: 'TurPotok', url: 'https://turpotok.com/phuket-new-hotels/', note: 'DFS-parsed English competitor used to examine list format, breadth and freshness risk.' },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-23', dateModified: '2026-07-26',
      inLanguage: 'en', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Status of three announced luxury resorts in Thailand',
      itemListElement: resortStatuses.map((resort, index) => ({ '@type': 'ListItem', position: index + 1, name: resort.name, description: `${resort.state}: ${resort.date}. ${resort.verdict}` })),
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Hotels', item: 'https://go2-thailand.com/top-10/hotels/' },
        { '@type': 'ListItem', position: 3, name: 'New luxury resorts in Thailand', item: PAGE_URL },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to verify a new resort before booking', step: bookingChecks.map((check, index) => ({ '@type': 'HowToStep', position: index + 1, name: check.title, text: check.text })) },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function NewLuxuryResortsThailandGuideEn() {
  const subId = useSubId();
  const tripHeroHref = withPlacementSubId(TRIP_GENERIC, subId, 'luxury-resorts-hero-en');
  const tripKrabiHref = withPlacementSubId(TRIP_GENERIC, subId, 'luxury-resorts-krabi-en');
  const tripSamuiHref = withPlacementSubId(TRIP_GENERIC, subId, 'luxury-resorts-samui-en');
  const tripPhuketHref = withPlacementSubId(TRIP_GENERIC, subId, 'luxury-resorts-phuket-en');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="new luxury resorts thailand 2026, new hotels thailand 2026, luxury resorts thailand, new resorts phuket, new hotels koh samui, new hotels krabi" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-23" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Three headlines · three different realities"
          title={<>New luxury<br />resorts.</>}
          subtitle="Open, planned or postponed?"
          description="Grand Mercure Krabi, Nivata Koh Samui and JW Marriott Phuket Chalong Bay—checked against current brand pages before you choose a coast."
          image={HERO_IMAGE}
          imageAlt="Editorial destination image of a contemporary Thai resort facing a tropical bay"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Hotels', href: '/top-10/hotels/' }, { label: 'New resorts' }]}
          actions={[
            { label: 'See the current status', href: '#status', kind: 'primary' },
            { label: 'Check current prices at Trip.com', href: tripHeroHref, kind: 'secondary', newTab: true, affiliate: true },
          ]}
          disclosure="Trip.com is an affiliate partner. We may earn a commission at no extra cost to you; verify the exact property, dates, room, taxes and conditions."
          minHeightClassName="min-h-[860px] lg:min-h-[730px]"
          contentClassName="max-w-[730px]"
          titleClassName="max-w-[730px] text-[3.9rem] leading-[0.84] sm:text-[5rem] lg:text-[5.45rem]"
          subtitleClassName="max-w-[690px] text-[1.65rem] leading-[1] text-saffron-dark sm:text-[2.25rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.04)_0%,rgba(252,250,246,0.76)_50%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.88)_39%,rgba(6,36,31,0.13)_64%,rgba(6,36,31,0.04)_100%)]"
          sideCard={
            <div className="rounded-2xl border border-white/30 bg-canvas/94 p-6 text-jade shadow-editorial-lift backdrop-blur-xl">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Status card · 26 July 2026</p>
              <div className="mt-5 space-y-4">
                {[['Open', 'Grand Mercure Krabi'], ['Not bookable', 'Nivata Koh Samui'], ['Q4 2027', 'JW Marriott Chalong']].map(([state, hotel], index) => (
                  <div key={hotel} className="grid grid-cols-[32px_1fr] gap-3 border-b border-jade/10 pb-4 last:border-0 last:pb-0"><span className={`mt-0.5 h-3 w-3 rounded-full ${index === 0 ? 'bg-jade' : index === 1 ? 'bg-saffron' : 'bg-charcoal/28'}`} /><div><p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-charcoal/42">{state}</p><p className="mt-1 text-xs font-extrabold">{hotel}</p></div></div>
                ))}
              </div>
              <p className="mt-5 text-[10px] font-medium leading-5 text-charcoal/48">A published month is planning. A room for your exact dates is booking evidence.</p>
            </div>
          }
        />

        <PageSectionNav items={navItems} />

        <section id="status" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.52fr_1.48fr] lg:items-end">
              <SectionHeading eyebrow="A simple evidence ladder" title={<>Announcement.<br />Hotel page.<br />Bookable room.</>} />
              <div className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66"><p>New-hotel roundups age faster than destination guides. A launch article can remain indexed after a project moves, changes size or quietly becomes operational. We therefore separate three evidence levels.</p><p className="mt-4">Brand pages establish the current public plan. A functioning booking path, exact dates, room type and conditions establish whether you can use that plan. The status below was rechecked on 26 July 2026.</p></div>
            </div>

            <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-[9%] right-[9%] top-9 hidden border-t-2 border-dashed border-saffron/60 lg:block" />
              {[
                { n: '1', icon: Sparkles, title: 'Announcement', text: 'Useful for a project name and ambition. Weak proof for dates, room inventory or finished facilities.' },
                { n: '2', icon: Hotel, title: 'Official hotel page', text: 'Stronger evidence for address, room count, facilities and current brand wording. It may still say “not accepting reservations”.' },
                { n: '3', icon: BadgeCheck, title: 'Room for your dates', text: 'The practical test: exact property, dates, room, complete price and cancellation conditions can be selected.' },
              ].map(({ n, icon: Icon, title, text }) => (
                <article key={title} className="relative rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><span className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-saffron/45 bg-canvas text-jade shadow-[0_0_0_7px_rgba(252,250,246,1)]"><Icon size={23} /></span><p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Evidence 0{n}</p><h2 className="mt-2 font-display text-[1.9rem] font-semibold text-jade">{title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="hotels" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Status before superlatives" title="Three resort names, three different booking decisions" description="The list is deliberately short. Its purpose is not to manufacture a top ten, but to correct three opening claims and show how to verify the next one." />
            <div className="mt-11 space-y-6">
              {resortStatuses.map((resort, index) => {
                const statusImages = ['/images/redesign/luxury-resorts-krabi.webp', '/images/redesign/koh-samui-hotels-hero.webp', '/images/redesign/phuket-hotels-hero.webp'];
                const Icon = resort.icon;
                return (
                  <article key={resort.name} className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card">
                    <div className="grid lg:grid-cols-[0.44fr_1.56fr]">
                      <div className="relative min-h-[290px] lg:min-h-[410px]"><Image src={statusImages[index]} alt={`Editorial destination image for ${resort.destination}`} fill sizes="(max-width: 1024px) 100vw, 32vw" className="object-cover" /><div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-jade/82 text-saffron-light backdrop-blur"><Icon size={21} /></div></div>
                      <div className="p-7 lg:p-10">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="eyebrow">{resort.destination}</p><h2 className="max-w-3xl font-display text-[2.45rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">{resort.name}</h2></div><span className={`shrink-0 rounded-full border px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.13em] ${resort.statusClass}`}>{resort.date}</span></div>
                        <p className="mt-6 max-w-4xl text-sm font-semibold leading-7 text-charcoal/72">{resort.verdict}</p>
                        <div className="mt-7 grid gap-7 md:grid-cols-2"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Visible in the official source</p><ul className="mt-4 space-y-3">{resort.officialFacts.map((fact) => <li key={fact} className="flex gap-3 text-xs font-medium leading-5 text-charcoal/66"><Check size={15} className="mt-0.5 shrink-0 text-jade" />{fact}</li>)}</ul></div><div className="rounded-2xl bg-canvas p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Trip fit</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/68">{resort.locationFit}</p><p className="mt-4 border-t border-jade/10 pt-4 text-[11px] font-semibold leading-5 text-jade"><strong>Before booking:</strong> {resort.verify}</p></div></div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="location" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="The logo does not sleep for you" title={<>Choose the coast<br />before the room</>} description={<>A beautiful resort can still sit on the wrong side of an island. Compare the daily route before room categories. Use our destination guides for <InlineLink href="/city/krabi/">Krabi</InlineLink>, <InlineLink href="/city/koh-samui/">Koh Samui</InlineLink> and <InlineLink href="/city/phuket/">Phuket</InlineLink>.</>} />
              <div className="overflow-x-auto rounded-[26px] border border-jade/10 bg-white shadow-editorial-card">
                <table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-jade text-white"><tr><th className="p-5">Question</th><th className="p-5">Ao Nang</th><th className="p-5">Taling Ngam</th><th className="p-5">Chalong Bay</th></tr></thead><tbody className="divide-y divide-jade/10 text-charcoal/67"><tr><th className="p-5 font-extrabold text-jade">Character</th><td className="p-5">Active coastal base</td><td className="p-5">Quiet south-west coast</td><td className="p-5">Pier and residential zone</td></tr><tr><th className="p-5 font-extrabold text-jade">Strong for</th><td className="p-5">Restaurants + excursions</td><td className="p-5">Resort time + sunset</td><td className="p-5">Pier + south-east Phuket</td></tr><tr><th className="p-5 font-extrabold text-jade">Without a car</th><td className="p-5">Relatively practical centrally</td><td className="p-5">More taxis or transfers</td><td className="p-5">Depends on exact location</td></tr><tr><th className="p-5 font-extrabold text-jade">This owner</th><td className="p-5 font-bold text-jade">Hotel open</td><td className="p-5 font-bold text-saffron-dark">Not bookable yet</td><td className="p-5 font-bold text-charcoal/55">Project for 2027</td></tr></tbody></table>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { icon: Waves, eyebrow: 'Andaman coast', title: 'Ao Nang for an active base', text: 'Walkability varies by street, but the town clusters many restaurants, tours and transfers. Check the real route to beach and pier.' },
                { icon: Palmtree, eyebrow: 'Gulf of Thailand', title: 'Taling Ngam for slowing down', text: 'The south-west feels quieter than Chaweng. That helps a resort-led stay and limits spontaneous off-property choice.' },
                { icon: MapPin, eyebrow: 'South-east Phuket', title: 'Chalong is not Mai Khao', text: 'Do not confuse the future Chalong property with the existing JW Marriott Phuket Resort & Spa on the north-west coast.' },
              ].map(({ icon: Icon, eyebrow, title, text }) => (
                <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={22} className="text-jade" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{eyebrow}</p><h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="From announcement to booking" className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="relative min-h-[430px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[380px]">
              <Image src="/images/redesign/luxury-resorts-verify-banner.webp" alt="Traveller verifies a hotel reservation at sunset on Koh Samui" fill sizes="100vw" className="object-cover object-[68%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,35,30,0.98)_0%,rgba(6,35,30,0.88)_38%,rgba(6,35,30,0.16)_72%,rgba(6,35,30,0.04)_100%)]" />
              <div className="relative z-10 flex min-h-[430px] max-w-[610px] flex-col justify-center p-7 text-white sm:min-h-[380px] sm:p-12"><p className="eyebrow !text-saffron-light">Announcement ≠ arrival</p><h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em]">Book the room that exists.</h2><p className="mt-5 max-w-[520px] text-sm font-medium leading-7 text-white/67">A press release sells a future. Your reservation needs an exact property, date, room and cancellation rule. Only then build flights and transfers around a new opening.</p><a href="#booking" className="btn-cream mt-7 w-fit">Use the six checks <ArrowRight size={15} className="text-saffron" /></a></div>
            </div>
          </div>
        </section>

        <section id="booking" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-end"><SectionHeading eyebrow="Six checks before payment" title={<>New hotel.<br />Established discipline.</>} description="Opening status is only the first check. Use the same sequence for every new or recently opened resort, even when an OTA already shows an attractive card." /><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Uncertainty is not automatically a reason to avoid a new hotel. It is a reason to value flexibility more highly. A changeable rate can be rationally better than a non-refundable “deal” around a moving launch.</p></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {bookingChecks.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className={`flex min-h-[285px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/35 bg-[#fff2de] shadow-editorial-card' : 'border-jade/10 bg-white'}`}><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-jade/10 bg-canvas text-jade"><Icon size={20} strokeWidth={1.45} /></span><span className="text-[10px] font-extrabold text-saffron-dark">0{index + 1}</span></div><h3 className="mt-7 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="alternatives" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Do not wait for one brand" title="Compare what is actually available for your dates" description={<>A delayed or unopened resort need not remove the destination. Start with the correct coast and compare existing hotels there. Our <InlineLink href="/blog/best-time-to-visit-thailand/">best time to visit Thailand guide</InlineLink> keeps Samui and the Andaman coast out of one blanket season.</>} />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                { image: '/images/redesign/krabi-destination-hero.webp', eyebrow: 'Open now', title: 'Krabi & Ao Nang', text: 'Compare Ao Nang, quieter coastal areas and the route to your excursions.', href: tripKrabiHref, internal: '/best-hotels/krabi/' },
                { image: '/images/redesign/koh-samui-hotels-hero.webp', eyebrow: 'Not dependent on Nivata', title: 'Koh Samui', text: 'Compare Taling Ngam with Bophut, Lamai and Chaweng for everyday trip fit.', href: tripSamuiHref, internal: '/best-hotels/koh-samui/' },
                { image: '/images/redesign/phuket-hotels-hero.webp', eyebrow: 'Chalong project later', title: 'Phuket', text: 'Choose an existing hotel by coast, beach and journey time—not the future name.', href: tripPhuketHref, internal: '/best-hotels/phuket/' },
              ].map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-52 overflow-hidden"><Image src={item.image} alt={`Editorial hotel destination image for ${item.title}`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /></div><div className="p-6"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{item.eyebrow}</p><h3 className="mt-2 font-display text-[1.9rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p><div className="mt-6 flex flex-wrap items-center gap-4"><Link href={item.internal} className="inline-flex items-center gap-2 text-xs font-extrabold text-jade">Read the hotel guide <ArrowRight size={14} className="text-saffron" /></Link><a href={item.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">Check current price at Trip.com <ExternalLink size={13} /></a></div></div></article>
              ))}
            </div>
            <AffiliateDisclosure className="mt-3">The current-price links are Trip.com affiliate links. Go2Thailand may earn a commission at no extra cost to you. Check the exact property, dates, room, taxes, opening status, recent feedback and cancellation conditions.</AffiliateDisclosure>

            <div className="mt-12 grid gap-8 rounded-[26px] border border-jade/10 bg-jade p-7 text-white shadow-editorial-lift lg:grid-cols-[0.8fr_1.2fr] lg:p-11"><div><p className="eyebrow !text-saffron-light">Amazon OneLink check</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92]">No product belongs in this decision.</h2></div><div className="lg:justify-self-end"><p className="max-w-3xl text-sm font-medium leading-7 text-white/66">This page solves hotel-status and booking uncertainty. An adapter, power bank or beach item does not improve that decision. Amazon remains reserved for pages where a physical product solves a real travel or cooking task.</p><p className="mt-4 text-xs font-semibold text-saffron-light">Commercial relevance before affiliate density.</p></div></div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Exact questions from English search results" title="Questions about new luxury resorts in Thailand" description="Answers separate status checked on 26 July 2026 from planning and destination advice. Openings and availability change; verify again before booking." items={faqs} />

        <RelatedGuidesSection eyebrow="Keep choosing" title="Turn hotel news into a complete stay decision" guides={[
          { title: 'Hotels in Phuket', description: 'Choose a coast first, then compare hotels that are genuinely open for your dates.', href: '/best-hotels/phuket/', image: '/images/redesign/phuket-hotels-hero.webp' },
          { title: 'Hotels in Koh Samui', description: 'Compare quiet and lively island areas before falling for one resort name.', href: '/best-hotels/koh-samui/', image: '/images/redesign/koh-samui-hotels-hero.webp' },
          { title: 'Hotels in Krabi', description: 'Set Ao Nang, Railay and quieter coast zones against your excursion and beach plan.', href: '/best-hotels/krabi/', image: '/images/redesign/krabi-destination-hero.webp' },
        ]} />

        <SourceMethodSection title="Every opening list needs a checked date" description="Independent English research used four DFS clusters, twelve live SERPs, exact PAA, ranking and backlink snapshots and three successful competitor parses; two blocked parses are retained transparently. Current brand pages determine hotel status and core facts. Announcements are planning, official hotel pages are evidence, and a real room for exact dates is the booking test. Last checked: 26 July 2026." sources={sources} />
      </div>
    </>
  );
}
