import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpenText,
  Check,
  CircleAlert,
  Clock3,
  Compass,
  ExternalLink,
  MapPin,
  Route,
  Sparkles,
  SunMedium,
  TicketCheck,
} from 'lucide-react';
import type { AttractionDetailGuideData, AttractionDetailIcon } from '../../data/attraction-details/types';
import SEOHead from '../SEOHead';
import FeedbackForm from '../FeedbackForm';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { DottedRoute } from '../visuals/DottedRoute';

interface AttractionDetailGuideTemplateProps {
  data: AttractionDetailGuideData;
  klookHref: string;
}

const factIcons: Record<AttractionDetailIcon, LucideIcon> = {
  clock: Clock3,
  map: MapPin,
  route: Route,
  sparkles: Sparkles,
  sun: SunMedium,
  ticket: TicketCheck,
};

const navItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'Kort antwoord', icon: Sparkles },
  { href: '#zien', label: 'Wat je ziet', icon: Compass },
  { href: '#plan', label: 'Plan bezoek', icon: Clock3 },
  { href: '#route', label: 'Route', icon: Route },
  { href: '#respect', label: 'Respect', icon: Check },
  { href: '#vragen', label: 'Vragen', icon: BookOpenText },
];

export default function AttractionDetailGuideTemplate({ data, klookHref }: AttractionDetailGuideTemplateProps) {
  const heroActions: EditorialHeroAction[] = [
    { label: 'Plan je bezoek', href: '#plan', kind: 'primary' },
    { label: 'Bekijk passende tours', href: klookHref, kind: 'secondary', newTab: true, affiliate: true },
  ];
  const breadcrumbs = [
    { label: 'Thailand', href: '/' },
    { label: data.cityName, href: `/city/${data.citySlug}/` },
    { label: 'Bezienswaardigheden', href: `/city/${data.citySlug}/attractions/` },
    { label: data.placeName },
  ];
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: data.cityName, item: `https://go2-thailand.com/nl/city/${data.citySlug}/` },
      { '@type': 'ListItem', position: 3, name: `Bezienswaardigheden in ${data.cityName}`, item: `https://go2-thailand.com/nl/city/${data.citySlug}/attractions/` },
      { '@type': 'ListItem', position: 4, name: data.placeName, item: data.pageUrl },
    ],
  };
  const attractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${data.pageUrl}#attraction`,
    name: data.placeName,
    description: data.pageDescription,
    url: data.pageUrl,
    inLanguage: 'nl-NL',
    geo: { '@type': 'GeoCoordinates', latitude: data.coordinates.latitude, longitude: data.coordinates.longitude },
    containedInPlace: { '@type': 'City', name: data.cityName, containedInPlace: { '@type': 'Country', name: 'Thailand' } },
    mainEntityOfPage: data.pageUrl,
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: data.pageUrl,
    name: data.pageTitle,
    description: data.pageDescription,
    inLanguage: 'nl-NL',
    dateModified: data.dateModified,
  };

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.hero.image}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={breadcrumbs}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title}<span className="sr-only"> </span><span className="block text-[3rem] text-saffron-dark sm:text-[4rem] lg:text-[4.65rem]">{data.hero.accent}</span></>}
          titleClassName="max-w-[720px] text-[3.65rem] leading-[0.86] sm:text-[4.8rem] lg:text-[5.6rem]"
          subtitle={data.hero.subtitle}
          subtitleClassName="max-w-[620px] text-[1.25rem] leading-[1.08] sm:text-[1.55rem]"
          description={data.hero.description}
          actions={heroActions}
          disclosure="De tourknop is een affiliatelink naar Klook. Een eventuele commissie kost jou niets extra en bepaalt onze redactionele keuze niet."
          minHeightClassName="min-h-[760px] lg:min-h-[680px]"
          imageClassName="object-cover object-[67%_center] lg:object-center"
        />
        <div className="section-divider-bottom bg-canvas"><div className="container-custom py-3 text-[10px] font-medium leading-5 text-charcoal/48">{data.hero.imageCaption}</div></div>

        <PageSectionNav items={navItems} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="eyebrow">{data.verdict.eyebrow}</p>
              <h2 className="heading-redesign">{data.verdict.title}</h2>
              <div className="mt-5 space-y-4">{data.verdict.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-xl text-sm font-medium leading-7 text-charcoal/72">{paragraph}</p>)}</div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-jade/10 bg-tonal p-4 sm:p-6">
              <div aria-hidden="true" className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_12%_14%,rgba(242,154,56,.16),transparent_25%),radial-gradient(circle_at_88%_82%,rgba(18,63,54,.09),transparent_32%)]" />
              <div className="relative grid gap-3 sm:grid-cols-2">
                {data.verdict.facts.map((fact) => {
                  const Icon = factIcons[fact.icon];
                  return <article key={fact.label} className="rounded-xl border border-jade/10 bg-canvas/92 p-5 shadow-[0_10px_30px_rgba(18,63,54,0.05)]"><div className="flex items-center justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/25 bg-white text-jade"><Icon size={19} strokeWidth={1.65} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{fact.label}</span></div><p className="mt-5 font-display text-[1.75rem] font-semibold leading-none text-jade">{fact.value}</p><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/60">{fact.note}</p></article>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="zien" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><div><p className="eyebrow">{data.experience.eyebrow}</p><h2 className="heading-redesign">{data.experience.title}</h2></div><p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">{data.experience.intro}</p></div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.experience.details.map((detail, index) => <article key={detail.title} className="relative min-h-[245px] overflow-hidden rounded-2xl border border-jade/10 bg-canvas p-5 shadow-[0_14px_42px_rgba(18,63,54,0.055)]"><div aria-hidden="true" className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-saffron/[0.08]" /><span className="relative text-[10px] font-extrabold tracking-[0.16em] text-saffron-dark">0{index + 1}</span><h3 className="relative mt-8 font-display text-[1.55rem] font-semibold leading-none text-jade">{detail.title}</h3><p className="relative mt-4 text-xs font-medium leading-5 text-charcoal/64">{detail.description}</p></article>)}
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <article className="rounded-2xl bg-jade p-6 text-white sm:p-7"><span className="grid h-10 w-10 place-items-center rounded-xl border border-white/18 bg-white/10 text-saffron-light"><Check size={19} /></span><h3 className="mt-5 font-display text-[1.8rem] font-semibold">Past goed bij</h3><ul className="mt-5 space-y-3">{data.experience.goodFor.map((item) => <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-white/78"><Check size={15} className="mt-1 shrink-0 text-saffron-light" />{item}</li>)}</ul></article>
              <article className="rounded-2xl border border-saffron/25 bg-canvas p-6 sm:p-7"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/30 bg-white text-saffron-dark"><CircleAlert size={19} /></span><h3 className="mt-5 font-display text-[1.8rem] font-semibold text-jade">Sla over of pas aan als</h3><ul className="mt-5 space-y-3">{data.experience.skipIf.map((item) => <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-charcoal/70"><CircleAlert size={15} className="mt-1 shrink-0 text-saffron-dark" />{item}</li>)}</ul></article>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-10 lg:py-14">
          <div className="container-custom">
            <div className="relative min-h-[470px] overflow-hidden rounded-[28px] bg-jade shadow-[0_24px_70px_rgba(18,63,54,0.16)] sm:min-h-[420px]">
              <Image src={data.feature.image} alt={data.feature.imageAlt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,54,47,.96)_0%,rgba(6,54,47,.83)_38%,rgba(6,54,47,.2)_72%,rgba(6,54,47,.08)_100%)]" />
              <div className="relative flex min-h-[470px] max-w-2xl flex-col justify-center px-6 py-12 text-white sm:min-h-[420px] sm:px-10 lg:px-14">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{data.feature.eyebrow}</p>
                <h2 className="mt-4 font-display text-[2.9rem] font-semibold leading-[0.92] tracking-[-0.035em] sm:text-[3.8rem]">{data.feature.title}</h2>
                <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/78">{data.feature.description}</p>
                <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.16em] text-white/46">AI-sfeerbeeld · actuele tempelregels gaan altijd voor</p>
              </div>
            </div>
          </div>
        </section>

        <section id="plan" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><div><p className="eyebrow">{data.visitPlan.eyebrow}</p><h2 className="heading-redesign">{data.visitPlan.title}</h2></div><p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">{data.visitPlan.description}</p></div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.visitPlan.steps.map((step, index) => <article key={step.title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_14px_42px_rgba(18,63,54,0.06)]"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-xs font-extrabold text-white">{index + 1}</span><span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{step.label}</span></div><h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-none text-jade">{step.title}</h3><p className="mt-4 text-xs font-medium leading-5 text-charcoal/63">{step.description}</p></article>)}</div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 overflow-hidden bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
            <div><p className="eyebrow">{data.route.eyebrow}</p><h2 className="heading-redesign">{data.route.title}</h2><p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/70">{data.route.description}</p><Link href={`/city/${data.citySlug}/attractions/`} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Bekijk alle bezienswaardigheden <ArrowRight size={14} className="text-saffron-dark" /></Link></div>
            <div className="relative py-5"><DottedRoute className="pointer-events-none absolute -left-3 -right-3 top-1/2 hidden h-auto w-[calc(100%+1.5rem)] -translate-y-1/2 lg:block" /><div aria-hidden="true" className="absolute bottom-10 left-[2.55rem] top-10 border-l-2 border-dashed border-saffron/55 lg:hidden" /><div className="relative grid gap-4 lg:grid-cols-3">{data.route.stops.map((stop, index) => <article key={stop.title} className="min-h-[225px] rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_16px_45px_rgba(18,63,54,0.07)]"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-xs font-extrabold text-white">{index + 1}</span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">{stop.label}</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">{stop.title}</h3><p className="mt-4 text-xs font-medium leading-5 text-charcoal/62">{stop.description}</p></article>)}</div></div>
          </div>
        </section>

        <section className="section-divider-bottom bg-jade py-10 text-white lg:py-12"><div className="container-custom flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">Liever met vervoer of gids?</p><p className="mt-2 max-w-2xl font-display text-2xl font-semibold">Vergelijk alleen tours die bij je route en actuele toegang passen.</p><p className="mt-2 text-[10px] leading-5 text-white/52">Affiliatelink via Klook; controleer inclusies, ophaalzone en annuleringsvoorwaarden.</p></div><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group shrink-0">Bekijk tours op Klook <ExternalLink size={14} className="text-saffron transition group-hover:translate-x-0.5" /></a></div></section>

        <section id="respect" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><div><p className="eyebrow">{data.respect.eyebrow}</p><h2 className="heading-redesign">{data.respect.title}</h2></div><p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">{data.respect.description}</p></div><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.respect.items.map((item) => <article key={item.title} className="rounded-2xl border border-jade/10 bg-tonal p-5"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/25 bg-white text-jade"><Check size={18} /></span><h3 className="mt-5 font-display text-[1.45rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/63">{item.description}</p></article>)}</div></div></section>

        <FaqSplitSection eyebrow="Echte vragen uit de zoekresultaten" title={`Veelgestelde vragen over ${data.placeName}`} description="De vragen zijn verzameld uit de Nederlandse Google-resultaten via DataForSEO. Antwoorden zijn gecontroleerd tegen primaire en inhoudelijk relevante bronnen; veranderlijke tijden en toegang blijven bewust niet als eeuwige feiten gepresenteerd." items={data.faqs} />
        <RelatedGuidesSection title={`Plan de rest van je ${data.cityName}-route`} guides={data.relatedGuides} sideLink={{ label: 'Passende tours via Klook', href: klookHref, affiliate: true }} disclosure="De externe tourknop is een affiliatelink. Redactionele opname en volgorde zijn niet te koop." />
        <SourceMethodSection title="Hoe is deze bezoekgids onderzocht?" description="De zoekvraag, concurrenten en echte PAA’s komen uit DataForSEO voor Google Nederland. Historie, symboliek en ligging zijn gecontroleerd met officiële of primaire regionale bronnen en duidelijk benoemde secundaire bronnen." sources={data.sources} />
        <section className="py-10 lg:py-12"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
      </div>
    </>
  );
}
