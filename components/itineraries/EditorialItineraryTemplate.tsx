import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface ItineraryDay {
  day: string;
  base: string;
  title: string;
  theme: string;
  morning: string;
  main: string;
  evening: string;
  decision: string;
  icon: LucideIcon;
  tone?: 'dark' | 'light';
}

export interface EditorialItineraryData {
  pageUrl: string;
  updatedAt: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  heroEyebrow: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  heroDescription: string;
  ticketHref: string;
  navItems: PageSectionNavItem[];
  bases: Array<{ order: string; title: string; nights: string; role: string; href: string; icon: LucideIcon }>;
  days: ItineraryDay[];
  flexCards: Array<{ eyebrow: string; title: string; copy: string; rule: string; icon: LucideIcon; tone?: 'dark' | 'light' }>;
  handoffs: Array<{ label: string; title: string; copy: string; icon: LucideIcon }>;
  practicalCards: Array<{ title: string; copy: string; href: string; label: string; icon: LucideIcon }>;
  bookingCards: Array<{ title: string; copy: string; href: string; label: string; icon: LucideIcon; affiliate?: boolean }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
}

function createSchemas(data: EditorialItineraryData) {
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: data.title, description: data.description, url: data.pageUrl, image: `https://go2-thailand.com${data.heroImage}`, inLanguage: 'en-GB', dateModified: data.updatedAt, author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: data.breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: item.href ? `https://go2-thailand.com${item.href}` : data.pageUrl })) },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Seven-day Phuket, Phi Phi and Krabi itinerary', numberOfItems: data.days.length, itemListElement: data.days.map((day, index) => ({ '@type': 'ListItem', position: index + 1, name: `Day ${day.day}: ${day.title}`, description: day.main })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];
}

export function EditorialItineraryTemplate({ data }: { data: EditorialItineraryData }) {
  return (
    <div className="bg-canvas" data-premium-template="editorial-itinerary-en">
      <SEOHead title={data.title} description={data.description} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        {createSchemas(data).map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>
      <EditorialHero image={data.heroImage} imageAlt={data.heroAlt} breadcrumbs={data.breadcrumbs} eyebrow={data.heroEyebrow} title={data.heroTitle} subtitle={data.heroSubtitle} description={data.heroDescription} actions={[{ label: 'See the seven days', href: '#days', kind: 'primary' }, { label: 'Check current route tickets', href: data.ticketHref, kind: 'secondary', newTab: true, affiliate: true }]} disclosure="The ticket link is sponsored. We may earn a commission at no extra cost to you. Check the current operator, pier, luggage, total and cancellation conditions for every segment." minHeightClassName="min-h-[760px] lg:min-h-[700px]" titleClassName="max-w-[830px] text-[3.75rem] leading-[0.86] sm:text-[4.9rem] lg:text-[5.7rem]" contentClassName="max-w-[760px]" imageClassName="object-cover object-[72%_center] lg:object-center" />
      <PageSectionNav label="On this seven-day itinerary" items={data.navItems} />

      <section id="route" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><div><SectionHeading eyebrow="Three bases · two moves" title={<>A clean west-coast line.<br />No backtracking.</>} description="Start where flight inventory is broad, sleep on the island that deserves more than a day trip, then finish near Krabi’s land and sea options with departure margin." /><svg aria-hidden="true" viewBox="0 0 360 120" className="mt-8 hidden h-28 w-full max-w-sm text-saffron lg:block"><path d="M12 78 C78 20 112 110 180 57 S278 30 346 79" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="12" cy="78" r="5" fill="currentColor" /><circle cx="180" cy="57" r="5" fill="currentColor" /><circle cx="346" cy="79" r="5" fill="currentColor" /></svg></div><div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-3">{data.bases.map(({ order, title, nights, role, href, icon: Icon }, index) => <article key={title} className={`flex min-h-[300px] flex-col p-7 ${index === 1 ? 'bg-jade text-white' : index === 2 ? 'bg-tonal' : 'bg-white'}`}><div className="flex items-center justify-between"><Icon size={24} className={index === 1 ? 'text-saffron-light' : 'text-jade'} /><span className={`font-display text-[2rem] font-semibold ${index === 1 ? 'text-white/24' : 'text-jade/18'}`}>{order}</span></div><h2 className={`mt-7 font-display text-[1.9rem] font-semibold leading-none ${index === 1 ? 'text-white' : 'text-jade'}`}>{title}</h2><p className={`mt-2 text-[9px] font-extrabold uppercase tracking-[.14em] ${index === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{nights}</p><p className={`mt-5 flex-1 text-xs font-medium leading-6 ${index === 1 ? 'text-white/62' : 'text-charcoal/62'}`}>{role}</p><Link href={href} className={`mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold ${index === 1 ? 'text-saffron-light' : 'text-jade'}`}>Open destination <ArrowRight size={12} /></Link></article>)}</div></div></section>

      <section id="days" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Day by day" title={<>Seven days.<br />Only two hotel moves.</>} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">Each card gives the day a job rather than an hour-by-hour promise. Use live opening, weather, transfer and tour details when assigning the exact activity.</p></div><div className="relative mt-12 grid gap-5 lg:grid-cols-2"><div aria-hidden="true" className="absolute bottom-8 left-[27px] top-8 hidden border-l-2 border-dotted border-saffron/50 lg:block" />{data.days.map(({ day, base, title, theme, morning, main, evening, decision, icon: Icon, tone }) => { const dark = tone === 'dark'; return <article key={day} className={`relative rounded-[24px] border p-7 shadow-editorial-card lg:ml-14 ${dark ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-jade'}`}><span className={`absolute -left-[70px] top-7 hidden h-14 w-14 place-items-center rounded-full border-4 border-tonal font-display text-[1.35rem] font-semibold lg:grid ${dark ? 'bg-saffron text-jade' : 'bg-jade text-white'}`}>{day}</span><div className="flex items-center justify-between"><Icon size={24} className={dark ? 'text-saffron-light' : 'text-jade'} /><p className={`text-[9px] font-extrabold uppercase tracking-[.14em] ${dark ? 'text-saffron-light' : 'text-saffron-dark'}`}>{base}</p></div><h2 className="mt-6 font-display text-[2rem] font-semibold leading-none">{title}</h2><p className={`mt-2 text-[10px] font-extrabold uppercase tracking-[.1em] ${dark ? 'text-white/42' : 'text-jade/46'}`}>{theme}</p><dl className="mt-6 grid gap-4 text-xs leading-6 sm:grid-cols-3"><div><dt className="font-extrabold">Start</dt><dd className={dark ? 'mt-1 text-white/60' : 'mt-1 text-charcoal/62'}>{morning}</dd></div><div><dt className="font-extrabold">Core</dt><dd className={dark ? 'mt-1 text-white/60' : 'mt-1 text-charcoal/62'}>{main}</dd></div><div><dt className="font-extrabold">Close</dt><dd className={dark ? 'mt-1 text-white/60' : 'mt-1 text-charcoal/62'}>{evening}</dd></div></dl><p className={`mt-6 border-t pt-4 text-[10px] font-extrabold leading-5 ${dark ? 'border-white/12 text-saffron-light' : 'border-jade/10 text-saffron-dark'}`}>Decision: {decision}</p></article>; })}</div></div></section>

      <section id="flex" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><SectionHeading eyebrow="Day six flexes" title={<>Let conditions choose<br />sea or land.</>} /><p className="text-sm font-medium leading-7 text-charcoal/64">Do not lock every day to a boat before the forecast exists. Day six is intentionally flexible so the route survives rough water, tired travellers or a changed park/tour status.</p></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{data.flexCards.map(({ eyebrow, title, copy, rule, icon: Icon, tone }, index) => { const dark = tone === 'dark' || index === 2; return <article key={title} className={`flex min-h-[300px] flex-col rounded-2xl border p-7 ${dark ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-jade'}`}><Icon size={25} className={dark ? 'text-saffron-light' : 'text-jade'} /><p className={`mt-7 text-[9px] font-extrabold uppercase tracking-[.14em] ${dark ? 'text-saffron-light' : 'text-saffron-dark'}`}>{eyebrow}</p><h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-none">{title}</h3><p className={`mt-5 flex-1 text-xs font-medium leading-6 ${dark ? 'text-white/62' : 'text-charcoal/62'}`}>{copy}</p><p className={`mt-5 border-t pt-4 text-[10px] font-extrabold leading-5 ${dark ? 'border-white/12 text-saffron-light' : 'border-jade/10 text-jade'}`}>{rule}</p></article>; })}</div></div></section>

      <section id="handoffs" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><div><p className="eyebrow !text-saffron-light">Protect the transfers</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9]">Three handoffs<br />worth mapping.</h2><p className="mt-6 text-sm font-medium leading-7 text-white/64">Your ticket is authoritative. Phuket, Phi Phi and Krabi each have multiple pickup or arrival contexts; never plan from city names alone.</p></div><div className="grid gap-4 sm:grid-cols-3">{data.handoffs.map(({ label, title, copy, icon: Icon }) => <article key={label} className="rounded-2xl border border-white/13 bg-white/[.065] p-6"><div className="flex items-center justify-between"><Icon size={24} className="text-saffron-light" /><span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-light">{label}</span></div><h3 className="mt-6 font-display text-[1.55rem] font-semibold">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/62">{copy}</p></article>)}</div></div></section>

      <section id="prepare" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><SectionHeading eyebrow="Before locking the week" title={<>Three checks.<br />Then book.</>} description="The page stays useful by sending changeable details to their proper live owners rather than repeating fixed prices and schedules." /><div className="grid gap-4 sm:grid-cols-3">{data.practicalCards.map(({ title, copy, href, label, icon: Icon }) => <article key={title} className="flex min-h-[260px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={24} className="text-jade" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p><Link href={href} className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">{label} <ArrowRight size={12} /></Link></article>)}</div></div></section>

      <section id="book" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Current inventory" title={<>Book in route order.<br />Keep day six flexible.</>} /><p className="text-sm font-medium leading-7 text-charcoal/64">Secure the two inter-base transfers and the three accommodation bases before optional boat tours. Compare current totals and cancellation terms rather than legacy example prices.</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{data.bookingCards.map(({ title, copy, href, label, icon: Icon, affiliate }) => <article key={title} className="flex min-h-[285px] flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><Icon size={25} className="text-jade" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p>{affiliate ? <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">{label} <ExternalLink size={13} /></a> : <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label} <ArrowRight size={13} /></Link>}</article>)}</div><AffiliateDisclosure className="mt-4">Sponsored providers show current commercial inventory. We do not set fares, room prices, tour inclusions, operators, piers, luggage or cancellation conditions.</AffiliateDisclosure></div></section>

      <FaqSplitSection id="questions" eyebrow="Genuine search questions" title="Seven-day Phuket and Krabi questions" description="Captured from ten live UK-English SERPs and answered without fixed fares, transfer durations or guaranteed weather." items={data.faqs} />
      <RelatedGuidesSection eyebrow="Continue planning" title="Know the owners behind the route" readLabel="Open the guide" guides={data.related} />
      <SourceMethodSection eyebrow="Sources & method" title="A route, not an invented timetable" description={data.methodDescription} sources={data.sources} />
    </div>
  );
}
