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
  HeartPulse,
  Home,
  Landmark,
  PlaneTakeoff,
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
const EMBASSY_CATEGORIES = 'https://hague.thaiembassy.org/th/publicservice/e-visa-categories-required-documents/';

const sectionNav = [
  { href: '#kort' as const, label: 'Kort antwoord', icon: ShieldCheck },
  { href: '#route' as const, label: 'Kies je route', icon: Route },
  { href: '#bewijs' as const, label: 'Bewijs', icon: FileCheck2 },
  { href: '#aanvragen' as const, label: 'Aanvragen', icon: PlaneTakeoff },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
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
    label: 'Tot 90 dagen',
    duration: 'Single entry · visum 3 maanden geldig',
    fee: '€70 in Den Haag',
    title: 'De compacte pensioenroute voor een verblijf tot 90 dagen.',
    intro: 'De officiële O1-3-categorie is voor pensionado’s van 50 jaar of ouder met staatspensioen die niet langer dan 90 dagen willen blijven. Dit is niet automatisch een jaarverblijf.',
    proof: ['Paspoort-biodatapagina en recente foto', 'Bewijs dat je je in Nederland bevindt', 'Maandinkomen van minimaal 65.000 THB óf een saldo van 800.000 THB', 'Onderbouwing dat je 50+ bent en als pensionado aanvraagt'],
    note: 'Wil je later een verblijfsverlenging in Thailand, behandel die als een afzonderlijke immigratieprocedure met actuele lokale voorwaarden.',
  },
  {
    key: 'o-a',
    short: 'O-A',
    label: 'Tot 1 jaar',
    duration: 'Multiple entry · 1 jaar geldig',
    fee: '€175 in Den Haag',
    title: 'Een jaar lang verblijf vraagt een zwaarder, gelegaliseerd dossier.',
    intro: 'O-A is de long-stayroute voor 50-plussers zonder werkintentie. Naast financiën vraagt de officiële Haagse checklist medische, verzekerings- en justitiële bewijsstukken.',
    proof: ['Permanent-verblijfsbewijs, waar vereist gelegaliseerd', '65.000 THB maandinkomen óf 800.000 THB saldo', 'Medische verklaring en strafregisterverklaring, maximaal drie maanden oud en gelegaliseerd', 'Verzekeringscertificaat en minimaal USD 100.000 / 3.000.000 THB ziektekostendekking'],
    note: 'Plan legalisatie en verzekering vóór de digitale aanvraag. Een compleet document is pas bruikbaar als vorm, geldigheid en legalisatie ook kloppen.',
  },
  {
    key: 'o-x',
    short: 'O-X',
    label: '5 + 5 jaar',
    duration: 'Multiple entry · eerste visumperiode 5 jaar',
    fee: '€350 in Den Haag',
    title: 'De langste route koppelt een grote financiële buffer aan extra controle.',
    intro: 'O-X is voor 50-plussers uit een beperkte groep landen, waaronder Nederland. De route wordt vaak als tienjaarsvisum omschreven, maar de ambassade toont een eerste multiple-entrygeldigheid van vijf jaar binnen het 5+5-traject.',
    proof: ['Thaise vaste deposito van minimaal 3.000.000 THB', 'Óf 1.800.000 THB deposito plus minimaal 1.200.000 THB jaarinkomen', 'Medische verklaring, verzekeringsbewijs, strafregisterverklaring en biografie', 'Thaise zorgverzekering met minimaal 40.000 THB ambulant en 400.000 THB opname'],
    note: 'O-X is geen “duurdere versie” die automatisch beter is. De banklocatie, nationaliteit en documentlast maken het een heel specifieke route.',
  },
];

const quickFacts = [
  { icon: CalendarClock, label: 'Minimumleeftijd', value: '50 jaar', text: 'Geldt voor de pensioenroutes op deze pagina; leeftijd alleen is niet voldoende.' },
  { icon: WalletCards, label: 'Non-O / O-A', value: '65k óf 800k THB', text: 'Maandinkomen óf saldo volgens de officiële Haagse categoriechecklist.' },
  { icon: HeartPulse, label: 'O-A', value: '3 mln THB dekking', text: 'De actuele checklist noemt minimaal USD 100.000 of 3.000.000 THB.' },
  { icon: BadgeEuro, label: 'Aanvraagkosten', value: '€70–€350', text: 'Afhankelijk van Non-O, O-A of O-X; betaalde kosten zijn niet terugbetaalbaar.' },
];

const faqs = [
  { question: 'Hoeveel geld heb je nodig voor een retirement visa in Thailand?', answer: 'Voor de Haagse Non-O-pensioenroute en O-A noemt de officiële checklist een maandinkomen van minimaal 65.000 THB óf een actueel saldo van 800.000 THB. O-X gebruikt aanzienlijk hogere voorwaarden: minimaal 3.000.000 THB op een vaste Thaise deposito, of 1.800.000 THB plus minimaal 1.200.000 THB jaarinkomen. Controleer altijd de exacte route en actuele bewijsregels.' },
  { question: 'Wat kost een Thais pensioenvisum in Nederland?', answer: 'De officiële tarieflijst van de Thaise ambassade in Den Haag vermeldt €70 voor een single-entry Non-Immigrant-visum van drie maanden, €175 voor de éénjarige multiple-entry O-A en €350 voor de vijfjarige multiple-entry O-X. Dit zijn aanvraagkosten; verzekering, legalisatie en bewijsstukken kunnen extra kosten geven.' },
  { question: 'Is een retirement visa Thailand moeilijk aan te vragen?', answer: 'Non-O heeft volgens de officiële categoriechecklist een beperkter dossier dan O-A of O-X. Bij O-A en O-X maken vooral legalisatie, medische verklaring, strafregisterverklaring, verzekering en financiële bewijsvoering de voorbereiding zwaarder. Moeilijk is dus minder precies dan: hoeveel verschillende bewijsstromen moet jouw gekozen route samenbrengen?' },
  { question: 'Is €100.000 genoeg om in Thailand met pensioen te gaan?', answer: 'Een spaarsaldo zegt niet automatisch of je duurzaam in Thailand kunt wonen. Voor visumgeschiktheid telt de officiële drempel van jouw route; voor je leefplan tellen daarnaast woning, zorgverzekering, inflatie, wisselkoers, belastingen, noodbuffer en gewenste levensstijl. Maak die twee berekeningen los van elkaar.' },
  { question: 'Mag je werken met een retirement visa?', answer: 'De officiële O-A-omschrijving noemt verblijf zonder de intentie om te werken. Behandel een pensioenroute daarom niet als werkvergunning. Voor betaalde werkzaamheden of een andere feitelijke situatie kunnen andere visa en werkregels gelden; laat je situatie officieel beoordelen.' },
  { question: 'Moet je iedere 90 dagen Thailand verlaten?', answer: 'Een 90-dagenadresmelding en de duur van je toegestane verblijf zijn verschillende zaken. Bij een langer toegestaan verblijf kan een meldplicht gelden zonder dat je daardoor automatisch moet uitreizen. Kijk naar je concrete immigratiestempel, verblijfsstatus en actuele Immigration Bureau-regels.' },
];

export default function ThailandRetirementVisaGuide() {
  const [route, setRoute] = useState<RetirementRouteKey>('non-o');
  const selected = useMemo(() => routes.find((item) => item.key === route) ?? routes[0], [route]);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'nl-retirement-visa', 'first-month-base');
  const esimHref = withPlacementSubId(SAILY_GENERIC, 'nl-retirement-visa', 'arrival-connectivity');

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Pensioenvisum Thailand: Non-O, O-A en O-X vergelijken', description: 'Nederlandse beslisgids voor de drie belangrijkste Thaise pensioenvisumroutes, met officiële eisen, kosten en bewijsstukken.', url: 'https://go2-thailand.com/nl/visa/retirement-visa/', inLanguage: 'nl-NL', dateModified: '2026-07-24' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
    { '@type': 'ListItem', position: 2, name: 'Visum Thailand', item: 'https://go2-thailand.com/nl/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Pensioenvisum Thailand', item: 'https://go2-thailand.com/nl/visa/retirement-visa/' },
  ] };

  return (
    <>
      <SEOHead title="Pensioenvisum Thailand: Non-O, O-A & O-X | Go2Thailand" description="Pensioenvisum Thailand vergelijken? Bekijk Non-O, O-A en O-X, de 50+ eis, 800.000 THB bewijs, verzekering, kosten en aanvraag vanuit Nederland." ogImage="https://go2-thailand.com/images/redesign/thailand-retirement-visa-hero.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-retirement-visa-hero.webp"
          imageAlt="Nederlands stel bereidt op een rustige Thaise veranda een lang verblijf voor"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visum', href: '/visa/' }, { label: 'Pensioenvisum' }]}
          eyebrow="Non-O · O-A · O-X"
          title={<>Pensioen in Thailand.<br /><span className="text-saffron">Welke route past?</span></>}
          subtitle="Niet één pensioenvisum, maar drie heel verschillende dossiers."
          description="Vergelijk eerst verblijfsduur, financiële drempel en documentlast. Kies daarna pas het aanvraagpad dat bij jouw plan past."
          actions={[{ label: 'Vergelijk de routes', href: '#route', kind: 'primary' }, { label: 'Open Thai e-Visa', href: THAI_E_VISA, kind: 'secondary', newTab: true }]}
          minHeightClassName="min-h-[735px] lg:min-h-[710px]"
          titleClassName="max-w-[760px] text-[3.55rem] leading-[0.88] !text-white sm:text-[4.85rem] lg:text-[5.55rem]"
          subtitleClassName="max-w-[650px] !text-white"
          descriptionClassName="mt-4 max-w-[560px] text-sm leading-7 !text-white opacity-75"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.2)_0%,rgba(4,42,34,0.56)_42%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.94)_42%,rgba(4,42,34,0.14)_68%,rgba(4,42,34,0.01)_100%)]"
          contentClassName="max-w-[790px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[312px] rounded-2xl border border-white/25 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Begin bij de duur</p><div className="mt-4 grid grid-cols-3 gap-2 text-center">{['90 dgn', '1 jaar', '5+5'].map((value) => <strong key={value} className="rounded-xl border border-white/12 bg-white/[0.06] py-4 font-display text-xl">{value}</strong>)}</div><p className="mt-4 text-[10px] font-semibold leading-5 text-white/58">De langste route is niet automatisch de eenvoudigste of beste route.</p></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Eerst het kader" title="Drie routes. Drie bewijsniveaus." description="Alle routes beginnen bij 50 jaar of ouder, maar verschillen sterk in duur, financiële structuur, verzekering en legalisatie." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map((fact) => { const Icon = fact.icon; return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>; })}</div></div></section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Jouw verblijfsplan bepaalt het dossier" title="Kies niet op naam. Kies op duur en bewijs." description="Klik een route aan. Je ziet direct wat de ambassade voor die specifieke categorie onderscheidend maakt." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.68fr_1.32fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Vergelijk routes</p><div className="mt-6 grid gap-2">{routes.map((item) => { const active = route === item.key; return <button key={item.key} type="button" aria-pressed={active} onClick={() => setRoute(item.key)} className={`flex min-h-16 items-center justify-between rounded-xl border px-4 py-3 text-left transition ${active ? 'border-saffron/60 bg-white text-jade' : 'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}><span><strong className="block text-sm">{item.short}</strong><span className={`mt-0.5 block text-[10px] ${active ? 'text-jade/55' : 'text-white/45'}`}>{item.label}</span></span><ArrowRight size={16} className={active ? 'text-saffron' : 'text-white/40'} /></button>; })}</div><p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">Dit is een keuzehulp, geen individuele immigratiebeoordeling. De actuele e-Visa-checklist en eventuele aanvullende vraag van de ambassade zijn leidend.</p></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-saffron/12 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{selected.duration}</span><span className="rounded-full bg-jade/7 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade">{selected.fee}</span></div><h2 className="mt-5 max-w-3xl font-display text-[2.75rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.45rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">{selected.intro}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.proof.map((item, index) => <div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index + 1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.note}</p></div></div></div></div></section>

        <section id="bewijs" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Van licht naar zwaar dossier" title="De papieren vertellen welke route je kiest." description="De visuele route loopt van een compacte 90-dagenmap naar steeds meer financiële, medische en gelegaliseerde bewijsstromen." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.15fr_0.85fr]"><div className="relative min-h-[390px] lg:min-h-[600px]"><Image src="/images/redesign/thailand-retirement-visa-routes.webp" alt="Drie documentroutes voor Non-O, O-A en O-X pensioenvisa" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Bewijslogica</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Meer jaren betekent niet alleen meer saldo.</h2><div className="mt-7 grid gap-3">{[
          ['Non-O', 'Identiteit, locatie en financiële drempel voor maximaal 90 dagen.'],
          ['O-A', 'Financiën plus medische verklaring, verzekering en strafregisterbewijs.'],
          ['O-X', 'Hogere Thaise financiële buffer plus het uitgebreide gezondheids- en achtergrondsdossier.'],
        ].map(([label, text]) => <div key={label} className="rounded-xl border border-white/14 bg-white/[0.06] p-4"><div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-saffron text-jade"><Check size={14} /></span><strong className="text-sm">{label}</strong></div><p className="mt-2 pl-10 text-[10px] font-medium leading-5 text-white/56">{text}</p></div>)}</div><a href={EMBASSY_CATEGORIES} target="_blank" rel="noopener noreferrer" className="btn-cream mt-7">Open officiële checklist <ExternalLink size={15} /></a></div></div></div></div></section>

        <section className="section-divider-bottom bg-mist py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"><SectionHeading eyebrow="Twee berekeningen" title="Visumdrempel is niet hetzelfde als pensioenbudget." description="800.000 THB kan voldoende bewijs zijn voor een route, maar zegt niets over de houdbaarheid van jouw wonen, zorg en leefstijl." /><div className="rounded-[30px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10"><div className="grid gap-4 sm:grid-cols-2"><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><Landmark className="text-saffron-light" size={22} /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Berekening A</p><h2 className="mt-2 font-display text-3xl font-semibold">Toelating</h2><p className="mt-3 text-xs leading-6 text-white/58">Voldoe je aantoonbaar aan de officiële financiële voorwaarde van jouw route?</p></article><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><Home className="text-saffron-light" size={22} /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Berekening B</p><h2 className="mt-2 font-display text-3xl font-semibold">Leefbaarheid</h2><p className="mt-3 text-xs leading-6 text-white/58">Dekt inkomen plus buffer ook woning, zorg, koersschommelingen en onverwachte terugkeer?</p></article></div><p className="mt-5 rounded-2xl border border-saffron/30 bg-saffron/10 p-5 text-xs font-extrabold leading-6">Maak beide berekeningen afzonderlijk. Dat voorkomt dat een visumtechnisch “ja” wordt verward met een financieel gezond langverblijf.</p></div></div></section>

        <section id="aanvragen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Aanvragen vanuit Nederland" title="Vier fases, met de routekeuze vóór het papierwerk." description="De Thaise ambassade in Den Haag werkt met het officiële e-Visa-platform en kan aanvullende documenten of een interview vragen." /><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />{[
          { icon: Route, label: '01', title: 'Bevestig de route', text: 'Kies Non-O, O-A of O-X op basis van duur en volledige bewijsbaarheid.' },
          { icon: FileCheck2, label: '02', title: 'Verzamel & legaliseer', text: 'Let bij O-A en O-X extra op afgiftedatum, vorm en vereiste legalisatie.' },
          { icon: Smartphone, label: '03', title: 'Vraag online aan', text: 'Dien via Thai e-Visa in terwijl je gedurende het proces in Nederland verblijft.' },
          { icon: PlaneTakeoff, label: '04', title: 'Controleer vóór vertrek', text: 'Check e-Visa, verzekering, TDAC en de documenten die je bij aankomst nodig hebt.' },
        ].map((step) => { const Icon = step.icon; return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Stap {step.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>; })}</div><div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-saffron/25 bg-tonal p-6"><strong className="font-display text-2xl font-semibold text-jade">Betaal pas als route en dossier kloppen.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Aanvraagkosten worden volgens de algemene voorwaarden niet terugbetaald. De ambassade adviseert doorgaans ruim vóór vertrek aan te vragen; controleer de actuele doorlooptijd en vakantiedagen.</p></div><a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-jade p-6 text-white"><span><strong className="block text-sm">Start via Thai e-Visa</strong><span className="mt-1 block text-[10px] text-white/52">Officieel aanvraagplatform</span></span><ExternalLink size={18} className="text-saffron-light" /></a></div></div></section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Na het visum</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.035em]">Plan je eerste maand flexibel, niet permanent.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">Gebruik je aankomst om wijk, zorg, vervoer en dagelijkse routine te testen voordat je een lange woonverplichting aangaat.</p><Link href="/visa/digital-arrival-card/" className="btn-cream mt-7">Regel daarna je TDAC <ArrowRight size={15} /></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Home size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Eerste verblijf vergelijken</strong><span className="mt-1 block text-[10px] text-white/50">Flexibel starten via Trip.com</span></a><a href={esimHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Smartphone size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Bereikbaar bij aankomst</strong><span className="mt-1 block text-[10px] text-white/50">eSIM vergelijken via Saily</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com en Saily zijn affiliate-links voor je praktische aankomst. Ze hebben geen invloed op visumgeschiktheid of goedkeuring.</AffiliateDisclosure></div></div></div></div></section>

        <FaqSplitSection id="vragen" eyebrow="Echte pensioenvisum-zoekvragen" title="Veelgestelde vragen over retirement visa Thailand" description="Deze vragen komen uit de actuele Nederlandse DataForSEO-SERP. De antwoorden scheiden officiële toelatingseisen bewust van bredere pensioen- en leefbudgetvragen." items={faqs} />

        <RelatedGuidesSection eyebrow="Verder voor lang verblijf" title="Bouw je langverblijf in de juiste volgorde" guides={[
          { title: 'Visum Thailand', description: 'Vergelijk kort verblijf, DTV en andere langverblijfopties zonder categorieën door elkaar te halen.', href: '/visa/', image: '/images/redesign/thailand-visa-hero.webp', imageAlt: 'Thaise visumdocumenten op een bureau' },
          { title: 'TDAC invullen', description: 'Bereken het gratis indienmoment voor de digitale aankomstkaart.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-tdac-hero.webp', imageAlt: 'Digitale aankomstkaart Thailand' },
          { title: 'DTV Thailand', description: 'Vergelijk workcation, soft power en gezinsroutes als pensioen niet jouw verblijfsdoel is.', href: '/visa/digital-nomad-visa/', image: '/images/redesign/thailand-dtv-hero.webp', imageAlt: 'Remote werken vanuit Thailand' },
        ]} />

        <SourceMethodSection eyebrow="Bronnen & onderzoek" title="Een pensioenroute begint bij de officiële categorie, niet bij een visumbureau." description="DataForSEO-onderzoek voor Nederland omvatte keywordvolumes, een actuele SERP met echte PAA-vragen, drie volledig geparseerde concurrentiebronnen en cannibalisatiechecks. Bedragen, duur en documenten zijn vervolgens tegen de actuele Haagse ambassadechecklist en tarieflijst gecontroleerd." sources={[
          { title: 'E-Visa Categories and Required Documents', creator: 'Royal Thai Embassy The Hague · checklist 18 juni 2025', url: EMBASSY_CATEGORIES, note: 'Primaire bron voor Non-O pensioen, O-A en O-X: duur, financiën, medische en justitiële documenten en verzekering.' },
          { title: 'Non-Immigrant Visa O-A (Long Stay)', creator: 'Royal Thai Embassy The Hague', url: 'https://hague.thaiembassy.org/th/page/76475-non-immigrant-visa-o-a-(long-stay)', note: 'Officiële toelichting op de O-A-long-stayroute voor aanvragers van 50 jaar of ouder.' },
          { title: 'E-Visa General Conditions', creator: 'Royal Thai Embassy The Hague', url: 'https://hague.thaiembassy.org/th/publicservice/e-visa-general-conditions/', note: 'Primaire bron voor aanvraag vanuit Nederland, online behandeling en niet-terugbetaalbare aanvraagkosten.' },
          { title: 'Revised Fees for Consular Services', creator: 'Royal Thai Embassy The Hague', url: 'https://hague.thaiembassy.org/th/content/%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AD%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%A5-2567', note: 'Officiële Nederlandse tarieven voor Non-Immigrant single entry, O-A en O-X.' },
        ]} />
      </main>
    </>
  );
}
