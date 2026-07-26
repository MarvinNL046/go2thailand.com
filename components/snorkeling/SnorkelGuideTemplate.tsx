import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Anchor,
  ArrowRight,
  Binoculars,
  Check,
  Compass,
  Eye,
  Footprints,
  Leaf,
  ShieldCheck,
  Ship,
  Sun,
  Turtle,
  Waves,
  Wind,
} from 'lucide-react';
import type { SnorkelGuideData, SnorkelGuideIcon } from '../../data/snorkeling/types';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import FeedbackForm from '../FeedbackForm';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface SnorkelGuideTemplateProps {
  data: SnorkelGuideData;
}

const iconMap: Record<SnorkelGuideIcon, LucideIcon> = {
  anchor: Anchor,
  binoculars: Binoculars,
  compass: Compass,
  eye: Eye,
  footprints: Footprints,
  leaf: Leaf,
  shield: ShieldCheck,
  ship: Ship,
  sun: Sun,
  turtle: Turtle,
  waves: Waves,
  wind: Wind,
};

const sectionNavItems: PageSectionNavItem[] = [
  { href: '#condities', label: 'Condities', icon: Wind },
  { href: '#baaien', label: 'Baaien', icon: Compass },
  { href: '#toegang', label: 'Strand of boot', icon: Ship },
  { href: '#wildlife', label: 'Wildlife', icon: Turtle },
  { href: '#meenemen', label: 'Meenemen', icon: ShieldCheck },
];

export function SnorkelGuideTemplate({ data }: SnorkelGuideTemplateProps) {
  const klookHref = withPlacementSubId(KLOOK_GENERIC, `${data.slug}-snorkeling`);
  const parentGuideUrl = `https://go2-thailand.com/nl${data.parentGuideHref}`;
  const heroActions: EditorialHeroAction[] = [
    { label: 'Kies je baai', href: '#condities', kind: 'primary' },
    { label: 'Bekijk snorkeluitjes', href: klookHref, kind: 'secondary', newTab: true, affiliate: true },
  ];
  const breadcrumbs = [
    { label: 'Thailand', href: '/' },
    { label: data.destinationName, href: data.parentGuideHref },
    { label: 'Snorkelen' },
  ];
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Snorkelbaaien rond ${data.destinationName}`,
    numberOfItems: data.bayProfiles.length,
    itemListElement: data.bayProfiles.map((bay, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: bay.title,
      description: bay.bestFor,
      url: `${data.pageUrl}#${bay.slug}`,
    })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: data.destinationName, item: parentGuideUrl },
      { '@type': 'ListItem', position: 3, name: 'Snorkelen', item: data.pageUrl },
    ],
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${data.pageUrl}#webpage`,
    url: data.pageUrl,
    name: data.pageTitle,
    description: data.pageDescription,
    inLanguage: 'nl-NL',
    dateModified: data.dateModified,
  };

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.hero.image}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={breadcrumbs}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title} <span className="mt-2 block text-[2.65rem] leading-none text-saffron-dark sm:text-[4rem] lg:text-[4.7rem]">{data.hero.accent}</span></>}
          titleClassName="max-w-[620px] text-[4rem] leading-[0.85] sm:text-[5.4rem] lg:text-[6rem]"
          subtitle={data.hero.subtitle}
          subtitleClassName="max-w-[600px] text-[1.45rem] leading-[1.1] sm:text-[1.75rem]"
          description={data.hero.description}
          actions={heroActions}
          disclosure="De snorkeluitjesknop is een affiliatelink. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra."
          minHeightClassName="min-h-[760px] lg:min-h-[650px]"
          imageClassName={data.hero.imageClassName || 'object-cover object-center'}
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.08)_0%,rgba(252,250,246,0.48)_45%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.9)_36%,rgba(252,250,246,0.18)_66%,rgba(18,63,54,0.04)_100%)]"
        />

        <PageSectionNav items={sectionNavItems} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow">{data.quickAnswer.eyebrow}</p>
              <h2 className="heading-redesign">{data.quickAnswer.title}</h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/70">{data.quickAnswer.description}</p>
              <Link href={data.activitiesGuideHref} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Bekijk de complete Koh Tao-route <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {data.quickAnswer.stats.map((stat) => {
                const Icon = iconMap[stat.icon];
                return <div key={stat.label} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_8px_28px_rgba(18,63,54,0.05)]"><Icon size={26} strokeWidth={1.45} className="text-saffron-dark" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] text-charcoal/42">{stat.label}</p><p className="mt-1 font-display text-2xl font-semibold text-jade">{stat.value}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section id="condities" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div><p className="eyebrow">Lees eerst de zee</p><h2 className="heading-redesign">Vier signalen vóór je een baai kiest</h2></div>
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/66 lg:justify-self-end">Een bekende naam lost geen tegenwind, moeilijke instap of beperkt zicht op. Gebruik deze vragen als ochtendcheck met je accommodatie, gids of bootoperator.</p>
            </div>
            <div className="relative mt-10 grid gap-4 lg:grid-cols-4">
              <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden border-t-2 border-dashed border-saffron/55 lg:block" />
              {data.conditionSignals.map((signal, index) => {
                const Icon = iconMap[signal.icon];
                return <article key={signal.title} className="relative rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_8px_28px_rgba(18,63,54,0.045)]"><span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={22} strokeWidth={1.45} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Signaal 0{index + 1}</p><h3 className="mt-2 font-display text-2xl font-semibold leading-none text-jade">{signal.title}</h3><p className="mt-4 text-[11px] font-bold leading-5 text-jade">{signal.question}</p><p className="mt-3 text-[10px] leading-4 text-charcoal/58">{signal.decision}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="baaien" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl"><p className="eyebrow">Geen ranglijst maar profielen</p><h2 className="heading-redesign">Zes snorkelbaaien met een eigen trade-off</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">Gebruik deze namen om gerichte vragen te stellen. De uiteindelijke keuze blijft afhankelijk van actuele toegang en omstandigheden.</p></div>
            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.bayProfiles.map((bay, index) => {
                const Icon = iconMap[bay.icon];
                return <article id={bay.slug} key={bay.slug} className="scroll-mt-24 rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_9px_30px_rgba(18,63,54,0.05)]"><div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={23} strokeWidth={1.4} /></span><span className="text-[10px] font-extrabold tracking-[0.18em] text-saffron-dark">0{index + 1}</span></div><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{bay.side}</p><h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{bay.title}</h3><p className="mt-4 inline-flex rounded-lg bg-tonal px-3 py-2 text-[9px] font-extrabold text-jade">{bay.access}</p><p className="mt-5 text-xs leading-5 text-charcoal/65"><strong className="text-jade">Past bij:</strong> {bay.bestFor}</p><p className="mt-3 text-xs leading-5 text-charcoal/62"><strong className="text-jade">Kies bij:</strong> {bay.conditions}</p><p className="mt-4 border-l-2 border-saffron/45 pl-4 text-[10px] leading-4 text-charcoal/56">{bay.caveat}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="toegang" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_16px_50px_rgba(18,63,54,0.07)]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[430px] overflow-hidden"><Image src={data.accessChoice.image} alt={data.accessChoice.imageAlt} fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/88 via-jade/5 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white"><p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{data.accessChoice.eyebrow}</p><h2 className="mt-3 max-w-lg font-display text-[3rem] font-semibold leading-[0.9]">{data.accessChoice.title}</h2><p className="mt-4 max-w-lg text-xs leading-5 text-white/74">{data.accessChoice.description}</p></div></div>
              <div className="grid gap-4 p-6 sm:p-8 lg:p-10">
                {data.accessChoice.options.map((option) => {
                  const Icon = iconMap[option.icon];
                  return <article key={option.title} className="rounded-2xl border border-jade/10 bg-canvas p-6"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-white text-jade"><Icon size={21} strokeWidth={1.45} /></span><div><h3 className="font-display text-2xl font-semibold leading-none text-jade">{option.title}</h3><p className="mt-2 text-[10px] font-bold leading-4 text-charcoal/60">{option.bestFor}</p></div></div><ul className="mt-5 grid gap-2 sm:grid-cols-3">{option.benefits.map((benefit) => <li key={benefit} className="flex gap-2 text-[10px] font-bold leading-4 text-jade"><Check size={13} className="mt-0.5 shrink-0 text-saffron-dark" />{benefit}</li>)}</ul><p className="mt-5 border-t border-jade/10 pt-4 text-[10px] leading-4 text-charcoal/58">{option.tradeoff}</p></article>;
                })}
                <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern w-fit">Vergelijk snorkeluitjes <ArrowRight size={14} className="text-saffron" /></a>
                <p className="text-[9px] text-charcoal/45">Affiliatelink — wij kunnen commissie ontvangen zonder dat jouw prijs verandert.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="wildlife" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative min-h-[470px] overflow-hidden rounded-2xl"><Image src={data.responsibleFeature.image} alt={data.responsibleFeature.imageAlt} fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/90 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7"><p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{data.responsibleFeature.eyebrow}</p><h2 className="mt-3 max-w-lg font-display text-[3rem] font-semibold leading-[0.9]">{data.responsibleFeature.title}</h2><p className="mt-4 max-w-lg text-xs leading-5 text-white/74">{data.responsibleFeature.description}</p></div></div>
            <div className="divide-y divide-white/12 border-y border-white/12">{data.responsibleFeature.rules.map((rule, index) => <div key={rule.title} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/35 text-xs font-extrabold text-saffron-light">0{index + 1}</span><div><h3 className="font-display text-2xl font-semibold text-white">{rule.title}</h3><p className="mt-2 text-xs leading-5 text-white/65">{rule.description}</p></div></div>)}</div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow">Eerlijke verwachtingen</p><h2 className="heading-redesign">Wat kun je onder water tegenkomen?</h2></div><p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/66 lg:justify-self-end">Plan je dag voor het rif en het water, niet voor één dier. Daarmee blijft een snorkelsessie ook geslaagd wanneer de schildpad of rifhaai een andere route kiest.</p></div>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">{data.wildlife.map((item) => { const Icon = iconMap[item.icon]; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_8px_28px_rgba(18,63,54,0.045)]"><Icon size={34} strokeWidth={1.35} className="text-saffron-dark" /><h3 className="mt-6 font-display text-[2rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-4 text-xs leading-5 text-charcoal/64">{item.expectation}</p><p className="mt-5 rounded-xl bg-tonal p-4 text-[10px] font-bold leading-4 text-jade">{item.behaviour}</p></article>; })}</div>
          </div>
        </section>

        <section id="meenemen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl"><p className="eyebrow">Compact en functioneel</p><h2 className="heading-redesign">Wat neem je mee voor een snorkeldag?</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">Neem alleen mee wat pasvorm, comfort en bescherming verbetert. Huren blijft prima wanneer een operator meerdere maten heeft en materiaal zorgvuldig onderhoudt.</p></div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{data.gear.map((item) => { const Icon = iconMap[item.icon]; return <article key={item.title} className="flex min-h-[230px] flex-col rounded-2xl border border-jade/10 bg-white p-6"><Icon size={30} strokeWidth={1.35} className="text-jade" /><h3 className="mt-5 font-display text-[1.7rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/63">{item.description}</p>{item.amazonSlug && <a href={`/go/${item.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-extrabold text-saffron-dark hover:text-jade">{item.amazonLabel} op Amazon <ArrowRight size={12} /></a>}</article>; })}</div>
            <AffiliateDisclosure className="mt-5">Drybag, waterschoenen en handdoek zijn Amazon-affiliatelinks via onze centrale landroutering. Wij kunnen aan een aankoop verdienen zonder extra kosten voor jou. Controleer prijs, maat, verkoper, levering en geschiktheid zelf.</AffiliateDisclosure>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom"><p className="eyebrow">Voor je reserveert</p><h2 className="heading-redesign">Vier afspraken die een betere tour opleveren</h2><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.bookingChecklist.map((item) => { const Icon = iconMap[item.icon]; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6"><Icon size={34} strokeWidth={1.35} className="text-saffron-dark" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/63">{item.description}</p></article>; })}</div></div>
        </section>

        <FaqSplitSection eyebrow="Echte vragen uit de zoekresultaten" title="Veelgestelde vragen over snorkelen op Koh Tao" description="De vragen komen uit Nederlandse People Also Ask-resultaten van DataForSEO. Antwoorden gebruiken lokale en officiële bronnen en vermijden wildlife- en weerbeloftes." items={data.faqs} />

        <RelatedGuidesSection title="Bouw je Koh Tao-reis rond de zee" guides={data.relatedGuides} sideLink={{ label: 'Snorkeluitjes via Klook', href: klookHref, affiliate: true }} disclosure="Klook is een affiliatepartner. Een eventuele commissie verandert jouw prijs niet." />

        <SourceMethodSection title="Hoe is deze snorkelgids samengesteld?" description="We combineren Nederlandse DFS-zoekdata met lokale toerisme-informatie, officiële bestemmingscontext en rifmonitoring. De pagina rangschikt geen baai op betaalde plaatsing en behandelt wildlife nooit als garantie." sources={data.sources} />

        <section className="py-10 lg:py-12"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
      </div>
    </>
  );
}
