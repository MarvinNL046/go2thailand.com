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

interface IslandRegion {
  eyebrow: string;
  title: string;
  description: string;
  gateway: string;
  stops: Array<{ label: string; href: string }>;
  strongFor: string;
  watch: string;
  icon: LucideIcon;
  tone: 'dark' | 'light';
}

export interface IslandHoppingPlannerData {
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
  decisionTitle: ReactNode;
  decisionDescription: string;
  decisionCards: Array<{ number: string; title: string; copy: string; icon: LucideIcon }>;
  regions: IslandRegion[];
  pacePlans: Array<{ eyebrow: string; title: string; islands: string; copy: string; route: string; icon: LucideIcon }>;
  matrixRows: Array<{ question: string; gulf: string; andaman: string; rule: string }>;
  handoffs: Array<{ step: string; title: string; copy: string; icon: LucideIcon }>;
  gear: Array<{ title: string; copy: string; amazonSlug: string; icon: LucideIcon }>;
  bookingCards: Array<{ title: string; copy: string; href: string; label: string; icon: LucideIcon; affiliate?: boolean }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
}

function schemas(data: IslandHoppingPlannerData) {
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: data.title, description: data.description, url: data.pageUrl, image: `https://go2-thailand.com${data.heroImage}`, inLanguage: 'en-GB', dateModified: data.updatedAt, author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: data.breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: item.href ? `https://go2-thailand.com${item.href}` : data.pageUrl })) },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Thailand island-hopping regions', numberOfItems: data.regions.length, itemListElement: data.regions.map((region, index) => ({ '@type': 'ListItem', position: index + 1, name: region.title, description: region.description })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];
}

export function IslandHoppingPlannerTemplate({ data }: { data: IslandHoppingPlannerData }) {
  return (
    <main className="bg-canvas" data-premium-template="island-hopping-planner-en">
      <SEOHead title={data.title} description={data.description} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        {schemas(data).map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <EditorialHero
        image={data.heroImage}
        imageAlt={data.heroAlt}
        breadcrumbs={data.breadcrumbs}
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        description={data.heroDescription}
        actions={[
          { label: 'Choose your coast', href: '#coasts', kind: 'primary' },
          { label: 'Check current ferry tickets', href: data.ticketHref, kind: 'secondary', newTab: true, affiliate: true },
        ]}
        disclosure="The ticket link is sponsored. We may earn a commission at no extra cost to you. Ferry routes, operators, piers, luggage and weather disruption vary—check every live segment before paying."
        minHeightClassName="min-h-[760px] lg:min-h-[700px]"
        titleClassName="max-w-[820px] text-[3.8rem] leading-[0.86] sm:text-[5rem] lg:text-[5.8rem]"
        contentClassName="max-w-[760px]"
        imageClassName="object-cover object-[70%_center] lg:object-center"
      />
      <PageSectionNav label="On this island planner" items={data.navItems} />

      <section id="decide" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionHeading eyebrow="Start with restraint" title={data.decisionTitle} description={data.decisionDescription} />
            <svg aria-hidden="true" viewBox="0 0 360 120" className="mt-8 hidden h-28 w-full max-w-sm text-saffron lg:block"><path d="M10 78 C62 26 104 112 161 61 S260 26 347 78" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="10" cy="78" r="5" fill="currentColor" /><circle cx="161" cy="61" r="4" fill="currentColor" /><path d="M347 63c-8 0-14 6-14 14 0 11 14 25 14 25s14-14 14-25c0-8-6-14-14-14Zm0 20a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" fill="currentColor" /></svg>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-3">
            {data.decisionCards.map(({ number, title, copy, icon: Icon }, index) => <article key={title} className={`min-h-[280px] p-7 ${index === 2 ? 'bg-jade text-white' : index === 1 ? 'bg-tonal' : 'bg-white'}`}><div className="flex items-center justify-between"><Icon size={24} className={index === 2 ? 'text-saffron-light' : 'text-jade'} /><span className={`font-display text-[2.2rem] font-semibold ${index === 2 ? 'text-white/24' : 'text-jade/18'}`}>{number}</span></div><h2 className={`mt-8 font-display text-[1.7rem] font-semibold leading-none ${index === 2 ? 'text-white' : 'text-jade'}`}>{title}</h2><p className={`mt-4 text-xs font-medium leading-6 ${index === 2 ? 'text-white/64' : 'text-charcoal/62'}`}>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="coasts" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><SectionHeading eyebrow="Two seas, different networks" title={<>Pick one coast.<br />Then build a chain.</>} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">A coast is not just a weather choice. It determines the gateway, ferry network and how many transfers sit between each sleep. Treat cross-coast travel as a separate overland day.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {data.regions.map(({ eyebrow, title, description, gateway, stops, strongFor, watch, icon: Icon, tone }) => { const dark = tone === 'dark'; return <article key={title} className={`overflow-hidden rounded-[26px] border p-7 shadow-editorial-card lg:p-9 ${dark ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-jade'}`}><div className="flex items-center justify-between"><span className={`grid h-12 w-12 place-items-center rounded-xl border ${dark ? 'border-white/16 bg-white/[.07] text-saffron-light' : 'border-saffron/30 bg-tonal text-jade'}`}><Icon size={24} /></span><p className={`text-[9px] font-extrabold uppercase tracking-[.15em] ${dark ? 'text-saffron-light' : 'text-saffron-dark'}`}>{eyebrow}</p></div><h2 className="mt-7 font-display text-[2.8rem] font-semibold leading-[.9]">{title}</h2><p className={`mt-5 text-sm font-medium leading-7 ${dark ? 'text-white/64' : 'text-charcoal/64'}`}>{description}</p><p className={`mt-6 text-[9px] font-extrabold uppercase tracking-[.14em] ${dark ? 'text-white/46' : 'text-charcoal/44'}`}>Gateway: {gateway}</p><div className="mt-4 flex flex-wrap items-center gap-2">{stops.map((stop, index) => <span key={stop.href} className="contents"><Link href={stop.href} className={`rounded-full border px-4 py-2 text-[10px] font-extrabold ${dark ? 'border-white/16 bg-white/[.06] text-white hover:border-saffron/50' : 'border-jade/12 bg-tonal text-jade hover:border-saffron/50'}`}>{stop.label}</Link>{index < stops.length - 1 && <ArrowRight size={12} className={dark ? 'text-saffron-light' : 'text-saffron-dark'} />}</span>)}</div><dl className={`mt-7 grid gap-5 border-t pt-6 text-xs leading-6 sm:grid-cols-2 ${dark ? 'border-white/12' : 'border-jade/10'}`}><div><dt className="font-extrabold">Strong for</dt><dd className={dark ? 'mt-1 text-white/60' : 'mt-1 text-charcoal/62'}>{strongFor}</dd></div><div><dt className="font-extrabold">Watch</dt><dd className={dark ? 'mt-1 text-white/60' : 'mt-1 text-charcoal/62'}>{watch}</dd></div></dl></article>; })}
          </div>
        </div>
      </section>

      <section id="pace" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Match ambition to nights" title={<>Fewer islands.<br />Better island days.</>} /><p className="text-sm font-medium leading-7 text-charcoal/64">Every move consumes checkout, pier transfer, waiting, sailing and another check-in. These are pacing frameworks, not fixed timetables.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">{data.pacePlans.map(({ eyebrow, title, islands, copy, route, icon: Icon }) => <article key={title} className="flex min-h-[330px] flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center justify-between"><Icon size={24} className="text-jade" /><span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">{eyebrow}</span></div><h2 className="mt-7 font-display text-[2.15rem] font-semibold leading-none text-jade">{title}</h2><p className="mt-3 text-[10px] font-extrabold uppercase tracking-[.09em] text-jade/52">{islands}</p><p className="mt-5 flex-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p><p className="mt-6 rounded-xl bg-tonal px-4 py-4 text-[10px] font-extrabold leading-5 text-jade">Route shape: {route}</p></article>)}</div>
        </div>
      </section>

      <section id="compare" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="eyebrow !text-saffron-light">Decision matrix</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9]">Gulf or Andaman?</h2></div><p className="max-w-[760px] text-sm font-medium leading-7 text-white/64">Use the table to create a shortlist. The live weather, marine notices and operating ferry network still decide whether that shortlist works on your date.</p></div>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/14"><table className="min-w-[850px] w-full border-collapse text-left"><thead className="bg-white/[.08] text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-light"><tr><th className="p-5">Question</th><th className="p-5">Gulf first look</th><th className="p-5">Andaman first look</th><th className="p-5">Planning rule</th></tr></thead><tbody>{data.matrixRows.map((row) => <tr key={row.question} className="border-t border-white/12 align-top"><th scope="row" className="p-5 font-display text-[1.25rem] font-semibold">{row.question}</th><td className="p-5 text-xs font-medium leading-6 text-white/62">{row.gulf}</td><td className="p-5 text-xs font-medium leading-6 text-white/62">{row.andaman}</td><td className="p-5 text-xs font-extrabold leading-6 text-saffron-light">{row.rule}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section id="handoffs" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><SectionHeading eyebrow="Protect every boat day" title={<>The route breaks<br />at the handoffs.</>} description="A ferry ticket is only one piece. Map the hotel-to-pier transfer, check-in point, operator, luggage and final-island transport before buying." /><div className="grid gap-4 sm:grid-cols-2">{data.handoffs.map(({ step, title, copy, icon: Icon }) => <article key={step} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><Icon size={24} className="text-jade" /><span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">{step}</span></div><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{copy}</p></article>)}</div></div>
      </section>

      <section id="pack" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><div><SectionHeading eyebrow="Three useful products" title={<>Pack for wet edges.<br />Not expedition theatre.</>} description="These products solve repeated pier, boat and beach-transfer tasks. They are optional—check the exact item, seller, size and delivery before buying." /><AffiliateDisclosure className="mt-5">As an Amazon Associate we earn from qualifying purchases at no extra cost to you. Links use our central `/go/` router; OneLink may send you to a local Amazon store. Product, seller, fit, current price and availability vary.</AffiliateDisclosure></div><div className="grid gap-4 sm:grid-cols-3">{data.gear.map(({ title, copy, amazonSlug, icon: Icon }) => <article key={amazonSlug} className="flex min-h-[280px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={25} className="text-jade" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p><a href={`/go/${amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-dark">Check current price at Amazon <ExternalLink size={12} /></a></article>)}</div></div>
      </section>

      <section id="book" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Live next steps" title={<>Book the chain.<br />Not isolated bargains.</>} /><p className="text-sm font-medium leading-7 text-charcoal/64">Compare current inventory only after selecting the coast and route shape. A cheap leg can be poor value when it creates an extra hotel, taxi or unprotected connection.</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{data.bookingCards.map(({ title, copy, href, label, icon: Icon, affiliate }) => <article key={title} className="flex min-h-[285px] flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><Icon size={25} className="text-jade" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p>{affiliate ? <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">{label} <ExternalLink size={13} /></a> : <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label} <ArrowRight size={13} /></Link>}</article>)}</div><AffiliateDisclosure className="mt-4">Sponsored ticket and hotel links show current commercial inventory. Go2Thailand does not set the operator, route, pier, luggage rule, room price or cancellation conditions.</AffiliateDisclosure></div>
      </section>

      <FaqSplitSection id="questions" eyebrow="Genuine search questions" title="Thailand island-hopping questions" description="Captured from ten live UK-English SERPs and answered without freezing changeable fares, schedules or seasons into permanent claims." items={data.faqs} />
      <RelatedGuidesSection eyebrow="Continue planning" title="Turn the route into a trip" readLabel="Open the guide" guides={data.related} />
      <SourceMethodSection eyebrow="Sources & method" title="Built around real route decisions" description={data.methodDescription} sources={data.sources} />
    </main>
  );
}
