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

export interface TransportJourneyData {
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
  heroPrimary: { label: string; href: `#${string}` };
  heroAffiliate: { label: string; href: string };
  navItems: PageSectionNavItem[];
  verdictTitle: ReactNode;
  verdictDescription: string;
  quickCards: Array<{ eyebrow: string; title: string; copy: string; icon: LucideIcon; tone?: 'dark' | 'light' }>;
  editorialRule: string;
  optionsTitle: ReactNode;
  optionsDescription: string;
  options: Array<{ title: string; eyebrow: string; chain: string; bestFor: string; tradeoff: string; check: string; icon: LucideIcon }>;
  matrixTitle: ReactNode;
  matrixDescription: string;
  matrixRows: Array<{ situation: string; firstLook: string; why: string; risk: string; highlight?: boolean }>;
  connectionTitle: ReactNode;
  connectionDescription: string;
  connectionSteps: Array<{ label: string; title: string; copy: string; icon: LucideIcon }>;
  resilienceTitle: ReactNode;
  resilienceDescription: string;
  resilienceCards: Array<{ title: string; copy: string; icon: LucideIcon }>;
  bookingTitle: ReactNode;
  bookingDescription: string;
  bookingCards: Array<{ title: string; copy: string; href: string; label: string; icon: LucideIcon; affiliate?: boolean }>;
  faqs: Array<{ question: string; answer: string }>;
  faqDescription: string;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
}

function createSchemas(data: TransportJourneyData) {
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: data.title, description: data.description, url: data.pageUrl, image: `https://go2-thailand.com${data.heroImage}`, inLanguage: 'en-GB', dateModified: data.updatedAt, author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: data.breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: item.href ? `https://go2-thailand.com${item.href}` : data.pageUrl })) },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Journey options', numberOfItems: data.options.length, itemListElement: data.options.map((option, index) => ({ '@type': 'ListItem', position: index + 1, name: option.title, description: `${option.chain}. ${option.bestFor}` })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];
}

export function TransportJourneyTemplate({ data }: { data: TransportJourneyData }) {
  const schemas = createSchemas(data);
  return (
    <div className="bg-canvas" data-premium-template="transport-journey-en">
      <SEOHead title={data.title} description={data.description} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>
      <EditorialHero image={data.heroImage} imageAlt={data.heroAlt} breadcrumbs={data.breadcrumbs} eyebrow={data.heroEyebrow} title={data.heroTitle} subtitle={data.heroSubtitle} description={data.heroDescription} actions={[{ label: data.heroPrimary.label, href: data.heroPrimary.href, kind: 'primary' }, { label: data.heroAffiliate.label, href: data.heroAffiliate.href, kind: 'secondary', newTab: true, affiliate: true }]} disclosure="The ticket link is sponsored. We may earn a commission at no extra cost to you. Check the current operator, every connection, luggage, total and cancellation conditions before paying." minHeightClassName="min-h-[760px] lg:min-h-[700px]" titleClassName="max-w-[790px] text-[3.85rem] leading-[0.86] sm:text-[5rem] lg:text-[5.8rem]" contentClassName="max-w-[740px]" imageClassName="object-cover object-[67%_center] lg:object-center" />
      <PageSectionNav label="On this journey guide" items={data.navItems} />

      <section id="decide" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><SectionHeading eyebrow="Choose the whole chain" title={data.verdictTitle} description={data.verdictDescription} /><svg aria-hidden="true" viewBox="0 0 360 120" className="mt-8 hidden h-28 w-full max-w-sm text-saffron lg:block"><path d="M8 84 C72 118 94 25 154 64 S250 102 342 22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="8" cy="84" r="5" fill="currentColor" /><circle cx="154" cy="64" r="4" fill="currentColor" /><path d="M342 12c-8 0-14 6-14 14 0 11 14 24 14 24s14-13 14-24c0-8-6-14-14-14Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" fill="currentColor" /></svg></div><div><div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">{data.quickCards.map(({ eyebrow, title, copy, icon: Icon, tone }, index) => { const dark = tone === 'dark' || index === data.quickCards.length - 1; return <article key={title} className={`min-h-[240px] p-7 ${dark ? 'bg-jade text-white' : index % 2 ? 'bg-tonal' : 'bg-white'}`}><Icon size={24} className={dark ? 'text-saffron-light' : 'text-jade'} /><p className={`mt-6 text-[9px] font-extrabold uppercase tracking-[.15em] ${dark ? 'text-saffron-light' : 'text-saffron-dark'}`}>{eyebrow}</p><h2 className={`mt-2 font-display text-[1.65rem] font-semibold leading-none ${dark ? 'text-white' : 'text-jade'}`}>{title}</h2><p className={`mt-4 text-xs font-medium leading-6 ${dark ? 'text-white/66' : 'text-charcoal/64'}`}>{copy}</p></article>; })}</div><p className="mt-5 rounded-xl border border-saffron/25 bg-saffron-pale px-5 py-4 text-xs font-extrabold leading-6 text-jade">Editorial rule: {data.editorialRule}</p></div></div></section>

      <section id="options" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Four route shapes" title={data.optionsTitle} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">{data.optionsDescription}</p></div><div className="mt-10 grid gap-5 lg:grid-cols-2">{data.options.map(({ title, eyebrow, chain, bestFor, tradeoff, check, icon: Icon }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={23} /></span><p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">{eyebrow}</p></div><h2 className="mt-6 font-display text-[2rem] font-semibold leading-none text-jade">{title}</h2><p className="mt-3 rounded-lg bg-tonal px-4 py-3 text-[10px] font-extrabold uppercase tracking-[.08em] text-jade">{chain}</p><dl className="mt-5 grid gap-4 text-xs leading-6 sm:grid-cols-2"><div><dt className="font-extrabold text-jade">Strong when</dt><dd className="mt-1 text-charcoal/62">{bestFor}</dd></div><div><dt className="font-extrabold text-jade">Trade-off</dt><dd className="mt-1 text-charcoal/62">{tradeoff}</dd></div></dl><p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold leading-5 text-saffron-dark">Live check: {check}</p></article>)}</div></div></section>

      <section id="compare" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Decision matrix" title={data.matrixTitle} description={data.matrixDescription} /><p className="text-xs font-medium leading-6 text-charcoal/58">The first look is a shortlist—not a universal winner. Compare the exact date, departure point and arrival transfer.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-jade/10 bg-jade/10"><div className="hidden grid-cols-[.8fr_.8fr_1.2fr_1.2fr] bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[.14em] text-white md:grid"><span>Situation</span><span>First look</span><span>Why</span><span>Watch</span></div>{data.matrixRows.map((row) => <article key={row.situation} className={`grid gap-3 border-b border-jade/10 p-6 last:border-0 md:grid-cols-[.8fr_.8fr_1.2fr_1.2fr] ${row.highlight ? 'bg-saffron-pale' : 'bg-white'}`}><h3 className="font-display text-[1.35rem] font-semibold text-jade">{row.situation}</h3><p className="text-xs font-extrabold text-saffron-dark">{row.firstLook}</p><p className="text-xs font-medium leading-5 text-charcoal/64">{row.why}</p><p className="text-xs font-medium leading-5 text-charcoal/64">{row.risk}</p></article>)}</div></div></section>

      <section id="connections" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow !text-saffron-light">Connection architecture</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9] tracking-[-.035em]">{data.connectionTitle}</h2><p className="mt-6 text-sm font-medium leading-7 text-white/66">{data.connectionDescription}</p></div><div className="grid gap-4 sm:grid-cols-2">{data.connectionSteps.map(({ label, title, copy, icon: Icon }) => <article key={title} className="rounded-2xl border border-white/13 bg-white/[.065] p-6"><div className="flex items-center justify-between"><Icon size={24} className="text-saffron-light" /><span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-light">{label}</span></div><h3 className="mt-6 font-display text-[1.55rem] font-semibold">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/64">{copy}</p></article>)}</div></div></section>

      <section id="resilience" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Protect the handoffs" title={data.resilienceTitle} description={data.resilienceDescription} /><div className="grid gap-4 sm:grid-cols-3">{data.resilienceCards.map(({ title, copy, icon: Icon }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={24} className="text-jade" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{copy}</p></article>)}</div></div></section>

      <section id="book" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Check live inventory" title={data.bookingTitle} /><p className="text-sm font-medium leading-7 text-charcoal/64">{data.bookingDescription}</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{data.bookingCards.map(({ title, copy, href, label, icon: Icon, affiliate }) => <article key={title} className="flex min-h-[285px] flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><Icon size={25} className="text-jade" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/64">{copy}</p>{affiliate ? <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">{label} <ExternalLink size={13} /></a> : href.startsWith('/') ? <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label} <ArrowRight size={13} /></Link> : <a href={href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label} <ExternalLink size={13} /></a>}</article>)}</div><AffiliateDisclosure className="mt-4">Sponsored providers show live commercial inventory. We do not set the operator, schedule, price, luggage allowance or cancellation terms.</AffiliateDisclosure></div></section>

      <FaqSplitSection id="questions" eyebrow="Genuine search questions" title="Questions about this journey" description={data.faqDescription} items={data.faqs} />
      <RelatedGuidesSection eyebrow="Continue planning" title="Build the rest of the route" readLabel="Open the guide" guides={data.related} />
      <SourceMethodSection eyebrow="Sources & method" title="Built around live connections" description={data.methodDescription} sources={data.sources} />
    </div>
  );
}
