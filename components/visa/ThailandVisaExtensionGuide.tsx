import { useMemo, useState } from 'react';
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

const IMMIGRATION_HANDBOOK = 'https://www.immigration.go.th/wp-content/uploads/2023/01/5-Public-Handbook-2.4-tourism-purpose.pdf';
const IMMIGRATION_E_EXTENSION = 'https://sukhothai.immigration.go.th/o6-2569/';
const THAI_E_EXTENSION = 'https://thaiextension.vfsevisa.com/';

const sectionNav = [
  { href: '#stempel' as const, label: 'Lees je stempel', icon: Stamp },
  { href: '#route' as const, label: 'Kies je route', icon: Route },
  { href: '#dossier' as const, label: 'Documenten', icon: FileCheck2 },
  { href: '#aanvragen' as const, label: 'Aanvragen', icon: CalendarCheck2 },
  { href: '#verschil' as const, label: 'Geen border run', icon: ShieldCheck },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
];

type ExtensionRouteKey = 'tourist' | 'dtv' | 'longstay' | 'border';

const extensionRoutes: Array<{
  key: ExtensionRouteKey;
  label: string;
  kicker: string;
  title: string;
  verdict: string;
  facts: string[];
  caution: string;
  action?: { href: string; label: string; external?: boolean };
}> = [
  {
    key: 'tourist',
    label: 'Toerist of visumvrije entree',
    kicker: 'De standaard toeristische route',
    title: 'Vraag een verlenging aan vóór de vertrekdatum in je stempel.',
    verdict: 'Voor een regulier toeristisch verblijf is een verlenging van maximaal 30 dagen gebruikelijk. De aanvraag loopt via het Immigration Office voor het gebied waar je verblijft en blijft altijd een individuele beslissing.',
    facts: ['Begin bij de admitted-until-datum in je paspoort', 'TM.7 met pasfoto en paspoort plus kopieën', 'Officieel basistarief: 1.900 THB', 'Extra lokale bewijsstukken kunnen worden gevraagd'],
    caution: 'Maximaal 30 dagen is geen automatische toezegging. De nieuwe stempel in je paspoort is pas na goedkeuring het geldige resultaat.',
    action: { href: IMMIGRATION_HANDBOOK, label: 'Open officieel handboek', external: true },
  },
  {
    key: 'dtv',
    label: 'Destination Thailand Visa',
    kicker: 'Een andere verlengingsgrond',
    title: 'Een DTV volgt niet de compacte toeristenchecklist.',
    verdict: 'De DTV-categorie vermeldt een verblijf van 180 dagen per binnenkomst met de mogelijkheid om eenmaal maximaal 180 dagen te verlengen. De onderbouwing moet blijven passen bij jouw DTV-route.',
    facts: ['Controleer je huidige DTV-stempel', 'Onderbouw dezelfde workcation-, soft-power- of gezinsgrond', 'Lokale Immigration beoordeelt de verlenging', 'Vertrek en opnieuw binnenkomen is een afzonderlijke route'],
    caution: 'Gebruik de toeristische TM.7-samenvatting op deze pagina niet als volledige DTV-checklist.',
    action: { href: '/visa/digital-nomad-visa/', label: 'Bekijk de DTV-beslisgids' },
  },
  {
    key: 'longstay',
    label: 'Non-O, O-A, studie of familie',
    kicker: 'Langverblijf vraagt een eigen dossier',
    title: 'De verblijfsgrond bepaalt het bewijs, niet de naam “verlenging”.',
    verdict: 'Pensioen, studie, familie en werk hebben afzonderlijke financiële, relationele of institutionele eisen. Gebruik daarom nooit alleen de korte toeristenlijst voor een jaarverlenging.',
    facts: ['Bevestig de precieze visum- en verblijfsgrond', 'Vraag de lokale checklist vóór je afspraak op', 'Bewijsstukken kunnen een beperkte geldigheid hebben', 'Controleer ook 90-dagenmelding en re-entryregels afzonderlijk'],
    caution: 'Een 90-dagenmelding verlengt je verblijf niet. Het is een aparte meldplicht voor bepaalde langverblijvers.',
    action: { href: '/visa/retirement-visa/', label: 'Bekijk pensioenroutes' },
  },
  {
    key: 'border',
    label: 'Ik dacht aan een border run',
    kicker: 'Geen verlenging',
    title: 'Uit- en opnieuw inreizen is een nieuwe toelatingsbeslissing.',
    verdict: 'Een grenspassage wijzigt je bestaande stempel niet. Bij terugkeer beoordeelt Immigration opnieuw of je binnenkomt, voor welke duur en onder welke voorwaarden.',
    facts: ['Geen aanvraag op je bestaande verblijf', 'Geen garantie op een nieuwe toelating', 'Reisgeschiedenis kan worden meegewogen', 'TDAC en actuele inreisvoorwaarden gelden opnieuw'],
    caution: 'Bouw je reis niet op herhaalde korte grenspassages. Kies vooraf een visumroute die bij je werkelijke verblijfsdoel past.',
    action: { href: '/visa/', label: 'Kies een passende visumroute' },
  },
];

const quickFacts = [
  { icon: CalendarClock, label: 'Toeristische route', value: 'max. 30 dagen', text: 'Gebruikelijke bovengrens voor een goedgekeurde toeristische verlenging.' },
  { icon: WalletCards, label: 'Officieel tarief', value: '1.900 THB', text: 'Basistarief in het publieke handboek van de Thaise Immigration Bureau.' },
  { icon: MapPinned, label: 'Waar aanvragen?', value: 'Lokaal Immigration', text: 'Neem contact op met het kantoor dat verantwoordelijk is voor je verblijfsgebied.' },
  { icon: FileCheck2, label: 'Basisformulier', value: 'TM.7 + foto', text: 'Met paspoort, kopieën en de verklaring over de gevolgen van overstay.' },
];

const documentItems = [
  'Origineel paspoort en een kopie van de relevante pagina’s',
  'Ingevuld aanvraagformulier TM.7 met een recente pasfoto',
  'Ondertekende acknowledgement of penalties for visa overstay',
  'Bewijs van je actuele adres of verblijf als het lokale kantoor dat vraagt',
  'Vertrek- en reisbewijs wanneer dit voor jouw route wordt gevraagd',
  '1.900 THB plus eventuele afzonderlijke online servicekosten',
];

const faqs = [
  { question: 'Wat kost een visumverlenging in Thailand?', answer: 'Het officiële publieke handboek van de Thaise Immigration Bureau noemt 1.900 THB als aanvraagtarief voor een tijdelijke verblijfsverlenging. Bij gebruik van een online dienst kunnen afzonderlijke servicekosten gelden. Betaalde kosten betekenen niet dat de aanvraag automatisch wordt goedgekeurd.' },
  { question: 'Hoe kan ik mijn verblijf in Thailand verlengen?', answer: 'Controleer eerst de uiterste vertrekdatum in je paspoort en je precieze verblijfsgrond. Neem daarna vóór die datum contact op met het Immigration Office voor je verblijfsgebied. Voor de standaard toeristische route zijn onder meer je paspoort, TM.7 met foto en het officiële tarief nodig; een kantoor kan lokaal aanvullende stukken vragen.' },
  { question: 'Hoeveel dagen kun je een toeristisch verblijf verlengen?', answer: 'Voor een regulier toeristisch verblijf is maximaal 30 dagen gebruikelijk, afhankelijk van nationaliteit, oorspronkelijke toelatingsgrond en de beoordeling door Immigration. Alleen de nieuwe stempel na goedkeuring bepaalt tot welke datum je feitelijk mag blijven.' },
  { question: 'Is het moeilijk om een visum in Thailand te verlengen?', answer: 'Een compleet standaarddossier kan overzichtelijk zijn, maar een verlenging is geen automatisch recht. Problemen ontstaan vooral door een verkeerde route, een gemiste vertrekdatum, ontbrekende kopieën, een niet passende verblijfsgrond of lokale aanvullende eisen.' },
  { question: 'Kun je een Thailand-verlenging volledig online regelen?', answer: 'Thailand biedt e-Extension voor geselecteerde categorieën. Daarmee kun je gegevens en documenten online indienen en een afspraak plannen, maar je moet nog persoonlijk verschijnen voor identiteitscontrole en het verblijfsresultaat. Controleer bovendien of jouw categorie en Immigration Office worden ondersteund.' },
  { question: 'Is een border run hetzelfde als je visum verlengen?', answer: 'Nee. Bij een verlenging blijft de bestaande toelating centraal staan en vraag je vóór de einddatum extra verblijftijd aan. Bij uit- en opnieuw inreizen vraag je om een nieuwe toelating, zonder garantie op toegang of een bepaalde duur.' },
  { question: 'Wat gebeurt er als je te laat bent met verlengen?', answer: 'Zodra je de admitted-until-datum overschrijdt, kan sprake zijn van overstay met boetes en mogelijk zwaardere gevolgen. Wacht daarom niet tot na de datum in je stempel en neem bij een probleem direct contact op met Immigration of passende juridische hulp.' },
];

export default function ThailandVisaExtensionGuide() {
  const [route, setRoute] = useState<ExtensionRouteKey>('tourist');
  const selected = useMemo(() => extensionRoutes.find((item) => item.key === route) ?? extensionRoutes[0], [route]);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'nl-visa-extension', 'flexible-stay');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, 'nl-visa-extension', 'onward-plan');

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Visum Thailand verlengen', description: 'Praktische beslisgids voor een toeristische verblijfsverlenging, TM.7, 1.900 THB, e-Extension en het verschil met een border run.', url: 'https://go2-thailand.com/nl/visa/visa-extension/', inLanguage: 'nl-NL', dateModified: '2026-07-26' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
    { '@type': 'ListItem', position: 2, name: 'Visum Thailand', item: 'https://go2-thailand.com/nl/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Visum verlengen', item: 'https://go2-thailand.com/nl/visa/visa-extension/' },
  ] };

  return (
    <>
      <SEOHead title="Visum Thailand verlengen: TM.7, kosten en stappen" description="Visum Thailand verlengen? Lees wanneer je aanvraagt, wat TM.7 en 1.900 THB betekenen, welke documenten je meeneemt en waarom een border run iets anders is." ogImage="https://go2-thailand.com/images/redesign/thailand-visa-extension-hero.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-visa-extension-hero.webp"
          imageAlt="Reiziger controleert de datum in zijn paspoort voor een verblijfsverlenging in Thailand"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visum', href: '/visa/' }, { label: 'Verlengen' }]}
          eyebrow="Stempel · TM.7 · Immigration"
          title={<>Visum Thailand verlengen.<br /><span className="text-saffron">Vóór je stempel verloopt.</span></>}
          subtitle="De admitted-until-datum is belangrijker dan je ticket."
          description="Lees eerst je huidige stempel, kies daarna de juiste verlengingsgrond en controleer de lokale bewijsset. Zo voorkom je dat een verlenging, e-Extension en nieuwe grenspassage door elkaar lopen."
          actions={[{ label: 'Kies je route', href: '#route', kind: 'primary' }, { label: 'Open Immigration-handboek', href: IMMIGRATION_HANDBOOK, kind: 'secondary', newTab: true }]}
          minHeightClassName="min-h-[760px] lg:min-h-[720px]"
          titleClassName="max-w-[850px] text-[3.35rem] leading-[0.88] !text-white sm:text-[4.7rem] lg:text-[5.2rem]"
          subtitleClassName="max-w-[650px] !text-white"
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white opacity-72"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.18)_0%,rgba(4,42,34,0.58)_46%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.96)_44%,rgba(4,42,34,0.18)_70%,rgba(4,42,34,0.02)_100%)]"
          contentClassName="max-w-[860px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/22 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Je enige harde deadline</p><strong className="mt-3 block font-display text-3xl font-semibold">Datum in je stempel</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">Niet je visumsticker, vlucht of hotelboeking bepaalt de actuele einddatum van deze binnenkomst.</p></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section id="stempel" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Eerst de huidige toelating" title="Lees de stempel alsof het je retourticket is." description="De datum naast admitted until vertelt wanneer deze binnenkomst eindigt. Begin daar en bepaal pas daarna welke aanvraag bij je situatie hoort." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map((fact) => { const Icon = fact.icon; return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>; })}</div><div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><Stamp size={23} className="mt-1 shrink-0 text-saffron-dark" /><div><strong className="font-display text-2xl font-semibold text-jade">Kijk na goedkeuring opnieuw in je paspoort.</strong><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-charcoal/64">Alleen de nieuwe immigratiestempel bevestigt je nieuwe vertrekdatum. Een betalingsbewijs of online bevestiging is niet hetzelfde.</p></div></div><a href={IMMIGRATION_HANDBOOK} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Officiële procedure <ExternalLink size={15} /></a></div></div></section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Niet ieder verblijf volgt dezelfde lijst" title="Kies je verlengingsgrond vóór je documenten verzamelt." description="Klik je situatie aan. De compacte toeristenroute, DTV, langverblijf en opnieuw binnenreizen hebben elk een andere bewijslogica." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.72fr_1.28fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Jouw huidige route</p><div className="mt-6 grid gap-2">{extensionRoutes.map((item) => { const active = route === item.key; return <button key={item.key} type="button" aria-pressed={active} onClick={() => setRoute(item.key)} className={`flex min-h-16 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-extrabold transition ${active ? 'border-saffron/60 bg-white text-jade' : 'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}>{item.label}<ArrowRight size={16} className={active ? 'text-saffron' : 'text-white/40'} /></button>; })}</div><p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">Go2Thailand is geen immigratieadviseur. Het verantwoordelijke Immigration Office beoordeelt je actuele stempel, route en bewijs.</p></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.kicker}</p><h2 className="mt-3 max-w-3xl font-display text-[2.65rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.4rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">{selected.verdict}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.facts.map((item, index) => <div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index + 1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.caution}</p>{selected.action ? selected.action.external ? <a href={selected.action.href} target="_blank" rel="noopener noreferrer" className="btn-jade mt-6">{selected.action.label}<ExternalLink size={15} /></a> : <Link href={selected.action.href} className="btn-jade mt-6">{selected.action.label}<ArrowRight size={15} /></Link> : null}</div></div></div></div></section>

        <section id="dossier" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="De standaard toeristenmap" title="Eén aanvraagmap, met ruimte voor lokale aanvullingen." description="Het officiële handboek geeft de landelijke basis. Je lokale kantoor kan daarnaast bewijs van verblijf, kopieën of routegebonden documenten vragen." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.12fr_0.88fr]"><div className="relative min-h-[390px] lg:min-h-[610px]"><Image src="/images/redesign/thailand-visa-extension-documents.webp" alt="Paspoort, aanvraagformulier, pasfoto en route naar een Immigration Office in Thailand" fill sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Neem dit mee</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Kopieer de stempel, niet alleen je fotopagina.</h2><div className="mt-7 grid gap-3">{documentItems.map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={14} /></span><p className="pt-1 text-[11px] font-extrabold leading-5 text-white/76">{item}</p></div>)}</div><p className="mt-6 text-[10px] font-medium leading-5 text-white/52">Formaat van foto’s, gewenste kopieën en adresbewijs kunnen per kantoor verschillen. Vraag de actuele lokale lijst op voordat je reist.</p></div></div></div></div></section>

        <section id="aanvragen" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Van datum naar nieuwe stempel" title="Vier controles houden de aanvraag overzichtelijk." description="Plan niet rond geruchten over een druk of rustig kantoor. Plan rond je stempel, de officiële basis en de actuele instructie van jouw lokale Immigration Office." /><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />{[
          { icon: Stamp, label: '01', title: 'Lees de einddatum', text: 'Noteer de admitted-until-datum en controleer je huidige toelatingsgrond.' },
          { icon: MapPinned, label: '02', title: 'Vind je kantoor', text: 'Gebruik het Immigration Office dat verantwoordelijk is voor je verblijfsgebied.' },
          { icon: FileCheck2, label: '03', title: 'Maak je dossier', text: 'Neem de landelijke basis mee en verifieer welke lokale aanvullingen nodig zijn.' },
          { icon: CalendarCheck2, label: '04', title: 'Controleer de stempel', text: 'Lees na de beslissing direct de nieuwe datum en meld een fout meteen.' },
        ].map((step) => { const Icon = step.icon; return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-mist bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Stap {step.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>; })}</div><div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]"><div className="rounded-2xl border border-saffron/25 bg-tonal p-6"><div className="flex items-start gap-4"><Smartphone size={22} className="mt-1 shrink-0 text-saffron-dark" /><div><strong className="font-display text-2xl font-semibold text-jade">e-Extension bespaart formuliertijd, niet de identiteitscontrole.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Het officiële online kanaal ondersteunt geselecteerde categorieën. Je uploadt documenten, betaalt en plant een afspraak; persoonlijk verschijnen voor controle en resultaat blijft nodig.</p></div></div><div className="mt-5 flex flex-wrap gap-3"><a href={THAI_E_EXTENSION} target="_blank" rel="noopener noreferrer" className="btn-jade">Open e-Extension <ExternalLink size={15} /></a><a href={IMMIGRATION_E_EXTENSION} target="_blank" rel="noopener noreferrer" className="btn-outline">Officiële verwijzing <ExternalLink size={15} /></a></div></div><div className="rounded-2xl bg-jade p-6 text-white"><RefreshCw size={22} className="text-saffron-light" /><strong className="mt-5 block font-display text-2xl font-semibold">Niet ieder kantoor of iedere categorie.</strong><p className="mt-3 text-xs font-medium leading-6 text-white/58">Controleer ondersteuning voordat je persoonsgegevens of geld aan een platform geeft.</p></div></div></div></section>

        <section id="verschil" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.75fr_1.25fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Twee totaal andere routes</p><h2 className="font-display text-[3.15rem] font-semibold leading-[0.9] tracking-[-0.035em]">Een grens wist je reisgeschiedenis niet.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">Verlengen verandert je bestaande verblijfsperiode. Opnieuw binnenreizen begint met een nieuwe toelatingsbeslissing.</p><Link href="/visa/" className="btn-cream mt-7">Kies vooraf een passende route <ArrowRight size={15} /></Link></div><div className="grid gap-4 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><CalendarClock size={22} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Verlenging</p><h3 className="mt-2 font-display text-3xl font-semibold">Bestaande stempel</h3><p className="mt-3 text-xs leading-6 text-white/58">Aanvragen in Thailand vóór de einddatum, op basis van je huidige verblijfsgrond.</p></article><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><PlaneTakeoff size={22} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Nieuwe binnenkomst</p><h3 className="mt-2 font-display text-3xl font-semibold">Nieuwe beoordeling</h3><p className="mt-3 text-xs leading-6 text-white/58">Nieuwe inreiscontrole, nieuwe TDAC en geen garantie op toegang of verblijfsduur.</p></article><p className="sm:col-span-2 rounded-2xl border border-saffron/25 bg-saffron/10 p-5 text-xs font-extrabold leading-6">We raden geen “border run” aan als verblijfsstrategie. Bij een langere reis hoort een route die je werkelijke doel en duur dekt.</p></div></div></div></div></section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow">Pas na je nieuwe datum</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade">Laat je boekingen je goedgekeurde verblijf volgen.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/62">Verleng accommodatie of doorreis pas wanneer de nieuwe stempel klopt. Kies bij onzekerheid voor voorwaarden die je kunt aanpassen.</p><Link href="/visa/digital-arrival-card/" className="btn-jade mt-7">Bekijk ook de TDAC <ArrowRight size={15} /></Link></div><div className="grid gap-3 bg-jade p-7 text-white sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Hotel size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Flexibel verblijf vergelijken</strong><span className="mt-1 block text-[10px] text-white/50">Hotels via Trip.com</span></a><a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><MapPinned size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Doorreis opnieuw plannen</strong><span className="mt-1 block text-[10px] text-white/50">Trein, bus en ferry via 12Go</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com en 12Go zijn affiliate-links voor verblijf en vervoer. Ze hebben geen invloed op een verlengingsbesluit.</AffiliateDisclosure></div></div></div></div></section>

        <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen over verlengen" title="Veelgestelde vragen over een visumverlenging in Thailand" description="De hoofdvragen komen uit de actuele Nederlandse DataForSEO-SERP. Antwoorden scheiden de officiële basis, lokale uitvoering, e-Extension en een nieuwe grenspassage bewust van elkaar." items={faqs} />

        <RelatedGuidesSection eyebrow="Verder met je inreis- en verblijfsroute" title="Houd visum, verlenging en aankomstkaart uit elkaar" guides={[
          { title: 'Visum Thailand', description: 'Kies een route die bij je echte verblijfsduur en reisritme past.', href: '/visa/', image: '/images/redesign/thailand-visa-hero.webp', imageAlt: 'Thaise visumdocumenten op een bureau' },
          { title: 'Toeristenvisum Thailand', description: 'Vergelijk visumvrij reizen met single en multiple entry.', href: '/visa/tourist-visa/', image: '/images/redesign/thailand-tourist-visa-hero.webp', imageAlt: 'Reiziger plant een toeristische reis naar Thailand' },
          { title: 'TDAC invullen', description: 'Regel de gratis digitale aankomstkaart voor iedere nieuwe binnenkomst.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-tdac-hero.webp', imageAlt: 'Digitale aankomstkaart Thailand' },
        ]} />

        <SourceMethodSection eyebrow="Bronnen & onderzoek" title="De stempel en officiële immigratieprocedure gaan vóór reisforumregels." description="DataForSEO-onderzoek voor Nederland omvatte 87 clusterkeywords, een live SERP met vijf echte PAA-vragen, concurrentieparses en ranking- en backlinkchecks. De uiteindelijke procedure, basisdocumenten, het tarief en de rol van e-Extension zijn gecontroleerd bij Thaise Immigration-bronnen." sources={[
          { title: 'Public Handbook 2.4 · Tourism purpose', creator: 'Immigration Bureau · Royal Thai Police', url: IMMIGRATION_HANDBOOK, note: 'Primaire bron voor lokale aanvraag, paspoort, TM.7 met foto, overstayverklaring, procedure en het tarief van 1.900 THB.' },
          { title: 'Official Thailand e-Extension', creator: 'Immigration Bureau via officiële provinciale E-Service', url: IMMIGRATION_E_EXTENSION, note: 'Bevestigt het officiële VFS-kanaal voor online indiening, betaling en afspraak bij geselecteerde categorieën.' },
          { title: 'Criteria for extension of stay', creator: 'Royal Thai Police · Order 327/2557 en aanvullingen', url: 'https://www.immigration.go.th/?page_id=1666', note: 'Juridische grondslag voor de afzonderlijke verlengingsredenen en individuele beoordeling.' },
        ]} />
      </div>
    </>
  );
}
