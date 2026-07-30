import Image from 'next/image';
import { AlertTriangle, CheckCircle2, CircleHelp, Route, ShieldCheck } from 'lucide-react';
import SEOHead from '../SEOHead';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

export interface PracticalDecisionData {
  slug: string;
  updatedAt: string;
  seo: { title: string; description: string; image: string };
  hero: { eyebrow: string; title: string; accent: string; description: string; imageAlt: string; primary: string };
  intro: { eyebrow: string; title: string; description: string; cards: Array<{ title: string; label: string; text: string }> };
  patterns: Array<{ title: string; signal: string; text: string; response: string; image?: string; imageAlt?: string }>;
  steps: Array<{ title: string; text: string }>;
  checklist: Array<{ title: string; text: string }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  sourceDescription: string;
}

function schemas(data: PracticalDecisionData) {
  const url = `https://go2-thailand.com/nl/practical-info/${data.slug}/`;
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: data.seo.title, description: data.seo.description, image: `https://go2-thailand.com${data.seo.image}`, mainEntityOfPage: url, inLanguage: 'nl-NL', dateModified: data.updatedAt, author: { '@type': 'Organization', name: 'Go2 Thailand' }, publisher: { '@type': 'Organization', name: 'Go2 Thailand' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Praktische informatie', item: 'https://go2-thailand.com/nl/practical-info/' },
      { '@type': 'ListItem', position: 3, name: data.seo.title, item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: data.intro.title, step: data.steps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step.title, text: step.text })) },
  ];
}

export default function PracticalDecisionGuideTemplate({ data }: { data: PracticalDecisionData }) {
  const nav = [
    { href: '#orientatie' as const, label: 'Oriëntatie', icon: ShieldCheck },
    { href: '#patronen' as const, label: 'Herkennen', icon: AlertTriangle },
    { href: '#route' as const, label: 'Stappenplan', icon: Route },
    { href: '#checklist' as const, label: 'Checklist', icon: CheckCircle2 },
    { href: '#vragen' as const, label: 'Vragen', icon: CircleHelp },
  ];
  return <>
    <SEOHead title={data.seo.title} description={data.seo.description} ogImage={data.seo.image}>
      {schemas(data).map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div data-premium-template={`practical-decision-${data.slug}`} className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero image={data.seo.image} imageAlt={data.hero.imageAlt} breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Praktische info', href: '/practical-info/' }, { label: data.hero.accent }]} eyebrow={data.hero.eyebrow} title={<>{data.hero.title}<br /><span className="text-saffron-dark">{data.hero.accent}</span></>} description={data.hero.description} actions={[{ label: data.hero.primary, href: '#patronen', kind: 'primary' }, { label: 'Open de checklist', href: '#checklist', kind: 'secondary' }]} minHeightClassName="min-h-[720px] lg:min-h-[690px]" contentClassName="max-w-[680px]" titleClassName="max-w-[680px] text-[4rem] leading-[0.84] sm:text-[5rem] lg:text-[5.7rem]" imageClassName="object-cover object-[68%_center] lg:object-center" />
      <PageSectionNav items={nav} />

      <section id="orientatie" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <SectionHeading eyebrow={data.intro.eyebrow} title={data.intro.title} description={data.intro.description} />
        <div className="grid gap-4 md:grid-cols-3">{data.intro.cards.map((card, index) => <article key={card.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/35 font-display text-lg text-saffron-dark">0{index + 1}</span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{card.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-none text-jade">{card.title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/60">{card.text}</p></article>)}</div>
      </div></section>

      <section id="patronen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Herken het beslismoment" title="Patroon vóór probleem." description="Een bruikbaar signaal vertelt je wat je nu moet controleren. Namen, bedragen en platforms kunnen veranderen; het beslispatroon blijft langer bruikbaar." /><div className="mt-10 grid gap-5 md:grid-cols-2">{data.patterns.map((item, index) => <article key={item.title} className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">{item.image ? <div className="relative h-48"><Image src={item.image} alt={item.imageAlt || ''} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div> : null}<div className="p-6 sm:p-7"><div className="flex items-center justify-between"><span className="font-display text-2xl text-saffron-dark">0{index + 1}</span><span className="rounded-full bg-mist px-3 py-1.5 text-[9px] font-extrabold text-jade">{item.signal}</span></div><h2 className="mt-4 font-display text-[2rem] font-semibold leading-none text-jade">{item.title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/60">{item.text}</p><p className="mt-5 border-t border-jade/10 pt-5 text-xs font-semibold leading-6 text-jade"><strong className="text-saffron-dark">Jouw reactie:</strong> {item.response}</p></div></article>)}</div></div></section>

      <section id="route" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-12 lg:grid-cols-[0.72fr_1.28fr]"><SectionHeading eyebrow="Als het gebeurt" title="Eén rustige volgorde." description="Bewaar deze route offline. Onder druk helpt een korte volgorde beter dan losse tips." /><ol className="divide-y divide-jade/10 border-y border-jade/10">{data.steps.map((step, index) => <li key={step.title} className="grid gap-4 py-6 sm:grid-cols-[55px_190px_1fr]"><span className="font-display text-3xl text-saffron-dark">0{index + 1}</span><strong className="font-display text-xl font-semibold text-jade">{step.title}</strong><span className="text-xs font-medium leading-6 text-charcoal/60">{step.text}</span></li>)}</ol></div></section>

      <section id="checklist" className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-20"><div className="container-custom"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="eyebrow !text-saffron-light">Voor vertrek en ter plekke</p><h2 className="font-display text-[3.5rem] font-semibold leading-[0.88]">Sla de controle<br />offline op.</h2></div><div className="grid gap-4 sm:grid-cols-2">{data.checklist.map((item) => <article key={item.title} className="rounded-2xl border border-white/14 bg-white/[0.06] p-5"><CheckCircle2 size={19} className="text-saffron-light" /><h3 className="mt-4 font-display text-2xl font-semibold">{item.title}</h3><p className="mt-3 text-xs font-medium leading-5 text-white/64">{item.text}</p></article>)}</div></div></div></section>

      <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title={`Veelgestelde vragen over ${data.hero.accent.toLowerCase()}`} description="Actuele Nederlandse People Also Ask-vragen, met grenzen tussen deze owner en bredere veiligheid, budget of wetgeving." items={data.faqs} />
      <RelatedGuidesSection eyebrow="De volgende owner" title="Controleer de rest van je voorbereiding" guides={data.related} />
      <SourceMethodSection eyebrow="Bronnen & actualiteit" title="Hoe deze gids is opgebouwd" description={data.sourceDescription} sources={data.sources} />
    </div>
  </>;
}
