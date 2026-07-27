import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  Hotel,
  Landmark,
  MapPinned,
  Plane,
  RefreshCw,
  Route,
  ShieldCheck,
  Smartphone,
  Stamp,
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

const PAGE_URL = 'https://go2-thailand.com/visa/visa-free-entry/';
const GOV_UK = 'https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements';
const EMBASSY_EXEMPTION = 'https://london.thaiembassy.org/en/page/exemp-visa';
const EMBASSY_GENERAL = 'https://london.thaiembassy.org/en/page/visa-general-information?menu=64cd03802f080d54bb16df93';
const EMBASSY_TOURIST = 'https://london.thaiembassy.org/en/page/tourist-single-entry-visa';
const THAI_E_VISA = 'https://www.thaievisa.go.th/';
const TDAC = 'https://tdac.immigration.go.th/';

const sectionNav = [
  { href: '#check' as const, label: 'Route check', icon: Route },
  { href: '#evidence' as const, label: 'At the border', icon: FileCheck2 },
  { href: '#clocks' as const, label: 'Four clocks', icon: CalendarClock },
  { href: '#compare' as const, label: 'Compare routes', icon: Landmark },
  { href: '#rule-watch' as const, label: 'Rule watch', icon: RefreshCw },
  { href: '#questions' as const, label: 'FAQs', icon: CircleAlert },
];

type RouteKey = 'short' | 'long' | 'remote' | 'purpose';

const routeOptions: Array<{
  key: RouteKey;
  tab: string;
  eyebrow: string;
  title: string;
  verdict: string;
  facts: string[];
  href: string;
  cta: string;
}> = [
  {
    key: 'short',
    tab: 'Holiday up to 60 days',
    eyebrow: 'Likely route · visa exemption',
    title: 'Use the exemption — then prepare for the border decision.',
    verdict: 'At our 27 July 2026 source check, a full British citizen passport can normally use visa exemption for a tourist visit of up to 60 days. This avoids a paid e-Visa application, but it does not guarantee admission.',
    facts: ['Complete the free TDAC separately', 'Carry confirmed onward travel within 60 days', 'Check the arrival stamp before leaving the desk', 'Recheck the live rule shortly before departure'],
    href: TDAC,
    cta: 'Open official TDAC',
  },
  {
    key: 'long',
    tab: 'Longer or repeated holiday',
    eyebrow: 'Compare before booking · Tourist Visa',
    title: 'A Tourist Visa may give the itinerary a cleaner structure.',
    verdict: 'A planned stay beyond the exemption window or several arrivals deserves a route comparison. Visa validity, permitted stay and an extension are separate clocks — a visa is not an automatic 90-day stay.',
    facts: ['Compare single and multiple-entry routes', 'Apply only through the official e-Visa service', 'Keep the airline itinerary and accommodation coherent', 'Treat any extension as a separate decision'],
    href: '/visa/tourist-visa/',
    cta: 'Compare Tourist Visas',
  },
  {
    key: 'remote',
    tab: 'Remote work or soft power',
    eyebrow: 'Different purpose · DTV',
    title: 'Tourist entry is not a substitute for the right long-stay route.',
    verdict: 'If the real plan is remote work, a workcation or an eligible soft-power activity, compare the Destination Thailand Visa before relying on repeated visa-exempt entries.',
    facts: ['Purpose matters as much as trip length', 'The DTV has its own evidence threshold', 'Tax and employment questions remain separate', 'Do not infer work permission from a tourist stamp'],
    href: '/visa/digital-nomad-visa/',
    cta: 'Check the DTV route',
  },
  {
    key: 'purpose',
    tab: 'Employment or study',
    eyebrow: 'Visa required · before travel',
    title: 'Choose the visa that matches what you will actually do.',
    verdict: 'GOV.UK says travellers going to Thailand for work, study or other non-exempt purposes need the correct visa before travel. General employment or study should never be presented as ordinary visa-free tourism.',
    facts: ['Confirm the visa category before departure', 'Check whether separate work authorisation applies', 'Use the official e-Visa eligibility checker', 'Keep school or employer evidence consistent'],
    href: THAI_E_VISA,
    cta: 'Open official e-Visa',
  },
];

const quickFacts = [
  { icon: ShieldCheck, label: 'British citizen passport', value: 'Up to 60 days', text: 'Current official guidance; verify again before travel.' },
  { icon: Plane, label: 'Purpose', value: 'Tourism first', text: 'Work, study and other purposes can need another route.' },
  { icon: Smartphone, label: 'Arrival form', value: 'TDAC required', text: 'Free and separate from visa exemption.' },
  { icon: Stamp, label: 'Final decision', value: 'At the border', text: 'The admitted-until stamp controls the actual stay.' },
];

const faqs = [
  { question: 'Do British citizens need a visa for Thailand?', answer: 'At the 27 July 2026 source check, travellers with a full British citizen passport can normally visit Thailand without applying for a visa first for up to 60 days. This is visa exemption, not a visa. Passport type, travel purpose and the live rule still matter, and immigration makes the entry decision.' },
  { question: 'How long can a UK citizen stay in Thailand without a visa?', answer: 'The current GOV.UK and Royal Thai Embassy guidance says up to 60 days for an ordinary British passport under visa exemption. Read the admitted-until date stamped into your passport; that date, not a blog calculation, is the practical deadline.' },
  { question: 'Can I extend a Thailand visa exemption by 30 days?', answer: 'Current UK guidance says the exemption may be extended for up to another 30 days. An extension is a separate, discretionary Immigration application and is not guaranteed. Apply before the admitted-until date and use the dedicated extension guide for the live procedure.' },
  { question: 'Do I need proof of onward travel for Thailand visa exemption?', answer: 'The Royal Thai Embassy in London says confirmed onward travel by air, train, bus or boat within 60 days is required for the exemption route. Airlines can also check documentation before boarding, so keep the confirmation accessible rather than relying on a verbal plan.' },
  { question: 'Does visa exemption work at a Thailand land border?', answer: 'The TDAC and entry framework cover arrivals by air, land and sea, but entry is still decided at the checkpoint. Do not rely on old articles stating a universal annual number of land entries; repeated or unclear travel patterns can attract more scrutiny.' },
  { question: 'Can I work in Thailand on visa exemption?', answer: 'Do not treat visa-free tourist entry as general permission to work. GOV.UK distinguishes certain business engagements or urgent ad-hoc work from work or study that needs a visa before travel. Confirm the correct visa and any work authorisation for what you will actually do.' },
  { question: 'Is the TDAC a visa or visa exemption?', answer: 'Neither. The Thailand Digital Arrival Card is a free arrival registration required separately for foreign arrivals. It does not grant permission to enter, extend a stay or replace a visa.' },
  { question: 'Can I enter Thailand repeatedly without a visa?', answer: 'Visa exemption is assessed on each arrival and does not create a guaranteed border-run strategy. The London embassy warns that multiple entries can lead to refusal and advises frequent visitors to consider an appropriate visa. Carry a credible itinerary and use the route matching your real travel pattern.' },
];

export default function ThailandVisaExemptionGuideEn() {
  const [selectedKey, setSelectedKey] = useState<RouteKey>('short');
  const selected = routeOptions.find((item) => item.key === selectedKey) ?? routeOptions[0];
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'en-visa-exemption-first-stay');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'en-visa-exemption-onward');
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand visa exemption for UK travellers', description: 'Current 60-day Thailand visa exemption, entry evidence, TDAC, extension and route comparison for British travellers.', url: PAGE_URL, inLanguage: 'en-GB', dateModified: '2026-07-27' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
    { '@type': 'ListItem', position: 2, name: 'Thailand visas', item: 'https://go2-thailand.com/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Visa exemption', item: PAGE_URL },
  ] };

  return <>
    <SEOHead title="Thailand Visa Exemption UK: 60-day entry guide" description="Thailand visa exemption for British travellers: current 60-day rule, passport and onward evidence, TDAC, extension, land borders and visa alternatives." ogImage="https://go2-thailand.com/images/redesign/thailand-visa-hero.webp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </SEOHead>

    <div className="bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-visa-hero.webp" imageAlt="British traveller checking a passport before a flight to Thailand" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visas', href: '/visa/' }, { label: 'Visa exemption' }]} eyebrow="UK passport · current entry route" title={<>Thailand visa exemption.<br /><span className="text-saffron">60 days — check the stamp.</span></>} subtitle="No prepaid visa. Still a real border decision." description="Start with passport, purpose and trip length. Then prepare the TDAC, onward journey and evidence that make your travel story easy to understand." actions={[{ label: 'Check your route', href: '#check', kind: 'primary' }, { label: 'Verify on GOV.UK', href: GOV_UK, kind: 'secondary', newTab: true }]} minHeightClassName="min-h-[760px] lg:min-h-[700px]" titleClassName="max-w-[920px] text-[3.1rem] leading-[0.88] sm:text-[4.3rem] lg:text-[5rem]" imageClassName="object-cover object-[66%_center] lg:object-center" sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/25 bg-jade/88 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Current UK check · 27 July 2026</p><strong className="mt-3 block font-display text-3xl font-semibold">Up to 60 days</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">Temporary rules can change. Verify again shortly before departure and read the stamp on arrival.</p></div>} />
      <PageSectionNav items={sectionNav} />

      <section className="section-divider-bottom py-10 lg:py-12"><div className="container-custom grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{quickFacts.map(({ icon: Icon, label, value, text }) => <article key={label} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-sm"><Icon size={21} className="text-saffron-dark" /><p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.15em] text-charcoal/45">{label}</p><strong className="mt-1 block font-display text-2xl font-semibold text-jade">{value}</strong><span className="mt-1 block text-[10px] font-medium leading-5 text-charcoal/52">{text}</span></article>)}</div></section>

      <section id="check" className="section-divider-bottom scroll-mt-24 bg-tonal/55 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Choose by purpose, not convenience" title="Which entry route fits the trip you are actually taking?" description="Select the closest itinerary. This keeps short holidays, longer tourism, remote work and formal work or study from being blurred into one misleading answer." /><div className="mt-9 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{routeOptions.map((item) => <button key={item.key} type="button" aria-pressed={selectedKey === item.key} onClick={() => setSelectedKey(item.key)} className={`rounded-2xl border p-5 text-left transition ${selectedKey === item.key ? 'border-jade bg-jade text-white shadow-editorial-card' : 'border-jade/10 bg-white text-jade hover:border-saffron/55'}`}><span className={`text-[9px] font-extrabold uppercase tracking-[0.13em] ${selectedKey === item.key ? 'text-saffron-light' : 'text-saffron-dark'}`}>Route {routeOptions.indexOf(item) + 1}</span><strong className="mt-2 block text-sm leading-5">{item.tab}</strong></button>)}</div><div className="mt-4 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.92fr_1.08fr]"><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">{selected.eyebrow}</p><h2 className="font-display text-[3rem] font-semibold leading-[0.91] tracking-[-0.035em]">{selected.title}</h2><p className="mt-5 text-sm font-medium leading-7 text-white/65">{selected.verdict}</p></div><div className="p-7 sm:p-10 lg:p-12"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">What to do next</p><div className="mt-5 grid gap-3">{selected.facts.map((fact) => <div key={fact} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-canvas p-4"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={13} /></span><span className="text-xs font-extrabold leading-5 text-jade">{fact}</span></div>)}</div>{selected.href.startsWith('/') ? <Link href={selected.href} className="btn-jade mt-6">{selected.cta} <ArrowRight size={15} /></Link> : <a href={selected.href} target="_blank" rel="noopener noreferrer" className="btn-jade mt-6">{selected.cta} <ExternalLink size={15} /></a>}</div></div></div></div></section>

      <section id="evidence" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Admission is assessed at the checkpoint" title="Carry a small evidence pack that tells one clear story." description="Visa exemption removes a visa application; it does not remove entry conditions. Keep the essentials accessible to the airline and immigration officer." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-jade shadow-editorial-lift"><div className="grid lg:grid-cols-[1.03fr_0.97fr]"><div className="relative min-h-[410px] lg:min-h-[620px]"><Image src="/images/redesign/thailand-entry-documents.webp" alt="Passport, onward ticket and travel documents prepared for Thailand entry" fill sizes="(max-width:1024px) 100vw,52vw" className="object-cover" /></div><div className="p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Border-ready evidence</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">Five items. One credible itinerary.</h2><div className="mt-7 grid gap-3">{[
        ['Passport', 'A full British citizen passport with at least six months after arrival and a blank page.'],
        ['Onward journey', 'Confirmed air, train, bus or boat travel leaving within the current 60-day window.'],
        ['TDAC', 'The free official arrival form submitted within the three days before arrival.'],
        ['First address', 'Accommodation and contact details matching the TDAC and real itinerary.'],
        ['Means and purpose', 'Be ready to show a credible tourism plan and supporting funds if requested.'],
      ].map(([title, text]) => <div key={title} className="rounded-xl border border-white/14 bg-white/[0.055] p-4"><strong className="flex items-center gap-2 text-sm"><Check size={15} className="text-saffron-light" />{title}</strong><p className="mt-2 pl-6 text-[10px] font-medium leading-5 text-white/55">{text}</p></div>)}</div><p className="mt-5 text-[10px] font-medium leading-5 text-white/48">Requirements can be checked before boarding as well as at the border. Immigration decides whether to admit and how long to grant.</p></div></div></div></div></section>

      <section id="clocks" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Build the timeline correctly" title="Four clocks prevent most visa-exemption mistakes." description="Put these dates in the same itinerary. They are related, but none replaces another." /><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />{[
        { icon: Smartphone, label: '01 · before arrival', title: 'TDAC window', text: 'Submit on the free official site within the three days before arrival.' },
        { icon: Stamp, label: '02 · at the checkpoint', title: 'Admitted until', text: 'Read and photograph the passport stamp before leaving the immigration desk.' },
        { icon: Plane, label: '03 · in your itinerary', title: 'Onward travel', text: 'Keep confirmed departure evidence within the current exemption window.' },
        { icon: CalendarClock, label: '04 · before expiry', title: 'Extension decision', text: 'If needed, request it before the stamped date; approval remains discretionary.' },
      ].map((item) => { const Icon = item.icon; return <article key={item.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-mist bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.label}</p><h3 className="mt-2 font-display text-2xl font-semibold text-jade">{item.title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p></article>; })}</div></div></section>

      <section id="compare" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Exemption is one route, not the whole answer" title="Visa exemption versus a Tourist Visa." description="Both can support tourism. The difference is what happens before travel, not a promise of admission." /><div className="mt-10 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-2"><article className="p-7 sm:p-10"><p className="eyebrow">Visa exemption</p><h2 className="font-display text-3xl font-semibold text-jade">Short, straightforward UK holiday</h2><ul className="mt-6 grid gap-3 text-xs font-medium leading-6 text-charcoal/68">{['No paid visa application before travel', 'Current stay: up to 60 days for an eligible ordinary British passport', 'Onward journey and entry evidence remain relevant', 'Possible extension is separate and discretionary'].map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-1 shrink-0 text-saffron-dark" />{item}</li>)}</ul></article><article className="bg-jade p-7 text-white sm:p-10"><p className="eyebrow !text-saffron-light">Tourist Visa</p><h2 className="font-display text-3xl font-semibold">Planned visa before departure</h2><ul className="mt-6 grid gap-3 text-xs font-medium leading-6 text-white/65">{['Official e-Visa application and fee before travel', 'Single or multiple-entry structure', 'Application evidence reviewed in advance', 'Entry and permitted stay still decided at the border'].map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-1 shrink-0 text-saffron-light" />{item}</li>)}</ul><Link href="/visa/tourist-visa/" className="btn-cream mt-7">Open Tourist Visa guide <ArrowRight size={15} /></Link></article></div></div></div></section>

      <section id="rule-watch" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Temporary policy · verify twice</p><h2 className="font-display text-[3.15rem] font-semibold leading-[0.9] tracking-[-0.035em]">Ignore the stale “60 days changing to 30” headline.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/62">The current official UK sources still state 60 days, while the London embassy warns the scheme is temporary and can change without notice. Check at least two weeks before travel and once more close to departure.</p><div className="mt-7 flex flex-wrap gap-3"><a href={GOV_UK} target="_blank" rel="noopener noreferrer" className="btn-cream">Check GOV.UK <ExternalLink size={15} /></a><a href={EMBASSY_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">Check Thai Embassy <ExternalLink size={15} /></a></div></div><div className="relative min-h-[390px] lg:min-h-[540px]"><Image src="/images/redesign/thailand-visa-rule-watch.webp" alt="Traveller checking current Thailand entry rules on a phone" fill sizes="(max-width:1024px) 100vw,58vw" className="object-cover" /><div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-jade/84 p-5 backdrop-blur-lg"><div className="flex items-start gap-3"><RefreshCw size={20} className="mt-1 shrink-0 text-saffron-light" /><div><strong className="font-display text-2xl font-semibold">Your stamp beats a cached snippet.</strong><p className="mt-1 text-[10px] font-medium leading-5 text-white/52">Save the official pages, then record the actual admitted-until date after arrival.</p></div></div></div></div></div></div></div></section>

      <section className="section-divider-bottom py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="bg-jade p-8 text-white sm:p-11"><p className="eyebrow !text-saffron-light">Only after the route is clear</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">Make arrival and departure evidence concrete.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/62">Use flexible options that fit the itinerary. A hotel or transport booking never guarantees boarding or admission.</p><Link href="/visa/digital-arrival-card/" className="btn-cream mt-7">Prepare the TDAC <ArrowRight size={15} /></Link></div><div className="grid gap-4 bg-tonal p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-jade/10 bg-white p-6 text-jade"><Hotel size={21} className="text-saffron-dark" /><strong className="mt-5 block text-sm">Check current stays</strong><span className="mt-2 block text-[10px] font-medium leading-5 text-charcoal/54">Flexible first-night options via Trip.com</span></a><a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-jade/10 bg-white p-6 text-jade"><MapPinned size={21} className="text-saffron-dark" /><strong className="mt-5 block text-sm">Check onward transport</strong><span className="mt-2 block text-[10px] font-medium leading-5 text-charcoal/54">Live air, rail, bus and ferry options via 12Go</span></a><AffiliateDisclosure className="sm:col-span-2">Trip.com and 12Go links are sponsored affiliate links. Use them only when they fit the real itinerary; neither provider decides visa status or admission.</AffiliateDisclosure></div></div></div></div></section>

      <FaqSplitSection id="questions" eyebrow="Measured UK search questions" title="Thailand visa-exemption questions, without recycled border-run myths" description="These questions come from the 27 July 2026 DataForSEO UK results and were checked against current GOV.UK, Royal Thai Embassy and Thai Immigration sources." items={faqs} />

      <RelatedGuidesSection eyebrow="Complete the entry sequence" title="Keep visa choice, arrival registration and extension separate" guides={[
        { title: 'Thailand Tourist Visa', description: 'Compare visa exemption with single and multiple-entry tourism routes.', href: '/visa/tourist-visa/', image: '/images/redesign/thailand-tourist-visa-hero.webp', imageAlt: 'Traveller reviewing a Thailand itinerary and passport' },
        { title: 'Thailand Digital Arrival Card', description: 'Complete the free official TDAC within the correct three-day window.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-tdac-hero.webp', imageAlt: 'Thailand arrival card shown on a mobile phone' },
        { title: 'Extend your stay', description: 'Plan the separate Immigration request before the admitted-until date.', href: '/visa/visa-extension/', image: '/images/redesign/thailand-visa-extension-hero.webp', imageAlt: 'Thailand visa extension documents and calendar' },
      ]} />

      <SourceMethodSection eyebrow="Sources & method" title="Current entry rules need primary sources and a visible date." description="This owner combines 153 DataForSEO keyword records, 10 live UK SERPs, 84 organic results, 56 verbatim PAA questions, ranking and backlink checks, plus a dated review of UK and Thai primary sources. No exact rankings or reportable backlinks were found for the existing URL." sources={[
        { title: 'Thailand entry requirements', creator: 'UK Foreign, Commonwealth & Development Office', url: GOV_UK, note: 'Current passport, 60-day exemption, TDAC, extension and overstay guidance for British travellers.' },
        { title: 'Visa exemption', creator: 'Royal Thai Embassy, London', url: EMBASSY_EXEMPTION, note: 'Ordinary British passport eligibility, 60-day duration, onward journey and checkpoint discretion.' },
        { title: 'Visa: general information', creator: 'Royal Thai Embassy, London', url: EMBASSY_GENERAL, note: 'Temporary-policy warning, repeated-entry caution and guidance to verify shortly before travel.' },
        { title: 'Tourist Visa', creator: 'Royal Thai Embassy, London', url: EMBASSY_TOURIST, note: 'Primary comparison route when a visa is needed for tourism.' },
        { title: 'Thailand Digital Arrival Card', creator: 'Thailand Immigration Bureau', url: TDAC, note: 'Free official arrival-registration service; separate from a visa and admission.' },
        { title: 'Thai e-Visa', creator: 'Ministry of Foreign Affairs of Thailand', url: THAI_E_VISA, note: 'Official eligibility checker and application route for travellers who need a visa.' },
      ]} />
    </div>
  </>;
}
