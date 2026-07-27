import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck2,
  CalendarClock,
  Check,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  Hotel,
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

const PAGE_URL = 'https://go2-thailand.com/visa/visa-extension/';
const IMMIGRATION_HANDBOOK = 'https://www.immigration.go.th/wp-content/uploads/2023/01/5-Public-Handbook-2.4-tourism-purpose.pdf';
const IMMIGRATION_E_EXTENSION = 'https://sukhothai.immigration.go.th/o6-2569/';
const THAI_E_EXTENSION = 'https://thaiextension.vfsevisa.com/';
const GOV_UK = 'https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements';

const sectionNav = [
  { href: '#stamp' as const, label: 'Read your stamp', icon: Stamp },
  { href: '#route' as const, label: 'Choose the route', icon: Route },
  { href: '#documents' as const, label: 'Documents', icon: FileCheck2 },
  { href: '#apply' as const, label: 'Apply', icon: CalendarCheck2 },
  { href: '#border-run' as const, label: 'Not a border run', icon: ShieldCheck },
  { href: '#questions' as const, label: 'FAQs', icon: CircleAlert },
];

type ExtensionRouteKey = 'tourist' | 'dtv' | 'longstay' | 'border';

const extensionRoutes: Array<{ key: ExtensionRouteKey; tab: string; kicker: string; title: string; verdict: string; facts: string[]; caution: string; action: { href: string; label: string; external?: boolean } }> = [
  {
    key: 'tourist', tab: 'Tourist Visa or exemption', kicker: 'The standard tourism route',
    title: 'Apply before the admitted-until date in your passport.',
    verdict: 'For a normal tourist stay, an extension of up to 30 days is commonly available. The Immigration office responsible for where you stay assesses the application and issues the actual result.',
    facts: ['Start with the admitted-until date in your passport', 'TM.7, recent photograph, passport and relevant copies', 'Official application fee: 1,900 THB', 'The local office can request extra address or route evidence'],
    caution: '“Up to 30 days” is not an automatic promise. Only the new immigration stamp confirms the revised leave-by date.',
    action: { href: IMMIGRATION_HANDBOOK, label: 'Open the official handbook', external: true },
  },
  {
    key: 'dtv', tab: 'Destination Thailand Visa', kicker: 'A different extension ground',
    title: 'A DTV does not use the compact tourist evidence list.',
    verdict: 'The official DTV measure describes up to 180 days per entry and one possible extension not exceeding another 180 days. Evidence should continue to support the workcation, Thai soft-power or family route used for the DTV.',
    facts: ['Check the current DTV entry stamp', 'Keep evidence aligned with DTV1, DTV2 or DTV3', 'Immigration assesses the extension separately', 'Leaving and re-entering is a different decision'],
    caution: 'Do not use the tourist TM.7 summary on this page as a complete DTV extension checklist.',
    action: { href: '/visa/digital-nomad-visa/', label: 'Open the DTV decision guide' },
  },
  {
    key: 'longstay', tab: 'Retirement, study or family', kicker: 'Long stay needs its own file',
    title: 'The legal ground controls the evidence—not the word “extension”.',
    verdict: 'Retirement, education, family and employment routes have separate financial, relationship or institutional requirements. A tourist checklist cannot prove an annual or purpose-specific extension.',
    facts: ['Confirm the exact visa and permitted-stay ground', 'Request the responsible office’s current checklist', 'Some evidence can have a short validity period', 'Treat 90-day reporting and re-entry permission separately'],
    caution: 'A 90-day report does not extend permission to stay. It is a separate reporting duty for qualifying long-stay residents.',
    action: { href: '/visa/retirement-visa/', label: 'Compare retirement routes' },
  },
  {
    key: 'border', tab: 'I was considering a border run', kicker: 'This is not an extension',
    title: 'Leaving and returning starts a new admission decision.',
    verdict: 'Crossing a border does not alter the previous stamp. On return, Immigration decides again whether to admit you, for how long and under which conditions.',
    facts: ['No application against the existing permission', 'No guaranteed admission or duration', 'Travel and entry history can be considered', 'A new TDAC and live entry conditions apply again'],
    caution: 'Do not design a long stay around repeated short border crossings. Choose a visa route that covers the real purpose and duration.',
    action: { href: '/visa/', label: 'Choose an appropriate visa route' },
  },
];

const quickFacts = [
  { icon: CalendarClock, label: 'Tourism route', value: 'Up to 30 days', text: 'The common maximum for an approved tourism extension; not a guarantee.' },
  { icon: WalletCards, label: 'Official fee', value: '1,900 THB', text: 'Application fee in the Immigration Bureau public handbook.' },
  { icon: MapPinned, label: 'Where to apply', value: 'Local Immigration', text: 'Use the office responsible for the area where you reside.' },
  { icon: FileCheck2, label: 'Core form', value: 'TM.7 + photograph', text: 'Together with passport, copies and overstay acknowledgement.' },
];

const documentItems = [
  'Original passport and copies of the relevant biodata, visa and entry-stamp pages',
  'Completed TM.7 application with a recent 4 × 6 cm photograph',
  'Signed acknowledgement of penalties for visa overstay',
  'Current accommodation or address evidence if requested by the local office',
  'Journey or departure evidence when relevant to your route',
  '1,900 THB application fee plus any separately disclosed online service fee',
];

const faqs = [
  { question: 'How much does a Thailand visa extension cost?', answer: 'The Immigration Bureau public handbook lists an application fee of 1,900 THB for a temporary-stay extension. A separate e-Extension service fee can apply when using the online channel. Paying does not guarantee approval.' },
  { question: 'How do I extend my stay in Thailand?', answer: 'First read the admitted-until date and identify the legal basis of your current stay. Before that date, contact the Immigration office responsible for your residence. A standard tourism file uses TM.7, a recent photograph, passport and copies, but the local office can request additional documents.' },
  { question: 'How many extra days can a tourist get?', answer: 'For a normal tourist stay, up to 30 additional days is commonly available, depending on nationality, original admission and Immigration’s assessment. The stamp issued after approval is the only reliable record of the new leave-by date.' },
  { question: 'What documents are required for a 30-day Thailand extension?', answer: 'The official tourism handbook identifies a valid passport, TM.7 with photograph and the overstay acknowledgement. Immigration guidance also lists a passport copy and the 1,900 THB fee. Local offices can request relevant stamp copies, address evidence or other supporting documents, so verify the local list.' },
  { question: 'Can I extend a Thailand visa completely online?', answer: 'Thailand offers e-Extension for selected categories and supported offices. It can handle registration, document upload, payment and appointment booking, but applicants still appear in person for identity verification and the immigration result. Confirm eligibility before transmitting documents or paying.' },
  { question: 'Is a border run the same as a visa extension?', answer: 'No. An extension asks Immigration to add time to an existing permission before it expires. Leaving and returning triggers a new border decision with no guarantee of admission or a particular stay length.' },
  { question: 'What happens if I overstay before applying?', answer: 'Once the admitted-until date is passed, overstay penalties and more serious consequences can apply. GOV.UK currently describes a 500 THB daily fine up to 20,000 THB, plus possible detention, deportation and entry bans. Contact Immigration or appropriate legal help immediately rather than relying on an online guide.' },
];

export default function ThailandVisaExtensionGuideEn() {
  const [route, setRoute] = useState<ExtensionRouteKey>('tourist');
  const selected = extensionRoutes.find((item) => item.key === route) ?? extensionRoutes[0];
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'en-visa-extension-flexible-stay');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'en-visa-extension-onward-plan');
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand visa extension', description: 'Decision guide to the TM.7 tourism extension, documents, official fee, e-Extension and border-run distinction.', url: PAGE_URL, inLanguage: 'en-GB', dateModified: '2026-07-27' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
    { '@type': 'ListItem', position: 2, name: 'Thailand visas', item: 'https://go2-thailand.com/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Visa extension', item: PAGE_URL },
  ] };

  return <>
    <SEOHead title="Thailand Visa Extension: TM.7, fee and documents" description="Extend a stay in Thailand: read your stamp, prepare TM.7 and documents, understand the 1,900 THB fee, e-Extension and why a border run is different." ogImage="https://go2-thailand.com/images/redesign/thailand-visa-extension-hero.webp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </SEOHead>
    <div className="bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-visa-extension-hero.webp" imageAlt="Traveller checking the admitted-until date in a passport before a Thailand stay extension" breadcrumbs={[{label:'Thailand',href:'/'},{label:'Visas',href:'/visa/'},{label:'Extension'}]} eyebrow="Stamp · TM.7 · Immigration" title={<>Thailand visa extension.<br/><span className="text-saffron">Before your stamp expires.</span></>} subtitle="The admitted-until date matters more than your flight booking." description="Read the current stamp, choose the correct extension ground and verify the local evidence list. Keep an extension, e-Extension and a new border admission separate." actions={[{label:'Choose your route',href:'#route',kind:'primary'},{label:'Open Immigration handbook',href:IMMIGRATION_HANDBOOK,kind:'secondary',newTab:true}]} minHeightClassName="min-h-[760px] lg:min-h-[720px]" titleClassName="max-w-[850px] text-[3.35rem] leading-[0.88] !text-white sm:text-[4.7rem] lg:text-[5.2rem]" subtitleClassName="max-w-[660px] !text-white" descriptionClassName="mt-4 max-w-[600px] text-sm leading-7 !text-white opacity-75" imageClassName="object-cover object-[72%_center] lg:object-center" gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.18)_0%,rgba(4,42,34,0.58)_46%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.96)_44%,rgba(4,42,34,0.18)_70%,rgba(4,42,34,0.02)_100%)]" contentClassName="max-w-[860px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75" contentTone="light" sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/22 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Your hard deadline</p><strong className="mt-3 block font-display text-3xl font-semibold">The passport stamp</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">Not a visa sticker, hotel booking or flight determines the end of this permission to stay.</p></div>} />
      <PageSectionNav items={sectionNav}/>

      <section id="stamp" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Start with the current permission" title="Read the stamp as carefully as the return ticket." description="The admitted-until date tells you when this entry ends. Start there, then decide which application matches the legal basis of your stay."/><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map(fact=>{const Icon=fact.icon;return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-tonal text-jade"><Icon size={20}/></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>})}</div><div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><Stamp size={23} className="mt-1 shrink-0 text-saffron-dark"/><div><strong className="font-display text-2xl font-semibold text-jade">Check the passport again after the decision.</strong><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-charcoal/64">Only the new immigration stamp confirms the revised departure date. A receipt or online submission confirmation does not.</p></div></div><a href={IMMIGRATION_HANDBOOK} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Official procedure <ExternalLink size={15}/></a></div></div></section>

      <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="One word, several legal grounds" title="Choose the extension route before collecting documents." description="Tourism, DTV, long stay and a new border admission do not share one universal checklist."/><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.72fr_1.28fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Your current route</p><div className="mt-6 grid gap-2">{extensionRoutes.map(item=>{const active=route===item.key;return <button key={item.key} type="button" aria-pressed={active} onClick={()=>setRoute(item.key)} className={`flex min-h-16 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-extrabold transition ${active?'border-saffron/60 bg-white text-jade':'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}>{item.tab}<ArrowRight size={16} className={active?'text-saffron':'text-white/40'}/></button>})}</div><p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">The responsible Immigration office assesses the current stamp, extension ground and evidence. Go2Thailand is not an immigration adviser.</p></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.kicker}</p><h2 className="mt-3 max-w-3xl font-display text-[2.65rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.4rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">{selected.verdict}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.facts.map((item,index)=><div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index+1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.caution}</p>{selected.action.external?<a href={selected.action.href} target="_blank" rel="noopener noreferrer" className="btn-jade mt-6">{selected.action.label}<ExternalLink size={15}/></a>:<Link href={selected.action.href} className="btn-jade mt-6">{selected.action.label}<ArrowRight size={15}/></Link>}</div></div></div></div></section>

      <section id="documents" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="The standard tourism file" title="One national base, plus local additions." description="The Immigration handbook defines the core. The responsible office can also request address evidence, extra copies or route-specific documents."/><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.12fr_0.88fr]"><div className="relative min-h-[390px] lg:min-h-[610px]"><Image src="/images/redesign/thailand-visa-extension-documents.webp" alt="Passport, TM.7 form, photograph and route to a Thailand Immigration office" fill sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover"/></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Prepare the file</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Copy the entry stamp—not only the photo page.</h2><div className="mt-7 grid gap-3">{documentItems.map(item=><div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={14}/></span><p className="pt-1 text-[11px] font-extrabold leading-5 text-white/76">{item}</p></div>)}</div><p className="mt-6 text-[10px] font-medium leading-5 text-white/52">Photograph format, copies and address evidence can vary locally. Verify the responsible office’s current list before travelling there.</p></div></div></div></div></section>

      <section id="apply" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="From deadline to new stamp" title="Four checks keep the process understandable." description="Plan around the passport stamp, the official base and the current instruction of your responsible Immigration office—not forum reports about a quiet day."/><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block"/>{[
        {icon:Stamp,title:'Read the deadline',text:'Record the admitted-until date and identify the current permission.'},
        {icon:MapPinned,title:'Find the responsible office',text:'Use the Immigration office serving the area where you reside.'},
        {icon:FileCheck2,title:'Build the correct file',text:'Take the national core and verify any local additions.'},
        {icon:CalendarCheck2,title:'Read the new stamp',text:'Check the result immediately and report an apparent error at once.'},
      ].map((step,index)=>{const Icon=step.icon;return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-mist bg-jade text-white"><Icon size={19}/></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Step 0{index+1}</p><h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>})}</div><div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]"><div className="rounded-2xl border border-saffron/25 bg-tonal p-6"><div className="flex items-start gap-4"><Smartphone size={22} className="mt-1 shrink-0 text-saffron-dark"/><div><strong className="font-display text-2xl font-semibold text-jade">e-Extension saves form time, not identity verification.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">The official online channel supports selected categories and offices. Registration, upload, payment and appointment can happen online; the applicant still appears for verification and the result.</p></div></div><div className="mt-5 flex flex-wrap gap-3"><a href={THAI_E_EXTENSION} target="_blank" rel="noopener noreferrer" className="btn-jade">Open e-Extension <ExternalLink size={15}/></a><a href={IMMIGRATION_E_EXTENSION} target="_blank" rel="noopener noreferrer" className="btn-outline">Official Immigration link <ExternalLink size={15}/></a></div></div><div className="rounded-2xl bg-jade p-6 text-white"><RefreshCw size={22} className="text-saffron-light"/><strong className="mt-5 block font-display text-2xl font-semibold">Not every category or office.</strong><p className="mt-3 text-xs font-medium leading-6 text-white/58">Confirm support before sending identity documents or money to an online platform.</p></div></div></div></section>

      <section id="border-run" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.75fr_1.25fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Two different routes</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.035em]">A border does not erase entry history.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">An extension changes the existing permission. Re-entry begins with another admission decision.</p><Link href="/visa/" className="btn-cream mt-7">Choose a route before travelling <ArrowRight size={15}/></Link></div><div className="grid gap-4 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><CalendarClock size={22} className="text-saffron-light"/><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Extension</p><h3 className="mt-2 font-display text-3xl font-semibold">Existing stamp</h3><p className="mt-3 text-xs leading-6 text-white/58">Apply inside Thailand before expiry, using the current legal ground.</p></article><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><PlaneTakeoff size={22} className="text-saffron-light"/><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">New arrival</p><h3 className="mt-2 font-display text-3xl font-semibold">New assessment</h3><p className="mt-3 text-xs leading-6 text-white/58">New TDAC, live entry rules and no guaranteed admission or stay length.</p></article><p className="sm:col-span-2 rounded-2xl border border-saffron/25 bg-saffron/10 p-5 text-xs font-extrabold leading-6">We do not recommend a “border run” as a stay strategy. A longer stay deserves a visa route matching its real purpose and duration.</p></div></div></div></div></section>

      <section className="section-divider-bottom bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow">Only after the new stamp</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade">Let bookings follow the approved stay.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/62">Extend accommodation or onward transport after the new date is clear. When uncertain, choose conditions that can be changed.</p><Link href="/visa/digital-arrival-card/" className="btn-jade mt-7">Keep the TDAC separate <ArrowRight size={15}/></Link></div><div className="grid gap-3 bg-jade p-7 text-white sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Hotel size={20} className="text-saffron-light"/><strong className="mt-4 block text-sm">Check current flexible stays</strong><span className="mt-1 block text-[10px] text-white/50">Hotel options via Trip.com</span></a><a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><MapPinned size={20} className="text-saffron-light"/><strong className="mt-4 block text-sm">Check current onward options</strong><span className="mt-1 block text-[10px] text-white/50">Train, bus and ferry via 12Go</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com and 12Go are sponsored affiliate links for accommodation and transport. They have no influence on an extension decision.</AffiliateDisclosure></div></div></div></div></section>

      <FaqSplitSection id="questions" eyebrow="Real UK extension searches" title="Thailand visa extension questions, with local variation kept visible" description="Questions combine the 27 July 2026 UK DataForSEO research with official Immigration and GOV.UK checks. Answers separate the national core, local implementation, e-Extension and a new border admission." items={faqs}/>
      <RelatedGuidesSection eyebrow="Continue the entry and stay sequence" title="Keep visa, extension and arrival registration separate" guides={[
        {title:'Thailand visa overview',description:'Choose a visa route matching the real purpose, duration and travel rhythm.',href:'/visa/',image:'/images/redesign/thailand-visa-hero.webp',imageAlt:'Thailand visa documents on a desk'},
        {title:'Thailand Tourist Visa',description:'Compare current UK visa exemption with single and multiple-entry Tourist Visas.',href:'/visa/tourist-visa/',image:'/images/redesign/thailand-tourist-visa-hero.webp',imageAlt:'Traveller planning a tourist trip to Thailand'},
        {title:'Thailand Digital Arrival Card',description:'Complete the separate free arrival registration for every new entry.',href:'/visa/digital-arrival-card/',image:'/images/redesign/thailand-tdac-hero.webp',imageAlt:'Thailand Digital Arrival Card on a phone'},
      ]}/>
      <SourceMethodSection eyebrow="Sources & method" title="The stamp and Immigration procedure outrank forum folklore." description="The owner combines 371 DataForSEO keyword records across the dedicated and Tourist Visa support clusters, 10 live UK SERPs, 86 organic results, 59 verbatim PAA questions, exact ranking/backlink checks and official Immigration/GOV.UK verification. Local requirements remain labelled as local rather than invented as one national checklist." sources={[
        {title:'Public Handbook 2.4 · Tourism purpose',creator:'Immigration Bureau · Royal Thai Police',url:IMMIGRATION_HANDBOOK,note:'Primary source for local application, passport, TM.7 with photograph, overstay acknowledgement, procedure and 1,900 THB fee.'},
        {title:'Official Thailand e-Extension',creator:'Immigration Bureau provincial E-Service',url:IMMIGRATION_E_EXTENSION,note:'Official referral to the online submission, payment and appointment channel for selected categories.'},
        {title:'Thailand entry requirements',creator:'UK Foreign, Commonwealth & Development Office',url:GOV_UK,note:'Current UK source for overstay fines and possible consequences.'},
      ]}/>
    </div>
  </>;
}
