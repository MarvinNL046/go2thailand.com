import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  BookOpenText,
  Check,
  CircleAlert,
  ExternalLink,
  Hotel,
  MapPin,
  Route,
  Sparkles,
  WalletCards,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import FeedbackForm from '../FeedbackForm';
import type { HotelDetailGuideData, HotelDetailIcon } from '../../data/hotel-details/types';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { DottedRoute } from '../visuals/DottedRoute';

interface HotelDetailGuideTemplateProps {
  data: HotelDetailGuideData;
  tripHref: string;
}

const iconByName: Record<HotelDetailIcon, typeof MapPin> = {
  map: MapPin,
  route: Route,
  bed: BedDouble,
  wallet: WalletCards,
  sparkles: Sparkles,
  waves: Waves,
};

const sectionNavItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'Kort oordeel', icon: Sparkles },
  { href: '#past-dit', label: 'Past dit bij je?', icon: Hotel },
  { href: '#locatie', label: 'Locatie', icon: Route },
  { href: '#boeken', label: 'Slim boeken', icon: WalletCards },
  { href: '#vragen', label: 'Vragen', icon: BookOpenText },
];

export default function HotelDetailGuideTemplate({ data, tripHref }: HotelDetailGuideTemplateProps) {
  const destinationHref = data.destinationHref || `/city/${data.citySlug}/`;
  const hotelGuideHref = `/best-hotels/${data.citySlug}/`;
  const actions: EditorialHeroAction[] = [
    { label: data.hero.ctaLabel, href: tripHref, kind: 'primary', newTab: true, affiliate: true },
    { label: 'Lees het eerlijke oordeel', href: '#kort', kind: 'secondary' },
  ];
  const heroBreadcrumbs = [
    { label: 'Thailand', href: '/' },
    { label: data.cityName, href: destinationHref },
    { label: 'Hotels', href: hotelGuideHref },
    { label: data.hotelName },
  ];
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: data.cityName, item: `https://go2-thailand.com/nl${destinationHref}` },
      { '@type': 'ListItem', position: 3, name: `Hotels in ${data.cityName}`, item: `https://go2-thailand.com/nl${hotelGuideHref}` },
      { '@type': 'ListItem', position: 4, name: data.hotelName, item: data.pageUrl },
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
  const hotelSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: data.hotelName,
    description: data.pageDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.area,
      addressRegion: data.cityName,
      addressCountry: 'TH',
    },
    mainEntityOfPage: data.pageUrl,
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={heroBreadcrumbs}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title}{data.hero.accent ? <span className="block text-[3rem] text-saffron-dark sm:text-[4rem] lg:text-[4.65rem]">{data.hero.accent}</span> : null}</>}
          titleClassName="max-w-[700px] text-[3.55rem] leading-[0.86] sm:text-[4.8rem] lg:text-[5.55rem]"
          subtitle={data.hero.subtitle}
          subtitleClassName="max-w-[610px] text-[1.25rem] leading-[1.08] sm:text-[1.55rem]"
          description={data.hero.description}
          actions={actions}
          disclosure="De hotelknop is een affiliatelink naar Trip.com. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra."
          minHeightClassName="min-h-[760px] lg:min-h-[680px]"
          imageClassName="object-cover object-[64%_center] lg:object-center"
        />
        <div className="section-divider-bottom bg-canvas">
          <div className="container-custom py-3 text-[10px] font-medium leading-5 text-charcoal/48">{data.hero.imageCaption}</div>
        </div>

        <PageSectionNav items={sectionNavItems} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="eyebrow">{data.verdict.eyebrow}</p>
              <h2 className="heading-redesign">{data.verdict.title}</h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/72">{data.verdict.description}</p>
              <p className="mt-5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-jade/55"><Check size={14} className="text-saffron-dark" /> Geen betaalde positie · geen vaste prijsclaim</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-jade/10 bg-tonal p-4 sm:p-6">
              <div aria-hidden="true" className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_12%_14%,rgba(242,154,56,.16),transparent_25%),radial-gradient(circle_at_88%_82%,rgba(18,63,54,.09),transparent_32%)]" />
              <div className="relative grid gap-3 sm:grid-cols-2">
                {data.verdict.stats.map((stat) => {
                  const Icon = iconByName[stat.icon];
                  return (
                    <article key={stat.label} className="rounded-xl border border-jade/10 bg-canvas/90 p-5 shadow-[0_10px_30px_rgba(18,63,54,0.05)]">
                      <div className="flex items-center justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/25 bg-white text-jade"><Icon size={19} strokeWidth={1.65} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{stat.label}</span></div>
                      <p className="mt-5 font-display text-[1.8rem] font-semibold leading-none text-jade">{stat.value}</p>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/60">{stat.note}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="past-dit" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div><p className="eyebrow">{data.fit.eyebrow}</p><h2 className="heading-redesign">{data.fit.title}</h2></div>
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">{data.fit.intro}</p>
            </div>
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              <article className="relative overflow-hidden rounded-2xl border border-jade/10 bg-jade p-6 text-white shadow-[0_20px_60px_rgba(18,63,54,0.14)] sm:p-8">
                <div aria-hidden="true" className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_85%_15%,rgba(242,154,56,.42),transparent_25%),linear-gradient(135deg,transparent_40%,rgba(255,255,255,.05))]" />
                <div className="relative"><span className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/10 text-saffron-light"><Check size={20} /></span><h3 className="mt-6 font-display text-[2rem] font-semibold leading-none">Dit past goed</h3><ul className="mt-6 space-y-4">{data.fit.goodFor.map((item) => <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-white/82"><Check size={16} className="mt-1 shrink-0 text-saffron-light" />{item}</li>)}</ul></div>
              </article>
              <article className="rounded-2xl border border-saffron/25 bg-canvas p-6 shadow-[0_16px_50px_rgba(18,63,54,0.06)] sm:p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-white text-saffron-dark"><CircleAlert size={20} /></span><h3 className="mt-6 font-display text-[2rem] font-semibold leading-none text-jade">Eerlijke trade-offs</h3><ul className="mt-6 space-y-4">{data.fit.tradeoffs.map((item) => <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-charcoal/70"><CircleAlert size={15} className="mt-1 shrink-0 text-saffron-dark" />{item}</li>)}</ul>
              </article>
            </div>
          </div>
        </section>

        <section id="locatie" className="section-divider-bottom scroll-mt-24 overflow-hidden py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
            <div>
              <p className="eyebrow">{data.location.eyebrow}</p>
              <h2 className="heading-redesign">{data.location.title}</h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/70">{data.location.description}</p>
              <Link href={destinationHref} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Open de complete {data.cityName}-gids <ArrowRight size={14} className="text-saffron-dark" /></Link>
            </div>
            <div className="relative py-5">
              <DottedRoute className="pointer-events-none absolute -left-3 -right-3 top-1/2 hidden h-auto w-[calc(100%+1.5rem)] -translate-y-1/2 lg:block" />
              <div aria-hidden="true" className="absolute bottom-10 left-[2.55rem] top-10 border-l-2 border-dashed border-saffron/55 lg:hidden" />
              <div className="relative grid gap-4 lg:grid-cols-3">
                {data.location.steps.map((step, index) => (
                  <article key={step.label} className="min-h-[235px] rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_16px_45px_rgba(18,63,54,0.07)]">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-xs font-extrabold text-white shadow-[0_7px_20px_rgba(242,154,56,0.28)]">{index + 1}</span>
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">{step.label}</p>
                    <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">{step.title}</h3>
                    <p className="mt-4 text-xs font-medium leading-5 text-charcoal/62">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="boeken" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
          <div className="container-custom">
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div><p className="eyebrow !text-saffron-light">{data.booking.eyebrow}</p><h2 className="heading-redesign !text-white">{data.booking.title}</h2></div>
              <p className="max-w-2xl text-sm font-medium leading-7 text-white/72 lg:justify-self-end">{data.booking.description}</p>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.booking.checks.map((check, index) => (
                <article key={check.title} className="rounded-2xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron-light/25 bg-white/10 text-saffron-light"><Check size={18} /></span><span className="text-[10px] font-extrabold tracking-[0.16em] text-white/35">0{index + 1}</span></div>
                  <h3 className="mt-5 font-display text-[1.45rem] font-semibold leading-none">{check.title}</h3>
                  <p className="mt-3 text-xs font-medium leading-5 text-white/66">{check.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl border border-saffron-light/20 bg-white/[0.06] px-6 py-6 sm:flex-row sm:items-center lg:px-8">
              <div><p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">Actuele beschikbaarheid</p><p className="mt-2 max-w-2xl font-display text-2xl font-semibold">Controleer de exacte kamer, prijs en voorwaarden voor jouw reisdata.</p><p className="mt-2 text-[10px] leading-5 text-white/52">Affiliatelink via Trip.com; een eventuele commissie kost jou niets extra.</p></div>
              <a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group shrink-0">Bekijk via Trip.com <ExternalLink size={14} className="text-saffron transition group-hover:translate-x-0.5" /></a>
            </div>
          </div>
        </section>

        <FaqSplitSection
          eyebrow="Echte vragen uit de zoekresultaten"
          title={`Veelgestelde vragen over ${data.hotelName}`}
          description="De vragen komen uit Nederlandse zoekresultaten en zijn aangevuld met beslispunten die vaak pas vlak voor het boeken opvallen. Feiten zijn gecontroleerd bij primaire bronnen."
          items={data.faqs}
        />

        <RelatedGuidesSection
          title={`Plan de rest van je ${data.cityName}-verblijf`}
          guides={data.relatedGuides}
          sideLink={{ label: 'Actuele hotelopties via Trip.com', href: tripHref, affiliate: true }}
          disclosure="De externe hotelknop is een affiliatelink. Redactionele selectie en beoordeling staan los van een eventuele commissie."
        />

        <SourceMethodSection
          title="Hoe is dit advies opgebouwd?"
          description="We combineren actuele primaire hotelinformatie met de praktische gevolgen voor route, kamertype en reisstijl. We tonen geen gekochte rangschikking, verouderde vaste prijzen of reviewscore zonder controleerbare bron."
          sources={data.sources}
        />

        <section className="py-10 lg:py-12"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
      </div>
    </>
  );
}
