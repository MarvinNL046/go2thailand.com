import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  CarFront,
  Check,
  ChefHat,
  Compass,
  ExternalLink,
  Hotel,
  Map,
  MapPin,
  Route,
  Ship,
  Sparkles,
  SunMedium,
  Waves,
} from 'lucide-react';
import type { DestinationGuideData, DestinationIcon } from '../../data/destinations/types';
import { cityAffiliates, getIslandAffiliates, KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import FeedbackForm from '../FeedbackForm';
import SEOHead from '../SEOHead';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface DestinationGuideTemplateProps {
  data: DestinationGuideData;
}

const iconMap: Record<DestinationIcon, LucideIcon> = {
  calendar: CalendarDays,
  car: CarFront,
  compass: Compass,
  food: ChefHat,
  hotel: Hotel,
  map: Map,
  ship: Ship,
  sparkles: Sparkles,
  sun: SunMedium,
  waves: Waves,
};

const sectionNavItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'In het kort', icon: Sparkles },
  { href: '#zones', label: 'Waar zitten', icon: MapPin },
  { href: '#doen', label: 'Zien & doen', icon: Compass },
  { href: '#route', label: 'Route', icon: Route },
  { href: '#praktisch', label: 'Praktisch', icon: CarFront },
  { href: '#vragen', label: 'Vragen', icon: BookOpenText },
];

function ZoneCard({ citySlug, stayGuideHref, zone, index, zoneCount }: { citySlug: string; stayGuideHref?: string | null; zone: DestinationGuideData['zones'][number]; index: number; zoneCount: number }) {
  const guideHref = stayGuideHref === null ? null : (stayGuideHref || `/best-hotels/${citySlug}/#gebieden`);
  const gridSpan = index === 0 ? 'lg:col-span-12' : zoneCount === 4 ? 'lg:col-span-4' : 'lg:col-span-6';
  return (
    <article id={zone.slug} className={`group scroll-mt-24 overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card ${gridSpan}`}>
      <div className={`grid h-full ${index === 0 ? 'lg:grid-cols-[1.12fr_0.88fr]' : ''}`}>
        <div className={`relative overflow-hidden ${index === 0 ? 'min-h-[270px] lg:min-h-full' : 'h-52'}`}>
          <Image src={zone.image} alt={zone.imageAlt} fill sizes={index === 0 ? '(max-width: 1024px) 100vw, 55vw' : '(max-width: 768px) 100vw, 34vw'} className="object-cover transition duration-700 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-t from-jade-dark/76 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 grid h-9 min-w-9 place-items-center rounded-lg bg-white/92 px-2 text-[10px] font-extrabold text-jade shadow-sm backdrop-blur">{String(index + 1).padStart(2, '0')}</span>
          <p className="absolute inset-x-0 bottom-0 p-5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">{zone.kicker}</p>
        </div>
        <div className="flex flex-col p-6 lg:p-7">
          <h3 className="font-display text-[2rem] font-semibold leading-none tracking-[-0.025em] text-jade">{zone.name}</h3>
          <p className="mt-4 text-sm font-medium leading-6 text-charcoal/68">{zone.summary}</p>
          <div className="mt-5 space-y-3 border-t border-jade/10 pt-5 text-xs leading-5">
            <p className="flex gap-2 text-jade"><Check size={14} className="mt-0.5 shrink-0 text-saffron-dark" /><span><strong>Past bij:</strong> {zone.bestFor}</span></p>
            <p className="flex gap-2 text-charcoal/62"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jade/35" /><span>{zone.tradeoff}</span></p>
          </div>
          {guideHref ? <Link href={guideHref} className="mt-auto inline-flex items-center justify-end gap-2 pt-5 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Bekijk verblijfsgids <ArrowRight size={14} /></Link> : null}
        </div>
      </div>
    </article>
  );
}

export function DestinationGuideTemplate({ data }: DestinationGuideTemplateProps) {
  const cityAffiliate = cityAffiliates[data.citySlug] || getIslandAffiliates(data.citySlug);
  const klookHref = withPlacementSubId(cityAffiliate?.klook || KLOOK_GENERIC, `${data.citySlug}-destination`, 'experiences');
  const tripHref = withPlacementSubId(cityAffiliate?.trip || TRIP_GENERIC, `${data.citySlug}-destination`, 'hotels');
  const transportHref = withPlacementSubId(cityAffiliate?.twelveGo || TWELVEGO_GENERIC, `${data.citySlug}-destination`, 'transport');
  const heroActions: EditorialHeroAction[] = [
    { label: `Kies jouw ${data.cityName}`, href: '#zones', kind: 'primary' },
    { label: 'Bekijk hotels', href: tripHref, kind: 'secondary', newTab: true, affiliate: true },
  ];
  const breadcrumbs = [
    { label: 'Thailand', href: '/' },
    data.breadcrumbsRoot || { label: 'Bestemmingen', href: '/city/' },
    { label: data.cityName },
  ];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const destinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${data.pageUrl}#destination`,
    name: `${data.cityName}, Thailand`,
    description: data.pageDescription,
    image: `https://go2-thailand.com${data.hero.image}`,
    url: data.pageUrl,
    inLanguage: 'nl-NL',
    geo: { '@type': 'GeoCoordinates', latitude: data.coordinates.latitude, longitude: data.coordinates.longitude },
    containedInPlace: { '@type': 'Country', name: 'Thailand' },
    touristType: data.touristType || ['Strandreizigers', 'Cultuurreizigers', 'Families', 'Stellen'],
  };
  const zoneSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Reisgebieden in ${data.cityName}`,
    itemListElement: data.zones.map((zone, index) => ({ '@type': 'ListItem', position: index + 1, name: zone.name, description: zone.summary, url: `${data.pageUrl}#${zone.slug}` })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Bestemmingen', item: 'https://go2-thailand.com/nl/city/' },
      { '@type': 'ListItem', position: 3, name: data.cityName, item: data.pageUrl },
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
    about: { '@id': `${data.pageUrl}#destination` },
  };

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.hero.image}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(zoneSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={breadcrumbs}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title}<span className="sr-only"> </span><span className="mt-2 block text-[2.3rem] leading-none text-saffron-dark sm:mt-1 sm:text-[3.2rem] lg:text-[3.75rem]">{data.hero.accent}</span></>}
          titleClassName="max-w-[610px] text-[4.2rem] leading-[0.9] sm:text-[5.6rem] sm:leading-[0.84] lg:text-[6.4rem]"
          subtitle={data.hero.subtitle}
          subtitleClassName="max-w-[580px] text-[1.45rem] leading-[1.08] sm:text-[1.78rem]"
          description={data.hero.description}
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-6"
          actions={heroActions}
          disclosure="De hotelknop is een affiliatelink. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra."
          minHeightClassName="min-h-[760px] lg:min-h-[680px]"
          contentClassName="max-w-[640px]"
          imageClassName={data.hero.imageClassName || 'object-cover object-center'}
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.12)_0%,rgba(252,250,246,0.48)_44%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.93)_37%,rgba(252,250,246,0.30)_65%,rgba(18,63,54,0.07)_100%)]"
          sideCard={(
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1180px)/2))] z-10 hidden w-[330px] overflow-hidden rounded-2xl border border-white/70 bg-canvas/[0.94] p-5 shadow-[0_18px_50px_rgba(18,63,54,0.15)] backdrop-blur-md xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-dark">{data.cityName} in drie keuzes</p>
              <dl className="mt-3 divide-y divide-jade/10">
                {data.hero.stats.map((stat) => { const Icon = iconMap[stat.icon]; return <div key={stat.label} className="flex items-center gap-3 py-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-tonal text-jade"><Icon size={18} /></span><div><dt className="text-[9px] font-bold uppercase tracking-[0.11em] text-charcoal/45">{stat.label}</dt><dd className="mt-0.5 font-display text-xl font-semibold leading-none text-jade">{stat.value}</dd></div></div>; })}
              </dl>
            </div>
          )}
        />

        <PageSectionNav items={sectionNavItems} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="eyebrow">{data.quickAnswer.eyebrow}</p>
              <h2 className="heading-redesign">{data.quickAnswer.title}</h2>
              <div className="mt-6 space-y-4 text-sm font-medium leading-7 text-charcoal/70">{data.quickAnswer.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <div className="mt-7 grid gap-2 xl:hidden sm:grid-cols-3">{data.hero.stats.map((stat) => { const Icon = iconMap[stat.icon]; return <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-jade/10 bg-white p-4"><Icon size={19} className="text-saffron-dark" /><div><p className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-charcoal/40">{stat.label}</p><p className="font-display text-lg font-semibold text-jade">{stat.value}</p></div></div>; })}</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.quickAnswer.verdicts.map((verdict) => { const Icon = iconMap[verdict.icon]; return <article key={verdict.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_8px_28px_rgba(18,63,54,0.045)]"><Icon size={28} strokeWidth={1.45} className="text-saffron-dark" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.16em] text-charcoal/42">{verdict.label}</p><h3 className="mt-1 font-display text-[1.55rem] font-semibold leading-none text-jade">{verdict.value}</h3><p className="mt-3 text-xs leading-5 text-charcoal/62">{verdict.description}</p></article>; })}
            </div>
          </div>
        </section>

        <section id="zones" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr] lg:items-end"><div><p className="eyebrow">Kies je reiszone</p><h2 className="heading-redesign">Welk deel van {data.cityName} past bij jou?</h2></div><p className="max-w-xl text-sm font-medium leading-7 text-charcoal/65 lg:justify-self-end">Een verkeerde gebiedskeuze begint vaak bij een hotelnaam en eindigt met onnodig lange ritten. Begin bij het gebied waar je wilt wakker worden en avondeten.</p></div>
            <div className="mt-9 grid gap-5 lg:grid-cols-12">{data.zones.map((zone, index) => <ZoneCard key={zone.slug} citySlug={data.citySlug} stayGuideHref={data.stayGuideHref} zone={zone} index={index} zoneCount={data.zones.length} />)}</div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom relative min-h-[390px] overflow-hidden rounded-2xl bg-jade-dark shadow-[0_16px_45px_rgba(18,63,54,0.16)]">
            <Image src={data.featureBanner.image} alt={data.featureBanner.imageAlt} fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,54,47,0.96)_0%,rgba(6,54,47,0.82)_36%,rgba(6,54,47,0.12)_72%,rgba(6,54,47,0.02)_100%)]" />
            <div className="relative z-10 flex min-h-[390px] max-w-[560px] flex-col justify-center p-7 text-white sm:p-10 lg:p-12">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{data.featureBanner.eyebrow}</p>
              <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em] sm:text-[3.7rem]">{data.featureBanner.title}</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-white/78">{data.featureBanner.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">{data.stayGuideHref ? <Link href={data.stayGuideHref} className="btn-cream">Vergelijk de gebieden <ArrowRight size={14} className="text-saffron-dark" /></Link> : null}<a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-5 text-xs font-extrabold text-white transition hover:bg-white/10">Bekijk hotels <ExternalLink size={14} /></a></div>
              <p className="mt-3 text-[9px] text-white/50">De externe hotelknop is een affiliatelink; jouw prijs verandert niet.</p>
            </div>
          </div>
        </section>

        <section id="doen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl"><p className="eyebrow">Drie sterke contrasten</p><h2 className="heading-redesign">Dit geeft je {data.cityName}-reis vorm</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/67">De complete bezienswaardighedengids bevat de detailselectie. Op deze overzichtspagina kies je alleen welke drie soorten dagen jouw reis nodig heeft.</p></div>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {data.highlights.map((highlight) => <Link key={highlight.title} href={highlight.href} className="group flex flex-col overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card sm:flex-row lg:flex-col"><div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-[230px] sm:w-[42%] lg:h-56 lg:w-full"><Image src={highlight.image} alt={highlight.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/65 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">{highlight.eyebrow}</span></div><div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6"><h3 className="break-words font-display text-[1.7rem] font-semibold leading-none text-jade hyphens-auto">{highlight.title}</h3><p className="mt-4 text-xs leading-5 text-charcoal/64">{highlight.description}</p><p className="mt-4 border-t border-jade/10 pt-4 text-[10px] font-semibold leading-4 text-jade/70">{highlight.decision}</p><span className="mt-auto inline-flex items-center justify-end gap-2 pt-5 text-xs font-extrabold text-jade">Bekijk de keuze <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span></div></Link>)}
            </div>
            <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl bg-jade px-6 py-6 text-white shadow-[0_12px_32px_rgba(18,63,54,0.16)] sm:flex-row sm:items-center lg:px-8"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">Uitjes via Klook</p><p className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-tight">Vergelijk tours nadat je weet welke ervaring je route echt nodig heeft.</p></div><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream shrink-0">Bekijk activiteiten <ArrowRight size={14} className="text-saffron-dark" /></a></div>
            <p className="mt-2 text-[9px] text-charcoal/45">Affiliatelink — wij kunnen commissie ontvangen bij een boeking, zonder extra kosten voor jou.</p>
          </div>
        </section>

        <section className="section-divider-bottom overflow-hidden bg-jade-dark py-14 text-white lg:py-20">
          <div className="container-custom grid items-stretch gap-9 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[430px] overflow-hidden rounded-2xl border border-white/10"><Image src={data.food.image} alt={data.food.imageAlt} fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/55 via-transparent to-transparent" /></div>
            <div className="flex flex-col justify-center"><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{data.food.eyebrow}</p><h2 className="mt-3 font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.035em] sm:text-[4rem]">{data.food.title}</h2><p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/72">{data.food.description}</p><div className="mt-7 divide-y divide-white/12 border-y border-white/12">{data.food.dishes.map((dish) => <div key={dish.name} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr]"><h3 className="font-display text-xl font-semibold text-saffron-light">{dish.name}</h3><p className="text-xs leading-5 text-white/66">{dish.description}</p></div>)}</div><Link href={`/city/${data.citySlug}/food/`} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-white transition hover:text-saffron-light">Bekijk de eetgids <ArrowRight size={14} /></Link></div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl"><p className="eyebrow">{data.itinerary.eyebrow}</p><h2 className="heading-redesign">{data.itinerary.title}</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/67">{data.itinerary.description}</p></div>
            <div className="relative mt-9 grid gap-5 lg:grid-cols-4"><div aria-hidden="true" className="absolute left-[8%] right-[8%] top-8 hidden border-t-2 border-dashed border-saffron/55 lg:block" />{data.itinerary.days.map((day, index) => <Link key={day.day} href={day.href} className="group relative rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_8px_28px_rgba(18,63,54,0.045)] transition hover:-translate-y-1 hover:border-saffron/35"><div className="relative z-10 flex items-center justify-between"><span className="grid h-16 w-16 place-items-center rounded-full border-4 border-canvas bg-saffron font-display text-2xl font-semibold text-white shadow-sm">{index + 1}</span><ArrowRight size={16} className="text-jade transition group-hover:translate-x-1 group-hover:text-saffron-dark" /></div><p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">{day.day}</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">{day.title}</h3><p className="mt-4 text-xs leading-5 text-charcoal/63">{day.description}</p></Link>)}</div>
          </div>
        </section>

        <section id="praktisch" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl"><p className="eyebrow">Plan met seizoen en afstand</p><h2 className="heading-redesign">De praktische helft van een mooie reis</h2></div>
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-60"><Image src={data.planning.weather.image} alt={data.planning.weather.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/72 via-transparent to-transparent" /><span className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white"><SunMedium size={17} className="text-saffron-light" /> Weer & zee</span></div><div className="p-6 lg:p-7"><h3 className="font-display text-[2rem] font-semibold leading-none text-jade">{data.planning.weather.title}</h3><p className="mt-4 text-sm font-medium leading-7 text-charcoal/67">{data.planning.weather.summary}</p><p className="mt-5 rounded-xl bg-tonal p-4 text-xs font-bold leading-5 text-jade">{data.planning.weather.best}</p><p className="mt-4 text-xs leading-5 text-charcoal/60">{data.planning.weather.tradeoff}</p><Link href={data.planning.weather.href} className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk weer per maand <ArrowRight size={14} className="text-saffron" /></Link></div></article>
              <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-60"><Image src={data.planning.transport.image} alt={data.planning.transport.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/72 via-transparent to-transparent" /><span className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white"><CarFront size={17} className="text-saffron-light" /> Vervoer & afstand</span></div><div className="p-6 lg:p-7"><h3 className="font-display text-[2rem] font-semibold leading-none text-jade">{data.planning.transport.title}</h3><p className="mt-4 text-sm font-medium leading-7 text-charcoal/67">{data.planning.transport.summary}</p><ul className="mt-5 space-y-3">{data.planning.transport.facts.map((fact) => <li key={fact} className="flex gap-3 text-xs leading-5 text-charcoal/62"><Check size={14} className="mt-0.5 shrink-0 text-saffron-dark" />{fact}</li>)}</ul><a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Vergelijk transfers <ExternalLink size={14} className="text-saffron" /></a><p className="mt-2 text-[9px] text-charcoal/42">Affiliatelink via 12Go; jouw prijs verandert niet.</p></div></article>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.practicalTips.map((tip) => { const Icon = iconMap[tip.icon]; return <article key={tip.title} className="rounded-2xl border border-jade/10 bg-white p-6"><Icon size={36} strokeWidth={1.35} className="text-jade" /><h3 className="mt-5 font-display text-[1.45rem] font-semibold leading-none text-jade">{tip.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/64">{tip.description}</p></article>; })}</div>
          </div>
        </section>

        <FaqSplitSection eyebrow="Echte vragen uit de zoekresultaten" title={`Veelgestelde vragen over ${data.cityName}`} description={`Deze vragen zijn letterlijk verzameld uit de Nederlandse People Also Ask-resultaten voor ${data.cityName}. Verdiepende weer-, hotel- en activiteitenvragen verwijzen bewust naar hun eigen gids.`} items={data.faqs} />

        <RelatedGuidesSection title={`Bouw je ${data.cityName}-reis verder uit`} guides={data.relatedGuides} sideLink={{ label: 'Uitjes via Klook', href: klookHref, affiliate: true }} disclosure="Klook is een affiliatepartner. Een eventuele commissie verandert jouw prijs niet." />

        <SourceMethodSection title={`Hoe is deze ${data.cityName}-gids samengesteld?`} description="De pagina combineert Nederlandse DataForSEO-resultaten, zichtbare concurrentiepatronen en primaire bronnen. De hoofdpagina helpt je kiezen; weer, verblijf en bezienswaardigheden worden alleen samengevat en naar hun eigen verdiepende gids doorgelinkt." sources={data.sources} />

        <section className="py-10 lg:py-12"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
      </main>
    </>
  );
}
