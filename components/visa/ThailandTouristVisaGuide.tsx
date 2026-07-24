import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeEuro,
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
  TicketsPlane,
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

const THAI_E_VISA = 'https://www.thaievisa.go.th/';
const EMBASSY_CATEGORIES = 'https://hague.thaiembassy.org/th/publicservice/e-visa-categories-required-documents/';
const NEDERLAND_WERELDWIJD = 'https://www.nederlandwereldwijd.nl/reisadvies/thailand';

const sectionNav = [
  { href: '#nodig' as const, label: 'Heb je het nodig?', icon: ShieldCheck },
  { href: '#route' as const, label: 'Kies je route', icon: Route },
  { href: '#klokken' as const, label: 'Duur', icon: CalendarClock },
  { href: '#bewijs' as const, label: 'Bewijs', icon: FileCheck2 },
  { href: '#aanvragen' as const, label: 'Aanvragen', icon: PlaneTakeoff },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
];

type TouristRouteKey = 'exemption' | 'single' | 'multiple';

const touristRoutes: Array<{
  key: TouristRouteKey;
  label: string;
  kicker: string;
  title: string;
  verdict: string;
  facts: string[];
  caution: string;
  action?: { href: string; label: string; external?: boolean };
}> = [
  {
    key: 'exemption',
    label: 'Eén vakantie tot 60 dagen',
    kicker: 'Nu: visumvrije route voor NL-paspoort',
    title: 'Een toeristenvisum aanvragen is momenteel meestal niet nodig.',
    verdict: 'NederlandWereldwijd en de Thaise ambassade vermelden bij onze controle nog maximaal 60 dagen visumvrij voor Nederlandse paspoorthouders. Een aangekondigde terugkeer naar 30 dagen is pas relevant zodra de formele ingangsdatum vaststaat.',
    facts: ['Geen e-Visa-aanvraag vooraf', 'Wel paspoort, bewijs van vertrek en eerste adres', 'Voor iedere binnenkomst een nieuwe TDAC', 'Controleer de live regel opnieuw vóór boeken én vertrek'],
    caution: 'Visumvrij is geen visum en geen toelatingsgarantie. De immigratieambtenaar bepaalt je feitelijke toelating en uiterste vertrekdatum.',
    action: { href: '/visa/', label: 'Bekijk de actuele visumstatus' },
  },
  {
    key: 'single',
    label: 'Eén langere toeristische reis',
    kicker: 'TR1 · single entry',
    title: 'Eén entree, een visumgeldigheid van drie maanden en 60 dagen verblijf.',
    verdict: 'De single-entry TR1 past bij één vooraf geplande toeristische binnenkomst. Hij kan relevant zijn wanneer je reis buiten de actuele vrijstelling valt of wanneer de aangekondigde 30-dagenregel formeel ingaat.',
    facts: ['€35 aanvraagkosten in Den Haag', 'Visum drie maanden geldig voor één binnenkomst', 'Verblijfsperiode: 60 dagen', 'Minimaal 20.000 THB financieel bewijs'],
    caution: 'Een mogelijke verblijfsverlenging is een aparte aanvraag bij Immigration en nooit automatisch. Bouw een reis van 61–90 dagen dus niet op een onbewezen verlenging.',
    action: { href: THAI_E_VISA, label: 'Open Thai e-Visa', external: true },
  },
  {
    key: 'multiple',
    label: 'Meerdere aankomsten in 6 maanden',
    kicker: 'TR1 · multiple entry',
    title: 'De multiple-entry TR volgt je reisritme, niet één onafgebroken verblijf.',
    verdict: 'Deze route is bedoeld voor meerdere toeristische binnenkomsten tijdens de zes maanden waarin het visum geldig is. Iedere binnenkomst heeft volgens de officiële categoriechecklist een verblijfsperiode van 60 dagen.',
    facts: ['€175 aanvraagkosten in Den Haag', 'Visum zes maanden geldig voor meerdere binnenkomsten', 'Per binnenkomst: 60 dagen verblijf', 'Travel Plan Form plus de gemeenschappelijke bewijsset'],
    caution: 'Zes maanden visumgeldigheid is niet hetzelfde als zes maanden onafgebroken in Thailand. Controleer iedere nieuwe immigratiestempel afzonderlijk.',
    action: { href: THAI_E_VISA, label: 'Open Thai e-Visa', external: true },
  },
];

const quickFacts = [
  { icon: PlaneTakeoff, label: 'Tourist TR1', value: '60 dagen', text: 'Officiële verblijfsperiode voor toerisme en vrije tijd.' },
  { icon: CalendarClock, label: 'Visumgeldigheid', value: '3 of 6 maanden', text: 'Single entry is drie maanden; multiple entry zes maanden geldig.' },
  { icon: WalletCards, label: 'Financieel bewijs', value: '20.000 THB', text: 'Minimum in de officiële categoriechecklist, bijvoorbeeld via bankafschriften.' },
  { icon: BadgeEuro, label: 'Haagse tarieven', value: '€35 / €175', text: 'Single respectievelijk multiple entry; kosten zijn niet terugbetaalbaar.' },
];

const evidenceItems = [
  'Biodatapagina van paspoort of reisdocument',
  'Recente pasfoto van maximaal zes maanden oud',
  'Document dat je huidige locatie in Nederland aantoont',
  'Bevestiging van je reisboeking',
  'Hotelboeking of uitnodiging met verblijfadres in Thailand',
  'Financieel bewijs van minimaal 20.000 THB',
];

const faqs = [
  { question: 'Heb je een toeristenvisum nodig voor Thailand?', answer: 'Bij de broncontrole op 24 juli 2026 vermelden NederlandWereldwijd en de Thaise ambassade in Den Haag voor een Nederlands paspoort nog maximaal 60 dagen visumvrije toegang. Voor een langere reis, meerdere binnenkomsten of na een formele regelwijziging kan een Tourist Visa passend zijn. Controleer de live regel opnieuw vlak voor vertrek.' },
  { question: 'Hoe lang mag je zonder visum in Thailand verblijven?', answer: 'De actuele Nederlandse overheidsbron vermeldt bij onze controle maximaal 60 dagen voor Nederlandse paspoorthouders. Thailand heeft een terugkeer naar 30 dagen aangekondigd, maar de formele publicatie en ingangsdatum zijn bepalend. De stempel bij aankomst bevat altijd je concrete uiterste vertrekdatum.' },
  { question: 'Wat kost een toeristenvisum voor Thailand vanuit Nederland?', answer: 'De officiële tarieflijst van de Thaise ambassade in Den Haag noemt €35 voor een single-entry Tourist Visa van drie maanden en €175 voor een multiple-entry Tourist Visa van zes maanden. De aanvraagkosten zijn volgens de algemene voorwaarden niet terugbetaalbaar.' },
  { question: 'Hoe lang is een Thailand Tourist Visa geldig?', answer: 'Voor TR1 toont de officiële categoriechecklist een visumgeldigheid van drie maanden voor single entry en zes maanden voor multiple entry. Dat is het venster waarin je het visum gebruikt. De toegestane verblijfsperiode is 60 dagen per binnenkomst en staat los van die geldigheidsklok.' },
  { question: 'Hoe lang van tevoren moet je een Thailand e-Visa aanvragen?', answer: 'De Thaise ambassade in Den Haag noemt voor de meeste complete aanvragen doorgaans 5–10 werkdagen en adviseert minimaal één maand vóór vertrek aan te vragen, maar niet langer dan twee maanden vooraf. Vakanties, aanvullende stukken of een interview kunnen extra tijd vragen.' },
  { question: 'Moet je naast een toeristenvisum ook een TDAC invullen?', answer: 'Ja. Een TDAC is een digitale aankomstkaart en geen visum. Je vult hem voor iedere binnenkomst opnieuw in binnen drie dagen vóór aankomst, waarbij de aankomstdag meetelt. Gebruik uitsluitend de officiële gratis TDAC-website.' },
  { question: 'Kun je een toeristenvisum met 30 dagen verlengen?', answer: 'Een verlenging kan in veel toeristische situaties worden aangevraagd bij een Immigration Office, maar is geen automatisch recht en hoort bij een aparte immigratieprocedure. Controleer de actuele voorwaarden, vereiste documenten en je bestaande stempel. De detailpagina over verlengen bezit die specifieke intentie.' },
];

export default function ThailandTouristVisaGuide() {
  const [route, setRoute] = useState<TouristRouteKey>('exemption');
  const selected = useMemo(() => touristRoutes.find((item) => item.key === route) ?? touristRoutes[0], [route]);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'nl-tourist-visa', 'first-stay-address');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, 'nl-tourist-visa', 'onward-proof');

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Toeristenvisum Thailand vanuit Nederland', description: 'Beslis- en aanvraaggids voor visumvrij reizen, single-entry en multiple-entry Tourist Visa Thailand.', url: 'https://go2-thailand.com/nl/visa/tourist-visa/', inLanguage: 'nl-NL', dateModified: '2026-07-24' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
    { '@type': 'ListItem', position: 2, name: 'Visum Thailand', item: 'https://go2-thailand.com/nl/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Toeristenvisum Thailand', item: 'https://go2-thailand.com/nl/visa/tourist-visa/' },
  ] };

  return (
    <>
      <SEOHead title="Toeristenvisum Thailand: single of multiple entry?" description="Toeristenvisum Thailand nodig? Vergelijk visumvrij reizen, single en multiple entry, 60 dagen verblijf, €35/€175 kosten en de officiële bewijsset." ogImage="https://go2-thailand.com/images/redesign/thailand-tourist-visa-hero.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-tourist-visa-hero.webp"
          imageAlt="Reiziger controleert paspoort en reisplan voor een toeristische reis naar Thailand"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visum', href: '/visa/' }, { label: 'Toeristenvisum' }]}
          eyebrow="Visumvrij · single · multiple entry"
          title={<>Toeristenvisum Thailand.<br /><span className="text-saffron">Heb je het nodig?</span></>}
          subtitle="Begin niet bij het formulier. Begin bij jouw reisritme."
          description="Vergelijk de actuele visumvrije route met één langere reis en meerdere aankomsten. Zo vraag je alleen een e-Visa aan als het echt bij je plan past."
          actions={[{ label: 'Doe de routecheck', href: '#route', kind: 'primary' }, { label: 'Open officiële e-Visa', href: THAI_E_VISA, kind: 'secondary', newTab: true }]}
          minHeightClassName="min-h-[750px] lg:min-h-[710px]"
          titleClassName="max-w-[820px] text-[3.45rem] leading-[0.88] !text-white sm:text-[4.75rem] lg:text-[5.35rem]"
          subtitleClassName="max-w-[650px] !text-white"
          descriptionClassName="mt-4 max-w-[570px] text-sm leading-7 !text-white opacity-75"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.22)_0%,rgba(4,42,34,0.56)_43%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.95)_43%,rgba(4,42,34,0.15)_69%,rgba(4,42,34,0.01)_100%)]"
          contentClassName="max-w-[840px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[320px] rounded-2xl border border-white/25 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Actuele status · 24 juli 2026</p><strong className="mt-3 block font-display text-3xl font-semibold">Nu: tot 60 dagen visumvrij</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">30 dagen is aangekondigd, maar de formele ingangsdatum blijft leidend. Controleer opnieuw vóór vertrek.</p></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section id="nodig" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Eerst het verschil" title="Een visumvrije stempel en een Tourist Visa zijn niet hetzelfde." description="De brede visumhub bewaakt de actuele vrijstelling. Deze pagina helpt je beslissen wanneer een TR1-aanvraag echt iets toevoegt." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map((fact) => { const Icon = fact.icon; return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>; })}</div><div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><RefreshCw size={22} className="mt-1 shrink-0 text-saffron-dark" /><div><strong className="font-display text-2xl font-semibold text-jade">De 60/30-dagenregel kan veranderen.</strong><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-charcoal/64">We publiceren geen zelfbedachte ingangsdatum. NederlandWereldwijd en de formele Thaise publicatie blijven leidend.</p></div></div><a href={NEDERLAND_WERELDWIJD} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Controleer live <ExternalLink size={15} /></a></div></div></section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Eén reis of meerdere entrees" title="Kies de route die jouw tickets al vertellen." description="Een single-entryvisum, multiple-entryvisum en visumvrij reizen lossen drie verschillende reispatronen op." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.72fr_1.28fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Jouw reispatroon</p><div className="mt-6 grid gap-2">{touristRoutes.map((item) => { const active = route === item.key; return <button key={item.key} type="button" aria-pressed={active} onClick={() => setRoute(item.key)} className={`flex min-h-16 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-extrabold transition ${active ? 'border-saffron/60 bg-white text-jade' : 'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}>{item.label}<ArrowRight size={16} className={active ? 'text-saffron' : 'text-white/40'} /></button>; })}</div><p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">Go2Thailand is geen visumdienst. Een aanvraag en iedere binnenkomst blijven onder voorbehoud van officiële beoordeling.</p></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.kicker}</p><h2 className="mt-3 max-w-3xl font-display text-[2.65rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.4rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">{selected.verdict}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.facts.map((item, index) => <div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index + 1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.caution}</p>{selected.action ? selected.action.external ? <a href={selected.action.href} target="_blank" rel="noopener noreferrer" className="btn-jade mt-6">{selected.action.label}<ExternalLink size={15} /></a> : <Link href={selected.action.href} className="btn-jade mt-6">{selected.action.label}<ArrowRight size={15} /></Link> : null}</div></div></div></div></section>

        <section id="klokken" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><SectionHeading eyebrow="Geldigheid versus verblijf" title="Het visumvenster en je verblijfsklok lopen niet gelijk." description="De geldigheid vertelt wanneer je het visum kunt gebruiken. De immigratiestempel vertelt tot wanneer je na die binnenkomst mag blijven." /><div className="rounded-[30px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10"><div className="grid gap-4 sm:grid-cols-2"><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><div className="flex items-center justify-between"><TicketsPlane size={22} className="text-saffron-light" /><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Single entry</span></div><strong className="mt-5 block font-display text-3xl">3 maanden geldig</strong><div className="mt-5 flex items-center gap-3"><span className="rounded-lg bg-saffron px-3 py-2 text-xs font-extrabold text-jade">1 entree</span><ArrowRight size={15} className="text-saffron-light" /><span className="text-xs font-extrabold">60 dagen verblijf</span></div></article><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><div className="flex items-center justify-between"><Route size={22} className="text-saffron-light" /><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Multiple entry</span></div><strong className="mt-5 block font-display text-3xl">6 maanden geldig</strong><div className="mt-5 flex items-center gap-3"><span className="rounded-lg bg-saffron px-3 py-2 text-xs font-extrabold text-jade">Meerdere</span><ArrowRight size={15} className="text-saffron-light" /><span className="text-xs font-extrabold">60 dagen per entry</span></div></article></div><p className="mt-5 rounded-2xl border border-saffron/30 bg-saffron/10 p-5 text-xs font-extrabold leading-6">Kijk na iedere aankomst naar de datum in je nieuwe stempel. Reken nooit alleen vanaf de afgiftedatum van het visum.</p></div></div></section>

        <section id="bewijs" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Eén basisdossier" title="Je route verandert. De bewijslogica blijft herkenbaar." description="De officiële TR1-checklist combineert identiteit, huidige locatie, reisplan, verblijf en financiën tot één samenhangend dossier." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.08fr_0.92fr]"><div className="relative min-h-[430px] lg:min-h-[650px]"><Image src="/images/redesign/thailand-tourist-visa-routes.webp" alt="Reisdocumenten voor één Thailandreis en een multiple-entryroute" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">TR1 · gemeenschappelijke set</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Zes stukken moeten hetzelfde reisverhaal vertellen.</h2><div className="mt-7 grid gap-3">{evidenceItems.map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={13} /></span><span className="text-xs font-extrabold leading-5">{item}</span></div>)}</div><p className="mt-5 text-[10px] font-medium leading-5 text-white/55">Voor multiple entry verwijst de Haagse categoriepagina daarnaast naar een Travel Plan Form. Controleer in e-Visa altijd de live uploadvelden.</p><a href={EMBASSY_CATEGORIES} target="_blank" rel="noopener noreferrer" className="btn-cream mt-6">Open officiële checklist <ExternalLink size={15} /></a></div></div></div></div></section>

        <section id="aanvragen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Van reisritme naar e-Visa" title="Vier stappen zonder bemiddelaarstaal." description="De ambassade behandelt e-Visa-aanvragen alleen wanneer je gedurende het hele proces in Nederland bent." /><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />{[
          { icon: Route, label: '01', title: 'Kies single of multiple', text: 'Laat duur en aantal binnenkomsten leidend zijn, niet de naam die het ruimst klinkt.' },
          { icon: FileCheck2, label: '02', title: 'Bouw één dossier', text: 'Vlucht, verblijf, locatie en bankbewijs moeten samen jouw echte reisplan onderbouwen.' },
          { icon: Smartphone, label: '03', title: 'Vraag online aan', text: 'Upload via Thai e-Visa en blijf tijdens de behandeling in Nederland.' },
          { icon: PlaneTakeoff, label: '04', title: 'Maak je aankomstmap', text: 'Bewaar e-Visa, paspoort, TDAC, boeking en bewijs van vertrek samen.' },
        ].map((step) => { const Icon = step.icon; return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Stap {step.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>; })}</div><div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-saffron/25 bg-tonal p-6"><strong className="font-display text-2xl font-semibold text-jade">Plan één maand vooruit, niet een halfjaar blind.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">De ambassade noemt doorgaans 5–10 werkdagen voor complete aanvragen en adviseert minimaal één maand, maar niet langer dan twee maanden vóór vertrek aan te vragen. Aanvullende stukken kunnen de doorlooptijd verlengen.</p></div><a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-jade p-6 text-white"><span><strong className="block text-sm">Start via Thai e-Visa</strong><span className="mt-1 block text-[10px] text-white/52">Officieel aanvraagplatform</span></span><ExternalLink size={18} className="text-saffron-light" /></a></div></div></section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Pas na je visumkeuze</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.035em]">Maak verblijf en vertrekbewijs concreet.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">De officiële bewijsset vraagt een reisboeking en accommodatie. Boek alleen voorwaarden die passen bij de onzekerheid van je aanvraag.</p><Link href="/visa/digital-arrival-card/" className="btn-cream mt-7">Regel daarna je TDAC <ArrowRight size={15} /></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Hotel size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Eerste adres vergelijken</strong><span className="mt-1 block text-[10px] text-white/50">Flexibele verblijven via Trip.com</span></a><a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><MapPinned size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Doorreis plannen</strong><span className="mt-1 block text-[10px] text-white/50">Trein, bus en ferry via 12Go</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com en 12Go zijn affiliate-links voor je echte verblijf en vervoer. Ze hebben geen invloed op visumgoedkeuring of toelating.</AffiliateDisclosure></div></div></div></div></section>

        <FaqSplitSection id="vragen" eyebrow="Echte toeristenvisum-zoekvragen" title="Veelgestelde vragen over een Thailand Tourist Visa" description="De hoofdvragen komen uit de actuele Nederlandse DataForSEO-SERP. Antwoorden scheiden de live visumvrije regel, een vooraf aangevraagd TR1 en de aparte TDAC bewust van elkaar." items={faqs} />

        <RelatedGuidesSection eyebrow="Verder met je inreisroute" title="Houd actuele regel, aankomst en verlenging uit elkaar" guides={[
          { title: 'Visum Thailand', description: 'Controleer wat op jouw vertrekdatum formeel geldt voor Nederlandse paspoorthouders.', href: '/visa/', image: '/images/redesign/thailand-visa-hero.webp', imageAlt: 'Visum- en inreisdocumenten voor Thailand' },
          { title: 'TDAC invullen', description: 'Bereken het gratis driedagenvenster en verzamel je aankomstgegevens.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-tdac-hero.webp', imageAlt: 'Digitale aankomstkaart Thailand' },
          { title: 'Verblijf verlengen', description: 'Lees de aparte immigratieroute zonder een verlenging als automatisch recht te behandelen.', href: '/visa/visa-extension/', image: '/images/redesign/thailand-tourist-visa-routes.webp', imageAlt: 'Thailandreis met meerdere momenten en documenten' },
        ]} />

        <SourceMethodSection eyebrow="Bronnen & onderzoek" title="Een toeristenvisum is alleen nuttig als het beter past dan de live vrijstelling." description="DataForSEO-onderzoek voor Nederland omvatte 83 clusterkeywords, een live SERP met zes echte PAA-vragen, drie volledig geparseerde topresultaten en ranking- en backlinkchecks. De uiteindelijke eisen, duur en tarieven zijn gecontroleerd bij de Thaise ambassade en de actuele Nederlandse reisbron." sources={[
          { title: 'E-Visa Categories and Required Documents', creator: 'Royal Thai Embassy The Hague · checklist 18 juni 2025', url: EMBASSY_CATEGORIES, note: 'Primaire bron voor TR1, 60 dagen verblijf, single/multiple geldigheid, gemeenschappelijke bewijsset en Travel Plan Form.' },
          { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd · live reisbron', url: NEDERLAND_WERELDWIJD, note: 'Actuele Nederlandse bron voor de visumvrije route, paspoortvoorwaarden en bewijs van vertrek.' },
          { title: 'E-Visa General Conditions', creator: 'Royal Thai Embassy The Hague', url: 'https://hague.thaiembassy.org/th/publicservice/e-visa-general-conditions/', note: 'Primaire bron voor aanvraag vanuit Nederland, niet-terugbetaalbare kosten, indicatieve behandeling en aanvraagmoment.' },
          { title: 'Revised Fees for Consular Services', creator: 'Royal Thai Embassy The Hague', url: 'https://hague.thaiembassy.org/th/content/%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AD%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%A5-2567', note: 'Officiële Nederlandse tarieven: €35 single-entry Tourist Visa en €175 multiple entry.' },
        ]} />
      </main>
    </>
  );
}
