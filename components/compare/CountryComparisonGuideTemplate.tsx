import Image from 'next/image';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ExternalLink, MapPin, Plane, Route } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

export interface CountryComparisonGuideData {
  pageUrl: string;
  updatedAt: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  heroEyebrow: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  heroDescription: string;
  navItems: PageSectionNavItem[];
  countryA: string;
  countryB: string;
  verdictTitle: ReactNode;
  verdictDescription: string;
  verdictCards: Array<{ label: string; winner: string; icon: LucideIcon }>;
  editorialRule: string;
  comparisonRows: Array<{ factor: string; a: string; b: string; cue: string }>;
  timingTitle: ReactNode;
  timingDescription: string;
  timingRows: Array<{ period: string; a: string; b: string; cue: string; highlight?: boolean }>;
  profiles: Array<{ eyebrow: string; title: string; copy: string; icon: LucideIcon }>;
  routeTitle: string;
  routeCopy: string;
  routeHref: string;
  routeCta: string;
  bookingCards: Array<{ title: string; copy: string; href: string; icon: LucideIcon }>;
  amazonProducts?: Array<{ title: string; copy: string; slug: string; icon: LucideIcon }>;
  faqs: Array<{ question: string; answer: string }>;
  faqDescription: string;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
}

function createSchemas(data: CountryComparisonGuideData) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      url: data.pageUrl,
      image: `https://go2-thailand.com${data.heroImage}`,
      inLanguage: 'en-GB',
      dateModified: data.updatedAt,
      author: { '@type': 'Organization', name: 'Go2Thailand' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${data.countryA} vs ${data.countryB} comparison`,
      numberOfItems: data.comparisonRows.length,
      itemListElement: data.comparisonRows.map((row, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: row.factor,
        description: `${data.countryA}: ${row.a} ${data.countryB}: ${row.b} Planning cue: ${row.cue}.`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Travel comparisons', item: 'https://go2-thailand.com/blog/' },
        { '@type': 'ListItem', position: 3, name: `${data.countryA} vs ${data.countryB}`, item: data.pageUrl },
      ],
    },
  ];
}

export function CountryComparisonGuideTemplate({ data }: { data: CountryComparisonGuideData }) {
  const schemas = createSchemas(data);
  return <>
    <SEOHead title={data.title} description={data.description} ogImage={`https://go2-thailand.com${data.heroImage}`}>
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div className="bg-canvas text-charcoal" data-premium-template="country-comparison">
      <EditorialHero
        image={data.heroImage}
        imageAlt={data.heroAlt}
        breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Travel comparisons', href: '/blog/' }, { label: `${data.countryA} vs ${data.countryB}` }]}
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        description={data.heroDescription}
        actions={[{ label: 'See the verdict', href: '#verdict', kind: 'primary' }, { label: 'Compare side by side', href: '#compare', kind: 'secondary' }]}
        minHeightClassName="min-h-[740px] lg:min-h-[700px]"
        titleClassName="max-w-[760px] text-[4.1rem] leading-[0.84] sm:text-[5.5rem] lg:text-[6.5rem]"
        contentClassName="max-w-[740px]"
        imageClassName="object-cover object-[59%_center]"
        gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.05)_0%,rgba(252,250,246,0.84)_64%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.85)_40%,rgba(252,250,246,0.10)_66%,rgba(8,47,41,0.03)_100%)]"
      />
      <PageSectionNav items={data.navItems} />

      <section id="verdict" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-11 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow="The short answer" title={data.verdictTitle} description={data.verdictDescription} />
        <div><div className="grid gap-3 sm:grid-cols-2">{data.verdictCards.map(({ label, winner, icon: Icon }) => <article key={label} className="flex items-center gap-4 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-tonal text-jade"><Icon size={20} /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[.13em] text-charcoal/45">{label}</p><p className="mt-1 font-display text-[1.45rem] font-semibold text-jade">{winner}</p></div></article>)}</div>
        <aside className="relative mt-6 overflow-hidden rounded-2xl bg-jade p-7 text-white shadow-editorial-lift sm:p-9"><div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-dashed border-saffron/45" /><Route className="text-saffron" /><h2 className="mt-5 font-display text-[2.2rem] font-semibold leading-none">Our editorial rule</h2><p className="mt-4 text-sm leading-7 text-white/74">{data.editorialRule}</p></aside></div>
      </div></section>

      <section id="compare" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Side by side" title="What changes on the ground" description="A useful comparison shows the trade-off behind every win. It does not turn two entire countries into one score." /><div className="mt-9 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><table className="w-full min-w-[980px] border-collapse text-left"><thead><tr className="bg-jade text-white"><th className="px-6 py-5 text-[10px] uppercase tracking-[.14em]">Factor</th><th className="px-6 py-5 font-display text-2xl">{data.countryA}</th><th className="px-6 py-5 font-display text-2xl">{data.countryB}</th><th className="px-6 py-5 text-[10px] uppercase tracking-[.14em] text-saffron">Planning cue</th></tr></thead><tbody className="divide-y divide-jade/10">{data.comparisonRows.map((row, index) => <tr key={row.factor} className={index % 2 ? 'bg-canvas/55' : 'bg-white'}><th className="px-6 py-6 text-sm text-jade">{row.factor}</th><td className="px-6 py-6 text-xs leading-6 text-charcoal/65">{row.a}</td><td className="px-6 py-6 text-xs leading-6 text-charcoal/65">{row.b}</td><td className="px-6 py-6"><span className="rounded-full bg-tonal px-3 py-2 text-[10px] font-extrabold text-jade">{row.cue}</span></td></tr>)}</tbody></table></div></div></section>

      <section id="timing" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]"><SectionHeading eyebrow="Time the route" title={data.timingTitle} description={data.timingDescription} /><div className="grid gap-3">{data.timingRows.map((row) => <article key={row.period} className={`grid gap-4 rounded-2xl border p-5 sm:grid-cols-[110px_1fr_1fr_150px] sm:items-center ${row.highlight ? 'border-saffron/30 bg-white shadow-editorial-card' : 'border-jade/10 bg-canvas'}`}><strong className="font-display text-xl text-jade">{row.period}</strong><p className="text-[11px] leading-5 text-charcoal/62"><span className="font-extrabold text-jade">{data.countryA} · </span>{row.a}</p><p className="text-[11px] leading-5 text-charcoal/62"><span className="font-extrabold text-jade">{data.countryB} · </span>{row.b}</p><span className="text-[9px] font-extrabold uppercase tracking-[.11em] text-saffron-dark">{row.cue}</span></article>)}</div></div></section>

      <section id="traveller" className="section-divider-bottom scroll-mt-24 bg-mist py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Choose your travel style" title="Who should choose which?" description="The strongest answer begins with the kind of journey you want to operate—not a generic country ranking." /><div className="mt-9 grid gap-5 md:grid-cols-2">{data.profiles.map(({ eyebrow, title, copy, icon: Icon }, index) => <article key={eyebrow} className="relative overflow-hidden rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><span className="grid h-12 w-12 place-items-center rounded-xl bg-tonal text-jade"><Icon size={22} /></span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">{eyebrow}</p><h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-charcoal/65">{copy}</p><span className="absolute bottom-5 right-6 font-display text-5xl text-jade/8">0{index + 1}</span></article>)}</div></div></section>

      <section className="section-divider-bottom py-14 lg:py-20"><div className="container-custom"><div className="relative overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift"><Image src={data.heroImage} alt="Country-to-country route planning" fill sizes="100vw" className="object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-r from-jade via-jade/94 to-jade/50" /><div className="relative grid min-h-[400px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[.82fr_1.18fr] lg:px-14"><div><p className="eyebrow !text-saffron">Build one trip at a time</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9]">{data.routeTitle}</h2><p className="mt-5 text-sm leading-7 text-white/72">{data.routeCopy}</p><a href={data.routeHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 min-h-12 px-6 text-saffron-dark">{data.routeCta} <ExternalLink size={15} /></a></div><div className="relative min-h-[230px]"><div className="absolute left-[14%] right-[14%] top-1/2 border-t-2 border-dashed border-saffron/70" /><Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade p-2 text-saffron" size={44} /><div className="relative flex min-h-[220px] items-center justify-between gap-5"><div className="rounded-2xl bg-white p-5 text-jade shadow-editorial-card"><MapPin className="text-saffron-dark" /><strong className="mt-3 block font-display text-2xl">{data.countryA}</strong><span className="text-[10px] text-charcoal/55">Route A</span></div><div className="rounded-2xl bg-tonal p-5 text-jade shadow-editorial-card"><MapPin className="text-saffron-dark" /><strong className="mt-3 block font-display text-2xl">{data.countryB}</strong><span className="text-[10px] text-charcoal/55">Route B</span></div></div></div></div></div></div></section>

      <section id="book" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Check your actual dates" title="Compare current options" description="We do not freeze a daily budget or flight price into the page. Open your dates and compare the same baggage, cancellation and transfer terms." /><div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{data.bookingCards.map(({ title, copy, href, icon: Icon }) => <article key={title} className="flex min-h-[300px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon className="text-jade" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs leading-6 text-charcoal/62">{copy}</p><a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Check current options <ArrowRight size={14} className="text-saffron" /></a></article>)}</div><AffiliateDisclosure className="mt-4">Affiliate links to travel providers. Go2Thailand may earn a commission without increasing your price. Availability, price, operator and terms are controlled by the provider.</AffiliateDisclosure></div></section>

      {data.amazonProducts?.length ? <section id="pack" className="section-divider-bottom py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><SectionHeading eyebrow="Useful on either route" title="Test before departure" description="A small multi-stop kit can remove friction in either country. These are ordinary travel products, not reasons to choose a destination." /><div className="grid gap-4 sm:grid-cols-3">{data.amazonProducts.map(({ title, copy, slug, icon: Icon }) => <article key={slug} className="flex min-h-[260px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon className="text-jade" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs leading-6 text-charcoal/62">{copy}</p><a href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-dark">Check current price at Amazon <ExternalLink size={12} /></a></article>)}</div><AffiliateDisclosure className="lg:col-start-2">As an Amazon Associate we earn from qualifying purchases at no extra cost to you. Our central route supports OneLink, which may send you to a local Amazon store. Product, seller, fit, delivery and availability vary.</AffiliateDisclosure></div></section> : null}

      <FaqSplitSection eyebrow="Real search questions" title={`${data.countryA} vs ${data.countryB} FAQs`} description={data.faqDescription} items={data.faqs} />
      <RelatedGuidesSection title="Plan the route after your choice" guides={data.related} />
      <SourceMethodSection title="How this comparison was made" description={data.methodDescription} sources={data.sources} />
    </div>
  </>;
}
