import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  Hotel,
  Languages,
  PlaneTakeoff,
  School,
  ShieldCheck,
  Stamp,
  University,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';

const LONDON_ED = 'https://london.thaiembassy.org/en/page/education-visa';
const LONDON_ED_PLUS = 'https://london.thaiembassy.org/en/page/non-ed-plus-visa';
const LONDON_DTV = 'https://london.thaiembassy.org/en/page/destination-thailand-visa';
const THAI_E_VISA = 'https://www.thaievisa.go.th/';
const IMMIGRATION = 'https://www.immigration.go.th/';

const sectionNav = [
  { href: '#choose' as const, label: 'Choose a route', icon: School },
  { href: '#evidence' as const, label: 'Evidence', icon: FileCheck2 },
  { href: '#training' as const, label: 'Short training', icon: ShieldCheck },
  { href: '#apply' as const, label: 'Apply', icon: PlaneTakeoff },
  { href: '#after-arrival' as const, label: 'After arrival', icon: Stamp },
  { href: '#questions' as const, label: 'Questions', icon: CircleAlert },
];

type StudyRouteKey = 'school' | 'university' | 'language' | 'internship';

const studyRoutes: Array<{
  key: StudyRouteKey;
  label: string;
  route: string;
  title: string;
  intro: string;
  proof: string[];
  caution: string;
}> = [
  {
    key: 'school',
    label: 'Primary or secondary school',
    route: 'Non-Immigrant ED',
    title: 'The school and the relevant education authority anchor the file.',
    intro: 'For elementary to secondary education, the London embassy asks for an authority letter as well as an enrolment letter signed by an authorised person.',
    proof: ['Authority or international-school letter', 'Signed enrolment details', 'Signer ID or passport copy', 'Funds for tuition and living costs'],
    caution: 'For an applicant under 20, the embassy points parents to a separate Non-Immigrant O family route. It is not automatically included in the student application.',
  },
  {
    key: 'university',
    label: 'University or college',
    route: 'ED or ED Plus',
    title: 'Degree level changes both the evidence and the possible route.',
    intro: 'Higher-education applicants need a university letter and signed enrolment confirmation. Bachelor’s level and above may qualify for the separate ED Plus framework.',
    proof: ['University acceptance letter', 'Signed enrolment confirmation', 'Signer ID or passport copy', 'Funds for tuition and living costs'],
    caution: 'ED Plus has its own benefits and conditions. Do not assume a standard ED visa automatically gains ED Plus re-entry or post-graduation rights.',
  },
  {
    key: 'language',
    label: 'Thai or English course',
    route: 'Short-course ED',
    title: 'A course receipt alone is not the visa evidence package.',
    intro: 'The London checklist for a Thai or English short course asks for a Ministry of Education authority letter plus signed enrolment details from the school.',
    proof: ['Relevant Ministry of Education letter', 'Signed school enrolment details', 'Signer ID or passport copy', 'Funds for tuition and living costs'],
    caution: 'Before paying, ask the provider to name every document it supplies, who signs it, the cancellation terms and what happens if the visa is refused.',
  },
  {
    key: 'internship',
    label: 'Curricular internship',
    route: 'Non-Immigrant ED',
    title: 'Your home institution and Thai host must tell the same story.',
    intro: 'A curricular internship needs a confirmation from your university or educational institute and a matching participation letter from the Thai company or organisation.',
    proof: ['Letter from your home institution', 'Letter from the Thai host', 'Clear programme and dates', 'Funds for living costs'],
    caution: 'A normal job or non-curricular placement is not converted into an ED route just because it includes learning. Check the appropriate work or business visa instead.',
  },
];

const commonEvidence = [
  'Passport or travel-document biodata page',
  'A photograph taken within the last six months',
  'Proof of current UK or Ireland location, such as a named utility bill or rental agreement',
  'Financial evidence or sponsorship covering tuition and living costs',
  'A route-specific letter from the school, university, authority or host organisation',
  'Enrolment details whose course, dates and authorised signer match the application',
];

const faqs = [
  { question: 'How do you get an Education Visa for Thailand from the UK?', answer: 'Start with an eligible Thai institution and the exact study category. Obtain the route-specific authority, university, school or internship letters, then apply through the official Thai e-Visa system from your current country of residence. The embassy may request further evidence.' },
  { question: 'How long can you stay in Thailand on an ED visa?', answer: 'The London embassy states that a standard ED visa is single-entry, valid for entry for 90 days from issue and gives a stay of up to 90 days on arrival. Visa validity and permitted stay are separate. Any extension is discretionary and handled by Immigration.' },
  { question: 'Can you work on a Thailand Education Visa?', answer: 'An ED visa is a study route, not general permission to take employment. A curricular internship has its own evidence route. For paid work or a non-curricular placement, verify the appropriate visa and work-authorisation requirements before starting.' },
  { question: 'Can a Thai language school arrange an ED visa?', answer: 'A qualifying course can support an ED application, but the London checklist requires more than a school invoice: it lists a relevant Ministry of Education letter and signed enrolment details. Ask the school to identify the complete evidence package before paying.' },
  { question: 'Is Muay Thai training an Education Visa activity?', answer: 'Not necessarily for a UK application. The London embassy explicitly lists Muay Thai under DTV2 soft-power activities, while its ED page lists Thai and English short courses but does not list Muay Thai in that section. Match the current embassy category to your course and intended stay.' },
  { question: 'Can an ED visa be extended in Thailand?', answer: 'You can apply to Immigration, but approval and duration are at the immigration officer’s discretion. Your institution should explain what current study, attendance and institutional evidence it will provide; do not treat an extension as guaranteed.' },
  { question: 'What is the difference between ED and ED Plus?', answer: 'The London embassy describes ED Plus for bachelor’s degree study or higher. It includes a different re-entry arrangement, institution-led extensions and a possible one-year post-graduation stay. These benefits should not be assumed for a standard ED visa.' },
];

export default function ThailandEducationVisaGuideEn() {
  const [route, setRoute] = useState<StudyRouteKey>('university');
  const selected = studyRoutes.find((item) => item.key === route) ?? studyRoutes[0];
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'en-education-visa', 'first-weeks');
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand Education Visa guide for UK applicants', description: 'Choose the correct Thailand ED study route, prepare institution evidence and understand entry, extension and work boundaries.', url: 'https://go2-thailand.com/visa/education-visa/', inLanguage: 'en-GB', dateModified: '2026-07-27' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
    { '@type': 'ListItem', position: 2, name: 'Thailand visas', item: 'https://go2-thailand.com/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Education Visa', item: 'https://go2-thailand.com/visa/education-visa/' },
  ] };

  return <>
    <SEOHead title="Thailand Education Visa: choose the right ED route" description="Thailand Education Visa guide for UK applicants: compare university, language-school and internship routes, documents, 90-day entry and extensions." ogImage="https://go2-thailand.com/images/redesign/thailand-education-visa-hero.webp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </SEOHead>
    <div className="bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-education-visa-hero.webp" imageAlt="International student learning Thai in a green courtyard in Chiang Mai" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visas', href: '/visa/' }, { label: 'Education Visa' }]} eyebrow="University · language · internship" title={<>Thailand Education Visa.<br /><span className="text-saffron">Let the course choose the route.</span></>} subtitle="Begin with the institution’s evidence, not the application form." description="University, language study, school and a curricular internship do not use one universal document set. Match your learning goal to the party that can officially confirm it." actions={[{ label: 'Choose your study route', href: '#choose', kind: 'primary' }, { label: 'Open the official checklist', href: LONDON_ED, kind: 'secondary', newTab: true }]} minHeightClassName="min-h-[760px] lg:min-h-[720px]" titleClassName="max-w-[920px] text-[3.15rem] leading-[0.88] !text-white sm:text-[4.45rem] lg:text-[5rem]" subtitleClassName="max-w-[650px] !text-white" descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white opacity-72" imageClassName="object-cover object-[73%_center] lg:object-center" gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.18)_0%,rgba(4,42,34,0.58)_46%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.96)_44%,rgba(4,42,34,0.18)_70%,rgba(4,42,34,0.02)_100%)]" contentClassName="max-w-[920px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75" sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/22 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">The decisive check</p><strong className="mt-3 block font-display text-3xl font-semibold">Can the institution prove it?</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">A polished course page is not an authority letter or authorised enrolment confirmation.</p></div>} />
      <PageSectionNav items={sectionNav} />

      <section className="section-divider-bottom py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="First, separate the clocks" title="A 90-day visa window and a 90-day stay are not the same thing." description="The London embassy gives the standard ED route three distinct decision points: single entry, a 90-day window to use the visa and a stay of up to 90 days after entry." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[
        { icon: CalendarClock, label: 'Visa validity', value: '90 days', text: 'Enter Thailand within 90 days from the visa’s issue date.' },
        { icon: PlaneTakeoff, label: 'Entries', value: 'Single entry', text: 'Leaving without a re-entry permit can void the current permission to stay.' },
        { icon: Stamp, label: 'Initial stay', value: 'Up to 90 days', text: 'Read the admitted-until date placed in your passport on arrival.' },
        { icon: School, label: 'Extension', value: 'Discretionary', text: 'Immigration assesses the current institution and study evidence.' },
      ].map((fact) => { const Icon = fact.icon; return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>; })}</div></div></section>

      <section id="choose" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="From learning goal to evidence route" title="Choose what you will actually study." description="Select your plan to see who must support the application and which evidence gap to solve before paying a provider." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.72fr_1.28fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Your study plan</p><div className="mt-6 grid gap-2">{studyRoutes.map((item) => { const active = route === item.key; return <button key={item.key} type="button" aria-pressed={active} onClick={() => setRoute(item.key)} className={`flex min-h-16 items-center justify-between rounded-xl border px-4 py-3 text-left transition ${active ? 'border-saffron/60 bg-white text-jade' : 'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}><span><strong className="block text-sm">{item.label}</strong><span className={`mt-0.5 block text-[10px] ${active ? 'text-jade/55' : 'text-white/45'}`}>{item.route}</span></span><ArrowRight size={16} className={active ? 'text-saffron' : 'text-white/40'} /></button>; })}</div></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.route}</p><h2 className="mt-3 max-w-3xl font-display text-[2.6rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.35rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">{selected.intro}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.proof.map((item, index) => <div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index + 1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.caution}</p></div></div></div></div></section>

      <section id="evidence" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Build one coherent application" title="Your dates, course and letters must agree." description="Most routes share a base file. The real difference is the institution, authority and programme evidence behind it." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.12fr_0.88fr]"><div className="relative min-h-[390px] lg:min-h-[610px]"><Image src="/images/redesign/thailand-education-visa-routes.webp" alt="Language, university and internship study routes arranged around a visa file" fill sizes="(max-width:1024px) 100vw,56vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Evidence file</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Make the application read like one true programme.</h2><div className="mt-7 grid gap-3">{commonEvidence.map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={14} /></span><p className="pt-1 text-[11px] font-extrabold leading-5 text-white/76">{item}</p></div>)}</div><a href={LONDON_ED} target="_blank" rel="noopener noreferrer" className="btn-cream mt-7">Check the London list <ExternalLink size={15} /></a></div></div></div></div></section>

      <section id="training" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Language and Muay Thai need separate checks" title="Do not buy a course and reverse-engineer the visa later." description="The current London pages explicitly place language short courses under ED and Muay Thai under DTV2. Ask the provider which current embassy category its evidence supports." /><div className="mt-10 grid gap-4 lg:grid-cols-3">{[
        { icon: Languages, code: 'ED', title: 'Language short course', text: 'Thai or English study supported by the relevant education-authority and signed school letters.' },
        { icon: ShieldCheck, code: 'DTV2', title: 'Muay Thai training', text: 'The London embassy lists Muay Thai as a soft-power activity with its own financial and activity proof.' },
        { icon: GraduationCap, code: 'ED Plus', title: 'Degree study', text: 'Bachelor’s level and higher has a separate framework with institution-led benefits and conditions.' },
      ].map((item) => { const Icon = item.icon; return <article key={item.code} className="rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-jade text-white"><Icon size={20} /></span><span className="rounded-full bg-saffron/12 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.code}</span></div><h2 className="mt-6 font-display text-3xl font-semibold text-jade">{item.title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p></article>; })}</div><p className="mt-5 rounded-2xl border border-saffron/25 bg-tonal p-6 text-xs font-extrabold leading-6 text-jade">Ask for the exact category, issuing authority, course dates, attendance policy and refund conditions in writing. Avoid a provider that only promises “visa support” without naming the documents.</p></div></section>

      <section id="apply" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Apply in the right order" title="The institution file comes before Thai e-Visa." description="The official system is the submission channel; it cannot repair a course that does not match the selected category." /><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />{[
        { icon: BookOpenCheck, label: '01', title: 'Choose the programme', text: 'Confirm study level, curriculum, start date and realistic duration.' },
        { icon: University, label: '02', title: 'Verify the institution', text: 'Ask who supplies each authority, enrolment and signer document.' },
        { icon: FileCheck2, label: '03', title: 'Align the evidence', text: 'Make names, dates, course purpose, finances and residence proof consistent.' },
        { icon: PlaneTakeoff, label: '04', title: 'Apply officially', text: 'Upload the complete category-specific file through Thai e-Visa.' },
      ].map((step) => { const Icon = step.icon; return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Step {step.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>; })}</div><div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div><strong className="font-display text-2xl font-semibold text-jade">Check the current fee inside the official application.</strong><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-charcoal/64">Course fees, visa fees, translations and any later Immigration application are separate. We deliberately do not repeat a fixed school package price.</p></div><a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Open Thai e-Visa <ExternalLink size={15} /></a></div></div></section>

      <section id="after-arrival" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"><SectionHeading eyebrow="After arrival" title="Your passport stamp and actual study become the live file." description="The standard ED visa is single-entry. An extension is a separate Immigration decision, and leaving without the correct re-entry arrangement can end the current permission to stay." /><div className="rounded-[30px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10"><div className="grid gap-4 sm:grid-cols-2"><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><Stamp size={22} className="text-saffron-light" /><strong className="mt-5 block font-display text-3xl">Read the admitted-until date</strong><p className="mt-3 text-xs leading-6 text-white/58">It controls the current stay. The visa’s issue-date window does not replace it.</p></article><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><BriefcaseBusiness size={22} className="text-saffron-light" /><strong className="mt-5 block font-display text-3xl">Study is not a work permit</strong><p className="mt-3 text-xs leading-6 text-white/58">Do not begin paid work or a non-curricular placement based only on ED status.</p></article></div><p className="mt-5 rounded-2xl border border-saffron/30 bg-saffron/10 p-5 text-xs font-extrabold leading-6">Keep your enrolment, course schedule, payment evidence and institution contact details. Ask the institution early what it supplies for any Immigration appointment.</p><a href={IMMIGRATION} target="_blank" rel="noopener noreferrer" className="btn-cream mt-6">Open Thailand Immigration <ExternalLink size={15} /></a></div></div></section>

      <section className="section-divider-bottom py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Only after the visa decision</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Keep the first weeks flexible.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">Test the commute, neighbourhood and real lesson rhythm before committing to a long stay or buying specialist equipment.</p><Link href="/travel-gear/" className="btn-cream mt-7">Open the Thailand packing list <ArrowRight size={15} /></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Hotel size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Check current stays</strong><span className="mt-1 block text-[10px] text-white/50">Compare flexible first weeks on Trip.com</span></a><Link href="/visa/digital-nomad-visa/" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><ShieldCheck size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Compare the DTV route</strong><span className="mt-1 block text-[10px] text-white/50">Especially relevant for Muay Thai training</span></Link><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com is an affiliate link for practical first-night planning. It has no influence on institution choice or visa approval.</AffiliateDisclosure></div></div></div></div></section>

      <FaqSplitSection id="questions" eyebrow="Questions measured in the UK search results" title="Thailand Education Visa questions, answered carefully" description="These answers combine the recurring People Also Ask themes with the route boundaries in the current London embassy guidance." items={faqs} />
      <RelatedGuidesSection eyebrow="Compare before you commit" title="Study, soft power and tourism are different routes" guides={[
        { title: 'Destination Thailand Visa', description: 'Compare DTV2 for Muay Thai and other Thai soft-power activities.', href: '/visa/digital-nomad-visa/', image: '/images/redesign/thailand-dtv-hero.webp', imageAlt: 'Traveller working and training in Thailand' },
        { title: 'Thailand Tourist Visa', description: 'Check whether your trip is primarily tourism rather than formal study.', href: '/visa/tourist-visa/', image: '/images/redesign/thailand-tourist-visa-hero.webp', imageAlt: 'Traveller planning a tourist trip to Thailand' },
        { title: 'Visa extensions', description: 'Understand the difference between visa validity, a stay stamp and an extension.', href: '/visa/visa-extension/', image: '/images/redesign/thailand-visa-extension-hero.webp', imageAlt: 'Traveller checking a Thailand passport stamp' },
      ]} />
      <SourceMethodSection eyebrow="Sources & research" title="Official category wording comes before school marketing." description="The English owner uses four DataForSEO keyword clusters, ten live UK SERPs, 88 organic results and 51 verbatim People Also Ask questions. Ranking and backlink checks found no current exact visibility or reportable backlinks. Legal and procedural claims were then checked against current Royal Thai Embassy London and Thai government sources." sources={[
        { title: 'Education Visa', creator: 'Royal Thai Embassy, London · updated 17 July 2024', url: LONDON_ED, note: 'Primary UK source for eligible ED study routes, evidence, single entry, 90-day validity and discretionary extensions.' },
        { title: 'NON-ED PLUS Visa', creator: 'Royal Thai Embassy, London · published 17 July 2024', url: LONDON_ED_PLUS, note: 'Primary UK source for bachelor’s-level-and-higher eligibility, re-entry treatment, institution-led extensions and post-graduation provision.' },
        { title: 'Destination Thailand Visa', creator: 'Royal Thai Embassy, London · updated 1 August 2024', url: LONDON_DTV, note: 'Primary UK source for Muay Thai as a DTV2 soft-power activity and its separate evidence route.' },
        { title: 'Thai e-Visa', creator: 'Ministry of Foreign Affairs, Thailand', url: THAI_E_VISA, note: 'Official online application channel and current visa-category checker.' },
      ]} />
    </div>
  </>;
}
