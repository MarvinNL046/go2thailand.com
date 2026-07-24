import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  BookOpenText,
  Building2,
  CalendarCheck2,
  Check,
  Compass,
  ExternalLink,
  Hotel,
  Luggage,
  MapPin,
  Route,
  Sparkles,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import FeedbackForm from '../FeedbackForm';
import { cityAffiliates, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import type { HotelArea, HotelGuideData } from '../../data/hotels/types';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface HotelGuideTemplateProps {
  data: HotelGuideData;
}

const areaIcons = {
  easy: Compass,
  scenic: Waves,
  local: Building2,
  quiet: Sparkles,
};

const bookingTipIcons = [MapPin, BedDouble, CalendarCheck2, BadgeCheck];

const hotelSectionNavItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'Kort antwoord', icon: Sparkles },
  { href: '#gebieden', label: 'Gebieden', icon: MapPin },
  { href: '#hotels', label: 'Hotelkeuzes', icon: BedDouble },
  { href: '#combineren', label: 'Combineren', icon: Route },
  { href: '#vragen', label: 'Vragen', icon: BookOpenText },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
}

function AreaCard({ area, index, className = '' }: { area: HotelArea; index: number; className?: string }) {
  const Icon = areaIcons[area.tone];

  return (
    <article id={area.slug} className={`scroll-mt-24 overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_18px_55px_rgba(18,63,54,0.07)] ${className}`}>
      <div className="relative h-56 overflow-hidden sm:h-64">
        <Image src={area.image} alt={area.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-[1.025]" />
        <div className="absolute inset-0 bg-gradient-to-t from-jade/90 via-jade/15 to-transparent" />
        <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-xl border border-white/35 bg-jade/70 text-xs font-extrabold text-white backdrop-blur">0{index + 1}</span>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{area.shortLabel}</p>
          <h3 className="mt-1 font-display text-[2.2rem] font-semibold leading-none">{area.name}</h3>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3 rounded-xl bg-tonal p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-saffron/25 bg-canvas text-jade"><Icon size={18} /></span>
          <div><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Past bij</p><p className="mt-1 text-xs font-bold leading-5 text-jade">{area.bestFor}</p></div>
        </div>
        <p className="mt-5 text-sm font-medium leading-7 text-charcoal/72">{area.summary}</p>
        <div className="mt-5 grid gap-3 border-t border-jade/10 pt-5 sm:grid-cols-2">
          <div><p className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.15em] text-jade"><Check size={13} className="text-saffron-dark" /> Grootste voordeel</p><p className="mt-2 text-xs leading-5 text-charcoal/63">{area.advantage}</p></div>
          <div><p className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.15em] text-jade"><Luggage size={13} className="text-saffron-dark" /> Houd rekening met</p><p className="mt-2 text-xs leading-5 text-charcoal/63">{area.tradeoff}</p></div>
        </div>
        <p className="mt-4 flex items-start gap-2 text-[11px] font-semibold leading-5 text-jade/70"><Route size={14} className="mt-0.5 shrink-0 text-saffron-dark" /> {area.transport}</p>
      </div>
    </article>
  );
}

export default function HotelGuideTemplate({ data }: HotelGuideTemplateProps) {
  const parentGuideHref = data.parentGuideHref || `/city/${data.citySlug}/`;
  const parentGuideUrl = parentGuideHref.startsWith('http')
    ? parentGuideHref
    : `https://go2-thailand.com/nl${parentGuideHref.startsWith('/') ? parentGuideHref : `/${parentGuideHref}`}`;
  const tripBaseUrl = cityAffiliates[data.citySlug]?.trip || TRIP_GENERIC;
  const placementSubId = `${data.citySlug}-hotels-guide`;
  const tripHref = withPlacementSubId(tripBaseUrl, placementSubId, 'hero');
  const heroActions: EditorialHeroAction[] = [
    { label: 'Vergelijk de gebieden', href: '#gebieden', kind: 'primary' },
    { label: 'Bekijk hotels', href: tripHref, kind: 'secondary', newTab: true, affiliate: true },
  ];
  const heroBreadcrumbs = [
    { label: 'Thailand', href: '/' },
    { label: data.cityName, href: parentGuideHref },
    { label: 'Hotels & gebieden' },
  ];
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: data.cityName, item: parentGuideUrl },
      { '@type': 'ListItem', position: 3, name: `Waar verblijven in ${data.cityName}`, item: data.pageUrl },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  const areaListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Beste gebieden om te verblijven in ${data.cityName}`,
    itemListElement: data.areas.map((area, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: area.name,
      description: area.summary,
      url: `${data.pageUrl}#${area.slug}`,
    })),
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
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(areaListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.heroImage}
          imageAlt={data.heroAlt}
          breadcrumbs={heroBreadcrumbs}
          eyebrow={data.eyebrow}
          title={<>{data.heroTitle} <span className="block text-[3rem] text-saffron-dark sm:text-[4rem] lg:text-[4.65rem]">{data.heroAccent}</span></>}
          titleClassName="max-w-[620px] text-[4.2rem] leading-[0.84] sm:text-[5.3rem] lg:text-[6rem]"
          subtitle="Kies eerst het gebied. Daarna pas het hotel."
          description={data.intro}
          actions={heroActions}
          disclosure="De hotelknop is een affiliatelink naar Trip.com. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra."
        />

        <PageSectionNav items={hotelSectionNavItems} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Het korte antwoord</p>
              <h2 className="heading-redesign">De beste plek hangt af van je reis</h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/72">{data.quickAnswer}</p>
              <Link href={parentGuideHref} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Bekijk eerst de complete {data.cityName}-gids <ArrowRight size={14} /></Link>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-jade/10 bg-tonal px-5 py-8 sm:px-8">
              <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_15%_20%,rgba(242,154,56,.15),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(18,63,54,.09),transparent_35%)]" />
              <div className="relative grid gap-3 sm:grid-cols-2">
                {data.areas.map((area, index) => {
                  const Icon = areaIcons[area.tone];
                  return <a key={area.slug} href={`#${area.slug}`} className={`group flex items-center gap-4 rounded-xl border border-jade/10 bg-canvas/90 p-4 transition hover:-translate-y-0.5 hover:border-saffron/35 hover:bg-white ${data.areas.length % 2 === 1 && index === data.areas.length - 1 ? 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.375rem)]' : ''}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-saffron/25 text-jade"><Icon size={18} /></span><span><span className="block text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">0{index + 1} · {area.shortLabel}</span><strong className="mt-1 block font-display text-xl font-semibold text-jade">{area.name}</strong></span><ArrowRight size={15} className="ml-auto text-jade/35 transition group-hover:translate-x-1 group-hover:text-saffron" /></a>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="gebieden" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div><p className="eyebrow">Vergelijk je uitvalsbases</p><h2 className="heading-redesign">Waar kun je het beste slapen?</h2></div>
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/65 lg:justify-self-end">{data.areaDecisionNote}</p>
            </div>
            <div className="mt-9 grid gap-6 lg:grid-cols-2">{data.areas.map((area, index) => <AreaCard key={area.slug} area={area} index={index} className={data.areas.length % 2 === 1 && index === data.areas.length - 1 ? 'lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.75rem)]' : ''} />)}</div>
          </div>
        </section>

        <section id="hotels" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div><p className="eyebrow">Kleine redactionele selectie</p><h2 className="heading-redesign">Hotels per gebied</h2></div>
              <div className="lg:justify-self-end"><p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/66">Dit zijn voorbeelden met een duidelijke positie per gebied. We tonen geen vaste prijs of reviewscore: die veranderen continu. Controleer voor je boekt de actuele kamer, voorwaarden en locatie.</p><p className="mt-2 text-[9px] leading-4 text-charcoal/48">Trip.com-links zijn affiliatelinks. Een eventuele commissie kost jou niets extra.</p></div>
            </div>
            <div className={`mt-9 grid gap-4 md:grid-cols-2 ${data.hotelPicks.length >= 6 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'}`}>
              {data.hotelPicks.map((hotelPick) => {
                const hotelTripHref = withPlacementSubId(tripBaseUrl, placementSubId, `hotel-${slugify(hotelPick.name)}`);
                return (
                  <article key={hotelPick.name} className="flex min-h-[355px] flex-col rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_14px_45px_rgba(18,63,54,0.06)]">
                    <div className="flex items-start justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Hotel size={18} /></span><span className="rounded-lg bg-tonal px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{hotelPick.category}</span></div>
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-dark">{hotelPick.area}</p>
                    <h3 className="mt-2 font-display text-[1.6rem] font-semibold leading-[0.98] text-jade">{hotelPick.name}</h3>
                    <p className="mt-3 text-xs font-bold leading-5 text-jade/72">{hotelPick.bestFor}</p>
                    <p className="mt-3 text-xs leading-5 text-charcoal/63">{hotelPick.description}</p>
                    <p className="mt-4 border-l-2 border-saffron/45 pl-3 text-[11px] font-medium leading-5 text-charcoal/62"><strong className="text-jade">Waarom gekozen:</strong> {hotelPick.whySelected}</p>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                      <a href={hotelPick.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[9px] font-bold text-charcoal/45 transition hover:text-jade">Officiële site <ExternalLink size={11} /></a>
                      <a href={hotelTripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" aria-label={`Bekijk actuele beschikbaarheid voor hotels bij ${hotelPick.name} via Trip.com`} className="group grid h-9 w-9 place-items-center rounded-xl border border-saffron/35 text-saffron-dark transition hover:bg-saffron hover:text-white"><ArrowRight size={15} className="transition group-hover:translate-x-0.5" /></a>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl bg-jade px-6 py-6 text-white sm:flex-row sm:items-center lg:px-8">
              <div><p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">Vergelijk actueel aanbod</p><p className="mt-2 font-display text-2xl font-semibold">Controleer prijzen, kamertypes en annuleringsvoorwaarden.</p></div>
              <a href={withPlacementSubId(tripBaseUrl, placementSubId, 'hotel-grid-footer')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group shrink-0">Bekijk hotels via Trip.com <ArrowRight size={15} className="text-saffron transition group-hover:translate-x-1" /></a>
            </div>
          </div>
        </section>

        <section id="combineren" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div><p className="eyebrow">{data.splitStay.eyebrow}</p><h2 className="heading-redesign">{data.splitStay.title}</h2><p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/68">{data.splitStay.description}</p></div>
            <div className="relative py-4">
              <div aria-hidden="true" className="absolute left-5 right-5 top-1/2 hidden border-t-2 border-dashed border-saffron/55 sm:block" />
              <div aria-hidden="true" className="absolute bottom-12 left-[2.05rem] top-12 border-l-2 border-dashed border-saffron/55 sm:hidden" />
              <div className="relative grid gap-4 sm:grid-cols-3">
                {data.splitStay.routes.map((routeItem, index) => <article key={routeItem.label} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_12px_38px_rgba(18,63,54,0.06)]"><span className="grid h-9 w-9 place-items-center rounded-full bg-saffron text-xs font-extrabold text-white">{index + 1}</span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{routeItem.label}</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">{routeItem.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/62">{routeItem.description}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div><p className="eyebrow">Voor je reserveert</p><h2 className="heading-redesign">Boek slimmer, niet sneller</h2></div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.bookingTips.map((tip, index) => {
              const Icon = bookingTipIcons[index % bookingTipIcons.length];
              return <article key={tip.title} className="relative overflow-hidden rounded-2xl border border-jade/10 bg-canvas p-5"><div aria-hidden="true" className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-saffron/[0.07]" /><div className="relative flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-white text-jade"><Icon size={20} strokeWidth={1.6} /></span><span className="text-[10px] font-extrabold tracking-[0.14em] text-saffron-dark">0{index + 1}</span></div><h3 className="relative mt-5 font-display text-[1.5rem] font-semibold leading-none text-jade">{tip.title}</h3><p className="relative mt-3 text-xs leading-5 text-charcoal/63">{tip.description}</p></article>;
            })}</div>
          </div>
        </section>

        <FaqSplitSection
          eyebrow="Echte vragen uit de zoekresultaten"
          title={`Veelgestelde vragen over verblijven in ${data.cityName}`}
          description="De vragen zijn rechtstreeks verzameld uit de Nederlandse People Also Ask-resultaten van DataForSEO. De antwoorden zijn geschreven voor de keuze van je uitvalsbasis."
          items={data.faqs}
        />

        <RelatedGuidesSection
          title={`Maak je ${data.cityName}-reis compleet`}
          guides={data.relatedGuides}
          sideLink={{ label: 'Hotels via Trip.com', href: tripHref, affiliate: true }}
        />

        <SourceMethodSection
          title="Hoe kiezen we de gebieden en hotels?"
          description="De gebiedskeuze volgt uit vervoerslogica en reisstijl. Hotelfeiten zijn gecontroleerd via officiële sites. We ontvangen geen vergoeding om een accommodatie in deze selectie op te nemen."
          sources={data.sources}
        />

        <section className="py-10 lg:py-12"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
      </main>
    </>
  );
}
