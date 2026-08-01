import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface LengthOption {
  nights: string;
  label: string;
  bases: string;
  moves: string;
  verdict: string;
  copy: string;
  bestFor: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
}

interface RouteShape {
  eyebrow: string;
  title: string;
  route: string[];
  copy: string;
  keep: string;
  cut: string;
  href: string;
  icon: LucideIcon;
}

export interface TripLengthPlannerData {
  pageUrl: string;
  updatedAt: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  heroEyebrow: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  heroDescription: string;
  transportHref: string;
  navItems: PageSectionNavItem[];
  lengthOptions: LengthOption[];
  routeShapes: RouteShape[];
  moveCosts: Array<{ number: string; title: string; copy: string; icon: LucideIcon }>;
  travelStyles: Array<{ title: string; nights: string; copy: string; rule: string; icon: LucideIcon }>;
  bookingCards: Array<{ title: string; copy: string; href: string; label: string; icon: LucideIcon; affiliate?: boolean }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
}

function schemas(data: TripLengthPlannerData) {
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
      '@type': 'BreadcrumbList',
      itemListElement: data.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.href ? `https://go2-thailand.com${item.href}` : data.pageUrl,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Thailand trip lengths',
      numberOfItems: data.lengthOptions.length,
      itemListElement: data.lengthOptions.map((option, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${option.nights}: ${option.label}`,
        description: option.copy,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];
}

export function TripLengthPlannerTemplate({ data }: { data: TripLengthPlannerData }) {
  return (
    <div className="bg-canvas" data-premium-template="trip-length-planner-en">
      <SEOHead title={data.title} description={data.description} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        {schemas(data).map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <EditorialHero
        image={data.heroImage}
        imageAlt={data.heroAlt}
        breadcrumbs={data.breadcrumbs}
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        description={data.heroDescription}
        actions={[
          { label: 'Choose your trip length', href: '#lengths', kind: 'primary' },
          { label: 'Compare live transport', href: data.transportHref, kind: 'secondary', newTab: true, affiliate: true },
        ]}
        disclosure="The transport link is sponsored. We may earn a commission at no extra cost to you. Compare the current operator, total journey, baggage and cancellation terms before paying."
        minHeightClassName="min-h-[760px] lg:min-h-[700px]"
        contentClassName="max-w-[760px]"
        contentTone="light"
        titleClassName="max-w-[790px] text-[3.7rem] leading-[0.86] sm:text-[4.9rem] lg:text-[5.65rem]"
        imageClassName="object-cover object-[68%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(7,43,35,.28)_0%,rgba(7,43,35,.74)_34%,rgba(7,43,35,.76)_78%,rgba(252,250,246,.94)_91%,rgba(252,250,246,.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,43,35,.97)_0%,rgba(7,43,35,.9)_39%,rgba(7,43,35,.26)_66%,rgba(7,43,35,.06)_100%)]"
      />
      <PageSectionNav label="On this trip-length planner" items={data.navItems} />

      <section id="answer" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The useful short answer"
              title={<>Ten to fourteen days.<br />For most first trips.</>}
              description="That range can hold Bangkok, one northern or cultural base and one southern base without turning every other day into a checkout. Seven days still works—if you choose one branch, not the whole country."
            />
            <div className="mt-8 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.14em] text-jade/55">
              <span className="h-px w-14 bg-saffron" /> Count nights, then hotel moves
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-card lg:p-10">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full border border-saffron/25" />
            <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-saffron-light">The base rule</p>
            <p className="mt-5 max-w-[720px] font-display text-[2.45rem] font-semibold leading-[.95] sm:text-[3.25rem]">
              Your route is limited by hotel changes—not by pins on a map.
            </p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-3">
              {[
                ['7 nights', '1–2 bases'],
                ['10 nights', '2–3 bases'],
                ['14 nights', '3–4 bases'],
              ].map(([nights, bases]) => (
                <div key={nights} className="bg-white/[.06] p-5">
                  <p className="font-display text-2xl font-semibold text-white">{nights}</p>
                  <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-saffron-light">{bases}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lengths" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <SectionHeading eyebrow="Start with available nights" title={<>How many days<br />do you need?</>} />
            <p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">Use these as pacing limits, not compulsory itineraries. Arrival time, departure airport, weather, children, mobility and jet lag can all reduce the number of genuinely usable days.</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {data.lengthOptions.map(({ nights, label, bases, moves, verdict, copy, bestFor, href, icon: Icon, featured }) => (
              <article key={nights} className={`flex min-h-[420px] flex-col rounded-2xl border p-6 shadow-editorial-card ${featured ? 'border-jade bg-jade text-white lg:-translate-y-3' : 'border-jade/10 bg-white text-jade'}`}>
                <div className="flex items-start justify-between gap-3">
                  <Icon size={24} className={featured ? 'text-saffron-light' : 'text-jade'} />
                  <span className={`rounded-full px-3 py-1 text-[8px] font-extrabold uppercase tracking-[.11em] ${featured ? 'bg-white/10 text-saffron-light' : 'bg-tonal text-saffron-dark'}`}>{verdict}</span>
                </div>
                <p className={`mt-8 text-[9px] font-extrabold uppercase tracking-[.14em] ${featured ? 'text-white/48' : 'text-jade/45'}`}>{nights}</p>
                <h2 className="mt-2 font-display text-[1.9rem] font-semibold leading-none">{label}</h2>
                <dl className={`mt-6 grid grid-cols-2 gap-3 border-y py-4 text-[9px] font-extrabold uppercase tracking-[.09em] ${featured ? 'border-white/12' : 'border-jade/10'}`}>
                  <div><dt className={featured ? 'text-white/40' : 'text-jade/40'}>Bases</dt><dd className="mt-1">{bases}</dd></div>
                  <div><dt className={featured ? 'text-white/40' : 'text-jade/40'}>Moves</dt><dd className="mt-1">{moves}</dd></div>
                </dl>
                <p className={`mt-5 text-xs font-medium leading-6 ${featured ? 'text-white/64' : 'text-charcoal/62'}`}>{copy}</p>
                <p className={`mt-5 text-[10px] font-extrabold leading-5 ${featured ? 'text-saffron-light' : 'text-jade'}`}>Best for: {bestFor}</p>
                <Link href={href} className={`mt-auto inline-flex items-center gap-2 pt-6 text-[10px] font-extrabold ${featured ? 'text-saffron-light' : 'text-saffron-dark'}`}>See a matching route <ArrowRight size={13} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading eyebrow="Three route shapes" title={<>Build branches.<br />Not a checklist.</>} />
            <p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">The owner page chooses the trip length. The linked itinerary pages hold the day-by-day schedules, keeping each search intent clear and avoiding five competing articles that answer the same question.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {data.routeShapes.map(({ eyebrow, title, route, copy, keep, cut, href, icon: Icon }, cardIndex) => (
              <article key={title} className={`overflow-hidden rounded-[24px] border shadow-editorial-card ${cardIndex === 1 ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-jade'}`}>
                <div className="p-7">
                  <div className="flex items-center justify-between"><Icon size={24} className={cardIndex === 1 ? 'text-saffron-light' : 'text-jade'} /><span className={`text-[9px] font-extrabold uppercase tracking-[.14em] ${cardIndex === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{eyebrow}</span></div>
                  <h2 className="mt-7 font-display text-[2rem] font-semibold leading-none">{title}</h2>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {route.map((stop, index) => <span key={`${title}-${stop}`} className="contents"><span className={`rounded-full border px-3 py-2 text-[9px] font-extrabold ${cardIndex === 1 ? 'border-white/15 bg-white/[.06]' : 'border-jade/12 bg-tonal'}`}>{stop}</span>{index < route.length - 1 && <ArrowRight size={12} className="text-saffron" />}</span>)}
                  </div>
                  <p className={`mt-6 text-xs font-medium leading-6 ${cardIndex === 1 ? 'text-white/64' : 'text-charcoal/62'}`}>{copy}</p>
                </div>
                <dl className={`grid gap-px border-t sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 ${cardIndex === 1 ? 'border-white/12 bg-white/12' : 'border-jade/10 bg-jade/10'}`}>
                  <div className={cardIndex === 1 ? 'bg-jade p-5' : 'bg-tonal p-5'}><dt className="text-[8px] font-extrabold uppercase tracking-[.13em] text-saffron-dark">Protect</dt><dd className={`mt-2 text-[11px] font-medium leading-5 ${cardIndex === 1 ? 'text-white/65' : 'text-charcoal/65'}`}>{keep}</dd></div>
                  <div className={cardIndex === 1 ? 'bg-jade p-5' : 'bg-white p-5'}><dt className="text-[8px] font-extrabold uppercase tracking-[.13em] text-saffron-dark">Cut first</dt><dd className={`mt-2 text-[11px] font-medium leading-5 ${cardIndex === 1 ? 'text-white/65' : 'text-charcoal/65'}`}>{cut}</dd></div>
                </dl>
                <Link href={href} className={`m-7 inline-flex items-center gap-2 text-xs font-extrabold ${cardIndex === 1 ? 'text-saffron-light' : 'text-jade'}`}>Open the itinerary <ArrowRight size={13} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="moves" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.67fr_1.33fr]">
          <div>
            <p className="eyebrow !text-saffron-light">The hidden time budget</p>
            <h2 className="font-display text-[3.25rem] font-semibold leading-[.9]">Every move has<br />five edges.</h2>
            <p className="mt-6 max-w-md text-sm font-medium leading-7 text-white/64">A one-hour flight or ferry is not a one-hour travel day. Judge each move from hotel door to hotel door, including the recovery cost.</p>
            <svg aria-hidden="true" viewBox="0 0 360 110" className="mt-8 hidden h-24 w-full max-w-sm text-saffron lg:block"><path d="M8 72 C70 18 94 101 160 54 S267 21 350 70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="8" cy="72" r="5" fill="currentColor" /><circle cx="160" cy="54" r="4" fill="currentColor" /><circle cx="350" cy="70" r="5" fill="currentColor" /></svg>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {data.moveCosts.map(({ number, title, copy, icon: Icon }) => (
              <article key={number} className="min-h-[235px] bg-white/[.05] p-6">
                <div className="flex items-center justify-between"><Icon size={22} className="text-saffron-light" /><span className="font-display text-3xl font-semibold text-white/18">{number}</span></div>
                <h3 className="mt-6 font-display text-[1.45rem] font-semibold">{title}</h3>
                <p className="mt-3 text-[11px] font-medium leading-6 text-white/60">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="style" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Adjust for the traveller" title={<>Same calendar.<br />Different pace.</>} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">Trip length is not a score. The right route is the one that leaves enough usable energy for the experiences you came for.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.travelStyles.map(({ title, nights, copy, rule, icon: Icon }) => (
              <article key={title} className="flex min-h-[315px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                <div className="flex items-center justify-between"><Icon size={24} className="text-jade" /><span className="text-[9px] font-extrabold uppercase tracking-[.13em] text-saffron-dark">{nights}</span></div>
                <h3 className="mt-7 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h3>
                <p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{copy}</p>
                <p className="mt-auto border-t border-jade/10 pt-5 text-[10px] font-extrabold leading-5 text-jade">Rule: {rule}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Only after choosing the shape" title={<>Price the route.<br />With live inventory.</>} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">We deliberately do not freeze sample fares into this planner. Compare the current total for the route you actually chose, then recheck baggage, location and cancellation conditions.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {data.bookingCards.map(({ title, copy, href, label, icon: Icon, affiliate }) => (
              <article key={title} className="flex min-h-[285px] flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card">
                <Icon size={25} className="text-jade" />
                <h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">{title}</h3>
                <p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p>
                {affiliate ? <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">{label} <ExternalLink size={13} /></a> : <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label} <ArrowRight size={13} /></Link>}
              </article>
            ))}
          </div>
          <AffiliateDisclosure className="mt-4">Sponsored transport, hotel and activity links show current commercial inventory. Go2Thailand does not set availability, price, route, room, operator or cancellation conditions.</AffiliateDisclosure>
        </div>
      </section>

      <FaqSplitSection id="questions" eyebrow="Genuine search questions" title="Thailand trip-length questions" description="Captured from ten live UK-English SERPs. Answers separate trip duration from visa entitlement, weather and daily spending so changeable facts stay with their specialist owners." items={data.faqs} />
      <RelatedGuidesSection eyebrow="Continue planning" title="Turn nights into a route" readLabel="Open the guide" guides={data.related} />
      <SourceMethodSection eyebrow="Sources & method" title="A pacing decision, not a sales promise" description={data.methodDescription} sources={data.sources} />
    </div>
  );
}
