import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgePoundSterling,
  Ban,
  CalendarClock,
  Check,
  Clock3,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  HeartPulse,
  Home,
  Landmark,
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

const THAI_E_VISA = 'https://www.thaievisa.go.th/';
const LONDON_RETIREMENT = 'https://london.thaiembassy.org/en/page/retirement-visa';
const LONDON_FEES = 'https://london.thaiembassy.org/en/publicservice/81755-visa-fees';

const sectionNav = [
  { href: '#answer' as const, label: 'At a glance', icon: ShieldCheck },
  { href: '#route' as const, label: 'Choose a route', icon: Route },
  { href: '#evidence' as const, label: 'Documents', icon: FileCheck2 },
  { href: '#apply' as const, label: 'Apply', icon: PlaneTakeoff },
  { href: '#after-arrival' as const, label: 'After arrival', icon: CalendarClock },
  { href: '#questions' as const, label: 'FAQs', icon: CircleAlert },
];

type RetirementRouteKey = 'non-o' | 'o-a' | 'o-x';

const routes: Array<{
  key: RetirementRouteKey;
  short: string;
  label: string;
  duration: string;
  fee: string;
  title: string;
  intro: string;
  proof: string[];
  note: string;
}> = [
  {
    key: 'non-o',
    short: 'Non-O',
    label: 'Up to 90 days',
    duration: 'Single entry · 3-month visa validity',
    fee: '£60 London fee',
    title: 'The lighter retirement file for a stay of no more than 90 days.',
    intro: 'The London embassy describes this route for a pensioner aged 50 or over with a state pension who plans to stay no longer than 90 days. It is not automatically a one-year permission to stay.',
    proof: ['Passport biodata page and recent photograph', 'Evidence of your current UK or Irish location', 'Monthly income of at least 65,000 THB or a current balance of 800,000 THB', 'Evidence supporting the pensioner and 50-plus application purpose'],
    note: 'An extension of stay inside Thailand is a separate Immigration Bureau decision. Do not advertise the original 90-day visa as a guaranteed one-year route.',
  },
  {
    key: 'o-a',
    short: 'O-A',
    label: 'Up to 1 year',
    duration: 'Multiple entry · 1-year validity',
    fee: '£150 London fee',
    title: 'A one-year long-stay route with a heavier health and background file.',
    intro: 'O-A is the long-stay retirement route for applicants aged 50 or over without an intention to work. The official London checklist adds health insurance, a medical certificate and criminal-record evidence to the financial test.',
    proof: ['Evidence of permanent residence where the application is submitted', '65,000 THB monthly income or an 800,000 THB current balance', 'Medical certificate and criminal-record clearance within the stated validity windows', 'Health insurance covering at least USD 100,000 or 3,000,000 THB for the stay'],
    note: 'The permitted stay may follow the insurance period. Confirm the exact certificate wording, dates and issuing authority before paying the non-refundable fee.',
  },
  {
    key: 'o-x',
    short: 'O-X',
    label: '5 + 5 years',
    duration: 'Multiple entry · first 5-year period',
    fee: '£300 London fee',
    title: 'The longest route is restricted by nationality and a much larger Thai-bank test.',
    intro: 'O-X is available to people aged 50 or over from 14 named nationalities, including the United Kingdom. It is commonly called a ten-year visa, but the official structure is five years plus a possible further five years.',
    proof: ['At least 3,000,000 THB deposited in a Thai bank', 'Or 1,800,000 THB plus annual income of at least 1,200,000 THB, with the official accumulation rule', 'Medical, insurance, criminal-record and biographical evidence', 'Nationality eligibility and continuing annual qualification checks'],
    note: 'O-X is not simply a premium version of O-A. Nationality, where the money is held, retention rules and annual checks make it a distinct route.',
  },
];

const quickFacts = [
  { icon: CalendarClock, label: 'Minimum age', value: '50 years', text: 'Age is only the first test; each route has its own finance and document rules.' },
  { icon: WalletCards, label: 'Non-O / O-A', value: '65k or 800k THB', text: 'Monthly income or current balance on the official London retirement checklist.' },
  { icon: HeartPulse, label: 'O-A insurance', value: '3m THB cover', text: 'The London checklist currently states USD 100,000 or 3,000,000 THB.' },
  { icon: BadgePoundSterling, label: 'Application fee', value: '£60–£300', text: 'Official London fees for Non-O, O-A and O-X; recheck them before payment.' },
];

const faqs = [
  { question: 'Can a British citizen retire in Thailand?', answer: 'A British citizen aged 50 or over can consider Thailand’s retirement routes if the route-specific financial, residence, health and document requirements are met. The London embassy lists a 90-day Non-O retirement route, a one-year O-A route and the nationality-limited O-X route. Approval is never automatic, so select the exact category on Thai e-Visa and follow its live checklist.' },
  { question: 'How difficult is it to get a retirement visa in Thailand?', answer: 'Difficulty depends on the route and your evidence. Non-O has a smaller application file; O-A adds insurance, medical and criminal-record evidence; O-X adds nationality limits, a much higher Thai-bank threshold and continuing checks. A clear route choice, matching names and dates, and documents in the required form matter more than a generic difficulty label.' },
  { question: 'How much money do you need for a retirement visa in Thailand?', answer: 'For the London Non-O retirement and O-A routes, the official page currently states either monthly income of at least 65,000 THB or a current balance of 800,000 THB. O-X has much higher Thai-bank and annual-income rules. These are immigration evidence thresholds, not a complete retirement budget.' },
  { question: 'How much money do you need in the bank for a Thai retirement visa?', answer: 'The relevant amount depends on the route and whether you use income or savings. The London checklist currently shows an 800,000 THB balance alternative for Non-O and O-A. O-X requires 3,000,000 THB in a Thai bank, or the official 1,800,000 THB plus annual-income route with additional accumulation and retention rules.' },
  { question: 'What is the best visa to retire in Thailand?', answer: 'There is no universal best route. Compare intended stay, nationality, where your funds are held, insurance eligibility, travel plans and the amount of document work you can substantiate. Non-O may suit a shorter initial stay, O-A a one-year long stay from abroad, and O-X a narrower 5-plus-5-year case.' },
  { question: 'What is the 5 year retirement visa in Thailand?', answer: 'The Non-Immigrant O-X is a five-year multiple-entry visa with a possible extension for another five years. It is limited to named nationalities, including British citizens, and has substantially higher Thai-bank, insurance, medical and background requirements than the standard Non-O or O-A routes.' },
  { question: 'How long can I stay in Thailand on a retirement visa?', answer: 'The answer depends on the category and the permission stamped or recorded for your entry. The official London material distinguishes a Non-O stay of no more than 90 days, O-A up to one year and O-X as a five-year period within a 5-plus-5 structure. Visa validity and permitted stay are different clocks.' },
  { question: 'Can you get the non-immigrant O visa in Thailand?', answer: 'Thailand Immigration publishes a separate process for applying for or changing to Non-O status for retirement purposes inside Thailand. It has its own timing and document conditions and is not the same process as applying through the London embassy. Check the Immigration Bureau checklist for your current status and local office before relying on an in-country conversion.' },
  { question: 'What happens to my UK State Pension if I move to Thailand?', answer: 'You can usually receive a UK State Pension abroad, but GOV.UK says yearly increases are paid only in listed countries. Thailand is not in those listed groups, so a UK State Pension is normally frozen at the rate first paid abroad, subject to your exact circumstances. Confirm this with the International Pension Centre before moving.' },
  { question: 'Do I have to leave Thailand every 90 days?', answer: 'A 90-day address report is not the same as leaving Thailand and is not an extension of stay. If you remain in Thailand for more than 90 days, an Immigration Bureau reporting duty can apply. Leaving and returning can reset the reporting count, but your permission to stay and re-entry position must still be checked separately.' },
  { question: 'Can I work on a Thailand retirement visa?', answer: 'The official O-A description is for long stay without an intention to work, and the standard retirement route should not be treated as a work permit. O-X official material also restricts gainful employment, with a narrow reference to permitted volunteer work. Get official advice for any paid or business activity.' },
];

export default function ThailandRetirementVisaGuideEn() {
  const [route, setRoute] = useState<RetirementRouteKey>('non-o');
  const selected = useMemo(() => routes.find((item) => item.key === route) ?? routes[0], [route]);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'en-retirement-visa', 'first-month-base');
  const esimHref = withPlacementSubId(SAILY_GENERIC, 'en-retirement-visa', 'arrival-connectivity');
  const pageUrl = 'https://go2-thailand.com/visa/retirement-visa/';

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand Retirement Visa: Non-O, O-A and O-X Compared', description: 'UK-focused decision guide to Thailand retirement visa routes, official requirements, fees, documents and post-arrival duties.', url: pageUrl, inLanguage: 'en', dateModified: '2026-07-26' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
    { '@type': 'ListItem', position: 2, name: 'Thailand visas', item: 'https://go2-thailand.com/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Thailand retirement visa', item: pageUrl },
  ] };

  return (
    <>
      <SEOHead title="Thailand Retirement Visa 2026: Non-O, O-A & O-X" description="Compare Thailand retirement visa requirements for UK applicants: Non-O, O-A and O-X, age 50+, financial proof, fees, insurance and 90-day reporting." ogImage="https://go2-thailand.com/images/redesign/thailand-retirement-visa-hero.webp">
        <meta name="keywords" content="thailand retirement visa, retirement visa thailand, retirement visa for thailand, retirement visa thailand requirements, thailand retirement visa uk, thailand retirement visa cost" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-retirement-visa-hero.webp"
          imageAlt="Mature couple preparing documents for a long stay on a quiet veranda in Thailand"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visas', href: '/visa/' }, { label: 'Retirement visa' }]}
          eyebrow="Non-O · O-A · O-X"
          title={<>Retire in Thailand.<br /><span className="text-saffron">Which route fits?</span></>}
          subtitle="Not one retirement visa, but three very different evidence files."
          description="Compare permitted stay, financial threshold and document burden first. Then choose the official application route that matches your plan."
          actions={[{ label: 'Compare the routes', href: '#route', kind: 'primary' }, { label: 'Open Thai e-Visa', href: THAI_E_VISA, kind: 'secondary', newTab: true }]}
          minHeightClassName="min-h-[735px] lg:min-h-[710px]"
          titleClassName="max-w-[760px] text-[3.55rem] leading-[0.88] !text-white sm:text-[4.85rem] lg:text-[5.55rem]"
          subtitleClassName="max-w-[650px] !text-white"
          descriptionClassName="mt-4 max-w-[560px] text-sm leading-7 !text-white opacity-75"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.2)_0%,rgba(4,42,34,0.56)_42%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.94)_42%,rgba(4,42,34,0.14)_68%,rgba(4,42,34,0.01)_100%)]"
          contentClassName="max-w-[790px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[312px] rounded-2xl border border-white/25 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Start with duration</p><div className="mt-4 grid grid-cols-3 gap-2 text-center">{['90 days', '1 year', '5 + 5'].map((value) => <strong key={value} className="rounded-xl border border-white/12 bg-white/[0.06] py-4 font-display text-xl">{value}</strong>)}</div><p className="mt-4 text-[10px] font-semibold leading-5 text-white/58">The longest route is not automatically the simplest or most suitable.</p></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section id="answer" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Frame the decision first" title="Three routes. Three evidence levels." description="All three start at age 50, but the duration, financial structure, insurance and document rules are not interchangeable." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map((fact) => { const Icon = fact.icon; return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>; })}</div><aside className="mt-6 rounded-2xl border border-saffron/25 bg-tonal p-5 text-xs font-bold leading-6 text-jade">Since 31 August 2025, Thailand’s Ministry of Foreign Affairs has consolidated Non-Immigrant visa category labels. The official notice says this does not affect applicants; always select the current purpose shown in Thai e-Visa rather than relying on an old menu screenshot.</aside></div></section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Your stay plan determines the file" title="Choose by duration and proof, not by nickname." description="Select a route to see what the official UK application material distinguishes for that category." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.68fr_1.32fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Compare routes</p><div className="mt-6 grid gap-2">{routes.map((item) => { const active = route === item.key; return <button key={item.key} type="button" aria-pressed={active} onClick={() => setRoute(item.key)} className={`flex min-h-16 items-center justify-between rounded-xl border px-4 py-3 text-left transition ${active ? 'border-saffron/60 bg-white text-jade' : 'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}><span><strong className="block text-sm">{item.short}</strong><span className={`mt-0.5 block text-[10px] ${active ? 'text-jade/55' : 'text-white/45'}`}>{item.label}</span></span><ArrowRight size={16} className={active ? 'text-saffron' : 'text-white/40'} /></button>; })}</div><p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">This is a decision aid, not an individual immigration assessment. The live e-Visa checklist and any additional embassy request remain decisive.</p></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-saffron/12 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{selected.duration}</span><span className="rounded-full bg-jade/7 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade">{selected.fee}</span></div><h2 className="mt-5 max-w-3xl font-display text-[2.75rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.45rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">{selected.intro}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.proof.map((item, index) => <div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index + 1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.note}</p></div></div></div></div></section>

        <section id="evidence" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="From lighter to heavier file" title="The documents reveal which route you chose." description="The visual route moves from a 90-day application file to deeper financial, medical, insurance and background evidence." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.15fr_0.85fr]"><div className="relative min-h-[390px] lg:min-h-[600px]"><Image src="/images/redesign/thailand-retirement-visa-routes.webp" alt="Three document routes for Thailand Non-O, O-A and O-X retirement visas" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Evidence logic</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">More years require more than a larger balance.</h2><div className="mt-7 grid gap-3">{[
          ['Non-O', 'Identity, UK location and financial evidence for a stay of no more than 90 days.'],
          ['O-A', 'Finances plus medical, insurance and criminal-record evidence.'],
          ['O-X', 'A larger Thai financial buffer plus the extended health, background and annual-check file.'],
        ].map(([label, text]) => <div key={label} className="rounded-xl border border-white/14 bg-white/[0.06] p-4"><div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-saffron text-jade"><Check size={14} /></span><strong className="text-sm">{label}</strong></div><p className="mt-2 pl-10 text-[10px] font-medium leading-5 text-white/56">{text}</p></div>)}</div><a href={LONDON_RETIREMENT} target="_blank" rel="noopener noreferrer" className="btn-cream mt-7">Open official UK checklist <ExternalLink size={15} /></a></div></div></div></div></section>

        <section className="section-divider-bottom bg-mist py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"><SectionHeading eyebrow="Three separate calculations" title="Visa evidence is not a retirement budget." description="An immigration threshold does not prove that housing, healthcare, exchange-rate risk and your UK pension will support the life you want." /><div className="rounded-[30px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10"><div className="grid gap-4 sm:grid-cols-3"><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><Landmark className="text-saffron-light" size={22} /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Calculation A</p><h2 className="mt-2 font-display text-3xl font-semibold">Eligibility</h2><p className="mt-3 text-xs leading-6 text-white/58">Can you evidence the official financial rule for the route you selected?</p></article><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><Home className="text-saffron-light" size={22} /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Calculation B</p><h2 className="mt-2 font-display text-3xl font-semibold">Living costs</h2><p className="mt-3 text-xs leading-6 text-white/58">Do income and reserves cover housing, care, currency movement and a return plan?</p></article><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><RefreshCw className="text-saffron-light" size={22} /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Calculation C</p><h2 className="mt-2 font-display text-3xl font-semibold">UK pension</h2><p className="mt-3 text-xs leading-6 text-white/58">GOV.UK does not list Thailand among the countries receiving annual State Pension increases.</p></article></div><p className="mt-5 rounded-2xl border border-saffron/30 bg-saffron/10 p-5 text-xs font-extrabold leading-6">Thailand has no reciprocal healthcare agreement with the UK. Treat long-term medical cover and a frozen State Pension as planning inputs, not footnotes.</p></div></div></section>

        <section id="apply" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Apply from the United Kingdom" title="Four phases, with route choice before paperwork." description="The Royal Thai Embassy in London uses the official e-Visa platform and may request additional documents or an interview." /><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />{[
          { icon: Route, label: '01', title: 'Confirm the route', text: 'Choose Non-O, O-A or O-X by duration and by evidence you can fully substantiate.' },
          { icon: FileCheck2, label: '02', title: 'Collect & validate', text: 'Check issuing authority, date window, certification and insurance wording before scanning.' },
          { icon: Smartphone, label: '03', title: 'Apply online', text: 'Submit through Thai e-Visa while you are physically outside Thailand and eligible for the London mission.' },
          { icon: PlaneTakeoff, label: '04', title: 'Check before travel', text: 'Verify the e-Visa, insurance, TDAC and supporting documents you may need on arrival.' },
        ].map((step) => { const Icon = step.icon; return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Step {step.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>; })}</div><div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-saffron/25 bg-tonal p-6"><strong className="font-display text-2xl font-semibold text-jade">Pay only after the route and file match.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Official visa fees are non-refundable. The published London table currently shows £60 for single-entry Non-Immigrant, £150 for O-A and £300 for O-X; check the live fee page immediately before payment.</p></div><a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-jade p-6 text-white"><span><strong className="block text-sm">Start on Thai e-Visa</strong><span className="mt-1 block text-[10px] text-white/52">Official application platform</span></span><ExternalLink size={18} className="text-saffron-light" /></a></div></div></section>

        <section id="after-arrival" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="grid overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift lg:grid-cols-[1.04fr_0.96fr]"><div className="relative min-h-[390px] lg:min-h-[620px]"><Image src="/images/redesign/thailand-retirement-after-arrival.webp" alt="Couple planning entry permission, address reporting, extensions and travel during retirement in Thailand" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-jade/32 via-transparent to-transparent lg:bg-gradient-to-r" /></div><div className="p-7 sm:p-10 lg:p-12"><p className="eyebrow">Four separate calendars</p><h2 className="font-display text-[2.85rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade sm:text-[3.55rem]">The file continues after arrival.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">Visa, permission to stay, address reporting and re-entry are often treated as one thing online. Keep them separate and let the passport stamp and competent authority override any general guide.</p><div className="mt-7 grid gap-3">{[
          { icon: PlaneTakeoff, label: 'On entry', title: 'Permission to stay', text: 'Check the admitted-until date before leaving the airport. Visa validity and permission to stay are different clocks.' },
          { icon: Clock3, label: 'During a long stay', title: '90-day report', text: 'TM.47 is a periodic address report for qualifying stays over 90 days; it is not an extension of permission.' },
          { icon: RefreshCw, label: 'Before expiry', title: 'Extension of stay', text: 'An extension is a new Immigration decision with its own current financial, address and evidence requirements.' },
          { icon: Route, label: 'Before departure', title: 'Re-entry check', text: 'Ask whether your status needs a single or multiple TM.8 re-entry permit before leaving Thailand.' },
        ].map((item) => { const Icon = item.icon; return <article key={item.title} className="grid grid-cols-[42px_1fr] gap-4 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-canvas text-jade"><Icon size={18} /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.label}</p><h3 className="mt-1 text-sm font-extrabold text-jade">{item.title}</h3><p className="mt-2 text-[10px] font-medium leading-5 text-charcoal/64">{item.text}</p></div></article>; })}</div></div></div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionHeading eyebrow="Use a control date" title="Not every document lives equally long." description="An accurate document can still fail because it is too old, incorrectly certified or does not contain the required wording. Build the timetable backwards from submission week." /><aside className="mt-7 rounded-2xl border border-saffron/30 bg-canvas p-5"><p className="flex gap-3 text-xs font-extrabold leading-6 text-jade"><CalendarClock size={19} className="mt-0.5 shrink-0 text-saffron-dark" />The London page gives different validity windows across document types and routes. Record the exact live requirement rather than applying one generic three- or six-month rule to the whole file.</p></aside></div><div className="grid gap-4 sm:grid-cols-2">{[
          { title: 'Confirm first', text: 'Open the current category checklist and record route, evidence, issue-date window and certification requirement.' },
          { title: 'Schedule second', text: 'Time medical and criminal-record evidence so it remains usable at submission, with recovery time for corrections.' },
          { title: 'Upload third', text: 'Check names, dates, currency, page order and legibility. A scan does not repair the wrong document.' },
          { title: 'Keep one file copy', text: 'Store the application, receipt, policy, payment record and every document used in a secure dossier.' },
        ].map((item, index) => <article key={item.title} className={`rounded-2xl border p-6 shadow-editorial-card ${index === 0 ? 'border-saffron/30 bg-tonal' : 'border-jade/10 bg-white'}`}><span className="font-display text-[2.4rem] font-semibold leading-none text-jade/13">0{index + 1}</span><h3 className="mt-3 font-display text-[1.75rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{item.text}</p></article>)}</div></div>

        <div className="mt-10 rounded-[26px] bg-jade p-7 text-white shadow-editorial-lift sm:p-9"><div className="grid gap-7 lg:grid-cols-[0.68fr_1.32fr] lg:items-center"><div><p className="eyebrow !text-saffron-light">Help may explain, not promise</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em]">Recognise an unsafe shortcut.</h2></div><div className="grid gap-3 sm:grid-cols-2">{['“Guaranteed” approval without reviewing the evidence', 'Choosing a route before checking age, duration and finance', 'Handing over money or a passport without a written receipt', 'Using an arrangement you cannot explain to Immigration yourself'].map((warning) => <p key={warning} className="flex gap-3 rounded-xl border border-white/13 bg-white/[0.06] p-4 text-[11px] font-bold leading-5 text-white/72"><Ban size={16} className="mt-0.5 shrink-0 text-saffron-light" />{warning}</p>)}</div></div></div></div></section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">After the visa</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.035em]">Keep the first month flexible.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">Use arrival to test the neighbourhood, healthcare, transport and daily routine before signing a long housing commitment.</p><Link href="/visa/digital-arrival-card/" className="btn-cream mt-7">Plan your TDAC next <ArrowRight size={15} /></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Home size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Check current stay price</strong><span className="mt-1 block text-[10px] text-white/50">Start flexibly via Trip.com</span></a><a href={esimHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Smartphone size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Check current eSIM price</strong><span className="mt-1 block text-[10px] text-white/50">Arrival data via Saily</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com and Saily are affiliate links for practical arrival planning. They have no influence on visa eligibility or approval.</AffiliateDisclosure></div></div></div></div></section>

        <FaqSplitSection id="questions" eyebrow="Real UK retirement-visa searches" title="Frequently asked questions about Thailand retirement visas" description="These questions were captured verbatim in current UK DataForSEO SERPs. Answers use Thai government, Royal Thai Embassy and GOV.UK sources rather than commercial visa claims." items={faqs} />

        <RelatedGuidesSection eyebrow="Continue your long-stay plan" title="Build the move in the right order" guides={[
          { title: 'Thailand visas', description: 'Compare shorter stays, DTV and other long-stay routes without mixing their requirements.', href: '/visa/', image: '/images/redesign/thailand-visa-hero.webp', imageAlt: 'Thailand visa documents on a desk' },
          { title: 'Complete the TDAC', description: 'Calculate the free submission window for Thailand’s digital arrival card.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-tdac-hero.webp', imageAlt: 'Thailand digital arrival card on a phone' },
          { title: 'Thailand LTR visa', description: 'Compare the Wealthy Pensioner route when its income and asset rules match your circumstances.', href: '/visa/ltr-visa/', image: '/images/redesign/thailand-ltr-visa-hero.webp', imageAlt: 'Long-term resident planning in Thailand' },
        ]} />

        <SourceMethodSection eyebrow="Sources & research" title="Start with the official category, not a visa agency." description="Independent English research covered 50 DFS keyword records, four current UK SERPs, verbatim English PAA, cluster competitors, exact-URL rankings and backlinks. Every immigration, pension and healthcare claim was then checked against official Thai or UK sources." sources={[
          { title: 'Retirement Visa: Non-O, O-A and O-X', creator: 'Royal Thai Embassy, London · checked 26 July 2026', url: LONDON_RETIREMENT, note: 'Primary UK-market source for route duration, finance, evidence, insurance and the 50-plus requirement.' },
          { title: 'Visa Fees', creator: 'Royal Thai Embassy, London', url: LONDON_FEES, note: 'Official published fees for single-entry Non-Immigrant, O-A and O-X applications; applicants should recheck immediately before payment.' },
          { title: 'Thai E-Visa Official Website', creator: 'Ministry of Foreign Affairs, Thailand', url: THAI_E_VISA, note: 'Official application platform and current visa-purpose selector for applications made outside Thailand.' },
          { title: 'Non-O change of visa status for retirement purposes', creator: 'Thailand Immigration Bureau', url: 'https://www.immigration.go.th/wp-content/uploads/2022/02/9.FOR-RETIREMENT-PURPOSES-50-YEARS-OLD-NON-O.pdf', note: 'Primary checklist for the separate in-country Non-O status-change process.' },
          { title: 'Notification of staying longer than 90 days (TM.47)', creator: 'Thailand Immigration Bureau', url: 'https://www.immigration.go.th/wp-content/uploads/2022/10/18.Form-TM-47.pdf', note: 'Official address-report form; the report is not an extension of stay.' },
          { title: 'Living in Thailand', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/guidance/living-in-thailand', note: 'Official UK guidance on Thai visas, reporting, work, healthcare, tax and retirement planning.' },
          { title: 'State Pension if you retire abroad', creator: 'UK Government', url: 'https://www.gov.uk/state-pension-if-you-retire-abroad/rates-of-state-pension', note: 'Primary UK source for the countries where annual State Pension increases continue.' },
        ]} />
      </div>
    </>
  );
}
