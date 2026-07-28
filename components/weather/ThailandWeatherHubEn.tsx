import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  CloudRain,
  ExternalLink,
  MapPinned,
  Mountain,
  Navigation,
  ShieldCheck,
  Shirt,
  Sparkles,
  Sun,
  ThermometerSun,
  Umbrella,
  Waves,
  Wind,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { KLOOK_GENERIC, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import {
  bangkokWeatherGuide,
  chiangMaiWeatherGuide,
  kohSamuiWeatherGuide,
  krabiWeatherGuide,
  phuketWeatherGuide,
} from '../../data/weather/nl';

const monthSlugs = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const;
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;
const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const monthVerdicts = [
  { title: 'Strong all-round month', note: 'Often a useful balance for cities, the north and the Andaman coast; it is also a popular period.' },
  { title: 'Dry, bright and popular', note: 'Strong for many routes. Heat and northern haze risk can increase later in the month.' },
  { title: 'Choose by activity', note: 'Heat builds in cities and the north; coast choice and air quality deserve more weight.' },
  { title: 'Heat sets the rhythm', note: 'Start early, protect the middle of the day and check local conditions around Songkran.' },
  { title: 'The greener transition', note: 'Shower risk grows, especially on the Andaman side. Flexibility becomes more valuable.' },
  { title: 'Green season, different coasts', note: 'Thailand does not share one pattern. Compare the region, wind and sea conditions.' },
  { title: 'A summer trip needs a coast choice', note: 'The north and centre are green and changeable; the Gulf may fit a beach-led route better.' },
  { title: 'Expect tropical variation', note: 'A dry day and a heavy shower can sit inside the same travel week.' },
  { title: 'Stronger wet-season signals', note: 'Leave boat days flexible, reduce hard connections and follow official warnings.' },
  { title: 'The transition moves by coast', note: 'The north and Bangkok can improve while parts of the Gulf become wetter.' },
  { title: 'North and Andaman reopen', note: 'A strong route window, although the Gulf can still follow a different rainfall pattern.' },
  { title: 'Cooler rhythm, busy season', note: 'Often strong for a broad itinerary; popular rooms and transport can tighten.' },
] as const;

const representativeRegions = [
  { label: 'North', city: 'Chiang Mai', href: '/city/chiang-mai/weather/', icon: Mountain, data: chiangMaiWeatherGuide },
  { label: 'Central', city: 'Bangkok', href: '/city/bangkok/weather/', icon: MapPinned, data: bangkokWeatherGuide },
  { label: 'Andaman', city: 'Krabi', href: '/city/krabi/weather/', icon: Waves, data: krabiWeatherGuide },
  { label: 'Andaman', city: 'Phuket', href: '/city/phuket/weather/', icon: Waves, data: phuketWeatherGuide },
  { label: 'Gulf', city: 'Koh Samui', href: '/city/koh-samui/weather/', icon: Wind, data: kohSamuiWeatherGuide },
] as const;

const faqs = [
  { question: 'What is the best month to go to Thailand?', answer: 'January and February are often strong all-round choices for Bangkok, the north and the Andaman coast, but there is no single best month for every Thai route. Gulf weather, crowd levels, heat, air quality and your main activity can change the answer. Use the regional month comparison first, then open the dedicated best-time guide for travel-style trade-offs.' },
  { question: 'What are the rainy months in Thailand?', answer: 'Many northern, central and Andaman destinations receive more rain during the southwest-monsoon period from roughly May into October, but the start, peak and end vary by place and year. The Gulf coast around Koh Samui often has a later wet signal, so one national rainy-season label is not enough for route planning.' },
  { question: 'What is the wettest month in Thailand?', answer: 'There is no reliable country-wide winner. September and October are wet at many northern, central and Andaman stations, while Gulf stations can peak later. Compare the station-level climate normal for your destination and treat it as a planning pattern rather than a forecast.' },
  { question: 'Is Thailand too rainy in July?', answer: 'Not automatically. July can bring green landscapes, showers and more changeable transport or sea conditions. A focused city-and-north route or a carefully chosen Gulf base may still work well. Keep outdoor days flexible and check the local Thai Meteorological Department forecast before a boat or hiking day.' },
  { question: 'Is it rainy season in Phuket?', answer: 'Phuket is exposed to the southwest monsoon and is generally wetter and more changeable from around May into October than during the drier part of the year. Exact conditions vary, and rainfall alone does not describe wind, waves or boat safety. Check the live Phuket forecast and marine warnings close to travel.' },
  { question: 'Should I go to Koh Samui in December?', answer: 'December can still sit inside Koh Samui’s later Gulf wet pattern, even when Bangkok and the Andaman coast are becoming drier. It is not an automatic no, but choose flexible hotel and activity terms and check the current local forecast before fixing sea-dependent plans.' },
  { question: 'What is the hottest month in Thailand?', answer: 'April is commonly the hottest planning month across much of upper Thailand, but station averages and daily extremes differ. Heat exposure, shade, hydration and early starts matter more than a single national temperature figure.' },
  { question: "What's the coldest month in Thailand?", answer: 'December or January often produces the coolest averages in upper Thailand. Bangkok remains warm, while northern mountains can feel genuinely cool around dawn. Southern beach conditions follow a different pattern and should not be inferred from northern temperatures.' },
  { question: 'Which months to avoid in Thailand?', answer: 'No month should be rejected for the whole country. Avoid matching the wrong coast or activity to the month instead: exposed Andaman boat plans need more caution in the southwest monsoon, Gulf plans need their own late-year check, and northern trips need heat and air-quality planning around the hot season.' },
  { question: 'Is the weather bad in Thailand right now?', answer: 'Climate averages cannot answer what is happening now. Open the Thai Meteorological Department forecast and warnings for the exact province, then check marine information before a boat trip. A national weather icon is not a local operating decision.' },
];

const sectionNav = [
  { href: '#month' as const, label: 'By month', icon: CalendarDays },
  { href: '#coasts' as const, label: 'Coasts', icon: Waves },
  { href: '#seasons' as const, label: 'Seasons', icon: Sun },
  { href: '#plan-b' as const, label: 'Plan B', icon: Umbrella },
  { href: '#book' as const, label: 'Book', icon: Navigation },
  { href: '#questions' as const, label: 'FAQs', icon: ShieldCheck },
];

function toneClasses(tone: 'best' | 'good' | 'mixed' | 'wet') {
  if (tone === 'best') return 'bg-jade text-white';
  if (tone === 'good') return 'bg-mist text-jade';
  if (tone === 'mixed') return 'bg-saffron/12 text-jade';
  return 'bg-[#dbe7ea] text-jade';
}

function toneLabel(tone: 'best' | 'good' | 'mixed' | 'wet') {
  return tone === 'best' ? 'Strong window' : tone === 'good' ? 'Useful window' : tone === 'mixed' ? 'Mixed' : 'Wetter pattern';
}

export default function ThailandWeatherHubEn() {
  const [monthIndex, setMonthIndex] = useState(0);
  const selectedMonth = representativeRegions[0].data.months[monthIndex];
  const verdict = monthVerdicts[monthIndex];
  const tripHref = withPlacementSubId(TRIP_GENERIC, 'en-thailand-weather-hub', 'flexible-hotels');
  const klookHref = withPlacementSubId(KLOOK_GENERIC, 'en-thailand-weather-hub', 'weather-flexible-activities');
  const regionRows = useMemo(() => representativeRegions.map((region) => ({ ...region, month: region.data.months[monthIndex] })), [monthIndex]);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand weather by month, region and coast', description: 'Compare Thailand weather, climate and rainy-season patterns by month, region and coast using official climate normals.', url: 'https://go2-thailand.com/weather/', inLanguage: 'en-GB', dateModified: '2026-07-27' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' }, { '@type': 'ListItem', position: 2, name: 'Thailand weather', item: 'https://go2-thailand.com/weather/' }] };
  const datasetSchema = { '@context': 'https://schema.org', '@type': 'Dataset', name: 'Thailand monthly climate normals by region', description: 'Interactive comparison of average high temperature, rainfall and rain days for Chiang Mai, Bangkok, Krabi, Phuket and Koh Samui using TMD 1991–2020 climate normals.', url: 'https://go2-thailand.com/weather/', temporalCoverage: '1991/2020', spatialCoverage: representativeRegions.map((region) => ({ '@type': 'Place', name: `${region.city}, Thailand` })), creator: { '@type': 'Organization', name: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/' }, variableMeasured: ['Mean maximum temperature', 'Mean monthly rainfall', 'Mean rainy days'] };

  return <>
    <SEOHead title="Thailand Weather by Month & Rainy Season | Go2Thailand" description="Compare Thailand weather by month, region and coast. Use official climate normals to understand rainy season, heat and the Andaman–Gulf split." ogImage="https://go2-thailand.com/images/redesign/thailand-weather-hub-hero.webp">
      {[faqSchema, webPageSchema, breadcrumbSchema, datasetSchema].map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>

    <div className="bg-canvas text-charcoal" data-premium-template="thailand-weather-hub-en">
      <EditorialHero image="/images/redesign/thailand-weather-hub-hero.webp" imageAlt="Thailand landscape moving from misty northern mountains to a tropical coast under changing weather" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Weather' }]} eyebrow="Choose the route before the month" title={<>Thailand weather.<br /><span className="text-saffron">Where works when?</span></>} subtitle="Not one rainy season. Five regional patterns." description="Compare twelve months using official climate normals from five destinations—then see why the Andaman and Gulf coasts never fit one simple weather label." actions={[{ label: 'Compare your month', href: '#month', kind: 'primary' }, { label: 'Understand the coast switch', href: '#coasts', kind: 'secondary' }]} minHeightClassName="min-h-[740px] lg:min-h-[710px]" titleClassName="max-w-[850px] text-[3.7rem] leading-[0.86] !text-white sm:text-[5.1rem] lg:text-[6rem]" subtitleClassName="max-w-[610px] !text-white" descriptionClassName="mt-4 max-w-[610px] text-sm leading-7 !text-white/80" imageClassName="object-cover object-[61%_center] lg:object-center" gradientClassName="bg-[linear-gradient(180deg,rgba(6,45,37,0.24)_0%,rgba(6,45,37,0.34)_42%,rgba(6,45,37,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.98)_0%,rgba(4,42,34,0.9)_38%,rgba(4,42,34,0.18)_62%,rgba(4,42,34,0.04)_100%)]" contentClassName="max-w-[850px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75" sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[310px] rounded-2xl border border-white/25 bg-jade/78 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">The decision rule</p><p className="mt-3 font-display text-2xl font-semibold leading-tight">Month + region + activity. Then you have a useful answer.</p><div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold text-white/58"><CloudRain size={16} className="text-saffron-light" />Climate is not a day forecast.</div></div>} />
      <PageSectionNav items={sectionNav} />

      <section className="section-divider-bottom py-14 lg:py-20"><div className="container-custom grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <SectionHeading eyebrow="The short answer" title="There is no best month for all of Thailand." description="November to February is a useful first-trip rule, but it hides the important part: the north, Bangkok, Andaman and Gulf do not move in sync." />
        <div className="grid gap-4 sm:grid-cols-3">{[
          { icon: Mountain, label: 'Broad itinerary', value: 'Nov – Feb', text: 'Often the best balance for cities, the north and the Andaman coast.' },
          { icon: Waves, label: 'Andaman coast', value: 'Dec – Mar', text: 'Generally drier; still check wind and waves before every boat day.' },
          { icon: Sun, label: 'Gulf coast', value: 'Jan – Sep', text: 'Can offer a different summer option, with a wetter signal later in the year.' },
        ].map((item, index) => { const Icon = item.icon; return <article key={item.label} className={`rounded-2xl border p-5 ${index === 1 ? 'border-saffron/35 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}><div className="flex items-center justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl border ${index === 1 ? 'border-white/18 text-saffron-light' : 'border-saffron/28 text-jade'}`}><Icon size={19} /></span><span className={`text-[9px] font-extrabold uppercase tracking-[0.13em] ${index === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{item.label}</span></div><strong className={`mt-5 block font-display text-3xl font-semibold ${index === 1 ? 'text-white' : 'text-jade'}`}>{item.value}</strong><p className={`mt-3 text-xs font-medium leading-5 ${index === 1 ? 'text-white/62' : 'text-charcoal/58'}`}>{item.text}</p></article>; })}</div>
      </div></section>

      <section id="month" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom">
        <SectionHeading eyebrow="Interactive month comparison" title="What does your month do in each region?" description="Figures are TMD 1991–2020 climate normals from representative stations. They describe a long-term pattern, not the forecast for your travel day." />
        <div className="mt-9 grid grid-cols-6 gap-2 lg:grid-cols-12" role="group" aria-label="Choose a travel month">{monthShortNames.map((month, index) => <button key={month} type="button" aria-pressed={monthIndex === index} onClick={() => setMonthIndex(index)} className={`min-h-12 rounded-xl border px-2 text-[10px] font-extrabold transition ${monthIndex === index ? 'border-jade bg-jade text-white shadow-editorial-card' : 'border-jade/10 bg-white text-jade hover:border-saffron/40'}`}>{month}</button>)}</div>
        <div className="mt-5 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-jade p-7 text-white sm:p-10" aria-live="polite"><p className="eyebrow !text-saffron-light">{monthNames[monthIndex]} in context</p><h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.04em]">{verdict.title}</h2><p className="mt-5 text-sm font-medium leading-6 text-white/66">{verdict.note}</p><div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.06] p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/42">Read the data correctly</p><p className="mt-3 text-xs font-semibold leading-5 text-white/72">A rainy day is counted when measurable rain falls. It does not mean the whole day is washed out.</p></div><Link href={`/thailand-in/${monthSlugs[monthIndex]}/`} className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-white">Open the full month guide <ExternalLink size={13} className="text-saffron-light" /></Link></div>
          <div className="grid gap-px bg-jade/10 sm:grid-cols-2">{regionRows.map((region, index) => { const Icon = region.icon; return <article key={region.city} className={`bg-white p-6 sm:p-7 ${index === regionRows.length - 1 ? 'sm:col-span-2' : ''}`}><div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{region.label}</p><h3 className="mt-2 font-display text-2xl font-semibold text-jade">{region.city}</h3></div><span className={`grid h-10 w-10 place-items-center rounded-xl ${toneClasses(region.month.travelTone)}`}><Icon size={18} /></span></div><div className="mt-5 grid grid-cols-3 gap-3 border-y border-jade/8 py-4"><div><span className="block text-[9px] font-bold text-charcoal/42">high</span><strong className="font-display text-xl text-jade">{region.month.meanHigh}°</strong></div><div><span className="block text-[9px] font-bold text-charcoal/42">rain</span><strong className="font-display text-xl text-jade">{region.month.rainfall}</strong><span className="ml-0.5 text-[9px] text-charcoal/42">mm</span></div><div><span className="block text-[9px] font-bold text-charcoal/42">days</span><strong className="font-display text-xl text-jade">{region.month.rainDays}</strong></div></div><div className="mt-4 flex items-center justify-between gap-3"><span className={`rounded-full px-3 py-1 text-[9px] font-extrabold ${toneClasses(region.month.travelTone)}`}>{toneLabel(region.month.travelTone)}</span><Link href={region.href} className="text-[10px] font-extrabold text-jade">Local guide →</Link></div></article>; })}</div>
        </div></div>
      </div></section>

      <section id="coasts" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom">
        <SectionHeading eyebrow="The mistake simple calendars make" title="Andaman and the Gulf are not twins." description="A national rain icon can send you to the wrong coast. Wind direction, sea state and the Gulf’s later wet pattern change the beach decision." />
        <div className="relative mt-10 min-h-[640px] overflow-hidden rounded-[30px] shadow-editorial-lift"><Image src="/images/redesign/thailand-weather-coast-switch.webp" alt="Rain over Thailand’s Andaman coast beside brighter conditions on the Gulf coast" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/12 to-transparent" /><div className="absolute inset-x-5 bottom-5 grid gap-3 md:inset-x-8 md:bottom-8 md:grid-cols-3"><article className="rounded-2xl border border-white/18 bg-jade/78 p-5 text-white backdrop-blur-md"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">West coast</p><h2 className="mt-2 font-display text-2xl font-semibold">Andaman</h2><p className="mt-3 text-xs font-medium leading-5 text-white/64">Krabi and Phuket are generally stronger in the drier window around December to March.</p></article><article className="rounded-2xl border border-saffron/35 bg-canvas p-5 text-jade shadow-editorial-card"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Decide by activity</p><h2 className="mt-2 font-display text-2xl font-semibold">Boat day ≠ beach day</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">For boats, wind, waves, visibility and warnings matter more than a rain percentage.</p></article><article className="rounded-2xl border border-white/18 bg-jade/78 p-5 text-white backdrop-blur-md"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">East coast</p><h2 className="mt-2 font-display text-2xl font-semibold">Gulf</h2><p className="mt-3 text-xs font-medium leading-5 text-white/64">Koh Samui and nearby islands often show their wetter pattern later in the year.</p></article></div></div>
      </div></section>

      <section id="seasons" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom">
        <SectionHeading eyebrow="Three words, many local exceptions" title="Use seasons as a start—not the final answer." description="Cool, hot and green give a first orientation. Your region, coast and current local conditions decide whether the month fits the route." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">{[
          { icon: Wind, step: '01', months: 'Nov – Feb', title: 'Cooler season', text: 'Strong for many itineraries and walking. Northern mornings can feel cool; demand and price pressure often rise.' },
          { icon: ThermometerSun, step: '02', months: 'Mar – May', title: 'Hot season', text: 'Early starts and a slower midday rhythm matter. In the north, current air quality belongs in the decision.' },
          { icon: CloudRain, step: '03', months: 'May – Oct', title: 'Green season', text: 'More showers and greener landscapes. Timing and impact differ materially by region and coast.' },
        ].map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/28 bg-canvas text-jade"><Icon size={20} /></span><span className="font-display text-4xl font-semibold text-jade/10">{item.step}</span></div><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.months}</p><h2 className="mt-2 font-display text-3xl font-semibold text-jade">{item.title}</h2><p className="mt-4 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p></article>; })}</div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{monthNames.map((month, index) => <Link key={month} href={`/thailand-in/${monthSlugs[index]}/`} className="group rounded-2xl border border-jade/10 bg-white p-4 shadow-editorial-card transition hover:-translate-y-0.5 hover:border-saffron/35"><div className="flex items-center justify-between"><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{String(index + 1).padStart(2, '0')}</span><span className={`h-2.5 w-2.5 rounded-full ${selectedMonth.travelTone === 'best' && monthIndex === index ? 'bg-jade' : 'bg-saffron'}`} /></div><strong className="mt-4 block font-display text-xl text-jade">{month}</strong><span className="mt-2 block text-[9px] font-bold text-charcoal/46">month guide →</span></Link>)}</div>
      </div></section>

      <section id="plan-b" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom overflow-hidden rounded-[30px] border border-jade/8 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[510px]"><Image src="/images/redesign/thailand-weather-day-kit.webp" alt="Light clothing, rain layer, dry bag, sunscreen and water bottle for changeable tropical weather" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" /></div>
        <div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">A tropical day is not an icon</p><h2 className="font-display text-[3.3rem] font-semibold leading-[0.86] tracking-[-0.035em]">Plan for recovery, not perfect weather.</h2><p className="mt-5 text-sm font-medium leading-6 text-white/64">A compact rain layer, dry bag and one flexible day keep a shower small. The real risk is making every boat, transfer and activity depend on one exact sequence.</p><div className="mt-7 grid gap-3"><a href="/go/hagon-rain-ponchos/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3 text-xs font-extrabold"><span className="flex items-center gap-3"><Umbrella size={16} className="text-saffron-light" />Check current lightweight rain layers</span><ExternalLink size={13} /></a><a href="/go/earth-pak-dry-bag/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3 text-xs font-extrabold"><span className="flex items-center gap-3"><ShieldCheck size={16} className="text-saffron-light" />Check current dry-bag options</span><ExternalLink size={13} /></a><a href="/go/hovsiyla-quick-dry-shirt/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3 text-xs font-extrabold"><span className="flex items-center gap-3"><Shirt size={16} className="text-saffron-light" />Check current quick-dry layers</span><ExternalLink size={13} /></a></div><AffiliateDisclosure className="mt-4 !text-white/60">These three links are Amazon affiliate links routed through our OneLink-compatible product registry. We may earn a commission without increasing your price. Check size, material, delivery and current availability yourself.</AffiliateDisclosure></div>
      </div></div></section>

      <section id="book" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end"><SectionHeading eyebrow="Choose the climate, check the live terms" title="Book with room for local weather." description="The month comparison gives direction. Before travel, check the local TMD forecast, warnings, cancellation terms and exact pickup or departure point." /><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-jade/10 bg-white px-4 py-3 text-[10px] font-bold text-jade">1 · choose region</div><div className="rounded-xl border border-jade/10 bg-white px-4 py-3 text-[10px] font-bold text-jade">2 · compare months</div><div className="rounded-xl border border-jade/10 bg-white px-4 py-3 text-[10px] font-bold text-jade">3 · check local weather</div></div></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3"><a href="https://www.tmd.go.th/en" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/28 bg-canvas text-jade"><CloudRain size={20} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Official</p><h2 className="mt-2 font-display text-3xl font-semibold text-jade">TMD forecast</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">Check the local forecast and warnings close to every outdoor or boat day.</p></a><a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/28 bg-canvas text-jade"><CalendarDays size={20} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Stay</p><h2 className="mt-2 font-display text-3xl font-semibold text-jade">Trip.com</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">Compare the same dates, district and cancellation terms before fixing the route.</p></a><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/28 bg-canvas text-jade"><Sparkles size={20} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Experience</p><h2 className="mt-2 font-display text-3xl font-semibold text-jade">Klook</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">Read inclusions, pickup zone and change terms for the exact live product.</p></a></div>
        <AffiliateDisclosure className="mt-3">Trip.com and Klook links are affiliate links. Go2Thailand may earn a commission without increasing your price. Climate normals never guarantee availability or safe operating conditions.</AffiliateDisclosure>
      </div></section>

      <FaqSplitSection id="questions" eyebrow="Real UK search questions" title="Thailand weather FAQs" description="Questions were returned verbatim in ten live UK Google SERPs captured through DataForSEO on 27 July 2026. Answers separate climate, region and live forecast." items={faqs} />
      <RelatedGuidesSection eyebrow="Zoom into your route" title="From national pattern to local decision" guides={[{ title: 'Bangkok weather', description: 'Urban heat, rainfall and a workable daily rhythm by month.', href: '/city/bangkok/weather/', image: '/images/cities/bangkok/redesign/bangkok-weather-hero.webp', imageAlt: 'Bangkok under changing tropical weather' }, { title: 'Chiang Mai weather', description: 'Cool months, heat, rainfall and the separate air-quality check.', href: '/city/chiang-mai/weather/', image: '/images/cities/chiang-mai/redesign/chiang-mai-weather-hero.webp', imageAlt: 'Chiang Mai mountains in morning light' }, { title: 'Krabi weather', description: 'Andaman conditions, boat-day decisions and a useful plan B.', href: '/city/krabi/weather/', image: '/images/redesign/krabi-destination-hero.webp', imageAlt: 'Krabi coast and limestone cliffs' }]} sideLink={{ label: 'Choose the best time for your travel style', href: '/blog/best-time-to-visit-thailand/' }} />
      <SourceMethodSection eyebrow="Sources & method" title="Climate is measurable. Your travel day remains local." description="Six DataForSEO clusters produced 1,053 raw records and 929 unique keyword strings. Ten live UK-English SERPs returned 85 organic results and 57 PAA records. The interactive comparison uses official TMD 1991–2020 climate normals from five representative stations; current trips are handed to the live local TMD service." sources={[{ title: 'Climate normals 1991–2020', creator: 'Thai Meteorological Department', url: 'https://ubonmet.tmd.go.th/files/MetInfo/climate_normal.pdf', note: 'Primary source for monthly temperature, rainfall and rainy-day averages at Chiang Mai, Bangkok, Krabi, Phuket and Koh Samui stations.' }, { title: 'Climate charts', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en/ClimateChart', note: 'Official long-term rainfall and temperature context.' }, { title: 'Current forecasts and warnings', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Use for the actual travel day; climate normals are not a live forecast.' }, { title: 'Thailand climate and weather', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Plan-Your-Trip/Weather', note: 'Official high-level three-season and monsoon context.' }, { title: 'Weather by month', creator: 'G Adventures', url: 'https://www.gadventures.com/blog/thailand-weather/', note: 'UK SERP competitor benchmark for month-by-month format.' }, { title: 'Regional weather overview', creator: 'Selective Asia', url: 'https://www.selectiveasia.com/thailand-holidays/weather', note: 'UK SERP competitor benchmark for regional and coast grouping.' }]} />
    </div>
  </>;
}
