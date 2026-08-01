import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  Check,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  Hotel,
  Landmark,
  MapPinned,
  PlaneTakeoff,
  RefreshCw,
  Route,
  ShieldCheck,
  Smartphone,
  Stamp,
  WalletCards,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

const PAGE_URL = 'https://go2-thailand.com/visa/tourist-visa/';
const THAI_E_VISA = 'https://www.thaievisa.go.th/';
const EMBASSY_GENERAL = 'https://london.thaiembassy.org/en/page/visa-general-information?menu=64cd03802f080d54bb16df93';
const EMBASSY_TOURIST = 'https://london.thaiembassy.org/en/page/tourist-single-entry-visa';
const EMBASSY_EXEMPTION = 'https://london.thaiembassy.org/en/page/exemp-visa';
const EMBASSY_FEES = 'https://london.thaiembassy.org/en/publicservice/81755-visa-fees?cate=5d6636c215e39c3bd0006c8d';
const GOV_UK = 'https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements';
const IMMIGRATION_EXTENSION = 'https://www.immigration.go.th/wp-content/uploads/2023/01/5-Public-Handbook-2.4-tourism-purpose.pdf';

const sectionNav = [
  { href: '#decision' as const, label: 'Do you need one?', icon: ShieldCheck },
  { href: '#route' as const, label: 'Choose a route', icon: Route },
  { href: '#clocks' as const, label: '60 days explained', icon: CalendarClock },
  { href: '#evidence' as const, label: 'Documents', icon: FileCheck2 },
  { href: '#apply' as const, label: 'Apply', icon: Smartphone },
  { href: '#questions' as const, label: 'FAQs', icon: CircleAlert },
];

type RouteKey = 'exemption' | 'single' | 'multiple';

const routeOptions: Array<{
  key: RouteKey;
  tab: string;
  kicker: string;
  title: string;
  verdict: string;
  facts: string[];
  caution: string;
}> = [
  {
    key: 'exemption',
    tab: 'British holiday up to 60 days',
    kicker: 'Visa exemption · current UK rule',
    title: 'A full British citizen passport normally does not need a tourist visa first.',
    verdict: 'At our 27 July 2026 source check, GOV.UK and the Royal Thai Embassy in London both state that UK ordinary passport holders can visit for tourism for up to 60 days under the visa-exemption route.',
    facts: ['No e-Visa application before travel', 'Proof of planned departure may be requested', 'A TDAC is still required for each arrival', 'The immigration stamp controls your actual leave-by date'],
    caution: 'Visa exemption is not a visa, and neither route guarantees admission. Check the live rule again before booking and before departure.',
  },
  {
    key: 'single',
    tab: 'One planned tourist entry',
    kicker: 'Tourist TR · single entry',
    title: 'One entry window and up to 60 days after you arrive.',
    verdict: 'A single-entry Tourist Visa can fit travellers who are not eligible for exemption or whose itinerary needs a visa arranged in advance. The London embassy lists three months of visa validity and up to 60 days of permitted stay.',
    facts: ['Official London fee listed as £30', 'Enter within the three-month visa-validity window', 'Permitted stay is up to 60 days', 'Apply online while physically in the embassy service area'],
    caution: 'Three months of visa validity is not a 90-day stay. The visa must be used within that window; your entry stamp sets the permitted stay.',
  },
  {
    key: 'multiple',
    tab: 'Several arrivals in 6 months',
    kicker: 'Tourist visa · multiple entry',
    title: 'Multiple entries, each assessed at the border, within a six-month visa window.',
    verdict: 'The official London sources list a multiple-entry tourist visa valid for six months, with a permitted stay of up to 60 days per entry. It is a route for genuine repeated tourist arrivals, not one continuous six-month stay.',
    facts: ['Official London fee listed as £150', 'Six-month visa-validity window', 'Up to 60 days per entry', 'A fresh TDAC is required for each arrival'],
    caution: 'Do not treat a border crossing as a guaranteed reset. Entry and the duration granted remain immigration decisions each time.',
  },
];

const quickFacts = [
  { icon: ShieldCheck, label: 'British passport', value: 'Check exemption first', text: 'A short holiday may not need a tourist visa at all.' },
  { icon: Stamp, label: 'Tourist Visa stay', value: 'Up to 60 days', text: 'Separate this from the visa-validity window.' },
  { icon: CalendarClock, label: 'London processing', value: 'About 15 workdays', text: 'The embassy advises applying 6–8 weeks before departure.' },
  { icon: WalletCards, label: 'Official listed fees', value: '£30 / £150', text: 'Single versus multiple entry; always recheck before payment.' },
];

const evidenceItems = [
  'Passport or travel document meeting the live validity rules',
  'Proof that you currently reside in the UK, Ireland or a UK Territory',
  'Confirmed flight itinerary issued by the airline',
  'Accommodation or invitation details that match your plan',
  'Financial evidence requested in the live e-Visa checklist',
  'Any purpose-specific documents shown after you select Tourist Visa',
];

const faqs = [
  { question: 'Do UK tourists need a visa for Thailand?', answer: 'For a full British citizen passport, the official sources checked on 27 July 2026 state that a tourist visit of up to 60 days can normally use visa exemption. Different passports, travel documents, purposes or longer plans can require a visa. Recheck GOV.UK and the Royal Thai Embassy immediately before travel.' },
  { question: 'Do I need a visa for a two-week holiday in Thailand?', answer: 'A British citizen travelling on a full British passport would normally use the current visa-exemption route for a two-week holiday, not apply for a Tourist Visa. You still need to meet the entry conditions and complete a TDAC for the arrival.' },
  { question: 'Can I stay in Thailand for 60 days without a visa?', answer: 'The current UK guidance says British citizens may visit for 60 days for tourism and certain other permitted activities. That is a visa exemption, not a Tourist Visa. Your passport stamp is the practical record of the stay granted at the border.' },
  { question: 'How much is a Thailand Tourist Visa from the UK?', answer: 'The Royal Thai Embassy in London fee page checked on 27 July 2026 lists £30 for a single-entry Tourist Visa and £150 for a multiple-entry Tourist Visa. Fees can change and are paid through the official process, so confirm the live amount before submitting.' },
  { question: 'What documents do I need for a Thailand Tourist Visa?', answer: 'The official e-Visa flow determines the exact upload list for your nationality and location. Expect identity, residence, confirmed travel, accommodation and financial evidence, plus any case-specific documents. Use the live checklist rather than copying an old third-party list.' },
  { question: 'How long does a Thailand e-Visa take in the UK?', answer: 'The London embassy currently describes a standard processing time of approximately 15 working days and recommends applying 6–8 weeks before departure. Extra documents or an interview can add time, so this is guidance rather than a guarantee.' },
  { question: 'Can I extend a Tourist Visa in Thailand?', answer: 'An extension may be requested at a Thai Immigration office before your permitted stay expires, but it is a separate application and not an automatic entitlement. The dedicated extension guide owns the document, timing and overstay questions.' },
  { question: 'Is the TDAC the same as an e-Visa?', answer: 'No. The Thailand Digital Arrival Card is an arrival registration, not permission to stay. Travellers complete it separately within the official submission window for every entry, whether arriving with a visa or using visa exemption.' },
];

export default function ThailandTouristVisaGuideEn() {
  const [selectedKey, setSelectedKey] = useState<RouteKey>('exemption');
  const selected = routeOptions.find((item) => item.key === selectedKey) ?? routeOptions[0];
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'en-tourist-visa-first-stay');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'en-tourist-visa-onward-proof');

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand Tourist Visa from the UK', description: 'Decision-first guide to Thailand visa exemption, single-entry and multiple-entry Tourist Visas for UK travellers.', url: PAGE_URL, inLanguage: 'en-GB', dateModified: '2026-07-27' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
    { '@type': 'ListItem', position: 2, name: 'Thailand visas', item: 'https://go2-thailand.com/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Tourist Visa', item: PAGE_URL },
  ] };

  return (
    <>
      <SEOHead title="Thailand Tourist Visa UK: do you actually need one?" description="Thailand Tourist Visa guide for UK travellers. Compare the current 60-day exemption with single and multiple entry, official fees, documents and e-Visa steps." ogImage="https://go2-thailand.com/images/redesign/thailand-tourist-visa-hero.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-tourist-visa-hero.webp"
          imageAlt="Traveller checking a passport and Thailand itinerary before departure"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visas', href: '/visa/' }, { label: 'Tourist Visa' }]}
          eyebrow="UK traveller · exemption · e-Visa"
          title={<>Thailand Tourist Visa.<br /><span className="text-saffron">Do you need one?</span></>}
          subtitle="Start with your passport and trip length—not the application form."
          description="For many British holidays, visa exemption is the right first route. Compare it with single and multiple entry before you spend money or upload documents."
          actions={[{ label: 'Run the route check', href: '#route', kind: 'primary' }, { label: 'Open official e-Visa', href: THAI_E_VISA, kind: 'secondary', newTab: true }]}
          minHeightClassName="min-h-[760px] lg:min-h-[710px]"
          titleClassName="max-w-[850px] text-[3.35rem] leading-[0.88] !text-white sm:text-[4.7rem] lg:text-[5.25rem]"
          subtitleClassName="max-w-[680px] !text-white"
          descriptionClassName="mt-4 max-w-[600px] text-sm leading-7 !text-white opacity-75"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.22)_0%,rgba(4,42,34,0.6)_43%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.95)_44%,rgba(4,42,34,0.17)_70%,rgba(4,42,34,0.02)_100%)]"
          contentClassName="max-w-[880px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          contentTone="light"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/25 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Current UK starting point</p><strong className="mt-2 block font-display text-3xl font-semibold">Up to 60 days</strong><p className="mt-2 text-xs font-medium leading-5 text-white/62">Visa exemption for a full British citizen passport, subject to live rules and border control.</p></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section id="decision" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Answer the first question first" title="A Tourist Visa is not the default for every Thailand holiday." description="The highest-volume UK search is whether a visa is needed at all. Your passport type, travel purpose, trip length and number of arrivals decide the route." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map((fact) => { const Icon = fact.icon; return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-tonal text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>; })}</div>
            <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><RefreshCw size={22} className="mt-1 shrink-0 text-saffron-dark" /><div><strong className="font-display text-2xl font-semibold text-jade">Entry rules can change faster than an article.</strong><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-charcoal/64">This page records a dated source check, then sends you to the authorities for the final check. Your passport stamp remains the practical leave-by date.</p></div></div><a href={GOV_UK} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Check GOV.UK live <ExternalLink size={15} /></a></div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Match the route to the itinerary" title="Exemption, single entry or multiple entry?" description="Choose the travel pattern below. The explanation changes without mixing separate permissions into one vague ‘90-day visa’." />
            <div className="mt-9 grid gap-3 lg:grid-cols-3">{routeOptions.map((item) => <button key={item.key} type="button" onClick={() => setSelectedKey(item.key)} aria-pressed={selectedKey === item.key} className={`rounded-2xl border px-5 py-4 text-left transition ${selectedKey === item.key ? 'border-jade bg-jade text-white shadow-editorial-card' : 'border-jade/10 bg-white text-jade hover:border-saffron/50'}`}><span className={`text-[9px] font-extrabold uppercase tracking-[0.13em] ${selectedKey === item.key ? 'text-saffron-light' : 'text-saffron-dark'}`}>{item.kicker}</span><strong className="mt-2 block text-sm">{item.tab}</strong></button>)}</div>
            <div className="mt-4 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.92fr_1.08fr]"><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">{selected.kicker}</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">{selected.title}</h2><p className="mt-5 text-sm font-medium leading-7 text-white/65">{selected.verdict}</p><div className="mt-7 rounded-2xl border border-saffron/30 bg-saffron/10 p-5"><div className="flex items-start gap-3"><CircleAlert size={19} className="mt-0.5 shrink-0 text-saffron-light" /><p className="text-xs font-extrabold leading-6">{selected.caution}</p></div></div></div><div className="p-7 sm:p-10 lg:p-12"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">What this route means</p><div className="mt-5 grid gap-3">{selected.facts.map((fact) => <div key={fact} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-canvas px-4 py-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={13} /></span><span className="text-xs font-extrabold leading-5 text-jade">{fact}</span></div>)}</div><div className="mt-6 flex flex-wrap gap-3"><a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="btn-jade">Check official e-Visa <ExternalLink size={15} /></a><Link href="/visa/digital-arrival-card/" className="btn-cream">Keep TDAC separate <ArrowRight size={15} /></Link></div></div></div></div>
          </div>
        </section>

        <section id="clocks" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><p className="eyebrow">Three clocks, three meanings</p><h2 className="font-display text-[3.4rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade">Why ‘60-day visa’ causes so much confusion.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/64">A visa-validity window, a permitted stay and a possible extension are separate decisions. Keep them on separate lines in your itinerary.</p></div><div className="grid gap-4 md:grid-cols-3">{[
          { icon: Landmark, label: 'Before travel', title: 'Visa validity', text: 'The period in which the visa can be used to enter—three months for single entry and six months for multiple entry in the London guidance.' },
          { icon: Stamp, label: 'At the border', title: 'Permitted stay', text: 'Up to 60 days for the Tourist Visa. Read the actual leave-by date in your immigration stamp.' },
          { icon: CalendarClock, label: 'Inside Thailand', title: 'Extension request', text: 'A separate application before expiry. It is discretionary and should never be treated as guaranteed time.' },
        ].map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={25} className="text-saffron-dark" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.label}</p><h3 className="mt-2 font-display text-2xl font-semibold text-jade">{item.title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p></article>; })}</div></div></div></section>

        <section id="evidence" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="One coherent application" title="Your documents should tell the same travel story." description="The official e-Visa portal personalises the upload fields. Prepare a consistent base file, then follow the live checklist shown for your case." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.05fr_0.95fr]"><div className="relative min-h-[410px] lg:min-h-[630px]"><Image src="/images/redesign/thailand-tourist-visa-routes.webp" alt="Travel documents arranged for a Thailand Tourist Visa application" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Prepare, then verify live</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">Six pieces should support one real itinerary.</h2><div className="mt-7 grid gap-3">{evidenceItems.map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={13} /></span><span className="text-xs font-extrabold leading-5">{item}</span></div>)}</div><p className="mt-5 text-[10px] font-medium leading-5 text-white/55">Do not upload invented reservations or rely on an agency promise. The embassy can request more evidence or an interview.</p><a href={EMBASSY_TOURIST} target="_blank" rel="noopener noreferrer" className="btn-cream mt-6">Open embassy guidance <ExternalLink size={15} /></a></div></div></div></div></section>

        <section id="apply" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="From decision to e-Visa" title="Apply through the official route in four deliberate steps." description="The London embassy says applicants must remain physically within its UK, Ireland or UK Territories service area during processing." /><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />{[
          { icon: Route, label: '01', title: 'Confirm the route', text: 'Use the official eligibility checker before choosing a paid visa over exemption.' },
          { icon: FileCheck2, label: '02', title: 'Build the evidence', text: 'Align passport, residence, airline itinerary, first stay and financial proof.' },
          { icon: Smartphone, label: '03', title: 'Submit online', text: 'Create your account and upload only through the official Thai e-Visa domain.' },
          { icon: PlaneTakeoff, label: '04', title: 'Prepare arrival', text: 'Keep the approval, passport, TDAC, first address and onward plan available.' },
        ].map((step) => { const Icon = step.icon; return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Step {step.label}</p><h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>; })}</div><div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-saffron/25 bg-tonal p-6"><strong className="font-display text-2xl font-semibold text-jade">Allow 6–8 weeks, even though the standard estimate is shorter.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">The London embassy currently states about 15 working days, but additional documents or an interview can extend the process. Applications can be made no earlier than 90 days before intended arrival.</p></div><a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-jade p-6 text-white"><span><strong className="block text-sm">Start at Thai e-Visa</strong><span className="mt-1 block text-[10px] text-white/52">Official Ministry of Foreign Affairs platform</span></span><ExternalLink size={18} className="text-saffron-light" /></a></div></div></section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Only after choosing your entry route</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">Make the first stay and onward plan concrete.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">Official guidance can ask for travel and accommodation evidence. Choose conditions that fit the uncertainty of your application—never a booking sold as a visa guarantee.</p><Link href="/visa/digital-arrival-card/" className="btn-cream mt-7">Prepare the separate TDAC <ArrowRight size={15} /></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Hotel size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Check current stays</strong><span className="mt-1 block text-[10px] text-white/50">Flexible hotel options via Trip.com</span></a><a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><MapPinned size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Check onward transport</strong><span className="mt-1 block text-[10px] text-white/50">Live train, bus and ferry options via 12Go</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com and 12Go links are sponsored affiliate links for genuine travel planning. A reservation never guarantees visa approval or admission.</AffiliateDisclosure></div></div></div></div></section>

        <FaqSplitSection id="questions" eyebrow="Real UK Tourist Visa searches" title="Thailand Tourist Visa questions, answered without blending the routes" description="These questions come from the 27 July 2026 UK DataForSEO results. Answers were checked against GOV.UK, the Royal Thai Embassy in London, Thai e-Visa and Immigration Bureau sources." items={faqs} />

        <RelatedGuidesSection eyebrow="Complete the entry sequence" title="Keep permission, arrival registration and extensions separate" guides={[
          { title: 'Thailand visa overview', description: 'Compare the wider visa families when tourism is not the real purpose of your stay.', href: '/visa/', image: '/images/redesign/thailand-visa-hero.webp', imageAlt: 'Thailand visa and entry documents' },
          { title: 'Thailand Digital Arrival Card', description: 'Use the free official TDAC route and calculate the three-day submission window.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-tdac-hero.webp', imageAlt: 'Thailand Digital Arrival Card on a phone' },
          { title: 'Extend a stay', description: 'Understand the separate immigration application before your current permission expires.', href: '/visa/visa-extension/', image: '/images/redesign/thailand-tourist-visa-routes.webp', imageAlt: 'Thailand itinerary with travel documents' },
        ]} />

        <SourceMethodSection eyebrow="Sources & method" title="A Tourist Visa page should help you avoid the wrong application." description="The English research combined 529 DataForSEO keyword records, 10 live UK SERPs, 54 verbatim PAA questions, ranking and backlink checks, and a dated review of official UK and Thai sources. Volatile details are stated with their source-check date and linked back to the live authority." sources={[
          { title: 'Thailand entry requirements', creator: 'UK Foreign, Commonwealth & Development Office', url: GOV_UK, note: 'Current British passport, visa, TDAC and overstay guidance.' },
          { title: 'Visa exemption', creator: 'Royal Thai Embassy, London', url: EMBASSY_EXEMPTION, note: 'Primary UK source for the current 60-day exemption route and planned-departure evidence.' },
          { title: 'Visa: general information', creator: 'Royal Thai Embassy, London', url: EMBASSY_GENERAL, note: 'Official service-area, application timing, processing and airline-itinerary guidance.' },
          { title: 'Thai e-Visa official website', creator: 'Ministry of Foreign Affairs of Thailand', url: THAI_E_VISA, note: 'Official eligibility checker, application workflow and personalised document requirements.' },
          { title: 'Visa fees', creator: 'Royal Thai Embassy, London', url: EMBASSY_FEES, note: 'Official listed UK fees for single and multiple-entry Tourist Visas.' },
          { title: 'Tourism extension handbook', creator: 'Thailand Immigration Bureau', url: IMMIGRATION_EXTENSION, note: 'Primary procedural source for an extension request; approval remains discretionary.' },
        ]} />
      </div>
    </>
  );
}
