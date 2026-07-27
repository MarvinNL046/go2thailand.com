import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  Gem,
  GraduationCap,
  Hotel,
  Laptop,
  Landmark,
  MapPinned,
  Plane,
  RefreshCw,
  Route,
  ShieldCheck,
  Smartphone,
  Stamp,
  TreePalm,
  UserRoundCheck,
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

const PAGE_URL = 'https://go2-thailand.com/visa/';
const GOV_UK = 'https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements';
const EMBASSY_EXEMPTION = 'https://london.thaiembassy.org/en/page/exemp-visa';
const EMBASSY_GENERAL = 'https://london.thaiembassy.org/en/page/visa-general-information?menu=64cd03802f080d54bb16df93';
const THAI_E_VISA = 'https://www.thaievisa.go.th/';
const TDAC = 'https://tdac.immigration.go.th/';

const sectionNav = [
  { href: '#answer' as const, label: 'Quick answer', icon: ShieldCheck },
  { href: '#finder' as const, label: 'Visa finder', icon: Route },
  { href: '#difference' as const, label: 'Know the terms', icon: FileCheck2 },
  { href: '#routes' as const, label: 'All routes', icon: Landmark },
  { href: '#clocks' as const, label: 'Stay clocks', icon: CalendarClock },
  { href: '#questions' as const, label: 'FAQs', icon: CircleAlert },
];

type PurposeKey = 'holiday' | 'long-holiday' | 'remote' | 'retire' | 'study' | 'work';

const purposeOptions: Array<{
  key: PurposeKey;
  tab: string;
  eyebrow: string;
  title: string;
  verdict: string;
  facts: string[];
  href: string;
  cta: string;
}> = [
  { key: 'holiday', tab: 'Short holiday', eyebrow: 'British passport · start here', title: 'Check visa exemption before applying for anything.', verdict: 'At our 27 July 2026 source check, a full British citizen passport can normally use visa exemption for a tourist visit of up to 60 days. Entry is still assessed at the checkpoint.', facts: ['No paid visa application before travel', 'Free TDAC remains separate', 'Confirmed onward travel may be required', 'Your arrival stamp controls the leave-by date'], href: '/visa/visa-free-entry/', cta: 'Check visa exemption' },
  { key: 'long-holiday', tab: 'Longer or repeated tourism', eyebrow: 'Tourism · planned visa route', title: 'Compare exemption with a Tourist Visa.', verdict: 'A longer itinerary, a different passport or several genuine tourist arrivals can make a single or multiple-entry Tourist Visa the cleaner route. Visa validity is not the same as permitted stay.', facts: ['Single and multiple-entry structures', 'Official e-Visa application before travel', 'Evidence must match one coherent itinerary', 'Extension remains a separate decision'], href: '/visa/tourist-visa/', cta: 'Compare Tourist Visas' },
  { key: 'remote', tab: 'Remote work / soft power', eyebrow: 'Workcation · eligible activities', title: 'Check the Destination Thailand Visa.', verdict: 'The DTV is a purpose-led long-stay route for eligible remote work, workcation and soft-power activities. It should be assessed by evidence and actual purpose, not only by its five-year validity label.', facts: ['Five-year visa validity', 'Up to 180 days per entry', 'Financial and purpose evidence', 'Tax and employment remain separate questions'], href: '/visa/digital-nomad-visa/', cta: 'Check DTV eligibility' },
  { key: 'retire', tab: 'Retirement', eyebrow: 'Age 50+ · several legal routes', title: 'Choose by where and how you apply.', verdict: '“Retirement Visa” can mean Non-Immigrant O, O-A or an in-country extension path. Insurance, financial evidence, application location and renewal duties differ.', facts: ['Compare O, O-A and extension paths', 'Do not mix deposit and income evidence', 'Insurance differs by route', 'Re-entry and reporting need a calendar'], href: '/visa/retirement-visa/', cta: 'Compare retirement routes' },
  { key: 'study', tab: 'Study', eyebrow: 'Real course · Non-ED', title: 'Make the school and study plan the evidence.', verdict: 'The Education Visa is for genuine study with a recognised provider and continuing compliance. A course sale is not the same as visa approval.', facts: ['School evidence before application', 'Attendance and reporting matter', 'Work is not automatically permitted', 'Extensions are case-specific'], href: '/visa/education-visa/', cta: 'Open Education Visa guide' },
  { key: 'work', tab: 'Employment / investment', eyebrow: 'Purpose first · official checker', title: 'Use the route matching the actual role or investment.', verdict: 'General employment, business establishment and highly skilled or investment routes require their own visa and sometimes separate work authorisation. Start with the official eligibility checker; compare LTR only if its thresholds genuinely fit.', facts: ['Visa and work authorisation can be separate', 'Employer or investment evidence is central', 'LTR has four narrow qualification groups', 'Do not use tourist entry as a work plan'], href: '/visa/ltr-visa/', cta: 'Compare LTR routes' },
];

const visaRoutes = [
  { icon: ShieldCheck, label: 'Short tourism', title: 'Visa exemption', time: 'Current UK route: up to 60 days', text: 'For an eligible ordinary British passport; no paid visa application, but border evidence and TDAC remain.', href: '/visa/visa-free-entry/' },
  { icon: Plane, label: 'Planned tourism', title: 'Tourist Visa', time: 'Single or multiple entry', text: 'For travellers who need or prefer a visa arranged before tourism travel.', href: '/visa/tourist-visa/' },
  { icon: Laptop, label: 'Workcation', title: 'Destination Thailand Visa', time: 'Five-year visa validity', text: 'For eligible remote work, workcation and soft-power purposes with supporting evidence.', href: '/visa/digital-nomad-visa/' },
  { icon: TreePalm, label: 'Age 50+', title: 'Retirement routes', time: 'O, O-A or extension', text: 'Compare application location, finance, insurance, stay and renewal obligations.', href: '/visa/retirement-visa/' },
  { icon: GraduationCap, label: 'Genuine study', title: 'Education Visa', time: 'Course and compliance led', text: 'For recognised study with school documents, attendance and immigration duties.', href: '/visa/education-visa/' },
  { icon: UserRoundCheck, label: 'High threshold', title: 'Long-Term Resident Visa', time: 'Five years + renewal review', text: 'Four narrow qualification groups, a digital work permit route and a mid-term check.', href: '/visa/ltr-visa/' },
  { icon: Gem, label: 'Paid convenience', title: 'Thailand Privilege', time: '5–20+ year membership', text: 'Premium membership and Privilege Entry status — not permanent residence or permission to work.', href: '/visa/thailand-elite-visa/' },
  { icon: RefreshCw, label: 'Already in Thailand', title: 'Visa extension', time: 'Separate application', text: 'Understand the stamped deadline, documents, discretion and overstay risk before applying.', href: '/visa/visa-extension/' },
];

const faqs = [
  { question: 'Do I need a visa for Thailand from the UK?', answer: 'At the 27 July 2026 source check, a traveller with a full British citizen passport can normally use visa exemption for tourism for up to 60 days. Different passports, purposes or longer plans can require a visa. Verify GOV.UK and the Royal Thai Embassy again shortly before travel.' },
  { question: 'Do I need a visa for a two-week holiday in Thailand?', answer: 'A British citizen using a full British passport would normally check the current visa-exemption route first for a two-week holiday. You still need a valid passport, the separate TDAC and any entry evidence requested by the airline or Immigration.' },
  { question: 'How long can British citizens stay in Thailand?', answer: 'The current exemption guidance says up to 60 days for an ordinary British passport. Other routes grant different stay periods. The admitted-until stamp, not the visa label or a web calculator, controls the practical deadline after arrival.' },
  { question: 'Can I stay in Thailand for six months?', answer: 'There is no universal six-month tourist stay. A multiple-entry Tourist Visa has a validity window rather than one continuous six-month permission, while DTV and other long-stay routes have their own per-entry or permission periods. Choose by purpose and read each stamp.' },
  { question: 'What is the easiest one-year visa for Thailand?', answer: 'There is no single “easy” one-year visa for everyone. Retirement, work, education, LTR and Thailand Privilege routes each solve different purposes and have different thresholds. Start with age, activity, finances and where you will apply rather than duration alone.' },
  { question: 'How much does a Thailand visa cost from the UK?', answer: 'The cost depends on the route and can change. Visa exemption and the official TDAC are free; paid visas and memberships have route-specific official fees. Use the dedicated guide and live embassy or provider page before paying, and never pay a third party for a “guaranteed” approval.' },
  { question: 'Is the Thailand Digital Arrival Card a visa?', answer: 'No. TDAC is a free arrival registration, separate from visa exemption and every visa. It does not grant entry, extend a stay or replace the correct permission for work, study or long-term residence.' },
  { question: 'Can I keep returning to Thailand without a visa?', answer: 'Each arrival is assessed separately. Repeated exemption entries are not a guaranteed long-stay strategy, and the London embassy warns that multiple entries can lead to refusal. Use the visa matching your real pattern if Thailand is becoming a base rather than a holiday.' },
];

export default function ThailandVisaGuideEn() {
  const [selectedKey, setSelectedKey] = useState<PurposeKey>('holiday');
  const selected = purposeOptions.find((item) => item.key === selectedKey) ?? purposeOptions[0];
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'en-visa-hub-first-stay');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'en-visa-hub-onward');
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const collectionSchema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Thailand visa guide for UK travellers', description: 'Decision-first guide to Thailand visa exemption, Tourist Visa, DTV, retirement, study, LTR, Privilege and extensions.', url: PAGE_URL, inLanguage: 'en-GB', dateModified: '2026-07-27', hasPart: visaRoutes.map((item) => ({ '@type': 'WebPage', name: item.title, url: `https://go2-thailand.com${item.href}` })) };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' }, { '@type': 'ListItem', position: 2, name: 'Thailand visas', item: PAGE_URL }] };

  return <>
    <SEOHead title="Thailand Visa UK: which route do you need?" description="Thailand visa guide for UK travellers. Check the current 60-day exemption first, then compare Tourist Visa, DTV, retirement, education, LTR and extensions." ogImage="https://go2-thailand.com/images/redesign/thailand-visa-hero.webp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </SEOHead>

    <div className="bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-visa-hero.webp" imageAlt="Traveller comparing passport and Thailand visa routes before departure" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visa guide' }]} eyebrow="UK traveller · exemption · e-Visa" title={<>Thailand visa.<br /><span className="text-saffron">Which route fits?</span></>} subtitle="For many British holidays, the answer starts with no visa application." description="Check exemption first. If it does not match your passport, purpose or timeline, use the finder to compare the right researched owner — without confusing a visa, TDAC and an arrival stamp." actions={[{ label: 'Use the visa finder', href: '#finder', kind: 'primary' }, { label: 'Check official e-Visa', href: THAI_E_VISA, kind: 'secondary', newTab: true }]} minHeightClassName="min-h-[760px] lg:min-h-[700px]" titleClassName="max-w-[850px] text-[3.35rem] leading-[0.88] sm:text-[4.65rem] lg:text-[5.35rem]" imageClassName="object-cover object-[67%_center] lg:object-center" sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/25 bg-jade/88 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">British holiday · source check 27 July 2026</p><strong className="mt-3 block font-display text-3xl font-semibold">Exemption first</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">A full British citizen passport can normally visit for up to 60 days under the current rule. Verify live.</p></div>} />
      <PageSectionNav items={sectionNav} />

      <section id="answer" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><div className="grid gap-10 lg:grid-cols-[0.73fr_1.27fr] lg:items-center"><div><p className="eyebrow">The answer most UK travellers need first</p><h2 className="font-display text-[3.7rem] font-semibold leading-[0.88] tracking-[-0.045em] text-jade">A visa is not the default for every holiday.</h2><p className="mt-6 text-sm font-medium leading-7 text-charcoal/66">At the dated official check, a full British citizen passport can normally use visa exemption for tourism for up to 60 days. The arrangement is temporary, border admission is never guaranteed and the passport stamp controls the actual stay.</p><Link href="/visa/visa-free-entry/" className="btn-jade mt-7">Read the exemption guide <ArrowRight size={15} /></Link></div><div className="grid gap-4 sm:grid-cols-2">{[
        { icon: ShieldCheck, label: 'Short UK holiday', value: 'Up to 60 days', text: 'Current visa-exemption route; check live before travel.' },
        { icon: Smartphone, label: 'Every arrival', value: 'TDAC separately', text: 'Free arrival registration, never a paid visa.' },
        { icon: Stamp, label: 'At the border', value: 'Check the stamp', text: 'The admitted-until date is the practical deadline.' },
        { icon: BriefcaseBusiness, label: 'Work or study', value: 'Purpose matters', text: 'Use the route matching what you will actually do.' },
      ].map(({ icon: Icon, label, value, text }) => <article key={label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={22} className="text-saffron-dark" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-charcoal/44">{label}</p><strong className="mt-1 block font-display text-2xl font-semibold text-jade">{value}</strong><p className="mt-2 text-[10px] font-medium leading-5 text-charcoal/54">{text}</p></article>)}</div></div></div></section>

      <section id="finder" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Purpose-led visa finder" title="What will you actually do in Thailand?" description="Choose the closest plan. The finder does not decide eligibility; it sends you to the dedicated owner with the right evidence, clocks and official links." /><div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">{purposeOptions.map((item) => <button key={item.key} type="button" aria-pressed={selectedKey === item.key} onClick={() => setSelectedKey(item.key)} className={`rounded-2xl border p-4 text-left transition ${selectedKey === item.key ? 'border-jade bg-jade text-white shadow-editorial-card' : 'border-jade/10 bg-white text-jade hover:border-saffron/55'}`}><span className={`text-[9px] font-extrabold uppercase tracking-[0.13em] ${selectedKey === item.key ? 'text-saffron-light' : 'text-saffron-dark'}`}>Plan {purposeOptions.indexOf(item) + 1}</span><strong className="mt-2 block text-xs leading-5">{item.tab}</strong></button>)}</div><div className="mt-4 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.92fr_1.08fr]"><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">{selected.eyebrow}</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">{selected.title}</h2><p className="mt-5 text-sm font-medium leading-7 text-white/65">{selected.verdict}</p></div><div className="p-7 sm:p-10 lg:p-12"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Decision checklist</p><div className="mt-5 grid gap-3">{selected.facts.map((fact) => <div key={fact} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-canvas p-4"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={13} /></span><span className="text-xs font-extrabold leading-5 text-jade">{fact}</span></div>)}</div><Link href={selected.href} className="btn-jade mt-6">{selected.cta} <ArrowRight size={15} /></Link></div></div></div></div></section>

      <section id="difference" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Four terms that search results blur" title="Visa, exemption, Visa on Arrival and TDAC are not synonyms." description="Use the right word and the right official action. This prevents paying for a free form or arriving with the wrong permission." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[
        { icon: FileCheck2, title: 'Visa', label: 'Permission arranged before travel', text: 'A route such as Tourist Visa, DTV, Education, retirement or LTR, with purpose-specific evidence.' },
        { icon: ShieldCheck, title: 'Visa exemption', label: 'No visa application first', text: 'For eligible passports and purposes; admission and the stay granted remain border decisions.' },
        { icon: Stamp, title: 'Visa on Arrival', label: 'A separate nationality route', text: 'Not another name for UK visa exemption. Check eligibility and current conditions before travel.' },
        { icon: Smartphone, title: 'TDAC', label: 'Free arrival registration', text: 'Required separately for foreign arrivals; it grants no visa, extension or admission.' },
      ].map(({ icon: Icon, title, label, text }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-tonal text-jade"><Icon size={20} /></span><h3 className="mt-5 font-display text-2xl font-semibold text-jade">{title}</h3><p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{label}</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>)}</div><div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-4"><CircleAlert size={22} className="mt-1 shrink-0 text-saffron-dark" /><div><strong className="font-display text-2xl font-semibold text-jade">The official TDAC is free.</strong><p className="mt-1 text-xs font-medium leading-6 text-charcoal/62">Use the Immigration Bureau domain. A paid form service does not improve entry permission.</p></div></div><a href={TDAC} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Open official TDAC <ExternalLink size={15} /></a></div></div></section>

      <section id="routes" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="The researched visa directory" title="Eight routes. Each with one clear owner." description="Use this directory after the purpose check. Duration labels are orientation only; live eligibility, evidence, validity and stay rules belong in each dedicated guide." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{visaRoutes.map(({ icon: Icon, label, title, time, text, href }) => <Link key={href} href={href} className="group flex min-h-[285px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:border-saffron/45"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-tonal text-jade"><Icon size={20} /></span><ArrowRight size={17} className="text-jade/35 transition group-hover:translate-x-1 group-hover:text-saffron-dark" /></div><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{label}</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-tight text-jade">{title}</h3><strong className="mt-3 text-[10px] text-jade/75">{time}</strong><p className="mt-3 text-xs font-medium leading-6 text-charcoal/58">{text}</p></Link>)}</div></div></section>

      <section id="clocks" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"><div><p className="eyebrow">Read every date in context</p><h2 className="font-display text-[3.55rem] font-semibold leading-[0.88] tracking-[-0.045em] text-jade">One visa can contain four different clocks.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/64">A “six-month visa” can describe when entries may be made, not one continuous stay. Keep these clocks on separate lines before booking.</p></div><div className="relative grid gap-4 sm:grid-cols-2"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 lg:block" />{[
        { icon: FileCheck2, label: 'Before travel', title: 'Application window', text: 'When and where an application may be submitted.' },
        { icon: Landmark, label: 'On the visa', title: 'Visa validity', text: 'The period in which an entry or entries may be used.' },
        { icon: Stamp, label: 'At the border', title: 'Permitted stay', text: 'The admitted-until date actually granted for that arrival.' },
        { icon: CalendarClock, label: 'Before expiry', title: 'Extension', text: 'A separate request with its own evidence and discretion.' },
      ].map(({ icon: Icon, label, title, text }) => <article key={title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{label}</p><h3 className="mt-2 font-display text-2xl font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>)}</div></div></div></section>

      <section className="section-divider-bottom bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Plan only after permission</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">Turn the chosen route into a credible itinerary.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/62">Check flexible first-stay and onward options only when they match the actual application or border story. A booking never guarantees approval or admission.</p><a href={GOV_UK} target="_blank" rel="noopener noreferrer" className="btn-cream mt-7">Verify current UK rules <ExternalLink size={15} /></a></div><div className="grid gap-4 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-6"><Hotel size={21} className="text-saffron-light" /><strong className="mt-5 block text-sm">Check current stays</strong><span className="mt-2 block text-[10px] font-medium leading-5 text-white/52">Flexible hotel options via Trip.com</span></a><a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-6"><MapPinned size={21} className="text-saffron-light" /><strong className="mt-5 block text-sm">Check onward transport</strong><span className="mt-2 block text-[10px] font-medium leading-5 text-white/52">Live air, rail, bus and ferry options via 12Go</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com and 12Go links are sponsored affiliate links shown after the visa decision. They do not determine eligibility, approval or admission.</AffiliateDisclosure></div></div></div></div></section>

      <FaqSplitSection id="questions" eyebrow="Measured UK visa questions" title="Thailand visa questions, routed to the right concept" description="These questions come from the 27 July 2026 DataForSEO UK results. Answers were checked against current GOV.UK, Royal Thai Embassy, official e-Visa and Immigration Bureau sources." items={faqs} />

      <RelatedGuidesSection eyebrow="Start with the three entry essentials" title="Permission, arrival registration and the stamped deadline" guides={[
        { title: 'Visa exemption', description: 'Check British-passport evidence, onward travel, border discretion and the current 60-day route.', href: '/visa/visa-free-entry/', image: '/images/redesign/thailand-visa-hero.webp', imageAlt: 'Traveller checking passport and Thailand entry plans' },
        { title: 'Digital Arrival Card', description: 'Use the free official TDAC and calculate its separate three-day submission window.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-tdac-hero.webp', imageAlt: 'Thailand Digital Arrival Card on a phone' },
        { title: 'Visa extension', description: 'Understand the separate in-country request before the admitted-until date.', href: '/visa/visa-extension/', image: '/images/redesign/thailand-visa-extension-hero.webp', imageAlt: 'Thailand visa extension documents and calendar' },
      ]} />

      <SourceMethodSection eyebrow="Sources & method" title="A visa hub should reduce the number of wrong applications." description="This English owner combines 403 DataForSEO cluster records (330 unique keywords), 10 live UK SERPs, 85 organic results, 60 verbatim PAA records (42 unique questions), exact ranking and backlink checks, and a dated review of UK and Thai primary sources. Detail and price intent is deliberately passed to the dedicated owners." sources={[
        { title: 'Thailand entry requirements', creator: 'UK Foreign, Commonwealth & Development Office', url: GOV_UK, note: 'Current British passport, exemption, TDAC, purpose and overstay guidance.' },
        { title: 'Visa exemption', creator: 'Royal Thai Embassy, London', url: EMBASSY_EXEMPTION, note: 'Ordinary British passport, current duration, onward journey and checkpoint discretion.' },
        { title: 'Visa: general information', creator: 'Royal Thai Embassy, London', url: EMBASSY_GENERAL, note: 'Visa purpose, temporary-policy warning, repeated-entry caution and application guidance.' },
        { title: 'Thai e-Visa official website', creator: 'Ministry of Foreign Affairs of Thailand', url: THAI_E_VISA, note: 'Official eligibility checker and visa application workflow.' },
        { title: 'Thailand Digital Arrival Card', creator: 'Thailand Immigration Bureau', url: TDAC, note: 'Free official arrival-registration route; separate from visas and admission.' },
      ]} />
    </div>
  </>;
}
