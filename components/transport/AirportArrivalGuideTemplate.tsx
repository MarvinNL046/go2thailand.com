import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Bus,
  Car,
  CarFront,
  Check,
  Clock3,
  ExternalLink,
  Hotel,
  Luggage,
  MapPin,
  PlaneLanding,
  Route,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import FeedbackForm from '../FeedbackForm';
import type { AirportArrivalGuideData, AirportTransferMode } from '../../data/airport-guides/types';
import { KLOOK_GENERIC, SAILY_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface AirportArrivalGuideTemplateProps {
  data: AirportArrivalGuideData;
}

const transferIcons: Array<LucideIcon> = [Car, CarFront, Bus, Smartphone];

function affiliateRel() {
  return 'noopener noreferrer nofollow sponsored';
}

export function AirportArrivalGuideTemplate({ data }: AirportArrivalGuideTemplateProps) {
  const subId = useSubId();
  const klookTransferHref = withPlacementSubId(KLOOK_GENERIC, subId, 'airport-en-transfer-klook');
  const twelveGoHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'airport-en-transfer-12go');
  const airportNightHref = withPlacementSubId(TRIP_GENERIC, subId, 'airport-en-airport-night');
  const phuketHotelsHref = withPlacementSubId(TRIP_GENERIC, subId, 'airport-en-phuket-hotels');
  const esimHref = withPlacementSubId(SAILY_GENERIC, subId, 'airport-en-esim');

  const navItems: PageSectionNavItem[] = [
    { href: '#arrival', label: 'Arrival flow', icon: PlaneLanding },
    { href: '#transfer', label: 'Choose a transfer', icon: Car },
    { href: '#zones', label: 'Hotel zones', icon: MapPin },
    { href: '#late', label: 'Late arrivals', icon: Clock3 },
    { href: '#questions', label: 'Questions', icon: ShieldCheck },
  ];

  const heroActions: EditorialHeroAction[] = [
    { label: 'Choose your transfer', href: '#transfer', kind: 'primary' },
    { label: 'Check current options', href: klookTransferHref, kind: 'secondary', newTab: true, affiliate: true, ariaLabel: 'Check current Phuket airport transfer options on Klook' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
      { '@type': 'ListItem', position: 2, name: 'Phuket', item: `https://go2-thailand.com/city/${data.destinationSlug}/` },
      { '@type': 'ListItem', position: 3, name: `${data.airportName} guide`, item: data.pageUrl },
    ],
  };
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${data.pageUrl}#article`,
    headline: data.pageTitle,
    description: data.pageDescription,
    image: `https://go2-thailand.com${data.heroImage}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    inLanguage: 'en-GB',
    mainEntityOfPage: { '@type': 'WebPage', '@id': data.pageUrl },
    author: { '@type': 'Organization', name: 'Go2Thailand Editorial Team' },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      logo: { '@type': 'ImageObject', url: 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png' },
    },
    isBasedOn: data.sources.map((source) => source.url),
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${data.airportName} arrival sequence`,
    itemListElement: data.arrivalSteps.map((step, index) => ({
      '@type': 'ListItem', position: index + 1, name: step.title, description: step.description,
    })),
  };

  function actionHref(mode: AirportTransferMode) {
    return mode.actionKind === 'klook' ? klookTransferHref : twelveGoHref;
  }

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.heroImage}
          imageAlt={data.heroAlt}
          breadcrumbs={[
            { label: 'Thailand', href: '/' },
            { label: 'Phuket', href: `/city/${data.destinationSlug}/` },
            { label: `${data.airportCode} airport` },
          ]}
          eyebrow={data.eyebrow}
          title={<><span className="block">{data.heroTitle}</span><span className="block text-jade-light">{data.heroAccent}</span></>}
          titleClassName="max-w-[680px] text-[3.45rem] leading-[0.86] sm:text-[4.3rem] lg:text-[5.05rem]"
          description={data.intro}
          descriptionClassName="mt-6 max-w-[560px] text-[15px] leading-7 sm:text-base"
          actions={heroActions}
          disclosure="The transfer button is an affiliate link. We may earn a commission after a booking, at no extra cost to you. Check the current operator, pickup and terms before paying."
          minHeightClassName="min-h-[730px] lg:min-h-[650px]"
          imageClassName="object-cover object-[66%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.12)_0%,rgba(252,250,246,0.45)_40%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.93)_37%,rgba(252,250,246,0.3)_64%,rgba(8,44,39,0.12)_100%)]"
          decorativeOverlay={<div aria-hidden="true" className="absolute right-[11%] top-[22%] hidden h-24 w-24 rounded-full border border-saffron/25 bg-saffron/10 shadow-[0_0_0_22px_rgba(242,154,56,0.05)] lg:block" />}
          sideCard={(
            <div className="absolute bottom-9 right-[6%] z-10 hidden w-[270px] rounded-2xl border border-white/35 bg-jade/88 p-5 text-white shadow-2xl backdrop-blur-md lg:block">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-saffron text-white"><PlaneLanding size={21} aria-hidden="true" /></span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/58">Your first useful detail</p>
                  <p className="mt-1 font-display text-2xl font-semibold">The hotel zone</p>
                  <p className="mt-2 text-[11px] leading-5 text-white/72">Save the property name and exact map pin before landing.</p>
                </div>
              </div>
            </div>
          )}
        />

        <section className="section-divider-bottom bg-canvas py-7">
          <div className="container-custom grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.stats.map((stat, index) => {
              const Icon = [PlaneLanding, Route, MapPin, BadgeCheck][index];
              return (
                <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-jade/10 bg-white/70 px-4 py-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f6eee2] text-saffron-dark"><Icon size={19} aria-hidden="true" /></span>
                  <div><p className="text-[9px] font-bold uppercase tracking-[0.14em] text-charcoal/48">{stat.label}</p><p className="mt-0.5 text-sm font-extrabold text-jade">{stat.value}</p><p className="mt-0.5 text-[10px] text-charcoal/52">{stat.detail}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        <PageSectionNav label="On this Phuket Airport guide" items={navItems} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <SectionHeading eyebrow="The quick answer" title="Start with the destination—not the taxi" description={data.quickAnswer} />
            <div className="rounded-2xl border border-jade/10 bg-tonal p-6 shadow-editorial-card">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-jade text-white"><Luggage size={20} /></span><h2 className="font-display text-2xl font-semibold text-jade">Before the doors open</h2></div>
              <ul className="mt-5 space-y-3">
                {['Hotel name, district and map pin', 'Current pickup instruction or counter', 'Vehicle capacity for people and luggage', 'A reachable phone number and offline confirmation'].map((item) => <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-charcoal/72"><Check size={16} className="mt-1 shrink-0 text-saffron-dark" aria-hidden="true" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="arrival" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="From aircraft to pickup" title="The arrival flow in four handoffs" description="Each step removes one common source of airport friction. None requires a guessed waiting time or an outdated fare." />
            <div className="relative mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-9 hidden border-t-2 border-dashed border-saffron/45 xl:block" />
              {data.arrivalSteps.map((step, index) => (
                <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-saffron font-display text-xl font-semibold text-white shadow-[0_0_0_8px_rgba(252,250,246,0.95)]">{index + 1}</span>
                  <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{step.label}</p>
                  <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-jade">{step.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-charcoal/68">{step.description}</p>
                  <p className="mt-5 border-t border-jade/10 pt-4 text-xs font-semibold leading-5 text-jade/70">Check: {step.check}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="transfer" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Choose by handoff" title="Four ways out of HKT" description="There is no universal winner. The right option depends on the final zone, group, luggage, arrival time and how much uncertainty you want after the flight." />
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {data.transferModes.map((mode, index) => {
                const Icon = transferIcons[index];
                return (
                  <article key={mode.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-[#fff8ef] text-saffron-dark"><Icon size={22} aria-hidden="true" /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Best for · {mode.bestFor}</p><h3 className="mt-1 font-display text-[1.9rem] font-semibold leading-none text-jade">{mode.title}</h3></div></div>
                    <p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">{mode.description}</p>
                    <div className="mt-5 rounded-xl bg-tonal px-4 py-3 text-xs font-medium leading-5 text-charcoal/65"><strong className="text-jade">Watch the trade-off:</strong> {mode.tradeoff}</div>
                    {mode.actionLabel ? <a href={actionHref(mode)} target="_blank" rel={affiliateRel()} className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">{mode.actionLabel}<ExternalLink size={14} aria-hidden="true" /></a> : null}
                  </article>
                );
              })}
            </div>
            <AffiliateDisclosure className="mt-4">Klook and 12Go links are affiliate links. We may receive a commission after a booking, at no extra cost to you. Availability, route, pickup, vehicle and terms must be checked on the provider page.</AffiliateDisclosure>
          </div>
        </section>

        <section id="zones" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Phuket is larger than it looks" title="Match HKT to the actual hotel zone" description="These are routing decisions, not promised journey times. Weather, roadworks, flight banks and traffic can all change the handoff." />
            <div className="mt-9 overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <div className="hidden grid-cols-[1fr_0.78fr_1.35fr_1.2fr] gap-4 bg-jade px-5 py-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/70 md:grid"><span>Hotel area</span><span>Direction</span><span>Road reality</span><span>Best fit</span></div>
              {data.zones.map((zone) => <div key={zone.area} className="grid gap-3 border-t border-jade/10 px-5 py-5 first:border-t-0 md:grid-cols-[1fr_0.78fr_1.35fr_1.2fr] md:gap-4"><div><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-saffron-dark md:hidden">Area</span><h3 className="font-display text-xl font-semibold text-jade">{zone.area}</h3></div><div><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-saffron-dark md:hidden">Direction</span><p className="text-xs font-bold leading-5 text-jade/72">{zone.direction}</p></div><div><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-saffron-dark md:hidden">Road reality</span><p className="text-xs font-medium leading-5 text-charcoal/64">{zone.roadReality}</p></div><div><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-saffron-dark md:hidden">Best fit</span><p className="text-xs font-medium leading-5 text-charcoal/64">{zone.bestFit}</p></div></div>)}
            </div>
            <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl bg-jade px-6 py-6 text-white sm:flex-row sm:items-center">
              <div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-saffron-light">Area before room</p><p className="mt-2 max-w-[760px] font-display text-2xl font-semibold leading-tight">Compare Phuket stays only after the coast and airport handoff make sense.</p></div>
              <a href={phuketHotelsHref} target="_blank" rel={affiliateRel()} className="btn-cream shrink-0 px-5 text-saffron-dark">Check current stays <ExternalLink size={14} /></a>
            </div>
            <AffiliateDisclosure className="mt-3">The Trip.com button is an affiliate link. We may earn a commission after a booking, at no extra cost to you. Compare the live total, room terms and exact location.</AffiliateDisclosure>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Three quick decisions" title="Turn the arrival into a simple rule" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">{data.decisions.map((decision, index) => { const Icon = [BadgeCheck, Bus, Hotel][index]; return <article key={decision.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl bg-mist text-jade"><Icon size={20} /></span><h3 className="mt-5 font-display text-[1.65rem] font-semibold leading-none text-jade">{decision.title}</h3><p className="mt-2 text-xs font-extrabold uppercase tracking-[0.11em] text-saffron-dark">{decision.answer}</p><p className="mt-4 text-sm font-medium leading-7 text-charcoal/66">{decision.detail}</p>{index === 2 ? <a href={airportNightHref} target="_blank" rel={affiliateRel()} className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Check current airport stays <ExternalLink size={14} /></a> : null}</article>; })}</div>
            <AffiliateDisclosure className="mt-3">The airport-stay link is a Trip.com affiliate link. It appears only where an overnight stop can protect a late arrival or early departure.</AffiliateDisclosure>
          </div>
        </section>

        <section id="late" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-card">
            <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
              <div className="p-7 sm:p-10 lg:p-12"><p className="eyebrow text-saffron-light">Protect the first night</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.04em]">{data.lateArrival.title}</h2><p className="mt-6 text-sm font-medium leading-7 text-white/72">{data.lateArrival.description}</p><div className="mt-7 grid gap-3">{data.lateArrival.checks.map((check) => <p key={check} className="flex gap-3 text-xs font-semibold leading-5 text-white/78"><Check size={16} className="mt-0.5 shrink-0 text-saffron-light" />{check}</p>)}</div></div>
              <div className="relative min-h-[320px]"><Image src="/images/redesign/phuket-route-planning.webp" alt="Phuket coastline used to plan a flexible arrival route" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-jade/70 via-jade/10 to-transparent lg:bg-gradient-to-r" /></div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl shadow-editorial-card"><Image src="/images/redesign/esim-thailand-airport.webp" alt="Traveller checking a phone after arriving in Thailand" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /></div>
            <div><p className="eyebrow">Connect before the pickup</p><h2 className="heading-redesign">{data.connectivity.title}</h2><p className="mt-6 text-sm font-medium leading-7 text-charcoal/68">{data.connectivity.description}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{data.connectivity.checks.map((check) => <p key={check} className="flex gap-3 rounded-xl border border-jade/10 bg-white px-4 py-3 text-xs font-semibold leading-5 text-charcoal/68"><Smartphone size={16} className="mt-0.5 shrink-0 text-saffron-dark" />{check}</p>)}</div><div className="mt-7 flex flex-wrap gap-3"><a href={esimHref} target="_blank" rel={affiliateRel()} className="btn-jade btn-jade-pattern px-6">Check current eSIM options <ExternalLink size={14} className="text-saffron" /></a><Link href="/travel-guides/sim-card-thailand/" className="btn-cream px-6 text-saffron-dark">Read the SIM guide <ArrowRight size={14} /></Link></div><AffiliateDisclosure className="mt-3">The Saily button is an affiliate link. Check device compatibility, coverage, validity and the current plan before purchasing.</AffiliateDisclosure></div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Genuine search questions" title="Phuket Airport questions, answered carefully" description="These questions were collected from current UK-English results. Answers avoid fixed fares, guaranteed queues and stale pickup instructions." items={data.faqs} />

        <RelatedGuidesSection eyebrow="Continue from the arrival" title="Plan the rest of Phuket" guides={data.relatedGuides} readLabel="Open the guide" sideLink={{ label: 'Check current Phuket hotels', href: phuketHotelsHref, affiliate: true }} disclosure="The Trip.com link is an affiliate link. Editorial order is not paid placement; compare the current total and location before booking." />

        <SourceMethodSection eyebrow="Sources & update policy" title="Current checks beat cached promises" description="We separate durable airport orientation from details that can change. Route, schedule, pickup, app access and operator terms should always be checked on the current airport or operator page. Amazon products were assessed but deliberately not forced into this owner: a physical product does not improve the airport-to-hotel decision." sources={data.sources} />

        <section className="section-divider-bottom py-10"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
      </div>
    </>
  );
}
