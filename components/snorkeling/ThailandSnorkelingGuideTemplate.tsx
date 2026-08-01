import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Anchor,
  ArrowRight,
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
import type { ThailandSnorkelingGuideData } from '../../data/snorkeling/thailand-types';
import type { SnorkelGuideIcon } from '../../data/snorkeling/types';
import { KLOOK_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import FeedbackForm from '../FeedbackForm';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface ThailandSnorkelingGuideTemplateProps {
  data: ThailandSnorkelingGuideData;
}

const iconMap: Record<SnorkelGuideIcon, LucideIcon> = {
  anchor: Anchor,
  binoculars: Eye,
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

function RouteLine() {
  return (
    <svg aria-hidden="true" viewBox="0 0 620 100" className="pointer-events-none absolute inset-x-0 bottom-4 hidden h-24 w-full text-saffron lg:block">
      <path d="M28 67 C110 67, 109 22, 188 40 S290 91, 355 52 S470 17, 586 55" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" />
      <circle cx="28" cy="67" r="5" fill="currentColor" />
      <circle cx="188" cy="40" r="5" fill="currentColor" />
      <circle cx="355" cy="52" r="5" fill="currentColor" />
      <path d="M586 55l-10-8v16z" fill="currentColor" />
    </svg>
  );
}

export function ThailandSnorkelingGuideTemplate({ data }: ThailandSnorkelingGuideTemplateProps) {
  const klookHeroHref = withPlacementSubId(KLOOK_GENERIC, 'thailand-snorkeling', 'hero');
  const klookTourHref = withPlacementSubId(KLOOK_GENERIC, 'thailand-snorkeling', 'tour-check');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, 'thailand-snorkeling', 'route-check');
  const sectionNavItems: PageSectionNavItem[] = [
    { href: '#coasts', label: 'Coast & month', icon: Compass },
    { href: '#places', label: 'Where to go', icon: Anchor },
    { href: '#access', label: 'Shore or boat', icon: Ship },
    { href: '#pack', label: 'What to pack', icon: ShieldCheck },
    { href: '#questions', label: 'Questions', icon: Eye },
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
      { '@type': 'ListItem', position: 2, name: 'Things to do', item: 'https://go2-thailand.com/activities/' },
      { '@type': 'ListItem', position: 3, name: 'Snorkeling in Thailand', item: data.pageUrl },
    ],
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Thailand snorkelling bases',
    numberOfItems: data.destinations.length,
    itemListElement: data.destinations.map((destination, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: destination.name,
      description: destination.bestFor,
      url: `${data.pageUrl}#${destination.slug}`,
    })),
  };
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.pageTitle,
    description: data.pageDescription,
    image: `https://go2-thailand.com${data.hero.image}`,
    mainEntityOfPage: data.pageUrl,
    inLanguage: 'en',
    dateModified: data.dateModified,
    author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
  };

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.hero.image}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Things to do', href: '/activities/' }, { label: 'Snorkelling' }]}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title}<span className="mt-2 block text-saffron-dark">{data.hero.accent}</span></>}
          subtitle={data.hero.subtitle}
          description={data.hero.description}
          actions={[
            { label: 'Choose your coast', href: '#coasts', kind: 'primary' },
            { label: 'Check current tours', href: klookHeroHref, kind: 'secondary', newTab: true, affiliate: true },
          ]}
          disclosure="The tour button is a Klook affiliate link. We may receive a commission after a booking, at no extra cost to you."
          minHeightClassName="min-h-[790px] lg:min-h-[680px]"
          titleClassName="max-w-[680px] text-[4rem] leading-[0.83] sm:text-[5.5rem] lg:text-[6.4rem]"
          subtitleClassName="max-w-[620px] text-[1.4rem] leading-[1.08] sm:text-[1.85rem]"
          imageClassName="object-cover object-[61%_center]"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.62)_51%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.9)_34%,rgba(252,250,246,0.28)_58%,rgba(18,63,54,0.03)_100%)]"
        />

        <PageSectionNav items={sectionNavItems} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <p className="eyebrow">The short answer</p>
              <h2 className="heading-redesign">{data.quickAnswer.title}</h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/70">{data.quickAnswer.description}</p>
              <Link href="/weather/" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Compare Thailand’s coast seasons <ArrowRight size={14} className="text-saffron" /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {data.quickAnswer.stats.map((stat) => {
                const Icon = iconMap[stat.icon];
                return (
                  <div key={stat.label} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_10px_34px_rgba(18,63,54,0.055)]">
                    <Icon size={27} strokeWidth={1.45} className="text-saffron-dark" />
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.16em] text-charcoal/42">{stat.label}</p>
                    <p className="mt-1 font-display text-2xl font-semibold leading-none text-jade">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="coasts" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <SectionHeading eyebrow="Three weather rhythms" title="Start with the coast that fits your month" />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">These are planning windows, not climate guarantees. Thailand’s coasts can behave differently in the same week, and a calm regional season still needs a same-day bay or boat check.</p>
            </div>
            <div className="relative mt-9 grid gap-4 lg:grid-cols-3 lg:pb-16">
              {data.coastWindows.map((coast, index) => {
                const Icon = iconMap[coast.icon];
                return (
                  <article key={coast.id} className="relative z-10 rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/[0.06] text-saffron-dark"><Icon size={23} strokeWidth={1.5} /></span>
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-jade/40">0{index + 1}</span>
                    </div>
                    <h3 className="mt-6 font-display text-[2rem] font-semibold leading-none text-jade">{coast.name}</h3>
                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{coast.places}</p>
                    <p className="mt-5 text-sm font-extrabold leading-6 text-jade">{coast.planningWindow}</p>
                    <p className="mt-3 text-xs leading-5 text-charcoal/64">{coast.decision}</p>
                    <p className="mt-4 border-t border-jade/8 pt-4 text-[11px] leading-5 text-charcoal/52">{coast.caveat}</p>
                  </article>
                );
              })}
              <RouteLine />
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <SectionHeading eyebrow="Do this on the day" title="Four signals before choosing the water" />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">A calendar chooses a coast. It cannot choose today’s entry, visibility or return. Ask the accommodation, guide or operator these questions before travelling to a famous name.</p>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.morningSignals.map((signal) => {
                const Icon = iconMap[signal.icon];
                return (
                  <article key={signal.title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_8px_28px_rgba(18,63,54,0.045)]">
                    <Icon size={25} strokeWidth={1.45} className="text-jade" />
                    <h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{signal.title}</h3>
                    <p className="mt-3 text-xs font-bold leading-5 text-charcoal/72">{signal.check}</p>
                    <p className="mt-4 border-l-2 border-saffron pl-3 text-[11px] leading-5 text-charcoal/55">{signal.response}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="places" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Six useful bases" title="Where should you snorkel in Thailand?" description="Treat these as route profiles rather than a permanent ranking. Each solves a different travel problem and carries a different compromise." />
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.destinations.map((destination) => (
                <article id={destination.slug} key={destination.slug} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card scroll-mt-28">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={destination.image} alt={destination.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-jade/75 via-transparent to-transparent" />
                    <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4 text-white">
                      <div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{destination.region}</p><h3 className="mt-1 font-display text-[2rem] font-semibold leading-none">{destination.name}</h3></div>
                      <Anchor size={20} strokeWidth={1.45} />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-charcoal/42">{destination.access}</p>
                    <p className="mt-3 text-sm font-extrabold leading-6 text-jade">{destination.bestFor}</p>
                    <p className="mt-3 text-xs leading-5 text-charcoal/62">{destination.decision}</p>
                    <div className="mt-4 rounded-xl bg-tonal px-4 py-3"><p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">Planning window</p><p className="mt-1 text-xs font-bold leading-5 text-jade">{destination.planningWindow}</p></div>
                    <p className="mt-4 text-[11px] leading-5 text-charcoal/52">Trade-off: {destination.tradeoff}</p>
                    <Link href={destination.href} className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Open the local guide <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="access" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom overflow-hidden rounded-[1.75rem] bg-jade shadow-[0_24px_70px_rgba(18,63,54,0.15)]">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[430px] lg:min-h-[620px]">
                <Image src="/images/redesign/thailand-snorkeling-shore-or-boat.webp" alt="Travellers fitting masks at an easy shore entry while a longtail boat waits with flotation equipment" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-jade/30" />
              </div>
              <div className="p-7 text-white sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">Two genuinely different days</p>
                <h2 className="font-display text-[3.35rem] font-semibold leading-[0.88] tracking-[-0.04em]">From shore<br />{' '}or by boat?</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/68">Price is not the only difference. Compare confidence, route flexibility, access, guide support and how easily somebody can stop.</p>
                <div className="mt-7 grid gap-4">
                  {data.accessChoices.map((choice) => {
                    const Icon = iconMap[choice.icon];
                    return (
                      <article key={choice.title} className="rounded-2xl border border-white/12 bg-white/[0.055] p-5">
                        <div className="flex gap-4"><Icon size={23} strokeWidth={1.45} className="mt-1 shrink-0 text-saffron-light" /><div><h3 className="font-display text-2xl font-semibold">{choice.title}</h3><p className="mt-2 text-xs font-bold leading-5 text-white/78">{choice.bestFor}</p></div></div>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">{choice.advantages.map((item) => <li key={item} className="flex gap-2 text-[10px] leading-4 text-white/63"><Check size={12} className="mt-0.5 shrink-0 text-saffron-light" />{item}</li>)}</ul>
                        <p className="mt-4 border-t border-white/10 pt-4 text-[10px] leading-5 text-white/52">{choice.tradeoff}</p>
                      </article>
                    );
                  })}
                </div>
                <a href={klookTourHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 inline-flex min-h-12 px-5 text-saffron-dark">Check current tour formats <span className="grid h-6 w-6 place-items-center rounded-md border border-saffron/45"><ArrowRight size={14} /></span></a>
                <AffiliateDisclosure className="mt-3 !text-white/55">Klook is an affiliate partner. Check the current stops, group, equipment, cancellation terms and rerouting policy yourself.</AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Beginner-ready, not condition-proof" title="Make the session fit the least-confident swimmer" />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {data.beginnerChecks.map((check) => {
                  const Icon = iconMap[check.icon];
                  return <article key={check.title} className="rounded-2xl border border-jade/10 bg-white p-5"><Icon size={23} strokeWidth={1.45} className="text-saffron-dark" /><h3 className="mt-5 font-display text-xl font-semibold text-jade">{check.title}</h3><p className="mt-2 text-xs leading-5 text-charcoal/62">{check.description}</p></article>;
                })}
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-tonal p-7 sm:p-9">
              <p className="eyebrow">Leave the reef unchanged</p>
              <h2 className="heading-redesign">A good encounter needs no direction from you</h2>
              <div className="mt-7 grid gap-5">
                {data.responsibleRules.map((rule, index) => (
                  <div key={rule.title} className="flex gap-4 border-b border-jade/10 pb-5 last:border-0 last:pb-0">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-jade text-[10px] font-extrabold text-saffron-light">0{index + 1}</span>
                    <div><h3 className="text-sm font-extrabold text-jade">{rule.title}</h3><p className="mt-1 text-xs leading-5 text-charcoal/62">{rule.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pack" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="eyebrow">Pack with purpose</p>
              <h2 className="heading-redesign">What should you bring?</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">Own only what solves a real fit, shore-entry or boat-day task. A good rental mask and appropriate guide remain better than buying a generic set that does not fit.</p>
              <div className="relative mt-7 overflow-hidden rounded-2xl bg-jade p-6 text-white">
                <Sun size={30} strokeWidth={1.4} className="text-saffron-light" />
                <p className="mt-5 font-display text-2xl font-semibold leading-tight">Products are optional.<br />Conditions are not.</p>
                <p className="mt-3 text-xs leading-5 text-white/60">Every retail CTA opens a current Amazon offer through our OneLink-compatible redirect. Availability, seller, price, size and delivery vary by country.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.gear.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <article key={item.title} className="flex min-h-[220px] flex-col rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_8px_28px_rgba(18,63,54,0.045)]">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-jade/10 bg-tonal text-jade"><Icon size={23} strokeWidth={1.45} /></span>
                    <h3 className="mt-5 font-display text-2xl font-semibold leading-none text-jade">{item.title}</h3>
                    <p className="mt-3 text-xs leading-5 text-charcoal/62">{item.description}</p>
                    {item.amazonSlug && item.amazonLabel ? <a href={`/go/${item.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group mt-auto pt-5 text-xs font-extrabold text-jade transition hover:text-saffron-dark"><span className="inline-flex items-center gap-2">{item.amazonLabel} <span className="grid h-7 w-7 place-items-center rounded-md border border-saffron/35 text-saffron-dark"><ArrowRight size={13} className="transition group-hover:translate-x-0.5" /></span></span></a> : null}
                  </article>
                );
              })}
            </div>
            <AffiliateDisclosure className="lg:col-start-2">The drybag, water shoes and travel towel are Amazon affiliate links. As an Amazon Associate, we earn from qualifying purchases. You pay nothing extra; OneLink may route eligible traffic to a local Amazon store. Check the current product, price, seller, size, delivery and suitability yourself.</AffiliateDisclosure>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow="Keep the intent clear" title="Snorkelling and diving are different decisions" description="This page owns the surface-snorkelling choice. Use a dedicated dive guide when breathing equipment, training, depth or medical screening enters the plan." />
            <div className="grid gap-4 md:grid-cols-3">
              {data.diveBoundary.map((item, index) => <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-5"><span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Decision 0{index + 1}</span><h3 className="mt-4 font-display text-[1.55rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/62">{item.description}</p></article>)}
              <Link href="/islands/koh-tao/diving/" className="group md:col-span-3 flex items-center justify-between rounded-xl border border-jade/10 bg-jade px-5 py-4 text-xs font-extrabold text-white">Open the Koh Tao diving decision guide <ArrowRight size={15} className="text-saffron-light transition group-hover:translate-x-1" /></Link>
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real UK search questions" title="Questions about snorkeling in Thailand" description="These questions were captured from live UK-English People Also Ask results through DataForSEO. Answers separate planning windows from same-day conditions and avoid wildlife, visibility or access guarantees." items={data.faqs} />

        <RelatedGuidesSection
          eyebrow="Build the route"
          title="Plan the rest of your island trip"
          guides={data.relatedGuides}
          sideLink={{ label: 'Check current transport options', href: transportHref, affiliate: true }}
          disclosure="The transport link is a 12Go affiliate link. We may receive a commission after a booking, at no extra cost to you. Check the current operator, route, baggage and connection terms."
          readLabel="Open the guide"
        />

        <SourceMethodSection eyebrow="Sources & method" title="Current checks beat copied certainty" description="We combined independent English DFS keyword, SERP, competitor and genuine PAA research with primary Thai park, coastal and tourism sources. We removed fixed visibility, wildlife frequency, fee, closure-calendar and course-price claims that cannot stay true without a live check." sources={data.sources} />

        <section className="py-10">
          <div className="container-custom"><FeedbackForm pageTitle="Snorkeling in Thailand" pageUrl={data.pageUrl} /></div>
        </section>
      </div>
    </>
  );
}
