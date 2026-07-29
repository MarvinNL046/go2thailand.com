import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Backpack,
  CalendarDays,
  Check,
  CloudRain,
  Compass,
  ExternalLink,
  Hotel,
  MapPin,
  Route,
  ShieldCheck,
  Ship,
  Sparkles,
  Sun,
  Waves,
} from 'lucide-react';
import type { SeasonDecisionGuideData } from '../../data/seasons/types';
import { cityAffiliates, KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface SeasonDecisionGuideTemplateProps {
  data: SeasonDecisionGuideData;
}

const toneClasses = {
  strong: 'border-jade/12 bg-white',
  balanced: 'border-saffron/30 bg-tonal',
  flexible: 'border-jade/16 bg-jade text-white',
} as const;

export function SeasonDecisionGuideTemplate({ data }: SeasonDecisionGuideTemplateProps) {
  const cityLinks = cityAffiliates[data.citySlug];
  const hotelHref = withPlacementSubId(cityLinks?.trip || cityLinks?.booking || TRIP_GENERIC, `en-best-time-${data.citySlug}`, 'hotels');
  const activityHref = withPlacementSubId(cityLinks?.klook || KLOOK_GENERIC, `en-best-time-${data.citySlug}`, 'activities');
  const transportHref = withPlacementSubId(cityLinks?.twelveGo || TWELVEGO_GENERIC, `en-best-time-${data.citySlug}`, 'transport');
  const amazonItems = data.packing.items.filter((item) => item.amazonSlug && item.amazonLabel);
  const navItems = [
    { href: '#answer' as const, label: 'Quick answer', icon: Compass },
    { href: '#windows' as const, label: 'Travel windows', icon: Sun },
    { href: '#rhythm' as const, label: 'Month rhythm', icon: CalendarDays },
    { href: '#plan' as const, label: 'Flexible plan', icon: Route },
    { href: '#packing' as const, label: 'What to bring', icon: Backpack },
    { href: '#questions' as const, label: 'FAQs', icon: ShieldCheck },
  ];
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.pageTitle,
      description: data.pageDescription,
      url: data.pageUrl,
      image: `https://go2-thailand.com${data.hero.image}`,
      inLanguage: 'en-GB',
      dateModified: data.dateModified,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': data.pageUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Destinations', item: 'https://go2-thailand.com/city/' },
        { '@type': 'ListItem', position: 3, name: data.cityName, item: `https://go2-thailand.com/city/${data.citySlug}/` },
        { '@type': 'ListItem', position: 4, name: 'Best time to visit', item: data.pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${data.cityName} travel windows`,
      itemListElement: data.windows.map((window, index) => ({ '@type': 'ListItem', position: index + 1, name: `${window.months}: ${window.title}`, description: window.summary })),
    },
  ];

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.hero.image}`}>
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>
      <div className="bg-canvas text-charcoal" data-premium-template="season-decision-guide-en" data-owner={data.citySlug}>
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Destinations', href: '/city/' }, { label: data.cityName, href: `/city/${data.citySlug}/` }, { label: 'Best time to visit' }]}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.titleLead}<br /><span className="text-saffron">{data.hero.titleAccent}</span></>}
          subtitle={data.hero.subtitle}
          description={data.hero.description}
          actions={[{ label: 'See the useful windows', href: '#windows', kind: 'primary' }, { label: `Open ${data.cityName} guide`, href: `/city/${data.citySlug}/`, kind: 'secondary' }]}
          contentTone="light"
          minHeightClassName="min-h-[720px] lg:min-h-[700px]"
          contentClassName="max-w-[790px]"
          titleClassName="max-w-[790px] text-[3.8rem] leading-[0.86] sm:text-[5.2rem] lg:text-[5.8rem]"
          subtitleClassName="max-w-[650px] text-[1.35rem] leading-[1.08] sm:text-[1.7rem]"
          descriptionClassName="mt-4 max-w-[650px] text-sm leading-7"
          imageClassName="object-cover object-[58%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,38,32,0.14)_0%,rgba(4,38,32,0.55)_52%,rgba(4,38,32,0.97)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,38,32,0.98)_0%,rgba(4,38,32,0.88)_42%,rgba(4,38,32,0.14)_72%,rgba(4,38,32,0.04)_100%)]"
          breadcrumbAriaLabel="Breadcrumb"
          sideCard={<aside className="absolute bottom-9 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[320px] rounded-2xl border border-white/22 bg-jade/78 p-6 text-white shadow-editorial-card backdrop-blur-xl xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">{data.hero.sideLabel}</p><strong className="mt-3 block font-display text-[2rem] font-semibold leading-[0.95]">{data.hero.sideTitle}</strong><p className="mt-4 text-[11px] font-medium leading-5 text-white/64">{data.hero.sideDescription}</p></aside>}
        />
        <PageSectionNav label="On this page" items={navItems} />

        <section id="answer" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <SectionHeading eyebrow={data.answer.eyebrow} title={data.answer.title} description={data.answer.description} />
            <div className="grid gap-4 sm:grid-cols-3">
              {data.answer.signals.map((signal, index) => (
                <article key={signal.label} className={`rounded-2xl border p-6 ${index === 2 ? 'border-saffron/35 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}>
                  {index === 0 ? <Sun className="text-saffron-dark" /> : index === 1 ? <Sparkles className="text-jade" /> : <CloudRain className="text-saffron-light" />}
                  <p className={`mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] ${index === 2 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{signal.label}</p>
                  <strong className="mt-2 block font-display text-3xl font-semibold">{signal.value}</strong>
                  <p className={`mt-3 text-xs font-medium leading-5 ${index === 2 ? 'text-white/62' : 'text-charcoal/62'}`}>{signal.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="windows" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Choose what the season gives you" title="Three useful windows. Three honest trade-offs." description="A season label is a planning frame, not a forecast, crowd guarantee or fixed-price calendar. Compare the benefit you want with the flexibility it asks from you." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {data.windows.map((window, index) => (
                <article key={window.months} className={`group overflow-hidden rounded-[26px] border shadow-editorial-card ${index === 1 ? 'border-saffron/32 bg-jade text-white' : 'border-jade/10 bg-white'}`}>
                  <div className="relative h-52 overflow-hidden"><Image src={window.image} alt={window.imageAlt} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/70 to-transparent" /><span className="absolute bottom-4 left-5 rounded-md border border-white/22 bg-jade/55 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">{window.months}</span></div>
                  <div className="p-7">
                    <p className={`text-[9px] font-extrabold uppercase tracking-[0.15em] ${index === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{window.label}</p>
                    <h2 className="mt-2 font-display text-[2rem] font-semibold leading-none">{window.title}</h2>
                    <p className={`mt-4 text-xs font-medium leading-6 ${index === 1 ? 'text-white/68' : 'text-charcoal/64'}`}>{window.summary}</p>
                    <div className={`mt-6 grid gap-4 border-t pt-5 ${index === 1 ? 'border-white/12' : 'border-jade/10'}`}>
                      <div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] opacity-45">What you gain</p><p className="mt-2 text-xs font-medium leading-5 opacity-75">{window.gain}</p></div>
                      <div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] opacity-45">What it asks</p><p className="mt-2 text-xs font-medium leading-5 opacity-75">{window.tradeoff}</p></div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="rhythm" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
            <SectionHeading eyebrow="Month-by-month without fake precision" title="Read the rhythm in two-month blocks." description="Daily weather, closures and live demand move faster than a static table. These blocks tell you what to protect in the itinerary instead of pretending to predict each day." />
            <div className="grid gap-4 sm:grid-cols-2">
              {data.rhythm.map((item) => (
                <article key={item.months} className={`rounded-2xl border p-6 shadow-editorial-card ${toneClasses[item.tone]}`}>
                  <div className="flex items-center justify-between gap-4"><span className={`text-[9px] font-extrabold uppercase tracking-[0.15em] ${item.tone === 'flexible' ? 'text-saffron-light' : 'text-saffron-dark'}`}>{item.months}</span><CalendarDays size={17} className={item.tone === 'flexible' ? 'text-white/45' : 'text-jade/35'} /></div>
                  <h3 className="mt-5 font-display text-[1.8rem] font-semibold leading-none">{item.title}</h3>
                  <p className={`mt-3 text-xs font-medium leading-5 ${item.tone === 'flexible' ? 'text-white/65' : 'text-charcoal/62'}`}>{item.summary}</p>
                  <div className={`mt-5 flex gap-3 border-t pt-4 ${item.tone === 'flexible' ? 'border-white/12' : 'border-jade/10'}`}><Check size={14} className={item.tone === 'flexible' ? 'mt-0.5 shrink-0 text-saffron-light' : 'mt-0.5 shrink-0 text-saffron-dark'} /><p className="text-[11px] font-bold leading-5 opacity-75">{item.plan}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-mist py-14 lg:py-20">
          <div className="container-custom">
            <div className="relative min-h-[530px] overflow-hidden rounded-[30px] shadow-editorial-lift">
              <Image src={data.visual.image} alt={data.visual.imageAlt} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-jade via-jade/82 to-jade/12" />
              <svg aria-hidden="true" viewBox="0 0 500 150" className="absolute bottom-12 right-5 hidden w-[43%] text-saffron lg:block"><path d="M16 118 C95 132 90 38 172 72 S268 142 323 78 S410 25 482 56" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 9" strokeLinecap="round" /><circle cx="16" cy="118" r="7" fill="currentColor" /><path d="M482 40c-11 0-20 9-20 20 0 17 20 36 20 36s20-19 20-36c0-11-9-20-20-20Zm0 27a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" fill="currentColor" /></svg>
              <div className="relative flex min-h-[530px] max-w-[670px] flex-col justify-center p-8 text-white sm:p-12">
                <p className="eyebrow !text-saffron-light">{data.visual.eyebrow}</p>
                <h2 className="font-display text-[3.5rem] font-semibold leading-[0.88] sm:text-[4.1rem]">{data.visual.title}</h2>
                <p className="mt-6 max-w-[590px] text-sm font-medium leading-7 text-white/68">{data.visual.description}</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">{data.visual.bullets.map((bullet) => <span key={bullet} className="rounded-xl border border-white/14 bg-white/[0.07] px-4 py-3 text-[10px] font-bold leading-4 backdrop-blur">{bullet}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.52fr_1.48fr] lg:items-start">
            <SectionHeading eyebrow="Choose by trip style" title={`The best month for your ${data.cityName} trip`} description="The right window depends on the job this destination must do in the wider route." />
            <div className="grid gap-4 sm:grid-cols-2">{data.tripStyles.map((style, index) => <article key={style.title} className={`rounded-2xl border p-6 ${index === 0 ? 'border-saffron/35 bg-tonal shadow-editorial-card' : 'border-jade/10 bg-white'}`}><div className="flex items-center justify-between"><Waves size={19} className="text-jade" /><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{style.months}</span></div><h3 className="mt-6 font-display text-[1.8rem] font-semibold leading-none text-jade">{style.title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{style.description}</p></article>)}</div>
          </div>
        </section>

        <section id="plan" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom"><SectionHeading eyebrow="Plan flexible by design" title="One trip. Three weather-ready versions." description="Choose the exposed activity only after current conditions are visible. The fallback is part of the itinerary—not a consolation prize." /><div className="mt-10 grid gap-5 md:grid-cols-3">{data.plans.map((plan, index) => <article key={plan.label} className={`relative overflow-hidden rounded-[24px] border p-7 ${index === 1 ? 'border-saffron/30 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}><span className={`grid h-12 w-12 place-items-center rounded-full border ${index === 1 ? 'border-white/15 text-saffron-light' : 'border-saffron/30 bg-canvas text-jade'}`}>{index === 0 ? <Sun size={21} /> : index === 1 ? <CloudRain size={21} /> : <MapPin size={21} />}</span><p className={`mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] ${index === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{plan.label}</p><h3 className="mt-2 font-display text-[2rem] font-semibold leading-none">{plan.title}</h3><p className={`mt-4 text-xs font-medium leading-6 ${index === 1 ? 'text-white/65' : 'text-charcoal/62'}`}>{plan.description}</p></article>)}</div></div>
        </section>

        <section id="packing" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="relative min-h-[430px] overflow-hidden rounded-[28px] shadow-editorial-lift"><Image src={data.packing.image} alt={data.packing.imageAlt} fill sizes="(max-width:1024px) 100vw, 46vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/76 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white"><p className="eyebrow !text-saffron-light">Pack for the task</p><h2 className="font-display text-[2.8rem] font-semibold leading-none">What should you bring?</h2><p className="mt-3 max-w-[550px] text-xs font-medium leading-6 text-white/70">{data.packing.intro}</p></div></div>
            <div className="grid gap-3 sm:grid-cols-2">{data.packing.items.map((item) => <article key={item.title} className="flex min-h-[190px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Backpack size={19} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-3 flex-1 text-xs font-medium leading-5 text-charcoal/62">{item.description}</p>{item.amazonSlug && item.amazonLabel ? <a href={`/go/${item.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group mt-5 inline-flex items-center gap-2 text-[11px] font-extrabold text-jade transition hover:text-saffron-dark">{item.amazonLabel}<span className="grid h-7 w-7 place-items-center rounded-md border border-saffron/35 text-saffron-dark"><ExternalLink size={12} /></span></a> : null}</article>)}</div>
          </div>
          {amazonItems.length > 0 ? <div className="container-custom"><AffiliateDisclosure className="mt-4">As an Amazon Associate, Go2Thailand earns from qualifying purchases. OneLink may route eligible visitors to a local Amazon store. Product, seller, size, price, delivery and availability vary by country; always check the current offer.</AffiliateDisclosure></div> : null}
        </section>

        <section className="section-divider-bottom bg-jade py-16 text-white lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end"><div><p className="eyebrow !text-saffron-light">After choosing the window</p><h2 className="font-display text-[3.45rem] font-semibold leading-[0.9]">Check what is actually available.</h2><p className="mt-5 max-w-[560px] text-sm font-medium leading-7 text-white/68">No frozen price or permanent schedule belongs here. Compare your exact dates, the complete journey and current change terms.</p></div><p className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 text-xs font-medium leading-6 text-white/62">{data.affiliate.note}</p></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {data.affiliate.hotel ? <AffiliateCard icon={Hotel} title="Accommodation" description="Compare the exact area, room, dates and cancellation terms." href={hotelHref} label="Check current hotel options" /> : null}
              {data.affiliate.activities ? <AffiliateCard icon={Sparkles} title="Activities" description="Check the current programme, meeting point, access and change terms." href={activityHref} label="Check current activities" /> : null}
              {data.affiliate.transport ? <AffiliateCard icon={Ship} title="Transport" description="Compare operators, luggage, handoffs and the complete route for your dates." href={transportHref} label="Check current transport" /> : null}
              <article className="flex min-h-[245px] flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-7"><Compass className="text-saffron-light" /><h3 className="mt-7 font-display text-3xl font-semibold">Destination owner</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-white/62">Build the stay length and daily rhythm before adding another paid booking.</p><Link href={`/city/${data.citySlug}/`} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-white">Open {data.cityName} guide <ArrowRight size={13} className="text-saffron-light" /></Link></article>
            </div>
            <AffiliateDisclosure className="mt-4 !text-white/62">Commercial links are affiliate links. Go2Thailand may earn a commission without increasing your price. Providers control current availability, price and terms.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real UK search questions" title={`${data.cityName} timing FAQs`} description="These questions preserve the useful planning intent found in the live UK SERP and related DFS cluster. Answers separate durable seasonal orientation from details that need a current primary or operator check." items={data.faqs} />
        <RelatedGuidesSection eyebrow="Turn timing into a route" title={`Plan the rest of your ${data.cityName} trip`} guides={data.relatedGuides} readLabel="Open the owner" />
        <SourceMethodSection eyebrow="Sources & method" title="Season guidance is a decision frame—not a forecast." description={`${data.researchNote} ${data.affiliate.note}`} sources={data.sources} />
      </div>
    </>
  );
}

interface AffiliateCardProps {
  icon: typeof Hotel;
  title: string;
  description: string;
  href: string;
  label: string;
}

function AffiliateCard({ icon: Icon, title, description, href, label }: AffiliateCardProps) {
  return <article className="flex min-h-[245px] flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-7"><Icon className="text-saffron-light" /><h3 className="mt-7 font-display text-3xl font-semibold">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-white/62">{description}</p><a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-white">{label} <ExternalLink size={13} className="text-saffron-light" /></a></article>;
}
