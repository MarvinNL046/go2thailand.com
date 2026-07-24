import { useMemo, useState } from 'react';
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
  Smartphone,
  Stamp,
  University,
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
import { TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';

const EMBASSY_CATEGORIES = 'https://hague.thaiembassy.org/th/publicservice/e-visa-categories-required-documents/';
const EMBASSY_FEES = 'https://hague.thaiembassy.org/th/content/%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AD%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%A5-2567';
const THAI_E_VISA = 'https://www.thaievisa.go.th/';
const IMMIGRATION_STUDY = 'https://uttaradit.immigration.go.th/en/public-handbooks/';

const sectionNav = [
  { href: '#keuze' as const, label: 'Kies je studie', icon: School },
  { href: '#bewijs' as const, label: 'Bewijsmap', icon: FileCheck2 },
  { href: '#muay-thai' as const, label: 'Korte training', icon: ShieldCheck },
  { href: '#aanvragen' as const, label: 'Aanvragen', icon: PlaneTakeoff },
  { href: '#verlengen' as const, label: 'Verlengen', icon: Stamp },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
];

type StudyRouteKey = 'short' | 'formal' | 'exchange' | 'official';

const studyRoutes: Array<{
  key: StudyRouteKey;
  label: string;
  code: string;
  title: string;
  intro: string;
  proof: string[];
  note: string;
}> = [
  {
    key: 'short', label: 'Taalcursus of Muay Thai', code: 'ED3',
    title: 'De opleider én bevoegde autoriteit dragen je aanvraag.',
    intro: 'ED3 is de officiële studieroute voor een korte Thai- of Engelstalige cursus en Muay Thai-training. Een losse marketingfactuur van een school is niet hetzelfde als de volledige bewijsset.',
    proof: ['Brief van de relevante onderwijs- of sportautoriteit', 'Inschrijvingsbrief met cursusdetails', 'ID of paspoort van de bevoegde ondertekenaar', 'Financieel bewijs voor lesgeld en levensonderhoud'],
    note: 'Voor een recreatieve training tot 60 dagen kan TR3 logischer zijn; voor een meerjarige soft-powerroute kan DTV2 passen. Vergelijk eerst doel en duur.',
  },
  {
    key: 'formal', label: 'School, diploma of universiteit', code: 'ED1 · ED2 · ED Plus',
    title: 'Het onderwijsniveau bepaalt de categorie en afzender.',
    intro: 'Basisschool en voortgezet onderwijs vallen onder ED1, beroeps- of technisch onderwijs en diploma’s onder bachelorniveau onder ED2, en een bacheloropleiding of hoger onder ED Plus.',
    proof: ['Brief van school, instituut of universiteit', 'Bevestiging van inschrijving en opleidingsniveau', 'Bevoegd getekende brief plus ID-kopie van ondertekenaar', 'Financieel bewijs voor collegegeld en verblijf'],
    note: 'Kies in Thai e-Visa de categorie die exact aansluit op het niveau van de opleiding. “Education Visa” is geen enkel universeel formulier.',
  },
  {
    key: 'exchange', label: 'Stage of uitwisseling', code: 'ED6',
    title: 'Twee organisaties moeten hetzelfde leerdoel bevestigen.',
    intro: 'ED6 is voor een curriculaire stage of uitwisselingsstudent. Je thuisopleiding en de Thaise ontvangende organisatie moeten de deelname op elkaar aansluitend documenteren.',
    proof: ['Brief van je universiteit of onderwijsinstelling', 'Bevestiging van de Thaise organisatie of het bedrijf', 'Financieel bewijs voor levensonderhoud', 'Duidelijke aansluiting op je curriculum of uitwisselingsprogramma'],
    note: 'Een gewone baan of niet-curriculaire werkstage hoort niet automatisch onder ED6. Controleer dan de juiste werk- of businesscategorie.',
  },
  {
    key: 'official', label: 'Overheidsworkshop of seminar', code: 'ED4',
    title: 'De organiserende overheids- of internationale partij is het bewijsanker.',
    intro: 'ED4 is bedoeld voor workshops, trainingen of seminars die worden georganiseerd door een Thaise overheidsinstantie, buitenlandse missie of internationale organisatie.',
    proof: ['Brief van de organiserende overheidsinstantie', 'Of een note verbale van missie of internationale organisatie', 'Financieel bewijs voor verblijfskosten', 'Programma, data en doel die overeenkomen met de aanvraag'],
    note: 'Een commerciële korte cursus zonder deze organisator past niet onder ED4. Kijk dan naar ED3 of de toeristische TR3-route.',
  },
];

const quickFacts = [
  { icon: CalendarClock, label: 'Visumgeldigheid', value: '3 maanden', text: 'De Haagse ED-categorieën zijn single-entry en drie maanden geldig vanaf afgifte.' },
  { icon: WalletCards, label: 'Haags tarief', value: '€70', text: 'Tarief voor een Non-Immigrant Visa single entry van drie maanden.' },
  { icon: School, label: 'Bewijsanker', value: 'Onderwijsbrief', text: 'De juiste school, universiteit, autoriteit of organisatie moet je route dragen.' },
  { icon: Stamp, label: 'Na aankomst', value: 'Stempel leidend', text: 'Visumgeldigheid en toegestane verblijfsduur zijn twee verschillende klokken.' },
];

const commonEvidence = [
  'Biodatapagina van je paspoort of reisdocument',
  'Recente pasfoto van maximaal zes maanden oud',
  'Document dat je huidige locatie in Nederland aantoont',
  'Financieel bewijs voor lesgeld en levensonderhoud',
  'Route-specifieke brief van onderwijsinstelling of organisator',
  'Inschrijvingsdetails met bevoegde handtekening en waar vereist ID-kopie',
];

const faqs = [
  { question: 'Wat is een ED-visum voor Thailand?', answer: 'Een Non-Immigrant ED is een verzamelnaam voor officiële studieroutes. De actuele Thaise categorieën onderscheiden onder meer school, beroepsonderwijs, korte taal- of Muay Thai-cursus, overheidsworkshop, stage of uitwisseling en bacheloronderwijs of hoger. Je kiest dus op opleidingsdoel, niet alleen op het woord studie.' },
  { question: 'Wat kost een studievisum voor Thailand vanuit Nederland?', answer: 'De actuele tarieflijst van de Thaise ambassade in Den Haag noemt €70 voor een Non-Immigrant Visa single entry met een geldigheid van drie maanden. Kosten van een school, vertalingen, legalisatie of een latere verlenging staan daar los van. Visumkosten zijn niet terugbetaalbaar.' },
  { question: 'Kun je een studievisum krijgen voor een Thaise taalcursus?', answer: 'Ja, een korte Thai- of Engelstalige cursus valt in de officiële Haagse categoriechecklist onder ED3. Je hebt naast de basisdocumenten een brief van de relevante onderwijsautoriteit en een correct ondertekende inschrijvingsbrief van het instituut nodig.' },
  { question: 'Welk visum heb je nodig voor Muay Thai-training?', answer: 'Dat hangt af van doel en duur. De officiële checklist noemt recreatieve training tot 60 dagen onder Tourist TR3, een korte studieroute onder ED3 en soft-poweractiviteiten onder DTV2. Vergelijk dus cursusduur, gewenste verblijfsstructuur, financiële drempel en het bewijs dat de aanbieder kan leveren.' },
  { question: 'Kun je werken met een Thailand Education Visa?', answer: 'Een ED-visum geeft op zichzelf geen algemene toestemming om in Thailand te werken. Een curriculaire stage heeft een eigen ED6-bewijsroute; voor regulier werk moet je de passende werk- en eventuele work-permitregels volgen.' },
  { question: 'Kun je een ED-visum in Thailand verlengen?', answer: 'Een verlenging is een afzonderlijke Immigration-procedure en geen automatische omzetting naar één jaar. Het publieke handboek maakt onderscheid tussen publieke en private instellingen. Immigration kan een bevestigingsbrief, opleidingsniveau, studievoortgang en vanaf latere jaren aanwezigheid of resultaten vragen.' },
  { question: 'Hoe vroeg vraag je een Thailand e-Visa aan?', answer: 'De ambassade in Den Haag adviseert minimaal één maand vóór vertrek aan te vragen, maar niet langer dan twee maanden vooraf. Een compleet dossier duurt doorgaans korter dan een dossier waarvoor aanvullende schooldocumenten of een interview nodig zijn.' },
];

export default function ThailandEducationVisaGuide() {
  const [route, setRoute] = useState<StudyRouteKey>('short');
  const selected = useMemo(() => studyRoutes.find((item) => item.key === route) ?? studyRoutes[0], [route]);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'nl-education-visa', 'first-weeks');

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Studievisum Thailand: Non-Immigrant ED', description: 'Beslisgids voor ED1, ED2, ED3, ED4, ED6 en ED Plus vanuit Nederland.', url: 'https://go2-thailand.com/nl/visa/education-visa/', inLanguage: 'nl-NL', dateModified: '2026-07-24' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
    { '@type': 'ListItem', position: 2, name: 'Visum Thailand', item: 'https://go2-thailand.com/nl/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Studievisum Thailand', item: 'https://go2-thailand.com/nl/visa/education-visa/' },
  ] };

  return <>
    <SEOHead title="Studievisum Thailand: ED-visum kiezen en aanvragen" description="Studievisum Thailand aanvragen? Vergelijk ED1, ED2, ED3, ED4, ED6 en ED Plus, zie de bewijsbrieven, €70 kosten en kies slim voor taalstudie of Muay Thai." ogImage="https://go2-thailand.com/images/redesign/thailand-education-visa-hero.webp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </SEOHead>
    <main className="bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-education-visa-hero.webp" imageAlt="Internationale student volgt een Thaise taalles in een groene binnenplaats in Chiang Mai" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visum', href: '/visa/' }, { label: 'Studievisum' }]} eyebrow="ED1 · ED2 · ED3 · ED6 · ED Plus" title={<>Studievisum Thailand.<br /><span className="text-saffron">Je opleiding kiest de route.</span></>} subtitle="Begin bij de schoolbrief, niet bij het formulier." description="Taalstudie, Muay Thai, universiteit en een curriculaire stage vallen niet vanzelf onder dezelfde ED-categorie. Vergelijk eerst doel, onderwijsniveau en de partij die jouw inschrijving officieel kan bevestigen." actions={[{ label: 'Kies je studieroute', href: '#keuze', kind: 'primary' }, { label: 'Open officiële checklist', href: EMBASSY_CATEGORIES, kind: 'secondary', newTab: true }]} minHeightClassName="min-h-[760px] lg:min-h-[720px]" titleClassName="max-w-[900px] text-[3.25rem] leading-[0.88] !text-white sm:text-[4.55rem] lg:text-[5.05rem]" subtitleClassName="max-w-[650px] !text-white" descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white opacity-72" imageClassName="object-cover object-[73%_center] lg:object-center" gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.18)_0%,rgba(4,42,34,0.58)_46%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.96)_44%,rgba(4,42,34,0.18)_70%,rgba(4,42,34,0.02)_100%)]" contentClassName="max-w-[900px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75" sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/22 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Belangrijkste controle</p><strong className="mt-3 block font-display text-3xl font-semibold">Kan de school dit bewijzen?</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">Een mooie cursuspagina is geen bevoegd ondertekende inschrijvings- en autoriteitsbrief.</p></div>} />
      <PageSectionNav items={sectionNav} />

      <section className="section-divider-bottom py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Eerst de categorie" title="Education Visa is een familie van studieroutes." description="De Haagse checklist werkt met afzonderlijke ED-codes. Elke code koppelt jouw leerdoel aan een specifieke bewijsafzender." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map((fact) => { const Icon=fact.icon; return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20}/></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>;})}</div><div className="mt-5 rounded-2xl border border-saffron/25 bg-tonal p-6"><div className="flex items-start gap-4"><CalendarClock size={23} className="mt-1 shrink-0 text-saffron-dark"/><div><strong className="font-display text-2xl font-semibold text-jade">Drie maanden visumgeldigheid is niet automatisch drie maanden extra studie.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Het visumvenster bepaalt wanneer je de single entry gebruikt. De immigratiestempel bij aankomst bepaalt je concrete verblijfsperiode.</p></div></div></div></div></section>

      <section id="keuze" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Van leerdoel naar ED-code" title="Kies de route die je opleider kan onderbouwen." description="Klik je studieplan aan. Je ziet direct welke partij de doorslaggevende brief moet leveren en waar veel aanvragen inhoudelijk mislopen." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.72fr_1.28fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Jouw studieplan</p><div className="mt-6 grid gap-2">{studyRoutes.map((item)=>{const active=route===item.key;return <button key={item.key} type="button" aria-pressed={active} onClick={()=>setRoute(item.key)} className={`flex min-h-16 items-center justify-between rounded-xl border px-4 py-3 text-left transition ${active?'border-saffron/60 bg-white text-jade':'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}><span><strong className="block text-sm">{item.label}</strong><span className={`mt-0.5 block text-[10px] ${active?'text-jade/55':'text-white/45'}`}>{item.code}</span></span><ArrowRight size={16} className={active?'text-saffron':'text-white/40'}/></button>;})}</div></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.code}</p><h2 className="mt-3 max-w-3xl font-display text-[2.65rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.4rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">{selected.intro}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.proof.map((item,index)=><div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index+1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.note}</p></div></div></div></div></section>

      <section id="bewijs" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="De gemeenschappelijke basis" title="Eén paspoortmap, met een andere onderwijsbrief per route." description="De basis keert terug in bijna iedere ED-categorie. Het onderscheid zit in onderwijsniveau, bevoegde afzender en de inhoud van je inschrijving." /><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.12fr_0.88fr]"><div className="relative min-h-[390px] lg:min-h-[610px]"><Image src="/images/redesign/thailand-education-visa-routes.webp" alt="Drie studieroutes met taaltraining, universiteit en stage rond een visumdossier" fill sizes="(max-width:1024px) 100vw,56vw" className="object-cover"/></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Bouw de bewijsmap</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">De brief moet je echte programma vertellen.</h2><div className="mt-7 grid gap-3">{commonEvidence.map((item)=><div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={14}/></span><p className="pt-1 text-[11px] font-extrabold leading-5 text-white/76">{item}</p></div>)}</div><a href={EMBASSY_CATEGORIES} target="_blank" rel="noopener noreferrer" className="btn-cream mt-7">Open actuele checklist <ExternalLink size={15}/></a></div></div></div></div></section>

      <section id="muay-thai" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Taal of Muay Thai is niet automatisch ED3" title="Drie visa kunnen dezelfde activiteit anders behandelen." description="De juiste keuze hangt af van recreatie versus studie, verblijfsduur, financiële drempel en het bewijs dat de aanbieder werkelijk kan leveren."/><div className="mt-10 grid gap-4 lg:grid-cols-3">{[
        {icon:PlaneTakeoff,code:'TR3',title:'Recreatieve training',time:'60 dagen verblijf',text:'Voor korte recreatieve leer- of trainingsactiviteiten met acceptatiebrief en toeristische bewijsset.'},
        {icon:Languages,code:'ED3',title:'Korte studieroute',time:'3 maanden visumgeldig',text:'Voor taalstudie of Muay Thai met onderwijs-/sportautoriteitsbrief en formele inschrijving.'},
        {icon:ShieldCheck,code:'DTV2',title:'Soft-powerroute',time:'5 jaar visumgeldig',text:'Voor meerdere langere verblijven, met 500.000 THB financieel bewijs en activiteitsbevestiging.'},
      ].map((item)=>{const Icon=item.icon;return <article key={item.code} className="rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-jade text-white"><Icon size={20}/></span><span className="rounded-full bg-saffron/12 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.code}</span></div><h2 className="mt-6 font-display text-3xl font-semibold text-jade">{item.title}</h2><p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{item.time}</p><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p></article>;})}</div><p className="mt-5 rounded-2xl border border-saffron/25 bg-tonal p-6 text-xs font-extrabold leading-6 text-jade">Vraag een school niet alleen “regel je een ED-visum?”, maar welke officiële categorie, autoriteitsbrief, cursusduur, aanwezigheidseis en terugbetalingsvoorwaarde zij schriftelijk kan onderbouwen.</p></div></section>

      <section id="aanvragen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Aanvragen vanuit Nederland" title="De schoolbrief komt vóór Thai e-Visa." description="Een aanvraag bij de ambassade in Den Haag kan alleen vanuit Nederland. De ambassade kan aanvullende documenten of een interview vragen."/><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block"/>{[
        {icon:BookOpenCheck,label:'01',title:'Kies programma',text:'Bevestig leerdoel, onderwijsniveau, startdatum en realistische duur.'},
        {icon:University,label:'02',title:'Controleer afzenders',text:'Vraag wie de schoolbrief, autoriteitsbrief en bevoegde handtekening levert.'},
        {icon:Smartphone,label:'03',title:'Vraag online aan',text:'Upload het volledige route-specifieke dossier via Thai e-Visa vanuit Nederland.'},
        {icon:Stamp,label:'04',title:'Lees de stempel',text:'Controleer bij aankomst je concrete admitted-until-datum en bewaar de schoolmap.'},
      ].map((step)=>{const Icon=step.icon;return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19}/></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Stap {step.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>;})}</div><div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div><strong className="font-display text-2xl font-semibold text-jade">€70 is het visumtarief, niet de totale opleidingsprijs.</strong><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-charcoal/64">Controleer apart cursusgeld, annulering, schooldocumenten, eventuele vertaling, verlenging en wat er gebeurt als een aanvraag wordt afgewezen.</p></div><a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Open Thai e-Visa <ExternalLink size={15}/></a></div></div></section>

      <section id="verlengen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"><SectionHeading eyebrow="Na aankomst" title="Aanwezigheid en voortgang worden onderdeel van je dossier." description="De bestaande pagina beloofde vaste verlengingen in stappen van 90 dagen. Officiële handboeken laten zien dat publieke en private instellingen verschillende bewijs- en bevestigingsroutes hebben."/><div className="rounded-[30px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10"><div className="grid gap-4 sm:grid-cols-2"><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><GraduationCap size={22} className="text-saffron-light"/><strong className="mt-5 block font-display text-3xl">Publieke instelling</strong><p className="mt-3 text-xs leading-6 text-white/58">Bevestigingsbrief met studieduur, curriculumniveau en bij latere jaren studieprestatie en aanwezigheid.</p></article><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><BriefcaseBusiness size={22} className="text-saffron-light"/><strong className="mt-5 block font-display text-3xl">Private instelling</strong><p className="mt-3 text-xs leading-6 text-white/58">Ook bewijs van vergunning en bevestiging door de relevante instantie kan nodig zijn.</p></article></div><p className="mt-5 rounded-2xl border border-saffron/30 bg-saffron/10 p-5 text-xs font-extrabold leading-6">Een inschrijving alleen garandeert geen verlenging. Immigration beoordeelt de actuele grond, schoolstatus, documenten en je feitelijke studie.</p><a href={IMMIGRATION_STUDY} target="_blank" rel="noopener noreferrer" className="btn-cream mt-6">Bekijk officiële handboeken <ExternalLink size={15}/></a></div></div></section>

      <section className="section-divider-bottom py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Pas na je visumkeuze</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Plan je eerste weken flexibel.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">Test reistijd naar school, buurt en lesritme voordat je een lang huurcontract of veel studiemateriaal vastlegt.</p><Link href="/travel-gear/" className="btn-cream mt-7">Bekijk de Thailand-paklijst <ArrowRight size={15}/></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Hotel size={20} className="text-saffron-light"/><strong className="mt-4 block text-sm">Eerste verblijf vergelijken</strong><span className="mt-1 block text-[10px] text-white/50">Flexibel starten via Trip.com</span></a><a href="/go/momax-travel-adapter/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Smartphone size={20} className="text-saffron-light"/><strong className="mt-4 block text-sm">Reisadapter bekijken</strong><span className="mt-1 block text-[10px] text-white/50">Amazon-route per bezoekersland</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com en Amazon zijn affiliate-links voor praktisch verblijf en uitrusting. Ze hebben geen invloed op schoolkeuze of visumgoedkeuring.</AffiliateDisclosure></div></div></div></div></section>

      <FaqSplitSection id="vragen" eyebrow="Studievisumvragen uit de actuele SERP" title="Veelgestelde vragen over een ED-visum voor Thailand" description="De live Nederlandse SERP heeft weinig zuivere ED-vragen. Daarom combineren de antwoorden de gemeten PAA met de routevragen die uit de officiële ED-categorieën en concurrentieanalyse volgen." items={faqs}/>
      <RelatedGuidesSection eyebrow="Vergelijk je verblijfsroute" title="Studie, soft power en toerisme zijn verschillende keuzes" guides={[
        {title:'DTV Thailand',description:'Vergelijk de vijfjarige soft-powerroute met een kortere ED3-studie.',href:'/visa/digital-nomad-visa/',image:'/images/redesign/thailand-dtv-hero.webp',imageAlt:'Remote werken en trainen in Thailand'},
        {title:'Toeristenvisum Thailand',description:'Bekijk TR3 voor recreatieve leer- en trainingsactiviteiten tot 60 dagen.',href:'/visa/tourist-visa/',image:'/images/redesign/thailand-tourist-visa-hero.webp',imageAlt:'Reiziger plant een toeristische reis naar Thailand'},
        {title:'Visum verlengen',description:'Lees hoe stempel, TM.7 en lokale Immigration-beoordeling samenwerken.',href:'/visa/visa-extension/',image:'/images/redesign/thailand-visa-extension-hero.webp',imageAlt:'Reiziger controleert een Thaise paspoortstempel'},
      ]}/>
      <SourceMethodSection eyebrow="Bronnen & onderzoek" title="De officiële ED-code gaat vóór de verkooptekst van een school." description="DataForSEO-onderzoek voor Nederland omvatte drie keywordsets, twee live SERP’s, PAA, drie concurrentieparses en ranking- en backlinkchecks. Categorieën, bewijsstukken, geldigheid en tarieven zijn vervolgens gecontroleerd bij de Thaise ambassade in Den Haag en officiële Immigration-handboeken." sources={[
        {title:'E-Visa Categories and Required Documents',creator:'Royal Thai Embassy The Hague · checklist 18 juni 2025',url:EMBASSY_CATEGORIES,note:'Primaire bron voor ED1, ED2, ED3, ED4, ED5, ED6 en ED Plus, inclusief bewijsafzenders en drie maanden single-entry geldigheid.'},
        {title:'Revised Fees for Consular Services',creator:'Royal Thai Embassy The Hague · sinds 15 juli 2024',url:EMBASSY_FEES,note:'Primaire bron voor €70 Non-Immigrant Visa single entry met drie maanden geldigheid.'},
        {title:'Public handbooks · study in public/private education',creator:'Thailand Immigration Bureau',url:IMMIGRATION_STUDY,note:'Primaire bron voor afzonderlijke verlengingsroutes, schoolbevestiging, voortgang, aanwezigheid en 1.900 THB Immigration-tarief.'},
      ]}/>
    </main>
  </>;
}
