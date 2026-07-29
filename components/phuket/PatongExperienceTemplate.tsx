import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

export interface PatongExperienceData {
  pageUrl: string; updatedAt: string; title: string; description: string; breadcrumbLabel: string;
  heroImage: string; heroAlt: string; heroEyebrow: string; heroTitle: ReactNode; heroSubtitle: string; heroDescription: string;
  primaryAction: { label: string; href: `#${string}` }; affiliateAction: { label: string; href: string }; navItems: PageSectionNavItem[];
  introEyebrow: string; introTitle: ReactNode; introDescription: string;
  introCards: Array<{ eyebrow: string; title: string; copy: string; icon: LucideIcon; tone?: 'dark' | 'light' }>;
  editorialRule: string;
  zonesEyebrow: string; zonesTitle: ReactNode; zonesDescription: string;
  zones: Array<{ title: string; eyebrow: string; copy: string; check: string; image: string; imageAlt: string }>;
  choiceEyebrow: string; choiceTitle: ReactNode; choiceDescription: string;
  choices: Array<{ title: string; copy: string; check: string; icon: LucideIcon }>;
  rhythmEyebrow: string; rhythmTitle: ReactNode; rhythmDescription: string;
  rhythmRows: Array<{ period: string; feel: string; plan: string; cue: string; highlight?: boolean }>;
  featureEyebrow: string; featureTitle: ReactNode; featureDescription: string;
  featureCards: Array<{ title: string; copy: string; icon: LucideIcon }>;
  practicalEyebrow: string; practicalTitle: ReactNode; practicalDescription: string;
  practicalCards: Array<{ title: string; copy: string; icon: LucideIcon }>;
  bookingTitle: ReactNode; bookingDescription: string;
  bookingCards: Array<{ title: string; copy: string; href: string; label: string; icon: LucideIcon; affiliate?: boolean }>;
  faqs: Array<{ question: string; answer: string }>; faqDescription: string;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>; methodDescription: string; methodTitle: string;
}

function createSchemas(data: PatongExperienceData) {
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: data.title, description: data.description, url: data.pageUrl, image: `https://go2-thailand.com${data.heroImage}`, inLanguage: 'en-GB', dateModified: data.updatedAt, author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
      { '@type': 'ListItem', position: 2, name: 'Phuket', item: 'https://go2-thailand.com/city/phuket/' },
      { '@type': 'ListItem', position: 3, name: 'Patong', item: 'https://go2-thailand.com/phuket/patong/' },
      { '@type': 'ListItem', position: 4, name: data.breadcrumbLabel, item: data.pageUrl },
    ] },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: `${data.breadcrumbLabel} planning zones`, numberOfItems: data.zones.length, itemListElement: data.zones.map((zone, index) => ({ '@type': 'ListItem', position: index + 1, name: zone.title, description: zone.copy })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];
}

export function PatongExperienceTemplate({ data }: { data: PatongExperienceData }) {
  const schemas = createSchemas(data);
  return (
    <div className="bg-canvas" data-premium-template="patong-experience-en">
      <SEOHead title={data.title} description={data.description} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>
      <EditorialHero image={data.heroImage} imageAlt={data.heroAlt} breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Phuket', href: '/city/phuket/' }, { label: 'Patong', href: '/phuket/patong/' }, { label: data.breadcrumbLabel }]} eyebrow={data.heroEyebrow} title={data.heroTitle} subtitle={data.heroSubtitle} description={data.heroDescription} actions={[{ label: data.primaryAction.label, href: data.primaryAction.href, kind: 'primary' }, { label: data.affiliateAction.label, href: data.affiliateAction.href, kind: 'secondary', newTab: true, affiliate: true }]} disclosure="The provider link is sponsored. We may earn a commission at no extra cost to you. Check the current listing, inclusions, availability, total and cancellation terms." minHeightClassName="min-h-[750px] lg:min-h-[700px]" titleClassName="max-w-[740px] text-[4rem] leading-[0.84] sm:text-[5rem] lg:text-[5.8rem]" contentClassName="max-w-[720px]" imageClassName="object-cover object-[68%_center] lg:object-center" gradientClassName="bg-[linear-gradient(180deg,rgba(248,244,235,0.08)_0%,rgba(248,244,235,0.48)_47%,rgba(248,244,235,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(248,244,235,0.98)_0%,rgba(248,244,235,0.89)_38%,rgba(9,44,38,0.22)_66%,rgba(9,44,38,0.02)_100%)]" />
      <PageSectionNav label={`On this Patong ${data.breadcrumbLabel.toLowerCase()} guide`} items={data.navItems} />

      <section id="decide" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><div><SectionHeading eyebrow={data.introEyebrow} title={data.introTitle} description={data.introDescription} /><svg aria-hidden="true" viewBox="0 0 360 120" className="mt-7 hidden h-28 w-full max-w-sm text-saffron lg:block"><path d="M10 90 C78 116 82 24 142 62 S246 105 338 22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="10" cy="90" r="5" fill="currentColor" /><circle cx="142" cy="62" r="4" fill="currentColor" /><path d="M338 12c-8 0-14 6-14 14 0 11 14 24 14 24s14-13 14-24c0-8-6-14-14-14Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" fill="currentColor" /></svg></div><div><div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">{data.introCards.map(({ eyebrow, title, copy, icon: Icon, tone }, index) => { const dark = tone === 'dark' || index === data.introCards.length - 1; return <article key={title} className={`min-h-[245px] p-7 ${dark ? 'bg-jade text-white' : index % 2 ? 'bg-tonal' : 'bg-white'}`}><Icon size={24} className={dark ? 'text-saffron-light' : 'text-jade'} /><p className={`mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] ${dark ? 'text-saffron-light' : 'text-saffron-dark'}`}>{eyebrow}</p><h3 className={`mt-2 font-display text-[1.7rem] font-semibold leading-none ${dark ? 'text-white' : 'text-jade'}`}>{title}</h3><p className={`mt-4 text-xs font-medium leading-6 ${dark ? 'text-white/66' : 'text-charcoal/64'}`}>{copy}</p></article>; })}</div><p className="mt-5 rounded-xl border border-saffron/25 bg-saffron-pale px-5 py-4 text-xs font-extrabold leading-6 text-jade">Editorial rule: {data.editorialRule}</p></div></div></section>

      <section id="zones" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow={data.zonesEyebrow} title={data.zonesTitle} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">{data.zonesDescription}</p></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{data.zones.map((zone) => <article key={zone.title} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-52 overflow-hidden"><Image src={zone.image} alt={zone.imageAlt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/85 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-white"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">{zone.eyebrow}</p><h3 className="mt-1 font-display text-[2rem] font-semibold leading-none">{zone.title}</h3></div></div><div className="flex min-h-[230px] flex-col p-6"><p className="text-xs font-medium leading-6 text-charcoal/66">{zone.copy}</p><div className="mt-auto rounded-xl bg-tonal p-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Live check</p><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/62">{zone.check}</p></div></div></article>)}</div></div></section>

      <section id="choose" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><SectionHeading eyebrow={data.choiceEyebrow} title={data.choiceTitle} description={data.choiceDescription} /><div className="grid gap-4 sm:grid-cols-2">{data.choices.map(({ title, copy, check, icon: Icon }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={24} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{copy}</p><p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold leading-5 text-saffron-dark">Check: {check}</p></article>)}</div></div></section>

      <section id="rhythm" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow={data.rhythmEyebrow} title={data.rhythmTitle} description={data.rhythmDescription} /><p className="text-xs font-medium leading-6 text-charcoal/58">These are decision bands, not opening-hour or crowd guarantees. Verify the venue, transport and conditions for the actual evening.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-jade/10 bg-jade/10"><div className="hidden grid-cols-[.55fr_1.2fr_1.2fr_.7fr] bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white md:grid"><span>Moment</span><span>Typical feel</span><span>Plan around</span><span>Cue</span></div>{data.rhythmRows.map((row) => <article key={row.period} className={`grid gap-3 border-b border-jade/10 p-6 last:border-0 md:grid-cols-[.55fr_1.2fr_1.2fr_.7fr] ${row.highlight ? 'bg-saffron-pale' : 'bg-white'}`}><h3 className="font-display text-[1.35rem] font-semibold text-jade">{row.period}</h3><p className="text-xs font-medium leading-5 text-charcoal/64">{row.feel}</p><p className="text-xs font-medium leading-5 text-charcoal/64">{row.plan}</p><p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-saffron-dark">{row.cue}</p></article>)}</div></div></section>

      <section id="feature" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow !text-saffron-light">{data.featureEyebrow}</p><h2 className="font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.035em]">{data.featureTitle}</h2><p className="mt-6 text-sm font-medium leading-7 text-white/66">{data.featureDescription}</p></div><div className="grid gap-4 sm:grid-cols-3">{data.featureCards.map(({ title, copy, icon: Icon }) => <article key={title} className="rounded-2xl border border-white/13 bg-white/[0.065] p-6"><Icon size={24} className="text-saffron-light" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/64">{copy}</p></article>)}</div></div></section>

      <section id="practical" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow={data.practicalEyebrow} title={data.practicalTitle} description={data.practicalDescription} /><div className="grid gap-4 sm:grid-cols-3">{data.practicalCards.map(({ title, copy, icon: Icon }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={24} className="text-jade" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{copy}</p></article>)}</div></div></section>

      <section id="book" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="eyebrow !text-saffron-light">Check current options</p><h2 className="font-display text-[3.2rem] font-semibold leading-[0.9]">{data.bookingTitle}</h2></div><p className="text-sm font-medium leading-7 text-white/66">{data.bookingDescription}</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{data.bookingCards.map(({ title, copy, href, label, icon: Icon, affiliate }) => <article key={title} className="flex min-h-[285px] flex-col rounded-2xl border border-white/13 bg-white/[0.065] p-7"><Icon size={25} className="text-saffron-light" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-white/64">{copy}</p>{affiliate ? <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">{label} <ExternalLink size={13} /></a> : <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">{label} <ArrowRight size={13} /></Link>}</article>)}</div><AffiliateDisclosure className="mt-4 !text-white/55">Live provider options are sponsored. We may earn a commission without increasing your price; internal editorial links do not earn one.</AffiliateDisclosure></div></section>

      <FaqSplitSection id="questions" eyebrow="Genuine search questions" title={`Questions about Patong ${data.breadcrumbLabel.toLowerCase()}`} description={data.faqDescription} items={data.faqs} />
      <RelatedGuidesSection eyebrow="Continue planning" title="Build the rest of your Patong stay" readLabel="Open the guide" guides={data.related} />
      <SourceMethodSection eyebrow="Sources & method" title={data.methodTitle} description={data.methodDescription} sources={data.sources} />
    </div>
  );
}
