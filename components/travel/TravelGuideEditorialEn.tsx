import Link from 'next/link';
import { ArrowRight, ExternalLink, FileCheck2, Map, ShieldCheck } from 'lucide-react';
import SEOHead from '../SEOHead';
import { EditorialHero } from '../design/EditorialHero';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { normalizeEnInternalHref } from '../../lib/en-route-owners';

type Guide = {
  slug: string;
  title: { en: string };
  seo: { metaTitle: { en: string }; metaDescription: { en: string } };
  hero: { subtitle: { en: string }; intro: { en: string } };
  sections: Array<{ title: { en: string }; type: string }>;
  relatedLinks: Array<{ href: string; label: { en: string } }>;
};

const SITE = 'https://go2-thailand.com';
const HERO = '/images/redesign/first-time-thailand-hero.webp';

const sources = [
  { title: 'Thailand Digital Arrival Card', creator: 'Thailand Immigration Bureau', url: 'https://tdac.immigration.go.th/manual/en/', note: 'Official arrival-card instructions; verify the current process before departure.' },
  { title: 'Thai e-Visa official portal', creator: 'Ministry of Foreign Affairs, Thailand', url: 'https://www.thaievisa.go.th/', note: 'Official visa starting point; eligibility depends on passport, residence and trip.' },
  { title: 'Thailand weather and warnings', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en/', note: 'Official forecasts and warnings; conditions remain date- and location-specific.' },
  { title: 'Thailand destination health', creator: 'US Centers for Disease Control and Prevention', url: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/thailand', note: 'Current destination-health overview; personal advice belongs with a qualified clinician.' },
];

function clean(value: string) {
  return value.replace(/\b20\d{2}\b/g, '').replace(/\s{2,}/g, ' ').trim();
}

export function TravelGuideEditorialEn({ guide }: { guide: Guide }) {
  const canonical = `${SITE}/travel-guides/${guide.slug}/`;
  const title = clean(guide.title.en);
  const topics = guide.sections.slice(0, 8).map((section) => clean(section.title.en)).filter(Boolean);
  const related = guide.relatedLinks.slice(0, 6);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: title,
    description: clean(guide.seo.metaDescription.en), url: canonical, inLanguage: 'en-GB',
    dateModified: '2026-08-01', author: { '@type': 'Organization', name: 'Go2Thailand.com' },
    publisher: { '@type': 'Organization', name: 'Go2Thailand.com' },
  };

  return <div className="overflow-hidden bg-canvas text-charcoal" data-premium-template="travel-guide-editorial-en" data-guide-owner={guide.slug}>
    <SEOHead title={clean(guide.seo.metaTitle.en)} description={clean(guide.seo.metaDescription.en)}>
      <meta property="og:type" content="article" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </SEOHead>
    <EditorialHero image={HERO} imageAlt="Thailand route planning with coast, city and cultural stops" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Travel guides', href: '/travel-guides/' }, { label: title }]} eyebrow="Evidence before itinerary" title={<>{title}</>} subtitle={clean(guide.hero.subtitle.en)} description="Use this page as a decision map. Rules, health advice, access, schedules and prices can change, so every time-sensitive detail is deliberately kept behind a live source check." actions={[{ label: 'Build the checks', href: '#decision-map', kind: 'primary' }, { label: 'Open official sources', href: '#sources', kind: 'secondary' }]} minHeightClassName="min-h-[760px] lg:min-h-[690px]" titleClassName="max-w-[880px] text-[3.7rem] leading-[.88] sm:text-[4.8rem] lg:text-[5.7rem]" contentTone="light" gradientClassName="bg-[linear-gradient(180deg,rgba(5,39,32,.14)_0%,rgba(5,39,32,.86)_62%,rgba(5,39,32,.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,39,32,.98)_0%,rgba(5,39,32,.91)_46%,rgba(5,39,32,.18)_78%)]" />

    <section id="decision-map" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
      <SectionHeading eyebrow="Editorial boundary" title="Turn the topic into verifiable decisions." description="The older draft mixed evergreen orientation with volatile numbers and broad guarantees. This owner keeps the useful information architecture while refusing to repeat unsupported exchange rates, fees, opening hours, visa entitlements, safety guarantees or rankings." />
      <div className="grid gap-4 sm:grid-cols-2">{(topics.length ? topics : ['Trip fit', 'Current conditions', 'Responsible operator', 'Fallback plan']).map((topic, i) => <article key={topic} className={`${i === 0 ? 'bg-jade text-white' : 'border border-jade/10 bg-white text-jade'} rounded-2xl p-6 shadow-editorial-card`}><span className={`grid h-10 w-10 place-items-center rounded-full ${i === 0 ? 'bg-white/10 text-saffron-light' : 'bg-tonal text-jade'}`}>{i + 1}</span><h2 className="mt-6 font-display text-[1.8rem] font-semibold leading-none">{topic}</h2><p className={`mt-4 text-xs font-medium leading-6 ${i === 0 ? 'text-white/68' : 'text-charcoal/64'}`}>Identify what applies to your date, passport, location, health needs or chosen provider. Confirm it at the responsible source before acting.</p></article>)}</div>
    </div></section>

    <section className="section-divider-bottom bg-tonal py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Live-detail gate" title="Four checks before relying on a claim." description="Search snippets and old articles are discovery aids, not final evidence." /><div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">{[
      ['Authority', 'Is this the agency, venue, operator or qualified health source responsible for the detail?'],
      ['Applicability', 'Does it apply to your passport, route, date, season, age and activity?'],
      ['Freshness', 'Is there a current date, notice, timetable or booking screen?'],
      ['Fallback', 'What will you do if weather, access, capacity or rules change?'],
    ].map(([heading, copy]) => <article key={heading} className="bg-white p-7"><FileCheck2 className="text-jade" /><h2 className="mt-5 font-display text-[1.8rem] font-semibold text-jade">{heading}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{copy}</p></article>)}</div></div></section>

    <section className="section-divider-bottom bg-jade py-14 text-white lg:py-20"><div className="container-custom grid gap-8 lg:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow !text-saffron-light">Plan naturally</p><h2 className="font-display text-[3rem] font-semibold leading-[.92]">Connect this decision to the rest of the trip.</h2><p className="mt-5 text-sm leading-7 text-white/68">Internal links point to the strongest route owner. No affiliate placement is added here because this generic evidence page does not establish a product-level recommendation.</p></div><div className="grid gap-3 sm:grid-cols-2">{related.map((item) => <Link key={item.href} href={normalizeEnInternalHref(item.href)} className="rounded-xl border border-white/14 bg-white/[.07] p-5"><Map className="text-saffron-light" size={19} /><strong className="mt-4 block text-sm">{clean(item.label.en)}</strong><span className="mt-3 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-light">Open guide <ArrowRight size={12} /></span></Link>)}</div></div></section>

    <div id="sources"><SourceMethodSection eyebrow="Sources & method" title="Primary sources set the changing facts." description="Reviewed 1 August 2026. These sources provide a current verification path, not blanket support for every topic on this page. Destination- or provider-specific details still require the responsible local source." method="We retained only the topic map from the legacy draft. Unsupported current figures, rankings and guarantees are not rendered by this English owner." sources={sources} /></div>
    <section className="py-10"><div className="container-custom flex flex-wrap items-center justify-between gap-4 text-[10px] font-medium text-charcoal/52"><span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-jade" /> Evidence boundary reviewed 1 August 2026</span><a href="https://www.tourismthailand.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-extrabold text-jade">Official destination context <ExternalLink size={12} /></a></div></section>
  </div>;
}
