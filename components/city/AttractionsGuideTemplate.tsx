import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Camera,
  Check,
  Clock3,
  Compass,
  Footprints,
  Landmark,
  MapPin,
  Mountain,
  Ship,
  Sparkles,
  TreePine,
  Waves,
} from 'lucide-react';
import type { AttractionGuideData, AttractionHighlight, AttractionIcon } from '../../data/attractions/types';
import { cityAffiliates, KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import FeedbackForm from '../FeedbackForm';
import SEOHead from '../SEOHead';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface AttractionsGuideTemplateProps {
  data: AttractionGuideData;
}

const iconMap: Record<AttractionIcon, LucideIcon> = {
  calendar: CalendarDays,
  camera: Camera,
  compass: Compass,
  footprints: Footprints,
  landmark: Landmark,
  map: MapPin,
  mountain: Mountain,
  ship: Ship,
  sparkles: Sparkles,
  tree: TreePine,
  waves: Waves,
};

const sectionNavItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'Kort antwoord', icon: Sparkles },
  { href: '#mooiste-plekken', label: 'Mooiste plekken', icon: Compass },
  { href: '#kiezen', label: 'Kiezen', icon: Waves },
  { href: '#route', label: 'Route', icon: MapPin },
  { href: '#vragen', label: 'Vragen', icon: BookOpenText },
];

function schemaItemUrl(data: AttractionGuideData, item: AttractionHighlight) {
  if (item.href?.startsWith('https://')) return item.href;
  if (item.href?.startsWith('/')) return `https://go2-thailand.com/nl${item.href}`;
  return `${data.pageUrl}#${item.slug}`;
}

function HighlightCard({ cityName, item, index }: { cityName: string; item: AttractionHighlight; index: number }) {
  const content = (
    <>
      <div className="relative min-h-[235px] overflow-hidden sm:min-h-full">
        <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 24vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-jade-dark/62 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 grid h-9 min-w-9 place-items-center rounded-lg bg-white/92 px-2 text-xs font-extrabold text-jade shadow-sm backdrop-blur">{String(index + 1).padStart(2, '0')}</span>
        <span className="absolute bottom-4 left-4 rounded-md bg-jade/88 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white backdrop-blur">{item.type}</span>
      </div>
      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[10px] font-extrabold text-charcoal/45"><Clock3 size={13} className="text-saffron-dark" /> {item.duration}</div>
        <h3 className="mt-3 font-display text-[1.65rem] font-semibold leading-none tracking-[-0.02em] text-jade">{item.title}</h3>
        <p className="mt-3 text-xs font-medium leading-5 text-charcoal/65">{item.description}</p>
        <div className="mt-4 space-y-2 border-t border-jade/10 pt-4 text-[10px] leading-4">
          <p className="flex gap-2 text-jade"><Check size={13} className="mt-0.5 shrink-0 text-saffron-dark" /><span><strong>Past goed bij:</strong> {item.bestFor}</span></p>
          <p className="flex gap-2 text-charcoal/58"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-jade/30" /><span>{item.tradeoff}</span></p>
        </div>
        {item.href ? <span className="mt-auto inline-flex items-center justify-end gap-2 pt-5 text-xs font-extrabold text-jade transition group-hover:text-saffron-dark">Lees de gids <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span> : <span className="mt-auto pt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-charcoal/38">Onderdeel van deze {cityName}-route</span>}
      </div>
    </>
  );

  return (
    <article id={item.slug} className="group scroll-mt-24 overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_8px_28px_rgba(18,63,54,0.045)] transition hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(18,63,54,0.09)]">
      {item.href ? <Link href={item.href} className="grid h-full sm:grid-cols-[42%_58%]">{content}</Link> : <div className="grid h-full sm:grid-cols-[42%_58%]">{content}</div>}
    </article>
  );
}

export function AttractionsGuideTemplate({ data }: AttractionsGuideTemplateProps) {
  const parentGuideHref = data.parentGuideHref || `/city/${data.citySlug}/`;
  const parentGuideUrl = parentGuideHref.startsWith('http')
    ? parentGuideHref
    : `https://go2-thailand.com/nl${parentGuideHref.startsWith('/') ? parentGuideHref : `/${parentGuideHref}`}`;
  const breadcrumbLabel = data.breadcrumbLabel || 'Bezienswaardigheden';
  const klookHref = withPlacementSubId(cityAffiliates[data.citySlug]?.klook || KLOOK_GENERIC, `${data.citySlug}-attractions`);
  const heroActions: EditorialHeroAction[] = [
    { label: 'Bekijk de plekken', href: '#mooiste-plekken', kind: 'primary' },
    { label: 'Vind een uitje', href: klookHref, kind: 'secondary', newTab: true, affiliate: true },
  ];
  const breadcrumbs = [
    { label: 'Thailand', href: '/' },
    { label: data.cityName, href: parentGuideHref },
    { label: breadcrumbLabel },
  ];
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Mooiste bezienswaardigheden in ${data.cityName}`,
    numberOfItems: data.highlights.length,
    itemListElement: data.highlights.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.description,
      url: schemaItemUrl(data, item),
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
      { '@type': 'ListItem', position: 2, name: data.cityName, item: parentGuideUrl },
      { '@type': 'ListItem', position: 3, name: breadcrumbLabel, item: data.pageUrl },
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
          title={<>{data.hero.title} <span className="mt-3 block break-words text-[2.05rem] leading-none text-saffron-dark sm:mt-0 sm:text-[3.45rem] lg:text-[3.9rem]">{data.hero.accent}</span></>}
          titleClassName="max-w-[620px] text-[3.4rem] leading-[0.96] tracking-[-0.048em] sm:text-[5.25rem] sm:leading-[0.83] lg:text-[6.1rem]"
          subtitle={data.hero.subtitle}
          subtitleClassName="max-w-[560px] text-[1.55rem] leading-[1.08] sm:text-[1.85rem]"
          description={data.hero.description}
          descriptionClassName="mt-4 max-w-[570px] text-sm leading-6"
          actions={heroActions}
          disclosure="De uitjesknop is een affiliatelink. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra."
          minHeightClassName="min-h-[700px] lg:min-h-[630px]"
          contentClassName="max-w-[640px]"
          imageClassName={data.hero.imageClassName || 'object-cover object-center'}
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.12)_0%,rgba(252,250,246,0.42)_45%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.9)_36%,rgba(252,250,246,0.22)_64%,rgba(18,63,54,0.08)_100%)]"
        />

        <PageSectionNav items={sectionNavItems} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.92fr_1.35fr] lg:items-center">
            <div>
              <p className="eyebrow">{data.quickAnswer.eyebrow}</p>
              <h2 className="heading-redesign">{data.quickAnswer.title}</h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/70">{data.quickAnswer.description}</p>
              <Link href={parentGuideHref} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Terug naar de complete {data.cityName}-gids <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {data.quickAnswer.stats.map((stat) => {
                const Icon = iconMap[stat.icon];
                return <div key={stat.label} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_7px_24px_rgba(18,63,54,0.045)]"><Icon size={24} strokeWidth={1.5} className="text-saffron-dark" /><p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-charcoal/42">{stat.label}</p><p className="mt-1 font-display text-2xl font-semibold text-jade">{stat.value}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section id="mooiste-plekken" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="mb-9 max-w-3xl"><p className="eyebrow">De redactionele selectie</p><h2 className="heading-redesign">{data.selectionTitle || `De mooiste bezienswaardigheden van ${data.cityName}`}</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">Niet iedere bekende plek past in dezelfde reis. Daarom staat bij elke keuze ook de praktische keerzijde.</p></div>
            <div className="grid gap-5 md:grid-cols-2">{data.highlights.map((item, index) => <HighlightCard key={item.slug} cityName={data.cityName} item={item} index={index} />)}</div>
          </div>
        </section>

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end"><div><p className="eyebrow">Kies op reisstijl</p><h2 className="heading-redesign">Welke activiteit past bij jouw reis?</h2></div><p className="max-w-xl text-sm font-medium leading-7 text-charcoal/65 lg:justify-self-end">Gebruik dit als filter. Je hoeft niet uit iedere categorie iets te kiezen; een sterke route combineert een paar duidelijke contrasten zonder je dagen vol te proppen.</p></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.activityTypes.map((item) => { const Icon = iconMap[item.icon]; return <article key={item.title} className="flex min-h-[270px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_7px_24px_rgba(18,63,54,0.04)]"><Icon size={40} strokeWidth={1.35} className="text-jade" /><h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/64">{item.description}</p><p className="mt-auto border-t border-jade/10 pt-4 text-[10px] font-extrabold leading-4 text-saffron-dark">{item.picks}</p></article>; })}
            </div>
            <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl bg-jade px-6 py-6 text-white shadow-[0_12px_32px_rgba(18,63,54,0.16)] sm:flex-row sm:items-center lg:px-8"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">Uitjes via Klook</p><p className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-tight">Vergelijk actuele tours zonder de redactionele route uit het oog te verliezen.</p></div><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream shrink-0">Bekijk activiteiten <ArrowRight size={14} className="text-saffron-dark" /></a></div>
            <p className="mt-2 text-[9px] text-charcoal/45">Affiliatelink — wij kunnen commissie ontvangen bij een boeking, zonder extra kosten voor jou.</p>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_10px_34px_rgba(18,63,54,0.06)] lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative min-h-[440px] overflow-hidden lg:min-h-full"><Image src={data.feature.image} alt={data.feature.imageAlt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/90 via-jade/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white lg:p-9"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">{data.feature.eyebrow}</p><p className="mt-3 max-w-md font-display text-[2.35rem] font-semibold leading-[0.94]">{data.feature.title}</p><p className="mt-4 max-w-md text-xs leading-5 text-white/76">{data.feature.description}</p></div></div>
            <div className="p-7 lg:p-10"><p className="eyebrow">{data.feature.panelEyebrow}</p><h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade sm:text-[3.55rem]">{data.feature.panelTitle}</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">{data.feature.panelDescription}</p><div className="mt-7 divide-y divide-jade/10 border-y border-jade/10">{data.feature.groups.map((group) => <div key={group.title} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr]"><h3 className="font-display text-xl font-semibold text-jade">{group.title}</h3><p className="text-xs leading-5 text-charcoal/62">{group.description}</p></div>)}</div></div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom"><div className="mb-8 max-w-3xl"><p className="eyebrow">{data.route.eyebrow}</p><h2 className="heading-redesign">{data.route.title}</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">{data.route.description}</p></div><div className="relative grid gap-5 lg:grid-cols-3"><div aria-hidden="true" className="absolute left-[12%] right-[12%] top-7 hidden border-t-2 border-dashed border-saffron/50 lg:block" />{data.route.days.map((day, index) => <Link key={day.day} href={day.href} className="group relative rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_7px_24px_rgba(18,63,54,0.045)] transition hover:-translate-y-1 hover:border-saffron/35"><div className="relative z-10 flex items-center justify-between"><span className="grid h-14 w-14 place-items-center rounded-full border-4 border-canvas bg-saffron text-sm font-extrabold text-white shadow-sm">{index + 1}</span><ArrowRight size={16} className="text-jade transition group-hover:translate-x-1 group-hover:text-saffron-dark" /></div><p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{day.day}</p><h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-none text-jade">{day.title}</h3><p className="mt-4 text-xs leading-5 text-charcoal/62">{day.description}</p></Link>)}</div></div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom"><div className="mb-8"><p className="eyebrow">Voor je vertrekt</p><h2 className="heading-redesign">Praktische tips voor je planning</h2></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.practicalTips.map((tip) => { const Icon = iconMap[tip.icon]; return <article key={tip.title} className="rounded-2xl border border-jade/10 bg-white p-6"><Icon size={38} strokeWidth={1.35} className="text-jade" /><h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-none text-jade">{tip.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/64">{tip.description}</p></article>; })}</div><p className="mt-6 rounded-xl border border-saffron/25 bg-white/65 px-5 py-4 text-xs leading-5 text-charcoal/65"><strong className="text-jade">Controleer actuele informatie.</strong> Entreeprijzen, openingstijden, bootvertrekken en toegang kunnen veranderen. Kijk vlak voor vertrek bij de officiële locatie of je aanbieder.</p></div>
        </section>

        <FaqSplitSection eyebrow="Echte vragen uit de zoekresultaten" title={`Veelgestelde vragen over ${data.cityName}`} description="De vragen zijn rechtstreeks verzameld uit de Nederlandse People Also Ask-resultaten van DataForSEO. Antwoorden over weer en verblijf verwijzen bewust naar hun eigen verdiepende gids." items={data.faqs} />

        <RelatedGuidesSection title={`Maak je ${data.cityName}-reis compleet`} guides={data.relatedGuides} sideLink={{ label: 'Uitjes via Klook', href: klookHref, affiliate: true }} disclosure="Klook is een affiliatepartner. Een eventuele commissie verandert jouw prijs niet." />

        <SourceMethodSection title="Hoe is deze selectie samengesteld?" description="We combineren officiële bestemmingsinformatie, actuele toegangs- en veiligheidscontext, logische dagroutes en echte zoekvragen. Bekende plekken zonder duidelijke meerwaarde of met onduidelijke actuele toegang krijgen geen automatische topnotering." sources={data.sources} />

        <section className="py-10 lg:py-12"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
      </div>
    </>
  );
}
