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
  Laptop,
  MailCheck,
  PlaneTakeoff,
  RefreshCw,
  Route,
  ShieldCheck,
  Smartphone,
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
import { SAILY_GENERIC, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

const PAGE_URL = 'https://go2-thailand.com/visa/digital-nomad-visa/';
const THAI_E_VISA = 'https://www.thaievisa.go.th/';
const EMBASSY_DTV = 'https://london.thaiembassy.org/en/page/destination-thailand-visa';
const EMBASSY_GENERAL = 'https://london.thaiembassy.org/en/page/visa-general-information?menu=64cd03802f080d54bb16df93';
const MFA_MEASURES = 'https://image.mfa.go.th/mfa/0/91fPdh6NtO/VISA_Information/New_Visa_Measures_July_2024.pdf';

const sectionNav = [
  { href: '#answer' as const, label: 'At a glance', icon: ShieldCheck },
  { href: '#route' as const, label: 'Choose a route', icon: Route },
  { href: '#clocks' as const, label: '5 years vs 180 days', icon: CalendarClock },
  { href: '#evidence' as const, label: 'Evidence', icon: FileCheck2 },
  { href: '#apply' as const, label: 'Apply', icon: Laptop },
  { href: '#questions' as const, label: 'FAQs', icon: CircleAlert },
];

type DtvRouteKey = 'workcation' | 'softpower' | 'family';

const routeOptions: Array<{ key: DtvRouteKey; tab: string; eyebrow: string; title: string; description: string; evidence: string[]; caution: string }> = [
  {
    key: 'workcation',
    tab: 'Remote work / freelance',
    eyebrow: 'DTV1 · Workcation',
    title: 'Show a real overseas work practice—not a digital-nomad label.',
    description: 'The official category covers digital nomads, remote workers, foreign talent and freelancers. Your contract, employer evidence or portfolio should make that status credible.',
    evidence: ['Passport biodata and a recent photograph', 'Proof that you are currently in the embassy service area', 'Financial evidence of at least 500,000 THB / the London-listed £11,000', 'Employment contract, employment certificate or professional portfolio'],
    caution: 'Do not treat DTV1 as blanket permission for a job with a Thai employer. Local employment can involve different visa and work-permit rules.',
  },
  {
    key: 'softpower',
    tab: 'Muay Thai / course / treatment',
    eyebrow: 'DTV2 · Thai soft power',
    title: 'The activity provider and programme become the centre of the file.',
    description: 'The London embassy names examples such as Muay Thai, Thai culinary training and medical treatment. A casual holiday booking is not the same as evidence for this category.',
    evidence: ['Passport biodata and a recent photograph', 'Proof of current location', 'Financial evidence of at least 500,000 THB / the London-listed £11,000', 'Confirmation from the organiser or appointment letter from the medical provider'],
    caution: 'Confirm the programme, dates, provider and refund conditions before paying. Go2Thailand does not certify schools, courses or clinics for DTV eligibility.',
  },
  {
    key: 'family',
    tab: 'Spouse / child under 20',
    eyebrow: 'DTV3 · Dependant family',
    title: 'Every dependant needs a separate application and relationship evidence.',
    description: 'This route covers a spouse and children under 20 of a DTV holder. The main holder’s visa supports the relationship route but does not replace the dependant’s own application.',
    evidence: ['Passport biodata and a recent photograph', 'Proof of current location', 'Financial evidence of at least 500,000 THB / the London-listed £11,000', 'Main holder’s DTV plus marriage, birth or adoption evidence'],
    caution: 'Documents issued outside Thailand and the UK can need certified English translation and legalisation. Follow the exact live checklist for your file.',
  },
];

const quickFacts = [
  { icon: CalendarClock, label: 'Visa validity', value: '5 years', text: 'Multiple entry from issue date—not five years of continuous stay.' },
  { icon: PlaneTakeoff, label: 'Each entry', value: 'Up to 180 days', text: 'The entry stamp records the actual permission granted.' },
  { icon: WalletCards, label: 'Financial evidence', value: '500,000 THB', text: 'The London page currently describes this as no less than £11,000.' },
  { icon: FileCheck2, label: 'London fee', value: '£300', text: 'Official listed application fee; recheck before submitting.' },
];

const faqs = [
  { question: 'What is the Destination Thailand Visa?', answer: 'The DTV is a five-year multiple-entry visa with three official routes: workcation for digital nomads, remote workers, foreign talent and freelancers; selected Thai soft-power activities; and spouses or children under 20 of DTV holders. The permitted stay is up to 180 days per entry.' },
  { question: 'What are the DTV visa requirements for Thailand?', answer: 'All routes require identity, a recent photograph, current-location evidence and financial evidence. DTV1 adds overseas work or portfolio proof; DTV2 adds activity or medical confirmation; DTV3 adds the main holder’s DTV and relationship evidence. The live e-Visa checklist can request more.' },
  { question: 'How much money do I need for a DTV visa?', answer: 'The official Thai measure states financial evidence of at least 500,000 THB. The Royal Thai Embassy in London currently expresses that requirement as no less than £11,000 and gives examples such as bank statements or a sponsorship letter. Use the exact live upload guidance for your application.' },
  { question: 'How much is a DTV visa from the UK?', answer: 'The Royal Thai Embassy in London page checked on 27 July 2026 lists a £300 application fee. Fees can change and are generally non-refundable, so confirm the amount in the official e-Visa process before paying.' },
  { question: 'Can I work remotely in Thailand on a DTV?', answer: 'DTV1 is expressly described for workcation, including digital nomads, remote workers, foreign talent and freelancers. That does not automatically authorise employment for a Thai company or every income arrangement. Seek official or professional advice for a mixed or local-employment case.' },
  { question: 'Can the 180-day DTV stay be extended?', answer: 'The official MFA measure describes one possible extension through Thailand Immigration for a period not exceeding another 180 days per entry. It is a separate discretionary process, not an automatic 360-day grant. The extension guide owns that procedure.' },
  { question: 'Can I apply for a DTV while in Thailand?', answer: 'The official Thai e-Visa site says applicants must be outside Thailand. The London embassy also requires applicants in its process to remain physically in the UK, Ireland or UK Territories while the application is considered.' },
  { question: 'Do DTV holders still need a TDAC?', answer: 'Yes. The London embassy states that all foreign travellers complete a TDAC for every entry. It is a separate arrival registration and does not replace the DTV or guarantee admission.' },
];

export default function ThailandDtvGuideEn() {
  const [route, setRoute] = useState<DtvRouteKey>('workcation');
  const selected = routeOptions.find((item) => item.key === route) ?? routeOptions[0];
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'en-dtv-first-month');
  const esimHref = withPlacementSubId(SAILY_GENERIC, subId, 'en-dtv-arrival-data');
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Destination Thailand Visa (DTV) from the UK', description: 'Decision and application guide to the DTV workcation, Thai soft-power and family routes.', url: PAGE_URL, inLanguage: 'en-GB', dateModified: '2026-07-27' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
    { '@type': 'ListItem', position: 2, name: 'Thailand visas', item: 'https://go2-thailand.com/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Destination Thailand Visa', item: PAGE_URL },
  ] };

  return <>
    <SEOHead title="Destination Thailand Visa UK: DTV requirements & routes" description="Compare DTV1 workcation, DTV2 Thai soft power and DTV3 family routes. Check 180-day stays, 500,000 THB evidence, UK fee and official e-Visa steps." ogImage="https://go2-thailand.com/images/redesign/thailand-dtv-hero.webp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </SEOHead>

    <div className="bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-dtv-hero.webp" imageAlt="Remote professional organising a Destination Thailand Visa evidence file" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visas', href: '/visa/' }, { label: 'DTV' }]} eyebrow="Workcation · soft power · family" title={<>Destination Thailand Visa.<br /><span className="text-saffron">Which DTV route?</span></>} subtitle="Five-year validity is not five years of continuous stay." description="Choose the official DTV category that matches your real purpose, then build the evidence and apply while you remain in the London embassy service area." actions={[{ label: 'Choose your DTV route', href: '#route', kind: 'primary' }, { label: 'Open official e-Visa', href: THAI_E_VISA, kind: 'secondary', newTab: true }]} minHeightClassName="min-h-[750px] lg:min-h-[710px]" titleClassName="max-w-[900px] text-[3.4rem] leading-[0.87] !text-white sm:text-[4.75rem] lg:text-[5.2rem]" subtitleClassName="max-w-[670px] !text-white" descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white opacity-80" imageClassName="object-cover object-[68%_center] lg:object-center" gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.18)_0%,rgba(4,42,34,0.55)_44%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.95)_45%,rgba(4,42,34,0.14)_70%,rgba(4,42,34,0.01)_100%)]" contentClassName="max-w-[920px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75" contentTone="light" sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/25 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Keep the clocks separate</p><div className="mt-4 grid grid-cols-2 gap-3"><div><strong className="font-display text-4xl">5 years</strong><span className="mt-1 block text-[9px] font-bold text-white/55">visa validity</span></div><div className="border-l border-white/15 pl-4"><strong className="font-display text-4xl">180</strong><span className="mt-1 block text-[9px] font-bold text-white/55">days per entry</span></div></div></div>} />
      <PageSectionNav items={sectionNav} />

      <section id="answer" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="The DTV in four facts" title="Start with the structure—not the application form." description="These figures come from the official London and Thai sources checked on 27 July 2026. Every application still remains subject to assessment." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map((fact) => { const Icon = fact.icon; return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-tonal text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>; })}</div><div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><RefreshCw size={22} className="mt-1 shrink-0 text-saffron-dark" /><div><strong className="font-display text-2xl font-semibold text-jade">The DTV is an entry route, not a universal work permit.</strong><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-charcoal/64">DTV1 evidence supports workcation status. A Thai employer, Thai clients or mixed business activity can require a different legal analysis.</p></div></div><a href={EMBASSY_DTV} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Check London guidance <ExternalLink size={15} /></a></div></div></section>

      <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Three categories, three decisive documents" title="Which evidence route matches your real purpose?" description="The base file stays similar, but the evidence that proves workcation, an activity or a family relationship is different." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.68fr_1.32fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Choose your category</p><div className="mt-6 grid gap-2">{routeOptions.map((option) => { const active=route===option.key; return <button key={option.key} type="button" aria-pressed={active} onClick={() => setRoute(option.key)} className={`flex min-h-14 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-extrabold transition ${active?'border-saffron/60 bg-white text-jade':'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}>{option.tab}<ArrowRight size={16} className={active?'text-saffron':'text-white/45'} /></button>; })}</div><p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">The live e-Visa checklist and any embassy request control your actual file. Go2Thailand is not a visa agent.</p></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.eyebrow}</p><h2 className="mt-3 max-w-3xl font-display text-[2.65rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.4rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/65">{selected.description}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.evidence.map((item,index)=><div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index+1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.caution}</p></div></div></div></div></section>

      <section id="clocks" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"><SectionHeading eyebrow="Validity versus permission to stay" title="Two timelines that should never share one label." description="The visa can be used for multiple entries during five years. Every arrival produces a separate permission to stay and leave-by date." /><div className="rounded-[30px] border border-jade/10 bg-jade p-7 text-white shadow-editorial-lift sm:p-10"><div><div className="flex items-end justify-between gap-4"><span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Visa clock</span><strong className="mt-1 block font-display text-3xl">5 years · multiple entry</strong></span><RefreshCw size={22} className="text-saffron-light" /></div><div className="mt-5 flex gap-1">{Array.from({length:5}).map((_,index)=><div key={index} className="flex-1"><div className="h-3 rounded-full bg-saffron" /><span className="mt-2 block text-center text-[9px] font-extrabold text-white/45">Year {index+1}</span></div>)}</div></div><div className="mt-8 border-t border-white/12 pt-8"><div className="flex items-end justify-between gap-4"><span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Stay clock for each entry</span><strong className="mt-1 block font-display text-3xl">Up to 180 days</strong></span><PlaneTakeoff size={22} className="text-saffron-light" /></div><p className="mt-5 rounded-2xl border border-white/14 bg-white/[0.06] p-5 text-xs font-extrabold leading-6">One possible extension of up to another 180 days is a separate Immigration Bureau application. It is not an automatic second block.</p></div></div></div></section>

      <section id="evidence" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="The evidence file" title="Build the common layer first. Add category proof second." description="Avoid a folder of unrelated screenshots. Current location, finances and route evidence should describe the same person, purpose and period." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.08fr_0.92fr]"><div className="relative min-h-[450px] lg:min-h-[630px]"><Image src="/images/redesign/thailand-dtv-proof-routes.webp" alt="Evidence routes for DTV workcation, Thai activities and family applications" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">The recurring base</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Five pieces before the category-specific proof.</h2><div className="mt-7 grid gap-3">{['Passport biodata page','Recent photograph that meets the upload rules','Proof of current location in the embassy service area','Financial evidence meeting the live threshold','One coherent DTV1, DTV2 or DTV3 evidence set'].map(item=><div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={13} /></span><span className="text-xs font-extrabold leading-5">{item}</span></div>)}</div><a href={EMBASSY_DTV} target="_blank" rel="noopener noreferrer" className="btn-cream mt-7">Open the official DTV list <ExternalLink size={15} /></a></div></div></div></div></section>

      <section id="apply" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="From category to e-Visa" title="Four steps, with location checked before upload." description="London processes applications online, but applicants must remain physically within the UK, Ireland or UK Territories service area during consideration." /><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />{[
        {icon:Route,title:'Choose DTV1, DTV2 or DTV3',text:'Let the purpose and decisive proof choose the category.'},
        {icon:FileCheck2,title:'Build one coherent file',text:'Identity, location, finances and purpose should support one another.'},
        {icon:Laptop,title:'Apply online from the UK area',text:'Submit through Thai e-Visa and remain in the service area while it is assessed.'},
        {icon:MailCheck,title:'Prepare every arrival',text:'Keep the e-Visa, passport, TDAC and current stay evidence accessible.'},
      ].map((step,index)=>{const Icon=step.icon;return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19}/></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Step 0{index+1}</p><h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>})}</div><div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-saffron/25 bg-tonal p-6"><strong className="font-display text-2xl font-semibold text-jade">Allow the London timeline, not a forum promise.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">The embassy’s general guidance currently recommends applying 6–8 weeks before departure and describes approximately 15 working days as its standard processing time. Additional documents or an interview can extend that.</p></div><a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-jade p-6 text-white"><span><strong className="block text-sm">Start only at Thai e-Visa</strong><span className="mt-1 block text-[10px] text-white/52">Official Ministry of Foreign Affairs platform</span></span><ExternalLink size={18} className="text-saffron-light" /></a></div></div></section>

      <section className="section-divider-bottom bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">After approval, before committing</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">Test the first month before choosing a long-term base.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">A DTV does not choose the right city, neighbourhood, internet setup or monthly routine. Start flexibly and evaluate the practical fit.</p><Link href="/thailand-index/digital-nomad/" className="btn-cream mt-7">Compare nomad locations <ArrowRight size={15}/></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Hotel size={20} className="text-saffron-light"/><strong className="mt-4 block text-sm">Check current stay prices</strong><span className="mt-1 block text-[10px] text-white/50">Flexible first month via Trip.com</span></a><a href={esimHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Smartphone size={20} className="text-saffron-light"/><strong className="mt-4 block text-sm">Check current eSIM price</strong><span className="mt-1 block text-[10px] text-white/50">Arrival data via Saily</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com and Saily are sponsored affiliate links for practical arrival planning. They do not affect DTV eligibility, approval or admission.</AffiliateDisclosure></div></div></div></div></section>

      <FaqSplitSection id="questions" eyebrow="Real UK DTV searches" title="Destination Thailand Visa questions, with the routes kept separate" description="Questions come from the 27 July 2026 UK DataForSEO results. Answers use official Thai MFA, Thai e-Visa and Royal Thai Embassy London sources and never promise approval." items={faqs} />
      <RelatedGuidesSection eyebrow="Continue your long-stay planning" title="Keep visa, arrival and daily-life decisions separate" guides={[
        {title:'Thailand visa overview',description:'Compare DTV with tourist, work, study, retirement and other routes.',href:'/visa/',image:'/images/redesign/thailand-visa-hero.webp',imageAlt:'Thailand visa and entry documents'},
        {title:'Thailand Digital Arrival Card',description:'Complete the separate free arrival registration for every entry.',href:'/visa/digital-arrival-card/',image:'/images/redesign/thailand-tdac-hero.webp',imageAlt:'Thailand Digital Arrival Card on a phone'},
        {title:'Digital Nomad Index',description:'Compare cities by practical living and remote-work factors after the visa decision.',href:'/thailand-index/digital-nomad/',image:'/images/redesign/thailand-dtv-hero.webp',imageAlt:'Remote work planning in Thailand'},
      ]}/>
      <SourceMethodSection eyebrow="Sources & method" title="A DTV file begins with the official category, not an agent’s promise." description="The English owner combines 81 DataForSEO keyword records, 10 live UK SERPs, 87 organic results, 51 verbatim PAA questions, exact-route ranking and backlink checks, and official UK/Thai verification. Volatile figures carry a dated source context and a live-source link." sources={[
        {title:'Destination Thailand Visa',creator:'Royal Thai Embassy, London',url:EMBASSY_DTV,note:'Primary UK source for DTV1, DTV2 and DTV3, £300 fee, £11,000 evidence wording, five-year validity and 180-day stays.'},
        {title:'Visa: general information',creator:'Royal Thai Embassy, London',url:EMBASSY_GENERAL,note:'Official e-Visa location, processing, timing, flight-document and TDAC guidance.'},
        {title:'Thailand New Visa Measures',creator:'Department of Consular Affairs · Thailand MFA',url:MFA_MEASURES,note:'Primary measure for 500,000 THB evidence, five-year multiple entry, 180 days per entry and the possible extension route.'},
        {title:'Thai e-Visa official website',creator:'Ministry of Foreign Affairs of Thailand',url:THAI_E_VISA,note:'Official online application workflow and live category selection.'},
      ]}/>
    </div>
  </>;
}
