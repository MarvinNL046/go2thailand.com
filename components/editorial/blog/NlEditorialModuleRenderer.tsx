import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, CircleAlert, ExternalLink, MapPin, Route } from 'lucide-react';
import type { DeepReadonly, NlEditorialBlock, NlEditorialCard, NlEditorialLink } from '../../../data/editorial/blog/types';
import { FaqSplitSection } from '../../design/FaqSplitSection';
import { SectionHeading } from '../../design/SectionHeading';
import { SourceMethodSection } from '../../design/SourceMethodSection';
import { NlEditorialAffiliateBlock } from './NlEditorialAffiliateBlock';

interface NlEditorialModuleRendererProps {
  block: DeepReadonly<NlEditorialBlock>;
  fallbackImage: `/${string}`;
}

function isExternalLink(link: DeepReadonly<NlEditorialLink>) {
  return Boolean(link.external || /^https?:\/\//i.test(link.href));
}

function EditorialLink({ link, className }: { link: DeepReadonly<NlEditorialLink>; className: string }) {
  const content = <>{link.label}{isExternalLink(link) ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}</>;
  return isExternalLink(link)
    ? <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
    : <Link href={link.href} className={className}>{content}</Link>;
}

function Card({ card, index }: { card: DeepReadonly<NlEditorialCard>; index: number }) {
  const content = (
    <>
      {card.image ? (
        <div className="relative h-44 overflow-hidden">
          <Image src={card.image} alt={card.imageAlt || ''} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
        </div>
      ) : null}
      <div className="flex min-h-[220px] flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{card.label || `Keuze ${String(index + 1).padStart(2, '0')}`}</span>
          <MapPin size={17} aria-hidden="true" className="text-jade/45" />
        </div>
        <h3 className="mt-5 font-display text-[1.75rem] font-semibold leading-none text-jade">{card.title}</h3>
        <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{card.description}</p>
        {card.note ? <p className="mt-3 border-l border-saffron/40 pl-3 text-[10px] font-bold leading-5 text-charcoal/52">{card.note}</p> : null}
        {card.href ? <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-extrabold text-jade">Bekijk deze keuze <ArrowRight size={14} aria-hidden="true" className="text-saffron-dark transition group-hover:translate-x-1" /></span> : null}
      </div>
    </>
  );
  const className = "group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card transition hover:-translate-y-0.5 hover:border-saffron/35";

  if (!card.href) return <article className={className}>{content}</article>;
  if (/^https?:\/\//i.test(card.href)) return <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>;
  return <Link href={card.href} className={className}>{content}</Link>;
}

function PlainProseBlock({ markdown }: { markdown: string }) {
  return (
    <div className="mx-auto max-w-[820px] text-[15px] font-medium leading-8 text-charcoal/78">
      {markdown.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 32)}-${index}`} className="my-5 whitespace-pre-line">{paragraph}</p>
      ))}
    </div>
  );
}

export function NlEditorialModuleRenderer({ block, fallbackImage }: NlEditorialModuleRendererProps) {
  switch (block.kind) {
    case 'prose':
      return (
        <section id={block.id} className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            {block.title ? <h2 className="mx-auto mb-7 max-w-[820px] font-display text-[2.65rem] font-semibold leading-[0.95] text-jade">{block.title}</h2> : null}
            <PlainProseBlock markdown={block.markdown} />
          </div>
        </section>
      );
    case 'card-grid':
    case 'comparison': {
      const cards = block.kind === 'card-grid' ? block.cards : block.options;
      return (
        <section id={block.id} className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow={block.kind === 'comparison' ? 'Naast elkaar' : block.eyebrow || 'Kies bewust'} title={block.title} description={block.description} />
            <div className={`mt-9 grid gap-5 ${cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
              {cards.map((card, index) => <Card key={`${block.id}-${card.title}`} card={card} index={index} />)}
            </div>
          </div>
        </section>
      );
    }
    case 'steps':
      return (
        <section id={block.id} className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Stap voor stap" title={block.title} description={block.description} />
            <div className="relative mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <div className="pointer-events-none absolute left-7 right-7 top-7 hidden border-t border-dashed border-saffron/60 xl:block" />
              {block.steps.map((step, index) => (
                <article key={`${block.id}-${step.title}`} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-saffron/35 bg-canvas font-display text-xl font-semibold text-jade">{index + 1}</span>
                  <h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{step.title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{step.description}</p>
                  {step.note ? <p className="mt-4 text-[10px] font-bold leading-5 text-saffron-dark">{step.note}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case 'checklist':
      return (
        <section id={block.id} className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-ivory lg:py-20">
          <div className="container-custom grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div><p className="eyebrow !text-saffron-light">Controle voor vertrek</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em]">{block.title}</h2></div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {block.items.map((item) => <li key={item} className="flex gap-3 rounded-xl border border-white/12 bg-white/[0.06] p-4 text-xs font-medium leading-6 text-white/72"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={14} aria-hidden="true" /></span>{item}</li>)}
            </ul>
          </div>
        </section>
      );
    case 'callout': {
      const dark = block.tone === 'jade' || block.tone === 'warning';
      const toneClass = dark ? 'bg-jade text-ivory' : block.tone === 'saffron' ? 'bg-[#fff0d7] text-jade' : 'bg-tonal text-jade';
      return (
        <section id={block.id} className="section-divider-bottom scroll-mt-24 py-12 lg:py-16">
          <div className="container-custom">
            <aside className={`relative overflow-hidden rounded-[28px] px-7 py-9 shadow-editorial-card sm:px-10 ${toneClass}`}>
              <Route size={110} aria-hidden="true" className={`absolute -bottom-8 -right-5 rotate-12 ${dark ? 'text-white/[0.06]' : 'text-jade/[0.06]'}`} />
              <div className="relative max-w-[780px]"><CircleAlert size={23} aria-hidden="true" className={dark ? 'text-saffron-light' : 'text-saffron-dark'} /><h2 className="mt-5 font-display text-[2.65rem] font-semibold leading-[0.92]">{block.title}</h2><p className={`mt-4 text-sm font-medium leading-7 ${dark ? 'text-white/67' : 'text-charcoal/68'}`}>{block.description}</p>{block.cta ? <EditorialLink link={block.cta} className={`mt-6 inline-flex items-center gap-2 text-xs font-extrabold ${dark ? 'text-saffron-light' : 'text-jade'}`} /> : null}</div>
            </aside>
          </div>
        </section>
      );
    }
    case 'faq':
      return <FaqSplitSection id={block.id} eyebrow="Veelgestelde vragen" title={block.title} items={block.items} />;
    case 'sources':
      return <SourceMethodSection title={block.title} description="De belangrijkste bronnen achter de controleerbare details op deze pagina." method="Controleer tijdgevoelige informatie opnieuw via de gelinkte primaire bron." sources={block.items.map((source) => ({ title: source.title, creator: source.publisher, url: source.url, note: source.note || `Gecontroleerd op ${source.checkedAt}.` }))} />;
    case 'related':
      return (
        <section id={block.id} className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom"><SectionHeading eyebrow="Verder lezen" title={block.title} /><div className="mt-8 grid gap-5 md:grid-cols-3">{block.items.map((card, index) => <Card key={`${block.id}-${card.title}`} card={{ ...card, image: card.image || fallbackImage, imageAlt: card.imageAlt || card.title }} index={index} />)}</div></div>
        </section>
      );
    case 'affiliate':
      return <NlEditorialAffiliateBlock block={block} />;
  }
}
